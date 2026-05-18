import axios from 'axios';
import { ToDoItemDto, CreateToDoCommand } from '../app/types';

const API_URL = 'https://localhost:7115/api/ToDo'; // Заміни на свій порт зі Swagger

export const todoService = {
  // Отримати всі таски
  getAll: async () => {
    const response = await axios.get<ToDoItemDto[]>(API_URL);
    return response.data;
  },

  // Створити нову
  create: async (command: CreateToDoCommand) => {
    const response = await axios.post<string>(API_URL, command);
    return response.data; // поверне Guid
  },

  update: async (id: string, task: ToDoItemDto) => {
    await axios.put(`${API_URL}/${id}`, task);
  },

  // Видалити
  delete: async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
  }
};