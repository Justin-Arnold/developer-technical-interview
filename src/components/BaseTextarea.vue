<script lang="ts" setup>
defineProps<{
    label: string
}>();

const modelValue = defineModel<string>();
</script>

<template>
    <label class="floating-label">
        <textarea
            v-model="modelValue"
            :placeholder="label"
            class="textarea textarea-secondary w-full"
        />
        <span>{{ label }}</span>
    </label>
</template>