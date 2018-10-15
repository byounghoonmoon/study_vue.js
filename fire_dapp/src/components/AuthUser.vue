<template>
   
  <div>
    <table class="table table-bordered table_list">
      <tbody>
        <tr>
          <th>고객번호 </th>
          <td><input  type="number" class="form-control" placeholder="12345678" v-model.trim=userInfo.customCd></td>
        </tr>
        <tr>
          <th>고객명 </th>
          <td><input  type="text" class="form-control" placeholder="홍길동" v-model.trim=userInfo.customNm></td>
        </tr>
        <tr>
          <th>가입보험사 </th>
          <td>
             <select v-model="selected">
              <option disabled value="">가입보험사를 선택하세요</option>
              <option  v-for="a in insuranceList" :key="a.insurCd" :value="{ insurCd : a.insurCd, insurNm: a.insurNm }">
                {{a.insurNm}}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-success" @click="checkAuthUser(userInfo)">블록체인 인증여부 확인</button>
   
    </div>
</template>

<script>



import Constant from '../Constant'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'auth-user', 

  data : function() {
        return { 
          selected : "",
          userInfo : {insurCd: "", insurNm : "", customCd: "", customNm: "", authYn:""} 
          
        }
  },
  watch: { 
    selected : function(sel) { 
      this.userInfo.insurCd = sel.insurCd;
      this.userInfo.insurNm = sel.insurNm;
    }
  },

  computed : mapState(['insuranceList']),
  methods : {
      // ...mapActions([ Constant.AUTH_USER])
      checkAuthUser : function(payload) {
            this.$store.dispatch(Constant.AUTH_USER, payload);
       }
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
