// js/classes/TaskManager.js
import { Task } from './Task.js'; // Session 6 ke mutabiq class import

export class TaskManager {
    constructor() {
        this.tasks = []; // Tasks store karne ke liye array
        this.initEventListeners();
    }

    initEventListeners() {
        // Form aur Add Button ko select kar rahe hain
        const taskForm = document.querySelector('form') || document.getElementById('add-task-btn');
        
        if (taskForm) {
            // 🚨 BUG FIX: Arrow function use karne se 'this' ka context TaskManager hi rahega
            taskForm.addEventListener('click', (e) => {
                // Agar button pure form ke andar hai toh default reload roko
                if (e.target.id === 'add-task-btn' || e.target.type === 'submit') {
                    e.preventDefault(); 
                    this.handleAddTask();
                }
            });
        }
    }

    handleAddTask() {
       // Purani teeno const lines ko hatakar ye likho:
const titleInput = document.getElementById('search-input') || document.querySelector('input[type="text"]');
const prioritySelect = document.getElementById('filter-priority') || document.querySelector('select');
const dateInput = document.getElementById('task-date') || document.querySelector('input[type="date"]');

        // Inputs validation
        if (!titleInput || !titleInput.value.trim()) {
            alert("Kuch task toh likho bhai!");
            return;
        }

        const taskTitle = titleInput.value.trim();
        const taskPriority = prioritySelect ? prioritySelect.value : 'Medium';
        const taskDate = dateInput ? dateInput.value : '';

        // Session 6 ke mutabiq new Task object create karna
        const newTask = new Task(taskTitle, taskPriority, taskDate);
        
        // Array me push karna
        this.tasks.push(newTask);

        // 🌟 Input clear karna task add hone ke baad
        titleInput.value = '';

        // UI aur Stats ko update karne ke liye calls
        this.renderTasks();
        this.updateStatistics();
        
        // Session 8 ke mutabiq local storage me save karna
        this.saveToLocalStorage();
    }

    updateStatistics() {
        // Left side dashboard stats update karne ke liye
        const totalTasksEl = document.getElementById('total-tasks') || document.querySelector('.statistics div:nth-child(2)'); // UI ke mutabiq select karein
        const pendingTasksEl = document.getElementById('pending-tasks');

        if (totalTasksEl) {
            totalTasksEl.textContent = `Total Tasks: ${this.tasks.length}`;
        }
    }

    renderTasks() {
        const activeTasksContainer = document.querySelector('.main-content section:last-of-type') || document.getElementById('active-tasks');
        
        if (!activeTasksContainer) return;

        // Purana list clear karo pehle
        // (Iske aage ka render HTML aapki ui.js ya isi file me handle hoga)
    }

    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}