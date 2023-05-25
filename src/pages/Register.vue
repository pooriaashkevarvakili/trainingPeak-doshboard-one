<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Component
    Component Name: Register
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <Suspense>
        <div style="background: linear-gradient(199.74deg, #FADEE8 -30.14%, #FADEE8 -30.12%, #F5E1EE 35.61%, #E9E9FA 100%);"
            class="fullscreen ">
            <div class="q-pa-md row q-col-gutter-sm">
                <div style="margin-top:200px" class="col-md-6 col-lg-6 form-responsive col-xs-12 col-sm-12 ">
                    <div class="q-pa-md">
                        <carousel-register />
                    </div>
                </div>
                <div class="col-md-6  form-login col-lg-6 col-xs-12 col-sm-12">
                    <RegisterForm />
                </div>

            </div>
        </div>
    </Suspense>
</template>
<script setup>
import { Suspense } from 'vue'
import carouselRegister from './carouselRegister.vue'
import RegisterForm from "./RegisterForm.vue"
</script>
<style lang="scss">
@import "../css/Register.scss";
</style>
  