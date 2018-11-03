<template>
	<view class="selectline">
		<div class="line" @click="brandShow">
			<span class="title">品牌型号</span>
			<span class="value" :style="{color: activeColor}">{{brand?brand:'请选择品牌型号'}} <i class="arrow"></i></span>
		</div>
		<div v-show="brandshow">
			<brand-type @selectBrand="selectBrand" @cancelBrand="cancelBrand" :thirdGrade="thirdGrade"></brand-type>
		</div>
	</view>
</template>

<script>
	export default {
		props: ['defaultData', 'bd', 'thirdGrade'],
		data() {
			return {
				brandshow: false,
				brand: '',
				brandId: '',
				typeId: '',
				serialId: ''
			}
		},
		watch: {
			defaultData(n, o) {
				if(n.brand){
					this.brand = n.brand;
					this.brandId = n.brandId;
					this.typeId = n.typeId;
					this.serialId = n.serialId;
				}
			}
		},
		onReady() {
			if(this.defaultData && this.defaultData.brand){
				this.brand = this.defaultData.brand;
				this.brandId = this.defaultData.brandId;
				this.typeId = this.defaultData.typeId;
				this.serialId = this.defaultData.serialId;
			}
		},
		computed: {
			activeColor() {
				return this.brand ? '#000000' : '#999999'
			}
		},
		methods: {
			// 返回品牌弹出框显示隐藏状态，外部判断用
			compReset() {
				this.brand = '';
				this.brandshow = false;
			},
			brandShow() {
				this.brandshow = true;
				this.$emit('getBrandshow', true);
			},
			cancelBrand() {
				this.brandshow = false;
				this.$emit('getBrandshow', false);
			},
			selectBrand({title, brandid, typeid, serialid}) {
				this.cancelBrand();
				this.brand = title == '不限'? '': title;
				this.brandId = brandid;
				this.typeId = typeid;
				this.serialId = serialid;
				
				this.$emit('choiceBrand', { title, brandId: this.brandId, typeId: this.typeId, serialId: this.serialId })
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

</style>
