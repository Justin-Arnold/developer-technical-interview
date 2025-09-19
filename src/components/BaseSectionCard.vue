<script lang="ts" setup>
defineProps<{
    title: string
    subtitle?: string
}>();
</script>

<template>
    <div class="card bg-base-200 h-full w-full overflow-hidden">
        <div class="card-body flex flex-col h-full">
            <div>
                <h2 class="text-3xl font-bold">
                    {{ title }}
                </h2>
                <p v-if="subtitle" class="text-lg text-base-content/70">
                    {{ subtitle }}
                </p>
                <div class="divider" />
            </div>
            <slot />
        </div>
    </div>
</template>