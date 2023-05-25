<!-- =========================================================================================
    File Name:PieChart.vue
    Description: PieChart Component
    Component Name: PieChart
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
import { onMounted } from 'vue'
import * as echarts from 'echarts/core'
import { LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use(
  [TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]
)
const chartID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
onMounted(() => {
  var chartDom = document.getElementById(this.chartID)
  var myChart = echarts.init(chartDom)
  var option

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      padding: 0
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        data: [
          {
            value: 1048,
            name: 'Bike'
          },
          {
            value: 735,
            name: 'Strength'
          },
          {
            value: 580,
            name: 'Brick'
          },
          {
            value: 484,
            name: 'Walk'
          },
          {
            value: 300,
            name: 'Rest'
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  option && myChart.setOption(option)
})
</script>

<style scoped></style>
