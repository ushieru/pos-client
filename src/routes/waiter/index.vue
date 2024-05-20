<script setup>
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { orderTables } from '@/utils/tableUtils';
import { PosSingleton } from '@/services/pos-service'
const pos = PosSingleton.instance

const router = useRouter()
const session = pos.auth.session

const { data } = useQuery({
    queryKey: ['tables'],
    queryFn: () => pos.table.getTables().then(tables => orderTables(tables, true)),
    initialData: [],
    refetchInterval: 5000,
})

const createTicket = (tableId) => {
    pos.table.createTicketTable(tableId).then(response => {
        if (response.code) return console.error(response)
        console.log(response)
        router.push(`/waiter/tickets/${response.ticket_id}`);
    })
}

const openTicket = (ticketId) => router.push(`/waiter/tickets/${ticketId}`);
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
                <div class="grid gap-1 grid-cols-5">
                    <template v-for="table in data">
                        <div v-if="!table" class="aspect-square bg-gray-500"></div>
                        <button v-else-if="!table.ticket_id" @click="createTicket(table.id)"
                            class="btn bg-primary h-full">
                            {{ table.name }}
                        </button>
                        <button v-else-if="table.account_id != session.user.account.id" disabled
                            class="btn btn-neutral h-full min-w-0">
                            {{ table.name }}
                        </button>
                        <button v-else class="btn btn-secondary h-full min-w-0" @click="openTicket(table.ticket_id)">
                            {{ table.name }}
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>