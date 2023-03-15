<template>
  <h2 class="current-date text-center">{{ currentDate }}</h2>

  <div class="container">
    <div class="btn-group">
      <button @click="viewPreviousWeek">Previous Week</button>
      <button @click="viewNextWeek">Next Week</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th v-for="day in days" :key="day">{{ day.format('ddd D MMM') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hour in hours" :key="hour">
          <td>{{ hour }}</td>
          <td
            v-for="day in days"
            :key="day"
            :class="{ activeCell: editingCell === cellKey(day, hour) }"
          >
            <!-- Add multiple events in the same cell-->
            <p
              v-for="activity in activities[cellKey(day, hour)]"
              :key="activity.activity"
              :style="getActivityStyle(activity)"
            >
              {{ activity.activity }}
            </p>
            <!-- colspan gör så att man kan span över flera element/celler -->
            <div
              @click="handleCellClick(day, hour)"
              :colspan="getColspan(day, hour)"
              class="cell"
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="editingCell">
    <form @submit.prevent="saveActivity" class="save-activity">
      <label for="activity">Activity:</label>
      <input type="text" v-model="activity" id="activity" />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    const days = this.getWeekDays(moment())
    return {
      currentDate: moment().format('MMMM Do YYYY'),
      days: days,
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
        '16:00'
      ],
      activities: {},
      editingCell: null,
      activity: ''
    }
  },
  methods: {
    handleCellClick(day, hour) {
      if (this.editingCell === this.cellKey(day, hour)) {
        this.editingCell = null
      } else {
        this.editingCell = this.cellKey(day, hour)
      }
    },
    saveActivity() {
      const duration = parseInt(prompt('Enter duration in hours:'))
      if (isNaN(duration)) {
        alert('Duration must be a number')
        return
      }
      if (this.activities[this.editingCell]) {
        this.activities[this.editingCell].push({
          activity: this.activity,
          duration: duration
        })
      } else {
        this.activities[this.editingCell] = [{ activity: this.activity, duration: duration }]
      }
      this.activity = ''
      this.editingCell = null
    },
    getColspan(day, hour) {
      const key = this.cellKey(day, hour)
      const activities = this.activities[key]
      if (!activities) {
        return 1
      }
      let totalDuration = 0
      for (const activity of activities) {
        totalDuration += activity.duration
      }
      return totalDuration / 0.5
    },
    getActivityStyle(activity) {
      const height = activity.duration * 50 - 10
      return {
        backgroundColor: 'green',
        borderRadius: '5px',
        padding: '5px',
        color: '#fff',
        height: `${height}px`
      }
    },
    cellKey(day, hour) {
      return `${day.format('YYYY-MM-DD')} ${hour}`
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
    }
  }
}
</script>

<style>
table tbody td p {
  color: green;
  border: 1px solid green;
  border-radius: 5px;
  padding: 5px;
}
.save-activity {
  margin-top: 2rem;
  text-align: center;
}

.activeCell {
  overflow: scroll;
  border: 2px solid red;
}
.cell {
  height: 50px;
  width: 100px;
  padding: 5px;
  margin: 5px;
  overflow: scroll;
}
.schedule {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
}

th {
  top: 0;
  position: sticky;
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

td {
  overflow: scroll;
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
</style>
