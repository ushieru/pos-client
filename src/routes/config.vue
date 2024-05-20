<script setup>
import { ref } from 'vue';
import { PosSingleton } from '@/services/pos-service';
import { toast } from '@/utils/Toast';
const isLoading = ref(false)
const pos = PosSingleton.instance
const host = ref(pos.host)
const onSubmit = (event) => {
    isLoading.value = true
    const _host = event.target.host.value
    pos.ping(_host)
        .then(isConnect => {
            if (!isConnect)
                return toast('Error al conectar', 'error')
            localStorage.setItem('x-pos-host', _host)
            host.value = _host
            new PosSingleton(_host)
            toast('Configuracion actualizada', 'success')
            isLoading.value = false
        })
        .catch(_ => {
            toast('Error al conectar', 'error')
            isLoading.value = false
        })
}
</script>

<template>
    <div class="m-1 lg:m-5">
        <div class="card bg-base-200 shadow-xl mb-5">
            <div class="card-body">
                <RouterLink to="/">
                    <button class="btn btn-ghost btn-sm">
                        <span class="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                    </button>
                </RouterLink>
            </div>
        </div>
        <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Config</h2>
                <form @submit.prevent="onSubmit">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Host</span>
                        </div>
                        <input :value="host" type="text" name="host" class="input input-bordered w-full" />
                    </label>
                    <div class="mt-5 flex justify-end">
                        <button v-show="isLoading" type="button" class="btn btn-primary w-60">
                            <span class="loading loading-dots loading-lg"></span>
                        </button>
                        <button v-show="!isLoading" type="submit" class="btn btn-primary w-60">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>