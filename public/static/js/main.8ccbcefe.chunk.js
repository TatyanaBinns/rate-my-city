(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{131:function(e,t,a){},165:function(e,t,a){"use strict";a.r(t);var c=a(0),r=a.n(c),n=a(30),s=a.n(n),l=(a(131),a(105),a(48)),o=a(16),i=(a(72),a(37)),d=a.n(i),j=a(50),u=a(6),m=a(36),b=a.n(m),h=a(1);var f=function(){var e=Object(o.g)(),t=r.a.useState(!1),a=Object(u.a)(t,2),n=a[0],s=a[1],l="",i="",m="",f="",O="",x="",p=Object(c.useState)(""),v=Object(u.a)(p,2),g=v[0],N=v[1],y=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={email:m.value,password:O.value},c=JSON.stringify(a),r={method:"post",url:"https://rate-my-city.herokuapp.com/api/login",headers:{"Content-Type":"application/json"},data:c},b()(r).then((function(e){var t=e.data;t.error?N(t.error):w(t)}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={firstName:l.value,lastName:i.value,userName:f.value,email:m.value,password:O.value,confirmpassword:x.value},c=JSON.stringify(a),r={method:"post",url:"https://rate-my-city.herokuapp.com/api/register",headers:{"Content-Type":"application/json"},data:c},b()(r).then((function(e){var t=e.data;t.error&&""!==t.error?N(t.error):k(t)}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function w(t){localStorage.setItem("accessToken",t.accessToken),localStorage.setItem("userId",t.id),localStorage.setItem("userFirstName",t.firstName),localStorage.setItem("userLastName",t.lastName),localStorage.setItem("userName",t.userName),localStorage.setItem("userEmail",m.value),localStorage.setItem("userPassword",O.value),e.push("/")}function k(t){localStorage.setItem("accessToken",t.accessToken),localStorage.setItem("userId",t.userId),localStorage.setItem("userFirstName",t.firstName),localStorage.setItem("userLastName",t.lastName),localStorage.setItem("userName",t.userName),localStorage.setItem("userEmail",t.email),localStorage.setItem("userPassword",O.value),e.push("/")}return Object(h.jsx)("div",{className:"container-fluid h-custom",children:Object(h.jsx)("div",{className:"row d-flex justify-content-center align-items-center h-100",children:Object(h.jsx)("div",{className:"col-md-8 col-lg-6 mt-5 col-xl-4 offset-xl-1",children:Object(h.jsxs)("form",{children:[Object(h.jsxs)("div",{className:"form-group row d-flex justify-content-center ",children:[Object(h.jsx)("div",{className:"col-md-4",children:Object(h.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:function(){return s(!1)},children:"Login"})}),Object(h.jsx)("div",{className:"col-md-4",children:Object(h.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:function(){return s(!0)},children:"Register"})})]}),Object(h.jsx)("div",{className:"divider d-flex align-items-center my-4 mt-0",children:Object(h.jsx)("p",{className:"text-center fw-bold mx-3 mb-5"})}),n&&Object(h.jsxs)("div",{className:"form-outline mt-4 mb-3",children:[Object(h.jsx)("input",{type:"text",autoFocus:!0,className:"form-control form-control-lg",placeholder:"Enter First Name",ref:function(e){return l=e}}),Object(h.jsx)("label",{className:"form-label",children:"First Name"})]}),n&&Object(h.jsxs)("div",{className:"form-outline mt-4 mb-3",children:[Object(h.jsx)("input",{type:"text",className:"form-control form-control-lg",placeholder:"Enter Last Name",ref:function(e){return i=e}}),Object(h.jsx)("label",{className:"form-label",children:"Last Name"})]}),Object(h.jsxs)("div",{className:"form-outline mt-4 mb-3",children:[Object(h.jsx)("input",{type:"email",autoFocus:!0,className:"form-control form-control-lg",placeholder:"Enter a valid email address",ref:function(e){return m=e}}),Object(h.jsx)("label",{className:"form-label",children:"Email Address"})]}),n&&Object(h.jsxs)("div",{className:"form-outline mt-4 mb-3",children:[Object(h.jsx)("input",{type:"text",className:"form-control form-control-lg",placeholder:"Enter User Name",ref:function(e){return f=e}}),Object(h.jsx)("label",{className:"form-label",children:"User Name"})]}),Object(h.jsxs)("div",{className:"form-outline mb-3",children:[Object(h.jsx)("input",{type:"password",className:"form-control form-control-lg",placeholder:"Enter password",ref:function(e){return O=e}}),Object(h.jsx)("label",{className:"form-label",children:"Password"})]}),n&&Object(h.jsxs)("div",{className:"form-outline mt-4 mb-3",children:[Object(h.jsx)("input",{type:"password",className:"form-control form-control-lg",placeholder:"Confirm password",ref:function(e){return x=e}}),Object(h.jsx)("label",{className:"form-label",children:"Confirm password"})]}),Object(h.jsxs)("div",{className:"form-group row d-flex justify-content-center ",children:[!n&&Object(h.jsx)("div",{className:"col-md-4",children:Object(h.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:y,children:"Sign In"})}),n&&Object(h.jsx)("div",{className:"col-md-4",children:Object(h.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:S,children:"Sign In"})}),Object(h.jsx)("div",{className:"col-md-4",children:Object(h.jsx)("button",{type:"button",className:"btn btn-dark btn-lg form-control",onClick:function(){localStorage.clear(),e.push("/")},children:"Cancel"})}),Object(h.jsx)("div",{className:"divider d-flex align-items-center my-4",children:Object(h.jsx)("p",{className:"text-center fw-bold mx-3 mb-1",children:g})})]})]})})})})},O=function(){return Object(h.jsx)("div",{className:"container",children:Object(h.jsx)(f,{})})};var x=function(){return Object(h.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"10vh"},children:Object(h.jsx)("h1",{children:"Rate My City"})})},p=(a(4),a(173)),v=(a(176),a(83),a(123));var g=function(){var e=Object(o.g)(),t="",a="Login / Register",c=!1;localStorage.accessToken&&""!==localStorage.accessToken&&(t="Welcome: "+localStorage.userFirstName+" "+localStorage.userLastName,c=!0,a="Logout");var n=r.a.useState(c),s=Object(u.a)(n,2),l=s[0];return s[1],Object(h.jsxs)("div",{className:"container-fluid h-custom mt-5",children:[Object(h.jsx)("p",{children:"\xa0"}),Object(h.jsxs)("div",{className:"input-group mt-1 mb-2",children:[l&&Object(h.jsx)("div",{children:Object(h.jsxs)(p.a,{className:"input-group-append icon-play",id:"dropdown-basic-button",size:"sm",variant:"Secondary",menuVariant:"secondary",children:[Object(h.jsx)(v.a.Item,{className:"btn-group-sm",href:"#/action-1",onClick:function(){e.push("AddCity")},children:"Add City"}),Object(h.jsx)(v.a.Item,{className:"btn-group-sm",href:"#/action-1",children:"Delete Review"})]})}),Object(h.jsx)("input",{className:"form-control text-left fw-bold",disabled:"disabled",placeholder:t}),Object(h.jsx)("div",{className:"input-group-append",children:Object(h.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",onClick:function(){localStorage.accessToken&&""!==localStorage.accessToken?(t="",localStorage.clear(),window.location.reload(!1)):e.push("/login")},children:a})}),l&&Object(h.jsx)("div",{className:"input-group-append",children:Object(h.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",onClick:function(){e.push("/Settings")},children:"Settings"})})]})]})},N=a(101);a(164);var y=function(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),a=(t[0],t[1]),r=Object(c.useState)({}),n=Object(u.a)(r,2),s=n[0],l=n[1],i=Object(c.useState)({}),d=Object(u.a)(i,2),j=d[0],m=d[1],f=Object(c.useState)({}),O=Object(u.a)(f,2),x=O[0],p=O[1],v=Object(o.g)();function g(e,t){return!!t.selected.length||e.label.toLowerCase().indexOf(t.text.toLowerCase())>-1}Object(c.useEffect)((function(){!function(){var e={method:"get",url:"https://rate-my-city.herokuapp.com/api/listCities"};b()(e).then((function(e){var t=e.data;t.error?a(t.error):(a(t.error),l(t.map((function(e){return{label:e.name}}))))}));e={method:"get",url:"https://rate-my-city.herokuapp.com/api/listStates"};b()(e).then((function(e){var t=e.data;t.error?a(t.error):(a(t.error),m(t.map((function(e){return{label:e.state}}))))}));e={method:"get",url:"https://rate-my-city.herokuapp.com/api/listUserName"};b()(e).then((function(e){var t=e.data;t.error?a(t.error):(a(t.error),p(t.map((function(e){return{label:e.userName}}))))}))}()}),[]);var y=function(e){var t=e.isOpen,a=e.onClick;return Object(h.jsx)("button",{className:"toggle-button",onClick:a,onMouseDown:function(e){e.preventDefault()},children:t?"\u25b2":"\u25bc"})};return Object(h.jsxs)("div",{className:"input-group d-flex justify-content-center",children:[Object(h.jsx)("div",{className:"form-group",children:Object(h.jsx)(N.a,{filterBy:g,options:s,placeholder:"Search by City ...",children:function(e){var t=e.isMenuShown,a=e.toggleMenu;return Object(h.jsx)(y,{isOpen:t,onClick:function(e){return a()}})}})}),Object(h.jsx)("div",{className:"form-group",children:Object(h.jsx)(N.a,{filterBy:g,options:j,placeholder:"Search by state ...",children:function(e){var t=e.isMenuShown,a=e.toggleMenu;return Object(h.jsx)(y,{isOpen:t,onClick:function(e){return a()}})}})}),Object(h.jsx)("div",{className:"form-group",children:Object(h.jsx)(N.a,{filterBy:g,options:x,placeholder:"Search by User ...",children:function(e){var t=e.isMenuShown,a=e.toggleMenu;return Object(h.jsx)(y,{isOpen:t,onClick:function(e){return a()}})}})}),Object(h.jsxs)("div",{children:[Object(h.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",children:"Search"}),Object(h.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",onClick:function(){v.push("AddCity")},children:"Add City"})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"\xa0"}),Object(h.jsx)("p",{children:"\xa0"}),Object(h.jsx)("p",{children:"\xa0"}),Object(h.jsx)("p",{children:"\xa0"}),Object(h.jsx)("p",{children:"\xa0"})]})]})},S=function(){return Object(h.jsxs)("div",{className:"container",children:[Object(h.jsx)(g,{}),Object(h.jsx)(x,{}),Object(h.jsx)(y,{})]})},w=a(174),k=a(175);var C=function(){var e=Object(c.useState)(!1),t=Object(u.a)(e,2),a=(t[0],t[1],Object(c.useState)("")),r=Object(u.a)(a,2),n=r[0],s=r[1],l=Object(c.useState)(""),i=Object(u.a)(l,2),m=i[0],f=i[1],O=Object(c.useState)(""),x=Object(u.a)(O,2),p=x[0],v=x[1],g=Object(c.useState)("0"),N=Object(u.a)(g,2),y=N[0],S=N[1],C=Object(c.useState)("0"),I=Object(u.a)(C,2),T=I[0],E=I[1],F=Object(c.useState)("0"),L=Object(u.a)(F,2),P=L[0],M=L[1],U=Object(c.useState)("0"),A=Object(u.a)(U,2),D=A[0],J=A[1],R=Object(c.useState)("0"),B=Object(u.a)(R,2),z=B[0],V=B[1],W=Object(c.useState)("0"),q=Object(u.a)(W,2),G=q[0],H=q[1],K=Object(c.useState)("0"),Q=Object(u.a)(K,2),X=Q[0],Y=Q[1],Z=[{name:"1",value:"1"},{name:"2",value:"2"},{name:"3",value:"3"},{name:"4",value:"4"},{name:"5",value:"5"}],$=Object(o.g)(),_=Object(c.useState)(""),ee=Object(u.a)(_,2),te=ee[0],ae=ee[1],ce=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={email:localStorage.userEmail,city:n,state:m,rating:{entertainment:y,nature:T,cost:P,safety:D,culture:z,transportation:G,food:X},review:p,jwtToken:localStorage.accessToken},c=JSON.stringify(a),r={method:"post",url:"https://rate-my-city.herokuapp.com/api/addRating",headers:{"Content-Type":"application/json"},data:c},b()(r).then((function(e){var t=e.data;t.error?ae(t.error):(ae(""),re(t))}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function re(e){localStorage.setItem("accessToken",e.jwtToken.accessToken),$.push("/")}return Object(h.jsx)("div",{className:"container-fluid h-custom mt-0",children:Object(h.jsx)("div",{className:"row d-flex justify-content-center align-items-center h-100",children:Object(h.jsx)("div",{className:"col-md-8 col-lg-6 col-xl-4 offset-xl-1",children:Object(h.jsxs)("form",{children:[Object(h.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"8vh"},children:Object(h.jsx)("h1",{children:"Add Review / City"})}),Object(h.jsx)("div",{className:"divider d-flex align-items-center mt-0 my-4",children:Object(h.jsx)("p",{className:"text-center fw-bold mx-3 mb-3"})}),Object(h.jsxs)("div",{className:"form-outline mt-1 mb-2",children:[Object(h.jsx)("input",{type:"text",autoFocus:!0,className:"form-control form-control-lg",value:n,onChange:function(e){s(e.target.value)},placeholder:"Only enter US city"}),Object(h.jsx)("label",{className:"form-label",children:"Enter City"})]}),Object(h.jsxs)("div",{className:"form-outline mb-2",children:[Object(h.jsx)("input",{type:"text",className:"form-control form-control-lg",value:m,onChange:function(e){f(e.target.value)},placeholder:"Only enter US state"}),Object(h.jsx)("label",{className:"form-label",children:"Enter State"})]}),Object(h.jsxs)("div",{className:"form-outline mb-3",children:[Object(h.jsx)("input",{type:"text",className:"form-control form-control-lg",value:p,onChange:function(e){v(e.target.value)},placeholder:"Enter your review"}),Object(h.jsx)("label",{className:"form-label",children:"Enter Comment.  (Max. 250 characters)"})]}),Object(h.jsx)("div",{className:"div-table",children:Object(h.jsxs)("table",{className:"inline-table",children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:"Entertainment:\xa0"}),Object(h.jsx)("td",{children:Object(h.jsx)(w.a,{children:Z.map((function(e,t){return Object(h.jsx)(k.a,{id:"radio1-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark ",name:"radio1",value:e.value,checked:y===e.value,onChange:function(e){return S(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:"Nature :"}),Object(h.jsx)("td",{children:Object(h.jsx)(w.a,{children:Z.map((function(e,t){return Object(h.jsx)(k.a,{id:"radio2-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio2",value:e.value,checked:T===e.value,onChange:function(e){return E(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:"Cost :"}),Object(h.jsx)("td",{children:Object(h.jsx)(w.a,{children:Z.map((function(e,t){return Object(h.jsx)(k.a,{id:"radio3-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio3",value:e.value,checked:P===e.value,onChange:function(e){return M(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:"Safety :"}),Object(h.jsx)("td",{children:Object(h.jsx)(w.a,{children:Z.map((function(e,t){return Object(h.jsx)(k.a,{id:"radio4-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio4",value:e.value,checked:D===e.value,onChange:function(e){return J(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:"Culture :"}),Object(h.jsx)("td",{children:Object(h.jsx)(w.a,{children:Z.map((function(e,t){return Object(h.jsx)(k.a,{id:"radio5-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio5",value:e.value,checked:z===e.value,onChange:function(e){return V(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:"Transportation:\xa0\xa0\xa0 "}),Object(h.jsx)("td",{children:Object(h.jsx)(w.a,{children:Z.map((function(e,t){return Object(h.jsx)(k.a,{id:"radio6-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio6",value:e.value,checked:G===e.value,onChange:function(e){return H(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:"Food: "}),Object(h.jsx)("td",{children:Object(h.jsx)(w.a,{children:Z.map((function(e,t){return Object(h.jsx)(k.a,{id:"radio7-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio7",value:e.value,checked:X===e.value,onChange:function(e){return Y(e.currentTarget.value)},children:e.name},t)}))})})]})]})}),Object(h.jsxs)("div",{className:"form-group row d-flex justify-content-center mt-4",children:[Object(h.jsx)("div",{className:"col-md-3",children:Object(h.jsx)("button",{type:"button",className:"btn btn-secondary btn-lg align-items-center",onClick:ce,children:"Add"})}),Object(h.jsx)("div",{className:"col-md-3",children:Object(h.jsx)("button",{type:"button",className:"btn btn-dark btn-lg align-items-center",onClick:function(){$.push("/")},children:"Cancel"})}),Object(h.jsx)("div",{className:"divider d-flex align-items-center mt-1 my-4",children:Object(h.jsx)("p",{className:"text-center fw-bold mx-3 mb-5",children:te})})]})]})})})})},I=function(){return Object(h.jsx)("div",{className:"container",children:Object(h.jsx)(C,{})})};var T=function(){var e=Object(o.g)(),t=Object(c.useState)(""),a=Object(u.a)(t,2),r=a[0],n=a[1],s=Object(c.useState)(localStorage.userFirstName),l=Object(u.a)(s,2),i=l[0],m=l[1],f=Object(c.useState)(localStorage.userLastName),O=Object(u.a)(f,2),x=O[0],p=O[1],v=Object(c.useState)(localStorage.userName),g=Object(u.a)(v,2),N=g[0],y=g[1],S=Object(c.useState)(localStorage.userEmail),w=Object(u.a)(S,2),k=w[0],C=(w[1],Object(c.useState)(localStorage.userPassword)),I=Object(u.a)(C,2),T=I[0],E=I[1],F=Object(c.useState)(localStorage.userPassword),L=Object(u.a)(F,2),P=L[0],M=L[1],U=Object(c.useState)(localStorage.userPassword),A=Object(u.a)(U,2),D=A[0],J=A[1],R=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,c,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={userId:localStorage.userId,firstName:i,lastName:x,userName:N,email:k,password:P,confirmpassword:D,jwtToken:localStorage.accessToken},c=JSON.stringify(a),r={method:"post",url:"https://rate-my-city.herokuapp.com/api/settings",headers:{"Content-Type":"application/json"},data:c},b()(r).then((function(e){var t=e.data;t.error&&""!==t.error?n(t.error):(n(""),B(t))}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function B(t){localStorage.setItem("accessToken",t.jwtToken.accessToken),localStorage.setItem("userId",t.id),localStorage.setItem("userFirstName",t.firstName),localStorage.setItem("userLastName",t.lastName),localStorage.setItem("userName",t.userName),localStorage.setItem("userEmail",t.email),localStorage.setItem("userPassword",P.value),e.push("/")}return Object(h.jsx)("div",{className:"container-fluid h-custom",children:Object(h.jsx)("div",{className:"row d-flex justify-content-center align-items-center h-100",children:Object(h.jsx)("div",{className:"col-md-8 col-lg-6 col-xl-4 offset-xl-1",children:Object(h.jsxs)("form",{children:[Object(h.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"8vh"},children:Object(h.jsx)("h1",{children:"Settings"})}),Object(h.jsxs)("div",{className:"form-outline mt-4 mb-2",children:[Object(h.jsx)("input",{type:"text",autoFocus:!0,className:"form-control form-control-lg",value:i,onChange:function(e){m(e.target.value)},placeholder:"Enter First Name"}),Object(h.jsx)("label",{className:"form-label",children:"First Name"})]}),Object(h.jsxs)("div",{className:"form-outline mb-2",children:[Object(h.jsx)("input",{type:"text",className:"form-control form-control-lg",value:x,onChange:function(e){p(e.target.value)},placeholder:"Enter Last Name"}),Object(h.jsx)("label",{className:"form-label",children:"Last Name"})]}),Object(h.jsxs)("div",{className:"form-outline mb-2",children:[Object(h.jsx)("input",{type:"text",className:"form-control form-control-lg",value:N,onChange:function(e){y(e.target.value)},placeholder:"Enter User Name"}),Object(h.jsx)("label",{className:"form-label",children:"Username"})]}),Object(h.jsxs)("div",{className:"form-outline mb-2",children:[Object(h.jsx)("input",{type:"password",className:"form-control form-control-lg",value:T,onChange:function(e){E(e.target.value)},placeholder:"Enter Old Password"}),Object(h.jsx)("label",{className:"form-label",children:"Old Password"})]}),Object(h.jsxs)("div",{className:"form-outline mb-2",children:[Object(h.jsx)("input",{type:"password",className:"form-control form-control-lg",value:P,onChange:function(e){M(e.target.value)},placeholder:"Enter New Password"}),Object(h.jsx)("label",{className:"form-label",children:"New Password"})]}),Object(h.jsxs)("div",{className:"form-outline mb-3",children:[Object(h.jsx)("input",{type:"password",className:"form-control form-control-lg",value:D,onChange:function(e){J(e.target.value)},placeholder:"Confirm password"}),Object(h.jsx)("label",{className:"form-label",children:"Confirm Password"})]}),Object(h.jsxs)("div",{className:"form-group row d-flex justify-content-center ",children:[Object(h.jsx)("div",{className:"col-md-4",children:Object(h.jsx)("button",{type:"button",className:"btn btn-secondary btn-lg form-control",onClick:R,children:"Update"})}),Object(h.jsx)("div",{className:"col-md-4",children:Object(h.jsx)("button",{type:"button",className:"btn btn-dark btn-lg form-control",onClick:function(){e.push("/")},children:"Cancel"})}),Object(h.jsx)("div",{className:"divider d-flex align-items-center my-4",children:Object(h.jsx)("p",{className:"text-center fw-bold mx-3 mb-1",children:r})})]})]})})})})},E=function(){return Object(h.jsx)("div",{className:"container",children:Object(h.jsx)(T,{})})};var F=function(){return Object(h.jsx)(l.a,{children:Object(h.jsxs)(o.d,{children:[Object(h.jsx)(o.b,{path:"/",exact:!0,children:Object(h.jsx)(S,{})}),Object(h.jsx)(o.b,{path:"/login",exact:!0,children:Object(h.jsx)(O,{})}),Object(h.jsx)(o.b,{path:"/AddCity",exact:!0,children:Object(h.jsx)(I,{})}),Object(h.jsx)(o.b,{path:"/Settings",exact:!0,children:Object(h.jsx)(E,{})}),Object(h.jsx)(o.a,{to:"/"})]})})};s.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(F,{})}),document.getElementById("root"))},72:function(e,t,a){}},[[165,1,2]]]);
//# sourceMappingURL=main.8ccbcefe.chunk.js.map