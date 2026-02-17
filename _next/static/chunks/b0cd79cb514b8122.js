(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,37070,e=>{"use strict";var t=e.i(64742),s=e.i(50815);let i=`
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;function n({text:e,speed:n=50,delay:l=0}){let[r,u]=(0,s.useState)(""),[c,o]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{let e=setTimeout(()=>o(!0),l);return()=>clearTimeout(e)},[l]),(0,s.useEffect)(()=>{if(c&&r.length<e.length){let t=setTimeout(()=>{u(e.slice(0,r.length+1))},n);return()=>clearTimeout(t)}},[c,r,e,n]),(0,t.jsxs)("span",{children:[(0,t.jsx)("style",{dangerouslySetInnerHTML:{__html:i}}),r,(0,t.jsx)("span",{className:"inline-block",style:{animation:"cursor-blink 1s step-end infinite"},children:"█"})]})}e.s(["default",()=>n])}]);