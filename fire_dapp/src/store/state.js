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
        // {insCd:"I001", insNm : "삼성화재",  addr: ""  },
        // {insCd:"I002", insNm : "DB화재",    addr: ""   }
    ],
    initCenterInfoList : [
        // {centerCd:"C001", centerNm : "삼성센터",  addr : "" },
        // {centerCd:"C002", centerNm : "미라콤센터",  addr : "" }
    ],
    initCarInfoList : [
        
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
    // userInfo :{userAddr:"",userCls:"U", userId:"", userNm:"", insCd:"", insNm:"",centerCd:"",centerNm:""},
    userInfo : {userAddr:"",userCls:"U", userId:"", userNm:"", insCd:"", insNm:"",centerCd:"",centerNm:""},
    carInfos : [],
    centerInfos :[],
    insurerInfos :[]

}