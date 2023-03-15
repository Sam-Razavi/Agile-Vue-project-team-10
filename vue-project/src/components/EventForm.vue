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
        this.$emit('save-task', this.task);
        this.task = '';
      },
    },
  };
  </script>
