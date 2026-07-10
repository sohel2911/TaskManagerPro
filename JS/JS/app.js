// Context Orchestrator and Session Context Interfaces
import { TaskManager } from './classes/TaskManager.js';
import { User } from './classes/User.js';
import * as storage from './modules/storage.js';
import * as api from './modules/api.js';

export const AppState = {
    taskManager: new TaskManager(),
    currentUser: new User("Guest System Architect"),
    
    async initialize() {
        // Session 5: Async Initialization via Promises/Await
        try {
            const cachedTasks = storage.loadTasks();
            if (cachedTasks && cachedTasks.length > 0) {
                AppState.taskManager.hydrate(cachedTasks);
            } else {
                const standardFallback = await api.fetchSampleData();
                AppState.taskManager.hydrate(standardFallback);
                storage.saveTasks(AppState.taskManager.getAllTasks());
            }
        } catch (error) {
            console.error("System Hydration Failure:", error);
        }
    }
};