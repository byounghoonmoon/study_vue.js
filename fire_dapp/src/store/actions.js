import Constant from '../Constant';

export default {
    [Constant.AUTH_USER] : (store, payload) => {
        console.log("### auth User !!!", payload);
       // store.commit(Constant.AUTH_USER, payload);
    },
    [Constant.APPLY_ACCIDENT] : (store, payload) => {
        console.log("### apply Accident !!!!", payload);
        // store.commit(Constant.APPLY_ACCIDENT, payload);
		
		/*
		axios.get("")			블록체인 호출 주소 (사고접수 신청)
            .then((response)=> {
                store.commit(Constant.APPLY_ACCIDENT, { contacts: response.data })
                if (response.data.length > 0)
                    store.dispatch(Constant.ADD_KEYWORD, payload);
        )
		*/
		
		
    },
    [Constant.REQUEST_REPAIR] : (store, payload) => {
        console.log("### request Repair !!!", payload);
        //store.commit(Constant.REQUEST_REPAIR, payload);
    },
    [Constant.COMPLETE_REPAIR] : (store, payload) => {
        console.log("### complete Repair !!!", payload);
       // store.commit(Constant.COMPLETE_REPAIR, payload);
    },
    [Constant.APPLY_INSURANCE] : (store, payload) => {
        console.log("### apply Insurance !!!", payload);
        //store.commit(Constant.APPLY_INSURANCE, payload);
    },
    [Constant.PAYMENT_INSURACNE] : (store, payload) => {
        console.log("### payment Insurance !!!", payload);
        //store.commit(Constant.PAYMENT_INSURACNE, payload);
    }
}