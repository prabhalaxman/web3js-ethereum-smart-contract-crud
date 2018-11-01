var keythereum = require("keythereum");

/*
* To get private key from the keystore 
*/

var datadir = ""; //keystore location 
var address= ""; //your wallet address
const password = ""; //wallet password

var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));


global.privateKeyGlobal= privateKey.toString('hex'); //make it as global so can be accessed from anywhere