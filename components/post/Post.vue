<template>
  <div class="flex flex-col bg-gray-800 rounded-xl mt-4 text-white px-6 py-5 text-base hover:border hover:border-pink-700  outline-none">
    <header class="flex justify-between cursor-pointer">
      <div class="flex">
        <div class="w-10 h-10 overflow-hidden">
          <img src="@/static/avatar/avatar1.jpg" alt="avatar" class="rounded-full">
        </div>
        <div class="flex flex-col ml-3 -mt-1">
          <p class="text-white font-medium">
            Duong1310
          </p>
          <div class="flex items-center gap-1 justify-center w-full -mt-2">
            <p class="font-light text-white/80 text-sm">
              1 days ago
            </p>
            <p class="pb-3">
              .
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-globe-americas text-white/80"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center -mt-1">
        <div class="hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
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
        </div>
      </div>
    </header>
    <div class="leading-9 flex justify-center flex-col">
      <p>
        Do we really have more than three spatial dimensions?
        In Einstein's relativity and the Standard Model, we only have three spatial dimensions. But there could be more, and many think there are.
      </p>
      <div class="mt-2 flex justify-center items-center overflow-hidden w-full max-h-[600px] rounded-md">
        <img src="@/static/img-post-demo.jpg" alt="" class="w-full">
      </div>
    </div>
    <div class="flex mt-8 gap-2">
      <div class="flex gap-[6px] bg-indigo-600 px-4 py-2 rounded-lg justify-center items-center hover:bg-indigo-500 cursor-pointer transition-all" title="Upvote">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-arrow-up-short text-white"
          viewBox="0 0 16 16"
        >
          <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
        </svg>
        <p>6</p>
      </div>
      <div class="px-3 py-2 hover:bg-btn_hover rounded-lg cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-arrow-down-short text-white"
          viewBox="0 0 16 16"
        >
          <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
        </svg>
      </div>
      <div class=" flex justify-center cursor-pointer hover:bg-btn_hover items-center gap-2 px-4 py-2 rounded-lg">
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
          0
        </p>
      </div>
      <div class="flex justify-center items-center cursor-pointer hover:bg-btn_hover rounded-lg px-4 py-2">
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
  </div>
</template>
