var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var pkGlobal = require('./web3GetPrivateKey.js');

var ethereum_config = require('./config/ethereum_config'); 

var app = express();

var web3 = new Web3(new Web3.providers.HttpProvider(ethereum_config.host_ip));

//below 3 are simple ethereum functions using web3js

router.get('/get_ether_details',function(req,res){
    var version = web3.version;
    console.log(version);
    web3.eth.getBalance(ethereum_config.wallet_address)
    .then(console.log);
    var respo={
        "version":web3.version
        // "balance1":balance
    }
res.json(respo);

});

router.get('/ether1', function(req, res) {

    web3.eth.getBlock(48, function(error, result){
        if(!error){
            console.log(JSON.stringify(result));
            res.json(result);
     } else{
            console.error(error);
            res.json(error);
    }
     });


  });


  router.get('/get_transaction_count/:address', function(req, res) {
    //  res.json({ message: 'R35t AP! test!n9 ' });
    web3.eth.getTransactionCount(req.params.address,function(error, result){
        if(!error){
            console.log(JSON.stringify(result));
            res.json(result);
     } else{
            console.error(error);
            res.json(error);
    }
     });
   
   
  });  

//deploy new contract in the blockchain network
  router.get('/deploy_contract_new',function(req,res){

   
    const data=ethereum_config.customer_contract_bin;
web3.eth.getTransactionCount(ethereum_config.wallet_address,(err,txCount)=>{
    const txObject = {       
        nonce: web3.utils.toHex(txCount),
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
           gasLimit: web3.utils.toHex(3000000),
      
      
        data: data
    };
    console.log('txObj '+txObject.gasLimit+" nonce "+txObject.nonce);
    // const privateKey=ethereum_config.wallet_address_private_key;
    const privateKey=global.privateKeyGlobal;
    const tx=new Tx(txObject);
    tx.sign(Buffer.from(privateKey, 'hex'));
    var raw = '0x' + tx.serialize().toString('hex');
    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log('err : ',err,'hash : ',txHash);
        res.json(txHash);
    });

});


  });

  /*
accessing insert method in the smart contract to write a data in the network

@params contract_add - should be contract address which we got from the above method

From here all the below methods contract address should be your newly generated contract address
*/

  router.get('/insert/:id/:name/:adds/:dob/:age/:contract_adds', function(req, res) {
    //  res.json({ message: 'R35t AP! test!n9 ' });

    var userContract = new web3.eth.Contract(ethereum_config.contract_abi
    ,req.params.contract_adds);
    
   

    const data=userContract.methods.insert(req.params.id,req.params.name,req.params.adds,
        req.params.dob,req.params.age).encodeABI();
    web3.eth.getTransactionCount(ethereum_config.wallet_address,(err,txCount)=>{
    const txObject = {       
        nonce: web3.utils.toHex(txCount),
        gasPrice: web3.utils.toHex(web3.utils.toWei('15', 'gwei')),
        gasLimit: web3.utils.toHex(1500000),
        to: req.params.contract_adds,      
        data: data
    };
    console.log('txObj '+txObject.gasLimit+" nonce "+txObject.nonce);
    // const privateKey=ethereum_config.wallet_address_private_key;
    const privateKey=global.privateKeyGlobal;
    const tx=new Tx(txObject);
    tx.sign(Buffer.from(privateKey, 'hex'));
    var raw = '0x' + tx.serialize().toString('hex');
    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log('err : ',err,'hash : ',txHash);
        res.json(txHash);
    });

});
   
  }); 


/*
* to get user details based id and the contract address
*/

  router.get('/get_user_details/:id/:contract_adds', function(req, res) {
    //  res.json({ message: 'R35t AP! test!n9 ' });

    var CoursesContract = new web3.eth.Contract(ethereum_config.contract_abi,req.params.contract_adds); 
      
    console.error(req.params.contract_adds); 
   
    CoursesContract.methods.getCustomerDataString(req.params.id).call({from: req.params.contract_adds}, function(error, result){
        
        if(!error){
        
          console.log(result);
          res.json(result);
          }
       else{
         console.error(error);
         res.json(error);
       }
       });

   
  });  

/*
* to update user address based id and the contract address
*/

  router.get('/update_user_address/:id/:address/:contract_address', function(req, res) {
   
    console.log('address to be updated '+req.params.address);
    console.log('address to be updated for id '+req.params.id);
    console.error('update_user_address cont adds '+req.params.contract_address);
   
    
       var userContract = new web3.eth.Contract(ethereum_config.contract_abi
       ,req.params.contract_address);
       
      
   
       const data=userContract.methods.updateAddress(req.params.id,req.params.address).encodeABI();
   web3.eth.getTransactionCount(ethereum_config.wallet_address,(err,txCount)=>{
       const txObject = {       
           nonce: web3.utils.toHex(txCount),
           gasPrice: web3.utils.toHex(web3.utils.toWei('15', 'gwei')),
           gasLimit: web3.utils.toHex(1500000),
           to: req.params.contract_address,
         
           data: data
       };
       console.log('txObj '+txObject.gasLimit+" nonce "+txObject.nonce);
       // const privateKey=ethereum_config.wallet_address_private_key;
       const privateKey=global.privateKeyGlobal;
       const tx=new Tx(txObject);
       tx.sign(Buffer.from(privateKey, 'hex'));
       var raw = '0x' + tx.serialize().toString('hex');
       web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
           console.log('err : ',err,'hash : ',txHash);
           res.json(txHash);
       });
   
   });
   
  });  

/*
* to delete user based id and the contract address
*/

  router.get('/deleteUser/:id/:contract_address', function(req, res) {
   
    console.log('address to be updated '+req.params.address);
    console.log('address to be updated for id '+req.params.id);
    console.error('update_user_address cont adds '+req.params.contract_address);
   
   var userContract = new web3.eth.Contract(ethereum_config.contract_abi
    ,req.params.contract_address);
    
   

    const data=userContract.methods.deleteCustomer(req.params.id,req.params.name,req.params.adds,
        req.params.dob,req.params.age).encodeABI();
web3.eth.getTransactionCount(ethereum_config.wallet_address,(err,txCount)=>{
    const txObject = {       
        nonce: web3.utils.toHex(txCount),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
           gasLimit: web3.utils.toHex(1000000),
        to: req.params.contract_address,
      
        data: data
    };
    console.log('txObj '+txObject.gasLimit+" nonce "+txObject.nonce);
    // const privateKey=ethereum_config.wallet_address_private_key;
    const privateKey=global.privateKeyGlobal;
    const tx=new Tx(txObject);
    tx.sign(Buffer.from(privateKey, 'hex'));
    var raw = '0x' + tx.serialize().toString('hex');
    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log('err : ',err,'hash : ',txHash);
        res.json(txHash);
    });

});


   
  });  



  
  

  module.exports = router;