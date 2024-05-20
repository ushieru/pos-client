<script setup>
import { useQuery } from '@tanstack/vue-query';
import { PosSingleton } from '@/services/pos-service'
import { Filter, FilterBuilderOperator } from '@/services/pos-service/util/Filter';
const pos = PosSingleton.instance

const sessionId = pos.auth.session
const filter = new Filter()
    .add('account_id', FilterBuilderOperator.EQUAL, sessionId)
    .add('ticket_status', FilterBuilderOperator.EQUAL, '"open"')
const { data } = useQuery({
    queryKey: ['tickets', sessionId],
    queryFn: () => pos.ticket.getTickets(filter),
    initialData: [],
    refetchInterval: 5000,
})
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="card bg-base-200 shadow-xl">
            <div class="card-body grid grid-cols-5 gap-3">
                <RouterLink v-for="ticket in data" :to="`/cashier/tickets/${ticket.id}`" class="w-full">
                    <button class="btn w-full">
                        Ticket #{{ ticket.id }}
                    </button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>