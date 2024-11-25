<script setup></script>

<template>
  <div :style="backgroundStyle" class="story-container" @click="nextItem">
    <div v-if="currentType === 'fullScreen'" class="full-screen">
      <img :src="currentSrc" alt="Story Image" />
    </div>
    <div v-else-if="currentType === 'conversation'" class="conversation">
      <div class="character-image">
        <img :src="currentCharacterSrc" alt="Character Image" />
      </div>
      <div class="dialogue">
        <p>{{ currentCharacter }}: {{ currentSaid }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      story: [
        {
          id: 1,
          type: 'fullScreen',
          src: 'https://placehold.co/600x400?text=1',
        },
        {
          id: 2,
          type: 'fullScreen',
          src: 'https://placehold.co/600x400?text=2',
        },
        {
          id: 3,
          type: 'fullScreen',
          src: 'https://placehold.co/600x400?text=3',
        },
        {
          id: 4,
          type: 'conversation',
          conversation: [
            {
              conversationID: 1,
              character: 'Name',
              said: 'Hello',
              src: {
                background: 'https://placehold.co/600x400?text=5',
                character: 'https://placehold.co/600x400?text=4',
              },
            },
            {
              conversationID: 2,
              character: 'Name1',
              said: 'Hello,{playerName}',
              src: {
                background: 'https://placehold.co/600x400?text=6',
                character: 'https://placehold.co/600x400?text=7',
              },
            },
            {
              conversationID: 3,
              character: 'Name',
              said: 'hey',
              option: [
                { option: 'ddddd', goto: 5 },
                { option: 'ddddd', goto: 6 },
              ],
              src: {
                background: 'https://placehold.co/600x400?text=8',
                character: 'https://placehold.co/600x400?text=9',
              },
            },
            {
              conversationID: 5,
              character: 'Nameoption1',
              said: 'Hello',
              src: {
                background: 'https://placehold.co/600x400?text=10',
                character: 'https://placehold.co/600x400?text=11',
              },
            },
            {
              conversationID: 6,
              character: 'Name1option2',
              said: 'Hello,{playerName}',
              src: {
                background: 'https://placehold.co/600x400?text=12',
                character: 'https://placehold.co/600x400?text=13',
              },
            },
          ],
        },
      ],
      currentIndex: 0,
      conversationIndex: 0
    }
  },
  computed: {
    currentType() {
      return this.story[this.currentIndex].type
    },
    currentSrc() {
      return this.story[this.currentIndex].src
    },
    currentCharacter() {
      if (this.currentType === 'conversation') {
        return this.story[this.currentIndex].conversation[this.conversationIndex].character
      }
      return ''
    },
    currentSaid() {
      if (this.currentType === 'conversation') {
        return this.story[this.currentIndex].conversation[this.conversationIndex].said
      }
      return ''
    },
    currentCharacterSrc() {
      if (this.currentType === 'conversation') {
        return this.story[this.currentIndex].conversation[this.conversationIndex].src.character
      }
      return ''
    },
    backgroundStyle() {
      if (this.currentType === 'conversation') {
        return {
          backgroundImage: `url(${this.story[this.currentIndex].conversation[this.conversationIndex].src.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
        }
      }
      return {}
    },
    conversationIndex() {
      if (this.currentType === 'conversation') {
        return this.story[this.currentIndex].conversation.findIndex(
          (conv) => conv.conversationID === this.currentConversationID,
        )
      }

      return 0
    },
    currentConversationID() {
      console.log(this.conversationIndex);
      if (
        this.currentType === 'conversation' &&
        this.story[this.currentIndex].conversation[this.conversationIndex].conversationID
      ) {
        return this.story[this.currentIndex].conversation[this.conversationIndex].conversationID
      }
      return null
    },
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
    nextItem() {
      if (this.currentType === 'fullScreen') {
        this.currentIndex++
      } else if (this.current.type === 'conversation') {
        if (this.conversationIndex < this.story[this.currentIndex].conversation.length - 1) {
          this.conversationIndex++
        } else {
          this.currentIndex++ // Move to the next item after the last conversation
          this.conversationIndex = 0 // Reset conversation index for the next item
        }
      }
    },
  },
}
</script>

<style scoped>
.story-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.full-screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.conversation {
  position: relative;
  width: 100%;
  height: 100%;
}

.character-image {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}

.dialogue {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
}
</style>
