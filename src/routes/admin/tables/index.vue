<script setup>
import { ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query'
import useResize from '@/hooks/useResize'
import { orderTables } from '@/utils/tableUtils';
import { PosSingleton } from '@/services/pos-service'
const pos = PosSingleton.instance
const showDeleteTableZone = ref(false)
const { screenWidth } = useResize()
const { data, refetch } = useQuery({
    queryKey: ['tables'],
    queryFn: () => pos.table.getTables(),
    initialData: [],
    refetchInterval: 5000
})
const onSubmitCreateTable = (e) => {
    const name = e.target.name.value
    pos.table.createTable(name).then(response => {
        if (response.code) return console.error(response)
        refetch()
        e.target.reset()
    })
}
const onDrag = (e, table) => {
    showDeleteTableZone.value = true
    e.dataTransfer.setData("table", JSON.stringify(table))
}
const onDragEnd = () => showDeleteTableZone.value = false
const onDrop = (e, x, y) => {
    const payload = e.dataTransfer.getData("table")
    const table = JSON.parse(payload)
    pos.table.updateTable(table.id, { name: table.name, pos_x: x, pos_y: y })
        .then(_ => refetch())
}
const onDropDelete = (e) => {
    const payload = e.dataTransfer.getData("table")
    const table = JSON.parse(payload)
    pos.table.deleteTable(table.id).then(_ => refetch())
}
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="card bg-base-200 shadow-xl">
            <div class="card-body sm:flex-row sm:justify-between">
                <form @submit.prevent="onSubmitCreateTable" class="flex-col sm:flex-row flex gap-2">
                    <input type="text" name="name" class="input input-bordered" placeholder="Nombre">
                    <button class="w-full btn btn-primary sm:w-40">
                        Nueva Mesa
                    </button>
                </form>
                <div v-if="showDeleteTableZone" @drop="onDropDelete" @dragover.prevent @dragenter.prevent
                    className="flex flex-row gap-2 justify-center items-center border border-dashed bg-red-500 px-2 py-1 text-black">
                    <span class="material-symbols-outlined">
                        delete
                    </span> Suelte aqui para eliminar
                </div>
            </div>
        </div>
        <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
                <div v-if="screenWidth <= 640" class="grid gap-1 grid-cols-5">
                    <template v-for="table in orderTables(data, true)">
                        <div v-if="!table" class="aspect-square bg-gray-600"></div>
                        <div v-else class="aspect-square bg-primary grid place-items-center cursor-grab">
                            {{ table.name }}
                        </div>
                    </template>
                </div>
                <div v-if="screenWidth > 640" class="grid gap-1 grid-cols-10">
                    <template v-for="(table, i) in orderTables(data)">
                        <div v-if="!table" @drop="onDrop($event, (i % 10) + 1, Math.floor(i / 10) + 1)"
                            @dragover.prevent @dragenter.prevent class="aspect-square bg-gray-600"></div>
                        <div v-else draggable="true" @dragstart="onDrag($event, table)" @dragend="onDragEnd"
                            class="aspect-square bg-primary grid place-items-center cursor-grab">
                            {{ table.name }}
                        </div>

                    </template>
                </div>
            </div>
        </div>
    </div>
</template>