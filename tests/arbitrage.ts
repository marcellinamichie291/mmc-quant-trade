import * as trade from "../src/trade";
import * as datatype from "../src/datatype";
import * as marketInfo from "../src/market/marketInfo";

async function arbitrageFootball() {
    const symbol = "BLUEBIRDUSDT";
    const premium = await marketInfo.getPremium(symbol);
    console.log(premium);
    const index = await marketInfo.getIndexInfo(symbol);
    console.log(index);
    if (premium > 0.5) {
        const footballIndex = await marketInfo.getIndexInfo(symbol);
        // Buy Fiat of FOOTBALLUSDT
        /*for(let i=0; i<footballIndex.baseAssetList.length; i++) {
            await tradeUtils.tradeFiat.marketOrderTradeTest({
                symbol: footballIndex.baseAssetList[i].baseAsset+footballIndex.baseAssetList[i].quoteAsset,
                side: datatype.tradeFiat.side.BUY,
                quantity: Math.round((config.parameter.defaultOrderSize*footballIndex.baseAssetList[i].weightInQuantity + Number.EPSILON) * 10) / 10,
                timestamp: await utils.fetchTime()
            });
        }*/

        // Short Order FOOTBALLUSDT
        const orderBINANCE: datatype.trade.futureOrder = {info: new datatype.trade.futureOrderBinance({symbol:"FOOTBALLUSDT", side:"BUY", quantity:"1", type:"MARKET", positionSide:"SHORT"})};
        await trade.future.order.sendOrder(orderBINANCE);
    }
}

arbitrageFootball();