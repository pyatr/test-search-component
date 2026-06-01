<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    pageCount: number | 1;
    pageSize: number | 10;
    onPageChange?: (page: number) => void;
}>()

const currentPage = ref<number>(1);

const updatePage = ((page: number) => {
    currentPage.value = Math.min(Math.max(page + 1, 1), props.pageCount - 1);

    if (props.onPageChange) {
        props.onPageChange(page);
    }
})

</script>

<template lang="pug">
    div.button-row
        button(@click="() => updatePage(currentPage - 1)") <<<
        button(v-for="page in pageCount" :key="page" @click="() => updatePage(page)") {{ page }}
        button(@click="() => updatePage(currentPage + 1)") >>>
</template>

<style scoped>
.button-row {
    display: flex;
    gap: 4px;
}
</style>
