<template>
	<view>
		<div class="selled">
			<p class="title">设置成交价格</p>
			<p class="input">
				<input type="digit" v-model="price" placeholder="请输入成交价格">
				<span>万元</span>
			</p>
			<p class="button">
				<span class="cancel" @click="toCancel">取消</span>
				<span class="sure" @click="toSubmit">确定</span>
			</p>
		</div>
		<div class="shadow"></div>
	</view>
</template>

<script>
	export default {
		props: ['sellId'],
		data() {
			return {
				price: ''
			}
		},
		methods: {
			toCancel() {
				this.$emit('cancelConfirm');
			},
			toSubmit() {
				if(!this.price.trim()){
					wx.showToast({
						title: '请输入成交价格',
						icon: 'none'
					})
					return;
				}
				
				this.$store.dispatch('setSell', {id: this.sellId, price: parseFloat(this.price)});
				
				this.$emit('cancelConfirm');
			}
		}
	}
</script>

<style lang="less" scoped>
	.shadow{
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, .5);
		top: 0;
		left: 0;
		z-index: 36;
	}
	.selled{
		width: 80%;
		// height: 100px;
		background-color: #fff;
		position: fixed; 
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 37;
		border-radius: 10px;
		.title{
			font-size: 30px;
			padding-left: 30px;
			line-height: 80px;
			font-weight: bold;
			margin-bottom: 20px;
			margin-top: 10px;
		}
		.input{
			padding: 0 30px;
			font-size: 32px;
			margin-bottom: 60px;
			display: flex;
			input{
				line-height: 80px;
				margin-right: 20px;
				flex-grow: 1;
				height: 80px;
			}
			span{
				line-height: 80px;
			}
		}
		.button{
			display: flex;
			border-top: 1px solid #d8d3d9;
			span{
				flex: 1;
				font-size: 32px;
				line-height: 90px;
				text-align: center;
				&.cancel{
					border-right: 1px solid #d8d3d9;
				}
				&.sure{
					color: #32b118;
				}
			}
		}
	}

</style>
