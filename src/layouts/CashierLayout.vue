<template>
    <div class="flex">
        <aside class="h-screen w-[150px] flex flex-col gap-1 overflow-auto">
            <div class="h-[150px] grid place-items-center">
                <img src="/favicon.svg" class="w-[100px]" alt="favicon" />
            </div>
            <RouterLink to="/cashier" :exact-active-class="'bg-gray-200/10 rounded-lg'">
                <button class="btn btn-ghost w-full">Mesas</button>
            </RouterLink>
            <RouterLink to="/cashier/new" :exact-active-class="'bg-gray-200/10 rounded-lg'">
                <button class="btn btn-ghost w-full">Venta Rapida</button>
            </RouterLink>
            <RouterLink to="/cashier/tickets" :exact-active-class="'bg-gray-200/10 rounded-lg'">
                <button class="btn btn-ghost w-full">Tickets Abiertos</button>
            </RouterLink>
            <div class="divider"></div>
            <RouterLink to="/logout">
                <button class="btn btn-ghost w-full">Cerrar Sesion</button>
            </RouterLink>
        </aside>
        <div class="divider divider-horizontal m-0 w-1"></div>
        <div class="h-screen overflow-auto p-5 flex-grow">
            <RouterView></RouterView>
        </div>
    </div>
</template>