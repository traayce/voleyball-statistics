import { GetRequestHeader } from "@utils/header";
import axios from "axios";
const baseURL: string = "http://localhost:3000/api/";
export const request = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        ...GetRequestHeader().headers
    }
});