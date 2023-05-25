<!-- =========================================================================================
    File Name: chart.vue
    Description: chart Component
    Component Name:chart Mondana
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->
<template>
    <div>
        <div class="row justify-center">
            <div class="q-py-md q-px-sm" style="width: 45%">
                <div id="frr-last-7" style="position: relative;left:220px;width:780px; height: 260px;" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { onMounted } from 'vue';
import * as echarts from 'echarts/core';
const code = ref()
const errored = ref(false)
import {
    GridComponent, TooltipComponent
} from 'echarts/components';
import {
    LineChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';
echarts.use(
    [GridComponent, LineChart, TooltipComponent, CanvasRenderer]
)
onMounted(() => {
    let last7 = echarts.init(document.getElementById('frr-last-7'))
    // let last28 = echarts.init(document.getElementById('frr-last-28'))
    // let last90 = echarts.init(document.getElementById('frr-last-90'))
    // let last365 = echarts.init(document.getElementById('frr-last-365'))

    let options = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false,
            data: [...new Array(28)].map((c, i) => `day${i}`)
        },
        yAxis: {
            type: 'value',
            show: false
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
        },
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            tooltip: {
                show: true
            }
        },
        series: [{
            data: [...new Array(28)].map((c, i) => Math.floor(Math.random() * 5) + i),
            type: 'line',
            itemStyle: {
                color: '#FADEE8'
            },
            areaStyle: {
                color: '#FADEE8'
            },
            symbolSize: 1,
            animationDuration: 0,
            smooth: true
        }]
    }
    options && last7.setOption(options)
    // options && last28.setOption(options)
    // options && last90.setOption(options)
    // options && last365.setOption(options)

})
function convertDateToMiladi(date) {
    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    let convertDate = new Date(date).toLocaleDateString('fa-IR', options);
    return convertDate
}
async function apiPost() {
    await api.post('athletes/reporting/fitnesshistory', {

    }).then((response) => {
        code.value = response.data
        console.log(response.data);


    })
        .catch((error) => {
            console.log(error);
            errored.value = true;
        });
}
onMounted(() => {
    apiPost()
})
</script>
<style scoped></style>
  