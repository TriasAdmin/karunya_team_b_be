import { Router } from "express";
import { getApi } from "../controllers/hackathon.controller";

const router = Router();

router.route("/api/v1/get/all/data").get(getApi);

export default router;
