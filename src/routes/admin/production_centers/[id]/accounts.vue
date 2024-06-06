<script setup>
import { useQuery } from '@tanstack/vue-query'
import { useRouter, useRoute } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast'
import { watch } from 'vue';
const pos = PosSingleton.instance
const router = useRouter()
const route = useRoute()
const { id: productionCenterId } = route.params
const { data: productionCenter, error, refetch } = useQuery({
    queryKey: ['productionCenter-' + productionCenterId],
    queryFn: () => pos.productionCenter.find(productionCenterId),
    retry: false,
    initialData: null
})
const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => pos.user.getUsers(),
    retry: false,
    initialData: null
})
watch(error, () => {
    toast(error.value.message, 'error')
    router.push("/admin/production-centers")
})
</script>

<template>
    <div v-if="productionCenter != null" class="flex flex-col gap-5">
        <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
                <h1 class="text-xl font-bold">
                    {{ productionCenter.name }}
                </h1>
                <h2 class="text-sm">ID: {{ productionCenter.id }}</h2>
            </div>
        </div>

        <div v-if="users" class="flex gap-4">
            <div class="card bg-base-200 shadow-xl w-full">
                <div class="card-body">
                    <h1 class="text-xl">
                        Cuentas
                    </h1>
                    <div class="divider m-0"></div>
                    <button
                        v-for="account in users.filter(user => user.account.account_type == 'producer').map(({ account }) => account).filter(account => !productionCenter.accounts.map(a => a.id).includes(account.id))"
                        @click="pos.productionCenter.addAccount(productionCenter.id, account.id).then(refetch)"
                        class="btn btn-primary">
                        {{ account.username }}
                    </button>
                </div>
            </div>
            <div class="card bg-base-200 shadow-xl w-full">
                <div class="card-body">
                    <h1 class="text-xl">
                        Cuentas en {{ productionCenter.name }}
                    </h1>
                    <div class="divider m-0"></div>
                    <button v-for="account in productionCenter.accounts"
                        @click="pos.productionCenter.deleteAccount(productionCenter.id, account.id).then(refetch)"
                        class="btn btn-secondary">
                        {{ account.username }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>