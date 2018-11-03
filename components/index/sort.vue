<template>
	<view class="sort" id="Sort">
		<view class="sortline">
			<div class="filter" @click.stop="toShowHide('filtershow')">
				<p>{{filterval}}</p>
			</div>
			<div class="sort" @click.stop="toShowHide('brandshow')">
				<p>{{showoption.brand == '不限'? '品牌' : showoption.brand}}</p>
			</div>
			<div class="sort" @click.stop="toShowHide('carTypeshow')">
				<p>{{showoption.carType == '不限'? '车型' : showoption.carType}}</p>
			</div>
			<div class="sort" @click.stop="toShowHide('priceshow')">
				<p>{{showoption.price == '不限'? '价格' : showoption.price}}</p>
			</div>
			<div class="sortbox" @click.stop="toShowHide('filtrateshow')">
				<p>筛选</p> 
			</div>
			<div class="filterlist" v-show="allshow.filtershow">
				<p v-for="item in filterlist" :key="item.key" @click="toFilter(item.key)" :class="{on: filterkey == item.key}">{{item.val}}</p>
			</div>
			<div class="cartypelist" v-show="allshow.carTypeshow">
				<p v-for="item in carTypelist" :key="item" @click="toCarTypeSort(item)" :class="{on: showoption.carType == item}">{{item}}</p>
			</div> 
			<div class="pricelist" v-show="allshow.priceshow">
				<p v-for="item in pricelist" :key="item.key" @click="toPriceSort(item.key, item.val)" :class="{on: showoption.price == item.val}">{{item.val}}</p>
			</div>
			<!-- <div class="shadow" @click="hideAll" v-show="shadow"></div> -->
			<div v-show="allshow.brandshow">
				<brand-type @selectBrand="selectBrand" @cancelBrand="cancelBrand"></brand-type>
			</div>
			<div v-show="allshow.filtrateshow">
				<filtrate-box ref="filtratebox" @cancelFiltrate="cancelFiltrate" @toFiltra="toFiltra"></filtrate-box>
			</div>
		</view>
		<view class="conditionline">
			<div class="cond">
				<scroll-view scroll-x class="condition">
					<p v-for="item in keyoption" :key="item.key"><span>{{item.val}} <i class="close" @click="delCondition(item.key)"></i></span></p>
				</scroll-view>
			</div>
			<p class="reset" @click="resetCondtion">重置</p>
		</view>
	</view>
	
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				shadow: false,
				filterkey: "",
				filterval: "默认排序",
				pricelist: [
					{key: "", val:"不限"},
					{key: "0-3", val:"3万以下"},
                    {key: "3-5", val:"3-5万"},
                    {key: "5-8", val:"5-8万"},
                    {key: "8-10", val:"8-10万"},
                    {key: "10-15", val:"10-15万"},
                    {key: "15-20", val:"15-20万"},
                    {key: "20-30", val:"20-30万"},
                    {key: "30-50", val:"30-50万"},
                    {key: "50-9999", val:"50万以上"}],
				allshow: {
					filtershow: false,
					carTypeshow: false,
					priceshow: false,
					brandshow: false,
					filtrateshow: false
				},
				carTypelist: ['不限', '轿车','SUV','跑车','商务车','面包车','客车','货车','皮卡','摩托车','工程车'],
				filterlist: [{
					key: '',
					val: '默认排序'
				},{
					key: 'spsjOrder_false',
					val: '车龄从高到低'
				},{
					key: 'spsjOrder_true',
					val: '车龄从低到高'
				},{
					key: 'priceOrder_false',
					val: '价格从高到低'
				},{
					key: 'priceOrder_true',
					val: '价格从低到高'
				},{
					key: 'mileageOrder_false',
					val: '里程从高到低'
				},{
					key: 'mileageOrder_true',
					val: '里程从低到高'
				}],
				// 显示条件列表 
				showoption: {
					price: '不限',
					carType: '不限',
					brand: '不限'
				},
				// 已选条件列表
				keyoption: [],
				// 求值组合条件
				importoption: {
					carType: '',
					price: '',
					brandId: '',
					typeId: ''
				},
				option: {
					carType: '',
					ztPriceMin: '',
					ztPriceMax: '',
					brandId: '',
					typeId: '',
					priceOrder: '',
					spsjOrder: '',
					ctOrder: '',
					mileageOrder: ''
				},
				filtraoption: {}
			}
		},
		mounted() {
// 			wx.createSelectorQuery().select('#Sort').boundingClientRect(function(res){
// 				  console.log(res);
// 			}).exec() 
		}, 
		methods: {
			resetAllSort(){
				this.keyoption = [];
				for(let i in this.importoption){
					this.importoption[i] = '';
				}
				for(let i in this.showoption){
					this.showoption[i] = '不限';
				}
				for(let i in this.allshow){
					this.allshow[i] = false;
				}
				// 重置筛选选项
				this.filtraoption = {};
				this.$refs.filtratebox.resetCondition('all');
			},
			toFiltra(option, selectname) {
				this.filtraoption = option;
				
				for(let i in selectname) {
					if(selectname[i])
						this.keyoption.push({key: i, val: selectname[i]});
				}
				
				this.toSortFilter();
			},
			cancelFiltrate() {
				this.allshow.filtrateshow = false;
			},
			cancelBrand() {
				this.allshow.brandshow = false;
			},
			selectBrand({title, brandid, typeid}) {
				this.allshow.brandshow = false;
				this.showoption.brand = title;
				this.importoption.brandId = brandid;
				this.importoption.typeId = typeid;
				
				// 已选条件存储
				this.keyoption = this.keyoption.filter(v => v.key != 'brand')
				if(title != '不限')
					this.keyoption.push({key: 'brand', val: title});
				
				this.toSortFilter();
			},
			toShowHide(k) {
				// this.shadow = false;
				
				for(let i in this.allshow){
					if(i != k) 
						this.allshow[i] = false;
				}
				this.allshow[k] = !this.allshow[k];
				
				for(let i in this.allshow){
					if(this.allshow[i]){
						this.shadow = true;
					}
				}
				
				wx.pageScrollTo({
					scrollTop: 45
				})
			},
			hideAll() {
				for(let i in this.allshow){
					this.allshow[i] = false;
				}
				this.shadow = false;
			},
			toHide(k) {
				this.allshow[k] = false;
			},
			resetCondtion() {
				this.resetAllSort();
				
				this.toSortFilter();
			},
			delCondition(key) {
				this.keyoption = this.keyoption.filter(v => v.key != key)
				switch(key) {
					case 'carType':
					case 'price':
						this.importoption[key] = '';
						this.showoption[key] = '不限';
						break;
					case 'brand':
						this.importoption['brandId'] = '';
						this.importoption['typeId'] = '';
						this.showoption['brand'] = '不限';
						break;
					case 'spdate':
						this.filtraoption['spsjStartDt'] = '';
						this.filtraoption['spsjEndDt'] = '';
						this.$refs.filtratebox.resetCondition(key);
						break;
					case 'leage':
						this.filtraoption['minMileage'] = '';
						this.filtraoption['maxMileage'] = '';
						this.$refs.filtratebox.resetCondition(key);
						break;
					case 'outtype':
						this.filtraoption['outType'] = '';
						this.$refs.filtratebox.resetCondition(key);
						break;
					case 'gear':
					case 'color':
						this.filtraoption[key] = '';
						this.$refs.filtratebox.resetCondition(key);
					break;
				}
				
				this.toSortFilter();
			},
			toFilter(key) {
				this.filterkey = key;
				this.allshow.filtershow = false;
				// this.shadow = false;
				
				if(!key){
					this.option['priceOrder'] = '';
					this.option['spsjOrder'] = '';
					this.option['ctOrder'] = '';
					this.option['mileageOrder'] = '';
				} else {
					this.option[key.split('_')[0]] = key.split('_')[1];
				}
				this.filterval = this.filterlist.find(v => v.key == key).val;
				
				this.toSortFilter();
			},
			toCarTypeSort(val) {
				this.allshow.carTypeshow = false;
				// this.shadow = false;
				this.showoption.carType = val;
				this.importoption.carType = val != '不限'? val: '';
				
				// 已选条件存储
				this.keyoption = this.keyoption.filter(v => v.key != 'carType')
				if(val != '不限')
					this.keyoption.push({key: 'carType', val: val})
				
				this.toSortFilter();
			},
			toPriceSort(key, val) {
				this.allshow.priceshow = false;
				// this.shadow = false;
				this.showoption.price = val;
				this.importoption.price = key;
				
				// 已选条件存储
				this.keyoption = this.keyoption.filter(v => v.key != 'price')
				if(key)
					this.keyoption.push({key: 'price', val: val})
				
				this.toSortFilter();
			},
			toSortFilter() {
				console.log(this.importoption);
				this.option.carType = !this.importoption.carType? '': this.importoption.carType;
				this.option.ztPriceMin = !this.importoption.price? '':this.importoption.price.split('-')[0];
				this.option.ztPriceMax= !this.importoption.price? '':this.importoption.price.split('-')[1];
				this.option.brandId = !this.importoption.brandId? '' :this.importoption.brandId;
				this.option.typeId = !this.importoption.typeId? '' :this.importoption.typeId;

				let op = {
					...this.option,
					...this.filtraoption
				}
				console.log(this.option);
				
				this.$emit('sortFilter', op);
			}
		}
	}
</script>
 
<style lang="less">
	.sortline{
		display: flex;
		background-color: #fff;
		border-bottom: 1px solid #b8bbb9;
		position: relative;
		z-index: 33;
		.sort{
			flex: 1;
			text-align: center;
			font-size: 26px;
			line-height: 84px;
			color: #333;
			width: 0;
			height: 84px;
			p{
				display: inline-block;
				position: relative;
				padding-right: 22px;
				height: 84px;
				padding-left: 10px;
				max-width: 100%;
				box-sizing: border-box;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				&:after{
					content: '';
					width: 0;
					height: 0;
					border: 10px solid transparent;
					border-top-color: #333;
					position: absolute;
					right: 0;
					top: 40px;
				}
			} 
		}
		.filter{
			color: #f44446;
			flex: 1;
			text-align: center;
			font-size: 26px;
			line-height: 84px;
			height: 84px;
			width: 0;
			p{
				height: 84px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding: 0 10px;
			}
		}
		.sortbox{
			flex: 1;
			text-align: center;
			font-size: 26px;
			line-height: 84px;
			color: #333;
			p{
				display: inline-block;
				position: relative;
				padding-right: 22px;
				background: right center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4RTY0RjlDQ0E0MTExRThBRDdFQkQxMEE4MDI0NDk0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4RTY0RjlEQ0E0MTExRThBRDdFQkQxMEE4MDI0NDk0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzhFNjRGOUFDQTQxMTFFOEFEN0VCRDEwQTgwMjQ0OTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzhFNjRGOUJDQTQxMTFFOEFEN0VCRDEwQTgwMjQ0OTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz67gvTTAAAD90lEQVR42uxXzUtUURS/c99z/GgcQhlFcCu0cFG4axdkNqblNow27YOwMhkIipDSitq07Q9oUSSmaMtK0qAWQURtxI8gXAyp44yOTr/f7Z24vJ72XqkUeOG8+3XuPb/zde99sZaWFpXL5RRKynGcbtQHQa7a4VIqlfJa65exWOzh7OysctFQoDToEeb3qV0qlItyDsr3lZWVnYg1NTUdqKys/LCxsSE8K6DCLmBJgjQBwTpfXCAaQEN5AxkAegCTFXbBNftRDYK6Ibsh1tzc/BWN1Pr6+ujq6moawFR5ebmyLLQTLlH5fF4Vi0VVVVVVgOJx1zJPnhMApDChXNcV5NsKgrS2tmYUpZwfIkpK4/OWg7BEF2KlKx6PG0ZYxzDL4u0AQCW5LwVTDuRdA5hy8mho3icLEL2PQR10D5kJSND/CSBZw/XchxZn24vJDFiueu2cxsQb0HlxAwaHQCdlI/8mYQDJvKy1lTHaa90LZW+wT/esrKx0OqlUiiabBIgCJo+SEfVp9F+DPotgghRiYUDTcjS3ZB37AoDEOdsy5APPFXjhppU97QAy7tTX1xsGLHqB8UUgbPPAnGH8gD7aVmBN68zPz5t1yWTSBDYFY0MzJ5a013kgLtsgYKl2VCME7NTV1f1MVTBPoMoBTKtlmSnQJ8usZvOZmRmVzWbN9YC4UoVCQS0tLRlQ7PvODO7V5wORhtxRWpGu037fAt0gtLpgBfAwhHf505iuYSGYubk55WWepGQQiH4LxDGCsGNNBwUagNwD9drZBAFpG4zdpgWCAtgDkfGBaAOIcT+/Dop6agXLDADMJRnDhs8w3hn2gJOYYHZYIDoAYiwItN4qBQHmNsBclD40ewowHWHAgC8DELd87hjeLPX1784DgLkDMD0yBjBDEHKKJ6QUZoqXeXJ0MyZuiGUA4niQO+zi2qYMYvRi5i5qDQ0HPUFPGhsbD0HwOw+ccWdFRQXjpQftfklfrG0F33N/EP/iRqavmFry3k/eJq94VoGOmMdEMvkeNFVdXW3mKRggYrhDxhm/oCUA6EI9tpUluJYWdc3Nh85WiK3CV9x1NuCaZRmkS6yDK4uqCv1RWGokzH2USCQiv00bbItuwlP06o0wyokhdvKR7EZJda3+kbIHZA/IfwPEjfggdqKsjbK3a19eYU5BeXvgKNfyhg3ag+M8ukMDifJHBwCTOAUnICAxPT09JEBqa2vN6SgHmNwfBBjWKi7P+Qj/q9+w8WEKWVhYMGP4STLPRr47PaFxKod7Ji5/i6GAyJM/dHR7j2f5PaipqVHLy8vihhIUSxAA5p1IMfIXf/PmscxnANuW9mfR7sAr//7i4mLo/b4LMAAt5GtWrPKyIQAAAABJRU5ErkJggg==) no-repeat;
				background-size: 18px auto;
			}
		}
		.shadow{
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .3);
			position: fixed;
			top: 85px;
			left: 0;
		}
		.filterlist, .cartypelist, .pricelist{
			position: absolute;
			top: 85px;
			width: 100%;
			left: 0;
			background-color: #fff;
			border-bottom: 1px solid #ebebeb;
			p{
				line-height: 84px;
				height: 84px;
				font-size: 26px;
				padding-left: 24px;
				border-top: 1px solid #ebebeb;
				&.on{
					color: #f44446;
				}
			}
		}
	}
	.conditionline{ 
		height: 96px;
		padding-left: 24px;
		display: flex;
		.cond{
			flex-grow: 1;
			overflow: hidden;
			.condition{
				// overflow-x: auto;
				// overflow-y: hidden;
				white-space: nowrap;
				display: inline-block;
				padding: 23px 0;
				height: 50px;
				// margin-left: 22px;
				margin-right: 15px;
				// -webkit-overflow-scrolling:touch;
				p{
					// float: left;
					display: inline-block;
					padding: 0 12px;
					background-color: #fff;
					height: 50px;
					border-radius: 4px;
					margin-right: 15px;
					span{
						padding-right: 28px;
						color: #666;
						font-size: 24px;
						line-height: 50px;
						height: 50px;
						display: block;
						position: relative;
						.close{
							background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4RTY0RkEwQ0E0MTExRThBRDdFQkQxMEE4MDI0NDk0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFEMzMxM0ZFQ0E0ODExRThBRDdFQkQxMEE4MDI0NDk0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzhFNjRGOUVDQTQxMTFFOEFEN0VCRDEwQTgwMjQ0OTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzhFNjRGOUZDQTQxMTFFOEFEN0VCRDEwQTgwMjQ0OTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7XrtjOAAACAklEQVR42qyWO0sDQRDHL6ugKPgZ7PwKEkk0iYKlIoKfIOIDE/HV2NhqRE2jCVY2IrGxFV8J0djY2NoIYquFiIVo/I9sYFlnztxj4J+9m9vbX2Znb3YjhUKh23GcLagdWkun07donWKx6AQxjOPocfrQrEIfUFbh5wQagYahGjrEnZAMYyXRVPXYo1Apggg/cdFq9e2HKgF5BDu3fG8U4RTTuayhfi3FwMhmFeZ6HxcrzMMrKOoDRik5Y/zzYB0oneB1NItMp2uPkab07NiWAWObLpSxqjYFKEU60ARsUIiMYPnGTaRer9sraw7NDvNiQsM5G4JOGf80YLumQzHfD/2bJeblSyFSCZa1YSxQQ3Mu0ESTMG6W/nx/puV0u2H5L6AeqEWCCSn5F+gGvaf8e4U1A5SgbX5gYg4F6IQuwLa9Q2PNwLwAye6gb8b/pZ85YQKpED9AncyzLuhRl7RQgEmhEHMFPx4UKMHGdU49Q5UPWAY6ho6E2usKVS47tQTLG/dSwS9jjBg3Nle8Y8Jub8NMWzC+V9OiKHE1MUIdmVdYI1Ku9t7YkSof0+hWHDhoxYT+TikcCV2UbaPzzp7HI4a0n8YwvVU6tUX1UcJvZF5y2ktTWgoZ5rZ6DwnYwZyugsDMM9Ky5W5XutI/Qy/QZON0FYZhLNrSZqBX6Imq048AAwCRt6KRIh/ENgAAAABJRU5ErkJggg==) no-repeat;
							// background-origin: center center;
							background-size: 16px 16px;
							background-origin: center center;
							width: 16px;
							height: 16px;
							display: block;
							position: absolute;
							right: 0;
							top: 18px;
						}
					}
				}
			}
		}
		.reset{
			display: block;
			line-height: 50px;
			height: 50px;
			font-size: 26px;
			color: #666;
			margin-top: 23px;
			flex-basis: 2em;
			flex-shrink: 0;
			padding-left: 29px;
			padding-right: 24px;
			position: relative;
			&:after{
				content: '';
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAlCAYAAAAqXEs9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFEMzMxNDAxQ0E0ODExRThBRDdFQkQxMEE4MDI0NDk0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFEMzMxNDAyQ0E0ODExRThBRDdFQkQxMEE4MDI0NDk0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUQzMzEzRkZDQTQ4MTFFOEFEN0VCRDEwQTgwMjQ0OTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUQzMzE0MDBDQTQ4MTFFOEFEN0VCRDEwQTgwMjQ0OTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7QEPA6AAADiklEQVR42sSYW0gVURSGx6MGgWUEURllRZnVQxld7Ao+REk3ErpQQVGa9JBWWKZBBSFqF6Oii2n0UCQoBWrZQ2ISKd2jq0GhUlFURBGFZeTpX/CPLMej50w2cxZ87D179sz+Z+3Zl7VDvF6vYbXU1FSjG+sLEsBsEAeiWRYOWsAH0AjugOrCwsL7hg0LsSFoGtgMFoJIG200gPPgBMR99VfZE8ALx4BKcAustoj5A96BR0A88QJ8sTw/FuSAJnxoRk89tBUUWG43g4ugigLeA/2S3mAYiAeLQZLl+XtgLbz13K6gs2CdKn4F9oASi4BOhsb0u4YjSQdbVJU26XrUuxpol12yiMkFMeCCPzE+xDUD8fRE/uhmu1UQm+TXQ6h0Bsl6VbQEVNgU0eU9vL8ISbIqmoX6dT49hMrJFjHxdsUEIDYFyWFVdA3tRnQShMIhSIpURRnetw0HDKK2qQ+VQVDmy0MnVf4QuGI4aBAlv8JnXs6HQxLaBeFiBpJFvCnDOMNwx5ar/Cntoe/6V3JaBRwwE0yHl2pweZPFMVLuofseI5kkrkO+0mExiRRRL6JUz4glh6k+fehSN/VT+XpOKzfAHDDXY7hs+HCZ6fNUUTkYzPxA1wVRVBaS/apoNNMWc5T1D4KoTC5JHdcyiDmN9C3SnCCIyraIahMPpXC2zIaovCCJOsjLSA83WKZlBslT25HsA6Uy7D+CKHU/mxNmlsuidpsz9UuW6X3ITpAfjBHo4V7Z3MXJnPCb1ztAWjAEVTMfyu1GnLof7bogrmNveL0X188Yd6Wz61z3kNhxpr0wyo4grQVHVfc5udiuMfdCWpBszlqZT3OrqyBEeuAcqEE+tl0QuumbZZiXuyBmvGWWbu2whYWoAgZ+YhNAsYNiZFN/Xc99aL/RV1yWqPIbwAEHxMhCfhcMYFEtxOT6DIMkqGO0YVoGI9Ww/yRG9u5PQKyKhud1G7lClEQbK1TRSiBx+IIeCAnlGlmnlik5FZmC9lp13a6+vJSnGBJSR3ADdZmxVDFPQwIRIrHeKrAJjFC3JKZPgpifdk8/5BTjGE8xtDVyhn9Kt38Cv3hUMxSMAlPZHeGW45tdENLlOunv33jNTfgyrm2TWT4SbLTRa15GxfnmaPpXQaaVEQlZlvLLowJ4rp4RcAmENAXSkN3RU0n68CBiHBjE0EYW5x8Mj6XxBxDRYHcA/BVgAGmtKG9q/bvuAAAAAElFTkSuQmCC) no-repeat;
				background-origin: center center;
				background-size: 20px auto;
				width: 20px;
				height: 20px;
				position: absolute;
				left: 0;
				top: 15px;
			}
		}
	}
</style>
