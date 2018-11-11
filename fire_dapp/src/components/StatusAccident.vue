<template>
   
  <div id="StatusAccident">
    <keep-alive >
          <component v-bind:is="popupView" style="width:1200px;"></component>
    </keep-alive>
      <table class="table table_list">
        <thead>
          <tr>
            <th scope="col">사고접수번호</th>
            <th scope="col">고객명</th>
            <th scope="col">차량번호</th>
            <th scope="col">사고내용</th>
            <th v-if="userCls==='U'" scope="col">수리요청</th>
            <th v-if="userCls==='C'" scope="col">수리내용</th>
            <th v-if="userCls==='C'" scope="col">수리비청구</th>
            <th v-if="userCls==='I'" scope="col">보험금지급</th>
            <th scope="col">현황</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in initCarInfoList" :key="a.accReqNo" :id="a.accReqNo">
            <td scope="row">{{a.accReqNo}}</td>
            <td>{{a.userNm}}</td>
            <td>{{a.carNo}}</td>
            <td>
              <span> 
                  <button type="button" class="btn btn-success btn-sm" @click="openPopupAccidentDetail(a)">상세보기</button> 
                </span>
            </td>
            <td v-if="userCls==='U'" >
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
            <td v-if="userCls==='C'" >
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
                  <button disabled="disabled" class="btn btn-secondary btn-sm" @click="openPopup(a)">수리완료</button>  
                </span>
            </td>
             <td v-if="userCls==='I'" >
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
                  <button type="button" class="btn btn-primary btn-sm" >지급하기</button>  
                </span>
                <span v-else>
                  <button disabled="disabled" class="btn btn-danger btn-sm">지급완료</button>  
                </span>
            </td>
            <td v-if="userCls==='C'" >
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
                  <button disabled="disabled" type="button" class="btn btn-danger btn-sm" @click="openPopup(a)">심사중</button>  
                </span>
                <span v-else>
                  <button disabled="disabled" class="btn btn-secondary btn-sm" @click="openPopup(a)">지급완료</button>  
                </span>
            </td>
            <td>
              <span> 
                  {{a.status}}
                </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>



import { mapActions, mapState } from 'vuex'
import Constant from '../Constant'
import PopupAccidentInfo from './PopupAccidentInfo.vue'
import PopupRequestRepair from './PopupRequestRepair.vue'
import PopupRepairInfo from './PopupRepairInfo.vue'

export default {
  name: 'apply-insurance', 
  components : {PopupAccidentInfo,PopupRequestRepair,PopupRepairInfo},
  data : function() {
      return {
          checkRow : "",
          selectedRepair: "",
          selectedInsurance :""
      }
  },
  computed : mapState(['initCenterInfoList','initCarInfoList','popupView','userCls','centerMode']),
  watch : {
    selectedRepair : function(sel) { 
      console.log("### selected Center ", sel);
      console.log("### Car Info ", this.$store.state.carInfo)
    }
  },

  methods: {

    // 사고상세 팝업
    openPopupAccidentDetail : function(carInfo) {
      console.log("## 상세보기 사고현황", carInfo)
        this.$store.dispatch(Constant.OPEN_POPUP_ACCIDENT_DETAIL, {carInfo : carInfo});
    },
    // 고객전용
    openPopupRequestRepair : function(carInfo) {
        this.$store.dispatch(Constant.OPEN_POPUP_REQUEST_REPAIR, {carInfo : carInfo});
    },
    // 공업사전용 - 수리하기, 수리비청구
    openPopupRepairInfo : function(carInfo,mode) {
        this.$store.commit(Constant.CHANGE_CENTER_MODE, {centerMode : mode});
        console.log("## Check Function ",  carInfo);
        this.$store.dispatch(Constant.OPEN_POPUP_REPAIR_INFO, {carInfo : carInfo});
    },
    checked : function(no){
      if(no < 40) return false
      else  return true
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
