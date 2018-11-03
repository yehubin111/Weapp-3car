<template>
	<view class="carlist">
		<navigator v-for="item in leaguecar" :key="item.id" class="car" :url="'/pages/cardetail/cardetail?id=' + item.id">
			<view class="con">
				<p class="pic">
					<image :src="item.images" alt=""></image>
				</p>
				<div class="info">  
					<p class="name">{{item.title}}</p>
					<p class="tip">{{item.mileage}}万公里  |  {{item.shop}}</p>
					<p class="price">{{item.ztPrice}}万</p>
					<p class="number" @click.prevent.stop="makePhoneCall(item.phone)">联系商家</p>
				</div> 
			</view> 
		</navigator>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		computed: {
			...mapState(['leaguecar'])
		},
		methods: {
			makePhoneCall(num) {
				wx.makePhoneCall({
					phoneNumber: num
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.carlist{
		background-color: #fff;
		padding-bottom: 100px;
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
					image{
						width: 200px;
						height: 150px;
					}
				}
				.info{
					margin: 20px 0;
					flex-grow: 1; 
					display: flex;
					flex-direction: column;
					position: relative;
					.name{
						flex-basis: 76px;
						flex-shrink: 0; 
						line-height: 38px;
						height: 76px;
						font-size: 28px;
						margin-bottom: 8px;
						overflow: hidden;
					}
					.tip{
						flex-basis: 34px;
						line-height: 34px;
						font-size: 24px;
						color: #999;
						margin-bottom: 1px;
						white-space:nowrap;
						width:70%;
						text-overflow:ellipsis;
						overflow:hidden;

					}
					.price{
						font-size: 32px;
						color: #f44446;
						line-height: 42px;
						font-weight: bold;
					}
					.number{
						width: 126px;
						height: 44px;
						line-height: 44px;
						text-align: center;
						position: absolute;
						font-size: 24px;
						color: #f44446;
						border-radius: 4px;
						border: 2px solid #f44446;
						right: 0px;
						bottom: 1px;
					}
				}
			}
		}
	}
</style>