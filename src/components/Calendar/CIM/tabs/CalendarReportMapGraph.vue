<template>
  <div>
    <v-map :center="[-1.3912272, 19.91797504]" :path="mapPath.coordinates" :zoom="14" style="height: 175px;" class="q-mb-sm"/>
    <v-graph :data="graphData" height="175px" class="q-mb-md"/>
  </div>
</template>

<script>
import CalendarItemMap from 'components/Calendar/CIM/CalendarItemMap.vue'
import CalendarItemGraph from 'components/Calendar/CIM/CalendarItemGraph.vue'

export default {
  name: 'CalendarReportMapGraph',
  props: {
    mapPath: {
      required: true
    },
    graphData: {
      required: true
    }
  },
  components: {
    'v-map': CalendarItemMap,
    'v-graph': CalendarItemGraph
  }
}
</script>

<style scoped>

</style>
