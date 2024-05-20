<script setup>
import { PosSingleton } from '@/services/pos-service';
import { useRouter } from 'vue-router'
const router = useRouter()
PosSingleton.instance
    .auth.closeSession()
    .then(_ => router.push("/"))
</script>

<template></template>