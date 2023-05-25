<!-- =========================================================================================
    File Name: Monile Layout.vue
    Description: Mobile Layout Component
    Component Name: MobileLayout
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
  <Suspense>
    <q-layout view="hHh lpR fFf">
      <q-toolbar class="s-nav acrylic" v-if="!isHorizontal" style="position:fixed; top: 0; z-index: 192312931823;">
        <q-toolbar-title class="q-ml-xs">
          Dashboard
        </q-toolbar-title>
      </q-toolbar>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-drawer v-model="nav.horizontal" show-if-above v-if="isHorizontal" :mini="nav.mini" mini-to-overlay
        :mini-width="56" :width="200" :breakpoint="500" content-class="s-nav acrylic">
        <q-scroll-area class="fit">
          <q-list>
            <q-item clickable @click="nav.mini = !nav.mini">
              <q-item-section avatar>
                <q-icon name="icon-ic_fluent_navigation_20_regular" />
              </q-item-section>
            </q-item>

            <q-item v-for="(item, index) in [...mainList, ...othersList]" v-bind:key="index" :to="item.route" exact
              clickable active-class="nav-item-active">
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                {{ item.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-footer v-if="nav.footer && !isHorizontal" class="transparent">
        <bottom-nav v-touch-swipe.mouse.up="handleSwipe" @drawerClicked="handleSwipe" />
      </q-footer>
      <q-dialog v-model="nav.show" position="bottom" @before-hide="hide()" style="width: 100vw !important;">
        <bottom-nav v-touch-swipe.mouse.down="handleSwipe" @drawerClicked="handleSwipe"
          style="width: 100vw !important;" />
        <q-card class="full-width s-nav acrylic" flat square style="width: 100vw !important;">

          <q-list>
            <q-item v-for="(item, index) in mobileMenuExtra" v-bind:key="index" v-ripple active-class="nav-item-active"
              class="q-py-md" clickable exact style="border-bottom: 1px solid #cbcbcb;">
              <q-item-section :style="{ 'padding-left': `${nav.left}px` }" avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                {{ item.label }}
              </q-item-section>

            </q-item>
          </q-list>
        </q-card>
      </q-dialog>
    </q-layout>
  </Suspense>
</template>
<script setup>
import BottomNav from '../components/Mobile/BottomNav.vue'
import { ref, watch, computed, onMounted, Suspense } from "vue"
import { useQuasar } from 'quasar'
const $q = useQuasar()
const mainList = [
  {
    label: 'Dashboard',
    icon: 'icon-ic_fluent_home_20_regular',
    route: '/',
    disabled: false
  },
  {
    label: 'Calendar',
    icon: 'icon-ic_fluent_calendar_ltr_20_regular',
    route: '/Calendar',
    disabled: false
  },
  {
    label: 'Analysis',
    icon: 'icon-ic_fluent_data_line_20_regular',
    route: '',
    disabled: false
  },
  {
    label: 'ATP',
    icon: 'icon-ic_fluent_pulse_20_regular',
    route: '',
    disabled: false
  }
]
const othersList = [
  {
    label: 'Marketplace',
    icon: 'icon-ic_fluent_building_shop_16_regular',
    route: '',
    disabled: true
  },
  {
    label: 'Settings',
    icon: 'icon-ic_fluent_settings_16_regular',
    route: '/Settings',
    disabled: false
  },
  {
    label: 'Accounts',
    icon: 'icon-ic_fluent_people_16_regular',
    route: '',
    disabled: false
  },
  {
    label: 'Help',
    icon: 'icon-ic_fluent_question_circle_16_regular',
    route: '',
    disabled: false
  }
]
const mobileMenuExtra = [...mainList.slice(3), ...othersList]
const show = ref(false)
const mini = ref(true)
const horizontal = ref(false)
const footer = ref(true)
const left = ref(0)
const forceClose = ref(false)
function getFirstElementLeft() {
  if ($q.screen.width >= 600) { return 51 }
  return document.getElementById('firstIcon').offsetLeft - 11
}
function handleSwipe() {
  nav.value.footer = !nav.value.footer
  nav.value.show = !nav.value.show
}
function show() {
  nav.value.footer = false
  nav.value.show = true
}
function hide() {
  nav.value.footer = true
  nav.value.show = false
}
watch(() => {
  $q.screen.width = () => {
    nav.value.left = getFirstElementLeft()
  }
})
isHorizontal = computed(() => {
  return $q.screen.width > $q.screen.height

})
onMounted(() => {
  nav.value.left = getFirstElementLeft()
})
</script>
<style lang="scss">
@import "../css/MobileLayout"
</style>
