const Mam = require('../lib/mam.node.js')
const IOTA = require('iota.lib.js');
const Business = require('./business/factory/BusinessFactory');
const config = require('./config/config');


class API {

  constructor(keyVal, root) {
    this.iota = new IOTA({ provider: config.PROVIDER });
    this.key = keyVal;
    this.rootMailbox = root.mailbox;
    this.interval = null;
  }
  
  
  startListening() {
    console.info('startListening');
    
    this.triggerListen();

    this.interval = setInterval(() => { triggerListen() }, 60000);
  }

  async triggerListen() {
    console.info('triggerListen');
  
    if (config.ENABLED == true) {
      await this.listenToMailbox(this.rootMailbox, this.key);
    } else {
        console.log('MAM LISTENING SERVICE STOPPED');
        clearInterval(interval);
    }
  }
  
  async listenToMailbox(rootVal, keyVal) {
    try {
      console.info('listenToMailbox');
  
      let resp = await Mam.fetch(rootVal, config.CHANNELMODE, keyVal, function(data) {
        let json = JSON.parse(this.iota.utils.fromTrytes(data));
        console.log('listenToMailbox ', json);
        Business.mailbox.handle(json);
      }.bind(this));

      this.rootMailbox = resp.nextRoot;

    } catch (e) {
      console.error("listenToMailbox ", e);
    }
  }
}


module.exports = API;