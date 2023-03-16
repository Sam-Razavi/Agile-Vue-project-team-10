<script setup>
import EventCalendar from './components/EventCalendar.vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/img/calendar_icon.png"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="Group 10 Calender" />
      <a>Made by: Group 10</a>
    </div>
  </header>

  <main>
    <EventCalendar />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
