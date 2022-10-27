import 'dotenv/config';
import fetch from 'node-fetch';
import config from "../../../json/bybit.config.json";
import * as datatype from "../datatype";
import * as utils from "../utils/utils";

export async function sendOrder (   
    args: {
        symbol: string,
        side: string,
        positionIdx?: string,
        orderType: string,
        qty: string,
        price?: string,
        triggerDirection?: string,
        triggerPrice?: string,
        triggerBy?: string,
        tpTriggerBy?: string,
        slTriggerBy?: string,
        timeInForce: string,
        orderLinkId?: string,
        takeProfit?: string,
        stopLoss?: string,
        reduceOnly?: boolean,
        closeOnTrigger?: boolean
    })
{
    const traderOrder = args as datatype.tradeDerivatives.tradeOrderInfo;

    const requestURL = `${config.api.derivatives.baseURLTest}${config.api.derivatives.order}`;

    const key = {userKey: process.env.BYBIT_APIKEY, privateKey: process.env.BYBIT_SECRET} as datatype.account.keyInfo;

    const time = await utils.fetchTime();

    const keySig = await utils.buildSig(key, args, time, key.userKey, config.parameter.recvWindow);

    const result = await generalTradeTest(requestURL, key.userKey, time, keySig, traderOrder);
    return result
}

export async function generalTradeTest (
    requestURL: string, 
    userKey: string, 
    time: string, 
    sign: CryptoJS.lib.WordArray, 
    args: any)
{
    try {
        console.log(requestURL);

        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "X-BAPI-SIGN-TYPE": '2',
                "X-BAPI-SIGN": sign.toString(),
                "X-BAPI-API-KEY": userKey,
                "X-BAPI-TIMESTAMP": time,
                "X-BAPI-RECV-WINDOW": config.parameter.recvWindow,
                "Content-Type": 'application/json; charset=utf-8',
            },
            body: JSON.stringify(args)
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