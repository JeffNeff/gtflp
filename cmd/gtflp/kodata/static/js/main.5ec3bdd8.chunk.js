(this["webpackJsonpeasydev-seed-without-redux"]=this["webpackJsonpeasydev-seed-without-redux"]||[]).push([[0],{205:function(e,t,c){},285:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c.n(n),i=c(13),s=c.n(i),r=c(7),o=c(37),l=(c(204),c(205),c(19)),j=c(20),b=c.n(j),u=c(1),d="".concat("","/img/burger.svg"),h=function(e){var t=e.changeMobileSidebarVisibility,c=e.changeSidebarVisibility;return Object(u.jsxs)("div",{children:[Object(u.jsx)("button",{type:"button",className:"topbar__button topbar__button--desktop",onClick:c,children:Object(u.jsx)("img",{src:d,alt:"",className:"topbar__button-icon"})}),Object(u.jsx)("button",{type:"button",className:"topbar__button topbar__button--mobile",onClick:t,children:Object(u.jsx)("img",{src:d,alt:"",className:"topbar__button-icon"})})]})},O=(c(207),"".concat("","/img/ava.png"),function(){var e=Object(n.useState)(!1),t=Object(r.a)(e,2);t[0],t[1];return Object(u.jsx)("div",{className:"topbar__profile"})}),x=c(174),f=c.n(x),g=c(344),v=function(e){var t=e.changeMobileSidebarVisibility,c=e.changeSidebarVisibility;return Object(u.jsx)("div",{className:"topbar",children:Object(u.jsxs)("div",{className:"topbar__wrapper",children:[Object(u.jsxs)("div",{className:"topbar__left",children:[Object(u.jsx)(h,{changeMobileSidebarVisibility:t,changeSidebarVisibility:c}),Object(u.jsx)(o.b,{className:"topbar__logo",to:"/"})]}),Object(u.jsxs)("div",{className:"topbar__right",children:[Object(u.jsx)(O,{}),Object(u.jsx)(g.a,{href:"https://github.com/JeffNeff/gtflp",style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(u.jsx)(f.a,{})})]})]})})},p=c(175),m=c.n(p),C=c(328),k=function(e){var t=e.title,c=e.icon,n=e.newLink,a=e.route,i=e.onClick;return Object(u.jsx)(o.c,{to:a,onClick:i,activeClassName:"sidebar__link-active",children:Object(u.jsxs)("li",{className:"sidebar__link",children:[c?Object(u.jsx)("span",{className:"sidebar__link-icon lnr lnr-".concat(c)}):"",Object(u.jsxs)("p",{className:"sidebar__link-title",children:[t,n?Object(u.jsx)(C.a,{className:"sidebar__link-badge",children:Object(u.jsx)("span",{children:"New"})}):""]})]})})};k.defaultProps={icon:"",newLink:!1,route:"/",onClick:function(){}};var _=k,y=c(329),S=function(e){var t=e.title,c=e.icon,a=e.isNew,i=e.children,s=Object(n.useState)(!1),o=Object(r.a)(s,2),l=o[0],j=o[1],d=b()({"sidebar__category-wrap":!0,"sidebar__category-wrap--open":l});return Object(u.jsxs)("div",{className:d,children:[Object(u.jsxs)("button",{type:"button",className:"sidebar__link sidebar__category",onClick:function(){j(!l)},children:[c?Object(u.jsx)("span",{className:"sidebar__link-icon lnr lnr-".concat(c)}):"",Object(u.jsxs)("p",{className:"sidebar__link-title",children:[t,a&&Object(u.jsx)("span",{className:"sidebar__category-new"})]}),Object(u.jsx)("span",{className:"sidebar__category-icon lnr lnr-chevron-right"})]}),Object(u.jsx)(y.a,{isOpen:l,className:"sidebar__submenu-wrap",children:Object(u.jsx)("ul",{className:"sidebar__submenu",children:Object(u.jsx)("div",{children:i})})})]})};S.defaultProps={icon:"",isNew:!1};var w=S,N=function(e){var t=e.onClick,c=function(){t()};return Object(u.jsx)("div",{className:"sidebar__content",children:Object(u.jsx)("ul",{className:"sidebar__block",children:Object(u.jsxs)(w,{title:"Tools",icon:"diamond",children:[Object(u.jsx)(_,{title:"Log Scanner",route:"/LogScanner",onClick:c}),Object(u.jsx)(_,{title:"Cloud Events",route:"/EventInjection",onClick:c}),Object(u.jsx)(_,{title:"Pod Viewer",route:"/Pods",onClick:c}),Object(u.jsx)(_,{title:"KSVC Viewer",route:"/ksvc",onClick:c}),Object(u.jsx)(_,{title:"Broker Viewer",route:"/Brokers",onClick:c}),Object(u.jsx)(_,{title:"Trigger Viewer",route:"/Triggers",onClick:c}),Object(u.jsx)(_,{title:"Bridges Viewer",route:"/Bridges",onClick:c}),Object(u.jsx)(_,{title:"Sources Viewer",route:"/Sources",onClick:c}),Object(u.jsx)(_,{title:"Fetch Resource by GVR",route:"/CGVR",onClick:c})]})})})},V=function(e){var t=e.changeMobileSidebarVisibility,c=e.sidebarShow,n=e.sidebarCollapse,a=b()({sidebar:!0,"sidebar--show":c,"sidebar--collapse":n});return Object(u.jsxs)("div",{className:a,children:[Object(u.jsx)("button",{type:"button","aria-label":"sidebar visibility",className:"sidebar__back",onClick:t}),Object(u.jsxs)(m.a,{className:"sidebar__scroll scroll",children:[Object(u.jsx)("div",{className:"sidebar__wrapper sidebar__wrapper--desktop",children:Object(u.jsx)(N,{onClick:function(){}})}),Object(u.jsx)("div",{className:"sidebar__wrapper sidebar__wrapper--mobile",children:Object(u.jsx)(N,{onClick:t})})]})]})},M=c(10),T=c(123),I=Object(M.a)("array"),L=Object(M.a)("messages"),P=Object(l.f)((function(){var e=Object(n.useState)(!1),t=Object(r.a)(e,2),c=t[0],a=t[1],i=I([]),s=Object(r.a)(i,2),o=s[0],l=s[1],j=Object(n.useState)(!1),d=Object(r.a)(j,2),h=d[0],O=d[1],x=L([]),f=Object(r.a)(x,2),g=f[0],p=f[1],m=b()({layout:!0,"layout--collapse":h}),C=function(){a(!c)};return Object(n.useEffect)((function(){console.log("Protocol: "+window.location.protocol);var e="ws://"+document.location.host+"/ws";"https:"===window.location.protocol&&(e="wss://"+document.location.host+"/ws"),console.log("WS URL: "+e);var t=new T.a(e);return t.onopen=function(){console.log("connected to "+e)},t.onclose=function(e){console.log("connection closed ("+e.code+")")},t.onmessage=function(e){var t=JSON.parse(e.data);void 0===t.pod?(console.log("Got Event"),l(o.concat(t))):(console.log("Got log:"+t.message),p(g.concat(t.pod+" : "+t.message)))},function(){t.close()}})),Object(u.jsxs)("div",{className:m,children:["\\",Object(u.jsx)(v,{changeMobileSidebarVisibility:C,changeSidebarVisibility:function(){O(!h)}}),Object(u.jsx)(V,{sidebarShow:c,sidebarCollapse:h,changeMobileSidebarVisibility:C})]})})),R=function(e){var t=e.children;return Object(u.jsx)("div",{className:"theme-light",children:Object(u.jsx)("div",{className:"wrapper",children:t})})},E=c(333),B=c(337),z=c(21),G=c.n(z),J=c(330),K=c(331),D=c(332);var A=function(e){return Object(u.jsx)(J.a,{md:12,children:Object(u.jsx)(K.a,{children:Object(u.jsx)(D.a,{children:Object(u.jsx)("div",{children:e.messages.map((function(t,c){var n=t.search(":");if(!(t.search("gtflp")>-1)){var a=t.substring(0,n),i=t.substring(n+1,t.length);return Object(u.jsxs)("div",{children:[Object(u.jsx)("h3",{className:"bold-text",children:a}),Object(u.jsx)(G.a,{style:{fontSize:e.logsize},json:i,theme:e.theme})]},c)}}))})})})})},F=c(334),W=c(341),q=c(346),H=Object(M.a)("count"),U=Object(M.a)("string"),Z=(Object(M.a)("array"),Object(M.a)("messages")),$=Object(M.a)("pods"),Q=c(43),X=c(44),Y=c(45),ee=c(46);var te=function(){var e=Z([]),t=Object(r.a)(e,2),c=t[0],n=t[1],a=$([]),i=Object(r.a)(a,2),s=i[0],o=i[1],l=H(10),j=Object(r.a)(l,2),b=j[0],d=j[1],h=U(Q),O=Object(r.a)(h,2),x=O[0],f=O[1];return Object(u.jsxs)(E.a,{children:[Object(u.jsx)("h3",{className:"page-title",children:"Log Scanner:"}),Object(u.jsx)("h5",{children:" Load new pod logs from running resources in the namespace "}),Object(u.jsx)(F.a,{label:"-",onClick:function(){d(b-5)},children:"-"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){d(b+5)},children:"+"}),Object(u.jsx)(F.a,{label:"Clear Logs",onClick:function(){n([]),o([])},children:"Clear Logs"}),"Theme:",Object(u.jsxs)(W.a,{value:x,onChange:function(e){return f(e.target.value)},children:[Object(u.jsx)(q.a,{value:Q,children:"PrettyMon"}),Object(u.jsx)(q.a,{value:X,children:"1337"}),Object(u.jsx)(q.a,{value:Y,children:"acai"}),Object(u.jsx)(q.a,{value:ee,children:"adv"})]}),Object(u.jsx)(B.a,{children:Object(u.jsx)(A,{messages:c,podNames:s,logsize:b,theme:x})})]})},ce=c(338),ne=c(339),ae=c(340),ie=c(343),se=c(17),re=c.n(se),oe=c(342),le=Object(M.a)("array"),je=Object(M.a)("counter"),be=Object(M.a)("string"),ue=c(43),de=c(44),he=c(45),Oe=c(46);var xe=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),c=t[0],i=t[1],s=le([]),o=Object(r.a)(s,2),l=o[0],j=o[1],b=je(10),d=Object(r.a)(b,2),h=d[0],O=d[1],x=be(ue),f=Object(r.a)(x,2),g=f[0],v=f[1],p=a.a.useState("0123211"),m=Object(r.a)(p,2),C=m[0],k=m[1],_=a.a.useState("test.type"),y=Object(r.a)(_,2),S=y[0],w=y[1],N=a.a.useState("test.source"),V=Object(r.a)(N,2),M=V[0],T=V[1],I=a.a.useState("application/json"),L=Object(r.a)(I,2),P=L[0],R=L[1],z=a.a.useState('{"test":"data"}'),A=Object(r.a)(z,2),H=A[0],U=A[1],Z=a.a.useState(),$=Object(r.a)(Z,2),Q=$[0],X=$[1],Y={origin:"*"},ee=function(e){var t=JSON.parse(e.target.innerText);k(t.id),w(t.type),T(t.source),R(t.contenttype),U(JSON.stringify(t.data))};return Object(u.jsxs)(E.a,{children:[Object(u.jsx)("h3",{className:"page-title",children:"Cloudevents:"}),Object(u.jsx)("h5",{children:" Monitor and inject Cloudevents here! "}),Object(u.jsx)(F.a,{label:"-",onClick:function(){O(h-5)},children:"-"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){O(h+5)},children:"+"}),Object(u.jsx)(F.a,{label:"Clear Events",onClick:function(){j([])},children:"Clear Events"}),"Theme:",Object(u.jsxs)(W.a,{value:g,onChange:function(e){return v(e.target.value)},children:[Object(u.jsx)(q.a,{value:ue,children:"PrettyMon"}),Object(u.jsx)(q.a,{value:de,children:"1337"}),Object(u.jsx)(q.a,{value:he,children:"acai"}),Object(u.jsx)(q.a,{value:Oe,children:"adv"})]}),Object(u.jsx)(B.a,{style:{paddingLeft:20},children:Object(u.jsx)(B.a,{children:Object(u.jsxs)(ce.a,{class:"pure-form",children:[Object(u.jsx)(ne.a,{class:"pure-form",children:Object(u.jsxs)(ae.a,{children:["ID:",Object(u.jsx)(ie.a,{class:"pure-form",id:"input-injection-ceid",value:C,onChange:function(e){return k(e.target.value)}})]})}),Object(u.jsx)(ne.a,{children:Object(u.jsxs)(ae.a,{children:["Type",Object(u.jsx)(ie.a,{class:"pure-form",id:"input-injection-type",value:S,onChange:function(e){return w(e.target.value)}})]})}),Object(u.jsxs)(ne.a,{children:["Source",Object(u.jsx)(ae.a,{class:"pure-form",children:Object(u.jsx)(ie.a,{id:"input-injection-source",value:M,onChange:function(e){return T(e.target.value)}})})]}),Object(u.jsxs)(ne.a,{children:["Content-Type",Object(u.jsx)(ae.a,{class:"pure-form",children:Object(u.jsx)(ie.a,{label:"",id:"input-injection-contenttype",value:P,onChange:function(e){return R(e.target.value)}})})]}),Object(u.jsx)("p1",{class:"pure-form",children:" Avalible Destinations: "}),Object(u.jsx)(ne.a,{children:Object(u.jsx)(ae.a,{style:{width:"190px"},children:Object(u.jsx)(W.a,{onChange:function(e){return X(e.target.value)},children:c.map((function(e,t){return Object(u.jsx)(q.a,{value:e,children:e})}))})})}),Object(u.jsx)(ne.a,{children:Object(u.jsx)(F.a,{onClick:function(){re.a.post("/queryservices",{},Y).then((function(e){console.log(e.data),i(e.data)})).catch((function(e){console.log(e)}))},children:"Refresh Destinations"})}),Object(u.jsx)("p1",{class:"pure-form",children:" Custom Destination: "}),Object(u.jsx)(ne.a,{children:Object(u.jsx)(ae.a,{class:"pure-form",children:Object(u.jsx)(ie.a,{id:"input-injection-add",onChange:function(e){return X(e.target.value)}})})}),Object(u.jsx)(ne.a,{children:Object(u.jsxs)(ae.a,{class:"pure-form",children:["Data:",Object(u.jsx)(oe.a,{resize:"true",id:"input-injection-data",value:H,onChange:function(e){return U(e.target.value)}})]})}),Object(u.jsx)(ne.a,{children:Object(u.jsx)(ae.a,{class:"pure-form",children:Object(u.jsx)(F.a,{id:"input-injection-button",label:"Submit",onClick:function(e){re.a.post("/inject",{destination:Q,data:H,headers:{"Ce-Id":C,"Ce-Specversion":"1.0","Ce-Type":S,"Ce-Source":M,"Content-Type":P}},Y).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))},children:"Send"})})})]})})}),Object(u.jsx)(B.a,{children:l.map((function(e,t){return Object(u.jsx)(J.a,{md:12,children:Object(u.jsx)(K.a,{children:Object(u.jsx)(D.a,{children:Object(u.jsx)("div",{children:Object(u.jsx)(B.a,{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(u.jsx)(G.a,{onClick:ee,style:{fontSize:h},json:e,theme:g})})},t)})})})}))})]})},fe=c(43),ge=c(44),ve=c(45),pe=c(46),me=Object(M.a)("count"),Ce=Object(M.a)("string");var ke=function(){var e=a.a.useState([]),t=Object(r.a)(e,2),c=t[0],i=t[1],s=me(10),o=Object(r.a)(s,2),l=o[0],j=o[1],b=Ce(fe),d=Object(r.a)(b,2),h=d[0],O=d[1],x={origin:"*"};function f(){re.a.get("/fetchPods",x).then((function(e){console.log(e.data),i(e.data)}))}return Object(n.useEffect)((function(){f()}),[]),Object(u.jsxs)(E.a,{children:[Object(u.jsx)("h3",{className:"page-title",children:"Pod Viewer:"}),Object(u.jsx)("h5",{children:" View active pod info here! "}),Object(u.jsx)(F.a,{label:"-",onClick:function(){j(l-5)},children:"-"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){j(l+5)},children:"+"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Refresh"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){re.a.get("/fetchVerbosePods",x).then((function(e){console.log(e.data),i(e.data)}))},children:"More Info"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Less Info"}),"Theme:",Object(u.jsxs)(W.a,{value:h,onChange:function(e){return O(e.target.value)},children:[Object(u.jsx)(q.a,{value:fe,children:"PrettyMon"}),Object(u.jsx)(q.a,{value:ge,children:"1337"}),Object(u.jsx)(q.a,{value:ve,children:"acai"}),Object(u.jsx)(q.a,{value:pe,children:"adv"})]}),Object(u.jsx)(G.a,{style:{fontSize:l},json:c,theme:h})]})},_e=c(43),ye=c(44),Se=c(45),we=c(46),Ne=Object(M.a)("count"),Ve=Object(M.a)("string");var Me=function(){var e=a.a.useState([]),t=Object(r.a)(e,2),c=t[0],i=t[1],s=Ne(10),o=Object(r.a)(s,2),l=o[0],j=o[1],b=Ve(_e),d=Object(r.a)(b,2),h=d[0],O=d[1],x={origin:"*"};function f(){re.a.get("/fetchKsvc",x).then((function(e){console.log(e.data),i(e.data)}))}return Object(n.useEffect)((function(){return f(),function(){}}),[]),Object(u.jsxs)(E.a,{children:[Object(u.jsx)("h3",{className:"page-title",children:"KSVC Viewer:"}),Object(u.jsx)("h5",{children:" View deployed Knative Service Objects here! "}),Object(u.jsx)(F.a,{label:"-",onClick:function(){j(l-5)},children:"-"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){j(l+5)},children:"+"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Refresh"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){re.a.get("/fetchVerboseKsvc",x).then((function(e){console.log(e.data),i(e.data)}))},children:"More Info"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Less Info"}),"Theme:",Object(u.jsxs)(W.a,{value:h,onChange:function(e){return O(e.target.value)},children:[Object(u.jsx)(q.a,{value:_e,children:"PrettyMon"}),Object(u.jsx)(q.a,{value:ye,children:"1337"}),Object(u.jsx)(q.a,{value:Se,children:"acai"}),Object(u.jsx)(q.a,{value:we,children:"adv"})]}),Object(u.jsx)(G.a,{style:{fontSize:l},json:c,theme:h})]})},Te=c(43),Ie=c(44),Le=c(45),Pe=c(46),Re=Object(M.a)("count"),Ee=Object(M.a)("string");var Be=function(){var e=a.a.useState([]),t=Object(r.a)(e,2),c=t[0],i=t[1],s=Re(10),o=Object(r.a)(s,2),l=o[0],j=o[1],b=Ee(Te),d=Object(r.a)(b,2),h=d[0],O=d[1],x={origin:"*"};function f(){re.a.get("/fetchBrokers",x).then((function(e){console.log(e.data),i(e.data)}))}return Object(n.useEffect)((function(){f()}),[]),Object(u.jsxs)(E.a,{children:[Object(u.jsx)("h3",{className:"page-title",children:"Broker Viewer:"}),Object(u.jsx)("h5",{children:" View active broker info here! "}),Object(u.jsx)(F.a,{label:"-",onClick:function(){j(l-5)},children:"-"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){j(l+5)},children:"+"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Refresh"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){re.a.get("/fetchVerboseBrokers",x).then((function(e){console.log(e.data),i(e.data)}))},children:"More Info"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Less Info"}),"Theme:",Object(u.jsxs)(W.a,{value:h,onChange:function(e){return O(e.target.value)},children:[Object(u.jsx)(q.a,{value:Te,children:"PrettyMon"}),Object(u.jsx)(q.a,{value:Ie,children:"1337"}),Object(u.jsx)(q.a,{value:Le,children:"acai"}),Object(u.jsx)(q.a,{value:Pe,children:"adv"})]}),Object(u.jsx)(G.a,{style:{fontSize:l},data:c,theme:h})]})},ze=c(43),Ge=c(44),Je=c(45),Ke=c(46),De=Object(M.a)("count"),Ae=Object(M.a)("string");var Fe=function(){var e=a.a.useState([]),t=Object(r.a)(e,2),c=t[0],i=t[1],s=De(10),o=Object(r.a)(s,2),l=o[0],j=o[1],b=Ae(ze),d=Object(r.a)(b,2),h=d[0],O=d[1],x={origin:"*"};function f(){re.a.get("/fetchTriggers",x).then((function(e){console.log(e.data),i(e.data)}))}return Object(n.useEffect)((function(){f()}),[]),Object(u.jsxs)(E.a,{children:[Object(u.jsx)("h3",{className:"page-title",children:"Trigger Viewer:"}),Object(u.jsx)("h5",{children:" View active trigger info here! "}),Object(u.jsx)(F.a,{label:"-",onClick:function(){j(l-5)},children:"-"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){j(l+5)},children:"+"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Refresh"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){re.a.get("/fetchVerboseTriggers",x).then((function(e){console.log(e.data),i(e.data)}))},children:"More Info"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Less Info"}),"Theme:",Object(u.jsxs)(W.a,{value:h,onChange:function(e){return O(e.target.value)},children:[Object(u.jsx)(q.a,{value:ze,children:"PrettyMon"}),Object(u.jsx)(q.a,{value:Ge,children:"1337"}),Object(u.jsx)(q.a,{value:Je,children:"acai"}),Object(u.jsx)(q.a,{value:Ke,children:"adv"})]}),Object(u.jsx)(G.a,{style:{fontSize:l},json:c,theme:h})]})},We=c(43),qe=c(44),He=c(45),Ue=c(46),Ze=Object(M.a)("count"),$e=Object(M.a)("string");var Qe=function(){var e=a.a.useState([]),t=Object(r.a)(e,2),c=t[0],i=t[1],s=Ze(10),o=Object(r.a)(s,2),l=o[0],j=o[1],b=$e(We),d=Object(r.a)(b,2),h=d[0],O=d[1],x={origin:"*"};function f(){re.a.get("/fetchBridges",x).then((function(e){console.log(e.data),i(e.data)}))}return Object(n.useEffect)((function(){f()}),[]),Object(u.jsxs)(E.a,{children:[Object(u.jsx)("h3",{className:"page-title",children:"Bridge Viewer:"}),Object(u.jsx)("h5",{children:" View deployed Bridge info here! "}),Object(u.jsx)(F.a,{label:"-",onClick:function(){j(l-5)},children:"-"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){j(l+5)},children:"+"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Refresh"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){re.a.get("/fetchVerboseBridges",x).then((function(e){console.log(e.data),i(e.data)}))},children:"More Info"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Less Info"}),"Theme:",Object(u.jsxs)(W.a,{value:h,onChange:function(e){return O(e.target.value)},children:[Object(u.jsx)(q.a,{value:We,children:"PrettyMon"}),Object(u.jsx)(q.a,{value:qe,children:"1337"}),Object(u.jsx)(q.a,{value:He,children:"acai"}),Object(u.jsx)(q.a,{value:Ue,children:"adv"})]}),Object(u.jsx)(G.a,{style:{fontSize:l},json:c,theme:h})]})},Xe=c(43),Ye=c(44),et=c(45),tt=c(46),ct=Object(M.a)("count"),nt=Object(M.a)("string");var at=function(){var e=a.a.useState([]),t=Object(r.a)(e,2),c=t[0],i=t[1],s=ct(10),o=Object(r.a)(s,2),l=o[0],j=o[1],b=nt(Xe),d=Object(r.a)(b,2),h=d[0],O=d[1],x={origin:"*"};function f(){re.a.get("/fetchSources",x).then((function(e){console.log(e.data),i(e.data)}))}return Object(n.useEffect)((function(){f()}),[]),Object(u.jsxs)(E.a,{children:[Object(u.jsx)("h3",{className:"page-title",children:"Sources Viewer:"}),Object(u.jsx)("h5",{children:" View info on deployed Sources here! "}),Object(u.jsx)(F.a,{label:"-",onClick:function(){j(l-5)},children:"-"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){j(l+5)},children:"+"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Refresh"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){re.a.get("/fetchVerboseSources",x).then((function(e){console.log(e.data),i(e.data)}))},children:"More Info"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){f()},children:"Less Info"}),"Theme:",Object(u.jsxs)(W.a,{value:h,onChange:function(e){return O(e.target.value)},children:[Object(u.jsx)(q.a,{value:Xe,children:"PrettyMon"}),Object(u.jsx)(q.a,{value:Ye,children:"1337"}),Object(u.jsx)(q.a,{value:et,children:"acai"}),Object(u.jsx)(q.a,{value:tt,children:"adv"})]}),Object(u.jsx)(G.a,{style:{fontSize:l},json:c,theme:h})]})},it=c(17);function st(e){var t=Object(n.useState)("eventing.knative.dev"),c=Object(r.a)(t,2),i=c[0],s=c[1],o=Object(n.useState)("v1"),l=Object(r.a)(o,2),j=l[0],b=l[1],d=Object(n.useState)("brokers"),h=Object(r.a)(d,2),O=h[0],x=h[1],f=a.a.useState([]),g=Object(r.a)(f,2),v=g[0],p=g[1],m={origin:"*"};return Object(u.jsxs)(ce.a,{class:"pure-form",children:[Object(u.jsx)(ne.a,{class:"pure-form",children:Object(u.jsxs)(ae.a,{children:["Group:",Object(u.jsx)(ie.a,{class:"pure-form",id:"group",value:i,onChange:function(e){return s(e.target.value)}})]})}),Object(u.jsx)(ne.a,{children:Object(u.jsxs)(ae.a,{children:["Version:",Object(u.jsx)(ie.a,{class:"pure-form",id:"version",value:j,onChange:function(e){return b(e.target.value)}})]})}),Object(u.jsxs)(ne.a,{children:["Resource:",Object(u.jsx)(ae.a,{class:"pure-form",children:Object(u.jsx)(ie.a,{id:"resource",value:O,onChange:function(e){return x(e.target.value)}})})]}),Object(u.jsx)(F.a,{id:"lessinfo",onClick:function(){it.post("/fetchCGVR",{group:i,version:j,resource:O},m).then((function(e){console.log(e),p(e.data)})).catch((function(e){console.log(e)}))},children:"Less Info"}),Object(u.jsx)(F.a,{id:"moreinfo",onClick:function(){it.post("/fetchVerboseCGVR",{group:i,version:j,resource:O},m).then((function(e){console.log(e),p(e.data)})).catch((function(e){console.log(e)}))},children:"More Info"}),Object(u.jsx)(G.a,{style:{fontSize:e.logsize},json:v,theme:e.theme})]})}var rt=c(43),ot=c(44),lt=c(45),jt=c(46),bt=Object(M.a)("count"),ut=Object(M.a)("string");var dt=function(){var e=bt(10),t=Object(r.a)(e,2),c=t[0],n=t[1],a=ut(rt),i=Object(r.a)(a,2),s=i[0],o=i[1];return Object(u.jsxs)(E.a,{children:[Object(u.jsx)("h3",{className:"page-title",children:"GVR Fetcher:"}),Object(u.jsx)("h5",{children:" Fetch Custom Resources by GVR: "}),Object(u.jsx)(F.a,{label:"-",onClick:function(){n(c-5)},children:"-"}),Object(u.jsx)(F.a,{label:"+",onClick:function(){n(c+5)},children:"+"}),"Theme:",Object(u.jsxs)(W.a,{value:s,onChange:function(e){return o(e.target.value)},children:[Object(u.jsx)(q.a,{value:rt,children:"PrettyMon"}),Object(u.jsx)(q.a,{value:ot,children:"1337"}),Object(u.jsx)(q.a,{value:lt,children:"acai"}),Object(u.jsx)(q.a,{value:jt,children:"adv"})]}),Object(u.jsx)(st,{logsize:c,theme:s})]})},ht=function(){return Object(u.jsxs)("div",{children:[Object(u.jsx)(P,{}),Object(u.jsxs)("div",{className:"container__wrap",children:[Object(u.jsx)(l.a,{path:"/LogScanner",component:te}),Object(u.jsx)(l.a,{path:"/EventInjection",component:xe}),Object(u.jsx)(l.a,{path:"/Pods",component:ke}),Object(u.jsx)(l.a,{path:"/Ksvc",component:Me}),Object(u.jsx)(l.a,{path:"/Brokers",component:Be}),Object(u.jsx)(l.a,{path:"/Triggers",component:Fe}),Object(u.jsx)(l.a,{path:"/Bridges",component:Qe}),Object(u.jsx)(l.a,{path:"/Sources",component:at}),Object(u.jsx)(l.a,{path:"/CGVR",component:dt})]})]})},Ot=function(){return Object(u.jsx)(R,{children:Object(u.jsx)("main",{children:Object(u.jsx)(l.c,{children:Object(u.jsx)(l.a,{path:"/",component:ht})})})})},xt=function(){var e=Object(n.useState)(!0),t=Object(r.a)(e,2),c=t[0],a=t[1],i=Object(n.useState)(!1),s=Object(r.a)(i,2),l=s[0],j=s[1];return Object(n.useEffect)((function(){window.addEventListener("load",(function(){a(!1),setTimeout((function(){return j(!0)}),500)}))}),[]),Object(u.jsxs)(o.a,{children:[!l&&Object(u.jsx)("div",{className:"load".concat(c?"":" loaded"),children:Object(u.jsx)("div",{className:"load__icon-wrap",children:Object(u.jsx)("svg",{className:"load__icon",children:Object(u.jsx)("path",{fill:"#4ce1b6",d:"M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"})})})}),Object(u.jsx)("div",{children:Object(u.jsx)(Ot,{})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(xt,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[285,1,2]]]);
//# sourceMappingURL=main.5ec3bdd8.chunk.js.map