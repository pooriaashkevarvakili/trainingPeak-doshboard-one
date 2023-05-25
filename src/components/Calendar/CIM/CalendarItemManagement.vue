<template>
  <q-card :class="'STATE-' + CIMState.active" class="CIM-Card bg-white" flat style="overflow: visible;">
    <v-top-bar :selected-date="meta.startTime" />

    <div v-if="type === CalendarItemTypes.WORKOUT">
      <q-card-section id="cim-header" class="q-py-xs bg-white">
        <v-header :meta="{
          ...meta,
          duration: workoutReport.plans.data.find(plan => plan.name === 'Duration').completed,
          distance: workoutReport.plans.data.find(plan => plan.name === 'Distance').completed,
          tss: workoutReport.plans.data.find(plan => plan.name === 'TSS').completed,
          type: data.type
        }" :state="CIMState.active"
          @analysis="CIMState.active = ($event ? CIMState.states.ANALYSIS : CIMState.states.SUMMARY)"
          @add-block="addWorkoutBlock($event)" />
      </q-card-section>

      <q-card-section v-if="CIMState.active !== CIMState.states.ANALYSIS" class="bg-white q-pt-none q-pb-xs">
        <q-item v-if="CIMState.active !== CIMState.states.ANALYSIS"
          :clickable="CIMState.active !== CIMState.states.WORKOUTBUILD" class="full-width"
          @click="CIMState.active = CIMState.states.WORKOUTBUILD">
          <v-workout-blocks :detailed="CIMState.active === CIMState.states.WORKOUTBUILD"
            :style="{ 'height': `${CIMState.active === CIMState.states.WORKOUTBUILD ? 110 : 65}px`, 'min-width': '100%', 'max-width': '100%' }"
            :workoutPlan="data.workoutPlan" />
        </q-item>
      </q-card-section>

      <div v-if="CIMState.active !== CIMState.states.ANALYSIS" class="row">
        <div class="q-ml-md" style="position: absolute; left: -56px; z-index: 12491283981723">
          <v-nav-tabs :selected="workoutReport.type" @tab-selected="workoutReport.type = $event" />
        </div>

        <div class="col q-px-md tab-item">
          <q-tab-panels v-model="workoutReport.type" :swipeable="$q.platform.has.touch" animated class="bg-transparent"
            infinite style="min-height: 350px;">
            <q-tab-panel class="row q-pa-none" name="summary">
              <v-report-summary :workout-meta="meta" :workout-report="workoutReport" />
            </q-tab-panel>

            <q-tab-panel class="no-padding" name="graph" style="overflow: hidden;">
              <v-report-map-graph :graph-data="workoutRecordedData" :map-path="workoutRecordedData.path" />
            </q-tab-panel>

            <q-tab-panel name="heartrate">
              <v-report-data name="Heart Rate" :timeInZone="workoutRecordedData.zoneData.timeInHeartRateZones"
                :meanMax="workoutRecordedData.zoneData.meanMaxHeartRates" />
            </q-tab-panel>

            <q-tab-panel name="power">
              <v-report-data name="Power" :timeInZone="workoutRecordedData.zoneData.timeInPowerZones"
                :meanMax="workoutRecordedData.zoneData.meanMaxPowers" />
            </q-tab-panel>

            <q-tab-panel name="speed">
              <v-report-data name="Speed" :timeInZone="workoutRecordedData.zoneData.timeInSpeedZones"
                :meanMax="workoutRecordedData.zoneData.meanMaxSpeeds" />
            </q-tab-panel>
          </q-tab-panels>
        </div>

        <div v-if="CIMState.active === CIMState.states.WORKOUTBUILD" class="column q-px-md tab-item" style="width: 40%">
          <v-workout-builder :workoutPlan="data.workoutPlan" style="max-height: 500px" />
        </div>
      </div>

      <v-item-analysis v-if="CIMState.active === CIMState.states.ANALYSIS" :barChart="data.workoutPlan"
        :workoutRecordedData="workoutRecordedData" :workoutReport="workoutReport" />
    </div>
    <div v-if="type === CalendarItemTypes.NOTE" class="q-pa-md">
      <q-card-section class="no-padding q-mb-md">
        <v-header :meta="{ ...meta }" :state="type" class="q-pl-xs" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-if="newData.title" v-model="newData.title" borderless input-style="font-size: 32px;" />
        <q-input v-if="newData.description" v-model="newData.description" autofocus autogrow borderless />
        <span style="font-size: 95%; filter: opacity(0.7)">Edited 10 Feb</span>
      </q-card-section>

    </div>
    <div v-if="type === CalendarItemTypes.METRICS" class="q-pa-md">
      <q-card-section class="no-padding q-mb-md">
        <v-header :meta="{ ...meta }" :state="type" />
      </q-card-section>
      <div class="q-mb-sm"
        style="display: grid;grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); grid-gap: 8px;">
        <q-card v-for="(metric, index) in newData.measurements.filter(item => item.name !== 'Note')" v-bind:key="index"
          bordered class="metric-card" flat>
          <q-card-section class="row full-height" style="margin-top: auto; margin-bottom: auto;">
            <span class="q-mr-xs">{{ metric.name }}:</span>
            <!--            <div class="metric-value row">-->
            <q-input v-model="metric.value" class="q-input-dense q-mx-xs" dense input-class="text-center" outlined
              style="max-width: 55%;" />
            <span>{{ metric.unit }}</span>
            <!--            </div>-->
            <q-btn class="matric-remove" dense flat icon="close" round size="sm"
              @click="newData.measurements.splice(index, 1)" />
          </q-card-section>
        </q-card>
        <q-card bordered class="metric-card" flat>
          <q-card-section class="no-padding full-height">
            <q-btn-dropdown class="full-width full-height" color='black' dropdown-icon="icon-ic_fluent_add_20_regular"
              flat label="Add a Measurement" size="sm">
              <q-list dense style="min-width: 100px">
                <div v-for="(m, index) in measurements" v-bind:key="index">
                  <q-item v-if="newData.measurements.findIndex(item => item.name === m.name) === -1" v-close-popup
                    clickable dense @click="addMeasurement(index)">
                    <q-item-section>{{ m.name }}</q-item-section>
                  </q-item>
                </div>
              </q-list>
            </q-btn-dropdown>
          </q-card-section>
        </q-card>
      </div>

      <q-card bordered class="metric-card" flat>
        <q-card-section style="margin-top: auto; margin-bottom: auto;">
          <span> Note </span>
          <q-input v-model="newData.measurements.find(item => item.name === 'Note').value" autogrow bg-color="grey-3"
            class="q-mt-xs" dense input-class="q-pa-sm" outlined />
        </q-card-section>
      </q-card>
    </div>
    <div v-if="type === CalendarItemTypes.GOALS" class="q-pa-md">
      <q-card-section class="no-padding q-mb-md row">
        <v-header :meta="{ ...meta }" :state="type" />
      </q-card-section>
      <q-card-section class="q-pa-sm">
        <q-input v-if="newData.description" v-model="newData.description" borderless input-style="font-size: 32px;" />
      </q-card-section>
    </div>
    <div v-if="type === CalendarItemTypes.EVENT" class="q-pa-md">
      <q-card-section class="no-padding q-mb-md row">
        <v-header :meta="{ ...meta }" :state="type" class="event-title" />
      </q-card-section>
      <q-card-section class="q-px-sm q-py-none">
        <q-input v-if="newData.title" v-model="newData.title" borderless input-style="font-size: 32px;"
          label="Event Name" />
      </q-card-section>
      <q-card-section class="q-px-sm q-py-xs">
        <q-select v-model="newData.eventType" :options="['Cycling', 'Running', 'Swimming', 'Other']" borderless dense
          label="Event Type" options-dense stack-label />
        <!--        <q-input v-if="newData.eventType" v-model="newData.eventType" label="Event Type" borderless/>-->
      </q-card-section>
      <q-card-section class="q-px-sm q-py-none">
        <span
          style="color: rgba(0, 0, 0, 0.6);font-size: 12px;line-height: 20px;font-weight: 400;letter-spacing: 0.00937em;">Due</span><br />
        {{ newData.due.getDate() - new Date().getDate() }} days remaining
      </q-card-section>
      <q-card-section class="q-pa-sm">
        <q-input v-if="newData.description" v-model="newData.description" borderless label="Description" />
      </q-card-section>
    </div>

    <v-bottom-bar v-if="CIMState.active !== CIMState.states.ANALYSIS" class="" />
  </q-card>
</template>

<script lang="js">
import { CIMStates } from './Models'
import { CalendarItemTypes } from '../Models'
import WorkoutBuilder from 'components/Calendar/CIM/workout-builder/WorkoutBuilder'
import WorkoutBlocks from 'components/WorkoutBlocks.vue'
import TopBar from 'components/Calendar/CIM/layout/TopBar.vue'
import Header from 'components/Calendar/CIM/layout/Header.vue'
import NavTabs from 'components/Calendar/CIM/layout/NavTabs.vue'
import BottomBar from 'components/Calendar/CIM/layout/BottomBar.vue'
import CalendarReportSummary from 'components/Calendar/CIM/tabs/CalendarReportSummary.vue'
import CalendarReportMapGraph from 'components/Calendar/CIM/tabs/CalendarReportMapGraph.vue'
import CalendarReportData from './tabs/CalendarReportData.vue'
import { BreakRow, Col, Row } from 'vue-colrow'
import 'vue-colrow/dist/vue-colrow.css'
import CalendarItemAnalysis from 'components/Calendar/CIM/CalendarItemAnalysis.vue'
import CalendarItemWorkoutBuilder from './workout-builder/CalendarItemWorkoutBuilder.vue'
// newData prop should be used as the main source of data
// data variable is temporary, and will be used until the REST api is provided
export default {
  name: 'CalendarItemManagement',
  components: {
    'v-top-bar': TopBar,
    'v-header': Header,
    'v-nav-tabs': NavTabs,
    'v-bottom-bar': BottomBar,
    'v-report-summary': CalendarReportSummary,
    'v-report-map-graph': CalendarReportMapGraph,
    'v-report-data': CalendarReportData,
    'v-item-analysis': CalendarItemAnalysis,
    'v-workout-builder': CalendarItemWorkoutBuilder,
    'v-workout-blocks': WorkoutBlocks,
    Row: Row,
    Col: Col,
    'Break-Row': BreakRow
  },
  props: {
    selectedDate: {
      required: false,
      type: Date,
      default: 'Select Date '
    },
    type: {
      required: true,
      type: Number
    },
    newData: {
      required: false
    }
  },
  data() {
    return {
      CalendarItemTypes,
      CIMState: {
        active: CIMStates.SUMMARY,
        states: CIMStates
      },
      measurements: [
        {
          name: 'Sleep',
          unit: 'hrs'
        },
        {
          name: 'Weight',
          unit: 'Kg'
        },
        {
          name: 'Sleep Quality',
          unit: ''
        },
        {
          name: 'Injury',
          unit: ''
        },
        {
          name: 'Sickness',
          unit: ''
        },
        {
          name: 'Fatigue',
          unit: ''
        },
      ],
      barChart: {
        data: {
          labels: [...new Array(50)].map((c, i) => `day${i}`),
          datasets: [
            {
              label: 'ss',
              backgroundColor: this.getChartFillColor(),
              borderColor: this.getChartBorderColor(),
              borderWidth: 1,
              data: this.populateChart(Math.floor(Math.random() * 30) + 45)
            },
            {
              label: 'ss',
              backgroundColor: '#ffb9b9',
              borderColor: '#cd7474',
              borderWidth: 1,
              data: this.populateChart(Math.floor(Math.random() * 30) + 45)
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false,
              categoryPercentage: 1.0,
              barPercentage: 1.0,
              stacked: true
            }],
            yAxes: [{
              display: false,
              stacked: true
            }]
          },
          tooltips: {
            enabled: false
          }
        }
      },
      meta: {
        title: 'Untitled',
        desc: null,
        startTime: null
      },
      workoutReport: {
        type: 'summary',
        feeling: {
          buttons: [
            {
              icon: 'icon-ic_fluent_emoji_laugh_20_regular',
              label: 'Very Strong'
            },
            {
              icon: 'icon-ic_fluent_emoji_20_regular',
              label: 'Strong'
            },
            {
              icon: 'icon-ic_fluent_emoji_meh_20_regular',
              label: 'Normal'
            },
            {
              icon: 'icon-ic_fluent_emoji_sad_20_regular',
              label: 'Weak'
            },
            {
              icon: 'icon-ic_fluent_emoji_angry_20_regular',
              label: 'Very Weak'
            }
          ],
          selected: null
        },
        excertion: {
          selected: 1
        },
        plans: {
          columns: [
            {
              name: 'desc',
              required: true,
              label: '',
              align: 'right',
              field: row => row.name,
              format: val => `${val}`,
              sortable: false
            },
            {
              name: 'planned',
              label: 'Planned',
              field: 'planned',
              align: 'center'
            },
            {
              name: 'completed',
              align: 'center',
              label: 'Completed',
              field: 'completed'
            },
            {
              name: 'metric',
              label: '',
              field: 'metric',
              align: 'left'
            }
          ],
          data: []
        },
        extra: {
          columns: [
            {
              name: 'desc',
              required: true,
              label: '',
              align: 'right',
              field: row => row.name,
              format: val => `${val}`,
              sortable: false
            },
            {
              name: 'min',
              label: 'Min',
              field: 'min',
              align: 'center'
            },
            {
              name: 'avg',
              label: 'Avg',
              field: 'average',
              align: 'center'
            },
            {
              name: 'max',
              label: 'Max',
              field: 'completed',
              align: 'center'
            },
            {
              name: 'metric',
              label: '',
              field: 'metric',
              align: 'left'
            }
          ],
          data: []
        }
      },
      workoutRecordedData: {
        timeStamp: {
          record: []
        },
        path: {
          coordinates: []
        },
        heartRate: {
          record: []
        },
        power: {
          record: []
        },
        speed: {
          record: []
        },
        elavation: {
          record: []
        },
        cadence: {
          record: []
        },
        zoneData: {}
      },
      equipment: [
        {
          label: 'Shoes',
          selected: 'Cool Nike Shoes',
          options: ['Cool Nike Shoes', 'Meh Addidas Shoes']
        },
        {
          label: 'Bike',
          selected: 'Bike A',
          options: ['Bike A', 'Bike B']
        }
      ],
      data: {
        workoutPlan: [],
        type: 'bike'
      }
    }
  },
  methods: {
    populateChart(size) {
      //REMOVE IN PRODUCTION
      function rampUp(samples, max) {
        const finSample = []

        for (let i = 1; i <= samples; i++) {
          finSample.push(max / i)
        }

        return finSample.reverse()
      }

      function workHard(samples, min) {
        const finSample = [min]

        for (let i = 1; i <= samples; i++) {
          finSample.push(min + Math.ceil(Math.random() * 10))
        }

        return finSample
      }

      const rampSize = Math.floor(size / 10)
      const fin = [...rampUp(rampSize, 20), ...workHard(size - 2 * rampSize, 20), ...rampUp(rampSize, 20).reverse()]
      return fin
    },
    getChartFillColor() {
      return this.fillColor
    },
    getChartBorderColor() {
      return this.borderColor
    },
    decimalToTime(decimalTime) {
      const hrs = ('0' + Math.floor(decimalTime)).slice(-2)
      const min = ('0' + Math.floor((decimalTime - hrs) * 60)).slice(-2)
      const sec = ('0' + Math.floor(((decimalTime - hrs) * 60) - min)).slice(-2)
      return `${hrs}:${min}:${sec}`
    },
    reportPlansRows(WorkoutData) {
      const rows = [
        {
          name: 'Duration',
          completed: this.decimalToTime(WorkoutData.totalTime),
          planned: this.decimalToTime(WorkoutData.totalTimePlanned),
          metric: 'h:m:s'
        },
        {
          name: 'Distance',
          completed: (WorkoutData.distance / 1000).toPrecision(Math.log(WorkoutData.distance / 1000) * Math.LOG10E + 1 | 0 + 1),
          planned: (WorkoutData.distancePlanned / 1000).toPrecision(Math.log(WorkoutData.distancePlanned / 1000) * Math.LOG10E + 1 | 0 + 1),
          metric: 'km'
        },
        {
          name: 'Average Pace',
          completed: 42069,
          planned: 1001,
          metric: 'mph'
        },
        {
          name: 'Calories',
          completed: WorkoutData.calories,
          planned: WorkoutData.caloriesPlanned,
          metric: 'kcal'
        },
        {
          name: 'Elavation Gain',
          completed: WorkoutData.elevationGain,
          planned: WorkoutData.elevationGainPlanned,
          metric: 'm'
        },
        {
          name: 'TSS',
          completed: Math.floor(WorkoutData.tssActual),
          planned: Math.floor(WorkoutData.tssPlanned),
          metric: 'TSS'
        },
        {
          name: 'IF',
          completed: WorkoutData.if.toPrecision(2),
          planned: WorkoutData.ifPlanned.toPrecision(2),
          metric: 'IF'
        }
      ]

      switch (this.data.type) {
        case 'bike':
          rows[rows.findIndex(item => item.name === 'Average Pace')].name = 'Average Speed'
          rows.push(...[
            {
              name: 'Normalized Power',
              completed: WorkoutData.normalizedPowerActual,
              planned: null,
              metric: 'W'
            },
            {
              name: 'Work',
              completed: Math.ceil(WorkoutData.energy),
              planned: Math.ceil(WorkoutData.energyPlanned),
              metric: 'kJ'
            }
          ])
          return rows
        case 'run':
          rows.push(...[
            {
              name: 'Elavation Loss',
              completed: Math.ceil(WorkoutData.elevationLoss),
              planned: null,
              metric: 'm'
            },
            {
              name: 'Work',
              completed: Math.floor(WorkoutData.energy),
              planned: Math.floor(WorkoutData.energyPlanned),
              metric: 'kJ'
            }
          ])
          return rows
        case 'swim':
          return rows
        case 'strength':
          rows.splice(rows.findIndex(item => item.name === 'Distance'), 1)
          rows.splice(rows.findIndex(item => item.name === 'Average Pace'), 1)
          rows.splice(rows.findIndex(item => item.name === 'Elavation Gain'), 1)
          return rows
        case 'rowing':
          return rows
        case 'walk':
          return rows
        case 'custom':
          rows.splice(rows.findIndex(item => item.name === 'Average Pace'), 1)
          rows.splice(rows.findIndex(item => item.name === 'Elavation Gain'), 1)

          return rows
        case 'rest':
          return rows.slice(0, 1)
      }

      return []
    },
    addWorkoutBlock(blockType) {
      this.data.workoutPlan.push(WorkoutBuilder.build(blockType))
      console.log(this.data.workoutPlan)
    },
    addMeasurement(mIndex) {
      let newMeasurements = this.newData.measurements
      newMeasurements.push({
        name: this.measurements[mIndex].name,
        value: '',
        unit: this.measurements[mIndex].unit
      })
      this.$set(this.newData, 'measurements', newMeasurements)
    }
  },
  mounted() {
    this.$axios.get('http://localhost:8000/workoutData.json')
      .then((response) => {
        const _FetchedWorkoutData = response.data
        console.log(_FetchedWorkoutData.workoutId)

        this.meta.title = _FetchedWorkoutData.title
        this.meta.desc = _FetchedWorkoutData.description
        if (_FetchedWorkoutData.startTime) this.meta.startTime = new Date(_FetchedWorkoutData.startTime)
        if (_FetchedWorkoutData.feeling) this.workoutReport.feeling.selected = this.workoutReport.feeling.buttons[_FetchedWorkoutData.feeling - 1].label
        if (_FetchedWorkoutData.rpe) this.workoutReport.excertion.selected = _FetchedWorkoutData.rpe
        if (_FetchedWorkoutData.heartRateMinimum) {
          this.workoutReport.extra.data.push({
            name: 'Heart Rate',
            min: _FetchedWorkoutData.heartRateMinimum,
            avg: _FetchedWorkoutData.heartRateAverage,
            max: _FetchedWorkoutData.heartRateMaximum,
            metric: 'bpm'
          })
        }
        this.workoutReport.plans.data = this.reportPlansRows(_FetchedWorkoutData)
      })
      .catch((e) => {
        console.log(e)
      })

    this.$axios.get('http://localhost:8000/csvjson.json')
      .then((response) => {
        for (const record of response.data) {
          this.workoutRecordedData.path.coordinates.push([record.position_lat / 100000000, record.position_long / 100000000])
          this.workoutRecordedData.heartRate.record.push(record.heart_rate)
          this.workoutRecordedData.power.record.push(record.power)
          this.workoutRecordedData.speed.record.push(record.speed * 10)
          this.workoutRecordedData.cadence.record.push(record.cadence)
          this.workoutRecordedData.elavation.record.push(record.altitude - 501.6)
          this.workoutRecordedData.timeStamp.record.push(record.timestamp)
        }
        // console.log(`Data Length: ${response.data.length}`)
        // for(let _i of Object.keys(this.workoutRecordedData)) {
        //   if(this.workoutRecordedData[_i].record)
        //     console.log(this.workoutRecordedData[_i].record[this.workoutRecordedData[_i].record.length-1])
        // }
      })
      .catch((e) => {
        console.log(e)
      })

    this.$axios.get('http://localhost:8000/zoneData.json')
      .then((response) => {
        this.workoutRecordedData.zoneData = response.data
      })
      .catch((e) => {
        console.log(e)
      })

    const blockTypes = WorkoutBuilder.types
    this.data.workoutPlan.push(WorkoutBuilder.build(blockTypes.WARMUP))
    this.data.workoutPlan.push(WorkoutBuilder.build(blockTypes.RAMPUP))
    this.data.workoutPlan.push(WorkoutBuilder.build(blockTypes.ACTIVE))
    this.data.workoutPlan[1].structure.map(step => WorkoutBuilder.setGoalType(step, WorkoutBuilder.EGoal.TARGET))
    this.data.workoutPlan[0].structure[0] = WorkoutBuilder.setLengthType(this.data.workoutPlan[0].structure[0], WorkoutBuilder.ELength.DISTANCE, null)
    this.data.workoutPlan.push(WorkoutBuilder.build(blockTypes.TWOREPEATS))
    console.log(this.data.workoutPlan)
  }
}
</script>

<style lang="scss" scoped>
$SummarySelector: ".STATE-0";
$WorkoutBuilderSelector: ".STATE-1";
$AnalysisSelector: ".STATE-2";

//break points (as defined in Calendar.vue)
$md: 1200px;
$sm: 850px;
$xs: 750px;

.CIM-Card {
  min-width: 300px;
  min-height: 0;
  transition: min-height 0.45s ease-in-out, min-width 0.3s ease-in-out;
}

#{$AnalysisSelector} {
  min-width: 95vw !important;
  min-height: 90vh !important;
}

#{$WorkoutBuilderSelector} {
  min-width: 85vw !important;
  max-height: 90vh !important;
}

.tab-item {
  max-height: calc(90vh - 40px - 100px - 60px - 40px - 12px);
  overflow-y: scroll;
}

@media (min-width: $xs) {
  .CIM-Card {
    min-width: 0;
  }
}

@media (min-width: $sm) {
  .CIM-Card {
    min-width: 70vw;
  }
}

@media (min-width: $md) {
  .CIM-Card {
    min-width: 60vw;
  }
}

@media (min-width: $md+250px) {
  .CIM-Card {
    min-width: 50vw;
  }
}

.metric-card {
  transition: all 0.1s ease-in-out;

  .metric-value {
    //max-width: 100%;
    //transition: max-width 0.1s ease-in-out;
  }

  .matric-remove {
    display: none;
    position: absolute;
    right: 16px;
  }
}

.metric-card:hover {
  filter: drop-shadow(0 0 3px #c9c9c9);

  .metric-value {
    //max-width: 50% !important;
  }

  .matric-remove {
    display: block;
  }
}

.event-title {
  font-weight: 700;
  font-size: 18px;
  animation: glow 7s ease-in-out infinite;
}

@keyframes glow {
  30% {
    color: black;
  }

  40% {
    color: #e33e2a;
  }

  60% {
    color: #e33e2a;
  }

  70% {
    color: black;
  }
}
</style>
