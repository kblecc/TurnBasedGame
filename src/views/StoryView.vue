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
      <div v-if="!currentConversation.option" class="dialogue" @click="nextConversation">
        <p>{{ parseText(currentConversation.said) }}</p>
      </div>
      <div v-if="currentConversation.option" class="dialogue">
        <p>{{ parseText(currentConversation.said) }}</p>
        <div class="options">
          <button
            v-for="(opt, index) in currentConversation.option"
            :key="index"
            @click="gotoConversation(opt.goto)"
          >
            {{ opt.option }}
          </button>
        </div>
      </div>
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
          src: 'https://placehold.co/600x400?text=Welcome+to+the+Team!',
        },
        {
          id: 1,
          type: 'fullScreen',
          src: 'https://placehold.co/600x400?text=Great+to+Meet+You!',
        },
        {
          id: 2,
          type: 'fullScreen',
          src: 'https://placehold.co/600x400?text=New+Adventures+Together!',
        },
        {
          id: 3,
          type: 'conversation',
          conversation: [
            {
              conversationID: 0,
              character: 'NewFriend1',
              said: 'Hi! I am your new friend!',
              src: {
                background: 'https://placehold.co/600x400?text=Friendly+Welcome',
                character: 'https://placehold.co/600x400?text=Character+Image+1',
              },
            },
            {
              conversationID: 1,
              character: 'Player',
              said: 'Hello! What is your name?',
              src: {
                background: 'https://placehold.co/600x400?text=Player+Background',
                character: 'https://placehold.co/600x400?text=Player+Image',
              },
            },
            {
              conversationID: 2,
              character: 'NewFriend1',
              said: 'My name is Slimy! It’s great to be part of your team!',
              option: [
                { option: 'Welcome to the team, Slimy!', goto: 3 },
                { option: 'What can you do to help me?', goto: 4 },
              ],
              src: {
                background: 'https://placehold.co/600x400?text=New+Character+Image+2',
                character: 'https://placehold.co/600x400?text=Character+Image+2',
              },
            },
            {
              conversationID: 3,
              character: 'NewFriend1',
              said: 'Thank you! I will always be here to support you.',
              src: {
                background: 'https://placehold.co/600x400?text=Team+Image+1',
                character: 'https://placehold.co/600x400?text=Character+Image+1',
              },
            },
            {
              conversationID: 4,
              character: 'NewFriend1',
              said: 'I can help with defense and healing! You can count on me!',
              src: {
                background: 'https://placehold.co/600x400?text=Character+Ability+Image',
                character: 'https://placehold.co/600x400?text=Character+Image+3',
              },
            },
          ],
        },
      ],

      currentStoryIndex: 0,
      currentConversationIndex: 0,
      playerName: 'Player',
    }
  },
  computed: {
    currentStory() {
      return this.story[this.currentStoryIndex]
    },
    currentConversation() {
      return this.currentStory.conversation[this.currentConversationIndex]
    },
  },
  methods: {
    nextStory() {
      if (this.currentStoryIndex + 1 < this.story.length) {
        this.currentStoryIndex++
        this.currentConversationIndex = 0 // Reset conversation index when switching stories
      }
    },
    nextConversation() {
      if (this.currentConversationIndex + 1 < this.currentStory.conversation.length) {
        this.currentConversationIndex++
      } else {
        this.nextStory()
      }
    },
    gotoConversation(gotoIndex) {
      this.currentConversationIndex = this.currentStory.conversation.findIndex(
        (c) => c.conversationID === gotoIndex,
      )
    },
    parseText(text) {
      return text.replace('{playerName}', this.playerName)
    },
  },
}
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
