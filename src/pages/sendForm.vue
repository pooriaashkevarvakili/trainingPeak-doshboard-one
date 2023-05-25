<!-- =========================================================================================
    File Name: SendForm.vue
    Description: Send Component
    Component Name: SendForm
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <Suspense>
        <q-card class="card-login-responsive">
            <q-card-section class="q-mr-xl">
                <img class="q-mt-lg" style="width:65px;height:65px" src="logo-v1.svg" />
                <div style="font-size:32px;font-family: farsi-bold;">پروفایل خودت رابساز!</div>
                <div class="q-mt-sm"> کدتاییدبرای شماارسال شد،لطفاآن راواردکنید</div>
                <div dir="rtl"> <q-form @submit="onSubmit" @reset="onReset" class="q-mt-sm q-gutter-md">
                        <div class="row justify-center">
                            <div style="color:#DF2063">ویرایش</div>
                            <div class="q-ml-sm">0912344387</div>
                        </div>
                        <div class="row justify-center">

                            <q-input style="width:56px;height:56px" filled v-model="name" lazy-rules />
                            <q-input class="q-mr-sm" style="width:56px;height:56px" filled v-model="nameOne" lazy-rules />
                            <q-input class="q-mr-sm" style="width:56px;height:56px" filled v-model="nameTwo" lazy-rules />
                            <q-input class="q-mr-sm" style="width:56px;height:56px" filled v-model="age" lazy-rules />
                        </div>
                        <div class="row ersal-repeat justify-center">
                            ارسال مجدد کد پس از (4:02)
                        </div>



                        <q-btn style="height:56px" label="ورود" class=" sendform-btn"></q-btn>

                    </q-form>
                    <div class="send-form">
                        قوانین استفاده از vo2
                    </div>
                </div>
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
const nameOne = ref(null)
const nameTwo = ref(null)
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
@import "../css/send"
</style>