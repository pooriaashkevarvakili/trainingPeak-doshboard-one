<template>
  <q-tabs
      :value="selected"
      active-bg-color="primary text-white"
      align="center"
      class="row justify-center"
      dense
      indicator-color="transparent"
      mobile-arrows
      outside-arrows
      vertical
      @input="$emit('tab-selected', $event)"
  >
    <q-tab class="col" icon="icon-ic_fluent_notepad_20_regular" name="summary">
      <q-tooltip>Summary</q-tooltip>
    </q-tab>
    <q-tab class="col " icon="icon-ic_fluent_data_line_24_regular" name="graph">
      <q-tooltip>Map & Graph</q-tooltip>
    </q-tab>
    <q-tab class="col" icon="icon-ic_fluent_heart_20_regular" name="heartrate">
      <q-tooltip>Heart Rate</q-tooltip>
    </q-tab>
    <q-tab class="col" icon="icon-ic_fluent_pulse_20_regular" name="power">
      <q-tooltip>Power</q-tooltip>
    </q-tab>
    <q-tab class="col" icon="icon-ic_fluent_top_speed_20_regular" name="speed">
      <q-tooltip>Speed</q-tooltip>
    </q-tab>
  </q-tabs>
</template>

<script>
export default {
  name: 'NavTabs',
  props: {
    selected: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.q-tab {
  background-color: #eeeeee;
  margin-bottom: 1px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

</style>
