<template lang="html">
  <div class='metamask-info'>
    <p id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> 메타마스크 정보</p>
    <p>Network: {{ network }}</p>
    <p>Account: {{ coinbase }}</p>
    <p>Balance: {{ balance }} Wei </p>
  </div>
</template>

<script>

  import Constant from '../Constant'
  // import {NETWORKS} from '../util/constants/networks'
  import {mapState} from 'vuex'
  export default {
    name: 'hello-metamask',
    computed: mapState({
      isInjected: state => state.web3.isInjected,
      network: state => Constant.NETWORKS[state.web3.networkId],
      coinbase: state => state.web3.coinbase,
      balance: state => state.web3.balance
    })
  }
</script>

<style scoped>
#has-metamask {
  color: green;
}
#no-metamask {
  color:red;
}</style>
