<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import usePipes from '../../shared/composables/usePipes';
const { number, currency } = usePipes();

interface Props {
  item: any;
}
interface Emits {
  (e: 'onShowDetail', item: any): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<template>
  <q-card>
    <q-card-section class="row q-col-gutter-sm">
      <div class="col-12 ellipsis">
        <span class="text-h5">{{ item.company_name }}</span>
      </div>

      <div class="row col-12">
        <div class="col-6 row">
          <span class="col-12 text-caption text-grey-6">Facturas</span>
          <div class="col-12 text-h6 text-weight-light">
            {{ number(item.count_invoice) }}
            <span class="text-red text-caption">({{ item.credit_note }})</span>
          </div>
        </div>

        <div class="col-6 row">
          <span class="col-12 text-caption text-grey-6">Ticket Prom.</span>
          <div class="col-12 text-h6 text-weight-light">
            {{ number(item.avg_prod_ticket) }}
          </div>
        </div>
      </div>

      <div class="row col-12">
        <div class="col-6 row">
          <span class="col-12 text-caption text-grey-6">Venta</span>
          <div class="col-12 text-h6 text-weight-light">
            {{ currency(item.total_sale_usd) }}
          </div>
        </div>

        <div class="col-6 row">
          <span class="col-12 text-caption text-grey-6">Venta Prom.</span>
          <div class="col-12 text-h6 text-weight-light">
            {{ currency(item.avg_sales_ticket) }}
          </div>
        </div>
      </div>

      <div class="row col-12">
        <div class="col-6 row">
          <span class="col-12 text-caption text-grey-6">Utililidad</span>
          <div class="col-12 text-h6 text-weight-light">
            {{ currency(item.total_util) }}
          </div>
        </div>

        <div class="col-6 row">
          <span class="col-12 text-caption text-grey-6">Item Vendidos</span>
          <div class="col-12 text-h6 text-weight-light">
            {{ number(item.quantity) }}
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn no-caps @click="emits('onShowDetail', item)" flat
        >Ver detalles</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<style scoped></style>
