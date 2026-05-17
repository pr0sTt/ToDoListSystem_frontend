export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface ToDoItemDto {
  id: string;
  title: string;
  description?: string;
  status: string;
  deadline?: string;
}

export interface CreateToDoCommand {
  title: string;
  description?: string;
  deadline?: string;
}