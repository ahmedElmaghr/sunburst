(this.webpackJsonpsunburst=this.webpackJsonpsunburst||[]).push([[0],{130:function(t,e,n){t.exports=n(141)},136:function(t,e,n){},137:function(t,e,n){},139:function(t,e,n){},140:function(t){t.exports=JSON.parse("{}")},141:function(t,e,n){"use strict";n.r(e);n(131);var r=n(1),a=n.n(r),o=n(57),i=n.n(o),c=(n(136),n(137),n(3)),u=n(9),s=n(11),l=n(10),d=n(12),f=n(0),h=n(13),p=n.n(h),m=(n(139),n(4)),v=n.n(m),g=function t(e,n){Object(c.a)(this,t),this.name=e,this.node=n},y=function(t){function e(t){var n;return Object(c.a)(this,e),(n=Object(s.a)(this,Object(l.a)(e).call(this,t))).width=932,n.radius=n.width/6,n.dataTest="",n.constructTree=function(t){console.log("####### debut construct tree"),console.log("data entry",t);var e;e=t.reduce((function(t,e){return t[e.name]=e,t}),{}),console.log("step 1 dataMap get node",e);var r=[];t.forEach((function(t){var n=e[t.parent];n?(n.children||(n.children=[])).push(t):r.push(t)})),console.log("step 2 tree",r),console.log("####### fin construct tree"),n.dataTest=n.treeWrapper(r)},n.getNodeRoots=function(t){if(!t)throw"error data is undefined";console.log(t);var e=[],n=[];t.forEach((function(t){t.parent&&!e.includes(t.parent)&&e.push(t.parent)})),t.forEach((function(t){t.name&&!n.includes(t.name)&&n.push(t.name)}));var r=e.filter((function(t){return!n.includes(t)})),a=[];return console.log("rootsNamesList",r),console.log("data",t),r.forEach((function(e){var n=t.filter((function(t){return t.name==e}))[0];console.log("rootName : ",e,"node : ",n,"data : ",t);var r=new g(e,n);console.log("NodeDto created as root",r),a.push(r)})),console.log("roots",a),a},n.treeWrapper=function(t){return{name:"Media francais",children:t}},n.color2=function(t){switch(t.data.name){case"Claude Perdriel":return"blue";case"Prisa":return"red";case"Xavier Niel":return"orange";case"AOL":return"pink";default:return"green"}},n.partition=function(t){var e=f.c(n.dataTest).sum((function(t){return t.value})).sort((function(t,e){return e.value-t.value})),r=[2*Math.PI,e.height+1];return f.f().size(r)(e)},n.color=function(){f.h(f.g(f.e,n.props.data.children.length+1))},n.format=function(){return f.b(",d")},n.state={data:[]},n}return Object(d.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){}},{key:"componentWillReceiveProps",value:function(t,e){}},{key:"tst",value:function(){var t;return p.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.awrap(f.j(v.a).then((function(t,e){if(e)throw e;return t})));case 2:t=e.sent,console.log("tsv",t),this.constructTree(t);case 5:case"end":return e.stop()}}),null,this)}},{key:"render",value:function(){this.tst();var t=this.props.data;return t&&this.drawSunburstChart(t),a.a.createElement("div",null)}},{key:"drawSunburstChart",value:function(t){var e,n,r,a,o,i,c,u,s,l,d,h,m,v,g,y=this;return p.a.async((function(p){for(;;)switch(p.prev=p.next){case 0:return g=function(t){var e=(t.x0+t.x1)/2*180/Math.PI,r=(t.y0+t.y1)/2*n;return"rotate(".concat(e-90,") translate(").concat(r,",0) rotate(").concat(e<180?0:180,")")},v=function(t){return t.y1<=3&&t.y0>=1&&(t.y1-t.y0)*(t.x1-t.x0)>.03},m=function(t){return t.y1<=3&&t.y0>=1&&t.x1>t.x0},h=function(t){d.datum(t.parent||r),r.each((function(e){return e.target={x0:2*Math.max(0,Math.min(1,(e.x0-t.x0)/(t.x1-t.x0)))*Math.PI,x1:2*Math.max(0,Math.min(1,(e.x1-t.x0)/(t.x1-t.x0)))*Math.PI,y0:Math.max(0,e.y0-t.depth),y1:Math.max(0,e.y1-t.depth)}}));var e=u.transition().duration(750);s.transition(e).tween("data",(function(t){var e=f.d(t.current,t.target);return function(n){return t.current=e(n)}})).filter((function(t){return+this.getAttribute("fill-opacity")||m(t.target)})).attr("fill-opacity",(function(t){return m(t.target)?t.children?.6:.4:0})).attrTween("d",(function(t){return function(){return i(t.current)}})),l.filter((function(t){return+this.getAttribute("fill-opacity")||v(t.target)})).transition(e).attr("fill-opacity",(function(t){return+v(t.target)})).attrTween("transform",(function(t){return function(){return g(t.current)}}))},e=this.width,n=this.radius,r=this.partition(t),a=f.i("body"),r.each((function(t){return t.current=t})),o=a.append("div"),i=f.a().startAngle((function(t){return t.x0})).endAngle((function(t){return t.x1})).padAngle((function(t){return Math.min((t.x1-t.x0)/2,.005)})).padRadius(1.5*this.radius).innerRadius((function(t){return t.y0*y.radius})).outerRadius((function(t){return Math.max(t.y0*y.radius,t.y1*y.radius-1)})),c=o.append("svg").attr("viewBox",[0,0,2e3,2e3]).style("font","10px sans-serif"),u=c.append("g").attr("transform","translate(".concat(e/2,",").concat(e/2,")")),(s=u.append("g").selectAll("path").data(r.descendants().slice(1)).join("path").attr("fill",(function(t){for(;t.depth>1;)t=t.parent;return y.color2(t)})).attr("fill-opacity",(function(t){return m(t.current)?t.children?.6:.4:0})).attr("d",(function(t){return i(t.current)}))).filter((function(t){return t.children})).style("cursor","pointer").on("click",h),s.append("title").text((function(t){return"".concat(t.ancestors().map((function(t){return t.data.key})).reverse().join("/"),"\n").concat(y.format(t.value))})),l=u.append("g").attr("pointer-events","none").attr("text-anchor","middle").style("user-select","none").selectAll("text").data(r.descendants().slice(1)).join("text").attr("dy","0.35em").attr("fill-opacity",(function(t){return+v(t.current)})).attr("transform",(function(t){return g(t.current)})).text((function(t){var e=t.data.name;return e&&e.length>10&&(e=e.slice(0,10)+"..."),e})),d=u.append("circle").datum(r).attr("r",n).attr("fill","none").attr("pointer-events","all").on("click",h),p.abrupt("return",c.node());case 19:case"end":return p.stop()}}),null,this)}}]),e}(a.a.Component),x=n(20),b=(n(140),function(t){function e(){var t,n;Object(c.a)(this,e);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(s.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(a)))).state={},n}return Object(d.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){var t=this;x&&this.setState({data:x}),v.a&&f.j(v.a).then((function(e,n){n&&console.log("an error was occured while reading ",v.a,n),t.setState({relationMediaFr:e})}))}},{key:"render",value:function(){return a.a.createElement(y,{data:this.state.data})}}]),e}(a.a.Component));var w=function(){return a.a.createElement(b,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},20:function(t){t.exports=JSON.parse('{"name":"Media francais","children":[{"name":"Claude Perdriel","children":[{"name":"Groupe Perdriel","children":[{"name":"Challenges","value":3},{"name":"Sciences & Avenir","value":1}]},{"name":"Groupe L\xe2\u20ac\u2122Opinon","value":1},{"name":"Le Nouveau Magazine litteraire","value":1},{"name":"Sophia Publications","children":[{"name":"Historia","value":1},{"name":"L\xe2\u20ac\u2122histoire","value":1}]}]},{"name":"Groupe Perdriel","children":[{"name":"Challenges","value":1},{"name":"Sciences & Avenir","value":1}]},{"name":"Prisa","children":[{"name":"Le Monde libre","value":1}]},{"name":"Xavier Niel","children":[{"name":"Groupe La Provence","value":1},{"name":"Le Monde libre","value":1},{"name":"Le Nouveau Magazine litt\xc3\xa9raire","value":1},{"name":"Nice-Matin","children":[{"name":"Corse Matin","value":1}]}]}]}')},4:function(t,e,n){t.exports=n.p+"static/media/relations_medias_francais.f8ade238.tsv"}},[[130,1,2]]]);
//# sourceMappingURL=main.3ff934bd.chunk.js.map