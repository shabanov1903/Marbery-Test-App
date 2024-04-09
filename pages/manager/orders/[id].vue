<template>
    <div>
        <template v-if="data">
            <StatusCard :status="'success'">
              Индивидуальная информация о заказе: <b>{{ data }}</b>
            </StatusCard>
          </template>
          <template v-else>
            <Empty>
              Заказ не найден
            </Empty>
          </template>
    </div>
</template>

<script setup lang="ts">
import type { OrdersData } from '~/shared/api/internal/types';
import { internalAPIFetch } from '~/shared/api/internal/instance';

import StatusCard from "../../../src/shared/ui/status-card/index.vue";
import Empty from "../../../src/shared/ui/empty/index.vue";

const route = useRoute();
const data: Ref<string> = ref("");
onMounted(async () => {
    const params = route.params as { id: string };
    
    const response: OrdersData = await internalAPIFetch(`orders.getTest?search_type=order_number&search_value=${params.id}`);
    
    if (response?.response?.data?.orders?.length) {
        data.value = response.response.data.orders[0].id;
    }
})
</script>

<style scoped lang="scss">
.block {
  padding: 15px;
  margin-bottom: 15px;
  text-align: center;
}
</style>