<template>
  <q-page class="q-pa-md flex justify-center bg-dark">
    <div style="max-width: 800px; width: 100%; position: relative">
      <div
        class="bg-white"
        style="
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        "
      >
        <q-input
          v-model="searchText"
          placeholder="جستجو با عنوان"
          dense
          filled
          @keyup="searchTasks"
        >
        </q-input>

        <q-list
          bordered
          class="q-pa-md"
          v-if="tasks.length > 0 || searchText.trim() != ''"
        >
          <to-do-item
            v-for="item in tasks"
            :key="item.id"
            :item="item"
            flat
            @edit="updateItem"
            @delete="deleteItem"
          />
        </q-list>
        <div v-else class="q-pt-lg q-pb-xl text-center text-grey-6">
          هیچ تسکی پیدا نشد! لطفا برای شروع یک کار اضافه کنید.
        </div>
        <div
          style="position: absolute; width: 100%; margin-top: -14px"
          class="flex justify-center"
        >
          <q-btn
            color="primary"
            :ripple="false"
            class="q-mb-md bg-primary text-white rounded q-px-lg"
            @click="showNewTask = !showNewTask"
          >
            <template v-slot:default>
              <q-icon :name="showNewTask ? 'expand_less' : 'add'"></q-icon>
              <span class="q-ml-md">تسک جدید</span></template
            >
          </q-btn>
        </div>
        <q-form
          v-show="showNewTask"
          @submit="addItem"
          flat
          class="q-mb-md q-px-lg q-pb-lg"
        >
          <q-input
            filled
            v-model="newItemText"
            placeholder="عنوان تسک"
            dense
            class="q-mt-xl"
            :ripple="false"
            @keyup.enter="addItem"
          >
            <template v-slot:append>
              <q-btn
                outline
                color="primary"
                class="q-px-md bg-white"
                @click="addItem"
                dense
                >افزودن</q-btn
              >
            </template>
          </q-input>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import ToDoItem from "./ToDoItem.vue";
import { useStore } from "vuex";

export default {
  name: "ToDoList",
  components: { ToDoItem },
  setup() {
    /// store and computed
    const store = useStore();
    const tasks = computed(() => store.getters["tasks"]);
    const searchText = ref("");
    // in case we have a search term in store from localStorage
    searchText.value = store.getters["searchedText"];

    //refs
    const newItemText = ref("");
    const showNewTask = ref(false);

    /// functions
    const addItem = () => {
      if (newItemText.value.trim()) {
        const task = {
          id: Date.now(),
          text: newItemText.value,
          done: false,
        };
        store.dispatch("addTask", task);
        newItemText.value = "";
      }
    };

    const updateItem = (item) => {
      store.dispatch("updateTask", item);
    };

    const deleteItem = (item) => {
      store.dispatch("deleteTask", item.id);
    };

    const searchTasks = () => {
      store.dispatch("setSearchText", searchText.value);
    };

    const updateStatus = (id, status) => {
      const payload = { id: id, done: status };
      store.dispatch("setTaskStatus", payload);
    };

    return {
      newItemText,
      tasks,
      addItem,
      updateStatus,
      updateItem,
      deleteItem,
      searchTasks,
      searchText,
      showNewTask,
    };
  },
};
</script>
