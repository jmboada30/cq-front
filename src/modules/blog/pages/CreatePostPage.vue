<script setup lang="ts">
import { ref } from 'vue';
import CustomUploader from 'src/modules/shared/components/CustomUploader.vue';
import Editor from 'src/modules/shared/components/Editor.vue';

const title = ref('');
const image = ref(null);
const content = ref('');
const tags = ref('');
const addTag = () => {
  if (tags.value.trim() === '') return;
  const tagList = tags.value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
  if (tagList.length > 5) {
    tagList.splice(5); // Limit to 5 tags
  }
  tags.value = tagList.join(', ');
};
const createPost = () => {
  console.log('Creating post:', { title: title.value, image: image.value, content: content.value });
};
</script>

<template>
  <q-page class="q-pa-lg q-pb-lg row q-col-gutter-md justify-center">
    <section class="col-sm-12 col-md-8 col-lg-8 col-xl-9 q-gutter-sm">
      <h1 class="q-mb-lg">Crear publicación</h1>
      <q-input rounded standout="border-color-primary text-dark" v-model="title" label="Título" />
      <!-- Usamos el editor TipTap en lugar del textarea -->
      <Editor v-model="content" :placeholder="'Escribe el contenido de la publicación...'" />
    </section>
    <section class="col-sm-12 col-md-4 col-lg-4 col-xl-3 q-gutter-sm">
      <q-card flat class="bg-dark rounded-borders">
        <q-card-section class="text-right">
          <q-btn color="primary" label="Publicar" @click="createPost" />
        </q-card-section>
        <q-card-section>
          <p class="text-weight-medium">Imagen de portada</p>
          <CustomUploader
            title="Subir imagen"
            :extensionSupport="['jpg', 'png', 'webp']"
            extensionMessage="Formatos soportados: "
            icon="sym_r_image"
            :maxSizeInKB="5120"
            previewImage
            @uploaded="image = $event"
          />
        </q-card-section>
        <q-card-section>
          <p class="text-weight-medium">Etiquetas</p>
          <p class="text-caption">
            Puedes agregar hasta 5 etiquetas separadas por comas. Ejemplo: tecnología, programación,
            javascript
          </p>
          <q-input
            v-model="tags"
            label="Etiquetas"
            hint="Presiona Enter para agregar"
            @keyup.enter="addTag"
          />
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>
