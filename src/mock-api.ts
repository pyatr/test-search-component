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
    material: string;
    shape: string;
    color: string;
}

const options: Item[] = [];

export async function getItems(material: string | undefined, shape: string | undefined, color: string | undefined): Promise<Item[]> {
    if (!options.length) {
        const optionVariants1 = materialOptions.map(option => option.value);
        const optionVariants2 = shapeOptions.map(option => option.value);
        const optionVariants3 = colorOptions.map(option => option.value);

        for (let i = 1; i <= 100; i++) {
            options.push({
                material: optionVariants1[Math.floor(Math.random() * optionVariants1.length)] as string,
                shape: optionVariants2[Math.floor(Math.random() * optionVariants2.length)] as string,
                color: optionVariants3[Math.floor(Math.random() * optionVariants3.length)] as string,
            });
        }
    }

    return Promise.resolve(options.filter((option) =>
        material != undefined && option.material === material ||
        shape != undefined && option.shape === shape ||
        color != undefined && option.color === color ||
        color === undefined && material === undefined && shape === undefined
    ));
}
