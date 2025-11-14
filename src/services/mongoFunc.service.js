import mongoose from "mongoose";

export const validateAndGetOne = async (model = null, providedId, populates = [], select = {}) => {

    const id = providedId;
    if (!id) {
        throw new Error(`Id is required in validateAndGetOne`);
    }
    if (!model) {
        throw new Error(`Model is required in validateAndGetOne`);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Id ${id} is invalid`);
    }

    try {
        const entity = await model.findById(id).select(select).populate(populates);
        if (!entity) {
            throw new Error(`Entity with id ${id} not found`);
        }
        
        return entity
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};