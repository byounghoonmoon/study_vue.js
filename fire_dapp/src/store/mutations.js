import Constant from '../Constant';

/* 
    Mutation의 경우, Action 에서 외부 API 호출을 비동기 처리 응답을 받은후 
    Commit을 해주어야 함. 
    따라서, 블록체인 Function(?) 호출 후 , 데이터 값 변경할 때 사용

*/
export default {

    [Constant.REGISTER_WEB3_INSTANCE]  (state, payload) {
        
        let result = payload;
        let web3Copy = state.web3;
        web3Copy.coinbase = result.coinbase;
        web3Copy.networkId = result.networkId;
        web3Copy.balance = parseInt(result.balance, 10);
        web3Copy.isInjected = result.injectedWeb3;
        web3Copy.web3Instance = result.web3;
        state.web3 = web3Copy;
        console.log(' ★ State 동기화 ', state.web3);
        // pollWeb3();
    },
    
    [Constant.GET_CONTRACT_INSTANCE]  (state, payload) {
        console.log('CarHub contract instance: ', payload);
        state.contractInstance = () => payload;
        console.log('CarHub contract instance: ', state.contractInstance);
    },
    
    [Constant.GET_USER_COUNT]  (state, payload) {
        state.userCnt = payload.c[0];
    },
     // 팝업 호출 - (공통) 사고접수 상세보기
     [Constant.OPEN_POPUP_ACCIDENT_DETAIL] : (state, payload) => {
        state.carInfo = payload.carInfo;
        state.popupView = "PopupAccidentInfo";
    },
    // 팝업 호출 - (고객) 수리요청 하기
    [Constant.OPEN_POPUP_REQUEST_REPAIR] : (state, payload) => {
        state.carInfo = payload.carInfo;
        state.popupView = "PopupRequestRepair";
    },
    // 팝업 호출 - (공업사) 수리하기/수리비 청구하기
    [Constant.OPEN_POPUP_REPAIR_INFO] : (state, payload) => {
        state.carInfo = payload.carInfo;
        state.popupView = "PopupRepairInfo";
    },
    // 팝업 호출 - (보험사) 지급하기
    [Constant.OPEN_POPUP_PAYMENT_FEE] : (state, payload) => {
        state.carInfo = payload.carInfo;
        state.popupView = "PopupPaymentFee";
    },

     // 고객 - 수리 요청 (사고접수번호, 고객번호 , 보험사 코드)
     [Constant.REQUEST_REPAIR] : (state, payload) => {
        
        // 블록체인 연동하지 않았기 때문에, initCarInfo에 셋팅
        var index = state.initCarInfoList.findIndex((item)=>item.accReqNo === payload.accReqNo);
        state.initCarInfoList[index].centerCd = payload.centerCd;
        state.initCarInfoList[index].centerNm = payload.centerNm;
        state.initCarInfoList[index].status= "20";
        state.popupView = null;

    },
    // 수리 완료 (사고접수번호, 고객번호 , 보험사 코드)
    [Constant.COMPLETE_REPAIR] : (state, payload) => {

        // 블록체인 연동하지 않았기 때문에, initCarInfo에 셋팅
        var index = state.initCarInfoList.findIndex((item)=>item.accReqNo === payload.accReqNo);
        state.initCarInfoList[index].repairCost = payload.repairCost;
        state.initCarInfoList[index].repairInfo = payload.repairInfo;
        state.initCarInfoList[index].bankCd     = payload.bankCd;
        state.initCarInfoList[index].bankAccount= payload.bankAccount;
        state.initCarInfoList[index].status= "30";
        state.popupView = null;

    },
    // 수리비 청구 (상태코드만 변경:40)
    [Constant.REQUEST_REPAIR_FEE] : (state, payload) => {
        
        // 블록체인 연동하지 않았기 때문에, initCarInfo에 셋팅
        var index = state.initCarInfoList.findIndex((item)=>item.accReqNo === payload.accReqNo);
        state.initCarInfoList[index].repairCost = payload.repairCost;
        state.initCarInfoList[index].repairInfo = payload.repairInfo;
        state.initCarInfoList[index].bankCd     = payload.bankCd;
        state.initCarInfoList[index].bankAccount= payload.bankAccount;
        state.initCarInfoList[index].status= "40";
        state.popupView = null;

    },
    // 보험금 지급 (상태코드만 변경:50)
    [Constant.PAYMENT_REPAIR_FEE] : (state, payload) => {
        
        // 블록체인 연동하지 않았기 때문에, initCarInfo에 셋팅
        var index = state.initCarInfoList.findIndex((item)=>item.accReqNo === payload.accReqNo);
        state.initCarInfoList[index].status= "50";
        state.popupView = null;

    },
    // 팝업 닫기
    [Constant.CANCEL_POPUP] : (state) => {
        state.popupView = null;
    } ,

    // 사용자 변경
    [Constant.CHANGE_USER] : (state,payload) => {
        state.userCls = payload.userCls;
    } ,

    // 센터 모드 변경 
    [Constant.CHANGE_CENTER_MODE] : (state,payload) => {
        state.centerMode = payload.centerMode;
    } 
    


}