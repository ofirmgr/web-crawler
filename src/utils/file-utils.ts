import Path from "path";
import fs from "fs";
import {Paste} from "../Interfaces/Paste";
import {hashCode} from "./string-utils";

export async function generateOutputFolder(timestamp: string) {
    const baseOutputFolder = `${__dirname}/../../output/`;
    const targetDir = Path.join(baseOutputFolder, timestamp)
    await fs.promises.mkdir(targetDir, {recursive: true})
    return targetDir;
}

export function generateFile(paste: Paste, targetDir: string) {
    const pasteStr = JSON.stringify(paste, null, 4); // pretty json stringify
    const fileName = hashCode(pasteStr); // use hash to prevent duplicate name
    fs.writeFile(`${targetDir}/${fileName}`, pasteStr, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}
