<!-- =========================================================================================
    File Name: Event.vue
    Description: Event Component
    Component Name: Event
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <q-card bordered class=" q-mb-md" flat style=" width: 100%;margin-top:-220px">
        <q-card-section :dir="rtl ? 'ltr' : 'rtl'">
            <q-icon class="q-mr-xs" name="icon-ic_fluent_trophy_20_regular" size="sm" />
            {{ $t('components.nextEvent.title') }}
            <q-btn class="float-right" color="black" flat icon="icon-ic_fluent_add_20_regular" round size="sm" />
        </q-card-section>
        <q-card-section class="row justify-center q-pb-none">
            <div class="column text-center">
                <p class="no-margin">Triathlon 13</p>
                <p class="no-margin" style="font-size: 90%">{{ 28 - new Date().getDate() }} days left</p>
            </div>
            <event style="width: 100%; height: 100%" />
        </q-card-section>
        <q-card-section class="q-pt-none">
            <q-list dense style="font-size: 90%">
                <q-item class="q-py-none items-center" clickable
                    style="padding-top: 0 !important;padding-bottom: 0 !important;">
                    <span class="text-weight-bold">Jan 28</span> &nbsp; - &nbsp; <span>Triathlon 13</span>
                </q-item>
                <q-item class="q-py-none items-center" clickable
                    style="padding-top: 0 !important;padding-bottom: 0 !important;">
                    <span class="text-weight-bold">Feb 15</span> &nbsp; - &nbsp; <span>NYC Marathon</span>
                </q-item>
                <q-item class="q-py-none items-center" clickable
                    style="padding-top: 0 !important;padding-bottom: 0 !important;">
                    <span class="text-weight-bold">Apr 20</span> &nbsp; - &nbsp; <span>Audition</span>
                </q-item>
            </q-list>
        </q-card-section>
    </q-card>
</template>

<script>
export default {

}
</script>

<style></style>