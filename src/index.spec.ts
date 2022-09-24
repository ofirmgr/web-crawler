import {runPasteBinCrawler} from "./index";
import axios from "axios";
import AxiosMockAdapter from 'axios-mock-adapter';
const pasteBinMock = jest.mock('../__mocks__/pasteBinMock.html')
describe('Component tests',() => {
    const axiosMock = new AxiosMockAdapter(axios);
    beforeAll(() => {
        axiosMock.onGet(/.*pastebin.com.*/).reply(200, pasteBinMock);
    });
    it('should run PasteBin Crawler', async () => {
        await runPasteBinCrawler();
        expect(axiosMock.history.get.length).toBe(1)
    })
})
