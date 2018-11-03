export default {
	openid: '', // 登录标识
	errorinfo: '', // 登录失败信息
	usershop: null, // 登录成功返回的个人商家信息
	userinfo: null, // 登录成功返回的个人信息
	leaguecar: [],  // 联盟车辆列表
	leaguetotal: 0,  // 联盟车辆列表总数
	cardetail: [], // 车辆详情信息
	brandlist: [], //品牌列表
	letterlist: [], // 品牌字母列表
	typelist: [], // 车系列表
	serieslist: [], // 车型列表（第三级）
	owncar: [], // 库存列表
	owncaroption: {}, // 库存车辆筛选条件，用于在操作车辆之后重新载入数据
	owncartotal: 0,
	owncarcount: 0, // 库存总数，无视筛选条件
	showImage: [], // 临时显示图片
	imagearr: [], // 发车-已上传车辆图片
	qiniutoken: '',
	qiniudomain: '',
	editinfo: null, // 车辆编辑信息
	selledcar: [], // 成交车辆
	selledcartotal: 0, 
	buyers: [], // 买家搜索结果
	contractcardetail: '{}', // 合同发起车辆信息 从库存车辆过来
	contractinfo: '{}', // 合同详情
	mycontract: [], //我的成交列表
	mycontracttotal: 0, // 我的成交总数
}