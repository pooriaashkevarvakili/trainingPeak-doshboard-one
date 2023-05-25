<!-- =========================================================================================
    File Name: workoutBlocks.vue
    Description: workoutBlocks
    Component Name: workoutBlocks
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->

<template>
  <div class="wb--container">
    <div class="wb--chart" :id="idOne" v-if="workoutPlan">
      <div v-for="(_block, _bindex) of workoutPlan" v-bind:key="_bindex" class="wb--block" :id="`block_${_bindex}`"
        @click="scrollToBlockCard(_bindex)" :style="{ flex: blockLengthCalc(_block) }"
        @mouseenter="blockHover(_bindex, true)" @mouseleave="blockHover(_bindex, false)">
        <q-btn v-if="detailed" @click="(e) => removeBlock(_bindex) && e.stopPropagation()" class="wb--remove" dense round
          flat size="xs">
          <img src="/fluent-icons/close.svg">
        </q-btn>
        <div v-for="(_step, _sindex) of _block.structure" v-bind:key="_sindex" class="wb--step"
          :style="{ flex: _step.length.value }" :ref="`block_${_bindex}_step_${_sindex}`"
          @mouseenter="stepHover(_bindex, _sindex, true)" @mouseleave="stepHover(_bindex, _sindex, false)">
          <div class="min"
            :style="{ height: (_step.goal.min | _step.goal) + '%', backgroundColor: (_step.length.type === WorkoutBuilder.ELength.DISTANCE) ? 'lightgray' : '' }">
          </div>
          <div v-if="_step.goalType === WorkoutBuilder.EGoal.RANGE" class="max"
            :style="{ height: (_step.goal.max - _step.goal.min) + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import WorkoutBuilder from './Calendar/CIM/workout-builder/WorkoutBuilder'

import { ref, onUnmounted, watch } from 'vue'
const chart = ref(null)


const props = defineProps({
  detailed: {
    type: Boolean,
    required: true
  },
  workoutPlan: {
    required: true,
    default: null
  }
})
const idOne = 'latduoiqjdvquhdnjkqdgjkiuyhgbjio9u87yughjnkioy7utfhghbjio9u876t5ryuio9u876t5r7y89iu87t5ry7o9iu8y7trgfvnbmkliouy7tvgnbjkloi9u67mnjkloi9ufcgvbnjklk2libdvgqkiukwbdvtkyid2kjbhk1uhidiiudb3ukbf28i1yei12une1293u1o2ldmas,dkaslknfa,sndkjwhdo2qihiuqgrklwmdlqwkdnasdnlasfi3q'.slice(0, Math.floor(Math.random() * 210));
function blockLengthCalc(block) {
  return block.structure.reduce((a, b) => a + b.length.value, 0)
}
function scrollToBlockCard(blockIndex) {
  if (detailed)
    return
  document.getElementById(`blockCard_${blockIndex}`).scrollIntoView(true)
}
function blockHover(index, state) {
  if (!props.detailed)
    return
  if (state)
    document.getElementsByClassName('block-editor')[0].querySelectorAll('.block')[index].classList.add('sim-hover')
  else
    document.getElementsByClassName('block-editor')[0].querySelectorAll('.block')[index].classList.remove('sim-hover')

}
function stepHover(bindex, sindex, state) {
  if (!props.detailed)
    return
  if (state)
    document.getElementsByClassName('block-editor')[0].querySelectorAll('.block')[bindex].children[sindex].classList.add('sim-hover')
  else
    document.getElementsByClassName('block-editor')[0].querySelectorAll('.block')[bindex].children[sindex].classList.remove('sim-hover')

}
function removeBlock(index) {
  workoutPlan = workoutPlan.splice(index, 1)
}

onUnmounted(() => {
  try {
    document.styleSheets[0].removeRule('.wb--chart .wb--block:hover {  background-color: rgba(0,0,0,0.2); }')
  } catch (e) {

  }
})
watch(() => {
  props.detailed = (n) => {
    if (n === true) {
      document.styleSheets[0].insertRule('.wb--chart .wb--block:hover {  background-color: rgba(0,0,0,0.2); }')
    }
    if (n === false) {
      document.styleSheets[0].removeRule('.wb--chart .wb--block:hover {  background-color: rgba(0,0,0,0.2); }')
    }
  }
})
</script>
<style lang="scss">
@import "../css/WorkoutBlocks"
</style>
