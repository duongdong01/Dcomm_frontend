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
        <span v-if="searchDescription && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchDescription})|(?=${searchDescription})`, 'i'))"
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
              <div class="flex items-center space-x-1 font-medium text-black" @click="goToUser(record.reportUser._id)">
                <a-icon type="double-right" />
                <div>
                  Go to account
                </div>
              </div>
            </a-menu-item>
            <a-menu-item key="2">
              <div class="flex items-center space-x-1  text-red-500 font-medium">
                <a-icon type="delete" class="text-red-500" />
                <div>
                  Delete account
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

      <template slot="avatarReport" slot-scope="text, record">
        <img :src="record.reportUser.avatar" alt="photo" class="w-12 h-12 rounded-full object-cover cursor-pointer" @click="showAvatar(record.userSender.avatar)">
      </template>
    </a-table>
    <ShowSingle ref="showAvatar" :image="avatar" class="top-0 left-0" />
    <DeleteModal ref="deleteModal" :title="title" @delete="deleteReport" />
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
      searchDescription: '',
      searchEmailSender: '',
      searchEmailReported: '',
      searchFullNameReported: '',
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
          width: 200,
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
          title: 'Avatar sender',
          dataIndex: 'userSender.avatar',
          key: 'avatar',
          width: 160,
          scopedSlots: {
            customRender: 'avatar'
          }
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          width: 260,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.description
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
          title: 'Email reported',
          dataIndex: 'reportUser.email',
          key: 'emailReported',
          width: 200,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.reportUser.email
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
          title: 'Fullname reported',
          dataIndex: 'reportUser.fullname',
          key: 'fullnameReported',
          width: 200,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.reportUser.fullname
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
          title: 'Avatar reported',
          dataIndex: 'reportUser.avatar',
          key: 'avatarReported',
          width: 160,
          scopedSlots: {
            customRender: 'avatarReport'
          }
        },
        {
          title: 'CreatedAt',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 220,
          scopedSlots: {
            customRender: 'createdAt'
          },
          sorter: (a, b) => a
        },
        {
          title: 'Action',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      title: 'Are you sure delete this report?'
    }
  },
  async created () {
    await this.listReportUser({ page: 1, limit: 8, sort: 'DESC', emailSender: '', emailReported: '', nameReported: '', description: '' })
  },
  methods: {
    showAvatar (avatar) {
      this.avatar = avatar
      this.$refs.showAvatar.show()
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      try {
        confirm()
        if (dataIndex === 'userSender.email') {
          this.searchEmailSender = selectedKeys[0]
        }
        if (dataIndex === 'reportUser.email') {
          this.searchEmailReported = selectedKeys[0]
        }
        if (dataIndex === 'description') {
          this.searchDescription = selectedKeys[0]
        }
        if (dataIndex === 'reportUser.fullname') {
          this.searchFullNameReported = selectedKeys[0]
        }
      } catch (error) {
      }
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchEmailReported = ''
      this.searchDescription = ''
      this.searchEmailSender = ''
      this.searchFullNameReported = ''
    },
    goToUser (userId) {
      window.open(`${window.location.origin}/profile_detail/${userId}`)
    },
    async handleTableChange (pagination, filters, sorter) {
      try {
        let order = 'DESC'
        if (sorter.order === 'ascend') {
          order = 'ASC'
        } else {
          order = 'DESC'
        }
        this.pagination.current = pagination.current
        await this.listReportUser({ page: pagination.current, limit: 8, sort: order, description: this.searchDescription, emailSender: this.searchEmailSender, emailReported: this.searchEmailReported, nameReported: this.searchFullNameReported })
      } catch (error) {
      }
    },
    async listReportUser ({ page, limit, sort, description, emailSender, emailReported, nameReported }) {
      try {
        this.loading = true
        const reportData = await this.$api.admin.getListReportUser({ page, limit, sort, description, emailSender, emailReported, nameReported })
        this.data = reportData.data.listUserReport
        this.pagination.total = reportData.data.pageDetail.totalDocs
        this.pagination.current = page
        this.pagination.pageSize = limit
        this.loading = false
      } catch (error) {
        this.loading = false
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
