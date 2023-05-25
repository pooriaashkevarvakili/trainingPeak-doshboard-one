<!-- =========================================================================================
    File Name: calendarModal.vue
    Description: Calendarmodal Component
    Component Name: CalendarModal
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->

<template>
    <q-card style="width:800px;height:400px;max-width:1500px">
        <q-card-section class="row items-center q-pb-none">
            <div>
                {{ todayJalali }}
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
            <div>
                Add a Workout
            </div>
            <div class="row q-py-sm">
                <q-btn v-for="(item, index) in calendarItemsList.workouts" v-bind:key="index" v-close-popup
                    :icon="item.icon" :label="item.label" class="q-my-xs q-mr-sm" dense outline
                    style="font-size: 100%; width: 120px; text-transform: capitalize !important;" unelevated
                    @click="selectItem('workout', item.value)" />
            </div>
            <div>
                Add Other
            </div>
            <div class="row q-py-sm">
                <q-btn v-for="(item, index) in calendarItemsList.others" v-bind:key="index" v-close-popup :icon="item.icon"
                    :label="item.label" class="q-my-xs q-mr-sm" dense outline
                    style="font-size: 100%; width: 120px; text-transform: capitalize !important;" unelevated
                    @click="selectItem('others', item.value)" />
            </div>
            <div class="q-mt-sm">
                <div>
                    Upload Device Files
                </div>
                <div class="row  q-py-sm">
                    <q-btn class="q-my-xs q-mr-sm" dense icon="icon-ic_fluent_cloud_backup_24_regular" label="Upload File"
                        outline style="font-size: 100%; width: 120px; text-transform: capitalize !important;"
                        @click="myFile.click()">
                        <input accept="image/*" type="file" v-show="ok" ref="myFile" />
                    </q-btn>
                </div>
            </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <a href="#">
                Learn about many ways to AutoSync your activity data.
            </a>
        </q-card-section>
    </q-card>
</template>
<script setup>
import { ref } from 'vue'
import * as moment from 'jalali-moment';
const myFile = ref()
const emit = defineEmits(['itemSelect'])
const props = defineProps({
    selectedDate: {
        required: true,
        type: Date
    }
})
const calendarItemsList = {
    workouts: [
        {
            label: 'Bike',
            value: 'bike',
            icon: 'img:fluent-icons/cycling.svg'
        },
        {
            label: 'Run',
            value: 'run',
            icon: 'img:fluent-icons/running.svg'
        },
        {
            label: 'Swim',
            value: 'swim',
            icon: "img:fluent-icons/swimming.svg"
        },
        {
            label: 'Strength',
            value: 'strength',
            icon: 'img:fluent-icons/weight.svg'
        },
        {
            label: 'Rowing',
            value: 'rowing',
            icon: 'img:fluent-icons/rowing.svg'
        },
        {
            label: 'Walk',
            value: 'walk',
            icon: 'img:fluent-icons/walking.svg'
        },
        {
            label: 'Custom',
            value: 'custom',
            icon: 'icon-ic_fluent_clock_20_regular'
        },
        {
            label: 'Rest',
            value: 'rest',
            icon: 'icon-ic_fluent_couch_24_regular'
        }
    ],
    others: [
        {
            label: 'Event',
            value: 'event',
            icon: 'icon-ic_fluent_trophy_16_regular'
        },
        {
            label: 'Goals',
            value: 'goals',
            icon: 'icon-ic_fluent_checkmark_16_regular'
        },
        {
            label: 'Note',
            value: 'note',
            icon: 'icon-ic_fluent_notepad_20_regular'
        },
        {
            label: 'Metrics',
            value: 'metrics',
            icon: 'icon-ic_fluent_ruler_20_regular'
        }
    ]
}
function selectItem(type, value) {
    emit('itemSelect', {
        type: type,
        value: value
    })
}
let todayJalali = moment().locale('fa').format('YYYY/M/Dتاریخ   dddd h:mm:ssساعت');
</script>
<style></style>