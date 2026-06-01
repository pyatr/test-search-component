<script setup lang="ts">
import { ref } from 'vue';

export type FilterDropdownOption = {
	text: string;
	value: string;
}

const props = defineProps<{
	label: string;
	options: FilterDropdownOption[];
    onChange?: (filterName: string, filterValue: string) => void;
}>()

const value = ref<string>('');

const onChange = (event: Event) => {
    if (props.onChange) {
        props.onChange(props.label, value.value);
    }
}
</script>

<template lang="pug">
    div
        label {{ label }}
        select(v-model="value" @change="onChange")
            option(v-for="option in options" :key="option.value" :value="option.value") {{ option.text }}
</template>

<style scoped>
label {
  display: block;
  margin-right: 32px;
  font-weight: bold;
}
</style>
