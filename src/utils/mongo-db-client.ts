import {Collection, Document, MongoClient} from "mongodb";
import {Paste} from "../Interfaces/Paste";
import {configuration} from "../config/configuration";
import * as dotenv from 'dotenv'
dotenv.config();
export class MongoDbClient {
    clientInstance: MongoClient | undefined;
    dbName: string | undefined;
    collection: Collection<Document> | undefined;
    async init() {
        const {mongodbHost, mongodbPort} = this.getMongodbConnectionParams();
        const url = `mongodb://${mongodbHost}:${mongodbPort}`;
        console.log(`mongodb-url: ${url}`)
        this.clientInstance = new MongoClient(url);
        this.dbName = 'webCrawler';
        await this.clientInstance.connect();
        console.log('Connected successfully to server');
        const db = this.clientInstance.db(this.dbName);
        this.collection = db.collection('pastes');
    }

    private getMongodbConnectionParams() {
        const envConfig = configuration()
        const mongodbHost = envConfig.mongodbHost;
        const mongodbPort = envConfig.mongodbPort;
        return {mongodbHost, mongodbPort};
    }

    async insertDoc(doc: Paste) {
        await this.collection?.insertOne(doc);
    }

}


