import { Router } from "express";
import { PressSwitch } from "./press";
import { TokenValidate} from "../api/validate";
const pressRoutes = Router();

pressRoutes.post("/press",TokenValidate, PressSwitch);

export default pressRoutes;