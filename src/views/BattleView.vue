<template>
  <div class="about">
    <div>
      <h1>Battle</h1>
      <div v-for="(round, roundIndex) in levelDetails.rounds">
        <div v-if="current.round == roundIndex">
          <h2>Round {{ round.order }}/{{ levelDetails.rounds.length }}</h2>

          <!-- Enemy Area -->
          <div class="col" v-for="(enemy, enemyIndex) in levelDetails.rounds[roundIndex].enemy">
            <!-- HP -->
            <div class="progress">
              <div class="progress-bar" :style="getEnemyHpPercent(roundIndex, enemyIndex)">
                {{ current.enemyStatus[roundIndex].enemy[enemyIndex].properties.hp }}/{{
                  levelDetails.rounds[roundIndex].enemy[enemyIndex].properties.hp
                }}
              </div>
            </div>
            <!-- SP -->
            <div class="progress">
              <div class="progress-bar" :style="getEnemySpPercent(roundIndex, enemyIndex)">
                {{ current.enemyStatus[roundIndex].enemy[enemyIndex].properties.sp }}/{{
                  levelDetails.rounds[roundIndex].enemy[enemyIndex].properties.maxSp
                }}
              </div>
            </div>
          </div>
          <!-- Enemy Art -->
          <div class="row row-cols-5">
            <div class="col" v-for="(enemy, enemyIndex) in levelDetails.rounds[roundIndex].enemy">
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
          <div class="col" v-for="(enemy, enemyIndex) in levelDetails.rounds[roundIndex].enemy">
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

      <!-- Character Control -->
      <div id="characterControl" class="row row-cols-5 align-items-end">
        <div class="col" v-for="(character, characterIndex) in current.playerStatus">
          <div v-if="current.roundStatus[characterIndex].action == ''">
            <div
              class="card"
              @touchstart="setActiveCharacterDetails(characterIndex)"
              @touchend="clearActiveCharacterDetails()"
              v-touch="{
                left: () => swipe('Left'),
                right: () => swipe('Right'),
                up: () => characterAttack(characterIndex),
                down: () => swipe('Down'),
              }"
              :disable="current.roundStatus[characterIndex].action"
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
            <div class="progress">
              <div class="progress-bar" :style="getCharacterSpPercent(characterIndex)">
                {{ current.playerStatus[characterIndex].properties.sp }}/{{
                  playerDetails.character[characterIndex].properties.maxSp
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
        round: 0,
        activeEnemy: 0,
        activeCharacter: 0,
        activeEnemyDetails: -1,
        activeCharacterDetails: -1,
        playerStatus: [],
        enemyStatus: {},
        roundStatus: [
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
              hp: 100,
              sp: 0,
              maxSp: 100,
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
              hp: 100,
              sp: 0,
              maxSp: 100,
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
              hp: 100,
              sp: 0,
              maxSp: 100,
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
              hp: 100,
              sp: 0,
              maxSp: 100,
              attack: 100,
              attackMode: 'single',
              defend: 100,
              skills: '111',
            },
          },
          {
            order: 5,
            name: 'wood',
            properties: {
              attribute: 'wood',
              hp: 100,
              sp: 0,
              maxSp: 100,
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
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    notify() {
      alert('navigation was prevented.')
    },
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
          this.current.enemyStatus = this.levelDetails.rounds
          console.log(response)
        })
    },
    // Round Control
    newRound() {
      this.current.roundStatus = [
        { action: '' },
        { action: '' },
        { action: '' },
        { action: '' },
        { action: '' },
      ]
    },
    checkRoundComplete() {
      this.current.roundStatus.forEach((element) => {
        if (element == { action: '' }) {
          return false
        } else {
          return true
        }
      })
    },
    // Enemy Action
    enemyRespond() {},
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
      console.log('atk', index)
      console.log(
        'enemy',
        this.current.enemyStatus[this.current.round].enemy[this.current.activeEnemy].properties.hp,
      )
      console.log('player attack', this.current.playerStatus[index].properties.attack)
      let atk = this.current.playerStatus[index].properties.attack
      let bonus = 50
      //attack attribute power
      switch (this.current.playerStatus[index].properties.attribute) {
        case 'fire':
          if (this.current.playerStatus[index].properties.attribute === 'wood') {
            atk = atk * (1 + bonus / 100)
          }
          break
        case 'water':
          if (this.current.playerStatus[index].properties.attribute === 'fire') {
            atk = atk * (1 + bonus / 100)
          }
          break
        case 'wood':
          if (this.current.playerStatus[index].properties.attribute === 'water') {
            atk = atk * (1 + bonus / 100)
          }
          break
        case 'light':
          if (this.current.playerStatus[index].properties.attribute === 'dark') {
            atk = atk * (1 + bonus / 100)
          }
          break
        case 'dark':
          if (this.current.playerStatus[index].properties.attribute === 'light') {
            atk = atk * (1 + bonus / 100)
          }
          break
        default:
      }
      if (this.current.activeEnemy !== -1) {
        this.current.roundStatus[index].action = 'attack'
        this.current.enemyStatus[this.current.round].enemy[this.current.activeEnemy].properties.hp =
          this.current.enemyStatus[this.current.round].enemy[this.current.activeEnemy].properties
            .hp - atk
      } else {
        this.current.roundStatus[index].action = 'attack'
        this.current.enemyStatus[this.current.round].enemy[0].properties.hp =
          this.current.enemyStatus[this.current.round].enemy[this.current.activeEnemy].properties
            .hp - atk
      }
    },
    characterDefend(index) {
      this.current.roundStatus[index].action = 'defend'
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
    getCharacterSpPercent(index) {
      return (
        'width:' +
        (this.current.playerStatus[index].properties.sp /
          this.playerDetails.character[index].properties.maxSp) *
          100 +
        '%'
      )
    },
    // Enemy Display
    getEnemyHpPercent(round, index) {
      return (
        'width:' +
        (this.current.enemyStatus[round].enemy[index].properties.hp /
          this.levelDetails.rounds[round].enemy[index].properties.hp) *
          100 +
        '%'
      )
    },
    getEnemySpPercent(round, index) {
      return (
        'width:' +
        (this.current.enemyStatus[round].enemy[index].properties.sp /
          this.levelDetails.rounds[round].enemy[index].properties.maxSp) *
          100 +
        '%'
      )
    },
  },
  created() {
    this.getLevelDetails()
    this.current.playerStatus = this.playerDetails.character
    console.log(this.current.playerStatus)
  },
}
</script>
