(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{295:function(t,e,n){var content=n(302);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(68).default)("c2edc08c",content,!0,{sourceMap:!1})},301:function(t,e,n){"use strict";n(295)},302:function(t,e,n){var o=n(67)((function(i){return i[1]}));o.push([t.i,".slide-enter-active,.slide-leave-active{transition:transform .3s ease}.slide-enter,.slide-leave-to{transform:translateX(100%);transition:all .3s ease-in 0s}.sidebar-backdrop{opacity:1;background-color:hsla(0,0%,100%,.1);width:100vw;height:100vh;position:fixed;top:0;left:0;cursor:pointer}.backdrop-enter-from,.backdrop-leave-to{transition:opacity .5s ease;opacity:0}.sidebar-panel{overflow-y:auto;position:fixed;right:0;top:0;height:100vh;z-index:999;padding:3rem 20px 2rem;width:500px}.nuxt-content{font-weight:100}",""]),o.locals={},t.exports=o},311:function(t,e,n){"use strict";n.r(e);var o=n(9),r=(n(48),{data:function(){return{projectPage:{}}},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$content(t.$store.state.selectedProjectPath).fetch();case 2:t.projectPage=e.sent;case 3:case"end":return e.stop()}}),e)})))()},computed:{isPanelOpen:function(){return this.$store.state.isNavOpen}},watch:{"$store.state.selectedProjectPath":"$fetch"},methods:{closeSidebarPanel:function(){this.$store.commit("toggleNav")},clickTag:function(t){this.closeSidebarPanel(),this.$store.commit("setSearchText",t)}}}),c=(n(301),n(47)),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"sidebar"},[e("transition",{attrs:{name:"backdrop"}},[t.isPanelOpen?e("div",{staticClass:"sidebar-backdrop pointer-events-auto",on:{click:t.closeSidebarPanel}}):t._e()]),t._v(" "),e("transition",{attrs:{name:"slide"}},[t.isPanelOpen?e("div",{staticClass:"sidebar-panel bg-neutral-900 overflow-y-auto"},[t.$fetchState.pending?e("p",{staticClass:"font-bold"},[t._v("Loading....")]):e("div",{staticClass:"p-2"},[e("h1",{staticClass:"text-3xl font-bold px-6"},[t._v(" "+t._s(t.projectPage.emoji)+" "+t._s(t.projectPage.title)+" ")]),t._v(" "),e("h2",{staticClass:"text-l italic px-6"},[t._v(t._s(t.projectPage.date))]),t._v(" "),e("div",{staticClass:"mt-6 px-6"},[e("nuxt-content",{attrs:{document:t.projectPage}})],1),t._v(" "),e("div",{staticClass:"mt-6 p-4 rounded-3xl bg-neutral-800"},[e("div",{staticClass:"font-bold text-lg"},[t._v("Tags:")]),t._v(" "),e("ul",{staticClass:"flex flex-wrap text-base gap-x-3 gap-y-3 mt-3"},t._l(t.projectPage.tags,(function(n){return e("li",{staticClass:"bg-neutral-700 hover:bg-[#9f9f9f] hover:cursor-pointer rounded-full px-2 inline-block",on:{click:function(e){return t.clickTag(n)}}},[t._v(t._s(n)+" ")])})),0)])])]):t._e()])],1)}),[],!1,null,null,null);e.default=component.exports}}]);