# Pastebin crawler
This code uses simple web crawler to crawl the site: https://pastebin.com/ and store the most recent "pastes" in a structured data model.

## Installing
```bash
$ npm install
```

## Running
```bash
$ npm run start
```

## Output
The files will be saved to 'output/' folder in the project base with sub folder of timestamp - this allows multiple runs without file override.

The filename is a hash calculation of the paste object.

Filename for example: web-crawler/output/1663960732372/643543815_


## Docker
Create bridge netwirk to allow to communicate between containers
```bash
$ docker network create -d bridge my-bridge-network
```
Start MongoDB container
```bash
$ docker run --name mongodb -d -p 27017:27017 --network my-bridge-network  mongo
```
Build our web-crawler image from Dockerfile
```bash
$ docker build -t webcrawler .
```
Run our web-crawler container
```bash
$ docker run --network=my-bridge-network -e MONGODB_HOST=mongodb -e MONGODB_PORT=27017 webcrawler:latest
```
