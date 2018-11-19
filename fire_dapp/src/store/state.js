export default {
    // 블록체인 관련
    web3: {
        isInjected: false,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        error: null
    },
    contractInstance: {},

    // 현재사용자유형
    currentView :'AuthUser',
    userCls:"I",
    isAuthUserCheck:false,
    popupView : null,
    centerMode : null,

    
    // 초기값 정보 셋팅
    initInsurerInfoList : [
        {userCls:"I", insCd:"I001", insNm : "삼성화재",  addr: ""  },
        {userCls:"I", insCd:"I002", insNm : "DB화재",    addr: ""   }
    ],
    initCenterInfoList : [
        {userCls:"C", centerCd:"C001", centerNm : "삼성센터",  addr : "" },
        {userCls:"C", centerCd:"C002", centerNm : "미라콤센터",  addr : "" }
    ],
    initCarInfoList : [
        {   carNo:"12가 3456",  reqTel:"010-4730-5997", 
            accReqNo:"Accident_0001", accInfo:"강남역사거리", accReqDate:"2018-11-06 07:05:30", 
            userAddr:"", userId:"7322655", userNm:"문병훈", 
            insCd:"I001", insNm:"삼성화재", 
            centerCd:"C001", centerNm:"미라콤센터",
            repairCost:"", repairInfo:"범퍼", bankCd:"", bankAccount:"", status:"10"} ,
            
        {   carNo:"12가 3456",  reqTel:"010-4730-5997", 
            accReqNo:"Accident_0005", accInfo:"강남역사거리", accReqDate:"2018-11-06 07:05:30", 
            userAddr:"", userId:"7322655", userNm:"문병훈", 
            insCd:"I001", insNm:"삼성화재", 
            centerCd:"C002", centerNm:"삼성센터",
            repairCost:"", repairInfo:"범퍼", bankCd:"", bankAccount:"", status:"20"} ,
        {   carNo:"12가 3456",  reqTel:"010-4730-5997", 
            accReqNo:"Accident_0002", accInfo:"강남역사거리", accReqDate:"2018-11-06 07:05:30", 
            userAddr:"", userId:"7322655", userNm:"문병훈", 
            insCd:"I001", insNm:"삼성화재", 
            centerCd:"C001", centerNm:"미라콤센터",
            repairCost:"50000", repairInfo:"앞범퍼 및 좌측 사이드미러", bankCd:"", bankAccount:"", status:"30"} ,
        {   carNo:"12가 3456",  reqTel:"010-4730-5997", 
            accReqNo:"Accident_0003", accInfo:"강남역사거리", accReqDate:"2018-11-06 07:05:30", 
            userAddr:"", userId:"7322655", userNm:"문병훈", 
            insCd:"I001", insNm:"삼성화재", 
            centerCd:"C001", centerNm:"미라콤센터",
            repairCost:"10000", repairInfo:"와이퍼 교체", bankCd:"760702-04-178719", bankAccount:"국민은행", status:"40"} ,
        {   carNo:"34가 3456",  reqTel:"010-4730-5997", 
            accReqNo:"Accident_0004", accInfo:"강남역사거리", accReqDate:"2018-11-06 07:05:30", 
            userAddr:"", userId:"7322655", userNm:"문병훈", 
            insCd:"I001", insNm:"삼성화재", 
            centerCd:"C001", centerNm:"미라콤센터",
            repairCost:"100000", repairInfo:"수리완료", bankCd:"", bankAccount:"카카오뱅크", status:"50"}
    ],
  
    

    // CarHub 최종 state 정의 

    // 블록체인 등록수
    userCnt : "",

    carInfo :{  carNo:"",  reqTel:"", 
                accReqNo:"", accInfo:"", accReqDate:"", 
                userAddr:"", userId:"", userNm:"", 
                insCd:"", insNm:"", 
                centerCd:"", centerNm:"",
                repairCost:"", repairInfo:"", bankCd:"", bankAccount:"", status:""
    },
    userInfo :{userCls:"U", userId:"", userNm:"", insCd:"", insNm:"",centerCd:"",centerNm:""}


}