<template>
	<view class="carlist">
		<navigator class="car" v-for="(item, index) in owncar" :key="index" :url="'/pages/cardetail/cardetail?id=' + item.id">
			<view class="con">
				<p class="pic">
					<img :src="item.images" alt="">
				</p> 
				<div class="info"> 
					<p class="name">{{item.title}}</p>
					<p class="sellinfo">展厅标价 <span>{{item.ztPrice}}万</span></p>
					<p class="sellinfo">联盟底价 <span>{{item.lmPrice}}万</span></p>
					<button class="ctrl" @click.stop.prevent="showCtrl(item.id)"></button>
				</div>
			</view> 
		</navigator>
		<div v-show="sellConfirm">
			<cv-confirm :sellId="sellId" @cancelConfirm="cancelConfirm"></cv-confirm>
		</div>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				sellConfirm: false,
				sellId: ''
			}
		},
		computed: {
			...mapState(['owncar'])
		},
		methods: {
			cancelConfirm() {
				this.sellConfirm = false;
			},
			showCtrl(id) {
				let that = this;
				wx.showActionSheet({
					itemList: ['编辑', '成交', '删除', '合同签订'],
					success: (res) => {
						switch(res.tapIndex) {
							// 0编辑 1成交 2删除
							case 0:
								wx.navigateTo({
									url: '/pages/public/public?id=' + id
								})
							break;
							case 1:
								that.sellId = id;
								that.sellConfirm = true;
							break;
							case 2:
								wx.showModal({
									title: '删除库存车辆',
									content: '是否删除该车辆？',
									success: r => {
										if(r.confirm){
											that.$store.dispatch('delOwncar', id);
										}
									}
								}) 
							break;
							case 3:
								wx.navigateTo({
									url: '/pages/contract/contract?carid=' + id
								})
							break;
						}
						console.log(res);
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.carlist{
		background-color: #fff;
		.car{
			width: 100%;
			.con{
				margin: 0 24px;
				border-bottom: 1px solid #ebebeb;
				display: flex; 
				.pic{ 
					margin: 24px 0;
					flex-basis: 200px;
					flex-shrink: 0;
					height: 150px;
					overflow: hidden;
					margin-right: 24px;
					img{
						width: 200px;
						height: 150px;
					}
				}
				.info{
					overflow: hidden;
					margin: 20px 0;
					flex-grow: 1;
					display: flex;
					flex-direction: column;
					position: relative;
					.name{
						flex-basis: 76px;
						flex-shrink: 0; 
						line-height: 38px;
						height: 76px;
						font-size: 28px;
						margin-bottom: 12px;
						overflow: hidden;
					}
					.sellinfo{
						color: #999;
						font-size: 24px;
						line-height: 37px;
						span{
							color: #f44446;
						}
					}
					.ctrl{
						height: 37px;
						width: 40px;
						display: block;
						position: absolute;
						right: 0;
						bottom: 0;
						background: center center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAWCAYAAACYPi8fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNDOUYwNDY1Q0JERjExRThBQ0M4RkNGQzRCRjBFQTg3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNDOUYwNDY2Q0JERjExRThBQ0M4RkNGQzRCRjBFQTg3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0M5RjA0NjNDQkRGMTFFOEFDQzhGQ0ZDNEJGMEVBODciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0M5RjA0NjRDQkRGMTFFOEFDQzhGQ0ZDNEJGMEVBODciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4kAnT6AAACHUlEQVR42tyYyytEURzHZ5BXjUchEaUUwixsLLzZWGAhxUZSyj/AX8DCkrJjgYUiydKjLDwXHoWyI2qMkYjIm/E99bvSNPfe85t75sqc+nQX5/5+5/e955zf+Z3rdNjbskANyAUZ4AWcgw1w7IjAVg2WwCfw63AIukBUJAhOAOPgy0BwIGL2c/6z6ESwxhD8Gw/I/6vAky3YOsFCiKI1TkCqhRhcIFr2ZZF45sEDDf4MFkELc9Aei6I1JpjjFoMpcE32b7R1ukGM3gwNmwQxB+Il97VXkXCRG0olRfeBDwNfWyAt0GhAMpBJiQDaFYnWGJUYs5uROH9mvgC8MwKpMwliSrHwU4lcdMPw16sZDjEDmTYJ5EixcEGKgtnW2HVQsVDJTCBm72eG4YQx8lnO9FUGYqMoGXHPZ6Pmt/nYTQrhqHUJ4RdMQ49Jvy8M4i4N+rxMX+KIvhXCV5iGyyb9+4pFi+R2byGeYO/7tQrHJ5kYniTq6DbFiW1EYunuMeqCit/G9VTlmBl1SnzRWNoOKkSL21yRxJgl4E7C32Aw41q6GwczECVgB2M5dSkSPsYY0w0OdPw8gn5aHT/LJLDcbAUNIBtcgXUwa7LP9AqZTgt7+4iW5QPDRuSsJtAI8ijmbTATpqSru+RXQ5zpMwr837Y4Sk6fDNHL9IsqIpqb7udGt6cd0GxXQE6bP0A6qAKFVHG90g+HTXra1r4FGADfxat4BInV8gAAAABJRU5ErkJggg==) no-repeat;
						background-size: 31px auto;
					}
				}
			}
		}
	}
</style>