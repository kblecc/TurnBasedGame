<template>
  <button type="button" class="btn btn-primary" @click="this.$router.push('/home')">◀</button>
  <div class="map" ref="map">
    <div v-for="(area, areaIndex) in reversedMap">
      <div class="card" @click="this.setActiveArea(area.id)">
        <h1>{{ area.areaName }}</h1>
      </div>
      <Transition name="pop">
        <div v-show="areaIndex === this.activeArea" class="overlay">
          <div class="overlay-content">
            <button type="button" class="btn btn-primary" @click="this.setActiveArea(-1)">
              ◀
            </button>
            <div v-for="(lv, lvIndex) in area.levels">
              <div class="card" @click="this.$router.push(this.urlConstruct(area,lv))">
                {{ lv.lvName }}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: [
        {
          id: 1,
          areaName: 'Welcome',
          levels: [
            {
              lvName: 'A new World',
              type: 'story',
              targetID: 1,
              id: 1,
            },
            {
              lvName: 'first battle',
              type: 'battle',
              targetID: 1,
              id: 2,
            },
            {
              lvName: 'second battle',
              type: 'battle',
              targetID: 2,
              id: 3,
            },
            {
              lvName: 'Beginning of Story',
              type: 'story',
              targetID: 3,
              id: 4,
            },
          ],
        },
        {
          id: 2,
          areaName: 'Journey Begin',
          levels: [
            {
              lvName: 'Beginning of Story',
              type: 'story',
              targetID: 1,
              id: 1,
            },
            {
              lvName: 'first battle',
              type: 'battle',
              targetID: 1,
              id: 2,
            },
            {
              lvName: 'second battle',
              type: 'battle',
              targetID: 2,
              id: 3,
            },
            {
              lvName: 'Beginning of Story',
              type: 'story',
              targetID: 3,
              id: 4,
            },
          ],
        },
      ],
      displayMap: [],
      activeArea: -1,
      playerUnlocked: { area: 1, lv: 3 },
    }
  },
  mounted() {
    // Scroll to the bottom of the roadmap container when the component mounts
    this.map
      .slice()
      .reverse()
      .map((area) => {
        // For each area, reverse the levels array
        return {
          ...area,
          levels: area.levels.slice().reverse(),
        }
      })
    this.scrollToBottom()
  },
  computed: {
    reversedMap() {
      // Reverse the map array
      return this.map
        .slice()
        .reverse()
        .map((area) => {
          // For each area, reverse the levels array
          return {
            ...area,
            levels: area.levels.slice().reverse(),
          }
        })
    },
  },
  methods: {
    scrollToBottom() {
      const mapElement = this.$refs.map
      mapElement.scrollTop = mapElement.scrollHeight
    },
    setActiveArea(index) {
      this.activeArea = this.map.length - index
      console.log(this.activeArea)
    },
    urlConstruct(area,lv){
      let url= ""
      if (lv.type==="story"){
        return "/story/"+area.id+"-"+lv.targetID
      }else if (lv.type==="battle"){
        return "/battle/"+area.id+"-"+lv.targetID
      }

    }
  },
}
</script>

<style scoped>
.map {
  overflow: auto;
  overflow-y: scroll; /* Hide vertical scrollbar */
  overflow-x: hidden;
}
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

  z-index: 1050;
}
/* Overlay content styles */
.overlay-content {
  color: white; /* Text color */
  width: 100%;
  height: 100%;
  padding: 20px; /* Padding around content */
  background: rgba(0, 0, 0, 0.8); /* Slightly darker background for content */
  border-radius: 8px; /* Rounded corners */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  animation-duration: 0.3s;
  animation-name: animate-pop-in;
  animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
}

.pop-leave-active {
  animation-duration: 0.2s;
  animation-name: animate-pop-out;
  animation-timing-function: cubic-bezier(1.48, 0.74, 0.53, 0.26);
}
@keyframes animate-pop-in {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

@keyframes animate-pop-out {
  0% {
    opacity: 1;
    transform: scale(1, 1);
  }

  100% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
}
</style>
