/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import { Bar, Line, Pie } from 'vue-chartjs'

Vue.component('BarChart', {
  extends: Bar,
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      })
    }
  },
  watch: {
    data () {
      this.renderChart(this.data, this.options)
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
Vue.component('PieChart', {
  extends: Pie,
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      })
    }
  },
  watch: {
    data () {
      this.renderChart(this.data, this.options)
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  },
  methods: {
    updateChart () {
      const chart = this.$data._chart
      chart.update()
      // this.renderChart(this.data, this.options)
      console.log(chart)
    }
  }
})

Vue.component('LineChart', {
  extends: Line,
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      })
    }
  },
  watch: {
    data () {
      this.renderChart(this.data, this.options)
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
