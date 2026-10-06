import axios from 'axios';
import { BACKEND_HTTP_URL } from '@/main/ipc/config/websocket';

export const api = axios.create({
  baseURL: BACKEND_HTTP_URL,
  timeout: 8000
});
