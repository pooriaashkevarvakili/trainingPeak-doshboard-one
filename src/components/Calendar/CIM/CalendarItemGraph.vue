<template>
  <div>
    <q-card bordered flat class="row q-py-md">
      <div :style="{ width: detailed ? '90%' : '96%' }" style="margin: 0 auto;">
        <!--        <workout-block :workoutPlan="plannedData" :detailed="false" style="position: absolute; z-index: 1; pointer-events: none; opacity: 0.2" :style="{width: 'calc('+graphSize.width+' - 3%)', left: '1.5%', 'margin-left': '3px', height: 'calc('+graphSize.height+' - 7%)' }"/>-->
        <div @click="chartPinData(chartHoverData.list)" @mouseout="clearDataMonitor" id="CIMGRAPH"
          :style="{ width: graphSize.width, height: graphSize.height }" />
      </div>
      <div v-if="detailed" style="width: 10%; border-left: 1px solid rgba(0,0,0,0.2)" class="text-center q-py-lg">
        <div class="full-height column justify-evenly">
          <span v-if="chartHoverData.list.length === 0" style="font-size: 90%;">Hover on Chart<br />to View the Data</span>
          <span v-if="chartHoverData.pinned.state" style="font-size: 90%;">Difference</span>
          <div class="column" v-for="(data, index) in chartHoverData.list" :key="index">
            <span style="font-size: 90%;" :style="{ color: data.color }">{{ data.seriesName || '' }}</span>
            <span style="font-weight: 700;" v-if="!chartHoverData.pinned.state">{{ data.value[1] || '' }}</span>
            <span style="font-weight: 700;" v-else>{{ (data.value[1] - chartHoverData.pinned.list[index].value[1])
            }}</span>
          </div>
          <q-btn v-if="chartHoverData.pinned.state" style="width: revert" flat @click="updateDataMonitor(null, false)"
            label="Unpin" size="sm" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="js">
import * as echarts from 'echarts/core'
import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent
} from 'echarts/components'
import { BarChart, CustomChart, LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import WorkoutBlocks from '../../WorkoutBlocks.vue'

echarts.use(
  [GridComponent, LineChart, BarChart, CustomChart, CanvasRenderer, TooltipComponent, ToolboxComponent, LegendComponent]
)

export default {
  name: 'CalendarItemGraph',
  components: {
    'workout-block': WorkoutBlocks
  },
  props: {
    data: {
      required: true
    },
    detailed: {
      type: Boolean,
      default: false
    },
    width: {
      required: false,
      type: String
    },
    height: {
      required: false,
      type: String
    },
    appendOpt: {
      required: false
    },
    plannedData: {
      required: false
    }
  },
  data() {
    return {
      chart: null,
      chartHoverData: {
        list: [],
        pinned: {
          state: false,
          list: []
        }
      },
      options: {
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: (params) => {
            this.updateDataMonitor(params)
          },
          axisPointer: {
            animation: false
          },
          textStyle: {
            fontSize: 12
          },
          confine: true
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        xAxis: [{
          type: 'category',
          show: true,
          data: [],
          axisLabel: {
            show: true,
            interval: 1000
          }
        },
        {
          scale: true,
          show: false
        }],
        yAxis: {
          type: 'value',
          show: true,
          min: 0,
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: []
      },
      displayBreakPoints: {
        xs: 750,
        sm: 850,
        md: 1200,
        tooLarge: 1450
      },
      workoutStart: null,
      originalDataSize: null
    }
  },
  computed: {
    graphSize() {
      let size = {
        width: '',
        height: ''
      }

      if (this.$q.screen.width >= this.displayBreakPoints.tooLarge) {
        size = {
          width: 'calc(50vw - 32px)',
          height: '230px'
        }
      }
      if (this.$q.screen.width >= this.displayBreakPoints.md) {
        size = {
          width: 'calc(60vw - 32px)',
          height: '230px'
        }
      }
      if (this.$q.screen.width >= this.displayBreakPoints.sm) {
        size = {
          width: 'calc(70vw - 32px)',
          height: '230px'
        }
      }
      if (this.$q.screen.width >= this.displayBreakPoints.xs) {
        size = {
          width: `${this.$q.screen.width}`,
          height: '230px'
        }
      }

      if (this.width) {
        size.width = this.width
      }
      if (this.height) {
        size.height = this.height
      }

      return size
    }
  },
  methods: {
    populateChart(type) {
      switch (type) {
        case 'labels':
          return this.data.timeStamp.record.map((record) => {
            const diff = record - this.workoutStart
            return `${Math.floor(diff / 3600000)}:${Math.floor(diff / 60000)}:${Math.floor(diff / 1000)}`
          })
        case 'rpm':
          return this.data.speed.record.map((record, index) => {
            return [index, Math.ceil(record)]
          })
        case 'bpm':
          return this.data.heartRate.record.map((record, index) => {
            return [index, Math.ceil(record)]
          })
        case 'm':
          return this.data.elavation.record.map((record, index) => {
            return [index, Math.ceil(record)]
          })
        case 'w':
          return this.data.power.record.map((record, index) => {
            return [index, Math.ceil(record)]
          })
        case 'min/km':
          return this.data.cadence.record.map((record, index) => {
            return [index, Math.ceil(record)]
          })
      }
      return -1
    },
    parseColor(color) {
      let cache
      const p = parseInt // Use p as a byte saving reference to parseInt
      color = color.replace(/\s/g, '') // Remove all spaces

      // Checks for 6 digit hex and converts string to integer
      cache = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color)
      if (cache) {
        cache = [p(cache[1], 16), p(cache[2], 16), p(cache[3], 16)]
        // eslint-disable-next-line brace-style
      }

      // Checks for 3 digit hex and converts string to integer
      else if (cache) {
        cache = cache = /#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color)
        cache = [p(cache[1], 16) * 17, p(cache[2], 16) * 17, p(cache[3], 16) * 17]
        // eslint-disable-next-line brace-style
      }

      // Checks for rgba and converts string to
      // integer/float using unary + operator to save bytes
      else if (/rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(color)) {
        cache = /rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(color)
        cache = [+cache[1], +cache[2], +cache[3], +cache[4]]
        // eslint-disable-next-line brace-style
      }

      // Checks for rgb and converts string to
      // integer/float using unary + operator to save bytes
      else if (/rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color)) {
        cache = /rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color)
        cache = [+cache[1], +cache[2], +cache[3]]
        // eslint-disable-next-line brace-style
      }

      // Otherwise throw an exception to make debugging easier
      else {
        // eslint-disable-next-line no-throw-literal
        throw color + ' is not supported by $.parseColor'
      }

      // Performs RGBA conversion by default
      isNaN(cache[3]) && (cache[3] = 1)

      // Adds or removes 4th value based on rgba support
      // Support is flipped twice to prevent erros if
      // it's not defined
      return cache.slice(0, 3)
    },
    resizeGraph(width) {
      this.chart.resize({ width: 'auto' | width })
    },
    updateDataMonitor(data, state = true) {
      if (!state) {
        this.chartHoverData.pinned.state = false
        this.chartHoverData.list = []
        return
      }
      this.chartHoverData.list = data
    },
    chartPinData(data) {
      this.chartHoverData.pinned.state = true
      this.chartHoverData.pinned.list = data
    },
    clearDataMonitor() {
      if (!this.chartHoverData.pinned.state)
        this.chartHoverData.list = []
      else
        this.chartHoverData.list = this.chartHoverData.pinned.list
    }
  },
  watch: {
    'width'(n) {
      this.resizeGraph(parseInt(n.slice(0, n.length - 2)))
    }
  },
  mounted() {
    this.workoutStart = this.data.timeStamp.record[0]

    this.chart = echarts.init(document.getElementById('CIMGRAPH'))

    this.options.series = [
      {
        name: 'RPM',
        data: this.populateChart('rpm'),
        xAxisIndex: 0,
        type: 'line',
        sampling: 'average',
        stack: 'a',
        lineStyle: {
          width: 1
        }
      },
      {
        name: 'BPM',
        data: this.populateChart('bpm'),
        type: 'line',
        sampling: 'average',
        stack: 'a',
        lineStyle: {
          width: 1
        }
      },
      {
        name: 'Meters',
        data: this.populateChart('m'),
        type: 'line',
        sampling: 'average',
        lineStyle: {
          width: 1,
          color: '#808080'
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(202,202,202)'
          }, {
            offset: 1,
            color: 'rgb(121,121,121)'
          }])
        }
      },
      {
        name: 'Watt',
        data: this.populateChart('w'),
        type: 'line',
        sampling: 'average',
        stack: 'b',
        lineStyle: {
          width: 1
        }
      },
      {
        name: 'Min/kM',
        data: this.populateChart('min/km'),
        type: 'line',
        sampling: 'average',
        stack: 'b',
        lineStyle: {
          width: 1
        }
      }
    ]

    this.originalDataSize = this.options.series[0].data.length
    this.options.xAxis[0].data = this.populateChart('labels')

    this.options && this.chart.setOption({ ...this.options, ...this.appendOpt })

    this.chart.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: true,
    });

    this.chart.on('datazoom', (params) => {
      console.log('zoomed', params)
    })
    console.log(this.plannedData)
  }
}
</script>

<style>
canvas {
  z-index: 0;
}</style>
