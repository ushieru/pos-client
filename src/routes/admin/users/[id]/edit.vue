<script setup>
import { useQuery } from '@tanstack/vue-query'
import { useRouter, useRoute } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast'
import { watch } from 'vue';
const pos = PosSingleton.instance

const router = useRouter()
const route = useRoute()
const { id: userId } = route.params

const { data: user, isLoading, error } = useQuery({
    queryKey: ['user-' + userId],
    queryFn: () => pos.user.getUser(userId),
    retry: false,
    initialData: null
})

watch(error, () => {
    toast(error.value.message, 'error')
    router.push("/admin/users")
})

const onSubmitUpdateUser = (e) => {
    const name = e.target.name.value
    const email = e.target.email.value
    const username = e.target.username.value
    const accountType = e.target.role.value
    const isActive = e.target.is_active.checked
    pos.user.updateUser({
        id: userId,
        name,
        email,
        username,
        account_type: accountType,
        is_active: isActive
    })
        .then(_ => {
            e.target.reset()
            toast('Usuario actualizado con exito', 'success')
            router.push("/admin/users")
        })
        .catch(error => toast(error.message, 'error'))
}
</script>

<template>
    <div v-if="isLoading" class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <span class="loading loading-dots loading-lg m-auto"></span>
        </div>
    </div>
    <div v-if="user" class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <h1 class="text-2xl">Edit Usuario</h1>
            <form @submit.prevent="onSubmitUpdateUser" class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Nombre</span>
                    </div>
                    <input :value="user.name" type="text" name="name" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Usuario</span>
                    </div>
                    <input :value="user.account.username" type="text" name="username"
                        class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input :value="user.email" type="email" name="email" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Rol</span>
                    </div>
                    <select class="select w-full" name="role">
                        <option :selected="user.account.account_type == 'admin'" value="admin">Administrador</option>
                        <option :selected="user.account.account_type == 'cashier'" value="cashier">Cajero</option>
                        <option :selected="user.account.account_type == 'waiter'" value="waiter">Mesero</option>
                        <option :selected="user.account.account_type == 'producer'" value="waiter">Productor</option>
                    </select>
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Estado</span>
                    </div>
                    <input name="is_active" type="checkbox" class="toggle toggle-success"
                        :checked="user.account.is_active">
                </label>
                <div class="lg:col-span-2 lg:grid lg:justify-end mt-3">
                    <button class="w-full btn btn-primary lg:w-60">Actualizar</button>
                </div>
            </form>
        </div>
    </div>
</template>