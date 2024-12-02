<template>
  <div class="container mt-4">
    <button type="button" class="btn btn-primary" @click="this.$router.push('/home')">◀</button>
    <h3>Collected Characters</h3>
    <div class="row">
      <!-- Display characters in 3 cards per row on all device sizes -->
      <div v-for="(character, index) in collectedCharacters" :key="index" class="col-4 mb-4">
        <div class="card" @click="showCharacterDetails(character)">
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

    <!-- Modal to display character details -->
    <div
      class="modal fade"
      id="characterModal"
      tabindex="-1"
      aria-labelledby="characterModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="characterModalLabel">{{ selectedCharacter?.name }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <img :src="selectedCharacter?.src" class="img-fluid" alt="Character Image" />
            <p><strong>Grade:</strong> {{ selectedCharacter?.properties.grade }}</p>
            <p><strong>Attribute:</strong> {{ selectedCharacter?.properties.attribute }}</p>
            <p><strong>HP:</strong> {{ selectedCharacter?.properties.hp }}</p>
            <p><strong>Attack:</strong> {{ selectedCharacter?.properties.attack }}</p>
            <p><strong>Defend:</strong> {{ selectedCharacter?.properties.defend }}</p>
            <p><strong>Skill Turn:</strong> {{ selectedCharacter?.properties.skillTurn }}</p>
            <p><strong>Attack Mode:</strong> {{ selectedCharacter?.properties.attackMode }}</p>
            <p><strong>Skills:</strong> {{ selectedCharacter?.properties.skills }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectedCharacters: [],
      selectedCharacter: null, // To store the clicked character details
    }
  },
  created() {
    this.loadCollectedCharacters()
  },
  methods: {
    loadCollectedCharacters() {
      const storedCharacters = JSON.parse(localStorage.getItem('collectedCharacters')) || []
      this.collectedCharacters = storedCharacters
    },
    showCharacterDetails(character) {
      // Show the modal with the selected character's details
      this.selectedCharacter = character
      // Trigger Bootstrap modal
      const modal = new bootstrap.Modal(document.getElementById('characterModal'))
      modal.show()
    },
  },
}
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
