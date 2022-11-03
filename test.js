const crypto = require('crypto');
const axios = require('axios');

url='https://api-testnet.bybit.com';

var apiKey = "mzOFkGcZIbIpLkzp7K";
var secret = "ZauwHiMZAtzMgsFbPWsYzbIyw14BgMdJX8nz";
var recvWindow = 5000;
var timestamp = Date.now().toString();


//1666254673065mzOFkGcZIbIpLkzp7K5000{"symbol":"BTCUSDT","orderType":"Limit","side":"Buy","qty":"0.001","price":"10000","timeInForce":"GoodTillCancel","position_idx":"1"}
//1666254673065mzOFkGcZIbIpLkzp7K5000{"symbol":"BTCUSDT","orderType":"Limit","side":"Buy","qty":"0.001","price":"10000","timeInForce":"GoodTillCancel","position_idx":"1"}

function getSignature(parameters, secret) {
    console.log(timestamp + apiKey + recvWindow + parameters);
    return crypto.createHmac('sha256', secret).update(timestamp + apiKey + recvWindow + parameters).digest('hex');
}

async function http_request(endpoint,method,data,Info) {
    var sign=getSignature(data,secret);
    console.log(sign);
    if(method=="POST")
    {
        fullendpoint=url+endpoint;
    }
    else{
        fullendpoint=url+endpoint+"?"+data;
        data="";
    }
    //endpoint=url+endpoint
    console.log(data);
    var config = {
      method: method,
      url: fullendpoint,
      headers: { 
        'X-BAPI-SIGN-TYPE': '2', 
        'X-BAPI-SIGN': sign, 
        'X-BAPI-API-KEY': apiKey, 
        'X-BAPI-TIMESTAMP': timestamp, 
        'X-BAPI-RECV-WINDOW': '5000', 
        'Content-Type': 'application/json; charset=utf-8'
      },
      data : data
    };

    console.log(data);
    console.log(Info + " Calling....");
    await axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

//Create Order
async function TestCase()
{
endpoint="/contract/v3/private/order/create"
const orderLinkId = crypto.randomBytes(16).toString("hex");
var data = '{"symbol":"BTCUSDT","orderType":"Limit","side":"Buy","qty":"0.001","price":"10000","timeInForce":"GoodTillCancel","position_idx":"1"}';
await http_request(endpoint,"POST",data,"Create");

//Get unfilled Order List
endpoint="/contract/v3/private/order/unfilled-orders"
var data = 'symbol=BTCUSDT&orderStatus=New&orderLinkId=' + orderLinkId;
await http_request(endpoint,"GET",data,"Unfilled Order List");

//Cancel order
endpoint="/contract/v3/private/order/cancel"
var data = '{"symbol": "BTCUSDT","orderLinkId":"' +  orderLinkId +'"}';
await http_request(endpoint,"POST",data,"Cancel");
}

//Create, List and Cancel Orders
TestCase()