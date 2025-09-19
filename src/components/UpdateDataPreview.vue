<script lang="ts" setup>
import BaseSectionCard from "@/components/BaseSectionCard.vue";
import { useFramework } from "@/composables/useFramework";
import { computed, ref, watch } from "vue";
import { type Item } from "@/utils/frameworkLoader";

const props = defineProps<{
    activeItem?: Item
}>();

const framework = useFramework();

const frameworkBody = computed(() => {
    const { name, items, ...body } = framework.data.value;
    return body;
});

const frameworkItems = computed(() => {
    return framework.data.value.items || [];
});

const itemRefs = ref<Record<string, HTMLElement>>({});

const setItemRef = (el: HTMLElement | null, itemId: string) => {
    if (el) {
        itemRefs.value[`item_${itemId}`] = el;
    }
};

watch(() => props.activeItem, (newItem) => {
    if (newItem) {
        const itemRef = itemRefs.value[`item_${newItem.id}`];
        if (itemRef) {
            itemRef.scrollIntoView({ behavior: 'smooth'});
        }
    }
});
</script>

<template>
    <BaseSectionCard :title="framework.data.value.name" :subtitle="framework.lastUpdateTimestamp ? `Last Updated: ${new Date(framework.lastUpdateTimestamp.value).toLocaleString()}` : ''">
        <div
            v-for="(bodyValue, bodyKey) in frameworkBody"
            :key="bodyKey"
            class="card bg-base-300 p-4 flex"
        >
            <div class="text-accent font-semibold">
                {{ bodyKey.charAt(0).toUpperCase() + bodyKey.slice(1) }}:
            </div>
            <div>
                {{ bodyValue }}
            </div>
        </div>
        <div class="divider" v-if="frameworkItems.length > 0" />
        <h2 class="text-xl font-bold" v-if="frameworkItems.length > 0">
            Items
        </h2>
        <div
            class="overflow-y-auto flex flex-col gap-4"
            v-if="frameworkItems.length > 0"
        >
            <div
                v-for="(item, index) in frameworkItems"
                :ref="(el) => setItemRef(el as HTMLElement, item.id)"
                :key="index"
                class="card bg-base-300 p-4 flex flex-col gap-4"
                :class="{ 'border-4 border-warning': activeItem && activeItem.id === item.id }"
            >
                <div v-for="(itemValue, itemKey) in item" :key="itemKey">
                    <div class="text-accent font-semibold w-fit">
                        {{ itemKey.charAt(0).toUpperCase() + itemKey.slice(1) }}:
                    </div>
                    <div v-if="itemKey === 'extensions'">
                        <div
                            v-for="(extention, extKey) in itemValue"
                            :key="extKey"
                            class="card bg-base-200 p-2 flex gap-2 my-2"
                        >
                            <div class="text-accent font-semibold">
                                {{ extKey.charAt(0).toUpperCase() + extKey.slice(1) }}:
                            </div>
                            <div>
                                {{ extention }}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        {{ itemValue }}
                    </div>
                </div>
            </div>
        </div>
    </BaseSectionCard>
</template>
