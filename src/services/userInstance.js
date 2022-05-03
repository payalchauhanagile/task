import axios from "axios";

const userInstance = axios.create({
  baseURL: "https://624fc73957186bb955691940.mockapi.io/",
});

export default userInstance;
