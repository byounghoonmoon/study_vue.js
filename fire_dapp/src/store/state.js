export default {
    web3: {
        isInjected: false,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        error: null
    },
    contractInstance: null,
    insuranceList : [
        { insurCd:1, insurNm : "삼성화재", customCd: "", customNm: "", authYn:"N" },
        { insurCd:2, insurNm : "DB 보험",  customCd: "", customNm: "", authYn:"N"  },
        { insurCd:3, insurNm : "메리츠", customCd: "", customNm: "", authYn:"N" },
        { insurCd:4, insurNm : "현대해상",  customCd: "", customNm: "", authYn:"N" }
    ]   ,
    repairList : [
        { repairCd:1, repairNm : "싸다싸_공업", repairAccount : "" },
        { repairCd:2, repairNm : "삼성정비소",  repairAccount : "" },
        { repairCd:3, repairNm : "사고안나_정비소",   repairAccount : "" },
        { repairCd:4, repairNm : "카닥", repairAccount : "" }
    ]   ,

    repairHistoryList :[
        { repairCd:1, repairFee : "", repairItem: ["백미러", "상향등"], accidentNo :"", insurCd:"1",customCd:"", completeYn:"N", applyYn :"N"},
        { repairCd:2, repairFee : "", repairItem: ["백미러", "상향등"], accidentNo :"", insurCd:"1",customCd:"", completeYn:"N", applyYn :"N"},
        { repairCd:3, repairFee : "", repairItem: ["백미러", "상향등"], accidentNo :"", insurCd:"1",customCd:"", completeYn:"N", applyYn :"N"},       
        { repairCd:4, repairFee : "", repairItem: ["백미러", "상향등"], accidentNo :"", insurCd:"1",customCd:"", completeYn:"N", applyYn :"N"} 
    ] ,
    
    accidentHistoryList :[
            { accidentNo:"201810150001", insurCd : "", customCd :"", accidentDate :"", accidentContents:"", repairCd:"",repairFee:"",completeYn:"N"}, 
            { accidentNo:"201810150002", insurCd : "", customCd :"", accidentDate :"", accidentContents:"", repairCd:"",repairFee:"",completeYn:"N"},
            { accidentNo:"201810150003", insurCd : "", customCd :"", accidentDate :"", accidentContents:"", repairCd:"",repairFee:"",completeYn:"N"},
            { accidentNo:"201810150004", insurCd : "", customCd :"", accidentDate :"", accidentContents:"", repairCd:"",repairFee:"",completeYn:"N"}
    ]            
    

}