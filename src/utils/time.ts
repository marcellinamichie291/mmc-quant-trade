import fetch from 'node-fetch';
import config from "../../json/rest.config.json";

function genReqURL(dex: string) {
    if (dex == "BINANCE") {
        return `${config.binance.baseURL}${config.binance.utils.time}`;
    } else if (dex == "BYBIT") {
        return `${config.bybit.baseURLTest}${config.bybit.utils.time}`;
    } else if (dex == "BINGX") {
        return `${config.bingx.baseURL}${config.bingx.utils.time}`;
    }
}

export async function fetchTime(dex: string) {
    const requestURL = genReqURL(dex);
    const response = await fetch(requestURL);
    const result = await response.json();
    if (dex == "BINANCE") {
        return result.serverTime;
    } else if (dex == 'BYBIT') {
        return result.result.timeNano.slice(0, 13);
    } else if (dex == 'BINGX'){
        return result.data.currentTime;
    } else {
        return Date.now().toString();
    }
}