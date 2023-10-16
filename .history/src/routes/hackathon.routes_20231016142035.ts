import { Router } from "express";
import { getApi, getVitals, postVitals, getVital } from "../controllers/hackathon.controller";

const router = Router();

router.route("/api/v1/get/all/data").get(getApi);
router.route("/api/v1/get/all/vitals").get(getVitals);
router.route("/api/v1/get/vital").get(getVital);
router.route("/api/v1/post/vitals").post(postVitals);
  
export default router;
