(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Bh="modulepreload",Nh=function(i){return"/monkeygrove/"+i},Ec={},Oh=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let l=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");s=l(t.map(c=>{if(c=Nh(c),c in Ec)return;Ec[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Bh,u||(h.as="script"),h.crossOrigin="",h.href=c,o&&h.setAttribute("nonce",o),document.head.appendChild(h),u)return new Promise((f,g)=>{h.addEventListener("load",f),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};const Kl="180",zh=0,Tc=1,Gh=2,ld=1,cd=2,zn=3,oi=0,$t=1,Sn=2,si=0,hs=1,ua=2,Ac=3,Rc=4,Hh=5,Ti=100,Vh=101,Wh=102,$h=103,qh=104,jh=200,Kh=201,Xh=202,Yh=203,Co=204,Po=205,Zh=206,Qh=207,Jh=208,ef=209,tf=210,nf=211,sf=212,rf=213,af=214,ko=0,Lo=1,Do=2,_s=3,Fo=4,Io=5,Uo=6,Bo=7,Xl=0,of=1,lf=2,ri=0,cf=1,uf=2,df=3,hf=4,ff=5,pf=6,mf=7,ud=300,vs=301,bs=302,No=303,Oo=304,wa=306,zo=1e3,Ci=1001,Go=1002,tn=1003,gf=1004,vr=1005,wn=1006,Na=1007,Pi=1008,Rn=1009,dd=1010,hd=1011,Zs=1012,Yl=1013,Fi=1014,En=1015,fr=1016,Zl=1017,Ql=1018,Qs=1020,fd=35902,pd=35899,md=1021,gd=1022,_n=1023,Js=1026,er=1027,Jl=1028,ec=1029,_d=1030,tc=1031,nc=1033,ea=33776,ta=33777,na=33778,ia=33779,Ho=35840,Vo=35841,Wo=35842,$o=35843,qo=36196,jo=37492,Ko=37496,Xo=37808,Yo=37809,Zo=37810,Qo=37811,Jo=37812,el=37813,tl=37814,nl=37815,il=37816,sl=37817,rl=37818,al=37819,ol=37820,ll=37821,cl=36492,ul=36494,dl=36495,hl=36283,fl=36284,pl=36285,ml=36286,_f=3200,vf=3201,vd=0,bf=1,ni="",an="srgb",xs="srgb-linear",da="linear",tt="srgb",Vi=7680,Cc=519,xf=512,yf=513,Sf=514,bd=515,Mf=516,wf=517,Ef=518,Tf=519,gl=35044,Pc="300 es",Tn=2e3,ha=2001;class Ts{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Oa=Math.PI/180,_l=180/Math.PI;function ai(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function Af(i,e){return(i%e+e)%e}function za(i,e,t){return(1-t)*i+t*e}function Mn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function nt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class pr{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3];const h=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(d!==v||l!==h||c!==f||u!==g){let m=1-o;const p=l*h+c*f+u*g+d*v,T=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const P=Math.sqrt(E),R=Math.atan2(P,p*T);m=Math.sin(m*R)/P,o=Math.sin(o*R)/P}const S=o*T;if(l=l*m+h*S,c=c*m+f*S,u=u*m+g*S,d=d*m+v*S,m===1-o){const P=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=P,c*=P,u*=P,d*=P}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*d+l*f-c*h,e[t+1]=l*g+u*h+c*d-o*f,e[t+2]=c*g+u*f+o*h-l*d,e[t+3]=u*g-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),d=o(r/2),h=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=a*d+this._w*h,this._x=n*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(kc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(kc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ga.copy(this).projectOnVector(e),this.sub(Ga)}reflect(e){return this.sub(Ga.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ga=new D,kc=new pr;class Be{constructor(e,t,n,s,r,a,o,l,c){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],T=s[1],E=s[4],S=s[7],P=s[2],R=s[5],L=s[8];return r[0]=a*v+o*T+l*P,r[3]=a*m+o*E+l*R,r[6]=a*p+o*S+l*L,r[1]=c*v+u*T+d*P,r[4]=c*m+u*E+d*R,r[7]=c*p+u*S+d*L,r[2]=h*v+f*T+g*P,r[5]=h*m+f*E+g*R,r[8]=h*p+f*S+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,f=c*r-a*l,g=t*d+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*c-u*n)*v,e[2]=(o*n-s*a)*v,e[3]=h*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ha.makeScale(e,t)),this}rotate(e){return this.premultiply(Ha.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ha.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ha=new Be;function xd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Rf(){const i=fa("canvas");return i.style.display="block",i}const Lc={};function tr(i){i in Lc||(Lc[i]=!0,console.warn(i))}function Cf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Dc=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fc=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Pf(){const i={enabled:!0,workingColorSpace:xs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===tt&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(s.r=fs(s.r),s.g=fs(s.g),s.b=fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ni?da:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return tr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return tr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[xs]:{primaries:e,whitePoint:n,transfer:da,toXYZ:Dc,fromXYZ:Fc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:e,whitePoint:n,transfer:tt,toXYZ:Dc,fromXYZ:Fc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),i}const Xe=Pf();function $n(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Wi;class kf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Wi===void 0&&(Wi=fa("canvas")),Wi.width=e.width,Wi.height=e.height;const s=Wi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Wi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=$n(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor($n(t[n]/255)*255):t[n]=$n(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Lf=0;class ic{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=ai(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Va(s[a].image)):r.push(Va(s[a]))}else r=Va(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Va(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?kf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Df=0;const Wa=new D;class Bt extends Ts{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,n=Ci,s=Ci,r=wn,a=Pi,o=_n,l=Rn,c=Bt.DEFAULT_ANISOTROPY,u=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=ai(),this.name="",this.source=new ic(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Wa).x}get height(){return this.source.getSize(Wa).y}get depth(){return this.source.getSize(Wa).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ud)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zo:e.x=e.x-Math.floor(e.x);break;case Ci:e.x=e.x<0?0:1;break;case Go:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zo:e.y=e.y-Math.floor(e.y);break;case Ci:e.y=e.y<0?0:1;break;case Go:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=ud;Bt.DEFAULT_ANISOTROPY=1;class bt{constructor(e=0,t=0,n=0,s=1){bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,S=(f+1)/2,P=(p+1)/2,R=(u+h)/4,L=(d+v)/4,B=(g+m)/4;return E>S&&E>P?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=R/n,r=L/n):S>P?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=R/s,r=B/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=L/r,s=B/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(d-v)/T,this.z=(h-u)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ff extends Ts{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Bt(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:wn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ic(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ii extends Ff{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class yd extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class If extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oi{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,un):un.fromBufferAttribute(r,a),un.applyMatrix4(e.matrixWorld),this.expandByPoint(un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),br.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),br.copy(n.boundingBox)),br.applyMatrix4(e.matrixWorld),this.union(br)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,un),un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ls),xr.subVectors(this.max,Ls),$i.subVectors(e.a,Ls),qi.subVectors(e.b,Ls),ji.subVectors(e.c,Ls),Kn.subVectors(qi,$i),Xn.subVectors(ji,qi),mi.subVectors($i,ji);let t=[0,-Kn.z,Kn.y,0,-Xn.z,Xn.y,0,-mi.z,mi.y,Kn.z,0,-Kn.x,Xn.z,0,-Xn.x,mi.z,0,-mi.x,-Kn.y,Kn.x,0,-Xn.y,Xn.x,0,-mi.y,mi.x,0];return!$a(t,$i,qi,ji,xr)||(t=[1,0,0,0,1,0,0,0,1],!$a(t,$i,qi,ji,xr))?!1:(yr.crossVectors(Kn,Xn),t=[yr.x,yr.y,yr.z],$a(t,$i,qi,ji,xr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Fn=[new D,new D,new D,new D,new D,new D,new D,new D],un=new D,br=new Oi,$i=new D,qi=new D,ji=new D,Kn=new D,Xn=new D,mi=new D,Ls=new D,xr=new D,yr=new D,gi=new D;function $a(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){gi.fromArray(i,r);const o=s.x*Math.abs(gi.x)+s.y*Math.abs(gi.y)+s.z*Math.abs(gi.z),l=e.dot(gi),c=t.dot(gi),u=n.dot(gi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Uf=new Oi,Ds=new D,qa=new D;class As{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Uf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ds.subVectors(e,this.center);const t=Ds.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ds,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ds.copy(e.center).add(qa)),this.expandByPoint(Ds.copy(e.center).sub(qa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const In=new D,ja=new D,Sr=new D,Yn=new D,Ka=new D,Mr=new D,Xa=new D;class sc{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ja.copy(e).add(t).multiplyScalar(.5),Sr.copy(t).sub(e).normalize(),Yn.copy(this.origin).sub(ja);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Sr),o=Yn.dot(this.direction),l=-Yn.dot(Sr),c=Yn.lengthSq(),u=Math.abs(1-a*a);let d,h,f,g;if(u>0)if(d=a*l-o,h=a*o-l,g=r*u,d>=0)if(h>=-g)if(h<=g){const v=1/u;d*=v,h*=v,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ja).addScaledVector(Sr,h),f}intersectSphere(e,t){In.subVectors(e.center,this.origin);const n=In.dot(this.direction),s=In.dot(In)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,n,s,r){Ka.subVectors(t,e),Mr.subVectors(n,e),Xa.crossVectors(Ka,Mr);let a=this.direction.dot(Xa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yn.subVectors(this.origin,e);const l=o*this.direction.dot(Mr.crossVectors(Yn,Mr));if(l<0)return null;const c=o*this.direction.dot(Ka.cross(Yn));if(c<0||l+c>a)return null;const u=-o*Yn.dot(Xa);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class it{constructor(e,t,n,s,r,a,o,l,c,u,d,h,f,g,v,m){it.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,d,h,f,g,v,m)}set(e,t,n,s,r,a,o,l,c,u,d,h,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new it().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ki.setFromMatrixColumn(e,0).length(),r=1/Ki.setFromMatrixColumn(e,1).length(),a=1/Ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=a*u,f=a*d,g=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,g=c*u,v=c*d;t[0]=h+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,g=c*u,v=c*d;t[0]=h-v*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,f=a*d,g=o*u,v=o*d;t[0]=l*u,t[4]=g*c-f,t[8]=h*c+v,t[1]=l*d,t[5]=v*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=v-h*d,t[8]=g*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+g,t[10]=h-v*d}else if(e.order==="XZY"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=a*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bf,e,Nf)}lookAt(e,t,n){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Zn.crossVectors(n,Xt),Zn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Zn.crossVectors(n,Xt)),Zn.normalize(),wr.crossVectors(Xt,Zn),s[0]=Zn.x,s[4]=wr.x,s[8]=Xt.x,s[1]=Zn.y,s[5]=wr.y,s[9]=Xt.y,s[2]=Zn.z,s[6]=wr.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],T=n[3],E=n[7],S=n[11],P=n[15],R=s[0],L=s[4],B=s[8],y=s[12],x=s[1],k=s[5],z=s[9],V=s[13],q=s[2],Y=s[6],$=s[10],ie=s[14],G=s[3],oe=s[7],de=s[11],Ee=s[15];return r[0]=a*R+o*x+l*q+c*G,r[4]=a*L+o*k+l*Y+c*oe,r[8]=a*B+o*z+l*$+c*de,r[12]=a*y+o*V+l*ie+c*Ee,r[1]=u*R+d*x+h*q+f*G,r[5]=u*L+d*k+h*Y+f*oe,r[9]=u*B+d*z+h*$+f*de,r[13]=u*y+d*V+h*ie+f*Ee,r[2]=g*R+v*x+m*q+p*G,r[6]=g*L+v*k+m*Y+p*oe,r[10]=g*B+v*z+m*$+p*de,r[14]=g*y+v*V+m*ie+p*Ee,r[3]=T*R+E*x+S*q+P*G,r[7]=T*L+E*k+S*Y+P*oe,r[11]=T*B+E*z+S*$+P*de,r[15]=T*y+E*V+S*ie+P*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*d-s*c*d-r*o*h+n*c*h+s*o*f-n*l*f)+v*(+t*l*f-t*c*h+r*a*h-s*a*f+s*c*u-r*l*u)+m*(+t*c*d-t*o*f-r*a*d+n*a*f+r*o*u-n*c*u)+p*(-s*o*u-t*l*d+t*o*h+s*a*d-n*a*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],T=d*m*c-v*h*c+v*l*f-o*m*f-d*l*p+o*h*p,E=g*h*c-u*m*c-g*l*f+a*m*f+u*l*p-a*h*p,S=u*v*c-g*d*c+g*o*f-a*v*f-u*o*p+a*d*p,P=g*d*l-u*v*l-g*o*h+a*v*h+u*o*m-a*d*m,R=t*T+n*E+s*S+r*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/R;return e[0]=T*L,e[1]=(v*h*r-d*m*r-v*s*f+n*m*f+d*s*p-n*h*p)*L,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*L,e[3]=(d*l*r-o*h*r-d*s*c+n*h*c+o*s*f-n*l*f)*L,e[4]=E*L,e[5]=(u*m*r-g*h*r+g*s*f-t*m*f-u*s*p+t*h*p)*L,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*L,e[7]=(a*h*r-u*l*r+u*s*c-t*h*c-a*s*f+t*l*f)*L,e[8]=S*L,e[9]=(g*d*r-u*v*r-g*n*f+t*v*f+u*n*p-t*d*p)*L,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*p+t*o*p)*L,e[11]=(u*o*r-a*d*r-u*n*c+t*d*c+a*n*f-t*o*f)*L,e[12]=P*L,e[13]=(u*v*s-g*d*s+g*n*h-t*v*h-u*n*m+t*d*m)*L,e[14]=(g*o*s-a*v*s-g*n*l+t*v*l+a*n*m-t*o*m)*L,e[15]=(a*d*s-u*o*s+u*n*l-t*d*l-a*n*h+t*o*h)*L,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,f=r*u,g=r*d,v=a*u,m=a*d,p=o*d,T=l*c,E=l*u,S=l*d,P=n.x,R=n.y,L=n.z;return s[0]=(1-(v+p))*P,s[1]=(f+S)*P,s[2]=(g-E)*P,s[3]=0,s[4]=(f-S)*R,s[5]=(1-(h+p))*R,s[6]=(m+T)*R,s[7]=0,s[8]=(g+E)*L,s[9]=(m-T)*L,s[10]=(1-(h+v))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ki.set(s[0],s[1],s[2]).length();const a=Ki.set(s[4],s[5],s[6]).length(),o=Ki.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],dn.copy(this);const c=1/r,u=1/a,d=1/o;return dn.elements[0]*=c,dn.elements[1]*=c,dn.elements[2]*=c,dn.elements[4]*=u,dn.elements[5]*=u,dn.elements[6]*=u,dn.elements[8]*=d,dn.elements[9]*=d,dn.elements[10]*=d,t.setFromRotationMatrix(dn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Tn,l=!1){const c=this.elements,u=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===Tn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===ha)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Tn,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-s),h=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===Tn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===ha)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ki=new D,dn=new it,Bf=new D(0,0,0),Nf=new D(1,1,1),Zn=new D,wr=new D,Xt=new D,Ic=new it,Uc=new pr;class Cn{constructor(e=0,t=0,n=0,s=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ic.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ic,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Uc.setFromEuler(this),this.setFromQuaternion(Uc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class rc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Of=0;const Bc=new D,Xi=new pr,Un=new it,Er=new D,Fs=new D,zf=new D,Gf=new pr,Nc=new D(1,0,0),Oc=new D(0,1,0),zc=new D(0,0,1),Gc={type:"added"},Hf={type:"removed"},Yi={type:"childadded",child:null},Ya={type:"childremoved",child:null};class At extends Ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new D,t=new Cn,n=new pr,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new Be}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.premultiply(Xi),this}rotateX(e){return this.rotateOnAxis(Nc,e)}rotateY(e){return this.rotateOnAxis(Oc,e)}rotateZ(e){return this.rotateOnAxis(zc,e)}translateOnAxis(e,t){return Bc.copy(e).applyQuaternion(this.quaternion),this.position.add(Bc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nc,e)}translateY(e){return this.translateOnAxis(Oc,e)}translateZ(e){return this.translateOnAxis(zc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Er.copy(e):Er.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Fs,Er,this.up):Un.lookAt(Er,Fs,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),Xi.setFromRotationMatrix(Un),this.quaternion.premultiply(Xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gc),Yi.child=e,this.dispatchEvent(Yi),Yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hf),Ya.child=e,this.dispatchEvent(Ya),Ya.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Un.multiply(e.parent.matrixWorld)),e.applyMatrix4(Un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gc),Yi.child=e,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,e,zf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,Gf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}At.DEFAULT_UP=new D(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hn=new D,Bn=new D,Za=new D,Nn=new D,Zi=new D,Qi=new D,Hc=new D,Qa=new D,Ja=new D,eo=new D,to=new bt,no=new bt,io=new bt;class on{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),hn.subVectors(e,t),s.cross(hn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){hn.subVectors(s,t),Bn.subVectors(n,t),Za.subVectors(e,t);const a=hn.dot(hn),o=hn.dot(Bn),l=hn.dot(Za),c=Bn.dot(Bn),u=Bn.dot(Za),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const h=1/d,f=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Nn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Nn.x),l.addScaledVector(a,Nn.y),l.addScaledVector(o,Nn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return to.setScalar(0),no.setScalar(0),io.setScalar(0),to.fromBufferAttribute(e,t),no.fromBufferAttribute(e,n),io.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(to,r.x),a.addScaledVector(no,r.y),a.addScaledVector(io,r.z),a}static isFrontFacing(e,t,n,s){return hn.subVectors(n,t),Bn.subVectors(e,t),hn.cross(Bn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),hn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return on.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Zi.subVectors(s,n),Qi.subVectors(r,n),Qa.subVectors(e,n);const l=Zi.dot(Qa),c=Qi.dot(Qa);if(l<=0&&c<=0)return t.copy(n);Ja.subVectors(e,s);const u=Zi.dot(Ja),d=Qi.dot(Ja);if(u>=0&&d<=u)return t.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Zi,a);eo.subVectors(e,r);const f=Zi.dot(eo),g=Qi.dot(eo);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Qi,o);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return Hc.subVectors(r,s),o=(d-u)/(d-u+(f-g)),t.copy(s).addScaledVector(Hc,o);const p=1/(m+v+h);return a=v*p,o=h*p,t.copy(n).addScaledVector(Zi,a).addScaledVector(Qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Sd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},Tr={h:0,s:0,l:0};function so(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Xe.workingColorSpace){if(e=Af(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=so(a,r,e+1/3),this.g=so(a,r,e),this.b=so(a,r,e-1/3)}return Xe.colorSpaceToWorking(this,s),this}setStyle(e,t=an){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){const n=Sd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$n(e.r),this.g=$n(e.g),this.b=$n(e.b),this}copyLinearToSRGB(e){return this.r=fs(e.r),this.g=fs(e.g),this.b=fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return Xe.workingToColorSpace(It.copy(this),e),Math.round($e(It.r*255,0,255))*65536+Math.round($e(It.g*255,0,255))*256+Math.round($e(It.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.workingToColorSpace(It.copy(this),t);const n=It.r,s=It.g,r=It.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Xe.workingColorSpace){return Xe.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=an){Xe.workingToColorSpace(It.copy(this),e);const t=It.r,n=It.g,s=It.b;return e!==an?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(Tr);const n=za(Qn.h,Tr.h,t),s=za(Qn.s,Tr.s,t),r=za(Qn.l,Tr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new De;De.NAMES=Sd;let Vf=0;class zi extends Ts{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=ai(),this.name="",this.type="Material",this.blending=hs,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Co,this.blendDst=Po,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(n.blending=this.blending),this.side!==oi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Co&&(n.blendSrc=this.blendSrc),this.blendDst!==Po&&(n.blendDst=this.blendDst),this.blendEquation!==Ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_s&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ea extends zi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=Xl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new D,Ar=new ze;let Wf=0;class qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=gl,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ar.fromBufferAttribute(this,t),Ar.applyMatrix3(e),this.setXY(t,Ar.x,Ar.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gl&&(e.usage=this.usage),e}}class Md extends qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class wd extends qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class An extends qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let $f=0;const rn=new it,ro=new At,Ji=new D,Yt=new Oi,Is=new Oi,kt=new D;class bn extends Ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xd(e)?wd:Md)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Be().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return rn.makeRotationFromQuaternion(e),this.applyMatrix4(rn),this}rotateX(e){return rn.makeRotationX(e),this.applyMatrix4(rn),this}rotateY(e){return rn.makeRotationY(e),this.applyMatrix4(rn),this}rotateZ(e){return rn.makeRotationZ(e),this.applyMatrix4(rn),this}translate(e,t,n){return rn.makeTranslation(e,t,n),this.applyMatrix4(rn),this}scale(e,t,n){return rn.makeScale(e,t,n),this.applyMatrix4(rn),this}lookAt(e){return ro.lookAt(e),ro.updateMatrix(),this.applyMatrix4(ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new An(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Oi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Yt.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,Yt.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,Yt.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(Yt.min),this.boundingBox.expandByPoint(Yt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new As);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(Yt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Is.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(Yt.min,Is.min),Yt.expandByPoint(kt),kt.addVectors(Yt.max,Is.max),Yt.expandByPoint(kt)):(Yt.expandByPoint(Is.min),Yt.expandByPoint(Is.max))}Yt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)kt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(kt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)kt.fromBufferAttribute(o,c),l&&(Ji.fromBufferAttribute(e,c),kt.add(Ji)),s=Math.max(s,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let B=0;B<n.count;B++)o[B]=new D,l[B]=new D;const c=new D,u=new D,d=new D,h=new ze,f=new ze,g=new ze,v=new D,m=new D;function p(B,y,x){c.fromBufferAttribute(n,B),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,x),h.fromBufferAttribute(r,B),f.fromBufferAttribute(r,y),g.fromBufferAttribute(r,x),u.sub(c),d.sub(c),f.sub(h),g.sub(h);const k=1/(f.x*g.y-g.x*f.y);isFinite(k)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(k),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(k),o[B].add(v),o[y].add(v),o[x].add(v),l[B].add(m),l[y].add(m),l[x].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let B=0,y=T.length;B<y;++B){const x=T[B],k=x.start,z=x.count;for(let V=k,q=k+z;V<q;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const E=new D,S=new D,P=new D,R=new D;function L(B){P.fromBufferAttribute(s,B),R.copy(P);const y=o[B];E.copy(y),E.sub(P.multiplyScalar(P.dot(y))).normalize(),S.crossVectors(R,y);const k=S.dot(l[B])<0?-1:1;a.setXYZW(B,E.x,E.y,E.z,k)}for(let B=0,y=T.length;B<y;++B){const x=T[B],k=x.start,z=x.count;for(let V=k,q=k+z;V<q;V+=3)L(e.getX(V+0)),L(e.getX(V+1)),L(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,u=new D,d=new D;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let p=0;p<u;p++)h[g++]=c[f++]}return new qt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vc=new it,_i=new sc,Rr=new As,Wc=new D,Cr=new D,Pr=new D,kr=new D,ao=new D,Lr=new D,$c=new D,Dr=new D;class Ut extends At{constructor(e=new bn,t=new Ea){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Lr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],d=r[l];u!==0&&(ao.fromBufferAttribute(d,e),a?Lr.addScaledVector(ao,u):Lr.addScaledVector(ao.sub(t),u))}t.add(Lr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(r),_i.copy(e.ray).recast(e.near),!(Rr.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Rr,Wc)===null||_i.origin.distanceToSquared(Wc)>(e.far-e.near)**2))&&(Vc.copy(r).invert(),_i.copy(e.ray).applyMatrix4(Vc),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,_i)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=T,P=E;S<P;S+=3){const R=o.getX(S),L=o.getX(S+1),B=o.getX(S+2);s=Fr(this,p,e,n,c,u,d,R,L,B),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=o.getX(m),E=o.getX(m+1),S=o.getX(m+2);s=Fr(this,a,e,n,c,u,d,T,E,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=T,P=E;S<P;S+=3){const R=S,L=S+1,B=S+2;s=Fr(this,p,e,n,c,u,d,R,L,B),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=m,E=m+1,S=m+2;s=Fr(this,a,e,n,c,u,d,T,E,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function qf(i,e,t,n,s,r,a,o){let l;if(e.side===$t?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===oi,o),l===null)return null;Dr.copy(o),Dr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Dr);return c<t.near||c>t.far?null:{distance:c,point:Dr.clone(),object:i}}function Fr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Cr),i.getVertexPosition(l,Pr),i.getVertexPosition(c,kr);const u=qf(i,e,t,n,Cr,Pr,kr,$c);if(u){const d=new D;on.getBarycoord($c,Cr,Pr,kr,d),s&&(u.uv=on.getInterpolatedAttribute(s,o,l,c,d,new ze)),r&&(u.uv1=on.getInterpolatedAttribute(r,o,l,c,d,new ze)),a&&(u.normal=on.getInterpolatedAttribute(a,o,l,c,d,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new D,materialIndex:0};on.getNormal(Cr,Pr,kr,h.normal),u.face=h,u.barycoord=d}return u}class li extends bn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new An(c,3)),this.setAttribute("normal",new An(u,3)),this.setAttribute("uv",new An(d,2));function g(v,m,p,T,E,S,P,R,L,B,y){const x=S/L,k=P/B,z=S/2,V=P/2,q=R/2,Y=L+1,$=B+1;let ie=0,G=0;const oe=new D;for(let de=0;de<$;de++){const Ee=de*k-V;for(let Ge=0;Ge<Y;Ge++){const rt=Ge*x-z;oe[v]=rt*T,oe[m]=Ee*E,oe[p]=q,c.push(oe.x,oe.y,oe.z),oe[v]=0,oe[m]=0,oe[p]=R>0?1:-1,u.push(oe.x,oe.y,oe.z),d.push(Ge/L),d.push(1-de/B),ie+=1}}for(let de=0;de<B;de++)for(let Ee=0;Ee<L;Ee++){const Ge=h+Ee+Y*de,rt=h+Ee+Y*(de+1),lt=h+(Ee+1)+Y*(de+1),Ye=h+(Ee+1)+Y*de;l.push(Ge,rt,Ye),l.push(rt,lt,Ye),G+=6}o.addGroup(f,G,y),f+=G,h+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new li(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ys(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function zt(i){const e={};for(let t=0;t<i.length;t++){const n=ys(i[t]);for(const s in n)e[s]=n[s]}return e}function jf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ed(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const Kf={clone:ys,merge:zt};var Xf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends zi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xf,this.fragmentShader=Yf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ys(e.uniforms),this.uniformsGroups=jf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Td extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Jn=new D,qc=new ze,jc=new ze;class gn extends Td{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_l*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Oa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _l*2*Math.atan(Math.tan(Oa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Jn.x,Jn.y).multiplyScalar(-e/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Jn.x,Jn.y).multiplyScalar(-e/Jn.z)}getViewSize(e,t){return this.getViewBounds(e,qc,jc),t.subVectors(jc,qc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Oa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const es=-90,ts=1;class Zf extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new gn(es,ts,e,t);s.layers=this.layers,this.add(s);const r=new gn(es,ts,e,t);r.layers=this.layers,this.add(r);const a=new gn(es,ts,e,t);a.layers=this.layers,this.add(a);const o=new gn(es,ts,e,t);o.layers=this.layers,this.add(o);const l=new gn(es,ts,e,t);l.layers=this.layers,this.add(l);const c=new gn(es,ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ha)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ad extends Bt{constructor(e=[],t=vs,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qf extends Ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ad(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new li(5,5,5),r=new ci({name:"CubemapFromEquirect",uniforms:ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:si});r.uniforms.tEquirect.value=t;const a=new Ut(s,r),o=t.minFilter;return t.minFilter===Pi&&(t.minFilter=wn),new Zf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class en extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jf={type:"move"};class oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new en,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new en,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new en,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new en;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ep extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class tp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=gl,this.updateRanges=[],this.version=0,this.uuid=ai()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ot=new D;class pa{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Mn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new pa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ac extends zi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ns;const Us=new D,is=new D,ss=new D,rs=new ze,Bs=new ze,Rd=new it,Ir=new D,Ns=new D,Ur=new D,Kc=new ze,lo=new ze,Xc=new ze;class Cd extends At{constructor(e=new ac){if(super(),this.isSprite=!0,this.type="Sprite",ns===void 0){ns=new bn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new tp(t,5);ns.setIndex([0,1,2,0,2,3]),ns.setAttribute("position",new pa(n,3,0,!1)),ns.setAttribute("uv",new pa(n,2,3,!1))}this.geometry=ns,this.material=e,this.center=new ze(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),is.setFromMatrixScale(this.matrixWorld),Rd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ss.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&is.multiplyScalar(-ss.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Br(Ir.set(-.5,-.5,0),ss,a,is,s,r),Br(Ns.set(.5,-.5,0),ss,a,is,s,r),Br(Ur.set(.5,.5,0),ss,a,is,s,r),Kc.set(0,0),lo.set(1,0),Xc.set(1,1);let o=e.ray.intersectTriangle(Ir,Ns,Ur,!1,Us);if(o===null&&(Br(Ns.set(-.5,.5,0),ss,a,is,s,r),lo.set(0,1),o=e.ray.intersectTriangle(Ir,Ur,Ns,!1,Us),o===null))return;const l=e.ray.origin.distanceTo(Us);l<e.near||l>e.far||t.push({distance:l,point:Us.clone(),uv:on.getInterpolation(Us,Ir,Ns,Ur,Kc,lo,Xc,new ze),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Br(i,e,t,n,s,r){rs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Bs.x=r*rs.x-s*rs.y,Bs.y=s*rs.x+r*rs.y):Bs.copy(rs),i.copy(e),i.x+=Bs.x,i.y+=Bs.y,i.applyMatrix4(Rd)}class np extends Bt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=tn,u=tn,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yc extends qt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const as=new it,Zc=new it,Nr=[],Qc=new Oi,ip=new it,Os=new Ut,zs=new As;class Jc extends Ut{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Yc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,ip)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Oi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,as),Qc.copy(e.boundingBox).applyMatrix4(as),this.boundingBox.union(Qc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new As),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,as),zs.copy(e.boundingSphere).applyMatrix4(as),this.boundingSphere.union(zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Os.geometry=this.geometry,Os.material=this.material,Os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(n),e.ray.intersectsSphere(zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,as),Zc.multiplyMatrices(n,as),Os.matrixWorld=Zc,Os.raycast(e,Nr);for(let a=0,o=Nr.length;a<o;a++){const l=Nr[a];l.instanceId=r,l.object=this,t.push(l)}Nr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Yc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new np(new Float32Array(s*this.count),s,this.count,Jl,En));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const co=new D,sp=new D,rp=new Be;class Mi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=co.subVectors(n,t).cross(sp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(co),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||rp.getNormalMatrix(e),s=this.coplanarPoint(co).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vi=new As,ap=new ze(.5,.5),Or=new D;class oc{constructor(e=new Mi,t=new Mi,n=new Mi,s=new Mi,r=new Mi,a=new Mi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],T=r[12],E=r[13],S=r[14],P=r[15];if(s[0].setComponents(c-a,f-u,p-g,P-T).normalize(),s[1].setComponents(c+a,f+u,p+g,P+T).normalize(),s[2].setComponents(c+o,f+d,p+v,P+E).normalize(),s[3].setComponents(c-o,f-d,p-v,P-E).normalize(),n)s[4].setComponents(l,h,m,S).normalize(),s[5].setComponents(c-l,f-h,p-m,P-S).normalize();else if(s[4].setComponents(c-l,f-h,p-m,P-S).normalize(),t===Tn)s[5].setComponents(c+l,f+h,p+m,P+S).normalize();else if(t===ha)s[5].setComponents(l,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(e){vi.center.set(0,0,0);const t=ap.distanceTo(e.center);return vi.radius=.7071067811865476+t,vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Or.x=s.normal.x>0?e.max.x:e.min.x,Or.y=s.normal.y>0?e.max.y:e.min.y,Or.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Or)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Pd extends zi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const eu=new it,vl=new sc,zr=new As,Gr=new D;class op extends At{constructor(e=new bn,t=new Pd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(s),zr.radius+=r,e.ray.intersectsSphere(zr)===!1)return;eu.copy(s).invert(),vl.copy(e.ray).applyMatrix4(eu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=h,v=f;g<v;g++){const m=c.getX(g);Gr.fromBufferAttribute(d,m),tu(Gr,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=h,v=f;g<v;g++)Gr.fromBufferAttribute(d,g),tu(Gr,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function tu(i,e,t,n,s,r,a){const o=vl.distanceSqToPoint(i);if(o<t){const l=new D;vl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class kd extends Bt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ld extends Bt{constructor(e,t,n=Fi,s,r,a,o=tn,l=tn,c,u=Js,d=1){if(u!==Js&&u!==er)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ic(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Dd extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Rs extends bn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<u;p++){const T=p*h-a;for(let E=0;E<c;E++){const S=E*d-r;g.push(S,-T,0),v.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const E=T+c*p,S=T+c*(p+1),P=T+1+c*(p+1),R=T+1+c*p;f.push(E,S,R),f.push(S,P,R)}this.setIndex(f),this.setAttribute("position",new An(g,3)),this.setAttribute("normal",new An(v,3)),this.setAttribute("uv",new An(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.width,e.height,e.widthSegments,e.heightSegments)}}class js extends zi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vd,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=Xl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class lp extends zi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_f,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cp extends zi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Fd extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class up extends Fd{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const uo=new it,nu=new D,iu=new D;class dp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=Rn,this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oc,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;nu.setFromMatrixPosition(e.matrixWorld),t.position.copy(nu),iu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(iu),t.updateMatrixWorld(),uo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class lc extends Td{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class hp extends dp{constructor(){super(new lc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class su extends Fd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new hp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class fp extends gn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ru=new it;class pp{constructor(e,t,n=0,s=1/0){this.ray=new sc(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new rc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ru.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ru),this}intersectObject(e,t=!0,n=[]){return bl(e,this,n,t),n.sort(au),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)bl(e[s],this,n,t);return n.sort(au),n}}function au(i,e){return i.distance-e.distance}function bl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)bl(r[a],e,t,!0)}}function ou(i,e,t,n){const s=mp(n);switch(t){case md:return i*e;case Jl:return i*e/s.components*s.byteLength;case ec:return i*e/s.components*s.byteLength;case _d:return i*e*2/s.components*s.byteLength;case tc:return i*e*2/s.components*s.byteLength;case gd:return i*e*3/s.components*s.byteLength;case _n:return i*e*4/s.components*s.byteLength;case nc:return i*e*4/s.components*s.byteLength;case ea:case ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case na:case ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Vo:case $o:return Math.max(i,16)*Math.max(e,8)/4;case Ho:case Wo:return Math.max(i,8)*Math.max(e,8)/2;case qo:case jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ko:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Yo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Jo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case el:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case tl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case nl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case il:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case sl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case rl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case al:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ol:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ll:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case cl:case ul:case dl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case hl:case fl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case pl:case ml:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mp(i){switch(i){case Rn:case dd:return{byteLength:1,components:1};case Zs:case hd:case fr:return{byteLength:2,components:1};case Zl:case Ql:return{byteLength:2,components:4};case Fi:case Yl:case En:return{byteLength:4,components:1};case fd:case pd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Kl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Kl);function Id(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function gp(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<d.length;f++){const g=d[h],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,d[h]=v)}d.length=h+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var _p=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vp=`#ifdef USE_ALPHAHASH
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
#endif`,bp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mp=`#ifdef USE_AOMAP
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
#endif`,wp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ep=`#ifdef USE_BATCHING
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
#endif`,Tp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ap=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pp=`#ifdef USE_IRIDESCENCE
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
#endif`,kp=`#ifdef USE_BUMPMAP
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
#endif`,Lp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ip=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Up=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Np=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Op=`#if defined( USE_COLOR_ALPHA )
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
#endif`,zp=`#define PI 3.141592653589793
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
} // validated`,Gp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hp=`vec3 transformedNormal = objectNormal;
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
#endif`,Vp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$p=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xp=`#ifdef USE_ENVMAP
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
#endif`,Yp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zp=`#ifdef USE_ENVMAP
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
#endif`,Qp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jp=`#ifdef USE_ENVMAP
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
#endif`,em=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,im=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sm=`#ifdef USE_GRADIENTMAP
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
}`,rm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,am=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,om=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lm=`uniform bool receiveShadow;
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
#endif`,cm=`#ifdef USE_ENVMAP
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
#endif`,um=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pm=`PhysicalMaterial material;
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
#endif`,mm=`struct PhysicalMaterial {
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
}`,gm=`
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
#endif`,_m=`#if defined( RE_IndirectDiffuse )
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
#endif`,vm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ym=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Em=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tm=`#if defined( USE_POINTS_UV )
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
#endif`,Am=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,km=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lm=`#ifdef USE_MORPHTARGETS
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
#endif`,Dm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Im=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Um=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Om=`#ifdef USE_NORMALMAP
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
#endif`,zm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$m=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Km=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ym=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,eg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tg=`float getShadowMask() {
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
}`,ng=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ig=`#ifdef USE_SKINNING
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
#endif`,sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rg=`#ifdef USE_SKINNING
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
#endif`,ag=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,og=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ug=`#ifdef USE_TRANSMISSION
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
#endif`,dg=`#ifdef USE_TRANSMISSION
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
#endif`,hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_g=`uniform sampler2D t2D;
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
}`,vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sg=`#include <common>
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
}`,Mg=`#if DEPTH_PACKING == 3200
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
}`,wg=`#define DISTANCE
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
}`,Eg=`#define DISTANCE
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
}`,Tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`uniform float scale;
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
}`,Cg=`uniform vec3 diffuse;
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
}`,Pg=`#include <common>
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
}`,kg=`uniform vec3 diffuse;
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
}`,Lg=`#define LAMBERT
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
}`,Dg=`#define LAMBERT
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
}`,Fg=`#define MATCAP
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
}`,Ig=`#define MATCAP
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
}`,Ug=`#define NORMAL
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
}`,Bg=`#define NORMAL
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
}`,Ng=`#define PHONG
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
}`,Og=`#define PHONG
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
}`,zg=`#define STANDARD
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
}`,Gg=`#define STANDARD
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
}`,Hg=`#define TOON
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
}`,Vg=`#define TOON
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
}`,Wg=`uniform float size;
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
}`,$g=`uniform vec3 diffuse;
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
}`,qg=`#include <common>
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
}`,jg=`uniform vec3 color;
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
}`,Kg=`uniform float rotation;
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
}`,Xg=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:_p,alphahash_pars_fragment:vp,alphamap_fragment:bp,alphamap_pars_fragment:xp,alphatest_fragment:yp,alphatest_pars_fragment:Sp,aomap_fragment:Mp,aomap_pars_fragment:wp,batching_pars_vertex:Ep,batching_vertex:Tp,begin_vertex:Ap,beginnormal_vertex:Rp,bsdfs:Cp,iridescence_fragment:Pp,bumpmap_pars_fragment:kp,clipping_planes_fragment:Lp,clipping_planes_pars_fragment:Dp,clipping_planes_pars_vertex:Fp,clipping_planes_vertex:Ip,color_fragment:Up,color_pars_fragment:Bp,color_pars_vertex:Np,color_vertex:Op,common:zp,cube_uv_reflection_fragment:Gp,defaultnormal_vertex:Hp,displacementmap_pars_vertex:Vp,displacementmap_vertex:Wp,emissivemap_fragment:$p,emissivemap_pars_fragment:qp,colorspace_fragment:jp,colorspace_pars_fragment:Kp,envmap_fragment:Xp,envmap_common_pars_fragment:Yp,envmap_pars_fragment:Zp,envmap_pars_vertex:Qp,envmap_physical_pars_fragment:cm,envmap_vertex:Jp,fog_vertex:em,fog_pars_vertex:tm,fog_fragment:nm,fog_pars_fragment:im,gradientmap_pars_fragment:sm,lightmap_pars_fragment:rm,lights_lambert_fragment:am,lights_lambert_pars_fragment:om,lights_pars_begin:lm,lights_toon_fragment:um,lights_toon_pars_fragment:dm,lights_phong_fragment:hm,lights_phong_pars_fragment:fm,lights_physical_fragment:pm,lights_physical_pars_fragment:mm,lights_fragment_begin:gm,lights_fragment_maps:_m,lights_fragment_end:vm,logdepthbuf_fragment:bm,logdepthbuf_pars_fragment:xm,logdepthbuf_pars_vertex:ym,logdepthbuf_vertex:Sm,map_fragment:Mm,map_pars_fragment:wm,map_particle_fragment:Em,map_particle_pars_fragment:Tm,metalnessmap_fragment:Am,metalnessmap_pars_fragment:Rm,morphinstance_vertex:Cm,morphcolor_vertex:Pm,morphnormal_vertex:km,morphtarget_pars_vertex:Lm,morphtarget_vertex:Dm,normal_fragment_begin:Fm,normal_fragment_maps:Im,normal_pars_fragment:Um,normal_pars_vertex:Bm,normal_vertex:Nm,normalmap_pars_fragment:Om,clearcoat_normal_fragment_begin:zm,clearcoat_normal_fragment_maps:Gm,clearcoat_pars_fragment:Hm,iridescence_pars_fragment:Vm,opaque_fragment:Wm,packing:$m,premultiplied_alpha_fragment:qm,project_vertex:jm,dithering_fragment:Km,dithering_pars_fragment:Xm,roughnessmap_fragment:Ym,roughnessmap_pars_fragment:Zm,shadowmap_pars_fragment:Qm,shadowmap_pars_vertex:Jm,shadowmap_vertex:eg,shadowmask_pars_fragment:tg,skinbase_vertex:ng,skinning_pars_vertex:ig,skinning_vertex:sg,skinnormal_vertex:rg,specularmap_fragment:ag,specularmap_pars_fragment:og,tonemapping_fragment:lg,tonemapping_pars_fragment:cg,transmission_fragment:ug,transmission_pars_fragment:dg,uv_pars_fragment:hg,uv_pars_vertex:fg,uv_vertex:pg,worldpos_vertex:mg,background_vert:gg,background_frag:_g,backgroundCube_vert:vg,backgroundCube_frag:bg,cube_vert:xg,cube_frag:yg,depth_vert:Sg,depth_frag:Mg,distanceRGBA_vert:wg,distanceRGBA_frag:Eg,equirect_vert:Tg,equirect_frag:Ag,linedashed_vert:Rg,linedashed_frag:Cg,meshbasic_vert:Pg,meshbasic_frag:kg,meshlambert_vert:Lg,meshlambert_frag:Dg,meshmatcap_vert:Fg,meshmatcap_frag:Ig,meshnormal_vert:Ug,meshnormal_frag:Bg,meshphong_vert:Ng,meshphong_frag:Og,meshphysical_vert:zg,meshphysical_frag:Gg,meshtoon_vert:Hg,meshtoon_frag:Vg,points_vert:Wg,points_frag:$g,shadow_vert:qg,shadow_frag:jg,sprite_vert:Kg,sprite_frag:Xg},ae={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},yn={basic:{uniforms:zt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:zt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new De(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:zt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:zt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:zt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new De(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:zt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:zt([ae.points,ae.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:zt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:zt([ae.common,ae.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:zt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:zt([ae.sprite,ae.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:zt([ae.common,ae.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:zt([ae.lights,ae.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};yn.physical={uniforms:zt([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Hr={r:0,b:0,g:0},bi=new Cn,Yg=new it;function Zg(i,e,t,n,s,r,a){const o=new De(0);let l=r===!0?0:1,c,u,d=null,h=0,f=null;function g(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?t:e).get(S)),S}function v(E){let S=!1;const P=g(E);P===null?p(o,l):P&&P.isColor&&(p(P,1),S=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,S){const P=g(S);P&&(P.isCubeTexture||P.mapping===wa)?(u===void 0&&(u=new Ut(new li(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:ys(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,L,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),bi.copy(S.backgroundRotation),bi.x*=-1,bi.y*=-1,bi.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(bi.y*=-1,bi.z*=-1),u.material.uniforms.envMap.value=P,u.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Yg.makeRotationFromEuler(bi)),u.material.toneMapped=Xe.getTransfer(P.colorSpace)!==tt,(d!==P||h!==P.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=P,h=P.version,f=i.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new Ut(new Rs(2,2),new ci({name:"BackgroundMaterial",uniforms:ys(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Xe.getTransfer(P.colorSpace)!==tt,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(d!==P||h!==P.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=P,h=P.version,f=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,S){E.getRGB(Hr,Ed(i)),n.buffers.color.setClear(Hr.r,Hr.g,Hr.b,S,a)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,S=1){o.set(E),l=S,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(o,l)},render:v,addToRenderList:m,dispose:T}}function Qg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(x,k,z,V,q){let Y=!1;const $=d(V,z,k);r!==$&&(r=$,c(r.object)),Y=f(x,V,z,q),Y&&g(x,V,z,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,S(x,k,z,V),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function u(x){return i.deleteVertexArray(x)}function d(x,k,z){const V=z.wireframe===!0;let q=n[x.id];q===void 0&&(q={},n[x.id]=q);let Y=q[k.id];Y===void 0&&(Y={},q[k.id]=Y);let $=Y[V];return $===void 0&&($=h(l()),Y[V]=$),$}function h(x){const k=[],z=[],V=[];for(let q=0;q<t;q++)k[q]=0,z[q]=0,V[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:z,attributeDivisors:V,object:x,attributes:{},index:null}}function f(x,k,z,V){const q=r.attributes,Y=k.attributes;let $=0;const ie=z.getAttributes();for(const G in ie)if(ie[G].location>=0){const de=q[G];let Ee=Y[G];if(Ee===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(Ee=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(Ee=x.instanceColor)),de===void 0||de.attribute!==Ee||Ee&&de.data!==Ee.data)return!0;$++}return r.attributesNum!==$||r.index!==V}function g(x,k,z,V){const q={},Y=k.attributes;let $=0;const ie=z.getAttributes();for(const G in ie)if(ie[G].location>=0){let de=Y[G];de===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(de=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(de=x.instanceColor));const Ee={};Ee.attribute=de,de&&de.data&&(Ee.data=de.data),q[G]=Ee,$++}r.attributes=q,r.attributesNum=$,r.index=V}function v(){const x=r.newAttributes;for(let k=0,z=x.length;k<z;k++)x[k]=0}function m(x){p(x,0)}function p(x,k){const z=r.newAttributes,V=r.enabledAttributes,q=r.attributeDivisors;z[x]=1,V[x]===0&&(i.enableVertexAttribArray(x),V[x]=1),q[x]!==k&&(i.vertexAttribDivisor(x,k),q[x]=k)}function T(){const x=r.newAttributes,k=r.enabledAttributes;for(let z=0,V=k.length;z<V;z++)k[z]!==x[z]&&(i.disableVertexAttribArray(z),k[z]=0)}function E(x,k,z,V,q,Y,$){$===!0?i.vertexAttribIPointer(x,k,z,q,Y):i.vertexAttribPointer(x,k,z,V,q,Y)}function S(x,k,z,V){v();const q=V.attributes,Y=z.getAttributes(),$=k.defaultAttributeValues;for(const ie in Y){const G=Y[ie];if(G.location>=0){let oe=q[ie];if(oe===void 0&&(ie==="instanceMatrix"&&x.instanceMatrix&&(oe=x.instanceMatrix),ie==="instanceColor"&&x.instanceColor&&(oe=x.instanceColor)),oe!==void 0){const de=oe.normalized,Ee=oe.itemSize,Ge=e.get(oe);if(Ge===void 0)continue;const rt=Ge.buffer,lt=Ge.type,Ye=Ge.bytesPerElement,j=lt===i.INT||lt===i.UNSIGNED_INT||oe.gpuType===Yl;if(oe.isInterleavedBufferAttribute){const Q=oe.data,me=Q.stride,Le=oe.offset;if(Q.isInstancedInterleavedBuffer){for(let we=0;we<G.locationSize;we++)p(G.location+we,Q.meshPerAttribute);x.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let we=0;we<G.locationSize;we++)m(G.location+we);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let we=0;we<G.locationSize;we++)E(G.location+we,Ee/G.locationSize,lt,de,me*Ye,(Le+Ee/G.locationSize*we)*Ye,j)}else{if(oe.isInstancedBufferAttribute){for(let Q=0;Q<G.locationSize;Q++)p(G.location+Q,oe.meshPerAttribute);x.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Q=0;Q<G.locationSize;Q++)m(G.location+Q);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let Q=0;Q<G.locationSize;Q++)E(G.location+Q,Ee/G.locationSize,lt,de,Ee*Ye,Ee/G.locationSize*Q*Ye,j)}}else if($!==void 0){const de=$[ie];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(G.location,de);break;case 3:i.vertexAttrib3fv(G.location,de);break;case 4:i.vertexAttrib4fv(G.location,de);break;default:i.vertexAttrib1fv(G.location,de)}}}}T()}function P(){B();for(const x in n){const k=n[x];for(const z in k){const V=k[z];for(const q in V)u(V[q].object),delete V[q];delete k[z]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;const k=n[x.id];for(const z in k){const V=k[z];for(const q in V)u(V[q].object),delete V[q];delete k[z]}delete n[x.id]}function L(x){for(const k in n){const z=n[k];if(z[x.id]===void 0)continue;const V=z[x.id];for(const q in V)u(V[q].object),delete V[q];delete z[x.id]}}function B(){y(),a=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:B,resetDefaultState:y,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function Jg(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,n,1)}function l(c,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v]*h[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function e0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==_n&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const B=L===fr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Rn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==En&&!B)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:P,maxSamples:R}}function t0(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Mi,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const T=r?0:n,E=T*4;let S=p.clippingState||null;l.value=S,S=u(g,h,E,f);for(let P=0;P!==E;++P)S[P]=t[P];p.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,T=h.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,S=f;E!==v;++E,S+=4)a.copy(d[E]).applyMatrix4(T,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function n0(i){let e=new WeakMap;function t(a,o){return o===No?a.mapping=vs:o===Oo&&(a.mapping=bs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===No||o===Oo)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Qf(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const us=4,lu=[.125,.215,.35,.446,.526,.582],Ai=20,ho=new lc,cu=new De;let fo=null,po=0,mo=0,go=!1;const wi=(1+Math.sqrt(5))/2,os=1/wi,uu=[new D(-wi,os,0),new D(wi,os,0),new D(-os,0,wi),new D(os,0,wi),new D(0,wi,-os),new D(0,wi,os),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],i0=new D;class du{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=i0}=r;fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fo,po,mo),this._renderer.xr.enabled=go,e.scissorTest=!1,Vr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vs||e.mapping===bs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:fr,format:_n,colorSpace:xs,depthBuffer:!1},s=hu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hu(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=s0(r)),this._blurMaterial=r0(r,e,t)}return s}_compileMaterial(e){const t=new Ut(this._lodPlanes[0],e);this._renderer.compile(t,ho)}_sceneToCubeUV(e,t,n,s,r){const l=new gn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(cu),d.toneMapping=ri,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const v=new Ea({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1}),m=new Ut(new li,v);let p=!1;const T=e.background;T?T.isColor&&(v.color.copy(T),e.background=null,p=!0):(v.color.copy(cu),p=!0);for(let E=0;E<6;E++){const S=E%3;S===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[E],r.y,r.z)):S===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[E]));const P=this._cubeSize;Vr(s,S*P,E>2?P:0,P,P),d.setRenderTarget(s),p&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===vs||e.mapping===bs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fu());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ut(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Vr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ho)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=uu[(s-r-1)%uu.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ut(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ai-1),v=r/g,m=isFinite(r)?1+Math.floor(u*v):Ai;m>Ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ai}`);const p=[];let T=0;for(let L=0;L<Ai;++L){const B=L/v,y=Math.exp(-B*B/2);p.push(y),L===0?T+=y:L<m&&(T+=2*y)}for(let L=0;L<p.length;L++)p[L]=p[L]/T;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-n;const S=this._sizeLods[s],P=3*S*(s>E-us?s-E+us:0),R=4*(this._cubeSize-S);Vr(t,P,R,3*S,2*S),l.setRenderTarget(t),l.render(d,ho)}}function s0(i){const e=[],t=[],n=[];let s=i;const r=i-us+1+lu.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-us?l=lu[a-i+us-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,v=3,m=2,p=1,T=new Float32Array(v*g*f),E=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let R=0;R<f;R++){const L=R%3*2/3-1,B=R>2?0:-1,y=[L,B,0,L+2/3,B,0,L+2/3,B+1,0,L,B,0,L+2/3,B+1,0,L,B+1,0];T.set(y,v*g*R),E.set(h,m*g*R);const x=[R,R,R,R,R,R];S.set(x,p*g*R)}const P=new bn;P.setAttribute("position",new qt(T,v)),P.setAttribute("uv",new qt(E,m)),P.setAttribute("faceIndex",new qt(S,p)),e.push(P),s>us&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function hu(i,e,t){const n=new Ii(i,e,t);return n.texture.mapping=wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function r0(i,e,t){const n=new Float32Array(Ai),s=new D(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:cc(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function fu(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cc(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function pu(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function cc(){return`

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
	`}function a0(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===No||l===Oo,u=l===vs||l===bs;if(c||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new du(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new du(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function o0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&tr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function l0(i,e,t,n){const s={},r=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const T=f.array;v=f.version;for(let E=0,S=T.length;E<S;E+=3){const P=T[E+0],R=T[E+1],L=T[E+2];h.push(P,R,R,L,L,P)}}else if(g!==void 0){const T=g.array;v=g.version;for(let E=0,S=T.length/3-1;E<S;E+=3){const P=E+0,R=E+1,L=E+2;h.push(P,R,R,L,L,P)}}else return;const m=new(xd(h)?wd:Md)(h,1);m.version=v;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function u(d){const h=r.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function c0(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,r,h*a),t.update(f,n,1)}function c(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,h*a,g),t.update(f,n,g))}function u(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function d(h,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,v,0,g);let p=0;for(let T=0;T<g;T++)p+=f[T]*v[T];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function u0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function d0(i,e,t){const n=new WeakMap,s=new bt;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let y=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",y)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let E=0;f===!0&&(E=1),g===!0&&(E=2),v===!0&&(E=3);let S=o.attributes.position.count*E,P=1;S>e.maxTextureSize&&(P=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const R=new Float32Array(S*P*4*d),L=new yd(R,S,P,d);L.type=En,L.needsUpdate=!0;const B=E*4;for(let x=0;x<d;x++){const k=m[x],z=p[x],V=T[x],q=S*P*4*x;for(let Y=0;Y<k.count;Y++){const $=Y*B;f===!0&&(s.fromBufferAttribute(k,Y),R[q+$+0]=s.x,R[q+$+1]=s.y,R[q+$+2]=s.z,R[q+$+3]=0),g===!0&&(s.fromBufferAttribute(z,Y),R[q+$+4]=s.x,R[q+$+5]=s.y,R[q+$+6]=s.z,R[q+$+7]=0),v===!0&&(s.fromBufferAttribute(V,Y),R[q+$+8]=s.x,R[q+$+9]=s.y,R[q+$+10]=s.z,R[q+$+11]=V.itemSize===4?s.w:1)}}h={count:d,texture:L,size:new ze(S,P)},n.set(o,h),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function h0(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Ud=new Bt,mu=new Ld(1,1),Bd=new yd,Nd=new If,Od=new Ad,gu=[],_u=[],vu=new Float32Array(16),bu=new Float32Array(9),xu=new Float32Array(4);function Cs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=gu[s];if(r===void 0&&(r=new Float32Array(s),gu[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ct(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ta(i,e){let t=_u[e];t===void 0&&(t=new Int32Array(e),_u[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function f0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function p0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2fv(this.addr,e),Ct(t,e)}}function m0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;i.uniform3fv(this.addr,e),Ct(t,e)}}function g0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4fv(this.addr,e),Ct(t,e)}}function _0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;xu.set(n),i.uniformMatrix2fv(this.addr,!1,xu),Ct(t,n)}}function v0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;bu.set(n),i.uniformMatrix3fv(this.addr,!1,bu),Ct(t,n)}}function b0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;vu.set(n),i.uniformMatrix4fv(this.addr,!1,vu),Ct(t,n)}}function x0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2iv(this.addr,e),Ct(t,e)}}function S0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3iv(this.addr,e),Ct(t,e)}}function M0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4iv(this.addr,e),Ct(t,e)}}function w0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function E0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2uiv(this.addr,e),Ct(t,e)}}function T0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3uiv(this.addr,e),Ct(t,e)}}function A0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4uiv(this.addr,e),Ct(t,e)}}function R0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(mu.compareFunction=bd,r=mu):r=Ud,t.setTexture2D(e||r,s)}function C0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Nd,s)}function P0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Od,s)}function k0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Bd,s)}function L0(i){switch(i){case 5126:return f0;case 35664:return p0;case 35665:return m0;case 35666:return g0;case 35674:return _0;case 35675:return v0;case 35676:return b0;case 5124:case 35670:return x0;case 35667:case 35671:return y0;case 35668:case 35672:return S0;case 35669:case 35673:return M0;case 5125:return w0;case 36294:return E0;case 36295:return T0;case 36296:return A0;case 35678:case 36198:case 36298:case 36306:case 35682:return R0;case 35679:case 36299:case 36307:return C0;case 35680:case 36300:case 36308:case 36293:return P0;case 36289:case 36303:case 36311:case 36292:return k0}}function D0(i,e){i.uniform1fv(this.addr,e)}function F0(i,e){const t=Cs(e,this.size,2);i.uniform2fv(this.addr,t)}function I0(i,e){const t=Cs(e,this.size,3);i.uniform3fv(this.addr,t)}function U0(i,e){const t=Cs(e,this.size,4);i.uniform4fv(this.addr,t)}function B0(i,e){const t=Cs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function N0(i,e){const t=Cs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function O0(i,e){const t=Cs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function z0(i,e){i.uniform1iv(this.addr,e)}function G0(i,e){i.uniform2iv(this.addr,e)}function H0(i,e){i.uniform3iv(this.addr,e)}function V0(i,e){i.uniform4iv(this.addr,e)}function W0(i,e){i.uniform1uiv(this.addr,e)}function $0(i,e){i.uniform2uiv(this.addr,e)}function q0(i,e){i.uniform3uiv(this.addr,e)}function j0(i,e){i.uniform4uiv(this.addr,e)}function K0(i,e,t){const n=this.cache,s=e.length,r=Ta(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Ud,r[a])}function X0(i,e,t){const n=this.cache,s=e.length,r=Ta(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Nd,r[a])}function Y0(i,e,t){const n=this.cache,s=e.length,r=Ta(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Od,r[a])}function Z0(i,e,t){const n=this.cache,s=e.length,r=Ta(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Bd,r[a])}function Q0(i){switch(i){case 5126:return D0;case 35664:return F0;case 35665:return I0;case 35666:return U0;case 35674:return B0;case 35675:return N0;case 35676:return O0;case 5124:case 35670:return z0;case 35667:case 35671:return G0;case 35668:case 35672:return H0;case 35669:case 35673:return V0;case 5125:return W0;case 36294:return $0;case 36295:return q0;case 36296:return j0;case 35678:case 36198:case 36298:case 36306:case 35682:return K0;case 35679:case 36299:case 36307:return X0;case 35680:case 36300:case 36308:case 36293:return Y0;case 36289:case 36303:case 36311:case 36292:return Z0}}class J0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=L0(t.type)}}class e_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Q0(t.type)}}class t_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const _o=/(\w+)(\])?(\[|\.)?/g;function yu(i,e){i.seq.push(e),i.map[e.id]=e}function n_(i,e,t){const n=i.name,s=n.length;for(_o.lastIndex=0;;){const r=_o.exec(n),a=_o.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){yu(t,c===void 0?new J0(o,i,e):new e_(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new t_(o),yu(t,d)),t=d}}}class sa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);n_(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Su(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const i_=37297;let s_=0;function r_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Mu=new Be;function a_(i){Xe._getMatrix(Mu,Xe.workingColorSpace,i);const e=`mat3( ${Mu.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(i)){case da:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function wu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+r_(i.getShaderSource(e),o)}else return r}function o_(i,e){const t=a_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function l_(i,e){let t;switch(e){case cf:t="Linear";break;case uf:t="Reinhard";break;case df:t="Cineon";break;case hf:t="ACESFilmic";break;case pf:t="AgX";break;case mf:t="Neutral";break;case ff:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Wr=new D;function c_(){Xe.getLuminanceCoefficients(Wr);const i=Wr.x.toFixed(4),e=Wr.y.toFixed(4),t=Wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function u_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)}function d_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function h_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function $s(i){return i!==""}function Eu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Tu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const f_=/^[ \t]*#include +<([\w\d./]+)>/gm;function xl(i){return i.replace(f_,m_)}const p_=new Map;function m_(i,e){let t=Oe[e];if(t===void 0){const n=p_.get(e);if(n!==void 0)t=Oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return xl(t)}const g_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Au(i){return i.replace(g_,__)}function __(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ru(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function v_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ld?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===cd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===zn&&(e="SHADOWMAP_TYPE_VSM"),e}function b_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vs:case bs:e="ENVMAP_TYPE_CUBE";break;case wa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function x_(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===bs&&(e="ENVMAP_MODE_REFRACTION"),e}function y_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Xl:e="ENVMAP_BLENDING_MULTIPLY";break;case of:e="ENVMAP_BLENDING_MIX";break;case lf:e="ENVMAP_BLENDING_ADD";break}return e}function S_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function M_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=v_(t),c=b_(t),u=x_(t),d=y_(t),h=S_(t),f=u_(t),g=d_(r),v=s.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($s).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($s).join(`
`),p.length>0&&(p+=`
`)):(m=[Ru(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),p=[Ru(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ri?"#define TONE_MAPPING":"",t.toneMapping!==ri?Oe.tonemapping_pars_fragment:"",t.toneMapping!==ri?l_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,o_("linearToOutputTexel",t.outputColorSpace),c_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($s).join(`
`)),a=xl(a),a=Eu(a,t),a=Tu(a,t),o=xl(o),o=Eu(o,t),o=Tu(o,t),a=Au(a),o=Au(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=T+m+a,S=T+p+o,P=Su(s,s.VERTEX_SHADER,E),R=Su(s,s.FRAGMENT_SHADER,S);s.attachShader(v,P),s.attachShader(v,R),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function L(k){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(v)||"",V=s.getShaderInfoLog(P)||"",q=s.getShaderInfoLog(R)||"",Y=z.trim(),$=V.trim(),ie=q.trim();let G=!0,oe=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,P,R);else{const de=wu(s,P,"vertex"),Ee=wu(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+Y+`
`+de+`
`+Ee)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):($===""||ie==="")&&(oe=!1);oe&&(k.diagnostics={runnable:G,programLog:Y,vertexShader:{log:$,prefix:m},fragmentShader:{log:ie,prefix:p}})}s.deleteShader(P),s.deleteShader(R),B=new sa(s,v),y=h_(s,v)}let B;this.getUniforms=function(){return B===void 0&&L(this),B};let y;this.getAttributes=function(){return y===void 0&&L(this),y};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,i_)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=s_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=R,this}let w_=0;class E_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new T_(e),t.set(e,n)),n}}class T_{constructor(e){this.id=w_++,this.code=e,this.usedTimes=0}}function A_(i,e,t,n,s,r,a){const o=new rc,l=new E_,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,x,k,z,V){const q=z.fog,Y=V.geometry,$=y.isMeshStandardMaterial?z.environment:null,ie=(y.isMeshStandardMaterial?t:e).get(y.envMap||$),G=ie&&ie.mapping===wa?ie.image.height:null,oe=g[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const de=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ee=de!==void 0?de.length:0;let Ge=0;Y.morphAttributes.position!==void 0&&(Ge=1),Y.morphAttributes.normal!==void 0&&(Ge=2),Y.morphAttributes.color!==void 0&&(Ge=3);let rt,lt,Ye,j;if(oe){const Ze=yn[oe];rt=Ze.vertexShader,lt=Ze.fragmentShader}else rt=y.vertexShader,lt=y.fragmentShader,l.update(y),Ye=l.getVertexShaderID(y),j=l.getFragmentShaderID(y);const Q=i.getRenderTarget(),me=i.state.buffers.depth.getReversed(),Le=V.isInstancedMesh===!0,we=V.isBatchedMesh===!0,qe=!!y.map,Dt=!!y.matcap,A=!!ie,ct=!!y.aoMap,Ie=!!y.lightMap,Pe=!!y.bumpMap,ve=!!y.normalMap,ut=!!y.displacementMap,be=!!y.emissiveMap,Ne=!!y.metalnessMap,Pt=!!y.roughnessMap,xt=y.anisotropy>0,M=y.clearcoat>0,_=y.dispersion>0,U=y.iridescence>0,W=y.sheen>0,Z=y.transmission>0,H=xt&&!!y.anisotropyMap,Me=M&&!!y.clearcoatMap,se=M&&!!y.clearcoatNormalMap,xe=M&&!!y.clearcoatRoughnessMap,ye=U&&!!y.iridescenceMap,te=U&&!!y.iridescenceThicknessMap,ue=W&&!!y.sheenColorMap,Ce=W&&!!y.sheenRoughnessMap,Se=!!y.specularMap,le=!!y.specularColorMap,Ue=!!y.specularIntensityMap,C=Z&&!!y.transmissionMap,ne=Z&&!!y.thicknessMap,re=!!y.gradientMap,pe=!!y.alphaMap,J=y.alphaTest>0,X=!!y.alphaHash,_e=!!y.extensions;let Fe=ri;y.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Fe=i.toneMapping);const at={shaderID:oe,shaderType:y.type,shaderName:y.name,vertexShader:rt,fragmentShader:lt,defines:y.defines,customVertexShaderID:Ye,customFragmentShaderID:j,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:we,batchingColor:we&&V._colorsTexture!==null,instancing:Le,instancingColor:Le&&V.instanceColor!==null,instancingMorph:Le&&V.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:xs,alphaToCoverage:!!y.alphaToCoverage,map:qe,matcap:Dt,envMap:A,envMapMode:A&&ie.mapping,envMapCubeUVHeight:G,aoMap:ct,lightMap:Ie,bumpMap:Pe,normalMap:ve,displacementMap:h&&ut,emissiveMap:be,normalMapObjectSpace:ve&&y.normalMapType===bf,normalMapTangentSpace:ve&&y.normalMapType===vd,metalnessMap:Ne,roughnessMap:Pt,anisotropy:xt,anisotropyMap:H,clearcoat:M,clearcoatMap:Me,clearcoatNormalMap:se,clearcoatRoughnessMap:xe,dispersion:_,iridescence:U,iridescenceMap:ye,iridescenceThicknessMap:te,sheen:W,sheenColorMap:ue,sheenRoughnessMap:Ce,specularMap:Se,specularColorMap:le,specularIntensityMap:Ue,transmission:Z,transmissionMap:C,thicknessMap:ne,gradientMap:re,opaque:y.transparent===!1&&y.blending===hs&&y.alphaToCoverage===!1,alphaMap:pe,alphaTest:J,alphaHash:X,combine:y.combine,mapUv:qe&&v(y.map.channel),aoMapUv:ct&&v(y.aoMap.channel),lightMapUv:Ie&&v(y.lightMap.channel),bumpMapUv:Pe&&v(y.bumpMap.channel),normalMapUv:ve&&v(y.normalMap.channel),displacementMapUv:ut&&v(y.displacementMap.channel),emissiveMapUv:be&&v(y.emissiveMap.channel),metalnessMapUv:Ne&&v(y.metalnessMap.channel),roughnessMapUv:Pt&&v(y.roughnessMap.channel),anisotropyMapUv:H&&v(y.anisotropyMap.channel),clearcoatMapUv:Me&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:se&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:te&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&v(y.sheenRoughnessMap.channel),specularMapUv:Se&&v(y.specularMap.channel),specularColorMapUv:le&&v(y.specularColorMap.channel),specularIntensityMapUv:Ue&&v(y.specularIntensityMap.channel),transmissionMapUv:C&&v(y.transmissionMap.channel),thicknessMapUv:ne&&v(y.thicknessMap.channel),alphaMapUv:pe&&v(y.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(ve||xt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Y.attributes.uv&&(qe||pe),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:me,skinning:V.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Ge,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:Fe,decodeVideoTexture:qe&&y.map.isVideoTexture===!0&&Xe.getTransfer(y.map.colorSpace)===tt,decodeVideoTextureEmissive:be&&y.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(y.emissiveMap.colorSpace)===tt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Sn,flipSided:y.side===$t,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:_e&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&y.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return at.vertexUv1s=c.has(1),at.vertexUv2s=c.has(2),at.vertexUv3s=c.has(3),c.clear(),at}function p(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const k in y.defines)x.push(k),x.push(y.defines[k]);return y.isRawShaderMaterial===!1&&(T(x,y),E(x,y),x.push(i.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function T(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function E(y,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),y.push(o.mask)}function S(y){const x=g[y.type];let k;if(x){const z=yn[x];k=Kf.clone(z.uniforms)}else k=y.uniforms;return k}function P(y,x){let k;for(let z=0,V=u.length;z<V;z++){const q=u[z];if(q.cacheKey===x){k=q,++k.usedTimes;break}}return k===void 0&&(k=new M_(i,x,y,r),u.push(k)),k}function R(y){if(--y.usedTimes===0){const x=u.indexOf(y);u[x]=u[u.length-1],u.pop(),y.destroy()}}function L(y){l.remove(y)}function B(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:P,releaseProgram:R,releaseShaderCache:L,programs:u,dispose:B}}function R_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function C_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Cu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Pu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,h,f,g,v,m){let p=i[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},i[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=v,p.group=m),e++,p}function o(d,h,f,g,v,m){const p=a(d,h,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(d,h,f,g,v,m){const p=a(d,h,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(d,h){t.length>1&&t.sort(d||C_),n.length>1&&n.sort(h||Cu),s.length>1&&s.sort(h||Cu)}function u(){for(let d=e,h=i.length;d<h;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function P_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Pu,i.set(n,[a])):s>=r.length?(a=new Pu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function k_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new De};break;case"SpotLight":t={position:new D,direction:new D,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function L_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let D_=0;function F_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function I_(i){const e=new k_,t=L_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new it,a=new it;function o(c){let u=0,d=0,h=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,T=0,E=0,S=0,P=0,R=0,L=0;c.sort(F_);for(let y=0,x=c.length;y<x;y++){const k=c[y],z=k.color,V=k.intensity,q=k.distance,Y=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)u+=z.r*V,d+=z.g*V,h+=z.b*V;else if(k.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(k.sh.coefficients[$],V);L++}else if(k.isDirectionalLight){const $=e.get(k);if($.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const ie=k.shadow,G=t.get(k);G.shadowIntensity=ie.intensity,G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=k.shadow.matrix,T++}n.directional[f]=$,f++}else if(k.isSpotLight){const $=e.get(k);$.position.setFromMatrixPosition(k.matrixWorld),$.color.copy(z).multiplyScalar(V),$.distance=q,$.coneCos=Math.cos(k.angle),$.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),$.decay=k.decay,n.spot[v]=$;const ie=k.shadow;if(k.map&&(n.spotLightMap[P]=k.map,P++,ie.updateMatrices(k),k.castShadow&&R++),n.spotLightMatrix[v]=ie.matrix,k.castShadow){const G=t.get(k);G.shadowIntensity=ie.intensity,G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=Y,S++}v++}else if(k.isRectAreaLight){const $=e.get(k);$.color.copy(z).multiplyScalar(V),$.halfWidth.set(k.width*.5,0,0),$.halfHeight.set(0,k.height*.5,0),n.rectArea[m]=$,m++}else if(k.isPointLight){const $=e.get(k);if($.color.copy(k.color).multiplyScalar(k.intensity),$.distance=k.distance,$.decay=k.decay,k.castShadow){const ie=k.shadow,G=t.get(k);G.shadowIntensity=ie.intensity,G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,G.shadowCameraNear=ie.camera.near,G.shadowCameraFar=ie.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=k.shadow.matrix,E++}n.point[g]=$,g++}else if(k.isHemisphereLight){const $=e.get(k);$.skyColor.copy(k.color).multiplyScalar(V),$.groundColor.copy(k.groundColor).multiplyScalar(V),n.hemi[p]=$,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const B=n.hash;(B.directionalLength!==f||B.pointLength!==g||B.spotLength!==v||B.rectAreaLength!==m||B.hemiLength!==p||B.numDirectionalShadows!==T||B.numPointShadows!==E||B.numSpotShadows!==S||B.numSpotMaps!==P||B.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=S+P-R,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=L,B.directionalLength=f,B.pointLength=g,B.spotLength=v,B.rectAreaLength=m,B.hemiLength=p,B.numDirectionalShadows=T,B.numPointShadows=E,B.numSpotShadows=S,B.numSpotMaps=P,B.numLightProbes=L,n.version=D_++)}function l(c,u){let d=0,h=0,f=0,g=0,v=0;const m=u.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const E=c[p];if(E.isDirectionalLight){const S=n.directional[d];S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),d++}else if(E.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const S=n.point[h];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),h++}else if(E.isHemisphereLight){const S=n.hemi[v];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function ku(i){const e=new I_(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function U_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new ku(i),e.set(s,[o])):r>=a.length?(o=new ku(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const B_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N_=`uniform sampler2D shadow_pass;
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
}`;function O_(i,e,t){let n=new oc;const s=new ze,r=new ze,a=new bt,o=new lp({depthPacking:vf}),l=new cp,c={},u=t.maxTextureSize,d={[oi]:$t,[$t]:oi,[Sn]:Sn},h=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:B_,fragmentShader:N_}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new bn;g.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ut(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ld;let p=this.type;this.render=function(R,L,B){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const y=i.getRenderTarget(),x=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),z=i.state;z.setBlending(si),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const V=p!==zn&&this.type===zn,q=p===zn&&this.type!==zn;for(let Y=0,$=R.length;Y<$;Y++){const ie=R[Y],G=ie.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const oe=G.getFrameExtents();if(s.multiply(oe),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/oe.x),s.x=r.x*oe.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/oe.y),s.y=r.y*oe.y,G.mapSize.y=r.y)),G.map===null||V===!0||q===!0){const Ee=this.type!==zn?{minFilter:tn,magFilter:tn}:{};G.map!==null&&G.map.dispose(),G.map=new Ii(s.x,s.y,Ee),G.map.texture.name=ie.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const de=G.getViewportCount();for(let Ee=0;Ee<de;Ee++){const Ge=G.getViewport(Ee);a.set(r.x*Ge.x,r.y*Ge.y,r.x*Ge.z,r.y*Ge.w),z.viewport(a),G.updateMatrices(ie,Ee),n=G.getFrustum(),S(L,B,G.camera,ie,this.type)}G.isPointLightShadow!==!0&&this.type===zn&&T(G,B),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,x,k)};function T(R,L){const B=e.update(v);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Ii(s.x,s.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(L,null,B,h,v,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(L,null,B,f,v,null)}function E(R,L,B,y){let x=null;const k=B.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(k!==void 0)x=k;else if(x=B.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const z=x.uuid,V=L.uuid;let q=c[z];q===void 0&&(q={},c[z]=q);let Y=q[V];Y===void 0&&(Y=x.clone(),q[V]=Y,L.addEventListener("dispose",P)),x=Y}if(x.visible=L.visible,x.wireframe=L.wireframe,y===zn?x.side=L.shadowSide!==null?L.shadowSide:L.side:x.side=L.shadowSide!==null?L.shadowSide:d[L.side],x.alphaMap=L.alphaMap,x.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,x.map=L.map,x.clipShadows=L.clipShadows,x.clippingPlanes=L.clippingPlanes,x.clipIntersection=L.clipIntersection,x.displacementMap=L.displacementMap,x.displacementScale=L.displacementScale,x.displacementBias=L.displacementBias,x.wireframeLinewidth=L.wireframeLinewidth,x.linewidth=L.linewidth,B.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const z=i.properties.get(x);z.light=B}return x}function S(R,L,B,y,x){if(R.visible===!1)return;if(R.layers.test(L.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===zn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,R.matrixWorld);const V=e.update(R),q=R.material;if(Array.isArray(q)){const Y=V.groups;for(let $=0,ie=Y.length;$<ie;$++){const G=Y[$],oe=q[G.materialIndex];if(oe&&oe.visible){const de=E(R,oe,y,x);R.onBeforeShadow(i,R,L,B,V,de,G),i.renderBufferDirect(B,null,V,de,R,G),R.onAfterShadow(i,R,L,B,V,de,G)}}}else if(q.visible){const Y=E(R,q,y,x);R.onBeforeShadow(i,R,L,B,V,Y,null),i.renderBufferDirect(B,null,V,Y,R,null),R.onAfterShadow(i,R,L,B,V,Y,null)}}const z=R.children;for(let V=0,q=z.length;V<q;V++)S(z[V],L,B,y,x)}function P(R){R.target.removeEventListener("dispose",P);for(const B in c){const y=c[B],x=R.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const z_={[ko]:Lo,[Do]:Uo,[Fo]:Bo,[_s]:Io,[Lo]:ko,[Uo]:Do,[Bo]:Fo,[Io]:_s};function G_(i,e){function t(){let C=!1;const ne=new bt;let re=null;const pe=new bt(0,0,0,0);return{setMask:function(J){re!==J&&!C&&(i.colorMask(J,J,J,J),re=J)},setLocked:function(J){C=J},setClear:function(J,X,_e,Fe,at){at===!0&&(J*=Fe,X*=Fe,_e*=Fe),ne.set(J,X,_e,Fe),pe.equals(ne)===!1&&(i.clearColor(J,X,_e,Fe),pe.copy(ne))},reset:function(){C=!1,re=null,pe.set(-1,0,0,0)}}}function n(){let C=!1,ne=!1,re=null,pe=null,J=null;return{setReversed:function(X){if(ne!==X){const _e=e.get("EXT_clip_control");X?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),ne=X;const Fe=J;J=null,this.setClear(Fe)}},getReversed:function(){return ne},setTest:function(X){X?Q(i.DEPTH_TEST):me(i.DEPTH_TEST)},setMask:function(X){re!==X&&!C&&(i.depthMask(X),re=X)},setFunc:function(X){if(ne&&(X=z_[X]),pe!==X){switch(X){case ko:i.depthFunc(i.NEVER);break;case Lo:i.depthFunc(i.ALWAYS);break;case Do:i.depthFunc(i.LESS);break;case _s:i.depthFunc(i.LEQUAL);break;case Fo:i.depthFunc(i.EQUAL);break;case Io:i.depthFunc(i.GEQUAL);break;case Uo:i.depthFunc(i.GREATER);break;case Bo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=X}},setLocked:function(X){C=X},setClear:function(X){J!==X&&(ne&&(X=1-X),i.clearDepth(X),J=X)},reset:function(){C=!1,re=null,pe=null,J=null,ne=!1}}}function s(){let C=!1,ne=null,re=null,pe=null,J=null,X=null,_e=null,Fe=null,at=null;return{setTest:function(Ze){C||(Ze?Q(i.STENCIL_TEST):me(i.STENCIL_TEST))},setMask:function(Ze){ne!==Ze&&!C&&(i.stencilMask(Ze),ne=Ze)},setFunc:function(Ze,Dn,xn){(re!==Ze||pe!==Dn||J!==xn)&&(i.stencilFunc(Ze,Dn,xn),re=Ze,pe=Dn,J=xn)},setOp:function(Ze,Dn,xn){(X!==Ze||_e!==Dn||Fe!==xn)&&(i.stencilOp(Ze,Dn,xn),X=Ze,_e=Dn,Fe=xn)},setLocked:function(Ze){C=Ze},setClear:function(Ze){at!==Ze&&(i.clearStencil(Ze),at=Ze)},reset:function(){C=!1,ne=null,re=null,pe=null,J=null,X=null,_e=null,Fe=null,at=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,T=null,E=null,S=null,P=null,R=null,L=new De(0,0,0),B=0,y=!1,x=null,k=null,z=null,V=null,q=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ie=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(G)[1]),$=ie>=1):G.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),$=ie>=2);let oe=null,de={};const Ee=i.getParameter(i.SCISSOR_BOX),Ge=i.getParameter(i.VIEWPORT),rt=new bt().fromArray(Ee),lt=new bt().fromArray(Ge);function Ye(C,ne,re,pe){const J=new Uint8Array(4),X=i.createTexture();i.bindTexture(C,X),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<re;_e++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(ne+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return X}const j={};j[i.TEXTURE_2D]=Ye(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=Ye(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=Ye(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=Ye(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),a.setFunc(_s),Pe(!1),ve(Tc),Q(i.CULL_FACE),ct(si);function Q(C){u[C]!==!0&&(i.enable(C),u[C]=!0)}function me(C){u[C]!==!1&&(i.disable(C),u[C]=!1)}function Le(C,ne){return d[C]!==ne?(i.bindFramebuffer(C,ne),d[C]=ne,C===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ne),C===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function we(C,ne){let re=f,pe=!1;if(C){re=h.get(ne),re===void 0&&(re=[],h.set(ne,re));const J=C.textures;if(re.length!==J.length||re[0]!==i.COLOR_ATTACHMENT0){for(let X=0,_e=J.length;X<_e;X++)re[X]=i.COLOR_ATTACHMENT0+X;re.length=J.length,pe=!0}}else re[0]!==i.BACK&&(re[0]=i.BACK,pe=!0);pe&&i.drawBuffers(re)}function qe(C){return g!==C?(i.useProgram(C),g=C,!0):!1}const Dt={[Ti]:i.FUNC_ADD,[Vh]:i.FUNC_SUBTRACT,[Wh]:i.FUNC_REVERSE_SUBTRACT};Dt[$h]=i.MIN,Dt[qh]=i.MAX;const A={[jh]:i.ZERO,[Kh]:i.ONE,[Xh]:i.SRC_COLOR,[Co]:i.SRC_ALPHA,[tf]:i.SRC_ALPHA_SATURATE,[Jh]:i.DST_COLOR,[Zh]:i.DST_ALPHA,[Yh]:i.ONE_MINUS_SRC_COLOR,[Po]:i.ONE_MINUS_SRC_ALPHA,[ef]:i.ONE_MINUS_DST_COLOR,[Qh]:i.ONE_MINUS_DST_ALPHA,[nf]:i.CONSTANT_COLOR,[sf]:i.ONE_MINUS_CONSTANT_COLOR,[rf]:i.CONSTANT_ALPHA,[af]:i.ONE_MINUS_CONSTANT_ALPHA};function ct(C,ne,re,pe,J,X,_e,Fe,at,Ze){if(C===si){v===!0&&(me(i.BLEND),v=!1);return}if(v===!1&&(Q(i.BLEND),v=!0),C!==Hh){if(C!==m||Ze!==y){if((p!==Ti||S!==Ti)&&(i.blendEquation(i.FUNC_ADD),p=Ti,S=Ti),Ze)switch(C){case hs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ua:i.blendFunc(i.ONE,i.ONE);break;case Ac:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case hs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ua:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ac:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}T=null,E=null,P=null,R=null,L.set(0,0,0),B=0,m=C,y=Ze}return}J=J||ne,X=X||re,_e=_e||pe,(ne!==p||J!==S)&&(i.blendEquationSeparate(Dt[ne],Dt[J]),p=ne,S=J),(re!==T||pe!==E||X!==P||_e!==R)&&(i.blendFuncSeparate(A[re],A[pe],A[X],A[_e]),T=re,E=pe,P=X,R=_e),(Fe.equals(L)===!1||at!==B)&&(i.blendColor(Fe.r,Fe.g,Fe.b,at),L.copy(Fe),B=at),m=C,y=!1}function Ie(C,ne){C.side===Sn?me(i.CULL_FACE):Q(i.CULL_FACE);let re=C.side===$t;ne&&(re=!re),Pe(re),C.blending===hs&&C.transparent===!1?ct(si):ct(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const pe=C.stencilWrite;o.setTest(pe),pe&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),be(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(C){x!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),x=C)}function ve(C){C!==zh?(Q(i.CULL_FACE),C!==k&&(C===Tc?i.cullFace(i.BACK):C===Gh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):me(i.CULL_FACE),k=C}function ut(C){C!==z&&($&&i.lineWidth(C),z=C)}function be(C,ne,re){C?(Q(i.POLYGON_OFFSET_FILL),(V!==ne||q!==re)&&(i.polygonOffset(ne,re),V=ne,q=re)):me(i.POLYGON_OFFSET_FILL)}function Ne(C){C?Q(i.SCISSOR_TEST):me(i.SCISSOR_TEST)}function Pt(C){C===void 0&&(C=i.TEXTURE0+Y-1),oe!==C&&(i.activeTexture(C),oe=C)}function xt(C,ne,re){re===void 0&&(oe===null?re=i.TEXTURE0+Y-1:re=oe);let pe=de[re];pe===void 0&&(pe={type:void 0,texture:void 0},de[re]=pe),(pe.type!==C||pe.texture!==ne)&&(oe!==re&&(i.activeTexture(re),oe=re),i.bindTexture(C,ne||j[C]),pe.type=C,pe.texture=ne)}function M(){const C=de[oe];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function U(){try{i.compressedTexImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function W(){try{i.texSubImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Z(){try{i.texSubImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function H(){try{i.compressedTexSubImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Me(){try{i.compressedTexSubImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function se(){try{i.texStorage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function xe(){try{i.texStorage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ye(){try{i.texImage2D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function te(){try{i.texImage3D(...arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ue(C){rt.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),rt.copy(C))}function Ce(C){lt.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),lt.copy(C))}function Se(C,ne){let re=c.get(ne);re===void 0&&(re=new WeakMap,c.set(ne,re));let pe=re.get(C);pe===void 0&&(pe=i.getUniformBlockIndex(ne,C.name),re.set(C,pe))}function le(C,ne){const pe=c.get(ne).get(C);l.get(ne)!==pe&&(i.uniformBlockBinding(ne,pe,C.__bindingPointIndex),l.set(ne,pe))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},oe=null,de={},d={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,T=null,E=null,S=null,P=null,R=null,L=new De(0,0,0),B=0,y=!1,x=null,k=null,z=null,V=null,q=null,rt.set(0,0,i.canvas.width,i.canvas.height),lt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:me,bindFramebuffer:Le,drawBuffers:we,useProgram:qe,setBlending:ct,setMaterial:Ie,setFlipSided:Pe,setCullFace:ve,setLineWidth:ut,setPolygonOffset:be,setScissorTest:Ne,activeTexture:Pt,bindTexture:xt,unbindTexture:M,compressedTexImage2D:_,compressedTexImage3D:U,texImage2D:ye,texImage3D:te,updateUBOMapping:Se,uniformBlockBinding:le,texStorage2D:se,texStorage3D:xe,texSubImage2D:W,texSubImage3D:Z,compressedTexSubImage2D:H,compressedTexSubImage3D:Me,scissor:ue,viewport:Ce,reset:Ue}}function H_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,_){return f?new OffscreenCanvas(M,_):fa("canvas")}function v(M,_,U){let W=1;const Z=xt(M);if((Z.width>U||Z.height>U)&&(W=U/Math.max(Z.width,Z.height)),W<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const H=Math.floor(W*Z.width),Me=Math.floor(W*Z.height);d===void 0&&(d=g(H,Me));const se=_?g(H,Me):d;return se.width=H,se.height=Me,se.getContext("2d").drawImage(M,0,0,H,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+H+"x"+Me+")."),se}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),M;return M}function m(M){return M.generateMipmaps}function p(M){i.generateMipmap(M)}function T(M){return M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?i.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(M,_,U,W,Z=!1){if(M!==null){if(i[M]!==void 0)return i[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let H=_;if(_===i.RED&&(U===i.FLOAT&&(H=i.R32F),U===i.HALF_FLOAT&&(H=i.R16F),U===i.UNSIGNED_BYTE&&(H=i.R8)),_===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(H=i.R8UI),U===i.UNSIGNED_SHORT&&(H=i.R16UI),U===i.UNSIGNED_INT&&(H=i.R32UI),U===i.BYTE&&(H=i.R8I),U===i.SHORT&&(H=i.R16I),U===i.INT&&(H=i.R32I)),_===i.RG&&(U===i.FLOAT&&(H=i.RG32F),U===i.HALF_FLOAT&&(H=i.RG16F),U===i.UNSIGNED_BYTE&&(H=i.RG8)),_===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(H=i.RG8UI),U===i.UNSIGNED_SHORT&&(H=i.RG16UI),U===i.UNSIGNED_INT&&(H=i.RG32UI),U===i.BYTE&&(H=i.RG8I),U===i.SHORT&&(H=i.RG16I),U===i.INT&&(H=i.RG32I)),_===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(H=i.RGB8UI),U===i.UNSIGNED_SHORT&&(H=i.RGB16UI),U===i.UNSIGNED_INT&&(H=i.RGB32UI),U===i.BYTE&&(H=i.RGB8I),U===i.SHORT&&(H=i.RGB16I),U===i.INT&&(H=i.RGB32I)),_===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(H=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(H=i.RGBA16UI),U===i.UNSIGNED_INT&&(H=i.RGBA32UI),U===i.BYTE&&(H=i.RGBA8I),U===i.SHORT&&(H=i.RGBA16I),U===i.INT&&(H=i.RGBA32I)),_===i.RGB&&(U===i.UNSIGNED_INT_5_9_9_9_REV&&(H=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(H=i.R11F_G11F_B10F)),_===i.RGBA){const Me=Z?da:Xe.getTransfer(W);U===i.FLOAT&&(H=i.RGBA32F),U===i.HALF_FLOAT&&(H=i.RGBA16F),U===i.UNSIGNED_BYTE&&(H=Me===tt?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT_4_4_4_4&&(H=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(H=i.RGB5_A1)}return(H===i.R16F||H===i.R32F||H===i.RG16F||H===i.RG32F||H===i.RGBA16F||H===i.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function S(M,_){let U;return M?_===null||_===Fi||_===Qs?U=i.DEPTH24_STENCIL8:_===En?U=i.DEPTH32F_STENCIL8:_===Zs&&(U=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Fi||_===Qs?U=i.DEPTH_COMPONENT24:_===En?U=i.DEPTH_COMPONENT32F:_===Zs&&(U=i.DEPTH_COMPONENT16),U}function P(M,_){return m(M)===!0||M.isFramebufferTexture&&M.minFilter!==tn&&M.minFilter!==wn?Math.log2(Math.max(_.width,_.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?_.mipmaps.length:1}function R(M){const _=M.target;_.removeEventListener("dispose",R),B(_),_.isVideoTexture&&u.delete(_)}function L(M){const _=M.target;_.removeEventListener("dispose",L),x(_)}function B(M){const _=n.get(M);if(_.__webglInit===void 0)return;const U=M.source,W=h.get(U);if(W){const Z=W[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&y(M),Object.keys(W).length===0&&h.delete(U)}n.remove(M)}function y(M){const _=n.get(M);i.deleteTexture(_.__webglTexture);const U=M.source,W=h.get(U);delete W[_.__cacheKey],a.memory.textures--}function x(M){const _=n.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),n.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let Z=0;Z<_.__webglFramebuffer[W].length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[W][Z]);else i.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)i.deleteFramebuffer(_.__webglFramebuffer[W]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const U=M.textures;for(let W=0,Z=U.length;W<Z;W++){const H=n.get(U[W]);H.__webglTexture&&(i.deleteTexture(H.__webglTexture),a.memory.textures--),n.remove(U[W])}n.remove(M)}let k=0;function z(){k=0}function V(){const M=k;return M>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),k+=1,M}function q(M){const _=[];return _.push(M.wrapS),_.push(M.wrapT),_.push(M.wrapR||0),_.push(M.magFilter),_.push(M.minFilter),_.push(M.anisotropy),_.push(M.internalFormat),_.push(M.format),_.push(M.type),_.push(M.generateMipmaps),_.push(M.premultiplyAlpha),_.push(M.flipY),_.push(M.unpackAlignment),_.push(M.colorSpace),_.join()}function Y(M,_){const U=n.get(M);if(M.isVideoTexture&&Ne(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&U.__version!==M.version){const W=M.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(U,M,_);return}}else M.isExternalTexture&&(U.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+_)}function $(M,_){const U=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){j(U,M,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+_)}function ie(M,_){const U=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){j(U,M,_);return}t.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+_)}function G(M,_){const U=n.get(M);if(M.version>0&&U.__version!==M.version){Q(U,M,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+_)}const oe={[zo]:i.REPEAT,[Ci]:i.CLAMP_TO_EDGE,[Go]:i.MIRRORED_REPEAT},de={[tn]:i.NEAREST,[gf]:i.NEAREST_MIPMAP_NEAREST,[vr]:i.NEAREST_MIPMAP_LINEAR,[wn]:i.LINEAR,[Na]:i.LINEAR_MIPMAP_NEAREST,[Pi]:i.LINEAR_MIPMAP_LINEAR},Ee={[xf]:i.NEVER,[Tf]:i.ALWAYS,[yf]:i.LESS,[bd]:i.LEQUAL,[Sf]:i.EQUAL,[Ef]:i.GEQUAL,[Mf]:i.GREATER,[wf]:i.NOTEQUAL};function Ge(M,_){if(_.type===En&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===wn||_.magFilter===Na||_.magFilter===vr||_.magFilter===Pi||_.minFilter===wn||_.minFilter===Na||_.minFilter===vr||_.minFilter===Pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(M,i.TEXTURE_WRAP_S,oe[_.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,oe[_.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,oe[_.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,de[_.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,de[_.minFilter]),_.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,Ee[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===tn||_.minFilter!==vr&&_.minFilter!==Pi||_.type===En&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");i.texParameterf(M,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function rt(M,_){let U=!1;M.__webglInit===void 0&&(M.__webglInit=!0,_.addEventListener("dispose",R));const W=_.source;let Z=h.get(W);Z===void 0&&(Z={},h.set(W,Z));const H=q(_);if(H!==M.__cacheKey){Z[H]===void 0&&(Z[H]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,U=!0),Z[H].usedTimes++;const Me=Z[M.__cacheKey];Me!==void 0&&(Z[M.__cacheKey].usedTimes--,Me.usedTimes===0&&y(_)),M.__cacheKey=H,M.__webglTexture=Z[H].texture}return U}function lt(M,_,U){return Math.floor(Math.floor(M/U)/_)}function Ye(M,_,U,W){const H=M.updateRanges;if(H.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,U,W,_.data);else{H.sort((te,ue)=>te.start-ue.start);let Me=0;for(let te=1;te<H.length;te++){const ue=H[Me],Ce=H[te],Se=ue.start+ue.count,le=lt(Ce.start,_.width,4),Ue=lt(ue.start,_.width,4);Ce.start<=Se+1&&le===Ue&&lt(Ce.start+Ce.count-1,_.width,4)===le?ue.count=Math.max(ue.count,Ce.start+Ce.count-ue.start):(++Me,H[Me]=Ce)}H.length=Me+1;const se=i.getParameter(i.UNPACK_ROW_LENGTH),xe=i.getParameter(i.UNPACK_SKIP_PIXELS),ye=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let te=0,ue=H.length;te<ue;te++){const Ce=H[te],Se=Math.floor(Ce.start/4),le=Math.ceil(Ce.count/4),Ue=Se%_.width,C=Math.floor(Se/_.width),ne=le,re=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,C),t.texSubImage2D(i.TEXTURE_2D,0,Ue,C,ne,re,U,W,_.data)}M.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,se),i.pixelStorei(i.UNPACK_SKIP_PIXELS,xe),i.pixelStorei(i.UNPACK_SKIP_ROWS,ye)}}function j(M,_,U){let W=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=i.TEXTURE_3D);const Z=rt(M,_),H=_.source;t.bindTexture(W,M.__webglTexture,i.TEXTURE0+U);const Me=n.get(H);if(H.version!==Me.__version||Z===!0){t.activeTexture(i.TEXTURE0+U);const se=Xe.getPrimaries(Xe.workingColorSpace),xe=_.colorSpace===ni?null:Xe.getPrimaries(_.colorSpace),ye=_.colorSpace===ni||se===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let te=v(_.image,!1,s.maxTextureSize);te=Pt(_,te);const ue=r.convert(_.format,_.colorSpace),Ce=r.convert(_.type);let Se=E(_.internalFormat,ue,Ce,_.colorSpace,_.isVideoTexture);Ge(W,_);let le;const Ue=_.mipmaps,C=_.isVideoTexture!==!0,ne=Me.__version===void 0||Z===!0,re=H.dataReady,pe=P(_,te);if(_.isDepthTexture)Se=S(_.format===er,_.type),ne&&(C?t.texStorage2D(i.TEXTURE_2D,1,Se,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,Se,te.width,te.height,0,ue,Ce,null));else if(_.isDataTexture)if(Ue.length>0){C&&ne&&t.texStorage2D(i.TEXTURE_2D,pe,Se,Ue[0].width,Ue[0].height);for(let J=0,X=Ue.length;J<X;J++)le=Ue[J],C?re&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,le.width,le.height,ue,Ce,le.data):t.texImage2D(i.TEXTURE_2D,J,Se,le.width,le.height,0,ue,Ce,le.data);_.generateMipmaps=!1}else C?(ne&&t.texStorage2D(i.TEXTURE_2D,pe,Se,te.width,te.height),re&&Ye(_,te,ue,Ce)):t.texImage2D(i.TEXTURE_2D,0,Se,te.width,te.height,0,ue,Ce,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){C&&ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,Se,Ue[0].width,Ue[0].height,te.depth);for(let J=0,X=Ue.length;J<X;J++)if(le=Ue[J],_.format!==_n)if(ue!==null)if(C){if(re)if(_.layerUpdates.size>0){const _e=ou(le.width,le.height,_.format,_.type);for(const Fe of _.layerUpdates){const at=le.data.subarray(Fe*_e/le.data.BYTES_PER_ELEMENT,(Fe+1)*_e/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Fe,le.width,le.height,1,ue,at)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,le.width,le.height,te.depth,ue,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,Se,le.width,le.height,te.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else C?re&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,le.width,le.height,te.depth,ue,Ce,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,Se,le.width,le.height,te.depth,0,ue,Ce,le.data)}else{C&&ne&&t.texStorage2D(i.TEXTURE_2D,pe,Se,Ue[0].width,Ue[0].height);for(let J=0,X=Ue.length;J<X;J++)le=Ue[J],_.format!==_n?ue!==null?C?re&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,le.width,le.height,ue,le.data):t.compressedTexImage2D(i.TEXTURE_2D,J,Se,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):C?re&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,le.width,le.height,ue,Ce,le.data):t.texImage2D(i.TEXTURE_2D,J,Se,le.width,le.height,0,ue,Ce,le.data)}else if(_.isDataArrayTexture)if(C){if(ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,Se,te.width,te.height,te.depth),re)if(_.layerUpdates.size>0){const J=ou(te.width,te.height,_.format,_.type);for(const X of _.layerUpdates){const _e=te.data.subarray(X*J/te.data.BYTES_PER_ELEMENT,(X+1)*J/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,X,te.width,te.height,1,ue,Ce,_e)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ue,Ce,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Se,te.width,te.height,te.depth,0,ue,Ce,te.data);else if(_.isData3DTexture)C?(ne&&t.texStorage3D(i.TEXTURE_3D,pe,Se,te.width,te.height,te.depth),re&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ue,Ce,te.data)):t.texImage3D(i.TEXTURE_3D,0,Se,te.width,te.height,te.depth,0,ue,Ce,te.data);else if(_.isFramebufferTexture){if(ne)if(C)t.texStorage2D(i.TEXTURE_2D,pe,Se,te.width,te.height);else{let J=te.width,X=te.height;for(let _e=0;_e<pe;_e++)t.texImage2D(i.TEXTURE_2D,_e,Se,J,X,0,ue,Ce,null),J>>=1,X>>=1}}else if(Ue.length>0){if(C&&ne){const J=xt(Ue[0]);t.texStorage2D(i.TEXTURE_2D,pe,Se,J.width,J.height)}for(let J=0,X=Ue.length;J<X;J++)le=Ue[J],C?re&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,ue,Ce,le):t.texImage2D(i.TEXTURE_2D,J,Se,ue,Ce,le);_.generateMipmaps=!1}else if(C){if(ne){const J=xt(te);t.texStorage2D(i.TEXTURE_2D,pe,Se,J.width,J.height)}re&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,Ce,te)}else t.texImage2D(i.TEXTURE_2D,0,Se,ue,Ce,te);m(_)&&p(W),Me.__version=H.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function Q(M,_,U){if(_.image.length!==6)return;const W=rt(M,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+U);const H=n.get(Z);if(Z.version!==H.__version||W===!0){t.activeTexture(i.TEXTURE0+U);const Me=Xe.getPrimaries(Xe.workingColorSpace),se=_.colorSpace===ni?null:Xe.getPrimaries(_.colorSpace),xe=_.colorSpace===ni||Me===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const ye=_.isCompressedTexture||_.image[0].isCompressedTexture,te=_.image[0]&&_.image[0].isDataTexture,ue=[];for(let X=0;X<6;X++)!ye&&!te?ue[X]=v(_.image[X],!0,s.maxCubemapSize):ue[X]=te?_.image[X].image:_.image[X],ue[X]=Pt(_,ue[X]);const Ce=ue[0],Se=r.convert(_.format,_.colorSpace),le=r.convert(_.type),Ue=E(_.internalFormat,Se,le,_.colorSpace),C=_.isVideoTexture!==!0,ne=H.__version===void 0||W===!0,re=Z.dataReady;let pe=P(_,Ce);Ge(i.TEXTURE_CUBE_MAP,_);let J;if(ye){C&&ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ue,Ce.width,Ce.height);for(let X=0;X<6;X++){J=ue[X].mipmaps;for(let _e=0;_e<J.length;_e++){const Fe=J[_e];_.format!==_n?Se!==null?C?re&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,0,0,Fe.width,Fe.height,Se,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,Ue,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,0,0,Fe.width,Fe.height,Se,le,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,Ue,Fe.width,Fe.height,0,Se,le,Fe.data)}}}else{if(J=_.mipmaps,C&&ne){J.length>0&&pe++;const X=xt(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ue,X.width,X.height)}for(let X=0;X<6;X++)if(te){C?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ue[X].width,ue[X].height,Se,le,ue[X].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ue,ue[X].width,ue[X].height,0,Se,le,ue[X].data);for(let _e=0;_e<J.length;_e++){const at=J[_e].image[X].image;C?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,0,0,at.width,at.height,Se,le,at.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,Ue,at.width,at.height,0,Se,le,at.data)}}else{C?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Se,le,ue[X]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ue,Se,le,ue[X]);for(let _e=0;_e<J.length;_e++){const Fe=J[_e];C?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,0,0,Se,le,Fe.image[X]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,Ue,Se,le,Fe.image[X])}}}m(_)&&p(i.TEXTURE_CUBE_MAP),H.__version=Z.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function me(M,_,U,W,Z,H){const Me=r.convert(U.format,U.colorSpace),se=r.convert(U.type),xe=E(U.internalFormat,Me,se,U.colorSpace),ye=n.get(_),te=n.get(U);if(te.__renderTarget=_,!ye.__hasExternalTextures){const ue=Math.max(1,_.width>>H),Ce=Math.max(1,_.height>>H);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,H,xe,ue,Ce,_.depth,0,Me,se,null):t.texImage2D(Z,H,xe,ue,Ce,0,Me,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,M),be(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,Z,te.__webglTexture,0,ut(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,Z,te.__webglTexture,H),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(M,_,U){if(i.bindRenderbuffer(i.RENDERBUFFER,M),_.depthBuffer){const W=_.depthTexture,Z=W&&W.isDepthTexture?W.type:null,H=S(_.stencilBuffer,Z),Me=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=ut(_);be(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,H,_.width,_.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,se,H,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,H,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,M)}else{const W=_.textures;for(let Z=0;Z<W.length;Z++){const H=W[Z],Me=r.convert(H.format,H.colorSpace),se=r.convert(H.type),xe=E(H.internalFormat,Me,se,H.colorSpace),ye=ut(_);U&&be(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,xe,_.width,_.height):be(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye,xe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,xe,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(M,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,M),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=n.get(_.depthTexture);W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y(_.depthTexture,0);const Z=W.__webglTexture,H=ut(_);if(_.depthTexture.format===Js)be(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,H):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(_.depthTexture.format===er)be(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,H):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function qe(M){const _=n.get(M),U=M.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==M.depthTexture){const W=M.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){const Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",Z)};W.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=W}if(M.depthTexture&&!_.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const W=M.texture.mipmaps;W&&W.length>0?we(_.__webglFramebuffer[0],M):we(_.__webglFramebuffer,M)}else if(U){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=i.createRenderbuffer(),Le(_.__webglDepthbuffer[W],M,!1);else{const Z=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=_.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,H),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,H)}}else{const W=M.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Le(_.__webglDepthbuffer,M,!1);else{const Z=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,H),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,H)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(M,_,U){const W=n.get(M);_!==void 0&&me(W.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&qe(M)}function A(M){const _=M.texture,U=n.get(M),W=n.get(_);M.addEventListener("dispose",L);const Z=M.textures,H=M.isWebGLCubeRenderTarget===!0,Me=Z.length>1;if(Me||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=_.version,a.memory.textures++),H){U.__webglFramebuffer=[];for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer[se]=[];for(let xe=0;xe<_.mipmaps.length;xe++)U.__webglFramebuffer[se][xe]=i.createFramebuffer()}else U.__webglFramebuffer[se]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer=[];for(let se=0;se<_.mipmaps.length;se++)U.__webglFramebuffer[se]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(Me)for(let se=0,xe=Z.length;se<xe;se++){const ye=n.get(Z[se]);ye.__webglTexture===void 0&&(ye.__webglTexture=i.createTexture(),a.memory.textures++)}if(M.samples>0&&be(M)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let se=0;se<Z.length;se++){const xe=Z[se];U.__webglColorRenderbuffer[se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[se]);const ye=r.convert(xe.format,xe.colorSpace),te=r.convert(xe.type),ue=E(xe.internalFormat,ye,te,xe.colorSpace,M.isXRRenderTarget===!0),Ce=ut(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,ue,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,U.__webglColorRenderbuffer[se])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(U.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(H){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Ge(i.TEXTURE_CUBE_MAP,_);for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0)for(let xe=0;xe<_.mipmaps.length;xe++)me(U.__webglFramebuffer[se][xe],M,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe);else me(U.__webglFramebuffer[se],M,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(_)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let se=0,xe=Z.length;se<xe;se++){const ye=Z[se],te=n.get(ye);let ue=i.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(ue=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,te.__webglTexture),Ge(ue,ye),me(U.__webglFramebuffer,M,ye,i.COLOR_ATTACHMENT0+se,ue,0),m(ye)&&p(ue)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(se=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,W.__webglTexture),Ge(se,_),_.mipmaps&&_.mipmaps.length>0)for(let xe=0;xe<_.mipmaps.length;xe++)me(U.__webglFramebuffer[xe],M,_,i.COLOR_ATTACHMENT0,se,xe);else me(U.__webglFramebuffer,M,_,i.COLOR_ATTACHMENT0,se,0);m(_)&&p(se),t.unbindTexture()}M.depthBuffer&&qe(M)}function ct(M){const _=M.textures;for(let U=0,W=_.length;U<W;U++){const Z=_[U];if(m(Z)){const H=T(M),Me=n.get(Z).__webglTexture;t.bindTexture(H,Me),p(H),t.unbindTexture()}}}const Ie=[],Pe=[];function ve(M){if(M.samples>0){if(be(M)===!1){const _=M.textures,U=M.width,W=M.height;let Z=i.COLOR_BUFFER_BIT;const H=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(M),se=_.length>1;if(se)for(let ye=0;ye<_.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const xe=M.texture.mipmaps;xe&&xe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ye=0;ye<_.length;ye++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[ye]);const te=n.get(_[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,U,W,0,0,U,W,Z,i.NEAREST),l===!0&&(Ie.length=0,Pe.length=0,Ie.push(i.COLOR_ATTACHMENT0+ye),M.depthBuffer&&M.resolveDepthBuffer===!1&&(Ie.push(H),Pe.push(H),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Pe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),se)for(let ye=0;ye<_.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,Me.__webglColorRenderbuffer[ye]);const te=n.get(_[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const _=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ut(M){return Math.min(s.maxSamples,M.samples)}function be(M){const _=n.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ne(M){const _=a.render.frame;u.get(M)!==_&&(u.set(M,_),M.update())}function Pt(M,_){const U=M.colorSpace,W=M.format,Z=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||U!==xs&&U!==ni&&(Xe.getTransfer(U)===tt?(W!==_n||Z!==Rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),_}function xt(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=z,this.setTexture2D=Y,this.setTexture2DArray=$,this.setTexture3D=ie,this.setTextureCube=G,this.rebindTextures=Dt,this.setupRenderTarget=A,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=me,this.useMultisampledRTT=be}function V_(i,e){function t(n,s=ni){let r;const a=Xe.getTransfer(s);if(n===Rn)return i.UNSIGNED_BYTE;if(n===Zl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ql)return i.UNSIGNED_SHORT_5_5_5_1;if(n===fd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===dd)return i.BYTE;if(n===hd)return i.SHORT;if(n===Zs)return i.UNSIGNED_SHORT;if(n===Yl)return i.INT;if(n===Fi)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===fr)return i.HALF_FLOAT;if(n===md)return i.ALPHA;if(n===gd)return i.RGB;if(n===_n)return i.RGBA;if(n===Js)return i.DEPTH_COMPONENT;if(n===er)return i.DEPTH_STENCIL;if(n===Jl)return i.RED;if(n===ec)return i.RED_INTEGER;if(n===_d)return i.RG;if(n===tc)return i.RG_INTEGER;if(n===nc)return i.RGBA_INTEGER;if(n===ea||n===ta||n===na||n===ia)if(a===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ea)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ea)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ho||n===Vo||n===Wo||n===$o)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ho)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Vo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===$o)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qo||n===jo||n===Ko)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===qo||n===jo)return a===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ko)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xo||n===Yo||n===Zo||n===Qo||n===Jo||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xo)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Yo)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Zo)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qo)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Jo)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===el)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===tl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===il)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===rl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===al)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ol)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ll)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cl||n===ul||n===dl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===cl)return a===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ul)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===dl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hl||n===fl||n===pl||n===ml)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===hl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===fl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===pl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ml)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const W_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$_=`
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

}`;class q_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Dd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ci({vertexShader:W_,fragmentShader:$_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ut(new Rs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class j_ extends Ts{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new q_,p={},T=t.getContextAttributes();let E=null,S=null;const P=[],R=[],L=new ze;let B=null;const y=new gn;y.viewport=new bt;const x=new gn;x.viewport=new bt;const k=[y,x],z=new fp;let V=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Q=P[j];return Q===void 0&&(Q=new oo,P[j]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(j){let Q=P[j];return Q===void 0&&(Q=new oo,P[j]=Q),Q.getGripSpace()},this.getHand=function(j){let Q=P[j];return Q===void 0&&(Q=new oo,P[j]=Q),Q.getHandSpace()};function Y(j){const Q=R.indexOf(j.inputSource);if(Q===-1)return;const me=P[Q];me!==void 0&&(me.update(j.inputSource,j.frame,c||a),me.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",ie);for(let j=0;j<P.length;j++){const Q=R[j];Q!==null&&(R[j]=null,P[j].disconnect(Q))}V=null,q=null,m.reset();for(const j in p)delete p[j];e.setRenderTarget(E),f=null,h=null,d=null,s=null,S=null,Ye.stop(),n.isPresenting=!1,e.setPixelRatio(B),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",$),s.addEventListener("inputsourceschange",ie),T.xrCompatible!==!0&&await t.makeXRCompatible(),B=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Le=null,we=null;T.depth&&(we=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=T.stencil?er:Js,Le=T.stencil?Qs:Fi);const qe={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(qe),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new Ii(h.textureWidth,h.textureHeight,{format:_n,type:Rn,depthTexture:new Ld(h.textureWidth,h.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const me={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Ii(f.framebufferWidth,f.framebufferHeight,{format:_n,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ye.setContext(s),Ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(j){for(let Q=0;Q<j.removed.length;Q++){const me=j.removed[Q],Le=R.indexOf(me);Le>=0&&(R[Le]=null,P[Le].disconnect(me))}for(let Q=0;Q<j.added.length;Q++){const me=j.added[Q];let Le=R.indexOf(me);if(Le===-1){for(let qe=0;qe<P.length;qe++)if(qe>=R.length){R.push(me),Le=qe;break}else if(R[qe]===null){R[qe]=me,Le=qe;break}if(Le===-1)break}const we=P[Le];we&&we.connect(me)}}const G=new D,oe=new D;function de(j,Q,me){G.setFromMatrixPosition(Q.matrixWorld),oe.setFromMatrixPosition(me.matrixWorld);const Le=G.distanceTo(oe),we=Q.projectionMatrix.elements,qe=me.projectionMatrix.elements,Dt=we[14]/(we[10]-1),A=we[14]/(we[10]+1),ct=(we[9]+1)/we[5],Ie=(we[9]-1)/we[5],Pe=(we[8]-1)/we[0],ve=(qe[8]+1)/qe[0],ut=Dt*Pe,be=Dt*ve,Ne=Le/(-Pe+ve),Pt=Ne*-Pe;if(Q.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Pt),j.translateZ(Ne),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),we[10]===-1)j.projectionMatrix.copy(Q.projectionMatrix),j.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const xt=Dt+Ne,M=A+Ne,_=ut-Pt,U=be+(Le-Pt),W=ct*A/M*xt,Z=Ie*A/M*xt;j.projectionMatrix.makePerspective(_,U,W,Z,xt,M),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Ee(j,Q){Q===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Q.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let Q=j.near,me=j.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(me=m.depthFar)),z.near=x.near=y.near=Q,z.far=x.far=y.far=me,(V!==z.near||q!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),V=z.near,q=z.far),z.layers.mask=j.layers.mask|6,y.layers.mask=z.layers.mask&3,x.layers.mask=z.layers.mask&5;const Le=j.parent,we=z.cameras;Ee(z,Le);for(let qe=0;qe<we.length;qe++)Ee(we[qe],Le);we.length===2?de(z,y,x):z.projectionMatrix.copy(y.projectionMatrix),Ge(j,z,Le)};function Ge(j,Q,me){me===null?j.matrix.copy(Q.matrixWorld):(j.matrix.copy(me.matrixWorld),j.matrix.invert(),j.matrix.multiply(Q.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Q.projectionMatrix),j.projectionMatrixInverse.copy(Q.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=_l*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(j){return p[j]};let rt=null;function lt(j,Q){if(u=Q.getViewerPose(c||a),g=Q,u!==null){const me=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Le=!1;me.length!==z.cameras.length&&(z.cameras.length=0,Le=!0);for(let A=0;A<me.length;A++){const ct=me[A];let Ie=null;if(f!==null)Ie=f.getViewport(ct);else{const ve=d.getViewSubImage(h,ct);Ie=ve.viewport,A===0&&(e.setRenderTargetTextures(S,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(S))}let Pe=k[A];Pe===void 0&&(Pe=new gn,Pe.layers.enable(A),Pe.viewport=new bt,k[A]=Pe),Pe.matrix.fromArray(ct.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(ct.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),A===0&&(z.matrix.copy(Pe.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Le===!0&&z.cameras.push(Pe)}const we=s.enabledFeatures;if(we&&we.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const A=d.getDepthInformation(me[0]);A&&A.isValid&&A.texture&&m.init(A,s.renderState)}if(we&&we.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let A=0;A<me.length;A++){const ct=me[A].camera;if(ct){let Ie=p[ct];Ie||(Ie=new Dd,p[ct]=Ie);const Pe=d.getCameraImage(ct);Ie.sourceTexture=Pe}}}}for(let me=0;me<P.length;me++){const Le=R[me],we=P[me];Le!==null&&we!==void 0&&we.update(Le,Q,c||a)}rt&&rt(j,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Ye=new Id;Ye.setAnimationLoop(lt),this.setAnimationLoop=function(j){rt=j},this.dispose=function(){}}}const xi=new Cn,K_=new it;function X_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ed(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,E,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===$t&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===$t&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),E=T.envMap,S=T.envMapRotation;E&&(m.envMap.value=E,xi.copy(S),xi.x*=-1,xi.y*=-1,xi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),m.envMapRotation.value.setFromMatrix4(K_.makeRotationFromEuler(xi)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$t&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Y_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const S=E.program;n.uniformBlockBinding(T,S)}function c(T,E){let S=s[T.id];S===void 0&&(g(T),S=u(T),s[T.id]=S,T.addEventListener("dispose",m));const P=E.program;n.updateUBOMapping(T,P);const R=e.render.frame;r[T.id]!==R&&(h(T),r[T.id]=R)}function u(T){const E=d();T.__bindingPointIndex=E;const S=i.createBuffer(),P=T.__size,R=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,P,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,S),S}function d(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(T){const E=s[T.id],S=T.uniforms,P=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let R=0,L=S.length;R<L;R++){const B=Array.isArray(S[R])?S[R]:[S[R]];for(let y=0,x=B.length;y<x;y++){const k=B[y];if(f(k,R,y,P)===!0){const z=k.__offset,V=Array.isArray(k.value)?k.value:[k.value];let q=0;for(let Y=0;Y<V.length;Y++){const $=V[Y],ie=v($);typeof $=="number"||typeof $=="boolean"?(k.__data[0]=$,i.bufferSubData(i.UNIFORM_BUFFER,z+q,k.__data)):$.isMatrix3?(k.__data[0]=$.elements[0],k.__data[1]=$.elements[1],k.__data[2]=$.elements[2],k.__data[3]=0,k.__data[4]=$.elements[3],k.__data[5]=$.elements[4],k.__data[6]=$.elements[5],k.__data[7]=0,k.__data[8]=$.elements[6],k.__data[9]=$.elements[7],k.__data[10]=$.elements[8],k.__data[11]=0):($.toArray(k.__data,q),q+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,k.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(T,E,S,P){const R=T.value,L=E+"_"+S;if(P[L]===void 0)return typeof R=="number"||typeof R=="boolean"?P[L]=R:P[L]=R.clone(),!0;{const B=P[L];if(typeof R=="number"||typeof R=="boolean"){if(B!==R)return P[L]=R,!0}else if(B.equals(R)===!1)return B.copy(R),!0}return!1}function g(T){const E=T.uniforms;let S=0;const P=16;for(let L=0,B=E.length;L<B;L++){const y=Array.isArray(E[L])?E[L]:[E[L]];for(let x=0,k=y.length;x<k;x++){const z=y[x],V=Array.isArray(z.value)?z.value:[z.value];for(let q=0,Y=V.length;q<Y;q++){const $=V[q],ie=v($),G=S%P,oe=G%ie.boundary,de=G+oe;S+=oe,de!==0&&P-de<ie.storage&&(S+=P-de),z.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=S,S+=ie.storage}}}const R=S%P;return R>0&&(S+=P-R),T.__size=S,T.__cache={},this}function v(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function m(T){const E=T.target;E.removeEventListener("dispose",m);const S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Z_{constructor(e={}){const{canvas:t=Rf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const T=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let P=!1;this._outputColorSpace=an;let R=0,L=0,B=null,y=-1,x=null;const k=new bt,z=new bt;let V=null;const q=new De(0);let Y=0,$=t.width,ie=t.height,G=1,oe=null,de=null;const Ee=new bt(0,0,$,ie),Ge=new bt(0,0,$,ie);let rt=!1;const lt=new oc;let Ye=!1,j=!1;const Q=new it,me=new D,Le=new bt,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qe=!1;function Dt(){return B===null?G:1}let A=n;function ct(b,F){return t.getContext(b,F)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Kl}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",J,!1),A===null){const F="webgl2";if(A=ct(F,b),A===null)throw ct(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ie,Pe,ve,ut,be,Ne,Pt,xt,M,_,U,W,Z,H,Me,se,xe,ye,te,ue,Ce,Se,le,Ue;function C(){Ie=new o0(A),Ie.init(),Se=new V_(A,Ie),Pe=new e0(A,Ie,e,Se),ve=new G_(A,Ie),Pe.reversedDepthBuffer&&h&&ve.buffers.depth.setReversed(!0),ut=new u0(A),be=new R_,Ne=new H_(A,Ie,ve,be,Pe,Se,ut),Pt=new n0(S),xt=new a0(S),M=new gp(A),le=new Qg(A,M),_=new l0(A,M,ut,le),U=new h0(A,_,M,ut),te=new d0(A,Pe,Ne),se=new t0(be),W=new A_(S,Pt,xt,Ie,Pe,le,se),Z=new X_(S,be),H=new P_,Me=new U_(Ie),ye=new Zg(S,Pt,xt,ve,U,f,l),xe=new O_(S,U,Pe),Ue=new Y_(A,ut,Pe,ve),ue=new Jg(A,Ie,ut),Ce=new c0(A,Ie,ut),ut.programs=W.programs,S.capabilities=Pe,S.extensions=Ie,S.properties=be,S.renderLists=H,S.shadowMap=xe,S.state=ve,S.info=ut}C();const ne=new j_(S,A);this.xr=ne,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const b=Ie.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ie.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(b){b!==void 0&&(G=b,this.setSize($,ie,!1))},this.getSize=function(b){return b.set($,ie)},this.setSize=function(b,F,N=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=b,ie=F,t.width=Math.floor(b*G),t.height=Math.floor(F*G),N===!0&&(t.style.width=b+"px",t.style.height=F+"px"),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set($*G,ie*G).floor()},this.setDrawingBufferSize=function(b,F,N){$=b,ie=F,G=N,t.width=Math.floor(b*N),t.height=Math.floor(F*N),this.setViewport(0,0,b,F)},this.getCurrentViewport=function(b){return b.copy(k)},this.getViewport=function(b){return b.copy(Ee)},this.setViewport=function(b,F,N,O){b.isVector4?Ee.set(b.x,b.y,b.z,b.w):Ee.set(b,F,N,O),ve.viewport(k.copy(Ee).multiplyScalar(G).round())},this.getScissor=function(b){return b.copy(Ge)},this.setScissor=function(b,F,N,O){b.isVector4?Ge.set(b.x,b.y,b.z,b.w):Ge.set(b,F,N,O),ve.scissor(z.copy(Ge).multiplyScalar(G).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(b){ve.setScissorTest(rt=b)},this.setOpaqueSort=function(b){oe=b},this.setTransparentSort=function(b){de=b},this.getClearColor=function(b){return b.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor(...arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,N=!0){let O=0;if(b){let I=!1;if(B!==null){const ee=B.texture.format;I=ee===nc||ee===tc||ee===ec}if(I){const ee=B.texture.type,ce=ee===Rn||ee===Fi||ee===Zs||ee===Qs||ee===Zl||ee===Ql,ge=ye.getClearColor(),he=ye.getClearAlpha(),Re=ge.r,ke=ge.g,Te=ge.b;ce?(g[0]=Re,g[1]=ke,g[2]=Te,g[3]=he,A.clearBufferuiv(A.COLOR,0,g)):(v[0]=Re,v[1]=ke,v[2]=Te,v[3]=he,A.clearBufferiv(A.COLOR,0,v))}else O|=A.COLOR_BUFFER_BIT}F&&(O|=A.DEPTH_BUFFER_BIT),N&&(O|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",J,!1),ye.dispose(),H.dispose(),Me.dispose(),be.dispose(),Pt.dispose(),xt.dispose(),U.dispose(),le.dispose(),Ue.dispose(),W.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",xn),ne.removeEventListener("sessionend",bc),fi.stop()};function re(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const b=ut.autoReset,F=xe.enabled,N=xe.autoUpdate,O=xe.needsUpdate,I=xe.type;C(),ut.autoReset=b,xe.enabled=F,xe.autoUpdate=N,xe.needsUpdate=O,xe.type=I}function J(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function X(b){const F=b.target;F.removeEventListener("dispose",X),_e(F)}function _e(b){Fe(b),be.remove(b)}function Fe(b){const F=be.get(b).programs;F!==void 0&&(F.forEach(function(N){W.releaseProgram(N)}),b.isShaderMaterial&&W.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,N,O,I,ee){F===null&&(F=we);const ce=I.isMesh&&I.matrixWorld.determinant()<0,ge=kh(b,F,N,O,I);ve.setMaterial(O,ce);let he=N.index,Re=1;if(O.wireframe===!0){if(he=_.getWireframeAttribute(N),he===void 0)return;Re=2}const ke=N.drawRange,Te=N.attributes.position;let We=ke.start*Re,Je=(ke.start+ke.count)*Re;ee!==null&&(We=Math.max(We,ee.start*Re),Je=Math.min(Je,(ee.start+ee.count)*Re)),he!==null?(We=Math.max(We,0),Je=Math.min(Je,he.count)):Te!=null&&(We=Math.max(We,0),Je=Math.min(Je,Te.count));const _t=Je-We;if(_t<0||_t===1/0)return;le.setup(I,O,ge,N,he);let ot,st=ue;if(he!==null&&(ot=M.get(he),st=Ce,st.setIndex(ot)),I.isMesh)O.wireframe===!0?(ve.setLineWidth(O.wireframeLinewidth*Dt()),st.setMode(A.LINES)):st.setMode(A.TRIANGLES);else if(I.isLine){let Ae=O.linewidth;Ae===void 0&&(Ae=1),ve.setLineWidth(Ae*Dt()),I.isLineSegments?st.setMode(A.LINES):I.isLineLoop?st.setMode(A.LINE_LOOP):st.setMode(A.LINE_STRIP)}else I.isPoints?st.setMode(A.POINTS):I.isSprite&&st.setMode(A.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)tr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Ie.get("WEBGL_multi_draw"))st.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Ae=I._multiDrawStarts,ft=I._multiDrawCounts,Ke=I._multiDrawCount,jt=he?M.get(he).bytesPerElement:1,Hi=be.get(O).currentProgram.getUniforms();for(let Kt=0;Kt<Ke;Kt++)Hi.setValue(A,"_gl_DrawID",Kt),st.render(Ae[Kt]/jt,ft[Kt])}else if(I.isInstancedMesh)st.renderInstances(We,_t,I.count);else if(N.isInstancedBufferGeometry){const Ae=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,ft=Math.min(N.instanceCount,Ae);st.renderInstances(We,_t,ft)}else st.render(We,_t)};function at(b,F,N){b.transparent===!0&&b.side===Sn&&b.forceSinglePass===!1?(b.side=$t,b.needsUpdate=!0,_r(b,F,N),b.side=oi,b.needsUpdate=!0,_r(b,F,N),b.side=Sn):_r(b,F,N)}this.compile=function(b,F,N=null){N===null&&(N=b),p=Me.get(N),p.init(F),E.push(p),N.traverseVisible(function(I){I.isLight&&I.layers.test(F.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),b!==N&&b.traverseVisible(function(I){I.isLight&&I.layers.test(F.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),p.setupLights();const O=new Set;return b.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const ee=I.material;if(ee)if(Array.isArray(ee))for(let ce=0;ce<ee.length;ce++){const ge=ee[ce];at(ge,N,I),O.add(ge)}else at(ee,N,I),O.add(ee)}),p=E.pop(),O},this.compileAsync=function(b,F,N=null){const O=this.compile(b,F,N);return new Promise(I=>{function ee(){if(O.forEach(function(ce){be.get(ce).currentProgram.isReady()&&O.delete(ce)}),O.size===0){I(b);return}setTimeout(ee,10)}Ie.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let Ze=null;function Dn(b){Ze&&Ze(b)}function xn(){fi.stop()}function bc(){fi.start()}const fi=new Id;fi.setAnimationLoop(Dn),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(b){Ze=b,ne.setAnimationLoop(b),b===null?fi.stop():fi.start()},ne.addEventListener("sessionstart",xn),ne.addEventListener("sessionend",bc),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(F),F=ne.getCamera()),b.isScene===!0&&b.onBeforeRender(S,b,F,B),p=Me.get(b,E.length),p.init(F),E.push(p),Q.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),lt.setFromProjectionMatrix(Q,Tn,F.reversedDepth),j=this.localClippingEnabled,Ye=se.init(this.clippingPlanes,j),m=H.get(b,T.length),m.init(),T.push(m),ne.enabled===!0&&ne.isPresenting===!0){const ee=S.xr.getDepthSensingMesh();ee!==null&&Ua(ee,F,-1/0,S.sortObjects)}Ua(b,F,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(oe,de),qe=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,qe&&ye.addToRenderList(m,b),this.info.render.frame++,Ye===!0&&se.beginShadows();const N=p.state.shadowsArray;xe.render(N,b,F),Ye===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=m.opaque,I=m.transmissive;if(p.setupLights(),F.isArrayCamera){const ee=F.cameras;if(I.length>0)for(let ce=0,ge=ee.length;ce<ge;ce++){const he=ee[ce];yc(O,I,b,he)}qe&&ye.render(b);for(let ce=0,ge=ee.length;ce<ge;ce++){const he=ee[ce];xc(m,b,he,he.viewport)}}else I.length>0&&yc(O,I,b,F),qe&&ye.render(b),xc(m,b,F);B!==null&&L===0&&(Ne.updateMultisampleRenderTarget(B),Ne.updateRenderTargetMipmap(B)),b.isScene===!0&&b.onAfterRender(S,b,F),le.resetDefaultState(),y=-1,x=null,E.pop(),E.length>0?(p=E[E.length-1],Ye===!0&&se.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Ua(b,F,N,O){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)N=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||lt.intersectsSprite(b)){O&&Le.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Q);const ce=U.update(b),ge=b.material;ge.visible&&m.push(b,ce,ge,N,Le.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||lt.intersectsObject(b))){const ce=U.update(b),ge=b.material;if(O&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Le.copy(b.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Le.copy(ce.boundingSphere.center)),Le.applyMatrix4(b.matrixWorld).applyMatrix4(Q)),Array.isArray(ge)){const he=ce.groups;for(let Re=0,ke=he.length;Re<ke;Re++){const Te=he[Re],We=ge[Te.materialIndex];We&&We.visible&&m.push(b,ce,We,N,Le.z,Te)}}else ge.visible&&m.push(b,ce,ge,N,Le.z,null)}}const ee=b.children;for(let ce=0,ge=ee.length;ce<ge;ce++)Ua(ee[ce],F,N,O)}function xc(b,F,N,O){const I=b.opaque,ee=b.transmissive,ce=b.transparent;p.setupLightsView(N),Ye===!0&&se.setGlobalState(S.clippingPlanes,N),O&&ve.viewport(k.copy(O)),I.length>0&&gr(I,F,N),ee.length>0&&gr(ee,F,N),ce.length>0&&gr(ce,F,N),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function yc(b,F,N,O){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[O.id]===void 0&&(p.state.transmissionRenderTarget[O.id]=new Ii(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float")?fr:Rn,minFilter:Pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace}));const ee=p.state.transmissionRenderTarget[O.id],ce=O.viewport||k;ee.setSize(ce.z*S.transmissionResolutionScale,ce.w*S.transmissionResolutionScale);const ge=S.getRenderTarget(),he=S.getActiveCubeFace(),Re=S.getActiveMipmapLevel();S.setRenderTarget(ee),S.getClearColor(q),Y=S.getClearAlpha(),Y<1&&S.setClearColor(16777215,.5),S.clear(),qe&&ye.render(N);const ke=S.toneMapping;S.toneMapping=ri;const Te=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),p.setupLightsView(O),Ye===!0&&se.setGlobalState(S.clippingPlanes,O),gr(b,N,O),Ne.updateMultisampleRenderTarget(ee),Ne.updateRenderTargetMipmap(ee),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Je=0,_t=F.length;Je<_t;Je++){const ot=F[Je],st=ot.object,Ae=ot.geometry,ft=ot.material,Ke=ot.group;if(ft.side===Sn&&st.layers.test(O.layers)){const jt=ft.side;ft.side=$t,ft.needsUpdate=!0,Sc(st,N,O,Ae,ft,Ke),ft.side=jt,ft.needsUpdate=!0,We=!0}}We===!0&&(Ne.updateMultisampleRenderTarget(ee),Ne.updateRenderTargetMipmap(ee))}S.setRenderTarget(ge,he,Re),S.setClearColor(q,Y),Te!==void 0&&(O.viewport=Te),S.toneMapping=ke}function gr(b,F,N){const O=F.isScene===!0?F.overrideMaterial:null;for(let I=0,ee=b.length;I<ee;I++){const ce=b[I],ge=ce.object,he=ce.geometry,Re=ce.group;let ke=ce.material;ke.allowOverride===!0&&O!==null&&(ke=O),ge.layers.test(N.layers)&&Sc(ge,F,N,he,ke,Re)}}function Sc(b,F,N,O,I,ee){b.onBeforeRender(S,F,N,O,I,ee),b.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),I.onBeforeRender(S,F,N,O,b,ee),I.transparent===!0&&I.side===Sn&&I.forceSinglePass===!1?(I.side=$t,I.needsUpdate=!0,S.renderBufferDirect(N,F,O,I,b,ee),I.side=oi,I.needsUpdate=!0,S.renderBufferDirect(N,F,O,I,b,ee),I.side=Sn):S.renderBufferDirect(N,F,O,I,b,ee),b.onAfterRender(S,F,N,O,I,ee)}function _r(b,F,N){F.isScene!==!0&&(F=we);const O=be.get(b),I=p.state.lights,ee=p.state.shadowsArray,ce=I.state.version,ge=W.getParameters(b,I.state,ee,F,N),he=W.getProgramCacheKey(ge);let Re=O.programs;O.environment=b.isMeshStandardMaterial?F.environment:null,O.fog=F.fog,O.envMap=(b.isMeshStandardMaterial?xt:Pt).get(b.envMap||O.environment),O.envMapRotation=O.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Re===void 0&&(b.addEventListener("dispose",X),Re=new Map,O.programs=Re);let ke=Re.get(he);if(ke!==void 0){if(O.currentProgram===ke&&O.lightsStateVersion===ce)return wc(b,ge),ke}else ge.uniforms=W.getUniforms(b),b.onBeforeCompile(ge,S),ke=W.acquireProgram(ge,he),Re.set(he,ke),O.uniforms=ge.uniforms;const Te=O.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Te.clippingPlanes=se.uniform),wc(b,ge),O.needsLights=Dh(b),O.lightsStateVersion=ce,O.needsLights&&(Te.ambientLightColor.value=I.state.ambient,Te.lightProbe.value=I.state.probe,Te.directionalLights.value=I.state.directional,Te.directionalLightShadows.value=I.state.directionalShadow,Te.spotLights.value=I.state.spot,Te.spotLightShadows.value=I.state.spotShadow,Te.rectAreaLights.value=I.state.rectArea,Te.ltc_1.value=I.state.rectAreaLTC1,Te.ltc_2.value=I.state.rectAreaLTC2,Te.pointLights.value=I.state.point,Te.pointLightShadows.value=I.state.pointShadow,Te.hemisphereLights.value=I.state.hemi,Te.directionalShadowMap.value=I.state.directionalShadowMap,Te.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Te.spotShadowMap.value=I.state.spotShadowMap,Te.spotLightMatrix.value=I.state.spotLightMatrix,Te.spotLightMap.value=I.state.spotLightMap,Te.pointShadowMap.value=I.state.pointShadowMap,Te.pointShadowMatrix.value=I.state.pointShadowMatrix),O.currentProgram=ke,O.uniformsList=null,ke}function Mc(b){if(b.uniformsList===null){const F=b.currentProgram.getUniforms();b.uniformsList=sa.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function wc(b,F){const N=be.get(b);N.outputColorSpace=F.outputColorSpace,N.batching=F.batching,N.batchingColor=F.batchingColor,N.instancing=F.instancing,N.instancingColor=F.instancingColor,N.instancingMorph=F.instancingMorph,N.skinning=F.skinning,N.morphTargets=F.morphTargets,N.morphNormals=F.morphNormals,N.morphColors=F.morphColors,N.morphTargetsCount=F.morphTargetsCount,N.numClippingPlanes=F.numClippingPlanes,N.numIntersection=F.numClipIntersection,N.vertexAlphas=F.vertexAlphas,N.vertexTangents=F.vertexTangents,N.toneMapping=F.toneMapping}function kh(b,F,N,O,I){F.isScene!==!0&&(F=we),Ne.resetTextureUnits();const ee=F.fog,ce=O.isMeshStandardMaterial?F.environment:null,ge=B===null?S.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:xs,he=(O.isMeshStandardMaterial?xt:Pt).get(O.envMap||ce),Re=O.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,ke=!!N.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Te=!!N.morphAttributes.position,We=!!N.morphAttributes.normal,Je=!!N.morphAttributes.color;let _t=ri;O.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(_t=S.toneMapping);const ot=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,st=ot!==void 0?ot.length:0,Ae=be.get(O),ft=p.state.lights;if(Ye===!0&&(j===!0||b!==x)){const Nt=b===x&&O.id===y;se.setState(O,b,Nt)}let Ke=!1;O.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==ft.state.version||Ae.outputColorSpace!==ge||I.isBatchedMesh&&Ae.batching===!1||!I.isBatchedMesh&&Ae.batching===!0||I.isBatchedMesh&&Ae.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Ae.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Ae.instancing===!1||!I.isInstancedMesh&&Ae.instancing===!0||I.isSkinnedMesh&&Ae.skinning===!1||!I.isSkinnedMesh&&Ae.skinning===!0||I.isInstancedMesh&&Ae.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Ae.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Ae.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Ae.instancingMorph===!1&&I.morphTexture!==null||Ae.envMap!==he||O.fog===!0&&Ae.fog!==ee||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==se.numPlanes||Ae.numIntersection!==se.numIntersection)||Ae.vertexAlphas!==Re||Ae.vertexTangents!==ke||Ae.morphTargets!==Te||Ae.morphNormals!==We||Ae.morphColors!==Je||Ae.toneMapping!==_t||Ae.morphTargetsCount!==st)&&(Ke=!0):(Ke=!0,Ae.__version=O.version);let jt=Ae.currentProgram;Ke===!0&&(jt=_r(O,F,I));let Hi=!1,Kt=!1,ks=!1;const pt=jt.getUniforms(),nn=Ae.uniforms;if(ve.useProgram(jt.program)&&(Hi=!0,Kt=!0,ks=!0),O.id!==y&&(y=O.id,Kt=!0),Hi||x!==b){ve.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),pt.setValue(A,"projectionMatrix",b.projectionMatrix),pt.setValue(A,"viewMatrix",b.matrixWorldInverse);const Ht=pt.map.cameraPosition;Ht!==void 0&&Ht.setValue(A,me.setFromMatrixPosition(b.matrixWorld)),Pe.logarithmicDepthBuffer&&pt.setValue(A,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&pt.setValue(A,"isOrthographic",b.isOrthographicCamera===!0),x!==b&&(x=b,Kt=!0,ks=!0)}if(I.isSkinnedMesh){pt.setOptional(A,I,"bindMatrix"),pt.setOptional(A,I,"bindMatrixInverse");const Nt=I.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),pt.setValue(A,"boneTexture",Nt.boneTexture,Ne))}I.isBatchedMesh&&(pt.setOptional(A,I,"batchingTexture"),pt.setValue(A,"batchingTexture",I._matricesTexture,Ne),pt.setOptional(A,I,"batchingIdTexture"),pt.setValue(A,"batchingIdTexture",I._indirectTexture,Ne),pt.setOptional(A,I,"batchingColorTexture"),I._colorsTexture!==null&&pt.setValue(A,"batchingColorTexture",I._colorsTexture,Ne));const sn=N.morphAttributes;if((sn.position!==void 0||sn.normal!==void 0||sn.color!==void 0)&&te.update(I,N,jt),(Kt||Ae.receiveShadow!==I.receiveShadow)&&(Ae.receiveShadow=I.receiveShadow,pt.setValue(A,"receiveShadow",I.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(nn.envMap.value=he,nn.flipEnvMap.value=he.isCubeTexture&&he.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&F.environment!==null&&(nn.envMapIntensity.value=F.environmentIntensity),Kt&&(pt.setValue(A,"toneMappingExposure",S.toneMappingExposure),Ae.needsLights&&Lh(nn,ks),ee&&O.fog===!0&&Z.refreshFogUniforms(nn,ee),Z.refreshMaterialUniforms(nn,O,G,ie,p.state.transmissionRenderTarget[b.id]),sa.upload(A,Mc(Ae),nn,Ne)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(sa.upload(A,Mc(Ae),nn,Ne),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&pt.setValue(A,"center",I.center),pt.setValue(A,"modelViewMatrix",I.modelViewMatrix),pt.setValue(A,"normalMatrix",I.normalMatrix),pt.setValue(A,"modelMatrix",I.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Nt=O.uniformsGroups;for(let Ht=0,Ba=Nt.length;Ht<Ba;Ht++){const pi=Nt[Ht];Ue.update(pi,jt),Ue.bind(pi,jt)}}return jt}function Lh(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function Dh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(b,F,N){const O=be.get(b);O.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),be.get(b.texture).__webglTexture=F,be.get(b.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:N,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){const N=be.get(b);N.__webglFramebuffer=F,N.__useDefaultFramebuffer=F===void 0};const Fh=A.createFramebuffer();this.setRenderTarget=function(b,F=0,N=0){B=b,R=F,L=N;let O=!0,I=null,ee=!1,ce=!1;if(b){const he=be.get(b);if(he.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(A.FRAMEBUFFER,null),O=!1;else if(he.__webglFramebuffer===void 0)Ne.setupRenderTarget(b);else if(he.__hasExternalTextures)Ne.rebindTextures(b,be.get(b.texture).__webglTexture,be.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Te=b.depthTexture;if(he.__boundDepthTexture!==Te){if(Te!==null&&be.has(Te)&&(b.width!==Te.image.width||b.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ne.setupDepthRenderbuffer(b)}}const Re=b.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(ce=!0);const ke=be.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ke[F])?I=ke[F][N]:I=ke[F],ee=!0):b.samples>0&&Ne.useMultisampledRTT(b)===!1?I=be.get(b).__webglMultisampledFramebuffer:Array.isArray(ke)?I=ke[N]:I=ke,k.copy(b.viewport),z.copy(b.scissor),V=b.scissorTest}else k.copy(Ee).multiplyScalar(G).floor(),z.copy(Ge).multiplyScalar(G).floor(),V=rt;if(N!==0&&(I=Fh),ve.bindFramebuffer(A.FRAMEBUFFER,I)&&O&&ve.drawBuffers(b,I),ve.viewport(k),ve.scissor(z),ve.setScissorTest(V),ee){const he=be.get(b.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+F,he.__webglTexture,N)}else if(ce){const he=F;for(let Re=0;Re<b.textures.length;Re++){const ke=be.get(b.textures[Re]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Re,ke.__webglTexture,N,he)}}else if(b!==null&&N!==0){const he=be.get(b.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,he.__webglTexture,N)}y=-1},this.readRenderTargetPixels=function(b,F,N,O,I,ee,ce,ge=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=be.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ce!==void 0&&(he=he[ce]),he){ve.bindFramebuffer(A.FRAMEBUFFER,he);try{const Re=b.textures[ge],ke=Re.format,Te=Re.type;if(!Pe.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-O&&N>=0&&N<=b.height-I&&(b.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+ge),A.readPixels(F,N,O,I,Se.convert(ke),Se.convert(Te),ee))}finally{const Re=B!==null?be.get(B).__webglFramebuffer:null;ve.bindFramebuffer(A.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(b,F,N,O,I,ee,ce,ge=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=be.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ce!==void 0&&(he=he[ce]),he)if(F>=0&&F<=b.width-O&&N>=0&&N<=b.height-I){ve.bindFramebuffer(A.FRAMEBUFFER,he);const Re=b.textures[ge],ke=Re.format,Te=Re.type;if(!Pe.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,We),A.bufferData(A.PIXEL_PACK_BUFFER,ee.byteLength,A.STREAM_READ),b.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+ge),A.readPixels(F,N,O,I,Se.convert(ke),Se.convert(Te),0);const Je=B!==null?be.get(B).__webglFramebuffer:null;ve.bindFramebuffer(A.FRAMEBUFFER,Je);const _t=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await Cf(A,_t,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,We),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,ee),A.deleteBuffer(We),A.deleteSync(_t),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,N=0){const O=Math.pow(2,-N),I=Math.floor(b.image.width*O),ee=Math.floor(b.image.height*O),ce=F!==null?F.x:0,ge=F!==null?F.y:0;Ne.setTexture2D(b,0),A.copyTexSubImage2D(A.TEXTURE_2D,N,0,0,ce,ge,I,ee),ve.unbindTexture()};const Ih=A.createFramebuffer(),Uh=A.createFramebuffer();this.copyTextureToTexture=function(b,F,N=null,O=null,I=0,ee=null){ee===null&&(I!==0?(tr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=I,I=0):ee=0);let ce,ge,he,Re,ke,Te,We,Je,_t;const ot=b.isCompressedTexture?b.mipmaps[ee]:b.image;if(N!==null)ce=N.max.x-N.min.x,ge=N.max.y-N.min.y,he=N.isBox3?N.max.z-N.min.z:1,Re=N.min.x,ke=N.min.y,Te=N.isBox3?N.min.z:0;else{const sn=Math.pow(2,-I);ce=Math.floor(ot.width*sn),ge=Math.floor(ot.height*sn),b.isDataArrayTexture?he=ot.depth:b.isData3DTexture?he=Math.floor(ot.depth*sn):he=1,Re=0,ke=0,Te=0}O!==null?(We=O.x,Je=O.y,_t=O.z):(We=0,Je=0,_t=0);const st=Se.convert(F.format),Ae=Se.convert(F.type);let ft;F.isData3DTexture?(Ne.setTexture3D(F,0),ft=A.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Ne.setTexture2DArray(F,0),ft=A.TEXTURE_2D_ARRAY):(Ne.setTexture2D(F,0),ft=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,F.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,F.unpackAlignment);const Ke=A.getParameter(A.UNPACK_ROW_LENGTH),jt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Hi=A.getParameter(A.UNPACK_SKIP_PIXELS),Kt=A.getParameter(A.UNPACK_SKIP_ROWS),ks=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,ot.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,ot.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Re),A.pixelStorei(A.UNPACK_SKIP_ROWS,ke),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Te);const pt=b.isDataArrayTexture||b.isData3DTexture,nn=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){const sn=be.get(b),Nt=be.get(F),Ht=be.get(sn.__renderTarget),Ba=be.get(Nt.__renderTarget);ve.bindFramebuffer(A.READ_FRAMEBUFFER,Ht.__webglFramebuffer),ve.bindFramebuffer(A.DRAW_FRAMEBUFFER,Ba.__webglFramebuffer);for(let pi=0;pi<he;pi++)pt&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,be.get(b).__webglTexture,I,Te+pi),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,be.get(F).__webglTexture,ee,_t+pi)),A.blitFramebuffer(Re,ke,ce,ge,We,Je,ce,ge,A.DEPTH_BUFFER_BIT,A.NEAREST);ve.bindFramebuffer(A.READ_FRAMEBUFFER,null),ve.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(I!==0||b.isRenderTargetTexture||be.has(b)){const sn=be.get(b),Nt=be.get(F);ve.bindFramebuffer(A.READ_FRAMEBUFFER,Ih),ve.bindFramebuffer(A.DRAW_FRAMEBUFFER,Uh);for(let Ht=0;Ht<he;Ht++)pt?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,sn.__webglTexture,I,Te+Ht):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,sn.__webglTexture,I),nn?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Nt.__webglTexture,ee,_t+Ht):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Nt.__webglTexture,ee),I!==0?A.blitFramebuffer(Re,ke,ce,ge,We,Je,ce,ge,A.COLOR_BUFFER_BIT,A.NEAREST):nn?A.copyTexSubImage3D(ft,ee,We,Je,_t+Ht,Re,ke,ce,ge):A.copyTexSubImage2D(ft,ee,We,Je,Re,ke,ce,ge);ve.bindFramebuffer(A.READ_FRAMEBUFFER,null),ve.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else nn?b.isDataTexture||b.isData3DTexture?A.texSubImage3D(ft,ee,We,Je,_t,ce,ge,he,st,Ae,ot.data):F.isCompressedArrayTexture?A.compressedTexSubImage3D(ft,ee,We,Je,_t,ce,ge,he,st,ot.data):A.texSubImage3D(ft,ee,We,Je,_t,ce,ge,he,st,Ae,ot):b.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,ee,We,Je,ce,ge,st,Ae,ot.data):b.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,ee,We,Je,ot.width,ot.height,st,ot.data):A.texSubImage2D(A.TEXTURE_2D,ee,We,Je,ce,ge,st,Ae,ot);A.pixelStorei(A.UNPACK_ROW_LENGTH,Ke),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,jt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Hi),A.pixelStorei(A.UNPACK_SKIP_ROWS,Kt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,ks),ee===0&&F.generateMipmaps&&A.generateMipmap(ft),ve.unbindTexture()},this.initRenderTarget=function(b){be.get(b).__webglFramebuffer===void 0&&Ne.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Ne.setTextureCube(b,0):b.isData3DTexture?Ne.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ne.setTexture2DArray(b,0):Ne.setTexture2D(b,0),ve.unbindTexture()},this.resetState=function(){R=0,L=0,B=null,ve.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}const Lt=1,Lu=.45,zd=190,Gd=.38,Vt={water:8308963,waterDeep:6271188,sand:15918022,sandDark:14995624,grass:9425290,grassDark:7191922,gray:12104360,soil:12159582,soilDark:10581582,stone:13617339},yl={hub:{floor:"grass",accent:16767334,bloom:"#ffd966",emoji:"🏝️"},tide:{floor:"sand",accent:9425128,bloom:"#8fd0e8",emoji:"🌊"},garden:{floor:"grass",accent:8179580,bloom:"#ffd966",emoji:"🌱"},stump:{floor:"sand",accent:14258287,bloom:"#ffb38a",emoji:"🥥"},vines:{floor:"grass",accent:13215487,bloom:"#c9a6ff",emoji:"🍇"}},Q_=[.12,.35,.6,.88];function J_(i){let e=0;for(const t of Q_)(i??0)>=t&&e++;return e}const mt={problemsPerChamber:3,bananasPerCorrect:[3,5],bananasChestBase:10,comboBonus:2,crabSteal:3,eggPerCorrect:1,eggPerBerry:1,eggGoal:30,echoDoorChance:.3,echoProblems:2,hatRandomChestChance:.05,streakFreezePrice:40,petBananaBonus:.1,businessOrdersPerDay:4,businessBananaReward:[2,4],bakeMs:4500,businessStartingStock:{dough:6,sauce:6,cheese:6,tomato:4,flour:6,berries:4,milk:4}},ev={common:60,rare:25,epic:12,legendary:3},Hd={common:"⭐",rare:"🌟",epic:"💜",legendary:"🌈"},Sl=typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints||0)>0),Du={hub:1.8,chamber:1.5},tv=(()=>{if(typeof window>"u")return"high";const i=window.devicePixelRatio||1,e=Math.min(window.screen?.width||1024,window.screen?.height||768)<480;return Sl&&(e||i>2.5)?"low":"high"})();function nv(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function iv(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}class qn{constructor(e){this.next=nv(typeof e=="string"?iv(e):e)}float(){return this.next()}int(e,t){return e+Math.floor(this.next()*(t-e+1))}pick(e){return e[Math.floor(this.next()*e.length)]}shuffle(e){const t=e.slice();for(let n=t.length-1;n>0;n--){const s=Math.floor(this.next()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}chance(e){return this.next()<e}}new qn(Math.random()*2**32>>>0);const Ks=["tide","garden","stump","vines"],Ss={tide:["add_20","sub_20","missing_addend","add_100","sub_100"],garden:["tables_a","tables_b","tables_c","tables_mix","mult_2digit"],stump:["div_facts","share","div_remainder","missing_factor"],vines:["frac_magnitude","frac_compare","frac_equiv","frac_of_n"]},ln={};for(const i of Ks)Ss[i].forEach((e,t)=>{ln[e]={id:e,world:i,order:t,prereqs:t===0?[]:[Ss[i][t-1]],nameKey:`skill.${e}`}});const Ml=600,Vd=850,sv=.8,wl=10,rv=10,Fu=200,av=108,El=8;function ov(){const i={};for(const e of Object.keys(ln))i[e]={r:Ml,n:0,hist:[]};return{skills:i,facts:{},log:[]}}const lv=(i,e,t)=>Math.min(t,Math.max(e,i)),Aa=(i,e)=>e?Aa(e,i%e):i;function cv(i,e){return 1/(1+10**((e-i)/400))}function uv(i){return i<520?0:i<760?1:2}function Wd(i){return i.length?i.reduce((e,t)=>e+t,0)/i.length:0}function nr(i){return i.r>=Vd&&i.n>=wl&&i.hist.length>=wl&&Wd(i.hist)>=sv}function hi(i){if(!Number.isInteger(i)||i<10)return null;const e=Number(String(i).split("").reverse().join(""));return e===i||e<1?null:e}function $d(i){const e=[];for(let t=1;t<i;t++)Aa(t,i)===1&&e.push(t);return e}function ra(i,e,t){if(!e)return i;const n=Math.floor(e/t),s=e%t,r=i+n;if(!s)return r;const a=Aa(s,t),o=`${s/a}/${t/a}`;return r?`${r} ${o}`:o}function Xs(i,e){const t=Math.floor(i/e),n=i%e;return ra(t,n,e)}function Pn(i,e,t,{min:n=1,count:s=6}={}){const r=e===0?0:n,a=[{value:e,tag:"correct"}],o=new Set([e]),l=(u,d)=>{a.length>=s||u==null||!Number.isFinite(u)||(u=Math.round(u),!(u<r||o.has(u))&&(o.add(u),a.push({value:u,tag:d})))};for(const u of t)l(u.value,u.tag);for(const u of[1,-1,2,-2,3,-3])l(e+u,"near_miss");let c=4;for(;a.length<s;)l(e+(i.chance(.5)?c:-c),"random"),l(e+c,"random"),c++;return i.shuffle(a)}function dv(i,e,t,n){const s=c=>{const[u,d]=String(c).split("/").map(Number);return u/d},r=[{value:e,tag:"correct"}],a=[s(e)],o=(c,u)=>{if(r.length>=4)return;const d=s(c);!Number.isFinite(d)||d<=0||a.some(h=>Math.abs(h-d)<1e-9)||(a.push(d),r.push({value:c,tag:u}))};for(const c of t)o(c.value,c.tag);let l=0;for(;r.length<4&&l<50;)o(n(l++),"random");return i.shuffle(r)}function hv(i,{total:e,baskets:t,quotient:n,remainder:s}){const r=Xs(e,t),a=[{value:r,tag:"correct"}],o=new Set([String(r)]),l=(c,u)=>{if(a.length>=6||c==null||typeof c=="number"&&(!Number.isFinite(c)||c<0))return;const d=String(c);!d||o.has(d)||(o.add(d),a.push({value:c,tag:u}))};l(n,"remainder_ignored"),l(n+1,"near_miss"),l(ra(n,s+1,t),"near_miss"),l(ra(n,Math.max(1,s-1),t),"near_miss"),l(ra(n,s,t+1),"random");for(const c of[1,-1,2,-2,3,-3])l(Xs(e+c,t),"random");return i.shuffle(a)}function Gt(i,e){let t=i[0];for(const n of i)Math.abs(n.d-e)<Math.abs(t.d-e)&&(t=n);return t}const wt={};wt.add_20=(i,e)=>{const t=Gt([{d:420,gen:()=>{const a=e.int(1,9);return[a,e.int(1,Math.max(1,10-a))]}},{d:540,gen:()=>{const a=e.int(3,9);return[a,e.int(Math.max(2,11-a),Math.min(9,18-a))]}},{d:650,gen:()=>{const a=e.int(11,17);return[a,e.int(2,Math.min(9,20-a))]}}],i),[n,s]=t.gen(),r=n+s;return{kind:"fetch",equation:`${n} + ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Pn(e,r,[{value:Math.abs(n-s),tag:"addsub_confuse"},{value:hi(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:{key:"ex.near_miss",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s}}};wt.sub_20=(i,e)=>{const t=Gt([{d:460,gen:()=>{const a=e.int(3,10);return[a,e.int(1,a-1)]}},{d:580,gen:()=>{const a=e.int(12,19);return[a,e.int(1,a%10)]}},{d:690,gen:()=>{const a=e.int(11,18);return[a,e.int(a%10+1,9)]}}],i),[n,s]=t.gen(),r=n-s;return{kind:"fetch",equation:`${n} − ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Pn(e,r,[{value:n+s,tag:"addsub_confuse"},{value:hi(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:{key:"ex.addsub_confuse",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s}}};wt.missing_addend=(i,e)=>{const t=Gt([{d:500,gen:()=>{const a=e.int(5,10);return[e.int(1,a-1),a]}},{d:620,gen:()=>{const a=e.int(11,20);return[e.int(2,a-2),a]}},{d:780,gen:()=>{const a=e.int(6,18)*5;return[e.int(1,a/5-1)*5,a]}}],i),[n,s]=t.gen(),r=s-n;return{kind:"fetch",equation:`${n} + ? = ${s}`,prompt:{key:"q.missing",vars:{a:n,c:s}},answer:r,choices:Pn(e,r,[{value:n+s,tag:"addsub_confuse"},{value:hi(r),tag:"reversed"}]),model:{kind:"none",params:{}},explain:{key:"ex.addsub_confuse",vars:{a:n,c:s,answer:r}},difficulty:t.d,meta:{a:n,c:s}}};wt.add_100=(i,e)=>{const t=Gt([{d:560,carry:!1,gen:()=>{const o=e.int(1,7),l=e.int(1,8-o),c=e.int(1,8),u=e.int(0,9-c);return[o*10+c,l*10+u]}},{d:760,carry:!0,gen:()=>{const o=e.int(1,6),l=e.int(1,7-o),c=e.int(2,9),u=e.int(Math.max(2,11-c),9);return[o*10+c,l*10+u]}},{d:900,carry:!0,gen:()=>{const o=e.int(3,5),l=e.int(3,Math.min(5,8-o)),c=e.int(5,9),u=e.int(Math.max(5,11-c),9);return[o*10+c,l*10+u]}}],i),[n,s]=t.gen(),r=n+s,a=(n%10+s%10)%10+10*(Math.floor(n/10)+Math.floor(s/10));return{kind:"fetch",equation:`${n} + ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Pn(e,r,[{value:a,tag:"no_carry"},{value:hi(r),tag:"reversed"}]),model:{kind:"none",params:{}},explain:t.carry?{key:"ex.no_carry",vars:{a:n,b:s,answer:r}}:{key:"ex.near_miss",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s,carry:t.carry}}};wt.sub_100=(i,e)=>{const t=Gt([{d:620,borrow:!1,gen:()=>{const o=e.int(2,9),l=e.int(1,9);return[o*10+l,e.int(1,o-1)*10+e.int(0,l)]}},{d:840,borrow:!0,gen:()=>{const o=e.int(2,9),l=e.int(0,8);return[o*10+l,e.int(1,o-1)*10+e.int(l+1,9)]}},{d:980,borrow:!0,gen:()=>{const o=e.int(6,9),l=e.int(0,7);return[o*10+l,e.int(2,o-1)*10+e.int(l+1,9)]}}],i),[n,s]=t.gen(),r=n-s,a=(Math.floor(n/10)-Math.floor(s/10))*10+Math.abs(n%10-s%10);return{kind:"fetch",equation:`${n} − ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Pn(e,r,[{value:a,tag:"borrow"},{value:hi(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:t.borrow?{key:"ex.borrow",vars:{a:n,b:s,answer:r}}:{key:"ex.near_miss",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s,borrow:t.borrow}}};function fv(i,e,t,n,s,r){const a=n*s,o={a:n,b:s};if(e==="array"){const l=t===0||i.chance(.5)?"both":i.chance(.6)?"rows":"total";return{kind:"array",equation:l==="both"?`${n} × ${s} = ?`:l==="rows"?`${n} × ? = ${a}`:`? × ? = ${a}`,prompt:{key:`q.array_${l}`,vars:{rows:n,cols:s,total:a}},answer:a,choices:null,model:{kind:"array",params:{rows:n,cols:s,total:a,given:l}},explain:{key:"ex.off_by_table",vars:{a:n,b:s,answer:a}},difficulty:r+(l==="both"?0:30),meta:o}}return{kind:"fetch",equation:`${n} × ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:a,choices:Pn(i,a,[{value:(n+(i.chance(.5)?1:-1))*s,tag:"off_by_table"},{value:n*(s+(i.chance(.5)?1:-1)),tag:"off_by_table"},{value:n+s,tag:"addsub_confuse"},{value:hi(a),tag:"reversed"}]),model:{kind:"array",params:{rows:n,cols:s,total:a,given:"both"}},explain:{key:"ex.off_by_table",vars:{a:n,b:s,answer:a}},difficulty:r,meta:o}}function Ra(i){return(e,t,n,s)=>{const r=Gt(i,e),[a,o]=r.gen(t);return fv(t,n,s,a,o,r.d)}}wt.tables_a=Ra([{d:420,gen:i=>[i.pick([2,5,10]),i.int(1,5)]},{d:520,gen:i=>[i.pick([2,5,10]),i.int(2,10)]},{d:640,gen:i=>[i.pick([2,5,10]),i.int(6,10)]}]);wt.tables_b=Ra([{d:560,gen:i=>[i.pick([3,4,6]),i.int(2,5)]},{d:660,gen:i=>[i.pick([3,4,6]),i.int(2,10)]}]);wt.tables_c=Ra([{d:680,gen:i=>[i.pick([7,8,9]),i.int(2,5)]},{d:780,gen:i=>[i.pick([7,8,9]),i.int(2,10)]},{d:860,gen:i=>[i.pick([7,8,9]),i.int(6,9)]}]);wt.tables_mix=Ra([{d:600,gen:i=>[i.int(2,6),i.int(2,6)]},{d:700,gen:i=>[i.int(2,10),i.int(2,10)]},{d:800,gen:i=>[i.int(6,9),i.int(6,9)]}]);wt.mult_2digit=(i,e,t,n)=>{const s=Gt([{d:780,gen:()=>[e.int(2,4),e.int(12,29)]},{d:940,gen:()=>[e.int(3,7),e.int(13,49)]},{d:1100,gen:()=>[e.int(4,9),e.int(25,99)]}],i),[r,a]=s.gen(),o=r*a;if(t==="array")return{kind:"array",equation:`${r} × ${a} = ?`,prompt:{key:"q.array_both",vars:{rows:r,cols:a,total:o}},answer:o,choices:null,model:{kind:"array",params:{rows:r,cols:a,total:o,given:"both"}},explain:{key:"ex.no_carry",vars:{a:r,b:a,answer:o}},difficulty:s.d,meta:{a:r,b:a}};const l=r*Math.floor(a/10)*10+r*(a%10)%10;return{kind:"fetch",equation:`${r} × ${a} = ?`,prompt:{key:"q.fetch",vars:{a:r,b:a}},answer:o,choices:Pn(e,o,[{value:l,tag:"no_carry"},{value:(r+(e.chance(.5)?1:-1))*a,tag:"off_by_table"},{value:hi(o),tag:"reversed"}]),model:{kind:"array",params:{rows:r,cols:a,total:o,given:"both"}},explain:{key:"ex.no_carry",vars:{a:r,b:a,answer:o}},difficulty:s.d,meta:{a:r,b:a}}};function Ca(i,e,{total:t,baskets:n,quotient:s,remainder:r,d:a,meta:o,explain:l}){const c={kind:"baskets",params:{total:t,baskets:n,quotient:s,remainder:r}};if(e==="share")return{kind:"share",equation:`${t} ÷ ${n}`,prompt:{key:"q.share",vars:{total:t,baskets:n}},answer:s,choices:null,model:c,explain:l,difficulty:a,meta:o};const u=r>0?[{value:s+1,tag:"remainder_ignored"},{value:r,tag:"random"}]:[{value:s+(i.chance(.5)?1:-1),tag:"off_by_table"},{value:t-n,tag:"addsub_confuse"}];return{kind:"fetch",equation:`${t} ÷ ${n} = ?`,prompt:{key:r>0?"q.share_fetch":"q.fetch",vars:{total:t,baskets:n}},answer:r>0?Xs(t,n):s,choices:r>0?hv(i,{total:t,baskets:n,quotient:s,remainder:r}):Pn(i,s,u),model:c,explain:r>0?{...l,vars:{...l.vars||{},answer:Xs(t,n)}}:l,difficulty:a,meta:r>0?{...o,answerLabel:Xs(t,n)}:o}}wt.div_facts=(i,e,t)=>{const n=Gt([{d:480,gen:()=>[e.pick([2,5,10]),e.int(2,5)]},{d:600,gen:()=>[e.pick([2,3,4,5,6,10]),e.int(2,10)]},{d:720,gen:()=>[e.pick([6,7,8,9]),e.int(3,10)]}],i),[s,r]=n.gen(),a=s*r;return Ca(e,t,{total:a,baskets:s,quotient:r,remainder:0,d:n.d,meta:{a:s,b:r,c:a},explain:{key:"ex.div_fact",vars:{a:s,b:r,c:a,answer:r}}})};wt.share=(i,e,t)=>{const n=Gt([{d:560,gen:()=>[e.int(2,4),e.int(2,5)]},{d:700,gen:()=>[e.int(3,8),e.int(3,9)]},{d:860,gen:()=>[e.int(4,9),e.int(6,12)]}],i),[s,r]=n.gen(),a=s*r;return Ca(e,t,{total:a,baskets:s,quotient:r,remainder:0,d:n.d,meta:{baskets:s,quotient:r,total:a,remainder:0},explain:{key:"ex.div_fact",vars:{a:s,b:r,c:a,answer:r}}})};wt.div_remainder=(i,e,t)=>{const n=Gt([{d:680,gen:()=>[e.int(2,5),e.int(2,5)]},{d:820,gen:()=>[e.int(3,8),e.int(3,9)]},{d:960,gen:()=>[e.int(6,9),e.int(6,12)]}],i),[s,r]=n.gen(),a=e.int(1,s-1),o=s*r+a;return Ca(e,t,{total:o,baskets:s,quotient:r,remainder:a,d:n.d,meta:{baskets:s,quotient:r,total:o,remainder:a},explain:{key:"ex.remainder_ignored",vars:{total:o,baskets:s,quotient:r,remainder:a,answer:r}}})};wt.missing_factor=(i,e,t)=>{const n=Gt([{d:640,gen:()=>[e.int(2,5),e.int(2,5)]},{d:780,gen:()=>[e.int(3,9),e.int(3,9)]},{d:900,gen:()=>[e.int(6,12),e.int(6,9)]}],i),[s,r]=n.gen(),a=s*r;return t==="share"?Ca(e,"share",{total:a,baskets:r,quotient:s,remainder:0,d:n.d,meta:{a:s,b:r,c:a},explain:{key:"ex.missing_factor",vars:{a:s,b:r,c:a,answer:s}}}):{kind:"fetch",equation:`? × ${r} = ${a}`,prompt:{key:"q.missing",vars:{b:r,c:a}},answer:s,choices:Pn(e,s,[{value:s+(e.chance(.5)?1:-1),tag:"off_by_table"},{value:a-r,tag:"addsub_confuse"},{value:hi(s),tag:"reversed"}]),model:{kind:"array",params:{rows:s,cols:r,total:a,given:"total"}},explain:{key:"ex.missing_factor",vars:{a:s,b:r,c:a,answer:s}},difficulty:n.d,meta:{a:s,b:r,c:a}}};wt.frac_magnitude=(i,e,t,n)=>{const s=Gt([{d:520,denoms:[2,4],hi:1},{d:700,denoms:[3,6,8],hi:1},{d:880,denoms:[5,10,12],hi:1},{d:1040,denoms:[3,4,5,6,8],hi:2}],i),r=e.pick(s.denoms),a=s.hi;let o=a===1?e.int(1,r-1):e.int(1,2*r-1);o%r===0&&(o+=1);const l=[.05,.03,.02][n],c=r*a;return{kind:"numberline",equation:`${o}/${r}`,prompt:{key:"q.numberline",vars:{n:o,d:r}},answer:o/r,accept:{tol:l},choices:null,model:{kind:"numberline",params:{n:o,d:r,lo:0,hi:a,ticks:c}},explain:{key:"ex.magnitude",vars:{n:o,d:r}},difficulty:s.d,meta:{n:o,d:r,lo:0,hi:a}}};wt.frac_compare=(i,e)=>{const t=Gt([{d:620,denoms:[2,3,4]},{d:760,denoms:[2,3,4,6,8]},{d:920,denoms:[3,5,8,10,12]}],i),n=new Set,s=[],r=(f,g)=>{const v=Aa(f,g),m=`${f/v}/${g/v}`;n.has(m)||(n.add(m),s.push({n:f,d:g,v:f/g}))};let a=0;for(;s.length<4&&a++<200;){const f=e.pick(t.denoms);r(e.int(1,f-1),f)}for(const[f,g]of[[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[4,5],[5,6]]){if(s.length>=4)break;r(f,g)}s.sort((f,g)=>g.v-f.v);const o=s[0],l=s.slice(1),c=l.reduce((f,g)=>g.n+g.d>f.n+f.d?g:f,l[0]),u=l.filter(f=>f!==c),d=u.reduce((f,g)=>o.v-g.v<o.v-f.v?g:f,u[0]),h=e.shuffle([{value:`${o.n}/${o.d}`,tag:"correct"},...l.map(f=>({value:`${f.n}/${f.d}`,tag:f===c?"whole_number_bias":f===d?"near_miss":"random"}))]);return{kind:"fetch",equation:`${h.map(f=>f.value).join(" · ")} → ?`,prompt:{key:"q.compare",vars:{count:4}},answer:`${o.n}/${o.d}`,choices:h,model:{kind:"numberline",params:{n:o.n,d:o.d,lo:0,hi:1,ticks:o.d+1}},explain:{key:"ex.whole_number_bias",vars:{n:c.n,d:c.d,answer:`${o.n}/${o.d}`}},difficulty:t.d,meta:{fractions:s.map(f=>`${f.n}/${f.d}`)}}};wt.frac_equiv=(i,e)=>{const t=Gt([{d:660,denoms:[2,3,4],kMax:3},{d:800,denoms:[2,3,4,5,6],kMax:4},{d:940,denoms:[3,4,5,6,8],kMax:6}],i),n=e.pick(t.denoms),s=e.pick($d(n)),r=e.int(2,t.kMax),a=`${s*r}/${n*r}`,o=dv(e,a,[{value:`${s+r}/${n+r}`,tag:"add_tops_bottoms"},{value:`${s*r+1}/${n*r}`,tag:"near_miss"},{value:`${(s+1)*r}/${(n+1)*r}`,tag:"whole_number_bias"},{value:`${s*r}/${n*(r+1)}`,tag:"near_miss"}],l=>`${s*r+2+l}/${n*r}`);return{kind:"fetch",equation:`${s}/${n} = ?`,prompt:{key:"q.equiv",vars:{n:s,d:n}},answer:a,choices:o,model:{kind:"numberline",params:{n:s,d:n,lo:0,hi:1,ticks:n*r+1}},explain:{key:"ex.equiv",vars:{n:s,d:n,answer:a}},difficulty:t.d,meta:{n:s,d:n,k:r}}};wt.frac_of_n=(i,e)=>{const t=Gt([{d:720,denoms:[2,4],mMin:2,mMax:6},{d:880,denoms:[3,4,6,8],mMin:3,mMax:8},{d:1040,denoms:[5,8,10,12],mMin:4,mMax:10}],i),n=e.pick(t.denoms),s=e.pick($d(n)),r=n*e.int(t.mMin,t.mMax),a=r/n,o=a*s;return{kind:"fetch",equation:`${s}/${n} × ${r} = ?`,prompt:{key:"q.frac_of",vars:{n:s,d:n,whole:r}},answer:o,choices:Pn(e,o,[{value:a,tag:"whole_number_bias"},{value:o+a,tag:"near_miss"},{value:o-a,tag:"near_miss"},{value:r-s,tag:"random"}]),model:{kind:"baskets",params:{total:r,baskets:n,quotient:a,remainder:0}},explain:{key:"ex.generic",vars:{n:s,d:n,whole:r,answer:o}},difficulty:t.d,meta:{n:s,d:n,whole:r}}};const Iu={add_20:"fetch",sub_20:"fetch",missing_addend:"fetch",add_100:"fetch",sub_100:"fetch",tables_a:"fetch",tables_b:"fetch",tables_c:"fetch",tables_mix:"fetch",mult_2digit:"fetch",div_facts:"fetch",share:"share",div_remainder:"share",missing_factor:"fetch",frac_magnitude:"numberline",frac_compare:"fetch",frac_equiv:"fetch",frac_of_n:"fetch"},pv={add_20:["fetch"],sub_20:["fetch"],missing_addend:["fetch"],add_100:["fetch"],sub_100:["fetch"],tables_a:["fetch","array"],tables_b:["fetch","array"],tables_c:["fetch","array"],tables_mix:["fetch","array"],mult_2digit:["fetch"],div_facts:["fetch","share"],share:["share","fetch"],div_remainder:["share","fetch"],missing_factor:["fetch","share"],frac_magnitude:["numberline"],frac_compare:["fetch"],frac_equiv:["fetch"],frac_of_n:["fetch"]};function mv(i,e,t,n){const s=pv[i];if(t)return s.includes(t)?t:Iu[i];const r=Iu[i],{world:a}=ln[i];if(e.n>=El&&r==="fetch"){if(a==="garden"&&s.includes("array")&&n.chance(.35))return"array";if(a==="stump"&&s.includes("share")&&n.chance(.35))return"share"}return r}function Tl(i,e){if(!Array.isArray(i)||!i.length)return null;const t=new Set(i.filter(n=>ln[n]?.world===e));return t.size?t:null}function gv(i){if(!Array.isArray(i)||!i.length)return null;const e=[...new Set(i.map(t=>ln[t]?.world).filter(Boolean))];return e.length?e:null}function Uu(i,e,t=null){const n=Tl(t,e),s=Ss[e].filter(r=>!n||n.has(r));for(const r of s)if(!nr(i.skills[r]))return r;return s[s.length-1]??Ss[e][0]}function Bu(i,e){for(let t=i.log.length-1;t>=0;t--)if(i.log[t].skill===e)return i.log[t].t;return 0}function _v(i,e=null){const t=Array.isArray(e)&&e.length?new Set(e):null,n=Object.keys(ln).filter(r=>i.skills[r].n>0),s=t?n.filter(r=>t.has(r)):n;return s.length?(s.sort((r,a)=>{const o=i.skills[r].r-i.skills[a].r;return Math.abs(o)>1?o:Bu(i,r)-Bu(i,a)}),s[0]):null}function vv(i,e){let t=i.r-av;if(i.n<El){t-=(El-i.n)*25;let n=0;for(let s=i.hist.length-1;s>=0&&i.hist[s]===1;s--)n++;t+=n*45}return t+(e.float()-.5)*80}function bv(i,e=2){const t=[];for(let n=i.log.length-1;n>=0&&t.length<e;n--){const s=i.log[n];s.skill==="frac_magnitude"&&s.item&&Number.isFinite(s.value)&&t.push(s)}return t}function Nu(i,e,t){const n=`${i.meta.n}/${i.meta.d}`;let s=0;return e[0]?.item===n?s+=12:e.some(r=>r.item===n)&&(s+=7),e.some(r=>Math.abs(r.value-i.answer)<1e-9)&&(s+=6),t.n>0&&t.n<4&&i.meta.d===2&&(s+=3),s}function xv(i,e,t,n,s,r,a){const o=bv(e);if(!o.length)return i;let l=i,c=Nu(l,o,a);for(let u=0;u<12&&c>0;u++){const d=wt.frac_magnitude(n,t,s,r),h=Nu(d,o,a);h<c&&(l=d,c=h)}return l}function Ri(i,e={}){const t=e.rng??new qn(Math.random()*4294967296>>>0);let n;if(e.skill&&ln[e.skill])n=e.skill;else if(e.echo)n=_v(i,e.allowedSkills)??Uu(i,e.world??t.pick(Ks),e.allowedSkills);else{const u=e.world&&Ks.includes(e.world)?e.world:t.pick(Ks),d=Tl(e.allowedSkills,u),h=gv(e.allowedSkills),f=d||!h?u:t.pick(h),g=Uu(i,f,e.allowedSkills),v=Tl(e.allowedSkills,f),m=t.float();if(m<.7)n=g;else if(m<.9){const p=Ss[f][ln[g].order-1]??g;n=!v||v.has(p)?p:g}else{const p=Object.keys(ln).filter(T=>T!==g&&nr(i.skills[T])&&(!v||v.has(T)));n=p.length?t.pick(p):g}}const s=i.skills[n],r=uv(s.r),a=mv(n,s,e.kind,t),o=vv(s,t);let l=wt[n](o,t,a,r);return n==="frac_magnitude"&&(l=xv(l,i,t,o,a,r,s)),{id:`${n}-${Math.floor(t.float()*4294967295).toString(36)}${Math.floor(t.float()*4294967295).toString(36)}`,skillId:n,world:ln[n].world,kind:l.kind,equation:l.equation,prompt:l.prompt,answer:l.answer,accept:l.accept??null,choices:l.choices??null,model:l.model,scaffold:r,difficulty:l.difficulty,explain:l.explain,meta:l.meta}}const yv=new Set(["tables_a","tables_b","tables_c","tables_mix","div_facts"]),Al=i=>!!i&&i.ok>=3&&i.lastOk;function Sv(i,e,t){if(!yv.has(e.skillId))return[];const{a:n,b:s}=e.meta??{};if(!n||!s||n>10||s>10)return[];const r=n===s?[`${n}x${s}`]:[`${n}x${s}`,`${s}x${n}`],a=[];for(const o of r){const l=i.facts[o]??(i.facts[o]={n:0,ok:0,lastOk:!1}),c=Al(l);l.n+=1,t&&(l.ok+=1),l.lastOk=!!t,!c&&Al(l)&&a.push(o)}return a}function Ou(i,e,t){const n=i.skills[e.skillId],s=nr(n),r=cv(n.r,e.difficulty),a=n.n<20?32:16,o=t.correct?t.usedHint?.7:1:0,l=a*(o-r);n.r+=l,n.n+=1,n.hist.push(t.correct?1:0),n.hist.length>rv&&n.hist.shift(),i.log.push({t:Date.now(),skill:e.skillId,tag:e.explain?.key??null,item:e.meta?.n!==void 0&&e.meta?.d!==void 0?`${e.meta.n}/${e.meta.d}`:null,value:typeof e.answer=="number"?e.answer:null,ok:!!t.correct,ms:t.ms??0,hint:!!t.usedHint}),i.log.length>Fu&&i.log.splice(0,i.log.length-Fu);const c=Sv(i,e,!!t.correct),u=!s&&nr(n)?e.skillId:null;return{delta:l,rating:n.r,masteredSkill:u,newGems:c}}function yi(i){const e={};for(const s of Ks){const r=Ss[s].map(o=>{const l=i.skills[o];return{id:o,nameKey:ln[o].nameKey,rating:Math.round(l.r),acc10:Wd(l.hist),n:l.n,mastered:nr(l)}}),a=r.reduce((o,l)=>o+(l.mastered?1:lv((l.rating-Ml)/(Vd-Ml),0,1)*Math.min(1,l.n/wl)),0)/r.length;e[s]={pct:a,skills:r}}const t=Object.keys(i.facts).filter(s=>Al(i.facts[s])),n=Object.keys(ln).filter(s=>i.skills[s].n>0).sort((s,r)=>i.skills[s].r-i.skills[r].r).slice(0,3);return{worlds:e,gems:{lit:t,total:100},weakest:n}}const Ps=[{id:"lanterns",char:"l",cost:30,points:.25,emoji:"🏮"},{id:"fruitstand",char:"f",cost:60,points:.7,emoji:"🍉",npc:{pet:"redpanda",face:"🦊"},perk:{kind:"bananas",n:8}},{id:"garden",char:"e",cost:90,points:1.2,emoji:"🌺"},{id:"stage",char:"h",cost:120,points:1.8,emoji:"🎵",npc:{pet:"kitten",face:"🐱"}},{id:"bakery",char:"k",cost:150,points:2.4,emoji:"🥐",npc:{pet:"piglet",face:"🐷"},perk:{kind:"egg",n:3}},{id:"bridge",char:"b",cost:200,points:3,emoji:"🌉"},{id:"plaza",char:"j",cost:500,contribution:250,points:3.4,needs:["bridge"],emoji:"🎪",finale:!0}];Ps.length;const qd={};for(const i of Ps)qd[i.id]=i;const Mv=i=>qd[i]||null;function Rl(){return{built:[],seen:[],perkDay:null}}function mr(i){i.island||(i.island=Rl());for(const[e,t]of Object.entries(Rl()))i.island[e]===void 0&&(i.island[e]=t);return i.island}function jd(i){let e=0;for(const t of Object.values(i.worlds))e+=t.pct;return e}const ma=(i,e)=>mr(i).built.includes(e),uc=i=>i.cost-(i.contribution||0);function Kd(i,e,t){if(ma(i,e.id))return"built";if(jd(t)<e.points)return"locked";for(const n of e.needs||[])if(!ma(i,n))return"locked";return"unlocked"}function aa(i,e){return Ps.map(t=>({...t,state:Kd(i,t,e),playerCost:uc(t)}))}function wv(i,e){const t=mr(i);return aa(i,e).filter(n=>n.state==="unlocked"&&!t.seen.includes(n.id))}function Ev(i,e){const t=mr(i);for(const n of e)t.seen.includes(n)||t.seen.push(n)}function Tv(i,e,t){return Kd(i,e,t)==="unlocked"&&i.bananas>=uc(e)}function Av(i,e,t){return Tv(i,e,t)?(i.bananas-=uc(e),mr(i).built.push(e.id),!0):!1}function Rv(i,e){const t=mr(i);return t.perkDay===e?[]:(t.perkDay=e,Ps.filter(n=>n.perk&&t.built.includes(n.id)).map(n=>({id:n.id,...n.perk})))}function Cv(i,e){const t=e.includes("bridge");return i.map(n=>n.replace(/w/g,t?"V":"#"))}const Pv={id:"NL_PO",titleKey:"curriculum.nl_po.title",countryCode:"NL",countryKey:"curriculum.country.nl",fallbackStagePrefixKey:"curriculum.stage",stages:[{id:"grade_1",order:1,minAge:4,maxAge:5,labelKey:"curriculum.nl_po.stage.grade_1"},{id:"grade_2",order:2,minAge:5,maxAge:6,labelKey:"curriculum.nl_po.stage.grade_2"},{id:"grade_3",order:3,minAge:6,maxAge:7,labelKey:"curriculum.nl_po.stage.grade_3"},{id:"grade_4",order:4,minAge:7,maxAge:8,labelKey:"curriculum.nl_po.stage.grade_4"},{id:"grade_5",order:5,minAge:8,maxAge:9,labelKey:"curriculum.nl_po.stage.grade_5"},{id:"grade_6",order:6,minAge:9,maxAge:10,labelKey:"curriculum.nl_po.stage.grade_6"},{id:"grade_7",order:7,minAge:10,maxAge:11,labelKey:"curriculum.nl_po.stage.grade_7"},{id:"grade_8",order:8,minAge:11,maxAge:12,labelKey:"curriculum.nl_po.stage.grade_8"}],domains:[{id:"numbers",labelKey:"curriculum.domain.numbers"},{id:"operations",labelKey:"curriculum.domain.operations"},{id:"ratios",labelKey:"curriculum.domain.ratios"},{id:"measurement_geometry",labelKey:"curriculum.domain.measurement_geometry"},{id:"data_relationships",labelKey:"curriculum.domain.data_relationships"}],objectives:[{id:"nl_po.grade3.add_sub_to_20",stage:"grade_3",domain:"operations",titleKey:"curriculum.nl_po.objective.add_sub_to_20",status:"playable",gameSkills:["add_20","sub_20"]},{id:"nl_po.grade3.missing_addend_intro",stage:"grade_3",domain:"operations",titleKey:"curriculum.nl_po.objective.missing_addend_intro",status:"playable",gameSkills:["missing_addend"]},{id:"nl_po.grade4.add_sub_to_100",stage:"grade_4",domain:"operations",titleKey:"curriculum.nl_po.objective.add_sub_to_100",status:"playable",gameSkills:["add_100","sub_100"]},{id:"nl_po.grade4.tables_2_5_10",stage:"grade_4",domain:"operations",titleKey:"curriculum.nl_po.objective.tables_2_5_10",status:"playable",gameSkills:["tables_a"],businessModes:["repeated_addition_orders"]},{id:"nl_po.grade4.fair_sharing_intro",stage:"grade_4",domain:"operations",titleKey:"curriculum.nl_po.objective.fair_sharing_intro",status:"playable",gameSkills:["share"],businessModes:["portion_halves_quarters"]},{id:"nl_po.grade4.money_to_100",stage:"grade_4",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.money_to_100",status:"playable",gameSkills:[],businessModes:["money_make_amounts"]},{id:"nl_po.grade5.tables_3_4_6",stage:"grade_5",domain:"operations",titleKey:"curriculum.nl_po.objective.tables_3_4_6",status:"playable",gameSkills:["tables_b"]},{id:"nl_po.grade5.tables_7_8_9",stage:"grade_5",domain:"operations",titleKey:"curriculum.nl_po.objective.tables_7_8_9",status:"playable",gameSkills:["tables_c"]},{id:"nl_po.grade5.all_tables_mixed",stage:"grade_5",domain:"operations",titleKey:"curriculum.nl_po.objective.all_tables_mixed",status:"playable",gameSkills:["tables_mix"]},{id:"nl_po.grade5.measurement_units_intro",stage:"grade_5",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.measurement_units_intro",status:"playable",gameSkills:[],businessModes:["recipe_measure_whole"]},{id:"nl_po.grade5.decimal_money_context",stage:"grade_5",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.decimal_money_context",status:"playable",gameSkills:[],businessModes:["decimal_money_change"]},{id:"nl_po.grade6.multi_digit_multiplication",stage:"grade_6",domain:"operations",titleKey:"curriculum.nl_po.objective.multi_digit_multiplication",status:"playable",gameSkills:["mult_2digit"]},{id:"nl_po.grade6.division_facts_and_inverse",stage:"grade_6",domain:"operations",titleKey:"curriculum.nl_po.objective.division_facts_and_inverse",status:"playable",gameSkills:["div_facts","missing_factor"]},{id:"nl_po.grade6.division_with_remainders",stage:"grade_6",domain:"operations",titleKey:"curriculum.nl_po.objective.division_with_remainders",status:"playable",gameSkills:["div_remainder"]},{id:"nl_po.grade6.fraction_magnitude",stage:"grade_6",domain:"ratios",titleKey:"curriculum.nl_po.objective.fraction_magnitude",status:"playable",gameSkills:["frac_magnitude"]},{id:"nl_po.grade6.fraction_of_quantity",stage:"grade_6",domain:"ratios",titleKey:"curriculum.nl_po.objective.fraction_of_quantity",status:"playable",gameSkills:["frac_of_n"],businessModes:["fraction_of_quantity_recipe"]},{id:"nl_po.grade6.unit_conversion_context",stage:"grade_6",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.unit_conversion_context",status:"playable",gameSkills:[],businessModes:["unit_conversion_stock"]},{id:"nl_po.grade6.price_comparison",stage:"grade_6",domain:"data_relationships",titleKey:"curriculum.nl_po.objective.price_comparison",status:"playable",gameSkills:[],businessModes:["price_compare"]},{id:"nl_po.grade7.fraction_compare_equivalence",stage:"grade_7",domain:"ratios",titleKey:"curriculum.nl_po.objective.fraction_compare_equivalence",status:"playable",gameSkills:["frac_compare","frac_equiv"]},{id:"nl_po.grade7.percentages_intro",stage:"grade_7",domain:"ratios",titleKey:"curriculum.nl_po.objective.percentages_intro",status:"playable",gameSkills:[],businessModes:["percentage_discount"]},{id:"nl_po.grade7.profit_margin_intro",stage:"grade_7",domain:"data_relationships",titleKey:"curriculum.nl_po.objective.profit_margin_intro",status:"playable",gameSkills:[],businessModes:["profit_margin"]},{id:"nl_po.grade7.scale_recipe",stage:"grade_7",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.scale_recipe",status:"playable",gameSkills:[],businessModes:["scale_recipe"]},{id:"nl_po.grade7.scale_and_coordinates",stage:"grade_7",domain:"measurement_geometry",titleKey:"curriculum.nl_po.objective.scale_and_coordinates",status:"planned",gameSkills:[]},{id:"nl_po.grade8.operations_maintenance",stage:"grade_8",domain:"operations",titleKey:"curriculum.nl_po.objective.operations_maintenance",status:"playable",gameSkills:["mult_2digit","div_remainder"]},{id:"nl_po.grade8.fraction_decimal_percent_relations",stage:"grade_8",domain:"ratios",titleKey:"curriculum.nl_po.objective.fraction_decimal_percent_relations",status:"playable",gameSkills:["frac_compare","frac_equiv","frac_of_n"]},{id:"nl_po.grade8.inverse_reasoning",stage:"grade_8",domain:"operations",titleKey:"curriculum.nl_po.objective.inverse_reasoning",status:"playable",gameSkills:["missing_factor"]},{id:"nl_po.grade8.advanced_data_reasoning",stage:"grade_8",domain:"data_relationships",titleKey:"curriculum.nl_po.objective.advanced_data_reasoning",status:"playable",gameSkills:[],businessModes:["demand_chart"]}]},Cl={NL_PO:Pv};function kn(i="NL_PO"){return Cl[i]||Cl.NL_PO}function Xd(){return Object.values(Cl).sort((i,e)=>i.id.localeCompare(e.id))}function zu(i="NL_PO",e={}){return kn(i).objectives.filter(n=>!(e.status&&n.status!==e.status||e.stage&&n.stage!==e.stage||e.domain&&n.domain!==e.domain))}function kv(i){const e={};for(const t of Object.values(i?.worlds||{}))if(Array.isArray(t?.skills))for(const n of t.skills)e[n.id]=n;return e}function Lv(i,e){const t=i.businessModes||[];return!t.length||!e?.modes?null:t.every(n=>e.modes[n]?.coverage==="covered")?"covered":t.some(n=>{const s=e.modes[n]?.coverage;return s==="partial"||s==="covered"})?"partial":null}function Dv(...i){return i.includes("covered")?"covered":i.includes("partial")?"partial":"playable"}function Fv(i="NL_PO",e=null,t={}){const n=kn(i),s=kv(e),r=t.business||null,a={},o={covered:0,partial:0,playable:0,planned:0};for(const l of n.domains)a[l.id]={id:l.id,labelKey:l.labelKey,total:0,covered:0,partial:0,playable:0,planned:0,objectives:[]};for(const l of n.objectives){const c=l.gameSkills||[],u=c.map(T=>s[T]).filter(Boolean),d=u.filter(T=>T.mastered).length,h=u.filter(T=>(T.n||0)>0).length,f=d&&d===c.length?"covered":h?"partial":null,g=Lv(l,r),v=l.status==="planned"?"planned":Dv(f,g),m={...l,coverage:v},p=a[l.domain];p.total+=1,p[v]+=1,p.objectives.push(m),o[v]+=1}return{packId:n.id,domains:a,statusCounts:o}}const ir="NL_PO";function dc(i){if(i==null||typeof i=="string"&&i.trim()==="")return null;const e=Number(i);return Number.isFinite(e)?e:null}function sr(i){if(!i)return null;if(i instanceof Date&&!Number.isNaN(i.getTime()))return{y:i.getFullYear(),m:i.getMonth()+1,d:i.getDate()};const e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(i));if(!e)return null;const t=Number(e[1]),n=Number(e[2]),s=Number(e[3]);return n<1||n>12||s<1||s>31?null:{y:t,m:n,d:s}}function rr(i){const e=sr(i);return e?`${String(e.y).padStart(4,"0")}-${String(e.m).padStart(2,"0")}-${String(e.d).padStart(2,"0")}`:null}function ui(){return rr(new Date)}function Yd(i,e=ui()){const t=sr(i),n=sr(e);if(!t||!n)return null;let s=n.y-t.y;return(n.m<t.m||n.m===t.m&&n.d<t.d)&&(s-=1),s>=0?s:null}function Iv(i,e=ui()){const t=sr(i),n=sr(e);if(!t||!n)return 0;let s=n.y-t.y;return(n.m<t.m||n.m===t.m&&n.d<t.d)&&(s-=1),Math.max(0,s)}function hc(i=ir,e=null){const t=kn(i),n=dc(e);if(n==null)return null;const s=t.stages.find(r=>n>=r.minAge&&n<r.maxAge);return s?s.id:n<t.stages[0].minAge?t.stages[0].id:t.stages[t.stages.length-1].id}function Zd(i={},e=ui()){if(i.birthDate)return Yd(i.birthDate,e);const t=dc(i.ageAtStart);return t==null?null:i.ageCapturedOn?t+Iv(i.ageCapturedOn,e):t}function ga({packId:i=ir,age:e=null,birthDate:t=null,today:n=null}={}){const r=kn(i).id||ir,a=n?rr(n):null,o=rr(t),l=o?Yd(o,a||ui()):dc(e),u=o||l!=null&&a?a||ui():null,d=hc(r,l);return{packId:r,ageAtStart:l,birthDate:o,ageCapturedOn:u,estimatedStage:d,confirmedStage:d,stageSource:"auto",lastPromotionCheck:null,lastPromotion:null,placementBand:"unknown",strictness:"soft",warmup:{completed:!1,results:[],skillIds:[]}}}function Uv(i={},e=ir){const t=ga({packId:e,age:Zd(i),birthDate:i.birthDate,today:ui()});return{...i,...t,strictness:i.strictness||t.strictness}}function Gu(i,e){return i.stages.some(t=>t.id===e)}function Qd(i={},e=ui()){const t=kn(i.packId||ir),n=rr(e)||ui(),s=Zd(i,n),r=hc(t.id,s),a=Gu(t,i.estimatedStage)?i.estimatedStage:null,o=ar(t,a),l=ar(t,r),c=l!=null&&(o==null||l>o),u=c?r:a||r,d=i.confirmedStage&&i.estimatedStage&&i.confirmedStage!==i.estimatedStage,h=i.stageSource||(d?"parent":"auto"),f=Gu(t,i.confirmedStage),g=h==="parent"&&f?i.confirmedStage:u,v=h==="auto"&&c&&a?{fromStage:a,toStage:u,on:n}:null;return{...i,packId:t.id,birthDate:rr(i.birthDate),estimatedStage:u,confirmedStage:g,stageSource:h==="parent"&&f?"parent":"auto",lastPromotionCheck:n,lastPromotion:v||i.lastPromotion||null,warmup:v?{completed:!1,results:[],skillIds:[]}:i.warmup||{completed:!1,results:[],skillIds:[]}}}function Bv(i=[]){const e=i.filter(r=>typeof r.correct=="boolean"),t=e.filter(r=>r.correct).length,n=e.length?t/e.length:0;return{band:n>=.85?"ahead":n<.5?"below":"on_track",correct:t,total:e.length,rate:n}}function ar(i,e){return i.stages.find(t=>t.id===e)?.order??null}function Nv(i,e){const t=ar(i,e.estimatedStage),n=ar(i,e.confirmedStage),s=e.stageSource==="parent"||e.confirmedStage!==e.estimatedStage;return n!=null&&(t==null||s)?n:t??n}function Ov(i=null){if(!i?.packId)return[];const e=kn(i.packId),t=Nv(e,i);if(!t)return zu(e.id,{status:"playable"});const n=i.placementBand==="ahead"?1:i.placementBand==="below"?-1:0,s=Math.min(e.stages.length,Math.max(t,t+n)),r=i.strictness==="strict"?[s]:Array.from({length:s+1-t+1},(o,l)=>t+l),a=new Set(r.filter(o=>o>=1&&o<=e.stages.length));return zu(e.id,{status:"playable"}).filter(o=>a.has(ar(e,o.stage)))}function $r(i=null){return[...new Set(Ov(i).flatMap(e=>e.gameSkills||[]))]}function qr(i,e,t={}){const n=t.completed??!0,s=Array.isArray(t.skillIds)?t.skillIds.slice(0,8):Array.isArray(i?.warmup?.skillIds)?i.warmup.skillIds.slice(0,8):[],r=e.length?Bv(e):i?.warmup?.scored;return{...i,placementBand:r?.band??i?.placementBand??"unknown",warmup:{...i?.warmup,completed:n,results:e.slice(-8),skillIds:s,...r?{scored:r}:{}}}}const zv=["turtle","bunny","duckling","owl"],Jd={turtle:{id:"turtle",petId:"turtle",nameKey:"helper.turtle",face:"turtle",patience:"steady"},bunny:{id:"bunny",petId:"bunny",nameKey:"helper.bunny",face:"bunny",patience:"bouncy"},duckling:{id:"duckling",petId:"duckling",nameKey:"helper.duckling",face:"duckling",patience:"sunny"},owl:{id:"owl",petId:"owl",nameKey:"helper.owl",face:"owl",patience:"thoughtful"}},Pa={dough:{id:"dough",titleKey:"business.ingredient.dough",unitCostCents:70},sauce:{id:"sauce",titleKey:"business.ingredient.sauce",unitCostCents:25},cheese:{id:"cheese",titleKey:"business.ingredient.cheese",unitCostCents:45},tomato:{id:"tomato",titleKey:"business.ingredient.tomato",unitCostCents:35},flour:{id:"flour",titleKey:"business.ingredient.flour",unitCostCents:30},berries:{id:"berries",titleKey:"business.ingredient.berries",unitCostCents:40},milk:{id:"milk",titleKey:"business.ingredient.milk",unitCostCents:35}},jn={margherita:{id:"margherita",kind:"pizza",titleKey:"business.recipe.margherita",basePriceCents:450,ingredients:{dough:1,sauce:1,cheese:1},stages:["grade_4","grade_5","grade_6","grade_7","grade_8"]},tomato_pizza:{id:"tomato_pizza",kind:"pizza",titleKey:"business.recipe.tomato_pizza",basePriceCents:525,ingredients:{dough:1,sauce:1,cheese:1,tomato:1},stages:["grade_5","grade_6","grade_7","grade_8"]},flatbread:{id:"flatbread",kind:"bakery",titleKey:"business.recipe.flatbread",basePriceCents:375,ingredients:{flour:2,milk:1},stages:["grade_3","grade_4","grade_5","grade_6"]},berry_tart:{id:"berry_tart",kind:"bakery",titleKey:"business.recipe.berry_tart",basePriceCents:600,ingredients:{flour:1,berries:2,milk:1},stages:["grade_5","grade_6","grade_7","grade_8"]}},Ui={money_make_amounts:{id:"money_make_amounts",kind:"payment",objectiveId:"nl_po.grade4.money_to_100",minStage:"grade_4"},decimal_money_change:{id:"decimal_money_change",kind:"payment",objectiveId:"nl_po.grade5.decimal_money_context",minStage:"grade_5"},portion_halves_quarters:{id:"portion_halves_quarters",kind:"prep",objectiveId:"nl_po.grade4.fair_sharing_intro",minStage:"grade_4"},repeated_addition_orders:{id:"repeated_addition_orders",kind:"prep",objectiveId:"nl_po.grade4.tables_2_5_10",minStage:"grade_4"},recipe_measure_whole:{id:"recipe_measure_whole",kind:"prep",objectiveId:"nl_po.grade5.measurement_units_intro",minStage:"grade_5"},fraction_of_quantity_recipe:{id:"fraction_of_quantity_recipe",kind:"prep",objectiveId:"nl_po.grade6.fraction_of_quantity",minStage:"grade_6"},unit_conversion_stock:{id:"unit_conversion_stock",kind:"stock",objectiveId:"nl_po.grade6.unit_conversion_context",minStage:"grade_6"},price_compare:{id:"price_compare",kind:"upgrade",objectiveId:"nl_po.grade6.price_comparison",minStage:"grade_6"},percentage_discount:{id:"percentage_discount",kind:"payment",objectiveId:"nl_po.grade7.percentages_intro",minStage:"grade_7"},profit_margin:{id:"profit_margin",kind:"summary",objectiveId:"nl_po.grade7.profit_margin_intro",minStage:"grade_7"},scale_recipe:{id:"scale_recipe",kind:"prep",objectiveId:"nl_po.grade7.scale_recipe",minStage:"grade_7"},demand_chart:{id:"demand_chart",kind:"summary",objectiveId:"nl_po.grade8.advanced_data_reasoning",minStage:"grade_8"}},eh={extra_oven:{id:"extra_oven",titleKey:"business.upgrade.extra_oven",priceCents:650,effect:{ovenSlots:1},objectiveId:"nl_po.grade6.price_comparison"},bigger_pantry:{id:"bigger_pantry",titleKey:"business.upgrade.bigger_pantry",priceCents:900,effect:{stockLimit:6},objectiveId:"nl_po.grade6.unit_conversion_context"},bright_sign:{id:"bright_sign",titleKey:"business.upgrade.bright_sign",priceCents:1200,effect:{demandBonus:1},objectiveId:"nl_po.grade8.advanced_data_reasoning"}},Gv={grade_1:1,grade_2:2,grade_3:3,grade_4:4,grade_5:5,grade_6:6,grade_7:7,grade_8:8};function Hu(i){return JSON.parse(JSON.stringify(i))}function Pl(){return{level:1,shopCoins:0,stock:{...mt.businessStartingStock},stockLimit:12,upgrades:[],currentDay:1,activeOrder:null,queue:[],progress:{},day:_a(),history:[]}}function _a(){return{ordersServed:0,revenueCents:0,costCents:0,profitCents:0,wasteCents:0,demand:{}}}function Wt(i){(!i.business||typeof i.business!="object")&&(i.business=Pl());const e=Pl();for(const[n,s]of Object.entries(e))i.business[n]===void 0&&(i.business[n]=Hu(s));(!i.business.stock||typeof i.business.stock!="object")&&(i.business.stock={...e.stock});for(const[n,s]of Object.entries(e.stock))i.business.stock[n]===void 0&&(i.business.stock[n]=s);(!i.business.day||typeof i.business.day!="object")&&(i.business.day=_a());const t=_a();for(const[n,s]of Object.entries(t))i.business.day[n]===void 0&&(i.business.day[n]=Hu(s));return(!i.business.day.demand||typeof i.business.day.demand!="object"||Array.isArray(i.business.day.demand))&&(i.business.day.demand={}),(!i.business.progress||typeof i.business.progress!="object")&&(i.business.progress={}),Array.isArray(i.business.upgrades)||(i.business.upgrades=[]),Array.isArray(i.business.queue)||(i.business.queue=[]),Array.isArray(i.business.history)||(i.business.history=[]),i.business}function Bi(i){return Gv[i]??4}function ka(i){const e=kn(i?.packId),t=i?.confirmedStage||i?.estimatedStage||"grade_4";return e.stages.some(n=>n.id===t)?t:"grade_4"}function Hv(i){const e=Bi(ka(i));return Object.values(jn).filter(t=>t.stages.some(n=>Bi(n)<=e))}function Vv(i){const e=Bi(ka(i));return Object.values(Ui).filter(t=>Bi(t.minStage)<=e)}function Wv(i,e=1){return Object.entries(i.ingredients).reduce((t,[n,s])=>t+Pa[n].unitCostCents*s*e,0)}function fc(i,e,t=1){return Object.entries(e.ingredients).every(([n,s])=>(i.stock[n]??0)>=s*t)}function $v(i,e,t=1){for(const[n,s]of Object.entries(e.ingredients))i.stock[n]-=s*t}function qv(i,e,t=1){return Object.entries(e.ingredients).reduce((n,[s,r])=>{const a=Math.max(0,r*t-(i.stock[s]??0));return n+a*Pa[s].unitCostCents},0)}function jv(i,e,t=1){for(const[n,s]of Object.entries(e.ingredients)){const r=s*t;(i.stock[n]??0)<r&&(i.stock[n]=r)}}function Kv(i){return Math.round(mt.bakeMs/Math.max(1,i.ovenSlots||1))}function Xv(i,e){const t=jn[e.recipeId];return t?fc(i,t,e.quantity)||i.shopCoins>=qv(i,t,e.quantity):!1}function th(i,e){const t=jn[e.recipeId];return!t||Xv(i,e)?!1:(jv(i,t,e.quantity),e.supplied=!0,!0)}function Vu(i,e,t){if(i.id==="portion_halves_quarters")return{id:`${e.id}:prep:portion`,kind:"prep",mode:i.id,objectiveId:i.objectiveId,expected:{slices:t.pick([2,4]),topping:e.recipeId.includes("tomato")?"tomato":"cheese"}};if(i.id==="repeated_addition_orders")return{id:`${e.id}:prep:repeat`,kind:"prep",mode:i.id,objectiveId:i.objectiveId,expected:{trays:e.quantity,perTray:e.recipeId.includes("pizza")?6:4}};if(i.id==="recipe_measure_whole")return{id:`${e.id}:prep:measure`,kind:"prep",mode:i.id,objectiveId:i.objectiveId,expected:{ingredient:"flour",amount:e.quantity*2,unit:"cups"}};if(i.id==="fraction_of_quantity_recipe")return{id:`${e.id}:prep:fraction`,kind:"prep",mode:i.id,objectiveId:i.objectiveId,expected:{numerator:1,denominator:2,of:e.quantity*8}};if(i.id==="scale_recipe")return{id:`${e.id}:prep:scale`,kind:"prep",mode:i.id,objectiveId:i.objectiveId,expected:{factor:e.quantity,base:jn[e.recipeId].ingredients}};if(i.id==="percentage_discount"){const n=Math.round(e.priceCents*.1);return{id:`${e.id}:pay:discount`,kind:"payment",mode:i.id,objectiveId:i.objectiveId,expected:{originalCents:e.priceCents,percent:10,finalCents:e.priceCents-n}}}if(i.id==="decimal_money_change"){const n=Math.ceil(e.priceCents/500)*500||500;return{id:`${e.id}:pay:change`,kind:"payment",mode:i.id,objectiveId:i.objectiveId,expected:{paidCents:n,changeCents:n-e.priceCents}}}return{id:`${e.id}:pay:make`,kind:"payment",mode:"money_make_amounts",objectiveId:Ui.money_make_amounts.objectiveId,expected:{amountCents:e.priceCents}}}function Yv(i,e,t={}){const n=t.rng??{pick:g=>g[Math.floor(Math.random()*g.length)],int:(g,v)=>g+Math.floor(Math.random()*(v-g+1))},s=Bi(ka(e)),r=s>=7?n.pick([1,2,3]):s>=5?n.pick([1,2]):1,a=Hv(e),o=a.filter(g=>fc(i,g,r)),l=o.length?o:a,c=n.pick(l),u={id:`biz-${Date.now().toString(36)}-${Math.floor(Math.random()*1e4).toString(36)}`,customerId:n.pick(zv),recipeId:c.id,quantity:r,priceCents:c.basePriceCents*r,costCents:Wv(c,r),tasks:[],supplied:!1},d=Vv(e),h=d.filter(g=>g.kind==="prep"),f=d.filter(g=>g.kind==="payment");return u.tasks.push(Vu(n.pick(h.length?h:[Ui.portion_halves_quarters]),u,n)),u.tasks.push(Vu(n.pick(f.length?f:[Ui.money_make_amounts]),u,n)),th(i,u),u}function Zv(i,e,t,n){const s=jn[e.recipeId];let r=!1;if(t.mode==="portion_halves_quarters"?r=Number(n.slices)===t.expected.slices&&String(n.topping)===t.expected.topping:t.mode==="repeated_addition_orders"?r=Number(n.total)===t.expected.trays*t.expected.perTray:t.mode==="recipe_measure_whole"?r=String(n.ingredient)===t.expected.ingredient&&Number(n.amount)===t.expected.amount&&String(n.unit)===t.expected.unit:t.mode==="fraction_of_quantity_recipe"?r=Number(n.amount)===t.expected.of*t.expected.numerator/t.expected.denominator:t.mode==="scale_recipe"&&(r=Object.entries(t.expected.base).every(([a,o])=>Number(n.ingredients?.[a])===o*t.expected.factor)),r&&!t.stockConsumed){if(!fc(i,s,e.quantity))return or(i,t.mode,!1,{taskId:t.id,reason:"stock"});$v(i,s,e.quantity),t.stockConsumed=!0}return or(i,t.mode,r,{taskId:t.id})}function Qv(i,e,t,n){let s=!1;return t.mode==="money_make_amounts"?s=Number(n.amountCents)===t.expected.amountCents:t.mode==="decimal_money_change"?s=Number(n.paidCents)===t.expected.paidCents&&Number(n.changeCents)===t.expected.changeCents:t.mode==="percentage_discount"&&(s=Number(n.finalCents)===t.expected.finalCents),or(i,t.mode,s,{taskId:t.id})}const Jv=["stock","upgrade","summary"];function eb(i){const e=Bi(ka(i));return Object.values(Ui).filter(t=>Jv.includes(t.kind)&&Bi(t.minStage)<=e)}function vo(i){return[...new Set(i)]}function bo(i,e){const t=[...i];for(let n=t.length-1;n>0;n--){const s=e.int(0,n);[t[n],t[s]]=[t[s],t[n]]}return t}function tb(i,e,t){const n={id:`review:${i.id}`,kind:"review",mode:i.id,objectiveId:i.objectiveId};if(i.id==="profit_margin"){if(!e.ordersServed)return null;const s=e.revenueCents||0,r=e.costCents||0,a=Math.max(0,s-r),o=vo([a,a+100,Math.max(0,a-100),a+50]).filter(l=>l>=0).slice(0,4);return{...n,revenueCents:s,costCents:r,answer:a,options:bo(o,t)}}if(i.id==="demand_chart"){const s=Object.entries(e.demand||{}).sort((o,l)=>l[1]-o[1]);if(!s.length)return null;const r=s[0][0],a=vo([...s.map(([o])=>o),...Object.keys(jn)]).slice(0,4);return{...n,answer:r,options:bo(a,t)}}if(i.id==="unit_conversion_stock"){const s=t.int(1,5),r=s*1e3,a=vo([r,s*100,r+1e3,s*1e4]).slice(0,4);return{...n,kg:s,answer:r,options:bo(a,t)}}if(i.id==="price_compare"){const s={count:t.int(2,5),cents:0},r={count:t.int(2,5),cents:0};s.cents=s.count*t.pick([40,50,60]),r.cents=r.count*t.pick([30,45,70]),s.cents/s.count===r.cents/r.count&&(r.cents+=r.count*10);const a=s.cents/s.count<=r.cents/r.count?"A":"B";return{...n,a:s,b:r,answer:a,options:["A","B"]}}return null}function nb(i,e,t={}){const n=t.rng??{pick:r=>r[Math.floor(Math.random()*r.length)],int:(r,a)=>r+Math.floor(Math.random()*(a-r+1))},s=i.day||_a();return eb(e).map(r=>tb(r,s,n)).filter(Boolean)}function ib(i,e,t){const n=String(t)===String(e.answer);return or(i,e.mode,n,{taskId:e.id})}function or(i,e,t,n={}){return i.progress[e]||(i.progress[e]={attempts:0,correct:0}),i.progress[e].attempts+=1,t&&(i.progress[e].correct+=1),{mode:e,correct:t,recorded:!0,...n}}function sb(i,e,t={}){for(const s of t.attempts||[]){if(s.recorded===!0&&s.mode)continue;const r=e.tasks.find(a=>a.id===s.taskId);r&&or(i,r.mode,!!s.correct,{taskId:r.id})}const n=Math.max(0,e.priceCents-e.costCents);return i.shopCoins+=n,i.day.ordersServed+=1,i.day.revenueCents+=e.priceCents,i.day.costCents+=e.costCents,i.day.profitCents+=n,i.day.demand[e.recipeId]=(i.day.demand[e.recipeId]||0)+e.quantity,i.history.push({id:e.id,recipeId:e.recipeId,customerId:e.customerId,priceCents:e.priceCents,costCents:e.costCents,profitCents:n,t:Date.now()}),i.history=i.history.slice(-40),i.activeOrder=null,{profitCents:n,shopCoins:i.shopCoins}}function rb(i,e,t){const n=Pa[e];if(!n||t<=0)return{ok:!1,reason:"unknown"};const s=Math.max(0,i.stockLimit-(i.stock[e]??0));if(s<=0)return{ok:!1,reason:"full"};const r=Math.floor(i.shopCoins/n.unitCostCents),a=Math.min(s,t,r);if(a<=0)return{ok:!1,reason:"price"};const o=n.unitCostCents*a;return i.shopCoins-=o,i.stock[e]=(i.stock[e]??0)+a,{ok:!0,bought:a,costCents:o}}function ab(i,e){const t=eh[e];return!t||i.upgrades.includes(e)?{ok:!1,reason:"unknown"}:i.shopCoins<t.priceCents?{ok:!1,reason:"price"}:(i.shopCoins-=t.priceCents,i.upgrades.push(e),t.effect.stockLimit&&(i.stockLimit+=t.effect.stockLimit),t.effect.ovenSlots&&(i.ovenSlots=(i.ovenSlots||1)+t.effect.ovenSlots),t.effect.demandBonus&&(i.demandBonus=(i.demandBonus||0)+t.effect.demandBonus),{ok:!0,upgrade:t})}function nh(i){const e={};for(const n of Object.keys(Ui)){const s=i.progress?.[n]??{attempts:0,correct:0},r=s.attempts?s.correct/s.attempts:0;e[n]={...s,rate:r,coverage:s.correct>=3&&r>=.8?"covered":s.attempts>0?"partial":"playable"}}const t=Object.entries(i.day?.demand||{}).sort((n,s)=>s[1]-n[1]).map(([n])=>n);return{ordersServed:i.day?.ordersServed??0,revenueCents:i.day?.revenueCents??0,costCents:i.day?.costCents??0,profitCents:i.day?.profitCents??0,topRecipes:t,modes:e}}const pc="monkeygrove.save",ih=1;let ei=null,ps=null;function sh(i,e={}){return{id:"p"+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36),name:i,avatar:{fur:"classic",hat:null,trail:null,pet:null},bananas:0,egg:{points:0,goal:mt.eggGoal},pets:[],owned:{hats:[],furs:["classic"],trails:[]},streak:{count:0,lastDay:null,freezes:0,giftDay:null},island:Rl(),curriculum:ga({age:e.age,birthDate:e.birthDate,packId:e.packId,today:e.today||Ms()}),business:Pl(),math:ov(),stats:{chambers:0,correct:0,wrong:0,msPlayed:0,berries:0,days:0},flags:{},created:Date.now()}}function kl(){return{lang:lb(),sfx:!0,music:!0,reduceMotion:null,dyslexiaFont:!1,highContrast:!1,colorblind:!1,textScale:1}}function ob(){return{v:ih,profiles:[],activeProfile:null,settings:kl()}}function lb(){return(navigator.language||"en").toLowerCase().startsWith("nl")?"nl":"en"}const cb="monkeygrove.save.corrupt";function Wu(i){if(i)try{localStorage.setItem(cb,i)}catch{}}function Gi(){if(ei)return ei;let i=null;try{i=localStorage.getItem(pc)}catch{i=null}if(i)try{const e=JSON.parse(i);if(e&&e.v>=1&&Array.isArray(e.profiles))return ei=ub(e),ei;Wu(i)}catch{Wu(i)}return ei=ob(),ei}function ub(i){const e=sh("x");for(const t of i.profiles){for(const o of Object.keys(e))t[o]===void 0&&(t[o]=structuredClone(e[o]));Gs(t.stats)||(t.stats=structuredClone(e.stats)),Gs(t.avatar)||(t.avatar=structuredClone(e.avatar));for(const o of Object.keys(e.stats))t.stats[o]===void 0&&(t.stats[o]=0);for(const o of Object.keys(e.avatar))t.avatar[o]===void 0&&(t.avatar[o]=e.avatar[o]);Gs(t.curriculum)||(t.curriculum=ga());const n=t.curriculum.ageCapturedOn||db(t.created),s=ga({age:t.curriculum.ageAtStart,birthDate:t.curriculum.birthDate,packId:t.curriculum.packId,today:n});for(const o of Object.keys(s))t.curriculum[o]===void 0&&(t.curriculum[o]=structuredClone(s[o]));t.curriculum.packId=s.packId;const r=s.estimatedStage||hc(s.packId,t.curriculum.ageAtStart);(t.curriculum.estimatedStage===void 0||t.curriculum.estimatedStage===null)&&(t.curriculum.estimatedStage=r),(t.curriculum.confirmedStage===void 0||t.curriculum.confirmedStage===null)&&(t.curriculum.confirmedStage=s.confirmedStage||r);const a=new Set(kn(t.curriculum.packId).stages.map(o=>o.id));a.has(t.curriculum.estimatedStage)||(t.curriculum.estimatedStage=r),a.has(t.curriculum.confirmedStage)||(t.curriculum.confirmedStage=s.confirmedStage||r),t.curriculum.stageSource=t.curriculum.confirmedStage!==t.curriculum.estimatedStage?"parent":t.curriculum.stageSource||"auto",Gs(t.curriculum.warmup)||(t.curriculum.warmup={}),t.curriculum.warmup.completed===void 0&&(t.curriculum.warmup.completed=!1),t.curriculum.warmup.results===void 0&&(t.curriculum.warmup.results=[]),t.curriculum.warmup.skillIds===void 0&&(t.curriculum.warmup.skillIds=[]),Wt(t)}if(!Gs(i.settings))i.settings=kl();else{const t=kl();for(const n of Object.keys(t))i.settings[n]===void 0&&(i.settings[n]=t[n])}return i.v=ih,i}function Gs(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function db(i){const e=Number(i);if(!Number.isFinite(e))return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:Ms(t)}function Ve(){ps||(ps=setTimeout(()=>{ps=null;try{localStorage.setItem(pc,JSON.stringify(ei))}catch{}},250))}function vn(){ps&&(clearTimeout(ps),ps=null);try{localStorage.setItem(pc,JSON.stringify(ei))}catch{}}function cn(){return Gi().settings}function rh(){return Gi().profiles}function lr(){const i=Gi(),e=i.profiles.find(t=>t.id===i.activeProfile)||null;return e&&hb(e)&&Ve(),e}function hb(i,e=Ms()){if(!i?.curriculum)return!1;const t=JSON.stringify(i.curriculum);return i.curriculum=Qd(i.curriculum,e),JSON.stringify(i.curriculum)!==t}function fb(i,e={}){const t=Gi(),n=sh(i,e);return t.profiles.push(n),t.activeProfile=n.id,vn(),n}function pb(i){const e=Gi();return e.activeProfile=i,vn(),lr()}function mb(i){const e=Gi();e.profiles=e.profiles.filter(t=>t.id!==i),e.activeProfile===i&&(e.activeProfile=e.profiles[0]?.id||null),vn()}function Ms(i=new Date){return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}function $u(){return Ms()}function gb(i){const e=Ms(),t=i.streak;if(t.lastDay===e)return{kind:"same",gift:(t.giftDay!==e,!1)};const n=Ms(new Date(Date.now()-864e5));let s;t.lastDay?t.lastDay===n?(t.count+=1,s="extended"):t.freezes>0?(t.freezes-=1,t.count+=1,s="frozen"):(t.count=1,s="reset"):(t.count=1,s="first"),t.lastDay=e,i.stats.days+=1;const r=t.giftDay!==e;return t.giftDay=e,Ve(),{kind:s,gift:r}}function Ei(i,e){return i.bananas=Math.max(0,i.bananas+e),Ve(),i.bananas}function qu(i,e){return i.bananas<e?!1:(i.bananas-=e,Ve(),!0)}function Hs(i,e){return i.egg||(i.egg={points:0,goal:mt.eggGoal}),i.egg.points+=e,Ve(),i.egg.points>=i.egg.goal}function _b(i,e,t=Math.random){const n=e.filter(r=>!i.pets.includes(r.id));if(!n.length)return null;const s=[];for(const r of n){const a=ev[r.rarity]||10;for(let o=0;o<a;o++)s.push(r)}return s[Math.floor(t()*s.length)]}function vb(i,e){const t=_b(i,e);return i.egg.points=Math.max(0,i.egg.points-i.egg.goal),i.egg.goal=Math.round(i.egg.goal*1.25),t&&(i.pets.push(t.id),i.avatar.pet||(i.avatar.pet=t.id)),Ve(),t}function bb(i,e,t){const n=i.owned[e];n&&!n.includes(t)&&n.push(t),Ve()}function Ll(i,e,t){i.avatar[e]=t,Ve()}function xb(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function Di(){const i=cn().reduceMotion;return i==null?xb():!!i}function cs(){if(typeof document>"u")return;const i=cn(),e=document.documentElement;e.classList.toggle("reduce-motion",Di()),e.classList.toggle("dyslexia",!!i.dyslexiaFont),e.classList.toggle("high-contrast",!!i.highContrast),e.classList.toggle("colorblind",!!i.colorblind),e.style.setProperty("--text-scale",String(Number(i.textScale)>0?i.textScale:1))}const ah=new D(1,1.15,1).normalize(),yb=40,Sb=ah.clone().multiplyScalar(yb),cr=ah.clone().negate(),oh=new D(0,1,0).projectOnPlane(cr).normalize(),Mb=Math.abs(new D().crossVectors(cr,oh).x),wb=Math.abs(oh.x),lh=new D(-cr.z,0,cr.x).normalize(),Eb=new D().crossVectors(lh,cr).setComponent(1,0).normalize(),ju=.8,xo=4;class Tb{constructor(e){this.renderer=new Z_({canvas:e,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.shadows=tv==="high",this.shadows&&(this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=cd),this.scene=new ep,this.scene.background=null,this.camera=new lc(-10,10,10,-10,.1,200),this.span=14,this.fitBoard=null,this.target=new D,this.goal=new D,this.followObj=null,this.shakeAmp=0,this.zoom=1,this.defaultZoom=1,this.pan=new D,this.panLimit=new D(16,0,16),this.boardCenter=new D,this.followMode=null,this.aspect=1;const t=new up(15398655,13494976,.95);this.scene.add(t),this.sun=new su(16773848,1.25),this.sun.position.set(8,14,5),this.shadows&&(this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),this.sun.shadow.bias=-.0015,this.sun.shadow.normalBias=.02),this.scene.add(this.sun),this.scene.add(this.sun.target),this.fill=new su(12572927,.25),this.fill.position.set(-6,8,-4),this.scene.add(this.fill),this.raycaster=new pp,this.pickables=[],window.addEventListener("resize",()=>this.resize()),this.resize()}resize(){const e=window.innerWidth,t=window.innerHeight;if(this.renderer.setSize(e,t,!1),this.aspect=e/t,this.fitBoard){const n=(this.fitBoard.w+this.fitBoard.d)*Lt,s=n*Mb+1.5,r=n*wb+2.5;this.span=Math.max(r,s/this.aspect)}this._applyProjection()}_applyProjection(){const e=this.aspect||1,t=this.fitBoard?this.span:Math.max(this.span,this.span*1.15/e);this.baseVSpan=t;const n=t/this.zoom;this.camera.top=n/2,this.camera.bottom=-n/2,this.camera.left=-n*e/2,this.camera.right=n*e/2,this.camera.updateProjectionMatrix()}setSpan(e){this.span=e,this.resize()}setZoom(e){this.zoom=Math.max(ju,Math.min(xo,e)),this._clampPan(),this._applyProjection()}zoomBy(e){this.setZoom(this.zoom*e)}panByPixels(e,t){const n=(this.camera.top-this.camera.bottom)/(window.innerHeight||1);this.pan.addScaledVector(lh,-e*n),this.pan.addScaledVector(Eb,t*n),this._clampPan()}_clampPan(){const e=Math.max(0,Math.min(1,(this.zoom-1)/(xo-1))),t=this.panLimit.x*e,n=this.panLimit.z*e;this.pan.x=Math.max(-t,Math.min(t,this.pan.x)),this.pan.z=Math.max(-n,Math.min(n,this.pan.z))}resetCamera(){this.zoom=Math.max(ju,Math.min(xo,this.defaultZoom||1)),this.pan.set(0,0,0),this._applyProjection()}lookAt(e,t){this.fitBoard=null,this.followObj=null,this.followMode=null,this.boardCenter.copy(e),this.goal.copy(e),this.target.copy(e),t&&(this.span=t),this.resetCamera(),this.resize(),this._place()}follow(e,t,n){this.fitBoard=null,this.followObj=e,this.followMode="always",this.panLimit.set(n?.x??16,0,n?.z??16),t&&(this.span=t),this.target.copy(e.position),this.goal.copy(e.position),this.resetCamera(),this.resize(),this._place()}frameBoard(e,t,n,s=null){this.followObj=s,this.followMode=s?"zoomed":null,this.fitBoard={w:t,d:n},this.boardCenter.copy(e),this.panLimit.set(t*Lt*.5,0,n*Lt*.5);const a=s&&(this.defaultZoom||1)>1.05?s.position:e;this.goal.copy(a),this.target.copy(a),this.resetCamera(),this.resize(),this._place()}_place(){const e=Sb;let t=0,n=0;this.shakeAmp>.001&&(t=(Math.random()-.5)*this.shakeAmp,n=(Math.random()-.5)*this.shakeAmp);const s=this.target.x+this.pan.x+t,r=this.target.y,a=this.target.z+this.pan.z+n;if(this.camera.position.set(s+e.x,r+e.y,a+e.z),this.camera.lookAt(s,r,a),this.sun.position.set(s+8,r+14,a+5),this.sun.target.position.set(s,r,a),this.sun.castShadow){const o=(this.baseVSpan||this.span)*.9,l=this.sun.shadow.camera;l.left=-o,l.right=o,l.top=o,l.bottom=-o,l.updateProjectionMatrix()}}shake(e=.15){Di()||(this.shakeAmp=Math.max(this.shakeAmp,e))}update(e){this.followObj&&(this.followMode==="always"||this.zoom>1.05)?this.goal.copy(this.followObj.position):this.goal.copy(this.boardCenter);const t=1-Math.pow(.0015,e/1e3);this.target.lerp(this.goal,t),this.shakeAmp*=Math.pow(5e-4,e/1e3),this._place(),this.renderer.render(this.scene,this.camera)}pick(e,t){if(!this.pickables.length)return null;const n=this.renderer.domElement.getBoundingClientRect(),s=new ze((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1);return this.raycaster.setFromCamera(s,this.camera),this.raycaster.intersectObjects(this.pickables,!0)[0]||null}}const Ab=[{dir:[1,0,0],corners:[[1,1,1],[1,0,1],[1,1,0],[1,0,0]]},{dir:[-1,0,0],corners:[[0,1,0],[0,0,0],[0,1,1],[0,0,1]]},{dir:[0,1,0],corners:[[0,1,1],[1,1,1],[0,1,0],[1,1,0]]},{dir:[0,-1,0],corners:[[0,0,0],[1,0,0],[0,0,1],[1,0,1]]},{dir:[0,0,1],corners:[[0,1,1],[0,0,1],[1,1,1],[1,0,1]]},{dir:[0,0,-1],corners:[[1,1,0],[1,0,0],[0,1,0],[0,0,0]]}],Rb=[1,.8,.64,.5];function Ys(i,e,t){return i+"|"+e+"|"+t}function Cb(i){const e=new Map,t={},n=i.palette;let s=0,r=0;return i.layers.forEach((a,o)=>{a.forEach((l,c)=>{for(let u=0;u<l.length;u++){const d=l[u];if(!(d==="."||d===" ")){if(!t[d]){const h=n[d];if(!h)continue;t[d]=new De(h)}e.set(Ys(u,o,c),t[d]),u>s&&(s=u),c>r&&(r=c)}}})}),{voxels:e,sizeX:s+1,sizeY:i.layers.length,sizeZ:r+1}}function Pb(i,e,t,n,s,r){const a=[e+r[0],t+r[1],n+r[2]],o=[s[0]===1?1:-1,s[1]===1?1:-1,s[2]===1?1:-1],l=[0,1,2].filter(v=>r[v]===0),c=[...a];c[l[0]]+=o[l[0]];const u=[...a];u[l[1]]+=o[l[1]];const d=[...a];d[l[0]]+=o[l[0]],d[l[1]]+=o[l[1]];const h=i.has(Ys(c[0],c[1],c[2]))?1:0,f=i.has(Ys(u[0],u[1],u[2]))?1:0;if(h&&f)return 3;const g=i.has(Ys(d[0],d[1],d[2]))?1:0;return h+f+g}function kb(i,e={}){const{voxelSize:t=1,centerXZ:n=!0,ao:s=!0}=e,{voxels:r,sizeX:a,sizeZ:o}=Cb(i),l=[],c=[],u=[],d=[];let h=0;const f=n?-a/2:0,g=n?-o/2:0;for(const[m,p]of r){const[T,E,S]=m.split("|").map(Number);for(const P of Ab){const[R,L,B]=P.dir;if(r.has(Ys(T+R,E+L,S+B)))continue;const y=[];for(const x of P.corners){l.push((T+x[0]+f)*t,(E+x[1])*t,(S+x[2]+g)*t),c.push(R,L,B);const k=s?Pb(r,T,E,S,x,P.dir):0;y.push(k);const z=Rb[k];u.push(p.r*z,p.g*z,p.b*z)}y[0]+y[3]>y[1]+y[2]?d.push(h+1,h+3,h+0,h+3,h+2,h+0):d.push(h+0,h+1,h+2,h+1,h+3,h+2),h+=4}}const v=new bn;return v.setAttribute("position",new An(l,3)),v.setAttribute("normal",new An(c,3)),v.setAttribute("color",new An(u,3)),v.setIndex(d),v.computeBoundingSphere(),v}let yo=null;function Lb(){return yo||(yo=new js({vertexColors:!0})),yo}const So=new Map;function Ni(i,e={}){let t;e.cacheKey&&So.has(e.cacheKey)?t=So.get(e.cacheKey):(t=kb(i,e),e.cacheKey&&(t._cached=!0,So.set(e.cacheKey,t)));const n=new Ut(t,Lb());return n.castShadow=e.castShadow!==!1,n.receiveShadow=e.receiveShadow===!0,n}function ur(i,e){return{palette:{...i.palette,...e},layers:i.layers}}const Db={palette:{F:"#8a5a3b",f:"#f0d6b3",S:"#ffd9b0",E:"#2e2433",W:"#ffffff",N:"#b87a5e"},layers:[["...........","...........","...FF.FF...","...ff.ff..."],["...........",".....F.....","...FFFFF...","...FfffF..."],["...........",".....F.....","..FFFFFFF..","...FfffF..."],[".....F.....","...........","..FFFFFFF..","...FfffF..."],["...........","...........","...FFFFF...","...FFFFF..."],["...........","...FFFFF...","..FFFFFFF..","..FFFFFFF..","...fffff..."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FSSSSSF..","....fNf...."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FEESEEF.."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FWESWEF.."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FFFfFFF.."],["...........","...FFFFF...","..FFFFFFF..","..FFFFFFF..","...FFFFF..."],["...........","...........","....FFF....","....FFF...."]]},Fb={palette:{F:"#9c6b4a",f:"#f5dfc0",S:"#ffdcb8",E:"#2e2433",W:"#ffffff",N:"#c08a6a",P:"#ffb3c6",Y:"#ffe28a"},layers:[["...........","...........","...FF.FF...","...ff.ff..."],["...........",".....F.....","...FFFFF...","...FfffF..."],["...........",".....F.....","..FFFFFF...","...FfffF..."],[".....F.....","...........","...FFFFFF..","...FfffF..."],["...........","...........","...FFFFFF..","...FFFFF..."],["...........","...FFFFF...","..FFFFFFFf.","..FFFFFFF..","...fffff..."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FSSSSSF..","....fNf...."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FEESEEF.."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FWESWEF.."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FFFfFFF.."],["...........","...FFFFF...","..FFFFFFF..","..FFFFFFF..","...FFFFF..."],["...........","...........","....FFF....","....FFF...."],["...........","...........",".....P.....","....PYP....",".....P....."]]},Ib={palette:{R:"#f08a7a",r:"#ffb3a0",d:"#d96b5d",E:"#2e2433",W:"#ffffff"},layers:[[".........",".d.....d.",".........",".d.....d."],["..RRRRR..",".RRRRRRR.",".RRRRRRR.",".RRRRRRR.","r.rrrrr.r","r.......r"],[".........","..RRRRR..",".RRRRRRR.","..RRRRR..","r.......r","r.......r"],[".........",".........","..RRRRR..","..RRRRR.."],[".........",".........",".........","..d...d.."],[".........",".........",".........",".EE...EE."],[".........",".........",".........",".WE...WE."]]},Ub={palette:{R:"#e87a6a",r:"#ffb3a0",d:"#c95f51",G:"#f4c95d",E:"#2e2433",W:"#ffffff"},layers:[[".............",".............",".d.........d.",".............",".d.........d."],[".............","..RRRRRRRRR..",".RRRRRRRRRRR.",".RRRRRRRRRRR.",".RRRRRRRRRRR.","r.rrrrrrrrr.r","rr.........rr"],[".............","..RRRRRRRRR..",".RRRRRRRRRRR.",".RRRRRRRRRRR.",".RRRRRRRRRRR.","r.rrrrrrrrr.r","rr.........rr"],[".............","..RRRRRRRRR..",".RRRRRRRRRRR.",".RRRRRRRRRRR.",".RRRRRRRRRRR.","r.rrrrrrrrr.r","r...........r"],[".............",".............","..RRRRRRRRR..",".RRRRRRRRRRR.","..RRRRRRRRR..","r...........r"],[".............",".............","...RRRRRRR...","..RRRRRRRRR..","...RRRRRRR..."],[".............",".............",".............","....RRRRR....","....rrrrr...."],[".............",".............",".............","....GGGGG....","....d...d...."],[".............",".............",".............","....G.G.G....","....d...d...."],[".............",".............",".............","......G......","....d...d...."],[".............",".............",".............",".............","...EE...EE..."],[".............",".............",".............",".............","...WE...WE..."]]},Bb={id:"bunny",nameKey:"pet.bunny",rarity:"common",model:{palette:{B:"#fdf6ec",b:"#e8dcc8",P:"#ffc2d1",E:"#2e2433"},layers:[["...b...",".BBBBB.",".BBBBB.",".BBBBB."],[".......",".BBBBB.",".BBBBB.",".BBBBB."],[".......","..BBB..",".BBBBB.",".BEPEB."],[".......","..BBB..","..BBB..","..BBB.."],[".......",".......","..B.B.."],[".......",".......","..B.B.."],[".......",".......","..B.B.."],[".......",".......","..P.P.."]]}},Nb={id:"duckling",nameKey:"pet.duckling",rarity:"common",model:{palette:{Y:"#ffe28a",y:"#f0c95e",O:"#f5a25d",E:"#2e2433"},layers:[[".......",".......","..O.O.."],["...y...",".YYYYY.",".YYYYY.","..YYY.."],[".......",".YYYYY.","yYYYYYy","..YYY.."],[".......","..YYY..",".YYYYY.","..YYY.."],[".......","..YYY..",".YYYYY.","..EYE..","...O..."],[".......",".......","..YYY..","...Y..."]]}},Ob={id:"kitten",nameKey:"pet.kitten",rarity:"common",model:{palette:{G:"#cfd4dd",g:"#aeb4c0",P:"#ffc2d1",E:"#2e2433"},layers:[[".......",".GGGGG.",".GGGGG.",".GGGGG."],[".g.....",".GGGGG.",".GGGGG.",".GGGGG."],[".g.....","..GGG..",".GGGGG.",".GEPEG."],[".g.....","..GGG..",".GGGGG.",".GGGGG."],[".......",".......","..GGG..","..GGG.."],[".......",".......","..G.G.."],[".......",".......","..P.P.."]]}},zb={id:"piglet",nameKey:"pet.piglet",rarity:"common",model:{palette:{P:"#f9b8c4",p:"#e895a8",N:"#e87a96",E:"#2e2433"},layers:[[".......",".PPPPP.",".PPPPP.",".PPPPP."],["...p...",".PPPPP.",".PPPPP.",".PPPPP.","..NNN.."],[".......","..PPP..",".PPPPP.",".PEPEP."],[".......","..PPP..",".PPPPP.","..PPP.."],[".......",".......","..PPP.."],[".......",".......","..p.p.."]]}},Gb={id:"redpanda",nameKey:"pet.redpanda",rarity:"rare",model:{palette:{O:"#e8875a",f:"#fff1dc",d:"#5d4037",E:"#2e2433"},layers:[[".......",".d...d.",".......",".d...d."],["...O...",".OOOOO.",".OOOOO.",".OOOOO."],["...d...",".OOOOO.",".OOOOO.",".OOOOO."],["...O...","..OOO..",".OOOOO.",".OfffO."],[".......","..OOO..",".OOOOO.",".fEOEf.","...d..."],[".......",".......","..OOO..","..OOO.."],[".......",".......","..d.d.."]]}},Hb={id:"turtle",nameKey:"pet.turtle",rarity:"rare",model:{palette:{G:"#7cc08a",g:"#5fa46e",K:"#cfe8a8",E:"#2e2433"},layers:[[".......",".K...K.",".......",".K...K."],[".......",".GGGGG.",".GGGGG.",".GGGGG.","..KKK.."],[".......",".GGGGG.",".GGGGG.",".GGGGG.","..EKE.."],[".......","..GgG..",".gGGGg.","..GgG.."],[".......",".......","..GGG.."],[".......",".......","...g..."]]}},Vb={id:"owl",nameKey:"pet.owl",rarity:"epic",model:{palette:{O:"#a99bc9",o:"#8d7fb0",f:"#f5ead7",B:"#f5a25d",E:"#2e2433",W:"#ffffff"},layers:[[".......",".......","..B.B.."],[".......",".OOOOO.",".OOOOO.",".OfffO."],[".......",".OOOOO.","oOOOOOo",".OfffO."],[".......",".OOOOO.","oOOOOOo",".OfffO."],[".......",".OOOOO.",".OOOOO.",".fEfEf.","...B..."],[".......",".OOOOO.",".OOOOO.",".fWfWf."],[".......","..OOO..",".OOOOO.","..OOO.."],[".......",".......",".o...o."]]}},Wb={id:"dragon",nameKey:"pet.dragon",rarity:"legendary",model:{palette:{M:"#9fe2c0",w:"#cfeede",B:"#f7f3d7",P:"#ffb3c6",E:"#2e2433"},layers:[["...MM....",".........","..MM.MM.."],["....M....","..MMMMM..","..MMMMM..","..MBBBM.."],[".........","..MMMMM..",".wMMMMMw.","..MBBBM.."],[".........","..MMMMM..",".wMMMMMw.","..MMMMM.."],[".........","..MMMMM..",".MMMMMMM.","..MMMMM..","...BBB..."],[".........","..MMMMM..",".MMMMMMM.",".MEMMMEM."],[".........","..MMMMM..",".MMMMMMM.",".MMMMMMM."],[".........",".........","..MMMMM..","..MMMMM.."],[".........",".........","...P.P..."]]}},va={monkey:Db,mimi:Fb,crab:Ib,crabKing:Ub},ki=[Bb,Nb,Ob,zb,Gb,Hb,Vb,Wb],$b=11,Dl=[{id:"cap",nameKey:"hat.cap",price:25,dy:0,model:{palette:{C:"#6fb7e8",c:"#5a9fd0"},layers:[[".......",".CCCCC.",".CCCCC.",".CCCCC.",".ccccc."],[".......","..CCC..",".CCCCC.","..CCC.."],[".......",".......","...C..."]]}},{id:"bow",nameKey:"hat.bow",price:40,dy:0,model:{palette:{P:"#f7a8c4",p:"#e88bb0"},layers:[[".......",".......","PPPpPPP","PP...PP"],[".......",".......","PP...PP"]]}},{id:"beanie",nameKey:"hat.beanie",price:60,dy:0,model:{palette:{B:"#f0907a",b:"#d97863",w:"#fdf6ec"},layers:[[".......",".bbbbb.",".bbbbb.",".bbbbb."],[".......","..BBB..",".BBBBB.","..BBB.."],[".......",".......","..BBB.."],[".......",".......","...w..."]]}},{id:"party",nameKey:"hat.party",price:80,dy:0,model:{palette:{A:"#8fd0e8",P:"#f7a8c4",w:"#fff7e0"},layers:[[".......","..AAA..",".AAAAA.","..AAA.."],[".......","...P...","..PPP..","...P..."],[".......",".......","...A..."],[".......",".......","...w..."]]}},{id:"flowercrown",nameKey:"hat.flowercrown",price:120,dy:0,model:{palette:{V:"#7cc08a",P:"#ffb3c6",Y:"#ffe28a",L:"#c9a6ff"},layers:[[".......",".VPYPV.",".Y...Y.",".VLYLV."]]}},{id:"pirate",nameKey:"hat.pirate",price:150,dy:0,model:{palette:{D:"#4a5a78",B:"#ffe28a"},layers:[[".......",".DDDDD.","DDDDDDD",".DDBDD."],[".......",".......","D.DDD.D"],[".......",".......","..DDD.."]]}},{id:"wizard",nameKey:"hat.wizard",price:200,dy:0,model:{palette:{Z:"#9b8ad0",S:"#ffe28a"},layers:[[".ZZZZZ.","ZZZZZZZ","ZZZZZZZ","ZZZZZZZ",".ZZZZZ."],[".......",".ZZZZZ.",".ZZSZZ.",".ZZZZZ."],[".......","..ZZZ..","..ZZZ..","..ZZZ.."],[".......",".......","...Z..."],[".......",".......","....Z.."]]}},{id:"crown",nameKey:"hat.crown",price:300,dy:0,model:{palette:{G:"#f4c95d",J:"#f78bb0"},layers:[[".......",".GGGGG.",".G...G.",".GGGGG."],[".......",".G.G.G.",".......",".G.G.G."],[".......",".......",".......","...J..."]]}}],Fl=[{id:"classic",nameKey:"fur.classic",price:0,palette:{F:"#8a5a3b",f:"#f0d6b3"}},{id:"golden",nameKey:"fur.golden",price:60,palette:{F:"#e8b04f",f:"#ffe9b8"}},{id:"snow",nameKey:"fur.snow",price:60,palette:{F:"#f0ede6",f:"#ffffff"}},{id:"pink",nameKey:"fur.pink",price:80,palette:{F:"#f49bbb",f:"#ffd9e6"}},{id:"lavender",nameKey:"fur.lavender",price:80,palette:{F:"#b39ddb",f:"#e6dcf5"}},{id:"mint",nameKey:"fur.mint",price:80,palette:{F:"#8fd4ae",f:"#dcf5e8"}},{id:"redpanda",nameKey:"fur.redpanda",price:100,palette:{F:"#e8875a",f:"#fff1dc"}},{id:"midnight",nameKey:"fur.midnight",price:150,palette:{F:"#4a4a6a",f:"#9b9bc4"}}],qb=[{id:"sparkle",nameKey:"trail.sparkle",price:60,color:"#ffd966"},{id:"petal",nameKey:"trail.petal",price:100,color:"#ffb3c6"},{id:"bubble",nameKey:"trail.bubble",price:100,color:"#9bd6ff"},{id:"star",nameKey:"trail.star",price:200,color:"#c9a6ff"}],jb={palette:{T:"#b08a5f",t:"#8f6d49",L:"#5fb46a",l:"#8fd18a",C:"#7a5a3f"},layers:[["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....tt.....",".....tt....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....tt.....",".....tt....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....tt.....",".....tt....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],[".....ll.....",".l........l.","............","............","............","l....TT....l","l....TT....l",".....CC.....","............","............",".l........l.",".....ll....."],["............",".....LL.....","..l..LL..l..","...l.LL.l...",".....LL.....",".LLL.LL.LLL.",".LLL.LL.LLL.",".....LL.....","...l.LL.l...","..l..LL..l..",".....LL....."],["............","............","............","....LLLL....","...LLLLLL...","...LLLLLL...","...LLLLLL...","...LLLLLL...","....LLLL...."],["............","............","............","............","....llll....","....llll....","....llll....","....llll...."]]},Kb={palette:{T:"#b08a5f",t:"#8f6d49",L:"#5fb46a",l:"#8fd18a",C:"#7a5a3f"},layers:[["........","........","........","...TT...","...TT..."],["........","........","........","...TT...","...TT..."],["........","........","........","...tt...","...tt..."],["........","........","........","...TT...","...TT..."],["........","........","........","...TT...","...TT..."],["...ll...","........","........","l..TT..l","l..TT..l","...C....","........","...ll..."],["........","...LL...","..LLLL..",".LLLLLL.",".LLLLLL.","..LLLL..","...LL..."],["........","........","........","..llll..","..llll.."]]},Xb={palette:{L:"#5fb46a",l:"#8fd18a",P:"#f7b8cf"},layers:[[".......",".LLLLL.","LLLLLLL","LLLLLLL","LLLLLLL",".LLLLL."],[".......",".LLLLL.","LLLLLLL","LLLLLLL","LLLLLLL",".LLLPL."],[".......",".......",".LLLLL.",".LlLlL.",".LLLLL."],[".......",".......",".......","..lll.."]]},Yb={palette:{V:"#6aa84f",P:"#f7a8c4",C:"#ffe28a"},layers:[["...",".V."],["...",".V."],[".P.","PCP",".P."]]},Zb={palette:{V:"#6aa84f",P:"#ffd966",C:"#e8924f"},layers:[["...",".V."],["...",".V."],[".P.","PCP",".P."]]},Qb={palette:{V:"#6aa84f",P:"#9bb8ff",C:"#fff1c4"},layers:[["...",".V."],["...",".V."],[".P.","PCP",".P."]]},Jb={palette:{D:"#d9906f",d:"#b8714f",c:"#e8a988"},layers:[[".......",".......",".ddddd.",".ddddd.",".ddddd."],[".......",".DDDDD.","DDDDDDD","DDDDDDD","DDDDDDD",".DDDDD."],[".......",".DDDDD.","DDDDDDD","DDDDDDD","DDDDDDD",".DDDDD."],[".......","..DDD..",".DDDDD.",".DDDDD.",".DDDDD.","..DDD.."],[".......","..ccc..",".c...c.",".c...c.",".c...c.","..ccc.."]]},ex={palette:{S:"#e8e2d4",s:"#cfc8b8"},layers:[[".sssss.","sssssss","sssssss"],[".SSSSS.","SSSSSSS","SSSSSSS"],[".SSSSS.","SSSSSSS","SSSSSSS"],[".SSSSS.","SSSSSSS","SSSSSSS"],["..sss..",".SSSSS.",".SSSSS."]]},tx={palette:{G:"#f4c95d",g:"#d9a83f",h:"#ffe9a8"},layers:[[".ggggggg.","ggggggggg","ggggggggg","ggggggggg","ggggggggg","ggggggggg","ggggggggg","ggggggggg",".ggggggg."],[".........",".........","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG.."],[".........",".........","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG.."],[".........",".........","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG.."],[".........",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG."],[".........",".hhhhhhh.",".h.....h.",".h.....h.",".h.....h.",".h.....h.",".h.....h.",".hhhhhhh."]]},nx={palette:{W:"#b07a4a",w:"#8f5f38",G:"#f4c95d"},layers:[["wwwwwww","wwwwwww","wwwwwww","wwwwwww","wwwwwww"],["WWWWWWW","W.....W","W.....W","W.....W","WWWWWWW"],["WWWWWWW","W.....W","W.....W","W.....W","WWWGWWW"]]},ix={palette:{W:"#b07a4a",w:"#8f5f38",G:"#f4c95d"},layers:[["WWWWWWW","WWWWWWW","WWWWWWW","WWWWWWW","WWWGWWW"],[".......",".WWWWW.",".WWWWW.",".WWWWW."]]},sx={palette:{Q:"#fdf2e0",M:"#bfe8d2"},layers:[[".....",".QQQ.",".QQQ.",".QQQ."],[".QQQ.","QQQQQ","QQQQQ","QQQQQ",".QQQ."],[".QQQ.","MQQQQ","QQQQQ","QQQQQ",".QMQ."],[".QQQ.","QQQQQ","QQQQM","QQQQQ",".QQQ."],[".....",".QQQ.",".QQQ.",".QMQ."],[".....",".....","..Q.."]]},rx={palette:{B:"#c9985f",b:"#a87a45"},layers:[[".BBBB.","BBBBBB","BBBBBB","BBBBBB","BBBBBB",".BBBB."],[".bBBb.","B....B","b....b","B....B","b....b",".bBBb."],[".BbbB.","b....b","B....B","b....b","B....B",".BbbB."],[".bbbb.","b....b","b....b","b....b","b....b",".bbbb."]]},ax={palette:{C:"#8a6845",c:"#6e5236"},layers:[["....",".cc.",".cc."],[".CC.","CCCC","CCCC",".CC."],["....",".CC.",".CC."]]},ox={palette:{Y:"#ffd95e",y:"#e8b840",g:"#6aa84f"},layers:[[".....",".YYY."],[".....","YYYYY",".YYY."],[".....",".yYy.","..Y.."],[".....","..g.."]]},lx={palette:{K:"#9a6b4f",k:"#7d5540",D:"#d9b88f",d:"#c4a070"},layers:[[".......",".KKKKK.","KKKKKKK","KKKKKKK","KKKKKKK",".KKKKK."],[".......",".KKKKK.","kKKKKKk","KKKKKKK","kKKKKKk",".KKKKK."],[".......",".KKKKK.","KKKKKKK","KKKKKKK","KKKKKKK",".KKKKK."],[".......",".DDDDD.","DDdddDD","DDdDdDD","DDdddDD",".DDDDD."]]},cx={palette:{K:"#9a6b4f",G:"#f4c95d",g:"#d9a83f"},layers:[["KK...KK","KK...KK"],[".......","K.....K","..GGG.."],[".......","K.....K",".GGGGG."],[".......","K.....K",".GGgGG."],[".......","K.....K",".GGGGG."],[".......","K.....K","..GGG.."],[".......","KKKKKKK","...K..."]]},ux={palette:{W:"#c9985f",w:"#a87a45"},layers:[["WWWWWWW","WwWWWwW","WWWWWWW"]]},dx={palette:{P:"#b8b2a8",p:"#948e84",Q:"#a8e8ff"},layers:[["PP.....PP","PPQQQQQPP"],["PP.....PP","PPQQQQQPP"],["pp.....pp","ppQQQQQpp"],["PP.....PP","PPQQQQQPP"],["PP.....PP","PPQQQQQPP"],["pP.....Pp","pPQQQQQPp"],["PPP...PPP","PPPQQQPPP"],[".PPPPPPP.",".PPPPPPP."],["..PPPPP..","..ppppp.."],["...PPP...","...PPP..."]]},hx={palette:{v:"#4e8c4a",L:"#8fd18a"},layers:[["...........","v.........v","...........",".L.......L."],["...........","v.........v","...........",".L........."],["...........","v..........","L..........","..........."],["...........","L..........","...........","..........."]]},fx={palette:{v:"#4e8c4a",L:"#8fd18a",F:"#f7b8cf"},layers:[["...........","v.........v","...........",".L.......L."],["...........","v.........v","...........",".F........."],["...........","v.........v","L.........L","..........."],["...........","v.........v","...........",".L.......F."],["...........","v.........v","...........",".F........."],["...........","v.........v","L.........L","..........."],["...........","L.........L","...........","..........."]]},px={palette:{v:"#4e8c4a",L:"#8fd18a",F:"#f7b8cf",C:"#fff3b8"},layers:[["...........","v.........v","...........",".L.......L."],["...........","v.........v","...........",".F.......L."],["...........","v.........v","L.........L",".........F."],["...........","v.........v","...........",".L.......F."],["...........","v.........v","...........",".F.......L."],["...........","v.........v","L.........L",".L.......L."],["...........","v.........v","...........","..L..F..L.."],["...........","vL.......Lv","...........","..LFLFLFL.."],["...........",".L.......L.","..L.....L..","..........."],["...........","...L...L...","...........","....F.F...."],["...........","...LFLFL...","....LLL....","..........."],["...........","....LFL....",".....L.....","..........."],["...........",".....C.....","...........","..........."]]},mx={palette:{W:"#c9985f",w:"#a87a45"},layers:[["..w.."],["..w.."],[".....","WWWWW"],[".....","WWWWW"],[".....",".WWW."]]},gx={palette:{R:"#b8b2a8",r:"#948e84",s:"#cfc9bf"},layers:[[".RRR.","RRRRR","RRRRR",".RRr."],[".....",".RRR.",".RRRR"],[".....",".....","..sR."]]},_x={palette:{R:"#b8b2a8",r:"#948e84"},layers:[[".RR.","RRRR","rRRr"],["....",".RR.",".Rr."]]},vx={palette:{Y:"#ffdf8a",y:"#f0b94f",w:"#a87a45",k:"#7d5540"},layers:[[".....","..w.."],[".yyy.","yYYYy",".yyy."],[".yYy.","YYYYY",".yYy."],[".yyy.","yYYYy",".yyy."],[".....","..k.."]]},bx={palette:{S:"#ffd9e0",s:"#f0b0c0"},layers:[[".SSS.","SSSSS",".sSs.","..s.."],[".....",".sSs."]]},xx={palette:{g:"#6aa84f",L:"#8fd18a"},layers:[["...",".g."],["...","LgL"],["...",".L."]]},yx={palette:{B:"#f78bb0",g:"#6aa84f"},layers:[["B"],["g"]]},Sx={palette:{W:"#b08550",w:"#8a6238",R:"#ef7d6d",C:"#fff4e0",Y:"#ffd966",G:"#7ccf7c"},layers:[["WWWWW","WWWWW"],["WwWwW","WWWWW"],["Y.G.Y","w...w"],[".....","w...w"],[".....","w...w"],["RCRCR","RCRCR"],[".....","RCRCR"]]},Mx={palette:{S:"#cfc8bb",s:"#a39d93",F:"#ffb066",f:"#f5854f"},layers:[["SSSSS","SSSSS"],["SFfFS","SsSsS"],["SFFFS","SsSsS"],["SSSSS","SSSSS"],[".SSS.",".SsS."],["..S..","....."],["..s..","....."]]},wx={palette:{W:"#b08550",w:"#8a6238",T:"#e6c48a",t:"#caa06a"},layers:[["WWWWWWWW","WWWWWWWW","WWWWWWWW"],["WwwwwwWW","W......W","WWwwwwWW"],["WWWWWWWW","W......W","WWWWWWWW"],["TTTTTTTT","TttttttT","TTTTTTTT"]]},Ex={palette:{B:"#f2d7a2",b:"#cfab73",F:"#fff2d0"},layers:[[".......",".bbbbb.",".bbbbb.",".bbbbb.","......."],[".......",".BBBBB.",".BFFFB.",".BBBBB.","......."]]},Tx={palette:{P:"#8f8f98",p:"#c9c9d1",C:"#f2c36b",R:"#d95f55"},layers:[[".....",".PPP.","PPPPP",".PPP.","....."],[".....",".pCp.","pCRCp",".pCp.","....."]]},Ax={palette:{B:"#8fc7d8",b:"#5fa2b8",D:"#fff1cc",d:"#e8cf9a"},layers:[[".....",".bbb.","bbbbb",".bbb.","....."],[".....",".BBB.","B...B",".BBB.","....."],[".....","..D..",".DdD.","..D..","....."]]},Rx={palette:{W:"#b08550",w:"#8a6238",R:"#e75d5d",G:"#7ccf7c",Y:"#ffd966"},layers:[["WWWWWW","WWWWWW","WWWWWW","WWWWWW"],["WwWwWW","W....W","W....W","WWwWwW"],["......",".R.G..","..Y.R.","......"]]},Cx={palette:{T:"#b8b2a8",t:"#948e84",G:"#f4c95d",g:"#d9a83f"},layers:[[".....",".ttt.","ttttt",".ttt.","....."],[".....",".TGT.","TGgGT",".TGT.","....."]]},Px={palette:{W:"#8a6238",B:"#4a5a78",b:"#64789b",C:"#fff4e0",R:"#ef7d6d"},layers:[["...W...","...W..."],["...W...","...W..."],[".BBBBB.",".BCCCCB."],[".BCCCBB",".BCRCCB."],[".BBBBB.",".BBBBB."]]},kx={palette:{W:"#b08550",w:"#8a6238",T:"#d9b27c"},layers:[["W.....W",".......",".......","W.....W"],["W.....W",".......",".......","W.....W"],["TTTTTTT","TTTTTTT","TTTTTTT","TTTTTTT"]]},ht={palm:jb,palmSmall:Kb,bush:Xb,flowerPink:Yb,flowerYellow:Zb,flowerBlue:Qb,pot:Jb,stone:ex,altar:tx,chestBase:nx,chestLid:ix,egg:sx,basket:rx,coconut:ax,bananas:ox,stump:lx,gong:cx,plank:ux,portal:dx,portalVine1:hx,portalVine2:fx,portalVine3:px,sign:mx,rockA:gx,rockB:_x,lantern:vx,shell:bx,sprout:xx,berry:yx,stall:Sx,oven:Mx,counter:wx,prepBoard:Ex,pizzaPan:Tx,doughBowl:Ax,toppingCrate:Rx,coinTray:Cx,orderBoard:Px,shopTable:kx},Lx={palette:{B:"#7fb8e8",b:"#5e9ed0",C:"#fff4e0",O:"#f5a25d",E:"#2e2433"},layers:[[".......","..CCC..","..CCC.."],["...b...","BBBBBBB","bBBBBBb","..BBB.."],[".......","..BBB..","..BBB..","..EBE..","...O..."]]},Dx={palette:{B:"#7fb8e8",b:"#5e9ed0",C:"#fff4e0",O:"#f5a25d",E:"#2e2433"},layers:[[".......","..CCC..","..CCC.."],["...b...",".bBBBb.",".bBBBb.","..BBB.."],[".......","..BBB..","..BBB..","..EBE..","...O..."]]},Fx={palette:{W:"#ffb3c6",B:"#5a4a52"},layers:[["WW.WW","WWBWW",".WBW."]]},Ix={palette:{W:"#ffb3c6",B:"#5a4a52"},layers:[[".....","..B..","..B.."],[".....","..W..","..W.."]]},ba={birdSpread:Lx,birdFold:Dx,butterflyOpen:Fx,butterflyClosed:Ix},vt={linear:i=>i,inQuad:i=>i*i,outQuad:i=>i*(2-i),outBack:i=>1+(1.70158+1)*Math.pow(i-1,3)+1.70158*Math.pow(i-1,2)},xa=new Set;function dt(i){const e={t:-(i.delay||0),ms:i.ms||300,from:i.from??0,to:i.to??1,ease:i.ease||vt.outQuad,onUpdate:i.onUpdate,onDone:i.onDone,cancelled:!1,cancel(){this.cancelled=!0,xa.delete(this)}};return xa.add(e),e}function Ux(i){for(const e of[...xa]){if(e.cancelled||(e.t+=i,e.t<0))continue;const t=Math.min(1,e.t/e.ms),n=e.from+(e.to-e.from)*e.ease(t);e.onUpdate?.(n,t),t>=1&&(xa.delete(e),e.onDone?.())}}function Et(i,e){return dt({ms:i,onUpdate:()=>{},onDone:e})}function ch(i){if(i<.15){const n=1-.25*(i/.15);return{sy:n,sxz:1+.18*(1-n)*4}}if(i<.6){const n=(i-.15)/.45;return{sy:1+.22*Math.sin(n*Math.PI),sxz:1-.1*Math.sin(n*Math.PI)}}const e=(i-.6)/.4,t=Math.sin(e*Math.PI);return{sy:1-.18*t,sxz:1+.12*t}}const di=i=>440*2**((i-69)/12),dr=i=>2**(i/1200),Si=i=>dr((Math.random()*2-1)*i);let He=null,jr,On,ms,oa,ya,Mo=!0,Kr=!0,Vn=null,mn=null;function et({freq:i,type:e="sine",t,dur:n,gain:s,attack:r=.004,dest:a,ramps:o}){const l=He.createGain();l.connect(a||ms),l.gain.setValueAtTime(1e-4,t),l.gain.linearRampToValueAtTime(Math.max(s,2e-4),t+r),l.gain.exponentialRampToValueAtTime(1e-4,t+n);const c=He.createOscillator();if(c.type=e,c.frequency.setValueAtTime(i,t),o)for(const[u,d]of o)c.frequency.exponentialRampToValueAtTime(u,t+d);c.connect(l),c.start(t),c.stop(t+n+.1)}function Zt(i,e,t,n=.7,s=ms){et({freq:i*dr(-3),t:e,dur:n,gain:t,dest:s}),et({freq:i*dr(3),t:e,dur:n*.9,gain:t*.6,dest:s}),et({freq:i*4,t:e,dur:.07,gain:t*.16,dest:s})}const Jt=(i,e,t,n,s)=>Zt(di(i),e,t,n,s);function La(i,e,t,n){et({freq:di(i),type:"triangle",t:e,dur:.4,gain:t,dest:n}),et({freq:di(i)*2,t:e,dur:.08,gain:t*.25,dest:n})}function Qt({t:i,dur:e,gain:t,type:n="bandpass",freq:s=1e3,q:r=1,sweepTo:a,dest:o=ms}){const l=He.createBufferSource();l.buffer=ya,l.loop=!0,l.loopEnd=ya.duration;const c=He.createBiquadFilter();c.type=n,c.frequency.setValueAtTime(s,i),c.Q.value=r,a&&c.frequency.exponentialRampToValueAtTime(a,i+e);const u=He.createGain();u.gain.setValueAtTime(1e-4,i),u.gain.linearRampToValueAtTime(t,i+.005),u.gain.exponentialRampToValueAtTime(1e-4,i+e),l.connect(c),c.connect(u),u.connect(o),l.start(i,Math.random()*.5),l.stop(i+e+.05)}function Sa(i,e,t,n,s){const r=Math.min(1.5,t/3);for(const a of i)for(const o of[-4,4]){const l=He.createGain();l.connect(s),l.gain.setValueAtTime(1e-4,e),l.gain.linearRampToValueAtTime(n,e+r),l.gain.setValueAtTime(n,e+t-r),l.gain.linearRampToValueAtTime(1e-4,e+t);const c=He.createOscillator();c.frequency.value=di(a),c.detune.value=o,c.connect(l),c.start(e),c.stop(e+t+.1)}}const Bx={hop(i,e,t){et({freq:170*e*Si(30),type:"triangle",t:i,dur:.07,gain:.22*t}),Qt({t:i,dur:.03,gain:.05*t,type:"lowpass",freq:700})},pick(i,e,t){et({freq:392*e,t:i,dur:.16,gain:.3*t,ramps:[[622*e,.09]]}),et({freq:1568*e,t:i,dur:.05,gain:.06*t})},drop(i,e,t){et({freq:523*e,t:i,dur:.16,gain:.28*t,ramps:[[330*e,.1]]})},place(i,e,t){Zt(131*e,i,.5*t,.6),Qt({t:i,dur:.07,gain:.18*t,type:"lowpass",freq:240})},correct(i,e,t){[523.25,659.26,783.99].forEach((n,s)=>Zt(n*e,i+s*.09,.3*t,.55)),et({freq:2093*e,t:i+.27,dur:.25,gain:.07*t})},boop(i,e,t){et({freq:330*e,t:i,dur:.18,gain:.22*t,attack:.02}),et({freq:277*e,t:i+.15,dur:.3,gain:.2*t,attack:.02})},pop(i,e,t){Qt({t:i,dur:.14,gain:.5*t,freq:950*e,q:1.4,sweepTo:320*e}),et({freq:240*e,t:i,dur:.1,gain:.18*t,ramps:[[110*e,.09]]})},chest(i,e,t){[523.25,659.26,783.99,1046.5].forEach((n,s)=>Zt(n*e,i+s*.13,.32*t,s===3?1:.5));for(const n of[261.63,329.63,392])et({freq:n*e,t:i,dur:1.1,gain:.06*t,attack:.08})},coin(i,e,t){const n=[1046.5,1174.7,1318.5,1568,1760];Zt(n[Math.random()*n.length|0]*e*Si(12),i,.26*t,.35)},hatch(i,e,t){et({freq:440*e,t:i,dur:.6,gain:.18*t,attack:.05,ramps:[[1760*e,.5]]}),Zt(1568*e,i+.5,.28*t,.8),Zt(2093*e,i+.64,.22*t,.9),et({freq:3520*e,t:i+.74,dur:.3,gain:.06*t})},splash(i,e,t){Qt({t:i,dur:.5,gain:.55*t,type:"lowpass",freq:1400*e,sweepTo:180}),et({freq:300*e,t:i+.02,dur:.25,gain:.15*t,ramps:[[90,.2]]})},gong(i,e,t){for(const[n,s,r]of[[1,.5,3],[2.02,.18,2.2],[2.96,.08,1.4],[4.2,.04,.8]])et({freq:98*e*n,t:i,dur:r,gain:s*t,attack:.008});Qt({t:i,dur:.05,gain:.06*t,type:"lowpass",freq:500})},crab(i,e,t){et({freq:330*e,type:"triangle",t:i,dur:.32,gain:.22*t,ramps:[[700*e,.1],[392*e,.28]]})},click(i,e,t){et({freq:1800*e,t:i,dur:.035,gain:.12*t})},bloom(i,e,t){[261.63,329.63,392,523.25].forEach((n,s)=>{et({freq:n*e*dr(-3),t:i,dur:2,gain:.1*t,attack:.5+s*.12}),et({freq:n*e*dr(3),t:i,dur:2,gain:.07*t,attack:.5+s*.12})}),Zt(1046.5*e,i+.9,.12*t,1)},door(i,e,t){[1318.5,1568,2093,2349,2637].forEach((n,s)=>Zt(n*e*Si(8),i+s*.07+Math.random()*.02,.12*t,.6))},plant(i,e,t){Zt(620*e*Si(30),i,.22*t,.18),Qt({t:i,dur:.04,gain:.07*t,freq:2400})},sparkle(i,e,t){et({freq:2637*e*Si(15),t:i,dur:.12,gain:.09*t}),et({freq:3520*e*Si(15),t:i+.05,dur:.15,gain:.06*t})},streak(i,e,t){Zt(392*e,i,.3*t,.4),Zt(523.25*e,i+.12,.32*t,.6)},egg(i,e,t){Qt({t:i,dur:.035,gain:.22*t,type:"highpass",freq:2500}),et({freq:700*e*Si(20),type:"triangle",t:i,dur:.04,gain:.1*t})},swoosh(i,e,t){Qt({t:i,dur:.3,gain:.32*t,freq:400*e,q:.7,sweepTo:2600*e})}},Ku=[{0:76,3:79,8:81,14:79,16:72,22:74,24:76,32:81,35:84,40:81,46:79,48:76,56:74},{0:72,6:74,8:76,16:79,20:76,28:74,32:76,38:81,44:79,48:84,52:81,60:79},{0:67,8:72,14:74,24:76,36:79,44:81,52:79,58:76}],Xu=[{0:76,2:79,6:81,12:84,16:79,22:76,24:74,32:81,34:84,38:86,44:81,48:79,54:76,56:74},{0:72,4:74,6:76,12:79,16:76,20:74,28:72,32:76,36:79,38:81,44:84,48:81,52:79,60:74}],ii={tide:{bpm:68,lowpass:3e3,voice:"kal",accentNote:88,padGain:.046,bassGain:.28,bassDur:1.8,bassEvery:16,melGain:.25,chords:[[45,52,57,60],[48,52,55,60],[43,50,55,62],[38,45,50,57],[40,52,55,60]],melodies:[{0:60,10:62,20:64,34:62,44:60,56:64},{0:67,12:69,22:72,32:69,42:67,52:64,60:67},{4:72,16:74,26:76,40:74,50:72,62:69},{0:64,14:72,24:69,36:76,46:72,56:69,62:64},{0:76,12:74,24:72,36:69,48:67,58:64},{2:69,12:67,20:69,30:72,40:69,50:67,60:64},{0:79,14:81,26:84,38:81,48:79,58:76,62:79},{0:60,12:64,24:67,36:69,48:67,60:64}],texture(i,e,t,n,s){e%16===6&&Qt({t,dur:.42,gain:.02+.014*s,type:"bandpass",freq:820+Math.random()*260,q:.55,sweepTo:540,dest:n})}},garden:{bpm:74,lowpass:3600,voice:"kal",altVoice:"pluck",accentNote:88,padGain:.043,bassGain:.24,bassDur:1.15,bassEvery:8,melGain:.26,chords:[[48,52,55,60],[50,57,62,69],[55,62,67,74],[45,52,57,60],[48,55,60,64]],melodies:[{0:72,12:74,24:76,40:79,56:76},{0:79,16:76,28:74,44:72,60:69},{4:84,20:81,36:84,52:86,60:84},{0:67,14:72,26:74,38:76,50:74,62:72},{2:76,18:79,34:81,48:79,58:76},{0:69,16:72,32:74,48:72,60:69},{6:72,22:76,30:79,46:81,54:79,62:76},{8:81,24:84,40:86,52:84,60:81}],texture(i,e,t,n,s){e%16===10&&Qt({t,dur:.08,gain:.02+.01*s,type:"highpass",freq:4200,q:.8,dest:n})}},stump:{bpm:64,lowpass:2600,voice:"kal",accentNote:81,padGain:.048,bassGain:.25,bassDur:1.25,bassEvery:8,melGain:.25,chords:[[45,52,57,60],[45,48,55,60],[48,55,60,64],[43,50,55,57],[38,45,50,57]],melodies:[{0:57,8:60,20:57,32:55,44:57,52:60,60:57},{0:69,10:72,18:74,30:72,40:69,48:67,56:69},{2:60,14:64,26:67,38:69,48:67,58:64},{0:72,16:76,24:74,36:72,48:74,60:69},{0:55,12:57,24:60,36:57,44:55,56:57},{0:64,16:67,28:69,40:67,52:64},{0:67,12:69,20:72,34:76,44:72,54:69,62:67},{4:74,16:72,28:69,40:72,50:69,60:57}],texture(i,e,t,n,s){e%16===8&&Qt({t,dur:.055,gain:.035+.015*s,type:"lowpass",freq:360,q:.7,dest:n})}},vines:{bpm:70,lowpass:4100,voice:"pluck",altVoice:"kal",accentNote:93,padGain:.04,bassGain:.2,bassDur:1.5,bassEvery:16,melGain:.23,chords:[[38,45,50,54],[43,50,55,59],[45,52,57,61],[47,54,59,62],[40,47,52,55]],melodies:[{0:78,10:76,22:74,36:71,50:74,60:69},{0:74,8:78,20:81,34:78,44:74,56:76},{2:83,14:86,28:88,40:86,52:83,62:81},{0:69,12:74,26:78,40:81,54:83,60:86},{4:81,16:78,24:81,38:83,48:81,58:78},{0:86,18:88,34:90,48:86,58:88},{0:83,10:81,20:78,32:76,44:74,56:71,62:69},{6:76,18:78,30:81,44:78,58:83}],texture(i,e,t,n,s){e%16===12&&et({freq:di(88+i.loops%2*2),t,dur:.22,gain:.018+.012*s,attack:.04,dest:n})}}},wo={0:72,6:74,12:76,20:74,24:72,32:69,40:72,48:76,54:74,60:72},Nx={0:67,8:72,14:74,24:76,30:74,36:72,44:69,52:67,58:69},Ox={2:79,16:81,26:79,34:76,48:79,56:76},Xr=[[36,43,48,52],[33,45,52,57],[43,48,52,55],[38,45,50,57],[36,48,55,60]],zx={0:72,2:76,4:79,6:84,9:88};function Il(i,e=.24){return i*(1-e/2+Math.random()*e)}const Gx={kal:(i,e,t,n)=>Jt(i,e,t,1,n),pluck:(i,e,t,n)=>La(i,e,t,n)};function Yr(i,e){if(i<=1)return 0;const t=Math.random()*(i-1)|0;return t>=e?t+1:t}function Zr(i){const e=i.altVoice?[i.voice,i.voice,i.altVoice]:[i.voice];return{stepDur:60/i.bpm/2,length:64,loop:!0,lowpass:i.lowpass,init(t){t.phase=Math.random()*6.28,t.melA=Math.random()*i.melodies.length|0,t.melB=Yr(i.melodies.length,t.melA),t.chordI=Math.random()*i.chords.length|0,t.voiceI=0,t.oct=0},step(t,n,s){const r=t.dest;n===0&&t.loops>0&&t.loops%2===0&&(t.melA=Yr(i.melodies.length,t.melA),t.melB=Yr(i.melodies.length,t.melA),t.oct=Math.random()<.16?12:0,e.length>1&&(t.voiceI=Math.random()*e.length|0));const a=t.loops+t.phase,o=.5+.3*Math.sin(a*.5)+.15*Math.sin(a*.23+t.phase);n%32===0&&(t.chordI=n===0?Yr(i.chords.length,t.chordI):(t.chordI+1)%i.chords.length,Sa(i.chords[t.chordI],s,32*this.stepDur+.6,i.padGain*(.8+.4*o),r)),n%i.bassEvery===0&&Jt(i.chords[t.chordI][0],s,i.bassGain*(.82+.28*o),i.bassDur,r),i.texture?.(t,n,s,r,o);const l=i.melodies[t.melA][n];if(l!=null){const c=Il(i.melGain*(.74+.46*o),.26);Gx[e[t.voiceI]](l+t.oct,s+Math.random()*.016,c,r),o>.84&&Math.random()<.22&&Jt(l+12+t.oct,s+.02,c*.28,.7,r)}if(o>.56){const c=i.melodies[t.melB][n];c!=null&&Math.random()<.8&&La(c-12,s+.02,Il(i.melGain*.32*(o-.35),.3),r)}o>.6&&n%32===26&&Math.random()<o&&Jt(i.accentNote,s+.04,.05*o,.7,r)}}}const Hx={stepDur:60/69/2,length:64,loop:!0,lowpass:3400,init(i){i.phase=Math.random()*6.28,i.chordI=Xr.length-1},step(i,e,t){const n=i.dest,s=[wo,wo,Nx,wo][i.loops%4],r=i.loops%4>=2,a=.62+.22*Math.sin((i.loops+i.phase)*.55);e%16===0&&(i.chordI=(i.chordI+1)%Xr.length,Sa(Xr[i.chordI],t,16*this.stepDur+.5,.05*(.85+.3*a),n)),e%8===0&&Jt(Xr[i.chordI][0],t,.3,1.1,n);const o=s[e];if(o!=null&&Jt(o,t+Math.random()*.012,Il(.34*(.85+.3*a),.2),1.1,n),r){const l=Ox[e];l!=null&&La(l,t+.02,.12*a,n)}e===56&&i.loops%2===1&&Jt(88,t+.04,.06,.8,n)}};ii.tide.melodies,ii.garden.melodies,ii.stump.melodies,ii.vines.melodies;const la={island:{stepDur:60/72/2,length:64,loop:!0,lowpass:2800,step(i,e,t){const n=i.dest;e%32===0&&Sa(e===0?[48,52,55,59]:[53,57,60,64],t,32*this.stepDur+.5,.055,n),e%16===0&&Jt(e<32?36:41,t,.45,1.6,n);const s=Ku[i.loops%Ku.length][e];s&&Jt(s,t,.38*(.85+Math.random()*.3),1.1,n)}},chamber:{stepDur:60/84/2,length:64,loop:!0,lowpass:3800,step(i,e,t){const n=i.dest;e%32===0&&Sa(e===0?[45,52,55,60]:[41,48,52,57],t,32*this.stepDur+.5,.05,n),e%8===0&&Jt(e<32?45:41,t,.4,1.2,n),e%4===2&&Qt({t,dur:.025,gain:.04+Math.random()*.02,type:"highpass",freq:5e3,dest:n}),e%16===8&&Qt({t,dur:.05,gain:.06,type:"lowpass",freq:400,dest:n});const s=Xu[i.loops%Xu.length][e];s&&La(s,t,.3*(.85+Math.random()*.3),n)}},"chamber:tide":Zr(ii.tide),"chamber:garden":Zr(ii.garden),"chamber:stump":Zr(ii.stump),"chamber:vines":Zr(ii.vines),title:Hx,celebrate:{stepDur:.115,length:26,loop:!1,lowpass:4500,step(i,e,t){const n=i.dest,s=zx[e];if(s&&Jt(s,t,.55,.8,n),e===12){for(const r of[60,64,67,72])et({freq:di(r),t,dur:1.6,gain:.12,attack:.05,dest:n});Jt(91,t+.1,.22,.6,n),Jt(96,t+.25,.18,.7,n)}}}};function Yu(i){if(!He||i.done)return;const e=He.currentTime+.2;for(;i.nextTime<e&&!i.done;)i.def.step(i,i.step,i.nextTime),i.nextTime+=i.def.stepDur,i.step+=1,i.step>=i.def.length&&(i.def.loop?(i.step=0,i.loops+=1):(i.done=!0,Vx(i)))}function Eo(i){Ul(.5);const e=la[i],t=He.currentTime,n=He.createGain();n.gain.setValueAtTime(1e-4,t),n.gain.linearRampToValueAtTime(1,t+.5),n.connect(oa);const s=He.createBiquadFilter();s.type="lowpass",s.frequency.value=e.lowpass,s.connect(n);const r={name:i,def:e,out:n,dest:s,step:0,loops:0,nextTime:t+.06,done:!1,timer:0};r.timer=setInterval(()=>Yu(r),100),Vn=r,e.init?.(r),Yu(r)}function Ul(i=.5){const e=Vn;if(!e)return;Vn=null,e.done=!0,clearInterval(e.timer);const t=He.currentTime;e.out.gain.cancelScheduledValues(t),e.out.gain.setValueAtTime(Math.max(e.out.gain.value,1e-4),t),e.out.gain.linearRampToValueAtTime(1e-4,t+i),setTimeout(()=>{try{e.out.disconnect()}catch{}},i*1e3+200)}function Vx(i){clearInterval(i.timer),Vn===i&&(Vn=null,mn===i.name&&(mn=null)),setTimeout(()=>{try{i.out.disconnect()}catch{}},4e3)}const K={init(){if(He){He.state==="suspended"&&He.resume();return}const i=globalThis.AudioContext||globalThis.webkitAudioContext;if(!i)return;He=new i,jr=He.createGain(),jr.gain.value=.9,jr.connect(He.destination),On=He.createDynamicsCompressor(),On.threshold.value=-20,On.knee.value=12,On.ratio.value=5,On.attack.value=.003,On.release.value=.25,On.connect(jr),ms=He.createGain(),ms.gain.value=.8,ms.connect(On),oa=He.createGain(),oa.gain.value=.25,oa.connect(On),ya=He.createBuffer(1,He.sampleRate,He.sampleRate);const e=ya.getChannelData(0);for(let t=0;t<e.length;t++)e[t]=Math.random()*2-1;typeof document<"u"&&document.addEventListener("visibilitychange",()=>{He&&(document.hidden?He.suspend():He.resume())}),He.state==="suspended"&&He.resume(),Kr&&mn&&la[mn]?.loop&&Vn?.name!==mn&&Eo(mn)},sfx(i,e={}){if(!He||!Mo)return;const t=Bx[i];t&&t(He.currentTime,e.pitch??1,e.gain??1)},comboTone(i){if(!He||!Mo)return;const e=[72,74,76,79,81,84,86,88],t=Math.min(Math.max(1,i|0),e.length)-1,n=He.currentTime;Zt(di(e[t]),n,.3,.5),t>=4&&et({freq:di(e[t])*4,t:n+.04,dur:.18,gain:.05})},music(i){if(mn=i,!(!He||!Kr)){if(i===null){Ul();return}la[i]&&(Vn&&Vn.name===i||Eo(i))}},setSfx(i){Mo=!!i},setMusic(i){Kr=!!i,Kr?He&&mn&&la[mn]?.loop&&Vn?.name!==mn&&Eo(mn):Ul(.3)},get ready(){return!!He}};function Wn(i,e,t=null,n=null){const s=t?ur(i,t):i,r=Ni(s,{cacheKey:n&&n+JSON.stringify(t||"")}),a=s.layers.length,o=e/a,l=new en;return r.scale.setScalar(o),l.add(r),l.userData.headH=e,l.userData.voxelScale=o,l}function Tt(i,e,t,n={}){const s=Ni(i,{cacheKey:t,...n});if(e){const r=e/i.layers.length;s.scale.setScalar(r)}return s}function gt(i,e={}){const{fontSize:t=64,color:n="#4a3f35",bg:s=null,pad:r=18,scale:a=1}=e,o=document.createElement("canvas"),l=o.getContext("2d"),c=`900 ${t}px 'Quicksand','Varela Round','Comic Sans MS',system-ui,sans-serif`;l.font=c;const u=Math.ceil(l.measureText(i).width)+r*2,d=t+r*2;o.width=u*2,o.height=d*2;const h=o.getContext("2d");h.scale(2,2),s&&(h.fillStyle=s,h.beginPath(),h.roundRect(2,2,u-4,d-4,16),h.fill(),h.strokeStyle="#ffffff",h.lineWidth=4,h.stroke()),h.font=c,h.fillStyle=n,h.textAlign="center",h.textBaseline="middle",h.fillText(i,u/2,d/2+2);const f=new kd(o);f.anisotropy=4;const g=new ac({map:f,transparent:!0});g._owned=!0;const v=new Cd(g),m=u/d;return v.scale.set(.5*m*a,.5*a,1),v}function uh(i,e){const t=e.clone().project(i.camera);return{x:(t.x*.5+.5)*window.innerWidth,y:(-t.y*.5+.5)*window.innerHeight}}function To(i,e,t,n,s=1,r=null){const a=uh(i,e),o=n.getBoundingClientRect(),l={x:o.left+o.width/2,y:o.top+o.height/2};for(let c=0;c<s;c++){const u=document.createElement("div");u.textContent=t,u.style.cssText="position:fixed;left:0;top:0;font-size:26px;z-index:40;pointer-events:none;will-change:transform;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))",document.body.appendChild(u);const d={x:a.x+(Math.random()-.5)*70,y:a.y-Math.random()*60};dt({ms:380+Math.random()*120,delay:c*70,ease:vt.outQuad,onUpdate:(h,f)=>{const g=a.x+(d.x-a.x)*f,v=a.y+(d.y-a.y)*f-Math.sin(f*Math.PI)*40;u.style.transform=`translate(${g-13}px,${v-13}px) scale(${.6+f*.6})`},onDone:()=>{dt({ms:420,ease:vt.inQuad,onUpdate:(h,f)=>{const g=d.x+(l.x-d.x)*f,v=d.y+(l.y-d.y)*f;u.style.transform=`translate(${g-13}px,${v-13}px) scale(${1.2-f*.7})`},onDone:()=>{u.remove(),n.parentElement?.animate?.([{transform:"scale(1)"},{transform:"scale(1.18)"},{transform:"scale(1)"}],{duration:180}),r?.()}})}})}}function Bl(i,e,t,n="#2c6e49"){const s=uh(i,e),r=document.createElement("div");r.textContent=t,r.style.cssText=`position:fixed;left:0;top:0;font-family:inherit;font-weight:900;font-size:24px;color:${n};z-index:40;pointer-events:none;text-shadow:0 2px 0 #fff,0 3px 6px rgba(0,0,0,.2)`,document.body.appendChild(r),dt({ms:900,ease:vt.outQuad,onUpdate:(a,o)=>{r.style.transform=`translate(${s.x-20}px,${s.y-30-o*60}px) scale(${1+o*.2})`,r.style.opacity=String(1-Math.max(0,o-.6)/.4)},onDone:()=>r.remove()})}const Wx=[16767334,8179580,16757702,10213119,13215487,16751493];class Qr{constructor(e,t=320){this.max=t,this.geo=new bn,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.life=new Float32Array(t),this.geo.setAttribute("position",new qt(this.pos,3)),this.geo.setAttribute("color",new qt(this.col,3));const n=new Pd({size:.14,vertexColors:!0,transparent:!0,depthWrite:!1});n._owned=!0,this.points=new op(this.geo,n),this.points.frustumCulled=!1,e.add(this.points),this.cursor=0,this.life.fill(0),this.pos.fill(9999)}emit(e,t,{colors:n=Wx,speed:s=2.4,up:r=2.6,life:a=900,spread:o=.25}={}){const l=new De;for(let c=0;c<t;c++){const u=this.cursor=(this.cursor+1)%this.max;this.life[u]=a*(.7+Math.random()*.6),this.pos[u*3]=e.x+(Math.random()-.5)*o,this.pos[u*3+1]=e.y+Math.random()*o,this.pos[u*3+2]=e.z+(Math.random()-.5)*o;const d=Math.random()*Math.PI*2,h=s*(.4+Math.random()*.8);this.vel[u*3]=Math.cos(d)*h,this.vel[u*3+1]=r*(.5+Math.random()*.8),this.vel[u*3+2]=Math.sin(d)*h,l.setHex(n[Math.random()*n.length|0]),this.col[u*3]=l.r,this.col[u*3+1]=l.g,this.col[u*3+2]=l.b}this.geo.attributes.color.needsUpdate=!0}confetti(e,t=36){this.emit(e,t),K.sfx("sparkle")}splash(e,t=30){this.emit(e,t,{colors:[10213119,14283515,8308963],speed:1.8,up:3,life:700})}poof(e,t=16,n=14272936){this.emit(e,t,{colors:[n,16777215],speed:1.2,up:1.2,life:500})}update(e){const t=e/1e3;let n=!1;for(let s=0;s<this.max;s++)if(!(this.life[s]<=0)){if(n=!0,this.life[s]-=e,this.life[s]<=0){this.pos[s*3+1]=9999;continue}this.vel[s*3+1]-=7.5*t,this.pos[s*3]+=this.vel[s*3]*t,this.pos[s*3+1]+=this.vel[s*3+1]*t,this.pos[s*3+2]+=this.vel[s*3+2]*t,this.pos[s*3+1]<.02&&(this.pos[s*3+1]=.02,this.vel[s*3+1]*=-.35)}n&&(this.geo.attributes.position.needsUpdate=!0)}}const Zu=1.6,$x=["","portalVine1","portalVine2","portalVine3","portalVine3"];function qx(){const i=document.createElement("canvas");i.width=i.height=32;const e=i.getContext("2d"),t=e.createRadialGradient(16,16,0,16,16,16);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.4,"rgba(255,250,225,0.85)"),t.addColorStop(1,"rgba(255,245,200,0)"),e.fillStyle=t,e.fillRect(0,0,32,32),new kd(i)}function Qu(i,e){const t=new ac({map:qx(),color:i,transparent:!0,depthWrite:!1,blending:ua});t._owned=!0;const n=new Cd(t);return n.scale.set(e,e,1),n}class jx{constructor(e,t,n){this.place=e,this.spot=t,this.worldId=n.worldId,this.accent=n.accent,this.bloom=n.bloom,this.pct=Math.min(1,Math.max(0,n.pct??0)),this.s=Zu/ht.portal.layers.length,this.t=Math.random()*6,this.growK=1,this.glowBoost=0,this.greetArmed=!0,this.greetCooldown=0,this.group=new en,this.group.position.copy(e.worldPos(t.x,t.z)),e.group.add(this.group),this.body=new en,this.group.add(this.body);const s="#"+new De(this.accent).lerp(new De("#ffffff"),.45).getHexString(),r=Ni(ur(ht.portal,{Q:s}),{cacheKey:"prop:portal:"+this.worldId});r.scale.setScalar(this.s),this.body.add(r);const a=new Rs(5*this.s*.94,7*this.s*.94);this.glowMat=new Ea({color:this.accent,transparent:!0,opacity:0,blending:ua,depthWrite:!1,side:Sn}),this.glowMat._owned=!0;const o=new Ut(a,this.glowMat);o.position.set(0,3.5*this.s,1.06*this.s),this.body.add(o),this.labelY=2.45,this.label=gt(n.label,{bg:"#fff8ecdd",scale:.85,fontSize:44}),this.label.position.set(0,this.labelY,0),this.group.add(this.label),this.overlay=null,this.star=null,this.motes=[],this._setStage(n.stage??0),e.addEntity(this)}_setStage(e){this.stage=e,this.overlay&&this.body.remove(this.overlay),this.overlay=null;const t=$x[e];t&&(this.overlay=Ni(ur(ht[t],{F:this.bloom}),{cacheKey:`prop:${t}:${this.worldId}`}),this.overlay.scale.setScalar(this.s),this.body.add(this.overlay)),this.star&&(this.body.remove(this.star),this.star.material.map.dispose(),this.star.material.dispose(),this.star=null),e>=4&&(this.star=Qu(16767334,.16),this.star.position.set(0,13.1*this.s,0),this.body.add(this.star));for(const s of this.motes)this.body.remove(s.sprite),s.sprite.material.map.dispose(),s.sprite.material.dispose();this.motes=[];const n=new De(16777215).lerp(new De(this.accent),.4);for(let s=0;s<1+e;s++){const r=.05+Math.random()*.035,a=Qu(n.getHex(),r);this.body.add(a),this.motes.push({sprite:a,size:r,x:(Math.random()-.5)*.5,z:(1.1+Math.random()*.4)*this.s,phase:Math.random(),speed:.1+Math.random()*.08,sway:.6+Math.random()*.8})}}celebrate(e){e<=this.stage||(this._setStage(e),this.growK=.001,dt({ms:950,ease:vt.outBack,onUpdate:t=>{this.growK=Math.max(.001,t)},onDone:()=>{this.growK=1}}),this.glowBoost=.45,this.bounce(),this.place.fx?.emit(this._fxPos(),30,{colors:[this.accent,16777215,16767334],speed:1.6,up:2.8,life:1e3,spread:.55}),K.sfx("sparkle"))}bounce(){dt({ms:540,ease:vt.linear,onUpdate:(e,t)=>{const n=Math.sin(t*Math.PI*2)*(1-t);this.body.scale.set(1-n*.08,1+n*.14,1-n*.08)},onDone:()=>this.body.scale.set(1,1,1)})}_fxPos(){const e=this.group.position;return new D(e.x,e.y+.8,e.z)}update(e){const t=e/1e3;this.t+=t;const n=.5+.5*Math.sin(this.t*1.7);this.glowBoost=Math.max(0,this.glowBoost-t*.3),this.glowMat.opacity=Math.min(.85,.04+.26*this.pct+.12*n*(.3+this.pct)+this.glowBoost);for(const r of this.motes){const a=(this.t*r.speed+r.phase)%1;r.sprite.position.set(r.x+Math.sin(this.t*r.sway+r.phase*7)*.14,.12+a*Zu*.62,r.z),r.sprite.material.opacity=Math.sin(a*Math.PI)*(.4+.45*Math.sin(this.t*5+r.phase*9)**2);const o=r.size*(.85+.25*Math.sin(this.t*3+r.phase*5));r.sprite.scale.set(o,o,1)}if(this.overlay&&this.overlay.scale.setScalar(this.s*this.growK*(1+.02*Math.sin(this.t*1.8))),this.star){this.star.material.rotation+=t*.8;const r=.16*(1+.2*Math.sin(this.t*2.4));this.star.scale.set(r,r,1)}this.label.position.y=this.labelY+Math.sin(this.t*1.3)*.035,this.greetCooldown=Math.max(0,this.greetCooldown-t);const s=this.place.playerAt?.();if(s){const r=Math.abs(s.x-this.spot.x)+Math.abs(s.z-this.spot.z);r<=2&&this.greetArmed&&!this.greetCooldown?(this.greetArmed=!1,this.greetCooldown=8,this.bounce(),this.glowBoost=Math.max(this.glowBoost,.22),this.place.fx?.emit(this._fxPos(),8,{colors:[this.accent,16777215],speed:1,up:1.8,life:600,spread:.4})):r>=4&&(this.greetArmed=!0)}}}class Vs{constructor(e,t,n,s,r={}){this.place=e,this.x=t,this.z=n,this.choice=s,this.taken=!1,this.group=new en,this.stone=Tt(ht.stone,.62,"prop:stone"),this.group.add(this.stone),this.label=r.tried?gt(String(s.value),{bg:"#ece2d0",color:"#9a8b7a",scale:.95}):gt(String(s.value),{bg:"#fff8ec",scale:.95}),this.label.position.y=.95,this.group.add(this.label),this.group.position.copy(e.worldPos(t,n)),this.bobT=Math.random()*10,e.group.add(this.group)}pickUpMesh(){this.taken=!0,this.place.group.remove(this.group);const e=new en,t=Tt(ht.stone,.5,"prop:stone");e.add(t);const n=gt(String(this.choice.value),{bg:"#fff8ec",scale:.7});return n.position.y=.62,e.add(n),e}update(e){this.taken||(this.bobT+=e/1e3,this.label.position.y=.95+Math.sin(this.bobT*2.2)*.05)}remove(){this.place.group.remove(this.group),this.taken=!0}}class Ju{constructor(e,t,n,s){this.place=e,this.x=t,this.z=n,this.contents=s,this.smashed=!1,this.mesh=Tt(ht.pot,.6,"prop:pot"),this.mesh.position.copy(e.worldPos(t,n)),e.group.add(this.mesh)}smash(e){if(this.smashed)return null;this.smashed=!0,K.sfx("pop"),e.poof(this.mesh.position.clone().add(new D(0,.3,0)),18,14258287);const t=this.mesh;return dt({ms:160,ease:vt.inQuad,onUpdate:(n,s)=>{t.scale.setScalar((1-s)*t.scale.x||.001)},onDone:()=>this.place.group.remove(t)}),this.contents}}class Kx{constructor(e,t,n,s,r,a,o=1.6){this.place=e,this.axis=s,this.min=r,this.max=a,this.pos=s==="x"?t:n,this.fixed=s==="x"?n:t,this.dir=1,this.speed=o,this.frozen=!1,this.cooldown=0,this.mesh=Wn(va.crab,.5,null,"char:crab"),e.group.add(this.mesh),this.t=Math.random()*10,this._sync(0)}get x(){return this.axis==="x"?Math.round(this.pos):this.fixed}get z(){return this.axis==="z"?Math.round(this.pos):this.fixed}_sync(e){this.t+=e/1e3;const t=this.axis==="x"?this.pos:this.fixed,n=this.axis==="z"?this.pos:this.fixed,s=Math.round(t)*1e3+Math.round(n);this._posKey!==s&&(this._posKey=s,this._pos=this.place.worldPos(Math.round(t),Math.round(n)));const r=this._pos,a=this.axis==="x"?this.pos-Math.round(t):0,o=this.axis==="z"?this.pos-Math.round(n):0;this.mesh.position.set(r.x+a,r.y+Math.abs(Math.sin(this.t*9))*.06,r.z+o),this.mesh.rotation.y=this.axis==="x"?this.dir>0?Math.PI/2:-Math.PI/2:this.dir>0?0:Math.PI}update(e){if(this.cooldown>0&&(this.cooldown-=e),this.frozen){this.mesh.rotation.z=Math.sin(this.t)*.04,this.t+=e/1e3;return}this.mesh.rotation.z=0,this.pos+=this.dir*this.speed*(e/1e3),this.pos>=this.max&&(this.pos=this.max,this.dir=-1),this.pos<=this.min&&(this.pos=this.min,this.dir=1),this._sync(e)}}class Xx{constructor(e,t,n){this.place=e,this.x=t,this.z=n,this.mesh=Tt(ht.altar,.9,"prop:altar"),this.mesh.position.copy(e.worldPos(t,n)),e.group.add(this.mesh),this.baseS=this.mesh.scale.x,this.glow=gt("✨",{scale:.8}),this.glow.position.copy(this.mesh.position).add(new D(0,1.45,0)),e.group.add(this.glow),this.t=0}cheer(){const e=this.mesh,t=this.baseS;dt({ms:520,ease:vt.outQuad,onUpdate:(n,s)=>{const r=Math.sin(s*Math.PI);e.scale.set(t*(1+r*.1),t*(1+r*.18),t*(1+r*.1))},onDone:()=>e.scale.setScalar(t)})}shake(){const e=this.mesh;dt({ms:540,ease:vt.linear,onUpdate:(t,n)=>{e.rotation.z=Math.sin(n*Math.PI*3)*.06*(1-n)},onDone:()=>{e.rotation.z=0}})}update(e){this.t+=e/1e3,this.glow.position.y=this.mesh.position.y+1.45+Math.sin(this.t*2.4)*.07,this.glow.material.opacity=.7+Math.sin(this.t*3)*.3}}const Yx={"title.tagline":"Bring the numbers home!","attract.tagline":"The Crab King stole the numbers. Wake the island!","attract.cta":"Start Adventure","attract.prompt":"Tap the island — or press Space!","attract.beat.garden":"Grow gardens","attract.beat.share":"Share coconuts","attract.beat.pets":"Hatch pets","attract.beat.gems":"Light gems","attract.beat.bloom":"Make it bloom","title.play":"Play","title.who":"Who is playing?","title.new_player":"+ New explorer","title.name_prompt":"What is your name?","title.age_prompt":"How old are you?","title.age_help":"This helps the island start in a good place.","title.birthday_prompt":"Birthday","title.birthday_help":"A birthday keeps the path growing each year.","title.curriculum_prompt":"Country and curriculum","title.curriculum_help":"Parents can change the learning path later.","title.start":"Let's go!","title.parents":"For parents","title.duel":"Duel","placement.title":"Wake the island gently","placement.body":"Try a few tiny number quests so Mimi knows where to begin.","placement.start":"Start warm-up","placement.skip":"Skip for now","placement.done":"The island knows where to begin!","placement.answer":"Answer","placement.step":"Question {n} of {total}","warmup.q.fetch":"Choose the correct answer.","warmup.q.missing":"Choose the missing number.","warmup.q.share_fetch":"Choose how many go in each basket.","warmup.q.compare":"Choose the largest fraction.","warmup.q.equiv":"Choose the fraction equal to {frac}.","warmup.q.frac_of":"Choose how much {frac} of {whole} is.","ui.back":"Back","ui.close":"Close","ui.done":"Done","ui.yes":"Yes!","ui.no":"Not now","ui.ok":"OK","ui.delete":"Delete","ui.confirm_delete":"Delete this explorer forever?","story.1":"Oh no! The <b>Crab King</b> pinched all the numbers of our island…","story.2":"Without numbers the grove turned <b>gray</b>. We forgot how to plant, share and bake!","story.3":"Will you help bring the numbers home? The island will <b>bloom</b> wherever you do!","hub.welcome":"Welcome back, {name}! 🌴","hub.pick_world":"Where shall we play?","world.tide":"Tide Pools","world.garden":"Banana Garden","world.stump":"Sharing Stump","world.vines":"Vine Heights","hub.gemtree":"Gem Tree","hub.shop":"Shop","hub.pets":"Pets","hub.daily_gift":"Daily gift!","hub.streak_extended":"🔥 Day {n} in a row!","hub.streak_frozen":"❄️ Your streak freeze kept day {n} safe!","hub.streak_reset":"A fresh start — day 1! Pip kept your spot warm. 💛","business.title":"Bakery Pizzeria","business.zone.bakery":"Bakery","business.zone.pizzeria":"Pizzeria","business.order_ready":"Order ready - tap a station","business.order":"Order","business.stock":"Stock","business.upgrades":"Upgrades","business.pay":"Pay","business.prep":"Prep","business.done":"Done","business.open":"Open shop","business.close_day":"Close for today","business.serve":"Serve","business.restock":"Restock","business.buy":"Buy","business.not_enough":"Not enough shop coins yet.","business.stock_full":"That shelf is full.","business.recipe.margherita":"Margherita pizza","business.recipe.tomato_pizza":"Tomato pizza","business.recipe.flatbread":"Flatbread","business.recipe.berry_tart":"Berry tart","business.ingredient.dough":"Dough","business.ingredient.sauce":"Sauce","business.ingredient.cheese":"Cheese","business.ingredient.tomato":"Tomato","business.ingredient.flour":"Flour","business.ingredient.berries":"Berries","business.ingredient.milk":"Milk","business.upgrade.extra_oven":"Extra oven","business.upgrade.bigger_pantry":"Bigger pantry","business.upgrade.bright_sign":"Bright sign","business.summary":"Today","business.profit":"Profit","business.orders_served":"{n} orders served","business.prep.portion":"Cut it into equal pieces, then pick the topping.","business.prep.repeat":"{trays} trays, {perTray} on each. How many in total?","business.prep.measure":"Measure the right ingredient for this order.","business.prep.fraction":"Take {num}/{den} of {of}. How many is that?","business.prep.scale":"Make {factor}× the recipe — set each amount.","business.prep.pieces":"pieces","business.prep.total":"in total","business.unit.cups":"cups","business.unit.amount":"amount","business.pay.make":"Make {amount} with coins.","business.pay.total":"Total","business.pay.reset":"Start over","business.pay.change":"They pay {paid}. How much change?","business.pay.discount":"{percent}% off {was}. What is the new price?","business.review.profit":"We took in {rev} and spent {cost}. What is the profit?","business.review.demand":"Which treat sold the most today?","business.review.convert":"{kg} kg of flour — how many grams?","business.review.grams":"{n} g","business.review.compare":"Which is the better deal?","business.review.pack":"{count} for {price}","business.station.counter":"Counter","business.station.prep":"Prep","business.station.oven":"Oven","business.station.pantry":"Pantry","business.station.coinTray":"Till","business.station.orderBoard":"Upgrades","business.almost":"Almost — look again!","business.hint.portion_halves_quarters":"Halves make 2 pieces, quarters make 4.","business.hint.repeated_addition_orders":"Count one tray, then add it once for each tray.","business.hint.recipe_measure_whole":"Pick flour first, then how many cups.","business.hint.fraction_of_quantity_recipe":"Split it into equal parts, then take that many.","business.hint.scale_recipe":"Multiply each amount by the number of orders.","business.hint.money_make_amounts":"Add coins until the total matches the price.","business.hint.decimal_money_change":"Change is what they paid minus the price.","business.hint.percentage_discount":"10% is one tenth — take that off the price.","business.supplied":"A supply crate arrived to help! 📦","business.bake.raw":"Bake it at the oven 🔥","business.bake.baking":"In the oven… 🍞","business.bake.ready":"Baked! Serve it 🍞","business.bake.prep_first":"Make the food before baking.","business.bake.first":"Bake it at the oven first! 🔥","play.chamber":"Chamber {n} of {total}","play.correct.1":"YES! You did it!","play.correct.2":"Wonderful!","play.correct.3":"You can really see it now!","play.correct.4":"Banana-tastic!","play.echo_door":"A shimmering door appeared… treasure inside! ✨","play.echo_enter":"Peek inside","play.skip":"Onwards!","play.exit_confirm":"Back to the island?","play.crab_yoink":"Yoink! The crab scattered {n} bananas — grab them back!","play.carry_safe":"Crabs nap while you carry a stone. Think calmly!","play.altar_wants":"The altar sparkles… bring it the answer stone! 🗿","q.fetch":"Find the right stone and carry it to the altar!","q.missing":"Which number is hiding?","q.array_both":"Grow a bed with {rows} rows of {cols}!","q.array_rows":"Plant {total} sprouts in {rows} fair rows!","q.array_total":"Grow a bed with exactly {total} sprouts!","q.share":"Share {total} coconuts fairly over {baskets} baskets!","q.share_fetch":"{total} coconuts, {baskets} baskets — how many in each? Fetch that stone!","q.numberline":"Stand where {frac} lives and ring the bell!","q.compare":"Fetch the LARGEST fraction!","q.equiv":"Fetch the fraction that equals {frac}!","q.frac_of":"How much is {frac} of {whole}?","ex.addsub_confuse":"That's {a} + {b}! For {a} × {b} we make <b>{a} rows of {b}</b> — look!","ex.off_by_table":"Sooo close — one row more or less! <b>{a} rows of {b}</b> makes <b>{answer}</b>.","ex.no_carry":"Don't forget to carry the ten! Look: it makes <b>{answer}</b>.","ex.borrow":"Tricky one — we need to borrow a ten. It makes <b>{answer}</b>.","ex.reversed":"Almost! The digits swapped seats. It is <b>{answer}</b>.","ex.whole_number_bias":"Surprise: a bigger bottom number means <b>smaller pieces</b>! Cut in {d}, each piece shrinks.","ex.add_tops_bottoms":"Fraction pieces must be the <b>same size</b> before they add — watch!","ex.remainder_ignored":"Don't forget the leftovers — <b>{remainder} remain</b> after sharing!","ex.near_miss":"Sooo close! Count once more — it's <b>{answer}</b>.","ex.div_fact":"Think backwards: <b>{a} × {b} = {c}</b> — so {c} ÷ {a} = <b>{b}</b>!","ex.missing_factor":"How many rows of {b} make {c}? <b>{a} rows</b> — because {a} × {b} = {c}!","ex.equiv":"Same amount, different pieces! <b>{n}/{d}</b> covers exactly the same space.","ex.magnitude":"Think: is <b>{n}/{d}</b> closer to 0, a half, or 1?","ex.magnitude_low":"A little further! <b>{n}/{d}</b> is more than where you stood.","ex.magnitude_high":"A step back! <b>{n}/{d}</b> is less than where you stood.","ex.unfair_share":"Fair sharing: every basket gets the <b>same</b>. Tap the stump (or press X) to take one back!","ex.share_more":"The pile still has enough for another round — keep sharing!","ex.array_shape":"Right amount! But we need <b>{rows} rows</b> — walk to reshape the bed.","ex.array_count":"Your bed holds <b>{value}</b>. We need <b>{total}</b> — walk to make it bigger or smaller!","ex.generic":"Look at the picture — it shows the secret!","hint.look":"Watch the picture — then try again. You can do this! 💪","hint.pinch":"✌️ Pinch to zoom · drag with two fingers to look around","verb.array_plant":"walk onto the soil — 🌱 plants the first corner","verb.array_stretch":"press 🌱 when the size is right · 🌱 on the flag takes it back","verb.array_offsoil":"beds only grow on the soil — hop back on!","verb.array_need_soil":"Stand on the brown soil first!","verb.array_unplant":"Flag picked up — plant it anywhere!","verb.share_sub":"tap a basket to share · tap the stump to take back","helper.turtle":"Tuk the Turtle","helper.bunny":"Pip the Bunny","helper.duckling":"Dot the Duckling","helper.owl":"Olli the Owl","helper.fetch":"Work it out first, then carry the answer stone to the ✨ altar! Picked the wrong one? Walk onto another stone to swap, or press ⬇️ to set it down. Crabs nap while you carry — and pots hide surprises!","helper.array":"Stand on the soil and press 🌱 to plant a flag. Then walk — the bed stretches with you! Press 🌱 again when the size is right. Changed your mind? Press 🌱 on the flag to pick it back up.","helper.numberline":"The ▲ marks chop the vine into equal hops! Walk to where your fraction lives and ring the 🔔.","helper.share":"Tap a basket to drop a coconut in — every basket must get the same! Then press ✅. Took one too many? Tap the stump!","helper.cheer.1":"You can do this! 🌟","helper.cheer.2":"Mistakes are how we learn — just try something!","helper.cheer.3":"Take your time. Count nice and slow!","helper.cheer.4":"Stuck? Press 💡 and I will show you a picture!","skill.add_20":"Adding to 20","skill.sub_20":"Taking away to 20","skill.missing_addend":"Mystery numbers (+)","skill.add_100":"Adding to 100","skill.sub_100":"Taking away to 100","skill.tables_a":"Tables of 2, 5, 10","skill.tables_b":"Tables of 3, 4, 6","skill.tables_c":"Tables of 7, 8, 9","skill.tables_mix":"All tables mixed","skill.mult_2digit":"Big multiplying","skill.div_facts":"Sharing facts","skill.share":"Fair sharing","skill.div_remainder":"Sharing with leftovers","skill.missing_factor":"Mystery numbers (×)","skill.frac_magnitude":"Where fractions live","skill.frac_compare":"Comparing fractions","skill.frac_equiv":"Twin fractions","skill.frac_of_n":"A fraction of a number","result.title":"Chamber complete!","result.next":"Next chamber","result.home":"To the island","result.gem":"New gem: {fact}!","result.gem_twin":"{fact} lights its twin {twin} too! ✨","result.mastered":"You can really SEE {skill} now! 🌟","result.bloomed":"{world} is blooming! 🌸","result.tap_chest":"Tap the chest!","egg.progress":"The egg wiggles…","egg.ready":"The egg is ready to hatch!","egg.hatch":"Tap tap tap…","egg.hatched":"{pet} hatched! 🎉","egg.all_pets":"Pip is amazed — you befriended every pet!","pets.title":"Your pets","pets.follow":"Following you","pets.choose":"Tap a pet to bring it along","pet.bunny":"Bunny","pet.duckling":"Duckling","pet.kitten":"Kitten","pet.piglet":"Piglet","pet.redpanda":"Red Panda","pet.turtle":"Turtle","pet.owl":"Owl","pet.dragon":"Mini Dragon","rarity.common":"Common","rarity.rare":"Rare","rarity.epic":"Epic","rarity.legendary":"Legendary","gems.title":"The Banyan Gem Tree","gems.sub":"Every table you master becomes a gem. Twins light together!","gems.count":"{n} of {total} gems shine","gems.skills":"Your powers","shop.title":"Coco’s Shop","shop.hats":"Hats","shop.furs":"Fur colors","shop.trails":"Trails","shop.buy":"Buy","shop.equip":"Wear","shop.equipped":"Wearing","shop.too_pricey":"Not enough bananas yet — play to earn more!","shop.freeze":"Streak freeze","shop.freeze_desc":"Keeps your flame safe if you skip a day","hat.cap":"Cap","hat.bow":"Bow","hat.crown":"Crown","hat.flowercrown":"Flower crown","hat.beanie":"Beanie","hat.wizard":"Wizard hat","hat.pirate":"Pirate hat","hat.party":"Party hat","fur.classic":"Classic","fur.golden":"Golden","fur.snow":"Snow","fur.pink":"Pink","fur.lavender":"Lavender","fur.mint":"Mint","fur.midnight":"Midnight","fur.sunset":"Sunset","trail.sparkle":"Sparkles","trail.petal":"Petals","trail.bubble":"Bubbles","trail.star":"Stars","mimi.meet":"I'm <b>Mimi</b>! I dream up blueprints for our island — bring numbers home and I'll have ideas to build. Tap me whenever you want to chat! 🌺","mimi.build_ready":"You saved enough bananas for the <b>{name}</b>! Come to my worktable! 📜","mimi.need_bananas":"Only <b>{n}</b> 🍌 to go for the <b>{name}</b> — the chambers are full of bananas!","mimi.almost_blueprint":"My next blueprint idea is sooo close… a few more numbers from <b>{world}</b> should do it! ✨","mimi.world_hint":"<b>{world}</b> still looks a little sleepy and gray. Shall we bring its numbers home?","mimi.egg_soon":"Your egg is wiggling! About <b>{n}</b> more right answers and it hatches! 🥚","mimi.streak":"Day {n} in a row — the whole grove is cheering for you! 🔥","mimi.festival":"The grove has never felt this alive. And it’s all thanks to you! 🎆","mimi.chat.1":"I love watching the butterflies come back. The more the island blooms, the more friends arrive! 🦋","mimi.chat.2":"Did you know the Gem Tree remembers every fact you master? Tap it sometime! 💎","mimi.chat.3":"Pip says hi from the egg nest! The pets adore you, you know. 💛","island.title":"Mimi's worktable","island.sub":"Bring numbers home and Mimi dreams up blueprints. Bananas pay the materials — what shall we build?","island.progress":"{n} of {total} built","island.locked_name":"A future dream…","island.locked_hint":"Keep bringing numbers home — new blueprint ideas will come to Mimi!","island.new_blueprint":"📜 New blueprint: {name}!","island.mimi_worktable":"Come see my worktable — I have blueprints! 📜","island.built_say":"It’s wonderful! The grove feels a little more alive. 🌸","island.daily_fruit":"🦊 Rin saved you {n} bananas from the fruit stand!","island.daily_bread":"🐷 Mo baked banana bread — the egg loves it!","island.crab_pays":"🦀 The Crab King opens his hoard and pays {n} bananas!","portal.stage1":"🌱 A little vine sprouts on the {name} gate!","portal.stage2":"🌿 Vines are climbing the {name} gate!","portal.stage3":"🌺 The {name} gate is blooming!","portal.stage4":"✨ The {name} gate is in full bloom!","build.lanterns":"Lantern path","build.lanterns_desc":"Warm lights for the village square.","build.fruitstand":"Fruit stand","build.fruitstand_desc":"Rin the Red Panda moves in — she saves you bananas every day!","build.garden":"Flower garden","build.garden_desc":"Blossoms and butterflies near Vine Heights.","build.stage":"Music stage","build.stage_desc":"Kiki the Kitten moves in — tap the gong for a tune!","build.bakery":"Bakery","build.bakery_desc":"Mo the Piglet moves in — daily banana bread feeds your egg!","build.bridge":"Bridge to the islet","build.bridge_desc":"Cross the water to the little island in the east.","build.plaza":"Festival plaza","build.plaza_desc":"The grand finale — a feast for the whole grove!","npc.fruitstand":"Rin the Red Panda","npc.stage":"Kiki the Kitten","npc.bakery":"Mo the Piglet","npc.crabking":"The Crab King","npc.fruitstand.hello":"A real fruit stand! I’ll set some bananas aside for you every day. 🍌","npc.fruitstand.1":"Fresh fruit, fair prices — I count every banana twice!","npc.fruitstand.2":"Come back tomorrow — I’ll have saved something for you!","npc.stage.hello":"A stage! Finally a place for my songs. Ring the gong with me!","npc.stage.1":"Every right answer sounds like music to me! 🎵","npc.stage.2":"Shall we make some noise? Tap the gong!","npc.bakery.hello":"The oven is warm! Banana bread every day — your egg will love it. 🥖","npc.bakery.1":"Baking is just fair sharing… of deliciousness!","npc.bakery.2":"Half a recipe? That’s fractions, friend!","npc.crabking.1":"I only pinched the numbers because I couldn’t count them… sorry!","npc.crabking.2":"This is the best festival the grove has ever seen. 🎪","finale.1":"Wait!! Before you build the plaza… I, the <b>Crab King</b>, have something to say.","finale.2":"I pinched the numbers because I couldn’t count — and I was too shy to ask for help…","finale.3":"But you! You brought them all home. Please, take my hoard — <b>I’m paying half the plaza!</b>","finale.4":"Then let’s build it TOGETHER — the whole grove is invited! 🎉","finale.festival":"🎆 The grove is whole again — festival time! You did this, {name}!","parents.title":"For parents","parents.body":"Monkey Grove practices arithmetic the way research says children learn it: visual models first (arrays, number lines, fair sharing), no time pressure, no punishment for mistakes — every error shows the model and explains why. An invisible rating system keeps each skill at roughly 65% success: challenging, never crushing.","parents.skills":"Skill overview","parents.business":"Bakery/pizzeria practice","parents.curriculum":"Curriculum","parents.country":"Country","parents.birthday":"Birthday","parents.curriculum_pack":"Learning path","parents.stage":"Stage","parents.strictness":"Targeting","parents.strictness_soft":"Soft guidance","parents.strictness_strict":"Stay close to this stage","parents.coverage":"Coverage","parents.covered":"covered","parents.partial":"started","parents.playable":"ready to play","parents.planned":"planned","parents.accuracy":"Recent accuracy","parents.attempts":"{n} attempts","parents.mastered":"mastered","curriculum.country.nl":"Netherlands","curriculum.nl_po.title":"Dutch primary math (NL_PO)","curriculum.stage":"Stage {n}","curriculum.nl_po.stage.grade_1":"Groep 1","curriculum.nl_po.stage.grade_2":"Groep 2","curriculum.nl_po.stage.grade_3":"Groep 3","curriculum.nl_po.stage.grade_4":"Groep 4","curriculum.nl_po.stage.grade_5":"Groep 5","curriculum.nl_po.stage.grade_6":"Groep 6","curriculum.nl_po.stage.grade_7":"Groep 7","curriculum.nl_po.stage.grade_8":"Groep 8","curriculum.domain.numbers":"Numbers","curriculum.domain.operations":"Operations","curriculum.domain.ratios":"Ratios and fractions","curriculum.domain.measurement_geometry":"Measurement and geometry","curriculum.domain.data_relationships":"Data and relationships","curriculum.nl_po.objective.add_sub_to_20":"Add and subtract to 20","curriculum.nl_po.objective.missing_addend_intro":"Find missing numbers in addition","curriculum.nl_po.objective.add_sub_to_100":"Add and subtract to 100","curriculum.nl_po.objective.tables_2_5_10":"Tables of 2, 5, and 10","curriculum.nl_po.objective.fair_sharing_intro":"Fair sharing","curriculum.nl_po.objective.money_to_100":"Money amounts to 100","curriculum.nl_po.objective.tables_3_4_6":"Tables of 3, 4, and 6","curriculum.nl_po.objective.tables_7_8_9":"Tables of 7, 8, and 9","curriculum.nl_po.objective.all_tables_mixed":"All tables mixed","curriculum.nl_po.objective.measurement_units_intro":"Measurement units","curriculum.nl_po.objective.decimal_money_context":"Decimal money and change","curriculum.nl_po.objective.multi_digit_multiplication":"Multi-digit multiplication","curriculum.nl_po.objective.division_facts_and_inverse":"Division facts and inverse multiplication","curriculum.nl_po.objective.division_with_remainders":"Division with remainders","curriculum.nl_po.objective.fraction_magnitude":"Fractions on a number line","curriculum.nl_po.objective.fraction_of_quantity":"Fractions of quantities","curriculum.nl_po.objective.unit_conversion_context":"Units and stock","curriculum.nl_po.objective.price_comparison":"Price comparison","curriculum.nl_po.objective.fraction_compare_equivalence":"Compare and match equivalent fractions","curriculum.nl_po.objective.percentages_intro":"Introductory percentages","curriculum.nl_po.objective.profit_margin_intro":"Revenue, cost, and profit","curriculum.nl_po.objective.scale_recipe":"Scale recipes","curriculum.nl_po.objective.scale_and_coordinates":"Scale and coordinates","curriculum.nl_po.objective.operations_maintenance":"Grade 8 operations practice","curriculum.nl_po.objective.fraction_decimal_percent_relations":"Fractions, decimals, and percentages","curriculum.nl_po.objective.inverse_reasoning":"Inverse multiplication reasoning","curriculum.nl_po.objective.advanced_data_reasoning":"Advanced data reasoning","settings.title":"Settings","settings.lang":"Language","settings.sfx":"Sounds","settings.music":"Music","settings.reduce_motion":"Calm motion","settings.dyslexia_font":"Easy-read font","settings.high_contrast":"High contrast","settings.colorblind":"Colour-friendly","settings.text_size":"Text size","settings.switch_player":"Switch explorer","nav.back":"Back","nav.close":"Close","hud.hint":"Hint","hud.action":"Action","hud.home":"Home","duel.title":"Banana Duel","duel.sub":"Two explorers, same chambers — who gathers more bananas?","duel.pick2":"Choose two explorers","duel.turn":"{name}, your turn!","duel.pass":"Pass the device to {name}","duel.round":"Round {n} of {total}","duel.winner":"🏆 {name} wins with {score} bananas!","duel.tie":"It's a tie — the monkeys share the bananas!","duel.code":"Challenge code","duel.code_desc":"Send this code to a friend — they play the same chambers!","duel.enter_code":"Enter a challenge code","duel.play_code":"Play challenge"},Zx={"title.tagline":"Breng de getallen thuis!","attract.tagline":"De Krabbenkoning stal de getallen. Maak het eiland wakker!","attract.cta":"Start avontuur","attract.prompt":"Tik op het eiland — of druk op spatie!","attract.beat.garden":"Laat tuinen groeien","attract.beat.share":"Deel kokosnoten","attract.beat.pets":"Broed dieren uit","attract.beat.gems":"Laat edelstenen stralen","attract.beat.bloom":"Laat alles bloeien","title.play":"Spelen","title.who":"Wie gaat er spelen?","title.new_player":"+ Nieuwe ontdekker","title.name_prompt":"Hoe heet je?","title.age_prompt":"Hoe oud ben je?","title.age_help":"Zo kan het eiland rustig beginnen op een fijne plek.","title.birthday_prompt":"Verjaardag","title.birthday_help":"Met een verjaardag groeit het leerpad elk jaar mee.","title.curriculum_prompt":"Land en leerlijn","title.curriculum_help":"Ouders kunnen het leerpad later aanpassen.","title.start":"We gaan!","title.parents":"Voor ouders","title.duel":"Duel","placement.title":"Maak het eiland rustig wakker","placement.body":"Probeer een paar kleine getalzoektochten zodat Mimi weet waar we beginnen.","placement.start":"Start warming-up","placement.skip":"Nu overslaan","placement.done":"Het eiland weet waar we beginnen!","placement.answer":"Antwoord","placement.step":"Vraag {n} van {total}","warmup.q.fetch":"Kies het juiste antwoord.","warmup.q.missing":"Kies het ontbrekende getal.","warmup.q.share_fetch":"Kies hoeveel er in elke mand gaan.","warmup.q.compare":"Kies de grootste breuk.","warmup.q.equiv":"Kies de breuk die gelijk is aan {frac}.","warmup.q.frac_of":"Kies hoeveel {frac} van {whole} is.","ui.back":"Terug","ui.close":"Sluiten","ui.done":"Klaar","ui.yes":"Ja!","ui.no":"Nu even niet","ui.ok":"OK","ui.delete":"Verwijderen","ui.confirm_delete":"Deze ontdekker voorgoed verwijderen?","story.1":"O nee! De <b>Krabbenkoning</b> heeft alle getallen van ons eiland gejat…","story.2":"Zonder getallen werd het bos <b>grijs</b>. We weten niet meer hoe je plant, deelt en bakt!","story.3":"Help jij de getallen thuisbrengen? Het eiland gaat <b>bloeien</b> waar jij dat doet!","hub.welcome":"Welkom terug, {name}! 🌴","hub.pick_world":"Waar gaan we spelen?","world.tide":"Getijdenpoel","world.garden":"Bananentuin","world.stump":"Deelstronk","world.vines":"Lianenhoogte","hub.gemtree":"Edelsteenboom","hub.shop":"Winkel","hub.pets":"Huisdieren","hub.daily_gift":"Dagcadeautje!","hub.streak_extended":"🔥 Dag {n} op rij!","hub.streak_frozen":"❄️ Je vlam-bevriezer hield dag {n} veilig!","hub.streak_reset":"Een frisse start — dag 1! Pip hield je plekje warm. 💛","business.title":"Bakkerij Pizzeria","business.zone.bakery":"Bakkerij","business.zone.pizzeria":"Pizzeria","business.order_ready":"Bestelling klaar - tik op een werkplek","business.order":"Bestelling","business.stock":"Voorraad","business.upgrades":"Verbeteringen","business.pay":"Betalen","business.prep":"Maken","business.done":"Klaar","business.open":"Winkel openen","business.close_day":"Vandaag sluiten","business.serve":"Serveren","business.restock":"Aanvullen","business.buy":"Kopen","business.not_enough":"Nog niet genoeg winkelmunten.","business.stock_full":"Die plank is vol.","business.recipe.margherita":"Margherita pizza","business.recipe.tomato_pizza":"Tomatenpizza","business.recipe.flatbread":"Platbrood","business.recipe.berry_tart":"Bessentaartje","business.ingredient.dough":"Deeg","business.ingredient.sauce":"Saus","business.ingredient.cheese":"Kaas","business.ingredient.tomato":"Tomaat","business.ingredient.flour":"Meel","business.ingredient.berries":"Bessen","business.ingredient.milk":"Melk","business.upgrade.extra_oven":"Extra oven","business.upgrade.bigger_pantry":"Grotere voorraadkast","business.upgrade.bright_sign":"Mooi uithangbord","business.summary":"Vandaag","business.profit":"Winst","business.orders_served":"{n} bestellingen geholpen","business.prep.portion":"Snijd het in gelijke stukken en kies het beleg.","business.prep.repeat":"{trays} bakplaten, {perTray} op elke. Hoeveel in totaal?","business.prep.measure":"Meet het juiste ingrediënt voor deze bestelling.","business.prep.fraction":"Neem {num}/{den} van {of}. Hoeveel is dat?","business.prep.scale":"Maak {factor}× het recept — kies elke hoeveelheid.","business.prep.pieces":"stukken","business.prep.total":"in totaal","business.unit.cups":"kopjes","business.unit.amount":"hoeveelheid","business.pay.make":"Maak {amount} met munten.","business.pay.total":"Totaal","business.pay.reset":"Opnieuw","business.pay.change":"Ze betalen {paid}. Hoeveel wisselgeld?","business.pay.discount":"{percent}% korting op {was}. Wat is de nieuwe prijs?","business.review.profit":"We verdienden {rev} en gaven {cost} uit. Wat is de winst?","business.review.demand":"Welke lekkernij verkocht vandaag het meest?","business.review.convert":"{kg} kg meel — hoeveel gram?","business.review.grams":"{n} g","business.review.compare":"Welke is de beste deal?","business.review.pack":"{count} voor {price}","business.station.counter":"Toonbank","business.station.prep":"Maken","business.station.oven":"Oven","business.station.pantry":"Voorraad","business.station.coinTray":"Kassa","business.station.orderBoard":"Verbeteringen","business.almost":"Bijna — kijk nog eens!","business.hint.portion_halves_quarters":"Helften zijn 2 stukken, kwarten 4.","business.hint.repeated_addition_orders":"Tel één bakplaat en tel die voor elke bakplaat op.","business.hint.recipe_measure_whole":"Kies eerst meel, dan hoeveel kopjes.","business.hint.fraction_of_quantity_recipe":"Verdeel in gelijke delen en neem er zoveel.","business.hint.scale_recipe":"Vermenigvuldig elke hoeveelheid met het aantal bestellingen.","business.hint.money_make_amounts":"Voeg munten toe tot het totaal klopt.","business.hint.decimal_money_change":"Wisselgeld is wat ze betaalden min de prijs.","business.hint.percentage_discount":"10% is een tiende — haal dat van de prijs af.","business.supplied":"Er kwam een voorraadkrat om te helpen! 📦","business.bake.raw":"Bak het in de oven 🔥","business.bake.baking":"In de oven… 🍞","business.bake.ready":"Gebakken! Serveer het 🍞","business.bake.prep_first":"Maak het eten eerst klaar.","business.bake.first":"Bak het eerst in de oven! 🔥","play.chamber":"Kamer {n} van {total}","play.correct.1":"JA! Gelukt!","play.correct.2":"Geweldig!","play.correct.3":"Nu zie je het écht!","play.correct.4":"Bananen-tastisch!","play.echo_door":"Er verscheen een glinsterende deur… met schatten! ✨","play.echo_enter":"Kijk binnen","play.skip":"Verder!","play.exit_confirm":"Terug naar het eiland?","play.crab_yoink":"Hebbes! De krab strooide {n} bananen rond — pak ze terug!","play.carry_safe":"Krabben doen een dutje terwijl jij een steen draagt. Denk rustig na!","play.altar_wants":"Het altaar fonkelt… breng de antwoordsteen! 🗿","q.fetch":"Zoek de juiste steen en breng hem naar het altaar!","q.missing":"Welk getal verstopt zich?","q.array_both":"Maak een bedje met {rows} rijen van {cols}!","q.array_rows":"Plant {total} plantjes in {rows} eerlijke rijen!","q.array_total":"Maak een bedje met precies {total} plantjes!","q.share":"Verdeel {total} kokosnoten eerlijk over {baskets} mandjes!","q.share_fetch":"{total} kokosnoten, {baskets} mandjes — hoeveel in elk mandje? Haal die steen!","q.numberline":"Ga staan waar {frac} woont en luid de bel!","q.compare":"Haal de GROOTSTE breuk!","q.equiv":"Haal de breuk die gelijk is aan {frac}!","q.frac_of":"Hoeveel is {frac} van {whole}?","ex.addsub_confuse":"Dat is {a} + {b}! Voor {a} × {b} maken we <b>{a} rijen van {b}</b> — kijk!","ex.off_by_table":"Bíjna — één rij te veel of te weinig! <b>{a} rijen van {b}</b> is <b>{answer}</b>.","ex.no_carry":"Vergeet de tien niet te onthouden! Kijk: het wordt <b>{answer}</b>.","ex.borrow":"Een lastige! We moeten een tien inwisselen. Het wordt <b>{answer}</b>.","ex.reversed":"Bijna! De cijfers wisselden van plek. Het is <b>{answer}</b>.","ex.whole_number_bias":"Verrassing: een groter getal onder de streep betekent <b>kleinere stukjes</b>! Snijd in {d}, dan wordt elk stukje kleiner.","ex.add_tops_bottoms":"Breukstukjes moeten eerst <b>even groot</b> zijn voor je ze optelt — kijk!","ex.remainder_ignored":"Vergeet de restjes niet — er blijven er <b>{remainder} over</b>!","ex.near_miss":"Zóóó dichtbij! Tel nog één keer — het is <b>{answer}</b>.","ex.div_fact":"Denk terug: <b>{a} × {b} = {c}</b> — dus {c} ÷ {a} = <b>{b}</b>!","ex.missing_factor":"Hoeveel rijen van {b} maken {c}? <b>{a} rijen</b> — want {a} × {b} = {c}!","ex.equiv":"Evenveel, andere stukjes! <b>{n}/{d}</b> bedekt precies hetzelfde.","ex.magnitude":"Denk: ligt <b>{n}/{d}</b> dichter bij 0, een half, of 1?","ex.magnitude_low":"Nog een stukje verder! <b>{n}/{d}</b> is méér dan waar je stond.","ex.magnitude_high":"Stapje terug! <b>{n}/{d}</b> is mínder dan waar je stond.","ex.unfair_share":"Eerlijk delen: elk mandje krijgt <b>evenveel</b>. Tik op de stronk (of druk op X) om er één terug te pakken!","ex.share_more":"De stapel heeft nog genoeg voor een rondje — deel maar verder!","ex.array_shape":"Goede hoeveelheid! Maar we willen <b>{rows} rijen</b> — loop om het bedje om te bouwen.","ex.array_count":"Je bedje heeft er <b>{value}</b>. We willen <b>{total}</b> — loop om het groter of kleiner te maken!","ex.generic":"Kijk naar het plaatje — daar zit het geheim!","hint.look":"Kijk goed naar het plaatje — en probeer opnieuw. Jij kan dit! 💪","hint.pinch":"✌️ Knijp om te zoomen · sleep met twee vingers om rond te kijken","verb.array_plant":"loop de aarde op — 🌱 plant het eerste hoekje","verb.array_stretch":"druk op 🌱 als de maat klopt · 🌱 op het vlaggetje pakt het terug","verb.array_offsoil":"bedjes groeien alleen op aarde — spring er weer op!","verb.array_need_soil":"Ga eerst op de bruine aarde staan!","verb.array_unplant":"Vlaggetje opgepakt — plant het waar je wilt!","verb.share_sub":"tik op een mandje om te delen · tik op de stronk om terug te pakken","helper.turtle":"Tuk de Schildpad","helper.bunny":"Pip het Konijntje","helper.duckling":"Dot het Eendje","helper.owl":"Olli de Uil","helper.fetch":"Reken eerst uit, en draag dan de juiste steen naar het ✨ altaar! Verkeerde steen? Loop naar een andere steen om te ruilen, of druk op ⬇️ om hem neer te zetten. Krabben slapen zolang je draagt — en in potten zitten verrassingen!","helper.array":"Ga op de aarde staan en druk op 🌱 om een vlaggetje te planten. Loop dan — het bedje rekt met je mee! Klopt de maat? Druk nog eens op 🌱. Bedacht? Druk op 🌱 op het vlaggetje en je pakt het terug.","helper.numberline":"De ▲-streepjes hakken de liaan in gelijke stukjes! Loop naar waar jouw breuk woont en luid de 🔔.","helper.share":"Tik op een mandje om er een kokosnoot in te doen — elk mandje evenveel! Druk daarna op ✅. Eentje te veel? Tik op de stronk!","helper.cheer.1":"Jij kan dit! 🌟","helper.cheer.2":"Van foutjes leer je — probeer gewoon iets!","helper.cheer.3":"Neem de tijd. Tel maar rustig!","helper.cheer.4":"Kom je er niet uit? Druk op 💡 en ik laat een plaatje zien!","skill.add_20":"Plussommen tot 20","skill.sub_20":"Minsommen tot 20","skill.missing_addend":"Geheime getallen (+)","skill.add_100":"Plussommen tot 100","skill.sub_100":"Minsommen tot 100","skill.tables_a":"Tafels van 2, 5, 10","skill.tables_b":"Tafels van 3, 4, 6","skill.tables_c":"Tafels van 7, 8, 9","skill.tables_mix":"Alle tafels door elkaar","skill.mult_2digit":"Groot vermenigvuldigen","skill.div_facts":"Deelsommen","skill.share":"Eerlijk delen","skill.div_remainder":"Delen met rest","skill.missing_factor":"Geheime getallen (×)","skill.frac_magnitude":"Waar breuken wonen","skill.frac_compare":"Breuken vergelijken","skill.frac_equiv":"Tweelingbreuken","skill.frac_of_n":"Een breuk van een getal","result.title":"Kamer gehaald!","result.next":"Volgende kamer","result.home":"Naar het eiland","result.gem":"Nieuwe edelsteen: {fact}!","result.gem_twin":"{fact} laat ook zijn tweeling {twin} stralen! ✨","result.mastered":"Je ZIET {skill} nu echt! 🌟","result.bloomed":"{world} staat in bloei! 🌸","result.tap_chest":"Tik op de schatkist!","egg.progress":"Het ei wiebelt…","egg.ready":"Het ei kan uitkomen!","egg.hatch":"Tik tik tik…","egg.hatched":"{pet} is uit het ei gekomen! 🎉","egg.all_pets":"Pip is verbaasd — je bent vriendjes met álle dieren!","pets.title":"Jouw huisdieren","pets.follow":"Loopt met je mee","pets.choose":"Tik op een dier om het mee te nemen","pet.bunny":"Konijntje","pet.duckling":"Eendje","pet.kitten":"Poesje","pet.piglet":"Biggetje","pet.redpanda":"Rode panda","pet.turtle":"Schildpadje","pet.owl":"Uiltje","pet.dragon":"Minidraakje","rarity.common":"Gewoon","rarity.rare":"Zeldzaam","rarity.epic":"Episch","rarity.legendary":"Legendarisch","gems.title":"De Banyan Edelsteenboom","gems.sub":"Elke tafelsom die je kent wordt een edelsteen. Tweelingen stralen samen!","gems.count":"{n} van de {total} edelstenen stralen","gems.skills":"Jouw krachten","shop.title":"De winkel van Coco","shop.hats":"Hoedjes","shop.furs":"Vachtkleuren","shop.trails":"Sporen","shop.buy":"Kopen","shop.equip":"Dragen","shop.equipped":"Draag je","shop.too_pricey":"Nog niet genoeg bananen — speel om meer te verdienen!","shop.freeze":"Vlam-bevriezer","shop.freeze_desc":"Houdt je vlam veilig als je een dagje overslaat","hat.cap":"Petje","hat.bow":"Strikje","hat.crown":"Kroontje","hat.flowercrown":"Bloemenkrans","hat.beanie":"Mutsje","hat.wizard":"Tovenaarshoed","hat.pirate":"Piratenhoed","hat.party":"Feesthoedje","fur.classic":"Klassiek","fur.golden":"Goud","fur.snow":"Sneeuw","fur.pink":"Roze","fur.lavender":"Lavendel","fur.mint":"Mint","fur.midnight":"Middernacht","fur.sunset":"Zonsondergang","trail.sparkle":"Glitters","trail.petal":"Blaadjes","trail.bubble":"Belletjes","trail.star":"Sterretjes","mimi.meet":"Ik ben <b>Mimi</b>! Ik bedenk bouwplannen voor ons eiland — breng getallen thuis en ik krijg ideeën. Tik me aan als je wilt kletsen! 🌺","mimi.build_ready":"Je hebt genoeg bananen voor het <b>{name}</b>! Kom naar mijn werktafel! 📜","mimi.need_bananas":"Nog maar <b>{n}</b> 🍌 voor het <b>{name}</b> — de kamers liggen vol bananen!","mimi.almost_blueprint":"Mijn volgende bouwidee is zóóó dichtbij… nog een paar getallen uit <b>{world}</b> en het lukt! ✨","mimi.world_hint":"<b>{world}</b> ziet er nog wat slaperig en grijs uit. Zullen we daar getallen thuisbrengen?","mimi.egg_soon":"Je ei wiebelt! Nog ongeveer <b>{n}</b> goede antwoorden en het komt uit! 🥚","mimi.streak":"Dag {n} op rij — het hele bos juicht voor je! 🔥","mimi.festival":"Het bos heeft nog nooit zó geleefd. En dat komt allemaal door jou! 🎆","mimi.chat.1":"Ik kijk zo graag naar de vlinders die terugkomen. Hoe meer het eiland bloeit, hoe meer vriendjes er komen! 🦋","mimi.chat.2":"Wist je dat de Edelsteenboom elke som onthoudt die je kent? Tik er maar eens op! 💎","mimi.chat.3":"Pip doet de groetjes vanaf het nest! De huisdieren zijn dol op je. 💛","island.title":"De werktafel van Mimi","island.sub":"Breng getallen thuis en Mimi bedenkt bouwplannen. Bananen betalen het materiaal — wat bouwen we?","island.progress":"{n} van {total} gebouwd","island.locked_name":"Een toekomstdroom…","island.locked_hint":"Breng meer getallen thuis — dan krijgt Mimi nieuwe bouwideeën!","island.new_blueprint":"📜 Nieuw bouwplan: {name}!","island.mimi_worktable":"Kom naar mijn werktafel — ik heb bouwplannen! 📜","island.built_say":"Wat prachtig! Het bos voelt weer een beetje levendiger. 🌸","island.daily_fruit":"🦊 Rin heeft {n} bananen voor je bewaard bij het kraampje!","island.daily_bread":"🐷 Mo bakte bananenbrood — het ei smult ervan!","island.crab_pays":"🦀 De Krabbenkoning opent zijn schat en betaalt {n} bananen!","portal.stage1":"🌱 Er ontkiemt een rankje op de poort van {name}!","portal.stage2":"🌿 Ranken klimmen langs de poort van {name}!","portal.stage3":"🌺 De poort van {name} staat in bloei!","portal.stage4":"✨ De poort van {name} is in volle bloei!","build.lanterns":"Lantaarnpad","build.lanterns_desc":"Warme lichtjes voor het dorpsplein.","build.fruitstand":"Fruitkraampje","build.fruitstand_desc":"Rin de Rode Panda komt wonen — ze bewaart elke dag bananen voor je!","build.garden":"Bloementuin","build.garden_desc":"Bloesem en vlinders bij de Lianenhoogte.","build.stage":"Muziekpodium","build.stage_desc":"Kiki het Poesje komt wonen — tik op de gong voor een liedje!","build.bakery":"Bakkerij","build.bakery_desc":"Mo het Biggetje komt wonen — dagelijks bananenbrood voor je ei!","build.bridge":"Brug naar het eilandje","build.bridge_desc":"Steek het water over naar het eilandje in het oosten.","build.plaza":"Feestplein","build.plaza_desc":"De grote finale — een feest voor het hele bos!","npc.fruitstand":"Rin de Rode Panda","npc.stage":"Kiki het Poesje","npc.bakery":"Mo het Biggetje","npc.crabking":"De Krabbenkoning","npc.fruitstand.hello":"Een echt fruitkraampje! Ik bewaar elke dag wat bananen voor je. 🍌","npc.fruitstand.1":"Vers fruit, eerlijke prijzen — ik tel elke banaan twee keer!","npc.fruitstand.2":"Kom morgen terug — dan heb ik weer iets voor je bewaard!","npc.stage.hello":"Een podium! Eindelijk een plek voor mijn liedjes. Luid de gong met me mee!","npc.stage.1":"Elk goed antwoord klinkt voor mij als muziek! 🎵","npc.stage.2":"Zullen we herrie maken? Tik op de gong!","npc.bakery.hello":"De oven is warm! Elke dag bananenbrood — je ei zal smullen. 🥖","npc.bakery.1":"Bakken is gewoon eerlijk delen… van lekkers!","npc.bakery.2":"Een half recept? Dat zijn breuken, vriend!","npc.crabking.1":"Ik jatte de getallen alleen omdat ik niet kon tellen… sorry!","npc.crabking.2":"Dit is het mooiste feest dat het bos ooit heeft gezien. 🎪","finale.1":"Wacht!! Voor je het plein bouwt… moet ik, de <b>Krabbenkoning</b>, iets zeggen.","finale.2":"Ik jatte de getallen omdat ik niet kon tellen — en ik durfde geen hulp te vragen…","finale.3":"Maar jij! Jij bracht ze allemaal thuis. Hier, neem mijn schat — <b>ik betaal de helft van het plein!</b>","finale.4":"Dan bouwen we het SAMEN — het hele bos is uitgenodigd! 🎉","finale.festival":"🎆 Het bos is weer heel — feest! Dit heb jij gedaan, {name}!","parents.title":"Voor ouders","parents.body":"Monkey Grove oefent rekenen zoals onderzoek zegt dat kinderen leren: eerst visuele modellen (rijtjes, getallenlijnen, eerlijk delen), geen tijdsdruk, geen straf voor fouten — elke fout laat het model zien en legt uit waarom. Een onzichtbaar systeem houdt elke vaardigheid op ongeveer 65% succes: uitdagend, nooit ontmoedigend.","parents.skills":"Vaardigheden","parents.business":"Bakkerij/pizzeria oefening","parents.curriculum":"Leerlijn","parents.country":"Land","parents.birthday":"Verjaardag","parents.curriculum_pack":"Leerpad","parents.stage":"Groep","parents.strictness":"Richting","parents.strictness_soft":"Rustige begeleiding","parents.strictness_strict":"Blijf dicht bij deze groep","parents.coverage":"Dekking","parents.covered":"beheerst","parents.partial":"gestart","parents.playable":"speelbaar","parents.planned":"gepland","parents.accuracy":"Recente nauwkeurigheid","parents.attempts":"{n} pogingen","parents.mastered":"beheerst","curriculum.country.nl":"Nederland","curriculum.nl_po.title":"Nederlands basisschoolrekenen (NL_PO)","curriculum.stage":"Fase {n}","curriculum.nl_po.stage.grade_1":"Groep 1","curriculum.nl_po.stage.grade_2":"Groep 2","curriculum.nl_po.stage.grade_3":"Groep 3","curriculum.nl_po.stage.grade_4":"Groep 4","curriculum.nl_po.stage.grade_5":"Groep 5","curriculum.nl_po.stage.grade_6":"Groep 6","curriculum.nl_po.stage.grade_7":"Groep 7","curriculum.nl_po.stage.grade_8":"Groep 8","curriculum.domain.numbers":"Getallen","curriculum.domain.operations":"Bewerkingen","curriculum.domain.ratios":"Verhoudingen en breuken","curriculum.domain.measurement_geometry":"Meten en meetkunde","curriculum.domain.data_relationships":"Verbanden","curriculum.nl_po.objective.add_sub_to_20":"Plussommen en minsommen tot 20","curriculum.nl_po.objective.missing_addend_intro":"Ontbrekende getallen bij optellen","curriculum.nl_po.objective.add_sub_to_100":"Plussommen en minsommen tot 100","curriculum.nl_po.objective.tables_2_5_10":"Tafels van 2, 5 en 10","curriculum.nl_po.objective.fair_sharing_intro":"Eerlijk delen","curriculum.nl_po.objective.money_to_100":"Geldbedragen tot 100","curriculum.nl_po.objective.tables_3_4_6":"Tafels van 3, 4 en 6","curriculum.nl_po.objective.tables_7_8_9":"Tafels van 7, 8 en 9","curriculum.nl_po.objective.all_tables_mixed":"Alle tafels door elkaar","curriculum.nl_po.objective.measurement_units_intro":"Maateenheden","curriculum.nl_po.objective.decimal_money_context":"Kommageld en wisselgeld","curriculum.nl_po.objective.multi_digit_multiplication":"Vermenigvuldigen met grotere getallen","curriculum.nl_po.objective.division_facts_and_inverse":"Deelsommen en omgekeerd vermenigvuldigen","curriculum.nl_po.objective.division_with_remainders":"Delen met rest","curriculum.nl_po.objective.fraction_magnitude":"Breuken op de getallenlijn","curriculum.nl_po.objective.fraction_of_quantity":"Breuken van hoeveelheden","curriculum.nl_po.objective.unit_conversion_context":"Maten en voorraad","curriculum.nl_po.objective.price_comparison":"Prijzen vergelijken","curriculum.nl_po.objective.fraction_compare_equivalence":"Breuken vergelijken en gelijk maken","curriculum.nl_po.objective.percentages_intro":"Eerste procenten","curriculum.nl_po.objective.profit_margin_intro":"Opbrengst, kosten en winst","curriculum.nl_po.objective.scale_recipe":"Recepten vergroten","curriculum.nl_po.objective.scale_and_coordinates":"Schaal en coordinaten","curriculum.nl_po.objective.operations_maintenance":"Groep 8-bewerkingen oefenen","curriculum.nl_po.objective.fraction_decimal_percent_relations":"Breuken, decimalen en procenten","curriculum.nl_po.objective.inverse_reasoning":"Omgekeerd vermenigvuldigen","curriculum.nl_po.objective.advanced_data_reasoning":"Gegevens kritisch bekijken","settings.title":"Instellingen","settings.lang":"Taal","settings.sfx":"Geluiden","settings.music":"Muziek","settings.reduce_motion":"Rustige beweging","settings.dyslexia_font":"Leesvriendelijk lettertype","settings.high_contrast":"Hoog contrast","settings.colorblind":"Kleurvriendelijk","settings.text_size":"Tekstgrootte","settings.switch_player":"Andere ontdekker","nav.back":"Terug","nav.close":"Sluiten","hud.hint":"Tip","hud.action":"Actie","hud.home":"Home","duel.title":"Bananenduel","duel.sub":"Twee ontdekkers, dezelfde kamers — wie verzamelt meer bananen?","duel.pick2":"Kies twee ontdekkers","duel.turn":"{name}, jouw beurt!","duel.pass":"Geef het apparaat aan {name}","duel.round":"Ronde {n} van {total}","duel.winner":"🏆 {name} wint met {score} bananen!","duel.tie":"Gelijkspel — de aapjes delen de bananen!","duel.code":"Uitdaagcode","duel.code_desc":"Stuur deze code naar een vriendje — die speelt precies dezelfde kamers!","duel.enter_code":"Voer een uitdaagcode in","duel.play_code":"Speel uitdaging"},ed={en:Yx,nl:Zx};function w(i,e=null){const t=cn().lang||"en";let n=ed[t]?.[i]??ed.en[i]??i;return e&&(n=n.replace(/\{(\w+)\}/g,(s,r)=>e[r]!==void 0?String(e[r]):s)),n}function Qx(){const i=1+Math.floor(Math.random()*4);return w(`play.correct.${i}`)}function mc(i){cn().lang=i}const Ao={arrayRows:8,arrayCols:10,baskets:6};function Jr(i,e,t={}){let n=i;if(n.kind==="array"){const s=n.model.params,r=(a,o)=>a<=Ao.arrayRows&&o<=Ao.arrayCols;if(!r(s.rows,s.cols))if(s.given!=="rows"&&r(s.cols,s.rows)){const a=s.rows;s.rows=s.cols,s.cols=a,n.prompt?.vars&&(n.prompt.vars.rows=s.rows,n.prompt.vars.cols=s.cols)}else n=Ri(e,{...t,skill:n.skillId,kind:"fetch"})}else n.kind==="share"&&n.model.params.baskets>Ao.baskets&&(n=Ri(e,{...t,skill:n.skillId,kind:"fetch"}));if(n.world==="tide"&&(!n.model||n.model.kind==="none")){const s=n.meta||{},r=n.equation.includes("−")?"−":"+",a=s.a,o=s.b!==void 0?s.b:s.c!==void 0?s.c-s.a:void 0;a!==void 0&&o!==void 0&&(n.model={kind:"strip",params:{a,b:Math.abs(o),op:r}})}return n}const Jx="PAspcDdoBmVMTON tguy lfehkbj".replace(/ /g,""),ey={".":0,",":0,1:1,2:2};function ty(i,e){let t=i.slice();e.chance(.5)&&(t=t.map(d=>d.split("").reverse().join(""))),e.chance(.5)&&(t=t.slice().reverse());const n=t.map(d=>d.split("")),s=n.length,r=n[0].length,a=d=>d==="."||d===",",o=[],l=[];for(let d=1;d<s-1;d++)for(let h=1;h<r-1;h++){if(n[d][h]!==".")continue;let f=0,g=0;for(let v=-1;v<=1;v++)for(let m=-1;m<=1;m++){const p=n[d+v][h+m];p==="#"?f++:a(p)||g++}g>0||(f>0?l:o).push({x:h,z:d})}const c=[],u=(d,h,f)=>{for(const g of e.shuffle(d)){if(h<=0)break;c.every(v=>Math.abs(v.x-g.x)+Math.abs(v.z-g.z)>=3)&&(c.push(g),n[g.z][g.x]=f,h--)}};return u(l,e.int(2,4),"1"),u(o,e.int(1,3),"d"),u(o,e.int(2,5),","),n.map(d=>d.join(""))}function ny(i,e,{stones:t=4,pots:n=1}={}){const{w:s,d:r}=i.size,a=i.markers,o=[...a.A||[],...a.P||[],...a.M||[],...a.m||[],...a.B||[],...a.D||[]],l=(h,f,g,v)=>g.every(m=>Math.abs(m.x-h)+Math.abs(m.z-f)>=v),c=[];for(let h=1;h<r-1;h++)for(let f=1;f<s-1;f++){const g=i.cellAt(f,h);!g||!g.walk||g.h!==0||!".,".includes(g.ch)||l(f,h,o,2)&&c.push({x:f,z:h})}let u=t+n;const d=[];for(const h of e.shuffle(c)){if(u<=0)break;if(!l(h.x,h.z,[...d,...a.s||[],...a.p||[]],2))continue;d.push(h),u--;const f=d.length<=t?"s":"p";(a[f]=a[f]||[]).push(h),i.cellAt(h.x,h.z).ch=f}}function iy(i){const e=i.length,t=i[0].length,n=[],s={};for(let r=0;r<e;r++){n.push([]);for(let a=0;a<t;a++){const o=i[r][a]||"#";if(o==="#"){n[r].push(null);continue}const c={h:ey[o]??0,walk:!0,ch:o,alt:o===","};n[r].push(c),Jx.includes(o)&&(s[o]=s[o]||[]).push({x:a,z:r})}}return{w:t,d:e,cells:n,markers:s}}class gc{constructor(e,t="hub"){this.world=e,this.theme=t,this.group=new en,this.entities=[],this.size={w:0,d:0},this.cells=[],this.markers={},e.scene.add(this.group)}worldPos(e,t,n=0){const s=this.cellAt(e,t),r=s?s.h:0;return new D((e-this.size.w/2+.5)*Lt,r*Lu+n,(t-this.size.d/2+.5)*Lt)}cellAt(e,t){return e<0||t<0||t>=this.size.d||e>=this.size.w?null:this.cells[t]?.[e]||null}canWalk(e,t){return!e||!t?!1:Math.abs(t.h-e.h)<=1&&t.walk!==!1}center(){return new D(0,0,0)}buildFrom(e,t={}){const{w:n,d:s,cells:r,markers:a}=iy(e);return this.size={w:n,d:s},this.cells=r,this.markers=a,this._buildFloor(t),this._buildWater(),this._decorate(t),this}_floorColors(e,t,n,s){const r=yl[this.theme]||yl.hub,a=(t+n)%2===0;let o;return e.ch==="o"?o=a?Vt.soil:Vt.soilDark:r.floor==="sand"?o=a?Vt.sand:Vt.sandDark:r.floor==="soil"?o=a?Vt.soil:Vt.soilDark:o=a?Vt.grass:Vt.grassDark,e.h>0&&(o=a?Vt.stone:Vt.sandDark),e.alt&&(o=Vt.sandDark),o}_buildFloor(e){const{w:t,d:n}=this.size,s=[];for(let u=0;u<n;u++)for(let d=0;d<t;d++){const h=this.cells[u][d];!h||h.ch==="V"||s.push({x:d,z:u,c:h})}const r=new li(1,1,1),a=new js;a._owned=!0;const o=new Jc(r,a,s.length),l=new it,c=new De;s.forEach((u,d)=>{const h=u.c.h*Lu,f=h+.55;l.makeScale(Lt,f,Lt),l.setPosition((u.x-t/2+.5)*Lt,h-f/2,(u.z-n/2+.5)*Lt),o.setMatrixAt(d,l),c.setHex(this._floorColors(u.c,u.x,u.z,e)),o.setColorAt(d,c),u.c.instanceId=d}),o.receiveShadow=!0,o.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),this.floor=o,this.floorList=s,this.group.add(o),this.world.pickables=[o],o.userData.place=this,o.userData.gridList=s;for(const u of this.markers.V||[]){const d=Tt(ht.plank,.15,"prop:plank"),h=this.worldPos(u.x,u.z);d.position.set(h.x,-.06,h.z),this.group.add(d)}if((this.markers.V||[]).length){const u=this.markers.V.slice(),d=new li(1,1,1),h=new Ea({color:16777215,transparent:!0,opacity:0,depthWrite:!1});d._owned=!0,h._owned=!0;const f=new Jc(d,h,u.length);u.forEach((g,v)=>{const m=this.worldPos(g.x,g.z);l.makeScale(Lt,.16,Lt),l.setPosition(m.x,.02,m.z),f.setMatrixAt(v,l)}),f.instanceMatrix.needsUpdate=!0,f.userData.place=this,f.userData.gridList=u,this.bridgePick=f,this.group.add(f),this.world.pickables.push(f)}}tintCell(e,t,n){const s=this.cellAt(e,t);if(!s||s.instanceId===void 0||!this.floor.instanceColor)return;const r=new De(n);this.floor.setColorAt(s.instanceId,r),this.floor.instanceColor.needsUpdate=!0}resetCellTint(e,t){const n=this.cellAt(e,t);n&&this.tintCell(e,t,this._floorColors(n,e,t,{}))}_buildWater(){const{w:e,d:t}=this.size,n=Math.max(e,t)*3,s=new Rs(n,n),r=new js({color:Vt.water,transparent:!0,opacity:.92});r._owned=!0;const a=new Ut(s,r);a.rotation.x=-Math.PI/2,a.position.y=-.22,this.group.add(a),this.water=a;const o=new Ut(s,new js({color:Vt.waterDeep}));o.material._owned=!0,o.rotation.x=-Math.PI/2,o.position.y=-.55,this.group.add(o)}_decorate(e){const t=new qn(e.seed??1234),n={hub:["palm","flowerPink","flowerYellow","bush","palmSmall","flowerBlue"],tide:["shell","rockA","palmSmall","flowerBlue","rockB"],garden:["bush","flowerYellow","sprout","palmSmall","flowerPink"],stump:["rockA","bush","coconut","rockB","lantern"],vines:["flowerPink","flowerBlue","bush","lantern","flowerYellow"]}[this.theme]||["bush"];for(const s of this.markers.d||[]){const r=t.pick(n),a=ht[r];if(!a)continue;const o=Tt(a,void 0,"prop:"+r),l=.06+t.float()*.015;o.scale.setScalar(l);const c=this.worldPos(s.x,s.z);o.position.copy(c),o.rotation.y=t.float()*Math.PI*2,this.group.add(o);const u=this.cellAt(s.x,s.z);(r==="palm"||r==="rockA"||r==="rockB")&&(u.walk=!1)}}addEntity(e){return this.entities.push(e),e}update(e){for(const t of this.entities)t.update?.(e);this.water&&(this.water.position.y=-.22+Math.sin(performance.now()/900)*.02)}dispose(){this.world.scene.remove(this.group),this.group.traverse(e=>{e.isInstancedMesh&&e.dispose(),e.geometry&&!e.geometry._cached&&e.geometry.dispose?.(),e.material?._owned&&(e.material.map?.dispose?.(),e.material.dispose?.())}),this.world.pickables=[]}}const Nl={fetch:[["##############","#,.d......d.,#","#..s......s..#","#..........M.#","#.s....A...s.#","#............#","#...c........#","#.p........p.#","#..s......s..#","#......P.....#","#.d........d.#","##############"],["#############","##,.d...d.,##","#.s.......s.#","#...11111...#","#.s.1...1.s.#","#.....A..M..#","#.....c.....#","#,p.......p,#","#.s..P....s.#","##.d.....d.##","#############"],["################","#,.d.......s..,#","#..p...A...p...#","#.s..........s.#","#....c.....c...#","#..........M...#","#.s..........s.#","#......P....s..#","#.,d........d,.#","################"]],array:[["##################","#,.d..........d.,#","#..oooooooooo..s.#","#..oooooooooo....#","#..oooooooooo..A.#","#..oooooooooo....#","#..oooooooooo..s.#","#..oooooooooo....#","#..oooooooooo..M.#","#..oooooooooo..s.#","#..s....P........#","#.d............d.#","##################"],["##################","#,.d...........d,#","#..s...........s.#","#...oooooooooo...#","#...oooooooooo.A.#","#...oooooooooo...#","#...oooooooooo.M.#","#...oooooooooo...#","#...oooooooooo.s.#","#...oooooooooo...#","#...oooooooooo...#","#.s.....P......d.#","##################"]],numberline:[["##########################","#,d....................d,#","#..M..s............s..A,.#","#.,VVVVVVVVVVVVVVVVVVVVV.#","#......................,.#","#..P..s............s...d.#","##########################"],["########################","#,d..................d,#","#...s..........s....M..#","#..VVVVVVVVVVVVVVVVVV..#","#....,.............,...#","#..P....s........s...A.#","########################"]],share:[["###############","#,.d.......d.,#","#..B...B...B..#","#.s....M....s.#","#......m......#","#....c....A...#","#..B...B...B..#","#.s...P....s..#","#.,d.......d,.#","###############"],["###############","#,.d..M....d.,#","#..B..B..B....#","#.s........s..#","#....m....A...#","#.s........s..#","#..B..B..B....#","#....P.....c..#","#.,d.......d,.#","###############"]],hub:[["################################","###,.....dd......d.,############","##..t...........g..f.###########","#..........d..........##########","#.d.....1111111......d.#########","#.......1,,,,,1........#########","#.h.d...1,,T,,1...N....#########","#.......1,,,,,1........###....##","#.......1111111.l..d...##......#","#..d.........M........bwww..j..#","#......................##......#","#...O.......P......d...###....##","#.................e....#########","#.d..k..d....,,....d...#########","##..u...........y....###########","###,....dd.....d..,#############","################################"]]},sy={t:"tide",g:"garden",u:"stump",y:"vines"};class td extends gc{constructor(e,t,n={},s={}){super(e,"hub"),this.island={built:[],unlocked:[],crabKing:!1,festival:!1,...n},this.buildFrom(Cv(Nl.hub[0],this.island.built),{seed:777}),this.portals={},this.gates={};for(const[c,u]of Object.entries(sy)){const d=(this.markers[c]||[])[0];if(!d)continue;const h=yl[u],f=this.island.festival?1:Math.min(1,t?.[u]??0),g=this.island.festival?4:Math.min(4,Math.max(0,s[u]??0));this.gates[u]=new jx(this,d,{worldId:u,label:`${h.emoji} ${w("world."+u)}`,accent:h.accent,bloom:h.bloom,pct:f,stage:g}),this.portals[u]=d}const r=(this.markers.T||[])[0];r&&(this.tree=Tt(ht.palm,2.6,"prop:bigpalm"),this.tree.position.copy(this.worldPos(r.x,r.z)),this.group.add(this.tree),this.cellAt(r.x,r.z).walk=!1);const a=(this.markers.O||[])[0];if(a){const c=Tt(ht.sign,.85,"prop:sign");c.position.copy(this.worldPos(a.x,a.z)),this.group.add(c)}const o=(this.markers.N||[])[0];if(o){const c=Tt(ht.egg,.6,"prop:egg");c.position.copy(this.worldPos(o.x,o.z)),this.group.add(c)}const l=(this.markers.M||[])[0];l&&(this.mimi=Wn(va.mimi,.8,null,"char:mimi"),this.mimi.position.copy(this.worldPos(l.x,l.z)),this.group.add(this.mimi),this.cellAt(l.x,l.z).walk=!1,this.mimiHome={x:l.x,z:l.z},this.mimiPos={x:l.x,z:l.z},this.mimiPrev={x:l.x,z:l.z},this.playerAt=null,this.mimiTag=gt(this.island.unlocked.length?"📜":"💬",{bg:"#fff8ecdd",scale:.55,fontSize:44}),this.group.add(this.mimiTag),this._mimiWander()),this.buildSpots={},this.npcs=[],this._placeBuilds(),this.island.crabKing&&this._placeCrabKing(),this.applyBloom(t);for(const c of[this.mimi,this.mimiTag,...this.npcs.map(u=>u.mesh)])c&&this.world.pickables.push(c)}_bob(e,t=2,n=.04){const s=e.position.y,r={t:Math.random()*6,update:a=>{r.t+=a/1e3,e.position.y=s+Math.abs(Math.sin(r.t*t))*n}};this.addEntity(r)}_mimiWander(){const e=this.mimi,t={t:Math.random()*6,wait:1800+Math.random()*2600,hop:null};this.addEntity({update:n=>{if(t.t+=n/1e3,this.mimiTag.position.set(e.position.x,e.position.y+1.3+Math.sin(t.t*2)*.05,e.position.z),t.hop){t.hop.k+=n/280;const o=Math.min(1,t.hop.k);e.position.lerpVectors(t.hop.from,t.hop.to,o),e.position.y+=Math.sin(o*Math.PI)*.3,o>=1&&(t.hop=null);return}const s=this.worldPos(this.mimiPos.x,this.mimiPos.z);e.position.y=s.y+Math.abs(Math.sin(t.t*2))*.04;const r=this.playerAt?.();if(r&&Math.abs(r.x-this.mimiPos.x)+Math.abs(r.z-this.mimiPos.z)<=2){const o=Math.atan2(r.x-this.mimiPos.x,r.z-this.mimiPos.z);e.rotation.y+=(o-e.rotation.y)*Math.min(1,n/160)}if(t.wait-=n,t.wait>0)return;t.wait=2200+Math.random()*3800;const a=[[1,0],[-1,0],[0,1],[0,-1]].sort(()=>Math.random()-.5);for(const[o,l]of a){const c=this.mimiPos.x+o,u=this.mimiPos.z+l;if(Math.abs(c-this.mimiHome.x)+Math.abs(u-this.mimiHome.z)>2)continue;const d=this.cellAt(c,u);if(!(!d||!d.walk||d.h!==0||!".,M".includes(d.ch))&&!(r&&r.x===c&&r.z===u)){this.cellAt(this.mimiPos.x,this.mimiPos.z).walk=!0,d.walk=!1,this.mimiPrev={...this.mimiPos},this.mimiPos={x:c,z:u},e.rotation.y=Math.atan2(o,l),t.hop={from:e.position.clone(),to:this.worldPos(c,u),k:0};break}}}})}_prop(e,t,n,s,r=0,a=0,o=0){const l=Tt(ht[e],t,"prop:"+e),c=this.worldPos(n,s,o);return l.position.set(c.x+r*Lt,c.y,c.z+a*Lt),this.group.add(l),l}_placeBuilds(){for(const e of Ps){const t=(this.markers[e.char]||[])[0];if(!t)continue;const n=this.island.built.includes(e.id)?"built":this.island.unlocked.includes(e.id)?"unlocked":"locked";this.buildSpots[e.id]={x:t.x,z:t.z,state:n},n==="built"?this._placeBuilt(e,t):n==="unlocked"&&this._placePlotSign(e,t)}}_placePlotSign(e,t){this._prop("sign",.8,t.x,t.z);const n=gt(`🔨 ${e.emoji}`,{bg:"#fff8ecdd",scale:.7,fontSize:44});n.position.copy(this.worldPos(t.x,t.z,1.45)),this.group.add(n),this.cellAt(t.x,t.z).walk=!1}_placeBuilt(e,t){const{x:n,z:s}=t,r=(a,o)=>{const l=this.cellAt(a,o);l&&(l.walk=!1)};if(e.id==="lanterns")for(const a of[-1,0,1])this.cellAt(n+a,s)&&(this._prop("lantern",.55,n+a,s),r(n+a,s));else if(e.id==="fruitstand")this._prop("stall",1.15,n,s),this._prop("basket",.3,n,s,.62,.45),r(n,s);else if(e.id==="garden")this._prop("flowerPink",.34,n,s),this._prop("flowerYellow",.32,n,s,.55,.3),this._prop("flowerBlue",.32,n,s,-.5,.32),this._prop("bush",.42,n,s,.12,-.5),this._prop("sprout",.3,n,s,-.45,-.35),this._prop("flowerPink",.3,n,s,.5,-.28),r(n,s);else if(e.id==="stage")this._prop("gong",1,n,s),this._prop("lantern",.5,n,s,.85,.2),this._prop("lantern",.5,n,s,-.85,.2),r(n,s);else if(e.id==="bakery")this._prop("oven",1,n,s),this._prop("basket",.3,n,s,.7,.35),r(n,s);else if(e.id==="plaza"){this._prop("portal",1.7,n,s),this._prop("lantern",.5,n,s,1,.4),this._prop("lantern",.5,n,s,-1,.4),this._prop("flowerYellow",.3,n,s,.9,-.5),this._prop("flowerPink",.3,n,s,-.9,-.5);const a=gt("🎪",{scale:.8});a.position.copy(this.worldPos(n,s,2.3)),this.group.add(a),r(n,s)}e.npc&&this._placeNpc(e,t)}_placeNpc(e,t){const n=ki.find(a=>a.id===e.npc.pet);if(!n)return;let s=null;for(const[a,o]of[[0,1],[1,0],[-1,0],[0,-1]]){const l=this.cellAt(t.x+a,t.z+o);if(l&&l.walk&&".,".includes(l.ch)){s={x:t.x+a,z:t.z+o};break}}if(!s)return;const r=Wn(n.model,.6,null,"npc:"+e.npc.pet);r.position.copy(this.worldPos(s.x,s.z)),this.group.add(r),this.cellAt(s.x,s.z).walk=!1,this._bob(r),this.npcs.push({id:e.id,face:e.npc.face,x:s.x,z:s.z,mesh:r})}_placeCrabKing(){const e=(this.markers.j||[])[0];if(!e)return;const t=this.cellAt(e.x-1,e.z);if(!t||!t.walk)return;const n=Wn(va.crabKing,.95,null,"char:crabKing");n.position.copy(this.worldPos(e.x-1,e.z)),this.group.add(n),t.walk=!1,this._bob(n,1.4,.03),this.npcs.push({id:"crabking",face:"🦀",x:e.x-1,z:e.z,mesh:n})}applyBloom(e){const t=new De(Vt.gray),n=new De;for(const s of this.floorList){let r=null,a=1e9;for(const[l,c]of Object.entries(this.portals)){const u=Math.abs(s.x-c.x)+Math.abs(s.z-c.z);u<a&&(a=u,r=l)}if(r===null||a>7)continue;const o=this.island.festival?1:Math.min(1,(e?.[r]??0)*1.15);n.setHex(this._floorColors(s.c,s.x,s.z,{})),n.lerpColors(t,n,.25+.75*o),this.floor.setColorAt(s.c.instanceId,n)}this.floor.instanceColor&&(this.floor.instanceColor.needsUpdate=!0)}}const dh={sy:1,sxz:1};class nd{constructor(e){this.mesh=e,this.x=0,this.z=0,this.place=null,this.hopping=!1,this.queue=[],this.carrying=null,this.carryData=null,this.facing=0,this.idleT=Math.random()*10,this.locked=!1,this.onArrive=null,this.onBump=null,this.sfx=!0,this.headH=1,this.baseScale=e.scale.x||1}setPlace(e,t,n){this.place=e,this.x=t,this.z=n,this.queue.length=0,this.hopping=!1;const s=e.worldPos(t,n);this.mesh.position.copy(s),e.group.add(this.mesh)}get cell(){return this.place?.cellAt(this.x,this.z)}face(e,t){e===0&&t===0||(this.facing=Math.atan2(e,t))}tryStep(e,t){return this.locked?!1:this.hopping?(this.queue.length<2&&this.queue.push({dx:e,dz:t}),!0):this._step(e,t)}_step(e,t){const n=this.x+e,s=this.z+t,r=this.place.cellAt(this.x,this.z),a=this.place.cellAt(n,s);if(this.face(e,t),!a||!a.walk||!this.place.canWalk(r,a)){this.hopping=!0;const u=this.mesh,d=u.position.x,h=u.position.z;return dt({ms:140,ease:vt.outQuad,onUpdate:(f,g)=>{const v=Math.sin(g*Math.PI)*.18;u.position.x=d+e*v,u.position.z=h+t*v},onDone:()=>{this.hopping=!1,this._next()}}),this.onBump?.(n,s),!1}this.hopping=!0;const o=this.mesh,l=o.position.clone(),c=this.place.worldPos(n,s);return this.sfx&&K.sfx("hop"),dt({ms:zd,ease:vt.linear,onUpdate:(u,d)=>{o.position.x=l.x+(c.x-l.x)*d,o.position.z=l.z+(c.z-l.z)*d,o.position.y=l.y+(c.y-l.y)*d+Math.sin(d*Math.PI)*Gd;const h=Di()?dh:ch(d);o.scale.set(this.baseScale*h.sxz,this.baseScale*h.sy,this.baseScale*h.sxz),o.rotation.y+=(this.facing-o.rotation.y)*.35},onDone:()=>{o.position.copy(c),o.scale.setScalar(this.baseScale),this.x=n,this.z=s,this.hopping=!1,this.onArrive?.(n,s),this._next()}}),!0}_next(){if(this.locked){this.queue.length=0;return}const e=this.queue.shift();if(e)if(e.dx!==void 0)this._step(e.dx,e.dz);else{const t=Math.sign(e.x-this.x),n=Math.sign(e.z-this.z);(t||n)&&this._step(t,n)}}pathTo(e,t){if(this.locked||!this.place)return;const{w:n,d:s}=this.place.size,r=(h,f)=>h>=0&&f>=0&&h<n&&f<s,a=(h,f)=>f*n+h,o=new Int32Array(n*s).fill(-2),l=[[this.x,this.z]];o[a(this.x,this.z)]=-1;let c=!1;for(;l.length&&!c;){const[h,f]=l.shift(),g=this.place.cellAt(h,f);for(const[v,m]of[[1,0],[-1,0],[0,1],[0,-1]]){const p=h+v,T=f+m;if(!r(p,T)||o[a(p,T)]!==-2)continue;const E=this.place.cellAt(p,T);if(!E||!E.walk||!this.place.canWalk(g,E)){o[a(p,T)]=-3;continue}if(o[a(p,T)]=a(h,f),p===e&&T===t){c=!0;break}l.push([p,T])}}if(!c)return!1;const u=[];let d=a(e,t);for(;d!==-1&&o[d]!==-1;)u.unshift({x:d%n,z:Math.floor(d/n)}),d=o[d];return this.queue=u.map(h=>({x:h.x,z:h.z})),this.hopping||this._next(),!0}stop(){this.queue.length=0}carry(e,t){this.carrying=e,this.carryData=t,this.mesh.add(e),e.position.set(0,this.headH+.18,0),e.rotation.set(0,0,0)}dropCarry(){const e=this.carrying;e&&this.mesh.remove(e),this.carrying=null;const t=this.carryData;return this.carryData=null,{mesh:e,data:t}}update(e){this.idleT+=e/1e3;const t=this.mesh;if(!this.hopping){const n=1+Math.sin(this.idleT*3.1)*.015;t.scale.set(this.baseScale,this.baseScale*n,this.baseScale),t.rotation.y+=(this.facing-t.rotation.y)*Math.min(1,e/90)}this.carrying&&(this.carrying.position.y=this.headH+.18+Math.sin(this.idleT*4)*.035,this.carrying.rotation.y+=e*.001)}}class id{constructor(e){this.mesh=e,this.trail=[],this.x=0,this.z=0,this.hopping=!1,this.place=null,this.idleT=Math.random()*10,this.baseScale=e.scale.x||1,this.happy=0}setPlace(e,t,n){this.place=e,this.x=t,this.z=n,this.trail.length=0,this.mesh.position.copy(e.worldPos(t,n)),e.group.add(this.mesh)}notePlayerAt(e,t){const n=this.trail[this.trail.length-1];n&&n.x===e&&n.z===t||(this.trail.push({x:e,z:t}),this.trail.length>6&&this.trail.shift())}celebrate(){this.happy=1}update(e){this.idleT+=e/1e3;const t=this.mesh;if(this.happy>0&&(this.happy-=e/600,t.rotation.x=(1-Math.max(0,this.happy))*Math.PI*2,this.happy<=0&&(t.rotation.x=0)),!this.hopping&&this.trail.length>2&&this.place){const n=this.trail.shift(),s=n.x-this.x,r=n.z-this.z;if(s||r){this.hopping=!0;const a=t.position.clone(),o=this.place.worldPos(n.x,n.z),l=Math.atan2(s,r);dt({ms:zd*1.05,ease:vt.linear,onUpdate:(c,u)=>{t.position.lerpVectors(a,o,u),t.position.y=a.y+(o.y-a.y)*u+Math.sin(u*Math.PI)*Gd*.7,t.rotation.y+=(l-t.rotation.y)*.3;const d=Di()?dh:ch(u);t.scale.set(this.baseScale*d.sxz,this.baseScale*d.sy,this.baseScale*d.sxz)},onDone:()=>{t.position.copy(o),t.scale.setScalar(this.baseScale),this.x=n.x,this.z=n.z,this.hopping=!1}})}}else this.hopping||t.scale.set(this.baseScale,this.baseScale*(1+Math.sin(this.idleT*4.2)*.03),this.baseScale)}}class ry{constructor(e){this.place=e,this.painted=[],this.labels=[],this.pending=[]}_later(e,t){this.pending.push(Et(e,t))}clear(){for(const e of this.pending)e.cancel();this.pending=[];for(const e of this.painted)this.place.resetCellTint(e.x,e.z);for(const e of this.labels)this.place.group.remove(e);this.painted=[],this.labels=[]}_free(e,t){const n=this.place.cellAt(e,t);return n&&n.walk&&n.h===0&&!"AsPpcDmMBVoTON".includes(n.ch)}_findRect(e,t){const{w:n,d:s}=this.place.size,r=Math.floor(n/2),a=Math.floor(s/2);for(let o=0;o<Math.max(n,s);o++)for(let l=Math.max(1,a-o);l<=Math.min(s-t-1,a+o);l++)for(let c=Math.max(1,r-o);c<=Math.min(n-e-1,r+o);c++){let u=!0;for(let d=l;d<l+t&&u;d++)for(let h=c;h<c+e&&u;h++)this._free(h,d)||(u=!1);if(u)return{x0:c,z0:l}}return null}addLabel(e,t,n,s="#2c6e49",r=.55){const a=gt(n,{bg:"#ffffffee",color:s,scale:.55}),o=this.place.worldPos(e,t,r);a.position.copy(o),this.place.group.add(a),this.labels.push(a)}show(e,{skipCounts:t=!0}={}){if(this.clear(),!e||e.kind==="none")return!1;if(e.kind==="array"){let{rows:n,cols:s}=e.params,r=this._findRect(s,n);if(!r){if(r=this._findRect(n,s),!r)return!1;const o=n;n=s,s=o}let a=0;for(let o=0;o<n;o++){for(let l=0;l<s;l++){const c=r.x0+l,u=r.z0+o;this.painted.push({x:c,z:u}),this._later(a*28,()=>{this.place.tintCell(c,u,o%2?11464882:9429914),l===s-1&&K.sfx("plant",{pitch:1+o*.06})}),a++}if(t){const l=(o+1)*s;this._later(o*s*28+150,()=>this.addLabel(r.x0+s,r.z0+o,String(l)))}}return!0}if(e.kind==="baskets"){const{total:n,baskets:s,quotient:r,remainder:a}=e.params,o=this._findRect(s*2-1,2);if(!o)return!1;for(let l=0;l<s;l++){const c=o.x0+l*2,u=o.z0;this.painted.push({x:c,z:u}),this._later(l*90,()=>{this.place.tintCell(c,u,16242848),this.addLabel(c,u,String(r),"#b06a2c"),K.sfx("coin",{pitch:1+l*.05})})}if(a>0){const l=o.x0+Math.floor(s),c=o.z0+1;this.painted.push({x:l,z:c}),this._later(s*90+120,()=>{this.place.tintCell(l,c,16234703),this.addLabel(l,c,"+"+a,"#c2497a")})}return!0}if(e.kind==="numberline"){const{n:s,d:r}=e.params,a=this._findRect(11,1);if(!a)return!1;for(let l=0;l<11;l++){const c=a.x0+l,u=a.z0;this.painted.push({x:c,z:u}),this._later(l*35,()=>this.place.tintCell(c,u,13625087))}this.addLabel(a.x0,a.z0,"0","#4a6a8a"),this.addLabel(a.x0+11-1,a.z0,"1","#4a6a8a");const o=a.x0+Math.round(s/r*10);return this._later(535,()=>{this.place.tintCell(o,a.z0,16767334),this.addLabel(o,a.z0,`${s}/${r}`,"#b06a2c",.8),K.sfx("sparkle")}),!0}if(e.kind==="strip"){const{a:n,b:s,op:r}=e.params,a=this._findRect(Math.min(n,12),2);if(!a)return!1;const o=(l,c,u,d=0)=>{for(let h=0;h<l&&h+d<12;h++){const f=a.x0+d+h;this.painted.push({x:f,z:c}),this._later(h*30,()=>this.place.tintCell(f,c,u))}};return o(Math.min(n,12),a.z0,10213119),this.addLabel(a.x0,(a.z0-1>=0,a.z0),String(n),"#4a6a8a"),r==="+"?(o(Math.min(s,12),a.z0+1,11464882),this.addLabel(a.x0,a.z0+1,"+"+s,"#2c6e49")):(o(Math.min(s,12),a.z0+1,16761523),this.addLabel(a.x0,a.z0+1,"−"+s,"#c2497a")),!0}return!1}}class Da{constructor(e){this.ctx=e,this.model=new ry(e.place),this.done=!1}begin(){}onCellTap(){return!1}onArrive(){}onBump(){}onAction(){}onKey(){return!1}showModel(){return this.model.show(this.ctx.problem.model)}update(){}destroy(){this.model.clear()}}class ay extends Da{begin(){const{place:e,problem:t,rng:n}=this.ctx;this.stones=[],this.pots=[];const s=n.shuffle(e.markers.s||[]),r=n.shuffle(e.markers.p||[]),a=[...s.map(u=>({...u,pot:!1})),...r.map(u=>({...u,pot:!0}))],o=n.shuffle(t.choices),l=o.findIndex(u=>u.tag==="correct");o.unshift(o.splice(l,1)[0]);const c=o.slice(0,a.length);c.forEach((u,d)=>{const h=a[d];h.pot?this.pots.push(new Ju(e,h.x,h.z,{kind:"stone",choice:u})):this.stones.push(new Vs(e,h.x,h.z,u))});for(let u=c.length;u<a.length;u++){const d=a[u];if(!d.pot)continue;const h=n.chance(.4)?{kind:"berry"}:{kind:"bananas",n:n.int(1,3)};this.pots.push(new Ju(e,d.x,d.z,h))}this.ctx.hud.setAction(null)}_stoneAt(e,t){return this.stones.find(n=>!n.taken&&n.x===e&&n.z===t)}_potAt(e,t){return this.pots.find(n=>!n.smashed&&n.x===e&&n.z===t)}onArrive(e,t){const{player:n,place:s,particles:r}=this.ctx,a=this._potAt(e,t);if(a){this.pendingDeliver=null;const l=a.smash(r);l?.kind==="stone"?this.stones.push(new Vs(s,e,t,l.choice)):l?.kind==="bananas"?this.ctx.onTreat?.("bananas",l.n,s.worldPos(e,t,.4)):l?.kind==="berry"&&this.ctx.onTreat?.("berry",1,s.worldPos(e,t,.4));return}const o=this._stoneAt(e,t);if(o){this.pendingDeliver=null,K.sfx("pick");const l=o.pickUpMesh();if(n.carrying){const{mesh:c,data:u}=n.dropCarry();c.removeFromParent(),this.stones.push(new Vs(s,e,t,u))}n.carry(l,o.choice),this.ctx.onCarry?.(!0),this.ctx.hud.setAction("⬇️");return}if(this.pendingDeliver&&n.queue.length===0){const l=this.pendingDeliver;this.pendingDeliver=null;const c=(s.markers.A||[])[0];c&&l.x===e&&l.z===t&&n.carrying&&this._offer(c)}}onBump(e,t){const{player:n,place:s,particles:r}=this.ctx,a=(s.markers.A||[])[0];if(!a||e!==a.x||t!==a.z)return;if(n.carrying){this._offer(a);return}if(this.done||this.fxStone)return;const o=performance.now();o<(this.nudgeT||0)||(this.nudgeT=o+2600,r.emit(s.worldPos(a.x,a.z,1),8,{colors:[16767334,16774079],speed:.6,up:.6,life:600,spread:.25}),this.ctx.hud.say(w("play.altar_wants"),{transient:!0,ms:2400,face:"✨"}))}onAction(){const{player:e,place:t}=this.ctx;if(!e.carrying)return;const{x:n,z:s}=e;if(this._stoneAt(n,s)||this._potAt(n,s))return;this.pendingDeliver=null,K.sfx("place");const{mesh:r,data:a}=e.dropCarry();r.removeFromParent(),this.stones.push(new Vs(t,n,s,a)),this.ctx.onCarry?.(!1),this.ctx.hud.setAction(null)}onCellTap(e,t){const{player:n,place:s}=this.ctx,r=(s.markers.A||[])[0];if(!r||e!==r.x||t!==r.z)return!1;if(!n.carrying)return this.onBump(e,t),!0;if(Math.abs(n.x-r.x)+Math.abs(n.z-r.z)===1)return this._offer(r),!0;const a=[[0,1],[1,0],[-1,0],[0,-1]].map(([o,l])=>({x:r.x+o,z:r.z+l})).filter(o=>s.cellAt(o.x,o.z)?.walk).sort((o,l)=>Math.abs(o.x-n.x)+Math.abs(o.z-n.z)-(Math.abs(l.x-n.x)+Math.abs(l.z-n.z)));for(const o of a)if(n.pathTo(o.x,o.z))return this.pendingDeliver=o,!0;return!0}_offer(e){const{player:t}=this.ctx;t.face(e.x-t.x,e.z-t.z);const{mesh:n,data:s}=t.dropCarry();this.ctx.onCarry?.(!1),this.ctx.hud.setAction(null),this._deliver(n,s,e)}_deliver(e,t,n){if(this.done)return;const{place:s,player:r}=this.ctx;e.position.copy(r.mesh.position).add(new D(0,r.headH+.18,0)),s.group.add(e),this.fxStone=e;const a=e.position.clone(),o=s.worldPos(n.x,n.z,.92);dt({ms:360,ease:vt.linear,onUpdate:(l,c)=>{e.position.lerpVectors(a,o,c),e.position.y+=Math.sin(c*Math.PI)*.55},onDone:()=>{K.sfx("place"),this.dead||this._evaluate(t,e,n)}})}_freeNeighbor(e){const{place:t,player:n}=this.ctx;for(const[s,r]of[[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]){const a=e.x+s,o=e.z+r,l=t.cellAt(a,o);if(!(!l||!l.walk)&&!(this._stoneAt(a,o)||this._potAt(a,o))&&!(n.x===a&&n.z===o))return{x:a,z:o}}return null}_evaluate(e,t,n){if(this.done)return;const{problem:s,place:r}=this.ctx,a=r.worldPos(n.x,n.z,.92);String(e.value)===String(s.answer)?(this.done=!0,this.ctx.resolve(!0,{tag:"correct",value:e.value}),this._starBurst(t,a)):(this.ctx.resolve(!1,{tag:e.tag,value:e.value}),this._handBack(t,e,n,a))}_starBurst(e,t){const{place:n,particles:s}=this.ctx;this.ctx.altar?.cheer(),s.confetti(t.clone().add(new D(0,.3,0)),34),dt({ms:420,delay:140,ease:vt.inQuad,onUpdate:(c,u)=>{e.scale.setScalar(Math.max(.001,1-u)),e.position.y=t.y-u*.3},onDone:()=>{e.removeFromParent(),this.fxStone=null}});const r=gt("⭐",{scale:1.5});r.position.copy(t),n.group.add(r),this.fxStar=r;const a=r.scale.clone();r.scale.copy(a).multiplyScalar(.3),K.sfx("bloom");const o=(Math.random()-.5)*.5;let l=-1;dt({ms:950,ease:vt.outQuad,onUpdate:(c,u)=>{r.position.y=t.y+.15+u*1.7,r.position.x=t.x+Math.sin(u*Math.PI*2)*.12+o*u,r.material.rotation=Math.sin(u*Math.PI*3)*.45,r.scale.copy(a).multiplyScalar(.3+Math.min(1,u*2.5)*.7);const d=u*8|0;d!==l&&(l=d,s.emit(r.position.clone(),2,{colors:[16767334,16774079],speed:.4,up:.2,life:480,spread:.12}))},onDone:()=>{s.confetti(r.position.clone(),26),K.sfx("sparkle"),dt({ms:280,ease:vt.outQuad,onUpdate:(c,u)=>{r.scale.copy(a).multiplyScalar(1+u*.9),r.material.opacity=1-u},onDone:()=>{r.removeFromParent(),this.fxStar=null}})}})}_handBack(e,t,n,s){const{place:r,particles:a}=this.ctx;this.ctx.altar?.shake(),a.poof(s.clone().add(new D(0,.35,0)),10,14273976);const o=gt("🤔",{scale:.8});o.position.copy(s).add(new D(0,.85,0)),r.group.add(o),this.fxThink=o,dt({ms:1150,ease:vt.outQuad,onUpdate:(d,h)=>{o.position.y=s.y+.85+h*.5,o.material.opacity=h<.6?1:1-(h-.6)/.4},onDone:()=>{o.removeFromParent(),this.fxThink=null}});const l=this._freeNeighbor(n);if(!l){a.poof(s,18,13617339),e.removeFromParent(),this.fxStone=null;return}const c=e.position.clone(),u=r.worldPos(l.x,l.z);dt({ms:460,delay:430,ease:vt.linear,onUpdate:(d,h)=>{e.position.lerpVectors(c,u,h),e.position.y+=Math.sin(h*Math.PI)*.7},onDone:()=>{K.sfx("drop"),e.removeFromParent(),this.fxStone=null,this.dead||this.stones.push(new Vs(r,l.x,l.z,t,{tried:!0}))}})}update(e){for(const t of this.stones)t.update(e)}destroy(){this.dead=!0,super.destroy();for(const t of this.stones)t.taken||t.remove();for(const t of[this.fxStone,this.fxStar,this.fxThink])t?.removeFromParent();const{player:e}=this.ctx;if(e.carrying){const{mesh:t}=e.dropCarry();t?.removeFromParent()}}}class oy extends Da{begin(){const{place:e,hud:t}=this.ctx,n=e.markers.o||[];this.minX=Math.min(...n.map(s=>s.x)),this.minZ=Math.min(...n.map(s=>s.z)),this.maxX=Math.max(...n.map(s=>s.x)),this.maxZ=Math.max(...n.map(s=>s.z)),this.anchor=null,this.flag=null,this.sprouts=[],this.pending=[],this._paint(),t.setAction("🌱"),t.setVerbPanel(this._panel())}_later(e,t){this.pending.push(Et(e,t))}_onBed(e,t){return e>=this.minX&&e<=this.maxX&&t>=this.minZ&&t<=this.maxZ}_clamp(e,t){return{x:Math.max(this.minX,Math.min(this.maxX,e)),z:Math.max(this.minZ,Math.min(this.maxZ,t))}}_rect(){const{player:e}=this.ctx;if(!this.anchor)return this._onBed(e.x,e.z)?{x0:e.x,z0:e.z,x1:e.x,z1:e.z}:null;const t=this._clamp(e.x,e.z);return{x0:Math.min(this.anchor.x,t.x),x1:Math.max(this.anchor.x,t.x),z0:Math.min(this.anchor.z,t.z),z1:Math.max(this.anchor.z,t.z)}}_panel(){const{player:e}=this.ctx,t=this._rect(),n=t?t.z1-t.z0+1:0,s=t?t.x1-t.x0+1:0;return{kind:"array",rows:n,cols:s,count:n*s,anchored:!!this.anchor,offBed:!this._onBed(e.x,e.z)}}_paint(){const{place:e}=this.ctx,t=this._rect();for(let n=this.minZ;n<=this.maxZ;n++)for(let s=this.minX;s<=this.maxX;s++){const r=t&&s>=t.x0&&s<=t.x1&&n>=t.z0&&n<=t.z1;e.tintCell(s,n,r?(n-t.z0)%2?11464882:9429914:(s+n)%2?12159582:10581582)}this.ctx.hud.setVerbPanel(this._panel())}showModel(){return!0}onArrive(e,t){const n=this._panel();this.anchor&&(n.rows!==this._lastR||n.cols!==this._lastC)&&K.sfx("click",{pitch:1+(n.rows+n.cols)*.03}),this._lastR=n.rows,this._lastC=n.cols,this._paint()}onAction(){if(this.done)return;const{player:e,place:t,problem:n,particles:s}=this.ctx;if(!this.anchor){if(!this._onBed(e.x,e.z)){K.sfx("boop"),this.ctx.hud.toast("🌱 "+w("verb.array_need_soil"));return}this.anchor={x:e.x,z:e.z},this.flag=Tt(ht.flowerYellow,.42,"prop:flowerYellow"),this.flag.position.copy(t.worldPos(this.anchor.x,this.anchor.z,.04)),t.group.add(this.flag),K.sfx("plant"),this._paint();return}if(e.x===this.anchor.x&&e.z===this.anchor.z){t.group.remove(this.flag),this.flag=null,this.anchor=null,K.sfx("swoosh"),this.ctx.hud.toast("🚩 "+w("verb.array_unplant")),this._paint();return}const{rows:r,cols:a,total:o,given:l}=n.model.params,c=this._rect(),u=c.z1-c.z0+1,d=c.x1-c.x0+1,h=u*d;let f=!1;if(l==="both"?f=u===r&&d===a||u===a&&d===r:l==="rows"?f=u===r&&h===o:f=h===o&&u>1&&d>1,f){this.done=!0;let g=0;for(let v=0;v<u;v++){for(let p=0;p<d;p++){const T=t.worldPos(c.x0+p,c.z0+v,.06);this._later(g*36,()=>{const E=Tt(ht.sprout,.3,"prop:sprout",{castShadow:!1});E.position.copy(T),E.scale.multiplyScalar(.001),t.group.add(E),this.sprouts.push(E);const S=E.scale.x*1e3;this.pending.push(dt({ms:240,ease:vt.outBack,onUpdate:(P,R)=>E.scale.setScalar(Math.max(.001,S*R))})),K.sfx("plant",{pitch:.9+(v*d+p)*.012})}),g++}const m=(v+1)*d;this._later(v*d*36+200,()=>Bl(this.ctx.world,t.worldPos(c.x0+d,c.z0+v,.3),String(m)))}this._later(u*d*36+450,()=>{s.confetti(t.worldPos(c.x0+Math.floor(d/2),c.z0+Math.floor(u/2),.6),40),this.ctx.resolve(!0,{tag:"correct",value:h})})}else{const g=h===o?"shape":h<o?"too_few":"too_many";this.ctx.resolve(!1,{tag:"near_miss",value:h,arrayInfo:{tag:g,r:u,c:d,n:h}})}}destroy(){super.destroy();const{place:e}=this.ctx;for(const t of this.pending)t.cancel();this.pending=[];for(let t=this.minZ;t<=this.maxZ;t++)for(let n=this.minX;n<=this.maxX;n++)e.resetCellTint(n,t);this.flag&&e.group.remove(this.flag);for(const t of this.sprouts)e.group.remove(t);this.ctx.hud.setVerbPanel(null),this.ctx.hud.setAction(null)}}class ly extends Da{begin(){const{place:e,problem:t,hud:n}=this.ctx;this.tiles=(e.markers.V||[]).slice().sort((c,u)=>c.x-u.x),this.n=this.tiles.length;const{lo:s=0,hi:r=1,d:a=4}=t.model.params;this.lo=s,this.hi=r,this.d=a,this.ticks=[],this.knot=null,this.readyMark=null,this.readyKey=null,this.readyPulseAt=0;const o=this.tiles[0],l=this.tiles[this.n-1];this.endA=gt(String(s),{bg:"#fff8ec",scale:.8}),this.endA.position.copy(e.worldPos(o.x,o.z,.9)),this.endB=gt(String(r),{bg:"#fff8ec",scale:.8}),this.endB.position.copy(e.worldPos(l.x,l.z,.9)),e.group.add(this.endA,this.endB),this._showTicks(t.scaffold??1),n.setAction("🔔")}_showTicks(e){const{place:t}=this.ctx;for(const o of this.ticks)t.group.remove(o);this.ticks=[],this.level=e;const n=this.hi-this.lo,s=Math.round(this.d*n),r=(o,l,c)=>{const u=Math.round((o-this.lo)/n*(this.n-1)),d=this.tiles[u],h=gt("▲",{color:l?"#e8a23d":"#7c4fd0",scale:l?1:.95});if(h.position.copy(t.worldPos(d.x,d.z,.34)),t.group.add(h),this.ticks.push(h),c){const f=gt(c,{bg:l?"#ffd966dd":"#ffffffe0",color:"#6a4a8a",scale:.68});f.position.copy(t.worldPos(d.x,d.z,l?.92:.82)),t.group.add(f),this.ticks.push(f)}};let a=!1;for(let o=1;o<s;o++){const l=this.lo+o/this.d,c=Number.isInteger(l),u=!c&&Number.isInteger(l*2);if(u&&(a=!0),e>=2&&!(c||u))continue;let d=null;e===0?d=c?String(l):`${Math.round(l*this.d)}/${this.d}`:e===1&&c?d=String(l):e===1&&u&&(d=l===.5?"½":`${Math.floor(l)}½`),r(l,c||u,d)}!a&&this.lo<.5&&this.hi>.5&&r(.5,!0,e<=1?"½":null)}_valueAt(e){const t=this.tiles.findIndex(n=>n.x===e);return t<0?null:this.lo+t/(this.n-1)*(this.hi-this.lo)}_tol(){const{problem:e}=this.ctx;return Math.max(e.accept?.tol??.05,.55/(this.n-1))*(this.hi-this.lo)}_isCorrectCell(e,t){if(!this.tiles.some(s=>s.x===e&&s.z===t))return!1;const n=this._valueAt(e);return n!==null&&Math.abs(n-this.ctx.problem.answer)<=this._tol()}_showReadyCue(e,t){if(this.done||this.resolving)return;const n=performance.now(),s=`${e},${t}`;if(this.ctx.hud.setActionReady?.(!0),this.readyKey===s&&n<this.readyPulseAt)return;this.readyKey=s,this.readyPulseAt=n+1200;const{place:r,particles:a}=this.ctx,o=r.worldPos(e,t,.52);a.emit(o,10,{colors:[16767334,16777215,13215487],speed:.8,up:1,life:620,spread:.18}),K.sfx("sparkle",{pitch:.75,gain:.45});const l=gt("✦",{color:"#ffd966",scale:.72});l.position.copy(o),r.group.add(l),this.readyMark=l;const c=l.scale.clone();dt({ms:680,ease:vt.outQuad,onUpdate:(u,d)=>{l.position.y=o.y+Math.sin(d*Math.PI)*.22,l.scale.set(c.x*(1+d*.55),c.y*(1+d*.55),1),l.material.opacity=1-d},onDone:()=>{this.readyMark===l&&(this.readyMark=null),r.group.remove(l)}})}onArrive(e,t){this._isCorrectCell(e,t)&&this.ctx.player.queue.length===0?this._showReadyCue(e,t):this.ctx.hud.setActionReady?.(!1)}showModel(){return this._showTicks(0),!0}onAction(){if(this.done||this.resolving||this.ctx.player.locked)return;const{player:e,place:t,problem:n,particles:s}=this.ctx;if(!this.tiles.some(c=>c.x===e.x&&c.z===e.z)){K.sfx("boop");return}const a=this._valueAt(e.x),o=n.answer,l=this._tol();if(K.sfx("gong"),this.ctx.hud.setActionReady?.(!1),Math.abs(a-o)<=l){this.done=!0;const c=t.worldPos(e.x,e.z,.15);this.knot=Tt(ht.flowerPink,.3,"prop:flowerPink"),this.knot.position.copy(c),t.group.add(this.knot),this.tiles.forEach((u,d)=>{Et(d*40,()=>{if(d%3===0){const h=Tt(d%2?ht.flowerYellow:ht.flowerBlue,.22,"prop:f"+d%2);h.position.copy(t.worldPos(u.x,u.z,.12)),t.group.add(h),this.ticks.push(h)}})}),s.confetti(c,40),Et(500,()=>this.ctx.resolve(!0,{tag:"correct",value:a}))}else{this.resolving=!0;const c=e.mesh;e.locked=!0,s.splash(c.position.clone(),34),K.sfx("splash");const u=c.position.y;dt({ms:420,ease:vt.inQuad,onUpdate:(d,h)=>{c.position.y=u-h*1.1,c.rotation.z=h*.7},onDone:()=>{const d=(t.markers.P||[{x:2,z:2}])[0];c.rotation.z=0,e.locked=!1,e.setPlace(t,d.x,d.z),this.ctx.hud.setActionReady?.(!1),this._showTicks(0),this.resolving=!1,this.ctx.resolve(!1,{tag:a<o?"magnitude_low":"magnitude_high",value:a})}})}}destroy(){super.destroy();const{place:e}=this.ctx;e.group.remove(this.endA,this.endB),this.knot&&e.group.remove(this.knot),this.readyMark&&e.group.remove(this.readyMark);for(const t of this.ticks)e.group.remove(t);this.ctx.hud.setAction(null),this.ctx.hud.setActionReady?.(!1)}}class cy extends Da{begin(){const{place:e,problem:t,hud:n,rng:s}=this.ctx,{total:r,baskets:a}=t.model.params;this.total=r,this.pile=r;const o=(e.markers.m||[])[0];this.stumpPos=o?{x:o.x,z:o.z}:{x:2,z:2},o&&(this.stumpMesh=Tt(ht.stump,.5,"prop:stump"),this.stumpMesh.position.copy(e.worldPos(o.x,o.z)),e.group.add(this.stumpMesh),e.cellAt(o.x,o.z).walk=!1),this.pileSprite=gt("🥥 "+this.pile,{bg:"#fff8ec",scale:.8}),this.pileSprite.position.copy(e.worldPos(this.stumpPos.x,this.stumpPos.z,1)),e.group.add(this.pileSprite);const l=(e.markers.B||[]).slice().sort((c,u)=>Math.abs(c.x-this.stumpPos.x)+Math.abs(c.z-this.stumpPos.z)-(Math.abs(u.x-this.stumpPos.x)+Math.abs(u.z-this.stumpPos.z)));this.baskets=l.slice(0,a).map(c=>{const u=Tt(ht.basket,.42,"prop:basket");u.position.copy(e.worldPos(c.x,c.z)),e.group.add(u);const d=gt("0",{bg:"#fff8ec",scale:.6});return d.position.copy(e.worldPos(c.x,c.z,.85)),e.group.add(d),{x:c.x,z:c.z,count:0,mesh:u,label:d,order:[]}}),this.lastDrops=[],n.setAction("✅"),n.setVerbPanel(this._panel())}_panel(){return{kind:"share",pile:this.pile,counts:this.baskets.map(e=>e.count)}}_updateLabel(e){const{place:t}=this.ctx;t.group.remove(e.label),e.label=gt(String(e.count),{bg:"#fff8ec",scale:.6}),e.label.position.copy(t.worldPos(e.x,e.z,.85)),t.group.add(e.label)}_updatePile(){const{place:e}=this.ctx;e.group.remove(this.pileSprite),this.pileSprite=gt("🥥 "+this.pile,{bg:"#fff8ec",scale:.8}),this.pileSprite.position.copy(e.worldPos(this.stumpPos.x,this.stumpPos.z,1)),e.group.add(this.pileSprite),this.ctx.hud.setVerbPanel(this._panel())}_basketAt(e,t){return this.baskets.find(n=>n.x===e&&n.z===t)}_drop(e){if(this.pile<=0){K.sfx("boop");return}const{place:t}=this.ctx;this.pile-=1,e.count+=1,this.lastDrops.push(e);const n=Tt(ht.coconut,.22,"prop:coconut"),s=t.worldPos(this.stumpPos.x,this.stumpPos.z,.6),r=t.worldPos(e.x,e.z,.3);n.position.copy(s),t.group.add(n),K.sfx("pick",{pitch:1+e.count*.04}),dt({ms:320,ease:vt.linear,onUpdate:(a,o)=>{n.position.lerpVectors(s,r,o),n.position.y=s.y+(r.y-s.y)*o+Math.sin(o*Math.PI)*.7},onDone:()=>{t.group.remove(n),K.sfx("drop"),this._updateLabel(e),this._updatePile()}})}_take(){const e=this.lastDrops.pop();if(!e||e.count<=0){K.sfx("boop");return}e.count-=1,this.pile+=1,K.sfx("swoosh"),this._updateLabel(e),this._updatePile()}showModel(){for(const[e,t]of this.baskets.entries()){const n=t.mesh;dt({ms:360,delay:e*70,onUpdate:(s,r)=>{n.position.y=this.ctx.place.worldPos(t.x,t.z).y+Math.sin(r*Math.PI)*.18}})}return K.sfx("click"),!0}onCellTap(e,t){const n=this._basketAt(e,t);return n?(this._drop(n),!0):e===this.stumpPos.x&&t===this.stumpPos.z?(this._take(),!0):!1}onArrive(e,t){if(this.ctx.player.queue.length>0)return;const n=this._basketAt(e,t);n&&this._drop(n)}onKey(e){return e==="Backspace"||e==="KeyX"?(this._take(),!0):!1}onAction(){if(this.done)return;const{problem:e}=this.ctx,{baskets:t,quotient:n,remainder:s}=e.model.params,r=this.baskets.map(o=>o.count),a=r.every(o=>o===r[0]);if(a&&r[0]===n&&this.pile===s){this.done=!0;for(const o of this.baskets)this.ctx.particles.confetti(this.ctx.place.worldPos(o.x,o.z,.5),12);s>0&&this.ctx.onTreat?.("berry",s,this.ctx.place.worldPos(this.stumpPos.x,this.stumpPos.z,.7)),this.ctx.resolve(!0,{tag:"correct",value:r[0]})}else if(a)this.pile>s?this.ctx.resolve(!1,{tag:"share_more",value:this.pile}):this.ctx.resolve(!1,{tag:"remainder_ignored",value:r[0]});else{const o=Math.max(...r);for(const l of this.baskets)if(l.count===o){const c=l.mesh;dt({ms:380,onUpdate:(u,d)=>{c.rotation.z=Math.sin(d*Math.PI*4)*.15}})}this.ctx.resolve(!1,{tag:"unfair_share",value:r.join(",")})}}destroy(){super.destroy();const{place:e}=this.ctx;this.stumpMesh&&e.group.remove(this.stumpMesh),e.group.remove(this.pileSprite);for(const t of this.baskets)e.group.remove(t.mesh),e.group.remove(t.label);this.ctx.hud.setVerbPanel(null),this.ctx.hud.setAction(null)}}const sd={fetch:ay,array:oy,numberline:ly,share:cy},uy=["#####################","#...................#","#...................#","#...................#","#...................#","#...................#","#...................#","#...................#","#...................#","#...................#","#...................#","#...................#","#####################"],dy=["counter","prep","oven","pantry","coinTray","orderBoard"],hy={bakery:{titleKey:"business.zone.bakery",sign:"Bakery",signX:5,signZ:1,props:["counter","prepBoard","doughBowl","basket","coinTray","orderBoard","shopTable","oven"],stations:{counter:{x:4,z:3,prop:"counter",height:.65},coinTray:{x:7,z:3,prop:"coinTray",height:.24,lift:.42},orderBoard:{x:9,z:2,prop:"orderBoard",height:1.05},prep:{x:4,z:6,prop:"prepBoard",height:.18},oven:{x:7,z:8,prop:"oven",height:.95},pantry:{x:2,z:7,prop:"shopTable",height:.38}},queue:[{x:3,z:10},{x:4,z:10},{x:5,z:10},{x:6,z:10}]},pizzeria:{titleKey:"business.zone.pizzeria",sign:"Pizzeria",signX:15,signZ:1,props:["counter","prepBoard","pizzaPan","toppingCrate","coinTray","orderBoard","shopTable","oven"],stations:{counter:{x:16,z:3,prop:"counter",height:.65},coinTray:{x:13,z:3,prop:"coinTray",height:.24,lift:.42},orderBoard:{x:11,z:2,prop:"orderBoard",height:1.05},prep:{x:16,z:6,prop:"prepBoard",height:.18},oven:{x:13,z:8,prop:"oven",height:.95},pantry:{x:18,z:7,prop:"toppingCrate",height:.46}},queue:[{x:17,z:10},{x:16,z:10},{x:15,z:10},{x:14,z:10}]}},fy=[{key:"basket",zone:"bakery",x:2,z:4,targetH:.34,dx:.1,dz:.15},{key:"doughBowl",zone:"bakery",x:5,z:6,targetH:.24,lift:.18},{key:"basket",zone:"bakery",x:7,z:4,targetH:.34,dx:-.2},{key:"shopTable",zone:"bakery",x:5,z:8,targetH:.38},{key:"pizzaPan",zone:"pizzeria",x:15,z:6,targetH:.18,lift:.18},{key:"toppingCrate",zone:"pizzeria",x:18,z:5,targetH:.34},{key:"pizzaPan",zone:"pizzeria",x:13,z:4,targetH:.18,lift:.38},{key:"shopTable",zone:"pizzeria",x:15,z:8,targetH:.38}];function py(i,e){return e??Math.min(.75,ht[i].layers.length*.12)}class my extends gc{constructor(e,t={}){super(e,"hub"),this.buildFrom(uy,{seed:t.seed??404}),this.stations={},this.stationMarkers={},this.miniGameZones=gy(),this.stationHits=[],this.queueMarkers=this.miniGameZones.bakery.queue.map(n=>({...n})),this.activeMiniGame="bakery",this.activeStations=this.miniGameZones.bakery.stations,this.customers=[],this._customerEntities=new Set,this._placeZones(),this.setActiveRecipe(t.recipeId||"flatbread")}_placeZones(){for(const[e,t]of Object.entries(this.miniGameZones))this._placeZone(e,t);this._placeSharedDecor(),this._activateStations("bakery")}_placeZone(e,t){const n=gt(w(t.titleKey)||t.sign,{bg:"#fff8ecdd",scale:.58,fontSize:40});n.position.copy(this.worldPos(t.signX,t.signZ,1.2)),this.group.add(n);for(const[s,r]of Object.entries(t.stations)){const a={x:r.x,z:r.z};this.stationHits.push({name:s,zone:e,...a});const o=this.cellAt(r.x,r.z);o&&(o.walk=!1),this._prop(r.prop,r.x,r.z,{targetH:py(r.prop,r.height),lift:r.lift??0});const l=gt(w("business.station."+s),{bg:"#fff8ecdd",scale:.36,fontSize:34});l.position.copy(this.worldPos(r.x,r.z,1.15)),this.group.add(l)}}_placeSharedDecor(){for(const e of fy)this._prop(e.key,e.x,e.z,e);for(let e=1;e<this.size.d-1;e++)this.cellAt(10,e)&&this.tintCell(10,e,16246453)}_prop(e,t,n,s={}){const r=Tt(ht[e],s.targetH,"prop:"+e),a=this.worldPos(t,n,s.lift??0);return r.position.set(a.x+(s.dx??0)*Lt,a.y,a.z+(s.dz??0)*Lt),s.rotation!==void 0&&(r.rotation.y=s.rotation),this.group.add(r),r}stationAt(e,t){for(const{name:n,...s}of this.stationHits)if(Math.abs(s.x-e)+Math.abs(s.z-t)<=1)return n;return null}_activateStations(e){const t=this.miniGameZones[e]||this.miniGameZones.bakery;this.activeMiniGame=e in this.miniGameZones?e:"bakery",this.activeStations=t.stations,this.queueMarkers=t.queue.map(n=>({...n}));for(const n of dy)this.stations[n]={...t.stations[n]},this.stationMarkers[n]={...t.stations[n]}}setActiveRecipe(e){const t=jn[e]?.kind==="pizza"?"pizzeria":"bakery";this._activateStations(t)}spawnCustomer(e,t=0){const n=Jd[e];if(!n)return null;const s=ki.find(h=>h.id===n.petId);if(!s)return null;const r=this.queueMarkers[t]||this.queueMarkers[0];if(!r)return null;const a=new en,o=Wn(s.model,.55,null,"business-customer:"+n.id);a.add(o);const l=gt(w(n.nameKey),{bg:"#fff8ecdd",scale:.48,fontSize:34});l.position.y=.8,a.add(l),a.position.copy(this.worldPos(r.x,r.z)),a.rotation.y=Math.PI,this.group.add(a);const c={id:n.id,petId:n.petId,nameKey:n.nameKey,x:r.x,z:r.z,mesh:o,label:l,group:a};this.customers.push(c);const u=a.position.y,d={t:t*.7,update:h=>{d.t+=h/1e3,a.position.y=u+Math.abs(Math.sin(d.t*2.1))*.045,l.position.y=.8+Math.sin(d.t*1.7)*.035}};return this._customerEntities.add(d),this.addEntity(d),c}_disposeCustomerLabel(e){e&&(e.material?.map?.dispose?.(),e.material?.dispose?.(),e.geometry?._owned&&e.geometry.dispose?.())}clearCustomers(){for(const e of this.customers)this._disposeCustomerLabel(e.label),this.group.remove(e.group);this.customers=[],this.entities=this.entities.filter(e=>!this._customerEntities.has(e)),this._customerEntities.clear()}}function gy(){return Object.fromEntries(Object.entries(hy).map(([i,e])=>[i,{...e,props:[...e.props],queue:e.queue.map(t=>({...t})),stations:Object.fromEntries(Object.entries(e.stations).map(([t,n])=>[t,{...n}]))}]))}const je=i=>document.getElementById(i);let Ws={},Li=null;function hh(i){Ws=i;const e=(t,n)=>{const s=je(t);if(s){const r=w(n);s.setAttribute("aria-label",r),s.title=r}};e("btn-hint","hud.hint"),e("btn-action","hud.action"),e("btn-home","hud.home"),e("btn-settings","settings.title"),je("btn-hint").addEventListener("click",()=>{K.sfx("click"),Ws.onHint?.()}),je("btn-action").addEventListener("click",()=>{K.sfx("click"),Ws.onAction?.()}),je("btn-home").addEventListener("click",()=>{K.sfx("click"),Ws.onHome?.()}),je("btn-settings").addEventListener("click",()=>{K.sfx("click"),Ws.onSettings?.()}),je("bubble").addEventListener("click",()=>_c())}function Gn(i=!0){je("hud").classList.toggle("hidden",!i),i||(je("banner").classList.add("hidden"),je("verb-panel").classList.add("hidden"),ws(),Ia())}function Fa(i){return String(i).replace(/(\d+)\s*\/\s*(\d+)/g,'<span class="frac"><span class="n">$1</span><span class="d">$2</span></span>').replace(/\?/g,'<span class="slot">?</span>').replace(/⬚/g,'<span class="slot">◯</span>')}function fh(i,e){je("banner").classList.remove("hidden","solved"),je("banner-instruction").textContent=i||"",je("banner-equation").innerHTML=Fa(e||"")}function ph(i){je("banner").classList.add("solved"),je("banner-equation").innerHTML=Fa(i)}function mh(){const i=je("banner");i.classList.remove("wiggle"),i.offsetWidth,i.classList.add("wiggle")}function Ol(){je("banner").classList.add("hidden")}function gh(i){je("banana-count").textContent=i}function _h(i){je("streak-count").textContent=i}function vh(i,e){je("egg-fill").style.width=Math.min(100,i/e*100)+"%"}function zl(i){const e=je("combo");i>=2?(e.classList.remove("hidden"),je("combo-count").textContent=i,e.style.animation="none",e.offsetWidth,e.style.animation=""):e.classList.add("hidden")}function ca(i){const e=je("btn-action");e.classList.remove("ready"),i?(e.textContent=i,e.classList.remove("hidden")):e.classList.add("hidden")}function _y(i){const e=je("btn-action");e.classList.toggle("ready",!!i&&!e.classList.contains("hidden"))}function qs(i){je("btn-hint").classList.toggle("hidden",!i)}let gs=null;function Gl(i){if(!i||i.kind==="none")return!1;const e=je("model-panel");let t="";if(i.kind==="array"){const{rows:n,cols:s}=i.params;if(s>12){const r=Math.floor(s/10)*10,a=s-r;t=`<div class="mp-caption">${n} × ${s} = ${n} × ${r} + ${n} × ${a}
        = ${n*r} + ${n*a} = <b>${n*s}</b></div>`}else{let r="";for(let a=0;a<n;a++){for(let o=0;o<s;o++)r+=`<div class="mp-cell ${a%2?"alt":""}" style="animation-delay:${(a*s+o)*22}ms"></div>`;r+=`<div class="mp-rowlabel" style="grid-column:${s+1}">${(a+1)*s}</div>`}t=`<div class="mp-grid" style="grid-template-columns:repeat(${s},16px) 30px">${r}</div>
        <div class="mp-caption">${n} × ${s} = <b>${n*s}</b></div>`}}else if(i.kind==="baskets"){const{total:n,baskets:s,quotient:r,remainder:a}=i.params;let o="";for(let l=0;l<s;l++)o+=`<div class="mp-basket">🧺<br><b>${r}</b></div>`;a>0&&(o+=`<div class="mp-basket" style="border-color:var(--pink)">🍓<br><b>+${a}</b></div>`),t=`<div class="mp-baskets">${o}</div>
      <div class="mp-caption">${n} ÷ ${s} = <b>${r}</b>${a?` <span style="color:#c2497a">rest ${a}</span>`:""}</div>`}else if(i.kind==="numberline"){const{n,d:s,lo:r=0,hi:a=1}=i.params;let o="";for(let c=0;c<=s*(a-r);c++)o+=`<div class="mp-tick" style="left:${c/(s*(a-r))*100}%"></div>`;const l=(n/s-r)/(a-r)*100;t=`<div class="mp-line" style="width:280px">${o}
        <div class="mp-mark" style="left:${l}%">🐵</div>
        <div class="mp-endlabel" style="left:0">${r}</div>
        <div class="mp-endlabel" style="left:100%">${a}</div>
      </div>
      <div class="mp-caption" style="margin-top:30px">${Fa(`${n}/${s}`)}</div>`}else if(i.kind==="strip"){const{a:n,b:s,op:r}=i.params,a=(l,c)=>{const u=Math.floor(l/10),d=l%10;let h="";for(let f=0;f<u;f++)h+=`<div class="mp-rod ${c}" style="animation-delay:${f*60}ms">10</div>`;for(let f=0;f<d;f++)h+=`<div class="mp-cell ${c}" style="animation-delay:${(u+f)*60}ms"></div>`;return`<div class="mp-pv">${h}<div class="mp-rowlabel">${l}</div></div>`},o=r==="+"?n+s:n-s;t=a(n,"")+`<div class="mp-caption" style="margin:0">${r}</div>`+a(s,r==="+"?"alt":"b")+`<div class="mp-caption">${n} ${r} ${s} = <b>${o}</b></div>`}else return!1;return e.innerHTML=t,e.classList.remove("hidden"),gs&&clearTimeout(gs),gs=setTimeout(Ia,7e3),!0}function Ia(){je("model-panel").classList.add("hidden"),gs&&(clearTimeout(gs),gs=null)}let hr=null;function bh(i,e,t){const n=je("bubble");je("bubble-face").textContent=e,je("bubble-text").innerHTML=i,xh(i),je("bubble-next").classList.toggle("hidden",!t),n.classList.remove("hidden"),n.style.animation="none",n.offsetWidth,n.style.animation=""}function pn(i,{ms:e=2400,face:t="🐵",transient:n=!1,onDone:s=null}={}){const r=(Array.isArray(i)?i:[i]).filter(Boolean).map(a=>typeof a=="string"?{html:a}:a);r.length&&(n&&hr||(Li&&(clearTimeout(Li),Li=null),hr=n?null:{pages:r,i:0,face:t,onDone:s},bh(r[0].html,r[0].face||t,!n),n&&(Li=setTimeout(()=>ws(),e))))}function _c(){const i=hr;if(!i)return!1;if(K.sfx("click"),i.i++,i.i<i.pages.length){const e=i.pages[i.i];bh(e.html,e.face||i.face,!0)}else ws(),i.onDone?.();return!0}function vy(){return!!hr}function ws(){je("bubble").classList.add("hidden"),hr=null,Li&&(clearTimeout(Li),Li=null)}function xh(i){const e=je("sr-announce");e&&(e.textContent=String(i).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim())}function Qe(i,e=""){const t=document.createElement("div");t.className="toast "+e,t.innerHTML=i,je("toasts").appendChild(t),xh(i),setTimeout(()=>t.remove(),2800)}function Hl(i){const e=je("verb-panel");if(!i){e.classList.add("hidden"),e.innerHTML="";return}if(e.classList.remove("hidden"),i.kind==="array"){const t=i.count>0?`<span style="color:var(--leaf-deep)">${i.rows}</span> × <span style="color:#b06a2c">${i.cols}</span> = ${i.count}`:"🚩",n=i.anchored?i.offBed?"verb.array_offsoil":"verb.array_stretch":"verb.array_plant";e.innerHTML=`
      <div>${t}
        <div class="sub">${w(n)}</div>
      </div>`}else i.kind==="share"&&(e.innerHTML=`
      <div>🥥 ${i.pile} &nbsp;→&nbsp; 🧺 ${i.counts.join(" · ")}</div>
      <div class="sub">${w("verb.share_sub")}</div>`)}const by=Object.freeze(Object.defineProperty({__proto__:null,advanceBubble:_c,bubbleOpen:vy,formatEquation:Fa,hideBanner:Ol,hideBubble:ws,hideModelPanel:Ia,initHud:hh,say:pn,setAction:ca,setActionReady:_y,setBananas:gh,setBanner:fh,setCombo:zl,setEgg:vh,setStreak:_h,setVerbPanel:Hl,showHintButton:qs,showHud:Gn,showModelPanel:Gl,solveBanner:ph,toast:Qe,wiggleBanner:mh},Symbol.toStringTag,{value:"Module"})),xy={en:{label:"English",className:"flag-gb"},nl:{label:"Nederlands",className:"flag-nl"}};function Es(i,e){const t=xy[i];if(!t)throw new Error(`Unknown language flag: ${i}`);return`<button class="round-btn lang-btn${i===e?" active":""}" data-lang="${i}" aria-label="${t.label}" title="${t.label}"><span class="flag-icon ${t.className}" aria-hidden="true"></span></button>`}const yh=i=>document.getElementById(i),Vl=()=>yh("screens"),Sh={bunny:"🐰",duckling:"🐥",kitten:"🐱",piglet:"🐷",redpanda:"🦊",turtle:"🐢",owl:"🦉",dragon:"🐉"},Mh={cap:"🧢",bow:"🎀",crown:"👑",flowercrown:"🌸",beanie:"🧶",wizard:"🧙‍♂️",pirate:"🏴‍☠️",party:"🥳"},yy={sparkle:"✨",petal:"🌸",bubble:"🫧",star:"⭐"},Sy={tide:"🌊",garden:"🌱",stump:"🥥",vines:"🍇"};function fn(){Vl().innerHTML=""}function Mt(i,e=""){const t=["screen",e].filter(Boolean).join(" ");Vl().innerHTML=`<div class="${t}">${i}</div>`;const n=Vl().firstElementChild;return n.tabIndex=-1,n.focus?.({preventScroll:!0}),n}function Ln(i,e=null){return`<button class="round-btn screen-close" id="scr-back" aria-label="${fe(w("nav.back"))}">${e||"✖️"}</button>`}function wh({onStart:i,onParents:e,onDuel:t}){const n=rh(),s=cn(),r=[["🌱",w("attract.beat.garden")],["🥥",w("attract.beat.share")],["🥚",w("attract.beat.pets")],["💎",w("attract.beat.gems")],["🌈",w("attract.beat.bloom")]],a=["🐵","Monkey","Grove","🍌"].map((p,T)=>`<span class="lw" style="--d:${T}"><span>${p}</span></span>`).join(" "),o=Mt(`
    <div class="attract-shell" role="button" tabindex="0" aria-label="${w("attract.cta")}">
      <div class="attract-top">
        <h1 class="attract-logo">${a}</h1>
        <div class="attract-tagline">${w("attract.tagline")}</div>
      </div>

      <div class="attract-bottom">
        <div class="attract-ticker"><span id="attract-beat"><span class="bi">${r[0][0]}</span>${r[0][1]}</span></div>
        <button class="btn green attract-start" id="attract-start">▶ ${w("attract.cta")}</button>
        <div class="attract-prompt">${w("attract.prompt")}</div>
        <div class="menu-row attract-menu" id="attract-menu">
          <div class="lang-toggle">
            ${Es("en",s.lang)}
            ${Es("nl",s.lang)}
          </div>
          ${n.length>=2?`<button class="btn soft" id="btn-duel">⚔️ ${w("title.duel")}</button>`:""}
          <button class="btn soft" id="btn-parents">${w("title.parents")}</button>
        </div>
      </div>
    </div>
  `);o.classList.add("attract-screen");let l=!1,c=null,u=0;const d=o.querySelector("#attract-beat"),h=setInterval(()=>{u=(u+1)%r.length,d.classList.add("swap"),setTimeout(()=>{l||(d.innerHTML=`<span class="bi">${r[u][0]}</span>${r[u][1]}`,d.classList.remove("swap"))},240)},2600),f=()=>{l||(l=!0,clearInterval(h),window.removeEventListener("keydown",v),c&&cancelAnimationFrame(c))},g=()=>{l||(f(),K.init(),K.setSfx(cn().sfx),K.setMusic(cn().music),K.music("title"),K.sfx("correct"),i())},v=p=>{(p.key===" "||p.key==="Enter")&&(p.preventDefault(),g())},m=()=>{if(l)return;const p=globalThis.navigator?.getGamepads?.()||[];for(const T of p)if(T?.buttons?.[9]?.pressed||T?.buttons?.[0]?.pressed){g();return}c=requestAnimationFrame(m)};window.addEventListener("keydown",v),m(),o.querySelector("#attract-start").addEventListener("click",g),o.querySelector(".attract-shell").addEventListener("click",g),o.querySelector("#attract-menu").addEventListener("click",p=>p.stopPropagation());for(const p of o.querySelectorAll("[data-lang]"))p.addEventListener("click",()=>{K.sfx("click"),mc(p.dataset.lang),vn(),f(),wh({onStart:i,onParents:e,onDuel:t})});o.querySelector("#btn-parents")?.addEventListener("click",()=>{K.sfx("click"),f(),e()}),o.querySelector("#btn-duel")?.addEventListener("click",()=>{K.sfx("click"),f(),t()})}function Wl({onPlay:i,onParents:e,onDuel:t}){const n=rh(),s=cn(),r=Xd(),a=Mt(`
    <h1>🐵 Monkey Grove 🍌</h1>
    <div class="tagline">${w("title.tagline")}</div>
    <div class="card">
      <h3>${w("title.who")}</h3>
      <div class="tile-grid" id="profile-grid">
        ${n.map(l=>`
          <div class="tile pressable" data-pid="${l.id}">
            <div class="t-icon">🐵</div>
            <div class="t-name">${fe(l.name)}</div>
            <div class="t-price">🍌 ${l.bananas} · 🔥 ${l.streak.count}</div>
          </div>`).join("")}
        <div class="tile pressable" id="tile-new">
          <div class="t-icon">✨</div>
          <div class="t-name">${w("title.new_player")}</div>
        </div>
      </div>
      <div id="new-player-row" class="new-player-form hidden">
        <input id="new-name" maxlength="14" placeholder="${w("title.name_prompt")}"
          style="flex:1;font-family:inherit;font-size:18px;font-weight:700;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto;user-select:text">
        <input id="new-age" type="number" min="4" max="13" inputmode="numeric" placeholder="${w("title.age_prompt")}"
          style="width:140px;font-family:inherit;font-size:18px;font-weight:700;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto;user-select:text">
        <input id="new-birth-date" type="date" aria-label="${fe(w("title.birthday_prompt"))}"
          style="min-width:168px;font-family:inherit;font-size:16px;font-weight:700;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto;user-select:text">
        <select id="new-pack" aria-label="${fe(w("title.curriculum_prompt"))}"
          style="min-width:220px;font-family:inherit;font-size:16px;font-weight:700;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto">
          ${r.map(l=>`<option value="${fe(l.id)}">${fe(Rh(l))}</option>`).join("")}
        </select>
        <button class="btn green" id="new-go">${w("title.start")}</button>
        <div class="form-help">${w("title.age_help")} ${w("title.birthday_help")} ${w("title.curriculum_help")}</div>
      </div>
    </div>
    <div class="menu-row">
      <div class="lang-toggle">
        ${Es("en",s.lang)}
        ${Es("nl",s.lang)}
      </div>
      ${n.length>=2?`<button class="btn soft" id="btn-duel">⚔️ ${w("title.duel")}</button>`:""}
      <button class="btn soft" id="btn-parents">${w("title.parents")}</button>
    </div>
  `);for(const l of a.querySelectorAll("[data-pid]")){l.addEventListener("click",()=>{K.sfx("click"),i(l.dataset.pid)});let c=null;l.addEventListener("pointerdown",()=>{c=setTimeout(()=>{confirm(w("ui.confirm_delete"))&&(mb(l.dataset.pid),Wl({onPlay:i,onParents:e,onDuel:t}))},900)});for(const u of["pointerup","pointerleave"])l.addEventListener(u,()=>clearTimeout(c))}a.querySelector("#tile-new").addEventListener("click",()=>{a.querySelector("#new-player-row").classList.remove("hidden"),a.querySelector("#new-name").focus()});const o=()=>{const l=a.querySelector("#new-name").value.trim()||"Monkey",c=Number(a.querySelector("#new-age").value),u=Number.isFinite(c)&&c>=4&&c<=13?c:null,d=a.querySelector("#new-birth-date").value,h=a.querySelector("#new-pack").value,f=fb(l,{age:u,birthDate:d,packId:h});K.sfx("correct"),i(f.id,!0)};a.querySelector("#new-go").addEventListener("click",o),a.querySelector("#new-name").addEventListener("keydown",l=>{l.key==="Enter"&&o()}),a.querySelector("#new-age").addEventListener("keydown",l=>{l.key==="Enter"&&o()}),a.querySelector("#new-birth-date").addEventListener("keydown",l=>{l.key==="Enter"&&o()});for(const l of a.querySelectorAll("[data-lang]"))l.addEventListener("click",()=>{mc(l.dataset.lang),vn(),Wl({onPlay:i,onParents:e,onDuel:t})});a.querySelector("#btn-parents")?.addEventListener("click",e),a.querySelector("#btn-duel")?.addEventListener("click",t)}function My(i){let e=0;const t=[w("story.1"),w("story.2"),w("story.3")],n=["🦀","🐵","🌴"],s=Mt(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center">
      <div id="story-face" style="font-size:64px">${n[0]}</div>
      <div id="story-text" style="font-size:20px;font-weight:700;line-height:1.4;min-height:64px">${t[0]}</div>
    </div>
    <button class="btn green" id="story-next">${w("ui.ok")} →</button>
    <div style="flex:2"></div>
  `);s.querySelector("#story-next").addEventListener("click",()=>{if(K.sfx("click"),e++,e>=t.length){i();return}s.querySelector("#story-face").textContent=n[e],s.querySelector("#story-text").innerHTML=t[e],e===t.length-1&&(s.querySelector("#story-next").textContent=w("title.start")+" 🍌")})}function wy({problems:i,onAnswer:e,onDone:t,onSkip:n}){let s=!1,r=!1,a=0,o=!1;const l=d=>r?!1:(r=!0,d?.(),!0),c=()=>{o=!1;const d=i[a],h=Array.isArray(d?.choices)?d.choices:[],f=d?.prompt?.key?w(Ay(d.prompt.key),Ty(d)):w("placement.answer"),g=Mt(`
      <div style="flex:1"></div>
      <h2>${w("placement.title")}</h2>
      <div class="tagline">${w("placement.body")}</div>
      <div class="card placement-card">
        <div class="placement-step">${fe(w("placement.step",{n:a+1,total:i.length}))}</div>
        <div class="placement-task">${fe(f)}</div>
        <div class="placement-eq">${Ey(d?.equation||"")}</div>
        <div class="tile-grid">
          ${h.map(v=>`
            <button class="tile pressable warmup-choice" data-value="${fe(String(v.value))}" aria-label="${fe(f)} ${fe(String(v.value))}">
              <div class="t-icon">✨</div>
              <div class="t-name">${fe(String(v.value))}</div>
              <div class="t-price">${w("placement.answer")}</div>
            </button>
          `).join("")}
        </div>
      </div>
      <div class="menu-row">
        <button class="btn soft" id="warmup-skip">${w("placement.skip")}</button>
      </div>
      <div style="flex:2"></div>
    `);for(const v of g.querySelectorAll("[data-value]"))v.addEventListener("click",()=>{if(r||o)return;o=!0;for(const p of g.querySelectorAll("[data-value]"))p.disabled=!0;const m=String(v.dataset.value)===String(d.answer);if(e({problem:d,correct:m}),a+=1,a>=i.length){Ma(w("placement.done")),l(t);return}c()});g.querySelector("#warmup-skip")?.addEventListener("click",()=>l(n))},u=()=>{const d=Mt(`
      <div style="flex:1"></div>
      <h2>${w("placement.title")}</h2>
      <div class="tagline">${w("placement.body")}</div>
      <div class="card placement-card">
        <div class="placement-eq"><span class="slot">?</span> <span aria-hidden="true">+</span> <span class="slot">?</span></div>
      </div>
      <div class="menu-row">
        <button class="btn green" id="warmup-start">${w("placement.start")}</button>
        <button class="btn soft" id="warmup-skip">${w("placement.skip")}</button>
      </div>
      <div style="flex:2"></div>
    `);d.querySelector("#warmup-start")?.addEventListener("click",()=>{if(!(r||s)){s=!0;for(const h of d.querySelectorAll("button"))h.disabled=!0;if(!i.length){l(n);return}c()}}),d.querySelector("#warmup-skip")?.addEventListener("click",()=>l(n))};(!s||!i.length)&&u()}function Ey(i){return fe(i).replace(/(\d+)\s*\/\s*(\d+)/g,'<span class="frac"><span class="n">$1</span><span class="d">$2</span></span>').replace(/\?/g,'<span class="slot">?</span>')}function Ty(i){const e={...i?.meta||{},...i?.model?.params||{},...i?.prompt?.vars||{}};return e.n!==void 0&&e.d!==void 0&&(e.frac=`${e.n}/${e.d}`),e.answer=i?.answer,e}function Ay(i){return{"q.compare":"warmup.q.compare","q.equiv":"warmup.q.equiv","q.frac_of":"warmup.q.frac_of","q.missing":"warmup.q.missing","q.share_fetch":"warmup.q.share_fetch"}[i]||"warmup.q.fetch"}function Hn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n}){const s=cn(),r=Mt(`
    ${Ln()}
    <h2>${w("settings.title")}</h2>
    <div class="card">
      <div class="menu-col">
        <div class="menu-row" style="align-items:center">
          <span style="font-weight:800">${w("settings.lang")}</span>
          <div class="lang-toggle">
            ${Es("en",s.lang)}
            ${Es("nl",s.lang)}
          </div>
        </div>
        <div class="menu-row">
          <button class="btn soft" id="tg-sfx">${s.sfx?"🔊":"🔇"} ${w("settings.sfx")}</button>
          <button class="btn soft" id="tg-music">${s.music?"🎵":"🚫"} ${w("settings.music")}</button>
        </div>
        <div class="menu-col">
          <button class="btn soft" id="tg-motion" aria-pressed="${Di()}">${Di()?"🐢":"🏃"} ${w("settings.reduce_motion")}</button>
          <button class="btn soft" id="tg-font" aria-pressed="${!!s.dyslexiaFont}">🔤 ${w("settings.dyslexia_font")}</button>
          <button class="btn soft" id="tg-contrast" aria-pressed="${!!s.highContrast}">${s.highContrast?"◑":"○"} ${w("settings.high_contrast")}</button>
          <button class="btn soft" id="tg-colorblind" aria-pressed="${!!s.colorblind}">${s.colorblind?"◑":"○"} ${w("settings.colorblind")}</button>
          <button class="btn soft" id="tg-textsize">🔠 ${w("settings.text_size")}: ${Math.round((s.textScale||1)*100)}%</button>
        </div>
        <button class="btn soft" id="switch-player">👥 ${w("settings.switch_player")}</button>
        
      </div>
    </div>
    
  `);r.querySelector("#scr-back").addEventListener("click",i);for(const a of r.querySelectorAll("[data-lang]"))a.addEventListener("click",()=>{mc(a.dataset.lang),vn(),t?.(),Hn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})});r.querySelector("#tg-sfx").addEventListener("click",()=>{s.sfx=!s.sfx,K.setSfx(s.sfx),Ve(),Hn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-music").addEventListener("click",()=>{s.music=!s.music,K.setMusic(s.music),Ve(),Hn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-motion").addEventListener("click",()=>{s.reduceMotion=!Di(),cs(),Ve(),Hn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-font").addEventListener("click",()=>{s.dyslexiaFont=!s.dyslexiaFont,cs(),Ve(),Hn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-contrast").addEventListener("click",()=>{s.highContrast=!s.highContrast,cs(),Ve(),Hn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-colorblind").addEventListener("click",()=>{s.colorblind=!s.colorblind,cs(),Ve(),Hn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#tg-textsize").addEventListener("click",()=>{const a=[1,1.15,1.3],o=a.findIndex(l=>Math.abs(l-(s.textScale||1))<.01);s.textScale=a[(o+1)%a.length],cs(),Ve(),Hn({onClose:i,onSwitchPlayer:e,onLangChange:t,devTools:n})}),r.querySelector("#switch-player").addEventListener("click",e),r.querySelector("#settings-extra-toggle")?.addEventListener("click",()=>n?.onToggle?.(!n.open));for(const a of r.querySelectorAll("[data-settings-preset]"))a.addEventListener("click",()=>n?.onApply?.(a.dataset.settingsPreset));r.querySelector("#settings-manual-devtools")?.addEventListener("submit",a=>{a.preventDefault()})}function $l({onClose:i,onChanged:e}){const t=lr(),n=[{id:"hats",label:w("shop.hats"),items:Dl,owned:t.owned.hats,slot:"hat",icon:a=>Mh[a.id]||"🎩"},{id:"furs",label:w("shop.furs"),items:Fl,owned:t.owned.furs,slot:"fur",icon:a=>`<span style="display:inline-block;width:30px;height:30px;border-radius:50%;background:${a.palette?.F||"#a8743f"};border:3px solid #fff"></span>`},{id:"trails",label:w("shop.trails"),items:qb,owned:t.owned.trails,slot:"trail",icon:a=>yy[a.id]||"✨"}];let s=$l._tab||"hats";const r=()=>{const a=n.find(l=>l.id===s),o=Mt(`
      ${Ln()}
      <h2>🛍️ ${w("shop.title")}</h2>
      <div class="chip" style="margin-bottom:10px"><span class="chip-icon">🍌</span>${t.bananas}</div>
      <div class="menu-row" style="margin-bottom:12px">
        ${n.map(l=>`<button class="btn soft" data-tab="${l.id}" ${l.id===s?'style="outline:4px solid var(--sun)"':""}>${l.label}</button>`).join("")}
      </div>
      <div class="card">
        <div class="tile-grid">
          ${a.items.map(l=>{const c=a.owned.includes(l.id),u=t.avatar[a.slot]===l.id;return`<div class="tile pressable ${c?"owned":""} ${u?"equipped":""}" data-item="${l.id}">
              <div class="t-icon">${a.icon(l)}</div>
              <div class="t-name">${w(l.nameKey)}</div>
              <div class="t-price">${u?w("shop.equipped"):c?w("shop.equip"):`🍌 ${l.price}`}</div>
            </div>`}).join("")}
        </div>
      </div>
      <div class="card" style="display:flex;align-items:center;gap:12px">
        <div style="font-size:34px">❄️</div>
        <div style="flex:1"><b>${w("shop.freeze")}</b> (${t.streak.freezes})<div style="font-size:13px;color:var(--ink-soft)">${w("shop.freeze_desc")}</div></div>
        <button class="btn soft" id="buy-freeze">🍌 ${mt.streakFreezePrice}</button>
      </div>
    `);o.querySelector("#scr-back").addEventListener("click",i);for(const l of o.querySelectorAll("[data-tab]"))l.addEventListener("click",()=>{$l._tab=s=l.dataset.tab,K.sfx("click"),r()});o.querySelector("#buy-freeze").addEventListener("click",()=>{qu(t,mt.streakFreezePrice)?(t.streak.freezes++,Ve(),K.sfx("chest"),r(),e?.()):(K.sfx("boop"),Ma(w("shop.too_pricey")))});for(const l of o.querySelectorAll("[data-item]"))l.addEventListener("click",()=>{const c=n.find(h=>h.id===s),u=c.items.find(h=>h.id===l.dataset.item);if(c.owned.includes(u.id))Ll(t,c.slot,t.avatar[c.slot]===u.id&&c.slot==="hat"?null:u.id),K.sfx("pick");else if(qu(t,u.price))bb(t,c.id,u.id),Ll(t,c.slot,u.id),K.sfx("chest");else{K.sfx("boop"),Ma(w("shop.too_pricey"));return}r(),e?.()})};r()}function Ma(i){const e=document.createElement("div");e.className="toast",e.textContent=i,yh("toasts").appendChild(e),setTimeout(()=>e.remove(),2600)}function ql({onClose:i,onChanged:e,onHatch:t}){const n=lr(),s=n.egg.points>=n.egg.goal,r=Mt(`
    ${Ln()}
    <h2>🐾 ${w("pets.title")}</h2>
    <div class="card" style="display:flex;align-items:center;gap:14px">
      <div style="font-size:48px">${s?"🥚✨":"🥚"}</div>
      <div style="flex:1">
        <div style="font-weight:800">${w(s?"egg.ready":"egg.progress")}</div>
        <div id="egg-bar" style="width:100%;margin-top:6px"><div id="egg-fill" style="width:${Math.min(100,n.egg.points/n.egg.goal*100)}%"></div></div>
      </div>
      ${s?`<button class="btn green" id="hatch-now">${w("egg.hatch")}</button>`:""}
    </div>
    <div class="card">
      <div style="font-size:14px;color:var(--ink-soft);font-weight:700;margin-bottom:8px">${w("pets.choose")}</div>
      <div class="tile-grid">
        ${ki.map(a=>{const o=n.pets.includes(a.id),l=n.avatar.pet===a.id;return`<div class="tile pressable ${o?"owned":"locked"} ${l?"equipped":""}" data-pet="${a.id}">
            <div class="t-rarity">${Hd[a.rarity]}</div>
            <div class="t-icon">${o?Sh[a.id]||"🐾":"❓"}</div>
            <div class="t-name">${w(o?a.nameKey:"rarity."+a.rarity)}</div>
            ${l?`<div class="t-price">${w("pets.follow")}</div>`:""}
          </div>`}).join("")}
      </div>
    </div>
  `);r.querySelector("#scr-back").addEventListener("click",i),r.querySelector("#hatch-now")?.addEventListener("click",t);for(const a of r.querySelectorAll("[data-pet]"))a.addEventListener("click",()=>{const o=a.dataset.pet;if(!n.pets.includes(o)){K.sfx("boop");return}Ll(n,"pet",n.avatar.pet===o?null:o),K.sfx("pick"),ql({onClose:i,onChanged:e,onHatch:t}),e?.()})}function Ry(i,e){let t=0,n=!1;const s=Mt(`
    <div style="flex:1"></div>
    <div id="hatch-egg">🥚</div>
    <div class="tagline" id="hatch-label">${w("egg.hatch")}</div>
    <div style="flex:2"></div>
  `),r=s.querySelector("#hatch-egg");r.addEventListener("click",()=>{n||(t++,K.sfx("egg",{pitch:1+t*.15}),r.classList.add("cracking"),t>=3&&(n=!0,K.sfx("hatch"),r.textContent=i?Sh[i.id]||"🐾":"💛",r.classList.remove("cracking"),r.style.animation="chest-bounce .8s cubic-bezier(.34,1.56,.64,1)",s.querySelector("#hatch-label").innerHTML=i?`${w("egg.hatched",{pet:w(i.nameKey)})} ${Hd[i.rarity]}`:w("egg.all_pets"),setTimeout(e,2200)))})}function Cy({profile:i,status:e,onClose:t,onFund:n}){const s=e.filter(o=>o.state==="built").length,r=(o,l,c,u,d=!1)=>`
    <div class="skill-row" ${d?'style="opacity:.55"':""}>
      <div style="font-size:28px;width:36px;text-align:center">${o}</div>
      <div style="flex:1"><b>${l}</b>
        <div style="font-size:13px;color:var(--ink-soft);line-height:1.3">${c}</div></div>
      ${u}
    </div>`,a=Mt(`
    ${Ln()}
    <h2>🛠️ ${w("island.title")}</h2>
    <div class="tagline" style="margin-bottom:8px">${w("island.sub")}</div>
    <div class="menu-row" style="margin-bottom:10px">
      <div class="chip"><span class="chip-icon">🔨</span>${w("island.progress",{n:s,total:e.length})}</div>
      <div class="chip"><span class="chip-icon">🍌</span>${i.bananas}</div>
    </div>
    <div class="card">
      ${e.map(o=>{if(o.state==="built")return r(o.emoji,w("build."+o.id),w(`build.${o.id}_desc`),'<div style="font-size:22px">✅</div>');if(o.state==="unlocked"){const l=i.bananas>=o.playerCost;return r(o.emoji,w("build."+o.id),w(`build.${o.id}_desc`),`<button class="btn ${l?"green":"soft"}" data-fund="${o.id}">🍌 ${o.playerCost}</button>`)}return r("❓",w("island.locked_name"),w("island.locked_hint"),"",!0)}).join("")}
    </div>
  `);a.querySelector("#scr-back").addEventListener("click",t);for(const o of a.querySelectorAll("[data-fund]"))o.addEventListener("click",()=>{const l=e.find(c=>c.id===o.dataset.fund);if(i.bananas<l.playerCost){K.sfx("boop"),Ma(w("shop.too_pricey"));return}K.sfx("click"),n(l.id)})}function Py(i){let e=0;const t=[w("finale.1"),w("finale.2"),w("finale.3"),w("finale.4")],n=["🦀","🦀","🦀","🐵"],s=Mt(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center">
      <div id="story-face" style="font-size:64px">${n[0]}</div>
      <div id="story-text" style="font-size:20px;font-weight:700;line-height:1.4;min-height:64px">${t[0]}</div>
    </div>
    <button class="btn green" id="story-next">${w("ui.ok")} →</button>
    <div style="flex:2"></div>
  `);s.querySelector("#story-next").addEventListener("click",()=>{if(K.sfx("click"),e++,e>=t.length){i();return}s.querySelector("#story-face").textContent=n[e],s.querySelector("#story-text").innerHTML=t[e],e===t.length-1&&(s.querySelector("#story-next").textContent="🎪 "+w("title.start"))})}function ky({report:i,onClose:e}){const t=new Set(i.gems.lit);let n='<div class="gem-cell head">×</div>';for(let r=1;r<=10;r++)n+=`<div class="gem-cell head">${r}</div>`;for(let r=1;r<=10;r++){n+=`<div class="gem-cell head">${r}</div>`;for(let a=1;a<=10;a++){const o=t.has(`${r}x${a}`);n+=`<div class="gem-cell ${o?"lit":""}">${o?"💎":r*a}</div>`}}Mt(`
    ${Ln()}
    <h2>🌳 ${w("gems.title")}</h2>
    <div class="tagline" style="margin-bottom:8px">${w("gems.sub")}</div>
    <div class="chip" style="margin-bottom:10px">💎 ${w("gems.count",{n:i.gems.lit.length,total:i.gems.total})}</div>
    <div class="card" style="display:flex;justify-content:center"><div id="gem-grid">${n}</div></div>
    <div class="card">
      <h3>${w("gems.skills")}</h3>
      ${Object.entries(i.worlds).map(([r,a])=>`
        <div style="margin-bottom:8px">
          <div style="font-weight:900">${Sy[r]} ${w("world."+r)}</div>
          ${a.skills.map(o=>`
            <div class="skill-row">
              <div class="s-name">${w(o.nameKey)}</div>
              <div class="s-bar"><div class="s-fill" style="width:${Math.round(Math.min(1,Math.max(0,(o.rating-400)/600))*100)}%"></div></div>
              <div class="s-star">${o.mastered?"🌟":o.n>0?"🌱":"·"}</div>
            </div>`).join("")}
        </div>`).join("")}
    </div>
  `).querySelector("#scr-back").addEventListener("click",e)}function St(i){const e=(Number(i||0)/100).toFixed(2);return`€${(cn().lang||"en")==="en"?e:e.replace(".",",")}`}function Eh(i){if(!i)return null;const e=kn("NL_PO").objectives.find(t=>t.id===i);return e?.titleKey?w(e.titleKey):null}function Th(i){return Eh(Ui[i]?.objectiveId)}function vc(i){return Eh(i?.objectiveId)||Th(i?.mode)||(i?.kind==="payment"?w("business.pay"):null)||(i?.kind==="prep"?w("business.prep"):null)||w("business.order")}function Ly({order:i,customerName:e,activeTask:t,bakeStatus:n="raw",onPrep:s,onPay:r,onServe:a,onExit:o}){const l=jn[i.recipeId],c=l.kind==="pizza"?"business.zone.pizzeria":"business.zone.bakery",u=t||i.tasks[0],d=u&&u.kind==="prep",h=u&&u.kind==="payment",f=Mt(`
    <div class="business-panel">
      <div class="business-head">
        <h2>${w(c)}</h2>
        <button class="round-btn" id="business-close" aria-label="${fe(w("nav.close"))}">x</button>
      </div>
      <div class="card business-order-card">
        <div class="chip">${fe(e)}</div>
        <h3>${w("business.order")}: ${w(l.titleKey)}</h3>
        <div class="business-price">${w("business.pay")}: ${St(i.priceCents)}</div>
        <div class="business-bake business-bake-${n}">${w("business.bake."+n)}</div>
        <div class="menu-row">
          <button class="btn green" id="business-prep" ${d?"":"disabled"}>${w("business.prep")}</button>
          <button class="btn soft" id="business-pay" ${h?"":"disabled"}>${w("business.pay")}</button>
          <button class="btn green" id="business-serve">${w("business.serve")}</button>
        </div>
        <div class="tagline">${fe(vc(u))}</div>
      </div>
    </div>
  `,"business-screen");f.querySelector("#business-prep").addEventListener("click",()=>{d&&s?.(u)}),f.querySelector("#business-pay").addEventListener("click",()=>{h&&r?.(u)}),f.querySelector("#business-serve").addEventListener("click",a),f.querySelector("#business-close").addEventListener("click",o)}function ds(i,e,t){const n=Number(i),s=Number.isFinite(n)?[n,...e.map(r=>n+r)].filter(r=>r>=0):t;return[...new Set(s.map(r=>Number(r)))].sort((r,a)=>r-a)}function Dy(i,e){for(const t of i.closest(".card")?.querySelectorAll(e)||[])t.classList.remove("equipped");i.classList.add("equipped")}function ls(i,e,t,n){return`
    <button class="tile pressable" data-${i}="${fe(e)}">
      <div class="t-icon">${fe(t)}</div>
      ${n?`<div class="t-name">${fe(n)}</div>`:""}
    </button>`}function ti(i,e,t){for(const n of i.querySelectorAll(e))n.addEventListener("click",()=>{t(n),Dy(n,e)})}const rd={portion_halves_quarters:{prompt:()=>w("business.prep.portion"),controls(i){const e=i.expected||{},t=[...new Set([2,4,6,8,Number(e.slices)].filter(Number.isFinite))].sort((s,r)=>s-r),n=[...new Set(["cheese","tomato",e.topping].filter(Boolean))];return`
        <div class="business-choice-grid">
          ${t.map(s=>ls("slices",s,s,w("business.prep.pieces"))).join("")}
        </div>
        <div class="business-choice-grid">
          ${n.map(s=>ls("topping",s,s==="tomato"?"🍅":"🧀",w("business.ingredient."+s))).join("")}
        </div>`},bind(i,e){ti(i,"[data-slices]",t=>{e.slices=Number(t.dataset.slices)}),ti(i,"[data-topping]",t=>{e.topping=t.dataset.topping})},submit:i=>({slices:i.slices,topping:i.topping})},repeated_addition_orders:{prompt:i=>w("business.prep.repeat",{trays:i.expected?.trays??0,perTray:i.expected?.perTray??0}),controls(i){const e=i.expected||{};return`
        <div class="business-choice-grid">
          ${ds((e.trays||0)*(e.perTray||0),[-2,-1,1,2],[4,6,8,12]).map(n=>ls("total",n,n,w("business.prep.total"))).join("")}
        </div>`},bind(i,e){ti(i,"[data-total]",t=>{e.total=Number(t.dataset.total)})},submit:i=>({total:i.total})},recipe_measure_whole:{prompt:()=>w("business.prep.measure"),controls(i){const e=i.expected||{},t=[...new Set(["flour","dough","milk",e.ingredient].filter(Boolean))],n=ds(e.amount,[-2,-1,1,2],[1,2,3,4]),s=w("business.unit."+(e.unit||"amount"));return`
        <div class="business-choice-grid">
          ${t.map(r=>ls("ingredient",r,"🥣",w("business.ingredient."+r))).join("")}
        </div>
        <div class="business-choice-grid">
          ${n.map(r=>ls("amount",r,r,s)).join("")}
        </div>`},bind(i,e,t){e.unit=t.expected?.unit,ti(i,"[data-ingredient]",n=>{e.ingredient=n.dataset.ingredient}),ti(i,"[data-amount]",n=>{e.amount=Number(n.dataset.amount)})},submit:i=>({ingredient:i.ingredient,amount:i.amount,unit:i.unit})},fraction_of_quantity_recipe:{prompt:i=>{const e=i.expected||{};return w("business.prep.fraction",{num:e.numerator??1,den:e.denominator??1,of:e.of??0})},controls(i){const e=i.expected||{},t=(e.of||0)*(e.numerator||0)/(e.denominator||1);return`
        <div class="business-choice-grid">
          ${ds(t,[-2,-1,1,2],[1,2,3,4]).map(s=>ls("amount",s,s,w("business.prep.total"))).join("")}
        </div>`},bind(i,e){ti(i,"[data-amount]",t=>{e.amount=Number(t.dataset.amount)})},submit:i=>({amount:i.amount})},scale_recipe:{prompt:i=>w("business.prep.scale",{factor:i.expected?.factor??1}),controls(i){const e=i.expected||{},t=e.factor||1;return Object.entries(e.base||{}).map(([n,s])=>`
        <div class="tagline">${fe(w("business.ingredient."+n))}</div>
        <div class="business-choice-grid">
          ${ds(s*t,[-1,1],[s]).map(r=>`
            <button class="tile pressable" data-scale-ingredient="${fe(n)}" data-scale-amount="${r}">
              <div class="t-icon">${r}</div>
            </button>`).join("")}
        </div>`).join("")},bind(i,e){e.ingredients={};for(const t of i.querySelectorAll("[data-scale-ingredient]"))t.addEventListener("click",()=>{const n=t.dataset.scaleIngredient;e.ingredients[n]=Number(t.dataset.scaleAmount);for(const s of i.querySelectorAll(`[data-scale-ingredient="${n}"]`))s.classList.remove("equipped");t.classList.add("equipped")})},submit:i=>({ingredients:{...i.ingredients||{}}})}};function Ah(i,{task:e,view:t,action:n,doneId:s,onSubmit:r,onClose:a}){i.querySelector("#scr-back").addEventListener("click",a),t.bind(i,n,e);const o=i.querySelector("#business-feedback"),l=u=>{o.textContent=u,o.hidden=!1},c=()=>w("business.hint."+e.mode);i.querySelector("#business-hint").addEventListener("click",()=>l(c())),i.querySelector("#"+s).addEventListener("click",()=>{const u=r?.(t.submit(n));u&&u.correct===!1&&!u.handled&&l(`${w("business.almost")} ${c()}`)})}function Fy({task:i,onSubmit:e,onClose:t}){const n=rd[i?.mode]||rd.portion_halves_quarters,s={},r=Mt(`
    ${Ln(t,"←")}
    <h2>${w("business.prep")}</h2>
    <div class="tagline">${fe(vc(i))}</div>
    <div class="card">
      <p class="business-prompt">${fe(n.prompt(i))}</p>
      ${n.controls(i)}
      <div class="business-feedback" id="business-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="business-hint">💡</button>
        <button class="btn green" id="business-prep-done">${w("business.done")}</button>
      </div>
    </div>
  `);Ah(r,{task:i,view:n,action:s,doneId:"business-prep-done",onSubmit:e,onClose:t})}const Iy=[500,200,100,50,20,10,5],ad={money_make_amounts:{controls(i){const e=i.expected?.amountCents??0;return`
        <p class="business-prompt">${fe(w("business.pay.make",{amount:St(e)}))}</p>
        <div class="business-price">${w("business.pay.total")}:
          <span id="pay-total">${St(0)}</span> / ${St(e)}</div>
        <div class="business-money-row">
          ${Iy.map(t=>`<button class="btn soft" data-money="${t}">${St(t)}</button>`).join("")}
        </div>
        <div class="menu-row">
          <button class="btn soft" id="pay-reset">${w("business.pay.reset")}</button>
        </div>`},bind(i,e){e.amountCents=0;const t=i.querySelector("#pay-total"),n=()=>{t.textContent=St(e.amountCents)};for(const s of i.querySelectorAll("[data-money]"))s.addEventListener("click",()=>{e.amountCents+=Number(s.dataset.money),n()});i.querySelector("#pay-reset").addEventListener("click",()=>{e.amountCents=0,n()})},submit:i=>({amountCents:i.amountCents||0})},decimal_money_change:{controls(i){const e=i.expected||{},t=(e.paidCents??0)-(e.changeCents??0),n=ds(e.changeCents,[-100,-50,50,100],[0,50,100,250]);return`
        <div class="business-price">${w("business.order")}: ${St(t)}</div>
        <p class="business-prompt">${fe(w("business.pay.change",{paid:St(e.paidCents??0)}))}</p>
        <div class="business-money-row">
          ${n.map(s=>`<button class="btn soft" data-change="${s}">${St(s)}</button>`).join("")}
        </div>`},bind(i,e,t){e.paidCents=t.expected?.paidCents,ti(i,"[data-change]",n=>{e.changeCents=Number(n.dataset.change)})},submit:i=>({paidCents:i.paidCents,changeCents:i.changeCents})},percentage_discount:{controls(i){const e=i.expected||{},t=ds(e.finalCents,[-100,-50,50,100],[100,250,500,1e3]);return`
        <p class="business-prompt">${fe(w("business.pay.discount",{percent:e.percent??10,was:St(e.originalCents??0)}))}</p>
        <div class="business-money-row">
          ${t.map(n=>`<button class="btn soft" data-final="${n}">${St(n)}</button>`).join("")}
        </div>`},bind(i,e){ti(i,"[data-final]",t=>{e.finalCents=Number(t.dataset.final)})},submit:i=>({finalCents:i.finalCents})}};function Uy({task:i,onSubmit:e,onClose:t}){const n=ad[i?.mode]||ad.money_make_amounts,s={},r=Mt(`
    ${Ln(t,"←")}
    <h2>${w("business.pay")}</h2>
    <div class="tagline">${fe(vc(i))}</div>
    <div class="card">
      ${n.controls(i)}
      <div class="business-feedback" id="business-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="business-hint">💡</button>
        <button class="btn green" id="business-payment-done">${w("business.done")}</button>
      </div>
    </div>
  `);Ah(r,{task:i,view:n,action:s,doneId:"business-payment-done",onSubmit:e,onClose:t})}function By({business:i,onRestock:e,onClose:t}){const n=Math.max(1,i.stockLimit||1),s=Mt(`
    ${Ln()}
    <h2>${w("business.stock")}</h2>
    <div class="chip">${w("business.profit")}: ${St(i.shopCoins)}</div>
    <div class="card">
      ${Object.values(Pa).map(r=>{const a=i.stock[r.id]||0;return`
          <div class="skill-row">
            <div class="s-name">${w(r.titleKey)}</div>
            <div class="s-bar"><div class="s-fill" style="width:${Math.round(a/n*100)}%"></div></div>
            <div class="curriculum-count">${a}/${n}</div>
            <button class="btn soft" data-restock="${r.id}">${w("business.restock")}</button>
          </div>`}).join("")}
    </div>
  `);s.querySelector("#scr-back").addEventListener("click",t);for(const r of s.querySelectorAll("[data-restock]"))r.addEventListener("click",()=>e?.(r.dataset.restock))}function Ny({business:i,onBuy:e,onClose:t}){const n=Array.isArray(i.upgrades)?i.upgrades:[],s=Mt(`
    ${Ln()}
    <h2>${w("business.upgrades")}</h2>
    <div class="chip">${w("business.profit")}: ${St(i.shopCoins)}</div>
    <div class="card">
      ${Object.values(eh).map(r=>{const a=n.includes(r.id);return`
          <div class="skill-row">
            <div class="s-name">${w(r.titleKey)}</div>
            <div class="curriculum-count">${a?w("business.done"):St(r.priceCents)}</div>
            ${a?"":`<button class="btn soft" data-upgrade="${r.id}">${w("business.buy")}</button>`}
          </div>`}).join("")}
    </div>
  `);s.querySelector("#scr-back").addEventListener("click",t);for(const r of s.querySelectorAll("[data-upgrade]"))r.addEventListener("click",()=>e?.(r.dataset.upgrade))}const Oy={profit_margin:{prompt:i=>w("business.review.profit",{rev:St(i.revenueCents),cost:St(i.costCents)}),label:i=>St(i)},demand_chart:{prompt:()=>w("business.review.demand"),label:i=>w(jn[i]?.titleKey||i)},unit_conversion_stock:{prompt:i=>w("business.review.convert",{kg:i.kg}),label:i=>w("business.review.grams",{n:i})},price_compare:{prompt:()=>w("business.review.compare"),label:(i,e)=>{const t=i==="A"?e.a:e.b;return w("business.review.pack",{count:t.count,price:St(t.cents)})}}};function zy({report:i,review:e=[],onReview:t,onDone:n}){const s=e.map((a,o)=>{const l=Oy[a.mode];return l?`
      <div class="card business-review" data-review-index="${o}">
        <p class="business-prompt">${fe(l.prompt(a))}</p>
        <div class="business-money-row">
          ${a.options.map(c=>`
            <button class="btn soft" data-review-value="${fe(c)}">${fe(l.label(c,a))}</button>
          `).join("")}
        </div>
      </div>`:""}).join(""),r=Mt(`
    <div style="flex:1"></div>
    <h2>${w("business.summary")}</h2>
    <div class="card business-summary">
      <div class="reward-item">${w("business.orders_served",{n:i.ordersServed})}</div>
      <div class="reward-item">${w("business.profit")}: ${St(i.profitCents)}</div>
    </div>
    ${s}
    <button class="btn green" id="business-done">${w("business.done")}</button>
    <div style="flex:2"></div>
  `);for(const a of r.querySelectorAll("[data-review-index]")){const o=e[Number(a.dataset.reviewIndex)];for(const l of a.querySelectorAll("[data-review-value]"))l.addEventListener("click",()=>{if(a.dataset.answered)return;a.dataset.answered="1";const c=t?.(o,l.dataset.reviewValue);for(const u of a.querySelectorAll("[data-review-value]"))u.disabled=!0;l.classList.add(c?"correct":"wrong")})}r.querySelector("#business-done").addEventListener("click",n)}function Rh(i){return`${i.countryKey?w(i.countryKey):i.countryCode||i.id} - ${w(i.titleKey)}`}function Gy(i,e){const t=i.stages.find(n=>n.id===e);return t?w(t.labelKey):w(i.fallbackStagePrefixKey||"curriculum.stage",{n:"?"})}function Hy(i,e,t=null,n=!1){if(!i?.curriculum||!e)return"";const s=kn(i.curriculum.packId),r=Xd(),a=Fv(s.id,e,{business:t}),o=i.curriculum.confirmedStage||i.curriculum.estimatedStage,l=i.curriculum.strictness||"soft";return`
    <div class="card">
      <h3>${fe(w("parents.curriculum"))}</h3>
      <div class="curriculum-meta">
        <div class="chip">${fe(w("parents.country"))}: ${fe(s.countryKey?w(s.countryKey):s.countryCode||s.id)}</div>
        <div class="chip">${fe(w("parents.curriculum_pack"))}: ${fe(w(s.titleKey))}</div>
        ${i.curriculum.birthDate?`<div class="chip">${fe(w("parents.birthday"))}: ${fe(i.curriculum.birthDate)}</div>`:""}
        <div class="chip">${fe(w("parents.stage"))}: ${fe(Gy(s,o))}</div>
      </div>
      ${n?`<div class="curriculum-controls">
        <label>
          <span>${fe(w("parents.curriculum_pack"))}</span>
          <select data-pack>
            ${r.map(c=>`<option value="${fe(c.id)}" ${c.id===s.id?"selected":""}>${fe(Rh(c))}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>${fe(w("parents.birthday"))}</span>
          <input type="date" data-birth-date value="${fe(i.curriculum.birthDate||"")}">
        </label>
        <label>
          <span>${fe(w("parents.stage"))}</span>
          <select data-stage>
            ${s.stages.map(c=>`<option value="${fe(c.id)}" ${c.id===o?"selected":""}>${fe(w(c.labelKey))}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>${fe(w("parents.strictness"))}</span>
          <select data-strictness>
            <option value="soft" ${l==="soft"?"selected":""}>${fe(w("parents.strictness_soft"))}</option>
            <option value="strict" ${l==="strict"?"selected":""}>${fe(w("parents.strictness_strict"))}</option>
          </select>
        </label>
      </div>`:""}
      <div class="tagline" style="color:var(--ink-soft);text-shadow:none;margin-bottom:8px">${fe(w("parents.coverage"))}</div>
      ${Object.values(a.domains).filter(c=>c.total>0).map(c=>`
        <div class="curriculum-domain">
          <div class="skill-row">
            <div class="s-name">${fe(w(c.labelKey))}</div>
            <div class="s-bar"><div class="s-fill" style="width:${Math.round(c.covered/Math.max(1,c.total)*100)}%"></div></div>
            <div class="curriculum-count">${c.covered}/${c.total}</div>
          </div>
          <div class="curriculum-objectives">
            ${c.objectives.map(u=>`<span class="curriculum-pill ${u.coverage}">${fe(w(u.titleKey))} · ${fe(w(`parents.${u.coverage}`))}</span>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>`}function Vy(i){if(!i)return"";const e=Object.entries(i.modes||{});return`
    <div class="card">
      <h3>${fe(w("parents.business"))}</h3>
      <div class="curriculum-meta">
        <div class="chip">${fe(w("business.orders_served",{n:i.ordersServed||0}))}</div>
        <div class="chip">${fe(w("business.profit"))}: ${fe(St(i.profitCents))}</div>
      </div>
      <div class="curriculum-objectives">
        ${e.map(([t,n])=>{const s=n?.coverage||"partial",r=Th(t)||w("parents.business");return`<span class="curriculum-pill ${fe(s)}">${fe(r)} · ${fe(w(`parents.${s}`))}</span>`}).join("")}
      </div>
    </div>`}function Wy({report:i,profile:e,businessReport:t=null,onClose:n,onCurriculumChange:s}){const r=Mt(`
    ${Ln()}
    <h2>${w("parents.title")}</h2>
    <div class="card"><p style="margin:0;font-size:15px;line-height:1.5">${w("parents.body")}</p></div>
    ${e&&i?`
    ${Hy(e,i,t,!!s)}
    ${Vy(t)}
    <div class="card">
      <h3>${w("parents.skills")} — ${fe(e.name)}</h3>
      ${Object.entries(i.worlds).map(([a,o])=>o.skills.filter(l=>l.n>0).map(l=>`
        <div class="skill-row">
          <div class="s-name">${w(l.nameKey)}</div>
          <div class="s-bar"><div class="s-fill" style="width:${Math.round(l.acc10*100)}%"></div></div>
          <div style="font-size:12px;color:var(--ink-soft);min-width:90px;text-align:right">
            ${Math.round(l.acc10*100)}% · ${w("parents.attempts",{n:l.n})}${l.mastered?" · 🌟":""}
          </div>
        </div>`).join("")).join("")||'<p style="font-size:14px;color:var(--ink-soft)">—</p>'}
    </div>`:""}
  `);r.querySelector("#scr-back").addEventListener("click",n),r.querySelector("[data-pack]")?.addEventListener("change",a=>{s?.({packId:a.target.value})}),r.querySelector("[data-birth-date]")?.addEventListener("change",a=>{s?.({birthDate:a.target.value})}),r.querySelector("[data-stage]")?.addEventListener("change",a=>{s?.({confirmedStage:a.target.value})}),r.querySelector("[data-strictness]")?.addEventListener("change",a=>{s?.({strictness:a.target.value})})}function $y({rewards:i,onNext:e,onHome:t}){const n=Mt(`
    <div style="flex:1"></div>
    <h2>${w("result.title")}</h2>
    <div id="result-chest">🎁</div>
    <div class="tagline" id="chest-hint">${w("result.tap_chest")}</div>
    <div class="reward-row hidden" id="reward-row"></div>
    <div class="menu-row hidden" id="result-btns" style="margin-top:18px">
      <button class="btn green" id="res-next">${w("result.next")} →</button>
      <button class="btn soft" id="res-home">🏝️ ${w("result.home")}</button>
    </div>
    <div style="flex:2"></div>
  `),s=n.querySelector("#result-chest");s.addEventListener("click",()=>{if(s.dataset.open)return;s.dataset.open="1",s.textContent="🎉",K.sfx("chest"),n.querySelector("#chest-hint").classList.add("hidden");const r=n.querySelector("#reward-row");r.classList.remove("hidden"),r.innerHTML=i.map(a=>`<div class="reward-item">${a}</div>`).join(""),n.querySelector("#result-btns").classList.remove("hidden")},{once:!1}),n.querySelector("#res-next").addEventListener("click",e),n.querySelector("#res-home").addEventListener("click",t)}function fe(i){return String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}class qy{constructor(e){this.game=e,this.businessAttempts=[],this.businessCustomer=null,this.bakeStatus="raw",this.bakeTimer=0,this.bakeSteam=0,this.bakeTicker=null}resetBake(){this.bakeStatus="raw",this.bakeTimer=0,this.bakeSteam=0}bakePrepDone(e){const t=(e?.tasks||[]).find(n=>n.kind==="prep");return!t||!!t.businessDone}ensureBakeTicker(){this.bakeTicker||!this.game.place?.addEntity||(this.bakeTicker={update:e=>{this.bakeStatus==="baking"&&(this.bakeTimer-=e,this.bakeSteam-=e,this.bakeSteam<=0&&(this.emitSteam(),this.bakeSteam=260),this.bakeTimer<=0&&this.finishBake())}},this.game.place.addEntity(this.bakeTicker))}emitSteam(){const e=this.game.place,t=e?.activeStations?.oven;if(!t||!e.fx||!e.worldPos)return;const n=e.worldPos(t.x,t.z,1.1);e.fx.emit(n,6,{colors:[16777215,15790320,14869218],speed:.45,up:1.6,life:1300,spread:.4})}startBake(){const e=Wt(this.game.profile);this.bakeStatus="baking",this.bakeTimer=Kv(e),this.bakeSteam=0,this.ensureBakeTicker(),K.sfx("click"),Qe(w("business.bake.baking"))}finishBake(){this.bakeStatus="ready",this.bakeTimer=0,K.sfx("coin"),Qe(w("business.bake.ready"))}tapOven(){const t=Wt(this.game.profile).activeOrder;if(!t){this.showBusinessOrderPanel();return}if(this.bakeStatus==="baking"){Qe(w("business.bake.baking"));return}if(this.bakeStatus==="ready"){Qe(w("business.bake.ready"));return}if(!this.bakePrepDone(t)){K.sfx("boop"),Qe(w("business.bake.prep_first"));return}this.startBake()}resumeBusinessOrder(e){const t=e.activeOrder;th(e,t),e.queue=[t],this.businessAttempts=[],this.resetBake(),this.game.place?.clearCustomers?.(),this.game.place?.setActiveRecipe?.(t.recipeId),this.businessCustomer=this.game.place?.spawnCustomer?.(t.customerId)||null,Ve(),this.announceBusinessOrder(t)}startNextBusinessOrder(){const e=Wt(this.game.profile);if(e.activeOrder?.tasks?.length){this.resumeBusinessOrder(e);return}if((e.day?.ordersServed||0)>=mt.businessOrdersPerDay){this.endBusinessDay();return}const t=new qn(`business:${this.game.profile.id}:${e.currentDay}:${e.day.ordersServed}`),n=Yv(e,this.game.profile.curriculum,{rng:t});e.activeOrder=n,e.queue=[n],this.businessAttempts=[],this.resetBake(),this.game.place?.clearCustomers?.(),this.game.place?.setActiveRecipe?.(n.recipeId),this.businessCustomer=this.game.place?.spawnCustomer?.(n.customerId)||null,Ve(),this.announceBusinessOrder(n)}announceBusinessOrder(e){e&&Qe(e.supplied?w("business.supplied"):w("business.order_ready"))}showBusinessOrderPanel(){const t=Wt(this.game.profile).activeOrder;if(!t){this.startNextBusinessOrder();return}const n=Jd[t.customerId];Ly({order:t,customerName:w(n?.nameKey||"business.order"),activeTask:this.nextOpenBusinessTask(t)||{kind:"done",mode:"ready"},bakeStatus:this.bakeStatus,onPrep:s=>this.handleBusinessPrep(s),onPay:s=>this.handleBusinessPayment(s),onServe:()=>this.serveBusinessOrder(),onExit:()=>this.leaveBusiness()})}nextOpenBusinessTask(e){return(e?.tasks||[]).find(t=>(t.kind==="prep"||t.kind==="payment")&&!t.businessDone)||null}handleBusinessPrep(e){!e||e.kind!=="prep"||Fy({task:e,onClose:()=>this.showBusinessOrderPanel(),onSubmit:t=>{const n=Wt(this.game.profile),s=n.activeOrder;if(!s||e.kind!=="prep")return{correct:!1,handled:!0};const r=Zv(n,s,e,t);return this.businessAttempts.push(r),Ve(),r.correct?(e.businessDone=!0,K.sfx("correct"),Qe(w("business.done")),this.showBusinessOrderPanel(),{correct:!0}):(K.sfx("boop"),r.reason==="stock"?(Qe(w("business.stock")),this.showBusinessOrderPanel(),{correct:!1,handled:!0}):{correct:!1})}})}handleBusinessPayment(e){!e||e.kind!=="payment"||Uy({task:e,onClose:()=>this.showBusinessOrderPanel(),onSubmit:t=>{const n=Wt(this.game.profile),s=n.activeOrder;if(!s||e.kind!=="payment")return{correct:!1,handled:!0};const r=Qv(n,s,e,t);return this.businessAttempts.push(r),Ve(),r.correct?(e.businessDone=!0,K.sfx("correct"),Qe(w("business.done")),this.showBusinessOrderPanel(),{correct:!0}):(K.sfx("boop"),{correct:!1})}})}serveBusinessOrder(){const e=Wt(this.game.profile),t=e.activeOrder;if(!t)return;if(this.nextOpenBusinessTask(t)){this.showBusinessOrderPanel();return}if(this.bakeStatus!=="ready"){K.sfx("boop"),Qe(w(this.bakeStatus==="baking"?"business.bake.baking":"business.bake.first"));return}const s=sb(e,t,{attempts:this.businessAttempts});e.queue=[],this.businessAttempts=[],this.resetBake(),this.game.place?.clearCustomers?.();const r=this.game.rng.int(mt.businessBananaReward[0],mt.businessBananaReward[1]);Ei(this.game.profile,r),Ve(),this.game.refreshHudCounts(),K.sfx("coin"),Qe(`+${r} 🍌 · ${w("business.profit")}: ${(s.profitCents/100).toFixed(2)}`),(e.day?.ordersServed||0)>=mt.businessOrdersPerDay?this.endBusinessDay():this.startNextBusinessOrder()}openBusinessStock(){const e=Wt(this.game.profile);By({business:e,onRestock:t=>{const n=rb(e,t,1);K.sfx(n.ok?"coin":"boop"),n.ok||Qe(w(n.reason==="full"?"business.stock_full":"business.not_enough")),Ve(),this.openBusinessStock()},onClose:()=>this.showBusinessOrderPanel()})}openBusinessUpgrades(){const e=Wt(this.game.profile);Ny({business:e,onBuy:t=>{const n=ab(e,t);K.sfx(n.ok?"coin":"boop"),n.ok||Qe(w("business.not_enough")),Ve(),this.openBusinessUpgrades()},onClose:()=>this.showBusinessOrderPanel()})}leaveBusiness(){const e=Wt(this.game.profile);return e.queue=e.activeOrder?[e.activeOrder]:[],vn(),this.businessAttempts=[],this.businessCustomer=null,this.game.startHub(),!0}requestEndBusinessDay(){return Wt(this.game.profile).activeOrder?(K.sfx("boop"),Qe(w("business.serve")),this.showBusinessOrderPanel(),!1):(this.endBusinessDay(),!0)}endBusinessDay(){const e=Wt(this.game.profile);if(e.activeOrder)return K.sfx("boop"),Qe(w("business.serve")),this.showBusinessOrderPanel(),!1;const t=nh(e);e.activeOrder=null,e.queue=[],this.businessAttempts=[],this.game.place?.clearCustomers?.();const n=new qn(`business-review:${this.game.profile.id}:${e.currentDay}`),s=nb(e,this.game.profile.curriculum,{rng:n});zy({report:t,review:s,onReview:(r,a)=>{const o=ib(e,r,a);return K.sfx(o.correct?"correct":"boop"),Ve(),o.correct},onDone:()=>{e.currentDay=(e.currentDay||1)+1,e.day={ordersServed:0,revenueCents:0,costCents:0,profitCents:0,wasteCents:0,demand:{}},vn(),this.game.startHub()}})}businessTap(e,t){if(this.game.mode!=="business")return!1;const n=this.game.place?.stationAt?.(e,t);return n?(K.sfx("click"),n==="pantry"||n==="shopTable"?this.openBusinessStock():n==="orderBoard"?this.openBusinessUpgrades():n==="oven"?this.tapOven():this.showBusinessOrderPanel(),!0):!1}}function jy(i,e,t){const n=[];i.flags?.mimiMet||n.push({key:"mimi.meet"});const s=t.filter(c=>c.state==="unlocked"),r=s.find(c=>i.bananas>=c.playerCost);r?n.push({key:"mimi.build_ready",buildId:r.id}):s.length&&n.push({key:"mimi.need_bananas",buildId:s[0].id,vars:{n:s[0].playerCost-i.bananas}});let a=null;for(const[c,u]of Object.entries(e.worlds))(!a||u.pct<a.pct)&&(a={id:c,pct:u.pct});const o=t.find(c=>c.state==="locked");if(o&&a){const c=o.points-jd(e);c>0&&c<=.5&&n.push({key:"mimi.almost_blueprint",worldId:a.id})}a&&a.pct<1&&n.push({key:"mimi.world_hint",worldId:a.id});const l=i.egg;return l&&l.goal-l.points>0&&l.goal-l.points<=6&&n.push({key:"mimi.egg_soon",vars:{n:l.goal-l.points}}),(i.streak?.count||0)>=3&&n.push({key:"mimi.streak",vars:{n:i.streak.count}}),i.flags?.festivalDone&&n.push({key:"mimi.festival"}),n.push({key:"mimi.chat.1"},{key:"mimi.chat.2"},{key:"mimi.chat.3"}),n}const Ky=[{id:"pink",W:"#ffb3c6"},{id:"blue",W:"#9bd6ff"},{id:"gold",W:"#ffd966"},{id:"lilac",W:"#c9a6ff"}],Xy=[{id:"blue",B:"#7fb8e8",b:"#5e9ed0"},{id:"rose",B:"#f4b8c4",b:"#dd93a6"},{id:"gull",B:"#f4f3ee",b:"#cfd4dd"}];function Ch(i,e,t,n,s){const r=new en,a={castShadow:!1},o=Ni(ur(i,t),{cacheKey:`amb:${n}:a`,...a}),l=Ni(ur(e,t),{cacheKey:`amb:${n}:b`,...a}),c=s/Math.max(i.layers.length,e.layers.length);return o.scale.setScalar(c),l.scale.setScalar(c),l.visible=!1,r.add(o,l),r.userData.frames=[o,l],r}function jl(i,e){i.userData.frames[0].visible=e===0,i.userData.frames[1].visible=e===1}class Yy{constructor(e,t,n){this.place=e,this.rng=t,this.anchors=n;const s=t.pick(Ky);this.mesh=Ch(ba.butterflyOpen,ba.butterflyClosed,{W:s.W},`butterfly:${s.id}`,.22),this.pos=this._spot(),this.mesh.position.copy(this.pos),e.group.add(this.mesh),this.flapT=t.float()*200,this.frame=0,this.bobT=t.float()*10,this.rest=0,this.target=this._spot()}_spot(){const e=this.rng.pick(this.anchors);return new D(e.x+(this.rng.float()-.5)*1.6,.35+this.rng.float()*.8,e.z+(this.rng.float()-.5)*1.6)}update(e){this.flapT+=e;const t=this.rest>0?600:110;if(this.flapT>=t&&(this.flapT=0,this.frame=1-this.frame,jl(this.mesh,this.frame)),this.rest>0){this.rest-=e;return}this.bobT+=e/1e3;const n=this.mesh,s=this.target.x-n.position.x,r=this.target.y-n.position.y,a=this.target.z-n.position.z,o=Math.hypot(s,a);if(o<.12){this.rng.chance(.35)&&(this.rest=800+this.rng.float()*2200,n.position.y=this.target.y),this.target=this._spot();return}const l=(.55+this.rng.float()*.1)*(e/1e3);n.position.x+=s/o*l,n.position.z+=a/o*l,n.position.y+=r*Math.min(1,e/700)+Math.sin(this.bobT*7)*.004,n.rotation.y=Math.atan2(s,a)}}class Zy{constructor(e,t,n,s){this.place=e,this.rng=t,this.openCells=n,this.playerPos=s;const r=t.pick(Xy);this.mesh=Ch(ba.birdSpread,ba.birdFold,{B:r.B,b:r.b},`bird:${r.id}`,.3),e.group.add(this.mesh),this.flapT=0,this.frame=0,this.done=!1,this.groundT=0,this.hop=null;const a=n.length>0&&t.chance(.55);this._fly(this._edgePoint(),a?this._landingSpot():this._edgePoint(),a)}_edgePoint(){const{w:e,d:t}=this.place.size,n=this.rng.int(0,3),s=(this.rng.float()-.5)*e,r=(this.rng.float()-.5)*t,a=n===0?-e/2-3:n===1?e/2+3:s,o=n===2?-t/2-3:n===3?t/2+3:r;return new D(a,2.4+this.rng.float()*1.2,o)}_landingSpot(){const e=this.rng.pick(this.openCells);return this.place.worldPos(e.x,e.z,.04)}_fly(e,t,n){this.state="fly",this.landing=n,this.from=e,this.to=t,this.ctrl=new D((e.x+t.x)/2+(this.rng.float()-.5)*4,Math.max(e.y,t.y)+1.2+this.rng.float()*1,(e.z+t.z)/2+(this.rng.float()-.5)*4);const s=e.distanceTo(this.ctrl)+this.ctrl.distanceTo(t);this.flyMs=s/4.2*1e3,this.t=0,this.mesh.position.copy(e)}_takeOff(){this._fly(this.mesh.position.clone(),this._edgePoint(),!1)}update(e){if(this.done)return;const t=this.mesh;if(this.flapT+=e,this.state==="fly"){this.flapT>=110&&(this.flapT=0,this.frame=1-this.frame,jl(t,this.frame)),this.t+=e/this.flyMs;const s=Math.min(1,this.t),r=this.from,a=this.ctrl,o=this.to,l=1-s,c=l*l*r.x+2*l*s*a.x+s*s*o.x,u=l*l*r.y+2*l*s*a.y+s*s*o.y,d=l*l*r.z+2*l*s*a.z+s*s*o.z;t.rotation.y=Math.atan2(c-t.position.x,d-t.position.z),t.position.set(c,u,d),s>=1&&(this.landing?(this.state="ground",this.groundT=3500+this.rng.float()*5500,jl(t,1)):(this.done=!0,t.removeFromParent()));return}this.bobT=(this.bobT||0)+e/1e3;const n=this.playerPos?.();if(n&&Math.hypot(n.x-t.position.x,n.z-t.position.z)<2.1){this._takeOff();return}if(this.hop){this.hop.k+=e/240;const s=Math.min(1,this.hop.k);t.position.lerpVectors(this.hop.from,this.hop.to,s),t.position.y=this.hop.from.y+(this.hop.to.y-this.hop.from.y)*s+Math.sin(s*Math.PI)*.22,s>=1&&(this.hop=null);return}if(t.rotation.x=Math.max(0,Math.sin(this.bobT*3.2))*.35,this.groundT-=e,this.groundT<=0){t.rotation.x=0,this._takeOff();return}if(this.rng.chance(e/1400)){const s=Math.round(t.position.x+this.place.size.w/2-.5),r=Math.round(t.position.z+this.place.size.d/2-.5),a=this.rng.shuffle([[1,0],[-1,0],[0,1],[0,-1]]);for(const[o,l]of a){const c=this.place.cellAt(s+o,r+l);if(!(!c||!c.walk||!".,".includes(c.ch))){t.rotation.x=0,t.rotation.y=Math.atan2(o,l),this.hop={from:t.position.clone(),to:this.place.worldPos(s+o,r+l,.04),k:0};break}}}}}class Qy{constructor(e,t,n){this.place=e;const s=new en,r=3+t.int(0,1);for(let l=0;l<r;l++){const c=new Ut(new li(1.6+t.float()*1.6,.5+t.float()*.35,.9+t.float()*.7),n);c.position.set((l-(r-1)/2)*1.1,l%2*.3,t.float()*.8-.4),s.add(c)}s.scale.setScalar(.8+t.float()*.7);const{w:a,d:o}=e.size;s.position.set((t.float()-.5)*a,5.5+t.float()*2.2,(t.float()-.5)*o),e.group.add(s),this.mesh=s,this.v=.25+t.float()*.3}update(e){this.mesh.position.x+=this.v*e/1e3,this.mesh.position.x>this.place.size.w/2+6&&(this.mesh.position.x=-this.place.size.w/2-6)}}class Ro{constructor(e,t,{butterflies:n=0,birds:s=0,clouds:r=0,playerPos:a=null}={}){if(this.place=e,this.rng=new qn(t.int(1,1e9)),this.playerPos=a,this.clouds=[],r>0){const c=new js({color:16777215,transparent:!0,opacity:.85});c._owned=!0;for(let u=0;u<r;u++)this.clouds.push(new Qy(e,this.rng,c))}this.openCells=[];for(let c=1;c<e.size.d-1;c++)for(let u=1;u<e.size.w-1;u++){const d=e.cellAt(u,c);d&&d.walk&&d.h===0&&".,".includes(d.ch)&&this.openCells.push({x:u,z:c})}const l=((e.markers.d||[]).length?e.markers.d:this.openCells).map(c=>e.worldPos(c.x,c.z));if(this.butterflies=[],l.length)for(let c=0;c<n;c++)this.butterflies.push(new Yy(e,this.rng,l));this.birds=[],this.birdTimers=[];for(let c=0;c<s;c++)this.birds.push(null),this.birdTimers.push(c===0?600:this.rng.float()*9e3)}update(e){for(const t of this.clouds)t.update(e);for(const t of this.butterflies)t.update(e);for(let t=0;t<this.birds.length;t++){const n=this.birds[t];if(n&&!n.done){n.update(e);continue}this.birdTimers[t]-=e,this.birdTimers[t]<=0&&(this.birds[t]=new Zy(this.place,this.rng,this.openCells,this.playerPos),this.birdTimers[t]=5e3+this.rng.float()*14e3)}}}const Jy={sparkle:16767334,petal:16757702,bubble:10213119,star:13215487},od={tide:{pet:"turtle",face:"🐢",nameKey:"helper.turtle"},garden:{pet:"bunny",face:"🐰",nameKey:"helper.bunny"},stump:{pet:"duckling",face:"🐥",nameKey:"helper.duckling"},vines:{pet:"owl",face:"🦉",nameKey:"helper.owl"}};class eS{constructor(){this.canvas=document.getElementById("game-canvas"),this.world=new Tb(this.canvas),this.profile=null,this.mode="title",this.place=null,this.player=null,this.pet=null,this.particles=null,this.verb=null,this.problem=null,this.crabs=[],this.combo=0,this.solvedInChamber=0,this.chamberIndex=0,this.pendingEcho=!1,this.isEcho=!1,this.currentWorld=null,this.pauseUntil=0,this.problemStart=0,this.usedHint=!1,this.rewards=[],this.rng=new qn(Math.random()*2**31>>>0),this.chamberRng=this.rng,this.trailT=0,this.sessionStart=performance.now(),this.duel=null,this.pickups=[],this.flowToken=0,this.mimiChat=0,this.talkCooldown=0,this.hubWelcomed=!1,this.talkBtn=null,this.gestureHintDone=!1,this.userZoom=null,this.business=null}boot(){Gi(),cs(),hh({onHint:()=>this.useHint(),onAction:()=>this.mode==="hub"?this.hubAction():this.verb?.onAction(),onHome:()=>this.confirmHome(),onSettings:()=>this.openSettings()}),this.bindInput(),this.showTitle();const e=()=>{K.init(),K.setSfx(cn().sfx),K.setMusic(cn().music),window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e)};window.addEventListener("pointerdown",e),window.addEventListener("keydown",e);let t=performance.now();const n=s=>{requestAnimationFrame(n);let r=Math.min(50,s-t);if(t=s,s<this.pauseUntil){this.world.update(0);return}Ux(r),this.update(r),this.world.update(r)};requestAnimationFrame(n),setInterval(()=>{this.profile&&this.mode!=="title"&&document.visibilityState==="visible"&&(this.profile.stats.msPlayed+=1e4,Ve())},1e4),window.addEventListener("beforeunload",()=>vn())}showTitle(){this.mode="title",this.flowToken++,this.hubWelcomed=!1,Gn(!1),this.clearPlace(),this.player=null,this.pet=null,K.music(null),this.buildAttractIsland();const e=()=>{const n=lr();Wy({report:n?yi(n.math):null,profile:n,businessReport:n?.business?nh(n.business):null,onCurriculumChange:s=>{if(!n)return;const{birthDate:r,packId:a,...o}=s,l=n.curriculum?.packId;let c=a&&a!==l?Uv(n.curriculum,a):n.curriculum;r!==void 0&&(c=Qd({...c,birthDate:r||null},$u())),s.confirmedStage!==void 0&&(o.stageSource=s.confirmedStage===n.curriculum?.estimatedStage?"auto":"parent"),n.curriculum={...c,...o},vn(),e()},onClose:()=>this.showTitle()})};wh({onStart:()=>Wl({onPlay:(n,s)=>{if(this.profile=pb(n),!this.profile)return;const r=()=>{this.profile.flags.introSeen=!0,Ve(),this.needsWarmup()?this.startWarmupThenHub():this.startHub()};s||!this.profile.flags.introSeen?My(r):this.needsWarmup()?this.startWarmupThenHub():this.startHub()},onParents:e,onDuel:()=>this.startDuelSetup()}),onParents:e,onDuel:()=>this.startDuelSetup()})}needsWarmup(e=this.profile){return e?.curriculum?.ageAtStart!=null&&!e.curriculum?.warmup?.completed}startWarmupThenHub(){let e=!1;const t=c=>{e||(e=!0,c?.())},n=this.profile.curriculum?.warmup||{},s=Array.isArray(n.skillIds)?n.skillIds.slice(0,3):[],r=s.length?s:$r(this.profile.curriculum).slice(0,3),a=r.length?r:["add_20","sub_20","tables_a"],o=Array.isArray(n.results)?n.results.slice(0,a.length):[];if(o.length>=a.length){this.profile.curriculum=qr(this.profile.curriculum,o,{skillIds:a}),Ve(),t(()=>this.startHub());return}const l=a.map((c,u)=>Ri(this.profile.math,{skill:c,kind:"fetch",rng:new qn(`warmup:${this.profile.id}:${c}:${u}`)})).slice(o.length);wy({problems:l,onAnswer:({problem:c,correct:u})=>{o.push({skill:c.skillId,correct:u}),Ou(this.profile.math,c,{correct:u,ms:0,usedHint:!1}),this.profile.curriculum=qr(this.profile.curriculum,o,{completed:!1,skillIds:a}),Ve()},onDone:()=>{this.profile.curriculum=qr(this.profile.curriculum,o,{skillIds:a}),Ve(),t(()=>this.startHub())},onSkip:()=>{this.profile.curriculum=qr(this.profile.curriculum,o,{skillIds:a}),Ve(),t(()=>this.startHub())}})}buildAttractIsland(){const e={tide:1,garden:1,stump:1,vines:1};this.place=new td(this.world,e,{built:Ps.map(d=>d.id),unlocked:[],crabKing:!0,festival:!0},{}),this.particles=new Qr(this.place.group),this.place.fx=this.particles;const t=lr(),n=this.makeMonkeyMesh(t?.avatar);this.player=new nd(n),this.player.headH=.95,this.player.sfx=!1;const s=(this.place.markers.P||[{x:11,z:11}])[0];this.player.setPlace(this.place,s.x,s.z),this.player.onArrive=(d,h)=>this.pet?.notePlayerAt(d,h),this.place.playerAt=()=>this.player?{x:this.player.x,z:this.player.z}:null;const r=t?t.avatar.pet:"bunny",a=r?ki.find(d=>d.id===r):null;if(a){this.pet=new id(Wn(a.model,.45,null,"pet:"+a.id));const d=this.findFreeNear(s.x,s.z)||s;this.pet.setPlace(this.place,d.x,d.z)}this.world.defaultZoom=1,this.world.follow(this.player.mesh,10.5),this.place.addEntity(new Ro(this.place,this.rng,{butterflies:7,birds:3,clouds:4,playerPos:()=>this.player?.mesh.position}));const o={tide:["8 + 7 = 15","#3f8fb0"],garden:["3 × 4 = 12","#58b368"],stump:["12 ÷ 3 = 4","#b46a3c"],vines:["¾","#9b6bd6"]},l=[];for(const[d,h]of Object.entries(this.place.portals))l.push({x:h.x,z:h.z,label:o[d]});const c=(this.place.markers.N||[])[0];c&&l.push({x:c.x,z:c.z});for(const d of Object.values(this.place.buildSpots||{})){const h=this.findFreeNear(d.x,d.z);h&&l.push({x:h.x,z:h.z})}const u={wait:1400,target:null,last:null};this.place.addEntity({update:d=>{if(this.mode!=="title"||!this.player||this.player.hopping||this.player.queue.length||(u.wait-=d,u.wait>0))return;if(u.target){const f=this.player.mesh.position.clone().add(new D(0,.9,0));this.particles?.emit(f,14,{speed:1.4,up:2.2,life:750,spread:.3}),u.target.label&&Bl(this.world,f,u.target.label[0],u.target.label[1]),this.pet?.celebrate(),u.target=null,u.wait=1600+this.rng.float()*2400;return}const h=this.rng.pick(l.filter(f=>f!==u.last))||l[0];h&&this.player.pathTo(h.x,h.z)?(u.target=h,u.last=h,u.wait=350):u.wait=900}})}startHub(){this.mode="hub",this.flowToken++,this.isEcho=!1,this.duel=null,fn(),this.buildHub(),Gn(!0),Ol(),ca(null),this.talkBtn=null,Hl(null),qs(!1),this.refreshHudCounts(),K.music("island"),this.maybeGestureHint();const e=gb(this.profile);e.kind==="extended"?(Qe(w("hub.streak_extended",{n:this.profile.streak.count})),K.sfx("streak")):e.kind==="frozen"&&(Qe(w("hub.streak_frozen",{n:this.profile.streak.count})),K.sfx("streak",{pitch:.86})),e.gift&&Et(800,()=>{const r=6+Math.min(14,this.profile.streak.count*2);Qe(`🎁 ${w("hub.daily_gift")} +${r} 🍌`),Ei(this.profile,r),Hs(this.profile,2),this.refreshHudCounts(),K.sfx("chest")});const t=[];e.kind==="reset"&&this.profile.stats.days>1&&t.push(w("hub.streak_reset")),this.hubWelcomed||(this.hubWelcomed=!0,t.push(w("hub.welcome",{name:fe(this.profile.name)}))),t.push(this.mimiLine()),pn(t);const n=Rv(this.profile,$u());if(n.length){for(const r of n)r.kind==="bananas"?Ei(this.profile,r.n):r.kind==="egg"&&Hs(this.profile,r.n);Ve(),this.refreshHudCounts(),n.forEach((r,a)=>Et(1700+a*1100,()=>{Qe(r.kind==="bananas"?w("island.daily_fruit",{n:r.n}):w("island.daily_bread")),K.sfx("coin")}))}const s=wv(this.profile,yi(this.profile.math));if(s.length){Ev(this.profile,s.map(a=>a.id)),Ve();const r=this.flowToken;Et(2600,()=>{if(r===this.flowToken){K.sfx("sparkle");for(const a of s)Qe(w("island.new_blueprint",{name:w("build."+a.id)}),"gem");pn(`<b>Mimi:</b> ${w("island.mimi_worktable")}`)}})}}buildHub(){this.clearPlace();const e=yi(this.profile.math),t={};for(const[l,c]of Object.entries(e.worlds))t[l]=c.pct;const n=aa(this.profile,e),s=this.profile.flags.portalStages||(this.profile.flags.portalStages={});this.place=new td(this.world,t,{built:n.filter(l=>l.state==="built").map(l=>l.id),unlocked:n.filter(l=>l.state==="unlocked").map(l=>l.id),crabKing:!!this.profile.flags.festivalDone,festival:!!this.profile.flags.festivalDone},s),this.particles=new Qr(this.place.group),this.place.fx=this.particles,this.celebrateGateGrowth(t,s),this.spawnAvatar();const r=(this.place.markers.P||[{x:11,z:11}])[0];this.player.setPlace(this.place,r.x,r.z),this.spawnPet(r),this.world.defaultZoom=this.sceneZoom("hub"),this.world.follow(this.player.mesh,13,{x:this.place.size.w*.5,z:this.place.size.d*.5}),this.player.onArrive=(l,c)=>this.hubArrive(l,c),this.player.onBump=(l,c)=>this.hubBump(l,c),this.place.playerAt=()=>this.player?{x:this.player.x,z:this.player.z}:null;const a=n.filter(l=>l.state==="built").map(l=>l.id),o=(t.tide+t.garden+t.stump+t.vines)/4||0;this.place.addEntity(new Ro(this.place,this.rng,{butterflies:2+Math.round(o*4)+(a.includes("garden")?2:0),birds:1+(a.length>=3?1:0)+(this.profile.flags.festivalDone?1:0),clouds:2,playerPos:()=>this.player?.mesh.position}))}celebrateGateGrowth(e,t){const n=this.flowToken;let s=0;for(const[r,a]of Object.entries(this.place.gates||{})){const o=J_(e[r]??0);o<=(t[r]??0)||(t[r]=o,Et(1500+s++*1100,()=>{n===this.flowToken&&(a.celebrate(o),Qe(w("portal.stage"+o,{name:w("world."+r)}),"gem"))}))}s&&Ve()}hubArrive(e,t){if(this.mode!=="hub"||!this.place?.portals)return;this.pet?.notePlayerAt(e,t);for(const[s,r]of Object.entries(this.place.portals))if(r.x===e&&r.z===t){K.sfx("door"),this.enterWorld(s);return}const n=(this.place.markers.N||[])[0];n&&n.x===e&&n.z===t&&this.openPets()}buildAt(e,t){for(const[n,s]of Object.entries(this.place?.buildSpots||{}))if(s.x===e&&s.z===t)return{id:n,...s};return null}hubTap(e,t){const n=this.place.markers,s=o=>(o||[]).some(l=>l.x===e&&l.z===t);if(s(n.T))return this.openGems(),!0;if(s(n.O))return this.openShop(),!0;if(s(n.N))return this.openPets(),!0;const r=this.hubNpcAt(e,t,!0);if(r)return this.hubTalk(r),!0;const a=this.buildAt(e,t);return a?a.id==="bakery"&&ma(this.profile,"bakery")?(Qe(w("business.open")),this.startBusiness(),!0):a.state==="unlocked"?(this.openIsland(),!0):a.state==="built"?(K.sfx(a.id==="stage"?"gong":"sparkle"),this.particles?.confetti(this.place.worldPos(e,t,.8),18),!0):!1:!1}spawnAvatar(){this.player=new nd(this.makeMonkeyMesh(this.profile.avatar)),this.player.headH=.95}makeMonkeyMesh(e){const t=Fl.find(r=>r.id===e?.fur)||Fl[0],n=Wn(va.monkey,.85,t.palette,"char:monkey"),s=e?.hat?Dl.find(r=>r.id===e.hat):null;if(s){const r=Ni(s.model,{cacheKey:"hat:"+s.id}),a=n.userData.voxelScale;r.scale.setScalar(a),r.position.y=($b+(s.dy||0))*a,n.add(r)}return n}refreshAvatar(){if(!this.player||!this.place)return;const{x:e,z:t}=this.player;this.player.mesh.removeFromParent();const s=this.makeMonkeyMesh(this.profile.avatar);this.player.mesh=s,this.player.baseScale=s.scale.x||1,this.player.setPlace(this.place,e,t),this.respawnPet()}spawnPet(e){const t=this.profile.avatar.pet;if(!t){this.pet=null;return}const n=ki.find(a=>a.id===t);if(!n){this.pet=null;return}const s=Wn(n.model,.45,null,"pet:"+n.id);this.pet=new id(s);const r=this.findFreeNear(e.x,e.z)||e;this.pet.setPlace(this.place,r.x,r.z)}respawnPet(){this.pet&&(this.pet.mesh.removeFromParent(),this.pet=null),this.player&&this.spawnPet({x:this.player.x,z:this.player.z})}findFreeNear(e,t){for(const[n,s]of[[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,-1]]){const r=this.place.cellAt(e+n,t+s);if(r&&r.walk)return{x:e+n,z:t+s}}return null}enterWorld(e){this.currentWorld=e,this.chamberIndex=0,this.combo=0,this.runChamber()}runChamber(){this.mode="chamber",this.flowToken++,fn(),this.solvedInChamber=0,this.rewards=[],this.chamberIndex++;let e;if(this.duel)e=this.duel.nextProblem();else{const t=$r(this.profile.curriculum),n=this.isEcho?{echo:!0,allowedSkills:t}:{world:this.currentWorld,allowedSkills:t};e=Jr(Ri(this.profile.math,n),this.profile.math,n),e?.world&&(this.currentWorld=e.world)}this.buildChamber(e),Gn(!0),qs(!0),this.presentProblem(e),K.music(e.world?`chamber:${e.world}`:"chamber"),this.maybeGestureHint(),this.isEcho&&Qe("✨ "+w("play.echo_door"))}buildChamber(e){this.clearPlace();const t=e.kind,n=Nl[t]||Nl.fetch;this.chamberRng=this.duel?new qn(this.duel.seed*131+this.duel.round*17+5):this.rng;const s=ty(this.chamberRng.pick(n),this.chamberRng);this.place=new gc(this.world,this.currentWorld||"garden"),this.place.buildFrom(s,{seed:this.chamberRng.int(1,1e9)}),ny(this.place,this.chamberRng),this.particles=new Qr(this.place.group),this.place.addEntity(new Ro(this.place,this.chamberRng,{butterflies:2})),this.spawnAvatar();const r=(this.place.markers.P||[{x:2,z:2}])[0];if(this.player.setPlace(this.place,r.x,r.z),this.spawnPet(r),this.world.defaultZoom=this.sceneZoom(t),this.world.frameBoard(new D(0,0,0),this.place.size.w,this.place.size.d,this.player.mesh),this.player.onArrive=(o,l)=>{this.pet?.notePlayerAt(o,l),this.collectPickupAt(o,l),this.verb?.onArrive(o,l)},this.player.onBump=(o,l)=>this.verb?.onBump(o,l),this.altar=null,(this.place.markers.A||[]).length){const o=this.place.markers.A[0];this.altar=new Xx(this.place,o.x,o.z),this.place.addEntity(this.altar),this.place.cellAt(o.x,o.z).walk=!1}this.crabs=[];for(const o of this.place.markers.c||[]){const l=this.patrolReach(o,"x"),c=this.patrolReach(o,"z"),u=l.len>=c.len?"x":"z",d=u==="x"?l:c;if(d.len<2)continue;const h=new Kx(this.place,o.x,o.z,u,d.min,d.max,1.3+this.rng.float()*.7);this.crabs.push(h),this.place.addEntity(h)}this.helper=null,this.helpKind=null;const a=(this.place.markers.M||[])[0];if(a){const o=od[this.currentWorld]||od.garden,l=ki.find(h=>h.id===o.pet),c=Wn(l.model,.62,null,"helper:"+o.pet);c.position.copy(this.place.worldPos(a.x,a.z)),this.place.group.add(c),this.place.cellAt(a.x,a.z).walk=!1;const u={...o,x:a.x,z:a.z,mesh:c,t:0,excite:0},d=c.position.y;this.place.addEntity({update:h=>{u.t+=h/1e3,u.excite=Math.max(0,u.excite-h/900),c.position.y=d+Math.abs(Math.sin(u.t*(2+u.excite*5)))*(.05+u.excite*.28)}}),this.helper=u}}helperSay(e,t={}){if(!this.helper){pn(e,t);return}pn(`<b>${w(this.helper.nameKey)}:</b> ${e}`,{...t,face:this.helper.face})}helperTap(){this.helper&&(K.sfx("click"),this.helper.excite=1,this.helperSay(w(`helper.cheer.${1+Math.floor(Math.random()*4)}`),{transient:!0,ms:3600}))}hubNpcAt(e,t,n=!1){const s=this.place.mimiPos;if(s&&(s.x===e&&s.z===t||n&&this.place.mimiPrev?.x===e&&this.place.mimiPrev?.z===t))return{kind:"mimi",x:s.x,z:s.z};const r=(this.place.npcs||[]).find(a=>a.x===e&&a.z===t);return r?{kind:"npc",npc:r,x:r.x,z:r.z}:null}hubNpcNear(){if(!this.player||!this.place?.mimiPos)return null;for(const[e,t]of[[0,1],[1,0],[-1,0],[0,-1]]){const n=this.hubNpcAt(this.player.x+e,this.player.z+t);if(n)return n}return null}hubTalk(e){K.sfx("click");const t=e.x-this.player.x,n=e.z-this.player.z;if(this.player.face(t,n),e.kind==="mimi"){this.place.mimi&&(t||n)&&(this.place.mimi.rotation.y=Math.atan2(-t,-n));const s=this.mimiNext(),r=this.flowToken;pn(s.html,{onDone:s.key==="mimi.build_ready"?()=>{r===this.flowToken&&this.mode==="hub"&&this.openIsland()}:null})}else{const s=e.npc;(t||n)&&(s.mesh.rotation.y=Math.atan2(-t,-n));const r=w(`npc.${s.id}.${1+Math.floor(Math.random()*2)}`);pn(`<b>${w("npc."+s.id)}:</b> ${r}`,{face:s.face})}}hubAction(){const e=this.hubNpcNear();e&&this.hubTalk(e)}hubBump(e,t){if(this.mode!=="hub"||!this.place?.mimiPos)return;const n=this.hubNpcAt(e,t);n&&(performance.now()<this.talkCooldown||(this.talkCooldown=performance.now()+900,this.hubTalk(n)))}_mimiPick(e){const t=yi(this.profile.math),n=jy(this.profile,t,aa(this.profile,t)),s=n[this.mimiChat%n.length];e&&this.mimiChat++,this.profile.flags.mimiMet||(this.profile.flags.mimiMet=!0,Ve());const r={...s.vars||{}};return s.buildId&&(r.name=w("build."+s.buildId)),s.worldId&&(r.world=w("world."+s.worldId)),{key:s.key,html:`<b>Mimi:</b> ${w(s.key,r)}`}}mimiNext(){return this._mimiPick(!0)}mimiLine(){return this._mimiPick(!1).html}canHost(e){const t=this.place.markers;return e==="fetch"?(t.s||[]).length+(t.p||[]).length>=4&&(t.A||[]).length>0:e==="array"?(t.o||[]).length>0:e==="numberline"?(t.V||[]).length>=8:e==="share"?(t.B||[]).length>=2&&(t.m||[]).length>0:!1}patrolReach(e,t){const n=o=>{let l=0;for(let c=1;c<12;c++){const u=t==="x"?e.x+o*c:e.x,d=t==="z"?e.z+o*c:e.z,h=this.place.cellAt(u,d);if(!h||!h.walk||h.h!==this.place.cellAt(e.x,e.z).h||"AsPpBmMVoTON".includes(h.ch))break;l=c}return l},s=n(-1),r=n(1),a=t==="x"?e.x:e.z;return{min:a-s,max:a+r,len:s+r}}presentProblem(e){this.problem=e,this.usedHint=!1,this.problemStart=performance.now(),Ia(),ws(),this.verb?.destroy();const t=sd[e.kind]||sd.fetch;this.verb=new t({world:this.world,place:this.place,player:this.player,particles:this.particles,altar:this.altar,hud:by,problem:e,rng:this.chamberRng,resolve:(s,r)=>this.onResolve(s,r),onTreat:(s,r,a)=>this.onTreat(s,r,a),onCarry:s=>this.setCrabsFrozen(s),hintUsed:()=>{this.usedHint=!0}}),this.verb.begin();const n=this.promptVars(e);if(fh(w(e.prompt.key,n),e.equation),this.helper&&e.kind!==this.helpKind){this.helpKind=e.kind;const s=this.flowToken;Et(800,()=>{s===this.flowToken&&this.helperSay(w("helper."+e.kind))})}e.scaffold===0&&Et(700,()=>this.verb?.showModel())}promptVars(e){const t={...e.meta||{},...e.model?.params||{},...e.prompt?.vars||{}};return t.n!==void 0&&t.d!==void 0&&(t.frac=`${t.n}/${t.d}`),t.answer=e.answer,t}onResolve(e,t){const n=performance.now()-this.problemStart,s=Ou(this.profile.math,this.problem,{correct:e,usedHint:this.usedHint,ms:n});this.profile.stats[e?"correct":"wrong"]++,Ve(),e?this.onCorrect(s,t):this.onWrong(s,t)}onCorrect(e,t){this.combo++,this.solvedInChamber++,this.duel&&this.duel.scoreCorrect(this.combo),this.pauseUntil=performance.now()+110,K.sfx("correct"),K.comboTone(this.combo),ph(this.problem.equation.replace(/[?⬚]/,String(this.problem.answer))),zl(this.combo),this.pet?.celebrate();const n=this.player.mesh.position.clone().add(new D(0,.8,0));this.particles.confetti(n,30);const s=this.rng.int(mt.bananasPerCorrect[0],mt.bananasPerCorrect[1]),r=Math.min(10,(this.combo-1)*mt.comboBonus);let a=s+r;this.profile.avatar.pet&&(a=Math.round(a*(1+mt.petBananaBonus))),To(this.world,n,"🍌",document.getElementById("banana-count"),Math.min(a,8),()=>K.sfx("coin")),Ei(this.profile,a);const o=Hs(this.profile,mt.eggPerCorrect);this.refreshHudCounts(),pn(`<b>${Qx()}</b>`,{transient:!0,ms:1800});for(const c of e.newGems||[])Qe("💎 "+w("result.gem",{fact:c.replace("x"," × ")}),"gem"),K.sfx("sparkle");e.masteredSkill&&(Qe("🌟 "+w("result.mastered",{skill:w("skill."+e.masteredSkill)})),K.sfx("bloom"));const l=this.flowToken;Et(1500,()=>{if(l!==this.flowToken)return;const c=this.duel?mt.problemsPerChamber:this.isEcho?mt.echoProblems:mt.problemsPerChamber;if(this.solvedInChamber>=c||this.duel&&!this.duel.hasMore())this.completeChamber(o);else{let u;if(this.duel)u=this.duel.nextProblem();else{const d=$r(this.profile.curriculum),h=this.isEcho?{echo:!0,kind:this.problem.kind,allowedSkills:d}:{world:this.currentWorld,kind:this.problem.kind,allowedSkills:d};u=Jr(Ri(this.profile.math,h),this.profile.math,h)}if(u.kind!==this.problem.kind&&!this.canHost(u.kind))if(this.canHost("fetch")){const d=$r(this.profile.curriculum);u=u.choices?{...u,kind:"fetch"}:Jr(Ri(this.profile.math,{world:u.world,skill:u.skillId,kind:"fetch",allowedSkills:d}),this.profile.math,{world:u.world,allowedSkills:d})}else u={...u,kind:this.problem.kind};this.presentProblem(u)}})}onWrong(e,t){this.combo=0,this.duel&&this.duel.scoreWrong(),zl(0),K.sfx("boop"),mh();const n=this.promptVars(this.problem);if(t.arrayInfo){const s=t.arrayInfo,r=s.tag==="shape"?"ex.array_shape":"ex.array_count";this.helperSay(w(r,{...n,value:s.n}))}else{let s="ex."+(t.tag==="random"?"near_miss":t.tag);s==="ex.off_by_table"&&this.problem.explain?.key!=="ex.off_by_table"&&(s=this.problem.explain.key);const r=w(s,{...n,...this.problem.explain?.vars||{}});this.helperSay(r===s?w(this.problem.explain?.key||"ex.generic",n):r)}Et(450,()=>{this.verb&&!this.verb.showModel()&&Gl(this.problem.model)})}onTreat(e,t,n){e==="bananas"?(To(this.world,n,"🍌",document.getElementById("banana-count"),t,()=>K.sfx("coin")),Ei(this.profile,t)):e==="berry"&&(To(this.world,n,"🍓",document.getElementById("egg-fill").parentElement,t,()=>K.sfx("egg")),Hs(this.profile,t*mt.eggPerBerry),this.profile.stats.berries+=t),this.refreshHudCounts()}setCrabsFrozen(e){for(const t of this.crabs)t.frozen=e}completeChamber(e){this.profile.stats.chambers++,this.verb?.destroy(),this.verb=null,K.music("celebrate");const t=mt.bananasChestBase+this.rng.int(0,6)+Math.min(12,this.chamberIndex*2);Ei(this.profile,t);const n=[`🍌 +${t}`];if(this.rng.chance(mt.hatRandomChestChance)){const r=Dl.filter(a=>!this.profile.owned.hats.includes(a.id));if(r.length){const a=this.rng.pick(r);this.profile.owned.hats.push(a.id),n.push(`${Mh[a.id]||"🎩"} ${w(a.nameKey)}!`)}}const s=this.rng.int(1,3);if(Hs(this.profile,s),n.push(`🥚 +${s}`),Ve(),this.refreshHudCounts(),this.pendingEcho=!this.isEcho&&this.rng.chance(mt.echoDoorChance),this.isEcho,this.isEcho=!1,this.duel){this.duel.chamberDone();return}Gn(!1),$y({rewards:n,onNext:()=>this.afterResult(()=>{this.pendingEcho&&(this.pendingEcho=!1,this.isEcho=!0),this.runChamber()}),onHome:()=>this.afterResult(()=>this.startHub())})}afterResult(e){const t=this.profile;if(t.egg.points>=t.egg.goal){const n=vb(t,ki);Ry(n,()=>{n&&!t.avatar.pet&&(t.avatar.pet=n.id),this.refreshHudCounts(),e()})}else e()}useHint(){if(!this.verb||!this.problem)return;this.usedHint=!0,this.verb.hintShown=!0,K.sfx("click"),this.verb.showModel()||Gl(this.problem.model),this.helperSay(w("hint.look"),3600)}openGems(){K.sfx("click"),ky({report:yi(this.profile.math),onClose:()=>fn()})}openShop(){K.sfx("click"),$l({onClose:()=>{fn(),this.refreshAvatar(),this.refreshHudCounts()},onChanged:()=>this.refreshHudCounts()})}openPets(){K.sfx("click"),ql({onClose:()=>{fn(),this.respawnPet()},onChanged:()=>{},onHatch:()=>this.afterResult(()=>{ql({onClose:()=>{fn(),this.respawnPet()},onChanged:()=>{},onHatch:()=>{}})})})}openIsland(){K.sfx("click");const e=yi(this.profile.math);Cy({profile:this.profile,status:aa(this.profile,e),onClose:()=>fn(),onFund:t=>this.fundBuild(t)})}fundBuild(e){const t=Mv(e);if(!t)return;const n=()=>{if(!Av(this.profile,t,yi(this.profile.math))){K.sfx("boop");return}vn(),fn(),this.celebrateBuild(t)};t.finale&&!this.profile.flags.festivalDone?Py(()=>{Qe(w("island.crab_pays",{n:t.contribution})),n()}):n()}celebrateBuild(e){e.finale&&(this.profile.flags.festivalDone=!0,Ve()),this.buildHub(),Gn(!0),this.refreshHudCounts();const t=this.place.buildSpots[e.id],n=this.flowToken;if(t){const s=this.findFreeNear(t.x,t.z);s&&(this.player.setPlace(this.place,s.x,s.z),this.respawnPet());const r=this.place.worldPos(t.x,t.z,.9);K.sfx("bloom"),Et(250,()=>this.particles?.confetti(r,44)),Et(850,()=>this.particles?.confetti(r.clone().add(new D(.4,.3,-.3)),28))}e.finale?(K.music("celebrate"),Et(1200,()=>{n===this.flowToken&&pn(w("finale.festival",{name:fe(this.profile.name)}),{face:"🦀"})}),Et(1700,()=>{n!==this.flowToken||!t||this.particles?.confetti(this.place.worldPos(t.x,t.z,1.5),60)}),Et(4200,()=>{n===this.flowToken&&K.music("island")})):Et(1300,()=>{if(n!==this.flowToken)return;const s=[`<b>Mimi:</b> ${w("island.built_say")}`];e.npc&&s.push({html:`<b>${w("npc."+e.id)}:</b> ${w(`npc.${e.id}.hello`)}`,face:e.npc.face}),pn(s)})}async openSettings(e=!1){ws(),Hn({onClose:()=>fn(),onSwitchPlayer:()=>this.showTitle(),onLangChange:()=>{},devTools:null})}afterDevPresetApplied(e){if(Qe(`Dev preset: ${e.label}`),this.mode==="hub"){this.buildHub(),Gn(!0),this.refreshHudCounts();return}this.mode!=="title"&&this.startHub()}confirmHome(){if(this.duel){this.duel=null,this.verb?.destroy(),this.verb=null,this.showTitle();return}if(this.mode==="hub"){this.showTitle();return}this.verb?.destroy(),this.verb=null,this.startHub()}refreshHudCounts(){gh(this.profile.bananas),_h(this.profile.streak.count),vh(this.profile.egg.points,this.profile.egg.goal)}debugChamber(e,t){const n=Jr(Ri(this.profile.math,{skill:e,kind:t}),this.profile.math,{});return this.currentWorld=n.world,this.mode="chamber",fn(),this.solvedInChamber=0,this.rewards=[],this.buildChamber(n),Gn(!0),qs(!0),this.presentProblem(n),K.music(n.world?`chamber:${n.world}`:"chamber"),{kind:n.kind,eq:n.equation,skill:n.skillId}}startBusiness(){if(!ma(this.profile,"bakery"))return!1;this.mode="business",this.flowToken++,this.business=new qy(this),fn(),this.clearPlace(),this.place=new my(this.world,{seed:606}),this.particles=new Qr(this.place.group),this.place.fx=this.particles,this.spawnAvatar();const e={x:2,z:Math.max(1,this.place.size.d-3)};this.player.setPlace(this.place,e.x,e.z),this.spawnPet(e),this.player.onArrive=(n,s)=>this.pet?.notePlayerAt(n,s),this.player.onBump=(n,s)=>this.business.businessTap(n,s),this.place.playerAt=()=>this.player?{x:this.player.x,z:this.player.z}:null,this.world.defaultZoom=this.sceneZoom("hub"),this.world.frameBoard(this.place.center(),this.place.size.w,this.place.size.d,this.player.mesh),Gn(!0),Ol(),ca(null),Hl(null),qs(!1),this.refreshHudCounts(),K.music("island");const t=Wt(this.profile);return t.activeOrder?.tasks?.length?this.business.resumeBusinessOrder(t):this.business.startNextBusinessOrder(),!0}async startDuelSetup(){const{showDuelSetup:e}=await Oh(async()=>{const{showDuelSetup:t}=await import("./duel-BDs7ynFz.js");return{showDuelSetup:t}},[]);e(this)}bindInput(){window.addEventListener("keydown",c=>{if(this.mode==="title"||document.querySelector("#screens .screen"))return;const u=c.code;if((u==="Space"||u==="Enter")&&_c()){c.preventDefault();return}if(this.verb?.onKey?.(u)){c.preventDefault();return}const d={ArrowUp:[0,-1],KeyW:[0,-1],ArrowDown:[0,1],KeyS:[0,1],ArrowLeft:[-1,0],KeyA:[-1,0],ArrowRight:[1,0],KeyD:[1,0]};d[u]?(c.preventDefault(),this.player?.tryStep(d[u][0],d[u][1])):u==="Space"||u==="Enter"?(c.preventDefault(),this.mode==="hub"?this.hubAction():this.verb?.onAction()):u==="KeyE"&&this.useHint()});const e=new Map;let t=null,n=!1,s=!1,r=null;const a=()=>{let c=0,u=0;for(const h of e.values())c+=h.x,u+=h.y;const d=e.size||1;return{x:c/d,y:u/d}},o=()=>{const c=[...e.values()];return c.length<2?0:Math.hypot(c[0].x-c[1].x,c[0].y-c[1].y)};this.canvas.addEventListener("pointerdown",c=>{if(e.set(c.pointerId,{x:c.clientX,y:c.clientY}),e.size===1)t={x:c.clientX,y:c.clientY},n=!1,s=!1;else if(e.size===2){const u=a();r={dist:o()||1,zoom:this.world.zoom,cx:u.x,cy:u.y},s=!0}}),this.canvas.addEventListener("pointermove",c=>{if(e.has(c.pointerId)&&(e.set(c.pointerId,{x:c.clientX,y:c.clientY}),this.mode!=="title")){if(e.size>=2&&r){const u=o();u>0&&this.world.setZoom(r.zoom*(u/r.dist));const d=a();this.world.panByPixels(d.x-r.cx,d.y-r.cy),r.cx=d.x,r.cy=d.y,this.userZoom=this.world.zoom}else if(e.size===1&&t){const u=c.clientX-t.x,d=c.clientY-t.y;Math.hypot(u,d)>14&&(n=!0)}}});const l=c=>{const u=t,d=e.delete(c.pointerId);if(e.size<2&&(r=null),e.size>0)return;t=null;const h=n,f=s;if(n=!1,s=!1,!(!d||this.mode==="title"||f))if(h){const g=c.clientX-(u?.x??c.clientX),v=c.clientY-(u?.y??c.clientY);if(Math.hypot(g,v)>30){const m=Math.atan2(v,g),p=Math.round(m/(Math.PI/2)),E={0:[1,0],1:[0,1],2:[-1,0],"-1":[0,-1],"-2":[-1,0]}[p]||[0,0];this.player?.tryStep(E[0],E[1])}}else{const g=this.pickCell(c.clientX,c.clientY);if(!g||this.mode==="hub"&&this.hubTap(g.x,g.z)||this.mode==="business"&&this.business?.businessTap(g.x,g.z))return;if(this.helper&&g.x===this.helper.x&&g.z===this.helper.z){this.helperTap();return}if(this.verb?.onCellTap(g.x,g.z,!1))return;this.player?.pathTo(g.x,g.z)}};this.canvas.addEventListener("pointerup",l),this.canvas.addEventListener("pointercancel",l),this.canvas.addEventListener("wheel",c=>{this.mode!=="title"&&(c.preventDefault(),this.world.zoomBy(c.deltaY<0?1.1:1/1.1),this.userZoom=this.world.zoom)},{passive:!1})}maybeGestureHint(){if(!(!Sl||this.gestureHintDone)){this.gestureHintDone=!0;try{if(localStorage.getItem("monkeygrove.gestureHint"))return;localStorage.setItem("monkeygrove.gestureHint","1")}catch{}Et(1200,()=>Qe(w("hint.pinch")))}}mobileZoom(e){const t=(window.innerHeight||1)/(window.innerWidth||1)>1.35;return!Sl||!t?1:e==="hub"?Du.hub:e==="numberline"?1:Du.chamber}sceneZoom(e){return this.userZoom??this.mobileZoom(e)}pickCell(e,t){const n=this.world.pick(e,t);if(!n)return null;const s=n.object?.userData?.gridList;if(s&&n.instanceId!==void 0){const l=s[n.instanceId];if(l)return{x:l.x,z:l.z}}if(n.object===this.place?.floor&&n.instanceId!==void 0){const l=this.place.floorList[n.instanceId];if(l)return{x:l.x,z:l.z}}const r=n.point,a=Math.floor(r.x/Lt+this.place.size.w/2),o=Math.floor(r.z/Lt+this.place.size.d/2);return this.place.cellAt(a,o)?{x:a,z:o}:null}update(e){if(!this.place)return;if(this.place.update(e),this.player?.update(e),this.pet?.update(e),this.particles?.update(e),this.verb?.update?.(e),this.mode==="hub"&&this.player&&(this.talkBtnT=(this.talkBtnT||0)+e,this.talkBtnT>140)){this.talkBtnT=0;const n=this.hubNpcNear()?"💬":null;n!==this.talkBtn&&(this.talkBtn=n,ca(n))}if(this.mode==="chamber"&&this.player&&!this.player.locked){for(const n of this.crabs)if(!(n.frozen||n.cooldown>0)&&n.x===this.player.x&&n.z===this.player.z){n.cooldown=2200;const s=Math.min(mt.crabSteal,this.profile.bananas);if(s>0){Ei(this.profile,-s),this.refreshHudCounts(),Bl(this.world,this.player.mesh.position.clone(),`-${s} 🍌`,"#c2497a");for(let a=0;a<s;a++){const o=this.player.x+this.rng.int(-3,3),l=this.player.z+this.rng.int(-3,3),c=this.place.cellAt(o,l),u=c&&c.walk&&!(o===this.player.x&&l===this.player.z)?{x:o,z:l}:this.findFreeNear(this.player.x,this.player.z);u&&this.spawnBananaPickup(u.x,u.z)}}K.sfx("crab"),this.world.shake(.12),pn(w("play.crab_yoink",{n:s}),{transient:!0,ms:2200,face:"🦀"});const r=this.findFreeNear(this.player.x,this.player.z);r&&this.player.pathTo(r.x,r.z)}}const t=this.profile?.avatar.trail;t&&this.player?.hopping&&this.particles&&(this.trailT+=e,this.trailT>70&&(this.trailT=0,this.particles.emit(this.player.mesh.position.clone().add(new D(0,.3,0)),2,{colors:[Jy[t]||16767334],speed:.4,up:.8,life:500,spread:.1})))}clearPlace(){this.player&&(this.player.stop(),this.player.locked=!0),this.verb?.destroy?.(),this.verb=null,this.problem=null,this.crabs=[],this.pickups=[],this.helper=null,this.helpKind=null,this.place&&(this.place.dispose(),this.place=null),this.particles=null}spawnBananaPickup(e,t){const n=Tt(ht.bananas,.32,"prop:bananas",{castShadow:!1}),s=this.place.worldPos(e,t,.08);n.position.copy(s),this.place.group.add(n);const r={x:e,z:t,mesh:n,t:Math.random()*6,update:a=>{r.t+=a/1e3,n.position.y=s.y+.06+Math.abs(Math.sin(r.t*3))*.07,n.rotation.y+=a*.002}};this.place.addEntity(r),this.pickups.push(r)}collectPickupAt(e,t){const n=this.pickups.findIndex(a=>a.x===e&&a.z===t);if(n<0)return;const s=this.pickups.splice(n,1)[0];this.place.group.remove(s.mesh);const r=this.place.entities.indexOf(s);r>=0&&this.place.entities.splice(r,1),this.onTreat("bananas",1,s.mesh.position.clone())}}const Ph=new eS;Ph.boot();window.__game=Ph;export{mt as B,qn as R,K as a,Jr as b,ov as c,fe as e,Ri as n,rh as p,Ou as r,pb as s,w as t};
