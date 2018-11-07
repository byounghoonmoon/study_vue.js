<template>
   
  <div id="Area_AuthUser">
    <div>
      <div id="Area_AuthUser_Label">
        <span>
          <input type="radio" id="insur" value="I" v-model=userInfo.userCls>
          <label for="insur"> 보험사 </label>
        </span>
        <span>
          <input type="radio" id="user" value="P" v-model=userInfo.userCls>
          <label for="user"> 사용자</label>
        </span>
        <span>
          <input type="radio" id="repair" value="C" v-model=userInfo.userCls>
          <label for="repair"> 공업사 </label>
        </span>
      </div>
    </div>
    <table v-if="userInfo.userCls=='P'" class="table table-bordered table_list">
      <colgroup>
        <col width="30%">
        <col width="70%">
      </colgroup>
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
              <option  v-for="a in initInsurerInfoList" :key="a.insurCd" :value="{ insurCd : a.insurCd, insurNm: a.insurNm }">
                {{a.insurNm}}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-else-if="userInfo.userCls=='I'" class="table table-bordered table_list">
      <colgroup>
        <col width="30%">
        <col width="70%">
      </colgroup>
      <tbody>
         <tr >
          <th>보험사코드 </th>
          <td><input  type="text" class="form-control" placeholder="I001" v-model.trim=insurerInfo.insCd></td>
        </tr>
        <tr>
          <th>보험사명 </th>
          <td><input  type="text" class="form-control" placeholder="삼성화재" v-model.trim=insurerInfo.insNm></td>
        </tr>
      </tbody>
    </table>
    <table v-else-if="userInfo.userCls=='C'" class="table table-bordered table_list">
      <colgroup>
        <col width="30%">
        <col width="70%">
      </colgroup>
      <tbody>
        <tr >
          <th>공업사코드 </th>
          <td><input  type="text" class="form-control" placeholder="C001" v-model.trim=centerInfo.centerCd></td>
        </tr>
        <tr>
          <th>공업사명 </th>
          <td><input  type="text" class="form-control" placeholder="삼성센터" v-model.trim=centerInfo.centerNm></td>
        </tr>
      </tbody>
    </table>

    
    <div class="bottom_area">
      <button type="button" class="btn btn-success" @click="registerAuthUser(userInfo)">블록체인 인증 등록하기</button>
      <button type="button" class="btn btn-success" @click="isAuthUser(userInfo)">블록체인 인증여부 확인</button>
      <button type="button" class="btn btn-success" @click="getUserCount">사용자수 확인</button>
    </div>
   
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
          userInfo    : {userCls:"I", userAddr: "", userId:"", userNm:"", },
          insurerInfo : {userCls:"I", insAddr: "", insCd: "", insNm:""},
          centerInfo  : {userCls:"I", centerAddr: "", centerCd: "", centerNm:""}
        }
  },
  watch: { 
    selected : function(sel) { 
      this.userInfo.insurCd = sel.insurCd;
      this.userInfo.insurNm = sel.insurNm;
    }
  },

  computed : mapState(['initInsurerInfoList','initCenterInfoList','contractInstance','userCnt']),
  methods : {
      // ...mapActions([ Constant.AUTH_USER])
      registerAuthUser : function(payload) {
            this.$store.dispatch(Constant.REGISTER_AUTH_USER, payload);
       },
      isAuthUser : function(payload) {
            // console.info("★ ", this.$store.state.contractInstance());
            // console.info("★ ", this.$store.state.web3.coinbase);
            this.$store.dispatch(Constant.IS_AUTH_USER, payload);
       },
      getUserCount : function() {
            this.$store.dispatch(Constant.GET_USER_COUNT);
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

#Area_AuthUser{
  width: 700px;
  text-align: center;
}

#Area_AuthUser_Label span{
  padding-left: 10px;
}
.table_list th {
  text-align: center !important;
}


</style>