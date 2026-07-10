// Task Management Domain Model Controller Class
import { PersonalTask, OfficeTask } from './Task.js';

export class TaskManager {
    constructor() {
        this.tasksCollection = [];
    }

    addTask(taskNodeInstance) {
        this.tasksCollection.push(taskNodeInstance);
    }

    removeTask(targetTaskId) {
        this.tasksCollection = this.tasksCollection.filter(t => t.id !== targetTaskId);
    }

    toggleTask(targetTaskId) {
        const found = this.tasksCollection.find(t => t.id === targetTaskId);
        if (found) {
            // Demo Method Execution Binding Context Logic safely
            found.toggleCompletionState.call(found);
        }
    }

    // Session 7: Structural Deep Copying implementation using structuredClone
    duplicateTask(targetTaskId) {
        const rawMatch = this.tasksCollection.find(t => t.id === targetTaskId);
        if (rawMatch) {
            const deepClonedProperties = structuredClone(rawMatch);
            
            let duplicatedInstance;
            if (deepClonedProperties.type === 'personal') {
                duplicatedInstance = new PersonalTask(deepClonedProperties.title + " (Copy)", deepClonedProperties.priority, deepClonedProperties.dueDate);
            } else {
                duplicatedInstance = new OfficeTask(deepClonedProperties.title + " (Copy)", deepClonedProperties.priority, deepClonedProperties.dueDate);
            }
            duplicatedInstance.completed = deepClonedProperties.completed;
            this.addTask(duplicatedInstance);
        }
    }

    searchTasks(searchQueryString) {
        if (!searchQueryString) return this.tasksCollection;
        const normalized = searchQueryString.toLowerCase().trim();
        return this.tasksCollection.filter(t => t.title.toLowerCase().includes(normalized));
    }

    getStats() {
        const total = this.tasksCollection.length;
        const completed = this.tasksCollection.filter(t => t.completed).length;
        return {
            total,
            completed,
            pending: total - completed
        };
    }

    getAllTasks() {
        return this.tasksCollection;
    }

    hydrate(plainArrayObjects) {
        this.tasksCollection = [];
        plainArrayObjects.forEach(rawItem => {
            let instance;
            if (rawItem.type === 'personal') {
                instance = new PersonalTask(rawItem.title, rawItem.priority, rawItem.dueDate);
            } else {
                instance = new OfficeTask(rawItem.title, rawItem.priority, rawItem.dueDate);
            }
            instance.id = rawItem.id || instance.id;
            instance.completed = !!rawItem.completed;
            this.addTask(instance);
        });
    }

    // Session 7: Custom Iterator Implementation Interface
    [Symbol.iterator]() {
        let currentIterationIndex = 0;
        const items = this.tasksCollection;
        return {
            next() {
                if (currentIterationIndex < items.length) {
                    return { value: items[currentIterationIndex++], done: false };
                }
                return { done: true };
            }
        };
    }
}