import 'dotenv/config';
import fetch from 'node-fetch';
import config from "../../json/rest.config.json";
import * as datatype from "../datatype";
import * as utils from "../utils";
const qs = require('qs');

export async function getAccountInfo(timestamp: number, recvWindow: number) {
    try {
        const baseURL = `${config.binance.baseFURL}${config.binance.uFuture.accountInfo}`;
        const data = {timestamp: timestamp, recvWindow: recvWindow};

        const key = {userKey: process.env.USER_KEY, privateKey: process.env.PRIVATE_KEY} as datatype.account.keyInfo;
        const keySig = await utils.sign.buildSig(key, qs.stringify(data));
        const requestURL = `${baseURL}?timestamp=${timestamp}&recvWindow=${recvWindow}&signature=${keySig.toString()}`;

        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "X-MBX-APIKEY": key.userKey,
                "Accept": 'application/json',
            },
        });

        // 👇️ const result: GetUsersResponses
        const result = await response.json();

        console.log('result is: ', JSON.stringify(result, null, 4));

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}