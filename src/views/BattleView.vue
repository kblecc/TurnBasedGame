<template>
  <div class="about">
    <div>
      <h1>Battle</h1>

      <div v-for="(round, roundIndex) in levelDetails.rounds">
        <div v-if="current.round == roundIndex">
          <h2>Round {{ round.order }}/{{ levelDetails.rounds.length }}</h2>
          <div class="col" v-for="(enemy, enemyIndex) in levelDetails.rounds[roundIndex].enemy">
            <div class="progress">
              <div class="progress-bar" :style="getEnemyHpPercent(roundIndex, enemyIndex)">
                {{ current.enemyStatus[roundIndex].enemy[enemyIndex].properties.hp }}/{{
                  levelDetails.rounds[roundIndex].enemy[enemyIndex].properties.hp
                }}
              </div>
            </div>
            <div class="progress">
              <div class="progress-bar" :style="getEnemySpPercent(roundIndex, enemyIndex)">
                {{ current.enemyStatus[roundIndex].enemy[enemyIndex].properties.sp }}/{{
                  levelDetails.rounds[roundIndex].enemy[enemyIndex].properties.maxSp
                }}
              </div>
            </div>
          </div>
          <div class="row row-cols-5">
            <div class="col" v-for="(enemy, enemyIndex) in levelDetails.rounds[roundIndex].enemy">
              <div class="card" @click="setActiveEnemyDetails(enemyIndex)">
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
      <div class="row row-cols-5">
        <div class="col" v-for="(character, characterIndex) in current.playerStatus">
          <div
            class="card"
            v-touch:swipe.top="characterAttack(characterIndex)"
          >
            <div class="card-body" :id="'character' + characterIndex">
              <h5 class="card-title">{{ character.name }}</h5>
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
.carousel-home-resources {
  .left-1 {
    transform: translateX(-500px) translateZ(-400px) !important;
  }
  .right-1 {
    transform: translateX(500px) translateZ(-400px) !important;
  }
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      action: "",
      current: {
        round: 0,
        activeEnemy: 0,
        activeCharacter: 0,
        activeEnemyDetails: -1,
        activeCharacterDetails: -1,
        playerStatus: [],
        enemyStatus: {},
      },
      playerDetails: {
        character: [
          {
            order: 1,
            name: 'water',
            properties: {
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
            name: 'leaf',
            properties: {
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
      levelDetails: {
        area: 1,
        level: 1,
        rounds: [
          {
            order: 1,
            enemy: [
              {
                default_order: 1,
                name: 'monster 11',
                properties: {
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
                default_order: 2,
                name: 'monster 12',
                properties: {
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
                default_order: 3,
                name: 'monster 13',
                properties: {
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
                default_order: 4,
                name: 'monster 14',
                properties: {
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
                default_order: 5,
                name: 'monster 15',
                properties: {
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
          {
            order: 2,
            enemy: [
              {
                default_order: 1,
                name: 'monster 21',
                properties: {
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
                default_order: 2,
                name: 'monster 22',
                properties: {
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
                default_order: 3,
                name: 'monster 23',
                properties: {
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
                default_order: 4,
                name: 'monster 24',
                properties: {
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
                default_order: 5,
                name: 'monster 25',
                properties: {
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
          {
            order: 3,
            enemy: [
              {
                default_order: 1,
                name: 'monster 31',
                properties: {
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
                default_order: 2,
                name: 'monster 32',
                properties: {
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
                default_order: 3,
                name: 'monster 33',
                properties: {
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
                default_order: 4,
                name: 'monster 34',
                properties: {
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
                default_order: 5,
                name: 'monster 35',
                properties: {
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
        ],
      },
    }
  },

  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    notify() {
      alert('navigation was prevented.')
    },
    getLevelDetails() {
      axios
        .get(
          'https://gist.githubusercontent.com/kblecc/58ce2dd417b53e3e7eedf165fa5aa749/raw/18d93daf9768dd60cecc1681ee608b742d49ef90/' +
            this.$route.params.id +
            '.json',
        )
        .then((response) => (this.levelDetails = response.data))
    },
    // Control
    setActiveCharacterDetails(index) {
      if (index !== this.current.activeCharacterDetails) {
        this.current.activeCharacterDetails = index
      } else {
        this.current.activeCharacterDetails = -1
      }
    },
    setActiveEnemyDetails(index) {
      if (index !== this.current.activeEnemyDetails) {
        this.current.activeEnemyDetails = index
      } else {
        this.current.activeEnemyDetails = -1
      }
    },
    clearActiveCharacterDetails() {
      this.current.activeEnemyDetails = -1
    },
    characterAttack(index){console.log("atk",index);
      if (this.current.activeEnemy!==-1){
        this.current.enemyStatus[this.current.round].enemy[this.current.activeEnemy].properties.hp = this.current.enemyStatus[this.current.round].enemy[this.current.activeEnemy].properties.hp - this.current.playerStatus[index].properties.attack;
      } else {
        this.current.enemyStatus[this.current.round].enemy[0].properties.hp = this.current.enemyStatus[this.current.round].enemy[this.current.activeEnemy].properties.hp - this.current.playerStatus[index].properties.attack;
      }

    },
    // Character
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
    // Enemy
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
    this.current.playerStatus = this.playerDetails.character
    this.current.enemyStatus = this.levelDetails.rounds

    console.log(this.current.playerStatus)
  },
}
</script>
