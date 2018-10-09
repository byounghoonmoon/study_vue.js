<template>
  
  <div>
    <table class="table table_list">
      <thead>
        <tr>
          <th></th>
          <th scope="col">사고접수번호</th>
          <th scope="col">사고 날짜</th>
          <th scope="col">보험사</th>
          <th scope="col">수리부품</th>
          <th scope="col">수리비용</th>
          <th scope="col">수리 공업사</th>
          <th scope="col">지급 완료여부</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in accidentList" :key="a.no">
          <td>
            <input type="checkbox" v-if="checked(a.paymentYn)" disabled >
            <input type="checkbox" v-else >
          </td>
          <td scope="row">{{a.no}}</td>
          <td>{{a.date}} {{a.time}}</td>
          <td>{{a.insurNm}}</td>
          <td><span v-for="b in a.repairItem">{{b}}, </span></td>
          <td>{{a.repairFee}}</td>
          <td>{{a.repairNm}}</td>
          <td>{{a.paymentYn}}</td>
        </tr>
      </tbody>
    </table>
   
    <button type="button" class="btn btn-success" @click="paymentInsurance()">보험금 지급</button>
    </div>
</template>

<script>



import sampleData from '../sampleData';
export default {
  name: 'PaymentInsurance', 
  data : function() {
      return {
          accidentList : sampleData.accidentList
      }
  },
  methods: {
    paymentInsurance : function() {
     
      
      //  this.$router.push({ name: 'contactbyno', params: { no: no }}, function() {
      //               console.log("/contacts/"+ no + " 로 이동 완료!")
      //   })
    } ,
    checked : function(paymentYn){
      if(paymentYn==="Y") return true
      else  return false
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

.table_list {
  margin-top : 10px;
}

.table_list td{
  text-align: center;
}
.table_list th{
  text-align: center;
}
.chk{
  display : none;
}
</style>
