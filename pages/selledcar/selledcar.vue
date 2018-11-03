<template>
	<view class="content">
		<!-- <index-search></index-search> -->
		<!-- <index-sort></index-sort> -->
		<selled-car></selled-car>
		<page-nav :nav="1"></page-nav>
	</view>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				current: 1,
				size: 20
			}
		},
		onReady() {
			this.optionCarload(true);
		},
		computed: {
			...mapState(['selledcar', 'selledcartotal'])
		},
		methods: {
			optionCarload(load) {
				let option = {
					current: this.current,
					size: this.size
				}
				// 获取联盟车辆列表
				this.$store.dispatch('getSelledCar', { option, load });
			},
		},
		// 下拉刷新事件
		onPullDownRefresh() {
			this.current = 1;
			this.optionCarload(true);
		},
		// 上拉加载更多事件
		onReachBottom() {
			if(this.selledcar.length == this.selledcartotal)
				return;
				
			this.current++;
			console.log(this.current);
			this.optionCarload();
		}
	}
</script>

<style>
	.content {
		flex: 1;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #f2f2f2;
		overflow: hidden;
	}
</style>
