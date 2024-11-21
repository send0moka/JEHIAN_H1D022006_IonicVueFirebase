<template>
  <ion-modal 
    :is-open="isOpen" 
    @did-dismiss="handleClose"
  >
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ editingId ? "Edit" : "Add" }} Todo</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="handleClose">
            <ion-icon :icon="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-input
          v-model="localTodo.title"
          label="Title"
          label-placement="floating"
          placeholder="Enter Title"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-textarea
          v-model="localTodo.description"
          label="Description"
          label-placement="floating"
          placeholder="Enter Description"
          :autogrow="true"
          :rows="3"
        ></ion-textarea>
      </ion-item>
      <ion-row>
        <ion-col>
          <ion-button
            type="button"
            @click="handleSubmit"
            shape="round"
            color="primary"
            expand="block"
          >
            {{ editingId ? "Edit" : "Add" }} Todo
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonInput,
  IonRow,
  IonCol,
  IonItem,
  IonContent,
  IonTextarea,
} from "@ionic/vue"
import { close } from "ionicons/icons"
import { Todo } from "@/utils/firestore"

const props = defineProps<{
  isOpen: boolean
  initialTodo?: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt" | "status">>
  editingId?: string | null
}>()

const emit = defineEmits<{
  close: []
  submit: [todo: Omit<Todo, "id" | "createdAt" | "updatedAt" | "status">]
}>()

const localTodo = ref({
  title: props.initialTodo?.title || '',
  description: props.initialTodo?.description || ''
})

watch(() => props.initialTodo, (newTodo) => {
  localTodo.value = {
    title: newTodo?.title || '',
    description: newTodo?.description || ''
  }
}, { immediate: true })

const handleClose = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', {
    title: localTodo.value.title,
    description: localTodo.value.description
  })
}
</script>