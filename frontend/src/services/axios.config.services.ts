// src/lib/axios.js
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const instance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
