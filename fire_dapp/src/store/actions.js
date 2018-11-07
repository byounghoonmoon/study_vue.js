import Constant from '../Constant';
import getWeb3 from './getWeb3';
import getContract from './getContract';

export default {
    async [Constant.REGISTER_WEB3] (store) {
        console.log('registerWeb3 Action being executed');
        try {
          let result = await getWeb3;
          console.log('registerWeb3Instance', result);
          store.commit('registerWeb3Instance', result);
        } catch (err) {
          console.log('error in action registerWeb3', err);
        }
    },
    async [Constant.GET_CONTRACT_INSTANCE] (store) {
      try {
        let result = await getContract;
        store.commit('getContractInstance', result);
      } catch (err) {
        console.log('error in action getContractInstance', err);
      }
    },
    async [Constant.REGISTER_AUTH_USER] (store,payload) {
      try {
        console.log(" ■ Action ==> Register Auth User ", payload);
        await store.state.contractInstance().authUser(payload.userCls ,payload.customCd,payload.customNm,payload.insurCd,payload.insurNm, {
          gas: 300000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log("■ authUser() Success" , result);  
            store.dispatch(Constant.GET_USER_COUNT);
            // 기존 등록여부 확인 필요 

          }
        });
        
      } catch (err) {
        console.log('■ authUser() Fail', err);
      }
    } ,
    async [Constant.IS_AUTH_USER] (store,payload) {
      try {
        console.log(" ■ Action ==> isAuthUser ", payload);
        await store.state.contractInstance().isUser({
          gas: 300000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log("■ isUser() Success" , result);  
            store.dispatch(Constant.GET_USER);
          }
        });
      } catch (err) {
        console.log('■ isUser() Fail', err);
      }
    } ,
    async [Constant.GET_USER_COUNT] (store) {
      try {
        await store.state.contractInstance().getUserCount((err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log("■ getUserCount() Success" , result);     
            store.commit(Constant.GET_USER_COUNT, result);    
          }
        });
      }catch (err) {
        console.log('■ getUserCount() Fail', err);
      }
        
    },
    async [Constant.GET_USER] (store) {
      try {
        console.log(" ■ Action ==> Get User ");
        await store.state.contractInstance().getUser({
          gas: 300000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log("■ getUser() Success" , result);  
          }
        });
      } catch (err) {
        console.log('■ getUser() Fail', err);
      }
    },
    
    // 해당 사고번호 편집(수리,지급) 하기
    [Constant.OPEN_POPUP] : (store, payload) => {
      // DApp 호출 필요
      /*
        // 1. 사고접수 번호 DApp 호출 하여, CarInfo 받아오기 (파라미터 : payload.accReqNo)
        // 2. store.commit(Constant.OPEN_POPUP, {carInfo:response.data});
      */

      // 임시로 DApp 호출 했다고 가정 후 수행
      store.commit(Constant.OPEN_POPUP,payload);
    },

    // 수리완료 
    [Constant.COMPLETE_REPAIR] : (store) => {
      // DApp 호출 필요

      /*
      // 1. DApp 호출 
      // 2. store.dispatch(Constant.CANCEL_POPUP);
      // 3. store.dispatch(정보 조회 - 갱신했기 때문)
      */

      // 임시로 DApp 호출 했다고 가정 후, 
      console.log("### Actions -> Mutation : 수리 완료", store.state.carInfo);
      store.commit(Constant.COMPLETE_REPAIR, store.state.carInfo);
    },
    

    [Constant.CANCEL_POPUP] : (store) => {
      store.commit(Constant.CANCEL_POPUP);
    },

}