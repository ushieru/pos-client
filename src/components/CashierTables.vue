<script setup>
import { useQuery } from '@tanstack/vue-query'
import { orderTables } from '@/utils/tableUtils';
import { PosSingleton } from '@/services/pos-service'
const pos = PosSingleton.instance
const { data } = useQuery({
    queryKey: ['tables'],
    queryFn: () => pos.table.getTables().then(orderTables),
    initialData: [],
    refetchInterval: 5000,
})
</script>

<template>
    <div class="grid gap-1 grid-cols-10">
        <template v-for="table in data">
            <div v-if="!table" class="aspect-square bg-gray-500"></div>
            <div v-else-if="!table.ticket_id" class="aspect-square rounded-medium bg-primary grid place-items-center">
                {{ table.name }}
            </div>
            <button v-else class="btn btn-primary h-full min-w-0">
                {{ table.name }}
            </button>
        </template>
    </div>
</template>