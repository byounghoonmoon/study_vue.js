export default {
    // 블록체인 관련 정보
    REGISTER_WEB3_INSTANCE : "registerWeb3Instance",
    GET_CONTRACT_INSTANCE : "getContractInstance",
    NETWORKS : {
        '1': 'Main Net',
        '2': 'Deprecated Morden test network',
        '3': 'Ropsten test network',
        '4': 'Rinkeby test network',
        '42': 'Kovan test network',
        '4447': 'Truffle Develop Network',
        '5777': 'Ganache Blockchain'
    },
    IS_AUTH_USER_CHECK :"isAuthUserCheck",
    
    // 팝업관련 정보
    OPEN_POPUP_ACCIDENT_DETAIL : "openPopupAccidentDetail",
    OPEN_POPUP_REQUEST_REPAIR : "openPopupRequestRepair",
    OPEN_POPUP_REPAIR_INFO : "openPopupRepairInfo",
    OPEN_POPUP_PAYMENT_FEE : "openPopupPaymentFee",
    CANCEL_POPUP : "cancelPopup",

    CHANGE_VIEW_AND_TYPE : "changeViewAndType",
    CHANGE_CENTER_MODE : "changeCenterMode",

    // DApp 조회 관련
    IS_AUTH_USER : "isAuthUser",
    GET_USER_COUNT : "getUserCount",
    GET_USER : "getUser",

    // DApp 트랜잭션 발생 관련 
    REGISTER_AUTH_USER : "registerAuthUser",
    APPLY_ACCIDENT : "applyAccident",
    REQUEST_REPAIR : "requestRepair",
    COMPLETE_REPAIR : "completeRepair",
    REQUEST_REPAIR_FEE : "requestRepairFee",
    PAYMENT_REPAIR_FEE : "paymentRepairFee",

    // 컨트랙트 정보
    ADDRESS : "0x9f71a296D7cFD4c4a1F89856D3041063Cb044a17",
    ABI :[
        {
            "constant": true,
            "inputs": [],
            "name": "getUsers",
            "outputs": [
                {
                    "components": [
                        {
                            "name": "userAddr",
                            "type": "address"
                        },
                        {
                            "name": "userId",
                            "type": "string"
                        },
                        {
                            "name": "userNm",
                            "type": "string"
                        },
                        {
                            "name": "insCd",
                            "type": "string"
                        },
                        {
                            "name": "insNm",
                            "type": "string"
                        }
                    ],
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_carNo",
                    "type": "string"
                },
                {
                    "name": "_reqTel",
                    "type": "string"
                },
                {
                    "name": "_insCd",
                    "type": "string"
                },
                {
                    "name": "_insNm",
                    "type": "string"
                },
                {
                    "name": "_accInfo",
                    "type": "string"
                },
                {
                    "name": "_accReqDate",
                    "type": "string"
                }
            ],
            "name": "accRequest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_accReqNo",
                    "type": "uint256"
                },
                {
                    "name": "_centerCd",
                    "type": "string"
                },
                {
                    "name": "_centerNm",
                    "type": "string"
                }
            ],
            "name": "repairRequest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isUser",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAccReqNo",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getUser",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "getUser",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getUserCount",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_userId",
                    "type": "string"
                },
                {
                    "name": "_userNm",
                    "type": "string"
                },
                {
                    "name": "_insCd",
                    "type": "string"
                },
                {
                    "name": "_insNm",
                    "type": "string"
                }
            ],
            "name": "authUser",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_accReqNo",
                    "type": "uint256"
                }
            ],
            "name": "getCarInfoStatus",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "printUint",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "_value",
                    "type": "string"
                }
            ],
            "name": "printString",
            "type": "event"
        }
    ]
    
}