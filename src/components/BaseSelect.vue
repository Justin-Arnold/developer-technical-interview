<script lang="ts" setup generic="T,K extends keyof T = never">

const props = defineProps<{
    label: string
    options: T[]
    optionLabel: keyof T;
    optionValue?: K;
}>();

const selectedOption = defineModel<[K] extends [never] ? T : T[K]>();

const getValue = (option: T) => {
    if (props.optionValue) {
        return option[props.optionValue];
    }
    return option;
};

function getLabel(option: T) {
    return option[props.optionLabel]
}
</script>

<template>
    <label class="floating-label">
        <select 
            v-model="selectedOption"
            :aria-label="label"
            class="select select-secondary select-lg w-full"
            :placeholder="label"
        >
            <option
                v-for="option in options"
                :key="String(getValue(option))"
                :value="getValue(option)"
            >
                {{ getLabel(option) }}
            </option>
        </select>
        <span>{{ label }}</span>
    </label>
</template>