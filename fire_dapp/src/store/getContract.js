import Web3 from 'web3';
import Constant from '../Constant';

let getContract = new Promise((resolve, reject) => {
	
	let web3 = new Web3(window.web3.currentProvider);
	if(typeof web3 !== 'undefined') {
		// 컨트랙트 정보 가져오기
		let carhubContract = new  web3.eth.Contract(Constant.ABI,Constant.ADDRESS);
		resolve(carhubContract);
	} else {
		reject(new Error('Contract Get Fail'));
	}

});

export default getContract;
