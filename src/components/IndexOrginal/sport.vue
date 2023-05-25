<!-- =========================================================================================
    File Name: sport.vue
    Description: sport Component
    Component Name: sport
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->

<template>
    <q-card bordered :dir="rtl ? 'ltr' : 'rtl'" class="q-mb-md" flat style=" width: 100%;height:290px">
        <q-card-section>
            <q-icon name="icon-ic_fluent_notepad_20_regular" size="sm" />
            {{ $t('pages.index.athlete') }}
        </q-card-section>
        <q-card-section class="q-pt-none">
            <div class="text-center col">
                <q-avatar style="width: 120px; height: auto;" class="q-mb-sm">
                    <img src="/profile.jpg">
                </q-avatar>
                <div style="font-weight: 700">
                    Johnathan C. Doe
                </div>
                <div>
                    {{ $t('activities.cycling.athlete') }}
                </div>
            </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <div class="text-center col">
                <q-btn class="q-mx-xs" dense flat icon="icon-ic_fluent_megaphone_20_regular" round>
                    <div class="circle" />
                    <q-menu>
                        <div class="q-pa-md" style="width: 300px; font-size: 90%">
                            <q-list dense>
                                <q-item class="row justify-start" clickable dense>
                                    <div class="q-mr-md text-grey-7" style="font-size: 90%">
                                        10:30
                                    </div>
                                    <div style="font-size: 105%">
                                        Blah Blah Blah
                                    </div>
                                </q-item>
                                <q-item class="row justify-start" clickable dense>
                                    <div class="q-mr-md text-grey-7" style="font-size: 90%">
                                        12:30
                                    </div>
                                    <div style="font-size: 105%">
                                        Blah Blah Blah
                                    </div>
                                </q-item>
                                <q-item class="row justify-start" clickable dense>
                                    <div class="q-mr-md text-grey-7" style="font-size: 90%">
                                        Now
                                    </div>
                                    <div style="font-size: 105%">
                                        Blah Blah Blah
                                    </div>
                                </q-item>
                            </q-list>
                        </div>
                    </q-menu>
                </q-btn>
                <q-btn class="q-mx-xs" dense flat icon="icon-ic_fluent_chat_20_regular" round />
                <q-btn to="/Accounts" class="q-mx-xs" dense flat icon="icon-ic_fluent_person_20_regular" round />
            </div>
        </q-card-section>
    </q-card>
</template>

<script>
export default {

}
</script>

<style></style>