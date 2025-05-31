import googlesheets from "./google";
import { Router } from "express";

const integration = Router();

integration.use("/googlesheets", googlesheets);

export default integration;