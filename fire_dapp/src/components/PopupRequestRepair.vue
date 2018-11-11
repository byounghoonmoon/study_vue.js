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
                        <th>가입보험사 </th>
                        <td colspan="3">
                            {{carInfo.insNm}}
                        </td>
                    </tr>

                    <tr >
                        <th>정비 센터</th>
                        <td colspan="3">
                            <select v-model="selected">
                                <option disabled value="" >공업사를 선택하세요</option>
                                <option  v-for="a in initCenterInfoList" :key="a.centerCd" :value="{ centerCd : a.centerCd, centerNm: a.centerNm }" >
                                    {{a.centerNm}}
                                </option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="bottom_area">
                <input type="button" class="btn btn-primary" value="취 소"      @click="cancelEvent()" />
                <input type="button" class="btn btn-primary" value="수리요청"   @click="requestRepair()" />
            </div>
            
        </div>
    </div>
</template>

<script>
import Constant from '../Constant';
import { mapState } from 'vuex';

export default {
    name : "PopupRequestRepair",
    data : function() {
      return {
          selected: "",
          formData: ""
      }
    },
    computed : {
        ...mapState([ 'initCenterInfoList','popupView', 'carInfo' ,'userCls' ])
    },
    watch : {
        selected : function(sel) { 
            this.carInfo.centerCd = sel.centerCd;
            this.carInfo.centerNm = sel.centerNm;
    }
    },
    methods : {
        cancelEvent : function() {
            this.$store.dispatch(Constant.CANCEL_POPUP);
        },
        requestRepair : function(){
            if(this.selected==""){
                alert("공업사를 선택하세요! ")
                return;
            }
            console.info(" ■ 수리요청 트랜잭션 : ", this.$store.state.carInfo)
            this.$store.dispatch(Constant.REQUEST_REPAIR);
        }
    },
    mounted () {
         console.log('■ Mounted : ', this.$store.state.carInfo);
     //this.$store.dispatch('getContractInstance')
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
</style>