export class Task {
  id: number;
  listId: number;
  title: string;
  dueDate: Date;
  completed: boolean;
  priority: number;

  constructor(options?: {
    id?: number,
    listId?: number,
    title?: string,
    dueDate?: Date,
    completed?: boolean,
    priority?: number,
  }) {
    options = options || {};
    this.id = options.id;
    this.listId = options.listId;
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
