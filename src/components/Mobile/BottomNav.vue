<template>
  <q-toolbar class="justify-around s-nav acrylic">
    <q-btn
      v-for="(item, index) in optionsList"
      v-bind:key="index"
      :class="$route.path===item.route ? 'nav-bottom-item-active':''"
      dense
      flat
      color="black"
      :icon="item.icon"
      round
      id="firstIcon"
    />
    <q-btn
      aria-label="Drawer"
      dense
      flat
      color="black"
      icon="icon-ic_fluent_navigation_20_regular"
      round
      @click="$emit('drawerClicked')"
    />
  </q-toolbar>
</template>

<script>
const optionsList = [
  {
    label: 'Dashboard',
    icon: 'icon-ic_fluent_home_20_regular',
    route: '/'
  },
  {
    label: 'Calendar',
    icon: 'icon-ic_fluent_calendar_ltr_20_regular',
    route: '/Calendar'
  },
  {
    label: 'Analysis',
    icon: 'icon-ic_fluent_data_line_20_regular',
    route: ''
  }
]
export default {
  name: 'BottomNav',
  data () {
    return {
      optionsList
    }
  }
}
</script>

<style scoped>

</style>
