import { transports, createLogger } from "winston";
import * as dotenv from "dotenv";
import { ENVIRONMENT } from "./secrets";

const logger = createLogger({
    transports: [
        // new (transports.Console)({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new (transports.Console)({ level: "debug" }),
        new (transports.File)({ filename: "../logs/debug.log", level: "debug"}),
        new (transports.File)({ filename: "../logs/info.log", level: "info"}),
        new (transports.File)({ filename: "../logs/error.log", level: "error"})
    ]
});

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;