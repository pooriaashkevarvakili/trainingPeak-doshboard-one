<template>
  <q-card class="CIC-Card q-pa-md">
    <q-card-section class="text-h4 text-weight-bold">
      {{ selectedDate.toLocaleDateString('en-uk', date.headerOptions) }}
      <q-btn v-close-popup class="float-right" dense flat icon="close" round size="sm"/>
    </q-card-section>
    <q-card-section>
      <div>
        Add a Workout
      </div>
      <div class="row q-py-sm">
        <q-btn v-for="(item, index) in calendarItemsList.workouts" v-bind:key="index" v-close-popup
               :icon="item.icon" :label="item.label" class="q-my-xs q-mr-sm" dense outline
               style="font-size: 100%; width: 120px; text-transform: capitalize !important;"
               unelevated
               @click="selectItem('workout', item.value)"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div>
        Add Other
      </div>
      <div class="row q-py-sm">
        <q-btn v-for="(item, index) in calendarItemsList.others" v-bind:key="index" v-close-popup
               :icon="item.icon" :label="item.label" class="q-my-xs q-mr-sm" dense outline
               style="font-size: 100%; width: 120px; text-transform: capitalize !important;"
               unelevated
               @click="selectItem('others', item.value)"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div>
        Upload Device Files
      </div>
      <div class="row q-py-sm">
        <q-btn v-close-popup class="q-my-xs q-mr-sm" dense icon="icon-ic_fluent_cloud_backup_24_regular" label="Upload File" outline
               style="font-size: 100%; width: 120px; text-transform: capitalize !important;"
               unelevated
               @click="selectItem('sync', 'upload')"
        />
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <a href="#">
        Learn about many ways to AutoSync your activity data.
      </a>
    </q-card-section>
  </q-card>
</template>

<script lang="js">

export default {
  name: 'CalendarItemCreation',
  props: {
    selectedDate: {
      required: true,
      type: Date
    }
  },
  data () {
    return {
      calendarItemsList: {
        workouts: [
          {
            label: 'Bike',
            value: 'bike',
            icon: 'img:fluent-icons/cycling.svg'
          },
          {
            label: 'Run',
            value: 'run',
            icon: 'img:fluent-icons/running.svg'
          },
          {
            label: 'Swim',
            value: 'swim',
            icon: "img:fluent-icons/swimming.svg"
          },
          {
            label: 'Strength',
            value: 'strength',
            icon: 'img:fluent-icons/weight.svg'
          },
          {
            label: 'Rowing',
            value: 'rowing',
            icon: 'img:fluent-icons/rowing.svg'
          },
          {
            label: 'Walk',
            value: 'walk',
            icon: 'img:fluent-icons/walking.svg'
          },
          {
            label: 'Custom',
            value: 'custom',
            icon: 'icon-ic_fluent_clock_20_regular'
          },
          {
            label: 'Rest',
            value: 'rest',
            icon: 'icon-ic_fluent_couch_24_regular'
          }
        ],
        others: [
          {
            label: 'Event',
            value: 'event',
            icon: 'icon-ic_fluent_trophy_16_regular'
          },
          {
            label: 'Goals',
            value: 'goals',
            icon: 'icon-ic_fluent_checkmark_16_regular'
          },
          {
            label: 'Note',
            value: 'note',
            icon: 'icon-ic_fluent_notepad_20_regular'
          },
          {
            label: 'Metrics',
            value: 'metrics',
            icon: 'icon-ic_fluent_ruler_20_regular'
          }
        ]
      },
      date: {
        headerOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      }
    }
  },
  methods: {
    selectItem (type, value) {
      this.$emit('itemSelect', {
        type: type,
        value: value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
//break points (as defined in Calendar.vue)
$md: 1200px;
$sm: 850px;
$xs: 750px;
.CIC-Card {
  min-width: 500px;
}

@media (min-width: $xs) {
  .CIC-Card {
    min-width: 0;
  }
}

@media (min-width: $sm) {
  .CIC-Card {
    min-width: 70vw;
  }
}

@media (min-width: $md) {
  .CIC-Card {
    min-width: 60vw;
  }
}

@media (min-width: $sm) {
  .CIC-Card {
    min-width: 70vw;
  }
}

@media (min-width: $md+250px) {
  .CIC-Card {
    min-width: 47vw;
  }
}

a:visited {
  color: blue;
}
</style>
