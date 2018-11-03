<template>
	<view>
		<div class="filtrate">
			<div class="filbox">
				<div class="fline">
					<p class="title">车龄</p>
					<!-- <div class="sliderline">
						<slider value="0" activeColor="#e9e9e9" backgroundColor="#1aad19"></slider>
						<slider value="100"></slider>
					</div> -->
					<div class="list">
						<ul>
							<li>
								<span :class="{on: selectIndex.spdate === -1}" @click="selectFiltra('spdate', -1, '', '')">不限</span>
							</li>
							<li v-for="(age,index) in agelist" :key="index">
								<span :class="{on: selectIndex.spdate === index}" @click="selectFiltra('spdate', index, age.key, age.name)">{{age.name}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="fline">
					<p class="title">里程</p>
					<div class="list">
						<ul>
							<li>
								<span :class="{on: selectIndex.leage === -1}" @click="selectFiltra('leage', -1, '')">不限</span>
							</li>
							<li v-for="(leage,index) in leagelist" :key="index">
								<span :class="{on: selectIndex.leage === index}" @click="selectFiltra('leage', index, leage.key, leage.name)">{{leage.name}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="fline">
					<p class="title">排放</p>
					<div class="list">
						<ul>
							<li>
								<span :class="{on: selectIndex.outtype === -1}" @click="selectFiltra('outtype', -1, '')">不限</span>
							</li>
							<li v-for="(out,index) in outlist" :key="index">
								<span :class="{on: selectIndex.outtype === index}" @click="selectFiltra('outtype', index, out.key, out.name)">{{out.name}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="fline">
					<p class="title">档位</p>
					<div class="list">
						<ul>
							<li>
								<span :class="{on: selectIndex.gear === -1}" @click="selectFiltra('gear', -1, '')">不限</span>
							</li>
							<li v-for="(gear,index) in gearlist" :key="index">
								<span :class="{on: selectIndex.gear === index}" @click="selectFiltra('gear', index, gear.key, gear.name)">{{gear.name}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="fline">
					<p class="title">颜色</p>
					<div class="list">
						<ul>
							<li>
								<span :class="{on: selectIndex.color === -1}" @click="selectFiltra('color', -1, '')">不限</span>
							</li>
							<li v-for="(color,index) in colorlist" :key="index">
								<span :class="{on: selectIndex.color === index}" @click="selectFiltra('color', index, color.key, color.name)">{{color.name}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="filbutton">
				<p class="reset" @click="toCancel">取消</p>
				<p class="select" @click="toFiltra">确定</p>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carage: '不限',
				agelist: [{
						name: '1年以内',
						key: '0-1'
					},
					{
						name: '2年以内',
						key: '0-2'
					},
					{
						name: '3年以内',
						key: '0-3'
					},
					{
						name: '4年以内',
						key: '0-4'
					},
					{
						name: '5年以内',
						key: '0-5'
					},
					{
						name: '1-3年',
						key: '1-3'
					},
					{
						name: '3-5年',
						key: '3-5'
					},
					{
						name: '5-10年',
						key: '5-10'
					}
				],
				leagelist: [{
						name: '0-1万公里',
						key: '0-1'
					},
					{
						name: '1-2万公里',
						key: '1-2'
					},
					{
						name: '2-3万公里',
						key: '2-3'
					},
					{
						name: '3-5万公里',
						key: '3-5'
					},
					{
						name: '5-10万公里',
						key: '5-10'
					},
					{
						name: '10万公里以上',
						key: '10-1000'
					}
				],
				outlist: [{
						name: '国I',
						key: '国I'
					},
					{
						name: '国II',
						key: '国II'
					},
					{
						name: '国III',
						key: '国III'
					},
					{
						name: '国IV',
						key: '国IV'
					},
					{
						name: '国V',
						key: '国V'
					},
					{
						name: '国VI',
						key: '国VI'
					}
				],
				gearlist: [{
						name: '手动挡',
						key: '手动挡'
					},
					{
						name: '自动挡',
						key: '自动挡'
					},
					{
						name: '手自一体',
						key: '手自一体'
					}
				],
				colorlist: [{
						key: '银灰色',
						name: '银灰色'
					},
					{
						key: '深灰色',
						name: '深灰色'
					},
					{
						key: '黑色',
						name: '黑色'
					},
					{
						key: '白色',
						name: '白色'
					},
					{
						key: '红色',
						name: '红色'
					},
					{
						key: '蓝色',
						name: '蓝色'
					},
					{
						key: '咖啡色',
						name: '咖啡色'
					},
					{
						key: '香槟色',
						name: '香槟色'
					},
					{
						key: '黄色',
						name: '黄色'
					},
					{
						key: '紫色',
						name: '紫色'
					},
					{
						key: '绿色',
						name: '绿色'
					},
					{
						key: '橙色',
						name: '橙色'
					},
					{
						key: '粉红色',
						name: '粉红色'
					},
					{
						key: '棕色',
						name: '棕色'
					},
					{
						key: '冰川白',
						name: '冰川白'
					},
					{
						key: '银色',
						name: '银色'
					},
					{
						key: '金色',
						name: '金色'
					},
					{
						key: '其他',
						name: '其他'
					}
				],
				selectOptionName: {
					spdate: '',
					leage: '',
					outtype: '',
					gear: '',
					color: ''
				},
				selectOption: {
					spdate: '',
					leage: '',
					outtype: '',
					gear: '',
					color: ''
				},
				selectIndex: {
					spdate: -1,
					leage: -1,
					outtype: -1,
					gear: -1,
					color: -1
				},
				useData: {
					spsjStartDt: '',
					spsjEndDt: '',
					minMileage: '',
					maxMileage: '',
					color: '',
					gear: '',
					outType: ''
				}
			}
		},
		methods: {
			resetCondition(k) {
				if(k == 'all'){
					for(let i in this.selectIndex){
						this.selectIndex[i] = -1;
					}
					for(let i in this.selectOptionName){
						this.selectOptionName[i] = '';
					}
					for(let i in this.selectOption){
						this.selectOption[i] = '';
					}
					return;
				}
				this.selectIndex[k] = -1;
				this.selectOptionName[k] = '';
				this.selectOption[k] = '';
			},
			selectFiltra(k, idx, vl, name) {
				this.selectIndex[k] = idx;
				this.selectOptionName[k] = name;
				switch (k) {
					case 'spdate':
						let st = new Date().getFullYear() - vl.split('-')[1];
						let ed = new Date().getFullYear() - vl.split('-')[0];
						this.selectOption['spdate'] = vl? st + '-' + ed : '';
						break;
					case 'leage':
					case 'outtype':
					case 'gear':
					case 'color':
						this.selectOption[k] = vl;
						break;
					
				}
				
				this.conditionPack();
			},
			conditionPack() {
				// 上牌日期
				this.useData.spsjStartDt = this.selectOption['spdate'] ? this.selectOption['spdate'].split('-')[0] : '';
				this.useData.spsjEndDt = this.selectOption['spdate'] ? this.selectOption['spdate'].split('-')[1] : '';
				// 里程
				this.useData.minMileage = this.selectOption['leage'] ? this.selectOption['leage'].split('-')[0] : '';
				this.useData.maxMileage = this.selectOption['leage'] ? this.selectOption['leage'].split('-')[1] : '';
				// 排放
				this.useData.outType = this.selectOption['outtype'];
				// 档位
				this.useData.gear = this.selectOption['gear'];
				// 颜色
				this.useData.color = this.selectOption['color'];
				
				console.log(this.useData);
			},
			toCancel() {
				this.$emit('cancelFiltrate');
			},
			toFiltra() {
				this.$emit('toFiltra', this.useData, this.selectOptionName);
				this.$emit('cancelFiltrate');
			}
		}
	}
</script>

<style lang="less" scoped>
	.filtrate {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 99;
		background-color: #fff;
		box-sizing: border-box;
		// padding-top: 60px;
		display: flex;
		flex-direction: column;

		.filbox {
			flex-grow: 1;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
		}

		.filbutton {
			flex-basis: 100px;
			flex-shrink: 0;
			display: flex;

			p {
				flex: 1;
				text-align: center;
				line-height: 100px;
				font-size: 32px;
				color: #fff;
				background-color: #f44446;
				text-align: center;

				&.reset {
					background-color: #fff;
					border-top: 1px solid #ebebeb;
					box-sizing: border-box;
					color: #333;
				}
			}
		}

		.fline {
			margin-bottom: 40px;

			.title {
				padding: 0 30px;
				font-size: 32px;
				line-height: 40px;
				margin-bottom: 30px;
			}

			.list {
				padding: 0 15px;

				ul {
					overflow: hidden;

					li {
						float: left;
						width: 33.33%;
						padding: 0 15px 0 15px;
						margin-bottom: 15px;
						box-sizing: border-box;

						span {
							border: 1px solid #dedede;
							border-radius: 4px;
							line-height: 70px;
							text-align: center;
							font-size: 26px;
							color: #333;
							box-sizing: border-box;
							display: block;
							overflow: hidden;
							height: 70px;
							text-overflow: ellipsis;
							white-space: nowrap;

							&.on {
								color: #F44446;
								border-color: #F44446;
								background-color: #fff1f1;
							}
						}
					}
				}
			}

			.sliderline {
				display: flex;
				padding: 0 60px;

				slider {
					flex: 1;
					margin-left: 0;
					margin-right: 0;
				}
			}
		}
	}
</style>
