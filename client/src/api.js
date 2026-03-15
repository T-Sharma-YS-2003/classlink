import axios from "axios";

const instance = axios.create({
  baseURL: "https://classlink-api.onrender.com",
});

export default instance;
