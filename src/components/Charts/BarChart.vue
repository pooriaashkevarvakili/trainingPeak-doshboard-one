<!-- =========================================================================================
    File Name:BarChart.vue
    Description: BarChart Component
    Component Name: BarChart
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
  <div dir="rtl">
    <div :id="chartID" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  MarkLineComponent,
} from 'echarts/components';
import {
  BarChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';


echarts.use(
  [TooltipComponent, GridComponent, MarkLineComponent, BarChart, CanvasRenderer]
);


const chartID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
const chartOptions = ref(null)
const chartInst = ref(null)
const props = defineProps({
  chartData: {
    required: true
  },

  chartSettings: { required: true },
  size: { required: false },
  showAverage: { required: false, type: Boolean }
})

function generateChartOptions() {
  const data = props.generateData()
  return {
    tooltip: {
      trigger: 'axis',
      contain: true,
      formatter: (a) => {
        console.log(a)
        switch (props.chartSettings.chartType) {
          case 24:
            const value = a[0].value
            const mins = ('' + Math.floor(value / 60));
            const secs = ('0' + (value - mins * 60)).slice(-2);
            return `<div style="font-size: 90%;">
                      <span style="font-size: 95%;font-weight: bold;">Zone ${a[0].axisValueLabel}</span>
                      </br>
                      <span style="font-size: 95%;font-weight: bold;">Time:</span> ${mins}:${secs}
                    </div>
                    `
          case 8:
            return `<div style="font-size: 90%;">
                      <span style="font-size: 95%;">${this.$utils.formatDate('d-d', [this.chartData[a[0].dataIndex].endDate, this.chartData[a[0].dataIndex].startDate])}</span>
                      </br>
                      <span style="font-size: 95%;font-weight: bold;">Planned Distance: </span>${this.$utils.formatDistance('km', this.chartData[a[0].dataIndex].distancePlanned)}<br/>
                      <span style="font-size: 95%;font-weight: bold;">Completed Distance: </span>${this.$utils.formatDistance('km', this.chartData[a[0].dataIndex].distance)}<br/>
                      <span style="font-size: 95%;font-weight: bold;">Planned Duration: </span>${this.$utils.formatTime('hh:mm:ss', this.chartData[a[0].dataIndex].totalTimePlanned * 3600)}<br/>
                      <span style="font-size: 95%;font-weight: bold;">Completed Duration: </span>${this.$utils.formatTime('hh:mm:ss', this.chartData[a[0].dataIndex].timeTotal * 3600)}<br/>
                    </div>
                    `
        }
      },
      extraCssText: 'text-align: left;'
    },
    title: {
      left: 'center',
      text: chartTitle(),
      subtext: props.chartSubtitle,
      textStyle: {
        fontSize: 14,
        fontFamily: ["farsi", 'latin']
      },
      subtextStyle: {
        fontSize: 12,
        fontFamily: ["farsi", 'latin']
      }
    },
    calculable: true,
    grid: chartGridSpacing(),
    xAxis: [
      {
        type: 'category',
        data: [...new Array(data.length)].map((v, index) => index + 5)
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: (value, index) => {
            switch (props.chartSettings.chartType) {
              case 24:
                return this.$utils.formatTime('mm:ss', value)
              case 8:
                return ''
            }
          }
        }
      }
    ],
    series: [
      {
        name: props.chartTitle,
        type: 'bar',
        data: data,
        markLine: generateMarkLine(),
        barCategoryGap: '20%'
      }
    ]
  }
}
function generateData() {
  switch (props.chartSettings.chartType) {
    case 24:
      return Object.entries(props.chartData).slice(2).map(entry => entry[1]).filter(d => d > 0)
    case 8:
      return props.chartData.map(d => d.timeTotal)
  }

}
function generateMarkLine() {
  return props.showAverage ? {
    data: [
      { type: 'average', name: 'Average' }
    ],
    symbol: 'none',
    lineStyle: {
      type: 'dashed',
      color: 'black'
    },
    label: {
      show: true,
      formatter: (d) => {
        return this.$utils.formatTime('hh:mm:ss', d.value * 3600)
      },
      position: 'insideEndTop'
    }
  } : {}
}
const chartTitle = computed(() => {
  if (this.chartSettings.title)
    return this.chartSettings.title

  switch (this.chartSettings.chartType) {
    case 24:
      return 'Time in Power Zones: Bike'
    case 8:
      return 'Longest Workout (Duration): All Workout Types'
  }
})
const chartSubtitle = computed(() => {
  return Object.entries(this.$t('pages.analysis.settings.dateOptions.dates'))[this.chartSettings.dateOptions.quickDateSelectOption][1]

})
const chartGridSpacing = computed(() => {
  const showLeft = {
    left: '17%',
    right: '10%',
    bottom: '7%',
    top: '17%'
  }
  const hideLeft = {
    left: '10%',
    right: '10%',
    bottom: '7%',
    top: '17%'
  }
  switch (props.chartSettings.chartType) {
    case 24:
      return showLeft
    case 8:
      return hideLeft
  }
})
onMounted(() => {
  chartOptions.value = generateChartOptions();

  let chartDom = document.getElementById(this.chartID)
  chartInst.value = echarts.init(chartDom)

  chartOptions.value && chartInst.value.setOption(chartOptions)
})
</script>
<style scoped></style>
