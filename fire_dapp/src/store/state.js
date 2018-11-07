export default {
    web3: {
        isInjected: false,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        error: null
    },
    contractInstance: {},
    userCnt : "",
    popupView : null, 
    // 초기값 정보 셋팅
    initInsurerInfoList : [
        {userCls:"I", insurCd:"I001", insurNm : "삼성화재",  addr: ""  },
        {userCls:"I", insurCd:"I002", insurNm : "DB화재",    addr: ""   }
    ],
    initCenterInfoList : [
        {userCls:"C", repairCd:"C001", repairNm : "삼성센터",  addr : "" },
        {userCls:"C", repairCd:"C002", repairNm : "미라콤센터",  addr : "" }
    ],
    initCarInfoList : [
        {   carNo:"12가 3456",  reqTel:"010-4730-5997", 
            accReqNo:"Accident_0001", accInfo:"강남역사거리", accReqDate:"2018-11-06 07:05:30", 
            userAddr:"", userId:"7322655", userNm:"문병훈", 
            insCd:"I001", insNm:"삼성화재", 
            centerCd:"C001", centerNm:"미라콤센터",
            repairCost:"", repairInfo:"범퍼", bankCd:"", bankAccount:"", status:"20"} ,
            
        {   carNo:"12가 3456",  reqTel:"010-4730-5997", 
            accReqNo:"Accident_0005", accInfo:"강남역사거리", accReqDate:"2018-11-06 07:05:30", 
            userAddr:"", userId:"7322655", userNm:"문병훈", 
            insCd:"I001", insNm:"삼성화재", 
            centerCd:"C001", centerNm:"미라콤센터",
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

    repairHistoryList :[
        { repairCd:"R001", repairFee : "", repairItem: ["백미러", "상향등"], accidentNo :"", insurCd:"I001",customCd:"", completeYn:"N", applyYn :"N"},
        { repairCd:"R002", repairFee : "", repairItem: ["백미러", "상향등"], accidentNo :"", insurCd:"I001",customCd:"", completeYn:"N", applyYn :"N"},
        { repairCd:"R003", repairFee : "", repairItem: ["백미러", "상향등"], accidentNo :"", insurCd:"I001",customCd:"", completeYn:"N", applyYn :"N"},       
        { repairCd:"R004", repairFee : "", repairItem: ["백미러", "상향등"], accidentNo :"", insurCd:"I001",customCd:"", completeYn:"N", applyYn :"N"} 
    ] ,
    
    accidentHistoryList :[
            { accidentNo:"201810150001", insurCd : "", customCd :"", accidentDate :"", accidentContents:"", repairCd:"",repairFee:"",completeYn:"N"}, 
            { accidentNo:"201810150002", insurCd : "", customCd :"", accidentDate :"", accidentContents:"", repairCd:"",repairFee:"",completeYn:"N"},
            { accidentNo:"201810150003", insurCd : "", customCd :"", accidentDate :"", accidentContents:"", repairCd:"",repairFee:"",completeYn:"N"},
            { accidentNo:"201810150004", insurCd : "", customCd :"", accidentDate :"", accidentContents:"", repairCd:"",repairFee:"",completeYn:"N"}
    ]            
    

    // CarHub 최종 state 정의 

    , 
    CarInfoList :[],
    UserInfoList :[],
    InsurerInfoList:[],
    CenterInfoList:[],

    carInfo :{  carNo:"",  reqTel:"", 
                accReqNo:"", accInfo:"", accReqDate:"", 
                userAddr:"", userId:"", userNm:"", 
                insCd:"", insNm:"", 
                centerCd:"", centerNm:"",
                repairCost:"", repairInfo:"", bankCd:"", bankAccount:"", status:""
    }


}