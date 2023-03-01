
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
          <th></th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hour in hours" :key="hour">
          <td>{{ hour }}</td>
          <td v-for="day in days" :key="day">
            <ul>
              <li v-for="event in getEvents(hour, day)" :key="event.id">{{ event.name }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>

<button>Add event</button>
</template>


<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: [
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',


      ],
      events: [
        { id: 1, name: 'valfri event', day: 'Monday', start: '10.00', end: '11.00' },

      ]
    }
  },
  computed: {
    filteredEvents() {
      const filteredEvents = {}

      for (let hour of this.hours) {
        filteredEvents[hour] = {}

        for (let day of this.days) {
          filteredEvents[hour][day] = this.events.filter((event) => {
            return event.day === day && event.start === hour.replace(':', '')
          })
        }
      }

      return filteredEvents
    }
  },
  methods: {
    getEvents(hour, day, weekStart) {
  const events = this.events.filter((event) => event.day === day);
  return events.filter((event) => {
    const eventDate = new Date(`${weekStart} ${event.start}`);
    const eventHour = eventDate.getHours().toString().padStart(2, '0');
    return eventHour === hour;
  });
},

  }
};

</script>
<style>
.schedule {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

table {
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
.container{
    min-width: 500px;
  max-height: 500px;
  overflow: scroll;
}
</style>
