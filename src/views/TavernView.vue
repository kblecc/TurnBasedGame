<template>
  <button type="button" class="btn btn-primary" @click="this.$router.push('/home')">◀</button>
  <div class="container mt-4">
    <!-- Gacha Info -->
    <div class="row">
      <div class="col">
        <h3>Welcome, to the Tavern, meet some new friends</h3>
        <div class="card">💎 Gems: {{ gems }}</div>
        <p>Yocan can invite one new friend to you team for 20 Gems, or 10 for 180 Gems</p>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <button class="btn btn-primary" :disabled="gems < 20" @click="draw(1)">
          Invite 1 (20 Gems)
        </button>
      </div>
      <div class="col-md-6">
        <button class="btn btn-primary" :disabled="gems < 180" @click="draw(10)">
          Invite 10 (180 Gems)
        </button>
      </div>
    </div>
    <div v-if="drawnCharacters.length" class="mt-4">
      <h4>Drawn Characters</h4>
      <div class="row">
        <div v-for="(character, index) in drawnCharacters" :key="index" class="col-md-2 mb-4">
          <div class="card">
            <img :src="character.src" class="card-img-top" alt="Character Image" />
            <div class="card-body">
              <h5 class="card-title">{{ character.name }}</h5>
              <p class="card-text">
                {{ character.properties.grade }} - {{ character.properties.attribute }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Asserts from '@/components/Asserts'
import characters from '@/components/characters' // Path to your character list

export default {
  data() {
    return {
      gems: 0, // Initial gems
      drawnCharacters: [],
      drawProbabilities: {
        SSR: 0.01,
        SR: 0.1,
        R: 0.3,
        N: 0.59,
      },
    }
  },
  created() {
    this.loadStoredCharacters()
  },
  mounted() {
    this.gems = Asserts.getGem()
  },
  methods: {
    // Load stored characters from localStorage
    loadStoredCharacters() {
      const storedCharacters = JSON.parse(localStorage.getItem('collectedCharacters')) || []
      this.drawnCharacters = storedCharacters
    },

    // Handle drawing characters
    draw(numDraws) {
      if (numDraws === 1 && this.gems < 20) return
      if (numDraws === 10 && this.gems < 180) return

      // Deduct gems for the draw using the decreaseGem function
      const gemCost = numDraws === 1 ? 20 : 180
      Asserts.decreaseGem('gem', gemCost) // Use the decreaseGem function to deduct gems
       this.gems = Asserts.getGem();

      // Draw the characters
      const newDrawn = []
      for (let i = 0; i < numDraws; i++) {
        const drawnCharacter = this.drawCharacter()
        newDrawn.push(drawnCharacter)
      }

      // Add the drawn characters to the collection
      this.drawnCharacters.push(...newDrawn)
      this.saveCharactersToLocalStorage()
    },

    // Draw a single character based on probability
    drawCharacter() {
      const randomNum = Math.random()
      let cumulativeProbability = 0

      for (let grade in this.drawProbabilities) {
        cumulativeProbability += this.drawProbabilities[grade]
        if (randomNum < cumulativeProbability) {
          return this.getCharacterByGrade(grade)
        }
      }

      return this.getCharacterByGrade('N') // Default to N if something goes wrong
    },

    // Get a character based on grade
    getCharacterByGrade(grade) {
      const filteredCharacters = characters.filter(
        (character) => character.properties.grade === grade,
      )
      const randomIndex = Math.floor(Math.random() * filteredCharacters.length)
      return filteredCharacters[randomIndex]
    },

    // Save characters to local storage
    saveCharactersToLocalStorage() {
      localStorage.setItem('collectedCharacters', JSON.stringify(this.drawnCharacters))
    },
  },
}
</script>

<style scoped>
.card {
  text-align: center;
}
</style>
