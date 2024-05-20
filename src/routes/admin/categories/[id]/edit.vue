<script setup>
import { useQuery } from '@tanstack/vue-query'
import { useRouter, useRoute } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast'
import { watch } from 'vue';
const pos = PosSingleton.instance

const router = useRouter()
const route = useRoute()
const { id: categoryId } = route.params

const { data: category, isLoading, error } = useQuery({
    queryKey: ['category-' + categoryId],
    queryFn: () => pos.category.getCategory(categoryId),
    retry: false,
    initialData: null
})

watch(error, () => {
    toast(error.value.message, 'error')
    router.push("/admin/categories")
})

const onSubmitUpdateCategory = (e) => pos.category.updateCategory(categoryId, e.target.name.value)
    .then(_ => {
        e.target.reset()
        toast('Categoria actualizada correctamente', 'success')
        router.push("/admin/categories")
    })
    .catch(error => toast(error.message, 'error'))
</script>

<template>
    <div v-if="isLoading" class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <span class="loading loading-dots loading-lg m-auto"></span>
        </div>
    </div>
    <div v-if="category" class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <h1 class="text-2xl">Editar Categoria</h1>
            <form @submit.prevent="onSubmitUpdateCategory" class="grid grid-cols-1 gap-2">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Nombre</span>
                    </div>
                    <input :value="category.name" type="text" name="name" class="input input-bordered w-full" />
                </label>
                <div class="lg:col-span-2 lg:grid lg:justify-end mt-3">
                    <button class="w-full btn btn-primary lg:w-60">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</template>