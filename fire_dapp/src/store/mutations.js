import Constant from '../Constant';

/* 
    Mutation의 경우, Action 에서 외부 API 호출을 비동기 처리 응답을 받은후 
    Commit을 해주어야 함. 
    따라서, 블록체인 Function(?) 호출 후 , 데이터 값 변경할 때 사용

*/
export default {
    
    [Constant.REGISTER_WEB3_INSTANCE] :(state, payload) => {
        console.log('registerWeb3instance Mutation being executed', payload);
        let result = payload;
        let web3Copy = state.web3;
        web3Copy.coinbase = result.coinbase;
        web3Copy.networkId = result.networkId;
        web3Copy.balance = parseInt(result.balance, 10);
        web3Copy.isInjected = result.injectedWeb3;
        web3Copy.web3Instance = result.web3;
        state.web3 = web3Copy;
      },
    // 사용자 인증
    [Constant.AUTH_USER] : (state, payload) => {
        if (payload.customCd !== "") {
            state.insuranceList.push(
                { id:new Date().getTime(), todo: payload.todo, done:false });
        }
    },
    // 사고접수 신청
    [Constant.APPLY_ACCIDENT] : (state, payload) => {
        if (payload.customCd !== "") {
            state.accidentHistoryList.push(
                { accidentNo:payload.accidentNo,
                    insurCd: payload.insurCd,
                    customCd : payload.customCd ,
                    accidentDate : payload.accidentDate, 
                    repairCd:"", 
                    repairFee:"", 
                    completeYn :"N" 
                }
            );
        }
    },
    // 수리 요청 (사고접수번호, 고객번호 , 보험사 코드)
    [Constant.REQUEST_REPAIR] : (state, payload) => {
        if (payload.repairCd !== "") {
            state.repairHistoryList.push(
                {   repairCd:1, 
                    repairFee : "", 
                    repairItem: "", 
                    accidentNo : payload.accidentNo, 
                    insurCd: payload.insurCd,
                    customCd: payload.customCd,
                    completeYn: "N",
                    applyYn : "N" }
            );
        }
    },
     // 수리 완료 (사고접수번호, 고객번호 , 보험사 코드)
     [Constant.COMPLETE_REPAIR] : (state, payload) => {
         
        var index = state.repairHistoryList.findIndex((item)=>item.accidentNo === payload.accidentNo);
        state.repairHistoryList[index].repairFee = payload.repairFee;
        state.repairHistoryList[index].repairItem = payload.repairItem;
        state.repairHistoryList[index].completeYn = "Y";
    },
    // 보험금 요청 (수리이력 테이블 [사고접수번호, 보험금요청여부], 사고접수 이력 테이블[사고접수번호, 공업사코드, 수리가격] )
    [Constant.APPLY_INSURANCE] : (state, payload) => {
        
        var index = state.repairHistoryList.findIndex((item)=>item.accidentNo === payload.accidentNo);
        state.repairHistoryList[index].applyYn = "Y";

        var index2 = state.accidentHistoryList.findIndex((item)=>item.accidentNo === payload.accidentNo);
        state.accidentHistoryList[index2].repairFee = payload.repairFee;
        state.accidentHistoryList[index2].repairCd  = payload.repairCd;

    },
    // 보험금 지급 (사고접수 이력 테이블[사고접수번호, 처리여부] )
    // 공업사 금액 이체 이후, 데이터들 ...
    // 
    [Constant.PAYMENT_INSURACNE] : (state, payload) => {
         
        var index = state.accidentHistoryList.findIndex((item)=>item.accidentNo === payload.accidentNo);
        state.accidentHistoryList[index].completeYn = "Y";
        
    }


}