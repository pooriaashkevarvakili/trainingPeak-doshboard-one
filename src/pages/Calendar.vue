<!-- =========================================================================================
    File Name: calendar.vue
    Description: calendar Component
    Component Name: calendar
    ----------------------------------------------------------------------------------------
    Item Name: Vo2CyclingAcademy - Technology Dep.
      Author: pooriavakili
========================================================================================== -->


<template>
    <div style="height:950px">
        <div dir="rtl" class="q-col-gutter-md  q-py-sm row">
            <div class="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                <div dir="rtl" class="q-mr-lg" style="font-size: 24px;font-family: farsi-bold;">تقویم</div>
                <div dir="rtl" class='demo-app'>
                    <div class='demo-app-sidebar'>
                        <div class='demo-app-sidebar-section'>
                            <h2>دستورالعمل ها</h2>
                            <ul>
                                <li>تاریخ ها را انتخاب کنید و از شما خواسته می شود یک رویداد جدید ایجاد کنید</li>
                                <li>رویدادها را بکشید، رها کنید و اندازه آنها را تغییر دهید</li>
                                <li>روی یک رویداد کلیک کنید تا حذف شود</li>
                            </ul>
                        </div>
                        <div class='demo-app-sidebar-section'>

                            <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
                            تعطیلات آخر هفته را تغییر دهید

                        </div>
                        <div class='demo-app-sidebar-section'>
                            <h2> ({{ currentEvents.length }})</h2>
                            <ul>
                                <li v-for='event in currentEvents' :key='event.id'>
                                    <b>{{ event.startStr }}</b>
                                    <i>{{ event.title }}</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
                        <div class='demo-app-main'>
                            <q-card style="height:780px;margin-top: -10px;width:950px;margin-right: -40px;">
                                <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
                                    <template v-slot:eventContent='arg'>
                                        <b>{{ arg.timeText }}</b>
                                        <i>{{ arg.event.title }}</i>

                                    </template>
                                </FullCalendar>
                            </q-card>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './even-utilis'
const calendarOptions = ref({
    plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
    ],

    headerToolbar: {
        start: '',
        left: 'prev,next today',

        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    editable: true,
    themeSystem: 'bootstrap',
    aspectRatio: '1.2',
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: 'fa',
    weekends: true,
    select: handleDateSelect,
    eventClick: handleEventClick,
    eventsSet: handleEvents

})
const currentEvents = ref([])
function handleWeekendsToggle() {
    calendarOptions.value.weekends = !calendarOptions.value.weekends // update a property
}
function handleDateSelect(selectInfo) {
    let title = prompt('یک ایونت و رویدادجدید ایجاد کنید')
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
    if (title) {
        calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
        })
    }
}
function handleEventClick(clickInfo) {
    if (confirm(`آیا می خواهید این ایونت پاک شود؟`)) {
        clickInfo.event.remove()
    }
}
function handleEvents(events) {
    currentEvents.value = events
}
</script>
<style lang='scss'>
@import "../css/fullCalendar.scss";
</style>