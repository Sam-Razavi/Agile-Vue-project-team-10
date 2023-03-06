<script setup>
// plugin imports för olika vyer
import { ref, reactive, watch } from 'vue'
import '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

// 10st förinlagda Kalender händelser, därav (10), så börjar nya inlägg med id från 11
const id = ref (10)
//Variabel döpt options, med knappar att välja att visa olika vyer av kalendern, samt vart på sidan knapparna ska ligga
const options = reactive ({
    plugins:[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initalView: 'dayGridMonth',
    headerToolbar: {
        left:'prev, next, today',
        center: 'title',
        right: 'dayGridMonth, dayGridWeek, listDay'
    },
// Satta till true så att de ska gå att ändra och välja samt se helger
    editable: true,
    selectable: true,
    weekends: true,
// Funktion så att det blir en ny händelse +1
    select: (arg) => {
        id.value = id.value + 1
// Renderar ut en ny händelse vid "eventClick", samt loggar till konsollen.
    const cal = arg.view.calendar
        cal.unselect ()
        cal.addEvent ({
            id: `${id.value}`,
            title: `Ny händelse ${id.value}`,
            start: arg.start,
            end: arg.end,
            allDay: true
        })
    },
    eventClick: (arg) => {
console.log(arg.event.title)
}
})
</script>

<template>
    <h2>Monthly View</h2>
<!-- Här renderas kalendern ut med v-bind  -->
    <FullCalendar v-bind:options="options"/>
</template>
