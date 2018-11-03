<template>
	<view class="carlist">
		<navigator class="car" v-for="(item, index) in selledcar" :key="index" :url="'/pages/result/result?contractNo=' + item.contractNo">
			<view class="con">
				<!-- <p class="pic">
					<img src="" alt="">
				</p> -->
				<div class="info"> 
					<p class="name">{{item.title}}</p>
					<p class="sellinfo">卖方：<span>{{item.seller}}</span>买方：<span>{{item.buyer}}</span></p>
					<!-- <p class="sellinfo"></p> -->
					<p class="sellinfo">成交日期：<span>{{item.cjsj}}</span></p>
				</div>
			</view> 
		</navigator>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		methods: {
			
		},
		computed: {
			...mapState(['selledcar'])
		}
	}
</script>

<style lang="less" scoped>
	.carlist{
		background-color: #fff;
		margin-top: 20px;
		.car{
			width: 100%;
			.con{
				margin: 0 24px;
				border-bottom: 1px solid #ebebeb;
				display: flex; 
				.pic{ 
					margin: 24px 0;
					flex-basis: 200px;
					flex-shrink: 0;
					height: 150px;
					overflow: hidden;
					margin-right: 24px;
					img{
						width: 200px;
						height: 150px;
					}
				}
				.info{
					overflow: hidden;
					margin: 20px 0;
					flex-grow: 1;
					display: flex;
					flex-direction: column;
					position: relative;
					.name{
						flex-basis: 38px;
						flex-shrink: 0; 
						line-height: 38px;
						height: 38px;
						font-size: 28px;
						margin-bottom: 23px;
						overflow: hidden;
						white-space: nowrap; 
						text-overflow: ellipsis;
					}
					.sellinfo{
						color: #999;
						font-size: 22px;
						line-height: 34px;
						span{
							color: #333;
							margin-right: 30px;
						}
					}
				}
			}
		}
	}
</style>