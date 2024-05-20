<script setup>
import { useQuery } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import { PosSingleton } from '@/services/pos-service'
const pos = PosSingleton.instance
const { data, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: () => pos.product.getProducts(),
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
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Disponible desde</th>
                    <th>Disponible hasta</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in data">
                    <th>{{ product.id }}</th>
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>${{ product.price }}</td>
                    <td>{{ dayjs(product.available_from).format('DD MMMM YYYY') }}</td>
                    <td>{{ dayjs(product.available_until).format('DD MMMM YYYY') }}</td>
                    <td class="flex gap-2">
                        <button class="btn btn-sm btn-error" @click="showModal(`delete_product_${product.id}`)">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                        <RouterLink :to="`/admin/products/${product.id}/edit`">
                            <button class="btn btn-sm btn-primary">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </RouterLink>
                        <RouterLink :to="`/admin/products/${product.id}/categories`">
                            <button class="btn btn-sm btn-secondary">
                                <span class="material-symbols-outlined">
                                    add_link
                                </span>
                            </button>
                        </RouterLink>
                    </td>
                    <dialog :id="`delete_product_${product.id}`" class="modal">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">Eliminar categoria {{ product.name }} con Id: "{{ product.id
                                }}"?
                            </h3>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn">Cancelar</button>
                                </form>
                                <form method="dialog">
                                    <button class="btn btn-primary"
                                        @click="() => pos.product.deleteProduct(product.id).then(refetch)">Eliminar</button>
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