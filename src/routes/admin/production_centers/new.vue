<script setup>
import { useRouter } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast';
const pos = PosSingleton.instance
const router = useRouter()
const onSubmitCreateProductionCenter = (e) => {
    pos.productionCenter
        .create(e.target.name.value)
        .then(_ => {
            e.target.reset()
            toast('Centro de produccion creado correctamente', 'success')
            router.push("/admin/production-centers")
        })
        .catch(error => toast(error.message, 'error'))
}
</script>

<template>
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <h1 class="text-2xl">Nuevo Centro de produccion</h1>
            <form @submit.prevent="onSubmitCreateProductionCenter" class="grid grid-cols-1 gap-2">
                <label class="form-control w-full lg:col-span-2">
                    <div class="label">
                        <span class="label-text">Nombre</span>
                    </div>
                    <input type="text" name="name" class="input input-bordered w-full" />
                </label>
                <div class="lg:col-span-2 lg:grid lg:justify-end mt-3">
                    <button class="w-full btn btn-primary lg:w-60">Crear</button>
                </div>
            </form>
        </div>
    </div>
</template>