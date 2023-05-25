<!-- =========================================================================================
    File Name: slideMondana.vue
    Description: slideMondana Component
    Component Name:slide Mondana
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->

<template>
    <div class="col-md-8 q-mt-sm col-lg-8 col-xs-12 col-sm-12">
        <div class="row">
            <q-btn-dropdown style="position: relative;left:20px" flat
                dropdown-icon="icon-ic_fluent_chevron_left_20_regular">
                <template v-slot:label>
                    <q-avatar size="40px">
                        <img src="/mondana.png">
                    </q-avatar>
                    <div class="q-ml-xs" style="text-transform: capitalize;">
                        {{ code && code.firstName }}
                    </div>
                </template>
                <div class="q-pa-md" style="width: 300px; font-size: 90%">
                    <q-list dense>
                    </q-list>
                </div>
            </q-btn-dropdown>
            <q-space />
            <q-icon @click="routerChange">
                <img src="settings.svg" />
            </q-icon>
            <q-icon class="q-mr-lg" @click="routerChangeOne">
                <img src="calendar.svg" />
            </q-icon>
            <q-btn-dropdown style="position: relative;bottom: 20px;" label="نه هفته تا قهرمانی آسیا" flat
                dropdown-icon="icon-ic_fluent_chevron_down_20_regular">

                <div dir="rtl" class="q-pa-md" style="width: 300px; font-size: 90%">
                    <q-list>
                        <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>ده هفته تا قهرمانی آسیا</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>یازده هفته تا قهرمانی آسیا </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>دوازده هفته تاقهرمانی آسیا</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </q-btn-dropdown>
        </div>
        <chart />
    </div>
</template>
<script setup>
import axios from "axios"
import { api } from 'boot/axios'
import { onMounted, ref } from 'vue'
import chart from "./Chart.vue"
import { useRouter } from 'vue-router'
const router = useRouter()
function routerChange() {
    router.push('/settings')
}
function routerChangeOne() {
    router.push('/calendar')
}

const code = ref()
const errored = ref(false)
async function routerChangeThree() {
    await axios.get(' http://localhost:4000/user', {

    }).then((response) => {
        code.value = response.data


    })
        .catch((error) => {
            console.log(error);
            errored.value = true;
        });
}
onMounted(() => {
    routerChangeThree()
})
function convertDateToMiladi(date) {
    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    let convertDate = new Date(date).toLocaleDateString('fa-IR', options);
    return convertDate
}
</script>

<style></style>