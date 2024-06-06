<script setup>
import ProductionCentersTable from '@/components/tables/ProductionCentersTable.vue'
</script>

<template>
    <div class="card bg-base-200 shadow-xl mb-5">
        <div class="card-body">
            <RouterLink to="production-centers/new" class="w-40">
                <button class="btn btn-primary w-40">
                    Nuevo centro de producción
                </button>
            </RouterLink>
        </div>
    </div>
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <ProductionCentersTable />
        </div>
    </div>
</template>