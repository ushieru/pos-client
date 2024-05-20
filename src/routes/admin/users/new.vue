<script setup>
import { useRouter } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast'
const pos = PosSingleton.instance

const router = useRouter()

const onSubmitCreateUser = (e) => {
    const name = e.target.name.value
    const email = e.target.email.value
    const username = e.target.username.value
    const accountType = e.target.role.value
    const password = e.target.password.value
    const confirmPassword = e.target.confirm_password.value
    if (password != confirmPassword) {
        return toast('Las contraseñas no coinciden', 'error')
    }
    pos.user.createUser(name, email, username, accountType, password)
        .then(user => {
            e.target.reset()
            toast('Usuario creado con exito', 'success')
            router.push("/admin/users")
        })
}
</script>

<template>
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
            <h1 class="text-2xl">Nuevo Usuario</h1>
            <form @submit.prevent="onSubmitCreateUser" class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Nombre</span>
                    </div>
                    <input type="text" name="name" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Usuario</span>
                    </div>
                    <input type="text" name="username" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input type="email" name="email" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Rol</span>
                    </div>
                    <select class="select w-full" name="role">
                        <option value="admin">Administrador</option>
                        <option value="cashier">Cajero</option>
                        <option value="waiter">Mesero</option>
                    </select>
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Contraseña</span>
                    </div>
                    <input type="password" name="password" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Confirmar contraseña</span>
                    </div>
                    <input type="password" name="confirm_password" class="input input-bordered w-full" />
                </label>
                <div class="lg:col-span-2 lg:grid lg:justify-end mt-3">
                    <button class="w-full btn btn-primary lg:w-60">Crear</button>
                </div>
            </form>
        </div>
    </div>
</template>