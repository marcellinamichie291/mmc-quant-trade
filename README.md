# MMC Quant Trade

### Trade API Parameters List

#### [Binance](#binance)
#### [Bybit](#bybit)
#### [Bitget](#bitget)
#### [BingX](#bingx)
#### [WooX](#woox)

---

#### [Binance](https://binance-docs.github.io/apidocs/futures/cn/#trade-3)
| Parameters | Type  | Required | Description |
| ------------- |----|----|----|
| symbol|STRING|YES|交易对|
|side|ENUM|YES|买卖方向 SELL, BUY|
|positionSide|ENUM|NO|持仓方向，单向持仓模式下非必填，默认且仅可填BOTH;在双向持仓模式下必填,且仅可选择 LONG 或 SHORT|
|type|ENUM|YES|订单类型 LIMIT, MARKET, STOP, TAKE_PROFIT, STOP_MARKET, TAKE_PROFIT_MARKET, TRAILING_STOP_MARKET|
|reduceOnly|STRING|NO|true, false; 非双开模式下默认false；双开模式下不接受此参数； 使用closePosition不支持此参数。|
|quantity|DECIMAL|NO|下单数量,使用closePosition不支持此参数。|
|price|DECIMAL|NO|委托价格|
|newClientOrderId|STRING|NO|用户自定义的订单号，不可以重复出现在挂单中。如空缺系统会自动赋值。必须满足正则规则 ^[\.A-Z\:/a-z0-9_-]{1,36}$|
|stopPrice|DECIMAL|NO|触发价, 仅 STOP, STOP_MARKET, TAKE_PROFIT, TAKE_PROFIT_MARKET 需要此参数|
|closePosition|STRING|NO|true, false；触发后全部平仓，仅支持STOP_MARKET和TAKE_PROFIT_MARKET；不与quantity合用；自带只平仓效果，不与reduceOnly 合用|
|activationPrice|DECIMAL|NO|追踪止损激活价格，仅TRAILING_STOP_MARKET 需要此参数, 默认为下单当前市场价格(支持不同workingType)|
|callbackRate|DECIMAL|NO|追踪止损回调比例，可取值范围[0.1, 5],其中 1代表1% ,仅TRAILING_STOP_MARKET 需要此参数|
|timeInForce|ENUM|NO|有效方法|
|workingType|ENUM|NO|stopPrice 触发类型: MARK_PRICE(标记价格), CONTRACT_PRICE(合约最新价). 默认 CONTRACT_PRICE|
|priceProtect|STRING|NO|条件单触发保护："TRUE","FALSE", 默认"FALSE". 仅 STOP, STOP_MARKET, TAKE_PROFIT, TAKE_PROFIT_MARKET 需要此参数|
|newOrderRespType|ENUM|NO|"ACK", "RESULT", 默认 "ACK"|
|recvWindow|LONG|NO|
|timestamp|LONG|YES|	
#### [Bybit](https://bybit-exchange.github.io/docs/zh-my/derivativesV3/contract/#t-errors)
| Parameters | Type  | Required | Description |
| ------------- |----|----|----|
|symbol|true|string|合約類型|
|side|true|string|方向|
|positionIdx|false|integer|	Position idx, 用於在不同倉位模式下標識倉位。如果是單向持倉模式，該參數為必填: <br> 0-單向持倉 <br> 1-雙向持倉Buy <br> 2-雙向持倉Sell <br>|
|orderType|true|string|委托單價格類型|
|qty|true|string|委託數量. 如果是下USDT永續，則是幣種數量；如果是下反向永續/交割，則是USD數量|
|price|false|string|委托價格。如果是下限價單，該參數為必填. 在沒有倉位時，做多的委托價格需高於市價的10%、低於1百萬。如有倉位時則需優於強平價。價格增減最小單位請參考交易對接口響應中的priceFilter字段|
|triggerDirection|false|integer|用於當前條件委託是看空到triggerPrice時觸發還是看多到triggerPrice觸發。主要是用來標識當前條件單預期的方向：<br> 1：行情價格上漲到triggerPrice時觸發，<br> 2：行情價格下跌到triggerPrice時觸發，<br>|
|triggerPrice|false|string|觸發價格|
|triggerBy|false|string|觸發價格類型|
|tpTriggerBy|false|string|止盈激活價格類型，默認為LastPrice|
|slTriggerBy|false|string|止損激活價格類型，默認為LastPrice|
|timeInForce|true|string|執行策略|
|orderLinkId|false|string|機構自定義訂單ID, 最大長度36位，且同一機構下自定義ID不可重復|
|takeProfit|false|string|止盈價格，僅開倉時生效|
|stopLoss|false|string|止損價格，僅開倉時生效|
|reduceOnly|false|bool|什麽是 reduce-only order?<br>true-平倉<br>false-開倉<br>true時止盈止損設置不生效<br>|
|closeOnTrigger|false|bool|什麽是 close on trigger order? <br> 只會減少您的倉位而不會增加您的倉位。如果當平倉委托被觸發時，賬戶上的余額不足，那麽該合約的其他委托將被取消或者降低委托數量。使用此選項可以確保您的止損單被用於減倉而非加倉。<br>
####  [Bitget](https://bitgetlimited.github.io/apidoc/en/spot/#place-order)
| Parameters | Type  | Required | Description |
| ------------- |----|----|----|
|symbol|String|Yes|Symbol Id|
|side|String|Yes|Trade direction: buy or sell|
|orderType|String|Yes|Order type limit/market|
|force|String|Yes|force|
|price|String|No||Limit pricing, null if orderType is market|
|quantity|String|Yes|Order quantity, base coin|
|clientOrderId|String|No|Custom id length: 40|

####  [BingX](https://github.com/BingX-API/BingX-swap-api-doc/blob/master/%E4%B8%93%E4%B8%9A%E5%90%88%E7%BA%A6API%E6%8E%A5%E5%8F%A3.md?plain=1)
| Parameters | Type  | Required | Description |
| ------------- |----|----|----|
| symbol | String | 是 | 合约名称中需有"-"，如BTC-USDT |
| apiKey | String | 是 | 接口密钥 |
| timestamp | String | 是 | 发起请求的时间戳，单位为毫秒 |
| side | String | 是 | (Bid/Ask 买/卖) |
| entrustPrice | float64 | 是 | 价格  |
| entrustVolume | float64 | 是 | 数量 |
| tradeType | String | 是 | Market/Limit  市价/限价 |
| action | String | 是 | Open/Close 开仓/平仓  |
| takerProfitPrice | float64 | 否 | 止盈价格 |
| stopLossPrice | float64 | 否 | 止损价格 |

####  [WooX](https://kronosresearch.github.io/wootrade-documents/#restful-api)
| Parameters | Type  | Required | Description |
| ------------- |----|----|----|
|symbol|string|Y|
|client_order_id|number|N|number for scope : from 0 to 9223372036854775807. (default: 0)|
|order_tag|string|N|An optional tag for this order. (default: default)|
|order_type|enum|Y|LIMIT/MARKET/IOC/FOK/POST_ONLY/ASK/BID|
|order_price|number|N|If order_type is MARKET, then is not required, otherwise this parameter is required.|
|order_quantity|number|N|For MARKET/ASK/BID order, if order_amount is given, it is not required.|
|order_amount|number|N|For MARKET/ASK/BID order, the order size in terms of quote currency|
|reduce_only|boolean|N|true or false, default false|
|visible_quantity|number|N|The order quantity shown on orderbook. (default: equal to order_quantity)|
|side|enum|Y|SELL/BUY|

### Resource
- [Serverless Step Functions Example](https://github.com/rpidanny/Nietzsche/blob/master/serverless.yml)
- [Bybit API Trade Example](https://github.com/bybit-exchange/api-usage-examples/blob/master/V3_demo/api_demo/contract/Encryption.js)