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
const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => pos.category.getCategories(),
    refetchInterval: 5000,
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

        <div v-if="categories" class="flex gap-4">
            <div class="card bg-base-200 shadow-xl w-full">
                <div class="card-body">
                    <h1 class="text-xl">
                        Categorias
                    </h1>
                    <div class="divider m-0"></div>
                    <button
                        v-for="category in categories.filter(({ id }) => !productionCenter.categories.map(pc => pc.id).includes(id))"
                        @click="pos.productionCenter.addCategory(productionCenter.id, category.id).then(refetch)"
                        class="btn btn-primary">
                        {{ category.name }}
                    </button>
                </div>
            </div>
            <div class="card bg-base-200 shadow-xl w-full">
                <div class="card-body">
                    <h1 class="text-xl">
                        Categorias en {{ productionCenter.name }}
                    </h1>
                    <div class="divider m-0"></div>
                    <button v-for="category in productionCenter.categories"
                        @click="pos.productionCenter.deleteCateogry(productionCenter.id, category.id).then(refetch)"
                        class="btn btn-secondary">
                        {{ category.name }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>