<template>
  <div id="main-wrap">
    
    <Reveal noOverlay reveal>
      <a href="#" @click="change({'currentView':'AuthUser','userCls':userCls})"><span>인증 등록</span></a>
      <a href="#" @click="change({'currentView':'SelectMenuForUser','userCls':userCls})"><span>인증고객 메뉴</span></a>
      <a href="#" @click="change({'currentView':'ApplyAccident','userCls':userCls})"><span>사고접수 신청</span></a>
      <a href="#" ><span>----------------------------------</span></a>
      <a href="#" @click="change({'currentView':'StatusAccident','userCls':userCls})"><span>접수리스트</span></a>
    </Reveal>
     
    <main id="page-wrap">
      <div class="header">
        <h1><img src="./assets/car.png" class="icon"/> Car Hub <img src="./assets/share.png"  class="icon"/></h1>


      </div>
      <div class="container">
        <keep-alive >
          <transition name="component-fade" mode="out-in">
            <component v-bind:is="currentView"></component>
          </transition>
        </keep-alive>
      <hello-metamask/>
      </div>
    </main>
  </div>
</template>



<script>
import { Reveal } from 'vue-burger-menu'
import { mapActions, mapState } from 'vuex'
import AuthUser from './components/AuthUser.vue'
import ApplyAccident from './components/ApplyAccident.vue'
import HelloMetamask from './components/hello-metamask.vue'
import StatusAccident from './components/StatusAccident.vue'
import SelectMenuForUser from './components/SelectMenuForUser.vue'
import Constant from './Constant'



export default {
  name: 'App',
  components : {Reveal,HelloMetamask,AuthUser,ApplyAccident,StatusAccident,SelectMenuForUser},

  async beforeCreate () {
    await this.$store.dispatch(Constant.GET_CONTRACT_INSTANCE);
    await this.$store.dispatch(Constant.REGISTER_WEB3_INSTANCE);
    await this.$store.dispatch(Constant.INIT_USER_CHECK);
    await this.$store.dispatch(Constant.GET_USER_COUNT);
    await this.$store.dispatch(Constant.INIT_SELECT_DATA);
    
  },
  
  computed : mapState(['userCls','currentView','isAuthUserCheck']),  
  methods : {
    async change(param) {
      this.$store.commit(Constant.CHANGE_VIEW_AND_TYPE, param);
      console.log(' ■ 변경 ', param)
            // 전체 사고 현황 조회 
            await this.$store.dispatch(Constant.GET_ACCIDENTS);
            // 본인 관련 사고 현황 필터
            this.$store.commit(Constant.GET_FILTER_ACCIDENTS,{'userCls':this.$store.state.userInfo.userCls,'insCd':this.$store.state.userInfo.insCd});
    }
  }
}
</script>
<style scoped>
.icon {
  width:30px; 
  height:30px; 
  vertical-align:middle;
}
.header { padding: 10px 0px 0px 0px; text-align: center;}
.headerText { padding: 0px 20px 0px 20px; } 
ul { list-style-type: none; margin: 0; padding: 0; 
    overflow: hidden;  }
li { float: left; }
li a { display: block;  text-align: center;
    padding: 14px 16px; text-decoration: none;  }
li a:hover { background-color: aqua; color:black; }
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
#main-wrap{
  width : 1200px;
}
.container{
  width : 1000px;
  margin-top : 10px;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


