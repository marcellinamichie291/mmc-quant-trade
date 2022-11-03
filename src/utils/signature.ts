import * as datatype from "../datatype";
import {createHmac} from 'crypto'
const qs = require('qs');
import { HmacSHA256, SHA256, enc } from 'crypto-js';

function alphabeticalSort(a: string, b: string) {
    return a.localeCompare(b);
}

function genPrehash(time: string, method: string, order: datatype.trade.futureOrder) {
    const metadata = order.info.metadata;
    
    if (metadata.dex == 'BINANCE') {
        const params = order.info.params as datatype.trade.orderParamsBinance;
        params.timestamp = time;
        return qs.stringify(params, { skipNulls: true });
    } else if (metadata.dex == 'BYBIT') {
        return time + order.info.metadata.apiKey + order.info.metadata.recvWindow + JSON.stringify(order.info.params);
    } else if (metadata.dex == 'BITGET') {
        return String(time) + method + metadata.apiGateway + JSON.stringify(order.info.params)
    } else if (metadata.dex == 'BINGX') {
        const params = order.info.params as datatype.trade.orderParamsBingX;
        params.timestamp = time;
        return method + metadata.apiGateway + qs.stringify(params, { sort: alphabeticalSort, skipNulls: true });
    } else if (metadata.dex == 'WOOX') {
        String(time) + method + metadata.apiGateway + JSON.stringify(order.info.params)
    }
}

export async function buildSig(method: string, order: datatype.trade.futureOrder, time?: string) {
    const preHash = genPrehash(time, method, order);
    const mac = createHmac('sha256', order.info.metadata.secret);
    const preHashToMacBuffer = mac.update(preHash).digest();
    return preHashToMacBuffer
}