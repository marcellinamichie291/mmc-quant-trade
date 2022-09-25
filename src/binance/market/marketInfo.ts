import 'dotenv/config';
import fetch from 'node-fetch';
import * as datatype from "../datatype";
import config from "../../../json/binance.config.json";

export async function getIndexInfo(symbol:string) {
    try {
        const baseURL = `${config.api.uFuture.baseURL}${config.api.uFuture.indexInfo}`;
        const requestURL = `${baseURL}?symbol=${symbol}`;

        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
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

export async function getPremium(symbol:string) {
    const footballPremiumIndex = await getPremiumIndexInfo(symbol) as datatype.market.premiumIndexInfo;
    return (footballPremiumIndex.markPrice/footballPremiumIndex.indexPrice - 1)*100;
}

export async function getPremiumIndexInfo(symbol:string) {
    try {
        const baseURL = `${config.api.uFuture.baseURL}${config.api.uFuture.premiumIndexInfo}`;
        const requestURL = `${baseURL}?symbol=${symbol}`;

        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
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

export async function getMulAssetInfo(symbol:string) {
    try {
        const baseURL = `${config.api.uFuture.baseURL}${config.api.uFuture.mulAssetIndex}`;
        const requestURL = `${baseURL}?symbol=${symbol}`;

        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
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