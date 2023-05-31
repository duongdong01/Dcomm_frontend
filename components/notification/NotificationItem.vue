<template>
  <div class="flex max-h-[92px] py-[6px] px-2 min-h-[74px] hover:bg-gray-600 items-center rounded-lg cursor-pointer notification relative" @mouseover="showOption(notification._id)" @mouseleave="hiddenOption(notification._id)">
    <div class="notification">
      <!-- like post -->
      <nuxt-link v-if="notification.type==='LIKE_POST'" class="notification-container justify-start" :to="`/post/${notification.post?._id}`" tag="div" @click.native="readNotification">
        <div class="notification-media">
          <img :src="notification.senderUser.avatar" alt="" class="notification-user-avatar object-cover">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-arrow-up-short notification-reaction"
            viewBox="0 0 16 16"
          >
            <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
          </svg>
        </div>
        <div class="notification-content">
          <p v-if="notification.type==='LIKE_POST'" class="notification-text text-gray-200">
            <strong class="text-white">{{ notification.senderUser.fullname }}</strong>, <strong class="text-white" />
            {{ notification.post?.countReaction>1 ? `and ${notification.post?.countReaction-1} others`:'' }}  react to your post {{ notification.post?.postNormal?.content?.replace(/&|nbsp;|<[^>]*>/g, '') || notification.post?.postShare?.content?.replace(/&|nbsp;|<[^>]*>/g, '') }}
          </p>
          <span class="notification-timer">{{ $dayjs(notification.createdAt).fromNow(true) }}</span>
        </div>
        <button :ref="`option-${notification?._id }`" class="hidden bg-gray-500 w-[26px] h-[26px] rounded-full absolute right-8 top-[42%] justify-center items-center" @click.stop.prevent="toggleShowOption" @focusout="outShowOptionLike(false)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots text-white"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>

        <span v-if="!notification.isClicked" class="notification-status" />
      </nuxt-link>

      <!-- comment post -->
      <nuxt-link v-if="notification.type==='COMMENT_POST'" class="notification-container justify-start" :to="`/post/${notification.post?._id}`" tag="div" @click.native="readNotification">
        <div class="notification-media">
          <img :src="notification.senderUser.avatar" alt="" class="notification-user-avatar object-cover">
          <div class="notification-reaction_comment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chat-left-fill "
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            </svg>
          </div>
        </div>
        <div class="notification-content">
          <p class="notification-text text-gray-200">
            <strong class="text-white">{{ notification.senderUser.fullname }}</strong>, <strong class="text-white" />
            comment on your post {{ notification.post?.postNormal?.content?.replace(/&|nbsp;|<[^>]*>/g, '') || notification.post?.postShare?.content?.replace(/&|nbsp;|<[^>]*>/g, '') }}
            <!-- {{ title.replace(/&nb|<[^>]*>/g, '') }} -->
          </p>
          <span class="notification-timer">{{ $dayjs(notification.createdAt).fromNow(true) }}</span>
        </div>
        <button :ref="`option-${notification._id }`" class="hidden bg-gray-500 w-[26px] h-[26px] rounded-full absolute right-8 top-[42%] justify-center items-center" @click.stop.prevent="toggleShowOption" @focusout="outShowOptionLike(false)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots text-white"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>
        <span v-if="!notification.isClicked" class="notification-status" />
      </nuxt-link>

      <!-- mention -->
      <nuxt-link v-if="notification.type==='MENTION'" class="notification-container justify-start" :to="`/post/${notification.post?._id}`" @click.native="readNotification">
        <div class="notification-media">
          <img :src="notification.senderUser.avatar" alt="" class="notification-user-avatar object-cover">
          <div class="notification-reaction_comment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file-post"
              viewBox="0 0 16 16"
            >
              <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-8z" />
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
            </svg>
          </div>
        </div>
        <div class="notification-content">
          <p class="notification-text text-gray-200">
            <strong class="text-white">{{ notification.senderUser.fullname }}</strong>, <strong class="text-white" />
            mentioned you in a  post
          </p>
          <span class="notification-timer">{{ $dayjs(notification.createdAt).fromNow(true) }}</span>
        </div>
        <button :ref="`option-${notification._id }`" class="hidden bg-gray-500 w-[26px] h-[26px] rounded-full absolute right-8 top-[42%] justify-center items-center" @click.stop.prevent="toggleShowOption" @focusout="outShowOptionLike(false)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots text-white"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>
        <span v-if="!notification.isClicked" class="notification-status" />
      </nuxt-link>
      <!-- friend-request -->
      <nuxt-link v-if="notification.type==='FRIEND_REQUEST'" class="notification-container justify-start" :to="`/profile_detail/${notification.senderUser._id}`" @click.native="readNotification">
        <div class="notification-media">
          <img :src="notification.senderUser.avatar" alt="" class="notification-user-avatar object-cover">
          <div class="notification-reaction_comment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          </div>
        </div>
        <div class="notification-content">
          <p class="notification-text text-gray-200">
            <strong class="text-white">{{ notification.senderUser.fullname }}</strong>, <strong class="text-white" />
            send you a friend request
          </p>
          <div class="flex space-x-3 justify-start">
            <button class="bg-[#1876f2] font-medium rounded-md px-2 py-2 text-white" @click.stop.prevent="acceptFriendRequestByUserId(notification.senderUser._id,notification._id)">
              Confirm
            </button>
            <button class="bg-gray-400 font-medium rounded-md px-2 py-2 text-white" @click.stop.prevent="refuseFriendRequestByUserId(notification.senderUser._id,notification._id)">
              Delete
            </button>
          </div>
          <span class="notification-timer">{{ $dayjs(notification.createdAt).fromNow(true) }}</span>
        </div>
        <button :ref="`option-${notification._id }`" class="hidden bg-gray-500 w-[26px] h-[26px] rounded-full absolute right-8 top-[42%] justify-center items-center" @click.stop.prevent="toggleShowOption" @focusout="outShowOptionLike(false)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots text-white"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>
        <span v-if="!notification.isClicked" class="notification-status" />
      </nuxt-link>

      <nuxt-link v-if="notification.type==='SHARE_POST'" class="notification-container justify-start" :to="`/post/${notification.post?._id}`" tag="div" @click.native="readNotification">
        <div class="notification-media">
          <img :src="notification.senderUser.avatar" alt="" class="notification-user-avatar object-cover">
          <div class="notification-reaction_comment">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-white"
              data-v-6ce1eb9f=""
            ><path d="M1.42862 19C1.42192 19 1.4169 19 1.4102 19C1.17917 18.9876 0.996697 18.7518 1.00005 18.4664C1.00172 18.3361 1.24781 5.59593 11.2857 5.24433V1.52982C11.2857 1.32507 11.3812 1.13893 11.5302 1.05207C11.6775 0.963133 11.8566 0.99002 11.9838 1.11825L18.841 8.00125C18.9414 8.1026 19 8.25358 19 8.41283C19 8.57208 18.9414 8.72306 18.8426 8.8244L11.9855 15.7074C11.8566 15.8356 11.6791 15.8605 11.5302 15.7736C11.3812 15.6867 11.2857 15.5006 11.2857 15.2958V11.5937C2.35439 11.7944 1.87225 18.2306 1.85551 18.5078C1.84045 18.787 1.65295 19 1.42862 19Z" stroke="#9CA3AF" stroke-width="1.5" class="stroke-current" /></svg>
          </div>
        </div>
        <div class="notification-content">
          <p class="notification-text text-gray-200">
            <strong class="text-white">{{ notification.senderUser.fullname }}</strong>, <strong class="text-white" />
            share your post {{ notification.post?.postNormal?.content?.replace(/&|nbsp;|<[^>]*>/g, '') || notification.post?.postShare?.content?.replace(/&|nbsp;|<[^>]*>/g, '') }}
          </p>
          <span class="notification-timer">{{ $dayjs(notification.createdAt).fromNow(true) }}</span>
        </div>
        <button :ref="`option-${notification._id }`" class="hidden bg-gray-500 w-[26px] h-[26px] rounded-full absolute right-8 top-[42%] justify-center items-center" @click.stop.prevent="toggleShowOption" @focusout="outShowOptionLike(false)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots text-white"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>
        <span v-if="!notification.isClicked" class="notification-status" />
      </nuxt-link>

      <button v-if="isShowOptionLike" class="flex absolute text-white flex-col bg-gray-900 border border-gray-700 rounded-md py-1 z-10 right-16 top-6">
        <div class="flex justify-start items-center space-x-1 py-2 px-2 hover:bg-gray-700" @click.stop="removerNotification(notification._id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
          <div>
            Remove this notification
          </div>
        </div>
        <div class="flex justify-start hover:bg-gray-700 items-center space-x-1 py-2 px-2 w-full" @click.stop="readNotification">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-check-lg"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
          </svg>
          <div>
            Mark as read
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isShowOptionLike: false,
      title: 'hahahah&nbsp;'
    }
  },
  methods: {
    test () {
      this.isShowOptionLike = false
    },
    async readNotification () {
      try {
        await this.$api.notification.readNotification({ notificationId: this.notification._id })
        this.$store.commit('notification/readNotification', this.notification._id)
        this.isShowOptionLike = false
      } catch (err) {
        //
      }
    },
    outShowOptionLike (e) {
      // this.isShowOptionLike = e
    },
    toggleShowOption () {
      this.isShowOptionLike = !this.isShowOptionLike
    },
    showOption (id) {
      this.$refs[`option-${id}`].style.display = 'flex'
    },
    hiddenOption (id) {
      this.$refs[`option-${id}`].style.display = 'none'
    },
    async removerNotification (notificationId) {
      try {
        this.$store.commit('notification/deleteNotification', notificationId)
        this.isShowOptionLike = false
        await this.$api.notification.deleteNotification({ notificationId })
      } catch (err) {
        //
      }
    },
    async refuseFriendRequestByUserId (userId, notificationId) {
      try {
        await this.$api.friend.refuseFriendRequestByUserId(userId)
        await this.removerNotification(notificationId)
      } catch (err) {
      }
    },
    async acceptFriendRequestByUserId (userId, notificationId) {
      try {
        await this.$api.friend.acceptFriendRequestByUserId(userId)
        await this.removerNotification(notificationId)
        this.$toast.success('Accept friend successfully.', { timeout: 1500 })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">

.notification {

&-header {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 15px;
}
&-title {
font-size: 16px;
font-weight: 500;
text-transform: capitalize;
}
&-close {
cursor: pointer;
width: 30px;
height: 30px;
border-radius: 30px;
display: flex;
align-items: center;
justify-content: center;
background-color: #f0f2f5;
font-size: 14px;
}
&-container {
display: flex;
align-items: flex-start;
}
&-media {
position: relative;
}
&-user-avatar {
width: 60px;
height: 60px;
border-radius: 60px;
object-fit: cover;
}
&-reaction {
width: 30px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 30px;
color: white;
background-image:linear-gradient(90.9deg, #E21344 0%, #E85E23 82.29%, #EEAB00 100%);
font-size: 14px;
position: absolute;
bottom: 0;
right: 0;
}
&-content {
width: calc(100% - 60px);
padding-left: 20px;
line-height: 1.2;
text-align: start;
}
&-text {
margin-bottom: 5px;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 50px;
}
&-timer {
color: #1876f2;
font-weight: 600;
font-size: 14px;
}
&-status {
position: absolute;
right: 10px;
top: 48%;
/* transform: translateY(-50%); */
width: 12px;
height: 12px;
background-color: #1876f2;
border-radius: 50%;
}
}

.notification-reaction_comment {
width: 30px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 30px;
color: white;
background-image:linear-gradient(45deg, #0070E1, #14ABFE);;
font-size: 14px;
position: absolute;
bottom: 0;
right: 0;
}
</style>
