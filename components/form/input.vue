<template>
	<view class="selectline">
		<div class="line">
			<span class="title" :style="{fontSize: fontSize + 'rpx'}">{{name}}</span>
			<input class="input" type="text" v-model="state" @input="inputInfo" :disabled="readonly" :placeholder="'请输入'+(placeholder?placeholder:name)" placeholder-style="color: #999;line-height: 40px">
			<span class="unit">{{unit}}</span>
		</div>
	</view>
</template>

<script>
	let inputrun;
	export default {
		props: ['name', 'unit', 'placeholder', 'type', 'defaultData', 'readonly'],
		data() {
			return {
				state: ''
			}
		},
		onReady() {
			if(this.defaultData){
				this.state = this.defaultData;
			}
		},
		computed: {
			fontSize() {
				let size = 0;
				switch(this.name.length) {
					case 4:
					case 3:
					case 2:
						size = 26;
					break;
					case 5:
						size = 20;
					break;
				}
				return size;
			},
		},
		watch: {
			defaultData(n, o) {
				if(n){
					this.state = n;
				}
			}
		},
		methods: {
			compReset() {
				this.state = '';
			},
			inputInfo(i) {
				let vl = i.detail.value;
				
				clearTimeout(inputrun);
				inputrun = setTimeout(() => {
					this.$emit('inputChange', vl, this.type);
				}, 300)
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
			.input{
				flex-basis: 300px;
				width: 300px;
				margin-right: 10px;
				flex-shrink: 0;
				height: 86px;
				line-height: 86px;
			}
			.unit{
				flex-grow: 1;
			}
		}
	}

</style>
