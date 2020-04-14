import { Stream } from '../stream';
import { Logger } from '../../logger';



class CcxtStream extends Stream {
  private interval = ;
  constructor(private logger: Logger, private tradingPair: string) { //mitä noi privatet tossa meinaa? Tarkottaako et ei tarvii uuestaa määritellä niitä ees?
    super(); //mikä vittu tää super on ja tarvitaanko tällästä?
    this.tradingPair = trandingPair;
  }

  public start = (): Promise<void> => {
    //soittaa api classille johki funkioon? returnina saa intervallin
  }

  public close = (): Promise<void> => {
    //soittaa api classiin johonki funktioon joka poista listalta tän pairin.
  }

  private onInterval = () => {
    price = ; //ccxt komento hinnan hakemiseen.
    const price = parseFloat(priceString); //parsee hinnan, miten pitää parsee?
    this.emit('price', this.tradingPair, price);
  }
  
  public changeInterval = async(interval) => { //intervallin tyyppi
    this.interval = interval;
  }

  private onClose = (event: WebSocket.CloseEvent) => {
    clearTimeout(this.pingTimeout);
    if (event.reason) {
      this.logger.info(`${this.tradingPair} stream closed with reason: ${event.reason}`);
    } else {
      this.logger.info(`${this.tradingPair} stream closed`);
    }
  }

}

export { CcxtStream };
