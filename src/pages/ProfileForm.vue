<!-- =========================================================================================
    File Name: ProfileForm.vue
    Description: ProfileForm Component
    Component Name: ProfileForm
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <Suspense>
        <q-card class="card-login-responsive">
            <q-card-section class="q-mr-xl">
                <img class="q-mt-lg" style="width:65px;height:65px" src="logo-v1.svg" />
                <div style="font-size:32px;font-family: farsi-bold;"> پروفایلت راکامل کن!</div>
                <div class="q-mt-lg">عنوان فعالیت رامشخص کن</div>
                <q-list bordered padding class=" q-mt-lg rounded-borders" style="max-width: 456px">

                    <q-item clickable v-ripple>
                        <q-item-section avatar top>
                            <img style="width:80px;height:80px" src="vazne.png" />

                        </q-item-section>

                        <q-item-section>
                            <q-item-label lines="1">ورزشکارهستم!</q-item-label>
                            <q-item-label>می خواهم تمرین هایم راتجزیه وتحلیل کنم.</q-item-label>
                        </q-item-section>

                    </q-item>

                </q-list>
                <q-list bordered padding class=" q-mt-lg rounded-borders" style="max-width: 456px">

                    <q-item clickable v-ripple>
                        <q-item-section avatar top>
                            <img style="width:80px;height:80px" src="soot.png" />

                        </q-item-section>

                        <q-item-section>
                            <q-item-label lines="1">مربی هستم!</q-item-label>
                            <q-item-label>می خواهم ورزشکارانم را مدیریت کنم.</q-item-label>
                        </q-item-section>

                    </q-item>

                </q-list>


                <q-btn style="height: 56px;" to="/" label="ادامه" class=" profile-btn "></q-btn>

            </q-card-section>
        </q-card>
    </Suspense>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { ref, Suspense } from 'vue'
const $q = useQuasar()
const router = useRouter()

const name = ref(null)
const age = ref(null)
const accept = ref(false)
function onSubmit() {
    if (accept.value !== true) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
        })
    }
    else {
        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
        })
    }
}

function onReset() {
    name.value = null
    age.value = null
    accept.value = false
}
</script>

<style lang="scss">
@import "../css/profile.scss"
</style>