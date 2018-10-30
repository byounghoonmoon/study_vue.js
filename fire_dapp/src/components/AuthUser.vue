<template>
   
  <div>

    
    <div>
      <div id="ContextUserCls">
        <span>
          <input type="radio" id="user" value="P" v-model=userInfo.userCls>
          <label for="user"> 사용자</label>
        </span>
        <span>
          <input type="radio" id="insur" value="I" v-model=userInfo.userCls>
          <label for="insur"> 보험사 </label>
        </span>
        <span>
          <input type="radio" id="repair" value="R" v-model=userInfo.userCls>
          <label for="repair"> 공업사 </label>
        </span>
      </div>
    </div>
    <table v-if="userInfo.userCls=='P'" class="table table-bordered table_list">
      <tbody>
        <tr >
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
    <table v-else-if="userInfo.userCls=='I'" class="table table-bordered table_list">
      <tbody>
        <tr>
          <th>보험사 선택</th>
          <td>
            <select v-model="selected">
              <option disabled value="">해당 보험사를 선택하세요</option>
              <option  v-for="a in insuranceList" :key="a.insurCd" :value="{ insurCd : a.insurCd, insurNm: a.insurNm }">
                {{a.insurNm}}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-else-if="userInfo.userCls=='R'" class="table table-bordered table_list">
      <tbody>
        <tr>
          <th>공업사 선택</th>
          <td>
            <select v-model="selected">
              <option disabled value="">해당 공업사를 선택하세요</option>
              <option  v-for="a in repairList" :key="a.repairCd" :value="{ repairCd : a.repairCd, repairNm: a.repairNm }">
                {{a.repairNm}}
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
          userInfo : {userCls:"P", insurCd: "", insurNm : "", customCd: "", customNm: "", authYn:""} 
          
        }
  },
  watch: { 
    selected : function(sel) { 
      this.userInfo.insurCd = sel.insurCd;
      this.userInfo.insurNm = sel.insurNm;
    }
  },

  computed : mapState(['insuranceList','repairList']),
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
#ContextUserCls{
  width: 500px;
  text-align: center;
}

#ContextUserCls span{
  padding-left: 10px;
}


</style>
