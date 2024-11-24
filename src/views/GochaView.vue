<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {}
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
          this.current.enemyStatus = this.levelDetails.waves
          console.log(response)
        })
    },
  },
}
</script>
