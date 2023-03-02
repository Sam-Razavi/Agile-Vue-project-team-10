<template>
    <div>
        <div class="calendar-header">
      <button @click="previousWeek">&lt;</button>
      <h2>{{ startDate }} - {{ endDate }}</h2>
      <button @click="nextWeek">&gt;</button>
    </div>
    <h2 class="current-date text-center">{{ currentDate }}</h2>
    <div class="container">
      <div>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <!-- Column for each day in the day object -->
            <th v-for="day in days" :key="day">{{ day }}</th>
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
  export default {
    data() {
      return {
        currentDate: new Date(),
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
    methods: {
   addEvent(day, time, button) {
  const input = document.createElement('input')
  const buttonRect = button.getBoundingClientRect()
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

  const saveEvent = () => {
    const value = input.value.trim()

    if (value) {
      hour[day] = { event: value }
    } else {
      delete hour[day]
    }

    document.body.removeChild(input)
  }

  const cancelEvent = () => {
    document.body.removeChild(input)
  }

  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      saveEvent()
    } else if (event.key === 'Escape') {
      cancelEvent()
    }
  })

  input.addEventListener('blur', saveEvent)


  document.body.appendChild(input)
  input.focus()

  input.addEventListener('click', event => {
    event.stopPropagation()
  })
}

  },
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
    // Created function that loads the data we have from the local storage
    const savedData = JSON.parse(localStorage.getItem("calendarData"));
    //Converting back to object
    if (savedData) {
        //We load the saved data "currentDate" and "hours"
      this.currentDate = new Date(savedData.currentDate);
      this.hours = savedData.hours;
    }
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
  <style>
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
</style>
