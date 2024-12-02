<template>
  <div v-if="!isLoading">
    <div v-if="checkDefeat()" class="overlay" style="z-index: 1200">
      <div class="overlay-content">
        <h1>Defeat</h1>
        <button type="button" class="btn btn-secondary">Back to Map</button>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Try Again
        </button>
      </div>
    </div>
    <div v-if="checkWin() && !checkDefeat()" class="overlay" style="z-index: 1200">
      <div class="overlay-content">
        <h1>win</h1>
        <button type="button" class="btn btn-secondary">Back to Map</button>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Try Again
        </button>
      </div>
    </div>
    <div v-if="showYourTurn" class="overlay">
      <div class="overlay-content">
        <h1>Your Turn</h1>
      </div>
    </div>
    <div v-if="showEnemyTurn" class="overlay">
      <div class="overlay-content">
        <h1>Enemy's turn</h1>
      </div>
    </div>
    <div class="about">
      <div>
        <h1>Wave {{ current.wave + 1 }}</h1>
        <h2>Turn {{ current.turn }}</h2>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#battleModal"
          id="menuButton"
        >
          menu
        </button>
        <div
          class="modal fade"
          id="battleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Battle Paused</h1>
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
            </div>
          </div>
        </div>
        <div v-for="(wave, waveIndex) in levelDetails.waves">
          <div v-if="current.wave == waveIndex">
            <div class="row row-cols-5">
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
            </div>

            <!-- Enemy Art -->
            <div class="row row-cols-5">
              <div class="col" v-for="(enemy, enemyIndex) in levelDetails.waves[waveIndex].enemy">
                <div
                  class="card"
                  @touchstart="touchStartEnemyHandling(enemyIndex)"
                  @touchend="touchEndEnemyHandling()"
                  @click="setTargetEnemy(enemyIndex)"
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

        <!-- Character Control -->
        <div id="characterControl" class="row row-cols-5 align-items-end">
          <div class="col" v-for="(character, characterIndex) in current.playerStatus">
            <div v-if="current.turnPlayerStatus[characterIndex].action == ''">
              <div
                class="card characterCard"
                @touchstart="touchStartCharacterHandling(characterIndex)"
                @touchend="touchEndCharacterHandling()"
                v-touch="{
                  left: () => swipe('Left'),
                  right: () => swipe('Right'),
                  up: () => characterAttack(characterIndex),
                  down: () => characterDefend(characterIndex),
                }"
                :disable="current.turnPlayerStatus[characterIndex].action"
                :style="{
                  background: `linear-gradient(
            rgba(255, 255, 255, 0),
            ${
              current.playerStatus[characterIndex].properties.hp === 0
                ? 'rgba(255, 0, 0, 0.6)' // Red overlay for dead
                : 'rgba(0, 0, 0, 0)'
            }
          ), url(${playerDetails.character[characterIndex].src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }"
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
                @touchstart="touchStartCharacterHandling(characterIndex)"
                @touchend="touchEndCharacterHandling()"
                :style="{
                  background: `linear-gradient(
            rgba(0, 0, 255, 0.6),
            rgba(0, 0, 0, 0)
          ), url(${playerDetails.character[characterIndex].src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }"
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
            <div v-else-if="current.playerStatus[characterIndex].properties.hp === 0">
              <div
                class="card characterCard"
                @touchstart="touchStartCharacterHandling(characterIndex)"
                @touchend="touchEndCharacterHandling()"
                :style="{
                  background: `linear-gradient(
            rgba(255, 0, 0, 0.6),
            rgba(0, 0, 0, 0)
          ), url(${playerDetails.character[characterIndex].src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }"
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
            <div v-else>
              <div
                class="card characterCard"
                @touchstart="touchStartCharacterHandling(characterIndex)"
                @touchend="touchEndCharacterHandling()"
                :style="{
                  background: `linear-gradient(
            rgba(128, 128, 128, 0.6),
            rgba(0, 0, 0, 0)
          ), url(${playerDetails.character[characterIndex].src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }"
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
  </div>
  <div v-else class="overlay">
    <div class="overlay-content">
      <h1>Loading</h1>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute; /* Position it fixed to the viewport */
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
  display: flex; /* Use flexbox to center content */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */

  transition:
    visibility 0s,
    opacity 0.5s linear; /* Smooth transition */
  z-index: 1050;
}
/* Overlay content styles */
.overlay-content {
  color: white; /* Text color */
  text-align: center; /* Center text */
  padding: 20px; /* Padding around content */
  background: rgba(0, 0, 0, 0.8); /* Slightly darker background for content */
  border-radius: 8px; /* Rounded corners */
}
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
/* Define the fade animation for entering and leaving */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
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
        activeEnemy: -1,
        activeCharacter: -1,
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
            src: 'https://github.com/kblecc/StaticAsserts/blob/TurnBasedGame/waterslime.PNG?raw=true',
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
            src: 'https://github.com/kblecc/StaticAsserts/blob/TurnBasedGame/fireslime.PNG?raw=true',
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
            src: 'https://github.com/kblecc/StaticAsserts/blob/TurnBasedGame/lightslime.PNG?raw=true',
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
            src: 'https://github.com/kblecc/StaticAsserts/blob/TurnBasedGame/darkslime.PNG?raw=true',
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
            src: 'https://github.com/kblecc/StaticAsserts/blob/TurnBasedGame/woodslime.PNG?raw=true',
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
      isLoading: true,
      showEnemyTurn: false,
      showYourTurn: false,
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
          this.levelDetails = JSON.parse(JSON.stringify(response.data))
          console.log(this.levelDetails)
          this.current.enemyStatus = JSON.parse(JSON.stringify(this.levelDetails.waves))
          this.isLoading = false
        })
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    noOfNonDefeatEnemy() {
      return this.current.enemyStatus[this.current.wave].enemy.filter(
        (enemy) => enemy.properties.hp > 0,
      ).length
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
      for (let i = 0; i < this.current.playerStatus.length; i++) {
        if (this.current.playerStatus[i].properties.hp === 0) {
          this.current.turnPlayerStatus[i] = { action: 'defeat' }
        }
      }
    },
    newTurn() {
      this.current.turn = this.current.turn + 1
      this.resetTurnPlayerStatus()
    },

    // Wave Complete
    newWave() {
      this.current.wave = this.current.wave + 1
    },
    checkWaveComplete() {
      return this.current.enemyStatus[this.current.wave].enemy.every(
        (enemy) => enemy.properties.hp === 0,
      )
    },
    checkDefeat() {
      return this.current.playerStatus.every((character) => character.properties.hp === 0)
    },
    checkWin() {
      let winWaves = this.levelDetails.waves.length || 11111111
      console.log(winWaves)
      if (this.current.wave + 1 > winWaves) {
        return true
      } else {
        return false
      }
    },
    // // Enemy Action

    // async enemyRespond() {
    //   for (let i = 0; i < this.levelDetails.waves[this.current.wave].enemy.length; i++) {
    //     if (this.current.enemyStatus[this.current.wave].enemy[i].properties.hp > 0) {
    //       this.enemyAttackPriority(this.current.enemyStatus[this.current.wave].enemy[i])
    //     }

    //     await this.delay(1000) // Wait for 2 seconds before the next iteration
    //   }

    //   if (this.checkWaveComplete()) {
    //     this.showYourTurn = true
    //     await this.delay(2000)
    //     this.showYourTurn = false
    //     this.newWave()
    //     this.newTurn()
    //   } else {
    //     this.showYourTurn = true
    //     await this.delay(2000)
    //     this.showYourTurn = false
    //     this.newTurn()
    //   }
    // },
    // enemyAttackPriority(enemy) {
    //   switch (enemy.properties.attackMode) {
    //     case 'single': {
    //       let actionMade = false
    //       // First Proprity
    //       if (actionMade === false) {
    //         actionMade = this.enemyFirstPriorityAttack(enemy)
    //       }

    //       // Second priority: No defend character
    //       if (actionMade === false) {
    //         actionMade = this.enemySecondPriorityAttack(enemy)
    //       }
    //       //Final priority: Random attack, I want to make defend, TODO
    //       if (actionMade === false) {
    //         let character = Math.floor(Math.random() * 5)
    //         this.current.playerStatus[character].properties.hp =
    //           this.current.playerStatus[character].properties.hp - enemy.properties.attack
    //       }
    //       break
    //     }
    //     case 'multi':
    //       enemy.properties.hp =
    //         enemy.properties.hp -
    //         enemy.properties.attack / this.current.enemyStatus[this.current.wave].enemy.length
    //       break
    //     default:
    //   }
    // },
    // enemyFirstPriorityAttack(enemy) {
    //   let bonus = 30
    //   switch (enemy.properties.attribute) {
    //     case 'fire':
    //       for (let i = 0; i < 5; i++) {
    //         if (
    //           this.playerDetails.character[i].properties.attribute === 'wood' &&
    //           this.current.turnPlayerStatus[i].action !== 'defend' &&
    //           this.current.playerStatus[i].properties.hp !== 0
    //         ) {
    //           this.current.playerStatus[i].properties.hp =
    //             this.current.playerStatus[i].properties.hp -
    //             enemy.properties.attack * (1 + bonus / 100)
    //           return true
    //         }
    //       }

    //       break
    //     case 'water':
    //       for (let i = 0; i < 5; i++) {
    //         if (
    //           this.playerDetails.character[i].properties.attribute === 'fire' &&
    //           this.current.turnPlayerStatus[i].action !== 'defend' &&
    //           this.current.playerStatus[i].properties.hp !== 0
    //         ) {
    //           this.current.playerStatus[i].properties.hp =
    //             this.current.playerStatus[i].properties.hp -
    //             enemy.properties.attack * (1 + bonus / 100)

    //           return true
    //         }
    //       }
    //       break
    //     case 'wood':
    //       for (let i = 0; i < 5; i++) {
    //         if (
    //           this.playerDetails.character[i].properties.attribute === 'water' &&
    //           this.current.turnPlayerStatus[i].action !== 'defend' &&
    //           this.current.playerStatus[i].properties.hp !== 0
    //         ) {
    //           this.current.playerStatus[i].properties.hp =
    //             this.current.playerStatus[i].properties.hp -
    //             enemy.properties.attack * (1 + bonus / 100)
    //           return true
    //         }
    //       }
    //       break
    //     case 'light':
    //       for (let i = 0; i < 5; i++) {
    //         if (
    //           this.playerDetails.character[i].properties.attribute === 'dark' &&
    //           this.current.turnPlayerStatus[i].action !== 'defend' &&
    //           this.current.playerStatus[i].properties.hp !== 0
    //         ) {
    //           this.current.playerStatus[i].properties.hp =
    //             this.current.playerStatus[i].properties.hp -
    //             enemy.properties.attack * (1 + bonus / 100)
    //           return true
    //         }
    //       }
    //       break
    //     case 'dark':
    //       for (let i = 0; i < 5; i++) {
    //         if (
    //           this.playerDetails.character[i].properties.attribute === 'light' &&
    //           this.current.turnPlayerStatus[i].action !== 'defend' &&
    //           this.current.playerStatus[i].properties.hp !== 0
    //         ) {
    //           this.current.playerStatus[i].properties.hp =
    //             this.current.playerStatus[i].properties.hp -
    //             enemy.properties.attack * (1 + bonus / 100)
    //           return true
    //         }
    //       }
    //       break
    //     default:
    //   }
    //   return false
    // },
    // enemySecondPriorityAttack(enemy) {
    //   for (let i = 0; i < 5; i++) {
    //     if (
    //       this.current.turnPlayerStatus[i].action !== 'defend' &&
    //       this.current.playerStatus[i].properties.hp !== 0
    //     ) {
    //       if (this.current.playerStatus[i].properties.defend - enemy.properties.attack > 0) {
    //         this.current.playerStatus[i].properties.hp =
    //           this.current.playerStatus[i].properties.hp - enemy.properties.attack
    //       } else {
    //         this.current.playerStatus[i].properties.hp = 0
    //       }
    //       return true
    //     }
    //   }
    //   return false
    // },
    // Enemy Action
    async enemyRespond() {
      for (let i = 0; i < this.levelDetails.waves[this.current.wave].enemy.length; i++) {
        if (this.current.enemyStatus[this.current.wave].enemy[i].properties.hp > 0) {
          this.enemyAttackPriority(this.current.enemyStatus[this.current.wave].enemy[i])
        }

        await this.delay(1000) // Wait for 2 seconds before the next iteration
      }

      if (this.checkWaveComplete()) {
        this.showYourTurn = true
        await this.delay(2000)
        this.showYourTurn = false
        this.newWave()
        this.newTurn()
      } else {
        this.showYourTurn = true
        await this.delay(2000)
        this.showYourTurn = false
        this.newTurn()
      }
    },

    enemyAttackPriority(enemy) {
      switch (enemy.properties.attackMode) {
        case 'single': {
          let actionMade = false

          // First Priority Attack
          if (!actionMade) {
            actionMade = this.enemyFirstPriorityAttack(enemy)
          }

          // Second Priority Attack
          if (!actionMade) {
            actionMade = this.enemySecondPriorityAttack(enemy)
          }

          // Final Priority: Random Attack
          if (!actionMade) {
            let aliveCharacters = this.current.playerStatus
              .map((character, index) => (character.properties.hp > 0 ? index : null))
              .filter((index) => index !== null)

            if (aliveCharacters.length > 0) {
              let targetIndex = aliveCharacters[Math.floor(Math.random() * aliveCharacters.length)]
              this.current.playerStatus[targetIndex].properties.hp = Math.max(
                this.current.playerStatus[targetIndex].properties.hp - enemy.properties.attack,
                0,
              )
            }
          }
          break
        }

        case 'multi': {
          let aliveCharacters = this.current.playerStatus.filter(
            (character) => character.properties.hp > 0,
          )

          if (aliveCharacters.length > 0) {
            let damage = enemy.properties.attack / aliveCharacters.length
            aliveCharacters.forEach((character) => {
              character.properties.hp = Math.max(character.properties.hp - damage, 0)
            })
          }
          break
        }

        default:
          break
      }
    },

    enemyFirstPriorityAttack(enemy) {
      const bonus = 30
      const attributeAdvantage = {
        fire: 'wood',
        water: 'fire',
        wood: 'water',
        light: 'dark',
        dark: 'light',
      }

      const targetAttribute = attributeAdvantage[enemy.properties.attribute]

      if (targetAttribute) {
        for (let i = 0; i < 5; i++) {
          if (
            this.playerDetails.character[i].properties.attribute === targetAttribute &&
            this.current.turnPlayerStatus[i].action !== 'defend' &&
            this.current.playerStatus[i].properties.hp > 0
          ) {
            this.current.playerStatus[i].properties.hp = Math.max(
              this.current.playerStatus[i].properties.hp -
                enemy.properties.attack * (1 + bonus / 100),
              0,
            )
            return true
          }
        }
      }
      return false
    },

    enemySecondPriorityAttack(enemy) {
      for (let i = 0; i < 5; i++) {
        if (
          this.current.turnPlayerStatus[i].action !== 'defend' &&
          this.current.playerStatus[i].properties.hp > 0
        ) {
          this.current.playerStatus[i].properties.hp = Math.max(
            this.current.playerStatus[i].properties.hp - enemy.properties.attack,
            0,
          )
          return true
        }
      }
      return false
    },

    // Player Action
    touchStartCharacterHandling(index) {
      this.pressTimer = setTimeout(() => {
        this.current.activeCharacterDetails = index
      }, 500)
    },
    touchEndCharacterHandling() {
      clearTimeout(this.pressTimer)
      this.current.activeCharacterDetails = -1
    },
    touchStartEnemyHandling(index) {
      this.pressTimer = setTimeout(() => {
        this.current.activeEnemyDetails = index
      }, 500)
    },
    touchEndEnemyHandling() {
      clearTimeout(this.pressTimer)
      this.current.activeEnemyDetails = -1
    },
    async characterAttack(index) {
      let atk = this.playerDetails.character[index].properties.attack
      let bonus = 50

      if (this.playerDetails.character[index].properties.attackMode === 'single') {
        if (this.current.activeEnemy !== -1) {
          this.current.turnPlayerStatus[index].action = 'attack'
          //attack attribute power
          switch (this.playerDetails.character[index].properties.attribute) {
            case 'fire':
              if (
                this.current.enemyStatus[this.current.wave].enemy[this.current.activeEnemy]
                  .properties.attribute === 'wood'
              ) {
                atk = atk * (1 + bonus / 100)
              }
              break
            case 'water':
              if (
                this.current.enemyStatus[this.current.wave].enemy[this.current.activeEnemy]
                  .properties.attribute === 'fire'
              ) {
                atk = atk * (1 + bonus / 100)
              }
              break
            case 'wood':
              if (
                this.current.enemyStatus[this.current.wave].enemy[this.current.activeEnemy]
                  .properties.attribute === 'water'
              ) {
                atk = atk * (1 + bonus / 100)
              }
              break
            case 'light':
              if (
                this.current.enemyStatus[this.current.wave].enemy[this.current.activeEnemy]
                  .properties.attribute === 'dark'
              ) {
                atk = atk * (1 + bonus / 100)
              }
              break
            case 'dark':
              if (
                this.current.enemyStatus[this.current.wave].enemy[this.current.activeEnemy]
                  .properties.attribute === 'light'
              ) {
                atk = atk * (1 + bonus / 100)
              }
              break
            default:
          }
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
          let selectedEnemy = 0
          for (let i = 0; i < this.current.enemyStatus[this.current.wave].enemy.length; i++) {
            if (this.current.enemyStatus[this.current.wave].enemy[i].properties.hp > 0) {
              selectedEnemy = i

              break
            }
          }

          //attack attribute power
          switch (this.playerDetails.character[index].properties.attribute) {
            case 'fire':
              if (
                this.current.enemyStatus[this.current.wave].enemy[selectedEnemy].properties
                  .attribute === 'wood'
              ) {
                atk = atk * (1 + bonus / 100)
              }
              break
            case 'water':
              if (
                this.current.enemyStatus[this.current.wave].enemy[selectedEnemy].properties
                  .attribute === 'fire'
              ) {
                atk = atk * (1 + bonus / 100)
              }
              break
            case 'wood':
              if (
                this.current.enemyStatus[this.current.wave].enemy[selectedEnemy].properties
                  .attribute === 'water'
              ) {
                atk = atk * (1 + bonus / 100)
              }
              break
            case 'light':
              if (
                this.current.enemyStatus[this.current.wave].enemy[selectedEnemy].properties
                  .attribute === 'dark'
              ) {
                atk = atk * (1 + bonus / 100)
              }
              break
            case 'dark':
              if (
                this.current.enemyStatus[this.current.wave].enemy[selectedEnemy].properties
                  .attribute === 'light'
              ) {
                atk = atk * (1 + bonus / 100)
              }
              break
            default:
          }
          this.current.enemyStatus[this.current.wave].enemy[selectedEnemy].properties.hp =
            this.current.enemyStatus[this.current.wave].enemy[selectedEnemy].properties.hp - atk
          if (this.current.enemyStatus[this.current.wave].enemy[selectedEnemy].properties.hp < 0) {
            this.current.enemyStatus[this.current.wave].enemy[selectedEnemy].properties.hp = 0
          }
        }
      } else if (this.playerDetails.character[index].properties.attackMode === 'multi') {
        console.log('attack')
        this.current.turnPlayerStatus[index].action = 'attack'

        this.current.enemyStatus[this.current.wave].enemy.forEach((enemy) => {
          let atkBouns = 1
          //attack attribute power
          let atk = this.playerDetails.character[index].properties.attack
          switch (this.playerDetails.character[index].properties.attribute) {
            case 'fire':
              if (enemy.properties.attribute === 'wood') {
                atkBouns = 1 + bonus / 100
              }
              break
            case 'water':
              if (enemy.properties.attribute === 'fire') {
                atkBouns = 1 + bonus / 100
              }
              break
            case 'wood':
              if (enemy.properties.attribute === 'water') {
                atkBouns = 1 + bonus / 100
              }
              break
            case 'light':
              if (enemy.properties.attribute === 'dark') {
                atkBouns = 1 + bonus / 100
              }
              break
            case 'dark':
              if (enemy.properties.attribute === 'light') {
                atkBouns = 1 + bonus / 100
              }
              break
            default:
          }
          //Calculate HP
          let noOfEnemy = this.noOfNonDefeatEnemy()
          let hpToBeDeduct = atkBouns * (atk / noOfEnemy)

          if (enemy.properties.hp - hpToBeDeduct >= 0) {
            console.log('1', atkBouns, atk, noOfEnemy, hpToBeDeduct, enemy.properties.hp)
            enemy.properties.hp = enemy.properties.hp - hpToBeDeduct
          } else {
            console.log('2', enemy.properties.hp)
            enemy.properties.hp = 0
          }
        })
      }
      if (this.checkWaveComplete()) {
        this.newWave()
        this.newTurn()
      } else {
        if (this.checkTurnComplete()) {
          this.showEnemyTurn = true
          await this.delay(2000)
          this.showEnemyTurn = false
          this.enemyRespond()
        }
      }
    },
    async characterDefend(index) {
      this.current.turnPlayerStatus[index].action = 'defend'
      if (this.checkTurnComplete()) {
        this.showEnemyTurn = true
        await this.delay(2000)
        this.showEnemyTurn = false
        this.enemyRespond()
      }
    },
    characterActiveSkill(index) {
      //not yet
    },
    //
    setTargetEnemy(index) {
      if (this.current.activeEnemy === index) {
        this.current.activeEnemy = -1
      } else {
        this.current.activeEnemy = index
      }
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
  async created() {
    this.getLevelDetails()
    this.current.playerStatus = JSON.parse(JSON.stringify(this.playerDetails.character))
    this.showYourTurn = true
    await this.delay(2000)
    this.showYourTurn = false
  },
}
</script>
