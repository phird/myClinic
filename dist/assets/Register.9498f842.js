import{r as F,A as L,X as w,j as e,n as r,Y as j,L as f,Z as h,$ as G,a0 as P,a3 as E,a4 as c,a5 as u,a6 as g,M as n,a7 as S,a8 as T}from"./index.3d4f9967.js";import{u as M,a as A,M as D}from"./App.8b0d2a9d.js";import{u as z,C as m}from"./index.esm.a3ec6cec.js";import{I}from"./index.1773765d.js";import{i as $,a as R}from"./register-v2-dark.26352da2.js";/* empty css                            */import{F as Z,T as B,G as O}from"./twitter.f39ee0f4.js";const V={email:"",terms:!1,username:"",password:""},_=()=>{const y=F.exports.useContext(L),{skin:b}=M(),v=w(),N=A(),{control:o,setError:d,handleSubmit:x,formState:{errors:t}}=z({defaultValues:V});return e("div",{className:"auth-wrapper auth-cover",children:r(j,{className:"auth-inner m-0",children:[r(f,{className:"brand-logo",to:"/",onClick:a=>a.preventDefault(),children:[r("svg",{viewBox:"0 0 139 95",version:"1.1",height:"28",children:[r("defs",{children:[r("linearGradient",{x1:"100%",y1:"10.5120544%",x2:"50%",y2:"89.4879456%",id:"linearGradient-1",children:[e("stop",{stopColor:"#000000",offset:"0%"}),e("stop",{stopColor:"#FFFFFF",offset:"100%"})]}),r("linearGradient",{x1:"64.0437835%",y1:"46.3276743%",x2:"37.373316%",y2:"100%",id:"linearGradient-2",children:[e("stop",{stopColor:"#EEEEEE",stopOpacity:"0",offset:"0%"}),e("stop",{stopColor:"#FFFFFF",offset:"100%"})]})]}),e("g",{id:"Page-1",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd",children:e("g",{id:"Artboard",transform:"translate(-400.000000, -178.000000)",children:r("g",{id:"Group",transform:"translate(400.000000, 178.000000)",children:[e("path",{d:"M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z",id:"Path",className:"text-primary",style:{fill:"currentColor"}}),e("path",{d:"M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z",id:"Path",fill:"url(#linearGradient-1)",opacity:"0.2"}),e("polygon",{id:"Path-2",fill:"#000000",opacity:"0.049999997",points:"69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"}),e("polygon",{id:"Path-2",fill:"#000000",opacity:"0.099999994",points:"69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"}),e("polygon",{id:"Path-3",fill:"url(#linearGradient-2)",opacity:"0.099999994",points:"101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"})]})})})]}),e("h2",{className:"brand-text text-primary ms-1",children:"Vuexy"})]}),e(h,{className:"d-none d-lg-flex align-items-center p-5",lg:"8",sm:"12",children:e("div",{className:"w-100 d-lg-flex align-items-center justify-content-center px-5",children:e("img",{className:"img-fluid",src:b==="dark"?$:R,alt:"Login Cover"})})}),e(h,{className:"d-flex align-items-center auth-bg px-2 p-lg-5",lg:"4",sm:"12",children:r(h,{className:"px-xl-2 mx-auto",sm:"8",md:"6",lg:"12",children:[e(G,{tag:"h2",className:"fw-bold mb-1",children:"Adventure starts here \u{1F680}"}),e(P,{className:"mb-2",children:"Make your app management easy and fun!"}),r(E,{action:"/",className:"auth-register-form mt-2",onSubmit:x(a=>{const p={...a};if(delete p.terms,Object.values(p).every(l=>l.length>0)&&a.terms===!0){const{username:l,email:k,password:C}=a;S.register({username:l,email:k,password:C}).then(s=>{if(s.data.error)for(const i in s.data.error)s.data.error[i]!==null&&d(i,{type:"manual",message:s.data.error[i]});else{const i={...s.data.user,accessToken:s.data.accessToken};y.update(s.data.user.ability),N(T(i)),v("/")}}).catch(s=>console.log(s))}else for(const l in a)a[l].length===0&&d(l,{type:"manual",message:`Please enter a valid ${l}`}),l==="terms"&&a.terms===!1&&d("terms",{type:"manual"})}),children:[r("div",{className:"mb-1",children:[e(c,{className:"form-label",for:"register-username",children:"Username"}),e(m,{id:"username",name:"username",control:o,render:({field:a})=>e(u,{autoFocus:!0,placeholder:"johndoe",invalid:t.username&&!0,...a})}),t.username?e(g,{children:t.username.message}):null]}),r("div",{className:"mb-1",children:[e(c,{className:"form-label",for:"register-email",children:"Email"}),e(m,{id:"email",name:"email",control:o,render:({field:a})=>e(u,{type:"email",placeholder:"john@example.com",invalid:t.email&&!0,...a})}),t.email?e(g,{children:t.email.message}):null]}),r("div",{className:"mb-1",children:[e(c,{className:"form-label",for:"register-password",children:"Password"}),e(m,{id:"password",name:"password",control:o,render:({field:a})=>e(I,{className:"input-group-merge",invalid:t.password&&!0,...a})})]}),r("div",{className:"form-check mb-1",children:[e(m,{name:"terms",control:o,render:({field:a})=>e(u,{...a,id:"terms",type:"checkbox",checked:a.value,invalid:t.terms&&!0})}),r(c,{className:"form-check-label",for:"terms",children:["I agree to",e("a",{className:"ms-25",href:"/",onClick:a=>a.preventDefault(),children:"privacy policy & terms"})]})]}),e(n,{type:"submit",block:!0,color:"primary",children:"Sign up"})]}),r("p",{className:"text-center mt-2",children:[e("span",{className:"me-25",children:"Already have an account?"}),e(f,{to:"/login",children:e("span",{children:"Sign in instead"})})]}),e("div",{className:"divider my-2",children:e("div",{className:"divider-text",children:"or"})}),r("div",{className:"auth-footer-btn d-flex justify-content-center",children:[e(n,{color:"facebook",children:e(Z,{size:14})}),e(n,{color:"twitter",children:e(B,{size:14})}),e(n,{color:"google",children:e(D,{size:14})}),e(n,{className:"me-0",color:"github",children:e(O,{size:14})})]})]})})]})})};export{_ as default};
