pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract CarHub {

    struct UserInfo {
        address userAddr;
        string userId;
        string userNm;
        string insCd;
        string insNm;
    }

    struct CarInfo {
        string carNo;
        string reqTel;
        uint accReqNo;
        address userAddr;
        string userId;
        string userNm;
        string insCd;
        string insNm;
        string accInfo;
        string accReqDate; 
        string centerCd; 
        string centerNm; 
        uint repairCost;
        string repairInfo;
        string bankAccount;
        string status;
    }

    uint private carCount;
    mapping(uint => CarInfo) private carInfos;
    uint[] private accReqNos;
    uint private accReqNo;

    uint private userCount;
    mapping(address => UserInfo) private userInfos;
    address[] private userAddrs;
    UserInfo[] private userInfoArr;


    // 인증된 사용자 수식자
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

    event printUint(string _name, uint _value);
    event printString(string _name, string _value);

    constructor() public {
        // initData();
    }

    // 이름 없는 함수(송금되면 실행된다) payable을 지정해 Ether를 받는 것이 가능
    //function () public payable {}
    /* 
    function initData() private returns (uint) {
        
        userCount = user.authUser(0x31029fa51d147935868f87df9d4e48d7ff1162c8,"P", "P001", "고객1", "I001","보험사1");
        userCount = user.authUser(0x1d6b98379a7905153e41ae58f6bc1aeb4ce02a5b, "P", "P002", "고객2", "I001","보험사1");
        userCount = user.authUser(0x314699a81c307271a7e6ddc46b9d0ef09fc24410, "I", "", "", "I001","보험사2");
        userCount = user.authUser(0xf1aa2a2460f5f411d30da8e69ccb8cf9e8c4284f, "I", "", "", "I002","보험사2");
        
        userCount = user.authUser(0xdd870fa1b7c4700f2bd7f44238821c26f7392148, "C", "", "", "C001","삼성공업사");
        
        userCount = user.authUser(0xEc9f4c42D1782F6688B82A2a7d358ff26fB6927A,"P", "P001", "고객1", "I001","보험사1");
        userCount = user.authUser(0x41bbA103D3Aa7f1Fb41d6cd4A6822837a5E34895, "P", "P002", "고객2", "I001","보험사1");
        userCount = user.authUser(0xf9c6D2F68EBd9359966f2c4f6cf858ADcFE4932D, "I", "", "", "I001","보험사2");
        userCount = user.authUser(0x685494E31eFd815BdE7d433C3dCD263EfDFE6c0B, "I", "", "", "I002","보험사2");
        
        return 0;
    }
    */

    /**
     * 사용자 인증
     * "P001", "이고객", "I001","삼성화재"
     */
    //function authUser(string _userId, string _userNm, string _insCd, string _insNm) public returns (uint) {
    function authUser(string _userId, string _userNm, string _insCd, string _insNm) public {
        if (!isUser()) {
            userInfos[msg.sender].userAddr = msg.sender;
            userInfos[msg.sender].userId = _userId;        
            userInfos[msg.sender].userNm = _userNm;
            userInfos[msg.sender].insCd = _insCd;
            userInfos[msg.sender].insNm = _insNm;

            userAddrs.push(msg.sender);

            userInfoArr.push(UserInfo({
                userAddr : msg.sender,
                userId : _userId,
                userNm : _userNm,
                insCd : _insCd,
                insNm : _insNm
            }));

            ++userCount;
        }
    }

    
    function getUserCount() public view returns (uint) {
        return userCount;
    }

    function getUser() public view returns (address, string, string, string, string) {
        return (userInfos[msg.sender].userAddr, userInfos[msg.sender].userId, userInfos[msg.sender].userNm, userInfos[msg.sender].insCd, userInfos[msg.sender].insNm);
    }

    function getUser(uint _id) public view returns (address, string, string, string, string) {
        address userAddr = userAddrs[_id];
        return (userInfos[userAddr].userAddr, userInfos[userAddr].userId, userInfos[userAddr].userNm, userInfos[userAddr].insCd, userInfos[userAddr].insNm);
    }

    function getUsers() public view returns (UserInfo[]) {
        return userInfoArr;
    }

    function isUser() public view returns (bool) {
        if (userInfos[msg.sender].userAddr == msg.sender) {
            return true;
        }
        return false;
    }

    /**
     * 사고접수 
     * "11가1234","010-111-1111", "I001", "삼성화재","사고내용..", "20181101"
     */
    function accRequest(string _carNo, string _reqTel, string _insCd, string _insNm, string _accInfo, string _accReqDate) authedUser public {

        accReqNo = block.timestamp;

        carInfos[accReqNo].userAddr = msg.sender;
        carInfos[accReqNo].carNo = _carNo;
        carInfos[accReqNo].reqTel = _reqTel;
        carInfos[accReqNo].accReqNo = accReqNo;
        carInfos[accReqNo].userId = userInfos[msg.sender].userId;
        carInfos[accReqNo].userNm = userInfos[msg.sender].userNm;
        carInfos[accReqNo].insCd = _insCd;
        carInfos[accReqNo].insNm = _insNm;
        carInfos[accReqNo].accInfo = _accInfo;
        carInfos[accReqNo].accReqDate = _accReqDate;
        carInfos[accReqNo].status = "10"; // 사고접수

        accReqNos.push(accReqNo);
        ++carCount;
    }

    function getAccReqNo() public view returns (uint) {
        return accReqNo;
    }

    /**
     * 수리요청 
     *  1111, "C001", "삼성센터" 
     */
    function repairRequest(uint _accReqNo, string _centerCd, string _centerNm) checkAccReqUser(_accReqNo) public {
        carInfos[_accReqNo].centerCd = _centerCd;
        carInfos[_accReqNo].centerNm = _centerNm;
        carInfos[_accReqNo].status = "20"; // 수리요청
    }

    function getCarInfoStatus(uint _accReqNo) public view returns (string) {
        return carInfos[_accReqNo].status;
    }
}