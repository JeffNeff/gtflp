(this["webpackJsonpeasydev-seed-without-redux"]=this["webpackJsonpeasydev-seed-without-redux"]||[]).push([[0],{192:function(e,t,n){},270:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),o=n(12),i=n.n(o),s=n(8),l=n(36),r=(n(191),n(192),n(15)),j=n(16),b=n.n(j),d=n(1),u="".concat("","/img/burger.svg"),h=function(e){var t=e.changeMobileSidebarVisibility,n=e.changeSidebarVisibility;return Object(d.jsxs)("div",{children:[Object(d.jsx)("button",{type:"button",className:"topbar__button topbar__button--desktop",onClick:n,children:Object(d.jsx)("img",{src:u,alt:"",className:"topbar__button-icon"})}),Object(d.jsx)("button",{type:"button",className:"topbar__button topbar__button--mobile",onClick:t,children:Object(d.jsx)("img",{src:u,alt:"",className:"topbar__button-icon"})})]})},O=(n(194),"".concat("","/img/ava.png"),function(){var e=Object(c.useState)(!1),t=Object(s.a)(e,2);t[0],t[1];return Object(d.jsx)("div",{className:"topbar__profile"})}),f=function(e){var t=e.changeMobileSidebarVisibility,n=e.changeSidebarVisibility;return Object(d.jsx)("div",{className:"topbar",children:Object(d.jsxs)("div",{className:"topbar__wrapper",children:[Object(d.jsxs)("div",{className:"topbar__left",children:[Object(d.jsx)(h,{changeMobileSidebarVisibility:t,changeSidebarVisibility:n}),Object(d.jsx)(l.b,{className:"topbar__logo",to:"/"})]}),Object(d.jsx)("div",{className:"topbar__right",children:Object(d.jsx)(O,{})})]})})},x=n(158),p=n.n(x),g=n(304),v=function(e){var t=e.title,n=e.icon,c=e.newLink,a=e.route,o=e.onClick;return Object(d.jsx)(l.c,{to:a,onClick:o,activeClassName:"sidebar__link-active",children:Object(d.jsxs)("li",{className:"sidebar__link",children:[n?Object(d.jsx)("span",{className:"sidebar__link-icon lnr lnr-".concat(n)}):"",Object(d.jsxs)("p",{className:"sidebar__link-title",children:[t,c?Object(d.jsx)(g.a,{className:"sidebar__link-badge",children:Object(d.jsx)("span",{children:"New"})}):""]})]})})};v.defaultProps={icon:"",newLink:!1,route:"/",onClick:function(){}};var m=v,w=n(305),C=function(e){var t=e.title,n=e.icon,a=e.isNew,o=e.children,i=Object(c.useState)(!1),l=Object(s.a)(i,2),r=l[0],j=l[1],u=b()({"sidebar__category-wrap":!0,"sidebar__category-wrap--open":r});return Object(d.jsxs)("div",{className:u,children:[Object(d.jsxs)("button",{type:"button",className:"sidebar__link sidebar__category",onClick:function(){j(!r)},children:[n?Object(d.jsx)("span",{className:"sidebar__link-icon lnr lnr-".concat(n)}):"",Object(d.jsxs)("p",{className:"sidebar__link-title",children:[t,a&&Object(d.jsx)("span",{className:"sidebar__category-new"})]}),Object(d.jsx)("span",{className:"sidebar__category-icon lnr lnr-chevron-right"})]}),Object(d.jsx)(w.a,{isOpen:r,className:"sidebar__submenu-wrap",children:Object(d.jsx)("ul",{className:"sidebar__submenu",children:Object(d.jsx)("div",{children:o})})})]})};C.defaultProps={icon:"",isNew:!1};var k=C,_=function(e){var t=e.onClick,n=function(){t()};return Object(d.jsx)("div",{className:"sidebar__content",children:Object(d.jsx)("ul",{className:"sidebar__block",children:Object(d.jsxs)(k,{title:"Tools",icon:"diamond",children:[Object(d.jsx)(m,{title:"Log Scanner",route:"/LogScanner",onClick:n}),Object(d.jsx)(m,{title:"Cloud Events",route:"/EventInjection",onClick:n}),Object(d.jsx)(m,{title:"Pod Viewer",route:"/Pods",onClick:n}),Object(d.jsx)(m,{title:"KSVC Viewer",route:"/ksvc",onClick:n}),Object(d.jsx)(m,{title:"Broker Viewer",route:"/Brokers",onClick:n}),Object(d.jsx)(m,{title:"Trigger Viewer",route:"/Triggers",onClick:n})]})})})},S=function(e){var t=e.changeMobileSidebarVisibility,n=e.sidebarShow,c=e.sidebarCollapse,a=b()({sidebar:!0,"sidebar--show":n,"sidebar--collapse":c});return Object(d.jsxs)("div",{className:a,children:[Object(d.jsx)("button",{type:"button","aria-label":"sidebar visibility",className:"sidebar__back",onClick:t}),Object(d.jsxs)(p.a,{className:"sidebar__scroll scroll",children:[Object(d.jsx)("div",{className:"sidebar__wrapper sidebar__wrapper--desktop",children:Object(d.jsx)(_,{onClick:function(){}})}),Object(d.jsx)("div",{className:"sidebar__wrapper sidebar__wrapper--mobile",children:Object(d.jsx)(_,{onClick:t})})]})]})},y=Object(r.f)((function(){var e=Object(c.useState)(!1),t=Object(s.a)(e,2),n=t[0],a=t[1],o=Object(c.useState)(!1),i=Object(s.a)(o,2),l=i[0],r=i[1],j=b()({layout:!0,"layout--collapse":l}),u=function(){a(!n)};return Object(d.jsxs)("div",{className:j,children:["\\",Object(d.jsx)(f,{changeMobileSidebarVisibility:u,changeSidebarVisibility:function(){r(!l)}}),Object(d.jsx)(S,{sidebarShow:n,sidebarCollapse:l,changeMobileSidebarVisibility:u})]})})),N=function(e){var t=e.children;return Object(d.jsx)("div",{className:"theme-light",children:Object(d.jsx)("div",{className:"wrapper",children:t})})},V=n(309),L=n(314),E=n(21),I=n.n(E),M=n(306),T=n(307),P=n(308),z=n(45);var R=function(e){return Object(d.jsx)(M.a,{md:12,children:Object(d.jsx)(T.a,{children:Object(d.jsx)(P.a,{children:Object(d.jsx)("div",{children:e.messages.map((function(t,n){var c=t.search(":");if(!(t.search("gtflp")>-1)){var a=t.substring(0,c),o=t.substring(c+1,t.length);return Object(d.jsxs)("div",{children:[Object(d.jsx)("h3",{className:"bold-text",children:a}),Object(d.jsx)(I.a,{style:{fontSize:e.logsize},json:o,theme:z})]},n)}}))})})})})},B=n(46),D=n(310),K=n(20),J=Object(K.a)("count");var W=function(){var e=Object(c.useState)([]),t=Object(s.a)(e,2),n=t[0],a=t[1],o=Object(c.useState)([]),i=Object(s.a)(o,2),l=i[0],r=i[1],j=J(10),b=Object(s.a)(j,2),u=b[0],h=b[1];return Object(c.useEffect)((function(){console.log("Protocol: "+window.location.protocol);var e="ws://"+document.location.host+"/lws";"https:"===window.location.protocol&&(e="wss://"+document.location.host+"/lws"),console.log("WS URL: "+e);var t=new B.a(e);return t.onopen=function(){console.log("connected to "+e)},t.onclose=function(e){console.log("connection closed ("+e.code+")")},t.onmessage=function(e){var t=JSON.parse(e.data);console.log(t),0==l.includes(t.pod)&&r(l.concat(t.pod)),a(n.concat(t.pod+" : "+t.message))},function(){t.close()}})),Object(d.jsxs)(V.a,{children:[Object(d.jsx)("h3",{className:"page-title",children:"Log Scanner:"}),Object(d.jsx)("h5",{children:" Load new pod logs from running resources in the namespace "}),Object(d.jsx)(D.a,{label:"-",onClick:function(){h(u-5)},children:"-"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){h(u+5)},children:"+"}),Object(d.jsx)(L.a,{children:Object(d.jsx)(R,{messages:n,podNames:l,logsize:u})})]})},A=n(22),U=n.n(A),q=Object(K.a)("count"),H=n(45);var Z=function(){var e=q([]),t=Object(s.a)(e,2),n=t[0],a=t[1],o=q(10),i=Object(s.a)(o,2),l=i[0],r=i[1];return Object(c.useEffect)((function(){window.addEventListener("beforeunload",(function(e){e.preventDefault(),onClose(),e.returnValue=""})),console.log("Protocol: "+window.location.protocol);var e="ws://"+document.location.host+"/ws";"https:"===window.location.protocol&&(e="wss://"+document.location.host+"/ws"),e="ws://localhost:8080/ws",console.log("WS URL: "+e);var t=new B.a(e);return t.onopen=function(){console.log("connected to "+e)},t.onclose=function(e){console.log("connection closed ("+e.code+")")},t.onmessage=function(e){var t=JSON.parse(e.data);console.log(t),a(n.concat(t))},function(){t.close()}})),Object(d.jsxs)(V.a,{children:[Object(d.jsx)("h3",{className:"page-title",children:"Event Viewer:"}),Object(d.jsx)("h5",{children:" View Cloudevents here! "}),Object(d.jsx)(D.a,{label:"-",onClick:function(){r(l-5)},children:"-"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){r(l+5)},children:"+"}),n.map((function(e,t){return Object(d.jsx)(M.a,{md:12,children:Object(d.jsx)(T.a,{children:Object(d.jsx)(P.a,{children:Object(d.jsx)("div",{children:Object(d.jsx)(L.a,{children:Object(d.jsx)(I.a,{style:{fontSize:l},json:e,theme:H})})},t)})})})}))]})},$=n(315),F=n(23),G=n(321),Q=n(316),X=n(317),Y=n(318),ee=n(323),te=n(325),ne=n(322),ce=n(22);function ae(e){var t=Object(c.useState)([]),n=Object(s.a)(t,2),o=n[0],i=n[1];var l=e.destination,r=a.a.useState("0123211"),j=Object(s.a)(r,2),b=j[0],u=j[1],h=a.a.useState("test.type"),O=Object(s.a)(h,2),f=O[0],x=O[1],p=a.a.useState("test.source"),g=Object(s.a)(p,2),v=g[0],m=g[1],w=a.a.useState("application/json"),C=Object(s.a)(w,2),k=C[0],_=C[1],S=a.a.useState('{"test":"data"}'),y=Object(s.a)(S,2),N=y[0],V=y[1],L=a.a.useState(l),E=Object(s.a)(L,2),I=E[0],M=E[1],T={origin:"*"};Object($.a)((function(e){return{root:{paddingLeft:e.spacing(0),paddingRight:e.spacing(1)},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(F.d)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{flex:"1 1 100%",paddingLeft:8}}}))();return Object(d.jsxs)(Q.a,{class:"pure-form",children:[Object(d.jsx)(X.a,{class:"pure-form",children:Object(d.jsxs)(Y.a,{children:["ID:",Object(d.jsx)(ee.a,{class:"pure-form",id:"input-injection-ceid",value:b,onChange:function(e){return u(e.target.value)}})]})}),Object(d.jsx)(X.a,{children:Object(d.jsxs)(Y.a,{children:["Type",Object(d.jsx)(ee.a,{class:"pure-form",id:"input-injection-type",value:f,onChange:function(e){return x(e.target.value)}})]})}),Object(d.jsxs)(X.a,{children:["Source",Object(d.jsx)(Y.a,{class:"pure-form",children:Object(d.jsx)(ee.a,{id:"input-injection-source",value:v,onChange:function(e){return m(e.target.value)}})})]}),Object(d.jsxs)(X.a,{children:["Content-Type",Object(d.jsx)(Y.a,{class:"pure-form",children:Object(d.jsx)(ee.a,{label:"",id:"input-injection-contenttype",value:k,onChange:function(e){return _(e.target.value)}})})]}),Object(d.jsx)("p1",{class:"pure-form",children:" Avalible Destinations: "}),Object(d.jsx)(X.a,{children:Object(d.jsx)(Y.a,{style:{width:"190px"},children:Object(d.jsx)(G.a,{onChange:function(e){return M(e.target.value)},children:o.map((function(e,t){return Object(d.jsx)(te.a,{value:e,children:e})}))})})}),Object(d.jsx)(X.a,{children:Object(d.jsx)(D.a,{onClick:function(){ce.post("/queryservices",{},T).then((function(e){console.log(e.data),i(e.data)})).catch((function(e){console.log(e)}))},children:"Refresh Destinations"})}),Object(d.jsx)("p1",{class:"pure-form",children:" Custom Destination: "}),Object(d.jsx)(X.a,{children:Object(d.jsx)(Y.a,{class:"pure-form",children:Object(d.jsx)(ee.a,{id:"input-injection-add",onChange:function(e){return M(e.target.value)}})})}),Object(d.jsx)(X.a,{children:Object(d.jsxs)(Y.a,{class:"pure-form",children:["Data:",Object(d.jsx)(ne.a,{id:"input-injection-data",value:N,onChange:function(e){return V(e.target.value)}})]})}),Object(d.jsx)(X.a,{children:Object(d.jsx)(Y.a,{class:"pure-form",children:Object(d.jsx)(D.a,{id:"input-injection-button",label:"Submit",onClick:function(e){ce.post("/inject",{destination:I,data:N,headers:{"Ce-Id":b,"Ce-Specversion":"1.0","Ce-Type":f,"Ce-Source":v,"Content-Type":k}},T).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))},children:"Send"})})})]})}var oe=Object(K.a)("array"),ie=Object(K.a)("counter"),se=n(45);var le=function(){var e=oe([]),t=Object(s.a)(e,2),n=t[0],a=t[1],o=ie(10),i=Object(s.a)(o,2),l=i[0],r=i[1];return Object(c.useEffect)((function(){window.addEventListener("beforeunload",(function(e){e.preventDefault(),onClose(),e.returnValue=""})),console.log("Protocol: "+window.location.protocol);var e="ws://"+document.location.host+"/ws";"https:"===window.location.protocol&&(e="wss://"+document.location.host+"/ws"),console.log("WS URL: "+e);var t=new B.a(e);return t.onopen=function(){console.log("connected to "+e)},t.onclose=function(e){console.log("connection closed ("+e.code+")")},t.onmessage=function(e){var t=JSON.parse(e.data);console.log(t),a(n.concat(t))},function(){t.close()}})),Object(d.jsxs)(V.a,{children:[Object(d.jsx)("h3",{className:"page-title",children:"Cloudevents:"}),Object(d.jsx)("h5",{children:" Monitor and inject Cloudevents here! "}),Object(d.jsx)(D.a,{label:"-",onClick:function(){r(l-5)},children:"-"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){r(l+5)},children:"+"}),Object(d.jsx)(D.a,{label:"Clear Events",onClick:function(){a([])},children:"Clear Events"}),Object(d.jsxs)(L.a,{style:{paddingLeft:20},children:[Object(d.jsx)(ae,{}),Object(d.jsx)(L.a,{})]}),Object(d.jsx)(L.a,{children:n.map((function(e,t){return Object(d.jsx)(M.a,{md:12,children:Object(d.jsx)(T.a,{children:Object(d.jsx)(P.a,{children:Object(d.jsx)("div",{children:Object(d.jsx)(L.a,{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(d.jsx)(I.a,{style:{fontSize:l},json:e,theme:se})})},t)})})})}))})]})},re=Object(K.a)("count"),je=n(45);var be=function(){var e=a.a.useState([]),t=Object(s.a)(e,2),n=t[0],o=t[1],i=re(10),l=Object(s.a)(i,2),r=l[0],j=l[1],b={origin:"*"};function u(){U.a.get("/fetchPods",b).then((function(e){console.log(e.data),o(e.data)}))}return Object(c.useEffect)((function(){u()}),[]),Object(d.jsxs)(V.a,{children:[Object(d.jsx)("h3",{className:"page-title",children:"Pod Viewer:"}),Object(d.jsx)("h5",{children:" View active pod info here! "}),Object(d.jsx)(D.a,{label:"-",onClick:function(){j(r-5)},children:"-"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){j(r+5)},children:"+"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){u()},children:"Refresh"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){U.a.get("/fetchVerbosePods",b).then((function(e){console.log(e.data),o(e.data)}))},children:"More Info"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){u()},children:"Less Info"}),Object(d.jsx)(I.a,{style:{fontSize:r},json:n,theme:je})]})},de=Object(K.a)("count"),ue=n(45);var he=function(){var e=a.a.useState([]),t=Object(s.a)(e,2),n=t[0],o=t[1],i=de(10),l=Object(s.a)(i,2),r=l[0],j=l[1],b={origin:"*"};function u(){U.a.get("/fetchKsvc",b).then((function(e){console.log(e.data),o(e.data)}))}return Object(c.useEffect)((function(){return u(),function(){}}),[]),Object(d.jsxs)(V.a,{children:[Object(d.jsx)("h3",{className:"page-title",children:"KSVC Viewer:"}),Object(d.jsx)("h5",{children:" View deployed Knative Service Objects here! "}),Object(d.jsx)(D.a,{label:"-",onClick:function(){j(r-5)},children:"-"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){j(r+5)},children:"+"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){u()},children:"Refresh"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){U.a.get("/fetchVerboseKsvc",b).then((function(e){console.log(e.data),o(e.data)}))},children:"More Info"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){u()},children:"Less Info"}),Object(d.jsx)(I.a,{style:{fontSize:r},json:n,theme:ue})]})},Oe=Object(K.a)("count"),fe=n(45);var xe=function(){var e=a.a.useState([]),t=Object(s.a)(e,2),n=t[0],o=t[1],i=Oe(10),l=Object(s.a)(i,2),r=l[0],j=l[1],b={origin:"*"};function u(){U.a.get("/fetchBrokers",b).then((function(e){console.log(e.data),o(e.data)}))}return Object(c.useEffect)((function(){u()}),[]),Object(d.jsxs)(V.a,{children:[Object(d.jsx)("h3",{className:"page-title",children:"Broker Viewer:"}),Object(d.jsx)("h5",{children:" View active broker info here! "}),Object(d.jsx)(D.a,{label:"-",onClick:function(){j(r-5)},children:"-"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){j(r+5)},children:"+"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){u()},children:"Refresh"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){U.a.get("/fetchVerboseBrokers",b).then((function(e){console.log(e.data),o(e.data)}))},children:"More Info"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){u()},children:"Less Info"}),Object(d.jsx)(I.a,{style:{fontSize:r},json:n,theme:fe})]})},pe=Object(K.a)("count"),ge=n(45);var ve=function(){var e=a.a.useState([]),t=Object(s.a)(e,2),n=t[0],o=t[1],i=pe(10),l=Object(s.a)(i,2),r=l[0],j=l[1],b={origin:"*"};function u(){U.a.get("/fetchTriggers",b).then((function(e){console.log(e.data),o(e.data)}))}return Object(c.useEffect)((function(){u()}),[]),Object(d.jsxs)(V.a,{children:[Object(d.jsx)("h3",{className:"page-title",children:"Trigger Viewer:"}),Object(d.jsx)("h5",{children:" View active trigger info here! "}),Object(d.jsx)(D.a,{label:"-",onClick:function(){j(r-5)},children:"-"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){j(r+5)},children:"+"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){u()},children:"Refresh"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){U.a.get("/fetchVerboseTriggers",b).then((function(e){console.log(e.data),o(e.data)}))},children:"More Info"}),Object(d.jsx)(D.a,{label:"+",onClick:function(){u()},children:"Less Info"}),Object(d.jsx)(I.a,{style:{fontSize:r},json:n,theme:ge})]})},me=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)(y,{}),Object(d.jsxs)("div",{className:"container__wrap",children:[Object(d.jsx)(r.a,{path:"/LogScanner",component:W}),Object(d.jsx)(r.a,{path:"/EventViewer",component:Z}),Object(d.jsx)(r.a,{path:"/EventInjection",component:le}),Object(d.jsx)(r.a,{path:"/Pods",component:be}),Object(d.jsx)(r.a,{path:"/Ksvc",component:he}),Object(d.jsx)(r.a,{path:"/Brokers",component:xe}),Object(d.jsx)(r.a,{path:"/Triggers",component:ve})]})]})},we=function(){return Object(d.jsx)(N,{children:Object(d.jsx)("main",{children:Object(d.jsx)(r.c,{children:Object(d.jsx)(r.a,{path:"/",component:me})})})})},Ce=function(){var e=Object(c.useState)(!0),t=Object(s.a)(e,2),n=t[0],a=t[1],o=Object(c.useState)(!1),i=Object(s.a)(o,2),r=i[0],j=i[1];return Object(c.useEffect)((function(){window.addEventListener("load",(function(){a(!1),setTimeout((function(){return j(!0)}),500)}))}),[]),Object(d.jsxs)(l.a,{children:[!r&&Object(d.jsx)("div",{className:"load".concat(n?"":" loaded"),children:Object(d.jsx)("div",{className:"load__icon-wrap",children:Object(d.jsx)("svg",{className:"load__icon",children:Object(d.jsx)("path",{fill:"#4ce1b6",d:"M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"})})})}),Object(d.jsx)("div",{children:Object(d.jsx)(we,{})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(Ce,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[270,1,2]]]);
//# sourceMappingURL=main.dd6c900b.chunk.js.map