import type { NextFunction, Request, Response } from "express";
import ApiError from "./ApiError.util.js";
import { env } from "../config/env.config.js";
import { MESSAGE } from "../constants/index.js";

function asyncHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false, message: err.message, errors: err.errors, stack: env.dev ? err.stack : undefined
        });
    }

    // unknown errors fallback
    return res.status(500).json({
        success: false,
        message: err.message || MESSAGE.ERROR.UNEXPECTED
    });
};

export default asyncHandler;