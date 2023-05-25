<!-- =========================================================================================
    File Name: home.vue
    Description: home Component
    Component Name: home
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
  <div dir="rtl" class="full-screen ">
    <div class="q-mr-lg" style="font-size: 24px;font-family: farsi-bold;">ورزشکاران من</div>
    <div class="q-col-gutter-md q-py-sm row">
      <sport />
      <activity />
    </div>
  </div>
</template>
<script setup>
import sport from "../components/home/sport.vue"
import activity from "../components/home/Activity.vue"
</script>
<style lang="scss"></style>