import {runPasteBinCrawler} from "./index";
import axios from "axios";
import AxiosMockAdapter from 'axios-mock-adapter';
import * as fs from 'fs';
const path = require("path");

function readHTMLFile(fileName: string) {
    const file = path.join(__dirname, fileName);
    const pasteBinMock = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'});
    return pasteBinMock;
}

describe('Component tests',() => {
    const axiosMock = new AxiosMockAdapter(axios);
    beforeAll(() => {
        axiosMock.resetHistory();
        const pasteBinMock = readHTMLFile("../__mocks__/pasteBinMock.html");
        const paste1Mock = readHTMLFile("../__mocks__/paste1Mock.html");
        const paste2Mock = readHTMLFile("../__mocks__/paste2Mock.html");

        axiosMock.onGet(/.*pastebin.com/)
            .replyOnce(200, pasteBinMock)
            .onGet(/.*b4q9rs0p/).replyOnce(200,paste1Mock)
            .onGet(/.*T31EJLft/).replyOnce(200,paste2Mock);

    });
    it('should run PasteBin Crawler', async () => {
        await runPasteBinCrawler();
        expect(axiosMock.history.get.length).toBe(3);
        expect(axiosMock.history.get[0].url).toBe("https://pastebin.com")
        expect(axiosMock.history.get[1].url).toBe("https://pastebin.com/b4q9rs0p")
        expect(axiosMock.history.get[2].url).toBe("https://pastebin.com/T31EJLft")
    })
})
