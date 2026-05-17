import React from 'react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Calendar, Clock, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ToDoItemDto } from '../types';
import { cn } from '../utils/cn';

interface TaskCardProps {
  task: ToDoItemDto;
  onEdit: (task: ToDoItemDto) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'done';

  return (
    <div className="group relative flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className={cn("font-medium text-gray-900", task.status === 'done' && "text-gray-500 line-through")}>
          {task.title}
        </h3>
        
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none">
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content 
              align="end"
              className="z-50 min-w-[160px] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md animate-in fade-in-80"
            >
              <DropdownMenuPrimitive.Item 
                className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100"
                onClick={() => onEdit(task)}
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Редагувати
              </DropdownMenuPrimitive.Item>
              <DropdownMenuPrimitive.Item 
                className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-600 outline-none hover:bg-red-50 focus:bg-red-50"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Видалити
              </DropdownMenuPrimitive.Item>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>

      {task.description && (
        <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
      )}

      {task.deadline && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <Calendar className={cn("h-3.5 w-3.5", isOverdue ? "text-red-500" : "text-gray-400")} />
          <span className={cn(isOverdue ? "text-red-600 font-medium" : "text-gray-500")}>
            {format(new Date(task.deadline), 'd MMM yyyy', { locale: uk })}
          </span>
          {isOverdue && <span className="ml-1 rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-600">Протерміновано</span>}
        </div>
      )}
    </div>
  );
}
