<template>
	<view class="selectline">
		<picker class="picker" mode="selector" :value="index" :range="dataArray[type]" :range-key="dataType == 'object'?'name': ''"
		 @change="indexChange">
			<div class="line">
				<span class="title">{{name}}</span>
				<span class="value" :style="{color: activeColor}">{{info}}<i class="arrow"></i></span>
			</div>
		</picker>
	</view>
</template>

<script>
	export default {
		props: ['name', 'placeholder', 'type', 'defaultData'],
		data() {
			return {
				dataArray: {
					color: [
						'银灰色',
						'深灰色',
						'黑色',
						'白色',
						'红色',
						'蓝色',
						'咖啡色',
						'香槟色',
						'黄色',
						'紫色',
						'绿色',
						'橙色',
						'粉红色',
						'棕色',
						'冰川白',
						'银色',
						'金色',
						'其他',
					],
					carType: [
						'轿车',
						'SUV',
						'跑车',
						'商务车',
						'面包车',
						'客车',
						'货车',
						'皮卡',
						'摩托车',
						'工程车',
						'房车',
					],
					outType: [
						'国I',
						'国II',
						'国III',
						'国IV',
						'国V',
						'国VI',
					]
				},
				index: -1
			}
		},
		onReady() {
			console.log('public ready');
			if(this.defaultData){
				this.index = this.dataArray[this.type].indexOf(this.defaultData);
			}
		},
		watch: {
			defaultData(n, o) {
				if(n){
					this.index = this.dataArray[this.type].indexOf(n);
				}
			}
		},
		methods: {
			indexChange(i) {
				console.log(i);
				this.index = i.detail.value;
				this.$emit('listChange', this.dataArray[this.type][this.index], this.type);
			},
			compReset() {
				this.index = -1;
			}
		},
		computed: {
			info() {
				if (this.dataArray[this.type][this.index] && this.dataArray[this.type][this.index].hasOwnProperty('name'))
					return this.index != -1 ? this.dataArray[this.type][this.index].name :
						`请选择${this.placeholder?this.placeholder:this.name}`
				else
					return this.index != -1 ? this.dataArray[this.type][this.index] :
						`请选择${this.placeholder?this.placeholder:this.name}`
			},
			activeColor() {
				return this.index != -1 ? '#000000' : '#999999'
			},
			dataType() {
				let type = '';
				switch (this.type) {
					case 'carType':
					case 'color':
					case 'outType':
						type = 'string';
						break;
					default:
						break;
				}

				return type;
			},
			// 			dataArray() {
			// 				let arr = [];
			// 				switch (this.type) {
			// 					case 'carType':
			// 						arr = [
			// 							'轿车',
			// 							'SUV',
			// 							'跑车',
			// 							'商务车',
			// 							'面包车',
			// 							'客车',
			// 							'货车',
			// 							'皮卡',
			// 							'摩托车',
			// 							'工程车',
			// 							'房车',
			// 						];
			// 						break;
			// 					case 'color':
			// 						arr = [
			// 							'银灰色',
			// 							'深灰色',
			// 							'黑色',
			// 							'白色',
			// 							'红色',
			// 							'蓝色',
			// 							'咖啡色',
			// 							'香槟色',
			// 							'黄色',
			// 							'紫色',
			// 							'绿色',
			// 							'橙色',
			// 							'粉红色',
			// 							'棕色',
			// 							'冰川白',
			// 							'银色',
			// 							'金色',
			// 							'其他',
			// 						];
			// 						break;
			// 					case 'outType':
			// 						arr = [
			// 							'国I',
			// 							'国II',
			// 							'国III',
			// 							'国IV',
			// 							'国V',
			// 							'国VI',
			// 						];
			// 						break;
			// 					default:
			// 						break;
			// 				}
			// 
			// 				return arr;
			// 			}
		}
	}
</script>

<style lang="less" scoped>
	.selectline {
		padding-left: 24px;
		height: 86px;
		line-height: 86px;
		font-size: 26px;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		display: flex;

		.picker {
			flex: 1;
			width: 100%;

			.line {
				border-bottom: 2px solid #ebebeb;
				flex: 1;
				display: flex;
				width: 100%;

				.title {
					margin-right: 55px;
					width: 105px;
					flex-basis: 105px;
					flex-shrink: 0;
					display: block;
					text-align: right;
				}

				.value {
					flex-grow: 1;
					color: #999;
					display: block;
					position: relative;

					.arrow {
						width: 13px;
						position: absolute;
						height: 86px;
						background: center center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAsCAYAAAB7aah+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1QkZCN0Y5Q0NBODExRThBNDdDRjY1NjJCRjRGNzExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1QkZCN0ZBQ0NBODExRThBNDdDRjY1NjJCRjRGNzExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTVCRkI3RjdDQ0E4MTFFOEE0N0NGNjU2MkJGNEY3MTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTVCRkI3RjhDQ0E4MTFFOEE0N0NGNjU2MkJGNEY3MTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/DuvFAAACJUlEQVR42rSYOUsDQRTHN0s+iK2FhTFaRPBACURFDVbaiaCFhQcGjyCBIF4oqKWClWITNKIJBEUUTfwCgooHiiii4oFi7X9gFlJk3m4yzwc/EvYN/DJvJzNv15VOpw1EFZgERWADhAyH4fP5HI1zgxJwlHVtCJSCeoMxTNCf43odSHGLnhQ5P9jlFM2BW0W+ESS5RF+gDNwoxgQ4ZKb8/ARecPVfMjPru5B5wAUh2+cQifgBFeBcMb7g1WjmuPYty3hJrMZtDpGIX1AO7hT5ZrDDIbJm5iFkTSDBIRLxIWWqpd+QyWQSHCJLJsp4rSMzHc78Qy4QSpbkEBlyB6HKGIAsziGyFogo46Mi3wLZFofIKqM4rx4U+dZcMrPAHeVVbsT3hCzOIbJkXkLWki3TEYl4kwuEksU4RKI5eZeyU8WQNsg6tUVZsjAxpIZFhF8s7tUaMSTlkn2dTlSCY+BS5Bcx437dGVWDE0KyICS6i6EWHBL5OUgGdJe36GIPiPwMJCHdP6yYyR6Rn4BkRHcLqrOZSRSScd1N1W/Tbk1BEtE9JgI2bZYo15juwddk06VGVOXKRxS0aavCkESdPogZRO+2SeSHwazTG+wmJFQ3Kp4K53UbyKCNZDRfSS5Rm4NyTes2+e0gRowdzOeeqO5RB1gnxvWBJZ1tXoiKbSTdYEX30HLLlxmq6AKrXA/LqiO2h0tiic5AL3iRLe+zLNcy5wuNPwEGAA0tkJ/zn4rJAAAAAElFTkSuQmCC) no-repeat;
						background-size: 13px auto;
						right: 24px;
						top: 0;
					}
				}
			}
		}
	}
</style>
