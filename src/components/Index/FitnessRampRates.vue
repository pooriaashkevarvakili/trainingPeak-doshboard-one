<template>
  <div>

    <div class="text-black">
      {{ $t('components.frr.title') }}
      <q-btn dense flat icon="icon-ic_fluent_question_circle_20_regular" round size="sm">
        <q-menu>
          <div class="q-pa-md" style="width: 300px; font-size: 90%">
            <p>
              Fitness Ramp Rates
            </p>

            <p>
              These are the rates at which your Fitness (CTL) is rising or declining.
            </p>
          </div>
        </q-menu>
      </q-btn>
    </div>
    <div class="row justify-center">
      <div class="q-py-md q-px-sm" style="width: 45%">
        <div> {{ code && convertDateToMiladi(code[0].endDate) }}</div>
        <div id="frr-last-7" style="width: 100%; height: 85px;" />
      </div>
      <div class="q-py-md q-px-sm" style="width: 45%">
        <div> {{ code && convertDateToMiladi(code[1].endDate) }}</div>
        <div id="frr-last-28" style="width: 100%; height: 85px;" />
      </div>
      <div class="q-py-md q-px-sm" style="width: 45%">
        <div>{{ code && convertDateToMiladi(code[2].endDate) }}</div>
        <div id="frr-last-90" style="width: 100%; height: 85px;" />
      </div>
      <div class="q-py-md q-px-sm" style="width: 45%">
        <div>{{ code && convertDateToMiladi(code[3].endDate) }}</div>
        <div id="frr-last-365" style="width: 100%; height: 85px;" />
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
  let last28 = echarts.init(document.getElementById('frr-last-28'))
  let last90 = echarts.init(document.getElementById('frr-last-90'))
  let last365 = echarts.init(document.getElementById('frr-last-365'))

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
        color: '#6979e8'
      },
      areaStyle: {
        color: '#5e92b9'
      },
      symbolSize: 1,
      animationDuration: 0,
      smooth: true
    }]
  }
  options && last7.setOption(options)
  options && last28.setOption(options)
  options && last90.setOption(options)
  options && last365.setOption(options)

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
