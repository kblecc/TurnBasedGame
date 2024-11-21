<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script>
export default {
  data() {
    return {
      action: 'x',
      isMoving: false,
      swipeDirection: 'None',
    }
  },
  methods: {
    getCharacterFromStore() {
      localStorage.getItem('character')
    },
    setCharacterToStore() {
      localStorage.setItem('character')
    },
    startMove(e) {
      this.isMoving = true
    },
    endMove(e) {
      this.isMoving = false
    },
    doMove(e) {
      if (this.isMoving) {
        const clientX = e.clientX || e.changedTouches[0].clientX
        const clientY = e.clientY || e.changedTouches[0].clientY
        console.log(document.elementFromPoint(clientX, clientY).innerHTML)
      }
    },
    swipe(direction) {
      this.swipeDirection = direction
    },
  },
}
</script>
