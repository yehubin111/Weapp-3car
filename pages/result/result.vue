<template>
	<view class="content">
		<result-contract :info="info" :contractNo="contractNo"></result-contract>
		<result-signature :info="info"></result-signature>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				info: {},
				contractNo: ''
			}
		},
		onLoad(e) {
			console.log(e); 
			this.contractNo = e.contractNo;
			// this.contractNo = 'C1_20181103102100038';
			
			// 获取合同信息
			this.$store.dispatch('getContractInfo', { contractNo: this.contractNo });
		},
		onUnload() {
			this.SETSTATE({k: 'contractinfo', v: '{}'});
		},
		computed: {
			...mapState(['contractinfo'])
		},
		methods: {
			...mapMutations(['SETSTATE'])
		},
		watch: {
			contractinfo(n, o) {
				if(n != '{}') {
					let obj = JSON.parse(n);
					
					this.info = obj;
				}
			}
		}
	}
</script>
<style>
	page{
		display: flex;
		min-height: 100%;
	}
</style>
<style lang="less" scoped>
	.content{
		background-color: #f2f2f2;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
</style>
