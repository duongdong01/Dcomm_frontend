<template>
  <div class="grid grid-cols-10 text-white">
    <div class="col-span-2  border-r-[1.5px] border-[#303030] rounded-lg overflow-y-scroll conversation_left">
      <div class="flex flex-col pr-8">
        <div class="flex h-16 leading-[64px] justify-between items-center">
          <div>
            <p class="text-[22px] font-semibold text-white">
              Chat
            </p>
          </div>
          <div class="flex w-10 h-10 rounded-full bg-[#3a3b3c] justify-center cursor-pointer items-center hover:opacity-95 hover:bg-[#3a3b3c]/95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </div>
        </div>
        <ListDiscusstion />
      </div>
    </div>
    <div class="col-span-6  flex flex-col border-[1.5px] border-[#303030] ">
      <div class="h-[72px] border-b-[1.5px] border-[#303030] flex items-center justify-between">
        <div class="flex">
          <div class="flex justify-center items-center pl-4 relative">
            <img src="@/static/avatar/avatar1.jpg" alt="photo" class="w-11 h-11 rounded-full">
            <div class="w-3 h-3 right-1 bottom-0  bg-green-600 absolute rounded-full border-[1.8px] border-black" />
          </div>
          <div class="flex flex-col justify-start">
            <p class="text-white font-medium text-[16px] ml-3">
              Duong Dong
            </p>
            <p class="text-white font-normal text-[14px] ml-3">
              Đang hoạt động
            </p>
          </div>
        </div>
        <div class="flex pr-10 space-x-2">
          <div class="flex w-9 h-9 rounded-full hover:opacity-95 hover:bg-[#3a3b3c]/95  justify-center items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-telephone-fill text-red-700 w-5 h-5"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
            </svg>
          </div>
          <div class="flex w-9 h-9 rounded-full hover:opacity-95 hover:bg-[#3a3b3c]/95  justify-center items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-camera-video-fill text-red-700 w-5 h-5"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" />
            </svg>
          </div>
          <div class="flex w-9 h-9 rounded-full hover:opacity-95 hover:bg-[#3a3b3c]/95  justify-center items-center cursor-pointer icon_warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-exclamation-square-fill text-red-700 w-5 h-5 rounded-full"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="overflow-y-scroll h-full conversation_left">
        <p class="text-black bg-[#e9e9eb] px-2 py-3 rounded-lg mt-10 w-52">
          Messsadad nadagdahd
        </p>
        MESSAGE
      </div>
    </div>
    <div class="col-span-2  rounded-r-lg border-l-[1.5px] border-[#303030]">
      <RightConversation />
    </div>
  </div>
</template>

<script>
import ListDiscusstion from '~/components/conversations/ListDiscusstion.vue'
import RightConversation from '~/components/conversations/RightConversation.vue'

export default {
  name: 'Conversation',
  components: { ListDiscusstion, RightConversation },
  layout: 'conversation'
}
</script>
<style lang="scss">
.conversation_left::-webkit-scrollbar-track
{
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
background-color: #424242;
}

.conversation_left::-webkit-scrollbar
{
width: 10px;
background-color: #424242;
}

.conversation_left::-webkit-scrollbar-thumb
{
background-color: #686868;
border: 2px solid #686868;
}
.icon_warning{
  -webkit-transform:rotate(180deg);
}
</style>
