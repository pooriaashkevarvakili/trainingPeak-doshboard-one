<!-- =========================================================================================
    File Name: mondana.vue
    Description: mondna Component
    Component Name: mondana
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <div class="row hover-white">
        <q-list>
            <router-link style="text-decoration: none;color:#000" to="/mondana">
                <q-item>
                    <q-item-section avatar>
                        <img src="Ellipse 375.png" />
                    </q-item-section>

                    <q-item-section class="q-mt-xs">
                        {{ code && code.name }}
                    </q-item-section>
                </q-item>
            </router-link>
        </q-list>
        <div style="margin-right:25px;margin-top:15px" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:35px;margin-top: 15px;" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:32px;margin-top:15px" class="q-mt-sm">
            <img src="alert-circle.png" />
        </div>
        <div style="margin-right:35px;margin-top:15px" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm ">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm">
            <img src="circleHidden.svg" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm">
            <img src="circleHidden.svg" />
        </div>
        <div class="changeColor" v-show="isVisible" @click="changeColor">
            <div class="achar" v-show="value1"><img class="achar-img" src="achar.svg" @click="changeRouter" /></div>

            <div class="settings" v-show="value2"><img class="settings-img" src="Calendar.svg" @click="changeRouterOne"
                    name="settings" /></div>
        </div>

    </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router';
const code = ref('')
const value1 = ref(false)
const value2 = ref(false)
const isVisible = ref(true)
const errored = ref(false)
const router = useRouter()
function changeRouter() {
    router.push('Settings')
}
function changeRouterOne() {
    router.push('Calendar')
}
async function routerChange() {
    await axios.get(' http://localhost:4000/athletes', {

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
function changeColor() {
    value1.value = true
    value2.value = true
}
</script>
<style lang="scss">
@import "../../../css/home-name.scss"
</style>