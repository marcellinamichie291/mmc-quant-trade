import 'dotenv/config';
import * as trade from "../src/trade";
import * as datatype from "../src/datatype";

async function execOrder () 
{
    const orderBINANCE: datatype.trade.futureOrder = {info: new datatype.trade.futureOrderBinance({symbol:"BLUEBIRDUSDT", side:"BUY", quantity:"0.1", type:"MARKET", positionSide:"SHORT"})};
    await trade.future.order.sendOrder(orderBINANCE);

    const orderBYBIT: datatype.trade.futureOrder = {info: new datatype.trade.futureOrderBybit({symbol:"BTCUSDT", side:"Buy", orderType:"Limit", qty:"0.001", price:"10000", timeInForce:"GoodTillCancel", positionIdx:"1"})};
    await trade.future.order.sendOrder(orderBYBIT);

    const orderBITGET: datatype.trade.futureOrder = {info: new datatype.trade.futureOrderBitget({symbol:"BTCUSDT_UMCBL", marginCoin:"USDT", size:"0.01", side:"open_long", orderType:"market", timeInForceValue:"normal"})};
    await trade.future.order.sendOrder(orderBITGET);

    const orderBINGX: datatype.trade.futureOrder = {info: new datatype.trade.futureOrderBingX({symbol:"BTC-USDT", side:"Bid", tradeType:"Market", action:"Open", entrustVolume:10, entrustPrice:0.004})};
    await trade.future.order.sendOrder(orderBINGX);
}

execOrder();