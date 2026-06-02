<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
    itemCount: number;
    pageSize: number;
    onPageChange?: (page: number) => void;
}>()

const currentPage = ref<number>(1);
const pageCount = ref<number>(1);

const updatePage = ((page: number) => {
    currentPage.value = Math.min(Math.max(page, 1), pageCount.value);

    if (props.onPageChange) {
        props.onPageChange(currentPage.value);
    }
})

const updatePageCount = () => {
    pageCount.value = Math.ceil(props.itemCount / props.pageSize);
}

watch(() => props.itemCount, () => {
    updatePageCount();
    currentPage.value = 1;
});
onMounted(updatePageCount)
</script>

<template lang="pug">
    label Страница {{ currentPage }}
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
