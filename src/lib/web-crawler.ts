import axios, {AxiosInstance, AxiosResponse} from "axios";
import * as https from "https";

export class WebCrawler {
    private readonly url: string;
    private readonly callback: (response: AxiosResponse) => void;
    private axiosInstance: AxiosInstance;

    constructor(url: string, callback: (response: AxiosResponse) => void) {
        this.url = url;
        this.callback = callback;

        this.axiosInstance = axios.create({
            timeout: 60000, //optional
            httpsAgent: new https.Agent({ keepAlive: true }),
            headers: {'Content-Type':'application/xml'}
        })
    }

    public run() {
        return this.axiosInstance.get(this.url).then((res: AxiosResponse) => {
            this.callback(res);
        }).catch(ex => console.error(ex))
    }
}
