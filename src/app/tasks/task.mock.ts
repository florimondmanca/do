import { Task } from './task.model';
import * as date from 'date-and-time';

const now = new Date();

export const TASKS: Task[] = [
  new Task({
    id: 1,
    title: 'Buy groceries',
    dueDate: date.addDays(now, 1),
  }),
  new Task({
    id: 2,
    title: 'Have a nap',
    dueDate: date.addHours(now, -1),
  }),
]
