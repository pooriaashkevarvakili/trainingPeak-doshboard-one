<!-- =========================================================================================
    File Name: activityFour.vue
    Description: activityFour Component
    Component Name: activityFour
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <q-card class="q-mr-sm q-mt-sm" style="background-color: #ECF7F6;width:370px;height:75px">
        <q-card-section>
            <div class="row">
                <div class="col">
                    <div class="flex">
                        <div>
                            <div>
                                <img src="Ellipse 375.png" />
                            </div>
                        </div>
                        <div>
                            <div class="q-mr-sm">{{ code && code.title }}</div>
                        </div>
                    </div>
                </div>
                <q-space />
                <div>{{ code && convertDateToMiladi(code.startTime) }}</div>
            </div>
            <q-separator />
        </q-card-section>

        <div style="margin-right:15px;margin-top:-10px" class="row q-mr-sm">
            <img src="bicycle.svg" />
            <div class="q-mr-sm">دوچرخه سواری قبل ازمسابقه</div>
        </div>


    </q-card>
</template>

<script setup>
import axios from 'axios'
import { api } from 'boot/axios'
import { onMounted, ref } from 'vue'
const code = ref()
const errored = ref(false)
async function routerChange() {
    await axios.get('http://localhost:4000/workoutThree', {

    }).then((response) => {
        code.value = response.data


    })
        .catch((error) => {
            console.log(error);
            errored.value = true;
        });
}
onMounted(() => {
    routerChange()
})
function convertDateToMiladi(date) {
    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    let convertDate = new Date(date).toLocaleDateString('fa-IR', options);
    return convertDate
}
</script>

<style></style>