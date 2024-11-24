<template>
  <div class="about">
    <div>
      <h1>Wave {{ current.wave + 1 }}</h1>
      <h2>Turn {{ current.turn }}</h2>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        id="menuButton"
      >
        menu
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/character">Character</RouterLink>
              <RouterLink to="/item">Items</RouterLink>
              <RouterLink to="/about">About</RouterLink>
              <RouterLink to="/battle">Battle</RouterLink>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(wave, waveIndex) in levelDetails.waves">
        <div v-if="current.wave == waveIndex">
          <h2>wave {{ wave.order }}/{{ levelDetails.waves.length }}</h2>

          <!-- Enemy Area -->
          <div class="col" v-for="(enemy, enemyIndex) in levelDetails.waves[waveIndex].enemy">
            <!-- HP -->
            <div class="progress">
              <div class="progress-bar" :style="getEnemyHpPercent(waveIndex, enemyIndex)">
                {{ current.enemyStatus[waveIndex].enemy[enemyIndex].properties.hp }}/{{
                  levelDetails.waves[waveIndex].enemy[enemyIndex].properties.hp
                }}
              </div>
            </div>
          </div>
          <!-- Enemy Art -->
          <div class="row row-cols-5">
            <div class="col" v-for="(enemy, enemyIndex) in levelDetails.waves[waveIndex].enemy">
              <div
                class="card"
                @touchstart="setActiveEnemyDetails(enemyIndex)"
                @touchend="clearActiveEnemyDetails()"
                @click="setActiveEnemyAction(enemyIndex)"
              >
                <div class="card-body">
                  <h5 class="card-title">{{ enemy.name }}</h5>
                </div>
              </div>
            </div>
          </div>

          <!-- Enemy Details -->
          <div class="col" v-for="(enemy, enemyIndex) in levelDetails.waves[waveIndex].enemy">
            <div v-if="current.activeEnemyDetails == enemyIndex">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ enemy.name }}</h5>
                  <p class="card-text">{{ enemy.properties }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      {{ current.turn }}<br />
      {{ current.turnPlayerStatus }}
      <!-- Character Control -->
      <div id="characterControl" class="row row-cols-5 align-items-end">
        <div class="col" v-for="(character, characterIndex) in current.playerStatus">
          <div v-if="current.turnPlayerStatus[characterIndex].action == ''">
            <div
              class="card characterCard"
              @touchstart="setActiveCharacterDetails(characterIndex)"
              @touchend="clearActiveCharacterDetails()"
              v-touch="{
                left: () => swipe('Left'),
                right: () => swipe('Right'),
                up: () => characterAttack(characterIndex),
                down: () => characterDefend(characterIndex),
              }"
              :disable="current.turnPlayerStatus[characterIndex].action"
            >
              <div class="card-body" :id="'character' + characterIndex">
                <p class="card-title">{{ character.name }}</p>
              </div>
            </div>
            <div class="progress">
              <div class="progress-bar" :style="getCharacterHpPercent(characterIndex)">
                {{ current.playerStatus[characterIndex].properties.hp }}/{{
                  playerDetails.character[characterIndex].properties.hp
                }}
              </div>
            </div>
          </div>
          <div v-else-if="current.turnPlayerStatus[characterIndex].action == 'defend'">
            <div
              class="card characterCard"
              @touchstart="setActiveCharacterDetails(characterIndex)"
              @touchend="clearActiveCharacterDetails()"
            >
              <div class="card-body text-bg-warning" :id="'character' + characterIndex">
                <p class="card-title">{{ character.name }}</p>
              </div>
            </div>
            <div class="progress">
              <div class="progress-bar" :style="getCharacterHpPercent(characterIndex)">
                {{ current.playerStatus[characterIndex].properties.hp }}/{{
                  playerDetails.character[characterIndex].properties.hp
                }}
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="card characterCard"
              @touchstart="setActiveCharacterDetails(characterIndex)"
              @touchend="clearActiveCharacterDetails()"
            >
              <div class="card-body text-bg-secondary" :id="'character' + characterIndex">
                <p class="card-title">{{ character.name }}</p>
              </div>
            </div>
            <div class="progress">
              <div class="progress-bar" :style="getCharacterHpPercent(characterIndex)">
                {{ current.playerStatus[characterIndex].properties.hp }}/{{
                  playerDetails.character[characterIndex].properties.hp
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Character Details -->
      <div class="col" v-for="(character, characterIndex) in current.playerStatus">
        <div v-if="current.activeCharacterDetails == characterIndex">
          <div class="card">
            <div class="card-body" :id="'character' + characterIndex">
              <h5 class="card-title">{{ character.name }}</h5>
              <p class="card-text">{{ character.properties }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.characterCard {
  min-height: 20svh;
}
#characterControl {
  margin: 2px;
  padding: 2px;
  position: absolute;
  width: 100%;
  bottom: 0px;
}
#characterControl > .col {
  padding-left: 2px;
  padding-right: 2px;
}
h1 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0px;
}
h2 {
  font-size: 1rem;
  font-weight: 700;
}
#menuButton {
  position: fixed;
  top: 8px;
  right: 8px;
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      isPressed: false,
      pressTimer: null,
      action: '',
      current: {
        turn: 1,
        wave: 0,
        activeEnemy: 0,
        activeCharacter: 0,
        activeEnemyDetails: -1,
        activeCharacterDetails: -1,
        playerStatus: [],
        enemyStatus: {},
        turnPlayerStatus: [
          { action: '' },
          { action: '' },
          { action: '' },
          { action: '' },
          { action: '' },
        ],
        trunEnemyStatus: [
          { action: '' },
          { action: '' },
          { action: '' },
          { action: '' },
          { action: '' },
        ],
      },
      playerDetails: {
        character: [
          {
            order: 1,
            name: 'water',
            properties: {
              attribute: 'water',
              hp: 500,
              skillTurn: 5,
              attack: 100,
              attackMode: 'single',
              defend: 100,
              skills: '111',
            },
          },
          {
            order: 2,
            name: 'fire',
            properties: {
              attribute: 'fire',
              hp: 300,
              skillTurn: 5,
              attack: 100,
              attackMode: 'single',
              defend: 100,
              skills: '111',
            },
          },
          {
            order: 3,
            name: 'light',
            properties: {
              attribute: 'light',
              hp: 500,
              skillTurn: 5,
              attack: 100,
              attackMode: 'single',
              defend: 100,
              skills: '111',
            },
          },
          {
            order: 4,
            name: 'dark',
            properties: {
              attribute: 'dark',
              hp: 600,
              skillTurn: 5,
              attack: 100,
              attackMode: 'multi',
              defend: 100,
              skills: '111',
            },
          },
          {
            order: 5,
            name: 'wood',
            properties: {
              attribute: 'wood',
              hp: 300,
              skillTurn: 5,
              attack: 100,
              attackMode: 'single',
              defend: 100,
              skills: '111',
            },
          },
        ],
      },
      levelDetails: {},
    }
  },

  methods: {
    // Connection
    getLevelDetails() {
      axios
        .get(
          'https://raw.githubusercontent.com/kblecc/StaticAsserts/refs/heads/TurnBasedGame/' +
            this.$route.params.id +
            '.json',
        )
        .then((response) => {
          // handle success
          this.levelDetails = response.data
          this.current.enemyStatus = JSON.parse(JSON.stringify(this.levelDetails.waves))
          console.log(response)
        })
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    // wave Control

    //Turn Control
    checkTurnComplete() {
      return this.current.turnPlayerStatus.every((item) => item.action !== '')
    },
    resetTurnPlayerStatus() {
      this.current.turnPlayerStatus = [
        { action: '' },
        { action: '' },
        { action: '' },
        { action: '' },
        { action: '' },
      ]
    },
    newTurn() {
      this.current.trun = this.current.trun + 1
      this.resetTurnPlayerStatus()
    },
    checkEnemyDead() {},
    // Wave Complete
    checkWaveComplete() {
      console.log(this.current.enemyStatus)
      this.current.enemyStatus[this.current.wave].enemy.forEach((enemy) => {
        if (enemy.properties.hp !== 0) {
          return false
        }
      })
      return true
    },
    // Enemy Action

    async enemyRespond() {
      for (const enemy of this.levelDetails.waves[this.current.wave].enemy) {
        this.enemyAttackPriority(enemy)

        await this.delay(1000) // Wait for 2 seconds before the next iteration
      }
      this.newTurn()
    },
    enemyAttackPriority(enemy) {
      switch (enemy.properties.attackMode) {
        case 'single': {
          let actionMade = false
          // First Proprity
          if (actionMade === false) {
            console.log('1st', enemy, this.current.playerStatus)
            actionMade = this.enemyFirstPriorityAttack(enemy)
          }

          // Second priority: No defend character
          if (actionMade === false) {
            console.log('2nd', enemy, this.current.playerStatus)
            actionMade = this.enemySecondPriorityAttack(enemy)
          }
          //Final priority: Random attack, I want to make defend, TODO
          if (actionMade === false) {
            console.log('3rd', enemy, this.current.playerStatus)
            let character = Math.floor(Math.random() * 5)
            this.current.playerStatus[character].properties.hp =
              this.current.playerStatus[character].properties.hp - enemy.properties.attack
          }
          break
        }
        case 'multi':
          enemy.properties.hp =
            enemy.properties.hp -
            enemy.properties.attack / this.current.enemyStatus[this.current.wave].enemy.length
          break
        default:
      }
    },
    enemyFirstPriorityAttack(enemy) {
      let bonus = 50
      switch (enemy.properties.attribute) {
        case 'fire':
          for (let i = 0; i < 5; i++) {
            if (
              this.playerDetails.character[i].properties.attribute === 'wood' &&
              this.current.turnPlayerStatus[i].action !== 'defend' &&
              this.current.playerStatus[i].properties.hp !== 0
            ) {
              if (
                this.current.playerStatus[i].properties.defend -
                  enemy.properties.attack * (1 + bonus / 100) <
                0
              ) {
                this.current.playerStatus[i].properties.hp =
                  this.current.playerStatus[i].properties.hp +
                  this.current.playerStatus[i].properties.defend -
                  enemy.properties.attack * (1 + bonus / 100)
              }
              return true
            }
          }

          break
        case 'water':
          for (let i = 0; i < 5; i++) {
            if (
              this.playerDetails.character[i].properties.attribute === 'fire' &&
              this.current.turnPlayerStatus[i].action !== 'defend' &&
              this.current.playerStatus[i].properties.hp !== 0
            ) {
              if (
                this.current.playerStatus[i].properties.defend -
                  enemy.properties.attack * (1 + bonus / 100) <
                0
              ) {
                this.current.playerStatus[i].properties.hp =
                  this.current.playerStatus[i].properties.hp +
                  this.current.playerStatus[i].properties.defend -
                  enemy.properties.attack * (1 + bonus / 100)
              }
              return true
            }
          }
          break
        case 'wood':
          for (let i = 0; i < 5; i++) {
            if (
              this.playerDetails.character[i].properties.attribute === 'water' &&
              this.current.turnPlayerStatus[i].action !== 'defend' &&
              this.current.playerStatus[i].properties.hp !== 0
            ) {
              if (
                this.current.playerStatus[i].properties.defend -
                  enemy.properties.attack * (1 + bonus / 100) <
                0
              ) {
                this.current.playerStatus[i].properties.hp =
                  this.current.playerStatus[i].properties.hp +
                  this.current.playerStatus[i].properties.defend -
                  enemy.properties.attack * (1 + bonus / 100)
              }
              return true
            }
          }
          break
        case 'light':
          for (let i = 0; i < 5; i++) {
            if (
              this.playerDetails.character[i].properties.attribute === 'dark' &&
              this.current.turnPlayerStatus[i].action !== 'defend' &&
              this.current.playerStatus[i].properties.hp !== 0
            ) {
              if (
                this.current.playerStatus[i].properties.defend -
                  enemy.properties.attack * (1 + bonus / 100) <
                0
              ) {
                this.current.playerStatus[i].properties.hp =
                  this.current.playerStatus[i].properties.hp +
                  this.current.playerStatus[i].properties.defend -
                  enemy.properties.attack * (1 + bonus / 100)
              }
              return true
            }
          }
          break
        case 'dark':
          for (let i = 0; i < 5; i++) {
            if (
              this.playerDetails.character[i].properties.attribute === 'light' &&
              this.current.turnPlayerStatus[i].action !== 'defend' &&
              this.current.playerStatus[i].properties.hp !== 0
            ) {
              if (
                this.current.playerStatus[i].properties.defend -
                  enemy.properties.attack * (1 + bonus / 100) <
                0
              ) {
                this.current.playerStatus[i].properties.hp =
                  this.current.playerStatus[i].properties.hp +
                  this.current.playerStatus[i].properties.defend -
                  enemy.properties.attack * (1 + bonus / 100)
              }
              return true
            }
          }
          break
        default:
      }
      return false
    },
    enemySecondPriorityAttack(enemy) {
      for (let i = 0; i < 5; i++) {
        if (
          this.current.turnPlayerStatus[i].action !== 'defend' &&
          this.current.playerStatus[i].properties.hp !== 0
        ) {
          this.current.playerStatus[i].properties.hp =
            this.current.playerStatus[i].properties.hp - enemy.properties.attack
          return true
        }
      }
      return false
    },
    // Player Action
    setActiveCharacterDetails(index) {
      this.pressTimer = setTimeout(() => {
        this.current.activeCharacterDetails = index
      }, 500)
    },
    clearActiveCharacterDetails() {
      clearTimeout(this.pressTimer)
      this.current.activeCharacterDetails = -1
    },
    setActiveEnemyDetails(index) {
      this.pressTimer = setTimeout(() => {
        this.current.activeEnemyDetails = index
      }, 500)
    },
    clearActiveEnemyDetails() {
      clearTimeout(this.pressTimer)
      this.current.activeEnemyDetails = -1
    },
    characterAttack(index) {
      let atk = this.playerDetails.character[index].properties.attack
      let bonus = 50
      //attack attribute power
      switch (this.playerDetails.character[index].properties.attribute) {
        case 'fire':
          if (this.playerDetails.character[index].properties.attribute === 'wood') {
            atk = atk * (1 + bonus / 100)
          }
          break
        case 'water':
          if (this.playerDetails.character[index].properties.attribute === 'fire') {
            atk = atk * (1 + bonus / 100)
          }
          break
        case 'wood':
          if (this.playerDetails.character[index].properties.attribute === 'water') {
            atk = atk * (1 + bonus / 100)
          }
          break
        case 'light':
          if (this.playerDetails.character[index].properties.attribute === 'dark') {
            atk = atk * (1 + bonus / 100)
          }
          break
        case 'dark':
          if (this.playerDetails.character[index].properties.attribute === 'light') {
            atk = atk * (1 + bonus / 100)
          }
          break
        default:
      }
      if (this.playerDetails.character[index].properties.attackMode === 'single') {
        if (this.current.activeEnemy !== -1) {
          this.current.turnPlayerStatus[index].action = 'attack'
          this.current.enemyStatus[this.current.wave].enemy[
            this.current.activeEnemy
          ].properties.hp =
            this.current.enemyStatus[this.current.wave].enemy[this.current.activeEnemy].properties
              .hp - atk
          if (
            this.current.enemyStatus[this.current.wave].enemy[this.current.activeEnemy].properties
              .hp < 0
          ) {
            this.current.enemyStatus[this.current.wave].enemy[
              this.current.activeEnemy
            ].properties.hp = 0
          }
        } else {
          this.current.turnPlayerStatus[index].action = 'attack'
          this.current.enemyStatus[this.current.wave].enemy[0].properties.hp =
            this.current.enemyStatus[this.current.wave].enemy[this.current.activeEnemy].properties
              .hp - atk
          if (
            this.current.enemyStatus[this.current.wave].enemy[this.current.activeEnemy].properties
              .hp < 0
          ) {
            this.current.enemyStatus[this.current.wave].enemy[
              this.current.activeEnemy
            ].properties.hp = 0
          }
        }
      } else if (this.playerDetails.character[index].properties.attackMode === 'multi') {
        this.current.turnPlayerStatus[index].action = 'attack'
        this.current.enemyStatus[this.current.wave].enemy.forEach((enemy) => {
          enemy.properties.hp =
            enemy.properties.hp - atk / this.current.enemyStatus[this.current.wave].enemy.length
          if (
            this.current.enemyStatus[this.current.wave].enemy[this.current.activeEnemy].properties
              .hp < 0
          ) {
            this.current.enemyStatus[this.current.wave].enemy[
              this.current.activeEnemy
            ].properties.hp = 0
          }
        })
      }
      console.log(this.checkTurnComplete())
      if (this.checkTurnComplete()) {
        this.enemyRespond()
      }
    },
    characterDefend(index) {
      this.current.turnPlayerStatus[index].action = 'defend'
      if (this.checkTurnComplete()) {
        this.enemyRespond()
      }
    },
    characterActiveSkill(index) {
      //not yet
    },
    // Character Display
    getCharacterHpPercent(index) {
      return (
        'width:' +
        (this.current.playerStatus[index].properties.hp /
          this.playerDetails.character[index].properties.hp) *
          100 +
        '%'
      )
    },

    // Enemy Display
    getEnemyHpPercent(wave, index) {
      return (
        'width:' +
        (this.current.enemyStatus[wave].enemy[index].properties.hp /
          this.levelDetails.waves[wave].enemy[index].properties.hp) *
          100 +
        '%'
      )
    },
  },
  created() {
    this.getLevelDetails()
    this.current.playerStatus = JSON.parse(JSON.stringify(this.playerDetails.character))
    console.log(this.current.playerStatus)
  },
}
</script>
