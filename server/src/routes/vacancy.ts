import { Router } from "express";
import * as controller from "../controllers/vacancy";

const router = Router();

router.post("/new", controller.create);
router.get("/", controller.getAll);
router.get("/:key", controller.getById);
router.get("/:key/best_fit", controller.getBestFit);

export { router as VacancyRoutes };
