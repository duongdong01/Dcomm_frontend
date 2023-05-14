<template>
  <div>
    <a target="_blank" :href="file.conversationFile?.url" class="py-5 px-4 bg-gray-500 flex items-end rounded-xl">
      <div class="min-w-[48px]">
        <img src="@/static/file_icon.png" alt="photo" class="w-12">
      </div>
      <div class="flex flex-col px-1">
        <p>{{ file.conversationFile?.size }}</p>
        <div class="xl:max-w-[220px] truncate max-w-[160px] lg:max-w-[180px]">
          {{ file.conversationFile?.name }}
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: () => {}
    }
  }
}</script>
