export class Task {
  id: number;
  title: string;
  dueDate: Date;
  completed: boolean;
  priority: number;

  constructor(options?: {
    id?: number,
    title?: string,
    dueDate?: Date,
    completed?: boolean,
    priority?: number,
  }) {
    options = options || {};
    this.id = options.id;
    this.title = options.title || '';
    this.dueDate = options.dueDate;
    this.completed = options.completed || false;
    this.priority = options.priority || 0;
  }

  get due(): boolean {
    if (this.dueDate) {
      return new Date() > this.dueDate;
    }
    return false;
  }
}

export class List {
  id: number;
  title: string;
  tasks: Task[];

  constructor(options: {
    id: number,
    title: string,
    tasks?: Task[],
  }) {
    this.id = options.id;
    this.title = options.title;
    this.tasks = options.tasks || [];
  }

  get completedCount(): number {
    if (!this.tasks) return 0;
    return this.tasks.filter(task => task.completed).length;
  }
}
