// Local Storage Management Layer
import { STORAGE_KEYS } from '../config.js';

export function saveTasks(tasksArray) {
    try {
        const rawJsonString = JSON.stringify(tasksArray);
        localStorage.setItem(STORAGE_KEYS.TASKS, rawJsonString);
        return true;
    } catch (e) {
        console.error("Storage Serialization Violation Error:", e);
        return false;
    }
}

export function loadTasks() {
    try {
        const payload = localStorage.getItem(STORAGE_KEYS.TASKS);
        return payload ? JSON.parse(payload) : [];
    } catch(e) {
        console.error("Storage Deserialization Violation Error:", e);
        return [];
    }
}