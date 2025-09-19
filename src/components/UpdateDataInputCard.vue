<script lang="ts" setup>
import { useFramework } from "@/composables/useFramework";
import { type Item } from "@/utils/frameworkLoader";
import { ref, computed, watch } from "vue";
import BaseSectionCard from "@/components/BaseSectionCard.vue";
import BaseTextInput from "./BaseTextInput.vue";
import BaseSelect from "./BaseSelect.vue";
import BaseTextarea from "./BaseTextarea.vue";

const emit = defineEmits<{
    itemSelected: [item: Item | undefined]
}>();

const framework = useFramework();
const selectedItem = ref<Item | undefined>();
const editableItem = ref<Item | null>();

const frameworkItems = computed(() => {
    return framework.data.value.items || [];
});

watch(selectedItem, (newItem) => {
    if (newItem) {
        editableItem.value = JSON.parse(JSON.stringify(newItem));
        emit('itemSelected', newItem);
    } else {
        editableItem.value = null;
    }
});


function addExtension() {
    if (editableItem.value) {
        const extentionCount = Object.keys(editableItem.value.extensions).length;
        const newKey = `extension_${extentionCount + 1}`;
        editableItem.value.extensions = {
            ...editableItem.value.extensions,
            [newKey]: ""
        };
    }
}

function removeExtension(key: string) {
    if (editableItem.value && key !== 'note') {
        const { [key]: removed, ...rest } = editableItem.value.extensions;
        editableItem.value.extensions = rest;
    }
}

function updateSelectedItemOnChange() {
    if (selectedItem.value) {
        const originalItem = framework.data.value.items.find(item => item.id === selectedItem.value?.id);
        editableItem.value = originalItem ? JSON.parse(JSON.stringify(originalItem)) : null;
        selectedItem.value = originalItem || undefined;
    } else {
        selectedItem.value = undefined;
        editableItem.value = null;
    }
}

function handleReset() {
    framework.reset();
    updateSelectedItemOnChange()
}

function saveChanges() {
    if (editableItem.value && selectedItem.value !== null) {
        const updatedFramework = { 
            ...framework.data.value,
            items: [...framework.data.value.items]
        };
        const updatedItemIndex = updatedFramework.items.findIndex(item => item.id === editableItem.value?.id);
        if (updatedItemIndex !== -1) {
            updatedFramework.items[updatedItemIndex] = { ...editableItem.value };
        }
        framework.updateFramework(updatedFramework);
        updateSelectedItemOnChange()
    }
}
</script>

<template>
    <BaseSectionCard title="Edit Framework Item">
        <BaseSelect
                v-model="selectedItem"
                :options="frameworkItems"
                optionLabel="name"
                label="Select Item to Edit"
            />
        <div class="flex flex-col mt-2 gap-4 h-full overflow-hidden">
            <div v-if="editableItem" class="card bg-base-300 p-4 flex flex-col gap-4 flex-grow overflow-hidden">
                <BaseTextInput
                        v-model="editableItem.name"
                        label="Name"
                    />
                <BaseTextInput
                    v-model="editableItem.type"
                    label="type"
                />
                <BaseTextarea
                    v-model="editableItem.description"
                    label="Description"
                />
                <div class="divider"></div>
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-bold text-accent">Extensions</h3>
                    <button
                        class="btn btn-sm btn-primary"
                        @click="addExtension"
                    >
                        Add Extension
                    </button>
                </div>
                <div class="flex flex-col gap-2 flex-grow overflow-auto">
                    <div
                        v-for="(_, extKey) in editableItem.extensions"
                        :key="extKey"
                        class="card bg-base-200 p-2 flex flex-row gap-2"
                    >
                        <div class="flex-grow">
                            <BaseTextInput
                                v-model="editableItem.extensions[extKey]"
                                :label="extKey.charAt(0).toUpperCase() + extKey.slice(1)"
                            />
                        </div>
                        <div class="flex items-center">
                            <button
                                :disabled="extKey === 'note'"
                                class="btn btn-xs btn-error"
                                @click="removeExtension(extKey)"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="flex justify-between">
                    <button 
                        class="btn btn-error btn-wide" 
                        @click="handleReset"
                    >
                        Reset Framework Data
                    </button>
                    <button 
                        class="btn btn-success btn-wide" 
                        @click="saveChanges"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
            <div v-else class="card bg-base-300 p-8 text-center">
                <p>Select an item from the dropdown above to start editing</p>
            </div>
        </div>
    </BaseSectionCard>
</template>