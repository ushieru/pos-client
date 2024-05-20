<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query';
import { PosSingleton } from '@/services/pos-service'
import { Filter, FilterBuilderOperator } from '@/services/pos-service/util/Filter';
const pos = PosSingleton.instance

const route = useRoute()
const router = useRouter()
const { id: ticketId } = route.params
const currentCategory = ref(undefined)
const filters = new Filter()
    .add("Date('now')", FilterBuilderOperator.GTE, "Date(available_from)")
    .add("Date('now')", FilterBuilderOperator.LTE, "Date(available_until)")
const { data: ticket, refetch: refetchTicket } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => pos.ticket.findTicket(ticketId),
    refetchInterval: 5000,
})
const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: pos.category.getCategories,
    initialData: [],
    refetchInterval: 5000,
})
const { data: productsByCategory, refetch: refetchProductsByCategory } = useQuery({
    queryKey: ['products', 'category'],
    queryFn: () => pos.product.getProductsByCategory(currentCategory.value.id, filters),
    initialData: [],
    refetchInterval: 5000,
})
watch(categories, (categories) => {
    if (!categories.length) return
    currentCategory.value = categories[0]
}, {})
const selectCategory = (category) => {
    currentCategory.value = category
    refetchProductsByCategory()
}
const addTicketProduct = (productId) => pos.ticket.addProduct(ticket.value.id, productId).then(_ => refetchTicket())
const deleteTicketProduct = (productId) => pos.ticket.deleteProduct(ticket.value.id, productId).then(_ => refetchTicket())
const cancelTicket = () => pos.ticket.deleteTicket(ticket.value.id).then(_ => router.back())
const onPayTicket = () => pos.ticket.payTicket(ticket.value.id).then(_ => router.back())
</script>

<template>
    <div class="flex gap-1">
        <div class="flex flex-col gap-5 w-full">
            <div class="card bg-base-200 shadow-xl">
                <div class="card-body flex-row gap-2 overflow-x-auto">
                    <button v-for="category in categories" class="btn"
                        :class="{ 'btn-primary': currentCategory?.id == category.id }"
                        @click="selectCategory(category)">
                        {{ category.name }}
                    </button>
                </div>
            </div>
            <div class="card bg-base-200 shadow-xl">
                <div class="card-body flex-row gap-2 overflow-x-auto">
                    <button v-for="product in productsByCategory" class="btn" @click="addTicketProduct(product.id)">
                        {{ product.name }}
                    </button>
                </div>
            </div>
        </div>
        <div class="card bg-base-200 shadow-xl w-[450px] h-[95vh]">
            <div v-if="ticket" class="card-body">
                <h1 class="text-2xl font-bold">Ticket #{{ ticket.id }}</h1>
                <div class="divider"></div>
                <div class="h-full">
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
                <section class="grid grid-cols-2 gap-2">
                    <button class="btn btn-error" :class="{ 'btn-disabled': ticket.ticket_products.length != 0 }"
                        :disabled="ticket.ticket_products.length != 0" @click="cancelTicket">
                        Cancelar
                    </button>
                    <button class="btn btn-primary" @click="onPayTicket" :disabled="ticket.ticket_products.length == 0">
                        Cobrar
                    </button>
                </section>
            </div>
        </div>
    </div>
</template>