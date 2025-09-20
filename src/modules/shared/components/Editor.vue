<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue';
import { Dialog } from 'quasar';
import { api } from 'src/boot/axios';
import { useEditor, EditorContent } from '@tiptap/vue-3';

// --- Extensiones de Tiptap ---
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import useNotify from '../composables/useNotify';

defineOptions({
  name: 'SharedEditor',
});

const { successNotify, errorNotify } = useNotify();

// --- Props y Emits para el v-model ---
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

// --- Lógica para el botón de Enlace (Link) ---
const setLink = () => {
  Dialog.create({
    title: 'Insertar Enlace',
    message: 'Ingresa la URL completa:',
    prompt: {
      model: editor.value?.getAttributes('link').href || '',
      type: 'text',
    },
    cancel: true,
    persistent: true,
  }).onOk((url) => {
    if (url) {
      editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } else {
      editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();
    }
  });
};

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file); // 'image' debe coincidir con el nombre que espera tu backend

  successNotify('Subiendo imagen...');

  try {
    // Sube la imagen a tu backend
    // Asegúrate de que tu endpoint '/upload/image' devuelva un JSON como: { "url": "https://..." }

    const response = await api.post('/upload/image', formData);
    const imageUrl = response.data.url;

    // Si la subida es exitosa, inserta la imagen en el editor
    if (imageUrl) {
      editor.value?.chain().focus().setImage({ src: imageUrl }).run();
    }

    successNotify('Imagen insertada');
  } catch {
    errorNotify('Error al subir la imagen');
  }
};

// 2. Función que crea un input de archivo y lo abre
const addImage = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length && files[0] instanceof File) {
      uploadImage(files[0]);
    }
  };
  input.click();
};

// --- Inicialización del Editor ---
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Subscript,
    Superscript,
    Image,
    Link.configure({
      openOnClick: false, // Para evitar que se abra el enlace al hacer clic en el editor
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'], // Permitir alineación en encabezados y párrafos
    }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
  },
});

// --- Sincronización y Limpieza ---
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && editor.value.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue, { emitUpdate: false });
    }
  },
);

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<template>
  <div v-if="editor" class="tiptap-container q-pa-sm rounded-borders">
    <div class="toolbar q-mb-sm q-gutter-xs">
      <q-btn
        dense
        flat
        round
        icon="sym_r_undo"
        @click="editor.chain().focus().undo().run()"
        :disable="!editor.can().undo()"
      />
      <q-btn
        dense
        flat
        round
        icon="sym_r_redo"
        @click="editor.chain().focus().redo().run()"
        :disable="!editor.can().redo()"
      />

      <q-separator vertical class="q-mx-xs" />

      <q-btn-dropdown dense flat no-caps label="Texto">
        <q-list dense>
          <q-item
            clickable
            v-close-popup
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
          >
            <q-item-section>Párrafo</q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          >
            <q-item-section><strong>Encabezado 1</strong></q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          >
            <q-item-section><strong>Encabezado 2</strong></q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-separator vertical class="q-mx-xs" />

      <q-btn
        dense
        flat
        round
        icon="sym_r_format_bold"
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      />
      <q-btn
        dense
        flat
        round
        icon="sym_r_format_italic"
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      />
      <q-btn
        dense
        flat
        round
        icon="sym_r_format_underlined"
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'is-active': editor.isActive('underline') }"
      />
      <q-btn
        dense
        flat
        round
        icon="sym_r_strikethrough_s"
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      />

      <q-separator vertical class="q-mx-xs" />

      <q-btn
        dense
        flat
        round
        icon="sym_r_link"
        @click="setLink"
        :class="{ 'is-active': editor.isActive('link') }"
      />
      <q-btn
        dense
        flat
        round
        icon="sym_r_link_off"
        @click="editor.chain().focus().unsetLink().run()"
        :disable="!editor.isActive('link')"
      />
      <q-btn
        dense
        flat
        round
        icon="sym_r_code"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      />

      <q-separator vertical class="q-mx-xs" />

      <q-btn
        dense
        flat
        round
        icon="sym_r_subscript"
        @click="editor.chain().focus().toggleSubscript().run()"
        :class="{ 'is-active': editor.isActive('subscript') }"
      />
      <q-btn
        dense
        flat
        round
        icon="sym_r_superscript"
        @click="editor.chain().focus().toggleSuperscript().run()"
        :class="{ 'is-active': editor.isActive('superscript') }"
      />

      <q-separator vertical class="q-mx-xs" />

      <q-btn
        dense
        flat
        round
        icon="sym_r_format_align_left"
        @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
      />
      <q-btn
        dense
        flat
        round
        icon="sym_r_format_align_center"
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
      />
      <q-btn
        dense
        flat
        round
        icon="sym_r_format_align_right"
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
      />
      <q-btn
        dense
        flat
        round
        icon="sym_r_format_align_justify"
        @click="editor.chain().focus().setTextAlign('justify').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
      />
      <q-separator vertical class="q-mx-xs" />
      <q-btn dense flat round icon="sym_r_image" @click="addImage" />
    </div>

    <editor-content :editor="editor" />
  </div>
</template>

<style lang="scss">
.tiptap-container {
  border: 1px solid $grey-4;

  .toolbar {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    flex-wrap: wrap;

    .q-separator {
      background-color: $grey-4;
    }

    .q-separator--vertical {
      width: 1px;
      height: 22px;
      margin: 0 0.5rem;
      align-self: center;
      background-color: $grey-8;
      min-height: 18px;
    }

    .q-btn,
    .q-btn-dropdown {
      &.is-active {
        background-color: $grey-3;
        color: $secondary;
      }
    }
  }

  .q-list .q-item {
    &.is-active {
      background-color: $grey-2;
      color: $secondary;
    }
  }
}

.ProseMirror {
  min-height: 250px;
  padding: 8px;

  &:focus {
    outline: none;
  }

  & p,
  & h1,
  & h2,
  & h3 {
    &[style*='text-align: center'] {
      text-align: center;
    }
    &[style*='text-align: right'] {
      text-align: right;
    }
    &[style*='text-align: justify'] {
      text-align: justify;
    }
  }
}

.tiptap-container .ProseMirror pre,
.tiptap pre {
  background: $dark;
  border-radius: 0.5rem;
  color: #ffffff;
  font-family: 'JetBrainsMono', monospace;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
  font-size: 1.4rem;

  code {
    background: none;
    color: inherit;
    font-size: inherit;
    padding: 0;
  }
}
</style>
