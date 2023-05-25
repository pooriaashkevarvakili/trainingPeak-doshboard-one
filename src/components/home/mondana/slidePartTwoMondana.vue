<!-- =========================================================================================
    File Name: slidePartTwoMondana.vue
    Description: slidePartTwo Component
    Component Name: slidePartTwo
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <q-card class="q-pa-md " style="border-radius: 16px;width:350px;height:350px">
        <div style="font-family:farsi-bold">آخرین به روز رسانی ها</div>
        <q-separator style="position: relative;top:10px" />
        <div class="q-mt-lg">
            <div class="q-mr-sm">شنبه</div>
            <q-card class="q-mr-xs q-mt-sm" style="background-color: #ECF7F6;width:315px;height:130px">
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
                                    <div class="q-mr-sm">{{ code && code[0].title }}</div>
                                </div>
                            </div>
                        </div>
                        <q-space />
                        <div>{{ code && convertDateToMiladi(code[0].startTime) }}</div>
                    </div>
                    <q-separator />
                </q-card-section>

                <div style="margin-right:15px;margin-top:-10px" class="row q-mr-sm">
                    <img src="bicycle.svg" />
                    <div class="q-mr-sm">دوچرخه سواری قبل ازمسابقه</div>
                </div>
                <div style="margin-right:15px" class="row q-mr-sm">
                    <div>مدت زمان 2:24:32</div>
                    <div class="q-mr-sm" style="border:1px solid #C3E6E2
"></div>
                    <div>{{ code && code[0].calories }}km</div>
                    <div class="q-mr-sm" style="border:1px solid #C3E6E2
"></div>
                    <div> {{ code && code[0].tssActual }} Tss</div>
                </div>
                <q-card-actions style="margin-top:-5px">
                    <q-space />
                    <img src="chat.svg" />
                </q-card-actions>
            </q-card>
            <q-card class="q-mr-xs q-mt-sm" style="background-color: #FBEAEA;width:315px;height:105px">
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
                                    <div class="q-mr-sm">{{ code && code[1].title }}</div>
                                </div>
                            </div>
                        </div>
                        <q-space />
                        <div>{{ code && convertDateToMiladi(code[1].startTime) }}</div>
                    </div>
                    <q-separator />
                </q-card-section>

                <div style="margin-right:15px;margin-top:-10px" class="row q-mr-sm">
                    <img src="bicycle.svg" />
                    <div class="q-mr-sm">دوچرخه سواری </div>
                </div>
                <div style="margin-right:15px" class="row q-mr-sm">
                    <div>مدت زمان 2:24:32</div>
                    <div class="q-mr-sm" style="border:1px solid #C3E6E2
"></div>
                    <div>{{ code && code[1].calories }}km</div>
                    <div class="q-mr-sm" style="border:1px solid #C3E6E2
"></div>
                    <div>{{ code && code[1].tssActual }} Tss</div>
                </div>

            </q-card>
        </div>
    </q-card>
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
    await axios.get('http://localhost:4000/workoutsSix', {

    }).then((response) => {
        code.value = response.data
        console.log(response.data);

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