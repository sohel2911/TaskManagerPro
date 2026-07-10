// JS/JS/app.js
import { TaskManager } from '../classes/js/classes/Taskmanager.js';

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

        // TaskManager ko globally banaya gaya
        window.taskManagerInstance = new TaskManager();
        console.log("TaskManager properly initialized.");

        // FIX: Form reload rokne ke liye direct listener attach kar diya
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Ye browser ko reload hone se rokega!
                if (window.taskManagerInstance) {
                    window.taskManagerInstance.handleAddTask();
                    console.log("Add Task button pressed and function called!");
                }
            });
        } else {
             console.log("Add Task button HTML me nahi mila.");
        }

    } catch (error) {
        console.error("User profile load error:", error);
    }
});