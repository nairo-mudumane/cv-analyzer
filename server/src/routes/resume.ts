import { Router } from "express";
import * as controller from "../controllers/resume";
import storage from "../services/storage";

const router = Router();

router.post("/new", storage.local.single("resume"), controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/:id/translate", controller.translate);
router.post("/:id/extract", controller.extract);

export { router as ResumeRoutes };
