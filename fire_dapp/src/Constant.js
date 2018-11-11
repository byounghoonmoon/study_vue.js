export default {
    REGISTER_AUTH_USER : "registerAuthUser",
    IS_AUTH_USER : "isAuthUser",
    GET_USER_COUNT : "getUserCount",
    GET_USER : "getUser",
    APPLY_ACCIDENT : "applyAccident",
    REQUEST_REPAIR : "requestRepair",
    COMPLETE_REPAIR : "completeRepair",
    REQUEST_REPAIR_FEE : "requestRepairFee",
    APPLY_INSURANCE : "applyInsurance",
    PAYMENT_INSURACNE : "paymentInsurance",
    REGISTER_WEB3 : "registerWeb3",
    REGISTER_WEB3_INSTANCE : "registerWeb3Instance",
    GET_CONTRACT_INSTANCE : "getContractInstance",
    CANCEL_POPUP : "cancelPopup",
    OPEN_POPUP_ACCIDENT_DETAIL : "openPopupAccidentDetail",
    OPEN_POPUP_REQUEST_REPAIR : "openPopupRequestRepair",
    OPEN_POPUP_REPAIR_INFO : "openPopupRepairInfo",
    CHANGE_USER : "changeUser",
    CHANGE_CENTER_MODE : "changeCenterMode",
    NETWORKS : {
        '1': 'Main Net',
        '2': 'Deprecated Morden test network',
        '3': 'Ropsten test network',
        '4': 'Rinkeby test network',
        '42': 'Kovan test network',
        '4447': 'Truffle Develop Network',
        '5777': 'Ganache Blockchain'
      },
    ADDRESS : "0x5C5d8444282c4038CDc5e6F1bC7De7E63e7401eb",
    ABI :[
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_userCls",
                        "type": "string"
                    },
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
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "payable": true,
                "stateMutability": "payable",
                "type": "fallback"
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
            }
    ]
    
}