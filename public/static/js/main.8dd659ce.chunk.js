(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{119:function(e,t,a){},242:function(e,t,a){"use strict";a.r(t);var c=a(1),n=a.n(c),r=a(22),s=a.n(r),l=(a(119),a(52),a(26)),o=a(12),i=(a(33),a(17)),d=a.n(i),j=a(27),u=a(6),b=a(14),m=a.n(b),h=a(49),O=a.n(h),x=a(0);var f=function(){var e=Object(o.g)(),t=n.a.useState(!1),a=Object(u.a)(t,2),r=a[0],s=a[1],l="",i="",b="",h="",f="",p="",v=Object(c.useState)(""),g=Object(u.a)(v,2),N=g[0],y=g[1],S=function(e){O.a.isStrongPassword(e,{minLength:8,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols:1})?y(""):y("The password in not strong enough")},w=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,c,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={email:b.value,password:f.value},c=JSON.stringify(a),n={method:"post",url:"https://rate-my-city.herokuapp.com/api/login",headers:{"Content-Type":"application/json"},data:c},m()(n).then((function(e){var t=e.data;t.error?y(t.error):C(t)}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,c,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:""===N&&(t.preventDefault(),a={firstName:l.value,lastName:i.value,userName:h.value,email:b.value,password:f.value,confirmpassword:p.value},c=JSON.stringify(a),n={method:"post",url:"https://rate-my-city.herokuapp.com/api/register",headers:{"Content-Type":"application/json"},data:c},m()(n).then((function(e){var t=e.data;t.error&&""!==t.error?y(t.error):T(t)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function C(t){localStorage.setItem("accessToken",t.accessToken),localStorage.setItem("userId",t.id),localStorage.setItem("userFirstName",t.firstName),localStorage.setItem("userLastName",t.lastName),localStorage.setItem("userName",t.userName),localStorage.setItem("userEmail",b.value),localStorage.setItem("userPassword",f.value),e.push("/")}function T(t){localStorage.clear(),e.push("/")}return Object(x.jsx)("div",{className:"container-fluid h-custom",children:Object(x.jsx)("div",{className:"row d-flex justify-content-center align-items-center h-100",children:Object(x.jsx)("div",{className:"col-md-8 col-lg-6 mt-3 col-xl-4 offset-xl-1",children:Object(x.jsxs)("form",{children:[Object(x.jsxs)("div",{className:"form-group row d-flex justify-content-center",children:[Object(x.jsx)("div",{className:"col-md-4",children:Object(x.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:function(){return s(!1)},children:"Login"})}),Object(x.jsx)("div",{className:"col-md-4",children:Object(x.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:function(){return s(!0)},children:"Register"})})]}),Object(x.jsx)("div",{className:"divider d-flex align-items-center my-4 mt-0",children:Object(x.jsx)("p",{className:"text-center fw-bold mx-3 mb-4"})}),r&&Object(x.jsxs)("div",{className:"form-outline mt-0 mb-2",children:[Object(x.jsx)("input",{type:"text",autoFocus:!0,className:"form-control",placeholder:"Enter First Name",ref:function(e){return l=e}}),Object(x.jsx)("label",{className:"form-label",children:"First Name"})]}),r&&Object(x.jsxs)("div",{className:"form-outline mt-3 mb-2",children:[Object(x.jsx)("input",{type:"text",className:"form-control",placeholder:"Enter Last Name",ref:function(e){return i=e}}),Object(x.jsx)("label",{className:"form-label",children:"Last Name"})]}),r&&Object(x.jsxs)("div",{className:"form-outline mt-3 mb-2",children:[Object(x.jsx)("input",{type:"text",className:"form-control",placeholder:"Enter User Name",ref:function(e){return h=e}}),Object(x.jsx)("label",{className:"form-label",children:"User Name"})]}),Object(x.jsxs)("div",{className:"form-outline mt-3 mb-2",children:[Object(x.jsx)("input",{type:"email",autoFocus:!0,className:"form-control form-control-lg",placeholder:"Enter a valid email address",ref:function(e){return b=e},onChange:function(e){return function(e){var t=e.target.value;O.a.isEmail(t)?y(""):y("The email is not Valid")}(e)}}),Object(x.jsx)("label",{className:"form-label",children:"Email Address"})]}),Object(x.jsxs)("div",{className:"form-outline my-3 mb-2",children:[Object(x.jsx)("input",{type:"password",className:"form-control form-control-lg",placeholder:"Enter password",ref:function(e){return f=e},onChange:function(e){return S(e.target.value)}}),Object(x.jsx)("label",{className:"form-label",children:"Password"})]}),r&&Object(x.jsxs)("div",{className:"form-outline mt-3 mb-2",children:[Object(x.jsx)("input",{type:"password",className:"form-control",placeholder:"Confirm password",ref:function(e){return p=e},onChange:function(e){return S(e.target.value)}}),Object(x.jsx)("label",{className:"form-label",children:"Confirm password"})]}),Object(x.jsxs)("div",{className:"form-group row d-flex justify-content-center ",children:[!r&&Object(x.jsx)("div",{className:"col-md-4",children:Object(x.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:w,children:"Sign In"})}),r&&Object(x.jsx)("div",{className:"col-md-4",children:Object(x.jsx)("button",{type:"button",className:"btn text-white btn-lg fw-bold btn-outline-dark btn-secondary",onClick:k,children:"Sign In"})}),Object(x.jsx)("div",{className:"col-md-4",children:Object(x.jsx)("button",{type:"button",className:"btn btn-dark btn-lg form-control",onClick:function(){localStorage.clear(),e.push("/")},children:"Cancel"})}),Object(x.jsx)("div",{className:"divider d-flex align-items-center my-4",children:Object(x.jsx)("p",{className:"text-center fw-bold mx-3 mb-1",children:N})})]})]})})})})},p=function(){return Object(x.jsx)("div",{className:"container",children:Object(x.jsx)(f,{})})};var v=function(){return Object(x.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"10vh"},children:Object(x.jsx)("h1",{children:"Rate My City"})})};a(5),a(251),a(111);var g=function(){var e=Object(o.g)(),t="",a="Login / Register",c=!1;localStorage.accessToken&&""!==localStorage.accessToken&&(t="Welcome: "+localStorage.userFirstName+" "+localStorage.userLastName,c=!0,a="Logout");var r=n.a.useState(c),s=Object(u.a)(r,2),l=s[0];return s[1],Object(x.jsxs)("div",{className:"container-fluid h-custom mt-5",children:[Object(x.jsx)("p",{children:"\xa0"}),Object(x.jsxs)("div",{className:"input-group mt-1 mb-2",children:[Object(x.jsx)("input",{className:"form-control text-left fw-bold",disabled:"disabled",placeholder:t}),Object(x.jsx)("div",{className:"input-group-append",children:Object(x.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",onClick:function(){localStorage.accessToken&&""!==localStorage.accessToken?(t="",localStorage.clear(),window.location.reload(!1)):e.push("/login")},children:a})}),l&&Object(x.jsx)("div",{className:"input-group-append",children:Object(x.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",onClick:function(){e.push("/Settings")},children:"Settings"})})]})]})},N=a(62);a(94);var y=function(){var e=Object(c.useState)(!1),t=Object(u.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)(""),s=Object(u.a)(r,2),l=(s[0],s[1]),i=Object(c.useState)({}),d=Object(u.a)(i,2),j=d[0],b=d[1],h=Object(c.useState)({}),O=Object(u.a)(h,2),f=O[0],p=O[1],v=Object(c.useState)({}),g=Object(u.a)(v,2),y=g[0],S=g[1],w=Object(o.g)(),k=Object(c.useState)(""),C=Object(u.a)(k,2),T=C[0],I=C[1],E=Object(c.useState)(""),R=Object(u.a)(E,2),U=R[0],F=R[1],L=Object(c.useState)(""),M=Object(u.a)(L,2),P=M[0],A=M[1];function D(e,t){return!!t.selected.length||e.label.toLowerCase().indexOf(t.text.toLowerCase())>-1}Object(c.useEffect)((function(){localStorage.accessToken&&""!==localStorage.accessToken&&n(!0),localStorage.setItem("citySelected",""),localStorage.setItem("stateSelected",""),localStorage.setItem("userNameSelected",""),function(){var e={method:"get",url:"https://rate-my-city.herokuapp.com/api/listCities"};m()(e).then((function(e){var t=e.data;t.error?l(t.error):(l(t.error),b(t.map((function(e){return{label:e.name}}))))}));e={method:"get",url:"https://rate-my-city.herokuapp.com/api/listStates"};m()(e).then((function(e){var t=e.data;t.error?l(t.error):(l(t.error),p(t.map((function(e){return{label:e.state}}))))}));e={method:"get",url:"https://rate-my-city.herokuapp.com/api/listUserName"};m()(e).then((function(e){var t=e.data;t.error?l(t.error):(l(t.error),S(t.map((function(e){return{label:e.userName}}))))}))}()}),[]);var J=function(e){var t=e.isOpen,a=e.onClick;return Object(x.jsx)("button",{className:"toggle-button",onClick:a,onMouseDown:function(e){e.preventDefault()},children:t?"\u25b2":"\u25bc"})};return Object(x.jsxs)("div",{className:"input-group d-flex justify-content-center",children:[Object(x.jsx)("div",{className:"form-group",children:Object(x.jsx)(N.a,{id:"dropCity",filterBy:D,options:j,onChange:function(e){I(e[0].label)},placeholder:"Search by City ...",children:function(e){var t=e.isMenuShown,a=e.toggleMenu;return Object(x.jsx)(J,{isOpen:t,onClick:function(e){return a()}})}})}),Object(x.jsx)("div",{className:"form-group",children:Object(x.jsx)(N.a,{id:"dropState",filterBy:D,options:f,onChange:function(e){F(e[0].label)},placeholder:"Search by state ...",children:function(e){var t=e.isMenuShown,a=e.toggleMenu;return Object(x.jsx)(J,{isOpen:t,onClick:function(e){return a()}})}})}),Object(x.jsx)("div",{className:"form-group",children:Object(x.jsx)(N.a,{id:"dropUserName",filterBy:D,options:y,onChange:function(e){A(e[0].label)},placeholder:"Search by User ...",children:function(e){var t=e.isMenuShown,a=e.toggleMenu;return Object(x.jsx)(J,{isOpen:t,onClick:function(e){return a()}})}})}),Object(x.jsxs)("div",{children:[Object(x.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",onClick:function(){localStorage.setItem("citySelected",T),localStorage.setItem("stateSelected",U),localStorage.setItem("userNameSelected",P),w.push("ShowReviews")},children:"Search"}),a&&Object(x.jsx)("button",{className:"btn text-white fw-bold btn-outline-dark btn-secondary",onClick:function(){w.push("AddReview")},children:"Add Review"})]}),Object(x.jsx)("div",{children:Object(x.jsx)("p",{children:"\xa0"})})]})},S=a(36),w=a(37),k=a(58),C=a(61),T=a(60),I=(a(232),a(110)),E=a.n(I),R=function(e){Object(C.a)(a,e);var t=Object(T.a)(a);function a(e){var c;return Object(S.a)(this,a),(c=t.call(this,e)).state={reviews:[],message:"",showOptions:!!localStorage.accessToken},c.routerChange=c.routerChange.bind(Object(k.a)(c)),c}return Object(w.a)(a,[{key:"routerChange",value:function(e,t){localStorage.setItem("cityReview",e),localStorage.setItem("stateReview",t),this.props.history.push("/AddReview")}},{key:"componentDidMount",value:function(){var e=this;this.axiosUrl="https://rate-my-city.herokuapp.com/api/",localStorage.userNameSelected?this.axiosUrl+="searchUsername":this.axiosUrl+="searchCityState",this.obj={city:localStorage.citySelected,state:localStorage.stateSelected,userName:localStorage.userNameSelected},this.js=JSON.stringify(this.obj),this.config={method:"post",url:this.axiosUrl,headers:{"Content-Type":"application/json"},data:this.js},m()(this.config).then((function(t){var a=t.data;a.error?e.setState({message:a.error}):e.setState({message:"",reviews:a})}))}},{key:"render",value:function(){var e=this,t=this.state.reviews,a=this.state.showOptions;return Object(x.jsx)("body",{children:Object(x.jsx)("div",{className:"container input-group justify-content-center",children:Object(x.jsx)("table",{className:"master-table",children:t.map((function(t){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("tr",{className:"city-separator",children:[Object(x.jsx)("td",{children:Object(x.jsxs)("span",{children:[t.name,", \xa0\xa0 ",t.state]})}),a&&Object(x.jsx)("td",{children:Object(x.jsx)("span",{children:Object(x.jsx)("button",{className:"btn btn-sm btn-secondary",onClick:function(){return e.routerChange(t.name,t.state)},type:"button",children:"Add Review"})})})]}),Object(x.jsx)("div",{className:"row justify-content-center",children:Object(x.jsx)("div",{className:"col-auto",children:Object(x.jsx)("table",{className:"table table-responsive mb-1 mt-0",children:Object(x.jsxs)("tr",{className:"rating-avg",children:[Object(x.jsx)("td",{children:"Cost:"}),Object(x.jsx)("td",{children:t.averageRating.cost}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Nature:"}),Object(x.jsx)("td",{children:t.averageRating.nature}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Culture:"}),Object(x.jsx)("td",{children:t.averageRating.culture}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Safety:"}),Object(x.jsx)("td",{children:t.averageRating.safety}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Entertaiment:"}),Object(x.jsx)("td",{children:t.averageRating.entertainment}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Transportation:"}),Object(x.jsx)("td",{children:t.averageRating.transportation}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Food:"}),Object(x.jsx)("td",{children:t.averageRating.food})]})})})}),Object(x.jsx)("div",{children:t.ratings.map((function(e,t){return Object(x.jsxs)("div",{className:"box",children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("tr",{children:Object(x.jsxs)("td",{className:"date-time",children:[e.userdetails.userName," wrote in ",E()(e.time).format("MM-DD-YYYY @ hh:mm A"),": "]})}),Object(x.jsx)("tr",{className:"rate-comment",children:e.description})]}),Object(x.jsx)("div",{className:"row justify-content-center",children:Object(x.jsx)("div",{className:"col-auto",children:Object(x.jsx)("table",{className:"table table-responsive mb-1 mt-0",children:Object(x.jsxs)("tr",{className:"rating-avg",children:[Object(x.jsx)("td",{children:"Cost:"}),Object(x.jsx)("td",{children:e.rating.cost}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Nature:"}),Object(x.jsx)("td",{children:e.rating.nature}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Culture:"}),Object(x.jsx)("td",{children:e.rating.culture}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Safety:"}),Object(x.jsx)("td",{children:e.rating.safety}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Entertaiment:"}),Object(x.jsx)("td",{children:e.rating.entertainment}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Transportation:"}),Object(x.jsx)("td",{children:e.rating.transportation}),Object(x.jsx)("td",{children:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),Object(x.jsx)("td",{children:"Food:"}),Object(x.jsx)("td",{children:e.rating.food})]})})})})]},t)}))})]})}))})})})}}]),a}(c.Component),U=Object(o.h)(R),F=function(){return Object(x.jsxs)("div",{className:"container",children:[Object(x.jsx)(g,{}),Object(x.jsx)(v,{}),Object(x.jsx)(y,{}),Object(x.jsx)(U,{})]})};var L=function(){var e=Object(c.useState)(!1),t=Object(u.a)(e,2),a=(t[0],t[1],Object(c.useState)("")),n=Object(u.a)(a,2),r=n[0],s=n[1],l=Object(c.useState)(""),i=Object(u.a)(l,2),b=i[0],h=i[1],O=Object(o.g)(),f=Object(c.useState)(""),p=Object(u.a)(f,2),v=p[0],g=p[1],N=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,c,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={name:r,state:b,country:"",jwtToken:localStorage.accessToken},c=JSON.stringify(a),n={method:"post",url:"https://rate-my-city.herokuapp.com/api/createCity",headers:{"Content-Type":"application/json"},data:c},m()(n).then((function(e){var t=e.data;t.error?g(t.error):(g(""),y(t))}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function y(e){localStorage.setItem("accessToken",e.jwtToken.accessToken),O.push("/")}return Object(x.jsx)("div",{className:"container-fluid h-custom mt-0",children:Object(x.jsx)("div",{className:"row d-flex justify-content-center align-items-center h-100",children:Object(x.jsx)("div",{className:"col-md-8 col-lg-6 col-xl-4 offset-xl-1",children:Object(x.jsxs)("form",{children:[Object(x.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"8vh"},children:Object(x.jsx)("h1",{children:"Add City"})}),Object(x.jsx)("div",{className:"divider d-flex align-items-center mt-0 my-4",children:Object(x.jsx)("p",{className:"text-center fw-bold mx-3 mb-3"})}),Object(x.jsxs)("div",{className:"form-outline mt-1 mb-2",children:[Object(x.jsx)("input",{type:"text",autoFocus:!0,className:"form-control form-control-lg",value:r,onChange:function(e){s(e.target.value)},placeholder:"Only enter US city"}),Object(x.jsx)("label",{className:"form-label",children:"Enter City"})]}),Object(x.jsxs)("div",{className:"form-outline mb-2",children:[Object(x.jsx)("input",{type:"text",className:"form-control form-control-lg",value:b,onChange:function(e){h(e.target.value)},placeholder:"Only enter US state"}),Object(x.jsx)("label",{className:"form-label",children:"Enter State"})]}),Object(x.jsxs)("div",{className:"form-group row d-flex justify-content-center mt-4",children:[Object(x.jsx)("div",{className:"col-md-3",children:Object(x.jsx)("button",{type:"button",className:"btn btn-secondary btn-lg align-items-center",onClick:N,children:"Add"})}),Object(x.jsx)("div",{className:"col-md-3",children:Object(x.jsx)("button",{type:"button",className:"btn btn-dark btn-lg align-items-center",onClick:function(){O.push("/")},children:"Cancel"})}),Object(x.jsx)("div",{className:"divider d-flex align-items-center mt-1 my-4",children:Object(x.jsx)("p",{className:"text-center fw-bold mx-3 mb-5",children:v})})]})]})})})})},M=function(){return Object(x.jsx)("div",{className:"container",children:Object(x.jsx)(L,{})})},P=a(249),A=a(250);var D=function(){var e=Object(c.useState)(!1),t=Object(u.a)(e,2),a=(t[0],t[1],Object(c.useState)(localStorage.cityReview)),n=Object(u.a)(a,2),r=n[0],s=n[1],l=Object(c.useState)(localStorage.stateReview),i=Object(u.a)(l,2),b=i[0],h=i[1],O=Object(c.useState)(""),f=Object(u.a)(O,2),p=f[0],v=f[1],g=Object(c.useState)("0"),N=Object(u.a)(g,2),y=N[0],S=N[1],w=Object(c.useState)("0"),k=Object(u.a)(w,2),C=k[0],T=k[1],I=Object(c.useState)("0"),E=Object(u.a)(I,2),R=E[0],U=E[1],F=Object(c.useState)("0"),L=Object(u.a)(F,2),M=L[0],D=L[1],J=Object(c.useState)("0"),B=Object(u.a)(J,2),Y=B[0],V=B[1],W=Object(c.useState)("0"),q=Object(u.a)(W,2),z=q[0],G=q[1],H=Object(c.useState)("0"),K=Object(u.a)(H,2),Q=K[0],X=K[1],Z=[{name:"1",value:"1"},{name:"2",value:"2"},{name:"3",value:"3"},{name:"4",value:"4"},{name:"5",value:"5"}],$=Object(o.g)(),_=Object(c.useState)(""),ee=Object(u.a)(_,2),te=ee[0],ae=ee[1],ce=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,c,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={name:r,state:b,country:"",jwtToken:localStorage.accessToken},c=JSON.stringify(a),n={method:"post",url:"https://rate-my-city.herokuapp.com/api/createCity",headers:{"Content-Type":"application/json"},data:c},m()(n).then((function(e){var t=e.data;t.error?ae(t.error):(ae(""),localStorage.setItem("accessToken",t.jwtToken))})),a={email:localStorage.userEmail,city:r,state:b,rating:{entertainment:y,nature:C,cost:R,safety:M,culture:Y,transportation:z,food:Q},review:p,jwtToken:localStorage.accessToken},c=JSON.stringify(a),n={method:"post",url:"https://rate-my-city.herokuapp.com/api/addRating",headers:{"Content-Type":"application/json"},data:c},m()(n).then((function(e){var t=e.data;t.error?ae(t.error):(ae(""),ne(t))}));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function ne(e){localStorage.setItem("accessToken",e.jwtToken.accessToken),$.push("/")}return Object(x.jsx)("div",{className:"container-fluid h-custom mt-0",children:Object(x.jsx)("div",{className:"row d-flex justify-content-center align-items-center h-100",children:Object(x.jsx)("div",{className:"col-md-8 col-lg-6 col-xl-4 offset-xl-1",children:Object(x.jsxs)("form",{children:[Object(x.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"8vh"},children:Object(x.jsx)("h1",{children:"Add Review / City"})}),Object(x.jsx)("div",{className:"divider d-flex align-items-center mt-0 my-4",children:Object(x.jsx)("p",{className:"text-center fw-bold mx-3 mb-3"})}),Object(x.jsxs)("div",{className:"form-outline mt-1 mb-2",children:[localStorage.cityReview?Object(x.jsx)("input",{type:"text",autoFocus:!0,className:"form-control form-control-lg",value:r,onChange:function(e){s(e.target.value)},placeholder:"Only enter US city",readOnly:!0}):Object(x.jsx)("input",{type:"text",autoFocus:!0,className:"form-control form-control-lg",value:r,onChange:function(e){s(e.target.value)},placeholder:"Only enter US city"}),Object(x.jsx)("label",{className:"form-label",children:"Enter City"})]}),Object(x.jsxs)("div",{className:"form-outline mb-2",children:[localStorage.cityReview?Object(x.jsx)("input",{type:"text",className:"form-control form-control-lg",value:b,onChange:function(e){h(e.target.value)},placeholder:"Only enter US state",readOnly:!0}):Object(x.jsx)("input",{type:"text",className:"form-control form-control-lg",value:b,onChange:function(e){h(e.target.value)},placeholder:"Only enter US state"}),Object(x.jsx)("label",{className:"form-label",children:"Enter State"})]}),Object(x.jsxs)("div",{className:"form-outline mb-3",children:[Object(x.jsx)("input",{type:"text",className:"form-control form-control-lg",value:p,onChange:function(e){v(e.target.value)},placeholder:"Enter your review"}),Object(x.jsx)("label",{className:"form-label",children:"Enter Comment.  (Max. 250 characters)"})]}),Object(x.jsx)("div",{className:"div-table",children:Object(x.jsxs)("table",{className:"inline-table",children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"Entertainment:\xa0"}),Object(x.jsx)("td",{children:Object(x.jsx)(P.a,{children:Z.map((function(e,t){return Object(x.jsx)(A.a,{id:"radio1-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark ",name:"radio1",value:e.value,checked:y===e.value,onChange:function(e){return S(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"Nature :"}),Object(x.jsx)("td",{children:Object(x.jsx)(P.a,{children:Z.map((function(e,t){return Object(x.jsx)(A.a,{id:"radio2-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio2",value:e.value,checked:C===e.value,onChange:function(e){return T(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"Cost :"}),Object(x.jsx)("td",{children:Object(x.jsx)(P.a,{children:Z.map((function(e,t){return Object(x.jsx)(A.a,{id:"radio3-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio3",value:e.value,checked:R===e.value,onChange:function(e){return U(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"Safety :"}),Object(x.jsx)("td",{children:Object(x.jsx)(P.a,{children:Z.map((function(e,t){return Object(x.jsx)(A.a,{id:"radio4-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio4",value:e.value,checked:M===e.value,onChange:function(e){return D(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"Culture :"}),Object(x.jsx)("td",{children:Object(x.jsx)(P.a,{children:Z.map((function(e,t){return Object(x.jsx)(A.a,{id:"radio5-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio5",value:e.value,checked:Y===e.value,onChange:function(e){return V(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"Transportation:\xa0\xa0\xa0 "}),Object(x.jsx)("td",{children:Object(x.jsx)(P.a,{children:Z.map((function(e,t){return Object(x.jsx)(A.a,{id:"radio6-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio6",value:e.value,checked:z===e.value,onChange:function(e){return G(e.currentTarget.value)},children:e.name},t)}))})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:"Food: "}),Object(x.jsx)("td",{children:Object(x.jsx)(P.a,{children:Z.map((function(e,t){return Object(x.jsx)(A.a,{id:"radio7-".concat(t),type:"radio",variant:"outline-secondary secondary text-dark",name:"radio7",value:e.value,checked:Q===e.value,onChange:function(e){return X(e.currentTarget.value)},children:e.name},t)}))})})]})]})}),Object(x.jsxs)("div",{className:"form-group row d-flex justify-content-center mt-4",children:[Object(x.jsx)("div",{className:"col-md-3",children:Object(x.jsx)("button",{type:"button",className:"btn btn-secondary btn-lg align-items-center",onClick:ce,children:"Add"})}),Object(x.jsx)("div",{className:"col-md-3",children:Object(x.jsx)("button",{type:"button",className:"btn btn-dark btn-lg align-items-center",onClick:function(){$.push("/")},children:"Cancel"})}),Object(x.jsx)("div",{className:"divider d-flex align-items-center mt-1 my-4",children:Object(x.jsx)("p",{className:"text-center fw-bold mx-3 mb-5",children:te})})]})]})})})})},J=function(){return Object(x.jsx)("div",{className:"container",children:Object(x.jsx)(D,{})})};var B=function(){var e=Object(o.g)(),t=Object(c.useState)(""),a=Object(u.a)(t,2),n=a[0],r=a[1],s=Object(c.useState)(localStorage.userFirstName),l=Object(u.a)(s,2),i=l[0],b=l[1],h=Object(c.useState)(localStorage.userLastName),f=Object(u.a)(h,2),p=f[0],v=f[1],g=Object(c.useState)(localStorage.userName),N=Object(u.a)(g,2),y=N[0],S=N[1],w=Object(c.useState)(localStorage.userEmail),k=Object(u.a)(w,2),C=k[0],T=(k[1],Object(c.useState)(localStorage.userPassword)),I=Object(u.a)(T,2),E=I[0],R=I[1],U=Object(c.useState)(localStorage.userPassword),F=Object(u.a)(U,2),L=F[0],M=F[1],P=Object(c.useState)(localStorage.userPassword),A=Object(u.a)(P,2),D=A[0],J=A[1],B=function(){var e=Object(j.a)(d.a.mark((function e(t){var a,c,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a={userId:localStorage.userId,firstName:i,lastName:p,userName:y,email:C,password:L,confirmpassword:D,jwtToken:localStorage.accessToken},c=JSON.stringify(a),n={method:"post",url:"https://rate-my-city.herokuapp.com/api/settings",headers:{"Content-Type":"application/json"},data:c},m()(n).then((function(e){var t=e.data;t.error&&""!==t.error?r(t.error):(r(""),Y(t))}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function Y(t){localStorage.setItem("accessToken",t.jwtToken.accessToken),localStorage.setItem("userId",t.id),localStorage.setItem("userFirstName",t.firstName),localStorage.setItem("userLastName",t.lastName),localStorage.setItem("userName",t.userName),localStorage.setItem("userEmail",t.email),localStorage.setItem("userPassword",L.value),e.push("/")}return Object(x.jsx)("div",{className:"container-fluid h-custom",children:Object(x.jsx)("div",{className:"row d-flex justify-content-center align-items-center h-100",children:Object(x.jsx)("div",{className:"col-md-8 col-lg-6 col-xl-4 offset-xl-1",children:Object(x.jsxs)("form",{children:[Object(x.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"8vh"},children:Object(x.jsx)("h1",{children:"Settings"})}),Object(x.jsxs)("div",{className:"form-outline mt-4 mb-2",children:[Object(x.jsx)("input",{type:"text",autoFocus:!0,className:"form-control form-control-lg",value:i,onChange:function(e){b(e.target.value)},placeholder:"Enter First Name"}),Object(x.jsx)("label",{className:"form-label",children:"First Name"})]}),Object(x.jsxs)("div",{className:"form-outline mb-2",children:[Object(x.jsx)("input",{type:"text",className:"form-control form-control-lg",value:p,onChange:function(e){v(e.target.value)},placeholder:"Enter Last Name"}),Object(x.jsx)("label",{className:"form-label",children:"Last Name"})]}),Object(x.jsxs)("div",{className:"form-outline mb-2",children:[Object(x.jsx)("input",{type:"text",className:"form-control form-control-lg",value:y,onChange:function(e){S(e.target.value)},placeholder:"Enter User Name"}),Object(x.jsx)("label",{className:"form-label",children:"Username"})]}),Object(x.jsxs)("div",{className:"form-outline mb-2",children:[Object(x.jsx)("input",{type:"password",className:"form-control form-control-lg",value:E,onChange:function(e){R(function(e){O.a.isStrongPassword(e,{minLength:8,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols:1})?r(""):r("The password in not strong enough")}(e.target.value))},placeholder:"Enter Old Password"}),Object(x.jsx)("label",{className:"form-label",children:"Old Password"})]}),Object(x.jsxs)("div",{className:"form-outline mb-2",children:[Object(x.jsx)("input",{type:"password",className:"form-control form-control-lg",value:L,onChange:function(e){M(e.target.value)},placeholder:"Enter New Password"}),Object(x.jsx)("label",{className:"form-label",children:"New Password"})]}),Object(x.jsxs)("div",{className:"form-outline mb-3",children:[Object(x.jsx)("input",{type:"password",className:"form-control form-control-lg",value:D,onChange:function(e){J(e.target.value)},placeholder:"Confirm password"}),Object(x.jsx)("label",{className:"form-label",children:"Confirm Password"})]}),Object(x.jsxs)("div",{className:"form-group row d-flex justify-content-center ",children:[Object(x.jsx)("div",{className:"col-md-4",children:Object(x.jsx)("button",{type:"button",className:"btn btn-secondary btn-lg form-control",onClick:B,children:"Update"})}),Object(x.jsx)("div",{className:"col-md-4",children:Object(x.jsx)("button",{type:"button",className:"btn btn-dark btn-lg form-control",onClick:function(){e.push("/")},children:"Cancel"})}),Object(x.jsx)("div",{className:"divider d-flex align-items-center my-4",children:Object(x.jsx)("p",{className:"text-center fw-bold mx-3 mb-1",children:n})})]})]})})})})},Y=function(){return Object(x.jsx)("div",{className:"container",children:Object(x.jsx)(B,{})})};var V=function(){return Object(x.jsx)(l.a,{children:Object(x.jsxs)(o.d,{children:[Object(x.jsx)(o.b,{path:"/",exact:!0,children:Object(x.jsx)(F,{})}),Object(x.jsx)(o.b,{path:"/login",exact:!0,children:Object(x.jsx)(p,{})}),Object(x.jsx)(o.b,{path:"/AddCity",exact:!0,children:Object(x.jsx)(M,{})}),Object(x.jsx)(o.b,{path:"/AddReview",exact:!0,children:Object(x.jsx)(J,{})}),Object(x.jsx)(o.b,{path:"/Settings",exact:!0,children:Object(x.jsx)(Y,{})}),Object(x.jsx)(o.a,{to:"/"})]})})};s.a.render(Object(x.jsx)(n.a.StrictMode,{children:Object(x.jsx)(V,{})}),document.getElementById("root"))},33:function(e,t,a){}},[[242,1,2]]]);
//# sourceMappingURL=main.8dd659ce.chunk.js.map