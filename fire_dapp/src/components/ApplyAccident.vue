<template>
   
  <div>
    <table class="table table-bordered table_list">
      <tbody>
        <tr>
          <th>사고발생 일 </th>
          <td><input  type="date" class="form-control" placeholder="사고접수번호" v-model=accidentInfo.date></td>
        </tr>
         <tr>
          <th>사고발생 시간 </th>
          <td><input  type="time" class="form-control" placeholder="사고접수번호" v-model=accidentInfo.time></td>
        </tr>
         <tr>
          <th>사고발생 경위 </th>
          <td> 
            <b-form-textarea 
                     v-model=accidentInfo.content
                     placeholder="육하원칙에 따라 기술"
                     :rows="3"
                     :max-rows="6">
                </b-form-textarea>
          </td>
        </tr>
        
       
        <tr>
          <th>가입보험사 </th>
          <td>
             <select v-model="selectedInsurance">
              <option disabled value="">가입보험사를 선택하세요</option>
              <option  v-for="a in insuranceList" :key="a.id" :value="{ id : a.id, nm: a.insurNm }">
                {{a.insurNm}}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-success" @click="applyAccident()">사고접수 신고</button>
   
    </div>
</template>

<script>



import sampleData from '../sampleData';
export default {
  name: 'UserInfo', 
  data : function() {
      return {
          insuranceList : sampleData.insuranceList,
          selectedInsurance : "",
          accidentInfo : { date :"" , time :"", content :""}
      }
  },
  methods: {
    applyAccident : function() {
      console.log(" ■ 사고 접수 요청 ")
      confirm("하시겠습니까 ? ")
      //  this.$router.push({ name: 'contactbyno', params: { no: no }}, function() {
      //               console.log("/contacts/"+ no + " 로 이동 완료!")
      //   })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
  width: 500px;
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
