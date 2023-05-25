<template>
  <div>
    <q-card @click="$emit('clicked')" bordered class="calendar-item-card" flat tabindex="0">
      <q-btn class="menu-btn item-action" color="black" dense flat icon="icon-ic_fluent_navigation_20_regular" padding="0"
        size="sm" unelevated>
        <q-menu anchor="bottom left" class="action-menu" self="top right">
          <div class="q-pa-xs" style="width: 100px; font-size: 90%">
            <q-list dense>
              <q-item class="row justify-start" clickable>
                <div class="self-center" style="font-size: 105%">
                  Copy
                </div>
              </q-item>
              <q-item class="row justify-start" clickable>
                <div class="self-center" style="font-size: 105%">
                  Cut
                </div>
              </q-item>
              <q-item class="row justify-start" clickable>
                <div class="self-center" style="font-size: 105%">
                  Paste
                </div>
              </q-item>
              <q-item class="row justify-start" clickable>
                <div class="self-center" style="font-size: 105%">
                  Delete
                </div>
              </q-item>
            </q-list>
          </div>
        </q-menu>
      </q-btn>
      <slot>
        <q-card-section class="workout-section" v-if="type === CalendarItemTypes.WORKOUT">
          <span class="head">
            <q-icon name="icon-ic_fluent_top_speed_20_regular" size="20px" class="item-icon" />
            <span>Running</span>
          </span>
          <div class="body">
            <workout-block :workoutPlan="data.workoutPlan" :detailed="false"
              :style="{ 'height': '25px', 'min-width': '100%', 'max-width': '100%' }" />
          </div>
        </q-card-section>
        <div v-if="type === CalendarItemTypes.GOALS || type === CalendarItemTypes.NOTE">
          <q-card-section v-if="reminder.state === 'still'" class="goal-text" style="margin: auto 0;">
            <q-icon
              :name="type === CalendarItemTypes.GOALS ? 'icon-ic_fluent_target_20_regular' : 'icon-ic_fluent_note_20_regular'"
              class="q-mr-sm item-icon" size="24px" />

            <span>{{ type === CalendarItemTypes.GOALS ? data.description : (data.title || 'untitled') }}</span>
            <br v-if="type === CalendarItemTypes.NOTE" />
            <span v-if="type === CalendarItemTypes.NOTE && data.description" style="font-size: 85%; margin-left: 32px;"
              class="ellipsis item-details">
              {{ data.description || 'untitled' }}
            </span>
          </q-card-section>
          <q-space v-if="reminder.state === 'still'" />
          <!--          <q-card-actions v-if="reminder.state==='still'" class="no-padding q-mr-sm justify-center goal-actions">-->
          <!--            <q-btn class="column" color="positive" dense flat icon="icon-ic_fluent_checkmark_16_regular" round-->
          <!--                   size="12px" @click="changeItemState(index, 'done')"/>-->
          <!--            <q-btn class="column no-margin" color="negative" dense flat icon="icon-ic_fluent_delete_20_regular" round-->
          <!--                   size="12px" @click="changeItemState(index, 'deleting')"/>-->
          <!--          </q-card-actions>-->
          <q-card-section v-if="reminder.state === 'deleting'" class="full-width text-center">
            <span>Are You Sure ?</span>
            <div class="row justify-center">
              <q-btn class="column q-mx-sm" color="negative" dense flat label="Yes" round size="12px"
                @click="changeItemState(index, 'deleted')" />
              <q-btn class="column q-mx-sm" color="positive" dense flat label="No" round size="12px"
                @click="changeItemState(index, 'still')" />
            </div>
          </q-card-section>
          <q-card-section v-if="['done', 'deleted'].includes(reminder.state)" class="full-width text-center text-white"
            style="margin-top: auto; margin-bottom: auto;">
            {{ reminder.state.charAt(0).toUpperCase() + reminder.state.slice(1) }}
          </q-card-section>
        </div>
        <q-card-section v-if="type === CalendarItemTypes.METRICS" class="ellipsis">
          <q-icon name="icon-ic_fluent_ruler_20_regular" class="q-mr-sm item-icon" size="24px" />
          <span class="measurement" style="white-space: nowrap;" v-for="(m, _i) in data.measurements.slice(0, 2)"
            :key="_i" :class="(_i === 1) ? 'shiftable' : ''"
            :style="{ position: 'relative', top: (_i === 1) ? '-3px' : '' }">
            <span class="measurement--name">{{ m.name }}: </span>
            <span>{{ m.value }}</span>
            <span v-if="m.unit && m.unit !== 'text'">{{ m.unit }}</span>
            <br v-if="data.measurements.length > 1 && _i === 0" />
          </span>
          <br v-if="data.measurements.length > 2" /><span v-if="data.measurements.length > 2" style="font-size: 85%;"
            class="ellipsis shiftable">
            ... and {{ data.measurements.length - 2 }} more</span>
        </q-card-section>
        <q-card-section v-if="type === CalendarItemTypes.EVENT" class="event-item">
          <span class="head">
            <q-icon name="icon-ic_fluent_trophy_20_regular" size="20px" class="item-icon" />
            {{ data.title }}
          </span>
          <div class="cool-animation">
            <div class="loader">
              <div v-for="(i, index) in 10" :key="index"></div>
            </div>
          </div>
          <div class="body">
            <span class="item-details">{{ data.eventType }}</span>
            <span class="item-details"><br />{{ data.due.getDate() - new Date().getDate() }} days remaining</span>
            <p v-if="data.description" class="q-mt-xs">
              {{ data.description.slice(0, $q.screen.width / 25) }}{{ data.description.length > $q.screen.width / 25 ?
                '...' : '' }}</p>
          </div>
        </q-card-section>
      </slot>
    </q-card>
  </div>
</template>

<script>
import { CalendarItemTypes } from './Models'
import WorkoutBlocks from '../WorkoutBlocks.vue'

export default {
  name: 'CalendarItem',
  props: {
    type: {
      required: true,
      type: Number
    },
    data: {
      required: false
    }
  },
  components: {
    'workout-block': WorkoutBlocks
  },
  data() {
    return {
      CalendarItemTypes,
      reminder: {
        state: 'still',
        states: [
          { name: 'done', backgroundColor: 'rgba(33,186,69, 0.8)' },
          { name: 'deleted', backgroundColor: 'rgba(206,1,23,0.8)' },
          { name: 'deleting', backgroundColor: '' }
        ]
      }
    }
  },
  methods: {
    changeItemState(index, newState) {
      let newValue = this.userItems[index]
      newValue.state = newState
      this.userItems.splice(index, 1, newValue)
      if (['done', 'deleted'].includes(newState))
        setTimeout(() => this.userItems.splice(index, 1), 700)
    }
  }
}
</script>

<style scoped lang="scss">
$animation-color: salmon;

.cool-animation {
  width: 100%;
  height: 5px;
}

.loader {
  height: 100%;
  display: flex;
  transform: translateZ(0);
}

.loader div {
  flex: 1;
  background: $animation-color;
  -webkit-animation: go 0.8s infinite alternate ease;
  animation: go 0.8s infinite alternate ease;
  box-shadow: 0 0 20px $animation-color;
}

.loader div:nth-child(1) {
  animation-delay: -0.72s;
}

.loader div:nth-child(2) {
  animation-delay: -0.64s;
}

.loader div:nth-child(3) {
  animation-delay: -0.56s;
}

.loader div:nth-child(4) {
  animation-delay: -0.48s;
}

.loader div:nth-child(5) {
  animation-delay: -0.4s;
}

.loader div:nth-child(6) {
  animation-delay: -0.32s;
}

.loader div:nth-child(7) {
  animation-delay: -0.24s;
}

.loader div:nth-child(8) {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.loader div:nth-child(9) {
  -webkit-animation-delay: -0.08s;
  animation-delay: -0.08s;
}

.loader div:nth-child(10) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

@keyframes go {
  100% {
    background: transparent;
    flex: 10;
    box-shadow: 0 0 0 transparent;
  }
}

.calendar-item-card {
  min-height: 40px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  .menu-btn {
    position: absolute;
    top: 4px;
    right: 6px;
    z-index: 129037129836;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .head {
    font-size: 90%;
    font-weight: 400;
  }

  .body {
    transition: all 0.09s;
    filter: grayscale(40%) opacity(80%);
  }

  .goal {
    height: 100%;
    transition: background-color 0.3s ease-in-out;
  }

  .goal-actions {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: none;
  }

  .goal-text {
    font-size: 90%;
  }

  .measurement {
    font-size: 95%;

    span {
      font-size: 85%;
    }

  }

  .shiftable {
    margin-left: 32px;
  }

  .event-item {
    .cool-animation {
      margin-top: 4px;
    }

    .body {
      margin-top: 4px;
      font-size: 90%;
    }

    .item-details:nth-of-type(2) {
      color: darken($animation-color, 20%);
    }
  }
}

.calendar-item-card:hover {
  filter: drop-shadow(0 0 3px #c9c9c9);

  .menu-btn {
    opacity: 1 !important;
  }

  .body {
    filter: grayscale(0%) opacity(80%);
  }

  .goal-actions {
    display: flex;
  }
}

.workout-section {
  padding: 16px;
}

@media (max-width: 1600px) {
  .calendar-item-card {
    .event-item {
      .item-details {
        display: none;
      }
    }

    .workout-section {
      padding: 12px;
    }
  }
}

@media (max-width: 1280px) {
  .calendar-item-card {
    .item-icon {
      display: none;
    }

    .measurement--name {
      display: none;
    }

    .shiftable {
      margin-left: 0;
    }

    .head {
      font-size: 85%;
    }

    .item-details {
      display: none;
    }
  }
}</style>
