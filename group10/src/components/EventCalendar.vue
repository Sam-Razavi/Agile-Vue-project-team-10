<script setup>
// plugin imports för olika vyer
import { ref, reactive, watch } from 'vue'
import '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import useEvents from '../composables/useEvents'

// 6st redan förinlagda Kalender händelser i json, därav (6), så nya inlägg börjar med id från 6 +1
const id = ref (6)
const { getEvents, createEvent, updateEvent, destroyEvent } = useEvents()
//Variabel döpt options, med plugin knappar att välja att visa olika vyer av kalendern, samt vart på sidan knapparna ska ligga
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
// variabeln cal renderar ut en ny händelse vid "eventClick".
    const cal = arg.view.calendar
        cal.unselect ()
        cal.addEvent ({
            // Value (6) +1 blir nya id't
            id: `${id.value}`,
            // Händelsen/eventets namn blir först Ny händelse +id't
            title: `Ny händelse ${id.value}`,
            start: arg.start,
            end: arg.end,
            allDay: true
        })
    },

    // eventClick funktion som tar bort eventet vid onClick
    eventClick: (arg) =>{
        if(arg.event){
            arg.event.remove()
        }
    },
    // eventAdd funktionen sparar Nya händelsen i objektet events med sitt id, title, tid osv.
    events: [],
eventAdd: (arg) => {
createEvent ({
    id: arg.event.id,
    title: arg.event.title,
    start: arg.event.start,
    end: arg.event.end,
    allDay: arg.event.allDay
})
},
// eventChange funktion som ändrar en befintlig händelse
eventChange: (arg) => {
updateEvent ({
    id: arg.event.id,
    title: arg.event.title,
    start: arg.event.start,
    end: arg.event.end,
    allDay: arg.event.allDay
}, arg.event.id)
},
// Tar bort händelsen, kom dock aldrig så långt
eventRemove: (arg) => {
destroyEvent(arg.event.id)
},
})

// Bevakar befintliga /nya händelser med watch
options.events = getEvents.value
watch(getEvents, () => {
    options.events = getEvents.value
})
</script>

<template>
    <h2>Monthly View</h2>
<!-- Här renderas kalendern ut med v-bind  -->
    <FullCalendar v-bind:options="options"/>
</template>
