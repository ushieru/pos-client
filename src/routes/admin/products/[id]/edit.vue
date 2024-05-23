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

const dayIsChecked = (weekday) => {
    return product.value.available_days.includes(weekday)
}
const onSubmitUpdateProduct = (e) => {
    const name = e.target.name.value
    const description = e.target.description.value
    const price = e.target.price.value
    const availableFrom = e.target.available_from.value
    const availableUntil = e.target.available_until.value
    const availableDays = []
    if (e.target.monday.checked) availableDays.push(1)
    if (e.target.tuesday.checked) availableDays.push(2)
    if (e.target.wednesday.checked) availableDays.push(3)
    if (e.target.thursday.checked) availableDays.push(4)
    if (e.target.friday.checked) availableDays.push(5)
    if (e.target.saturday.checked) availableDays.push(6)
    if (e.target.sunday.checked) availableDays.push(0)
    pos.product.updateProduct(productId, {
        name,
        description,
        price: +price,
        available_from: new Date(availableFrom),
        available_until: new Date(availableUntil),
        available_from_hour: e.target.available_from_hour.value,
        available_until_hour: e.target.available_until_hour.value,
        available_days: availableDays
    })
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
                        <span class="label-text">Precio</span>
                    </div>
                    <input :value="product.price" type="number" inputmode="numeric" name="price"
                        class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full lg:col-span-2">
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
                        <span class="label-text">Disponible desde la hora</span>
                    </div>
                    <input :value="product.available_from_hour" type="time" name="available_from_hour"
                        class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Disponible hasta la hora</span>
                    </div>
                    <input :value="product.available_until_hour" type="time" name="available_until_hour"
                        class="input input-bordered w-full" />
                </label>
                <h1 class="font-bold text-gl lg:col-span-2">Dias disponible:</h1>
                <div class="lg:col-span-2">
                    <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Lunes</span>
                                <input :checked="dayIsChecked(1)" name="monday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Martes</span>
                                <input :checked="dayIsChecked(2)" name="tuesday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Miercoles</span>
                                <input :checked="dayIsChecked(3)" name="wednesday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Jueves</span>
                                <input :checked="dayIsChecked(4)" name="thursday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Viernes</span>
                                <input :checked="dayIsChecked(5)" name="friday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Sabado</span>
                                <input :checked="dayIsChecked(6)" name="saturday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Domingo</span>
                                <input :checked="dayIsChecked(0)" name="sunday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-2 lg:grid lg:justify-end mt-3">
                    <button class="w-full btn btn-primary lg:w-60">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</template>