import * as cheerio from "cheerio";
import {Element} from "cheerio";
import {WebCrawler} from "./web-crawler";
import {extractPasteDetails} from "./utils/extract-utils";
import {Paste} from "./Interfaces/Paste";
import moment from "moment-timezone";
import {generateFile, generateOutputFolder} from "./utils/file-utils";
import {normalizeNameOrTitle, stripTrailingSpaces} from "./utils/string-utils";
import {sendToMongoDB} from "./utils/db-utils";

export function createPasteCrawler(item: Element, timestamp: string, baseUrl: string) {
    return new WebCrawler(`${baseUrl}${item.attribs.href}`
        , async function (response) {
            const $ = cheerio.load(response.data);

            const {title, username, dateStr, content} = extractPasteDetails($);

            const paste: Paste = {
                title: normalizeNameOrTitle(title),
                author: normalizeNameOrTitle(username),
                date: moment.tz(dateStr, 'dddd Do [of] MMMM YYYY hh:mm:ss a [CDT]', "America/Chicago").toDate(),
                content: stripTrailingSpaces(content)
            }

            const targetDir = await generateOutputFolder(timestamp);

            generateFile(paste, targetDir);
            return await sendToMongoDB(paste);
        });
}

export function createPasteBinParentCrawler(baseUrl: string) {
    return new WebCrawler(baseUrl, async function (response) {
        const $ = cheerio.load(response.data);
        const elements = $('li a', 'ul.sidebar__menu') // find hrefs of pastes

        const timestamp = new Date().getTime().toString(); // folder name for output - different for each run
        const promiseArr = [];
        for (const item of elements) {
            const pasteCrawler = createPasteCrawler(item, timestamp, baseUrl);
            promiseArr.push(pasteCrawler.run()); // collect all crawlers to run in parallel
        }
        return await Promise.allSettled(promiseArr);
    });
}
