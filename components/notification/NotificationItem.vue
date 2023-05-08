<template>
  <div class="flex max-h-[92px] py-[6px] px-2 min-h-[74px] hover:bg-gray-600 items-center rounded-lg cursor-pointer notification relative">
    <div class="notification">
      <div class="notification-container justify-start">
        <div class="notification-media">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" class="notification-user-avatar">
          <i class="fa fa-thumbs-up notification-reaction" />
        </div>
        <div class="notification-content">
          <p class="notification-text text-gray-200">
            <strong class="text-white">evondev</strong>, <strong class="text-white">Trần Anh Tuấn</strong> and 154 others react to your post in <strong>Cộng đồng Frontend Việt Nam</strong>
          </p>
          <span class="notification-timer">a few seconds ago</span>
        </div>
        <span class="notification-status" />
      </div>
    </div>
  </div>
</template>

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
background-image: linear-gradient(45deg, #0070e1, #14abfe);
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

</style>
