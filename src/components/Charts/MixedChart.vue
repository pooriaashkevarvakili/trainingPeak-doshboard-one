<!-- =========================================================================================
    File Name:mixedChart.vue
    Description: mixedChart Component
    Component Name: mixedChart
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
  <div dir="rtl">
    <div :id="chartID" />
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { LineChart, ScatterChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use(
  [GridComponent, ScatterChart, LineChart, CanvasRenderer, TooltipComponent]
)

export default {
  name: 'MixedChart',

  setup() {
    const props = defineProps({
      chartData: {
        required: true
      },
      chartSettings: { required: true },
      size: { required: false }
    })
    const chartID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const chartInst = ref(null)
    const threshold = undefined
    const chartOptions = ref(null)
    function generateData(type, color, yAxisIndex, name, label, filled) {
      let base = new Date(props.chartData[0]['workoutDay'])
      const data = [[[base.getFullYear(), base.getMonth() + 1, base.getDate()].join('-'), +this.chartData[0][name].toFixed(2)]]

      for (let i = 1; i < this.threshold; i++) {
        let now = new Date(this.chartData[i]['workoutDay'])
        data.push([
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
          +this.chartData[i][name].toFixed(2)
        ])
      }

      let extrapolate = []
      extrapolate.push(data[data.length - 1])

      for (let i = threshold.value; i < chartData.value.length; i++) {
        let now = new Date(chartData[i].value['workoutDay'])
        extrapolate.push([
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
          +this.chartData[i][name].toFixed(2)
        ])

      }
      // console.log(data)
      if (type === 'line') {
        return [
          {
            name: label,
            data: data,
            symbolSize: 0,
            type: type,
            animation: false,
            yAxisIndex: yAxisIndex,
            areaStyle: filled ? {
              opacity: 0.3,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color
              }, {
                offset: 1,
                color: 'white'
              }])
            } : null,
            emphasis: {
              scale: false,
              lineStyle: {
                width: 1
              }
            },
            lineStyle: {
              width: this.size === 'full' ? 2 : 1,
              color: color
            }
          },
          {
            name: label,
            data: extrapolate,
            symbolSize: 0,
            animation: false,
            type: type,
            yAxisIndex: yAxisIndex,
            emphasis: {
              scale: false,
              lineStyle: {
                width: 1
              }
            },
            lineStyle: {
              width: this.size === 'full' ? 2 : 1,
              color: color,
              type: 'dashed'
            }
          }
        ]
      }
      if (type === 'scatter') {
        return [
          {
            name: label,
            data: data,
            symbolSize: this.size === 'full' ? 4 : 3,
            type: type,
            yAxisIndex: yAxisIndex,
            itemStyle: {
              color: color
            }
          },
          {
            name: label,
            data: extrapolate,
            symbolSize: this.size === 'full' ? 3 : 2,
            yAxisIndex: yAxisIndex,
            type: type,
            itemStyle: {
              color: color
            }
          }
        ]
      }
    }
    function generateChartOptions() {
      const series = [
        generateData('line', 'orange', 0, 'tsb', 'Form', this.chartSettings.showTSBFill),
        generateData('line', '#4860d7', 1, 'ctl', 'Fitness', true),
        generateData('line', '#e30e60', 1, 'atl', 'Fatigue'),
      ]

      if (chartSettings.value.showIntensityFactorPerDay)
        series.push(...this.generateData('scatter', '#27829c', 0, 'ifActual', 'Intensity Factor'))
      if (this.chartSettings.showTSSPerDay)
        series.push(generateData.value('scatter', 'red', 2, 'tssActual', 'TSS'))

      return {
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          extraCssText: 'text-align: left; min-width: 150px;',
          formatter: (a) => {
            let innerData = '';
            a.forEach(s => {
              innerData += `<span style="font-size: 95%;">${s.seriesName}:</span> ${s.value[1]}<br/>`
            })

            return `<div style="font-size: 90%;">${a[0].value[0]}<br/>
                        ${innerData}
                  </div>`
          },
        },
        xAxis: {
          type: 'time'
        },
        yAxis: [
          {
            type: 'value',
            name: 'Form',
            position: 'right',
            offset: 0,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#b3a900'
              }
            },
          },
          {
            type: 'value',
            position: 'left',
            offset: 0,
            axisLine: {
              show: true
            },
          },
          {
            type: 'value',
            name: 'TSS/d',
            position: 'left',
            offset: 40,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#c10000'
              }
            },
          }],
        grid: {
          show: false,
          right: '7%',
          left: this.size === 'full' ? '9%' : '11%',
          top: '12%',
          bottom: '10%'
        },
        series
      }

    }
    watch(() => {
      chartSettings = () => {
        deep: true,
          handler = () => {
            chartOptions.value = generateChartOptions();
            chartInst.value.setOption(this.chartOptions, { notMerge: true, lazyUpdate: true })
          }
      }
    })
    return { generateChartOptions, chartOptions, props, generateData, chartID, chartInst, threshold }
  },


  mounted() {

    let today = new Date()
    today = this.$utils.formatDateUnix('-', today)
    this.threshold = this.chartData.findIndex(d => this.$utils.formatDate('d', d['workoutDay']) > today)
    this.threshold = this.threshold === -1 ? this.chartData.length : this.threshold



    this.chartOptions = this.generateChartOptions();

    var chartDom = document.getElementById(this.chartID)
    this.chartInst = echarts.init(chartDom)

    this.chartOptions && this.chartInst.setOption(this.chartOptions)
  }
}
</script>

<style scoped></style>
