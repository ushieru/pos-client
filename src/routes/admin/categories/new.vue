<script setup>
import { useRouter } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast';
const pos = PosSingleton.instance

const router = useRouter()

const onSubmitCreateCategory = (e) => pos.category.createCategory(e.target.name.value)
    .then(_ => {
        e.target.reset()
        toast('Categoria creada correctamente', 'success')
        router.push("/admin/categories")
    })
    .catch(error => toast(error.message, 'error'))
</script>

<template>
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <h1 class="text-2xl">Nueva Categoria</h1>
            <form @submit.prevent="onSubmitCreateCategory" class="grid gap-2">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Nombre</span>
                    </div>
                    <input type="text" name="name" class="input input-bordered w-full" />
                </label>
                <div class="lg:grid lg:justify-end mt-3">
                    <button class="w-full btn btn-primary lg:w-60">Crear</button>
                </div>
            </form>
        </div>
    </div>
</template>