import 'dotenv/config';
import fetch from 'node-fetch';
import * as datatype from "../../datatype";
import * as utils from "../../utils";

export async function sendOrder (order: datatype.trade.futureOrder) {
    const time = await utils.time.fetchTime(order.info.metadata.dex);
    const sign = await utils.sign.buildSig("POST", order, time);
    return await generalTradeTest(sign, time, order);
}

async function generalTradeTest (
    sign: Buffer,
    time: string,
    order: datatype.trade.futureOrder
) {
    try {
        // 👇️ const result: GetUsersResponses
        const result = await post(order.info.metadata.dex, sign, time, order);
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

async function post(
    dex: string,     
    sign: Buffer,
    time: string,
    order: datatype.trade.futureOrder
) {
    let response: any;
    if (dex == 'BINANCE') {
        const requestURL = generateReqURL(sign.toString('hex'), time, order);
        response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "X-MBX-APIKEY": order.info.metadata.apiKey,
                "Accept": 'application/json',
            },
        });
    } else if (dex == 'BYBIT') {
        const requestURL = order.info.metadata.requestURL;
        response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "X-BAPI-SIGN-TYPE": '2',
                "X-BAPI-SIGN": sign.toString('hex'),
                "X-BAPI-API-KEY": order.info.metadata.apiKey,
                "X-BAPI-TIMESTAMP": time,
                "X-BAPI-RECV-WINDOW": order.info.metadata.recvWindow,
                "Content-Type": 'application/json; charset=utf-8',
            },
            body: JSON.stringify(order.info.params)
        });
    } else if (dex == 'BITGET') {
        const requestURL = order.info.metadata.requestURL;
        response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "ACCESS-KEY": order.info.metadata.apiKey,
                "ACCESS-SIGN": sign.toString('base64'),
                "ACCESS-PASSPHRASE": order.info.metadata.passphrase,
                "ACCESS-TIMESTAMP": time,
                "locale": "en-US",
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(order.info.params)
        });
    } else if(dex == 'BINGX') {
        const requestURL = generateReqURL(encodeURIComponent(sign.toString('base64')), time, order);
        response = await fetch(requestURL, {
            method: 'POST'
        });
    } else if(dex == 'WOOX') {
        const requestURL = order.info.metadata.requestURL;
        response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "ACCESS-KEY": order.info.metadata.apiKey,
                "ACCESS-SIGN": sign.toString('base64'),
                "ACCESS-TIMESTAMP": time,
                "locale": "en-US",
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(order.info.params)
        });
    }
    return await response.json()
}

function generateReqURL (
    sign: string,
    time: string,
    order: datatype.trade.futureOrder,
) {
    let baseURL = order.info.metadata.requestURL;
    if (order.info.metadata.dex == 'BINANCE') {
        const tradeOrderInfo = order.info.params as datatype.trade.orderParamsBinance;
        if (tradeOrderInfo.symbol == null ||
            tradeOrderInfo.side == null ||
            time == null ||
            sign == null) {
            throw new Error('Parameters is empty');
        }
        baseURL += `?symbol=${tradeOrderInfo.symbol}`;
        baseURL += `&side=${tradeOrderInfo.side}`;
        baseURL += tradeOrderInfo.quantity? `&quantity=${tradeOrderInfo.quantity}`:``;
        baseURL += `&type=${tradeOrderInfo.type}`;
        baseURL += tradeOrderInfo.price? `&price=${tradeOrderInfo.price}`:``;
        baseURL += tradeOrderInfo.positionSide? `&positionSide=${tradeOrderInfo.positionSide}`:``;
        baseURL += tradeOrderInfo.reduceOnly? `&reduceOnly=${tradeOrderInfo.reduceOnly}`:``;
        baseURL += tradeOrderInfo.newClientOrderId? `&newClientOrderId=${tradeOrderInfo.newClientOrderId}`:``;
        baseURL += tradeOrderInfo.stopPrice? `&stopPrice=${tradeOrderInfo.stopPrice}`:``;
        baseURL += tradeOrderInfo.closePosition? `&closePosition=${tradeOrderInfo.closePosition}`:``;
        baseURL += tradeOrderInfo.activationPrice? `&activationPrice=${tradeOrderInfo.activationPrice}`:``;
        baseURL += tradeOrderInfo.callbackRate? `&callbackRate=${tradeOrderInfo.callbackRate}`:``;
        baseURL += tradeOrderInfo.timeInForce? `&timeInForce=${tradeOrderInfo.timeInForce}`:``;
        baseURL += tradeOrderInfo.workingType? `&workingType=${tradeOrderInfo.workingType}`:``;
        baseURL += tradeOrderInfo.priceProtect? `&priceProtect=${tradeOrderInfo.priceProtect}`:``;
        baseURL += tradeOrderInfo.newOrderRespType? `&newOrderRespType=${tradeOrderInfo.newOrderRespType}`:``;
        baseURL += tradeOrderInfo.recvWindow? `&recvWindow=${tradeOrderInfo.recvWindow}`:``;
        baseURL += `&timestamp=${time}`;
        baseURL += `&signature=${sign}`;
    } else if (order.info.metadata.dex == 'BINGX') {
        const tradeOrderInfo = order.info.params as datatype.trade.orderParamsBingX;

        if (tradeOrderInfo.symbol == null ||
            tradeOrderInfo.side == null ||
            tradeOrderInfo.entrustVolume == null ||
            tradeOrderInfo.tradeType == null ||
            tradeOrderInfo.action == null ||
            sign == null) {
            throw new Error('Parameters is empty');
        }
    
        baseURL += `?apiKey=${order.info.metadata.apiKey}`;
        baseURL += `&timestamp=${time}`;
        baseURL += `&symbol=${tradeOrderInfo.symbol}`;
        baseURL += `&side=${tradeOrderInfo.side}`;
        baseURL += tradeOrderInfo.entrustPrice? `&entrustPrice=${tradeOrderInfo.entrustPrice}`:`&entrustPrice=0`;
        baseURL += `&entrustVolume=${tradeOrderInfo.entrustVolume}`;
        baseURL += `&tradeType=${tradeOrderInfo.tradeType}`;
        baseURL += `&action=${tradeOrderInfo.action}`;
        baseURL += tradeOrderInfo.takerProfitPrice? `&takerProfitPrice=${tradeOrderInfo.takerProfitPrice}`:``;
        baseURL += tradeOrderInfo.stopLossPrice? `&stopLossPrice=${tradeOrderInfo.stopLossPrice}`:``;
    
        baseURL += `&sign=${sign}`;
    }

    return baseURL;
}