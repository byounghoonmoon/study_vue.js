import Web3 from 'web3';
import Constant from '../Constant';

let getContract = new Promise((resolve, reject) => {
	
	let web3 = new Web3(window.web3.currentProvider);
	if(typeof web3 !== 'undefined') {
		let carhubContract = web3.eth.contract(Constant.ABI);
		let carhubContractInstance = carhubContract.at(Constant.ADDRESS);
		resolve(carhubContractInstance);
	} else {
		reject(new Error('c'));
	}

});

export default getContract;
