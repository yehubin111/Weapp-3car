require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([8],{107:function(t,e,n){"use strict";var s=a(n(2)),o=a(n(108));function a(t){return t&&t.__esModule?t:{default:t}}new s.default(o.default).$mount()},108:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(110),o=n.n(s),a=n(111),r=!1;var c=function(t){r||n(109)},i=n(0)(o.a,a.a,c,"data-v-7071bd81",null);i.options.__file="Users/yehubin/project/first-uniapp/pages/mycontract/mycontract.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] mycontract.vue: functional components are not supported with templates, they should use render functions."),e.default=i.exports},109:function(t,e){},110:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},o=n(1);e.default={data:function(){return{current:1,size:10}},computed:s({},(0,o.mapState)(["mycontract","mycontracttotal"])),onLoad:function(){this.optionCarload()},methods:{optionCarload:function(t){var e={current:this.current,size:this.size};this.$store.dispatch("getMycontract",{option:e,load:t})}},onPullDownRefresh:function(){this.current=1,this.optionCarload(!0)},onReachBottom:function(){this.mycontract.length!=this.mycontracttotal&&(this.current++,console.log(this.current),this.optionCarload())}}},111:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"content"},t._l(t.mycontract,function(e,s){return n("navigator",{key:s,staticClass:"nav",attrs:{url:"/pages/result/result?contractNo="+e.contractNo}},[n("div",{staticClass:"con"},[n("p",{staticClass:"brand"},[t._v(t._s(e.title))]),n("p",{staticClass:"sellinfo"},[t._v("卖方："),n("span",[t._v(t._s(e.seller))]),t._v("买方："),n("span",[t._v(t._s(e.buyer))])]),n("div",{staticClass:"other"},[n("span",{staticClass:"time"},[t._v(t._s(e.time))]),n("span",{class:{status:!0,nosign:0===e.flag,sign:1==e.flag,finish:2==e.flag}},[t._v(t._s(e.statusName))])])],1)])}))};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o}},[107]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mycontract/mycontract.js.map