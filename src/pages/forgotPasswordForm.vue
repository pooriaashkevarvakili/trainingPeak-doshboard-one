<!-- =========================================================================================
    File Name: forgotpassword.vue
    Description: ForgotPassword Component
    Component Name: ForgotPassword
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <Suspense>
        <q-card class="card-login-responsive">
            <q-card-section class="q-mr-xl">
                <img class="q-mt-lg" style="width:65px;height:65px" src="logo-v1.svg" />
                <div style="font-size: 32px;font-family: farsi-bold;" class="q-mt-sm"> رمزعبوررافراموش کردید</div>
                <div dir="rtl"> <q-form @submit="onSubmit" @reset="onReset" class="q-mt-sm q-gutter-md">

                        <q-input class="input-user" filled v-model="name" label="شماره همراه *"
                            hint="شماره همراه را واردکنید" lazy-rules :rules="[val => val && val.length > 0 || 'شماره همراه رادرست واردکنید',


                            ]" />




                        <q-btn style="height:56px" to="/send" label="ارسال" class=" forgotPassword-btn"></q-btn>

                    </q-form></div>
            </q-card-section>
            <q-card-section class=" btn-forgotPassword-grid  justify-center">قوانین استفاده از vo2</q-card-section>
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
@import "../css/forgotPassword.scss"
</style>