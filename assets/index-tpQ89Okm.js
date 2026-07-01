(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const _m="modulepreload",bm=function(i){return"/monkeygrove/"+i},su={},yr=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let l=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");s=l(t.map(c=>{if(c=bm(c),c in su)return;su[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":_m,d||(h.as="script"),h.crossOrigin="",h.href=c,o&&h.setAttribute("nonce",o),document.head.appendChild(h),d)return new Promise((f,g)=>{h.addEventListener("load",f),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};const rd="180",vm=0,ru=1,ym=2,tf=1,nf=2,Xn=3,vi=0,Yt=1,Cn=2,gi=0,Fs=1,Us=2,au=3,ou=4,xm=5,Bi=100,wm=101,Sm=102,Mm=103,Em=104,Tm=200,Am=201,Rm=202,Cm=203,Cl=204,kl=205,km=206,Pm=207,Lm=208,Fm=209,Dm=210,Im=211,Om=212,Bm=213,Nm=214,Pl=0,Ll=1,Fl=2,Gs=3,Dl=4,Il=5,Ol=6,Bl=7,ad=0,zm=1,Um=2,_i=0,Gm=1,Hm=2,Wm=3,sf=4,Vm=5,$m=6,jm=7,rf=300,Hs=301,Ws=302,Nl=303,zl=304,_o=306,Ul=1e3,zi=1001,Gl=1002,dn=1003,qm=1004,sa=1005,Bn=1006,Oo=1007,Ui=1008,Gn=1009,af=1010,of=1011,Tr=1012,od=1013,Ki=1014,Nn=1015,qr=1016,ld=1017,cd=1018,Ar=1020,lf=35902,cf=35899,df=1021,uf=1022,kn=1023,Rr=1026,Cr=1027,dd=1028,ud=1029,hf=1030,hd=1031,fd=1033,za=33776,Ua=33777,Ga=33778,Ha=33779,Hl=35840,Wl=35841,Vl=35842,$l=35843,jl=36196,ql=37492,Kl=37496,Yl=37808,Xl=37809,Zl=37810,Ql=37811,Jl=37812,ec=37813,tc=37814,nc=37815,ic=37816,sc=37817,rc=37818,ac=37819,oc=37820,lc=37821,cc=36492,dc=36494,uc=36495,hc=36283,fc=36284,pc=36285,mc=36286,Km=3200,Ym=3201,ff=0,Xm=1,fi="",mn="srgb",Vs="srgb-linear",Ka="linear",rt="srgb",os=7680,lu=519,Zm=512,Qm=513,Jm=514,pf=515,eg=516,tg=517,ng=518,ig=519,gc=35044,cu="300 es",zn=2e3,Ya=2001;class Qs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bo=Math.PI/180,_c=180/Math.PI;function bi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function sg(i,e){return(i%e+e)%e}function No(i,e,t){return(1-t)*i+t*e}function Dn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function at(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class He{constructor(e=0,t=0){He.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Js{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const h=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==h||c!==f||d!==g){let m=1-o;const p=l*h+c*f+d*g+u*_,w=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const A=Math.sqrt(E),k=Math.atan2(A,p*w);m=Math.sin(m*k)/A,o=Math.sin(o*k)/A}const x=o*w;if(l=l*m+h*x,c=c*m+f*x,d=d*m+g*x,u=u*m+_*x,m===1-o){const A=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=A,c*=A,d*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-o*f,e[t+2]=c*g+d*f+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),h=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=a*u+this._w*h,this._x=n*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(du.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(du.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return zo.copy(this).projectOnVector(e),this.sub(zo)}reflect(e){return this.sub(zo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zo=new P,du=new Js;class ze{constructor(e,t,n,s,r,a,o,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],w=s[1],E=s[4],x=s[7],A=s[2],k=s[5],R=s[8];return r[0]=a*_+o*w+l*A,r[3]=a*m+o*E+l*k,r[6]=a*p+o*x+l*R,r[1]=c*_+d*w+u*A,r[4]=c*m+d*E+u*k,r[7]=c*p+d*x+u*R,r[2]=h*_+f*w+g*A,r[5]=h*m+f*E+g*k,r[8]=h*p+f*x+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,f=c*r-a*l,g=t*u+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-d*n)*_,e[2]=(o*n-s*a)*_,e[3]=h*_,e[4]=(d*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Uo.makeScale(e,t)),this}rotate(e){return this.premultiply(Uo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Uo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Uo=new ze;function mf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Xa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function rg(){const i=Xa("canvas");return i.style.display="block",i}const uu={};function kr(i){i in uu||(uu[i]=!0,console.warn(i))}function ag(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const hu=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fu=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function og(){const i={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===rt&&(s.r=Qn(s.r),s.g=Qn(s.g),s.b=Qn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(s.r=Ds(s.r),s.g=Ds(s.g),s.b=Ds(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===fi?Ka:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return kr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return kr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Vs]:{primaries:e,whitePoint:n,transfer:Ka,toXYZ:hu,fromXYZ:fu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:mn},outputColorSpaceConfig:{drawingBufferColorSpace:mn}},[mn]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:hu,fromXYZ:fu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:mn}}}),i}const Ze=og();function Qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ds(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ls;class lg{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ls===void 0&&(ls=Xa("canvas")),ls.width=e.width,ls.height=e.height;const s=ls.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ls}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Qn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Qn(t[n]/255)*255):t[n]=Qn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let cg=0;class pd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cg++}),this.uuid=bi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Go(s[a].image)):r.push(Go(s[a]))}else r=Go(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Go(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?lg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dg=0;const Ho=new P;class Gt extends Qs{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=zi,s=zi,r=Bn,a=Ui,o=kn,l=Gn,c=Gt.DEFAULT_ANISOTROPY,d=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=bi(),this.name="",this.source=new pd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ho).x}get height(){return this.source.getSize(Ho).y}get depth(){return this.source.getSize(Ho).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ul:e.x=e.x-Math.floor(e.x);break;case zi:e.x=e.x<0?0:1;break;case Gl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ul:e.y=e.y-Math.floor(e.y);break;case zi:e.y=e.y<0?0:1;break;case Gl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=rf;Gt.DEFAULT_ANISOTROPY=1;class xt{constructor(e=0,t=0,n=0,s=1){xt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,x=(f+1)/2,A=(p+1)/2,k=(d+h)/4,R=(u+_)/4,O=(g+m)/4;return E>x&&E>A?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=k/n,r=R/n):x>A?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=k/s,r=O/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=R/r,s=O/r),this.set(n,s,r,t),this}let w=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(h-d)*(h-d));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-_)/w,this.z=(h-d)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ug extends Qs{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Gt(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Bn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new pd(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends ug{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class gf extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class hg extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ns{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Sn):Sn.fromBufferAttribute(r,a),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ra.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ra.copy(n.boundingBox)),ra.applyMatrix4(e.matrixWorld),this.union(ra)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rr),aa.subVectors(this.max,rr),cs.subVectors(e.a,rr),ds.subVectors(e.b,rr),us.subVectors(e.c,rr),ii.subVectors(ds,cs),si.subVectors(us,ds),Ri.subVectors(cs,us);let t=[0,-ii.z,ii.y,0,-si.z,si.y,0,-Ri.z,Ri.y,ii.z,0,-ii.x,si.z,0,-si.x,Ri.z,0,-Ri.x,-ii.y,ii.x,0,-si.y,si.x,0,-Ri.y,Ri.x,0];return!Wo(t,cs,ds,us,aa)||(t=[1,0,0,0,1,0,0,0,1],!Wo(t,cs,ds,us,aa))?!1:(oa.crossVectors(ii,si),t=[oa.x,oa.y,oa.z],Wo(t,cs,ds,us,aa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const $n=[new P,new P,new P,new P,new P,new P,new P,new P],Sn=new P,ra=new ns,cs=new P,ds=new P,us=new P,ii=new P,si=new P,Ri=new P,rr=new P,aa=new P,oa=new P,Ci=new P;function Wo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ci.fromArray(i,r);const o=s.x*Math.abs(Ci.x)+s.y*Math.abs(Ci.y)+s.z*Math.abs(Ci.z),l=e.dot(Ci),c=t.dot(Ci),d=n.dot(Ci);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const fg=new ns,ar=new P,Vo=new P;class er{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):fg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ar.subVectors(e,this.center);const t=ar.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ar,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Vo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ar.copy(e.center).add(Vo)),this.expandByPoint(ar.copy(e.center).sub(Vo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const jn=new P,$o=new P,la=new P,ri=new P,jo=new P,ca=new P,qo=new P;class md{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){$o.copy(e).add(t).multiplyScalar(.5),la.copy(t).sub(e).normalize(),ri.copy(this.origin).sub($o);const r=e.distanceTo(t)*.5,a=-this.direction.dot(la),o=ri.dot(this.direction),l=-ri.dot(la),c=ri.lengthSq(),d=Math.abs(1-a*a);let u,h,f,g;if(d>0)if(u=a*l-o,h=a*o-l,g=r*d,u>=0)if(h>=-g)if(h<=g){const _=1/d;u*=_,h*=_,f=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy($o).addScaledVector(la,h),f}intersectSphere(e,t){jn.subVectors(e.center,this.origin);const n=jn.dot(this.direction),s=jn.dot(jn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,s,r){jo.subVectors(t,e),ca.subVectors(n,e),qo.crossVectors(jo,ca);let a=this.direction.dot(qo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ri.subVectors(this.origin,e);const l=o*this.direction.dot(ca.crossVectors(ri,ca));if(l<0)return null;const c=o*this.direction.dot(jo.cross(ri));if(c<0||l+c>a)return null;const d=-o*ri.dot(qo);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class it{constructor(e,t,n,s,r,a,o,l,c,d,u,h,f,g,_,m){it.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,_,m)}set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new it().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/hs.setFromMatrixColumn(e,0).length(),r=1/hs.setFromMatrixColumn(e,1).length(),a=1/hs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=a*d,f=a*u,g=o*d,_=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-_*c,t[9]=-o*l,t[2]=_-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,g=c*d,_=c*u;t[0]=h+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=f*o-g,t[6]=_+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,g=c*d,_=c*u;t[0]=h-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*d,t[9]=_-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*d,f=a*u,g=o*d,_=o*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+_,t[1]=l*u,t[5]=_*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*d,t[4]=_-h*u,t[8]=g*u+f,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-_*u}else if(e.order==="XZY"){const h=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+_,t[5]=a*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*d,t[10]=_*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pg,e,mg)}lookAt(e,t,n){const s=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ai.crossVectors(n,rn),ai.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ai.crossVectors(n,rn)),ai.normalize(),da.crossVectors(rn,ai),s[0]=ai.x,s[4]=da.x,s[8]=rn.x,s[1]=ai.y,s[5]=da.y,s[9]=rn.y,s[2]=ai.z,s[6]=da.z,s[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],w=n[3],E=n[7],x=n[11],A=n[15],k=s[0],R=s[4],O=s[8],y=s[12],S=s[1],F=s[5],z=s[9],W=s[13],q=s[2],X=s[6],j=s[10],se=s[14],G=s[3],le=s[7],he=s[11],Ee=s[15];return r[0]=a*k+o*S+l*q+c*G,r[4]=a*R+o*F+l*X+c*le,r[8]=a*O+o*z+l*j+c*he,r[12]=a*y+o*W+l*se+c*Ee,r[1]=d*k+u*S+h*q+f*G,r[5]=d*R+u*F+h*X+f*le,r[9]=d*O+u*z+h*j+f*he,r[13]=d*y+u*W+h*se+f*Ee,r[2]=g*k+_*S+m*q+p*G,r[6]=g*R+_*F+m*X+p*le,r[10]=g*O+_*z+m*j+p*he,r[14]=g*y+_*W+m*se+p*Ee,r[3]=w*k+E*S+x*q+A*G,r[7]=w*R+E*F+x*X+A*le,r[11]=w*O+E*z+x*j+A*he,r[15]=w*y+E*W+x*se+A*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*o*h+n*c*h+s*o*f-n*l*f)+_*(+t*l*f-t*c*h+r*a*h-s*a*f+s*c*d-r*l*d)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*d-n*c*d)+p*(-s*o*d-t*l*u+t*o*h+s*a*u-n*a*h+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],w=u*m*c-_*h*c+_*l*f-o*m*f-u*l*p+o*h*p,E=g*h*c-d*m*c-g*l*f+a*m*f+d*l*p-a*h*p,x=d*_*c-g*u*c+g*o*f-a*_*f-d*o*p+a*u*p,A=g*u*l-d*_*l-g*o*h+a*_*h+d*o*m-a*u*m,k=t*w+n*E+s*x+r*A;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/k;return e[0]=w*R,e[1]=(_*h*r-u*m*r-_*s*f+n*m*f+u*s*p-n*h*p)*R,e[2]=(o*m*r-_*l*r+_*s*c-n*m*c-o*s*p+n*l*p)*R,e[3]=(u*l*r-o*h*r-u*s*c+n*h*c+o*s*f-n*l*f)*R,e[4]=E*R,e[5]=(d*m*r-g*h*r+g*s*f-t*m*f-d*s*p+t*h*p)*R,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*R,e[7]=(a*h*r-d*l*r+d*s*c-t*h*c-a*s*f+t*l*f)*R,e[8]=x*R,e[9]=(g*u*r-d*_*r-g*n*f+t*_*f+d*n*p-t*u*p)*R,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*p+t*o*p)*R,e[11]=(d*o*r-a*u*r-d*n*c+t*u*c+a*n*f-t*o*f)*R,e[12]=A*R,e[13]=(d*_*s-g*u*s+g*n*h-t*_*h-d*n*m+t*u*m)*R,e[14]=(g*o*s-a*_*s-g*n*l+t*_*l+a*n*m-t*o*m)*R,e[15]=(a*u*s-d*o*s+d*n*l-t*u*l-a*n*h+t*o*h)*R,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,f=r*d,g=r*u,_=a*d,m=a*u,p=o*u,w=l*c,E=l*d,x=l*u,A=n.x,k=n.y,R=n.z;return s[0]=(1-(_+p))*A,s[1]=(f+x)*A,s[2]=(g-E)*A,s[3]=0,s[4]=(f-x)*k,s[5]=(1-(h+p))*k,s[6]=(m+w)*k,s[7]=0,s[8]=(g+E)*R,s[9]=(m-w)*R,s[10]=(1-(h+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=hs.set(s[0],s[1],s[2]).length();const a=hs.set(s[4],s[5],s[6]).length(),o=hs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Mn.copy(this);const c=1/r,d=1/a,u=1/o;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=d,Mn.elements[5]*=d,Mn.elements[6]*=d,Mn.elements[8]*=u,Mn.elements[9]*=u,Mn.elements[10]*=u,t.setFromRotationMatrix(Mn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=zn,l=!1){const c=this.elements,d=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===zn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Ya)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=zn,l=!1){const c=this.elements,d=2/(t-e),u=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===zn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Ya)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const hs=new P,Mn=new it,pg=new P(0,0,0),mg=new P(1,1,1),ai=new P,da=new P,rn=new P,pu=new it,mu=new Js;class Hn{constructor(e=0,t=0,n=0,s=Hn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return pu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mu.setFromEuler(this),this.setFromQuaternion(mu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hn.DEFAULT_ORDER="XYZ";class gd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gg=0;const gu=new P,fs=new Js,qn=new it,ua=new P,or=new P,_g=new P,bg=new Js,_u=new P(1,0,0),bu=new P(0,1,0),vu=new P(0,0,1),yu={type:"added"},vg={type:"removed"},ps={type:"childadded",child:null},Ko={type:"childremoved",child:null};class At extends Qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gg++}),this.uuid=bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new P,t=new Hn,n=new Js,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new ze}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.multiply(fs),this}rotateOnWorldAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.premultiply(fs),this}rotateX(e){return this.rotateOnAxis(_u,e)}rotateY(e){return this.rotateOnAxis(bu,e)}rotateZ(e){return this.rotateOnAxis(vu,e)}translateOnAxis(e,t){return gu.copy(e).applyQuaternion(this.quaternion),this.position.add(gu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_u,e)}translateY(e){return this.translateOnAxis(bu,e)}translateZ(e){return this.translateOnAxis(vu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ua.copy(e):ua.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(or,ua,this.up):qn.lookAt(ua,or,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),fs.setFromRotationMatrix(qn),this.quaternion.premultiply(fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yu),ps.child=e,this.dispatchEvent(ps),ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vg),Ko.child=e,this.dispatchEvent(Ko),Ko.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yu),ps.child=e,this.dispatchEvent(ps),ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,e,_g),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,bg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}At.DEFAULT_UP=new P(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const En=new P,Kn=new P,Yo=new P,Yn=new P,ms=new P,gs=new P,xu=new P,Xo=new P,Zo=new P,Qo=new P,Jo=new xt,el=new xt,tl=new xt;class bn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),En.subVectors(e,t),s.cross(En);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){En.subVectors(s,t),Kn.subVectors(n,t),Yo.subVectors(e,t);const a=En.dot(En),o=En.dot(Kn),l=En.dot(Yo),c=Kn.dot(Kn),d=Kn.dot(Yo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,g=(a*d-o*l)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Yn.x),l.addScaledVector(a,Yn.y),l.addScaledVector(o,Yn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Jo.setScalar(0),el.setScalar(0),tl.setScalar(0),Jo.fromBufferAttribute(e,t),el.fromBufferAttribute(e,n),tl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Jo,r.x),a.addScaledVector(el,r.y),a.addScaledVector(tl,r.z),a}static isFrontFacing(e,t,n,s){return En.subVectors(n,t),Kn.subVectors(e,t),En.cross(Kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),En.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return bn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ms.subVectors(s,n),gs.subVectors(r,n),Xo.subVectors(e,n);const l=ms.dot(Xo),c=gs.dot(Xo);if(l<=0&&c<=0)return t.copy(n);Zo.subVectors(e,s);const d=ms.dot(Zo),u=gs.dot(Zo);if(d>=0&&u<=d)return t.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(ms,a);Qo.subVectors(e,r);const f=ms.dot(Qo),g=gs.dot(Qo);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(gs,o);const m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return xu.subVectors(r,s),o=(u-d)/(u-d+(f-g)),t.copy(s).addScaledVector(xu,o);const p=1/(m+_+h);return a=_*p,o=h*p,t.copy(n).addScaledVector(ms,a).addScaledVector(gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _f={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oi={h:0,s:0,l:0},ha={h:0,s:0,l:0};function nl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Pe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=mn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=sg(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=nl(a,r,e+1/3),this.g=nl(a,r,e),this.b=nl(a,r,e-1/3)}return Ze.colorSpaceToWorking(this,s),this}setStyle(e,t=mn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=mn){const n=_f[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qn(e.r),this.g=Qn(e.g),this.b=Qn(e.b),this}copyLinearToSRGB(e){return this.r=Ds(e.r),this.g=Ds(e.g),this.b=Ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mn){return Ze.workingToColorSpace(Bt.copy(this),e),Math.round($e(Bt.r*255,0,255))*65536+Math.round($e(Bt.g*255,0,255))*256+Math.round($e(Bt.b*255,0,255))}getHexString(e=mn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(Bt.copy(this),t);const n=Bt.r,s=Bt.g,r=Bt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=mn){Ze.workingToColorSpace(Bt.copy(this),e);const t=Bt.r,n=Bt.g,s=Bt.b;return e!==mn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(oi),this.setHSL(oi.h+e,oi.s+t,oi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(oi),e.getHSL(ha);const n=No(oi.h,ha.h,t),s=No(oi.s,ha.s,t),r=No(oi.l,ha.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new Pe;Pe.NAMES=_f;let yg=0;class is extends Qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=bi(),this.name="",this.type="Material",this.blending=Fs,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cl,this.blendDst=kl,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fs&&(n.blending=this.blending),this.side!==vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Cl&&(n.blendSrc=this.blendSrc),this.blendDst!==kl&&(n.blendDst=this.blendDst),this.blendEquation!==Bi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==lu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==os&&(n.stencilFail=this.stencilFail),this.stencilZFail!==os&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==os&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ss extends is{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=ad,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new P,fa=new He;let xg=0;class Xt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=gc,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.applyMatrix3(e),this.setXY(t,fa.x,fa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gc&&(e.usage=this.usage),e}}class bf extends Xt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class vf extends Xt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class un extends Xt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let wg=0;const pn=new it,il=new At,_s=new P,an=new ns,lr=new ns,Pt=new P;class yn extends Qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mf(e)?vf:bf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,n){return pn.makeTranslation(e,t,n),this.applyMatrix4(pn),this}scale(e,t,n){return pn.makeScale(e,t,n),this.applyMatrix4(pn),this}lookAt(e){return il.lookAt(e),il.updateMatrix(),this.applyMatrix4(il.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new un(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ns);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new er);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];lr.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors(an.min,lr.min),an.expandByPoint(Pt),Pt.addVectors(an.max,lr.max),an.expandByPoint(Pt)):(an.expandByPoint(lr.min),an.expandByPoint(lr.max))}an.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Pt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Pt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Pt.fromBufferAttribute(o,c),l&&(_s.fromBufferAttribute(e,c),Pt.add(_s)),s=Math.max(s,n.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let O=0;O<n.count;O++)o[O]=new P,l[O]=new P;const c=new P,d=new P,u=new P,h=new He,f=new He,g=new He,_=new P,m=new P;function p(O,y,S){c.fromBufferAttribute(n,O),d.fromBufferAttribute(n,y),u.fromBufferAttribute(n,S),h.fromBufferAttribute(r,O),f.fromBufferAttribute(r,y),g.fromBufferAttribute(r,S),d.sub(c),u.sub(c),f.sub(h),g.sub(h);const F=1/(f.x*g.y-g.x*f.y);isFinite(F)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(F),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(F),o[O].add(_),o[y].add(_),o[S].add(_),l[O].add(m),l[y].add(m),l[S].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let O=0,y=w.length;O<y;++O){const S=w[O],F=S.start,z=S.count;for(let W=F,q=F+z;W<q;W+=3)p(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const E=new P,x=new P,A=new P,k=new P;function R(O){A.fromBufferAttribute(s,O),k.copy(A);const y=o[O];E.copy(y),E.sub(A.multiplyScalar(A.dot(y))).normalize(),x.crossVectors(k,y);const F=x.dot(l[O])<0?-1:1;a.setXYZW(O,E.x,E.y,E.z,F)}for(let O=0,y=w.length;O<y;++O){const S=w[O],F=S.start,z=S.count;for(let W=F,q=F+z;W<q;W+=3)R(e.getX(W+0)),R(e.getX(W+1)),R(e.getX(W+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Xt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,d=new P,u=new P;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*d;for(let p=0;p<d;p++)h[g++]=c[f++]}return new Xt(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wu=new it,ki=new md,pa=new er,Su=new P,ma=new P,ga=new P,_a=new P,sl=new P,ba=new P,Mu=new P,va=new P;class Ft extends At{constructor(e=new yn,t=new ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ba.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(sl.fromBufferAttribute(u,e),a?ba.addScaledVector(sl,d):ba.addScaledVector(sl.sub(t),d))}t.add(ba)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(r),ki.copy(e.ray).recast(e.near),!(pa.containsPoint(ki.origin)===!1&&(ki.intersectSphere(pa,Su)===null||ki.origin.distanceToSquared(Su)>(e.far-e.near)**2))&&(wu.copy(r).invert(),ki.copy(e.ray).applyMatrix4(wu),!(n.boundingBox!==null&&ki.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ki)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],w=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=w,A=E;x<A;x+=3){const k=o.getX(x),R=o.getX(x+1),O=o.getX(x+2);s=ya(this,p,e,n,c,d,u,k,R,O),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const w=o.getX(m),E=o.getX(m+1),x=o.getX(m+2);s=ya(this,a,e,n,c,d,u,w,E,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],w=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=w,A=E;x<A;x+=3){const k=x,R=x+1,O=x+2;s=ya(this,p,e,n,c,d,u,k,R,O),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const w=m,E=m+1,x=m+2;s=ya(this,a,e,n,c,d,u,w,E,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Sg(i,e,t,n,s,r,a,o){let l;if(e.side===Yt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===vi,o),l===null)return null;va.copy(o),va.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(va);return c<t.near||c>t.far?null:{distance:c,point:va.clone(),object:i}}function ya(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,ma),i.getVertexPosition(l,ga),i.getVertexPosition(c,_a);const d=Sg(i,e,t,n,ma,ga,_a,Mu);if(d){const u=new P;bn.getBarycoord(Mu,ma,ga,_a,u),s&&(d.uv=bn.getInterpolatedAttribute(s,o,l,c,u,new He)),r&&(d.uv1=bn.getInterpolatedAttribute(r,o,l,c,u,new He)),a&&(d.normal=bn.getInterpolatedAttribute(a,o,l,c,u,new P),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new P,materialIndex:0};bn.getNormal(ma,ga,_a,h.normal),d.face=h,d.barycoord=u}return d}class yi extends yn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new un(c,3)),this.setAttribute("normal",new un(d,3)),this.setAttribute("uv",new un(u,2));function g(_,m,p,w,E,x,A,k,R,O,y){const S=x/R,F=A/O,z=x/2,W=A/2,q=k/2,X=R+1,j=O+1;let se=0,G=0;const le=new P;for(let he=0;he<j;he++){const Ee=he*F-W;for(let We=0;We<X;We++){const ct=We*S-z;le[_]=ct*w,le[m]=Ee*E,le[p]=q,c.push(le.x,le.y,le.z),le[_]=0,le[m]=0,le[p]=k>0?1:-1,d.push(le.x,le.y,le.z),u.push(We/R),u.push(1-he/O),se+=1}}for(let he=0;he<O;he++)for(let Ee=0;Ee<R;Ee++){const We=h+Ee+X*he,ct=h+Ee+X*(he+1),ft=h+(Ee+1)+X*(he+1),Je=h+(Ee+1)+X*he;l.push(We,ct,Je),l.push(ct,ft,Je),G+=6}o.addGroup(f,G,y),f+=G,h+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $s(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function $t(i){const e={};for(let t=0;t<i.length;t++){const n=$s(i[t]);for(const s in n)e[s]=n[s]}return e}function Mg(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function yf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const Eg={clone:$s,merge:$t};var Tg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ag=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends is{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tg,this.fragmentShader=Ag,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$s(e.uniforms),this.uniformsGroups=Mg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class xf extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const li=new P,Eu=new He,Tu=new He;class _n extends xf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_c*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Bo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _c*2*Math.atan(Math.tan(Bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(li.x,li.y).multiplyScalar(-e/li.z),li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(li.x,li.y).multiplyScalar(-e/li.z)}getViewSize(e,t){return this.getViewBounds(e,Eu,Tu),t.subVectors(Tu,Eu)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Bo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const bs=-90,vs=1;class Rg extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new _n(bs,vs,e,t);s.layers=this.layers,this.add(s);const r=new _n(bs,vs,e,t);r.layers=this.layers,this.add(r);const a=new _n(bs,vs,e,t);a.layers=this.layers,this.add(a);const o=new _n(bs,vs,e,t);o.layers=this.layers,this.add(o);const l=new _n(bs,vs,e,t);l.layers=this.layers,this.add(l);const c=new _n(bs,vs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ya)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class wf extends Gt{constructor(e=[],t=Hs,n,s,r,a,o,l,c,d){super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Cg extends Yi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new wf(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new yi(5,5,5),r=new ei({name:"CubemapFromEquirect",uniforms:$s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:gi});r.uniforms.tEquirect.value=t;const a=new Ft(s,r),o=t.minFilter;return t.minFilter===Ui&&(t.minFilter=Bn),new Rg(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class en extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kg={type:"move"};class rl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new en,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new en,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new en,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new en;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class _d{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Pe(e),this.near=t,this.far=n}clone(){return new _d(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Pg extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Lg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=gc,this.updateRanges=[],this.version=0,this.uuid=bi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Vt=new P;class Za{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Dn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Xt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Za(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bo extends is{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ys;const cr=new P,xs=new P,ws=new P,Ss=new He,dr=new He,Sf=new it,xa=new P,ur=new P,wa=new P,Au=new He,al=new He,Ru=new He;class bd extends At{constructor(e=new bo){if(super(),this.isSprite=!0,this.type="Sprite",ys===void 0){ys=new yn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lg(t,5);ys.setIndex([0,1,2,0,2,3]),ys.setAttribute("position",new Za(n,3,0,!1)),ys.setAttribute("uv",new Za(n,2,3,!1))}this.geometry=ys,this.material=e,this.center=new He(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),xs.setFromMatrixScale(this.matrixWorld),Sf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ws.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&xs.multiplyScalar(-ws.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Sa(xa.set(-.5,-.5,0),ws,a,xs,s,r),Sa(ur.set(.5,-.5,0),ws,a,xs,s,r),Sa(wa.set(.5,.5,0),ws,a,xs,s,r),Au.set(0,0),al.set(1,0),Ru.set(1,1);let o=e.ray.intersectTriangle(xa,ur,wa,!1,cr);if(o===null&&(Sa(ur.set(-.5,.5,0),ws,a,xs,s,r),al.set(0,1),o=e.ray.intersectTriangle(xa,wa,ur,!1,cr),o===null))return;const l=e.ray.origin.distanceTo(cr);l<e.near||l>e.far||t.push({distance:l,point:cr.clone(),uv:bn.getInterpolation(cr,xa,ur,wa,Au,al,Ru,new He),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Sa(i,e,t,n,s,r){Ss.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(dr.x=r*Ss.x-s*Ss.y,dr.y=s*Ss.x+r*Ss.y):dr.copy(Ss),i.copy(e),i.x+=dr.x,i.y+=dr.y,i.applyMatrix4(Sf)}class Fg extends Gt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=dn,d=dn,u,h){super(null,a,o,l,c,d,s,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cu extends Xt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ms=new it,ku=new it,Ma=[],Pu=new ns,Dg=new it,hr=new Ft,fr=new er;class bc extends Ft{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Cu(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Dg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ns),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ms),Pu.copy(e.boundingBox).applyMatrix4(Ms),this.boundingBox.union(Pu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new er),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ms),fr.copy(e.boundingSphere).applyMatrix4(Ms),this.boundingSphere.union(fr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(hr.geometry=this.geometry,hr.material=this.material,hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fr.copy(this.boundingSphere),fr.applyMatrix4(n),e.ray.intersectsSphere(fr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ms),ku.multiplyMatrices(n,Ms),hr.matrixWorld=ku,hr.raycast(e,Ma);for(let a=0,o=Ma.length;a<o;a++){const l=Ma[a];l.instanceId=r,l.object=this,t.push(l)}Ma.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Cu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Fg(new Float32Array(s*this.count),s,this.count,dd,Nn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ol=new P,Ig=new P,Og=new ze;class Ii{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ol.subVectors(n,t).cross(Ig.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ol),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Og.getNormalMatrix(e),s=this.coplanarPoint(ol).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new er,Bg=new He(.5,.5),Ea=new P;class vd{constructor(e=new Ii,t=new Ii,n=new Ii,s=new Ii,r=new Ii,a=new Ii){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],w=r[12],E=r[13],x=r[14],A=r[15];if(s[0].setComponents(c-a,f-d,p-g,A-w).normalize(),s[1].setComponents(c+a,f+d,p+g,A+w).normalize(),s[2].setComponents(c+o,f+u,p+_,A+E).normalize(),s[3].setComponents(c-o,f-u,p-_,A-E).normalize(),n)s[4].setComponents(l,h,m,x).normalize(),s[5].setComponents(c-l,f-h,p-m,A-x).normalize();else if(s[4].setComponents(c-l,f-h,p-m,A-x).normalize(),t===zn)s[5].setComponents(c+l,f+h,p+m,A+x).normalize();else if(t===Ya)s[5].setComponents(l,h,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(e){Pi.center.set(0,0,0);const t=Bg.distanceTo(e.center);return Pi.radius=.7071067811865476+t,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ea.x=s.normal.x>0?e.max.x:e.min.x,Ea.y=s.normal.y>0?e.max.y:e.min.y,Ea.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ea)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mf extends is{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Lu=new it,vc=new md,Ta=new er,Aa=new P;class Ng extends At{constructor(e=new yn,t=new Mf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ta.copy(n.boundingSphere),Ta.applyMatrix4(s),Ta.radius+=r,e.ray.intersectsSphere(Ta)===!1)return;Lu.copy(s).invert(),vc.copy(e.ray).applyMatrix4(Lu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=h,_=f;g<_;g++){const m=c.getX(g);Aa.fromBufferAttribute(u,m),Fu(Aa,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=h,_=f;g<_;g++)Aa.fromBufferAttribute(u,g),Fu(Aa,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Fu(i,e,t,n,s,r,a){const o=vc.distanceSqToPoint(i);if(o<t){const l=new P;vc.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class vo extends Gt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ef extends Gt{constructor(e,t,n=Ki,s,r,a,o=dn,l=dn,c,d=Rr,u=1){if(d!==Rr&&d!==Cr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:u};super(h,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Tf extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Mi extends yn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<d;p++){const w=p*h-a;for(let E=0;E<c;E++){const x=E*u-r;g.push(x,-w,0),_.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){const E=w+c*p,x=w+c*(p+1),A=w+1+c*(p+1),k=w+1+c*p;f.push(E,x,k),f.push(x,A,k)}this.setIndex(f),this.setAttribute("position",new un(g,3)),this.setAttribute("normal",new un(_,3)),this.setAttribute("uv",new un(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mi(e.width,e.height,e.widthSegments,e.heightSegments)}}class yd extends yn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],u=new P,h=new P,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const w=[],E=p/n;let x=0;p===0&&a===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let A=0;A<=t;A++){const k=A/t;u.x=-e*Math.cos(s+k*r)*Math.sin(a+E*o),u.y=e*Math.cos(a+E*o),u.z=e*Math.sin(s+k*r)*Math.sin(a+E*o),g.push(u.x,u.y,u.z),h.copy(u).normalize(),_.push(h.x,h.y,h.z),m.push(k+x,1-E),w.push(c++)}d.push(w)}for(let p=0;p<n;p++)for(let w=0;w<t;w++){const E=d[p][w+1],x=d[p][w],A=d[p+1][w],k=d[p+1][w+1];(p!==0||a>0)&&f.push(E,x,k),(p!==n-1||l<Math.PI)&&f.push(x,A,k)}this.setIndex(f),this.setAttribute("position",new un(g,3)),this.setAttribute("normal",new un(_,3)),this.setAttribute("uv",new un(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yd(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class CE extends ei{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Kr extends is{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ff,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=ad,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class zg extends is{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Km,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ug extends is{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Af extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Gg extends Af{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ll=new it,Du=new P,Iu=new P;class Hg{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.mapType=Gn,this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vd,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Du.setFromMatrixPosition(e.matrixWorld),t.position.copy(Du),Iu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Iu),t.updateMatrixWorld(),ll.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ll,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ll)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class xd extends xf{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Wg extends Hg{constructor(){super(new xd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ou extends Af{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new Wg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Vg extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class kE{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Bu=new it;class $g{constructor(e,t,n=0,s=1/0){this.ray=new md(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new gd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Bu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bu),this}intersectObject(e,t=!0,n=[]){return yc(e,this,n,t),n.sort(Nu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)yc(e[s],this,n,t);return n.sort(Nu),n}}function Nu(i,e){return i.distance-e.distance}function yc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)yc(r[a],e,t,!0)}}function zu(i,e,t,n){const s=jg(n);switch(t){case df:return i*e;case dd:return i*e/s.components*s.byteLength;case ud:return i*e/s.components*s.byteLength;case hf:return i*e*2/s.components*s.byteLength;case hd:return i*e*2/s.components*s.byteLength;case uf:return i*e*3/s.components*s.byteLength;case kn:return i*e*4/s.components*s.byteLength;case fd:return i*e*4/s.components*s.byteLength;case za:case Ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ga:case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Wl:case $l:return Math.max(i,16)*Math.max(e,8)/4;case Hl:case Vl:return Math.max(i,8)*Math.max(e,8)/2;case jl:case ql:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Kl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Yl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Zl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ql:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Jl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ec:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case tc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case nc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ic:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case sc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case rc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ac:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case oc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case lc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case cc:case dc:case uc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case hc:case fc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case pc:case mc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jg(i){switch(i){case Gn:case af:return{byteLength:1,components:1};case Tr:case of:case qr:return{byteLength:2,components:1};case ld:case cd:return{byteLength:2,components:4};case Ki:case od:case Nn:return{byteLength:4,components:1};case lf:case cf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rd);function Rf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function qg(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){const g=u[h],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,u[h]=_)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];i.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Kg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,t0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,n0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,i0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,s0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,r0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,a0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,o0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,l0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,f0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,p0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,m0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,g0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,b0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,v0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,y0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,x0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,w0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,S0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,M0="gl_FragColor = linearToOutputTexel( gl_FragColor );",E0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,T0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,A0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,R0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,k0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,P0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,L0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,F0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,D0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,I0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,O0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,B0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,N0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,z0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,U0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,G0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,H0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,W0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,V0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,j0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,q0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,K0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Y0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,X0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,J0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,e_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,t_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,n_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,i_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,s_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,r_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,a_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,o_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,l_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,d_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,h_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,f_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,m_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,g_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,__=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,b_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,v_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,y_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,x_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,w_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,S_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,M_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,E_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,T_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,A_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,R_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,C_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,k_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,P_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,L_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,F_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,D_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,I_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,O_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,B_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,N_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,z_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,U_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,G_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,H_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,W_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,V_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,j_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const q_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,K_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,X_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Q_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,eb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,tb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,nb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ib=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ab=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ob=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,db=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ub=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,pb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_b=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Eb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:Kg,alphahash_pars_fragment:Yg,alphamap_fragment:Xg,alphamap_pars_fragment:Zg,alphatest_fragment:Qg,alphatest_pars_fragment:Jg,aomap_fragment:e0,aomap_pars_fragment:t0,batching_pars_vertex:n0,batching_vertex:i0,begin_vertex:s0,beginnormal_vertex:r0,bsdfs:a0,iridescence_fragment:o0,bumpmap_pars_fragment:l0,clipping_planes_fragment:c0,clipping_planes_pars_fragment:d0,clipping_planes_pars_vertex:u0,clipping_planes_vertex:h0,color_fragment:f0,color_pars_fragment:p0,color_pars_vertex:m0,color_vertex:g0,common:_0,cube_uv_reflection_fragment:b0,defaultnormal_vertex:v0,displacementmap_pars_vertex:y0,displacementmap_vertex:x0,emissivemap_fragment:w0,emissivemap_pars_fragment:S0,colorspace_fragment:M0,colorspace_pars_fragment:E0,envmap_fragment:T0,envmap_common_pars_fragment:A0,envmap_pars_fragment:R0,envmap_pars_vertex:C0,envmap_physical_pars_fragment:U0,envmap_vertex:k0,fog_vertex:P0,fog_pars_vertex:L0,fog_fragment:F0,fog_pars_fragment:D0,gradientmap_pars_fragment:I0,lightmap_pars_fragment:O0,lights_lambert_fragment:B0,lights_lambert_pars_fragment:N0,lights_pars_begin:z0,lights_toon_fragment:G0,lights_toon_pars_fragment:H0,lights_phong_fragment:W0,lights_phong_pars_fragment:V0,lights_physical_fragment:$0,lights_physical_pars_fragment:j0,lights_fragment_begin:q0,lights_fragment_maps:K0,lights_fragment_end:Y0,logdepthbuf_fragment:X0,logdepthbuf_pars_fragment:Z0,logdepthbuf_pars_vertex:Q0,logdepthbuf_vertex:J0,map_fragment:e_,map_pars_fragment:t_,map_particle_fragment:n_,map_particle_pars_fragment:i_,metalnessmap_fragment:s_,metalnessmap_pars_fragment:r_,morphinstance_vertex:a_,morphcolor_vertex:o_,morphnormal_vertex:l_,morphtarget_pars_vertex:c_,morphtarget_vertex:d_,normal_fragment_begin:u_,normal_fragment_maps:h_,normal_pars_fragment:f_,normal_pars_vertex:p_,normal_vertex:m_,normalmap_pars_fragment:g_,clearcoat_normal_fragment_begin:__,clearcoat_normal_fragment_maps:b_,clearcoat_pars_fragment:v_,iridescence_pars_fragment:y_,opaque_fragment:x_,packing:w_,premultiplied_alpha_fragment:S_,project_vertex:M_,dithering_fragment:E_,dithering_pars_fragment:T_,roughnessmap_fragment:A_,roughnessmap_pars_fragment:R_,shadowmap_pars_fragment:C_,shadowmap_pars_vertex:k_,shadowmap_vertex:P_,shadowmask_pars_fragment:L_,skinbase_vertex:F_,skinning_pars_vertex:D_,skinning_vertex:I_,skinnormal_vertex:O_,specularmap_fragment:B_,specularmap_pars_fragment:N_,tonemapping_fragment:z_,tonemapping_pars_fragment:U_,transmission_fragment:G_,transmission_pars_fragment:H_,uv_pars_fragment:W_,uv_pars_vertex:V_,uv_vertex:$_,worldpos_vertex:j_,background_vert:q_,background_frag:K_,backgroundCube_vert:Y_,backgroundCube_frag:X_,cube_vert:Z_,cube_frag:Q_,depth_vert:J_,depth_frag:eb,distanceRGBA_vert:tb,distanceRGBA_frag:nb,equirect_vert:ib,equirect_frag:sb,linedashed_vert:rb,linedashed_frag:ab,meshbasic_vert:ob,meshbasic_frag:lb,meshlambert_vert:cb,meshlambert_frag:db,meshmatcap_vert:ub,meshmatcap_frag:hb,meshnormal_vert:fb,meshnormal_frag:pb,meshphong_vert:mb,meshphong_frag:gb,meshphysical_vert:_b,meshphysical_frag:bb,meshtoon_vert:vb,meshtoon_frag:yb,points_vert:xb,points_frag:wb,shadow_vert:Sb,shadow_frag:Mb,sprite_vert:Eb,sprite_frag:Tb},oe={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Fn={basic:{uniforms:$t([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:$t([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:$t([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:$t([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:$t([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:$t([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:$t([oe.points,oe.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:$t([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:$t([oe.common,oe.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:$t([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:$t([oe.sprite,oe.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:$t([oe.common,oe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:$t([oe.lights,oe.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Fn.physical={uniforms:$t([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Ra={r:0,b:0,g:0},Li=new Hn,Ab=new it;function Rb(i,e,t,n,s,r,a){const o=new Pe(0);let l=r===!0?0:1,c,d,u=null,h=0,f=null;function g(E){let x=E.isScene===!0?E.background:null;return x&&x.isTexture&&(x=(E.backgroundBlurriness>0?t:e).get(x)),x}function _(E){let x=!1;const A=g(E);A===null?p(o,l):A&&A.isColor&&(p(A,1),x=!0);const k=i.xr.getEnvironmentBlendMode();k==="additive"?n.buffers.color.setClear(0,0,0,1,a):k==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,x){const A=g(x);A&&(A.isCubeTexture||A.mapping===_o)?(d===void 0&&(d=new Ft(new yi(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:$s(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(k,R,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Li.copy(x.backgroundRotation),Li.x*=-1,Li.y*=-1,Li.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),d.material.uniforms.envMap.value=A,d.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Ab.makeRotationFromEuler(Li)),d.material.toneMapped=Ze.getTransfer(A.colorSpace)!==rt,(u!==A||h!==A.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,u=A,h=A.version,f=i.toneMapping),d.layers.enableAll(),E.unshift(d,d.geometry,d.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Ft(new Mi(2,2),new ei({name:"BackgroundMaterial",uniforms:$s(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(A.colorSpace)!==rt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||h!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,h=A.version,f=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,x){E.getRGB(Ra,yf(i)),n.buffers.color.setClear(Ra.r,Ra.g,Ra.b,x,a)}function w(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,x=1){o.set(E),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(o,l)},render:_,addToRenderList:m,dispose:w}}function Cb(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(S,F,z,W,q){let X=!1;const j=u(W,z,F);r!==j&&(r=j,c(r.object)),X=f(S,W,z,q),X&&g(S,W,z,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,x(S,F,z,W),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function d(S){return i.deleteVertexArray(S)}function u(S,F,z){const W=z.wireframe===!0;let q=n[S.id];q===void 0&&(q={},n[S.id]=q);let X=q[F.id];X===void 0&&(X={},q[F.id]=X);let j=X[W];return j===void 0&&(j=h(l()),X[W]=j),j}function h(S){const F=[],z=[],W=[];for(let q=0;q<t;q++)F[q]=0,z[q]=0,W[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:W,object:S,attributes:{},index:null}}function f(S,F,z,W){const q=r.attributes,X=F.attributes;let j=0;const se=z.getAttributes();for(const G in se)if(se[G].location>=0){const he=q[G];let Ee=X[G];if(Ee===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(Ee=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(Ee=S.instanceColor)),he===void 0||he.attribute!==Ee||Ee&&he.data!==Ee.data)return!0;j++}return r.attributesNum!==j||r.index!==W}function g(S,F,z,W){const q={},X=F.attributes;let j=0;const se=z.getAttributes();for(const G in se)if(se[G].location>=0){let he=X[G];he===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(he=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(he=S.instanceColor));const Ee={};Ee.attribute=he,he&&he.data&&(Ee.data=he.data),q[G]=Ee,j++}r.attributes=q,r.attributesNum=j,r.index=W}function _(){const S=r.newAttributes;for(let F=0,z=S.length;F<z;F++)S[F]=0}function m(S){p(S,0)}function p(S,F){const z=r.newAttributes,W=r.enabledAttributes,q=r.attributeDivisors;z[S]=1,W[S]===0&&(i.enableVertexAttribArray(S),W[S]=1),q[S]!==F&&(i.vertexAttribDivisor(S,F),q[S]=F)}function w(){const S=r.newAttributes,F=r.enabledAttributes;for(let z=0,W=F.length;z<W;z++)F[z]!==S[z]&&(i.disableVertexAttribArray(z),F[z]=0)}function E(S,F,z,W,q,X,j){j===!0?i.vertexAttribIPointer(S,F,z,q,X):i.vertexAttribPointer(S,F,z,W,q,X)}function x(S,F,z,W){_();const q=W.attributes,X=z.getAttributes(),j=F.defaultAttributeValues;for(const se in X){const G=X[se];if(G.location>=0){let le=q[se];if(le===void 0&&(se==="instanceMatrix"&&S.instanceMatrix&&(le=S.instanceMatrix),se==="instanceColor"&&S.instanceColor&&(le=S.instanceColor)),le!==void 0){const he=le.normalized,Ee=le.itemSize,We=e.get(le);if(We===void 0)continue;const ct=We.buffer,ft=We.type,Je=We.bytesPerElement,K=ft===i.INT||ft===i.UNSIGNED_INT||le.gpuType===od;if(le.isInterleavedBufferAttribute){const Q=le.data,me=Q.stride,De=le.offset;if(Q.isInstancedInterleavedBuffer){for(let Me=0;Me<G.locationSize;Me++)p(G.location+Me,Q.meshPerAttribute);S.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Me=0;Me<G.locationSize;Me++)m(G.location+Me);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let Me=0;Me<G.locationSize;Me++)E(G.location+Me,Ee/G.locationSize,ft,he,me*Je,(De+Ee/G.locationSize*Me)*Je,K)}else{if(le.isInstancedBufferAttribute){for(let Q=0;Q<G.locationSize;Q++)p(G.location+Q,le.meshPerAttribute);S.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Q=0;Q<G.locationSize;Q++)m(G.location+Q);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let Q=0;Q<G.locationSize;Q++)E(G.location+Q,Ee/G.locationSize,ft,he,Ee*Je,Ee/G.locationSize*Q*Je,K)}}else if(j!==void 0){const he=j[se];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(G.location,he);break;case 3:i.vertexAttrib3fv(G.location,he);break;case 4:i.vertexAttrib4fv(G.location,he);break;default:i.vertexAttrib1fv(G.location,he)}}}}w()}function A(){O();for(const S in n){const F=n[S];for(const z in F){const W=F[z];for(const q in W)d(W[q].object),delete W[q];delete F[z]}delete n[S]}}function k(S){if(n[S.id]===void 0)return;const F=n[S.id];for(const z in F){const W=F[z];for(const q in W)d(W[q].object),delete W[q];delete F[z]}delete n[S.id]}function R(S){for(const F in n){const z=n[F];if(z[S.id]===void 0)continue;const W=z[S.id];for(const q in W)d(W[q].object),delete W[q];delete z[S.id]}}function O(){y(),a=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:O,resetDefaultState:y,dispose:A,releaseStatesOfGeometry:k,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function kb(i,e,t){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let f=0;for(let g=0;g<u;g++)f+=d[g];t.update(f,n,1)}function l(c,d,u,h){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],d[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,d,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_]*h[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Pb(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==kn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const O=R===qr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Gn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Nn&&!O)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,k=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:A,maxSamples:k}}function Lb(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ii,o=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||n!==0||s;return s=h,n=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const w=r?0:n,E=w*4;let x=p.clippingState||null;l.value=x,x=d(g,h,E,f);for(let A=0;A!==E;++A)x[A]=t[A];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,w=h.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,x=f;E!==_;++E,x+=4)a.copy(u[E]).applyMatrix4(w,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Fb(i){let e=new WeakMap;function t(a,o){return o===Nl?a.mapping=Hs:o===zl&&(a.mapping=Ws),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Nl||o===zl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Cg(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const ks=4,Uu=[.125,.215,.35,.446,.526,.582],Ni=20,cl=new xd,Gu=new Pe;let dl=null,ul=0,hl=0,fl=!1;const Oi=(1+Math.sqrt(5))/2,Es=1/Oi,Hu=[new P(-Oi,Es,0),new P(Oi,Es,0),new P(-Es,0,Oi),new P(Es,0,Oi),new P(0,Oi,-Es),new P(0,Oi,Es),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Db=new P;class Wu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Db}=r;dl=this._renderer.getRenderTarget(),ul=this._renderer.getActiveCubeFace(),hl=this._renderer.getActiveMipmapLevel(),fl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ju(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$u(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(dl,ul,hl),this._renderer.xr.enabled=fl,e.scissorTest=!1,Ca(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hs||e.mapping===Ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),dl=this._renderer.getRenderTarget(),ul=this._renderer.getActiveCubeFace(),hl=this._renderer.getActiveMipmapLevel(),fl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:qr,format:kn,colorSpace:Vs,depthBuffer:!1},s=Vu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vu(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ib(r)),this._blurMaterial=Ob(r,e,t)}return s}_compileMaterial(e){const t=new Ft(this._lodPlanes[0],e);this._renderer.compile(t,cl)}_sceneToCubeUV(e,t,n,s,r){const l=new _n(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Gu),u.toneMapping=_i,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new ss({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),m=new Ft(new yi,_);let p=!1;const w=e.background;w?w.isColor&&(_.color.copy(w),e.background=null,p=!0):(_.color.copy(Gu),p=!0);for(let E=0;E<6;E++){const x=E%3;x===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[E],r.y,r.z)):x===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[E]));const A=this._cubeSize;Ca(s,x*A,E>2?A:0,A,A),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=w}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Hs||e.mapping===Ws;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ju()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$u());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ft(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ca(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,cl)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Hu[(s-r-1)%Hu.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new Ft(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ni-1),_=r/g,m=isFinite(r)?1+Math.floor(d*_):Ni;m>Ni&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ni}`);const p=[];let w=0;for(let R=0;R<Ni;++R){const O=R/_,y=Math.exp(-O*O/2);p.push(y),R===0?w+=y:R<m&&(w+=2*y)}for(let R=0;R<p.length;R++)p[R]=p[R]/w;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-n;const x=this._sizeLods[s],A=3*x*(s>E-ks?s-E+ks:0),k=4*(this._cubeSize-x);Ca(t,A,k,3*x,2*x),l.setRenderTarget(t),l.render(u,cl)}}function Ib(i){const e=[],t=[],n=[];let s=i;const r=i-ks+1+Uu.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-ks?l=Uu[a-i+ks-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,_=3,m=2,p=1,w=new Float32Array(_*g*f),E=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let k=0;k<f;k++){const R=k%3*2/3-1,O=k>2?0:-1,y=[R,O,0,R+2/3,O,0,R+2/3,O+1,0,R,O,0,R+2/3,O+1,0,R,O+1,0];w.set(y,_*g*k),E.set(h,m*g*k);const S=[k,k,k,k,k,k];x.set(S,p*g*k)}const A=new yn;A.setAttribute("position",new Xt(w,_)),A.setAttribute("uv",new Xt(E,m)),A.setAttribute("faceIndex",new Xt(x,p)),e.push(A),s>ks&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Vu(i,e,t){const n=new Yi(i,e,t);return n.texture.mapping=_o,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ca(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ob(i,e,t){const n=new Float32Array(Ni),s=new P(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:Ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function $u(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function ju(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function wd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Bb(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Nl||l===zl,d=l===Hs||l===Ws;if(c||d){let u=e.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Wu(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||d&&f&&s(f)?(t===null&&(t=new Wu(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Nb(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&kr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function zb(i,e,t,n){const s={},r=new WeakMap;function a(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(u){const h=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const w=f.array;_=f.version;for(let E=0,x=w.length;E<x;E+=3){const A=w[E+0],k=w[E+1],R=w[E+2];h.push(A,k,k,R,R,A)}}else if(g!==void 0){const w=g.array;_=g.version;for(let E=0,x=w.length/3-1;E<x;E+=3){const A=E+0,k=E+1,R=E+2;h.push(A,k,k,R,R,A)}}else return;const m=new(mf(h)?vf:bf)(h,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function d(u){const h=r.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Ub(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,r,h*a),t.update(f,n,1)}function c(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,h*a,g),t.update(f,n,g))}function d(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(h,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,_,0,g);let p=0;for(let w=0;w<g;w++)p+=f[w]*_[w];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Gb(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Hb(i,e,t){const n=new WeakMap,s=new xt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let y=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",y)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let E=0;f===!0&&(E=1),g===!0&&(E=2),_===!0&&(E=3);let x=o.attributes.position.count*E,A=1;x>e.maxTextureSize&&(A=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const k=new Float32Array(x*A*4*u),R=new gf(k,x,A,u);R.type=Nn,R.needsUpdate=!0;const O=E*4;for(let S=0;S<u;S++){const F=m[S],z=p[S],W=w[S],q=x*A*4*S;for(let X=0;X<F.count;X++){const j=X*O;f===!0&&(s.fromBufferAttribute(F,X),k[q+j+0]=s.x,k[q+j+1]=s.y,k[q+j+2]=s.z,k[q+j+3]=0),g===!0&&(s.fromBufferAttribute(z,X),k[q+j+4]=s.x,k[q+j+5]=s.y,k[q+j+6]=s.z,k[q+j+7]=0),_===!0&&(s.fromBufferAttribute(W,X),k[q+j+8]=s.x,k[q+j+9]=s.y,k[q+j+10]=s.z,k[q+j+11]=W.itemSize===4?s.w:1)}}h={count:u,texture:R,size:new He(x,A)},n.set(o,h),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Wb(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Cf=new Gt,qu=new Ef(1,1),kf=new gf,Pf=new hg,Lf=new wf,Ku=[],Yu=[],Xu=new Float32Array(16),Zu=new Float32Array(9),Qu=new Float32Array(4);function tr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Ku[s];if(r===void 0&&(r=new Float32Array(s),Ku[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ct(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function yo(i,e){let t=Yu[e];t===void 0&&(t=new Int32Array(e),Yu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Vb(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $b(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2fv(this.addr,e),Ct(t,e)}}function jb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;i.uniform3fv(this.addr,e),Ct(t,e)}}function qb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4fv(this.addr,e),Ct(t,e)}}function Kb(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;Qu.set(n),i.uniformMatrix2fv(this.addr,!1,Qu),Ct(t,n)}}function Yb(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;Zu.set(n),i.uniformMatrix3fv(this.addr,!1,Zu),Ct(t,n)}}function Xb(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;Xu.set(n),i.uniformMatrix4fv(this.addr,!1,Xu),Ct(t,n)}}function Zb(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Qb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2iv(this.addr,e),Ct(t,e)}}function Jb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3iv(this.addr,e),Ct(t,e)}}function ev(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4iv(this.addr,e),Ct(t,e)}}function tv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function nv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2uiv(this.addr,e),Ct(t,e)}}function iv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3uiv(this.addr,e),Ct(t,e)}}function sv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4uiv(this.addr,e),Ct(t,e)}}function rv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(qu.compareFunction=pf,r=qu):r=Cf,t.setTexture2D(e||r,s)}function av(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Pf,s)}function ov(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Lf,s)}function lv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||kf,s)}function cv(i){switch(i){case 5126:return Vb;case 35664:return $b;case 35665:return jb;case 35666:return qb;case 35674:return Kb;case 35675:return Yb;case 35676:return Xb;case 5124:case 35670:return Zb;case 35667:case 35671:return Qb;case 35668:case 35672:return Jb;case 35669:case 35673:return ev;case 5125:return tv;case 36294:return nv;case 36295:return iv;case 36296:return sv;case 35678:case 36198:case 36298:case 36306:case 35682:return rv;case 35679:case 36299:case 36307:return av;case 35680:case 36300:case 36308:case 36293:return ov;case 36289:case 36303:case 36311:case 36292:return lv}}function dv(i,e){i.uniform1fv(this.addr,e)}function uv(i,e){const t=tr(e,this.size,2);i.uniform2fv(this.addr,t)}function hv(i,e){const t=tr(e,this.size,3);i.uniform3fv(this.addr,t)}function fv(i,e){const t=tr(e,this.size,4);i.uniform4fv(this.addr,t)}function pv(i,e){const t=tr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function mv(i,e){const t=tr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function gv(i,e){const t=tr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function _v(i,e){i.uniform1iv(this.addr,e)}function bv(i,e){i.uniform2iv(this.addr,e)}function vv(i,e){i.uniform3iv(this.addr,e)}function yv(i,e){i.uniform4iv(this.addr,e)}function xv(i,e){i.uniform1uiv(this.addr,e)}function wv(i,e){i.uniform2uiv(this.addr,e)}function Sv(i,e){i.uniform3uiv(this.addr,e)}function Mv(i,e){i.uniform4uiv(this.addr,e)}function Ev(i,e,t){const n=this.cache,s=e.length,r=yo(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Cf,r[a])}function Tv(i,e,t){const n=this.cache,s=e.length,r=yo(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Pf,r[a])}function Av(i,e,t){const n=this.cache,s=e.length,r=yo(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Lf,r[a])}function Rv(i,e,t){const n=this.cache,s=e.length,r=yo(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||kf,r[a])}function Cv(i){switch(i){case 5126:return dv;case 35664:return uv;case 35665:return hv;case 35666:return fv;case 35674:return pv;case 35675:return mv;case 35676:return gv;case 5124:case 35670:return _v;case 35667:case 35671:return bv;case 35668:case 35672:return vv;case 35669:case 35673:return yv;case 5125:return xv;case 36294:return wv;case 36295:return Sv;case 36296:return Mv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ev;case 35679:case 36299:case 36307:return Tv;case 35680:case 36300:case 36308:case 36293:return Av;case 36289:case 36303:case 36311:case 36292:return Rv}}class kv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=cv(t.type)}}class Pv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cv(t.type)}}class Lv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const pl=/(\w+)(\])?(\[|\.)?/g;function Ju(i,e){i.seq.push(e),i.map[e.id]=e}function Fv(i,e,t){const n=i.name,s=n.length;for(pl.lastIndex=0;;){const r=pl.exec(n),a=pl.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Ju(t,c===void 0?new kv(o,i,e):new Pv(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Lv(o),Ju(t,u)),t=u}}}class Wa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Fv(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function eh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Dv=37297;let Iv=0;function Ov(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const th=new ze;function Bv(i){Ze._getMatrix(th,Ze.workingColorSpace,i);const e=`mat3( ${th.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case Ka:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function nh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Ov(i.getShaderSource(e),o)}else return r}function Nv(i,e){const t=Bv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function zv(i,e){let t;switch(e){case Gm:t="Linear";break;case Hm:t="Reinhard";break;case Wm:t="Cineon";break;case sf:t="ACESFilmic";break;case $m:t="AgX";break;case jm:t="Neutral";break;case Vm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ka=new P;function Uv(){Ze.getLuminanceCoefficients(ka);const i=ka.x.toFixed(4),e=ka.y.toFixed(4),t=ka.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vr).join(`
`)}function Hv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Wv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function vr(i){return i!==""}function ih(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Vv=/^[ \t]*#include +<([\w\d./]+)>/gm;function xc(i){return i.replace(Vv,jv)}const $v=new Map;function jv(i,e){let t=Ge[e];if(t===void 0){const n=$v.get(e);if(n!==void 0)t=Ge[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return xc(t)}const qv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rh(i){return i.replace(qv,Kv)}function Kv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ah(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Yv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tf?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===nf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Xn&&(e="SHADOWMAP_TYPE_VSM"),e}function Xv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hs:case Ws:e="ENVMAP_TYPE_CUBE";break;case _o:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Zv(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ws&&(e="ENVMAP_MODE_REFRACTION"),e}function Qv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ad:e="ENVMAP_BLENDING_MULTIPLY";break;case zm:e="ENVMAP_BLENDING_MIX";break;case Um:e="ENVMAP_BLENDING_ADD";break}return e}function Jv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ey(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Yv(t),c=Xv(t),d=Zv(t),u=Qv(t),h=Jv(t),f=Gv(t),g=Hv(r),_=s.createProgram();let m,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(vr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(vr).join(`
`),p.length>0&&(p+=`
`)):(m=[ah(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vr).join(`
`),p=[ah(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_i?"#define TONE_MAPPING":"",t.toneMapping!==_i?Ge.tonemapping_pars_fragment:"",t.toneMapping!==_i?zv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Nv("linearToOutputTexel",t.outputColorSpace),Uv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vr).join(`
`)),a=xc(a),a=ih(a,t),a=sh(a,t),o=xc(o),o=ih(o,t),o=sh(o,t),a=rh(a),o=rh(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===cu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=w+m+a,x=w+p+o,A=eh(s,s.VERTEX_SHADER,E),k=eh(s,s.FRAGMENT_SHADER,x);s.attachShader(_,A),s.attachShader(_,k),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(F){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(_)||"",W=s.getShaderInfoLog(A)||"",q=s.getShaderInfoLog(k)||"",X=z.trim(),j=W.trim(),se=q.trim();let G=!0,le=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,k);else{const he=nh(s,A,"vertex"),Ee=nh(s,k,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+X+`
`+he+`
`+Ee)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(j===""||se==="")&&(le=!1);le&&(F.diagnostics={runnable:G,programLog:X,vertexShader:{log:j,prefix:m},fragmentShader:{log:se,prefix:p}})}s.deleteShader(A),s.deleteShader(k),O=new Wa(s,_),y=Wv(s,_)}let O;this.getUniforms=function(){return O===void 0&&R(this),O};let y;this.getAttributes=function(){return y===void 0&&R(this),y};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,Dv)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Iv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=k,this}let ty=0;class ny{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new iy(e),t.set(e,n)),n}}class iy{constructor(e){this.id=ty++,this.code=e,this.usedTimes=0}}function sy(i,e,t,n,s,r,a){const o=new gd,l=new ny,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,S,F,z,W){const q=z.fog,X=W.geometry,j=y.isMeshStandardMaterial?z.environment:null,se=(y.isMeshStandardMaterial?t:e).get(y.envMap||j),G=se&&se.mapping===_o?se.image.height:null,le=g[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const he=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Ee=he!==void 0?he.length:0;let We=0;X.morphAttributes.position!==void 0&&(We=1),X.morphAttributes.normal!==void 0&&(We=2),X.morphAttributes.color!==void 0&&(We=3);let ct,ft,Je,K;if(le){const et=Fn[le];ct=et.vertexShader,ft=et.fragmentShader}else ct=y.vertexShader,ft=y.fragmentShader,l.update(y),Je=l.getVertexShaderID(y),K=l.getFragmentShaderID(y);const Q=i.getRenderTarget(),me=i.state.buffers.depth.getReversed(),De=W.isInstancedMesh===!0,Me=W.isBatchedMesh===!0,je=!!y.map,It=!!y.matcap,C=!!se,pt=!!y.aoMap,Be=!!y.lightMap,Le=!!y.bumpMap,be=!!y.normalMap,mt=!!y.displacementMap,ve=!!y.emissiveMap,Ue=!!y.metalnessMap,kt=!!y.roughnessMap,wt=y.anisotropy>0,T=y.clearcoat>0,b=y.dispersion>0,B=y.iridescence>0,V=y.sheen>0,Z=y.transmission>0,H=wt&&!!y.anisotropyMap,Se=T&&!!y.clearcoatMap,re=T&&!!y.clearcoatNormalMap,ye=T&&!!y.clearcoatRoughnessMap,xe=B&&!!y.iridescenceMap,ne=B&&!!y.iridescenceThicknessMap,ue=V&&!!y.sheenColorMap,ke=V&&!!y.sheenRoughnessMap,we=!!y.specularMap,ce=!!y.specularColorMap,Ne=!!y.specularIntensityMap,L=Z&&!!y.transmissionMap,ie=Z&&!!y.thicknessMap,ae=!!y.gradientMap,pe=!!y.alphaMap,ee=y.alphaTest>0,Y=!!y.alphaHash,_e=!!y.extensions;let Oe=_i;y.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Oe=i.toneMapping);const dt={shaderID:le,shaderType:y.type,shaderName:y.name,vertexShader:ct,fragmentShader:ft,defines:y.defines,customVertexShaderID:Je,customFragmentShaderID:K,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Me,batchingColor:Me&&W._colorsTexture!==null,instancing:De,instancingColor:De&&W.instanceColor!==null,instancingMorph:De&&W.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Vs,alphaToCoverage:!!y.alphaToCoverage,map:je,matcap:It,envMap:C,envMapMode:C&&se.mapping,envMapCubeUVHeight:G,aoMap:pt,lightMap:Be,bumpMap:Le,normalMap:be,displacementMap:h&&mt,emissiveMap:ve,normalMapObjectSpace:be&&y.normalMapType===Xm,normalMapTangentSpace:be&&y.normalMapType===ff,metalnessMap:Ue,roughnessMap:kt,anisotropy:wt,anisotropyMap:H,clearcoat:T,clearcoatMap:Se,clearcoatNormalMap:re,clearcoatRoughnessMap:ye,dispersion:b,iridescence:B,iridescenceMap:xe,iridescenceThicknessMap:ne,sheen:V,sheenColorMap:ue,sheenRoughnessMap:ke,specularMap:we,specularColorMap:ce,specularIntensityMap:Ne,transmission:Z,transmissionMap:L,thicknessMap:ie,gradientMap:ae,opaque:y.transparent===!1&&y.blending===Fs&&y.alphaToCoverage===!1,alphaMap:pe,alphaTest:ee,alphaHash:Y,combine:y.combine,mapUv:je&&_(y.map.channel),aoMapUv:pt&&_(y.aoMap.channel),lightMapUv:Be&&_(y.lightMap.channel),bumpMapUv:Le&&_(y.bumpMap.channel),normalMapUv:be&&_(y.normalMap.channel),displacementMapUv:mt&&_(y.displacementMap.channel),emissiveMapUv:ve&&_(y.emissiveMap.channel),metalnessMapUv:Ue&&_(y.metalnessMap.channel),roughnessMapUv:kt&&_(y.roughnessMap.channel),anisotropyMapUv:H&&_(y.anisotropyMap.channel),clearcoatMapUv:Se&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:re&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:ke&&_(y.sheenRoughnessMap.channel),specularMapUv:we&&_(y.specularMap.channel),specularColorMapUv:ce&&_(y.specularColorMap.channel),specularIntensityMapUv:Ne&&_(y.specularIntensityMap.channel),transmissionMapUv:L&&_(y.transmissionMap.channel),thicknessMapUv:ie&&_(y.thicknessMap.channel),alphaMapUv:pe&&_(y.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(be||wt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!X.attributes.uv&&(je||pe),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:me,skinning:W.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:We,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:Oe,decodeVideoTexture:je&&y.map.isVideoTexture===!0&&Ze.getTransfer(y.map.colorSpace)===rt,decodeVideoTextureEmissive:ve&&y.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(y.emissiveMap.colorSpace)===rt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Cn,flipSided:y.side===Yt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:_e&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&y.extensions.multiDraw===!0||Me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return dt.vertexUv1s=c.has(1),dt.vertexUv2s=c.has(2),dt.vertexUv3s=c.has(3),c.clear(),dt}function p(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const F in y.defines)S.push(F),S.push(y.defines[F]);return y.isRawShaderMaterial===!1&&(w(S,y),E(S,y),S.push(i.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function w(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function E(y,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),y.push(o.mask)}function x(y){const S=g[y.type];let F;if(S){const z=Fn[S];F=Eg.clone(z.uniforms)}else F=y.uniforms;return F}function A(y,S){let F;for(let z=0,W=d.length;z<W;z++){const q=d[z];if(q.cacheKey===S){F=q,++F.usedTimes;break}}return F===void 0&&(F=new ey(i,S,y,r),d.push(F)),F}function k(y){if(--y.usedTimes===0){const S=d.indexOf(y);d[S]=d[d.length-1],d.pop(),y.destroy()}}function R(y){l.remove(y)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:A,releaseProgram:k,releaseShaderCache:R,programs:d,dispose:O}}function ry(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ay(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function oh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function lh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,h,f,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,h,f,g,_,m){const p=a(u,h,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,h,f,g,_,m){const p=a(u,h,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,h){t.length>1&&t.sort(u||ay),n.length>1&&n.sort(h||oh),s.length>1&&s.sort(h||oh)}function d(){for(let u=e,h=i.length;u<h;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function oy(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new lh,i.set(n,[a])):s>=r.length?(a=new lh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function ly(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Pe};break;case"SpotLight":t={position:new P,direction:new P,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function cy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let dy=0;function uy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function hy(i){const e=new ly,t=cy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const s=new P,r=new it,a=new it;function o(c){let d=0,u=0,h=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,w=0,E=0,x=0,A=0,k=0,R=0;c.sort(uy);for(let y=0,S=c.length;y<S;y++){const F=c[y],z=F.color,W=F.intensity,q=F.distance,X=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)d+=z.r*W,u+=z.g*W,h+=z.b*W;else if(F.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(F.sh.coefficients[j],W);R++}else if(F.isDirectionalLight){const j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const se=F.shadow,G=t.get(F);G.shadowIntensity=se.intensity,G.shadowBias=se.bias,G.shadowNormalBias=se.normalBias,G.shadowRadius=se.radius,G.shadowMapSize=se.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=F.shadow.matrix,w++}n.directional[f]=j,f++}else if(F.isSpotLight){const j=e.get(F);j.position.setFromMatrixPosition(F.matrixWorld),j.color.copy(z).multiplyScalar(W),j.distance=q,j.coneCos=Math.cos(F.angle),j.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),j.decay=F.decay,n.spot[_]=j;const se=F.shadow;if(F.map&&(n.spotLightMap[A]=F.map,A++,se.updateMatrices(F),F.castShadow&&k++),n.spotLightMatrix[_]=se.matrix,F.castShadow){const G=t.get(F);G.shadowIntensity=se.intensity,G.shadowBias=se.bias,G.shadowNormalBias=se.normalBias,G.shadowRadius=se.radius,G.shadowMapSize=se.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=X,x++}_++}else if(F.isRectAreaLight){const j=e.get(F);j.color.copy(z).multiplyScalar(W),j.halfWidth.set(F.width*.5,0,0),j.halfHeight.set(0,F.height*.5,0),n.rectArea[m]=j,m++}else if(F.isPointLight){const j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),j.distance=F.distance,j.decay=F.decay,F.castShadow){const se=F.shadow,G=t.get(F);G.shadowIntensity=se.intensity,G.shadowBias=se.bias,G.shadowNormalBias=se.normalBias,G.shadowRadius=se.radius,G.shadowMapSize=se.mapSize,G.shadowCameraNear=se.camera.near,G.shadowCameraFar=se.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=F.shadow.matrix,E++}n.point[g]=j,g++}else if(F.isHemisphereLight){const j=e.get(F);j.skyColor.copy(F.color).multiplyScalar(W),j.groundColor.copy(F.groundColor).multiplyScalar(W),n.hemi[p]=j,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=oe.LTC_FLOAT_1,n.rectAreaLTC2=oe.LTC_FLOAT_2):(n.rectAreaLTC1=oe.LTC_HALF_1,n.rectAreaLTC2=oe.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const O=n.hash;(O.directionalLength!==f||O.pointLength!==g||O.spotLength!==_||O.rectAreaLength!==m||O.hemiLength!==p||O.numDirectionalShadows!==w||O.numPointShadows!==E||O.numSpotShadows!==x||O.numSpotMaps!==A||O.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=x+A-k,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=k,n.numLightProbes=R,O.directionalLength=f,O.pointLength=g,O.spotLength=_,O.rectAreaLength=m,O.hemiLength=p,O.numDirectionalShadows=w,O.numPointShadows=E,O.numSpotShadows=x,O.numSpotMaps=A,O.numLightProbes=R,n.version=dy++)}function l(c,d){let u=0,h=0,f=0,g=0,_=0;const m=d.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){const E=c[p];if(E.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(E.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),h++}else if(E.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function ch(i){const e=new hy(i),t=[],n=[];function s(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function fy(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new ch(i),e.set(s,[o])):r>=a.length?(o=new ch(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const py=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,my=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gy(i,e,t){let n=new vd;const s=new He,r=new He,a=new xt,o=new zg({depthPacking:Ym}),l=new Ug,c={},d=t.maxTextureSize,u={[vi]:Yt,[Yt]:vi,[Cn]:Cn},h=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:py,fragmentShader:my}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new yn;g.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ft(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tf;let p=this.type;this.render=function(k,R,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||k.length===0)return;const y=i.getRenderTarget(),S=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),z=i.state;z.setBlending(gi),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const W=p!==Xn&&this.type===Xn,q=p===Xn&&this.type!==Xn;for(let X=0,j=k.length;X<j;X++){const se=k[X],G=se.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",se,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const le=G.getFrameExtents();if(s.multiply(le),r.copy(G.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/le.x),s.x=r.x*le.x,G.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/le.y),s.y=r.y*le.y,G.mapSize.y=r.y)),G.map===null||W===!0||q===!0){const Ee=this.type!==Xn?{minFilter:dn,magFilter:dn}:{};G.map!==null&&G.map.dispose(),G.map=new Yi(s.x,s.y,Ee),G.map.texture.name=se.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const he=G.getViewportCount();for(let Ee=0;Ee<he;Ee++){const We=G.getViewport(Ee);a.set(r.x*We.x,r.y*We.y,r.x*We.z,r.y*We.w),z.viewport(a),G.updateMatrices(se,Ee),n=G.getFrustum(),x(R,O,G.camera,se,this.type)}G.isPointLightShadow!==!0&&this.type===Xn&&w(G,O),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,S,F)};function w(k,R){const O=e.update(_);h.defines.VSM_SAMPLES!==k.blurSamples&&(h.defines.VSM_SAMPLES=k.blurSamples,f.defines.VSM_SAMPLES=k.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),k.mapPass===null&&(k.mapPass=new Yi(s.x,s.y)),h.uniforms.shadow_pass.value=k.map.texture,h.uniforms.resolution.value=k.mapSize,h.uniforms.radius.value=k.radius,i.setRenderTarget(k.mapPass),i.clear(),i.renderBufferDirect(R,null,O,h,_,null),f.uniforms.shadow_pass.value=k.mapPass.texture,f.uniforms.resolution.value=k.mapSize,f.uniforms.radius.value=k.radius,i.setRenderTarget(k.map),i.clear(),i.renderBufferDirect(R,null,O,f,_,null)}function E(k,R,O,y){let S=null;const F=O.isPointLight===!0?k.customDistanceMaterial:k.customDepthMaterial;if(F!==void 0)S=F;else if(S=O.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const z=S.uuid,W=R.uuid;let q=c[z];q===void 0&&(q={},c[z]=q);let X=q[W];X===void 0&&(X=S.clone(),q[W]=X,R.addEventListener("dispose",A)),S=X}if(S.visible=R.visible,S.wireframe=R.wireframe,y===Xn?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:u[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,O.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const z=i.properties.get(S);z.light=O}return S}function x(k,R,O,y,S){if(k.visible===!1)return;if(k.layers.test(R.layers)&&(k.isMesh||k.isLine||k.isPoints)&&(k.castShadow||k.receiveShadow&&S===Xn)&&(!k.frustumCulled||n.intersectsObject(k))){k.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,k.matrixWorld);const W=e.update(k),q=k.material;if(Array.isArray(q)){const X=W.groups;for(let j=0,se=X.length;j<se;j++){const G=X[j],le=q[G.materialIndex];if(le&&le.visible){const he=E(k,le,y,S);k.onBeforeShadow(i,k,R,O,W,he,G),i.renderBufferDirect(O,null,W,he,k,G),k.onAfterShadow(i,k,R,O,W,he,G)}}}else if(q.visible){const X=E(k,q,y,S);k.onBeforeShadow(i,k,R,O,W,X,null),i.renderBufferDirect(O,null,W,X,k,null),k.onAfterShadow(i,k,R,O,W,X,null)}}const z=k.children;for(let W=0,q=z.length;W<q;W++)x(z[W],R,O,y,S)}function A(k){k.target.removeEventListener("dispose",A);for(const O in c){const y=c[O],S=k.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const _y={[Pl]:Ll,[Fl]:Ol,[Dl]:Bl,[Gs]:Il,[Ll]:Pl,[Ol]:Fl,[Bl]:Dl,[Il]:Gs};function by(i,e){function t(){let L=!1;const ie=new xt;let ae=null;const pe=new xt(0,0,0,0);return{setMask:function(ee){ae!==ee&&!L&&(i.colorMask(ee,ee,ee,ee),ae=ee)},setLocked:function(ee){L=ee},setClear:function(ee,Y,_e,Oe,dt){dt===!0&&(ee*=Oe,Y*=Oe,_e*=Oe),ie.set(ee,Y,_e,Oe),pe.equals(ie)===!1&&(i.clearColor(ee,Y,_e,Oe),pe.copy(ie))},reset:function(){L=!1,ae=null,pe.set(-1,0,0,0)}}}function n(){let L=!1,ie=!1,ae=null,pe=null,ee=null;return{setReversed:function(Y){if(ie!==Y){const _e=e.get("EXT_clip_control");Y?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),ie=Y;const Oe=ee;ee=null,this.setClear(Oe)}},getReversed:function(){return ie},setTest:function(Y){Y?Q(i.DEPTH_TEST):me(i.DEPTH_TEST)},setMask:function(Y){ae!==Y&&!L&&(i.depthMask(Y),ae=Y)},setFunc:function(Y){if(ie&&(Y=_y[Y]),pe!==Y){switch(Y){case Pl:i.depthFunc(i.NEVER);break;case Ll:i.depthFunc(i.ALWAYS);break;case Fl:i.depthFunc(i.LESS);break;case Gs:i.depthFunc(i.LEQUAL);break;case Dl:i.depthFunc(i.EQUAL);break;case Il:i.depthFunc(i.GEQUAL);break;case Ol:i.depthFunc(i.GREATER);break;case Bl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=Y}},setLocked:function(Y){L=Y},setClear:function(Y){ee!==Y&&(ie&&(Y=1-Y),i.clearDepth(Y),ee=Y)},reset:function(){L=!1,ae=null,pe=null,ee=null,ie=!1}}}function s(){let L=!1,ie=null,ae=null,pe=null,ee=null,Y=null,_e=null,Oe=null,dt=null;return{setTest:function(et){L||(et?Q(i.STENCIL_TEST):me(i.STENCIL_TEST))},setMask:function(et){ie!==et&&!L&&(i.stencilMask(et),ie=et)},setFunc:function(et,Vn,Pn){(ae!==et||pe!==Vn||ee!==Pn)&&(i.stencilFunc(et,Vn,Pn),ae=et,pe=Vn,ee=Pn)},setOp:function(et,Vn,Pn){(Y!==et||_e!==Vn||Oe!==Pn)&&(i.stencilOp(et,Vn,Pn),Y=et,_e=Vn,Oe=Pn)},setLocked:function(et){L=et},setClear:function(et){dt!==et&&(i.clearStencil(et),dt=et)},reset:function(){L=!1,ie=null,ae=null,pe=null,ee=null,Y=null,_e=null,Oe=null,dt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,w=null,E=null,x=null,A=null,k=null,R=new Pe(0,0,0),O=0,y=!1,S=null,F=null,z=null,W=null,q=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,se=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(G)[1]),j=se>=1):G.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),j=se>=2);let le=null,he={};const Ee=i.getParameter(i.SCISSOR_BOX),We=i.getParameter(i.VIEWPORT),ct=new xt().fromArray(Ee),ft=new xt().fromArray(We);function Je(L,ie,ae,pe){const ee=new Uint8Array(4),Y=i.createTexture();i.bindTexture(L,Y),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<ae;_e++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(ie,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,ee):i.texImage2D(ie+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ee);return Y}const K={};K[i.TEXTURE_2D]=Je(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=Je(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=Je(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=Je(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),a.setFunc(Gs),Le(!1),be(ru),Q(i.CULL_FACE),pt(gi);function Q(L){d[L]!==!0&&(i.enable(L),d[L]=!0)}function me(L){d[L]!==!1&&(i.disable(L),d[L]=!1)}function De(L,ie){return u[L]!==ie?(i.bindFramebuffer(L,ie),u[L]=ie,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ie),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ie),!0):!1}function Me(L,ie){let ae=f,pe=!1;if(L){ae=h.get(ie),ae===void 0&&(ae=[],h.set(ie,ae));const ee=L.textures;if(ae.length!==ee.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,_e=ee.length;Y<_e;Y++)ae[Y]=i.COLOR_ATTACHMENT0+Y;ae.length=ee.length,pe=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,pe=!0);pe&&i.drawBuffers(ae)}function je(L){return g!==L?(i.useProgram(L),g=L,!0):!1}const It={[Bi]:i.FUNC_ADD,[wm]:i.FUNC_SUBTRACT,[Sm]:i.FUNC_REVERSE_SUBTRACT};It[Mm]=i.MIN,It[Em]=i.MAX;const C={[Tm]:i.ZERO,[Am]:i.ONE,[Rm]:i.SRC_COLOR,[Cl]:i.SRC_ALPHA,[Dm]:i.SRC_ALPHA_SATURATE,[Lm]:i.DST_COLOR,[km]:i.DST_ALPHA,[Cm]:i.ONE_MINUS_SRC_COLOR,[kl]:i.ONE_MINUS_SRC_ALPHA,[Fm]:i.ONE_MINUS_DST_COLOR,[Pm]:i.ONE_MINUS_DST_ALPHA,[Im]:i.CONSTANT_COLOR,[Om]:i.ONE_MINUS_CONSTANT_COLOR,[Bm]:i.CONSTANT_ALPHA,[Nm]:i.ONE_MINUS_CONSTANT_ALPHA};function pt(L,ie,ae,pe,ee,Y,_e,Oe,dt,et){if(L===gi){_===!0&&(me(i.BLEND),_=!1);return}if(_===!1&&(Q(i.BLEND),_=!0),L!==xm){if(L!==m||et!==y){if((p!==Bi||x!==Bi)&&(i.blendEquation(i.FUNC_ADD),p=Bi,x=Bi),et)switch(L){case Fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Us:i.blendFunc(i.ONE,i.ONE);break;case au:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ou:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case au:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ou:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}w=null,E=null,A=null,k=null,R.set(0,0,0),O=0,m=L,y=et}return}ee=ee||ie,Y=Y||ae,_e=_e||pe,(ie!==p||ee!==x)&&(i.blendEquationSeparate(It[ie],It[ee]),p=ie,x=ee),(ae!==w||pe!==E||Y!==A||_e!==k)&&(i.blendFuncSeparate(C[ae],C[pe],C[Y],C[_e]),w=ae,E=pe,A=Y,k=_e),(Oe.equals(R)===!1||dt!==O)&&(i.blendColor(Oe.r,Oe.g,Oe.b,dt),R.copy(Oe),O=dt),m=L,y=!1}function Be(L,ie){L.side===Cn?me(i.CULL_FACE):Q(i.CULL_FACE);let ae=L.side===Yt;ie&&(ae=!ae),Le(ae),L.blending===Fs&&L.transparent===!1?pt(gi):pt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const pe=L.stencilWrite;o.setTest(pe),pe&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ve(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Le(L){S!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),S=L)}function be(L){L!==vm?(Q(i.CULL_FACE),L!==F&&(L===ru?i.cullFace(i.BACK):L===ym?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):me(i.CULL_FACE),F=L}function mt(L){L!==z&&(j&&i.lineWidth(L),z=L)}function ve(L,ie,ae){L?(Q(i.POLYGON_OFFSET_FILL),(W!==ie||q!==ae)&&(i.polygonOffset(ie,ae),W=ie,q=ae)):me(i.POLYGON_OFFSET_FILL)}function Ue(L){L?Q(i.SCISSOR_TEST):me(i.SCISSOR_TEST)}function kt(L){L===void 0&&(L=i.TEXTURE0+X-1),le!==L&&(i.activeTexture(L),le=L)}function wt(L,ie,ae){ae===void 0&&(le===null?ae=i.TEXTURE0+X-1:ae=le);let pe=he[ae];pe===void 0&&(pe={type:void 0,texture:void 0},he[ae]=pe),(pe.type!==L||pe.texture!==ie)&&(le!==ae&&(i.activeTexture(ae),le=ae),i.bindTexture(L,ie||K[L]),pe.type=L,pe.texture=ie)}function T(){const L=he[le];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function b(){try{i.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function V(){try{i.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{i.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function H(){try{i.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{i.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function re(){try{i.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{i.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xe(){try{i.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ne(){try{i.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(L){ct.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),ct.copy(L))}function ke(L){ft.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),ft.copy(L))}function we(L,ie){let ae=c.get(ie);ae===void 0&&(ae=new WeakMap,c.set(ie,ae));let pe=ae.get(L);pe===void 0&&(pe=i.getUniformBlockIndex(ie,L.name),ae.set(L,pe))}function ce(L,ie){const pe=c.get(ie).get(L);l.get(ie)!==pe&&(i.uniformBlockBinding(ie,pe,L.__bindingPointIndex),l.set(ie,pe))}function Ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},le=null,he={},u={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,w=null,E=null,x=null,A=null,k=null,R=new Pe(0,0,0),O=0,y=!1,S=null,F=null,z=null,W=null,q=null,ct.set(0,0,i.canvas.width,i.canvas.height),ft.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:me,bindFramebuffer:De,drawBuffers:Me,useProgram:je,setBlending:pt,setMaterial:Be,setFlipSided:Le,setCullFace:be,setLineWidth:mt,setPolygonOffset:ve,setScissorTest:Ue,activeTexture:kt,bindTexture:wt,unbindTexture:T,compressedTexImage2D:b,compressedTexImage3D:B,texImage2D:xe,texImage3D:ne,updateUBOMapping:we,uniformBlockBinding:ce,texStorage2D:re,texStorage3D:ye,texSubImage2D:V,texSubImage3D:Z,compressedTexSubImage2D:H,compressedTexSubImage3D:Se,scissor:ue,viewport:ke,reset:Ne}}function vy(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new He,d=new WeakMap;let u;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,b){return f?new OffscreenCanvas(T,b):Xa("canvas")}function _(T,b,B){let V=1;const Z=wt(T);if((Z.width>B||Z.height>B)&&(V=B/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const H=Math.floor(V*Z.width),Se=Math.floor(V*Z.height);u===void 0&&(u=g(H,Se));const re=b?g(H,Se):u;return re.width=H,re.height=Se,re.getContext("2d").drawImage(T,0,0,H,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+H+"x"+Se+")."),re}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(T,b,B,V,Z=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let H=b;if(b===i.RED&&(B===i.FLOAT&&(H=i.R32F),B===i.HALF_FLOAT&&(H=i.R16F),B===i.UNSIGNED_BYTE&&(H=i.R8)),b===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(H=i.R8UI),B===i.UNSIGNED_SHORT&&(H=i.R16UI),B===i.UNSIGNED_INT&&(H=i.R32UI),B===i.BYTE&&(H=i.R8I),B===i.SHORT&&(H=i.R16I),B===i.INT&&(H=i.R32I)),b===i.RG&&(B===i.FLOAT&&(H=i.RG32F),B===i.HALF_FLOAT&&(H=i.RG16F),B===i.UNSIGNED_BYTE&&(H=i.RG8)),b===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(H=i.RG8UI),B===i.UNSIGNED_SHORT&&(H=i.RG16UI),B===i.UNSIGNED_INT&&(H=i.RG32UI),B===i.BYTE&&(H=i.RG8I),B===i.SHORT&&(H=i.RG16I),B===i.INT&&(H=i.RG32I)),b===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(H=i.RGB8UI),B===i.UNSIGNED_SHORT&&(H=i.RGB16UI),B===i.UNSIGNED_INT&&(H=i.RGB32UI),B===i.BYTE&&(H=i.RGB8I),B===i.SHORT&&(H=i.RGB16I),B===i.INT&&(H=i.RGB32I)),b===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(H=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(H=i.RGBA16UI),B===i.UNSIGNED_INT&&(H=i.RGBA32UI),B===i.BYTE&&(H=i.RGBA8I),B===i.SHORT&&(H=i.RGBA16I),B===i.INT&&(H=i.RGBA32I)),b===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(H=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(H=i.R11F_G11F_B10F)),b===i.RGBA){const Se=Z?Ka:Ze.getTransfer(V);B===i.FLOAT&&(H=i.RGBA32F),B===i.HALF_FLOAT&&(H=i.RGBA16F),B===i.UNSIGNED_BYTE&&(H=Se===rt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(H=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(H=i.RGB5_A1)}return(H===i.R16F||H===i.R32F||H===i.RG16F||H===i.RG32F||H===i.RGBA16F||H===i.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function x(T,b){let B;return T?b===null||b===Ki||b===Ar?B=i.DEPTH24_STENCIL8:b===Nn?B=i.DEPTH32F_STENCIL8:b===Tr&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ki||b===Ar?B=i.DEPTH_COMPONENT24:b===Nn?B=i.DEPTH_COMPONENT32F:b===Tr&&(B=i.DEPTH_COMPONENT16),B}function A(T,b){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==dn&&T.minFilter!==Bn?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function k(T){const b=T.target;b.removeEventListener("dispose",k),O(b),b.isVideoTexture&&d.delete(b)}function R(T){const b=T.target;b.removeEventListener("dispose",R),S(b)}function O(T){const b=n.get(T);if(b.__webglInit===void 0)return;const B=T.source,V=h.get(B);if(V){const Z=V[b.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&y(T),Object.keys(V).length===0&&h.delete(B)}n.remove(T)}function y(T){const b=n.get(T);i.deleteTexture(b.__webglTexture);const B=T.source,V=h.get(B);delete V[b.__cacheKey],a.memory.textures--}function S(T){const b=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(b.__webglFramebuffer[V]))for(let Z=0;Z<b.__webglFramebuffer[V].length;Z++)i.deleteFramebuffer(b.__webglFramebuffer[V][Z]);else i.deleteFramebuffer(b.__webglFramebuffer[V]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[V])}else{if(Array.isArray(b.__webglFramebuffer))for(let V=0;V<b.__webglFramebuffer.length;V++)i.deleteFramebuffer(b.__webglFramebuffer[V]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let V=0;V<b.__webglColorRenderbuffer.length;V++)b.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[V]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const B=T.textures;for(let V=0,Z=B.length;V<Z;V++){const H=n.get(B[V]);H.__webglTexture&&(i.deleteTexture(H.__webglTexture),a.memory.textures--),n.remove(B[V])}n.remove(T)}let F=0;function z(){F=0}function W(){const T=F;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),F+=1,T}function q(T){const b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function X(T,b){const B=n.get(T);if(T.isVideoTexture&&Ue(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){const V=T.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(B,T,b);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+b)}function j(T,b){const B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){K(B,T,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+b)}function se(T,b){const B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){K(B,T,b);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+b)}function G(T,b){const B=n.get(T);if(T.version>0&&B.__version!==T.version){Q(B,T,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+b)}const le={[Ul]:i.REPEAT,[zi]:i.CLAMP_TO_EDGE,[Gl]:i.MIRRORED_REPEAT},he={[dn]:i.NEAREST,[qm]:i.NEAREST_MIPMAP_NEAREST,[sa]:i.NEAREST_MIPMAP_LINEAR,[Bn]:i.LINEAR,[Oo]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},Ee={[Zm]:i.NEVER,[ig]:i.ALWAYS,[Qm]:i.LESS,[pf]:i.LEQUAL,[Jm]:i.EQUAL,[ng]:i.GEQUAL,[eg]:i.GREATER,[tg]:i.NOTEQUAL};function We(T,b){if(b.type===Nn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Bn||b.magFilter===Oo||b.magFilter===sa||b.magFilter===Ui||b.minFilter===Bn||b.minFilter===Oo||b.minFilter===sa||b.minFilter===Ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,le[b.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,le[b.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,le[b.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,he[b.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,he[b.minFilter]),b.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Ee[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===dn||b.minFilter!==sa&&b.minFilter!==Ui||b.type===Nn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function ct(T,b){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",k));const V=b.source;let Z=h.get(V);Z===void 0&&(Z={},h.set(V,Z));const H=q(b);if(H!==T.__cacheKey){Z[H]===void 0&&(Z[H]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[H].usedTimes++;const Se=Z[T.__cacheKey];Se!==void 0&&(Z[T.__cacheKey].usedTimes--,Se.usedTimes===0&&y(b)),T.__cacheKey=H,T.__webglTexture=Z[H].texture}return B}function ft(T,b,B){return Math.floor(Math.floor(T/B)/b)}function Je(T,b,B,V){const H=T.updateRanges;if(H.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,B,V,b.data);else{H.sort((ne,ue)=>ne.start-ue.start);let Se=0;for(let ne=1;ne<H.length;ne++){const ue=H[Se],ke=H[ne],we=ue.start+ue.count,ce=ft(ke.start,b.width,4),Ne=ft(ue.start,b.width,4);ke.start<=we+1&&ce===Ne&&ft(ke.start+ke.count-1,b.width,4)===ce?ue.count=Math.max(ue.count,ke.start+ke.count-ue.start):(++Se,H[Se]=ke)}H.length=Se+1;const re=i.getParameter(i.UNPACK_ROW_LENGTH),ye=i.getParameter(i.UNPACK_SKIP_PIXELS),xe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let ne=0,ue=H.length;ne<ue;ne++){const ke=H[ne],we=Math.floor(ke.start/4),ce=Math.ceil(ke.count/4),Ne=we%b.width,L=Math.floor(we/b.width),ie=ce,ae=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),i.pixelStorei(i.UNPACK_SKIP_ROWS,L),t.texSubImage2D(i.TEXTURE_2D,0,Ne,L,ie,ae,B,V,b.data)}T.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,re),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ye),i.pixelStorei(i.UNPACK_SKIP_ROWS,xe)}}function K(T,b,B){let V=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(V=i.TEXTURE_3D);const Z=ct(T,b),H=b.source;t.bindTexture(V,T.__webglTexture,i.TEXTURE0+B);const Se=n.get(H);if(H.version!==Se.__version||Z===!0){t.activeTexture(i.TEXTURE0+B);const re=Ze.getPrimaries(Ze.workingColorSpace),ye=b.colorSpace===fi?null:Ze.getPrimaries(b.colorSpace),xe=b.colorSpace===fi||re===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let ne=_(b.image,!1,s.maxTextureSize);ne=kt(b,ne);const ue=r.convert(b.format,b.colorSpace),ke=r.convert(b.type);let we=E(b.internalFormat,ue,ke,b.colorSpace,b.isVideoTexture);We(V,b);let ce;const Ne=b.mipmaps,L=b.isVideoTexture!==!0,ie=Se.__version===void 0||Z===!0,ae=H.dataReady,pe=A(b,ne);if(b.isDepthTexture)we=x(b.format===Cr,b.type),ie&&(L?t.texStorage2D(i.TEXTURE_2D,1,we,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,we,ne.width,ne.height,0,ue,ke,null));else if(b.isDataTexture)if(Ne.length>0){L&&ie&&t.texStorage2D(i.TEXTURE_2D,pe,we,Ne[0].width,Ne[0].height);for(let ee=0,Y=Ne.length;ee<Y;ee++)ce=Ne[ee],L?ae&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ce.width,ce.height,ue,ke,ce.data):t.texImage2D(i.TEXTURE_2D,ee,we,ce.width,ce.height,0,ue,ke,ce.data);b.generateMipmaps=!1}else L?(ie&&t.texStorage2D(i.TEXTURE_2D,pe,we,ne.width,ne.height),ae&&Je(b,ne,ue,ke)):t.texImage2D(i.TEXTURE_2D,0,we,ne.width,ne.height,0,ue,ke,ne.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){L&&ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,we,Ne[0].width,Ne[0].height,ne.depth);for(let ee=0,Y=Ne.length;ee<Y;ee++)if(ce=Ne[ee],b.format!==kn)if(ue!==null)if(L){if(ae)if(b.layerUpdates.size>0){const _e=zu(ce.width,ce.height,b.format,b.type);for(const Oe of b.layerUpdates){const dt=ce.data.subarray(Oe*_e/ce.data.BYTES_PER_ELEMENT,(Oe+1)*_e/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Oe,ce.width,ce.height,1,ue,dt)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,ne.depth,ue,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,we,ce.width,ce.height,ne.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,ne.depth,ue,ke,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,we,ce.width,ce.height,ne.depth,0,ue,ke,ce.data)}else{L&&ie&&t.texStorage2D(i.TEXTURE_2D,pe,we,Ne[0].width,Ne[0].height);for(let ee=0,Y=Ne.length;ee<Y;ee++)ce=Ne[ee],b.format!==kn?ue!==null?L?ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,ce.width,ce.height,ue,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,we,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?ae&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ce.width,ce.height,ue,ke,ce.data):t.texImage2D(i.TEXTURE_2D,ee,we,ce.width,ce.height,0,ue,ke,ce.data)}else if(b.isDataArrayTexture)if(L){if(ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,we,ne.width,ne.height,ne.depth),ae)if(b.layerUpdates.size>0){const ee=zu(ne.width,ne.height,b.format,b.type);for(const Y of b.layerUpdates){const _e=ne.data.subarray(Y*ee/ne.data.BYTES_PER_ELEMENT,(Y+1)*ee/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Y,ne.width,ne.height,1,ue,ke,_e)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ue,ke,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,ne.width,ne.height,ne.depth,0,ue,ke,ne.data);else if(b.isData3DTexture)L?(ie&&t.texStorage3D(i.TEXTURE_3D,pe,we,ne.width,ne.height,ne.depth),ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ue,ke,ne.data)):t.texImage3D(i.TEXTURE_3D,0,we,ne.width,ne.height,ne.depth,0,ue,ke,ne.data);else if(b.isFramebufferTexture){if(ie)if(L)t.texStorage2D(i.TEXTURE_2D,pe,we,ne.width,ne.height);else{let ee=ne.width,Y=ne.height;for(let _e=0;_e<pe;_e++)t.texImage2D(i.TEXTURE_2D,_e,we,ee,Y,0,ue,ke,null),ee>>=1,Y>>=1}}else if(Ne.length>0){if(L&&ie){const ee=wt(Ne[0]);t.texStorage2D(i.TEXTURE_2D,pe,we,ee.width,ee.height)}for(let ee=0,Y=Ne.length;ee<Y;ee++)ce=Ne[ee],L?ae&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ue,ke,ce):t.texImage2D(i.TEXTURE_2D,ee,we,ue,ke,ce);b.generateMipmaps=!1}else if(L){if(ie){const ee=wt(ne);t.texStorage2D(i.TEXTURE_2D,pe,we,ee.width,ee.height)}ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,ke,ne)}else t.texImage2D(i.TEXTURE_2D,0,we,ue,ke,ne);m(b)&&p(V),Se.__version=H.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function Q(T,b,B){if(b.image.length!==6)return;const V=ct(T,b),Z=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);const H=n.get(Z);if(Z.version!==H.__version||V===!0){t.activeTexture(i.TEXTURE0+B);const Se=Ze.getPrimaries(Ze.workingColorSpace),re=b.colorSpace===fi?null:Ze.getPrimaries(b.colorSpace),ye=b.colorSpace===fi||Se===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const xe=b.isCompressedTexture||b.image[0].isCompressedTexture,ne=b.image[0]&&b.image[0].isDataTexture,ue=[];for(let Y=0;Y<6;Y++)!xe&&!ne?ue[Y]=_(b.image[Y],!0,s.maxCubemapSize):ue[Y]=ne?b.image[Y].image:b.image[Y],ue[Y]=kt(b,ue[Y]);const ke=ue[0],we=r.convert(b.format,b.colorSpace),ce=r.convert(b.type),Ne=E(b.internalFormat,we,ce,b.colorSpace),L=b.isVideoTexture!==!0,ie=H.__version===void 0||V===!0,ae=Z.dataReady;let pe=A(b,ke);We(i.TEXTURE_CUBE_MAP,b);let ee;if(xe){L&&ie&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ne,ke.width,ke.height);for(let Y=0;Y<6;Y++){ee=ue[Y].mipmaps;for(let _e=0;_e<ee.length;_e++){const Oe=ee[_e];b.format!==kn?we!==null?L?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,0,0,Oe.width,Oe.height,we,Oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,Ne,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,0,0,Oe.width,Oe.height,we,ce,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,Ne,Oe.width,Oe.height,0,we,ce,Oe.data)}}}else{if(ee=b.mipmaps,L&&ie){ee.length>0&&pe++;const Y=wt(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ne,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(ne){L?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ue[Y].width,ue[Y].height,we,ce,ue[Y].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ne,ue[Y].width,ue[Y].height,0,we,ce,ue[Y].data);for(let _e=0;_e<ee.length;_e++){const dt=ee[_e].image[Y].image;L?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,0,0,dt.width,dt.height,we,ce,dt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,Ne,dt.width,dt.height,0,we,ce,dt.data)}}else{L?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,we,ce,ue[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ne,we,ce,ue[Y]);for(let _e=0;_e<ee.length;_e++){const Oe=ee[_e];L?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,0,0,we,ce,Oe.image[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,Ne,we,ce,Oe.image[Y])}}}m(b)&&p(i.TEXTURE_CUBE_MAP),H.__version=Z.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function me(T,b,B,V,Z,H){const Se=r.convert(B.format,B.colorSpace),re=r.convert(B.type),ye=E(B.internalFormat,Se,re,B.colorSpace),xe=n.get(b),ne=n.get(B);if(ne.__renderTarget=b,!xe.__hasExternalTextures){const ue=Math.max(1,b.width>>H),ke=Math.max(1,b.height>>H);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,H,ye,ue,ke,b.depth,0,Se,re,null):t.texImage2D(Z,H,ye,ue,ke,0,Se,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),ve(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,Z,ne.__webglTexture,0,mt(b)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,Z,ne.__webglTexture,H),t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(T,b,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),b.depthBuffer){const V=b.depthTexture,Z=V&&V.isDepthTexture?V.type:null,H=x(b.stencilBuffer,Z),Se=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=mt(b);ve(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,H,b.width,b.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,H,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,H,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,T)}else{const V=b.textures;for(let Z=0;Z<V.length;Z++){const H=V[Z],Se=r.convert(H.format,H.colorSpace),re=r.convert(H.type),ye=E(H.internalFormat,Se,re,H.colorSpace),xe=mt(b);B&&ve(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,xe,ye,b.width,b.height):ve(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xe,ye,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ye,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const V=n.get(b.depthTexture);V.__renderTarget=b,(!V.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),X(b.depthTexture,0);const Z=V.__webglTexture,H=mt(b);if(b.depthTexture.format===Rr)ve(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,H):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(b.depthTexture.format===Cr)ve(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,H):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function je(T){const b=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){const V=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),V){const Z=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),b.__depthDisposeCallback=Z}b.__boundDepthTexture=V}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const V=T.texture.mipmaps;V&&V.length>0?Me(b.__webglFramebuffer[0],T):Me(b.__webglFramebuffer,T)}else if(B){b.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[V]),b.__webglDepthbuffer[V]===void 0)b.__webglDepthbuffer[V]=i.createRenderbuffer(),De(b.__webglDepthbuffer[V],T,!1);else{const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=b.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,H),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,H)}}else{const V=T.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),De(b.__webglDepthbuffer,T,!1);else{const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,H),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,H)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function It(T,b,B){const V=n.get(T);b!==void 0&&me(V.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&je(T)}function C(T){const b=T.texture,B=n.get(T),V=n.get(b);T.addEventListener("dispose",R);const Z=T.textures,H=T.isWebGLCubeRenderTarget===!0,Se=Z.length>1;if(Se||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=b.version,a.memory.textures++),H){B.__webglFramebuffer=[];for(let re=0;re<6;re++)if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer[re]=[];for(let ye=0;ye<b.mipmaps.length;ye++)B.__webglFramebuffer[re][ye]=i.createFramebuffer()}else B.__webglFramebuffer[re]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer=[];for(let re=0;re<b.mipmaps.length;re++)B.__webglFramebuffer[re]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Se)for(let re=0,ye=Z.length;re<ye;re++){const xe=n.get(Z[re]);xe.__webglTexture===void 0&&(xe.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&ve(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let re=0;re<Z.length;re++){const ye=Z[re];B.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[re]);const xe=r.convert(ye.format,ye.colorSpace),ne=r.convert(ye.type),ue=E(ye.internalFormat,xe,ne,ye.colorSpace,T.isXRRenderTarget===!0),ke=mt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,ue,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,B.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),De(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(H){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),We(i.TEXTURE_CUBE_MAP,b);for(let re=0;re<6;re++)if(b.mipmaps&&b.mipmaps.length>0)for(let ye=0;ye<b.mipmaps.length;ye++)me(B.__webglFramebuffer[re][ye],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye);else me(B.__webglFramebuffer[re],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(b)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let re=0,ye=Z.length;re<ye;re++){const xe=Z[re],ne=n.get(xe);let ue=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ue=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,ne.__webglTexture),We(ue,xe),me(B.__webglFramebuffer,T,xe,i.COLOR_ATTACHMENT0+re,ue,0),m(xe)&&p(ue)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(re=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,V.__webglTexture),We(re,b),b.mipmaps&&b.mipmaps.length>0)for(let ye=0;ye<b.mipmaps.length;ye++)me(B.__webglFramebuffer[ye],T,b,i.COLOR_ATTACHMENT0,re,ye);else me(B.__webglFramebuffer,T,b,i.COLOR_ATTACHMENT0,re,0);m(b)&&p(re),t.unbindTexture()}T.depthBuffer&&je(T)}function pt(T){const b=T.textures;for(let B=0,V=b.length;B<V;B++){const Z=b[B];if(m(Z)){const H=w(T),Se=n.get(Z).__webglTexture;t.bindTexture(H,Se),p(H),t.unbindTexture()}}}const Be=[],Le=[];function be(T){if(T.samples>0){if(ve(T)===!1){const b=T.textures,B=T.width,V=T.height;let Z=i.COLOR_BUFFER_BIT;const H=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(T),re=b.length>1;if(re)for(let xe=0;xe<b.length;xe++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const ye=T.texture.mipmaps;ye&&ye.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let xe=0;xe<b.length;xe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[xe]);const ne=n.get(b[xe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ne,0)}i.blitFramebuffer(0,0,B,V,0,0,B,V,Z,i.NEAREST),l===!0&&(Be.length=0,Le.length=0,Be.push(i.COLOR_ATTACHMENT0+xe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Be.push(H),Le.push(H),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let xe=0;xe<b.length;xe++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,Se.__webglColorRenderbuffer[xe]);const ne=n.get(b[xe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const b=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function mt(T){return Math.min(s.maxSamples,T.samples)}function ve(T){const b=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ue(T){const b=a.render.frame;d.get(T)!==b&&(d.set(T,b),T.update())}function kt(T,b){const B=T.colorSpace,V=T.format,Z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Vs&&B!==fi&&(Ze.getTransfer(B)===rt?(V!==kn||Z!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),b}function wt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=z,this.setTexture2D=X,this.setTexture2DArray=j,this.setTexture3D=se,this.setTextureCube=G,this.rebindTextures=It,this.setupRenderTarget=C,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=me,this.useMultisampledRTT=ve}function yy(i,e){function t(n,s=fi){let r;const a=Ze.getTransfer(s);if(n===Gn)return i.UNSIGNED_BYTE;if(n===ld)return i.UNSIGNED_SHORT_4_4_4_4;if(n===cd)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===cf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===af)return i.BYTE;if(n===of)return i.SHORT;if(n===Tr)return i.UNSIGNED_SHORT;if(n===od)return i.INT;if(n===Ki)return i.UNSIGNED_INT;if(n===Nn)return i.FLOAT;if(n===qr)return i.HALF_FLOAT;if(n===df)return i.ALPHA;if(n===uf)return i.RGB;if(n===kn)return i.RGBA;if(n===Rr)return i.DEPTH_COMPONENT;if(n===Cr)return i.DEPTH_STENCIL;if(n===dd)return i.RED;if(n===ud)return i.RED_INTEGER;if(n===hf)return i.RG;if(n===hd)return i.RG_INTEGER;if(n===fd)return i.RGBA_INTEGER;if(n===za||n===Ua||n===Ga||n===Ha)if(a===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===za)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===za)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ua)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ga)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ha)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Hl||n===Wl||n===Vl||n===$l)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Hl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Vl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===$l)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===jl||n===ql||n===Kl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===jl||n===ql)return a===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Kl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Yl||n===Xl||n===Zl||n===Ql||n===Jl||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===ac||n===oc||n===lc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Yl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Xl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Zl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ql)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Jl)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ec)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===tc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ic)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===rc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ac)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===oc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===lc)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cc||n===dc||n===uc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===cc)return a===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===dc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===uc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hc||n===fc||n===pc||n===mc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===hc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===fc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===pc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===mc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ar?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const xy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Sy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Tf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ei({vertexShader:xy,fragmentShader:wy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ft(new Mi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class My extends Qs{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Sy,p={},w=t.getContextAttributes();let E=null,x=null;const A=[],k=[],R=new He;let O=null;const y=new _n;y.viewport=new xt;const S=new _n;S.viewport=new xt;const F=[y,S],z=new Vg;let W=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let Q=A[K];return Q===void 0&&(Q=new rl,A[K]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(K){let Q=A[K];return Q===void 0&&(Q=new rl,A[K]=Q),Q.getGripSpace()},this.getHand=function(K){let Q=A[K];return Q===void 0&&(Q=new rl,A[K]=Q),Q.getHandSpace()};function X(K){const Q=k.indexOf(K.inputSource);if(Q===-1)return;const me=A[Q];me!==void 0&&(me.update(K.inputSource,K.frame,c||a),me.dispatchEvent({type:K.type,data:K.inputSource}))}function j(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",se);for(let K=0;K<A.length;K++){const Q=k[K];Q!==null&&(k[K]=null,A[K].disconnect(Q))}W=null,q=null,m.reset();for(const K in p)delete p[K];e.setRenderTarget(E),f=null,h=null,u=null,s=null,x=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",j),s.addEventListener("inputsourceschange",se),w.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,De=null,Me=null;w.depth&&(Me=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=w.stencil?Cr:Rr,De=w.stencil?Ar:Ki);const je={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(je),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Yi(h.textureWidth,h.textureHeight,{format:kn,type:Gn,depthTexture:new Ef(h.textureWidth,h.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const me={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Yi(f.framebufferWidth,f.framebufferHeight,{format:kn,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Je.setContext(s),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(K){for(let Q=0;Q<K.removed.length;Q++){const me=K.removed[Q],De=k.indexOf(me);De>=0&&(k[De]=null,A[De].disconnect(me))}for(let Q=0;Q<K.added.length;Q++){const me=K.added[Q];let De=k.indexOf(me);if(De===-1){for(let je=0;je<A.length;je++)if(je>=k.length){k.push(me),De=je;break}else if(k[je]===null){k[je]=me,De=je;break}if(De===-1)break}const Me=A[De];Me&&Me.connect(me)}}const G=new P,le=new P;function he(K,Q,me){G.setFromMatrixPosition(Q.matrixWorld),le.setFromMatrixPosition(me.matrixWorld);const De=G.distanceTo(le),Me=Q.projectionMatrix.elements,je=me.projectionMatrix.elements,It=Me[14]/(Me[10]-1),C=Me[14]/(Me[10]+1),pt=(Me[9]+1)/Me[5],Be=(Me[9]-1)/Me[5],Le=(Me[8]-1)/Me[0],be=(je[8]+1)/je[0],mt=It*Le,ve=It*be,Ue=De/(-Le+be),kt=Ue*-Le;if(Q.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(kt),K.translateZ(Ue),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Me[10]===-1)K.projectionMatrix.copy(Q.projectionMatrix),K.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const wt=It+Ue,T=C+Ue,b=mt-kt,B=ve+(De-kt),V=pt*C/T*wt,Z=Be*C/T*wt;K.projectionMatrix.makePerspective(b,B,V,Z,wt,T),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Ee(K,Q){Q===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(Q.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let Q=K.near,me=K.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(me=m.depthFar)),z.near=S.near=y.near=Q,z.far=S.far=y.far=me,(W!==z.near||q!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),W=z.near,q=z.far),z.layers.mask=K.layers.mask|6,y.layers.mask=z.layers.mask&3,S.layers.mask=z.layers.mask&5;const De=K.parent,Me=z.cameras;Ee(z,De);for(let je=0;je<Me.length;je++)Ee(Me[je],De);Me.length===2?he(z,y,S):z.projectionMatrix.copy(y.projectionMatrix),We(K,z,De)};function We(K,Q,me){me===null?K.matrix.copy(Q.matrixWorld):(K.matrix.copy(me.matrixWorld),K.matrix.invert(),K.matrix.multiply(Q.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(Q.projectionMatrix),K.projectionMatrixInverse.copy(Q.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=_c*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(K){return p[K]};let ct=null;function ft(K,Q){if(d=Q.getViewerPose(c||a),g=Q,d!==null){const me=d.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let De=!1;me.length!==z.cameras.length&&(z.cameras.length=0,De=!0);for(let C=0;C<me.length;C++){const pt=me[C];let Be=null;if(f!==null)Be=f.getViewport(pt);else{const be=u.getViewSubImage(h,pt);Be=be.viewport,C===0&&(e.setRenderTargetTextures(x,be.colorTexture,be.depthStencilTexture),e.setRenderTarget(x))}let Le=F[C];Le===void 0&&(Le=new _n,Le.layers.enable(C),Le.viewport=new xt,F[C]=Le),Le.matrix.fromArray(pt.transform.matrix),Le.matrix.decompose(Le.position,Le.quaternion,Le.scale),Le.projectionMatrix.fromArray(pt.projectionMatrix),Le.projectionMatrixInverse.copy(Le.projectionMatrix).invert(),Le.viewport.set(Be.x,Be.y,Be.width,Be.height),C===0&&(z.matrix.copy(Le.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),De===!0&&z.cameras.push(Le)}const Me=s.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const C=u.getDepthInformation(me[0]);C&&C.isValid&&C.texture&&m.init(C,s.renderState)}if(Me&&Me.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let C=0;C<me.length;C++){const pt=me[C].camera;if(pt){let Be=p[pt];Be||(Be=new Tf,p[pt]=Be);const Le=u.getCameraImage(pt);Be.sourceTexture=Le}}}}for(let me=0;me<A.length;me++){const De=k[me],Me=A[me];De!==null&&Me!==void 0&&Me.update(De,Q,c||a)}ct&&ct(K,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Je=new Rf;Je.setAnimationLoop(ft),this.setAnimationLoop=function(K){ct=K},this.dispose=function(){}}}const Fi=new Hn,Ey=new it;function Ty(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,yf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,E,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Yt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Yt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=e.get(p),E=w.envMap,x=w.envMapRotation;E&&(m.envMap.value=E,Fi.copy(x),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),m.envMapRotation.value.setFromMatrix4(Ey.makeRotationFromEuler(Fi)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Yt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const w=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ay(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,E){const x=E.program;n.uniformBlockBinding(w,x)}function c(w,E){let x=s[w.id];x===void 0&&(g(w),x=d(w),s[w.id]=x,w.addEventListener("dispose",m));const A=E.program;n.updateUBOMapping(w,A);const k=e.render.frame;r[w.id]!==k&&(h(w),r[w.id]=k)}function d(w){const E=u();w.__bindingPointIndex=E;const x=i.createBuffer(),A=w.__size,k=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,A,k),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,x),x}function u(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(w){const E=s[w.id],x=w.uniforms,A=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let k=0,R=x.length;k<R;k++){const O=Array.isArray(x[k])?x[k]:[x[k]];for(let y=0,S=O.length;y<S;y++){const F=O[y];if(f(F,k,y,A)===!0){const z=F.__offset,W=Array.isArray(F.value)?F.value:[F.value];let q=0;for(let X=0;X<W.length;X++){const j=W[X],se=_(j);typeof j=="number"||typeof j=="boolean"?(F.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,z+q,F.__data)):j.isMatrix3?(F.__data[0]=j.elements[0],F.__data[1]=j.elements[1],F.__data[2]=j.elements[2],F.__data[3]=0,F.__data[4]=j.elements[3],F.__data[5]=j.elements[4],F.__data[6]=j.elements[5],F.__data[7]=0,F.__data[8]=j.elements[6],F.__data[9]=j.elements[7],F.__data[10]=j.elements[8],F.__data[11]=0):(j.toArray(F.__data,q),q+=se.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,F.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(w,E,x,A){const k=w.value,R=E+"_"+x;if(A[R]===void 0)return typeof k=="number"||typeof k=="boolean"?A[R]=k:A[R]=k.clone(),!0;{const O=A[R];if(typeof k=="number"||typeof k=="boolean"){if(O!==k)return A[R]=k,!0}else if(O.equals(k)===!1)return O.copy(k),!0}return!1}function g(w){const E=w.uniforms;let x=0;const A=16;for(let R=0,O=E.length;R<O;R++){const y=Array.isArray(E[R])?E[R]:[E[R]];for(let S=0,F=y.length;S<F;S++){const z=y[S],W=Array.isArray(z.value)?z.value:[z.value];for(let q=0,X=W.length;q<X;q++){const j=W[q],se=_(j),G=x%A,le=G%se.boundary,he=G+le;x+=le,he!==0&&A-he<se.storage&&(x+=A-he),z.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=se.storage}}}const k=x%A;return k>0&&(x+=A-k),w.__size=x,w.__cache={},this}function _(w){const E={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(E.boundary=4,E.storage=4):w.isVector2?(E.boundary=8,E.storage=8):w.isVector3||w.isColor?(E.boundary=16,E.storage=12):w.isVector4?(E.boundary=16,E.storage=16):w.isMatrix3?(E.boundary=48,E.storage=48):w.isMatrix4?(E.boundary=64,E.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),E}function m(w){const E=w.target;E.removeEventListener("dispose",m);const x=a.indexOf(E.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const w in s)i.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Ry{constructor(e={}){const{canvas:t=rg(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const w=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let A=!1;this._outputColorSpace=mn;let k=0,R=0,O=null,y=-1,S=null;const F=new xt,z=new xt;let W=null;const q=new Pe(0);let X=0,j=t.width,se=t.height,G=1,le=null,he=null;const Ee=new xt(0,0,j,se),We=new xt(0,0,j,se);let ct=!1;const ft=new vd;let Je=!1,K=!1;const Q=new it,me=new P,De=new xt,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function It(){return O===null?G:1}let C=n;function pt(v,D){return t.getContext(v,D)}try{const v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rd}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",ee,!1),C===null){const D="webgl2";if(C=pt(D,v),C===null)throw pt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Be,Le,be,mt,ve,Ue,kt,wt,T,b,B,V,Z,H,Se,re,ye,xe,ne,ue,ke,we,ce,Ne;function L(){Be=new Nb(C),Be.init(),we=new yy(C,Be),Le=new Pb(C,Be,e,we),be=new by(C,Be),Le.reversedDepthBuffer&&h&&be.buffers.depth.setReversed(!0),mt=new Gb(C),ve=new ry,Ue=new vy(C,Be,be,ve,Le,we,mt),kt=new Fb(x),wt=new Bb(x),T=new qg(C),ce=new Cb(C,T),b=new zb(C,T,mt,ce),B=new Wb(C,b,T,mt),ne=new Hb(C,Le,Ue),re=new Lb(ve),V=new sy(x,kt,wt,Be,Le,ce,re),Z=new Ty(x,ve),H=new oy,Se=new fy(Be),xe=new Rb(x,kt,wt,be,B,f,l),ye=new gy(x,B,Le),Ne=new Ay(C,mt,Le,be),ue=new kb(C,Be,mt),ke=new Ub(C,Be,mt),mt.programs=V.programs,x.capabilities=Le,x.extensions=Be,x.properties=ve,x.renderLists=H,x.shadowMap=ye,x.state=be,x.info=mt}L();const ie=new My(x,C);this.xr=ie,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const v=Be.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Be.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(v){v!==void 0&&(G=v,this.setSize(j,se,!1))},this.getSize=function(v){return v.set(j,se)},this.setSize=function(v,D,N=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=v,se=D,t.width=Math.floor(v*G),t.height=Math.floor(D*G),N===!0&&(t.style.width=v+"px",t.style.height=D+"px"),this.setViewport(0,0,v,D)},this.getDrawingBufferSize=function(v){return v.set(j*G,se*G).floor()},this.setDrawingBufferSize=function(v,D,N){j=v,se=D,G=N,t.width=Math.floor(v*N),t.height=Math.floor(D*N),this.setViewport(0,0,v,D)},this.getCurrentViewport=function(v){return v.copy(F)},this.getViewport=function(v){return v.copy(Ee)},this.setViewport=function(v,D,N,U){v.isVector4?Ee.set(v.x,v.y,v.z,v.w):Ee.set(v,D,N,U),be.viewport(F.copy(Ee).multiplyScalar(G).round())},this.getScissor=function(v){return v.copy(We)},this.setScissor=function(v,D,N,U){v.isVector4?We.set(v.x,v.y,v.z,v.w):We.set(v,D,N,U),be.scissor(z.copy(We).multiplyScalar(G).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(v){be.setScissorTest(ct=v)},this.setOpaqueSort=function(v){le=v},this.setTransparentSort=function(v){he=v},this.getClearColor=function(v){return v.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor(...arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha(...arguments)},this.clear=function(v=!0,D=!0,N=!0){let U=0;if(v){let I=!1;if(O!==null){const te=O.texture.format;I=te===fd||te===hd||te===ud}if(I){const te=O.texture.type,de=te===Gn||te===Ki||te===Tr||te===Ar||te===ld||te===cd,ge=xe.getClearColor(),fe=xe.getClearAlpha(),Re=ge.r,Fe=ge.g,Te=ge.b;de?(g[0]=Re,g[1]=Fe,g[2]=Te,g[3]=fe,C.clearBufferuiv(C.COLOR,0,g)):(_[0]=Re,_[1]=Fe,_[2]=Te,_[3]=fe,C.clearBufferiv(C.COLOR,0,_))}else U|=C.COLOR_BUFFER_BIT}D&&(U|=C.DEPTH_BUFFER_BIT),N&&(U|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),xe.dispose(),H.dispose(),Se.dispose(),ve.dispose(),kt.dispose(),wt.dispose(),B.dispose(),ce.dispose(),Ne.dispose(),V.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",Pn),ie.removeEventListener("sessionend",Qd),Ti.stop()};function ae(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const v=mt.autoReset,D=ye.enabled,N=ye.autoUpdate,U=ye.needsUpdate,I=ye.type;L(),mt.autoReset=v,ye.enabled=D,ye.autoUpdate=N,ye.needsUpdate=U,ye.type=I}function ee(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Y(v){const D=v.target;D.removeEventListener("dispose",Y),_e(D)}function _e(v){Oe(v),ve.remove(v)}function Oe(v){const D=ve.get(v).programs;D!==void 0&&(D.forEach(function(N){V.releaseProgram(N)}),v.isShaderMaterial&&V.releaseShaderCache(v))}this.renderBufferDirect=function(v,D,N,U,I,te){D===null&&(D=Me);const de=I.isMesh&&I.matrixWorld.determinant()<0,ge=um(v,D,N,U,I);be.setMaterial(U,de);let fe=N.index,Re=1;if(U.wireframe===!0){if(fe=b.getWireframeAttribute(N),fe===void 0)return;Re=2}const Fe=N.drawRange,Te=N.attributes.position;let Ve=Fe.start*Re,st=(Fe.start+Fe.count)*Re;te!==null&&(Ve=Math.max(Ve,te.start*Re),st=Math.min(st,(te.start+te.count)*Re)),fe!==null?(Ve=Math.max(Ve,0),st=Math.min(st,fe.count)):Te!=null&&(Ve=Math.max(Ve,0),st=Math.min(st,Te.count));const yt=st-Ve;if(yt<0||yt===1/0)return;ce.setup(I,U,ge,N,fe);let ut,ot=ue;if(fe!==null&&(ut=T.get(fe),ot=ke,ot.setIndex(ut)),I.isMesh)U.wireframe===!0?(be.setLineWidth(U.wireframeLinewidth*It()),ot.setMode(C.LINES)):ot.setMode(C.TRIANGLES);else if(I.isLine){let Ae=U.linewidth;Ae===void 0&&(Ae=1),be.setLineWidth(Ae*It()),I.isLineSegments?ot.setMode(C.LINES):I.isLineLoop?ot.setMode(C.LINE_LOOP):ot.setMode(C.LINE_STRIP)}else I.isPoints?ot.setMode(C.POINTS):I.isSprite&&ot.setMode(C.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)kr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ot.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))ot.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Ae=I._multiDrawStarts,_t=I._multiDrawCounts,Ye=I._multiDrawCount,nn=fe?T.get(fe).bytesPerElement:1,as=ve.get(U).currentProgram.getUniforms();for(let sn=0;sn<Ye;sn++)as.setValue(C,"_gl_DrawID",sn),ot.render(Ae[sn]/nn,_t[sn])}else if(I.isInstancedMesh)ot.renderInstances(Ve,yt,I.count);else if(N.isInstancedBufferGeometry){const Ae=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,_t=Math.min(N.instanceCount,Ae);ot.renderInstances(Ve,yt,_t)}else ot.render(Ve,yt)};function dt(v,D,N){v.transparent===!0&&v.side===Cn&&v.forceSinglePass===!1?(v.side=Yt,v.needsUpdate=!0,ia(v,D,N),v.side=vi,v.needsUpdate=!0,ia(v,D,N),v.side=Cn):ia(v,D,N)}this.compile=function(v,D,N=null){N===null&&(N=v),p=Se.get(N),p.init(D),E.push(p),N.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),v!==N&&v.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),p.setupLights();const U=new Set;return v.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const te=I.material;if(te)if(Array.isArray(te))for(let de=0;de<te.length;de++){const ge=te[de];dt(ge,N,I),U.add(ge)}else dt(te,N,I),U.add(te)}),p=E.pop(),U},this.compileAsync=function(v,D,N=null){const U=this.compile(v,D,N);return new Promise(I=>{function te(){if(U.forEach(function(de){ve.get(de).currentProgram.isReady()&&U.delete(de)}),U.size===0){I(v);return}setTimeout(te,10)}Be.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let et=null;function Vn(v){et&&et(v)}function Pn(){Ti.stop()}function Qd(){Ti.start()}const Ti=new Rf;Ti.setAnimationLoop(Vn),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(v){et=v,ie.setAnimationLoop(v),v===null?Ti.stop():Ti.start()},ie.addEventListener("sessionstart",Pn),ie.addEventListener("sessionend",Qd),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(D),D=ie.getCamera()),v.isScene===!0&&v.onBeforeRender(x,v,D,O),p=Se.get(v,E.length),p.init(D),E.push(p),Q.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),ft.setFromProjectionMatrix(Q,zn,D.reversedDepth),K=this.localClippingEnabled,Je=re.init(this.clippingPlanes,K),m=H.get(v,w.length),m.init(),w.push(m),ie.enabled===!0&&ie.isPresenting===!0){const te=x.xr.getDepthSensingMesh();te!==null&&Do(te,D,-1/0,x.sortObjects)}Do(v,D,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(le,he),je=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,je&&xe.addToRenderList(m,v),this.info.render.frame++,Je===!0&&re.beginShadows();const N=p.state.shadowsArray;ye.render(N,v,D),Je===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const U=m.opaque,I=m.transmissive;if(p.setupLights(),D.isArrayCamera){const te=D.cameras;if(I.length>0)for(let de=0,ge=te.length;de<ge;de++){const fe=te[de];eu(U,I,v,fe)}je&&xe.render(v);for(let de=0,ge=te.length;de<ge;de++){const fe=te[de];Jd(m,v,fe,fe.viewport)}}else I.length>0&&eu(U,I,v,D),je&&xe.render(v),Jd(m,v,D);O!==null&&R===0&&(Ue.updateMultisampleRenderTarget(O),Ue.updateRenderTargetMipmap(O)),v.isScene===!0&&v.onAfterRender(x,v,D),ce.resetDefaultState(),y=-1,S=null,E.pop(),E.length>0?(p=E[E.length-1],Je===!0&&re.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Do(v,D,N,U){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)N=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(D);else if(v.isLight)p.pushLight(v),v.castShadow&&p.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||ft.intersectsSprite(v)){U&&De.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Q);const de=B.update(v),ge=v.material;ge.visible&&m.push(v,de,ge,N,De.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||ft.intersectsObject(v))){const de=B.update(v),ge=v.material;if(U&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),De.copy(v.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),De.copy(de.boundingSphere.center)),De.applyMatrix4(v.matrixWorld).applyMatrix4(Q)),Array.isArray(ge)){const fe=de.groups;for(let Re=0,Fe=fe.length;Re<Fe;Re++){const Te=fe[Re],Ve=ge[Te.materialIndex];Ve&&Ve.visible&&m.push(v,de,Ve,N,De.z,Te)}}else ge.visible&&m.push(v,de,ge,N,De.z,null)}}const te=v.children;for(let de=0,ge=te.length;de<ge;de++)Do(te[de],D,N,U)}function Jd(v,D,N,U){const I=v.opaque,te=v.transmissive,de=v.transparent;p.setupLightsView(N),Je===!0&&re.setGlobalState(x.clippingPlanes,N),U&&be.viewport(F.copy(U)),I.length>0&&na(I,D,N),te.length>0&&na(te,D,N),de.length>0&&na(de,D,N),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function eu(v,D,N,U){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[U.id]===void 0&&(p.state.transmissionRenderTarget[U.id]=new Yi(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?qr:Gn,minFilter:Ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));const te=p.state.transmissionRenderTarget[U.id],de=U.viewport||F;te.setSize(de.z*x.transmissionResolutionScale,de.w*x.transmissionResolutionScale);const ge=x.getRenderTarget(),fe=x.getActiveCubeFace(),Re=x.getActiveMipmapLevel();x.setRenderTarget(te),x.getClearColor(q),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),je&&xe.render(N);const Fe=x.toneMapping;x.toneMapping=_i;const Te=U.viewport;if(U.viewport!==void 0&&(U.viewport=void 0),p.setupLightsView(U),Je===!0&&re.setGlobalState(x.clippingPlanes,U),na(v,N,U),Ue.updateMultisampleRenderTarget(te),Ue.updateRenderTargetMipmap(te),Be.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let st=0,yt=D.length;st<yt;st++){const ut=D[st],ot=ut.object,Ae=ut.geometry,_t=ut.material,Ye=ut.group;if(_t.side===Cn&&ot.layers.test(U.layers)){const nn=_t.side;_t.side=Yt,_t.needsUpdate=!0,tu(ot,N,U,Ae,_t,Ye),_t.side=nn,_t.needsUpdate=!0,Ve=!0}}Ve===!0&&(Ue.updateMultisampleRenderTarget(te),Ue.updateRenderTargetMipmap(te))}x.setRenderTarget(ge,fe,Re),x.setClearColor(q,X),Te!==void 0&&(U.viewport=Te),x.toneMapping=Fe}function na(v,D,N){const U=D.isScene===!0?D.overrideMaterial:null;for(let I=0,te=v.length;I<te;I++){const de=v[I],ge=de.object,fe=de.geometry,Re=de.group;let Fe=de.material;Fe.allowOverride===!0&&U!==null&&(Fe=U),ge.layers.test(N.layers)&&tu(ge,D,N,fe,Fe,Re)}}function tu(v,D,N,U,I,te){v.onBeforeRender(x,D,N,U,I,te),v.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),I.onBeforeRender(x,D,N,U,v,te),I.transparent===!0&&I.side===Cn&&I.forceSinglePass===!1?(I.side=Yt,I.needsUpdate=!0,x.renderBufferDirect(N,D,U,I,v,te),I.side=vi,I.needsUpdate=!0,x.renderBufferDirect(N,D,U,I,v,te),I.side=Cn):x.renderBufferDirect(N,D,U,I,v,te),v.onAfterRender(x,D,N,U,I,te)}function ia(v,D,N){D.isScene!==!0&&(D=Me);const U=ve.get(v),I=p.state.lights,te=p.state.shadowsArray,de=I.state.version,ge=V.getParameters(v,I.state,te,D,N),fe=V.getProgramCacheKey(ge);let Re=U.programs;U.environment=v.isMeshStandardMaterial?D.environment:null,U.fog=D.fog,U.envMap=(v.isMeshStandardMaterial?wt:kt).get(v.envMap||U.environment),U.envMapRotation=U.environment!==null&&v.envMap===null?D.environmentRotation:v.envMapRotation,Re===void 0&&(v.addEventListener("dispose",Y),Re=new Map,U.programs=Re);let Fe=Re.get(fe);if(Fe!==void 0){if(U.currentProgram===Fe&&U.lightsStateVersion===de)return iu(v,ge),Fe}else ge.uniforms=V.getUniforms(v),v.onBeforeCompile(ge,x),Fe=V.acquireProgram(ge,fe),Re.set(fe,Fe),U.uniforms=ge.uniforms;const Te=U.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Te.clippingPlanes=re.uniform),iu(v,ge),U.needsLights=fm(v),U.lightsStateVersion=de,U.needsLights&&(Te.ambientLightColor.value=I.state.ambient,Te.lightProbe.value=I.state.probe,Te.directionalLights.value=I.state.directional,Te.directionalLightShadows.value=I.state.directionalShadow,Te.spotLights.value=I.state.spot,Te.spotLightShadows.value=I.state.spotShadow,Te.rectAreaLights.value=I.state.rectArea,Te.ltc_1.value=I.state.rectAreaLTC1,Te.ltc_2.value=I.state.rectAreaLTC2,Te.pointLights.value=I.state.point,Te.pointLightShadows.value=I.state.pointShadow,Te.hemisphereLights.value=I.state.hemi,Te.directionalShadowMap.value=I.state.directionalShadowMap,Te.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Te.spotShadowMap.value=I.state.spotShadowMap,Te.spotLightMatrix.value=I.state.spotLightMatrix,Te.spotLightMap.value=I.state.spotLightMap,Te.pointShadowMap.value=I.state.pointShadowMap,Te.pointShadowMatrix.value=I.state.pointShadowMatrix),U.currentProgram=Fe,U.uniformsList=null,Fe}function nu(v){if(v.uniformsList===null){const D=v.currentProgram.getUniforms();v.uniformsList=Wa.seqWithValue(D.seq,v.uniforms)}return v.uniformsList}function iu(v,D){const N=ve.get(v);N.outputColorSpace=D.outputColorSpace,N.batching=D.batching,N.batchingColor=D.batchingColor,N.instancing=D.instancing,N.instancingColor=D.instancingColor,N.instancingMorph=D.instancingMorph,N.skinning=D.skinning,N.morphTargets=D.morphTargets,N.morphNormals=D.morphNormals,N.morphColors=D.morphColors,N.morphTargetsCount=D.morphTargetsCount,N.numClippingPlanes=D.numClippingPlanes,N.numIntersection=D.numClipIntersection,N.vertexAlphas=D.vertexAlphas,N.vertexTangents=D.vertexTangents,N.toneMapping=D.toneMapping}function um(v,D,N,U,I){D.isScene!==!0&&(D=Me),Ue.resetTextureUnits();const te=D.fog,de=U.isMeshStandardMaterial?D.environment:null,ge=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Vs,fe=(U.isMeshStandardMaterial?wt:kt).get(U.envMap||de),Re=U.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Fe=!!N.attributes.tangent&&(!!U.normalMap||U.anisotropy>0),Te=!!N.morphAttributes.position,Ve=!!N.morphAttributes.normal,st=!!N.morphAttributes.color;let yt=_i;U.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(yt=x.toneMapping);const ut=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ot=ut!==void 0?ut.length:0,Ae=ve.get(U),_t=p.state.lights;if(Je===!0&&(K===!0||v!==S)){const Wt=v===S&&U.id===y;re.setState(U,v,Wt)}let Ye=!1;U.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==_t.state.version||Ae.outputColorSpace!==ge||I.isBatchedMesh&&Ae.batching===!1||!I.isBatchedMesh&&Ae.batching===!0||I.isBatchedMesh&&Ae.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Ae.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Ae.instancing===!1||!I.isInstancedMesh&&Ae.instancing===!0||I.isSkinnedMesh&&Ae.skinning===!1||!I.isSkinnedMesh&&Ae.skinning===!0||I.isInstancedMesh&&Ae.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Ae.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Ae.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Ae.instancingMorph===!1&&I.morphTexture!==null||Ae.envMap!==fe||U.fog===!0&&Ae.fog!==te||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==re.numPlanes||Ae.numIntersection!==re.numIntersection)||Ae.vertexAlphas!==Re||Ae.vertexTangents!==Fe||Ae.morphTargets!==Te||Ae.morphNormals!==Ve||Ae.morphColors!==st||Ae.toneMapping!==yt||Ae.morphTargetsCount!==ot)&&(Ye=!0):(Ye=!0,Ae.__version=U.version);let nn=Ae.currentProgram;Ye===!0&&(nn=ia(U,D,I));let as=!1,sn=!1,sr=!1;const bt=nn.getUniforms(),hn=Ae.uniforms;if(be.useProgram(nn.program)&&(as=!0,sn=!0,sr=!0),U.id!==y&&(y=U.id,sn=!0),as||S!==v){be.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),bt.setValue(C,"projectionMatrix",v.projectionMatrix),bt.setValue(C,"viewMatrix",v.matrixWorldInverse);const Qt=bt.map.cameraPosition;Qt!==void 0&&Qt.setValue(C,me.setFromMatrixPosition(v.matrixWorld)),Le.logarithmicDepthBuffer&&bt.setValue(C,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&bt.setValue(C,"isOrthographic",v.isOrthographicCamera===!0),S!==v&&(S=v,sn=!0,sr=!0)}if(I.isSkinnedMesh){bt.setOptional(C,I,"bindMatrix"),bt.setOptional(C,I,"bindMatrixInverse");const Wt=I.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),bt.setValue(C,"boneTexture",Wt.boneTexture,Ue))}I.isBatchedMesh&&(bt.setOptional(C,I,"batchingTexture"),bt.setValue(C,"batchingTexture",I._matricesTexture,Ue),bt.setOptional(C,I,"batchingIdTexture"),bt.setValue(C,"batchingIdTexture",I._indirectTexture,Ue),bt.setOptional(C,I,"batchingColorTexture"),I._colorsTexture!==null&&bt.setValue(C,"batchingColorTexture",I._colorsTexture,Ue));const fn=N.morphAttributes;if((fn.position!==void 0||fn.normal!==void 0||fn.color!==void 0)&&ne.update(I,N,nn),(sn||Ae.receiveShadow!==I.receiveShadow)&&(Ae.receiveShadow=I.receiveShadow,bt.setValue(C,"receiveShadow",I.receiveShadow)),U.isMeshGouraudMaterial&&U.envMap!==null&&(hn.envMap.value=fe,hn.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),U.isMeshStandardMaterial&&U.envMap===null&&D.environment!==null&&(hn.envMapIntensity.value=D.environmentIntensity),sn&&(bt.setValue(C,"toneMappingExposure",x.toneMappingExposure),Ae.needsLights&&hm(hn,sr),te&&U.fog===!0&&Z.refreshFogUniforms(hn,te),Z.refreshMaterialUniforms(hn,U,G,se,p.state.transmissionRenderTarget[v.id]),Wa.upload(C,nu(Ae),hn,Ue)),U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(Wa.upload(C,nu(Ae),hn,Ue),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&bt.setValue(C,"center",I.center),bt.setValue(C,"modelViewMatrix",I.modelViewMatrix),bt.setValue(C,"normalMatrix",I.normalMatrix),bt.setValue(C,"modelMatrix",I.matrixWorld),U.isShaderMaterial||U.isRawShaderMaterial){const Wt=U.uniformsGroups;for(let Qt=0,Io=Wt.length;Qt<Io;Qt++){const Ai=Wt[Qt];Ne.update(Ai,nn),Ne.bind(Ai,nn)}}return nn}function hm(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D}function fm(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(v,D,N){const U=ve.get(v);U.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,U.__autoAllocateDepthBuffer===!1&&(U.__useRenderToTexture=!1),ve.get(v.texture).__webglTexture=D,ve.get(v.depthTexture).__webglTexture=U.__autoAllocateDepthBuffer?void 0:N,U.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,D){const N=ve.get(v);N.__webglFramebuffer=D,N.__useDefaultFramebuffer=D===void 0};const pm=C.createFramebuffer();this.setRenderTarget=function(v,D=0,N=0){O=v,k=D,R=N;let U=!0,I=null,te=!1,de=!1;if(v){const fe=ve.get(v);if(fe.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(C.FRAMEBUFFER,null),U=!1;else if(fe.__webglFramebuffer===void 0)Ue.setupRenderTarget(v);else if(fe.__hasExternalTextures)Ue.rebindTextures(v,ve.get(v.texture).__webglTexture,ve.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Te=v.depthTexture;if(fe.__boundDepthTexture!==Te){if(Te!==null&&ve.has(Te)&&(v.width!==Te.image.width||v.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ue.setupDepthRenderbuffer(v)}}const Re=v.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(de=!0);const Fe=ve.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Fe[D])?I=Fe[D][N]:I=Fe[D],te=!0):v.samples>0&&Ue.useMultisampledRTT(v)===!1?I=ve.get(v).__webglMultisampledFramebuffer:Array.isArray(Fe)?I=Fe[N]:I=Fe,F.copy(v.viewport),z.copy(v.scissor),W=v.scissorTest}else F.copy(Ee).multiplyScalar(G).floor(),z.copy(We).multiplyScalar(G).floor(),W=ct;if(N!==0&&(I=pm),be.bindFramebuffer(C.FRAMEBUFFER,I)&&U&&be.drawBuffers(v,I),be.viewport(F),be.scissor(z),be.setScissorTest(W),te){const fe=ve.get(v.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+D,fe.__webglTexture,N)}else if(de){const fe=D;for(let Re=0;Re<v.textures.length;Re++){const Fe=ve.get(v.textures[Re]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Re,Fe.__webglTexture,N,fe)}}else if(v!==null&&N!==0){const fe=ve.get(v.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,fe.__webglTexture,N)}y=-1},this.readRenderTargetPixels=function(v,D,N,U,I,te,de,ge=0){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=ve.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&de!==void 0&&(fe=fe[de]),fe){be.bindFramebuffer(C.FRAMEBUFFER,fe);try{const Re=v.textures[ge],Fe=Re.format,Te=Re.type;if(!Le.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Le.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=v.width-U&&N>=0&&N<=v.height-I&&(v.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ge),C.readPixels(D,N,U,I,we.convert(Fe),we.convert(Te),te))}finally{const Re=O!==null?ve.get(O).__webglFramebuffer:null;be.bindFramebuffer(C.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(v,D,N,U,I,te,de,ge=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=ve.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&de!==void 0&&(fe=fe[de]),fe)if(D>=0&&D<=v.width-U&&N>=0&&N<=v.height-I){be.bindFramebuffer(C.FRAMEBUFFER,fe);const Re=v.textures[ge],Fe=Re.format,Te=Re.type;if(!Le.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Le.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ve=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Ve),C.bufferData(C.PIXEL_PACK_BUFFER,te.byteLength,C.STREAM_READ),v.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ge),C.readPixels(D,N,U,I,we.convert(Fe),we.convert(Te),0);const st=O!==null?ve.get(O).__webglFramebuffer:null;be.bindFramebuffer(C.FRAMEBUFFER,st);const yt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await ag(C,yt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Ve),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,te),C.deleteBuffer(Ve),C.deleteSync(yt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,D=null,N=0){const U=Math.pow(2,-N),I=Math.floor(v.image.width*U),te=Math.floor(v.image.height*U),de=D!==null?D.x:0,ge=D!==null?D.y:0;Ue.setTexture2D(v,0),C.copyTexSubImage2D(C.TEXTURE_2D,N,0,0,de,ge,I,te),be.unbindTexture()};const mm=C.createFramebuffer(),gm=C.createFramebuffer();this.copyTextureToTexture=function(v,D,N=null,U=null,I=0,te=null){te===null&&(I!==0?(kr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=I,I=0):te=0);let de,ge,fe,Re,Fe,Te,Ve,st,yt;const ut=v.isCompressedTexture?v.mipmaps[te]:v.image;if(N!==null)de=N.max.x-N.min.x,ge=N.max.y-N.min.y,fe=N.isBox3?N.max.z-N.min.z:1,Re=N.min.x,Fe=N.min.y,Te=N.isBox3?N.min.z:0;else{const fn=Math.pow(2,-I);de=Math.floor(ut.width*fn),ge=Math.floor(ut.height*fn),v.isDataArrayTexture?fe=ut.depth:v.isData3DTexture?fe=Math.floor(ut.depth*fn):fe=1,Re=0,Fe=0,Te=0}U!==null?(Ve=U.x,st=U.y,yt=U.z):(Ve=0,st=0,yt=0);const ot=we.convert(D.format),Ae=we.convert(D.type);let _t;D.isData3DTexture?(Ue.setTexture3D(D,0),_t=C.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Ue.setTexture2DArray(D,0),_t=C.TEXTURE_2D_ARRAY):(Ue.setTexture2D(D,0),_t=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,D.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,D.unpackAlignment);const Ye=C.getParameter(C.UNPACK_ROW_LENGTH),nn=C.getParameter(C.UNPACK_IMAGE_HEIGHT),as=C.getParameter(C.UNPACK_SKIP_PIXELS),sn=C.getParameter(C.UNPACK_SKIP_ROWS),sr=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ut.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ut.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Re),C.pixelStorei(C.UNPACK_SKIP_ROWS,Fe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Te);const bt=v.isDataArrayTexture||v.isData3DTexture,hn=D.isDataArrayTexture||D.isData3DTexture;if(v.isDepthTexture){const fn=ve.get(v),Wt=ve.get(D),Qt=ve.get(fn.__renderTarget),Io=ve.get(Wt.__renderTarget);be.bindFramebuffer(C.READ_FRAMEBUFFER,Qt.__webglFramebuffer),be.bindFramebuffer(C.DRAW_FRAMEBUFFER,Io.__webglFramebuffer);for(let Ai=0;Ai<fe;Ai++)bt&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ve.get(v).__webglTexture,I,Te+Ai),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ve.get(D).__webglTexture,te,yt+Ai)),C.blitFramebuffer(Re,Fe,de,ge,Ve,st,de,ge,C.DEPTH_BUFFER_BIT,C.NEAREST);be.bindFramebuffer(C.READ_FRAMEBUFFER,null),be.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(I!==0||v.isRenderTargetTexture||ve.has(v)){const fn=ve.get(v),Wt=ve.get(D);be.bindFramebuffer(C.READ_FRAMEBUFFER,mm),be.bindFramebuffer(C.DRAW_FRAMEBUFFER,gm);for(let Qt=0;Qt<fe;Qt++)bt?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,fn.__webglTexture,I,Te+Qt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,fn.__webglTexture,I),hn?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Wt.__webglTexture,te,yt+Qt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Wt.__webglTexture,te),I!==0?C.blitFramebuffer(Re,Fe,de,ge,Ve,st,de,ge,C.COLOR_BUFFER_BIT,C.NEAREST):hn?C.copyTexSubImage3D(_t,te,Ve,st,yt+Qt,Re,Fe,de,ge):C.copyTexSubImage2D(_t,te,Ve,st,Re,Fe,de,ge);be.bindFramebuffer(C.READ_FRAMEBUFFER,null),be.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else hn?v.isDataTexture||v.isData3DTexture?C.texSubImage3D(_t,te,Ve,st,yt,de,ge,fe,ot,Ae,ut.data):D.isCompressedArrayTexture?C.compressedTexSubImage3D(_t,te,Ve,st,yt,de,ge,fe,ot,ut.data):C.texSubImage3D(_t,te,Ve,st,yt,de,ge,fe,ot,Ae,ut):v.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,te,Ve,st,de,ge,ot,Ae,ut.data):v.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,te,Ve,st,ut.width,ut.height,ot,ut.data):C.texSubImage2D(C.TEXTURE_2D,te,Ve,st,de,ge,ot,Ae,ut);C.pixelStorei(C.UNPACK_ROW_LENGTH,Ye),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,nn),C.pixelStorei(C.UNPACK_SKIP_PIXELS,as),C.pixelStorei(C.UNPACK_SKIP_ROWS,sn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,sr),te===0&&D.generateMipmaps&&C.generateMipmap(_t),be.unbindTexture()},this.initRenderTarget=function(v){ve.get(v).__webglFramebuffer===void 0&&Ue.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Ue.setTextureCube(v,0):v.isData3DTexture?Ue.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Ue.setTexture2DArray(v,0):Ue.setTexture2D(v,0),be.unbindTexture()},this.resetState=function(){k=0,R=0,O=null,be.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}const Dt=1,wc=.45,Ff=190,Df=.38,on={water:8308963,waterDeep:6271188,sand:15918022,sandDark:14995624,grass:9425290,grassDark:7191922,gray:12104360,soil:12159582,soilDark:10581582,stone:13617339},js={hub:{floor:"grass",accent:16767334,bloom:"#ffd966",emoji:"🏝️"},tide:{floor:"sand",accent:9425128,bloom:"#8fd0e8",emoji:"🌊"},garden:{floor:"grass",accent:8179580,bloom:"#ffd966",emoji:"🌱"},stump:{floor:"sand",accent:14258287,bloom:"#ffb38a",emoji:"🥥"},vines:{floor:"grass",accent:13215487,bloom:"#c9a6ff",emoji:"🍇"}},Nt={PLAYER:"P",ALTAR:"A",STONE:"s",POT:"p",CRAB:"c",DOOR:"D",SOIL:"o",BASKET:"B",STUMP:"m",VINE:"V",HELPER:"M",GEM_TREE:"T",SHOP:"O",NEST:"N"},Xi=new Set([".",","]),Sd=new Set([Nt.ALTAR,Nt.STONE,Nt.PLAYER,Nt.POT,Nt.BASKET,Nt.STUMP,Nt.HELPER,Nt.VINE,Nt.SOIL,Nt.GEM_TREE,Nt.SHOP,Nt.NEST]),If=new Set([...Sd,Nt.CRAB,Nt.DOOR]),Cy=[.12,.35,.6,.88];function dh(i){let e=0;for(const t of Cy)(i??0)>=t&&e++;return e}const Lt={problemsPerChamber:3,bananasPerCorrect:[3,5],bananasChestBase:10,comboBonus:2,crabSteal:3,eggPerCorrect:1,eggPerBerry:1,eggGoal:30,echoDoorChance:.3,echoProblems:2,hatRandomChestChance:.05,streakFreezePrice:40,petBananaBonus:.1,businessOrdersPerDay:4,businessBananaReward:[2,4],stageBananaReward:[2,4],bakeMs:4500,freshWindowMs:5e3,freshTipCents:45},ky={common:60,rare:25,epic:12,legendary:3},Of={common:"⭐",rare:"🌟",epic:"💜",legendary:"🌈"},Sc=typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints||0)>0),uh={hub:1.8,chamber:1.5},Py=(()=>{if(typeof window>"u")return"high";const i=window.devicePixelRatio||1,e=Math.min(window.screen?.width||1024,window.screen?.height||768)<480;return Sc&&(e||i>2.5)?"low":"high"})(),Is=["tide","garden","stump","vines"],Ly="business",Zi={tide:["counting","number_bonds","add_20","sub_20","missing_addend","add_100","sub_100","big_numbers"],garden:["tables_a","tables_b","tables_c","tables_mix","mult_2digit"],stump:["div_facts","share","div_remainder","missing_factor"],vines:["frac_magnitude","frac_compare","frac_equiv","frac_of_n"],business:["dec_compare","dec_addsub","dec_muldiv","frac_dec_pct","percent_of","percent_adv","scale"]},Fy=Object.keys(Zi),cn={};for(const i of Fy)Zi[i].forEach((e,t)=>{cn[e]={id:e,world:i,order:t,prereqs:t===0?[]:[Zi[i][t-1]],nameKey:`skill.${e}`}});const Qa=600,Bf=850,Dy=.8,Mc=10,Iy=10,hh=200,Oy=108,Ec=8,By=864e5,ml=Qa,Ny=2,zy=60;function Md(){const i={};for(const e of Object.keys(cn))i[e]={r:Qa,n:0,hist:[]};return{skills:i,facts:{},log:[]}}const Uy=(i,e,t)=>Math.min(t,Math.max(e,i)),nr=(i,e)=>e?nr(e,i%e):i;function Nf(i,e){if(i<=ml)return i;const t=e-Ny;return t<=0?i:ml+(i-ml)*2**(-t/zy)}function Gy(i,e){return 1/(1+10**((e-i)/400))}function Hy(i){return i<520?0:i<760?1:2}function zf(i){return i.length?i.reduce((e,t)=>e+t,0)/i.length:0}function Pr(i,e=i.r){return e>=Bf&&i.n>=Mc&&i.hist.length>=Mc&&zf(i.hist)>=Dy}function tn(i){if(!Number.isInteger(i)||i<10)return null;const e=Number(String(i).split("").reverse().join(""));return e===i||e<1?null:e}function Uf(i){const e=[];for(let t=1;t<i;t++)nr(t,i)===1&&e.push(t);return e}function Va(i,e,t){if(!e)return i;const n=Math.floor(e/t),s=e%t,r=i+n;if(!s)return r;const a=nr(s,t),o=`${s/a}/${t/a}`;return r?`${r} ${o}`:o}function xr(i,e){const t=Math.floor(i/e),n=i%e;return Va(t,n,e)}function Ht(i,e,t,{min:n=1,count:s=6}={}){const r=e===0?0:n,a=[{value:e,tag:"correct"}],o=new Set([e]),l=(d,u)=>{a.length>=s||d==null||!Number.isFinite(d)||(d=Math.round(d),!(d<r||o.has(d))&&(o.add(d),a.push({value:d,tag:u})))};for(const d of t)l(d.value,d.tag);for(const d of[1,-1,2,-2,3,-3])l(e+d,"near_miss");let c=4;for(;a.length<s;)l(e+(i.chance(.5)?c:-c),"random"),l(e+c,"random"),c++;return i.shuffle(a)}function Wy(i,e,t,n){const s=c=>{const[d,u]=String(c).split("/").map(Number);return d/u},r=[{value:e,tag:"correct"}],a=[s(e)],o=(c,d)=>{if(r.length>=4)return;const u=s(c);!Number.isFinite(u)||u<=0||a.some(h=>Math.abs(h-u)<1e-9)||(a.push(u),r.push({value:c,tag:d}))};for(const c of t)o(c.value,c.tag);let l=0;for(;r.length<4&&l<50;)o(n(l++),"random");return i.shuffle(r)}const Qi=i=>Math.round(i*1e3)/1e3;function xo(i,e,t,n,{count:s=5}={}){const r=[{value:e,tag:"correct"}],a=[e],o=(c,d)=>{if(r.length>=s||c==null||!Number.isFinite(c)||c<0)return;const u=Qi(c);a.some(h=>Math.abs(h-u)<1e-9)||(a.push(u),r.push({value:u,tag:d}))};for(const c of t)o(c.value,c.tag);let l=0;for(;r.length<s&&l<80;)o(n(l++),"random");return i.shuffle(r)}function Vy(i,{total:e,baskets:t,quotient:n,remainder:s}){const r=xr(e,t),a=[{value:r,tag:"correct"}],o=new Set([String(r)]),l=(c,d)=>{if(a.length>=6||c==null||typeof c=="number"&&(!Number.isFinite(c)||c<0))return;const u=String(c);!u||o.has(u)||(o.add(u),a.push({value:c,tag:d}))};l(n,"remainder_ignored"),l(n+1,"near_miss"),l(Va(n,s+1,t),"near_miss"),l(Va(n,Math.max(1,s-1),t),"near_miss"),l(Va(n,s,t+1),"random");for(const c of[1,-1,2,-2,3,-3])l(xr(e+c,t),"random");return i.shuffle(a)}function ht(i,e){let t=i[0];for(const n of i)Math.abs(n.d-e)<Math.abs(t.d-e)&&(t=n);return t}const tt={};tt.add_20=(i,e)=>{const t=ht([{d:420,gen:()=>{const a=e.int(1,9);return[a,e.int(1,Math.max(1,10-a))]}},{d:540,gen:()=>{const a=e.int(3,9);return[a,e.int(Math.max(2,11-a),Math.min(9,18-a))]}},{d:650,gen:()=>{const a=e.int(11,17);return[a,e.int(2,Math.min(9,20-a))]}}],i),[n,s]=t.gen(),r=n+s;return{kind:"fetch",equation:`${n} + ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Ht(e,r,[{value:Math.abs(n-s),tag:"addsub_confuse"},{value:tn(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:{key:"ex.near_miss",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s}}};tt.sub_20=(i,e)=>{const t=ht([{d:460,gen:()=>{const a=e.int(3,10);return[a,e.int(1,a-1)]}},{d:580,gen:()=>{const a=e.int(12,19);return[a,e.int(1,a%10)]}},{d:690,gen:()=>{const a=e.int(11,18);return[a,e.int(a%10+1,9)]}}],i),[n,s]=t.gen(),r=n-s;return{kind:"fetch",equation:`${n} − ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Ht(e,r,[{value:n+s,tag:"addsub_confuse"},{value:tn(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:{key:"ex.addsub_confuse",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s}}};tt.missing_addend=(i,e)=>{const t=ht([{d:500,gen:()=>{const a=e.int(5,10);return[e.int(1,a-1),a]}},{d:620,gen:()=>{const a=e.int(11,20);return[e.int(2,a-2),a]}},{d:780,gen:()=>{const a=e.int(6,18)*5;return[e.int(1,a/5-1)*5,a]}}],i),[n,s]=t.gen(),r=s-n;return{kind:"fetch",equation:`${n} + ? = ${s}`,prompt:{key:"q.missing",vars:{a:n,c:s}},answer:r,choices:Ht(e,r,[{value:n+s,tag:"addsub_confuse"},{value:tn(r),tag:"reversed"}]),model:{kind:"none",params:{}},explain:{key:"ex.addsub_confuse",vars:{a:n,c:s,answer:r}},difficulty:t.d,meta:{a:n,c:s}}};tt.add_100=(i,e)=>{const t=ht([{d:560,carry:!1,gen:()=>{const o=e.int(1,7),l=e.int(1,8-o),c=e.int(1,8),d=e.int(0,9-c);return[o*10+c,l*10+d]}},{d:760,carry:!0,gen:()=>{const o=e.int(1,6),l=e.int(1,7-o),c=e.int(2,9),d=e.int(Math.max(2,11-c),9);return[o*10+c,l*10+d]}},{d:900,carry:!0,gen:()=>{const o=e.int(3,5),l=e.int(3,Math.min(5,8-o)),c=e.int(5,9),d=e.int(Math.max(5,11-c),9);return[o*10+c,l*10+d]}}],i),[n,s]=t.gen(),r=n+s,a=(n%10+s%10)%10+10*(Math.floor(n/10)+Math.floor(s/10));return{kind:"fetch",equation:`${n} + ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Ht(e,r,[{value:a,tag:"no_carry"},{value:tn(r),tag:"reversed"}]),model:{kind:"none",params:{}},explain:t.carry?{key:"ex.no_carry",vars:{a:n,b:s,answer:r}}:{key:"ex.near_miss",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s,carry:t.carry}}};tt.sub_100=(i,e)=>{const t=ht([{d:620,borrow:!1,gen:()=>{const o=e.int(2,9),l=e.int(1,9);return[o*10+l,e.int(1,o-1)*10+e.int(0,l)]}},{d:840,borrow:!0,gen:()=>{const o=e.int(2,9),l=e.int(0,8);return[o*10+l,e.int(1,o-1)*10+e.int(l+1,9)]}},{d:980,borrow:!0,gen:()=>{const o=e.int(6,9),l=e.int(0,7);return[o*10+l,e.int(2,o-1)*10+e.int(l+1,9)]}}],i),[n,s]=t.gen(),r=n-s,a=(Math.floor(n/10)-Math.floor(s/10))*10+Math.abs(n%10-s%10);return{kind:"fetch",equation:`${n} − ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Ht(e,r,[{value:a,tag:"borrow"},{value:tn(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:t.borrow?{key:"ex.borrow",vars:{a:n,b:s,answer:r}}:{key:"ex.near_miss",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s,borrow:t.borrow}}};function $y(i,e,t,n,s,r){const a=n*s,o={a:n,b:s};if(e==="array"){const l=t===0||i.chance(.5)?"both":i.chance(.6)?"rows":"total";return{kind:"array",equation:l==="both"?`${n} × ${s} = ?`:l==="rows"?`${n} × ? = ${a}`:`? × ? = ${a}`,prompt:{key:`q.array_${l}`,vars:{rows:n,cols:s,total:a}},answer:a,choices:null,model:{kind:"array",params:{rows:n,cols:s,total:a,given:l}},explain:{key:"ex.off_by_table",vars:{a:n,b:s,answer:a}},difficulty:r+(l==="both"?0:30),meta:o}}return{kind:"fetch",equation:`${n} × ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:a,choices:Ht(i,a,[{value:(n+(i.chance(.5)?1:-1))*s,tag:"off_by_table"},{value:n*(s+(i.chance(.5)?1:-1)),tag:"off_by_table"},{value:n+s,tag:"addsub_confuse"},{value:tn(a),tag:"reversed"}]),model:{kind:"array",params:{rows:n,cols:s,total:a,given:"both"}},explain:{key:"ex.off_by_table",vars:{a:n,b:s,answer:a}},difficulty:r,meta:o}}function wo(i){return(e,t,n,s)=>{const r=ht(i,e),[a,o]=r.gen(t);return $y(t,n,s,a,o,r.d)}}tt.tables_a=wo([{d:420,gen:i=>[i.pick([2,5,10]),i.int(1,5)]},{d:520,gen:i=>[i.pick([2,5,10]),i.int(2,10)]},{d:640,gen:i=>[i.pick([2,5,10]),i.int(6,10)]}]);tt.tables_b=wo([{d:560,gen:i=>[i.pick([3,4,6]),i.int(2,5)]},{d:660,gen:i=>[i.pick([3,4,6]),i.int(2,10)]}]);tt.tables_c=wo([{d:680,gen:i=>[i.pick([7,8,9]),i.int(2,5)]},{d:780,gen:i=>[i.pick([7,8,9]),i.int(2,10)]},{d:860,gen:i=>[i.pick([7,8,9]),i.int(6,9)]}]);tt.tables_mix=wo([{d:600,gen:i=>[i.int(2,6),i.int(2,6)]},{d:700,gen:i=>[i.int(2,10),i.int(2,10)]},{d:800,gen:i=>[i.int(6,9),i.int(6,9)]}]);tt.mult_2digit=(i,e,t,n)=>{const s=ht([{d:780,gen:()=>[e.int(2,4),e.int(12,29)]},{d:940,gen:()=>[e.int(3,7),e.int(13,49)]},{d:1100,gen:()=>[e.int(4,9),e.int(25,99)]}],i),[r,a]=s.gen(),o=r*a;if(t==="array")return{kind:"array",equation:`${r} × ${a} = ?`,prompt:{key:"q.array_both",vars:{rows:r,cols:a,total:o}},answer:o,choices:null,model:{kind:"array",params:{rows:r,cols:a,total:o,given:"both"}},explain:{key:"ex.no_carry",vars:{a:r,b:a,answer:o}},difficulty:s.d,meta:{a:r,b:a}};const l=r*Math.floor(a/10)*10+r*(a%10)%10;return{kind:"fetch",equation:`${r} × ${a} = ?`,prompt:{key:"q.fetch",vars:{a:r,b:a}},answer:o,choices:Ht(e,o,[{value:l,tag:"no_carry"},{value:(r+(e.chance(.5)?1:-1))*a,tag:"off_by_table"},{value:tn(o),tag:"reversed"}]),model:{kind:"array",params:{rows:r,cols:a,total:o,given:"both"}},explain:{key:"ex.no_carry",vars:{a:r,b:a,answer:o}},difficulty:s.d,meta:{a:r,b:a}}};function So(i,e,{total:t,baskets:n,quotient:s,remainder:r,d:a,meta:o,explain:l}){const c={kind:"baskets",params:{total:t,baskets:n,quotient:s,remainder:r}};if(e==="share")return{kind:"share",equation:`${t} ÷ ${n}`,prompt:{key:r>0?"q.share_remainder":"q.share",vars:{total:t,baskets:n,remainder:r}},answer:s,choices:null,model:c,explain:l,difficulty:a,meta:o};const d=r>0?[{value:s+1,tag:"remainder_ignored"},{value:r,tag:"random"}]:[{value:s+(i.chance(.5)?1:-1),tag:"off_by_table"},{value:t-n,tag:"addsub_confuse"}];return{kind:"fetch",equation:`${t} ÷ ${n} = ?`,prompt:{key:r>0?"q.share_fetch":"q.fetch",vars:{total:t,baskets:n}},answer:r>0?xr(t,n):s,choices:r>0?Vy(i,{total:t,baskets:n,quotient:s,remainder:r}):Ht(i,s,d),model:c,explain:r>0?{...l,vars:{...l.vars||{},answer:xr(t,n)}}:l,difficulty:a,meta:r>0?{...o,answerLabel:xr(t,n)}:o}}tt.div_facts=(i,e,t)=>{const n=ht([{d:480,gen:()=>[e.pick([2,5,10]),e.int(2,5)]},{d:600,gen:()=>[e.pick([2,3,4,5,6,10]),e.int(2,10)]},{d:720,gen:()=>[e.pick([6,7,8,9]),e.int(3,10)]}],i),[s,r]=n.gen(),a=s*r;return So(e,t,{total:a,baskets:s,quotient:r,remainder:0,d:n.d,meta:{a:s,b:r,c:a},explain:{key:"ex.div_fact",vars:{a:s,b:r,c:a,answer:r}}})};tt.share=(i,e,t)=>{const n=ht([{d:560,gen:()=>[e.int(2,4),e.int(2,5)]},{d:700,gen:()=>[e.int(3,8),e.int(3,9)]},{d:860,gen:()=>[e.int(4,9),e.int(6,12)]}],i),[s,r]=n.gen(),a=s*r;return So(e,t,{total:a,baskets:s,quotient:r,remainder:0,d:n.d,meta:{baskets:s,quotient:r,total:a,remainder:0},explain:{key:"ex.div_fact",vars:{a:s,b:r,c:a,answer:r}}})};tt.div_remainder=(i,e,t)=>{const n=ht([{d:680,gen:()=>[e.int(2,5),e.int(2,5)]},{d:820,gen:()=>[e.int(3,8),e.int(3,9)]},{d:960,gen:()=>[e.int(6,9),e.int(6,12)]}],i),[s,r]=n.gen(),a=e.int(1,s-1),o=s*r+a;return So(e,t,{total:o,baskets:s,quotient:r,remainder:a,d:n.d,meta:{baskets:s,quotient:r,total:o,remainder:a},explain:{key:"ex.remainder_ignored",vars:{total:o,baskets:s,quotient:r,remainder:a,answer:r}}})};tt.missing_factor=(i,e,t)=>{const n=ht([{d:640,gen:()=>[e.int(2,5),e.int(2,5)]},{d:780,gen:()=>[e.int(3,9),e.int(3,9)]},{d:900,gen:()=>[e.int(6,12),e.int(6,9)]}],i),[s,r]=n.gen(),a=s*r;return t==="share"?So(e,"share",{total:a,baskets:r,quotient:s,remainder:0,d:n.d,meta:{a:s,b:r,c:a},explain:{key:"ex.missing_factor",vars:{a:s,b:r,c:a,answer:s}}}):{kind:"fetch",equation:`? × ${r} = ${a}`,prompt:{key:"q.missing",vars:{b:r,c:a}},answer:s,choices:Ht(e,s,[{value:s+(e.chance(.5)?1:-1),tag:"off_by_table"},{value:a-r,tag:"addsub_confuse"},{value:tn(s),tag:"reversed"}]),model:{kind:"array",params:{rows:s,cols:r,total:a,given:"total"}},explain:{key:"ex.missing_factor",vars:{a:s,b:r,c:a,answer:s}},difficulty:n.d,meta:{a:s,b:r,c:a}}};tt.frac_magnitude=(i,e,t,n)=>{const s=ht([{d:520,denoms:[2,4],hi:1},{d:700,denoms:[3,6,8],hi:1},{d:880,denoms:[5,10,12],hi:1},{d:1040,denoms:[3,4,5,6,8],hi:2}],i),r=e.pick(s.denoms),a=s.hi;let o=a===1?e.int(1,r-1):e.int(1,2*r-1);o%r===0&&(o+=1);const l=[.05,.03,.02][n],c=r*a;return{kind:"numberline",equation:`${o}/${r}`,prompt:{key:"q.numberline",vars:{n:o,d:r}},answer:o/r,accept:{tol:l},choices:null,model:{kind:"numberline",params:{n:o,d:r,lo:0,hi:a,ticks:c}},explain:{key:"ex.magnitude",vars:{n:o,d:r}},difficulty:s.d,meta:{n:o,d:r,lo:0,hi:a}}};tt.frac_compare=(i,e)=>{const t=ht([{d:620,denoms:[2,3,4]},{d:760,denoms:[2,3,4,6,8]},{d:920,denoms:[3,5,8,10,12]}],i),n=new Set,s=[],r=(f,g)=>{const _=nr(f,g),m=`${f/_}/${g/_}`;n.has(m)||(n.add(m),s.push({n:f,d:g,v:f/g}))};let a=0;for(;s.length<4&&a++<200;){const f=e.pick(t.denoms);r(e.int(1,f-1),f)}for(const[f,g]of[[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[4,5],[5,6]]){if(s.length>=4)break;r(f,g)}s.sort((f,g)=>g.v-f.v);const o=s[0],l=s.slice(1),c=l.reduce((f,g)=>g.n+g.d>f.n+f.d?g:f,l[0]),d=l.filter(f=>f!==c),u=d.reduce((f,g)=>o.v-g.v<o.v-f.v?g:f,d[0]),h=e.shuffle([{value:`${o.n}/${o.d}`,tag:"correct"},...l.map(f=>({value:`${f.n}/${f.d}`,tag:f===c?"whole_number_bias":f===u?"near_miss":"random"}))]);return{kind:"fetch",equation:`${h.map(f=>f.value).join(" · ")} → ?`,prompt:{key:"q.compare",vars:{count:4}},answer:`${o.n}/${o.d}`,choices:h,model:{kind:"numberline",params:{n:o.n,d:o.d,lo:0,hi:1,ticks:o.d+1}},explain:{key:"ex.whole_number_bias",vars:{n:c.n,d:c.d,answer:`${o.n}/${o.d}`}},difficulty:t.d,meta:{fractions:s.map(f=>`${f.n}/${f.d}`)}}};tt.frac_equiv=(i,e)=>{const t=ht([{d:660,denoms:[2,3,4],kMax:3},{d:800,denoms:[2,3,4,5,6],kMax:4},{d:940,denoms:[3,4,5,6,8],kMax:6}],i),n=e.pick(t.denoms),s=e.pick(Uf(n)),r=e.int(2,t.kMax),a=`${s*r}/${n*r}`,o=Wy(e,a,[{value:`${s+r}/${n+r}`,tag:"add_tops_bottoms"},{value:`${s*r+1}/${n*r}`,tag:"near_miss"},{value:`${(s+1)*r}/${(n+1)*r}`,tag:"whole_number_bias"},{value:`${s*r}/${n*(r+1)}`,tag:"near_miss"}],l=>`${s*r+2+l}/${n*r}`);return{kind:"fetch",equation:`${s}/${n} = ?`,prompt:{key:"q.equiv",vars:{n:s,d:n}},answer:a,choices:o,model:{kind:"numberline",params:{n:s,d:n,lo:0,hi:1,ticks:n*r+1}},explain:{key:"ex.equiv",vars:{n:s,d:n,answer:a}},difficulty:t.d,meta:{n:s,d:n,k:r}}};tt.frac_of_n=(i,e)=>{const t=ht([{d:720,denoms:[2,4],mMin:2,mMax:6},{d:880,denoms:[3,4,6,8],mMin:3,mMax:8},{d:1040,denoms:[5,8,10,12],mMin:4,mMax:10}],i),n=e.pick(t.denoms),s=e.pick(Uf(n)),r=n*e.int(t.mMin,t.mMax),a=r/n,o=a*s;return{kind:"fetch",equation:`${s}/${n} × ${r} = ?`,prompt:{key:"q.frac_of",vars:{n:s,d:n,whole:r}},answer:o,choices:Ht(e,o,[{value:a,tag:"whole_number_bias"},{value:o+a,tag:"near_miss"},{value:o-a,tag:"near_miss"},{value:r-s,tag:"random"}]),model:{kind:"baskets",params:{total:r,baskets:n,quotient:a,remainder:0}},explain:{key:"ex.generic",vars:{n:s,d:n,whole:r,answer:o}},difficulty:t.d,meta:{n:s,d:n,whole:r}}};tt.counting=(i,e)=>{const t=ht([{d:400,gen:()=>e.int(1,8)},{d:520,gen:()=>e.int(9,18)},{d:640,gen:()=>e.int(20,96)}],i),n=t.gen(),s=n+2;return{kind:"fetch",equation:`${n}, ${n+1}, ⬚`,prompt:{key:"q.count",vars:{a:n}},answer:s,choices:Ht(e,s,[{value:n+1,tag:"near_miss"},{value:tn(s),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:{key:"ex.near_miss",vars:{answer:s}},difficulty:t.d,meta:{a:n}}};tt.number_bonds=(i,e)=>{const t=ht([{d:460,gen:()=>[10,e.int(1,9)]},{d:580,gen:()=>[20,e.int(2,18)]},{d:700,gen:()=>[100,e.int(1,9)*10]}],i),[n,s]=t.gen(),r=n-s;return{kind:"fetch",equation:`${s} + ? = ${n}`,prompt:{key:"q.missing",vars:{a:s,c:n}},answer:r,choices:Ht(e,r,[{value:n+s,tag:"addsub_confuse"},{value:tn(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:{key:"ex.near_miss",vars:{answer:r}},difficulty:t.d,meta:{a:s,c:n}}};tt.big_numbers=(i,e)=>{const t=ht([{d:820,gen:()=>[e.int(2,8)*100+e.int(0,9)*10,e.int(1,8)*100+e.int(0,9)*10]},{d:960,gen:()=>[e.int(11,89)*100,e.int(11,89)*100]},{d:1100,gen:()=>[e.int(12,90)*1e3,e.int(1,9)*1100+e.int(0,9)*100]}],i),[n,s]=t.gen(),r=n+s;return{kind:"fetch",equation:`${n} + ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Ht(e,r,[{value:tn(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:{key:"ex.near_miss",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s}}};const In=i=>String(Qi(i)).replace(".",","),Ed=i=>e=>i+(e+1)*Math.max(.01,Math.abs(i)*.1);tt.dec_compare=(i,e)=>{const t=ht([{d:780},{d:900},{d:1020}],i),n=e.int(2,9),s=n/10,r=(10+e.int(2,9))/100,a=xo(e,s,[{value:r,tag:"decimal_length_bias"},{value:(n-1)/10,tag:"near_miss"}],o=>Math.max(.01,(n-1-o)/10));return{kind:"fetch",equation:`${a.map(o=>In(o.value)).join(" · ")} → ?`,prompt:{key:"q.compare_dec",vars:{}},answer:s,choices:a,model:{kind:"none",params:{}},explain:{key:"ex.decimal_length",vars:{answer:In(s)}},difficulty:t.d,meta:{answer:s}}};tt.dec_addsub=(i,e)=>{const t=ht([{d:840,dp:1},{d:960,dp:2},{d:1080,dp:2}],i),n=10**t.dp,s=e.int(11,89)/n,r=e.int(11,89)/n,a=Qi(s+r),o=xo(e,a,[{value:s*n+r*n,tag:"comma_misalign"},{value:Qi(s+r+.1),tag:"near_miss"}],Ed(a));return{kind:"fetch",equation:`${In(s)} + ${In(r)} = ?`,prompt:{key:"q.fetch",vars:{a:In(s),b:In(r)}},answer:a,choices:o,model:{kind:"none",params:{}},explain:{key:"ex.comma_misalign",vars:{answer:In(a)}},difficulty:t.d,meta:{a:s,b:r}}};tt.dec_muldiv=(i,e)=>{const t=ht([{d:860,pow:10},{d:980,pow:100},{d:1100,pow:1e3}],i),n=e.int(11,99)/100,s=e.chance(.5),r=Qi(s?n*t.pow:n/t.pow),a=Qi(s?n/t.pow:n*t.pow),o=xo(e,r,[{value:a,tag:"comma_misalign"}],Ed(r));return{kind:"fetch",equation:`${In(n)} ${s?"×":"÷"} ${t.pow} = ?`,prompt:{key:"q.fetch",vars:{}},answer:r,choices:o,model:{kind:"none",params:{}},explain:{key:"ex.comma_misalign",vars:{answer:In(r)}},difficulty:t.d,meta:{base:n,pow:t.pow}}};tt.frac_dec_pct=(i,e)=>{const t=ht([{d:820},{d:940},{d:1060}],i),n=[[1,2,.5],[1,4,.25],[3,4,.75],[1,5,.2],[2,5,.4],[1,10,.1],[3,10,.3]],[s,r,a]=e.pick(n),o=xo(e,a,[{value:s/100,tag:"whole_number_bias"},{value:Qi(1-a),tag:"near_miss"}],Ed(a));return{kind:"fetch",equation:`${s}/${r} = ⬚`,prompt:{key:"q.fetch",vars:{}},answer:a,choices:o,model:{kind:"none",params:{}},explain:{key:"ex.near_miss",vars:{answer:In(a)}},difficulty:t.d,meta:{n:s,d:r}}};tt.percent_of=(i,e)=>{const t=ht([{d:800,pcts:[50,25,10],maxMul:6},{d:920,pcts:[25,20,75],maxMul:8},{d:1040,pcts:[20,30,15],maxMul:10}],i),n=e.pick(t.pcts),s=100/nr(n,100)*e.int(2,t.maxMul),r=s*n/100;return{kind:"fetch",equation:`${n}% × ${s} = ?`,prompt:{key:"q.fetch",vars:{pct:n,base:s}},answer:r,choices:Ht(e,r,[{value:s,tag:"whole_number_bias"},{value:tn(r),tag:"reversed"}]),model:{kind:"none",params:{}},explain:{key:"ex.near_miss",vars:{answer:r}},difficulty:t.d,meta:{pct:n,base:s}}};tt.percent_adv=(i,e)=>{const t=ht([{d:980},{d:1100},{d:1220}],i),n=e.pick([110,120,125,150,200]),s=100/nr(n,100)*e.int(2,8),r=s*n/100;return{kind:"fetch",equation:`${n}% × ${s} = ?`,prompt:{key:"q.fetch",vars:{pct:n,base:s}},answer:r,choices:Ht(e,r,[{value:s,tag:"whole_number_bias"},{value:tn(r),tag:"reversed"}]),model:{kind:"none",params:{}},explain:{key:"ex.near_miss",vars:{answer:r}},difficulty:t.d,meta:{pct:n,base:s}}};tt.scale=(i,e)=>{const t=ht([{d:900,scales:[10,50]},{d:1020,scales:[100,250]},{d:1140,scales:[500,1e3]}],i),n=e.pick(t.scales),s=e.int(2,9),r=s*n;return{kind:"fetch",equation:`1 : ${n}, ${s} → ?`,prompt:{key:"q.fetch",vars:{s:n,map:s}},answer:r,choices:Ht(e,r,[{value:s+n,tag:"addsub_confuse"},{value:tn(r),tag:"reversed"}]),model:{kind:"none",params:{}},explain:{key:"ex.near_miss",vars:{answer:r}},difficulty:t.d,meta:{s:n,map:s}}};const fh={dec_compare:"fetch",dec_addsub:"fetch",dec_muldiv:"fetch",frac_dec_pct:"fetch",percent_of:"fetch",percent_adv:"fetch",scale:"fetch",counting:"fetch",number_bonds:"fetch",big_numbers:"fetch",add_20:"fetch",sub_20:"fetch",missing_addend:"fetch",add_100:"fetch",sub_100:"fetch",tables_a:"fetch",tables_b:"fetch",tables_c:"fetch",tables_mix:"fetch",mult_2digit:"fetch",div_facts:"fetch",share:"share",div_remainder:"share",missing_factor:"fetch",frac_magnitude:"numberline",frac_compare:"fetch",frac_equiv:"fetch",frac_of_n:"fetch"},jy={dec_compare:["fetch"],dec_addsub:["fetch"],dec_muldiv:["fetch"],frac_dec_pct:["fetch"],percent_of:["fetch"],percent_adv:["fetch"],scale:["fetch"],counting:["fetch"],number_bonds:["fetch"],big_numbers:["fetch"],add_20:["fetch"],sub_20:["fetch"],missing_addend:["fetch"],add_100:["fetch"],sub_100:["fetch"],tables_a:["fetch","array"],tables_b:["fetch","array"],tables_c:["fetch","array"],tables_mix:["fetch","array"],mult_2digit:["fetch"],div_facts:["fetch","share"],share:["share","fetch"],div_remainder:["share","fetch"],missing_factor:["fetch","share"],frac_magnitude:["numberline"],frac_compare:["fetch"],frac_equiv:["fetch"],frac_of_n:["fetch"]};function qy(i,e,t,n){const s=jy[i];if(t)return s.includes(t)?t:fh[i];const r=fh[i],{world:a}=cn[i];if(e.n>=Ec&&r==="fetch"){if(a==="garden"&&s.includes("array")&&n.chance(.35))return"array";if(a==="stump"&&s.includes("share")&&n.chance(.35))return"share"}return r}function Tc(i,e){if(!Array.isArray(i)||!i.length)return null;const t=new Set(i.filter(n=>cn[n]?.world===e));return t.size?t:null}function Ky(i){if(!Array.isArray(i)||!i.length)return null;const e=[...new Set(i.map(t=>cn[t]?.world).filter(Boolean))];return e.length?e:null}function ph(i,e,t=null,n=0){const s=Tc(t,e),r=Zi[e].filter(a=>!s||s.has(a));for(const a of r)if(!Pr(i.skills[a],Ji(i,a,n)))return a;return r[r.length-1]??Zi[e][0]}function Ac(i,e){for(let t=i.log.length-1;t>=0;t--)if(i.log[t].skill===e)return i.log[t].t;return 0}function Gf(i,e,t){if(!t)return 0;const n=Ac(i,e);return n?Math.max(0,(t-n)/By):0}function Ji(i,e,t){return Nf(i.skills[e].r,Gf(i,e,t))}function Yy(i,e=null,t=0){const n=Array.isArray(e)&&e.length?new Set(e):null,s=Object.keys(cn).filter(o=>i.skills[o].n>0),r=n?s.filter(o=>n.has(o)):s;if(!r.length)return null;const a={};for(const o of r)a[o]=Ji(i,o,t);return r.sort((o,l)=>{const c=a[o]-a[l];return Math.abs(c)>1?c:Ac(i,o)-Ac(i,l)}),r[0]}function Xy(i,e,t=i.r){let n=t-Oy;if(i.n<Ec){n-=(Ec-i.n)*25;let s=0;for(let r=i.hist.length-1;r>=0&&i.hist[r]===1;r--)s++;n+=s*45}return n+(e.float()-.5)*80}function Zy(i,e=2){const t=[];for(let n=i.log.length-1;n>=0&&t.length<e;n--){const s=i.log[n];s.skill==="frac_magnitude"&&s.item&&Number.isFinite(s.value)&&t.push(s)}return t}function mh(i,e,t){const n=`${i.meta.n}/${i.meta.d}`;let s=0;return e[0]?.item===n?s+=12:e.some(r=>r.item===n)&&(s+=7),e.some(r=>Math.abs(r.value-i.answer)<1e-9)&&(s+=6),t.n>0&&t.n<4&&i.meta.d===2&&(s+=3),s}function Qy(i,e,t,n,s,r,a){const o=Zy(e);if(!o.length)return i;let l=i,c=mh(l,o,a);for(let d=0;d<12&&c>0;d++){const u=tt.frac_magnitude(n,t,s,r),h=mh(u,o,a);h<c&&(l=u,c=h)}return l}function Gi(i,e={}){const t=e.rng;if(!t)throw new Error("nextProblem requires opts.rng — the engine sources no entropy of its own.");const n=e.now??0;let s;if(e.skill&&cn[e.skill])s=e.skill;else if(e.echo)s=Yy(i,e.allowedSkills,n)??ph(i,e.world??t.pick(Is),e.allowedSkills,n);else{const h=e.world&&Is.includes(e.world)?e.world:t.pick(Is),f=Tc(e.allowedSkills,h),g=Ky(e.allowedSkills),_=f||!g?h:t.pick(g),m=ph(i,_,e.allowedSkills,n),p=Tc(e.allowedSkills,_),w=t.float();if(w<.7)s=m;else if(w<.9){const E=Zi[_][cn[m].order-1]??m;s=!p||p.has(E)?E:m}else{const E=Object.keys(cn).filter(x=>x!==m&&Pr(i.skills[x],Ji(i,x,n))&&(!p||p.has(x)));s=E.length?t.pick(E):m}}const r=i.skills[s],a=Ji(i,s,n),o=Hy(a),l=qy(s,r,e.kind,t),c=Xy(r,t,a);let d=tt[s](c,t,l,o);return s==="frac_magnitude"&&(d=Qy(d,i,t,c,l,o,r)),{id:`${s}-${Math.floor(t.float()*4294967295).toString(36)}${Math.floor(t.float()*4294967295).toString(36)}`,skillId:s,world:cn[s].world,kind:d.kind,equation:d.equation,prompt:d.prompt,answer:d.answer,accept:d.accept??null,choices:d.choices??null,model:d.model,scaffold:o,difficulty:d.difficulty,explain:d.explain,meta:d.meta}}const Jy=new Set(["tables_a","tables_b","tables_c","tables_mix","div_facts"]),Rc=i=>!!i&&i.ok>=3&&i.lastOk;function ex(i,e,t){if(!Jy.has(e.skillId))return[];const{a:n,b:s}=e.meta??{};if(!n||!s||n>10||s>10)return[];const r=n===s?[`${n}x${s}`]:[`${n}x${s}`,`${s}x${n}`],a=[];for(const o of r){const l=i.facts[o]??(i.facts[o]={n:0,ok:0,lastOk:!1}),c=Rc(l);l.n+=1,t&&(l.ok+=1),l.lastOk=!!t,!c&&Rc(l)&&a.push(o)}return a}function Td(i,e,t,{now:n=0}={}){const s=i.skills[e.skillId];s.r=Nf(s.r,Gf(i,e.skillId,n));const r=Pr(s),a=Gy(s.r,e.difficulty),o=s.n<20?32:16,l=t.correct?t.usedHint?.7:1:0,c=o*(l-a);s.r+=c,s.n+=1,s.hist.push(t.correct?1:0),s.hist.length>Iy&&s.hist.shift(),i.log.push({t:n,skill:e.skillId,tag:e.explain?.key??null,item:e.meta?.n!==void 0&&e.meta?.d!==void 0?`${e.meta.n}/${e.meta.d}`:null,value:typeof e.answer=="number"?e.answer:null,ok:!!t.correct,ms:t.ms??0,hint:!!t.usedHint}),i.log.length>hh&&i.log.splice(0,i.log.length-hh);const d=ex(i,e,!!t.correct),u=!r&&Pr(s)?e.skillId:null;return{delta:c,rating:s.r,masteredSkill:u,newGems:d}}function PE(i,e,t,{now:n=0}={}){const s=i?.skills?.[e];return s?Td(i,{skillId:e,difficulty:s.r,answer:null,meta:{}},{correct:!0},{now:n}):null}function gh(i,e,t){return Zi[e].map(n=>{const s=i.skills[n],r=Ji(i,n,t);return{id:n,nameKey:cn[n].nameKey,rating:Math.round(r),acc10:zf(s.hist),n:s.n,mastered:Pr(s,r)}})}function _h(i){return i.reduce((e,t)=>e+(t.mastered?1:Uy((t.rating-Qa)/(Bf-Qa),0,1)*Math.min(1,t.n/Mc)),0)/i.length}function wr(i,{now:e=0}={}){const t={};for(const a of Is){const o=gh(i,a,e);t[a]={pct:_h(o),skills:o}}const n=gh(i,Ly,e),s=Object.keys(i.facts).filter(a=>Rc(i.facts[a])),r=Object.keys(cn).filter(a=>i.skills[a].n>0).sort((a,o)=>Ji(i,a,e)-Ji(i,o,e)).slice(0,3);return{worlds:t,business:{pct:_h(n),skills:n},gems:{lit:s,total:100},weakest:r}}const es=[{id:"lanterns",char:"l",cost:30,points:.25,emoji:"🏮"},{id:"fruitstand",char:"f",cost:60,points:.7,emoji:"🍉",npc:{pet:"redpanda",face:"🦊"},perk:{kind:"bananas",n:8}},{id:"garden",char:"e",cost:90,points:1.2,emoji:"🌺"},{id:"stage",char:"h",cost:120,points:1.8,emoji:"🎵",npc:{pet:"kitten",face:"🐱"}},{id:"bakery",char:"k",cost:150,points:2.4,emoji:"🥐",npc:{pet:"piglet",face:"🐷"},perk:{kind:"egg",n:3}},{id:"pizzeria",char:"z",cost:180,points:2.6,emoji:"🍕",npc:{pet:"owl",face:"🦉"}},{id:"bridge",char:"b",cost:200,points:3,emoji:"🌉"},{id:"plaza",char:"j",cost:500,contribution:250,points:3.4,needs:["bridge"],emoji:"🎪",finale:!0}];es.length;const Hf={};for(const i of es)Hf[i.id]=i;const tx=i=>Hf[i]||null;function Cc(){return{built:[],seen:[],perkDay:null}}function Yr(i){i.island||(i.island=Cc());for(const[e,t]of Object.entries(Cc()))i.island[e]===void 0&&(i.island[e]=t);return i.island}function Wf(i){let e=0;for(const t of Object.values(i.worlds))e+=t.pct;return e}const qs=(i,e)=>Yr(i).built.includes(e),Ad=i=>i.cost-(i.contribution||0);function Vf(i,e,t,n={}){if(qs(i,e.id))return"built";if(Wf(t)<e.points)return"locked";for(const s of e.needs||[])if(!qs(i,s))return"locked";return e.finale&&n.finaleReady===!1?"locked":"unlocked"}function $a(i,e,t={}){return es.map(n=>({...n,state:Vf(i,n,e,t),playerCost:Ad(n)}))}function nx(i,e,t={}){const n=Yr(i);return $a(i,e,t).filter(s=>s.state==="unlocked"&&!n.seen.includes(s.id))}function ix(i,e){const t=Yr(i);for(const n of e)t.seen.includes(n)||t.seen.push(n)}function sx(i,e,t,n={}){return Vf(i,e,t,n)==="unlocked"&&i.bananas>=Ad(e)}function rx(i,e,t,n={}){return sx(i,e,t,n)?(i.bananas-=Ad(e),Yr(i).built.push(e.id),!0):!1}function ax(i,e){const t=Yr(i);return t.perkDay===e?[]:(t.perkDay=e,es.filter(n=>n.perk&&t.built.includes(n.id)).map(n=>({id:n.id,...n.perk})))}function ox(i,e){const t=e.includes("bridge");return i.map(n=>n.replace(/w/g,t?"V":"#"))}typeof Object.groupBy!="function"&&Object.defineProperty(Object,"groupBy",{configurable:!0,writable:!0,value(i,e){const t=Object.create(null);let n=0;for(const s of i){const r=e(s,n++);(t[r]??=[]).push(s)}return t}});function Rd(i=0){return i=i|0,i<<1&56|i>>1&7|0}function Cd(i=0){return i=i|0,i===0||i===63||i===21||i===42}function lx(i=0){let e=i|0;for(;!Cd(e);)e=Rd(e);return e|0}function $f(i=0){return i=i|0,(i&1)+(i>>1&1)+(i>>2&1)+(i>>3&1)+(i>>4&1)+(i>>5&1)}function cx(i=0){i=i|0;const e=$f(i),t=6-e;if(e===0||t===0)return 0;const n=e/6,s=t/6;return-(n*Math.log2(n)+s*Math.log2(s))}function dx(i=0){return i=i|0,$f(i)/6}function Ja(i=0){return Cd(i)}function jf(i=0){return!Ja(i)&&Ja(Rd(i))}function ux(i=0){return!(Ja(i)||jf(i))}function qf(i){const t=new Array(64);for(let n=0;n<64;n++)t[i[n]]=n;return t}const hx=[63,0,34,17,58,23,16,2,59,55,56,7,47,61,8,4,38,25,48,3,37,41,1,32,39,57,33,30,18,45,14,28,15,60,5,40,43,53,10,20,49,35,62,31,6,24,22,26,46,29,36,9,11,52,44,13,27,54,19,50,51,12,42,21];function fx(i=0){return i=Math.abs(i|0)|0,i>>1^i|0}const px=Object.freeze((function(){const i=new Array(64);for(let e=0;e<64;++e)i[e]=fx(e);return i})());Object.freeze(qf(px));const mx=(function(){const i=Array.from({length:64},(d,u)=>u),e=Object.groupBy(i,d=>lx(d));function t(d){const u=e[d]||[],h=u.filter(x=>Ja(x))[0],f=u.filter(x=>jf(x)).sort((x,A)=>x-A),g=u.filter(x=>ux(x)).sort((x,A)=>x-A),_=Object.groupBy(g,x=>Rd(x)),m=Array(4).fill(null).map(()=>Array(4).fill(null));m[0][0]=h,m[1][0]=f[0]||null,m[1][1]=f[1]||null,m[0][1]=f[2]||null;const p=_[f[0]]||[];m[2][0]=p[0]||null,m[3][0]=p[1]||null,m[2][1]=p[2]||null,m[3][1]=p[3]||null;const w=_[f[1]]||[];m[2][2]=w[0]||null,m[3][2]=w[1]||null,m[2][3]=w[2]||null,m[3][3]=w[3]||null;const E=_[f[2]]||[];return m[0][2]=E[0]||null,m[1][2]=E[1]||null,m[0][3]=E[2]||null,m[1][3]=E[3]||null,m}function n(d,u){let h=d.map(f=>[...f]);for(let f=0;f<u;f++){const g=Array(4).fill(null).map(()=>Array(4).fill(null));for(let _=0;_<4;_++)for(let m=0;m<4;m++)g[m][3-_]=h[_][m];h=g}return h}function s(d,u,h,f){for(let g=0;g<4;g++)for(let _=0;_<4;_++)d[h+g][f+_]=u[g][_]}const r=Array(8).fill(null).map(()=>Array(8).fill(null)),a=t(0);s(r,n(a,2),0,0);const o=t(42);s(r,n(o,3),0,4);const l=t(21);s(r,n(l,1),4,0);const c=t(63);return s(r,n(c,0),4,4),r.flat()})();Object.freeze(qf(mx));const kd=42,kc=[3,4,5,0,1,2],gx=kc.map(i=>kd>>i&1),eo=[{ch:0,key:"taiji",line:null,lineIndex:null,world:null,narrative:!0},{ch:1,key:"liangyi",line:1,lineIndex:0,world:"tide",narrative:!1},{ch:2,key:"sixiang",line:2,lineIndex:1,world:null,narrative:!0},{ch:3,key:"bagua",line:3,lineIndex:2,world:"garden",narrative:!1},{ch:4,key:"wuxing",line:4,lineIndex:3,world:"stump",narrative:!1},{ch:5,key:"gua",line:5,lineIndex:4,world:"vines",narrative:!1},{ch:6,key:"roots",line:6,lineIndex:5,world:null,narrative:!0}],_x=eo[eo.length-1].ch,Kf={},bx={},Yf=[];for(const i of eo)i.lineIndex!=null&&(i.world?(Kf[i.lineIndex]=i.world,bx[i.world]=i.lineIndex):Yf.push(i.lineIndex));const vx=[{friend:"dragon",trigram:"qian",glyph:"☰",binary:7,element:"metal"},{friend:"turtle",trigram:"kun",glyph:"☷",binary:0,element:"earth"},{friend:"kitten",trigram:"zhen",glyph:"☳",binary:4,element:"wood"},{friend:"duckling",trigram:"kan",glyph:"☵",binary:2,element:"water"},{friend:"redpanda",trigram:"gen",glyph:"☶",binary:1,element:"earth"},{friend:"owl",trigram:"xun",glyph:"☴",binary:3,element:"wood"},{friend:"piglet",trigram:"li",glyph:"☲",binary:5,element:"fire"},{friend:"bunny",trigram:"dui",glyph:"☱",binary:6,element:"metal"}],yx={},xx={};for(const i of vx)yx[i.trigram]=i,xx[i.friend]=i;function Xf(){return{lines:[!1,!1,!1,!1,!1,!1],phase:0,beats:[],crabKingReconciled:!1,mimiPhase:0}}function Pc(i){const e=Xf();if(!i.story||typeof i.story!="object"||Array.isArray(i.story))return i.story=e,i.story;const t=i.story;return t.lines=Array.isArray(t.lines)&&t.lines.length===6?t.lines.map(n=>n===!0):e.lines,t.phase=Number.isFinite(t.phase)?Math.max(0,Math.min(_x,Math.floor(t.phase))):0,t.beats=Array.isArray(t.beats)?t.beats.filter(n=>typeof n=="string"):[],t.crabKingReconciled=t.crabKingReconciled===!0,t.mimiPhase=Number.isFinite(t.mimiPhase)?Math.max(0,Math.min(2,Math.floor(t.mimiPhase))):0,t}function Pd(i,e=[]){const t=new Set(e||[]),n=[];Is.forEach((o,l)=>{(i.worlds[o]?.skills||[]).some(d=>t.has(d.id))&&n.push(l)});const s=t.size===0||n.length===0,r=n.length?Math.max(...n):-1,a={};return Is.forEach((o,l)=>{const c=i.worlds[o]?.skills||[],d=s?c:c.filter(g=>t.has(g.id));let u;d.length?u="in":l<r?u="below":u="above";const h=u==="in"&&d.every(g=>g.mastered),f=u==="below"||h;a[o]={band:u,eligibleIds:d.map(g=>g.id),mastered:h,satisfied:f}}),a}function Zf(i,e,t=[]){const n=Pd(e,t),s=[];for(const[r,a]of Object.entries(Kf)){const o=Number(r);!i.lines[o]&&n[a]?.satisfied&&(i.lines[o]=!0,s.push(o))}return s.sort((r,a)=>r-a),s}function Lc(i,e){return!Yf.includes(e)||i.lines[e]?!1:(i.lines[e]=!0,!0)}function wx(i){let e=0;for(let t=0;t<6;t++)i.lines[t]&&(e|=(kd>>kc[t]&1)<<kc[t]);return e}function Lr(i){const e=wx(i),t=i.lines.filter(Boolean).length;return{hexagram:e,balance:dx(e),entropy:cx(e),isRoot:Cd(e),wholeness:t/6,linesDrawn:t,complete:t===6&&e===kd}}function Sx(i,e=[]){const t=Pd(i,e),n={};for(const[s,r]of Object.entries(i.worlds))n[s]=t[s]?.band==="below"?{...r,pct:1}:r;return{...i,worlds:n}}function Mx(i){for(let e=0;e<5;e++)if(!i.lines[e])return!1;return!0}const Ex={id:"NL_PO",titleKey:"curriculum.nl_po.title",countryCode:"NL",countryKey:"curriculum.country.nl",fallbackStagePrefixKey:"curriculum.stage",stages:[{id:"grade_1",order:1,minAge:4,maxAge:5,labelKey:"curriculum.nl_po.stage.grade_1"},{id:"grade_2",order:2,minAge:5,maxAge:6,labelKey:"curriculum.nl_po.stage.grade_2"},{id:"grade_3",order:3,minAge:6,maxAge:7,labelKey:"curriculum.nl_po.stage.grade_3"},{id:"grade_4",order:4,minAge:7,maxAge:8,labelKey:"curriculum.nl_po.stage.grade_4"},{id:"grade_5",order:5,minAge:8,maxAge:9,labelKey:"curriculum.nl_po.stage.grade_5"},{id:"grade_6",order:6,minAge:9,maxAge:10,labelKey:"curriculum.nl_po.stage.grade_6"},{id:"grade_7",order:7,minAge:10,maxAge:11,labelKey:"curriculum.nl_po.stage.grade_7"},{id:"grade_8",order:8,minAge:11,maxAge:12,labelKey:"curriculum.nl_po.stage.grade_8"}],domains:[{id:"numbers",labelKey:"curriculum.domain.numbers"},{id:"operations",labelKey:"curriculum.domain.operations"},{id:"ratios",labelKey:"curriculum.domain.ratios"},{id:"measurement_geometry",labelKey:"curriculum.domain.measurement_geometry"},{id:"data_relationships",labelKey:"curriculum.domain.data_relationships"}],objectives:[{id:"nl_po.grade1.counting_and_order",stage:"grade_1",domain:"numbers",titleKey:"curriculum.nl_po.objective.counting_and_order",status:"playable",gameSkills:["counting"],stageModes:["echo"],steps:[0,1,2,3,4,6,8,12]},{id:"nl_po.grade2.number_bonds_to_10",stage:"grade_2",domain:"numbers",titleKey:"curriculum.nl_po.objective.number_bonds_to_10",status:"playable",gameSkills:["number_bonds"],steps:[5,9]},{id:"nl_po.grade3.add_sub_to_20",stage:"grade_3",domain:"operations",titleKey:"curriculum.nl_po.objective.add_sub_to_20",status:"playable",gameSkills:["add_20","sub_20"],steps:[10,11,17,18,19,20]},{id:"nl_po.grade3.missing_addend_intro",stage:"grade_3",domain:"operations",titleKey:"curriculum.nl_po.objective.missing_addend_intro",status:"playable",gameSkills:["missing_addend"]},{id:"nl_po.grade4.add_sub_to_100",stage:"grade_4",domain:"operations",titleKey:"curriculum.nl_po.objective.add_sub_to_100",status:"playable",gameSkills:["add_100","sub_100"]},{id:"nl_po.grade4.tables_2_5_10",stage:"grade_4",domain:"operations",titleKey:"curriculum.nl_po.objective.tables_2_5_10",status:"playable",gameSkills:["tables_a"],businessModes:["repeated_addition_orders"],stageModes:["count"]},{id:"nl_po.grade4.fair_sharing_intro",stage:"grade_4",domain:"operations",titleKey:"curriculum.nl_po.objective.fair_sharing_intro",status:"playable",gameSkills:["share"],businessModes:["portion_halves_quarters"]},{id:"nl_po.grade4.money_to_100",stage:"grade_4",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.money_to_100",status:"playable",gameSkills:[],businessModes:["money_make_amounts"]},{id:"nl_po.grade5.tables_3_4_6",stage:"grade_5",domain:"operations",titleKey:"curriculum.nl_po.objective.tables_3_4_6",status:"playable",gameSkills:["tables_b"]},{id:"nl_po.grade5.tables_7_8_9",stage:"grade_5",domain:"operations",titleKey:"curriculum.nl_po.objective.tables_7_8_9",status:"playable",gameSkills:["tables_c"]},{id:"nl_po.grade5.all_tables_mixed",stage:"grade_5",domain:"operations",titleKey:"curriculum.nl_po.objective.all_tables_mixed",status:"playable",gameSkills:["tables_mix"]},{id:"nl_po.grade5.measurement_units_intro",stage:"grade_5",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.measurement_units_intro",status:"playable",gameSkills:[],businessModes:["recipe_measure_whole"]},{id:"nl_po.grade5.decimal_money_context",stage:"grade_5",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.decimal_money_context",status:"playable",gameSkills:[],businessModes:["decimal_money_change"]},{id:"nl_po.grade6.multi_digit_multiplication",stage:"grade_6",domain:"operations",titleKey:"curriculum.nl_po.objective.multi_digit_multiplication",status:"playable",gameSkills:["mult_2digit"]},{id:"nl_po.grade6.division_facts_and_inverse",stage:"grade_6",domain:"operations",titleKey:"curriculum.nl_po.objective.division_facts_and_inverse",status:"playable",gameSkills:["div_facts","missing_factor"]},{id:"nl_po.grade6.division_with_remainders",stage:"grade_6",domain:"operations",titleKey:"curriculum.nl_po.objective.division_with_remainders",status:"playable",gameSkills:["div_remainder"]},{id:"nl_po.grade6.fraction_magnitude",stage:"grade_6",domain:"ratios",titleKey:"curriculum.nl_po.objective.fraction_magnitude",status:"playable",gameSkills:["frac_magnitude"],stageModes:["beat"]},{id:"nl_po.grade6.decimals_compare",stage:"grade_6",domain:"numbers",titleKey:"curriculum.nl_po.objective.decimals_compare",status:"playable",gameSkills:["dec_compare"],steps:[44]},{id:"nl_po.grade6.fraction_of_quantity",stage:"grade_6",domain:"ratios",titleKey:"curriculum.nl_po.objective.fraction_of_quantity",status:"playable",gameSkills:["frac_of_n"],businessModes:["fraction_of_quantity_recipe"]},{id:"nl_po.grade6.unit_conversion_context",stage:"grade_6",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.unit_conversion_context",status:"playable",gameSkills:[],businessModes:["unit_conversion_stock"]},{id:"nl_po.grade6.price_comparison",stage:"grade_6",domain:"data_relationships",titleKey:"curriculum.nl_po.objective.price_comparison",status:"playable",gameSkills:[],businessModes:["price_compare"]},{id:"nl_po.grade7.fraction_compare_equivalence",stage:"grade_7",domain:"ratios",titleKey:"curriculum.nl_po.objective.fraction_compare_equivalence",status:"playable",gameSkills:["frac_compare","frac_equiv"]},{id:"nl_po.grade7.decimals_operations",stage:"grade_7",domain:"numbers",titleKey:"curriculum.nl_po.objective.decimals_operations",status:"playable",gameSkills:["dec_addsub","dec_muldiv"],steps:[57,58]},{id:"nl_po.grade7.percentages_intro",stage:"grade_7",domain:"ratios",titleKey:"curriculum.nl_po.objective.percentages_intro",status:"playable",gameSkills:["percent_of"],businessModes:["percentage_discount"],steps:[52,53]},{id:"nl_po.grade7.scale_ratio",stage:"grade_7",domain:"ratios",titleKey:"curriculum.nl_po.objective.scale_ratio",status:"playable",gameSkills:["scale"],steps:[54,63]},{id:"nl_po.grade7.profit_margin_intro",stage:"grade_7",domain:"data_relationships",titleKey:"curriculum.nl_po.objective.profit_margin_intro",status:"playable",gameSkills:[],businessModes:["profit_margin"]},{id:"nl_po.grade7.scale_recipe",stage:"grade_7",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.scale_recipe",status:"playable",gameSkills:[],businessModes:["scale_recipe"]},{id:"nl_po.grade7.scale_and_coordinates",stage:"grade_7",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.scale_and_coordinates",status:"planned",gameSkills:[]},{id:"nl_po.grade8.big_numbers_place_value",stage:"grade_8",domain:"numbers",titleKey:"curriculum.nl_po.objective.big_numbers_place_value",status:"playable",gameSkills:["big_numbers"],steps:[40,48,56]},{id:"nl_po.grade8.operations_maintenance",stage:"grade_8",domain:"operations",titleKey:"curriculum.nl_po.objective.operations_maintenance",status:"playable",gameSkills:["mult_2digit","div_remainder"]},{id:"nl_po.grade8.fraction_decimal_percent_relations",stage:"grade_8",domain:"ratios",titleKey:"curriculum.nl_po.objective.fraction_decimal_percent_relations",status:"playable",gameSkills:["frac_compare","frac_equiv","frac_of_n","frac_dec_pct"],steps:[50]},{id:"nl_po.grade8.percent_advanced",stage:"grade_8",domain:"ratios",titleKey:"curriculum.nl_po.objective.percent_advanced",status:"playable",gameSkills:["percent_adv"],steps:[62]},{id:"nl_po.grade8.inverse_reasoning",stage:"grade_8",domain:"operations",titleKey:"curriculum.nl_po.objective.inverse_reasoning",status:"playable",gameSkills:["missing_factor"]},{id:"nl_po.grade8.advanced_data_reasoning",stage:"grade_8",domain:"data_relationships",titleKey:"curriculum.nl_po.objective.advanced_data_reasoning",status:"playable",gameSkills:[],businessModes:["demand_chart"]}]},Fc={NL_PO:Ex};function xn(i="NL_PO"){return Fc[i]||Fc.NL_PO}function Qf(){return Object.values(Fc).sort((i,e)=>i.id.localeCompare(e.id))}function bh(i="NL_PO",e={}){return xn(i).objectives.filter(n=>!(e.status&&n.status!==e.status||e.stage&&n.stage!==e.stage||e.domain&&n.domain!==e.domain))}function Tx(i){const e={};for(const t of Object.values(i?.worlds||{}))if(Array.isArray(t?.skills))for(const n of t.skills)e[n.id]=n;for(const t of i?.business?.skills||[])e[t.id]=t;return e}function vh(i,e){return!i.length||!e?.modes?null:i.every(t=>e.modes[t]?.coverage==="covered")?"covered":i.some(t=>{const n=e.modes[t]?.coverage;return n==="partial"||n==="covered"})?"partial":null}function Ax(...i){return i.includes("covered")?"covered":i.includes("partial")?"partial":"playable"}function Rx(i="NL_PO",e=null,t={}){const n=xn(i),s=Tx(e),r=t.business||null,a=t.stage||null,o={},l={covered:0,partial:0,playable:0,planned:0};for(const c of n.domains)o[c.id]={id:c.id,labelKey:c.labelKey,total:0,covered:0,partial:0,playable:0,planned:0,objectives:[]};for(const c of n.objectives){const d=c.gameSkills||[],u=d.map(x=>s[x]).filter(Boolean),h=u.filter(x=>x.mastered).length,f=u.filter(x=>(x.n||0)>0).length,g=h&&h===d.length?"covered":f?"partial":null,_=vh(c.businessModes||[],r),m=vh(c.stageModes||[],a),p=c.status==="planned"?"planned":Ax(g,_,m),w={...c,coverage:p},E=o[c.domain];E.total+=1,E[p]+=1,E.objectives.push(w),l[p]+=1}return{packId:n.id,domains:o,statusCounts:l}}const Cx=[["GETALLEN","tide","Number-word sayer: rote count to 10","count","counting",[]],["GETALLEN","tide","Count objects to 5 (1:1 correspondence)","count","counting",[]],["GETALLEN","tide","Subitise to 4 (see how many without counting)","subitise","counting",[]],["GETALLEN","tide","Compare: more / less / same","compare","counting",[]],["GETALLEN","tide","Count to 20; count back from 10","number_track","counting",[]],["GETALLEN","tide","Part-part-whole to 5 (split a small set)","ten_frame","number_bonds",[]],["GETALLEN","tide","Ordinal & position: first/second, before/after","sequence",null,[]],["VERBANDEN","hub","Recognise & extend a simple repeating pattern","pattern",null,[]],["GETALLEN","tide","Subitise to 6; read numerals 0-10","dot_cards","counting",[]],["GETALLEN","tide","Number bonds / splits of 10 (make-ten facts)","ten_frame","number_bonds",[]],["GETALLEN","tide","Add within 12 by counting on from the larger","number_line","add_20",[]],["GETALLEN","tide","Subtract within 12 by counting back / difference","number_line","sub_20",[]],["GETALLEN","tide","Compare & order numbers to 20","number_track","counting",[]],["VERHOUDINGEN","vines","Halves & quarters of a small set (share fairly)","grouping",null,[]],["METEN_MEETKUNDE","business","Coins to €10; make a total","coins",null,[]],["VERBANDEN","business","Read a picture/bar graph; tally","graph",null,[]],["GETALLEN","tide","Numbers to 100: read, place on the line","number_line","add_100",[]],["GETALLEN","tide","Make-ten / bridging through 10 for addition","ten_frame","add_20",[]],["GETALLEN","tide","Bridging through 10 for subtraction","number_line","sub_20",[]],["GETALLEN","tide","Near-doubles & doubles","double_bar","add_20",[]],["GETALLEN","tide","+/- within 20 automatic (derived-fact fluency)","none","missing_addend",[]],["GETALLEN","tide","Inverse relationship + and − (fact families)","bar_model","missing_addend",[]],["GETALLEN","garden","Repeated addition → intro × (equal groups)","rows","tables_a",[]],["GETALLEN","stump","Fair sharing → intro ÷ (deal into groups)","baskets","share",[]],["GETALLEN","tide","Place value to 100 (tens & ones; split)","place_value","add_100",[]],["GETALLEN","tide","+/- to 100 by splitting (rijgen/splitsen)","number_line","add_100",[]],["GETALLEN","tide","+/- to 100 by compensating","number_line","sub_100",[]],["GETALLEN","garden","Tables ×2, ×5, ×10 (skip-count structure)","array","tables_a",[]],["GETALLEN","garden","× as array; commutativity (4×6 = 6×4)","array","tables_a",[]],["GETALLEN","garden","Tables ×3, ×4 via derived facts","array","tables_b",[]],["GETALLEN","stump","÷ with equal groups; ÷ as missing factor","baskets","div_facts",[]],["VERHOUDINGEN","vines","Quarter of a quantity; simple ratio (recipe)","bar","frac_of_n",[]],["GETALLEN","tide","Place value to 1.000; round to hundreds","place_value","add_100",[]],["GETALLEN","tide","Column +/- to 1.000 (cijferen) with regrouping","column","add_100",[]],["GETALLEN","tide","Estimate +/- and judge plausibility","rounding_line","sub_100",[]],["GETALLEN","garden","Tables 6-9 → all tables to 10 automatic (eind gr 5)","array","tables_c",[]],["METEN_MEETKUNDE","business","Decimals in money (2 places): read, +/-","price",null,[]],["GETALLEN","garden","×/÷ informal beyond 20 (chunking)","array","mult_2digit",[]],["VERHOUDINGEN","vines","Fraction as part of a whole; place 1/2, 1/4 on line","number_line","frac_magnitude",[]],["METEN_MEETKUNDE","business","mm/dm/km; herleiden (2 m 40 cm = 240 cm)","ruler",null,[]],["GETALLEN","tide","Numbers to ±100.000; order & round","place_value","big_numbers",[]],["GETALLEN","garden","Tables to 10 — maintenance / retention","array","tables_mix",[]],["GETALLEN","stump","Efficient ×/÷ with remainder; interpret the rest","baskets","div_remainder",["remainder_ignored"]],["GETALLEN","stump","Inverse ×/÷ as a check (missing factor)","bar","missing_factor",[]],["GETALLEN","business","Decimals to 2 places: meaning, compare (0,4 vs 0,12)","place_value","dec_compare",["decimal_length_bias"]],["VERHOUDINGEN","vines","Fraction notation: teller/noemer; named on the line","number_line","frac_magnitude",[]],["VERHOUDINGEN","vines","Compare fractions (1/8 vs 1/4 trap); equivalence","pie","frac_compare",["whole_number_bias"]],["VERHOUDINGEN","vines","Fraction of a quantity (2/3 of 300); 1/4 = 25%","bar","frac_of_n",[]],["GETALLEN","tide","Numbers to ±1 miljoen; decimals to 2 places","place_value","big_numbers",[]],["GETALLEN","tide","Efficient all four operations; estimate & check","mixed",null,[]],["VERHOUDINGEN","business","Fraction ↔ decimal (1/5 = 0,2); simplify (9/12=3/4)","number_line","frac_dec_pct",[]],["VERHOUDINGEN","vines","Equivalent fractions, self-generated","number_line","frac_equiv",[]],["VERHOUDINGEN","business","Percent basics (25%, 50%); % of a quantity","bar","percent_of",[]],["VERHOUDINGEN","business","Discount problem (25% off €80 = €60)","price","percent_of",[]],["VERHOUDINGEN","business","Scale notation (1:100 → real length)","scale","scale",[]],["METEN_MEETKUNDE","business","Area/perimeter reasoning; line graph from a table","grid",null,[]],["GETALLEN","tide","Numbers to millions/billions; decimals to thousandths","place_value","big_numbers",[]],["GETALLEN","business","+/- decimals fluently (align comma; reason zeros)","column","dec_addsub",["comma_misalign"]],["GETALLEN","business","×/÷ by 10/100/1000; ×/÷ decimals","place_value","dec_muldiv",["comma_misalign"]],["GETALLEN","tide","Order of operations & brackets (4 + 5×6)","expression",null,[]],["VERHOUDINGEN","vines","Fractions +/- unlike denominators (gelijknamig)","bar",null,["add_tops_bottoms"]],["VERHOUDINGEN","vines","Fraction × and ÷ (by whole or fraction)","area",null,[]],["VERHOUDINGEN","business","Percent advanced: 1%-rule, >100%, back-calculate","business","percent_adv",[]],["VERHOUDINGEN","business","Scale calculation; derived quantities; data critique","graph","scale",[]]],Jf=Cx.map(([i,e,t,n,s,r],a)=>Object.freeze({id:a,band:a>>3,grade:(a>>3)+1,domain:i,world:e,name:t,model:n,legacyGroup:s,misconception:Object.freeze([...r]),prereq:Object.freeze(a===0?[]:[a-1])}));Jf.length;const kx={};for(const i of Jf)kx[i.id]=i;const Fr="NL_PO";function Ld(i){if(i==null||typeof i=="string"&&i.trim()==="")return null;const e=Number(i);return Number.isFinite(e)?e:null}function Dr(i){if(!i)return null;if(i instanceof Date&&!Number.isNaN(i.getTime()))return{y:i.getFullYear(),m:i.getMonth()+1,d:i.getDate()};const e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(i));if(!e)return null;const t=Number(e[1]),n=Number(e[2]),s=Number(e[3]);return n<1||n>12||s<1||s>31?null:{y:t,m:n,d:s}}function Ir(i){const e=Dr(i);return e?`${String(e.y).padStart(4,"0")}-${String(e.m).padStart(2,"0")}-${String(e.d).padStart(2,"0")}`:null}function xi(){return Ir(new Date)}function ep(i,e=xi()){const t=Dr(i),n=Dr(e);if(!t||!n)return null;let s=n.y-t.y;return(n.m<t.m||n.m===t.m&&n.d<t.d)&&(s-=1),s>=0?s:null}function Px(i,e=xi()){const t=Dr(i),n=Dr(e);if(!t||!n)return 0;let s=n.y-t.y;return(n.m<t.m||n.m===t.m&&n.d<t.d)&&(s-=1),Math.max(0,s)}function Fd(i=Fr,e=null){const t=xn(i),n=Ld(e);if(n==null)return null;const s=t.stages.find(r=>n>=r.minAge&&n<r.maxAge);return s?s.id:n<t.stages[0].minAge?t.stages[0].id:t.stages[t.stages.length-1].id}function tp(i={},e=xi()){if(i.birthDate)return ep(i.birthDate,e);const t=Ld(i.ageAtStart);return t==null?null:i.ageCapturedOn?t+Px(i.ageCapturedOn,e):t}function to({packId:i=Fr,age:e=null,birthDate:t=null,today:n=null}={}){const r=xn(i).id||Fr,a=n?Ir(n):null,o=Ir(t),l=o?ep(o,a||xi()):Ld(e),d=o||l!=null&&a?a||xi():null,u=Fd(r,l);return{packId:r,ageAtStart:l,birthDate:o,ageCapturedOn:d,estimatedStage:u,confirmedStage:u,stageSource:"auto",lastPromotionCheck:null,lastPromotion:null,placementBand:"unknown",strictness:"soft",warmup:{completed:!1,results:[],skillIds:[]}}}function Lx(i={},e=Fr){const t=to({packId:e,age:tp(i),birthDate:i.birthDate,today:xi()});return{...i,...t,strictness:i.strictness||t.strictness}}function yh(i,e){return i.stages.some(t=>t.id===e)}function np(i={},e=xi()){const t=xn(i.packId||Fr),n=Ir(e)||xi(),s=tp(i,n),r=Fd(t.id,s),a=yh(t,i.estimatedStage)?i.estimatedStage:null,o=Or(t,a),l=Or(t,r),c=l!=null&&(o==null||l>o),d=c?r:a||r,u=i.confirmedStage&&i.estimatedStage&&i.confirmedStage!==i.estimatedStage,h=i.stageSource||(u?"parent":"auto"),f=yh(t,i.confirmedStage),g=h==="parent"&&f?i.confirmedStage:d,_=h==="auto"&&c&&a?{fromStage:a,toStage:d,on:n}:null;return{...i,packId:t.id,birthDate:Ir(i.birthDate),estimatedStage:d,confirmedStage:g,stageSource:h==="parent"&&f?"parent":"auto",lastPromotionCheck:n,lastPromotion:_||i.lastPromotion||null,warmup:_?{completed:!1,results:[],skillIds:[]}:i.warmup||{completed:!1,results:[],skillIds:[]}}}function Fx(i=[]){const e=i.filter(r=>typeof r.correct=="boolean"),t=e.filter(r=>r.correct).length,n=e.length?t/e.length:0;return{band:n>=.85?"ahead":n<.5?"below":"on_track",correct:t,total:e.length,rate:n}}function Or(i,e){return i.stages.find(t=>t.id===e)?.order??null}function Dx(i,e){const t=Or(i,e.estimatedStage),n=Or(i,e.confirmedStage),s=e.stageSource==="parent"||e.confirmedStage!==e.estimatedStage;return n!=null&&(t==null||s)?n:t??n}function Ix(i=null){if(!i?.packId)return[];const e=xn(i.packId),t=Dx(e,i);if(!t)return bh(e.id,{status:"playable"});const n=i.placementBand==="ahead"?1:i.placementBand==="below"?-1:0,s=Math.min(e.stages.length,Math.max(t,t+n)),r=i.strictness==="strict"?[s]:Array.from({length:s+1-t+1},(o,l)=>t+l),a=new Set(r.filter(o=>o>=1&&o<=e.stages.length));return bh(e.id,{status:"playable"}).filter(o=>a.has(Or(e,o.stage)))}function Vi(i=null){return[...new Set(Ix(i).flatMap(e=>e.gameSkills||[]))]}function Pa(i,e,t={}){const n=t.completed??!0,s=Array.isArray(t.skillIds)?t.skillIds.slice(0,8):Array.isArray(i?.warmup?.skillIds)?i.warmup.skillIds.slice(0,8):[],r=e.length?Fx(e):i?.warmup?.scored;return{...i,placementBand:r?.band??i?.placementBand??"unknown",warmup:{...i?.warmup,completed:n,results:e.slice(-8),skillIds:s,...r?{scored:r}:{}}}}const ip=["bakery","pizzeria"],Ox=["turtle","bunny","duckling","owl"],LE={turtle:{id:"turtle",petId:"turtle",nameKey:"helper.turtle",face:"turtle",patience:"steady"},bunny:{id:"bunny",petId:"bunny",nameKey:"helper.bunny",face:"bunny",patience:"bouncy"},duckling:{id:"duckling",petId:"duckling",nameKey:"helper.duckling",face:"duckling",patience:"sunny"},owl:{id:"owl",petId:"owl",nameKey:"helper.owl",face:"owl",patience:"thoughtful"}},Mo={dough:{id:"dough",titleKey:"business.ingredient.dough",unitCostCents:70},sauce:{id:"sauce",titleKey:"business.ingredient.sauce",unitCostCents:25},cheese:{id:"cheese",titleKey:"business.ingredient.cheese",unitCostCents:45},tomato:{id:"tomato",titleKey:"business.ingredient.tomato",unitCostCents:35},flour:{id:"flour",titleKey:"business.ingredient.flour",unitCostCents:30},berries:{id:"berries",titleKey:"business.ingredient.berries",unitCostCents:40},milk:{id:"milk",titleKey:"business.ingredient.milk",unitCostCents:35}},rs={margherita:{id:"margherita",kind:"pizza",titleKey:"business.recipe.margherita",basePriceCents:450,ingredients:{dough:1,sauce:1,cheese:1},stages:["grade_4","grade_5","grade_6","grade_7","grade_8"]},tomato_pizza:{id:"tomato_pizza",kind:"pizza",titleKey:"business.recipe.tomato_pizza",basePriceCents:525,ingredients:{dough:1,sauce:1,cheese:1,tomato:1},stages:["grade_5","grade_6","grade_7","grade_8"]},flatbread:{id:"flatbread",kind:"bakery",titleKey:"business.recipe.flatbread",basePriceCents:375,ingredients:{flour:2,milk:1},stages:["grade_3","grade_4","grade_5","grade_6"]},berry_tart:{id:"berry_tart",kind:"bakery",titleKey:"business.recipe.berry_tart",basePriceCents:600,ingredients:{flour:1,berries:2,milk:1},stages:["grade_5","grade_6","grade_7","grade_8"]}},ti={money_make_amounts:{id:"money_make_amounts",kind:"payment",objectiveId:"nl_po.grade4.money_to_100",minStage:"grade_4"},decimal_money_change:{id:"decimal_money_change",kind:"payment",objectiveId:"nl_po.grade5.decimal_money_context",minStage:"grade_5"},portion_halves_quarters:{id:"portion_halves_quarters",kind:"prep",objectiveId:"nl_po.grade4.fair_sharing_intro",minStage:"grade_4"},repeated_addition_orders:{id:"repeated_addition_orders",kind:"prep",objectiveId:"nl_po.grade4.tables_2_5_10",minStage:"grade_4"},recipe_measure_whole:{id:"recipe_measure_whole",kind:"prep",objectiveId:"nl_po.grade5.measurement_units_intro",minStage:"grade_5"},fraction_of_quantity_recipe:{id:"fraction_of_quantity_recipe",kind:"prep",objectiveId:"nl_po.grade6.fraction_of_quantity",minStage:"grade_6"},unit_conversion_stock:{id:"unit_conversion_stock",kind:"stock",objectiveId:"nl_po.grade6.unit_conversion_context",minStage:"grade_6"},price_compare:{id:"price_compare",kind:"upgrade",objectiveId:"nl_po.grade6.price_comparison",minStage:"grade_6"},percentage_discount:{id:"percentage_discount",kind:"payment",objectiveId:"nl_po.grade7.percentages_intro",minStage:"grade_7"},profit_margin:{id:"profit_margin",kind:"summary",objectiveId:"nl_po.grade7.profit_margin_intro",minStage:"grade_7"},scale_recipe:{id:"scale_recipe",kind:"prep",objectiveId:"nl_po.grade7.scale_recipe",minStage:"grade_7"},demand_chart:{id:"demand_chart",kind:"summary",objectiveId:"nl_po.grade8.advanced_data_reasoning",minStage:"grade_8"}},sp={extra_oven:{id:"extra_oven",titleKey:"business.upgrade.extra_oven",priceCents:650,effect:{ovenSlots:1},objectiveId:"nl_po.grade6.price_comparison"},bigger_pantry:{id:"bigger_pantry",titleKey:"business.upgrade.bigger_pantry",priceCents:900,effect:{stockLimit:6},objectiveId:"nl_po.grade6.unit_conversion_context"},bright_sign:{id:"bright_sign",titleKey:"business.upgrade.bright_sign",priceCents:1200,effect:{demandBonus:1},objectiveId:"nl_po.grade8.advanced_data_reasoning"}},xh={bakery:{id:"bakery",recipeKind:"bakery",titleKey:"business.zone.bakery",ingredientIds:["flour","berries","milk"],startingStock:{flour:6,berries:4,milk:4},resident:{pet:"piglet",face:"🐷",nameKey:"npc.bakery"}},pizzeria:{id:"pizzeria",recipeKind:"pizza",titleKey:"business.zone.pizzeria",ingredientIds:["dough","sauce","cheese","tomato"],startingStock:{dough:6,sauce:6,cheese:6,tomato:4},resident:{pet:"owl",face:"🦉",nameKey:"npc.pizzeria"}}},Dd=i=>xh[i]||xh.bakery,rp=i=>Object.values(rs).filter(e=>e.kind===Dd(i).recipeKind),Bx={grade_1:1,grade_2:2,grade_3:3,grade_4:4,grade_5:5,grade_6:6,grade_7:7,grade_8:8};function wh(i){return JSON.parse(JSON.stringify(i))}function Id(i="bakery"){const e=Dd(i);return{id:e.id,level:1,shopCoins:0,stock:{...e.startingStock},stockLimit:12,upgrades:[],currentDay:1,activeOrder:null,queue:[],progress:{},day:no(),history:[]}}function ap(){const i={};for(const e of ip)i[e]=Id(e);return i}function no(){return{ordersServed:0,revenueCents:0,costCents:0,profitCents:0,wasteCents:0,demand:{}}}function Nx(i,e){const t=Id(e);if(!i||typeof i!="object")return t;i.id=e;for(const[s,r]of Object.entries(t))i[s]===void 0&&(i[s]=wh(r));(!i.stock||typeof i.stock!="object")&&(i.stock={...t.stock});for(const[s,r]of Object.entries(t.stock))i.stock[s]===void 0&&(i.stock[s]=r);(!i.day||typeof i.day!="object")&&(i.day=no());const n=no();for(const[s,r]of Object.entries(n))i.day[s]===void 0&&(i.day[s]=wh(r));return(!i.day.demand||typeof i.day.demand!="object"||Array.isArray(i.day.demand))&&(i.day.demand={}),(!i.progress||typeof i.progress!="object")&&(i.progress={}),Array.isArray(i.upgrades)||(i.upgrades=[]),Array.isArray(i.queue)||(i.queue=[]),Array.isArray(i.history)||(i.history=[]),i}function io(i){(!i.business||typeof i.business!="object"||Array.isArray(i.business))&&(i.business=ap());for(const e of ip)i.business[e]=Nx(i.business[e],e);return i.business}function zx(i,e="bakery"){return io(i)[e]||io(i).bakery}function ts(i){return Bx[i]??4}function Eo(i){const e=xn(i?.packId),t=i?.confirmedStage||i?.estimatedStage||"grade_4";return e.stages.some(n=>n.id===t)?t:"grade_4"}function Ux(i,e){const t=ts(Eo(i));return rp(e).filter(n=>n.stages.some(s=>ts(s)<=t))}function Gx(i){const e=ts(Eo(i));return Object.values(ti).filter(t=>ts(t.minStage)<=e)}function Hx(i,e=1){return Object.entries(i.ingredients).reduce((t,[n,s])=>t+Mo[n].unitCostCents*s*e,0)}function Od(i,e,t=1){return Object.entries(e.ingredients).every(([n,s])=>(i.stock[n]??0)>=s*t)}function Wx(i,e,t=1){for(const[n,s]of Object.entries(e.ingredients))i.stock[n]-=s*t}function Vx(i,e,t=1){return Object.entries(e.ingredients).reduce((n,[s,r])=>{const a=Math.max(0,r*t-(i.stock[s]??0));return n+a*Mo[s].unitCostCents},0)}function $x(i,e,t=1){for(const[n,s]of Object.entries(e.ingredients)){const r=s*t;(i.stock[n]??0)<r&&(i.stock[n]=r)}}function FE(i){return Math.round(Lt.bakeMs/Math.max(1,i.ovenSlots||1))}function jx(i,e){const t=rs[e.recipeId];return t?Od(i,t,e.quantity)||i.shopCoins>=Vx(i,t,e.quantity):!1}function qx(i,e){const t=rs[e.recipeId];return!t||jx(i,e)?!1:($x(i,t,e.quantity),e.supplied=!0,!0)}function Sh(i,e,t){if(i.id==="portion_halves_quarters")return{id:`${e.id}:prep:portion`,kind:"prep",mode:i.id,objectiveId:i.objectiveId,expected:{slices:t.pick([2,4]),topping:e.recipeId.includes("tomato")?"tomato":"cheese"}};if(i.id==="repeated_addition_orders")return{id:`${e.id}:prep:repeat`,kind:"prep",mode:i.id,objectiveId:i.objectiveId,expected:{trays:e.quantity,perTray:e.recipeId.includes("pizza")?6:4}};if(i.id==="recipe_measure_whole")return{id:`${e.id}:prep:measure`,kind:"prep",mode:i.id,objectiveId:i.objectiveId,expected:{ingredient:"flour",amount:e.quantity*2,unit:"cups"}};if(i.id==="fraction_of_quantity_recipe")return{id:`${e.id}:prep:fraction`,kind:"prep",mode:i.id,objectiveId:i.objectiveId,expected:{numerator:1,denominator:2,of:e.quantity*8}};if(i.id==="scale_recipe")return{id:`${e.id}:prep:scale`,kind:"prep",mode:i.id,objectiveId:i.objectiveId,expected:{factor:e.quantity,base:rs[e.recipeId].ingredients}};if(i.id==="percentage_discount"){const n=Math.round(e.priceCents*.1);return{id:`${e.id}:pay:discount`,kind:"payment",mode:i.id,objectiveId:i.objectiveId,expected:{originalCents:e.priceCents,percent:10,finalCents:e.priceCents-n}}}if(i.id==="decimal_money_change"){const n=Math.ceil(e.priceCents/500)*500||500;return{id:`${e.id}:pay:change`,kind:"payment",mode:i.id,objectiveId:i.objectiveId,expected:{paidCents:n,changeCents:n-e.priceCents}}}return{id:`${e.id}:pay:make`,kind:"payment",mode:"money_make_amounts",objectiveId:ti.money_make_amounts.objectiveId,expected:{amountCents:e.priceCents}}}function DE(i,e,t={}){const n=t.rng??{pick:m=>m[Math.floor(Math.random()*m.length)],int:(m,p)=>m+Math.floor(Math.random()*(p-m+1))},s=t.shopId||i.id||"bakery",r=ts(Eo(e)),a=r>=7?n.pick([1,2,3]):r>=5?n.pick([1,2]):1,o=Ux(e,s),l=o.length?o:rp(s),c=l.filter(m=>Od(i,m,a)),d=c.length?c:l,u=n.pick(d),h={id:`biz-${Date.now().toString(36)}-${Math.floor(Math.random()*1e4).toString(36)}`,customerId:n.pick(Ox),recipeId:u.id,quantity:a,priceCents:u.basePriceCents*a,costCents:Hx(u,a),tasks:[],supplied:!1},f=Gx(e),g=f.filter(m=>m.kind==="prep"),_=f.filter(m=>m.kind==="payment");return h.tasks.push(Sh(n.pick(g.length?g:[ti.portion_halves_quarters]),h,n)),h.tasks.push(Sh(n.pick(_.length?_:[ti.money_make_amounts]),h,n)),qx(i,h),h}function op(i,e={},t={}){const n=s=>Number(s);if(i==="percentage_discount")return n(t.finalCents)===e.originalCents||n(t.finalCents)===e.originalCents-e.finalCents?"whole_number_bias":"near_miss";if(i==="decimal_money_change"){const s=e.changeCents,r=n(t.changeCents);return r===s*10||r===s*100||r===Math.round(s/10)?"comma_misalign":"near_miss"}if(i==="scale_recipe"){const s=e.base||{};return Object.keys(s).length&&Object.entries(s).every(([a,o])=>n(t.ingredients?.[a])===o)?"whole_number_bias":"near_miss"}return i==="fraction_of_quantity_recipe"&&n(t.amount)===e.of?"whole_number_bias":"near_miss"}function IE(i,e,t,n){const s=rs[e.recipeId];let r=!1;if(t.mode==="portion_halves_quarters"?r=Number(n.slices)===t.expected.slices&&String(n.topping)===t.expected.topping:t.mode==="repeated_addition_orders"?r=Number(n.total)===t.expected.trays*t.expected.perTray:t.mode==="recipe_measure_whole"?r=String(n.ingredient)===t.expected.ingredient&&Number(n.amount)===t.expected.amount&&String(n.unit)===t.expected.unit:t.mode==="fraction_of_quantity_recipe"?r=Number(n.amount)===t.expected.of*t.expected.numerator/t.expected.denominator:t.mode==="scale_recipe"&&(r=Object.entries(t.expected.base).every(([o,l])=>Number(n.ingredients?.[o])===l*t.expected.factor)),r&&!t.stockConsumed){if(!Od(i,s,e.quantity))return Br(i,t.mode,!1,{taskId:t.id,reason:"stock"});Wx(i,s,e.quantity),t.stockConsumed=!0}const a=r?"correct":op(t.mode,t.expected,n);return Br(i,t.mode,r,{taskId:t.id,tag:a})}function OE(i,e,t,n){let s=!1;t.mode==="money_make_amounts"?s=Number(n.amountCents)===t.expected.amountCents:t.mode==="decimal_money_change"?s=Number(n.paidCents)===t.expected.paidCents&&Number(n.changeCents)===t.expected.changeCents:t.mode==="percentage_discount"&&(s=Number(n.finalCents)===t.expected.finalCents);const r=s?"correct":op(t.mode,t.expected,n);return Br(i,t.mode,s,{taskId:t.id,tag:r})}const Kx=["stock","upgrade","summary"];function Yx(i){const e=ts(Eo(i));return Object.values(ti).filter(t=>Kx.includes(t.kind)&&ts(t.minStage)<=e)}function gl(i){return[...new Set(i)]}const _l=(i,e)=>e.shuffle(i);function Xx(i,e,t){const n={id:`review:${i.id}`,kind:"review",mode:i.id,objectiveId:i.objectiveId};if(i.id==="profit_margin"){if(!e.ordersServed)return null;const s=e.revenueCents||0,r=e.costCents||0,a=Math.max(0,s-r),o=gl([a,a+100,Math.max(0,a-100),a+50]).filter(l=>l>=0).slice(0,4);return{...n,revenueCents:s,costCents:r,answer:a,options:_l(o,t)}}if(i.id==="demand_chart"){const s=Object.entries(e.demand||{}).sort((o,l)=>l[1]-o[1]);if(!s.length)return null;const r=s[0][0],a=gl([...s.map(([o])=>o),...Object.keys(rs)]).slice(0,4);return{...n,answer:r,options:_l(a,t)}}if(i.id==="unit_conversion_stock"){const s=t.int(1,5),r=s*1e3,a=gl([r,s*100,r+1e3,s*1e4]).slice(0,4);return{...n,kg:s,answer:r,options:_l(a,t)}}if(i.id==="price_compare"){const s={count:t.int(2,5),cents:0},r={count:t.int(2,5),cents:0};s.cents=s.count*t.pick([40,50,60]),r.cents=r.count*t.pick([30,45,70]),s.cents/s.count===r.cents/r.count&&(r.cents+=r.count*10);const a=s.cents/s.count<=r.cents/r.count?"A":"B";return{...n,a:s,b:r,answer:a,options:["A","B"]}}return null}function BE(i,e,t={}){const n=t.rng??{pick:r=>r[Math.floor(Math.random()*r.length)],int:(r,a)=>r+Math.floor(Math.random()*(a-r+1))},s=i.day||no();return Yx(e).map(r=>Xx(r,s,n)).filter(Boolean)}function NE(i,e,t){const n=String(t)===String(e.answer);return Br(i,e.mode,n,{taskId:e.id})}function Br(i,e,t,n={}){return i.progress[e]||(i.progress[e]={attempts:0,correct:0}),i.progress[e].attempts+=1,t&&(i.progress[e].correct+=1),{mode:e,correct:t,recorded:!0,...n}}function zE(i,e,t={}){for(const r of t.attempts||[]){if(r.recorded===!0&&r.mode)continue;const a=e.tasks.find(o=>o.id===r.taskId);a&&Br(i,a.mode,!!r.correct,{taskId:a.id})}const n=Math.max(0,Math.round(t.tipCents||0)),s=Math.max(0,e.priceCents-e.costCents)+n;return i.shopCoins+=s,i.day.ordersServed+=1,i.day.revenueCents+=e.priceCents+n,i.day.costCents+=e.costCents,i.day.profitCents+=s,i.day.demand[e.recipeId]=(i.day.demand[e.recipeId]||0)+e.quantity,i.history.push({id:e.id,recipeId:e.recipeId,customerId:e.customerId,priceCents:e.priceCents,costCents:e.costCents,profitCents:s,tipCents:n,t:Date.now()}),i.history=i.history.slice(-40),i.activeOrder=null,{profitCents:s,tipCents:n,shopCoins:i.shopCoins}}function UE(i,e,t){const n=Mo[e];if(!n||t<=0)return{ok:!1,reason:"unknown"};const s=Math.max(0,i.stockLimit-(i.stock[e]??0));if(s<=0)return{ok:!1,reason:"full"};const r=Math.floor(i.shopCoins/n.unitCostCents),a=Math.min(s,t,r);if(a<=0)return{ok:!1,reason:"price"};const o=n.unitCostCents*a;return i.shopCoins-=o,i.stock[e]=(i.stock[e]??0)+a,{ok:!0,bought:a,costCents:o}}function GE(i,e){const t=sp[e];return!t||i.upgrades.includes(e)?{ok:!1,reason:"unknown"}:i.shopCoins<t.priceCents?{ok:!1,reason:"price"}:(i.shopCoins-=t.priceCents,i.upgrades.push(e),t.effect.stockLimit&&(i.stockLimit+=t.effect.stockLimit),t.effect.ovenSlots&&(i.ovenSlots=(i.ovenSlots||1)+t.effect.ovenSlots),t.effect.demandBonus&&(i.demandBonus=(i.demandBonus||0)+t.effect.demandBonus),{ok:!0,upgrade:t})}function HE(i){const e={};for(const n of Object.keys(ti)){const s=i.progress?.[n]??{attempts:0,correct:0},r=s.attempts?s.correct/s.attempts:0;e[n]={...s,rate:r,coverage:s.correct>=3&&r>=.8?"covered":s.attempts>0?"partial":"playable"}}const t=Object.entries(i.day?.demand||{}).sort((n,s)=>s[1]-n[1]).map(([n])=>n);return{ordersServed:i.day?.ordersServed??0,revenueCents:i.day?.revenueCents??0,costCents:i.day?.costCents??0,profitCents:i.day?.profitCents??0,topRecipes:t,modes:e}}function Zx(i){const e=io(i),t={};for(const r of Object.keys(ti))t[r]={attempts:0,correct:0};const n={ordersServed:0,revenueCents:0,costCents:0,profitCents:0},s={};for(const[r,a]of Object.entries(e)){s[r]={ordersServed:a.day?.ordersServed??0,revenueCents:a.day?.revenueCents??0,costCents:a.day?.costCents??0,profitCents:a.day?.profitCents??0,shopCoins:a.shopCoins??0,currentDay:a.currentDay??1},n.ordersServed+=a.day?.ordersServed??0,n.revenueCents+=a.day?.revenueCents??0,n.costCents+=a.day?.costCents??0,n.profitCents+=a.day?.profitCents??0;for(const o of Object.keys(ti)){const l=a.progress?.[o];l&&(t[o].attempts+=l.attempts||0,t[o].correct+=l.correct||0)}}for(const r of Object.keys(t)){const a=t[r];a.rate=a.attempts?a.correct/a.attempts:0,a.coverage=a.correct>=3&&a.rate>=.8?"covered":a.attempts>0?"partial":"playable"}return{...n,modes:t,shops:s}}const Qx={grade_1:1,grade_2:2,grade_3:3,grade_4:4,grade_5:5,grade_6:6,grade_7:7,grade_8:8},Nr={echo:{id:"echo",kind:"sequence",minStage:"grade_1",titleKey:"stage.song.echo",face:"🎵",objectiveId:"nl_po.grade1.counting_and_order",reinforceSkill:null},count:{id:"count",kind:"skip",minStage:"grade_3",titleKey:"stage.song.count",face:"🔔",objectiveId:"nl_po.grade4.tables_2_5_10",reinforceSkill:"tables_a"},beat:{id:"beat",kind:"notevalue",minStage:"grade_5",titleKey:"stage.song.beat",face:"🥁",objectiveId:"nl_po.grade6.fraction_magnitude",reinforceSkill:"frac_magnitude"}},lp=Object.keys(Nr),Jx=[{id:0,color:"#ff9db0",midi:60},{id:1,color:"#ffd166",midi:64},{id:2,color:"#8ecae6",midi:67},{id:3,color:"#a0e8af",midi:72}],ew=[{minStage:"grade_3",steps:[2,5,10]},{minStage:"grade_5",steps:[3,4,6]},{minStage:"grade_6",steps:[7,8,9]}],tw=24,cp={whole:{id:"whole",units:24,num:1,den:1},half:{id:"half",units:12,num:1,den:2},third:{id:"third",units:8,num:1,den:3},quarter:{id:"quarter",units:6,num:1,den:4},sixth:{id:"sixth",units:4,num:1,den:6},eighth:{id:"eighth",units:3,num:1,den:8}},nw=[{minStage:"grade_5",tiles:["half","quarter"]},{minStage:"grade_6",tiles:["half","quarter","eighth"]},{minStage:"grade_7",tiles:["half","third","quarter","sixth","eighth"]}],zr=i=>Qx[i]??4,iw=(i,e,t)=>Math.max(e,Math.min(t,i));function Dc(){return{progress:{},level:{},seen:[],currentDay:1}}function sw(i){(!i.stage||typeof i.stage!="object"||Array.isArray(i.stage))&&(i.stage=Dc());const e=Dc();for(const[t,n]of Object.entries(e))i.stage[t]===void 0&&(i.stage[t]=structuredClone(n));return(typeof i.stage.progress!="object"||i.stage.progress===null)&&(i.stage.progress={}),(typeof i.stage.level!="object"||i.stage.level===null)&&(i.stage.level={}),Array.isArray(i.stage.seen)||(i.stage.seen=[]),i.stage}function dp(i){const e=xn(i?.packId),t=i?.confirmedStage||i?.estimatedStage||"grade_4";return e.stages.some(n=>n.id===t)?t:"grade_4"}function WE(i){const e=zr(dp(i));return lp.map(t=>{const n=Nr[t];return{...n,unlocked:e>=zr(n.minStage),unlocksStage:n.minStage}})}const rw={int:(i,e)=>i+Math.floor(Math.random()*(e-i+1)),pick:i=>i[Math.floor(Math.random()*i.length)]};function aw(i,e,t){const n=iw(3+Math.floor((i-1)/2)+e,3,8);return{mode:"echo",kind:"sequence",sequence:Array.from({length:n},()=>t.int(0,Jx.length-1)),length:n}}function ow(i,e,t){const n=ew.filter(o=>i>=zr(o.minStage)).flatMap(o=>o.steps),s=t.pick(n.length?n:[2]),r=Math.max(s*3,i>=6?24:i>=4?20:12),a=[];for(let o=s;o<=r;o+=s)a.push(o);return{mode:"count",kind:"skip",step:s,beats:r,targets:a}}const lw=[["half","quarter","quarter"],["quarter","quarter","quarter","quarter"],["half","half"],["half","quarter","eighth","eighth"],["third","third","third"],["half","third","sixth"]];function cw(i,e,t){const n=nw.filter(o=>i>=zr(o.minStage)).flatMap(o=>o.tiles),s=[...new Set(n.length?n:["half","quarter"])],r=lw.filter(o=>o.every(l=>s.includes(l))),a=t.pick(r.length?r:[["quarter","quarter","quarter","quarter"]]);return{mode:"beat",kind:"notevalue",target:tw,tiles:s,answer:a}}const dw={echo:aw,count:ow,beat:cw};function VE(i,e,t={}){const n=Nr[i]||Nr.echo,s=t.rng??rw,r=zr(dp(e)),a=Math.max(0,t.level||0),o=dw[n.id](r,a,s);return{id:`stage-${n.id}-${r}-${a}`,objectiveId:n.objectiveId,...o}}const uw=(i=[],e=[])=>i.length===e.length&&i.every((t,n)=>Number(t)===Number(e[n])),hw=(i=[],e=[])=>{const t=new Set(i.map(Number)),n=new Set(e.map(Number));return t.size===n.size&&[...t].every(s=>n.has(s))};function fw(i,e={}){if(i.mode==="count"){const t=(e.beats||[]).map(Number);for(const n of[i.step-1,i.step+1])if(n>1&&t.length&&t.every(s=>s%n===0))return"off_by_table";return"near_miss"}return i.mode==="beat"&&(e.tiles||[]).reduce((n,s)=>n+(cp[s]?.units||0),0)>i.target?"whole_number_bias":"near_miss"}function $E(i,e={}){let t=!1;return i.mode==="echo"?t=uw(e.sequence,i.sequence):i.mode==="count"?t=hw(e.beats,i.targets):i.mode==="beat"&&(t=(e.tiles||[]).reduce((n,s)=>n+(cp[s]?.units||0),0)===i.target),{correct:t,tag:t?"correct":fw(i,e)}}function jE(i,e,t){return i.progress[e]||(i.progress[e]={attempts:0,correct:0}),i.progress[e].attempts+=1,t&&(i.progress[e].correct+=1,i.level[e]=Math.min(5,(i.level[e]||0)+1)),{mode:e,correct:t,recorded:!0}}function pw(i){const e={};for(const t of lp){const n=i?.progress?.[t]??{attempts:0,correct:0},s=n.attempts?n.correct/n.attempts:0;e[t]={...n,rate:s,coverage:n.correct>=3&&s>=.8?"covered":n.attempts>0?"partial":"playable"}}return{modes:e}}const mw={palette:{F:"#8a5a3b",f:"#f0d6b3",S:"#ffd9b0",E:"#2e2433",W:"#ffffff",N:"#b87a5e"},layers:[["...........","...........","...FF.FF...","...ff.ff..."],["...........",".....F.....","...FFFFF...","...FfffF..."],["...........",".....F.....","..FFFFFFF..","...FfffF..."],[".....F.....","...........","..FFFFFFF..","...FfffF..."],["...........","...........","...FFFFF...","...FFFFF..."],["...........","...FFFFF...","..FFFFFFF..","..FFFFFFF..","...fffff..."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FSSSSSF..","....fNf...."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FEESEEF.."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FWESWEF.."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FFFfFFF.."],["...........","...FFFFF...","..FFFFFFF..","..FFFFFFF..","...FFFFF..."],["...........","...........","....FFF....","....FFF...."]]},gw={palette:{F:"#8a5a3b",f:"#f0d6b3",S:"#ffd9b0",E:"#2e2433",W:"#ffffff",N:"#b87a5e"},layers:[[".......",".......","..F.F..","..f.f.."],[".......",".FFFFF.",".FFFFF.",".FfffF."],[".......",".FFFFF.","fFFFFFf",".FfffF."],[".......","..FFF..",".FFFFF.","..FFF.."],[".FFFFF.","FFFFFFF","FFFFFFF",".FSSSF.","..fNf.."],[".FFFFF.","fFFFFFf","FFFFFFF","FEESEEF"],[".FFFFF.","fFFFFFf","FFFFFFF","FWESEWF"],[".......",".FFFFF.",".FFFFF.","..FFF.."]]},up={palette:{F:"#9c6b4a",f:"#f5dfc0",S:"#ffdcb8",E:"#2e2433",W:"#ffffff",N:"#c08a6a",P:"#ffb3c6",Y:"#ffe28a"},layers:[["...........","...........","...FF.FF...","...ff.ff..."],["...........",".....F.....","...FFFFF...","...FfffF..."],["...........",".....F.....","..FFFFFF...","...FfffF..."],[".....F.....","...........","...FFFFFF..","...FfffF..."],["...........","...........","...FFFFFF..","...FFFFF..."],["...........","...FFFFF...","..FFFFFFFf.","..FFFFFFF..","...fffff..."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FSSSSSF..","....fNf...."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FEESEEF.."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FWESWEF.."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FFFfFFF.."],["...........","...FFFFF...","..FFFFFFF..","..FFFFFFF..","...FFFFF..."],["...........","...........","....FFF....","....FFF...."],["...........","...........",".....P.....","....PYP....",".....P....."]]},_w={palette:{F:"#9c6b4a",f:"#f5dfc0",S:"#ffdcb8",E:"#2e2433",W:"#ffffff",N:"#c08a6a",P:"#ffb3c6",Y:"#ffe28a"},layers:[[".......",".......","..F.F..","..f.f.."],[".......",".FFFFF.",".FFFFF.",".FfffF."],[".......",".FFFFF.","fFFFFFf",".FfffF."],[".......","..FFF..",".FFFFF.","..FFF.."],[".FFFFF.","FFFFFFF","FFFFFFF",".FSSSF.","..fNf.."],[".FFFFF.","fFFFFFf","FFFFFFF","FEESEEF"],[".FFFFF.","fFFFFFf","FFFFFFF","FWESEWF"],[".......",".FFFFF.",".FFFFF.","..FFF.."],[".......","...P...","..PYP..","...P..."]]},bw={palette:{R:"#f08a7a",r:"#ffb3a0",d:"#d96b5d",E:"#2e2433",W:"#ffffff"},layers:[[".........",".d.....d.",".........",".d.....d."],["..RRRRR..",".RRRRRRR.",".RRRRRRR.",".RRRRRRR.","r.rrrrr.r","r.......r"],[".........","..RRRRR..",".RRRRRRR.","..RRRRR..","r.......r","r.......r"],[".........",".........","..RRRRR..","..RRRRR.."],[".........",".........",".........","..d...d.."],[".........",".........",".........",".EE...EE."],[".........",".........",".........",".WE...WE."]]},vw={palette:{R:"#e87a6a",r:"#ffb3a0",d:"#c95f51",G:"#f4c95d",E:"#2e2433",W:"#ffffff"},layers:[[".............",".............",".d.........d.",".............",".d.........d."],[".............","..RRRRRRRRR..",".RRRRRRRRRRR.",".RRRRRRRRRRR.",".RRRRRRRRRRR.","r.rrrrrrrrr.r","rr.........rr"],[".............","..RRRRRRRRR..",".RRRRRRRRRRR.",".RRRRRRRRRRR.",".RRRRRRRRRRR.","r.rrrrrrrrr.r","rr.........rr"],[".............","..RRRRRRRRR..",".RRRRRRRRRRR.",".RRRRRRRRRRR.",".RRRRRRRRRRR.","r.rrrrrrrrr.r","r...........r"],[".............",".............","..RRRRRRRRR..",".RRRRRRRRRRR.","..RRRRRRRRR..","r...........r"],[".............",".............","...RRRRRRR...","..RRRRRRRRR..","...RRRRRRR..."],[".............",".............",".............","....RRRRR....","....rrrrr...."],[".............",".............",".............","....GGGGG....","....d...d...."],[".............",".............",".............","....G.G.G....","....d...d...."],[".............",".............",".............","......G......","....d...d...."],[".............",".............",".............",".............","...EE...EE..."],[".............",".............",".............",".............","...WE...WE..."]]},yw={id:"bunny",nameKey:"pet.bunny",rarity:"common",model:{palette:{B:"#fdf6ec",b:"#e8dcc8",P:"#ffc2d1",E:"#2e2433"},layers:[["...b...",".BBBBB.",".BBBBB.",".BBBBB."],[".......",".BBBBB.",".BBBBB.",".BBBBB."],[".......","..BBB..",".BBBBB.",".BEPEB."],[".......","..BBB..","..BBB..","..BBB.."],[".......",".......","..B.B.."],[".......",".......","..B.B.."],[".......",".......","..B.B.."],[".......",".......","..P.P.."]]},modelFull:{palette:{B:"#fdf6ec",b:"#e8dcc8",P:"#ffc2d1",E:"#2e2433"},layers:[[".........",".........","..BB.BB..","..bb.bb.."],[".........",".........","..BBBBB..","..BbbbB.."],[".........",".........",".BBBBBBB.",".BBbbbBB."],[".........",".........","BBBBBBBBB",".BBbbbBB."],[".........",".........",".BBBBBBB.",".BBBBBBB."],[".........","..BBBBB..",".BBBBBBB.",".BBBBBBB."],[".........","..BBBBB..",".BBBBBBB.","..BBPBB.."],[".........","..BBBBB..",".BBBBBBB.",".BEB.BEB."],[".........","..BBBBB..",".BBBBBBB.",".BBBBBBB."],[".........","...BBB...","..BBBBB..","..BBBBB.."],[".........",".........","..B...B..","..B...B.."],[".........",".........","..B...B..","..B...B.."],[".........",".........","..P...P..","..P...P.."]]}},xw={id:"duckling",nameKey:"pet.duckling",rarity:"common",model:{palette:{Y:"#ffe28a",y:"#f0c95e",O:"#f5a25d",E:"#2e2433"},layers:[[".......",".......","..O.O.."],["...y...",".YYYYY.",".YYYYY.","..YYY.."],[".......",".YYYYY.","yYYYYYy","..YYY.."],[".......","..YYY..",".YYYYY.","..YYY.."],[".......","..YYY..",".YYYYY.","..EYE..","...O..."],[".......",".......","..YYY..","...Y..."]]},modelFull:{palette:{Y:"#ffe28a",y:"#f0c95e",O:"#f5a25d",E:"#2e2433"},layers:[[".........",".........","..O...O..","..O...O.."],[".........",".........","..YYYYY..","..YyyyY.."],[".........",".........",".YYYYYYY.",".YyyyyyY."],[".........",".........","YYYYYYYYY",".YyyyyyY."],[".........",".........",".YYYYYYY.",".YYYYYYY."],[".........","..YYYYY..",".YYYYYYY.",".YYYYYYY."],[".........","..YYYYY..",".YYYYYYY.","..YYYYY..","...OOO..."],[".........","..YYYYY..",".YYYYYYY.",".YEYYYEY."],[".........","..YYYYY..",".YYYYYYY.",".YYYYYYY."],[".........","...YYY...","..YYYYY..","..YYYYY.."],[".........",".........","....y....","....Y...."]]}},ww={id:"kitten",nameKey:"pet.kitten",rarity:"common",model:{palette:{G:"#cfd4dd",g:"#aeb4c0",P:"#ffc2d1",E:"#2e2433"},layers:[[".......",".GGGGG.",".GGGGG.",".GGGGG."],[".g.....",".GGGGG.",".GGGGG.",".GGGGG."],[".g.....","..GGG..",".GGGGG.",".GEPEG."],[".g.....","..GGG..",".GGGGG.",".GGGGG."],[".......",".......","..GGG..","..GGG.."],[".......",".......","..G.G.."],[".......",".......","..P.P.."]]},modelFull:{palette:{G:"#cfd4dd",g:"#aeb4c0",P:"#ffc2d1",E:"#2e2433"},layers:[[".........",".........","..GG.GG..","..gg.gg.."],[".....g...",".........","..GGGGG..","..GgggG.."],["......g..",".........",".GGGGGGG.",".GgggggG."],["......g..",".........","GGGGGGGGG",".GgggggG."],[".........",".........",".GGGGGGG.",".GGGGGGG."],[".........","..GGGGG..",".GGGGGGG.",".GGGGGGG."],[".........","..GGGGG..",".GGGGGGG.","..GGPGG.."],[".........","..GGGGG..",".GGGGGGG.",".GEG.GEG."],[".........","..GGGGG..",".GGGGGGG.",".GGGGGGG."],[".........",".G.....G.",".GGGGGGG.",".GGGGGGG."],[".........",".........",".g.....g.",".g.....g."]]}},Sw={id:"piglet",nameKey:"pet.piglet",rarity:"common",model:{palette:{P:"#f9b8c4",p:"#e895a8",N:"#e87a96",E:"#2e2433"},layers:[[".......",".PPPPP.",".PPPPP.",".PPPPP."],["...p...",".PPPPP.",".PPPPP.",".PPPPP.","..NNN.."],[".......","..PPP..",".PPPPP.",".PEPEP."],[".......","..PPP..",".PPPPP.","..PPP.."],[".......",".......","..PPP.."],[".......",".......","..p.p.."]]},modelFull:{palette:{P:"#f9b8c4",p:"#e895a8",N:"#e87a96",E:"#2e2433"},layers:[[".........",".........","..PP.PP..","..pp.pp.."],["......p..",".........","..PPPPP..","..PpppP.."],["......p..",".........",".PPPPPPP.",".PpppppP."],[".........",".........","PPPPPPPPP",".PpppppP."],[".........",".........",".PPPPPPP.",".PPPPPPP."],[".........","..PPPPP..",".PPPPPPP.",".PPPPPPP."],[".........","..PPPPP..",".PPPPPPP.","..PPPPP..","...NNN..."],[".........","..PPPPP..",".PPPPPPP.",".PEPPPEP."],[".P.....P.","..PPPPP..",".PPPPPPP.",".PPPPPPP."],[".........",".........",".p.....p.",".p.....p."]]}},Mw={id:"redpanda",nameKey:"pet.redpanda",rarity:"rare",model:{palette:{O:"#e8875a",f:"#fff1dc",d:"#5d4037",E:"#2e2433"},layers:[[".......",".d...d.",".......",".d...d."],["...O...",".OOOOO.",".OOOOO.",".OOOOO."],["...d...",".OOOOO.",".OOOOO.",".OOOOO."],["...O...","..OOO..",".OOOOO.",".OfffO."],[".......","..OOO..",".OOOOO.",".fEOEf.","...d..."],[".......",".......","..OOO..","..OOO.."],[".......",".......","..d.d.."]]},modelFull:{palette:{O:"#e8875a",f:"#fff1dc",d:"#5d4037",E:"#2e2433"},layers:[[".........",".........","..d...d..","..d...d.."],["......d..",".........","..OOOOO..","..OfffO.."],["......O..",".........",".OOOOOOO.",".OfffffO."],["......d..",".........","OOOOOOOOO",".OfffffO."],["......O..",".........",".OOOOOOO.",".OfffffO."],[".........","..OOOOO..",".OOOOOOO.",".OfffffO."],[".........","..OOOOO..",".OfffffO.","..ffdff.."],[".........","..OOOOO..",".OfffffO.",".fEf.fEf."],[".........","..OOOOO..",".OOOOOOO.",".OOOOOOO."],[".........",".O.....O.",".f.....f.",".f.....f."]]}},Ew={id:"turtle",nameKey:"pet.turtle",rarity:"rare",model:{palette:{G:"#7cc08a",g:"#5fa46e",K:"#cfe8a8",E:"#2e2433"},layers:[[".......",".K...K.",".......",".K...K."],[".......",".GGGGG.",".GGGGG.",".GGGGG.","..KKK.."],[".......",".GGGGG.",".GGGGG.",".GGGGG.","..EKE.."],[".......","..GgG..",".gGGGg.","..GgG.."],[".......",".......","..GGG.."],[".......",".......","...g..."]]},modelFull:{palette:{G:"#7cc08a",g:"#5fa46e",K:"#cfe8a8",E:"#2e2433"},layers:[["...........","...........",".gg.....gg.",".gg.....gg."],["...........","..GGGGGGG..",".GGGGGGGGG.",".GGGGGGGGG.","....KKK...."],["...........","..GKGKGKG..",".GGGGGGGGG.","..GGGGGGG..","...KEKEK..."],["...........","...GGGGG...","..GgGgGgG..","...GGGGG..."],["...........","...........","....GGG....","....ggg...."]]}},Tw={id:"owl",nameKey:"pet.owl",rarity:"epic",model:{palette:{O:"#a99bc9",o:"#8d7fb0",f:"#f5ead7",B:"#f5a25d",E:"#2e2433",W:"#ffffff"},layers:[[".......",".......","..B.B.."],[".......",".OOOOO.",".OOOOO.",".OfffO."],[".......",".OOOOO.","oOOOOOo",".OfffO."],[".......",".OOOOO.","oOOOOOo",".OfffO."],[".......",".OOOOO.",".OOOOO.",".fEfEf.","...B..."],[".......",".OOOOO.",".OOOOO.",".fWfWf."],[".......","..OOO..",".OOOOO.","..OOO.."],[".......",".......",".o...o."]]},modelFull:{palette:{O:"#a99bc9",o:"#8d7fb0",f:"#f5ead7",B:"#f5a25d",E:"#2e2433",W:"#ffffff"},layers:[[".........",".........","..B...B..","..B...B.."],[".........",".........","..OOOOO..","..OfffO.."],[".........",".........","oOOOOOOOo",".OfffffO."],[".........",".........","oOOOOOOOo",".OfffffO."],[".........",".........",".OOOOOOO.",".OfffffO."],[".........","..OOOOO..",".OfffffO.",".OfffffO."],[".........","..OOOOO..",".OfffffO.",".EEfBfEE."],[".........","..OOOOO..",".OfffffO.",".WWfffWW."],[".........","o.......o",".OOOOOOO.",".OOOOOOO."]]}},Aw={id:"dragon",nameKey:"pet.dragon",rarity:"legendary",model:{palette:{M:"#9fe2c0",w:"#cfeede",B:"#f7f3d7",P:"#ffb3c6",E:"#2e2433"},layers:[["...MM....",".........","..MM.MM.."],["....M....","..MMMMM..","..MMMMM..","..MBBBM.."],[".........","..MMMMM..",".wMMMMMw.","..MBBBM.."],[".........","..MMMMM..",".wMMMMMw.","..MMMMM.."],[".........","..MMMMM..",".MMMMMMM.","..MMMMM..","...BBB..."],[".........","..MMMMM..",".MMMMMMM.",".MEMMMEM."],[".........","..MMMMM..",".MMMMMMM.",".MMMMMMM."],[".........",".........","..MMMMM..","..MMMMM.."],[".........",".........","...P.P..."]]},modelFull:{palette:{M:"#9fe2c0",w:"#cfeede",B:"#f7f3d7",P:"#ffb3c6",E:"#2e2433"},layers:[[".........",".........","..MM.MM..","..ww.ww.."],["......w..",".........","..MMMMM..","..MBBBM.."],[".......w.",".........",".MMMMMMM.",".MBBBBBM."],["......w..",".........","MMMMMMMMM",".MBBBBBM."],[".........","wM.....Mw",".MMMMMMM.",".MBBBBBM."],[".........","..MMMMM..",".MMMMMMM.",".MMMMMMM."],[".........","..MMMMM..",".MMMMMMM.","..MMMMM..","...BBB..."],[".........","..MMMMM..",".MMMMMMM.",".MEMMMEM."],[".........","..MMMMM..",".MMMMMMM.",".MMMMMMM."],[".........",".........","..P...P..","..P...P.."]]}},Ic={mimi:up,crab:bw,crabKing:vw},so=[yw,xw,ww,Sw,Mw,Ew,Tw,Aw],Rw=11,Cw={bounce:1,idleSpeed:1,celebrate:"happy-spin",shyDistance:1.4,scaleSquash:.05},kw={monkey:{bounce:1.05,idleSpeed:1,celebrate:"cheer-hop",shyDistance:1.4,scaleSquash:.06},mimi:{bounce:1,idleSpeed:1,celebrate:"happy-spin",shyDistance:1.4,scaleSquash:.06},bunny:{bounce:1.15,idleSpeed:1.2,celebrate:"double-hop",shyDistance:1.5,scaleSquash:.06},duckling:{bounce:1,idleSpeed:1,celebrate:"wing-flap",shyDistance:1.2,scaleSquash:.05},kitten:{bounce:.9,idleSpeed:.9,celebrate:"stretch",shyDistance:2,scaleSquash:.05},piglet:{bounce:1,idleSpeed:1,celebrate:"wiggle",shyDistance:1.3,scaleSquash:.07},redpanda:{bounce:.95,idleSpeed:1,celebrate:"tail-wiggle",shyDistance:1.8,scaleSquash:.05},turtle:{bounce:.6,idleSpeed:.6,celebrate:"shell-bob",shyDistance:1,scaleSquash:.04},owl:{bounce:.7,idleSpeed:.7,celebrate:"head-swivel",shyDistance:2.2,scaleSquash:.04},dragon:{bounce:1.1,idleSpeed:1.1,celebrate:"sparkle-puff",shyDistance:1.6,scaleSquash:.06}},Bd=i=>({id:i,...kw[i]||Cw}),Pw={id:"monkey",nameKey:"pet.monkey",rarity:"companion",small:gw,full:mw,canBeAvatar:!0,canBePet:!0,companion:!0,isDefault:!0,fur:!0,hat:!0,hatY:Rw,anim:Bd("monkey")},Lw={id:"mimi",nameKey:"pet.mimi",rarity:"companion",small:_w,full:up,canBeAvatar:!0,canBePet:!0,companion:!0,isDefault:!1,fur:!0,hat:!1,anim:Bd("mimi")},Fw=so.map(i=>({id:i.id,nameKey:i.nameKey,rarity:i.rarity,small:i.model,full:i.modelFull||i.model,canBeAvatar:!0,canBePet:!0,companion:!1,isDefault:!1,fur:!1,hat:!1,anim:Bd(i.id)})),Xr=[Pw,Lw,...Fw],Mh=new Map(Xr.map(i=>[i.id,i]));Xr.map(i=>i.id);const ro="monkey",hp=Xr.filter(i=>i.companion).map(i=>i.id);function wi(i){return Mh.get(i)||Mh.get(ro)}const Dw=Xr.filter(i=>i.canBeAvatar),Iw=Xr.filter(i=>i.canBePet),Nd="monkeygrove.save",fp=3,Ow=new Set(["en","nl"]);let ui=null,$i=null,Os=null;function pp(i,e={}){const t=typeof e.avatarPet=="string"&&e.avatarPet?e.avatarPet:null,n=typeof e.avatarCreature=="string"&&e.avatarCreature?e.avatarCreature:ro,s=ni(e.lang,"en"),r=[...new Set([...hp,...t?[t]:[]])];return{id:"p"+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36),name:i,lang:s,avatar:{creature:n,fur:"classic",hat:null,trail:null,pet:t&&t!==n?t:null},bananas:0,egg:{points:0,goal:Lt.eggGoal},pets:r,owned:{hats:[],furs:["classic"],trails:[]},streak:{count:0,lastDay:null,freezes:0,giftDay:null},island:Cc(),story:Xf(),curriculum:to({age:e.age,birthDate:e.birthDate,packId:e.packId,today:e.today||Ks()}),business:ap(),stage:Dc(),math:Md(),stats:{chambers:0,correct:0,wrong:0,msPlayed:0,berries:0,days:0},flags:e.placementWarmup?{needsPlacementWarmup:!0}:{},created:Date.now()}}function Oc(){return{lang:Zr(),sfx:!0,music:!0,reduceMotion:null,dyslexiaFont:!1,highContrast:!1,colorblind:!1,textScale:1,graphics:"auto",ambience:!0}}function Bw(){return{v:fp,profiles:[],activeProfile:null,settings:Oc()}}function Zr(){return(navigator.language||"en").toLowerCase().startsWith("nl")?"nl":"en"}function ni(i,e="en"){return Ow.has(i)?i:e}const bl="monkeygrove.save.corrupt";function To(){if(globalThis.localStorage)return globalThis.localStorage;try{if(localStorage)return localStorage}catch{}return null}function Eh(i){if(i){try{To()?.setItem(bl,i)}catch{}try{globalThis.localStorage?.setItem(bl,i)}catch{}try{localStorage?.setItem(bl,i)}catch{}}}function Ei(){let i;try{i=To()?.getItem(Nd)??null}catch{i=null}if(ui&&i===$i)return ui;if(i)try{const e=JSON.parse(i);if(e&&e.v>=1&&Array.isArray(e.profiles)&&e.profiles.every(Ut))return ui=Hw(e),$i=i,ui;Eh(i)}catch{Eh(i)}return ui=Bw(),$i=i,ui}const Nw={counting:null,number_bonds:null,big_numbers:"sub_100"};function zw(i){const e=Md();for(const t of i.profiles)if(!(!Ut(t.math)||!Ut(t.math.skills)))for(const[n,s]of Object.entries(Nw)){if(Ut(t.math.skills[n]))continue;const r=structuredClone(e.skills[n]);s&&Ut(t.math.skills[s])&&(r.r=t.math.skills[s].r),t.math.skills[n]=r}return i}function Uw(i){for(const e of i.profiles){const t=e.business;!Ut(t)||Ut(t.bakery)||Ut(t.pizzeria)||(e.business={bakery:{...t,id:"bakery"},pizzeria:Id("pizzeria")})}return i}const Gw={1:zw,2:Uw};function Hw(i,e=Gw,t=fp){let n=Number.isFinite(i.v)?i.v:1;for(;n<t;){const s=e[n];if(!s)break;i=s(i)||i,n+=1}return Ww(i),i.v=n,i}function Ww(i){const e=pp("x");for(const t of i.profiles){const n=t.lang===void 0;for(const l of Object.keys(e))t[l]===void 0&&(t[l]=structuredClone(e[l]));Ut(t.stats)||(t.stats=structuredClone(e.stats)),Ut(t.avatar)||(t.avatar=structuredClone(e.avatar));for(const l of Object.keys(e.stats))t.stats[l]===void 0&&(t.stats[l]=0);for(const l of Object.keys(e.avatar))t.avatar[l]===void 0&&(t.avatar[l]=e.avatar[l]);if(Array.isArray(t.pets))for(const l of hp)t.pets.includes(l)||t.pets.push(l);t.avatar.pet&&t.avatar.pet===t.avatar.creature&&(t.avatar.pet=null),t.lang=ni(n?void 0:t.lang,ni(i.settings?.lang,Zr())),Ut(t.curriculum)||(t.curriculum=to());const s=t.curriculum.ageCapturedOn||Vw(t.created),r=to({age:t.curriculum.ageAtStart,birthDate:t.curriculum.birthDate,packId:t.curriculum.packId,today:s});for(const l of Object.keys(r))t.curriculum[l]===void 0&&(t.curriculum[l]=structuredClone(r[l]));t.curriculum.packId=r.packId;const a=r.estimatedStage||Fd(r.packId,t.curriculum.ageAtStart);(t.curriculum.estimatedStage===void 0||t.curriculum.estimatedStage===null)&&(t.curriculum.estimatedStage=a),(t.curriculum.confirmedStage===void 0||t.curriculum.confirmedStage===null)&&(t.curriculum.confirmedStage=r.confirmedStage||a);const o=new Set(xn(t.curriculum.packId).stages.map(l=>l.id));if(o.has(t.curriculum.estimatedStage)||(t.curriculum.estimatedStage=a),o.has(t.curriculum.confirmedStage)||(t.curriculum.confirmedStage=r.confirmedStage||a),t.curriculum.stageSource=t.curriculum.confirmedStage!==t.curriculum.estimatedStage?"parent":t.curriculum.stageSource||"auto",Ut(t.curriculum.warmup)||(t.curriculum.warmup={}),t.curriculum.warmup.completed===void 0&&(t.curriculum.warmup.completed=!1),t.curriculum.warmup.results===void 0&&(t.curriculum.warmup.results=[]),t.curriculum.warmup.skillIds===void 0&&(t.curriculum.warmup.skillIds=[]),!Ut(t.math)||!Ut(t.math.skills))t.math=Md();else for(const l of Object.keys(cn))Ut(t.math.skills[l])||(t.math.skills[l]=structuredClone(e.math.skills[l]));io(t),sw(t)}if(!Ut(i.settings))i.settings=Oc();else{const t=Oc();for(const n of Object.keys(t))i.settings[n]===void 0&&(i.settings[n]=t[n])}}function Ut(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function Vw(i){const e=Number(i);if(!Number.isFinite(e))return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:Ks(t)}function qe(){if(Os)return;const i=To();Os=setTimeout(()=>{Os=null;try{$i=JSON.stringify(ui),i?.setItem(Nd,$i)}catch{}},250)}function Wn(){Os&&(clearTimeout(Os),Os=null);try{$i=JSON.stringify(ui),To()?.setItem(Nd,$i)}catch{}}function Zt(){return Ei().settings}function ao(){return Ei().profiles}function Qr(){const i=Ei(),e=i.profiles.find(t=>t.id===i.activeProfile)||null;return e&&$w(e)&&qe(),e}function $w(i,e=Ks()){if(!i?.curriculum)return!1;const t=JSON.stringify(i.curriculum);return i.curriculum=np(i.curriculum,e),JSON.stringify(i.curriculum)!==t}function jw(i,e={}){const t=Ei(),n=pp(i,{...e,lang:ni(e.lang,ni(t.settings?.lang,Zr()))});return t.profiles.push(n),t.activeProfile=n.id,t.settings.lang=n.lang,Wn(),n}function qw(i){const e=Ei();e.activeProfile=i;const t=e.profiles.find(n=>n.id===i)||null;return t&&(t.lang=ni(t.lang,ni(e.settings?.lang,Zr())),e.settings.lang=t.lang),Wn(),Qr()}function Kw(i){const e=Ei(),t=e.profiles.find(s=>s.id===e.activeProfile)||null,n=ni(i,ni(e.settings?.lang,Zr()));return e.settings.lang=n,t&&(t.lang=n),Wn(),n}function Yw(i){const e=Ei();e.profiles=e.profiles.filter(t=>t.id!==i),e.activeProfile===i&&(e.activeProfile=e.profiles[0]?.id||null),Wn()}function Ks(i=new Date){return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}function mp(){return Ks()}function Xw(i){const e=Ks(),t=i.streak;if(t.lastDay===e)return{kind:"same",gift:(t.giftDay!==e,!1)};const n=Ks(new Date(Date.now()-864e5));let s;t.lastDay?t.lastDay===n?(t.count+=1,s="extended"):t.freezes>0?(t.freezes-=1,t.count+=1,s="frozen"):(t.count=1,s="reset"):(t.count=1,s="first"),t.lastDay=e,i.stats.days+=1;const r=t.giftDay!==e;return t.giftDay=e,qe(),{kind:s,gift:r}}function Bs(i,e){return i.bananas=Math.max(0,i.bananas+e),qe(),i.bananas}function Th(i,e){return i.bananas<e?!1:(i.bananas-=e,qe(),!0)}function Sr(i,e){return i.egg||(i.egg={points:0,goal:Lt.eggGoal}),i.egg.points+=e,qe(),i.egg.points>=i.egg.goal}function Zw(i,e,t=Math.random){const n=e.filter(r=>!i.pets.includes(r.id));if(!n.length)return null;const s=[];for(const r of n){const a=ky[r.rarity]||10;for(let o=0;o<a;o++)s.push(r)}return s[Math.floor(t()*s.length)]}function Qw(i,e){const t=Zw(i,e);return i.egg.points=Math.max(0,i.egg.points-i.egg.goal),i.egg.goal=Math.round(i.egg.goal*1.25),t&&(i.pets.push(t.id),i.avatar.pet||(i.avatar.pet=t.id)),qe(),t}function Jw(i,e,t){const n=i.owned[e];n&&!n.includes(t)&&n.push(t),qe()}function Bc(i,e,t){i.avatar[e]=t,e==="creature"&&i.avatar.pet===t&&(i.avatar.pet=null),qe()}function eS(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function lt(){const i=Zt().reduceMotion;return i==null?eS():!!i}let pr=null;function tS(){if(pr)return pr;if(typeof FontFace>"u"||typeof document>"u"||!document.fonts)return Promise.resolve();const i=(t,n)=>new FontFace("OpenDyslexic",`url("${t}") format("woff2")`,{weight:n,style:"normal",display:"swap"}),e=[i(new URL("/monkeygrove/assets/OpenDyslexic-Regular-nUhe5EwG.woff2",import.meta.url).href,"400"),i(new URL("/monkeygrove/assets/OpenDyslexic-Bold-Bnmt45Ln.woff2",import.meta.url).href,"700 900")];return pr=Promise.all(e.map(t=>t.load().then(n=>document.fonts.add(n)))).catch(t=>{throw pr=null,t}),pr}function Cs(){if(typeof document>"u")return Promise.resolve();const i=Zt(),e=document.documentElement;return e.classList.toggle("reduce-motion",lt()),e.classList.toggle("high-contrast",!!i.highContrast),e.classList.toggle("colorblind",!!i.colorblind),e.style.setProperty("--text-scale",String(Number(i.textScale)>0?i.textScale:1)),i.dyslexiaFont?tS().catch(()=>{}).then(()=>e.classList.add("dyslexia")):(e.classList.remove("dyslexia"),Promise.resolve())}const Nc=["auto","low","medium","high"];function gp(){return Py}const vl={low:{tier:"low",shadows:!1,shadowMapSize:0,contactShadows:!0,toneMap:!1,fog:!1,bloom:!1,bloomHalfRes:!1,glowSprites:!0,dof:!1,decorDensity:0,ambientScale:.35,water:"flat",npcRoutines:"limited",cameraMoments:"minimal",perspectiveHub:!1},medium:{tier:"medium",shadows:!0,shadowMapSize:1024,contactShadows:!0,toneMap:!0,fog:!0,bloom:!1,bloomHalfRes:!1,glowSprites:!0,dof:!1,decorDensity:1,ambientScale:.75,water:"animated",npcRoutines:"full",cameraMoments:"full",perspectiveHub:!1},high:{tier:"high",shadows:!0,shadowMapSize:2048,contactShadows:!0,toneMap:!0,fog:!0,bloom:!0,bloomHalfRes:!0,glowSprites:!0,dof:!0,decorDensity:2,ambientScale:1,water:"animated",npcRoutines:"full",cameraMoments:"full",perspectiveHub:!1}};function _p({tier:i="high",setting:e="auto",reducedMotion:t=!1}={}){const r={...vl[e==="auto"?i:e]||vl[i]||vl.high,reducedMotion:!!t};return t&&(r.ambientScale=Math.min(r.ambientScale,.35),r.dof=!1,r.cameraMoments="minimal",r.water="flat",r.npcRoutines==="full"&&(r.npcRoutines="limited")),Object.freeze(r)}function bp(i=Ie,e=i?.reducedMotion){return!i||e||i.tier==="low"?0:Math.max(0,i.ambientScale||0)}function vp(){try{const i=Zt()?.graphics;return Nc.includes(i)?i:"auto"}catch{return"auto"}}function yp(){try{return lt()}catch{return!1}}let Ie=_p({tier:gp(),setting:vp(),reducedMotion:yp()});function nS(){return Ie=_p({tier:gp(),setting:vp(),reducedMotion:yp()}),Ie}const ci={sunIntensity:1.25,fillIntensity:.25,hemiIntensity:.95,exposure:1.18,bloomIntensity:1,waterSpeed:1,ambientScale:1},iS=12577015,xp=15398651;function sS({top:i=iS,horizon:e=xp,radius:t=160,exponent:n=.7}={}){const s=new yd(t,24,16),r=new Pe(i),a=new Pe(e),o=s.attributes.position,l=new Float32Array(o.count*3),c=new Pe;for(let h=0;h<o.count;h++){const f=o.getY(h)/t,g=Math.pow(Math.max(0,f),n);c.copy(a).lerp(r,g),l[h*3]=c.r,l[h*3+1]=c.g,l[h*3+2]=c.b}s.setAttribute("color",new Xt(l,3));const d=new ss({vertexColors:!0,side:Yt,fog:!1,depthWrite:!1}),u=new Ft(s,d);return u.frustumCulled=!1,u.renderOrder=-1,u.name="skydome",u}const rS=[{dir:[1,0,0],corners:[[1,1,1],[1,0,1],[1,1,0],[1,0,0]]},{dir:[-1,0,0],corners:[[0,1,0],[0,0,0],[0,1,1],[0,0,1]]},{dir:[0,1,0],corners:[[0,1,1],[1,1,1],[0,1,0],[1,1,0]]},{dir:[0,-1,0],corners:[[0,0,0],[1,0,0],[0,0,1],[1,0,1]]},{dir:[0,0,1],corners:[[0,1,1],[0,0,1],[1,1,1],[1,0,1]]},{dir:[0,0,-1],corners:[[1,1,0],[1,0,0],[0,1,0],[0,0,0]]}],aS=[1,.8,.64,.5];function Mr(i,e,t){return i+"|"+e+"|"+t}function oS(i){const e=new Map,t={},n=i.palette;let s=0,r=0;return i.layers.forEach((a,o)=>{a.forEach((l,c)=>{for(let d=0;d<l.length;d++){const u=l[d];if(!(u==="."||u===" ")){if(!t[u]){const h=n[u];if(!h)continue;t[u]=new Pe(h)}e.set(Mr(d,o,c),t[u]),d>s&&(s=d),c>r&&(r=c)}}})}),{voxels:e,sizeX:s+1,sizeY:i.layers.length,sizeZ:r+1}}function lS(i,e,t,n,s,r){const a=[e+r[0],t+r[1],n+r[2]],o=[s[0]===1?1:-1,s[1]===1?1:-1,s[2]===1?1:-1],l=[0,1,2].filter(_=>r[_]===0),c=[...a];c[l[0]]+=o[l[0]];const d=[...a];d[l[1]]+=o[l[1]];const u=[...a];u[l[0]]+=o[l[0]],u[l[1]]+=o[l[1]];const h=i.has(Mr(c[0],c[1],c[2]))?1:0,f=i.has(Mr(d[0],d[1],d[2]))?1:0;if(h&&f)return 3;const g=i.has(Mr(u[0],u[1],u[2]))?1:0;return h+f+g}function cS(i,e={}){const{voxelSize:t=1,centerXZ:n=!0,ao:s=!0}=e,{voxels:r,sizeX:a,sizeZ:o}=oS(i),l=[],c=[],d=[],u=[];let h=0;const f=n?-a/2:0,g=n?-o/2:0;for(const[m,p]of r){const[w,E,x]=m.split("|").map(Number);for(const A of rS){const[k,R,O]=A.dir;if(r.has(Mr(w+k,E+R,x+O)))continue;const y=[];for(const S of A.corners){l.push((w+S[0]+f)*t,(E+S[1])*t,(x+S[2]+g)*t),c.push(k,R,O);const F=s?lS(r,w,E,x,S,A.dir):0;y.push(F);const z=aS[F];d.push(p.r*z,p.g*z,p.b*z)}y[0]+y[3]>y[1]+y[2]?u.push(h+1,h+3,h+0,h+3,h+2,h+0):u.push(h+0,h+1,h+2,h+1,h+3,h+2),h+=4}}const _=new yn;return _.setAttribute("position",new un(l,3)),_.setAttribute("normal",new un(c,3)),_.setAttribute("color",new un(d,3)),_.setIndex(u),_.computeBoundingSphere(),_}let yl=null;function dS(){return yl||(yl=new Kr({vertexColors:!0})),yl}const oo={uTime:{value:0},uWindAmp:{value:0}};let Ts=null;function uS(){return Ts||(Ts=new Kr({vertexColors:!0}),Ts.onBeforeCompile=i=>{i.uniforms.uTime=oo.uTime,i.uniforms.uWindAmp=oo.uWindAmp,i.vertexShader=`uniform float uTime;
uniform float uWindAmp;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",["#include <begin_vertex>","#ifdef USE_INSTANCING","  float wphase = instanceMatrix[3][0] * 0.7 + instanceMatrix[3][2] * 0.9;","#else","  float wphase = 0.0;","#endif","  float wsway = max(transformed.y, 0.0) * uWindAmp;","  transformed.x += sin(uTime * 1.6 + wphase) * wsway;","  transformed.z += cos(uTime * 1.2 + wphase) * wsway * 0.6;"].join(`
`))},Ts._cached=!0,Ts)}function hS(i,e){oo.uTime.value=i,oo.uWindAmp.value=e}const xl=new Map;function Si(i,e={}){let t;e.cacheKey&&xl.has(e.cacheKey)?t=xl.get(e.cacheKey):(t=cS(i,e),e.cacheKey&&(t._cached=!0,xl.set(e.cacheKey,t)));const n=new Ft(t,dS());return n.castShadow=e.castShadow!==!1,n.receiveShadow=e.receiveShadow===!0,n}function Ur(i,e){return{palette:{...i.palette,...e},layers:i.layers}}const nt={linear:i=>i,inQuad:i=>i*i,outQuad:i=>i*(2-i),outCubic:i=>1+--i*i*i,outBack:i=>1+(1.70158+1)*Math.pow(i-1,3)+1.70158*Math.pow(i-1,2)},lo=new Set;function Qe(i){const e={t:-(i.delay||0),ms:i.ms||300,from:i.from??0,to:i.to??1,ease:i.ease||nt.outQuad,onUpdate:i.onUpdate,onDone:i.onDone,cancelled:!1,cancel(){this.cancelled=!0,lo.delete(this)}};return lo.add(e),e}function fS(i){for(const e of[...lo]){if(e.cancelled||(e.t+=i,e.t<0))continue;const t=Math.min(1,e.t/e.ms),n=e.from+(e.to-e.from)*e.ease(t);e.onUpdate?.(n,t),t>=1&&(lo.delete(e),e.onDone?.())}}function St(i,e){return Qe({ms:i,onUpdate:()=>{},onDone:e})}function wl(i,e=.2){const t=Math.sin(Math.max(0,Math.min(1,i))*Math.PI);return{sy:1+e*t,sxz:1-e*.6*t}}function wp(i,e=.1,t=3){const n=Math.max(0,Math.min(1,i));return Math.sin(n*t*Math.PI)*e*(1-n)}function Sp(i){if(i<.15){const n=1-.25*(i/.15);return{sy:n,sxz:1+.18*(1-n)*4}}if(i<.6){const n=(i-.15)/.45;return{sy:1+.22*Math.sin(n*Math.PI),sxz:1-.1*Math.sin(n*Math.PI)}}const e=(i-.6)/.4,t=Math.sin(e*Math.PI);return{sy:1-.18*t,sxz:1+.12*t}}const zd=new P(1,1.15,1).normalize(),zc=40,pS=zd.clone().multiplyScalar(zc),Gr=zd.clone().negate(),Mp=new P(0,1,0).projectOnPlane(Gr).normalize(),mS=Math.abs(new P().crossVectors(Gr,Mp).x),gS=Math.abs(Mp.x),co=new P(-Gr.z,0,Gr.x).normalize(),Uc=new P().crossVectors(co,Gr).setComponent(1,0).normalize(),_S=[[1,0],[-1,0],[0,1],[0,-1]].map(([i,e])=>[i,e,i*co.x+e*co.z,i*Uc.x+e*Uc.z]);function bS(i,e){if(i===0&&e===0)return null;let t=null,n=-1/0;for(const[s,r,a,o]of _S){const l=a*i+o*e;l>n&&(n=l,t=[s,r])}return t}const Ah=.8,Sl=4,Gc=28,vS=Math.tan(Gc*Math.PI/360);class yS{constructor(e){this.renderer=new Ry({canvas:e,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.shadows=Ie.shadows,this.shadows&&(this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=nf),this.toneMap=Ie.toneMap,this.toneMap&&(this.renderer.toneMapping=sf,this.renderer.toneMappingExposure=ci.exposure),this.scene=new Pg,this.scene.background=null,this.sky=null,this.fog=null,this.toneMap&&(this.sky=sS(),this.scene.add(this.sky)),Ie.fog&&(this.fog=new _d(xp,60,160),this.scene.fog=this.fog),this.orthoCam=new xd(-10,10,10,-10,.1,200),this.perspCam=Ie.perspectiveHub?new _n(Gc,1,.1,400):null,this.camera=this.orthoCam,this.perspDist=zc,this._perspOff=new P,this.span=14,this.fitBoard=null,this.target=new P,this.goal=new P,this.followObj=null,this.shakeAmp=0,this.zoom=1,this.defaultZoom=1,this.pan=new P,this.panLimit=new P(16,0,16),this.boardCenter=new P,this.followMode=null,this.aspect=1,this.toneMap&&(ci.sunIntensity=1.45,ci.fillIntensity=.36,ci.hemiIntensity=1.05);const t=new Gg(15398655,13494976,ci.hemiIntensity);if(this.hemi=t,this.scene.add(t),this.sun=new Ou(16773848,ci.sunIntensity),this.sun.position.set(8,14,5),this.shadows){this.sun.castShadow=!0;const n=Ie.shadowMapSize||1024;this.sun.shadow.mapSize.set(n,n),this.sun.shadow.bias=n>=2048?-9e-4:-.0015,this.sun.shadow.normalBias=.02}this.scene.add(this.sun),this.scene.add(this.sun.target),this.fill=new Ou(12572927,ci.fillIntensity),this.fill.position.set(-6,8,-4),this.scene.add(this.fill),this.raycaster=new $g,this.pickables=[],this.composer=null,window.addEventListener("resize",()=>this.resize()),this.resize(),(Ie.bloom||Ie.dof)&&this._initComposer()}async _initComposer(){if(!this._composerInit){this._composerInit=!0;try{const{createComposer:e}=await yr(async()=>{const{createComposer:n}=await import("./postfx-DtBvQFhT.js");return{createComposer:n}},[]),t=await e(this.renderer,{width:window.innerWidth,height:window.innerHeight,halfRes:Ie.bloomHalfRes,amount:.3*(ci.bloomIntensity||1)});t&&(t.setSize(window.innerWidth,window.innerHeight),this.camera.isPerspectiveCamera&&Ie.dof&&t.setDofParams({focus:this.perspDist}),this.composer=t)}catch{this.composer=null}}}resize(){const e=window.innerWidth,t=window.innerHeight;if(this.renderer.setSize(e,t,!1),this.composer?.setSize(e,t),this.aspect=e/t,this.fitBoard){const n=(this.fitBoard.w+this.fitBoard.d)*Dt,s=n*mS+1.5,r=n*gS+2.5;this.span=Math.max(r,s/this.aspect)}this._applyProjection()}_applyProjection(){const e=this.aspect||1,t=this.fitBoard?this.span:Math.max(this.span,this.span*1.15/e);this.baseVSpan=t;const n=t/this.zoom;let s=zc;this.camera.isPerspectiveCamera?(s=this.perspDist=n/(2*vS),this.camera.fov=Gc,this.camera.aspect=e,this.camera.near=.1,this.camera.far=400,this.camera.updateProjectionMatrix(),this.composer&&Ie.dof&&this.composer.setDofParams({focus:this.perspDist})):(this.camera.top=n/2,this.camera.bottom=-n/2,this.camera.left=-n*e/2,this.camera.right=n*e/2,this.camera.updateProjectionMatrix()),this.fog&&(this.fog.near=s+t*1.1,this.fog.far=s+t*3.2)}_useCamera(e){!e||this.camera===e||(this.camera=e)}setSpan(e){this.span=e,this.resize()}setZoom(e){this.zoom=Math.max(Ah,Math.min(Sl,e)),this._clampPan(),this._applyProjection()}zoomBy(e){this.setZoom(this.zoom*e)}panByPixels(e,t){const n=(this.camera.top-this.camera.bottom)/(window.innerHeight||1);this.pan.addScaledVector(co,-e*n),this.pan.addScaledVector(Uc,t*n),this._clampPan()}_clampPan(){const e=Math.max(0,Math.min(1,(this.zoom-1)/(Sl-1))),t=this.panLimit.x*e,n=this.panLimit.z*e;this.pan.x=Math.max(-t,Math.min(t,this.pan.x)),this.pan.z=Math.max(-n,Math.min(n,this.pan.z))}resetCamera(){this.zoom=Math.max(Ah,Math.min(Sl,this.defaultZoom||1)),this.pan.set(0,0,0),this._applyProjection()}lookAt(e,t){this._useCamera(this.perspCam||this.orthoCam),this.fitBoard=null,this.followObj=null,this.followMode=null,this.boardCenter.copy(e),this.goal.copy(e),this.target.copy(e),t&&(this.span=t),this.resetCamera(),this.resize(),this._place()}follow(e,t,n){this._useCamera(this.perspCam||this.orthoCam),this.fitBoard=null,this.followObj=e,this.followMode="always",this.panLimit.set(n?.x??16,0,n?.z??16),t&&(this.span=t),this.target.copy(e.position),this.goal.copy(e.position),this.resetCamera(),this.resize(),this._place()}frameBoard(e,t,n,s=null){this._useCamera(this.orthoCam),this.followObj=s,this.followMode=s?"zoomed":null,this.fitBoard={w:t,d:n},this.boardCenter.copy(e),this.panLimit.set(t*Dt*.5,0,n*Dt*.5);const a=s&&(this.defaultZoom||1)>1.05?s.position:e;this.goal.copy(a),this.target.copy(a),this.resetCamera(),this.resize(),this._place()}_place(){const e=this.camera.isPerspectiveCamera?this._perspOff.copy(zd).multiplyScalar(this.perspDist):pS;let t=0,n=0;this.shakeAmp>.001&&(t=(Math.random()-.5)*this.shakeAmp,n=(Math.random()-.5)*this.shakeAmp);const s=this.target.x+this.pan.x+t,r=this.target.y,a=this.target.z+this.pan.z+n;if(this.camera.position.set(s+e.x,r+e.y,a+e.z),this.camera.lookAt(s,r,a),this.sky&&this.sky.position.copy(this.camera.position),this.sun.position.set(s+8,r+14,a+5),this.sun.target.position.set(s,r,a),this.sun.castShadow){const o=(this.baseVSpan||this.span)*.9,l=this.sun.shadow.camera;l.left=-o,l.right=o,l.top=o,l.bottom=-o,l.updateProjectionMatrix()}}shake(e=.15){lt()||(this.shakeAmp=Math.max(this.shakeAmp,e))}cameraShot({fromSpanMul:e=1.25,span:t=null,duration:n=900,ease:s=nt.outCubic,onDone:r=null}={}){if(Ie.cameraMoments==="minimal"||lt()){r?.();return}const a=t??this.span,o=a*e;this._shotTween?.cancel?.(),this._shotTween=Qe({ms:n,ease:s,onUpdate:(l,c)=>{this.span=o+(a-o)*c,this._applyProjection()},onDone:()=>{this.span=a,this._applyProjection(),this._shotTween=null,r?.()}})}update(e){this.followObj&&(this.followMode==="always"||this.zoom>1.05)?this.goal.copy(this.followObj.position):this.goal.copy(this.boardCenter);const t=1-Math.pow(.0015,e/1e3);this.target.lerp(this.goal,t),this.shakeAmp*=Math.pow(5e-4,e/1e3);const n=.06*bp(Ie,lt());hS(this._windT=(this._windT||0)+e/1e3,n),this._place();const s=!!(this.composer&&Ie.dof&&this.camera.isPerspectiveCamera);this.composer&&(Ie.bloom||s)?this.composer.render(this.scene,this.camera,{dof:s}):this.renderer.render(this.scene,this.camera)}dispose(){this._shotTween?.cancel?.(),this.composer?.dispose(),this.composer=null,this.renderer.dispose?.()}pick(e,t){if(!this.pickables.length)return null;const n=this.renderer.domElement.getBoundingClientRect(),s=new He((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1);return this.raycaster.setFromCamera(s,this.camera),this.raycaster.intersectObjects(this.pickables,!0)[0]||null}}const xS=11,Ud=[{id:"cap",nameKey:"hat.cap",price:25,dy:0,model:{palette:{C:"#6fb7e8",c:"#5a9fd0"},layers:[[".......",".CCCCC.",".CCCCC.",".CCCCC.",".ccccc."],[".......","..CCC..",".CCCCC.","..CCC.."],[".......",".......","...C..."]]}},{id:"bow",nameKey:"hat.bow",price:40,dy:0,model:{palette:{P:"#f7a8c4",p:"#e88bb0"},layers:[[".......",".......","PPPpPPP","PP...PP"],[".......",".......","PP...PP"]]}},{id:"beanie",nameKey:"hat.beanie",price:60,dy:0,model:{palette:{B:"#f0907a",b:"#d97863",w:"#fdf6ec"},layers:[[".......",".bbbbb.",".bbbbb.",".bbbbb."],[".......","..BBB..",".BBBBB.","..BBB.."],[".......",".......","..BBB.."],[".......",".......","...w..."]]}},{id:"party",nameKey:"hat.party",price:80,dy:0,model:{palette:{A:"#8fd0e8",P:"#f7a8c4",w:"#fff7e0"},layers:[[".......","..AAA..",".AAAAA.","..AAA.."],[".......","...P...","..PPP..","...P..."],[".......",".......","...A..."],[".......",".......","...w..."]]}},{id:"flowercrown",nameKey:"hat.flowercrown",price:120,dy:0,model:{palette:{V:"#7cc08a",P:"#ffb3c6",Y:"#ffe28a",L:"#c9a6ff"},layers:[[".......",".VPYPV.",".Y...Y.",".VLYLV."]]}},{id:"pirate",nameKey:"hat.pirate",price:150,dy:0,model:{palette:{D:"#4a5a78",B:"#ffe28a"},layers:[[".......",".DDDDD.","DDDDDDD",".DDBDD."],[".......",".......","D.DDD.D"],[".......",".......","..DDD.."]]}},{id:"wizard",nameKey:"hat.wizard",price:200,dy:0,model:{palette:{Z:"#9b8ad0",S:"#ffe28a"},layers:[[".ZZZZZ.","ZZZZZZZ","ZZZZZZZ","ZZZZZZZ",".ZZZZZ."],[".......",".ZZZZZ.",".ZZSZZ.",".ZZZZZ."],[".......","..ZZZ..","..ZZZ..","..ZZZ.."],[".......",".......","...Z..."],[".......",".......","....Z.."]]}},{id:"crown",nameKey:"hat.crown",price:300,dy:0,model:{palette:{G:"#f4c95d",J:"#f78bb0"},layers:[[".......",".GGGGG.",".G...G.",".GGGGG."],[".......",".G.G.G.",".......",".G.G.G."],[".......",".......",".......","...J..."]]}}],Hc=[{id:"classic",nameKey:"fur.classic",price:0,palette:{F:"#8a5a3b",f:"#f0d6b3"}},{id:"golden",nameKey:"fur.golden",price:60,palette:{F:"#e8b04f",f:"#ffe9b8"}},{id:"snow",nameKey:"fur.snow",price:60,palette:{F:"#f0ede6",f:"#ffffff"}},{id:"pink",nameKey:"fur.pink",price:80,palette:{F:"#f49bbb",f:"#ffd9e6"}},{id:"lavender",nameKey:"fur.lavender",price:80,palette:{F:"#b39ddb",f:"#e6dcf5"}},{id:"mint",nameKey:"fur.mint",price:80,palette:{F:"#8fd4ae",f:"#dcf5e8"}},{id:"redpanda",nameKey:"fur.redpanda",price:100,palette:{F:"#e8875a",f:"#fff1dc"}},{id:"midnight",nameKey:"fur.midnight",price:150,palette:{F:"#4a4a6a",f:"#9b9bc4"}}],wS=[{id:"sparkle",nameKey:"trail.sparkle",price:60,color:"#ffd966"},{id:"petal",nameKey:"trail.petal",price:100,color:"#ffb3c6"},{id:"bubble",nameKey:"trail.bubble",price:100,color:"#9bd6ff"},{id:"star",nameKey:"trail.star",price:200,color:"#c9a6ff"}],SS={palette:{T:"#b08a5f",t:"#8f6d49",L:"#5fb46a",l:"#8fd18a",C:"#7a5a3f"},layers:[["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....tt.....",".....tt....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....tt.....",".....tt....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....tt.....",".....tt....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],[".....ll.....",".l........l.","............","............","............","l....TT....l","l....TT....l",".....CC.....","............","............",".l........l.",".....ll....."],["............",".....LL.....","..l..LL..l..","...l.LL.l...",".....LL.....",".LLL.LL.LLL.",".LLL.LL.LLL.",".....LL.....","...l.LL.l...","..l..LL..l..",".....LL....."],["............","............","............","....LLLL....","...LLLLLL...","...LLLLLL...","...LLLLLL...","...LLLLLL...","....LLLL...."],["............","............","............","............","....llll....","....llll....","....llll....","....llll...."]]},MS={palette:{T:"#b08a5f",t:"#8f6d49",L:"#5fb46a",l:"#8fd18a",C:"#7a5a3f"},layers:[["........","........","........","...TT...","...TT..."],["........","........","........","...TT...","...TT..."],["........","........","........","...tt...","...tt..."],["........","........","........","...TT...","...TT..."],["........","........","........","...TT...","...TT..."],["...ll...","........","........","l..TT..l","l..TT..l","...C....","........","...ll..."],["........","...LL...","..LLLL..",".LLLLLL.",".LLLLLL.","..LLLL..","...LL..."],["........","........","........","..llll..","..llll.."]]},ES={palette:{L:"#5fb46a",l:"#8fd18a",P:"#f7b8cf"},layers:[[".......",".LLLLL.","LLLLLLL","LLLLLLL","LLLLLLL",".LLLLL."],[".......",".LLLLL.","LLLLLLL","LLLLLLL","LLLLLLL",".LLLPL."],[".......",".......",".LLLLL.",".LlLlL.",".LLLLL."],[".......",".......",".......","..lll.."]]},TS={palette:{V:"#6aa84f",P:"#f7a8c4",C:"#ffe28a"},layers:[["...",".V."],["...",".V."],[".P.","PCP",".P."]]},AS={palette:{V:"#6aa84f",P:"#ffd966",C:"#e8924f"},layers:[["...",".V."],["...",".V."],[".P.","PCP",".P."]]},RS={palette:{V:"#6aa84f",P:"#9bb8ff",C:"#fff1c4"},layers:[["...",".V."],["...",".V."],[".P.","PCP",".P."]]},CS={palette:{g:"#7fc26a",G:"#5fb46a"},layers:[[".g.","gGg",".g."],["...",".G.","..."]]},kS={palette:{g:"#86c970",G:"#62b06a"},layers:[["g.g",".G.","g.g"],["...",".G.","..."],["...",".g.","..."]]},PS={palette:{p:"#b8b2a8",d:"#9a948a"},layers:[[".pp.","pddp",".pp."]]},LS={palette:{S:"#f4f0e6",C:"#e0728a",c:"#c85a72"},layers:[["...",".S.","..."],[".C.","CcC",".C."]]},FS={palette:{C:"#c9a6ff",t:"#e6d6ff"},layers:[["...",".C.","..."],["...",".C.","..."],["...",".t.","..."]]},DS={palette:{D:"#d9906f",d:"#b8714f",c:"#e8a988"},layers:[[".......",".......",".ddddd.",".ddddd.",".ddddd."],[".......",".DDDDD.","DDDDDDD","DDDDDDD","DDDDDDD",".DDDDD."],[".......",".DDDDD.","DDDDDDD","DDDDDDD","DDDDDDD",".DDDDD."],[".......","..DDD..",".DDDDD.",".DDDDD.",".DDDDD.","..DDD.."],[".......","..ccc..",".c...c.",".c...c.",".c...c.","..ccc.."]]},IS={palette:{S:"#e8e2d4",s:"#cfc8b8"},layers:[[".sssss.","sssssss","sssssss"],[".SSSSS.","SSSSSSS","SSSSSSS"],[".SSSSS.","SSSSSSS","SSSSSSS"],[".SSSSS.","SSSSSSS","SSSSSSS"],["..sss..",".SSSSS.",".SSSSS."]]},OS={palette:{G:"#f4c95d",g:"#d9a83f",h:"#ffe9a8"},layers:[[".ggggggg.","ggggggggg","ggggggggg","ggggggggg","ggggggggg","ggggggggg","ggggggggg","ggggggggg",".ggggggg."],[".........",".........","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG.."],[".........",".........","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG.."],[".........",".........","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG.."],[".........",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG."],[".........",".hhhhhhh.",".h.....h.",".h.....h.",".h.....h.",".h.....h.",".h.....h.",".hhhhhhh."]]},BS={palette:{W:"#b07a4a",w:"#8f5f38",G:"#f4c95d"},layers:[["wwwwwww","wwwwwww","wwwwwww","wwwwwww","wwwwwww"],["WWWWWWW","W.....W","W.....W","W.....W","WWWWWWW"],["WWWWWWW","W.....W","W.....W","W.....W","WWWGWWW"]]},NS={palette:{W:"#b07a4a",w:"#8f5f38",G:"#f4c95d"},layers:[["WWWWWWW","WWWWWWW","WWWWWWW","WWWWWWW","WWWGWWW"],[".......",".WWWWW.",".WWWWW.",".WWWWW."]]},zS={palette:{Q:"#fdf2e0",M:"#bfe8d2"},layers:[[".....",".QQQ.",".QQQ.",".QQQ."],[".QQQ.","QQQQQ","QQQQQ","QQQQQ",".QQQ."],[".QQQ.","MQQQQ","QQQQQ","QQQQQ",".QMQ."],[".QQQ.","QQQQQ","QQQQM","QQQQQ",".QQQ."],[".....",".QQQ.",".QQQ.",".QMQ."],[".....",".....","..Q.."]]},US={palette:{B:"#c9985f",b:"#a87a45"},layers:[[".BBBB.","BBBBBB","BBBBBB","BBBBBB","BBBBBB",".BBBB."],[".bBBb.","B....B","b....b","B....B","b....b",".bBBb."],[".BbbB.","b....b","B....B","b....b","B....B",".BbbB."],[".bbbb.","b....b","b....b","b....b","b....b",".bbbb."]]},GS={palette:{C:"#8a6845",c:"#6e5236"},layers:[["....",".cc.",".cc."],[".CC.","CCCC","CCCC",".CC."],["....",".CC.",".CC."]]},HS={palette:{Y:"#ffd95e",y:"#e8b840",g:"#6aa84f"},layers:[[".....",".YYY."],[".....","YYYYY",".YYY."],[".....",".yYy.","..Y.."],[".....","..g.."]]},WS={palette:{K:"#9a6b4f",k:"#7d5540",D:"#d9b88f",d:"#c4a070"},layers:[[".......",".KKKKK.","KKKKKKK","KKKKKKK","KKKKKKK",".KKKKK."],[".......",".KKKKK.","kKKKKKk","KKKKKKK","kKKKKKk",".KKKKK."],[".......",".KKKKK.","KKKKKKK","KKKKKKK","KKKKKKK",".KKKKK."],[".......",".DDDDD.","DDdddDD","DDdDdDD","DDdddDD",".DDDDD."]]},VS={palette:{K:"#9a6b4f",G:"#f4c95d",g:"#d9a83f"},layers:[["KK...KK","KK...KK"],[".......","K.....K","..GGG.."],[".......","K.....K",".GGGGG."],[".......","K.....K",".GGgGG."],[".......","K.....K",".GGGGG."],[".......","K.....K","..GGG.."],[".......","KKKKKKK","...K..."]]},$S={palette:{W:"#c9985f",w:"#a87a45"},layers:[["WWWWWWW","WwWWWwW","WWWWWWW"]]},jS={palette:{P:"#b8b2a8",p:"#948e84",Q:"#a8e8ff"},layers:[["PP.....PP","PPQQQQQPP"],["PP.....PP","PPQQQQQPP"],["pp.....pp","ppQQQQQpp"],["PP.....PP","PPQQQQQPP"],["PP.....PP","PPQQQQQPP"],["pP.....Pp","pPQQQQQPp"],["PPP...PPP","PPPQQQPPP"],[".PPPPPPP.",".PPPPPPP."],["..PPPPP..","..ppppp.."],["...PPP...","...PPP..."]]},qS={palette:{v:"#4e8c4a",L:"#8fd18a"},layers:[["...........","v.........v","...........",".L.......L."],["...........","v.........v","...........",".L........."],["...........","v..........","L..........","..........."],["...........","L..........","...........","..........."]]},KS={palette:{v:"#4e8c4a",L:"#8fd18a",F:"#f7b8cf"},layers:[["...........","v.........v","...........",".L.......L."],["...........","v.........v","...........",".F........."],["...........","v.........v","L.........L","..........."],["...........","v.........v","...........",".L.......F."],["...........","v.........v","...........",".F........."],["...........","v.........v","L.........L","..........."],["...........","L.........L","...........","..........."]]},YS={palette:{v:"#4e8c4a",L:"#8fd18a",F:"#f7b8cf",C:"#fff3b8"},layers:[["...........","v.........v","...........",".L.......L."],["...........","v.........v","...........",".F.......L."],["...........","v.........v","L.........L",".........F."],["...........","v.........v","...........",".L.......F."],["...........","v.........v","...........",".F.......L."],["...........","v.........v","L.........L",".L.......L."],["...........","v.........v","...........","..L..F..L.."],["...........","vL.......Lv","...........","..LFLFLFL.."],["...........",".L.......L.","..L.....L..","..........."],["...........","...L...L...","...........","....F.F...."],["...........","...LFLFL...","....LLL....","..........."],["...........","....LFL....",".....L.....","..........."],["...........",".....C.....","...........","..........."]]},XS={palette:{W:"#c9985f",w:"#a87a45"},layers:[["..w.."],["..w.."],[".....","WWWWW"],[".....","WWWWW"],[".....",".WWW."]]},ZS={palette:{R:"#b8b2a8",r:"#948e84",s:"#cfc9bf"},layers:[[".RRR.","RRRRR","RRRRR",".RRr."],[".....",".RRR.",".RRRR"],[".....",".....","..sR."]]},QS={palette:{R:"#b8b2a8",r:"#948e84"},layers:[[".RR.","RRRR","rRRr"],["....",".RR.",".Rr."]]},JS={palette:{Y:"#ffdf8a",y:"#f0b94f",w:"#a87a45",k:"#7d5540"},layers:[[".....","..w.."],[".yyy.","yYYYy",".yyy."],[".yYy.","YYYYY",".yYy."],[".yyy.","yYYYy",".yyy."],[".....","..k.."]]},eM={palette:{S:"#ffd9e0",s:"#f0b0c0"},layers:[[".SSS.","SSSSS",".sSs.","..s.."],[".....",".sSs."]]},tM={palette:{g:"#6aa84f",L:"#8fd18a"},layers:[["...",".g."],["...","LgL"],["...",".L."]]},nM={palette:{B:"#f78bb0",g:"#6aa84f"},layers:[["B"],["g"]]},iM={palette:{W:"#b08550",w:"#8a6238",R:"#ef7d6d",C:"#fff4e0",Y:"#ffd966",G:"#7ccf7c"},layers:[["WWWWW","WWWWW"],["WwWwW","WWWWW"],["Y.G.Y","w...w"],[".....","w...w"],[".....","w...w"],["RCRCR","RCRCR"],[".....","RCRCR"]]},sM={palette:{S:"#cfc8bb",s:"#a39d93",F:"#ffb066",f:"#f5854f"},layers:[["SSSSS","SSSSS"],["SFfFS","SsSsS"],["SFFFS","SsSsS"],["SSSSS","SSSSS"],[".SSS.",".SsS."],["..S..","....."],["..s..","....."]]},rM={palette:{W:"#b08550",w:"#8a6238",T:"#e6c48a",t:"#caa06a"},layers:[["WWWWWWWW","WWWWWWWW","WWWWWWWW"],["WwwwwwWW","W......W","WWwwwwWW"],["WWWWWWWW","W......W","WWWWWWWW"],["TTTTTTTT","TttttttT","TTTTTTTT"]]},aM={palette:{B:"#f2d7a2",b:"#cfab73",F:"#fff2d0"},layers:[[".......",".bbbbb.",".bbbbb.",".bbbbb.","......."],[".......",".BBBBB.",".BFFFB.",".BBBBB.","......."]]},oM={palette:{P:"#8f8f98",p:"#c9c9d1",C:"#f2c36b",R:"#d95f55"},layers:[[".....",".PPP.","PPPPP",".PPP.","....."],[".....",".pCp.","pCRCp",".pCp.","....."]]},lM={palette:{B:"#8fc7d8",b:"#5fa2b8",D:"#fff1cc",d:"#e8cf9a"},layers:[[".....",".bbb.","bbbbb",".bbb.","....."],[".....",".BBB.","B...B",".BBB.","....."],[".....","..D..",".DdD.","..D..","....."]]},cM={palette:{W:"#b08550",w:"#8a6238",R:"#e75d5d",G:"#7ccf7c",Y:"#ffd966"},layers:[["WWWWWW","WWWWWW","WWWWWW","WWWWWW"],["WwWwWW","W....W","W....W","WWwWwW"],["......",".R.G..","..Y.R.","......"]]},dM={palette:{T:"#b8b2a8",t:"#948e84",G:"#f4c95d",g:"#d9a83f"},layers:[[".....",".ttt.","ttttt",".ttt.","....."],[".....",".TGT.","TGgGT",".TGT.","....."]]},uM={palette:{W:"#8a6238",B:"#4a5a78",b:"#64789b",C:"#fff4e0",R:"#ef7d6d"},layers:[["...W...","...W..."],["...W...","...W..."],[".BBBBB.",".BCCCCB."],[".BCCCBB",".BCRCCB."],[".BBBBB.",".BBBBB."]]},hM={palette:{W:"#b08550",w:"#8a6238",T:"#d9b27c"},layers:[["W.....W",".......",".......","W.....W"],["W.....W",".......",".......","W.....W"],["TTTTTTT","TTTTTTT","TTTTTTT","TTTTTTT"]]},fM={palette:{R:"#b5654a",C:"#f3e6c4",D:"#8a5a3b",G:"#bfe3f0",A:"#e0574c",a:"#fff0d8",Y:"#ffcf5e"},layers:[["RRRRR","RRRRR","RRRRR","RRRRR"],["RRRRR","RRRRR","RRRRR","GGDGG"],["RRRRR","RRRRR","RRRRR","AaAaA"],["RRRRR","RRRRR","RRRRR","RGRGR"],["RRRRR","RRRRR","RRRRR","RGRGR"],["CCCCC","CCCCC","CCCCC","CCCCC"],["CRRRC","CRRRC","CRRRC","CRRRC"],[".CRC.",".CRC.",".CRC.",".CRC."],["..Y..","..Y..","..Y..","..Y.."]]},pM={palette:{O:"#e0a860",o:"#c98f45",T:"#c0533b",t:"#a5432f",G:"#bfe3f0",D:"#7a4a2e",g:"#4f9d5b",w:"#fff4e6",r:"#d64b3f",S:"#a39d93",s:"#847e74"},layers:[["OOOOO","OOOOO","OOOOO","OOOOO"],["OOOOO","OOOOO","OOOOO","GGDGG"],["OOOOO","OOOOO","OOOOO","ggwrr"],["OOOOO","OOOOO","OOOOO","OGOGO"],["OOOOO","OOOOO","OOOOO","OGOGO"],["ooooo","ooooo","ooooo","ooooo"],["TTTTT","TTTTS","TTTTT","TTTTT"],[".....",".TTTS",".TTT.","....."],[".....",".tttS",".ttt.","....."],[".....","....s",".....","....."]]},gt={palm:SS,palmSmall:MS,bush:ES,flowerPink:TS,flowerYellow:AS,flowerBlue:RS,pot:DS,stone:IS,altar:OS,chestBase:BS,chestLid:NS,egg:zS,basket:US,coconut:GS,bananas:HS,stump:WS,gong:VS,plank:$S,portal:jS,portalVine1:qS,portalVine2:KS,portalVine3:YS,sign:XS,rockA:ZS,rockB:QS,lantern:JS,shell:eM,sprout:tM,berry:nM,stall:iM,oven:sM,counter:rM,prepBoard:aM,pizzaPan:oM,doughBowl:lM,toppingCrate:cM,coinTray:dM,orderBoard:uM,shopTable:hM,bakeryBuilding:fM,pizzeriaBuilding:pM,grassA:CS,grassB:kS,pebble:PS,mushroom:LS,crystal:FS},mM={palette:{B:"#7fb8e8",b:"#5e9ed0",C:"#fff4e0",O:"#f5a25d",E:"#2e2433"},layers:[[".......","..CCC..","..CCC.."],["...b...","BBBBBBB","bBBBBBb","..BBB.."],[".......","..BBB..","..BBB..","..EBE..","...O..."]]},gM={palette:{B:"#7fb8e8",b:"#5e9ed0",C:"#fff4e0",O:"#f5a25d",E:"#2e2433"},layers:[[".......","..CCC..","..CCC.."],["...b...",".bBBBb.",".bBBBb.","..BBB.."],[".......","..BBB..","..BBB..","..EBE..","...O..."]]},_M={palette:{W:"#ffb3c6",B:"#5a4a52"},layers:[["WW.WW","WWBWW",".WBW."]]},bM={palette:{W:"#ffb3c6",B:"#5a4a52"},layers:[[".....","..B..","..B.."],[".....","..W..","..W.."]]},Ys={birdSpread:mM,birdFold:gM,butterflyOpen:_M,butterflyClosed:bM},Jt=i=>440*2**((i-69)/12),Hr=i=>2**(i/1200),di=i=>Hr((Math.random()*2-1)*i);let Ce=null,La,Ln,Ns,ja,pi,uo,As=!0,Fa=!0,Ps=!0,Hi=null,ji=null,Zn=null,An=null;function Xe({freq:i,type:e="sine",t,dur:n,gain:s,attack:r=.004,dest:a,ramps:o}){const l=Ce.createGain();l.connect(a||Ns),l.gain.setValueAtTime(1e-4,t),l.gain.linearRampToValueAtTime(Math.max(s,2e-4),t+r),l.gain.exponentialRampToValueAtTime(1e-4,t+n);const c=Ce.createOscillator();if(c.type=e,c.frequency.setValueAtTime(i,t),o)for(const[d,u]of o)c.frequency.exponentialRampToValueAtTime(d,t+u);c.connect(l),c.start(t),c.stop(t+n+.1)}function jt(i,e,t,n=.7,s=Ns){Xe({freq:i*Hr(-3),t:e,dur:n,gain:t,dest:s}),Xe({freq:i*Hr(3),t:e,dur:n*.9,gain:t*.6,dest:s}),Xe({freq:i*4,t:e,dur:.07,gain:t*.16,dest:s})}const ln=(i,e,t,n,s)=>jt(Jt(i),e,t,n,s);function Ao(i,e,t,n){Xe({freq:Jt(i),type:"triangle",t:e,dur:.4,gain:t,dest:n}),Xe({freq:Jt(i)*2,t:e,dur:.08,gain:t*.25,dest:n})}function qt({t:i,dur:e,gain:t,type:n="bandpass",freq:s=1e3,q:r=1,sweepTo:a,dest:o=Ns}){const l=Ce.createBufferSource();l.buffer=uo,l.loop=!0,l.loopEnd=uo.duration;const c=Ce.createBiquadFilter();c.type=n,c.frequency.setValueAtTime(s,i),c.Q.value=r,a&&c.frequency.exponentialRampToValueAtTime(a,i+e);const d=Ce.createGain();d.gain.setValueAtTime(1e-4,i),d.gain.linearRampToValueAtTime(t,i+.005),d.gain.exponentialRampToValueAtTime(1e-4,i+e),l.connect(c),c.connect(d),d.connect(o),l.start(i,Math.random()*.5),l.stop(i+e+.05)}function ho(i,e,t,n,s){const r=Math.min(1.5,t/3);for(const a of i)for(const o of[-4,4]){const l=Ce.createGain();l.connect(s),l.gain.setValueAtTime(1e-4,e),l.gain.linearRampToValueAtTime(n,e+r),l.gain.setValueAtTime(n,e+t-r),l.gain.linearRampToValueAtTime(1e-4,e+t);const c=Ce.createOscillator();c.frequency.value=Jt(a),c.detune.value=o,c.connect(l),c.start(e),c.stop(e+t+.1)}}const vM={hop(i,e,t){Xe({freq:170*e*di(30),type:"triangle",t:i,dur:.07,gain:.22*t}),qt({t:i,dur:.03,gain:.05*t,type:"lowpass",freq:700})},pick(i,e,t){Xe({freq:392*e,t:i,dur:.16,gain:.3*t,ramps:[[622*e,.09]]}),Xe({freq:1568*e,t:i,dur:.05,gain:.06*t})},drop(i,e,t){Xe({freq:523*e,t:i,dur:.16,gain:.28*t,ramps:[[330*e,.1]]})},place(i,e,t){jt(131*e,i,.5*t,.6),qt({t:i,dur:.07,gain:.18*t,type:"lowpass",freq:240})},correct(i,e,t){[523.25,659.26,783.99].forEach((n,s)=>jt(n*e,i+s*.09,.3*t,.55)),Xe({freq:2093*e,t:i+.27,dur:.25,gain:.07*t})},boop(i,e,t){Xe({freq:330*e,t:i,dur:.18,gain:.22*t,attack:.02}),Xe({freq:277*e,t:i+.15,dur:.3,gain:.2*t,attack:.02})},pop(i,e,t){qt({t:i,dur:.14,gain:.5*t,freq:950*e,q:1.4,sweepTo:320*e}),Xe({freq:240*e,t:i,dur:.1,gain:.18*t,ramps:[[110*e,.09]]})},chest(i,e,t){[523.25,659.26,783.99,1046.5].forEach((n,s)=>jt(n*e,i+s*.13,.32*t,s===3?1:.5));for(const n of[261.63,329.63,392])Xe({freq:n*e,t:i,dur:1.1,gain:.06*t,attack:.08})},coin(i,e,t){const n=[1046.5,1174.7,1318.5,1568,1760];jt(n[Math.random()*n.length|0]*e*di(12),i,.26*t,.35)},hatch(i,e,t){Xe({freq:440*e,t:i,dur:.6,gain:.18*t,attack:.05,ramps:[[1760*e,.5]]}),jt(1568*e,i+.5,.28*t,.8),jt(2093*e,i+.64,.22*t,.9),Xe({freq:3520*e,t:i+.74,dur:.3,gain:.06*t})},splash(i,e,t){qt({t:i,dur:.5,gain:.55*t,type:"lowpass",freq:1400*e,sweepTo:180}),Xe({freq:300*e,t:i+.02,dur:.25,gain:.15*t,ramps:[[90,.2]]})},gong(i,e,t){for(const[n,s,r]of[[1,.5,3],[2.02,.18,2.2],[2.96,.08,1.4],[4.2,.04,.8]])Xe({freq:98*e*n,t:i,dur:r,gain:s*t,attack:.008});qt({t:i,dur:.05,gain:.06*t,type:"lowpass",freq:500})},crab(i,e,t){Xe({freq:330*e,type:"triangle",t:i,dur:.32,gain:.22*t,ramps:[[700*e,.1],[392*e,.28]]})},click(i,e,t){Xe({freq:1800*e,t:i,dur:.035,gain:.12*t})},bloom(i,e,t){[261.63,329.63,392,523.25].forEach((n,s)=>{Xe({freq:n*e*Hr(-3),t:i,dur:2,gain:.1*t,attack:.5+s*.12}),Xe({freq:n*e*Hr(3),t:i,dur:2,gain:.07*t,attack:.5+s*.12})}),jt(1046.5*e,i+.9,.12*t,1)},door(i,e,t){[1318.5,1568,2093,2349,2637].forEach((n,s)=>jt(n*e*di(8),i+s*.07+Math.random()*.02,.12*t,.6))},plant(i,e,t){jt(620*e*di(30),i,.22*t,.18),qt({t:i,dur:.04,gain:.07*t,freq:2400})},sparkle(i,e,t){Xe({freq:2637*e*di(15),t:i,dur:.12,gain:.09*t}),Xe({freq:3520*e*di(15),t:i+.05,dur:.15,gain:.06*t})},streak(i,e,t){jt(392*e,i,.3*t,.4),jt(523.25*e,i+.12,.32*t,.6)},egg(i,e,t){qt({t:i,dur:.035,gain:.22*t,type:"highpass",freq:2500}),Xe({freq:700*e*di(20),type:"triangle",t:i,dur:.04,gain:.1*t})},swoosh(i,e,t){qt({t:i,dur:.3,gain:.32*t,freq:400*e,q:.7,sweepTo:2600*e})}},Rh=[{0:76,3:79,8:81,14:79,16:72,22:74,24:76,32:81,35:84,40:81,46:79,48:76,56:74},{0:72,6:74,8:76,16:79,20:76,28:74,32:76,38:81,44:79,48:84,52:81,60:79},{0:67,8:72,14:74,24:76,36:79,44:81,52:79,58:76}],Ch=[{0:76,2:79,6:81,12:84,16:79,22:76,24:74,32:81,34:84,38:86,44:81,48:79,54:76,56:74},{0:72,4:74,6:76,12:79,16:76,20:74,28:72,32:76,36:79,38:81,44:84,48:81,52:79,60:74}],mi={tide:{bpm:68,lowpass:3e3,voice:"kal",accentNote:88,padGain:.046,bassGain:.28,bassDur:1.8,bassEvery:16,melGain:.25,chords:[[45,52,57,60],[48,52,55,60],[43,50,55,62],[38,45,50,57],[40,52,55,60]],melodies:[{0:60,10:62,20:64,34:62,44:60,56:64},{0:67,12:69,22:72,32:69,42:67,52:64,60:67},{4:72,16:74,26:76,40:74,50:72,62:69},{0:64,14:72,24:69,36:76,46:72,56:69,62:64},{0:76,12:74,24:72,36:69,48:67,58:64},{2:69,12:67,20:69,30:72,40:69,50:67,60:64},{0:79,14:81,26:84,38:81,48:79,58:76,62:79},{0:60,12:64,24:67,36:69,48:67,60:64}],texture(i,e,t,n,s){e%16===6&&qt({t,dur:.42,gain:.02+.014*s,type:"bandpass",freq:820+Math.random()*260,q:.55,sweepTo:540,dest:n})}},garden:{bpm:74,lowpass:3600,voice:"kal",altVoice:"pluck",accentNote:88,padGain:.043,bassGain:.24,bassDur:1.15,bassEvery:8,melGain:.26,chords:[[48,52,55,60],[50,57,62,69],[55,62,67,74],[45,52,57,60],[48,55,60,64]],melodies:[{0:72,12:74,24:76,40:79,56:76},{0:79,16:76,28:74,44:72,60:69},{4:84,20:81,36:84,52:86,60:84},{0:67,14:72,26:74,38:76,50:74,62:72},{2:76,18:79,34:81,48:79,58:76},{0:69,16:72,32:74,48:72,60:69},{6:72,22:76,30:79,46:81,54:79,62:76},{8:81,24:84,40:86,52:84,60:81}],texture(i,e,t,n,s){e%16===10&&qt({t,dur:.08,gain:.02+.01*s,type:"highpass",freq:4200,q:.8,dest:n})}},stump:{bpm:64,lowpass:2600,voice:"kal",accentNote:81,padGain:.048,bassGain:.25,bassDur:1.25,bassEvery:8,melGain:.25,chords:[[45,52,57,60],[45,48,55,60],[48,55,60,64],[43,50,55,57],[38,45,50,57]],melodies:[{0:57,8:60,20:57,32:55,44:57,52:60,60:57},{0:69,10:72,18:74,30:72,40:69,48:67,56:69},{2:60,14:64,26:67,38:69,48:67,58:64},{0:72,16:76,24:74,36:72,48:74,60:69},{0:55,12:57,24:60,36:57,44:55,56:57},{0:64,16:67,28:69,40:67,52:64},{0:67,12:69,20:72,34:76,44:72,54:69,62:67},{4:74,16:72,28:69,40:72,50:69,60:57}],texture(i,e,t,n,s){e%16===8&&qt({t,dur:.055,gain:.035+.015*s,type:"lowpass",freq:360,q:.7,dest:n})}},vines:{bpm:70,lowpass:4100,voice:"pluck",altVoice:"kal",accentNote:93,padGain:.04,bassGain:.2,bassDur:1.5,bassEvery:16,melGain:.23,chords:[[38,45,50,54],[43,50,55,59],[45,52,57,61],[47,54,59,62],[40,47,52,55]],melodies:[{0:78,10:76,22:74,36:71,50:74,60:69},{0:74,8:78,20:81,34:78,44:74,56:76},{2:83,14:86,28:88,40:86,52:83,62:81},{0:69,12:74,26:78,40:81,54:83,60:86},{4:81,16:78,24:81,38:83,48:81,58:78},{0:86,18:88,34:90,48:86,58:88},{0:83,10:81,20:78,32:76,44:74,56:71,62:69},{6:76,18:78,30:81,44:78,58:83}],texture(i,e,t,n,s){e%16===12&&Xe({freq:Jt(88+i.loops%2*2),t,dur:.22,gain:.018+.012*s,attack:.04,dest:n})}}},Ml={0:72,6:74,12:76,20:74,24:72,32:69,40:72,48:76,54:74,60:72},yM={0:67,8:72,14:74,24:76,30:74,36:72,44:69,52:67,58:69},xM={2:79,16:81,26:79,34:76,48:79,56:76},Da=[[36,43,48,52],[33,45,52,57],[43,48,52,55],[38,45,50,57],[36,48,55,60]],wM={0:72,2:76,4:79,6:84,9:88};function Wc(i,e=.24){return i*(1-e/2+Math.random()*e)}const SM={kal:(i,e,t,n)=>ln(i,e,t,1,n),pluck:(i,e,t,n)=>Ao(i,e,t,n)};function Ia(i,e){if(i<=1)return 0;const t=Math.random()*(i-1)|0;return t>=e?t+1:t}function Oa(i){const e=i.altVoice?[i.voice,i.voice,i.altVoice]:[i.voice];return{stepDur:60/i.bpm/2,length:64,loop:!0,lowpass:i.lowpass,init(t){t.phase=Math.random()*6.28,t.melA=Math.random()*i.melodies.length|0,t.melB=Ia(i.melodies.length,t.melA),t.chordI=Math.random()*i.chords.length|0,t.voiceI=0,t.oct=0},step(t,n,s){const r=t.dest;n===0&&t.loops>0&&t.loops%2===0&&(t.melA=Ia(i.melodies.length,t.melA),t.melB=Ia(i.melodies.length,t.melA),t.oct=Math.random()<.16?12:0,e.length>1&&(t.voiceI=Math.random()*e.length|0));const a=t.loops+t.phase,o=.5+.3*Math.sin(a*.5)+.15*Math.sin(a*.23+t.phase);n%32===0&&(t.chordI=n===0?Ia(i.chords.length,t.chordI):(t.chordI+1)%i.chords.length,ho(i.chords[t.chordI],s,32*this.stepDur+.6,i.padGain*(.8+.4*o),r)),n%i.bassEvery===0&&ln(i.chords[t.chordI][0],s,i.bassGain*(.82+.28*o),i.bassDur,r),i.texture?.(t,n,s,r,o);const l=i.melodies[t.melA][n];if(l!=null){const c=Wc(i.melGain*(.74+.46*o),.26);SM[e[t.voiceI]](l+t.oct,s+Math.random()*.016,c,r),o>.84&&Math.random()<.22&&ln(l+12+t.oct,s+.02,c*.28,.7,r)}if(o>.56){const c=i.melodies[t.melB][n];c!=null&&Math.random()<.8&&Ao(c-12,s+.02,Wc(i.melGain*.32*(o-.35),.3),r)}o>.6&&n%32===26&&Math.random()<o&&ln(i.accentNote,s+.04,.05*o,.7,r)}}}const MM={stepDur:60/69/2,length:64,loop:!0,lowpass:3400,init(i){i.phase=Math.random()*6.28,i.chordI=Da.length-1},step(i,e,t){const n=i.dest,s=[Ml,Ml,yM,Ml][i.loops%4],r=i.loops%4>=2,a=.62+.22*Math.sin((i.loops+i.phase)*.55);e%16===0&&(i.chordI=(i.chordI+1)%Da.length,ho(Da[i.chordI],t,16*this.stepDur+.5,.05*(.85+.3*a),n)),e%8===0&&ln(Da[i.chordI][0],t,.3,1.1,n);const o=s[e];if(o!=null&&ln(o,t+Math.random()*.012,Wc(.34*(.85+.3*a),.2),1.1,n),r){const l=xM[e];l!=null&&Ao(l,t+.02,.12*a,n)}e===56&&i.loops%2===1&&ln(88,t+.04,.06,.8,n)}};mi.tide.melodies,mi.garden.melodies,mi.stump.melodies,mi.vines.melodies;const qa={island:{stepDur:60/72/2,length:64,loop:!0,lowpass:2800,step(i,e,t){const n=i.dest;e%32===0&&ho(e===0?[48,52,55,59]:[53,57,60,64],t,32*this.stepDur+.5,.055,n),e%16===0&&ln(e<32?36:41,t,.45,1.6,n);const s=Rh[i.loops%Rh.length][e];s&&ln(s,t,.38*(.85+Math.random()*.3),1.1,n)}},chamber:{stepDur:60/84/2,length:64,loop:!0,lowpass:3800,step(i,e,t){const n=i.dest;e%32===0&&ho(e===0?[45,52,55,60]:[41,48,52,57],t,32*this.stepDur+.5,.05,n),e%8===0&&ln(e<32?45:41,t,.4,1.2,n),e%4===2&&qt({t,dur:.025,gain:.04+Math.random()*.02,type:"highpass",freq:5e3,dest:n}),e%16===8&&qt({t,dur:.05,gain:.06,type:"lowpass",freq:400,dest:n});const s=Ch[i.loops%Ch.length][e];s&&Ao(s,t,.3*(.85+Math.random()*.3),n)}},"chamber:tide":Oa(mi.tide),"chamber:garden":Oa(mi.garden),"chamber:stump":Oa(mi.stump),"chamber:vines":Oa(mi.vines),title:MM,celebrate:{stepDur:.115,length:26,loop:!1,lowpass:4500,step(i,e,t){const n=i.dest,s=wM[e];if(s&&ln(s,t,.55,.8,n),e===12){for(const r of[60,64,67,72])Xe({freq:Jt(r),t,dur:1.6,gain:.12,attack:.05,dest:n});ln(91,t+.1,.22,.6,n),ln(96,t+.25,.18,.7,n)}}}};function kh(i){if(!Ce||i.done)return;const e=Ce.currentTime+.2;for(;i.nextTime<e&&!i.done;)i.def.step(i,i.step,i.nextTime),i.nextTime+=i.def.stepDur,i.step+=1,i.step>=i.def.length&&(i.def.loop?(i.step=0,i.loops+=1):(i.done=!0,EM(i)))}function El(i){Vc(.5);const e=qa[i],t=Ce.currentTime,n=Ce.createGain();n.gain.setValueAtTime(1e-4,t),n.gain.linearRampToValueAtTime(1,t+.5),n.connect(ja);const s=Ce.createBiquadFilter();s.type="lowpass",s.frequency.value=e.lowpass,s.connect(n);const r={name:i,def:e,out:n,dest:s,step:0,loops:0,nextTime:t+.06,done:!1,timer:0};r.timer=setInterval(()=>kh(r),100),Zn=r,e.init?.(r),kh(r)}function Vc(i=.5){const e=Zn;if(!e)return;Zn=null,e.done=!0,clearInterval(e.timer);const t=Ce.currentTime;e.out.gain.cancelScheduledValues(t),e.out.gain.setValueAtTime(Math.max(e.out.gain.value,1e-4),t),e.out.gain.linearRampToValueAtTime(1e-4,t+i),setTimeout(()=>{try{e.out.disconnect()}catch{}},i*1e3+200)}function EM(i){clearInterval(i.timer),Zn===i&&(Zn=null,An===i.name&&(An=null)),setTimeout(()=>{try{i.out.disconnect()}catch{}},4e3)}function Ep(){if(ji=null,!Ce||!Ps||!Hi)return;const i=Ce.currentTime+.05,e=lt(),t=Hi;t==="hub"||t==="title"?(qt({t:i,dur:1.6,gain:.05,type:"lowpass",freq:600,dest:pi}),Math.random()<(e?.15:.4)&&Xe({freq:Jt(84+(Math.random()*5|0)*2),type:"triangle",t:i+Math.random()*1.2,dur:.18,gain:.03,dest:pi})):t&&t.startsWith("chamber")?Math.random()<.4&&Xe({freq:Jt(79+(Math.random()*4|0)*2),type:"triangle",t:i,dur:.16,gain:.022,dest:pi}):t==="bakery"&&(Xe({freq:Jt(40),type:"sine",t:i,dur:1.8,gain:.04,dest:pi}),Math.random()<.25&&qt({t:i+.4,dur:.3,gain:.03,type:"lowpass",freq:400,dest:pi})),ji=setTimeout(Ep,(e?5e3:3e3)+Math.random()*4e3)}function Tl(){ji||!Ce||!Ps||!Hi||(ji=setTimeout(Ep,400))}function Ph(){ji&&(clearTimeout(ji),ji=null)}const TM={hop:{pitch:40,gain:.12},pick:{pitch:30,gain:.1},coin:{pitch:30,gain:.1},sparkle:{pitch:40,gain:.12},correct:{pitch:20,gain:.08},chest:{pitch:20,gain:.08},plant:{pitch:50,gain:.12},drop:{pitch:40,gain:.1},place:{pitch:40,gain:.1},bloom:{pitch:30,gain:.1},streak:{pitch:30,gain:.1},pop:{pitch:40,gain:.12}},$={init(){if(Ce){Ce.state==="suspended"&&Ce.resume();return}const i=globalThis.AudioContext||globalThis.webkitAudioContext;if(!i)return;Ce=new i,La=Ce.createGain(),La.gain.value=.9,La.connect(Ce.destination),Ln=Ce.createDynamicsCompressor(),Ln.threshold.value=-20,Ln.knee.value=12,Ln.ratio.value=5,Ln.attack.value=.003,Ln.release.value=.25,Ln.connect(La),Ns=Ce.createGain(),Ns.gain.value=.8,Ns.connect(Ln),ja=Ce.createGain(),ja.gain.value=.25,ja.connect(Ln),pi=Ce.createGain(),pi.gain.value=.18,pi.connect(Ln),uo=Ce.createBuffer(1,Ce.sampleRate,Ce.sampleRate);const e=uo.getChannelData(0);for(let t=0;t<e.length;t++)e[t]=Math.random()*2-1;typeof document<"u"&&document.addEventListener("visibilitychange",()=>{Ce&&(document.hidden?Ce.suspend():Ce.resume())}),Ce.state==="suspended"&&Ce.resume(),Fa&&An&&qa[An]?.loop&&Zn?.name!==An&&El(An),Ps&&Hi&&Tl()},sfx(i,e={}){if(!Ce||!As)return;const t=vM[i];t&&t(Ce.currentTime,e.pitch??1,e.gain??1)},comboTone(i){if(!Ce||!As)return;const e=[72,74,76,79,81,84,86,88],t=Math.min(Math.max(1,i|0),e.length)-1,n=Ce.currentTime;jt(Jt(e[t]),n,.3,.5),t>=4&&Xe({freq:Jt(e[t])*4,t:n+.04,dur:.18,gain:.05})},pad(i){if(!Ce||!As)return;const e=[60,64,67,72];jt(Jt(e[((i|0)%e.length+e.length)%e.length]),Ce.currentTime,.4,.6)},count(i,e){if(!Ce||!As)return;const t=[60,62,64,67,69],n=Math.max(1,i|0)-1,s=t[n%t.length]+12*Math.floor(n/t.length),r=Ce.currentTime;e?jt(Jt(s),r,.32,.5):Xe({freq:Jt(s),type:"triangle",t:r,dur:.13,gain:.12})},music(i){if(An=i,!(!Ce||!Fa)){if(i===null){Vc();return}qa[i]&&(Zn&&Zn.name===i||El(i))}},variation(i,e={}){if(!Ce||!As)return;const t=TM[i]||{pitch:20,gain:.08},n=(e.pitch??1)*di(t.pitch),s=(e.gain??1)*(1+(Math.random()*2-1)*t.gain);this.sfx(i,{pitch:n,gain:s})},ambience(i){Hi=i||null,Ph(),!(!Ce||!Ps||!Hi)&&Tl()},attachEvents(i){!i||typeof i.addReactor!="function"||i.addReactor({react:e=>{Ce&&(e==="build-complete"?this.variation("bloom"):e==="portal-stage-up"&&this.variation("sparkle"))}})},setSfx(i){As=!!i},setAmbience(i){Ps=!!i,Ps?Ce&&Hi&&Tl():Ph()},setMusic(i){Fa=!!i,Fa?Ce&&An&&qa[An]?.loop&&Zn?.name!==An&&El(An):Vc(.3)},get ready(){return!!Ce}};function AM(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function RM(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}class vn{constructor(e){this.next=AM(typeof e=="string"?RM(e):e)}float(){return this.next()}int(e,t){return e+Math.floor(this.next()*(t-e+1))}pick(e){return e[Math.floor(this.next()*e.length)]}shuffle(e){const t=e.slice();for(let n=t.length-1;n>0;n--){const s=Math.floor(this.next()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}chance(e){return this.next()<e}}new vn(Math.random()*2**32>>>0);let mr=null;function CM(){if(mr)return mr;if(typeof document>"u")return null;const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(34,42,22,1)"),t.addColorStop(.5,"rgba(34,42,22,0.55)"),t.addColorStop(1,"rgba(34,42,22,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),mr=new vo(i),mr._cached=!0,mr}let gr=null;function kM(){return gr||(gr=new Mi(1,1),gr._cached=!0,gr)}const Lh=new Map;function PM(i){const e=Math.round(i*100);let t=Lh.get(e);return t||(t=new ss({map:CM(),transparent:!0,depthWrite:!1,opacity:i,color:16777215}),Lh.set(e,t)),t}function Gd({radius:i=.4,opacity:e=.28,yOffset:t=.02}={}){const n=new Ft(kM(),PM(e));return n.rotation.x=-Math.PI/2,n.scale.set(i*2,i*2,1),n.position.y=t,n.userData.contactShadow=!0,n}const Fh=new Map;function Tp(i=.4){const e=Math.round(i*10);let t=Fh.get(e);if(t)return t;if(typeof document>"u")return null;const n=document.createElement("canvas");n.width=n.height=64;const s=n.getContext("2d"),r=s.createRadialGradient(32,32,0,32,32,32);return r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(Math.max(.1,Math.min(.9,i)),"rgba(255,255,255,0.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=r,s.fillRect(0,0,64,64),t=new vo(n),t._cached=!0,Fh.set(e,t),t}function $c(){return Ie.bloom?1.35:1}function Hd(){return Ie.bloom?1.25:1}const LM=11;function Jr(i,e=!0){if(!i)return i;if(i.layers.enable(LM),e&&i.children)for(const t of i.children)Jr(t,!0);return i}function Wr(i,e=.1,t=1){const n=new bo({map:Tp(.4),color:i,transparent:!0,depthWrite:!1,blending:Us,opacity:Math.min(1,t*Hd())});n._owned=!0;const s=new bd(n),r=e*2*$c();return s.scale.set(r,r,1),s.userData.baseOpacity=t,Jr(s),s}function Ap(i,e=1,t=.5){const n=new ss({map:Tp(.5),color:i,transparent:!0,depthWrite:!1,blending:Us,side:Cn,opacity:Math.min(1,t*Hd())});n._owned=!0;const s=new Ft(new Mi(e*$c(),e*$c()),n);return s.geometry._owned=!0,s.userData.baseOpacity=t,Jr(s),s}function FM({count:i=6,color:e=16774072,size:t=.07,spread:n=.6,rise:s=1,rand:r=null}={}){const a=new en,o=[];let l=1;const c=r||(()=>(l=l*1103515245+12345&2147483647,l/2147483647));for(let u=0;u<i;u++){const h=Wr(e,t,.6);h.userData.m={ox:(c()-.5)*n,oz:(c()-.5)*n,phase:c(),speed:.05+c()*.06,sway:.4+c()*.6,base:t},a.add(h),o.push(h)}function d(u){const h=lt();for(const f of o){const g=f.userData.m,_=(u*(h?g.speed*.4:g.speed)+g.phase)%1;f.position.set(g.ox+Math.sin(u*g.sway+g.phase*7)*(h?.05:.16),.1+_*s,g.oz),f.material.opacity=Math.sin(_*Math.PI)*.55*Hd()}}return{group:a,update:d}}function Wd(i,e,t=.28){if(!Ie.contactShadows)return null;const n=Gd({radius:e,opacity:t});return i.add(n),n}function Jn(i,e,t=null,n=null){const s=t?Ur(i,t):i,r=Si(s,{cacheKey:n&&n+JSON.stringify(t||"")}),a=s.layers.length,o=e/a,l=new en;return r.scale.setScalar(o),l.add(r),l.userData.headH=e,l.userData.voxelScale=o,l}function Tt(i,e,t,n={}){const s=Si(i,{cacheKey:t,...n});if(e){const r=e/i.layers.length;s.scale.setScalar(r)}return s}function Mt(i,e={}){const{fontSize:t=64,color:n="#4a3f35",bg:s=null,pad:r=18,scale:a=1}=e,o=document.createElement("canvas"),l=o.getContext("2d"),c=`900 ${t}px 'Quicksand','Varela Round','Comic Sans MS',system-ui,sans-serif`;l.font=c;const d=Math.ceil(l.measureText(i).width)+r*2,u=t+r*2;o.width=d*2,o.height=u*2;const h=o.getContext("2d");h.scale(2,2),s&&(h.fillStyle=s,h.beginPath(),h.roundRect(2,2,d-4,u-4,16),h.fill(),h.strokeStyle="#ffffff",h.lineWidth=4,h.stroke()),h.font=c,h.fillStyle=n,h.textAlign="center",h.textBaseline="middle",h.fillText(i,d/2,u/2+2);const f=new vo(o);f.anisotropy=4;const g=new bo({map:f,transparent:!0});g._owned=!0;const _=new bd(g),m=d/u;return _.scale.set(.5*m*a,.5*a,1),_}function Rp(i,e){const t=e.clone().project(i.camera);return{x:(t.x*.5+.5)*window.innerWidth,y:(-t.y*.5+.5)*window.innerHeight}}function Al(i,e,t,n,s=1,r=null){const a=Rp(i,e),o=n.getBoundingClientRect(),l={x:o.left+o.width/2,y:o.top+o.height/2};for(let c=0;c<s;c++){const d=document.createElement("div");d.textContent=t,d.style.cssText="position:fixed;left:0;top:0;font-size:26px;z-index:40;pointer-events:none;will-change:transform;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))",document.body.appendChild(d);const u={x:a.x+(Math.random()-.5)*70,y:a.y-Math.random()*60};Qe({ms:380+Math.random()*120,delay:c*70,ease:nt.outQuad,onUpdate:(h,f)=>{const g=a.x+(u.x-a.x)*f,_=a.y+(u.y-a.y)*f-Math.sin(f*Math.PI)*40;d.style.transform=`translate(${g-13}px,${_-13}px) scale(${.6+f*.6})`},onDone:()=>{Qe({ms:420,ease:nt.inQuad,onUpdate:(h,f)=>{const g=u.x+(l.x-u.x)*f,_=u.y+(l.y-u.y)*f;d.style.transform=`translate(${g-13}px,${_-13}px) scale(${1.2-f*.7})`},onDone:()=>{d.remove(),n.parentElement?.animate?.([{transform:"scale(1)"},{transform:"scale(1.18)"},{transform:"scale(1)"}],{duration:180}),r?.()}})}})}}function Vd(i,e,t,n="#2c6e49"){const s=Rp(i,e),r=document.createElement("div");r.textContent=t,r.style.cssText=`position:fixed;left:0;top:0;font-family:inherit;font-weight:900;font-size:24px;color:${n};z-index:40;pointer-events:none;text-shadow:0 2px 0 #fff,0 3px 6px rgba(0,0,0,.2)`,document.body.appendChild(r),Qe({ms:900,ease:nt.outQuad,onUpdate:(a,o)=>{r.style.transform=`translate(${s.x-20}px,${s.y-30-o*60}px) scale(${1+o*.2})`,r.style.opacity=String(1-Math.max(0,o-.6)/.4)},onDone:()=>r.remove()})}const DM=[16767334,8179580,16757702,10213119,13215487,16751493];class Vr{constructor(e,t=320){this.max=t,this.geo=new yn,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.life=new Float32Array(t),this.geo.setAttribute("position",new Xt(this.pos,3)),this.geo.setAttribute("color",new Xt(this.col,3));const n=new Mf({size:.14,vertexColors:!0,transparent:!0,depthWrite:!1});n._owned=!0,this.points=new Ng(this.geo,n),this.points.frustumCulled=!1,e.add(this.points),this.cursor=0,this.life.fill(0),this.pos.fill(9999)}emit(e,t,{colors:n=DM,speed:s=2.4,up:r=2.6,life:a=900,spread:o=.25}={}){const l=new Pe;for(let c=0;c<t;c++){const d=this.cursor=(this.cursor+1)%this.max;this.life[d]=a*(.7+Math.random()*.6),this.pos[d*3]=e.x+(Math.random()-.5)*o,this.pos[d*3+1]=e.y+Math.random()*o,this.pos[d*3+2]=e.z+(Math.random()-.5)*o;const u=Math.random()*Math.PI*2,h=s*(.4+Math.random()*.8);this.vel[d*3]=Math.cos(u)*h,this.vel[d*3+1]=r*(.5+Math.random()*.8),this.vel[d*3+2]=Math.sin(u)*h,l.setHex(n[Math.random()*n.length|0]),this.col[d*3]=l.r,this.col[d*3+1]=l.g,this.col[d*3+2]=l.b}this.geo.attributes.color.needsUpdate=!0}confetti(e,t=36){this.emit(e,t),$.sfx("sparkle")}splash(e,t=30){this.emit(e,t,{colors:[10213119,14283515,8308963],speed:1.8,up:3,life:700})}poof(e,t=16,n=14272936){this.emit(e,t,{colors:[n,16777215],speed:1.2,up:1.2,life:500})}update(e){const t=e/1e3;let n=!1;for(let s=0;s<this.max;s++)if(!(this.life[s]<=0)){if(n=!0,this.life[s]-=e,this.life[s]<=0){this.pos[s*3+1]=9999;continue}this.vel[s*3+1]-=7.5*t,this.pos[s*3]+=this.vel[s*3]*t,this.pos[s*3+1]+=this.vel[s*3+1]*t,this.pos[s*3+2]+=this.vel[s*3+2]*t,this.pos[s*3+1]<.02&&(this.pos[s*3+1]=.02,this.vel[s*3+1]*=-.35)}n&&(this.geo.attributes.position.needsUpdate=!0)}}const Dh=1.6,IM=["","portalVine1","portalVine2","portalVine3","portalVine3"];function OM(){const i=document.createElement("canvas");i.width=i.height=32;const e=i.getContext("2d"),t=e.createRadialGradient(16,16,0,16,16,16);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.4,"rgba(255,250,225,0.85)"),t.addColorStop(1,"rgba(255,245,200,0)"),e.fillStyle=t,e.fillRect(0,0,32,32),new vo(i)}function jc(i,e){const t=new bo({map:OM(),color:i,transparent:!0,depthWrite:!1,blending:Us});t._owned=!0;const n=new bd(t),s=Ie.bloom?1.3:1;return n.scale.set(e*s,e*s,1),Jr(n),n}class BM{constructor(e,t,n){this.place=e,this.spot=t,this.worldId=n.worldId,this.accent=n.accent,this.bloom=n.bloom,this.pct=Math.min(1,Math.max(0,n.pct??0)),this.s=Dh/gt.portal.layers.length,this.t=Math.random()*6,this.growK=1,this.glowBoost=0,this.greetArmed=!0,this.greetCooldown=0,this.group=new en,this.group.position.copy(e.worldPos(t.x,t.z)),e.group.add(this.group),this.body=new en,this.group.add(this.body);const s="#"+new Pe(this.accent).lerp(new Pe("#ffffff"),.45).getHexString(),r=Si(Ur(gt.portal,{Q:s}),{cacheKey:"prop:portal:"+this.worldId});r.scale.setScalar(this.s),this.body.add(r);const a=new Mi(5*this.s*.94,7*this.s*.94);this.glowMat=new ss({color:this.accent,transparent:!0,opacity:0,blending:Us,depthWrite:!1,side:Cn}),this.glowMat._owned=!0;const o=new Ft(a,this.glowMat);o.position.set(0,3.5*this.s,1.06*this.s),Jr(o),this.body.add(o),this.labelY=2.45,this.labelText=n.label,this.label=Mt(this.labelText,{bg:"#fff8ecdd",scale:.85,fontSize:44}),this.label.position.set(0,this.labelY,0),this.group.add(this.label),this.overlay=null,this.star=null,this.motes=[],this._setStage(n.stage??0),e.addEntity(this)}updateLabel(e){this.labelText=e;const t=Mt(this.labelText,{bg:"#fff8ecdd",scale:.85,fontSize:44});t.position.copy(this.label.position),this.group.add(t),this.group.remove(this.label),this.label.material?.map?.dispose?.(),this.label.material?.dispose?.(),this.label.geometry?._owned&&this.label.geometry.dispose?.(),this.label=t}_setStage(e){this.stage=e,this.overlay&&this.body.remove(this.overlay),this.overlay=null;const t=IM[e];t&&(this.overlay=Si(Ur(gt[t],{F:this.bloom}),{cacheKey:`prop:${t}:${this.worldId}`}),this.overlay.scale.setScalar(this.s),this.body.add(this.overlay)),this.star&&(this.body.remove(this.star),this.star.material.map.dispose(),this.star.material.dispose(),this.star=null),e>=4&&(this.star=jc(16767334,.16),this.star.position.set(0,13.1*this.s,0),this.body.add(this.star));for(const s of this.motes)this.body.remove(s.sprite),s.sprite.material.map.dispose(),s.sprite.material.dispose();this.motes=[];const n=new Pe(16777215).lerp(new Pe(this.accent),.4);for(let s=0;s<1+e;s++){const r=.05+Math.random()*.035,a=jc(n.getHex(),r);this.body.add(a),this.motes.push({sprite:a,size:r,x:(Math.random()-.5)*.5,z:(1.1+Math.random()*.4)*this.s,phase:Math.random(),speed:.1+Math.random()*.08,sway:.6+Math.random()*.8})}}celebrate(e){e<=this.stage||(this._setStage(e),this.growK=.001,Qe({ms:950,ease:nt.outBack,onUpdate:t=>{this.growK=Math.max(.001,t)},onDone:()=>{this.growK=1}}),this.glowBoost=.45,this.bounce(),this.place.fx?.emit(this._fxPos(),30,{colors:[this.accent,16777215,16767334],speed:1.6,up:2.8,life:1e3,spread:.55}),$.sfx("sparkle"))}enter(){this.glowBoost=.9,this.bounce(),this.place.fx?.emit(this._fxPos(),42,{colors:[this.accent,16777215,16767334,13215487],speed:2.2,up:2,life:850,spread:.42}),Qe({ms:420,ease:nt.outQuad,onUpdate:(e,t)=>{const n=Math.sin(t*Math.PI);this.body.rotation.y=n*Math.PI*.18,this.body.scale.set(1+n*.18,1+n*.24,1+n*.18)},onDone:()=>{this.body.rotation.y=0,this.body.scale.set(1,1,1)}}),$.sfx("sparkle",{pitch:.75})}bounce(){Qe({ms:540,ease:nt.linear,onUpdate:(e,t)=>{const n=Math.sin(t*Math.PI*2)*(1-t);this.body.scale.set(1-n*.08,1+n*.14,1-n*.08)},onDone:()=>this.body.scale.set(1,1,1)})}_fxPos(){const e=this.group.position;return new P(e.x,e.y+.8,e.z)}update(e){const t=e/1e3;this.t+=t;const n=.5+.5*Math.sin(this.t*1.7);this.glowBoost=Math.max(0,this.glowBoost-t*.3),this.glowMat.opacity=Math.min(.85,.04+.26*this.pct+.12*n*(.3+this.pct)+this.glowBoost);for(const r of this.motes){const a=(this.t*r.speed+r.phase)%1;r.sprite.position.set(r.x+Math.sin(this.t*r.sway+r.phase*7)*.14,.12+a*Dh*.62,r.z),r.sprite.material.opacity=Math.sin(a*Math.PI)*(.4+.45*Math.sin(this.t*5+r.phase*9)**2);const o=r.size*(.85+.25*Math.sin(this.t*3+r.phase*5));r.sprite.scale.set(o,o,1)}if(this.overlay&&this.overlay.scale.setScalar(this.s*this.growK*(1+.02*Math.sin(this.t*1.8))),this.star){this.star.material.rotation+=t*.8;const r=.16*(1+.2*Math.sin(this.t*2.4));this.star.scale.set(r,r,1)}this.label.position.y=this.labelY+Math.sin(this.t*1.3)*.035,this.greetCooldown=Math.max(0,this.greetCooldown-t);const s=this.place.playerAt?.();if(s){const r=Math.abs(s.x-this.spot.x)+Math.abs(s.z-this.spot.z);r<=2&&this.greetArmed&&!this.greetCooldown?(this.greetArmed=!1,this.greetCooldown=8,this.bounce(),this.glowBoost=Math.max(this.glowBoost,.22),this.place.fx?.emit(this._fxPos(),8,{colors:[this.accent,16777215],speed:1,up:1.8,life:600,spread:.4})):r>=4&&(this.greetArmed=!0)}}}class _r{constructor(e,t,n,s,r={}){this.place=e,this.x=t,this.z=n,this.choice=s,this.taken=!1,this.group=new en,this.stone=Tt(gt.stone,.62,"prop:stone"),this.group.add(this.stone),this.label=r.tried?Mt(String(s.value),{bg:"#ece2d0",color:"#9a8b7a",scale:.95}):Mt(String(s.value),{bg:"#fff8ec",scale:.95}),this.label.position.y=.95,this.group.add(this.label),Wd(this.group,.3),this.group.position.copy(e.worldPos(t,n)),this.bobT=Math.random()*10,e.group.add(this.group)}pickUpMesh(){this.taken=!0,this.place.group.remove(this.group);const e=new en,t=Tt(gt.stone,.5,"prop:stone");e.add(t);const n=Mt(String(this.choice.value),{bg:"#fff8ec",scale:.7});return n.position.y=.62,e.add(n),e}update(e){this.taken||(this.bobT+=e/1e3,this.label.position.y=.95+Math.sin(this.bobT*2.2)*.05)}remove(){this.place.group.remove(this.group),this.taken=!0}}class Ih{constructor(e,t,n,s){this.place=e,this.x=t,this.z=n,this.contents=s,this.smashed=!1,this.mesh=Tt(gt.pot,.6,"prop:pot"),this.mesh.position.copy(e.worldPos(t,n)),e.group.add(this.mesh),this.shadow=Wd(e.group,.28),this.shadow&&this.shadow.position.set(this.mesh.position.x,this.mesh.position.y+.02,this.mesh.position.z)}smash(e){if(this.smashed)return null;this.smashed=!0,$.sfx("pop"),this.shadow&&(this.place.group.remove(this.shadow),this.shadow=null),e.poof(this.mesh.position.clone().add(new P(0,.3,0)),18,14258287);const t=this.mesh;return Qe({ms:160,ease:nt.inQuad,onUpdate:(n,s)=>{t.scale.setScalar((1-s)*t.scale.x||.001)},onDone:()=>this.place.group.remove(t)}),this.contents}}const NM=[[1,0],[-1,0],[0,1],[0,-1]];class zM{constructor(e,t,n,s={}){this.place=e,this.cell={x:t,z:n},this.prev={x:t,z:n},this.heading={dx:0,dz:1},this.homeH=e.cellAt(t,n)?.h??0,this.speed=s.speed??1.6,this.rng=s.rng||new vn((t+1)*73856093^(n+1)*19349663),this.frozen=!1,this.startleT=0,this.cooldown=0,this.hop=null,this.pause=150+this.rng.float()*500,this.t=this.rng.float()*10,this.mesh=Jn(Ic.crab,.5,null,"char:crab"),e.group.add(this.mesh),this._cellPos=e.worldPos(t,n),this.mesh.position.copy(this._cellPos),this.mesh.rotation.y=Math.atan2(this.heading.dx,this.heading.dz)}get x(){return this.hop&&this.hop.k>=.5?this.hop.cell.x:this.cell.x}get z(){return this.hop&&this.hop.k>=.5?this.hop.cell.z:this.cell.z}startle(){this.startleT=Math.max(this.startleT,800+this.rng.float()*600)}_neighbors(){const e=[];for(const[t,n]of NM){const s=this.place.cellAt(this.cell.x+t,this.cell.z+n);s&&s.walk&&s.h===this.homeH&&!Sd.has(s.ch)&&e.push({dx:t,dz:n})}return e}_decide(){const e=this._neighbors();if(!e.length){this.pause=500;return}if(this.rng.chance(.16)){this.pause=250+this.rng.float()*950;return}let t=e.filter(o=>this.cell.x+o.dx!==this.prev.x||this.cell.z+o.dz!==this.prev.z);t.length||(t=e);const n=this.rng.float(),s=n<.24?1:n<.36?-1:0,r=s?this.place.playerAt?.():null,a=[];for(const o of t){let l=1;if(o.dx===this.heading.dx&&o.dz===this.heading.dz&&(l+=2.2),r){const d=Math.abs(r.x-this.cell.x)+Math.abs(r.z-this.cell.z),u=Math.abs(r.x-(this.cell.x+o.dx))+Math.abs(r.z-(this.cell.z+o.dz));(s>0&&u<d||s<0&&u>d)&&(l+=1.4)}const c=Math.max(1,Math.round(l*2));for(let d=0;d<c;d++)a.push(o)}this._hopTo(this.rng.pick(a))}_hopTo(e){this.prev={x:this.cell.x,z:this.cell.z},this.heading={dx:e.dx,dz:e.dz};const t={x:this.cell.x+e.dx,z:this.cell.z+e.dz};this.hop={from:this._cellPos,to:this.place.worldPos(t.x,t.z),cell:t,k:0,dur:1e3/this.speed*(.85+this.rng.float()*.4)}}update(e){if(this.t+=e/1e3,this.cooldown>0&&(this.cooldown-=e),this.startleT>0&&(this.startleT-=e),this.frozen=this.startleT>0,this.hop){this._advance(e);return}if(this.frozen){this._startled();return}if(this.pause>0){this.pause-=e,this._idle();return}this._decide()}_advance(e){const t=this.hop;t.k+=e/t.dur;const n=Math.min(1,t.k),s=this.mesh;s.position.x=t.from.x+(t.to.x-t.from.x)*n,s.position.z=t.from.z+(t.to.z-t.from.z)*n,s.position.y=t.from.y+Math.sin(n*Math.PI)*.12+Math.abs(Math.sin(this.t*12))*.04;let a=Math.atan2(this.heading.dx,this.heading.dz)-s.rotation.y;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;s.rotation.y+=a*Math.min(1,e/80),s.rotation.z=0,n>=1&&(this.cell=t.cell,this._cellPos=t.to,this.hop=null,this.pause=this.rng.chance(.4)?150+this.rng.float()*700:0)}_idle(){this.mesh.position.y=this._cellPos.y+Math.abs(Math.sin(this.t*6))*.05,this.mesh.rotation.z=0}_startled(){this.mesh.position.y=this._cellPos.y+Math.abs(Math.sin(this.t*4))*.02,this.mesh.rotation.z=Math.sin(this.t*3)*.06}}class UM{constructor(e,t,n){this.place=e,this.x=t,this.z=n,this.mesh=Tt(gt.altar,.9,"prop:altar"),this.mesh.position.copy(e.worldPos(t,n)),e.group.add(this.mesh);const s=Wd(e.group,.5);s&&s.position.set(this.mesh.position.x,this.mesh.position.y+.02,this.mesh.position.z),this.baseS=this.mesh.scale.x,this.glow=Mt("✨",{scale:.8}),this.glow.position.copy(this.mesh.position).add(new P(0,1.45,0)),e.group.add(this.glow),this.t=0}cheer(){const e=this.mesh,t=this.baseS;Qe({ms:520,ease:nt.outQuad,onUpdate:(n,s)=>{const r=Math.sin(s*Math.PI);e.scale.set(t*(1+r*.1),t*(1+r*.18),t*(1+r*.1))},onDone:()=>e.scale.setScalar(t)})}shake(){const e=this.mesh;Qe({ms:540,ease:nt.linear,onUpdate:(t,n)=>{e.rotation.z=Math.sin(n*Math.PI*3)*.06*(1-n)},onDone:()=>{e.rotation.z=0}})}update(e){this.t+=e/1e3,this.glow.position.y=this.mesh.position.y+1.45+Math.sin(this.t*2.4)*.07,this.glow.material.opacity=.7+Math.sin(this.t*3)*.3}}function Cp(i){const e=i?.story||{};return i?.flags?.festivalDone||e.crabKingReconciled?2:(Array.isArray(e.lines)?e.lines.filter(Boolean).length:0)>=1?1:0}function kp(i){if(!i?.story)return 0;const e=Cp(i);return e>(i.story.mimiPhase??0)&&(i.story.mimiPhase=e),i.story.mimiPhase??0}function GM(i,e,t){const n=[],s=Math.max(0,Math.min(2,i.story?.mimiPhase??Cp(i)));i.flags?.mimiMet||n.push({key:"mimi.meet"});const r=t.filter(d=>d.state==="unlocked"),a=r.find(d=>i.bananas>=d.playerCost);a?n.push({key:"mimi.build_ready",buildId:a.id}):r.length&&n.push({key:"mimi.need_bananas",buildId:r[0].id,vars:{n:r[0].playerCost-i.bananas}});let o=null;for(const[d,u]of Object.entries(e.worlds))(!o||u.pct<o.pct)&&(o={id:d,pct:u.pct});const l=t.find(d=>d.state==="locked");if(l&&o){const d=l.points-Wf(e);d>0&&d<=.5&&n.push({key:"mimi.almost_blueprint",worldId:o.id})}o&&o.pct<1&&n.push({key:"mimi.world_hint",worldId:o.id});const c=i.egg;return c&&c.goal-c.points>0&&c.goal-c.points<=6&&n.push({key:"mimi.egg_soon",vars:{n:c.goal-c.points}}),(i.streak?.count||0)>=3&&n.push({key:"mimi.streak",vars:{n:i.streak.count}}),i.flags?.festivalDone&&n.push({key:"mimi.festival"}),n.push({key:`mimi.phase${s}`}),n.push({key:"mimi.chat.1"},{key:"mimi.chat.2"},{key:"mimi.chat.3"}),n}const HM={taiji:{face:"☯️",friend:null},liangyi:{face:"🌊",friend:"duckling"},sixiang:{face:"🧭",friend:null},bagua:{face:"🌱",friend:"kitten"},wuxing:{face:"🥥",friend:"piglet"},gua:{face:"🍇",friend:"owl"},roots:{face:"🎪",friend:"crab"}},Pp={};for(const i of eo)i.lineIndex!=null&&(Pp[i.lineIndex]=i);const WM=i=>Pp[i]||null,Lp={reveal:{lineIndex:1,pages:["story.beat.reveal.1","story.beat.reveal.2"],faces:["🧭","✨"]},finale:{lineIndex:5,pages:["finale.1","finale.2","finale.3","finale.4"],faces:["🦀","🦀","🦀","🐵"]}};function VM(i){return i.lines[0]&&!i.lines[1]?"reveal":null}function $M(i=[],e={}){const t=[],n=[];for(const s of[...i].sort((r,a)=>r-a)){const r=WM(s);if(!r||!r.world)continue;const a=HM[r.key]||{},o=e[r.world]==="remembered"?"remembered":"earned",l={kind:o,lineIndex:s,chapterKey:r.key,world:r.world,friend:a.friend||null,face:a.face||"✨"};o==="remembered"?n.push(l):t.push(l)}return n.length===1?t.unshift(n[0]):n.length>1&&t.unshift({kind:"remembered_batch",lineIndices:n.map(s=>s.lineIndex),worlds:n.map(s=>s.world),face:"✨"}),t}const jM={"title.tagline":"Bring the numbers home!","attract.tagline":"The Crab King stole the numbers. Wake the island!","attract.cta":"Start Adventure","attract.prompt":"Tap the island — or press Space!","attract.beat.garden":"Grow gardens","attract.beat.share":"Share coconuts","attract.beat.pets":"Hatch pets","attract.beat.gems":"Light gems","attract.beat.bloom":"Make it bloom","title.play":"Play","title.who":"Who is playing?","title.new_player":"+ New explorer","title.name_prompt":"What is your name?","title.wizard_step_1":"Explorer setup, step 1 of 2","title.wizard_step_2":"Explorer setup, step 2 of 2","title.wizard_name_title":"Name your explorer","title.name_required":"Type a name first.","title.wizard_avatar_title":"Who do you want to be?","title.wizard_pet_title":"Pick a first buddy","title.wizard_trail_title":"Choose a trail","title.wizard_parent_note":"Grown-ups can tune the learning path later in For parents.","title.trail_sprout":"Sprout Trail","title.trail_sprout_body":"Small steps","title.trail_climber":"Climber Trail","title.trail_climber_body":"Ready to climb","title.trail_explorer":"Explorer Trail","title.trail_explorer_body":"Bigger quests","title.trail_unsure":"Not sure","title.trail_unsure_body":"Mimi will check","title.age_prompt":"How old are you?","title.age_help":"This helps the island start in a good place.","title.birthday_prompt":"Birthday","title.birthday_help":"A birthday keeps the path growing each year.","title.curriculum_prompt":"Country and curriculum","title.curriculum_help":"Parents can change the learning path later.","title.start":"Let's go!","title.parents":"For parents","title.duel":"Duel","placement.title":"Wake the island gently","placement.body":"Try a few tiny number quests so Mimi knows where to begin.","placement.start":"Start warm-up","placement.skip":"Skip for now","placement.done":"The island knows where to begin!","placement.answer":"Answer","placement.step":"Question {n} of {total}","warmup.q.fetch":"Choose the correct answer.","warmup.q.missing":"Choose the missing number.","warmup.q.share_fetch":"Choose how many go in each basket.","warmup.q.compare":"Choose the largest fraction.","warmup.q.equiv":"Choose the fraction equal to {frac}.","warmup.q.frac_of":"Choose how much {frac} of {whole} is.","ui.back":"Back","ui.close":"Close","ui.done":"Done","ui.yes":"Yes!","ui.no":"Not now","ui.ok":"OK","ui.delete":"Delete","ui.confirm_delete":"Delete this explorer forever?","story.1":"Oh no! The <b>Crab King</b> pinched all the numbers of our island…","story.2":"Without numbers the grove turned <b>gray</b>. We forgot how to plant, share and bake!","story.3":"Will you help bring the numbers home? The island will <b>bloom</b> wherever you do!","story.4":"Our island was once <b>one whole thing</b>. We’ll weave it back together — <b>one gentle line at a time</b>. ☯️","story.line.title":"A line returns! ✨","story.line.earned":"You brought <b>{world}</b> all the way home — a new line lights up on the island!","story.line.remembered":"You already know <b>{world}</b> by heart, so its line draws itself. ✨","story.line.remembered_batch":"You already know these shores by heart — their lines draw themselves. ✨","story.line.friend_home":"And look — a friend comes home! 💛","story.balance.label":"Balance Dial","story.balance.value":"{n} of 6 lines","story.complete":"All six lines are drawn — the grove is whole and in balance again! ☯️","story.beat.reveal.1":"Wait… there used to be <b>four</b> of everything here. Four shores, four winds, four little altars. 🧭","story.beat.reveal.2":"A second line returns, and the <b>Four Directions</b> wake up — the whole island opens around you. ✨","altar.title":"Balance Dial","altar.sub":"How even is the grove?","altar.balance":"Balance","altar.in_balance":"In balance! ☯️","altar.tip":"Aim for the middle — a grove that is <b>even</b> is happier than one that is stuffed full.","altar.lines":"Lines returned","altar.goal":"When all six lines are even, the grove is whole — the <b>Even Grove</b>.","altar.complete":"The <b>Even Grove</b> — every line in its place, perfectly in balance. ☯️","altar.open":"☯️ Balance Dial","hub.welcome":"Welcome back, {name}! 🌴","hub.pick_world":"Where shall we play?","world.tide":"Tide Pools","world.garden":"Banana Garden","world.stump":"Sharing Stump","world.vines":"Vine Heights","hub.gemtree":"Gem Tree","hub.shop":"Shop","hub.pets":"Pets","hub.daily_gift":"Daily gift!","hub.streak_extended":"🔥 Day {n} in a row!","hub.streak_frozen":"❄️ Your streak freeze kept day {n} safe!","hub.streak_reset":"A fresh start — day 1! Pip kept your spot warm. 💛","business.title":"Bakery Pizzeria","business.zone.bakery":"Bakery","business.zone.pizzeria":"Pizzeria","business.order_ready":"Order ready - tap a station","business.order":"Order","business.stock":"Stock","business.upgrades":"Upgrades","business.pay":"Pay","business.prep":"Prep","business.done":"Done","business.open":"Open shop","business.close_day":"Close for today","business.serve":"Serve","business.restock":"Restock","business.buy":"Buy","business.not_enough":"Not enough shop coins yet.","business.stock_full":"That shelf is full.","business.recipe.margherita":"Margherita pizza","business.recipe.tomato_pizza":"Tomato pizza","business.recipe.flatbread":"Flatbread","business.recipe.berry_tart":"Berry tart","business.ingredient.dough":"Dough","business.ingredient.sauce":"Sauce","business.ingredient.cheese":"Cheese","business.ingredient.tomato":"Tomato","business.ingredient.flour":"Flour","business.ingredient.berries":"Berries","business.ingredient.milk":"Milk","business.upgrade.extra_oven":"Extra oven","business.upgrade.bigger_pantry":"Bigger pantry","business.upgrade.bright_sign":"Bright sign","business.summary":"Today","business.profit":"Profit","business.orders_served":"{n} orders served","business.prep.portion":"Cut it into equal pieces, then pick the topping.","business.prep.repeat":"{trays} trays, {perTray} on each. How many in total?","business.prep.measure":"Measure the right ingredient for this order.","business.prep.fraction":"Take {num}/{den} of {of}. How many is that?","business.prep.scale":"Make {factor}× the recipe — set each amount.","business.prep.pieces":"pieces","business.prep.total":"in total","business.unit.cups":"cups","business.unit.amount":"amount","business.pay.make":"Make {amount} with coins.","business.pay.total":"Total","business.pay.reset":"Start over","business.pay.change":"They pay {paid}. How much change?","business.pay.discount":"{percent}% off {was}. What is the new price?","business.review.profit":"We took in {rev} and spent {cost}. What is the profit?","business.review.demand":"Which treat sold the most today?","business.review.convert":"{kg} kg of flour — how many grams?","business.review.grams":"{n} g","business.review.compare":"Which is the better deal?","business.review.pack":"{count} for {price}","business.station.counter":"Counter","business.station.prep":"Prep","business.station.oven":"Oven","business.station.pantry":"Pantry","business.station.coinTray":"Till","business.station.orderBoard":"Upgrades","business.almost":"Almost — look again!","business.hint.portion_halves_quarters":"Halves make 2 pieces, quarters make 4.","business.hint.repeated_addition_orders":"Count one tray, then add it once for each tray.","business.hint.recipe_measure_whole":"Pick flour first, then how many cups.","business.hint.fraction_of_quantity_recipe":"Split it into equal parts, then take that many.","business.hint.scale_recipe":"Multiply each amount by the number of orders.","business.hint.money_make_amounts":"Add coins until the total matches the price.","business.hint.decimal_money_change":"Change is what they paid minus the price.","business.hint.percentage_discount":"10% is one tenth — take that off the price.","business.supplied":"A supply crate arrived to help! 📦","business.bake.raw":"Bake it at the oven 🔥","business.bake.baking":"In the oven… 🍞","business.bake.ready":"Baked! Serve it 🍞","business.bake.cooled":"It cooled down — still tasty! 🍞","business.bake.cooled_coach":"Still yummy! Next time serve it while it’s golden for a little tip. 😊","business.bake.prep_first":"Make the food before baking.","business.bake.first":"Bake it at the oven first! 🔥","business.fresh_tip":"Fresh tip!","stage.songs":"Choose a song","stage.play":"Play","stage.locked":"Unlocks in {grade}","stage.done":"Done","stage.listen":"Listen 🎧","stage.clear":"Start over","stage.almost":"Almost — try again!","stage.correct":"Beautiful! 🎵","stage.song.echo":"Echo Song","stage.song.echo.desc":"Watch Kiki, then tap the tune back.","stage.song.count":"Counting Song","stage.song.count.desc":"Ring the gong on the beats you count to.","stage.song.beat":"Beat Bar","stage.song.beat.desc":"Fill one bar with the right notes.","stage.echo.prompt":"Watch Kiki play, then tap the same tune back!","stage.count.prompt":"Count by {step}s — ring the gong on each one!","stage.count.play":"Count along","stage.beat.prompt":"Fill the bar — make exactly one whole!","stage.beat.total":"So far","stage.beat.whole":"1 whole","stage.hint.echo":"Tap the pads in the same order Kiki did.","stage.hint.count":"Skip-count out loud, and ring on each number you land on.","stage.hint.beat":"The pieces must add up to exactly one whole bar.","play.chamber":"Chamber {n} of {total}","play.correct.1":"YES! You did it!","play.correct.2":"Wonderful!","play.correct.3":"You can really see it now!","play.correct.4":"Banana-tastic!","play.echo_door":"The <b>Echo Realm</b> shimmers open — the island’s quiet reflection. Tend it and it stays bright! ✨","play.echo_enter":"Peek inside","play.skip":"Onwards!","play.exit_confirm":"Back to the island?","play.crab_yoink":"Yoink! The crab scattered {n} bananas — grab them back!","play.carry_safe":"Crabs nap while you carry a stone. Think calmly!","play.altar_wants":"The altar sparkles… bring it the answer stone! 🗿","q.fetch":"Find the right stone and carry it to the altar!","q.count":"What comes next? Fetch that number!","q.missing":"Which number is hiding?","q.array_both":"Grow a bed with {rows} rows of {cols}!","q.array_rows":"Plant {total} sprouts in {rows} fair rows!","q.array_total":"Grow a bed with exactly {total} sprouts!","q.share":"Share {total} coconuts fairly over {baskets} baskets!","q.share_remainder":"Share {total} coconuts fairly over {baskets} baskets. Leave leftovers on the stump!","q.share_fetch":"{total} coconuts, {baskets} baskets — how many in each? Fetch that stone!","q.numberline":"Stand where {frac} lives and ring the bell!","q.compare":"Fetch the LARGEST fraction!","q.compare_dec":"Fetch the LARGEST number!","q.equiv":"Fetch the fraction that equals {frac}!","q.frac_of":"How much is {frac} of {whole}?","ex.addsub_confuse":"That's {a} + {b}! For {a} × {b} we make <b>{a} rows of {b}</b> — look!","ex.off_by_table":"Sooo close — one row more or less! <b>{a} rows of {b}</b> makes <b>{answer}</b>.","ex.no_carry":"Don't forget to carry the ten! Look: it makes <b>{answer}</b>.","ex.borrow":"Tricky one — we need to borrow a ten. It makes <b>{answer}</b>.","ex.reversed":"Almost! The digits swapped seats. It is <b>{answer}</b>.","ex.whole_number_bias":"Surprise: a bigger bottom number means <b>smaller pieces</b>! Cut in {d}, each piece shrinks.","ex.add_tops_bottoms":"Fraction pieces must be the <b>same size</b> before they add — watch!","ex.remainder_ignored":"Don't forget the leftovers — <b>{remainder} remain</b> after sharing!","ex.near_miss":"Sooo close! Count once more — it's <b>{answer}</b>.","ex.div_fact":"Think backwards: <b>{a} × {b} = {c}</b> — so {c} ÷ {a} = <b>{b}</b>!","ex.missing_factor":"How many rows of {b} make {c}? <b>{a} rows</b> — because {a} × {b} = {c}!","ex.equiv":"Same amount, different pieces! <b>{n}/{d}</b> covers exactly the same space.","ex.magnitude":"Think: is <b>{n}/{d}</b> closer to 0, a half, or 1?","ex.magnitude_low":"A little further! <b>{n}/{d}</b> is more than where you stood.","ex.magnitude_high":"A step back! <b>{n}/{d}</b> is less than where you stood.","ex.unfair_share":"Fair sharing: every basket gets the <b>same</b>. Tap the stump (or press X) to take one back!","ex.share_more":"The pile still has enough for another round — keep sharing!","ex.array_shape":"Right amount! But we need <b>{rows} rows</b> — walk to reshape the bed.","ex.array_count":"Your bed holds <b>{value}</b>. We need <b>{total}</b> — walk to make it bigger or smaller!","ex.generic":"Look at the picture — it shows the secret!","ex.decimal_length":"A longer number isn't always bigger! Line them up — <b>{answer}</b> is the most.","ex.comma_misalign":"Keep the comma in line! Tens with tens, tenths with tenths — it makes <b>{answer}</b>.","hint.look":"Watch the picture — then try again. You can do this! 💪","hint.pinch":"✌️ Pinch to zoom · drag with two fingers to look around","verb.array_plant":"walk onto the soil — 🌱 plants the first corner","verb.array_stretch":"press 🌱 when the size is right · 🌱 on the flag takes it back","verb.array_offsoil":"beds only grow on the soil — hop back on!","verb.array_need_soil":"Stand on the brown soil first!","verb.array_unplant":"Flag picked up — plant it anywhere!","verb.share_sub":"tap a basket to share · tap the stump to take back","verb.share_remainder_sub":"share equally · leftovers stay on the stump","helper.turtle":"Tuk the Turtle","helper.bunny":"Pip the Bunny","helper.duckling":"Dot the Duckling","helper.owl":"Olli the Owl","helper.fetch":"Work it out first, then carry the answer stone to the ✨ altar! Picked the wrong one? Walk onto another stone to swap, or press ⬇️ to set it down. Crabs nap while you carry — and pots hide surprises!","helper.array":"Stand on the soil and press 🌱 to plant a flag. Then walk — the bed stretches with you! Press 🌱 again when the size is right. Changed your mind? Press 🌱 on the flag to pick it back up.","helper.numberline":"The ▲ marks chop the vine into equal hops! Walk to where your fraction lives and ring the 🔔.","helper.share":"Tap a basket to drop a coconut in — every basket must get the same! Then press ✅. If there are leftovers, leave them on the stump. Took one too many? Tap the stump!","helper.cheer.1":"You can do this! 🌟","helper.cheer.2":"Mistakes are how we learn — just try something!","helper.cheer.3":"Take your time. Count nice and slow!","helper.cheer.4":"Stuck? Press 💡 and I will show you a picture!","skill.counting":"Counting and order","skill.number_bonds":"Number bonds","skill.add_20":"Adding to 20","skill.sub_20":"Taking away to 20","skill.missing_addend":"Mystery numbers (+)","skill.add_100":"Adding to 100","skill.sub_100":"Taking away to 100","skill.tables_a":"Tables of 2, 5, 10","skill.tables_b":"Tables of 3, 4, 6","skill.tables_c":"Tables of 7, 8, 9","skill.tables_mix":"All tables mixed","skill.mult_2digit":"Big multiplying","skill.div_facts":"Sharing facts","skill.share":"Fair sharing","skill.div_remainder":"Sharing with leftovers","skill.missing_factor":"Mystery numbers (×)","skill.frac_magnitude":"Where fractions live","skill.frac_compare":"Comparing fractions","skill.frac_equiv":"Twin fractions","skill.frac_of_n":"A fraction of a number","skill.big_numbers":"Big numbers","skill.dec_compare":"Comparing decimals","skill.dec_addsub":"Adding decimals","skill.dec_muldiv":"Times and share decimals","skill.frac_dec_pct":"Fractions, decimals, percent","skill.percent_of":"Percent of an amount","skill.percent_adv":"Big percentages","skill.scale":"Scale and maps","result.title":"Chamber complete!","result.next":"Next chamber","result.home":"To the island","result.gem":"New gem: {fact}!","result.gem_twin":"{fact} lights its twin {twin} too! ✨","result.mastered":"You can really SEE {skill} now! 🌟","result.bloomed":"{world} is blooming! 🌸","result.tap_chest":"Tap the chest!","result.wonder":"Did you know?","egg.progress":"The egg wiggles…","egg.ready":"The egg is ready to hatch!","egg.hatch":"Tap tap tap…","egg.hatched":"{pet} hatched! 🎉","egg.all_pets":"Pip is amazed — you befriended every pet!","pets.title":"Your pets","pets.follow":"Following you","pets.choose":"Tap a pet to bring it along","pet.bunny":"Bunny","pet.duckling":"Duckling","pet.kitten":"Kitten","pet.piglet":"Piglet","pet.redpanda":"Red Panda","pet.turtle":"Turtle","pet.owl":"Owl","pet.dragon":"Mini Dragon","pet.monkey":"Monkey","pet.mimi":"Mimi","rarity.common":"Common","rarity.rare":"Rare","rarity.epic":"Epic","rarity.legendary":"Legendary","gems.title":"The Banyan Gem Tree","gems.sub":"Every table you master becomes a gem. Twins light together!","gems.hex_title":"The secret 64","gems.hex_sub":"Your gems are the same 64 patterns as the ancient Book of Changes — and the 64 tiny letters that spell every living thing. 💎🧬","gems.count":"{n} of {total} gems shine","gems.skills":"Your powers","shop.title":"Coco’s Shop","shop.hats":"Hats","shop.furs":"Fur colors","shop.trails":"Trails","shop.buy":"Buy","shop.equip":"Wear","shop.equipped":"Wearing","shop.too_pricey":"Not enough bananas yet — play to earn more!","shop.freeze":"Streak freeze","shop.freeze_desc":"Keeps your flame safe if you skip a day","shop.cosmetic_note":"Hats & fur colours show on Monkey and Mimi 🐵","hat.cap":"Cap","hat.bow":"Bow","hat.crown":"Crown","hat.flowercrown":"Flower crown","hat.beanie":"Beanie","hat.wizard":"Wizard hat","hat.pirate":"Pirate hat","hat.party":"Party hat","fur.classic":"Classic","fur.golden":"Golden","fur.snow":"Snow","fur.pink":"Pink","fur.lavender":"Lavender","fur.mint":"Mint","fur.midnight":"Midnight","fur.redpanda":"Red Panda","trail.sparkle":"Sparkles","trail.petal":"Petals","trail.bubble":"Bubbles","trail.star":"Stars","mimi.meet":"I'm <b>Mimi</b>! I dream up blueprints for our island — bring numbers home and I'll have ideas to build. Tap me whenever you want to chat! 🌺","mimi.build_ready":"You saved enough bananas for the <b>{name}</b>! Come to my worktable! 📜","mimi.need_bananas":"Only <b>{n}</b> 🍌 to go for the <b>{name}</b> — the chambers are full of bananas!","mimi.almost_blueprint":"My next blueprint idea is sooo close… a few more numbers from <b>{world}</b> should do it! ✨","mimi.world_hint":"<b>{world}</b> still looks a little sleepy and gray. Shall we bring its numbers home?","mimi.egg_soon":"Your egg is wiggling! About <b>{n}</b> more right answers and it hatches! 🥚","mimi.streak":"Day {n} in a row — the whole grove is cheering for you! 🔥","mimi.festival":"The grove has never felt this alive. And it’s all thanks to you! 🎆","wonder.twin_gem.title":"The mirror twin","wonder.twin_gem.body":"When you learn 4 × 6, its twin 6 × 4 lights up for free — the same gem, just turned around. Lots of things in nature come in mirror pairs like that. ✨","wonder.array_both_ways.title":"Two ways to read a garden","wonder.array_both_ways.body":"Rows or columns — the same bed of sprouts. You can read it either way and the count never changes. 🌱","wonder.fact_and_division.title":"One wheel, turned","wonder.fact_and_division.body":"6 × 4 = 24 and 24 ÷ 4 = 6 are the same wheel turned a different way. Multiply, then divide, and you come right back home. 🎡","wonder.music_skip_count.title":"Maths you can hear","wonder.music_skip_count.body":"That little tune is skip-counting! 2, 4, 6, 8 — counting and music are the same heartbeat. 🎵","wonder.bakery_pie.title":"A fraction you can eat","wonder.bakery_pie.body":"Cut the pie in 4 and take 1 — that slice IS one quarter. Fractions are just sharing something yummy. 🥧","wonder.gem_tree_64.title":"The same 64, everywhere","wonder.gem_tree_64.body":"The Gem Tree holds 64 gems. So does the ancient I Ching — and so does the code inside your own DNA: 64 tiny words that build every living thing. The same pattern, told three ways. 💎🧬","wonder.one_line.title":"One gentle line at a time","wonder.one_line.body":"The kindest way to learn and the deepest old Book of Changes agree: never leap a cliff — change just one thing at a time, and you can go anywhere. 🌿","mimi.phase0":"I… I used to forget a fact and just freeze up. The Crab King took so much. Maybe it was my fault for not counting fast enough.","mimi.phase1":"You know what? Watching you, I'm starting to think it's okay to be slow. A friend came home today — maybe I can learn again too. 🌱","mimi.phase2":"Look at me now — I forgot a seven, laughed, and worked it out anyway! Being mid-learning isn't broken. It's the most alive thing there is. 🌺","mimi.chat.1":"I love watching the butterflies come back. The more the island blooms, the more friends arrive! 🦋","mimi.chat.2":"Did you know the Gem Tree remembers every fact you master? Tap it sometime! 💎","mimi.chat.3":"Pip says hi from the egg nest! The pets adore you, you know. 💛","island.title":"Mimi's worktable","island.sub":"Bring numbers home and Mimi dreams up blueprints. Bananas pay the materials — what shall we build?","island.progress":"{n} of {total} built","island.locked_name":"A future dream…","island.locked_hint":"Keep bringing numbers home — new blueprint ideas will come to Mimi!","island.new_blueprint":"📜 New blueprint: {name}!","island.mimi_worktable":"Come see my worktable — I have blueprints! 📜","island.built_say":"It’s wonderful! The grove feels a little more alive. 🌸","island.daily_fruit":"🦊 Rin saved you {n} bananas from the fruit stand!","island.daily_bread":"🐷 Mo baked banana bread — the egg loves it!","island.crab_pays":"🦀 The Crab King opens his hoard and pays {n} bananas!","portal.stage1":"🌱 A little vine sprouts on the {name} gate!","portal.stage2":"🌿 Vines are climbing the {name} gate!","portal.stage3":"🌺 The {name} gate is blooming!","portal.stage4":"✨ The {name} gate is in full bloom!","build.lanterns":"Lantern path","build.lanterns_desc":"Warm lights for the village square.","build.fruitstand":"Fruit stand","build.fruitstand_desc":"Rin the Red Panda moves in — she saves you bananas every day!","build.garden":"Flower garden","build.garden_desc":"Blossoms and butterflies near Vine Heights.","build.stage":"Music stage","build.stage_desc":"Kiki the Kitten moves in — tap the gong for a tune!","build.bakery":"Bakery","build.bakery_desc":"Mo the Piglet moves in — daily banana bread feeds your egg!","build.pizzeria":"Pizzeria","build.pizzeria_desc":"Olli the Owl moves in — slice pizzas into tasty fractions!","build.bridge":"Bridge to the islet","build.bridge_desc":"Cross the water to the little island in the east.","build.plaza":"Festival plaza","build.plaza_desc":"The grand finale — a feast for the whole grove!","npc.fruitstand":"Rin the Red Panda","npc.stage":"Kiki the Kitten","npc.bakery":"Mo the Piglet","npc.pizzeria":"Olli the Owl","npc.crabking":"The Crab King","npc.fruitstand.hello":"A real fruit stand! I’ll set some bananas aside for you every day. 🍌","npc.fruitstand.1":"Fresh fruit, fair prices — I count every banana twice!","npc.fruitstand.2":"Come back tomorrow — I’ll have saved something for you!","npc.stage.hello":"A stage! Finally a place for my songs. Ring the gong with me!","npc.stage.1":"Every right answer sounds like music to me! 🎵","npc.stage.2":"Shall we make some noise? Tap the gong!","npc.bakery.hello":"The oven is warm! Banana bread every day — your egg will love it. 🥖","npc.bakery.1":"Baking is just fair sharing… of deliciousness!","npc.bakery.2":"Half a recipe? That’s fractions, friend!","npc.pizzeria.hello":"Welcome to the pizzeria! Every pizza is a circle of fractions. 🍕","npc.pizzeria.1":"Two slices of eight? That’s one quarter — hoot hoot!","npc.pizzeria.2":"Fair slices make happy customers. Cut them even!","npc.crabking.1":"I only pinched the numbers because I couldn’t count them… sorry!","npc.crabking.2":"This is the best festival the grove has ever seen. 🎪","finale.1":"Wait!! Before you build the plaza… I, the <b>Crab King</b>, have something to say.","finale.2":"I pinched the numbers because I couldn’t count — and I was too shy to ask for help…","finale.3":"But you! You brought them all home. Please, take my hoard — <b>I’m paying half the plaza!</b>","finale.4":"Then let’s build it TOGETHER — the whole grove is invited! 🎉","finale.festival":"🎆 The grove is whole again — festival time! You did this, {name}!","parents.title":"For parents","parents.body":"Monkey Grove practices arithmetic the way research says children learn it: visual models first (arrays, number lines, fair sharing), no time pressure, no punishment for mistakes — every error shows the model and explains why. An invisible rating system keeps each skill at roughly 65% success: challenging, never crushing.","parents.wonders":"Did you know?","parents.choose_child":"Which explorer?","parents.no_profiles":"No explorers yet. Start an adventure to add one.","parents.skills":"Skill overview","parents.business":"Bakery/pizzeria practice","parents.stage_practice":"Music stage practice","parents.curriculum":"Curriculum","parents.country":"Country","parents.birthday":"Birthday","parents.curriculum_pack":"Learning path","parents.stage":"Stage","parents.strictness":"Targeting","parents.strictness_soft":"Soft guidance","parents.strictness_strict":"Stay close to this stage","parents.coverage":"Coverage","parents.covered":"covered","parents.partial":"started","parents.playable":"ready to play","parents.planned":"planned","parents.accuracy":"Recent accuracy","parents.attempts":"{n} attempts","parents.mastered":"mastered","curriculum.country.nl":"Netherlands","curriculum.nl_po.title":"Dutch primary math (NL_PO)","curriculum.stage":"Stage {n}","curriculum.nl_po.stage.grade_1":"Grade 1","curriculum.nl_po.stage.grade_2":"Grade 2","curriculum.nl_po.stage.grade_3":"Grade 3","curriculum.nl_po.stage.grade_4":"Grade 4","curriculum.nl_po.stage.grade_5":"Grade 5","curriculum.nl_po.stage.grade_6":"Grade 6","curriculum.nl_po.stage.grade_7":"Grade 7","curriculum.nl_po.stage.grade_8":"Grade 8","curriculum.domain.numbers":"Numbers","curriculum.domain.operations":"Operations","curriculum.domain.ratios":"Ratios and fractions","curriculum.domain.measurement_geometry":"Measurement and geometry","curriculum.domain.data_relationships":"Data and relationships","curriculum.nl_po.objective.counting_and_order":"Counting, comparing and ordering","curriculum.nl_po.objective.number_bonds_to_10":"Number bonds and splits of 10","curriculum.nl_po.objective.big_numbers_place_value":"Big numbers and place value","curriculum.nl_po.objective.decimals_compare":"Compare decimals (0.4 vs 0.12)","curriculum.nl_po.objective.decimals_operations":"Add, subtract and scale decimals","curriculum.nl_po.objective.scale_ratio":"Scale and ratio","curriculum.nl_po.objective.percent_advanced":"Advanced percentages","curriculum.nl_po.objective.add_sub_to_20":"Add and subtract to 20","curriculum.nl_po.objective.missing_addend_intro":"Find missing numbers in addition","curriculum.nl_po.objective.add_sub_to_100":"Add and subtract to 100","curriculum.nl_po.objective.tables_2_5_10":"Tables of 2, 5, and 10","curriculum.nl_po.objective.fair_sharing_intro":"Fair sharing","curriculum.nl_po.objective.money_to_100":"Money amounts to 100","curriculum.nl_po.objective.tables_3_4_6":"Tables of 3, 4, and 6","curriculum.nl_po.objective.tables_7_8_9":"Tables of 7, 8, and 9","curriculum.nl_po.objective.all_tables_mixed":"All tables mixed","curriculum.nl_po.objective.measurement_units_intro":"Measurement units","curriculum.nl_po.objective.decimal_money_context":"Decimal money and change","curriculum.nl_po.objective.multi_digit_multiplication":"Multi-digit multiplication","curriculum.nl_po.objective.division_facts_and_inverse":"Division facts and inverse multiplication","curriculum.nl_po.objective.division_with_remainders":"Division with remainders","curriculum.nl_po.objective.fraction_magnitude":"Fractions on a number line","curriculum.nl_po.objective.fraction_of_quantity":"Fractions of quantities","curriculum.nl_po.objective.unit_conversion_context":"Units and stock","curriculum.nl_po.objective.price_comparison":"Price comparison","curriculum.nl_po.objective.fraction_compare_equivalence":"Compare and match equivalent fractions","curriculum.nl_po.objective.percentages_intro":"Introductory percentages","curriculum.nl_po.objective.profit_margin_intro":"Revenue, cost, and profit","curriculum.nl_po.objective.scale_recipe":"Scale recipes","curriculum.nl_po.objective.scale_and_coordinates":"Scale and coordinates","curriculum.nl_po.objective.operations_maintenance":"Grade 8 operations practice","curriculum.nl_po.objective.fraction_decimal_percent_relations":"Fractions, decimals, and percentages","curriculum.nl_po.objective.inverse_reasoning":"Inverse multiplication reasoning","curriculum.nl_po.objective.advanced_data_reasoning":"Advanced data reasoning","settings.title":"Settings","settings.lang":"Language","settings.sfx":"Sounds","settings.music":"Music","settings.ambience":"Nature sounds","settings.reduce_motion":"Calm motion","settings.dyslexia_font":"Easy-read font","settings.high_contrast":"High contrast","settings.colorblind":"Colour-friendly","settings.text_size":"Text size","settings.graphics":"Graphics","settings.graphics_auto":"Auto","settings.graphics_low":"Low","settings.graphics_medium":"Medium","settings.graphics_high":"High","settings.graphics_relaunch":"Some graphics changes apply next time you open the game.","settings.switch_player":"Switch explorer","nav.back":"Back","nav.close":"Close","hud.hint":"Hint","hud.action":"Action","hud.home":"Home","duel.title":"Banana Duel","duel.sub":"Two explorers, same chambers — who gathers more bananas?","duel.pick2":"Choose two explorers","duel.turn":"{name}, your turn!","duel.pass":"Pass the device to {name}","duel.round":"Round {n} of {total}","duel.winner":"🏆 {name} wins with {score} bananas!","duel.tie":"It's a tie — the monkeys share the bananas!","duel.code":"Challenge code","duel.code_desc":"Send this code to a friend — they play the same chambers!","duel.enter_code":"Enter a challenge code","duel.play_code":"Play challenge"},qM={"title.tagline":"Breng de getallen thuis!","attract.tagline":"De Krabbenkoning stal de getallen. Maak het eiland wakker!","attract.cta":"Start avontuur","attract.prompt":"Tik op het eiland — of druk op spatie!","attract.beat.garden":"Laat tuinen groeien","attract.beat.share":"Deel kokosnoten","attract.beat.pets":"Broed dieren uit","attract.beat.gems":"Laat edelstenen stralen","attract.beat.bloom":"Laat alles bloeien","title.play":"Spelen","title.who":"Wie gaat er spelen?","title.new_player":"+ Nieuwe ontdekker","title.name_prompt":"Hoe heet je?","title.wizard_step_1":"Ontdekker maken, stap 1 van 2","title.wizard_step_2":"Ontdekker maken, stap 2 van 2","title.wizard_name_title":"Geef je ontdekker een naam","title.name_required":"Typ eerst een naam.","title.wizard_avatar_title":"Wie wil je zijn?","title.wizard_pet_title":"Kies je eerste maatje","title.wizard_trail_title":"Kies een pad","title.wizard_parent_note":"Grote mensen kunnen het leerpad later aanpassen bij Voor ouders.","title.trail_sprout":"Spruitpad","title.trail_sprout_body":"Kleine stappen","title.trail_climber":"Klimpad","title.trail_climber_body":"Klaar om te klimmen","title.trail_explorer":"Ontdekkerspad","title.trail_explorer_body":"Grotere tochten","title.trail_unsure":"Ik weet het niet","title.trail_unsure_body":"Mimi kijkt mee","title.age_prompt":"Hoe oud ben je?","title.age_help":"Zo kan het eiland rustig beginnen op een fijne plek.","title.birthday_prompt":"Verjaardag","title.birthday_help":"Met een verjaardag groeit het leerpad elk jaar mee.","title.curriculum_prompt":"Land en leerlijn","title.curriculum_help":"Ouders kunnen het leerpad later aanpassen.","title.start":"We gaan!","title.parents":"Voor ouders","title.duel":"Duel","placement.title":"Maak het eiland rustig wakker","placement.body":"Probeer een paar kleine getalzoektochten zodat Mimi weet waar we beginnen.","placement.start":"Start warming-up","placement.skip":"Nu overslaan","placement.done":"Het eiland weet waar we beginnen!","placement.answer":"Antwoord","placement.step":"Vraag {n} van {total}","warmup.q.fetch":"Kies het juiste antwoord.","warmup.q.missing":"Kies het ontbrekende getal.","warmup.q.share_fetch":"Kies hoeveel er in elke mand gaan.","warmup.q.compare":"Kies de grootste breuk.","warmup.q.equiv":"Kies de breuk die gelijk is aan {frac}.","warmup.q.frac_of":"Kies hoeveel {frac} van {whole} is.","ui.back":"Terug","ui.close":"Sluiten","ui.done":"Klaar","ui.yes":"Ja!","ui.no":"Nu even niet","ui.ok":"OK","ui.delete":"Verwijderen","ui.confirm_delete":"Deze ontdekker voorgoed verwijderen?","story.1":"O nee! De <b>Krabbenkoning</b> heeft alle getallen van ons eiland gejat…","story.2":"Zonder getallen werd het bos <b>grijs</b>. We weten niet meer hoe je plant, deelt en bakt!","story.3":"Help jij de getallen thuisbrengen? Het eiland gaat <b>bloeien</b> waar jij dat doet!","story.4":"Ons eiland was ooit <b>één geheel</b>. We weven het weer aan elkaar — <b>één rustige lijn tegelijk</b>. ☯️","story.line.title":"Een lijn keert terug! ✨","story.line.earned":"Je bracht <b>{world}</b> helemaal thuis — er licht een nieuwe lijn op het eiland op!","story.line.remembered":"Je kent <b>{world}</b> al uit je hoofd, dus die lijn tekent zichzelf. ✨","story.line.remembered_batch":"Je kent deze kusten al uit je hoofd — hun lijnen tekenen zichzelf. ✨","story.line.friend_home":"En kijk — er komt een vriend thuis! 💛","story.balance.label":"Balansschijf","story.balance.value":"{n} van 6 lijnen","story.complete":"Alle zes lijnen zijn getekend — het bos is weer heel en in balans! ☯️","story.beat.reveal.1":"Wacht… er waren hier vroeger <b>vier</b> van alles. Vier kusten, vier winden, vier kleine altaren. 🧭","story.beat.reveal.2":"Een tweede lijn keert terug, en de <b>Vier Richtingen</b> worden wakker — het hele eiland opent zich om je heen. ✨","altar.title":"Balansschijf","altar.sub":"Hoe gelijk is het bos?","altar.balance":"Balans","altar.in_balance":"In balans! ☯️","altar.tip":"Mik op het midden — een bos dat <b>gelijk</b> is, is blijer dan een bos dat volgepropt zit.","altar.lines":"Teruggekeerde lijnen","altar.goal":"Als alle zes lijnen gelijk zijn, is het bos heel — het <b>Gelijke Bos</b>.","altar.complete":"Het <b>Gelijke Bos</b> — elke lijn op zijn plek, perfect in balans. ☯️","altar.open":"☯️ Balansschijf","hub.welcome":"Welkom terug, {name}! 🌴","hub.pick_world":"Waar gaan we spelen?","world.tide":"Getijdenpoel","world.garden":"Bananentuin","world.stump":"Deelstronk","world.vines":"Lianenhoogte","hub.gemtree":"Edelsteenboom","hub.shop":"Winkel","hub.pets":"Huisdieren","hub.daily_gift":"Dagcadeautje!","hub.streak_extended":"🔥 Dag {n} op rij!","hub.streak_frozen":"❄️ Je vlam-bevriezer hield dag {n} veilig!","hub.streak_reset":"Een frisse start — dag 1! Pip hield je plekje warm. 💛","business.title":"Bakkerij Pizzeria","business.zone.bakery":"Bakkerij","business.zone.pizzeria":"Pizzeria","business.order_ready":"Bestelling klaar - tik op een werkplek","business.order":"Bestelling","business.stock":"Voorraad","business.upgrades":"Verbeteringen","business.pay":"Betalen","business.prep":"Maken","business.done":"Klaar","business.open":"Winkel openen","business.close_day":"Vandaag sluiten","business.serve":"Serveren","business.restock":"Aanvullen","business.buy":"Kopen","business.not_enough":"Nog niet genoeg winkelmunten.","business.stock_full":"Die plank is vol.","business.recipe.margherita":"Margherita pizza","business.recipe.tomato_pizza":"Tomatenpizza","business.recipe.flatbread":"Platbrood","business.recipe.berry_tart":"Bessentaartje","business.ingredient.dough":"Deeg","business.ingredient.sauce":"Saus","business.ingredient.cheese":"Kaas","business.ingredient.tomato":"Tomaat","business.ingredient.flour":"Meel","business.ingredient.berries":"Bessen","business.ingredient.milk":"Melk","business.upgrade.extra_oven":"Extra oven","business.upgrade.bigger_pantry":"Grotere voorraadkast","business.upgrade.bright_sign":"Mooi uithangbord","business.summary":"Vandaag","business.profit":"Winst","business.orders_served":"{n} bestellingen geholpen","business.prep.portion":"Snijd het in gelijke stukken en kies het beleg.","business.prep.repeat":"{trays} bakplaten, {perTray} op elke. Hoeveel in totaal?","business.prep.measure":"Meet het juiste ingrediënt voor deze bestelling.","business.prep.fraction":"Neem {num}/{den} van {of}. Hoeveel is dat?","business.prep.scale":"Maak {factor}× het recept — kies elke hoeveelheid.","business.prep.pieces":"stukken","business.prep.total":"in totaal","business.unit.cups":"kopjes","business.unit.amount":"hoeveelheid","business.pay.make":"Maak {amount} met munten.","business.pay.total":"Totaal","business.pay.reset":"Opnieuw","business.pay.change":"Ze betalen {paid}. Hoeveel wisselgeld?","business.pay.discount":"{percent}% korting op {was}. Wat is de nieuwe prijs?","business.review.profit":"We verdienden {rev} en gaven {cost} uit. Wat is de winst?","business.review.demand":"Welke lekkernij verkocht vandaag het meest?","business.review.convert":"{kg} kg meel — hoeveel gram?","business.review.grams":"{n} g","business.review.compare":"Welke is de beste deal?","business.review.pack":"{count} voor {price}","business.station.counter":"Toonbank","business.station.prep":"Maken","business.station.oven":"Oven","business.station.pantry":"Voorraad","business.station.coinTray":"Kassa","business.station.orderBoard":"Verbeteringen","business.almost":"Bijna — kijk nog eens!","business.hint.portion_halves_quarters":"Helften zijn 2 stukken, kwarten 4.","business.hint.repeated_addition_orders":"Tel één bakplaat en tel die voor elke bakplaat op.","business.hint.recipe_measure_whole":"Kies eerst meel, dan hoeveel kopjes.","business.hint.fraction_of_quantity_recipe":"Verdeel in gelijke delen en neem er zoveel.","business.hint.scale_recipe":"Vermenigvuldig elke hoeveelheid met het aantal bestellingen.","business.hint.money_make_amounts":"Voeg munten toe tot het totaal klopt.","business.hint.decimal_money_change":"Wisselgeld is wat ze betaalden min de prijs.","business.hint.percentage_discount":"10% is een tiende — haal dat van de prijs af.","business.supplied":"Er kwam een voorraadkrat om te helpen! 📦","business.bake.raw":"Bak het in de oven 🔥","business.bake.baking":"In de oven… 🍞","business.bake.ready":"Gebakken! Serveer het 🍞","business.bake.cooled":"Het is afgekoeld — nog steeds lekker! 🍞","business.bake.cooled_coach":"Nog steeds smullen! Serveer het volgende keer als het goudbruin is voor een kleine fooi. 😊","business.bake.prep_first":"Maak het eten eerst klaar.","business.bake.first":"Bak het eerst in de oven! 🔥","business.fresh_tip":"Verse fooi!","stage.songs":"Kies een liedje","stage.play":"Speel","stage.locked":"Vanaf {grade}","stage.done":"Klaar","stage.listen":"Luister 🎧","stage.clear":"Opnieuw","stage.almost":"Bijna — probeer nog eens!","stage.correct":"Prachtig! 🎵","stage.song.echo":"Echo-liedje","stage.song.echo.desc":"Kijk naar Kiki en tik het wijsje terug.","stage.song.count":"Tel-liedje","stage.song.count.desc":"Luid de gong bij elke sprong.","stage.song.beat":"Maatbalk","stage.song.beat.desc":"Vul één maat met de juiste noten.","stage.echo.prompt":"Kijk hoe Kiki speelt en tik daarna hetzelfde wijsje terug!","stage.count.prompt":"Tel met sprongen van {step} — luid de gong bij elk!","stage.count.play":"Tel mee","stage.beat.prompt":"Vul de maat — maak precies één geheel!","stage.beat.total":"Tot nu toe","stage.beat.whole":"1 geheel","stage.hint.echo":"Tik de vlakken in dezelfde volgorde als Kiki.","stage.hint.count":"Tel hardop met sprongen en luid de gong bij elk getal waar je uitkomt.","stage.hint.beat":"De stukjes moeten samen precies één hele maat zijn.","play.chamber":"Kamer {n} van {total}","play.correct.1":"JA! Gelukt!","play.correct.2":"Geweldig!","play.correct.3":"Nu zie je het écht!","play.correct.4":"Bananen-tastisch!","play.echo_door":"Het <b>Echorijk</b> glinstert open — de stille spiegeling van het eiland. Onderhoud het en het blijft stralen! ✨","play.echo_enter":"Kijk binnen","play.skip":"Verder!","play.exit_confirm":"Terug naar het eiland?","play.crab_yoink":"Hebbes! De krab strooide {n} bananen rond — pak ze terug!","play.carry_safe":"Krabben doen een dutje terwijl jij een steen draagt. Denk rustig na!","play.altar_wants":"Het altaar fonkelt… breng de antwoordsteen! 🗿","q.fetch":"Zoek de juiste steen en breng hem naar het altaar!","q.count":"Wat komt hierna? Haal dat getal!","q.missing":"Welk getal verstopt zich?","q.array_both":"Maak een bedje met {rows} rijen van {cols}!","q.array_rows":"Plant {total} plantjes in {rows} eerlijke rijen!","q.array_total":"Maak een bedje met precies {total} plantjes!","q.share":"Verdeel {total} kokosnoten eerlijk over {baskets} mandjes!","q.share_remainder":"Verdeel {total} kokosnoten eerlijk over {baskets} mandjes. Laat restjes op de stronk liggen!","q.share_fetch":"{total} kokosnoten, {baskets} mandjes — hoeveel in elk mandje? Haal die steen!","q.numberline":"Ga staan waar {frac} woont en luid de bel!","q.compare":"Haal de GROOTSTE breuk!","q.compare_dec":"Haal het GROOTSTE getal!","q.equiv":"Haal de breuk die gelijk is aan {frac}!","q.frac_of":"Hoeveel is {frac} van {whole}?","ex.addsub_confuse":"Dat is {a} + {b}! Voor {a} × {b} maken we <b>{a} rijen van {b}</b> — kijk!","ex.off_by_table":"Bíjna — één rij te veel of te weinig! <b>{a} rijen van {b}</b> is <b>{answer}</b>.","ex.no_carry":"Vergeet de tien niet te onthouden! Kijk: het wordt <b>{answer}</b>.","ex.borrow":"Een lastige! We moeten een tien inwisselen. Het wordt <b>{answer}</b>.","ex.reversed":"Bijna! De cijfers wisselden van plek. Het is <b>{answer}</b>.","ex.whole_number_bias":"Verrassing: een groter getal onder de streep betekent <b>kleinere stukjes</b>! Snijd in {d}, dan wordt elk stukje kleiner.","ex.add_tops_bottoms":"Breukstukjes moeten eerst <b>even groot</b> zijn voor je ze optelt — kijk!","ex.remainder_ignored":"Vergeet de restjes niet — er blijven er <b>{remainder} over</b>!","ex.near_miss":"Zóóó dichtbij! Tel nog één keer — het is <b>{answer}</b>.","ex.div_fact":"Denk terug: <b>{a} × {b} = {c}</b> — dus {c} ÷ {a} = <b>{b}</b>!","ex.missing_factor":"Hoeveel rijen van {b} maken {c}? <b>{a} rijen</b> — want {a} × {b} = {c}!","ex.equiv":"Evenveel, andere stukjes! <b>{n}/{d}</b> bedekt precies hetzelfde.","ex.magnitude":"Denk: ligt <b>{n}/{d}</b> dichter bij 0, een half, of 1?","ex.magnitude_low":"Nog een stukje verder! <b>{n}/{d}</b> is méér dan waar je stond.","ex.magnitude_high":"Stapje terug! <b>{n}/{d}</b> is mínder dan waar je stond.","ex.unfair_share":"Eerlijk delen: elk mandje krijgt <b>evenveel</b>. Tik op de stronk (of druk op X) om er één terug te pakken!","ex.share_more":"De stapel heeft nog genoeg voor een rondje — deel maar verder!","ex.array_shape":"Goede hoeveelheid! Maar we willen <b>{rows} rijen</b> — loop om het bedje om te bouwen.","ex.array_count":"Je bedje heeft er <b>{value}</b>. We willen <b>{total}</b> — loop om het groter of kleiner te maken!","ex.generic":"Kijk naar het plaatje — daar zit het geheim!","ex.decimal_length":"Een langer getal is niet altijd groter! Leg ze op een rij — <b>{answer}</b> is het meest.","ex.comma_misalign":"Houd de komma op één lijn! Tienen bij tienen, tienden bij tienden — het wordt <b>{answer}</b>.","hint.look":"Kijk goed naar het plaatje — en probeer opnieuw. Jij kan dit! 💪","hint.pinch":"✌️ Knijp om te zoomen · sleep met twee vingers om rond te kijken","verb.array_plant":"loop de aarde op — 🌱 plant het eerste hoekje","verb.array_stretch":"druk op 🌱 als de maat klopt · 🌱 op het vlaggetje pakt het terug","verb.array_offsoil":"bedjes groeien alleen op aarde — spring er weer op!","verb.array_need_soil":"Ga eerst op de bruine aarde staan!","verb.array_unplant":"Vlaggetje opgepakt — plant het waar je wilt!","verb.share_sub":"tik op een mandje om te delen · tik op de stronk om terug te pakken","verb.share_remainder_sub":"deel eerlijk · restjes blijven op de stronk","helper.turtle":"Tuk de Schildpad","helper.bunny":"Pip het Konijntje","helper.duckling":"Dot het Eendje","helper.owl":"Olli de Uil","helper.fetch":"Reken eerst uit, en draag dan de juiste steen naar het ✨ altaar! Verkeerde steen? Loop naar een andere steen om te ruilen, of druk op ⬇️ om hem neer te zetten. Krabben slapen zolang je draagt — en in potten zitten verrassingen!","helper.array":"Ga op de aarde staan en druk op 🌱 om een vlaggetje te planten. Loop dan — het bedje rekt met je mee! Klopt de maat? Druk nog eens op 🌱. Bedacht? Druk op 🌱 op het vlaggetje en je pakt het terug.","helper.numberline":"De ▲-streepjes hakken de liaan in gelijke stukjes! Loop naar waar jouw breuk woont en luid de 🔔.","helper.share":"Tik op een mandje om er een kokosnoot in te doen — elk mandje evenveel! Druk daarna op ✅. Zijn er restjes, laat ze op de stronk liggen. Eentje te veel? Tik op de stronk!","helper.cheer.1":"Jij kan dit! 🌟","helper.cheer.2":"Van foutjes leer je — probeer gewoon iets!","helper.cheer.3":"Neem de tijd. Tel maar rustig!","helper.cheer.4":"Kom je er niet uit? Druk op 💡 en ik laat een plaatje zien!","skill.counting":"Tellen en ordenen","skill.number_bonds":"Splitsen","skill.add_20":"Plussommen tot 20","skill.sub_20":"Minsommen tot 20","skill.missing_addend":"Geheime getallen (+)","skill.add_100":"Plussommen tot 100","skill.sub_100":"Minsommen tot 100","skill.tables_a":"Tafels van 2, 5, 10","skill.tables_b":"Tafels van 3, 4, 6","skill.tables_c":"Tafels van 7, 8, 9","skill.tables_mix":"Alle tafels door elkaar","skill.mult_2digit":"Groot vermenigvuldigen","skill.div_facts":"Deelsommen","skill.share":"Eerlijk delen","skill.div_remainder":"Delen met rest","skill.missing_factor":"Geheime getallen (×)","skill.frac_magnitude":"Waar breuken wonen","skill.frac_compare":"Breuken vergelijken","skill.frac_equiv":"Tweelingbreuken","skill.frac_of_n":"Een breuk van een getal","skill.big_numbers":"Grote getallen","skill.dec_compare":"Kommagetallen vergelijken","skill.dec_addsub":"Kommagetallen optellen","skill.dec_muldiv":"Kommagetallen keer en delen","skill.frac_dec_pct":"Breuken, kommagetallen, procenten","skill.percent_of":"Procent van een hoeveelheid","skill.percent_adv":"Grote procenten","skill.scale":"Schaal en kaarten","result.title":"Kamer gehaald!","result.next":"Volgende kamer","result.home":"Naar het eiland","result.gem":"Nieuwe edelsteen: {fact}!","result.gem_twin":"{fact} laat ook zijn tweeling {twin} stralen! ✨","result.mastered":"Je ZIET {skill} nu echt! 🌟","result.bloomed":"{world} staat in bloei! 🌸","result.tap_chest":"Tik op de schatkist!","result.wonder":"Wist je dat?","egg.progress":"Het ei wiebelt…","egg.ready":"Het ei kan uitkomen!","egg.hatch":"Tik tik tik…","egg.hatched":"{pet} is uit het ei gekomen! 🎉","egg.all_pets":"Pip is verbaasd — je bent vriendjes met álle dieren!","pets.title":"Jouw huisdieren","pets.follow":"Loopt met je mee","pets.choose":"Tik op een dier om het mee te nemen","pet.bunny":"Konijntje","pet.duckling":"Eendje","pet.kitten":"Poesje","pet.piglet":"Biggetje","pet.redpanda":"Rode panda","pet.turtle":"Schildpadje","pet.owl":"Uiltje","pet.dragon":"Minidraakje","pet.monkey":"Aapje","pet.mimi":"Mimi","rarity.common":"Gewoon","rarity.rare":"Zeldzaam","rarity.epic":"Episch","rarity.legendary":"Legendarisch","gems.title":"De Banyan Edelsteenboom","gems.sub":"Elke tafelsom die je kent wordt een edelsteen. Tweelingen stralen samen!","gems.hex_title":"De geheime 64","gems.hex_sub":"Jouw edelstenen zijn dezelfde 64 patronen als het oude Boek der Veranderingen — en de 64 kleine lettertjes die alles wat leeft spellen. 💎🧬","gems.count":"{n} van de {total} edelstenen stralen","gems.skills":"Jouw krachten","shop.title":"De winkel van Coco","shop.hats":"Hoedjes","shop.furs":"Vachtkleuren","shop.trails":"Sporen","shop.buy":"Kopen","shop.equip":"Dragen","shop.equipped":"Draag je","shop.too_pricey":"Nog niet genoeg bananen — speel om meer te verdienen!","shop.freeze":"Vlam-bevriezer","shop.freeze_desc":"Houdt je vlam veilig als je een dagje overslaat","shop.cosmetic_note":"Hoedjes & vachtkleuren staan op Aapje en Mimi 🐵","hat.cap":"Petje","hat.bow":"Strikje","hat.crown":"Kroontje","hat.flowercrown":"Bloemenkrans","hat.beanie":"Mutsje","hat.wizard":"Tovenaarshoed","hat.pirate":"Piratenhoed","hat.party":"Feesthoedje","fur.classic":"Klassiek","fur.golden":"Goud","fur.snow":"Sneeuw","fur.pink":"Roze","fur.lavender":"Lavendel","fur.mint":"Mint","fur.midnight":"Middernacht","fur.redpanda":"Rode panda","trail.sparkle":"Glitters","trail.petal":"Blaadjes","trail.bubble":"Belletjes","trail.star":"Sterretjes","mimi.meet":"Ik ben <b>Mimi</b>! Ik bedenk bouwplannen voor ons eiland — breng getallen thuis en ik krijg ideeën. Tik me aan als je wilt kletsen! 🌺","mimi.build_ready":"Je hebt genoeg bananen voor het <b>{name}</b>! Kom naar mijn werktafel! 📜","mimi.need_bananas":"Nog maar <b>{n}</b> 🍌 voor het <b>{name}</b> — de kamers liggen vol bananen!","mimi.almost_blueprint":"Mijn volgende bouwidee is zóóó dichtbij… nog een paar getallen uit <b>{world}</b> en het lukt! ✨","mimi.world_hint":"<b>{world}</b> ziet er nog wat slaperig en grijs uit. Zullen we daar getallen thuisbrengen?","mimi.egg_soon":"Je ei wiebelt! Nog ongeveer <b>{n}</b> goede antwoorden en het komt uit! 🥚","mimi.streak":"Dag {n} op rij — het hele bos juicht voor je! 🔥","mimi.festival":"Het bos heeft nog nooit zó geleefd. En dat komt allemaal door jou! 🎆","wonder.twin_gem.title":"De spiegeltweeling","wonder.twin_gem.body":"Als je 4 × 6 leert, licht de tweeling 6 × 4 er gratis bij op — dezelfde edelsteen, gewoon omgedraaid. Veel dingen in de natuur komen in zulke spiegelparen. ✨","wonder.array_both_ways.title":"Een tuin op twee manieren lezen","wonder.array_both_ways.body":"Rijen of kolommen — hetzelfde bedje met plantjes. Je leest het zoals je wilt en het aantal verandert nooit. 🌱","wonder.fact_and_division.title":"Eén wiel, gedraaid","wonder.fact_and_division.body":"6 × 4 = 24 en 24 ÷ 4 = 6 zijn hetzelfde wiel, anders gedraaid. Keer en deel, en je komt weer thuis. 🎡","wonder.music_skip_count.title":"Rekenen dat je kunt horen","wonder.music_skip_count.body":"Dat deuntje is sprongen tellen! 2, 4, 6, 8 — tellen en muziek zijn dezelfde hartslag. 🎵","wonder.bakery_pie.title":"Een breuk die je kunt opeten","wonder.bakery_pie.body":"Snijd de taart in 4 en pak er 1 — dat stuk ÍS een kwart. Breuken zijn gewoon iets lekkers eerlijk delen. 🥧","wonder.gem_tree_64.title":"Overal dezelfde 64","wonder.gem_tree_64.body":"De Edelsteenboom heeft 64 edelstenen. De oude I Tjing ook — en de code in je eigen DNA ook: 64 kleine woordjes die alles wat leeft bouwen. Hetzelfde patroon, op drie manieren verteld. 💎🧬","wonder.one_line.title":"Eén zachte lijn per keer","wonder.one_line.body":"De liefste manier van leren en het diepe oude Boek der Veranderingen zijn het eens: spring nooit van een klif — verander steeds maar één ding, en je kunt overal komen. 🌿","mimi.phase0":"Ik… ik vergat vroeger een som en dan bevroor ik helemaal. De Krabkoning nam zoveel mee. Misschien was het mijn schuld dat ik niet snel genoeg telde.","mimi.phase1":"Weet je wat? Door naar jou te kijken denk ik dat langzaam zijn oké is. Vandaag kwam er een vriendje thuis — misschien kan ik ook weer leren. 🌱","mimi.phase2":"Kijk nu eens — ik vergat een zeven, lachte, en zocht het gewoon uit! Middenin het leren zijn is niet kapot. Het is het meest levende wat er is. 🌺","mimi.chat.1":"Ik kijk zo graag naar de vlinders die terugkomen. Hoe meer het eiland bloeit, hoe meer vriendjes er komen! 🦋","mimi.chat.2":"Wist je dat de Edelsteenboom elke som onthoudt die je kent? Tik er maar eens op! 💎","mimi.chat.3":"Pip doet de groetjes vanaf het nest! De huisdieren zijn dol op je. 💛","island.title":"De werktafel van Mimi","island.sub":"Breng getallen thuis en Mimi bedenkt bouwplannen. Bananen betalen het materiaal — wat bouwen we?","island.progress":"{n} van {total} gebouwd","island.locked_name":"Een toekomstdroom…","island.locked_hint":"Breng meer getallen thuis — dan krijgt Mimi nieuwe bouwideeën!","island.new_blueprint":"📜 Nieuw bouwplan: {name}!","island.mimi_worktable":"Kom naar mijn werktafel — ik heb bouwplannen! 📜","island.built_say":"Wat prachtig! Het bos voelt weer een beetje levendiger. 🌸","island.daily_fruit":"🦊 Rin heeft {n} bananen voor je bewaard bij het kraampje!","island.daily_bread":"🐷 Mo bakte bananenbrood — het ei smult ervan!","island.crab_pays":"🦀 De Krabbenkoning opent zijn schat en betaalt {n} bananen!","portal.stage1":"🌱 Er ontkiemt een rankje op de poort van {name}!","portal.stage2":"🌿 Ranken klimmen langs de poort van {name}!","portal.stage3":"🌺 De poort van {name} staat in bloei!","portal.stage4":"✨ De poort van {name} is in volle bloei!","build.lanterns":"Lantaarnpad","build.lanterns_desc":"Warme lichtjes voor het dorpsplein.","build.fruitstand":"Fruitkraampje","build.fruitstand_desc":"Rin de Rode Panda komt wonen — ze bewaart elke dag bananen voor je!","build.garden":"Bloementuin","build.garden_desc":"Bloesem en vlinders bij de Lianenhoogte.","build.stage":"Muziekpodium","build.stage_desc":"Kiki het Poesje komt wonen — tik op de gong voor een liedje!","build.bakery":"Bakkerij","build.bakery_desc":"Mo het Biggetje komt wonen — dagelijks bananenbrood voor je ei!","build.pizzeria":"Pizzeria","build.pizzeria_desc":"Olli de Uil komt wonen — snijd pizza’s in lekkere breuken!","build.bridge":"Brug naar het eilandje","build.bridge_desc":"Steek het water over naar het eilandje in het oosten.","build.plaza":"Feestplein","build.plaza_desc":"De grote finale — een feest voor het hele bos!","npc.fruitstand":"Rin de Rode Panda","npc.stage":"Kiki het Poesje","npc.bakery":"Mo het Biggetje","npc.pizzeria":"Olli de Uil","npc.crabking":"De Krabbenkoning","npc.fruitstand.hello":"Een echt fruitkraampje! Ik bewaar elke dag wat bananen voor je. 🍌","npc.fruitstand.1":"Vers fruit, eerlijke prijzen — ik tel elke banaan twee keer!","npc.fruitstand.2":"Kom morgen terug — dan heb ik weer iets voor je bewaard!","npc.stage.hello":"Een podium! Eindelijk een plek voor mijn liedjes. Luid de gong met me mee!","npc.stage.1":"Elk goed antwoord klinkt voor mij als muziek! 🎵","npc.stage.2":"Zullen we herrie maken? Tik op de gong!","npc.bakery.hello":"De oven is warm! Elke dag bananenbrood — je ei zal smullen. 🥖","npc.bakery.1":"Bakken is gewoon eerlijk delen… van lekkers!","npc.bakery.2":"Een half recept? Dat zijn breuken, vriend!","npc.pizzeria.hello":"Welkom bij de pizzeria! Elke pizza is een cirkel vol breuken. 🍕","npc.pizzeria.1":"Twee stukjes van de acht? Dat is een kwart — oehoe!","npc.pizzeria.2":"Eerlijke punten maken blije klanten. Snijd ze gelijk!","npc.crabking.1":"Ik jatte de getallen alleen omdat ik niet kon tellen… sorry!","npc.crabking.2":"Dit is het mooiste feest dat het bos ooit heeft gezien. 🎪","finale.1":"Wacht!! Voor je het plein bouwt… moet ik, de <b>Krabbenkoning</b>, iets zeggen.","finale.2":"Ik jatte de getallen omdat ik niet kon tellen — en ik durfde geen hulp te vragen…","finale.3":"Maar jij! Jij bracht ze allemaal thuis. Hier, neem mijn schat — <b>ik betaal de helft van het plein!</b>","finale.4":"Dan bouwen we het SAMEN — het hele bos is uitgenodigd! 🎉","finale.festival":"🎆 Het bos is weer heel — feest! Dit heb jij gedaan, {name}!","parents.title":"Voor ouders","parents.body":"Monkey Grove oefent rekenen zoals onderzoek zegt dat kinderen leren: eerst visuele modellen (rijtjes, getallenlijnen, eerlijk delen), geen tijdsdruk, geen straf voor fouten — elke fout laat het model zien en legt uit waarom. Een onzichtbaar systeem houdt elke vaardigheid op ongeveer 65% succes: uitdagend, nooit ontmoedigend.","parents.wonders":"Wist je dat?","parents.choose_child":"Welke ontdekker?","parents.no_profiles":"Nog geen ontdekkers. Start een avontuur om er een toe te voegen.","parents.skills":"Vaardigheden","parents.business":"Bakkerij/pizzeria oefening","parents.stage_practice":"Muziekpodium oefening","parents.curriculum":"Leerlijn","parents.country":"Land","parents.birthday":"Verjaardag","parents.curriculum_pack":"Leerpad","parents.stage":"Groep","parents.strictness":"Richting","parents.strictness_soft":"Rustige begeleiding","parents.strictness_strict":"Blijf dicht bij deze groep","parents.coverage":"Dekking","parents.covered":"beheerst","parents.partial":"gestart","parents.playable":"speelbaar","parents.planned":"gepland","parents.accuracy":"Recente nauwkeurigheid","parents.attempts":"{n} pogingen","parents.mastered":"beheerst","curriculum.country.nl":"Nederland","curriculum.nl_po.title":"Nederlands basisschoolrekenen (NL_PO)","curriculum.stage":"Fase {n}","curriculum.nl_po.stage.grade_1":"Groep 1","curriculum.nl_po.stage.grade_2":"Groep 2","curriculum.nl_po.stage.grade_3":"Groep 3","curriculum.nl_po.stage.grade_4":"Groep 4","curriculum.nl_po.stage.grade_5":"Groep 5","curriculum.nl_po.stage.grade_6":"Groep 6","curriculum.nl_po.stage.grade_7":"Groep 7","curriculum.nl_po.stage.grade_8":"Groep 8","curriculum.domain.numbers":"Getallen","curriculum.domain.operations":"Bewerkingen","curriculum.domain.ratios":"Verhoudingen en breuken","curriculum.domain.measurement_geometry":"Meten en meetkunde","curriculum.domain.data_relationships":"Verbanden","curriculum.nl_po.objective.counting_and_order":"Tellen, vergelijken en ordenen","curriculum.nl_po.objective.number_bonds_to_10":"Splitsen en bonden tot 10","curriculum.nl_po.objective.big_numbers_place_value":"Grote getallen en plaatswaarde","curriculum.nl_po.objective.decimals_compare":"Kommagetallen vergelijken (0,4 vs 0,12)","curriculum.nl_po.objective.decimals_operations":"Kommagetallen optellen, aftrekken en schalen","curriculum.nl_po.objective.scale_ratio":"Schaal en verhouding","curriculum.nl_po.objective.percent_advanced":"Procenten voor gevorderden","curriculum.nl_po.objective.add_sub_to_20":"Plussommen en minsommen tot 20","curriculum.nl_po.objective.missing_addend_intro":"Ontbrekende getallen bij optellen","curriculum.nl_po.objective.add_sub_to_100":"Plussommen en minsommen tot 100","curriculum.nl_po.objective.tables_2_5_10":"Tafels van 2, 5 en 10","curriculum.nl_po.objective.fair_sharing_intro":"Eerlijk delen","curriculum.nl_po.objective.money_to_100":"Geldbedragen tot 100","curriculum.nl_po.objective.tables_3_4_6":"Tafels van 3, 4 en 6","curriculum.nl_po.objective.tables_7_8_9":"Tafels van 7, 8 en 9","curriculum.nl_po.objective.all_tables_mixed":"Alle tafels door elkaar","curriculum.nl_po.objective.measurement_units_intro":"Maateenheden","curriculum.nl_po.objective.decimal_money_context":"Kommageld en wisselgeld","curriculum.nl_po.objective.multi_digit_multiplication":"Vermenigvuldigen met grotere getallen","curriculum.nl_po.objective.division_facts_and_inverse":"Deelsommen en omgekeerd vermenigvuldigen","curriculum.nl_po.objective.division_with_remainders":"Delen met rest","curriculum.nl_po.objective.fraction_magnitude":"Breuken op de getallenlijn","curriculum.nl_po.objective.fraction_of_quantity":"Breuken van hoeveelheden","curriculum.nl_po.objective.unit_conversion_context":"Maten en voorraad","curriculum.nl_po.objective.price_comparison":"Prijzen vergelijken","curriculum.nl_po.objective.fraction_compare_equivalence":"Breuken vergelijken en gelijk maken","curriculum.nl_po.objective.percentages_intro":"Eerste procenten","curriculum.nl_po.objective.profit_margin_intro":"Opbrengst, kosten en winst","curriculum.nl_po.objective.scale_recipe":"Recepten vergroten","curriculum.nl_po.objective.scale_and_coordinates":"Schaal en coordinaten","curriculum.nl_po.objective.operations_maintenance":"Groep 8-bewerkingen oefenen","curriculum.nl_po.objective.fraction_decimal_percent_relations":"Breuken, decimalen en procenten","curriculum.nl_po.objective.inverse_reasoning":"Omgekeerd vermenigvuldigen","curriculum.nl_po.objective.advanced_data_reasoning":"Gegevens kritisch bekijken","settings.title":"Instellingen","settings.lang":"Taal","settings.sfx":"Geluiden","settings.music":"Muziek","settings.ambience":"Natuurgeluiden","settings.reduce_motion":"Rustige beweging","settings.dyslexia_font":"Leesvriendelijk lettertype","settings.high_contrast":"Hoog contrast","settings.colorblind":"Kleurvriendelijk","settings.text_size":"Tekstgrootte","settings.graphics":"Beeldkwaliteit","settings.graphics_auto":"Auto","settings.graphics_low":"Laag","settings.graphics_medium":"Middel","settings.graphics_high":"Hoog","settings.graphics_relaunch":"Sommige beeldinstellingen werken pas de volgende keer dat je het spel opent.","settings.switch_player":"Andere ontdekker","nav.back":"Terug","nav.close":"Sluiten","hud.hint":"Tip","hud.action":"Actie","hud.home":"Home","duel.title":"Bananenduel","duel.sub":"Twee ontdekkers, dezelfde kamers — wie verzamelt meer bananen?","duel.pick2":"Kies twee ontdekkers","duel.turn":"{name}, jouw beurt!","duel.pass":"Geef het apparaat aan {name}","duel.round":"Ronde {n} van {total}","duel.winner":"🏆 {name} wint met {score} bananen!","duel.tie":"Gelijkspel — de aapjes delen de bananen!","duel.code":"Uitdaagcode","duel.code_desc":"Stuur deze code naar een vriendje — die speelt precies dezelfde kamers!","duel.enter_code":"Voer een uitdaagcode in","duel.play_code":"Speel uitdaging"},Oh={en:jM,nl:qM};function M(i,e=null){const t=Zt().lang||"en";let n=Oh[t]?.[i]??Oh.en[i]??i;return e&&(n=n.replace(/\{(\w+)\}/g,(s,r)=>e[r]!==void 0?String(e[r]):s)),n}function KM(){const i=1+Math.floor(Math.random()*4);return M(`play.correct.${i}`)}function $d(i){Zt().lang=i}const Ke=i=>document.getElementById(i);let br={},Wi=null;function Fp(i){br=i,jd(),Ke("btn-hint").addEventListener("click",()=>{$.sfx("click"),br.onHint?.()}),Ke("btn-action").addEventListener("click",()=>{$.sfx("click"),br.onAction?.()}),Ke("btn-home").addEventListener("click",()=>{$.sfx("click"),br.onHome?.()}),Ke("btn-settings").addEventListener("click",()=>{$.sfx("click"),br.onSettings?.()}),Ke("bubble").addEventListener("click",()=>qd())}function jd(){const i=(e,t)=>{const n=Ke(e);if(n){const s=M(t);n.setAttribute("aria-label",s),n.title=s}};i("btn-hint","hud.hint"),i("btn-action","hud.action"),i("btn-home","hud.home"),i("btn-settings","settings.title")}function Un(i=!0){Ke("hud").classList.toggle("hidden",!i),i||(Ke("banner").classList.add("hidden"),Ke("verb-panel").classList.add("hidden"),ir(),Co())}function Ro(i){return String(i).replace(/(\d+)\s*\/\s*(\d+)/g,'<span class="frac"><span class="n">$1</span><span class="d">$2</span></span>').replace(/\?/g,'<span class="slot">?</span>').replace(/⬚/g,'<span class="slot">◯</span>')}function qc(i,e){Ke("banner").classList.remove("hidden","solved"),Ke("banner-instruction").textContent=i||"",Ke("banner-equation").innerHTML=Ro(e||"")}function Dp(i){Ke("banner").classList.add("solved"),Ke("banner-equation").innerHTML=Ro(i)}function Ip(){const i=Ke("banner");i.classList.remove("wiggle"),i.offsetWidth,i.classList.add("wiggle")}function fo(){Ke("banner").classList.add("hidden")}function Op(i){Ke("banana-count").textContent=i}function Bp(i){Ke("streak-count").textContent=i}function Np(i,e){Ke("egg-fill").style.width=Math.min(100,i/e*100)+"%"}function Kc(i){const e=Ke("combo");i>=2?(e.classList.remove("hidden"),Ke("combo-count").textContent=i,e.style.animation="none",e.offsetWidth,e.style.animation=""):e.classList.add("hidden")}function Er(i){const e=Ke("btn-action");e.classList.remove("ready"),i?(e.textContent=i,e.classList.remove("hidden")):e.classList.add("hidden")}function YM(i){const e=Ke("btn-action");e.classList.toggle("ready",!!i&&!e.classList.contains("hidden"))}function Xs(i){Ke("btn-hint").classList.toggle("hidden",!i)}let zs=null;function Yc(i){if(!i||i.kind==="none")return!1;const e=Ke("model-panel");let t;if(i.kind==="array"){const{rows:n,cols:s}=i.params;if(s>12){const r=Math.floor(s/10)*10,a=s-r;t=`<div class="mp-caption">${n} × ${s} = ${n} × ${r} + ${n} × ${a}
        = ${n*r} + ${n*a} = <b>${n*s}</b></div>`}else{let r="";for(let a=0;a<n;a++){for(let o=0;o<s;o++)r+=`<div class="mp-cell ${a%2?"alt":""}" style="animation-delay:${(a*s+o)*22}ms"></div>`;r+=`<div class="mp-rowlabel" style="grid-column:${s+1}">${(a+1)*s}</div>`}t=`<div class="mp-grid" style="grid-template-columns:repeat(${s},16px) 30px">${r}</div>
        <div class="mp-caption">${n} × ${s} = <b>${n*s}</b></div>`}}else if(i.kind==="baskets"){const{total:n,baskets:s,quotient:r,remainder:a}=i.params;let o="";for(let l=0;l<s;l++)o+=`<div class="mp-basket">🧺<br><b>${r}</b></div>`;a>0&&(o+=`<div class="mp-basket" style="border-color:var(--pink)">🍓<br><b>+${a}</b></div>`),t=`<div class="mp-baskets">${o}</div>
      <div class="mp-caption">${n} ÷ ${s} = <b>${r}</b>${a?` <span style="color:#c2497a">rest ${a}</span>`:""}</div>`}else if(i.kind==="numberline"){const{n,d:s,lo:r=0,hi:a=1}=i.params;let o="";for(let c=0;c<=s*(a-r);c++)o+=`<div class="mp-tick" style="left:${c/(s*(a-r))*100}%"></div>`;const l=(n/s-r)/(a-r)*100;t=`<div class="mp-line" style="width:280px">${o}
        <div class="mp-mark" style="left:${l}%">🐵</div>
        <div class="mp-endlabel" style="left:0">${r}</div>
        <div class="mp-endlabel" style="left:100%">${a}</div>
      </div>
      <div class="mp-caption" style="margin-top:30px">${Ro(`${n}/${s}`)}</div>`}else if(i.kind==="strip"){const{a:n,b:s,op:r}=i.params,a=(l,c)=>{const d=Math.floor(l/10),u=l%10;let h="";for(let f=0;f<d;f++)h+=`<div class="mp-rod ${c}" style="animation-delay:${f*60}ms">10</div>`;for(let f=0;f<u;f++)h+=`<div class="mp-cell ${c}" style="animation-delay:${(d+f)*60}ms"></div>`;return`<div class="mp-pv">${h}<div class="mp-rowlabel">${l}</div></div>`},o=r==="+"?n+s:n-s;t=a(n,"")+`<div class="mp-caption" style="margin:0">${r}</div>`+a(s,r==="+"?"alt":"b")+`<div class="mp-caption">${n} ${r} ${s} = <b>${o}</b></div>`}else return!1;return e.innerHTML=t,e.classList.remove("hidden"),zs&&clearTimeout(zs),zs=setTimeout(Co,7e3),!0}function Co(){Ke("model-panel").classList.add("hidden"),zs&&(clearTimeout(zs),zs=null)}let $r=null;function zp(i,e,t){const n=Ke("bubble");Ke("bubble-face").textContent=e,Ke("bubble-text").innerHTML=i,Up(i),Ke("bubble-next").classList.toggle("hidden",!t),n.classList.remove("hidden"),n.style.animation="none",n.offsetWidth,n.style.animation=""}function Rn(i,{ms:e=2400,face:t="🐵",transient:n=!1,onDone:s=null}={}){const r=(Array.isArray(i)?i:[i]).filter(Boolean).map(a=>typeof a=="string"?{html:a}:a);r.length&&(n&&$r||(Wi&&(clearTimeout(Wi),Wi=null),$r=n?null:{pages:r,i:0,face:t,onDone:s},zp(r[0].html,r[0].face||t,!n),n&&(Wi=setTimeout(()=>ir(),e))))}function qd(){const i=$r;if(!i)return!1;if($.sfx("click"),i.i++,i.i<i.pages.length){const e=i.pages[i.i];zp(e.html,e.face||i.face,!0)}else ir(),i.onDone?.();return!0}function XM(){return!!$r}function ir(){Ke("bubble").classList.add("hidden"),$r=null,Wi&&(clearTimeout(Wi),Wi=null)}function Up(i){const e=Ke("sr-announce");e&&(e.textContent=String(i).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim())}function Kt(i,e=""){const t=document.createElement("div");t.className="toast "+e,t.innerHTML=i,Ke("toasts").appendChild(t),Up(i),setTimeout(()=>t.remove(),2800)}function po(i){const e=Ke("verb-panel");if(!i){e.classList.add("hidden"),e.innerHTML="";return}if(e.classList.remove("hidden"),i.kind==="array"){const t=i.count>0?`<span style="color:var(--leaf-deep)">${i.rows}</span> × <span style="color:#b06a2c">${i.cols}</span> = ${i.count}`:"🚩",n=i.anchored?i.offBed?"verb.array_offsoil":"verb.array_stretch":"verb.array_plant";e.innerHTML=`
      <div>${t}
        <div class="sub">${M(n)}</div>
      </div>`}else if(i.kind==="share"){const t=i.remainder>0?"verb.share_remainder_sub":"verb.share_sub";e.innerHTML=`
      <div>🥥 ${i.pile} &nbsp;→&nbsp; 🧺 ${i.counts.join(" · ")}</div>
      <div class="sub">${M(t,{remainder:i.remainder})}</div>`}}const ZM=Object.freeze(Object.defineProperty({__proto__:null,advanceBubble:qd,bubbleOpen:XM,formatEquation:Ro,hideBanner:fo,hideBubble:ir,hideModelPanel:Co,initHud:Fp,refreshLabels:jd,say:Rn,setAction:Er,setActionReady:YM,setBananas:Op,setBanner:qc,setCombo:Kc,setEgg:Np,setStreak:Bp,setVerbPanel:po,showHintButton:Xs,showHud:Un,showModelPanel:Yc,solveBanner:Dp,toast:Kt,wiggleBanner:Ip},Symbol.toStringTag,{value:"Module"})),Gp=i=>document.getElementById(i),Xc=()=>Gp("screens"),On={monkey:"🐵",mimi:"🐒",bunny:"🐰",duckling:"🐥",kitten:"🐱",piglet:"🐷",redpanda:"🦊",turtle:"🐢",owl:"🦉",dragon:"🐉"},Hp={cap:"🧢",bow:"🎀",crown:"👑",flowercrown:"🌸",beanie:"🧶",wizard:"🧙‍♂️",pirate:"🏴‍☠️",party:"🥳"},QM={sparkle:"✨",petal:"🌸",bubble:"🫧",star:"⭐"},JM={tide:"🌊",garden:"🌱",stump:"🥥",vines:"🍇"};function gn(){Xc().innerHTML=""}function vt(i,e=""){const t=["screen",e].filter(Boolean).join(" ");Xc().innerHTML=`<div class="${t}">${i}</div>`;const n=Xc().firstElementChild;return n.tabIndex=-1,n.focus?.({preventScroll:!0}),n}function wn(i,e=null){return`<button class="round-btn screen-close" id="scr-back" aria-label="${J(M("nav.back"))}">${e||"✖️"}</button>`}function qi(i){const e=document.createElement("div");e.className="toast",e.textContent=i,Gp("toasts").appendChild(e),setTimeout(()=>e.remove(),2600)}function J(i){return String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const e1={tw:14,th:7,vh:11};function Bh(i,e){const t=parseInt(String(i).slice(1),16);if(!Number.isFinite(t))return i;const n=s=>Math.max(0,Math.min(255,Math.round((t>>s&255)*e)));return`#${((1<<24)+(n(16)<<16)+(n(8)<<8)+n(0)).toString(16).slice(1)}`}function t1(i,e={}){const t={...e1,...e},n=i?.palette||{},s=[];if((i?.layers||[]).forEach((m,p)=>{m.forEach((w,E)=>{for(let x=0;x<w.length;x++){const A=w[x];A==="."||A===" "||!n[A]||s.push({x,y:p,z:E,hex:n[A]})}})}),!s.length)return"";const r=new Set(s.map(m=>`${m.x},${m.y},${m.z}`)),a=(m,p,w)=>r.has(`${m},${p},${w}`);s.sort((m,p)=>m.x+m.z-(p.x+p.z)||m.y-p.y||m.x-p.x);let o=1/0,l=1/0,c=-1/0,d=-1/0;const u=(m,p,w)=>{const E=(m-w)*(t.tw/2),x=(m+w)*(t.th/2)-p*t.vh;return E<o&&(o=E),E>c&&(c=E),x<l&&(l=x),x>d&&(d=x),`${E.toFixed(1)},${x.toFixed(1)}`},h=[];for(const{x:m,y:p,z:w,hex:E}of s)a(m,p+1,w)||h.push(`<polygon points="${u(m,p+1,w)} ${u(m+1,p+1,w)} ${u(m+1,p+1,w+1)} ${u(m,p+1,w+1)}" fill="${E}"/>`),a(m+1,p,w)||h.push(`<polygon points="${u(m+1,p,w)} ${u(m+1,p,w+1)} ${u(m+1,p+1,w+1)} ${u(m+1,p+1,w)}" fill="${Bh(E,.8)}"/>`),a(m,p,w+1)||h.push(`<polygon points="${u(m,p,w+1)} ${u(m+1,p,w+1)} ${u(m+1,p+1,w+1)} ${u(m,p+1,w+1)}" fill="${Bh(E,.62)}"/>`);const f=2,g=c-o+f*2,_=d-l+f*2;return`<svg class="mg-dev-voxel" viewBox="${(o-f).toFixed(1)} ${(l-f).toFixed(1)} ${g.toFixed(1)} ${_.toFixed(1)}" preserveAspectRatio="xMidYMid meet">${h.join("")}</svg>`}const n1=`<style>
  @keyframes story-friend-walk {
    0% { transform: translateX(-64px) scale(.88); opacity: 0; }
    62% { transform: translateX(5px) scale(1.05); opacity: 1; }
    100% { transform: translateX(0) scale(1); opacity: 1; }
  }
  #story-face { min-height: 84px; margin-top: 10px; }
  .story-friend { display: flex; justify-content: center; align-items: flex-end; height: 84px; }
  .story-friend svg { height: 80px; width: auto; filter: drop-shadow(0 4px 3px rgba(0,0,0,.18)); }
  .story-friend-walk { animation: story-friend-walk .7s cubic-bezier(.22,1,.36,1) both; }
</style>`;function Nh(i){if(i.kind==="earned"&&i.friend){const e=wi(i.friend),t=e?.full?t1(e.full):"";if(t)return`<div class="story-friend ${lt()?"":"story-friend-walk"}">${t}</div>`}return`<span style="font-size:56px">${s1(i)}</span>`}function i1(i,e=[]){return jr(i,e)}function jr(i,e=[]){const t=new Set(e);let n="";for(let s=5;s>=0;s--){const r=gx[s]===1,a=!!i.lines[s],o=r?'<span style="display:inline-block;width:128px;height:14px;border-radius:7px;background:currentColor"></span>':'<span style="display:inline-block;width:56px;height:14px;border-radius:7px;background:currentColor"></span><span style="display:inline-block;width:16px"></span><span style="display:inline-block;width:56px;height:14px;border-radius:7px;background:currentColor"></span>',l=a?"#f4c95d":"rgba(255,255,255,.18)",c=t.has(s)?"animation:slot-pulse 1.1s ease-in-out infinite;":"";n+=`<div style="color:${l};line-height:0;margin:5px 0;${c}">${o}</div>`}return`<div style="display:flex;flex-direction:column;align-items:center">${n}</div>`}function Wp(i){const e=Lr(i);let t="";for(let n=0;n<6;n++){const s=n<e.linesDrawn;t+=`<span style="display:inline-block;width:18px;height:18px;border-radius:50%;margin:0 3px;background:${s?"#7ccf7c":"rgba(255,255,255,.18)"}"></span>`}return`
    <div style="margin-top:14px;opacity:.9">
      <div style="font-size:13px;letter-spacing:.04em;text-transform:uppercase;opacity:.7">${M("story.balance.label")}</div>
      <div style="margin:6px 0">${t}</div>
      <div style="font-weight:700">${M("story.balance.value",{n:e.linesDrawn})}</div>
    </div>`}function zh(i){if(i.kind==="remembered_batch")return M("story.line.remembered_batch");const e=M("world."+i.world);if(i.kind==="remembered")return M("story.line.remembered",{world:e});const t=i.friend?" "+M("story.line.friend_home"):"";return M("story.line.earned",{world:e})+t}function s1(i){return i.kind==="earned"&&i.friend&&On[i.friend]?On[i.friend]:i.face||"✨"}function Uh(i){return i.kind==="remembered_batch"?i.lineIndices||[]:i.lineIndex!=null?[i.lineIndex]:[]}function r1(i,e,t){const n=Array.isArray(i)?i.filter(Boolean):[];if(!n.length){t?.();return}const s=e?.story||{lines:[!1,!1,!1,!1,!1,!1]};let r=0;const a=vt(`
    ${n1}
    <div style="flex:1"></div>
    <div class="card" style="text-align:center;max-width:420px;margin:0 auto">
      <div id="story-hex">${jr(s,Uh(n[0]))}</div>
      <div id="story-face">${Nh(n[0])}</div>
      <div id="story-text" style="font-size:19px;font-weight:700;line-height:1.45;min-height:58px">${zh(n[0])}</div>
      <div id="story-balance">${Wp(s)}</div>
    </div>
    <button class="btn green" id="story-next">${M("ui.ok")} →</button>
    <div style="flex:2"></div>
  `),o=Lr(s),l=o.complete?`☯️ ${M("ui.ok")}`:M("ui.ok")+" →",c=()=>{const d=n[r];a.querySelector("#story-hex").innerHTML=jr(s,Uh(d)),a.querySelector("#story-face").innerHTML=Nh(d),a.querySelector("#story-text").innerHTML=zh(d);const u=r===n.length-1;a.querySelector("#story-next").innerHTML=u?l:M("ui.ok")+" →"};a.querySelector("#story-next").addEventListener("click",()=>{if($.sfx("correct"),r++,r>=n.length){o.complete&&(a.querySelector("#story-text").innerHTML=M("story.complete")),t?.();return}c()})}function a1(i,e,t){const n=Lp[i];if(!n){t?.();return}const s=e?.story||{lines:[!1,!1,!1,!1,!1,!1]},r=n.pages,a=n.faces||[];let o=0;const l=vt(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center;max-width:420px;margin:0 auto">
      <div id="story-hex">${jr(s,[n.lineIndex])}</div>
      <div id="story-face" style="font-size:56px;margin-top:10px">${a[0]||"✨"}</div>
      <div id="story-text" style="font-size:19px;font-weight:700;line-height:1.45;min-height:58px">${M(r[0])}</div>
    </div>
    <button class="btn green" id="story-next">${M("ui.ok")} →</button>
    <div style="flex:2"></div>
  `);l.querySelector("#story-next").addEventListener("click",()=>{if($.sfx("click"),o++,o>=r.length){t?.();return}l.querySelector("#story-face").textContent=a[o]||"✨",l.querySelector("#story-text").innerHTML=M(r[o])})}function o1({story:i,onClose:e}){const t=Lr(i),n=Math.round(t.balance*100),s=t.complete||t.balance===.5;vt(`
    ${wn()}
    <h2>☯️ ${M("altar.title")}</h2>
    <div class="tagline" style="margin-bottom:10px">${M("altar.sub")}</div>
    <div class="card" style="text-align:center">
      ${jr(i)}
      <div style="margin-top:16px">
        <div style="font-size:13px;letter-spacing:.04em;text-transform:uppercase;opacity:.7">${M("altar.balance")}</div>
        <div style="position:relative;height:18px;border-radius:9px;background:rgba(255,255,255,.12);margin:8px 0">
          <div style="position:absolute;left:calc(50% - 14px);top:-3px;width:28px;height:24px;border-radius:8px;background:rgba(124,207,124,.25)"></div>
          <div style="position:absolute;left:50%;top:-5px;bottom:-5px;width:2px;background:rgba(124,207,124,.8)"></div>
          <div style="position:absolute;left:calc(${n}% - 7px);top:-4px;width:14px;height:26px;border-radius:7px;background:#f4c95d;transition:left .5s ease"></div>
        </div>
        <div style="font-weight:800;min-height:22px">${s?M("altar.in_balance"):""}</div>
      </div>
      ${Wp(i)}
      <div style="margin-top:14px;font-size:14px;line-height:1.4;color:var(--ink-soft)">
        ${t.complete?M("altar.complete"):M("altar.goal")}
      </div>
      <div style="margin-top:10px;font-size:13px;line-height:1.4;opacity:.75">${M("altar.tip")}</div>
    </div>
  `).querySelector("#scr-back").addEventListener("click",e)}const l1={en:{label:"English",className:"flag-gb"},nl:{label:"Nederlands",className:"flag-nl"}};function Zs(i,e){const t=l1[i];if(!t)throw new Error(`Unknown language flag: ${i}`);return`<button class="round-btn lang-btn${i===e?" active":""}" data-lang="${i}" aria-label="${t.label}" title="${t.label}"><span class="flag-icon ${t.className}" aria-hidden="true"></span></button>`}function zt(i){const e=(Number(i||0)/100).toFixed(2);return`€${(Zt().lang||"en")==="en"?e:e.replace(".",",")}`}function Vp(i){if(!i)return null;const e=xn("NL_PO").objectives.find(t=>t.id===i);return e?.titleKey?M(e.titleKey):null}function $p(i){return Vp(ti[i]?.objectiveId)}function Kd(i){return Vp(i?.objectiveId)||$p(i?.mode)||(i?.kind==="payment"?M("business.pay"):null)||(i?.kind==="prep"?M("business.prep"):null)||M("business.order")}function qE({order:i,customerName:e,activeTask:t,bakeStatus:n="raw",onPrep:s,onPay:r,onServe:a,onExit:o}){const l=rs[i.recipeId],c=l.kind==="pizza"?"business.zone.pizzeria":"business.zone.bakery",d=t||i.tasks[0],u=d&&d.kind==="prep",h=d&&d.kind==="payment",f=vt(`
    <div class="business-panel">
      <div class="business-head">
        <h2>${M(c)}</h2>
        <button class="round-btn" id="business-close" aria-label="${J(M("nav.close"))}">x</button>
      </div>
      <div class="card business-order-card">
        <div class="chip">${J(e)}</div>
        <h3>${M("business.order")}: ${M(l.titleKey)}</h3>
        <div class="business-price">${M("business.pay")}: ${zt(i.priceCents)}</div>
        <div class="business-bake business-bake-${n}">${M("business.bake."+n)}</div>
        <div class="menu-row">
          <button class="btn green" id="business-prep" ${u?"":"disabled"}>${M("business.prep")}</button>
          <button class="btn soft" id="business-pay" ${h?"":"disabled"}>${M("business.pay")}</button>
          <button class="btn green" id="business-serve">${M("business.serve")}</button>
        </div>
        <div class="tagline">${J(Kd(d))}</div>
      </div>
    </div>
  `,"business-screen");f.querySelector("#business-prep").addEventListener("click",()=>{u&&s?.(d)}),f.querySelector("#business-pay").addEventListener("click",()=>{h&&r?.(d)}),f.querySelector("#business-serve").addEventListener("click",a),f.querySelector("#business-close").addEventListener("click",o)}function Ls(i,e,t){const n=Number(i),s=Number.isFinite(n)?[n,...e.map(r=>n+r)].filter(r=>r>=0):t;return[...new Set(s.map(r=>Number(r)))].sort((r,a)=>r-a)}function c1(i,e){for(const t of i.closest(".card")?.querySelectorAll(e)||[])t.classList.remove("equipped");i.classList.add("equipped")}function Rs(i,e,t,n){return`
    <button class="tile pressable" data-${i}="${J(e)}">
      <div class="t-icon">${J(t)}</div>
      ${n?`<div class="t-name">${J(n)}</div>`:""}
    </button>`}function hi(i,e,t){for(const n of i.querySelectorAll(e))n.addEventListener("click",()=>{t(n),c1(n,e)})}const Gh={portion_halves_quarters:{prompt:()=>M("business.prep.portion"),controls(i){const e=i.expected||{},t=[...new Set([2,4,6,8,Number(e.slices)].filter(Number.isFinite))].sort((s,r)=>s-r),n=[...new Set(["cheese","tomato",e.topping].filter(Boolean))];return`
        <div class="business-choice-grid">
          ${t.map(s=>Rs("slices",s,s,M("business.prep.pieces"))).join("")}
        </div>
        <div class="business-choice-grid">
          ${n.map(s=>Rs("topping",s,s==="tomato"?"🍅":"🧀",M("business.ingredient."+s))).join("")}
        </div>`},bind(i,e){hi(i,"[data-slices]",t=>{e.slices=Number(t.dataset.slices)}),hi(i,"[data-topping]",t=>{e.topping=t.dataset.topping})},submit:i=>({slices:i.slices,topping:i.topping})},repeated_addition_orders:{prompt:i=>M("business.prep.repeat",{trays:i.expected?.trays??0,perTray:i.expected?.perTray??0}),controls(i){const e=i.expected||{};return`
        <div class="business-choice-grid">
          ${Ls((e.trays||0)*(e.perTray||0),[-2,-1,1,2],[4,6,8,12]).map(n=>Rs("total",n,n,M("business.prep.total"))).join("")}
        </div>`},bind(i,e){hi(i,"[data-total]",t=>{e.total=Number(t.dataset.total)})},submit:i=>({total:i.total})},recipe_measure_whole:{prompt:()=>M("business.prep.measure"),controls(i){const e=i.expected||{},t=[...new Set(["flour","dough","milk",e.ingredient].filter(Boolean))],n=Ls(e.amount,[-2,-1,1,2],[1,2,3,4]),s=M("business.unit."+(e.unit||"amount"));return`
        <div class="business-choice-grid">
          ${t.map(r=>Rs("ingredient",r,"🥣",M("business.ingredient."+r))).join("")}
        </div>
        <div class="business-choice-grid">
          ${n.map(r=>Rs("amount",r,r,s)).join("")}
        </div>`},bind(i,e,t){e.unit=t.expected?.unit,hi(i,"[data-ingredient]",n=>{e.ingredient=n.dataset.ingredient}),hi(i,"[data-amount]",n=>{e.amount=Number(n.dataset.amount)})},submit:i=>({ingredient:i.ingredient,amount:i.amount,unit:i.unit})},fraction_of_quantity_recipe:{prompt:i=>{const e=i.expected||{};return M("business.prep.fraction",{num:e.numerator??1,den:e.denominator??1,of:e.of??0})},controls(i){const e=i.expected||{},t=(e.of||0)*(e.numerator||0)/(e.denominator||1);return`
        <div class="business-choice-grid">
          ${Ls(t,[-2,-1,1,2],[1,2,3,4]).map(s=>Rs("amount",s,s,M("business.prep.total"))).join("")}
        </div>`},bind(i,e){hi(i,"[data-amount]",t=>{e.amount=Number(t.dataset.amount)})},submit:i=>({amount:i.amount})},scale_recipe:{prompt:i=>M("business.prep.scale",{factor:i.expected?.factor??1}),controls(i){const e=i.expected||{},t=e.factor||1;return Object.entries(e.base||{}).map(([n,s])=>`
        <div class="tagline">${J(M("business.ingredient."+n))}</div>
        <div class="business-choice-grid">
          ${Ls(s*t,[-1,1],[s]).map(r=>`
            <button class="tile pressable" data-scale-ingredient="${J(n)}" data-scale-amount="${r}">
              <div class="t-icon">${r}</div>
            </button>`).join("")}
        </div>`).join("")},bind(i,e){e.ingredients={};for(const t of i.querySelectorAll("[data-scale-ingredient]"))t.addEventListener("click",()=>{const n=t.dataset.scaleIngredient;e.ingredients[n]=Number(t.dataset.scaleAmount);for(const s of i.querySelectorAll(`[data-scale-ingredient="${n}"]`))s.classList.remove("equipped");t.classList.add("equipped")})},submit:i=>({ingredients:{...i.ingredients||{}}})}};function jp(i,{task:e,view:t,action:n,doneId:s,onSubmit:r,onClose:a}){i.querySelector("#scr-back").addEventListener("click",a),t.bind(i,n,e);const o=i.querySelector("#business-feedback"),l=d=>{o.textContent=d,o.hidden=!1},c=()=>M("business.hint."+e.mode);i.querySelector("#business-hint").addEventListener("click",()=>l(c())),i.querySelector("#"+s).addEventListener("click",()=>{const d=r?.(t.submit(n));d&&d.correct===!1&&!d.handled&&l(`${M("business.almost")} ${c()}`)})}function KE({task:i,onSubmit:e,onClose:t}){const n=Gh[i?.mode]||Gh.portion_halves_quarters,s={},r=vt(`
    ${wn(t,"←")}
    <h2>${M("business.prep")}</h2>
    <div class="tagline">${J(Kd(i))}</div>
    <div class="card">
      <p class="business-prompt">${J(n.prompt(i))}</p>
      ${n.controls(i)}
      <div class="business-feedback" id="business-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="business-hint">💡</button>
        <button class="btn green" id="business-prep-done">${M("business.done")}</button>
      </div>
    </div>
  `);jp(r,{task:i,view:n,action:s,doneId:"business-prep-done",onSubmit:e,onClose:t})}const d1=[500,200,100,50,20,10,5],Hh={money_make_amounts:{controls(i){const e=i.expected?.amountCents??0;return`
        <p class="business-prompt">${J(M("business.pay.make",{amount:zt(e)}))}</p>
        <div class="business-price">${M("business.pay.total")}:
          <span id="pay-total">${zt(0)}</span> / ${zt(e)}</div>
        <div class="business-money-row">
          ${d1.map(t=>`<button class="btn soft" data-money="${t}">${zt(t)}</button>`).join("")}
        </div>
        <div class="menu-row">
          <button class="btn soft" id="pay-reset">${M("business.pay.reset")}</button>
        </div>`},bind(i,e){e.amountCents=0;const t=i.querySelector("#pay-total"),n=()=>{t.textContent=zt(e.amountCents)};for(const s of i.querySelectorAll("[data-money]"))s.addEventListener("click",()=>{e.amountCents+=Number(s.dataset.money),n()});i.querySelector("#pay-reset").addEventListener("click",()=>{e.amountCents=0,n()})},submit:i=>({amountCents:i.amountCents||0})},decimal_money_change:{controls(i){const e=i.expected||{},t=(e.paidCents??0)-(e.changeCents??0),n=Ls(e.changeCents,[-100,-50,50,100],[0,50,100,250]);return`
        <div class="business-price">${M("business.order")}: ${zt(t)}</div>
        <p class="business-prompt">${J(M("business.pay.change",{paid:zt(e.paidCents??0)}))}</p>
        <div class="business-money-row">
          ${n.map(s=>`<button class="btn soft" data-change="${s}">${zt(s)}</button>`).join("")}
        </div>`},bind(i,e,t){e.paidCents=t.expected?.paidCents,hi(i,"[data-change]",n=>{e.changeCents=Number(n.dataset.change)})},submit:i=>({paidCents:i.paidCents,changeCents:i.changeCents})},percentage_discount:{controls(i){const e=i.expected||{},t=Ls(e.finalCents,[-100,-50,50,100],[100,250,500,1e3]);return`
        <p class="business-prompt">${J(M("business.pay.discount",{percent:e.percent??10,was:zt(e.originalCents??0)}))}</p>
        <div class="business-money-row">
          ${t.map(n=>`<button class="btn soft" data-final="${n}">${zt(n)}</button>`).join("")}
        </div>`},bind(i,e){hi(i,"[data-final]",t=>{e.finalCents=Number(t.dataset.final)})},submit:i=>({finalCents:i.finalCents})}};function YE({task:i,onSubmit:e,onClose:t}){const n=Hh[i?.mode]||Hh.money_make_amounts,s={},r=vt(`
    ${wn(t,"←")}
    <h2>${M("business.pay")}</h2>
    <div class="tagline">${J(Kd(i))}</div>
    <div class="card">
      ${n.controls(i)}
      <div class="business-feedback" id="business-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="business-hint">💡</button>
        <button class="btn green" id="business-payment-done">${M("business.done")}</button>
      </div>
    </div>
  `);jp(r,{task:i,view:n,action:s,doneId:"business-payment-done",onSubmit:e,onClose:t})}function XE({business:i,shopId:e,onRestock:t,onClose:n}){const s=Math.max(1,i.stockLimit||1),r=Dd(e||i.id).ingredientIds.map(o=>Mo[o]),a=vt(`
    ${wn()}
    <h2>${M("business.stock")}</h2>
    <div class="chip">${M("business.profit")}: ${zt(i.shopCoins)}</div>
    <div class="card">
      ${r.map(o=>{const l=i.stock[o.id]||0;return`
          <div class="skill-row">
            <div class="s-name">${M(o.titleKey)}</div>
            <div class="s-bar"><div class="s-fill" style="width:${Math.round(l/s*100)}%"></div></div>
            <div class="curriculum-count">${l}/${s}</div>
            <button class="btn soft" data-restock="${o.id}">${M("business.restock")}</button>
          </div>`}).join("")}
    </div>
  `);a.querySelector("#scr-back").addEventListener("click",n);for(const o of a.querySelectorAll("[data-restock]"))o.addEventListener("click",()=>t?.(o.dataset.restock))}function ZE({business:i,onBuy:e,onClose:t}){const n=Array.isArray(i.upgrades)?i.upgrades:[],s=vt(`
    ${wn()}
    <h2>${M("business.upgrades")}</h2>
    <div class="chip">${M("business.profit")}: ${zt(i.shopCoins)}</div>
    <div class="card">
      ${Object.values(sp).map(r=>{const a=n.includes(r.id);return`
          <div class="skill-row">
            <div class="s-name">${M(r.titleKey)}</div>
            <div class="curriculum-count">${a?M("business.done"):zt(r.priceCents)}</div>
            ${a?"":`<button class="btn soft" data-upgrade="${r.id}">${M("business.buy")}</button>`}
          </div>`}).join("")}
    </div>
  `);s.querySelector("#scr-back").addEventListener("click",t);for(const r of s.querySelectorAll("[data-upgrade]"))r.addEventListener("click",()=>e?.(r.dataset.upgrade))}const qp=Object.freeze([{id:"twin_gem",trigger:"commutativity",audience:"child",titleKey:"wonder.twin_gem.title",bodyKey:"wonder.twin_gem.body",proof:"yijing_opposite"},{id:"array_both_ways",trigger:"array",audience:"child",titleKey:"wonder.array_both_ways.title",bodyKey:"wonder.array_both_ways.body",proof:"yijing_reverse"},{id:"fact_and_division",trigger:"division_fact",audience:"child",titleKey:"wonder.fact_and_division.title",bodyKey:"wonder.fact_and_division.body",proof:"yijing_center"},{id:"music_skip_count",trigger:"music",audience:"child",titleKey:"wonder.music_skip_count.title",bodyKey:"wonder.music_skip_count.body",proof:null},{id:"bakery_pie",trigger:"bakery",audience:"child",titleKey:"wonder.bakery_pie.title",bodyKey:"wonder.bakery_pie.body",proof:null},{id:"gem_tree_64",trigger:"gem_tree",audience:"parent",titleKey:"wonder.gem_tree_64.title",bodyKey:"wonder.gem_tree_64.body",proof:"yijing_toAminoAcidName"},{id:"one_line_at_a_time",trigger:"pacing",audience:"parent",titleKey:"wonder.one_line.title",bodyKey:"wonder.one_line.body",proof:null}]),u1=()=>qp.filter(i=>i.audience==="parent");function h1(i,e=[]){const t=new Set(e);return qp.find(n=>n.audience==="child"&&n.trigger===i&&!t.has(n.id))||null}function f1({kind:i,skillId:e,world:t,litTwin:n}={}){return n?"commutativity":i==="array"?"array":e==="div_facts"||e==="div_remainder"?"division_fact":t==="business"?"bakery":null}function p1(){const i=u1();return i.length?`<div class="card">
    <h3>✨ ${M("parents.wonders")}</h3>
    ${i.map(e=>`
      <div style="margin-bottom:10px">
        <div style="font-weight:800">${M(e.titleKey)}</div>
        <div style="font-size:14px;line-height:1.5;color:var(--ink-soft)">${M(e.bodyKey)}</div>
      </div>`).join("")}
  </div>`:""}function Kp(i){return`${i.countryKey?M(i.countryKey):i.countryCode||i.id} - ${M(i.titleKey)}`}function m1({profiles:i=[],onChoose:e,onBack:t}){const n=vt(`
    ${wn()}
    <h2>${J(M("parents.choose_child"))}</h2>
    ${i.length?`
      <div class="card parent-picker-card">
        <div class="tile-grid parent-profile-grid">
          ${i.map(s=>{const r=s.avatar?.pet||s.pets?.[0]||"bunny",a=On[r]||"🐵",o=s.curriculum?.confirmedStage||s.curriculum?.estimatedStage,l=s.curriculum?.packId?xn(s.curriculum.packId):null,c=l&&o?Yp(l,o):"";return`
              <button class="tile parent-profile-tile" data-parent-profile="${J(s.id)}">
                <span class="t-icon">${a}</span>
                <span class="t-name">${J(s.name)}</span>
                ${c?`<span class="t-price">${J(c)}</span>`:""}
              </button>`}).join("")}
        </div>
      </div>`:`<div class="card parent-picker-card"><p>${J(M("parents.no_profiles"))}</p></div>`}
  `);n.querySelector("#scr-back").addEventListener("click",t),n.querySelectorAll("[data-parent-profile]").forEach(s=>{s.addEventListener("click",()=>e?.(s.dataset.parentProfile))})}function Yp(i,e){const t=i.stages.find(n=>n.id===e);return t?M(t.labelKey):M(i.fallbackStagePrefixKey||"curriculum.stage",{n:"?"})}function g1(i,e,t=null,n=null,s=!1){if(!i?.curriculum||!e)return"";const r=xn(i.curriculum.packId),a=Qf(),o=Rx(r.id,e,{business:t,stage:n}),l=i.curriculum.confirmedStage||i.curriculum.estimatedStage,c=i.curriculum.strictness||"soft";return`
    <div class="card">
      <h3>${J(M("parents.curriculum"))}</h3>
      <div class="curriculum-meta">
        <div class="chip">${J(M("parents.country"))}: ${J(r.countryKey?M(r.countryKey):r.countryCode||r.id)}</div>
        <div class="chip">${J(M("parents.curriculum_pack"))}: ${J(M(r.titleKey))}</div>
        ${i.curriculum.birthDate?`<div class="chip">${J(M("parents.birthday"))}: ${J(i.curriculum.birthDate)}</div>`:""}
        <div class="chip">${J(M("parents.stage"))}: ${J(Yp(r,l))}</div>
      </div>
      ${s?`<div class="curriculum-controls">
        <label>
          <span>${J(M("parents.curriculum_pack"))}</span>
          <select data-pack>
            ${a.map(d=>`<option value="${J(d.id)}" ${d.id===r.id?"selected":""}>${J(Kp(d))}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>${J(M("parents.birthday"))}</span>
          <input type="date" data-birth-date value="${J(i.curriculum.birthDate||"")}">
        </label>
        <label>
          <span>${J(M("parents.stage"))}</span>
          <select data-stage>
            ${r.stages.map(d=>`<option value="${J(d.id)}" ${d.id===l?"selected":""}>${J(M(d.labelKey))}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>${J(M("parents.strictness"))}</span>
          <select data-strictness>
            <option value="soft" ${c==="soft"?"selected":""}>${J(M("parents.strictness_soft"))}</option>
            <option value="strict" ${c==="strict"?"selected":""}>${J(M("parents.strictness_strict"))}</option>
          </select>
        </label>
      </div>`:""}
      <div class="tagline" style="color:var(--ink-soft);text-shadow:none;margin-bottom:8px">${J(M("parents.coverage"))}</div>
      ${Object.values(o.domains).filter(d=>d.total>0).map(d=>`
        <div class="curriculum-domain">
          <div class="skill-row">
            <div class="s-name">${J(M(d.labelKey))}</div>
            <div class="s-bar"><div class="s-fill" style="width:${Math.round(d.covered/Math.max(1,d.total)*100)}%"></div></div>
            <div class="curriculum-count">${d.covered}/${d.total}</div>
          </div>
          <div class="curriculum-objectives">
            ${d.objectives.map(u=>`<span class="curriculum-pill ${u.coverage}">${J(M(u.titleKey))} · ${J(M(`parents.${u.coverage}`))}</span>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>`}function _1(i){if(!i)return"";const e=Object.entries(i.modes||{}),n=Object.entries(i.shops||{}).map(([s,r])=>`
    <div class="skill-row">
      <div class="s-name">${J(M("business.zone."+s))}</div>
      <div style="font-size:12px;color:var(--ink-soft);min-width:150px;text-align:right">
        ${J(M("business.orders_served",{n:r.ordersServed||0}))} · ${J(zt(r.profitCents))}
      </div>
    </div>`).join("");return`
    <div class="card">
      <h3>${J(M("parents.business"))}</h3>
      <div class="curriculum-meta">
        <div class="chip">${J(M("business.orders_served",{n:i.ordersServed||0}))}</div>
        <div class="chip">${J(M("business.profit"))}: ${J(zt(i.profitCents))}</div>
      </div>
      ${n}
      <div class="curriculum-objectives">
        ${e.map(([s,r])=>{const a=r?.coverage||"partial",o=$p(s)||M("parents.business");return`<span class="curriculum-pill ${J(a)}">${J(o)} · ${J(M(`parents.${a}`))}</span>`}).join("")}
      </div>
    </div>`}function b1(i){if(!i)return"";const e=Object.entries(i.modes||{});return e.some(([,t])=>(t.attempts||0)>0)?`
    <div class="card">
      <h3>${J(M("parents.stage_practice"))}</h3>
      <div class="curriculum-objectives">
        ${e.map(([t,n])=>{const s=n?.coverage||"playable",r=M(Nr[t]?.titleKey||"stage.songs");return`<span class="curriculum-pill ${J(s)}">${J(r)} · ${J(M(`parents.${s}`))}</span>`}).join("")}
      </div>
    </div>`:""}function v1({report:i,profile:e,businessReport:t=null,stageReport:n=null,onClose:s,onCurriculumChange:r}){const a=vt(`
    ${wn()}
    <h2>${M("parents.title")}</h2>
    <div class="card"><p style="margin:0;font-size:15px;line-height:1.5">${M("parents.body")}</p></div>
    ${e&&i?`
    ${g1(e,i,t,n,!!r)}
    ${_1(t)}
    ${b1(n)}
    <div class="card">
      <h3>${M("parents.skills")} — ${J(e.name)}</h3>
      ${Object.entries(i.worlds).map(([o,l])=>l.skills.filter(c=>c.n>0).map(c=>`
        <div class="skill-row">
          <div class="s-name">${M(c.nameKey)}</div>
          <div class="s-bar"><div class="s-fill" style="width:${Math.round(c.acc10*100)}%"></div></div>
          <div style="font-size:12px;color:var(--ink-soft);min-width:90px;text-align:right">
            ${Math.round(c.acc10*100)}% · ${M("parents.attempts",{n:c.n})}${c.mastered?" · 🌟":""}
          </div>
        </div>`).join("")).join("")||'<p style="font-size:14px;color:var(--ink-soft)">—</p>'}
    </div>`:""}
    ${p1()}
  `);a.querySelector("#scr-back").addEventListener("click",s),a.querySelector("[data-pack]")?.addEventListener("change",o=>{r?.({packId:o.target.value})}),a.querySelector("[data-birth-date]")?.addEventListener("change",o=>{r?.({birthDate:o.target.value})}),a.querySelector("[data-stage]")?.addEventListener("change",o=>{r?.({confirmedStage:o.target.value})}),a.querySelector("[data-strictness]")?.addEventListener("change",o=>{r?.({strictness:o.target.value})})}const y1=["bunny","duckling","turtle","owl"],Wh=[{id:"sprout",age:6,icon:"🌱",tone:"sprout"},{id:"climber",age:8,icon:"🌴",tone:"climber"},{id:"explorer",age:10,icon:"🗿",tone:"explorer"},{id:"unsure",age:null,icon:"✨",tone:"unsure",placementWarmup:!0}];function Xp({onStart:i,onParents:e,onDuel:t,onLangChange:n}){const s=ao(),r=Zt(),a=[["🌱",M("attract.beat.garden")],["🥥",M("attract.beat.share")],["🥚",M("attract.beat.pets")],["💎",M("attract.beat.gems")],["🌈",M("attract.beat.bloom")]],o=["🐵","Monkey","Grove","🍌"].map((w,E)=>`<span class="lw" style="--d:${E}"><span>${w}</span></span>`).join(" "),l=vt(`
    <div class="attract-shell" role="button" tabindex="0" aria-label="${M("attract.cta")}">
      <div class="attract-top">
        <h1 class="attract-logo">${o}</h1>
        <div class="attract-tagline">${M("attract.tagline")}</div>
      </div>

      <div class="attract-bottom">
        <div class="attract-ticker"><span id="attract-beat"><span class="bi">${a[0][0]}</span>${a[0][1]}</span></div>
        <button class="btn green attract-start" id="attract-start">▶ ${M("attract.cta")}</button>
        <div class="attract-prompt">${M("attract.prompt")}</div>
        <div class="menu-row attract-menu" id="attract-menu">
          <div class="lang-toggle">
            ${Zs("en",r.lang)}
            ${Zs("nl",r.lang)}
          </div>
          ${s.length>=2?`<button class="btn soft" id="btn-duel">⚔️ ${M("title.duel")}</button>`:""}
          <button class="btn soft" id="btn-parents">${M("title.parents")}</button>
        </div>
      </div>
    </div>
  `);l.classList.add("attract-screen");let c=!1,d=null,u=0;const h=l.querySelector("#attract-beat"),f=setInterval(()=>{u=(u+1)%a.length,h.classList.add("swap"),setTimeout(()=>{c||(h.innerHTML=`<span class="bi">${a[u][0]}</span>${a[u][1]}`,h.classList.remove("swap"))},240)},2600),g=()=>{c||(c=!0,clearInterval(f),window.removeEventListener("keydown",m),d&&cancelAnimationFrame(d))},_=()=>{c||(g(),$.init(),$.setSfx(Zt().sfx),$.setMusic(Zt().music),$.music("title"),$.sfx("correct"),i())},m=w=>{(w.key===" "||w.key==="Enter")&&(w.preventDefault(),_())},p=()=>{if(c)return;const w=globalThis.navigator?.getGamepads?.()||[];for(const E of w)if(E?.buttons?.[9]?.pressed||E?.buttons?.[0]?.pressed){_();return}d=requestAnimationFrame(p)};window.addEventListener("keydown",m),p(),l.querySelector("#attract-start").addEventListener("click",_),l.querySelector(".attract-shell").addEventListener("click",_),l.querySelector("#attract-menu").addEventListener("click",w=>w.stopPropagation());for(const w of l.querySelectorAll("[data-lang]"))w.addEventListener("click",()=>{$.sfx("click"),$d(w.dataset.lang),Wn(),n?.(),g(),Xp({onStart:i,onParents:e,onDuel:t,onLangChange:n})});l.querySelector("#btn-parents")?.addEventListener("click",()=>{$.sfx("click"),g(),e()}),l.querySelector("#btn-duel")?.addEventListener("click",()=>{$.sfx("click"),g(),t()})}function Zc({onPlay:i,onParents:e,onDuel:t,onLangChange:n}){const s=ao(),r=Zt(),a=Qf(),o=y1.map(R=>so.find(O=>O.id===R)).filter(Boolean);let l=1,c=o[0]?.id||null,d="monkey",u="unsure",h="";const f=R=>On[R.avatar?.creature]||On[R.avatar?.pet]||"🐵",g=R=>M(so.find(O=>O.id===R)?.nameKey||"pets.title"),_=vt(`
    <h1>🐵 Monkey Grove 🍌</h1>
    <div class="tagline">${M("title.tagline")}</div>
    <div class="card player-card">
      <h3>${M("title.who")}</h3>
      <div class="tile-grid" id="profile-grid">
        ${s.map(R=>`
          <div class="tile pressable" data-pid="${R.id}">
            <div class="t-icon">${f(R)}</div>
            <div class="t-name">${J(R.name)}</div>
            <div class="t-price">🍌 ${R.bananas} · 🔥 ${R.streak.count}</div>
          </div>`).join("")}
        <div class="tile pressable new-explorer-tile" id="tile-new">
          <div class="t-icon">✨</div>
          <div class="t-name">${M("title.new_player")}</div>
        </div>
      </div>
    </div>
    <div id="new-player-row" class="new-player-form hidden"></div>
    <div class="menu-row title-menu" id="title-menu">
      <div class="lang-toggle">
        ${Zs("en",r.lang)}
        ${Zs("nl",r.lang)}
      </div>
      ${s.length>=2?`<button class="btn soft" id="btn-duel">⚔️ ${M("title.duel")}</button>`:""}
      <button class="btn soft" id="btn-parents">${M("title.parents")}</button>
    </div>
  `),m=_.querySelector(".player-card"),p=_.querySelector("#new-player-row"),w=()=>{const R=Zt().lang;for(const O of _.querySelectorAll("[data-lang]"))O.classList.toggle("active",O.dataset.lang===R)},E=a.map(R=>`<option value="${J(R.id)}">${J(Kp(R))}</option>`).join(""),x=()=>{const R=o.find(y=>y.id===c)||o[0],O=M(l===1?"title.wizard_step_1":"title.wizard_step_2");p.innerHTML=`
      <div class="explorer-wizard" id="new-explorer-wizard">
        <div class="wizard-progress" aria-label="${J(O)}">
          <span class="wizard-step ${l===1?"active":""}">1</span>
          <span class="wizard-step ${l===2?"active":""}">2</span>
        </div>
        ${l===1?`
          <div class="wizard-panel name-panel">
            <div class="wizard-kicker">${J(M("title.wizard_name_title"))}</div>
            <input id="new-name" class="wizard-input" maxlength="14" value="${J(h)}" placeholder="${J(M("title.name_prompt"))}">
            <div class="wizard-kicker pet-kicker">${J(M("title.wizard_avatar_title"))}</div>
            <div class="starter-pet-grid">
              ${Dw.map(y=>`
                <button class="tile pressable starter-pet ${d===y.id?"equipped":""}" data-avatar-creature="${J(y.id)}" aria-pressed="${d===y.id}">
                  <div class="voxel-plinth"><span>${On[y.id]||"🐾"}</span></div>
                  <div class="t-name">${J(M(y.nameKey))}</div>
                </button>
              `).join("")}
            </div>
            <div class="wizard-kicker pet-kicker">${J(M("title.wizard_pet_title"))}</div>
            <div class="starter-pet-grid">
              ${o.map(y=>`
                <button class="tile pressable starter-pet ${c===y.id?"equipped":""}" data-starter-pet="${J(y.id)}" aria-pressed="${c===y.id}">
                  <div class="voxel-plinth"><span>${On[y.id]||"🐾"}</span></div>
                  <div class="t-name">${J(M(y.nameKey))}</div>
                </button>
              `).join("")}
            </div>
            <div class="wizard-actions">
              <button class="btn soft" id="wizard-cancel">${J(M("ui.back"))}</button>
              <button class="btn green" id="wizard-next">${J(M("ui.ok"))}</button>
            </div>
          </div>
        `:`
          <div class="wizard-panel trail-panel">
            <div class="buddy-chip"><span>${On[R?.id]||"🐾"}</span>${J(g(R?.id))}</div>
            <div class="wizard-kicker">${J(M("title.wizard_trail_title"))}</div>
            <div class="learning-trail-grid">
              ${Wh.map(y=>`
                <button class="tile pressable learning-trail trail-${y.tone} ${u===y.id?"equipped":""}" data-learning-trail="${J(y.id)}" aria-pressed="${u===y.id}">
                  <div class="trail-icon">${y.icon}</div>
                  <div class="t-name">${J(M(`title.trail_${y.id}`))}</div>
                  <div class="t-price">${J(M(`title.trail_${y.id}_body`))}</div>
                </button>
              `).join("")}
            </div>
            <select id="new-pack" aria-label="${J(M("title.curriculum_prompt"))}" class="hidden">${E}</select>
            <div class="form-help">${J(M("title.wizard_parent_note"))}</div>
            <div class="wizard-actions">
              <button class="btn soft" id="wizard-back">${J(M("ui.back"))}</button>
              <button class="btn green" id="new-go">${J(M("title.start"))}</button>
            </div>
          </div>
        `}
      </div>`;for(const y of p.querySelectorAll("[data-starter-pet]"))y.addEventListener("click",()=>{h=p.querySelector("#new-name")?.value.trim()||h,c=y.dataset.starterPet,$.sfx("click"),x()});for(const y of p.querySelectorAll("[data-avatar-creature]"))y.addEventListener("click",()=>{h=p.querySelector("#new-name")?.value.trim()||h,d=y.dataset.avatarCreature,$.sfx("click"),x()});for(const y of p.querySelectorAll("[data-learning-trail]"))y.addEventListener("click",()=>{u=y.dataset.learningTrail,$.sfx("click"),x()});p.querySelector("#wizard-next")?.addEventListener("click",()=>{const y=p.querySelector("#new-name")?.value.trim()||"";if(!y){qi(M("title.name_required")),p.querySelector("#new-name")?.focus(),$.sfx("boop");return}h=y,l=2,$.sfx("click"),x()}),p.querySelector("#wizard-cancel")?.addEventListener("click",()=>{p.classList.add("hidden"),_.classList.remove("wizard-active"),m.classList.remove("hidden"),$.sfx("click")}),p.querySelector("#wizard-back")?.addEventListener("click",()=>{l=1,$.sfx("click"),x(),p.querySelector("#new-name")?.focus()}),p.querySelector("#new-name")?.addEventListener("keydown",y=>{if(y.key==="Enter"){y.preventDefault();const S=p.querySelector("#new-name")?.value.trim()||"";if(!S){qi(M("title.name_required")),$.sfx("boop");return}h=S,l=2,x()}}),p.querySelector("#new-go")?.addEventListener("click",k)},A=()=>{m.classList.add("hidden"),_.classList.add("wizard-active"),p.classList.remove("hidden"),l=1,x(),p.querySelector("#new-name")?.focus()},k=()=>{const R=h.trim();if(!R){l=1,x(),qi(M("title.name_required")),p.querySelector("#new-name")?.focus(),$.sfx("boop");return}const O=R,y=Wh.find(j=>j.id===u),S=y?.age??null,F=_.querySelector("#new-pack").value,z=c,W=d,q=!!y?.placementWarmup,X=jw(O,{age:S,packId:F,avatarPet:z,avatarCreature:W,placementWarmup:q});$.sfx("correct"),i(X.id,!0)};for(const R of _.querySelectorAll("[data-pid]")){R.addEventListener("click",()=>{$.sfx("click"),i(R.dataset.pid)});let O=null;R.addEventListener("pointerdown",()=>{O=setTimeout(()=>{confirm(M("ui.confirm_delete"))&&(Yw(R.dataset.pid),Zc({onPlay:i,onParents:e,onDuel:t,onLangChange:n}))},900)});for(const y of["pointerup","pointerleave"])R.addEventListener(y,()=>clearTimeout(O))}_.querySelector("#tile-new").addEventListener("click",A);for(const R of _.querySelectorAll("[data-lang]"))R.addEventListener("click",()=>{if($d(R.dataset.lang),Wn(),n?.(),_.classList.contains("wizard-active")){x(),w();return}Zc({onPlay:i,onParents:e,onDuel:t,onLangChange:n})});_.querySelector("#btn-parents")?.addEventListener("click",e),_.querySelector("#btn-duel")?.addEventListener("click",t)}function x1(i){let e=0;const t=[M("story.1"),M("story.2"),M("story.3"),M("story.4")],n=["🦀","🌫️","🌴","☯️"],r=vt(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center">
      <div style="margin-bottom:10px">${i1({lines:[!1,!1,!1,!1,!1,!1]})}</div>
      <div id="story-face" style="font-size:64px">${n[0]}</div>
      <div id="story-text" style="font-size:20px;font-weight:700;line-height:1.4;min-height:64px">${t[0]}</div>
    </div>
    <button class="btn green" id="story-next">${M("ui.ok")} →</button>
    <div style="flex:2"></div>
  `);r.querySelector("#story-next").addEventListener("click",()=>{if($.sfx("click"),e++,e>=t.length){i();return}r.querySelector("#story-face").textContent=n[e],r.querySelector("#story-text").innerHTML=t[e],e===t.length-1&&(r.querySelector("#story-next").textContent=M("title.start")+" 🍌")})}function w1(i){let e=0;const t=[M("finale.1"),M("finale.2"),M("finale.3"),M("finale.4")],n=["🦀","🦀","🦀","🐵"],s=vt(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center">
      <div id="story-face" style="font-size:64px">${n[0]}</div>
      <div id="story-text" style="font-size:20px;font-weight:700;line-height:1.4;min-height:64px">${t[0]}</div>
    </div>
    <button class="btn green" id="story-next">${M("ui.ok")} →</button>
    <div style="flex:2"></div>
  `);s.querySelector("#story-next").addEventListener("click",()=>{if($.sfx("click"),e++,e>=t.length){i();return}s.querySelector("#story-face").textContent=n[e],s.querySelector("#story-text").innerHTML=t[e],e===t.length-1&&(s.querySelector("#story-next").textContent="🎪 "+M("title.start"))})}function S1({problems:i,onAnswer:e,onDone:t,onSkip:n}){let s=!1,r=!1,a=0,o=!1;const l=u=>r?!1:(r=!0,u?.(),!0),c=()=>{o=!1;const u=i[a],h=Array.isArray(u?.choices)?u.choices:[],f=u?.prompt?.key?M(T1(u.prompt.key),E1(u)):M("placement.answer"),g=vt(`
      <div style="flex:1"></div>
      <h2>${M("placement.title")}</h2>
      <div class="tagline">${M("placement.body")}</div>
      <div class="card placement-card">
        <div class="placement-step">${J(M("placement.step",{n:a+1,total:i.length}))}</div>
        <div class="placement-task">${J(f)}</div>
        <div class="placement-eq">${M1(u?.equation||"")}</div>
        <div class="tile-grid">
          ${h.map(_=>`
            <button class="tile pressable warmup-choice" data-value="${J(String(_.value))}" aria-label="${J(f)} ${J(String(_.value))}">
              <div class="t-icon">✨</div>
              <div class="t-name">${J(String(_.value))}</div>
              <div class="t-price">${M("placement.answer")}</div>
            </button>
          `).join("")}
        </div>
      </div>
      <div class="menu-row">
        <button class="btn soft" id="warmup-skip">${M("placement.skip")}</button>
      </div>
      <div style="flex:2"></div>
    `);for(const _ of g.querySelectorAll("[data-value]"))_.addEventListener("click",()=>{if(r||o)return;o=!0;for(const p of g.querySelectorAll("[data-value]"))p.disabled=!0;const m=String(_.dataset.value)===String(u.answer);if(e({problem:u,correct:m}),a+=1,a>=i.length){qi(M("placement.done")),l(t);return}c()});g.querySelector("#warmup-skip")?.addEventListener("click",()=>l(n))},d=()=>{const u=vt(`
      <div style="flex:1"></div>
      <h2>${M("placement.title")}</h2>
      <div class="tagline">${M("placement.body")}</div>
      <div class="card placement-card">
        <div class="placement-eq"><span class="slot">?</span> <span aria-hidden="true">+</span> <span class="slot">?</span></div>
      </div>
      <div class="menu-row">
        <button class="btn green" id="warmup-start">${M("placement.start")}</button>
        <button class="btn soft" id="warmup-skip">${M("placement.skip")}</button>
      </div>
      <div style="flex:2"></div>
    `);u.querySelector("#warmup-start")?.addEventListener("click",()=>{if(!(r||s)){s=!0;for(const h of u.querySelectorAll("button"))h.disabled=!0;if(!i.length){l(n);return}c()}}),u.querySelector("#warmup-skip")?.addEventListener("click",()=>l(n))};(!s||!i.length)&&d()}function M1(i){return J(i).replace(/(\d+)\s*\/\s*(\d+)/g,'<span class="frac"><span class="n">$1</span><span class="d">$2</span></span>').replace(/\?/g,'<span class="slot">?</span>')}function E1(i){const e={...i?.meta||{},...i?.model?.params||{},...i?.prompt?.vars||{}};return e.n!==void 0&&e.d!==void 0&&(e.frac=`${e.n}/${e.d}`),e.answer=i?.answer,e}function T1(i){return{"q.compare":"warmup.q.compare","q.equiv":"warmup.q.equiv","q.frac_of":"warmup.q.frac_of","q.missing":"warmup.q.missing","q.share_fetch":"warmup.q.share_fetch"}[i]||"warmup.q.fetch"}function Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n}){const s=Zt(),r=vt(`
    ${wn()}
    <h2>${M("settings.title")}</h2>
    <div class="card">
      <div class="menu-col">
        <div class="menu-row" style="align-items:center">
          <span style="font-weight:800">${M("settings.lang")}</span>
          <div class="lang-toggle">
            ${Zs("en",s.lang)}
            ${Zs("nl",s.lang)}
          </div>
        </div>
        <div class="menu-row">
          <button class="btn soft" id="tg-sfx">${s.sfx?"🔊":"🔇"} ${M("settings.sfx")}</button>
          <button class="btn soft" id="tg-music">${s.music?"🎵":"🚫"} ${M("settings.music")}</button>
          <button class="btn soft" id="tg-ambience" aria-pressed="${s.ambience!==!1}">${s.ambience!==!1?"🌊":"🔇"} ${M("settings.ambience")}</button>
        </div>
        <div class="menu-col">
          <button class="btn soft" id="tg-motion" aria-pressed="${lt()}">${lt()?"🐢":"🏃"} ${M("settings.reduce_motion")}</button>
          <button class="btn soft" id="tg-font" aria-pressed="${!!s.dyslexiaFont}">🔤 ${M("settings.dyslexia_font")}</button>
          <button class="btn soft" id="tg-contrast" aria-pressed="${!!s.highContrast}">${s.highContrast?"◑":"○"} ${M("settings.high_contrast")}</button>
          <button class="btn soft" id="tg-colorblind" aria-pressed="${!!s.colorblind}">${s.colorblind?"◑":"○"} ${M("settings.colorblind")}</button>
          <button class="btn soft" id="tg-textsize">🔠 ${M("settings.text_size")}: ${Math.round((s.textScale||1)*100)}%</button>
        </div>
        <div class="menu-col">
          <span style="font-weight:800" title="${M("settings.graphics_relaunch")}">🎨 ${M("settings.graphics")}</span>
          <div class="lang-toggle" id="graphics-toggle" role="group" aria-label="${M("settings.graphics")}">
            ${Nc.map(a=>`<button class="btn soft" data-graphics="${a}" aria-pressed="${(s.graphics||"auto")===a}">${M("settings.graphics_"+a)}</button>`).join("")}
          </div>
        </div>
        <button class="btn soft" id="switch-player">👥 ${M("settings.switch_player")}</button>
        
      </div>
    </div>
    
  `);r.querySelector("#scr-back").addEventListener("click",i);for(const a of r.querySelectorAll("[data-lang]"))a.addEventListener("click",()=>{$d(a.dataset.lang),Kw(a.dataset.lang),Wn(),t?.(),Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})});r.querySelector("#tg-sfx").addEventListener("click",()=>{s.sfx=!s.sfx,$.setSfx(s.sfx),qe(),Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-music").addEventListener("click",()=>{s.music=!s.music,$.setMusic(s.music),qe(),Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-ambience").addEventListener("click",()=>{s.ambience=s.ambience===!1,$.setAmbience(s.ambience),qe(),Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-motion").addEventListener("click",()=>{s.reduceMotion=!lt(),Cs(),qe(),Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-font").addEventListener("click",()=>{s.dyslexiaFont=!s.dyslexiaFont,Cs(),qe(),Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-contrast").addEventListener("click",()=>{s.highContrast=!s.highContrast,Cs(),qe(),Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-colorblind").addEventListener("click",()=>{s.colorblind=!s.colorblind,Cs(),qe(),Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-textsize").addEventListener("click",()=>{const a=[1,1.15,1.3],o=a.findIndex(l=>Math.abs(l-(s.textScale||1))<.01);s.textScale=a[(o+1)%a.length],Cs(),qe(),Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})});for(const a of r.querySelectorAll("[data-graphics]"))a.addEventListener("click",()=>{s.graphics=Nc.includes(a.dataset.graphics)?a.dataset.graphics:"auto",nS(),qe(),Tn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})});r.querySelector("#switch-player").addEventListener("click",e),r.querySelector("#settings-extra-toggle")?.addEventListener("click",()=>n?.onToggle?.(!n.open));for(const a of r.querySelectorAll("[data-settings-preset]"))a.addEventListener("click",()=>n?.onApply?.(a.dataset.settingsPreset));r.querySelector("#settings-manual-devtools")?.addEventListener("submit",a=>{a.preventDefault()})}function Qc({onClose:i,onChanged:e}){const t=Qr(),n=[{id:"hats",label:M("shop.hats"),items:Ud,owned:t.owned.hats,slot:"hat",icon:a=>Hp[a.id]||"🎩"},{id:"furs",label:M("shop.furs"),items:Hc,owned:t.owned.furs,slot:"fur",icon:a=>`<span style="display:inline-block;width:30px;height:30px;border-radius:50%;background:${a.palette?.F||"#a8743f"};border:3px solid #fff"></span>`},{id:"trails",label:M("shop.trails"),items:wS,owned:t.owned.trails,slot:"trail",icon:a=>QM[a.id]||"✨"}];let s=Qc._tab||"hats";const r=()=>{const a=n.find(d=>d.id===s),o=wi(t.avatar.creature),l=s==="hats"&&!o.hat||s==="furs"&&!o.fur,c=vt(`
      ${wn()}
      <h2>🛍️ ${M("shop.title")}</h2>
      <div class="chip" style="margin-bottom:10px"><span class="chip-icon">🍌</span>${t.bananas}</div>
      <div class="menu-row" style="margin-bottom:12px">
        ${n.map(d=>`<button class="btn soft" data-tab="${d.id}" ${d.id===s?'style="outline:4px solid var(--sun)"':""}>${d.label}</button>`).join("")}
      </div>
      ${l?`<div class="form-help" style="margin-bottom:10px">${M("shop.cosmetic_note")}</div>`:""}
      <div class="card">
        <div class="tile-grid">
          ${a.items.map(d=>{const u=a.owned.includes(d.id),h=t.avatar[a.slot]===d.id;return`<div class="tile pressable ${u?"owned":""} ${h?"equipped":""}" data-item="${d.id}">
              <div class="t-icon">${a.icon(d)}</div>
              <div class="t-name">${M(d.nameKey)}</div>
              <div class="t-price">${h?M("shop.equipped"):u?M("shop.equip"):`🍌 ${d.price}`}</div>
            </div>`}).join("")}
        </div>
      </div>
      <div class="card" style="display:flex;align-items:center;gap:12px">
        <div style="font-size:34px">❄️</div>
        <div style="flex:1"><b>${M("shop.freeze")}</b> (${t.streak.freezes})<div style="font-size:13px;color:var(--ink-soft)">${M("shop.freeze_desc")}</div></div>
        <button class="btn soft" id="buy-freeze">🍌 ${Lt.streakFreezePrice}</button>
      </div>
    `);c.querySelector("#scr-back").addEventListener("click",i);for(const d of c.querySelectorAll("[data-tab]"))d.addEventListener("click",()=>{Qc._tab=s=d.dataset.tab,$.sfx("click"),r()});c.querySelector("#buy-freeze").addEventListener("click",()=>{Th(t,Lt.streakFreezePrice)?(t.streak.freezes++,qe(),$.sfx("chest"),r(),e?.()):($.sfx("boop"),qi(M("shop.too_pricey")))});for(const d of c.querySelectorAll("[data-item]"))d.addEventListener("click",()=>{const u=n.find(g=>g.id===s),h=u.items.find(g=>g.id===d.dataset.item);if(u.owned.includes(h.id))Bc(t,u.slot,t.avatar[u.slot]===h.id&&u.slot==="hat"?null:h.id),$.sfx("pick");else if(Th(t,h.price))Jw(t,u.id,h.id),Bc(t,u.slot,h.id),$.sfx("chest");else{$.sfx("boop"),qi(M("shop.too_pricey"));return}r(),e?.()})};r()}function Jc({onClose:i,onChanged:e,onHatch:t}){const n=Qr(),s=n.egg.points>=n.egg.goal,r=vt(`
    ${wn()}
    <h2>🐾 ${M("pets.title")}</h2>
    <div class="card" style="display:flex;align-items:center;gap:14px">
      <div style="font-size:48px">${s?"🥚✨":"🥚"}</div>
      <div style="flex:1">
        <div style="font-weight:800">${M(s?"egg.ready":"egg.progress")}</div>
        <div id="egg-bar" style="width:100%;margin-top:6px"><div id="egg-fill" style="width:${Math.min(100,n.egg.points/n.egg.goal*100)}%"></div></div>
      </div>
      ${s?`<button class="btn green" id="hatch-now">${M("egg.hatch")}</button>`:""}
    </div>
    <div class="card">
      <div style="font-size:14px;color:var(--ink-soft);font-weight:700;margin-bottom:8px">${M("pets.choose")}</div>
      <div class="tile-grid">
        ${Iw.filter(a=>a.id!==n.avatar.creature).map(a=>{const o=n.pets.includes(a.id),l=n.avatar.pet===a.id,c=a.companion?"💛":Of[a.rarity];return`<div class="tile pressable ${o?"owned":"locked"} ${l?"equipped":""}" data-pet="${a.id}">
            <div class="t-rarity">${c}</div>
            <div class="t-icon">${o?On[a.id]||"🐾":"❓"}</div>
            <div class="t-name">${M(o?a.nameKey:"rarity."+a.rarity)}</div>
            ${l?`<div class="t-price">${M("pets.follow")}</div>`:""}
          </div>`}).join("")}
      </div>
    </div>
  `);r.querySelector("#scr-back").addEventListener("click",i),r.querySelector("#hatch-now")?.addEventListener("click",t);for(const a of r.querySelectorAll("[data-pet]"))a.addEventListener("click",()=>{const o=a.dataset.pet;if(!n.pets.includes(o)){$.sfx("boop");return}Bc(n,"pet",n.avatar.pet===o?null:o),$.sfx("pick"),Jc({onClose:i,onChanged:e,onHatch:t}),e?.()})}function A1(i,e){let t=0,n=!1;const s=vt(`
    <div style="flex:1"></div>
    <div id="hatch-egg">🥚</div>
    <div class="tagline" id="hatch-label">${M("egg.hatch")}</div>
    <div style="flex:2"></div>
  `),r=s.querySelector("#hatch-egg");r.addEventListener("click",()=>{n||(t++,$.sfx("egg",{pitch:1+t*.15}),r.classList.add("cracking"),t>=3&&(n=!0,$.sfx("hatch"),r.textContent=i?On[i.id]||"🐾":"💛",r.classList.remove("cracking"),r.style.animation="chest-bounce .8s cubic-bezier(.34,1.56,.64,1)",s.querySelector("#hatch-label").innerHTML=i?`${M("egg.hatched",{pet:M(i.nameKey)})} ${Of[i.rarity]}`:M("egg.all_pets"),setTimeout(e,2200)))})}function R1({profile:i,status:e,onClose:t,onFund:n,onAltar:s=null,bloom:r=null}){const a=e.filter(c=>c.state==="built").length,o=(c,d,u,h,f=!1)=>`
    <div class="skill-row" ${f?'style="opacity:.55"':""}>
      <div style="font-size:28px;width:36px;text-align:center">${c}</div>
      <div style="flex:1"><b>${d}</b>
        <div style="font-size:13px;color:var(--ink-soft);line-height:1.3">${u}</div></div>
      ${h}
    </div>`,l=vt(`
    ${wn()}
    <h2>🛠️ ${M("island.title")}</h2>
    <div class="tagline" style="margin-bottom:8px">${M("island.sub")}</div>
    <div class="menu-row" style="margin-bottom:10px">
      <div class="chip"><span class="chip-icon">🔨</span>${M("island.progress",{n:a,total:e.length})}</div>
      <div class="chip"><span class="chip-icon">🍌</span>${i.bananas}</div>
      ${r?`<div class="chip"><span class="chip-icon">☯️</span>${M("story.balance.value",{n:r.linesDrawn})}</div>`:""}
      ${s?`<button class="btn soft" id="island-altar">${M("altar.open")}</button>`:""}
    </div>
    <div class="card">
      ${e.map(c=>{if(c.state==="built")return o(c.emoji,M("build."+c.id),M(`build.${c.id}_desc`),'<div style="font-size:22px">✅</div>');if(c.state==="unlocked"){const d=i.bananas>=c.playerCost;return o(c.emoji,M("build."+c.id),M(`build.${c.id}_desc`),`<button class="btn ${d?"green":"soft"}" data-fund="${c.id}">🍌 ${c.playerCost}</button>`)}return o("❓",M("island.locked_name"),M("island.locked_hint"),"",!0)}).join("")}
    </div>
  `);l.querySelector("#scr-back").addEventListener("click",t),s&&l.querySelector("#island-altar")?.addEventListener("click",()=>{$.sfx("click"),s()});for(const c of l.querySelectorAll("[data-fund]"))c.addEventListener("click",()=>{const d=e.find(u=>u.id===c.dataset.fund);if(i.bananas<d.playerCost){$.sfx("boop"),qi(M("shop.too_pricey"));return}$.sfx("click"),n(d.id)})}function C1(i,e){let t="";for(let n=5;n>=0;n--)t+=`<span class="hx-line ${i>>n&1?"yang":"yin"}"></span>`;return`<div class="hx${e?" lit":""}">${t}</div>`}function k1(i){const e=i.gems.total||100,t=Math.min(1,(i.gems.lit.length||0)/e),n=Math.round(64*t);return hx.map((s,r)=>C1(s,r<n)).join("")}const P1=`<style>
  #hex-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:5px; max-width:340px; margin:0 auto; }
  .hx { display:flex; flex-direction:column; gap:2px; align-items:center; padding:5px 3px; border-radius:7px; background:rgba(0,0,0,.05); opacity:.42; transition:opacity .3s, background .3s; }
  .hx.lit { opacity:1; background:rgba(244,201,93,.18); }
  .hx-line { height:3px; border-radius:2px; }
  .hx-line.yang { width:22px; background:#c9c3b8; }
  .hx.lit .hx-line.yang { background:#f4c95d; }
  .hx-line.yin { width:22px; background:linear-gradient(90deg,#c9c3b8 0 40%, transparent 40% 60%, #c9c3b8 60% 100%); }
  .hx.lit .hx-line.yin { background:linear-gradient(90deg,#f4c95d 0 40%, transparent 40% 60%, #f4c95d 60% 100%); }
</style>`;function L1({report:i,onClose:e}){const t=new Set(i.gems.lit);let n='<div class="gem-cell head">×</div>';for(let r=1;r<=10;r++)n+=`<div class="gem-cell head">${r}</div>`;for(let r=1;r<=10;r++){n+=`<div class="gem-cell head">${r}</div>`;for(let a=1;a<=10;a++){const o=t.has(`${r}x${a}`);n+=`<div class="gem-cell ${o?"lit":""}">${o?"💎":r*a}</div>`}}vt(`
    ${P1}
    ${wn()}
    <h2>🌳 ${M("gems.title")}</h2>
    <div class="tagline" style="margin-bottom:8px">${M("gems.sub")}</div>
    <div class="chip" style="margin-bottom:10px">💎 ${M("gems.count",{n:i.gems.lit.length,total:i.gems.total})}</div>
    <div class="card" style="display:flex;justify-content:center"><div id="gem-grid">${n}</div></div>
    <div class="card" style="text-align:center">
      <h3>✨ ${M("gems.hex_title")}</h3>
      <div id="hex-grid">${k1(i)}</div>
      <div class="tagline" style="margin-top:10px">${M("gems.hex_sub")}</div>
    </div>
    <div class="card">
      <h3>${M("gems.skills")}</h3>
      ${Object.entries(i.worlds).map(([r,a])=>`
        <div style="margin-bottom:8px">
          <div style="font-weight:900">${JM[r]} ${M("world."+r)}</div>
          ${a.skills.map(o=>`
            <div class="skill-row">
              <div class="s-name">${M(o.nameKey)}</div>
              <div class="s-bar"><div class="s-fill" style="width:${Math.round(Math.min(1,Math.max(0,(o.rating-400)/600))*100)}%"></div></div>
              <div class="s-star">${o.mastered?"🌟":o.n>0?"🌱":"·"}</div>
            </div>`).join("")}
        </div>`).join("")}
    </div>
  `).querySelector("#scr-back").addEventListener("click",e)}function F1({rewards:i,wonder:e=null,onWonderOpen:t,onNext:n,onHome:s}){const r=e?`
    <button class="btn soft hidden" id="result-wonder" style="margin-top:12px">✨ ${M("result.wonder")}</button>
    <div class="card hidden" id="wonder-card" style="max-width:400px;margin:10px auto;text-align:center">
      <div style="font-weight:800">${M(e.titleKey)}</div>
      <div style="font-size:14px;line-height:1.5;color:var(--ink-soft);margin-top:6px">${M(e.bodyKey)}</div>
    </div>`:"",a=vt(`
    <div style="flex:1"></div>
    <h2>${M("result.title")}</h2>
    <div id="result-chest">🎁</div>
    <div class="tagline" id="chest-hint">${M("result.tap_chest")}</div>
    <div class="reward-row hidden" id="reward-row"></div>
    ${r}
    <div class="menu-row hidden" id="result-btns" style="margin-top:18px">
      <button class="btn green" id="res-next">${M("result.next")} →</button>
      <button class="btn soft" id="res-home">🏝️ ${M("result.home")}</button>
    </div>
    <div style="flex:2"></div>
  `),o=a.querySelector("#result-chest");o.addEventListener("click",()=>{if(o.dataset.open)return;o.dataset.open="1",o.textContent="🎉",$.sfx("chest"),a.querySelector("#chest-hint").classList.add("hidden");const c=a.querySelector("#reward-row");c.classList.remove("hidden"),c.innerHTML=i.map(d=>`<div class="reward-item">${d}</div>`).join(""),a.querySelector("#result-btns").classList.remove("hidden"),a.querySelector("#result-wonder")?.classList.remove("hidden")},{once:!1});const l=a.querySelector("#result-wonder");l?.addEventListener("click",()=>{l.classList.add("hidden"),a.querySelector("#wonder-card").classList.remove("hidden"),$.sfx("correct"),t?.(e.id)}),a.querySelector("#res-next").addEventListener("click",n),a.querySelector("#res-home").addEventListener("click",s)}const Zp={sy:1,sxz:1};function Qp(i,e,t){Ie.contactShadows&&(i.shadow||(i.shadow=Gd({radius:t})),e.group.add(i.shadow))}function mo(i){const e=i.shadow;if(!e||!i.place)return;const t=(i.place.cellAt(i.x,i.z)?.h??0)*wc;e.position.set(i.mesh.position.x,t+.02,i.mesh.position.z)}class Jp{constructor(e){this.mesh=e,this.x=0,this.z=0,this.place=null,this.hopping=!1,this.queue=[],this.carrying=null,this.carryData=null,this.facing=0,this.idleT=Math.random()*10,this.locked=!1,this.onArrive=null,this.onBump=null,this.sfx=!0,this.headH=1,this.baseScale=e.scale.x||1}setPlace(e,t,n){this.place=e,this.x=t,this.z=n,this.queue.length=0,this.hopping=!1;const s=e.worldPos(t,n);this.mesh.position.copy(s),e.group.add(this.mesh),Qp(this,e,.32),mo(this)}get cell(){return this.place?.cellAt(this.x,this.z)}face(e,t){e===0&&t===0||(this.facing=Math.atan2(e,t))}tryStep(e,t){return this.locked?!1:this.hopping?(this.queue.length<2&&this.queue.push({dx:e,dz:t}),!0):this._step(e,t)}_step(e,t){const n=this.x+e,s=this.z+t,r=this.place.cellAt(this.x,this.z),a=this.place.cellAt(n,s);if(this.face(e,t),!a||!a.walk||!this.place.canWalk(r,a)){this.hopping=!0;const d=this.mesh,u=d.position.x,h=d.position.z;return Qe({ms:140,ease:nt.outQuad,onUpdate:(f,g)=>{const _=Math.sin(g*Math.PI)*.18;d.position.x=u+e*_,d.position.z=h+t*_},onDone:()=>{this.hopping=!1,this._next()}}),this.onBump?.(n,s),!1}this.hopping=!0;const o=this.mesh,l=o.position.clone(),c=this.place.worldPos(n,s);return this.sfx&&$.sfx("hop"),Qe({ms:Ff,ease:nt.linear,onUpdate:(d,u)=>{o.position.x=l.x+(c.x-l.x)*u,o.position.z=l.z+(c.z-l.z)*u,o.position.y=l.y+(c.y-l.y)*u+Math.sin(u*Math.PI)*Df;const h=lt()?Zp:Sp(u);o.scale.set(this.baseScale*h.sxz,this.baseScale*h.sy,this.baseScale*h.sxz),o.rotation.y+=(this.facing-o.rotation.y)*.35},onDone:()=>{o.position.copy(c),o.scale.setScalar(this.baseScale),this.x=n,this.z=s,this.hopping=!1,this.onArrive?.(n,s),this._next()}}),!0}_next(){if(this.locked){this.queue.length=0;return}const e=this.queue.shift();if(e)if(e.dx!==void 0)this._step(e.dx,e.dz);else{const t=Math.sign(e.x-this.x),n=Math.sign(e.z-this.z);(t||n)&&this._step(t,n)}}pathTo(e,t){if(this.locked||!this.place)return;const{w:n,d:s}=this.place.size,r=(h,f)=>h>=0&&f>=0&&h<n&&f<s,a=(h,f)=>f*n+h,o=new Int32Array(n*s).fill(-2),l=[[this.x,this.z]];o[a(this.x,this.z)]=-1;let c=!1;for(;l.length&&!c;){const[h,f]=l.shift(),g=this.place.cellAt(h,f);for(const[_,m]of[[1,0],[-1,0],[0,1],[0,-1]]){const p=h+_,w=f+m;if(!r(p,w)||o[a(p,w)]!==-2)continue;const E=this.place.cellAt(p,w);if(!E||!E.walk||!this.place.canWalk(g,E)){o[a(p,w)]=-3;continue}if(o[a(p,w)]=a(h,f),p===e&&w===t){c=!0;break}l.push([p,w])}}if(!c)return!1;const d=[];let u=a(e,t);for(;u!==-1&&o[u]!==-1;)d.unshift({x:u%n,z:Math.floor(u/n)}),u=o[u];return this.queue=d.map(h=>({x:h.x,z:h.z})),this.hopping||this._next(),!0}stop(){this.queue.length=0}carry(e,t){this.carrying=e,this.carryData=t,this.mesh.add(e),e.position.set(0,this.headH+.18,0),e.rotation.set(0,0,0)}dropCarry(){const e=this.carrying;e&&this.mesh.remove(e),this.carrying=null;const t=this.carryData;return this.carryData=null,{mesh:e,data:t}}update(e){this.idleT+=e/1e3;const t=this.mesh;if(!this.hopping){const n=1+Math.sin(this.idleT*3.1)*.015;t.scale.set(this.baseScale,this.baseScale*n,this.baseScale),t.rotation.y+=(this.facing-t.rotation.y)*Math.min(1,e/90)}mo(this),this.carrying&&(this.carrying.position.y=this.headH+.18+Math.sin(this.idleT*4)*.035,this.carrying.rotation.y+=e*.001)}}const D1={bounce:1,idleSpeed:1,celebrate:"happy-spin",scaleSquash:.05};class em{constructor(e,t=null){this.mesh=e,this.anim=t||D1,this.trail=[],this.x=0,this.z=0,this.hopping=!1,this.place=null,this.idleT=Math.random()*10,this.baseScale=e.scale.x||1,this.celebrating=!1}setPlace(e,t,n){this.place=e,this.x=t,this.z=n,this.trail.length=0,this.mesh.position.copy(e.worldPos(t,n)),e.group.add(this.mesh),Qp(this,e,.22),mo(this)}notePlayerAt(e,t){const n=this.trail[this.trail.length-1];n&&n.x===e&&n.z===t||(this.trail.push({x:e,z:t}),this.trail.length>6&&this.trail.shift())}celebrate(){if(this.celebrating)return;this.celebrating=!0;const e=this.mesh,t=this.baseScale,n=this.anim.celebrate;if(lt()){Qe({ms:360,onUpdate:(r,a)=>{const o=wl(a,.08);e.scale.set(t*o.sxz,t*o.sy,t*o.sxz)},onDone:()=>{e.scale.setScalar(t),this.celebrating=!1}});return}const s=e.rotation.y;if(Qe({ms:720,ease:nt.outQuad,onUpdate:(r,a)=>{let o=1,l=1,c=0,d=s;if(n==="double-hop"||n==="cheer-hop"){const u=wl(a*2%1,.24);o=u.sy,l=u.sxz}else if(n==="happy-spin"||n==="head-swivel")d=s+a*Math.PI*2;else if(n==="stretch"||n==="shell-bob"){const u=wl(a,.28);o=u.sy,l=u.sxz}else c=wp(a,.35,5);e.scale.set(t*l,t*o,t*l),e.rotation.set(0,d,c)},onDone:()=>{e.rotation.set(0,s,0),e.scale.setScalar(t),this.celebrating=!1}}),n==="sparkle-puff"&&this.place?.fx){const r=e.position.clone();r.y+=.4,this.place.fx.emit(r,10,{colors:[16774072,13215487],speed:1.2,up:1.6,life:700,spread:.3})}}update(e){this.idleT+=e/1e3;const t=this.mesh;if(!this.celebrating){if(!this.hopping&&this.trail.length>2&&this.place){const n=this.trail.shift(),s=n.x-this.x,r=n.z-this.z;if(s||r){this.hopping=!0;const a=t.position.clone(),o=this.place.worldPos(n.x,n.z),l=Math.atan2(s,r);Qe({ms:Ff*1.05,ease:nt.linear,onUpdate:(c,d)=>{t.position.lerpVectors(a,o,d),t.position.y=a.y+(o.y-a.y)*d+Math.sin(d*Math.PI)*Df*.7,t.rotation.y+=(l-t.rotation.y)*.3;const u=lt()?Zp:Sp(d);t.scale.set(this.baseScale*u.sxz,this.baseScale*u.sy,this.baseScale*u.sxz)},onDone:()=>{t.position.copy(o),t.scale.setScalar(this.baseScale),this.x=n.x,this.z=n.z,this.hopping=!1}})}}else if(!this.hopping){const n=this.anim;t.scale.set(this.baseScale,this.baseScale*(1+Math.sin(this.idleT*4.2*n.idleSpeed)*n.scaleSquash),this.baseScale)}mo(this)}}}class I1{constructor(e){this.game=e}spawnAvatar(){this.game.player=new Jp(this.makeAvatarMesh(this.game.profile.avatar)),this.game.player.headH=.95}makeAvatarMesh(e){const t=wi(e?.creature||ro),n=t.fur?Hc.find(a=>a.id===e?.fur)||Hc[0]:null,s=Jn(t.full,.85,n?.palette||null,"creature:"+t.id+":f"),r=t.hat&&e?.hat?Ud.find(a=>a.id===e.hat):null;if(r){const a=Si(r.model,{cacheKey:"hat:"+r.id}),o=s.userData.voxelScale;a.scale.setScalar(o),a.position.y=((t.hatY??xS)+(r.dy||0))*o,s.add(a)}return s}refreshAvatar(){const e=this.game;if(!e.player||!e.place)return;const{x:t,z:n}=e.player;e.player.mesh.removeFromParent();const r=this.makeAvatarMesh(e.profile.avatar);e.player.mesh=r,e.player.baseScale=r.scale.x||1,e.player.setPlace(e.place,t,n),this.respawnPet()}spawnPet(e){const t=this.game,n=t.profile.avatar.pet;if(!n){t.pet=null;return}if(n===(t.profile.avatar.creature||ro)){t.pet=null;return}const s=wi(n);if(!s||s.id!==n||!s.canBePet){t.pet=null;return}const r=Jn(s.small,.45,null,"creature:"+s.id+":s");t.pet=new em(r,s.anim);const a=this.findFreeNear(e.x,e.z)||e;t.pet.setPlace(t.place,a.x,a.z)}respawnPet(){const e=this.game;e.pet&&(e.pet.mesh.removeFromParent(),e.pet=null),e.player&&this.spawnPet({x:e.player.x,z:e.player.z})}findFreeNear(e,t){for(const[n,s]of[[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,-1]]){const r=this.game.place.cellAt(e+n,t+s);if(r&&r.walk)return{x:e+n,z:t+s}}return null}}class O1{constructor(e){this.game=e,this.canvas=e.canvas,this.userZoom=null,this.gestureHintDone=!1}bind(){const e=this.game;window.addEventListener("keydown",d=>{if(e.mode==="title"||document.querySelector("#screens .screen"))return;const u=d.code;if((u==="Space"||u==="Enter")&&qd()){d.preventDefault();return}if(e.verb?.onKey?.(u)){d.preventDefault();return}const h={ArrowUp:[0,-1],KeyW:[0,-1],ArrowDown:[0,1],KeyS:[0,1],ArrowLeft:[-1,0],KeyA:[-1,0],ArrowRight:[1,0],KeyD:[1,0]};h[u]?(d.preventDefault(),e.player?.tryStep(h[u][0],h[u][1])):u==="Space"||u==="Enter"?(d.preventDefault(),e.inputAction()):u==="KeyE"&&e.inputHint()});const t=new Map;let n=null,s=!1,r=!1,a=null;const o=()=>{let d=0,u=0;for(const f of t.values())d+=f.x,u+=f.y;const h=t.size||1;return{x:d/h,y:u/h}},l=()=>{const d=[...t.values()];return d.length<2?0:Math.hypot(d[0].x-d[1].x,d[0].y-d[1].y)};this.canvas.addEventListener("pointerdown",d=>{if(t.set(d.pointerId,{x:d.clientX,y:d.clientY}),t.size===1)n={x:d.clientX,y:d.clientY},s=!1,r=!1;else if(t.size===2){const u=o();a={dist:l()||1,zoom:e.world.zoom,cx:u.x,cy:u.y},r=!0}}),this.canvas.addEventListener("pointermove",d=>{if(t.has(d.pointerId)&&(t.set(d.pointerId,{x:d.clientX,y:d.clientY}),e.mode!=="title")){if(t.size>=2&&a){const u=l();u>0&&e.world.setZoom(a.zoom*(u/a.dist));const h=o();e.world.panByPixels(h.x-a.cx,h.y-a.cy),a.cx=h.x,a.cy=h.y,this.userZoom=e.world.zoom}else if(t.size===1&&n){const u=d.clientX-n.x,h=d.clientY-n.y;Math.hypot(u,h)>14&&(s=!0)}}});const c=d=>{const u=n,h=t.delete(d.pointerId);if(t.size<2&&(a=null),t.size>0)return;n=null;const f=s,g=r;if(s=!1,r=!1,!(!h||e.mode==="title"||g))if(f){const _=d.clientX-(u?.x??d.clientX),m=d.clientY-(u?.y??d.clientY);if(Math.hypot(_,m)>30){const p=bS(_,-m);p&&e.player?.tryStep(p[0],p[1])}}else{const _=this.pickCell(d.clientX,d.clientY);if(!_)return;e.inputTapCell(_)}};this.canvas.addEventListener("pointerup",c),this.canvas.addEventListener("pointercancel",c),this.canvas.addEventListener("wheel",d=>{e.mode!=="title"&&(d.preventDefault(),e.world.zoomBy(d.deltaY<0?1.1:1/1.1),this.userZoom=e.world.zoom)},{passive:!1})}maybeGestureHint(){if(!(!Sc||this.gestureHintDone)){this.gestureHintDone=!0;try{if(localStorage.getItem("monkeygrove.gestureHint"))return;localStorage.setItem("monkeygrove.gestureHint","1")}catch{}St(1200,()=>Kt(M("hint.pinch")))}}mobileZoom(e){const t=(window.innerHeight||1)/(window.innerWidth||1)>1.35;return!Sc||!t?1:e==="hub"?uh.hub:e==="numberline"?1:uh.chamber}sceneZoom(e){return this.userZoom??this.mobileZoom(e)}pickCell(e,t){const n=this.game.place,s=this.game.world.pick(e,t);if(!s)return null;const r=s.object?.userData?.gridList;if(r&&s.instanceId!==void 0){const c=r[s.instanceId];if(c)return{x:c.x,z:c.z}}if(s.object===n?.floor&&s.instanceId!==void 0){const c=n.floorList[s.instanceId];if(c)return{x:c.x,z:c.z}}const a=s.point,o=Math.floor(a.x/Dt+n.size.w/2),l=Math.floor(a.z/Dt+n.size.d/2);return n.cellAt(o,l)?{x:o,z:l}:null}}class B1{constructor(e){this.game=e}payCorrect(e,t){const n=this.game,s=n.player.mesh.position.clone().add(new P(0,.8,0));n.particles.confetti(s,30);const r=n.rng.int(Lt.bananasPerCorrect[0],Lt.bananasPerCorrect[1]),a=Math.min(10,(e-1)*Lt.comboBonus);let o=r+a;n.profile.avatar.pet&&(o=Math.round(o*(1+Lt.petBananaBonus))),Al(n.world,s,"🍌",document.getElementById("banana-count"),Math.min(o,8),()=>$.sfx("coin")),Bs(n.profile,o);const l=Sr(n.profile,Lt.eggPerCorrect);n.refreshHudCounts(),Rn(`<b>${KM()}</b>`,{transient:!0,ms:1800});for(const c of t.newGems||[])Kt("💎 "+M("result.gem",{fact:c.replace("x"," × ")}),"gem"),$.sfx("sparkle");return t.masteredSkill&&(Kt("🌟 "+M("result.mastered",{skill:M("skill."+t.masteredSkill)})),$.sfx("bloom")),l}payChest(e){const t=this.game,n=Lt.bananasChestBase+t.rng.int(0,6)+Math.min(12,e*2);Bs(t.profile,n);const s=[`🍌 +${n}`];if(t.rng.chance(Lt.hatRandomChestChance)){const a=Ud.filter(o=>!t.profile.owned.hats.includes(o.id));if(a.length){const o=t.rng.pick(a);t.profile.owned.hats.push(o.id),s.push(`${Hp[o.id]||"🎩"} ${M(o.nameKey)}!`)}}const r=t.rng.int(1,3);return Sr(t.profile,r),s.push(`🥚 +${r}`),s}payTreat(e,t,n){const s=this.game;e==="bananas"?(Al(s.world,n,"🍌",document.getElementById("banana-count"),t,()=>$.sfx("coin")),Bs(s.profile,t)):e==="berry"&&(Al(s.world,n,"🍓",document.getElementById("egg-fill").parentElement,t,()=>$.sfx("egg")),Sr(s.profile,t*Lt.eggPerBerry),s.profile.stats.berries+=t),s.refreshHudCounts()}}const N1=[{key:"grassA",base:.3,cap:240,h:.16},{key:"grassB",base:.18,cap:180,h:.22},{key:"pebble",base:.12,cap:120,h:.08}],Vh={hub:[{key:"flowerPink",base:.05,cap:50,h:.18},{key:"flowerBlue",base:.04,cap:40,h:.18}],tide:[{key:"shell",base:.1,cap:70,h:.14},{key:"pebble",base:.12,cap:110,h:.08}],garden:[{key:"flowerPink",base:.12,cap:90,h:.18},{key:"flowerYellow",base:.08,cap:70,h:.18}],stump:[{key:"coconut",base:.05,cap:35,h:.16},{key:"grassB",base:.1,cap:90,h:.22}],vines:[{key:"mushroom",base:.1,cap:70,h:.16},{key:"crystal",base:.06,cap:45,h:.2}]};function z1(i){return[...N1,...Vh[i]||Vh.hub]}function U1(i,e,t){const n=(a,o)=>a<0||o<0||a>=e||o>=t?null:i[o]?.[a]||null,s=a=>!!a&&(a.ch==="."||a.ch===",")&&a.h===0,r=[];for(let a=1;a<t-1;a++)for(let o=1;o<e-1;o++){const l=n(o,a);if(!l||l.walk===!1||!s(l))continue;let c=!0;for(let d=-1;d<=1&&c;d++)for(let u=-1;u<=1&&c;u++){if(!u&&!d)continue;const h=n(o+u,a+d);h&&!s(h)&&(c=!1)}c&&r.push({x:o,z:a})}return r}function G1(i,e,t,n){const s=[];for(const r of e){const a=Math.min(.85,r.base*n);if(a<=0)continue;const o=t.shuffle(i.slice());let l=0;for(const c of o){if(l>=r.cap)break;t.chance(a)&&(s.push({key:r.key,x:c.x,z:c.z,jx:(t.float()-.5)*.6,jz:(t.float()-.5)*.6,scale:.8+t.float()*.5,rot:t.float()*Math.PI*2,h:r.h}),l++)}}return s}function H1(i,e={}){const t=Ie.decorDensity|0;if(!t)return;const n=Math.max(0,Math.min(1,e.bloom??i.storyBloom??.6)),s=t*(.35+.65*n),r=new vn((e.seed??1234)^97155047),a=U1(i.cells,i.size.w,i.size.d);if(!a.length)return;const o=G1(a,z1(i.theme),r,s);if(!o.length)return;const l=new Map;for(const g of o)l.has(g.key)||l.set(g.key,[]),l.get(g.key).push(g);const c=new it,d=new Js,u=new P(0,1,0),h=new P,f=new P;for(const[g,_]of l){const m=gt[g];if(!m)continue;const p=Si(m,{cacheKey:"scatter:"+g}).geometry,w=new bc(p,uS(),_.length);_.forEach((E,x)=>{const A=i.worldPos(E.x,E.z),k=E.h/m.layers.length*E.scale;h.set(A.x+E.jx*Dt,A.y,A.z+E.jz*Dt),d.setFromAxisAngle(u,E.rot),f.setScalar(k),c.compose(h,d,f),w.setMatrixAt(x,c)}),w.instanceMatrix.needsUpdate=!0,w.castShadow=!1,w.receiveShadow=!1,w.frustumCulled=!1,i.group.add(w)}}function W1(i,e,{role:t="near-build",bloom:n=.7}={}){const s=Ie.decorDensity|0;if(!s)return;const r=new vn(((e.x+1)*92837^(e.z+1)*689287^97155047)>>>0),a=t==="festival"?["flowerPink","flowerYellow","flowerBlue","crystal"]:["grassA","grassB","flowerPink","pebble"],o=[];for(let c=-1;c<=1;c++)for(let d=-1;d<=1;d++){if(!d&&!c)continue;const u=i.cellAt(e.x+d,e.z+c);u&&u.walk!==!1&&u.h===0&&(u.ch==="."||u.ch===",")&&o.push({x:e.x+d,z:e.z+c})}const l=Math.min(o.length,Math.round((t==="festival"?5:3)*s*(.4+.6*n)));for(const c of r.shuffle(o).slice(0,l)){const d=r.pick(a),u=gt[d];if(!u)continue;const h=Tt(u,.18*(.8+r.float()*.5),"prop:"+d),f=i.worldPos(c.x,c.z);h.position.set(f.x+(r.float()-.5)*.4,f.y,f.z+(r.float()-.5)*.4),h.rotation.y=r.float()*Math.PI*2,h.castShadow=!1,i.group.add(h)}}function $h(i,e,t,n={}){const s=new Kr({color:e,...n});s._owned=!0;const r=new Ft(i,s);return r.rotation.x=-Math.PI/2,r.position.y=t,r}function V1(i,{size:e,quality:t,palette:n,theme:s="hub"}={}){const r=new en,a=Math.max(e.w,e.d)*3,o=new Mi(a,a),l=$h(o,n.water,-.22,{transparent:!0,opacity:.92}),c=$h(o,n.waterDeep,-.55),d=[];let u=0,h=null,f=!1;return r.add(l,c),t==="animated"&&yr(()=>import("./waterfx-CkgVPILd.js"),[]).then(g=>{f||(h=g.attachWaterEffects(i,{group:r,surface:l,deep:c,theme:s,lifeAnchors:d}))}).catch(()=>{}),{group:r,surface:l,lifeAnchors:d,update(g){u+=g/1e3,l.position.y=-.22+Math.sin(u*1.11)*.02,h?.update?.(g)},react(g,_){h?.react?.(g,_)},dispose(){f=!0,h?.dispose?.()},spawnShoreRipple(g,_){h?.spawnShoreRipple?.(g,_)},spawnFishShadow(g,_){h?.spawnFishShadow?.(g,_)},spawnBubble(g,_){h?.spawnBubble?.(g,_)},spawnSparkle(g,_){h?.spawnSparkle?.(g,_)}}}function ed(i,{prop:e="opacity",base:t=.5,amp:n=.2,hz:s=1}={}){let r=0;const a=i?.position?.y??0;return{update(o){r+=o/1e3;const l=lt()?0:n,c=t+l*(.5+.5*Math.sin(r*s*Math.PI*2));e==="scale"?i.scale?.setScalar?.(c):e==="y"?i.position&&(i.position.y=a+(c-t)):i.material?i.material.opacity=c:i.opacity=c}}}const Ba={sand:14995624,soil:12159582,grass:9425290,vines:13215487};function tm(i,e,t,n){if(i.visualEvent?.("player-hop",{x:e,z:t,worldPos:n}),lt()||Ie.ambientScale<=.5||!i.fx||!n)return;const s=i.cellAt?.(e,t),r=i.theme||"hub";let a=Ba.grass;s?.ch==="o"?a=Ba.soil:r==="tide"||r==="stump"?a=Ba.sand:r==="vines"&&(a=Ba.vines);const o=n.clone();o.y+=.05,i.fx.poof(o,Math.round(7*Ie.ambientScale),a)}function $1(i,e,t){if(!Ie.toneMap)return;const n=Wr(16771496,.26,.25);n.position.copy(i.worldPos(e,t)).add(new P(0,.5,0)),i.group.add(n),i.addReactor(ed(n,{prop:"opacity",base:.22,amp:.16,hz:.35}))}function j1(i,e,t){if(!Ie.toneMap)return;const n=i.worldPos(t.x,t.z);if(e.id==="bakery"){const s=Wr(16767392,.35,.3);s.position.set(n.x,n.y+.85,n.z+.42),i.group.add(s),i.addReactor(ed(s,{prop:"opacity",base:.2,amp:.12,hz:.4}))}else if(e.id==="pizzeria"){let s=0;i.addEntity({update:r=>{s+=r,!(s<2600)&&(s=0,i.fx?.poof(new P(n.x+.44,n.y+2.05,n.z-.1),6,14209736))}})}else if(e.id==="plaza"||e.id==="stage"||e.id==="lanterns"){const s=Wr(e.id==="plaza"?16767334:16771496,e.id==="plaza"?.5:.3,.3);s.position.set(n.x,n.y+(e.id==="plaza"?1.6:.7),n.z),i.group.add(s),i.addReactor(ed(s,{prop:"opacity",base:.22,amp:.16,hz:.5}))}}function q1(i,e,t,n,s,r){if(Math.abs(e-n.x)+Math.abs(t-n.z)>s||r&&r.x===e&&r.z===t)return!1;const a=i.cellAt(e,t);return!(!a||a.walk===!1||a.h!==0||!(Xi.has(a.ch)||a.ch===Nt.HELPER)||If.has(a.ch))}class K1{constructor(e,t,{home:n,anchor:s,playerAt:r,rng:a,tier:o="full",entry:l,radius:c=1}={}){this.place=e,this.mesh=t,this.home=n,this.anchor=s||n,this.playerAt=r,this.rng=a,this.tier=o,this.entry=l,this.radius=c,this.pos={x:n.x,z:n.z},this.baseY=t.position.y,this.t=a.float()*6,this.wait=2e3+a.float()*3e3,this.hop=null}_commit(e,t,n,s){const r=this.place.cellAt(this.pos.x,this.pos.z);r&&(r.walk=!0);const a=this.place.cellAt(e,t);a&&(a.walk=!1),this.pos={x:e,z:t},this.entry&&(this.entry.x=e,this.entry.z=t),this.mesh.rotation.y=Math.atan2(n,s),this.hop={from:this.mesh.position.clone(),to:this.place.worldPos(e,t),k:0}}update(e){if(this.t+=e/1e3,this.tier==="limited"){this.mesh.position.y=this.baseY+Math.abs(Math.sin(this.t*2))*.04;return}if(this.hop){this.hop.k+=e/300;const s=Math.min(1,this.hop.k);this.mesh.position.lerpVectors(this.hop.from,this.hop.to,s),this.mesh.position.y+=Math.sin(s*Math.PI)*.22,s>=1&&(this.hop=null);return}const t=this.place.worldPos(this.pos.x,this.pos.z);this.mesh.position.y=t.y+Math.abs(Math.sin(this.t*2))*.04;const n=this.playerAt?.();if(n&&Math.abs(n.x-this.pos.x)+Math.abs(n.z-this.pos.z)<=2){const s=Math.atan2(n.x-this.pos.x,n.z-this.pos.z);this.mesh.rotation.y+=(s-this.mesh.rotation.y)*Math.min(1,e/160);return}if(this.wait-=e,!(this.wait>0)){if(this.wait=(2200+this.rng.float()*3800)*(lt()?2:1),this.rng.chance(.4)){this.mesh.rotation.y=Math.atan2(this.anchor.x-this.pos.x,this.anchor.z-this.pos.z);return}for(const[s,r]of this.rng.shuffle([[1,0],[-1,0],[0,1],[0,-1]])){const a=this.pos.x+s,o=this.pos.z+r;if(q1(this.place,a,o,this.home,this.radius,n)){this._commit(a,o,s,r);break}}}}dispose(){const e=this.place.cellAt(this.pos.x,this.pos.z);e&&(e.walk=!0)}}function Y1(i,e,t,n,s){const r=new vn(10224393+s);i.addEntity(new K1(i,e,{home:{x:n.x,z:n.z},anchor:t,playerAt:()=>i.playerAt?.(),rng:r,tier:Ie.npcRoutines,entry:n,radius:1}))}const X1=new Set(["palm","palmSmall","flowerPink","flowerYellow","flowerBlue","bush","sprout"]),Rl={arrayRows:8,arrayCols:10,baskets:6};function Na(i,e,t={}){let n=i;if(n.kind==="array"){const s=n.model.params,r=(a,o)=>a<=Rl.arrayRows&&o<=Rl.arrayCols;if(!r(s.rows,s.cols))if(s.given!=="rows"&&r(s.cols,s.rows)){const a=s.rows;s.rows=s.cols,s.cols=a,n.prompt?.vars&&(n.prompt.vars.rows=s.rows,n.prompt.vars.cols=s.cols)}else n=Gi(e,{...t,skill:n.skillId,kind:"fetch"})}else n.kind==="share"&&n.model.params.baskets>Rl.baskets&&(n=Gi(e,{...t,skill:n.skillId,kind:"fetch"}));if(n.world==="tide"&&(!n.model||n.model.kind==="none")){const s=n.meta||{},r=n.equation.includes("−")?"−":"+",a=s.a,o=s.b!==void 0?s.b:s.c!==void 0?s.c-s.a:void 0;a!==void 0&&o!==void 0&&(n.model={kind:"strip",params:{a,b:Math.abs(o),op:r}})}return n}const Z1="PAspcDdoBmVMTON tguy lfehkbjz".replace(/ /g,""),Q1={".":0,",":0,1:1,2:2};function J1(i,e){let t=i.slice();e.chance(.5)&&(t=t.map(u=>u.split("").reverse().join(""))),e.chance(.5)&&(t=t.slice().reverse());const n=t.map(u=>u.split("")),s=n.length,r=n[0].length,a=u=>u==="."||u===",",o=[],l=[];for(let u=1;u<s-1;u++)for(let h=1;h<r-1;h++){if(n[u][h]!==".")continue;let f=0,g=0;for(let _=-1;_<=1;_++)for(let m=-1;m<=1;m++){const p=n[u+_][h+m];p==="#"?f++:a(p)||g++}g>0||(f>0?l:o).push({x:h,z:u})}const c=[],d=(u,h,f)=>{for(const g of e.shuffle(u)){if(h<=0)break;c.every(_=>Math.abs(_.x-g.x)+Math.abs(_.z-g.z)>=3)&&(c.push(g),n[g.z][g.x]=f,h--)}};return d(l,e.int(2,4),"1"),d(o,e.int(1,3),"d"),d(o,e.int(2,5),","),n.map(u=>u.join(""))}function eE(i,e,{stones:t=4,pots:n=1}={}){const{w:s,d:r}=i.size,a=i.markers,o=[...a.A||[],...a.P||[],...a.M||[],...a.m||[],...a.B||[],...a.D||[]],l=(h,f,g,_)=>g.every(m=>Math.abs(m.x-h)+Math.abs(m.z-f)>=_),c=[];for(let h=1;h<r-1;h++)for(let f=1;f<s-1;f++){const g=i.cellAt(f,h);!g||!g.walk||g.h!==0||!Xi.has(g.ch)||l(f,h,o,2)&&c.push({x:f,z:h})}let d=t+n;const u=[];for(const h of e.shuffle(c)){if(d<=0)break;if(!l(h.x,h.z,[...u,...a.s||[],...a.p||[]],2))continue;u.push(h),d--;const f=u.length<=t?"s":"p";(a[f]=a[f]||[]).push(h),i.cellAt(h.x,h.z).ch=f}}function tE(i){const e=i.length,t=i[0].length,n=[],s={};for(let r=0;r<e;r++){n.push([]);for(let a=0;a<t;a++){const o=i[r][a]||"#";if(o==="#"){n[r].push(null);continue}const c={h:Q1[o]??0,walk:!0,ch:o,alt:o===","};n[r].push(c),Z1.includes(o)&&(s[o]=s[o]||[]).push({x:a,z:r})}}return{w:t,d:e,cells:n,markers:s}}class nm{constructor(e,t="hub"){this.world=e,this.theme=t,this.group=new en,this.entities=[],this._reactors=[],this.size={w:0,d:0},this.cells=[],this.markers={},e.scene.add(this.group)}worldPos(e,t,n=0){const s=this.cellAt(e,t),r=s?s.h:0;return new P((e-this.size.w/2+.5)*Dt,r*wc+n,(t-this.size.d/2+.5)*Dt)}cellAt(e,t){return e<0||t<0||t>=this.size.d||e>=this.size.w?null:this.cells[t]?.[e]||null}canWalk(e,t){return!e||!t?!1:Math.abs(t.h-e.h)<=1&&t.walk!==!1}center(){return new P(0,0,0)}buildFrom(e,t={}){const{w:n,d:s,cells:r,markers:a}=tE(e);return this.size={w:n,d:s},this.cells=r,this.markers=a,this._buildFloor(t),this._buildWater(),this._decorate(t),this._scatter(t),this}_floorColors(e,t,n,s){const r=js[this.theme]||js.hub,a=(t+n)%2===0;let o;return e.ch==="o"?o=a?on.soil:on.soilDark:r.floor==="sand"?o=a?on.sand:on.sandDark:r.floor==="soil"?o=a?on.soil:on.soilDark:o=a?on.grass:on.grassDark,e.h>0&&(o=a?on.stone:on.sandDark),e.alt&&(o=on.sandDark),o}_buildFloor(e){const{w:t,d:n}=this.size,s=[];for(let d=0;d<n;d++)for(let u=0;u<t;u++){const h=this.cells[d][u];!h||h.ch==="V"||s.push({x:u,z:d,c:h})}const r=new yi(1,1,1),a=new Kr;a._owned=!0;const o=new bc(r,a,s.length),l=new it,c=new Pe;s.forEach((d,u)=>{const h=d.c.h*wc,f=h+.55;l.makeScale(Dt,f,Dt),l.setPosition((d.x-t/2+.5)*Dt,h-f/2,(d.z-n/2+.5)*Dt),o.setMatrixAt(u,l),c.setHex(this._floorColors(d.c,d.x,d.z,e)),o.setColorAt(u,c),d.c.instanceId=u}),o.receiveShadow=!0,o.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),this.floor=o,this.floorList=s,this.group.add(o),this.world.pickables=[o],o.userData.place=this,o.userData.gridList=s;for(const d of this.markers.V||[]){const u=Tt(gt.plank,.15,"prop:plank"),h=this.worldPos(d.x,d.z);u.position.set(h.x,-.06,h.z),this.group.add(u)}if((this.markers.V||[]).length){const d=this.markers.V.slice(),u=new yi(1,1,1),h=new ss({color:16777215,transparent:!0,opacity:0,depthWrite:!1});u._owned=!0,h._owned=!0;const f=new bc(u,h,d.length);d.forEach((g,_)=>{const m=this.worldPos(g.x,g.z);l.makeScale(Dt,.16,Dt),l.setPosition(m.x,.02,m.z),f.setMatrixAt(_,l)}),f.instanceMatrix.needsUpdate=!0,f.userData.place=this,f.userData.gridList=d,this.bridgePick=f,this.group.add(f),this.world.pickables.push(f)}}tintCell(e,t,n){const s=this.cellAt(e,t);if(!s||s.instanceId===void 0||!this.floor.instanceColor)return;const r=new Pe(n);this.floor.setColorAt(s.instanceId,r),this.floor.instanceColor.needsUpdate=!0}resetCellTint(e,t){const n=this.cellAt(e,t);n&&this.tintCell(e,t,this._floorColors(n,e,t,{}))}_buildWater(){this.water=V1(this,{size:this.size,quality:Ie.water,palette:on,theme:this.theme}),this.group.add(this.water.group)}_decorate(e){const t=new vn(e.seed??1234);this.swayProps=[];const n={hub:["palm","flowerPink","flowerYellow","bush","palmSmall","flowerBlue"],tide:["shell","rockA","palmSmall","flowerBlue","rockB"],garden:["bush","flowerYellow","sprout","palmSmall","flowerPink"],stump:["rockA","bush","coconut","rockB","lantern"],vines:["flowerPink","flowerBlue","bush","lantern","flowerYellow"]}[this.theme]||["bush"];for(const s of this.markers.d||[]){const r=t.pick(n),a=gt[r];if(!a)continue;const o=Tt(a,void 0,"prop:"+r),l=.06+t.float()*.015;o.scale.setScalar(l);const c=this.worldPos(s.x,s.z);o.position.copy(c),o.rotation.y=t.float()*Math.PI*2,this.group.add(o),X1.has(r)&&this.swayProps.length<8&&this.swayProps.push({mesh:o,phase:t.float()*Math.PI*2,amp:.05+t.float()*.05,freq:.6+t.float()*.5});const d=this.cellAt(s.x,s.z);(r==="palm"||r==="rockA"||r==="rockB")&&(d.walk=!1)}}_updateSway(e){const t=this.swayProps;if(!t||!t.length)return;const n=bp(Ie,lt());if(!n){if(this._swaying){for(const s of t)s.mesh.rotation.z=0;this._swaying=!1}return}this._swaying=!0,this._swayT=(this._swayT||0)+e/1e3;for(const s of t)s.mesh.rotation.z=Math.sin(this._swayT*s.freq+s.phase)*s.amp*n}addGroundShadow(e,t,{radius:n=.4,opacity:s=.28,yOffset:r=.02}={}){if(!Ie.contactShadows)return null;const a=Gd({radius:n,opacity:s,yOffset:r}),o=this.worldPos(e,t);return a.position.set(o.x,o.y+r,o.z),this.group.add(a),a}_scatter(e={}){H1(this,e)}decorateSpot(e,t){W1(this,e,t)}addEntity(e){return this.entities.push(e),e}addReactor(e){return this._reactors.push(e),e.update&&this.addEntity(e),e}visualEvent(e,t={}){this.water?.react?.(e,t);for(const n of this._reactors)n.react?.(e,t)}update(e){for(const t of this.entities)t.update?.(e);this.water&&this.water.update(e),this._updateSway(e)}dispose(){this.water?.dispose?.(),this.world.scene.remove(this.group),this.group.traverse(e=>{e.isInstancedMesh&&e.dispose(),e.geometry&&!e.geometry._cached&&e.geometry.dispose?.(),e.material?._owned&&(e.material.map?.dispose?.(),e.material.dispose?.())}),this.world.pickables=[]}}const td={fetch:[["##############","#,.d......d.,#","#..s......s..#","#..........M.#","#.s....A...s.#","#............#","#...c........#","#.p........p.#","#..s......s..#","#......P.....#","#.d........d.#","##############"],["#############","##,.d...d.,##","#.s.......s.#","#...11111...#","#.s.1...1.s.#","#.....A..M..#","#.....c.....#","#,p.......p,#","#.s..P....s.#","##.d.....d.##","#############"],["################","#,.d.......s..,#","#..p...A...p...#","#.s..........s.#","#....c.....c...#","#..........M...#","#.s..........s.#","#......P....s..#","#.,d........d,.#","################"]],array:[["##################","#,.d..........d.,#","#..oooooooooo..s.#","#..oooooooooo....#","#..oooooooooo..A.#","#..oooooooooo....#","#..oooooooooo..s.#","#..oooooooooo....#","#..oooooooooo..M.#","#..oooooooooo..s.#","#..s....P........#","#.d............d.#","##################"],["##################","#,.d...........d,#","#..s...........s.#","#...oooooooooo...#","#...oooooooooo.A.#","#...oooooooooo...#","#...oooooooooo.M.#","#...oooooooooo...#","#...oooooooooo.s.#","#...oooooooooo...#","#...oooooooooo...#","#.s.....P......d.#","##################"]],numberline:[["##########################","#,d....................d,#","#..M..s............s..A,.#","#.,VVVVVVVVVVVVVVVVVVVVV.#","#......................,.#","#..P..s............s...d.#","##########################"],["########################","#,d..................d,#","#...s..........s....M..#","#..VVVVVVVVVVVVVVVVVV..#","#....,.............,...#","#..P....s........s...A.#","########################"]],share:[["###############","#,.d.......d.,#","#..B...B...B..#","#.s....M....s.#","#......m......#","#....c....A...#","#..B...B...B..#","#.s...P....s..#","#.,d.......d,.#","###############"],["###############","#,.d..M....d.,#","#..B..B..B....#","#.s........s..#","#....m....A...#","#.s........s..#","#..B..B..B....#","#....P.....c..#","#.,d.......d,.#","###############"]],hub:[["################################","###,.....dd......d.,############","##..t...........g..f.###########","#..........d..........##########","#.d.....1111111......d.#########","#.......1,,,,,1........#########","#.h.d...1,,T,,1...N....#########","#.......1,,,,,1........###....##","#.......1111111.l..d...##......#","#..d.........M........bwww..j..#","#......................##......#","#...O.......P......d...###....##","#.......k.z.......e....#########","#.d..........,,....d...#########","##..u...........y....###########","###,....dd.....d..,#############","################################"]]},nE={t:"tide",g:"garden",u:"stump",y:"vines"};class jh extends nm{constructor(e,t,n={},s={},r=0){super(e,"hub"),this.island={built:[],unlocked:[],crabKing:!1,festival:!1,...n},this.storyBloom=r,this.buildFrom(ox(td.hub[0],this.island.built),{seed:777}),this.portals={},this.gates={};for(const[d,u]of Object.entries(nE)){const h=(this.markers[d]||[])[0];if(!h)continue;const f=js[u],g=this.island.festival?1:Math.min(1,t?.[u]??0),_=this.island.festival?4:Math.min(4,Math.max(0,s[u]??0));this.gates[u]=new BM(this,h,{worldId:u,label:`${f.emoji} ${M("world."+u)}`,accent:f.accent,bloom:f.bloom,pct:g,stage:_}),this.portals[u]=h}const a=(this.markers.T||[])[0];if(a){if(this.tree=Tt(gt.palm,2.6,"prop:bigpalm"),this.tree.position.copy(this.worldPos(a.x,a.z)),this.group.add(this.tree),this.addGroundShadow(a.x,a.z,{radius:.7,opacity:.22}),Ie.bloom){const d=Wr(16774072,.5,.5);d.position.copy(this.worldPos(a.x,a.z)).add(new P(0,2.2,0)),this.group.add(d)}this.cellAt(a.x,a.z).walk=!1}const o=(this.markers.O||[])[0];if(o){const d=Tt(gt.sign,.85,"prop:sign");d.position.copy(this.worldPos(o.x,o.z)),this.group.add(d),this.addGroundShadow(o.x,o.z,{radius:.4})}const l=(this.markers.N||[])[0];if(l){const d=Tt(gt.egg,.6,"prop:egg");d.position.copy(this.worldPos(l.x,l.z)),this.group.add(d),this.addGroundShadow(l.x,l.z,{radius:.34}),$1(this,l.x,l.z)}const c=(this.markers.M||[])[0];c&&(this.mimi=Jn(Ic.mimi,.8,null,"char:mimi"),this.mimi.position.copy(this.worldPos(c.x,c.z)),this.group.add(this.mimi),this.addGroundShadow(c.x,c.z,{radius:.34}),this.cellAt(c.x,c.z).walk=!1,this.mimiHome={x:c.x,z:c.z},this.mimiPos={x:c.x,z:c.z},this.mimiPrev={x:c.x,z:c.z},this.playerAt=null,this.mimiTag=Mt(this.island.unlocked.length?"📜":"💬",{bg:"#fff8ecdd",scale:.55,fontSize:44}),this.group.add(this.mimiTag),this._mimiWander()),this.buildSpots={},this.npcs=[],this._plotSigns={},this._placeBuilds(),this.island.crabKing&&this._placeCrabKing(),this.applyBloom(t);for(const d of[this.mimi,this.mimiTag,...this.npcs.map(u=>u.mesh)])d&&this.world.pickables.push(d)}refreshLanguage(){for(const[e,t]of Object.entries(this.gates||{})){const n=js[e];t.updateLabel(`${n.emoji} ${M("world."+e)}`)}}_bob(e,t=2,n=.04){const s=e.position.y,r={t:Math.random()*6,update:a=>{r.t+=a/1e3,e.position.y=s+Math.abs(Math.sin(r.t*t))*n}};this.addEntity(r)}_mimiWander(){const e=this.mimi,t={t:Math.random()*6,wait:1800+Math.random()*2600,hop:null};this.addEntity({update:n=>{if(t.t+=n/1e3,this.mimiTag.position.set(e.position.x,e.position.y+1.3+Math.sin(t.t*2)*.05,e.position.z),t.hop){t.hop.k+=n/280;const o=Math.min(1,t.hop.k);e.position.lerpVectors(t.hop.from,t.hop.to,o),e.position.y+=Math.sin(o*Math.PI)*.3,o>=1&&(t.hop=null);return}const s=this.worldPos(this.mimiPos.x,this.mimiPos.z);e.position.y=s.y+Math.abs(Math.sin(t.t*2))*.04;const r=this.playerAt?.();if(r&&Math.abs(r.x-this.mimiPos.x)+Math.abs(r.z-this.mimiPos.z)<=2){const o=Math.atan2(r.x-this.mimiPos.x,r.z-this.mimiPos.z);e.rotation.y+=(o-e.rotation.y)*Math.min(1,n/160)}if(t.wait-=n,t.wait>0)return;t.wait=2200+Math.random()*3800;const a=[[1,0],[-1,0],[0,1],[0,-1]].sort(()=>Math.random()-.5);for(const[o,l]of a){const c=this.mimiPos.x+o,d=this.mimiPos.z+l;if(Math.abs(c-this.mimiHome.x)+Math.abs(d-this.mimiHome.z)>2)continue;const u=this.cellAt(c,d);if(!(!u||!u.walk||u.h!==0||!(Xi.has(u.ch)||u.ch===Nt.HELPER))&&!(r&&r.x===c&&r.z===d)){this.cellAt(this.mimiPos.x,this.mimiPos.z).walk=!0,u.walk=!1,this.mimiPrev={...this.mimiPos},this.mimiPos={x:c,z:d},e.rotation.y=Math.atan2(o,l),t.hop={from:e.position.clone(),to:this.worldPos(c,d),k:0};break}}}})}_prop(e,t,n,s,r=0,a=0,o=0){const l=Tt(gt[e],t,"prop:"+e),c=this.worldPos(n,s,o);return l.position.set(c.x+r*Dt,c.y,c.z+a*Dt),this.group.add(l),l}_placeBuilds(){for(const e of es){const t=(this.markers[e.char]||[])[0];if(!t)continue;const n=this.island.built.includes(e.id)?"built":this.island.unlocked.includes(e.id)?"unlocked":"locked";this.buildSpots[e.id]={x:t.x,z:t.z,state:n},n==="built"?this._placeBuilt(e,t):n==="unlocked"&&this._placePlotSign(e,t)}}_placePlotSign(e,t){const n=this._prop("sign",.8,t.x,t.z),s=Mt(`🔨 ${e.emoji}`,{bg:"#fff8ecdd",scale:.7,fontSize:44});s.position.copy(this.worldPos(t.x,t.z,1.45)),this.group.add(s),this.cellAt(t.x,t.z).walk=!1,this._plotSigns[e.id]=[n,s]}addBuild(e){const t=es.find(r=>r.id===e);if(!t||t.finale||e==="bridge")return null;const n=(this.markers[t.char]||[])[0];if(!n)return null;this._clearPlotSign(e),this.island.built.includes(e)||this.island.built.push(e),this.buildSpots[e]={x:n.x,z:n.z,state:"built"};const s=this.npcs.length;this._placeBuilt(t,n);for(const r of this.npcs.slice(s))this.world.pickables.push(r.mesh);return this.buildSpots[e]}_clearPlotSign(e){const t=this._plotSigns[e];if(t){for(const n of t)this.group.remove(n),n.traverse(s=>{s.geometry&&!s.geometry._cached&&s.geometry.dispose?.(),s.material?._owned&&(s.material.map?.dispose?.(),s.material.dispose?.())});delete this._plotSigns[e]}}_placeBuilt(e,t){const{x:n,z:s}=t,r=(a,o)=>{const l=this.cellAt(a,o);l&&(l.walk=!1)};if(e.id!=="bridge"&&(this.addGroundShadow(n,s,{radius:.85,opacity:.18}),this.decorateSpot(t,{role:e.id==="plaza"?"festival":"near-build",bloom:this.storyBloom||.75}),j1(this,e,t)),e.id==="lanterns")for(const a of[-1,0,1])this.cellAt(n+a,s)&&(this._prop("lantern",.55,n+a,s),r(n+a,s));else if(e.id==="fruitstand")this._prop("stall",1.15,n,s),this._prop("basket",.3,n,s,.62,.45),r(n,s);else if(e.id==="garden")this._prop("flowerPink",.34,n,s),this._prop("flowerYellow",.32,n,s,.55,.3),this._prop("flowerBlue",.32,n,s,-.5,.32),this._prop("bush",.42,n,s,.12,-.5),this._prop("sprout",.3,n,s,-.45,-.35),this._prop("flowerPink",.3,n,s,.5,-.28),r(n,s);else if(e.id==="stage")this._prop("gong",1,n,s),this._prop("lantern",.5,n,s,.85,.2),this._prop("lantern",.5,n,s,-.85,.2),r(n,s);else if(e.id==="bakery")this._prop("bakeryBuilding",2.2,n,s),this._prop("basket",.3,n,s,.78,.5),r(n,s);else if(e.id==="pizzeria")this._prop("pizzeriaBuilding",2.2,n,s),this._prop("pizzaPan",.3,n,s,.82,.5),this._prop("toppingCrate",.3,n,s,-.72,.42),r(n,s);else if(e.id==="plaza"){this._prop("portal",1.7,n,s),this._prop("lantern",.5,n,s,1,.4),this._prop("lantern",.5,n,s,-1,.4),this._prop("flowerYellow",.3,n,s,.9,-.5),this._prop("flowerPink",.3,n,s,-.9,-.5);const a=Mt("🎪",{scale:.8});a.position.copy(this.worldPos(n,s,2.3)),this.group.add(a),r(n,s)}e.npc&&this._placeNpc(e,t)}_placeNpc(e,t){const n=wi(e.npc.pet);let s=null;for(const[o,l]of[[0,1],[1,0],[-1,0],[0,-1]]){const c=this.cellAt(t.x+o,t.z+l);if(c&&c.walk&&Xi.has(c.ch)){s={x:t.x+o,z:t.z+l};break}}if(!s)return;const r=Jn(n.full,.62,null,"creature:"+n.id+":f");r.position.copy(this.worldPos(s.x,s.z)),this.group.add(r),this.addGroundShadow(s.x,s.z,{radius:.3}),this.cellAt(s.x,s.z).walk=!1;const a={id:e.id,face:e.npc.face,x:s.x,z:s.z,mesh:r};this.npcs.push(a),Y1(this,r,t,a,this.npcs.length)}_placeCrabKing(){const e=(this.markers.j||[])[0];if(!e)return;const t=this.cellAt(e.x-1,e.z);if(!t||!t.walk)return;const n=Jn(Ic.crabKing,.95,null,"char:crabKing");n.position.copy(this.worldPos(e.x-1,e.z)),this.group.add(n),t.walk=!1,this._bob(n,1.4,.03),this.npcs.push({id:"crabking",face:"🦀",x:e.x-1,z:e.z,mesh:n})}applyBloom(e){const t=new Pe(on.gray),n=new Pe,s=this.island.festival?1:Math.min(1,this.storyBloom||0);for(const r of this.floorList){let a=null,o=1e9;for(const[d,u]of Object.entries(this.portals)){const h=Math.abs(r.x-u.x)+Math.abs(r.z-u.z);h<o&&(o=h,a=d)}const l=a!==null&&o<=7?Math.min(1,(e?.[a]??0)*1.15):0,c=this.island.festival?1:Math.max(l,s);c<=0||(n.setHex(this._floorColors(r.c,r.x,r.z,{})),n.lerpColors(t,n,.25+.75*c),this.floor.setColorAt(r.c.instanceId,n))}this.floor.instanceColor&&(this.floor.instanceColor.needsUpdate=!0)}}const Di={fireflies:32,bees:8,motes:24,water:[8,5,3]},iE=[{id:"pink",W:"#ffb3c6"},{id:"blue",W:"#9bd6ff"},{id:"gold",W:"#ffd966"},{id:"lilac",W:"#c9a6ff"}],sE=[{id:"blue",B:"#7fb8e8",b:"#5e9ed0"},{id:"rose",B:"#f4b8c4",b:"#dd93a6"},{id:"gull",B:"#f4f3ee",b:"#cfd4dd"}];function Yd(i,e,t,n,s){const r=new en,a={castShadow:!1},o=Si(Ur(i,t),{cacheKey:`amb:${n}:a`,...a}),l=Si(Ur(e,t),{cacheKey:`amb:${n}:b`,...a}),c=s/Math.max(i.layers.length,e.layers.length);return o.scale.setScalar(c),l.scale.setScalar(c),l.visible=!1,r.add(o,l),r.userData.frames=[o,l],r}function go(i,e){i.userData.frames[0].visible=e===0,i.userData.frames[1].visible=e===1}class rE{constructor(e,t,n){this.place=e,this.rng=t,this.anchors=n;const s=t.pick(iE);this.mesh=Yd(Ys.butterflyOpen,Ys.butterflyClosed,{W:s.W},`butterfly:${s.id}`,.22),this.pos=this._spot(),this.mesh.position.copy(this.pos),e.group.add(this.mesh),this.flapT=t.float()*200,this.frame=0,this.bobT=t.float()*10,this.rest=0,this.target=this._spot()}_spot(){const e=this.rng.pick(this.anchors);return new P(e.x+(this.rng.float()-.5)*1.6,.35+this.rng.float()*.8,e.z+(this.rng.float()-.5)*1.6)}update(e){this.flapT+=e;const t=this.rest>0?600:110;if(this.flapT>=t&&(this.flapT=0,this.frame=1-this.frame,go(this.mesh,this.frame)),this.rest>0){this.rest-=e;return}this.bobT+=e/1e3;const n=this.mesh,s=this.target.x-n.position.x,r=this.target.y-n.position.y,a=this.target.z-n.position.z,o=Math.hypot(s,a);if(o<.12){this.rng.chance(.35)&&(this.rest=800+this.rng.float()*2200,n.position.y=this.target.y),this.target=this._spot();return}const l=(.55+this.rng.float()*.1)*(e/1e3);n.position.x+=s/o*l,n.position.z+=a/o*l,n.position.y+=r*Math.min(1,e/700)+Math.sin(this.bobT*7)*.004,n.rotation.y=Math.atan2(s,a)}}class aE{constructor(e,t,n,s){this.place=e,this.rng=t,this.openCells=n,this.playerPos=s;const r=t.pick(sE);this.mesh=Yd(Ys.birdSpread,Ys.birdFold,{B:r.B,b:r.b},`bird:${r.id}`,.3),e.group.add(this.mesh),this.flapT=0,this.frame=0,this.done=!1,this.groundT=0,this.hop=null;const a=n.length>0&&t.chance(.55);this._fly(this._edgePoint(),a?this._landingSpot():this._edgePoint(),a)}_edgePoint(){const{w:e,d:t}=this.place.size,n=this.rng.int(0,3),s=(this.rng.float()-.5)*e,r=(this.rng.float()-.5)*t,a=n===0?-e/2-3:n===1?e/2+3:s,o=n===2?-t/2-3:n===3?t/2+3:r;return new P(a,2.4+this.rng.float()*1.2,o)}_landingSpot(){const e=this.rng.pick(this.openCells);return this.place.worldPos(e.x,e.z,.04)}_fly(e,t,n){this.state="fly",this.landing=n,this.from=e,this.to=t,this.ctrl=new P((e.x+t.x)/2+(this.rng.float()-.5)*4,Math.max(e.y,t.y)+1.2+this.rng.float()*1,(e.z+t.z)/2+(this.rng.float()-.5)*4);const s=e.distanceTo(this.ctrl)+this.ctrl.distanceTo(t);this.flyMs=s/4.2*1e3,this.t=0,this.mesh.position.copy(e)}_takeOff(){this._fly(this.mesh.position.clone(),this._edgePoint(),!1)}update(e){if(this.done)return;const t=this.mesh;if(this.flapT+=e,this.state==="fly"){this.flapT>=110&&(this.flapT=0,this.frame=1-this.frame,go(t,this.frame)),this.t+=e/this.flyMs;const s=Math.min(1,this.t),r=this.from,a=this.ctrl,o=this.to,l=1-s,c=l*l*r.x+2*l*s*a.x+s*s*o.x,d=l*l*r.y+2*l*s*a.y+s*s*o.y,u=l*l*r.z+2*l*s*a.z+s*s*o.z;t.rotation.y=Math.atan2(c-t.position.x,u-t.position.z),t.position.set(c,d,u),s>=1&&(this.landing?(this.state="ground",this.groundT=3500+this.rng.float()*5500,go(t,1)):(this.done=!0,t.removeFromParent()));return}this.bobT=(this.bobT||0)+e/1e3;const n=this.playerPos?.();if(n&&Math.hypot(n.x-t.position.x,n.z-t.position.z)<2.1){this._takeOff();return}if(this.hop){this.hop.k+=e/240;const s=Math.min(1,this.hop.k);t.position.lerpVectors(this.hop.from,this.hop.to,s),t.position.y=this.hop.from.y+(this.hop.to.y-this.hop.from.y)*s+Math.sin(s*Math.PI)*.22,s>=1&&(this.hop=null);return}if(t.rotation.x=Math.max(0,Math.sin(this.bobT*3.2))*.35,this.groundT-=e,this.groundT<=0){t.rotation.x=0,this._takeOff();return}if(this.rng.chance(e/1400)){const s=Math.round(t.position.x+this.place.size.w/2-.5),r=Math.round(t.position.z+this.place.size.d/2-.5),a=this.rng.shuffle([[1,0],[-1,0],[0,1],[0,-1]]);for(const[o,l]of a){const c=this.place.cellAt(s+o,r+l);if(!(!c||!c.walk||!Xi.has(c.ch))){t.rotation.x=0,t.rotation.y=Math.atan2(o,l),this.hop={from:t.position.clone(),to:this.place.worldPos(s+o,r+l,.04),k:0};break}}}}}class oE{constructor(e,t,n){this.place=e;const s=new en,r=3+t.int(0,1);for(let l=0;l<r;l++){const c=new Ft(new yi(1.6+t.float()*1.6,.5+t.float()*.35,.9+t.float()*.7),n);c.position.set((l-(r-1)/2)*1.1,l%2*.3,t.float()*.8-.4),s.add(c)}s.scale.setScalar(.8+t.float()*.7);const{w:a,d:o}=e.size;s.position.set((t.float()-.5)*a,5.5+t.float()*2.2,(t.float()-.5)*o),e.group.add(s),this.mesh=s,this.v=.25+t.float()*.3}update(e){this.mesh.position.x+=this.v*e/1e3,this.mesh.position.x>this.place.size.w/2+6&&(this.mesh.position.x=-this.place.size.w/2-6)}}class lE{constructor(e,t,n,s,r){this.place=e,this.rng=t,this.playerPos=s;const a=wi(r);this.mesh=Jn(a.full,.5,null,"creature:"+a.id+":f"),this.mesh.traverse(l=>{l.isMesh&&(l.castShadow=!1)});const o=n.length?t.pick(n):{x:0,z:0};this.cell={x:o.x,z:o.z},this.mesh.position.copy(e.worldPos(o.x,o.z,.02)),e.group.add(this.mesh),this.baseScale=this.mesh.scale.x,this.t=t.float()*5,this.wait=900+t.float()*2600,this.hop=null}_playerCell(){const e=this.playerPos?.();return e?{x:Math.round(e.x+this.place.size.w/2-.5),z:Math.round(e.z+this.place.size.d/2-.5)}:null}update(e){const t=this.mesh;if(this.t+=e/1e3,this.hop){this.hop.k+=e/320;const r=Math.min(1,this.hop.k);t.position.lerpVectors(this.hop.from,this.hop.to,r),t.position.y=this.hop.from.y+Math.sin(r*Math.PI)*.16,r>=1&&(this.cell=this.hop.cell,this.hop=null);return}if(t.scale.set(this.baseScale,this.baseScale*(1+Math.sin(this.t*4)*.03),this.baseScale),this.wait-=e,this.wait>0)return;this.wait=900+this.rng.float()*2600;const n=this._playerCell(),s=this.rng.shuffle([[1,0],[-1,0],[0,1],[0,-1]]);for(const[r,a]of s){const o=this.cell.x+r,l=this.cell.z+a;if(n&&n.x===o&&n.z===l)continue;const c=this.place.cellAt(o,l);if(!(!c||!c.walk||c.h!==0||!Xi.has(c.ch))){t.rotation.y=Math.atan2(r,a),this.hop={from:t.position.clone(),to:this.place.worldPos(o,l,.02),k:0,cell:{x:o,z:l}};break}}}}class qh{constructor(e,t,n,{color:s=16774072,size:r=.08,rise:a=1.3}={}){this.rng=t,this.base=n,this.rise=a,this.size=r,this.sprite=jc(s,r),this.phase=t.float(),this.speed=.05+t.float()*.06,this.sway=.4+t.float()*.6,this.ox=(t.float()-.5)*.5,this.oz=(t.float()-.5)*.5,this.t=t.float()*10,e.group.add(this.sprite)}update(e){this.t+=e/1e3;const t=(this.t*this.speed+this.phase)%1;this.sprite.position.set(this.base.x+this.ox+Math.sin(this.t*this.sway+this.phase*7)*.18,this.base.y+.1+t*this.rise,this.base.z+this.oz),this.sprite.material.opacity=Math.sin(t*Math.PI)*(.32+.4*Math.sin(this.t*4+this.phase*9)**2);const n=this.size*(.85+.25*Math.sin(this.t*3+this.phase*5));this.sprite.scale.set(n,n,1)}}class cE{constructor(e,t,n,s){this.place=e,this.rng=t,this.anchors=n,this.playerPos=s,this.mesh=Yd(Ys.butterflyOpen,Ys.butterflyClosed,{W:"#ffd45e"},"bee:gold",.16),this.mesh.position.copy(this._spot()),e.group.add(this.mesh),this.flapT=0,this.frame=0,this.t=t.float()*5,this.rest=0,this.target=this._spot()}_spot(){const e=this.rng.pick(this.anchors);return new P(e.x+(this.rng.float()-.5)*1.3,.4+this.rng.float()*.45,e.z+(this.rng.float()-.5)*1.3)}update(e){if(this.flapT+=e,this.flapT>=70&&(this.flapT=0,this.frame=1-this.frame,go(this.mesh,this.frame)),this.rest>0){this.rest-=e;return}const t=this.mesh;let n=this.target.x-t.position.x,s=this.target.z-t.position.z;const r=this.target.y-t.position.y,a=this.playerPos?.();if(a){const c=t.position.x-a.x,d=t.position.z-a.z,u=Math.hypot(c,d);u<1.6&&u>.001&&(n+=c/u*.8,s+=d/u*.8)}const o=Math.hypot(n,s);if(o<.14){this.rng.chance(.3)&&(this.rest=500+this.rng.float()*1400),this.target=this._spot();return}const l=(.7+this.rng.float()*.15)*(e/1e3);t.position.x+=n/o*l,t.position.z+=s/o*l,t.position.y+=r*Math.min(1,e/600),t.rotation.y=Math.atan2(n,s)}}function nd(i={}){const{mode:e="hub",avgPct:t=0,garden:n=!1,portalStages:s=0,festival:r=!1,tier:a="high",ambientScale:o=1,reducedMotion:l=!1}=i,c=(_,m)=>Math.max(0,Math.min(m,Math.round(_))),d=Math.max(0,o),u=a==="low"||l,h=[0,0,0],f=Di.water;if(e==="chamber")return{fireflies:c(2*d,Di.fireflies),bees:a==="low"||l?0:c(2*d,Di.bees),motes:c(2*d,Di.motes),water:u?h:[c(1*d,f[0]),c(1*d,f[1]),a!=="high"?0:c(.6*d,f[2])]};let g=a==="low"?0:c((n?6:2)*d,Di.bees);return l&&(g=Math.min(g,2)),{fireflies:c((s*2+(r?10:0))*d,Di.fireflies),bees:g,motes:c((t*10+(r?6:0))*d,Di.motes),water:u?h:[c((4+t*4+(r?2:0))*d,f[0]),c((2+t*2)*d,f[1]),c((1+(t>=.5?1:0)+(r?1:0))*d,f[2])]}}class id{constructor(e,t,{butterflies:n=0,birds:s=0,clouds:r=0,pets:a=[],petCount:o=0,playerPos:l=null,fireflies:c=0,bees:d=0,motes:u=0,glowAnchors:h=null,water:f=null}={}){if(this.place=e,this.rng=new vn(t.int(1,1e9)),this.playerPos=l,this.clouds=[],r>0){const A=new Kr({color:16777215,transparent:!0,opacity:.85});A._owned=!0;for(let k=0;k<r;k++)this.clouds.push(new oE(e,this.rng,A))}this.openCells=[];for(let A=1;A<e.size.d-1;A++)for(let k=1;k<e.size.w-1;k++){const R=e.cellAt(k,A);R&&R.walk&&R.h===0&&Xi.has(R.ch)&&this.openCells.push({x:k,z:A})}const _=((e.markers.d||[]).length?e.markers.d:this.openCells).map(A=>e.worldPos(A.x,A.z));if(this.butterflies=[],_.length)for(let A=0;A<n;A++)this.butterflies.push(new rE(e,this.rng,_));this.birds=[],this.birdTimers=[];for(let A=0;A<s;A++)this.birds.push(null),this.birdTimers.push(A===0?600:this.rng.float()*9e3);this.wanderers=[];const m=Math.min(o,4,this.openCells.length);for(let A=0;A<m&&a.length;A++)this.wanderers.push(new lE(e,this.rng,this.openCells,this.playerPos,a[A%a.length]));const p=h&&h.length?h:_.length?_:this.openCells.map(A=>e.worldPos(A.x,A.z));this.fireflies=[];for(let A=0;A<c&&p.length;A++)this.fireflies.push(new qh(e,this.rng,this.rng.pick(p),{color:16774072,size:.09,rise:1.5}));this.motes=[];for(let A=0;A<u&&p.length;A++)this.motes.push(new qh(e,this.rng,this.rng.pick(p),{color:16775128,size:.05,rise:1}));this.bees=[];for(let A=0;A<d&&_.length;A++)this.bees.push(new cE(e,this.rng,_,this.playerPos));const[w=0,E=0,x=0]=f||[];this.waterMoments=w||E||x?{r:w,b:E,f:x,rt:0,bt:350,ft:700}:null}_waterAnchor(){const e=this.place.water?.lifeAnchors||[];return e.length?this.rng.pick(e):null}_updateWater(e){const t=this.waterMoments;if(!t)return;const n=this._waterAnchor();n&&(t.rt-=e,t.bt-=e,t.ft-=e,t.r&&t.rt<=0&&(this.place.water?.spawnShoreRipple?.(n),t.rt=(1900+this.rng.float()*3600)/Math.max(1,t.r)),t.b&&t.bt<=0&&(this.place.water?.spawnBubble?.({...n,x:n.x+(this.rng.float()-.5)*.22,z:n.z+(this.rng.float()-.5)*.22}),t.bt=(3200+this.rng.float()*5400)/Math.max(1,t.b)),t.f&&t.ft<=0&&(this.place.water?.spawnFishShadow?.(n,{side:this.rng.chance(.5)?1:-1,speed:.32+this.rng.float()*.24}),t.ft=(6200+this.rng.float()*9e3)/Math.max(1,t.f)))}update(e){for(const t of this.clouds)t.update(e);for(const t of this.butterflies)t.update(e);for(const t of this.wanderers)t.update(e);for(const t of this.fireflies)t.update(e);for(const t of this.motes)t.update(e);for(const t of this.bees)t.update(e);this._updateWater(e);for(let t=0;t<this.birds.length;t++){const n=this.birds[t];if(n&&!n.done){n.update(e);continue}this.birdTimers[t]-=e,this.birdTimers[t]<=0&&(this.birds[t]=new aE(this.place,this.rng,this.openCells,this.playerPos),this.birdTimers[t]=5e3+this.rng.float()*14e3)}}}class dE{constructor(e){this.game=e}buildAttractIsland(){const e=this.game,t={tide:1,garden:1,stump:1,vines:1};e.place=new jh(e.world,t,{built:es.map(g=>g.id),unlocked:[],crabKing:!0,festival:!0},{}),e.particles=new Vr(e.place.group),e.place.fx=e.particles;const n=Qr(),s=e.avatar.makeAvatarMesh(n?.avatar);e.player=new Jp(s),e.player.headH=.95,e.player.sfx=!1;const r=(e.place.markers.P||[{x:11,z:11}])[0];e.player.setPlace(e.place,r.x,r.z),e.player.onArrive=(g,_)=>e.pet?.notePlayerAt(g,_),e.place.playerAt=()=>e.player?{x:e.player.x,z:e.player.z}:null;const a=n?n.avatar.pet:"bunny",o=a?wi(a):null;if(o&&o.id===a){e.pet=new em(Jn(o.small,.45,null,"creature:"+o.id+":s"));const g=e.avatar.findFreeNear(r.x,r.z)||r;e.pet.setPlace(e.place,g.x,g.z)}e.world.defaultZoom=1,e.world.follow(e.player.mesh,10.5);const l=Object.values(e.place.portals||{}).map(g=>e.place.worldPos(g.x,g.z,.5)),c=nd({mode:"hub",avgPct:1,garden:!0,portalStages:16,festival:!0,tier:Ie.tier,ambientScale:Ie.ambientScale,reducedMotion:lt()});e.place.addEntity(new id(e.place,e.rng,{butterflies:7,birds:3,clouds:4,pets:["bunny","duckling","redpanda","kitten"],petCount:3,playerPos:()=>e.player?.mesh.position,...c,glowAnchors:l}));const d={tide:["8 + 7 = 15","#3f8fb0"],garden:["3 × 4 = 12","#58b368"],stump:["12 ÷ 3 = 4","#b46a3c"],vines:["¾","#9b6bd6"]},u=[];for(const[g,_]of Object.entries(e.place.portals))u.push({x:_.x,z:_.z,label:d[g]});const h=(e.place.markers.N||[])[0];h&&u.push({x:h.x,z:h.z});for(const g of Object.values(e.place.buildSpots||{})){const _=e.avatar.findFreeNear(g.x,g.z);_&&u.push({x:_.x,z:_.z})}const f={wait:1400,target:null,last:null};e.place.addEntity({update:g=>{if(e.mode!=="title"||!e.player||e.player.hopping||e.player.queue.length||(f.wait-=g,f.wait>0))return;if(f.target){const m=e.player.mesh.position.clone().add(new P(0,.9,0));e.particles?.emit(m,14,{speed:1.4,up:2.2,life:750,spread:.3}),f.target.label&&Vd(e.world,m,f.target.label[0],f.target.label[1]),e.pet?.celebrate(),f.target=null,f.wait=1600+e.rng.float()*2400;return}const _=e.rng.pick(u.filter(m=>m!==f.last))||u[0];_&&e.player.pathTo(_.x,_.z)?(f.target=_,f.last=_,f.wait=350):f.wait=900}})}startHub(){const e=this.game;e.mode="hub",e.flowToken++,e.isEcho=!1,e.duel=null,gn(),this.buildHub(),Un(!0),fo(),Er(null),e.talkBtn=null,po(null),Xs(!1),e.refreshHudCounts(),$.music("island"),$.ambience("hub"),$.attachEvents(e.place),e.input.maybeGestureHint();const t=Xw(e.profile);t.kind==="extended"?(Kt(M("hub.streak_extended",{n:e.profile.streak.count})),$.sfx("streak")):t.kind==="frozen"&&(Kt(M("hub.streak_frozen",{n:e.profile.streak.count})),$.sfx("streak",{pitch:.86})),t.gift&&St(800,()=>{const l=6+Math.min(14,e.profile.streak.count*2);Kt(`🎁 ${M("hub.daily_gift")} +${l} 🍌`),Bs(e.profile,l),Sr(e.profile,2),e.refreshHudCounts(),$.sfx("chest")});const n=[];t.kind==="reset"&&e.profile.stats.days>1&&n.push(M("hub.streak_reset")),e.hubWelcomed||(e.hubWelcomed=!0,n.push(M("hub.welcome",{name:J(e.profile.name)}))),n.push(this.mimiLine()),Rn(n);const s=ax(e.profile,mp());if(s.length){for(const l of s)l.kind==="bananas"?Bs(e.profile,l.n):l.kind==="egg"&&Sr(e.profile,l.n);qe(),e.refreshHudCounts(),s.forEach((l,c)=>St(1700+c*1100,()=>{Kt(l.kind==="bananas"?M("island.daily_fruit",{n:l.n}):M("island.daily_bread")),$.sfx("coin")}))}const{buildReport:r,finaleReady:a}=this.islandGatingInputs(),o=nx(e.profile,r,{finaleReady:a});if(o.length){ix(e.profile,o.map(c=>c.id)),qe();const l=e.flowToken;St(2600,()=>{if(l===e.flowToken){$.sfx("sparkle");for(const c of o)Kt(M("island.new_blueprint",{name:M("build."+c.id)}),"gem");Rn(`<b>Mimi:</b> ${M("island.mimi_worktable")}`)}})}}islandGatingInputs(){const e=this.game,t=wr(e.profile.math),n=Vi(e.profile.curriculum),s=Pc(e.profile);return{report:t,buildReport:Sx(t,n),finaleReady:Mx(s),story:s}}buildHub(){const e=this.game;e.clearPlace();const{report:t,buildReport:n,finaleReady:s,story:r}=this.islandGatingInputs(),a={};for(const[w,E]of Object.entries(t.worlds))a[w]=E.pct;const o=$a(e.profile,n,{finaleReady:s}),l=e.profile.flags.portalStages||(e.profile.flags.portalStages={}),c=Lr(r).wholeness;e.place=new jh(e.world,a,{built:o.filter(w=>w.state==="built").map(w=>w.id),unlocked:o.filter(w=>w.state==="unlocked").map(w=>w.id),crabKing:!!e.profile.flags.festivalDone,festival:!!e.profile.flags.festivalDone},l,c),e.particles=new Vr(e.place.group),e.place.fx=e.particles,this.celebrateGateGrowth(a,l),e.avatar.spawnAvatar();const d=(e.place.markers.P||[{x:11,z:11}])[0];this.placePlayerAtHubReturn()||(e.player.setPlace(e.place,d.x,d.z),e.avatar.spawnPet(d)),e.world.defaultZoom=e.input.sceneZoom("hub"),e.world.follow(e.player.mesh,13,{x:e.place.size.w*.5,z:e.place.size.d*.5}),e.world.cameraShot({fromSpanMul:1.22,duration:950}),e.player.onArrive=(w,E)=>this.hubArrive(w,E),e.player.onBump=(w,E)=>this.hubBump(w,E),e.place.playerAt=()=>e.player?{x:e.player.x,z:e.player.z}:null;const u=o.filter(w=>w.state==="built").map(w=>w.id),h=(a.tide+a.garden+a.stump+a.vines)/4||0,f=e.profile.avatar||{},g=["bunny","duckling","kitten","redpanda","turtle","owl"].filter(w=>w!==f.creature&&w!==f.pet),_=["tide","garden","stump","vines"].reduce((w,E)=>w+dh(a[E]??0),0),m=Object.values(e.place.portals||{}).map(w=>e.place.worldPos(w.x,w.z,.5)),p=nd({mode:"hub",avgPct:h,garden:u.includes("garden"),portalStages:_,festival:!!e.profile.flags.festivalDone,tier:Ie.tier,ambientScale:Ie.ambientScale,reducedMotion:lt()});e.place.addEntity(new id(e.place,e.rng,{butterflies:2+Math.round(h*4)+(u.includes("garden")?2:0),birds:1+(u.length>=3?1:0)+(e.profile.flags.festivalDone?1:0),clouds:2,pets:g,petCount:1+Math.round(h*2)+(u.length>=3?1:0),playerPos:()=>e.player?.mesh.position,...p,glowAnchors:m}))}celebrateGateGrowth(e,t){const n=this.game,s=n.flowToken;let r=0;for(const[a,o]of Object.entries(n.place.gates||{})){const l=dh(e[a]??0);l<=(t[a]??0)||(t[a]=l,St(1500+r++*1100,()=>{s===n.flowToken&&(o.celebrate(l),Kt(M("portal.stage"+l,{name:M("world."+a)}),"gem"))}))}r&&qe()}findHubReturnSpot(e){const t=this.game.place;if(!t||!e)return null;let n=null;if(e.type==="portal"?n=t.portals?.[e.worldId]??null:e.type==="build"&&(n=t.buildSpots?.[e.id]??null),!n)return null;const s=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]];for(const[r,a]of s){const o=n.x+r,l=n.z+a,c=t.cellAt(o,l);if(!(!c||!c.walk))return{x:o,z:l,face:{dx:n.x-o,dz:n.z-l}}}return null}placePlayerAtHubReturn(){const e=this.game,t=this.findHubReturnSpot(e.lastHubEntry);return t?(e.player.setPlace(e.place,t.x,t.z),e.player.face(t.face.dx,t.face.dz),e.avatar.spawnPet({x:t.x,z:t.z}),e.lastHubEntry=null,!0):!1}hubArrive(e,t){const n=this.game;if(n.mode!=="hub"||!n.place?.portals)return;n.pet?.notePlayerAt(e,t),tm(n.place,e,t,n.player?.mesh.position);for(const[r,a]of Object.entries(n.place.portals))if(a.x===e&&a.z===t){n.place.gates?.[r]?.enter?.(),n.enterWorldFromPortal(r);return}const s=(n.place.markers.N||[])[0];s&&s.x===e&&s.z===t&&this.openPets()}buildAt(e,t){for(const[n,s]of Object.entries(this.game.place?.buildSpots||{}))if(s.x===e&&s.z===t)return{id:n,...s};return null}hubTap(e,t){const n=this.game,s=n.place.markers,r=l=>(l||[]).some(c=>c.x===e&&c.z===t);if(r(s.T))return this.openGems(),!0;if(r(s.O))return this.openShop(),!0;if(r(s.N))return this.openPets(),!0;const a=this.hubNpcAt(e,t,!0);if(a)return this.hubTalk(a),!0;const o=this.buildAt(e,t);return o?(o.id==="bakery"||o.id==="pizzeria")&&qs(n.profile,o.id)?(Kt(M("business.open")),n.startBusinessFromHub(o.id),!0):o.id==="stage"&&qs(n.profile,"stage")?(n.startStageFromHub(),!0):o.state==="unlocked"?(this.openIsland(),!0):o.state==="built"?($.sfx(o.id==="stage"?"gong":"sparkle"),n.particles?.confetti(n.place.worldPos(e,t,.8),18),!0):!1:!1}hubNpcAt(e,t,n=!1){const s=this.game.place,r=s.mimiPos;if(r&&(r.x===e&&r.z===t||n&&s.mimiPrev?.x===e&&s.mimiPrev?.z===t))return{kind:"mimi",x:r.x,z:r.z};const a=(s.npcs||[]).find(o=>o.x===e&&o.z===t);return a?{kind:"npc",npc:a,x:a.x,z:a.z}:null}hubNpcNear(){const e=this.game;if(!e.player||!e.place?.mimiPos)return null;for(const[t,n]of[[0,1],[1,0],[-1,0],[0,-1]]){const s=this.hubNpcAt(e.player.x+t,e.player.z+n);if(s)return s}return null}hubTalk(e){const t=this.game;$.sfx("click");const n=e.x-t.player.x,s=e.z-t.player.z;if(t.player.face(n,s),e.kind==="mimi"){t.place.mimi&&(n||s)&&(t.place.mimi.rotation.y=Math.atan2(-n,-s));const r=this.mimiNext(),a=t.flowToken;Rn(r.html,{onDone:r.key==="mimi.build_ready"?()=>{a===t.flowToken&&t.mode==="hub"&&this.openIsland()}:null})}else{const r=e.npc;(n||s)&&(r.mesh.rotation.y=Math.atan2(-n,-s));const a=M(`npc.${r.id}.${1+Math.floor(Math.random()*2)}`);Rn(`<b>${M("npc."+r.id)}:</b> ${a}`,{face:r.face})}}hubAction(){const e=this.hubNpcNear();e&&this.hubTalk(e)}hubBump(e,t){const n=this.game;if(n.mode!=="hub"||!n.place?.mimiPos)return;const s=this.hubNpcAt(e,t);s&&(performance.now()<n.talkCooldown||(n.talkCooldown=performance.now()+900,this.hubTalk(s)))}_mimiPick(e){const t=this.game,{buildReport:n,finaleReady:s}=this.islandGatingInputs(),r=GM(t.profile,n,$a(t.profile,n,{finaleReady:s})),a=r[t.mimiChat%r.length];e&&t.mimiChat++,t.profile.flags.mimiMet||(t.profile.flags.mimiMet=!0,qe());const o={...a.vars||{}};return a.buildId&&(o.name=M("build."+a.buildId)),a.worldId&&(o.world=M("world."+a.worldId)),{key:a.key,html:`<b>Mimi:</b> ${M(a.key,o)}`}}mimiNext(){return this._mimiPick(!0)}mimiLine(){return this._mimiPick(!1).html}openGems(){$.sfx("click"),L1({report:wr(this.game.profile.math),onClose:()=>gn()})}openShop(){const e=this.game;$.sfx("click"),Qc({onClose:()=>{gn(),e.avatar.refreshAvatar(),e.refreshHudCounts()},onChanged:()=>e.refreshHudCounts()})}openPets(){const e=this.game;$.sfx("click"),Jc({onClose:()=>{gn(),e.avatar.respawnPet()},onChanged:()=>{},onHatch:()=>e.afterResult(()=>{Jc({onClose:()=>{gn(),e.avatar.respawnPet()},onChanged:()=>{},onHatch:()=>{}})})})}openIsland(){const e=this.game;$.sfx("click");const{buildReport:t,finaleReady:n,story:s}=this.islandGatingInputs();R1({profile:e.profile,status:$a(e.profile,t,{finaleReady:n}),bloom:Lr(s),onClose:()=>gn(),onFund:r=>this.fundBuild(r),onAltar:()=>o1({story:s,onClose:()=>this.openIsland()})})}fundBuild(e){const t=this.game,n=tx(e);if(!n)return;const s=()=>{const{buildReport:r,finaleReady:a}=this.islandGatingInputs();if(!rx(t.profile,n,r,{finaleReady:a})){$.sfx("boop");return}Wn(),gn(),this.celebrateBuild(n)};n.finale&&!t.profile.flags.festivalDone?w1(()=>{Kt(M("island.crab_pays",{n:n.contribution})),s()}):s()}celebrateBuild(e){const t=this.game;if(e.finale){t.profile.flags.festivalDone=!0;const r=Pc(t.profile),a=wr(t.profile.math);Zf(r,a,Vi(t.profile.curriculum)),Lc(r,1),Lc(r,5),r.crabKingReconciled=!0,kp(t.profile),qe()}t.place.addBuild(e.id)||this.buildHub(),Un(!0),t.refreshHudCounts();const n=t.place.buildSpots[e.id],s=t.flowToken;if(n){const r=t.avatar.findFreeNear(n.x,n.z);r&&(t.player.setPlace(t.place,r.x,r.z),t.avatar.respawnPet());const a=t.place.worldPos(n.x,n.z,.9);t.place.visualEvent?.("build-complete",{id:e.id,spot:n,position:a}),$.sfx("bloom"),St(250,()=>t.particles?.confetti(a,44)),St(850,()=>t.particles?.confetti(a.clone().add(new P(.4,.3,-.3)),28))}e.finale?($.music("celebrate"),St(1200,()=>{s===t.flowToken&&Rn(M("finale.festival",{name:J(t.profile.name)}),{face:"🦀"})}),St(1700,()=>{s!==t.flowToken||!n||t.particles?.confetti(t.place.worldPos(n.x,n.z,1.5),60)}),St(4200,()=>{s===t.flowToken&&$.music("island")})):St(1300,()=>{if(s!==t.flowToken)return;const r=[`<b>Mimi:</b> ${M("island.built_say")}`];e.npc&&r.push({html:`<b>${M("npc."+e.id)}:</b> ${M(`npc.${e.id}.hello`)}`,face:e.npc.face}),Rn(r)})}}const im=16767334,sm=16774079,Kh={ready:16767334,correct:11464882,low:10213119,high:13215487,notYet:16771496};function ea(i){return(js[i]||js.hub).accent}function rm(i){return i?.gfx||Ie}function Xd(i){return typeof i?.reducedMotion=="boolean"?i.reducedMotion:rm(i)?.reducedMotion?!0:lt()}function am(i){const e=rm(i);return!!e?.glowSprites&&e.tier!=="low"}function ko(i){return i?.currentWorld||i?.place?.theme||i?.worldId||"hub"}function ta(i){return i?typeof i.clone=="function"?i.clone():new P(i.x||0,i.y||0,i.z||0):null}function uE(i){if(!i)return;i.geometry?.dispose?.();const e=i.material?.map;e&&!e._cached&&e.dispose?.(),i.material?.dispose?.()}function Zd(i,e){return e&&Array.isArray(i?.fxHandles)&&i.fxHandles.push(e),e}function Yh(i,e,t){return t?Xd(i)||e<=0?t():Zd(i,St(e,t)):null}function Xh(i,e){e&&(Array.isArray(e)?i.push(...e.filter(Boolean)):i.push(e))}function Po(i,e,{size:t=1.2,peak:n=.35,ms:s=620,delayMs:r=0,stretchX:a=1,stretchZ:o=1}={}){const l=i?.place,c=ta(e);if(!l?.group||!c||!am(i))return null;const d=Ap(ea(ko(i)),t,0);d.rotation.x=-Math.PI/2,d.scale.x*=a,d.scale.y*=o,d.position.set(c.x,c.y+.045,c.z),l.group.add(d);const u=Xd(i)?Math.min(s,220):s,h=Qe({ms:u,delay:r,ease:nt.outQuad,onUpdate:(f,g)=>{d.material.opacity=Math.sin(Math.min(1,g)*Math.PI)*n},onDone:()=>{l.group.remove(d),uE(d)}});return Zd(i,h)}function Lo(i,e,t,n={}){const s=ta(e);!s||!i?.particles||!am(i)||i.particles.emit?.(s,t,n)}function om(i,e,{amount:t=.12,ms:n=180}={}){if(!e||Xd(i))return null;const s=e.scale.clone();return Zd(i,Qe({ms:n,ease:nt.outQuad,onUpdate:(r,a)=>{const o=Math.sin(a*Math.PI)*t;e.scale.set(s.x*(1+o),s.y*(1+o*.65),s.z*(1+o))},onDone:()=>e.scale.copy(s)}))}function lm(i,e,t){const n=[];return Xh(n,Yh(i,0,e)),Xh(n,Yh(i,120,t)),n.filter(Boolean)}function hE(i,e,t){if(!i?.group||!Ie.glowSprites||Ie.tier==="low"||!e)return;const n=Ap(ea(t),2.2,0);n.rotation.x=-Math.PI/2,n.position.set(e.x,(e.y??0)+.06,e.z),i.group.add(n);const s=lt()?.35:.5;Qe({ms:lt()?240:700,ease:nt.outQuad,onUpdate:(r,a)=>{n.material.opacity=Math.sin(Math.min(1,a)*Math.PI)*s},onDone:()=>{i.group.remove(n),n.geometry.dispose?.(),n.material.map?._cached||n.material.map?.dispose?.(),n.material.dispose?.()}})}function fE(i,{altarPos:e,stoneMesh:t}={}){const n=ta(e);return n?lm(i,()=>{om(i,t,{amount:.08,ms:160}),Po(i,n,{size:2.2,peak:.45,ms:700})},()=>{Lo(i,n.clone().add(new P(0,.28,0)),12,{colors:[ea(ko(i)),im,sm],speed:1,up:1.4,life:720,spread:.18})}):[]}function pE(i,{rect:e,row:t=0,col:n=0,count:s=0}={}){if(!e||n!==0)return[];const r=e.x1-e.x0+1,a=e.x0+(r-1)/2,o=e.z0+t,l=i.place?.worldPos?.(a,o,.08);return lm(i,()=>{Po(i,l,{size:.9,peak:.28,ms:460,stretchX:Math.max(1,r*.62),stretchZ:.42})},()=>{s&&Lo(i,ta(l)?.add(new P(0,.22,0)),4,{colors:[ea(ko(i)),sm],speed:.45,up:.45,life:420,spread:.2})})}function Zh(i,{x:e,z:t,kind:n="ready"}={}){const s=i?.place?.worldPos?.(e,t,n==="correct"?.2:.12);if(!s)return[];const r=Kh[n]||Kh.ready,a=[];return a.push(Po(i,s,{size:n==="correct"?1.3:.9,peak:n==="correct"?.38:.25,ms:n==="correct"?620:420})),Lo(i,s.clone().add(new P(0,.22,0)),n==="correct"?14:6,{colors:[r,16777215],speed:n==="correct"?.8:.45,up:n==="correct"?1.1:.55,life:n==="correct"?680:420,spread:.16}),a.filter(Boolean)}function Qh(i,{basket:e,fair:t=!1}={}){if(!e?.mesh)return[];const n=[];n.push(om(i,e.mesh,{amount:t?.1:.16,ms:t?260:220}));const s=i?.place?.worldPos?.(e.x,e.z,t?.16:.08);return t&&(n.push(Po(i,s,{size:1.15,peak:.32,ms:620})),Lo(i,ta(s)?.add(new P(0,.28,0)),7,{colors:[ea(ko(i)),im,16777215],speed:.6,up:.75,life:560,spread:.22})),n.filter(Boolean)}function mE(i,e){if(Ie.tier==="low"||!Ie.ambientScale||lt()||!i?.size)return;const t=new vn((3707^(e?e.length:1)*2654435761)>>>0),n=e==="vines"?13215487:e==="tide"?10213119:e==="stump"?16771496:16774072,s=Math.max(2,Math.round(4*Ie.ambientScale)),r=FM({count:s,color:n,size:.06,spread:Math.max(i.size.w,i.size.d)*.5,rise:1,rand:()=>t.float()});r.group.position.set(0,.3,0),i.group.add(r.group);let a=0;i.addEntity({update:o=>{a+=o/1e3,r.update(a)}})}class gE{constructor(e){this.place=e,this.painted=[],this.labels=[],this.pending=[]}_later(e,t){this.pending.push(St(e,t))}clear(){for(const e of this.pending)e.cancel();this.pending=[];for(const e of this.painted)this.place.resetCellTint(e.x,e.z);for(const e of this.labels)this.place.group.remove(e);this.painted=[],this.labels=[]}_free(e,t){const n=this.place.cellAt(e,t);return n&&n.walk&&n.h===0&&!If.has(n.ch)}_findRect(e,t){const{w:n,d:s}=this.place.size,r=Math.floor(n/2),a=Math.floor(s/2);for(let o=0;o<Math.max(n,s);o++)for(let l=Math.max(1,a-o);l<=Math.min(s-t-1,a+o);l++)for(let c=Math.max(1,r-o);c<=Math.min(n-e-1,r+o);c++){let d=!0;for(let u=l;u<l+t&&d;u++)for(let h=c;h<c+e&&d;h++)this._free(h,u)||(d=!1);if(d)return{x0:c,z0:l}}return null}addLabel(e,t,n,s="#2c6e49",r=.55){const a=Mt(n,{bg:"#ffffffee",color:s,scale:.55}),o=this.place.worldPos(e,t,r);a.position.copy(o),this.place.group.add(a),this.labels.push(a)}show(e,{skipCounts:t=!0}={}){if(this.clear(),!e||e.kind==="none")return!1;if(e.kind==="array"){let{rows:n,cols:s}=e.params,r=this._findRect(s,n);if(!r){if(r=this._findRect(n,s),!r)return!1;const o=n;n=s,s=o}let a=0;for(let o=0;o<n;o++){for(let l=0;l<s;l++){const c=r.x0+l,d=r.z0+o;this.painted.push({x:c,z:d}),this._later(a*28,()=>{this.place.tintCell(c,d,o%2?11464882:9429914),l===s-1&&$.sfx("plant",{pitch:1+o*.06})}),a++}if(t){const l=(o+1)*s;this._later(o*s*28+150,()=>this.addLabel(r.x0+s,r.z0+o,String(l)))}}return!0}if(e.kind==="baskets"){const{baskets:n,quotient:s,remainder:r}=e.params,a=this._findRect(n*2-1,2);if(!a)return!1;for(let o=0;o<n;o++){const l=a.x0+o*2,c=a.z0;this.painted.push({x:l,z:c}),this._later(o*90,()=>{this.place.tintCell(l,c,16242848),this.addLabel(l,c,String(s),"#b06a2c"),$.sfx("coin",{pitch:1+o*.05})})}if(r>0){const o=a.x0+Math.floor(n),l=a.z0+1;this.painted.push({x:o,z:l}),this._later(n*90+120,()=>{this.place.tintCell(o,l,16234703),this.addLabel(o,l,"+"+r,"#c2497a")})}return!0}if(e.kind==="numberline"){const{n:s,d:r}=e.params,a=this._findRect(11,1);if(!a)return!1;for(let l=0;l<11;l++){const c=a.x0+l,d=a.z0;this.painted.push({x:c,z:d}),this._later(l*35,()=>this.place.tintCell(c,d,13625087))}this.addLabel(a.x0,a.z0,"0","#4a6a8a"),this.addLabel(a.x0+11-1,a.z0,"1","#4a6a8a");const o=a.x0+Math.round(s/r*10);return this._later(535,()=>{this.place.tintCell(o,a.z0,16767334),this.addLabel(o,a.z0,`${s}/${r}`,"#b06a2c",.8),$.sfx("sparkle")}),!0}if(e.kind==="strip"){const{a:n,b:s,op:r}=e.params,a=this._findRect(Math.min(n,12),2);if(!a)return!1;const o=(l,c,d,u=0)=>{for(let h=0;h<l&&h+u<12;h++){const f=a.x0+u+h;this.painted.push({x:f,z:c}),this._later(h*30,()=>this.place.tintCell(f,c,d))}};return o(Math.min(n,12),a.z0,10213119),this.addLabel(a.x0,(a.z0-1>=0,a.z0),String(n),"#4a6a8a"),r==="+"?(o(Math.min(s,12),a.z0+1,11464882),this.addLabel(a.x0,a.z0+1,"+"+s,"#2c6e49")):(o(Math.min(s,12),a.z0+1,16761523),this.addLabel(a.x0,a.z0+1,"−"+s,"#c2497a")),!0}return!1}}class Fo{constructor(e){this.ctx=e,this.model=new gE(e.place),this.done=!1}begin(){}onCellTap(){return!1}onArrive(){}onBump(){}onAction(){}onKey(){return!1}showModel(){return this.model.show(this.ctx.problem.model)}refreshLanguage(){typeof this._panel=="function"&&this.ctx.hud.setVerbPanel(this._panel())}update(){}destroy(){this.model.clear()}}class _E extends Fo{begin(){const{place:e,problem:t,rng:n}=this.ctx;this.stones=[],this.pots=[];const s=n.shuffle(e.markers.s||[]),r=n.shuffle(e.markers.p||[]),a=[...s.map(d=>({...d,pot:!1})),...r.map(d=>({...d,pot:!0}))],o=n.shuffle(t.choices),l=o.findIndex(d=>d.tag==="correct");o.unshift(o.splice(l,1)[0]);const c=o.slice(0,a.length);c.forEach((d,u)=>{const h=a[u];h.pot?this.pots.push(new Ih(e,h.x,h.z,{kind:"stone",choice:d})):this.stones.push(new _r(e,h.x,h.z,d))});for(let d=c.length;d<a.length;d++){const u=a[d];if(!u.pot)continue;const h=n.chance(.4)?{kind:"berry"}:{kind:"bananas",n:n.int(1,3)};this.pots.push(new Ih(e,u.x,u.z,h))}this.ctx.hud.setAction(null)}_stoneAt(e,t){return this.stones.find(n=>!n.taken&&n.x===e&&n.z===t)}_potAt(e,t){return this.pots.find(n=>!n.smashed&&n.x===e&&n.z===t)}onArrive(e,t){const{player:n,place:s,particles:r}=this.ctx,a=this._potAt(e,t);if(a){this.pendingDeliver=null;const l=a.smash(r);l?.kind==="stone"?this.stones.push(new _r(s,e,t,l.choice)):l?.kind==="bananas"?this.ctx.onTreat?.("bananas",l.n,s.worldPos(e,t,.4)):l?.kind==="berry"&&this.ctx.onTreat?.("berry",1,s.worldPos(e,t,.4));return}const o=this._stoneAt(e,t);if(o){this.pendingDeliver=null,$.sfx("pick");const l=o.pickUpMesh();if(n.carrying){const{mesh:c,data:d}=n.dropCarry();c.removeFromParent(),this.stones.push(new _r(s,e,t,d))}n.carry(l,o.choice),this.ctx.onCarry?.(!0),this.ctx.hud.setAction("⬇️");return}if(this.pendingDeliver&&n.queue.length===0){const l=this.pendingDeliver;this.pendingDeliver=null;const c=(s.markers.A||[])[0];c&&l.x===e&&l.z===t&&n.carrying&&this._offer(c)}}onBump(e,t){const{player:n,place:s,particles:r}=this.ctx,a=(s.markers.A||[])[0];if(!a||e!==a.x||t!==a.z)return;if(n.carrying){this._offer(a);return}if(this.done||this.fxStone)return;const o=performance.now();o<(this.nudgeT||0)||(this.nudgeT=o+2600,r.emit(s.worldPos(a.x,a.z,1),8,{colors:[16767334,16774079],speed:.6,up:.6,life:600,spread:.25}),this.ctx.hud.say(M("play.altar_wants"),{transient:!0,ms:2400,face:"✨"}))}onAction(){const{player:e,place:t}=this.ctx;if(!e.carrying)return;const{x:n,z:s}=e;if(this._stoneAt(n,s)||this._potAt(n,s))return;this.pendingDeliver=null,$.sfx("place");const{mesh:r,data:a}=e.dropCarry();r.removeFromParent(),this.stones.push(new _r(t,n,s,a)),this.ctx.onCarry?.(!1),this.ctx.hud.setAction(null)}onCellTap(e,t){const{player:n,place:s}=this.ctx,r=(s.markers.A||[])[0];if(!r||e!==r.x||t!==r.z)return!1;if(!n.carrying)return this.onBump(e,t),!0;if(Math.abs(n.x-r.x)+Math.abs(n.z-r.z)===1)return this._offer(r),!0;const a=[[0,1],[1,0],[-1,0],[0,-1]].map(([o,l])=>({x:r.x+o,z:r.z+l})).filter(o=>s.cellAt(o.x,o.z)?.walk).sort((o,l)=>Math.abs(o.x-n.x)+Math.abs(o.z-n.z)-(Math.abs(l.x-n.x)+Math.abs(l.z-n.z)));for(const o of a)if(n.pathTo(o.x,o.z))return this.pendingDeliver=o,!0;return!0}_offer(e){const{player:t}=this.ctx;t.face(e.x-t.x,e.z-t.z);const{mesh:n,data:s}=t.dropCarry();this.ctx.onCarry?.(!1),this.ctx.hud.setAction(null),this._deliver(n,s,e)}_deliver(e,t,n){if(this.done)return;const{place:s,player:r}=this.ctx;e.position.copy(r.mesh.position).add(new P(0,r.headH+.18,0)),s.group.add(e),this.fxStone=e;const a=e.position.clone(),o=s.worldPos(n.x,n.z,.92);Qe({ms:360,ease:nt.linear,onUpdate:(l,c)=>{e.position.lerpVectors(a,o,c),e.position.y+=Math.sin(c*Math.PI)*.55},onDone:()=>{$.sfx("place"),this.dead||this._evaluate(t,e,n)}})}_freeNeighbor(e){const{place:t,player:n}=this.ctx;for(const[s,r]of[[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]){const a=e.x+s,o=e.z+r,l=t.cellAt(a,o);if(!(!l||!l.walk)&&!(this._stoneAt(a,o)||this._potAt(a,o))&&!(n.x===a&&n.z===o))return{x:a,z:o}}return null}_evaluate(e,t,n){if(this.done)return;const{problem:s,place:r}=this.ctx,a=r.worldPos(n.x,n.z,.92);String(e.value)===String(s.answer)?(this.done=!0,this.ctx.resolve(!0,{tag:"correct",value:e.value}),this._starBurst(t,a)):(this.ctx.resolve(!1,{tag:e.tag,value:e.value}),this._handBack(t,e,n,a))}_starBurst(e,t){const{place:n,particles:s}=this.ctx;fE(this.ctx,{altarPos:t,stoneMesh:e}),this.ctx.altar?.cheer(),s.confetti(t.clone().add(new P(0,.3,0)),34),Qe({ms:420,delay:140,ease:nt.inQuad,onUpdate:(c,d)=>{e.scale.setScalar(Math.max(.001,1-d)),e.position.y=t.y-d*.3},onDone:()=>{e.removeFromParent(),this.fxStone=null}});const r=Mt("⭐",{scale:1.5});r.position.copy(t),n.group.add(r),this.fxStar=r;const a=r.scale.clone();r.scale.copy(a).multiplyScalar(.3),$.sfx("bloom");const o=(Math.random()-.5)*.5;let l=-1;Qe({ms:950,ease:nt.outQuad,onUpdate:(c,d)=>{r.position.y=t.y+.15+d*1.7,r.position.x=t.x+Math.sin(d*Math.PI*2)*.12+o*d,r.material.rotation=Math.sin(d*Math.PI*3)*.45,r.scale.copy(a).multiplyScalar(.3+Math.min(1,d*2.5)*.7);const u=d*8|0;u!==l&&(l=u,s.emit(r.position.clone(),2,{colors:[16767334,16774079],speed:.4,up:.2,life:480,spread:.12}))},onDone:()=>{s.confetti(r.position.clone(),26),$.sfx("sparkle"),Qe({ms:280,ease:nt.outQuad,onUpdate:(c,d)=>{r.scale.copy(a).multiplyScalar(1+d*.9),r.material.opacity=1-d},onDone:()=>{r.removeFromParent(),this.fxStar=null}})}})}_handBack(e,t,n,s){const{place:r,particles:a}=this.ctx;this.ctx.altar?.shake(),a.poof(s.clone().add(new P(0,.35,0)),10,14273976);const o=Mt("🤔",{scale:.8});o.position.copy(s).add(new P(0,.85,0)),r.group.add(o),this.fxThink=o,Qe({ms:1150,ease:nt.outQuad,onUpdate:(u,h)=>{o.position.y=s.y+.85+h*.5,o.material.opacity=h<.6?1:1-(h-.6)/.4},onDone:()=>{o.removeFromParent(),this.fxThink=null}});const l=this._freeNeighbor(n);if(!l){a.poof(s,18,13617339),e.removeFromParent(),this.fxStone=null;return}const c=e.position.clone(),d=r.worldPos(l.x,l.z);Qe({ms:460,delay:430,ease:nt.linear,onUpdate:(u,h)=>{e.position.lerpVectors(c,d,h),e.position.y+=Math.sin(h*Math.PI)*.7},onDone:()=>{$.sfx("drop"),e.removeFromParent(),this.fxStone=null,this.dead||this.stones.push(new _r(r,l.x,l.z,t,{tried:!0}))}})}update(e){for(const t of this.stones)t.update(e)}destroy(){this.dead=!0,super.destroy();for(const t of this.stones)t.taken||t.remove();for(const t of[this.fxStone,this.fxStar,this.fxThink])t?.removeFromParent();const{player:e}=this.ctx;if(e.carrying){const{mesh:t}=e.dropCarry();t?.removeFromParent()}}}class bE extends Fo{begin(){const{place:e,hud:t}=this.ctx,n=e.markers.o||[];this.minX=Math.min(...n.map(s=>s.x)),this.minZ=Math.min(...n.map(s=>s.z)),this.maxX=Math.max(...n.map(s=>s.x)),this.maxZ=Math.max(...n.map(s=>s.z)),this.anchor=null,this.flag=null,this.sprouts=[],this.pending=[],this._paint(),t.setAction("🌱"),t.setVerbPanel(this._panel())}_later(e,t){this.pending.push(St(e,t))}_onBed(e,t){return e>=this.minX&&e<=this.maxX&&t>=this.minZ&&t<=this.maxZ}_clamp(e,t){return{x:Math.max(this.minX,Math.min(this.maxX,e)),z:Math.max(this.minZ,Math.min(this.maxZ,t))}}_rect(){const{player:e}=this.ctx;if(!this.anchor)return this._onBed(e.x,e.z)?{x0:e.x,z0:e.z,x1:e.x,z1:e.z}:null;const t=this._clamp(e.x,e.z);return{x0:Math.min(this.anchor.x,t.x),x1:Math.max(this.anchor.x,t.x),z0:Math.min(this.anchor.z,t.z),z1:Math.max(this.anchor.z,t.z)}}_panel(){const{player:e}=this.ctx,t=this._rect(),n=t?t.z1-t.z0+1:0,s=t?t.x1-t.x0+1:0;return{kind:"array",rows:n,cols:s,count:n*s,anchored:!!this.anchor,offBed:!this._onBed(e.x,e.z)}}_paint(){const{place:e}=this.ctx,t=this._rect();for(let n=this.minZ;n<=this.maxZ;n++)for(let s=this.minX;s<=this.maxX;s++){const r=t&&s>=t.x0&&s<=t.x1&&n>=t.z0&&n<=t.z1;e.tintCell(s,n,r?(n-t.z0)%2?11464882:9429914:(s+n)%2?12159582:10581582)}this.ctx.hud.setVerbPanel(this._panel())}showModel(){return!0}onArrive(e,t){const n=this._panel();this.anchor&&(n.rows!==this._lastR||n.cols!==this._lastC)&&$.sfx("click",{pitch:1+(n.rows+n.cols)*.03}),this._lastR=n.rows,this._lastC=n.cols,this._paint()}onAction(){if(this.done)return;const{player:e,place:t,problem:n,particles:s}=this.ctx;if(!this.anchor){if(!this._onBed(e.x,e.z)){$.sfx("boop"),this.ctx.hud.toast("🌱 "+M("verb.array_need_soil"));return}this.anchor={x:e.x,z:e.z},this.flag=Tt(gt.flowerYellow,.42,"prop:flowerYellow"),this.flag.position.copy(t.worldPos(this.anchor.x,this.anchor.z,.04)),t.group.add(this.flag),$.sfx("plant"),this._paint();return}if(e.x===this.anchor.x&&e.z===this.anchor.z){t.group.remove(this.flag),this.flag=null,this.anchor=null,$.sfx("swoosh"),this.ctx.hud.toast("🚩 "+M("verb.array_unplant")),this._paint();return}const{rows:r,cols:a,total:o,given:l}=n.model.params,c=this._rect(),d=c.z1-c.z0+1,u=c.x1-c.x0+1,h=d*u;let f;if(l==="both"?f=d===r&&u===a||d===a&&u===r:l==="rows"?f=d===r&&h===o:f=h===o&&d>1&&u>1,f){this.done=!0;let g=0;for(let _=0;_<d;_++){this._later(_*u*36,()=>pE(this.ctx,{rect:c,row:_,col:0,count:(_+1)*u}));for(let p=0;p<u;p++){const w=t.worldPos(c.x0+p,c.z0+_,.06);this._later(g*36,()=>{const E=Tt(gt.sprout,.3,"prop:sprout",{castShadow:!1});E.position.copy(w),E.scale.multiplyScalar(.001),t.group.add(E),this.sprouts.push(E);const x=E.scale.x*1e3;this.pending.push(Qe({ms:240,ease:nt.outBack,onUpdate:(A,k)=>E.scale.setScalar(Math.max(.001,x*k))})),$.sfx("plant",{pitch:.9+(_*u+p)*.012})}),g++}const m=(_+1)*u;this._later(_*u*36+200,()=>Vd(this.ctx.world,t.worldPos(c.x0+u,c.z0+_,.3),String(m)))}this._later(d*u*36+450,()=>{s.confetti(t.worldPos(c.x0+Math.floor(u/2),c.z0+Math.floor(d/2),.6),40),this.ctx.resolve(!0,{tag:"correct",value:h})})}else{const g=h===o?"shape":h<o?"too_few":"too_many";this.ctx.resolve(!1,{tag:"near_miss",value:h,arrayInfo:{tag:g,r:d,c:u,n:h}})}}destroy(){super.destroy();const{place:e}=this.ctx;for(const t of this.pending)t.cancel();this.pending=[];for(let t=this.minZ;t<=this.maxZ;t++)for(let n=this.minX;n<=this.maxX;n++)e.resetCellTint(n,t);this.flag&&e.group.remove(this.flag);for(const t of this.sprouts)e.group.remove(t);this.ctx.hud.setVerbPanel(null),this.ctx.hud.setAction(null)}}class vE extends Fo{begin(){const{place:e,problem:t,hud:n}=this.ctx;this.tiles=(e.markers.V||[]).slice().sort((c,d)=>c.x-d.x),this.n=this.tiles.length;const{lo:s=0,hi:r=1,d:a=4}=t.model.params;this.lo=s,this.hi=r,this.d=a,this.ticks=[],this.knot=null,this.readyMark=null,this.readyKey=null,this.readyPulseAt=0;const o=this.tiles[0],l=this.tiles[this.n-1];this.endA=Mt(String(s),{bg:"#fff8ec",scale:.8}),this.endA.position.copy(e.worldPos(o.x,o.z,.9)),this.endB=Mt(String(r),{bg:"#fff8ec",scale:.8}),this.endB.position.copy(e.worldPos(l.x,l.z,.9)),e.group.add(this.endA,this.endB),this._showTicks(t.scaffold??1),n.setAction("🔔")}_showTicks(e){const{place:t}=this.ctx;for(const o of this.ticks)t.group.remove(o);this.ticks=[],this.level=e;const n=this.hi-this.lo,s=Math.round(this.d*n),r=(o,l,c)=>{const d=Math.round((o-this.lo)/n*(this.n-1)),u=this.tiles[d],h=Mt("▲",{color:l?"#e8a23d":"#7c4fd0",scale:l?1:.95});if(h.position.copy(t.worldPos(u.x,u.z,.34)),t.group.add(h),this.ticks.push(h),c){const f=Mt(c,{bg:l?"#ffd966dd":"#ffffffe0",color:"#6a4a8a",scale:.68});f.position.copy(t.worldPos(u.x,u.z,l?.92:.82)),t.group.add(f),this.ticks.push(f)}};let a=!1;for(let o=1;o<s;o++){const l=this.lo+o/this.d,c=Number.isInteger(l),d=!c&&Number.isInteger(l*2);if(d&&(a=!0),e>=2&&!(c||d))continue;let u=null;e===0?u=c?String(l):`${Math.round(l*this.d)}/${this.d}`:e===1&&c?u=String(l):e===1&&d&&(u=l===.5?"½":`${Math.floor(l)}½`),r(l,c||d,u)}!a&&this.lo<.5&&this.hi>.5&&r(.5,!0,e<=1?"½":null)}_valueAt(e){const t=this.tiles.findIndex(n=>n.x===e);return t<0?null:this.lo+t/(this.n-1)*(this.hi-this.lo)}_tol(){const{problem:e}=this.ctx;return Math.max(e.accept?.tol??.05,.55/(this.n-1))*(this.hi-this.lo)}_isCorrectCell(e,t){if(!this.tiles.some(s=>s.x===e&&s.z===t))return!1;const n=this._valueAt(e);return n!==null&&Math.abs(n-this.ctx.problem.answer)<=this._tol()}_showReadyCue(e,t){if(this.done||this.resolving)return;const n=performance.now(),s=`${e},${t}`;if(this.ctx.hud.setActionReady?.(!0),this.readyKey===s&&n<this.readyPulseAt)return;this.readyKey=s,this.readyPulseAt=n+1200;const{place:r,particles:a}=this.ctx,o=r.worldPos(e,t,.52);Zh(this.ctx,{x:e,z:t,kind:"ready"}),a.emit(o,10,{colors:[16767334,16777215,13215487],speed:.8,up:1,life:620,spread:.18}),$.sfx("sparkle",{pitch:.75,gain:.45});const l=Mt("✦",{color:"#ffd966",scale:.72});l.position.copy(o),r.group.add(l),this.readyMark=l;const c=l.scale.clone();Qe({ms:680,ease:nt.outQuad,onUpdate:(d,u)=>{l.position.y=o.y+Math.sin(u*Math.PI)*.22,l.scale.set(c.x*(1+u*.55),c.y*(1+u*.55),1),l.material.opacity=1-u},onDone:()=>{this.readyMark===l&&(this.readyMark=null),r.group.remove(l)}})}onArrive(e,t){this._isCorrectCell(e,t)&&this.ctx.player.queue.length===0?this._showReadyCue(e,t):this.ctx.hud.setActionReady?.(!1)}showModel(){return this._showTicks(0),!0}onAction(){if(this.done||this.resolving||this.ctx.player.locked)return;const{player:e,place:t,problem:n,particles:s}=this.ctx;if(!this.tiles.some(c=>c.x===e.x&&c.z===e.z)){$.sfx("boop");return}const a=this._valueAt(e.x),o=n.answer,l=this._tol();if($.sfx("gong"),this.ctx.hud.setActionReady?.(!1),Math.abs(a-o)<=l){this.done=!0;const c=t.worldPos(e.x,e.z,.15);Zh(this.ctx,{x:e.x,z:e.z,kind:"correct"}),this.knot=Tt(gt.flowerPink,.3,"prop:flowerPink"),this.knot.position.copy(c),t.group.add(this.knot),this.tiles.forEach((d,u)=>{St(u*40,()=>{if(u%3===0){const h=Tt(u%2?gt.flowerYellow:gt.flowerBlue,.22,"prop:f"+u%2);h.position.copy(t.worldPos(d.x,d.z,.12)),t.group.add(h),this.ticks.push(h)}})}),s.confetti(c,40),St(500,()=>this.ctx.resolve(!0,{tag:"correct",value:a}))}else{this.resolving=!0;const c=e.mesh;e.locked=!0,s.splash(c.position.clone(),34),$.sfx("splash");const d=c.position.y;Qe({ms:420,ease:nt.inQuad,onUpdate:(u,h)=>{c.position.y=d-h*1.1,c.rotation.z=h*.7},onDone:()=>{const u=(t.markers.P||[{x:2,z:2}])[0];c.rotation.z=0,e.locked=!1,e.setPlace(t,u.x,u.z),this.ctx.hud.setActionReady?.(!1),this._showTicks(0),this.resolving=!1,this.ctx.resolve(!1,{tag:a<o?"magnitude_low":"magnitude_high",value:a})}})}}destroy(){super.destroy();const{place:e}=this.ctx;e.group.remove(this.endA,this.endB),this.knot&&e.group.remove(this.knot),this.readyMark&&e.group.remove(this.readyMark);for(const t of this.ticks)e.group.remove(t);this.ctx.hud.setAction(null),this.ctx.hud.setActionReady?.(!1)}}class yE extends Fo{begin(){const{place:e,problem:t,hud:n}=this.ctx,{total:s,baskets:r}=t.model.params;this.total=s,this.pile=s;const a=(e.markers.m||[])[0];this.stumpPos=a?{x:a.x,z:a.z}:{x:2,z:2},a&&(this.stumpMesh=Tt(gt.stump,.5,"prop:stump"),this.stumpMesh.position.copy(e.worldPos(a.x,a.z)),e.group.add(this.stumpMesh),e.cellAt(a.x,a.z).walk=!1),this.pileSprite=Mt("🥥 "+this.pile,{bg:"#fff8ec",scale:.8}),this.pileSprite.position.copy(e.worldPos(this.stumpPos.x,this.stumpPos.z,1)),e.group.add(this.pileSprite);const o=(e.markers.B||[]).slice().sort((l,c)=>Math.abs(l.x-this.stumpPos.x)+Math.abs(l.z-this.stumpPos.z)-(Math.abs(c.x-this.stumpPos.x)+Math.abs(c.z-this.stumpPos.z)));this.baskets=o.slice(0,r).map(l=>{const c=Tt(gt.basket,.42,"prop:basket");c.position.copy(e.worldPos(l.x,l.z)),e.group.add(c);const d=Mt("0",{bg:"#fff8ec",scale:.6});return d.position.copy(e.worldPos(l.x,l.z,.85)),e.group.add(d),{x:l.x,z:l.z,count:0,mesh:c,label:d,order:[]}}),this.lastDrops=[],n.setAction("✅"),n.setVerbPanel(this._panel())}_panel(){return{kind:"share",pile:this.pile,remainder:this.ctx.problem.model.params.remainder,counts:this.baskets.map(e=>e.count)}}_updateLabel(e){const{place:t}=this.ctx;t.group.remove(e.label),e.label=Mt(String(e.count),{bg:"#fff8ec",scale:.6}),e.label.position.copy(t.worldPos(e.x,e.z,.85)),t.group.add(e.label)}_updatePile(){const{place:e}=this.ctx;e.group.remove(this.pileSprite),this.pileSprite=Mt("🥥 "+this.pile,{bg:"#fff8ec",scale:.8}),this.pileSprite.position.copy(e.worldPos(this.stumpPos.x,this.stumpPos.z,1)),e.group.add(this.pileSprite),this.ctx.hud.setVerbPanel(this._panel())}_basketAt(e,t){return this.baskets.find(n=>n.x===e&&n.z===t)}_drop(e){if(this.pile<=0){$.sfx("boop");return}const{place:t}=this.ctx;this.pile-=1,e.count+=1,this.lastDrops.push(e);const n=Tt(gt.coconut,.22,"prop:coconut"),s=t.worldPos(this.stumpPos.x,this.stumpPos.z,.6),r=t.worldPos(e.x,e.z,.3);n.position.copy(s),t.group.add(n),$.sfx("pick",{pitch:1+e.count*.04}),Qe({ms:320,ease:nt.linear,onUpdate:(a,o)=>{n.position.lerpVectors(s,r,o),n.position.y=s.y+(r.y-s.y)*o+Math.sin(o*Math.PI)*.7},onDone:()=>{t.group.remove(n),$.sfx("drop"),Qh(this.ctx,{basket:e,fair:!1}),this._updateLabel(e),this._updatePile()}})}_take(){const e=this.lastDrops.pop();if(!e||e.count<=0){$.sfx("boop");return}e.count-=1,this.pile+=1,$.sfx("swoosh"),this._updateLabel(e),this._updatePile()}showModel(){for(const[e,t]of this.baskets.entries()){const n=t.mesh;Qe({ms:360,delay:e*70,onUpdate:(s,r)=>{n.position.y=this.ctx.place.worldPos(t.x,t.z).y+Math.sin(r*Math.PI)*.18}})}return $.sfx("click"),!0}onCellTap(e,t){const n=this._basketAt(e,t);return n?(this._drop(n),!0):e===this.stumpPos.x&&t===this.stumpPos.z?(this._take(),!0):!1}onArrive(e,t){if(this.ctx.player.queue.length>0)return;const n=this._basketAt(e,t);n&&this._drop(n)}onKey(e){return e==="Backspace"||e==="KeyX"?(this._take(),!0):!1}onAction(){if(this.done)return;const{problem:e}=this.ctx,{quotient:t,remainder:n}=e.model.params,s=this.baskets.map(a=>a.count),r=s.every(a=>a===s[0]);if(r&&s[0]===t&&this.pile===n){this.done=!0;for(const a of this.baskets)Qh(this.ctx,{basket:a,fair:!0}),this.ctx.particles.confetti(this.ctx.place.worldPos(a.x,a.z,.5),12);n>0&&this.ctx.onTreat?.("berry",n,this.ctx.place.worldPos(this.stumpPos.x,this.stumpPos.z,.7)),this.ctx.resolve(!0,{tag:"correct",value:s[0]})}else if(r)this.pile>n?this.ctx.resolve(!1,{tag:"share_more",value:this.pile}):this.ctx.resolve(!1,{tag:"remainder_ignored",value:s[0]});else{const a=Math.max(...s);for(const o of this.baskets)if(o.count===a){const l=o.mesh;Qe({ms:380,onUpdate:(c,d)=>{l.rotation.z=Math.sin(d*Math.PI*4)*.15}})}this.ctx.resolve(!1,{tag:"unfair_share",value:s.join(",")})}}destroy(){super.destroy();const{place:e}=this.ctx;this.stumpMesh&&e.group.remove(this.stumpMesh),e.group.remove(this.pileSprite);for(const t of this.baskets)e.group.remove(t.mesh),e.group.remove(t.label);this.ctx.hud.setVerbPanel(null),this.ctx.hud.setAction(null)}}const Jh={fetch:_E,array:bE,numberline:vE,share:yE},ef={tide:{pet:"turtle",face:"🐢",nameKey:"helper.turtle"},garden:{pet:"bunny",face:"🐰",nameKey:"helper.bunny"},stump:{pet:"duckling",face:"🐥",nameKey:"helper.duckling"},vines:{pet:"owl",face:"🦉",nameKey:"helper.owl"}};class xE{constructor(e){this.game=e}runChamber(){const e=this.game;e.mode="chamber",e.flowToken++,gn(),e.solvedInChamber=0,e.chamberIndex++;let t;if(e.duel)t=e.duel.nextProblem();else{const n=Vi(e.profile.curriculum),s=e.isEcho?{echo:!0,allowedSkills:n,rng:e.rng,now:Date.now()}:{world:e.currentWorld,allowedSkills:n,rng:e.rng,now:Date.now()};t=Na(Gi(e.profile.math,s),e.profile.math,s),t?.world&&(e.currentWorld=t.world)}this.buildChamber(t),Un(!0),Xs(!0),this.presentProblem(t),$.music(t.world?`chamber:${t.world}`:"chamber"),$.ambience("chamber"),$.attachEvents(e.place),e.input.maybeGestureHint(),e.isEcho&&Kt("✨ "+M("play.echo_door"))}buildChamber(e){const t=this.game;t.clearPlace();const n=e.kind,s=td[n]||td.fetch;t.chamberRng=t.duel?new vn(t.duel.seed*131+t.duel.round*17+5):t.rng;const r=J1(t.chamberRng.pick(s),t.chamberRng);t.place=new nm(t.world,t.currentWorld||"garden"),t.place.buildFrom(r,{seed:t.chamberRng.int(1,1e9)}),eE(t.place,t.chamberRng),t.particles=new Vr(t.place.group);const a=nd({mode:"chamber",tier:Ie.tier,ambientScale:Ie.ambientScale,reducedMotion:lt()}),o=t.currentWorld==="vines";t.place.addEntity(new id(t.place,t.chamberRng,{butterflies:2,fireflies:o?a.fireflies:0,motes:o?0:a.motes})),mE(t.place,t.currentWorld),t.avatar.spawnAvatar();const l=(t.place.markers.P||[{x:2,z:2}])[0];if(t.player.setPlace(t.place,l.x,l.z),t.avatar.spawnPet(l),t.world.defaultZoom=t.input.sceneZoom(n),t.world.frameBoard(new P(0,0,0),t.place.size.w,t.place.size.d,t.player.mesh),t.player.onArrive=(d,u)=>{t.pet?.notePlayerAt(d,u),tm(t.place,d,u,t.player?.mesh.position),this.collectPickupAt(d,u),t.verb?.onArrive(d,u)},t.player.onBump=(d,u)=>t.verb?.onBump(d,u),t.place.playerAt=()=>t.player?{x:t.player.x,z:t.player.z}:null,t.altar=null,(t.place.markers.A||[]).length){const d=t.place.markers.A[0];t.altar=new UM(t.place,d.x,d.z),t.place.addEntity(t.altar),t.place.cellAt(d.x,d.z).walk=!1}t.crabs=[];for(const d of t.place.markers.c||[]){if(this.patrolReach(d,"x").len+this.patrolReach(d,"z").len<2)continue;const u=new zM(t.place,d.x,d.z,{speed:1.3+t.rng.float()*.7,rng:new vn(t.rng.int(1,1e9))});t.crabs.push(u),t.place.addEntity(u)}t.helper=null,t.helpKind=null;const c=(t.place.markers.M||[])[0];if(c){const d=ef[t.currentWorld]||ef.garden,u=wi(d.pet),h=Jn(u.full,.62,null,"creature:"+u.id+":f");h.position.copy(t.place.worldPos(c.x,c.z)),t.place.group.add(h),t.place.addGroundShadow(c.x,c.z,{radius:.3}),t.place.cellAt(c.x,c.z).walk=!1;const f={...d,x:c.x,z:c.z,mesh:h,t:0,excite:0},g=h.position.y;t.place.addEntity({update:_=>{f.t+=_/1e3,f.excite=Math.max(0,f.excite-_/900),h.position.y=g+Math.abs(Math.sin(f.t*(2+f.excite*5)))*(.05+f.excite*.28)}}),t.helper=f}}helperReact(e){const t=this.game.helper;if(!t)return;if(e==="correct"){t.excite=1;return}if(lt())return;const n=t.mesh;Qe({ms:700,ease:nt.outQuad,onUpdate:(s,r)=>{n.rotation.z=wp(r,.12,2)},onDone:()=>{n.rotation.z=0}})}helperSay(e,t={}){const n=this.game.helper;if(!n){Rn(e,t);return}Rn(`<b>${M(n.nameKey)}:</b> ${e}`,{...t,face:n.face})}helperTap(){const e=this.game.helper;e&&($.sfx("click"),e.excite=1,this.helperSay(M(`helper.cheer.${1+Math.floor(Math.random()*4)}`),{transient:!0,ms:3600}))}canHost(e){const t=this.game.place.markers;return e==="fetch"?(t.s||[]).length+(t.p||[]).length>=4&&(t.A||[]).length>0:e==="array"?(t.o||[]).length>0:e==="numberline"?(t.V||[]).length>=8:e==="share"?(t.B||[]).length>=2&&(t.m||[]).length>0:!1}patrolReach(e,t){const n=this.game.place,s=l=>{let c=0;for(let d=1;d<12;d++){const u=t==="x"?e.x+l*d:e.x,h=t==="z"?e.z+l*d:e.z,f=n.cellAt(u,h);if(!f||!f.walk||f.h!==n.cellAt(e.x,e.z).h||Sd.has(f.ch))break;c=d}return c},r=s(-1),a=s(1),o=t==="x"?e.x:e.z;return{min:o-r,max:o+a,len:r+a}}presentProblem(e){const t=this.game;t.problem=e,t.usedHint=!1,t.problemStart=performance.now(),Co(),ir(),t.verb?.destroy();const n=Jh[e.kind]||Jh.fetch;t.verb=new n({world:t.world,place:t.place,player:t.player,particles:t.particles,altar:t.altar,hud:ZM,problem:e,rng:t.chamberRng,resolve:(r,a)=>this.onResolve(r,a),onTreat:(r,a,o)=>this.onTreat(r,a,o),onCarry:r=>{r&&this.startleCrabs()},hintUsed:()=>{t.usedHint=!0}}),t.verb.begin();const s=this.promptVars(e);if(qc(M(e.prompt.key,s),e.equation),t.helper&&e.kind!==t.helpKind){t.helpKind=e.kind;const r=t.flowToken;St(800,()=>{r===t.flowToken&&this.helperSay(M("helper."+e.kind))})}e.scaffold===0&&St(700,()=>t.verb?.showModel())}refreshLanguage(){const e=this.game;if(e.mode!=="chamber"||!e.problem)return;const t=this.promptVars(e.problem);qc(M(e.problem.prompt.key,t),e.problem.equation),e.verb?.refreshLanguage?.()}promptVars(e){const t={...e.meta||{},...e.model?.params||{},...e.prompt?.vars||{}};return t.n!==void 0&&t.d!==void 0&&(t.frac=`${t.n}/${t.d}`),t.answer=e.answer,t}onResolve(e,t){const n=this.game,s=performance.now()-n.problemStart,r=Td(n.profile.math,n.problem,{correct:e,usedHint:n.usedHint,ms:s},{now:Date.now()});n.profile.stats[e?"correct":"wrong"]++,qe(),this.helperReact(e?"correct":"wrong");const a=n.altar?.mesh.position||n.player?.mesh.position;n.place?.visualEvent?.(e?"correct-answer":"wrong-answer",{world:n.currentWorld,position:a}),e?this.onCorrect(r,t):this.onWrong(r,t)}onCorrect(e,t){const n=this.game;n.combo++,n.solvedInChamber++,n.duel&&n.duel.scoreCorrect(n.combo),n.pauseUntil=performance.now()+110,$.sfx("correct"),$.comboTone(n.combo),Dp(n.problem.equation.replace(/[?⬚]/,String(n.problem.answer))),Kc(n.combo),n.pet?.celebrate(),St(lt()?0:90,()=>{n.flowToken===void 0||n.mode!=="chamber"||hE(n.place,n.altar?.mesh.position||n.player?.mesh.position,n.currentWorld)});const s=n.rewards.payCorrect(n.combo,e);this.maybeStashWonder(e);const r=n.flowToken;St(1500,()=>{if(r!==n.flowToken)return;const a=n.duel?Lt.problemsPerChamber:n.isEcho?Lt.echoProblems:Lt.problemsPerChamber;if(n.solvedInChamber>=a||n.duel&&!n.duel.hasMore())this.completeChamber(s);else{let o;if(n.duel)o=n.duel.nextProblem();else{const l=Vi(n.profile.curriculum),c=n.isEcho?{echo:!0,kind:n.problem.kind,allowedSkills:l,rng:n.rng,now:Date.now()}:{world:n.currentWorld,kind:n.problem.kind,allowedSkills:l,rng:n.rng,now:Date.now()};o=Na(Gi(n.profile.math,c),n.profile.math,c)}this.presentProblem(this.pickNextHostableProblem(o))}})}pickNextHostableProblem(e){const t=this.game;if(e.kind===t.problem.kind||this.canHost(e.kind))return e;if(!this.canHost("fetch"))return{...e,kind:t.problem.kind};if(e.choices)return{...e,kind:"fetch"};const n=Vi(t.profile.curriculum);return Na(Gi(t.profile.math,{world:e.world,skill:e.skillId,kind:"fetch",allowedSkills:n,rng:t.rng,now:Date.now()}),t.profile.math,{world:e.world,allowedSkills:n,rng:t.rng,now:Date.now()})}onWrong(e,t){const n=this.game;n.combo=0,n.duel&&n.duel.scoreWrong(),Kc(0),$.sfx("boop"),Ip();const s=this.promptVars(n.problem);if(t.arrayInfo){const r=t.arrayInfo,a=r.tag==="shape"?"ex.array_shape":"ex.array_count";this.helperSay(M(a,{...s,value:r.n}))}else{let r="ex."+(t.tag==="random"?"near_miss":t.tag);r==="ex.off_by_table"&&n.problem.explain?.key!=="ex.off_by_table"&&(r=n.problem.explain.key);const a=M(r,{...s,...n.problem.explain?.vars||{}});this.helperSay(a===r?M(n.problem.explain?.key||"ex.generic",s):a)}St(450,()=>{n.verb&&!n.verb.showModel()&&Yc(n.problem.model)})}onTreat(e,t,n){this.game.rewards.payTreat(e,t,n)}startleCrabs(){for(const e of this.game.crabs)e.startle()}maybeStashWonder(e){const t=this.game;if(t.pendingWonder||!t.problem)return;const n=Array.isArray(e.newGems)&&e.newGems.length>=2,s=f1({kind:t.problem.kind,skillId:t.problem.skillId,world:t.problem.world,litTwin:n});if(!s)return;const r=h1(s,t.profile.flags?.wondersSeen||[]);r&&(t.pendingWonder=r,Kt("✨ "+M(r.titleKey)))}completeChamber(e){const t=this.game;t.profile.stats.chambers++,t.verb?.destroy(),t.verb=null,$.music("celebrate");const n=t.rewards.payChest(t.chamberIndex);if(qe(),t.refreshHudCounts(),t.pendingEcho=!t.isEcho&&t.rng.chance(Lt.echoDoorChance),t.isEcho=!1,t.duel){t.duel.chamberDone();return}const s=t.pendingWonder||null;t.pendingWonder=null,Un(!1),F1({rewards:n,wonder:s,onWonderOpen:r=>{const a=t.profile.flags;a.wondersSeen=a.wondersSeen||[],a.wondersSeen.includes(r)||(a.wondersSeen.push(r),qe())},onNext:()=>t.afterResult(()=>{t.pendingEcho&&(t.pendingEcho=!1,t.isEcho=!0),this.runChamber()}),onHome:()=>t.afterResult(()=>t.startHub())})}useHint(){const e=this.game;if(!e.verb||!e.problem)return;e.usedHint=!0,e.verb.hintShown=!0,$.sfx("click"),e.verb.showModel()||Yc(e.problem.model),this.helperSay(M("hint.look"),3600)}debugChamber(e,t){const n=this.game,s=Na(Gi(n.profile.math,{skill:e,kind:t,rng:n.rng,now:Date.now()}),n.profile.math,{rng:n.rng,now:Date.now()});return n.currentWorld=s.world,n.mode="chamber",gn(),n.solvedInChamber=0,this.buildChamber(s),Un(!0),Xs(!0),this.presentProblem(s),$.music(s.world?`chamber:${s.world}`:"chamber"),{kind:s.kind,eq:s.equation,skill:s.skillId}}updateChamber(e){const t=this.game;if(!(t.mode!=="chamber"||!t.player||t.player.locked)){for(const n of t.crabs)if(!(n.frozen||n.cooldown>0||t.player.carrying)&&n.x===t.player.x&&n.z===t.player.z){n.cooldown=2200;const s=Math.min(Lt.crabSteal,t.profile.bananas);if(s>0){Bs(t.profile,-s),t.refreshHudCounts(),Vd(t.world,t.player.mesh.position.clone(),`-${s} 🍌`,"#c2497a");for(let a=0;a<s;a++){const o=t.player.x+t.rng.int(-3,3),l=t.player.z+t.rng.int(-3,3),c=t.place.cellAt(o,l),d=c&&c.walk&&!(o===t.player.x&&l===t.player.z)?{x:o,z:l}:t.avatar.findFreeNear(t.player.x,t.player.z);d&&this.spawnBananaPickup(d.x,d.z)}}$.sfx("crab"),t.world.shake(.12),Rn(M("play.crab_yoink",{n:s}),{transient:!0,ms:2200,face:"🦀"});const r=t.avatar.findFreeNear(t.player.x,t.player.z);r&&t.player.pathTo(r.x,r.z)}}}spawnBananaPickup(e,t){const n=this.game.place,s=Tt(gt.bananas,.32,"prop:bananas",{castShadow:!1}),r=n.worldPos(e,t,.08);s.position.copy(r),n.group.add(s);const a={x:e,z:t,mesh:s,t:Math.random()*6,update:o=>{a.t+=o/1e3,s.position.y=r.y+.06+Math.abs(Math.sin(a.t*3))*.07,s.rotation.y+=o*.002}};n.addEntity(a),this.game.pickups.push(a)}collectPickupAt(e,t){const n=this.game.place,s=this.game.pickups.findIndex(o=>o.x===e&&o.z===t);if(s<0)return;const r=this.game.pickups.splice(s,1)[0];n.group.remove(r.mesh);const a=n.entities.indexOf(r);a>=0&&n.entities.splice(a,1),this.onTreat("bananas",1,r.mesh.position.clone())}}const wE=360,cm=300,sd=i=>new Promise(e=>setTimeout(e,Math.max(0,i))),dm=()=>document.getElementById("scene-transition");function SE(i="portal"){const e=dm();return e?(e.classList.remove("hidden","leaving","portal","soft"),e.classList.add(i,"entering"),e.setAttribute("aria-hidden","true"),e):null}function ME(i=cm){const e=dm();if(!e)return Promise.resolve(null);e.classList.remove("entering"),e.classList.add("leaving");const t=()=>(e.classList.add("hidden"),e.classList.remove("leaving","portal","soft"),e);return i<=0?Promise.resolve(t()):sd(i).then(t)}async function EE(i,e={}){const t=e.inMs??wE,n=e.outMs??cm;SE(e.kind||"portal"),await sd(t),await i?.(),await sd(n),await ME(0)}const TE={sparkle:16767334,petal:16757702,bubble:10213119,star:13215487};class AE{constructor(){this.canvas=document.getElementById("game-canvas"),this.world=new yS(this.canvas),this._gfxdev=null,this.profile=null,this.mode="title",this.place=null,this.player=null,this.pet=null,this.particles=null,this.verb=null,this.problem=null,this.crabs=[],this.combo=0,this.solvedInChamber=0,this.chamberIndex=0,this.pendingEcho=!1,this.isEcho=!1,this.currentWorld=null,this.pauseUntil=0,this.problemStart=0,this.usedHint=!1,this.rng=new vn(Math.random()*2**31>>>0),this.chamberRng=this.rng,this.trailT=0,this.sessionStart=performance.now(),this.duel=null,this.pickups=[],this.flowToken=0,this.mimiChat=0,this.talkCooldown=0,this.hubWelcomed=!1,this.talkBtn=null,this.business=null,this.stage=null,this.lastHubEntry=null,this.transitioning=!1,this.avatar=new I1(this),this.input=new O1(this),this.rewards=new B1(this),this.hub=new dE(this),this.chamber=new xE(this)}boot(){Ei(),Cs(),Fp({onHint:()=>this.chamber.useHint(),onAction:()=>this.mode==="hub"?this.hub.hubAction():this.verb?.onAction(),onHome:()=>this.confirmHome(),onSettings:()=>this.openSettings()}),this.input.bind(),this.showTitle();const e=()=>{$.init(),$.setSfx(Zt().sfx),$.setMusic(Zt().music),$.setAmbience(Zt().ambience),window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e)};window.addEventListener("pointerdown",e),window.addEventListener("keydown",e);let t=performance.now();const n=s=>{requestAnimationFrame(n);let r=Math.min(50,s-t);if(t=s,s<this.pauseUntil){this.world.update(0);return}fS(r),this.update(r),this.world.update(r),this._gfxdev?.tick(r)};requestAnimationFrame(n),setInterval(()=>{this.profile&&this.mode!=="title"&&document.visibilityState==="visible"&&(this.profile.stats.msPlayed+=1e4,qe())},1e4),window.addEventListener("beforeunload",()=>Wn())}showTitle(){this.mode="title",this.flowToken++,this.hubWelcomed=!1,Un(!1),this.clearPlace(),this.player=null,this.pet=null,$.music(null),this.hub.buildAttractIsland(),Xp({onStart:()=>this.showPlayerSelect(),onParents:()=>this.showParentSelect(),onDuel:()=>this.startDuelSetup(),onLangChange:()=>this.place?.refreshLanguage?.()})}showParentSelect(e=()=>this.showTitle()){m1({profiles:ao(),onChoose:t=>this.showParents(t,()=>this.showParentSelect(e)),onBack:e})}showParents(e=null,t=()=>this.showTitle()){const n=e?ao().find(s=>s.id===e)||null:Qr();v1({report:n?wr(n.math,{now:Date.now()}):null,profile:n,businessReport:n?.business?Zx(n):null,stageReport:n?.stage?pw(n.stage):null,onCurriculumChange:s=>{if(!n)return;const{birthDate:r,packId:a,...o}=s,l=n.curriculum?.packId;let c=a&&a!==l?Lx(n.curriculum,a):n.curriculum;r!==void 0&&(c=np({...c,birthDate:r||null},mp())),s.confirmedStage!==void 0&&(o.stageSource=s.confirmedStage===n.curriculum?.estimatedStage?"auto":"parent"),n.curriculum={...c,...o},Wn(),this.showParents(n.id,t)},onClose:t})}showPlayerSelect(){Zc({onLangChange:()=>this.place?.refreshLanguage?.(),onPlay:(e,t)=>{if(this.profile=qw(e),!this.profile)return;const n=()=>{this.profile.flags.introSeen=!0,qe(),this.needsWarmup()?this.startWarmupThenHub():this.startHub()};t||!this.profile.flags.introSeen?x1(n):this.needsWarmup()?this.startWarmupThenHub():this.startHub()},onParents:()=>this.showParentSelect(()=>this.showPlayerSelect()),onDuel:()=>this.startDuelSetup()})}needsWarmup(e=this.profile){return e?.curriculum?.warmup?.completed?!1:!!e?.flags?.needsPlacementWarmup||e?.curriculum?.ageAtStart!=null}startWarmupThenHub(){let e=!1;const t=c=>{e||(e=!0,c?.())},n=this.profile.curriculum?.warmup||{},s=Array.isArray(n.skillIds)?n.skillIds.slice(0,3):[],r=s.length?s:Vi(this.profile.curriculum).slice(0,3),a=r.length?r:["add_20","sub_20","tables_a"],o=Array.isArray(n.results)?n.results.slice(0,a.length):[];if(o.length>=a.length){this.profile.curriculum=Pa(this.profile.curriculum,o,{skillIds:a}),qe(),t(()=>this.startHub());return}const l=a.map((c,d)=>Gi(this.profile.math,{skill:c,kind:"fetch",rng:new vn(`warmup:${this.profile.id}:${c}:${d}`),now:Date.now()})).slice(o.length);S1({problems:l,onAnswer:({problem:c,correct:d})=>{o.push({skill:c.skillId,correct:d}),Td(this.profile.math,c,{correct:d,ms:0,usedHint:!1},{now:Date.now()}),this.profile.curriculum=Pa(this.profile.curriculum,o,{completed:!1,skillIds:a}),qe()},onDone:()=>{this.profile.curriculum=Pa(this.profile.curriculum,o,{skillIds:a}),this.profile.flags&&(this.profile.flags.needsPlacementWarmup=!1),qe(),t(()=>this.startHub())},onSkip:()=>{this.profile.curriculum=Pa(this.profile.curriculum,o,{skillIds:a}),this.profile.flags&&(this.profile.flags.needsPlacementWarmup=!1),qe(),t(()=>this.startHub())}})}enterWorld(e){this.currentWorld=e,this.chamberIndex=0,this.combo=0,this.runChamber()}async transitionTo(e,t={}){if(this.transitioning)return!1;this.transitioning=!0,this.player?.stop(),this.player&&(this.player.locked=!0);try{return await EE(e,t),!0}finally{this.transitioning=!1,this.player&&(this.player.locked=!1)}}enterWorldFromPortal(e){return this.lastHubEntry={type:"portal",worldId:e},$.sfx("door"),this.transitionTo(()=>this.enterWorld(e),{kind:"portal"})}runChamber(){this.chamber.runChamber()}debugChamber(e,t){return this.chamber.debugChamber(e,t)}afterResult(e){const t=this.profile;if(t.egg.points>=t.egg.goal){const n=Qw(t,so);A1(n,()=>{n&&!t.avatar.pet&&(t.avatar.pet=n.id),this.refreshHudCounts(),e()})}else e()}async openSettings(e=!1){ir(),Tn({onClose:()=>gn(),onSwitchPlayer:()=>this.showTitle(),onLangChange:()=>this.afterLanguageChange(),devTools:null})}afterLanguageChange(){jd(),this.refreshHudCounts(),this.mode==="chamber"?this.chamber.refreshLanguage():this.mode==="business"?this.business?.refreshLanguage?.():this.mode==="stage"?this.stage?.refreshLanguage?.():this.mode==="hub"&&this.place?.refreshLanguage?.()}afterDevPresetApplied(e){if(Kt(`Dev preset: ${e.label}`),this.mode==="hub"){this.hub.buildHub(),Un(!0),this.refreshHudCounts();return}this.mode!=="title"&&this.startHub()}confirmHome(){if(this.duel){this.duel=null,this.verb?.destroy(),this.verb=null,this.showTitle();return}if(this.mode==="hub"){this.showTitle();return}this.verb?.destroy(),this.verb=null,this.transitionTo(()=>this.startHub(),{kind:"portal"})}startHub(){const e=this.mode!=="title"&&this.mode!=="hub",t=this.advanceStory(e);if(t.length){this.runStoryQueue(t,()=>this.hub.startHub());return}this.hub.startHub()}advanceStory(e){const t=[];try{if(!this.profile)return t;const n=wr(this.profile.math,{now:Date.now()}),s=Vi(this.profile.curriculum),r=Pc(this.profile);let a=!1;const o=Zf(r,n,s);if(kp(this.profile),o.length&&(a=!0,e)){const l=Pd(n,s),c={};for(const[u,h]of Object.entries(l))c[u]=h.band==="below"?"remembered":"earned";const d=$M(o,c);d.length&&t.push(u=>r1(d,{story:r},u))}if(e&&VM(r)==="reveal"){const l=Lp.reveal.lineIndex;t.push(c=>{Lc(r,l),qe(),a1("reveal",{story:r},c)})}a&&qe()}catch{return[]}return t}runStoryQueue(e,t){const n=s=>{if(s>=e.length){t();return}e[s](()=>n(s+1))};n(0)}refreshHudCounts(){Op(this.profile.bananas),Bp(this.profile.streak.count),Np(this.profile.egg.points,this.profile.egg.goal)}startBusinessFromHub(e="bakery"){return this.lastHubEntry={type:"build",id:e},this.pendingShopId=e,this.transitionTo(()=>this.startBusiness(),{kind:"portal"})}async startBusiness(){const e=this.pendingShopId||"bakery";if(!qs(this.profile,e))return!1;this.mode="business";const t=++this.flowToken,{BusinessPlace:n,BusinessController:s}=await yr(async()=>{const{BusinessPlace:o,BusinessController:l}=await import("./business-BWLhfJKv.js");return{BusinessPlace:o,BusinessController:l}},[]);if(t!==this.flowToken)return!1;this.business=new s(this,e),gn(),this.clearPlace(),this.place=new n(this.world,{seed:606,shopId:e}),this.particles=new Vr(this.place.group),this.place.fx=this.particles,this.avatar.spawnAvatar();const r=this.place.spawn||{x:2,z:Math.max(1,this.place.size.d-3)};this.player.setPlace(this.place,r.x,r.z),this.avatar.spawnPet(r),this.player.onArrive=(o,l)=>this.pet?.notePlayerAt(o,l),this.player.onBump=(o,l)=>this.business.businessTap(o,l),this.place.playerAt=()=>this.player?{x:this.player.x,z:this.player.z}:null,this.world.defaultZoom=this.input.sceneZoom("hub"),this.world.frameBoard(this.place.center(),this.place.size.w,this.place.size.d,this.player.mesh),Un(!0),fo(),Er(null),po(null),Xs(!1),this.refreshHudCounts(),$.music("island");const a=zx(this.profile,e);return a.activeOrder?.tasks?.length?this.business.resumeBusinessOrder(a):this.business.startNextBusinessOrder(),!0}startStageFromHub(){return this.lastHubEntry={type:"build",id:"stage"},this.transitionTo(()=>this.startStage(),{kind:"portal"})}async startStage(){if(!qs(this.profile,"stage"))return!1;this.mode="stage";const e=++this.flowToken,{StagePlace:t,StageController:n}=await yr(async()=>{const{StagePlace:r,StageController:a}=await import("./stage-14KniGBq.js");return{StagePlace:r,StageController:a}},[]);if(e!==this.flowToken)return!1;this.stage=new n(this),gn(),this.clearPlace(),this.place=new t(this.world,{seed:808}),this.particles=new Vr(this.place.group),this.place.fx=this.particles,this.avatar.spawnAvatar();const s={x:6,z:Math.max(1,this.place.size.d-2)};return this.player.setPlace(this.place,s.x,s.z),this.avatar.spawnPet(s),this.player.onArrive=(r,a)=>this.pet?.notePlayerAt(r,a),this.player.onBump=(r,a)=>this.stage.stageTap(r,a),this.place.playerAt=()=>this.player?{x:this.player.x,z:this.player.z}:null,this.world.defaultZoom=this.input.sceneZoom("hub"),this.world.frameBoard(this.place.center(),this.place.size.w,this.place.size.d,this.player.mesh),Un(!0),fo(),Er(null),po(null),Xs(!1),this.refreshHudCounts(),$.music("island"),this.stage.open(),!0}async startDuelSetup(){const{showDuelSetup:e}=await yr(async()=>{const{showDuelSetup:t}=await import("./duel-Dw-EaZkX.js");return{showDuelSetup:t}},[]);e(this)}inputAction(){this.mode==="hub"?this.hub.hubAction():this.verb?.onAction()}inputHint(){this.chamber.useHint()}inputTapCell(e){if(!(this.mode==="hub"&&this.hub.hubTap(e.x,e.z))&&!(this.mode==="business"&&this.business?.businessTap(e.x,e.z))&&!(this.mode==="stage"&&this.stage?.stageTap(e.x,e.z))){if(this.helper&&e.x===this.helper.x&&e.z===this.helper.z){this.chamber.helperTap();return}this.verb?.onCellTap(e.x,e.z,!1)||this.player?.pathTo(e.x,e.z)}}update(e){if(!this.place)return;if(this.place.update(e),this.player?.update(e),this.pet?.update(e),this.particles?.update(e),this.verb?.update?.(e),this.mode==="hub"&&this.player&&(this.talkBtnT=(this.talkBtnT||0)+e,this.talkBtnT>140)){this.talkBtnT=0;const n=this.hub.hubNpcNear()?"💬":null;n!==this.talkBtn&&(this.talkBtn=n,Er(n))}this.chamber.updateChamber(e);const t=this.profile?.avatar.trail;t&&this.player?.hopping&&this.particles&&(this.trailT+=e,this.trailT>70&&(this.trailT=0,this.particles.emit(this.player.mesh.position.clone().add(new P(0,.3,0)),2,{colors:[TE[t]||16767334],speed:.4,up:.8,life:500,spread:.1})))}clearPlace(){this.player&&(this.player.stop(),this.player.locked=!0),this.verb?.destroy?.(),this.verb=null,this.problem=null,this.crabs=[],this.pickups=[],this.helper=null,this.helpKind=null,this.place&&(this.place.dispose(),this.place=null),this.particles=null}}const RE=new AE;RE.boot();export{ao as $,XE as A,LE as B,ZE as C,Wn as D,HE as E,BE as F,en as G,IE as H,OE as I,UE as J,GE as K,NE as L,Jx as M,cp as N,wn as O,nm as P,lt as Q,rs as R,sw as S,Dt as T,WE as U,VE as V,$E as W,jE as X,Nr as Y,PE as Z,Sr as _,Mt as a,JM as a0,qw as a1,Md as a2,Na as a3,Gi as a4,Td as a5,yr as a6,Pg as a7,xf as a8,Pe as a9,Ze as aA,rt as aB,Gm as aC,Hm as aD,Wm as aE,sf as aF,$m as aG,jm as aH,Vm as aI,yn as aJ,un as aK,He as aa,xd as ab,ss as ac,Us as ad,Ft as ae,Mi as af,gd as ag,LM as ah,Ie as ai,vo as aj,Ul as ak,bc as al,it as am,Js as an,P as ao,yd as ap,ei as aq,Eg as ar,Yi as as,qr as at,gi as au,kE as av,dn as aw,zg as ax,Ym as ay,CE as az,Jn as b,Tt as c,gt as d,J as e,zx as f,wi as g,Kt as h,FE as i,$ as j,Lt as k,qx as l,zt as m,vn as n,DE as o,qe as p,qE as q,vt as r,Dd as s,M as t,KE as u,YE as v,zE as w,Bs as x,Rn as y,h1 as z};
