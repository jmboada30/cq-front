<script setup lang="ts">
import { ref } from 'vue';
import { QTable, QTr, QTd, QBtn } from 'quasar';

interface Row {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

const columns: QTable['columns'] = [
  { name: 'name', label: 'Dessert', field: 'name', align: 'left' },
  { name: 'calories', label: 'Calories', field: 'calories', align: 'center' },
  { name: 'calories', label: 'Calories', field: 'calories', align: 'center' },
  { name: 'calories', label: 'Calories', field: 'calories', align: 'center' },
  { name: 'calories', label: 'Calories', field: 'calories', align: 'center' },
  { name: 'fat', label: 'Fat (g)', field: 'fat', align: 'center' },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs', align: 'center' },
  { name: 'protein', label: 'Protein (g)', field: 'protein', align: 'center' },
];

const rows = ref<Row[]>([
  {
    name: 'Frozen Yogurt Frozen Yogurt Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  { name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4.3 },
  // Otros registros...
]);

const editItem = (row: Row) => {
  console.log('Edit', row);
};

const deleteItem = (row: Row) => {
  console.log('Delete', row);
};
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      class="hover-actions-table"
    >
      <!-- Personalizamos cada fila -->
      <template #body="props">
        <q-tr :props="props" class="hover-row">
          <q-td v-for="(col, index) in props.cols" :key="col.name" :props="props">
            <!-- Se envuelve el contenido de la celda -->
            <div class="cell-wrapper">
              <span>{{ props.row[col.field] }}</span>

              <!-- Solo en la primera celda se agregan los botones -->
              <div v-if="index === 0" class="action-buttons">
                <!-- Solo en la última celda se agregan los botones -->
                <!-- <div v-if="index === props.cols.length - 1" class="action-buttons"> -->
                <q-btn
                  size="sm"
                  color="primary"
                  icon="sym_r_edit"
                  dense
                  flat
                  @click.stop="editItem(props.row)"
                />
                <q-btn
                  size="sm"
                  color="negative"
                  icon="sym_r_delete"
                  dense
                  flat
                  @click.stop="deleteItem(props.row)"
                />
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style scoped>
.cell-wrapper {
  position: relative;
}

.action-buttons {
  display: none;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  gap: 8px;
}

.hover-row:hover .action-buttons {
  display: flex;
  background-color: white;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
