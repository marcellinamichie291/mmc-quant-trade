export type tradeOrderInfo = {
    symbol: string;
    side: string;
    positionIdx: string | null;
    orderType: string;
    qty: string;
    price: string | null;
    triggerDirection: string | null;
    triggerPrice: string | null;
    triggerBy: string | null;
    tpTriggerBy: string | null;
    slTriggerBy: string | null;
    timeInForce: string;
    orderLinkId: string | null;
    takeProfit: string | null;
    stopLoss: string | null;
    reduceOnly: boolean | null;
    closeOnTrigger: boolean | null;
}