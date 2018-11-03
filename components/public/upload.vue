<template>
	<view class="upload">
		<ul class="list">
			<li v-for="(item, index) in showImage" :key="index">
				<p>
					<image mode="aspectFit" :src="item.name"></image>
					<i class="shadow" v-if="item.process < 100"></i>
					<span class="process" v-if="item.process < 100">
						<progress :percent="item.process" border-radius="3"/>
					</span>
					<icon type="clear" class="close" v-if="item.process == 100" @click="delImage(item.name)"></icon>
				</p>
			</li>
			<li class="add" v-if="showImage.length < 16"> 
				<p @click="uploadPic">
					<i class="column"></i>
					<i class="row"></i>
				</p>
			</li>
		</ul>
		<canvas canvas-id="photo_canvas" :style="{width: '1000px', height: '1000px', position: 'absolute', left: '-1000px', top: '-1000px;'}"></canvas>
		<div class="button">
			<p class="cancel" @click="toCancel">确定</p>
		</div>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				maxSize: 1000000 // 图片压缩临界值
			}
		},
		computed: {
			...mapState(['imagearr', 'showImage', 'qiniudomain'])
		},
		methods: {
			...mapMutations(['SHOAIMAGE', 'DELIMAGE']),
			delImage(name) {
				this.DELIMAGE(name);
			},
			uploadPic() {
				let that = this;
				wx.chooseImage({
					count: 16 - that.showImage.length,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						console.log(res);
						res.tempFiles.forEach(v => {
							// 存放临时显示文件
							that.imgCompress(v);
						})
					}
				})
			},
			 imgCompress(img) {
				 let that = this;
				//用于压缩图片的canvas
				let ctx = wx.createCanvasContext('photo_canvas');
				
				let sz = img.size;
				let wd = 0;
				let ht = 0;
				wx.getImageInfo({
					src: img.path,
					success: (g) => {
						wd = g.width;
						ht = g.height;
						// 大于100万像素则压缩之后上传
						if(sz > that.maxSize){
							let line = ht > wd? ht: wd;
							let ratio = line / 1000;
							
							ctx.drawImage(img.path, 0, 0, wd / ratio, ht / ratio);
							ctx.draw(false, () => {
								that.canvasToPath(wd / ratio, ht / ratio);
							});
						}else{
							that.SHOAIMAGE(img.path);
							console.log('compress image');
							that.$store.dispatch('uploadQiniu', { tempFilePaths: img.path });
						}	
					}
				})
			},
			canvasToPath(w, h) {
				let that = this;
				wx.canvasToTempFilePath({
					width: w,
					height: h,
					destWidth: w,
					destHeight: h,
				  	canvasId: 'photo_canvas',
					quality: 0.8,
					fileType: 'jpg',
				  	success: (r) => {
						let res = r.tempFilePath;

						that.SHOAIMAGE(res); 
						console.log('original image');
						
						that.$store.dispatch('uploadQiniu', { tempFilePaths: res });
					}
				})
			},
			toCancel() {
				this.$emit('cancelUpload');
			}
		}
	}
</script>

<style lang="less" scoped>
.upload{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 998;
	background-color: #fff;
	box-sizing: border-box;
	padding: 10px;
	text-align: center;
	display: flex;
	flex-direction: column;
	.list{
		display: inline-block;
		// overflow: hidden;
		width: 100%;
		flex-grow: 1;
		// display: flex;
		// justify-content: center;
		// align-content: flex-start;
		// flex-wrap: wrap;
		li{
			width: 25%;
			height: 0;
			// overflow: hidden;
			position: relative;
			padding-top: 25%;
			float: left;
			box-sizing: border-box;
			p{	
				width: 96%;
				height: 96%;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				// overflow: hidden;
				background-color: #f2f2f2;
				image{
					width: 100%;
					height: 100%;
				}
				.shadow{
					width: 100%;
					height: 100%;
					position: absolute;
					z-index: 9;
					background-color: rgba(255, 255, 255, .5);
					top: 0;
					left: 0;
				}
				.process{
					display: block;
					position: absolute;
					width: 100%;
					box-sizing: border-box;
					bottom: 0px;
					progress{
						
					}
				}
				.close{
					position: absolute;
					right: 5px;
					top: 5px;
				}
			}
			&.add{
				p{
					i{
						background-color: #999;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						&.column{
							width: 30%;
							height: 4px;
						}
						&.row{
							width: 4px;
							height: 30%;
						}
					}
				}
			}
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
// 	.pic{
// 		width: ;
// 		height: 0;
// 		padding-top: 18.75%;
// 		overflow: hidden;
// 		position: relative;
// 		margin: 10px;
// 		.box{
// 			margin: 10px;
// 			overflow: hidden;
// 			image{
// 				position: absolute;
// 				top: 0;
// 				left: 0;
// 				width: 100%;
// 				height: 100%;
// 			}
// 		}
// 	}
}
</style>
