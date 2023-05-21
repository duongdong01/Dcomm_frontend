<template>
  <div class="fixed flex justify-center items-center w-full h-full top-0 left-0 z-20" style="background-color: rgba(0, 0, 0, 0.45)">
    <div class="max-w-[500px] w-[500px] bg-gray_850  pb-2 -mt-20 rounded-xl border border-gray-700">
      <div class="flex py-4 border-b border-gray-700 text-white justify-center text-[18px] relative font-medium">
        <p> Report </p>
        <div v-if="isShowSubmitReport" class="absolute cursor-pointer left-2 top-2 w-8 h-8 rounded-full flex justify-center items-center  bg-gray-600" @click="backToReport">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </div>
        <div class="absolute cursor-pointer right-2 top-2 w-8 h-8 rounded-full flex justify-center items-center  bg-gray-600" @click="hiddenReportModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
      </div>
      <div v-if="!isShowSubmitReport">
        <div class="px-5 pt-2">
          <p class="font-medium text-white text-[18px]">
            Please select a problem
          </p>
          <p class="text-[14px] font-medium text-gray-400">
            If someone is in immediate danger, get help before reporting.
          </p>
          <p class="text-[14px] font-medium text-gray-400">
            Don't wait.
          </p>
        </div>
        <div class="flex flex-col w-full">
          <div v-for="(item,index) in reports" :key="index" @click="showSubmitReport(item)">
            <ReportItem :report="item" />
          </div>
        </div>
      </div>
      <div v-if="isShowSubmitReport">
        <div class="px-5 pt-2 space-y-1">
          <p class="font-medium text-white text-[18px]">
            {{ reportSubmit.name }}
          </p>
          <p class="text-[14px] font-medium text-gray-400">
            {{ reportSubmit.title }}
          </p>
        </div>
        <div v-if="reportSubmit.description.length" class="text-[14px] font-semibold">
          <ul class="px-9">
            <li v-for="(descriptionItem,indexDes) in reportSubmit.description" :key="indexDes" class="list-disc text-white">
              {{ descriptionItem }}
            </li>
          </ul>
        </div>
        <div v-if="reportSubmit.name==='Something Else'" class="flex w-full px-5 pt-2">
          <textarea id="" v-model="reportText" name="" class="h-20 resize-none bg-gray-900 p-2 rounded-md border border-gray-700 w-full text-gray-300 outline-none" placeholder="Write here ..." />
        </div>
        <div class="flex w-full justify-center px-6 my-4 relative items-center">
          <button class="py-[6px] text-center bg-blue-500 text-white font-medium text-[14px] w-full rounded-md hover:opacity-90" :disabled="isCreatePost" @click="submitReport(reportSubmit)">
            Submit
            <Loading v-if="isCreatePost" class="absolute top-0" />
          </button>
        </div>
      </div>
      <div class="h-4 w-full border-t-[1px] border-t-gray-700 mt-1" />
    </div>
  </div>
</template>

<script>
import Loading from '../loading/Loading.vue'
import ReportItem from '@/components/post/ReportItem.vue'
export default {
  components: {
    ReportItem, Loading
  },
  props: {
    userId: {
      type: String,
      default: () => String
    }
  },
  data () {
    return {
      isCreatePost: false,
      reports: [
        {
          id: 1,
          name: 'Fake account',
          title: 'Does this go against our Community Standards?',
          description: [
            "Our standards explain what we do and don't allow on Facebook. We review and update our standards regularly, with the help of experts."
          ]
        },
        {
          id: 2,
          name: 'Fake name',
          title: "We use your feedback to help our systems learn when something isn't right",
          description: [
          ]
        },
        {
          id: 3,
          name: 'Posting inappropriate things',
          title: 'If you think we should look at something specific on this profile, you can report that exact content (like a status update.',
          description: [
          ]
        },
        {
          id: 4,
          name: 'Harassment or bullying',
          title: "We use your feedback to help our systems learn when something isn't right.",
          description: [
          ]
        },
        {
          id: 4,
          name: 'Something Else',
          title: 'What problem would you like to report?',
          description: [
          ]
        }
      ],
      isShowSubmitReport: false,
      reportSubmit: {},
      reportText: ''
    }
  },
  methods: {
    showSubmitReport (report) {
      this.reportSubmit = report
      this.isShowSubmitReport = true
    },
    backToReport () {
      this.isShowSubmitReport = false
    },
    hiddenReportModal () {
      this.$emit('hiddenReport', true)
    },
    async submitReport (report) {
      try {
        this.isCreatePost = true
        if (report.name === 'Something Else') {
          if (this.reportText.trim().length === 0) {
            this.$toast.error('Please enter what you want to report')
            this.isCreatePost = false
            return false
          } else {
            await this.$api.user.reportUser({ reportUserId: this.userId, name: report.name, description: this.reportText })
            this.$toast.success('Report user successfully')
            this.isShowSubmitReport = false
            this.hiddenReportModal()
            this.isCreatePost = false
          }
        } else {
          await this.$api.user.reportUser({ reportUserId: this.userId, name: report.name, description: report.name })
          this.$toast.success('Report user successfully')
          this.isShowSubmitReport = false
          this.hiddenReportModal()
          this.isCreatePost = false
        }
      } catch (error) {
        this.isCreatePost = true
      }
    }
  }
}

</script>
