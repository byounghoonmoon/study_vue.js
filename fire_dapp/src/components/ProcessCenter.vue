<template>
   
  <div id="Area_ProcessCenter">
    <table class="table table_list">
      <thead>
        <tr>
          <th></th>
          <th scope="col">사고접수번호</th>
          <th scope="col">차량번호</th>
          <th scope="col">수리내용</th>
          <th scope="col">수리비용</th>
          <th scope="col">수리 완료여부</th>
          <th scope="col">은행 계좌번호</th>
          <th scope="col">수리비 청구여부</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in initCarInfoList" :key="a.accReqNo">
          <td>
            <input type="checkbox" v-if="checked(a.status)" disabled >
            <input type="checkbox" v-else >
          </td>
          <td scope="row">{{a.accReqNo}}</td>
          <td>{{a.carNo}}</td>
          <td>
            <input  type="text" class="form-control" v-if="checkRepair(a.status)">
            <span v-else>{{a.repairInfo}}</span>
          </td>
          <td>
            <input  type="number" class="form-control" placeholder="1,000,000" v-if="checkRepair(a.status)">
            <span v-else>{{a.repairCost}}</span>
          </td>
          <td><span v-if="checkRepair(a.status)"> 미완료 </span>
              <span v-else> 완료 </span>
          </td>
          <td>{{a.bankAccount}}</td>
          <td>{{checkStatus(a.status)}}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="bottom_area">
      <button type="button" class="btn btn-success" @click="applyRepair()">수리 완료</button>
      <button type="button" class="btn btn-success" @click="applyRepair()">수리비 청구</button>
    </div>
   
    </div>
</template>

<script>



import { mapActions, mapState } from 'vuex'
export default {
  name: 'apply-insurance', 
  data : function() {
      return {
          selectedRepair: "",
          selectedInsurance :"",
          carInfo :{  carNo:"",  reqTel:"", 
                      accReqNo:"", accInfo:"", accReqDate:"", 
                      userAddr:"", userId:"", userNm:"", 
                      insCd:"", insNm:"", 
                      centerCd:"", centerNm:"",
                      repairCost:"", repairInfo:"", bankCd:"", bankAccount:"", status:""
          }
      }
  },
  computed : mapState(['initCarInfoList']),
  methods: {
    applyRepair : function() {
      console.log(" ■ 사고 접수 요청 ")
      console.log(" ■ 사고번호 : " + this.accidentNo)
      console.log(" ■ 공업사명 : " + this.selectedRepair.nm)
      console.log(" ■ 선택 보험사  : " + this.selectedInsurance.nm)
      
      //  this.$router.push({ name: 'contactbyno', params: { no: no }}, function() {
      //               console.log("/contacts/"+ no + " 로 이동 완료!")
      //   })
    },
    checked : function(no){
      if(no < 50) return false
      else  return true
    },
    checkRepair : function(no){
      if(no < 30) return true
      else return false
    },
    checkStatus : function(no){
      if(no < 40) return 'N'
      else if(no < 50) return '청구중'
      else return '지급완료'
    },
    checkNull : function(str){
      if(str!="")
        return false;
      else
        return true;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  
  margin: 0 10px;
}
a {
  color: #42b983;
}

#Area_ProcessCenter{
  width: 1200px;
  margin-top: 10px;
}

.table_list th,td {
  text-align: center;
}
.table_list input{
  text-align:  center;
}
.bottom_area{
  text-align: center;
}

</style>
