import{r as i,n as b,j as o,a4 as g,ab as v,i as f,a5 as F,ac as E,p as e}from"./index.3d4f9967.js";import{E as T,b as j}from"./App.8b0d2a9d.js";const B=i.exports.forwardRef((s,r)=>{const{label:a,hideIcon:n,showIcon:p,visible:w,className:c,htmlFor:l,placeholder:x,iconSize:d,inputClassName:u,invalid:m,...I}=s,[t,N]=i.exports.useState(w),y=()=>{const h=d||14;return t===!1?n||o(T,{size:h}):p||o(j,{size:h})};return b(i.exports.Fragment,{children:[a?o(g,{className:"form-label",for:l,children:a}):null,b(v,{className:f({[c]:c,"is-invalid":m}),children:[o(F,{ref:r,invalid:m,type:t===!1?"password":"text",placeholder:x||"\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",className:f({[u]:u}),...a&&l?{id:l}:{},...I}),o(E,{className:"cursor-pointer",onClick:()=>N(!t),children:y()})]})]})});B.propTypes={invalid:e.exports.bool,hideIcon:e.exports.node,showIcon:e.exports.node,visible:e.exports.bool,className:e.exports.string,placeholder:e.exports.string,iconSize:e.exports.number,inputClassName:e.exports.string,label(s,r){if(s[r]&&s.htmlFor==="undefined")throw new Error("htmlFor prop is required when label prop is present")},htmlFor(s,r){if(s[r]&&s.label==="undefined")throw new Error("label prop is required when htmlFor prop is present")}};B.defaultProps={visible:!1};export{B as I};
