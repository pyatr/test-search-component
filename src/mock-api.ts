import type { FilterDropdownOption } from "./components/Filters/Dropdown.vue";

export const materialOptions: FilterDropdownOption[] = [
    { text: 'Дерево', value: 'wood' },
    { text: 'Сталь', value: 'steel' },
    { text: 'Пластик', value: 'plastic' }
];

export const shapeOptions: FilterDropdownOption[] = [
    { text: 'Сфера', value: 'sphere' },
    { text: 'Конус', value: 'cone' },
    { text: 'Куб', value: 'cube' }
];

export const colorOptions: FilterDropdownOption[] = [
    { text: 'Зеленый', value: 'green' },
    { text: 'Серый', value: 'grey' },
    { text: 'Циановый', value: 'cyan' }
];

export type Item = {
    option1: string;
    option2: string;
    option3: string;
}

const options: Item[] = [];

export async function getItems(): Promise<Item[]> {
    if (!options.length) {
        const optionVariants1 = materialOptions.map(option => option.value);
        const optionVariants2 = shapeOptions.map(option => option.value);
        const optionVariants3 = colorOptions.map(option => option.value);

        for (let i = 1; i <= 100; i++) {
            options.push({
                option1: optionVariants1[Math.floor(Math.random() * optionVariants1.length)] as string,
                option2: optionVariants2[Math.floor(Math.random() * optionVariants2.length)] as string,
                option3: optionVariants3[Math.floor(Math.random() * optionVariants3.length)] as string,
            });
        }
    }

    return Promise.resolve(options);
}
