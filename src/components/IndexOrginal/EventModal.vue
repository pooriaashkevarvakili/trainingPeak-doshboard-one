<!-- =========================================================================================
    File Name: EventModal.vue
    Description: EventModal Component
    Component Name: EventModal
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <q-card style="width:800px;height:375px;max-width:1500px">
        <q-card-section class="row items-center q-pb-none">
            <div>
                <q-icon size="2em" name="icon-ic_fluent_trophy_16_regular" />
                Event
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="col">
            <div>Event Name</div>
            <div>importantEvent</div>
            <div>
                <q-select style="width:120px;height:50px" v-model="model" :options="options" label="eventType" />
            </div>
            <div class="q-mt-lg">Due</div>
            <div>26 days reminders</div>
            <div>description</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.</div>
        </q-card-section>
        <q-card-section>

            <div class="row bg-grey-3">

                <q-checkbox v-model="red" label="Automatically Calculate Planned Values" color="red" />
                <q-space />
                <div>
                    <q-btn flat style="width:100px;height:20px" v-close-popup class="">Delete</q-btn>
                    <q-btn flat style="width:100px;height:20px" v-close-popup class="q-ml-sm">cancel</q-btn>
                    <q-btn style="width:100px;height:20px" v-close-popup
                        class="bg-primary text-white q-ml-sm">save&Close</q-btn>
                </div>

            </div>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { ref } from 'vue'
const red = ref(false)
const model = ref(null)
const options = [
    'Cycleing', 'Running', 'Swimming', 'Other'
]
</script>

<style></style>