<template>
  <q-splitter v-model="analysis.mainSplitter" :style="{ height: (($q.screen.height * 0.9) - splitterHeight) + 'px' }">

    <template v-slot:before>
      <div class="q-pl-md q-pr-sm q-pb-md container">
        <q-card v-for="(chart, index) in selectedCharts" :key="index"
          :class="[EChartTypes.PIE, EChartTypes.BAR, EChartTypes.AREA, EChartTypes.LINE].includes(chart.type) ? 'panel' : 'wide-panel'"
          class="panel" draggable="true">
          <div>{{ chart.title }}</div>
          <CalendarItemMap v-if="chart.type === EChartTypes.MAP" :center="[-1.3924492, 19.90696504]"
            :path="workoutRecordedData.path.coordinates" :zoom="15" class="undraggable" style="height: 100%;" />
          <CalendarItemGraph v-if="chart.type === EChartTypes.MIXED" :appendOpt="analysis.chartOptions"
            :data="workoutRecordedData" :detailed="true" :planned-data="barChart"
            :width="($q.screen.width * 0.95 * analysis.mainSplitter / 100 * 0.9 - 24) + 'px'" class="undraggable"
            height="30vh" />
          <bar-chart v-if="chart.type === EChartTypes.BAR" />
          <q-btn class="undraggable absolute-top-right q-ma-xs" dense flat round size="sm" style="z-index: 120979172"
            @click="$store.dispatch('charts/removeSelectedItemAnalysisChart', chart)">
            <img src="/fluent-icons/close.svg" />
          </q-btn>
        </q-card>
      </div>
    </template>

    <template v-slot:separator>
      <q-avatar color="primary" icon="icon-ic_fluent_re_order_dots_vertical_20_regular" size="30px" text-color="white" />
    </template>

    <template v-slot:after>
      <q-splitter v-model="analysis.sideSplitter" horizontal>

        <template v-slot:before>
          <div class="q-pa-md">
            <Row>
              <Col :lg="10 / 20" :md="1" :sm="1" :xl="10 / 20" :xs="1">
              <q-table
                :columns="workoutReport.plans.columns.filter(item => item.name !== 'planned' && item.name !== 'metric')"
                :data="workoutReport.plans.data.slice(0, 6)" :rows-per-page-options="[0]" class="q-mb-md" dense flat
                hide-bottom hide-header row-key="name" separator="vertical">
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="desc" :props="props" style="padding-left: 0; font-size: 80%;">
                      {{ props.row.name }}
                    </q-td>
                    <q-td v-for="(col, index) in workoutReport.plans.columns.slice(1)" :key="col.name" :props="props"
                      style=" font-size: 80%;">
                      {{ props.row[col.name] }} {{ }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
              </Col>

              <Col :lg="10 / 20" :md="1" :sm="1" :xl="10 / 20" :xs="1">
              <q-table
                :columns="workoutReport.plans.columns.filter(item => item.name !== 'planned' && item.name !== 'metric')"
                :data="workoutReport.plans.data.slice(6)" :rows-per-page-options="[0]" class="q-mb-md" dense flat
                hide-bottom hide-header row-key="name" separator="vertical">
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="desc" :props="props" style="padding-left: 0; font-size: 80%;">
                      {{ props.row.name }}
                    </q-td>
                    <q-td v-for="(col, index) in workoutReport.plans.columns.slice(1)" :key="col.name" :props="props"
                      style=" font-size: 80%;">
                      {{ props.row[col.name] }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
              </Col>

            </Row>
          </div>
        </template>

        <template v-slot:after>
          <div class="q-pa-md">
          </div>
        </template>

      </q-splitter>
    </template>

  </q-splitter>
</template>
<script setup>
import { useCounterStore } from "../../../stores/example-store"
import { computed, onMounted } from 'vue'
import { Col, Row } from 'vue-colrow'
import 'vue-colrow/dist/vue-colrow.css'
import CalendarItemMap from 'components/Calendar/CIM/CalendarItemMap.vue'
import CalendarItemGraph from 'components/Calendar/CIM/CalendarItemGraph.vue'
import BarChart from '../../Charts/BarChart.vue'

// import { Sortable } from 'vue-shopify-draggable'
const store = useCounterStore()
const analysis = {
  mainSplitter: 75,
  sideSplitter: 50,
  chartOptions: {
    legend: {
      show: true,
      padding: [
        13, // up
        0, // right
        0, // down
        0 // left
      ]
    },
    grid: {
      left: '2%',
      right: '2%',
      top: '2%',
      bottom: '7%'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        saveAsImage: {}
      },
      padding: [
        10, // up
        60, // right
        0, // down
        0 // left
      ]
    }
  }
}
function isDragPrevented(element, classesToPrevent) {
  let currentElem = element
  let isParent = false

  while (currentElem) {
    const hasClass = Array.from(currentElem.classList).some((cls) => classesToPrevent.includes(cls))
    if (hasClass) {
      isParent = true
      currentElem = undefined
    } else {
      currentElem = currentElem.parentElement
    }
  }

  return isParent
}
const EChartTypes = computed(() => store.getChartTypes())
const selectedCharts = computed(() => store.getItemAnalysisSelectedCharts())
const splitterHeight = computed(() => {
  // 40 is the height of the top bar
  return document.getElementById('cim-header').offsetHeight + 40
})
// onMounted(() => {
//   const sortable = new Sortable(document.querySelectorAll('.container'), {
//     draggable: '.panel'
//   })
//   sortable.on('sortable:stop', (e) => {
//     console.log('old', e.oldIndex, 'new', e.newIndex)
//     // this.$store.dispatch('charts/changeChartIndex', { newIndex: e.newIndex, oldIndex: e.oldIndex })
//   })
//   sortable.on('drag:start', (event) => {
//     const currentTarget = event.originalEvent.target

//     if (this.isDragPrevented(currentTarget, ['undraggable'])) {
//       event.cancel()
//     }
//   })
// })
</script>


<style lang="scss" scoped>
.q-card {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.10) !important;
  border-radius: 5px;
  // q.card transition was colliding with the draggable internal css, so it's temporarily disabled.
  //transition: all 0.2s ease-in-out;
}

.q-card:hover {
  filter: drop-shadow(0 0 3px #c9c9c9);
}

.container {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
  grid-auto-rows: minmax(35vh, auto);
}

.panel {
  display: flex;
  flex-flow: column;
  margin: 8px;
  text-align: center;
  padding: 32px 16px;

  div:nth-of-type(1) {
    font-size: 90%;
  }

  div:nth-of-type(2) {
    align-self: center;
    width: 400px;
    flex: 1 1 auto;
    border-radius: 0;
  }
}

.wide-panel {
  grid-column-end: span 3;
  padding: 32px 0 0 0;

  div:nth-of-type(1) {
    position: absolute;
    top: 7px;
    left: 50%;
    transform: translateX(-50%);
  }

  div:nth-of-type(2) {
    align-self: center;
    width: 100%;
  }
}
</style>
