// JS/JS/app.js
import { TaskManager } from '../classes/js/classes/TaskManager.js';

document.addEventListener('DOMContentLoaded', async () => {
    const userProfileEl = document.getElementById('user-profile'); 
    const addTaskBtn = document.getElementById('add-task-btn');

    try {
        const userData = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({ name: "Sohail" });
            }, 1500);
        });

        if (userProfileEl) {
            userProfileEl.textContent = `User: ${userData.name}`; 
        }

        // Global context set kar rahe hain taaki HTML button ise dhoondh sake
        console.log("Initializing TaskManager...");
        window.taskManagerInstance = new TaskManager();

        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', (e) => {
                e.preventDefault(); 
                if (window.taskManagerInstance) {
                    window.taskManagerInstance.handleAddTask();
                }
            });
        }

    } catch (error) {
        console.error("App setup error:", error);
    }
});