import { Stream } from '../stream';
import { Logger } from '../../logger';



class CcxtStream extends Stream {
  constructor(private logger: Logger, private tradingPair: string) {
    super();
  }

  public start = (): Promise<void> => {
  }

  public close = (): Promise<void> => {
  }

  private onInterval = (event: WebSocket.MessageEvent) => {
    const aggTrade = JSON.parse(event.data.toString());
    const { p: priceString } = aggTrade;
    const price = parseFloat(priceString);
    this.emit('price', this.tradingPair, price);
  }

  private onClose = (event: WebSocket.CloseEvent) => {
    clearTimeout(this.pingTimeout);
    this.isAlive = false;
    if (event.reason) {
      this.logger.info(`${this.tradingPair} stream closed with reason: ${event.reason}`);
    } else {
      this.logger.info(`${this.tradingPair} stream closed`);
    }
  }

}

export { CcxtStream };
