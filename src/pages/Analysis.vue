<!-- =========================================================================================
    File Name:Analysis.vue
    Description: Analysis Component
    Component Name: Analysis
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <Suspense>
        <q-page>
            <div class="container" :dir="rtl ? 'ltr' : 'rtl'">

                <q-card v-for="(chart, index) in chartData" :key="index" @click="showChartFullscreen(chart, index)"
                    class="panel" :class="[ECharts.MIXED, ECharts.TABLE].includes(chart.type) ? 'wide-panel' : ''">
                    <div>{{ chart.title }}</div>
                    <MixedChart v-if="chart.type === ECharts.MIXED" :chartData="chart.data"
                        :chartSettings="settings[index]" />
                    <PieChart v-else-if="chart.type === ECharts.PIE" :chartData="chart.data"
                        :chartSettings="settings[index]" />
                    <BarChart v-else-if="chart.type === ECharts.BAR" :chartData="chart.data"
                        :chartSettings="settings[index]" :show-average="!!settings[index]['useComparison']" />
                </q-card>


                <q-dialog full-width full-height content-class="container" v-model="showFull">
                    <q-card v-if="showFull" class="panel bg-white"
                        :class="[ECharts.MIXED, ECharts.TABLE].includes(chartToBeShownInFull['type']) ? 'wide-panel' : ''">
                        <div style="position: absolute; z-index: 1; left: 50%; transform: translateX(-50%); top: 20px;">
                            {{ settings[chartToBeShownInFull.index].title }}</div>
                        <q-btn style="position: absolute; z-index: 1; right: 120px; top: 20px;"
                            icon="icon-ic_fluent_settings_24_regular" flat dense round>
                            <q-menu content-style="min-width: 300px;">
                                <q-card>
                                    <ChartSettings @updated="updateSettings($event)"
                                        :chart-settings="selectedChartSettings" />
                                </q-card>
                            </q-menu>
                        </q-btn>
                        <q-btn style="position: absolute; z-index: 1; right: 160px; top: 20px;" v-close-popup
                            icon="icon-ic_fluent_full_screen_minimize_24_regular" flat dense round />
                        <PieChart size="full" style="height: 100%; width: 100%;"
                            v-if="chartToBeShownInFull.type === ECharts.MIXED" :chartData="chartToBeShownInFull.data"
                            :chartSettings="selectedChartSettings" />
                        <pie-chart v-else-if="chartToBeShownInFull['type'] === ECharts.PIE" size="full"
                            style="height: 100%; width: 100%;" :chartData="chartToBeShownInFull.data"
                            :chartSettings="selectedChartSettings" />
                        <BarChart v-else-if="chartToBeShownInFull['type'] === ECharts.BAR" size="full"
                            style="height: 100%; width: 100%;" :chartData="chartToBeShownInFull.data"
                            :chartSettings="selectedChartSettings"
                            :show-average="!!selectedChartSettings['useComparison']" />
                    </q-card>
                </q-dialog>
            </div>

            <q-page-sticky style="margin-right:1160px" :position="rtl ? 'bottom-left' : 'bottom-right'" :offset="[64, 64]">
                <q-btn round color="primary" padding="md" icon="icon-ic_fluent_data_bar_vertical_add_24_regular">
                    <q-menu>
                        <q-list dense style="min-width: 100px; font-size: 90%;">
                            <q-item clickable
                                v-for="(cat, catIndex) in Object.keys(EChartCategories).slice(Object.keys(EChartCategories).length / 2)"
                                :key="catIndex">
                                <q-item-section style="text-transform: capitalize;">{{ cat }}</q-item-section>
                                <q-item-section side>
                                    <q-icon name="icon-ic_fluent_chevron_right_24_regular" size="1rem" />
                                </q-item-section>

                                <q-menu anchor="top end" self="top start">
                                    <q-list>
                                        <q-item
                                            v-for="(item, chartIndex) in availableCharts.filter(c => c.category === catIndex)"
                                            :key="chartIndex" dense style="min-width: 200px; font-size: 90%;" clickable
                                            v-close-popup>
                                            <q-item-section
                                                style="flex-direction: row; justify-content: start; align-items: center;">
                                                <q-icon :name="getChartIcon(item.type)" size="16px" class="q-mx-sm" />
                                                {{ item.title }}
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>

                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-page-sticky>
        </q-page>
    </Suspense>
</template>
<script setup>
import { useCounterStore } from "../stores/example-store"
import { createI18n } from "vue-i18n";
import { EChartsLibrary } from "../components/Charts/Models.js";
import PieChart from '../components/Charts/PieChart.vue'
import BarChart from '../components/Charts/BarChart.vue'
import MixedChart from '../components/Charts/MixedChart.vue'
// import { useStore } from 'vuex'
import ChartSettings from "../components/Charts/ChartSettings.vue";
import { computed, ref, onMounted, Suspense } from 'vue'
const $i18n = createI18n()
const store = useCounterStore()
const routeRoot = 'http://192.168.43.117/analyze/public/v1/athletes/1/'
const settings = ref([])
const chartData = ref([])
const showFull = ref(false)
const chartToBeShownInFull = ref(null)
const selectedChartSettings = ref(null)
function fetchSettings() {
    return new Promise((resolve, reject) => {
        // TODO Fetch settings
        fetch('http://localhost:8000/chartSetting.json').then(res => res.json()).then(settings => {
            resolve(settings)
        }).catch(err => {
            console.error(err)
            reject(err)
        })
    })
}
function fetchChartData(athleteID, type) {
    return new Promise((resolve, reject) => {
        // TODO Fetch Data
        switch (type) {
            case 32:
                fetch('http://localhost:8000/mixedChartData.json').then(res => res.json())
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        console.error(err)
                        reject(err)
                    })
                break;
            case 24:
                fetch('http://localhost:8000/timeInPowerZones.json').then(res => res.json())
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        console.error(err)
                        reject(err)
                    })
                break;
            case 8:
                fetch('http://localhost:8000/Longest_duration.json').then(res => res.json())
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        console.error(err)
                        reject(err)
                    })
                break;
        }
    })
}
function showChartFullscreen(chart, index) {
    chartToBeShownInFull.value = { ...chart, index: index };
    selectedChartSettings.value = settings.value[index];
    console.log('chart', this.chartToBeShownInFull)
    showFull.value = true;
}
function getChartIcon(type) {
    return chartIcons.find(c => c.type === type).icon
}
function updateSettings(newVal) {
    console.log('new settings have been recieved', newVal.index, newVal)
    settings(settings.value, newVal.index, newVal)
    console.log(settings[0].value)
}
const ECharts = computed(() => {
    return EChartsLibrary
})
const rtl = computed(() => {
    return $i18n.locale === 'fa-ir'
})
const EChartCategories = computed(() => store.getChartCategories)
const availableCharts = computed(() => store.getAnalysisCharts)
const selectedCharts = computed(() => store.getAnalysisSelectedCharts)
const EChartTypes = computed(() => store.getChartTypes)
const chartIcons = computed(() => store.getChartIcons)
onMounted(() => {
    fetchSettings().then(s => {
        settings.value = s;
        fetchChartData(1, 32).then(d => { //32 for Performance Management
            chartData.value.push({
                type: EChartsLibrary.MIXED,
                data: d
            })
        })
        fetchChartData(1, 24).then(d => { //24 for Time in Power Zones
            chartData.value.push({
                type: EChartsLibrary.BAR,
                data: d
            })
        })
        fetchChartData(1, 8).then(d => { //8 for Longest Workout
            chartData.value.push({
                type: EChartsLibrary.BAR,
                data: d
            })
        })
    })
})
</script>
<style lang="scss" scoped>
@import "../css/Analysis.scss"
</style>