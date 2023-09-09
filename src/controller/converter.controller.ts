import { NextFunction, Request, Response, Router } from "express";
import {
    convertHtmlMiddleware,
} from "../middleware";

export class ConverterController {
    public router: Router = Router();

    constructor() {
        this.router.post("/", [...convertHtmlMiddleware, this.sendFile]);
    }

    public async sendFile(req: Request, res: Response, next: NextFunction) {
        const {output, fileName} = req.body;
        // Set the appropriate headers for a PDF response
        if(output.toLowerCase() === "pdf") {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}.pdf`); // Change the filename as needed
        } else if (output.toLowerCase() === "docx") {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}.docx`); // Change the filename as needed
        }
        // Send the PDF buffer as the response
        res.send(res.locals.output);
    }

    public async success(req: Request, res: Response, next: NextFunction) {
        return res.json({success: true});
    }

}