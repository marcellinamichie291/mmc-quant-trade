import WebSocket from "ws";
import { resolve } from "path"
import { config as dotenvConfig } from "dotenv"
import config from "../../../json/binance.config.json";

dotenvConfig({ path: resolve(__dirname, "../../../.env") });

type combinedSubscriptionEvent = 
    | subscribeCompositeIndexEvent
    | subscribeMarkPriceEvent;

type subscribeCompositeIndexEvent = {
    stream: string,
    data: compositeIndexData
}

type subscribeMarkPriceEvent = {
    stream: string,
    data: markPriceData
}

type compositeIndexData = {
    e: string,
    E: number,
    s: string,
    p: string,
    C: string,
    c: indexComponent[]
}

type markPriceData = {
    e: string, // Event type
    E: number, // Event time
    s: string, // Symbol
    p: string, // Mark price
    P: string, // Index price
    i: string, // Estimated Settle Price, only useful in the last hour before the settlement starts
    r: string, // Funding rate
    T: number  // Next funding time
}

type indexComponent = {
    b: string,
    q: string,
    w: string,
    W: string,
    i: string
}

function calculateIndexPrice(componentArray: indexComponent[]) {
    let indexPrice = 0;
    for (let i=0; i<componentArray.length; i++){
        indexPrice += parseFloat(componentArray[i].w)*parseFloat(componentArray[i].i);
    }
    return indexPrice;
}

function calculatePremium(data: markPriceData) {
    const markPrice = parseFloat(data.p);
    const indexPrice = parseFloat(data.P);
    return (markPrice/indexPrice - 1)*100;
}

function connect(url: string): void {
    console.log(url);
    const ws = new WebSocket(url);
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onerror = onError;
    ws.onclose = onClose;
}

function onOpen(event: WebSocket.Event): void {
    console.log("connected");
}

function onMessage(event: WebSocket.MessageEvent): void {
    if (typeof event.data === 'string') {
        const result = JSON.parse(event.data) as markPriceData;
        const premium =  calculatePremium(result);
        if (premium > 0.5) {
            console.log(`Current Premium: ${premium} - LFG`);
        } else if (premium < -0.5) {
            console.log(`Current Premium: ${premium} - HELL`);
        } else {
            console.log(`Current Premium: ${premium} - SLEEP`);
        }
    }
}

function onError(event: WebSocket.ErrorEvent): void {
    console.log(JSON.stringify(event.message));
}

function onClose(event: WebSocket.CloseEvent): void {
    console.log(JSON.stringify(event.reason));
}

function subscribeIndex(symbol: string) {
    console.log(process.env.SYMBOL);
    const wsURL = `${config.wss.uFuture.singleBaseURL}/${(process.env.SYMBOL).toLowerCase()}${config.wss.uFuture.markPrice1Sec}`;
    const client = connect(wsURL);
}

const symbol = "FOOTBALLUSDT";
subscribeIndex(symbol);