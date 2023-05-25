<template>
    <div>pooria</div>
    <useCalendar id="calendar" :attributes='attributes' :first-day-of-week='7' :masks='masks' :show-summary='true'
        class="q-px-sm col" is-expanded locale="fa-FA" style="background-color: rgba(255,255,255,0.8)" trim-weeks
        @transition-start='injectSummaryColumn()' @update:from-page='updateCalPageNav($event)'>
        <template v-slot:day-content='{ day, attributes }'>
            <q-card bordered class='calendar-day q-mr-xs drop-target bg-transparent' flat style='' tabindex='0'>
                <header :id='`day${day.day}`' class='header bg-grey-3 q-py-xs' @dragenter='onDragEnter'
                    @dragleave='onDragLeave' @dragover='onDragOver' @drop='onDrop'>
                    {{ day.date.toLocaleDateString('fa').split('/')[2] }}

                    <q-btn class='day-action float-right q-mr-xs' dense flat icon='icon-ic_fluent_navigation_20_regular'
                        padding='0' size='sm' unelevated>
                        <q-menu anchor='bottom left' class='action-menu' self='top right'>
                            <div class='q-pa-xs' style='width: 100px; font-size: 90%'>
                                <q-list dense>
                                    <q-item class='row justify-start' clickable>
                                        <div class='self-center' style='font-size: 105%'>
                                            Copy
                                        </div>
                                    </q-item>
                                    <q-item class='row justify-start' clickable>
                                        <div class='self-center' style='font-size: 105%'>
                                            Cut
                                        </div>
                                    </q-item>
                                    <q-item class='row justify-start' clickable>
                                        <div class='self-center' style='font-size: 105%'>
                                            Paste
                                        </div>
                                    </q-item>
                                    <q-item class='row justify-start' clickable>
                                        <div class='self-center' style='font-size: 105%'>
                                            Delete
                                        </div>
                                    </q-item>
                                </q-list>
                            </div>
                        </q-menu>
                    </q-btn>
                </header>
                <div v-for='(attr, index) in attributes' :id='`day${day.day}_item${attr.key}`' v-bind:key='index'
                    :class='attr.customData.class' draggable='true' @dragstart='onDragStart'>
                    <calendar-item :data="{ workoutPlan: workoutPlan, ...attr.customData }" :type="attr.customData.type"
                        class="content text-black q-my-sm q-mx-xs"
                        @clicked="openCIM(attr.dates, attr.customData.type, attr.customData)" />
                </div>

                <q-card class='day-action q-ma-sm bg-transparent'>
                    <q-card-section class='q-pa-none' style='border: 1px dashed dimgrey'>
                        <q-btn class='full-width' color='black' flat icon='icon-ic_fluent_add_20_regular'
                            label='Add an Event' size='sm' stack @click='createCalendarItem(day.id)' />
                    </q-card-section>
                </q-card>
            </q-card>
        </template>
    </useCalendar>
    <q-dialog v-model='cic.show'>
        <CalendarItemCreation :selectedDate='cic.selectedDate' v-on:itemSelect='createCalendarSelectedItem($event)' />
    </q-dialog>
    <q-dialog v-model='cim.show'>
        <CalendarItemManagement :newData="{ workoutPlan: workoutPlan, workoutType: 'bike', ...cim.data }"
            :selected-date='new Date()' :type="cim.selectedType" title='My Cool Little Competition' />
    </q-dialog>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import WorkoutBuilder from 'components/Calendar/CIM/workout-builder/WorkoutBuilder.vue'
import { CalendarItemTypes, WorkoutTypes } from 'components/Calendar/Models.js'
// import WorkoutBlocks from 'components/WorkoutBlocks.vue'
import Calendar from '../components/Calendar/v-calendar/calendar.umd.min.js'
import CalendarItem from '../components/Calendar/CalendarItem.vue'
import CalendarItemCreation from '../components/Calendar/CIM/CalendarItemCreation.vue'
import CalendarItemManagement from 'components/Calendar/CIM/CalendarItemManagement.vue'
import calendarSummary from '../components/Calendar/CalendarSummary'
const month = 4
const year = new Date().getFullYear()
const attributes = [
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            title: 'Lunch with mom.',
            type: CalendarItemTypes.WORKOUT,
            workType: WorkoutTypes.CYCLE,
            class: 'bg-red-600 text-white'
        },
        dates: new Date(year, month, 1)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            description: 'Run a lot',
            type: CalendarItemTypes.GOALS,
            class: 'bg-red-600 text-white'
        },
        dates: new Date(year, month, 1)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            title: 'Take Noah to basketball practice',
            type: CalendarItemTypes.WORKOUT,
            workType: WorkoutTypes.RUN,
            class: 'bg-blue-500 text-white'
        },
        dates: new Date(year, month, 2)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            title: 'Noah\'s basketball game.',
            type: CalendarItemTypes.WORKOUT,
            workType: WorkoutTypes.CYCLE,
            class: 'bg-blue-500 text-white'
        },
        dates: new Date(year, month, 5)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            type: CalendarItemTypes.WORKOUT,
            title: 'Take car to the shop',
            workType: WorkoutTypes.CYCLE,
            class: 'bg-indigo-500 text-white'
        },
        dates: new Date(year, month, 5)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            title: 'Important Event',
            eventType: 'Cycling',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            due: new Date(year, month, 28),
            type: CalendarItemTypes.EVENT,
            class: 'bg-indigo-500 text-white'
        },
        dates: new Date(year, month, 28)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            title: 'Drink water',
            description: 'Drink a lot of water..',
            type: CalendarItemTypes.NOTE,
            class: 'bg-red-600 text-white'
        },
        dates: new Date(year, month, 6)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            measurements: [
                {
                    name: 'Weight',
                    value: 61,
                    unit: 'kg'
                },
                {
                    name: 'Sleep',
                    value: '8:20',
                    unit: 'hrs'
                },
                {
                    name: 'Note',
                    value: 'this is a note',
                    unit: 'text'
                }
            ],
            type: CalendarItemTypes.METRICS,
            class: 'bg-red-600 text-white'
        },
        dates: new Date(year, month, 6)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            title: 'Meeting with new client.',
            type: CalendarItemTypes.WORKOUT,
            workType: WorkoutTypes.RUN,
            class: 'bg-teal-500 text-white'
        },
        dates: new Date(year, month, 7)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            title: 'Mia\'s gymnastics practice.',
            type: CalendarItemTypes.WORKOUT,
            workType: WorkoutTypes.SWIM,
            class: 'bg-pink-500 text-white'
        },
        dates: new Date(year, month, 11)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            title: 'Cookout with friends.',
            type: CalendarItemTypes.WORKOUT,
            workType: WorkoutTypes.RUN,
            class: 'bg-orange-500 text-white'
        },
        dates: new Date(year, month, 27)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            title: 'Mia\'s gymnastics recital.',
            type: CalendarItemTypes.WORKOUT,
            workType: WorkoutTypes.CYCLE,
            class: 'bg-pink-500 text-white'
        },
        dates: new Date(year, month, 22)
    },
    {
        key: Math.ceil(Math.random() * 123456789),
        customData: {
            title: 'Visit great grandma.',
            type: CalendarItemTypes.WORKOUT,
            workType: WorkoutTypes.RUN,
            class: 'bg-red-600 text-white'
        },
        dates: new Date(year, month, 25)
    }
]
// CalendarItemTypes,
const masks = {
    weekdays: 'WWW',
    title: 'MMM YYYY'
}

const calendarPage = ref(null)

const cic = ref({
    show: false,
    selectedDate: null,
    data: {}
})
const cim = ref({
    show: false,
    selectedType: null
})
const workoutPlan = ref([])
function onDragStart(e) {
    e.dataTransfer.setData('text', e.target.id)
    e.dataTransfer.dropEffect = 'move'
}
function onDragEnter(e) {
    // don't drop on other draggables
    if (!e.target.draggable) {
        e.target.classList.add('drag-enter')
    }
}
function onDragLeave(e) {
    e.target.classList.remove('drag-enter')
}
function onDragOver(e) {
    e.preventDefault()
}
function onDrop(e) {
    e.preventDefault()

    // don't drop on other draggables
    if (e.target.draggable) {
        return
    }

    const draggedId = e.dataTransfer.getData('text')
    const draggedEl = document.getElementById(draggedId)

    // check if original parent node
    if (draggedEl.parentNode === e.target) {
        e.target.classList.remove('drag-enter')
        return
    }

    // make the exchange
    const draggedItemKey = parseInt(draggedId.split('_')[1].slice(4))
    const draggingItemTarget = parseInt(e.target.id.slice(3))
    const splicedEl = this.attributes.splice(this.attributes.findIndex(item => item.key === draggedItemKey), 1)[0]
    splicedEl.dates.setDate(draggingItemTarget)
    this.attributes.push(splicedEl)
    e.target.classList.remove('drag-enter')
}

function createCalendarItem(date) {
    this.cic.selectedDate = new Date(date)
    this.cic.show = true
}
function createCalendarSelectedItem(item) {
    this.cim.selectedType = item.value
    this.cim.show = true
}
function openCIM(date, type, data) {
    // console.log(date, type)
    // this.cic.selectedDate = new Date(date[0].start)
    // if(type)
    //   this.cim.selectedType = 0
    // console.log(this.cic.selectedDate, this.cim.selectedType)
    this.cim.selectedType = type
    this.cim.data = data
    this.cim.show = true
}

function injectSummaryColumn() {
    // This is horrible
    // Please Don't do this again
    // TODO: stop manipulating DOM directly and fix this
    [...document.getElementsByClassName('summary')].forEach((el) => {
        const week = el.classList[1].slice(4)
        el.innerHTML = calendarSummary({
            swim: 'test',
            bike: 'wow'
        }
            , week
            , this.attributes.findIndex((item) => {
                return item.dates.getMonth() === this.calendarPage.month - 1 &&
                    (item.dates.getDate() >= (week - 1) * 7) &&
                    (item.dates.getDate() < week * 7)
            }) === -1)
    })
}
function updateCalPageNav(from) {
    this.calendarPage = from
}
const calendarSize = computed(() => {
    if (this.$q.screen.width < 750) {
        return 'xs'
    }
    if (this.$q.screen.width < 850) {
        return 'sm'
    }
    if (this.$q.screen.width < 1200) {
        return 'md'
    }
    return 'lg'
})
onMounted(() => {
    const blockTypes = WorkoutBuilder.types
    this.workoutPlan.push(WorkoutBuilder.build(blockTypes.WARMUP))
    this.workoutPlan.push(WorkoutBuilder.build(blockTypes.RAMPUP))
    this.workoutPlan.push(WorkoutBuilder.build(blockTypes.ACTIVE))
    this.workoutPlan.push(WorkoutBuilder.build(blockTypes.THREEREPEATS))
    console.log(this.workoutPlan)

    this.injectSummaryColumn()
})
</script>

  
<style lang='scss' scoped>
//break points (as defined in Calendar.vue)
$md: 1200px;
$sm: 850px;
$xs: 750px;

#calendar {
    max-width: calc(100vw - 290px - 40px);
    min-width: calc(100vw - 290px - 40px);
}

.drag-enter {
    outline: 2px dashed
}

.vc-container {
    font-family: farsi, latin, sans-serif;
    overflow-x: hidden !important;
}

.calendar-day {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
    min-height: 10vh !important;
    overflow-y: scroll;
    width: calc((100vw - 290px - 85px) / 8);
    height: 100%;
    border-bottom: none;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.calendar-day::-webkit-scrollbar {
    display: none;
}

.calendar-day>.header {
    margin: 0;
    padding-left: 5px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 666;
}

.day-action {
    opacity: 0.0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
    -webkit-transition: all 150ms ease-in-out;
    transition: all 150ms ease-in-out;
}

.vc-day:hover .day-action {
    opacity: 1.0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
}

.action-menu:hover+.day-action {
    opacity: 1.0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
}

.calendar-day:focus .day-action {
    opacity: 1.0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
}

@media screen and (max-width: 1499px) {
    #calendar {
        max-width: calc(100vw - 120px);
        min-width: calc(100vw - 120px);
    }

    .calendar-day {
        overflow-y: scroll;
        width: calc((100vw - 120px - 85px) / 8);
    }
}
</style>
  
<style lang='scss'>
.on-left {
    margin: 0;
    padding: 0;
}

.on-right {
    margin: 0;
    padding: 0;
}

.vc-day {
    margin-bottom: 5px;
}

.summary {
    border-radius: 5px;
}

@media (max-width: 750px) {
    .vc-weeks {
        display: block !important;
        position: relative;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        padding: 5px;
    }

    .vc-weekday {
        display: none;
    }

    .in-prev-month {
        display: none;
    }

    .calendar-day {
        margin: 0 !important;
        width: 100% !important;
        padding: 5px;
    }

    .calendar-day>* {
        padding-left: 10px;
        padding-right: 10px;
    }
}
</style>
  