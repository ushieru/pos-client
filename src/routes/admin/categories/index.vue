<script setup>
import CategoriesTable from '@/components/tables/CategoriesTable.vue'
</script>

<template>
    <div class="card bg-base-200 shadow-xl mb-5">
        <div class="card-body">
            <RouterLink to="categories/new" class="w-40">
                <button class="btn btn-primary w-40">
                    Nueva Categoria
                </button>
            </RouterLink>
        </div>
    </div>
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <CategoriesTable />
        </div>
    </div>
</template>