<template>
   
  <div>
    <table class="table table-bordered table_list">
      <tbody>
        <tr>
          <th>사고접수번호</th>
          <td><input v-model="accidentNo" type="text" class="form-control" placeholder="사고접수번호" ></td>
        </tr>
        <tr>
          <th>정비센터 </th>
          <td><select v-model="selectedRepair">
              <option disabled value="">공업사를 선택하세요</option>
              <option  v-for="a in repairList" :key="a.id" :value="{ id : a.id, nm: a.repairNm }">
                  {{a.repairNm}}
              </option>
            </select>
          </td>
        </tr>
      
        <tr>
          <th>수리 부품 </th>
          <td>
             <input type="text" class="form-control" placeholder="좌측 헤드 램프 라이트, 사이드 가니쉬, A필러, 테일램프">
          </td>
        </tr>
        <tr>
          <th>수리 비용 </th>
          <td>
             <input type="number" class="form-control" placeholder="1,000,000" >
          </td>
        </tr>
        <tr>
          <th>청구 여부 </th>
          <td>
             N
          </td>
        </tr>
         <tr>
          <th>완료 여부 </th>
          <td>
             N
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-success" @click="applyRepair()">수리비 청구</button>
   
    </div>
</template>

<script>



import sampleData from '../sampleData';
export default {
  name: 'RepairList', 
  data : function() {
      return {
          repairList : sampleData.repairList ,
          insuranceList : sampleData.insuranceList,
          accidentNo : "",
          selectedRepair: "",
          selectedInsurance :""
      }
  },
  methods: {
    applyRepair : function() {
      console.log(" ■ 사고 접수 요청 ")
      console.log(" ■ 사고번호 : " + this.accidentNo)
      console.log(" ■ 공업사명 : " + this.selectedRepair.nm)
      console.log(" ■ 선택 보험사  : " + this.selectedInsurance.nm)
      
      //  this.$router.push({ name: 'contactbyno', params: { no: no }}, function() {
      //               console.log("/contacts/"+ no + " 로 이동 완료!")
      //   })
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

.table_list{
  width: 700px;
  margin-top : 10px;
}
.table_list input{
  text-align:  left;
}

.table_list td{
  text-align: left;
  width: 50px;
  padding : 10px;
}
.table_list th{
  text-align: center;
  width: 60px;
  padding : 10px;
}
</style>
