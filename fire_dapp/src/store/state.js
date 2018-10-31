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
    insuranceList : [
        {userCls:"I", insurCd:"I001", insurNm : "보험사1",  customCd: "", customNm: "", authYn:"N" },
        {userCls:"I", insurCd:"I002", insurNm : "보험사2",  customCd: "", customNm: "", authYn:"N"  },
        {userCls:"I", insurCd:"I003", insurNm : "보험사3",  customCd: "", customNm: "", authYn:"N" },
        {userCls:"I", insurCd:"I004", insurNm : "보험사4",  customCd: "", customNm: "", authYn:"N" }
    ]   ,
    repairList : [
        {userCls:"R", repairCd:"R001", repairNm : "공업사1",  repairAccount : "" },
        {userCls:"R", repairCd:"R002", repairNm : "공업사2",  repairAccount : "" },
        {userCls:"R", repairCd:"R003", repairNm : "공업사3",  repairAccount : "" },
        {userCls:"R", repairCd:"R004", repairNm : "공업사4",  repairAccount : "" }
    ]   ,

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
    

}