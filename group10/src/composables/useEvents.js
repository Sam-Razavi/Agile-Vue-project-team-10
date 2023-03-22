import { ref, onMounted } from "vue"
import { fetchEvent, storeEvent, changeEvent, deleteEvent } from "../apis/events.js"

// Hämtar funktionen från useEvents.js filen
export default function useEvents() {
// Hämtar ref i [] med getEvents
    const getEvents = ref([])
// Variabler för olika funktioner att hantera händelserna
    const setEvent = async () => {
        getEvents.value = await fetchEvent()
    }

    const createEvent = (event) => {
        storeEvent(event)
    }

    const updateEvent = (event, id) => {
        changeEvent(event, id)
    }

    const destroyEvent = (id) => {
        deleteEvent(id)
    }

    onMounted(setEvent)

// Returnerar alla events
    return{
        getEvents,
        setEvent,
        createEvent,
        updateEvent,
        destroyEvent,
    }
}
