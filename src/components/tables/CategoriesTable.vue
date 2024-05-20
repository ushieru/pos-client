<script setup>
import { useQuery } from '@tanstack/vue-query'
import { PosSingleton } from '@/services/pos-service'
const pos = PosSingleton.instance
const { data, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: () => pos.category.getCategories(),
    initialData: [],
    refetchInterval: 5000,
})
const showModal = (id) => document.getElementById(id).showModal()
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Nombre</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in data">
                    <th>{{ category.id }}</th>
                    <td>{{ category.name }}</td>
                    <td class="flex gap-2">
                        <button class="btn btn-sm btn-error" @click="showModal(`delete_category_${category.id}`)">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                        <RouterLink :to="`/admin/categories/${category.id}/edit`">
                            <button class="btn btn-sm btn-primary">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </RouterLink>
                    </td>
                    <dialog :id="`delete_category_${category.id}`" class="modal">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">Eliminar categoria {{ category.name }} con Id: "{{ category.id
                                }}"?
                            </h3>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn">Cancelar</button>
                                </form>
                                <form method="dialog">
                                    <button class="btn btn-primary"
                                        @click="() => pos.category.deleteCategory(category.id).then(refetch)">Eliminar</button>
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