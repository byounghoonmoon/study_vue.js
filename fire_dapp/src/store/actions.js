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

        const result = await store.state.contractInstance().methods.isUser().call({gas: 100000,from: store.state.web3.coinbase});
        console.log(" ◆◆◆◆◆◆◆◆◆◆◆◆ ", result);
        if(result){
          store.commit(Constant.IS_AUTH_USER_CHECK,result);
          store.state.contractInstance().methods.getUser().call({gas: 300000,from: store.state.web3.coinbase}, (err, result)=>{
            if(err){
              console.error(" 사용자 가져오기 에러 발생 : ", err);
            }
            else{
              const resultUserInfo = result;
              store.commit(Constant.GET_USER,resultUserInfo);
              if(resultUserInfo.userCls=='U'){
                store.commit(Constant.CHANGE_VIEW_AND_TYPE, {currentView:"SelectMenuForUser",userCls:resultUserInfo.userCls});
              }else if(resultUserInfo.userCls=='C'){
                // 사고접수건 가져오기
                store.state.contractInstance().methods.getCarInfoArr().call( (err, result) => {
                  if (err) {
                    console.log(" ■ GET_ACCIDENTS Error !! ", err)
                  } else {
                    console.log (" GET_ACCIDENTS ", result)
                    store.commit(Constant.GET_ACCIDENTS,result);
                    store.commit(Constant.GET_FILTER_ACCIDENTS,{'userCls':resultUserInfo.userCls,'centerCd':resultUserInfo.centerCd,'centerNm':resultUserInfo.centerNm});
                    store.commit(Constant.CHANGE_VIEW_AND_TYPE, {currentView:"StatusAccident",userCls:resultUserInfo.userCls});
                  }
                });
                
              }else if(resultUserInfo.userCls=='I'){
                 // 사고접수건 가져오기
                 store.state.contractInstance().methods.getCarInfoArr().call( (err, result) => {
                  if (err) {
                    console.log(" ■ GET_ACCIDENTS Error !! ", err)
                  } else {
                    console.log (" 보험사 전용 : GET_ACCIDENTS ", result)
                    store.commit(Constant.GET_ACCIDENTS,result);// 사고접수건 가져오기
                    store.commit(Constant.GET_FILTER_ACCIDENTS,{'userCls':resultUserInfo.userCls,'insCd':resultUserInfo.insCd,'insNm':resultUserInfo.insNm});
                    store.commit(Constant.CHANGE_VIEW_AND_TYPE, {currentView:"StatusAccident",userCls:resultUserInfo.userCls});
                  }
                });
              }
            }
          });
         
        }
      } catch (err) {
        console.log(' ■ INIT_USER_CHECK() Fail', err);
      }
    } ,
    async [Constant.INIT_SELECT_DATA] (store) {
      try {
        console.log(" ■ Action ==> INIT_SELECT_DATA ");
        const userInfo = await store.state.contractInstance().methods.getUserInfoArr().call({gas: 300000,from: store.state.web3.coinbase});
        console.log( " ■ INIT_SELECT_DATA ==> ", userInfo )
        store.commit(Constant.INIT_SELECT_DATA, userInfo);
        
      } catch (err) {
        console.log(' ■ getUser() Fail', err);
      }
    },
    async [Constant.REGISTER_AUTH_USER] (store,payload) {
      try {
        console.log(" ■ Action ==> Register Auth User ", payload);
        const prevCnt = store.state.userCnt;
        console.log(" ■ Prev ", prevCnt)
        await store.state.contractInstance().methods.authUser(payload.userCls,payload.userId,payload.userNm,payload.insCd,payload.insNm,payload.centerCd, payload.centerNm)
            .send({gas: 1000000,from: store.state.web3.coinbase});
        const nextCnt = await store.dispatch(Constant.GET_USER_COUNT);
        console.log(" ■ Next ", nextCnt)
        if(prevCnt<nextCnt){
          console.log(" 사용자 등록 완료 ", nextCnt)
          
          
          store.dispatch(Constant.INIT_USER_CHECK);
          /*
          if(payload.userCls=='U'){
            console.log(" 사용자 유형 : ", payload.userCls)
            store.dispatch(Constant.INIT_USER_CHECK);
          }
          else if(payload.userCls=='C'){
            console.log(" 사용자 유형 : ", payload.userCls)
            store.state.contractInstance().methods.getCarInfoArr().call( (err, result) => {
              if (err) {
                console.log(" ■ GET_ACCIDENTS Error !! ", err)
              } else {
                console.log (" GET_ACCIDENTS ", result)
                store.commit(Constant.GET_ACCIDENTS,result);
                store.commit(Constant.GET_FILTER_ACCIDENTS,{'userCls':resultUserInfo.userCls,'centerCd':resultUserInfo.centerCd,'centerNm':resultUserInfo.centerNm});
                store.commit(Constant.CHANGE_VIEW_AND_TYPE, {currentView:"StatusAccident",userCls:resultUserInfo.userCls});
              }
            });
          }
          else if(payload.userCls=='I'){
            console.log(" 사용자 유형 : ", payload.userCls)
            store.commit(Constant.ADD_INSURER,payload.insCd, payload.insNm);
          }*/
            
        }
       

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
            store.dispatch(Constant.INIT_USER_CHECK);
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
            console.log (" ■ Get User Save ==> Commit", result)
            store.commit(Constant.GET_USER, result);    
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
            store.commit(Constant.APPLY_ACCIDENT,payload)
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
        await store.state.contractInstance().methods.getCarInfoArr().call( (err, result) => {
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
   
    // 사용자전용 - 수리요청 팝업 호출
    [Constant.OPEN_POPUP_REQUEST_REPAIR] : (store, payload) => {
      // DApp 호출 필요
      /*
        // 1. DApp 호출 : CarInfo 정보 받아오기 (파라미터 : 사고접수번호, 사용자정보 ?)
        // 2. 팝업화면 호출 (Response 데이터로 , 데이터 바인딩)
      */     

      // 임시로 DApp 호출 했다고 가정 후 수행
      console.log("팝업창 띄우기 ", Constant.OPEN_POPUP_REQUEST_REPAIR)
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

     // 고객전용 - 수리요청하기
     async [Constant.REQUEST_REPAIR] (store,payload) {
      try { 
        console.log(" ■ Action ==> REQUEST_REPAIR ", payload);

        await store.state.contractInstance().methods.repairRequest(payload.accReqNo,payload.centerCd,payload.centerNm).send({
          gas: 1000000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            alert(" 수리요청이 정상적으로 완료 되었습니다. ")
            store.commit(Constant.CANCEL_POPUP);
          }
        });
      } catch (err) {
        console.log(' ■ REQUEST_REPAIR Fail', err);
      }
    },

    // 공업사 - 수리완료 
    async [Constant.COMPLETE_REPAIR] (store,payload)  {
      try { 
        console.log(" ■ Action ==> COMPLETE_REPAIR ", payload);

        await store.state.contractInstance().methods.repairComplete(payload.accReqNo,payload.repairCost,payload.repairInfo).send({
          gas: 1000000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            alert(" 수리완료 되었습니다. ")
            store.commit(Constant.CANCEL_POPUP);
          }
        });
      } catch (err) {
        console.log(' ■ REQUEST_REPAIR Fail', err);
      }
    },

    // 공업사 - 수리비청구 
    async [Constant.REQUEST_REPAIR_FEE]  (store,payload)  {
      try { 
        console.log(" ■ Action ==> REQUEST_REPAIR_FEE ", payload);

        // repairCostRequest(uint _accReqNo, string _bankCd, string _bankAccount) 
        await store.state.contractInstance().methods.repairCostRequest(payload.accReqNo,"11",payload.bankAccount).send({
          gas: 1000000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            alert(" 수리비청구 완료 되었습니다. ")
            store.commit(Constant.CANCEL_POPUP);
          }
        });
      } catch (err) {
        console.log(' ■ REQUEST_REPAIR Fail', err);
      }
    },

    // 보험사 - 보험금 지급
    async [Constant.PAYMENT_REPAIR_FEE] (store,payload)  {
      try { 
        console.log(" ■ Action ==> PAYMENT_REPAIR_FEE ", payload);

        // repairCostPay(uint _accReqNo, string _bankCd, string _bankAccount) 
        await store.state.contractInstance().methods.repairCostPay(payload.accReqNo,"11",payload.bankAccount).send({
          gas: 1000000,
          from: store.state.web3.coinbase
        }, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            alert(" 보험금 지급이 완료 되었습니다. ")
            store.commit(Constant.CANCEL_POPUP);
          }
        });
      } catch (err) {
        console.log(' ■ PAYMENT_REPAIR_FEE Fail', err);
      }
    },
    

    [Constant.CANCEL_POPUP] : (store) => {
      store.commit(Constant.CANCEL_POPUP);
    },

}