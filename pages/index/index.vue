<template>
	<view class="content">
		<index-search ref="indexSearch" @keywordSearch="keywordSearch"></index-search>
		<index-sort ref="indexSort" @sortFilter="sortFilter"></index-sort>
		<car-list></car-list>
		<page-nav :nav="1"></page-nav>
		<!-- <div class="shadow"></div> -->
	</view> 
</template>
 
<script>
	import {mapState, mapGetters} from 'vuex'
	export default {
		data() {
			return {
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
			}
		},
		computed: {
			...mapState(['leaguetotal', 'leaguecar'])
		},
		mounted: function(){
			// 获取联盟车辆列表
			this.optionCarload();
			// 获取品牌列表 
			this.$store.dispatch('getBrandlist');
			
		},
		onUnload() {
			/**
			* 页面tab切换，重置子组件状态
			*/
			this.$refs.indexSort.resetAllSort();
			this.$refs.indexSearch.resetSearch();
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
			toPay() {
				console.log('paying...')
				wx.requestPayment({
					timeStamp: '',
					nonceStr: '',
					package: '',
					signType: '',
					paySign: '',
					success: (res) => {
						console.log(res)
					},
					fail: (res) => {
						console.log(res)
					},
					complete: (res) => {
						console.log(res)
					}
				})
			},
			optionCarload() {
				let option = {
					current: this.current,
					size: this.size,
					keyword: this.keyword,
					...this.sortoption
				}
				// 获取联盟车辆列表
				this.$store.dispatch('getLeagueCar', { option, load: true });
			},
		},
		// 右上角分享事件
		onShareAppMessage(res) {
			return {
				title: '三人行联盟车源'
			}
		},
		// 下拉刷新事件
		onPullDownRefresh() {
			this.current = 1;
			this.optionCarload();
		},
		// 上拉加载更多事件
		onReachBottom() {
			if(this.leaguecar.length == this.leaguetotal)
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
			this.$store.dispatch('getLeagueCar', { option, more: true });
		}
	}
</script>

<style lang="less" scoped>
	
	.content {
		flex: 1;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #f2f2f2;
	}
</style>
