'use strict';

const express = require("express");
const fs = require("fs");
const { handleAny } = require("./handlers")

const path = process.env.config || './config.json';
const app = express();

if (!fs.existsSync(path)) {
    console.error(`Cannot find file "${path}".`);
    return 1;
}

let data = null;
try {
    data = fs.readFileSync(path);
} catch (e) {
    console.error(`Cannot read file "${path}": ${e}.`);
    return 1;
}

let config;
try {
    config = JSON.parse(data);
} catch (e) {
    console.error(`Cannot parse json: ${e}.`);
    return 1;
}

const port = process.env.config || config.port || 3000;

if (config.endpoints == undefined) {
    console.error(`Config doesn't expose "endpoints" field'.`);
    return 1;
}


for (let [ep, epconfig] of Object.entries(config.endpoints)) {
    const method = epconfig.method || "get";
    if (method == "get")
        app.get(ep, function (req, res) {
            handleAnySecured(req, res, epconfig);
        });
    else if (method == "post")
        app.post(ep, function (req, res) {
            handleAnySecured(req, res, epconfig);
        });
    else if (method == "put")
        app.put(ep, function (req, res) {
            handleAnySecured(req, res, epconfig);
        });
    else if (method == "delete")
        app.delete(ep, function (req, res) {
            handleAnySecured(req, res, epconfig);
        });
    else {
        console.error(`Unknown method ${method}'.`);
        return 1;
    }
}

app.listen(port, function () {
    console.log(`Listening on port ${port} (try it on http://localhost:${port} ?)!`);
});