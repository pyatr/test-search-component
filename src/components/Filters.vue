<script setup lang="ts">
import Dropdown, { type FilterDropdownOption } from './Filters/Dropdown.vue'
import SearchBar from './Filters/SearchBar.vue'
import Pagination from './Filters/Pagination.vue'
import ListItem from './ListItem.vue'
import { getItems, type Item } from '@/mock-api.ts';
import { onMounted, ref, watch } from 'vue';
import { colorOptions, materialOptions, shapeOptions } from "../mock-api.ts";

const filteredItems = ref<Item[]>();
const chosenMaterial = ref<string | undefined>();
const chosenShape = ref<string | undefined>();
const chosenColor = ref<string | undefined>();

const loadDropdownFromSearchParams = (paramName: string, options: FilterDropdownOption[]): string | undefined => {
    let urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has(paramName) && options.map((option) => option.value).includes(urlParams.get(paramName) as string)) {
        return urlParams.get(paramName) as string;
    }

    return undefined;
}

chosenMaterial.value = loadDropdownFromSearchParams('material', materialOptions);
chosenShape.value = loadDropdownFromSearchParams('shape', shapeOptions);
chosenColor.value = loadDropdownFromSearchParams('color', colorOptions);

const onSearch = (searchText: string) => {
    console.log(`Searching for ${searchText}`)
}

const onMaterialChange = async (filterType: string, filterValue: string) => {
    chosenMaterial.value = filterValue;
    filteredItems.value = await getItems(chosenMaterial.value, chosenShape.value, chosenColor.value);
}

const onShapeChange = async (filterType: string, filterValue: string) => {
    chosenShape.value = filterValue;
    filteredItems.value = await getItems(chosenMaterial.value, chosenShape.value, chosenColor.value);
}

const onColorChange = async (filterType: string, filterValue: string) => {
    chosenColor.value = filterValue;
    filteredItems.value = await getItems(chosenMaterial.value, chosenShape.value, chosenColor.value);
}

watch(filteredItems, (filteredItems) => console.log(filteredItems))

const onPageChange = (page: number) => {
    console.log(`Page changed to ${page}`)
}

onMounted(async () => {
    filteredItems.value = await getItems(chosenMaterial.value, chosenShape.value, chosenColor.value);
})

</script>

<template lang="pug">
    div.container
        SearchBar(:label="'Поиск'", :placeholder="'Введите текст для поиска'", :onSearch="onSearch")

        div.filters
            Dropdown(:label="'Материал'", :type="'material'", :startValue="chosenMaterial", :options="materialOptions", :onChange="onMaterialChange")
            Dropdown(:label="'Форма'", :type="'shape'", :startValue="chosenShape", :options="shapeOptions", :onChange="onShapeChange")
            Dropdown(:label="'Цвет'", :type="'color'", :startValue="chosenColor", :options="colorOptions", :onChange="onColorChange")

        div.items
            ListItem(v-for="item in filteredItems", :material="item.material", :shape="item.shape", :color="item.color")
        Pagination(:pageSize="10", :pageCount="5", :onPageChange="onPageChange")
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
}
</style>
