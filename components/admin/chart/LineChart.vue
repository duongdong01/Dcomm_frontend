<template>
  <div class="p-2 w-full  h-full py-9 flex flex-col">
    <client-only>
      <LineChart :data="data" :options="options" class="max-h-[500px]" />
    </client-only>
    <div class="flex justify-center py-4 text-[20px] font-semibold">
      Statistical chart of the number of tokens in 12 months
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {

        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Token',
          data: [65, 59, 80, 81, 56, 55, 40, 10, 22, 33],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    }
  },
  async mounted () {
    await this.getLineChart()
  },
  methods: {
    async getLineChart () {
      try {
        const result = await this.$api.admin.getLineChart()
        // console.log(lineData)
        const setData = result.data.lineData.map(el => el.sum)
        this.data.datasets[0].data = setData
      } catch (error) {

      }
    }
  }
}
</script>
<style>
#line-chart{
    @apply max-w-[1000px] max-h-[660px] h-[660px]
}
</style>
