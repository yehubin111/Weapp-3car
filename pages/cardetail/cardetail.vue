<template>
	<view class="content">
		<div v-for="(item, index) in cardetail" :key="index">
			<div class="focusbox"> 
				<swiper class="focus" indicator-dots="true" indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(g, idx) in item.imgs" :key="idx">
						<image mode="scaleToFill" :src="g.img" class="slide-image"/>
					</swiper-item>
				</swiper>
			</div>
			<div class="nameprice">
				<p class="name">{{item.title}}</p>
				<p class="price">
					<view>展厅标价</view>
					<span class="baseprice">{{item.ztPrice}}万</span>
					<view v-if="item.lmPrice">联盟底价</view>
					<span v-if="item.lmPrice">{{item.lmPrice}}万</span>
				</p>
			</div>
			<div class="baseinfo">
				<p class="title">
					基本信息
				</p>
				<ul class="list">
					<li>
						<p class="name">上牌时间</p>
						<p class="value">{{item.spsj?item.spsj: '--'}}</p>
					</li>
					<li>
						<p class="name">表显里程</p>
						<p class="value">{{item.mileage ?item.mileage + '万公里': '--'}}</p>
					</li>
					<li>
						<p class="name">所在地</p>
						<p class="value">{{item.area?item.area: '--'}}</p>
					</li>
				</ul>
				<ul class="list list2">
					<li>
						<p class="name">排量</p>
						<p class="value">{{item.auto?item.auto: '--'}}</p>
					</li>
					<li>
						<p class="name">变速箱</p>
						<p class="value">{{item.gear?item.gear: '--'}}</p>
					</li>
					<li>
						<p class="name">排放</p>
						<p class="value">{{item.outType?item.outType: '--'}}</p>
					</li>
				</ul>
				<p class="line"></p>
				<p class="introduce">
					车况描述：{{item.desc}}
				</p>
			</div>
			<div class="shop">
				<p class="title">
					商家信息
				</p>
				<div class="shopinfo">
					<p class="head">
						<image :src="item.shop.logo"></image>
					</p>
					<div class="info">
						<p class="sname">{{item.shop.name?item.shop.name:'--'}}</p>
						<p class="person">{{item.shop.boss?item.shop.boss:'--'}}</p>
						<p class="local">{{item.shop.addr?item.shop.addr:'--'}}</p>
						<p class="tel" @click.prevent.stop="makePhoneCall(item.shop.tel)">
							联系商家
						</p>
					</div>
					
				</div>
			</div>
			<div class="picture">
				<p class="title">
					车辆图片
				</p>
				<div class="list">
					<image mode="widthFix" v-for="(img, idx2) in item.imgs" :key="idx2" :src="img.img"></image>
				</div>
			</div>
			<div class="bottom">
				<!-- <p class="import">
					<navigator :url="'/pages/contract/contract?carid=' + carid">
						签订合同
					</navigator>
				</p> -->
				<p @click.prevent.stop="makePhoneCall(item.shop.tel)">
					联系商家
				</p>
			</div>
		</div>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				carid: ''
			}
		},
		// 右上角分享事件
		onShareAppMessage(res) {
			let obj = this.cardetail[0];
			return { 
				title: obj.title,
				imageUrl: obj.imgs[0].img
			}
		},
		onLoad(e) {
			console.log(e);
			// 初始化获取车辆id
			this.carid = e.id;
			// 根据id获取车辆信息
			this.$store.dispatch('getCardetail', this.carid);
		},
		methods: {
			makePhoneCall(num) {
				wx.makePhoneCall({
					phoneNumber: num
				})
			}
		},
		computed: {
			...mapState(['cardetail'])
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
		.focusbox{
			width: 100%;
			height: 0;
			padding-top: 75%;
			position: relative;
			.focus{
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				.slide-image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.nameprice{
			width: 100%;
			background-color: #fff;
			margin-bottom: 20px;
			padding-top: 18px;
			padding-bottom: 30px;
			.name{
				font-size: 32px;
				line-height: 52px;
				height: 104px;
				overflow: hidden;
				margin: 0 24px;
				margin-bottom: 20px;
			}
			.price{
				margin: 0 24px;
				font-size: 26px;
				color: #999;
				view{
					display: inline-block;
					margin-right: 10px;
				}
				span{
					font-size: 42px;
					color: #f44446;
					&.baseprice{
						margin-right: 30px;
					}
				}
			}
		}
		.baseinfo{
			background-color: #fff;
			width: 100%;
			overflow: hidden;
			margin-bottom: 20px;
			.title{
				font-size: 32px;
				color: #1a1a1a;
				font-weight: bold;
				border-left: 6px solid #5072b8;
				height: 32px;
				line-height: 32px;
				padding-left: 18px;
				margin: 34px 0 43px 0;
			}
			.list{
				overflow: hidden;
				display: flex;
				margin-bottom: 25px;
				li{
					flex: 1;
					text-align: center;
					.name{
						font-size: 24px;
						color: #999;
						line-height: 48px;
					}
					.value{
						font-size: 32px;
						line-height: 50px;
					}
				}
				&.list2{
					margin-bottom: 35px;
				}
			}
			.line{
				margin: 0 24px;
				height: 1px;
				background-color: #ebebeb;
				display: block;
			}
			.introduce{
				margin: 0 24px;
				line-height: 43px;
				font-size: 26px;
				color: #999;
				text-align: justify;
				padding: 21px 0 30px 0;
			}
		}
		.shop{
			background-color: #fff;
			width: 100%;
			overflow: hidden;
			margin-bottom: 20px;
			.title{
				font-size: 32px;
				color: #1a1a1a;
				font-weight: bold;
				border-left: 6px solid #5072b8;
				height: 32px;
				line-height: 32px;
				padding-left: 18px;
				margin: 34px 0 43px 0;
			}
			.shopinfo{
				display: flex;
				margin: 0 24px;
				.head{
					width: 110px;
					flex-basis: 110px;
					height: 110px;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20px;
					background: center center no-repeat url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMsaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVBMURCMUZBRDI4ODExRThBM0UyRDYyMjRENTg5OUVEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVBMURCMUY5RDI4ODExRThBM0UyRDYyMjRENTg5OUVEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2OEYyRTgzRDIyOTExRTg5RUY3RjM2NDQ1Q0NCMkQ2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ2OEYyRTg0RDIyOTExRTg5RUY3RjM2NDQ1Q0NCMkQ2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAEAsLCwwLEAwMEBcPDQ8XGxQQEBQbHxcXFxcXHx4XGhoaGhceHiMlJyUjHi8vMzMvL0BAQEBAQEBAQEBAQEBAQAERDw8RExEVEhIVFBEUERQaFBYWFBomGhocGhomMCMeHh4eIzArLicnJy4rNTUwMDU1QEA/QEBAQEBAQEBAQEBA/8AAEQgA1ADUAwEiAAIRAQMRAf/EAF0AAQEBAQEBAAAAAAAAAAAAAAAEAwIBBgEBAAAAAAAAAAAAAAAAAAAAABABAAIBBAMBAQEBAAAAAAAAAAECEhEhUQMxkTJBgWFCEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiJnwNemY35BnhbifRhbifSoBLhbifRhbifSoBLhbifRhbifSoBLhbifRhbifSoBLhbifRhbifSoBLNbR5iYeKp0iN/CWdNdvAAAAAAAAAAAAAAABu9iNZiI/VMRpERwCbc3VAJdzdUAl3N1QCXc3VAJdzdUAl3eK2PdXeLc7SDIAAAAAAAAAAAAAGnTXW0zw3cddcaRzO8uwAAAAAAAAAAHN65VmPToBIO+2uNp4ndwAAAAAAAAAAAR5AFT1j19kRGNv5LUHrmZiJiOS1618z/GE3mbZfv4CkcU7K2jieHQPXNbROun5Ojm/bERpXeWfXfCf8nyCgeRaLRrE6kzEbzsDy04xrL1j2dmW0eHvX2Rpjb+SDYePLXrXz54Bn3/8AP9ZPbWm06y8AAAAAAAAAAAAABvSlZpEzEAwHXZEReYjw5AAAAAAAAAG/XWs0iZiNWfbERfSNgcAAAAAAAAAAAAAAKev4hMp6/iAYdv3Ll12/cuQAAAAAAAAUdXxDLt+5a9XxDLt+5BwAAAAAAAAAAAAAAp6/iEzbr7I0xttoDjsrabzpEucbcSozpzBnTmAT424kxtxKjOnMGdOYBPjbiTG3EqM6cwZ05gE+NuJMbcSozpzBnTmAT424kxtxKjOnMGdOYB51xpSNWXb9y1nspH6wvbK0yDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q==);
					background-size: 110px auto;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.info{
					flex-grow: 1;
					position: relative;
					.sname{
						font-size: 32px;
						margin-bottom: 10px;
					}
					.person{
						font-size: 26px;
						color: #999;
						line-height: 44px;
						padding-left: 34px;
						background: left center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAApCAYAAAC2qTBFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUzQzdFRTZGQ0IxQTExRThBQ0ZCRkYyMjVFNDk1M0QyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUzQzdFRTcwQ0IxQTExRThBQ0ZCRkYyMjVFNDk1M0QyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTNDN0VFNkRDQjFBMTFFOEFDRkJGRjIyNUU0OTUzRDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTNDN0VFNkVDQjFBMTFFOEFDRkJGRjIyNUU0OTUzRDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7VzELiAAADj0lEQVR42sSYfWhNcRjHz+6lK6MUuiZmCm0zxkpeJ5OXoXnZdL00hCj84T0SomheNuIPNCUvrTgjhoVm3kKKZSILmU1Y2ry7bZp1fX96bp09nbt7zvn97vbU54/nOW/f85zz+/2e5xcVCAS0oOm6rtm0ASAVDAKxoAP4Cd6DMnAHfLZ6M5/P18xvpzmzmWAlmBjmvN/gEsgFz+w+xGXz/B70sIsWhAnrBLJBOQmMmLhkevsZDrO9HtwHHa1eYPWzJoCHIW4sMlkCKsAv4AWDwQQwnp07mgSmqBLnAbdNhBWCHeClyTXFIAeMBXvBCMOxoeA8mK3isx6hbBhtixhcIYQZ7R4YCU6zeBaYJSuuH1jCYjmEHVtE2ecvLSVuDfOfU9acmMhUPRv5WTLiMpm/VnNuP8ABFst2Ki4JxBj8alCqydlx5g8HbifiBjL/riZv4gVfGXzx8nFOxHVnfpWmxt4y36tihWhSJI7fJ+BE3HfmxygS14v535yIe8P8VAXCutJAMwqrciKunIa/cYAkSYqbA9obfFHzNTgR9wdcZbFcSXFbmX9BZhI+xPzJYKFDYfnsv20EZ2TEPQY3WOwUmG5TmFjylplk0S9blSwAf1msCOwD0WGu7QlOgt0s/oKul67nakEGuMbiG8FcUECFaAX1DKL+SwRTqRrpzK4TBWm6ykr4OpgEDoN4Q7w32Gzw/STO7L4Bqu8Wg4+qe4gSCwt/dAsvLMSdAO9UNzjz6bOtkphGXPT/3aJeQlpcF6r3C9jn5FYHXlNWalpYL6NAGjU5e2T+OdEKXqZOnls9jdib4CmopLXYTV2/l1aUFPpXR5ncYxMYRtOS3464MfRgD4uLpWY/OAY+hag4/CRWcAXspM+43GQCF63jEzr+1cpnTaQ9Do/J3CaysT2EsJbsAU0r40w6tngqZKPCifPQibx03kD7I5WSa6u49xBwzqQlKAon7izoxmJLQZ6mzhpp8j7K4hm6rq9uNnqCW2A4kG6yCmwDu7TImah6pvElz+fz1fDM5bOTSiMsTKNNoVoWO9gsc8haJqutmqjprdMib2k0MRstDtmrDmZuHTuY10rCNNqm4Mviiv+fFVnrw5aTJivljGLjv8+84D83hR0QE+eXVhYn5tUPBj8WSUt20RYVH0FtYcV8lRLiEliwrI3EPeITs4st7A0Ktx3sGq/z+rrYXoWb9aqtabzz7/9PgAEAN5LIQkpyBBAAAAAASUVORK5CYII=) no-repeat;
						background-size: 20px auto;
					}
					.local{
						font-size: 26px;
						color: #999;
						line-height: 44px;
						padding-left: 34px;
						background: left center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAtCAYAAADC+hltAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUzQzdFRTczQ0IxQTExRThBQ0ZCRkYyMjVFNDk1M0QyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUzQzdFRTc0Q0IxQTExRThBQ0ZCRkYyMjVFNDk1M0QyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTNDN0VFNzFDQjFBMTFFOEFDRkJGRjIyNUU0OTUzRDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTNDN0VFNzJDQjFBMTFFOEFDRkJGRjIyNUU0OTUzRDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7JB+sPAAAE9klEQVR42rRYCWxVRRR9vNZixQ13RVRQcQFBRY0WNSC4IGBA5WuIWpS6oKLihoZgYoLgyhJMJAqpSkigFknjlkBEJCogcUM0IioQjKmiKNTYGmnruXpeM72Z7f/+nuS0M/Nn5p037869d6ZLa2trkqGmpiaJwFngVeDFLHe39GkGt4KfgKvAOvDn0MS5XK6tXJrE4zpwEjgoom8JeBIp4+bIe4Mvgh/FPCyN6CMrsxZcEinKhnKwEvwQXAweFRoQWrEnwSmO3/4A14Ffgz+CDXzRI8Ce4Ln81BrjwBHgDeCb+QorA98Ch1l+k/aXwZXg7sCL9QVHgreCJxrtB4FvgPeDs2M/pYhdbxEltjGED6qNECX4CnwK7ANOBv9Sv88CH44Vtho8U7XNoH2tLtDGWrgB+vKlTYjwXEjYLIuBjwenJsXBNvB8cLlqXwqeYBUGHzaAy61FvZIUH1eD76q2OteKvao6zokU1Zu77C7wFvDCSP94mXK6/bE4N7bblWgQo+5vdNpqWT2NK8AHHDtX3Mcyupt6j92NUQ73GXCRuWKPqkETAqJk8DsOUYJjwXvBzeBozzxr6X4yHIlFGvWfMBQOx/9LjR83ge95JltB52hiD7gR/EK1H0hDv8Yz3yO2RZEVu1L9MN8zyUz1Etu5QWRHDaCbOZUuwEQt46YNm8gMw7BYXUXYRRbPbkMv9Xafgadxg/xutG9mv8vVeN9Get0od5NwlnJycwW2OQbfZ5TFgw8GGwOffKJRr6CDtWGdqp8hwo42Gr71PGi4UZ5HuwpBzGKHUR/jcbztNk/Kpcvwm2PgIfRXVmcYwNtG+XRPptJsbppUOcNmx8DuTP4y7MxD2E9G+QCPT2sx6vuIsCZleDaIce816oflIewYo9zg6LOfiDFtWITtMh2cY+AuZQfD8xA20ih/6eijX3RnyvCRoY8n3V6hdmhZhKjbwR5Gfbmj38mqvj1lapzhUI+BzlYeXaLD/h5RQ5Szfh/8xtH3bO10U4sPGewY/J3y6BV80AR1uOjNxHKVGl8ZyDQy/JoJ03FxbCCumZFBPtMC2t9GCv3ekhRcT+dtw/HiUI36GpwvW1L8EYUfqONaj4AxL1RtXTn5KZbgPpYZqgtVtvCUGbp+0EMBo67iaXylw/dJDvY0jbo2MNedRrmJeVzSRa4IEM3L6H3L2WEvvX1DxM7ryTy+Gyfewmzh74ixdzO8tYUwfMGJbcKYxU5Xh45qpsqdhRIeAU2nfhyE7dA5/xPgP0b9ZrBfJwp7XolakIlqJwyNjZZssq6TRF0A3qFi5eTQuXKL8knziiyqXGUc2Wb6M3QSH20x0JuKKExC28EqIlTHXBFIiHrQkhZXFEHUfJ47MzTS7UTfjz1nuSJa40mNYzCTQd3ECFcm7Lu4k/Pd52p7r3fceYXwuGVjTfIdE0M3ioNUHibbe4PnoGvDXPAx1fYs3UXBV51yGjpH5WwlDEXjI0TJves9qm1hRMiLuoOVA8pA8AfVXs27CVfi96klU3nBErQLFib4hba1QbVP4XVSL6NtHG8StS1OVwG7KMKyFOY88DXVfgldTCVvaxarg4XgNnBaPrultIAdlmMiOMNo2zf5/8JYQ2LfteDH+T4k7YBPGurJSrOEr18hojoiLGFOLzc7L1k+eRWvnvYUOnlp0jE00X6W8AKlnulTfUdj178CDAAXeBzGexcjYwAAAABJRU5ErkJggg==) no-repeat;
						background-size: 20px auto;
						margin-bottom: 30px;
					}
					.tel{
						width: 136px;
						height: 54px;
						line-height: 54px;
						text-align: center;
						position: absolute;
						font-size: 26px;
						color: #f44446;
						border-radius: 4px;
						border: 2px solid #f44446;
						right: 0px;
						bottom: 70px;
					}
				}
				
			}
		}
		.picture{
			background-color: #fff;
			width: 100%;
			overflow: hidden;
			padding-bottom: 100px;
			.title{
				font-size: 32px;
				color: #1a1a1a;
				font-weight: bold;
				border-left: 6px solid #5072b8;
				height: 32px;
				line-height: 32px;
				padding-left: 18px;
				margin: 34px 0 43px 0;
			}
			.list{
				margin: 0 24px;
				image{
					width: 100%;
					margin-bottom: 20px;
				}
			}
		}
		.bottom{
			position: fixed;
			bottom: 0;
			left: 0;
			height: 100px;
			box-shadow: 0px -4px 10px -2px rgba(102,102,102,.28);
			background-color: #fff;
			width: 100%;
			display: flex;
			p{
				flex: 1;
				text-align: center;
				line-height: 100px;
				font-size: 32px;
				color: #fff;
				background-color: #f44446;
				text-align: center;
				&.import{
					background-color: #5072b8;
				}
			}
		}
	}
</style>