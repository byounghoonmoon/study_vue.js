import Web3 from 'web3';

// Web3 를 이용하여 현재 접속된 계정 가져오기

let getWeb3 = new Promise((resolve, reject) => {
	var web3  = new Web3(window.web3.currentProvider);
	if(typeof web3 !== 'undefined'){
		resolve({
			web3 ()  {return web3}
		});
	}
	else{
		reject(new Error('Unable to connect to Metamask'));
	}
}).then(result => {
	return new Promise((resolve, reject) => {
	result.web3().eth.net.getId((err, networkId) => {
		if(err) {
		reject(new Error('Unable to retrieve network ID'));
		} else {
		result = Object.assign({}, result, { networkId });
		resolve(result);
		}
	});
	});
}).then(result => {
	return new Promise((resolve, reject) => {
	result.web3().eth.getAccounts((err, accounts) => {
		if(err) {
		reject(new Error('Unable to retrieve accounts'));
		} else {
		result = Object.assign({}, result, { accounts });
		resolve(result);
		}
	});
	});
}).then(result => {
	return new Promise((resolve, reject) => {
	result.web3().eth.getCoinbase((err, coinbase) => {
		if(err) {
		reject(new Error('Unable to retrieve coinbase'));
		} else {
		result = Object.assign({}, result, { coinbase });
		resolve(result);
		}
	});
	});
}).then(result => {
	return new Promise((resolve, reject) => {
	result.web3().eth.getBalance(result.accounts[0], (err, balance) => {
		if(err) {
			reject(new Error(`Unable to retrieve balance for addres: ${result.coinbase}`))
		} else {
		result = Object.assign({}, result, { balance });
		console.log("###### ," , result)
		resolve(result);
		}
	});
	});
  });


export default getWeb3;