<script setup>
import { useQuery } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import { PosSingleton } from '@/services/pos-service'
import { Filter } from '@/services/pos-service/util/Filter';
const pos = PosSingleton.instance
const { data: ticketProducts, refetch } = useQuery({
    queryKey: ['ticketProducts', pos.auth.session.user.account.id],
    queryFn: () => pos.productionCenter.listTicketProducts(),
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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-2 p-3">
        <template v-for="ticketProduct in Object.groupBy(ticketProducts ?? [], ({ ticket_id }) => ticket_id)">
            <div class="card bg-base-200 shadow-xl">
                <div class="card-body justify-start flex-initial">
                    <p class="font-bold text-lg"> {{ ticketProduct[0]?.ticket_id }}</p>
                    <div class="divider m-1"></div>
                    <template v-for="product in sortTicketProducts(ticketProduct)">
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
                                        <p>{{ product.name }}</p>
                                    </div>
                                    <kbd class="kbd" :class="{
            'border-primary': product.status == 'InPreparation',
            'border-success': product.status == 'Prepared',
        }">
                                        {{ statusTranslate(product.status) }}
                                    </kbd>
                                </div>
                                <div class="flex flex-col gap-2 items-center">
                                    <p class="flex gap-2">
                                        <span class="material-symbols-outlined">
                                            schedule
                                        </span>
                                        <span>
                                            {{ dayjs(product.create_at).fromNow() }}
                                        </span>
                                    </p>
                                    <button v-if="product.status == 'Ordered'" class="btn btn-primary w-full"
                                        @click="setInPreparation(product.id)">
                                        Preparar
                                    </button>
                                    <button v-if="product.status == 'InPreparation'" class="btn btn-success w-full"
                                        @click="setPrepared(product.id)">
                                        Preparado
                                    </button>
                                </div>
                            </div>
                            <div class="divider m-1"></div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>