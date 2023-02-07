<template>
  <div class="flex flex-col bg-gray-800 p-4  rounded-2xl space-y-4 ">
    <h1 class="text-white font-semibold text-xl">
      Trends for you
    </h1>
    <div class="space-y-4">
      <div v-for="item in [0,1,2,3,4]" :key="item" class="trend_item flex justify-between">
        <div class="flex flex-col">
          <p class="text-white">
            Trending in Vietnam
          </p>
          <h1 class="text-white font-medium">
            Abc
          </h1>
          <p class="text-white">
            4,555 share
          </p>
        </div>
        <div>
          <i class="fa-solid fa-ellipsis text-white" />
        </div>
      </div>
    </div>
  </div>
</template>
