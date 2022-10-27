import 'dotenv/config';
import * as trade from "./trade";

async function execOrder () 
{
    trade.tradeDerivatives.sendOrder({"symbol":"BTCUSDT","orderType":"Limit","side":"Buy","qty":"0.001","price":"10000","timeInForce":"ImmediateOrCancel","positionIdx":"1"});
}

execOrder();