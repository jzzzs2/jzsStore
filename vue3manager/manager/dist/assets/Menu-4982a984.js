import{g as O,b as R,d as $}from"./permission-caf48733.js";import{d as j,k as V,l as E,B as F,g as d,I as S,o as r,c as T,a as l,w as a,h as b,b as v,u as s,i as u,t as G,m as I,J,F as L,G as p}from"./index-af70c94f.js";const q={class:"dialog-footer"},W=j({__name:"Menu",setup(A){let g=V([]);E(async()=>{_()});let _=async()=>{let o=await O();g.value=o.data},n=V(!1),M=o=>{Object.assign(t,{pid:0,level:"",code:"",name:"",id:0}),t.pid=o.id,t.level=o.level+1,n.value=!0},x=o=>{Object.assign(t,o),n.value=!0},t=F({pid:0,level:"",code:"",name:""}),h=async()=>{let o=await R(t);console.log(o,"resultxxx"),o.code==200?(p({type:"success",message:t.id?"修改成功":"添加成功"}),n.value=!1,_()):p({type:"success",message:t.id?"修改失败":"添加失败"})},P=()=>{n.value=!1},B=async o=>{(await $(o.id)).code==200?(p({message:"删除成功",type:"success"}),_()):p({message:"删除失败",type:"error"})};return(o,i)=>{const c=d("el-table-column"),m=d("el-button"),D=d("el-popconfirm"),U=d("el-table"),y=d("el-input"),k=d("el-form-item"),z=d("el-form"),N=d("el-dialog"),f=S("has");return r(),T(L,null,[l(U,{data:s(g),style:{width:"90%"},"row-key":"id",border:""},{default:a(()=>[l(c,{prop:"name",label:"名称"}),l(c,{prop:"code",label:"权限值"}),l(c,{prop:"updateTime",label:"修改时间"}),l(c,{prop:"address",label:"操作"},{default:a(({row:e,$index:H})=>[b((r(),v(m,{size:"small",type:"primary",disabled:(e==null?void 0:e.level)==4,onClick:C=>s(M)(e)},{default:a(()=>[u(G(e.level==3?"添加功能":"添加菜单"),1)]),_:2},1032,["disabled","onClick"])),[[f,"btn.Permission.add"]]),b((r(),v(m,{size:"small",type:"primary",disabled:e.level==1,onClick:C=>s(x)(e)},{default:a(()=>[u(" 编辑 ")]),_:2},1032,["disabled","onClick"])),[[f,"btn.Permission.update"]]),l(D,{title:"确定要删除我么",onConfirm:C=>s(B)(e)},{reference:a(()=>[b((r(),v(m,{size:"small",type:"danger",disabled:e.level==1},{default:a(()=>[u(" 删除 ")]),_:2},1032,["disabled"])),[[f,"btn.Permission.remove"]])]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"]),l(N,{modelValue:s(n),"onUpdate:modelValue":i[2]||(i[2]=e=>J(n)?n.value=e:n=e),title:s(t).id?"修改":"添加"},{footer:a(()=>[I("span",q,[l(m,{onClick:s(P)},{default:a(()=>[u("取消")]),_:1},8,["onClick"]),l(m,{type:"primary",onClick:s(h)},{default:a(()=>[u("确定")]),_:1},8,["onClick"])])]),default:a(()=>[l(z,{model:s(t)},{default:a(()=>[l(k,{label:"名称"},{default:a(()=>[l(y,{placeholder:"请填写名称",modelValue:s(t).name,"onUpdate:modelValue":i[0]||(i[0]=e=>s(t).name=e)},null,8,["modelValue"])]),_:1}),l(k,{label:"权限值"},{default:a(()=>[l(y,{placeholder:"请填写权限值",modelValue:s(t).code,"onUpdate:modelValue":i[1]||(i[1]=e=>s(t).code=e)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"])],64)}}});export{W as default};
