import { Router } from "express";
import * as controller from "../controllers/resume";
import storage from "../services/storage";

const router = Router();

router.post("/new", storage.local.single("resume"), controller.create);
router.post("/:id/extract", controller.extract);

export { router as ResumeRoutes };
