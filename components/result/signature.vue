<template>
	<view>
		<div class="signature">
			<div class="line">
				<div class="left">
					<p v-show="!info.qmsj">卖方未签字</p>
					<image v-show="info.qmsj" :src="info.sign" alt=""></image>
				</div>
				<div class="right">
					<p>签署人：{{info.seller}}</p>
					<p>签署时间：{{info.qmsj}}</p>
					<p>联系方式：{{info.sellerPhone}}</p>
					<p>身份证号：{{info.sellerIdCard}}</p>
				</div>
			</div>
			<div class="line" v-for="(item, index) in info.buyers" :key="index">
				<div class="left">
					<p v-show="!item.qmsj">买方未签字</p>
					<image v-show="item.qmsj" :src="item.sign" alt=""></image>
				</div>
				<div class="right">
					<p>签署人：{{item.name}}</p>
					<p>签署时间：{{item.qmsj}}</p>
					<p>联系方式：{{item.phone}}</p>
					<p>身份证号：{{item.idCard}}</p>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		props: ['info']
	}
</script>

<style lang="less" scoped>
	.signature {
		.line {
			display: flex;
			padding-left: 24px;
			margin-bottom: 24px;

			.left {
				flex-basis: 236px;
				height: 294px;
				width: 236px;
				overflow: hidden;
				margin-right: 26px;
				background-color: #fff;
				position: relative;
				p{
					width: 100%;
					height: 100%;
					line-height: 294px;
					text-align: center;
					color: #ccc;
				}
				image {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
				}
			}

			.right {
				flex-grow: 1;
				font-size: 24px;
				color: #666;
				line-height: 45px;
			}
		}

	}
</style>
