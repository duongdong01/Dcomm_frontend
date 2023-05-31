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
                {{ tags.toUpperCase() }}
              </a-tag>
            </span>
            <template slot="amount" slot-scope="text, record">
              <div>
                {{ record.amount }} {{ record.currency }}
              </div>
            </template>
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
              <button class="bg-red-500 text-white rounded-md py-[6px] text-center justify-center hover:bg-red-600 flex items-center w-20" @click="showDeleteTran(record._id)">
                Delete
              </button>
            </template>
            <template slot="avatar" slot-scope="text, record">
              <div class="flex space-x-2 items-center">
                <img :src="record.owner.avatar" alt="photo" class="w-12 h-12 rounded-full object-cover cursor-pointer" @click="showAvatar(record.owner.avatar)">
                <div>
                  {{ record.owner.fullname }}
                </div>
              </div>
            </template>
          </a-table>
          <ShowSingle ref="showAvatar" :image="avatar" class="top-0 left-0" />
        </div>
      </div>
    </div>
    <DeleteModal ref="deleteTran" :title="title" @delete="onDelete" />
  </div>
</template>

<script>
import DeleteModal from '../modal/DeleteModal.vue'
import ShowSingle from '~/components/modal/ShowSingle.vue'

export default {
  components: { ShowSingle, DeleteModal },
  data () {
    return {
      avatar: '',
      title: 'Do you want to delete this transaction?',
      data: [],
      loading: false,
      searchText: '',
      searchPayee: '',
      searchPayer: '',
      searchTransactionId: '',
      payType: 'ALL',
      searchInput: null,
      pagination: {
        total: 1,
        current: 1,
        pageSize: 1
      },
      searchedColumn: '',
      columns: [
        {
          title: 'Email Payee',
          dataIndex: 'emailPayee',
          key: 'emailPayee',
          width: 260,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.emailPayee
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
          title: 'Email Payer',
          dataIndex: 'emailPayer',
          key: 'emailPayer',
          width: 260,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.emailPayer
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
          title: 'TransactionId',
          dataIndex: 'transactionId',
          key: 'transactionId',
          width: 260,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.transactionId
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
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          scopedSlots: {
            customRender: 'amount'
          }
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
          filters: [
            { text: 'DEPOSIT', value: 'DEPOSIT' },
            { text: 'WITHDRAW', value: 'WITHDRAW' }
          ],
          onFilter: (value, record) => record.type
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
          title: 'Avatar',
          dataIndex: 'owner.avatar',
          key: 'avatar',
          scopedSlots: {
            customRender: 'avatar'
          }
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
    await this.getTransactionPay({ page: 1, limit: 8, sort: 'DESC', payType: 'ALL', transactionId: '', emailPayer: '', emailPayee: '' })
  },
  methods: {
    showAvatar (avatar) {
      this.avatar = avatar
      this.$refs.showAvatar.show()
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      try {
        confirm()
        if (dataIndex === 'emailPayee') {
          this.searchPayee = selectedKeys[0]
        }
        if (dataIndex === 'emailPayer') {
          this.searchPayer = selectedKeys[0]
        }
        if (dataIndex === 'transactionId') {
          this.searchTransactionId = selectedKeys[0]
        }
      } catch (error) {
      }
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchPayee = ''
      this.searchPayer = ''
      this.searchTransactionId = ''
      this.payType = 'ALL'
    },
    async handleTableChange (pagination, filters, sorter) {
      try {
        if (filters && filters.type) {
          if (filters.type.length === 2) {
            this.payType = 'ALL'
          } else {
            this.payType = filters.type[0]
          }
        } else {
          this.payType = 'ALL'
        }
        this.pagination.current = pagination.current
        await this.getTransactionPay({ page: pagination.current, limit: 8, sort: 'DESC', emailPayee: this.searchPayee, emailPayer: this.searchPayer, transactionId: this.searchTransactionId, payType: this.payType || 'ALL' })
      } catch (error) {
      }
    },
    async onDelete (key) {
      try {
        await this.$api.admin.deletePayTran({ payId: key })
        let index = 0
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i]._id.toString() === key.toString()) {
            index = i
          }
        }
        this.data.splice(index, 1)
        this.$toast.success('Delete transaction successfully.')
      } catch (error) {

      }
    },
    showDeleteTran (e) {
      this.$refs.deleteTran.showDeleteConfirm(e)
    },
    async getTransactionPay ({ payType, page, limit, sort, transactionId, emailPayer, emailPayee }) {
      try {
        this.loading = true
        const dataTransaction = await this.$api.admin.getTransactionPay({ payType, page, limit, sort, transactionId, emailPayer, emailPayee })
        this.data = dataTransaction.data.payTransaction
        this.pagination.total = dataTransaction.data.pageDetail.totalDocs
        this.pagination.current = page
        this.pagination.pageSize = limit
        this.loading = false
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
