<!-- =========================================================================================
    File Name: mondana.vue
    Description: mondna Component
    Component Name: mondana
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <div class="row hover-white">
        <q-list>
            <router-link style="text-decoration: none;color:#000" to="/mondana">
                <q-item>
                    <q-item-section avatar>
                        <img src="Ellipse 375.png" />
                    </q-item-section>

                    <q-item-section class="q-mt-xs">
                        {{ code && code.name }}
                    </q-item-section>
                </q-item>
            </router-link>
        </q-list>
        <div style="margin-right:25px;margin-top:15px" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:35px;margin-top: 15px;" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:32px;margin-top:15px" class="q-mt-sm">
            <img src="alert-circle.png" />
        </div>
        <div style="margin-right:35px;margin-top:15px" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm">
            <img src="circle-check.png" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm">
            <img src="circleHidden.svg" />
        </div>
        <div style="margin-right:45px;margin-top:15px" class="q-mt-sm">
            <img src="circleHidden.svg" />
        </div>
        <img src="achar.svg" style="color:#6666;margin-right:58px;margin-top:2px" @click="changeRouter" />
        <img src="Calendar.svg" @click="changeRouterOne" style="color:#6666;margin-right:20px;margin-top:2px"
            name="settings" />
    </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router';
const code = ref('')
const errored = ref(false)
const router = useRouter()
function changeRouter() {
    router.push('Settings')
}
function changeRouterOne() {
    router.push('Calendar')
}
async function routerChange() {
    await axios.get(' http://localhost:4000/athletes', {

    }).then((response) => {
        code.value = response.data


    })
        .catch((error) => {
            console.log(error);
            errored.value = true;
        });
}
onMounted(() => {
    routerChange()
})
</script>

<style lang="scss">
:focus {
    .hover-white {
        background-color: #fff;
        cursor: pointer;
    }

    .hover-white-one {
        background-color: #fff;
        cursor: pointer;
    }
}
</style>