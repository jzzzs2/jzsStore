<template>
	<view>
		<my-login v-if="!token"></my-login>
    <my-info v-else></my-info>
	</view>
</template>

<script>
  import {mapState} from "vuex"
	import cart from "@/mixin/cartCount.js"
	export default {
	  mixins: [cart],
		data() {
			return {
				
			};
		},
    computed: {
      ...mapState("address",["token"])
    }
	}
</script>

<style lang="stylus">

</style>
