<template>
   
  <div id="Area_AuthUser">
    <h3 style="text-align:right">현재 블록체인 등록수 : {{userCnt}}</h3>
      <div>
        <span>본인의 유형을 선택하세요</span>
        <div id="Area_AuthUser_Label">
          <span>
            <input type="radio" id="insur" value="I" v-model=typeSelected>
            <label for="insur"> 보험사 </label>
          </span>
          <span>
            <input type="radio" id="user" value="U" v-model=typeSelected>
            <label for="user"> 사용자</label>
          </span>
          <span>
            <input type="radio" id="repair" value="C" v-model=typeSelected>
            <label for="repair"> 공업사 </label>
          </span>
        </div>
      <table v-if="userInfo.userCls=='U'" class="table table-bordered table_list">
        <colgroup>
          <col width="30%">
          <col width="70%">
        </colgroup>
        <tbody>
          <tr >
            <th>고객번호 </th>
            <td><input  type="number" class="form-control" placeholder="12345678" v-model.trim=userInfo.userId></td>
          </tr>
          <tr>
            <th>고객명 </th>
            <td><input  type="text" class="form-control" placeholder="홍길동" v-model.trim=userInfo.userNm></td>
          </tr>
          <tr>
            <th>가입보험사 </th>
            <td>
              <select v-model="insurSelected">
                <option disabled value="">가입보험사를 선택하세요</option>
                <option  v-for="a in initInsurerInfoList" :key="a.insCd" :value="{ insCd : a.insCd, insNm: a.insNm }">
                  {{a.insNm}}
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
            <td><input  type="text" class="form-control" placeholder="" v-model.trim=userInfo.insCd></td>
          </tr>
          <tr>
            <th>보험사명 </th>
            <td><input  type="text" class="form-control" placeholder="삼성화재" v-model.trim=userInfo.insNm></td>
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
            <td><input  type="text" class="form-control" placeholder="C001" v-model.trim=userInfo.centerCd></td>
          </tr>
          <tr>
            <th>공업사명 </th>
            <td><input  type="text" class="form-control" placeholder="삼성센터" v-model.trim=userInfo.centerNm></td>
          </tr>
        </tbody>
      </table>

      
      <div class="bottom_area">
        <button type="button" class="btn btn-success" @click="registerAuthUser(userInfo)">블록체인 인증 등록하기</button>
        <button type="button" class="btn btn-danger" @click="isAuthUser()">블록체인 인증여부 확인</button>
        <button type="button" class="btn btn-danger" @click="getUserCount">사용자수 확인</button>
      </div>

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
          typeSelected:"U",
          insurSelected : ""
        }
  },
  watch: { 
    typeSelected : function(sel){
      this.userInfo.userCls = sel;    
      this.userInfo.userId = "";
      this.userInfo.userNm = "";
      this.userInfo.insCd = "";
      this.userInfo.insNm = "";
      this.userInfo.centerCd = "";
      this.userInfo.centerNm = "";
      
    },
    insurSelected : function(sel) { 
      this.userInfo.insCd = sel.insCd;
      this.userInfo.insNm = sel.insNm;
    }
  },

  computed : mapState(['currentView','userCnt','userInfo','initInsurerInfoList','initCenterInfoList']),
  methods : {

      registerAuthUser : function(payload) {
            this.$store.dispatch(Constant.REGISTER_AUTH_USER, payload);
       },
      isAuthUser : function() {
            this.$store.dispatch(Constant.IS_AUTH_USER);
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
  font-size : 20px;
}
.table_list th {
  text-align: center !important;
}


</style>