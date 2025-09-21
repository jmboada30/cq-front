<script setup lang="ts">
import { ref, computed } from 'vue';
import { ReactionType } from '../interfaces/postReactionsInterfaces';

const props = defineProps<{
  entityId: number;
  userId: number;
  reactionType?: ReactionType;
  currentReactionId?: number;
  totalReactions?: number;
}>();

const emit = defineEmits<{
  (e: 'createReaction', params: { entityId: number; reactionType: ReactionType }): void;
  (e: 'deleteReaction', entityId: number): void;
}>();

const menuOpen = ref(false);

const allReactionTypes = Object.values(ReactionType);

const getReactionIcon = (type: ReactionType): string => {
  const iconMap: Record<ReactionType, string> = {
    [ReactionType.LIKE]: 'thumb_up',
    [ReactionType.LOVE]: 'favorite',
    [ReactionType.LAUGH]: 'sentiment_very_satisfied',
    [ReactionType.WOW]: 'sentiment_satisfied_alt',
    [ReactionType.SAD]: 'sentiment_dissatisfied',
    [ReactionType.ANGRY]: 'mood_bad',
  };
  return iconMap[type];
};

const getReactionColor = (type: ReactionType): string => {
  const colorMap: Record<ReactionType, string> = {
    [ReactionType.LIKE]: 'blue-6',
    [ReactionType.LOVE]: 'red-6',
    [ReactionType.LAUGH]: 'yellow-8',
    [ReactionType.WOW]: 'orange-6',
    [ReactionType.SAD]: 'blue-grey-6',
    [ReactionType.ANGRY]: 'deep-orange-9',
  };
  return colorMap[type];
};

// Icono y color del botón principal
const userReactionIcon = computed(() =>
  props.reactionType ? getReactionIcon(props.reactionType) : 'thumb_up',
);
const userReactionIconColor = computed(() =>
  props.reactionType ? getReactionColor(props.reactionType) : 'grey-7',
);

const selectReaction = async (type: ReactionType) => {
  if (props.reactionType === type && props.currentReactionId) {
    return emit('deleteReaction', props.currentReactionId);
  }

  return emit('createReaction', { entityId: props.entityId, reactionType: type });
};
</script>
<template>
  <div class="q-post-reactions row items-center no-wrap q-gutter-x-sm">
    <q-btn
      flat
      round
      :icon="userReactionIcon"
      :color="userReactionIconColor"
      aria-label="Reaccionar"
    >
      <q-menu
        anchor="top middle"
        self="bottom middle"
        transition-show="jump-down"
        transition-hide="jump-up"
        @show="menuOpen = true"
        @hide="menuOpen = false"
      >
        <div class="q-reactions-menu row no-wrap q-pa-xs">
          <q-btn
            v-for="reactType in allReactionTypes"
            :key="reactType"
            flat
            round
            :icon="getReactionIcon(reactType)"
            :color="getReactionColor(reactType)"
            @click="selectReaction(reactType)"
            size="md"
            class="q-mx-xs reaction-option"
            :class="{ 'selected-reaction': reactionType === reactType }"
            aria-label="Seleccionar reacción"
          />
        </div>
      </q-menu>
    </q-btn>

    <span class="text-caption text-grey-8" v-if="totalReactions">
      {{ totalReactions }}
    </span>
  </div>
</template>

<style scoped>
.q-reactions-menu {
  background-color: #fff;
  border-radius: 25px; /* Bordes más redondeados */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 4px;
}

.reaction-option {
  transition: transform 0.2s ease-in-out;
}

.reaction-option:hover {
  transform: scale(1.2); /* Efecto de zoom al pasar el ratón */
}

.selected-reaction {
  background-color: var(--q-primary-light); /* Un color de fondo para la reacción seleccionada */
  border-radius: 50%; /* Hace el botón completamente redondo si no lo es */
  box-shadow: 0 0 0 2px currentColor; /* Un borde del color de la reacción */
}
</style>
