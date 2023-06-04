<template>
  <div class="flex flex-col w-full min-h-screen">
    <div class="header-profile bg-gray_850 h-[520px] w-full rounded-2xl  relative">
      <div v-if="!isLoaded" class=" shadow  w-full h-full rounded-2xl">
        <div class="animate-pulse flex space-x-4" />
      </div>
      <div v-if="isLoaded" class="w-full relative object-cover cover-img h-full cursor-pointer rounded-2xl rounded-b-3xl" :style="user.coverImage ? { backgroundImage :`url(${user.coverImage})`}:cssProps" @click="showSingleCoverImg(user.coverImage)">
        <button v-if="isYourProfile" class="absolute bottom-40 text-white font-semibold right-10 bg-gray-500/30 rounded-md py-[6px] px-2 flex space-x-2" @click.stop="showUploadCover">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-camera-fill text-white"
            viewBox="0 0 16 16"
          >
            <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
            <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
          </svg>
          <p>
            Edit cover photo
          </p>
        </button>
      </div>
      <div class="w-full bg-gray_850 grid grid-cols-5 h-36 z-[2] absolute bottom-0 text-white rounded-b-2xl">
        <div v-if="!isLoaded" class=" shadow rounded-md p-4 w-full mx-auto grid grid-cols-3 col-span-3">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-200 h-10 w-10" />
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-slate-200 rounded" />
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-2" />
                  <div class="h-2 bg-slate-200 rounded col-span-1" />
                </div>
                <div class="h-2 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="isLoaded" class="grid grid-cols-3 col-span-3 ">
          <div class="relative w-full h-full flex ml-10 col-span-1">
            <img :src="user.avatar || defaultAvatar" alt="" class="w-36 h-36 rounded-full -top-10 absolute object-cover cursor-pointer" @click="showSingleAvatarImg(user.avatar)">
            <div v-if="!isYourProfile" class="w-4 h-4 rounded-full  absolute left-[108px] bottom-12" :class="isOnline? 'bg-green-500' :''" />
            <div v-if="isYourProfile" class="absolute left-24 bottom-11 w-8 h-8 bg-gray-600 rounded-full flex justify-center items-center cursor-pointer" @click="showUploadAvatar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-camera-fill text-white"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
              </svg>
            </div>
          </div>
          <div class="flex flex-col text-white  justify-start col-span-2 py-4  space-y-2">
            <p class="font-semibold text-xl mt-[1px]">
              {{ user.fullname }}
            </p>
            <div class="flex text-lg font-medium gap-3">
              <nuxt-link v-if="user.countFriend>0" :to="`/profile_detail/${$route.params.id}/friends`" tag="button">
                {{ user.countFriend }} <span class="text-blue-500">Friends</span>
              </nuxt-link>
              <p v-if="user.countFollower>0 && isYourProfile" class="cursor-pointer" @click="showFollower(true)">
                {{ user.countFollower }} <span class="text-blue-500">Follower</span>
              </p>
            </div>
            <div class="flex space-x-3">
              <div class="flex gap-2  items-center justify-center">
                <img src="@/static/logo/dscvr-logo.png" alt="logo" class="w-6 h-6">
                <p class="text-white text-base">
                  {{ user.token?.currentTotal }}
                </p>
              </div>
              <div class="flex gap-2 items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-pink-500"
                  data-v-1ebbdd90=""
                ><path d="M19 8.25C17.2061 8.25 15.75 6.79386 15.75 5C15.75 3.20614 17.2061 1.75 19 1.75C20.7939 1.75 22.25 3.20614 22.25 5C22.25 6.79386 20.7939 8.25 19 8.25ZM19 2.25C17.4839 2.25 16.25 3.48386 16.25 5C16.25 6.51614 17.4839 7.75 19 7.75C20.5161 7.75 21.75 6.51614 21.75 5C21.75 3.48386 20.5161 2.25 19 2.25Z" fill="#292D32" stroke="white" class="stroke-current" /><path d="M12 13.25H7C6.86614 13.25 6.75 13.1339 6.75 13C6.75 12.8661 6.86614 12.75 7 12.75H12C12.1339 12.75 12.25 12.8661 12.25 13C12.25 13.1339 12.1339 13.25 12 13.25Z" fill="#292D32" stroke="white" class="stroke-current" /><path d="M16 17.25H7C6.86614 17.25 6.75 17.1339 6.75 17C6.75 16.8661 6.86614 16.75 7 16.75H16C16.1339 16.75 16.25 16.8661 16.25 17C16.25 17.1339 16.1339 17.25 16 17.25Z" fill="#292D32" stroke="white" class="stroke-current" /><path d="M15 22.25H9C6.3424 22.25 4.56492 21.6803 3.4423 20.5577C2.31968 19.4351 1.75 17.6576 1.75 15V9C1.75 6.3424 2.31968 4.56492 3.4423 3.4423C4.56492 2.31968 6.3424 1.75 9 1.75H14C14.1339 1.75 14.25 1.86614 14.25 2C14.25 2.13386 14.1339 2.25 14 2.25H9C6.65972 2.25 4.92432 2.66107 3.7927 3.7927C2.66107 4.92432 2.25 6.65972 2.25 9V15C2.25 17.3403 2.66107 19.0757 3.7927 20.2073C4.92432 21.3389 6.65972 21.75 9 21.75H15C17.3403 21.75 19.0757 21.3389 20.2073 20.2073C21.3389 19.0757 21.75 17.3403 21.75 15V10C21.75 9.86614 21.8661 9.75 22 9.75C22.1339 9.75 22.25 9.86614 22.25 10V15C22.25 17.6576 21.6803 19.4351 20.5577 20.5577C19.4351 21.6803 17.6576 22.25 15 22.25Z" fill="#292D32" stroke="white" class="stroke-current" /></svg>

                <p class="text-white text-base">
                  {{countPost }}
                </p>
              </div>
              <div class="flex gap-2 items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  data-v-1ebbdd90=""
                ><path
                  d="M14.45 8.00078C14.45 11.563 11.5623 14.4508 8.00005 14.4508C4.43781 14.4508 1.55005 11.563 1.55005 8.00078C1.55005 4.43854 4.43781 1.55078 8.00005 1.55078C11.5623 1.55078 14.45 4.43854 14.45 8.00078Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="stroke-current"
                /><path
                  d="M8 4.40039V8.18039L10.16 9.44039"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="stroke-current"
                /></svg>
                <p class="text-white text-base">
                  Member Since {{ $dayjs(user.createdAt).format('YYYY') }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end col-span-2 py-4 px-8">
          <div v-if="isLoaded" class="flex space-x-4">
            <button v-if="!isFriend && !isYourProfile && !isPending && !isReceiver" :disabled="isDisable" class="relative overflow-hidden flex items-center rounded-lg px-3 py-2 h-11  duration-300 bg-indigo-600 hover:bg-indigo-500 transition-all ease-in-out border-indigo-600 gap-x-3 text-white text-[16px]" @click="createFriendRequest">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-person-plus w-5 h-5"
                viewBox="0 0 16 16"
              >
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
              </svg>
              Add Friend
              <div v-if="isLoadedAddFriend" class="absolute  left-0 w-full h-full flex justify-center bg-gray-200 opacity-40" />
              <Loading v-if="isLoadedAddFriend" />
            </button>

            <button v-if="!isFriend && !isYourProfile && !isPending && isReceiver" :disabled="isDisable" class="relative overflow-hidden flex items-center rounded-lg px-3 py-2 h-11  duration-300 bg-indigo-600 hover:bg-indigo-500 transition-all ease-in-out border-indigo-600 gap-x-3 text-white text-[16px]" @click="acceptFriendRequestByUserId">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-person-check-fill"
                viewBox="0 0 16 16"
              >
                <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              Accept
              <div v-if="isLoadedAcceptFriend" class="absolute  left-0 w-full h-full flex justify-center bg-gray-200 opacity-40" />
              <Loading v-if="isLoadedAcceptFriend" />
            </button>

            <button v-if="!isFriend && !isYourProfile && !isPending && isReceiver" :disabled="isDisable" class="relative overflow-hidden flex items-center rounded-lg px-3 py-2 h-11  duration-300 bg-gray-700 hover:bg-gray-600 border-gray-700 transition-all ease-in-out  gap-x-3 text-white text-[16px]" @click="refuseFriendRequestByUserId">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-person-dash h-5 w-5"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
              </svg>
              Refuse
              <div v-if="isLoadedRefuseFriend" class="absolute  left-0 w-full h-full flex justify-center bg-gray-200 opacity-40" />
              <Loading v-if="isLoadedRefuseFriend" />
            </button>

            <button v-if="isFriend && !isYourProfile" :disabled="isDisable" class="overflow-hidden relative flex items-center rounded-lg px-3 py-2 h-11  duration-300 border-[1px] bg-gray_850  transition-all ease-in-out border-indigo-600 gap-x-3 text-white text-[16px]" @click="removeFriendByUserId">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-person-dash h-5 w-5"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
              </svg>
              Unfriend
              <div v-if="isLoadedUnFriend" class="absolute  left-0 w-full h-full flex justify-center bg-gray-200 opacity-40" />
              <Loading v-if="isLoadedUnFriend" />
            </button>
            <button v-if="isPending &&!isYourProfile " :disabled="isDisable" class="overflow-hidden relative flex items-center rounded-lg px-3 py-2 h-11  duration-300 bg-indigo-600 hover:bg-indigo-500 transition-all ease-in-out border-indigo-600 gap-x-3 text-white text-[16px]" @click="cancelFriendRequestByUserId">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-person-dash w-5 h-5"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
              </svg>
              Cancel request
              <div v-if="isLoadedCancelRequest" class="absolute  left-0 w-full h-full flex justify-center bg-gray-200 opacity-40" />
              <Loading v-if="isLoadedCancelRequest" />
            </button>
            <button class="bg-gray-700 hover:bg-gray-600 border-gray-700 transition-all ease-in-out duration-300 h-11 flex items-center p-[16px] rounded-lg relative" @click="tongleShowSetting" @focusout="showSetting(false)">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="pointer-events-none"
                data-v-1ebbdd90=""
              ><path d="M8.0001 4.80001C7.57575 4.80001 7.16878 4.63144 6.86873 4.33138C6.56867 4.03132 6.4001 3.62435 6.4001 3.20001C6.4001 2.77566 6.56867 2.36869 6.86873 2.06864C7.16879 1.76858 7.57575 1.60001 8.0001 1.60001C8.42444 1.60001 8.83141 1.76858 9.13147 2.06864C9.43153 2.36869 9.6001 2.77566 9.6001 3.20001C9.6001 3.62435 9.43153 4.03132 9.13147 4.33138C8.83141 4.63144 8.42444 4.80001 8.0001 4.80001ZM8.0001 9.60001C7.57575 9.60001 7.16878 9.43143 6.86873 9.13138C6.56867 8.83132 6.4001 8.42435 6.4001 8.00001C6.4001 7.57566 6.56867 7.16869 6.86873 6.86864C7.16878 6.56858 7.57575 6.40001 8.0001 6.40001C8.42444 6.40001 8.83141 6.56858 9.13147 6.86864C9.43153 7.16869 9.6001 7.57566 9.6001 8.00001C9.6001 8.42435 9.43153 8.83132 9.13147 9.13138C8.83141 9.43143 8.42444 9.60001 8.0001 9.60001ZM6.4001 12.8C6.4001 13.2244 6.56867 13.6313 6.86873 13.9314C7.16878 14.2314 7.57575 14.4 8.0001 14.4C8.42444 14.4 8.83141 14.2314 9.13147 13.9314C9.43153 13.6313 9.6001 13.2244 9.6001 12.8C9.6001 12.3757 9.43153 11.9687 9.13147 11.6686C8.83141 11.3686 8.42444 11.2 8.0001 11.2C7.57575 11.2 7.16878 11.3686 6.86873 11.6686C6.56867 11.9687 6.4001 12.3757 6.4001 12.8Z" fill="white" class="fill-current" /></svg>
              <div v-if="isSettingShow" class="flex flex-col py-2  absolute w-56 bg-gray-900 border-gray-700 border -left-[230px] top-0 rounded-xl z-10 ">
                <div v-if="isYourProfile" class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-3 px-5 transition-all ease-in-out duration-300" @click="goToSetting">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-v-1ebbdd90=""
                  ><path d="M8.28973 1V0.25C7.89344 0.25 7.56553 0.55831 7.54115 0.953853L8.28973 1ZM3.1099 4.1466L3.41379 3.46092C3.07691 3.31162 2.68147 3.42915 2.48083 3.73822L3.1099 4.1466ZM2.56368 4.98799L1.93461 4.57961C1.93146 4.58446 1.92837 4.58936 1.92533 4.59428L2.56368 4.98799ZM1.41027 6.85812L0.771913 6.46441C0.55471 6.81658 0.663741 7.27812 1.01558 7.49587L1.41027 6.85812ZM1.33643 13.1865L0.956739 12.5398C0.601408 12.7483 0.480887 13.2045 0.686822 13.5614L1.33643 13.1865ZM3.01095 16.0884L2.36134 16.4633C2.55741 16.803 2.98219 16.9343 3.33578 16.7644L3.01095 16.0884ZM8.27699 19L7.53171 19.084C7.57448 19.4633 7.89529 19.75 8.27699 19.75V19ZM11.702 19V19.75C12.0837 19.75 12.4045 19.4633 12.4473 19.084L11.702 19ZM16.8686 16.0424L16.5641 16.7278C16.9091 16.8811 17.3142 16.754 17.5099 16.4312L16.8686 16.0424ZM18.6336 13.1308L19.2749 13.5196C19.4863 13.1709 19.3804 12.7172 19.0364 12.4982L18.6336 13.1308ZM18.6258 6.90229L19.0302 7.53391C19.3739 7.31384 19.4786 6.85935 19.2657 6.51114L18.6258 6.90229ZM16.9243 4.11866L17.5642 3.72751C17.3653 3.40203 16.9537 3.27774 16.6078 3.43869L16.9243 4.11866ZM11.683 1L12.4315 0.953853C12.4072 0.55831 12.0793 0.25 11.683 0.25V1ZM4.60451 5.21161C6.96499 5.21161 8.89499 3.37097 9.03831 1.04615L7.54115 0.953853C7.4463 2.49251 6.16749 3.71161 4.60451 3.71161V5.21161ZM2.80601 4.83227C3.35679 5.07638 3.96586 5.21161 4.60451 5.21161V3.71161C4.17921 3.71161 3.77687 3.62184 3.41379 3.46092L2.80601 4.83227ZM3.19275 5.39637L3.73897 4.55498L2.48083 3.73822L1.93461 4.57961L3.19275 5.39637ZM2.04862 7.25183L3.20203 5.3817L1.92533 4.59428L0.771913 6.46441L2.04862 7.25183ZM1.01558 7.49587C1.85542 8.01563 2.4122 8.94314 2.4122 10.0001H3.9122C3.9122 8.40219 3.06805 7.00208 1.80495 6.22038L1.01558 7.49587ZM2.4122 10.0001C2.4122 11.0815 1.82919 12.0276 0.956739 12.5398L1.71611 13.8333C3.02843 13.063 3.9122 11.6351 3.9122 10.0001H2.4122ZM3.66055 15.7136L1.98603 12.8117L0.686822 13.5614L2.36134 16.4633L3.66055 15.7136ZM4.60812 14.976C3.92117 14.976 3.26865 15.1325 2.68612 15.4124L3.33578 16.7644C3.71994 16.5798 4.15085 16.476 4.60812 16.476V14.976ZM9.02226 18.916C8.77222 16.6987 6.89187 14.976 4.60812 14.976V16.476C6.11988 16.476 7.36625 17.6168 7.53171 19.084L9.02226 18.916ZM11.702 18.25H8.27699V19.75H11.702V18.25ZM12.4473 19.084C12.6128 17.6168 13.8591 16.476 15.3709 16.476V14.976C13.0871 14.976 11.2068 16.6987 10.9567 18.916L12.4473 19.084ZM15.3709 16.476C15.7971 16.476 16.2003 16.5662 16.5641 16.7278L17.1731 15.357C16.6213 15.1119 16.011 14.976 15.3709 14.976V16.476ZM17.9922 12.742L16.2272 15.6536L17.5099 16.4312L19.2749 13.5196L17.9922 12.742ZM16.1718 10.014C16.1718 11.5915 16.9945 12.9762 18.2307 13.7634L19.0364 12.4982C18.2144 11.9747 17.6718 11.0575 17.6718 10.014H16.1718ZM18.2214 6.27068C16.9904 7.05887 16.1718 8.44062 16.1718 10.014H17.6718C17.6718 8.97323 18.2117 8.05802 19.0302 7.53391L18.2214 6.27068ZM16.2844 4.50981L17.9859 7.29344L19.2657 6.51114L17.5642 3.72751L16.2844 4.50981ZM15.3682 5.21161C16.0357 5.21161 16.6708 5.06389 17.2407 4.79863L16.6078 3.43869C16.232 3.61359 15.8126 3.71161 15.3682 3.71161V5.21161ZM10.9344 1.04615C11.0777 3.37097 13.0077 5.21161 15.3682 5.21161V3.71161C13.8052 3.71161 12.5264 2.49251 12.4315 0.953853L10.9344 1.04615ZM8.28973 1.75H11.683V0.25H8.28973V1.75Z" fill="white" class="fill-current" /><circle
                    cx="10"
                    cy="10"
                    r="2.5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="stroke-current"
                  /></svg>
                  Settings
                </div>
                <div v-else class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-3 px-5 transition-all ease-in-out duration-300" @click="toggleModalBlock">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-person-fill-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                  </svg>

                  Block
                </div>
                <div v-if="!isYourProfile" class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-3 px-5 transition-all ease-in-out duration-300" @click="reportAccount">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    fill="currentColor"
                    class="bi bi-exclamation-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                  </svg>

                  Report account
                </div>
                <div class="text-white flex gap-2 text-[16px]  items-center hover:bg-gray-700 py-3 px-5 transition-all ease-in-out duration-300" @click="copyUrl">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-v-14923724=""
                    data-v-1ebbdd90=""
                  ><path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.850098 4.09961C0.850098 2.30468 2.30517 0.849609 4.1001 0.849609H7.1001C8.86172 0.849609 10.296 2.2512 10.3486 4.00007C10.3325 3.99976 10.3163 3.99961 10.3001 3.99961H8.84729C8.79546 3.07964 8.03303 2.34961 7.1001 2.34961H4.1001C3.1336 2.34961 2.3501 3.13311 2.3501 4.09961V7.09961C2.3501 8.03255 3.08013 8.79497 4.0001 8.8468V10.2996C4.0001 10.3158 4.00025 10.332 4.00056 10.3481C2.25168 10.2955 0.850098 8.86124 0.850098 7.09961V4.09961ZM8.9001 5.64961C7.10517 5.64961 5.6501 7.10468 5.6501 8.89961V11.8996C5.6501 13.6945 7.10517 15.1496 8.9001 15.1496H11.9001C13.695 15.1496 15.1501 13.6945 15.1501 11.8996V8.89961C15.1501 7.10468 13.695 5.64961 11.9001 5.64961H8.9001ZM7.1501 8.89961C7.1501 7.93311 7.9336 7.14961 8.9001 7.14961H11.9001C12.8666 7.14961 13.6501 7.93311 13.6501 8.89961V11.8996C13.6501 12.8661 12.8666 13.6496 11.9001 13.6496H8.9001C7.9336 13.6496 7.1501 12.8661 7.1501 11.8996V8.89961Z"
                    fill="white"
                    class="fill-current"
                    data-v-14923724=""
                  /></svg>
                  Copy Link User
                </div>
              </div>
            </button>
            <div v-if="isModalBlock" class="fixed top-0 left-0 w-full h-full z-10">
              <MessageBlock @blockUser="blockUser" @stopBlock="toggleModalBlock" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-20 flex bg-[#131720] text-white font-medium text-[18px] px-4">
      <div class="flex gap-8 items-center">
        <nuxt-link tag="button" class="flex items-center gap-2 pb-2 " :to="`/profile_detail/${$route.params.id}`" :class="$route.path.split('/')[1] === 'profile_detail' && $route.path.split('/').length === 3 ? 'border-b-[3px] border-white' :''">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            data-v-1ebbdd90=""
          ><path d="M19 8.25C17.2061 8.25 15.75 6.79386 15.75 5C15.75 3.20614 17.2061 1.75 19 1.75C20.7939 1.75 22.25 3.20614 22.25 5C22.25 6.79386 20.7939 8.25 19 8.25ZM19 2.25C17.4839 2.25 16.25 3.48386 16.25 5C16.25 6.51614 17.4839 7.75 19 7.75C20.5161 7.75 21.75 6.51614 21.75 5C21.75 3.48386 20.5161 2.25 19 2.25Z" fill="#292D32" stroke="white" class="stroke-current" /><path d="M12 13.25H7C6.86614 13.25 6.75 13.1339 6.75 13C6.75 12.8661 6.86614 12.75 7 12.75H12C12.1339 12.75 12.25 12.8661 12.25 13C12.25 13.1339 12.1339 13.25 12 13.25Z" fill="#292D32" stroke="white" class="stroke-current" /><path d="M16 17.25H7C6.86614 17.25 6.75 17.1339 6.75 17C6.75 16.8661 6.86614 16.75 7 16.75H16C16.1339 16.75 16.25 16.8661 16.25 17C16.25 17.1339 16.1339 17.25 16 17.25Z" fill="#292D32" stroke="white" class="stroke-current" /><path d="M15 22.25H9C6.3424 22.25 4.56492 21.6803 3.4423 20.5577C2.31968 19.4351 1.75 17.6576 1.75 15V9C1.75 6.3424 2.31968 4.56492 3.4423 3.4423C4.56492 2.31968 6.3424 1.75 9 1.75H14C14.1339 1.75 14.25 1.86614 14.25 2C14.25 2.13386 14.1339 2.25 14 2.25H9C6.65972 2.25 4.92432 2.66107 3.7927 3.7927C2.66107 4.92432 2.25 6.65972 2.25 9V15C2.25 17.3403 2.66107 19.0757 3.7927 20.2073C4.92432 21.3389 6.65972 21.75 9 21.75H15C17.3403 21.75 19.0757 21.3389 20.2073 20.2073C21.3389 19.0757 21.75 17.3403 21.75 15V10C21.75 9.86614 21.8661 9.75 22 9.75C22.1339 9.75 22.25 9.86614 22.25 10V15C22.25 17.6576 21.6803 19.4351 20.5577 20.5577C19.4351 21.6803 17.6576 22.25 15 22.25Z" fill="#292D32" stroke="white" class="stroke-current" /></svg>

          Posts
        </nuxt-link>
        <!-- <nuxt-link tag="button" class="flex items-center gap-2 pb-2 " :to="`/profile_detail/${$route.params.id}/portals`" :class="$route.path.split('/')[3] === 'portals' ? 'border-b-[3px] border-white' :''">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            data-v-1ebbdd90=""
          ><path d="M4 18H3.25V18.75H4V18ZM16 18V18.75H16.75V18H16ZM16 8.85714L16.75 8.85714L16 8.85714ZM4 8.85714L4.75 8.85714L4 8.85714ZM4 18.75H16V17.25H4V18.75ZM16.75 18V8.85714H15.25V18H16.75ZM3.25 8.85714V18H4.75V8.85714H3.25ZM16 8.85714C16.75 8.85714 16.75 8.8568 16.75 8.85642C16.75 8.85626 16.75 8.85586 16.75 8.85554C16.75 8.8549 16.75 8.85416 16.75 8.85331C16.75 8.85161 16.75 8.84949 16.75 8.84696C16.7499 8.84191 16.7499 8.8352 16.7497 8.82689C16.7495 8.81028 16.7491 8.78726 16.7482 8.75827C16.7465 8.7003 16.7432 8.61832 16.7368 8.51572C16.724 8.31076 16.6987 8.02216 16.6484 7.67748C16.5484 6.99198 16.3471 6.06508 15.9371 5.12796C15.527 4.19046 14.896 3.21598 13.9233 2.47485C12.9407 1.72622 11.6536 1.25 10 1.25V2.75C11.3464 2.75 12.3093 3.13092 13.0142 3.668C13.729 4.2126 14.223 4.9524 14.5629 5.72919C14.9029 6.50635 15.0766 7.29374 15.1641 7.89394C15.2076 8.19213 15.2291 8.43924 15.2397 8.60928C15.245 8.69418 15.2476 8.75952 15.2489 8.802C15.2495 8.82323 15.2498 8.83872 15.2499 8.84806C15.25 8.85272 15.25 8.85585 15.25 8.85738C15.25 8.85815 15.25 8.85852 15.25 8.85848C15.25 8.85846 15.25 8.85834 15.25 8.85812C15.25 8.85801 15.25 8.85776 15.25 8.85771C15.25 8.85744 15.25 8.85714 16 8.85714ZM10 1.25C8.3464 1.25 7.0593 1.72622 6.07672 2.47485C5.104 3.21598 4.47304 4.19046 4.06288 5.12796C3.65289 6.06508 3.45157 6.99198 3.3516 7.67748C3.30134 8.02216 3.27599 8.31076 3.26318 8.51572C3.25677 8.61832 3.25347 8.7003 3.25178 8.75827C3.25094 8.78726 3.25049 8.81028 3.25026 8.82689C3.25014 8.8352 3.25008 8.84191 3.25004 8.84696C3.25002 8.84949 3.25001 8.85161 3.25001 8.85331C3.25 8.85416 3.25 8.8549 3.25 8.85554C3.25 8.85586 3.25 8.85626 3.25 8.85642C3.25 8.8568 3.25 8.85714 4 8.85714C4.75 8.85714 4.75 8.85744 4.75 8.85771C4.75 8.85776 4.75 8.85801 4.75 8.85812C4.75 8.85834 4.75 8.85846 4.75 8.85848C4.75 8.85852 4.75 8.85815 4.75 8.85738C4.75002 8.85585 4.75004 8.85272 4.75011 8.84806C4.75024 8.83872 4.75053 8.82323 4.75115 8.802C4.75239 8.75952 4.75495 8.69418 4.76026 8.60928C4.77089 8.43924 4.79241 8.19213 4.8359 7.89394C4.92343 7.29374 5.09711 6.50635 5.43712 5.72919C5.77696 4.9524 6.271 4.2126 6.98578 3.668C7.6907 3.13092 8.65359 2.75 10 2.75V1.25Z" fill="white" class="fill-current" /></svg>

          Portals
        </nuxt-link> -->
        <nuxt-link v-if="isYourProfile" tag="button" class="flex items-center gap-2 pb-2 " :to="`/profile_detail/${$route.params.id}/tokens`" :class="$route.path.split('/')[3] === 'tokens' ? 'border-b-[3px] border-white' :''">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            data-v-1ebbdd90=""
          ><circle
            cx="7"
            cy="13"
            r="6.25"
            stroke="#9CA3AF"
            stroke-width="1.5"
            class="stroke-current"
          /><mask id="path-2-inside-1_14252_75339" fill="white"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.8808 13.3815C18.3096 12.2831 19.9996 9.83893 19.9996 7C19.9996 3.13401 16.8656 0 12.9996 0C10.1607 0 7.71648 1.69 6.61816 4.11884C7.06692 4.04072 7.52852 4 7.99962 4C12.4179 4 15.9996 7.58172 15.9996 12C15.9996 12.4711 15.9589 12.9327 15.8808 13.3815Z" /></mask><path d="M15.8808 13.3815L14.403 13.1242L13.9171 15.9157L16.4988 14.7482L15.8808 13.3815ZM6.61816 4.11884L5.25141 3.50079L4.08395 6.08252L6.8754 5.59662L6.61816 4.11884ZM18.4996 7C18.4996 9.22828 17.1744 11.1503 15.2627 12.0147L16.4988 14.7482C19.4448 13.416 21.4996 10.4496 21.4996 7H18.4996ZM12.9996 1.5C16.0372 1.5 18.4996 3.96243 18.4996 7H21.4996C21.4996 2.30558 17.694 -1.5 12.9996 -1.5V1.5ZM7.98492 4.73688C8.84937 2.82522 10.7713 1.5 12.9996 1.5V-1.5C9.55004 -1.5 6.58359 0.554781 5.25141 3.50079L7.98492 4.73688ZM6.8754 5.59662C7.23958 5.53322 7.61512 5.5 7.99962 5.5V2.5C7.44192 2.5 6.89426 2.54822 6.36093 2.64106L6.8754 5.59662ZM7.99962 5.5C11.5895 5.5 14.4996 8.41015 14.4996 12H17.4996C17.4996 6.75329 13.2463 2.5 7.99962 2.5V5.5ZM14.4996 12C14.4996 12.3845 14.4664 12.76 14.403 13.1242L17.3586 13.6387C17.4514 13.1054 17.4996 12.5577 17.4996 12H14.4996Z" fill="#9CA3AF" mask="url(#path-2-inside-1_14252_75339)" class="fill-current" /></svg>

          Tokens
        </nuxt-link>
        <nuxt-link tag="button" class="flex items-center gap-2 pb-2 " :to="`/profile_detail/${$route.params.id}/friends`" :class="$route.path.split('/')[3] === 'friends' ? 'border-b-[3px] border-white' :''">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-person-check-fill w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          Friends
        </nuxt-link>
        <nuxt-link tag="button" class="flex items-center gap-2 pb-2 " :to="`/profile_detail/${$route.params.id}/medias`" :class="$route.path.split('/')[3] === 'medias' ? 'border-b-[3px] border-white' :''">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-images"
            viewBox="0 0 16 16"
          >
            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
          </svg>
          Medias
        </nuxt-link>
      </div>
    </div>
    <div class="w-full grid grid-cols-8 gap-2">
      <div class=" w-full" :class="['friends', 'medias'].includes($route.path.split('/')[3]) ? 'col-span-8' :'col-span-6'">
        <div v-if="$route.path.split('/')[1] === 'profile_detail' && $route.path.split('/').length === 3 " class="text-white px-2">
          <div v-if="feedProfile.length>0 && isLoadFeedProfile">
            <Post v-for="item in feedProfile" :key="item._id" :post="item" class="mb-4" />
          </div>
          <div v-if="!isLoadFeedProfile" class="border border-gray-700 shadow rounded-lg p-4 mx-auto mt-4 w-full">
            <div class="animate-pulse flex space-x-4">
              <div class="rounded-full bg-slate-200 h-12 w-12" />
              <div class="flex-1 space-y-4 py-1">
                <div class="h-9 w-36 bg-slate-200 rounded mt-1" />
                <div class="space-y-3">
                  <div class="h-24 bg-slate-200 rounded" />
                  <div class="flex w-full space-x-6">
                    <div class="h-4 bg-slate-200 rounded w-20" />
                    <div class="h-4 bg-slate-200 rounded w-20" />
                    <div class="h-4 bg-slate-200 rounded w-20" />
                    <div class="h-4 bg-slate-200 rounded w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="feedProfile.length===0 && isLoadFeedProfile" class=" w-full flex justify-center items-center h-20 text-[18px] text-gray-400 font-medium bg-gray_850 rounded-xl">
            No Content
          </div>
        </div>
        <NuxtChild class="px-4" />
      </div>
      <div :class="['friends', 'medias'].includes($route.path.split('/')[3]) ? 'hidden' :''" class="col-span-2 text-white flex flex-col">
        <div class="w-full h-40 rounded-xl text-white bg-gray_850 px-3 py-3 flex flex-col space-y-3 border border-gray-700">
          <p class=" font-semibold">
            About
          </p>
          <textarea :placeholder="user.aboutMe" class="bg-gray_850 resize-none" disabled />
        </div>
        <AlbumShort />
      </div>
    </div>
    <ShowSingle ref="showSingleImg" :image="singleUrl" />
    <UploadSingle ref="uploadSingle" @updateUser="fetchUserInfo" />
    <ReportAccount v-if="isReportAccount" :user-id="user?._id" @hiddenReport="isReportAccount=false" />
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import ShowSingle from '~/components/modal/ShowSingle.vue'
import UploadSingle from '@/components/modal/UploadSingle.vue'
import Post from '~/components/post/Post.vue'
import Loading from '@/components/loading/Loading.vue'
import AlbumShort from '~/components/album/AlbumShort.vue'
import ReportAccount from '@/components/modal/ReportAccount.vue'
import MessageBlock from '~/components/modal/MessageBlock.vue'
export default {
  name: 'ProfileDetailId',
  components: {
    Post, Loading, AlbumShort, ShowSingle, UploadSingle, ReportAccount, MessageBlock
  },
  data: () => {
    return {
      isSettingShow: false,
      user: {
        _id: '',
        fullname: null,
        createdAt: null,
        avatar: '',
        coverImage: '',
        countFriend: 0,
        countFollower: 0
      },
      isReportAccount: false,
      singleUrl: '',
      isFriend: false,
      isPending: false,
      isYourProfile: false,
      isReceiver: false,
      cssProps: {
        backgroundImage: `url(${require('@/static/avatar/cover.jpg')})`
      },
      isLoaded: false,
      isLoadedUnFriend: false,
      isLoadedAddFriend: false,
      isLoadedCancelRequest: false,
      isLoadedAcceptFriend: false,
      isLoadedRefuseFriend: false,
      isDisable: false,
      posts: [],
      isLoadMore: false,
      isDebounce: null,
      isOnline: false,
      isModalBlock: false,
      isLoadFeedProfile: false,
      countPost: 0
    }
  },
  computed: {

    defaultAvatar () {
      return this.$store.getters.avatar
    },
    defaultCover () {
      return this.$store.getters.cover
    },
    feedProfile () {
      return this.$store.getters['post/feedProfile']
    },
    pageDetailPostProfile () {
      return this.$store.getters['post/pageDetailPostProfile']
    }
  },
  async created () {
    this.isLoadFeedProfile = false
    await this.checkBlock(this.$route.params.id)
    await this.getUserProfile()
    await this.getPostFeedProfile({ limit: 5, page: 1, isLoadMore: this.isLoadMore })
    this.isLoadFeedProfile = true
    this.isLoaded = true
  },
  mounted () {
    if (this.$route.path.split('/')[1] === 'profile_detail' && this.$route.path.split('/').length === 3) {
      window.addEventListener('scroll', this.loadMore)
    }
    if (!this.isYourProfile) {
      window.socket.emit('getOnlineGroupUsers', { userId: this.$route.params.id })
      window.socket.on('onlineGroupUsersReceived', this.handleOnline)
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.loadMore)
    window.socket.off('onlineGroupUsersReceived', this.handleOnline)
  },
  methods: {
    async copyUrl () {
      try {
        const url = window.location
        await navigator.clipboard.writeText(url)
        this.$toast.success('Copy link of profile successfully')
      } catch ($e) {
        this.$toast.error('Cannot copy!')
      }
    },
    goToSetting () {
      this.$router.push({ path: '/user-setting/profile' })
    },
    handleOnline (data) {
      this.isOnline = data.isOnline
    },
    reportAccount () {
      this.isReportAccount = true
    },
    showUploadAvatar () {
      this.$refs.uploadSingle.show('AVATAR')
    },
    async fetchUserInfo () {
      await this.getUserProfile()
    },
    showUploadCover () {
      this.$refs.uploadSingle.show('COVER')
    },
    showSingleAvatarImg (img) {
      if (img) {
        this.singleUrl = img
        this.$refs.showSingleImg.show()
      } else {
        this.singleUrl = this.defaultAvatar
        this.$refs.showSingleImg.show()
      }
    },
    showSingleCoverImg (img) {
      if (img) {
        this.singleUrl = img
      } else {
        this.singleUrl = this.defaultCover
      }
      this.$refs.showSingleImg.show()
    },
    ...mapMutations(['showFollower']),
    showSetting (e) {
      this.isSettingShow = e
    },
    tongleShowSetting () {
      this.isSettingShow = !this.isSettingShow
    },
    async getUserProfile () {
      try {
        if (this.$route.params.id) {
          const dataUserProfile = await this.$api.user.getUserProfile(this.$route.params.id)
          this.user = dataUserProfile.data.user
          this.isFriend = dataUserProfile.data.isFriend
          this.isPending = dataUserProfile.data.isPending
          this.isReceiver = dataUserProfile.data.isReceiver
          this.isYourProfile = dataUserProfile.data.isYourProfile
          this.countPost = dataUserProfile.data.countPost
        } else {
          return false
        }
      } catch (err) {
        this.$router.push('/')
      }
    },
    async getPostByUserId (post, limit, page) {

    },
    async removeFriendByUserId () {
      try {
        this.isLoadedUnFriend = true
        this.isDisable = true
        await this.$api.friend.removeFriendByUserId(this.$route.params.id)
        await this.getUserProfile()
        this.isLoadedUnFriend = false
        this.isDisable = false
      } catch (err) {
        this.$toast.error(err.data.message)
        this.isLoadedUnFriend = false
        this.isDisable = false
      }
    },
    async refuseFriendRequestByUserId () {
      try {
        this.isLoadedRefuseFriend = true
        this.isDisable = true
        await this.$api.friend.refuseFriendRequestByUserId(this.$route.params.id)
        await this.getUserProfile()
        this.isDisable = false
        this.isLoadedRefuseFriend = false
      } catch (err) {
        this.isLoadedRefuseFriend = false
        this.isDisable = false
      }
    },
    async createFriendRequest () {
      try {
        this.isLoadedAddFriend = true
        this.isDisable = true
        await this.$api.friend.createFriendRequest(this.$route.params.id)
        await this.getUserProfile()
        this.isLoadedAddFriend = false
        this.isDisable = false
      } catch (err) {
        this.isDisable = false
        this.isLoadedAddFriend = false
      }
    },
    async cancelFriendRequestByUserId () {
      try {
        this.isLoadedCancelRequest = true
        this.isDisable = true
        await this.$api.friend.cancelFriendRequestByUserId(this.$route.params.id)
        await this.getUserProfile()
        this.isLoadedCancelRequest = false
        this.isDisable = false
      } catch (err) {
        this.isLoadedCancelRequest = false
        this.isDisable = false
      }
    },
    async acceptFriendRequestByUserId () {
      try {
        this.isLoadedAcceptFriend = true
        this.isDisable = true
        await this.$api.friend.acceptFriendRequestByUserId(this.$route.params.id)
        await this.getUserProfile()
        this.isLoadedAcceptFriend = false
        this.isDisable = false
      } catch (err) {
        this.isLoadedAcceptFriend = false
        this.isDisable = false
      }
    },

    // post-------------------------------post----------------------------
    async getPostFeedProfile ({ limit, page, isLoadMore }) {
      try {
        await this.$store.dispatch('post/getPostFeedProfile', { userId: this.$route.params.id, limit, page, isLoadMore })
      } catch (err) {
        //
      }
    },
    loadMore () {
      try {
        clearTimeout(this.isDebounce)
        this.isDebounce = setTimeout(async () => {
          if (this.$route.path.split('/')[1] === 'profile_detail' && this.$route.path.split('/').length === 3 && this.pageDetailPostProfile.nextPage && !this.isLoadMore) {
            if (!this.isLoadMore && this.pageDetailPostProfile.nextPage && document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 120) {
              this.isLoadMore = true
              await this.getPostFeedProfile({ limit: 5, page: this.pageDetailPostProfile.nextPage, isLoadMore: this.isLoadMore })
              this.isLoadMore = false
            }
          }
        }, 300)
      } catch (err) {
        //
      }
    },
    toggleModalBlock () {
      this.isModalBlock = !this.isModalBlock
    },
    async blockUser () {
      try {
        this.isModalBlock = false
        await this.$api.user.blockUserByUserId(this.$route.params.id)
      } catch (error) {

      }
    },
    async checkBlock (id) {
      try {
        const tmp = await this.$api.user.checkBlockByUserId(id)
        if (tmp.data === true) {
          this.$router.push('/error')
        }
      } catch (error) {

      }
    }
  }
}
</script>

<style lang="scss">
.cover-img{
  background-position:  50% 65%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
