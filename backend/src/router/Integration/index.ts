import googlesheets from "./google";
import { Router } from "express";
import notion from "./notion";

const integration = Router();

integration.use("/googlesheets", googlesheets);
integration.use("/notion", notion)

export default integration;