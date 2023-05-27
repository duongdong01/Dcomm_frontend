<template>
  <div class="table-user w-full mt-4">
    <a-table
      :data-source="data"
      :columns="columns"
      :row-key="record=>record._id"
      :pagination="pagination"
      :align="'right'"
      bordered
      :loading="loading"
      @change="handleTableChange"
    >
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px ,color: white"
          class="a-btn-search"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
            >{{ fragment }}</mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template slot="createdAt" slot-scope="text,record">
        <div>
          {{ $dayjs(record.createdAt).format('MMMM D, YYYY h:mm A') }}
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick($event,record)">
            <a-menu-item key="1">
              <div class="flex items-center space-x-1 font-medium text-black" @click="goToPost(record.postId)">
                <a-icon type="double-right" />
                <div>
                  Go to post
                </div>
              </div>
            </a-menu-item>
            <a-menu-item key="2">
              <div class="flex items-center space-x-1  text-red-500 font-medium" @click="showDeletePost(record)">
                <a-icon type="delete" class="text-red-500" />
                <div>
                  Delete post
                </div>
              </div>
            </a-menu-item>
            <a-menu-item key="3">
              <div class="flex items-center space-x-1 text-red-500 font-medium" @click="showDeleteReport(record)">
                <a-icon type="delete" class="text-red-500" />
                <div>
                  Delete report
                </div>
              </div>
            </a-menu-item>
          </a-menu>
          <button class="flex justify-center items-center py-2 px-2 space-x-1 font-medium bg-blue-500 rounded-md text-white hover:bg-blue-600">
            <div>
              More action
            </div>
            <a-icon type="down" class="text-[16px]" />
          </button>
        </a-dropdown>
      </template>
      <template slot="avatar" slot-scope="text, record">
        <img :src="record.userSender.avatar" alt="photo" class="w-12 h-12 rounded-full object-cover cursor-pointer" @click="showAvatar(record.userSender.avatar)">
      </template>
    </a-table>
    <ShowSingle ref="showAvatar" :image="avatar" class="top-0 left-0" />
    <DeleteModal ref="deleteModal" :title="title" @delete="deleteReport" />
    <DeleteModal ref="deletePost" :title="title2" @delete="deletePost" />
  </div>
</template>

<script>
import ShowSingle from '~/components/modal/ShowSingle.vue'
import DeleteModal from '@/components/admin/modal/DeleteModal.vue'
export default {
  components: { ShowSingle, DeleteModal },
  data () {
    return {
      avatar: '',
      data: [],
      searchText: '',
      searchEmail: '',
      searchInput: null,
      loading: false,
      pagination: {
        total: 1,
        current: 1,
        pageSize: 1
      },
      searchedColumn: '',
      columns: [
        {
          title: 'Sender email',
          dataIndex: 'userSender.email',
          key: 'email',
          width: 280,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.userSender.email
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: 'Sender name',
          dataIndex: 'userSender.fullname',
          key: 'fullname',
          width: 280,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.userSender.fullname
            .toString()
            .toLowerCase(),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Avatar',
          dataIndex: 'userSender.avatar',
          key: 'avatar',
          width: 200,
          scopedSlots: {
            customRender: 'avatar'
          }
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          width: 280
        },
        {
          title: 'CreatedAt',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 280,
          scopedSlots: {
            customRender: 'createdAt'
          }
        },
        {
          title: 'Action',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      title: 'Are you sure delete this report?',
      title2: 'Are you sure delete this post?'
    }
  },
  async created () {
    await this.listReportPost({ page: 1, limit: 8, sort: 'DESC', fullname: '', email: '' })
  },
  methods: {
    showAvatar (avatar) {
      this.avatar = avatar
      this.$refs.showAvatar.show()
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      try {
        confirm()
        if (dataIndex === 'userSender.fullname') {
          this.searchText = selectedKeys[0]
        }
        if (dataIndex === 'userSender.email') {
          this.searchEmail = selectedKeys[0]
        }
      } catch (error) {
      }
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
      this.searchEmail = ''
    },
    goToPost (postId) {
      window.open(`${window.location.origin}/post/${postId}`)
    },
    async handleTableChange (pagination, filters, sorter) {
      try {
        this.pagination.current = pagination.current
        await this.listReportPost({ page: pagination.current, limit: 8, sort: 'DESC', fullname: this.searchText, email: this.searchEmail })
      } catch (error) {
      }
    },
    async listReportPost ({ page, limit, sort, fullname, email }) {
      try {
        this.loading = true
        const reportData = await this.$api.admin.listReportPost({ page, limit, sort, email, fullname })
        this.data = reportData.data.listReport
        this.pagination.total = reportData.data.pageDetail.totalDocs
        this.pagination.current = page
        this.pagination.pageSize = limit
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    onDelete (key) {
      console.log(key)
    },
    handleMenuClick (e, item) {
      console.log('click', e)
    },
    showDeleteReport (record) {
      this.$refs.deleteModal.showDeleteConfirm(record._id)
    },
    showDeletePost (record) {
      this.$refs.deletePost.showDeleteConfirm(record.postId)
    },
    async deletePost (e) {
      try {
        await this.$api.admin.deletePost({ postId: e })
        this.$toast.success('Delete post successfully', { timeout: 1500 })
      } catch (error) {

      }
    },
    async deleteReport (e) {
      try {
        await this.$api.admin.deleteUserReport({ reportId: e })
        let index = 0
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i]._id.toString() === e.toString()) {
            index = i
          }
        }
        this.data.splice(index, 1)
        this.$toast.success('Delete report successfully.', { timeout: 1500 })
      } catch (error) {
      //
      }
    }
  }
}
</script>
    <style lang="scss">
    .highlight {
      background-color: rgb(255, 192, 105);
      padding: 0px;
    }
    .a-btn-search{
      @apply bg-[#1890ff] text-white hover:bg-blue-400 hover:text-white
    }
  .ant-btn-primary{
    @apply bg-[#1890ff] text-white hover:bg-blue-400 hover:text-white
  }
    </style>
