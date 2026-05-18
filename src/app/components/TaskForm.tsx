import React, { useState, useEffect } from 'react';
import { ToDoItemDto, TaskStatus } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { DatePicker } from './ui/DatePicker';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/Dialog';
import { format } from 'date-fns';

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (task: Partial<ToDoItemDto>) => void;
  initialData?: ToDoItemDto;
  defaultStatus?: TaskStatus;
}

export function TaskForm({ open, onOpenChange, onSubmit, initialData, defaultStatus = 'todo' }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description || '');
        setStatus(initialData.status);
        setDeadline(initialData.deadline ? new Date(initialData.deadline) : undefined);
      } else {
        setTitle('');
        setDescription('');
        setStatus(defaultStatus);
        setDeadline(undefined);
      }
    }
  }, [open, initialData, defaultStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      description,
      status,
      deadline: deadline ? format(deadline, 'yyyy-MM-dd') : undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Редагувати завдання' : 'Нове завдання'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Назва завдання</label>
            <Input 
              placeholder="Що потрібно зробити?" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              autoFocus
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Опис (необов'язково)</label>
            <Textarea 
              placeholder="Додаткові деталі..." 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Статус</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={status}
                  onChange={e => setStatus(e.target.value as TaskStatus)}>
                <option value="todo">До виконання</option>
                <option value="inprogress">В процесі</option> {/* Прибрали дефіс */}
                <option value="done">Виконано</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Дедлайн</label>
              <DatePicker date={deadline} setDate={setDeadline} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Скасувати
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              {initialData ? 'Зберегти' : 'Створити'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
