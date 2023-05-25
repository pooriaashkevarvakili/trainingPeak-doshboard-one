<!-- =========================================================================================
    File Name: mondana.vue
    Description: mondana Component
    Component Name: mondana
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <section>
        <div dir="rtl">
            <sport />
            <div class="q-col-gutter-md q-py-sm row">
                <slideMondana />
                <slide-two-mondana />
            </div>
            <div class="q-col-gutter-md q-py-sm row">
                <slide-part-one-mondana />
                <div class=" col-sm-12 col-xs-12 col-md-12 col-lg-4">
                    <slide-part-two-mondana />
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import slideTwoMondana from "../components/home/mondana/slideTwoMondana.vue";
import slideMondana from "../components/home/mondana/slideMondana.vue";
import sport from "../components/home/mondana/sport.vue"
import slidePartOneMondana from '../components/home/mondana/slidePartOneMondana.vue'
import slidePartTwoMondana from "../components/home/mondana/slidePartTwoMondana.vue"
</script >


<style></style>