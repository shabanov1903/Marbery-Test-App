<template>
  <FixedLeftColumn>
    <template v-slot:fixed>
      <div class="block">
        <InputDate v-model="form.dataPickerValue" range />
        
        <Search
          v-model:search-query="form.searchQuery"
          v-model:search-type="form.searchType"
          :search-types="form.searchTypes"
          @submit="getData"
        />

        <div class="sub-block">
          <Toggle v-model:pressed="form.sort_1_9" @click="setSort_1_9">
            <i class="fas fa-arrow-down-1-9" />
          </Toggle>
          <Toggle v-model:pressed="form.sort_9_1" @click="setSort_9_1">
            <i class="fas fa-arrow-up-9-1" />
          </Toggle>
        </div>
      </div>

      <div class="block">
        <div class="sub-block">
          <Select v-model:model-value="form.selectorValue" :items="form.selectorItems"/>
        </div>

        <div class="sub-block">
          <Button @click="getYearData" :color="'gray-light'">
            Показать
          </Button>

          <Button @click="clearYearSelector">
            Сбросить
          </Button>
        </div>

        <p style="text-align: center; font-size: small">
          Обычный вывод показывает 250 заказов. чтобы снять ограничение и показать до 5000 заказов нужно выбрать год.
        </p>
      </div>
    </template>
    
    <template v-slot>
      <template v-if="data.length">
        <StatusCard v-for="item in computedData" :key="item" :status="'success'">
          {{ item }}
        </StatusCard>
      </template>
      <template v-else>
        <Empty>
          Заказы не найдены
        </Empty>
      </template>
    </template>
  </FixedLeftColumn>
</template>

<script setup lang="ts">
import type { Ref } from "vue";

import type { OrdersData } from "~/shared/api/internal/types";
import { internalAPIFetch } from "~/shared/api/internal/instance";
import { getForm, type OrdersForm } from "~/shared/config/orders-form";

import FixedLeftColumn from "../../src/shared/ui/templates/fixed-left-column.vue";
import InputDate from "../../src/shared/ui/inputs/input-date/index.vue";
import Search from "../../src/shared/ui/search/index.vue";
import Toggle from "../../src/shared/ui/toggle/index.vue";
import Select from "../../src/shared/ui/select/index.vue";
import Button from "../../src/shared/ui/button/index.vue";
import StatusCard from "../../src/shared/ui/status-card/index.vue";
import Empty from "../../src/shared/ui/empty/index.vue";

const form: Ref<OrdersForm> = ref(getForm());
const data: Ref<string[]> = ref([]);

const computedData = computed(() => {
  if (form.value.sort_1_9) {
    return [...data.value].sort()
  }
  if (form.value.sort_9_1) {
    return [...data.value].sort().reverse()
  }

  return data.value;
});

async function getYearData() {
  if (form.value.selectorValue) {
    await getData({
      type: 'year',
      value: form.value.selectorValue,
    })
  }
}

function clearYearSelector() {
  form.value.selectorValue = "";
}

function setSort_1_9() {
  form.value.sort_9_1 = false;
}

function setSort_9_1() {
  form.value.sort_1_9 = false;
}

async function getData(query?: { type: string, value: string }) {
  let response: OrdersData | undefined;

  if (query) {
    response = await internalAPIFetch(`orders.getTest?${query.type}=${query.value}`);
  }
  else {
    const dates = (form.value.dataPickerValue as Date[]).map(date => {
      return date.toISOString().slice(0, 10).replace(/-/g, "");
    });

    let params = `date_start=${dates[0]}&date_finish=${dates[1]}`;

    if (form.value.searchQuery) {
      params = `${params}&search_type=${form.value.searchType}&search_value=${form.value.searchQuery}`;
    }

    response = await internalAPIFetch(`orders.getTest?${params}`);
  }
  
  if (response?.response?.data?.orders) {
    data.value = response.response.data.orders.map(order => order.id);
    return;
  }

  data.value = [];
}
</script>

<style scoped lang="scss">
@import "~/shared/assets/styles/components/empty";

.block {
  padding: 16px;
  margin-bottom: 15px;

  & > * {
    margin-bottom: 15px;
  }
}

.sub-block {
  & > * {
    margin-right: 5px;
  }
}
</style>