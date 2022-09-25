import 'dotenv/config';
import fetch from 'node-fetch';
import config from "../../../json/binance.config.json";
import * as datatype from "../datatype";
import * as utils from "../utils/utils";
const qs = require('qs');

export async function limitOrderTradeTest () {

}

export async function marketOrderTradeTest
(   
    args: {
    symbol: string, 
    side: string, 
    quantity: number,
    timestamp: number,
    positionSide?: string,
    reduceOnly?: string,
    newClientOrderId?: string,
    stopPrice?: number,
    closePosition?: string,
    activationPrice?: number,
    callbackRate?: number,
    timeInForce?: string,
    workingType?: number,
    priceProtect?: string,
    newOrderRespType?: string,
    recvWindow?: number,
}) 
{
    const traderOrder = 
    {
        symbol: args.symbol,
        side: args.side,
        positionSide: args.positionSide,
        type: datatype.tradeUFuture.orderType.MARKET,
        reduceOnly: args.reduceOnly,
        quantity: args.quantity,
        price: null,
        newClientOrderId: args.newClientOrderId,
        stopPrice: args.stopPrice,
        closePosition: args.closePosition,
        activationPrice: args.activationPrice,
        callbackRate: args.callbackRate,
        timeInForce: args.timeInForce,
        workingType: args.workingType,
        priceProtect: args.priceProtect,
        newOrderRespType: args.newOrderRespType,
        recvWindow: args.recvWindow,
        timestamp: args.timestamp
    } as datatype.tradeUFuture.tradeOrderInfo;

    const baseURL = `${config.api.uFuture.baseURL}${config.api.uFuture.testOrder}`;

    const key = {userKey: process.env.USER_KEY, privateKey: process.env.PRIVATE_KEY} as datatype.account.keyInfo;
    const keySig = await utils.buildSig(key, qs.stringify(traderOrder, { skipNulls: true }));
    const requestURL = await generateReqURL(baseURL, traderOrder, keySig.toString());

    await generalTradeTest(requestURL, key.userKey);
}

export async function stopOrderTradeTest() {
    
}

export async function takeProfitOrderTradeTest() {
    
}

export async function stopMarketOrderTradeTest() {
    
}

export async function takeProfitMarketOrderTradeTest() {
    
}

export async function trailingStopOrderTradeTest() {
    
}

export async function generateReqURL
(
    baseURL: string, 
    tradeOrderInfo: datatype.tradeUFuture.tradeOrderInfo,
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

    if (tradeOrderInfo.positionSide) {
        baseURL += `&positionSide=${tradeOrderInfo.positionSide}`;
    }

    if (tradeOrderInfo.type == null) {
        throw new Error('Type is empty');
    }

    baseURL += `&type=${tradeOrderInfo.type}`;

    if (tradeOrderInfo.reduceOnly) {
        baseURL += `&reduceOnly=${tradeOrderInfo.reduceOnly}`;
    }

    if (tradeOrderInfo.quantity) {
        baseURL += `&quantity=${tradeOrderInfo.quantity}`;
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

    if (tradeOrderInfo.closePosition) {
        baseURL += `&closePosition=${tradeOrderInfo.closePosition}`;
    }

    if (tradeOrderInfo.activationPrice) {
        baseURL += `&activationPrice=${tradeOrderInfo.activationPrice}`;
    }

    if (tradeOrderInfo.callbackRate) {
        baseURL += `&callbackRate=${tradeOrderInfo.callbackRate}`;
    }

    if (tradeOrderInfo.timeInForce) {
        baseURL += `&timeInForce=${tradeOrderInfo.timeInForce}`;
    }

    if (tradeOrderInfo.workingType) {
        baseURL += `&workingType=${tradeOrderInfo.workingType}`;
    }

    if (tradeOrderInfo.priceProtect) {
        baseURL += `&priceProtect=${tradeOrderInfo.priceProtect}`;
    }

    if (tradeOrderInfo.newOrderRespType) {
        baseURL += `&newOrderRespType=${tradeOrderInfo.newOrderRespType}`;
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