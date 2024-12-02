<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <!-- <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"

    >
      menu
    </button> -->
    <button
      type="debug button "
      class="btn btn-primary"
     @click="this.$router.push('/storagedebug')"

    >
      dev
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

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <router-view v-slot="{ Component }">
  <transition>
    <component :is="Component" />
  </transition>
</router-view>
</template>

<script>
export default {
  computed: {
    transitionName() {
      return this.$route.name === 'story' ? 'slide-left' : 'slide-right';
    },
  },
};
</script>

<style scoped>
.debug{
  position: absolute; /* Position it fixed to the viewport */
  top: 0; /* Align to the top */
  left: 0; /* Align to the left */
}
/* Slide-left and slide-right transitions */
.slide-left-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s;
}
.slide-left-enter, .slide-right-leave-to {
  transform: translateX(100%);
}
.slide-right-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s;
}
.slide-right-enter, .slide-left-leave-to {
  transform: translateX(-100%);
}</style>
