<template>
  <h2>Monthly View</h2>
  <FullCalendar ref="calendarRef" v-bind:options="options" @dateClick="showForm = true" />
  <div v-if="showForm" class="event-form">
    <h2>Nytt Event</h2>
    <div class="modal">
      <form @submit.prevent="addEvent">
        <ul class="form-list">
          <li class="form-list__row">
            <label for="title">Event Namn</label>
            <input type="text" id="title" v-model="event.title" required />
          </li>
          <li class="form-list__row">
            <label for="start-date">Start Datum:</label>
            <div class="form-list__input-inline">
              <input type="date" id="start-date" v-model="event.start" required />
            </div>
            <label for="start-time">Start Tid:</label>
            <div class="form-list__input-inline">
              <input type="time" id="start-time" v-model="event.startTime" required />
            </div>
            <div>
              <label for="end-date">Slut Datum:</label>
              <div class="form-list__input-inline">
                <input type="date" id="end-date" v-model="event.end" required />
              </div>
              <label for="end-time">Slut Tid:</label>
              <div class="form-list__input-inline">
                <input type="time" id="end-time" v-model="event.endTime" required />
              </div>
            </div>
          </li>
          <li class="form-list__row form-list__row--agree"></li>
          <li>
            <button type="submit" class="button">Lägg till event</button>
            <button type="button" @click="showForm = false" class="button">Cancel</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  mounted() {
    if (localStorage.getItem('events') !== null) {
      this.events = JSON.parse(localStorage.getItem('events'))
    } else {
      this.events = []
      localStorage.setItem('events', JSON.stringify(this.events))
    }
  },
  components: {
    FullCalendar
  },
  setup() {
    const calendarRef = ref(null)
    const showForm = ref(false)
    const events = JSON.parse(localStorage.getItem('events'))
    const event = reactive({
      title: '',
      start: '',
      startTime: '',
      end: '',
      endTime: ''
    })

    watch(calendarRef, () => {
      if (calendarRef.value) {
        calendarRef.value.getApi().gotoDate(new Date())
      }
    })
    const options = reactive({
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      editable: true,
      selectable: true,
      timeZone: 'Europe/Paris',
      dateClick: (arg) => {
        event.start = arg.date.toISOString().slice(0, 10)
        event.startTime = '12:00'
        event.end = arg.date.toISOString().slice(0, 10)
        event.endTime = '13:00'
        showForm.value = true
      }
    })
    const addEvent = () => {
      const api = calendarRef.value.getApi()
      const newEvent = {
        title: event.title,
        start: `${event.start}T${event.startTime}:00`,
        end: `${event.end}T${event.endTime}:00`
      }
      api.addEvent(newEvent)
      showForm.value = false
      events.push(newEvent)
      localStorage.setItem('events', JSON.stringify(events))
    }
    return {
      calendarRef,
      showForm,
      event,
      options,
      addEvent
    }
  }
}
</script>

<style>
body {
  font-family: 'Open Sans', sans-serif;
  color: #1a1a1a;
  background-color: #f0f0f0;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  font-weight: 600;
}

.button {
  color: #ffffff;
  background-color: #24cf5f;
  padding: 12px 25px;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 0;
  border-radius: 2px;
  outline: 0;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  margin-right: 15px;
}
.button:hover,
.button:active,
.button:focus {
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.button--transparent {
  background: transparent;
  border: 0;
  outline: 0;
}

.button--close {
  position: absolute;
  top: 10px;
  left: 10px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #ffffff;
  border-radius: 50%;
  transition: all 0.25s;
  z-index: 10;
}
.button--close svg {
  width: 20px;
  height: 20px;
}
.button--close svg * {
  fill: currentColor;
}
.button--close:hover,
.button--close:active,
.button--close:focus {
  color: #fbcf34;
  background-color: #ffffff;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1);
}

.button--info {
  position: absolute;
  top: 0;
  right: 0;
}

input {
  width: calc(100% - 10px);
  min-height: 30px;
  padding-left: 5px;
  padding-right: 5px;
  letter-spacing: 0.5px;
  border: 0;
  border-bottom: 2px solid #f0f0f0;
}
input:valid {
  border-color: #24cf5f;
}
input:focus {
  outline: none;
  border-color: #fbcf34;
}

.form-list {
  padding-left: 0;
  list-style: none;
}
.form-list__row {
  margin-bottom: 25px;
}
.form-list__row label {
  position: relative;
  display: block;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.5px;
  color: #939393;
}
.form-list__row--inline {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.form-list__row--inline > :first-child {
  -ms-flex: 2;
  flex: 2;
  padding-right: 20px;
}
.form-list__row--inline > :nth-child(2n) {
  -ms-flex: 1;
  flex: 1;
}
.form-list__input-inline {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.form-list__input-inline > * {
  width: calc(50% - 10px - 10px);
}
.form-list__row--agree {
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 12px;
}
.form-list__row--agree label {
  font-weight: 400;
  text-transform: none;
  color: #676767;
}
.form-list__row--agree input {
  width: auto;
  margin-right: 5px;
}
</style>
