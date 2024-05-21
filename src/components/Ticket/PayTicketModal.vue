<script setup>
import { PosSingleton } from '@/services/pos-service'
import { ref } from 'vue';

const { ticket, goToTickets } = defineProps(['ticket', 'goToTickets'])
const pos = PosSingleton.instance
const payment = ref('')

const payTicket = () => pos.ticket.payTicket(ticket.id).then(goToTickets)
</script>

<template>
    <dialog id="pay_modal" class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Cobrar ticket #{{ ticket.id }}</h3>
            <p class="mt-4 font-bold">Total: ${{ ticket.total }}</p>
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Paga con:</span>
                </div>
                <input v-model="payment" type="number" inputmode="numeric" name="price"
                    class="input input-bordered w-full" />
            </label>
            <p class="mt-3 font-bold">Cambio: ${{ payment - ticket.total }}</p>
            <div class="flex justify-end">
                <form method="dialog">
                    <button @click="payTicket" class="btn btn-primary">Pagar</button>
                </form>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>