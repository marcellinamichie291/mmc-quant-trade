export type tradeOrderInfo = {
    symbol: string;
    side: string;
    positionSide: string | null;
    type: string;
    reduceOnly: string | null;
    quantity: number | null;
    price: number | null;
    newClientOrderId: string | null;
    stopPrice: number | null;
    closePosition: string | null;
    activationPrice: number | null;
    callbackRate: number | null;
    timeInForce: string | null;
    workingType: number | null;
    priceProtect: string | null;
    newOrderRespType: string | null;
    recvWindow: number | null;
    timestamp: number;
}

export enum side {
    SELL = "SELL", 
    BUY = "BUY"
}

export enum positionSide {
    LONG = "LONG", 
    SHORT = "SHORT"
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

export enum reduceOnly {
    TRUE = "true",
    FALSE = "false"
}

export enum closePosition {
    TRUE = "true",
    FALSE = "false"
}

export enum timeInForce {
    GTC = "GTC", 
    IOC = "IOC", 
    FOK = "FOK", 
    GTX = "GTX"
}

export enum priceProtect {
    TRUE = "true",
    FALSE = "false"
}

export enum newOrderRespType {
    ACK = "ACK", 
    RESULT = "RESULT"
}

export enum workingType {
    MARK_PRICE = "MARK_PRICE", 
    CONTRACT_PRICE = "CONTRACT_PRICE"
}