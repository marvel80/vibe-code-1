import axios from 'axios';
import { Item } from '../types/Item';

const API_URL = 'http://localhost:8080/api';

export const api = {
  getAllItems: async () => {
    const response = await axios.get<Item[]>(`${API_URL}/items`);
    return response.data;
  },

  getItem: async (id: number) => {
    const response = await axios.get<Item>(`${API_URL}/items/${id}`);
    return response.data;
  },

  createItem: async (item: Item) => {
    const response = await axios.post<Item>(`${API_URL}/items`, item);
    return response.data;
  },

  updateItem: async (id: number, item: Item) => {
    const response = await axios.put<Item>(`${API_URL}/items/${id}`, item);
    return response.data;
  },

  deleteItem: async (id: number) => {
    await axios.delete(`${API_URL}/items/${id}`);
  },

  searchItems: async (name: string) => {
    const response = await axios.get<Item[]>(`${API_URL}/items/search?name=${name}`);
    return response.data;
  }
}; 