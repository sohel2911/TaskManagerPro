// JS/JS/app.js

// Hum exact correct path se TaskManager ko import kar rahe hain
import { TaskManager } from '../classes/js/classes/Taskmanager.js';

document.addEventListener('DOMContentLoaded', async () => {
    const userProfileEl = document.getElementById('user-profile'); 

    // 1. Loading screen ko fix karne ka logic (Jo already chal raha hai)
    try {
        const userData = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({ name: "Sohail" });
            }, 1500);
        });

        if (userProfileEl) {
            userProfileEl.textContent = `User: ${userData.name}`; 
        }

        // 2. 🚨 THE ADD TASK FIX: TaskManager ko yahan initialize karna zaroori hai!
        console.log("Initializing TaskManager...");
        const taskManager = new TaskManager();

    } catch (error) {
        console.error("User profile load nahi ho paya:", error);
        if (userProfileEl) {
            userProfileEl.textContent = "Error loading user";
        }
    }
});