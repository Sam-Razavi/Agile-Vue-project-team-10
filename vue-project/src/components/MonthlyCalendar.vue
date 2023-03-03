<template>
  <div>
    <h2>{{ day }} {{ month }} {{ year }}</h2>
    <table>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks" :key="week" @click="test">
          <td
            v-for="day in week"
            :key="day.date"
            :class="{ today: isToday(day.date), 'different-month': day.month !== month }"
          >
            {{ day.n }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MonthlyCalendar',
  data() {
    return {
      today: new Date(),
      month: null,
      year: null,
      weeks: []
    }
  },
  computed: {
    day() {
      return this.today.getDate()
    },
    // eslint-disable-next-line vue/no-dupe-keys
    month() {
      const options = { month: 'long' }
      return this.today.toLocaleDateString('en-US', options)
    },
    // eslint-disable-next-line vue/no-dupe-keys
    year() {
      return this.today.getFullYear()
    }
  },
  methods: {
    getDaysInMonth(month, year) {
      const date = new Date(year, month, 1)
      const days = []
      while (date.getMonth() === month) {
        days.push({
          date: new Date(date),
          n: date.getDate(),
          month,
          year
        })
        date.setDate(date.getDate() + 1)
      }
      return days
    },
    isToday(date) {
      return date.toDateString() === this.today.toDateString()
    },
    test() {
      console.log('test')
    }
  },
  mounted() {
    const now = new Date()
    this.month = now.getMonth()
    this.year = now.getFullYear()
    const daysInMonth = this.getDaysInMonth(this.month, this.year)
    const firstDayOfMonth = daysInMonth[0].date.getDay()
    const lastDayOfMonth = daysInMonth[daysInMonth.length - 1].date.getDay()
    const daysInPrevMonth = this.getDaysInMonth(
      this.month - 1 < 0 ? 11 : this.month - 1,
      this.month - 1 < 0 ? this.year - 1 : this.year
    )
    const daysInNextMonth = this.getDaysInMonth(
      this.month + 1 > 11 ? 0 : this.month + 1,
      this.month + 1 > 11 ? this.year + 1 : this.year
    )
    const days = [
      ...daysInPrevMonth.slice(-firstDayOfMonth),
      ...daysInMonth,
      ...daysInNextMonth.slice(0, 6 - lastDayOfMonth)
    ]
    this.weeks = Array.from({ length: days.length / 7 }, (_, i) => days.slice(i * 7, i * 7 + 7))
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  margin-top: 1rem;
}

td {
  border: 1px solid #ccc;
  width: 2rem;
  height: 2rem;
  text-align: center;
}

td.today {
  font-weight: bold;
}

td.different-month {
  color: #ccc;
}
</style>
