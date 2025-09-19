import jsonData from '../data/arizona-framework.json'

export interface Framework {
    id: string;
    name: string;
    description: string;
    version: string;
    gradeLevel: string;
    status: string;
    creator: string;
    items: Item[];
}

export interface Item {
    id: string;
    name: string;
    description: string;
    type: string;
    extensions: Record<string, string>;
}

const STORAGE_KEY = 'cglt-interview-framework-data'

export function loadFramework(): Framework {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
        try {
            return JSON.parse(savedData) as Framework
        } catch (error) {
            console.error('Error parsing saved data:', error)
        }
    }
    
    return jsonData as Framework
}

export function saveFramework(framework: Framework): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(framework, null, 2))
    } catch (error) {
        console.error('Error saving framework:', error)
    }
}

export function resetFramework(): Framework {
    localStorage.removeItem(STORAGE_KEY)
    return jsonData as Framework
}