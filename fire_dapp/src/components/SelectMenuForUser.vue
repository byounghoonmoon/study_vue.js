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
    change(param) {
      if(param.gubun=='2'){
        this.$store.dispatch(Constant.GET_ACCIDENTS);
        this.$store.commit(Constant.CHANGE_VIEW_AND_TYPE, param);
      }

      else
        this.$store.commit(Constant.CHANGE_VIEW_AND_TYPE, param);
      console.log(' ■ 변경 ', param)
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