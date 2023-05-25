<template>
  <div>
    <q-carousel v-model="page" animated class="fit bg-transparent" infinite swipeable transition-next="jump-left"
      transition-prev="jump-right">
      <q-carousel-slide class="no-padding" name="today">
        <q-card-section :dir="rtl ? 'rtl' : 'ltr'">
          {{ code && convertDateToMiladi(code[0].nutritionDate) }} امروز
          <div class="float-right" dir="ltr">

            <q-btn class="q-mx-xs" dense flat icon="icon-ic_fluent_chevron_left_16_regular" round size="sm"
              @click="page = 'tomorrow'" />
            <q-btn dense flat icon="icon-ic_fluent_chevron_right_16_regular" round size="sm" @click="page = 'tomorrow'" />
          </div>
        </q-card-section>
        <q-list>
          <q-item class="no-padding column" clickable>
            <q-card-section class="row">
              <div class="full-width">

                <q-icon name="pool" size="sm" />
                <span class="q-ml-sm text-weight-bold">Swimming</span>
              </div>
              <span style="font-size: 90%; margin-left: 32px;">3:46:47 - {{ codeone && codeone[0].tssPlanned }} km - {{
                codeone &&
                codeone[0].tssActual }} TSS</span>
              <WB :workoutPlan="workoutPlan" :detailed="false"
                :style="{ 'height': '40px', 'min-width': '100%', 'max-width': '100%' }" />
            </q-card-section>
          </q-item>
          <q-item class="no-padding column" clickable>
            <q-card-section class="row">
              <div class="full-width q-mb-xs">
                <q-icon name="directions_run" size="sm" />
                <span class="q-ml-sm text-weight-bold">Running</span>
              </div>
              <span style="font-size: 90%; margin-left: 32px;">3:46:47 - {{ codeone && codeone[0].tssPlanned }} km - {{
                codeone &&
                codeone[0].tssActual }}
                TSS</span>
              <WB :workoutPlan="workoutPlan" :detailed="false"
                :style="{ 'height': '40px', 'min-width': '100%', 'max-width': '100%' }" />
            </q-card-section>
          </q-item>
        </q-list>
      </q-carousel-slide>
      <q-carousel-slide class="no-padding" name="tomorrow">
        <q-card-section :dir="rtl ? 'rtl' : 'ltr'">
          {{ $t('components.plans.tomorrow') }}
          <div class="float-right" dir="ltr">
            <q-btn class="q-mx-xs" dense flat icon="icon-ic_fluent_chevron_left_16_regular" round size="sm"
              @click="page = 'today'" />
            <q-btn dense flat icon="icon-ic_fluent_chevron_right_16_regular" round size="sm" @click="page = 'today'" />
          </div>
        </q-card-section>
        <q-list>
          <q-item class="no-padding column" clickable>
            <q-card-section class="row">
              <div class="full-width">
                <q-icon name="pool" size="sm" />
                <span class="q-ml-sm text-weight-bold">Swimming</span>
              </div>
              <span style="font-size: 90%; margin-left: 32px;">3:46:47 - {{ codeone && codeone[0].tssPlanned }} km - {{
                codeone &&
                codeone[0].tssActual }}
                TSS</span>
              <WB :workoutPlan="workoutPlan" :detailed="false"
                :style="{ 'height': '40px', 'min-width': '100%', 'max-width': '100%' }" />
            </q-card-section>
          </q-item>
        </q-list>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script setup>
import { api } from "boot/axios"
import WB from 'components/WorkoutBlocks.vue'
import WorkoutBuilder from 'components/Calendar/CIM/workout-builder/WorkoutBuilder'
import { onMounted, computed, ref } from 'vue'
import { createI18n } from 'vue-i18n'
const page = ref('today')
const code = ref('')
const codeone = ref('')
const errored = ref(false)
const erroredOne = ref(false)
const $i18n = createI18n()
const workoutPlan = ref([])
const rtl = computed(() => {
  return $i18n.locale === 'fa'
})
async function nutrition() {
  await api.get(
    'athletes/reporting/nutrition')
    .then((response) => {
      code.value = response.data
    })
    .catch((error) => {

      errored.value = true;
    });
}
async function nutritionTss() {
  await api.post(
    'athletes/reporting/performancedata')
    .then((response) => {
      codeone.value = response.data
      console.log(response.data);
    })
    .catch((error) => {

      erroredOne.value = true;
    });
}
function convertDateToMiladi(date) {
  let options = { year: 'numeric', month: 'numeric', day: 'numeric' };

  let convertDate = new Date(date).toLocaleDateString('fa-IR', options);
  return convertDate
}
onMounted(() => {
  const blockTypes = WorkoutBuilder.types
  workoutPlan.value.push(WorkoutBuilder.build(blockTypes.WARMUP))
  workoutPlan.value.push(WorkoutBuilder.build(blockTypes.RAMPUP))
  workoutPlan.value.push(WorkoutBuilder.build(blockTypes.ACTIVE))
  workoutPlan.value.push(WorkoutBuilder.build(blockTypes.TWOREPEATS))
  nutrition()
  nutritionTss()
})


</script>
<style scoped lang="scss">
.q-card__section[dir='rtl'] {
  .float-right {
    float: left !important;
  }
}
</style>
