import axios from "axios";

const connector = axios.create({
  // baseURL: "http://192.168.0.10:8080/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const updateConnectorToken = (token: string) => {
    connector.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const updateConnectorBaseIP = (ip: string) => {
  connector.defaults.baseURL = `http://${ip}/api/v1`
}

export { connector };