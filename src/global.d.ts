import { AxiosRequestConfigO } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig extends AxiosRequestConfigO {
    ignoreError?: boolean;
  }
}
