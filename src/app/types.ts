export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface ToDoItemDto {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  deadline?: string;
}

export interface CreateToDoCommand {
  title: string;
  description?: string;
  deadline?: string;
}