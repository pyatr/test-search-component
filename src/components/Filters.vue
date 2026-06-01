<script setup lang="ts">
import Dropdown from './Filters/Dropdown.vue'
import SearchBar from './Filters/SearchBar.vue'
import Pagination from './Filters/Pagination.vue'

const options1 = [
    { text: 'Option 11', value: 'option11' },
    { text: 'Option 12', value: 'option12' },
    { text: 'Option 13', value: 'option13' }
];
const options2 = [
    { text: 'Option 21', value: 'option21' },
    { text: 'Option 22', value: 'option22' },
    { text: 'Option 23', value: 'option23' }
];
const options3 = [
    { text: 'Option 31', value: 'option31' },
    { text: 'Option 32', value: 'option32' },
    { text: 'Option 33', value: 'option33' }
];

const onSearch = (searchText: string) => {
    console.log(`Searching for ${searchText}`)
}

const onFilterChange = (filterName: string, filterValue: string) => {
    console.log(`Filter changed for ${filterName}: ${filterValue}`)
}

const onPageChange = (page: number) => {
    console.log(`Page changed to ${page}`)
}

</script>

<template lang="pug">
    div.container
        SearchBar(:label="'Поиск'", :placeholder="'Введите текст для поиска'", :onSearch="onSearch")
    
        div.filters
          Dropdown(:label="'Filter 1'", :options="options1", :onChange="onFilterChange")
          Dropdown(:label="'Filter 2'", :options="options2", :onChange="onFilterChange")
          Dropdown(:label="'Filter 3'", :options="options3", :onChange="onFilterChange")
        
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
</style>
