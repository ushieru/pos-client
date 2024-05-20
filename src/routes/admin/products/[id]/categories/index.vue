<script setup>
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
const pos = PosSingleton.instance
const route = useRoute()
const { id: productId } = route.params
const { data: product, refetch: refetchProduct, idLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => pos.product.findProduct(productId),
    refetchInterval: 5000,
})
const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: pos.category.getCategories,
    refetchInterval: 5000,
})
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="card bg-base-200 shadow-xl">
            <div v-if="isLoadingProduct" class="card-body grid place-items-center">
                <span class="loading loading-dots loading-lg"></span>
            </div>
            <div v-if="product" class="card-body">
                <h1 class="text-2xl">
                    <span>#{{ product.id }}</span>
                    - {{ product.name }}
                </h1>
            </div>
        </div>
        <div v-if="product" class="flex gap-4">
            <div class="card bg-base-200 shadow-xl w-full">
                <div class="card-body">
                    <h1 class="text-xl">
                        Categorias
                    </h1>
                    <button v-if="categories"
                        v-for="category in categories.filter(category => !product.categories.map(c => c.id).find(id => id == category.id))"
                        @click="() => pos.product.addProductCategory(product.id, category.id).then(refetchProduct)"
                        class="btn btn-primary">
                        {{ category.name }}
                    </button>
                </div>
            </div>
            <div class="card bg-base-200 shadow-xl w-full">
                <div class="card-body">
                    <h1 class="text-xl">
                        Categorias del producto: {{ product.name }}
                    </h1>
                    <button v-for="category in product.categories"
                        @click="() => pos.product.deleteProductCategory(product.id, category.id).then(refetchProduct)"
                        class="btn btn-secondary">
                        {{ category.name }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>