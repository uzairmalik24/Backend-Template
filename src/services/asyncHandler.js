import { generateApiResponse } from "./utils.js"

export const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        console.log(error);
        next(error)
        return generateApiResponse(res, 500, false, error.message)
    }
}