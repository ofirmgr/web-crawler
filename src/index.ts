import {createPasteBinParentCrawler} from "./pastebin-crawlers";

runPasteBinCrawler().then(() => {
    setInterval(async () => {
            await runPasteBinCrawler();
        }
        , 1000 * 60 * 2 // run every 2 minutes
    )
});


export async function runPasteBinCrawler() {
    const baseUrl = "https://pastebin.com";
    const pastebinCrawler = createPasteBinParentCrawler(baseUrl);
    await pastebinCrawler.run();
    console.log(`crawler done - time: ${new Date().toISOString()}`)
}


