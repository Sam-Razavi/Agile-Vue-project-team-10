<template>
    <form @submit.prevent="saveData">
      <label>
        Task:
        <input type="text" v-model="task" />
      </label>
      <button type="submit">Save</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        task: '',
      };
    },
    methods: {
      saveData() {
        // här kan du göra något med datan som sparats, t.ex. skicka den till en databas eller spara den lokalt
        console.log(this.task);
      },
    },
  };
  </script>
