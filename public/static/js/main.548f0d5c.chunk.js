(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{102:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n.n(c),i=n(57),s=n.n(i),r=(n(76),n(47),n(65)),o=n(6),l=(n(77),n(1));var j=function(){return Object(l.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"10vh"},children:Object(l.jsx)("h1",{children:"Rate My City"})})};n(18),n(24),n(2);var u=n(107),d=n(68);var b=function(){return Object(l.jsxs)("div",{className:"input-group mt-1 mb-2",children:[Object(l.jsx)(u.a,{className:"input-group-append icon-play",id:"dropdown-basic-button",size:"sm",variant:"Secondary",menuVariant:"secondary",children:Object(l.jsx)(d.a.Item,{href:"#/action-1",children:"Add City"})}),Object(l.jsx)("input",{className:"form-control text-center fw-bold",placeholder:"Welcome: User Registered"}),Object(l.jsx)("div",{className:"input-group-append",children:Object(l.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",children:"Login / Register"})}),Object(l.jsx)("div",{className:"input-group-append",children:Object(l.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",children:"Settings"})})]})},h=n(62),m=n(63),p=n(38),x=n(70),O=n(69),f=n(64),y=n.n(f),v=function(t){Object(x.a)(n,t);var e=Object(O.a)(n);function n(t){var c;return Object(h.a)(this,n),(c=e.call(this,t)).onChangeCity=c.onChangeCity.bind(Object(p.a)(c)),c.state={cityName:"",cities:[]},c}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var t=this;y.a.get("https://rate-my-city.herokuapp.com/listCities").then((function(e){e.data.length>0&&t.setState({cities:e.data.map((function(t){return t.name})),cityName:e.data[0].name})})).catch((function(t){console.log(t)}))}},{key:"onChangeCity",value:function(t){this.setState({cityName:t.target.value})}},{key:"onSubmit",value:function(t){t.preventDefault();var e={cityName:this.state.cityName};console.log(e),this.setState({cityName:""})}},{key:"render",value:function(){return Object(l.jsxs)("div",{className:"input-group mt-1 mb-2",children:[Object(l.jsx)("form",{onSubmit:this.onSubmit,children:Object(l.jsx)("div",{className:"form-group",children:Object(l.jsx)("select",{required:!0,className:"form-control",value:this.state.cityName,onChange:this.onChangeCity,children:this.state.cities.map((function(t){return Object(l.jsx)("option",{value:t,children:t},t)}))})})}),Object(l.jsx)("input",{className:"form-control",placeholder:"Search by State"}),Object(l.jsx)("input",{className:"form-control",placeholder:"Search by Username"}),Object(l.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",children:"Search"})]})}}]),n}(c.Component),g=function(){return Object(l.jsx)("div",{children:Object(l.jsx)(b,{})})};var N=function(){return Object(l.jsxs)("div",{className:"container",children:[Object(l.jsx)(b,{}),Object(l.jsx)(j,{}),Object(l.jsx)(v,{})]})};var C=function(){return Object(l.jsx)(r.a,{children:Object(l.jsxs)(o.d,{children:[Object(l.jsx)(o.b,{path:"/",exact:!0,children:Object(l.jsx)(N,{})}),Object(l.jsx)(o.b,{path:"/cities",exact:!0,children:Object(l.jsx)(g,{})}),Object(l.jsx)(o.a,{to:"/"})]})})},S=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,108)).then((function(e){var n=e.getCLS,c=e.getFID,a=e.getFCP,i=e.getLCP,s=e.getTTFB;n(t),c(t),a(t),i(t),s(t)}))};s.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(C,{})}),document.getElementById("root")),S()},76:function(t,e,n){},77:function(t,e,n){}},[[102,1,2]]]);
//# sourceMappingURL=main.548f0d5c.chunk.js.map