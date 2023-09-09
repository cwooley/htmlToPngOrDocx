import * as dotenv from "dotenv";
import logger from "./logger";
import * as fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("No .env file found.  Using local environment or kubernetes");
    // dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

const { NODE_ENV, WEB_PORT, RESPOND_WITH_ERRORS, C3PO_API_URL, C3PO_SERVICE_TOKEN } = process.env;

const SIGTERM_GRACE_PERIOD = parseInt(process.env.SIGTERM_GRACE_PERIOD) || 30000;
const ENVIRONMENT = NODE_ENV === "production" ? NODE_ENV : "development"; // Anything else is treated as 'dev'

export {
    // App settings
    WEB_PORT,
    ENVIRONMENT,

    // Error Handling
    RESPOND_WITH_ERRORS,

    // Graceful Termination
    SIGTERM_GRACE_PERIOD,

    // c3po
    C3PO_API_URL,
    C3PO_SERVICE_TOKEN

};
