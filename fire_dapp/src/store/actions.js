import Constant from '../Constant';
import getWeb3 from './getWeb3';
import getContract from './getContract';

export default {
    async [Constant.REGISTER_WEB3_INSTANCE] (store) {
        try {
          console.log (" ■ Step 2 . Get Web3 ==> Action")
          let result = await getWeb3;
          console.log (" ■ Step 2 . Get Web3 ==> Commit")
          store.commit(Constant.REGISTER_WEB3_INSTANCE, result);
          console.log (" ■ Step 2-1 . IS_AUTH_USER ==> Action")
          let authYn = await store.dispatch(Constant.IS_AUTH_USER); 
          console.log (" ■ Step 2-1 . IS_AUTH_USER ==> Action" , authYn)
          setTimeout(12000);
          if(authYn=="true")
           console.log (" ■ Step 2-2 . IS_AUTH_USER ==> Result" , authYn)
          else
           console.log (" ■ Step 2-2 . IS_AUTH_USER ==> Result x" , authYn)

            //store.dispatch(Constant.IS_AUTH_USER); 
          /*
          let authYn = await store.dispatch(Constant.IS_AUTH_USER); 
          
            
          // 인증된 사용자의 경우, 사용자 정보 가져오기
          if(authYn){
            console.log(" ■ Step 3 . Action 인증자 ")
            // let type = await store.dispatch(Constant.GET_USER);
            let type = async () => {
              await store.dispatch(Constant.GET_USER);
            }

            console.log(" ■ Step 4 . ",type)

            if(type.userCls=='U'){
              console.log(" ■ 인증된 사용자 타입 ", type.userCls)
              store.commit(Constant.CHANGE_VIEW_AND_TYPE, {'currentView':'StatusAccident','userCls':type.userCls});
            } else if(type.userCls=='C'){
              store.commit(Constant.CHANGE_VIEW_AND_TYPE, {'currentView':'StatusAccident','userCls':type.userCls});
            } else if(type.userCls=='I'){
              store.commit(Constant.CHANGE_VIEW_AND_TYPE, {'currentView':'StatusAccident','userCls':type.userCls});
            }
          }
          else{
            console.log (" ● 미인증 ")
          }*/

        } catch (err) {
          console.log('error in action registerWeb3', err);
        }
    },
    async [Constant.GET_CONTRACT_INSTANCE] (store) {
      try {
        console.log (" ■ Step 1 . Get Contract Instance ==> Action")
        let result = await getContract;
        store.commit(Constant.GET_CONTRACT_INSTANCE, result);
        console.log (" ■ Step 1-1. Get Contract Instance ==> Commit")
        store.dispatch(Constant.GET_USER_COUNT);
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
        console.log(' ■ authUser() Fail', err);
      }
    } ,
    async [Constant.IS_AUTH_USER] (store) {
      try {
        
        console.log(" ■ Step 3 ")
        // console.log(" ■ Action ==> isAuthUser ", store.state.web3.coinbase);

        await store.state.contractInstance().isUser({
          gas: 100000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            
            console.log(" ■ Step 3-1 " , result)
            // console.log(" ■ isAuthUser() Success" , result);  
            // 인증여부 저장 
            store.commit(Constant.IS_AUTH_USER_CHECK,result);

            // // 인증된 사용자의 경우, 사용자 정보 가져오기
            // if(result){
            //   let resp = store.dispatch(Constant.GET_USER);
            //   console.log(" ■ isAuthUser() Success" , resp);  
            //   // await store.commit(Constant.CHANGE_VIEW_AND_TYPE, param);
            // }
          }
        });
      } catch (err) {
        console.log(' ■ isAuthUser() Fail', err);
      }
    } ,
    async [Constant.GET_USER_COUNT] (store) {
      try {
        
        console.log (" ■ Step 1-2. Get User Count ==> Action")
        await store.state.contractInstance().getUserCount((err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log (" ■ Step 1-2. Get User Count ==> Commit")
            // console.log(" ■ getUserCount() Success" , result);     
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
            
            /*
            
            userId 있을경우 ==> 사용자 
            userId 없을경우 ==> 보험사, 공업사
            centerId 있을경우 ==> 공업사
            insurId 있을경우 ==> 보험사 
            */ 
            let paramUserInfo ={};
            if(result[1] !=""){
              paramUserInfo.userCls = "U"
              paramUserInfo.userId  = result[1]
              paramUserInfo.userNm  = result[2]
              paramUserInfo.insCd   = result[3]
              paramUserInfo.insNm   = result[4]
            }else{
              if(result[3] !=""){
                paramUserInfo.userCls = "I"
                paramUserInfo.insCd   = result[3]
                paramUserInfo.insNm   = result[4]
              }
              else{
                paramUserInfo.userCls = "C"
                paramUserInfo.insCd   = result[3]
                paramUserInfo.insNm   = result[4]
              }
                
            }

            store.commit(Constant.GET_USER, paramUserInfo); 
          }
        });
      } catch (err) {
        console.log(' ■ getUser() Fail', err);
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