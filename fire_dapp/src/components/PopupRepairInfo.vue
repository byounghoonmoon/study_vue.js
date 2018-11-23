<template>
<div class="modal">
    <div class="form" @keyup.esc="cancelEvent">
        
        <strong>* 사고접수번호 : {{carInfo.accReqNo}}</strong>

        <table class="table table-bordered table_list">
            <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
            </colgroup>
            <tbody>
                <tr >
                <th>차량번호</th>
                <td>{{carInfo.carNo}}</td>
                <th>전화번호</th>
                <td>{{carInfo.reqTel}}</td>
                </tr>
                <tr >
                    <th>고객번호</th>
                    <td>{{carInfo.userId}}</td>
                    <th>고객명</th>
                    <td>{{carInfo.userNm}}</td>
                </tr>

                <tr>
                <th>수리 비용</th>
                    <td v-if="centerMode==3" colspan="3">
                        {{carInfo.repairCost}}
                    </td>
                    <td v-else colspan="3">
                        <input  type="number" class="" placeholder="1,000,000" v-model=carInfo.repairCost style="width:200px">
                    </td>
                </tr>
                <tr>
                <th>수리 내용 </th>
                    <td v-if="centerMode==3" colspan="3">
                        <b-form-textarea disabled v-model=carInfo.repairInfo placeholder="범퍼, 백미러" :rows="3" :max-rows="6"></b-form-textarea>
                    </td>
                    <td v-else colspan="3">
                        <b-form-textarea v-model=carInfo.repairInfo placeholder="범퍼, 백미러" :rows="3" :max-rows="6"></b-form-textarea>
                    </td>
                </tr>
                <tr v-if="centerMode==3">
                    <th >보험사</th>
                    <td  colspan="3">
                        {{carInfo.insNm}}
                    </td>
                </tr>
                <tr v-if="centerMode==3">
                    <th >은행 계좌</th>
                    <td  colspan="3">
                        <input  type="text" class="" placeholder="국민 760702-04-178719" v-model=carInfo.bankAccount>
                    </td>
                </tr>
            </tbody>
         </table>
        
        <div class="bottom_area">
            <input v-if="centerMode==1" type="button" class="btn btn-primary" value="수리완료" @click="completeRepair()" />
            <input v-else-if="centerMode==2" type="button" class="btn btn-primary" value="내용수정" @click="completeRepair()" />
            <input v-else-if="centerMode==3" type="button" class="btn btn-primary" value="수리비청구" @click="requestRepairFee()" />
            <input type="button" class="btn btn-primary" value="취 소"   @click="cancelEvent()" />
        </div>
        
    </div>
</div>
</template>

<script>
import Constant from '../Constant';
import { mapState } from 'vuex';

export default {
    name : "PopupRepairInfo",
    computed : {
        ...mapState([ 'popupView', 'carInfo' ,'centerMode','userInfo' ])
    },
    methods : {
        async completeRepair(){
            if(this.$store.state.carInfo.repairCost=="")
            {
                alert("수리비용을 반드시 입력하세요.");
                return;
            }
            await this.$store.dispatch(Constant.COMPLETE_REPAIR,this.$store.state.carInfo);
            
            // 전체 사고 현황 조회 
            await this.$store.dispatch(Constant.GET_ACCIDENTS);
            // 본인 관련 사고 현황 필터
            this.$store.commit(Constant.GET_FILTER_ACCIDENTS,{'userCls':this.$store.state.userInfo.userCls,'centerCd':this.$store.state.userInfo.centerCd});
        },
        async requestRepairFee(){
            if(this.$store.state.carInfo.bankAccount=="")
            {
                alert("계좌번호를 반드시 입력하세요.");
                return;
            }
            await this.$store.dispatch(Constant.REQUEST_REPAIR_FEE,this.$store.state.carInfo);

            // 전체 사고 현황 조회 
            await this.$store.dispatch(Constant.GET_ACCIDENTS);
            // 본인 관련 사고 현황 필터
            this.$store.commit(Constant.GET_FILTER_ACCIDENTS,{'userCls':this.$store.state.userInfo.userCls,'centerCd':this.$store.state.userInfo.centerCd});
        },
        cancelEvent : function() {
            this.$store.dispatch(Constant.CANCEL_POPUP);
        }
    }
}
</script>

<style scoped>
.modal { display: block; position: fixed; z-index: 1; 
    left: 0; top: 0; width: 100%; height: 100%;
    overflow: auto; background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); }
.form { background-color: white; margin:100px auto;
    max-width: 700px; min-width: 200px; font: 13px "verdana";
    padding: 10px 10px 10px 10px;  }
.form div { padding: 0;  display: block;  margin: 10px 0 0 0; }
.form label{ text-align: left; margin:0 0 3px 0;  padding:0px;
    display:block; font-weight: bold; }
.form input, textarea, select { box-sizing: border-box;
    border:1px solid #BEBEBE; padding: 7px; margin:0px;
    outline: none;  }
.form .long { width: 100%; }
.form .button{ background: #2B798D; padding: 8px 15px 8px 15px;
    border: none; color: #fff; }
.form .button:hover { background: #4691A4; }
.form .heading { background: #33A17F; font-weight: 300;
    text-align: left; padding : 20px; color: #fff;
    margin:5px 0 30px 0; padding: 10px; min-width:200px;
    max-width:400px; }
.table_list{
    margin-top: 10px;
}
.bottom_area{
    text-align: center;
}
.table_list th {
  text-align: center;
  vertical-align:middle;
}
</style>