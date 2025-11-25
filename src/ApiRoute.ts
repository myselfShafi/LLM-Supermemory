import { Router } from "express";
import { handleGet, handlePost } from "./ApiController.js";

const router = Router();

router.route('/:collection/*')
.get(handleGet)
.post(handlePost);