import React from 'react';
import { Clock, MoreVertical, Trash2, Edit2 } from 'lucide-react'; // Додав Edit2 для іконки
import { format } from 'date-fns';
import { ToDoItemDto } from '../types';
import { cn } from '../utils/cn';
import { Button } from './ui/Button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu'; 

interface TaskCardProps {
  task: ToDoItemDto;
  onEdit: (task: ToDoItemDto) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const normalizedStatus = task.status.replace('-', '').toLowerCase();
  const isDone = normalizedStatus === 'done';
  const isInProgress = normalizedStatus === 'inprogress';

  const formattedDeadline = task.deadline
    ? format(new Date(task.deadline), 'dd MMM, yyyy')
    : null;

  return (
    <div className={cn(
      "flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md",
      isInProgress && "border-l-4 border-l-blue-500",
      isDone && "bg-gray-50/50"
    )}>
      <div className="flex items-start justify-between gap-3">
        <h3 className={cn(
          "font-medium text-gray-900",
          isDone && "line-through text-gray-500"
        )}>
          {task.title}
        </h3>
        
        {/* 2. Змінюємо структуру меню на вкладену */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Edit2 className="mr-2 h-4 w-4" />
              <span>Редагувати</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => onDelete(task.id)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Видалити</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task.description && (
        <p className={cn(
          "text-sm text-gray-600 line-clamp-2",
          isDone && "text-gray-400"
        )}>
          {task.description}
        </p>
      )}

      {formattedDeadline && (
        <div className={cn(
          "flex items-center gap-1.5 text-xs text-gray-500",
          isDone && "text-gray-400"
        )}>
          <Clock className="h-3.5 w-3.5" />
          <span>Дедлайн: {formattedDeadline}</span>
        </div>
      )}
    </div>
  );
}