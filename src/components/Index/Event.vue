<template>
  <div>
    <div class="q-py-md q-px-sm" style="width: 100%">
      <div id="index-event" style="width: 100%; height: 150px;" />
      <p class="float-right q-mr-sm" style="font-size: 90%">Jan 28</p>
    </div>
  </div>
</template>

<script lang="js">
import { ref, onMounted } from "vue"
import * as echarts from 'echarts/core';
import {
  GridComponent, TooltipComponent
} from 'echarts/components';
import {
  LineChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';
echarts.use(
  [GridComponent, LineChart, TooltipComponent, CanvasRenderer]
)

export default {
  name: 'Event',
  setup() {
    const chartLength = ref(40)
    function populateChart(type) {
      const len = 20
      switch (type) {
        case 'past':
          return [...new Array(len)].map((c, i) => Math.floor(Math.random() * 5) + i)
        case 'now':
          return [].concat(...new Array(len - 1).fill(null), [23])
        case 'planned':
          return [].concat([...new Array(len - 1)].fill(null), [...new Array(len)].map((c, i) => Math.floor(Math.random() * 6) + 21 + i))
        case 'goal':
          return [].concat([...new Array(2 * (len - 1))].fill(null), [42])
      }
      return -1


    }

    return {
      chartLength, populateChart
    }
  },

  mounted() {
    let eventChart = echarts.init(document.getElementById('index-event'))
    let options = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        show: false
      },
      yAxis: {
        type: 'value',
        show: false
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: '2%',
        right: '2%',
        top: 0,
        bottom: 0,
        tooltip: {
          show: true
        }
      },
      series: [{
        data: this.populateChart('past'),
        type: 'line',
        itemStyle: {
          color: '#FADEE8'
        },
        symbolSize: 1,
        animationDuration: 0,
        smooth: true
      },
      {
        data: this.populateChart('now'),
        type: 'line',
        itemStyle: {
          color: '#FF6600'
        },
        symbolSize: 8,
        animationDuration: 0,
        smooth: true
      },
      {
        data: this.populateChart('planned'),
        type: 'line',
        itemStyle: {
          color: '#FF9F5F'
        },
        lineStyle: {
          type: 'dashed'
        },
        symbolSize: 1,
        animationDuration: 0,
        smooth: true
      },
      {
        data: this.populateChart('goal'),
        type: 'line',
        itemStyle: {
          color: '#FF6600'
        },
        symbol: 'circle',
        symbolSize: 8,
        animationDuration: 0,
        smooth: true
      }]
    }

    options && eventChart.setOption(options)
  }
}
</script>

<style scoped></style>
