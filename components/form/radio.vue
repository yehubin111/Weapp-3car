<template>
	<view class="selectline">
		<div class="line">
			<span class="title">{{name}}</span>
			<radio-group class="radiogroup" @change="radioChange">
				<label class="radio" v-for="item in list" :key="item.id">
					<radio :value="item.key" :checked="item.checked" />{{item.val}}
				</label>
			</radio-group>
		</div>
	</view>
</template>

<script>
	export default {
		props: ['name', 'list', 'type'],
		methods: {
			radioChange(e) {
				console.log(e);
				let vl = e.detail.value;
				this.$emit('radioChange', vl, this.type);
			}
		}
	}
</script>

<style lang="less" scoped>
	.selectline{
		padding-left: 24px;
		height: 86px;
		line-height: 86px;
		font-size: 26px;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		.line{
			border-bottom: 2px solid #ebebeb;
			flex: 1;
			display: flex;
			width: 100%;
			.title{
				margin-right: 55px;
				width: 105px;
				flex-basis: 105px;
				flex-shrink: 0;
				display: block;
				text-align: right;
			}
			.radiogroup{
				.radio{
					margin-right: 30px;
					radio{
						margin-right: 5px;
					}
				}
			}
		}
	}

</style>
