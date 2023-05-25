<!-- =========================================================================================
    File Name: DesktopLayout.vue
    Description: Desktop Layout Component
    Component Name: DesktopLayout
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->

<template>
  <Suspense>
    <q-layout view="lHr lpR lFr">
      <q-space />
      <q-drawer style="background-color: rgba(255,255,255,0.8);" show-if-above v-model="left"
        :side="rtl ? 'left' : 'right'" :mini="drawerMiniState" :mini-to-overlay="breakLayout"
        content-class="nav main-drawer" elevate content-style="border: none; background-color: rgba(255,255,255,0.8)"
        :width="250">
        <q-toolbar style="box-shadow: 0 1px 0 0 rgba(0,0,0,0.15);" :class="breakLayout ? 'q-px-xs' : ''">
          <q-item clickable :dir="rtl ? 'ltr' : 'rtl'" :ripple="false" dense
            class="q-py-sm row items-center justify-center"
            :style="breakLayout ? 'width: 100%;' : 'width: 200px; margin: 0 13px;'">
            <q-item-section avatar>
              <img src="logo-v1.svg" height="24" style="margin-top: auto; margin-bottom: auto;">
            </q-item-section>

          </q-item>
        </q-toolbar>

        <q-list :dir="rtl ? 'ltr' : 'rtl'" :style="breakLayout ? '' : 'padding: 20px 25px 0 25px;'" padding>


          <q-item v-for="(item, index) in mainList" v-bind:key="index" dense class="q-py-sm"
            active-class="text-primary drawer-item-active" clickable v-ripple :to="item.route" exact>
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
        <q-list :dir="rtl ? 'ltr' : 'rtl'" :style="breakLayout ? '' : 'padding: 20px 25px 0 25px;'" padding>
          <q-item clickable v-ripple v-for="(item, index) in othersList" v-bind:key="index"
            active-class="text-primary drawer-item-active" dense class="q-py-sm" :disable="item.disabled" :to="item.route"
            exact>
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
            <q-item-section avatar v-if="index === 0">
              <!-- <q-badge align="middle" color="secondary">
              soon
            </q-badge> -->
            </q-item-section>
          </q-item>
        </q-list>
        <div id="btn-dropdown-up" dir="rtl" class="dropdown btn-dropdown">
          <q-btn-dropdown split no-caps push class="q-ml-xs  btn-dropdown" flat style="border-radius: 5px;"
            :ripple="false" dropdown-icon="icon-ic_fluent_chevron_left_20_regular">
            <template v-slot:label>
              <q-avatar size="40px" class="q-mr-sm">
                <img :src="code && code.headerImageUrl">
              </q-avatar>
              <div class="q-ml-xs" style="text-transform: capitalize;">
                {{ code && code.userName }}
              </div>
            </template>
            <div class="q-pa-md" style="width: 300px; font-size: 90%">
              <q-list dense>
                <q-item to="/profile" class="row justify-start" clickable>
                  <q-icon class="q-mr-md" name="perm_identity" size="sm" />
                  <div style="font-size: 105%">
                    Profile
                  </div>
                </q-item>
                <q-item to="/SignOut" class="row justify-start" clickable>
                  <q-icon class="q-mr-md" name="login" size="sm" />
                  <div style="font-size: 105%">
                    Log out
                  </div>
                </q-item>
              </q-list>
            </div>
          </q-btn-dropdown>
        </div>
      </q-drawer>
      <q-page-container>
        <transition mode="out-in">
          <router-view class="q-py-md q-px-md q-pr-lg bg-transparent transparent" />
        </transition>
      </q-page-container>
    </q-layout>
  </Suspense>
</template>
<script setup>
import axios from 'axios'
import { api } from 'boot/axios'
import { useQuasar } from "quasar"
import { useI18n } from "vue-i18n"
import { ref, reactive, Suspense, computed, watch, onBeforeMount, onMounted } from "vue"
const left = ref(false)
const $q = useQuasar()
const code = ref('')
const errored = ref(false)
const breakPoint = ref(true)
const drawerMiniState = ref(false)
const { t } = useI18n()
const breakLayout = computed(() => {
  return $q.screen.width < breakPoint.value
})
watch(() => {
  $q.screen.width = () => {
    drawerMiniState.value = breakLayout.value
  }
})
onBeforeMount(() => {
  if (breakLayout.value) {
    drawerMiniState.value = true
  }
})
async function routerChange() {
  await axios.get('http://localhost:4000/account', {

  }).then((response) => {
    code.value = response.data


  })
    .catch((error) => {
      console.log(error);
      errored.value = true;
    });
}
const mainList = reactive([

  {
    label: t('layout.drawer.home'),
    icon: 'icon-ic_fluent_home_20_regular',
    route: '/',
    disabled: false
  },

  {
    label: t('layout.drawer.calendar'),
    icon: 'icon-ic_fluent_calendar_ltr_20_regular',
    route: '/Calendar',
    disabled: false
  },
  {
    label: t('layout.drawer.analysis'),
    icon: 'icon-ic_fluent_data_line_20_regular',
    route: '/Analysis',
    disabled: false
  },
  {
    label: t('layout.drawer.sportManagment'),
    icon: 'icon-ic_fluent_people_20_regular',
    route: '/ATP',
    disabled: false
  }
])
const othersList = reactive([
  {
    label: t('layout.drawer.CollectPractive'),
    icon: 'icon-ic_fluent_building_shop_16_regular',
    route: '/collectPractive',
    disabled: false
  },
  {
    label: t('layout.drawer.Strategy'),
    icon: 'icon-ic_fluent_pulse_20_regular',
    route: '/Accounts',
    disabled: false
  },
  {
    label: t('layout.drawer.settings'),
    icon: 'icon-ic_fluent_settings_16_regular',
    route: '/Settings',
    disabled: false
  },

  {
    label: t('layout.drawer.activity'),
    icon: 'icon-ic_fluent_alert_16_regular',
    route: '/activity',
    disabled: false
  },

])
onMounted(() => {
  routerChange()
})
</script>
<style lang="scss" >
@import "../css/Accounts.scss"
</style>
