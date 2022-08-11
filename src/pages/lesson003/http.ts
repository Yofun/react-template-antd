import axios from "axios";

const http = axios.create({
  baseURL: "/",
  timeout: 5 * 1000,
});

http.interceptors.request.use((config) => config);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("interceptors error", error);
    return Promise.reject();
  }
);


export default http;
