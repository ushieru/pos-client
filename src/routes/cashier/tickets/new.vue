<script setup>
import { useRouter } from 'vue-router'
import { PosSingleton } from '@/services/pos-service'
const pos = PosSingleton.instance
const router = useRouter()
pos.ticket.createTicket().then(response => {
    if (response.code) return console.error(response)
    router.push(`/cashier/tickets/${response.id}`);
})
</script>

<template></template>