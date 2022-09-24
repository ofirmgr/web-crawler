import {CheerioAPI} from "cheerio";

export function extractPasteDetails($: CheerioAPI) {
    const title = $('h1', '.info-top').text();
    const username = $('a', '.username').text();
    const dateStr = $('span[title]', '.info-bottom')[0].attribs.title;
    const content = $('.source', '.highlighted-code').text();
    return {title, username, dateStr, content};
}
