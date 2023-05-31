<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div class="px-4 py-5 flex-auto">
      <div class="tab-content tab-space">
        <div class="table-user w-full mt-4">
          <a-table
            :data-source="data"
            :columns="columns"
            :row-key="record=>record._id"
            :pagination="pagination"
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
            <span slot="tags" slot-scope="tags">
              <a-tag
                :color="tags === 'USER' ? 'geekblue' : 'green'"
              >
                {{ tags?.toUpperCase() }}
              </a-tag>
            </span>
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
            <template slot="operation" slot-scope="text, record">
              <button class="flex justify-center items-center py-2 px-2 space-x-1 w-20 bg-blue-500 rounded-md text-white hover:bg-blue-600" @click="showRestoreUser(record._id)">
                Restore
              </button>
            </template>
            <template slot="avatar" slot-scope="text, record">
              <img :src="record.avatar" alt="photo" class="w-12 h-12 rounded-full object-cover cursor-pointer" @click="showAvatar(record.avatar)">
            </template>
          </a-table>
          <ShowSingle ref="showAvatar" :image="avatar" class="top-0 left-0" />
        </div>
      </div>
      <ConfirmModal ref="confirmBin" :title="title" @confirm="onConfirm" />
    </div>
  </div>
</template>

<script>
import ConfirmModal from '../modal/ConfirmModal.vue'
import ShowSingle from '~/components/modal/ShowSingle.vue'

export default {
  components: { ShowSingle, ConfirmModal },
  data () {
    return {
      avatar: '',
      data: [],
      loading: false,
      searchText: '',
      searchInput: null,
      title: 'Do you want to restore this account?',
      pagination: {
        total: 1,
        current: 1,
        pageSize: 1
      },
      searchedColumn: '',
      columns: [
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: 290,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.email
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
          title: 'FullName',
          dataIndex: 'fullname',
          key: 'fullname',
          width: 290
        },
        {
          title: 'Avatar',
          dataIndex: 'avatar',
          key: 'avatar',
          scopedSlots: {
            customRender: 'avatar'
          }
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'
        },
        {
          title: 'Role',
          dataIndex: 'role.name',
          key: 'role',
          scopedSlots: { customRender: 'tags' }
        },
        {
          title: 'Action',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  async created () {
    await this.getDeletedUser({ page: 1, limit: 8, email: '' })
  },
  methods: {
    showAvatar (avatar) {
      this.avatar = avatar
      this.$refs.showAvatar.show()
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      try {
        confirm()
        if (dataIndex === 'email') {
          this.searchText = selectedKeys[0]
        }
      } catch (error) {
      }
    },
    showRestoreUser (e) {
      this.$refs.confirmBin.showConfirm(e)
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    async getDeletedUser ({ page, limit, email }) {
      try {
        this.loading = true
        const dataUser = await this.$api.admin.getDeletedUser({ page, limit, email })
        this.data = dataUser.data.users
        this.pagination.total = dataUser.data.pageDetail.totalDocs
        this.pagination.current = page
        this.pagination.pageSize = limit
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async handleTableChange (pagination, filters, sorter) {
      try {
        this.pagination.current = pagination.current
        await this.getDeletedUser({ page: pagination.current, limit: 8, email: this.searchText })
      } catch (error) {
      }
    },
    async onDelete (key) {
      try {
        await this.$api.admin.deleteUser({ deleteUserId: key })
        let index = 0
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i]._id.toString() === key.toString()) {
            index = i
          }
        }
        this.data.splice(index, 1)
        this.$toast.success('Delete account successfully.')
      } catch (error) {

      }
    },
    async onConfirm (key) {
      try {
        await this.$api.admin.restoreUser({ userRestoreId: key })
        let index = 0
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i]._id.toString() === key.toString()) {
            index = i
          }
        }
        this.data.splice(index, 1)
        this.$toast.success('Restore account successfully.')
      } catch (error) {

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
