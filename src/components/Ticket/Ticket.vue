<script setup>
const {
    session,
    ticket,
    addTicketProduct,
    deleteTicketProduct,
    cancelTicket,
    goToTickets,
} = defineProps([
    'session',
    'ticket',
    'addTicketProduct',
    'deleteTicketProduct',
    'cancelTicket',
    'goToTickets',
])
</script>
<template>
    <h1 class="text-2xl font-bold">Ticket #{{ ticket.id }}</h1>
    <div class="divider"></div>
    <div class="h-full overflow-y-auto gap-2 flex flex-col">
        <div v-for="ticketProduct in ticket.ticket_products" class="card bg-base-100 shadow-xl">
            <div class="card-body p-3">
                <div class="flex justify-between">
                    <span class="font-bold">{{ ticketProduct.name }}</span>
                    <span class="">${{ ticketProduct.price }} c/u</span>
                </div>
                <div class="flex justify-between">
                    <span class="flex items-center gap-2">
                        <button class="btn btn-sm" @click="deleteTicketProduct(ticketProduct.product_id)">
                            <span v-if="ticketProduct.quantity == 1" class="material-symbols-outlined">
                                delete
                            </span>
                            <span v-else class="material-symbols-outlined">
                                remove
                            </span>
                        </button>
                        {{ ticketProduct.quantity }}
                        <button class="btn btn-sm" @click="addTicketProduct(ticketProduct.product_id)">
                            <span class="material-symbols-outlined">
                                add
                            </span>
                        </button>
                    </span>
                    <span class="">${{ ticketProduct.price * ticketProduct.quantity }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="divider"></div>
    <div class="flex justify-between font-bold">
        <span>Total</span>
        <span>${{ ticket.total }}</span>
    </div>
    <div class="divider"></div>
    <section class="grid grid-cols-2 gap-2">
        <button class="btn btn-error" :class="{ 'btn-disabled': ticket.ticket_products.length != 0 }"
            :disabled="ticket.ticket_products.length != 0" @click="cancelTicket()">
            Cancelar
        </button>
        <button v-if="session.user.account.account_type == 'cashier'" onclick="pay_modal.showModal()"
            class="btn btn-primary" :disabled="ticket.ticket_products.length == 0">
            Cobrar
        </button>
        <button v-if="session.user.account.account_type == 'waiter'" @click="goToTickets" class="btn btn-primary"
            :disabled="ticket.ticket_products.length == 0">
            Aceptar
        </button>
    </section>
</template>