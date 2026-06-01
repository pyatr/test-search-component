<script setup lang="ts">
const props = defineProps<{
    label: string;
    placeholder?: string;
    onSearch?: (searchText: string) => void;
}>()

const onTextChange = (event: Event) => {
    const searchText = (event.target as HTMLInputElement).value;
    
    if (props.onSearch) {
        props.onSearch(searchText);
    }
}
</script>

<template lang="pug">
    div
        label {{ label }}
        input(type="text" :placeholder="placeholder || 'Поиск'" @change="onTextChange")
</template>

<style scoped>
label {
    display: block;
    margin-right: 32px;
    font-weight: bold;
}
</style>
