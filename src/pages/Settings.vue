<!-- =========================================================================================
    File Name: Setting.vue
    Description: Setting Component
    Component Name: Settings
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->

<template>
    <Suspense>
        <q-page class="q-pr-xl ">
            <div dir="rtl" style="font-size: 24px;font-family: farsi-bold;">تنظیمات</div>
            <div class="q-mt-xl">
                <q-card class="row bg-transparent" dir="auto">
                    <q-list style="background-color:rgba(255, 255, 255, 0.95)" class="nav settings-nav" padding>
                        <q-item v-for="(item, index) in settingsListOne" v-bind:key="index" dense class="q-py-sm"
                            active-class="text-primary" :active="section === item.label" clickable v-ripple
                            @click="sectionChosen(item, true)">
                            <q-item-section avatar :class="$i18n.locale === 'fa-ir' ? 'q-ml-md' : ''">
                                <q-icon :name="item.icon" />
                            </q-item-section>
                            <q-item-section>{{ item.label }}</q-item-section>
                        </q-item>
                    </q-list>
                    <div class="col bg-white" id="settings-scrollbar" @scroll="sectionChosen(undefined, false)"
                        style="flex: 1; max-height: calc(95vh - 96px); padding: 0 32px 0 16px; overflow-y: scroll;">
                        <div :ref="settingsListOne && settingsListOne[0].label" class="section">
                            <h2>{{ settingsListOne && settingsListOne[0].label }}</h2>

                            <div class="sub-section">
                                <div>
                                    <h3>{{ $t('pages.settings.general.sections.lang.title') }}</h3>
                                    <h4>{{ $t('pages.settings.general.sections.lang.subtitle') }}</h4>
                                </div>
                                <q-select @input="$i18n.locale = models.general.lang.value" outlined
                                    v-model="models.general.lang" :options="models.general.options" dense options-dense />
                            </div>
                        </div>
                        <div :ref="settingsListOne && settingsListOne[1].label" class="section">
                            <h2>{{ settingsListOne && settingsListOne[1].label }}</h2>

                            <div class="sub-section">
                                <div>
                                    <h3>{{ $t('pages.settings.appearance.sections.theme.title') }}</h3>
                                    <h4>{{ $t('pages.settings.appearance.sections.theme.subtitle') }}</h4>
                                </div>

                                <q-btn-toggle dir="ltr" v-model="$q.dark.isActive" toggle-color="primary" outline :options="[
                                    { label: $t('pages.settings.appearance.sections.theme.light'), value: false },
                                    { label: $t('pages.settings.appearance.sections.theme.dark'), value: true }
                                ]" />
                            </div>
                        </div>
                        <div :ref="settingsListOne && settingsListOne[2].label" class="section">
                            <h2>{{ settingsListOne && settingsListOne[2].label }}</h2>

                            <div class="sub-section" style="flex-flow: column;">
                                <div>
                                    <h3>ضربان قلب</h3>
                                    <h4>ضربان قلب پیشفرض</h4>
                                </div>

                                <q-separator style="margin-top: 8px;" />

                                <div style="padding: 0 32px;">
                                    <h4>مقادیر آستانه ای</h4>

                                    <div style="display: flex; justify-content: space-between;">
                                        <div class="zone-details">
                                            <div>آستانه ضربان قلب</div>
                                            <q-input outlined dense v-model="zones.heartRate.threshold" />
                                        </div>
                                        <div class="zone-details">
                                            <div>حداکثر ضربان قلب</div>
                                            <q-input outlined dense v-model="zones.heartRate.max" />
                                        </div>
                                        <div class="zone-details">
                                            <div>ضربان قلب در استراحت</div>
                                            <q-input outlined dense v-model="zones.heartRate.max" />
                                        </div>
                                    </div>
                                </div>

                                <q-separator style="margin: 16px 0;" />

                                <div style="display: flex; flex-flow: column; padding: 0 32px;">

                                    <div class="zone-data" v-for="(zone, index) in zones.heartRate.zones" :key="index"
                                        style="display: flex;">
                                        <q-input style="min-width: 350px;" outlined dense v-model="zone.name" />
                                        <span class="q-mx-md q-my-auto">از</span>
                                        <q-input style="max-width: 100px;" outlined dense v-model="zone.from" />
                                        <span class="q-mx-md q-my-auto">تا</span>
                                        <q-input style="max-width: 100px;" outlined dense v-model="zone.to" />
                                        <q-btn flat round>
                                            <img src="/fluent-icons/close.svg" />
                                        </q-btn>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div :ref="settingsListOne && settingsListOne[3].label" class="section">
                            <h2>{{ settingsListOne && settingsListOne[3].label }}</h2>
                        </div>
                        <div :ref="settingsListOne && settingsListOne[4].label" class="section">
                            <h2>{{ settingsListOne && settingsListOne[4].label }}</h2>
                        </div>
                        <div :ref="settingsListOne && settingsListOne[5].label" class="section">
                            <h2>{{ settingsListOne && settingsListOne[5].label }}</h2>
                        </div>
                    </div>
                </q-card>
            </div>

        </q-page>
    </Suspense>
</template>
<script>
import { useI18n } from "vue-i18n"
export default {
    setup() {
        const { t } = useI18n()
        const settingsList = [
            {
                label: t('pages.settings.general.title'),
                icon: 'icon-ic_fluent_settings_16_regular',
                disabled: false
            },
            {
                label: t('pages.settings.appearance.title'),
                icon: 'icon-ic_fluent_color_20_regular',
                disabled: false
            },
            {
                label: t('pages.settings.zones.title'),
                icon: 'icon-ic_fluent_target_24_regular',
                disabled: false
            },
            {
                label: t('pages.settings.calendar.title'),
                icon: 'icon-ic_fluent_calendar_ltr_20_regular',
                disabled: false
            },
            {
                label: t('pages.settings.charts.title'),
                icon: 'icon-ic_fluent_data_histogram_24_regular',
                disabled: false
            },
            {
                label: t('pages.settings.payments.title'),
                icon: 'icon-ic_fluent_payment_20_regular',
                disabled: false
            }
        ]
        return {
            settingsList, t,
            section: settingsList && settingsList[0].label,
        }
    },
    methods: {
        sectionChosen(item, jump) {
            if (item) { this.section = item.label } else {
                const el = document.getElementById('settings-scrollbar')
                const scrolledTo = el.scrollTop * 100 / (el.scrollHeight - el.clientHeight)
                const spaceBetweenItems = 100 / this.settingsList.length
                for (let i = 0; i < this.settingsList.length; i++) {
                    if (scrolledTo >= i * spaceBetweenItems && scrolledTo < (i + 1) * spaceBetweenItems) {
                        this.section = this.settingsList[i].label
                        break
                    }
                }
            }
            if (jump) { this.$refs[item.label].scrollIntoView(true) }
        }
    },
}
</script>
<script setup>
import { reactive, Suspense } from 'vue'
import { useI18n, createI18n } from 'vue-i18n';
const { t } = useI18n()
const $i18n = createI18n()
const languages = [
    { label: t('langs.fa'), value: 'fa-ir' },
    { label: t('langs.en'), value: 'en-us' }
]

const models = {
    general: {
        lang: languages.find(l => l.value === $i18n.locale),

        options: languages,
    }
}
const zones = {
    heartRate: {
        threshold: '200',
        max: '',
        rest: '',
        zones: [
            { name: 'Zone 1: Recovery', from: '0', to: '146' },
            { name: 'Zone 2: Aerobic', from: '0', to: '146' },
            { name: 'Zone 3: Tempo', from: '0', to: '146' },
            { name: 'Zone 4: SubThreshold', from: '0', to: '146' },
            { name: 'Zone 5A: SuperThreshold', from: '0', to: '146' },
        ]
    }
}

const settingsListOne = reactive([
    {
        label: t('pages.settings.general.title'),
        icon: 'icon-ic_fluent_settings_16_regular',
        disabled: false
    },
    {
        label: t('pages.settings.appearance.title'),
        icon: 'icon-ic_fluent_color_20_regular',
        disabled: false
    },
    {
        label: t('pages.settings.zones.title'),
        icon: 'icon-ic_fluent_target_24_regular',
        disabled: false
    },
    {
        label: t('pages.settings.calendar.title'),
        icon: 'icon-ic_fluent_calendar_ltr_20_regular',
        disabled: false
    },
    {
        label: t('pages.settings.charts.title'),
        icon: 'icon-ic_fluent_data_histogram_24_regular',
        disabled: false
    },
    {
        label: t('pages.settings.payments.title'),
        icon: 'icon-ic_fluent_payment_20_regular',
        disabled: false
    }
])

</script>
<style scoped  >
@import "../css/settings.scss"
</style>
  