<template>
	<view class="content">
		<div class="drawarea">
			<canvas canvas-id="firstCanvas" @touchend='end' @touchstart='start' @touchmove='move' class="board"></canvas>
			<p>请在上方灰色区域内签上您的姓名</p>
		</div>
		<div class="ctrl">
			<button type="default" class="clear" @click="clearClick">清空</button>
			<button type="warn" @click="saveClick">下一步</button>
		</div>
	</view>
</template>

<script>
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	export default {
		data() {
			return {
				canvasHeight: 0,
				signImage: '',
				ifdraw: false,
				contractNo: ''
			}
		},
		onLoad(e) {
			if(e.contractNo)
				this.contractNo = e.contractNo;
				
			let self = this;
			//获得Canvas的上下文
			content = wx.createCanvasContext('firstCanvas')
			//设置线的颜色
			content.setStrokeStyle("#333")
			//设置线的宽度
			content.setLineWidth(5)
			//设置线两端端点样式更加圆润
			content.setLineCap('round')
			//设置两条线连接处更加圆润
			content.setLineJoin('round')

			//获取系统信息
			wx.getSystemInfo({
				success: function(res) {
					canvasw = res.windowWidth - 20;
					canvash = res.windowHeight - 40;

					self.canvasHeight = res.windowHeight;
				},
			})
		},
		methods: {
			start(e) {
				this.ifdraw = true;
				console.log('start');
				console.log(e);

				let point = {
					x: e.x,
					y: e.y
				}
				touchs.push(point)
			},
			move(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},
			draw(touchs) {
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
			},
			// 画布的触摸移动结束手势响应
			end: function(e) {
				console.log("触摸结束" + e)
				//清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}

			},
			//清除操作
			clearClick: function() {
				this.ifdraw = false;
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
			},
			//保存图片
			saveClick: function() {
				if(!this.ifdraw){
					wx.showToast({
						title: '请签上您的大名',
						icon: 'none'
					})
					return;
				}
				var that = this
				wx.showLoading({
					title: '努力生成中...'
				})
				wx.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					success: function(res) {
						wx.hideLoading();
						//设置保存的图片
						that.signImage = res.tempFilePath
						
						console.log(that.signImage);
						that.$store.dispatch('uploadQiniu', { tempFilePaths: that.signImage, type: 'signature', option: { contractNo: that.contractNo, type: 'sell' } });
					}
				})

			}
		}
	}
</script>

<style>
	page {
		display: flex;
		height: 100%;
	}
</style>
<style lang="less" scoped>
	.content {
		flex: 1;
		justify-content: center;
		align-items: center;
		background-color: #f2f2f2;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;

		.drawarea {
			margin-bottom: 23px;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			padding: 26px 24px 0;
			width: 100%;
			box-sizing: border-box;

			.board {
				flex-grow: 1;
				background-color: #ddd;
				border-radius: 10px;
				width: 100%;
			}

			p {
				flex-basis: 63px;
				line-height: 63px;
				font-size: 26px;
				color: #666;
				text-align: center;
			}
		}

		.ctrl {
			padding: 0 60px;
			margin-bottom: 100px;
			width: 100%;
			box-sizing: border-box;

			.clear {
				margin-bottom: 25px;
			}
		}
	}
</style>
