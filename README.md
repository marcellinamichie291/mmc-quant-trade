# MMC Quant Trade

### Trade API Parameters List

#### [Binance](#binance)
#### [Bybit](#bybit)
#### [Bitget](#bitget)
#### [BingX](#bingx)
#### [WooX](#woox)

---

#### [Common Parameters]
| Parameters | Type | Required | Description |
|-------------|----|----|----|
| symbol | STRING | Y | 合約名稱中要有"-"，如BTC-USDT (BingX) |
| side | ENUM | Y | SELL/BUY <br> Bid/Ask 買/賣 (BingX) |
| <ul><li> type(Binance) </li> <li> orderType(Bybit/Bitget) </li> <li> tradeType(BingX) </li> <li> order_type (WooX) </li> <ul> | ENUM | Y | <ul><li> 訂單類型 LIMIT, MARKET, STOP, TAKE_PROFIT, STOP_MARKET, TAKE_PROFIT_MARKET, TRAILING_STOP_MARKET (Binance) </li><li> Order type limit/market (Bitget) </li> <li> Market/Limit  市價/現價 (BingX) </li> <li> LIMIT/MARKET/IOC/FOK/POST_ONLY/ASK/BID </li> <ul>|

|  | ENUM | Y |  |

#### [Binance](https://binance-docs.github.io/apidocs/futures/cn/#trade-3)
| Parameters | Type  | Required | Description |
| ------------- |----|----|----|
| positionSide | ENUM | N | 持仓方向，单向持仓模式下非必填，默认且仅可填BOTH;在双向持仓模式下必填,且仅可选择 LONG 或 SHORT |
| reduceOnly | STRING | N | true, false; 非双开模式下默认false；双开模式下不接受此参数； 使用closePosition不支持此参数。 |
| quantity | DECIMAL | N | 下单数量,使用closePosition不支持此参数。|
| price | DECIMAL | N | 委托价格 |
| newClientOrderId | STRING | N | 用户自定义的订单号，不可以重复出现在挂单中。如空缺系统会自动赋值。必须满足正则规则 ^[\.A-Z\:/a-z0-9_-]{1,36}$ |
| stopPrice | DECIMAL | N | 触发价, 仅 STOP, STOP_MARKET, TAKE_PROFIT, TAKE_PROFIT_MARKET 需要此参数 |
| closePosition | STRING | N | true, false；触发后全部平仓，仅支持STOP_MARKET和TAKE_PROFIT_MARKET；不与quantity合用；自带只平仓效果，不与reduceOnly 合用 |
| activationPrice | DECIMAL | N | 追踪止损激活价格，仅TRAILING_STOP_MARKET 需要此参数, 默认为下单当前市场价格(支持不同workingType) |
| callbackRate | DECIMAL | N | 追踪止损回调比例，可取值范围[0.1, 5],其中 1代表1% ,仅TRAILING_STOP_MARKET 需要此参数 |
| timeInForce | ENUM | N | 有效方法 |
| workingType | ENUM | N | stopPrice 触发类型: MARK_PRICE(标记价格), CONTRACT_PRICE(合约最新价). 默认 CONTRACT_PRICE |
| priceProtect | STRING | N | 条件单触发保护："TRUE","FALSE", 默认"FALSE". 仅 STOP, STOP_MARKET, TAKE_PROFIT, TAKE_PROFIT_MARKET 需要此参数 |
| newOrderRespType | ENUM | N | "ACK", "RESULT", 默认 "ACK" |
| recvWindow | LONG | N |
| timestamp | LONG | Y |
#### [Bybit](https://bybit-exchange.github.io/docs/zh-my/derivativesV3/contract/#t-errors)
| Parameters | Type  | Required | Description |
| ------------- |----|----|----|
| positionIdx | NUMBER | N | Position idx, 用於在不同倉位模式下標識倉位。如果是單向持倉模式，該參數為必填: <br> 0-單向持倉 <br> 1-雙向持倉Buy <br> 2-雙向持倉Sell <br> |
| qty | STRING | Y | 委託數量. 如果是下USDT永續，則是幣種數量；如果是下反向永續/交割，則是USD數量 |
| price | STRING | N | 委托價格。如果是下限價單，該參數為必填. 在沒有倉位時，做多的委托價格需高於市價的10%、低於1百萬。如有倉位時則需優於強平價。價格增減最小單位請參考交易對接口響應中的priceFilter字段 |
| triggerDirection | NUMBER | N | 用於當前條件委託是看空到triggerPrice時觸發還是看多到triggerPrice觸發。主要是用來標識當前條件單預期的方向：<br> 1：行情價格上漲到triggerPrice時觸發，<br> 2：行情價格下跌到triggerPrice時觸發，<br> |
| triggerPrice | STRING | N | 觸發價格 |
| triggerBy | STRING | N | 觸發價格類型 |
| tpTriggerBy | STRING | N | 止盈激活價格類型，默認為LastPrice|
| slTriggerBy | STRING | N | 止損激活價格類型，默認為LastPrice|
| timeInForce | STRING | Y | 執行策略 |
| orderLinkId | STRING | N | 機構自定義訂單ID, 最大長度36位，且同一機構下自定義ID不可重復|
| takeProfit | STRING | N | 止盈價格，僅開倉時生效 |
| stopLoss | STRING | N | 止損價格，僅開倉時生效 |
| reduceOnly | BOOL | N | 什麽是 reduce-only order?<br>true-平倉<br>N-開倉<br>true時止盈止損設置不生效<br> |
| closeOnTrigger | BOOL | N | 什麽是 close on trigger order? <br> 只會減少您的倉位而不會增加您的倉位。如果當平倉委托被觸發時，賬戶上的余額不足，那麽該合約的其他委托將被取消或者降低委托數量。使用此選項可以確保您的止損單被用於減倉而非加倉。<br>|
####  [Bitget](https://bitgetlimited.github.io/apidoc/en/spot/#place-order)
| Parameters | Type  | Required | Description |
| ------------- |----|----|----|
| force | STRING | Y | force |
| price | STRING | N | Limit pricing, null if orderType is market |
| quantity | STRING | Y | Order quantity, base coin |
| clientOrderId | STRING | N | Custom id length: 40 |

####  [BingX](https://github.com/BingX-API/BingX-swap-api-doc/blob/master/%E4%B8%93%E4%B8%9A%E5%90%88%E7%BA%A6API%E6%8E%A5%E5%8F%A3.md?plain=1)
| Parameters | Type  | Required | Description |
| ------------- |----|----|----|
| apiKey | STRING | Y | 接口密钥 |
| timestamp | STRING | Y | 发起请求的时间戳，单位为毫秒 |
| entrustPrice | NUMBER | Y | 价格 |
| entrustVolume | NUMBER | Y | 数量 |
| action | STRING | Y | Open/Close 开仓/平仓  |
| takerProfitPrice | NUMBER | N | 止盈价格 |
| stopLossPrice | NUMBER | N | 止损价格 |

####  [WooX](https://kronosresearch.github.io/wootrade-documents/#restful-api)
| Parameters | Type  | Required | Description |
| ------------- |----|----|----|
| client_order_id | NUMBER | N | number for scope : from 0 to 9223372036854775807. (default: 0) |
| order_tag | STRING | N | An optional tag for this order. (default: default) |
| order_price | NUMBER | N | If order_type is MARKET, then is not required, otherwise this parameter is required. |
| order_quantity | NUMBER | N | For MARKET/ASK/BID order, if order_amount is given, it is not required. |
| order_amount | NUMBER | N | For MARKET/ASK/BID order, the order size in terms of quote currency |
| reduce_only | BOOL | N | true or false, default false |
| visible_quantity | NUMBER | N | The order quantity shown on orderbook. (default: equal to order_quantity) |

### Resource
- [Serverless Step Functions Example](https://github.com/rpidanny/Nietzsche/blob/master/serverless.yml)
- [Bybit API Trade Example](https://github.com/bybit-exchange/api-usage-examples/blob/master/V3_demo/api_demo/contract/Encryption.js)