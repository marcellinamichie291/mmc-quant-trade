import 'dotenv/config';
import fetch from 'node-fetch';
import config from "../../../json/binance.config.json";
import * as datatype from "../datatype";
import * as utils from "../utils/utils";
const qs = require('qs');

export async function marketOrderTradeTest
(   
    args: {
    symbol: string,
    side: string,
    timestamp: number,
    timeInForce?: string,
    quantity?: number,
    quoteOrderQty?: number,
    price?: number,
    newClientOrderId?: string,
    stopPrice?: number,
    trailingDelta?: number,
    icebergQty?: number,
    newOrderRespType?: string,
    strategyId?: number,
    strategyType?: number,
    recvWindow?: number,
}) 
{
    const traderOrder = 
    {
        symbol: args.symbol,
        side: args.side,
        type: datatype.tradeFiat.orderType.MARKET,
        timeInForce: args.timeInForce,
        quantity: args.quantity,
        quoteOrderQty: args.quoteOrderQty,
        price: null,
        newClientOrderId: args.newClientOrderId,
        stopPrice: args.stopPrice,
        trailingDelta: args.trailingDelta,
        icebergQty: args.icebergQty,
        newOrderRespType: args.newOrderRespType,
        strategyId: args.strategyId,
        strategyType: args.strategyType,
        recvWindow: args.recvWindow,
        timestamp: args.timestamp
    } as datatype.tradeFiat.tradeOrderInfo;

    const baseURL = `${config.api.fiat.baseURL}${config.api.fiat.testOrder}`;

    const key = {userKey: process.env.USER_KEY, privateKey: process.env.PRIVATE_KEY} as datatype.account.keyInfo;
    const keySig = await utils.buildSig(key, qs.stringify(traderOrder, { skipNulls: true }));
    const requestURL = await generateReqURL(baseURL, traderOrder, keySig.toString());

    const result = await generalTradeTest(requestURL, key.userKey);
    return result
}

export async function generateReqURL
(
    baseURL: string, 
    tradeOrderInfo: datatype.tradeFiat.tradeOrderInfo,
    keySig: string
) 
{
    if (tradeOrderInfo.symbol == null) {
        throw new Error('Symbol is empty');
    }

    if (tradeOrderInfo.side == null) {
        throw new Error('Side is empty');
    }

    baseURL += `?symbol=${tradeOrderInfo.symbol}&side=${tradeOrderInfo.side}`;

    if (tradeOrderInfo.type == null) {
        throw new Error('Type is empty');
    }

    baseURL += `&type=${tradeOrderInfo.type}`;

    if (tradeOrderInfo.timeInForce) {
        baseURL += `&timeInForce=${tradeOrderInfo.timeInForce}`;
    }

    if (tradeOrderInfo.quantity) {
        baseURL += `&quantity=${tradeOrderInfo.quantity}`;
    }

    if (tradeOrderInfo.quoteOrderQty) {
        baseURL += `&quoteOrderQty=${tradeOrderInfo.quoteOrderQty}`;
    }

    if (tradeOrderInfo.price) {
        baseURL += `&price=${tradeOrderInfo.price}`;
    }

    if (tradeOrderInfo.newClientOrderId) {
        baseURL += `&newClientOrderId=${tradeOrderInfo.newClientOrderId}`;
    }

    if (tradeOrderInfo.stopPrice) {
        baseURL += `&stopPrice=${tradeOrderInfo.stopPrice}`;
    }

    if (tradeOrderInfo.trailingDelta) {
        baseURL += `&trailingDelta=${tradeOrderInfo.trailingDelta}`;
    }

    if (tradeOrderInfo.icebergQty) {
        baseURL += `&icebergQty=${tradeOrderInfo.icebergQty}`;
    }

    if (tradeOrderInfo.newOrderRespType) {
        baseURL += `&newOrderRespType=${tradeOrderInfo.newOrderRespType}`;
    }

    if (tradeOrderInfo.strategyId) {
        baseURL += `&strategyId=${tradeOrderInfo.strategyId}`;
    }

    if (tradeOrderInfo.strategyType) {
        baseURL += `&strategyType=${tradeOrderInfo.strategyType}`;
    }

    if (tradeOrderInfo.recvWindow) {
        baseURL += `&recvWindow=${tradeOrderInfo.recvWindow}`;
    }

    if (tradeOrderInfo.timestamp == null) {
        throw new Error('Type is empty');
    }

    baseURL += `&timestamp=${tradeOrderInfo.timestamp}`;

    if (keySig === null) {
        throw new Error('Key Signature is empty');
    }

    baseURL += `&signature=${keySig}`;

    return baseURL;
}

export async function generalTradeTest(requestURL: string, userKey: string)
{
    try {
        console.log(requestURL);
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "X-MBX-APIKEY": userKey,
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