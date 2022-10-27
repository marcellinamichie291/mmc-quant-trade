export type tradeOrderInfo = {
    symbol: string;
    side: string;
    type: string;
    timeInForce: string | null;
    quantity: number | null;
    quoteOrderQty: number | null;
    price: number | null;
    newClientOrderId: string | null;
    stopPrice: number | null;
    trailingDelta: number | null;
    icebergQty: number | null;
    newOrderRespType: string | null;
    strategyId: number | null;
    strategyType: number | null;
    recvWindow: number | null;
    timestamp: number;
}

export type tradeOrderReceipt = {
    symbol: string,
    orderId: number,
    orderListId: number,
    clientOrderId: string,
    transactTime: number,
    price: string,
    origQty: string,
    executedQty: string,
    cummulativeQuoteQty: string,
    status: string,
    timeInForce: string,
    type: string,
    side: string,
    strategyId: number,
    strategyType: number,
    fills: sigleOrder[]
}

export type sigleOrder = {
    price: string,
    qty: string,
    commission: string,
    commissionAsset: string,
    tradeId: number
}

export enum side {
    SELL = "SELL", 
    BUY = "BUY"
}

export enum orderType {
    LIMIT = "LIMIT", 
    MARKET = "MARKET", 
    STOP = "STOP", 
    TAKE_PROFIT = "TAKE_PROFIT", 
    STOP_MARKET = "STOP_MARKET", 
    TAKE_PROFIT_MARKET = "TAKE_PROFIT_MARKET", 
    TRAILING_STOP_MARKET = "TRAILING_STOP_MARKET"
}

export enum newOrderRespType {
    ACK = "ACK", 
    RESULT = "RESULT"
}