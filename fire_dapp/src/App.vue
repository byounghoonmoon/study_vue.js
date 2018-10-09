<template>
  <div>
    <div class="header">
      <h1 class="header Text">자동차 정보 - Block-Chain</h1>
        <ul>
          <li>
            <a href="#" @click="changeMenu('RepairList')">RepairInfo</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('User')">UserInfo</a>
          </li>
          <!-- <li>
            <a href="#" @click="changeMenu('contact')">InsuranceInfo</a>
          </li> -->
        </ul>
    </div>
    <div class="container">
      <keep-alive include="about,home">
        <component v-bind:is="currentView"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import RepairList from './components/RepairList.vue'
import User from './components/User.vue'

export default {
  name: 'App',
  components : { RepairList, User },
  data() {
    return { currentView : 'RepairList' }
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
