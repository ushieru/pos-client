<script setup>
import UsersTable from '@/components/tables/UsersTable.vue'
</script>

<template>
    <div class="card bg-base-200 shadow-xl mb-5">
        <div class="card-body">
            <RouterLink to="users/new" class="w-40">
                <button class="btn btn-primary w-40">
                    Nuevo Usuario
                </button>
            </RouterLink>
        </div>
    </div>
    <div class="flex flex-col gap-5">
        <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
                <UsersTable />
            </div>
        </div>
    </div>
</template>