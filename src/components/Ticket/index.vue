<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query';
import { PosSingleton } from '@/services/pos-service'
import { Filter, FilterBuilderOperator } from '@/services/pos-service/util/Filter';
import PayTicketModal from '@/components/Ticket/PayTicketModal.vue'
import Ticket from '@/components/Ticket/Ticket.vue'
const pos = PosSingleton.instance
const session = pos.auth.session
const route = useRoute()
const router = useRouter()
const { id: ticketId } = route.params
const currentCategory = ref(undefined)
const ticketProducts = ref([])
const productsFilter = new Filter()
    .add("Date('now')", FilterBuilderOperator.GTE, "Date(available_from)")
    .add("Date('now')", FilterBuilderOperator.LTE, "Date(available_until)")
const categoriesFilter = new Filter()
    .add("instr(available_days, strftime('%w', date('now')))", FilterBuilderOperator.GT, "0")
    .add("time('now', 'localtime')", FilterBuilderOperator.GTE, "time(available_from_hour)")
    .add("time('now', 'localtime')", FilterBuilderOperator.LTE, "time(available_until_hour)")
const { data: ticket, refetch: refetchTicket } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => pos.ticket.findTicket(ticketId),
    refetchInterval: 5000,
})
const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => pos.category.getCategories(categoriesFilter),
    initialData: [],
    refetchInterval: 5000,
})
const { data: productsByCategory, refetch: refetchProductsByCategory } = useQuery({
    queryKey: ['products', 'category'],
    queryFn: () => pos.product.getProductsByCategory(currentCategory.value.id, productsFilter),
    initialData: [],
    refetchInterval: 5000,
})
watch(categories, (categories) => {
    if (!categories.length) return
    currentCategory.value = categories[0]
    refetchProductsByCategory()
}, { once: true })
watch(ticket, (ticket) => {
    if (ticket.ticket_status != 'paid') {
        ticketProducts.value = Object.groupBy(ticket.ticket_products, ({ product_id }) => product_id)
        return
    }
    document.getElementById('paid_modal').showModal()
})
const selectCategory = (category) => {
    currentCategory.value = category
    refetchProductsByCategory()
}
const goToTickets = () => {
    if (session.user.account.account_type == 'cashier')
        router.push('/cashier/tickets')
    if (session.user.account.account_type == 'waiter')
        router.push('/waiter')
}
const addTicketProduct = (productId) => pos.ticket.addProduct(ticket.value.id, productId).then(_ => refetchTicket())
const deleteTicketProduct = (productId) => pos.ticket.deleteProduct(ticket.value.id, productId).then(_ => refetchTicket())
const cancelTicket = () => pos.ticket.deleteTicket(ticket.value.id).then(goToTickets)
const orderProducts = () => pos.ticket.orderTicket(ticket.value.id).then(goToTickets)
</script>

<template>
    <div class="grow flex gap-1">
        <div class="grow flex flex-col gap-5">
            <div class="card bg-base-200 shadow-xl">
                <div class="card-body flex-row gap-2 overflow-x-auto">
                    <button v-for="category in categories" class="btn"
                        :class="{ 'btn-primary': currentCategory?.id == category.id }"
                        @click="selectCategory(category)">
                        {{ category.name }}
                    </button>
                </div>
            </div>
            <div class="grow card bg-base-200 shadow-xl">
                <div class="card-body h-1">
                    <div
                        class="p-5 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max gap-3 sm:gap-4">
                        <template v-for="product in productsByCategory">
                            <div class="indicator w-full">
                                <span v-if="ticket"
                                    v-show="ticket.ticket_products.find(p => p.product_id == product.id)"
                                    class="indicator-item badge badge-primary">{{
                        ticket
                            .ticket_products
                            .filter(p => p.product_id == product.id)
                            .reduce(acc => ++acc, 0)
                    }} </span>
                                <button class="btn btn-neutral flex flex-col w-full h-40"
                                    @click="addTicketProduct(product.id)">
                                    <span> {{ product.name }}</span>
                                    <kbd class="kbd">${{ product.price }}</kbd>
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="flex lg:hidden card bg-base-200 shadow-xl">
                <div class="card-body flex-row gap-2 overflow-x-auto">
                    <button class="btn btn-primary w-full" onclick="ticket_modal.showModal()">
                        Ticket
                    </button>
                    <dialog id="ticket_modal" class="modal">
                        <div class="modal-box flex flex-col h-[80%]">
                            <Ticket v-if="ticket" :session="session" :ticket="ticket" :ticketProducts="ticketProducts"
                                :orderProducts="orderProducts" :addTicketProduct="addTicketProduct"
                                :deleteTicketProduct="deleteTicketProduct" :cancelTicket="cancelTicket" />
                        </div>
                        <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
        </div>
        <div class="hidden lg:flex card bg-base-200 shadow-xl w-[450px] h-[95vh]">
            <div v-if="ticket" class="card-body h-full">
                <Ticket v-if="ticket" :session="session" :ticket="ticket" :ticketProducts="ticketProducts"
                    :orderProducts="orderProducts" :addTicketProduct="addTicketProduct"
                    :deleteTicketProduct="deleteTicketProduct" :cancelTicket="cancelTicket" />
            </div>
        </div>
    </div>
    <PayTicketModal v-if="ticket" :ticket="ticket" :goToTickets="() => goToTickets()" />
    <dialog id="paid_modal" class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Este ticket ya esta pagado</h3>
            <div class="flex justify-end">
                <button @click="goToTickets" class="btn btn-primary">Volver</button>
            </div>
        </div>
    </dialog>
</template>