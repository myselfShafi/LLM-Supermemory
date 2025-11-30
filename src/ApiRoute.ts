import { Router } from "express";
import { handleGet, handlePost } from "./ApiController.js";

const router = Router();

router.route('/:collection/*any')
.get(handleGet)
.post(handlePost);

export default router;