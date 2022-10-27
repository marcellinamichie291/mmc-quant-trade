"use strict"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB, Lambda } from "aws-sdk";
import * as binance from "../../../binance";

const asyncLambdaInvoke = async (data: {functioName: string, payload: any}) => {
    const lambda = new Lambda({
        apiVersion: "latest",
        endpoint: `lambda.${process.env.AWS_REGION_MMC}.amazonaws.com`
    });
    console.log(data.payload);
    const FunctionName = `${process.env.SERVERLESS_SERVICE_NAME}-${process.env.STAGE}-${data.functioName}`;
    console.log(process.env.AWS_REGION_MMC);
    console.log(`Invoking Function: ${FunctionName}`);
    const result = await lambda
    .invoke({
        FunctionName,
        InvocationType: "Event",
        Payload: JSON.stringify(data.payload)
    })
    .promise();
    console.log(`${FunctionName} Invoked`, result);
};

export const fetchPremium = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.log(event);

    // update function
    try {
        let result = "Empty";
        const maxCount = 60;
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

        for (let i=0; i<maxCount; i++) {
            const beginTime = new Date().getTime();
            console.log(`Begin Time(${i}): `, beginTime);
            const premium = await binance.market.marketInfo.getPremium(process.env.SYMBOL);
            const endTime = new Date().getTime();
            console.log(`End Time(${i}): `, endTime);
            console.log(`Time Passed(${i}): `, endTime - beginTime);
            await sleep(1000);
            const sleepTime = new Date().getTime();
            console.log(`Slept Time(${i}): `, sleepTime);
            console.log(`Time Passed(${i}): `, sleepTime - endTime);

            if (premium > 0.5) {
                result = "Pump";
                await asyncLambdaInvoke({functioName: "exeOrder", payload: result});
                console.log(`(${i})LFG! Premium is `, premium);
            } else if (premium < -0.5) {
                result = "Dump";
                await asyncLambdaInvoke({functioName: "exeOrder", payload: result});
                console.log(`(${i})To the Hell! Premium is `, premium);
            } else {
                result = "Sleep";
                console.log(`(${i})Go to Sleep! Premium is `, premium);
            }
            
            const timestamp = new Date().getTime();
            const dynamoDb = new DynamoDB.DocumentClient();
            const params = {
                TableName: process.env.AWS_DYNAMODB_TABLE_NAME_FOOTBALLPREMIUM,
                Item: {
                timestamp: timestamp,
                symbol: process.env.SYMBOL,
                premium: premium,
                trigger: result
                },
            };

            const response = await dynamoDb.put(params).promise();
            console.log(response);
        }

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