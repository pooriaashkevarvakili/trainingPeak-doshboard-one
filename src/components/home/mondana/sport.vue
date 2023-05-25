<!-- =========================================================================================
    File Name: sport.vue
    Description: sport Component
    Component Name: sport
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <div class="row">
        <div style="font-size:24px;font-family: farsi-bold;">ورزشکاران من</div>
        <q-space />
        <div>
            <q-btn-dropdown dropdown-icon="icon-ic_fluent_chevron_left_20_regular" flat label="بازگشت">
                <q-list>
                    <q-item to="/" clickable v-close-popup @click="onItemClick">
                        <q-item-section dir="rtl">
                            <q-item-label>خانه</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>