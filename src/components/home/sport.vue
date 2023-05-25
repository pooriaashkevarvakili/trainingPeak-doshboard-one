<!-- =========================================================================================
    File Name: sport.vue
    Description: sport Component
    Component Name: sport
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <div class="row">
            <div style="margin-right:200px">1</div>
            <div style="margin-right:50px">2</div>
            <div style="margin-right:50px">3</div>
            <div style="margin-right:50px">4</div>
            <div style="margin-right:50px">5</div>
            <div style="margin-right:50px">6</div>
            <div style="margin-right:50px">7</div>
            <div class="q-mr-lg">
                <DatePicker v-model="date" locale="fa">
                    <template #default="{ togglePopover, inputValue, inputEvents }">
                        <div class="flex">
                            <q-btn style="max-width:30px" @click="() => togglePopover()"
                                icon="icon-ic_fluent_chevron_down_20_regular">
                            </q-btn>
                            <input :value="inputValue" v-on="inputEvents" style="max-width: 99px" />
                        </div>
                    </template>
                </DatePicker>
            </div>
        </div>
        <div class="row">
            <div style="margin-right:190px">شنبه</div>
            <div style="margin-right:20px">یکشنبه</div>
            <div style="margin-right:15px">دوشنبه</div>
            <div style="margin-right:15px">سه شنبه</div>
            <div style="margin-right:15px">چهارشنبه</div>
            <div style="margin-right:15px">پنج شنبه</div>
            <div style="margin-right:15px">جمعه</div>
        </div>
        <div>
            <mondana />
            <amirhosein />
            <foruzan />
            <amirabas />
            <asgar />
            <jafar />
            <zahra />
            <navid />
        </div>
    </div>
</template>
<script setup>
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import zahra from "./name/zahra.vue"
import mondana from "./name/mondana.vue"
import amirhosein from './name/amirhosein.vue'
import asgar from "./name/asgar.vue"
import foruzan from "./name/foruzan.vue"
import amirabas from "./name/amirabas.vue"
import jafar from "./name/jafar.vue"
import navid from "./name/navid.vue"
import { ref } from 'vue'
const date = ref(new Date())
</script>
