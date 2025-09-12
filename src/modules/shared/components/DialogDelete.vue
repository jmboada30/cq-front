<script setup lang="ts"></script>
<template>
  <q-dialog :persistent="true">
    <q-card>
      <q-card-section class="row items-start justify-between q-pb-xs col-12">
        <div class="row justify-between col-12 title-container q-pb-xs">
          <div class="col-10">
            <span class="text-h6 text-weight-medium"> Agregar empleado </span>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <span>¿Confirmas que deseas eliminar este empleado?</span>
      </q-card-section>
      <q-card-section>
        <q-btn label="Confirmar'" color="primary" class="col-5 self-end" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style scoped lang="scss"></style>
