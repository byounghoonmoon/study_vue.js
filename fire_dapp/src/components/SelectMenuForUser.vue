<template>
   
  <div id="Area_Select_Menu">
    <p><strong>{{userInfo.userNm}}</strong> 고객님 환영합니다</p>
    <p>원하시는 메뉴를 선택하시기 바랍니다.</p>
    <div class="bottom_area">
      <button type="button" class="btn btn-success" size="lg" @click="change({'currentView':'ApplyAccident','userCls':'U','gubun':'1'})">사고접수 신규신청</button>
      <button type="button" class="btn btn-primary" size="lg" @click="change({'currentView':'StatusAccident','userCls':'U','gubun':'2'})">사고접수 현황보기</button>
    </div>
  </div>
</template>

<script>



import Constant from '../Constant'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'select-menu-for-user', 
  computed : mapState(['userInfo']),
  methods : {
    async change(param) {
      if(param.gubun=='1'){
        this.$store.commit('initCarinfo', param);
        this.$store.commit(Constant.CHANGE_VIEW_AND_TYPE, param);
      }
      else{        
        // 전체 사고 현황 조회 
        await this.$store.dispatch(Constant.GET_ACCIDENTS);
        // 본인 관련 사고 현황 필터
        const userAddr = this.$store.state.userInfo.userAddr;
        this.$store.commit(Constant.GET_FILTER_ACCIDENTS,{'userCls':this.$store.state.userCls,'userAddr':userAddr});
        this.$store.commit(Constant.CHANGE_VIEW_AND_TYPE, param);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped>

#Area_Select_Menu{
  margin-top : 15px;
  width: 700px;
  text-align: center;
}
#bottom_area{
  text-align: center;
}

button{
  height: 150px;
  margin : 15px;
} 


</style>