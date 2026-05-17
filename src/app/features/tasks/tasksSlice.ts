import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';

interface TasksState {
  tasks: Task[];
}

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Розробити дизайн',
    description: 'Створити макети для головної сторінки в Figma.',
    status: 'done',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Налаштувати React роутер',
    status: 'in-progress',
    deadline: new Date(Date.now() + 86400000 * 1).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Інтеграція з Supabase',
    description: 'Налаштувати підключення до бази даних для збереження тасок.',
    status: 'todo',
    deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdAt: new Date().toISOString(),
  }
];

const initialState: TasksState = {
  tasks: INITIAL_TASKS,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
