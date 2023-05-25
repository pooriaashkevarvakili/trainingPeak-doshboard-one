<template>
  <div dir="rtl" class="chart-settings">
    <div v-if="chartType === 32">
      <q-card-section :dir="rtl ? 'rtl' : 'ltr'" style="padding: 8px 16px 8px 16px;">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.customTitle') }}: </span>
        <q-input v-model="settingsData.title" dense class="q-input-dense q-mt-sm" outlined />
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.dateOptions.title') }}:</span>
        <q-select class="q-mt-sm" outlined dense options-dense :popup-content-style="`direction: ${rtl ? 'rtl' : 'ltr'}`"
          v-model="settingsData.dateOptions.quickDateSelectOption" map-options emit-value :options="dateOptions" />
        <div v-if="dateIsCustom" style="margin: 8px 0;">
          <span style="display: flex; align-items: center; justify-content: space-between;">{{
            $t('pages.analysis.settings.dateOptions.from') }} <q-input type="date" class="q-input-dense" dense outlined
              v-model="settingsData.dateOptions.startDate" /></span>
          <span style="display: flex; align-items: center; justify-content: space-between;">{{
            $t('pages.analysis.settings.dateOptions.to') }}
            <q-input type="date" class="q-input-dense" dense outlined v-model="settingsData.dateOptions.endDate" /></span>
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.workouts.title') }}: </span><br />
        <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px; padding: 8px 0;" dir="ltr">
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="1" :left-label="rtl"
            :label="$t('activities.running.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="2" :left-label="rtl"
            :label="$t('activities.fitness.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="3" :left-label="rtl"
            :label="$t('activities.cycling.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="0" :left-label="rtl"
            :label="$t('pages.analysis.settings.workouts.all')" />
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.constants.title') }}: </span>
        <div style="display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 20px; grid-row-gap: 5px;"
          class="q-mt-sm">
          <span>{{ $t('pages.analysis.settings.constants.atlValue') }} <q-input dense class="q-input-dense" outlined
              v-model="settingsData.atlConstant" /></span>
          <span>{{ $t('pages.analysis.settings.constants.atlStart') }} <q-input dense class="q-input-dense" outlined
              v-model="settingsData.atlStartValue" /></span>
          <span>{{ $t('pages.analysis.settings.constants.ctlStart') }} <q-input dense class="q-input-dense" outlined
              v-model="settingsData.ctlStartValue" /></span>
          <span>{{ $t('pages.analysis.settings.constants.ctlValue') }} <q-input dense class="q-input-dense" outlined
              v-model="settingsData.ctlConstant" /></span>
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.misc.title') }}: </span><br />
        <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px; padding: 8px 0;" dir="ltr">
          <q-checkbox dense v-model="settingsData.showTSBFill" :left-label="rtl"
            :label="$t('pages.analysis.settings.misc.showTSBFill')" />
          <q-checkbox dense v-model="settingsData.showTSSPerDay" :left-label="rtl"
            :label="$t('pages.analysis.settings.misc.showTSS')" />
          <q-checkbox dense v-model="settingsData.showSecondAtlSeries" :left-label="rtl"
            :label="$t('pages.analysis.settings.misc.showSecondATL')" />
          <q-checkbox dense v-model="settingsData.showIntensityFactorPerDay" :left-label="rtl"
            :label="$t('pages.analysis.settings.misc.showIF')" />
        </div>
      </q-card-section>
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <q-btn :label="$t('pages.analysis.settings.cancel')" outline no-caps dense class="q-px-md" />
        <q-btn :label="$t('pages.analysis.settings.save')" @click="postChartSettings()" color="primary" unelevated no-caps
          dense class="q-px-md q-mx-sm" />
      </q-card-section>
    </div>
    <div v-if="chartType === 24">
      <q-card-section :dir="rtl ? 'rtl' : 'ltr'" style="padding: 8px 16px 8px 16px;">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.customTitle') }}: </span>
        <q-input v-model="settingsData.title" dense class="q-input-dense q-mt-sm" outlined />
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.dateOptions.title') }}:</span>
        <q-select class="q-mt-sm" outlined dense options-dense :popup-content-style="`direction: ${rtl ? 'rtl' : 'ltr'}`"
          v-model="settingsData.dateOptions.quickDateSelectOption" map-options emit-value :options="dateOptions" />
        <div v-if="dateIsCustom" style="margin: 8px 0;">
          <span style="display: flex; align-items: center; justify-content: space-between;">{{
            $t('pages.analysis.settings.dateOptions.from') }} <q-input type="date" class="q-input-dense" dense outlined
              v-model="settingsData.dateOptions.startDate" /></span>
          <span style="display: flex; align-items: center; justify-content: space-between;">{{
            $t('pages.analysis.settings.dateOptions.to') }}
            <q-input type="date" class="q-input-dense" dense outlined v-model="settingsData.dateOptions.endDate" /></span>
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.workouts.title') }}: </span><br />
        <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px; padding: 8px 0;" dir="ltr">
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="1" :left-label="rtl"
            :label="$t('activities.running.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="3" :left-label="rtl"
            :label="$t('activities.fitness.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="2" :left-label="rtl"
            :label="$t('activities.cycling.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="0" :left-label="rtl"
            :label="$t('pages.analysis.settings.workouts.all')" />
        </div>
      </q-card-section>
      <q-separator :inset="true" />
    </div>
    <div v-if="chartType === 8">
      <q-card-section :dir="rtl ? 'rtl' : 'ltr'" style="padding: 8px 16px 8px 16px;">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.customTitle') }}: </span>
        <q-input v-model="settingsData.title" dense class="q-input-dense q-mt-sm" outlined />
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.dateOptions.title') }}:</span>
        <q-select class="q-mt-sm" outlined dense options-dense :popup-content-style="`direction: ${rtl ? 'rtl' : 'ltr'}`"
          v-model="settingsData.dateOptions.quickDateSelectOption" map-options emit-value :options="dateOptions" />
        <div v-if="dateIsCustom" style="margin: 8px 0;">
          <span style="display: flex; align-items: center; justify-content: space-between;">{{
            $t('pages.analysis.settings.dateOptions.from') }} <q-input type="date" class="q-input-dense" dense outlined
              v-model="settingsData.dateOptions.startDate" /></span>
          <span style="display: flex; align-items: center; justify-content: space-between;">{{
            $t('pages.analysis.settings.dateOptions.to') }}
            <q-input type="date" class="q-input-dense" dense outlined v-model="settingsData.dateOptions.endDate" /></span>
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.workouts.title') }}: </span><br />
        <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px; padding: 8px 0;" dir="ltr">
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="1" :left-label="rtl"
            :label="$t('activities.running.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="3" :left-label="rtl"
            :label="$t('activities.fitness.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="2" :left-label="rtl"
            :label="$t('activities.cycling.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="0" :left-label="rtl"
            :label="$t('pages.analysis.settings.workouts.all')" />
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.workouts.title') }}: </span><br />
        <div style="padding: 8px 0;" dir="ltr">
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="1" :left-label="rtl" label="نمایش میانگین" />
        </div>
      </q-card-section>
    </div>
    <div v-if="chartType === 30">
      <q-card-section :dir="rtl ? 'rtl' : 'ltr'" style="padding: 8px 16px 8px 16px;">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.customTitle') }}: </span>
        <q-input v-model="settingsData.title" dense class="q-input-dense q-mt-sm" outlined />
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.dateOptions.title') }}:</span>
        <q-select class="q-mt-sm" outlined dense options-dense :popup-content-style="`direction: ${rtl ? 'rtl' : 'ltr'}`"
          v-model="settingsData.dateOptions.quickDateSelectOption" map-options emit-value :options="dateOptions" />
        <div v-if="dateIsCustom" style="margin: 8px 0;">
          <span style="display: flex; align-items: center; justify-content: space-between;">{{
            $t('pages.analysis.settings.dateOptions.from') }} <q-input type="date" class="q-input-dense" dense outlined
              v-model="settingsData.dateOptions.startDate" /></span>
          <span style="display: flex; align-items: center; justify-content: space-between;">{{
            $t('pages.analysis.settings.dateOptions.to') }}
            <q-input type="date" class="q-input-dense" dense outlined v-model="settingsData.dateOptions.endDate" /></span>
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.workouts.title') }}: </span><br />
        <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px; padding: 8px 0;" dir="ltr">
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="1" :left-label="rtl"
            :label="$t('activities.running.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="2" :left-label="rtl"
            :label="$t('activities.fitness.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="0" :left-label="rtl"
            :label="$t('pages.analysis.settings.workouts.all')" />
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.constants.title') }}: </span>
        <div style="display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 20px; grid-row-gap: 5px;"
          class="q-mt-sm">
          <span>{{ $t('pages.analysis.settings.constants.atlValue') }} <q-input dense class="q-input-dense" outlined
              v-model="settingsData.atlConstant" /></span>
          <span>{{ $t('pages.analysis.settings.constants.ctlStart') }} <q-input dense class="q-input-dense" outlined
              v-model="settingsData.ctlStartValue" /></span>
          <span>{{ $t('pages.analysis.settings.constants.ctlValue') }} <q-input dense class="q-input-dense" outlined
              v-model="settingsData.ctlConstant" /></span>
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.misc.title') }}: </span><br />
        <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px; padding: 8px 0;" dir="ltr">
          <q-checkbox dense v-model="settingsData.showTSBFill" :left-label="rtl"
            :label="$t('pages.analysis.settings.misc.showTSBFill')" />
          <q-checkbox dense v-model="settingsData.showTSSPerDay" :left-label="rtl"
            :label="$t('pages.analysis.settings.misc.showTSS')" />
          <q-checkbox dense v-model="settingsData.showIntensityFactorPerDay" :left-label="rtl"
            :label="$t('pages.analysis.settings.misc.showIF')" />
        </div>
      </q-card-section>
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <q-btn :label="$t('pages.analysis.settings.cancel')" outline no-caps dense class="q-px-md" />
        <q-btn :label="$t('pages.analysis.settings.save')" @click="postChartSettings()" color="primary" unelevated no-caps
          dense class="q-px-md q-mx-sm" />
      </q-card-section>
    </div>
    <div v-if="chartType === 7">
      <q-card-section :dir="rtl ? 'rtl' : 'ltr'" style="padding: 8px 16px 8px 16px;">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.customTitle') }}: </span>
        <q-input v-model="settingsData.title" dense class="q-input-dense q-mt-sm" outlined />
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.dateOptions.title') }}:</span>
        <q-select class="q-mt-sm" outlined dense options-dense :popup-content-style="`direction: ${rtl ? 'rtl' : 'ltr'}`"
          v-model="settingsData.dateOptions.quickDateSelectOption" map-options emit-value :options="dateOptions" />
        <div v-if="dateIsCustom" style="margin: 8px 0;">
          <span style="display: flex; align-items: center; justify-content: space-between;">{{
            $t('pages.analysis.settings.dateOptions.from') }} <q-input type="date" class="q-input-dense" dense outlined
              v-model="settingsData.dateOptions.startDate" /></span>
          <span style="display: flex; align-items: center; justify-content: space-between;">{{
            $t('pages.analysis.settings.dateOptions.to') }}
            <q-input type="date" class="q-input-dense" dense outlined v-model="settingsData.dateOptions.endDate" /></span>
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.workouts.title') }}: </span><br />
        <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px; padding: 8px 0;" dir="ltr">
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="1" :left-label="rtl"
            :label="$t('activities.running.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="2" :left-label="rtl"
            :label="$t('activities.cycling.name')" />
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="0" :left-label="rtl"
            :label="$t('pages.analysis.settings.workouts.all')" />
        </div>
      </q-card-section>
      <q-separator :inset="true" />
      <q-card-section style="padding: 8px 16px 8px 16px;" :dir="rtl ? 'rtl' : 'ltr'">
        <span style="font-weight: bold;">{{ $t('pages.analysis.settings.workouts.title') }}: </span><br />
        <div style="padding: 8px 0;" dir="ltr">
          <q-checkbox dense v-model="settingsData.workoutTypeIds" val="1" :left-label="rtl" label="نمایش میانگین" />
        </div>
      </q-card-section>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useI18n, createI18n } from 'vue-i18n'
const emit = defineEmits([
  'updated'
])
const props = defineProps({
  chartSettings: { required: true }
})
const $t = useI18n()
const $i18n = createI18n()
const settingsData = JSON.parse(JSON.stringify(this.chartSettings))
const savingData = ref(false)
function postChartSettings() {
  this.savingData = true;
  setTimeout(() => {
    this.savingData = false;
    this.emitNewSettings();
  }, 2000)
}
const emitNewSettings = computed(() => {
  emit('updated', JSON.parse(JSON.stringify(this.settingsData)))

})
const rtl = computed(() => {
  return $i18n.locale === 'fa-ir'
})
const chartType = computed(() => {
  return settingsData.value.chartType
})
const dateIsCustom = computed(() => {
  return [2, 22].includes(settingsData.dateOptions.quickDateSelectOption)

})
const customDateRange = computed(() => {
  const start = new Date(settingsData.dateOptions.startDate);
  const end = new Date(settingsData.dateOptions.endDate);
  return {
    from: [start.getFullYear(), ('0' + (start.getMonth() + 1)).slice(-2), ('0' + (start.getDate())).slice(-2)].join('-'),
    to: [end.getFullYear(), ('0' + (end.getMonth() + 1)).slice(-2), ('0' + (end.getDate())).slice(-2)].join('-')
  }
})
const dateOptions = computed(() => [
  { value: 1, label: $t('pages.analysis.settings.dateOptions.dates.useDashboard') },
  { value: 2, label: $t('pages.analysis.settings.dateOptions.dates.custom') },
  { value: 22, label: $t('pages.analysis.settings.dateOptions.dates.customThrough') },
  { value: 3, label: $t('pages.analysis.settings.dateOptions.dates.last7') },
  { value: 4, label: $t('pages.analysis.settings.dateOptions.dates.last14') },
  { value: 5, label: $t('pages.analysis.settings.dateOptions.dates.last28') },
  { value: 6, label: $t('pages.analysis.settings.dateOptions.dates.last90') },
  { value: 7, label: $t('pages.analysis.settings.dateOptions.dates.last180') },
  { value: 8, label: $t('pages.analysis.settings.dateOptions.dates.last365') },
  { value: 730, label: $t('pages.analysis.settings.dateOptions.dates.last730') },
  { value: 9, label: $t('pages.analysis.settings.dateOptions.dates.thisWeek') },
  { value: 10, label: $t('pages.analysis.settings.dateOptions.dates.thisMonth') },
  { value: 11, label: $t('pages.analysis.settings.dateOptions.dates.thisYear') },
  { value: 12, label: $t('pages.analysis.settings.dateOptions.dates.lastWeek') },
  { value: 13, label: $t('pages.analysis.settings.dateOptions.dates.lastMonth') },
  { value: 14, label: $t('pages.analysis.settings.dateOptions.dates.last3Months') },
  { value: 15, label: $t('pages.analysis.settings.dateOptions.dates.lastYear') },
  { value: 16, label: $t('pages.analysis.settings.dateOptions.dates.last2Years') },
  { value: 17, label: $t('pages.analysis.settings.dateOptions.dates.thisWeekLastYear') },
  { value: 18, label: $t('pages.analysis.settings.dateOptions.dates.thisMonthLastYear') },
  { value: 24, label: $t('pages.analysis.settings.dateOptions.dates.nextWeek') },
  { value: 19, label: $t('pages.analysis.settings.dateOptions.dates.last28andNext7') },
  { value: 20, label: $t('pages.analysis.settings.dateOptions.dates.last90andNext21') },
  { value: 21, label: $t('pages.analysis.settings.dateOptions.dates.last180andNext45') },
  { value: 23, label: $t('pages.analysis.settings.dateOptions.dates.customThroughNext7') }
])
</script>


<style lang="scss" scoped>
@import "../../css/chartSetting.scss"
</style>
