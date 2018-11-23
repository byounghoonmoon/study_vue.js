<template>
   
  <div id="StatusAccident">
    <keep-alive >
        <transition name="component-fade" mode="out-in">
          <component v-bind:is="popupView" style="width:1200px;"></component>
        </transition>
    </keep-alive>
    <div style="float:right; font-size:18px">
      <p>
          <strong v-if="userInfo.userCls==='U'">{{userInfo.userNm}} 고객님</strong>
          <strong v-if="userInfo.userCls==='C'">{{userInfo.centerNm}} 공업사</strong> 
          <strong v-if="userInfo.userCls==='I'">{{userInfo.insNm}} 보험사</strong>  접수현황
      </p>
    </div>
      <table class="table table_list">
        <thead>
          <tr>
            <th scope="col">사고접수번호</th>
            <th scope="col">고객명</th>
            <th scope="col">차량번호</th>
            <th scope="col">사고내용</th>
            <th v-if="userInfo.userCls==='U'" scope="col">수리요청</th>
            <th v-if="userInfo.userCls==='C'" scope="col">수리내용</th>
            <th v-if="userInfo.userCls==='C'" scope="col">수리비청구</th>
            <th v-if="userInfo.userCls==='I'" scope="col">보험금지급</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="carInfos.length==0">
            <td colspan="8">조회된 목록이 없습니다.</td>
          </tr>
          <tr v-else v-for="a in carInfos" :key="a.accReqNo" :id="a.accReqNo">
            <td scope="row">{{a.accReqNo}}</td>
            <td>{{a.userNm}}</td>
            <td>{{a.carNo}}</td>
            <td>
              <span> 
                  <button type="button" class="btn btn-success btn-sm" @click="openPopupAccidentDetail(a)">상세보기</button> 
                </span>
            </td>
            <td v-if="userInfo.userCls==='U'" >
                <span v-if="a.status<20"> 
                  <div><button type="button" class="btn btn-primary btn-sm" @click="openPopupRequestRepair(a)">수리요청</button> </div>
                </span>
                <span v-else-if="a.status<30"> 
                  <button disabled="disabled" class="btn btn-warning btn-sm" >수리중</button>  
                </span>
                <span v-else>
                  <button disabled="disabled" class="btn btn-secondary btn-sm" >수리완료</button>  
                </span>
            </td>
            <td v-if="userInfo.userCls==='C'" >
                <span v-if="a.status<20"> 
                  <button disabled="disabled" type="button" class="btn btn-secondary btn-sm" >수리요청전</button> 
                </span>
                <span v-else-if="a.status<30"> 
                  <button type="button" class="btn btn-primary btn-sm" @click="openPopupRepairInfo(a,'1')">수리시작</button> 
                </span>
                <span v-else-if="a.status==30"> 
                  <button type="button" class="btn btn-warning btn-sm" @click="openPopupRepairInfo(a,'2')">내용수정</button>  
                </span>
                <span v-else>
                  <button disabled="disabled" class="btn btn-secondary btn-sm" >수리완료</button>  
                </span>
            </td>
            <td v-if="userInfo.userCls==='C'" >
                <span v-if="a.status<20"> 
                  <button disabled="disabled" type="button" class="btn btn-secondary btn-sm" >수리요청전</button> 
                </span>
                <span v-else-if="a.status<30"> 
                  <button disabled="disabled" type="button" class="btn btn-secondary btn-sm" >수리전</button> 
                </span>
                <span v-else-if="a.status==30"> 
                  <button type="button" class="btn btn-primary btn-sm" @click="openPopupRepairInfo(a,'3')">수리비 청구</button>  
                </span>
                <span v-else-if="a.status==40"> 
                  <button disabled="disabled" type="button" class="btn btn-danger btn-sm" @>심사중</button>  
                </span>
                <span v-else>
                  <button disabled="disabled" class="btn btn-secondary btn-sm" >지급완료</button>  
                </span>
            </td>
             <td v-if="userInfo.userCls==='I'" >
                <span v-if="a.status<20"> 
                  <button disabled="disabled" type="button" class="btn btn-secondary btn-sm" >수리요청전</button> 
                </span>
                <span v-else-if="a.status<30"> 
                  <button disabled="disabled"  type="button" class="btn btn-secondary btn-sm" >수리중</button> 
                </span>
                <span v-else-if="a.status<40"> 
                  <button disabled="disabled"  type="button" class="btn btn-warning btn-sm" >수리완료</button>  
                </span>
                <span v-else-if="a.status<50"> 
                  <button type="button" class="btn btn-primary btn-sm" @click="openPopupPaymentFee(a,'3')">지급하기</button>  
                </span>
                <span v-else>
                  <button disabled="disabled" class="btn btn-danger btn-sm" >지급완료</button>  
                </span>
            </td>
            <!-- <td>
              <span> 
                  {{a.status}}
                </span>
            </td> -->
          </tr>
        </tbody>
      </table>
      
      <div class="bottom_area" v-if="userInfo.userCls=='U'">
        <button type="button" class="btn btn-primary" @click="goToBack()">뒤로가기</button>
      </div>
    </div>
</template>

<script>



import { mapActions, mapState } from 'vuex'
import Constant from '../Constant'
import PopupAccidentInfo from './PopupAccidentInfo.vue'
import PopupRequestRepair from './PopupRequestRepair.vue'
import PopupRepairInfo from './PopupRepairInfo.vue'
import PopupPaymentFee from './PopupPaymentFee.vue'


export default {
  name: 'apply-insurance', 
  components : {PopupAccidentInfo,PopupRequestRepair,PopupRepairInfo,PopupPaymentFee},
  data : function() {
      return {
          checkRow : "",
          selectedRepair: "",
          selectedInsurance :""          
      }
  },
  computed : mapState(['initCenterInfoList','initCarInfoList','popupView','userCls','centerMode','carInfos','userInfo']),
  watch : {
    selectedRepair : function(sel) { 
      console.log("### selected Center ", sel);
      console.log("### Car Info ", this.$store.state.carInfo)
    }
  },

  methods: {
    goToBack : function(payload){
        this.$store.commit(Constant.CHANGE_VIEW_AND_TYPE, {currentView:"SelectMenuForUser",userCls:this.userInfo.userCls});
    },
    // 사고상세 팝업
    openPopupAccidentDetail : function(carInfo) {
      console.log("## 상세보기 사고현황", carInfo)
        this.$store.dispatch(Constant.OPEN_POPUP_ACCIDENT_DETAIL, {carInfo : carInfo});
    },
    // 고객전용 - 수리요청하기
    openPopupRequestRepair : function(carInfo) {
        this.$store.dispatch(Constant.OPEN_POPUP_REQUEST_REPAIR, {carInfo : carInfo});
    },
    // 공업사전용 - 수리하기, 수리비청구
    openPopupRepairInfo : function(carInfo,mode) {
        // state의 센터 모드 변경 (1:수리시작, 2:내용편집, 3:수리비청구)
        this.$store.commit(Constant.CHANGE_CENTER_MODE, {centerMode : mode});
        this.$store.dispatch(Constant.OPEN_POPUP_REPAIR_INFO, {carInfo : carInfo});
    },
    // 보험사전용 - 지급하기
    openPopupPaymentFee : function(carInfo) {
        this.$store.dispatch(Constant.OPEN_POPUP_PAYMENT_FEE, {carInfo : carInfo});
    },
  
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


.table_list th,td {
  text-align: center;
}
.table_list input{
  text-align:  center;
}
.bottom_area{
  text-align: center;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity 0.5s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
