<script setup>
import { useQuery } from '@tanstack/vue-query'
import { PosSingleton } from '@/services/pos-service'
const pos = PosSingleton.instance
const { data, refetch } = useQuery({
    queryKey: ['production-centers'],
    queryFn: () => pos.productionCenter.list(),
    initialData: [],
    refetchInterval: 5000,
})
const showModal = (id) => document.getElementById(id).showModal()
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr class="border-neutral border-b-2">
                    <th>id</th>
                    <th>Nombre</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="productionCenter in data">
                    <th>{{ productionCenter.id }}</th>
                    <td>{{ productionCenter.name }}</td>
                    <td class="flex gap-2">
                        <button class="btn btn-sm btn-error"
                            @click="showModal(`delete_production_center_${productionCenter.id}`)">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                        <RouterLink :to="`/admin/production-centers/${productionCenter.id}/edit`">
                            <button class="btn btn-sm btn-primary">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </RouterLink>
                        <RouterLink :to="`/admin/production-centers/${productionCenter.id}/accounts`">
                            <button class="btn btn-sm btn-secondary">
                                <span class="material-symbols-outlined">
                                    group
                                </span>
                            </button>
                        </RouterLink>
                        <RouterLink :to="`/admin/production-centers/${productionCenter.id}/categories`">
                            <button class="btn btn-sm btn-accent">
                                <span class="material-symbols-outlined">
                                    category
                                </span>
                            </button>
                        </RouterLink>
                    </td>
                    <dialog :id="`delete_production_center_${productionCenter.id}`" class="modal">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">Eliminar Centro de produccion {{ productionCenter.name }} con
                                Id: "{{ productionCenter.id }}"?
                            </h3>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn">Cancelar</button>
                                </form>
                                <form method="dialog">
                                    <button class="btn btn-primary"
                                        @click="() => pos.productionCenter.delete(productionCenter.id).then(refetch)">Eliminar</button>
                                </form>
                            </div>
                        </div>
                        <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </tr>
            </tbody>
        </table>
    </div>
</template>