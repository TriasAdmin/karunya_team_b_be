import { Router } from "express";
import { getApi } from "../controllers/hackathon.controller";
import { postApi } from "../controllers/hackathon.controller";
const router = Router();

router.route("/api/v1/get/all/data").get(getApi);
router.route("/api/v1/post/all/data").post(postApi);
export default router;
