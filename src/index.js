import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/database.js";
import app from "./app.js";


const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;


const connectToDB = async () => {
    try {
        await connectDB(`${uri}${dbName}`).then(() => {
            app.listen(port, () => {
                console.log('==================================');
                console.log('Server running on port: 3000');
                console.log('==================================');
            })
        })
    } catch (error) {
        console.log(error);
    }
}

connectToDB();