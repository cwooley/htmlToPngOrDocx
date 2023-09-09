import { Router, Request, Response } from "express";
import { RESPOND_WITH_ERRORS } from "./conf/secrets";
import { ConverterController } from "./controller";

export class ApiRouting {
    constructor() {

    }

    public static ConfigureRouters(app: Router) {

        app.use("/api/convert", new  ConverterController().router);
        
        app.use(function(req: Request, res: Response) {
          return res.status(404).send({ message: `Route ${req.url} Not found.` });
        });

        app.use(function(err: any, req: Request, res: Response) {
            console.error(err);
            if (RESPOND_WITH_ERRORS) {
                return res.status(500).send({ err });
            } else {
                return res.status(500).send("Something went wrong");
            }
        });
    }
}


