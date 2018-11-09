<template>
  <div>
    <div class="header">
      <h1 class="header Text">자동차 정보 - Block-Chain</h1>
        <ul>
          <li>
            <a href="#" @click="changeMenu('AuthUser')">블록체인 인증</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('ApplyAccident')">사고접수 신청</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('RequestRepair')">수리 요청</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('ProcessCenter')">수리완료 및 수리비 청구</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('ApplyRepairFeeList')">수리비 청구 목록</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('PaymentInsurance')">보험금 지급</a>
          </li>
          
          <li>
            <a href="#" @click="changeUser('U')">사용자</a>
          </li>
          <li>
            <a href="#" @click="changeUser('C')">센터</a>
          </li>
          <li>
            <a href="#" @click="changeUser('I')">보험사</a>
          </li>
        </ul>
    </div>
    <div class="container">
      <keep-alive >
        <component v-bind:is="currentView"></component>
      </keep-alive>
    </div>

    <hello-metamask/>
  </div>
</template>



<script>
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

  components : {  HelloMetamask,AuthUser,RequestRepair,ApplyAccident,  ProcessCenter, ApplyRepairFeeList,PaymentInsurance ,StatusAccident},
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

</style>


