import 'dotenv/config';
import param from "../../json/param.config.json";
import config from "../../json/rest.config.json";

export type futureOrder = {
    info: futureOrderBinance | 
          futureOrderBybit |
          futureOrderBingX |
          futureOrderBitget |
          futureOrderWooX;
}

interface dexMetadata {
    dex: string;
    apiKey: string;
    secret: string;
    passphrase?: string;
    apiGateway: string;
    requestURL: string;
    recvWindow?: string;
}

export interface orderParamsBinance {
    symbol: string, 
    side: string, 
    quantity: string,
    type: string,
    price?: string,
    positionSide?: string,
    reduceOnly?: string,
    newClientOrderId?: string,
    stopPrice?: string,
    closePosition?: string,
    activationPrice?: string,
    callbackRate?: string,
    timeInForce?: string,
    workingType?: string,
    priceProtect?: string,
    newOrderRespType?: string,
    recvWindow?: string,
    timestamp?: string
}

export class futureOrderBinance {
    metadata: dexMetadata;
    params: orderParamsBinance;

    constructor(
        _args:{
        symbol: string, 
        side: string, 
        quantity: string,
        type: string,
        price?: string,
        positionSide?: string,
        reduceOnly?: string,
        newClientOrderId?: string,
        stopPrice?: string,
        closePosition?: string,
        activationPrice?: string,
        callbackRate?: string,
        timeInForce?: string,
        workingType?: string,
        priceProtect?: string,
        newOrderRespType?: string
    }) {
        this.metadata = {
            dex: 'BINANCE',
            apiKey: process.env.BINANCE_APIKEY,
            secret: process.env.BINANCE_SECRET,
            apiGateway: config.binance.uFuture.orderTest,
            requestURL: config.binance.baseFURL + config.binance.uFuture.orderTest,
        }

        this.params = {
            symbol: _args.symbol, 
            side: _args.side, 
            quantity: _args.quantity,
            type: _args.type,
            price: _args.price,
            positionSide: _args.positionSide,
            reduceOnly: _args.reduceOnly,
            newClientOrderId: _args.newClientOrderId,
            stopPrice: _args.stopPrice,
            closePosition: _args.closePosition,
            activationPrice: _args.activationPrice,
            callbackRate: _args.callbackRate,
            timeInForce: _args.timeInForce,
            workingType: _args.workingType,
            priceProtect: _args.priceProtect,
            newOrderRespType: _args.newOrderRespType,
        }

    }
}

export interface orderParamsBybit {
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
    timeInForce?: string,
    orderLinkId?: string,
    takeProfit?: string,
    stopLoss?: string,
    reduceOnly?: boolean,
    closeOnTrigger?: boolean
}

export class futureOrderBybit {
    metadata: dexMetadata;
    params: orderParamsBybit;

    constructor(
        _args:{
        symbol: string,
        side: string,
        orderType: string,
        qty: string,
        price?: string,
        timeInForce?: string,
        positionIdx?: string
    }) {
        this.metadata = {
            dex: 'BYBIT',
            apiKey: process.env.BYBIT_APIKEY,
            secret: process.env.BYBIT_SECRET,
            apiGateway: config.bybit.futures.order,
            requestURL: config.bybit.baseURLTest + config.bybit.futures.order,
            recvWindow: param.bybit.recvWindow
        }

        this.params = {
            symbol: _args.symbol,
            side: _args.side,
            orderType: _args.orderType,
            qty: _args.qty,
            price: _args.price,
            timeInForce: _args.timeInForce,
            positionIdx: _args.positionIdx,
        }

    }
}

export interface orderParamsBitget {
    symbol: string,
    marginCoin: string,
    size: string,
    price?: string,
    side: string,
    orderType: string,
    timeInForceValue: string,
    clientOid?: string,
    presetTakeProfitPrice?: string,
    presetStopLossPrice?: string
}

export class futureOrderBitget {
    metadata: dexMetadata;
    params: orderParamsBitget;

    constructor(
        _args:{
        symbol: string,
        marginCoin: string,
        size: string,
        side: string,
        orderType: string,
        timeInForceValue: string
    }) {
        this.metadata = {
            dex: 'BITGET',
            apiKey: process.env.BITGET_APIKEY,
            secret: process.env.BITGET_SECRET,
            passphrase: process.env.BITGET_PASSPHRASE,
            apiGateway: config.bitget.futures.order,
            requestURL: config.bitget.baseURL + config.bitget.futures.order
        }

        this.params = {
            symbol: _args.symbol,
            marginCoin: _args.marginCoin,
            size: _args.size,
            side: _args.side,
            orderType: _args.orderType,
            timeInForceValue: _args.timeInForceValue
        }

    }
}

export interface orderParamsBingX {
    symbol: string;
    side: string;
    entrustPrice?: number;
    entrustVolume: number;
    tradeType: string;
    action: string;
    takerProfitPrice?: number;
    stopLossPrice?: number;
    timestamp?: string;
    apiKey?: string;
}

export class futureOrderBingX {
    metadata: dexMetadata;
    params: orderParamsBingX;

    constructor(
        _args:{
        symbol: string, 
        side: string,
        tradeType: string,
        action: string,
        entrustVolume: number,
        entrustPrice: number
    }) {
        this.metadata = {
            dex: 'BINGX',
            apiKey: process.env.BINGX_APIKEY,
            secret: process.env.BINGX_SECRET,
            apiGateway: config.bingx.futures.order,
            requestURL: config.bingx.baseURL + config.bingx.futures.order
        }

        this.params = {
            symbol: _args.symbol,
            side: _args.side,
            tradeType: _args.tradeType,
            action: _args.action,
            entrustVolume: _args.entrustVolume,
            entrustPrice: _args.entrustPrice == null? 0 : _args.entrustPrice,
            apiKey: process.env.BINGX_APIKEY
        }

    }
}

export interface orderParamsWooX {
    symbol: string,
    side: string,
    order_type: string,
    client_order_id?: number,
    order_tag?: string,
    order_price?: number,
    order_quantity?: number,
    order_amount?: number,
    reduce_only?: boolean,
    visible_quantity?: number
}

export class futureOrderWooX {
    metadata: dexMetadata;
    params: orderParamsWooX;

    constructor(
        _args:{
        symbol: string,
        side: string,
        order_type: string,
        client_order_id?: number,
        order_tag?: string,
        order_price?: number,
        order_quantity?: number,
        order_amount?: number,
        reduce_only?: boolean,
        visible_quantity?: number
    }) {
        this.metadata = {
            dex: 'WOOX',
            apiKey: process.env.WOOX_APIKEY,
            secret: process.env.WOOX_SECRET,
            apiGateway: config.woox.futures.order,
            requestURL: config.woox.futures + config.woox.futures.order,
        }

        this.params = {
            symbol: _args.symbol, 
            side: _args.side, 
            order_type: _args.order_type,
            client_order_id: _args.client_order_id,
            order_tag: _args.order_tag,
            order_price: _args.order_price,
            order_quantity: _args.order_quantity,
            order_amount: _args.order_amount,
            reduce_only: _args.reduce_only,
            visible_quantity: _args.visible_quantity
        }

    }
}