import { Router } from "express";
import { getApi, postApi, statApi } from "../controllers/hackathon.controller";

const router = Router();

router.route("/api/v1/get/all/data").get(getApi);

router.route("/api/v1/post/all/data").post(postApi);

router.route("/api/v1/get/data").get(statApi);

export default router;
