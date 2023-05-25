<!-- =========================================================================================
    File Name: Accounts.vue
    Description: Accounts Component
    Component Name: Accounts
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <q-page>
        <div class="row q-col-gutter-md q-py-sm">
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <q-card bordered class="q-mb-sm q-pa-lg row justify-between no-wrap" flat>
                    <div class="row">
                        <q-avatar class="q-mb-sm" style="width: 120px; height: auto;margin-top: auto; margin-bottom: auto">
                            <q-img src="/profile.jpg" />
                        </q-avatar>
                        <div class="q-mx-md" style="margin-top: auto; margin-bottom: auto">
                            <div style="font-weight: 700">
                                Johnathan C. Doe
                            </div>
                            <div>
                                Cyclist
                            </div>
                            <div>
                                @John_Doe88
                            </div>
                        </div>
                        <q-separator vertical />
                        <div class="q-mx-md" style="margin-top: auto; margin-bottom: auto">
                            <div>
                                <span class="data-title">Email Address: </span>John.Pro88@pm.me
                            </div>
                            <div>
                                <span class="data-title">Country: </span>Iran
                            </div>
                        </div>
                    </div>
                    <div>
                        <q-btn dense flat icon="icon-ic_fluent_edit_20_regular" @click="profile.show = true"
                            style="position: relative;top: 50%;transform: translateY(-50%);" />
                    </div>
                </q-card>

            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <q-card style="height:350px" bordered class="full-width  q-mb-sm" flat>
                    <q-toolbar class="q-px-lg">
                        Messages
                        <q-space />
                        <q-btn dense flat icon="icon-ic_fluent_checkmark_20_regular" size="sm">
                            <q-tooltip>Mark all as Done</q-tooltip>
                        </q-btn>
                    </q-toolbar>
                    <q-card-section>
                        <q-scroll-area class="messages" visible>
                            <q-list dense>
                                <q-item v-for="(item, index) in 3" :key="index" class="row justify-start" clickable dense>
                                    <div class="q-mr-md" style="font-size: 105%; margin-top: auto; margin-bottom: auto;">
                                        Blah Blah Blah
                                    </div>
                                    <div class="text-grey-7" style="font-size: 90%; margin-top: auto; margin-bottom: auto;">
                                        Now
                                    </div>
                                </q-item>

                            </q-list>
                        </q-scroll-area>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <q-card bordered class="q-pa-lg grid premium-card row justify-between" flat>
                    <div>
                        <span class="text-primary title">Premium Account</span>
                        <div class="q-my-xs">28 Days Left</div>
                        <div style="font-size: 90%">Auto Renewal is <a href="#">Enabled</a></div>
                    </div>
                    <div>
                        <q-btn flat label="Renew Now" style="position: relative;top: 50%;transform: translateY(-50%);" />
                    </div>
                </q-card>
            </div>
        </div>
        <div class="row q-col-gutter-md q-py-sm">
            <div class="col-md-12 col-lg-3 col-sm-12 col-xs-12">
                <q-card class="full-width second-row" flat>
                    <q-toolbar class="q-px-md">
                        Stats
                    </q-toolbar>
                    <q-card-section>
                        <div v-for="(i, index)  in 3" :key="index" class="q-mb-md">
                            Stat 1
                            <q-linear-progress :value="p1" size="10px" stripe />
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-md-12 col-lg-3 col-sm-12 col-xs-12">
                <q-card class="full-width" flat>
                    <q-toolbar class="q-px-md">
                        Friends
                        <q-space />
                        <q-btn dense flat icon="icon-ic_fluent_add_20_regular" size="sm" />
                    </q-toolbar>
                    <q-card-section>
                        <q-scroll-area class="friend-list" visible>
                            <q-list dense>
                                <q-item v-for="(i, index) in 7" :key="index" class="q-mb-xs no-padding" clickable dense
                                    style="">
                                    <q-avatar class="q-mr-md">
                                        <q-img src="/friend.jpg" />
                                    </q-avatar>
                                    <span style="margin-top: auto; margin-bottom: auto;">Friend 1</span>
                                </q-item>
                            </q-list>
                        </q-scroll-area>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-md-12 col-lg-3 col-sm-12 col-xs-12">
                <q-card class="full-width" flat>
                    <q-toolbar class="q-px-md">
                        Tips
                    </q-toolbar>
                    <q-card-section>
                        <q-scroll-area class="tip-list" visible>
                            <q-list dense>
                                <q-item v-for="(i, index) in 14" :key="index" clickable dense>
                                    <span style="margin-top: auto; margin-bottom: auto;">do this, not that.</span>
                                </q-item>

                            </q-list>
                        </q-scroll-area>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-md-12 col-lg-3 col-sm-12 col-xs-12">
                <q-card class="full-width" flat>
                    <q-toolbar>
                        Your Coach
                    </q-toolbar>
                    <q-card-section class="row justify-center">
                        <q-img class="coach-img" src="/coach.jpg"
                            style="width: 120px; height: auto; border-radius: 50%; border: 4px solid #2196f3;" />
                        <div class="q-mx-md" style="margin-top: auto; margin-bottom: auto">
                            <div style="font-weight: 700">
                                Josh Posh
                            </div>
                            <div class="text-blue-6" style="font-size: 90%">
                                Diamond Coach
                            </div>
                            <div>
                                @Josh_Posh_
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section class="q-pt-xs">
                        <q-list dense>
                            <q-item clickable dense>
                                <span style="margin-top: auto; margin-bottom: auto;">View Profile</span>
                            </q-item>
                            <q-item clickable dense>
                                <span style="margin-top: auto; margin-bottom: auto;">View Plans</span>
                            </q-item>
                            <q-item clickable dense>
                                <span style="margin-top: auto; margin-bottom: auto;">Remove Coach</span>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </div>
        </div>

    </q-page>
</template>
<script setup>
import { ref } from 'vue'
const p1 = 0.5
const visible = ref(true)
const profile = ref({
    show: false,
    avatar: '/profile.jpg',
    name: 'John Doe',
    mail: 'John.Pro88@pm.me',
    gender: {
        value: 'Male',
        options: ['Male', 'Female', 'Other']
    },
    username: 'John_Doe88',
    password: '',
    rePassword: '',
    address: '',
    city: 'Tehran',
    postalCode: '1234567890',
    country: 'Iran',
    cellPhone: '09123456789',
    birth: null
})
function removeAvatar() {
    profile.value.avatar = ''
}
</script>

<style lang="scss" scoped>
@import "../css/Accounts"
</style>
  