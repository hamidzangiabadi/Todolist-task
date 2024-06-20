<template>
  <q-card
    class="q-ma-sm"
    bordered
    :class="item.done === true ? 'bg-green-2' : ''"
  >
    <q-card-section>
      <div class="row full-width">
        <div class="col-md-7 col-12 q-px-sm" style="word-wrap: break-word">
          <p
            class="text-subtitle1 q-mt-xs text-grey-8"
            v-if="!updateMode"
            :class="item.done === true ? 'text-strike' : ''"
          >
            {{ item.text }}
          </p>
          <div v-else>
            <q-input v-model="newText" dense outlined color="primary q-mb-sm">
              <template v-slot:append>
                <q-btn
                  outline
                  icon="check"
                  size="sm"
                  rounded
                  color="green-5"
                  @click="updateItem()"
                  dense
                ></q-btn>
                <q-btn
                  outline
                  class="q-mr-sm"
                  icon="close"
                  rounded
                  color="grey-6"
                  size="sm"
                  @click="updateMode = false"
                  dense
                ></q-btn>
              </template>
            </q-input>
          </div>
        </div>
        <div class="col-md-5 col-12 flex justify-end">
          <div class="inline-block">
            <q-icon
              color="primary"
              size="sm"
              name="edit"
              class="cursor-pointer"
              v-show="!updateMode"
              v-if="item.done !== true"
              @click="updateMode = !updateMode"
            ></q-icon>
            <q-icon
              color="negative"
              dense
              @click="deleteItem"
              name="delete"
              size="sm"
              v-if="item.done !== true"
              class="q-mx-sm cursor-pointer"
            ></q-icon>
            <q-checkbox
              left-label
              v-model="item.done"
              @update:model-value="updateStatus(item.id, item.done)"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <div class="flex justify-start"></div>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ToDoItem",
  props: {
    item: Object,
  },
  setup(props, { emit }) {
    /// store
    const store = useStore();

    // refs
    const updateMode = ref(false);
    const newText = ref("");
    newText.value = props.item.text;

    // functions
    const updateStatus = (id, status) => {
      emit("edit", id, status);
    };

    const updateItem = () => {
      updateMode.value = false;
      // change the prop value and then emit it
      props.item.text = newText.value;
      emit("edit", props.item);
    };

    const deleteItem = () => {
      emit("delete", props.item);
    };

    return {
      updateStatus,
      deleteItem,
      updateItem,
      updateMode,
      newText,
    };
  },
});
</script>
