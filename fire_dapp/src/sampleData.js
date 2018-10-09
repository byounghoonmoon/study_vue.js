var sampleData = {
  contacts : [
      { no:1001, name:'김유신', tel:'010-1212-3331', address:'경주' },
      { no:1002, name:'장보고', tel:'010-1212-3332', address:'청해진' },
      { no:1003, name:'관창', tel:'010-1212-3333', address:'황산벌' },
      { no:1004, name:'안중근', tel:'010-1212-3334', address:'해주' },
      { no:1005, name:'강감찬', tel:'010-1212-3335', address:'귀주' },
      { no:1006, name:'정몽주', tel:'010-1212-3336', address:'개성' },
      { no:1007, name:'이순신', tel:'010-1212-3337', address:'통제영' },
      { no:1008, name:'김시민', tel:'010-1212-3338', address:'진주' },
      { no:1009, name:'정약용', tel:'010-1212-3339', address:'남양주' }
  ],
  repairList : [
    { id:1, repairNm : "다고쳐_우수정비", done:false },
    { id:2, repairNm : "싸다싸_정비", done:true },
    { id:3, repairNm : "삼성_공업사", done:false },
    { id:4, repairNm : "미라콤_정비", done:false },
  ] ,
  insuranceList : [
    { id:1, insurNm : "삼성화재", done:false },
    { id:2, insurNm : "DB 보험", done:true },
    { id:3, insurNm : "메리츠", done:false },
    { id:4, insurNm : "현대해상", done:false },
  ] ,
  accidentList : [
    { no:201810050001, date:"2018-10-04", time:"04:00:12", content:"주차중 뒤에서 박음", 
      insurId:2 , insurNm:"DB 보험", 
      repairId:3 , repairNm:"삼성_공업사" , 
      repairItem:["A필러","사이드 가니쉬","헤드라이트","테일 램프"], 
      repairFee: 1000000 , repairYn : "Y", paymentYn : "Y"
    } ,
    { no:201810070001, date:"2018-10-06", time:"16:31:42", content:"집에 가려고 좌회전 신호시 충돌", 
      insurId:1 , insurNm:"삼성화재", 
      repairId:4 , repairNm:"미라콤_정비" , 
      repairItem:["A필러","사이드 가니쉬","헤드라이트","테일 램프"], 
      repairFee: 1000000 , repairYn : "Y", paymentYn : "Y"
    } ,
    { no:201810080001, date:"2018-10-07", time:"11:40:32", content:"비가와서 앞이 잘안보여서 우회전시 가로등 박음", 
      insurId:3 , insurNm:"메리츠", 
      repairId:2 , repairNm:"싸다싸_정비" , 
      repairItem:["A필러","사이드 가니쉬","헤드라이트","테일 램프"], 
      repairFee: 1000000 , repairYn : "Y", paymentYn : "Y"
    } ,
    { no:201810090001, date:"2018-10-08", time:"18:23:32", content:"퇴근후 주차장에서 나오다가 벽에 박음", 
      insurId:4 , insurNm:"현대해상", 
      repairId:1 , repairNm:"다고쳐_우수정비" , 
      repairItem:["A필러","사이드 가니쉬","헤드라이트","테일 램프"], 
      repairFee: 1000000 , repairYn : "Y", paymentYn : "N"
    } ,
    { no:201810100001, date:"2018-10-10", time:"19:42:15", content:"이마트2층에서 1층으로 내려다가 올라오는차가 앞박음", 
      insurId:1 , insurNm:"삼성화재", 
      repairId:4 , repairNm:"미라콤_정비" , 
      repairItem:["A필러","사이드 가니쉬","헤드라이트","테일 램프"], 
      repairFee: 1000000 , repairYn : "Y", paymentYn : "N"
    } 


  ]
}

export default sampleData;

