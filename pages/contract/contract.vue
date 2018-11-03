<template>
	<view class="content">
		<p class="title">车辆信息</p>
		<div class="baseinfo">
			<cv-brand :defaultData="{brand: this.brand, brandId: this.formData.brandId, typeId: this.formData.typeId}" ref="brand" @choiceBrand="choiceBrand" @getBrandshow="getBrandshow"></cv-brand>
			<cv-list :defaultData="formData.color" ref="color" name="车身颜色" type="color" @listChange="listChange"></cv-list>
			<cv-input ref="vin" name="车架号" unit="" type="vin" @inputChange="listChange" placeholder="车架号，非必填"></cv-input>
			<cv-input ref="engineNo" name="发动机号" unit="" type="engineNo" @inputChange="listChange" placeholder="发动机号，非必填"></cv-input>
			<cv-input :defaultData="formData.mileage" ref="mileage" name="公里数" unit="万公里" type="mileage" @inputChange="listChange"></cv-input>
			<cv-date :defaultData="formData.spsj" ref="spsj" name="上牌日期" type="spsj" @listChange="listChange"></cv-date>
			<cv-date :defaultData="formData.ccsj" ref="ccsj" name="出厂日期" type="ccsj" @listChange="listChange"></cv-date>
			<cv-input ref="belongArea" name="初次登记地" type="belongArea" @inputChange="listChange" placeholder="初次登记地，非必选"></cv-input>
			<!-- <cv-area ref="belongArea" name="初次登记地" type="belongArea" @listChange="listChange" placeholder="初次登记地，非必选"></cv-area> -->
			<cv-radio ref="carNature" name="使用性质" type="carNature" @radioChange="listChange" :list="[{key: '非营运', val: '非营运', checked: true},{key: '营运', val: '营运'},{key: '租赁', val: '租赁'}]"></cv-radio>
			<cv-input ref="ghNum" name="过户次数" unit="次" type="ghNum" @inputChange="listChange"></cv-input>
			<cv-radio ref="instructions" name="说明书" type="instructions" @radioChange="listChange" :list="[{key: 0, val: '无', checked: true},{key: 1, val: '有'}]"></cv-radio>
			<cv-radio ref="bysc" name="保养手册" type="bysc" @radioChange="listChange" :list="[{key: 0, val: '无', checked: true},{key: 1, val: '有'}]"></cv-radio>
			<cv-input ref="keyNum" name="钥匙数" unit="把" type="keyNum" @inputChange="listChange"></cv-input>
			<cv-input ref="cjPrice" name="成交价" unit="万元" type="cjPrice" @inputChange="listChange"></cv-input>
			<cv-radio ref="freight" name="包含运费" type="freight" @radioChange="listChange" :list="[{key: 0, val: '否', checked: true},{key: 1, val: '是'}]"></cv-radio>
			<cv-radio ref="lmGuarantee" name="联盟担保" type="lmGuarantee" @radioChange="listChange" :list="[{key: 0, val: '否', checked: true},{key: 1, val: '是'}]"></cv-radio>
			<textarea class="cardetail" v-model="formData.desc" placeholder="请输入车况描述" placeholder-style="color: #999;line-height: 40px"
			 name="" id=""></textarea>
		</div>
		<p class="title">收款人信息</p>
		<div class="baseinfo">
			<cv-input ref="name" name="开户名" unit="" type="name" @inputChange="listChange"></cv-input>
			<cv-input ref="card" name="账号" unit="" type="card" @inputChange="listChange"></cv-input>
			<cv-input ref="bank" name="开户行" unit="" type="bank" @inputChange="listChange"></cv-input>
		</div>
		<p class="title">卖方信息</p>
		<div class="baseinfo">
			<cv-input ref="seller" name="卖方姓名" type="seller" unit="" :defaultData="userinfo.name" :readonly="true" @inputChange="listChange"></cv-input>
			<cv-input ref="sellerIdCard" name="身份证号" type="sellerIdCard" unit="" :defaultData="userinfo.idCardNo" :readonly="true"
			 @inputChange="listChange"></cv-input>
			<cv-input ref="sellerPhone" name="手机号码" type="sellerPhone" unit="" :defaultData="userinfo.phone" :readonly="true"
			 @inputChange="listChange"></cv-input>
		</div>
		<p class="title">买方信息</p>
		<div class="buyinfo">
			<div class="buyline" v-for="(buyer, index) in buyers" :key="index">
				<span class="close">
					<icon type="cancel" @click="cancelBuyer(buyer.id)"></icon>
				</span>
				<div class="info">
					<p class="name">{{buyer.name}}</p>
					<p class="other">身份证 {{buyer.idCardNo}}</p>
					<p class="other">手机号 {{buyer.phone}}</p>
				</div>
			</div>
			<div class="addbuy" v-show="buyers.length < 4" @click="sellConfirm = !sellConfirm">
				<p>新增买方</p>
			</div>
			<div v-show="sellConfirm">
				<contract-firm :buyersList="buyersid" @cancelConfirm="cancelConfirm" @selectBuyer="selectBuyer"></contract-firm>
			</div>
		</div>
		<p class="title">交易条约</p>
		<p class="notice">卖方确认：未隐瞒任何事故（无结构件事故），非浸水车，来源合法，权利无争议，车辆档案资料及购车发票信息真实，可正常办理迁档、过户、入户手续。否则，买方有权退车，卖方应在买方提出退车当日退回全部车款给买方。逾期退款的，除每日按转让价的千分之二向买方支付违约金，卖方还应承担买方为此发生的律师费、差旅费、鉴定费、担保费等支出。</p>
		<div class="submit">
			<button type="warn" @click="toSubmit">发布</button>
		</div>
		<page-nav :nav="2"></page-nav>
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
				carid: '',
				sellConfirm: false,
				resetArr: [
					'brand',
					'color',
					'vin',
					'engineNo',
					'mileage',
					'spsj',
					'ccsj',
					'belongArea',
					'ghNum',
					'keyNum',
					'cjPrice',
					'name',
					'card',
					'bank',
				],
				buyers: [],
				buyersid: [],
				brand: '',
				formData: {
					brandId: '',
					typeId: '',
					vin: '',
					engineNo: '',
					ghNum: '',
					color: '',
					keyNum: '',
					cjPrice: '',
					name: '',
					card: '',
					bank: '',
					seller: '',
					sellerIdCard: '',
					sellerPhone: '',
					belongArea: '',
					// carType: '',
					// outType: '',
					mileage: '',
					// auto: '',
					spsj: '',
					ccsj: '',
					desc: '',
					carNature: '非营运',
					instructions: 0,
					bysc: 0,
					freight: 0,
					lmGuarantee: 0
				}
			}
		},
		onLoad(e) {
			console.log(e.carid);
			let carid = e.carid;
			if (carid)
				// 根据id获取车辆信息
				this.$store.dispatch('getContractCardetail', carid);
		},
		onReady() {
			this.formData.seller = this.userinfo.name;
			this.formData.sellerIdCard = this.userinfo.idCardNo;
			this.formData.sellerPhone = this.userinfo.phone;
		},
		onUnload() {
			/**
			 * 页面tab切换，重置子组件状态
			 */
			this.resetArr.forEach(v => {
				this.$refs[v].compReset();
			});

			this.brand = '';
			this.buyers = [];
			this.buyersid = [],
			this.formData = {
				brandId: '',
				typeId: '',
				vin: '',
				engineNo: '',
				ghNum: '',
				color: '',
				keyNum: '',
				cjPrice: '',
				name: '',
				card: '',
				bank: '',
				seller: '',
				sellerIdCard: '',
				sellerPhone: '',
				belongArea: '',
				// carType: '',
				// outType: '',
				mileage: '',
				// auto: '',
				spsj: '',
				ccsj: '',
				desc: '',
				carNature: '非营运',
				instructions: 0,
				bysc: 0,
				freight: 0,
				lmGuarantee: 0
			}
			this.SETSTATE({
				k: 'contractcardetail',
				v: '{}'
			});

		},
		computed: {
			...mapState(['userinfo', 'contractcardetail']),
			contractinfo() {
				return JSON.parse(this.contractcardetail);
			}
		},
		watch: {
			contractcardetail(n, o) {
				let obj = JSON.parse(n);
				if (obj.hasOwnProperty('title')) {
					this.brand = obj.title.replace(obj.spsj, '').trim();
					this.formData = {
						brandId: obj.brandId,
						typeId: obj.typeId,
						// 						vin: '',
						// 						engineNo: '',
						// 						ghNum: '',
						color: obj.color,
						// 						keyNum: '',
						// 						cjPrice: '',
						// 						name: '',
						// 						card: '',
						// 						bank: '',
						// 						seller: '',
						// 						sellerIdCard: '',
						// 						sellerPhone: '',
						// 						belongArea: '',
						mileage: obj.mileage,
						spsj: obj.spsj.replace('月', '').replace('年', '-'),
						ccsj: obj.ccsj.replace('月', '').replace('年', '-'),
						desc: obj.desc
					}
				}
			},
		},
		methods: {
			...mapMutations(['SETSTATE']),
			cancelBuyer(id) {
				this.buyers = this.buyers.filter(v => v.id != id);
				this.buyersid = this.buyersid.filter(v => v != id);
			},
			selectBuyer(name, phone, idCardNo, id) {
				let obj = {
					name,
					phone,
					idCardNo,
					id
				};
				this.buyers.push(obj);
				this.buyersid.push(id);
			},
			cancelConfirm() {
				this.sellConfirm = false;
			},
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
				typeId
			}) {
				console.log(brandId, typeId);
				this.brand = title;
				this.formData['brandId'] = brandId;
				this.formData['typeId'] = typeId;
			},
			conditionCheck() {
				if (!this.formData.typeId) return [false, '请选择完整的车辆品牌型号'];
				if (!this.formData.color) return [false, '请选择车身颜色'];
				if (!this.formData.mileage) return [false, '请输入公里数'];
				// if(!this.formData.carType) return [false, '请选择车型'];
				if (!this.formData.spsj) return [false, '请选择上牌日期'];
				if (!this.formData.ccsj) return [false, '请选择出厂日期'];
				if (!this.formData.ghNum) return [false, '请输入过户次数'];
				if (!this.formData.keyNum) return [false, '请输入钥匙数'];
				if (!this.formData.cjPrice) return [false, '请输入成交价'];
				if (!this.formData.name) return [false, '请输入开户名'];
				if (!this.formData.card) return [false, '请输入账号'];
				if (!this.formData.bank) return [false, '请输入开户行'];
				if (this.buyersid.length == 0) return [false, '请添加至少一个买方'];

				return [true];
			},
			toSubmit() {
				console.log(this.formData);
				let check = this.conditionCheck();
				if (!check[0]) {
					wx.showToast({
						title: check[1],
						icon: 'none'
					})
					return;
				}

				this.formData.spsj = this.formData.spsj.replace('-', '年') + '月';
				this.formData.ccsj = this.formData.ccsj.replace('-', '年') + '月';
				let option = {
					buyers: this.buyersid.join(','),
					...this.formData
				};
				this.$store.dispatch('toContract', {
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
			height: 100px;
			background-color: #fff;
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

		.buyinfo {
			background-color: #fff;

			.buyline {
				margin-left: 24px;
				display: flex;
				height: 150px;

				.close {
					flex-basis: 80px;
					flex-shrink: 0;
					height: 150px;
					display: flex;
					align-items: center;
					justify-content: center;

					icon {
						// 						width: 29px;
						// 						height: 29px;
					}
				}

				.info {
					flex-grow: 1;
					display: flex;
					justify-content: center;
					flex-direction: column;

					.name {
						font-size: 28px;
						line-height: 44px;
					}

					.other {
						color: #666;
						font-size: 24px;
						line-height: 37px;
					}
				}
			}

			.addbuy {
				height: 90px;
				background-color: #f4f8ff;
				padding-left: 104px;

				p {
					padding-left: 42px;
					font-size: 26px;
					color: #5072b8;
					background: left center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQyNTIzMjY1Q0QyNDExRTg4RDNDRUNBQTUwNUQyMURCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQyNTIzMjY2Q0QyNDExRTg4RDNDRUNBQTUwNUQyMURCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDI1MjMyNjNDRDI0MTFFODhEM0NFQ0FBNTA1RDIxREIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDI1MjMyNjRDRDI0MTFFODhEM0NFQ0FBNTA1RDIxREIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz78GxIgAAAFhElEQVR42tRbaWwVVRi9j81SbRGsFTH+cCGtEoyguCBplaDFYILFGI0CMeIaUVRijDGCYqJGKaI2gGiMgCuCSNSmdQkuEIsQUXGhKFJBrVUiUBAQi/V8mWPycv3mvel7c2fmneSEvm+m83ru8m13SHV1dZna6U3GIUrBKnAk/z0a7Mtr+8A2cBXYDH4AHuzuF6yoqwl8by+HQk8Cp4KTwQEZ7qsAz+fPP4PPg0+Cv7n4o3o4eKYM4uNgC3h7FrE2jgPvBb8D7y8EwUPBryi0Z57bYCa4BhwY9myEhTHgO2DK5/oh8BuwFdxB2zHgCeApPr8j+34j9/63SRJ8Hviuz7XN4NPgUvCnDPv9avAGLut0lIHrwUpwexKWdBm9rIaZdEpzMogVbAFngYPBJ5TrxVzeidjDDWBvy7YHHE0R3cF+7v8rlWvHgy/GLfhycIRiPyvDrAfBq/QJNq4CT4tTcL3PIGwKYeW8zxBlY15cgmvBcsu2HFwWoud/CNygOMiKOATfqNhudZArTFNsN0ctWJKKsy3bSubFYeNjJQZXRy14FHikZXvDYV7+mvVZYvLhUQoeothaHAq2n10Enhml4H6Krd2h4DafQiMywSmfXNkVOnyyr8gE71dsfR0K7qPYOqMUrI14uUPBg8LaQrkK/kKxVToUfKr1+W9wbZSC1yuOZIJDwXYxIXH5j6gzrWbrcw0rmrAxUpnhj+JILRcotqccCNaeOT8OwdLO2WrZxvvUsrniHnC4ZVttvFZRLOXhVMX2srIEc8GFrJZs3BJnPdzAEbfxKXhRHs+dxBWkDeaXcQoWjAP3WjZJ7OU444Fufkc/FviLlWut7HiYuAVLEnKBz7UZxmuq35XFg5/M5fu9T63bQW+dN8Jq00pclqZdo5IGngg+Cj4Cfs2Z2sXB7m+8TuXgDM/ezme3JUmwQJp2JczCKn1W01AyKD4Ja2ZdCJ7AEFIc4jMHcKmvpoNMhOCbGJ6GOEg6KhiLBeuYhCyJy2mN4R8xvxtipaTbCf5Cyl4Oeh48gt77Q/CcKGdY6t6F4MQs9+1lRfM2PfWPxjtE2w3+xSbCYQxhg+jFZUYvMV4j36++ruLeljPkaa4FiwN5JUuIaeJMNAaoaGTG/zTe4ffn4JvgbNbW4zmoVT6/e5vxetRyCNfiYklPMd6Blp/Y58AzwLHgS7mWb4QMwDPGa8dKSFrqc59838ba6U0Xhy34bvDZDDM6nAPymQPHJeHuCopvVq7LQV4DRE8KS/B9TBo03MEZ3WDcQ2rgc8EHfa4vhujL8hUsTkE78hQHdDo410SPGVzmu5VrdfkIHusjSNLDYUbva0WFVdxGdrq5K1fBx4JvKfY1FLvTxI8f+Le8xzAnR7TX5RqWJHbab+FIl2GUSRba2SgoX1FXE+i9Lm2Gr+XIaQE/kQgqVpCyXj0s5nK1Szw51V9mkgs5yXyYmVo9BuD1oDM8WxG7JOFiBStZxEgjYjkmcHQQwQOVboPkw9cnXGwfxud0VAcRrL3CMIseMMkQ57rHsh3MJljSM/v9DNnLj5nkowv8x7IdyiZY1v5R1rV6Uxg4oAhszxaHJyvX5iRQXIplY0mayN5KW6kGjusA709xFWyB916buvTOxhRTslIrUa9OmNgSdjuG5dOOkiVdaYk1Rm+Ex40peYoVzO3B1MzGugQK3hHCMzpEsP36j7RcNidQ8AvgIuOd/ucC+f8UE8Vp2a//bKXnSyKuMV7b9gg6LXFGRazi+qfdJ+F0HqPQf05rG5xWpwgusx66LeFhSDtysWe9FeJa/eKw/ZLZJlNYKFJqgtJMiUeRZdtXYIJTSl3fK5PgEmXECgmdyirtmUnwAibfwt/N/99cTTpk/y5M0/Cr9AT8bv5XgAEAVqYmaZMZdkUAAAAASUVORK5CYII=);
					background-size: 30px auto;
					line-height: 90px;
				}
			}
		}

		.notice {
			background-color: #fff;
			margin-bottom: 70px;
			line-height: 37px;
			font-size: 22px;
			padding: 16px 24px 20px;
			text-align: justify;
		}

		.submit {
			padding: 0 60px;
			margin-bottom: 200px;
		}
	}
</style>
