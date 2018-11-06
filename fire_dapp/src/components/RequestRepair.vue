<template>
   
  <div id="Area_RequestRepair">
    <table class="table table-bordered table_list">
      <tbody>
        <tr>
          <th>사고접수번호 </th>
          <td><input v-model="accidentNo" type="text" class="form-control" placeholder="사고접수번호" aria-label="accidentNo" aria-describedby="basic-addon1"></td>
        </tr>
        <tr>
          <th>정비센터 </th>
          <td><select v-model="selectedRepair">
              <option disabled value="">공업사를 선택하세요</option>
              <option  v-for="a in initCenterInfoList" :key="a.id" :value="{ id : a.id, nm: a.repairNm }">
                  {{a.repairNm}}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="bottom_area">
      <button type="button" class="btn btn-success" @click="requestRepair()">수리 요청</button>
      <br>
      <strong class="danger">※ 접속 고객과 사고번호에 등록 된 고객이 다를 경우 처리 불가</strong>
    </div>
   
    </div>
</template>

<script>



import Constant from '../Constant'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'request-repair', 
  computed : mapState(['initCenterInfoList','initInsurerInfoList']),
  data : function() {
      return {
          accidentNo : "",
          customCd : "",
          selectedRepair: "",
          selectedInsurance :""
      }
  },
  methods: {
    requestRepair : function() {
      console.log(" ■ 사고 접수 요청 ")
      console.log(" ■ 사고번호 : " + this.accidentNo)
      console.log(" ■ 공업사명 : " + this.selectedRepair.nm)
      console.log(" ■ 선택 보험사  : " + this.selectedInsurance.nm)
      
    }
  }

}
</script>

<style>

.danger{
  color: red;
  float:  right;
}

#Area_RequestRepair{
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
