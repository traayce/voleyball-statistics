import axios from "axios";
import { Middleware } from "redux";
import thunk from "redux-thunk";
import { crashReporting } from "./crash";
import { logger } from "./logging";
import authMiddleware from "./auth";
const request = axios.create({
  baseURL: "http://localhost:3001/v1/"
});
export const middleware: Middleware[] = [
  thunk.withExtraArgument(request),
  crashReporting,
  logger,
  authMiddleware
];
