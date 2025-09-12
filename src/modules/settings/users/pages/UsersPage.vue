<script setup lang="ts">
import { Dialog, QTable } from 'quasar';

import TitlesComponent from '../../../shared/components/TitlesComponent.vue';
import { useUserQuery } from '../composables/useUserQuery';
import type { UserItem } from '../interfaces/userInterface';
import { useUserMutation } from '../composables/useUserMutation';

const { users, userQuery, columnTable, refreshQuery } = useUserQuery();
const { resetUserDto, updateUserMutation } = useUserMutation();

const openMenuItemDialog = (user?: UserItem) => {
  if (user?.id) console.log(user);
  else resetUserDto();

  Dialog.create({
    component: '',
    noBackdropDismiss: true,
    componentProps: {
      id: user?.id,
      email: user?.email,
      userId: user?.id,
      opt: 'editPassword',
    },
  });
};

const toggleActiveUser = (user: UserItem) => {
  const body = { id: user.id, email: user.email, isActive: !user.isActive };

  if (user.isActive) updateUserMutation.mutate(body);
  else updateUserMutation.mutate(body);
};
</script>

<template>
  <q-pull-to-refresh @refresh="refreshQuery">
    <q-page class="relative-position col" padding>
      <div>
        <TitlesComponent title="Usuarios" :empty="true" />
      </div>

      <q-table
        row-key="id"
        :rows="users"
        :columns="columnTable"
        :loading="userQuery.isFetching.value"
        :rows-per-page-options="[5, 10, 15, 20]"
        :pagination="{ rowsPerPage: 10 }"
        class="q-mt-md"
      >
        <template v-slot:body-cell-isActive="prop">
          <q-td :props="prop">
            <q-chip
              :class="`${
                prop.row[prop.col.name] == true
                  ? 'state-active rounded-borders'
                  : 'state-desactive rounded-borders'
              } chip-dense`"
            >
              {{ prop.row[prop.col.name] == true ? 'Activo' : 'Desactivo' }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="prop">
          <q-td :props="prop" auto-width>
            <q-btn dense color="primary" icon="sym_r_More_vert" flat>
              <q-menu anchor="top middle" self="bottom right">
                <q-list>
                  <q-item clickable v-close-popup @click="openMenuItemDialog(prop.row)">
                    <q-item-section style="font-size: 12px">Editar Usuario</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="toggleActiveUser(prop.row)"
                    ><q-item-section style="font-size: 12px">
                      {{ prop.row.isActive ? 'Inactivar' : 'Activar' }} Usuario
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-page>
  </q-pull-to-refresh>
</template>

<style lang="scss" scoped>
.state-active {
  border: 1px solid #7cde63;
  background-color: rgba(124, 222, 99, 0.2);
  color: #6bc253;
}
.state-desactive {
  border: 1px solid #da615f;
  background-color: rgba(218, 97, 95, 0.2);
  color: #b84d4b;
}
.chip-dense {
  padding: 8px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
}
</style>
