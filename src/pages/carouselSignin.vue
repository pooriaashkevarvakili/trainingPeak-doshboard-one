<!-- =========================================================================================
    File Name: carouselSignin.vue
    Description: carouselsignin Component
    Component Name: carouselSignin
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <Suspense>
        <q-carousel
            style="background: linear-gradient(199.74deg, #FADEE8 -30.14%, #FADEE8 -30.12%, #F5E1EE 35.61%, #E9E9FA 100%);"
            v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated control-color="white"
            navigation padding arrows height="300px" class=" text-white shadow-1 rounded-borders">
            <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                <q-btn v-if="active" size="lg" :icon="btnProps.icon" color="yellow" flat round dense @click="onClick" />
                <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
            </template>

            <q-carousel-slide name="style" class="column no-wrap flex-center">
                <img src="calendar.png" style="width:100px;height: 100px;" />
                <div class="q-mt-md text-black text-center">
                    سیستم رنگیگ پیشرفته
                </div>
                <div class="q-mt-sm text-black text-center">
                    در vo2 می کوشیم استانداردهارابه
                </div>
                <div class="q-mt-sm text-center text-black">دوچرخه سواری اضافه کنیم</div>
            </q-carousel-slide>
            <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <img src="map.png" style="width:100px;height: 100px;" />
                <div class="q-mt-md text-black text-center">
                    سیستم رنگیگ پیشرفته
                </div>
                <div class="q-mt-sm text-black text-center">
                    در vo2 می کوشیم استانداردهارابه
                </div>
                <div class="q-mt-sm text-center text-black">دوچرخه سواری اضافه کنیم</div>
            </q-carousel-slide>
            <q-carousel-slide name="layers" class="column no-wrap flex-center">
                <img src="card.png" style="width:100px;height: 100px;" />
                <div class="q-mt-md text-black text-center">
                    سیستم رنگیگ پیشرفته
                </div>
                <div class="q-mt-sm text-black text-center">
                    در vo2 می کوشیم استانداردهارابه
                </div>
                <div class="q-mt-sm text-center text-black">دوچرخه سواری اضافه کنیم</div>
            </q-carousel-slide>
            <q-carousel-slide name="map" class="column no-wrap flex-center">
                <img src="map.png" style="width:100px;height: 100px;" />
                <div class="q-mt-md text-black text-center">
                    سیستم رنگیگ پیشرفته
                </div>
                <div class="q-mt-sm text-black text-center">
                    در vo2 می کوشیم استانداردهارابه
                </div>
                <div class="q-mt-sm text-center text-black">دوچرخه سواری اضافه کنیم</div>
            </q-carousel-slide>
        </q-carousel>
    </Suspense>
</template>

<script setup>
import { ref, Suspense } from 'vue'
const slide = ref('style')
</script>

<style></style>