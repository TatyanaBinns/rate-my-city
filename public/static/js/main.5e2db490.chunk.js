(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{152:function(e,t,a){},266:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),r=a(32),s=a.n(r),l=(a(152),a(109),a(50)),o=a(17),i=(a(74),a(39)),d=a.n(i),u=a(52),j=a(6),m=a(38),b=a.n(m),h=a(115),f=a.n(h),O=a(1);var x=function(){var e=Object(o.g)(),t=n.a.useState(!1),a=Object(j.a)(t,2),r=a[0],s=a[1],l="",i="",m="",h="",x="",p="",v=Object(c.useState)(""),g=Object(j.a)(v,2),N=g[0],y=g[1],S=function(e){f.a.isStrongPassword(e,{minLength:8,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols:1})?y(""):y("The password in not strong enough")},w=function(){var e=Object(u.a)(d.a.mark((function e(t){var a,c,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={email:m.value,password:x.value},c=JSON.stringify(a),n={method:"post",url:"https://rate-my-city.herokuapp.com/api/login",headers:{"Content-Type":"application/json"},data:c},b()(n).then((function(e){var t=e.data;t.error?y(t.error):C(t)}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(u.a)(d.a.mark((function e(t){var a,c,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={firstName:l.value,lastName:i.value,userName:h.value,email:m.value,password:x.value,confirmpassword:p.value},c=JSON.stringify(a),n={method:"post",url:"https://rate-my-city.herokuapp.com/api/register",headers:{"Content-Type":"application/json"},data:c},b()(n).then((function(e){var t=e.data;t.error&&""!==t.error?y(t.error):I(t)}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function C(t){localStorage.setItem("accessToken",t.accessToken),localStorage.setItem("userId",t.id),localStorage.setItem("userFirstName",t.firstName),localStorage.setItem("userLastName",t.lastName),localStorage.setItem("userName",t.userName),localStorage.setItem("userEmail",m.value),localStorage.setItem("userPassword",x.value),e.push("/")}function I(e){localStorage.setItem("userId",e.userId),localStorage.setItem("userFirstName",e.firstName),localStorage.setItem("userLastName",e.lastName),localStorage.setItem("userName",e.userName),localStorage.setItem("userEmail",e.email),window.location.reload(!1)}return Object(O.jsx)("div",{className:"container-fluid h-custom",children:Object(O.jsx)("div",{className:"row d-flex justify-content-center align-items-center h-100",children:Object(O.jsx)("div",{className:"col-md-8 col-lg-6 mt-5 col-xl-4 offset-xl-1",children:Object(O.jsxs)("form",{children:[Object(O.jsxs)("div",{className:"form-group row d-flex justify-content-center ",children:[Object(O.jsx)("div",{className:"col-md-4",children:Object(O.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:function(){return s(!1)},children:"Login"})}),Object(O.jsx)("div",{className:"col-md-4",children:Object(O.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:function(){return s(!0)},children:"Register"})})]}),Object(O.jsx)("div",{className:"divider d-flex align-items-center my-4 mt-0",children:Object(O.jsx)("p",{className:"text-center fw-bold mx-3 mb-5"})}),r&&Object(O.jsxs)("div",{className:"form-outline mt-4 mb-3",children:[Object(O.jsx)("input",{type:"text",autoFocus:!0,className:"form-control form-control-lg",placeholder:"Enter First Name",ref:function(e){return l=e}}),Object(O.jsx)("label",{className:"form-label",children:"First Name"})]}),r&&Object(O.jsxs)("div",{className:"form-outline mt-4 mb-3",children:[Object(O.jsx)("input",{type:"text",className:"form-control form-control-lg",placeholder:"Enter Last Name",ref:function(e){return i=e}}),Object(O.jsx)("label",{className:"form-label",children:"Last Name"})]}),Object(O.jsxs)("div",{className:"form-outline mt-4 mb-3",children:[Object(O.jsx)("input",{type:"email",autoFocus:!0,className:"form-control form-control-lg",placeholder:"Enter a valid email address",ref:function(e){return m=e},onChange:function(e){return function(e){var t=e.target.value;f.a.isEmail(t)?y(""):y("The email is not Valid")}(e)}}),Object(O.jsx)("label",{className:"form-label",children:"Email Address"})]}),r&&Object(O.jsxs)("div",{className:"form-outline mt-4 mb-3",children:[Object(O.jsx)("input",{type:"text",className:"form-control form-control-lg",placeholder:"Enter User Name",ref:function(e){return h=e}}),Object(O.jsx)("label",{className:"form-label",children:"User Name"})]}),Object(O.jsxs)("div",{className:"form-outline mb-3",children:[Object(O.jsx)("input",{type:"password",className:"form-control form-control-lg",placeholder:"Enter password",ref:function(e){return x=e},onChange:function(e){return S(e.target.value)}}),Object(O.jsx)("label",{className:"form-label",children:"Password"})]}),r&&Object(O.jsxs)("div",{className:"form-outline mt-4 mb-3",children:[Object(O.jsx)("input",{type:"password",className:"form-control form-control-lg",placeholder:"Confirm password",ref:function(e){return p=e},onChange:function(e){return S(e.target.value)}}),Object(O.jsx)("label",{className:"form-label",children:"Confirm password"})]}),Object(O.jsxs)("div",{className:"form-group row d-flex justify-content-center ",children:[!r&&Object(O.jsx)("div",{className:"col-md-4",children:Object(O.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:w,children:"Sign In"})}),r&&Object(O.jsx)("div",{className:"col-md-4",children:Object(O.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:k,children:"Sign In"})}),Object(O.jsx)("div",{className:"col-md-4",children:Object(O.jsx)("button",{type:"button",className:"btn btn-dark btn-lg form-control",onClick:function(){localStorage.clear(),e.push("/")},children:"Cancel"})}),Object(O.jsx)("div",{className:"divider d-flex align-items-center my-4",children:Object(O.jsx)("p",{className:"text-center fw-bold mx-3 mb-1",children:N})})]})]})})})})},p=function(){return Object(O.jsx)("div",{className:"container",children:Object(O.jsx)(x,{})})};var v=function(){return Object(O.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"10vh"},children:Object(O.jsx)("h1",{children:"Rate My City"})})},g=(a(5),a(274)),N=(a(277),a(87),a(144));var y=function(){var e=Object(o.g)(),t="",a="Login / Register",c=!1;localStorage.accessToken&&""!==localStorage.accessToken&&(t="Welcome: "+localStorage.userFirstName+" "+localStorage.userLastName,c=!0,a="Logout");var r=n.a.useState(c),s=Object(j.a)(r,2),l=s[0];return s[1],Object(O.jsxs)("div",{className:"container-fluid h-custom mt-5",children:[Object(O.jsx)("p",{children:"\xa0"}),Object(O.jsxs)("div",{className:"input-group mt-1 mb-2",children:[l&&Object(O.jsx)("div",{children:Object(O.jsxs)(g.a,{className:"input-group-append icon-play",id:"dropdown-basic-button",size:"sm",variant:"Secondary",menuVariant:"secondary",children:[Object(O.jsx)(N.a.Item,{className:"btn-group-sm",href:"#/action-1",onClick:function(){e.push("AddCity")},children:"Add City"}),Object(O.jsx)(N.a.Item,{className:"btn-group-sm",href:"#/action-1",children:"Delete Review"})]})}),Object(O.jsx)("input",{className:"form-control text-left fw-bold",disabled:"disabled",placeholder:t}),Object(O.jsx)("div",{className:"input-group-append",children:Object(O.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",onClick:function(){localStorage.accessToken&&""!==localStorage.accessToken?(t="",localStorage.clear(),window.location.reload(!1)):e.push("/login")},children:a})}),l&&Object(O.jsx)("div",{className:"input-group-append",children:Object(O.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",onClick:function(){e.push("/Settings")},children:"Settings"})})]})]})},S=a(105);a(265);var w=function(){var e=Object(c.useState)(!1),t=Object(j.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)(""),s=Object(j.a)(r,2),l=(s[0],s[1]),i=Object(c.useState)({}),d=Object(j.a)(i,2),u=d[0],m=d[1],h=Object(c.useState)({}),f=Object(j.a)(h,2),x=f[0],p=f[1],v=Object(c.useState)({}),g=Object(j.a)(v,2),N=g[0],y=g[1],w=Object(o.g)();function k(e,t){return!!t.selected.length||e.label.toLowerCase().indexOf(t.text.toLowerCase())>-1}Object(c.useEffect)((function(){localStorage.accessToken&&""!==localStorage.accessToken&&n(!0),function(){var e={method:"get",url:"https://rate-my-city.herokuapp.com/api/listCities"};b()(e).then((function(e){var t=e.data;t.error?l(t.error):(l(t.error),m(t.map((function(e){return{label:e.name}}))))}));e={method:"get",url:"https://rate-my-city.herokuapp.com/api/listStates"};b()(e).then((function(e){var t=e.data;t.error?l(t.error):(l(t.error),p(t.map((function(e){return{label:e.state}}))))}));e={method:"get",url:"https://rate-my-city.herokuapp.com/api/listUserName"};b()(e).then((function(e){var t=e.data;t.error?l(t.error):(l(t.error),y(t.map((function(e){return{label:e.userName}}))))}))}()}),[]);var C=function(e){var t=e.isOpen,a=e.onClick;return Object(O.jsx)("button",{className:"toggle-button",onClick:a,onMouseDown:function(e){e.preventDefault()},children:t?"\u25b2":"\u25bc"})};return Object(O.jsxs)("div",{className:"input-group d-flex justify-content-center",children:[Object(O.jsx)("div",{className:"form-group",children:Object(O.jsx)(S.a,{filterBy:k,options:u,placeholder:"Search by City ...",children:function(e){var t=e.isMenuShown,a=e.toggleMenu;return Object(O.jsx)(C,{isOpen:t,onClick:function(e){return a()}})}})}),Object(O.jsx)("div",{className:"form-group",children:Object(O.jsx)(S.a,{filterBy:k,options:x,placeholder:"Search by state ...",children:function(e){var t=e.isMenuShown,a=e.toggleMenu;return Object(O.jsx)(C,{isOpen:t,onClick:function(e){return a()}})}})}),Object(O.jsx)("div",{className:"form-group",children:Object(O.jsx)(S.a,{filterBy:k,options:N,placeholder:"Search by User ...",children:function(e){var t=e.isMenuShown,a=e.toggleMenu;return Object(O.jsx)(C,{isOpen:t,onClick:function(e){return a()}})}})}),Object(O.jsxs)("div",{children:[Object(O.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",children:"Search"}),a&&Object(O.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",onClick:function(){w.push("AddCity")},children:"Add City"})]}),Object(O.jsxs)("div",{children:[Object(O.jsx)("p",{children:"\xa0"}),Object(O.jsx)("p",{children:"\xa0"}),Object(O.jsx)("p",{children:"\xa0"}),Object(O.jsx)("p",{children:"\xa0"}),Object(O.jsx)("p",{children:"\xa0"})]})]})},k=function(){return Object(O.jsxs)("div",{className:"container",children:[Object(O.jsx)(y,{}),Object(O.jsx)(v,{}),Object(O.jsx)(w,{})]})},C=a(275),I=a(276);var T=function(){var e=Object(c.useState)(!1),t=Object(j.a)(e,2),a=(t[0],t[1],Object(c.useState)("")),n=Object(j.a)(a,2),r=n[0],s=n[1],l=Object(c.useState)(""),i=Object(j.a)(l,2),m=i[0],h=i[1],f=Object(c.useState)(""),x=Object(j.a)(f,2),p=x[0],v=x[1],g=Object(c.useState)("0"),N=Object(j.a)(g,2),y=N[0],S=N[1],w=Object(c.useState)("0"),k=Object(j.a)(w,2),T=k[0],E=k[1],L=Object(c.useState)("0"),F=Object(j.a)(L,2),P=F[0],M=F[1],U=Object(c.useState)("0"),A=Object(j.a)(U,2),D=A[0],J=A[1],R=Object(c.useState)("0"),B=Object(j.a)(R,2),V=B[0],z=B[1],W=Object(c.useState)("0"),q=Object(j.a)(W,2),G=q[0],H=q[1],K=Object(c.useState)("0"),Q=Object(j.a)(K,2),X=Q[0],Y=Q[1],Z=[{name:"1",value:"1"},{name:"2",value:"2"},{name:"3",value:"3"},{name:"4",value:"4"},{name:"5",value:"5"}],$=Object(o.g)(),_=Object(c.useState)(""),ee=Object(j.a)(_,2),te=ee[0],ae=ee[1],ce=function(){var e=Object(u.a)(d.a.mark((function e(t){var a,c,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={email:localStorage.userEmail,city:r,state:m,rating:{entertainment:y,nature:T,cost:P,safety:D,culture:V,transportation:G,food:X},review:p,jwtToken:localStorage.accessToken},c=JSON.stringify(a),n={method:"post",url:"https://rate-my-city.herokuapp.com/api/addRating",headers:{"Content-Type":"application/json"},data:c},b()(n).then((function(e){var t=e.data;t.error?ae(t.error):(ae(""),ne(t))}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function ne(e){localStorage.setItem("accessToken",e.jwtToken.accessToken),$.push("/")}return Object(O.jsx)("div",{className:"container-fluid h-custom mt-0",children:Object(O.jsx)("div",{className:"row d-flex justify-content-center align-items-center h-100",children:Object(O.jsx)("div",{className:"col-md-8 col-lg-6 col-xl-4 offset-xl-1",children:Object(O.jsxs)("form",{children:[Object(O.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"8vh"},children:Object(O.jsx)("h1",{children:"Add Review / City"})}),Object(O.jsx)("div",{className:"divider d-flex align-items-center mt-0 my-4",children:Object(O.jsx)("p",{className:"text-center fw-bold mx-3 mb-3"})}),Object(O.jsxs)("div",{className:"form-outline mt-1 mb-2",children:[Object(O.jsx)("input",{type:"text",autoFocus:!0,className:"form-control form-control-lg",value:r,onChange:function(e){s(e.target.value)},placeholder:"Only enter US city"}),Object(O.jsx)("label",{className:"form-label",children:"Enter City"})]}),Object(O.jsxs)("div",{className:"form-outline mb-2",children:[Object(O.jsx)("input",{type:"text",className:"form-control form-control-lg",value:m,onChange:function(e){h(e.target.value)},placeholder:"Only enter US state"}),Object(O.jsx)("label",{className:"form-label",children:"Enter State"})]}),Object(O.jsxs)("div",{className:"form-outline mb-3",children:[Object(O.jsx)("input",{type:"text",className:"form-control form-control-lg",value:p,onChange:function(e){v(e.target.value)},placeholder:"Enter your review"}),Object(O.jsx)("label",{className:"form-label",children:"Enter Comment.  (Max. 250 characters)"})]}),Object(O.jsx)("div",{className:"div-table",children:Object(O.jsxs)("table",{className:"inline-table",children:[Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Entertainment:\xa0"}),Object(O.jsx)("td",{children:Object(O.jsx)(C.a,{children:Z.map((function(e,t){return Object(O.jsx)(I.a,{id:"radio1-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark ",name:"radio1",value:e.value,checked:y===e.value,onChange:function(e){return S(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Nature :"}),Object(O.jsx)("td",{children:Object(O.jsx)(C.a,{children:Z.map((function(e,t){return Object(O.jsx)(I.a,{id:"radio2-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio2",value:e.value,checked:T===e.value,onChange:function(e){return E(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Cost :"}),Object(O.jsx)("td",{children:Object(O.jsx)(C.a,{children:Z.map((function(e,t){return Object(O.jsx)(I.a,{id:"radio3-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio3",value:e.value,checked:P===e.value,onChange:function(e){return M(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Safety :"}),Object(O.jsx)("td",{children:Object(O.jsx)(C.a,{children:Z.map((function(e,t){return Object(O.jsx)(I.a,{id:"radio4-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio4",value:e.value,checked:D===e.value,onChange:function(e){return J(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Culture :"}),Object(O.jsx)("td",{children:Object(O.jsx)(C.a,{children:Z.map((function(e,t){return Object(O.jsx)(I.a,{id:"radio5-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio5",value:e.value,checked:V===e.value,onChange:function(e){return z(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Transportation:\xa0\xa0\xa0 "}),Object(O.jsx)("td",{children:Object(O.jsx)(C.a,{children:Z.map((function(e,t){return Object(O.jsx)(I.a,{id:"radio6-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio6",value:e.value,checked:G===e.value,onChange:function(e){return H(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"Food: "}),Object(O.jsx)("td",{children:Object(O.jsx)(C.a,{children:Z.map((function(e,t){return Object(O.jsx)(I.a,{id:"radio7-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio7",value:e.value,checked:X===e.value,onChange:function(e){return Y(e.currentTarget.value)},children:e.name},t)}))})})]})]})}),Object(O.jsxs)("div",{className:"form-group row d-flex justify-content-center mt-4",children:[Object(O.jsx)("div",{className:"col-md-3",children:Object(O.jsx)("button",{type:"button",className:"btn btn-secondary btn-lg align-items-center",onClick:ce,children:"Add"})}),Object(O.jsx)("div",{className:"col-md-3",children:Object(O.jsx)("button",{type:"button",className:"btn btn-dark btn-lg align-items-center",onClick:function(){$.push("/")},children:"Cancel"})}),Object(O.jsx)("div",{className:"divider d-flex align-items-center mt-1 my-4",children:Object(O.jsx)("p",{className:"text-center fw-bold mx-3 mb-5",children:te})})]})]})})})})},E=function(){return Object(O.jsx)("div",{className:"container",children:Object(O.jsx)(T,{})})};var L=function(){var e=Object(o.g)(),t=Object(c.useState)(""),a=Object(j.a)(t,2),n=a[0],r=a[1],s=Object(c.useState)(localStorage.userFirstName),l=Object(j.a)(s,2),i=l[0],m=l[1],h=Object(c.useState)(localStorage.userLastName),f=Object(j.a)(h,2),x=f[0],p=f[1],v=Object(c.useState)(localStorage.userName),g=Object(j.a)(v,2),N=g[0],y=g[1],S=Object(c.useState)(localStorage.userEmail),w=Object(j.a)(S,2),k=w[0],C=(w[1],Object(c.useState)(localStorage.userPassword)),I=Object(j.a)(C,2),T=I[0],E=I[1],L=Object(c.useState)(localStorage.userPassword),F=Object(j.a)(L,2),P=F[0],M=F[1],U=Object(c.useState)(localStorage.userPassword),A=Object(j.a)(U,2),D=A[0],J=A[1],R=function(){var e=Object(u.a)(d.a.mark((function e(t){var a,c,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={userId:localStorage.userId,firstName:i,lastName:x,userName:N,email:k,password:P,confirmpassword:D,jwtToken:localStorage.accessToken},c=JSON.stringify(a),n={method:"post",url:"https://rate-my-city.herokuapp.com/api/settings",headers:{"Content-Type":"application/json"},data:c},b()(n).then((function(e){var t=e.data;t.error&&""!==t.error?r(t.error):(r(""),B(t))}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function B(t){localStorage.setItem("accessToken",t.jwtToken.accessToken),localStorage.setItem("userId",t.id),localStorage.setItem("userFirstName",t.firstName),localStorage.setItem("userLastName",t.lastName),localStorage.setItem("userName",t.userName),localStorage.setItem("userEmail",t.email),localStorage.setItem("userPassword",P.value),e.push("/")}return Object(O.jsx)("div",{className:"container-fluid h-custom",children:Object(O.jsx)("div",{className:"row d-flex justify-content-center align-items-center h-100",children:Object(O.jsx)("div",{className:"col-md-8 col-lg-6 col-xl-4 offset-xl-1",children:Object(O.jsxs)("form",{children:[Object(O.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"8vh"},children:Object(O.jsx)("h1",{children:"Settings"})}),Object(O.jsxs)("div",{className:"form-outline mt-4 mb-2",children:[Object(O.jsx)("input",{type:"text",autoFocus:!0,className:"form-control form-control-lg",value:i,onChange:function(e){m(e.target.value)},placeholder:"Enter First Name"}),Object(O.jsx)("label",{className:"form-label",children:"First Name"})]}),Object(O.jsxs)("div",{className:"form-outline mb-2",children:[Object(O.jsx)("input",{type:"text",className:"form-control form-control-lg",value:x,onChange:function(e){p(e.target.value)},placeholder:"Enter Last Name"}),Object(O.jsx)("label",{className:"form-label",children:"Last Name"})]}),Object(O.jsxs)("div",{className:"form-outline mb-2",children:[Object(O.jsx)("input",{type:"text",className:"form-control form-control-lg",value:N,onChange:function(e){y(e.target.value)},placeholder:"Enter User Name"}),Object(O.jsx)("label",{className:"form-label",children:"Username"})]}),Object(O.jsxs)("div",{className:"form-outline mb-2",children:[Object(O.jsx)("input",{type:"password",className:"form-control form-control-lg",value:T,onChange:function(e){E(e.target.value)},placeholder:"Enter Old Password"}),Object(O.jsx)("label",{className:"form-label",children:"Old Password"})]}),Object(O.jsxs)("div",{className:"form-outline mb-2",children:[Object(O.jsx)("input",{type:"password",className:"form-control form-control-lg",value:P,onChange:function(e){M(e.target.value)},placeholder:"Enter New Password"}),Object(O.jsx)("label",{className:"form-label",children:"New Password"})]}),Object(O.jsxs)("div",{className:"form-outline mb-3",children:[Object(O.jsx)("input",{type:"password",className:"form-control form-control-lg",value:D,onChange:function(e){J(e.target.value)},placeholder:"Confirm password"}),Object(O.jsx)("label",{className:"form-label",children:"Confirm Password"})]}),Object(O.jsxs)("div",{className:"form-group row d-flex justify-content-center ",children:[Object(O.jsx)("div",{className:"col-md-4",children:Object(O.jsx)("button",{type:"button",className:"btn btn-secondary btn-lg form-control",onClick:R,children:"Update"})}),Object(O.jsx)("div",{className:"col-md-4",children:Object(O.jsx)("button",{type:"button",className:"btn btn-dark btn-lg form-control",onClick:function(){e.push("/")},children:"Cancel"})}),Object(O.jsx)("div",{className:"divider d-flex align-items-center my-4",children:Object(O.jsx)("p",{className:"text-center fw-bold mx-3 mb-1",children:n})})]})]})})})})},F=function(){return Object(O.jsx)("div",{className:"container",children:Object(O.jsx)(L,{})})};var P=function(){return Object(O.jsx)(l.a,{children:Object(O.jsxs)(o.d,{children:[Object(O.jsx)(o.b,{path:"/",exact:!0,children:Object(O.jsx)(k,{})}),Object(O.jsx)(o.b,{path:"/login",exact:!0,children:Object(O.jsx)(p,{})}),Object(O.jsx)(o.b,{path:"/AddCity",exact:!0,children:Object(O.jsx)(E,{})}),Object(O.jsx)(o.b,{path:"/Settings",exact:!0,children:Object(O.jsx)(F,{})}),Object(O.jsx)(o.a,{to:"/"})]})})};s.a.render(Object(O.jsx)(n.a.StrictMode,{children:Object(O.jsx)(P,{})}),document.getElementById("root"))},74:function(e,t,a){}},[[266,1,2]]]);
//# sourceMappingURL=main.5e2db490.chunk.js.map