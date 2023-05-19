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
                {{ tags.toUpperCase() }}
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
              <a-popconfirm
                v-if="data.length"
                title="Sure to delete?"
                class="a-btn-confirm"
                @confirm="() => onDelete(record._id)"
              >
                <button class="bg-red-500 text-white rounded-md py-[6px] text-center justify-center hover:bg-red-600 flex items-center w-20">
                  Delete
                </button>
              </a-popconfirm>
            </template>
            <template slot="avatar" slot-scope="text, record">
              <img :src="record.avatar" alt="photo" class="w-12 h-12 rounded-full object-cover cursor-pointer" @click="showAvatar(record.avatar)">
            </template>
          </a-table>
          <ShowSingle ref="showAvatar" :image="avatar" class="top-0 left-0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowSingle from '~/components/modal/ShowSingle.vue'

export default {
  components: { ShowSingle },
  data () {
    return {
      avatar: '',
      data: [],
      searchText: '',
      searchEmail: '',
      searchInput: null,
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
          width: 290,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.fullname
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
    await this.statisticalUser({ page: 1, limit: 8, sort: 'DESC', fullname: '', email: '' })
  },
  methods: {
    showAvatar (avatar) {
      this.avatar = avatar
      this.$refs.showAvatar.show()
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      try {
        confirm()
        console.log(dataIndex)
        if (dataIndex === 'fullname') {
          this.searchText = selectedKeys[0]
        }
        if (dataIndex === 'email') {
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
    async statisticalUser ({ page, limit, sort, fullname, email }) {
      try {
        const dataUser = await this.$api.admin.statisticalUser({ page, limit, sort, fullname, email })
        this.data = dataUser.data.listUser
        this.pagination.total = dataUser.data.pageDetail.totalDocs
        this.pagination.current = page
        this.pagination.pageSize = limit
      } catch (error) {
      }
    },
    async handleTableChange (pagination, filters, sorter) {
      try {
        this.pagination.current = pagination.current
        await this.statisticalUser({ page: pagination.current, limit: 8, sort: 'DESC', fullname: this.searchText, email: this.searchEmail })
      } catch (error) {
      }
    },
    onDelete (key) {
      console.log(key)
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
