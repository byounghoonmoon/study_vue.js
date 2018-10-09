<template>
  <div>
    <div class="header">
      <h1 class="header Text">자동차 정보 - Block-Chain</h1>
        <ul>
          <li>
            <a href="#" @click="changeMenu('ApplyAccident')">사고접수 신청</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('ApplyRepair')">수리 요청</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('ApplyRepairFee')">수리비 청구</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('ApplyRepairFeeList')">수리비 청구 목록</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('PaymentInsurance')">보험금 지급</a>
          </li>
          <!-- <li>
            <a href="#" @click="changeMenu('contact')">InsuranceInfo</a>
          </li> -->
        </ul>
    </div>
    <div class="container">
      <keep-alive >
        <component v-bind:is="currentView"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ApplyAccident from './components/ApplyAccident.vue'
import ApplyRepair from './components/ApplyRepair.vue'
import ApplyRepairFee from './components/ApplyRepairFee.vue'
import ApplyRepairFeeList from './components/ApplyRepairFeeList.vue'
import PaymentInsurance from './components/PaymentInsurance.vue'
import User from './components/User.vue'

export default {
  name: 'App',
  components : { ApplyAccident, ApplyRepair, ApplyRepairFee, ApplyRepairFeeList,PaymentInsurance, User },
  data() {
    return { currentView : 'ApplyAccident' }
  },
  methods : {
    changeMenu(view) {
      this.currentView = view;
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

</style>
