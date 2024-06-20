<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-3" dir="rtl">
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="q-py-md text-center"
          >To-Do List<q-icon class="q-mr-md q-mb-xs" name="check_box"></q-icon>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <to-do-list />
    </q-page-container>
  </q-layout>
</template>

<script>
import ToDoList from "./components/ToDoList.vue";

export default {
  name: "App",
  components: {
    ToDoList,
  },
};
</script>
