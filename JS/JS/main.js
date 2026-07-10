// Runtime Main Process Execution Boundary (Session 1 Target Execution Context)
import { AppState } from './app.js';
import * as ui from './modules/ui.js';
import { debounce } from './modules/debounce.js';
import { throttle } from './modules/throttle.js';
import { logger } from './modules/logger.js';

document.addEventListener("DOMContentLoaded", async () => {
    logger.log("Call Stack Execution Context initialized root thread entry point.");
    
    // Explicit Microtask vs Macrotask Event Loop Visualizer (Session 4 Demo)
    ui.triggerAsyncSequenceDemo();

    // Hydrate state
    await AppState.initialize();

    // Setup User Interface
    ui.initUI();
    ui.renderAll(AppState.taskManager.getAllTasks(), AppState.taskManager.getStats());

    // Bind Event Listeners with Debounce and Throttling controls
    const searchElement = document.getElementById("search-input");
    searchElement.addEventListener("input", debounce((e) => {
        const filtered = AppState.taskManager.searchTasks(e.target.value);
        ui.renderAll(filtered, AppState.taskManager.getStats());
    }));

    const taskZone = document.getElementById("scrollable-task-zone");
    taskZone.addEventListener("scroll", throttle(() => {
        logger.log("Scroll event captured natively via Throttled handler.");
    }));
});