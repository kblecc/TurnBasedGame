<template>
  <div class="about">
    <h1>Battle</h1>

    <div v-for="(round, roundIndex) in levelDetails.rounds">
      <div v-if="current.round == roundIndex">
        <h2>Round {{ round.order }}/{{ levelDetails.rounds.length }}</h2>
        <div class="col" v-for="(enemy, enemyIndex) in levelDetails.rounds[roundIndex].enemy">
          <div
            class="progress"
            role="progressbar"
            aria-label="Example with label"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="progress-bar" style="width: 25%">25%</div>
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
        <div class="card" @click="setActiveCharacterDetails(characterIndex)">
          <div class="card-body" :id="'character' + characterIndex">
            <h5 class="card-title">{{ character.name }}</h5>
          </div>
        </div>
        <div
          class="progress"
          role="progressbar"
          aria-label="Example with label"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div class="progress-bar" :style="getCharacterHpPercent(characterIndex)">25%</div>
        </div>
        <div
          class="progress"
          role="progressbar"
          aria-label="Example with label"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div class="progress-bar" style="width: 25%">25%</div>
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
              hp: 200,
              attack: 100,
              attackMode: 'single',
              defend: 100,
              skills: '111',
            },
          },
          {
            order: 2,
            name: 'fire',
            properties: {hp: 200,
              attack: 100,
              attackMode: 'single',
              defend: 100,
              skills: '111',
            },
          },
          {
            order: 3,
            name: 'light',
            properties: {hp: 200,
              attack: 100,
              attackMode: 'single',
              defend: 100,
              skills: '111',
            },
          },
          {
            order: 4,
            name: 'dark',
            properties: {hp: 200,
              attack: 100,
              attackMode: 'single',
              defend: 100,
              skills: '111',
            },
          },
          {
            order: 5,
            name: 'leaf',
            properties: {hp: 200,
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
    getCharacterHpPercent(index){
      return "width:"+this.current.playerStatus[index]/this.playerDetails.character[index];
    }
  },
  mounted() {
    this.current.playerStatus = this.playerDetails.character
    console.log(this.current.playerStatus)
  },
}
</script>
