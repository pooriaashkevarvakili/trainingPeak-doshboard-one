<!-- =========================================================================================
    File Name: partone.vue
    Description: partone Component
    Component Name:partone
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->

<template>
    <div class="row q-mt-sm">
        {{ convertDateToMiladi(code.timestamp) }}
        <div style="margin-right:60px">قهرمانی ویژه بانوان</div>
        <div style="margin-right:165px">
            {{ convertDateToMiladi(code.timestamp) }}
        </div>

        <div style="margin-right:90px">قهرمانی ویژه بانوان</div>
    </div>
    <q-separator />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const code = ref('')
const errored = ref(false)
function convertDateToMiladi(date) {

    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    let convertDate = new Date(date).toLocaleDateString('fa-IR', options);
    return convertDate
}
async function routerChangeOne() {
    await axios.get('http://localhost:4000/notificationsOne', {

    }).then((response) => {
        code.value = response.data


    })
        .catch((error) => {
            console.log(error);
            errored.value = true;
        });
}


onMounted(() => {
    routerChangeOne();

})
</script>

<style></style>