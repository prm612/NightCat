webpackJsonp([11],{201:function(a,n,t){t(284);var e=t(0)(t(240),t(536),null,null);a.exports=e.exports},240:function(a,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"admin-tag",data:function(){return{addModalShow:!1,active:null,list:[],name:""}},computed:{activeTag:function(){return this.list.length&&null!==this.active?this.list[this.active].name:""},articles:function(){return null!==this.active?this.list[this.active].article:null}},methods:{getTags:function(){var a=this;this.$graphql.query("\n        tags {\n          ...tag\n        }\n      ",["tag"]).then(function(n){a.list=n}).catch(function(n){return a.$toast(n.message,"error")})},addTag:function(){var a=this;this.$graphql.mutation("\n        addTag ($name) {\n          name\n        }\n      ",{name:this.name}).then(function(n){a.$toast("添加成功","success"),a.addModalShow=!1,a.getTags()}).catch(function(n){return a.$toast(n.message,"error")})},removeTag:function(){var a=this;this.$graphql.mutation("\n        removeTag ($name) {\n          name\n        }\n      ",{name:this.activeTag}).then(function(n){a.$toast("删除成功","success"),a.active=null,a.getTags()}).catch(function(n){return a.$toast(n.message,"error")})},clickTag:function(a){this.active=a===this.active?null:a},minusClick:function(){if(!this.activeTag)return this.$toast("请先选中一个标签","warning");this.$prompt("确定删除该标签吗？",this.removeTag)}},mounted:function(){this.getTags()}}},267:function(a,n,t){n=a.exports=t(195)(!0),n.push([a.i,".admin-tag-view{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1;margin:20px 0;display:-webkit-box;display:-ms-flexbox;display:flex}.admin-tag-view .tag-badge{display:inline-block;padding:5px 12px;border:2px solid #ccc;border-radius:20px;cursor:pointer;transition:all .3s;margin-right:10px}.admin-tag-view .tag-badge:hover{border-color:#a6a6a6}.admin-tag-view .tag-badge.active{color:#3da8f5;border-color:#3da8f5}.admin-tag-view .admin-main{-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.admin-tag-view .admin-main,.admin-tag-view .tag-modal{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.admin-tag-view .tag-modal{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.admin-tag-view .tag-modal button{margin-top:20px;-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch}.admin-tag-view .article-wrap,.admin-tag-view .tag-wrap{padding:20px;width:100%;-webkit-box-flex:1;-ms-flex:1;flex:1}.admin-tag-view .article-wrap h1,.admin-tag-view .tag-wrap h1{margin-bottom:10px}.admin-tag-view .article-wrap{background-color:#e5e5e5}","",{version:3,sources:["C:/Users/NightCat/Desktop/server/view/src/views/admin/tag.vue"],names:[],mappings:"AAKA,gBACE,kBAAmB,AACnB,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,cAAe,AACf,oBAAqB,AACrB,oBAAqB,AACrB,YAAc,CACf,AACD,2BACI,qBAAsB,AACtB,iBAAkB,AAClB,sBAAuB,AACvB,mBAAoB,AACpB,eAAgB,AAChB,mBAAoB,AACpB,iBAAmB,CACtB,AACD,iCACM,oBAAsB,CAC3B,AACD,kCACM,cAAe,AACf,oBAAsB,CAC3B,AACD,4BAKI,2BAA4B,AACxB,wBAAyB,AACrB,oBAAsB,CACjC,AACD,uDARI,4BAA6B,AAC7B,6BAA8B,AAC1B,0BAA2B,AACvB,qBAAuB,CAmBlC,AAdD,2BACI,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AAKd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,kBAAoB,CAC/B,AACD,kCACM,gBAAiB,AACjB,4BAA6B,AACzB,2BAA4B,AAC5B,kBAAoB,CAC7B,AACD,wDACI,aAAc,AACd,WAAY,AACZ,mBAAoB,AAChB,WAAY,AACR,MAAQ,CACnB,AACD,8DACM,kBAAoB,CACzB,AACD,8BACI,wBAA0B,CAC7B",file:"tag.vue",sourcesContent:['\n@charset "UTF-8";\n/*\r\n * 基础色\r\n */\n.admin-tag-view {\n  position: relative;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin: 20px 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.admin-tag-view .tag-badge {\n    display: inline-block;\n    padding: 5px 12px;\n    border: 2px solid #ccc;\n    border-radius: 20px;\n    cursor: pointer;\n    transition: all .3s;\n    margin-right: 10px;\n}\n.admin-tag-view .tag-badge:hover {\n      border-color: #a6a6a6;\n}\n.admin-tag-view .tag-badge.active {\n      color: #3da8f5;\n      border-color: #3da8f5;\n}\n.admin-tag-view .admin-main {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n}\n.admin-tag-view .tag-modal {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.admin-tag-view .tag-modal button {\n      margin-top: 20px;\n      -ms-flex-item-align: stretch;\n          -ms-grid-row-align: stretch;\n          align-self: stretch;\n}\n.admin-tag-view .tag-wrap, .admin-tag-view .article-wrap {\n    padding: 20px;\n    width: 100%;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n.admin-tag-view .tag-wrap h1, .admin-tag-view .article-wrap h1 {\n      margin-bottom: 10px;\n}\n.admin-tag-view .article-wrap {\n    background-color: #e5e5e5;\n}\n'],sourceRoot:""}])},284:function(a,n,t){var e=t(267);"string"==typeof e&&(e=[[a.i,e,""]]),e.locals&&(a.exports=e.locals);t(196)("6bf566c5",e,!0)},536:function(a,n){a.exports={render:function(){var a=this,n=a.$createElement,t=a._self._c||n;return t("div",{staticClass:"admin-tag-view"},[t("aside",{staticClass:"aside"},[t("div",{staticClass:"radius-btn blue",on:{click:function(n){a.addModalShow=!0}}},[t("Icon",{attrs:{name:"plus",size:24}})],1),a._v(" "),t("div",{staticClass:"radius-btn red",on:{click:a.minusClick}},[t("Icon",{attrs:{name:"delete",size:24}})],1)]),a._v(" "),t("div",{staticClass:"admin-main"},[a.list.length?[t("div",{staticClass:"tag-wrap"},[t("h1",[a._v("所有标签")]),a._v(" "),t("div",{staticClass:"tag-group"},a._l(a.list,function(n,e){return t("div",{class:["tag-badge",{active:a.active===e}],on:{click:function(n){a.clickTag(e)}}},[a._v("\n            "+a._s(n.name)+"\n            "+a._s(n.count)+"\n          ")])}))]),a._v(" "),t("div",{staticClass:"article-wrap"},[t("h1",[a._v("该标签下的文章")]),a._v(" "),t("div",{staticClass:"tag-group"},a._l(a.articles,function(n,e){return t("a",{key:e,attrs:{href:"/article/"+n._id,target:"_blank"}},[a._v("\n            # "+a._s(n.title)+" ("+a._s(n.release?"已发布":"未发布")+")\n          ")])}))])]:t("div",[a._v("暂无标签")])],2),a._v(" "),t("Modal",{attrs:{"class-name":"tag-modal"},model:{value:a.addModalShow,callback:function(n){a.addModalShow=n},expression:"addModalShow"}},[t("Input",{attrs:{label:"name"},on:{enter:a.addTag},model:{value:a.name,callback:function(n){a.name=n},expression:"name"}}),a._v(" "),t("Btn",{on:{click:a.addTag}},[a._v("OK")])],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=11.1fd39d4f2c262a6e6222.js.map