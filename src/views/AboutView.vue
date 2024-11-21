<template>
  <div class="about">
    {{ action }}
    <div
      class="card"
      @touchstart="nameCurrentEvent('touchstart')"
      @touchmove="nameCurrentEvent('touchmove')"
      @touchend="nameCurrentEvent('touchend')"
    >
      test touch
    </div>

    <div
      class="card"
      @mousedown="startMove()"
      @mouseup="endMove()"
      @mousemove="doMove()"
      @touchstart="startMove()"
      @touchend="endMove()"
      @touchmove="doMove()"
    >
      test touch vue touch
    </div>

    <br /><br /><br />{{ swipeDirection }} <br /><br /><br />
    <div
      class="card"
      v-touch="{
        left: () => swipe('Left'),
        right: () => swipe('Right'),
        up: () => swipe('Up'),
        down: () => swipe('Down'),
      }"
    >
      vueify test
    </div>
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
    nameCurrentEvent(x) {
      this.action = x
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
