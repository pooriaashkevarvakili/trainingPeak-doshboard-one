<template>
  <div>
    <Row>
      <Col :lg="9/20" :md="1" :sm="1" :xl="9/20" :xs="1">
        <q-table
            :columns="workoutReport.plans.columns"
            :data="workoutReport.plans.data"
            :rows-per-page-options="[0]" class="q-mb-md"
            dense flat hide-bottom
            row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="desc" :props="props" style="padding-left: 10px!important;">
                {{ props.row.name }}
              </q-td>
              <q-td v-for="(col,index) in workoutReport.plans.columns.slice(1)" :key="col.name" v-bind:key="index"
                    :props="props">
                <q-input v-if="col.label" v-model="props.row[col.name]" class="q-input-dense" dense
                         input-class="text-center"
                         outlined/>
                <div v-else style="padding-right: 0px!important;">{{ props.row.metric }}</div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-table
            :columns="workoutReport.extra.columns"
            :data="workoutReport.extra.data"
            class="q-mb-md" dense
            flat hide-bottom
            row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="desc" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td v-for="(col,index) in workoutReport.extra.columns.slice(1)" :key="col.name"
                    v-bind:key="index" :props="props">
                <q-input v-if="col.label" v-model="props.row[col.name]" class="q-input-dense" dense
                         input-class="text-center"
                         outlined/>
                <div v-else>{{ props.row.metric }}</div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <!--            <div class="text-center">-->
        <!--              Equipments-->
        <!--              <div v-for="(item, index) in equipment" v-bind:key="index" class="row justify-center">-->
        <!--                <div class="q-mb-xs">-->
        <!--                  {{ item.label }}-->
        <!--                </div>-->
        <!--                <q-select class="q-mb-xs q-mx-md" style="font-size: 85%;" dense options-dense outlined v-model="item.selected" :options="item.options" />-->
        <!--              </div>-->
        <!--            </div>-->
      </Col>
      <Col :lg="11/20" :md="1" :sm="1" :xl="11/20" :xs="1">
        <div class="q-mb-md">
          <div class="q-my-xs">
            Description
            <q-btn class="float-right" dense flat icon="icon-ic_fluent_attach_20_regular" round size="sm"/>
          </div>
          <q-input v-model="workoutMeta.desc" autogrow dense outlined/>
        </div>
        <div class="q-mb-md">
          <div class="q-mb-xs">
            How did you feel?
          </div>
          <q-separator class="q-mb-sm"/>
          <div class="row justify-evenly">
            <q-btn v-for="(btn,index) in workoutReport.feeling.buttons" v-bind:key="index"
                   :color="workoutReport.feeling.selected===btn.label?'primary':''" :icon="btn.icon" dense flat
                   padding="0" round size="lg"
                   @click="selectedFeeling(btn.label)"
            >
              <q-tooltip>{{ btn.label }}</q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="q-mb-md">
          <div class="q-mb-xs">
            Preceived Exertion
            <q-btn dense flat icon="icon-ic_fluent_question_circle_20_regular" padding="0" round size="sm">
              <q-menu>
                <div class="q-pa-md" style="width: 300px; font-size: 90%">
                  <p class="q-mb-none">
                    Rating of Perceived Exertion (RPE) is how hard your effort felt during the workout.
                  </p>
                </div>
              </q-menu>
            </q-btn>
          </div>
          <q-separator class="q-mb-sm"/>
          <div class="row justify-between" style="font-size: 80%">
            <q-slider
                v-model="workoutReport.excertion.selected"
                :max="10"
                :min="1"
                :step="1"
                dense
                label snap
            />
            <div>
              Very Easy
            </div>
            <div>
              Moderate
            </div>
            <div>
              Very Difficult
            </div>
          </div>
        </div>
        <div class="q-mb-md">
          <div class="q-my-xs">
            Post Activity Comments
          </div>
          <q-input v-model="workoutMeta.desc" autogrow dense outlined/>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script lang="js">
import 'vue-colrow/dist/vue-colrow.css'
import { BreakRow, Col, Row } from 'vue-colrow'

export default {
  name: 'CalendarItemSummary',
  components: {
    Row: Row,
    Col: Col,
    'Break-Row': BreakRow
  },
  props: {
    workoutReport: {
      required: true
    },
    workoutMeta: {
      required: true
    }
  },
  methods: {
    selectedFeeling (label) {
      if (this.workoutReport.feeling.selected === label) {
        this.workoutReport.feeling.selected = null
        return
      }
      this.workoutReport.feeling.selected = label
    }
  }
}
</script>

<style lang="scss">
</style>
