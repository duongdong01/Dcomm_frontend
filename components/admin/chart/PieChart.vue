<template>
  <div class="flex flex-col justify-center w-full py-10 items-center">
    <div>
      <PieChart ref="pieChart" :data="data" :options="options" />
    </div>
    <div class="flex justify-center font-semibold  text-[20px]  mt-4">
      Statistical chart of interactions in the application
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      data: {
        labels: ['Remote only', 'Hybrid', 'Office'],
        datasets: [
          {
            data: [143, 153, 12, 10],
            backgroundColor: [
              'rgb(46,176,250)',
              'rgb(240,163,196)',
              'rgb(255,99,71)',
              'rgb(124,252,0)'
            ],
            hoverOffset: 5
          }
        ]
      },
      isCall: false,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'How does your work look like now?'
          }
        }
      }
    }
  },
  async mounted () {
    await this.getPieChart()
  },
  methods: {
    async getPieChart () {
      try {
        this.isCall = false
        const pieData = await this.$api.admin.getPieChart()
        const labelData = []
        const setData = []
        pieData.data.pie.forEach((el) => {
          labelData.push(el.labels)
          setData.push(el.count)
        })
        this.data.labels = labelData
        this.data.datasets[0].data = setData
        this.$refs.pieChart.updateChart()
        this.isCall = true
      } catch (error) {
        // console.log(error)
      }
    }
  }
}
</script>
<style lang="scss">
#pie-chart{
  @apply max-w-[660px]  max-h-[660px] w-[500px] h-[500px]
}
</style>
