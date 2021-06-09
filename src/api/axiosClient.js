import axios from 'axios';
import { API } from '../config'

export const axiosClient = axios.create({
  baseURL: API,
  headers: {
    // 'Content-Type': 'multipart/form-data',
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
});