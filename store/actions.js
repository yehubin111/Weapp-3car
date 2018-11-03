let baseurl = 'https://www.3car.vip';
let URL = {
	"openidlogin": `${baseurl}/login/mobile/login1?`,
	"usernamelogin": `${baseurl}/login/mobile/login2?`,
	"leaguecar": `${baseurl}/car/mobile/carlist`,
	"cardetail": `${baseurl}/car/mobile/detail`,
	"brandlist": `${baseurl}/carbrand/serial`,
	// "factorylist": `${baseurl}/carbrand/serial`, // 厂商
	// "typelist": `${baseurl}/carbrand/serial`, // 车系
	"serieslist": `${baseurl}/carbrand/type`, // 三级品牌
	"owncar": `${baseurl}/car/mobile/carinventory`, // 库存管理
	"tokendomain": `${baseurl}/car/mobile/upToken`, // 获取七牛token 和URL domain
	"carpublic": `${baseurl}/car/mobile/pubcar`, // 发车
	"cardelete": `${baseurl}/car/mobile/del`, // 删除库存车辆
	"setsell": `${baseurl}/car/mobile/sell`, // 设置成交
	"editinfo": `${baseurl}/car/mobile/edit`, // 车辆编辑
	"selledcar": `${baseurl}/contract/mobile/list`, // 成交车辆
	"getbuyer": `${baseurl}/contract/mobile/getBuyers`, // 买家搜索
	"tocontract": `${baseurl}/contract/mobile/save`, // 提交合同
	"signature": `${baseurl}/contract/mobile/sign`, // 合同签名提交
	"contractinfo": `${baseurl}/contract/mobile/detail`,  // 合同详情
	"mycontract": `${baseurl}/contract/mobile/myContract`, // 我的成交
}

function wxRequest(url, data, callback, method) {
	let openid = wx.getStorageSync('3car_openid');
	wx.request({
		url: url,
		method: method ? method : 'GET',
		data: {
			openId: openid,
			...data
		},
		success: (res) => {
			callback(res);
		},
		fail: (err) => {
			console.log(err);
		}
	})
}

function loginRequest(url, callback) {
	wx.request({
		url,
		success: (res) => {
			callback(res);
		},
		fail: (err) => {
			console.log(err);
		},
		complete: c => {
			console.log(c);
		}
	})
}
export default {
	openidLogin({
		state,
		commit,
		dispatch
	}, openid) {
		let url = URL.openidlogin;

		wxRequest(url, {}, r => {
			wx.hideLoading();

			if (r.data.code == 0) {
				// openid登录成功，直接跳转联盟列表页
				console.log('openid登录成功');

				commit('LOGINSUCCESS', r.data);
				// 获取七牛token and domain 上传图片用
				dispatch('getTokenDomain');
			}
		})
	},
	usernameLogin({
		state,
		commit,
		dispatch
	}, {
		username,
		password,
		jscode
	}) {
		let url = `${URL.usernamelogin}type=1&loginName=${username}&password=${password}&jscode=${jscode}`;

		loginRequest(url, r => {
			wx.hideLoading();

			console.log(r.data);
			if (r.data.code == 0) {
				// username登录成功，直接跳转联盟列表页
				console.log('username登录成功');

				commit('LOGINSUCCESS', r.data);

				// 获取七牛token and domain 上传图片用
				dispatch('getTokenDomain');
			} else {
				commit('LOGINFAIL', r.data.msg);
			}
		})
	},
	// index
	getLeagueCar({
		state,
		commit
	}, {
		option,
		load = false,
		more = false
	}) {
		let url = URL.leaguecar;

		wxRequest(url, option, (res) => {
			console.log(res);
			/**
			 * 下拉刷新情况，请求成功后关闭下拉刷新动画
			 * 重置列表数据
			 */
			if (load) {
				commit('SETSTATE', {
					k: 'leaguecar',
					v: []
				});
				wx.stopPullDownRefresh();
			}
			commit('LEAGUECAR', {
				r: res.data,
				more
			});
		})
	},
	// cardetail
	getCardetail({
		state,
		commit
	}, id) {
		let url = URL.cardetail;

		wxRequest(url, {
			id
		}, (res) => {
			commit('CARDETAIL', {
				r: res.data
			});
		});
	},
	getBrandlist({
		state,
		commit
	}) {
		let url = URL.brandlist;

		wxRequest(url, {
			lv: 0
		}, res => {
			commit('BRANDLIST', res.data);
		})
	},
	getTypelist({
		state,
		commit
	}, id) {
		let url = URL.brandlist;

		wxRequest(url, {
			lv: 1,
			serialId: id
		}, res => {
			let r = res.data;
			r.data.forEach(v => {
				let fcid = v.id;
				let typeurl = URL.brandlist;

				wxRequest(typeurl, {
					lv: 2,
					serialId: fcid
				}, data => {
					let g = data.data;
					commit('TYPELIST', {
						r: g,
						title: v.title
					});
				})
			})
		})
	},
	getSerieslist({
		state,
		commit
	}, id) {
		let url = URL.serieslist;

		wxRequest(url, {
			serialId: id
		}, res => {
			commit('SERIESLIST', res.data);
		});
	},
	// owncar
	getOwncar({
		state,
		commit
	}, {
		option,
		load = false
	}) {
		let url = URL.owncar;
		// 保存筛选条件
		commit('SETSTATE', {
			k: 'owncaroption',
			v: option
		});

		wxRequest(url, option, (res) => {
			console.log(res);
			/**
			 * 下拉刷新情况，请求成功后关闭下拉刷新动画
			 * 重置列表数据
			 */
			if (load) {
				commit('SETSTATE', {
					k: 'owncar',
					v: []
				});
				wx.stopPullDownRefresh();
			}
			commit('OWNCAR', {
				r: res.data
			});
		})
	},
	delOwncar({
		state,
		commit,
		dispatch
	}, id) {
		let url = URL.cardelete;

		wxRequest(url, {
			id
		}, res => {
			wx.showToast({
				title: '删除成功'
				// icon: 'none'
			})
			let option = state.owncaroption;
			option.current = 1;
			dispatch('getOwncar', {
				option,
				load: true
			});
		})
	},
	setSell({
		state,
		commit
	}, {
		id,
		price
	}) {
		let url = URL.setsell;

		wxRequest(url, {
			id,
			price
		}, res => {
			if (res.data.code == 0) {
				wx.showToast({
					title: res.data.msg
				})
			} else {
				wx.showToast({
					title: res.data.msg,
					icon: 'none'
				})
			}
		});
	},
	// public
	getTokenDomain({
		state,
		commit
	}) {
		let url = URL.tokendomain;

		wxRequest(url, {}, res => {
			commit('TOKENDOMAIN', res.data);
		})
	},
	uploadQiniu({
		state,
		commit,
		dispatch
	}, {
		tempFilePaths,
		type = '',
		option = {}
	}) {
		let token = state.qiniutoken;
		var that = this;
		let uploadTask = wx.uploadFile({
			url: 'https://upload-z0.qiniup.com',
			name: 'file',
			filePath: tempFilePaths,
			header: {
				"Content-Type": "multipart/form-data"
			},
			formData: {
				token: token,
			},
			success: function(res) {
				let data = JSON.parse(res.data)
				// 合同签名
				if (type == 'signature')
					dispatch('toSignature', { key: data.key, option });
				else
					commit('UPLOADQINIU', {
						r: data,
						name: tempFilePaths
					});
			},
			fail: function(res) {
				console.log(res)
			}
		})

		uploadTask.onProgressUpdate(r => {
			commit('CHANGEPROCESS', {
				name: tempFilePaths,
				pcs: r.progress
			});
		})
	},
	carPublic({
		state,
		commit,
		dispatch
	}, {
		option
	}) {
		let url = URL.carpublic;

		wxRequest(url, option, (r) => {
			if (r.data.code == 0) {
				if (option.id) {
					wx.showToast({
						title: '编辑成功'
					})
				} else {
					wx.showToast({
						title: '发车成功'
					})
				}

				setTimeout(() => {
					wx.navigateBack({
						delta: 1
					})
					let opt = state.owncaroption;
					opt.current = 1;
					dispatch('getOwncar', {
						option: opt,
						load: true
					});
				}, 600);
			} else {
				wx.showToast({
					title: r.data.msg,
					icon: 'none'
				})
			}
		}, 'GET');
	},
	getEditinfo({
		state,
		commit
	}, id) {
		let url = URL.editinfo;

		wxRequest(url, {
			id
		}, res => {
			commit('EDITINFO', res.data);
		})
	},
	// selledcar
	getSelledCar({
		state,
		commit
	}, {
		option,
		load
	}) {
		let url = URL.selledcar;

		wxRequest(url, option, res => {
			if(load)
				commit('SETSTATE', {k: 'selledcar', v: []});
				
			commit('SELLEDCAR', res.data);
		})
	},
	// contract
	getBuyer({
		state,
		commit
	}, {
		name
	}) {
		let url = URL.getbuyer;

		wxRequest(url, {
			name
		}, res => {
			commit('GETBUYER', res.data);
		})
	},
	toContract({
		state,
		commit
	}, {
		option
	}) {
		let url = URL.tocontract;

		wxRequest(url, option, res => {
			if (res.data.code == 0) {
				wx.redirectTo({
					url: '/pages/signature/signature?contractNo=' + res.data.contractNo
				})
			} else {
				wx.showToast({
					title: res.data.msg,
					icon: 'none'
				})
			}
		})
	},
	getContractCardetail({
		state,
		commit
	}, id) {
		let url = URL.cardetail;

		wxRequest(url, {
			id
		}, (res) => {
			commit('CONTRACTCARDETAIL', {
				r: res.data
			});
		});
	},
	toSignature({
		state,
		commit
	}, {
		key,
		option
	}) {
		let url = URL.signature;

		wxRequest(url, {
			key,
			...option
		}, res => {
			if (res.data.code == 0) {
				wx.redirectTo({
					url: '/pages/result/result?contractNo=' + option.contractNo
				})
			} else {
				wx.showToast({
					title: res.data.msg,
					icon: 'none'
				})
			}
		})
	},
	getContractInfo({state, commit}, {contractNo}) {
		let url = URL.contractinfo;
		
		wxRequest(url, {contractNo}, (res) => {
			commit('CONTRACTINFO', {res: res.data});
		})
	},
	getMycontract({state, commit}, { option, load }) {
		let url = URL.mycontract;
		
		wxRequest(url, option, res => {
			if(load)
				commit('SETSTATE', {k: 'mycontract', v: []});
				
			commit('MYCONTRACT', {r: res.data});
		})
	}
}
