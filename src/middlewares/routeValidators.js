import mongoose from "mongoose";
import { generateApiResponse, verifyEmail } from "../services/utils.service.js";


export const requiredValidators = (requiredFields = []) => {
    return (req, res, next) => {
        try {
            requiredFields.forEach((field) => {
                const value = req.body[field];

                if (!value) {
                    return generateApiResponse(res, 400, false, `${field} is required`);
                }

                if (field === 'email' && !verifyEmail(value)) {
                    return generateApiResponse(res, 400, false, `${field} is invalid`);
                }

                if (field === '_id' && !mongoose.Types.ObjectId.isValid(value)) {
                    return generateApiResponse(res, 400, false, `${field} is invalid`);
                }
            });

            next();
        } catch (error) {
            console.log(error);
            return generateApiResponse(res, 500, false, error.message);
        }
    }
}
