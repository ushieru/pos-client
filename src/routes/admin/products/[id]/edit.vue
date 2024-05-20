<script setup>
import { useQuery } from '@tanstack/vue-query'
import { useRouter, useRoute } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast'
import { watch } from 'vue';
const pos = PosSingleton.instance

const router = useRouter()
const route = useRoute()
const { id: productId } = route.params

const { data: product, isLoading, error } = useQuery({
    queryKey: ['product-' + productId],
    queryFn: () => pos.product.getProduct(productId),
    retry: false,
    initialData: null
})

watch(error, () => {
    toast(error.value.message, 'error')
    router.push("/admin/products")
})

const onSubmitUpdateProduct = (e) => {
    const name = e.target.name.value
    const description = e.target.description.value
    const price = e.target.price.value
    const availableFrom = e.target.available_from.value
    const availableUntil = e.target.available_until.value
    pos.product.updateProduct(productId, name, description, +price, new Date(availableFrom), new Date(availableUntil))
        .then(_ => {
            e.target.reset()
            toast('Producto actualizado correctamente', 'success')
            router.push("/admin/products")
        })
        .catch(error => toast(error.message, 'error'))
}
</script>

<template>
    <div v-if="isLoading" class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <span class="loading loading-dots loading-lg m-auto"></span>
        </div>
    </div>
    <div v-if="product" class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <h1 class="text-2xl">Actualizar Producto</h1>
            <form @submit.prevent="onSubmitUpdateProduct" class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Nombre</span>
                    </div>
                    <input :value="product.name" type="text" name="name" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Descripcion</span>
                    </div>
                    <input :value="product.description" type="text" name="description"
                        class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Disponible desde</span>
                    </div>
                    <input :value="product.available_from.split('T')[0]" type="date" name="available_from"
                        class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Disponible hasta</span>
                    </div>
                    <input :value="product.available_until.split('T')[0]" type="date" name="available_until"
                        class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Precio</span>
                    </div>
                    <input :value="product.price" type="number" inputmode="numeric" name="price"
                        class="input input-bordered w-full" />
                </label>
                <div class="lg:col-span-2 lg:grid lg:justify-end mt-3">
                    <button class="w-full btn btn-primary lg:w-60">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</template>