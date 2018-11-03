<template>
	<view>
		<div class="contract">
			<div class="con">
				<p class="brand">{{info.keyword}}</p>
				<ul class="info">
					<li>
						<p class="val">{{info.ccsjName}}</p>
						<p class="unit">出厂日期</p>
					</li>
					<li v-if="info.cjPrice">
						<p class="val">{{info.cjPrice}}</p>
						<p class="unit">成交价(万元)</p>
					</li>
					<li>
						<p class="val">{{info.mileage}}</p>
						<p class="unit">里程(万公里)</p>
					</li>
					<li>
						<p class="val">{{info.color}}</p>
						<p class="unit">颜色</p>
					</li>
				</ul>
				<div class="infodetail" v-show="infodetail">
					<p>
						<span class="unit">车架号</span>
						<span class="val">{{info.vin?info.vin: '--'}}</span>
					</p>
					<p>
						<span class="unit">发动机号</span>
						<span class="val">{{info.engineNo?info.engineNo: '--'}}</span>
					</p>
					<p>
						<span class="unit">上牌日期</span>
						<span class="val">{{info.spsjName}}</span>
					</p>
					<!-- <p>
						<span class="unit">出厂日期</span>
						<span class="val">2018-01-22</span>
					</p> -->
					<p>
						<span class="unit">初次登记地</span>
						<span class="val">{{info.belongArea?info.belongArea: '--'}}</span>
					</p>
					<p>
						<span class="unit">使用性质</span>
						<span class="val">{{info.carNature?info.carNature: '--'}}</span>
					</p>
					<p>
						<span class="unit">过户次数</span>
						<span class="val">{{info.ghNum?info.ghNum: '--'}}</span>
					</p>
					<p>
						<span class="unit">说明书</span>
						<span class="val">{{info.instructions == 1?'有': '无'}}</span>
					</p>
					<p>
						<span class="unit">保养手册</span>
						<span class="val">{{info.bysc == 1?'有': '无'}}</span>
					</p>
					<p>
						<span class="unit">钥匙数</span>
						<span class="val">{{info.keyNum?info.keyNum: '--'}}</span>
					</p>
					<p>
						<span class="unit">包含运费</span>
						<span class="val">{{info.freight == 1?'是': '否'}}</span>
					</p>
					<p>
						<span class="unit">联盟担保</span>
						<span class="val">{{info.lmGuarantee == 1?'是': '否'}}</span>
					</p>
					<p class="desc">
						<span class="unit">车况描述</span>
						<span class="val">{{info.desc}}</span>
					</p>
				</div>
				<div class="moreinfo" @click="infodetail = !infodetail">{{infodetail? '隐藏详细信息':'查看详细信息'}}</div>
			</div>
		</div>
		<div class="otherinfo">
			<div class="con">
				<div class="both">
					<p class="sell">卖方 <span>{{info.seller}}</span></p>
					<p>买方 <span v-for="(b, idx) in info.buyers" :key="idx">{{b.name}}</span></p>
				</div>
				<p class="num">
					<span class="unit">开户名</span>
					<span>{{info.name}}</span>
				</p>
				<p class="num">
					<span class="unit">账号</span>
					<span>{{info.card}}</span>
				</p>
				<p class="time special">
					<span class="unit">开户行</span>
					<span>{{info.bank}}</span>
				</p>
				<p class="num">
					<span class="unit">合同编号</span>
					<span>{{contractNo}}</span>
				</p>
				<p class="time">
					<span class="unit">合同日期</span> 
					<span>{{info.cjsj}}</span>
				</p>
				<p class="status">合同状态<span :class="{nosign: info.flag === 0, sign: info.flag == 1, finish: info.flag == 2}">{{info.statusName}}</span></p>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		props: ['info', 'contractNo'],
		data() {
			return {
				infodetail: false
			}
		}
	}
</script>

<style lang="less" scoped>
	.contract {
		padding: 24px;
		box-sizing: border-box;
		width: 100%;
		flex-grow: 0;

		.con {
			width: 100%;
			border-radius: 10px;
			background-color: #fff;
			.brand {
				line-height: 112px;
				font-size: 31px;
				padding: 0 32px;
				height: 112px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 10px;
			}
			.infodetail{
				margin-top: 36px;
				p{
					font-size: 26px;
					line-height: 60px;
					margin: 0 30px;
					display: flex;
					span{
						flex: 1;
						display: block;
						&.unit{
							color: #999;
						}
						&.val{
							
						}
					}
					&.desc{
						span{
							&.unit{
								flex-basis: 5em;
								flex-grow: 0;
								flex-shrink: 0;
							}
							&.val{
								flex-grow: 1;
								line-height: 46px;
								margin-top: 9px;
							}
						}
					}
				}
			}
			.info {
				display: flex;
				padding: 0 0 0 6px;
				// margin-bottom: 47px;

				li {
					flex: 1;
					border-right: 1px solid #ebebeb;
					padding-left: 26px;

					.val {
						font-size: 31px;
						height: 28px;
						line-height: 28px;
						margin-bottom: 22px;
					}

					.unit {
						font-size: 22px;
						line-height: 20px;
						height: 20px;
						color: #999;
					}
				}
			}
			.moreinfo{
				height: 75px;
				background-color: #f4f8ff;
				line-height: 75px;
				color: #5072b8;
				font-size: 24px;
				text-align: center;
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
				margin-top: 47px;
			}
		}
	}

	.otherinfo {
		padding: 0 24px 24px 24px;
		box-sizing: border-box;
		width: 100%;
		flex-grow: 0;

		.con {
			width: 100%;
			border-radius: 10px;
			background-color: #fff;
			// padding: 22px 0 0 0;

			.both {
				margin-left: 32px;
				display: flex;
				border-bottom: 1px solid #ebebeb;
				margin-bottom: 13px;
				p {
					line-height: 93px;
					font-size: 26px;
					color: #999;

					span {
						color: #000;
						margin-right: 10px;
					}

					&.sell {
						margin-right: 26px;
					}
				}
			}

			&>p {
				font-size: 26px;

				&.num,
				&.time {
					
					margin-left: 32px;
					line-height: 58px;
					display: flex;
					span {
						
						color: #000;
						&.unit{
							color: #999;
							flex-basis: 5em;
						}
					}
				}

				&.time {
					margin-bottom: 13px;
				}
				&.special{
					border-bottom: 1px solid #ebebeb;
					padding-bottom: 13px;
				}
				&.status {
					line-height: 87px;
					margin-left: 32px;
					color: #999;
					border-top: 1px solid #ebebeb;

					span {
						margin-left: 14px;
						&.nosign{
							color: #f44446;
						}
						&.sign{
							color: #fba500;
						}
						&.finish{
							color: #000;
						}
					}
				}
			}
		}
	}
</style>
