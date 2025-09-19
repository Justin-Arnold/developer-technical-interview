<script lang="ts" setup>
type InputType = 'text' | 'password' | 'email' | 'url' | 'number';

withDefaults(defineProps<{
    label: string
    type?: InputType
}>(), {
    type: 'text',
});

const modelValue = defineModel<string>();
</script>

<template>
    <label class="floating-label">
        <input 
            v-model="modelValue"
            :type="type"
            :placeholder="label"
            class="input input-secondary w-full"
        />
        <span>{{ label }}</span>
    </label>
</template>