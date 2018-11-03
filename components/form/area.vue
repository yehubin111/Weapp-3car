<template>
	<view class="selectline">
		<picker class="picker" mode="region" :value="area" @change="areaChange">
			<div class="line">
				<span class="title" :style="{fontSize: fontSize + 'rpx'}">{{name}}</span>
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
				area: ''
			}
		},
		computed: {
			fontSize() {
				let size = 0;
				switch(this.name.length) {
					case 4:
						size = 26;
					break;
					case 5:
						size = 20;
					break;
				}
				return size;
			},
			info() {
				return this.area ? this.area : `请选择${this.placeholder?this.placeholder:this.name}`
			},
			activeColor() {
				return this.area ? '#000000' : '#999999'
			}
		},
		methods: {
			areaChange(r) {
				console.log(r);
				let str = '';
				
				str += r.detail.value[0] != '全部' ? r.detail.value[0] + ' ' : '';
				str += r.detail.value[1] != '全部' ? r.detail.value[1] + ' ' : '';
				
				this.area = str;
				this.$emit('listChange', r.detail.code[1], this.type);
			}, 
			compReset() {
				this.area = '';
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
		.picker{
			flex: 1;
			width: 100%;
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
				.value{
					flex-grow: 1;
					color: #999;
					display: block;
					position: relative;
					.arrow{
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
