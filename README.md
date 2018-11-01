# rest-api-expressjs-mongodb

###Creating a REST API using Node.js, Express, and Web3js to do smart contract operations with ethereum blockchain

####To setup node and REST API please refer my other tutorial or you can follow official documentations
ref :https://github.com/prabhalaxman/rest-api-expressjs-mongodb-mysql

To start Web3js smart contract operations with Node js REST API install the following 

In my example i have used Web3js 1.0.0 beta36 version.If you are using other version kindly refer the official documentation for web3js

Ref : https://web3js.readthedocs.io/en/1.0/index.html

* npm install web3
* npm install ethereumjs-tx
* npm install keythereum

# Create a API router name called ethereum_test.js

Add the code like my sample

# create a js file fetch private key from wallet in case if you don't have with you

I have created file named web3GetPrivateKey.js

In that web3GetPrivateKey.js file need to add keystore path,wallet address and password

Go to ethereum_test.js i have initialized web3 provider with HttpProvider.In my sample i used JSON RPC communication.

# Create Solidity smart contract file like my file CustomerCRUD.sol and add the source like mine

To compile solidity file you can use online compiler where you can get ABI and bin data

Ref : https://remix.ethereum.org/

# create one constant config file where we can store the following data.In my case i have named as ethereum_config.js

* host_ip
* wallet_address
* customer_contract_bin
* contract_abi

# lets run the index.js like below

# nodemon index.js

To check all the contract operations first we need to create contract and deploy it into ethereum network 

http://localhost:8080/api_ether/deploy_contract_new

This method will deploy the contract and returns the transaction receipt.Store that address which will required for all our CRUD operations.To check all the blocks check etherscan.io testnet my case i am using https://rinkeby.etherscan.io/

In my smart contract i have the below methods

# 1.Insert

http://localhost:8080/api_ether/insert/108/prabha/test/671826600000/27/your contract address

# 2. Get details 

http://localhost:8080/api_ether/get_user_details/108/your contract address

# 3.Uodate address

http://localhost:8080/api_ether/update_user_address/108/update address test/Your contract address

# 4.Delete data

http://localhost:8080/api_ether/deleteUser/101/Your contract address
