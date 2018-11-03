export default {
	SETSTATE(state, {k, v}){
		state[k] = v;
	},
	LOGINSUCCESS(state, r) {
		wx.reLaunch({
			url: '/pages/index/index'
		})
		
		wx.setStorageSync('3car_openid', r.user.openId);
		state.usershop = r.shop;
		state.userinfo = r.user;
		state.owncarcount = r.count;
	},
	LOGINFAIL(state, msg) {
		state.errorinfo = msg;
	},
	// index
	LEAGUECAR(state, { r, more }) {
		state.leaguecar = state.leaguecar.concat(r.data);
		state.leaguetotal = r.total;
		
		if(!more)
			wx.showToast({
				title: `共为您找到${r.total}辆车`,
				icon: 'none'
			})
	},
	// cardetail
	CARDETAIL(state, {r}) {
		state.cardetail = [];
		state.cardetail.push(r);
	},
	BRANDLIST(state, r) {
		let ar = r.data.map(v => v.letter);
		let brandarr = [];
		state.letterlist = [...new Set(ar)];
		
		state.letterlist.forEach(v => {
			let obj = {};
			obj.letter = v;
			obj.list = r.data.filter(g => g.letter == v);
			
			brandarr.push(obj); 
		}); 
		state.brandlist = brandarr;
	}, 
	TYPELIST(state, {r, title}) {
		console.log(r); 
		let obj = {};
		obj.name = title;
		obj.list = r.data;
		
		state.typelist.push(obj);
	},
	SERIESLIST(state, r) {
		state.serieslist = r.data;
	},
	// owncar
	OWNCAR(state, { r }) {
		state.owncar = state.owncar.concat(r.data);
		state.owncartotal = r.total;
		state.owncarcount = r.count;
		
// 		if(!more)
// 			wx.showToast({
// 				title: `共为您找到${r.total}辆车`,
// 				icon: 'none'
// 			})
	},
	
	// public
	TOKENDOMAIN(state, r) {
		state.qiniutoken = r.token;
		state.qiniudomain = r.domain;
	},
	UPLOADQINIU(state, { r, name }) {
		// state.imagearr.push({ name, key: r.key });
		state.imagearr.forEach(v => {
			if(v.name == name){
				v.key = r.key;
			}
		})
		console.log(state.imagearr);
		
		state.showImage.forEach(v => {
			if(v.name == name){
				v.process = 100;
			}
		})
	},
	SHOAIMAGE(state, v) {
		state.showImage.push({name: v, process: 0});
		state.imagearr.push({name: v, key: ''});
	},
	DELIMAGE(state, name) {
		state.showImage = state.showImage.filter(v => v.name != name);
		state.imagearr = state.imagearr.filter(v => v.name != name);
	},
	CHANGEPROCESS(state, { name, pcs }) {
		state.showImage.forEach(v => {
			if(v.name == name){
				v.process = pcs;
			}
		})
	},
	EDITINFO(state, r) {
		state.editinfo = r;
		console.log(state.editinfo);
		
		state.imagearr = [];
		state.showImage = [];
		r.imgs.forEach(v => {
			let obj = {
				name: v.img,
				key: v.key
			};
			let obj2 = {
				name: v.img,
				process: 100
			};
			
			state.imagearr.push(obj);
			state.showImage.push(obj2);
		})
	},
	// selledcar
	SELLEDCAR(state, r) {
		state.selledcar = state.selledcar.concat(r.data);
		state.selledcartotal = r.total;
	},
	// contract
	GETBUYER(state, r) {
		state.buyers = r.data;
	},
	CONTRACTCARDETAIL(state, {r}) {
		state.contractcardetail = JSON.stringify(r);
	},
	CONTRACTINFO(state, {res}) {
		res.ccsjName = res.ccsj.replace('年', '-').replace('月', '');
		res.spsjName = res.spsj.replace('年', '-').replace('月', '');
		
		if(res.flag == 1){
			res.statusName = '已签字';
		}else if(res.flag == 2){
			res.statusName = '已完成';
		}else{
			res.statusName = '未签字';
		}
		state.contractinfo = JSON.stringify(res);
	},
	MYCONTRACT(state, {r}) {
		state.mycontract = state.mycontract.concat(r.data);
		state.mycontracttotal = r.total;
		
		state.mycontract.forEach(v => {
			if(v.flag == 1){
				v.statusName = '已签字';
			}else if(v.flag == 2){
				v.statusName = '已完成';
			}else{
				v.statusName = '未签字';
			}
		})
		
	}
}