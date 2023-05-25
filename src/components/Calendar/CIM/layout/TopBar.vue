<template>
  <q-bar style="height: 40px;" class="bg-grey-3">
    <q-item class="q-px-xs q-py-none" clickable dense style="font-size: 80%;">
      <div class="self-center">
        {{ selectedDate.toLocaleDateString('en-uk', time.header.options) }}
      </div>
      <q-tooltip>Set Date</q-tooltip>
    </q-item>
    <q-item class="q-px-xs" clickable dense style="font-size: 75%;">
      <div class="self-center">
        {{ selectedDate ? selectedDate.toLocaleTimeString() : time.selected.value }}
      </div>
      <q-popup-proxy transition-hide="scale" transition-show="scale">
        <q-time
            v-model="time.selected.value"
        />
      </q-popup-proxy>
      <q-tooltip>Set Time</q-tooltip>
    </q-item>

    <q-space/>

    <q-btn v-close-popup dense flat icon="icon-ic_fluent_settings_20_regular">
      <q-tooltip>Settings</q-tooltip>
    </q-btn>
    <q-btn v-close-popup dense flat icon="icon-ic_fluent_navigation_20_regular">
      <q-tooltip>Menu</q-tooltip>
    </q-btn>
    <q-btn v-close-popup dense flat icon="icon-ic_fluent_full_screen_maximize_24_regular">
      <q-tooltip>Fullscreen</q-tooltip>
    </q-btn>
    <q-btn v-close-popup dense flat>
      <img src="/fluent-icons/close.svg"/>
      <q-tooltip>Close</q-tooltip>
    </q-btn>
  </q-bar>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    selectedDate: {
      required: false,
      type: Date,
      default: 'Select Date '
    }
  },
  data () {
    return {
      time: {
        header: {
          options: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
        },
        selected: {
          value: 'Select Time '
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
