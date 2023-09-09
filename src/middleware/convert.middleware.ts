import { NextFunction, Request, Response } from "express";
import * as pdf from "html-pdf";
import * as mathjax from "mathjax-node";
import * as bluebirdPromise from "bluebird";
import * as HTMLtoDOCX from "html-to-docx";
import * as mathjaxNodeSvg2Png from "mathjax-node-svg2png";
import axios from "axios";
import * as fs from 'fs';
import * as crypto from "crypto";
import * as nodePandoc from "node-pandoc";

mathjax.config({
    MathJax: {
    }
});
mathjax.start();

const c3poHeaders = {
    'auth_token': 'hij789', // make me come from ENV plz :-)
};

const parseMathPng = async (html: string) => {
    let parsedHtml = html + '';
    // let matchMediaTagRegex = /<c3po-media .*?>/gi;
    let matchMediaTagRegex = /<c3po-media.*?<\/c3po-media>/gi;
    let mediaArr = html.match(matchMediaTagRegex) || [];
    mediaArr = await bluebirdPromise.map(mediaArr, async (mediaTag) => {
        let matchIdRegex = /media-id="(.*?)"/gi;
        const id = matchIdRegex.exec(mediaTag)[1];
        try {
            const axiosConfig = {
                method: "GET",
                headers: c3poHeaders,
                url: `https://c3po-api-test.cpm.org/api/v1/medias/${id}`,
            }
            // @ts-ignore
            const {data} = await axios(axiosConfig)
            const {latex} = data;
            if(!latex){
                return null
            }
            const result = await mathjaxNodeSvg2Png.typeset({
                math: data.latex,
                format: 'TeX', // Input format
                png: true, // Render as SVG
            })

            const md5Hash = crypto.createHash('md5').update(data.latex).digest('hex');
            const fileName = `/tmp/${md5Hash}.png`;
            if(result.png){

            // Extract the Base64 data from the data URI
                const base64Data = result.png.split(',')[1];

            // Decode the Base64 data and save it as a PNG image
                // @ts-ignore
                fs.writeFileSync(fileName, base64Data, 'base64');
                return {
                    matchText: mediaTag,
                    replace: `<img src="${result.png}" />`
                }
            } else {
                const i = 0;
            }
        } catch (err) {
            console.log(err)
            return {
                matchText: mediaTag,
                replace: ''
            }
        }
    })
    mediaArr.filter(r => !!r).forEach((media : any) => {
        parsedHtml = parsedHtml.replace(media.matchText, media.replace)
    })
    return parsedHtml;
}

const parseMath = async (html: string) => {
    let parsedHtml = html + '';
    // let matchMediaTagRegex = /<c3po-media .*?>/gi;
    let matchMediaTagRegex = /<c3po-media.*?<\/c3po-media>/gi;
    let mediaArr = html.match(matchMediaTagRegex) || [];
    mediaArr = await bluebirdPromise.map(mediaArr, async (mediaTag) => {
        let matchIdRegex = /media-id="(.*?)"/gi;
        const id = matchIdRegex.exec(mediaTag)[1];
        try {
            const axiosConfig = {
                method: "GET",
                headers: c3poHeaders,
                url: `https://c3po-api-test.cpm.org/api/v1/medias/${id}`,
            }
            // @ts-ignore
            const {data} = await axios(axiosConfig)
            const result = await mathjax.typeset({
                math: data.latex,
                format: 'TeX', // Input format
                svg: true, // Render as SVG
            })
            return {
                matchText: mediaTag,
                replace: result.svg
            }
        } catch (err) {
            console.log(err)
        }
    }, {concurrency: 1});

    mediaArr.filter(r => !!r).forEach((r : any) => {
        parsedHtml = parsedHtml.replace(r.matchText, r.replace);
    });
    return parsedHtml;
}

const pandocIfyHtml = async (path: string, fileName: string) => {
    return new Promise((resolve, reject) => {
        const result = nodePandoc(path, `-o /tmp/${fileName}.docx`, (err, result) => {
            if (err) {
               reject(err)
            } else {
                resolve(result);
            }
        });
    })
}
const cleanup = (fileName: string) => {
    if(fs.existsSync(`/tmp/${fileName}.html`)){
        fs.unlinkSync(`/tmp/${fileName}.html`);
    }
    if(fs.existsSync(`/tmp/${fileName}.docx`)){
        fs.unlinkSync(`/tmp/${fileName}.docx`);
    }
}
const convertToDocx = async (html: string, fileName: string) => {
    const parsedHtml = await parseMathPng(html);
    const filePath = `/tmp/${fileName}.html`;
    fs.writeFileSync(filePath, parsedHtml);
    await pandocIfyHtml(filePath, fileName)
    const buff = fs.readFileSync(`/tmp/${fileName}.docx`);
    cleanup(fileName);
    return buff;
}

const convertToPdf = async (html: string, fileName: string) => {
    const parsedHtml = await parseMathPng(html);
    fs.writeFileSync(`/tmp/${fileName}.html`, parsedHtml);
    const buff = await new Promise((resolve, reject) => {
        pdf.create(parsedHtml).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
    cleanup(fileName);
    return buff;
}

const convertHtml = async (req: Request, res: Response, next: NextFunction) => {
    const {html, output, fileName} = req.body;
    switch (output.toLowerCase()) {
        case "pdf":
            try {
                const pdfBuff = await convertToPdf(html, fileName);
                res.locals.output = pdfBuff;
                return next();
            } catch (err) {
                return next(err);
            }
        case "docx":
            try {
                const docxBuff = await convertToDocx(html, fileName);
                res.locals.output = docxBuff;
                return next();
            } catch (err) {
                return next(err);
            }
        default:
            res.status(400).send({message: "Invalid output type"});
    }
    next();
}
export const convertHtmlMiddleware = [convertHtml];