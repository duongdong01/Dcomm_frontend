<template>
  <div class="grid grid-cols-10 text-white h-[100vh] max-h-[100vh] conversation">
    <div ref="listConversation" class="col-span-2  border-r-[1.5px] border-[#303030] rounded-lg overflow-y-scroll conversation_left">
      <div class="flex flex-col pr-8">
        <div class="flex h-16 leading-[64px] justify-between items-center">
          <div>
            <p class="text-[22px] font-semibold text-white">
              Chat
            </p>
          </div>
          <div class="flex w-10 h-10 rounded-full bg-[#3a3b3c] justify-center cursor-pointer items-center hover:opacity-95 hover:bg-[#3a3b3c]/95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </div>
        </div>
        <ListDiscussion :list-conversation="listConversation" />
      </div>
    </div>
    <div class="col-span-8">
      <nuxt-child class="max-h-[100vh]" />
    </div>
  </div>
</template>

<script>
import ListDiscussion from '~/components/conversations/ListDiscussion.vue'
export default {
  name: 'Conversation',
  components: { ListDiscussion },
  layout: 'conversation',
  data () {
    return {
      isLoadMore: false,
      isDebounce: null,
      isLoaded: false
    }
  },
  computed: {
    listConversation () {
      return this.$store.getters['conversation/listConversation']
    },
    pageDetailConversation () {
      return this.$store.getters['conversation/pageDetail']
    }
  },
  async created () {
    await this.getListConversation({ limit: 20, page: 1, isLoadMore: this.isLoadMore })
    this.isLoaded = true
  },
  methods: {
    async getListConversation ({ page, limit, isLoadMore }) {
      await this.$store.dispatch('conversation/getListConversation', { page, limit, isLoadMore })
    },
    loadMore () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.$route.path.split('/')[1] === 'conversation' && this.pageDetailConversation.nextPage && !this.isLoadMore) {
            if (!this.isLoadMore && this.pageDetailConversation.nextPage && this.$refs.listConversation.scrollTop + this.$refs.listConversation.clientHeight >= this.$refs.listConversation.scrollHeight - 40) {
              this.isLoadMore = true
              await this.getListConversation({ limit: 5, page: this.pageDetailConversation.nextPage, isLoadMore: this.isLoadMore })
              this.isLoadMore = false
            }
          }
        }, 300)
      } catch (err) {
        //
      }
    }
  }

}
</script>

<style lang="scss">
.conversation_left::-webkit-scrollbar-track
{
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
background-color: #424242;
}

.conversation_left::-webkit-scrollbar
{
width: 10px;
background-color: #424242;
}

.conversation_left::-webkit-scrollbar-thumb
{
background-color: #686868;
border: 2px solid #686868;
}
.icon_warning{
  -webkit-transform:rotate(180deg);
}
.input-send-message::-webkit-scrollbar-track
{
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
background-color: #424242;
}

.input-send-message::-webkit-scrollbar
{
width: 10px;
background-color: #424242;
}

.input-send-message::-webkit-scrollbar-thumb
{
background-color: #686868;
border: 2px solid #686868;
}
.conversation{
  .emoji-invoker {
  @apply absolute top-2 right-2 w-6 h-6 rounded-[50%] cursor-pointer transition-all duration-200 p-0 bg-transparent border-0 hover:scale-110 ;
  svg {
    @apply fill-[#b1c6d0] ;
  }
}
.emoji-picker {
  @apply w-60 h-80 overflow-y-scroll overflow-hidden p-4 box-border rounded-xl bg-gray-800 text-white drop-shadow-lg;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  @apply w-[96%] flex-[1] rounded-[10rem]  py-2 px-4  outline-none bg-[#131720] mb-[2px] ;
}
.emoji-picker h5 {
  @apply mb-0 text-[#b1b1b1] uppercase text-[0.8rem] cursor-default ;
}
.emoji-picker .emojis {
  @apply flex flex-wrap justify-between ;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  @apply p-[0.2rem] cursor-pointer rounded-md ;
}
.emoji-picker .emojis span:hover {
  @apply bg-[#ececec] cursor-pointer ;
}

.emoji-picker::-webkit-scrollbar-track
{
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

.emoji-picker::-webkit-scrollbar
{
  @apply w-[10px] bg-gray-700 rounded-lg ;
}

.emoji-picker::-webkit-scrollbar-thumb
{
  @apply border-2 border-solid border-gray-600 bg-gray-600 rounded-lg  ;
}
}
</style>
