<template>
  <div class="block-editor">
    <div v-for="(block, index) in workoutPlan" v-bind:key="index" :id="`blockCard_${index}`">
      <q-list @mouseenter="blockHover(index, true)" @mouseleave="blockHover(index, false)" bordered class="block q-mb-md">
        <q-card v-for="(step, _index) in block.structure" v-bind:key="_index" @mouseenter="stepHover(index, _index, true)" @mouseleave="stepHover(index, _index, false)" flat bordered class="step">
          <q-toolbar class="bg-grey-2 q-pl-none" style="min-height: 25px; height: 25px;">
            <q-toolbar-title class="step-title" style="padding-top: 2px;" contenteditable="true" @input="step.title=$event.target.innerText">
              {{step.title||"Title"}}
            </q-toolbar-title>
            <q-space/>
            <q-select dropdown-icon="icon-ic_fluent_chevron_down_20_regular" class="wbe--options" options-dense @input="(n)=>step.type=n" dense :value="step.type" emit-value map-options :options="workTypes"/>
            <q-select dropdown-icon="icon-ic_fluent_chevron_down_20_regular" class="wbe--options" options-dense @input="(n)=>WorkoutBuilder.setLengthType(step, n)" dense :value="step.length.type" emit-value map-options :options="lengthTypes"/>
            <q-select dropdown-icon="icon-ic_fluent_chevron_down_20_regular" class="wbe--options" options-dense @input="(n)=>WorkoutBuilder.setGoalType(step, n)" dense :value="step.goalType" emit-value map-options :options="goalTypes"/>
          </q-toolbar>
          <div class="row">
            <q-card-section class="row">
              <q-input v-model="step.length.value" class="q-input-dense q-mr-md" dense outlined style="max-width: 80px;"/>
              <q-input v-model="step.goal.min || step.goal" class="q-input-dense q-mr-xs" :class="step.goal.max ? 'goal-input':''" dense outlined style="max-width: 50px;"/>
              <q-input v-if="step.goal.max" v-model="step.goal.max" class="q-input-dense" dense outlined style="max-width: 40px;"/>
              <div style="font-size: 90%; margin-left: 5px; margin-top: auto; margin-bottom: auto;">
                % of <u style="text-decoration-style: dashed; color: blue">FTP</u>
                <q-tooltip>187-209 W</q-tooltip>
              </div>
            </q-card-section>
            <q-space/>
            <q-card-actions v-if="step.note===null" class="note-add">
              <q-btn flat dense icon="icon-ic_fluent_note_add_16_regular" @click="step.note=''"/>
            </q-card-actions>
          </div>
          <q-card-section v-if="step.note!==null" class="q-card--bordered q-py-xs">
            <q-input placeholder="Your note" outlined v-model="step.note" dense autogrow>
              <template slot="append">
                <q-btn icon="icon-ic_fluent_delete_20_regular" flat round dense @click="step.note = null"/>
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-list>
    </div>
  </div>
</template>

<script>
import WorkoutBuilder from './WorkoutBuilder'

export default {
  name: 'CalendarItemWorkoutBuilder',
  props: {
    workoutPlan: {
      required: false
    }
  },
  data () {
    return {
      WorkoutBuilder,
      goalTypes: [
        {
          label: 'Range',
          value: WorkoutBuilder.EGoal.RANGE,
        },
        {
          label: 'Target',
          value: WorkoutBuilder.EGoal.TARGET,
        }
      ],
      lengthTypes: [
        {
          label: 'Duration',
          value: WorkoutBuilder.ELength.DURATION,
        },
        {
          label: 'Distance',
          value: WorkoutBuilder.ELength.DISTANCE,
        }
      ],
      workTypes: [
        {
          label: 'Warmup',
          value: WorkoutBuilder.EWork.WARMUP,
        },
        {
          label: 'Work',
          value: WorkoutBuilder.EWork.WORK,
        },
        {
          label: 'Recover',
          value: WorkoutBuilder.EWork.RECOVER,
        },
        {
          label: 'Cooldown',
          value: WorkoutBuilder.EWork.COOLDOWN,
        }
      ]
    }
  },
  methods: {
    msToHuman(time, reverse=false, delimiter=":") {
      if(!reverse) {
        const hrs = Math.floor(time/3600000)
        const mins = Math.floor((time-hrs*3600000)/60000)
        const secs = Math.floor((time-hrs*3600000 - mins*60000)/1000)
        return `${('0'+hrs).slice(-2)}:${('0'+mins).slice(-2)}:${('0'+secs).slice(-2)}`
      }

      return time.split(delimiter)[0]*3600000 + time.split(delimiter)[1]*60000 + time.split(delimiter)[2]*1000
    },
    blockHover(index, state) {
      if(state)
        document.getElementsByClassName('CIM-Card')[0].querySelectorAll('.wb--block')[index].classList.add('sim-hover')
      else
        document.getElementsByClassName('CIM-Card')[0].querySelectorAll('.wb--block')[index].classList.remove('sim-hover')
    },
    stepHover(blockIndex, stepIndex, state) {
      if(state)
        document.getElementsByClassName('CIM-Card')[0].querySelectorAll('.wb--block')[blockIndex].querySelectorAll('.wb--step')[stepIndex].classList.add('sim-hover')
      else
        document.getElementsByClassName('CIM-Card')[0].querySelectorAll('.wb--block')[blockIndex].querySelectorAll('.wb--step')[stepIndex].classList.remove('sim-hover')
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.goal-input::after {
  content: " - " !important;
  margin-left: 5px;
}
.note-add{
  opacity: 0;
  transition: opacity 0.12s ease-in-out;
}
.step-title {
  font-size: 100%;
  height: 100%;
  padding-left: 10px;
}
.block-editor .block, .step {
  transition: all 0.1s ease-in-out;
}
.step:hover {
  .note-add {
    opacity: 1;
  }
  .q-toolbar {
    transition: all 0.1s ease-in-out;
    filter: brightness(0.9);
  }
}
.block-editor .block.sim-hover {
  filter: brightness(0.85);
}
.block-editor .step.sim-hover {
  filter: brightness(0.85);
}
.wbe--options {
  min-width: 55px;
  margin-left: 10px;
}
</style>
<style lang="scss">
.q-time__clock-position:nth-of-type(n+14) {
  display: none;
}
.step .q-field--auto-height.q-field--dense .q-field__control, .q-field--auto-height.q-field--dense .q-field__native {
  min-height: 20px !important;
}
.step .q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  height: 25px !important;
  font-size: 12px;
  padding-top: 0;
}
</style>
