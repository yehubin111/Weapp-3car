require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([6],{140:function(t,a,e){"use strict";var i=o(e(2)),s=o(e(141));function o(t){return t&&t.__esModule?t:{default:t}}new i.default(s.default).$mount()},141:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e(143),s=e.n(i),o=e(144),r=!1;var n=function(t){r||e(142)},c=e(0)(s.a,o.a,n,"data-v-6b85c1a1",null);c.options.__file="Users/yehubin/project/first-uniapp/pages/public/public.vue",c.esModule&&Object.keys(c.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] public.vue: functional components are not supported with templates, they should use render functions."),a.default=c.exports},142:function(t,a){},143:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=Object.assign||function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},s=e(1);a.default={data:function(){return{tempFilePaths:"",brandshow:!1,brand:"",uploadbox:!1,resetArr:["brand","color","carType","mileage","spsj","ccsj","auto","outType","ztPrice","lmPrice"],formData:{brandId:"",typeId:"",serialId:"",color:"",carType:"",outType:"",mileage:"",auto:"",spsj:"",ccsj:"",desc:"",ztPrice:"",lmPrice:""},carid:""}},watch:{editinfo:{handler:function(t,a){t&&(this.brand=t.brandName+t.typeName+t.serialName,this.formData={brandId:t.brandId,typeId:t.typeId,serialId:t.serialId,color:t.color,carType:t.carType,outType:t.outType,mileage:t.mileage,auto:t.auto,spsj:t.spsj_year+"-"+t.spsj_month,ccsj:t.ccsj_year+"-"+t.ccsj_month,desc:t.desc,ztPrice:t.ztPrice,lmPrice:t.lmPrice})},deep:!0}},mounted:function(){},computed:i({},(0,s.mapState)(["imagearr","editinfo"])),onLoad:function(t){console.log(t),this.carid=t.id,this.carid&&this.$store.dispatch("getEditinfo",this.carid)},onUnload:function(){var t=this;console.log("public unload"),this.resetArr.forEach(function(a){t.$refs[a].compReset()}),this.SETSTATE({k:"showImage",v:[]}),this.SETSTATE({k:"imagearr",v:[]}),this.brand="",this.formData={brandId:"",typeId:"",serialId:"",color:"",carType:"",outType:"",mileage:"",auto:"",spsj:"",ccsj:"",desc:"",ztPrice:"",lmPrice:""},this.SETSTATE({k:"editinfo",v:null}),this.carid=""},methods:i({},(0,s.mapMutations)(["SETSTATE"]),{getBrandshow:function(t){this.brandshow=t},listChange:function(t,a){console.log(a,t),this.formData[a]=t},choiceBrand:function(t){var a=t.title,e=t.brandId,i=t.typeId,s=t.serialId;console.log(e,i,s),this.brand=a,this.formData.brandId=e,this.formData.typeId=i,this.formData.serialId=s},cancelUpload:function(){this.uploadbox=!1},showUpload:function(){this.uploadbox=!0},conditionCheck:function(){return 0==this.imagearr.length?[!1,"请上传至少一张车辆图片"]:this.formData.typeId?this.formData.color?this.formData.carType?this.formData.mileage?this.formData.spsj?this.formData.ccsj?this.formData.auto?this.formData.outType?this.formData.ztPrice?this.formData.lmPrice?[!0]:[!1,"请输入联盟底价"]:[!1,"请输入展厅标价"]:[!1,"请选择排放"]:[!1,"请输入排量"]:[!1,"请选择出厂日期"]:[!1,"请选择上牌日期"]:[!1,"请输入表显里程"]:[!1,"请选择车型"]:[!1,"请选择车身颜色"]:[!1,"请选择完整的车辆品牌型号"]},toSubmit:function(){var t=this.conditionCheck();if(t[0]){this.formData.spsj=this.formData.spsj.replace("-","年")+"月",this.formData.ccsj=this.formData.ccsj.replace("-","年")+"月",this.carid&&(this.formData.id=this.carid,this.formData.shopId=this.editinfo.shopId);var a=this.imagearr.filter(function(t){return t.key}),e=i({imgs:a.map(function(t){return t.key}).join(",")},this.formData);this.$store.dispatch("carPublic",{option:e})}else wx.showToast({title:t[1],icon:"none"})}})}},144:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{staticClass:"content"},[e("p",{staticClass:"title"},[t._v("车辆图片（最多上传16张）")]),e("view",{staticClass:"picupload",attrs:{eventid:"lyh-0"},on:{click:t.showUpload}},[e("div",{staticClass:"line"},[e("span",{staticClass:"tl"},[t._v("上传图片")]),e("p",{staticClass:"value",staticStyle:{color:"#000"}},[e("span",{directives:[{name:"show",rawName:"v-show",value:t.imagearr.length>0,expression:"imagearr.length > 0"}]},[t._v("已上传"+t._s(t.imagearr.length)+"张图片")]),e("i",{staticClass:"arrow"})],1)],1)]),t.uploadbox?e("div",[e("public-upload",{attrs:{eventid:"fTU-1",mpcomid:"6WS-0"},on:{cancelUpload:t.cancelUpload}})],1):t._e(),e("p",{staticClass:"title"},[t._v("基本信息")]),e("div",{staticClass:"baseinfo"},[e("cv-brand",{ref:"brand",attrs:{defaultData:{brand:this.brand,brandId:this.formData.brandId,typeId:this.formData.typeId,serialId:this.formData.serialId},thirdGrade:!0,eventid:"wr9-2",mpcomid:"2ig-1"},on:{choiceBrand:t.choiceBrand,getBrandshow:t.getBrandshow}}),e("cv-list",{ref:"color",attrs:{defaultData:t.formData.color,name:"车身颜色",type:"color",eventid:"HmC-3",mpcomid:"CRb-2"},on:{listChange:t.listChange}}),e("cv-list",{ref:"carType",attrs:{defaultData:t.formData.carType,name:"车型",type:"carType",eventid:"pkW-4",mpcomid:"VJQ-3"},on:{listChange:t.listChange}}),e("cv-input",{ref:"mileage",attrs:{defaultData:t.formData.mileage,name:"公里数",unit:"万公里",type:"mileage",eventid:"ZUz-5",mpcomid:"wNJ-4"},on:{inputChange:t.listChange}}),e("cv-date",{ref:"spsj",attrs:{defaultData:t.formData.spsj,name:"上牌日期",type:"spsj",eventid:"4hn-6",mpcomid:"WBh-5"},on:{listChange:t.listChange}}),e("cv-date",{ref:"ccsj",attrs:{defaultData:t.formData.ccsj,name:"出厂日期",type:"ccsj",eventid:"0HF-7",mpcomid:"LKJ-6"},on:{listChange:t.listChange}}),e("cv-input",{ref:"auto",attrs:{defaultData:t.formData.auto,name:"排量",unit:"",type:"auto",eventid:"gfl-8",mpcomid:"DOM-7"},on:{inputChange:t.listChange}}),e("cv-list",{ref:"outType",attrs:{defaultData:t.formData.outType,name:"排放",type:"outType",eventid:"sy7-9",mpcomid:"ihi-8"},on:{listChange:t.listChange}}),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.formData.desc,expression:"formData.desc"},{name:"show",rawName:"v-show",value:!t.uploadbox&&!t.brandshow,expression:"!uploadbox && !brandshow"}],staticClass:"cardetail",attrs:{placeholder:"请输入车况描述","placeholder-style":"color: #999;line-height: 40px",name:"desc",id:"",eventid:"yPd-10"},domProps:{value:t.formData.desc},on:{input:function(a){a.target.composing||(t.formData.desc=a.target.value)}}})],1),e("p",{staticClass:"title"},[t._v("价格信息")]),e("div",{staticClass:"priceinfo"},[e("cv-input",{ref:"ztPrice",attrs:{defaultData:t.formData.ztPrice,name:"展厅标价",unit:"万元",type:"ztPrice",eventid:"xKB-11",mpcomid:"sch-9"},on:{inputChange:t.listChange}}),e("cv-input",{ref:"lmPrice",attrs:{defaultData:t.formData.lmPrice,name:"联盟底价",unit:"万元",type:"lmPrice",eventid:"R9j-12",mpcomid:"tE6-10"},on:{inputChange:t.listChange}})],1),e("div",{staticClass:"submit"},[e("button",{attrs:{type:"warn",eventid:"c7n-13"},on:{click:t.toSubmit}},[t._v("发布")])],1)],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]};a.a=s}},[140]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/public/public.js.map