<template>
    <div>
        <div class="calendar-header">
        <!-- Where it shows the start and the end of the week -->
      <button @click="viewPreviousWeek">Previous Week</button>
      <h2>{{ startDate }} - {{ endDate }}</h2>
    <button @click="viewNextWeek">Next Week</button>
    </div>
    <h2 class="current-date text-center">{{ TodaysDate }}</h2>

    <h2 class ="week-number"> Week {{ currentWeekNumber }}</h2>
    <div class="container">
      <div>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <!-- Column for each day in the day object -->
            <th v-for="(day, index) in days" :key="day" :class="{ 'today': moment().add(index, 'days').isSame(moment(), 'day') }">
  {{ moment().add(index, 'days').format('MMM DD') }}
</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hour, index) in hours" :key="index">
            <td>{{ hour.time }}</td>
            <td class="eventCell" v-for="(day, dayIndex) in days" :key="dayIndex">
              <div v-if="hour[day]">
                {{ hour[day].event }}
              </div>
              <div v-else>
              <!-- Creating a button for adding events -->
                <button class="addEvent" @click="addEvent(day, hour.time, $event.currentTarget)">Add Event</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
  </div>
  </template>

  <script>
  import moment from 'moment'

  export default {
    data() {
        const days = this.getWeekDays(moment())
      return {
        TodaysDate: moment().format('MMMM Do YYYY'),
        currentDate: new Date(),
        currentWeekNumber: null,
        moment: moment,
        //Days of the week
        days: days,
        events: [],
        //Time slots
        hours: [
          { time: "1:00 AM" },
          { time: "2:00 AM" },
          { time: "3:00 AM" },
          { time: "4:00 AM" },
          { time: "5:00 AM" },
          { time: "6:00 AM" },
          { time: "7:00 AM" },
          { time: "8:00 AM" },
          { time: "9:00 AM" },
          { time: "10:00 AM" },
          { time: "11:00 AM" },
          { time: "12:00 PM" },
          { time: "1:00 PM" },
          { time: "2:00 PM" },
          { time: "3:00 PM" },
          { time: "4:00 PM" },
          { time: "5:00 PM" },
          { time: "6:00 PM" },
          { time: "7:00 PM" },
          { time: "8:00 PM" },
          { time: "9:00 PM" },
          { time: "10:00 PM" },
          { time: "11:00 PM" },
          { time: "12:00 PM" },
        ]
      }
    },
    mounted() {
    // retrieve events from local storage when component is mounted
    const storedEvents = JSON.parse(localStorage.getItem('events')) || []
    this.events = storedEvents
  },
    methods: {
        //Method for the button that adds events
  addEvent(day, time, button) {
    //Creating an input element
  const input = document.createElement('input')
  //Getting the position of the button so we can put the input element in it's place
  const buttonRect = button.getBoundingClientRect()
  //styling the input element
  input.style.position = 'absolute'
  input.style.top = `${buttonRect.top}px`
  input.style.left = `${buttonRect.left}px`
  input.style.width = `${buttonRect.width}px`
  input.style.height = `${buttonRect.height}px`

  const hour = this.hours.find(hour => hour.time === time)
  const cell = hour[day]

  if (cell) {
    input.value = cell.event
  }
//we create a function for saving the events. adding trim will eliminate any spaces before and after a text
const saveEvent = () => {
  const value = input.value.trim()

  if (value) {
      hour[day].event = value
      const eventIndex = this.events.findIndex(event => event.time === time && event.day === day)
      if (eventIndex !== -1) {
            this.events[eventIndex].event = value
          }
  } else {
    delete hour[day]
    const eventIndex = this.events.findIndex(event => event.time === time && event.day === day)
    if (eventIndex !== -1) {
      this.events.splice(eventIndex, 1)
    }
  }

  document.body.removeChild(input)
  localStorage.setItem('events', JSON.stringify(this.events))
}

  const cancelEvent = () => {
  document.body.removeChild(input)
  delete hour[day]
}
// Pushing ENTER saves the date and pushing ESCAPE cancels it
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      saveEvent()
    } else if (event.key === 'Escape') {
      cancelEvent()
    }
  })
// blur functions in the matter that if you click outside the cell it will save the event
  input.addEventListener('blur', saveEvent)


  document.body.appendChild(input)
  input.focus()

  input.addEventListener('click', event => {
    event.stopPropagation()
  })
},
getWeekDays(date) {
      const days = []
      const startOfWeek = moment(date).weekday(1)
      for (let i = 0; i < 7; i++) {
        days.push(moment(startOfWeek).add(i, 'days'))
      }
      return days
    },
viewPreviousWeek() {
      const previousWeek = moment(this.days[0]).subtract(1, 'week')
      this.days = this.getWeekDays(previousWeek)
    },
    viewNextWeek() {
      const nextWeek = moment(this.days[6]).add(1, 'day')
      this.days = this.getWeekDays(nextWeek)
    },

    getWeekNumber(date) {
      // Get the first day of the year
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
      // Calculate the number of days between the given date and the first day of the year
      const diff = date.getTime() - firstDayOfYear.getTime()
      // Calculate the number of weeks since the first day of the year
      const weekNumber = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7))
      return weekNumber
    }


  },

  //Functions for creating start of the week and the end of it
  computed: {
    startDate() {
      let date = new Date(this.currentDate.getTime());
      let day = date.getDay() || 7;
      if (day !== 1) {
        date.setHours(-24 * (day - 1));
      }
      return date.toISOString().slice(0,10);
    },
    endDate() {
      let date = new Date(this.currentDate.getTime());
      let day = date.getDay() || 7;
      if (day !== 7) {
        date.setHours(24 * (7 - day));
      }
      return date.toISOString().slice(0,10);
    }
  },
  created() {
    // Created function that loads the data that we have from the local storage
    const savedData = JSON.parse(localStorage.getItem("calendarData"));
    //Converting back to object
    if (savedData) {
        //We load the saved data "currentDate" and "hours"
      this.currentDate = new Date(savedData.currentDate);
      this.hours = savedData.hours;
    };
    this.currentWeekNumber = this.getWeekNumber(new Date());
  },
  watch: {
    //Adding a watcher so it saves the data automatically everytime it changes
    currentDate: {
      deep: true,
      handler(newEvent) {
        localStorage.setItem(
          "calendarData",
          JSON.stringify({
            //We save both the "currentDate"s data and "hours" data to our local storage
            currentDate: newEvent.toISOString(),
            hours: this.hours
          })
        );
      }
    },
    hours: {
        //deep lets you access the nested prperties of our saved data
      deep: true,
      handler(newEvent) {
        localStorage.setItem(
          "calendarData",
          JSON.stringify({
            //converting to string
            currentDate: this.currentDate.toISOString(),
            hours: newEvent
          })
        );
      }
    }
  }

  };
  </script>
  <style scoped>
.hours {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

table {
    table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f1f1f1;
  font-weight: bold;
}
.even {
  background-color: #f9f9f9;
}

li {
  margin-bottom: 4px;
  padding: 4px;
  color: #fff;
  font-weight: bold;
  text-align: left;
  border-radius: 4px;
}
.first {
  position: relative;
}

.first::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 6px;
  background-color: #f1f1f1;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.container {
  min-width: 500px;
  max-height: 500px;
  overflow: scroll;
}
.eventCell {
  position: relative;
}
.addEvent {
    position: relative;
    opacity: 0;
    transition: box-shadow 0.5s ease-in-out,
    background-color 0.5s ease-in-out, border-radius 0.5s ease-in-out;
}
.addEvent:hover {

    font-weight: bold;
    opacity: 1;
    background: linear-gradient(
            to bottom,
            rgba(9, 148, 234, 0.15),
            rgba(74, 170, 226, 0.2)
        );
        box-shadow: 0px 0px 20px rgba(74, 170, 226, 0.2);
        border-radius: 16px 16px 16px 16px;
}

.week-number{
    display: flex;
  justify-content: center;
  align-items: center;
}

.today {
  background-color: #999393;
}

</style>
