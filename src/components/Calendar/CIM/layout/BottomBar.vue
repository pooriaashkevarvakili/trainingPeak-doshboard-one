<template>
  <q-bar style="height: 40px;" class="bg-grey-3">
    <q-checkbox v-model="autoCalculatePlanned" dense label="Automatically Calculate Planned Values" size="sm"
                style="font-size: 65%;">
      <q-tooltip>Automatically Calculate Planned Duration, TSS, IF, Distance and Pace</q-tooltip>
    </q-checkbox>

    <q-space/>

    <q-btn v-close-popup class="q-mx-xs q-px-xs" dense label="Delete" unelevated/>
    <q-btn v-close-popup class="q-mx-xs q-px-xs" dense label="Cancel" unelevated/>
    <q-btn v-close-popup class="q-mx-xs" color="primary" label="Save & Close" unelevated/>
  </q-bar>

</template>

<script>
export default {
  name: 'BottomBar',
  data () {
    return {
      autoCalculatePlanned: true
    }
  }
}
</script>

<style scoped>

</style>
