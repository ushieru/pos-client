<script setup>
import { useRouter } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast';
const pos = PosSingleton.instance

const router = useRouter()

const onSubmitCreateProduct = (e) => {
    const name = e.target.name.value
    const description = e.target.description.value
    const price = e.target.price.value
    const availableFrom = e.target.available_from.value
    const availableUntil = e.target.available_until.value
    pos.product.createProduct(name, description, +price, new Date(availableFrom), new Date(availableUntil))
        .then(product => {
            e.target.reset()
            toast('Producto creado correctamente', 'success')
            router.push("/admin/products")
        })
}
</script>

<template>
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <h1 class="text-2xl">Nuevo Producto</h1>
            <form @submit.prevent="onSubmitCreateProduct" class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Nombre</span>
                    </div>
                    <input type="text" name="name" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Descripcion</span>
                    </div>
                    <input type="text" name="description" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Disponible desde</span>
                    </div>
                    <input type="date" name="available_from" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Disponible hasta</span>
                    </div>
                    <input type="date" name="available_until" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Precio</span>
                    </div>
                    <input type="number" inputmode="numeric" name="price" class="input input-bordered w-full" />
                </label>
                <div class="lg:col-span-2 lg:grid lg:justify-end mt-3">
                    <button class="w-full btn btn-primary lg:w-60">Crear</button>
                </div>
            </form>
        </div>
    </div>
</template>