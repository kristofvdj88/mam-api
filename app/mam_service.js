const Mam = require('../lib/mam.node.js')
const IOTA = require('iota.lib.js');
const API = require('./API.js');
const config = require('./config/config');


const iota = new IOTA({ provider: config.PROVIDER });

let root = {};
let key;

// Check the arguments
const args = process.argv;
if(args.length != 3) {
    console.log('Missing root as argument: node mam_receive.js <root>');
    process.exit();
} else if(!iota.valid.isAddress(args[2])){
    console.log('You have entered an invalid root: '+ args[2]);
    process.exit();
} else {
    root.mailbox = args[2];
}

// Initialise MAM State
let mamState = Mam.init(iota);

// Set channel mode
if (config.CHANNELMODE == 'restricted') {
    key = iota.utils.toTrytes(config.AUTHORISATION_KEY);
    mamState = Mam.changeMode(mamState, config.CHANNELMODE, key);
} else {
    mamState = Mam.changeMode(mamState, config.CHANNELMODE);
}

const api = new API(key, root);

api.startListening();

