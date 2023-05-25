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
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm">
            <img src="circleHidden.svg" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm">
            <img src="circleHidden.svg" />
        </div>
        <img src="achar.svg" style="color:#6666;margin-right:55px;margin-top:2px" @click="changeRouter" />
        <img src="Calendar.svg" @click="changeRouterOne" style="color:#6666;margin-right:20px;margin-top:2px"
            name="settings" />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
function changeRouter() {
    router.push('Settings')
}
function changeRouterOne() {
    router.push('Calendar')
}
</script>

<style lang="scss">
:focus {
    .hover-white {
        background-color: #fff;
        cursor: pointer;
    }

    .hover-white-one {
        background-color: #fff;
        cursor: pointer;
    }
}
</style>