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
        // console.log(' ★ State 동기화 ', state.web3);
        // pollWeb3();
    },
    
    [Constant.GET_CONTRACT_INSTANCE]  (state, payload) {
        state.contractInstance = () => payload;
        //console.log(' ■ Mutation ==> CarHub contract instance: ', payload);
    },
    
    [Constant.IS_AUTH_USER_CHECK]  (state, payload) {
        //console.log(' ■ Mutation ==> isAuthUserCheck ', payload)
        state.isAuthUserCheck = payload;
    },
    
    [Constant.GET_USER_COUNT]  (state, payload) {
        console.log(" ■ Mutation ==> GetUserCount : ", payload)
        state.userCnt = payload;
    },
    
    [Constant.GET_USER]  (state, payload) {
        console.log(" ■ Mutation ==> GetUser , userInfo Setting : ", payload)
        const userInfo = {};
        userInfo.userAddr   = payload.userAddr;
        userInfo.userId     = payload.userId;
        userInfo.userNm     = payload.userNm;
        userInfo.userCls    = payload.userCls; 
        userInfo.insCd      = payload.insCd;
        userInfo.insNm      = payload.insNm;
        userInfo.centerCd      = payload.centerCd;
        userInfo.centerNm      = payload.centerNm;
        state.userInfo = userInfo;        
    },
    // 사고 접수 신청
    [Constant.APPLY_ACCIDENT]  (state, payload) {
        console.log(" ■ Mutation ==> CarInfoList push : ", payload)
        state.initCarInfoList.push(payload);
        state.carInfo = {  carNo:"",  reqTel:"", 
        accReqNo:"", accInfo:"", accReqDate:"", 
        userAddr:"", userId:"", userNm:"", 
        insCd:"", insNm:"", 
        centerCd:"", centerNm:"",
        repairCost:"", repairInfo:"", bankCd:"", bankAccount:"", status:""}
    
    },
    
    // 전체 사고접수현황 가져오기 
    [Constant.GET_ACCIDENTS]  (state, payload) {
        console.log("############## ", payload.length)
        state.initCarInfoList = [];
        payload.forEach(element => {
            const carInfo ={};
            carInfo.accInfo 	=	element.accInfo	;
            carInfo.accReqDate	=	element.accReqDate	;
            carInfo.accReqNo	=	element.accReqNo	;
            carInfo.bankAccount	=	element.bankAccount	;
            carInfo.bankCd  	=	element.bankCd	;
            carInfo.carNo   	=	element.carNo	;
            carInfo.centerCd	=	element.centerCd	;
            carInfo.centerNm	=	element.centerNm	;
            carInfo.idx     	=	element.idx	;
            carInfo.insCd   	=	element.insCd	;
            carInfo.insNm   	=	element.insNm	;
            carInfo.repairCost	=	element.repairCost	;
            carInfo.repairInfo	=	element.repairInfo	;
            carInfo.reqTel  	=	element.reqTel	;
            carInfo.status  	=	element.status	;
            carInfo.userAddr	=	element.userAddr	;
            carInfo.userId  	=	element.userId	;
            carInfo.userNm  	=	element.userNm	;
            state.initCarInfoList.push(carInfo);
        });
    },
    // 사고접수현황 필터
    [Constant.GET_FILTER_ACCIDENTS]  (state, payload) {
        

        if(payload.userCls =='U'){
            state.carInfos = state.initCarInfoList.filter(function(item){
                return item.userAddr== payload.userAddr;
            });
        }else if(payload.userCls=='C'){
            state.carInfos = state.initCarInfoList.filter(function(item){
                return item.centerCd== payload.centerCd;
            });
        }else if(payload.userCls =='I'){
            console.log(" 보험사 필터적용 ")
            state.carInfos = state.initCarInfoList.filter(function(item){
                return item.insCd== payload.insCd;
            });
        }
        // 전체사고리스트 삭제
        state.initCarInfoList = [];
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

    // 화면 및 사용자 유형 변경
    [Constant.CHANGE_VIEW_AND_TYPE] : (state,payload) => {
        state.currentView = payload.currentView;
        state.userCls = payload.userCls;
    } ,

    // 센터 모드 변경 
    [Constant.CHANGE_CENTER_MODE] : (state,payload) => {
        state.centerMode = payload.centerMode;
    } ,
     // 센터 및 보험사 추가
     [Constant.INIT_SELECT_DATA] : (state,payload) => {
        
        state.centerInfos = state.initCenterInfoList;
        state.insurerInfos = state.initInsurerInfoList;

        payload.forEach(item => {
            if(item.userCls=='C')
                state.centerInfos.push({'centerCd':item.centerCd,'centerNm':item.centerNm})
            else if(item.userCls=='I')
                state.insurerInfos.push({'insCd':item.insCd,'insNm':item.insNm})
        });
    }  ,

    // 사고 신청 초기화 
    ['initCarinfo'] :(state)=>{
        state.carInfo = {};
    }


    


}