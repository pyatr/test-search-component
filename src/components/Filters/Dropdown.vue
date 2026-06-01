<script setup lang="ts">
import { onMounted, ref } from 'vue';

export type FilterDropdownOption = {
    text: string;
    value: string;
}

const props = defineProps<{
    label: string;
    type: string;
    startValue: string | undefined;
    options: FilterDropdownOption[];
    onChange?: (filterType: string, filterValue: string | undefined) => void;
}>()

const value = ref<string | undefined>(props.startValue);

const onChange = (event: Event) => {
    if (props.onChange) {
        props.onChange(props.type, value.value);
    }
}

onMounted(() => {
    console.log(`Value of ${props.type} is ${value.value} or ${props.startValue}`);
})
</script>

<template lang="pug">
    div
        label {{ label }}
        select(v-model="value" @change="onChange")
            option(:key="'None'", :value="undefined")
            option(v-for="option in options" :key="option.value" :value="option.value") {{ option.text }}
</template>

<style scoped>
label {
    display: block;
    margin-right: 32px;
    font-weight: bold;
}
</style>
