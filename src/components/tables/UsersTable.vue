<script setup>
import { useQuery } from '@tanstack/vue-query'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast';
const pos = PosSingleton.instance
const { data, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => pos.user.getUsers(),
    initialData: [],
    refetchInterval: 5000,
})
const session = pos.auth.session
const toggleState = (user) => {
    pos.user.updateUser({
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.account.username,
        account_type: user.account.account_type,
        is_active: !user.account.is_active
    }).then(user => {
        if (!user.account.is_active)
            toast(`Cuenta '${user.email}' activada`)
        else
            toast(`Cuenta '${user.email}' desactivada`)
        refetch()
    }).catch(error => toast(error.message, 'error'))
}
const deleteUser = (user) => {
    pos.user.deleteUser(user.id)
        .then(refetch)
        .catch(error => toast(error.message, 'error'))
}
const showModal = (id) => document.getElementById(id).showModal()
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr class="border-neutral border-b-2">
                    <th>id</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in data" class="border-neutral">
                    <th>{{ user.id }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.account?.username }}</td>
                    <td>{{ user.account?.account_type }}</td>
                    <td>
                        <input @click.prevent="toggleState(user)" type="checkbox" class="toggle toggle-success"
                            :checked="user.account.is_active" :disabled="user.id == session.user.id">
                    </td>
                    <td class="flex gap-2">
                        <button class="btn btn-sm btn-error" @click="showModal(`delete_user_${user.id}`)"
                            :disabled="user.id == session.user.id">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                        <RouterLink :to="`/admin/users/${user.id}/edit`">
                            <button class="btn btn-sm btn-primary">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </RouterLink>
                    </td>
                    <dialog :id="`delete_user_${user.id}`" class="modal">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">
                                Eliminar usuario: {{ user.name }}, con Id: "{{ user.id }}"?
                            </h3>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn">Cancelar</button>
                                </form>
                                <form method="dialog">
                                    <button class="btn btn-primary" @click="deleteUser(user)">Eliminar</button>
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