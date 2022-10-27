import config from "./../../../json/binance.config.json";
import * as datatype from "../datatype";
import fetch from 'node-fetch';
import { HmacSHA256, SHA256, enc } from 'crypto-js';
    
export async function buildSig(inputKeys: datatype.account.keyInfo, data: any) {
    console.log(data);
    return HmacSHA256(data, inputKeys.privateKey);
}

export async function fetchTime() {
    const requestURL = `${config.api.utils.baseURL}${config.api.utils.time}`;

    const response = await fetch(requestURL);
    const result = await response.json();

    return parseInt(result.serverTime);
}