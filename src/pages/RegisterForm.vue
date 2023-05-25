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
        <q-card class="card-register-responsive">
            <q-card-section class="q-mr-xl">
                <img class="q-mt-lg" style="width:65px;height:65px" src="logo-v1.svg" />
                <div style="font-size:32px;font-family: farsi-bold;"> پروفایل خودت را بساز!</div>
                <div class="q-mt-sm">باواردکردن اطلاعات خودبه صورت رایگان حساب کاربریتان رابسازید</div>
                <div dir="rtl"> <q-form @submit="onSubmit" @reset="onReset" class="q-mt-sm q-gutter-md">

                        <q-input class="input-user" filled v-model="name" label="نام ونام خانوادگی*" lazy-rules />


                        <q-input class="input-user" filled v-model="mobile" label="شماره همراه *" lazy-rules />


                        <q-select popup-content-class="text-right" use-input filled hide-selected fill-input
                            class="input-user" v-model="model" :options="options" label="جنسیت">
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey"> No results </q-item-section>
                                </q-item>
                            </template>
                        </q-select>



                        <q-input type="password" class="input-responsive" filled v-model="age" label="رمزعبور *" lazy-rules>
                            <template v-slot:after>
                                <q-icon style="position: relative;left:50px" name="fa fa-eye" />
                            </template>

                        </q-input>



                        <q-btn @click="routerChange" label="ثبت نام" class="text-white register-btn"></q-btn>
                        <div class="row">
                            <div class="">حساب کاربری دارید؟</div>
                            <q-btn style="margin-top:-20px;height: 56px;" flat to="/SignOut" label="ورود"
                                class="text-primary" />
                        </div>
                    </q-form>
                    <div class="row items-center justify-center btn-vo2">قوانین استفاده از vo2</div>
                </div>
            </q-card-section>
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
const mobile = ref(null)
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
async function routerChange() {
    await api.post('api/signup', {
        headers: {
            Authorization: '2325135'
        }
    }).then((response) => {
        code.value = response.data

        if (name.value == 'pooria') {
            router.push('/SignOut')
        }






    })
        .catch((error) => {
            console.log(error);
            errored.value = true;
        });
}
function onReset() {
    name.value = null
    age.value = null
    accept.value = false
}
const model = ref(null)
const options = [
    'زن', 'مرد',
]
</script>

<style lang="scss">
@import "../css/Register.scss";
</style>