import assert from 'assert';
import ccxt ;
import crypto from 'crypto';
import querystring from 'querystring';
import {
  OrderSide,
  OrderType,
  OrderStatus,
} from '../../enums';
import { Logger } from '../../logger';
import {
  Balance,
  QueryOrderResponse,
  QueryOrderRequest,
  CancelOrderRequest,
  ExchangeAPI,
} from '../api';
import uuidv4 from 'uuid/v4';
import {
  LimitOrderRequest,
  StopLimitOrderRequest,
} from '../exchange';
import { CcxtOrder } from './order';

type QueryOrderResponseCcxt = {
  symbol: string,
  status: OrderStatus,
};

export type OrderFill = {
  commission: string,
  commissionAsset: string,
  price: string,
  qty: string,
  tradeId: number,
};

export type OrderResponse = {
  clientOrderId: string,
  cummulativeQuoteQty: string,
  executedQty: string,
  fills: OrderFill[],
  orderId: number,
  orderListId: number,
  origQty: string,
  price: string,
  side: OrderSide,
  status: string,
  symbol: string,
  timeInForce: string,
  transactTime: number,
  type: string,
};

type BaseFilter = {
  filterType: string,
};

type LotSizeFilter = BaseFilter & {
  minQty: string,
  maxQty: string,
  stepSize: string,
};

type MinNotionalFilter = BaseFilter & {
  minNotional: string,
  applyToMarket: boolean,
  avgPriceMins: number,
};

type Filter = LotSizeFilter | MinNotionalFilter;

type TickerSymbol = {
  baseAsset: string,
  quoteAsset: string,
  filters: Filter[],
};

type ExchangeInfoResponse = {
  symbols: TickerSymbol[],
};

type RawBalance = {
  asset: string,
  free: string,
  locked: string,
};

type AccountBalance = {
  //onko oikee syntaksi?
  timestamp: string;
  balances: Map<string, RawBalance>(); //onkohan tää nyt ihan toimiva?
}

type OrderInfo = {
  //onko oikee syntaksi?
  //sisältö riippuu siitä mitä ccxt:n api palauttaa.
}

const GET_PRICE_INTERVAL = ;
const GET_ORDERS_INTERVAL = ;

class CcxtAPI extends ExchangeAPI {
  private getOrdersInterval: ReturnType<typeof setInterval> | undefined;
  private exchangeInfo: ExchangeInfoResponse | undefined;
  private orderInfo: Map<string, orderInfo>();
  private tradingPairsToMonitor = int; //onko int javascriptissä joku?
  private accountBalance = accountBalance; //onko oikee tapa sanoo et type on accountBalance?
  private logger: Logger;
  private apiKey: string;
  private apiSecret: string;

  constructor(
    { logger, apiKey, apiSecret }:
    {
      logger: Logger,
      apiKey: string,
      apiSecret: string,
    },
  ) {
    super();
    this.logger = logger;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  public start = async (activeTradingPairs?: Set<string>): Promise<any> => {
    this.exchangeInfoInterval = setInterval(() => {
      this.getExchangeInfo();
    }, EXCHANGE_INFO_INTERVAL);
    if (activeTradingPairs && activeTradingPairs.size > 0) {
      this.tradingPairsToMonitor = activeTradingPairs;
    }
    this.updateAveragePricesInterval = setInterval(() => {
      this.setAveragePrices();
    }, UPDATE_AVERAGE_PRICES_INTERVAL);
    await this.getExchangeInfo();
    await this.setAveragePrices();
    const exchangeId = 'binance'
    , exchangeClass = ccxt[exchangeId]
    , exchange = new exchangeClass ({
        'apiKey': this.apiKey,
        'secret': this.apiSecret,
        'timeout': 30000,
        'enableRateLimit': true,
    })
    setInterval(queryOrdersInternal, ); //onko oikein et tota funktiota kutsutaan eikä queryOrders funktiota?
  }
                                        
  public monitorPriceForTradingPair = async () => { //tarviiko asyncciä?
    this.tradingPairsToMonitor.; //tohon se et kasvata yhellä.
    //tähän se et ilmottaa forEach stream luokille uuden intervallin. CHangeintervall funktioon soittaa. Pitää varmaa
    //kuitenki olla pairien nimet listana tossa trandingPairsToMonitor, jotta osaa ilmottaa kaikille.
    //joku logiikka jolla laskee nää jutut.
  }

  public stopMonitoringPrice = () => {
    this.tradingPairsToMonitor.; //tohon se et laske yhellä.
    //tähän se et ilmottaa forEach stream luokille uuden intervallin. CHangeintervall funktioon soittaa.
  }
                                        

  public stop = async () => {
    if (this.getAssetsInterval) {
      clearInterval(this.getAssetsInterval);
    }
    if (this.updateAveragePricesInterval) {
      clearInterval(this.updateAveragePricesInterval);
    }
  }

  public queryOrder = async (queryOrderRequest: QueryOrderRequest): Promise<QueryOrderResponse> => {
    const queryOrderResponse = ; //tähän order class soittaa. 
                                        //Ja täs pitäis tän classin orderInfo muuttujasta saada haettavalle orderille tiedot.
    return {
      tradingPair: queryOrderResponse.symbol,
      status: queryOrderResponse.status,
    };
  }

  public cancelOrder = async (cancelOrderRequest: CancelOrderRequest): Promise<boolean> => {
    try {
      await this.cancelOrderInternal(cancelOrderRequest);
      return true;
    } catch (e) {
      return false;
    }
  }

  private cancelOrderInternal = async (cancelOrder: CancelOrderRequest): Promise<void> => {
    const { tradingPair, orderId } = cancelOrder;
    const queryString = `timestamp=${timestamp}&recvWindow=${recvWindow}&symbol=${tradingPair}&origClientOrderId=${orderId}`;
    try {
      const response = await axios.delete(
        `${ORDER_URL}?${queryString}&signature=${this.signRequest(queryString)}`,
        {
          headers: {
            'X-MBX-APIKEY': this.apiKey,
          },
        },
      );
      return response.data;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.msg) {
        this.logger.error(`failed to cancel order: ${e.response.data.msg}`);
      } else {
        this.logger.error(`failed to cancel order: ${e}`);
      }
      return Promise.reject(e);
    }
  }

  private queryOrdersInternal = async (queryOrder: QueryOrderRequest): Promise<QueryOrderResponseCcxt> => {
    if (process.env.LIVE_TRADING) {
      const { tradingPair, orderId } = queryOrder;
      //tähän ccxt komento jolla querytään const balances = await;
      return response.data; //onko tää data se mitä haluun responsaa?
    } else {
      // Return mock filled response when live trading is disabled
      return {
        symbol: queryOrder.tradingPair,
        status: OrderStatus.Filled,
      };
    }
  }

  public verifyQuantity = async (baseAsset: string, quoteAsset: string, quantity: number) => {
    if (!this.exchangeInfo) {
      throw new Error('exchangeInfo has not been fetched');
    }
    const tradingPair = `${baseAsset}${quoteAsset}`;
    let price = ; 
    const filters = this.exchangeInfo!.symbols
      .filter((sym) => {
        return sym.baseAsset === baseAsset && sym.quoteAsset === quoteAsset;
      })
      .map(sym => sym.filters)[0];
    const minNotionalFilter = filters
      .filter(filt => filt.filterType === 'MIN_NOTIONAL')[0] as MinNotionalFilter;
    const minNotional = price * quantity - parseFloat(minNotionalFilter.minNotional);
    if (minNotional <= 0) {
      throw new Error('MIN_NOTIONAL filter failure');
    }
    const lotSize = filters
      .filter(filt => filt.filterType === 'LOT_SIZE')[0] as LotSizeFilter;
    if (quantity < parseFloat(lotSize.minQty) || quantity > parseFloat(lotSize.maxQty)) {
      throw new Error('LOT_SIZE filter failure');
    }
    const leftOvers = (quantity - parseFloat(lotSize.minQty)) % parseFloat(lotSize.stepSize);
    let resultQty = quantity;
    if (leftOvers) {
      resultQty = resultQty - leftOvers;
    }
    return parseFloat(resultQty.toFixed(8));
  }

  public getAveragePrice = async (sym: string): Promise<AvgPriceResponse> => {
    const response = await ; //averagePrice ccxt:stä
    return { sym, price: response.data.price }; //korjaa response.data.price semmoseks et antaa pricen.
  }

  public getAssets = async (): Promise<Balance[]> => {
    //kattoo accountInfo muuttujasta millon viimeks fetchattu?
    const accountInfo = await this.accountInfo();
    const parsedBalances = accountInfo.balances.map((balance) => {
      return {
        asset: balance.asset,
        free: parseFloat(balance.free),
        locked: parseFloat(balance.locked),
      };
    });
    return parsedBalances;
  }

  public newOrder = (
    orderRequest: LimitOrderRequest | StopLimitOrderRequest,
  ): CcxtOrder => {
    const orderId = uuidv4();
    const order = new CcxtOrder({
      ...orderRequest,
      orderId,
      api: this,
      logger: this.logger,
    });
    return order;
  }

  public startOrder = async (
    order: LimitOrderRequest | StopLimitOrderRequest,
  ): Promise<string> => {
    const orderResponse = await this.newOrderInternal(order);
    if (process.env.LIVE_TRADING) {
      return orderResponse.clientOrderId;
    } else {
      return uuidv4();
    }
  }

  private newOrderInternal = async (
    order: LimitOrderRequest | StopLimitOrderRequest,
  ): Promise<OrderResponse> => {
    try {
      const {
        baseAsset,
        quoteAsset,
        orderSide: side,
        orderType: type,
        quantity,
      } = order; //mitä vittua tää tarkottaa?
      const qty = await this.verifyQuantity(baseAsset, quoteAsset, quantity);
      const timestamp = new Date().getTime();
      const tradeData: { [key: string]: string | number } = {
        timestamp,
        side,
        type,
        symbol: `${baseAsset}${quoteAsset}`,
        quantity: qty,
      };
      if (
        type === OrderType.StopLimit ||
        type === OrderType.Limit
      ) {
        const { price } = order;
        if (!price) {
          return Promise.reject('price is required for limit and stop-limit orders');
        } else {
          tradeData.price = price;
        }
        // Currently all limit and stop-limit
        // orders are good till canceled
        tradeData.timeInForce = 'GTC';
      }
      if (type === OrderType.StopLimit) {
        const { stopPrice } = order as StopLimitOrderRequest;
        if (!stopPrice) {
          return Promise.reject('stopPrice is required for stop-limit orders');
        } else {
          tradeData.stopPrice = stopPrice;
        }
      }
      if (process.env.LIVE_TRADING) {
        const response = await binance.createOrder(symbol, type, side, amount); //tähän ccxt:n newOrder. 
        //Oisko parempi et ois exchange eikä binance? Varmaa parempi et latetaa parametriks vaa joku type tai muu, jotta price ja muut menee optionaalina?
      }
      return response.data; //onko data oikea
    } catch (e) {
      if (e.response && e.response.data && e.response.data.msg) {
        this.logger.error(`failed to create new order: ${e.response.data.msg}`);
      } else {
        this.logger.error(`failed to create new order ${e}`);
      }
      return Promise.reject(e); //mikäs tää on?
    }
  }

}

export { CcxtAPI };
