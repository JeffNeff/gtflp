(this["webpackJsonpeasydev-seed-without-redux"]=this["webpackJsonpeasydev-seed-without-redux"]||[]).push([[0],{190:function(e,t,n){},265:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),i=n(11),s=n.n(i),o=n(13),r=n(32),l=(n(189),n(190),n(15)),j=n(16),b=n.n(j),d=n(2),u="".concat("","/img/burger.svg"),h=function(e){var t=e.changeMobileSidebarVisibility,n=e.changeSidebarVisibility;return Object(d.jsxs)("div",{children:[Object(d.jsx)("button",{type:"button",className:"topbar__button topbar__button--desktop",onClick:n,children:Object(d.jsx)("img",{src:u,alt:"",className:"topbar__button-icon"})}),Object(d.jsx)("button",{type:"button",className:"topbar__button topbar__button--mobile",onClick:t,children:Object(d.jsx)("img",{src:u,alt:"",className:"topbar__button-icon"})})]})},O=(n(192),"".concat("","/img/ava.png"),function(){var e=Object(c.useState)(!1),t=Object(o.a)(e,2);t[0],t[1];return Object(d.jsx)("div",{className:"topbar__profile"})}),p=function(e){var t=e.changeMobileSidebarVisibility,n=e.changeSidebarVisibility;return Object(d.jsx)("div",{className:"topbar",children:Object(d.jsxs)("div",{className:"topbar__wrapper",children:[Object(d.jsxs)("div",{className:"topbar__left",children:[Object(d.jsx)(h,{changeMobileSidebarVisibility:t,changeSidebarVisibility:n}),Object(d.jsx)(r.b,{className:"topbar__logo",to:"/online_marketing_dashboard"})]}),Object(d.jsx)("div",{className:"topbar__right",children:Object(d.jsx)(O,{})})]})})},x=n(157),g=n.n(x),v=n(300),m=function(e){var t=e.title,n=e.icon,c=e.newLink,a=e.route,i=e.onClick;return Object(d.jsx)(r.c,{to:a,onClick:i,activeClassName:"sidebar__link-active",children:Object(d.jsxs)("li",{className:"sidebar__link",children:[n?Object(d.jsx)("span",{className:"sidebar__link-icon lnr lnr-".concat(n)}):"",Object(d.jsxs)("p",{className:"sidebar__link-title",children:[t,c?Object(d.jsx)(v.a,{className:"sidebar__link-badge",children:Object(d.jsx)("span",{children:"New"})}):""]})]})})};m.defaultProps={icon:"",newLink:!1,route:"/",onClick:function(){}};var f=m,_=n(301),w=function(e){var t=e.title,n=e.icon,a=e.isNew,i=e.children,s=Object(c.useState)(!1),r=Object(o.a)(s,2),l=r[0],j=r[1],u=b()({"sidebar__category-wrap":!0,"sidebar__category-wrap--open":l});return Object(d.jsxs)("div",{className:u,children:[Object(d.jsxs)("button",{type:"button",className:"sidebar__link sidebar__category",onClick:function(){j(!l)},children:[n?Object(d.jsx)("span",{className:"sidebar__link-icon lnr lnr-".concat(n)}):"",Object(d.jsxs)("p",{className:"sidebar__link-title",children:[t,a&&Object(d.jsx)("span",{className:"sidebar__category-new"})]}),Object(d.jsx)("span",{className:"sidebar__category-icon lnr lnr-chevron-right"})]}),Object(d.jsx)(_.a,{isOpen:l,className:"sidebar__submenu-wrap",children:Object(d.jsx)("ul",{className:"sidebar__submenu",children:Object(d.jsx)("div",{children:i})})})]})};w.defaultProps={icon:"",isNew:!1};var N=w,y=function(e){var t=e.onClick,n=function(){t()};return Object(d.jsx)("div",{className:"sidebar__content",children:Object(d.jsx)("ul",{className:"sidebar__block",children:Object(d.jsxs)(N,{title:"Tools",icon:"diamond",children:[Object(d.jsx)(f,{title:"Log Scanner",route:"/LogScanner",onClick:n}),Object(d.jsx)(f,{title:"Event Viewer",route:"/EventViewer",onClick:n}),Object(d.jsx)(f,{title:"Event Injection",route:"/EventInjection",onClick:n})]})})})},S=function(e){var t=e.changeMobileSidebarVisibility,n=e.sidebarShow,c=e.sidebarCollapse,a=b()({sidebar:!0,"sidebar--show":n,"sidebar--collapse":c});return Object(d.jsxs)("div",{className:a,children:[Object(d.jsx)("button",{type:"button","aria-label":"sidebar visibility",className:"sidebar__back",onClick:t}),Object(d.jsxs)(g.a,{className:"sidebar__scroll scroll",children:[Object(d.jsx)("div",{className:"sidebar__wrapper sidebar__wrapper--desktop",children:Object(d.jsx)(y,{onClick:function(){}})}),Object(d.jsx)("div",{className:"sidebar__wrapper sidebar__wrapper--mobile",children:Object(d.jsx)(y,{onClick:t})})]})]})},C=Object(l.f)((function(){var e=Object(c.useState)(!1),t=Object(o.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)(!1),s=Object(o.a)(i,2),r=s[0],l=s[1],j=b()({layout:!0,"layout--collapse":r}),u=function(){a(!n)};return Object(d.jsxs)("div",{className:j,children:[Object(d.jsx)(p,{changeMobileSidebarVisibility:u,changeSidebarVisibility:function(){l(!r)}}),Object(d.jsx)(S,{sidebarShow:n,sidebarCollapse:r,changeMobileSidebarVisibility:u})]})})),k=function(e){var t=e.children;return Object(d.jsx)("div",{className:"theme-light",children:Object(d.jsx)("div",{className:"wrapper",children:t})})},V=n(305),L=n(306),E=n(76),I=n.n(E),M=n(302),D=n(303),T=n(304),J=n(145);var P=function(e){return Object(d.jsx)(M.a,{md:12,children:Object(d.jsx)(D.a,{children:Object(d.jsx)(T.a,{children:Object(d.jsx)("div",{children:e.messages.map((function(e,t){var n=e.search(":");if(!(e.substring(0,10).search("gtflp")>-1)){var c=e.substring(0,n),a=e.substring(n+1,e.length);return Object(d.jsxs)("div",{children:[Object(d.jsx)("h3",{className:"bold-text",children:c}),Object(d.jsx)(I.a,{json:a,theme:J})]},t)}}))})})})})},W=n(50),A=n.n(W),R=n(64);var B=function(){var e=Object(c.useState)([]),t=Object(o.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)([]),s=Object(o.a)(i,2),r=s[0],l=s[1];return Object(c.useEffect)((function(){window.addEventListener("beforeunload",(function(e){e.preventDefault(),onClose(),e.returnValue=""})),console.log("Protocol: "+window.location.protocol);var e="ws://"+document.location.host+"/lws";"https:"===window.location.protocol&&(e="wss://"+document.location.host+"/lws"),console.log("WS URL: "+e);var t=new R.a(e);return t.onopen=function(){console.log("connected to "+e)},t.onclose=function(e){console.log("connection closed ("+e.code+")")},t.onmessage=function(e){var t=JSON.parse(e.data);0==r.includes(t.pod)&&(l(r.concat(t.pod)),console.log(r)),a(n.concat(t.pod+" : "+t.message))},function(){}})),Object(d.jsxs)(V.a,{children:[Object(d.jsx)("h3",{className:"page-title",children:"Log Scanner:"}),Object(d.jsx)("h5",{children:" Load new pod logs from running resources in the namespace "}),Object(d.jsx)(L.a,{children:Object(d.jsx)(P,{messages:n,podNames:r})})]})},U=n(145);var q=function(){var e=a.a.useState([]),t=Object(o.a)(e,2),n=t[0],i=t[1],s={origin:"*"};return Object(c.useEffect)((function(){window.addEventListener("beforeunload",(function(e){e.preventDefault(),console.log("CLOSING"),A.a.post("/wsclose",{},s).then((function(e){console.log(e)})).catch((function(e){console.log(e)})),e.returnValue=""})),console.log("Protocol: "+window.location.protocol);var e="ws://"+document.location.host+"/ws";"https:"===window.location.protocol&&(e="wss://"+document.location.host+"/ws"),console.log("WS URL: "+e);var t=new R.a(e);return t.onopen=function(){console.log("connected to "+e)},t.onclose=function(e){console.log("connection closed ("+e.code+")")},t.onmessage=function(e){var t=JSON.parse(e.data);console.log(t),i(n.concat(t))},function(){t.close()}})),Object(d.jsxs)(V.a,{children:[Object(d.jsx)("h3",{className:"page-title",children:"Event Viewer:"}),Object(d.jsx)("h5",{children:" View Cloudevents here! "}),Object(d.jsx)(L.a,{children:n.map((function(e,t){return Object(d.jsx)("div",{children:Object(d.jsx)(I.a,{json:e,theme:U})},t)}))})]})},G=n(307),H=n(20),Z=n(317),$=n(310),z=n(312),F=n(313),K=n(319),Q=n(321),X=n(316),Y=n(318),ee=n(50);function te(e){var t=e.destinations,n=e.destination,c=a.a.useState("0123211"),i=Object(o.a)(c,2),s=i[0],r=i[1],l=a.a.useState("test.type"),j=Object(o.a)(l,2),b=j[0],u=j[1],h=a.a.useState("test.source"),O=Object(o.a)(h,2),p=O[0],x=O[1],g=a.a.useState("application/json"),v=Object(o.a)(g,2),m=v[0],f=v[1],_=a.a.useState('{"test":"data"}'),w=Object(o.a)(_,2),N=w[0],y=w[1],S=a.a.useState(n),C=Object(o.a)(S,2),k=C[0],V=C[1],L={width:"380px"},E={origin:"*"};Object(G.a)((function(e){return{root:{paddingLeft:e.spacing(0),paddingRight:e.spacing(1)},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(H.d)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{flex:"1 1 100%",paddingLeft:8}}}))();return Object(d.jsxs)($.a,{children:["ID:",Object(d.jsx)(z.a,{children:Object(d.jsx)(F.a,{style:L,children:Object(d.jsx)(K.a,{id:"input-injection-ceid",value:s,onChange:function(e){return r(e.target.value)}})})}),"Type:",Object(d.jsx)(z.a,{children:Object(d.jsx)(F.a,{style:L,children:Object(d.jsx)(K.a,{id:"input-injection-type",value:b,onChange:function(e){return u(e.target.value)}})})}),"Source:",Object(d.jsx)(z.a,{children:Object(d.jsx)(F.a,{style:L,children:Object(d.jsx)(K.a,{id:"input-injection-source",value:p,onChange:function(e){return x(e.target.value)}})})}),"Content-Type:",Object(d.jsx)(z.a,{children:Object(d.jsx)(F.a,{style:L,children:Object(d.jsx)(K.a,{id:"input-injection-contenttype",value:m,onChange:function(e){return f(e.target.value)}})})}),"Avalible Destinations:",Object(d.jsx)(z.a,{children:Object(d.jsx)(F.a,{style:L,children:Object(d.jsx)(Z.a,{onChange:function(e){return V(e.target.value)},children:t.map((function(e,t){return Object(d.jsx)(Q.a,{value:e,children:e})}))})})}),"Custom Destination:",Object(d.jsx)(z.a,{children:Object(d.jsx)(F.a,{style:L,children:Object(d.jsx)(K.a,{id:"input-injection-add",onChange:function(e){return V(e.target.value)}})})}),"Data:",Object(d.jsx)(z.a,{children:Object(d.jsx)(F.a,{style:L,children:Object(d.jsx)(Y.a,{id:"input-injection-data",value:N,onChange:function(e){return y(e.target.value)}})})}),Object(d.jsx)(z.a,{children:Object(d.jsx)(F.a,{style:L,children:Object(d.jsx)(X.a,{id:"input-injection-button",label:"Submit",onClick:function(e){ee.post("/inject",{destination:k,data:N,headers:{"Ce-Id":s,"Ce-Specversion":"1.0","Ce-Type":b,"Ce-Source":p,"Content-Type":m}},E).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))},children:"Send"})})})]})}var ne=function(){var e={origin:"*"},t=Object(c.useState)([]),n=Object(o.a)(t,2),a=n[0],i=n[1];return A.a.post("/queryservices",{},e).then((function(e){console.log(e.data),i(e.data)})).catch((function(e){console.log(e)})),Object(d.jsxs)(V.a,{children:[Object(d.jsx)("h3",{className:"page-title",children:"Cloudevent Injection:"}),Object(d.jsx)("h5",{children:" Inject Cloudevents into the namespace "}),Object(d.jsx)(L.a,{children:Object(d.jsx)(te,{destinations:a})})]})},ce=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)(C,{}),Object(d.jsxs)("div",{className:"container__wrap",children:[Object(d.jsx)(l.a,{path:"/LogScanner",component:B}),Object(d.jsx)(l.a,{path:"/EventViewer",component:q}),Object(d.jsx)(l.a,{path:"/EventInjection",component:ne})]})]})},ae=function(){return Object(d.jsx)(k,{children:Object(d.jsx)("main",{children:Object(d.jsx)(l.c,{children:Object(d.jsx)(l.a,{path:"/",component:ce})})})})},ie=function(){var e=Object(c.useState)(!0),t=Object(o.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)(!1),s=Object(o.a)(i,2),l=s[0],j=s[1];return Object(c.useEffect)((function(){window.addEventListener("load",(function(){a(!1),setTimeout((function(){return j(!0)}),500)}))}),[]),Object(d.jsxs)(r.a,{children:[!l&&Object(d.jsx)("div",{className:"load".concat(n?"":" loaded"),children:Object(d.jsx)("div",{className:"load__icon-wrap",children:Object(d.jsx)("svg",{className:"load__icon",children:Object(d.jsx)("path",{fill:"#4ce1b6",d:"M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"})})})}),Object(d.jsx)("div",{children:Object(d.jsx)(ae,{})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(ie,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[265,1,2]]]);
//# sourceMappingURL=main.c432671d.chunk.js.map