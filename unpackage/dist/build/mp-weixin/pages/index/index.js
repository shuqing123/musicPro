(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"29e1":function(n,t,e){"use strict";var r=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return r}),e.d(t,"b",function(){return i})},"3f94":function(n,t,e){"use strict";e.r(t);var r=e("ff7c"),i=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,function(){return r[n]})}(u);t["default"]=i.a},"5a0b":function(n,t,e){"use strict";var r=e("fa34"),i=e.n(r);i.a},d420:function(n,t,e){"use strict";e.r(t);var r=e("29e1"),i=e("3f94");for(var u in i)"default"!==u&&function(n){e.d(t,n,function(){return i[n]})}(u);e("5a0b");var o=e("2877"),a=Object(o["a"])(i["default"],r["a"],r["b"],!1,null,null,null);t["default"]=a.exports},fa34:function(n,t,e){},ff7c:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(e("2f62"));function i(n){return n&&n.__esModule?n:{default:n}}function u(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},r=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.forEach(function(t){o(n,t,e[t])})}return n}function o(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function a(n){return l(n)||s(n)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}function l(n){if(Array.isArray(n)){for(var t=0,e=new Array(n.length);t<n.length;t++)e[t]=n[t];return e}}var f=function(){return e.e("components/uni-list/uni-list").then(e.bind(null,"8920"))},d=function(){return e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"357e"))},p=function(){return e.e("components/uni-drawer/uni-drawer").then(e.bind(null,"2ebe"))},b=function(){return e.e("components/player/player").then(e.bind(null,"bbca"))},m={data:function(){return{banner:[],list:[],visible:!1}},onLoad:function(){var t=this;n.request({url:"https://api.wulv5.com/music/banner",success:function(n){t.banner=n.data.banners}}),n.request({url:"https://api.wulv5.com/music/personalized",success:function(n){t.list=n.data.result}}),n.request({url:"https://api.wulv5.com/music/personalized/newsong",success:function(n){a(n.data.result).forEach(function(n){t.getSrc(n)})}})},onNavigationBarButtonTap:function(n){this["top"+n.index]()},methods:u({},r.default.mapActions(["getSrc"]),{top0:function(){this.visible=!0},top1:function(){n.navigateTo({url:"/pages/search/search"})},closeDrawer:function(){this.visible=!1},tiao:function(){n.navigateTo({url:"/pages/history/history"})}}),components:{uniList:f,uniListItem:d,uniDrawer:p,player:b}};t.default=m}).call(this,e("543d")["default"])}},[["8cd1","common/runtime","common/vendor"]]]);