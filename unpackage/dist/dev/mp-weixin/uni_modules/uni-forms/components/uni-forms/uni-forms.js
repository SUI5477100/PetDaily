(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-forms/components/uni-forms/uni-forms"],{481:function(e,t,n){"use strict";n.r(t);var r=n(482),a=n(484);for(var i in a)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n(488);var u,l=n(32),o=Object(l["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],u);o.options.__file="uni_modules/uni-forms/components/uni-forms/uni-forms.vue",t["default"]=o.exports},482:function(e,t,n){"use strict";n.r(t);var r=n(483);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},483:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return u})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=!1,u=[];a._withStripped=!0},484:function(e,t,n){"use strict";n.r(t);var r=n(485),a=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},485:function(e,t,n){"use strict";var r=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(56)),i=r(n(58)),u=r(n(11)),l=r(n(486)),o=n(487),s=r(n(25));s.default.prototype.binddata=function(e,t,n){if(n)this.$refs[n].setValue(e,t);else{var r;for(var a in this.$refs){var i=this.$refs[a];if(i&&i.$options&&"uniForms"===i.$options.name){r=i;break}}if(!r)return console.error("当前 uni-froms 组件缺少 ref 属性");r.setValue(e,t)}};var f={name:"uniForms",emits:["validate","submit"],options:{virtualHost:!0},props:{value:{type:Object,default:function(){return null}},modelValue:{type:Object,default:function(){return null}},model:{type:Object,default:function(){return null}},rules:{type:Object,default:function(){return{}}},errShowType:{type:String,default:"undertext"},validateTrigger:{type:String,default:"submit"},labelPosition:{type:String,default:"left"},labelWidth:{type:[String,Number],default:""},labelAlign:{type:String,default:"left"},border:{type:Boolean,default:!1}},provide:function(){return{uniForm:this}},data:function(){return{formData:{},formRules:{}}},computed:{localData:function(){var e=this.model||this.modelValue||this.value;return e?(0,o.deepCopy)(e):{}}},watch:{rules:{handler:function(e,t){this.setRules(e)},deep:!0,immediate:!0}},created:function(){this.childrens=[],this.inputChildrens=[],this.setRules(this.rules)},methods:{setRules:function(e){this.formRules=Object.assign({},this.formRules,e),this.validator=new l.default(e)},setValue:function(e,t){var n=this.childrens.find((function(t){return t.name===e}));return n?(this.formData[e]=(0,o.getValue)(e,t,this.formRules[e]&&this.formRules[e].rules||[]),n.onFieldChange(this.formData[e])):null},validate:function(e,t){return this.checkAll(this.formData,e,t)},validateField:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0;t=[].concat(t);var r={};return this.childrens.forEach((function(n){var a=(0,o.realName)(n.name);-1!==t.indexOf(a)&&(r=Object.assign({},r,(0,u.default)({},a,e.formData[a])))})),this.checkAll(r,[],n)},clearValidate:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e=[].concat(e),this.childrens.forEach((function(t){if(0===e.length)t.errMsg="";else{var n=(0,o.realName)(t.name);-1!==e.indexOf(n)&&(t.errMsg="")}}))},submit:function(e,t,n){var r=this,a=function(e){var t=r.childrens.find((function(t){return t.name===e}));t&&void 0===r.formData[e]&&(r.formData[e]=r._getValue(e,r.dataValue[e]))};for(var i in this.dataValue)a(i);return n||console.warn("submit 方法即将废弃，请使用validate方法代替！"),this.checkAll(this.formData,e,t,"submit")},checkAll:function(e,t,n,r){var u=this;return(0,i.default)(a.default.mark((function i(){var l,s,f,c,d,m,h,v,p,b,g;return a.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(u.validator){i.next=2;break}return i.abrupt("return");case 2:for(f in l=[],s=function(e){var t=u.childrens.find((function(t){return(0,o.realName)(t.name)===e}));t&&l.push(t)},e)s(f);n||"function"!==typeof t||(n=t),!n&&"function"!==typeof n&&Promise&&(c=new Promise((function(e,t){n=function(n,r){n?t(n):e(r)}}))),d=[],m=JSON.parse(JSON.stringify(e)),i.t0=a.default.keys(l);case 10:if((i.t1=i.t0()).done){i.next=23;break}return h=i.t1.value,v=l[h],p=(0,o.realName)(v.name),i.next=16,v.onFieldChange(m[p]);case 16:if(b=i.sent,!b){i.next=21;break}if(d.push(b),"toast"!==u.errShowType&&"modal"!==u.errShowType){i.next=21;break}return i.abrupt("break",23);case 21:i.next=10;break;case 23:if(Array.isArray(d)&&0===d.length&&(d=null),Array.isArray(t)&&t.forEach((function(e){var t=(0,o.realName)(e),n=(0,o.getDataValue)(e,u.localData);void 0!==n&&(m[t]=n)})),"submit"===r?u.$emit("submit",{detail:{value:m,errors:d}}):u.$emit("validate",d),g={},g=(0,o.rawData)(m,u.name),n&&"function"===typeof n&&n(d,g),!c||!n){i.next=33;break}return i.abrupt("return",c);case 33:return i.abrupt("return",null);case 34:case"end":return i.stop()}}),i)})))()},validateCheck:function(e){this.$emit("validate",e)},_getValue:o.getValue,_isRequiredField:o.isRequiredField,_setDataValue:o.setDataValue,_getDataValue:o.getDataValue,_realName:o.realName,_isRealName:o.isRealName,_isEqual:o.isEqual}};t.default=f},488:function(e,t,n){"use strict";n.r(t);var r=n(489),a=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},489:function(e,t,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-forms/components/uni-forms/uni-forms.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-forms/components/uni-forms/uni-forms-create-component',
    {
        'uni_modules/uni-forms/components/uni-forms/uni-forms-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(481))
        })
    },
    [['uni_modules/uni-forms/components/uni-forms/uni-forms-create-component']]
]);
