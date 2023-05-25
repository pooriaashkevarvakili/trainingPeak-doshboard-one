<template>
  <div>
    <row style="overflow: visible;">
      <Col :md="1/2" :sm="1" class="text-center">
        <q-card flat bordered class="q-py-md">
          <span>{{ name }} By Zones</span>
          <div style="margin-left: auto; margin-right: auto;" :id="name+'-by-zone'" :style="{width: '375px', height: '250px'}"/>
        </q-card>
      </Col>
      <Col :md="1/2" :sm="1" class="text-center">
        <q-card flat bordered class="q-py-md">
          <span>Peak {{ name }}</span>
          <div style="margin-left: auto; margin-right: auto;" :id="name+'-peak'" :style="{width: '375px', height: '250px'}"/>
        </q-card>
      </Col>
    </row>
  </div>
</template>

<script>
import { Col, Row } from 'vue-colrow'
import * as echarts from 'echarts/core';
import {
  GridComponent, TooltipComponent
} from 'echarts/components';
import {
  BarChart, LineChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';
echarts.use(
    [GridComponent, BarChart, LineChart, TooltipComponent, CanvasRenderer]
)

export default {
  name: 'CalendarReportData',
  props: {
    name: {
      required: true,
      type: String
    },
    timeInZone: {
      required: false
    },
    meanMax: {
      required: false
    }
  },
  components: {
    Col: Col,
    Row: Row
  },
  data() {
    return {
    }
  },
  computed: {
    chartStyles() {
      const styles = [
        { name: 'Heart Rate', color: {area: 'rgba(245,34,15, 0.8)', line: 'rgb(208,31,0)'} },
        { name: 'Power', color: {area: 'rgba(232,208,24,0.8)', line: 'rgb(184,142,0)'} },
        { name: 'Speed', color: {area: 'rgba(101,44,255,0.8)', line: 'rgba(63,0,238,0.8)'} },
      ]

      return styles.find(item=>item.name===this.name)
    }
  },
  mounted () {
    let byZone = echarts.init(document.getElementById(this.name+'-by-zone'))
    let peak = echarts.init(document.getElementById(this.name+'-peak'))

    let zoneChartNumbers = this.timeInZone.timeInZones.map(zone=>zone.seconds/60)
    let zoneChartLabels = this.timeInZone.timeInZones.map(zone=>{ return { value: zone.label, textStyle:{color: 'rgba(0,0,0,0)'} } })

    function comparator(f, s) {
      const numFind = /([0-9]+)/g
      const fNumber = parseInt(f.label.match(numFind)[0])
      const sNumber = parseInt(s.label.match(numFind)[0])
      if(fNumber===sNumber)
        return 0
      return fNumber>sNumber ? 1:-1
    }
    const peaksChartData = [
      ...this.meanMax.meanMaxes.filter(item=>item.label.includes('Second') && item.value!==null).sort(comparator),
      ...this.meanMax.meanMaxes.filter(item=>item.label.includes('Minute') && item.value!==null).sort(comparator),
      ...this.meanMax.meanMaxes.filter(item=>item.label.includes('Hour') && item.value!==null).sort(comparator)
    ]
    const peaksChartNumbers = peaksChartData.map(item=>+parseFloat(item.value).toFixed(1))
    const peaksChartLabels = peaksChartData.map(item=>`${item.label.match(/([0-9]+)/g)[0]} ${item.label.split(item.label.match(/([0-9]+)/g)[0])[1].replace('o','').replace('u','').slice(0,3)}`)

    let zoneOption = {
      xAxis: {
        type: 'category',
        name: 'Zones',
        nameLocation: 'middle',
        data: zoneChartLabels
      },
      yAxis: {
        type: 'value',
        name: 'Minutes',
        nameLocation: 'middle',
        nameGap: 33,
        interval: Math.ceil((Math.max(...zoneChartNumbers) - Math.min(...zoneChartNumbers))/4)
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false
        }
      },
      grid: {
        left: '13%',
        right: '13%',
        top: 30,
        bottom: 30,
        tooltip: {
          show: true
        }
      },
      series: [{
        data: zoneChartNumbers,
        type: 'bar',
        barWidth: '85%',
        itemStyle: {
          borderRadius: [3, 3, 0, 0],
          color: this.chartStyles.color.area
        },
        animationDuration: 500
      }]
    }
    let peakOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: peaksChartLabels,
        interval: peaksChartLabels.length/3
      },
      yAxis: {
        type: 'value',
        name: 'Minutes',
        nameLocation: 'middle',
        nameGap: 33,
        min: Math.max(Math.min(...peaksChartNumbers)-15, 0),
        interval: Math.ceil((Math.max(...peaksChartNumbers) - Math.min(...peaksChartNumbers)+15)/3)
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: '13%',
        right: '13%',
        top: 30,
        bottom: 30,
        tooltip: {
          show: true
        }
      },
      series: [{
        data: peaksChartNumbers,
        type: 'line',
        itemStyle: {
          color: this.chartStyles.color.line
        },
        areaStyle: {
          color: this.chartStyles.color.area
        },
        symbolSize: 1,
        animationDuration: 500,
        smooth: true
      }]
    }

    zoneOption && byZone.setOption(zoneOption)
    peakOption && peak.setOption(peakOption)

  }
}
</script>

<style scoped lang="scss">
.q-card {
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
}
.q-card:hover {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) !important;
}
</style>
