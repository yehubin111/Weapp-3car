<template>
	<view class="content">
		<mine-search ref="mineSearch" @keywordSearch="keywordSearch"></mine-search>
		<mine-sort ref="mineSort" @sortFilter="sortFilter"></mine-sort>
		<mine-car ref="owncarlist"></mine-car>
	</view>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	export default { 
		data: {
			name: '',
			city: '',
			current: 1,
			size: 20,
			keyword: '',
			sortoption: {
				ztPriceMin: '',
				ztPriceMax: '',
				brandId: '',
				typeId: '',
				priceOrder: '',
				spsjOrder: '',
				ctOrder: '',
				mileageOrder: ''
			}
		},
		computed: {
			...mapState(['owncartotal', 'owncar'])
		},
		mounted:function(){
			console.log(this.$store);
			let option = {
				current: this.current,
				size: this.size
			}
			// 获取联盟车辆列表
			this.$store.dispatch('getOwncar', { option, load: true });
		},
		onUnload() {
			/**
			* 页面tab切换，重置子组件状态
			*/
			this.$refs.mineSort.resetAllSort();
			this.$refs.mineSearch.resetSearch();
			this.$refs.owncarlist.cancelConfirm();
		},
		// 下拉刷新事件
		onPullDownRefresh() {
			this.current = 1;
			this.optionCarload();
		},
		// 上拉加载更多事件
		onReachBottom() {
			if(this.owncar.length == this.owncartotal)
				return;
				
			this.current++;
			console.log(this.current);
			let option = {
				current: this.current,
				size: this.size,
				keyword: this.keyword,
				...this.sortoption
			}
			// 获取联盟车辆列表
			this.$store.dispatch('getOwncar', { option, more: true });
		},
		methods:{
			keywordSearch(k) {
				this.keyword = k;
				this.current = 1;
				this.optionCarload();
			},
			sortFilter(opt) {
				this.sortoption = opt;
				this.current = 1;
				this.optionCarload();
			},
			optionCarload() {
				let option = {
					current: this.current,
					size: this.size,
					keyword: this.keyword,
					...this.sortoption
				}
				// 获取联盟车辆列表
				this.$store.dispatch('getOwncar', { option, load: true });
			},
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
	}
</style>
