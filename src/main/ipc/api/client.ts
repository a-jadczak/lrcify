import axios from 'axios';
import { BACKEND_HTTP_URL } from '../config/backend';

export const api = axios.create({
  baseURL: BACKEND_HTTP_URL,
  timeout: 8000
});
