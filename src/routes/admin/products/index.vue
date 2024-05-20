<script setup>
import ProductTable from '@/components/tables/ProductTable.vue'
</script>

<template>
    <div class="card bg-base-200 shadow-xl mb-5">
        <div class="card-body">
            <RouterLink to="products/new" class="w-40">
                <button class="btn btn-primary w-40">
                    Nuevo Producto
                </button>
            </RouterLink>
        </div>
    </div>
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <ProductTable />
        </div>
    </div>
</template>