<template>
  <div class="flex justify-between p-2 m-2 bg-gray_850 rounded-lg w-full">
    <div>
      <div class="text-base">
        {{ nameAction }}
      </div>
      <div>
        +
        <img class="w-5 inline" src="http://localhost:3000/_nuxt/static/logo/dscvr-logo.png" alt="">
        {{ daily.quantityToken }}
      </div>
    </div>
    <div v-if="isDone" class="pt-3 mr-3">
      <div class="bg-emerald-400 rounded-full w-5 h-5 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-check-lg"
          viewBox="0 0 16 16"
        >
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
        </svg>
      </div>
    </div>
    <div v-if="isClaim && !isDone" class="mt-2" @click="claimToken">
      <button class="bg-emerald-400 rounded-lg p-1 pl-3 pr-3 items-center">
        Claim
      </button>
    </div>
    <div v-if="!isClaim" class="mt-3 mr-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      </svg>
    </div>
  </div>
</template>

<script>
import { TaskAction } from '~/constants/token'

export default {
  props: {
    daily: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isDone: false,
      isClaim: false,
      TaskAction: {},
      nameAction: 'daily'
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.TaskAction = TaskAction
      const tmp = this.daily.numberTaskDone / this.daily.numberTask
      this.isDone = this.daily.isDone
      if (tmp >= 1) {
        this.isClaim = true
      } else {
        this.isClaim = false
      }
      if (this.daily.action === TaskAction.CREATE_POST) {
        this.nameAction = `Create ${this.daily.numberTask} post`
      } else if (this.daily.action === TaskAction.CREATE_COMMENT) {
        this.nameAction = `Make ${this.daily.numberTask} comments on the post`
      } else if (this.daily.action === TaskAction.LIKE_POST) {
        this.nameAction = `Like ${this.daily.numberTask} post`
      } else if (this.daily.action === TaskAction.SHARE_POST) {
        this.nameAction = `Share ${this.daily.numberTask} post`
      }
    },
    async claimToken () {
      try {
        await this.$api.token.acceptTaskDaily(this.daily._id)
        this.isDone = true
      } catch (err) {
      //
      }
    }
  }
}
</script>
