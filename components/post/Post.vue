<template>
  <div class="flex flex-col bg-gray_850 rounded-xl text-white px-6  pt-5 pb-4 text-base outline-none border-gray-700 border" :class="$route.path==='/' || $route.path.split('/')[1]==='following' || $route.path.split('/')[1]==='global' ? 'mt-4' :'mt-[0.2px]'">
    <header class="flex justify-between cursor-pointer">
      <div class="flex w-fit">
        <div class="relative" @mouseover="getUserHover" @mouseleave="hiddenUserHover">
          <nuxt-link :to="`/profile_detail/${post.owner?._id}`" class="w-11 h-11 overflow-hidden cursor-pointer" tag="div">
            <img :src="post?.owner?.avatar" alt="avatar" class="rounded-full object-cover w-11 h-11">
          </nuxt-link>
          <div v-if="upHere" class="z-50 absolute  transition-all" :class="$route.path.split('/')[1]==='post'? 'top-[90%]' :'bottom-[90%]'">
            <UserView :user-id="post.ownerId" />
          </div>
        </div>
        <div class="flex flex-col ml-3 ">
          <nuxt-link :to="`/profile_detail/${post.owner?._id}`" class="text-white font-medium hover:underline" tag="div">
            {{ post?.owner?.fullname }}
          </nuxt-link>
          <div class="flex items-center gap-1  w-full -mt-2">
            <p v-if="post" class="font-light text-white/80 text-sm">
              {{ timeAgo(post.createdAt) }}
            </p>
            <p class="pb-3">
              .
            </p>
            <svg
              v-if="post?.privacy ===PostPrivacy.PUBLIC"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              class="bi bi-globe-americas text-white/80"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
            </svg>
            <svg
              v-if="post?.privacy ===PostPrivacy.FRIENDS"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              class="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
            <svg
              v-if="post?.privacy ===PostPrivacy.ONLY_ME"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              class="bi bi-lock-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
          </div>
        </div>
      </div>
      <nuxt-link :to="`/post/${post._id}`" tag="div" class="w-1/2 cursor-pointer" />
      <div class="flex justify-center items-center -mt-1 relative">
        <button class="hover:bg-gray-700 p-2 rounded-lg cursor-pointer" @click.prevent="toggleShowOption" @focusout="showOptionPost(false)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
          <!-- delete + report post -->
          <div v-if="isShowOptionPost" class="flex flex-col py-2  absolute w-56 bg-gray-900 border-gray-700 border -left-[230px] top-0 rounded-xl z-[4]">
            <div v-if="post.isOwner" class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-3 px-5 transition-all ease-in-out duration-300" @click="showModalEdit">
              <svg

                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>

              Edit Post
            </div>
            <div v-if="!post.isOwner" class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-3 px-5 transition-all ease-in-out duration-300" @click="reportPost">
              <svg

                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="currentColor"
                class="bi bi-flag"
                viewBox="0 0 16 16"
              >
                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
              </svg>
              Report post
            </div>
            <div v-if="post.isOwner" class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-3 px-5 transition-all ease-in-out duration-300" @click="deletePost">
              <svg

                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
              Delete post
            </div>
          </div>
        </button>
      </div>
    </header>

    <div class="leading-9 flex justify-center flex-col ">
      <div class="flex relative flex-col">
        <div v-if="post.type==='NORMAL' && post?.normal && post?.normal?.content?.length" ref="contentPost" class="leading-6  text-content" :class="isShowMoreContent ? ' hideContent' :''" v-html="post.normal.content" />
        <div v-if="post.type==='SHARE' && post?.shared && post?.shared?.content?.length" ref="contentPost" class="leading-6 text-content" :class="isShowMoreContent ? ' hideContent' :''" v-html="post.shared.content" />
        <div v-if="isShowMoreContent" class="bg-gray_850 w-full text-center flex justify-center items-center">
          <div class="flex bg-gray-700  text-gray-200 justify-center items-center space-x-1 h-5 px-1 py-1 rounded-lg text-[14px] cursor-pointer hover:text-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-book "
              viewBox="0 0 16 16"
            >
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            <a @click="showMoreContent"> Read more</a>
          </div>
        </div>
      </div>
      <div v-if="post?.albums" class="mt-2 flex justify-center items-center overflow-hidden w-full max-h-[600px] rounded-md">
        <lightbox :items="post.albums.albumFileDetails.map(el=>el.file)" class="w-full" />
      </div>
      <!-- post share origin -->
      <div v-if="post.type===PostType.SHARE && post.originPost" class=" p-1">
        <div class="flex flex-col border-gray-700 rounded-xl border p-2">
          <header class="flex justify-between cursor-pointer">
            <div class="flex">
              <div class="relative flex" @mouseover="getUserHover2" @mouseleave="hiddenUserHover2">
                <nuxt-link tag="div" :to="`/profile_detail/${post.originPost.owner._id}`" class="flex justify-center items-center overflow-hidden cursor-pointer">
                  <img :src="post?.originPost.owner.avatar" alt="avatar" class="rounded-full w-9 h-9 object-cover">
                </nuxt-link>
                <div v-if="upHere2" class="z-50 absolute  transition-all" :class="$route.path.split('/')[1]==='post'? 'top-[90%]' :'bottom-[90%]'">
                  <UserView :user-id="post.originPost.ownerId" />
                </div>
              </div>

              <div class="flex flex-col ml-3  text-white font-medium">
                <nuxt-link :to="`/profile_detail/${post.originPost.owner._id}`" class="text-white font-medium p-0 m-0 hover:underline" tag="p">
                  {{ post?.originPost.owner.fullname }}
                </nuxt-link>
                <div class="flex items-center gap-1 justify-center w-full -mt-4">
                  <span v-if="post" class="font-light text-white/80 text-[14px]">
                    {{ timeAgo(post?.originPost.createdAt) }}
                  </span>
                  <span class="-mt-2">
                    .
                  </span>
                  <svg
                    v-if="post?.originPost.privacy ===PostPrivacy.PUBLIC"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-globe-americas text-white/80"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                  </svg>
                  <svg
                    v-if="post?.originPost.privacy ===PostPrivacy.FRIENDS"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-people-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                  <svg
                    v-if="post?.originPost.privacy ===PostPrivacy.ONLY_ME"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-lock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </header>
          <div v-if="post.originPost.albums" class="mt-2 flex justify-center items-center overflow-hidden w-full max-h-[600px] rounded-md">
            <lightbox :items="post.originPost.albums.albumFileDetails.map(el=>el.file)" class="w-full" />
          </div>
          <div class="flex relative flex-col mt-1">
            <div v-if="post.originPost.normal && post.originPost.normal?.content?.length" ref="contentPostShare" class="leading-6 text-content " :class="isShowMoreContentShare ? ' hideContent' :''" v-html="post.originPost.normal.content" />
            <div v-if="isShowMoreContentShare" class="bg-gray_850 w-full text-center flex justify-center items-center">
              <div class="flex bg-gray-700  text-gray-200 justify-center items-center space-x-1 h-5 px-1 py-1 rounded-lg text-[14px] cursor-pointer hover:text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-book "
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                <a @click="showMoreContentShare"> Read more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="post.type===PostType.SHARE && !post.originPost" class=" p-1">
        <div class="flex flex-col border-gray-700 rounded-xl border p-2">
          <div class="flex space-x-1">
            <div class="flex items-center w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-lock-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <div class="leading-6">
              <div class="text-[16px]">
                This content isn't available right now
              </div>
              <div class="text-[14px] text-gray-300">
                When this happens, it's usually because the owner only shared it with a small group of people, changed who can see it or it's been deleted.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-8 gap-2">
        <div class="relative flex gap-[6px]  px-4 py-1 rounded-lg justify-center items-center hover:bg-indigo-500 cursor-pointer transition-all max-w-[80px] max-h-[40px]" :class="post?.isReactions ? 'upvoted': 'bg-indigo-600'" title="Upvote" @click="reactionPost(post._id)" @contextmenu="handler">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-arrow-up-short text-white min-w-[28px]"
            viewBox="0 0 16 16"
          >
            <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
          </svg>
          <p class="text-[14px]">
            {{ post?.countReaction }}
          </p>
        </div>
        <nuxt-link tag="div" :to="`/post/${post._id}`" class=" flex justify-center cursor-pointer hover:bg-btn_hover items-center gap-2 px-4  rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-chat-left"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          </svg>
          <p class="-mt-[2px]">
            {{ post?.countComment || 0 }}
          </p>
        </nuxt-link>
        <!-- token post -->
        <button class="flex justify-center items-center cursor-pointer hover:bg-btn_hover rounded-lg px-4 relative" @click="showOptionToken" @focusout="hiddenOptionToken">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-coin text-yellow-500"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
          </svg>
          <p class="ml-1 text-yellow-200">
            {{ post.totalToken }}
          </p>
          <div v-if="isOptionToken" class="flex flex-col py-2  absolute w-56 bg-gray-900 border-gray-700 border -left-[230px] top-0 rounded-xl z-[4]">
            <div v-if="!post.isOwner" class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-2 px-5 transition-all ease-in-out duration-300" @click="showModalDonate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-coin"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
              </svg>
              Donate token
            </div>
            <div v-if="post.isOwner" class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-2 px-5 transition-all ease-in-out duration-300" @click="showModalStake">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-cash-coin"
                viewBox="0 0 16 16"
              >
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
              </svg>
              Stake token
            </div>
          </div>
        </button>
        <div v-if="post.privacy!==PostPrivacy.ONLY_ME" class="flex justify-center items-center cursor-pointer hover:bg-btn_hover rounded-lg px-4" @click="showModalShare">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-white"
            data-v-6ce1eb9f=""
          ><path d="M1.42862 19C1.42192 19 1.4169 19 1.4102 19C1.17917 18.9876 0.996697 18.7518 1.00005 18.4664C1.00172 18.3361 1.24781 5.59593 11.2857 5.24433V1.52982C11.2857 1.32507 11.3812 1.13893 11.5302 1.05207C11.6775 0.963133 11.8566 0.99002 11.9838 1.11825L18.841 8.00125C18.9414 8.1026 19 8.25358 19 8.41283C19 8.57208 18.9414 8.72306 18.8426 8.8244L11.9855 15.7074C11.8566 15.8356 11.6791 15.8605 11.5302 15.7736C11.3812 15.6867 11.2857 15.5006 11.2857 15.2958V11.5937C2.35439 11.7944 1.87225 18.2306 1.85551 18.5078C1.84045 18.787 1.65295 19 1.42862 19Z" stroke="#9CA3AF" stroke-width="1.5" class="stroke-current" /></svg>
          <p class="-mt-[2px] ml-1">
            {{ post?.countShared || 0 }}
          </p>
        </div>
      </div>
      <div class="border-b-[1px] border-gray-700 mt-2" />
    </div>

    <!-- <ItemComment v-if="false" class="mt-2 flex w-full" /> -->
    <Comment class="mt-2" :post-id="post?._id" :comments="$route.path.split('/')[1]==='post'? commentList : post.comments" />
    <nuxt-link v-if="post.countComment>1 && $route.path==='/'" :to="`/post/${post._id}`" class="font-medium mt-[1px] hover:underline cursor-pointer" tag="div">
      View more comments
    </nuxt-link>
    <confirm-dialogue ref="confirmDialogue" />
    <SharePost v-if="isShareModal" class="w-full h-full top-0 left-0" :post-share="post.type=== 'NORMAL' ? post : post.originPost" @hiddenShareModal="hiddenShareModal" />
    <EditPost v-if="isEditModal" :post="post" @hiddenEditModal="hiddenEditModal" />
    <StakeToken ref="stakeToken" />
    <ReportModal v-if="isReportModal" :post-id="post._id" @hiddenReport="isReportModal=false" />
  </div>
</template>

<script>
import Comment from '../comment/Comment.vue'
import Lightbox from '../lightbox/Lightbox.vue'
import UserView from '../friends/UserView.vue'
import ReportModal from './ReportModal.vue'
import StakeToken from '@/components/modal/StakeToken.vue'
import ConfirmDialogue from '@/components/modal/ConfirmDialogue.vue'
import { PostPrivacy, PostType } from '~/constants/post'
import { ReactionOn, ReactionType } from '~/constants/reaction'
import SharePost from '~/components/modal/SharePost.vue'
import EditPost from '@/components/modal/EditPost.vue'

export default {
  components: { Lightbox, Comment, ConfirmDialogue, SharePost, EditPost, UserView, StakeToken, ReportModal },
  props: {
    post: {
      type: Object,
      default: () => {}
    },
    commentList: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  data: () => {
    return {
      userHover: {},
      upHere: false,
      upHere2: false,
      lengthImg: [1],
      files: [],
      PostPrivacy,
      PostType,
      postDetail: null,
      isShowOptionPost: false,
      isShowMoreContent: false,
      isShowMoreContentShare: false,
      isShareModal: false,
      isEditModal: false,
      isOptionToken: false,
      isReportModal: false
    }
  },
  computed: {
  },
  created () {
    this.postDetail = { ...this.post }
  },
  mounted () {
    if (this.$refs.contentPost) {
      const height = this.$refs.contentPost.clientHeight
      if (height > 160) {
        this.isShowMoreContent = true
      }
    } else {
      this.isShowMoreContent = false
    }

    if (this.$refs.contentPostShare) {
      const height = this.$refs.contentPostShare.clientHeight
      if (height > 160) {
        this.isShowMoreContentShare = true
      }
    } else {
      this.isShowMoreContentShare = false
    }
  },
  methods: {
    reportPost () {
      this.isReportModal = true
    },
    async showModalDonate () {
      try {
        const stake = await this.$refs.stakeToken.show({
          title: 'Would you like to donate this token?',
          okButton: 'Donate'
        })
        if (stake) {
          await this.$api.token.donateToken({ postId: this.post._id, quantityToken: stake })
          this.$store.commit('post/tokenPost', { postId: this.post._id, token: stake })
          this.$toast.success('Donate successfully.', { timeout: 1500 })
        }
      } catch (error) {
        if (error.data && error.data.message) {
          this.$toast.error(error.data.message, { timeout: 1500 })
        } else {
          this.$toast.error('System error.', { timeout: 1500 })
        }
      }
    },
    async showModalStake () {
      try {
        const stake = await this.$refs.stakeToken.show({
          title: 'Would you like to stake this token?',
          okButton: 'Stake'
        })
        if (stake) {
          await this.$api.token.stakeToken({ postId: this.post._id, quantityToken: stake })
          this.$store.commit('post/tokenPost', { postId: this.post._id, token: stake })
          this.$toast.success('Stake successfully.', { timeout: 1500 })
        }
      } catch (error) {
        if (error.data && error.data.message) {
          this.$toast.error(error.data.message, { timeout: 1500 })
        } else {
          this.$toast.error('System error.', { timeout: 1500 })
        }
      }
    },
    hiddenOptionToken () {
      this.isOptionToken = false
    },
    showOptionToken () {
      this.isOptionToken = !this.isOptionToken
    },
    getUserHover () {
      this.upHere = true
    },
    hiddenUserHover () {
      this.upHere = false
    },
    getUserHover2 () {
      this.upHere2 = true
    },
    hiddenUserHover2 () {
      this.upHere2 = false
    },
    handler (e) {
      e.preventDefault()
    },
    showMoreContent () {
      this.isShowMoreContent = false
    },
    showMoreContentShare () {
      this.isShowMoreContentShare = false
    },
    hiddenShareModal (e) {
      this.isShareModal = false
    },
    showModalShare () {
      this.isShareModal = true
    },
    showModalEdit () {
      this.isEditModal = true
    },
    hiddenEditModal () {
      this.isEditModal = false
      this.$emit('fetchPostEdited', true)
    },
    toggleShowOption () {
      this.isShowOptionPost = !this.isShowOptionPost
    },
    showOptionPost (e) {
      this.isShowOptionPost = e
    },
    timeAgo (time) {
      const getTime = new Date(time).getTime()
      const getMonth = new Date(time).getMonth()
      const currentDate = new Date().getTime()
      let result = (currentDate - getTime) / 1000
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      if (result < 60) {
        return 'just now'
      }
      if (result / 60 < 60) {
        result = Math.ceil(result / 60)
        return `${result} minutes ago`
      }
      if (result / 3600 < 24) {
        result = (result / 3600).toFixed()
        return `${result} hours ago`
      }
      if (result / 86400 < 5) {
        result = (result / 86400).toFixed()
        return `${result} day ago`
      }
      const dateResult = this.$dayjs(time).format('DD YYYY')
      return `${monthNames[getMonth]} ${dateResult}`
    },
    reactionPost (postId) {
      this.$store.dispatch('post/reactionPost', { on: ReactionOn.POST, type: ReactionType.OK, postId })
    },
    async  deletePost () {
      try {
        const deletePost = await this.$refs.confirmDialogue.show({
          title: 'Delete to your post?',
          message: 'Are you sure you want to delete this post? It cannot be undone.',
          okButton: 'Delete'
        })
        if (deletePost) {
          this.$store.commit('post/deletePost', this.post._id)
          this.$store.commit('post/deletePostSearch', this.post._id)
          this.$store.commit('post/deletePostProfile', this.post._id)
          await this.$api.post.deletePostById(this.post._id)
        }
      } catch (err) {
        //
      }
    }

  }
}
</script>

<style lang="scss">
.upvoted{
  background: linear-gradient(90.9deg, #E21344 0%, #E85E23 82.29%, #EEAB00 100%);
}
.mention-user{
  @apply bg-transparent text-blue-600
}
.hideContent {
    overflow: hidden;
    max-height: 160px;
}
.text-content {
  // inline-size: 200px;
  overflow-wrap: break-word;
}
</style>
