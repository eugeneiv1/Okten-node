import {config} from "dotenv";
config();

console.log(process.env.PORT);
export const configs = {
    PORT: process.env.PORT,
};