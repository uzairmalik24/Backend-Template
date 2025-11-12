import mongoose from "mongoose";

export const connectDB = async (url) => {
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }),
            console.log('======== / Database connected / ========')
    } catch (error) {
        console.log('Connection Error');
        console.log(error);
    }
}