<template>
  <div>
    <!-- Comic Mode -->
    <div v-if="currentStory.type === 'fullScreen'" class="comic-mode" @click="nextStory">
      <img :src="currentStory.src" alt="Story Image" />
    </div>

    <!-- Conversation Mode -->
    <div v-else-if="currentStory.type === 'conversation'" class="conversation-mode">
      <img :src="currentConversation.src.background" alt="Background Image" class="background" />
      <div class="character">
        <img :src="currentConversation.src.character" alt="Character Image" />
      </div>
      <p class="dialogue">{{ parseText(currentConversation.said) }}</p>
      <div v-if="currentConversation.option" class="options">
        <button
          v-for="(opt, index) in currentConversation.option"
          :key="index"
          @click="gotoConversation(opt.goto)"
        >
          {{ opt.option }}
        </button>
      </div>
      <button v-else @click="nextConversation">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      story: [
        {
          id: 0,
          type: 'fullScreen',
          src: 'https://placehold.co/600x400?text=1',
        },
        {
          id: 1,
          type: 'fullScreen',
          src: 'https://placehold.co/600x400?text=2',
        },
        {
          id: 2,
          type: 'fullScreen',
          src: 'https://placehold.co/600x400?text=3',
        },
        {
          id: 3,
          type: 'conversation',
          conversation: [
            {
              conversationID: 0,
              character: 'Name',
              said: 'Hello',
              src: {
                background: 'https://placehold.co/600x400?text=5',
                character: 'https://placehold.co/600x400?text=4',
              },
            },
            {
              conversationID: 1,
              character: 'Name1',
              said: 'Hello,{playerName}',
              src: {
                background: 'https://placehold.co/600x400?text=6',
                character: 'https://placehold.co/600x400?text=7',
              },
            },
            {
              conversationID: 2,
              character: 'Name',
              said: 'Hey',
              option: [
                { option: 'Option 1', goto: 3 },
                { option: 'Option 2', goto: 4 },
              ],
              src: {
                background: 'https://placehold.co/600x400?text=8',
                character: 'https://placehold.co/600x400?text=9',
              },
            },
            {
              conversationID: 3,
              character: 'Nameoption1',
              said: 'Hello',
              src: {
                background: 'https://placehold.co/600x400?text=10',
                character: 'https://placehold.co/600x400?text=11',
              },
            },
            {
              conversationID: 4,
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
      currentStoryIndex: 0,
      currentConversationIndex: 0,
      playerName: 'Player',
    };
  },
  computed: {
    currentStory() {
      return this.story[this.currentStoryIndex];
    },
    currentConversation() {
      return this.currentStory.conversation[this.currentConversationIndex];
    },
  },
  methods: {
    nextStory() {
      if (this.currentStoryIndex + 1 < this.story.length) {
        this.currentStoryIndex++;
        this.currentConversationIndex = 0; // Reset conversation index when switching stories
      }
    },
    nextConversation() {
      if (this.currentConversationIndex + 1 < this.currentStory.conversation.length) {
        this.currentConversationIndex++;
      } else {
        this.nextStory();
      }
    },
    gotoConversation(gotoIndex) {
      this.currentConversationIndex = this.currentStory.conversation.findIndex(
        (c) => c.conversationID === gotoIndex
      );
    },
    parseText(text) {
      return text.replace('{playerName}', this.playerName);
    },
  },
};
</script>

<style scoped>
.comic-mode img,
.conversation-mode .background {
  width: 100%;
  height: auto;
}
.character img {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
}
.dialogue {
  position: absolute;
  bottom: 5%;
  left: 10%;
  right: 10%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.options button {
  margin: 5px;
  padding: 10px;
}
</style>
