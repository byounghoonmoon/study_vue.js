<template>
  <div id="main-wrap">
    <Reveal noOverlay reveal>
      <a href="#" @click="change({'currentView':'AuthUser','userCls':userCls})"><span>블록체인 인증</span></a>
      <a href="#" @click="change({'currentView':'ApplyAccident','userCls':userCls})"><span>사고접수 신청</span></a>
      <a href="#" ><span>----------------------------------</span></a>
      <a href="#" @click="change({'currentView':'StatusAccident','userCls':'U'})"><span>사용자</span></a>
      <a href="#" @click="change({'currentView':'StatusAccident','userCls':'C'})"><span>센터</span></a>
      <a href="#" @click="change({'currentView':'StatusAccident','userCls':'I'})"><span>보험사</span></a>
    </Reveal>
     
    <main id="page-wrap">
      <div class="header">
        <h1 class="header Text">자동차 정보 - Block-Chain</h1>
      </div>
      <div class="container">
        <keep-alive >
          <component v-bind:is="currentView"></component>
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
    change(param) {
      this.$store.commit(Constant.CHANGE_VIEW_AND_TYPE, param);
      console.log(' ■ 변경 ', param)
    }
  }
}
</script>
<style scoped>
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
</style>


