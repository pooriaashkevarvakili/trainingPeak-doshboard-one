<template>
  <div>
    <div v-if="![CIMStates.NOTE, CIMStates.GOALS, CIMStates.METRICS, CIMStates.EVENT].includes(state)" class="row">
      <div :style="state !== CIMStates.SUMMARY?'width: 40% !important;':''" class="workout-main-header q-px-md q-py-xs"
           style="width: 80%">
        <div>
          {{ meta.title || 'Untitled' }}
        </div>
        <div class="row">
          <q-btn :icon="workoutList.find(item=>item.value===meta.type).icon" class="q-mr-md workout-btn" dense flat
                 padding="0" size="lg"
                 style="position: relative; top: 7px;"
          >
            <q-tooltip>Choose Workout Type</q-tooltip>
            <q-menu>
              <q-list style="font-size: 90%">
                <q-item v-for="(item,index) in workoutList" v-bind:key="index" v-close-popup clickable
                        dense @click="setWorkoutType(item.value)">
                  <div class="self-center"> {{ item.label }}</div>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <div class="row justify-evenly" style="width: calc(100% - 75px); font-size: 120%;">
            <div class="self-center text-weight-bold">{{ meta.duration }}</div>
            <div class="self-center text-weight-bold">{{ meta.distance }} <span style="font-size: 80%;">km</span></div>
            <div class="self-center text-weight-bold">{{ meta.tss }} <span style="font-size: 80%;">TSS</span></div>
          </div>
        </div>
        <div class="row">
          <div class="row justify-evenly" style="width: calc(100% - 75px); font-size: 100%; margin-left: 48px;">
            <div class="self-center"><span style="font-size: 85%;">Fitness </span> 19</div>
            <div class="self-center"><span style="font-size: 85%;">Fatigue </span>5</div>
            <div class="self-center"><span style="font-size: 85%;">Form </span>14</div>
          </div>
        </div>
      </div>
      <q-card-actions :style="state !== CIMStates.SUMMARY?'width: 10% !important;':''"
                      class="q-pl-sm q-pr-none q-py-none justify-around"
                      style="width: 20%" vertical>
        <q-btn label="Upload" outline style="font-size: 85%" unelevated/>
        <q-btn v-if="state === CIMStates.SUMMARY" :ripple="false" color="primary" label="Analyze" style="font-size: 85%"
               unelevated @click="$emit('analysis', true)"/>
        <q-btn v-else :ripple="false" label="Summary" outline style="font-size: 85%" unelevated
               @click="$emit('analysis', false)"/>
      </q-card-actions>

      <q-separator v-if="state !== CIMStates.SUMMARY" :inset="true" class="q-ml-sm" vertical/>

      <q-card-section v-if="state === CIMStates.WORKOUTBUILD" class="q-pa-xs">
        <div class="q-ml-sm">
          Click or drag
        </div>
        <div class="column q-mx-xs workoutBlocks">
          <div class="row">
            <q-btn v-for="(block, index) in workoutBlocks.slice(0,4)" v-bind:key="index" class="col"
                   dense flat @click="$emit('add-block', block.type)">
              <img :src="block.icon" draggable="false" height="25"/>
              <q-tooltip>
                {{ block.name }}
              </q-tooltip>
            </q-btn>
          </div>
          <div class="row">
            <q-btn v-for="(block, index) in workoutBlocks.slice(4,8)" v-bind:key="index" class="col"
                   dense flat @click="$emit('add-block', block.type)">
              <img :src="block.icon" draggable="false" height="25"/>
              <q-tooltip>
                {{ block.name }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-separator v-if="state !== CIMStates.SUMMARY" :inset="true" class="q-ml-sm" vertical/>

      <q-card-section v-if="state === CIMStates.WORKOUTBUILD" class="q-pa-xs">
        <div class="q-ml-sm">
          Units
        </div>
        <div class="column q-mx-xs">

        </div>
      </q-card-section>

      <q-card-actions v-if="state === CIMStates.ANALYSIS" class="q-px-none q-py-none justify-between" vertical>
        <q-btn dense flat icon="icon-ic_fluent_data_bar_vertical_add_24_regular" unelevated>
          <q-tooltip anchor="center right" self="center left">Chart Library</q-tooltip>
          <q-menu>
            <q-card flat style="width: 100%;">
              <q-card-section style="border-bottom: 1px solid rgba(0,0,0,0.1)">
                Charts Library
                <q-btn flat size="sm" dense round v-close-popup style="position: absolute; right: 16px;">
                  <img src="/fluent-icons/close.svg"/>
                </q-btn>
              </q-card-section>
              <q-card-section class="q-pt-sm">
                <q-list style="min-width: 200px; max-height: 40vh; font-size: 90%; overflow-y: scroll;">
                  <q-item v-for="(item, index) in $store.getters['charts/getItemAnalysisCharts']" :key="index" style="border-radius: 0;" @click="$store.dispatch('charts/addSelectedItemAnalysisChart', item)" dense clickable v-close-popup class="q-py-sm">
                    <q-icon size="18px" :name="getChartIcon(item.type)" style="margin: auto 0;"/>
                    <q-item-section class="q-ml-sm">{{ item.title }}</q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-menu>
        </q-btn>
        <q-btn dense flat icon="icon-ic_fluent_comment_20_regular" unelevated/>
        <q-btn dense flat icon="icon-ic_fluent_layer_20_regular" unelevated/>
      </q-card-actions>

      <q-separator v-if="state === CIMStates.ANALYSIS" :inset="true" vertical/>

      <q-card-actions v-if="state === CIMStates.ANALYSIS" class="q-px-none q-py-none justify-end" vertical>
        <q-checkbox v-model="isPublic" class="q-ml-sm q-pl-xs q-mb-xs" dense label="Public" size="sm"
                    style="font-size: 85%;">
          <q-tooltip>Share your completed workout</q-tooltip>
        </q-checkbox>
        <div class="row">
          <q-btn dense flat icon="icon-ic_fluent_f_stop_20_regular" unelevated/>
          <q-btn dense flat icon="icon-ic_fluent_share_20_regular" unelevated/>
          <q-btn dense flat icon="icon-ic_fluent_link_20_regular" unelevated/>
          <q-btn dense flat icon="icon-ic_fluent_mail_20_regular" unelevated/>
        </div>
      </q-card-actions>

      <q-space v-if="state !== CIMStates.SUMMARY"/>

      <q-card-actions v-if="state === CIMStates.ANALYSIS" class="q-px-none q-py-none justify-end" vertical>
        <div class="row">
          <q-btn v-close-popup class="q-mx-xs q-px-xs" dense label="Delete" outline style="font-size: 80%;" unelevated/>
          <q-btn v-close-popup class="q-mx-xs q-px-xs" dense label="Cancel" outline style="font-size: 80%;" unelevated/>
          <q-btn v-close-popup class="q-mx-xs q-px-sm" dense label="Save" outline style="font-size: 80%;" unelevated/>
          <q-btn v-close-popup class="q-mx-xs q-px-sm" color="primary" label="Save & Close" style="font-size: 80%;"
                 unelevated/>
        </div>
      </q-card-actions>
    </div>
    <div v-else class="row">
      <div class="q-pa-sm full-width row">
        <q-icon :name="headerTitles.find(item=>item.type===state).icon" class="q-mr-sm" size="32px"/>
        <span style="margin-top: auto; margin-bottom: auto;">{{headerTitles.find(item => item.type === state).label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import WorkoutBuilder from 'components/Calendar/CIM/workout-builder/WorkoutBuilder'
import { CIMStates } from '../Models'
// TODO Update temp workout icons with proper ones. FluentSysIcons doesnt have the right kinds of icons

export default {
  name: 'Header',
  props: {
    meta: {
      required: true
    },
    state: {
      required: false,
      type: Number
    },
  },
  data () {
    return {
      CIMStates,
      workoutList: [
        {
          label: 'Cycling',
          value: 'bike',
          icon: 'icon-ic_fluent_top_speed_20_regular'
        },
        {
          label: 'Running',
          value: 'run',
          icon: 'icon-ic_fluent_top_speed_20_regular'
        },
        {
          label: 'Swimming',
          value: 'swim',
          icon: 'icon-ic_fluent_top_speed_20_regular'
        },
        {
          label: 'Strength',
          value: 'strength',
          icon: 'icon-ic_fluent_top_speed_20_regular'
        },
        {
          label: 'Rowing',
          value: 'rowing',
          icon: 'icon-ic_fluent_top_speed_20_regular'
        },
        {
          label: 'Walking',
          value: 'walk',
          icon: 'icon-ic_fluent_top_speed_20_regular'
        },
        {
          label: 'Custom',
          value: 'custom',
          icon: 'icon-ic_fluent_top_speed_20_regular'
        },
        {
          label: 'Rest',
          value: 'rest',
          icon: 'icon-ic_fluent_top_speed_20_regular'
        }
      ],
      isPublic: false,
      workoutBlocks: [
        {
          icon: 'workout_blocks/warmup.svg',
          name: 'Warm up',
          type: WorkoutBuilder.types.WARMUP
        },
        {
          icon: 'workout_blocks/active.svg',
          name: 'Active',
          type: WorkoutBuilder.types.ACTIVE
        },
        {
          icon: 'workout_blocks/recovery.svg',
          name: 'Recovery',
          type: WorkoutBuilder.types.RECOVERY
        },
        {
          icon: 'workout_blocks/cooldown.svg',
          name: 'Cooldown',
          type: WorkoutBuilder.types.COOLDOWN
        },
        {
          icon: 'workout_blocks/2step.svg',
          name: '2 Step Repeats',
          type: WorkoutBuilder.types.TWOREPEATS
        },
        {
          icon: 'workout_blocks/3step.svg',
          name: '3 Step Repeats',
          type: WorkoutBuilder.types.THREEREPEATS
        },
        {
          icon: 'workout_blocks/rampup.svg',
          name: 'Ramp up',
          type: WorkoutBuilder.types.RAMPUP
        },
        {
          icon: 'workout_blocks/rampdown.svg',
          name: 'Ramp down',
          type: WorkoutBuilder.types.RAMPDOWN
        },
      ],
      headerTitles: [
        {
          type: CIMStates.METRICS,
          label: 'Measurements',
          icon: 'icon-ic_fluent_ruler_20_regular'
        },
        {
          type: CIMStates.NOTE,
          label: 'Note',
          icon: 'icon-ic_fluent_note_20_regular'
        },
        {
          type: CIMStates.EVENT,
          label: 'Event',
          icon: 'icon-ic_fluent_trophy_20_regular'
        },
        {
          type: CIMStates.GOALS,
          label: 'Goal',
          icon: 'icon-ic_fluent_target_20_regular'
        },
      ]
    }
  },
  methods: {
    setWorkoutType (workoutType) {
      this.meta.type = workoutType
      this.workoutReport.plans.data = this.reportPlansRows()
    },
    getChartIcon (type) {
      let EChartTypes = this.$store.getters['charts/getChartTypes']

      switch (type) {
        case EChartTypes.AREA:
          return 'icon-ic_fluent_data_area_24_regular'
        case EChartTypes.BAR:
          return 'icon-ic_fluent_data_histogram_24_regular'
        case EChartTypes.LINE:
          return 'icon-ic_fluent_data_line_24_regular'
        case EChartTypes.PIE:
          return 'icon-ic_fluent_data_pie_24_regular'
        case EChartTypes.TABLE:
          return 'icon-ic_fluent_table_20_regular'
        case EChartTypes.SCATTER:
          return 'icon-ic_fluent_data_scatter_24_regular'
        case EChartTypes.MAP:
          return 'icon-ic_fluent_map_24_regular'
        default:
          return 'icon-ic_fluent_data_area_24_regular'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$bad: rgba(255, 0, 0, 0.7);
$bad-active: rgba(255, 0, 0, 1);
.workout-main-header {
  background: rgba(0,0,0,0.05);
  border-radius: 5px;
  border: 1px solid rgba(255, 55, 55, 0.05);
}
.workout-btn {
  color: $bad;
  animation: pulseColor 5s ease infinite;
}
@keyframes pulseColor {
  35% {
    color: $bad;
  }
  40% {
    color: $bad-active;
    filter: drop-shadow(0px 0px 8px opacify($bad, 0.8));
  }
  50% {
    color: $bad-active;
    filter: drop-shadow(0px 0px 8px opacify($bad, 0.8));
  }
  55% {
    color: $bad;
  }
}
</style>
