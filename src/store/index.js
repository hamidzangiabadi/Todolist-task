import { createStore } from "vuex";

const store = createStore({
  state: {
    tasks: [
      //  sample
      //  {"id":0,"text":"test","done":false}
    ],
    searchText: "",
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    setSearchText(state, searchText) {
      state.searchText = searchText;
    },
    setTaskStatus(state, payload) {
      const taskIndex = state.tasks.findIndex((x) => x.id == payload.id);
      state.tasks[taskIndex].done = payload.done;
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit("addTask", task);
    },
    updateTask({ commit }, updatedTask) {
      commit("updateTask", updatedTask);
    },
    deleteTask({ commit }, taskId) {
      commit("deleteTask", taskId);
    },
    setSearchText({ commit }, searchText) {
      commit("setSearchText", searchText);
    },
    setTaskStatus({ commit }, payload) {
      commit("setTaskStatus", payload);
    },
  },
  getters: {
    tasks: (state) => {
      if (!state.searchText) {
        /// for sorting tasks
        return state.tasks;
      }
      return state.tasks.filter((task) =>
        task.text.toLowerCase().includes(state.searchText.toLowerCase())
      );
    },
    searchedText: (state) => {
      return state.searchText;
    },
  },
  plugins: [
    // used for updating store in local storage
    (store) => {
      store.subscribe((mutation, state) => {
        localStorage.setItem("store", JSON.stringify(state));
      });
    },
  ],
});

export default store;
