import Constant from '../Constant';
import getWeb3 from './getWeb3';
import getContract from './getContract';

export default {
    async [Constant.REGISTER_WEB3_INSTANCE] (store) {
        console.log('registerWeb3 Action being executed');
        try {
          let result = await getWeb3;
          store.commit(Constant.REGISTER_WEB3_INSTANCE, result);
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

        // authUser(string _userId, string _userNm, string _insCd, string _insNm)
        console.log(" ■ Action ==> Register Auth User ", payload);
        await store.state.contractInstance().authUser(payload.userId,payload.userNm,payload.insCd,payload.insNm, {
          gas: 1000000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(" ■ Register Auth User() Success" , result);  
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
          gas: 100000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(" ■ isAuthUser() Success" , result);  
            store.dispatch(Constant.GET_USER);
          }
        });
      } catch (err) {
        console.log(' ■ isAuthUser() Fail', err);
      }
    } ,
    async [Constant.GET_USER_COUNT] (store) {
      try {
        await store.state.contractInstance().getUserCount((err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(" ■ getUserCount() Success" , result);     
            store.commit(Constant.GET_USER_COUNT, result);    
          }
        });
      }catch (err) {
        console.log(' ■ getUserCount() Fail', err);
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

     // 사고상세 팝업 호출
     [Constant.OPEN_POPUP_ACCIDENT_DETAIL] : (store, payload) => {
      // DApp 호출 필요
      /*
        // 1. DApp 호출 : CarInfo 정보 받아오기 (파라미터 : 사고접수번호, 사용자정보 ?)
        // 2. 팝업화면 호출 (Response 데이터로 , 데이터 바인딩)
      */
      
      // 임시로 DApp 호출 했다고 가정 후 수행
      store.commit(Constant.OPEN_POPUP_ACCIDENT_DETAIL,payload);
    },

    // 고객전용 - 수리요청하기 팝업 호출
    [Constant.OPEN_POPUP_REQUEST_REPAIR] : (store, payload) => {
      // DApp 호출 필요
      /*
        // 1. DApp 호출 : CarInfo 정보 받아오기 (파라미터 : 사고접수번호, 사용자정보 ?)
        // 2. 팝업화면 호출 (Response 데이터로 , 데이터 바인딩)
      */     
      // 임시로 DApp 호출 했다고 가정 후 수행
      store.commit(Constant.OPEN_POPUP_REQUEST_REPAIR,payload);
    },

    
    // 공업사전용 - 수리하기, 수리비청구 팝업 호출
    [Constant.OPEN_POPUP_REPAIR_INFO] : (store, payload) => {
      // DApp 호출 필요
      /*
        // 1. DApp 호출 : CarInfo 정보 받아오기 (파라미터 : 사고접수번호, 사용자정보 ?)
        // 2. 팝업화면 호출 (Response 데이터로 , 데이터 바인딩)
      */     

      // 임시로 DApp 호출 했다고 가정 후 수행
      console.log("팝업창 띄우기 ", Constant.OPEN_POPUP_REPAIR_INFO)
      store.commit(Constant.OPEN_POPUP_REPAIR_INFO,payload);
    },

    // 보험사전용 - 지급하기 팝업 호출
    [Constant.OPEN_POPUP_PAYMENT_FEE] : (store, payload) => {
      // DApp 호출 필요
      /*
        // 1. DApp 호출 : CarInfo 정보 받아오기 (파라미터 : 사고접수번호, 사용자정보 ?)
        // 2. 팝업화면 호출 (Response 데이터로 , 데이터 바인딩)
      */     

      // 임시로 DApp 호출 했다고 가정 후 수행
      store.commit(Constant.OPEN_POPUP_PAYMENT_FEE,payload);
    },

    // 고객 - 수리요청 
    [Constant.REQUEST_REPAIR] : (store) => {
      console.log("### Request Repair Action ");
      /* DApp 트랜잭션 발생
        1. 파라미터 : 사고번호 , 선택 공업사 정보
        2. 정상처리후, 상태값 변경 -> 패치 필요
      */
      store.commit(Constant.REQUEST_REPAIR, store.state.carInfo);
    },

    // 공업사 - 수리완료 
    [Constant.COMPLETE_REPAIR] : (store) => {
      /* DApp 트랜잭션 발생
        1. 파라미터 : 사고번호, 수리 비용, 수리 내용, 은행 계좌 
        2. 정상처리후, 상태값 변경 -> 패치 필요
      */
      
      console.log("### Actions -> Mutation : 수리 완료", store.state.carInfo);
      store.commit(Constant.COMPLETE_REPAIR, store.state.carInfo);
    },

    // 공업사 - 수리비청구 
    [Constant.REQUEST_REPAIR_FEE] : (store) => {
      
      /* DApp 트랜잭션 발생
        1. 파라미터 : 사고번호
        2. 정상처리후, 상태값 변경 -> 패치 필요
      */
      console.log("### Actions -> Mutation : 수리비 청구", store.state.carInfo);
      store.commit(Constant.REQUEST_REPAIR_FEE, store.state.carInfo);
    },

    // 보험사 - 보험금 지급
    [Constant.PAYMENT_REPAIR_FEE] : (store) => {
      
      /* DApp 트랜잭션 발생
        1. 파라미터 : 사고번호
        2. 정상처리후, 상태값 변경(50) -> 패치 필요
      */
      store.commit(Constant.PAYMENT_REPAIR_FEE, store.state.carInfo);
    },
    

    [Constant.CANCEL_POPUP] : (store) => {
      store.commit(Constant.CANCEL_POPUP);
    },

}