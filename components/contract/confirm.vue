<template>
	<view>
		<div class="selled">
			<p class="title">选择买家</p>
			<p class="input">
				<input v-model="buyername" placeholder="请输入买家姓名">
				<span @click="toSearch">确定</span>
			</p>
			<scroll-view :scroll-y="true" class="result" v-show="buyers.length > 0">
				<div v-for="item in buyerlist" :key="item.id" @click="selectBuyer(item.name, item.phone, item.idCardNo, item.id)">
					<p class="name">{{item.name}}</p>
					<p class="tel">{{item.phone}}</p>
				</div>
			</scroll-view>
			<p class="nobuyer" v-show="ifsearch && buyers.length == 0">未找到相关买家信息</p>
			<p class="button">
				<span class="cancel" @click="toCancel">取消</span>
				<!-- <span class="sure" @click="toSubmit">确定</span> -->
			</p>
		</div>
		<div class="shadow"></div>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		props: ['sellId', 'buyersList'],
		data() {
			return {
				buyername: '',
				ifsearch: false
			}
		},
		computed: {
			...mapState(['buyers']),
			buyerlist() {
				return this.buyers.filter(v => this.buyersList.indexOf(v.id) == -1);
			}
		},
		watch: {
// 			buyersList(n, o) {
// 				this.buyerlist = this.buyers.filter(v => this.buyersList.indexOf(v.id) == -1);
// 			}
		},
		methods: {
			selectBuyer(name, phone, idCardNo, id){
				this.$emit('selectBuyer', name, phone, idCardNo, id);
				this.toCancel();
			},
			toSearch() {
				if(!this.buyername.trim()){
					wx.showToast({
						title: '请输入买家姓名',
						icon: 'none'
					})
					return;
				}
				
				this.ifsearch = true;
				this.$store.dispatch('getBuyer', { name: this.buyername });
			},
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
		.nobuyer{
			text-align: center;
			line-height: 200px;
			color: #ccc;
			font-size: 32px;
		}
		.result{
			// margin: 0 30px;
			padding:0 30px;
			box-sizing:border-box;
			margin-top: 30px;
			max-height: 600px;
			div{
				border-bottom: 1px solid #ebebeb;
				padding: 20px 0;
				.name{
					font-size: 28px;
					line-height: 44px;
				}
				.tel{
					color: #666;
					font-size: 24px;
					line-height: 36px;
				}
			}
		}
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
			margin-bottom: 0px;
			display: flex;
			input{
				line-height: 80px;
				margin-right: 20px;
				flex-grow: 1;
				height: 80px;
			}
			span{
				line-height: 80px;
				color: #32b118;
			}
		}
		.button{
			display: flex;
			border-top: 1px solid #d8d3d9;
			margin-top: 60px;
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
