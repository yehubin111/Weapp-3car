<template>
	<view>
		<div class="brandlist">
			<div class="brand" v-if="brandshow">
				<div class="list"> 
					<div>
						<p class="bd" @click="brandToType('', '不限')">不限</p>
					</div>
					<div v-for="item in brandlist" :key="item.letter">
						<p class="letter">{{item.letter}}</p>
						<p class="bd" v-for="(g, idx) in item.list" :key="idx" @click="brandToType(g.id, g.title)">{{g.title}}</p>
					</div>
				</div> 
				<div class="button">
					<p class="cancel" @click="toCancel">取消</p>
				</div>
			</div>
			<div class="type" v-if="typeshow">
				<div class="list"> 
					<div> 
						<p class="bd" @click="selectType('', '')">不限</p>
					</div>
					<div v-for="(item, index) in typelist" :key="index">
						<p class="letter">{{item.name}}</p>
						<p class="bd" v-for="(g, idx) in item.list" :key="idx" @click="selectType(g.id, g.title)">{{g.title}}</p>
					</div>
				</div> 
				<div class="button">
					<p class="prev" @click="backToBrand">上一步</p>
					<p class="cancel" @click="toCancel">取消</p>
				</div>
			</div>
			<div class="type" v-if="threegrade && seriesshow">
				<div class="list"> 
					<div> 
						<p class="bd" @click="selectSeries('', '')">不限</p>
					</div>
					<div v-for="(item, index) in serieslist" :key="index">
						<p class="bd" @click="selectSeries(item.id, item.subject)">{{item.subject}}</p>
					</div>
				</div> 
				<div class="button">
					<p class="prev" @click="backToType">上一步</p>
					<p class="cancel" @click="toCancel">取消</p>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['thirdGrade'],
		data() {
			return {
				threegrade: this.thirdGrade? this.thirdGrade: false,
				brand: '',
				brandid: '',
				brandshow: true,
				type: '',
				typeid: '',
				typeshow: false,
				series: '',
				seriesid: '',
				seriesshow: false
			}
		},
		computed: {
			...mapState(['brandlist', 'typelist', 'serieslist'])
		},
		methods: {
			...mapMutations(['SETSTATE']),
			toCancel() {
				this.brandshow = true;
				this.typeshow = false;
				this.seriesshow = false;
				
				this.$emit('cancelBrand');
			},
			backToBrand() {
				this.brandshow = true;
				this.typeshow = false;
			},
			backToType() {
				this.typeshow = true;
				this.seriesshow = false;
			},
			brandToType(id, title) {
				if(!id){
					this.$emit('selectBrand', {title: '不限', brandid: '', typeid: '', seriesid: ''})
					return;
				}
				this.brandshow = false;
				this.brand = title;
				this.brandid = id;
				this.typeshow = true;
				
				this.SETSTATE({k: 'typelist', v: []});
				// 获取车系列表
				this.$store.dispatch('getTypelist', id);
			},
			selectType(id, title) {
				// if(不限 || 二级)
				if(!id || !this.threegrade){
					this.type = title;
					this.typeid = id;
					
					this.brandshow = true;
					this.typeshow = false;
					this.$emit('selectBrand', {title: this.brand + this.type, brandid: this.brandid, typeid: this.typeid, seriesid: ''})
				}else{
					this.type = title;
					this.typeid = id;
					
					this.seriesshow = true;
					this.typeshow = false;
					this.SETSTATE({k: 'serieslist', v: []});
					// 获取三级列表
					this.$store.dispatch('getSerieslist', id);
				}
			},
			selectSeries(id, title) {
				this.series = title;
				this.seriesid = id;
					
				this.brandshow = true;
				this.seriesshow = false;
				this.$emit('selectBrand', {title: this.brand + this.type + this.series, brandid: this.brandid, typeid: this.typeid, seriesid: this.seriesid})
			}
		}
	}
</script>

<style lang="less" scoped>
	.brandlist {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 99;
		background-color: #fff;
		.brand, .type {
			display: flex;
			height: 100%;
			flex-direction: column;

			.list {
				flex-grow: 1;
				overflow-y: auto;
				background-color: #fff;
				-webkit-overflow-scrolling:touch;
				.letter {
					line-height: 40px;
					height: 40px;
					background-color: #f2f2f2;
					font-size: 24px;
					color: #666;
					padding-left: 24px;
				}

				.bd {
					line-height: 84px;
					height: 84px;
					font-size: 26px;
					padding-left: 24px;
					border-top: 1px solid #ebebeb;
				}
			}

			.button {
				flex-shrink: 0;
				background-color: #fff;
				display: flex;
				flex-basis: 100px;
				p{
					flex: 1;
					line-height: 100px;
					text-align: center;
					box-sizing: border-box;
					font-size: 32px;
					&.prev{
						background-color: #fff;
						border-top: 1px solid #ebebeb;
					}
					&.cancel{
						background-color: #f44446;
						color: #fff;
					}
				}
			}
		}
	}
</style>
