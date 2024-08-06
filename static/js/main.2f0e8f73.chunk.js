(this["webpackJsonppatient-management-frontend"]=this["webpackJsonppatient-management-frontend"]||[]).push([[0],{140:function(e,a,t){e.exports=t(158)},146:function(e,a,t){},158:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(117),i=t.n(l),s=(t(146),t(50)),c=t(8),o=t(224),m=t(234),d=t(235),u=t(231),p=t(240),E=t(233),h=t(229),g=t(228),v=t(241),f=t(242),y=t(243),C=t(244),A=t(245),b=t(223),N=t(226),O=t(122),P=t.n(O),D=t(119),S=t.n(D),I=t(120),j=t.n(I);var k=()=>{const[e,a]=Object(n.useState)([]),[t,l]=Object(n.useState)([]),[i,s]=Object(n.useState)(""),[O,D]=Object(n.useState)(0),[I,k]=Object(n.useState)(10),[w,B]=Object(n.useState)(null),x=Object(c.o)();Object(n.useEffect)(()=>{(async()=>{try{const e=(await o.a.get("https://localhost:7141/api/patients")).data;e&&Array.isArray(e.$values)?(a(e.$values),l(e.$values)):B("Unexpected data format.")}catch(w){B("Error fetching patients.")}})()},[]),Object(n.useEffect)(()=>{(()=>{const a=i.toLowerCase(),t=e.filter(e=>{var t;const n=`${e.firstName} ${e.lastName}`.toLowerCase().includes(a),r=null===(t=e.dateOfBirth)||void 0===t?void 0:t.includes(a),l=e.contactInfo&&e.contactInfo.some(e=>e.contactDetail.toLowerCase().includes(a)),i=e.isActive.toLowerCase().includes(a);return n||r||l||i});l(t)})()},[i,e]);return r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,"Patient List"),r.a.createElement(m.a,null,r.a.createElement(d.a,{p:2,display:"flex",flexDirection:"column",gap:2},r.a.createElement(d.a,{display:"flex",gap:2,alignItems:"center"},r.a.createElement(u.a,{variant:"outlined",label:"Search (Name, Date of Birth, or Status)",value:i,onChange:e=>s(e.target.value),InputProps:{endAdornment:r.a.createElement(p.a,null,r.a.createElement(S.a,null))},fullWidth:!0}),r.a.createElement(E.a,{variant:"contained",color:"primary",startIcon:r.a.createElement(j.a,null),onClick:()=>{x("/add-patient")}},"Add Patient")),w&&r.a.createElement(h.a,{open:!!w,autoHideDuration:6e3,onClose:()=>B(null)},r.a.createElement(g.a,{onClose:()=>B(null),severity:"error"},w)),r.a.createElement(v.a,null,r.a.createElement(f.a,null,r.a.createElement(y.a,null,r.a.createElement(C.a,null,"First Name"),r.a.createElement(C.a,null,"Last Name"),r.a.createElement(C.a,null,"Date of Birth"),r.a.createElement(C.a,null,"Status"),r.a.createElement(C.a,null,"Actions"))),r.a.createElement(A.a,null,t.slice(O*I,O*I+I).map(e=>r.a.createElement(y.a,{key:e.patientID},r.a.createElement(C.a,null,e.firstName),r.a.createElement(C.a,null,e.lastName),r.a.createElement(C.a,null,(e=>{if(!e)return"";const a=new Date(e);return`${String(a.getDate()).padStart(2,"0")}-${String(a.getMonth()+1).padStart(2,"0")}-${a.getFullYear()}`})(e.dateOfBirth)),r.a.createElement(C.a,null,e.isActive),r.a.createElement(C.a,null,r.a.createElement(b.a,{title:"View Details"},r.a.createElement(p.a,{color:"primary",onClick:()=>{return a=e.patientID,void x("/patient-detail/"+a);var a}},r.a.createElement(P.a,null)))))))),r.a.createElement(N.a,{rowsPerPageOptions:[10,25,50],component:"div",count:t.length,rowsPerPage:I,page:O,onPageChange:(e,a)=>{D(a)},onRowsPerPageChange:e=>{k(parseInt(e.target.value,10)),D(0)}}))))},w=t(239),B=t(232),x=t(225),q=t(230),W=t(62),L=t.n(W);var T=()=>{const[e,a]=Object(n.useState)(""),[t,l]=Object(n.useState)(""),[i,s]=Object(n.useState)(""),[d,h]=Object(n.useState)(""),[g,v]=Object(n.useState)([""]),[f,y]=Object(n.useState)([""]),[C,A]=Object(n.useState)(""),[b,N]=Object(n.useState)(""),[O,P]=Object(n.useState)("Active"),D=Object(c.o)();return r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,"Add New Patient"),r.a.createElement(m.a,{style:{padding:"16px"}},r.a.createElement("form",{onSubmit:async n=>{n.preventDefault();if(await(async(e,a,t)=>{try{return(await o.a.get("https://localhost:7141/api/patients/check",{params:{firstName:e,lastName:a,dateOfBirth:t}})).data.exists}catch(n){return console.error("Error checking if patient exists:",n),!1}})(e,t,d))return void alert("A patient with this information already exists. Please enter different details.");const r={firstName:e,lastName:t,gender:i,dateOfBirth:d,isActive:O,ContactInfo:[...g.map(e=>({ContactType:"Phone",ContactDetail:e})),...f.map(e=>({ContactType:"Email",ContactDetail:e}))],Addresses:[{AddressType:"Primary",AddressDetail:C},{AddressType:"Secondary",AddressDetail:b}]};try{const e=await o.a.post("https://localhost:7141/api/patients",r);console.log(e.data),alert("Patient added successfully!"),a(""),l(""),s(""),h(""),v([""]),y([""]),A(""),N(""),P("Active"),D("/")}catch(c){c.response&&(console.error("Error adding patient:",c.response.data),alert("Error adding patient: "+c.response.data))}}},r.a.createElement("h3",null,"Demographics"),r.a.createElement(u.a,{label:"First Name",variant:"outlined",fullWidth:!0,margin:"normal",value:e,onChange:e=>a(e.target.value),required:!0}),r.a.createElement(u.a,{label:"Last Name",variant:"outlined",fullWidth:!0,margin:"normal",value:t,onChange:e=>l(e.target.value),required:!0}),r.a.createElement(w.a,{fullWidth:!0,margin:"normal",required:!0},r.a.createElement(B.a,null,"Gender"),r.a.createElement(x.a,{value:i,onChange:e=>s(e.target.value),label:"Gender"},r.a.createElement(q.a,{value:"Male"},"Male"),r.a.createElement(q.a,{value:"Female"},"Female"))),r.a.createElement(u.a,{label:"Date of Birth",variant:"outlined",type:"date",fullWidth:!0,margin:"normal",InputLabelProps:{shrink:!0},value:d,onChange:e=>h(e.target.value),required:!0}),r.a.createElement("h3",null,"Addresses"),r.a.createElement(u.a,{label:"Primary Address",variant:"outlined",fullWidth:!0,margin:"normal",value:C,onChange:e=>A(e.target.value),required:!0}),r.a.createElement(u.a,{label:"Secondary Address (Optional)",variant:"outlined",fullWidth:!0,margin:"normal",value:b,onChange:e=>N(e.target.value)}),r.a.createElement("h3",null,"Contact Info"),g.map((e,a)=>r.a.createElement("div",{key:a,style:{marginBottom:"16px",display:"flex",alignItems:"center"}},r.a.createElement(u.a,{label:"Phone Number",variant:"outlined",fullWidth:!0,margin:"normal",value:e,onChange:e=>((e,a)=>{const t=g.map((t,n)=>n===e?a.target.value:t);v(t)})(a,e),required:!0}),a>0&&r.a.createElement(p.a,{size:"small",color:"secondary",onClick:()=>(e=>{v(g.filter((a,t)=>t!==e))})(a),style:{marginLeft:"8px"}},r.a.createElement(L.a,null)))),r.a.createElement(E.a,{size:"small",variant:"contained",color:"primary",onClick:()=>{v([...g,""])}},"Add Phone Number"),f.map((e,a)=>r.a.createElement("div",{key:a,style:{marginBottom:"16px",display:"flex",alignItems:"center"}},r.a.createElement(u.a,{label:"Email Address",variant:"outlined",fullWidth:!0,margin:"normal",value:e,onChange:e=>((e,a)=>{const t=f.map((t,n)=>n===e?a.target.value:t);y(t)})(a,e),required:!0}),a>0&&r.a.createElement(p.a,{size:"small",color:"secondary",onClick:()=>(e=>{y(f.filter((a,t)=>t!==e))})(a),style:{marginLeft:"8px"}},r.a.createElement(L.a,null)))),r.a.createElement(E.a,{size:"small",variant:"contained",color:"primary",onClick:()=>{y([...f,""])}},"Add Email Address"),r.a.createElement(E.a,{size:"large",type:"submit",variant:"contained",color:"primary",style:{marginTop:"8px",display:"block"}},"Add Patient"))))};var R=()=>{const{id:e}=Object(c.q)(),a=Object(c.o)(),[t,l]=Object(n.useState)({firstName:"",lastName:"",gender:"",dateOfBirth:"",primaryAddress:"",secondaryAddress:"",phoneContacts:[],emailContacts:[],isActive:"",inactiveReason:""});Object(n.useEffect)(()=>{(async()=>{try{const a=(await o.a.get("https://localhost:7141/api/patients/"+e)).data,t=(await o.a.get(`https://localhost:7141/api/patients/${e}/addresses`)).data,n=(await o.a.get(`https://localhost:7141/api/patients/${e}/contacts`)).data.$values||[],r=t.primaryAddress||"",i=t.secondaryAddress||"",s=n.filter(e=>"Phone"===e.contactType).map(e=>e.contactDetail),c=n.filter(e=>"Email"===e.contactType).map(e=>e.contactDetail),m=new Date(a.dateOfBirth);m.setMinutes(m.getMinutes()-m.getTimezoneOffset());const d=m.toISOString().split("T")[0];l({firstName:a.firstName,lastName:a.lastName,gender:a.gender,dateOfBirth:d,primaryAddress:r,secondaryAddress:i,phoneContacts:s,emailContacts:c,isActive:a.isActive,inactiveReason:a.inactiveReason||""})}catch(a){console.error("Error fetching patient data:",a)}})()},[e]);const i=e=>{l({...t,[e.target.name]:e.target.value})},s=(e,a,n)=>{const r=[...t[a]];r[e]=n.target.value,l({...t,[a]:r})},d=e=>{l({...t,[e]:[...t[e],""]})},h=(e,a)=>{const n=t[a].filter((a,t)=>t!==e);l({...t,[a]:n})};return r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,"Update Patient"),r.a.createElement(m.a,{style:{padding:"16px"}},r.a.createElement("h3",null,"Demographics"),r.a.createElement("form",{onSubmit:async n=>{if(n.preventDefault(),t.primaryAddress.trim())if(0!==t.phoneContacts.length)if(0!==t.emailContacts.length)if("Inactive"!==t.isActive||t.inactiveReason)try{const n={PatientID:e,firstName:t.firstName,lastName:t.lastName,gender:t.gender,dateOfBirth:t.dateOfBirth,isActive:t.isActive,inactiveReason:"Active"===t.isActive?null:t.inactiveReason,ContactInfo:[...t.phoneContacts.map(a=>({ContactType:"Phone",ContactDetail:a,PatientID:e})),...t.emailContacts.map(a=>({ContactType:"Email",ContactDetail:a,PatientID:e}))],Addresses:[{AddressType:"Primary",AddressDetail:t.primaryAddress,PatientID:e},{AddressType:"Secondary",AddressDetail:t.secondaryAddress,PatientID:e}]};console.log("Data to be submitted:",n),await o.a.put("https://localhost:7141/api/patients/"+e,n),alert("Patient updated successfully!"),a("/")}catch(r){console.error("Error updating patient:",r)}else alert("Please provide a reason for inactivation.");else alert("At least one email contact is required.");else alert("At least one phone contact is required.");else alert("Primary address cannot be empty.")}},r.a.createElement(u.a,{label:"First Name",name:"firstName",variant:"outlined",fullWidth:!0,margin:"normal",value:t.firstName,onChange:i,required:!0,error:!t.firstName.trim()}),r.a.createElement(u.a,{label:"Last Name",name:"lastName",variant:"outlined",fullWidth:!0,margin:"normal",value:t.lastName,onChange:i,required:!0,error:!t.lastName.trim()}),r.a.createElement(u.a,{label:"Gender",name:"gender",variant:"outlined",fullWidth:!0,margin:"normal",value:t.gender,onChange:i,required:!0,select:!0},r.a.createElement(q.a,{value:"Male"},"Male"),r.a.createElement(q.a,{value:"Female"},"Female")),r.a.createElement(u.a,{label:"Date of Birth",name:"dateOfBirth",variant:"outlined",type:"date",fullWidth:!0,margin:"normal",InputLabelProps:{shrink:!0},value:t.dateOfBirth,onChange:i,required:!0}),r.a.createElement(u.a,{label:"Status",name:"isActive",variant:"outlined",fullWidth:!0,margin:"normal",value:t.isActive,onChange:i,required:!0,select:!0},r.a.createElement(q.a,{value:"Active"},"Active"),r.a.createElement(q.a,{value:"Inactive"},"Inactive")),"Inactive"===t.isActive&&r.a.createElement(u.a,{label:"Reason for Inactivation",name:"inactiveReason",variant:"outlined",fullWidth:!0,margin:"normal",value:t.inactiveReason,onChange:i,required:!0,error:!t.inactiveReason.trim()}),r.a.createElement("h3",null,"Addresses"),r.a.createElement(u.a,{label:"Primary Address",name:"primaryAddress",variant:"outlined",fullWidth:!0,margin:"normal",value:t.primaryAddress,onChange:i,required:!0,error:!t.primaryAddress.trim()}),r.a.createElement(u.a,{label:"Secondary Address",name:"secondaryAddress",variant:"outlined",fullWidth:!0,margin:"normal",value:t.secondaryAddress,onChange:i}),r.a.createElement("h3",null,"Contacts"),t.phoneContacts.map((e,a)=>r.a.createElement("div",{key:a,style:{display:"flex",alignItems:"center"}},r.a.createElement(u.a,{label:"Phone Contact "+(a+1),variant:"outlined",fullWidth:!0,margin:"normal",value:e,onChange:e=>s(a,"phoneContacts",e),required:!0,error:!e.trim()}),r.a.createElement(p.a,{color:"error",onClick:()=>h(a,"phoneContacts"),style:{marginLeft:"8px"}},r.a.createElement(L.a,null)))),r.a.createElement(E.a,{variant:"outlined",onClick:()=>d("phoneContacts")},"Add Phone Contact"),t.emailContacts.map((e,a)=>r.a.createElement("div",{key:a,style:{display:"flex",alignItems:"center"}},r.a.createElement(u.a,{label:"Email Contact "+(a+1),variant:"outlined",fullWidth:!0,margin:"normal",value:e,onChange:e=>s(a,"emailContacts",e),required:!0,error:!e.trim()}),r.a.createElement(p.a,{color:"error",onClick:()=>h(a,"emailContacts"),style:{marginLeft:"8px"}},r.a.createElement(L.a,null)))),r.a.createElement(E.a,{variant:"outlined",onClick:()=>d("emailContacts")},"Add Email Contact"),r.a.createElement(E.a,{variant:"contained",color:"primary",type:"submit",style:{marginTop:"16px",display:"block"}},"Update Patient"))))},$=t(246);var F=()=>{const{id:e}=Object(c.q)(),a=Object(c.o)(),[t,l]=Object(n.useState)({firstName:"",lastName:"",gender:"",dateOfBirth:"",primaryAddress:"",secondaryAddress:"",phoneContacts:[],emailContacts:[],status:"",inactiveReason:""});Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await o.a.get("https://localhost:7141/api/patients/"+e);console.log("Patient data:",a);const{data:t}=await o.a.get(`https://localhost:7141/api/patients/${e}/addresses`),{data:n}=await o.a.get(`https://localhost:7141/api/patients/${e}/contacts`),r=n.$values||[],i=t.primaryAddress||"",s=t.secondaryAddress||"",c=r.filter(e=>"Phone"===e.contactType).map(e=>e.contactDetail),m=r.filter(e=>"Email"===e.contactType).map(e=>e.contactDetail),d=a.dateOfBirth?new Date(a.dateOfBirth).toLocaleDateString("en-GB"):"";l({firstName:a.firstName,lastName:a.lastName,gender:a.gender,dateOfBirth:d,primaryAddress:i,secondaryAddress:s,phoneContacts:c,emailContacts:m,status:a.isActive,inactiveReason:a.inactiveReason||""})}catch(a){console.error("Error fetching patient data:",a)}})()},[e]);return r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,"Patient Detail"),r.a.createElement(m.a,{style:{padding:"16px"}},r.a.createElement($.a,{variant:"h6"},"Demographics"),r.a.createElement($.a,null,r.a.createElement("strong",null,"First Name:")," ",t.firstName),r.a.createElement($.a,null,r.a.createElement("strong",null,"Last Name:")," ",t.lastName),r.a.createElement($.a,null,r.a.createElement("strong",null,"Gender:")," ",t.gender),r.a.createElement($.a,null,r.a.createElement("strong",null,"Date of Birth:")," ",t.dateOfBirth),r.a.createElement($.a,null,r.a.createElement("strong",null,"Status:")," ",t.status),"Inactive"===t.status&&r.a.createElement($.a,null,r.a.createElement("strong",null,"Reason for Inactivation:")," ",t.inactiveReason),r.a.createElement($.a,{variant:"h6"},"Addresses"),r.a.createElement($.a,null,r.a.createElement("strong",null,"Primary Address:")," ",t.primaryAddress),r.a.createElement($.a,null,r.a.createElement("strong",null,"Secondary Address:")," ",t.secondaryAddress),r.a.createElement($.a,{variant:"h6"},"Contacts"),t.phoneContacts.map((e,a)=>r.a.createElement($.a,{key:a},r.a.createElement("strong",null,"Phone ",a+1,":")," ",e)),t.emailContacts.map((e,a)=>r.a.createElement($.a,{key:a},r.a.createElement("strong",null,"Email ",a+1,":")," ",e)),r.a.createElement(d.a,{mt:2},r.a.createElement(E.a,{variant:"contained",color:"primary",onClick:()=>{a("/update-patient/"+e)}},"Update Patient"))))};var M=()=>r.a.createElement(s.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(c.c,null,r.a.createElement(c.a,{path:"/",element:r.a.createElement(k,null)}),r.a.createElement(c.a,{path:"/add-patient",element:r.a.createElement(T,null)}),r.a.createElement(c.a,{path:"/update-patient/:id",element:r.a.createElement(R,null)}),r.a.createElement(c.a,{path:"/patient-detail/:id",element:r.a.createElement(F,null)}))));var z=e=>{e&&e instanceof Function&&t.e(3).then(t.bind(null,248)).then(a=>{let{getCLS:t,getFID:n,getFCP:r,getLCP:l,getTTFB:i}=a;t(e),n(e),r(e),l(e),i(e)})};t(156);i.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(M,null))),z()}},[[140,1,2]]]);
//# sourceMappingURL=main.2f0e8f73.chunk.js.map