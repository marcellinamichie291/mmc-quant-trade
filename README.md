# MMC Quant Trade

### Trade API Parameters List
####  Binance
- 
####  Bybit
- symbol
  - true
  - string
  - 合約類型
- side
  - true
  - string
  - 方向
- positionIdx
  - false
  - integer	
  - Position idx, 用於在不同倉位模式下標識倉位。 <br>
    如果是單向持倉模式， 該參數為必填: <br>
    0-單向持倉 <br>
    1-雙向持倉Buy <br>
    2-雙向持倉Sell <br>
- orderType	
  - true
  - string
  - 委托單價格類型
- qty
  - true
  - string
  - 委託數量. 如果是下USDT永續，則是幣種數量；如果是下反向永續/交割，則是USD數量
- price	
  - false	
  - string	
  - 委托價格。如果是下限價單，該參數為必填. 在沒有倉位時，做多的委托價格需高於市價的10%、低於1百萬。如有倉位時則需優於強平價。價格增減最小單位請參考交易對接口響應中的priceFilter字段
- triggerDirection	
  - false
  - integer	
  - 用於當前條件委託是看空到triggerPrice時觸發還是看多到triggerPrice觸發。<br>
    主要是用來標識當前條件單預期的方向：<br>
    1：行情價格上漲到triggerPrice時觸發，<br>
    2：行情價格下跌到triggerPrice時觸發，<br>
- triggerPrice
  - false
  - string
  - 觸發價格
- triggerBy
  - false
  - string
  - 觸發價格類型
- tpTriggerBy
  - false
  - string
  - 止盈激活價格類型，默認為LastPrice
- slTriggerBy
  - false
  - string
  - 止損激活價格類型，默認為LastPrice
- timeInForce
  - true
  - string
  - 執行策略
- orderLinkId
  - false
  - string
  - 機構自定義訂單ID, 最大長度36位，且同一機構下自定義ID不可重復
- takeProfit
  - false
  - string
  - 止盈價格，僅開倉時生效
- stopLoss
  - false
  - string
  - 止損價格，僅開倉時生效
- reduceOnly	
  - false	
  - bool
  - 什麽是 reduce-only order?<br>
    true-平倉<br>
    false-開倉<br>
    true時止盈止損設置不生效<br>
- closeOnTrigger
  - false
  - bool
  - 什麽是 close on trigger order? <br>
    只會減少您的倉位而不會增加您的倉位。如果當平倉委托被觸發時，賬戶上的余額不足，那麽該合約的其他委托將被取消或者降低委托數量。使用此選項可以確保您的止損單被用於減倉而非加倉。 <br>
####  Bitget
####  BingX
####  WooX

### Resource
- [Serverless Step Functions Example](https://github.com/rpidanny/Nietzsche/blob/master/serverless.yml)
- [Bybit API Trade Example](https://github.com/bybit-exchange/api-usage-examples/blob/master/V3_demo/api_demo/contract/Encryption.js)