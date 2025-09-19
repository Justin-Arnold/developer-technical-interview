import { ref } from 'vue'
import { loadFramework, saveFramework, resetFramework } from '@/utils/frameworkLoader'
import type { Framework } from '@/utils/frameworkLoader'
import { sanitize } from '@/utils/htmlSanitizer'

const initialFrameworkState = loadFramework()
const framework = ref(initialFrameworkState)
const lastUpdateTimestamp = ref(new Date())

export function useFramework() {
    function  updateFramework(updatedData: Framework) {
        Object.keys(updatedData).forEach((key) => {
            const typedKey = key as keyof Framework
            const keyIsItems = typedKey === 'items'
            const valueOfKey = updatedData[typedKey]
            const valueIsString = typeof valueOfKey === 'string'
            if (!keyIsItems && valueIsString) {
                framework.value[typedKey] = sanitize(valueOfKey as string)
            } else if (keyIsItems && Array.isArray(valueOfKey)) {
                const sanitizedItems = handleItemsSanitization(valueOfKey)
                framework.value.items = sanitizedItems
            }
            saveFramework(framework.value)
            lastUpdateTimestamp.value = new Date()
        })
    }

    function handleItemsSanitization(items: Framework['items']) {
        return items.map((item) => {
            const sanitizedItem = { ...item }
            for (const [key, value] of Object.entries(sanitizedItem)) {
                if (key === 'extensions') {
                    const itemIndex = framework.value.items.findIndex(i => i.id === item.id)
                    sanitizedItem.extensions = sanitizeextensions(itemIndex, value as Framework['items'][number]['extensions'])
                } else if (typeof value === 'string') {
                    const typedKey = key as keyof Framework['items'][number]
                    (sanitizedItem[typedKey] as string) = sanitize(value)
                }
            }
            return sanitizedItem
        })
    }

    function sanitizeextensions(itemIndex: number, extensions: Framework['items'][number]['extensions']): Record<string, string> {
    if (!extensions || typeof extensions !== 'object') {
        return {}
    }
    const sanitized: Record<string, string> = {}
    for (const [key, value] of Object.entries(extensions)) {
        if (typeof value === 'string' && key !== 'note') {
            sanitized[key] = sanitize(value)
        } else if (key === 'note' && value !== framework.value.items[itemIndex]?.extensions?.['note']) {
            return { note: value }
        } else {
            sanitized[key] = value
        }
    }
    return sanitized
}

    function reset() {
        framework.value = resetFramework()
        saveFramework(framework.value)
        lastUpdateTimestamp.value = new Date()
    }

    return {
        data: framework,
        lastUpdateTimestamp,
        updateFramework,
        reset,
    }
}

