(this["webpackJsonpsa-task-jan2021"]=this["webpackJsonpsa-task-jan2021"]||[]).push([[0],{46:function(e,t,c){},51:function(e,t,c){},74:function(e,t,c){"use strict";c.r(t);var n,a,r=c(1),i=c(0),s=c.n(i),d=c(12),o=c.n(d),u=(c(46),c(5)),l=(c(51),c(10)),j=c(40),b=c(11),h=c.n(b),O=c(17),x=c(9),f=c(21),m=c.n(f),p=Object(x.b)("currencies/getList",Object(O.a)(h.a.mark((function e(){var t,c,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.get("https://www.stackadapt.com/coinmarketcap/map?sort=cmc_rank").catch((function(e){console.error("Error while fetching available currencies"+e)}));case 2:return t=e.sent,c=t.data,n=t.status,e.abrupt("return",{data:c,status:n});case 6:case"end":return e.stop()}}),e)})))),k=Object(x.c)({name:"currencies",initialState:{loading:"idle",data:[],tracked:{},status:null},reducers:{},extraReducers:(n={},Object(l.a)(n,p.pending,(function(e){e.loading="pending"})),Object(l.a)(n,p.fulfilled,(function(e,t){var c=t.payload;e.data=Object(j.a)(c.data.data),e.status=c.data.status,e.loading="idle"})),Object(l.a)(n,p.rejected,(function(e){e.status="failed"})),n)}),v=function(e){return e.currencies},g=function(e){return e.currencies.data},y=c(13),w=c(39),N=Object(x.b)("tracker/updateQuotes",function(){var e=Object(O.a)(h.a.mark((function e(t,c){var n,a,r,i,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.getState,a=n(),e.next=4,m.a.get("https://www.stackadapt.com/coinmarketcap/quotes?id=".concat(Object.keys(a.tracker.tracked).join(","))).then((function(e){return e})).catch((function(e){console.error("Error while fetching available currencies")}));case 4:return r=e.sent,i=r.data,s=r.status,e.abrupt("return",{data:i,status:s});case 8:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}()),S=Object(x.b)("debouncedAction",Object(w.debounce)(function(){var e=Object(O.a)(h.a.mark((function e(t,c){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(0,c.dispatch)(t);case 2:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),500)),E=Object(x.c)({name:"tracker",initialState:{loading:"idle",tracked:{},quotes:{},status:null},reducers:{add:function(e,t){t.currencies.forEach((function(t){var c=t.id,n=t.index;e.tracked[c]={metaIndex:n,quotes:[]}}))},remove:function(e,t){t.currencies.forEach((function(t){var c=t.id;t.index;delete e.tracked[c],delete e.quotes[c]}))}},extraReducers:(a={},Object(l.a)(a,N.pending,(function(e){e.loading="pending"})),Object(l.a)(a,N.fulfilled,(function(e,t){var c=t.payload;Object.entries(c.data.data).forEach((function(t){var c=Object(y.a)(t,2),n=c[0],a=c[1];e.quotes[n]=a})),e.status=c.data.status,e.loading="idle"})),Object(l.a)(a,N.rejected,(function(e){e.status="failed"})),a)}),q=function(e){return e.tracker.tracked},C=function(e){return e.tracker.quotes},A=c(22),D=c(23);function I(e){var t=e.currency,c=e.disabled,n=e.index,a=e.tracked,i=Object(u.b)(),s=[];a.hasOwnProperty(t.id)&&s.push("d-none");var d=["tracker-button"];return c?(d.push("disabled"),d.push("text-muted")):d.push("text-success"),Object(r.jsxs)("li",{className:s.join(" "),children:[Object(r.jsx)("button",{title:"Add ".concat(t.name," to tracking list"),disabled:c,className:d.join(" "),onClick:function(){i({type:"tracker/add",currencies:[{id:t.id,index:n}]})},"aria-label":"Track ".concat(t.name),children:Object(r.jsx)(A.a,{icon:D.b})}),t.name," (",t.symbol,")"]})}function U(){var e=Object(u.c)(v),t=Object(u.c)(q),c=e.data.map((function(e,c){return Object(r.jsx)(I,{currency:e,index:c,tracked:t,disabled:Object.entries(t).length>9},"untracked-currency-".concat(e.id))}));return Object(r.jsxs)("ul",{children:[Object.keys(t).length>9?Object(r.jsx)("div",{className:"text-danger mb-2",children:"You can't track more than 10 currencies at a time."}):null,c]})}function L(e){var t,c,n=e.currency,a=e.index,i=e.disabled,s=Object(u.b)(),d=Object(u.c)(C),o=["tracker-button"];return i?(o.push("disabled"),o.push("text-muted")):o.push("text-danger"),Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:Object(r.jsx)("button",{title:"Remove ".concat(n.name," from tracking list"),className:o.join(" "),disabled:i,onClick:function(){s({type:"tracker/remove",currencies:[{id:n.id,index:a}]})},children:Object(r.jsx)(A.a,{icon:D.a})})}),Object(r.jsx)("td",{children:n.name}),Object(r.jsx)("td",{children:n.symbol}),Object(r.jsx)("td",{children:null!==(t=null!==(c=n.cmc_rank)&&void 0!==c?c:n.rank)&&void 0!==t?t:"Loading..."}),Object(r.jsx)("td",{children:d[n.id]&&d[n.id].quote.USD?"$".concat(d[n.id].quote.USD.price.toFixed(2)," (USD)"):"Loading..."})]})}function R(){var e=Object(u.b)(),t=Object(u.c)(g),c=Object(u.c)(q),n=Object.entries(c).sort((function(e,c){var n=Object(y.a)(e,2),a=(n[0],n[1]),r=Object(y.a)(c,2),i=(r[0],r[1]);return t[a.metaIndex].rank-t[i.metaIndex].rank})).map((function(e){var n=Object(y.a)(e,2),a=(n[0],n[1].metaIndex);return Object(r.jsx)(L,{currency:t[a],index:a,disabled:Object.keys(c).length<2},"tracked-currency-".concat(t[a].id))}));return Object(i.useEffect)((function(){Object.keys(c).length>0&&e(S(N()))}),[e,c]),Object(r.jsxs)("div",{className:"tracker-table-container",children:[Object(r.jsxs)("table",{className:"tracker-table table table-striped table-borderless",children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{}),Object(r.jsx)("th",{children:"Name"}),Object(r.jsx)("th",{children:"Symbol"}),Object(r.jsx)("th",{children:"CMC Rank"}),Object(r.jsx)("th",{children:"Price (USD)"})]})}),Object(r.jsx)("tbody",{children:n})]}),Object.keys(c).length<2?Object(r.jsx)("div",{className:"text-danger mb-2",children:"You can't track less than one currency at a time."}):null]})}var M=c(19);var T=function(){var e=Object(u.b)(),t=Object(u.c)(v),c=t.data;Object(i.useEffect)((function(){0===c.length&&e(p())}),[e,c]),Object(i.useEffect)((function(){t.data.length>0&&e({type:"tracker/add",currencies:t.data.slice(0,5).map((function(e,t){return{id:e.id,index:t}}))})}),[e,t]);var n="failed"!==t.status?Object(r.jsx)("div",{className:"row",children:Object(r.jsxs)("div",{className:"col-12 col-md-8 col-lg-7",children:[Object(r.jsx)("div",{className:"d-flex justify-content-end my-2",children:Object(r.jsxs)(M.a,{className:"currencies-dropdown",children:[Object(r.jsx)(M.a.Toggle,{variant:"primary",id:"currencyListDropdown",children:"Add currencies"}),Object(r.jsxs)(M.a.Menu,{children:[Object(r.jsx)(M.a.Header,{children:"Available currencies"}),Object(r.jsx)(U,{})]})]})}),Object(r.jsx)(R,{})]})}):Object(r.jsx)("div",{className:"row",children:Object(r.jsx)("div",{className:"col",children:Object(r.jsxs)("div",{className:"alert alert-danger",role:"alert",children:[Object(r.jsx)("p",{children:"Uh oh. Something went wrong when fetching the list of trackable currencies."}),Object(r.jsx)("p",{children:"You can try again now or come back later."}),Object(r.jsx)("button",{className:"btn btn-primary mt-2",onClick:function(){e(p())},children:"Try again"})]})})});return Object(r.jsx)("div",{className:"App",children:Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h1",{children:"Cryptocurrency tracker"}),n]})})},Y=Object(x.a)({reducer:{currencies:k.reducer,tracker:E.reducer}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(u.a,{store:Y,children:Object(r.jsx)(T,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[74,1,2]]]);
//# sourceMappingURL=main.5863b7a2.chunk.js.map