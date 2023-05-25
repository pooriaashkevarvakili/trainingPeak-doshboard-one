<!-- =========================================================================================
    File Name: Reminder.vue
    Description: Reminder Component
    Component Name: Reminder
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <div class="row q-col-gutter-sm q-py-md ">
        <div class='col-md-8 q-ml-sm col-lg-8 col-xs-12 col-sm-12'>
            <q-carousel style='height:120px' swipeable animated v-model="slide" :autoplay="autoplay" ref="carousel"
                infinite>
                <q-carousel-slide :name="1">
                    <div style="margin-top:-25px" class="q-pa-md">
                        <div class="row q-col-gutter-sm q-py-sm ">
                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cards" :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">


                                            {{ card.title }}



                                            <q-space />
                                            <q-btn @click="icon = true" icon="delete" />


                                        </div>

                                    </q-card>

                                    <q-dialog v-model="icon">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteOne(index)" round dense
                                                        v-close-popup />


                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>

                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cardOne"
                                :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">
                                            {{ card.title }}


                                            <q-space />
                                            <q-btn @click="iconOne = true" icon="delete" />
                                        </div>
                                    </q-card>
                                    <q-dialog v-model="iconOne">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteTwo(index)" round dense
                                                        v-close-popup />

                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cardTWo"
                                :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">
                                            {{ card.title }}


                                            <q-space />
                                            <q-btn @click="icon = true" icon="delete" />
                                        </div>
                                    </q-card>
                                    <q-dialog v-model="icon">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteThree(index)" round dense
                                                        v-close-popup />

                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cardThree"
                                :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">
                                            {{ card.title }}


                                            <q-space />
                                            <q-btn @click="icon = true" icon="delete" />
                                        </div>
                                    </q-card>
                                    <q-dialog v-model="icon">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteFour(index)" round dense
                                                        v-close-popup />

                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>
                        </div>
                    </div>

                </q-carousel-slide>
                <q-carousel-slide :name="2">
                    <div style="margin-top:-25px" class="q-pa-md">
                        <div class="row q-col-gutter-sm q-py-sm ">
                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cards" :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">


                                            {{ card.title }}



                                            <q-space />
                                            <q-btn @click="icon = true" icon="delete" />


                                        </div>

                                    </q-card>

                                    <q-dialog v-model="icon">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteOne(index)" round dense
                                                        v-close-popup />


                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>

                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cardOne"
                                :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">
                                            {{ card.title }}


                                            <q-space />
                                            <q-btn @click="iconOne = true" icon="delete" />
                                        </div>
                                    </q-card>
                                    <q-dialog v-model="iconOne">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteTwo(index)" round dense
                                                        v-close-popup />

                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cardTWo"
                                :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">
                                            {{ card.title }}


                                            <q-space />
                                            <q-btn @click="icon = true" icon="delete" />
                                        </div>
                                    </q-card>
                                    <q-dialog v-model="icon">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteThree(index)" round dense
                                                        v-close-popup />

                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cardThree"
                                :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">
                                            {{ card.title }}


                                            <q-space />
                                            <q-btn @click="icon = true" icon="delete" />
                                        </div>
                                    </q-card>
                                    <q-dialog v-model="icon">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteFour(index)" round dense
                                                        v-close-popup />

                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-carousel-slide>
                <q-carousel-slide :name="3">
                    <div style="margin-top:-25px" class="q-pa-md">
                        <div class="row q-col-gutter-sm q-py-sm ">
                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cards" :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">


                                            {{ card.title }}



                                            <q-space />
                                            <q-btn @click="icon = true" icon="delete" />


                                        </div>

                                    </q-card>

                                    <q-dialog v-model="icon">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteOne(index)" round dense
                                                        v-close-popup />


                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>

                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cardOne"
                                :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">
                                            {{ card.title }}


                                            <q-space />
                                            <q-btn @click="iconOne = true" icon="delete" />
                                        </div>
                                    </q-card>
                                    <q-dialog v-model="iconOne">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteTwo(index)" round dense
                                                        v-close-popup />

                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cardTWo"
                                :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">
                                            {{ card.title }}


                                            <q-space />
                                            <q-btn @click="icon = true" icon="delete" />
                                        </div>
                                    </q-card>
                                    <q-dialog v-model="icon">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteThree(index)" round dense
                                                        v-close-popup />

                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xs-12 col-sm-12" v-for="(card, index) in cardThree"
                                :key="index">
                                <div>
                                    <q-card>
                                        <div class="row q-pa-sm">
                                            {{ card.title }}


                                            <q-space />
                                            <q-btn @click="icon = true" icon="delete" />
                                        </div>
                                    </q-card>
                                    <q-dialog v-model="icon">
                                        <q-card>
                                            <q-card-section class="row items-center q-pb-none">
                                                <div class="text-h6">Close icon</div>
                                                <q-space />
                                                <q-btn icon="close" flat round dense v-close-popup />
                                            </q-card-section>

                                            <q-card-section>
                                                آیا مطمئن هستید که این کارد پاک شود
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <q-btn icon="delete" @click="deleteFour(index)" round dense
                                                        v-close-popup />

                                                </div>

                                            </q-card-section>
                                        </q-card>

                                    </q-dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-carousel-slide>
                <template v-slot:control>
                    <div style="position: relative;top:10px">
                        <q-carousel-control position="bottom-right" :offset="[18, 18]" class="q-gutter-xs">
                            <q-btn push round dense color="orange" text-color="black" icon="arrow_left"
                                @click="$refs.carousel.previous()" />
                            <q-btn push round dense color="orange" text-color="black" icon="arrow_right"
                                @click="$refs.carousel.next()" />
                        </q-carousel-control>
                    </div>
                </template>
            </q-carousel>
        </div>

    </div>
</template>
<script setup>
import { ref } from 'vue'
const slide = ref(1)
const icon = ref(false)
const iconOne = ref(false)
const cards = [
    {
        title: 'run a lot of'
    }
]
const cardOne = [
    {
        title: 'jump'
    }
]
const cardTWo = [
    {
        title: 'go for'
    }
]
const cardThree = [
    {
        title: 'do'
    }
]
function deleteOne(index) {
    cards.splice(index, 1)
}
function deleteTwo(index) {
    cardOne.splice(index, 1)
}
function deleteThree(index) {
    cardTWo.splice(index, 1)
}
function deleteFour(index) {
    cardThree.splice(index, 1)
}

</script>

<style lang="scss"></style>