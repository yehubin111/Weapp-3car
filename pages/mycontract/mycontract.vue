<template>
	<view class="content">
		<navigator class="nav" v-for="(item, index) in mycontract" :key="index" :url="'/pages/result/result?contractNo=' + item.contractNo">
			<div class="con">
				<p class="brand">{{item.title}}</p>
				<p class="sellinfo">卖方：<span>{{item.seller}}</span>买方：<span>{{item.buyer}}</span></p>
				<div class="other">
					<span class="time">{{item.time}}</span>
					<span :class="{status:true, nosign: item.flag === 0, sign: item.flag == 1, finish: item.flag == 2}">{{item.statusName}}</span>
				</div>
			</div>
		</navigator>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				current: 1,
				size: 10
			};
		},
		computed: {
			...mapState(['mycontract', 'mycontracttotal'])
		},
		onLoad() {
			// 获取我的成交列表
			this.optionCarload();
		},
		methods: {
			optionCarload(load) {
				let option = {
					current: this.current,
					size: this.size
				}
				// 获取联盟车辆列表
				this.$store.dispatch('getMycontract', { option, load });
			},
		},
		// 下拉刷新事件
		onPullDownRefresh() {
			this.current = 1;
			this.optionCarload(true);
		},
		// 上拉加载更多事件
		onReachBottom() {
			if(this.mycontract.length == this.mycontracttotal)
				return;
				
			this.current++;
			console.log(this.current);
			this.optionCarload();
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
		padding-top: 24px;
		overflow: hidden;
		.nav{
			margin: 0 24px;
		}
		.con{
			margin: 0 0 24px;
			border-radius: 10px;
			background-color: #fff;
			padding-top: 16px;
			.brand{
				line-height: 70px;
				font-size: 31px;
				padding: 0 32px;
				height: 70px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				// margin-bottom: 10px;
				
			}
			.sellinfo{
				padding: 0 0 0 32px;
				color: #999;
				font-size: 24px;
				line-height: 62px;
				margin-bottom: 15px;
				span{
					color: #333;
					margin-right: 30px;
				}
			}
			.other{
				margin: 0 32px;
				border-top: 1px solid #ebebeb;
				font-size: 24px;
				overflow: hidden;
				line-height: 82px;
				.time{
					float: left;
				}
				.status{
					float: right;
					font-size: 28px;
					&.nosign{
						color: #F44446;
					}
					&.sign{
						color: #FBA500;
					}
					&.finish{
						// color: #000;
					}
				}
			}
		}
	}
</style>
