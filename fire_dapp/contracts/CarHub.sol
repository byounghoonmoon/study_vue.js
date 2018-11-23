pragma solidity ^0.4.24;

pragma experimental ABIEncoderV2;



// 자동차허브 컨트랙트 선언

contract CarHub {


    // 사용자 정보 구조체(고객,보험사,공업사 통합) 

    struct UserInfo {

        address userAddr; // 고객 계정주소

        string userCls; // 사용자 구분(U:고객, I:보험사, C:공업사)

        string userId; // 고객 번호

        string userNm; // 고객 명

        string insCd; // 보험사 코드

        string insNm; // 보험사 명 

        string centerCd; // 공업사 코드

        string centerNm; // 공업사 명

} 

    

    // 사고/수리 정보 구조체

    struct CarInfo {

        string carNo; // 차량번호

        string reqTel; // 전화번호

        uint accReqNo; // 사고접수 번호

        address userAddr; // 고객 계정주소

        string userId; // 고객 번호

        string userNm; // 고객 명

        string insCd; // 보험사 코드

        string insNm; // 보험사 명

        string accInfo; // 사고내역

        string accReqDate; // 사고접수 일자

        string centerCd; // 공업사 코드

        string centerNm; // 공업사 명

        uint repairCost; // 수리비용

        string repairInfo; // 수리내역

        string bankCd; // 은행명

        string bankAccount; // 계좌번호 

        string status; // 상태(접수, 처리중, 종결)

        uint idx; // 배열 index


}

    

    

    // 고객 상태 변수 선언 

    uint private userCount;

    mapping(address => UserInfo) private userInfos;

    address[] private userAddrs;

UserInfo[] private userInfoArr;

    

    // 사고/수리 상태 변수 선언

    uint private carCount;

    mapping(uint => CarInfo) private carInfos;

    uint[] private accReqNos;

    uint private accReqNo;

CarInfo[] private carInfoArr;



    // 사용자 인증 수식자

    modifier authedUser() {

        //if (msg.sender != users[msg.sender].userAddr) revert();

        require (msg.sender == userInfos[msg.sender].userAddr);

_;

}


    // 사고접수자 검증 수식자

    modifier checkAccReqUser(uint _accReqNo) {

        require(_accReqNo == carInfos[_accReqNo].accReqNo && msg.sender == carInfos[_accReqNo].userAddr);

_;

}

    

    // 사고접수 공업사 검증 수식자 (solidity에는 string비교함수가 없으므로 SHA해시로 비교)

    modifier checkAccReqCenter(uint _accReqNo) {

        require(_accReqNo == carInfos[_accReqNo].accReqNo && keccak256(abi.encodePacked(userInfos[msg.sender].centerCd)) == keccak256(abi.encodePacked(carInfos[_accReqNo].centerCd)));

_;

} 

 

 // 사고접수 보험사 검증 수식자 (solidity에는 string비교함수가 없으므로 SHA해시로 비교)

    modifier checkAccReqIns(uint _accReqNo) {

        require(_accReqNo == carInfos[_accReqNo].accReqNo && keccak256(abi.encodePacked(userInfos[msg.sender].insCd)) == keccak256(abi.encodePacked(carInfos[_accReqNo].insCd)));

_;

}


    // 이벤트 정의

    event printUint(string _name, uint _value);

    event printString(string _name, string _value);


    constructor() public {

        // initData();

}


    // 이름 없는 함수(송금되면 실행된다) payable을 지정해 Ether를 받는 것이 가능

    //function () public payable {}

   


    /**

* 1.사용자 인증

* "U", "U001", "이고객", "I001","삼성화재","",""

* 2.보험사 인증

* "I", "", "", "I001","삼성화재", "", ""

* 3.공업사 인증

* "C", "", "", "", "", "C001", "삼성센터"

*/

    function authUser(string _userCls, string _userId, string _userNm, string _insCd, string _insNm, string _centerCd, string _centerNm) public {

         if (!isUser()) {

userInfos[msg.sender].userAddr = msg.sender;

userInfos[msg.sender].userCls = _userCls;

userInfos[msg.sender].userId = _userId; 

userInfos[msg.sender].userNm = _userNm;

userInfos[msg.sender].insCd = _insCd;

userInfos[msg.sender].insNm = _insNm;

userInfos[msg.sender].centerCd = _centerCd;

userInfos[msg.sender].centerNm = _centerNm;


userAddrs.push(msg.sender);


userInfoArr.push(UserInfo({

userAddr : msg.sender,

userCls : _userCls,

userId : _userId,

userNm : _userNm,

insCd : _insCd,

insNm : _insNm,

centerCd : _centerCd,

centerNm : _centerNm

}));


            ++userCount;

}

}


    

    function getUserCount() public view returns (uint) {

        return userCount;

}


    function getUser() public view returns (UserInfo) {

        return (userInfos[msg.sender]);

}


    function getUser(uint _idx) public view returns (address, string, string, string, string, string, string, string) {

        address userAddr = userAddrs[_idx];

        return (userInfos[userAddr].userAddr, userInfos[userAddr].userCls, userInfos[userAddr].userId, userInfos[userAddr].userNm, userInfos[userAddr].insCd, userInfos[userAddr].insNm, userInfos[userAddr].centerCd, userInfos[userAddr].centerNm);

}


    function getUserInfoArr() public view returns (UserInfo[]) {

        return userInfoArr;

}


    function isUser() public view returns (bool) {

        if (userInfos[msg.sender].userAddr == msg.sender) {

            return true;

}

        return false;

}

    

    function getUsers() external view returns (address[]) {

        return userAddrs;

}


    /**

* 4.사고접수 

* "11가1234","010-111-1111", "I001", "삼성화재","우측 범퍼 추돌", "20181101"

*/

    function accRequest(string _carNo, string _reqTel, string _insCd, string _insNm, string _accInfo, string _accReqDate) authedUser public {


accReqNo = block.timestamp;

        

carInfos[accReqNo].carNo = _carNo;

carInfos[accReqNo].reqTel = _reqTel;

carInfos[accReqNo].accReqNo = accReqNo;

carInfos[accReqNo].userAddr = msg.sender;

carInfos[accReqNo].userId = userInfos[msg.sender].userId;

carInfos[accReqNo].userNm = userInfos[msg.sender].userNm;

carInfos[accReqNo].insCd = _insCd;

carInfos[accReqNo].insNm = _insNm;

carInfos[accReqNo].accInfo = _accInfo;

carInfos[accReqNo].accReqDate = _accReqDate;

carInfos[accReqNo].status = "10"; // 사고접수

carInfos[accReqNo].idx = carCount;


accReqNos.push(accReqNo);

  

carInfoArr.push(CarInfo({ 

carNo : _carNo,

reqTel : _reqTel,

accReqNo : accReqNo,

userAddr : msg.sender,

userId : userInfos[msg.sender].userId,

userNm : userInfos[msg.sender].userNm,

insCd : _insCd,

insNm : _insNm,

accInfo : _accInfo,

accReqDate : _accReqDate,

centerCd : "",

centerNm : "",

repairCost : 0,

repairInfo : "",

bankCd : "",

bankAccount : "", 

status : "10",

idx : carCount

}));


        ++carCount;

}


 /**

* 사고접수번호

* 1542523904

*/

    function getAccReqNo() public view returns (uint) {

        return accReqNo;

}


    /**

* 5.수리요청 

* 1542523904, "C001", "삼성센터" 

*/

    function repairRequest(uint _accReqNo, string _centerCd, string _centerNm) checkAccReqUser(_accReqNo) public {

carInfos[_accReqNo].centerCd = _centerCd;

carInfos[_accReqNo].centerNm = _centerNm;

carInfos[_accReqNo].status = "20"; // 수리요청

  

        uint idx = carInfos[_accReqNo].idx;

carInfoArr[idx].centerCd = _centerCd;

carInfoArr[idx].centerNm = _centerNm;

carInfoArr[idx].status = "20";

} 

    

    /**

* 6.수리완료 

* 1542523904, 250000, "우측 범퍼 수리" 

*/

    function repairComplete(uint _accReqNo, uint _repairCost, string _repairInfo) checkAccReqCenter(_accReqNo) public { 

carInfos[_accReqNo].repairCost = _repairCost; // 수리비용

carInfos[_accReqNo].repairInfo = _repairInfo; // 수리내역

carInfos[_accReqNo].status = "30"; // 수리완료

  

        uint idx = carInfos[_accReqNo].idx;

carInfoArr[idx].repairCost = _repairCost;

carInfoArr[idx].repairInfo = _repairInfo; 

carInfoArr[idx].status = "30";

}

    

    /**

* 7.수리비 요청 

* 1542523904, "020", "10305952102111" 

*/

    function repairCostRequest(uint _accReqNo, string _bankCd, string _bankAccount) checkAccReqCenter(_accReqNo) public { 

carInfos[_accReqNo].bankCd = _bankCd; // 은행코드

carInfos[_accReqNo].bankAccount = _bankAccount; // 계좌번호

carInfos[_accReqNo].status = "40"; // 수리비 요청

  

        uint idx = carInfos[_accReqNo].idx;

carInfoArr[idx].bankCd = _bankCd;

carInfoArr[idx].bankAccount = _bankAccount;

carInfoArr[idx].status = "40";

}

    

    /**

* 8.수리비 지급 

* 1542523904 

*/

    function repairCostPay(uint _accReqNo, string _bankCd, string _bankAccount) checkAccReqIns(_accReqNo) public {

carInfos[_accReqNo].status = "50"; // 수리비 지급

  

        uint idx = carInfos[_accReqNo].idx;

carInfoArr[idx].status = "50";

}

 

    /**

* 9.사고현황

* 1542523904 

*/

    function getCarInfoArr() public view returns (CarInfo[]) {

        return carInfoArr;

}


    

    /**

* 상태조회 

* 1542523904 

*/

    function getCarInfoStatus(uint _accReqNo) public view returns (string) {

        return carInfos[_accReqNo].status;

}

  

}
