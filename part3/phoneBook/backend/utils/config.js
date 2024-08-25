import {configDotenv} from "dotenv";
configDotenv();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

export {PORT, MONGO_URI};
