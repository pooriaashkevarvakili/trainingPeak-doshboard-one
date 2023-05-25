<!-- =========================================================================================
    File Name: slidePartOne.vue
    Description: slidePartOne Component
    Component Name: slidePartOne
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
        <div>مسابقات آینده</div>
        <div class="row q-mt-sm">
            {{ convertDateToMiladi(code.timestamp) }}
            <div style="margin-right: 60px;" class=" row">
                <div><img src="iran.png" /></div>
                <div class="q-ml-sm">قهرمانی آسیا</div>
            </div>
            <div style="margin-right:175px"> {{ convertDateToMiladi(code.timestamp) }}</div>

            <div style="margin-right:90px" class=" row">
                <div><img src="iran.png" /></div>
                <div class="q-ml-sm">قهرمانی آسیا</div>
            </div>

        </div>
        <q-separator />
        <part-one-sport />
        <part-two-sport />
        <part-three-sport />
        <part-four-sport />
        <part-five-sport />
        <q-card class="q-mt-lg">
            <q-card-section>
                <div>یادداشت های یک مربی</div>
                <div style="position: relative;top:10px">
                    <q-separator />
                </div>
            </q-card-section>
            <q-card-section>
                <div dir="rtl">
                    <div>
                        مربی می تواندبرای هرورزشکار دراین قسمت یک یادداشت بنویسد
                    </div>
                    <div>
                        مربی می تواندبرای هرورزشکار دراین قسمت یک یادداشت بنویسد
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>
<script setup>
import partFiveSport from "./sectionOne/partFiveSport.vue"
import partFourSport from "./sectionOne/partFourSport.vue"
import partTwoSport from "./sectionOne/partTwoSport.vue"
import PartOneSport from "./sectionOne/partOneSport.vue"
import partThreeSport from "./sectionOne/partThreeSport.vue"

import axios from 'axios'
import { ref, onMounted } from 'vue'
const code = ref('')
const errored = ref(false)
function convertDateToMiladi(date) {

    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    let convertDate = new Date(date).toLocaleDateString('fa-IR', options);
    return convertDate
}
async function routerChange() {
    await axios.get('http://localhost:4000/notifications', {

    }).then((response) => {
        code.value = response.data


    })
        .catch((error) => {
            console.log(error);
            errored.value = true;
        });
}


onMounted(() => {
    routerChange();

})
</script>

<style></style>