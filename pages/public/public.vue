<template>
	<view class="content">
		<p class="title">车辆图片（最多上传16张）</p>
		<view class="picupload" @click="showUpload">
			<div class="line">
				<span class="tl">上传图片</span>
				<p class="value" style="color: #000;"><span v-show="imagearr.length > 0">已上传{{imagearr.length}}张图片</span><i class="arrow"></i></p>
			</div>
		</view>
		<div v-if="uploadbox">
			<public-upload @cancelUpload="cancelUpload"></public-upload>
		</div>
		<p class="title">基本信息</p>
		<div class="baseinfo"> 
			<cv-brand ref="brand" :defaultData="{brand: this.brand, brandId: this.formData.brandId, typeId: this.formData.typeId, serialId: this.formData.serialId}" :thirdGrade="true" @choiceBrand="choiceBrand" @getBrandshow="getBrandshow"></cv-brand>
			<cv-list ref="color" :defaultData="formData.color" name="车身颜色" type="color" @listChange="listChange"></cv-list>
			<cv-list ref="carType" :defaultData="formData.carType" name="车型" type="carType" @listChange="listChange"></cv-list>
			<cv-input ref="mileage" :defaultData="formData.mileage" name="公里数" unit="万公里" type="mileage" @inputChange="listChange"></cv-input>
			<cv-date ref="spsj" :defaultData="formData.spsj" name="上牌日期" type="spsj" @listChange="listChange"></cv-date>
			<cv-date ref="ccsj" :defaultData="formData.ccsj" name="出厂日期" type="ccsj" @listChange="listChange"></cv-date>
			<cv-input ref="auto" :defaultData="formData.auto" name="排量" unit="" type="auto" @inputChange="listChange"></cv-input>
			<cv-list ref="outType" :defaultData="formData.outType" name="排放" type="outType" @listChange="listChange"></cv-list>
			<textarea class="cardetail" v-model="formData.desc" v-show="!uploadbox && !brandshow" placeholder="请输入车况描述" placeholder-style="color: #999;line-height: 40px"
			 name="desc" id=""></textarea>
		</div>
		<p class="title">价格信息</p>
		<div class="priceinfo">
			<cv-input ref="ztPrice" :defaultData="formData.ztPrice" name="展厅标价" unit="万元" type="ztPrice" @inputChange="listChange"></cv-input>
			<cv-input ref="lmPrice" :defaultData="formData.lmPrice" name="联盟底价" unit="万元" type="lmPrice" @inputChange="listChange"></cv-input>
		</div>
		<div class="submit">
			<button type="warn" @click="toSubmit">发布</button>
		</div>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				tempFilePaths: '',
				brandshow: false,
				brand: '',
				uploadbox: false,
				resetArr: ['brand', 'color', 'carType', 'mileage', 'spsj', 'ccsj', 'auto', 'outType', 'ztPrice', 'lmPrice'],
				formData: {
					brandId: '',
					typeId: '',
					serialId: '',
					color: '',
					carType: '',
					outType: '',
					mileage: '',
					auto: '',
					spsj: '',
					ccsj: '',
					desc: '',
					ztPrice: '',
					lmPrice: ''
				},
				carid: ''
			}
		},
		watch: {
			editinfo: {
				handler(n, o) {
					if(n) {
						this.brand = n.brandName + n.typeName + n.serialName;
						this.formData = {
							brandId: n.brandId,
							typeId: n.typeId,
							serialId: n.serialId,
							color: n.color,
							carType: n.carType,
							outType: n.outType,
							mileage: n.mileage,
							auto: n.auto,
							spsj: n.spsj_year + '-' + n.spsj_month,
							ccsj: n.ccsj_year + '-' + n.ccsj_month,
							desc: n.desc,
							ztPrice: n.ztPrice,
							lmPrice: n.lmPrice
						}
					}
				},
				deep: true
			}
		},
		mounted() {

		},
		computed: {
			...mapState(['imagearr', 'editinfo'])
		},
		onLoad(e) {
			console.log(e);
			// 初始化获取车辆id
			this.carid = e.id;
			if(this.carid)
				// 根据id获取车辆信息
				this.$store.dispatch('getEditinfo', this.carid);
		},
		onUnload() {
			/**
			 * 状态重置无法放置在onHide钩子中
			 * 因为上传图片时，会触发onHide事件，页面转到后台
			 */
			console.log('public unload');
			this.resetArr.forEach(v => {
				this.$refs[v].compReset();
			});
			this.SETSTATE({k: 'showImage', v: []});
			this.SETSTATE({k: 'imagearr', v: []});

			this.brand = '';
			this.formData = {
				brandId: '',
				typeId: '',
				serialId: '',
				color: '',
				carType: '',
				outType: '',
				mileage: '',
				auto: '',
				spsj: '',
				ccsj: '',
				desc: '',
				ztPrice: '',
				lmPrice: ''
			};
			this.SETSTATE({k: 'editinfo', v: null});
			this.carid = '';
		},
// 		onHide() {
// 			/**
// 			 * 页面tab切换，重置子组件状态
// 			 */
// 			console.log('public unload');

// 		},
		methods: {
			...mapMutations(['SETSTATE']),
			getBrandshow(status) {
				this.brandshow = status;
			},
			listChange(val, type) {
				console.log(type, val);
				this.formData[type] = val;
			},
			choiceBrand({
				title,
				brandId,
				typeId,
				serialId
			}) {
				console.log(brandId, typeId, serialId);
				this.brand = title;
				this.formData['brandId'] = brandId;
				this.formData['typeId'] = typeId;
				this.formData['serialId'] = serialId;
			},
			cancelUpload() {
				this.uploadbox = false;
			},
			showUpload() {
				this.uploadbox = true;
			},
			conditionCheck() {
				if(this.imagearr.length == 0) return [false, '请上传至少一张车辆图片'];
				if(!this.formData.typeId) return [false, '请选择完整的车辆品牌型号'];
				if(!this.formData.color) return [false, '请选择车身颜色'];
				if(!this.formData.carType) return [false, '请选择车型'];
				if(!this.formData.mileage) return [false, '请输入表显里程'];
				if(!this.formData.spsj) return [false, '请选择上牌日期'];
				if(!this.formData.ccsj) return [false, '请选择出厂日期'];
				if(!this.formData.auto) return [false, '请输入排量'];
				if(!this.formData.outType) return [false, '请选择排放'];
				if(!this.formData.ztPrice) return [false, '请输入展厅标价'];
				if(!this.formData.lmPrice) return [false, '请输入联盟底价'];
				
				return [true];
			},
			toSubmit() {
				let check = this.conditionCheck();
				if(!check[0]){
					wx.showToast({
						title: check[1],
						icon: 'none'
					})
					return;
				}
				
				this.formData.spsj = this.formData.spsj.replace('-', '年') + '月';
				this.formData.ccsj = this.formData.ccsj.replace('-', '年') + '月';
				// 车辆编辑多一个字段
				if(this.carid){
					this.formData.id = this.carid;
					this.formData.shopId = this.editinfo.shopId;
				}
				// 排除图片上传失败或者未上传完成情况，v.key为空
				let igar = this.imagearr.filter(v => v.key);	
				let option = {
					imgs: igar.map(v => v.key).join(','),
					...this.formData
				}

				this.$store.dispatch('carPublic', {
					option
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		flex: 1;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #f2f2f2;
		overflow: hidden;

		.title {
			font-size: 24px;
			color: #666;
			padding-left: 24px;
			line-height: 40px;
			height: 40px;
		}

		.picupload {
			padding-left: 24px;
			height: 86px;
			line-height: 86px;
			font-size: 26px;
			background-color: #fff;
			width: 100%;
			box-sizing: border-box;
			display: flex;

			.line {
				border-bottom: 2px solid #ebebeb;
				flex: 1;
				display: flex;
				width: 100%;

				.tl {
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

		.baseinfo {
			.cardetail {
				line-height: 40px;
				font-size: 26px;
				padding: 10px 24px;
				background-color: #fff;
				width: 100%;
				box-sizing: border-box;
				position: inherit;
			}
		}

		.priceinfo {
			margin-bottom: 70px;
		}

		.submit {
			padding: 0 60px;
			margin-bottom: 100px;
		}
	}
</style>
