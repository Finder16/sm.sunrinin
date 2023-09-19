import axios from "axios";

const API_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  }
})

export const login = async (username, password) => {
  const res = await api.post("/login", { username, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
}

//profile api
export const me = async () => {
  const res = await api.get("/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export const planets = async () => {
  const res = await api.get("/", {});
  return res.data;
}
