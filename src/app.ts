import { Router, Request, Response, NextFunction } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { json, urlencoded } from "body-parser";
import * as cors from "cors";
import { ApiRouting } from "./routes";

class App {

    public app: express.Express;
    public router: express.Router;
    constructor() {
        this.app = express();
        this.router = express.Router();
    }

    public async init(): Promise<void> {
        return await this.config();
    }

    private  async config(): Promise<void> {
        this.configureCors();
        this.app.use(bodyParser.json({ limit: "50mb" }));
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.configureRoutes();
    }

    private configureCors() {
      const options: cors.CorsOptions = {
        allowedHeaders: ["Origin", "Authorization", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        // origin: process.env.API_BASE || "http://localsso.cpm.org:3001",
        origin: (origin, callback) => {
            // origin is null for tests
            if (!origin) {
               callback(null, true);
            } else if ( origin.indexOf(".cpm.org") > 0 ) {
                callback(null, true);
            } else if (origin === process.env.API_BASE) {
                callback(null, true);
            } else {
                callback(new Error("Not Allowed by CORS"));
            }
        },
        preflightContinue: false,
      };
      this.router.use(cors(options));
      this.app.use("/", this.router);
    }

    private configureRoutes() {
      ApiRouting.ConfigureRouters(this.app);
    }

}

export default App;