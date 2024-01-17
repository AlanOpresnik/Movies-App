import { JSDOM } from 'jsdom';
import puppeteer from 'puppeteer';

const window = new JSDOM().window;

global.DOMParser = new JSDOM().window.DOMParser;

// Backend scrapping
export async function serverGetExternalHTML(externalUrl, frameSelectors = null, getDocumentURL = false) {
    console.log("scrapping...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let returnString = "";

    try {
        await page.goto(externalUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Encontrar el enlace con la clase '.film-poster-ahref' y hacer clic en él
        const filmPosterLink = await page.waitForSelector('.film-poster-ahref', { visible: true, timeout: 10000 });
        await filmPosterLink.click();

        // Esperar a que la página se cargue completamente después del clic
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 });

        // Wait for the iframe with id 'iframe-player' to be present in the page
        await page.waitForSelector('#iframe-player', { visible: true, timeout: 10000 });

        // Extract the content of the iframe
        const iframeContent = await page.evaluate(() => {
            const iframeElement = document.querySelector('#iframe-player');
            return iframeElement ? iframeElement.outerHTML : null;
        });

        returnString = iframeContent;
    } catch (error) {
        console.error("Error during scraping:", error);
    } finally {
        await browser.close();
        console.log("scrapping ended..");
    }

    return returnString;
}

// Uso de la función
export const iframeContent = await serverGetExternalHTML('https://flixhq.ws/search?keyword=cars+2');
console.log(iframeContent);