import axios, { AxiosError } from "axios";

const http = axios.create({
  baseURL: "/",
  timeout: 5 * 1000,
});

http.interceptors.request.use((config) => config);

http.interceptors.response.use((response) => {
  return response;
});

http.interceptors.response.use(
  (res) => res,
  (e: AxiosError) => {
    let error: Error = e;
    console.log("interceptors error", e);

    throw error;
  }
);

export default http;
