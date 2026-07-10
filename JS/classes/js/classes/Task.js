// Object Prototype Structure Base Implementation Pattern (Session 2, 3 & 6 Architecture)
const TaskIdGeneratorInstance = (function() {
    let operationalCounter = 0;
    return {
        generateNextUniqueId() {
            operationalCounter += 1;
            return `task_node_ref_${operationalCounter}_${Date.now()}`;
        }
    };
})();

export class Task {
    constructor(title, priority, dueDate) {
        // Session 7: Symbol Unique Key Property Implementation Definition
        const privateInteriorKeySymbol = Symbol("SystemKeyReferenceId");
        this[privateInteriorKeySymbol] = TaskIdGeneratorInstance.generateNextUniqueId();
        
        this.id = this[privateInteriorKeySymbol];
        this.title = title;
        this.priority = priority; // 'low' | 'medium' | 'high'
        this.dueDate = dueDate;
        this.completed = false;
        this.type = 'generic';
    }

    toggleCompletionState() {
        this.completed = !this.completed;
    }
}

// Session 6 Class Extensibility Inheritances
export class PersonalTask extends Task {
    constructor(title, priority, dueDate) {
        super(title, priority, dueDate);
        this.type = 'personal';
    }
}

export class OfficeTask extends Task {
    constructor(title, priority, dueDate) {
        super(title, priority, dueDate);
        this.type = 'office';
    }
}