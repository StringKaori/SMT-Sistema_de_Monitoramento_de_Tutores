import axios from "axios";

const connector = axios.create({
  baseURL: "http://10.0.2.2:8080/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { connector };