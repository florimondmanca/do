import { Task } from './task.model';

export class List {
  id: number;
  title: string;
  tasks: Task[];

  constructor(options?: {
    id?: number,
    title?: string,
    tasks?: Task[],
  }) {
    options = options || {};
    this.id = options.id;
    this.title = options.title;
    this.tasks = options.tasks || [];
  }

  get completedCount(): number {
    if (!this.tasks) return 0;
    return this.tasks.filter(task => task.completed).length;
  }
}
