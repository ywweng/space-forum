var V=Object.defineProperty;var w=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var b=(t,o,a)=>o in t?V(t,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[o]=a,k=(t,o)=>{for(var a in o||(o={}))B.call(o,a)&&b(t,a,o[a]);if(w)for(var a of w(o))F.call(o,a)&&b(t,a,o[a]);return t};import{_ as C,u as I,r as u,m as P,s as z,f as j,a as N,b as v,o as l,c as d,d as e,t as c,w as E,v as M,e as f,g as $,F as S,h as U,i as x,T as R,p as A,j as T,k as q}from"./index.321e9634.js";const G={props:["replies"],setup(t,{emit:o}){const s=I().params.id,i=u([]),p=P(),{user:r,isRegister:m}=z(p),n=async h=>{try{const{data:y}=await x.getComments(h);i.value=y}catch{}};n(s);const _=u(""),g=u(!1);return{fromNow:j,setAvatar:N,comments:i,user:r,isRegister:m,comment:_,reply:async()=>{if(_.value===""){R.fire({title:"\u4E0D\u53EF\u7A7A\u767D",icon:"warning"});return}else{const h={postId:s,user:r.value,date:new Date,comment:_.value};g.value=!0;const{data:y}=await x.postComment(h);console.log(y,h);const L=u(t.replies);o("afterReply",L.value+1),i.value.unshift(h),R.fire({title:"\u7559\u8A00\u6210\u529F",icon:"success"}),_.value="",g.value=!1,n(s)}},isProcessing:g}}},H=t=>(A("data-v-d98e64fc"),t=t(),T(),t),J={class:"reply w-100 p-3"},K={key:0,class:"d-flex align-items-center w-100"},O={class:"info"},Q={class:"nickname fs-5"},W={class:"id"},X=["disabled"],Y={key:1},Z=H(()=>e("span",null,"\u586B\u5BEB\u540D\u7A31\u5F8C\u624D\u80FD\u7559\u8A00\u3002",-1)),ee=q("\u9EDE\u6211\u53BB\u586B\u5BEB"),se={class:"comment-header d-flex justify-content-between align-items-center my-1"},te={class:"info d-flex my-auto"},oe=["src"],ne={class:"nickname fs-4"},ae={class:"id"},ce={class:"datetime"},ie={class:"justify-content-center"},re={class:"comment-body ps-3 ms-4"},le={class:"content"};function de(t,o,a,s,i,p){const r=v("ion-icon"),m=v("router-link");return l(),d(S,null,[e("div",J,[s.isRegister?(l(),d("div",K,[e("div",O,[e("span",Q,c(s.user.name),1),e("span",W,"#"+c(s.user.id),1)]),E(e("textarea",{type:"text",class:"reply-text mx-2 w-100",placeholder:"\u7559\u8A00...",maxlength:"100","onUpdate:modelValue":o[0]||(o[0]=n=>s.comment=n)},null,512),[[M,s.comment,void 0,{trim:!0}]]),e("button",{type:"button",class:"btn",onClick:o[1]||(o[1]=(...n)=>s.reply&&s.reply(...n)),disabled:s.isProcessing},[f(r,{name:"send-outline"})],8,X)])):(l(),d("div",Y,[Z,f(m,{to:"/profile"},{default:$(()=>[ee]),_:1})]))]),(l(!0),d(S,null,U(s.comments,n=>(l(),d("div",{class:"comment d-flex flex-column p-3 my-2",key:n.id},[e("div",se,[e("div",te,[e("img",{src:s.setAvatar(n.user.avatar),class:"avatar me-2 rounded-circle"},null,8,oe),e("span",ne,c(n.user.name),1),e("span",ae,"#"+c(n.user.id),1)]),e("div",ce,[e("span",ie,c(s.fromNow(n.date)),1)])]),e("div",re,[e("span",le,c(n.comment),1)])]))),128))],64)}var _e=C(G,[["render",de],["__scopeId","data-v-d98e64fc"]]);const pe={components:{Comments:_e},emits:["afterReply"],setup(t,{emit:o}){const s=I().params.id,i=u({user:{avatar:""}}),p=u(!0);return(async n=>{try{const{data:_}=await x.getSpace(n);i.value=k({},_[0]),p.value=!1}catch{}})(s),{isLoading:p,setAvatar:N,fromNow:j,space:i,afterReply:async n=>{i.value.replies=n,await x.putSpace(i.value)}}}},D=t=>(A("data-v-e8a4e16c"),t=t(),T(),t),me={id:"card"},ue={class:"d-flex align-items-center pt-4"},fe=D(()=>e("h1",{class:"logo px-2 mx-auto"},"Space",-1)),he={key:0,class:"d-flex justify-content-center align-items-center vh-100"},ve=D(()=>e("div",{class:"spinner-border",role:"status",style:{width:"3rem",height:"3rem"}},[e("span",{class:"visually-hidden"},"Loading...")],-1)),ye=[ve],xe={key:1,class:"space d-flex flex-column my-3 p-1"},ge={class:"space-header d-flex justify-content-between align-items-center p-3"},we={class:"info d-flex my-auto"},be=["src"],ke={class:"nickname fs-4"},Se={class:"id"},Re={class:"datetime"},Ce={class:"justify-content-center"},Ie={class:"space-body px-3"},je={class:"title fs-5"},Ne={class:"content"},$e={class:"space-footer d-flex justify-content-around py-1"},Ae={class:"d-flex align-center"},Te={type:"button",class:"pt-2 action"},De={class:"m-2 comment-count"};function Le(t,o,a,s,i,p){const r=v("ion-icon"),m=v("router-link"),n=v("Comments");return l(),d("div",me,[e("div",ue,[f(m,{to:"/"},{default:$(()=>[f(r,{size:"large",name:"chevron-back-outline"})]),_:1}),fe]),s.isLoading?(l(),d("div",he,ye)):(l(),d("div",xe,[e("div",ge,[e("div",we,[e("img",{src:s.setAvatar(s.space.user.gender),class:"avatar me-3 rounded-circle"},null,8,be),e("span",ke,c(s.space.user.name),1),e("span",Se,"#"+c(s.space.user.id),1)]),e("div",Re,[e("span",Ce,c(s.fromNow(s.space.date)),1)])]),e("div",Ie,[e("h5",je,c(s.space.title),1),e("span",Ne,c(s.space.content),1)]),e("div",$e,[e("div",Ae,[e("button",Te,[f(r,{name:"chatbubbles-outline"})]),e("span",De,c(s.space.replies||0),1)])])])),f(n,{replies:s.space.replies,onAfterReply:s.afterReply},null,8,["replies","onAfterReply"])])}var Pe=C(pe,[["render",Le],["__scopeId","data-v-e8a4e16c"]]);export{Pe as default};
