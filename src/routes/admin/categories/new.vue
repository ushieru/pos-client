<script setup>
import { useRouter } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast';
const pos = PosSingleton.instance
const router = useRouter()
const onSubmitCreateCategory = (e) => {
    const availableDays = []
    if (e.target.monday.checked) availableDays.push(1)
    if (e.target.tuesday.checked) availableDays.push(2)
    if (e.target.wednesday.checked) availableDays.push(3)
    if (e.target.thursday.checked) availableDays.push(4)
    if (e.target.friday.checked) availableDays.push(5)
    if (e.target.saturday.checked) availableDays.push(6)
    if (e.target.sunday.checked) availableDays.push(0)
    pos.category
        .createCategory({
            name: e.target.name.value,
            available_from: new Date(e.target.available_from.value),
            available_until: new Date(e.target.available_until.value),
            available_from_hour: e.target.available_from_hour.value,
            available_until_hour: e.target.available_until_hour.value,
            available_days: availableDays
        })
        .then(_ => {
            e.target.reset()
            toast('Categoria creada correctamente', 'success')
            router.push("/admin/categories")
        })
        .catch(error => toast(error.message, 'error'))
}
</script>

<template>
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <h1 class="text-2xl">Nueva Categoria</h1>
            <form @submit.prevent="onSubmitCreateCategory" class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <label class="form-control w-full lg:col-span-2">
                    <div class="label">
                        <span class="label-text">Nombre</span>
                    </div>
                    <input type="text" name="name" class="input input-bordered w-full" />
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
                        <span class="label-text">Disponible desde la hora</span>
                    </div>
                    <input type="time" name="available_from_hour" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Disponible hasta la hora</span>
                    </div>
                    <input type="time" name="available_until_hour" class="input input-bordered w-full" />
                </label>
                <h1 class="font-bold text-gl lg:col-span-2">Dias disponible:</h1>
                <div class="lg:col-span-2">
                    <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Lunes</span>
                                <input name="monday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Martes</span>
                                <input name="tuesday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Miercoles</span>
                                <input name="wednesday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Jueves</span>
                                <input name="thursday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Viernes</span>
                                <input name="friday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Sabado</span>
                                <input name="saturday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                        <div class="badge w-full h-full">
                            <label class="label cursor-pointer w-full">
                                <span class="label-text">Domingo</span>
                                <input name="sunday" type="checkbox" class="checkbox" />
                            </label>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2 lg:grid lg:justify-end mt-3">
                    <button class="w-full btn btn-primary lg:w-60">Crear</button>
                </div>
            </form>
        </div>
    </div>
</template>