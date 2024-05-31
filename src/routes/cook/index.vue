<script setup>
import { useQuery } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import { PosSingleton } from '@/services/pos-service'
import { Filter, FilterBuilderOperator } from '@/services/pos-service/util/Filter';
const pos = PosSingleton.instance
const filter = new Filter()
    .add('ticket_status', FilterBuilderOperator.EQUAL, '"open"')
const { data: tickets, refetch } = useQuery({
    queryKey: ['tickets', 'open'],
    queryFn: () => pos.ticket.getTickets(filter),
    initialData: [],
    refetchInterval: 5000,
})
const statusTranslate = (status) => {
    switch (status) {
        case 'Ordered':
            return 'En espera'
        case 'InPreparation':
            return 'En preparacion'
        case 'Prepared':
            return 'Listo'
    }
}
const statusValue = {
    'InPreparation': 1,
    'Ordered': 2,
    'Prepared': 3,
}
const sortTicketProducts = (products) => {
    const toSort = [...products]
    toSort.sort((a, b) => statusValue[a.status] - statusValue[b.status])
    return toSort
}
const showModal = (modalId) => document.getElementById(modalId).showModal()
const setInPreparation = (productId) => pos.ticketProduct.setInPreparation(productId).then(() => refetch())
const setPrepared = (productId) => pos.ticketProduct.setPrepared(productId).then(() => refetch())
</script>

<template>
    <div class="navbar flex justify-between bg-base-100 shadow-md px-10">
        <a class="btn btn-ghost">
            <img src="/favicon.svg" class="w-[45px]" alt="favicon" />
        </a>

        <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 grid place-content-center rounded-full">
                    <span class="material-symbols-outlined">
                        more_horiz
                    </span>
                </div>
            </div>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                    <a>
                        Profile
                    </a>
                </li>
                <div class="divider m-0"></div>
                <li>
                    <RouterLink to="/logout">Logout</RouterLink>
                </li>
            </ul>
        </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-3">
        <template v-for="ticket in tickets">
            <div v-if="ticket.ticket_products.some(({ status }) => status != 'Added' && status != 'Prepared')"
                @click="showModal('ticket_dialog#' + ticket.id)" class="card bg-base-200 shadow-xl cursor-pointer">
                <div class="card-body">
                    <p class="text-sm md:text-lg font-bold"> {{ ticket.id }}</p>
                    <div class="flex justify-end">
                        <span class="text-sm font-bold flex justify-center gap-2">
                            <span class="material-symbols-outlined">
                                schedule
                            </span>
                            {{ dayjs(ticket.create_at).format("HH:mm") }}
                        </span>
                    </div>
                </div>
            </div>
            <dialog :id="'ticket_dialog#' + ticket.id" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Ticket {{ ticket.id }}</h3>
                    <div class="divider"></div>
                    <template v-for="product in sortTicketProducts(ticket.ticket_products)">
                        <div class="px-5">
                            <div class="flex justify-between items-center">
                                <div class="flex flex-col gap-2">
                                    <div class="flex items-center gap-2">
                                        <span v-if="product.status == 'Ordered'"
                                            class="material-symbols-outlined">hourglass_bottom</span>
                                        <span v-if="product.status == 'InPreparation'"
                                            class="text-primary material-symbols-outlined">hourglass_top</span>
                                        <span v-if="product.status == 'Prepared'"
                                            class="text-success material-symbols-outlined">check_circle</span>
                                        <p class="font-bold text-lg">{{ product.name }}</p>
                                    </div>
                                    <kbd class="kbd" :class="{
            'border-primary': product.status == 'InPreparation',
            'border-success': product.status == 'Prepared',
        }">
                                        {{ statusTranslate(product.status) }}
                                    </kbd>
                                </div>
                                <button v-if="product.status == 'Ordered'" class="btn btn-primary w-24"
                                    @click="setInPreparation(product.id)">
                                    Preparar
                                </button>
                                <button v-if="product.status == 'InPreparation'" class="btn btn-success w-24"
                                    @click="setPrepared(product.id)">
                                    Preparado
                                </button>
                            </div>
                            <div class="divider m-1"></div>
                        </div>
                    </template>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </template>
    </div>
</template>