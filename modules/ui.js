// User Interface Manipulation and DOM Engine
import { AppState } from '../app.js';
import { PersonalTask, OfficeTask } from '../classes/Task.js';
import * as storage from './storage.js';
import { validator } from './validator.js';

export function initUI() {
    document.getElementById("user-profile").innerText = `Active Session: ${AppState.currentUser.name}`;

    // Handle Forms
    const form = document.getElementById("task-form");
    form.addEventListener("submit", handleFormSubmit);

    // Theme Setup
    const themeBtn = document.getElementById("theme-toggle-btn");
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem('tmp_dark_mode_status', document.body.classList.contains("dark-mode"));
    });
    if(localStorage.getItem('tmp_dark_mode_status') === 'true') {
        document.body.classList.add("dark-mode");
    }

    // Filters
    document.getElementById("filter-priority").addEventListener("change", applyFilters);
    document.getElementById("filter-status").addEventListener("change", applyFilters);

    // Import / Export Buttons
    document.getElementById("export-btn").addEventListener("click", exportData);
    document.getElementById("import-input").addEventListener("change", importData);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById("task-title").value;
    const priority = document.getElementById("task-priority").value;
    const type = document.getElementById("task-type").value;
    const date = document.getElementById("task-date").value;

    if (!validator.validateString(title)) return alert("Invalid Title Payload");

    let newTask;
    if (type === 'personal') {
        newTask = new PersonalTask(title, priority, date);
    } else {
        newTask = new OfficeTask(title, priority, date);
    }

    AppState.taskManager.addTask(newTask);
    storage.saveTasks(AppState.taskManager.getAllTasks());
    
    // Refresh Interface Viewports
    applyFilters();
    e.target.reset();
}

export function applyFilters() {
    const priority = document.getElementById("filter-priority").value;
    const status = document.getElementById("filter-status").value;
    
    let tasks = AppState.taskManager.getAllTasks();
    
    if (priority !== 'all') tasks = tasks.filter(t => t.priority === priority);
    if (status !== 'all') {
        const isComp = status === 'completed';
        tasks = tasks.filter(t => t.completed === isComp);
    }
    
    renderAll(tasks, AppState.taskManager.getStats());
}

export function renderAll(tasks, stats) {
    // Update Stats Card Nodes
    document.getElementById("stat-total").innerText = stats.total;
    document.getElementById("stat-completed").innerText = stats.completed;
    document.getElementById("stat-pending").innerText = stats.pending;

    const wrapper = document.getElementById("tasks-wrapper");
    wrapper.innerHTML = "";

    // Session 7: Custom Task Collection Object Iterator Implementation Loop
    for (const task of tasks) {
        const card = document.createElement("div");
        card.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;
        
        card.innerHTML = `
            <div>
                <strong class="task-title-text">${task.title}</strong>
                <div class="task-meta">Type: ${task.type.toUpperCase()} | Due: ${task.dueDate}</div>
            </div>
            <div>
                <button class="btn btn-primary toggle-comp-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="btn btn-secondary duplicate-btn">Copy</button>
                <button class="btn btn-secondary delete-btn" style="background:var(--danger-action); color:white;">X</button>
            </div>
        `;

        // Event Handlers demonstrating functional scope lexical closure bindings
        card.querySelector(".toggle-comp-btn").addEventListener("click", () => {
            AppState.taskManager.toggleTask(task.id);
            storage.saveTasks(AppState.taskManager.getAllTasks());
            applyFilters();
        });

        card.querySelector(".duplicate-btn").addEventListener("click", () => {
            AppState.taskManager.duplicateTask(task.id);
            storage.saveTasks(AppState.taskManager.getAllTasks());
            applyFilters();
        });

        card.querySelector(".delete-btn").addEventListener("click", () => {
            AppState.taskManager.removeTask(task.id);
            storage.saveTasks(AppState.taskManager.getAllTasks());
            applyFilters();
        });

        wrapper.appendChild(card);
    }
}

export function triggerAsyncSequenceDemo() {
    const banner = document.getElementById("async-banner");
    banner.classList.remove("hidden");
    banner.innerText = "Initializing Engine Execution Profiler...";

    // Macrotask queue scheduling operation
    setTimeout(() => {
        banner.innerText += " -> [Macrotask Frame Complete]";
    }, 0);

    // Microtask queue lifecycle scheduling operation
    Promise.resolve().then(() => {
        banner.innerText += " -> [Microtask Hook Fired]";
    });
}

function exportData() {
    const tasks = AppState.taskManager.getAllTasks();
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks_export.json";
    link.click();
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const parsed = JSON.parse(evt.target.result);
            if (!Array.isArray(parsed)) throw new Error("Invalid Format Envelope");
            AppState.taskManager.hydrate(parsed);
            storage.saveTasks(AppState.taskManager.getAllTasks());
            applyFilters();
            alert("Database Hydrated Successfully.");
        } catch(err) {
            alert(`JSON Execution Abort: ${err.message}`);
        }
    };
    reader.readAsText(file);
}