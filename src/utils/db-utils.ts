import {Paste} from "../Interfaces/Paste";
import {MongoDbClient} from './mongo-db-client'

const mongoDbClient =  new MongoDbClient();
mongoDbClient.init();

export async function sendToMongoDB(paste: Paste) {
    mongoDbClient.insertDoc(paste);
}
