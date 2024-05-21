<script setup>
import { useQuery } from '@tanstack/vue-query'
import { orderTables } from '@/utils/tableUtils';
import { PosSingleton } from '@/services/pos-service'
import useResize from '@/hooks/useResize'
const { screenWidth } = useResize()
const pos = PosSingleton.instance
const { data } = useQuery({
    queryKey: ['tables'],
    queryFn: () => pos.table.getTables(),
    initialData: [],
    refetchInterval: 5000,
})
</script>

<template>
    <div class="grid gap-1 grid-cols-5 sm:grid-cols-10">
        <template v-for="table in orderTables(data, screenWidth < 640)">
            <div v-if="!table" class="aspect-square bg-gray-500"></div>
            <div v-else-if="!table.ticket_id" class="aspect-square rounded-medium bg-primary grid place-items-center">
                {{ table.name }}
            </div>
            <RouterLink v-else :to="`/cashier/tickets/${table.ticket_id}`">
                <button class="btn btn-primary h-full min-w-0 w-full grid place-content-center">
                    <span>{{ table.name }}</span>
                    <span>{{ table.account.username }}</span>
                </button>
            </RouterLink>
        </template>
    </div>
</template>