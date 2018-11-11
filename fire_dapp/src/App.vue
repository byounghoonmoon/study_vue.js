<template>
  <div id="main-wrap">
    <Reveal noOverlay reveal>
      <a href="#" @click="changeMenu('AuthUser')"><span>블록체인 인증</span></a>
      <a href="#" @click="changeMenu('ApplyAccident')"><span>사고접수 신청</span></a>
      <a href="#" @click="changeMenu('RequestRepair')"><span>수리 요청</span></a>
      <a href="#" @click="changeMenu('ProcessCenter')"><span>수리완료 및 수리비 청구</span></a>
      <a href="#" @click="changeMenu('ApplyRepairFeeList')"><span>수리비 청구 목록</span></a>
      <a href="#" @click="changeMenu('PaymentInsurance')"><span>보험금 지급</span></a>
      <a href="#" @click="changeUser('U')"><span>----------------------------------</span></a>
      <a href="#" @click="changeUser('U')"><span>사용자</span></a>
      <a href="#" @click="changeUser('C')"><span>센터</span></a>
      <a href="#" @click="changeUser('I')"><span>보험사</span></a>
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
import { Slide, Reveal } from 'vue-burger-menu'
import { mapActions, mapState } from 'vuex'
import AuthUser from './components/AuthUser.vue'
import ApplyAccident from './components/ApplyAccident.vue'
import RequestRepair from './components/RequestRepair.vue'
import ProcessCenter from './components/ProcessCenter.vue'
import ApplyRepairFeeList from './components/ApplyRepairFeeList.vue'
import PaymentInsurance from './components/PaymentInsurance.vue'
import HelloMetamask from './components/hello-metamask.vue'
import StatusAccident from './components/StatusAccident.vue'


export default {
  name: 'App',
  beforeCreate () {
    console.log('■ Before Create : registerWeb3 Action dispatched from App.vue')
    this.$store.dispatch('registerWeb3')
  },
  
  computed : mapState(['userCls']),

  components : { Slide,Reveal, HelloMetamask,AuthUser,RequestRepair,ApplyAccident,ProcessCenter, ApplyRepairFeeList,PaymentInsurance ,StatusAccident},
  data() {
    return { currentView : 'StatusAccident' }
  },
  methods : {
    changeMenu(view) {
      this.currentView = view;
    },
    changeUser(view) {
      this.currentView = 'StatusAccident';
      this.$store.commit('changeUser', {userCls : view});
      
    }
  },
  mounted () {
    console.log('■ Mounted : dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
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


