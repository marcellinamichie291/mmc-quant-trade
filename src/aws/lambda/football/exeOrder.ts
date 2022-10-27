"use strict"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import * as binance from "../../../binance";

const putFiatReceipt = async (data: binance.datatype.tradeFiat.tradeOrderReceipt) => {
  const timestamp = new Date().getTime();
  const dynamoDb = new DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE_NAME_FOOTBALLORDER,
    Item: {
      orderId: data.orderId,
      symbol: data.symbol,
      price: data.price,
      origQty: data.origQty,
      executedQty: data.executedQty,
      cumQuote: data.cummulativeQuoteQty,
      type: data.type,
      side: data.side,
      updateTime: data.transactTime,
      updatedAt: timestamp,
    },
  };

  const response = await dynamoDb.put(params).promise()
  console.log(response)
}

const putUFutureReceipt = async (data: binance.datatype.tradeUFuture.tradeOrderReceipt) => {
  const timestamp = new Date().getTime();
  const dynamoDb = new DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE_NAME_FOOTBALLORDER,
    Item: {
      orderId: data.orderid,
      symbol: data.symbol,
      price: data.price,
      avgPrice: data.avgPrice,
      origQty: data.origQty,
      executedQty: data.executedQty,
      cumQuote: data.cumQuote,
      type: data.type,
      side: data.side,
      updateTime: data.updateTime,
      updatedAt: timestamp,
    },
  };

  const response = await dynamoDb.put(params).promise()
  console.log(response)
}

const trade = async (data: {fiatSide: string, uFutureSide: string, uFuturePositionSide: string}) => {
  // Retrieve Index Info 
  const footballIndex = await binance.market.marketInfo.getIndexInfo(process.env.SYMBOL);

  // Buy Fiat of FOOTBALLUSDT
  for(let i=0; i<footballIndex.baseAssetList.length; i++) {
      const fiatResult = 
      await binance.trade.tradeFiat.marketOrderTradeTest({
        symbol: footballIndex.baseAssetList[i].baseAsset+footballIndex.baseAssetList[i].quoteAsset,
        side: data.fiatSide,
        quantity: Math.round((parseFloat(process.env.ORDER_SIZE)*footballIndex.baseAssetList[i].weightInQuantity + Number.EPSILON) * 10) / 10,
        timestamp: await binance.utils.fetchTime()
      }) as binance.datatype.tradeFiat.tradeOrderReceipt;
      await putFiatReceipt(fiatResult);
  }

  // Short Order FOOTBALLUSDT
  const futureResult = 
  await binance.trade.tradeUFuture.marketOrderTradeTest({
    symbol: process.env.SYMBOL,
    side: data.uFutureSide,
    quantity: parseFloat(process.env.ORDER_SIZE),
    timestamp: await binance.utils.fetchTime(),
    positionSide: data.uFuturePositionSide
  }) as binance.datatype.tradeUFuture.tradeOrderReceipt;
  await putUFutureReceipt(futureResult);
}

export const exeOrder = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  if (event.body == "Pump") {
    await trade({fiatSide: binance.datatype.tradeUFuture.side.BUY, 
                 uFutureSide: binance.datatype.tradeFiat.side.BUY, 
                 uFuturePositionSide: binance.datatype.tradeUFuture.positionSide.SHORT})
  } else if (event.body == "Dump") {
    await trade({fiatSide: binance.datatype.tradeUFuture.side.SELL, 
                 uFutureSide: binance.datatype.tradeFiat.side.SELL, 
                 uFuturePositionSide: binance.datatype.tradeUFuture.positionSide.SHORT})
  } 

  // update function
  try {
    // return update successfully message
    return {
      statusCode: 200,
      body: JSON.stringify({
          message: "Token Object Update Successfully!",
      })
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: err.statusCode || 501,
      body: JSON.stringify(
        {
          message: "Error Occured when updating token data!",
          details: err,
        },
        null,
        2
      ),
    }
  }
}