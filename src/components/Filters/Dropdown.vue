<script setup lang="ts">
import { onMounted, ref } from 'vue';

export type FilterDropdownOption = {
    text: string;
    value: string;
}

const props = defineProps<{
    label: string;
    type: string;
    options: FilterDropdownOption[];
    onChange?: (filterType: string, filterValue: string | undefined) => void;
}>()

const loadDropdownFromSearchParams = (): string | undefined => {
    let urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has(props.type) && props.options.map((option) => option.value).includes(urlParams.get(props.type) as string)) {
        return urlParams.get(props.type) as string;
    }

    return undefined;
}

const onChange = (event: Event) => {
    const url = new URL(window.location.href);

    if (currentValue.value) {
        url.searchParams.set(props.type, currentValue.value as string);
    } else {
        url.searchParams.delete(props.type)
    }

    window.history.pushState({}, '', url.toString());

    if (props.onChange) {
        props.onChange(props.type, currentValue.value);
    }
}

const currentValue = ref<string | undefined>();

onMounted(() => {
    currentValue.value = loadDropdownFromSearchParams();

    if (props.onChange) {
        props.onChange(props.type, currentValue.value);
    }
})
</script>

<template lang="pug">
    div
        label {{ label }}
        select(v-model="currentValue" @change="onChange")
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
