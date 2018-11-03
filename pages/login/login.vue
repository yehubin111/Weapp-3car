<template>
	<view class="content">
		<div class="welcome">欢迎登录</div>
		<div class="username" :class="{on: nousername}">
			<input type="text" name="" v-model="username" placeholder="请输入您的用户名" id="">
			<p class="tip">用户名不能为空</p>
		</div>
		<div class="password" :class="{on: nopassword}">
			<input type="password" name="" v-model="password" placeholder="请输入您的密码" id="">
			<p class="tip">密码不能为空</p>
		</div>
		<div class="button">
			<button type="warn" @click="toLogin">马上登录</button>
			<p class="error" v-show="errorinfo">{{errorinfo}}</p>
		</div>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				username: '',
				password: '',
				nousername: false,
				nopassword: false,
				jscode: ''
			}
		},
		computed: {
			...mapState(['errorinfo'])
		},
		mounted() {
			let that = this;
			wx.login({
				success: (res) => {
					console.log(res);
					if (res.code) {
						that.jscode = res.code;
					} else {
						console.log('获取用户登录态失败！' + res.errMsg)
					}
				}
			});
		},
		methods:{
			...mapMutations(['SETUSERINFO', 'SETSTATE']),
			toLogin() {
				this.SETSTATE({k: 'errorinfo', v: ''});
				
				let that = this;
				let username = this.username.trim();
				let password = this.password.trim();
				if(!username) {
					this.nousername = true;
					setTimeout(() => {
						that.nousername = false;
					}, 2000)
					return;
				}
				if(!password) {
					this.nopassword = true;
					setTimeout(() => {
						that.nopassword = false;
					}, 2000)
					return;
				}
				
				wx.showLoading({title: '正在登录'});
				
				this.$store.dispatch('usernameLogin', {username, password, jscode: this.jscode});
			}
		}
	}
</script>

<style lang="less" scoped>
	.content{
		.welcome{
			font-size: 55px;
			color: #444;
			padding: 0 134px 0 77px;
			line-height: 150px;
			margin-top: 100px;
			display: inline-block;
			background: right center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQUAAAByCAYAAABaxsRcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZGQzE1NjNCQ0VDQTExRThBQjQwQTFBNDc0QjVEQTIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZGQzE1NjNDQ0VDQTExRThBQjQwQTFBNDc0QjVEQTIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkZDMTU2MzlDRUNBMTFFOEFCNDBBMUE0NzRCNURBMjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkZDMTU2M0FDRUNBMTFFOEFCNDBBMUE0NzRCNURBMjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DK3UmAAAaJklEQVR42uydB7gV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);
			background-size: 130px auto;
			margin-bottom: 32px;
		}
		.username{
			padding: 0 77px;
			margin-bottom: 20px;
			position: relative;
			input{
				font-size: 34px;
				height: 110px;
				line-height: 110px;
				border-bottom: 1px solid #d3d3d3;
			}
			.tip{
				color: #f00;
				font-size: 24px;
				position: absolute;
				line-height: 40px;
				bottom: -40px;
				display: none;
			}
			&.on{
				input{
					border-bottom-color: #f00;
				}
				.tip{
					display: block;
				}
			}
		}
		.password{
			padding: 0 77px;
			margin-bottom: 128px;
			position: relative;
			input{
				font-size: 34px;
				height: 110px;
				line-height: 110px;
				border-bottom: 1px solid #d3d3d3;
			}
			.tip{
				color: #f00;
				font-size: 24px;
				position: absolute;
				line-height: 40px;
				bottom: -40px;
				display: none;
			}
			&.on{
				input{
					border-bottom-color: #f00;
				}
				.tip{
					display: block;
				}
			}
		}
		.button{
			margin: 0 77px;
			button{
				
			}
			.error{
				font-size: 32px;
				color: #f00;
				text-align: center;
				line-height: 60px;
			}
		}
	}
</style>
