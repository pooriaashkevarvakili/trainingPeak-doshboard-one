<!-- =========================================================================================
    File Name: activity.vue
    Description: activity Component
    Component Name: activity
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card style="height:600px;border-radius: 16px;">
            <q-card-section>آخرین فعالیت ها</q-card-section>
            <q-separator />
            <activityOne />
            <activityTwo />
            <activityThree />
            <activityFour />
        </q-card>
    </div>
</template>
<script setup>
import activityOne from './activity/activityOne.vue';
import activityTwo from "./activity/activityTwo.vue"
import activityThree from "./activity/activityThree.vue"
import activityFour from "./activity/activityFour.vue"
</script>

<style></style>