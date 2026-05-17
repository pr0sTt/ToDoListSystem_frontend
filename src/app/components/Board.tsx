import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ToDoItemDto, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { Button } from './ui/Button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addTask, updateTask, deleteTask } from '../features/tasks/tasksSlice';

export function Board() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ToDoItemDto | undefined>(undefined);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo');

  const columns: { id: TaskStatus; title: string; color: string }[] = [
    { id: 'todo', title: 'До виконання', color: 'bg-slate-100' },
    { id: 'in-progress', title: 'В процесі', color: 'bg-blue-50' },
    { id: 'done', title: 'Виконано', color: 'bg-green-50' },
  ];

  const handleCreateTask = (status: TaskStatus) => {
    setDefaultStatus(status);
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: ToDoItemDto) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити це завдання?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleFormSubmit = (taskData: Partial<ToDoItemDto>) => {
    if (editingTask) {
      dispatch(updateTask({ ...editingTask, ...taskData } as ToDoItemDto));
    } else {
      const newTask: ToDoItemDto = {
        id: Math.random().toString(36).substring(2, 9),
        title: taskData.title!,
        description: taskData.description,
        status: taskData.status || 'todo',
        deadline: taskData.deadline,
      };
      dispatch(addTask(newTask));
    }
  };

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Мої завдання</h1>
          <p className="text-sm text-gray-500">Управляйте своїми планами та слідкуйте за дедлайнами.</p>
        </div>
        <Button onClick={() => handleCreateTask('todo')}>
          <Plus className="mr-2 h-4 w-4" />
          Нове завдання
        </Button>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
        {columns.map(column => {
          const columnTasks = tasks.filter(t => t.status === column.id);
          
          return (
            <div key={column.id} className={`flex flex-col rounded-xl p-4 ${column.color}`}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-gray-700">{column.title}</h2>
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-medium text-gray-600 shadow-sm">
                    {columnTasks.length}
                  </span>
                </div>
                <button 
                  onClick={() => handleCreateTask(column.id)}
                  className="rounded-md p-1 text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                  title="Додати завдання сюди"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-3">
                {columnTasks.length === 0 ? (
                  <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white/50 text-sm text-gray-500">
                    Немає завдань
                  </div>
                ) : (
                  columnTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TaskForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
        defaultStatus={defaultStatus}
      />
    </div>
  );
}
