<script setup lang="ts">
import Dropdown, { type FilterDropdownOption } from './Filters/Dropdown.vue'
import Pagination from './Filters/Pagination.vue'
import ListItem from './ListItem.vue'
import { getItems, type Item } from '@/mock-api.ts';
import { onMounted, ref, watch } from 'vue';
import { colorOptions, materialOptions, shapeOptions } from "../mock-api.ts";

const filteredItems = ref<Item[]>([]);
const totalFilteredItemsCount = ref<number>(0);
const chosenMaterial = ref<string | undefined>();
const chosenShape = ref<string | undefined>();
const chosenColor = ref<string | undefined>();
const currentPage = ref<number>(1);
const pageSize = 10;

const onMaterialChange = async (filterType: string, filterValue: string) => {
    currentPage.value = 1;
    chosenMaterial.value = filterValue;
}

const onShapeChange = async (filterType: string, filterValue: string) => {
    currentPage.value = 1;
    chosenShape.value = filterValue;
}

const onColorChange = (filterType: string, filterValue: string) => {
    currentPage.value = 1;
    chosenColor.value = filterValue;
}

const onPageChange = (page: number) => {
    currentPage.value = page;
    refreshItemsList();
}

const refreshItemsList = async () => {
    const items = await getItems(chosenMaterial.value, chosenShape.value, chosenColor.value);
    totalFilteredItemsCount.value = items.length;
    const offset = (currentPage.value - 1) * pageSize;
    filteredItems.value = items.slice(offset, pageSize + offset);
}

watch(chosenMaterial, refreshItemsList)
watch(chosenShape, refreshItemsList)
watch(chosenColor, refreshItemsList)
onMounted(() => {
    if (!chosenMaterial.value && !chosenShape.value && !chosenColor.value) {
        refreshItemsList();
    }
})
</script>

<template lang="pug">
    div.container
        div.filters
            Dropdown(:label="'Материал'", :type="'material'", :options="materialOptions", :onChange="onMaterialChange")
            Dropdown(:label="'Форма'", :type="'shape'", :options="shapeOptions", :onChange="onShapeChange")
            Dropdown(:label="'Цвет'", :type="'color'", :options="colorOptions", :onChange="onColorChange")

        div.items
            ListItem(v-for="item in filteredItems", :material="item.material", :shape="item.shape", :color="item.color")

        Pagination(:itemCount="totalFilteredItemsCount", :pageSize="pageSize", :onPageChange="onPageChange")
</template>

<style scoped>
.container {
    display: grid;
    gap: 16px;
    grid-template-rows: auto;
}

.filters {
    display: flex;
    gap: 16px;
}

.items {
    display: grid;
    gap: 4px;
    align-content: start;
    min-height: 320px;
}
</style>
