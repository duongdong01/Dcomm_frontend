<template>
  <div class="notification">
    <!-- like post -->
    <div v-if="notification.type==='LIKE_POST'" class="notification-container justify-start">
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
          {{ notification.post.countReaction>1 ? `and ${notification.post.countReaction-1} others`:'' }}  react to your post {{ notification.post?.postNormal?.content?.replace(/<[^>]*>/g, '') || notification.post?.postShare?.content?.replace(/<[^>]*>/g, '') }}
        </p>
        <span class="notification-timer">a few seconds ago</span>
      </div>
    </div>

    <!-- comment -->
    <div v-if="notification.type==='COMMENT_POST'" class="notification-container justify-start">
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
          comment on your post {{ notification.post?.postNormal?.content?.replace(/<[^>]*>/g, '') || notification.post?.postShare?.content?.replace(/<[^>]*>/g, '') }}
        </p>
        <span class="notification-timer">a few seconds ago</span>
      </div>
    </div>

    <!-- mention -->
    <div v-if="notification.type==='MENTION'" class="notification-container justify-start">
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
        <span class="notification-timer">a few seconds ago</span>
      </div>
    </div>
    <!-- friend-request -->
    <div v-if="notification.type==='FRIEND_REQUEST'" class="notification-container justify-start">
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
        <span class="notification-timer">a few seconds ago</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    notification: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  methods: {
    async readNotification () {
      try {
        await this.$api.notification.readNotification({ notificationId: this.notification._id })
      } catch (err) {
        //
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
right: 15px;
top: 50%;
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
