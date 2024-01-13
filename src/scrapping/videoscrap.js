import {JSDOM} from 'jsdom'
import jqueryLib from 'jquery';
import puppeteer from 'puppeteer';

const window = new JSDOM().window;
const jquery = jqueryLib(window);

global.DOMParser = new JSDOM().window.DOMParser

//Basic front-end scrapping
export async function clientGetExternalHTML(url) {
    try {
        let fetchResult = await fetch(url);
        let html = await fetchResult.text();
        console.log(html);
        let parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');

    } catch(e) {
        return null;
    }
}

//Backend scrapping
export async function serverGetExternalHTML(externalUrl, frameSelectors = null, getDocumentURL = false) {
    console.log("scrapping...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let parser = new DOMParser();
    let returnString = "";

    await page.goto(externalUrl);
    if (frameSelectors) {
        let firstFrame = null;
        let lastFrame = null;
        for (let i=0; i < frameSelectors.length; i++) {
            let frame = null;
            if (!firstFrame) {
                frame = await page.waitForSelector(frameSelectors[i]);
                firstFrame = frame;
            } else {
                let frameHandle = await lastFrame.contentFrame();
                frame = await frameHandle.waitForSelector(frameSelectors[i]);
            }
            lastFrame = frame;
        }
        const frameFather = await page.$(frameSelectors[0]);
        const frameContent = await frameFather.contentFrame();


        if (getDocumentURL) {
            returnString = await frameContent.evaluate(() => document.URL);
        } else {
            const frameHTMLString = await frameContent.content();
            returnString = frameHTMLString;
        }
    } else {
        const htmlContent = await page.content();
        //htmlDOM = parser.parseFromString(htmlContent, 'text/html');
        returnString = htmlContent;
    }
    //console.log(htmlContent);
    await browser.close();
    console.log("scrapping ended..");

    return returnString;
}

export async function getURLVideoFromFlixHQ(urlVideo) {
    const docElements = await serverGetExternalHTML(urlVideo, ["div#mask-player iframe"], true);
    console.log(docElements);
    return docElements;
}

getURLVideoFromFlixHQ('https://flixhq.ws/movie/napoleon-43049/');
