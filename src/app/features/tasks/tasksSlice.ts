import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDoItemDto } from '../../types';

interface TasksState {
  tasks: ToDoItemDto[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ToDoItemDto[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<ToDoItemDto>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<ToDoItemDto>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...action.payload };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
