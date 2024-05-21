<script setup>
import { useQuery } from '@tanstack/vue-query'
import { PosSingleton } from '@/services/pos-service'
import { ref, watch } from 'vue';
import { Filter, FilterBuilderOperator } from '@/services/pos-service/util/Filter';
const pos = PosSingleton.instance
const ticketStatus = ref('open')
const { data, refetch } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => pos.ticket.getTickets(new Filter().add('ticket_status', FilterBuilderOperator.EQUAL, `'${ticketStatus.value}'`)),
    initialData: [],
    refetchInterval: 5000,
})
watch(ticketStatus, () => {
    refetch()
})
const showModal = (id) => document.getElementById(id).showModal()
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
                <h2 class="text-lg">Filtros</h2>

                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Estado</span>
                    </div>
                    <select v-model="ticketStatus" class="select w-full" name="role">
                        <option selected value="open">Abierto</option>
                        <option value="paid">Pagado</option>
                    </select>
                </label>
            </div>
        </div>
        <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Estado</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ticket in data">
                                <th>{{ ticket.id }}</th>
                                <td>
                                    {{
                        ticket.ticket_status == 'open' ? 'Abierto' :
                            ticket.ticket_status == 'paid' ? 'Pagado' :
                                ticket.ticket_status }}
                                </td>
                                <td>{{ ticket.total }}</td>
                                <td>
                                    <button :disabled="!ticket.ticket_products.length"
                                        @click="showModal(`ticket_products_${ticket.id}`)"
                                        class="btn btn-sm btn-primary">
                                        <span class="material-symbols-outlined">
                                            receipt_long
                                        </span>
                                    </button>
                                    <dialog :id="`ticket_products_${ticket.id}`" class="modal">
                                        <div class="modal-box flex flex-col max-h-[80%] gap-2">
                                            <div v-for="ticketProduct in ticket.ticket_products"
                                                class="card bg-base-100 shadow-xl">
                                                <div class="card-body p-3">
                                                    <div class="flex justify-between">
                                                        <span class="font-bold">{{ ticketProduct.name }}</span>
                                                        <span>${{ ticketProduct.price }} c/u</span>
                                                    </div>
                                                    <div class="flex justify-between">
                                                        <span>{{ ticketProduct.quantity }}</span>
                                                        <span>
                                                            ${{ ticketProduct.price * ticketProduct.quantity }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <form method="dialog" class="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>