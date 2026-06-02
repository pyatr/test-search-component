<script setup lang="ts">

const props = defineProps<{
    material: string;
    shape: string;
    color: string;
}>()
</script>

<template lang="pug">
    ul
        li {{ material }},
        li {{ shape }},
        li {{ color }}        
</template>

<style scoped>
ul {
    list-style: none;
    display: flex;
    gap: 4px;
    border: 1px solid grey;
    height: 24px;
}

li {
    font-size: 12px;
}
</style>
