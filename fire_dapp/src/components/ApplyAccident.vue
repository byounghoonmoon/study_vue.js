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
        <tr >
          <th>차량번호</th>
          <td><input  type="text" class="form-control" placeholder="12가 5678" v-model.trim=carInfo.carNo></td>
          <th>전화번호</th>
          <td><input  type="text" class="form-control" placeholder="010-0000-0000" v-model.trim=carInfo.reqTel></td>
        </tr>
        <tr >
          <th>고객번호</th>
          <td><input  type="text" class="form-control" placeholder="7322655" v-model.trim=carInfo.userId></td>
          <th>고객명</th>
          <td><input  type="text" class="form-control" placeholder="문병훈" v-model.trim=carInfo.userNm></td>
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
    </div>
   
    </div>
</template>

<script>



import Constant from '../Constant'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'apply-accident', 
  
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
          },
          deep: true
      }
  },
  computed : mapState(['initInsurerInfoList','carInfo']),
 
  methods : {
    applyAccident : function(payload){
        if(this.selected==""){
            alert("보험사를 선택하세요! ")
            return;
        }
        this.$store.dispatch(Constant.APPLY_ACCIDENT,payload);
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
-->
<style>

#Area_ApplyAccident{
  width: 700px;
  margin-top: 10px;
}

.table_list th {
  text-align: center;
}
.table_list input{
  text-align:  left;
}
.bottom_area{
  text-align: center;
}

</style>
