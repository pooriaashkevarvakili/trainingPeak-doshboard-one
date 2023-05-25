<!-- =========================================================================================
    File Name: Blog.vue
    Description: Blog Component
    Component Name: Blog
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <q-card bordered flat style=" width: 100%;">
        <q-card-section :dir="rtl ? 'ltr' : 'rtl'">
            <q-icon name="icon-ic_fluent_notepad_20_regular" size="sm" />
            {{ $t('components.articles.title') }}
        </q-card-section>
        <q-card-section class="q-pt-none">
            <q-list dense style="font-size: 90%;" :dir="rtl ? 'ltr' : 'rtl'">
                <q-item class="q-py-none items-center" clickable
                    style="padding-top: 0 !important;padding-bottom: 0 !important;">
                    <span class="ellipsis">Getting Started with TrainingPeaks</span>
                </q-item>
                <q-item class="q-py-none items-center" clickable
                    style="padding-top: 0 !important;padding-bottom: 0 !important;">
                    <span class="ellipsis">An Introduction to TrainingPeaks Metrics</span>
                </q-item>
                <q-item class="q-py-none items-center" clickable
                    style="padding-top: 0 !important;padding-bottom: 0 !important;">
                    <span class="ellipsis">Get the Most Out of TrainingPeaks</span>
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