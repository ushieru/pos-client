<script setup>
import { useRouter } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
import { toast } from '@/utils/Toast';

const router = useRouter()

const onLoginSubmit = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    const pos = PosSingleton.instance
    pos.auth.login(username, password)
        .then(session => {
            toast(`Bienvenido ${username}`)
            if (session.user.account.account_type == 'admin') return router.push("/admin");
            if (session.user.account.account_type == 'cashier') return router.push("/cashier");
            if (session.user.account.account_type == 'waiter') return router.push("/waiter");
            if (session.user.account.account_type == 'cook') return router.push("/cook");
        }).catch(error => {
            toast(error.message, 'error')
        })
}
</script>

<template>
    <div class="grid place-items-center h-full">
        <div class="card w-96 bg-neutral text-neutral-content">
            <div class="flex justify-end m-2">
                <RouterLink to="/config">
                    <button class="btn btn-sm btn-primary">
                        <span class="material-symbols-outlined">
                            settings
                        </span>
                    </button>
                </RouterLink>
            </div>
            <div class="card-body items-center text-center">
                <img src="/favicon.svg" class="w-[110px] mb-7" alt="favicon" />
                <form @submit="onLoginSubmit" class="flex flex-col gap-1">
                    <input id="username" name="username" type="text" placeholder="Nombre de Usuario"
                        class="input input-bordered w-full" />
                    <input id="password" name="password" type="password" placeholder="Contraseña"
                        class="input input-bordered w-full" />
                    <div class="card-actions w-full">
                        <button class="btn btn-primary w-full mt-1">Iniciar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>