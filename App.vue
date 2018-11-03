<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			let openid = wx.getStorageSync('3car_openid');
			// return;
			if(openid){
				wx.showLoading({title: ''});
				
				this.$store.dispatch('openidLogin', openid);
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
