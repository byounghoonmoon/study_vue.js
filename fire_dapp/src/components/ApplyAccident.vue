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
          <td><input  type="text" class="form-control" placeholder="010-0000-0000" v-model.trim=carInfo.carNo></td>
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
             <select v-model="selectedInsurance">
              <option disabled value="">가입보험사를 선택하세요</option>
              <option  v-for="a in initInsurerInfoList" :key="a.id" :value="{ id : a.id, nm: a.insurNm }">
                {{a.insurNm}}
              </option>
            </select>
          </td>
        </tr>

        <tr>
          <th>사고발생 시간</th>
          <td colspan="3">
              <input  type="date" class="" placeholder="2018-11-06" v-model=accidentInfo.date style="width:200px">
              <input  type="time" class="" placeholder="사고접수번호" v-model=accidentInfo.time style="width:200px">
          </td>
        </tr>
        <tr>
          <th>사고발생 경위 </th>
          <td colspan="3">
            <b-form-textarea 
                     v-model=accidentInfo.content
                     placeholder="육하원칙에 따라 기술"
                     :rows="3"
                     :max-rows="6">
                </b-form-textarea>
          </td>
        </tr>

      </tbody>
    </table>
    
    <div class="bottom_area">
      <button type="button" class="btn btn-success" @click="applyAccident(accidentInfo)">사고접수 신고</button>
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
          selectedInsurance : "",
          accidentInfo : { date :"" , time :"", content :""},

          carInfo :{  carNo:"",  reqTel:"", 
                      accReqNo:"", accInfo:"", accReqDate:"", 
                      userAddr:"", userId:"", userNm:"", 
                      insCd:"", insNm:"", 
                      centerCd:"", centerNm:"",
                      repairCost:"", repairInfo:"", bankCd:"", bankAccount:"", status:""
          }
        }
  },
  computed : mapState(['initInsurerInfoList']),
  methods : {
      ...mapActions([ Constant.APPLY_ACCIDENT])
  }



  // data : function() {


  //     return {
  //         insuranceList : sampleData.insuranceList,
  //         selectedInsurance : "",
  //         accidentInfo : { date :"" , time :"", content :""}
  //     }
  // },
  // methods: {
  //   applyAccident : function() {
  //     console.log(" ■ 사고 접수 요청 ")
  //     confirm("하시겠습니까 ? ")
  //     //  this.$router.push({ name: 'contactbyno', params: { no: no }}, function() {
  //     //               console.log("/contacts/"+ no + " 로 이동 완료!")
  //     //   })
  //   }
  // }

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
