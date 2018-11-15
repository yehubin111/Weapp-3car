require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([12],{150:function(t,s,a){"use strict";var e=n(a(2)),i=n(a(151));function n(t){return t&&t.__esModule?t:{default:t}}new e.default(i.default).$mount()},151:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a(153),i=a.n(e),n=a(154),l=!1;var o=function(t){l||a(152)},r=a(0)(i.a,n.a,o,"data-v-c7fb47e6",null);r.options.__file="Users/yehubin/project/first-uniapp/pages/cardetail/cardetail.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] cardetail.vue: functional components are not supported with templates, they should use render functions."),s.default=r.exports},152:function(t,s){},153:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var a=arguments[s];for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(t[e]=a[e])}return t},i=a(1);s.default={data:function(){return{carid:"",openid:wx.getStorageSync("3car_openid")}},onShareAppMessage:function(t){var s=this.cardetail[0];return{title:s.title,imageUrl:s.imgs[0].img,path:"/pages/cardetail/cardetail?id="+this.carid+"&openid="+this.openid}},onLoad:function(t){console.log(t),this.carid=t.id;var s=t.openid;this.$store.dispatch("getCardetail",{carid:this.carid,openid:s})},methods:{makePhoneCall:function(t){wx.makePhoneCall({phoneNumber:t})}},computed:e({},(0,i.mapState)(["cardetail"]))}},154:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("view",{staticClass:"content"},t._l(t.cardetail,function(s,e){return a("div",{key:e},[a("div",{staticClass:"focusbox"},[a("swiper",{staticClass:"focus",attrs:{"indicator-dots":"true","indicator-color":"rgba(255, 255, 255, .3)","indicator-active-color":"#fff",autoplay:"true",interval:"5000",duration:"500"}},t._l(s.imgs,function(t,s){return a("swiper-item",{key:s,attrs:{mpcomid:"G66-0-"+e+"-"+s}},[a("image",{staticClass:"slide-image",attrs:{mode:"scaleToFill",src:t.img}})])}))],1),a("div",{staticClass:"nameprice"},[a("p",{staticClass:"name"},[t._v(t._s(s.title))]),a("p",{staticClass:"price"},[a("view",[t._v("展厅标价")]),a("span",{staticClass:"baseprice"},[t._v(t._s(s.ztPrice)+"万")]),s.lmPrice?a("view",[t._v("联盟底价")]):t._e(),s.lmPrice?a("span",[t._v(t._s(s.lmPrice)+"万")]):t._e()])],1),a("div",{staticClass:"baseinfo"},[a("p",{staticClass:"title"},[t._v("\n\t\t\t\t基本信息\n\t\t\t")]),a("ul",{staticClass:"list"},[a("li",[a("p",{staticClass:"name"},[t._v("上牌时间")]),a("p",{staticClass:"value"},[t._v(t._s(s.spsj?s.spsj:"--"))])],1),a("li",[a("p",{staticClass:"name"},[t._v("表显里程")]),a("p",{staticClass:"value"},[t._v(t._s(s.mileage?s.mileage+"万公里":"--"))])],1),a("li",[a("p",{staticClass:"name"},[t._v("所在地")]),a("p",{staticClass:"value"},[t._v(t._s(s.area?s.area:"--"))])],1)],1),a("ul",{staticClass:"list list2"},[a("li",[a("p",{staticClass:"name"},[t._v("排量")]),a("p",{staticClass:"value"},[t._v(t._s(s.auto?s.auto:"--"))])],1),a("li",[a("p",{staticClass:"name"},[t._v("变速箱")]),a("p",{staticClass:"value"},[t._v(t._s(s.gear?s.gear:"--"))])],1),a("li",[a("p",{staticClass:"name"},[t._v("排放")]),a("p",{staticClass:"value"},[t._v(t._s(s.outType?s.outType:"--"))])],1)],1),a("p",{staticClass:"line"}),a("p",{staticClass:"introduce"},[t._v("\n\t\t\t\t车况描述："+t._s(s.desc)+"\n\t\t\t")])],1),a("div",{staticClass:"shop"},[a("p",{staticClass:"title"},[t._v("\n\t\t\t\t商家信息\n\t\t\t")]),a("div",{staticClass:"shopinfo"},[a("p",{staticClass:"head"},[a("image",{attrs:{src:s.shop.logo}})]),a("div",{staticClass:"info"},[a("p",{staticClass:"sname"},[t._v(t._s(s.shop.name?s.shop.name:"--"))]),a("p",{staticClass:"person"},[t._v(t._s(s.shop.boss?s.shop.boss:"--"))]),a("p",{staticClass:"local"},[t._v(t._s(s.shop.addr?s.shop.addr:"--"))]),a("p",{staticClass:"tel",attrs:{eventid:"Tm7-0-"+e},on:{click:function(a){a.preventDefault(),a.stopPropagation(),t.makePhoneCall(s.shop.tel)}}},[t._v("\n\t\t\t\t\t\t联系商家\n\t\t\t\t\t")])],1)],1)],1),a("div",{staticClass:"picture"},[a("p",{staticClass:"title"},[t._v("\n\t\t\t\t车辆图片\n\t\t\t")]),a("div",{staticClass:"list"},t._l(s.imgs,function(t,s){return a("image",{key:s,attrs:{mode:"widthFix",src:t.img}})}))],1),a("div",{staticClass:"bottom"},[a("p",{attrs:{eventid:"DA4-1-"+e},on:{click:function(a){a.preventDefault(),a.stopPropagation(),t.makePhoneCall(s.shop.tel)}}},[t._v("\n\t\t\t\t联系商家\n\t\t\t")])],1)])}))};e._withStripped=!0;var i={render:e,staticRenderFns:[]};s.a=i}},[150]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cardetail/cardetail.js.map