import config from "./../../../json/bybit.config.json";
import * as datatype from "../datatype";
import fetch from 'node-fetch';
import { HmacSHA256, SHA256, enc } from 'crypto-js';

export async function buildSig(inputKeys: datatype.account.keyInfo, param: any, time: string, key: string, recvWindow: string) {
    return HmacSHA256(`${time}${key}${recvWindow}${JSON.stringify(param)}`, inputKeys.privateKey);
}

export async function fetchTime() {
    const requestURL = `${config.api.utils.baseURLTest}${config.api.utils.time}`;

    const response = await fetch(requestURL);
    const result = await response.json();

    return result.result.timeNano.slice(0, 13);
}