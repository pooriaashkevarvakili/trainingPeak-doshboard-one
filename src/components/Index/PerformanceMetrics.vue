<template>
  <div class="q-my-md">
    <div class="text-black text-center">
      {{ $t('components.perfMetrics.title') }}
      <q-btn dense flat icon="icon-ic_fluent_question_circle_20_regular" round size="sm">
        <q-menu>
          <div class="q-pa-md" style="width: 300px; font-size: 90%">
            <p>
              Performance Metrics
            </p>

            <p>
              Your Fitness, Fatigue and Form values are used to analyze and improve your training.
            </p>

            <p>
              TrainingPeaks determines these values by assigning a Training Stress Score (TSS) to every workout based on
              duration and intensity.
            </p>
            <p>
              Fitness (CTL) is a rolling 42 day average of your daily TSS.
            </p>
            <p>
              Fatigue (ATL) is a 7 day average of your TSS that accounts for the workouts you have done recently.
            </p>
            <p>
              Form (TSB) is the balance of TSS equal to yesterday's fitness minus yesterday's fatigue.
            </p>
          </div>
        </q-menu>
      </q-btn>
    </div>
    <div class="row justify-center q-my-lg text-white">
      <q-card class="metric side" flat>
        <h5 class="number no-margin">50</h5>
        <div class="description no-border-radius">
          {{ $t('components.perfMetrics.fatigue') }}
        </div>
      </q-card>
      <q-card class="metric main" style="background-color: #5e92b9" flat>
        <h4 class="number no-margin text-white">60</h4>
        <div class="description">{{ $t('components.perfMetrics.fitness') }}</div>
      </q-card>
      <q-card class="metric side" flat>
        <h5 class="number no-margin">10</h5>
        <div class="description no-border-radius">
          {{ $t('components.perfMetrics.form') }}
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerformanceMetrics'
}
</script>

<style lang="scss" scoped>
@import "../../css/performanceMetrics.scss"
</style>
