<!-- =========================================================================================
    File Name: zahra.vue
    Description: zahra Component
    Component Name: zahra
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <div class="row hover-white-one">
        <q-list>
            <q-item>
                <q-item-section avatar>
                    <img src="Ellipse 375.png" />
                </q-item-section>

                <q-item-section>زهراخرمی نژاد</q-item-section>
            </q-item>
        </q-list>
        <div style="margin-right:29px;margin-top:15px" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:32px;margin-top:15px" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:32px;margin-top:15px" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:35px;margin-top:15px" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm ">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm ">
            <img src="circleHidden.svg" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm ">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const value1 = ref(false)
const isVisible = ref(true)
const value2 = ref(false)
function changeRouter() {
    router.push('Settings')
}
function changeRouterOne() {
    router.push('Calendar')
}
function changeColor() {
    value1.value = true
    value2.value = true
}
</script>
<style lang="scss">
@import "../../../css/home-name.scss"
</style>