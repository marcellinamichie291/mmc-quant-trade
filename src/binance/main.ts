import config from "./../../json/binance.config.json";
import * as utils from "./utils/utils";
import * as datatype from "./datatype";
import * as tradeUtils from "./trade";
import * as accountInfo from "./account/accountInfo";
import * as marketInfo from "./market/marketInfo";

async function arbitrageFootball() {
    const symbol = "FOOTBALLUSDT";
    const premium = await marketInfo.getPremium(symbol);
    console.log(premium);
    if (premium > 0.5) {
        const footballIndex = await marketInfo.getIndexInfo(symbol);
        // Buy Fiat of FOOTBALLUSDT
        for(let i=0; i<footballIndex.baseAssetList.length; i++) {
            await tradeUtils.tradeFiat.marketOrderTradeTest({
                symbol: footballIndex.baseAssetList[i].baseAsset+footballIndex.baseAssetList[i].quoteAsset,
                side: datatype.tradeFiat.side.BUY,
                quantity: Math.round((config.parameter.defaultOrderSize*footballIndex.baseAssetList[i].weightInQuantity + Number.EPSILON) * 10) / 10,
                timestamp: await utils.fetchTime()
            });
        }

        // Short Order FOOTBALLUSDT
        await tradeUtils.tradeUFuture.marketOrderTradeTest({
            symbol: symbol,
            side: datatype.tradeUFuture.side.BUY,
            quantity: config.parameter.defaultOrderSize,
            timestamp: await utils.fetchTime(),
            positionSide: datatype.tradeUFuture.positionSide.SHORT
        });
    }   
}

arbitrageFootball();