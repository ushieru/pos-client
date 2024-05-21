<script setup>
const toggleDrawer = () => document.getElementById('my-drawer').click()
</script>

<template>
    <div class="h-full drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content h-screen flex flex-col">
            <div class="navbar flex lg:hidden bg-base-100">
                <div class="flex-none">
                    <label for="my-drawer" aria-label="open sidebar"
                        class="btn btn-square btn-ghost grid place-content-center material-symbols-outlined">
                        menu
                    </label>
                </div>
                <div class="flex-1">
                    <a class="text-xl">POS</a>
                </div>
            </div>
            <div class="grow flex flex-col p-1 sm:p-5">
                <RouterView></RouterView>
            </div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-[200px] min-h-full bg-base-200 text-base-content">
                <div class="h-[150px] grid place-items-center">
                    <img src="/favicon.svg" class="w-[100px]" alt="favicon" />
                </div>
                <li @click="toggleDrawer">
                    <RouterLink to="/waiter" class="font-semibold grid place-content-center h-12 w-full"
                        :exact-active-class="'bg-gray-200/10 rounded-lg'">
                        Mesas
                    </RouterLink>
                </li>
                <div class="divider"></div>
                <li>
                    <RouterLink to="/logout" class="font-semibold grid place-content-center h-12">
                        Cerrar Sesion
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>