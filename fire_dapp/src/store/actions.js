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
        //store.dispatch(Constant.GET_USER_COUNT);
      } catch (err) {
        console.log('error in action getContractInstance', err);
      }
    },

    async [Constant.INIT_USER_CHECK] (store) {
      try {
        console.log(" ■ Step 3. INIT_USER_CHECK ==> Action ")
        await store.state.contractInstance().methods.isUser().call({
          gas: 100000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            
            store.commit(Constant.IS_AUTH_USER_CHECK,result);
            console.log(" ■ Step 3. INIT_USER_CHECK ==> Commit " , result)

            // 인증된 사용자라면 정보 가져온 후 화면 전환
            if(result){
              store.dispatch(Constant.INIT_GET_USER);
              console.log (" ■ Step 4. User Info Detail " ,store.state.userInfo)
            }
          }
        });
      } catch (err) {
        console.log(' ■ isAuthUser() Fail', err);
      }
    } ,
    async [Constant.INIT_GET_USER] (store) {
      try {
        console.log(" ■ Action ==> INIT_GET_USER ");
        await store.state.contractInstance().methods.getUser().call({
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
            let paramChangeView = {};

            if(result[1] !=""){
              paramUserInfo.userCls = "U"
              paramUserInfo.userId  = result[1]
              paramUserInfo.userNm  = result[2]
              paramUserInfo.insCd   = result[3]
              paramUserInfo.insNm   = result[4] 
              paramChangeView.currentView ="SelectMenuForUser";
            }else{
              paramChangeView.currentView ="StatusAccident";
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
            paramChangeView.userCls = paramUserInfo.userCls;
            
            store.commit(Constant.GET_USER, paramUserInfo); 
            store.commit(Constant.CHANGE_VIEW_AND_TYPE, paramChangeView);
          }
        });
      } catch (err) {
        console.log(' ■ getUser() Fail', err);
      }
    },
    async [Constant.REGISTER_AUTH_USER] (store,payload) {
      try {

        console.log(" ■ Action ==> Register Auth User ", payload);
        await store.state.contractInstance().methods.authUser(payload.userCls,payload.userId,payload.userNm,payload.insCd,payload.insNm,payload.centerCd, payload.centerNm)
            .send({gas: 1000000,from: store.state.web3.coinbase}, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(" ■ Register Auth User() Success" , result);  
            store.dispatch(Constant.GET_USER_COUNT);
          }
        });

      } catch (err) {
        console.log(' ■ authUser() Fail', err);
      }
    } ,
    async [Constant.IS_AUTH_USER] (store) {
      try {
        console.log(" ■ Step 3. IS AUTH USER ==> Action ")
        await store.state.contractInstance().methods.isUser().call({from: store.state.web3.coinbase},(err, result) => {
          if (err) {
            console.log(err)
          } else {
            
            store.commit(Constant.IS_AUTH_USER_CHECK,result);
            console.log(" ■ Step 3. IS AUTH USER ==> Commit " , result)
          }
        });
      } catch (err) {
        console.log(' ■ isAuthUser() Fail', err);
      }
    } ,
    async [Constant.GET_USER_COUNT] (store) {
      try {
        
        console.log (" ■ Step 1-2. Get User Count ==> Action")
        await store.state.contractInstance().methods.getUserCount().call((err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log (" ■ Step 1-2. Get User Count ==> Commit", result)
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
        await store.state.contractInstance().methods.getUser().call({from: store.state.web3.coinbase},(err, result) => {
          if (err) {
            console.log(" ■ Get Users Error !! ", err)
          } else {
            console.log (" GET USER ", result)
          }
        });
      } catch (err) {
        console.log(' ■ getUser() Fail', err);
      }
    },
    async [Constant.GET_USERS] (store) {
      try {
        console.log(" ■ Action ==> Get Users ");
        await store.state.contractInstance().methods.getUsers().call( (err, result) => {
          if (err) {
            console.log(" ■ Get Users Error !! ", err)
          } else {
            console.log (" GET USERS ", result)
          }
        });
      } catch (err) {
        console.log(' ■ getUser() Fail', err);
      }
    },

    async [Constant.APPLY_ACCIDENT] (store,payload) {
      try {
        console.log(" ■ Action ==> APPLY_ACCIDENT ", payload);

        await store.state.contractInstance().methods.accRequest(payload.carNo,payload.reqTel,payload.insCd,payload.insNm,payload.accInfo,payload.accReqDate).send({
          gas: 1000000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(" ■ APPLY_ACCIDENT() Success" , result);
            alert(" 사고접수가 정상적으로 신청되었습니다.")
            store.commit(Constant.CHANGE_VIEW_AND_TYPE, {currentView:"SelectMenuForUser",userCls:"U"});
          }
        });

      } catch (err) {
        console.log(' ■ authUser() Fail', err);
      }
    },

    async [Constant.GET_ACCIDENTS] (store) {
      try {
        console.log(" ■ Action ==> GET_ACCIDENTS ");
        await store.state.contractInstance().methods.getCarInfos().call( (err, result) => {
          if (err) {
            console.log(" ■ GET_ACCIDENTS Error !! ", err)
          } else {
            console.log (" GET_ACCIDENTS ", result)
            store.commit(Constant.GET_ACCIDENTS,result);
          }
        });
      } catch (err) {
        console.log(' ■ GET_ACCIDENTS() Fail', err);
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