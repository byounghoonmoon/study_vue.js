<template>
   
  <div id="Area_ApplyAccident">
    <table class="table table-bordered table_list">
      <colgroup>
        <col width="25%">
        <col width="25%">
        <col width="25%">
        <col width="25%">
      </colgroup>
      <tbody>
        <tr class="userInfo">
          <th>고객번호</th>
          <td> {{userInfo.userId}}</td>
          <th>고객명</th>
          <td>{{userInfo.userNm}}</td>
        </tr>
        <tr >
          <th>차량번호</th>
          <td><input  type="text" class="form-control" placeholder="12가 5678" v-model.trim=carInfo.carNo></td>
          <th>전화번호</th>
          <td><input  type="text" class="form-control" placeholder="010-0000-0000" v-model.trim=carInfo.reqTel></td>
        </tr>
        <tr>
          <th>가입보험사 </th>
          <td colspan="3">
             <select v-model="selected">
              <option disabled value="">가입보험사를 선택하세요</option>
              <option  v-for="a in initInsurerInfoList" :key="a.id" :value="{ insCd : a.insCd, insNm: a.insNm }">
                {{a.insNm}}
              </option>
            </select>
          </td>
        </tr>

        <tr>
          <th>사고발생 시간</th>
          <td colspan="3">
              <input  type="date" class="" v-model=accidentInfo.date style="width:200px">
              <input  type="time" class="" v-model=accidentInfo.time style="width:200px">
          </td>
        </tr>
        <tr>
          <th>사고발생 경위 </th>
          <td colspan="3">
            <b-form-textarea 
                     v-model=carInfo.accInfo
                     placeholder="육하원칙에 따라 기술"
                     :rows="3"
                     :max-rows="6">
                </b-form-textarea>
          </td>
        </tr>

      </tbody>
    </table>
    
    <div class="bottom_area">
      <button type="button" class="btn btn-success" @click="applyAccident(carInfo)">사고접수 신고</button>
      <button type="button" class="btn btn-primary" @click="goToBack()">뒤로가기</button>
    
    </div>
    
    </div>
</template>

<script>



import Constant from '../Constant'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'apply-accident', 
  mounted (){
    this.carInfo.userId = this.userInfo.userId;
    this.carInfo.userAddr = this.userInfo.userAddr;
  },
  data : function() {
        return { 
          selected : "",
          accidentInfo :{ date:"", time:""}
        }
  },
  watch : {
      selected : function(sel) { 
          this.carInfo.insCd = sel.insCd;
          this.carInfo.insNm = sel.insNm;
      },
      accidentInfo: {
        handler(chg) {
          this.carInfo.accReqDate = chg.date +" "+ chg.time;
          this.accidentInfo = chg;
          },
          deep: true
      }
  },
  computed : mapState(['initInsurerInfoList','carInfo','userInfo']),
 
  methods : {
    applyAccident : function(payload){
        if(this.selected==""){
            alert("보험사를 선택하세요! ")
            return;
        }
        if(this.accidentInfo.date=="" || this.accidentInfo.time==""){
            alert("사고발생 시간을 입력하세요! ")
            return;  
        } 
        if(this.carInfo.carNo=="" ){
            alert("차량번호를 입력하세요! ")
            return;  
        }        
        if(this.carInfo.accInfo=="" ){
            alert("사고내용을 입력하세요! ")
            return;  
        }
        console.log(payload)
        this.$store.dispatch(Constant.APPLY_ACCIDENT,payload);
    },
    goToBack : function(payload){
        this.$store.commit(Constant.CHANGE_VIEW_AND_TYPE, {currentView:"SelectMenuForUser",userCls:this.userInfo.userCls});
        
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
-->
<style scoped>

#Area_ApplyAccident{
  margin-top : 15px;
  width: 700px;
}
.bottom_area{
  text-align: center;
}
.table_list th {
  text-align: center;
}
.userInfo{
  text-align: center;
}
button{
  margin-left : 15px;
} 

</style>
