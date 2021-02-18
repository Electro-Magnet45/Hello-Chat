import axios from "axios";

const instance = axios.create({
  baseURL: "https://hello-chat.vercel.app/",
});

export default instance;
