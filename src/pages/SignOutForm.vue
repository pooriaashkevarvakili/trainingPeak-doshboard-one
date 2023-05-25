<!-- =========================================================================================
    File Name: SignOutForm.vue
    Description: SignOutForm Component
    Component Name: SignOutForm
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <Suspense>
        <q-card class="card-login-responsive">
            <q-card-section class="q-mr-xl">
                <img class="q-mt-lg" style="width:65px;height:65px" src="logo-v1.svg" />
                <div style="font-size:32px;font-family: farsi-bold;"> به Vo2 خوش آمدید!</div>
                <div class="q-mt-sm"> شماره همراه ورمزعبورخودرابرای ورود به اکانت کاربریتان وارد کنید</div>
                <div dir="rtl"> <q-form @submit="onSubmit" @reset="onReset" class="q-mt-sm q-gutter-md">

                        <q-input class="input-user" filled v-model="name" label="شماره همراه *"
                            hint="شماره همراه را واردکنید" lazy-rules :rules="[val => val && val.length > 0 || 'شماره همراه رادرست واردکنید',


                            ]" />


                        <div>
                            <q-input hint="رمزعبورراواردکنید" type="password" class="input-responsive" filled v-model="age"
                                label="رمزعبور *" lazy-rules :rules="[
                                    val => val !== null && val !== 'رمزعبوردرست است'

                                ]">
                                <template v-slot:after>
                                    <q-icon style="position: relative;left:50px" name="fa fa-eye" />
                                </template>
                                <template v-slot:hint>

                                </template>
                            </q-input>
                            <div><q-btn class="q-mt-sm" style="direction:rtl;font-size: 12px;" flat to="/forgotPassword"
                                    label="رمزعبورخودرافراموش کردید!" /></div>
                        </div>

                        <q-btn @click="routerChange" label="ورود" class="text-white login-btn"></q-btn>
                        <div class="row">
                            <div class="">حساب کاربری ندارید؟</div>
                            <q-btn style="margin-top:-20px;height: 56px;" flat to="/register" label="ثبت نام"
                                class="text-primary" />
                        </div>
                    </q-form>

                </div>
            </q-card-section>
            <q-card-actions class="btn-grid  flex flex-center">
                قوانین استفاده از vo2
            </q-card-actions>
        </q-card>
    </Suspense>
</template>

<script setup>
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { ref, Suspense } from 'vue'
const $q = useQuasar()
const router = useRouter()
const code = ref('')
const errored = ref(false)
const name = ref(null)
const age = ref(null)

async function routerChange() {
    await api.post('api/login', {
        headers: {
            Authorization: '2325135'
        }
    }).then((response) => {
        code.value = response.data

        if (name.value === '09126592916' && age.value === '12345678') {
            router.push('/')
        } else {
            router.push('/SignOut')
        }
    })
        .catch((error) => {
            console.log(error);
            errored.value = true;
        });
}
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
@import "../css/SignOut.scss"
</style>