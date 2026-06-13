(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const wd="modulepreload",Ed=function(i){return"/monkeygrove/"+i},Pl={},Td=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let l=function(c){return Promise.all(c.map(h=>Promise.resolve(h).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");s=l(t.map(c=>{if(c=Ed(c),c in Pl)return;Pl[c]=!0;const h=c.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const u=document.createElement("link");if(u.rel=h?"stylesheet":wd,h||(u.as="script"),u.crossOrigin="",u.href=c,o&&u.setAttribute("nonce",o),document.head.appendChild(u),h)return new Promise((f,g)=>{u.addEventListener("load",f),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};const sl="180",Ad=0,Ll=1,Rd=2,ah=1,oh=2,Ln=3,$n=0,zt=1,pn=2,Wn=0,Yi=1,Fr=2,Dl=3,Fl=4,Cd=5,di=100,Pd=101,Ld=102,Dd=103,Fd=104,Id=200,kd=201,Ud=202,Nd=203,Ha=204,Va=205,Bd=206,Od=207,zd=208,Gd=209,Hd=210,Vd=211,Wd=212,Xd=213,qd=214,Wa=0,Xa=1,qa=2,es=3,$a=4,Ka=5,Ya=6,ja=7,rl=0,$d=1,Kd=2,Xn=0,Yd=1,jd=2,Zd=3,Qd=4,Jd=5,eu=6,tu=7,lh=300,ts=301,ns=302,Za=303,Qa=304,Wr=306,Ja=1e3,fi=1001,eo=1002,$t=1003,nu=1004,$s=1005,gn=1006,ea=1007,pi=1008,yn=1009,ch=1010,hh=1011,Cs=1012,al=1013,gi=1014,_n=1015,Gs=1016,ol=1017,ll=1018,Ps=1020,dh=35902,uh=35899,fh=1021,ph=1022,ln=1023,Ls=1026,Ds=1027,cl=1028,hl=1029,mh=1030,dl=1031,ul=1033,Sr=33776,wr=33777,Er=33778,Tr=33779,to=35840,no=35841,io=35842,so=35843,ro=36196,ao=37492,oo=37496,lo=37808,co=37809,ho=37810,uo=37811,fo=37812,po=37813,mo=37814,go=37815,_o=37816,vo=37817,xo=37818,bo=37819,yo=37820,Mo=37821,So=36492,wo=36494,Eo=36495,To=36283,Ao=36284,Ro=36285,Co=36286,iu=3200,su=3201,gh=0,ru=1,Hn="",Qt="srgb",is="srgb-linear",Ir="linear",Ze="srgb",Ei=7680,Il=519,au=512,ou=513,lu=514,_h=515,cu=516,hu=517,du=518,uu=519,Po=35044,kl="300 es",vn=2e3,kr=2001;class as{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ta=Math.PI/180,Lo=180/Math.PI;function qn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ct[i&255]+Ct[i>>8&255]+Ct[i>>16&255]+Ct[i>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[n&255]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]).toLowerCase()}function Ve(i,e,t){return Math.max(e,Math.min(t,i))}function fu(i,e){return(i%e+e)%e}function na(i,e,t){return(1-t)*i+t*e}function mn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Qe(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Oe{constructor(e=0,t=0){Oe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Hs{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const u=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(d!==v||l!==u||c!==f||h!==g){let m=1-o;const p=l*u+c*f+h*g+d*v,T=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const C=Math.sqrt(w),A=Math.atan2(C,p*T);m=Math.sin(m*A)/C,o=Math.sin(o*A)/C}const M=o*T;if(l=l*m+u*M,c=c*m+f*M,h=h*m+g*M,d=d*m+v*M,m===1-o){const C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-o*f,e[t+2]=c*g+h*f+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ul.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ul.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ia.copy(this).projectOnVector(e),this.sub(ia)}reflect(e){return this.sub(ia.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ia=new D,Ul=new Hs;class Ue{constructor(e,t,n,s,r,a,o,l,c){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],T=s[1],w=s[4],M=s[7],C=s[2],A=s[5],L=s[8];return r[0]=a*v+o*T+l*C,r[3]=a*m+o*w+l*A,r[6]=a*p+o*M+l*L,r[1]=c*v+h*T+d*C,r[4]=c*m+h*w+d*A,r[7]=c*p+h*M+d*L,r[2]=u*v+f*T+g*C,r[5]=u*m+f*w+g*A,r[8]=u*p+f*M+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=t*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*c-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=u*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(sa.makeScale(e,t)),this}rotate(e){return this.premultiply(sa.makeRotation(-e)),this}translate(e,t){return this.premultiply(sa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const sa=new Ue;function vh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ur(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function pu(){const i=Ur("canvas");return i.style.display="block",i}const Nl={};function Fs(i){i in Nl||(Nl[i]=!0,console.warn(i))}function mu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Bl=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ol=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gu(){const i={enabled:!0,workingColorSpace:is,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ze&&(s.r=Fn(s.r),s.g=Fn(s.g),s.b=Fn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(s.r=ji(s.r),s.g=ji(s.g),s.b=ji(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?Ir:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Fs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Fs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[is]:{primaries:e,whitePoint:n,transfer:Ir,toXYZ:Bl,fromXYZ:Ol,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:n,transfer:Ze,toXYZ:Bl,fromXYZ:Ol,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),i}const qe=gu();function Fn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ti;class _u{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ti===void 0&&(Ti=Ur("canvas")),Ti.width=e.width,Ti.height=e.height;const s=Ti.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ti}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ur("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Fn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Fn(t[n]/255)*255):t[n]=Fn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let vu=0;class fl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=qn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ra(s[a].image)):r.push(ra(s[a]))}else r=ra(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ra(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_u.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xu=0;const aa=new D;class Dt extends as{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,n=fi,s=fi,r=gn,a=pi,o=ln,l=yn,c=Dt.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=qn(),this.name="",this.source=new fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(aa).x}get height(){return this.source.getSize(aa).y}get depth(){return this.source.getSize(aa).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ja:e.x=e.x-Math.floor(e.x);break;case fi:e.x=e.x<0?0:1;break;case eo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ja:e.y=e.y-Math.floor(e.y);break;case fi:e.y=e.y<0?0:1;break;case eo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=lh;Dt.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,t=0,n=0,s=1){ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,M=(f+1)/2,C=(p+1)/2,A=(h+u)/4,L=(d+v)/4,U=(g+m)/4;return w>M&&w>C?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=A/n,r=L/n):M>C?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=A/s,r=U/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=L/r,s=U/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(d-v)/T,this.z=(u-h)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bu extends as{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Dt(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:gn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new fl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends bu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class xh extends Dt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class yu extends Dt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yi{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ks.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ks.copy(n.boundingBox)),Ks.applyMatrix4(e.matrixWorld),this.union(Ks)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fs),Ys.subVectors(this.max,fs),Ai.subVectors(e.a,fs),Ri.subVectors(e.b,fs),Ci.subVectors(e.c,fs),kn.subVectors(Ri,Ai),Un.subVectors(Ci,Ri),ei.subVectors(Ai,Ci);let t=[0,-kn.z,kn.y,0,-Un.z,Un.y,0,-ei.z,ei.y,kn.z,0,-kn.x,Un.z,0,-Un.x,ei.z,0,-ei.x,-kn.y,kn.x,0,-Un.y,Un.x,0,-ei.y,ei.x,0];return!oa(t,Ai,Ri,Ci,Ys)||(t=[1,0,0,0,1,0,0,0,1],!oa(t,Ai,Ri,Ci,Ys))?!1:(js.crossVectors(kn,Un),t=[js.x,js.y,js.z],oa(t,Ai,Ri,Ci,Ys))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(En),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const En=[new D,new D,new D,new D,new D,new D,new D,new D],nn=new D,Ks=new yi,Ai=new D,Ri=new D,Ci=new D,kn=new D,Un=new D,ei=new D,fs=new D,Ys=new D,js=new D,ti=new D;function oa(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ti.fromArray(i,r);const o=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),l=e.dot(ti),c=t.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Mu=new yi,ps=new D,la=new D;class os{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Mu.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ps.subVectors(e,this.center);const t=ps.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ps,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(la.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ps.copy(e.center).add(la)),this.expandByPoint(ps.copy(e.center).sub(la))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Tn=new D,ca=new D,Zs=new D,Nn=new D,ha=new D,Qs=new D,da=new D;class pl{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Tn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Tn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Tn.copy(this.origin).addScaledVector(this.direction,t),Tn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ca.copy(e).add(t).multiplyScalar(.5),Zs.copy(t).sub(e).normalize(),Nn.copy(this.origin).sub(ca);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Zs),o=Nn.dot(this.direction),l=-Nn.dot(Zs),c=Nn.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ca).addScaledVector(Zs,u),f}intersectSphere(e,t){Tn.subVectors(e.center,this.origin);const n=Tn.dot(this.direction),s=Tn.dot(Tn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Tn)!==null}intersectTriangle(e,t,n,s,r){ha.subVectors(t,e),Qs.subVectors(n,e),da.crossVectors(ha,Qs);let a=this.direction.dot(da),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Nn.subVectors(this.origin,e);const l=o*this.direction.dot(Qs.crossVectors(Nn,Qs));if(l<0)return null;const c=o*this.direction.dot(ha.cross(Nn));if(c<0||l+c>a)return null;const h=-o*Nn.dot(da);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Je{constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,g,v,m){Je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,v,m)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Pi.setFromMatrixColumn(e,0).length(),r=1/Pi.setFromMatrixColumn(e,1).length(),a=1/Pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Su,e,wu)}lookAt(e,t,n){const s=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),Bn.crossVectors(n,Wt),Bn.lengthSq()===0&&(Math.abs(n.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),Bn.crossVectors(n,Wt)),Bn.normalize(),Js.crossVectors(Wt,Bn),s[0]=Bn.x,s[4]=Js.x,s[8]=Wt.x,s[1]=Bn.y,s[5]=Js.y,s[9]=Wt.y,s[2]=Bn.z,s[6]=Js.z,s[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],T=n[3],w=n[7],M=n[11],C=n[15],A=s[0],L=s[4],U=s[8],y=s[12],b=s[1],P=s[5],O=s[9],V=s[13],q=s[2],Y=s[6],X=s[10],ie=s[14],G=s[3],oe=s[7],de=s[11],we=s[15];return r[0]=a*A+o*b+l*q+c*G,r[4]=a*L+o*P+l*Y+c*oe,r[8]=a*U+o*O+l*X+c*de,r[12]=a*y+o*V+l*ie+c*we,r[1]=h*A+d*b+u*q+f*G,r[5]=h*L+d*P+u*Y+f*oe,r[9]=h*U+d*O+u*X+f*de,r[13]=h*y+d*V+u*ie+f*we,r[2]=g*A+v*b+m*q+p*G,r[6]=g*L+v*P+m*Y+p*oe,r[10]=g*U+v*O+m*X+p*de,r[14]=g*y+v*V+m*ie+p*we,r[3]=T*A+w*b+M*q+C*G,r[7]=T*L+w*P+M*Y+C*oe,r[11]=T*U+w*O+M*X+C*de,r[15]=T*y+w*V+M*ie+C*we,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*d-s*c*d-r*o*u+n*c*u+s*o*f-n*l*f)+v*(+t*l*f-t*c*u+r*a*u-s*a*f+s*c*h-r*l*h)+m*(+t*c*d-t*o*f-r*a*d+n*a*f+r*o*h-n*c*h)+p*(-s*o*h-t*l*d+t*o*u+s*a*d-n*a*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],T=d*m*c-v*u*c+v*l*f-o*m*f-d*l*p+o*u*p,w=g*u*c-h*m*c-g*l*f+a*m*f+h*l*p-a*u*p,M=h*v*c-g*d*c+g*o*f-a*v*f-h*o*p+a*d*p,C=g*d*l-h*v*l-g*o*u+a*v*u+h*o*m-a*d*m,A=t*T+n*w+s*M+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/A;return e[0]=T*L,e[1]=(v*u*r-d*m*r-v*s*f+n*m*f+d*s*p-n*u*p)*L,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*L,e[3]=(d*l*r-o*u*r-d*s*c+n*u*c+o*s*f-n*l*f)*L,e[4]=w*L,e[5]=(h*m*r-g*u*r+g*s*f-t*m*f-h*s*p+t*u*p)*L,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*L,e[7]=(a*u*r-h*l*r+h*s*c-t*u*c-a*s*f+t*l*f)*L,e[8]=M*L,e[9]=(g*d*r-h*v*r-g*n*f+t*v*f+h*n*p-t*d*p)*L,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*p+t*o*p)*L,e[11]=(h*o*r-a*d*r-h*n*c+t*d*c+a*n*f-t*o*f)*L,e[12]=C*L,e[13]=(h*v*s-g*d*s+g*n*u-t*v*u-h*n*m+t*d*m)*L,e[14]=(g*o*s-a*v*s-g*n*l+t*v*l+a*n*m-t*o*m)*L,e[15]=(a*d*s-h*o*s+h*n*l-t*d*l-a*n*u+t*o*u)*L,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,v=a*h,m=a*d,p=o*d,T=l*c,w=l*h,M=l*d,C=n.x,A=n.y,L=n.z;return s[0]=(1-(v+p))*C,s[1]=(f+M)*C,s[2]=(g-w)*C,s[3]=0,s[4]=(f-M)*A,s[5]=(1-(u+p))*A,s[6]=(m+T)*A,s[7]=0,s[8]=(g+w)*L,s[9]=(m-T)*L,s[10]=(1-(u+v))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Pi.set(s[0],s[1],s[2]).length();const a=Pi.set(s[4],s[5],s[6]).length(),o=Pi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],sn.copy(this);const c=1/r,h=1/a,d=1/o;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=d,sn.elements[9]*=d,sn.elements[10]*=d,t.setFromRotationMatrix(sn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=vn,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===vn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===kr)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=vn,l=!1){const c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===vn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===kr)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Pi=new D,sn=new Je,Su=new D(0,0,0),wu=new D(1,1,1),Bn=new D,Js=new D,Wt=new D,zl=new Je,Gl=new Hs;class Mn{constructor(e=0,t=0,n=0,s=Mn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gl.setFromEuler(this),this.setFromQuaternion(Gl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mn.DEFAULT_ORDER="XYZ";class ml{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Eu=0;const Hl=new D,Li=new Hs,An=new Je,er=new D,ms=new D,Tu=new D,Au=new Hs,Vl=new D(1,0,0),Wl=new D(0,1,0),Xl=new D(0,0,1),ql={type:"added"},Ru={type:"removed"},Di={type:"childadded",child:null},ua={type:"childremoved",child:null};class yt extends as{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new D,t=new Mn,n=new Hs,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Je},normalMatrix:{value:new Ue}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ml,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Li.setFromAxisAngle(e,t),this.quaternion.multiply(Li),this}rotateOnWorldAxis(e,t){return Li.setFromAxisAngle(e,t),this.quaternion.premultiply(Li),this}rotateX(e){return this.rotateOnAxis(Vl,e)}rotateY(e){return this.rotateOnAxis(Wl,e)}rotateZ(e){return this.rotateOnAxis(Xl,e)}translateOnAxis(e,t){return Hl.copy(e).applyQuaternion(this.quaternion),this.position.add(Hl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vl,e)}translateY(e){return this.translateOnAxis(Wl,e)}translateZ(e){return this.translateOnAxis(Xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?er.copy(e):er.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(ms,er,this.up):An.lookAt(er,ms,this.up),this.quaternion.setFromRotationMatrix(An),s&&(An.extractRotation(s.matrixWorld),Li.setFromRotationMatrix(An),this.quaternion.premultiply(Li.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ql),Di.child=e,this.dispatchEvent(Di),Di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ru),ua.child=e,this.dispatchEvent(ua),ua.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),An.multiply(e.parent.matrixWorld)),e.applyMatrix4(An),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ql),Di.child=e,this.dispatchEvent(Di),Di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,e,Tu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,Au,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}yt.DEFAULT_UP=new D(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new D,Rn=new D,fa=new D,Cn=new D,Fi=new D,Ii=new D,$l=new D,pa=new D,ma=new D,ga=new D,_a=new ft,va=new ft,xa=new ft;class Jt{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),rn.subVectors(e,t),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){rn.subVectors(s,t),Rn.subVectors(n,t),fa.subVectors(e,t);const a=rn.dot(rn),o=rn.dot(Rn),l=rn.dot(fa),c=Rn.dot(Rn),h=Rn.dot(fa),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Cn.x),l.addScaledVector(a,Cn.y),l.addScaledVector(o,Cn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return _a.setScalar(0),va.setScalar(0),xa.setScalar(0),_a.fromBufferAttribute(e,t),va.fromBufferAttribute(e,n),xa.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(_a,r.x),a.addScaledVector(va,r.y),a.addScaledVector(xa,r.z),a}static isFrontFacing(e,t,n,s){return rn.subVectors(n,t),Rn.subVectors(e,t),rn.cross(Rn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),rn.cross(Rn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Jt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Fi.subVectors(s,n),Ii.subVectors(r,n),pa.subVectors(e,n);const l=Fi.dot(pa),c=Ii.dot(pa);if(l<=0&&c<=0)return t.copy(n);ma.subVectors(e,s);const h=Fi.dot(ma),d=Ii.dot(ma);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Fi,a);ga.subVectors(e,r);const f=Fi.dot(ga),g=Ii.dot(ga);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ii,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return $l.subVectors(r,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector($l,o);const p=1/(m+v+u);return a=v*p,o=u*p,t.copy(n).addScaledVector(Fi,a).addScaledVector(Ii,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const bh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},tr={h:0,s:0,l:0};function ba(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=fu(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ba(a,r,e+1/3),this.g=ba(a,r,e),this.b=ba(a,r,e-1/3)}return qe.colorSpaceToWorking(this,s),this}setStyle(e,t=Qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){const n=bh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fn(e.r),this.g=Fn(e.g),this.b=Fn(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return qe.workingToColorSpace(Pt.copy(this),e),Math.round(Ve(Pt.r*255,0,255))*65536+Math.round(Ve(Pt.g*255,0,255))*256+Math.round(Ve(Pt.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Pt.copy(this),t);const n=Pt.r,s=Pt.g,r=Pt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=Qt){qe.workingToColorSpace(Pt.copy(this),e);const t=Pt.r,n=Pt.g,s=Pt.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(tr);const n=na(On.h,tr.h,t),s=na(On.s,tr.s,t),r=na(On.l,tr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new De;De.NAMES=bh;let Cu=0;class Mi extends as{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=qn(),this.name="",this.type="Material",this.blending=Yi,this.side=$n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ha,this.blendDst=Va,this.blendEquation=di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(n.blending=this.blending),this.side!==$n&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ha&&(n.blendSrc=this.blendSrc),this.blendDst!==Va&&(n.blendDst=this.blendDst),this.blendEquation!==di&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==es&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Il&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Xr extends Mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gt=new D,nr=new Oe;let Pu=0;class Gt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Pu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Po,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)nr.fromBufferAttribute(this,t),nr.applyMatrix3(e),this.setXY(t,nr.x,nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Po&&(e.usage=this.usage),e}}class yh extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Mh extends Gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bn extends Gt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Lu=0;const jt=new Je,ya=new yt,ki=new D,Xt=new yi,gs=new yi,Et=new D;class cn extends as{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vh(e)?Mh:yh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ue().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,n){return jt.makeTranslation(e,t,n),this.applyMatrix4(jt),this}scale(e,t,n){return jt.makeScale(e,t,n),this.applyMatrix4(jt),this}lookAt(e){return ya.lookAt(e),ya.updateMatrix(),this.applyMatrix4(ya.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new bn(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Xt.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];gs.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Xt.min,gs.min),Xt.expandByPoint(Et),Et.addVectors(Xt.max,gs.max),Xt.expandByPoint(Et)):(Xt.expandByPoint(gs.min),Xt.expandByPoint(gs.max))}Xt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Et.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Et));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Et.fromBufferAttribute(o,c),l&&(ki.fromBufferAttribute(e,c),Et.add(ki)),s=Math.max(s,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new D,l[U]=new D;const c=new D,h=new D,d=new D,u=new Oe,f=new Oe,g=new Oe,v=new D,m=new D;function p(U,y,b){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,y),d.fromBufferAttribute(n,b),u.fromBufferAttribute(r,U),f.fromBufferAttribute(r,y),g.fromBufferAttribute(r,b),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[U].add(v),o[y].add(v),o[b].add(v),l[U].add(m),l[y].add(m),l[b].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let U=0,y=T.length;U<y;++U){const b=T[U],P=b.start,O=b.count;for(let V=P,q=P+O;V<q;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const w=new D,M=new D,C=new D,A=new D;function L(U){C.fromBufferAttribute(s,U),A.copy(C);const y=o[U];w.copy(y),w.sub(C.multiplyScalar(C.dot(y))).normalize(),M.crossVectors(A,y);const P=M.dot(l[U])<0?-1:1;a.setXYZW(U,w.x,w.y,w.z,P)}for(let U=0,y=T.length;U<y;++U){const b=T[U],P=b.start,O=b.count;for(let V=P,q=P+O;V<q;V+=3)L(e.getX(V+0)),L(e.getX(V+1)),L(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,d=new D;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new Gt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new cn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kl=new Je,ni=new pl,ir=new os,Yl=new D,sr=new D,rr=new D,ar=new D,Ma=new D,or=new D,jl=new D,lr=new D;class Lt extends yt{constructor(e=new cn,t=new Xr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){or.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Ma.fromBufferAttribute(d,e),a?or.addScaledVector(Ma,h):or.addScaledVector(Ma.sub(t),h))}t.add(or)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(r),ni.copy(e.ray).recast(e.near),!(ir.containsPoint(ni.origin)===!1&&(ni.intersectSphere(ir,Yl)===null||ni.origin.distanceToSquared(Yl)>(e.far-e.near)**2))&&(Kl.copy(r).invert(),ni.copy(e.ray).applyMatrix4(Kl),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=T,C=w;M<C;M+=3){const A=o.getX(M),L=o.getX(M+1),U=o.getX(M+2);s=cr(this,p,e,n,c,h,d,A,L,U),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=o.getX(m),w=o.getX(m+1),M=o.getX(m+2);s=cr(this,a,e,n,c,h,d,T,w,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=T,C=w;M<C;M+=3){const A=M,L=M+1,U=M+2;s=cr(this,p,e,n,c,h,d,A,L,U),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=m,w=m+1,M=m+2;s=cr(this,a,e,n,c,h,d,T,w,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Du(i,e,t,n,s,r,a,o){let l;if(e.side===zt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===$n,o),l===null)return null;lr.copy(o),lr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(lr);return c<t.near||c>t.far?null:{distance:c,point:lr.clone(),object:i}}function cr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,sr),i.getVertexPosition(l,rr),i.getVertexPosition(c,ar);const h=Du(i,e,t,n,sr,rr,ar,jl);if(h){const d=new D;Jt.getBarycoord(jl,sr,rr,ar,d),s&&(h.uv=Jt.getInterpolatedAttribute(s,o,l,c,d,new Oe)),r&&(h.uv1=Jt.getInterpolatedAttribute(r,o,l,c,d,new Oe)),a&&(h.normal=Jt.getInterpolatedAttribute(a,o,l,c,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new D,materialIndex:0};Jt.getNormal(sr,rr,ar,u.normal),h.face=u,h.barycoord=d}return h}class Kn extends cn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new bn(c,3)),this.setAttribute("normal",new bn(h,3)),this.setAttribute("uv",new bn(d,2));function g(v,m,p,T,w,M,C,A,L,U,y){const b=M/L,P=C/U,O=M/2,V=C/2,q=A/2,Y=L+1,X=U+1;let ie=0,G=0;const oe=new D;for(let de=0;de<X;de++){const we=de*P-V;for(let ze=0;ze<Y;ze++){const nt=ze*b-O;oe[v]=nt*T,oe[m]=we*w,oe[p]=q,c.push(oe.x,oe.y,oe.z),oe[v]=0,oe[m]=0,oe[p]=A>0?1:-1,h.push(oe.x,oe.y,oe.z),d.push(ze/L),d.push(1-de/U),ie+=1}}for(let de=0;de<U;de++)for(let we=0;we<L;we++){const ze=u+we+Y*de,nt=u+we+Y*(de+1),rt=u+(we+1)+Y*(de+1),Ke=u+(we+1)+Y*de;l.push(ze,nt,Ke),l.push(nt,rt,Ke),G+=6}o.addGroup(f,G,y),f+=G,u+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ss(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function kt(i){const e={};for(let t=0;t<i.length;t++){const n=ss(i[t]);for(const s in n)e[s]=n[s]}return e}function Fu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Sh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Iu={clone:ss,merge:kt};var ku=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends Mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ku,this.fragmentShader=Uu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ss(e.uniforms),this.uniformsGroups=Fu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class wh extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new D,Zl=new Oe,Ql=new Oe;class on extends wh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Lo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ta*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lo*2*Math.atan(Math.tan(ta*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zn.x,zn.y).multiplyScalar(-e/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-e/zn.z)}getViewSize(e,t){return this.getViewBounds(e,Zl,Ql),t.subVectors(Ql,Zl)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ta*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ui=-90,Ni=1;class Nu extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new on(Ui,Ni,e,t);s.layers=this.layers,this.add(s);const r=new on(Ui,Ni,e,t);r.layers=this.layers,this.add(r);const a=new on(Ui,Ni,e,t);a.layers=this.layers,this.add(a);const o=new on(Ui,Ni,e,t);o.layers=this.layers,this.add(o);const l=new on(Ui,Ni,e,t);l.layers=this.layers,this.add(l);const c=new on(Ui,Ni,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===vn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Eh extends Dt{constructor(e=[],t=ts,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Bu extends _i{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Eh(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Kn(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zt,blending:Wn});r.uniforms.tEquirect.value=t;const a=new Lt(s,r),o=t.minFilter;return t.minFilter===pi&&(t.minFilter=gn),new Nu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class en extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ou={type:"move"};class Sa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new en,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new en,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new en,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ou)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new en;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class zu extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Gu{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Po,this.updateRanges=[],this.version=0,this.uuid=qn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const It=new D;class Nr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=mn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Nr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class gl extends Mi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Bi;const _s=new D,Oi=new D,zi=new D,Gi=new Oe,vs=new Oe,Th=new Je,hr=new D,xs=new D,dr=new D,Jl=new Oe,wa=new Oe,ec=new Oe;class Ah extends yt{constructor(e=new gl){if(super(),this.isSprite=!0,this.type="Sprite",Bi===void 0){Bi=new cn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Gu(t,5);Bi.setIndex([0,1,2,0,2,3]),Bi.setAttribute("position",new Nr(n,3,0,!1)),Bi.setAttribute("uv",new Nr(n,2,3,!1))}this.geometry=Bi,this.material=e,this.center=new Oe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Oi.setFromMatrixScale(this.matrixWorld),Th.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),zi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Oi.multiplyScalar(-zi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ur(hr.set(-.5,-.5,0),zi,a,Oi,s,r),ur(xs.set(.5,-.5,0),zi,a,Oi,s,r),ur(dr.set(.5,.5,0),zi,a,Oi,s,r),Jl.set(0,0),wa.set(1,0),ec.set(1,1);let o=e.ray.intersectTriangle(hr,xs,dr,!1,_s);if(o===null&&(ur(xs.set(-.5,.5,0),zi,a,Oi,s,r),wa.set(0,1),o=e.ray.intersectTriangle(hr,dr,xs,!1,_s),o===null))return;const l=e.ray.origin.distanceTo(_s);l<e.near||l>e.far||t.push({distance:l,point:_s.clone(),uv:Jt.getInterpolation(_s,hr,xs,dr,Jl,wa,ec,new Oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ur(i,e,t,n,s,r){Gi.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(vs.x=r*Gi.x-s*Gi.y,vs.y=s*Gi.x+r*Gi.y):vs.copy(Gi),i.copy(e),i.x+=vs.x,i.y+=vs.y,i.applyMatrix4(Th)}class Hu extends Dt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=$t,h=$t,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tc extends Gt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Hi=new Je,nc=new Je,fr=[],ic=new yi,Vu=new Je,bs=new Lt,ys=new os;class sc extends Lt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new tc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Vu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new yi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hi),ic.copy(e.boundingBox).applyMatrix4(Hi),this.boundingBox.union(ic)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new os),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hi),ys.copy(e.boundingSphere).applyMatrix4(Hi),this.boundingSphere.union(ys)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(bs.geometry=this.geometry,bs.material=this.material,bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ys.copy(this.boundingSphere),ys.applyMatrix4(n),e.ray.intersectsSphere(ys)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Hi),nc.multiplyMatrices(n,Hi),bs.matrixWorld=nc,bs.raycast(e,fr);for(let a=0,o=fr.length;a<o;a++){const l=fr[a];l.instanceId=r,l.object=this,t.push(l)}fr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new tc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Hu(new Float32Array(s*this.count),s,this.count,cl,_n));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ea=new D,Wu=new D,Xu=new Ue;class li{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ea.subVectors(n,t).cross(Wu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ea),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Xu.getNormalMatrix(e),s=this.coplanarPoint(Ea).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new os,qu=new Oe(.5,.5),pr=new D;class _l{constructor(e=new li,t=new li,n=new li,s=new li,r=new li,a=new li){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=vn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],T=r[12],w=r[13],M=r[14],C=r[15];if(s[0].setComponents(c-a,f-h,p-g,C-T).normalize(),s[1].setComponents(c+a,f+h,p+g,C+T).normalize(),s[2].setComponents(c+o,f+d,p+v,C+w).normalize(),s[3].setComponents(c-o,f-d,p-v,C-w).normalize(),n)s[4].setComponents(l,u,m,M).normalize(),s[5].setComponents(c-l,f-u,p-m,C-M).normalize();else if(s[4].setComponents(c-l,f-u,p-m,C-M).normalize(),t===vn)s[5].setComponents(c+l,f+u,p+m,C+M).normalize();else if(t===kr)s[5].setComponents(l,u,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){ii.center.set(0,0,0);const t=qu.distanceTo(e.center);return ii.radius=.7071067811865476+t,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(pr.x=s.normal.x>0?e.max.x:e.min.x,pr.y=s.normal.y>0?e.max.y:e.min.y,pr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(pr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Rh extends Mi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const rc=new Je,Do=new pl,mr=new os,gr=new D;class $u extends yt{constructor(e=new cn,t=new Rh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(s),mr.radius+=r,e.ray.intersectsSphere(mr)===!1)return;rc.copy(s).invert(),Do.copy(e.ray).applyMatrix4(rc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,v=f;g<v;g++){const m=c.getX(g);gr.fromBufferAttribute(d,m),ac(gr,m,l,s,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,v=f;g<v;g++)gr.fromBufferAttribute(d,g),ac(gr,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ac(i,e,t,n,s,r,a){const o=Do.distanceSqToPoint(i);if(o<t){const l=new D;Do.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Ch extends Dt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ph extends Dt{constructor(e,t,n=gi,s,r,a,o=$t,l=$t,c,h=Ls,d=1){if(h!==Ls&&h!==Ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new fl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Lh extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ls extends cn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const T=p*u-a;for(let w=0;w<c;w++){const M=w*d-r;g.push(M,-T,0),v.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const w=T+c*p,M=T+c*(p+1),C=T+1+c*(p+1),A=T+1+c*p;f.push(w,M,A),f.push(M,C,A)}this.setIndex(f),this.setAttribute("position",new bn(g,3)),this.setAttribute("normal",new bn(v,3)),this.setAttribute("uv",new bn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ls(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ts extends Mi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gh,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ku extends Mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Yu extends Mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Dh extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ju extends Dh{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ta=new Je,oc=new D,lc=new D;class Zu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _l,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;oc.setFromMatrixPosition(e.matrixWorld),t.position.copy(oc),lc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lc),t.updateMatrixWorld(),Ta.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ta,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ta)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class vl extends wh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Qu extends Zu{constructor(){super(new vl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class cc extends Dh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new Qu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ju extends on{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const hc=new Je;class ef{constructor(e,t,n=0,s=1/0){this.ray=new pl(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ml,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hc),this}intersectObject(e,t=!0,n=[]){return Fo(e,this,n,t),n.sort(dc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Fo(e[s],this,n,t);return n.sort(dc),n}}function dc(i,e){return i.distance-e.distance}function Fo(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Fo(r[a],e,t,!0)}}function uc(i,e,t,n){const s=tf(n);switch(t){case fh:return i*e;case cl:return i*e/s.components*s.byteLength;case hl:return i*e/s.components*s.byteLength;case mh:return i*e*2/s.components*s.byteLength;case dl:return i*e*2/s.components*s.byteLength;case ph:return i*e*3/s.components*s.byteLength;case ln:return i*e*4/s.components*s.byteLength;case ul:return i*e*4/s.components*s.byteLength;case Sr:case wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Er:case Tr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case no:case so:return Math.max(i,16)*Math.max(e,8)/4;case to:case io:return Math.max(i,8)*Math.max(e,8)/2;case ro:case ao:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case co:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ho:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case uo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case fo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case po:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case mo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case go:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case _o:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case vo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case xo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case bo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case yo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Mo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case So:case wo:case Eo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case To:case Ao:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ro:case Co:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function tf(i){switch(i){case yn:case ch:return{byteLength:1,components:1};case Cs:case hh:case Gs:return{byteLength:2,components:1};case ol:case ll:return{byteLength:2,components:4};case gi:case al:case _n:return{byteLength:4,components:1};case dh:case uh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sl);function Fh(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function nf(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var sf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rf=`#ifdef USE_ALPHAHASH
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
#endif`,af=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,of=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hf=`#ifdef USE_AOMAP
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
#endif`,df=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uf=`#ifdef USE_BATCHING
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
#endif`,ff=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_f=`#ifdef USE_IRIDESCENCE
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
#endif`,vf=`#ifdef USE_BUMPMAP
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
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ef=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Tf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Af=`#define PI 3.141592653589793
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
} // validated`,Rf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Cf=`vec3 transformedNormal = objectNormal;
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
#endif`,Pf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Df=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ff=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,If="gl_FragColor = linearToOutputTexel( gl_FragColor );",kf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Uf=`#ifdef USE_ENVMAP
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
#endif`,Nf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Bf=`#ifdef USE_ENVMAP
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
#endif`,Of=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zf=`#ifdef USE_ENVMAP
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
#endif`,Gf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xf=`#ifdef USE_GRADIENTMAP
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
}`,qf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$f=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yf=`uniform bool receiveShadow;
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
#endif`,jf=`#ifdef USE_ENVMAP
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
#endif`,Zf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ep=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tp=`PhysicalMaterial material;
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
#endif`,np=`struct PhysicalMaterial {
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
}`,ip=`
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
#endif`,sp=`#if defined( RE_IndirectDiffuse )
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
#endif`,rp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ap=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,op=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,up=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,fp=`#if defined( USE_POINTS_UV )
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
#endif`,pp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_p=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xp=`#ifdef USE_MORPHTARGETS
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
#endif`,bp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ep=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Tp=`#ifdef USE_NORMALMAP
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
#endif`,Ap=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Fp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ip=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Op=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hp=`float getShadowMask() {
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
}`,Vp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wp=`#ifdef USE_SKINNING
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
#endif`,Xp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qp=`#ifdef USE_SKINNING
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
#endif`,$p=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zp=`#ifdef USE_TRANSMISSION
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
#endif`,Qp=`#ifdef USE_TRANSMISSION
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
#endif`,Jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const im=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sm=`uniform sampler2D t2D;
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
}`,rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,am=`#ifdef ENVMAP_TYPE_CUBE
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
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cm=`#include <common>
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
}`,hm=`#if DEPTH_PACKING == 3200
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
}`,dm=`#define DISTANCE
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
}`,um=`#define DISTANCE
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
}`,fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`uniform float scale;
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
}`,gm=`uniform vec3 diffuse;
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
}`,_m=`#include <common>
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
}`,vm=`uniform vec3 diffuse;
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
}`,xm=`#define LAMBERT
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
}`,bm=`#define LAMBERT
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
}`,ym=`#define MATCAP
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
}`,Mm=`#define MATCAP
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
}`,Sm=`#define NORMAL
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
}`,wm=`#define NORMAL
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
}`,Em=`#define PHONG
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
}`,Tm=`#define PHONG
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
}`,Am=`#define STANDARD
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
}`,Rm=`#define STANDARD
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
}`,Cm=`#define TOON
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
}`,Pm=`#define TOON
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
}`,Lm=`uniform float size;
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
}`,Dm=`uniform vec3 diffuse;
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
}`,Fm=`#include <common>
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
}`,Im=`uniform vec3 color;
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
}`,km=`uniform float rotation;
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
}`,Um=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:sf,alphahash_pars_fragment:rf,alphamap_fragment:af,alphamap_pars_fragment:of,alphatest_fragment:lf,alphatest_pars_fragment:cf,aomap_fragment:hf,aomap_pars_fragment:df,batching_pars_vertex:uf,batching_vertex:ff,begin_vertex:pf,beginnormal_vertex:mf,bsdfs:gf,iridescence_fragment:_f,bumpmap_pars_fragment:vf,clipping_planes_fragment:xf,clipping_planes_pars_fragment:bf,clipping_planes_pars_vertex:yf,clipping_planes_vertex:Mf,color_fragment:Sf,color_pars_fragment:wf,color_pars_vertex:Ef,color_vertex:Tf,common:Af,cube_uv_reflection_fragment:Rf,defaultnormal_vertex:Cf,displacementmap_pars_vertex:Pf,displacementmap_vertex:Lf,emissivemap_fragment:Df,emissivemap_pars_fragment:Ff,colorspace_fragment:If,colorspace_pars_fragment:kf,envmap_fragment:Uf,envmap_common_pars_fragment:Nf,envmap_pars_fragment:Bf,envmap_pars_vertex:Of,envmap_physical_pars_fragment:jf,envmap_vertex:zf,fog_vertex:Gf,fog_pars_vertex:Hf,fog_fragment:Vf,fog_pars_fragment:Wf,gradientmap_pars_fragment:Xf,lightmap_pars_fragment:qf,lights_lambert_fragment:$f,lights_lambert_pars_fragment:Kf,lights_pars_begin:Yf,lights_toon_fragment:Zf,lights_toon_pars_fragment:Qf,lights_phong_fragment:Jf,lights_phong_pars_fragment:ep,lights_physical_fragment:tp,lights_physical_pars_fragment:np,lights_fragment_begin:ip,lights_fragment_maps:sp,lights_fragment_end:rp,logdepthbuf_fragment:ap,logdepthbuf_pars_fragment:op,logdepthbuf_pars_vertex:lp,logdepthbuf_vertex:cp,map_fragment:hp,map_pars_fragment:dp,map_particle_fragment:up,map_particle_pars_fragment:fp,metalnessmap_fragment:pp,metalnessmap_pars_fragment:mp,morphinstance_vertex:gp,morphcolor_vertex:_p,morphnormal_vertex:vp,morphtarget_pars_vertex:xp,morphtarget_vertex:bp,normal_fragment_begin:yp,normal_fragment_maps:Mp,normal_pars_fragment:Sp,normal_pars_vertex:wp,normal_vertex:Ep,normalmap_pars_fragment:Tp,clearcoat_normal_fragment_begin:Ap,clearcoat_normal_fragment_maps:Rp,clearcoat_pars_fragment:Cp,iridescence_pars_fragment:Pp,opaque_fragment:Lp,packing:Dp,premultiplied_alpha_fragment:Fp,project_vertex:Ip,dithering_fragment:kp,dithering_pars_fragment:Up,roughnessmap_fragment:Np,roughnessmap_pars_fragment:Bp,shadowmap_pars_fragment:Op,shadowmap_pars_vertex:zp,shadowmap_vertex:Gp,shadowmask_pars_fragment:Hp,skinbase_vertex:Vp,skinning_pars_vertex:Wp,skinning_vertex:Xp,skinnormal_vertex:qp,specularmap_fragment:$p,specularmap_pars_fragment:Kp,tonemapping_fragment:Yp,tonemapping_pars_fragment:jp,transmission_fragment:Zp,transmission_pars_fragment:Qp,uv_pars_fragment:Jp,uv_pars_vertex:em,uv_vertex:tm,worldpos_vertex:nm,background_vert:im,background_frag:sm,backgroundCube_vert:rm,backgroundCube_frag:am,cube_vert:om,cube_frag:lm,depth_vert:cm,depth_frag:hm,distanceRGBA_vert:dm,distanceRGBA_frag:um,equirect_vert:fm,equirect_frag:pm,linedashed_vert:mm,linedashed_frag:gm,meshbasic_vert:_m,meshbasic_frag:vm,meshlambert_vert:xm,meshlambert_frag:bm,meshmatcap_vert:ym,meshmatcap_frag:Mm,meshnormal_vert:Sm,meshnormal_frag:wm,meshphong_vert:Em,meshphong_frag:Tm,meshphysical_vert:Am,meshphysical_frag:Rm,meshtoon_vert:Cm,meshtoon_frag:Pm,points_vert:Lm,points_frag:Dm,shadow_vert:Fm,shadow_frag:Im,sprite_vert:km,sprite_frag:Um},ae={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},fn={basic:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new De(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:kt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:kt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new De(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:kt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:kt([ae.points,ae.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:kt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:kt([ae.common,ae.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:kt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:kt([ae.sprite,ae.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:kt([ae.common,ae.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:kt([ae.lights,ae.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};fn.physical={uniforms:kt([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const _r={r:0,b:0,g:0},si=new Mn,Nm=new Je;function Bm(i,e,t,n,s,r,a){const o=new De(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(w){let M=w.isScene===!0?w.background:null;return M&&M.isTexture&&(M=(w.backgroundBlurriness>0?t:e).get(M)),M}function v(w){let M=!1;const C=g(w);C===null?p(o,l):C&&C.isColor&&(p(C,1),M=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(w,M){const C=g(M);C&&(C.isCubeTexture||C.mapping===Wr)?(h===void 0&&(h=new Lt(new Kn(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:ss(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,L,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),si.copy(M.backgroundRotation),si.x*=-1,si.y*=-1,si.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Nm.makeRotationFromEuler(si)),h.material.toneMapped=qe.getTransfer(C.colorSpace)!==Ze,(d!==C||u!==C.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=C,u=C.version,f=i.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Lt(new ls(2,2),new Yn({name:"BackgroundMaterial",uniforms:ss(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=qe.getTransfer(C.colorSpace)!==Ze,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||u!==C.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=C,u=C.version,f=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,M){w.getRGB(_r,Sh(i)),n.buffers.color.setClear(_r.r,_r.g,_r.b,M,a)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,M=1){o.set(w),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(o,l)},render:v,addToRenderList:m,dispose:T}}function Om(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(b,P,O,V,q){let Y=!1;const X=d(V,O,P);r!==X&&(r=X,c(r.object)),Y=f(b,V,O,q),Y&&g(b,V,O,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,M(b,P,O,V),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function d(b,P,O){const V=O.wireframe===!0;let q=n[b.id];q===void 0&&(q={},n[b.id]=q);let Y=q[P.id];Y===void 0&&(Y={},q[P.id]=Y);let X=Y[V];return X===void 0&&(X=u(l()),Y[V]=X),X}function u(b){const P=[],O=[],V=[];for(let q=0;q<t;q++)P[q]=0,O[q]=0,V[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:V,object:b,attributes:{},index:null}}function f(b,P,O,V){const q=r.attributes,Y=P.attributes;let X=0;const ie=O.getAttributes();for(const G in ie)if(ie[G].location>=0){const de=q[G];let we=Y[G];if(we===void 0&&(G==="instanceMatrix"&&b.instanceMatrix&&(we=b.instanceMatrix),G==="instanceColor"&&b.instanceColor&&(we=b.instanceColor)),de===void 0||de.attribute!==we||we&&de.data!==we.data)return!0;X++}return r.attributesNum!==X||r.index!==V}function g(b,P,O,V){const q={},Y=P.attributes;let X=0;const ie=O.getAttributes();for(const G in ie)if(ie[G].location>=0){let de=Y[G];de===void 0&&(G==="instanceMatrix"&&b.instanceMatrix&&(de=b.instanceMatrix),G==="instanceColor"&&b.instanceColor&&(de=b.instanceColor));const we={};we.attribute=de,de&&de.data&&(we.data=de.data),q[G]=we,X++}r.attributes=q,r.attributesNum=X,r.index=V}function v(){const b=r.newAttributes;for(let P=0,O=b.length;P<O;P++)b[P]=0}function m(b){p(b,0)}function p(b,P){const O=r.newAttributes,V=r.enabledAttributes,q=r.attributeDivisors;O[b]=1,V[b]===0&&(i.enableVertexAttribArray(b),V[b]=1),q[b]!==P&&(i.vertexAttribDivisor(b,P),q[b]=P)}function T(){const b=r.newAttributes,P=r.enabledAttributes;for(let O=0,V=P.length;O<V;O++)P[O]!==b[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function w(b,P,O,V,q,Y,X){X===!0?i.vertexAttribIPointer(b,P,O,q,Y):i.vertexAttribPointer(b,P,O,V,q,Y)}function M(b,P,O,V){v();const q=V.attributes,Y=O.getAttributes(),X=P.defaultAttributeValues;for(const ie in Y){const G=Y[ie];if(G.location>=0){let oe=q[ie];if(oe===void 0&&(ie==="instanceMatrix"&&b.instanceMatrix&&(oe=b.instanceMatrix),ie==="instanceColor"&&b.instanceColor&&(oe=b.instanceColor)),oe!==void 0){const de=oe.normalized,we=oe.itemSize,ze=e.get(oe);if(ze===void 0)continue;const nt=ze.buffer,rt=ze.type,Ke=ze.bytesPerElement,$=rt===i.INT||rt===i.UNSIGNED_INT||oe.gpuType===al;if(oe.isInterleavedBufferAttribute){const Z=oe.data,pe=Z.stride,Le=oe.offset;if(Z.isInstancedInterleavedBuffer){for(let Se=0;Se<G.locationSize;Se++)p(G.location+Se,Z.meshPerAttribute);b.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Se=0;Se<G.locationSize;Se++)m(G.location+Se);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let Se=0;Se<G.locationSize;Se++)w(G.location+Se,we/G.locationSize,rt,de,pe*Ke,(Le+we/G.locationSize*Se)*Ke,$)}else{if(oe.isInstancedBufferAttribute){for(let Z=0;Z<G.locationSize;Z++)p(G.location+Z,oe.meshPerAttribute);b.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Z=0;Z<G.locationSize;Z++)m(G.location+Z);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let Z=0;Z<G.locationSize;Z++)w(G.location+Z,we/G.locationSize,rt,de,we*Ke,we/G.locationSize*Z*Ke,$)}}else if(X!==void 0){const de=X[ie];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(G.location,de);break;case 3:i.vertexAttrib3fv(G.location,de);break;case 4:i.vertexAttrib4fv(G.location,de);break;default:i.vertexAttrib1fv(G.location,de)}}}}T()}function C(){U();for(const b in n){const P=n[b];for(const O in P){const V=P[O];for(const q in V)h(V[q].object),delete V[q];delete P[O]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;const P=n[b.id];for(const O in P){const V=P[O];for(const q in V)h(V[q].object),delete V[q];delete P[O]}delete n[b.id]}function L(b){for(const P in n){const O=n[P];if(O[b.id]===void 0)continue;const V=O[b.id];for(const q in V)h(V[q].object),delete V[q];delete O[b.id]}}function U(){y(),a=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function zm(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];t.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v]*u[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Gm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==ln&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const U=L===Gs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==yn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==_n&&!U)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:w,maxFragmentUniforms:M,vertexTextures:C,maxSamples:A}}function Hm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new li,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const T=r?0:n,w=T*4;let M=p.clippingState||null;l.value=M,M=h(g,u,w,f);for(let C=0;C!==w;++C)M[C]=t[C];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,T=u.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,M=f;w!==v;++w,M+=4)a.copy(d[w]).applyMatrix4(T,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Vm(i){let e=new WeakMap;function t(a,o){return o===Za?a.mapping=ts:o===Qa&&(a.mapping=ns),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Za||o===Qa)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Bu(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const qi=4,fc=[.125,.215,.35,.446,.526,.582],ui=20,Aa=new vl,pc=new De;let Ra=null,Ca=0,Pa=0,La=!1;const ci=(1+Math.sqrt(5))/2,Vi=1/ci,mc=[new D(-ci,Vi,0),new D(ci,Vi,0),new D(-Vi,0,ci),new D(Vi,0,ci),new D(0,ci,-Vi),new D(0,ci,Vi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Wm=new D;class gc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Wm}=r;Ra=this._renderer.getRenderTarget(),Ca=this._renderer.getActiveCubeFace(),Pa=this._renderer.getActiveMipmapLevel(),La=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ra,Ca,Pa),this._renderer.xr.enabled=La,e.scissorTest=!1,vr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ts||e.mapping===ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ra=this._renderer.getRenderTarget(),Ca=this._renderer.getActiveCubeFace(),Pa=this._renderer.getActiveMipmapLevel(),La=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:Gs,format:ln,colorSpace:is,depthBuffer:!1},s=_c(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_c(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xm(r)),this._blurMaterial=qm(r,e,t)}return s}_compileMaterial(e){const t=new Lt(this._lodPlanes[0],e);this._renderer.compile(t,Aa)}_sceneToCubeUV(e,t,n,s,r){const l=new on(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(pc),d.toneMapping=Xn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const v=new Xr({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1}),m=new Lt(new Kn,v);let p=!1;const T=e.background;T?T.isColor&&(v.color.copy(T),e.background=null,p=!0):(v.color.copy(pc),p=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const C=this._cubeSize;vr(s,M*C,w>2?C:0,C,C),d.setRenderTarget(s),p&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=u,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ts||e.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=xc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Lt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;vr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Aa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=mc[(s-r-1)%mc.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Lt(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ui-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):ui;m>ui&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ui}`);const p=[];let T=0;for(let L=0;L<ui;++L){const U=L/v,y=Math.exp(-U*U/2);p.push(y),L===0?T+=y:L<m&&(T+=2*y)}for(let L=0;L<p.length;L++)p[L]=p[L]/T;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:w}=this;u.dTheta.value=g,u.mipInt.value=w-n;const M=this._sizeLods[s],C=3*M*(s>w-qi?s-w+qi:0),A=4*(this._cubeSize-M);vr(t,C,A,3*M,2*M),l.setRenderTarget(t),l.render(d,Aa)}}function Xm(i){const e=[],t=[],n=[];let s=i;const r=i-qi+1+fc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-qi?l=fc[a-i+qi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,m=2,p=1,T=new Float32Array(v*g*f),w=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let A=0;A<f;A++){const L=A%3*2/3-1,U=A>2?0:-1,y=[L,U,0,L+2/3,U,0,L+2/3,U+1,0,L,U,0,L+2/3,U+1,0,L,U+1,0];T.set(y,v*g*A),w.set(u,m*g*A);const b=[A,A,A,A,A,A];M.set(b,p*g*A)}const C=new cn;C.setAttribute("position",new Gt(T,v)),C.setAttribute("uv",new Gt(w,m)),C.setAttribute("faceIndex",new Gt(M,p)),e.push(C),s>qi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function _c(i,e,t){const n=new _i(i,e,t);return n.texture.mapping=Wr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function qm(i,e,t){const n=new Float32Array(ui),s=new D(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xl(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function vc(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xl(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function xc(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function xl(){return`

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
	`}function $m(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Za||l===Qa,h=l===ts||l===ns;if(c||h){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new gc(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new gc(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Km(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Fs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ym(i,e,t,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const T=f.array;v=f.version;for(let w=0,M=T.length;w<M;w+=3){const C=T[w+0],A=T[w+1],L=T[w+2];u.push(C,A,A,L,L,C)}}else if(g!==void 0){const T=g.array;v=g.version;for(let w=0,M=T.length/3-1;w<M;w+=3){const C=w+0,A=w+1,L=w+2;u.push(C,A,A,L,L,C)}}else return;const m=new(vh(u)?Mh:yh)(u,1);m.version=v;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function jm(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*a),t.update(f,n,1)}function c(u,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,u*a,g),t.update(f,n,g))}function h(u,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function d(u,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,v,0,g);let p=0;for(let T=0;T<g;T++)p+=f[T]*v[T];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Zm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Qm(i,e,t){const n=new WeakMap,s=new ft;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let y=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",y)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let w=0;f===!0&&(w=1),g===!0&&(w=2),v===!0&&(w=3);let M=o.attributes.position.count*w,C=1;M>e.maxTextureSize&&(C=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const A=new Float32Array(M*C*4*d),L=new xh(A,M,C,d);L.type=_n,L.needsUpdate=!0;const U=w*4;for(let b=0;b<d;b++){const P=m[b],O=p[b],V=T[b],q=M*C*4*b;for(let Y=0;Y<P.count;Y++){const X=Y*U;f===!0&&(s.fromBufferAttribute(P,Y),A[q+X+0]=s.x,A[q+X+1]=s.y,A[q+X+2]=s.z,A[q+X+3]=0),g===!0&&(s.fromBufferAttribute(O,Y),A[q+X+4]=s.x,A[q+X+5]=s.y,A[q+X+6]=s.z,A[q+X+7]=0),v===!0&&(s.fromBufferAttribute(V,Y),A[q+X+8]=s.x,A[q+X+9]=s.y,A[q+X+10]=s.z,A[q+X+11]=V.itemSize===4?s.w:1)}}u={count:d,texture:L,size:new Oe(M,C)},n.set(o,u),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Jm(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Ih=new Dt,bc=new Ph(1,1),kh=new xh,Uh=new yu,Nh=new Eh,yc=[],Mc=[],Sc=new Float32Array(16),wc=new Float32Array(9),Ec=new Float32Array(4);function cs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=yc[s];if(r===void 0&&(r=new Float32Array(s),yc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function qr(i,e){let t=Mc[e];t===void 0&&(t=new Int32Array(e),Mc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function eg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function tg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function sg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Ec.set(n),i.uniformMatrix2fv(this.addr,!1,Ec),St(t,n)}}function rg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;wc.set(n),i.uniformMatrix3fv(this.addr,!1,wc),St(t,n)}}function ag(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Sc.set(n),i.uniformMatrix4fv(this.addr,!1,Sc),St(t,n)}}function og(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function hg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function dg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ug(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function fg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function pg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function mg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(bc.compareFunction=_h,r=bc):r=Ih,t.setTexture2D(e||r,s)}function gg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Uh,s)}function _g(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Nh,s)}function vg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||kh,s)}function xg(i){switch(i){case 5126:return eg;case 35664:return tg;case 35665:return ng;case 35666:return ig;case 35674:return sg;case 35675:return rg;case 35676:return ag;case 5124:case 35670:return og;case 35667:case 35671:return lg;case 35668:case 35672:return cg;case 35669:case 35673:return hg;case 5125:return dg;case 36294:return ug;case 36295:return fg;case 36296:return pg;case 35678:case 36198:case 36298:case 36306:case 35682:return mg;case 35679:case 36299:case 36307:return gg;case 35680:case 36300:case 36308:case 36293:return _g;case 36289:case 36303:case 36311:case 36292:return vg}}function bg(i,e){i.uniform1fv(this.addr,e)}function yg(i,e){const t=cs(e,this.size,2);i.uniform2fv(this.addr,t)}function Mg(i,e){const t=cs(e,this.size,3);i.uniform3fv(this.addr,t)}function Sg(i,e){const t=cs(e,this.size,4);i.uniform4fv(this.addr,t)}function wg(i,e){const t=cs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Eg(i,e){const t=cs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Tg(i,e){const t=cs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ag(i,e){i.uniform1iv(this.addr,e)}function Rg(i,e){i.uniform2iv(this.addr,e)}function Cg(i,e){i.uniform3iv(this.addr,e)}function Pg(i,e){i.uniform4iv(this.addr,e)}function Lg(i,e){i.uniform1uiv(this.addr,e)}function Dg(i,e){i.uniform2uiv(this.addr,e)}function Fg(i,e){i.uniform3uiv(this.addr,e)}function Ig(i,e){i.uniform4uiv(this.addr,e)}function kg(i,e,t){const n=this.cache,s=e.length,r=qr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Ih,r[a])}function Ug(i,e,t){const n=this.cache,s=e.length,r=qr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Uh,r[a])}function Ng(i,e,t){const n=this.cache,s=e.length,r=qr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Nh,r[a])}function Bg(i,e,t){const n=this.cache,s=e.length,r=qr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||kh,r[a])}function Og(i){switch(i){case 5126:return bg;case 35664:return yg;case 35665:return Mg;case 35666:return Sg;case 35674:return wg;case 35675:return Eg;case 35676:return Tg;case 5124:case 35670:return Ag;case 35667:case 35671:return Rg;case 35668:case 35672:return Cg;case 35669:case 35673:return Pg;case 5125:return Lg;case 36294:return Dg;case 36295:return Fg;case 36296:return Ig;case 35678:case 36198:case 36298:case 36306:case 35682:return kg;case 35679:case 36299:case 36307:return Ug;case 35680:case 36300:case 36308:case 36293:return Ng;case 36289:case 36303:case 36311:case 36292:return Bg}}class zg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=xg(t.type)}}class Gg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Og(t.type)}}class Hg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Da=/(\w+)(\])?(\[|\.)?/g;function Tc(i,e){i.seq.push(e),i.map[e.id]=e}function Vg(i,e,t){const n=i.name,s=n.length;for(Da.lastIndex=0;;){const r=Da.exec(n),a=Da.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Tc(t,c===void 0?new zg(o,i,e):new Gg(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Hg(o),Tc(t,d)),t=d}}}class Ar{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Vg(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Ac(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Wg=37297;let Xg=0;function qg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Rc=new Ue;function $g(i){qe._getMatrix(Rc,qe.workingColorSpace,i);const e=`mat3( ${Rc.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case Ir:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Cc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+qg(i.getShaderSource(e),o)}else return r}function Kg(i,e){const t=$g(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Yg(i,e){let t;switch(e){case Yd:t="Linear";break;case jd:t="Reinhard";break;case Zd:t="Cineon";break;case Qd:t="ACESFilmic";break;case eu:t="AgX";break;case tu:t="Neutral";break;case Jd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xr=new D;function jg(){qe.getLuminanceCoefficients(xr);const i=xr.x.toFixed(4),e=xr.y.toFixed(4),t=xr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Es).join(`
`)}function Qg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Jg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Es(i){return i!==""}function Pc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const e0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Io(i){return i.replace(e0,n0)}const t0=new Map;function n0(i,e){let t=Be[e];if(t===void 0){const n=t0.get(e);if(n!==void 0)t=Be[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Io(t)}const i0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dc(i){return i.replace(i0,s0)}function s0(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function r0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ah?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===oh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ln&&(e="SHADOWMAP_TYPE_VSM"),e}function a0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ts:case ns:e="ENVMAP_TYPE_CUBE";break;case Wr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function o0(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===ns&&(e="ENVMAP_MODE_REFRACTION"),e}function l0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case rl:e="ENVMAP_BLENDING_MULTIPLY";break;case $d:e="ENVMAP_BLENDING_MIX";break;case Kd:e="ENVMAP_BLENDING_ADD";break}return e}function c0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function h0(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=r0(t),c=a0(t),h=o0(t),d=l0(t),u=c0(t),f=Zg(t),g=Qg(r),v=s.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Es).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Es).join(`
`),p.length>0&&(p+=`
`)):(m=[Fc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Es).join(`
`),p=[Fc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Xn?Yg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,Kg("linearToOutputTexel",t.outputColorSpace),jg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Es).join(`
`)),a=Io(a),a=Pc(a,t),a=Lc(a,t),o=Io(o),o=Pc(o,t),o=Lc(o,t),a=Dc(a),o=Dc(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=T+m+a,M=T+p+o,C=Ac(s,s.VERTEX_SHADER,w),A=Ac(s,s.FRAGMENT_SHADER,M);s.attachShader(v,C),s.attachShader(v,A),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function L(P){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(v)||"",V=s.getShaderInfoLog(C)||"",q=s.getShaderInfoLog(A)||"",Y=O.trim(),X=V.trim(),ie=q.trim();let G=!0,oe=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,C,A);else{const de=Cc(s,C,"vertex"),we=Cc(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+Y+`
`+de+`
`+we)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(X===""||ie==="")&&(oe=!1);oe&&(P.diagnostics={runnable:G,programLog:Y,vertexShader:{log:X,prefix:m},fragmentShader:{log:ie,prefix:p}})}s.deleteShader(C),s.deleteShader(A),U=new Ar(s,v),y=Jg(s,v)}let U;this.getUniforms=function(){return U===void 0&&L(this),U};let y;this.getAttributes=function(){return y===void 0&&L(this),y};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(v,Wg)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Xg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=A,this}let d0=0;class u0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new f0(e),t.set(e,n)),n}}class f0{constructor(e){this.id=d0++,this.code=e,this.usedTimes=0}}function p0(i,e,t,n,s,r,a){const o=new ml,l=new u0,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,b,P,O,V){const q=O.fog,Y=V.geometry,X=y.isMeshStandardMaterial?O.environment:null,ie=(y.isMeshStandardMaterial?t:e).get(y.envMap||X),G=ie&&ie.mapping===Wr?ie.image.height:null,oe=g[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const de=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,we=de!==void 0?de.length:0;let ze=0;Y.morphAttributes.position!==void 0&&(ze=1),Y.morphAttributes.normal!==void 0&&(ze=2),Y.morphAttributes.color!==void 0&&(ze=3);let nt,rt,Ke,$;if(oe){const Ye=fn[oe];nt=Ye.vertexShader,rt=Ye.fragmentShader}else nt=y.vertexShader,rt=y.fragmentShader,l.update(y),Ke=l.getVertexShaderID(y),$=l.getFragmentShaderID(y);const Z=i.getRenderTarget(),pe=i.state.buffers.depth.getReversed(),Le=V.isInstancedMesh===!0,Se=V.isBatchedMesh===!0,We=!!y.map,Rt=!!y.matcap,E=!!ie,at=!!y.aoMap,Ie=!!y.lightMap,Ce=!!y.bumpMap,_e=!!y.normalMap,ot=!!y.displacementMap,ve=!!y.emissiveMap,Ne=!!y.metalnessMap,wt=!!y.roughnessMap,mt=y.anisotropy>0,S=y.clearcoat>0,_=y.dispersion>0,k=y.iridescence>0,W=y.sheen>0,j=y.transmission>0,H=mt&&!!y.anisotropyMap,Me=S&&!!y.clearcoatMap,se=S&&!!y.clearcoatNormalMap,xe=S&&!!y.clearcoatRoughnessMap,be=k&&!!y.iridescenceMap,te=k&&!!y.iridescenceThicknessMap,he=W&&!!y.sheenColorMap,Re=W&&!!y.sheenRoughnessMap,ye=!!y.specularMap,le=!!y.specularColorMap,ke=!!y.specularIntensityMap,R=j&&!!y.transmissionMap,ne=j&&!!y.thicknessMap,re=!!y.gradientMap,fe=!!y.alphaMap,Q=y.alphaTest>0,K=!!y.alphaHash,ge=!!y.extensions;let Fe=Xn;y.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Fe=i.toneMapping);const it={shaderID:oe,shaderType:y.type,shaderName:y.name,vertexShader:nt,fragmentShader:rt,defines:y.defines,customVertexShaderID:Ke,customFragmentShaderID:$,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Se,batchingColor:Se&&V._colorsTexture!==null,instancing:Le,instancingColor:Le&&V.instanceColor!==null,instancingMorph:Le&&V.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:is,alphaToCoverage:!!y.alphaToCoverage,map:We,matcap:Rt,envMap:E,envMapMode:E&&ie.mapping,envMapCubeUVHeight:G,aoMap:at,lightMap:Ie,bumpMap:Ce,normalMap:_e,displacementMap:u&&ot,emissiveMap:ve,normalMapObjectSpace:_e&&y.normalMapType===ru,normalMapTangentSpace:_e&&y.normalMapType===gh,metalnessMap:Ne,roughnessMap:wt,anisotropy:mt,anisotropyMap:H,clearcoat:S,clearcoatMap:Me,clearcoatNormalMap:se,clearcoatRoughnessMap:xe,dispersion:_,iridescence:k,iridescenceMap:be,iridescenceThicknessMap:te,sheen:W,sheenColorMap:he,sheenRoughnessMap:Re,specularMap:ye,specularColorMap:le,specularIntensityMap:ke,transmission:j,transmissionMap:R,thicknessMap:ne,gradientMap:re,opaque:y.transparent===!1&&y.blending===Yi&&y.alphaToCoverage===!1,alphaMap:fe,alphaTest:Q,alphaHash:K,combine:y.combine,mapUv:We&&v(y.map.channel),aoMapUv:at&&v(y.aoMap.channel),lightMapUv:Ie&&v(y.lightMap.channel),bumpMapUv:Ce&&v(y.bumpMap.channel),normalMapUv:_e&&v(y.normalMap.channel),displacementMapUv:ot&&v(y.displacementMap.channel),emissiveMapUv:ve&&v(y.emissiveMap.channel),metalnessMapUv:Ne&&v(y.metalnessMap.channel),roughnessMapUv:wt&&v(y.roughnessMap.channel),anisotropyMapUv:H&&v(y.anisotropyMap.channel),clearcoatMapUv:Me&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:se&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:te&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:he&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Re&&v(y.sheenRoughnessMap.channel),specularMapUv:ye&&v(y.specularMap.channel),specularColorMapUv:le&&v(y.specularColorMap.channel),specularIntensityMapUv:ke&&v(y.specularIntensityMap.channel),transmissionMapUv:R&&v(y.transmissionMap.channel),thicknessMapUv:ne&&v(y.thicknessMap.channel),alphaMapUv:fe&&v(y.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(_e||mt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Y.attributes.uv&&(We||fe),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:V.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:ze,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Fe,decodeVideoTexture:We&&y.map.isVideoTexture===!0&&qe.getTransfer(y.map.colorSpace)===Ze,decodeVideoTextureEmissive:ve&&y.emissiveMap.isVideoTexture===!0&&qe.getTransfer(y.emissiveMap.colorSpace)===Ze,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===pn,flipSided:y.side===zt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ge&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&y.extensions.multiDraw===!0||Se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return it.vertexUv1s=c.has(1),it.vertexUv2s=c.has(2),it.vertexUv3s=c.has(3),c.clear(),it}function p(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)b.push(P),b.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(T(b,y),w(b,y),b.push(i.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function T(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function w(y,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),y.push(o.mask)}function M(y){const b=g[y.type];let P;if(b){const O=fn[b];P=Iu.clone(O.uniforms)}else P=y.uniforms;return P}function C(y,b){let P;for(let O=0,V=h.length;O<V;O++){const q=h[O];if(q.cacheKey===b){P=q,++P.usedTimes;break}}return P===void 0&&(P=new h0(i,b,y,r),h.push(P)),P}function A(y){if(--y.usedTimes===0){const b=h.indexOf(y);h[b]=h[h.length-1],h.pop(),y.destroy()}}function L(y){l.remove(y)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:C,releaseProgram:A,releaseShaderCache:L,programs:h,dispose:U}}function m0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function g0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ic(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function kc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,u,f,g,v,m){let p=i[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},i[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=v,p.group=m),e++,p}function o(d,u,f,g,v,m){const p=a(d,u,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(d,u,f,g,v,m){const p=a(d,u,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(d,u){t.length>1&&t.sort(d||g0),n.length>1&&n.sort(u||Ic),s.length>1&&s.sort(u||Ic)}function h(){for(let d=e,u=i.length;d<u;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function _0(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new kc,i.set(n,[a])):s>=r.length?(a=new kc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function v0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new De};break;case"SpotLight":t={position:new D,direction:new D,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function x0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let b0=0;function y0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function M0(i){const e=new v0,t=x0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new Je,a=new Je;function o(c){let h=0,d=0,u=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,T=0,w=0,M=0,C=0,A=0,L=0;c.sort(y0);for(let y=0,b=c.length;y<b;y++){const P=c[y],O=P.color,V=P.intensity,q=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=O.r*V,d+=O.g*V,u+=O.b*V;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],V);L++}else if(P.isDirectionalLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const ie=P.shadow,G=t.get(P);G.shadowIntensity=ie.intensity,G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=P.shadow.matrix,T++}n.directional[f]=X,f++}else if(P.isSpotLight){const X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(O).multiplyScalar(V),X.distance=q,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[v]=X;const ie=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,ie.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[v]=ie.matrix,P.castShadow){const G=t.get(P);G.shadowIntensity=ie.intensity,G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=Y,M++}v++}else if(P.isRectAreaLight){const X=e.get(P);X.color.copy(O).multiplyScalar(V),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=X,m++}else if(P.isPointLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const ie=P.shadow,G=t.get(P);G.shadowIntensity=ie.intensity,G.shadowBias=ie.bias,G.shadowNormalBias=ie.normalBias,G.shadowRadius=ie.radius,G.shadowMapSize=ie.mapSize,G.shadowCameraNear=ie.camera.near,G.shadowCameraFar=ie.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=P.shadow.matrix,w++}n.point[g]=X,g++}else if(P.isHemisphereLight){const X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(V),X.groundColor.copy(P.groundColor).multiplyScalar(V),n.hemi[p]=X,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const U=n.hash;(U.directionalLength!==f||U.pointLength!==g||U.spotLength!==v||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==T||U.numPointShadows!==w||U.numSpotShadows!==M||U.numSpotMaps!==C||U.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=M+C-A,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=L,U.directionalLength=f,U.pointLength=g,U.spotLength=v,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=T,U.numPointShadows=w,U.numSpotShadows=M,U.numSpotMaps=C,U.numLightProbes=L,n.version=b0++)}function l(c,h){let d=0,u=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const w=c[p];if(w.isDirectionalLight){const M=n.directional[d];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(w.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(w.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),u++}else if(w.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Uc(i){const e=new M0(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function S0(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Uc(i),e.set(s,[o])):r>=a.length?(o=new Uc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const w0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,E0=`uniform sampler2D shadow_pass;
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
}`;function T0(i,e,t){let n=new _l;const s=new Oe,r=new Oe,a=new ft,o=new Ku({depthPacking:su}),l=new Yu,c={},h=t.maxTextureSize,d={[$n]:zt,[zt]:$n,[pn]:pn},u=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:w0,fragmentShader:E0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new cn;g.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Lt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ah;let p=this.type;this.render=function(A,L,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const y=i.getRenderTarget(),b=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Wn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const V=p!==Ln&&this.type===Ln,q=p===Ln&&this.type!==Ln;for(let Y=0,X=A.length;Y<X;Y++){const ie=A[Y],G=ie.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const oe=G.getFrameExtents();if(s.multiply(oe),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,G.mapSize.y=r.y)),G.map===null||V===!0||q===!0){const we=this.type!==Ln?{minFilter:$t,magFilter:$t}:{};G.map!==null&&G.map.dispose(),G.map=new _i(s.x,s.y,we),G.map.texture.name=ie.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const de=G.getViewportCount();for(let we=0;we<de;we++){const ze=G.getViewport(we);a.set(r.x*ze.x,r.y*ze.y,r.x*ze.z,r.y*ze.w),O.viewport(a),G.updateMatrices(ie,we),n=G.getFrustum(),M(L,U,G.camera,ie,this.type)}G.isPointLightShadow!==!0&&this.type===Ln&&T(G,U),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,b,P)};function T(A,L){const U=e.update(v);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new _i(s.x,s.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(L,null,U,u,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(L,null,U,f,v,null)}function w(A,L,U,y){let b=null;const P=U.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)b=P;else if(b=U.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const O=b.uuid,V=L.uuid;let q=c[O];q===void 0&&(q={},c[O]=q);let Y=q[V];Y===void 0&&(Y=b.clone(),q[V]=Y,L.addEventListener("dispose",C)),b=Y}if(b.visible=L.visible,b.wireframe=L.wireframe,y===Ln?b.side=L.shadowSide!==null?L.shadowSide:L.side:b.side=L.shadowSide!==null?L.shadowSide:d[L.side],b.alphaMap=L.alphaMap,b.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,b.map=L.map,b.clipShadows=L.clipShadows,b.clippingPlanes=L.clippingPlanes,b.clipIntersection=L.clipIntersection,b.displacementMap=L.displacementMap,b.displacementScale=L.displacementScale,b.displacementBias=L.displacementBias,b.wireframeLinewidth=L.wireframeLinewidth,b.linewidth=L.linewidth,U.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const O=i.properties.get(b);O.light=U}return b}function M(A,L,U,y,b){if(A.visible===!1)return;if(A.layers.test(L.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Ln)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,A.matrixWorld);const V=e.update(A),q=A.material;if(Array.isArray(q)){const Y=V.groups;for(let X=0,ie=Y.length;X<ie;X++){const G=Y[X],oe=q[G.materialIndex];if(oe&&oe.visible){const de=w(A,oe,y,b);A.onBeforeShadow(i,A,L,U,V,de,G),i.renderBufferDirect(U,null,V,de,A,G),A.onAfterShadow(i,A,L,U,V,de,G)}}}else if(q.visible){const Y=w(A,q,y,b);A.onBeforeShadow(i,A,L,U,V,Y,null),i.renderBufferDirect(U,null,V,Y,A,null),A.onAfterShadow(i,A,L,U,V,Y,null)}}const O=A.children;for(let V=0,q=O.length;V<q;V++)M(O[V],L,U,y,b)}function C(A){A.target.removeEventListener("dispose",C);for(const U in c){const y=c[U],b=A.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}const A0={[Wa]:Xa,[qa]:Ya,[$a]:ja,[es]:Ka,[Xa]:Wa,[Ya]:qa,[ja]:$a,[Ka]:es};function R0(i,e){function t(){let R=!1;const ne=new ft;let re=null;const fe=new ft(0,0,0,0);return{setMask:function(Q){re!==Q&&!R&&(i.colorMask(Q,Q,Q,Q),re=Q)},setLocked:function(Q){R=Q},setClear:function(Q,K,ge,Fe,it){it===!0&&(Q*=Fe,K*=Fe,ge*=Fe),ne.set(Q,K,ge,Fe),fe.equals(ne)===!1&&(i.clearColor(Q,K,ge,Fe),fe.copy(ne))},reset:function(){R=!1,re=null,fe.set(-1,0,0,0)}}}function n(){let R=!1,ne=!1,re=null,fe=null,Q=null;return{setReversed:function(K){if(ne!==K){const ge=e.get("EXT_clip_control");K?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),ne=K;const Fe=Q;Q=null,this.setClear(Fe)}},getReversed:function(){return ne},setTest:function(K){K?Z(i.DEPTH_TEST):pe(i.DEPTH_TEST)},setMask:function(K){re!==K&&!R&&(i.depthMask(K),re=K)},setFunc:function(K){if(ne&&(K=A0[K]),fe!==K){switch(K){case Wa:i.depthFunc(i.NEVER);break;case Xa:i.depthFunc(i.ALWAYS);break;case qa:i.depthFunc(i.LESS);break;case es:i.depthFunc(i.LEQUAL);break;case $a:i.depthFunc(i.EQUAL);break;case Ka:i.depthFunc(i.GEQUAL);break;case Ya:i.depthFunc(i.GREATER);break;case ja:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}fe=K}},setLocked:function(K){R=K},setClear:function(K){Q!==K&&(ne&&(K=1-K),i.clearDepth(K),Q=K)},reset:function(){R=!1,re=null,fe=null,Q=null,ne=!1}}}function s(){let R=!1,ne=null,re=null,fe=null,Q=null,K=null,ge=null,Fe=null,it=null;return{setTest:function(Ye){R||(Ye?Z(i.STENCIL_TEST):pe(i.STENCIL_TEST))},setMask:function(Ye){ne!==Ye&&!R&&(i.stencilMask(Ye),ne=Ye)},setFunc:function(Ye,wn,hn){(re!==Ye||fe!==wn||Q!==hn)&&(i.stencilFunc(Ye,wn,hn),re=Ye,fe=wn,Q=hn)},setOp:function(Ye,wn,hn){(K!==Ye||ge!==wn||Fe!==hn)&&(i.stencilOp(Ye,wn,hn),K=Ye,ge=wn,Fe=hn)},setLocked:function(Ye){R=Ye},setClear:function(Ye){it!==Ye&&(i.clearStencil(Ye),it=Ye)},reset:function(){R=!1,ne=null,re=null,fe=null,Q=null,K=null,ge=null,Fe=null,it=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,v=!1,m=null,p=null,T=null,w=null,M=null,C=null,A=null,L=new De(0,0,0),U=0,y=!1,b=null,P=null,O=null,V=null,q=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ie=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=ie>=1):G.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=ie>=2);let oe=null,de={};const we=i.getParameter(i.SCISSOR_BOX),ze=i.getParameter(i.VIEWPORT),nt=new ft().fromArray(we),rt=new ft().fromArray(ze);function Ke(R,ne,re,fe){const Q=new Uint8Array(4),K=i.createTexture();i.bindTexture(R,K),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ge=0;ge<re;ge++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,fe,0,i.RGBA,i.UNSIGNED_BYTE,Q):i.texImage2D(ne+ge,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Q);return K}const $={};$[i.TEXTURE_2D]=Ke(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=Ke(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=Ke(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=Ke(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(i.DEPTH_TEST),a.setFunc(es),Ce(!1),_e(Ll),Z(i.CULL_FACE),at(Wn);function Z(R){h[R]!==!0&&(i.enable(R),h[R]=!0)}function pe(R){h[R]!==!1&&(i.disable(R),h[R]=!1)}function Le(R,ne){return d[R]!==ne?(i.bindFramebuffer(R,ne),d[R]=ne,R===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ne),R===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function Se(R,ne){let re=f,fe=!1;if(R){re=u.get(ne),re===void 0&&(re=[],u.set(ne,re));const Q=R.textures;if(re.length!==Q.length||re[0]!==i.COLOR_ATTACHMENT0){for(let K=0,ge=Q.length;K<ge;K++)re[K]=i.COLOR_ATTACHMENT0+K;re.length=Q.length,fe=!0}}else re[0]!==i.BACK&&(re[0]=i.BACK,fe=!0);fe&&i.drawBuffers(re)}function We(R){return g!==R?(i.useProgram(R),g=R,!0):!1}const Rt={[di]:i.FUNC_ADD,[Pd]:i.FUNC_SUBTRACT,[Ld]:i.FUNC_REVERSE_SUBTRACT};Rt[Dd]=i.MIN,Rt[Fd]=i.MAX;const E={[Id]:i.ZERO,[kd]:i.ONE,[Ud]:i.SRC_COLOR,[Ha]:i.SRC_ALPHA,[Hd]:i.SRC_ALPHA_SATURATE,[zd]:i.DST_COLOR,[Bd]:i.DST_ALPHA,[Nd]:i.ONE_MINUS_SRC_COLOR,[Va]:i.ONE_MINUS_SRC_ALPHA,[Gd]:i.ONE_MINUS_DST_COLOR,[Od]:i.ONE_MINUS_DST_ALPHA,[Vd]:i.CONSTANT_COLOR,[Wd]:i.ONE_MINUS_CONSTANT_COLOR,[Xd]:i.CONSTANT_ALPHA,[qd]:i.ONE_MINUS_CONSTANT_ALPHA};function at(R,ne,re,fe,Q,K,ge,Fe,it,Ye){if(R===Wn){v===!0&&(pe(i.BLEND),v=!1);return}if(v===!1&&(Z(i.BLEND),v=!0),R!==Cd){if(R!==m||Ye!==y){if((p!==di||M!==di)&&(i.blendEquation(i.FUNC_ADD),p=di,M=di),Ye)switch(R){case Yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fr:i.blendFunc(i.ONE,i.ONE);break;case Dl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Dl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}T=null,w=null,C=null,A=null,L.set(0,0,0),U=0,m=R,y=Ye}return}Q=Q||ne,K=K||re,ge=ge||fe,(ne!==p||Q!==M)&&(i.blendEquationSeparate(Rt[ne],Rt[Q]),p=ne,M=Q),(re!==T||fe!==w||K!==C||ge!==A)&&(i.blendFuncSeparate(E[re],E[fe],E[K],E[ge]),T=re,w=fe,C=K,A=ge),(Fe.equals(L)===!1||it!==U)&&(i.blendColor(Fe.r,Fe.g,Fe.b,it),L.copy(Fe),U=it),m=R,y=!1}function Ie(R,ne){R.side===pn?pe(i.CULL_FACE):Z(i.CULL_FACE);let re=R.side===zt;ne&&(re=!re),Ce(re),R.blending===Yi&&R.transparent===!1?at(Wn):at(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);const fe=R.stencilWrite;o.setTest(fe),fe&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),ve(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(R){b!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),b=R)}function _e(R){R!==Ad?(Z(i.CULL_FACE),R!==P&&(R===Ll?i.cullFace(i.BACK):R===Rd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pe(i.CULL_FACE),P=R}function ot(R){R!==O&&(X&&i.lineWidth(R),O=R)}function ve(R,ne,re){R?(Z(i.POLYGON_OFFSET_FILL),(V!==ne||q!==re)&&(i.polygonOffset(ne,re),V=ne,q=re)):pe(i.POLYGON_OFFSET_FILL)}function Ne(R){R?Z(i.SCISSOR_TEST):pe(i.SCISSOR_TEST)}function wt(R){R===void 0&&(R=i.TEXTURE0+Y-1),oe!==R&&(i.activeTexture(R),oe=R)}function mt(R,ne,re){re===void 0&&(oe===null?re=i.TEXTURE0+Y-1:re=oe);let fe=de[re];fe===void 0&&(fe={type:void 0,texture:void 0},de[re]=fe),(fe.type!==R||fe.texture!==ne)&&(oe!==re&&(i.activeTexture(re),oe=re),i.bindTexture(R,ne||$[R]),fe.type=R,fe.texture=ne)}function S(){const R=de[oe];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function W(){try{i.texSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function j(){try{i.texSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function H(){try{i.compressedTexSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Me(){try{i.compressedTexSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function se(){try{i.texStorage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function xe(){try{i.texStorage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function be(){try{i.texImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function te(){try{i.texImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function he(R){nt.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),nt.copy(R))}function Re(R){rt.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),rt.copy(R))}function ye(R,ne){let re=c.get(ne);re===void 0&&(re=new WeakMap,c.set(ne,re));let fe=re.get(R);fe===void 0&&(fe=i.getUniformBlockIndex(ne,R.name),re.set(R,fe))}function le(R,ne){const fe=c.get(ne).get(R);l.get(ne)!==fe&&(i.uniformBlockBinding(ne,fe,R.__bindingPointIndex),l.set(ne,fe))}function ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},oe=null,de={},d={},u=new WeakMap,f=[],g=null,v=!1,m=null,p=null,T=null,w=null,M=null,C=null,A=null,L=new De(0,0,0),U=0,y=!1,b=null,P=null,O=null,V=null,q=null,nt.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Z,disable:pe,bindFramebuffer:Le,drawBuffers:Se,useProgram:We,setBlending:at,setMaterial:Ie,setFlipSided:Ce,setCullFace:_e,setLineWidth:ot,setPolygonOffset:ve,setScissorTest:Ne,activeTexture:wt,bindTexture:mt,unbindTexture:S,compressedTexImage2D:_,compressedTexImage3D:k,texImage2D:be,texImage3D:te,updateUBOMapping:ye,uniformBlockBinding:le,texStorage2D:se,texStorage3D:xe,texSubImage2D:W,texSubImage3D:j,compressedTexSubImage2D:H,compressedTexSubImage3D:Me,scissor:he,viewport:Re,reset:ke}}function C0(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Oe,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,_){return f?new OffscreenCanvas(S,_):Ur("canvas")}function v(S,_,k){let W=1;const j=mt(S);if((j.width>k||j.height>k)&&(W=k/Math.max(j.width,j.height)),W<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const H=Math.floor(W*j.width),Me=Math.floor(W*j.height);d===void 0&&(d=g(H,Me));const se=_?g(H,Me):d;return se.width=H,se.height=Me,se.getContext("2d").drawImage(S,0,0,H,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+H+"x"+Me+")."),se}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),S;return S}function m(S){return S.generateMipmaps}function p(S){i.generateMipmap(S)}function T(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(S,_,k,W,j=!1){if(S!==null){if(i[S]!==void 0)return i[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let H=_;if(_===i.RED&&(k===i.FLOAT&&(H=i.R32F),k===i.HALF_FLOAT&&(H=i.R16F),k===i.UNSIGNED_BYTE&&(H=i.R8)),_===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(H=i.R8UI),k===i.UNSIGNED_SHORT&&(H=i.R16UI),k===i.UNSIGNED_INT&&(H=i.R32UI),k===i.BYTE&&(H=i.R8I),k===i.SHORT&&(H=i.R16I),k===i.INT&&(H=i.R32I)),_===i.RG&&(k===i.FLOAT&&(H=i.RG32F),k===i.HALF_FLOAT&&(H=i.RG16F),k===i.UNSIGNED_BYTE&&(H=i.RG8)),_===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(H=i.RG8UI),k===i.UNSIGNED_SHORT&&(H=i.RG16UI),k===i.UNSIGNED_INT&&(H=i.RG32UI),k===i.BYTE&&(H=i.RG8I),k===i.SHORT&&(H=i.RG16I),k===i.INT&&(H=i.RG32I)),_===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(H=i.RGB8UI),k===i.UNSIGNED_SHORT&&(H=i.RGB16UI),k===i.UNSIGNED_INT&&(H=i.RGB32UI),k===i.BYTE&&(H=i.RGB8I),k===i.SHORT&&(H=i.RGB16I),k===i.INT&&(H=i.RGB32I)),_===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(H=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(H=i.RGBA16UI),k===i.UNSIGNED_INT&&(H=i.RGBA32UI),k===i.BYTE&&(H=i.RGBA8I),k===i.SHORT&&(H=i.RGBA16I),k===i.INT&&(H=i.RGBA32I)),_===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&(H=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(H=i.R11F_G11F_B10F)),_===i.RGBA){const Me=j?Ir:qe.getTransfer(W);k===i.FLOAT&&(H=i.RGBA32F),k===i.HALF_FLOAT&&(H=i.RGBA16F),k===i.UNSIGNED_BYTE&&(H=Me===Ze?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(H=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(H=i.RGB5_A1)}return(H===i.R16F||H===i.R32F||H===i.RG16F||H===i.RG32F||H===i.RGBA16F||H===i.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function M(S,_){let k;return S?_===null||_===gi||_===Ps?k=i.DEPTH24_STENCIL8:_===_n?k=i.DEPTH32F_STENCIL8:_===Cs&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===gi||_===Ps?k=i.DEPTH_COMPONENT24:_===_n?k=i.DEPTH_COMPONENT32F:_===Cs&&(k=i.DEPTH_COMPONENT16),k}function C(S,_){return m(S)===!0||S.isFramebufferTexture&&S.minFilter!==$t&&S.minFilter!==gn?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function A(S){const _=S.target;_.removeEventListener("dispose",A),U(_),_.isVideoTexture&&h.delete(_)}function L(S){const _=S.target;_.removeEventListener("dispose",L),b(_)}function U(S){const _=n.get(S);if(_.__webglInit===void 0)return;const k=S.source,W=u.get(k);if(W){const j=W[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&y(S),Object.keys(W).length===0&&u.delete(k)}n.remove(S)}function y(S){const _=n.get(S);i.deleteTexture(_.__webglTexture);const k=S.source,W=u.get(k);delete W[_.__cacheKey],a.memory.textures--}function b(S){const _=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let j=0;j<_.__webglFramebuffer[W].length;j++)i.deleteFramebuffer(_.__webglFramebuffer[W][j]);else i.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)i.deleteFramebuffer(_.__webglFramebuffer[W]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=S.textures;for(let W=0,j=k.length;W<j;W++){const H=n.get(k[W]);H.__webglTexture&&(i.deleteTexture(H.__webglTexture),a.memory.textures--),n.remove(k[W])}n.remove(S)}let P=0;function O(){P=0}function V(){const S=P;return S>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),P+=1,S}function q(S){const _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function Y(S,_){const k=n.get(S);if(S.isVideoTexture&&Ne(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&k.__version!==S.version){const W=S.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(k,S,_);return}}else S.isExternalTexture&&(k.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+_)}function X(S,_){const k=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&k.__version!==S.version){$(k,S,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+_)}function ie(S,_){const k=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&k.__version!==S.version){$(k,S,_);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+_)}function G(S,_){const k=n.get(S);if(S.version>0&&k.__version!==S.version){Z(k,S,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+_)}const oe={[Ja]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[eo]:i.MIRRORED_REPEAT},de={[$t]:i.NEAREST,[nu]:i.NEAREST_MIPMAP_NEAREST,[$s]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[ea]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},we={[au]:i.NEVER,[uu]:i.ALWAYS,[ou]:i.LESS,[_h]:i.LEQUAL,[lu]:i.EQUAL,[du]:i.GEQUAL,[cu]:i.GREATER,[hu]:i.NOTEQUAL};function ze(S,_){if(_.type===_n&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===gn||_.magFilter===ea||_.magFilter===$s||_.magFilter===pi||_.minFilter===gn||_.minFilter===ea||_.minFilter===$s||_.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,oe[_.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,oe[_.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,oe[_.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,de[_.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,de[_.minFilter]),_.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,we[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===$t||_.minFilter!==$s&&_.minFilter!==pi||_.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(S,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function nt(S,_){let k=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",A));const W=_.source;let j=u.get(W);j===void 0&&(j={},u.set(W,j));const H=q(_);if(H!==S.__cacheKey){j[H]===void 0&&(j[H]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),j[H].usedTimes++;const Me=j[S.__cacheKey];Me!==void 0&&(j[S.__cacheKey].usedTimes--,Me.usedTimes===0&&y(_)),S.__cacheKey=H,S.__webglTexture=j[H].texture}return k}function rt(S,_,k){return Math.floor(Math.floor(S/k)/_)}function Ke(S,_,k,W){const H=S.updateRanges;if(H.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,k,W,_.data);else{H.sort((te,he)=>te.start-he.start);let Me=0;for(let te=1;te<H.length;te++){const he=H[Me],Re=H[te],ye=he.start+he.count,le=rt(Re.start,_.width,4),ke=rt(he.start,_.width,4);Re.start<=ye+1&&le===ke&&rt(Re.start+Re.count-1,_.width,4)===le?he.count=Math.max(he.count,Re.start+Re.count-he.start):(++Me,H[Me]=Re)}H.length=Me+1;const se=i.getParameter(i.UNPACK_ROW_LENGTH),xe=i.getParameter(i.UNPACK_SKIP_PIXELS),be=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let te=0,he=H.length;te<he;te++){const Re=H[te],ye=Math.floor(Re.start/4),le=Math.ceil(Re.count/4),ke=ye%_.width,R=Math.floor(ye/_.width),ne=le,re=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ke),i.pixelStorei(i.UNPACK_SKIP_ROWS,R),t.texSubImage2D(i.TEXTURE_2D,0,ke,R,ne,re,k,W,_.data)}S.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,se),i.pixelStorei(i.UNPACK_SKIP_PIXELS,xe),i.pixelStorei(i.UNPACK_SKIP_ROWS,be)}}function $(S,_,k){let W=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=i.TEXTURE_3D);const j=nt(S,_),H=_.source;t.bindTexture(W,S.__webglTexture,i.TEXTURE0+k);const Me=n.get(H);if(H.version!==Me.__version||j===!0){t.activeTexture(i.TEXTURE0+k);const se=qe.getPrimaries(qe.workingColorSpace),xe=_.colorSpace===Hn?null:qe.getPrimaries(_.colorSpace),be=_.colorSpace===Hn||se===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let te=v(_.image,!1,s.maxTextureSize);te=wt(_,te);const he=r.convert(_.format,_.colorSpace),Re=r.convert(_.type);let ye=w(_.internalFormat,he,Re,_.colorSpace,_.isVideoTexture);ze(W,_);let le;const ke=_.mipmaps,R=_.isVideoTexture!==!0,ne=Me.__version===void 0||j===!0,re=H.dataReady,fe=C(_,te);if(_.isDepthTexture)ye=M(_.format===Ds,_.type),ne&&(R?t.texStorage2D(i.TEXTURE_2D,1,ye,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,ye,te.width,te.height,0,he,Re,null));else if(_.isDataTexture)if(ke.length>0){R&&ne&&t.texStorage2D(i.TEXTURE_2D,fe,ye,ke[0].width,ke[0].height);for(let Q=0,K=ke.length;Q<K;Q++)le=ke[Q],R?re&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,le.width,le.height,he,Re,le.data):t.texImage2D(i.TEXTURE_2D,Q,ye,le.width,le.height,0,he,Re,le.data);_.generateMipmaps=!1}else R?(ne&&t.texStorage2D(i.TEXTURE_2D,fe,ye,te.width,te.height),re&&Ke(_,te,he,Re)):t.texImage2D(i.TEXTURE_2D,0,ye,te.width,te.height,0,he,Re,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){R&&ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,ye,ke[0].width,ke[0].height,te.depth);for(let Q=0,K=ke.length;Q<K;Q++)if(le=ke[Q],_.format!==ln)if(he!==null)if(R){if(re)if(_.layerUpdates.size>0){const ge=uc(le.width,le.height,_.format,_.type);for(const Fe of _.layerUpdates){const it=le.data.subarray(Fe*ge/le.data.BYTES_PER_ELEMENT,(Fe+1)*ge/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,Fe,le.width,le.height,1,he,it)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,le.width,le.height,te.depth,he,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,ye,le.width,le.height,te.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?re&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,le.width,le.height,te.depth,he,Re,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,ye,le.width,le.height,te.depth,0,he,Re,le.data)}else{R&&ne&&t.texStorage2D(i.TEXTURE_2D,fe,ye,ke[0].width,ke[0].height);for(let Q=0,K=ke.length;Q<K;Q++)le=ke[Q],_.format!==ln?he!==null?R?re&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,le.width,le.height,he,le.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,ye,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?re&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,le.width,le.height,he,Re,le.data):t.texImage2D(i.TEXTURE_2D,Q,ye,le.width,le.height,0,he,Re,le.data)}else if(_.isDataArrayTexture)if(R){if(ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,ye,te.width,te.height,te.depth),re)if(_.layerUpdates.size>0){const Q=uc(te.width,te.height,_.format,_.type);for(const K of _.layerUpdates){const ge=te.data.subarray(K*Q/te.data.BYTES_PER_ELEMENT,(K+1)*Q/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,te.width,te.height,1,he,Re,ge)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,he,Re,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ye,te.width,te.height,te.depth,0,he,Re,te.data);else if(_.isData3DTexture)R?(ne&&t.texStorage3D(i.TEXTURE_3D,fe,ye,te.width,te.height,te.depth),re&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,he,Re,te.data)):t.texImage3D(i.TEXTURE_3D,0,ye,te.width,te.height,te.depth,0,he,Re,te.data);else if(_.isFramebufferTexture){if(ne)if(R)t.texStorage2D(i.TEXTURE_2D,fe,ye,te.width,te.height);else{let Q=te.width,K=te.height;for(let ge=0;ge<fe;ge++)t.texImage2D(i.TEXTURE_2D,ge,ye,Q,K,0,he,Re,null),Q>>=1,K>>=1}}else if(ke.length>0){if(R&&ne){const Q=mt(ke[0]);t.texStorage2D(i.TEXTURE_2D,fe,ye,Q.width,Q.height)}for(let Q=0,K=ke.length;Q<K;Q++)le=ke[Q],R?re&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he,Re,le):t.texImage2D(i.TEXTURE_2D,Q,ye,he,Re,le);_.generateMipmaps=!1}else if(R){if(ne){const Q=mt(te);t.texStorage2D(i.TEXTURE_2D,fe,ye,Q.width,Q.height)}re&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Re,te)}else t.texImage2D(i.TEXTURE_2D,0,ye,he,Re,te);m(_)&&p(W),Me.__version=H.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function Z(S,_,k){if(_.image.length!==6)return;const W=nt(S,_),j=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+k);const H=n.get(j);if(j.version!==H.__version||W===!0){t.activeTexture(i.TEXTURE0+k);const Me=qe.getPrimaries(qe.workingColorSpace),se=_.colorSpace===Hn?null:qe.getPrimaries(_.colorSpace),xe=_.colorSpace===Hn||Me===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const be=_.isCompressedTexture||_.image[0].isCompressedTexture,te=_.image[0]&&_.image[0].isDataTexture,he=[];for(let K=0;K<6;K++)!be&&!te?he[K]=v(_.image[K],!0,s.maxCubemapSize):he[K]=te?_.image[K].image:_.image[K],he[K]=wt(_,he[K]);const Re=he[0],ye=r.convert(_.format,_.colorSpace),le=r.convert(_.type),ke=w(_.internalFormat,ye,le,_.colorSpace),R=_.isVideoTexture!==!0,ne=H.__version===void 0||W===!0,re=j.dataReady;let fe=C(_,Re);ze(i.TEXTURE_CUBE_MAP,_);let Q;if(be){R&&ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,ke,Re.width,Re.height);for(let K=0;K<6;K++){Q=he[K].mipmaps;for(let ge=0;ge<Q.length;ge++){const Fe=Q[ge];_.format!==ln?ye!==null?R?re&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,0,0,Fe.width,Fe.height,ye,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,ke,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,0,0,Fe.width,Fe.height,ye,le,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,ke,Fe.width,Fe.height,0,ye,le,Fe.data)}}}else{if(Q=_.mipmaps,R&&ne){Q.length>0&&fe++;const K=mt(he[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,ke,K.width,K.height)}for(let K=0;K<6;K++)if(te){R?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,he[K].width,he[K].height,ye,le,he[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,ke,he[K].width,he[K].height,0,ye,le,he[K].data);for(let ge=0;ge<Q.length;ge++){const it=Q[ge].image[K].image;R?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,0,0,it.width,it.height,ye,le,it.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,ke,it.width,it.height,0,ye,le,it.data)}}else{R?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ye,le,he[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,ke,ye,le,he[K]);for(let ge=0;ge<Q.length;ge++){const Fe=Q[ge];R?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,0,0,ye,le,Fe.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,ke,ye,le,Fe.image[K])}}}m(_)&&p(i.TEXTURE_CUBE_MAP),H.__version=j.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function pe(S,_,k,W,j,H){const Me=r.convert(k.format,k.colorSpace),se=r.convert(k.type),xe=w(k.internalFormat,Me,se,k.colorSpace),be=n.get(_),te=n.get(k);if(te.__renderTarget=_,!be.__hasExternalTextures){const he=Math.max(1,_.width>>H),Re=Math.max(1,_.height>>H);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,H,xe,he,Re,_.depth,0,Me,se,null):t.texImage2D(j,H,xe,he,Re,0,Me,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,S),ve(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,j,te.__webglTexture,0,ot(_)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,j,te.__webglTexture,H),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(S,_,k){if(i.bindRenderbuffer(i.RENDERBUFFER,S),_.depthBuffer){const W=_.depthTexture,j=W&&W.isDepthTexture?W.type:null,H=M(_.stencilBuffer,j),Me=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=ot(_);ve(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,H,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,se,H,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,H,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,S)}else{const W=_.textures;for(let j=0;j<W.length;j++){const H=W[j],Me=r.convert(H.format,H.colorSpace),se=r.convert(H.type),xe=w(H.internalFormat,Me,se,H.colorSpace),be=ot(_);k&&ve(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,xe,_.width,_.height):ve(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,xe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,xe,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Se(S,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=n.get(_.depthTexture);W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y(_.depthTexture,0);const j=W.__webglTexture,H=ot(_);if(_.depthTexture.format===Ls)ve(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,H):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(_.depthTexture.format===Ds)ve(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,H):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function We(S){const _=n.get(S),k=S.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==S.depthTexture){const W=S.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",j)};W.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=W}if(S.depthTexture&&!_.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const W=S.texture.mipmaps;W&&W.length>0?Se(_.__webglFramebuffer[0],S):Se(_.__webglFramebuffer,S)}else if(k){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=i.createRenderbuffer(),Le(_.__webglDepthbuffer[W],S,!1);else{const j=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=_.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,H),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,H)}}else{const W=S.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Le(_.__webglDepthbuffer,S,!1);else{const j=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,H),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,H)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Rt(S,_,k){const W=n.get(S);_!==void 0&&pe(W.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&We(S)}function E(S){const _=S.texture,k=n.get(S),W=n.get(_);S.addEventListener("dispose",L);const j=S.textures,H=S.isWebGLCubeRenderTarget===!0,Me=j.length>1;if(Me||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=_.version,a.memory.textures++),H){k.__webglFramebuffer=[];for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[se]=[];for(let xe=0;xe<_.mipmaps.length;xe++)k.__webglFramebuffer[se][xe]=i.createFramebuffer()}else k.__webglFramebuffer[se]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let se=0;se<_.mipmaps.length;se++)k.__webglFramebuffer[se]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Me)for(let se=0,xe=j.length;se<xe;se++){const be=n.get(j[se]);be.__webglTexture===void 0&&(be.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&ve(S)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let se=0;se<j.length;se++){const xe=j[se];k.__webglColorRenderbuffer[se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[se]);const be=r.convert(xe.format,xe.colorSpace),te=r.convert(xe.type),he=w(xe.internalFormat,be,te,xe.colorSpace,S.isXRRenderTarget===!0),Re=ot(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,he,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,k.__webglColorRenderbuffer[se])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(k.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(H){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),ze(i.TEXTURE_CUBE_MAP,_);for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0)for(let xe=0;xe<_.mipmaps.length;xe++)pe(k.__webglFramebuffer[se][xe],S,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe);else pe(k.__webglFramebuffer[se],S,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(_)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let se=0,xe=j.length;se<xe;se++){const be=j[se],te=n.get(be);let he=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(he=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,te.__webglTexture),ze(he,be),pe(k.__webglFramebuffer,S,be,i.COLOR_ATTACHMENT0+se,he,0),m(be)&&p(he)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(se=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,W.__webglTexture),ze(se,_),_.mipmaps&&_.mipmaps.length>0)for(let xe=0;xe<_.mipmaps.length;xe++)pe(k.__webglFramebuffer[xe],S,_,i.COLOR_ATTACHMENT0,se,xe);else pe(k.__webglFramebuffer,S,_,i.COLOR_ATTACHMENT0,se,0);m(_)&&p(se),t.unbindTexture()}S.depthBuffer&&We(S)}function at(S){const _=S.textures;for(let k=0,W=_.length;k<W;k++){const j=_[k];if(m(j)){const H=T(S),Me=n.get(j).__webglTexture;t.bindTexture(H,Me),p(H),t.unbindTexture()}}}const Ie=[],Ce=[];function _e(S){if(S.samples>0){if(ve(S)===!1){const _=S.textures,k=S.width,W=S.height;let j=i.COLOR_BUFFER_BIT;const H=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(S),se=_.length>1;if(se)for(let be=0;be<_.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const xe=S.texture.mipmaps;xe&&xe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let be=0;be<_.length;be++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[be]);const te=n.get(_[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,k,W,0,0,k,W,j,i.NEAREST),l===!0&&(Ie.length=0,Ce.length=0,Ie.push(i.COLOR_ATTACHMENT0+be),S.depthBuffer&&S.resolveDepthBuffer===!1&&(Ie.push(H),Ce.push(H),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ce)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),se)for(let be=0;be<_.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,Me.__webglColorRenderbuffer[be]);const te=n.get(_[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const _=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ot(S){return Math.min(s.maxSamples,S.samples)}function ve(S){const _=n.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ne(S){const _=a.render.frame;h.get(S)!==_&&(h.set(S,_),S.update())}function wt(S,_){const k=S.colorSpace,W=S.format,j=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||k!==is&&k!==Hn&&(qe.getTransfer(k)===Ze?(W!==ln||j!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),_}function mt(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=X,this.setTexture3D=ie,this.setTextureCube=G,this.rebindTextures=Rt,this.setupRenderTarget=E,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=ve}function P0(i,e){function t(n,s=Hn){let r;const a=qe.getTransfer(s);if(n===yn)return i.UNSIGNED_BYTE;if(n===ol)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ll)return i.UNSIGNED_SHORT_5_5_5_1;if(n===dh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===uh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ch)return i.BYTE;if(n===hh)return i.SHORT;if(n===Cs)return i.UNSIGNED_SHORT;if(n===al)return i.INT;if(n===gi)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===Gs)return i.HALF_FLOAT;if(n===fh)return i.ALPHA;if(n===ph)return i.RGB;if(n===ln)return i.RGBA;if(n===Ls)return i.DEPTH_COMPONENT;if(n===Ds)return i.DEPTH_STENCIL;if(n===cl)return i.RED;if(n===hl)return i.RED_INTEGER;if(n===mh)return i.RG;if(n===dl)return i.RG_INTEGER;if(n===ul)return i.RGBA_INTEGER;if(n===Sr||n===wr||n===Er||n===Tr)if(a===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Tr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===to||n===no||n===io||n===so)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===to)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===no)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===io)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===so)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ro||n===ao||n===oo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ro||n===ao)return a===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===oo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===xo||n===bo||n===yo||n===Mo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===lo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===co)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ho)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===uo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===po)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===mo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===go)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_o)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mo)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===So||n===wo||n===Eo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===So)return a===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Eo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===To||n===Ao||n===Ro||n===Co)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===To)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ao)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ro)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Co)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ps?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const L0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,D0=`
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

}`;class F0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Lh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Yn({vertexShader:L0,fragmentShader:D0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Lt(new ls(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class I0 extends as{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new F0,p={},T=t.getContextAttributes();let w=null,M=null;const C=[],A=[],L=new Oe;let U=null;const y=new on;y.viewport=new ft;const b=new on;b.viewport=new ft;const P=[y,b],O=new Ju;let V=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Z=C[$];return Z===void 0&&(Z=new Sa,C[$]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function($){let Z=C[$];return Z===void 0&&(Z=new Sa,C[$]=Z),Z.getGripSpace()},this.getHand=function($){let Z=C[$];return Z===void 0&&(Z=new Sa,C[$]=Z),Z.getHandSpace()};function Y($){const Z=A.indexOf($.inputSource);if(Z===-1)return;const pe=C[Z];pe!==void 0&&(pe.update($.inputSource,$.frame,c||a),pe.dispatchEvent({type:$.type,data:$.inputSource}))}function X(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",ie);for(let $=0;$<C.length;$++){const Z=A[$];Z!==null&&(A[$]=null,C[$].disconnect(Z))}V=null,q=null,m.reset();for(const $ in p)delete p[$];e.setRenderTarget(w),f=null,u=null,d=null,s=null,M=null,Ke.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",X),s.addEventListener("inputsourceschange",ie),T.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Le=null,Se=null;T.depth&&(Se=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=T.stencil?Ds:Ls,Le=T.stencil?Ps:gi);const We={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(We),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new _i(u.textureWidth,u.textureHeight,{format:ln,type:yn,depthTexture:new Ph(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const pe={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,pe),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new _i(f.framebufferWidth,f.framebufferHeight,{format:ln,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ke.setContext(s),Ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie($){for(let Z=0;Z<$.removed.length;Z++){const pe=$.removed[Z],Le=A.indexOf(pe);Le>=0&&(A[Le]=null,C[Le].disconnect(pe))}for(let Z=0;Z<$.added.length;Z++){const pe=$.added[Z];let Le=A.indexOf(pe);if(Le===-1){for(let We=0;We<C.length;We++)if(We>=A.length){A.push(pe),Le=We;break}else if(A[We]===null){A[We]=pe,Le=We;break}if(Le===-1)break}const Se=C[Le];Se&&Se.connect(pe)}}const G=new D,oe=new D;function de($,Z,pe){G.setFromMatrixPosition(Z.matrixWorld),oe.setFromMatrixPosition(pe.matrixWorld);const Le=G.distanceTo(oe),Se=Z.projectionMatrix.elements,We=pe.projectionMatrix.elements,Rt=Se[14]/(Se[10]-1),E=Se[14]/(Se[10]+1),at=(Se[9]+1)/Se[5],Ie=(Se[9]-1)/Se[5],Ce=(Se[8]-1)/Se[0],_e=(We[8]+1)/We[0],ot=Rt*Ce,ve=Rt*_e,Ne=Le/(-Ce+_e),wt=Ne*-Ce;if(Z.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(wt),$.translateZ(Ne),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Se[10]===-1)$.projectionMatrix.copy(Z.projectionMatrix),$.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const mt=Rt+Ne,S=E+Ne,_=ot-wt,k=ve+(Le-wt),W=at*E/S*mt,j=Ie*E/S*mt;$.projectionMatrix.makePerspective(_,k,W,j,mt,S),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function we($,Z){Z===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Z.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let Z=$.near,pe=$.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),O.near=b.near=y.near=Z,O.far=b.far=y.far=pe,(V!==O.near||q!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),V=O.near,q=O.far),O.layers.mask=$.layers.mask|6,y.layers.mask=O.layers.mask&3,b.layers.mask=O.layers.mask&5;const Le=$.parent,Se=O.cameras;we(O,Le);for(let We=0;We<Se.length;We++)we(Se[We],Le);Se.length===2?de(O,y,b):O.projectionMatrix.copy(y.projectionMatrix),ze($,O,Le)};function ze($,Z,pe){pe===null?$.matrix.copy(Z.matrixWorld):($.matrix.copy(pe.matrixWorld),$.matrix.invert(),$.matrix.multiply(Z.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Z.projectionMatrix),$.projectionMatrixInverse.copy(Z.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Lo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function($){l=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function($){return p[$]};let nt=null;function rt($,Z){if(h=Z.getViewerPose(c||a),g=Z,h!==null){const pe=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Le=!1;pe.length!==O.cameras.length&&(O.cameras.length=0,Le=!0);for(let E=0;E<pe.length;E++){const at=pe[E];let Ie=null;if(f!==null)Ie=f.getViewport(at);else{const _e=d.getViewSubImage(u,at);Ie=_e.viewport,E===0&&(e.setRenderTargetTextures(M,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(M))}let Ce=P[E];Ce===void 0&&(Ce=new on,Ce.layers.enable(E),Ce.viewport=new ft,P[E]=Ce),Ce.matrix.fromArray(at.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(at.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),E===0&&(O.matrix.copy(Ce.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Le===!0&&O.cameras.push(Ce)}const Se=s.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const E=d.getDepthInformation(pe[0]);E&&E.isValid&&E.texture&&m.init(E,s.renderState)}if(Se&&Se.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let E=0;E<pe.length;E++){const at=pe[E].camera;if(at){let Ie=p[at];Ie||(Ie=new Lh,p[at]=Ie);const Ce=d.getCameraImage(at);Ie.sourceTexture=Ce}}}}for(let pe=0;pe<C.length;pe++){const Le=A[pe],Se=C[pe];Le!==null&&Se!==void 0&&Se.update(Le,Z,c||a)}nt&&nt($,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Ke=new Fh;Ke.setAnimationLoop(rt),this.setAnimationLoop=function($){nt=$},this.dispose=function(){}}}const ri=new Mn,k0=new Je;function U0(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Sh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,w,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===zt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===zt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),w=T.envMap,M=T.envMapRotation;w&&(m.envMap.value=w,ri.copy(M),ri.x*=-1,ri.y*=-1,ri.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),m.envMapRotation.value.setFromMatrix4(k0.makeRotationFromEuler(ri)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===zt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function N0(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,w){const M=w.program;n.uniformBlockBinding(T,M)}function c(T,w){let M=s[T.id];M===void 0&&(g(T),M=h(T),s[T.id]=M,T.addEventListener("dispose",m));const C=w.program;n.updateUBOMapping(T,C);const A=e.render.frame;r[T.id]!==A&&(u(T),r[T.id]=A)}function h(T){const w=d();T.__bindingPointIndex=w;const M=i.createBuffer(),C=T.__size,A=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,M),M}function d(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(T){const w=s[T.id],M=T.uniforms,C=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let A=0,L=M.length;A<L;A++){const U=Array.isArray(M[A])?M[A]:[M[A]];for(let y=0,b=U.length;y<b;y++){const P=U[y];if(f(P,A,y,C)===!0){const O=P.__offset,V=Array.isArray(P.value)?P.value:[P.value];let q=0;for(let Y=0;Y<V.length;Y++){const X=V[Y],ie=v(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,O+q,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,q),q+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(T,w,M,C){const A=T.value,L=w+"_"+M;if(C[L]===void 0)return typeof A=="number"||typeof A=="boolean"?C[L]=A:C[L]=A.clone(),!0;{const U=C[L];if(typeof A=="number"||typeof A=="boolean"){if(U!==A)return C[L]=A,!0}else if(U.equals(A)===!1)return U.copy(A),!0}return!1}function g(T){const w=T.uniforms;let M=0;const C=16;for(let L=0,U=w.length;L<U;L++){const y=Array.isArray(w[L])?w[L]:[w[L]];for(let b=0,P=y.length;b<P;b++){const O=y[b],V=Array.isArray(O.value)?O.value:[O.value];for(let q=0,Y=V.length;q<Y;q++){const X=V[q],ie=v(X),G=M%C,oe=G%ie.boundary,de=G+oe;M+=oe,de!==0&&C-de<ie.storage&&(M+=C-de),O.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=M,M+=ie.storage}}}const A=M%C;return A>0&&(M+=C-A),T.__size=M,T.__cache={},this}function v(T){const w={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(w.boundary=4,w.storage=4):T.isVector2?(w.boundary=8,w.storage=8):T.isVector3||T.isColor?(w.boundary=16,w.storage=12):T.isVector4?(w.boundary=16,w.storage=16):T.isMatrix3?(w.boundary=48,w.storage=48):T.isMatrix4?(w.boundary=64,w.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),w}function m(T){const w=T.target;w.removeEventListener("dispose",m);const M=a.indexOf(w.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class B0{constructor(e={}){const{canvas:t=pu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const T=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let C=!1;this._outputColorSpace=Qt;let A=0,L=0,U=null,y=-1,b=null;const P=new ft,O=new ft;let V=null;const q=new De(0);let Y=0,X=t.width,ie=t.height,G=1,oe=null,de=null;const we=new ft(0,0,X,ie),ze=new ft(0,0,X,ie);let nt=!1;const rt=new _l;let Ke=!1,$=!1;const Z=new Je,pe=new D,Le=new ft,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function Rt(){return U===null?G:1}let E=n;function at(x,F){return t.getContext(x,F)}try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${sl}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",fe,!1),t.addEventListener("webglcontextcreationerror",Q,!1),E===null){const F="webgl2";if(E=at(F,x),E===null)throw at(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Ie,Ce,_e,ot,ve,Ne,wt,mt,S,_,k,W,j,H,Me,se,xe,be,te,he,Re,ye,le,ke;function R(){Ie=new Km(E),Ie.init(),ye=new P0(E,Ie),Ce=new Gm(E,Ie,e,ye),_e=new R0(E,Ie),Ce.reversedDepthBuffer&&u&&_e.buffers.depth.setReversed(!0),ot=new Zm(E),ve=new m0,Ne=new C0(E,Ie,_e,ve,Ce,ye,ot),wt=new Vm(M),mt=new $m(M),S=new nf(E),le=new Om(E,S),_=new Ym(E,S,ot,le),k=new Jm(E,_,S,ot),te=new Qm(E,Ce,Ne),se=new Hm(ve),W=new p0(M,wt,mt,Ie,Ce,le,se),j=new U0(M,ve),H=new _0,Me=new S0(Ie),be=new Bm(M,wt,mt,_e,k,f,l),xe=new T0(M,k,Ce),ke=new N0(E,ot,Ce,_e),he=new zm(E,Ie,ot),Re=new jm(E,Ie,ot),ot.programs=W.programs,M.capabilities=Ce,M.extensions=Ie,M.properties=ve,M.renderLists=H,M.shadowMap=xe,M.state=_e,M.info=ot}R();const ne=new I0(M,E);this.xr=ne,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){const x=Ie.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ie.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(x){x!==void 0&&(G=x,this.setSize(X,ie,!1))},this.getSize=function(x){return x.set(X,ie)},this.setSize=function(x,F,N=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=x,ie=F,t.width=Math.floor(x*G),t.height=Math.floor(F*G),N===!0&&(t.style.width=x+"px",t.style.height=F+"px"),this.setViewport(0,0,x,F)},this.getDrawingBufferSize=function(x){return x.set(X*G,ie*G).floor()},this.setDrawingBufferSize=function(x,F,N){X=x,ie=F,G=N,t.width=Math.floor(x*N),t.height=Math.floor(F*N),this.setViewport(0,0,x,F)},this.getCurrentViewport=function(x){return x.copy(P)},this.getViewport=function(x){return x.copy(we)},this.setViewport=function(x,F,N,B){x.isVector4?we.set(x.x,x.y,x.z,x.w):we.set(x,F,N,B),_e.viewport(P.copy(we).multiplyScalar(G).round())},this.getScissor=function(x){return x.copy(ze)},this.setScissor=function(x,F,N,B){x.isVector4?ze.set(x.x,x.y,x.z,x.w):ze.set(x,F,N,B),_e.scissor(O.copy(ze).multiplyScalar(G).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(x){_e.setScissorTest(nt=x)},this.setOpaqueSort=function(x){oe=x},this.setTransparentSort=function(x){de=x},this.getClearColor=function(x){return x.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor(...arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha(...arguments)},this.clear=function(x=!0,F=!0,N=!0){let B=0;if(x){let I=!1;if(U!==null){const ee=U.texture.format;I=ee===ul||ee===dl||ee===hl}if(I){const ee=U.texture.type,ce=ee===yn||ee===gi||ee===Cs||ee===Ps||ee===ol||ee===ll,me=be.getClearColor(),ue=be.getClearAlpha(),Ae=me.r,Pe=me.g,Ee=me.b;ce?(g[0]=Ae,g[1]=Pe,g[2]=Ee,g[3]=ue,E.clearBufferuiv(E.COLOR,0,g)):(v[0]=Ae,v[1]=Pe,v[2]=Ee,v[3]=ue,E.clearBufferiv(E.COLOR,0,v))}else B|=E.COLOR_BUFFER_BIT}F&&(B|=E.DEPTH_BUFFER_BIT),N&&(B|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),E.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",fe,!1),t.removeEventListener("webglcontextcreationerror",Q,!1),be.dispose(),H.dispose(),Me.dispose(),ve.dispose(),wt.dispose(),mt.dispose(),k.dispose(),le.dispose(),ke.dispose(),W.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",hn),ne.removeEventListener("sessionend",wl),Qn.stop()};function re(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const x=ot.autoReset,F=xe.enabled,N=xe.autoUpdate,B=xe.needsUpdate,I=xe.type;R(),ot.autoReset=x,xe.enabled=F,xe.autoUpdate=N,xe.needsUpdate=B,xe.type=I}function Q(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function K(x){const F=x.target;F.removeEventListener("dispose",K),ge(F)}function ge(x){Fe(x),ve.remove(x)}function Fe(x){const F=ve.get(x).programs;F!==void 0&&(F.forEach(function(N){W.releaseProgram(N)}),x.isShaderMaterial&&W.releaseShaderCache(x))}this.renderBufferDirect=function(x,F,N,B,I,ee){F===null&&(F=Se);const ce=I.isMesh&&I.matrixWorld.determinant()<0,me=vd(x,F,N,B,I);_e.setMaterial(B,ce);let ue=N.index,Ae=1;if(B.wireframe===!0){if(ue=_.getWireframeAttribute(N),ue===void 0)return;Ae=2}const Pe=N.drawRange,Ee=N.attributes.position;let He=Pe.start*Ae,je=(Pe.start+Pe.count)*Ae;ee!==null&&(He=Math.max(He,ee.start*Ae),je=Math.min(je,(ee.start+ee.count)*Ae)),ue!==null?(He=Math.max(He,0),je=Math.min(je,ue.count)):Ee!=null&&(He=Math.max(He,0),je=Math.min(je,Ee.count));const dt=je-He;if(dt<0||dt===1/0)return;le.setup(I,B,me,N,ue);let st,et=he;if(ue!==null&&(st=S.get(ue),et=Re,et.setIndex(st)),I.isMesh)B.wireframe===!0?(_e.setLineWidth(B.wireframeLinewidth*Rt()),et.setMode(E.LINES)):et.setMode(E.TRIANGLES);else if(I.isLine){let Te=B.linewidth;Te===void 0&&(Te=1),_e.setLineWidth(Te*Rt()),I.isLineSegments?et.setMode(E.LINES):I.isLineLoop?et.setMode(E.LINE_LOOP):et.setMode(E.LINE_STRIP)}else I.isPoints?et.setMode(E.POINTS):I.isSprite&&et.setMode(E.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Fs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),et.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Ie.get("WEBGL_multi_draw"))et.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Te=I._multiDrawStarts,ct=I._multiDrawCounts,Xe=I._multiDrawCount,Ht=ue?S.get(ue).bytesPerElement:1,wi=ve.get(B).currentProgram.getUniforms();for(let Vt=0;Vt<Xe;Vt++)wi.setValue(E,"_gl_DrawID",Vt),et.render(Te[Vt]/Ht,ct[Vt])}else if(I.isInstancedMesh)et.renderInstances(He,dt,I.count);else if(N.isInstancedBufferGeometry){const Te=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,ct=Math.min(N.instanceCount,Te);et.renderInstances(He,dt,ct)}else et.render(He,dt)};function it(x,F,N){x.transparent===!0&&x.side===pn&&x.forceSinglePass===!1?(x.side=zt,x.needsUpdate=!0,qs(x,F,N),x.side=$n,x.needsUpdate=!0,qs(x,F,N),x.side=pn):qs(x,F,N)}this.compile=function(x,F,N=null){N===null&&(N=x),p=Me.get(N),p.init(F),w.push(p),N.traverseVisible(function(I){I.isLight&&I.layers.test(F.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),x!==N&&x.traverseVisible(function(I){I.isLight&&I.layers.test(F.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),p.setupLights();const B=new Set;return x.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const ee=I.material;if(ee)if(Array.isArray(ee))for(let ce=0;ce<ee.length;ce++){const me=ee[ce];it(me,N,I),B.add(me)}else it(ee,N,I),B.add(ee)}),p=w.pop(),B},this.compileAsync=function(x,F,N=null){const B=this.compile(x,F,N);return new Promise(I=>{function ee(){if(B.forEach(function(ce){ve.get(ce).currentProgram.isReady()&&B.delete(ce)}),B.size===0){I(x);return}setTimeout(ee,10)}Ie.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let Ye=null;function wn(x){Ye&&Ye(x)}function hn(){Qn.stop()}function wl(){Qn.start()}const Qn=new Fh;Qn.setAnimationLoop(wn),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(x){Ye=x,ne.setAnimationLoop(x),x===null?Qn.stop():Qn.start()},ne.addEventListener("sessionstart",hn),ne.addEventListener("sessionend",wl),this.render=function(x,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(F),F=ne.getCamera()),x.isScene===!0&&x.onBeforeRender(M,x,F,U),p=Me.get(x,w.length),p.init(F),w.push(p),Z.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),rt.setFromProjectionMatrix(Z,vn,F.reversedDepth),$=this.localClippingEnabled,Ke=se.init(this.clippingPlanes,$),m=H.get(x,T.length),m.init(),T.push(m),ne.enabled===!0&&ne.isPresenting===!0){const ee=M.xr.getDepthSensingMesh();ee!==null&&Qr(ee,F,-1/0,M.sortObjects)}Qr(x,F,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(oe,de),We=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,We&&be.addToRenderList(m,x),this.info.render.frame++,Ke===!0&&se.beginShadows();const N=p.state.shadowsArray;xe.render(N,x,F),Ke===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,I=m.transmissive;if(p.setupLights(),F.isArrayCamera){const ee=F.cameras;if(I.length>0)for(let ce=0,me=ee.length;ce<me;ce++){const ue=ee[ce];Tl(B,I,x,ue)}We&&be.render(x);for(let ce=0,me=ee.length;ce<me;ce++){const ue=ee[ce];El(m,x,ue,ue.viewport)}}else I.length>0&&Tl(B,I,x,F),We&&be.render(x),El(m,x,F);U!==null&&L===0&&(Ne.updateMultisampleRenderTarget(U),Ne.updateRenderTargetMipmap(U)),x.isScene===!0&&x.onAfterRender(M,x,F),le.resetDefaultState(),y=-1,b=null,w.pop(),w.length>0?(p=w[w.length-1],Ke===!0&&se.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Qr(x,F,N,B){if(x.visible===!1)return;if(x.layers.test(F.layers)){if(x.isGroup)N=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(F);else if(x.isLight)p.pushLight(x),x.castShadow&&p.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||rt.intersectsSprite(x)){B&&Le.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Z);const ce=k.update(x),me=x.material;me.visible&&m.push(x,ce,me,N,Le.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||rt.intersectsObject(x))){const ce=k.update(x),me=x.material;if(B&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Le.copy(x.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Le.copy(ce.boundingSphere.center)),Le.applyMatrix4(x.matrixWorld).applyMatrix4(Z)),Array.isArray(me)){const ue=ce.groups;for(let Ae=0,Pe=ue.length;Ae<Pe;Ae++){const Ee=ue[Ae],He=me[Ee.materialIndex];He&&He.visible&&m.push(x,ce,He,N,Le.z,Ee)}}else me.visible&&m.push(x,ce,me,N,Le.z,null)}}const ee=x.children;for(let ce=0,me=ee.length;ce<me;ce++)Qr(ee[ce],F,N,B)}function El(x,F,N,B){const I=x.opaque,ee=x.transmissive,ce=x.transparent;p.setupLightsView(N),Ke===!0&&se.setGlobalState(M.clippingPlanes,N),B&&_e.viewport(P.copy(B)),I.length>0&&Xs(I,F,N),ee.length>0&&Xs(ee,F,N),ce.length>0&&Xs(ce,F,N),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Tl(x,F,N,B){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[B.id]===void 0&&(p.state.transmissionRenderTarget[B.id]=new _i(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float")?Gs:yn,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const ee=p.state.transmissionRenderTarget[B.id],ce=B.viewport||P;ee.setSize(ce.z*M.transmissionResolutionScale,ce.w*M.transmissionResolutionScale);const me=M.getRenderTarget(),ue=M.getActiveCubeFace(),Ae=M.getActiveMipmapLevel();M.setRenderTarget(ee),M.getClearColor(q),Y=M.getClearAlpha(),Y<1&&M.setClearColor(16777215,.5),M.clear(),We&&be.render(N);const Pe=M.toneMapping;M.toneMapping=Xn;const Ee=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),p.setupLightsView(B),Ke===!0&&se.setGlobalState(M.clippingPlanes,B),Xs(x,N,B),Ne.updateMultisampleRenderTarget(ee),Ne.updateRenderTargetMipmap(ee),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let je=0,dt=F.length;je<dt;je++){const st=F[je],et=st.object,Te=st.geometry,ct=st.material,Xe=st.group;if(ct.side===pn&&et.layers.test(B.layers)){const Ht=ct.side;ct.side=zt,ct.needsUpdate=!0,Al(et,N,B,Te,ct,Xe),ct.side=Ht,ct.needsUpdate=!0,He=!0}}He===!0&&(Ne.updateMultisampleRenderTarget(ee),Ne.updateRenderTargetMipmap(ee))}M.setRenderTarget(me,ue,Ae),M.setClearColor(q,Y),Ee!==void 0&&(B.viewport=Ee),M.toneMapping=Pe}function Xs(x,F,N){const B=F.isScene===!0?F.overrideMaterial:null;for(let I=0,ee=x.length;I<ee;I++){const ce=x[I],me=ce.object,ue=ce.geometry,Ae=ce.group;let Pe=ce.material;Pe.allowOverride===!0&&B!==null&&(Pe=B),me.layers.test(N.layers)&&Al(me,F,N,ue,Pe,Ae)}}function Al(x,F,N,B,I,ee){x.onBeforeRender(M,F,N,B,I,ee),x.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),I.onBeforeRender(M,F,N,B,x,ee),I.transparent===!0&&I.side===pn&&I.forceSinglePass===!1?(I.side=zt,I.needsUpdate=!0,M.renderBufferDirect(N,F,B,I,x,ee),I.side=$n,I.needsUpdate=!0,M.renderBufferDirect(N,F,B,I,x,ee),I.side=pn):M.renderBufferDirect(N,F,B,I,x,ee),x.onAfterRender(M,F,N,B,I,ee)}function qs(x,F,N){F.isScene!==!0&&(F=Se);const B=ve.get(x),I=p.state.lights,ee=p.state.shadowsArray,ce=I.state.version,me=W.getParameters(x,I.state,ee,F,N),ue=W.getProgramCacheKey(me);let Ae=B.programs;B.environment=x.isMeshStandardMaterial?F.environment:null,B.fog=F.fog,B.envMap=(x.isMeshStandardMaterial?mt:wt).get(x.envMap||B.environment),B.envMapRotation=B.environment!==null&&x.envMap===null?F.environmentRotation:x.envMapRotation,Ae===void 0&&(x.addEventListener("dispose",K),Ae=new Map,B.programs=Ae);let Pe=Ae.get(ue);if(Pe!==void 0){if(B.currentProgram===Pe&&B.lightsStateVersion===ce)return Cl(x,me),Pe}else me.uniforms=W.getUniforms(x),x.onBeforeCompile(me,M),Pe=W.acquireProgram(me,ue),Ae.set(ue,Pe),B.uniforms=me.uniforms;const Ee=B.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Ee.clippingPlanes=se.uniform),Cl(x,me),B.needsLights=bd(x),B.lightsStateVersion=ce,B.needsLights&&(Ee.ambientLightColor.value=I.state.ambient,Ee.lightProbe.value=I.state.probe,Ee.directionalLights.value=I.state.directional,Ee.directionalLightShadows.value=I.state.directionalShadow,Ee.spotLights.value=I.state.spot,Ee.spotLightShadows.value=I.state.spotShadow,Ee.rectAreaLights.value=I.state.rectArea,Ee.ltc_1.value=I.state.rectAreaLTC1,Ee.ltc_2.value=I.state.rectAreaLTC2,Ee.pointLights.value=I.state.point,Ee.pointLightShadows.value=I.state.pointShadow,Ee.hemisphereLights.value=I.state.hemi,Ee.directionalShadowMap.value=I.state.directionalShadowMap,Ee.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Ee.spotShadowMap.value=I.state.spotShadowMap,Ee.spotLightMatrix.value=I.state.spotLightMatrix,Ee.spotLightMap.value=I.state.spotLightMap,Ee.pointShadowMap.value=I.state.pointShadowMap,Ee.pointShadowMatrix.value=I.state.pointShadowMatrix),B.currentProgram=Pe,B.uniformsList=null,Pe}function Rl(x){if(x.uniformsList===null){const F=x.currentProgram.getUniforms();x.uniformsList=Ar.seqWithValue(F.seq,x.uniforms)}return x.uniformsList}function Cl(x,F){const N=ve.get(x);N.outputColorSpace=F.outputColorSpace,N.batching=F.batching,N.batchingColor=F.batchingColor,N.instancing=F.instancing,N.instancingColor=F.instancingColor,N.instancingMorph=F.instancingMorph,N.skinning=F.skinning,N.morphTargets=F.morphTargets,N.morphNormals=F.morphNormals,N.morphColors=F.morphColors,N.morphTargetsCount=F.morphTargetsCount,N.numClippingPlanes=F.numClippingPlanes,N.numIntersection=F.numClipIntersection,N.vertexAlphas=F.vertexAlphas,N.vertexTangents=F.vertexTangents,N.toneMapping=F.toneMapping}function vd(x,F,N,B,I){F.isScene!==!0&&(F=Se),Ne.resetTextureUnits();const ee=F.fog,ce=B.isMeshStandardMaterial?F.environment:null,me=U===null?M.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:is,ue=(B.isMeshStandardMaterial?mt:wt).get(B.envMap||ce),Ae=B.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Pe=!!N.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ee=!!N.morphAttributes.position,He=!!N.morphAttributes.normal,je=!!N.morphAttributes.color;let dt=Xn;B.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(dt=M.toneMapping);const st=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,et=st!==void 0?st.length:0,Te=ve.get(B),ct=p.state.lights;if(Ke===!0&&($===!0||x!==b)){const Ft=x===b&&B.id===y;se.setState(B,x,Ft)}let Xe=!1;B.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==ct.state.version||Te.outputColorSpace!==me||I.isBatchedMesh&&Te.batching===!1||!I.isBatchedMesh&&Te.batching===!0||I.isBatchedMesh&&Te.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Te.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Te.instancing===!1||!I.isInstancedMesh&&Te.instancing===!0||I.isSkinnedMesh&&Te.skinning===!1||!I.isSkinnedMesh&&Te.skinning===!0||I.isInstancedMesh&&Te.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Te.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Te.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Te.instancingMorph===!1&&I.morphTexture!==null||Te.envMap!==ue||B.fog===!0&&Te.fog!==ee||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==se.numPlanes||Te.numIntersection!==se.numIntersection)||Te.vertexAlphas!==Ae||Te.vertexTangents!==Pe||Te.morphTargets!==Ee||Te.morphNormals!==He||Te.morphColors!==je||Te.toneMapping!==dt||Te.morphTargetsCount!==et)&&(Xe=!0):(Xe=!0,Te.__version=B.version);let Ht=Te.currentProgram;Xe===!0&&(Ht=qs(B,F,I));let wi=!1,Vt=!1,us=!1;const ht=Ht.getUniforms(),Kt=Te.uniforms;if(_e.useProgram(Ht.program)&&(wi=!0,Vt=!0,us=!0),B.id!==y&&(y=B.id,Vt=!0),wi||b!==x){_e.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ht.setValue(E,"projectionMatrix",x.projectionMatrix),ht.setValue(E,"viewMatrix",x.matrixWorldInverse);const Bt=ht.map.cameraPosition;Bt!==void 0&&Bt.setValue(E,pe.setFromMatrixPosition(x.matrixWorld)),Ce.logarithmicDepthBuffer&&ht.setValue(E,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ht.setValue(E,"isOrthographic",x.isOrthographicCamera===!0),b!==x&&(b=x,Vt=!0,us=!0)}if(I.isSkinnedMesh){ht.setOptional(E,I,"bindMatrix"),ht.setOptional(E,I,"bindMatrixInverse");const Ft=I.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),ht.setValue(E,"boneTexture",Ft.boneTexture,Ne))}I.isBatchedMesh&&(ht.setOptional(E,I,"batchingTexture"),ht.setValue(E,"batchingTexture",I._matricesTexture,Ne),ht.setOptional(E,I,"batchingIdTexture"),ht.setValue(E,"batchingIdTexture",I._indirectTexture,Ne),ht.setOptional(E,I,"batchingColorTexture"),I._colorsTexture!==null&&ht.setValue(E,"batchingColorTexture",I._colorsTexture,Ne));const Yt=N.morphAttributes;if((Yt.position!==void 0||Yt.normal!==void 0||Yt.color!==void 0)&&te.update(I,N,Ht),(Vt||Te.receiveShadow!==I.receiveShadow)&&(Te.receiveShadow=I.receiveShadow,ht.setValue(E,"receiveShadow",I.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Kt.envMap.value=ue,Kt.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&F.environment!==null&&(Kt.envMapIntensity.value=F.environmentIntensity),Vt&&(ht.setValue(E,"toneMappingExposure",M.toneMappingExposure),Te.needsLights&&xd(Kt,us),ee&&B.fog===!0&&j.refreshFogUniforms(Kt,ee),j.refreshMaterialUniforms(Kt,B,G,ie,p.state.transmissionRenderTarget[x.id]),Ar.upload(E,Rl(Te),Kt,Ne)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ar.upload(E,Rl(Te),Kt,Ne),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ht.setValue(E,"center",I.center),ht.setValue(E,"modelViewMatrix",I.modelViewMatrix),ht.setValue(E,"normalMatrix",I.normalMatrix),ht.setValue(E,"modelMatrix",I.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Ft=B.uniformsGroups;for(let Bt=0,Jr=Ft.length;Bt<Jr;Bt++){const Jn=Ft[Bt];ke.update(Jn,Ht),ke.bind(Jn,Ht)}}return Ht}function xd(x,F){x.ambientLightColor.needsUpdate=F,x.lightProbe.needsUpdate=F,x.directionalLights.needsUpdate=F,x.directionalLightShadows.needsUpdate=F,x.pointLights.needsUpdate=F,x.pointLightShadows.needsUpdate=F,x.spotLights.needsUpdate=F,x.spotLightShadows.needsUpdate=F,x.rectAreaLights.needsUpdate=F,x.hemisphereLights.needsUpdate=F}function bd(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(x,F,N){const B=ve.get(x);B.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),ve.get(x.texture).__webglTexture=F,ve.get(x.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:N,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,F){const N=ve.get(x);N.__webglFramebuffer=F,N.__useDefaultFramebuffer=F===void 0};const yd=E.createFramebuffer();this.setRenderTarget=function(x,F=0,N=0){U=x,A=F,L=N;let B=!0,I=null,ee=!1,ce=!1;if(x){const ue=ve.get(x);if(ue.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(E.FRAMEBUFFER,null),B=!1;else if(ue.__webglFramebuffer===void 0)Ne.setupRenderTarget(x);else if(ue.__hasExternalTextures)Ne.rebindTextures(x,ve.get(x.texture).__webglTexture,ve.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Ee=x.depthTexture;if(ue.__boundDepthTexture!==Ee){if(Ee!==null&&ve.has(Ee)&&(x.width!==Ee.image.width||x.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ne.setupDepthRenderbuffer(x)}}const Ae=x.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ce=!0);const Pe=ve.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Pe[F])?I=Pe[F][N]:I=Pe[F],ee=!0):x.samples>0&&Ne.useMultisampledRTT(x)===!1?I=ve.get(x).__webglMultisampledFramebuffer:Array.isArray(Pe)?I=Pe[N]:I=Pe,P.copy(x.viewport),O.copy(x.scissor),V=x.scissorTest}else P.copy(we).multiplyScalar(G).floor(),O.copy(ze).multiplyScalar(G).floor(),V=nt;if(N!==0&&(I=yd),_e.bindFramebuffer(E.FRAMEBUFFER,I)&&B&&_e.drawBuffers(x,I),_e.viewport(P),_e.scissor(O),_e.setScissorTest(V),ee){const ue=ve.get(x.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+F,ue.__webglTexture,N)}else if(ce){const ue=F;for(let Ae=0;Ae<x.textures.length;Ae++){const Pe=ve.get(x.textures[Ae]);E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0+Ae,Pe.__webglTexture,N,ue)}}else if(x!==null&&N!==0){const ue=ve.get(x.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,ue.__webglTexture,N)}y=-1},this.readRenderTargetPixels=function(x,F,N,B,I,ee,ce,me=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=ve.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ce!==void 0&&(ue=ue[ce]),ue){_e.bindFramebuffer(E.FRAMEBUFFER,ue);try{const Ae=x.textures[me],Pe=Ae.format,Ee=Ae.type;if(!Ce.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=x.width-B&&N>=0&&N<=x.height-I&&(x.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+me),E.readPixels(F,N,B,I,ye.convert(Pe),ye.convert(Ee),ee))}finally{const Ae=U!==null?ve.get(U).__webglFramebuffer:null;_e.bindFramebuffer(E.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(x,F,N,B,I,ee,ce,me=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=ve.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ce!==void 0&&(ue=ue[ce]),ue)if(F>=0&&F<=x.width-B&&N>=0&&N<=x.height-I){_e.bindFramebuffer(E.FRAMEBUFFER,ue);const Ae=x.textures[me],Pe=Ae.format,Ee=Ae.type;if(!Ce.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const He=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,He),E.bufferData(E.PIXEL_PACK_BUFFER,ee.byteLength,E.STREAM_READ),x.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+me),E.readPixels(F,N,B,I,ye.convert(Pe),ye.convert(Ee),0);const je=U!==null?ve.get(U).__webglFramebuffer:null;_e.bindFramebuffer(E.FRAMEBUFFER,je);const dt=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await mu(E,dt,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,He),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,ee),E.deleteBuffer(He),E.deleteSync(dt),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,F=null,N=0){const B=Math.pow(2,-N),I=Math.floor(x.image.width*B),ee=Math.floor(x.image.height*B),ce=F!==null?F.x:0,me=F!==null?F.y:0;Ne.setTexture2D(x,0),E.copyTexSubImage2D(E.TEXTURE_2D,N,0,0,ce,me,I,ee),_e.unbindTexture()};const Md=E.createFramebuffer(),Sd=E.createFramebuffer();this.copyTextureToTexture=function(x,F,N=null,B=null,I=0,ee=null){ee===null&&(I!==0?(Fs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=I,I=0):ee=0);let ce,me,ue,Ae,Pe,Ee,He,je,dt;const st=x.isCompressedTexture?x.mipmaps[ee]:x.image;if(N!==null)ce=N.max.x-N.min.x,me=N.max.y-N.min.y,ue=N.isBox3?N.max.z-N.min.z:1,Ae=N.min.x,Pe=N.min.y,Ee=N.isBox3?N.min.z:0;else{const Yt=Math.pow(2,-I);ce=Math.floor(st.width*Yt),me=Math.floor(st.height*Yt),x.isDataArrayTexture?ue=st.depth:x.isData3DTexture?ue=Math.floor(st.depth*Yt):ue=1,Ae=0,Pe=0,Ee=0}B!==null?(He=B.x,je=B.y,dt=B.z):(He=0,je=0,dt=0);const et=ye.convert(F.format),Te=ye.convert(F.type);let ct;F.isData3DTexture?(Ne.setTexture3D(F,0),ct=E.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Ne.setTexture2DArray(F,0),ct=E.TEXTURE_2D_ARRAY):(Ne.setTexture2D(F,0),ct=E.TEXTURE_2D),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,F.flipY),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),E.pixelStorei(E.UNPACK_ALIGNMENT,F.unpackAlignment);const Xe=E.getParameter(E.UNPACK_ROW_LENGTH),Ht=E.getParameter(E.UNPACK_IMAGE_HEIGHT),wi=E.getParameter(E.UNPACK_SKIP_PIXELS),Vt=E.getParameter(E.UNPACK_SKIP_ROWS),us=E.getParameter(E.UNPACK_SKIP_IMAGES);E.pixelStorei(E.UNPACK_ROW_LENGTH,st.width),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,st.height),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Ae),E.pixelStorei(E.UNPACK_SKIP_ROWS,Pe),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Ee);const ht=x.isDataArrayTexture||x.isData3DTexture,Kt=F.isDataArrayTexture||F.isData3DTexture;if(x.isDepthTexture){const Yt=ve.get(x),Ft=ve.get(F),Bt=ve.get(Yt.__renderTarget),Jr=ve.get(Ft.__renderTarget);_e.bindFramebuffer(E.READ_FRAMEBUFFER,Bt.__webglFramebuffer),_e.bindFramebuffer(E.DRAW_FRAMEBUFFER,Jr.__webglFramebuffer);for(let Jn=0;Jn<ue;Jn++)ht&&(E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,ve.get(x).__webglTexture,I,Ee+Jn),E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,ve.get(F).__webglTexture,ee,dt+Jn)),E.blitFramebuffer(Ae,Pe,ce,me,He,je,ce,me,E.DEPTH_BUFFER_BIT,E.NEAREST);_e.bindFramebuffer(E.READ_FRAMEBUFFER,null),_e.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else if(I!==0||x.isRenderTargetTexture||ve.has(x)){const Yt=ve.get(x),Ft=ve.get(F);_e.bindFramebuffer(E.READ_FRAMEBUFFER,Md),_e.bindFramebuffer(E.DRAW_FRAMEBUFFER,Sd);for(let Bt=0;Bt<ue;Bt++)ht?E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,Yt.__webglTexture,I,Ee+Bt):E.framebufferTexture2D(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Yt.__webglTexture,I),Kt?E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,Ft.__webglTexture,ee,dt+Bt):E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Ft.__webglTexture,ee),I!==0?E.blitFramebuffer(Ae,Pe,ce,me,He,je,ce,me,E.COLOR_BUFFER_BIT,E.NEAREST):Kt?E.copyTexSubImage3D(ct,ee,He,je,dt+Bt,Ae,Pe,ce,me):E.copyTexSubImage2D(ct,ee,He,je,Ae,Pe,ce,me);_e.bindFramebuffer(E.READ_FRAMEBUFFER,null),_e.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else Kt?x.isDataTexture||x.isData3DTexture?E.texSubImage3D(ct,ee,He,je,dt,ce,me,ue,et,Te,st.data):F.isCompressedArrayTexture?E.compressedTexSubImage3D(ct,ee,He,je,dt,ce,me,ue,et,st.data):E.texSubImage3D(ct,ee,He,je,dt,ce,me,ue,et,Te,st):x.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,ee,He,je,ce,me,et,Te,st.data):x.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,ee,He,je,st.width,st.height,et,st.data):E.texSubImage2D(E.TEXTURE_2D,ee,He,je,ce,me,et,Te,st);E.pixelStorei(E.UNPACK_ROW_LENGTH,Xe),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,Ht),E.pixelStorei(E.UNPACK_SKIP_PIXELS,wi),E.pixelStorei(E.UNPACK_SKIP_ROWS,Vt),E.pixelStorei(E.UNPACK_SKIP_IMAGES,us),ee===0&&F.generateMipmaps&&E.generateMipmap(ct),_e.unbindTexture()},this.initRenderTarget=function(x){ve.get(x).__webglFramebuffer===void 0&&Ne.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Ne.setTextureCube(x,0):x.isData3DTexture?Ne.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Ne.setTexture2DArray(x,0):Ne.setTexture2D(x,0),_e.unbindTexture()},this.resetState=function(){A=0,L=0,U=null,_e.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}const Ut=1,Nc=.45,Bh=190,Oh=.38,Ot={water:8308963,waterDeep:6271188,sand:15918022,sandDark:14995624,grass:9425290,grassDark:7191922,gray:12104360,soil:12159582,soilDark:10581582,stone:13617339},ko={hub:{floor:"grass",accent:16767334,bloom:"#ffd966",emoji:"🏝️"},tide:{floor:"sand",accent:9425128,bloom:"#8fd0e8",emoji:"🌊"},garden:{floor:"grass",accent:8179580,bloom:"#ffd966",emoji:"🌱"},stump:{floor:"sand",accent:14258287,bloom:"#ffb38a",emoji:"🥥"},vines:{floor:"grass",accent:13215487,bloom:"#c9a6ff",emoji:"🍇"}},O0=[.12,.35,.6,.88];function z0(i){let e=0;for(const t of O0)(i??0)>=t&&e++;return e}const At={problemsPerChamber:3,bananasPerCorrect:[3,5],bananasChestBase:10,comboBonus:2,crabSteal:3,eggPerCorrect:1,eggPerBerry:1,eggGoal:30,echoDoorChance:.3,echoProblems:2,hatRandomChestChance:.05,streakFreezePrice:40,petBananaBonus:.1},G0={common:60,rare:25,epic:12,legendary:3},zh={common:"⭐",rare:"🌟",epic:"💜",legendary:"🌈"},Uo=typeof window<"u"&&("ontouchstart"in window||(navigator.maxTouchPoints||0)>0),Bc={hub:1.8,chamber:1.5},H0=(()=>{if(typeof window>"u")return"high";const i=window.devicePixelRatio||1,e=Math.min(window.screen?.width||1024,window.screen?.height||768)<480;return Uo&&(e||i>2.5)?"low":"high"})(),Gh=new D(1,1.15,1).normalize(),V0=40,W0=Gh.clone().multiplyScalar(V0),Is=Gh.clone().negate(),Hh=new D(0,1,0).projectOnPlane(Is).normalize(),X0=Math.abs(new D().crossVectors(Is,Hh).x),q0=Math.abs(Hh.x),Vh=new D(-Is.z,0,Is.x).normalize(),$0=new D().crossVectors(Vh,Is).setComponent(1,0).normalize(),Oc=.8,Fa=4;class K0{constructor(e){this.renderer=new B0({canvas:e,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.shadows=H0==="high",this.shadows&&(this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=oh),this.scene=new zu,this.scene.background=null,this.camera=new vl(-10,10,10,-10,.1,200),this.span=14,this.fitBoard=null,this.target=new D,this.goal=new D,this.followObj=null,this.shakeAmp=0,this.zoom=1,this.defaultZoom=1,this.pan=new D,this.panLimit=new D(16,0,16),this.boardCenter=new D,this.followMode=null,this.aspect=1;const t=new ju(15398655,13494976,.95);this.scene.add(t),this.sun=new cc(16773848,1.25),this.sun.position.set(8,14,5),this.shadows&&(this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),this.sun.shadow.bias=-.0015,this.sun.shadow.normalBias=.02),this.scene.add(this.sun),this.scene.add(this.sun.target),this.fill=new cc(12572927,.25),this.fill.position.set(-6,8,-4),this.scene.add(this.fill),this.raycaster=new ef,this.pickables=[],window.addEventListener("resize",()=>this.resize()),this.resize()}resize(){const e=window.innerWidth,t=window.innerHeight;if(this.renderer.setSize(e,t,!1),this.aspect=e/t,this.fitBoard){const n=(this.fitBoard.w+this.fitBoard.d)*Ut,s=n*X0+1.5,r=n*q0+2.5;this.span=Math.max(r,s/this.aspect)}this._applyProjection()}_applyProjection(){const e=this.aspect||1,t=this.fitBoard?this.span:Math.max(this.span,this.span*1.15/e);this.baseVSpan=t;const n=t/this.zoom;this.camera.top=n/2,this.camera.bottom=-n/2,this.camera.left=-n*e/2,this.camera.right=n*e/2,this.camera.updateProjectionMatrix()}setSpan(e){this.span=e,this.resize()}setZoom(e){this.zoom=Math.max(Oc,Math.min(Fa,e)),this._clampPan(),this._applyProjection()}zoomBy(e){this.setZoom(this.zoom*e)}panByPixels(e,t){const n=(this.camera.top-this.camera.bottom)/(window.innerHeight||1);this.pan.addScaledVector(Vh,-e*n),this.pan.addScaledVector($0,t*n),this._clampPan()}_clampPan(){const e=Math.max(0,Math.min(1,(this.zoom-1)/(Fa-1))),t=this.panLimit.x*e,n=this.panLimit.z*e;this.pan.x=Math.max(-t,Math.min(t,this.pan.x)),this.pan.z=Math.max(-n,Math.min(n,this.pan.z))}resetCamera(){this.zoom=Math.max(Oc,Math.min(Fa,this.defaultZoom||1)),this.pan.set(0,0,0),this._applyProjection()}lookAt(e,t){this.fitBoard=null,this.followObj=null,this.followMode=null,this.boardCenter.copy(e),this.goal.copy(e),this.target.copy(e),t&&(this.span=t),this.resetCamera(),this.resize(),this._place()}follow(e,t,n){this.fitBoard=null,this.followObj=e,this.followMode="always",this.panLimit.set(n?.x??16,0,n?.z??16),t&&(this.span=t),this.target.copy(e.position),this.goal.copy(e.position),this.resetCamera(),this.resize(),this._place()}frameBoard(e,t,n,s=null){this.followObj=s,this.followMode=s?"zoomed":null,this.fitBoard={w:t,d:n},this.boardCenter.copy(e),this.panLimit.set(t*Ut*.5,0,n*Ut*.5);const a=s&&(this.defaultZoom||1)>1.05?s.position:e;this.goal.copy(a),this.target.copy(a),this.resetCamera(),this.resize(),this._place()}_place(){const e=W0;let t=0,n=0;this.shakeAmp>.001&&(t=(Math.random()-.5)*this.shakeAmp,n=(Math.random()-.5)*this.shakeAmp);const s=this.target.x+this.pan.x+t,r=this.target.y,a=this.target.z+this.pan.z+n;if(this.camera.position.set(s+e.x,r+e.y,a+e.z),this.camera.lookAt(s,r,a),this.sun.position.set(s+8,r+14,a+5),this.sun.target.position.set(s,r,a),this.sun.castShadow){const o=(this.baseVSpan||this.span)*.9,l=this.sun.shadow.camera;l.left=-o,l.right=o,l.top=o,l.bottom=-o,l.updateProjectionMatrix()}}shake(e=.15){this.shakeAmp=Math.max(this.shakeAmp,e)}update(e){this.followObj&&(this.followMode==="always"||this.zoom>1.05)?this.goal.copy(this.followObj.position):this.goal.copy(this.boardCenter);const t=1-Math.pow(.0015,e/1e3);this.target.lerp(this.goal,t),this.shakeAmp*=Math.pow(5e-4,e/1e3),this._place(),this.renderer.render(this.scene,this.camera)}pick(e,t){if(!this.pickables.length)return null;const n=this.renderer.domElement.getBoundingClientRect(),s=new Oe((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1);return this.raycaster.setFromCamera(s,this.camera),this.raycaster.intersectObjects(this.pickables,!0)[0]||null}}const Y0=[{dir:[1,0,0],corners:[[1,1,1],[1,0,1],[1,1,0],[1,0,0]]},{dir:[-1,0,0],corners:[[0,1,0],[0,0,0],[0,1,1],[0,0,1]]},{dir:[0,1,0],corners:[[0,1,1],[1,1,1],[0,1,0],[1,1,0]]},{dir:[0,-1,0],corners:[[0,0,0],[1,0,0],[0,0,1],[1,0,1]]},{dir:[0,0,1],corners:[[0,1,1],[0,0,1],[1,1,1],[1,0,1]]},{dir:[0,0,-1],corners:[[1,1,0],[1,0,0],[0,1,0],[0,0,0]]}],j0=[1,.8,.64,.5];function As(i,e,t){return i+"|"+e+"|"+t}function Z0(i){const e=new Map,t={},n=i.palette;let s=0,r=0;return i.layers.forEach((a,o)=>{a.forEach((l,c)=>{for(let h=0;h<l.length;h++){const d=l[h];if(!(d==="."||d===" ")){if(!t[d]){const u=n[d];if(!u)continue;t[d]=new De(u)}e.set(As(h,o,c),t[d]),h>s&&(s=h),c>r&&(r=c)}}})}),{voxels:e,sizeX:s+1,sizeY:i.layers.length,sizeZ:r+1}}function Q0(i,e,t,n,s,r){const a=[e+r[0],t+r[1],n+r[2]],o=[s[0]===1?1:-1,s[1]===1?1:-1,s[2]===1?1:-1],l=[0,1,2].filter(v=>r[v]===0),c=[...a];c[l[0]]+=o[l[0]];const h=[...a];h[l[1]]+=o[l[1]];const d=[...a];d[l[0]]+=o[l[0]],d[l[1]]+=o[l[1]];const u=i.has(As(c[0],c[1],c[2]))?1:0,f=i.has(As(h[0],h[1],h[2]))?1:0;if(u&&f)return 3;const g=i.has(As(d[0],d[1],d[2]))?1:0;return u+f+g}function J0(i,e={}){const{voxelSize:t=1,centerXZ:n=!0,ao:s=!0}=e,{voxels:r,sizeX:a,sizeZ:o}=Z0(i),l=[],c=[],h=[],d=[];let u=0;const f=n?-a/2:0,g=n?-o/2:0;for(const[m,p]of r){const[T,w,M]=m.split("|").map(Number);for(const C of Y0){const[A,L,U]=C.dir;if(r.has(As(T+A,w+L,M+U)))continue;const y=[];for(const b of C.corners){l.push((T+b[0]+f)*t,(w+b[1])*t,(M+b[2]+g)*t),c.push(A,L,U);const P=s?Q0(r,T,w,M,b,C.dir):0;y.push(P);const O=j0[P];h.push(p.r*O,p.g*O,p.b*O)}y[0]+y[3]>y[1]+y[2]?d.push(u+1,u+3,u+0,u+3,u+2,u+0):d.push(u+0,u+1,u+2,u+1,u+3,u+2),u+=4}}const v=new cn;return v.setAttribute("position",new bn(l,3)),v.setAttribute("normal",new bn(c,3)),v.setAttribute("color",new bn(h,3)),v.setIndex(d),v.computeBoundingSphere(),v}let Ia=null;function e_(){return Ia||(Ia=new Ts({vertexColors:!0})),Ia}const ka=new Map;function vi(i,e={}){let t;e.cacheKey&&ka.has(e.cacheKey)?t=ka.get(e.cacheKey):(t=J0(i,e),e.cacheKey&&(t._cached=!0,ka.set(e.cacheKey,t)));const n=new Lt(t,e_());return n.castShadow=e.castShadow!==!1,n.receiveShadow=e.receiveShadow===!0,n}function ks(i,e){return{palette:{...i.palette,...e},layers:i.layers}}const t_={palette:{F:"#8a5a3b",f:"#f0d6b3",S:"#ffd9b0",E:"#2e2433",W:"#ffffff",N:"#b87a5e"},layers:[["...........","...........","...FF.FF...","...ff.ff..."],["...........",".....F.....","...FFFFF...","...FfffF..."],["...........",".....F.....","..FFFFFFF..","...FfffF..."],[".....F.....","...........","..FFFFFFF..","...FfffF..."],["...........","...........","...FFFFF...","...FFFFF..."],["...........","...FFFFF...","..FFFFFFF..","..FFFFFFF..","...fffff..."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FSSSSSF..","....fNf...."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FEESEEF.."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FWESWEF.."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FFFfFFF.."],["...........","...FFFFF...","..FFFFFFF..","..FFFFFFF..","...FFFFF..."],["...........","...........","....FFF....","....FFF...."]]},n_={palette:{F:"#9c6b4a",f:"#f5dfc0",S:"#ffdcb8",E:"#2e2433",W:"#ffffff",N:"#c08a6a",P:"#ffb3c6",Y:"#ffe28a"},layers:[["...........","...........","...FF.FF...","...ff.ff..."],["...........",".....F.....","...FFFFF...","...FfffF..."],["...........",".....F.....","..FFFFFF...","...FfffF..."],[".....F.....","...........","...FFFFFF..","...FfffF..."],["...........","...........","...FFFFFF..","...FFFFF..."],["...........","...FFFFF...","..FFFFFFFf.","..FFFFFFF..","...fffff..."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FSSSSSF..","....fNf...."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FEESEEF.."],["...FFFFF...","..FFFFFFF..","fFFFFFFFFFf",".FFFFFFFFF.","..FWESWEF.."],["...FFFFF...","..FFFFFFF..",".FFFFFFFFF.",".FFFFFFFFF.","..FFFfFFF.."],["...........","...FFFFF...","..FFFFFFF..","..FFFFFFF..","...FFFFF..."],["...........","...........","....FFF....","....FFF...."],["...........","...........",".....P.....","....PYP....",".....P....."]]},i_={palette:{R:"#f08a7a",r:"#ffb3a0",d:"#d96b5d",E:"#2e2433",W:"#ffffff"},layers:[[".........",".d.....d.",".........",".d.....d."],["..RRRRR..",".RRRRRRR.",".RRRRRRR.",".RRRRRRR.","r.rrrrr.r","r.......r"],[".........","..RRRRR..",".RRRRRRR.","..RRRRR..","r.......r","r.......r"],[".........",".........","..RRRRR..","..RRRRR.."],[".........",".........",".........","..d...d.."],[".........",".........",".........",".EE...EE."],[".........",".........",".........",".WE...WE."]]},s_={palette:{R:"#e87a6a",r:"#ffb3a0",d:"#c95f51",G:"#f4c95d",E:"#2e2433",W:"#ffffff"},layers:[[".............",".............",".d.........d.",".............",".d.........d."],[".............","..RRRRRRRRR..",".RRRRRRRRRRR.",".RRRRRRRRRRR.",".RRRRRRRRRRR.","r.rrrrrrrrr.r","rr.........rr"],[".............","..RRRRRRRRR..",".RRRRRRRRRRR.",".RRRRRRRRRRR.",".RRRRRRRRRRR.","r.rrrrrrrrr.r","rr.........rr"],[".............","..RRRRRRRRR..",".RRRRRRRRRRR.",".RRRRRRRRRRR.",".RRRRRRRRRRR.","r.rrrrrrrrr.r","r...........r"],[".............",".............","..RRRRRRRRR..",".RRRRRRRRRRR.","..RRRRRRRRR..","r...........r"],[".............",".............","...RRRRRRR...","..RRRRRRRRR..","...RRRRRRR..."],[".............",".............",".............","....RRRRR....","....rrrrr...."],[".............",".............",".............","....GGGGG....","....d...d...."],[".............",".............",".............","....G.G.G....","....d...d...."],[".............",".............",".............","......G......","....d...d...."],[".............",".............",".............",".............","...EE...EE..."],[".............",".............",".............",".............","...WE...WE..."]]},Br={monkey:t_,mimi:n_,crab:i_,crabKing:s_},r_=11,$i=[{id:"bunny",nameKey:"pet.bunny",rarity:"common",model:{palette:{B:"#fdf6ec",b:"#e8dcc8",P:"#ffc2d1",E:"#2e2433"},layers:[["...b...",".BBBBB.",".BBBBB.",".BBBBB."],[".......",".BBBBB.",".BBBBB.",".BBBBB."],[".......","..BBB..",".BBBBB.",".BEPEB."],[".......","..BBB..","..BBB..","..BBB.."],[".......",".......","..B.B.."],[".......",".......","..B.B.."],[".......",".......","..B.B.."],[".......",".......","..P.P.."]]}},{id:"duckling",nameKey:"pet.duckling",rarity:"common",model:{palette:{Y:"#ffe28a",y:"#f0c95e",O:"#f5a25d",E:"#2e2433"},layers:[[".......",".......","..O.O.."],["...y...",".YYYYY.",".YYYYY.","..YYY.."],[".......",".YYYYY.","yYYYYYy","..YYY.."],[".......","..YYY..",".YYYYY.","..YYY.."],[".......","..YYY..",".YYYYY.","..EYE..","...O..."],[".......",".......","..YYY..","...Y..."]]}},{id:"kitten",nameKey:"pet.kitten",rarity:"common",model:{palette:{G:"#cfd4dd",g:"#aeb4c0",P:"#ffc2d1",E:"#2e2433"},layers:[[".......",".GGGGG.",".GGGGG.",".GGGGG."],[".g.....",".GGGGG.",".GGGGG.",".GGGGG."],[".g.....","..GGG..",".GGGGG.",".GEPEG."],[".g.....","..GGG..",".GGGGG.",".GGGGG."],[".......",".......","..GGG..","..GGG.."],[".......",".......","..G.G.."],[".......",".......","..P.P.."]]}},{id:"piglet",nameKey:"pet.piglet",rarity:"common",model:{palette:{P:"#f9b8c4",p:"#e895a8",N:"#e87a96",E:"#2e2433"},layers:[[".......",".PPPPP.",".PPPPP.",".PPPPP."],["...p...",".PPPPP.",".PPPPP.",".PPPPP.","..NNN.."],[".......","..PPP..",".PPPPP.",".PEPEP."],[".......","..PPP..",".PPPPP.","..PPP.."],[".......",".......","..PPP.."],[".......",".......","..p.p.."]]}},{id:"redpanda",nameKey:"pet.redpanda",rarity:"rare",model:{palette:{O:"#e8875a",f:"#fff1dc",d:"#5d4037",E:"#2e2433"},layers:[[".......",".d...d.",".......",".d...d."],["...O...",".OOOOO.",".OOOOO.",".OOOOO."],["...d...",".OOOOO.",".OOOOO.",".OOOOO."],["...O...","..OOO..",".OOOOO.",".OfffO."],[".......","..OOO..",".OOOOO.",".fEOEf.","...d..."],[".......",".......","..OOO..","..OOO.."],[".......",".......","..d.d.."]]}},{id:"turtle",nameKey:"pet.turtle",rarity:"rare",model:{palette:{G:"#7cc08a",g:"#5fa46e",K:"#cfe8a8",E:"#2e2433"},layers:[[".......",".K...K.",".......",".K...K."],[".......",".GGGGG.",".GGGGG.",".GGGGG.","..KKK.."],[".......",".GGGGG.",".GGGGG.",".GGGGG.","..EKE.."],[".......","..GgG..",".gGGGg.","..GgG.."],[".......",".......","..GGG.."],[".......",".......","...g..."]]}},{id:"owl",nameKey:"pet.owl",rarity:"epic",model:{palette:{O:"#a99bc9",o:"#8d7fb0",f:"#f5ead7",B:"#f5a25d",E:"#2e2433",W:"#ffffff"},layers:[[".......",".......","..B.B.."],[".......",".OOOOO.",".OOOOO.",".OfffO."],[".......",".OOOOO.","oOOOOOo",".OfffO."],[".......",".OOOOO.","oOOOOOo",".OfffO."],[".......",".OOOOO.",".OOOOO.",".fEfEf.","...B..."],[".......",".OOOOO.",".OOOOO.",".fWfWf."],[".......","..OOO..",".OOOOO.","..OOO.."],[".......",".......",".o...o."]]}},{id:"dragon",nameKey:"pet.dragon",rarity:"legendary",model:{palette:{M:"#9fe2c0",w:"#cfeede",B:"#f7f3d7",P:"#ffb3c6",E:"#2e2433"},layers:[["...MM....",".........","..MM.MM.."],["....M....","..MMMMM..","..MMMMM..","..MBBBM.."],[".........","..MMMMM..",".wMMMMMw.","..MBBBM.."],[".........","..MMMMM..",".wMMMMMw.","..MMMMM.."],[".........","..MMMMM..",".MMMMMMM.","..MMMMM..","...BBB..."],[".........","..MMMMM..",".MMMMMMM.",".MEMMMEM."],[".........","..MMMMM..",".MMMMMMM.",".MMMMMMM."],[".........",".........","..MMMMM..","..MMMMM.."],[".........",".........","...P.P..."]]}}],No=[{id:"cap",nameKey:"hat.cap",price:25,dy:0,model:{palette:{C:"#6fb7e8",c:"#5a9fd0"},layers:[[".......",".CCCCC.",".CCCCC.",".CCCCC.",".ccccc."],[".......","..CCC..",".CCCCC.","..CCC.."],[".......",".......","...C..."]]}},{id:"bow",nameKey:"hat.bow",price:40,dy:0,model:{palette:{P:"#f7a8c4",p:"#e88bb0"},layers:[[".......",".......","PPPpPPP","PP...PP"],[".......",".......","PP...PP"]]}},{id:"beanie",nameKey:"hat.beanie",price:60,dy:0,model:{palette:{B:"#f0907a",b:"#d97863",w:"#fdf6ec"},layers:[[".......",".bbbbb.",".bbbbb.",".bbbbb."],[".......","..BBB..",".BBBBB.","..BBB.."],[".......",".......","..BBB.."],[".......",".......","...w..."]]}},{id:"party",nameKey:"hat.party",price:80,dy:0,model:{palette:{A:"#8fd0e8",P:"#f7a8c4",w:"#fff7e0"},layers:[[".......","..AAA..",".AAAAA.","..AAA.."],[".......","...P...","..PPP..","...P..."],[".......",".......","...A..."],[".......",".......","...w..."]]}},{id:"flowercrown",nameKey:"hat.flowercrown",price:120,dy:0,model:{palette:{V:"#7cc08a",P:"#ffb3c6",Y:"#ffe28a",L:"#c9a6ff"},layers:[[".......",".VPYPV.",".Y...Y.",".VLYLV."]]}},{id:"pirate",nameKey:"hat.pirate",price:150,dy:0,model:{palette:{D:"#4a5a78",B:"#ffe28a"},layers:[[".......",".DDDDD.","DDDDDDD",".DDBDD."],[".......",".......","D.DDD.D"],[".......",".......","..DDD.."]]}},{id:"wizard",nameKey:"hat.wizard",price:200,dy:0,model:{palette:{Z:"#9b8ad0",S:"#ffe28a"},layers:[[".ZZZZZ.","ZZZZZZZ","ZZZZZZZ","ZZZZZZZ",".ZZZZZ."],[".......",".ZZZZZ.",".ZZSZZ.",".ZZZZZ."],[".......","..ZZZ..","..ZZZ..","..ZZZ.."],[".......",".......","...Z..."],[".......",".......","....Z.."]]}},{id:"crown",nameKey:"hat.crown",price:300,dy:0,model:{palette:{G:"#f4c95d",J:"#f78bb0"},layers:[[".......",".GGGGG.",".G...G.",".GGGGG."],[".......",".G.G.G.",".......",".G.G.G."],[".......",".......",".......","...J..."]]}}],Bo=[{id:"classic",nameKey:"fur.classic",price:0,palette:{F:"#8a5a3b",f:"#f0d6b3"}},{id:"golden",nameKey:"fur.golden",price:60,palette:{F:"#e8b04f",f:"#ffe9b8"}},{id:"snow",nameKey:"fur.snow",price:60,palette:{F:"#f0ede6",f:"#ffffff"}},{id:"pink",nameKey:"fur.pink",price:80,palette:{F:"#f49bbb",f:"#ffd9e6"}},{id:"lavender",nameKey:"fur.lavender",price:80,palette:{F:"#b39ddb",f:"#e6dcf5"}},{id:"mint",nameKey:"fur.mint",price:80,palette:{F:"#8fd4ae",f:"#dcf5e8"}},{id:"redpanda",nameKey:"fur.redpanda",price:100,palette:{F:"#e8875a",f:"#fff1dc"}},{id:"midnight",nameKey:"fur.midnight",price:150,palette:{F:"#4a4a6a",f:"#9b9bc4"}}],a_=[{id:"sparkle",nameKey:"trail.sparkle",price:60,color:"#ffd966"},{id:"petal",nameKey:"trail.petal",price:100,color:"#ffb3c6"},{id:"bubble",nameKey:"trail.bubble",price:100,color:"#9bd6ff"},{id:"star",nameKey:"trail.star",price:200,color:"#c9a6ff"}],o_={palette:{T:"#b08a5f",t:"#8f6d49",L:"#5fb46a",l:"#8fd18a",C:"#7a5a3f"},layers:[["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....tt.....",".....tt....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....tt.....",".....tt....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....tt.....",".....tt....."],["............","............","............","............","............",".....TT.....",".....TT....."],["............","............","............","............","............",".....TT.....",".....TT....."],[".....ll.....",".l........l.","............","............","............","l....TT....l","l....TT....l",".....CC.....","............","............",".l........l.",".....ll....."],["............",".....LL.....","..l..LL..l..","...l.LL.l...",".....LL.....",".LLL.LL.LLL.",".LLL.LL.LLL.",".....LL.....","...l.LL.l...","..l..LL..l..",".....LL....."],["............","............","............","....LLLL....","...LLLLLL...","...LLLLLL...","...LLLLLL...","...LLLLLL...","....LLLL...."],["............","............","............","............","....llll....","....llll....","....llll....","....llll...."]]},l_={palette:{T:"#b08a5f",t:"#8f6d49",L:"#5fb46a",l:"#8fd18a",C:"#7a5a3f"},layers:[["........","........","........","...TT...","...TT..."],["........","........","........","...TT...","...TT..."],["........","........","........","...tt...","...tt..."],["........","........","........","...TT...","...TT..."],["........","........","........","...TT...","...TT..."],["...ll...","........","........","l..TT..l","l..TT..l","...C....","........","...ll..."],["........","...LL...","..LLLL..",".LLLLLL.",".LLLLLL.","..LLLL..","...LL..."],["........","........","........","..llll..","..llll.."]]},c_={palette:{L:"#5fb46a",l:"#8fd18a",P:"#f7b8cf"},layers:[[".......",".LLLLL.","LLLLLLL","LLLLLLL","LLLLLLL",".LLLLL."],[".......",".LLLLL.","LLLLLLL","LLLLLLL","LLLLLLL",".LLLPL."],[".......",".......",".LLLLL.",".LlLlL.",".LLLLL."],[".......",".......",".......","..lll.."]]},h_={palette:{V:"#6aa84f",P:"#f7a8c4",C:"#ffe28a"},layers:[["...",".V."],["...",".V."],[".P.","PCP",".P."]]},d_={palette:{V:"#6aa84f",P:"#ffd966",C:"#e8924f"},layers:[["...",".V."],["...",".V."],[".P.","PCP",".P."]]},u_={palette:{V:"#6aa84f",P:"#9bb8ff",C:"#fff1c4"},layers:[["...",".V."],["...",".V."],[".P.","PCP",".P."]]},f_={palette:{D:"#d9906f",d:"#b8714f",c:"#e8a988"},layers:[[".......",".......",".ddddd.",".ddddd.",".ddddd."],[".......",".DDDDD.","DDDDDDD","DDDDDDD","DDDDDDD",".DDDDD."],[".......",".DDDDD.","DDDDDDD","DDDDDDD","DDDDDDD",".DDDDD."],[".......","..DDD..",".DDDDD.",".DDDDD.",".DDDDD.","..DDD.."],[".......","..ccc..",".c...c.",".c...c.",".c...c.","..ccc.."]]},p_={palette:{S:"#e8e2d4",s:"#cfc8b8"},layers:[[".sssss.","sssssss","sssssss"],[".SSSSS.","SSSSSSS","SSSSSSS"],[".SSSSS.","SSSSSSS","SSSSSSS"],[".SSSSS.","SSSSSSS","SSSSSSS"],["..sss..",".SSSSS.",".SSSSS."]]},m_={palette:{G:"#f4c95d",g:"#d9a83f",h:"#ffe9a8"},layers:[[".ggggggg.","ggggggggg","ggggggggg","ggggggggg","ggggggggg","ggggggggg","ggggggggg","ggggggggg",".ggggggg."],[".........",".........","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG.."],[".........",".........","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG.."],[".........",".........","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG..","..GGGGG.."],[".........",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG.",".GGGGGGG."],[".........",".hhhhhhh.",".h.....h.",".h.....h.",".h.....h.",".h.....h.",".h.....h.",".hhhhhhh."]]},g_={palette:{W:"#b07a4a",w:"#8f5f38",G:"#f4c95d"},layers:[["wwwwwww","wwwwwww","wwwwwww","wwwwwww","wwwwwww"],["WWWWWWW","W.....W","W.....W","W.....W","WWWWWWW"],["WWWWWWW","W.....W","W.....W","W.....W","WWWGWWW"]]},__={palette:{W:"#b07a4a",w:"#8f5f38",G:"#f4c95d"},layers:[["WWWWWWW","WWWWWWW","WWWWWWW","WWWWWWW","WWWGWWW"],[".......",".WWWWW.",".WWWWW.",".WWWWW."]]},v_={palette:{Q:"#fdf2e0",M:"#bfe8d2"},layers:[[".....",".QQQ.",".QQQ.",".QQQ."],[".QQQ.","QQQQQ","QQQQQ","QQQQQ",".QQQ."],[".QQQ.","MQQQQ","QQQQQ","QQQQQ",".QMQ."],[".QQQ.","QQQQQ","QQQQM","QQQQQ",".QQQ."],[".....",".QQQ.",".QQQ.",".QMQ."],[".....",".....","..Q.."]]},x_={palette:{B:"#c9985f",b:"#a87a45"},layers:[[".BBBB.","BBBBBB","BBBBBB","BBBBBB","BBBBBB",".BBBB."],[".bBBb.","B....B","b....b","B....B","b....b",".bBBb."],[".BbbB.","b....b","B....B","b....b","B....B",".BbbB."],[".bbbb.","b....b","b....b","b....b","b....b",".bbbb."]]},b_={palette:{C:"#8a6845",c:"#6e5236"},layers:[["....",".cc.",".cc."],[".CC.","CCCC","CCCC",".CC."],["....",".CC.",".CC."]]},y_={palette:{Y:"#ffd95e",y:"#e8b840",g:"#6aa84f"},layers:[[".....",".YYY."],[".....","YYYYY",".YYY."],[".....",".yYy.","..Y.."],[".....","..g.."]]},M_={palette:{K:"#9a6b4f",k:"#7d5540",D:"#d9b88f",d:"#c4a070"},layers:[[".......",".KKKKK.","KKKKKKK","KKKKKKK","KKKKKKK",".KKKKK."],[".......",".KKKKK.","kKKKKKk","KKKKKKK","kKKKKKk",".KKKKK."],[".......",".KKKKK.","KKKKKKK","KKKKKKK","KKKKKKK",".KKKKK."],[".......",".DDDDD.","DDdddDD","DDdDdDD","DDdddDD",".DDDDD."]]},S_={palette:{K:"#9a6b4f",G:"#f4c95d",g:"#d9a83f"},layers:[["KK...KK","KK...KK"],[".......","K.....K","..GGG.."],[".......","K.....K",".GGGGG."],[".......","K.....K",".GGgGG."],[".......","K.....K",".GGGGG."],[".......","K.....K","..GGG.."],[".......","KKKKKKK","...K..."]]},w_={palette:{W:"#c9985f",w:"#a87a45"},layers:[["WWWWWWW","WwWWWwW","WWWWWWW"]]},E_={palette:{P:"#b8b2a8",p:"#948e84",Q:"#a8e8ff"},layers:[["PP.....PP","PPQQQQQPP"],["PP.....PP","PPQQQQQPP"],["pp.....pp","ppQQQQQpp"],["PP.....PP","PPQQQQQPP"],["PP.....PP","PPQQQQQPP"],["pP.....Pp","pPQQQQQPp"],["PPP...PPP","PPPQQQPPP"],[".PPPPPPP.",".PPPPPPP."],["..PPPPP..","..ppppp.."],["...PPP...","...PPP..."]]},T_={palette:{v:"#4e8c4a",L:"#8fd18a"},layers:[["...........","v.........v","...........",".L.......L."],["...........","v.........v","...........",".L........."],["...........","v..........","L..........","..........."],["...........","L..........","...........","..........."]]},A_={palette:{v:"#4e8c4a",L:"#8fd18a",F:"#f7b8cf"},layers:[["...........","v.........v","...........",".L.......L."],["...........","v.........v","...........",".F........."],["...........","v.........v","L.........L","..........."],["...........","v.........v","...........",".L.......F."],["...........","v.........v","...........",".F........."],["...........","v.........v","L.........L","..........."],["...........","L.........L","...........","..........."]]},R_={palette:{v:"#4e8c4a",L:"#8fd18a",F:"#f7b8cf",C:"#fff3b8"},layers:[["...........","v.........v","...........",".L.......L."],["...........","v.........v","...........",".F.......L."],["...........","v.........v","L.........L",".........F."],["...........","v.........v","...........",".L.......F."],["...........","v.........v","...........",".F.......L."],["...........","v.........v","L.........L",".L.......L."],["...........","v.........v","...........","..L..F..L.."],["...........","vL.......Lv","...........","..LFLFLFL.."],["...........",".L.......L.","..L.....L..","..........."],["...........","...L...L...","...........","....F.F...."],["...........","...LFLFL...","....LLL....","..........."],["...........","....LFL....",".....L.....","..........."],["...........",".....C.....","...........","..........."]]},C_={palette:{W:"#c9985f",w:"#a87a45"},layers:[["..w.."],["..w.."],[".....","WWWWW"],[".....","WWWWW"],[".....",".WWW."]]},P_={palette:{R:"#b8b2a8",r:"#948e84",s:"#cfc9bf"},layers:[[".RRR.","RRRRR","RRRRR",".RRr."],[".....",".RRR.",".RRRR"],[".....",".....","..sR."]]},L_={palette:{R:"#b8b2a8",r:"#948e84"},layers:[[".RR.","RRRR","rRRr"],["....",".RR.",".Rr."]]},D_={palette:{Y:"#ffdf8a",y:"#f0b94f",w:"#a87a45",k:"#7d5540"},layers:[[".....","..w.."],[".yyy.","yYYYy",".yyy."],[".yYy.","YYYYY",".yYy."],[".yyy.","yYYYy",".yyy."],[".....","..k.."]]},F_={palette:{S:"#ffd9e0",s:"#f0b0c0"},layers:[[".SSS.","SSSSS",".sSs.","..s.."],[".....",".sSs."]]},I_={palette:{g:"#6aa84f",L:"#8fd18a"},layers:[["...",".g."],["...","LgL"],["...",".L."]]},k_={palette:{B:"#f78bb0",g:"#6aa84f"},layers:[["B"],["g"]]},U_={palette:{W:"#b08550",w:"#8a6238",R:"#ef7d6d",C:"#fff4e0",Y:"#ffd966",G:"#7ccf7c"},layers:[["WWWWW","WWWWW"],["WwWwW","WWWWW"],["Y.G.Y","w...w"],[".....","w...w"],[".....","w...w"],["RCRCR","RCRCR"],[".....","RCRCR"]]},N_={palette:{S:"#cfc8bb",s:"#a39d93",F:"#ffb066",f:"#f5854f"},layers:[["SSSSS","SSSSS"],["SFfFS","SsSsS"],["SFFFS","SsSsS"],["SSSSS","SSSSS"],[".SSS.",".SsS."],["..S..","....."],["..s..","....."]]},pt={palm:o_,palmSmall:l_,bush:c_,flowerPink:h_,flowerYellow:d_,flowerBlue:u_,pot:f_,stone:p_,altar:m_,chestBase:g_,chestLid:__,egg:v_,basket:x_,coconut:b_,bananas:y_,stump:M_,gong:S_,plank:w_,portal:E_,portalVine1:T_,portalVine2:A_,portalVine3:R_,sign:C_,rockA:P_,rockB:L_,lantern:D_,shell:F_,sprout:I_,berry:k_,stall:U_,oven:N_},B_={palette:{B:"#7fb8e8",b:"#5e9ed0",C:"#fff4e0",O:"#f5a25d",E:"#2e2433"},layers:[[".......","..CCC..","..CCC.."],["...b...","BBBBBBB","bBBBBBb","..BBB.."],[".......","..BBB..","..BBB..","..EBE..","...O..."]]},O_={palette:{B:"#7fb8e8",b:"#5e9ed0",C:"#fff4e0",O:"#f5a25d",E:"#2e2433"},layers:[[".......","..CCC..","..CCC.."],["...b...",".bBBBb.",".bBBBb.","..BBB.."],[".......","..BBB..","..BBB..","..EBE..","...O..."]]},z_={palette:{W:"#ffb3c6",B:"#5a4a52"},layers:[["WW.WW","WWBWW",".WBW."]]},G_={palette:{W:"#ffb3c6",B:"#5a4a52"},layers:[[".....","..B..","..B.."],[".....","..W..","..W.."]]},Or={birdSpread:B_,birdFold:O_,butterflyOpen:z_,butterflyClosed:G_},ut={linear:i=>i,inQuad:i=>i*i,outQuad:i=>i*(2-i),outBack:i=>1+(1.70158+1)*Math.pow(i-1,3)+1.70158*Math.pow(i-1,2)},zr=new Set;function lt(i){const e={t:-(i.delay||0),ms:i.ms||300,from:i.from??0,to:i.to??1,ease:i.ease||ut.outQuad,onUpdate:i.onUpdate,onDone:i.onDone,cancelled:!1,cancel(){this.cancelled=!0,zr.delete(this)}};return zr.add(e),e}function H_(i){for(const e of[...zr]){if(e.cancelled||(e.t+=i,e.t<0))continue;const t=Math.min(1,e.t/e.ms),n=e.from+(e.to-e.from)*e.ease(t);e.onUpdate?.(n,t),t>=1&&(zr.delete(e),e.onDone?.())}}function xt(i,e){return lt({ms:i,onUpdate:()=>{},onDone:e})}function Wh(i){if(i<.15){const n=1-.25*(i/.15);return{sy:n,sxz:1+.18*(1-n)*4}}if(i<.6){const n=(i-.15)/.45;return{sy:1+.22*Math.sin(n*Math.PI),sxz:1-.1*Math.sin(n*Math.PI)}}const e=(i-.6)/.4,t=Math.sin(e*Math.PI);return{sy:1-.18*t,sxz:1+.12*t}}const xi=i=>440*2**((i-69)/12),Us=i=>2**(i/1200),ai=i=>Us((Math.random()*2-1)*i);let Ge=null,br,Pn,Zi,Rr,Gr,Ua=!0,yr=!0,bi=null,Dn=null;function tt({freq:i,type:e="sine",t,dur:n,gain:s,attack:r=.004,dest:a,ramps:o}){const l=Ge.createGain();l.connect(a||Zi),l.gain.setValueAtTime(1e-4,t),l.gain.linearRampToValueAtTime(Math.max(s,2e-4),t+r),l.gain.exponentialRampToValueAtTime(1e-4,t+n);const c=Ge.createOscillator();if(c.type=e,c.frequency.setValueAtTime(i,t),o)for(const[h,d]of o)c.frequency.exponentialRampToValueAtTime(h,t+d);c.connect(l),c.start(t),c.stop(t+n+.1)}function qt(i,e,t,n=.7,s=Zi){tt({freq:i*Us(-3),t:e,dur:n,gain:t,dest:s}),tt({freq:i*Us(3),t:e,dur:n*.9,gain:t*.6,dest:s}),tt({freq:i*4,t:e,dur:.07,gain:t*.16,dest:s})}const Wi=(i,e,t,n,s)=>qt(xi(i),e,t,n,s);function V_(i,e,t,n){tt({freq:xi(i),type:"triangle",t:e,dur:.4,gain:t,dest:n}),tt({freq:xi(i)*2,t:e,dur:.08,gain:t*.25,dest:n})}function un({t:i,dur:e,gain:t,type:n="bandpass",freq:s=1e3,q:r=1,sweepTo:a,dest:o=Zi}){const l=Ge.createBufferSource();l.buffer=Gr,l.loop=!0,l.loopEnd=Gr.duration;const c=Ge.createBiquadFilter();c.type=n,c.frequency.setValueAtTime(s,i),c.Q.value=r,a&&c.frequency.exponentialRampToValueAtTime(a,i+e);const h=Ge.createGain();h.gain.setValueAtTime(1e-4,i),h.gain.linearRampToValueAtTime(t,i+.005),h.gain.exponentialRampToValueAtTime(1e-4,i+e),l.connect(c),c.connect(h),h.connect(o),l.start(i,Math.random()*.5),l.stop(i+e+.05)}function zc(i,e,t,n,s){const r=Math.min(1.5,t/3);for(const a of i)for(const o of[-4,4]){const l=Ge.createGain();l.connect(s),l.gain.setValueAtTime(1e-4,e),l.gain.linearRampToValueAtTime(n,e+r),l.gain.setValueAtTime(n,e+t-r),l.gain.linearRampToValueAtTime(1e-4,e+t);const c=Ge.createOscillator();c.frequency.value=xi(a),c.detune.value=o,c.connect(l),c.start(e),c.stop(e+t+.1)}}const W_={hop(i,e,t){tt({freq:170*e*ai(30),type:"triangle",t:i,dur:.07,gain:.22*t}),un({t:i,dur:.03,gain:.05*t,type:"lowpass",freq:700})},pick(i,e,t){tt({freq:392*e,t:i,dur:.16,gain:.3*t,ramps:[[622*e,.09]]}),tt({freq:1568*e,t:i,dur:.05,gain:.06*t})},drop(i,e,t){tt({freq:523*e,t:i,dur:.16,gain:.28*t,ramps:[[330*e,.1]]})},place(i,e,t){qt(131*e,i,.5*t,.6),un({t:i,dur:.07,gain:.18*t,type:"lowpass",freq:240})},correct(i,e,t){[523.25,659.26,783.99].forEach((n,s)=>qt(n*e,i+s*.09,.3*t,.55)),tt({freq:2093*e,t:i+.27,dur:.25,gain:.07*t})},boop(i,e,t){tt({freq:330*e,t:i,dur:.18,gain:.22*t,attack:.02}),tt({freq:277*e,t:i+.15,dur:.3,gain:.2*t,attack:.02})},pop(i,e,t){un({t:i,dur:.14,gain:.5*t,freq:950*e,q:1.4,sweepTo:320*e}),tt({freq:240*e,t:i,dur:.1,gain:.18*t,ramps:[[110*e,.09]]})},chest(i,e,t){[523.25,659.26,783.99,1046.5].forEach((n,s)=>qt(n*e,i+s*.13,.32*t,s===3?1:.5));for(const n of[261.63,329.63,392])tt({freq:n*e,t:i,dur:1.1,gain:.06*t,attack:.08})},coin(i,e,t){const n=[1046.5,1174.7,1318.5,1568,1760];qt(n[Math.random()*n.length|0]*e*ai(12),i,.26*t,.35)},hatch(i,e,t){tt({freq:440*e,t:i,dur:.6,gain:.18*t,attack:.05,ramps:[[1760*e,.5]]}),qt(1568*e,i+.5,.28*t,.8),qt(2093*e,i+.64,.22*t,.9),tt({freq:3520*e,t:i+.74,dur:.3,gain:.06*t})},splash(i,e,t){un({t:i,dur:.5,gain:.55*t,type:"lowpass",freq:1400*e,sweepTo:180}),tt({freq:300*e,t:i+.02,dur:.25,gain:.15*t,ramps:[[90,.2]]})},gong(i,e,t){for(const[n,s,r]of[[1,.5,3],[2.02,.18,2.2],[2.96,.08,1.4],[4.2,.04,.8]])tt({freq:98*e*n,t:i,dur:r,gain:s*t,attack:.008});un({t:i,dur:.05,gain:.06*t,type:"lowpass",freq:500})},crab(i,e,t){tt({freq:330*e,type:"triangle",t:i,dur:.32,gain:.22*t,ramps:[[700*e,.1],[392*e,.28]]})},click(i,e,t){tt({freq:1800*e,t:i,dur:.035,gain:.12*t})},bloom(i,e,t){[261.63,329.63,392,523.25].forEach((n,s)=>{tt({freq:n*e*Us(-3),t:i,dur:2,gain:.1*t,attack:.5+s*.12}),tt({freq:n*e*Us(3),t:i,dur:2,gain:.07*t,attack:.5+s*.12})}),qt(1046.5*e,i+.9,.12*t,1)},door(i,e,t){[1318.5,1568,2093,2349,2637].forEach((n,s)=>qt(n*e*ai(8),i+s*.07+Math.random()*.02,.12*t,.6))},plant(i,e,t){qt(620*e*ai(30),i,.22*t,.18),un({t:i,dur:.04,gain:.07*t,freq:2400})},sparkle(i,e,t){tt({freq:2637*e*ai(15),t:i,dur:.12,gain:.09*t}),tt({freq:3520*e*ai(15),t:i+.05,dur:.15,gain:.06*t})},streak(i,e,t){qt(392*e,i,.3*t,.4),qt(523.25*e,i+.12,.32*t,.6)},egg(i,e,t){un({t:i,dur:.035,gain:.22*t,type:"highpass",freq:2500}),tt({freq:700*e*ai(20),type:"triangle",t:i,dur:.04,gain:.1*t})},swoosh(i,e,t){un({t:i,dur:.3,gain:.32*t,freq:400*e,q:.7,sweepTo:2600*e})}},Gc=[{0:76,3:79,8:81,14:79,16:72,22:74,24:76,32:81,35:84,40:81,46:79,48:76,56:74},{0:72,6:74,8:76,16:79,20:76,28:74,32:76,38:81,44:79,48:84,52:81,60:79},{0:67,8:72,14:74,24:76,36:79,44:81,52:79,58:76}],Hc=[{0:76,2:79,6:81,12:84,16:79,22:76,24:74,32:81,34:84,38:86,44:81,48:79,54:76,56:74},{0:72,4:74,6:76,12:79,16:76,20:74,28:72,32:76,36:79,38:81,44:84,48:81,52:79,60:74}],X_={0:72,2:76,4:79,6:84,9:88},Cr={island:{stepDur:60/72/2,length:64,loop:!0,lowpass:2800,step(i,e,t){const n=i.dest;e%32===0&&zc(e===0?[48,52,55,59]:[53,57,60,64],t,32*this.stepDur+.5,.055,n),e%16===0&&Wi(e<32?36:41,t,.45,1.6,n);const s=Gc[i.loops%Gc.length][e];s&&Wi(s,t,.38*(.85+Math.random()*.3),1.1,n)}},chamber:{stepDur:60/84/2,length:64,loop:!0,lowpass:3800,step(i,e,t){const n=i.dest;e%32===0&&zc(e===0?[45,52,55,60]:[41,48,52,57],t,32*this.stepDur+.5,.05,n),e%8===0&&Wi(e<32?45:41,t,.4,1.2,n),e%4===2&&un({t,dur:.025,gain:.04+Math.random()*.02,type:"highpass",freq:5e3,dest:n}),e%16===8&&un({t,dur:.05,gain:.06,type:"lowpass",freq:400,dest:n});const s=Hc[i.loops%Hc.length][e];s&&V_(s,t,.3*(.85+Math.random()*.3),n)}},celebrate:{stepDur:.115,length:26,loop:!1,lowpass:4500,step(i,e,t){const n=i.dest,s=X_[e];if(s&&Wi(s,t,.55,.8,n),e===12){for(const r of[60,64,67,72])tt({freq:xi(r),t,dur:1.6,gain:.12,attack:.05,dest:n});Wi(91,t+.1,.22,.6,n),Wi(96,t+.25,.18,.7,n)}}}};function Vc(i){if(!Ge||i.done)return;const e=Ge.currentTime+.2;for(;i.nextTime<e&&!i.done;)i.def.step(i,i.step,i.nextTime),i.nextTime+=i.def.stepDur,i.step+=1,i.step>=i.def.length&&(i.def.loop?(i.step=0,i.loops+=1):(i.done=!0,q_(i)))}function Na(i){Oo(.5);const e=Cr[i],t=Ge.currentTime,n=Ge.createGain();n.gain.setValueAtTime(1e-4,t),n.gain.linearRampToValueAtTime(1,t+.5),n.connect(Rr);const s=Ge.createBiquadFilter();s.type="lowpass",s.frequency.value=e.lowpass,s.connect(n);const r={name:i,def:e,out:n,dest:s,step:0,loops:0,nextTime:t+.06,done:!1,timer:0};r.timer=setInterval(()=>Vc(r),100),bi=r,Vc(r)}function Oo(i=.5){const e=bi;if(!e)return;bi=null,e.done=!0,clearInterval(e.timer);const t=Ge.currentTime;e.out.gain.cancelScheduledValues(t),e.out.gain.setValueAtTime(Math.max(e.out.gain.value,1e-4),t),e.out.gain.linearRampToValueAtTime(1e-4,t+i),setTimeout(()=>{try{e.out.disconnect()}catch{}},i*1e3+200)}function q_(i){clearInterval(i.timer),bi===i&&(bi=null,Dn===i.name&&(Dn=null)),setTimeout(()=>{try{i.out.disconnect()}catch{}},4e3)}const J={init(){if(Ge){Ge.state==="suspended"&&Ge.resume();return}const i=globalThis.AudioContext||globalThis.webkitAudioContext;if(!i)return;Ge=new i,br=Ge.createGain(),br.gain.value=.9,br.connect(Ge.destination),Pn=Ge.createDynamicsCompressor(),Pn.threshold.value=-20,Pn.knee.value=12,Pn.ratio.value=5,Pn.attack.value=.003,Pn.release.value=.25,Pn.connect(br),Zi=Ge.createGain(),Zi.gain.value=.8,Zi.connect(Pn),Rr=Ge.createGain(),Rr.gain.value=.25,Rr.connect(Pn),Gr=Ge.createBuffer(1,Ge.sampleRate,Ge.sampleRate);const e=Gr.getChannelData(0);for(let t=0;t<e.length;t++)e[t]=Math.random()*2-1;typeof document<"u"&&document.addEventListener("visibilitychange",()=>{Ge&&(document.hidden?Ge.suspend():Ge.resume())}),Ge.state==="suspended"&&Ge.resume(),yr&&Dn&&Cr[Dn]?.loop&&Na(Dn)},sfx(i,e={}){if(!Ge||!Ua)return;const t=W_[i];t&&t(Ge.currentTime,e.pitch??1,e.gain??1)},comboTone(i){if(!Ge||!Ua)return;const e=[72,74,76,79,81,84,86,88],t=Math.min(Math.max(1,i|0),e.length)-1,n=Ge.currentTime;qt(xi(e[t]),n,.3,.5),t>=4&&tt({freq:xi(e[t])*4,t:n+.04,dur:.18,gain:.05})},music(i){if(Dn=i,!(!Ge||!yr)){if(i===null){Oo();return}Cr[i]&&(bi&&bi.name===i||Na(i))}},setSfx(i){Ua=!!i},setMusic(i){yr=!!i,yr?Ge&&Dn&&Cr[Dn]?.loop&&Na(Dn):Oo(.3)},get ready(){return!!Ge}};function Vn(i,e,t=null,n=null){const s=t?ks(i,t):i,r=vi(s,{cacheKey:n&&n+JSON.stringify(t||"")}),a=s.layers.length,o=e/a,l=new en;return r.scale.setScalar(o),l.add(r),l.userData.headH=e,l.userData.voxelScale=o,l}function Tt(i,e,t,n={}){const s=vi(i,{cacheKey:t,...n});if(e){const r=e/i.layers.length;s.scale.setScalar(r)}return s}function _t(i,e={}){const{fontSize:t=64,color:n="#4a3f35",bg:s=null,pad:r=18,scale:a=1}=e,o=document.createElement("canvas"),l=o.getContext("2d"),c=`900 ${t}px 'Quicksand','Varela Round','Comic Sans MS',system-ui,sans-serif`;l.font=c;const h=Math.ceil(l.measureText(i).width)+r*2,d=t+r*2;o.width=h*2,o.height=d*2;const u=o.getContext("2d");u.scale(2,2),s&&(u.fillStyle=s,u.beginPath(),u.roundRect(2,2,h-4,d-4,16),u.fill(),u.strokeStyle="#ffffff",u.lineWidth=4,u.stroke()),u.font=c,u.fillStyle=n,u.textAlign="center",u.textBaseline="middle",u.fillText(i,h/2,d/2+2);const f=new Ch(o);f.anisotropy=4;const g=new gl({map:f,transparent:!0});g._owned=!0;const v=new Ah(g),m=h/d;return v.scale.set(.5*m*a,.5*a,1),v}function Xh(i,e){const t=e.clone().project(i.camera);return{x:(t.x*.5+.5)*window.innerWidth,y:(-t.y*.5+.5)*window.innerHeight}}function Ba(i,e,t,n,s=1,r=null){const a=Xh(i,e),o=n.getBoundingClientRect(),l={x:o.left+o.width/2,y:o.top+o.height/2};for(let c=0;c<s;c++){const h=document.createElement("div");h.textContent=t,h.style.cssText="position:fixed;left:0;top:0;font-size:26px;z-index:40;pointer-events:none;will-change:transform;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))",document.body.appendChild(h);const d={x:a.x+(Math.random()-.5)*70,y:a.y-Math.random()*60};lt({ms:380+Math.random()*120,delay:c*70,ease:ut.outQuad,onUpdate:(u,f)=>{const g=a.x+(d.x-a.x)*f,v=a.y+(d.y-a.y)*f-Math.sin(f*Math.PI)*40;h.style.transform=`translate(${g-13}px,${v-13}px) scale(${.6+f*.6})`},onDone:()=>{lt({ms:420,ease:ut.inQuad,onUpdate:(u,f)=>{const g=d.x+(l.x-d.x)*f,v=d.y+(l.y-d.y)*f;h.style.transform=`translate(${g-13}px,${v-13}px) scale(${1.2-f*.7})`},onDone:()=>{h.remove(),n.parentElement?.animate?.([{transform:"scale(1)"},{transform:"scale(1.18)"},{transform:"scale(1)"}],{duration:180}),r?.()}})}})}}function zo(i,e,t,n="#2c6e49"){const s=Xh(i,e),r=document.createElement("div");r.textContent=t,r.style.cssText=`position:fixed;left:0;top:0;font-family:inherit;font-weight:900;font-size:24px;color:${n};z-index:40;pointer-events:none;text-shadow:0 2px 0 #fff,0 3px 6px rgba(0,0,0,.2)`,document.body.appendChild(r),lt({ms:900,ease:ut.outQuad,onUpdate:(a,o)=>{r.style.transform=`translate(${s.x-20}px,${s.y-30-o*60}px) scale(${1+o*.2})`,r.style.opacity=String(1-Math.max(0,o-.6)/.4)},onDone:()=>r.remove()})}const $_=[16767334,8179580,16757702,10213119,13215487,16751493];class Oa{constructor(e,t=320){this.max=t,this.geo=new cn,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.life=new Float32Array(t),this.geo.setAttribute("position",new Gt(this.pos,3)),this.geo.setAttribute("color",new Gt(this.col,3));const n=new Rh({size:.14,vertexColors:!0,transparent:!0,depthWrite:!1});n._owned=!0,this.points=new $u(this.geo,n),this.points.frustumCulled=!1,e.add(this.points),this.cursor=0,this.life.fill(0),this.pos.fill(9999)}emit(e,t,{colors:n=$_,speed:s=2.4,up:r=2.6,life:a=900,spread:o=.25}={}){const l=new De;for(let c=0;c<t;c++){const h=this.cursor=(this.cursor+1)%this.max;this.life[h]=a*(.7+Math.random()*.6),this.pos[h*3]=e.x+(Math.random()-.5)*o,this.pos[h*3+1]=e.y+Math.random()*o,this.pos[h*3+2]=e.z+(Math.random()-.5)*o;const d=Math.random()*Math.PI*2,u=s*(.4+Math.random()*.8);this.vel[h*3]=Math.cos(d)*u,this.vel[h*3+1]=r*(.5+Math.random()*.8),this.vel[h*3+2]=Math.sin(d)*u,l.setHex(n[Math.random()*n.length|0]),this.col[h*3]=l.r,this.col[h*3+1]=l.g,this.col[h*3+2]=l.b}this.geo.attributes.color.needsUpdate=!0}confetti(e,t=36){this.emit(e,t),J.sfx("sparkle")}splash(e,t=30){this.emit(e,t,{colors:[10213119,14283515,8308963],speed:1.8,up:3,life:700})}poof(e,t=16,n=14272936){this.emit(e,t,{colors:[n,16777215],speed:1.2,up:1.2,life:500})}update(e){const t=e/1e3;let n=!1;for(let s=0;s<this.max;s++)if(!(this.life[s]<=0)){if(n=!0,this.life[s]-=e,this.life[s]<=0){this.pos[s*3+1]=9999;continue}this.vel[s*3+1]-=7.5*t,this.pos[s*3]+=this.vel[s*3]*t,this.pos[s*3+1]+=this.vel[s*3+1]*t,this.pos[s*3+2]+=this.vel[s*3+2]*t,this.pos[s*3+1]<.02&&(this.pos[s*3+1]=.02,this.vel[s*3+1]*=-.35)}n&&(this.geo.attributes.position.needsUpdate=!0)}}const Wc=1.6,K_=["","portalVine1","portalVine2","portalVine3","portalVine3"];function Y_(){const i=document.createElement("canvas");i.width=i.height=32;const e=i.getContext("2d"),t=e.createRadialGradient(16,16,0,16,16,16);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.4,"rgba(255,250,225,0.85)"),t.addColorStop(1,"rgba(255,245,200,0)"),e.fillStyle=t,e.fillRect(0,0,32,32),new Ch(i)}function Xc(i,e){const t=new gl({map:Y_(),color:i,transparent:!0,depthWrite:!1,blending:Fr});t._owned=!0;const n=new Ah(t);return n.scale.set(e,e,1),n}class j_{constructor(e,t,n){this.place=e,this.spot=t,this.worldId=n.worldId,this.accent=n.accent,this.bloom=n.bloom,this.pct=Math.min(1,Math.max(0,n.pct??0)),this.s=Wc/pt.portal.layers.length,this.t=Math.random()*6,this.growK=1,this.glowBoost=0,this.greetArmed=!0,this.greetCooldown=0,this.group=new en,this.group.position.copy(e.worldPos(t.x,t.z)),e.group.add(this.group),this.body=new en,this.group.add(this.body);const s="#"+new De(this.accent).lerp(new De("#ffffff"),.45).getHexString(),r=vi(ks(pt.portal,{Q:s}),{cacheKey:"prop:portal:"+this.worldId});r.scale.setScalar(this.s),this.body.add(r);const a=new ls(5*this.s*.94,7*this.s*.94);this.glowMat=new Xr({color:this.accent,transparent:!0,opacity:0,blending:Fr,depthWrite:!1,side:pn}),this.glowMat._owned=!0;const o=new Lt(a,this.glowMat);o.position.set(0,3.5*this.s,1.06*this.s),this.body.add(o),this.labelY=2.45,this.label=_t(n.label,{bg:"#fff8ecdd",scale:.85,fontSize:44}),this.label.position.set(0,this.labelY,0),this.group.add(this.label),this.overlay=null,this.star=null,this.motes=[],this._setStage(n.stage??0),e.addEntity(this)}_setStage(e){this.stage=e,this.overlay&&this.body.remove(this.overlay),this.overlay=null;const t=K_[e];t&&(this.overlay=vi(ks(pt[t],{F:this.bloom}),{cacheKey:`prop:${t}:${this.worldId}`}),this.overlay.scale.setScalar(this.s),this.body.add(this.overlay)),this.star&&(this.body.remove(this.star),this.star.material.map.dispose(),this.star.material.dispose(),this.star=null),e>=4&&(this.star=Xc(16767334,.16),this.star.position.set(0,13.1*this.s,0),this.body.add(this.star));for(const s of this.motes)this.body.remove(s.sprite),s.sprite.material.map.dispose(),s.sprite.material.dispose();this.motes=[];const n=new De(16777215).lerp(new De(this.accent),.4);for(let s=0;s<1+e;s++){const r=.05+Math.random()*.035,a=Xc(n.getHex(),r);this.body.add(a),this.motes.push({sprite:a,size:r,x:(Math.random()-.5)*.5,z:(1.1+Math.random()*.4)*this.s,phase:Math.random(),speed:.1+Math.random()*.08,sway:.6+Math.random()*.8})}}celebrate(e){e<=this.stage||(this._setStage(e),this.growK=.001,lt({ms:950,ease:ut.outBack,onUpdate:t=>{this.growK=Math.max(.001,t)},onDone:()=>{this.growK=1}}),this.glowBoost=.45,this.bounce(),this.place.fx?.emit(this._fxPos(),30,{colors:[this.accent,16777215,16767334],speed:1.6,up:2.8,life:1e3,spread:.55}),J.sfx("sparkle"))}bounce(){lt({ms:540,ease:ut.linear,onUpdate:(e,t)=>{const n=Math.sin(t*Math.PI*2)*(1-t);this.body.scale.set(1-n*.08,1+n*.14,1-n*.08)},onDone:()=>this.body.scale.set(1,1,1)})}_fxPos(){const e=this.group.position;return new D(e.x,e.y+.8,e.z)}update(e){const t=e/1e3;this.t+=t;const n=.5+.5*Math.sin(this.t*1.7);this.glowBoost=Math.max(0,this.glowBoost-t*.3),this.glowMat.opacity=Math.min(.85,.04+.26*this.pct+.12*n*(.3+this.pct)+this.glowBoost);for(const r of this.motes){const a=(this.t*r.speed+r.phase)%1;r.sprite.position.set(r.x+Math.sin(this.t*r.sway+r.phase*7)*.14,.12+a*Wc*.62,r.z),r.sprite.material.opacity=Math.sin(a*Math.PI)*(.4+.45*Math.sin(this.t*5+r.phase*9)**2);const o=r.size*(.85+.25*Math.sin(this.t*3+r.phase*5));r.sprite.scale.set(o,o,1)}if(this.overlay&&this.overlay.scale.setScalar(this.s*this.growK*(1+.02*Math.sin(this.t*1.8))),this.star){this.star.material.rotation+=t*.8;const r=.16*(1+.2*Math.sin(this.t*2.4));this.star.scale.set(r,r,1)}this.label.position.y=this.labelY+Math.sin(this.t*1.3)*.035,this.greetCooldown=Math.max(0,this.greetCooldown-t);const s=this.place.playerAt?.();if(s){const r=Math.abs(s.x-this.spot.x)+Math.abs(s.z-this.spot.z);r<=2&&this.greetArmed&&!this.greetCooldown?(this.greetArmed=!1,this.greetCooldown=8,this.bounce(),this.glowBoost=Math.max(this.glowBoost,.22),this.place.fx?.emit(this._fxPos(),8,{colors:[this.accent,16777215],speed:1,up:1.8,life:600,spread:.4})):r>=4&&(this.greetArmed=!0)}}}class Ms{constructor(e,t,n,s,r={}){this.place=e,this.x=t,this.z=n,this.choice=s,this.taken=!1,this.group=new en,this.stone=Tt(pt.stone,.62,"prop:stone"),this.group.add(this.stone),this.label=r.tried?_t(String(s.value),{bg:"#ece2d0",color:"#9a8b7a",scale:.95}):_t(String(s.value),{bg:"#fff8ec",scale:.95}),this.label.position.y=.95,this.group.add(this.label),this.group.position.copy(e.worldPos(t,n)),this.bobT=Math.random()*10,e.group.add(this.group)}pickUpMesh(){this.taken=!0,this.place.group.remove(this.group);const e=new en,t=Tt(pt.stone,.5,"prop:stone");e.add(t);const n=_t(String(this.choice.value),{bg:"#fff8ec",scale:.7});return n.position.y=.62,e.add(n),e}update(e){this.taken||(this.bobT+=e/1e3,this.label.position.y=.95+Math.sin(this.bobT*2.2)*.05)}remove(){this.place.group.remove(this.group),this.taken=!0}}class qc{constructor(e,t,n,s){this.place=e,this.x=t,this.z=n,this.contents=s,this.smashed=!1,this.mesh=Tt(pt.pot,.6,"prop:pot"),this.mesh.position.copy(e.worldPos(t,n)),e.group.add(this.mesh)}smash(e){if(this.smashed)return null;this.smashed=!0,J.sfx("pop"),e.poof(this.mesh.position.clone().add(new D(0,.3,0)),18,14258287);const t=this.mesh;return lt({ms:160,ease:ut.inQuad,onUpdate:(n,s)=>{t.scale.setScalar((1-s)*t.scale.x||.001)},onDone:()=>this.place.group.remove(t)}),this.contents}}class Z_{constructor(e,t,n,s,r,a,o=1.6){this.place=e,this.axis=s,this.min=r,this.max=a,this.pos=s==="x"?t:n,this.fixed=s==="x"?n:t,this.dir=1,this.speed=o,this.frozen=!1,this.cooldown=0,this.mesh=Vn(Br.crab,.5,null,"char:crab"),e.group.add(this.mesh),this.t=Math.random()*10,this._sync(0)}get x(){return this.axis==="x"?Math.round(this.pos):this.fixed}get z(){return this.axis==="z"?Math.round(this.pos):this.fixed}_sync(e){this.t+=e/1e3;const t=this.axis==="x"?this.pos:this.fixed,n=this.axis==="z"?this.pos:this.fixed,s=Math.round(t)*1e3+Math.round(n);this._posKey!==s&&(this._posKey=s,this._pos=this.place.worldPos(Math.round(t),Math.round(n)));const r=this._pos,a=this.axis==="x"?this.pos-Math.round(t):0,o=this.axis==="z"?this.pos-Math.round(n):0;this.mesh.position.set(r.x+a,r.y+Math.abs(Math.sin(this.t*9))*.06,r.z+o),this.mesh.rotation.y=this.axis==="x"?this.dir>0?Math.PI/2:-Math.PI/2:this.dir>0?0:Math.PI}update(e){if(this.cooldown>0&&(this.cooldown-=e),this.frozen){this.mesh.rotation.z=Math.sin(this.t)*.04,this.t+=e/1e3;return}this.mesh.rotation.z=0,this.pos+=this.dir*this.speed*(e/1e3),this.pos>=this.max&&(this.pos=this.max,this.dir=-1),this.pos<=this.min&&(this.pos=this.min,this.dir=1),this._sync(e)}}class Q_{constructor(e,t,n){this.place=e,this.x=t,this.z=n,this.mesh=Tt(pt.altar,.9,"prop:altar"),this.mesh.position.copy(e.worldPos(t,n)),e.group.add(this.mesh),this.baseS=this.mesh.scale.x,this.glow=_t("✨",{scale:.8}),this.glow.position.copy(this.mesh.position).add(new D(0,1.45,0)),e.group.add(this.glow),this.t=0}cheer(){const e=this.mesh,t=this.baseS;lt({ms:520,ease:ut.outQuad,onUpdate:(n,s)=>{const r=Math.sin(s*Math.PI);e.scale.set(t*(1+r*.1),t*(1+r*.18),t*(1+r*.1))},onDone:()=>e.scale.setScalar(t)})}shake(){const e=this.mesh;lt({ms:540,ease:ut.linear,onUpdate:(t,n)=>{e.rotation.z=Math.sin(n*Math.PI*3)*.06*(1-n)},onDone:()=>{e.rotation.z=0}})}update(e){this.t+=e/1e3,this.glow.position.y=this.mesh.position.y+1.45+Math.sin(this.t*2.4)*.07,this.glow.material.opacity=.7+Math.sin(this.t*3)*.3}}const hs=[{id:"lanterns",char:"l",cost:30,points:.25,emoji:"🏮"},{id:"fruitstand",char:"f",cost:60,points:.7,emoji:"🍉",npc:{pet:"redpanda",face:"🦊"},perk:{kind:"bananas",n:8}},{id:"garden",char:"e",cost:90,points:1.2,emoji:"🌺"},{id:"stage",char:"h",cost:120,points:1.8,emoji:"🎵",npc:{pet:"kitten",face:"🐱"}},{id:"bakery",char:"k",cost:150,points:2.4,emoji:"🥐",npc:{pet:"piglet",face:"🐷"},perk:{kind:"egg",n:3}},{id:"bridge",char:"b",cost:200,points:3,emoji:"🌉"},{id:"plaza",char:"j",cost:500,contribution:250,points:3.4,needs:["bridge"],emoji:"🎪",finale:!0}];hs.length;const qh={};for(const i of hs)qh[i.id]=i;const J_=i=>qh[i]||null;function Go(){return{built:[],seen:[],perkDay:null}}function Vs(i){i.island||(i.island=Go());for(const[e,t]of Object.entries(Go()))i.island[e]===void 0&&(i.island[e]=t);return i.island}function $h(i){let e=0;for(const t of Object.values(i.worlds))e+=t.pct;return e}const $c=(i,e)=>Vs(i).built.includes(e),bl=i=>i.cost-(i.contribution||0);function Kh(i,e,t){if($c(i,e.id))return"built";if($h(t)<e.points)return"locked";for(const n of e.needs||[])if(!$c(i,n))return"locked";return"unlocked"}function Pr(i,e){return hs.map(t=>({...t,state:Kh(i,t,e),playerCost:bl(t)}))}function ev(i,e){const t=Vs(i);return Pr(i,e).filter(n=>n.state==="unlocked"&&!t.seen.includes(n.id))}function tv(i,e){const t=Vs(i);for(const n of e)t.seen.includes(n)||t.seen.push(n)}function nv(i,e,t){return Kh(i,e,t)==="unlocked"&&i.bananas>=bl(e)}function iv(i,e,t){return nv(i,e,t)?(i.bananas-=bl(e),Vs(i).built.push(e.id),!0):!1}function sv(i,e){const t=Vs(i);return t.perkDay===e?[]:(t.perkDay=e,hs.filter(n=>n.perk&&t.built.includes(n.id)).map(n=>({id:n.id,...n.perk})))}function rv(i,e){const t=e.includes("bridge");return i.map(n=>n.replace(/w/g,t?"V":"#"))}function av(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function ov(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}class rs{constructor(e){this.next=av(typeof e=="string"?ov(e):e)}float(){return this.next()}int(e,t){return e+Math.floor(this.next()*(t-e+1))}pick(e){return e[Math.floor(this.next()*e.length)]}shuffle(e){const t=e.slice();for(let n=t.length-1;n>0;n--){const s=Math.floor(this.next()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}chance(e){return this.next()<e}}new rs(Math.random()*2**32>>>0);const Rs=["tide","garden","stump","vines"],Ns={tide:["add_20","sub_20","missing_addend","add_100","sub_100"],garden:["tables_a","tables_b","tables_c","tables_mix","mult_2digit"],stump:["div_facts","share","div_remainder","missing_factor"],vines:["frac_magnitude","frac_compare","frac_equiv","frac_of_n"]},xn={};for(const i of Rs)Ns[i].forEach((e,t)=>{xn[e]={id:e,world:i,order:t,prereqs:t===0?[]:[Ns[i][t-1]],nameKey:`skill.${e}`}});const Ho=600,Yh=850,lv=.8,Vo=10,cv=10,Kc=200,hv=108,Wo=8;function dv(){const i={};for(const e of Object.keys(xn))i[e]={r:Ho,n:0,hist:[]};return{skills:i,facts:{},log:[]}}const uv=(i,e,t)=>Math.min(t,Math.max(e,i)),yl=(i,e)=>e?yl(e,i%e):i;function fv(i,e){return 1/(1+10**((e-i)/400))}function pv(i){return i<520?0:i<760?1:2}function jh(i){return i.length?i.reduce((e,t)=>e+t,0)/i.length:0}function Bs(i){return i.r>=Yh&&i.n>=Vo&&i.hist.length>=Vo&&jh(i.hist)>=lv}function Zn(i){if(!Number.isInteger(i)||i<10)return null;const e=Number(String(i).split("").reverse().join(""));return e===i||e<1?null:e}function Zh(i){const e=[];for(let t=1;t<i;t++)yl(t,i)===1&&e.push(t);return e}function Sn(i,e,t,{min:n=1,count:s=6}={}){const r=e===0?0:n,a=[{value:e,tag:"correct"}],o=new Set([e]),l=(h,d)=>{a.length>=s||h==null||!Number.isFinite(h)||(h=Math.round(h),!(h<r||o.has(h))&&(o.add(h),a.push({value:h,tag:d})))};for(const h of t)l(h.value,h.tag);for(const h of[1,-1,2,-2,3,-3])l(e+h,"near_miss");let c=4;for(;a.length<s;)l(e+(i.chance(.5)?c:-c),"random"),l(e+c,"random"),c++;return i.shuffle(a)}function mv(i,e,t,n){const s=c=>{const[h,d]=String(c).split("/").map(Number);return h/d},r=[{value:e,tag:"correct"}],a=[s(e)],o=(c,h)=>{if(r.length>=4)return;const d=s(c);!Number.isFinite(d)||d<=0||a.some(u=>Math.abs(u-d)<1e-9)||(a.push(d),r.push({value:c,tag:h}))};for(const c of t)o(c.value,c.tag);let l=0;for(;r.length<4&&l<50;)o(n(l++),"random");return i.shuffle(r)}function Nt(i,e){let t=i[0];for(const n of i)Math.abs(n.d-e)<Math.abs(t.d-e)&&(t=n);return t}const vt={};vt.add_20=(i,e)=>{const t=Nt([{d:420,gen:()=>{const a=e.int(1,9);return[a,e.int(1,Math.max(1,10-a))]}},{d:540,gen:()=>{const a=e.int(3,9);return[a,e.int(Math.max(2,11-a),Math.min(9,18-a))]}},{d:650,gen:()=>{const a=e.int(11,17);return[a,e.int(2,Math.min(9,20-a))]}}],i),[n,s]=t.gen(),r=n+s;return{kind:"fetch",equation:`${n} + ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Sn(e,r,[{value:Math.abs(n-s),tag:"addsub_confuse"},{value:Zn(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:{key:"ex.near_miss",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s}}};vt.sub_20=(i,e)=>{const t=Nt([{d:460,gen:()=>{const a=e.int(3,10);return[a,e.int(1,a-1)]}},{d:580,gen:()=>{const a=e.int(12,19);return[a,e.int(1,a%10)]}},{d:690,gen:()=>{const a=e.int(11,18);return[a,e.int(a%10+1,9)]}}],i),[n,s]=t.gen(),r=n-s;return{kind:"fetch",equation:`${n} − ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Sn(e,r,[{value:n+s,tag:"addsub_confuse"},{value:Zn(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:{key:"ex.addsub_confuse",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s}}};vt.missing_addend=(i,e)=>{const t=Nt([{d:500,gen:()=>{const a=e.int(5,10);return[e.int(1,a-1),a]}},{d:620,gen:()=>{const a=e.int(11,20);return[e.int(2,a-2),a]}},{d:780,gen:()=>{const a=e.int(6,18)*5;return[e.int(1,a/5-1)*5,a]}}],i),[n,s]=t.gen(),r=s-n;return{kind:"fetch",equation:`${n} + ? = ${s}`,prompt:{key:"q.missing",vars:{a:n,c:s}},answer:r,choices:Sn(e,r,[{value:n+s,tag:"addsub_confuse"},{value:Zn(r),tag:"reversed"}]),model:{kind:"none",params:{}},explain:{key:"ex.addsub_confuse",vars:{a:n,c:s,answer:r}},difficulty:t.d,meta:{a:n,c:s}}};vt.add_100=(i,e)=>{const t=Nt([{d:560,carry:!1,gen:()=>{const o=e.int(1,7),l=e.int(1,8-o),c=e.int(1,8),h=e.int(0,9-c);return[o*10+c,l*10+h]}},{d:760,carry:!0,gen:()=>{const o=e.int(1,6),l=e.int(1,7-o),c=e.int(2,9),h=e.int(Math.max(2,11-c),9);return[o*10+c,l*10+h]}},{d:900,carry:!0,gen:()=>{const o=e.int(3,5),l=e.int(3,Math.min(5,8-o)),c=e.int(5,9),h=e.int(Math.max(5,11-c),9);return[o*10+c,l*10+h]}}],i),[n,s]=t.gen(),r=n+s,a=(n%10+s%10)%10+10*(Math.floor(n/10)+Math.floor(s/10));return{kind:"fetch",equation:`${n} + ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Sn(e,r,[{value:a,tag:"no_carry"},{value:Zn(r),tag:"reversed"}]),model:{kind:"none",params:{}},explain:t.carry?{key:"ex.no_carry",vars:{a:n,b:s,answer:r}}:{key:"ex.near_miss",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s,carry:t.carry}}};vt.sub_100=(i,e)=>{const t=Nt([{d:620,borrow:!1,gen:()=>{const o=e.int(2,9),l=e.int(1,9);return[o*10+l,e.int(1,o-1)*10+e.int(0,l)]}},{d:840,borrow:!0,gen:()=>{const o=e.int(2,9),l=e.int(0,8);return[o*10+l,e.int(1,o-1)*10+e.int(l+1,9)]}},{d:980,borrow:!0,gen:()=>{const o=e.int(6,9),l=e.int(0,7);return[o*10+l,e.int(2,o-1)*10+e.int(l+1,9)]}}],i),[n,s]=t.gen(),r=n-s,a=(Math.floor(n/10)-Math.floor(s/10))*10+Math.abs(n%10-s%10);return{kind:"fetch",equation:`${n} − ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:r,choices:Sn(e,r,[{value:a,tag:"borrow"},{value:Zn(r),tag:"reversed"}],{min:0}),model:{kind:"none",params:{}},explain:t.borrow?{key:"ex.borrow",vars:{a:n,b:s,answer:r}}:{key:"ex.near_miss",vars:{a:n,b:s,answer:r}},difficulty:t.d,meta:{a:n,b:s,borrow:t.borrow}}};function gv(i,e,t,n,s,r){const a=n*s,o={a:n,b:s};if(e==="array"){const l=t===0||i.chance(.5)?"both":i.chance(.6)?"rows":"total";return{kind:"array",equation:l==="both"?`${n} × ${s} = ?`:l==="rows"?`${n} × ? = ${a}`:`? × ? = ${a}`,prompt:{key:`q.array_${l}`,vars:{rows:n,cols:s,total:a}},answer:a,choices:null,model:{kind:"array",params:{rows:n,cols:s,total:a,given:l}},explain:{key:"ex.off_by_table",vars:{a:n,b:s,answer:a}},difficulty:r+(l==="both"?0:30),meta:o}}return{kind:"fetch",equation:`${n} × ${s} = ?`,prompt:{key:"q.fetch",vars:{a:n,b:s}},answer:a,choices:Sn(i,a,[{value:(n+(i.chance(.5)?1:-1))*s,tag:"off_by_table"},{value:n*(s+(i.chance(.5)?1:-1)),tag:"off_by_table"},{value:n+s,tag:"addsub_confuse"},{value:Zn(a),tag:"reversed"}]),model:{kind:"array",params:{rows:n,cols:s,total:a,given:"both"}},explain:{key:"ex.off_by_table",vars:{a:n,b:s,answer:a}},difficulty:r,meta:o}}function $r(i){return(e,t,n,s)=>{const r=Nt(i,e),[a,o]=r.gen(t);return gv(t,n,s,a,o,r.d)}}vt.tables_a=$r([{d:420,gen:i=>[i.pick([2,5,10]),i.int(1,5)]},{d:520,gen:i=>[i.pick([2,5,10]),i.int(2,10)]},{d:640,gen:i=>[i.pick([2,5,10]),i.int(6,10)]}]);vt.tables_b=$r([{d:560,gen:i=>[i.pick([3,4,6]),i.int(2,5)]},{d:660,gen:i=>[i.pick([3,4,6]),i.int(2,10)]}]);vt.tables_c=$r([{d:680,gen:i=>[i.pick([7,8,9]),i.int(2,5)]},{d:780,gen:i=>[i.pick([7,8,9]),i.int(2,10)]},{d:860,gen:i=>[i.pick([7,8,9]),i.int(6,9)]}]);vt.tables_mix=$r([{d:600,gen:i=>[i.int(2,6),i.int(2,6)]},{d:700,gen:i=>[i.int(2,10),i.int(2,10)]},{d:800,gen:i=>[i.int(6,9),i.int(6,9)]}]);vt.mult_2digit=(i,e,t,n)=>{const s=Nt([{d:780,gen:()=>[e.int(2,4),e.int(12,29)]},{d:940,gen:()=>[e.int(3,7),e.int(13,49)]},{d:1100,gen:()=>[e.int(4,9),e.int(25,99)]}],i),[r,a]=s.gen(),o=r*a;if(t==="array")return{kind:"array",equation:`${r} × ${a} = ?`,prompt:{key:"q.array_both",vars:{rows:r,cols:a,total:o}},answer:o,choices:null,model:{kind:"array",params:{rows:r,cols:a,total:o,given:"both"}},explain:{key:"ex.no_carry",vars:{a:r,b:a,answer:o}},difficulty:s.d,meta:{a:r,b:a}};const l=r*Math.floor(a/10)*10+r*(a%10)%10;return{kind:"fetch",equation:`${r} × ${a} = ?`,prompt:{key:"q.fetch",vars:{a:r,b:a}},answer:o,choices:Sn(e,o,[{value:l,tag:"no_carry"},{value:(r+(e.chance(.5)?1:-1))*a,tag:"off_by_table"},{value:Zn(o),tag:"reversed"}]),model:{kind:"array",params:{rows:r,cols:a,total:o,given:"both"}},explain:{key:"ex.no_carry",vars:{a:r,b:a,answer:o}},difficulty:s.d,meta:{a:r,b:a}}};function Kr(i,e,{total:t,baskets:n,quotient:s,remainder:r,d:a,meta:o,explain:l}){const c={kind:"baskets",params:{total:t,baskets:n,quotient:s,remainder:r}};if(e==="share")return{kind:"share",equation:`${t} ÷ ${n}`,prompt:{key:"q.share",vars:{total:t,baskets:n}},answer:s,choices:null,model:c,explain:l,difficulty:a,meta:o};const h=r>0?[{value:s+1,tag:"remainder_ignored"},{value:r,tag:"random"}]:[{value:s+(i.chance(.5)?1:-1),tag:"off_by_table"},{value:t-n,tag:"addsub_confuse"}];return{kind:"fetch",equation:`${t} ÷ ${n} = ?`,prompt:{key:r>0?"q.share_fetch":"q.fetch",vars:{total:t,baskets:n}},answer:s,choices:Sn(i,s,h),model:c,explain:l,difficulty:a,meta:o}}vt.div_facts=(i,e,t)=>{const n=Nt([{d:480,gen:()=>[e.pick([2,5,10]),e.int(2,5)]},{d:600,gen:()=>[e.pick([2,3,4,5,6,10]),e.int(2,10)]},{d:720,gen:()=>[e.pick([6,7,8,9]),e.int(3,10)]}],i),[s,r]=n.gen(),a=s*r;return Kr(e,t,{total:a,baskets:s,quotient:r,remainder:0,d:n.d,meta:{a:s,b:r,c:a},explain:{key:"ex.div_fact",vars:{a:s,b:r,c:a,answer:r}}})};vt.share=(i,e,t)=>{const n=Nt([{d:560,gen:()=>[e.int(2,4),e.int(2,5)]},{d:700,gen:()=>[e.int(3,8),e.int(3,9)]},{d:860,gen:()=>[e.int(4,9),e.int(6,12)]}],i),[s,r]=n.gen(),a=s*r;return Kr(e,t,{total:a,baskets:s,quotient:r,remainder:0,d:n.d,meta:{baskets:s,quotient:r,total:a,remainder:0},explain:{key:"ex.div_fact",vars:{a:s,b:r,c:a,answer:r}}})};vt.div_remainder=(i,e,t)=>{const n=Nt([{d:680,gen:()=>[e.int(2,5),e.int(2,5)]},{d:820,gen:()=>[e.int(3,8),e.int(3,9)]},{d:960,gen:()=>[e.int(6,9),e.int(6,12)]}],i),[s,r]=n.gen(),a=e.int(1,s-1),o=s*r+a;return Kr(e,t,{total:o,baskets:s,quotient:r,remainder:a,d:n.d,meta:{baskets:s,quotient:r,total:o,remainder:a},explain:{key:"ex.remainder_ignored",vars:{total:o,baskets:s,quotient:r,remainder:a,answer:r}}})};vt.missing_factor=(i,e,t)=>{const n=Nt([{d:640,gen:()=>[e.int(2,5),e.int(2,5)]},{d:780,gen:()=>[e.int(3,9),e.int(3,9)]},{d:900,gen:()=>[e.int(6,12),e.int(6,9)]}],i),[s,r]=n.gen(),a=s*r;return t==="share"?Kr(e,"share",{total:a,baskets:r,quotient:s,remainder:0,d:n.d,meta:{a:s,b:r,c:a},explain:{key:"ex.missing_factor",vars:{a:s,b:r,c:a,answer:s}}}):{kind:"fetch",equation:`? × ${r} = ${a}`,prompt:{key:"q.missing",vars:{b:r,c:a}},answer:s,choices:Sn(e,s,[{value:s+(e.chance(.5)?1:-1),tag:"off_by_table"},{value:a-r,tag:"addsub_confuse"},{value:Zn(s),tag:"reversed"}]),model:{kind:"array",params:{rows:s,cols:r,total:a,given:"total"}},explain:{key:"ex.missing_factor",vars:{a:s,b:r,c:a,answer:s}},difficulty:n.d,meta:{a:s,b:r,c:a}}};vt.frac_magnitude=(i,e,t,n)=>{const s=Nt([{d:520,denoms:[2,4],hi:1},{d:700,denoms:[3,6,8],hi:1},{d:880,denoms:[5,10,12],hi:1},{d:1040,denoms:[3,4,5,6,8],hi:2}],i),r=e.pick(s.denoms),a=s.hi;let o=a===1?e.int(1,r-1):e.int(1,2*r-1);o%r===0&&(o+=1);const l=[.05,.03,.02][n],c=r*a;return{kind:"numberline",equation:`${o}/${r}`,prompt:{key:"q.numberline",vars:{n:o,d:r}},answer:o/r,accept:{tol:l},choices:null,model:{kind:"numberline",params:{n:o,d:r,lo:0,hi:a,ticks:c}},explain:{key:"ex.magnitude",vars:{n:o,d:r}},difficulty:s.d,meta:{n:o,d:r,lo:0,hi:a}}};vt.frac_compare=(i,e)=>{const t=Nt([{d:620,denoms:[2,3,4]},{d:760,denoms:[2,3,4,6,8]},{d:920,denoms:[3,5,8,10,12]}],i),n=new Set,s=[],r=(f,g)=>{const v=yl(f,g),m=`${f/v}/${g/v}`;n.has(m)||(n.add(m),s.push({n:f,d:g,v:f/g}))};let a=0;for(;s.length<4&&a++<200;){const f=e.pick(t.denoms);r(e.int(1,f-1),f)}for(const[f,g]of[[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[4,5],[5,6]]){if(s.length>=4)break;r(f,g)}s.sort((f,g)=>g.v-f.v);const o=s[0],l=s.slice(1),c=l.reduce((f,g)=>g.n+g.d>f.n+f.d?g:f,l[0]),h=l.filter(f=>f!==c),d=h.reduce((f,g)=>o.v-g.v<o.v-f.v?g:f,h[0]),u=e.shuffle([{value:`${o.n}/${o.d}`,tag:"correct"},...l.map(f=>({value:`${f.n}/${f.d}`,tag:f===c?"whole_number_bias":f===d?"near_miss":"random"}))]);return{kind:"fetch",equation:`${u.map(f=>f.value).join(" · ")} → ?`,prompt:{key:"q.compare",vars:{count:4}},answer:`${o.n}/${o.d}`,choices:u,model:{kind:"numberline",params:{n:o.n,d:o.d,lo:0,hi:1,ticks:o.d+1}},explain:{key:"ex.whole_number_bias",vars:{n:c.n,d:c.d,answer:`${o.n}/${o.d}`}},difficulty:t.d,meta:{fractions:s.map(f=>`${f.n}/${f.d}`)}}};vt.frac_equiv=(i,e)=>{const t=Nt([{d:660,denoms:[2,3,4],kMax:3},{d:800,denoms:[2,3,4,5,6],kMax:4},{d:940,denoms:[3,4,5,6,8],kMax:6}],i),n=e.pick(t.denoms),s=e.pick(Zh(n)),r=e.int(2,t.kMax),a=`${s*r}/${n*r}`,o=mv(e,a,[{value:`${s+r}/${n+r}`,tag:"add_tops_bottoms"},{value:`${s*r+1}/${n*r}`,tag:"near_miss"},{value:`${(s+1)*r}/${(n+1)*r}`,tag:"whole_number_bias"},{value:`${s*r}/${n*(r+1)}`,tag:"near_miss"}],l=>`${s*r+2+l}/${n*r}`);return{kind:"fetch",equation:`${s}/${n} = ?`,prompt:{key:"q.equiv",vars:{n:s,d:n}},answer:a,choices:o,model:{kind:"numberline",params:{n:s,d:n,lo:0,hi:1,ticks:n*r+1}},explain:{key:"ex.equiv",vars:{n:s,d:n,answer:a}},difficulty:t.d,meta:{n:s,d:n,k:r}}};vt.frac_of_n=(i,e)=>{const t=Nt([{d:720,denoms:[2,4],mMin:2,mMax:6},{d:880,denoms:[3,4,6,8],mMin:3,mMax:8},{d:1040,denoms:[5,8,10,12],mMin:4,mMax:10}],i),n=e.pick(t.denoms),s=e.pick(Zh(n)),r=n*e.int(t.mMin,t.mMax),a=r/n,o=a*s;return{kind:"fetch",equation:`${s}/${n} × ${r} = ?`,prompt:{key:"q.frac_of",vars:{n:s,d:n,whole:r}},answer:o,choices:Sn(e,o,[{value:a,tag:"whole_number_bias"},{value:o+a,tag:"near_miss"},{value:o-a,tag:"near_miss"},{value:r-s,tag:"random"}]),model:{kind:"baskets",params:{total:r,baskets:n,quotient:a,remainder:0}},explain:{key:"ex.generic",vars:{n:s,d:n,whole:r,answer:o}},difficulty:t.d,meta:{n:s,d:n,whole:r}}};const Yc={add_20:"fetch",sub_20:"fetch",missing_addend:"fetch",add_100:"fetch",sub_100:"fetch",tables_a:"fetch",tables_b:"fetch",tables_c:"fetch",tables_mix:"fetch",mult_2digit:"fetch",div_facts:"fetch",share:"share",div_remainder:"share",missing_factor:"fetch",frac_magnitude:"numberline",frac_compare:"fetch",frac_equiv:"fetch",frac_of_n:"fetch"},_v={add_20:["fetch"],sub_20:["fetch"],missing_addend:["fetch"],add_100:["fetch"],sub_100:["fetch"],tables_a:["fetch","array"],tables_b:["fetch","array"],tables_c:["fetch","array"],tables_mix:["fetch","array"],mult_2digit:["fetch"],div_facts:["fetch","share"],share:["share","fetch"],div_remainder:["share","fetch"],missing_factor:["fetch","share"],frac_magnitude:["numberline"],frac_compare:["fetch"],frac_equiv:["fetch"],frac_of_n:["fetch"]};function vv(i,e,t,n){const s=_v[i];if(t)return s.includes(t)?t:Yc[i];const r=Yc[i],{world:a}=xn[i];if(e.n>=Wo&&r==="fetch"){if(a==="garden"&&s.includes("array")&&n.chance(.35))return"array";if(a==="stump"&&s.includes("share")&&n.chance(.35))return"share"}return r}function jc(i,e){const t=Ns[e];for(const n of t)if(!Bs(i.skills[n]))return n;return t[t.length-1]}function Zc(i,e){for(let t=i.log.length-1;t>=0;t--)if(i.log[t].skill===e)return i.log[t].t;return 0}function xv(i){const e=Object.keys(xn).filter(t=>i.skills[t].n>0);return e.length?(e.sort((t,n)=>{const s=i.skills[t].r-i.skills[n].r;return Math.abs(s)>1?s:Zc(i,t)-Zc(i,n)}),e[0]):null}function bv(i,e){let t=i.r-hv;if(i.n<Wo){t-=(Wo-i.n)*25;let n=0;for(let s=i.hist.length-1;s>=0&&i.hist[s]===1;s--)n++;t+=n*45}return t+(e.float()-.5)*80}function yv(i,e=2){const t=[];for(let n=i.log.length-1;n>=0&&t.length<e;n--){const s=i.log[n];s.skill==="frac_magnitude"&&s.item&&Number.isFinite(s.value)&&t.push(s)}return t}function Qc(i,e,t){const n=`${i.meta.n}/${i.meta.d}`;let s=0;return e[0]?.item===n?s+=12:e.some(r=>r.item===n)&&(s+=7),e.some(r=>Math.abs(r.value-i.answer)<1e-9)&&(s+=6),t.n>0&&t.n<4&&i.meta.d===2&&(s+=3),s}function Mv(i,e,t,n,s,r,a){const o=yv(e);if(!o.length)return i;let l=i,c=Qc(l,o,a);for(let h=0;h<12&&c>0;h++){const d=vt.frac_magnitude(n,t,s,r),u=Qc(d,o,a);u<c&&(l=d,c=u)}return l}function Ki(i,e={}){const t=e.rng??new rs(Math.random()*4294967296>>>0);let n;if(e.skill&&xn[e.skill])n=e.skill;else if(e.echo)n=xv(i)??jc(i,e.world??t.pick(Rs));else{const h=e.world&&Rs.includes(e.world)?e.world:t.pick(Rs),d=jc(i,h),u=t.float();if(u<.7)n=d;else if(u<.9)n=Ns[h][xn[d].order-1]??d;else{const f=Object.keys(xn).filter(g=>g!==d&&Bs(i.skills[g]));n=f.length?t.pick(f):d}}const s=i.skills[n],r=pv(s.r),a=vv(n,s,e.kind,t),o=bv(s,t);let l=vt[n](o,t,a,r);return n==="frac_magnitude"&&(l=Mv(l,i,t,o,a,r,s)),{id:`${n}-${Math.floor(t.float()*4294967295).toString(36)}${Math.floor(t.float()*4294967295).toString(36)}`,skillId:n,world:xn[n].world,kind:l.kind,equation:l.equation,prompt:l.prompt,answer:l.answer,accept:l.accept??null,choices:l.choices??null,model:l.model,scaffold:r,difficulty:l.difficulty,explain:l.explain,meta:l.meta}}const Sv=new Set(["tables_a","tables_b","tables_c","tables_mix","div_facts"]),Xo=i=>!!i&&i.ok>=3&&i.lastOk;function wv(i,e,t){if(!Sv.has(e.skillId))return[];const{a:n,b:s}=e.meta??{};if(!n||!s||n>10||s>10)return[];const r=n===s?[`${n}x${s}`]:[`${n}x${s}`,`${s}x${n}`],a=[];for(const o of r){const l=i.facts[o]??(i.facts[o]={n:0,ok:0,lastOk:!1}),c=Xo(l);l.n+=1,t&&(l.ok+=1),l.lastOk=!!t,!c&&Xo(l)&&a.push(o)}return a}function Ev(i,e,t){const n=i.skills[e.skillId],s=Bs(n),r=fv(n.r,e.difficulty),a=n.n<20?32:16,o=t.correct?t.usedHint?.7:1:0,l=a*(o-r);n.r+=l,n.n+=1,n.hist.push(t.correct?1:0),n.hist.length>cv&&n.hist.shift(),i.log.push({t:Date.now(),skill:e.skillId,tag:e.explain?.key??null,item:e.meta?.n!==void 0&&e.meta?.d!==void 0?`${e.meta.n}/${e.meta.d}`:null,value:typeof e.answer=="number"?e.answer:null,ok:!!t.correct,ms:t.ms??0,hint:!!t.usedHint}),i.log.length>Kc&&i.log.splice(0,i.log.length-Kc);const c=wv(i,e,!!t.correct),h=!s&&Bs(n)?e.skillId:null;return{delta:l,rating:n.r,masteredSkill:h,newGems:c}}function oi(i){const e={};for(const s of Rs){const r=Ns[s].map(o=>{const l=i.skills[o];return{id:o,nameKey:xn[o].nameKey,rating:Math.round(l.r),acc10:jh(l.hist),n:l.n,mastered:Bs(l)}}),a=r.reduce((o,l)=>o+(l.mastered?1:uv((l.rating-Ho)/(Yh-Ho),0,1)*Math.min(1,l.n/Vo)),0)/r.length;e[s]={pct:a,skills:r}}const t=Object.keys(i.facts).filter(s=>Xo(i.facts[s])),n=Object.keys(xn).filter(s=>i.skills[s].n>0).sort((s,r)=>i.skills[s].r-i.skills[r].r).slice(0,3);return{worlds:e,gems:{lit:t,total:100},weakest:n}}const Hr="monkeymath.save",Qh=1;let Gn=null,Qi=null;function Jh(i){return{id:"p"+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36),name:i,avatar:{fur:"classic",hat:null,trail:null,pet:null},bananas:0,egg:{points:0,goal:At.eggGoal},pets:[],owned:{hats:[],furs:["classic"],trails:[]},streak:{count:0,lastDay:null,freezes:0,giftDay:null},island:Go(),math:dv(),stats:{chambers:0,correct:0,wrong:0,msPlayed:0,berries:0,days:0},flags:{},created:Date.now()}}function Tv(){return{v:Qh,profiles:[],activeProfile:null,settings:{lang:Av(),sfx:!0,music:!0}}}function Av(){return(navigator.language||"en").toLowerCase().startsWith("nl")?"nl":"en"}function Si(){if(Gn)return Gn;try{const i=localStorage.getItem(Hr);if(i){const e=JSON.parse(i);if(e&&e.v>=1&&Array.isArray(e.profiles))return Gn=Rv(e),Gn}}catch{try{localStorage.setItem("monkeymath.backup",localStorage.getItem(Hr)||"")}catch{}}return Gn=Tv(),Gn}function Rv(i){const e=Jh("x");for(const t of i.profiles){for(const n of Object.keys(e))t[n]===void 0&&(t[n]=structuredClone(e[n]));for(const n of Object.keys(e.stats))t.stats[n]===void 0&&(t.stats[n]=0);for(const n of Object.keys(e.avatar))t.avatar[n]===void 0&&(t.avatar[n]=e.avatar[n])}return i.v=Qh,i}function bt(){Qi||(Qi=setTimeout(()=>{Qi=null;try{localStorage.setItem(Hr,JSON.stringify(Gn))}catch{}},250))}function jn(){Qi&&(clearTimeout(Qi),Qi=null);try{localStorage.setItem(Hr,JSON.stringify(Gn))}catch{}}function In(){return Si().settings}function ed(){return Si().profiles}function Os(){const i=Si();return i.profiles.find(e=>e.id===i.activeProfile)||null}function Cv(i){const e=Si(),t=Jh(i);return e.profiles.push(t),e.activeProfile=t.id,jn(),t}function Pv(i){const e=Si();return e.activeProfile=i,jn(),Os()}function Lv(i){const e=Si();e.profiles=e.profiles.filter(t=>t.id!==i),e.activeProfile===i&&(e.activeProfile=e.profiles[0]?.id||null),jn()}function qo(i=new Date){return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}function Dv(){return qo()}function Fv(i){const e=qo(),t=i.streak;if(t.lastDay===e)return{kind:"same",gift:(t.giftDay!==e,!1)};const n=qo(new Date(Date.now()-864e5));let s;t.lastDay?t.lastDay===n?(t.count+=1,s="extended"):t.freezes>0?(t.freezes-=1,t.count+=1,s="frozen"):(t.count=1,s="reset"):(t.count=1,s="first"),t.lastDay=e,i.stats.days+=1;const r=t.giftDay!==e;return t.giftDay=e,bt(),{kind:s,gift:r}}function Xi(i,e){return i.bananas=Math.max(0,i.bananas+e),bt(),i.bananas}function Jc(i,e){return i.bananas<e?!1:(i.bananas-=e,bt(),!0)}function Ss(i,e){return i.egg||(i.egg={points:0,goal:At.eggGoal}),i.egg.points+=e,bt(),i.egg.points>=i.egg.goal}function Iv(i,e,t=Math.random){const n=e.filter(r=>!i.pets.includes(r.id));if(!n.length)return null;const s=[];for(const r of n){const a=G0[r.rarity]||10;for(let o=0;o<a;o++)s.push(r)}return s[Math.floor(t()*s.length)]}function kv(i,e){const t=Iv(i,e);return i.egg.points=Math.max(0,i.egg.points-i.egg.goal),i.egg.goal=Math.round(i.egg.goal*1.25),t&&(i.pets.push(t.id),i.avatar.pet||(i.avatar.pet=t.id)),bt(),t}function Uv(i,e,t){const n=i.owned[e];n&&!n.includes(t)&&n.push(t),bt()}function $o(i,e,t){i.avatar[e]=t,bt()}const eh={en:{"title.tagline":"Bring the numbers home!","attract.tagline":"The Crab King stole the numbers. Wake the island!","attract.cta":"Start Adventure","attract.prompt":"Tap the island — or press Space!","attract.beat.garden":"Grow gardens","attract.beat.share":"Share coconuts","attract.beat.pets":"Hatch pets","attract.beat.gems":"Light gems","attract.beat.bloom":"Make it bloom","title.play":"Play","title.who":"Who is playing?","title.new_player":"+ New explorer","title.name_prompt":"What is your name?","title.start":"Let's go!","title.parents":"For parents","title.duel":"Duel","ui.back":"Back","ui.close":"Close","ui.done":"Done","ui.yes":"Yes!","ui.no":"Not now","ui.ok":"OK","ui.delete":"Delete","ui.confirm_delete":"Delete this explorer forever?","story.1":"Oh no! The <b>Crab King</b> pinched all the numbers of our island…","story.2":"Without numbers the grove turned <b>gray</b>. We forgot how to plant, share and bake!","story.3":"Will you help bring the numbers home? The island will <b>bloom</b> wherever you do!","hub.welcome":"Welcome back, {name}! 🌴","hub.pick_world":"Where shall we play?","world.tide":"Tide Pools","world.garden":"Banana Garden","world.stump":"Sharing Stump","world.vines":"Vine Heights","hub.gemtree":"Gem Tree","hub.shop":"Shop","hub.pets":"Pets","hub.daily_gift":"Daily gift!","hub.streak_extended":"🔥 Day {n} in a row!","hub.streak_frozen":"❄️ Your streak freeze kept day {n} safe!","hub.streak_reset":"A fresh start — day 1! Pip kept your spot warm. 💛","play.chamber":"Chamber {n} of {total}","play.correct.1":"YES! You did it!","play.correct.2":"Wonderful!","play.correct.3":"You can really see it now!","play.correct.4":"Banana-tastic!","play.echo_door":"A shimmering door appeared… treasure inside! ✨","play.echo_enter":"Peek inside","play.skip":"Onwards!","play.exit_confirm":"Back to the island?","play.crab_yoink":"Yoink! The crab scattered {n} bananas — grab them back!","play.carry_safe":"Crabs nap while you carry a stone. Think calmly!","play.altar_wants":"The altar sparkles… bring it the answer stone! 🗿","q.fetch":"Find the right stone and carry it to the altar!","q.missing":"Which number is hiding?","q.array_both":"Grow a bed with {rows} rows of {cols}!","q.array_rows":"Plant {total} sprouts in {rows} fair rows!","q.array_total":"Grow a bed with exactly {total} sprouts!","q.share":"Share {total} coconuts fairly over {baskets} baskets!","q.share_fetch":"{total} coconuts, {baskets} baskets — how many in each? Fetch that stone!","q.numberline":"Stand where {frac} lives and ring the bell!","q.compare":"Fetch the LARGEST fraction!","q.equiv":"Fetch the fraction that equals {frac}!","q.frac_of":"How much is {frac} of {whole}?","ex.addsub_confuse":"That's {a} + {b}! For {a} × {b} we make <b>{a} rows of {b}</b> — look!","ex.off_by_table":"Sooo close — one row more or less! <b>{a} rows of {b}</b> makes <b>{answer}</b>.","ex.no_carry":"Don't forget to carry the ten! Look: it makes <b>{answer}</b>.","ex.borrow":"Tricky one — we need to borrow a ten. It makes <b>{answer}</b>.","ex.reversed":"Almost! The digits swapped seats. It is <b>{answer}</b>.","ex.whole_number_bias":"Surprise: a bigger bottom number means <b>smaller pieces</b>! Cut in {d}, each piece shrinks.","ex.add_tops_bottoms":"Fraction pieces must be the <b>same size</b> before they add — watch!","ex.remainder_ignored":"Don't forget the leftovers — <b>{remainder} remain</b> after sharing!","ex.near_miss":"Sooo close! Count once more — it's <b>{answer}</b>.","ex.div_fact":"Think backwards: <b>{a} × {b} = {c}</b> — so {c} ÷ {a} = <b>{b}</b>!","ex.missing_factor":"How many rows of {b} make {c}? <b>{a} rows</b> — because {a} × {b} = {c}!","ex.equiv":"Same amount, different pieces! <b>{n}/{d}</b> covers exactly the same space.","ex.magnitude":"Think: is <b>{n}/{d}</b> closer to 0, a half, or 1?","ex.magnitude_low":"A little further! <b>{n}/{d}</b> is more than where you stood.","ex.magnitude_high":"A step back! <b>{n}/{d}</b> is less than where you stood.","ex.unfair_share":"Fair sharing: every basket gets the <b>same</b>. Tap the stump (or press X) to take one back!","ex.share_more":"The pile still has enough for another round — keep sharing!","ex.array_shape":"Right amount! But we need <b>{rows} rows</b> — walk to reshape the bed.","ex.array_count":"Your bed holds <b>{value}</b>. We need <b>{total}</b> — walk to make it bigger or smaller!","ex.generic":"Look at the picture — it shows the secret!","hint.look":"Watch the picture — then try again. You can do this! 💪","hint.pinch":"✌️ Pinch to zoom · drag with two fingers to look around","verb.array_plant":"walk onto the soil — 🌱 plants the first corner","verb.array_stretch":"press 🌱 when the size is right · 🌱 on the flag takes it back","verb.array_offsoil":"beds only grow on the soil — hop back on!","verb.array_need_soil":"Stand on the brown soil first!","verb.array_unplant":"Flag picked up — plant it anywhere!","verb.share_sub":"tap a basket to share · tap the stump to take back","helper.turtle":"Tuk the Turtle","helper.bunny":"Pip the Bunny","helper.duckling":"Dot the Duckling","helper.owl":"Olli the Owl","helper.fetch":"Work it out first, then carry the answer stone to the ✨ altar! Picked the wrong one? Walk onto another stone to swap, or press ⬇️ to set it down. Crabs nap while you carry — and pots hide surprises!","helper.array":"Stand on the soil and press 🌱 to plant a flag. Then walk — the bed stretches with you! Press 🌱 again when the size is right. Changed your mind? Press 🌱 on the flag to pick it back up.","helper.numberline":"The ▲ marks chop the vine into equal hops! Walk to where your fraction lives and ring the 🔔.","helper.share":"Tap a basket to drop a coconut in — every basket must get the same! Then press ✅. Took one too many? Tap the stump!","helper.cheer.1":"You can do this! 🌟","helper.cheer.2":"Mistakes are how we learn — just try something!","helper.cheer.3":"Take your time. Count nice and slow!","helper.cheer.4":"Stuck? Press 💡 and I will show you a picture!","skill.add_20":"Adding to 20","skill.sub_20":"Taking away to 20","skill.missing_addend":"Mystery numbers (+)","skill.add_100":"Adding to 100","skill.sub_100":"Taking away to 100","skill.tables_a":"Tables of 2, 5, 10","skill.tables_b":"Tables of 3, 4, 6","skill.tables_c":"Tables of 7, 8, 9","skill.tables_mix":"All tables mixed","skill.mult_2digit":"Big multiplying","skill.div_facts":"Sharing facts","skill.share":"Fair sharing","skill.div_remainder":"Sharing with leftovers","skill.missing_factor":"Mystery numbers (×)","skill.frac_magnitude":"Where fractions live","skill.frac_compare":"Comparing fractions","skill.frac_equiv":"Twin fractions","skill.frac_of_n":"A fraction of a number","result.title":"Chamber complete!","result.next":"Next chamber","result.home":"To the island","result.gem":"New gem: {fact}!","result.gem_twin":"{fact} lights its twin {twin} too! ✨","result.mastered":"You can really SEE {skill} now! 🌟","result.bloomed":"{world} is blooming! 🌸","result.tap_chest":"Tap the chest!","egg.progress":"The egg wiggles…","egg.ready":"The egg is ready to hatch!","egg.hatch":"Tap tap tap…","egg.hatched":"{pet} hatched! 🎉","egg.all_pets":"Pip is amazed — you befriended every pet!","pets.title":"Your pets","pets.follow":"Following you","pets.choose":"Tap a pet to bring it along","pet.bunny":"Bunny","pet.duckling":"Duckling","pet.kitten":"Kitten","pet.piglet":"Piglet","pet.redpanda":"Red Panda","pet.turtle":"Turtle","pet.owl":"Owl","pet.dragon":"Mini Dragon","rarity.common":"Common","rarity.rare":"Rare","rarity.epic":"Epic","rarity.legendary":"Legendary","gems.title":"The Banyan Gem Tree","gems.sub":"Every table you master becomes a gem. Twins light together!","gems.count":"{n} of {total} gems shine","gems.skills":"Your powers","shop.title":"Coco’s Shop","shop.hats":"Hats","shop.furs":"Fur colors","shop.trails":"Trails","shop.buy":"Buy","shop.equip":"Wear","shop.equipped":"Wearing","shop.too_pricey":"Not enough bananas yet — play to earn more!","shop.freeze":"Streak freeze","shop.freeze_desc":"Keeps your flame safe if you skip a day","hat.cap":"Cap","hat.bow":"Bow","hat.crown":"Crown","hat.flowercrown":"Flower crown","hat.beanie":"Beanie","hat.wizard":"Wizard hat","hat.pirate":"Pirate hat","hat.party":"Party hat","fur.classic":"Classic","fur.golden":"Golden","fur.snow":"Snow","fur.pink":"Pink","fur.lavender":"Lavender","fur.mint":"Mint","fur.midnight":"Midnight","fur.sunset":"Sunset","trail.sparkle":"Sparkles","trail.petal":"Petals","trail.bubble":"Bubbles","trail.star":"Stars","mimi.meet":"I'm <b>Mimi</b>! I dream up blueprints for our island — bring numbers home and I'll have ideas to build. Tap me whenever you want to chat! 🌺","mimi.build_ready":"You saved enough bananas for the <b>{name}</b>! Come to my worktable! 📜","mimi.need_bananas":"Only <b>{n}</b> 🍌 to go for the <b>{name}</b> — the chambers are full of bananas!","mimi.almost_blueprint":"My next blueprint idea is sooo close… a few more numbers from <b>{world}</b> should do it! ✨","mimi.world_hint":"<b>{world}</b> still looks a little sleepy and gray. Shall we bring its numbers home?","mimi.egg_soon":"Your egg is wiggling! About <b>{n}</b> more right answers and it hatches! 🥚","mimi.streak":"Day {n} in a row — the whole grove is cheering for you! 🔥","mimi.festival":"The grove has never felt this alive. And it’s all thanks to you! 🎆","mimi.chat.1":"I love watching the butterflies come back. The more the island blooms, the more friends arrive! 🦋","mimi.chat.2":"Did you know the Gem Tree remembers every fact you master? Tap it sometime! 💎","mimi.chat.3":"Pip says hi from the egg nest! The pets adore you, you know. 💛","island.title":"Mimi's worktable","island.sub":"Bring numbers home and Mimi dreams up blueprints. Bananas pay the materials — what shall we build?","island.progress":"{n} of {total} built","island.locked_name":"A future dream…","island.locked_hint":"Keep bringing numbers home — new blueprint ideas will come to Mimi!","island.new_blueprint":"📜 New blueprint: {name}!","island.mimi_worktable":"Come see my worktable — I have blueprints! 📜","island.built_say":"It’s wonderful! The grove feels a little more alive. 🌸","island.daily_fruit":"🦊 Rin saved you {n} bananas from the fruit stand!","island.daily_bread":"🐷 Mo baked banana bread — the egg loves it!","island.crab_pays":"🦀 The Crab King opens his hoard and pays {n} bananas!","portal.stage1":"🌱 A little vine sprouts on the {name} gate!","portal.stage2":"🌿 Vines are climbing the {name} gate!","portal.stage3":"🌺 The {name} gate is blooming!","portal.stage4":"✨ The {name} gate is in full bloom!","build.lanterns":"Lantern path","build.lanterns_desc":"Warm lights for the village square.","build.fruitstand":"Fruit stand","build.fruitstand_desc":"Rin the Red Panda moves in — she saves you bananas every day!","build.garden":"Flower garden","build.garden_desc":"Blossoms and butterflies near Vine Heights.","build.stage":"Music stage","build.stage_desc":"Kiki the Kitten moves in — tap the gong for a tune!","build.bakery":"Bakery","build.bakery_desc":"Mo the Piglet moves in — daily banana bread feeds your egg!","build.bridge":"Bridge to the islet","build.bridge_desc":"Cross the water to the little island in the east.","build.plaza":"Festival plaza","build.plaza_desc":"The grand finale — a feast for the whole grove!","npc.fruitstand":"Rin the Red Panda","npc.stage":"Kiki the Kitten","npc.bakery":"Mo the Piglet","npc.crabking":"The Crab King","npc.fruitstand.hello":"A real fruit stand! I’ll set some bananas aside for you every day. 🍌","npc.fruitstand.1":"Fresh fruit, fair prices — I count every banana twice!","npc.fruitstand.2":"Come back tomorrow — I’ll have saved something for you!","npc.stage.hello":"A stage! Finally a place for my songs. Ring the gong with me!","npc.stage.1":"Every right answer sounds like music to me! 🎵","npc.stage.2":"Shall we make some noise? Tap the gong!","npc.bakery.hello":"The oven is warm! Banana bread every day — your egg will love it. 🥖","npc.bakery.1":"Baking is just fair sharing… of deliciousness!","npc.bakery.2":"Half a recipe? That’s fractions, friend!","npc.crabking.1":"I only pinched the numbers because I couldn’t count them… sorry!","npc.crabking.2":"This is the best festival the grove has ever seen. 🎪","finale.1":"Wait!! Before you build the plaza… I, the <b>Crab King</b>, have something to say.","finale.2":"I pinched the numbers because I couldn’t count — and I was too shy to ask for help…","finale.3":"But you! You brought them all home. Please, take my hoard — <b>I’m paying half the plaza!</b>","finale.4":"Then let’s build it TOGETHER — the whole grove is invited! 🎉","finale.festival":"🎆 The grove is whole again — festival time! You did this, {name}!","parents.title":"For parents","parents.body":"Monkey Grove practices arithmetic the way research says children learn it: visual models first (arrays, number lines, fair sharing), no time pressure, no punishment for mistakes — every error shows the model and explains why. An invisible rating system keeps each skill at roughly 65% success: challenging, never crushing.","parents.skills":"Skill overview","parents.accuracy":"Recent accuracy","parents.attempts":"{n} attempts","parents.mastered":"mastered","settings.title":"Settings","settings.lang":"Language","settings.sfx":"Sounds","settings.music":"Music","settings.switch_player":"Switch explorer","duel.title":"Banana Duel","duel.sub":"Two explorers, same chambers — who gathers more bananas?","duel.pick2":"Choose two explorers","duel.turn":"{name}, your turn!","duel.pass":"Pass the device to {name}","duel.round":"Round {n} of {total}","duel.winner":"🏆 {name} wins with {score} bananas!","duel.tie":"It's a tie — the monkeys share the bananas!","duel.code":"Challenge code","duel.code_desc":"Send this code to a friend — they play the same chambers!","duel.enter_code":"Enter a challenge code","duel.play_code":"Play challenge"},nl:{"title.tagline":"Breng de getallen thuis!","attract.tagline":"De Krabbenkoning stal de getallen. Maak het eiland wakker!","attract.cta":"Start avontuur","attract.prompt":"Tik op het eiland — of druk op spatie!","attract.beat.garden":"Laat tuinen groeien","attract.beat.share":"Deel kokosnoten","attract.beat.pets":"Broed dieren uit","attract.beat.gems":"Laat edelstenen stralen","attract.beat.bloom":"Laat alles bloeien","title.play":"Spelen","title.who":"Wie gaat er spelen?","title.new_player":"+ Nieuwe ontdekker","title.name_prompt":"Hoe heet je?","title.start":"We gaan!","title.parents":"Voor ouders","title.duel":"Duel","ui.back":"Terug","ui.close":"Sluiten","ui.done":"Klaar","ui.yes":"Ja!","ui.no":"Nu even niet","ui.ok":"OK","ui.delete":"Verwijderen","ui.confirm_delete":"Deze ontdekker voorgoed verwijderen?","story.1":"O nee! De <b>Krabbenkoning</b> heeft alle getallen van ons eiland gejat…","story.2":"Zonder getallen werd het bos <b>grijs</b>. We weten niet meer hoe je plant, deelt en bakt!","story.3":"Help jij de getallen thuisbrengen? Het eiland gaat <b>bloeien</b> waar jij dat doet!","hub.welcome":"Welkom terug, {name}! 🌴","hub.pick_world":"Waar gaan we spelen?","world.tide":"Getijdenpoel","world.garden":"Bananentuin","world.stump":"Deelstronk","world.vines":"Lianenhoogte","hub.gemtree":"Edelsteenboom","hub.shop":"Winkel","hub.pets":"Huisdieren","hub.daily_gift":"Dagcadeautje!","hub.streak_extended":"🔥 Dag {n} op rij!","hub.streak_frozen":"❄️ Je vlam-bevriezer hield dag {n} veilig!","hub.streak_reset":"Een frisse start — dag 1! Pip hield je plekje warm. 💛","play.chamber":"Kamer {n} van {total}","play.correct.1":"JA! Gelukt!","play.correct.2":"Geweldig!","play.correct.3":"Nu zie je het écht!","play.correct.4":"Bananen-tastisch!","play.echo_door":"Er verscheen een glinsterende deur… met schatten! ✨","play.echo_enter":"Kijk binnen","play.skip":"Verder!","play.exit_confirm":"Terug naar het eiland?","play.crab_yoink":"Hebbes! De krab strooide {n} bananen rond — pak ze terug!","play.carry_safe":"Krabben doen een dutje terwijl jij een steen draagt. Denk rustig na!","play.altar_wants":"Het altaar fonkelt… breng de antwoordsteen! 🗿","q.fetch":"Zoek de juiste steen en breng hem naar het altaar!","q.missing":"Welk getal verstopt zich?","q.array_both":"Maak een bedje met {rows} rijen van {cols}!","q.array_rows":"Plant {total} plantjes in {rows} eerlijke rijen!","q.array_total":"Maak een bedje met precies {total} plantjes!","q.share":"Verdeel {total} kokosnoten eerlijk over {baskets} mandjes!","q.share_fetch":"{total} kokosnoten, {baskets} mandjes — hoeveel in elk mandje? Haal die steen!","q.numberline":"Ga staan waar {frac} woont en luid de bel!","q.compare":"Haal de GROOTSTE breuk!","q.equiv":"Haal de breuk die gelijk is aan {frac}!","q.frac_of":"Hoeveel is {frac} van {whole}?","ex.addsub_confuse":"Dat is {a} + {b}! Voor {a} × {b} maken we <b>{a} rijen van {b}</b> — kijk!","ex.off_by_table":"Bíjna — één rij te veel of te weinig! <b>{a} rijen van {b}</b> is <b>{answer}</b>.","ex.no_carry":"Vergeet de tien niet te onthouden! Kijk: het wordt <b>{answer}</b>.","ex.borrow":"Een lastige! We moeten een tien inwisselen. Het wordt <b>{answer}</b>.","ex.reversed":"Bijna! De cijfers wisselden van plek. Het is <b>{answer}</b>.","ex.whole_number_bias":"Verrassing: een groter getal onder de streep betekent <b>kleinere stukjes</b>! Hoe meer stukjes je snijdt, hoe kleiner elk stukje wordt.","ex.add_tops_bottoms":"Breukstukjes moeten eerst <b>even groot</b> zijn voor je ze optelt — kijk!","ex.remainder_ignored":"Vergeet de restjes niet — er blijven er <b>{remainder} over</b>!","ex.near_miss":"Zóóó dichtbij! Tel nog één keer — het is <b>{answer}</b>.","ex.div_fact":"Denk terug: <b>{a} × {b} = {c}</b> — dus {c} ÷ {a} = <b>{b}</b>!","ex.missing_factor":"Hoeveel rijen van {b} maken {c}? <b>{a} rijen</b> — want {a} × {b} = {c}!","ex.equiv":"Evenveel, andere stukjes! <b>{n}/{d}</b> bedekt precies hetzelfde.","ex.magnitude":"Denk: ligt <b>{n}/{d}</b> dichter bij 0, een half, of 1?","ex.magnitude_low":"Nog een stukje verder! <b>{n}/{d}</b> is méér dan waar je stond.","ex.magnitude_high":"Stapje terug! <b>{n}/{d}</b> is mínder dan waar je stond.","ex.unfair_share":"Eerlijk delen: elk mandje krijgt <b>evenveel</b>. Tik op de stronk (of druk op X) om er één terug te pakken!","ex.share_more":"De stapel heeft nog genoeg voor een rondje — deel maar verder!","ex.array_shape":"Goede hoeveelheid! Maar we willen <b>{rows} rijen</b> — loop om het bedje om te bouwen.","ex.array_count":"Je bedje heeft er <b>{value}</b>. We willen <b>{total}</b> — loop om het groter of kleiner te maken!","ex.generic":"Kijk naar het plaatje — daar zit het geheim!","hint.look":"Kijk goed naar het plaatje — en probeer opnieuw. Jij kan dit! 💪","hint.pinch":"✌️ Knijp om te zoomen · sleep met twee vingers om rond te kijken","verb.array_plant":"loop de aarde op — 🌱 plant het eerste hoekje","verb.array_stretch":"druk op 🌱 als de maat klopt · 🌱 op het vlaggetje pakt het terug","verb.array_offsoil":"bedjes groeien alleen op aarde — spring er weer op!","verb.array_need_soil":"Ga eerst op de bruine aarde staan!","verb.array_unplant":"Vlaggetje opgepakt — plant het waar je wilt!","verb.share_sub":"tik op een mandje om te delen · tik op de stronk om terug te pakken","helper.turtle":"Tuk de Schildpad","helper.bunny":"Pip het Konijntje","helper.duckling":"Dot het Eendje","helper.owl":"Olli de Uil","helper.fetch":"Reken eerst uit, en draag dan de juiste steen naar het ✨ altaar! Verkeerde steen? Loop naar een andere steen om te ruilen, of druk op ⬇️ om hem neer te zetten. Krabben slapen zolang je draagt — en in potten zitten verrassingen!","helper.array":"Ga op de aarde staan en druk op 🌱 om een vlaggetje te planten. Loop dan — het bedje rekt met je mee! Klopt de maat? Druk nog eens op 🌱. Bedacht? Druk op 🌱 op het vlaggetje en je pakt het terug.","helper.numberline":"De ▲-streepjes hakken de liaan in gelijke stukjes! Loop naar waar jouw breuk woont en luid de 🔔.","helper.share":"Tik op een mandje om er een kokosnoot in te doen — elk mandje evenveel! Druk daarna op ✅. Eentje te veel? Tik op de stronk!","helper.cheer.1":"Jij kan dit! 🌟","helper.cheer.2":"Van foutjes leer je — probeer gewoon iets!","helper.cheer.3":"Neem de tijd. Tel maar rustig!","helper.cheer.4":"Kom je er niet uit? Druk op 💡 en ik laat een plaatje zien!","skill.add_20":"Plussommen tot 20","skill.sub_20":"Minsommen tot 20","skill.missing_addend":"Geheime getallen (+)","skill.add_100":"Plussommen tot 100","skill.sub_100":"Minsommen tot 100","skill.tables_a":"Tafels van 2, 5, 10","skill.tables_b":"Tafels van 3, 4, 6","skill.tables_c":"Tafels van 7, 8, 9","skill.tables_mix":"Alle tafels door elkaar","skill.mult_2digit":"Groot vermenigvuldigen","skill.div_facts":"Deelsommen","skill.share":"Eerlijk delen","skill.div_remainder":"Delen met rest","skill.missing_factor":"Geheime getallen (×)","skill.frac_magnitude":"Waar breuken wonen","skill.frac_compare":"Breuken vergelijken","skill.frac_equiv":"Tweelingbreuken","skill.frac_of_n":"Een breuk van een getal","result.title":"Kamer gehaald!","result.next":"Volgende kamer","result.home":"Naar het eiland","result.gem":"Nieuwe edelsteen: {fact}!","result.gem_twin":"{fact} laat ook zijn tweeling {twin} stralen! ✨","result.mastered":"Je ZIET {skill} nu echt! 🌟","result.bloomed":"{world} staat in bloei! 🌸","result.tap_chest":"Tik op de schatkist!","egg.progress":"Het ei wiebelt…","egg.ready":"Het ei kan uitkomen!","egg.hatch":"Tik tik tik…","egg.hatched":"{pet} is uit het ei gekomen! 🎉","egg.all_pets":"Pip is verbaasd — je bent vriendjes met álle dieren!","pets.title":"Jouw huisdieren","pets.follow":"Loopt met je mee","pets.choose":"Tik op een dier om het mee te nemen","pet.bunny":"Konijntje","pet.duckling":"Eendje","pet.kitten":"Poesje","pet.piglet":"Biggetje","pet.redpanda":"Rode panda","pet.turtle":"Schildpadje","pet.owl":"Uiltje","pet.dragon":"Minidraakje","rarity.common":"Gewoon","rarity.rare":"Zeldzaam","rarity.epic":"Episch","rarity.legendary":"Legendarisch","gems.title":"De Banyan Edelsteenboom","gems.sub":"Elke tafelsom die je kent wordt een edelsteen. Tweelingen stralen samen!","gems.count":"{n} van de {total} edelstenen stralen","gems.skills":"Jouw krachten","shop.title":"De winkel van Coco","shop.hats":"Hoedjes","shop.furs":"Vachtkleuren","shop.trails":"Sporen","shop.buy":"Kopen","shop.equip":"Dragen","shop.equipped":"Draag je","shop.too_pricey":"Nog niet genoeg bananen — speel om meer te verdienen!","shop.freeze":"Vlam-bevriezer","shop.freeze_desc":"Houdt je vlam veilig als je een dagje overslaat","hat.cap":"Petje","hat.bow":"Strikje","hat.crown":"Kroontje","hat.flowercrown":"Bloemenkrans","hat.beanie":"Mutsje","hat.wizard":"Tovenaarshoed","hat.pirate":"Piratenhoed","hat.party":"Feesthoedje","fur.classic":"Klassiek","fur.golden":"Goud","fur.snow":"Sneeuw","fur.pink":"Roze","fur.lavender":"Lavendel","fur.mint":"Mint","fur.midnight":"Middernacht","fur.sunset":"Zonsondergang","trail.sparkle":"Glitters","trail.petal":"Blaadjes","trail.bubble":"Belletjes","trail.star":"Sterretjes","mimi.meet":"Ik ben <b>Mimi</b>! Ik bedenk bouwplannen voor ons eiland — breng getallen thuis en ik krijg ideeën. Tik me aan als je wilt kletsen! 🌺","mimi.build_ready":"Je hebt genoeg bananen voor het <b>{name}</b>! Kom naar mijn werktafel! 📜","mimi.need_bananas":"Nog maar <b>{n}</b> 🍌 voor het <b>{name}</b> — de kamers liggen vol bananen!","mimi.almost_blueprint":"Mijn volgende bouwidee is zóóó dichtbij… nog een paar getallen uit <b>{world}</b> en het lukt! ✨","mimi.world_hint":"<b>{world}</b> ziet er nog wat slaperig en grijs uit. Zullen we daar getallen thuisbrengen?","mimi.egg_soon":"Je ei wiebelt! Nog ongeveer <b>{n}</b> goede antwoorden en het komt uit! 🥚","mimi.streak":"Dag {n} op rij — het hele bos juicht voor je! 🔥","mimi.festival":"Het bos heeft nog nooit zó geleefd. En dat komt allemaal door jou! 🎆","mimi.chat.1":"Ik kijk zo graag naar de vlinders die terugkomen. Hoe meer het eiland bloeit, hoe meer vriendjes er komen! 🦋","mimi.chat.2":"Wist je dat de Edelsteenboom elke som onthoudt die je kent? Tik er maar eens op! 💎","mimi.chat.3":"Pip doet de groetjes vanaf het nest! De huisdieren zijn dol op je. 💛","island.title":"De werktafel van Mimi","island.sub":"Breng getallen thuis en Mimi bedenkt bouwplannen. Bananen betalen het materiaal — wat bouwen we?","island.progress":"{n} van {total} gebouwd","island.locked_name":"Een toekomstdroom…","island.locked_hint":"Breng meer getallen thuis — dan krijgt Mimi nieuwe bouwideeën!","island.new_blueprint":"📜 Nieuw bouwplan: {name}!","island.mimi_worktable":"Kom naar mijn werktafel — ik heb bouwplannen! 📜","island.built_say":"Wat prachtig! Het bos voelt weer een beetje levendiger. 🌸","island.daily_fruit":"🦊 Rin heeft {n} bananen voor je bewaard bij het kraampje!","island.daily_bread":"🐷 Mo bakte bananenbrood — het ei smult ervan!","island.crab_pays":"🦀 De Krabbenkoning opent zijn schat en betaalt {n} bananen!","portal.stage1":"🌱 Er ontkiemt een rankje op de poort van {name}!","portal.stage2":"🌿 Ranken klimmen langs de poort van {name}!","portal.stage3":"🌺 De poort van {name} staat in bloei!","portal.stage4":"✨ De poort van {name} is in volle bloei!","build.lanterns":"Lantaarnpad","build.lanterns_desc":"Warme lichtjes voor het dorpsplein.","build.fruitstand":"Fruitkraampje","build.fruitstand_desc":"Rin de Rode Panda komt wonen — ze bewaart elke dag bananen voor je!","build.garden":"Bloementuin","build.garden_desc":"Bloesem en vlinders bij de Lianenhoogte.","build.stage":"Muziekpodium","build.stage_desc":"Kiki het Poesje komt wonen — tik op de gong voor een liedje!","build.bakery":"Bakkerij","build.bakery_desc":"Mo het Biggetje komt wonen — dagelijks bananenbrood voor je ei!","build.bridge":"Brug naar het eilandje","build.bridge_desc":"Steek het water over naar het eilandje in het oosten.","build.plaza":"Feestplein","build.plaza_desc":"De grote finale — een feest voor het hele bos!","npc.fruitstand":"Rin de Rode Panda","npc.stage":"Kiki het Poesje","npc.bakery":"Mo het Biggetje","npc.crabking":"De Krabbenkoning","npc.fruitstand.hello":"Een echt fruitkraampje! Ik bewaar elke dag wat bananen voor je. 🍌","npc.fruitstand.1":"Vers fruit, eerlijke prijzen — ik tel elke banaan twee keer!","npc.fruitstand.2":"Kom morgen terug — dan heb ik weer iets voor je bewaard!","npc.stage.hello":"Een podium! Eindelijk een plek voor mijn liedjes. Luid de gong met me mee!","npc.stage.1":"Elk goed antwoord klinkt voor mij als muziek! 🎵","npc.stage.2":"Zullen we herrie maken? Tik op de gong!","npc.bakery.hello":"De oven is warm! Elke dag bananenbrood — je ei zal smullen. 🥖","npc.bakery.1":"Bakken is gewoon eerlijk delen… van lekkers!","npc.bakery.2":"Een half recept? Dat zijn breuken, vriend!","npc.crabking.1":"Ik jatte de getallen alleen omdat ik niet kon tellen… sorry!","npc.crabking.2":"Dit is het mooiste feest dat het bos ooit heeft gezien. 🎪","finale.1":"Wacht!! Voor je het plein bouwt… moet ik, de <b>Krabbenkoning</b>, iets zeggen.","finale.2":"Ik jatte de getallen omdat ik niet kon tellen — en ik durfde geen hulp te vragen…","finale.3":"Maar jij! Jij bracht ze allemaal thuis. Hier, neem mijn schat — <b>ik betaal de helft van het plein!</b>","finale.4":"Dan bouwen we het SAMEN — het hele bos is uitgenodigd! 🎉","finale.festival":"🎆 Het bos is weer heel — feest! Dit heb jij gedaan, {name}!","parents.title":"Voor ouders","parents.body":"Monkey Grove oefent rekenen zoals onderzoek zegt dat kinderen leren: eerst visuele modellen (rijtjes, getallenlijnen, eerlijk delen), geen tijdsdruk, geen straf voor fouten — elke fout laat het model zien en legt uit waarom. Een onzichtbaar systeem houdt elke vaardigheid op ongeveer 65% succes: uitdagend, nooit ontmoedigend.","parents.skills":"Vaardigheden","parents.accuracy":"Recente nauwkeurigheid","parents.attempts":"{n} pogingen","parents.mastered":"beheerst","settings.title":"Instellingen","settings.lang":"Taal","settings.sfx":"Geluiden","settings.music":"Muziek","settings.switch_player":"Andere ontdekker","duel.title":"Bananenduel","duel.sub":"Twee ontdekkers, dezelfde kamers — wie verzamelt meer bananen?","duel.pick2":"Kies twee ontdekkers","duel.turn":"{name}, jouw beurt!","duel.pass":"Geef het apparaat aan {name}","duel.round":"Ronde {n} van {total}","duel.winner":"🏆 {name} wint met {score} bananen!","duel.tie":"Gelijkspel — de aapjes delen de bananen!","duel.code":"Uitdaagcode","duel.code_desc":"Stuur deze code naar een vriendje — die speelt precies dezelfde kamers!","duel.enter_code":"Voer een uitdaagcode in","duel.play_code":"Speel uitdaging"}};function z(i,e=null){const t=In().lang||"en";let n=eh[t]?.[i]??eh.en[i]??i;return e&&(n=n.replace(/\{(\w+)\}/g,(s,r)=>e[r]!==void 0?String(e[r]):s)),n}function Nv(){const i=1+Math.floor(Math.random()*4);return z(`play.correct.${i}`)}function Ml(i){In().lang=i}const za={arrayRows:8,arrayCols:10,baskets:6};function Mr(i,e,t={}){let n=i;if(n.kind==="array"){const s=n.model.params,r=(a,o)=>a<=za.arrayRows&&o<=za.arrayCols;if(!r(s.rows,s.cols))if(s.given!=="rows"&&r(s.cols,s.rows)){const a=s.rows;s.rows=s.cols,s.cols=a,n.prompt?.vars&&(n.prompt.vars.rows=s.rows,n.prompt.vars.cols=s.cols)}else n=Ki(e,{...t,skill:n.skillId,kind:"fetch"})}else n.kind==="share"&&n.model.params.baskets>za.baskets&&(n=Ki(e,{...t,skill:n.skillId,kind:"fetch"}));if(n.world==="tide"&&(!n.model||n.model.kind==="none")){const s=n.meta||{},r=n.equation.includes("−")?"−":"+",a=s.a,o=s.b!==void 0?s.b:s.c!==void 0?s.c-s.a:void 0;a!==void 0&&o!==void 0&&(n.model={kind:"strip",params:{a,b:Math.abs(o),op:r}})}return n}const Bv="PAspcDdoBmVMTON tguy lfehkbj".replace(/ /g,""),Ov={".":0,",":0,1:1,2:2};function zv(i,e){let t=i.slice();e.chance(.5)&&(t=t.map(d=>d.split("").reverse().join(""))),e.chance(.5)&&(t=t.slice().reverse());const n=t.map(d=>d.split("")),s=n.length,r=n[0].length,a=d=>d==="."||d===",",o=[],l=[];for(let d=1;d<s-1;d++)for(let u=1;u<r-1;u++){if(n[d][u]!==".")continue;let f=0,g=0;for(let v=-1;v<=1;v++)for(let m=-1;m<=1;m++){const p=n[d+v][u+m];p==="#"?f++:a(p)||g++}g>0||(f>0?l:o).push({x:u,z:d})}const c=[],h=(d,u,f)=>{for(const g of e.shuffle(d)){if(u<=0)break;c.every(v=>Math.abs(v.x-g.x)+Math.abs(v.z-g.z)>=3)&&(c.push(g),n[g.z][g.x]=f,u--)}};return h(l,e.int(2,4),"1"),h(o,e.int(1,3),"d"),h(o,e.int(2,5),","),n.map(d=>d.join(""))}function Gv(i,e,{stones:t=4,pots:n=1}={}){const{w:s,d:r}=i.size,a=i.markers,o=[...a.A||[],...a.P||[],...a.M||[],...a.m||[],...a.B||[],...a.D||[]],l=(u,f,g,v)=>g.every(m=>Math.abs(m.x-u)+Math.abs(m.z-f)>=v),c=[];for(let u=1;u<r-1;u++)for(let f=1;f<s-1;f++){const g=i.cellAt(f,u);!g||!g.walk||g.h!==0||!".,".includes(g.ch)||l(f,u,o,2)&&c.push({x:f,z:u})}let h=t+n;const d=[];for(const u of e.shuffle(c)){if(h<=0)break;if(!l(u.x,u.z,[...d,...a.s||[],...a.p||[]],2))continue;d.push(u),h--;const f=d.length<=t?"s":"p";(a[f]=a[f]||[]).push(u),i.cellAt(u.x,u.z).ch=f}}function Hv(i){const e=i.length,t=i[0].length,n=[],s={};for(let r=0;r<e;r++){n.push([]);for(let a=0;a<t;a++){const o=i[r][a]||"#";if(o==="#"){n[r].push(null);continue}const c={h:Ov[o]??0,walk:!0,ch:o,alt:o===","};n[r].push(c),Bv.includes(o)&&(s[o]=s[o]||[]).push({x:a,z:r})}}return{w:t,d:e,cells:n,markers:s}}class td{constructor(e,t="hub"){this.world=e,this.theme=t,this.group=new en,this.entities=[],this.size={w:0,d:0},this.cells=[],this.markers={},e.scene.add(this.group)}worldPos(e,t,n=0){const s=this.cellAt(e,t),r=s?s.h:0;return new D((e-this.size.w/2+.5)*Ut,r*Nc+n,(t-this.size.d/2+.5)*Ut)}cellAt(e,t){return e<0||t<0||t>=this.size.d||e>=this.size.w?null:this.cells[t]?.[e]||null}canWalk(e,t){return!e||!t?!1:Math.abs(t.h-e.h)<=1&&t.walk!==!1}center(){return new D(0,0,0)}buildFrom(e,t={}){const{w:n,d:s,cells:r,markers:a}=Hv(e);return this.size={w:n,d:s},this.cells=r,this.markers=a,this._buildFloor(t),this._buildWater(),this._decorate(t),this}_floorColors(e,t,n,s){const r=ko[this.theme]||ko.hub,a=(t+n)%2===0;let o;return e.ch==="o"?o=a?Ot.soil:Ot.soilDark:r.floor==="sand"?o=a?Ot.sand:Ot.sandDark:r.floor==="soil"?o=a?Ot.soil:Ot.soilDark:o=a?Ot.grass:Ot.grassDark,e.h>0&&(o=a?Ot.stone:Ot.sandDark),e.alt&&(o=Ot.sandDark),o}_buildFloor(e){const{w:t,d:n}=this.size,s=[];for(let h=0;h<n;h++)for(let d=0;d<t;d++){const u=this.cells[h][d];!u||u.ch==="V"||s.push({x:d,z:h,c:u})}const r=new Kn(1,1,1),a=new Ts;a._owned=!0;const o=new sc(r,a,s.length),l=new Je,c=new De;s.forEach((h,d)=>{const u=h.c.h*Nc,f=u+.55;l.makeScale(Ut,f,Ut),l.setPosition((h.x-t/2+.5)*Ut,u-f/2,(h.z-n/2+.5)*Ut),o.setMatrixAt(d,l),c.setHex(this._floorColors(h.c,h.x,h.z,e)),o.setColorAt(d,c),h.c.instanceId=d}),o.receiveShadow=!0,o.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),this.floor=o,this.floorList=s,this.group.add(o),this.world.pickables=[o],o.userData.place=this,o.userData.gridList=s;for(const h of this.markers.V||[]){const d=Tt(pt.plank,.15,"prop:plank"),u=this.worldPos(h.x,h.z);d.position.set(u.x,-.06,u.z),this.group.add(d)}if((this.markers.V||[]).length){const h=this.markers.V.slice(),d=new Kn(1,1,1),u=new Xr({color:16777215,transparent:!0,opacity:0,depthWrite:!1});d._owned=!0,u._owned=!0;const f=new sc(d,u,h.length);h.forEach((g,v)=>{const m=this.worldPos(g.x,g.z);l.makeScale(Ut,.16,Ut),l.setPosition(m.x,.02,m.z),f.setMatrixAt(v,l)}),f.instanceMatrix.needsUpdate=!0,f.userData.place=this,f.userData.gridList=h,this.bridgePick=f,this.group.add(f),this.world.pickables.push(f)}}tintCell(e,t,n){const s=this.cellAt(e,t);if(!s||s.instanceId===void 0||!this.floor.instanceColor)return;const r=new De(n);this.floor.setColorAt(s.instanceId,r),this.floor.instanceColor.needsUpdate=!0}resetCellTint(e,t){const n=this.cellAt(e,t);n&&this.tintCell(e,t,this._floorColors(n,e,t,{}))}_buildWater(){const{w:e,d:t}=this.size,n=Math.max(e,t)*3,s=new ls(n,n),r=new Ts({color:Ot.water,transparent:!0,opacity:.92});r._owned=!0;const a=new Lt(s,r);a.rotation.x=-Math.PI/2,a.position.y=-.22,this.group.add(a),this.water=a;const o=new Lt(s,new Ts({color:Ot.waterDeep}));o.material._owned=!0,o.rotation.x=-Math.PI/2,o.position.y=-.55,this.group.add(o)}_decorate(e){const t=new rs(e.seed??1234),n={hub:["palm","flowerPink","flowerYellow","bush","palmSmall","flowerBlue"],tide:["shell","rockA","palmSmall","flowerBlue","rockB"],garden:["bush","flowerYellow","sprout","palmSmall","flowerPink"],stump:["rockA","bush","coconut","rockB","lantern"],vines:["flowerPink","flowerBlue","bush","lantern","flowerYellow"]}[this.theme]||["bush"];for(const s of this.markers.d||[]){const r=t.pick(n),a=pt[r];if(!a)continue;const o=Tt(a,void 0,"prop:"+r),l=.06+t.float()*.015;o.scale.setScalar(l);const c=this.worldPos(s.x,s.z);o.position.copy(c),o.rotation.y=t.float()*Math.PI*2,this.group.add(o);const h=this.cellAt(s.x,s.z);(r==="palm"||r==="rockA"||r==="rockB")&&(h.walk=!1)}}addEntity(e){return this.entities.push(e),e}update(e){for(const t of this.entities)t.update?.(e);this.water&&(this.water.position.y=-.22+Math.sin(performance.now()/900)*.02)}dispose(){this.world.scene.remove(this.group),this.group.traverse(e=>{e.isInstancedMesh&&e.dispose(),e.geometry&&!e.geometry._cached&&e.geometry.dispose?.(),e.material?._owned&&(e.material.map?.dispose?.(),e.material.dispose?.())}),this.world.pickables=[]}}const Ko={fetch:[["##############","#,.d......d.,#","#..s......s..#","#..........M.#","#.s....A...s.#","#............#","#...c........#","#.p........p.#","#..s......s..#","#......P.....#","#.d........d.#","##############"],["#############","##,.d...d.,##","#.s.......s.#","#...11111...#","#.s.1...1.s.#","#.....A..M..#","#.....c.....#","#,p.......p,#","#.s..P....s.#","##.d.....d.##","#############"],["################","#,.d.......s..,#","#..p...A...p...#","#.s..........s.#","#....c.....c...#","#..........M...#","#.s..........s.#","#......P....s..#","#.,d........d,.#","################"]],array:[["##################","#,.d..........d.,#","#..oooooooooo..s.#","#..oooooooooo....#","#..oooooooooo..A.#","#..oooooooooo....#","#..oooooooooo..s.#","#..oooooooooo....#","#..oooooooooo..M.#","#..oooooooooo..s.#","#..s....P........#","#.d............d.#","##################"],["##################","#,.d...........d,#","#..s...........s.#","#...oooooooooo...#","#...oooooooooo.A.#","#...oooooooooo...#","#...oooooooooo.M.#","#...oooooooooo...#","#...oooooooooo.s.#","#...oooooooooo...#","#...oooooooooo...#","#.s.....P......d.#","##################"]],numberline:[["##########################","#,d....................d,#","#..M..s............s..A,.#","#.,VVVVVVVVVVVVVVVVVVVVV.#","#......................,.#","#..P..s............s...d.#","##########################"],["########################","#,d..................d,#","#...s..........s....M..#","#..VVVVVVVVVVVVVVVVVV..#","#....,.............,...#","#..P....s........s...A.#","########################"]],share:[["###############","#,.d.......d.,#","#..B...B...B..#","#.s....M....s.#","#......m......#","#....c....A...#","#..B...B...B..#","#.s...P....s..#","#.,d.......d,.#","###############"],["###############","#,.d..M....d.,#","#..B..B..B....#","#.s........s..#","#....m....A...#","#.s........s..#","#..B..B..B....#","#....P.....c..#","#.,d.......d,.#","###############"]],hub:[["################################","###,.....dd......d.,############","##..t...........g..f.###########","#..........d..........##########","#.d.....1111111......d.#########","#.......1,,,,,1........#########","#.h.d...1,,T,,1...N....#########","#.......1,,,,,1........###....##","#.......1111111.l..d...##......#","#..d.........M........bwww..j..#","#......................##......#","#...O.......P......d...###....##","#.................e....#########","#.d..k..d....,,....d...#########","##..u...........y....###########","###,....dd.....d..,#############","################################"]]},Vv={t:"tide",g:"garden",u:"stump",y:"vines"};class th extends td{constructor(e,t,n={},s={}){super(e,"hub"),this.island={built:[],unlocked:[],crabKing:!1,festival:!1,...n},this.buildFrom(rv(Ko.hub[0],this.island.built),{seed:777}),this.portals={},this.gates={};for(const[c,h]of Object.entries(Vv)){const d=(this.markers[c]||[])[0];if(!d)continue;const u=ko[h],f=this.island.festival?1:Math.min(1,t?.[h]??0),g=this.island.festival?4:Math.min(4,Math.max(0,s[h]??0));this.gates[h]=new j_(this,d,{worldId:h,label:`${u.emoji} ${z("world."+h)}`,accent:u.accent,bloom:u.bloom,pct:f,stage:g}),this.portals[h]=d}const r=(this.markers.T||[])[0];r&&(this.tree=Tt(pt.palm,2.6,"prop:bigpalm"),this.tree.position.copy(this.worldPos(r.x,r.z)),this.group.add(this.tree),this.cellAt(r.x,r.z).walk=!1);const a=(this.markers.O||[])[0];if(a){const c=Tt(pt.sign,.85,"prop:sign");c.position.copy(this.worldPos(a.x,a.z)),this.group.add(c)}const o=(this.markers.N||[])[0];if(o){const c=Tt(pt.egg,.6,"prop:egg");c.position.copy(this.worldPos(o.x,o.z)),this.group.add(c)}const l=(this.markers.M||[])[0];l&&(this.mimi=Vn(Br.mimi,.8,null,"char:mimi"),this.mimi.position.copy(this.worldPos(l.x,l.z)),this.group.add(this.mimi),this.cellAt(l.x,l.z).walk=!1,this.mimiHome={x:l.x,z:l.z},this.mimiPos={x:l.x,z:l.z},this.mimiPrev={x:l.x,z:l.z},this.playerAt=null,this.mimiTag=_t(this.island.unlocked.length?"📜":"💬",{bg:"#fff8ecdd",scale:.55,fontSize:44}),this.group.add(this.mimiTag),this._mimiWander()),this.buildSpots={},this.npcs=[],this._placeBuilds(),this.island.crabKing&&this._placeCrabKing(),this.applyBloom(t);for(const c of[this.mimi,this.mimiTag,...this.npcs.map(h=>h.mesh)])c&&this.world.pickables.push(c)}_bob(e,t=2,n=.04){const s=e.position.y,r={t:Math.random()*6,update:a=>{r.t+=a/1e3,e.position.y=s+Math.abs(Math.sin(r.t*t))*n}};this.addEntity(r)}_mimiWander(){const e=this.mimi,t={t:Math.random()*6,wait:1800+Math.random()*2600,hop:null};this.addEntity({update:n=>{if(t.t+=n/1e3,this.mimiTag.position.set(e.position.x,e.position.y+1.3+Math.sin(t.t*2)*.05,e.position.z),t.hop){t.hop.k+=n/280;const o=Math.min(1,t.hop.k);e.position.lerpVectors(t.hop.from,t.hop.to,o),e.position.y+=Math.sin(o*Math.PI)*.3,o>=1&&(t.hop=null);return}const s=this.worldPos(this.mimiPos.x,this.mimiPos.z);e.position.y=s.y+Math.abs(Math.sin(t.t*2))*.04;const r=this.playerAt?.();if(r&&Math.abs(r.x-this.mimiPos.x)+Math.abs(r.z-this.mimiPos.z)<=2){const o=Math.atan2(r.x-this.mimiPos.x,r.z-this.mimiPos.z);e.rotation.y+=(o-e.rotation.y)*Math.min(1,n/160)}if(t.wait-=n,t.wait>0)return;t.wait=2200+Math.random()*3800;const a=[[1,0],[-1,0],[0,1],[0,-1]].sort(()=>Math.random()-.5);for(const[o,l]of a){const c=this.mimiPos.x+o,h=this.mimiPos.z+l;if(Math.abs(c-this.mimiHome.x)+Math.abs(h-this.mimiHome.z)>2)continue;const d=this.cellAt(c,h);if(!(!d||!d.walk||d.h!==0||!".,M".includes(d.ch))&&!(r&&r.x===c&&r.z===h)){this.cellAt(this.mimiPos.x,this.mimiPos.z).walk=!0,d.walk=!1,this.mimiPrev={...this.mimiPos},this.mimiPos={x:c,z:h},e.rotation.y=Math.atan2(o,l),t.hop={from:e.position.clone(),to:this.worldPos(c,h),k:0};break}}}})}_prop(e,t,n,s,r=0,a=0,o=0){const l=Tt(pt[e],t,"prop:"+e),c=this.worldPos(n,s,o);return l.position.set(c.x+r*Ut,c.y,c.z+a*Ut),this.group.add(l),l}_placeBuilds(){for(const e of hs){const t=(this.markers[e.char]||[])[0];if(!t)continue;const n=this.island.built.includes(e.id)?"built":this.island.unlocked.includes(e.id)?"unlocked":"locked";this.buildSpots[e.id]={x:t.x,z:t.z,state:n},n==="built"?this._placeBuilt(e,t):n==="unlocked"&&this._placePlotSign(e,t)}}_placePlotSign(e,t){this._prop("sign",.8,t.x,t.z);const n=_t(`🔨 ${e.emoji}`,{bg:"#fff8ecdd",scale:.7,fontSize:44});n.position.copy(this.worldPos(t.x,t.z,1.45)),this.group.add(n),this.cellAt(t.x,t.z).walk=!1}_placeBuilt(e,t){const{x:n,z:s}=t,r=(a,o)=>{const l=this.cellAt(a,o);l&&(l.walk=!1)};if(e.id==="lanterns")for(const a of[-1,0,1])this.cellAt(n+a,s)&&(this._prop("lantern",.55,n+a,s),r(n+a,s));else if(e.id==="fruitstand")this._prop("stall",1.15,n,s),this._prop("basket",.3,n,s,.62,.45),r(n,s);else if(e.id==="garden")this._prop("flowerPink",.34,n,s),this._prop("flowerYellow",.32,n,s,.55,.3),this._prop("flowerBlue",.32,n,s,-.5,.32),this._prop("bush",.42,n,s,.12,-.5),this._prop("sprout",.3,n,s,-.45,-.35),this._prop("flowerPink",.3,n,s,.5,-.28),r(n,s);else if(e.id==="stage")this._prop("gong",1,n,s),this._prop("lantern",.5,n,s,.85,.2),this._prop("lantern",.5,n,s,-.85,.2),r(n,s);else if(e.id==="bakery")this._prop("oven",1,n,s),this._prop("basket",.3,n,s,.7,.35),r(n,s);else if(e.id==="plaza"){this._prop("portal",1.7,n,s),this._prop("lantern",.5,n,s,1,.4),this._prop("lantern",.5,n,s,-1,.4),this._prop("flowerYellow",.3,n,s,.9,-.5),this._prop("flowerPink",.3,n,s,-.9,-.5);const a=_t("🎪",{scale:.8});a.position.copy(this.worldPos(n,s,2.3)),this.group.add(a),r(n,s)}e.npc&&this._placeNpc(e,t)}_placeNpc(e,t){const n=$i.find(a=>a.id===e.npc.pet);if(!n)return;let s=null;for(const[a,o]of[[0,1],[1,0],[-1,0],[0,-1]]){const l=this.cellAt(t.x+a,t.z+o);if(l&&l.walk&&".,".includes(l.ch)){s={x:t.x+a,z:t.z+o};break}}if(!s)return;const r=Vn(n.model,.6,null,"npc:"+e.npc.pet);r.position.copy(this.worldPos(s.x,s.z)),this.group.add(r),this.cellAt(s.x,s.z).walk=!1,this._bob(r),this.npcs.push({id:e.id,face:e.npc.face,x:s.x,z:s.z,mesh:r})}_placeCrabKing(){const e=(this.markers.j||[])[0];if(!e)return;const t=this.cellAt(e.x-1,e.z);if(!t||!t.walk)return;const n=Vn(Br.crabKing,.95,null,"char:crabKing");n.position.copy(this.worldPos(e.x-1,e.z)),this.group.add(n),t.walk=!1,this._bob(n,1.4,.03),this.npcs.push({id:"crabking",face:"🦀",x:e.x-1,z:e.z,mesh:n})}applyBloom(e){const t=new De(Ot.gray),n=new De;for(const s of this.floorList){let r=null,a=1e9;for(const[l,c]of Object.entries(this.portals)){const h=Math.abs(s.x-c.x)+Math.abs(s.z-c.z);h<a&&(a=h,r=l)}if(r===null||a>7)continue;const o=this.island.festival?1:Math.min(1,(e?.[r]??0)*1.15);n.setHex(this._floorColors(s.c,s.x,s.z,{})),n.lerpColors(t,n,.25+.75*o),this.floor.setColorAt(s.c.instanceId,n)}this.floor.instanceColor&&(this.floor.instanceColor.needsUpdate=!0)}}class nh{constructor(e){this.mesh=e,this.x=0,this.z=0,this.place=null,this.hopping=!1,this.queue=[],this.carrying=null,this.carryData=null,this.facing=0,this.idleT=Math.random()*10,this.locked=!1,this.onArrive=null,this.onBump=null,this.sfx=!0,this.headH=1,this.baseScale=e.scale.x||1}setPlace(e,t,n){this.place=e,this.x=t,this.z=n,this.queue.length=0,this.hopping=!1;const s=e.worldPos(t,n);this.mesh.position.copy(s),e.group.add(this.mesh)}get cell(){return this.place?.cellAt(this.x,this.z)}face(e,t){e===0&&t===0||(this.facing=Math.atan2(e,t))}tryStep(e,t){return this.locked?!1:this.hopping?(this.queue.length<2&&this.queue.push({dx:e,dz:t}),!0):this._step(e,t)}_step(e,t){const n=this.x+e,s=this.z+t,r=this.place.cellAt(this.x,this.z),a=this.place.cellAt(n,s);if(this.face(e,t),!a||!a.walk||!this.place.canWalk(r,a)){this.hopping=!0;const h=this.mesh,d=h.position.x,u=h.position.z;return lt({ms:140,ease:ut.outQuad,onUpdate:(f,g)=>{const v=Math.sin(g*Math.PI)*.18;h.position.x=d+e*v,h.position.z=u+t*v},onDone:()=>{this.hopping=!1,this._next()}}),this.onBump?.(n,s),!1}this.hopping=!0;const o=this.mesh,l=o.position.clone(),c=this.place.worldPos(n,s);return this.sfx&&J.sfx("hop"),lt({ms:Bh,ease:ut.linear,onUpdate:(h,d)=>{o.position.x=l.x+(c.x-l.x)*d,o.position.z=l.z+(c.z-l.z)*d,o.position.y=l.y+(c.y-l.y)*d+Math.sin(d*Math.PI)*Oh;const u=Wh(d);o.scale.set(this.baseScale*u.sxz,this.baseScale*u.sy,this.baseScale*u.sxz),o.rotation.y+=(this.facing-o.rotation.y)*.35},onDone:()=>{o.position.copy(c),o.scale.setScalar(this.baseScale),this.x=n,this.z=s,this.hopping=!1,this.onArrive?.(n,s),this._next()}}),!0}_next(){if(this.locked){this.queue.length=0;return}const e=this.queue.shift();if(e)if(e.dx!==void 0)this._step(e.dx,e.dz);else{const t=Math.sign(e.x-this.x),n=Math.sign(e.z-this.z);(t||n)&&this._step(t,n)}}pathTo(e,t){if(this.locked||!this.place)return;const{w:n,d:s}=this.place.size,r=(u,f)=>u>=0&&f>=0&&u<n&&f<s,a=(u,f)=>f*n+u,o=new Int32Array(n*s).fill(-2),l=[[this.x,this.z]];o[a(this.x,this.z)]=-1;let c=!1;for(;l.length&&!c;){const[u,f]=l.shift(),g=this.place.cellAt(u,f);for(const[v,m]of[[1,0],[-1,0],[0,1],[0,-1]]){const p=u+v,T=f+m;if(!r(p,T)||o[a(p,T)]!==-2)continue;const w=this.place.cellAt(p,T);if(!w||!w.walk||!this.place.canWalk(g,w)){o[a(p,T)]=-3;continue}if(o[a(p,T)]=a(u,f),p===e&&T===t){c=!0;break}l.push([p,T])}}if(!c)return!1;const h=[];let d=a(e,t);for(;d!==-1&&o[d]!==-1;)h.unshift({x:d%n,z:Math.floor(d/n)}),d=o[d];return this.queue=h.map(u=>({x:u.x,z:u.z})),this.hopping||this._next(),!0}stop(){this.queue.length=0}carry(e,t){this.carrying=e,this.carryData=t,this.mesh.add(e),e.position.set(0,this.headH+.18,0),e.rotation.set(0,0,0)}dropCarry(){const e=this.carrying;e&&this.mesh.remove(e),this.carrying=null;const t=this.carryData;return this.carryData=null,{mesh:e,data:t}}update(e){this.idleT+=e/1e3;const t=this.mesh;if(!this.hopping){const n=1+Math.sin(this.idleT*3.1)*.015;t.scale.set(this.baseScale,this.baseScale*n,this.baseScale),t.rotation.y+=(this.facing-t.rotation.y)*Math.min(1,e/90)}this.carrying&&(this.carrying.position.y=this.headH+.18+Math.sin(this.idleT*4)*.035,this.carrying.rotation.y+=e*.001)}}class ih{constructor(e){this.mesh=e,this.trail=[],this.x=0,this.z=0,this.hopping=!1,this.place=null,this.idleT=Math.random()*10,this.baseScale=e.scale.x||1,this.happy=0}setPlace(e,t,n){this.place=e,this.x=t,this.z=n,this.trail.length=0,this.mesh.position.copy(e.worldPos(t,n)),e.group.add(this.mesh)}notePlayerAt(e,t){const n=this.trail[this.trail.length-1];n&&n.x===e&&n.z===t||(this.trail.push({x:e,z:t}),this.trail.length>6&&this.trail.shift())}celebrate(){this.happy=1}update(e){this.idleT+=e/1e3;const t=this.mesh;if(this.happy>0&&(this.happy-=e/600,t.rotation.x=(1-Math.max(0,this.happy))*Math.PI*2,this.happy<=0&&(t.rotation.x=0)),!this.hopping&&this.trail.length>2&&this.place){const n=this.trail.shift(),s=n.x-this.x,r=n.z-this.z;if(s||r){this.hopping=!0;const a=t.position.clone(),o=this.place.worldPos(n.x,n.z),l=Math.atan2(s,r);lt({ms:Bh*1.05,ease:ut.linear,onUpdate:(c,h)=>{t.position.lerpVectors(a,o,h),t.position.y=a.y+(o.y-a.y)*h+Math.sin(h*Math.PI)*Oh*.7,t.rotation.y+=(l-t.rotation.y)*.3;const d=Wh(h);t.scale.set(this.baseScale*d.sxz,this.baseScale*d.sy,this.baseScale*d.sxz)},onDone:()=>{t.position.copy(o),t.scale.setScalar(this.baseScale),this.x=n.x,this.z=n.z,this.hopping=!1}})}}else this.hopping||t.scale.set(this.baseScale,this.baseScale*(1+Math.sin(this.idleT*4.2)*.03),this.baseScale)}}class Wv{constructor(e){this.place=e,this.painted=[],this.labels=[],this.pending=[]}_later(e,t){this.pending.push(xt(e,t))}clear(){for(const e of this.pending)e.cancel();this.pending=[];for(const e of this.painted)this.place.resetCellTint(e.x,e.z);for(const e of this.labels)this.place.group.remove(e);this.painted=[],this.labels=[]}_free(e,t){const n=this.place.cellAt(e,t);return n&&n.walk&&n.h===0&&!"AsPpcDmMBVoTON".includes(n.ch)}_findRect(e,t){const{w:n,d:s}=this.place.size,r=Math.floor(n/2),a=Math.floor(s/2);for(let o=0;o<Math.max(n,s);o++)for(let l=Math.max(1,a-o);l<=Math.min(s-t-1,a+o);l++)for(let c=Math.max(1,r-o);c<=Math.min(n-e-1,r+o);c++){let h=!0;for(let d=l;d<l+t&&h;d++)for(let u=c;u<c+e&&h;u++)this._free(u,d)||(h=!1);if(h)return{x0:c,z0:l}}return null}addLabel(e,t,n,s="#2c6e49",r=.55){const a=_t(n,{bg:"#ffffffee",color:s,scale:.55}),o=this.place.worldPos(e,t,r);a.position.copy(o),this.place.group.add(a),this.labels.push(a)}show(e,{skipCounts:t=!0}={}){if(this.clear(),!e||e.kind==="none")return!1;if(e.kind==="array"){let{rows:n,cols:s}=e.params,r=this._findRect(s,n);if(!r){if(r=this._findRect(n,s),!r)return!1;const o=n;n=s,s=o}let a=0;for(let o=0;o<n;o++){for(let l=0;l<s;l++){const c=r.x0+l,h=r.z0+o;this.painted.push({x:c,z:h}),this._later(a*28,()=>{this.place.tintCell(c,h,o%2?11464882:9429914),l===s-1&&J.sfx("plant",{pitch:1+o*.06})}),a++}if(t){const l=(o+1)*s;this._later(o*s*28+150,()=>this.addLabel(r.x0+s,r.z0+o,String(l)))}}return!0}if(e.kind==="baskets"){const{total:n,baskets:s,quotient:r,remainder:a}=e.params,o=this._findRect(s*2-1,2);if(!o)return!1;for(let l=0;l<s;l++){const c=o.x0+l*2,h=o.z0;this.painted.push({x:c,z:h}),this._later(l*90,()=>{this.place.tintCell(c,h,16242848),this.addLabel(c,h,String(r),"#b06a2c"),J.sfx("coin",{pitch:1+l*.05})})}if(a>0){const l=o.x0+Math.floor(s),c=o.z0+1;this.painted.push({x:l,z:c}),this._later(s*90+120,()=>{this.place.tintCell(l,c,16234703),this.addLabel(l,c,"+"+a,"#c2497a")})}return!0}if(e.kind==="numberline"){const{n:s,d:r}=e.params,a=this._findRect(11,1);if(!a)return!1;for(let l=0;l<11;l++){const c=a.x0+l,h=a.z0;this.painted.push({x:c,z:h}),this._later(l*35,()=>this.place.tintCell(c,h,13625087))}this.addLabel(a.x0,a.z0,"0","#4a6a8a"),this.addLabel(a.x0+11-1,a.z0,"1","#4a6a8a");const o=a.x0+Math.round(s/r*10);return this._later(535,()=>{this.place.tintCell(o,a.z0,16767334),this.addLabel(o,a.z0,`${s}/${r}`,"#b06a2c",.8),J.sfx("sparkle")}),!0}if(e.kind==="strip"){const{a:n,b:s,op:r}=e.params,a=this._findRect(Math.min(n,12),2);if(!a)return!1;const o=(l,c,h,d=0)=>{for(let u=0;u<l&&u+d<12;u++){const f=a.x0+d+u;this.painted.push({x:f,z:c}),this._later(u*30,()=>this.place.tintCell(f,c,h))}};return o(Math.min(n,12),a.z0,10213119),this.addLabel(a.x0,(a.z0-1>=0,a.z0),String(n),"#4a6a8a"),r==="+"?(o(Math.min(s,12),a.z0+1,11464882),this.addLabel(a.x0,a.z0+1,"+"+s,"#2c6e49")):(o(Math.min(s,12),a.z0+1,16761523),this.addLabel(a.x0,a.z0+1,"−"+s,"#c2497a")),!0}return!1}}class Yr{constructor(e){this.ctx=e,this.model=new Wv(e.place),this.done=!1}begin(){}onCellTap(){return!1}onArrive(){}onBump(){}onAction(){}onKey(){return!1}showModel(){return this.model.show(this.ctx.problem.model)}update(){}destroy(){this.model.clear()}}class Xv extends Yr{begin(){const{place:e,problem:t,rng:n}=this.ctx;this.stones=[],this.pots=[];const s=n.shuffle(e.markers.s||[]),r=n.shuffle(e.markers.p||[]),a=[...s.map(h=>({...h,pot:!1})),...r.map(h=>({...h,pot:!0}))],o=n.shuffle(t.choices),l=o.findIndex(h=>h.tag==="correct");o.unshift(o.splice(l,1)[0]);const c=o.slice(0,a.length);c.forEach((h,d)=>{const u=a[d];u.pot?this.pots.push(new qc(e,u.x,u.z,{kind:"stone",choice:h})):this.stones.push(new Ms(e,u.x,u.z,h))});for(let h=c.length;h<a.length;h++){const d=a[h];if(!d.pot)continue;const u=n.chance(.4)?{kind:"berry"}:{kind:"bananas",n:n.int(1,3)};this.pots.push(new qc(e,d.x,d.z,u))}this.ctx.hud.setAction(null)}_stoneAt(e,t){return this.stones.find(n=>!n.taken&&n.x===e&&n.z===t)}_potAt(e,t){return this.pots.find(n=>!n.smashed&&n.x===e&&n.z===t)}onArrive(e,t){const{player:n,place:s,particles:r}=this.ctx,a=this._potAt(e,t);if(a){this.pendingDeliver=null;const l=a.smash(r);l?.kind==="stone"?this.stones.push(new Ms(s,e,t,l.choice)):l?.kind==="bananas"?this.ctx.onTreat?.("bananas",l.n,s.worldPos(e,t,.4)):l?.kind==="berry"&&this.ctx.onTreat?.("berry",1,s.worldPos(e,t,.4));return}const o=this._stoneAt(e,t);if(o){this.pendingDeliver=null,J.sfx("pick");const l=o.pickUpMesh();if(n.carrying){const{mesh:c,data:h}=n.dropCarry();c.removeFromParent(),this.stones.push(new Ms(s,e,t,h))}n.carry(l,o.choice),this.ctx.onCarry?.(!0),this.ctx.hud.setAction("⬇️");return}if(this.pendingDeliver&&n.queue.length===0){const l=this.pendingDeliver;this.pendingDeliver=null;const c=(s.markers.A||[])[0];c&&l.x===e&&l.z===t&&n.carrying&&this._offer(c)}}onBump(e,t){const{player:n,place:s,particles:r}=this.ctx,a=(s.markers.A||[])[0];if(!a||e!==a.x||t!==a.z)return;if(n.carrying){this._offer(a);return}if(this.done||this.fxStone)return;const o=performance.now();o<(this.nudgeT||0)||(this.nudgeT=o+2600,r.emit(s.worldPos(a.x,a.z,1),8,{colors:[16767334,16774079],speed:.6,up:.6,life:600,spread:.25}),this.ctx.hud.say(z("play.altar_wants"),{transient:!0,ms:2400,face:"✨"}))}onAction(){const{player:e,place:t}=this.ctx;if(!e.carrying)return;const{x:n,z:s}=e;if(this._stoneAt(n,s)||this._potAt(n,s))return;this.pendingDeliver=null,J.sfx("place");const{mesh:r,data:a}=e.dropCarry();r.removeFromParent(),this.stones.push(new Ms(t,n,s,a)),this.ctx.onCarry?.(!1),this.ctx.hud.setAction(null)}onCellTap(e,t){const{player:n,place:s}=this.ctx,r=(s.markers.A||[])[0];if(!r||e!==r.x||t!==r.z)return!1;if(!n.carrying)return this.onBump(e,t),!0;if(Math.abs(n.x-r.x)+Math.abs(n.z-r.z)===1)return this._offer(r),!0;const a=[[0,1],[1,0],[-1,0],[0,-1]].map(([o,l])=>({x:r.x+o,z:r.z+l})).filter(o=>s.cellAt(o.x,o.z)?.walk).sort((o,l)=>Math.abs(o.x-n.x)+Math.abs(o.z-n.z)-(Math.abs(l.x-n.x)+Math.abs(l.z-n.z)));for(const o of a)if(n.pathTo(o.x,o.z))return this.pendingDeliver=o,!0;return!0}_offer(e){const{player:t}=this.ctx;t.face(e.x-t.x,e.z-t.z);const{mesh:n,data:s}=t.dropCarry();this.ctx.onCarry?.(!1),this.ctx.hud.setAction(null),this._deliver(n,s,e)}_deliver(e,t,n){if(this.done)return;const{place:s,player:r}=this.ctx;e.position.copy(r.mesh.position).add(new D(0,r.headH+.18,0)),s.group.add(e),this.fxStone=e;const a=e.position.clone(),o=s.worldPos(n.x,n.z,.92);lt({ms:360,ease:ut.linear,onUpdate:(l,c)=>{e.position.lerpVectors(a,o,c),e.position.y+=Math.sin(c*Math.PI)*.55},onDone:()=>{J.sfx("place"),this.dead||this._evaluate(t,e,n)}})}_freeNeighbor(e){const{place:t,player:n}=this.ctx;for(const[s,r]of[[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]){const a=e.x+s,o=e.z+r,l=t.cellAt(a,o);if(!(!l||!l.walk)&&!(this._stoneAt(a,o)||this._potAt(a,o))&&!(n.x===a&&n.z===o))return{x:a,z:o}}return null}_evaluate(e,t,n){if(this.done)return;const{problem:s,place:r}=this.ctx,a=r.worldPos(n.x,n.z,.92);String(e.value)===String(s.answer)?(this.done=!0,this.ctx.resolve(!0,{tag:"correct",value:e.value}),this._starBurst(t,a)):(this.ctx.resolve(!1,{tag:e.tag,value:e.value}),this._handBack(t,e,n,a))}_starBurst(e,t){const{place:n,particles:s}=this.ctx;this.ctx.altar?.cheer(),s.confetti(t.clone().add(new D(0,.3,0)),34),lt({ms:420,delay:140,ease:ut.inQuad,onUpdate:(c,h)=>{e.scale.setScalar(Math.max(.001,1-h)),e.position.y=t.y-h*.3},onDone:()=>{e.removeFromParent(),this.fxStone=null}});const r=_t("⭐",{scale:1.5});r.position.copy(t),n.group.add(r),this.fxStar=r;const a=r.scale.clone();r.scale.copy(a).multiplyScalar(.3),J.sfx("bloom");const o=(Math.random()-.5)*.5;let l=-1;lt({ms:950,ease:ut.outQuad,onUpdate:(c,h)=>{r.position.y=t.y+.15+h*1.7,r.position.x=t.x+Math.sin(h*Math.PI*2)*.12+o*h,r.material.rotation=Math.sin(h*Math.PI*3)*.45,r.scale.copy(a).multiplyScalar(.3+Math.min(1,h*2.5)*.7);const d=h*8|0;d!==l&&(l=d,s.emit(r.position.clone(),2,{colors:[16767334,16774079],speed:.4,up:.2,life:480,spread:.12}))},onDone:()=>{s.confetti(r.position.clone(),26),J.sfx("sparkle"),lt({ms:280,ease:ut.outQuad,onUpdate:(c,h)=>{r.scale.copy(a).multiplyScalar(1+h*.9),r.material.opacity=1-h},onDone:()=>{r.removeFromParent(),this.fxStar=null}})}})}_handBack(e,t,n,s){const{place:r,particles:a}=this.ctx;this.ctx.altar?.shake(),a.poof(s.clone().add(new D(0,.35,0)),10,14273976);const o=_t("🤔",{scale:.8});o.position.copy(s).add(new D(0,.85,0)),r.group.add(o),this.fxThink=o,lt({ms:1150,ease:ut.outQuad,onUpdate:(d,u)=>{o.position.y=s.y+.85+u*.5,o.material.opacity=u<.6?1:1-(u-.6)/.4},onDone:()=>{o.removeFromParent(),this.fxThink=null}});const l=this._freeNeighbor(n);if(!l){a.poof(s,18,13617339),e.removeFromParent(),this.fxStone=null;return}const c=e.position.clone(),h=r.worldPos(l.x,l.z);lt({ms:460,delay:430,ease:ut.linear,onUpdate:(d,u)=>{e.position.lerpVectors(c,h,u),e.position.y+=Math.sin(u*Math.PI)*.7},onDone:()=>{J.sfx("drop"),e.removeFromParent(),this.fxStone=null,this.dead||this.stones.push(new Ms(r,l.x,l.z,t,{tried:!0}))}})}update(e){for(const t of this.stones)t.update(e)}destroy(){this.dead=!0,super.destroy();for(const t of this.stones)t.taken||t.remove();for(const t of[this.fxStone,this.fxStar,this.fxThink])t?.removeFromParent();const{player:e}=this.ctx;if(e.carrying){const{mesh:t}=e.dropCarry();t?.removeFromParent()}}}class qv extends Yr{begin(){const{place:e,hud:t}=this.ctx,n=e.markers.o||[];this.minX=Math.min(...n.map(s=>s.x)),this.minZ=Math.min(...n.map(s=>s.z)),this.maxX=Math.max(...n.map(s=>s.x)),this.maxZ=Math.max(...n.map(s=>s.z)),this.anchor=null,this.flag=null,this.sprouts=[],this.pending=[],this._paint(),t.setAction("🌱"),t.setVerbPanel(this._panel())}_later(e,t){this.pending.push(xt(e,t))}_onBed(e,t){return e>=this.minX&&e<=this.maxX&&t>=this.minZ&&t<=this.maxZ}_clamp(e,t){return{x:Math.max(this.minX,Math.min(this.maxX,e)),z:Math.max(this.minZ,Math.min(this.maxZ,t))}}_rect(){const{player:e}=this.ctx;if(!this.anchor)return this._onBed(e.x,e.z)?{x0:e.x,z0:e.z,x1:e.x,z1:e.z}:null;const t=this._clamp(e.x,e.z);return{x0:Math.min(this.anchor.x,t.x),x1:Math.max(this.anchor.x,t.x),z0:Math.min(this.anchor.z,t.z),z1:Math.max(this.anchor.z,t.z)}}_panel(){const{player:e}=this.ctx,t=this._rect(),n=t?t.z1-t.z0+1:0,s=t?t.x1-t.x0+1:0;return{kind:"array",rows:n,cols:s,count:n*s,anchored:!!this.anchor,offBed:!this._onBed(e.x,e.z)}}_paint(){const{place:e}=this.ctx,t=this._rect();for(let n=this.minZ;n<=this.maxZ;n++)for(let s=this.minX;s<=this.maxX;s++){const r=t&&s>=t.x0&&s<=t.x1&&n>=t.z0&&n<=t.z1;e.tintCell(s,n,r?(n-t.z0)%2?11464882:9429914:(s+n)%2?12159582:10581582)}this.ctx.hud.setVerbPanel(this._panel())}showModel(){return!0}onArrive(e,t){const n=this._panel();this.anchor&&(n.rows!==this._lastR||n.cols!==this._lastC)&&J.sfx("click",{pitch:1+(n.rows+n.cols)*.03}),this._lastR=n.rows,this._lastC=n.cols,this._paint()}onAction(){if(this.done)return;const{player:e,place:t,problem:n,particles:s}=this.ctx;if(!this.anchor){if(!this._onBed(e.x,e.z)){J.sfx("boop"),this.ctx.hud.toast("🌱 "+z("verb.array_need_soil"));return}this.anchor={x:e.x,z:e.z},this.flag=Tt(pt.flowerYellow,.42,"prop:flowerYellow"),this.flag.position.copy(t.worldPos(this.anchor.x,this.anchor.z,.04)),t.group.add(this.flag),J.sfx("plant"),this._paint();return}if(e.x===this.anchor.x&&e.z===this.anchor.z){t.group.remove(this.flag),this.flag=null,this.anchor=null,J.sfx("swoosh"),this.ctx.hud.toast("🚩 "+z("verb.array_unplant")),this._paint();return}const{rows:r,cols:a,total:o,given:l}=n.model.params,c=this._rect(),h=c.z1-c.z0+1,d=c.x1-c.x0+1,u=h*d;let f=!1;if(l==="both"?f=h===r&&d===a||h===a&&d===r:l==="rows"?f=h===r&&u===o:f=u===o&&h>1&&d>1,f){this.done=!0;let g=0;for(let v=0;v<h;v++){for(let p=0;p<d;p++){const T=t.worldPos(c.x0+p,c.z0+v,.06);this._later(g*36,()=>{const w=Tt(pt.sprout,.3,"prop:sprout",{castShadow:!1});w.position.copy(T),w.scale.multiplyScalar(.001),t.group.add(w),this.sprouts.push(w);const M=w.scale.x*1e3;this.pending.push(lt({ms:240,ease:ut.outBack,onUpdate:(C,A)=>w.scale.setScalar(Math.max(.001,M*A))})),J.sfx("plant",{pitch:.9+(v*d+p)*.012})}),g++}const m=(v+1)*d;this._later(v*d*36+200,()=>zo(this.ctx.world,t.worldPos(c.x0+d,c.z0+v,.3),String(m)))}this._later(h*d*36+450,()=>{s.confetti(t.worldPos(c.x0+Math.floor(d/2),c.z0+Math.floor(h/2),.6),40),this.ctx.resolve(!0,{tag:"correct",value:u})})}else{const g=u===o?"shape":u<o?"too_few":"too_many";this.ctx.resolve(!1,{tag:"near_miss",value:u,arrayInfo:{tag:g,r:h,c:d,n:u}})}}destroy(){super.destroy();const{place:e}=this.ctx;for(const t of this.pending)t.cancel();this.pending=[];for(let t=this.minZ;t<=this.maxZ;t++)for(let n=this.minX;n<=this.maxX;n++)e.resetCellTint(n,t);this.flag&&e.group.remove(this.flag);for(const t of this.sprouts)e.group.remove(t);this.ctx.hud.setVerbPanel(null),this.ctx.hud.setAction(null)}}class $v extends Yr{begin(){const{place:e,problem:t,hud:n}=this.ctx;this.tiles=(e.markers.V||[]).slice().sort((c,h)=>c.x-h.x),this.n=this.tiles.length;const{lo:s=0,hi:r=1,d:a=4}=t.model.params;this.lo=s,this.hi=r,this.d=a,this.ticks=[],this.knot=null,this.readyMark=null,this.readyKey=null,this.readyPulseAt=0;const o=this.tiles[0],l=this.tiles[this.n-1];this.endA=_t(String(s),{bg:"#fff8ec",scale:.8}),this.endA.position.copy(e.worldPos(o.x,o.z,.9)),this.endB=_t(String(r),{bg:"#fff8ec",scale:.8}),this.endB.position.copy(e.worldPos(l.x,l.z,.9)),e.group.add(this.endA,this.endB),this._showTicks(t.scaffold??1),n.setAction("🔔")}_showTicks(e){const{place:t}=this.ctx;for(const o of this.ticks)t.group.remove(o);this.ticks=[],this.level=e;const n=this.hi-this.lo,s=Math.round(this.d*n),r=(o,l,c)=>{const h=Math.round((o-this.lo)/n*(this.n-1)),d=this.tiles[h],u=_t("▲",{color:l?"#e8a23d":"#7c4fd0",scale:l?1:.95});if(u.position.copy(t.worldPos(d.x,d.z,.34)),t.group.add(u),this.ticks.push(u),c){const f=_t(c,{bg:l?"#ffd966dd":"#ffffffe0",color:"#6a4a8a",scale:.68});f.position.copy(t.worldPos(d.x,d.z,l?.92:.82)),t.group.add(f),this.ticks.push(f)}};let a=!1;for(let o=1;o<s;o++){const l=this.lo+o/this.d,c=Number.isInteger(l),h=!c&&Number.isInteger(l*2);if(h&&(a=!0),e>=2&&!(c||h))continue;let d=null;e===0?d=c?String(l):`${Math.round(l*this.d)}/${this.d}`:e===1&&c?d=String(l):e===1&&h&&(d=l===.5?"½":`${Math.floor(l)}½`),r(l,c||h,d)}!a&&this.lo<.5&&this.hi>.5&&r(.5,!0,e<=1?"½":null)}_valueAt(e){const t=this.tiles.findIndex(n=>n.x===e);return t<0?null:this.lo+t/(this.n-1)*(this.hi-this.lo)}_tol(){const{problem:e}=this.ctx;return Math.max(e.accept?.tol??.05,.55/(this.n-1))*(this.hi-this.lo)}_isCorrectCell(e,t){if(!this.tiles.some(s=>s.x===e&&s.z===t))return!1;const n=this._valueAt(e);return n!==null&&Math.abs(n-this.ctx.problem.answer)<=this._tol()}_showReadyCue(e,t){if(this.done||this.resolving)return;const n=performance.now(),s=`${e},${t}`;if(this.ctx.hud.setActionReady?.(!0),this.readyKey===s&&n<this.readyPulseAt)return;this.readyKey=s,this.readyPulseAt=n+1200;const{place:r,particles:a}=this.ctx,o=r.worldPos(e,t,.52);a.emit(o,10,{colors:[16767334,16777215,13215487],speed:.8,up:1,life:620,spread:.18}),J.sfx("sparkle",{pitch:.75,gain:.45});const l=_t("✦",{color:"#ffd966",scale:.72});l.position.copy(o),r.group.add(l),this.readyMark=l;const c=l.scale.clone();lt({ms:680,ease:ut.outQuad,onUpdate:(h,d)=>{l.position.y=o.y+Math.sin(d*Math.PI)*.22,l.scale.set(c.x*(1+d*.55),c.y*(1+d*.55),1),l.material.opacity=1-d},onDone:()=>{this.readyMark===l&&(this.readyMark=null),r.group.remove(l)}})}onArrive(e,t){this._isCorrectCell(e,t)&&this.ctx.player.queue.length===0?this._showReadyCue(e,t):this.ctx.hud.setActionReady?.(!1)}showModel(){return this._showTicks(0),!0}onAction(){if(this.done||this.resolving||this.ctx.player.locked)return;const{player:e,place:t,problem:n,particles:s}=this.ctx;if(!this.tiles.some(c=>c.x===e.x&&c.z===e.z)){J.sfx("boop");return}const a=this._valueAt(e.x),o=n.answer,l=this._tol();if(J.sfx("gong"),this.ctx.hud.setActionReady?.(!1),Math.abs(a-o)<=l){this.done=!0;const c=t.worldPos(e.x,e.z,.15);this.knot=Tt(pt.flowerPink,.3,"prop:flowerPink"),this.knot.position.copy(c),t.group.add(this.knot),this.tiles.forEach((h,d)=>{xt(d*40,()=>{if(d%3===0){const u=Tt(d%2?pt.flowerYellow:pt.flowerBlue,.22,"prop:f"+d%2);u.position.copy(t.worldPos(h.x,h.z,.12)),t.group.add(u),this.ticks.push(u)}})}),s.confetti(c,40),xt(500,()=>this.ctx.resolve(!0,{tag:"correct",value:a}))}else{this.resolving=!0;const c=e.mesh;e.locked=!0,s.splash(c.position.clone(),34),J.sfx("splash");const h=c.position.y;lt({ms:420,ease:ut.inQuad,onUpdate:(d,u)=>{c.position.y=h-u*1.1,c.rotation.z=u*.7},onDone:()=>{const d=(t.markers.P||[{x:2,z:2}])[0];c.rotation.z=0,e.locked=!1,e.setPlace(t,d.x,d.z),this.ctx.hud.setActionReady?.(!1),this._showTicks(0),this.resolving=!1,this.ctx.resolve(!1,{tag:a<o?"magnitude_low":"magnitude_high",value:a})}})}}destroy(){super.destroy();const{place:e}=this.ctx;e.group.remove(this.endA,this.endB),this.knot&&e.group.remove(this.knot),this.readyMark&&e.group.remove(this.readyMark);for(const t of this.ticks)e.group.remove(t);this.ctx.hud.setAction(null),this.ctx.hud.setActionReady?.(!1)}}class Kv extends Yr{begin(){const{place:e,problem:t,hud:n,rng:s}=this.ctx,{total:r,baskets:a}=t.model.params;this.total=r,this.pile=r;const o=(e.markers.m||[])[0];this.stumpPos=o?{x:o.x,z:o.z}:{x:2,z:2},o&&(this.stumpMesh=Tt(pt.stump,.5,"prop:stump"),this.stumpMesh.position.copy(e.worldPos(o.x,o.z)),e.group.add(this.stumpMesh),e.cellAt(o.x,o.z).walk=!1),this.pileSprite=_t("🥥 "+this.pile,{bg:"#fff8ec",scale:.8}),this.pileSprite.position.copy(e.worldPos(this.stumpPos.x,this.stumpPos.z,1)),e.group.add(this.pileSprite);const l=(e.markers.B||[]).slice().sort((c,h)=>Math.abs(c.x-this.stumpPos.x)+Math.abs(c.z-this.stumpPos.z)-(Math.abs(h.x-this.stumpPos.x)+Math.abs(h.z-this.stumpPos.z)));this.baskets=l.slice(0,a).map(c=>{const h=Tt(pt.basket,.42,"prop:basket");h.position.copy(e.worldPos(c.x,c.z)),e.group.add(h);const d=_t("0",{bg:"#fff8ec",scale:.6});return d.position.copy(e.worldPos(c.x,c.z,.85)),e.group.add(d),{x:c.x,z:c.z,count:0,mesh:h,label:d,order:[]}}),this.lastDrops=[],n.setAction("✅"),n.setVerbPanel(this._panel())}_panel(){return{kind:"share",pile:this.pile,counts:this.baskets.map(e=>e.count)}}_updateLabel(e){const{place:t}=this.ctx;t.group.remove(e.label),e.label=_t(String(e.count),{bg:"#fff8ec",scale:.6}),e.label.position.copy(t.worldPos(e.x,e.z,.85)),t.group.add(e.label)}_updatePile(){const{place:e}=this.ctx;e.group.remove(this.pileSprite),this.pileSprite=_t("🥥 "+this.pile,{bg:"#fff8ec",scale:.8}),this.pileSprite.position.copy(e.worldPos(this.stumpPos.x,this.stumpPos.z,1)),e.group.add(this.pileSprite),this.ctx.hud.setVerbPanel(this._panel())}_basketAt(e,t){return this.baskets.find(n=>n.x===e&&n.z===t)}_drop(e){if(this.pile<=0){J.sfx("boop");return}const{place:t}=this.ctx;this.pile-=1,e.count+=1,this.lastDrops.push(e);const n=Tt(pt.coconut,.22,"prop:coconut"),s=t.worldPos(this.stumpPos.x,this.stumpPos.z,.6),r=t.worldPos(e.x,e.z,.3);n.position.copy(s),t.group.add(n),J.sfx("pick",{pitch:1+e.count*.04}),lt({ms:320,ease:ut.linear,onUpdate:(a,o)=>{n.position.lerpVectors(s,r,o),n.position.y=s.y+(r.y-s.y)*o+Math.sin(o*Math.PI)*.7},onDone:()=>{t.group.remove(n),J.sfx("drop"),this._updateLabel(e),this._updatePile()}})}_take(){const e=this.lastDrops.pop();if(!e||e.count<=0){J.sfx("boop");return}e.count-=1,this.pile+=1,J.sfx("swoosh"),this._updateLabel(e),this._updatePile()}showModel(){for(const[e,t]of this.baskets.entries()){const n=t.mesh;lt({ms:360,delay:e*70,onUpdate:(s,r)=>{n.position.y=this.ctx.place.worldPos(t.x,t.z).y+Math.sin(r*Math.PI)*.18}})}return J.sfx("click"),!0}onCellTap(e,t){const n=this._basketAt(e,t);return n?(this._drop(n),!0):e===this.stumpPos.x&&t===this.stumpPos.z?(this._take(),!0):!1}onArrive(e,t){if(this.ctx.player.queue.length>0)return;const n=this._basketAt(e,t);n&&this._drop(n)}onKey(e){return e==="Backspace"||e==="KeyX"?(this._take(),!0):!1}onAction(){if(this.done)return;const{problem:e}=this.ctx,{baskets:t,quotient:n,remainder:s}=e.model.params,r=this.baskets.map(o=>o.count),a=r.every(o=>o===r[0]);if(a&&r[0]===n&&this.pile===s){this.done=!0;for(const o of this.baskets)this.ctx.particles.confetti(this.ctx.place.worldPos(o.x,o.z,.5),12);s>0&&this.ctx.onTreat?.("berry",s,this.ctx.place.worldPos(this.stumpPos.x,this.stumpPos.z,.7)),this.ctx.resolve(!0,{tag:"correct",value:r[0]})}else if(a)this.pile>s?this.ctx.resolve(!1,{tag:"share_more",value:this.pile}):this.ctx.resolve(!1,{tag:"remainder_ignored",value:r[0]});else{const o=Math.max(...r);for(const l of this.baskets)if(l.count===o){const c=l.mesh;lt({ms:380,onUpdate:(h,d)=>{c.rotation.z=Math.sin(d*Math.PI*4)*.15}})}this.ctx.resolve(!1,{tag:"unfair_share",value:r.join(",")})}}destroy(){super.destroy();const{place:e}=this.ctx;this.stumpMesh&&e.group.remove(this.stumpMesh),e.group.remove(this.pileSprite);for(const t of this.baskets)e.group.remove(t.mesh),e.group.remove(t.label);this.ctx.hud.setVerbPanel(null),this.ctx.hud.setAction(null)}}const sh={fetch:Xv,array:qv,numberline:$v,share:Kv};function Yv(i,e,t){const n=[];i.flags?.mimiMet||n.push({key:"mimi.meet"});const s=t.filter(c=>c.state==="unlocked"),r=s.find(c=>i.bananas>=c.playerCost);r?n.push({key:"mimi.build_ready",buildId:r.id}):s.length&&n.push({key:"mimi.need_bananas",buildId:s[0].id,vars:{n:s[0].playerCost-i.bananas}});let a=null;for(const[c,h]of Object.entries(e.worlds))(!a||h.pct<a.pct)&&(a={id:c,pct:h.pct});const o=t.find(c=>c.state==="locked");if(o&&a){const c=o.points-$h(e);c>0&&c<=.5&&n.push({key:"mimi.almost_blueprint",worldId:a.id})}a&&a.pct<1&&n.push({key:"mimi.world_hint",worldId:a.id});const l=i.egg;return l&&l.goal-l.points>0&&l.goal-l.points<=6&&n.push({key:"mimi.egg_soon",vars:{n:l.goal-l.points}}),(i.streak?.count||0)>=3&&n.push({key:"mimi.streak",vars:{n:i.streak.count}}),i.flags?.festivalDone&&n.push({key:"mimi.festival"}),n.push({key:"mimi.chat.1"},{key:"mimi.chat.2"},{key:"mimi.chat.3"}),n}const jv=[{id:"pink",W:"#ffb3c6"},{id:"blue",W:"#9bd6ff"},{id:"gold",W:"#ffd966"},{id:"lilac",W:"#c9a6ff"}],Zv=[{id:"blue",B:"#7fb8e8",b:"#5e9ed0"},{id:"rose",B:"#f4b8c4",b:"#dd93a6"},{id:"gull",B:"#f4f3ee",b:"#cfd4dd"}];function nd(i,e,t,n,s){const r=new en,a={castShadow:!1},o=vi(ks(i,t),{cacheKey:`amb:${n}:a`,...a}),l=vi(ks(e,t),{cacheKey:`amb:${n}:b`,...a}),c=s/Math.max(i.layers.length,e.layers.length);return o.scale.setScalar(c),l.scale.setScalar(c),l.visible=!1,r.add(o,l),r.userData.frames=[o,l],r}function Yo(i,e){i.userData.frames[0].visible=e===0,i.userData.frames[1].visible=e===1}class Qv{constructor(e,t,n){this.place=e,this.rng=t,this.anchors=n;const s=t.pick(jv);this.mesh=nd(Or.butterflyOpen,Or.butterflyClosed,{W:s.W},`butterfly:${s.id}`,.22),this.pos=this._spot(),this.mesh.position.copy(this.pos),e.group.add(this.mesh),this.flapT=t.float()*200,this.frame=0,this.bobT=t.float()*10,this.rest=0,this.target=this._spot()}_spot(){const e=this.rng.pick(this.anchors);return new D(e.x+(this.rng.float()-.5)*1.6,.35+this.rng.float()*.8,e.z+(this.rng.float()-.5)*1.6)}update(e){this.flapT+=e;const t=this.rest>0?600:110;if(this.flapT>=t&&(this.flapT=0,this.frame=1-this.frame,Yo(this.mesh,this.frame)),this.rest>0){this.rest-=e;return}this.bobT+=e/1e3;const n=this.mesh,s=this.target.x-n.position.x,r=this.target.y-n.position.y,a=this.target.z-n.position.z,o=Math.hypot(s,a);if(o<.12){this.rng.chance(.35)&&(this.rest=800+this.rng.float()*2200,n.position.y=this.target.y),this.target=this._spot();return}const l=(.55+this.rng.float()*.1)*(e/1e3);n.position.x+=s/o*l,n.position.z+=a/o*l,n.position.y+=r*Math.min(1,e/700)+Math.sin(this.bobT*7)*.004,n.rotation.y=Math.atan2(s,a)}}class Jv{constructor(e,t,n,s){this.place=e,this.rng=t,this.openCells=n,this.playerPos=s;const r=t.pick(Zv);this.mesh=nd(Or.birdSpread,Or.birdFold,{B:r.B,b:r.b},`bird:${r.id}`,.3),e.group.add(this.mesh),this.flapT=0,this.frame=0,this.done=!1,this.groundT=0,this.hop=null;const a=n.length>0&&t.chance(.55);this._fly(this._edgePoint(),a?this._landingSpot():this._edgePoint(),a)}_edgePoint(){const{w:e,d:t}=this.place.size,n=this.rng.int(0,3),s=(this.rng.float()-.5)*e,r=(this.rng.float()-.5)*t,a=n===0?-e/2-3:n===1?e/2+3:s,o=n===2?-t/2-3:n===3?t/2+3:r;return new D(a,2.4+this.rng.float()*1.2,o)}_landingSpot(){const e=this.rng.pick(this.openCells);return this.place.worldPos(e.x,e.z,.04)}_fly(e,t,n){this.state="fly",this.landing=n,this.from=e,this.to=t,this.ctrl=new D((e.x+t.x)/2+(this.rng.float()-.5)*4,Math.max(e.y,t.y)+1.2+this.rng.float()*1,(e.z+t.z)/2+(this.rng.float()-.5)*4);const s=e.distanceTo(this.ctrl)+this.ctrl.distanceTo(t);this.flyMs=s/4.2*1e3,this.t=0,this.mesh.position.copy(e)}_takeOff(){this._fly(this.mesh.position.clone(),this._edgePoint(),!1)}update(e){if(this.done)return;const t=this.mesh;if(this.flapT+=e,this.state==="fly"){this.flapT>=110&&(this.flapT=0,this.frame=1-this.frame,Yo(t,this.frame)),this.t+=e/this.flyMs;const s=Math.min(1,this.t),r=this.from,a=this.ctrl,o=this.to,l=1-s,c=l*l*r.x+2*l*s*a.x+s*s*o.x,h=l*l*r.y+2*l*s*a.y+s*s*o.y,d=l*l*r.z+2*l*s*a.z+s*s*o.z;t.rotation.y=Math.atan2(c-t.position.x,d-t.position.z),t.position.set(c,h,d),s>=1&&(this.landing?(this.state="ground",this.groundT=3500+this.rng.float()*5500,Yo(t,1)):(this.done=!0,t.removeFromParent()));return}this.bobT=(this.bobT||0)+e/1e3;const n=this.playerPos?.();if(n&&Math.hypot(n.x-t.position.x,n.z-t.position.z)<2.1){this._takeOff();return}if(this.hop){this.hop.k+=e/240;const s=Math.min(1,this.hop.k);t.position.lerpVectors(this.hop.from,this.hop.to,s),t.position.y=this.hop.from.y+(this.hop.to.y-this.hop.from.y)*s+Math.sin(s*Math.PI)*.22,s>=1&&(this.hop=null);return}if(t.rotation.x=Math.max(0,Math.sin(this.bobT*3.2))*.35,this.groundT-=e,this.groundT<=0){t.rotation.x=0,this._takeOff();return}if(this.rng.chance(e/1400)){const s=Math.round(t.position.x+this.place.size.w/2-.5),r=Math.round(t.position.z+this.place.size.d/2-.5),a=this.rng.shuffle([[1,0],[-1,0],[0,1],[0,-1]]);for(const[o,l]of a){const c=this.place.cellAt(s+o,r+l);if(!(!c||!c.walk||!".,".includes(c.ch))){t.rotation.x=0,t.rotation.y=Math.atan2(o,l),this.hop={from:t.position.clone(),to:this.place.worldPos(s+o,r+l,.04),k:0};break}}}}}class ex{constructor(e,t,n){this.place=e;const s=new en,r=3+t.int(0,1);for(let l=0;l<r;l++){const c=new Lt(new Kn(1.6+t.float()*1.6,.5+t.float()*.35,.9+t.float()*.7),n);c.position.set((l-(r-1)/2)*1.1,l%2*.3,t.float()*.8-.4),s.add(c)}s.scale.setScalar(.8+t.float()*.7);const{w:a,d:o}=e.size;s.position.set((t.float()-.5)*a,5.5+t.float()*2.2,(t.float()-.5)*o),e.group.add(s),this.mesh=s,this.v=.25+t.float()*.3}update(e){this.mesh.position.x+=this.v*e/1e3,this.mesh.position.x>this.place.size.w/2+6&&(this.mesh.position.x=-this.place.size.w/2-6)}}class Ga{constructor(e,t,{butterflies:n=0,birds:s=0,clouds:r=0,playerPos:a=null}={}){if(this.place=e,this.rng=new rs(t.int(1,1e9)),this.playerPos=a,this.clouds=[],r>0){const c=new Ts({color:16777215,transparent:!0,opacity:.85});c._owned=!0;for(let h=0;h<r;h++)this.clouds.push(new ex(e,this.rng,c))}this.openCells=[];for(let c=1;c<e.size.d-1;c++)for(let h=1;h<e.size.w-1;h++){const d=e.cellAt(h,c);d&&d.walk&&d.h===0&&".,".includes(d.ch)&&this.openCells.push({x:h,z:c})}const l=((e.markers.d||[]).length?e.markers.d:this.openCells).map(c=>e.worldPos(c.x,c.z));if(this.butterflies=[],l.length)for(let c=0;c<n;c++)this.butterflies.push(new Qv(e,this.rng,l));this.birds=[],this.birdTimers=[];for(let c=0;c<s;c++)this.birds.push(null),this.birdTimers.push(c===0?600:this.rng.float()*9e3)}update(e){for(const t of this.clouds)t.update(e);for(const t of this.butterflies)t.update(e);for(let t=0;t<this.birds.length;t++){const n=this.birds[t];if(n&&!n.done){n.update(e);continue}this.birdTimers[t]-=e,this.birdTimers[t]<=0&&(this.birds[t]=new Jv(this.place,this.rng,this.openCells,this.playerPos),this.birdTimers[t]=5e3+this.rng.float()*14e3)}}}const $e=i=>document.getElementById(i);let ws={},mi=null;function id(i){ws=i,$e("btn-hint").addEventListener("click",()=>{J.sfx("click"),ws.onHint?.()}),$e("btn-action").addEventListener("click",()=>{J.sfx("click"),ws.onAction?.()}),$e("btn-home").addEventListener("click",()=>{J.sfx("click"),ws.onHome?.()}),$e("btn-settings").addEventListener("click",()=>{J.sfx("click"),ws.onSettings?.()}),$e("bubble").addEventListener("click",()=>Sl())}function hi(i=!0){$e("hud").classList.toggle("hidden",!i),i||($e("banner").classList.add("hidden"),$e("verb-panel").classList.add("hidden"),Ws(),Zr())}function jr(i){return String(i).replace(/(\d+)\s*\/\s*(\d+)/g,'<span class="frac"><span class="n">$1</span><span class="d">$2</span></span>').replace(/\?/g,'<span class="slot">?</span>').replace(/⬚/g,'<span class="slot">◯</span>')}function sd(i,e){$e("banner").classList.remove("hidden","solved"),$e("banner-instruction").textContent=i||"",$e("banner-equation").innerHTML=jr(e||"")}function rd(i){$e("banner").classList.add("solved"),$e("banner-equation").innerHTML=jr(i)}function ad(){const i=$e("banner");i.classList.remove("wiggle"),i.offsetWidth,i.classList.add("wiggle")}function od(){$e("banner").classList.add("hidden")}function ld(i){$e("banana-count").textContent=i}function cd(i){$e("streak-count").textContent=i}function hd(i,e){$e("egg-fill").style.width=Math.min(100,i/e*100)+"%"}function jo(i){const e=$e("combo");i>=2?(e.classList.remove("hidden"),$e("combo-count").textContent=i,e.style.animation="none",e.offsetWidth,e.style.animation=""):e.classList.add("hidden")}function Zo(i){const e=$e("btn-action");e.classList.remove("ready"),i?(e.textContent=i,e.classList.remove("hidden")):e.classList.add("hidden")}function tx(i){const e=$e("btn-action");e.classList.toggle("ready",!!i&&!e.classList.contains("hidden"))}function Lr(i){$e("btn-hint").classList.toggle("hidden",!i)}let Ji=null;function Qo(i){if(!i||i.kind==="none")return!1;const e=$e("model-panel");let t="";if(i.kind==="array"){const{rows:n,cols:s}=i.params;if(s>12){const r=Math.floor(s/10)*10,a=s-r;t=`<div class="mp-caption">${n} × ${s} = ${n} × ${r} + ${n} × ${a}
        = ${n*r} + ${n*a} = <b>${n*s}</b></div>`}else{let r="";for(let a=0;a<n;a++){for(let o=0;o<s;o++)r+=`<div class="mp-cell ${a%2?"alt":""}" style="animation-delay:${(a*s+o)*22}ms"></div>`;r+=`<div class="mp-rowlabel" style="grid-column:${s+1}">${(a+1)*s}</div>`}t=`<div class="mp-grid" style="grid-template-columns:repeat(${s},16px) 30px">${r}</div>
        <div class="mp-caption">${n} × ${s} = <b>${n*s}</b></div>`}}else if(i.kind==="baskets"){const{total:n,baskets:s,quotient:r,remainder:a}=i.params;let o="";for(let l=0;l<s;l++)o+=`<div class="mp-basket">🧺<br><b>${r}</b></div>`;a>0&&(o+=`<div class="mp-basket" style="border-color:var(--pink)">🍓<br><b>+${a}</b></div>`),t=`<div class="mp-baskets">${o}</div>
      <div class="mp-caption">${n} ÷ ${s} = <b>${r}</b>${a?` <span style="color:#c2497a">rest ${a}</span>`:""}</div>`}else if(i.kind==="numberline"){const{n,d:s,lo:r=0,hi:a=1}=i.params;let o="";for(let c=0;c<=s*(a-r);c++)o+=`<div class="mp-tick" style="left:${c/(s*(a-r))*100}%"></div>`;const l=(n/s-r)/(a-r)*100;t=`<div class="mp-line" style="width:280px">${o}
        <div class="mp-mark" style="left:${l}%">🐵</div>
        <div class="mp-endlabel" style="left:0">${r}</div>
        <div class="mp-endlabel" style="left:100%">${a}</div>
      </div>
      <div class="mp-caption" style="margin-top:30px">${jr(`${n}/${s}`)}</div>`}else if(i.kind==="strip"){const{a:n,b:s,op:r}=i.params,a=(l,c)=>{const h=Math.floor(l/10),d=l%10;let u="";for(let f=0;f<h;f++)u+=`<div class="mp-rod ${c}" style="animation-delay:${f*60}ms">10</div>`;for(let f=0;f<d;f++)u+=`<div class="mp-cell ${c}" style="animation-delay:${(h+f)*60}ms"></div>`;return`<div class="mp-pv">${u}<div class="mp-rowlabel">${l}</div></div>`},o=r==="+"?n+s:n-s;t=a(n,"")+`<div class="mp-caption" style="margin:0">${r}</div>`+a(s,r==="+"?"alt":"b")+`<div class="mp-caption">${n} ${r} ${s} = <b>${o}</b></div>`}else return!1;return e.innerHTML=t,e.classList.remove("hidden"),Ji&&clearTimeout(Ji),Ji=setTimeout(Zr,7e3),!0}function Zr(){$e("model-panel").classList.add("hidden"),Ji&&(clearTimeout(Ji),Ji=null)}let zs=null;function dd(i,e,t){const n=$e("bubble");$e("bubble-face").textContent=e,$e("bubble-text").innerHTML=i,$e("bubble-next").classList.toggle("hidden",!t),n.classList.remove("hidden"),n.style.animation="none",n.offsetWidth,n.style.animation=""}function an(i,{ms:e=2400,face:t="🐵",transient:n=!1,onDone:s=null}={}){const r=(Array.isArray(i)?i:[i]).filter(Boolean).map(a=>typeof a=="string"?{html:a}:a);r.length&&(n&&zs||(mi&&(clearTimeout(mi),mi=null),zs=n?null:{pages:r,i:0,face:t,onDone:s},dd(r[0].html,r[0].face||t,!n),n&&(mi=setTimeout(()=>Ws(),e))))}function Sl(){const i=zs;if(!i)return!1;if(J.sfx("click"),i.i++,i.i<i.pages.length){const e=i.pages[i.i];dd(e.html,e.face||i.face,!0)}else Ws(),i.onDone?.();return!0}function nx(){return!!zs}function Ws(){$e("bubble").classList.add("hidden"),zs=null,mi&&(clearTimeout(mi),mi=null)}function Zt(i,e=""){const t=document.createElement("div");t.className="toast "+e,t.innerHTML=i,$e("toasts").appendChild(t),setTimeout(()=>t.remove(),2800)}function ud(i){const e=$e("verb-panel");if(!i){e.classList.add("hidden"),e.innerHTML="";return}if(e.classList.remove("hidden"),i.kind==="array"){const t=i.count>0?`<span style="color:var(--leaf-deep)">${i.rows}</span> × <span style="color:#b06a2c">${i.cols}</span> = ${i.count}`:"🚩",n=i.anchored?i.offBed?"verb.array_offsoil":"verb.array_stretch":"verb.array_plant";e.innerHTML=`
      <div>${t}
        <div class="sub">${z(n)}</div>
      </div>`}else i.kind==="share"&&(e.innerHTML=`
      <div>🥥 ${i.pile} &nbsp;→&nbsp; 🧺 ${i.counts.join(" · ")}</div>
      <div class="sub">${z("verb.share_sub")}</div>`)}const ix=Object.freeze(Object.defineProperty({__proto__:null,advanceBubble:Sl,bubbleOpen:nx,formatEquation:jr,hideBanner:od,hideBubble:Ws,hideModelPanel:Zr,initHud:id,say:an,setAction:Zo,setActionReady:tx,setBananas:ld,setBanner:sd,setCombo:jo,setEgg:hd,setStreak:cd,setVerbPanel:ud,showHintButton:Lr,showHud:hi,showModelPanel:Qo,solveBanner:rd,toast:Zt,wiggleBanner:ad},Symbol.toStringTag,{value:"Module"})),fd=i=>document.getElementById(i),Jo=()=>fd("screens"),pd={bunny:"🐰",duckling:"🐥",kitten:"🐱",piglet:"🐷",redpanda:"🦊",turtle:"🐢",owl:"🦉",dragon:"🐉"},md={cap:"🧢",bow:"🎀",crown:"👑",flowercrown:"🌸",beanie:"🧶",wizard:"🧙‍♂️",pirate:"🏴‍☠️",party:"🥳"},sx={sparkle:"✨",petal:"🌸",bubble:"🫧",star:"⭐"},rx={tide:"🌊",garden:"🌱",stump:"🥥",vines:"🍇"};function dn(){Jo().innerHTML=""}function tn(i){return Jo().innerHTML=`<div class="screen">${i}</div>`,Jo().firstElementChild}function ds(i,e=null){return`<button class="round-btn screen-close" id="scr-back">${e||"✖️"}</button>`}function gd({onStart:i,onParents:e,onDuel:t}){const n=ed(),s=In(),r=[["🌱",z("attract.beat.garden")],["🥥",z("attract.beat.share")],["🥚",z("attract.beat.pets")],["💎",z("attract.beat.gems")],["🌈",z("attract.beat.bloom")]],a=["🐵","Monkey","Grove","🍌"].map((p,T)=>`<span class="lw" style="--d:${T}"><span>${p}</span></span>`).join(" "),o=tn(`
    <div class="attract-shell" role="button" tabindex="0" aria-label="${z("attract.cta")}">
      <div class="attract-top">
        <h1 class="attract-logo">${a}</h1>
        <div class="attract-tagline">${z("attract.tagline")}</div>
      </div>

      <div class="attract-bottom">
        <div class="attract-ticker"><span id="attract-beat"><span class="bi">${r[0][0]}</span>${r[0][1]}</span></div>
        <button class="btn green attract-start" id="attract-start">▶ ${z("attract.cta")}</button>
        <div class="attract-prompt">${z("attract.prompt")}</div>
        <div class="menu-row attract-menu" id="attract-menu">
          <div class="lang-toggle">
            <button class="round-btn ${s.lang==="en"?"active":""}" data-lang="en">🇬🇧</button>
            <button class="round-btn ${s.lang==="nl"?"active":""}" data-lang="nl">🇳🇱</button>
          </div>
          ${n.length>=2?`<button class="btn soft" id="btn-duel">⚔️ ${z("title.duel")}</button>`:""}
          <button class="btn soft" id="btn-parents">${z("title.parents")}</button>
        </div>
      </div>
    </div>
  `);o.classList.add("attract-screen");let l=!1,c=null,h=0;const d=o.querySelector("#attract-beat"),u=setInterval(()=>{h=(h+1)%r.length,d.classList.add("swap"),setTimeout(()=>{l||(d.innerHTML=`<span class="bi">${r[h][0]}</span>${r[h][1]}`,d.classList.remove("swap"))},240)},2600),f=()=>{l||(l=!0,clearInterval(u),window.removeEventListener("keydown",v),c&&cancelAnimationFrame(c))},g=()=>{l||(f(),J.init(),J.setSfx(In().sfx),J.setMusic(In().music),J.sfx("correct"),i())},v=p=>{(p.key===" "||p.key==="Enter")&&(p.preventDefault(),g())},m=()=>{if(l)return;const p=globalThis.navigator?.getGamepads?.()||[];for(const T of p)if(T?.buttons?.[9]?.pressed||T?.buttons?.[0]?.pressed){g();return}c=requestAnimationFrame(m)};window.addEventListener("keydown",v),m(),o.querySelector("#attract-start").addEventListener("click",g),o.querySelector(".attract-shell").addEventListener("click",g),o.querySelector("#attract-menu").addEventListener("click",p=>p.stopPropagation());for(const p of o.querySelectorAll("[data-lang]"))p.addEventListener("click",()=>{J.sfx("click"),Ml(p.dataset.lang),jn(),f(),gd({onStart:i,onParents:e,onDuel:t})});o.querySelector("#btn-parents")?.addEventListener("click",()=>{J.sfx("click"),f(),e()}),o.querySelector("#btn-duel")?.addEventListener("click",()=>{J.sfx("click"),f(),t()})}function el({onPlay:i,onParents:e,onDuel:t}){const n=ed(),s=In(),r=tn(`
    <h1>🐵 Monkey Grove 🍌</h1>
    <div class="tagline">${z("title.tagline")}</div>
    <div class="card">
      <h3>${z("title.who")}</h3>
      <div class="tile-grid" id="profile-grid">
        ${n.map(o=>`
          <div class="tile pressable" data-pid="${o.id}">
            <div class="t-icon">🐵</div>
            <div class="t-name">${Vr(o.name)}</div>
            <div class="t-price">🍌 ${o.bananas} · 🔥 ${o.streak.count}</div>
          </div>`).join("")}
        <div class="tile pressable" id="tile-new">
          <div class="t-icon">✨</div>
          <div class="t-name">${z("title.new_player")}</div>
        </div>
      </div>
      <div id="new-player-row" class="hidden" style="margin-top:12px;display:flex;gap:8px">
        <input id="new-name" maxlength="14" placeholder="${z("title.name_prompt")}"
          style="flex:1;font-family:inherit;font-size:18px;font-weight:700;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto;user-select:text">
        <button class="btn green" id="new-go">${z("title.start")}</button>
      </div>
    </div>
    <div class="menu-row">
      <div class="lang-toggle">
        <button class="round-btn ${s.lang==="en"?"active":""}" data-lang="en">🇬🇧</button>
        <button class="round-btn ${s.lang==="nl"?"active":""}" data-lang="nl">🇳🇱</button>
      </div>
      ${n.length>=2?`<button class="btn soft" id="btn-duel">⚔️ ${z("title.duel")}</button>`:""}
      <button class="btn soft" id="btn-parents">${z("title.parents")}</button>
    </div>
  `);for(const o of r.querySelectorAll("[data-pid]")){o.addEventListener("click",()=>{J.sfx("click"),i(o.dataset.pid)});let l=null;o.addEventListener("pointerdown",()=>{l=setTimeout(()=>{confirm(z("ui.confirm_delete"))&&(Lv(o.dataset.pid),el({onPlay:i,onParents:e,onDuel:t}))},900)});for(const c of["pointerup","pointerleave"])o.addEventListener(c,()=>clearTimeout(l))}r.querySelector("#tile-new").addEventListener("click",()=>{r.querySelector("#new-player-row").classList.remove("hidden"),r.querySelector("#new-name").focus()});const a=()=>{const o=r.querySelector("#new-name").value.trim()||"Monkey",l=Cv(o);J.sfx("correct"),i(l.id,!0)};r.querySelector("#new-go").addEventListener("click",a),r.querySelector("#new-name").addEventListener("keydown",o=>{o.key==="Enter"&&a()});for(const o of r.querySelectorAll("[data-lang]"))o.addEventListener("click",()=>{Ml(o.dataset.lang),jn(),el({onPlay:i,onParents:e,onDuel:t})});r.querySelector("#btn-parents")?.addEventListener("click",e),r.querySelector("#btn-duel")?.addEventListener("click",t)}function ax(i){let e=0;const t=[z("story.1"),z("story.2"),z("story.3")],n=["🦀","🐵","🌴"],s=tn(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center">
      <div id="story-face" style="font-size:64px">${n[0]}</div>
      <div id="story-text" style="font-size:20px;font-weight:700;line-height:1.4;min-height:64px">${t[0]}</div>
    </div>
    <button class="btn green" id="story-next">${z("ui.ok")} →</button>
    <div style="flex:2"></div>
  `);s.querySelector("#story-next").addEventListener("click",()=>{if(J.sfx("click"),e++,e>=t.length){i();return}s.querySelector("#story-face").textContent=n[e],s.querySelector("#story-text").innerHTML=t[e],e===t.length-1&&(s.querySelector("#story-next").textContent=z("title.start")+" 🍌")})}function Dr({onClose:i,onSwitchPlayer:e,onLangChange:t}){const n=In(),s=tn(`
    ${ds()}
    <h2>${z("settings.title")}</h2>
    <div class="card">
      <div class="menu-col">
        <div class="menu-row" style="align-items:center">
          <span style="font-weight:800">${z("settings.lang")}</span>
          <div class="lang-toggle">
            <button class="round-btn ${n.lang==="en"?"active":""}" data-lang="en">🇬🇧</button>
            <button class="round-btn ${n.lang==="nl"?"active":""}" data-lang="nl">🇳🇱</button>
          </div>
        </div>
        <div class="menu-row">
          <button class="btn soft" id="tg-sfx">${n.sfx?"🔊":"🔇"} ${z("settings.sfx")}</button>
          <button class="btn soft" id="tg-music">${n.music?"🎵":"🚫"} ${z("settings.music")}</button>
        </div>
        <button class="btn soft" id="switch-player">👥 ${z("settings.switch_player")}</button>
      </div>
    </div>
  `);s.querySelector("#scr-back").addEventListener("click",i);for(const r of s.querySelectorAll("[data-lang]"))r.addEventListener("click",()=>{Ml(r.dataset.lang),jn(),t?.(),Dr({onClose:i,onSwitchPlayer:e,onLangChange:t})});s.querySelector("#tg-sfx").addEventListener("click",()=>{n.sfx=!n.sfx,J.setSfx(n.sfx),bt(),Dr({onClose:i,onSwitchPlayer:e,onLangChange:t})}),s.querySelector("#tg-music").addEventListener("click",()=>{n.music=!n.music,J.setMusic(n.music),bt(),Dr({onClose:i,onSwitchPlayer:e,onLangChange:t})}),s.querySelector("#switch-player").addEventListener("click",e)}function tl({onClose:i,onChanged:e}){const t=Os(),n=[{id:"hats",label:z("shop.hats"),items:No,owned:t.owned.hats,slot:"hat",icon:a=>md[a.id]||"🎩"},{id:"furs",label:z("shop.furs"),items:Bo,owned:t.owned.furs,slot:"fur",icon:a=>`<span style="display:inline-block;width:30px;height:30px;border-radius:50%;background:${a.palette?.F||"#a8743f"};border:3px solid #fff"></span>`},{id:"trails",label:z("shop.trails"),items:a_,owned:t.owned.trails,slot:"trail",icon:a=>sx[a.id]||"✨"}];let s=tl._tab||"hats";const r=()=>{const a=n.find(l=>l.id===s),o=tn(`
      ${ds()}
      <h2>🛍️ ${z("shop.title")}</h2>
      <div class="chip" style="margin-bottom:10px"><span class="chip-icon">🍌</span>${t.bananas}</div>
      <div class="menu-row" style="margin-bottom:12px">
        ${n.map(l=>`<button class="btn soft" data-tab="${l.id}" ${l.id===s?'style="outline:4px solid var(--sun)"':""}>${l.label}</button>`).join("")}
      </div>
      <div class="card">
        <div class="tile-grid">
          ${a.items.map(l=>{const c=a.owned.includes(l.id),h=t.avatar[a.slot]===l.id;return`<div class="tile pressable ${c?"owned":""} ${h?"equipped":""}" data-item="${l.id}">
              <div class="t-icon">${a.icon(l)}</div>
              <div class="t-name">${z(l.nameKey)}</div>
              <div class="t-price">${h?z("shop.equipped"):c?z("shop.equip"):`🍌 ${l.price}`}</div>
            </div>`}).join("")}
        </div>
      </div>
      <div class="card" style="display:flex;align-items:center;gap:12px">
        <div style="font-size:34px">❄️</div>
        <div style="flex:1"><b>${z("shop.freeze")}</b> (${t.streak.freezes})<div style="font-size:13px;color:var(--ink-soft)">${z("shop.freeze_desc")}</div></div>
        <button class="btn soft" id="buy-freeze">🍌 ${At.streakFreezePrice}</button>
      </div>
    `);o.querySelector("#scr-back").addEventListener("click",i);for(const l of o.querySelectorAll("[data-tab]"))l.addEventListener("click",()=>{tl._tab=s=l.dataset.tab,J.sfx("click"),r()});o.querySelector("#buy-freeze").addEventListener("click",()=>{Jc(t,At.streakFreezePrice)?(t.streak.freezes++,bt(),J.sfx("chest"),r(),e?.()):(J.sfx("boop"),nl(z("shop.too_pricey")))});for(const l of o.querySelectorAll("[data-item]"))l.addEventListener("click",()=>{const c=n.find(u=>u.id===s),h=c.items.find(u=>u.id===l.dataset.item);if(c.owned.includes(h.id))$o(t,c.slot,t.avatar[c.slot]===h.id&&c.slot==="hat"?null:h.id),J.sfx("pick");else if(Jc(t,h.price))Uv(t,c.id,h.id),$o(t,c.slot,h.id),J.sfx("chest");else{J.sfx("boop"),nl(z("shop.too_pricey"));return}r(),e?.()})};r()}function nl(i){const e=document.createElement("div");e.className="toast",e.textContent=i,fd("toasts").appendChild(e),setTimeout(()=>e.remove(),2600)}function il({onClose:i,onChanged:e,onHatch:t}){const n=Os(),s=n.egg.points>=n.egg.goal,r=tn(`
    ${ds()}
    <h2>🐾 ${z("pets.title")}</h2>
    <div class="card" style="display:flex;align-items:center;gap:14px">
      <div style="font-size:48px">${s?"🥚✨":"🥚"}</div>
      <div style="flex:1">
        <div style="font-weight:800">${z(s?"egg.ready":"egg.progress")}</div>
        <div id="egg-bar" style="width:100%;margin-top:6px"><div id="egg-fill" style="width:${Math.min(100,n.egg.points/n.egg.goal*100)}%"></div></div>
      </div>
      ${s?`<button class="btn green" id="hatch-now">${z("egg.hatch")}</button>`:""}
    </div>
    <div class="card">
      <div style="font-size:14px;color:var(--ink-soft);font-weight:700;margin-bottom:8px">${z("pets.choose")}</div>
      <div class="tile-grid">
        ${$i.map(a=>{const o=n.pets.includes(a.id),l=n.avatar.pet===a.id;return`<div class="tile pressable ${o?"owned":"locked"} ${l?"equipped":""}" data-pet="${a.id}">
            <div class="t-rarity">${zh[a.rarity]}</div>
            <div class="t-icon">${o?pd[a.id]||"🐾":"❓"}</div>
            <div class="t-name">${z(o?a.nameKey:"rarity."+a.rarity)}</div>
            ${l?`<div class="t-price">${z("pets.follow")}</div>`:""}
          </div>`}).join("")}
      </div>
    </div>
  `);r.querySelector("#scr-back").addEventListener("click",i),r.querySelector("#hatch-now")?.addEventListener("click",t);for(const a of r.querySelectorAll("[data-pet]"))a.addEventListener("click",()=>{const o=a.dataset.pet;if(!n.pets.includes(o)){J.sfx("boop");return}$o(n,"pet",n.avatar.pet===o?null:o),J.sfx("pick"),il({onClose:i,onChanged:e,onHatch:t}),e?.()})}function ox(i,e){let t=0,n=!1;const s=tn(`
    <div style="flex:1"></div>
    <div id="hatch-egg">🥚</div>
    <div class="tagline" id="hatch-label">${z("egg.hatch")}</div>
    <div style="flex:2"></div>
  `),r=s.querySelector("#hatch-egg");r.addEventListener("click",()=>{n||(t++,J.sfx("egg",{pitch:1+t*.15}),r.classList.add("cracking"),t>=3&&(n=!0,J.sfx("hatch"),r.textContent=i?pd[i.id]||"🐾":"💛",r.classList.remove("cracking"),r.style.animation="chest-bounce .8s cubic-bezier(.34,1.56,.64,1)",s.querySelector("#hatch-label").innerHTML=i?`${z("egg.hatched",{pet:z(i.nameKey)})} ${zh[i.rarity]}`:z("egg.all_pets"),setTimeout(e,2200)))})}function lx({profile:i,status:e,onClose:t,onFund:n}){const s=e.filter(o=>o.state==="built").length,r=(o,l,c,h,d=!1)=>`
    <div class="skill-row" ${d?'style="opacity:.55"':""}>
      <div style="font-size:28px;width:36px;text-align:center">${o}</div>
      <div style="flex:1"><b>${l}</b>
        <div style="font-size:13px;color:var(--ink-soft);line-height:1.3">${c}</div></div>
      ${h}
    </div>`,a=tn(`
    ${ds()}
    <h2>🛠️ ${z("island.title")}</h2>
    <div class="tagline" style="margin-bottom:8px">${z("island.sub")}</div>
    <div class="menu-row" style="margin-bottom:10px">
      <div class="chip"><span class="chip-icon">🔨</span>${z("island.progress",{n:s,total:e.length})}</div>
      <div class="chip"><span class="chip-icon">🍌</span>${i.bananas}</div>
    </div>
    <div class="card">
      ${e.map(o=>{if(o.state==="built")return r(o.emoji,z("build."+o.id),z(`build.${o.id}_desc`),'<div style="font-size:22px">✅</div>');if(o.state==="unlocked"){const l=i.bananas>=o.playerCost;return r(o.emoji,z("build."+o.id),z(`build.${o.id}_desc`),`<button class="btn ${l?"green":"soft"}" data-fund="${o.id}">🍌 ${o.playerCost}</button>`)}return r("❓",z("island.locked_name"),z("island.locked_hint"),"",!0)}).join("")}
    </div>
  `);a.querySelector("#scr-back").addEventListener("click",t);for(const o of a.querySelectorAll("[data-fund]"))o.addEventListener("click",()=>{const l=e.find(c=>c.id===o.dataset.fund);if(i.bananas<l.playerCost){J.sfx("boop"),nl(z("shop.too_pricey"));return}J.sfx("click"),n(l.id)})}function cx(i){let e=0;const t=[z("finale.1"),z("finale.2"),z("finale.3"),z("finale.4")],n=["🦀","🦀","🦀","🐵"],s=tn(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center">
      <div id="story-face" style="font-size:64px">${n[0]}</div>
      <div id="story-text" style="font-size:20px;font-weight:700;line-height:1.4;min-height:64px">${t[0]}</div>
    </div>
    <button class="btn green" id="story-next">${z("ui.ok")} →</button>
    <div style="flex:2"></div>
  `);s.querySelector("#story-next").addEventListener("click",()=>{if(J.sfx("click"),e++,e>=t.length){i();return}s.querySelector("#story-face").textContent=n[e],s.querySelector("#story-text").innerHTML=t[e],e===t.length-1&&(s.querySelector("#story-next").textContent="🎪 "+z("title.start"))})}function hx({report:i,onClose:e}){const t=new Set(i.gems.lit);let n='<div class="gem-cell head">×</div>';for(let r=1;r<=10;r++)n+=`<div class="gem-cell head">${r}</div>`;for(let r=1;r<=10;r++){n+=`<div class="gem-cell head">${r}</div>`;for(let a=1;a<=10;a++){const o=t.has(`${r}x${a}`);n+=`<div class="gem-cell ${o?"lit":""}">${o?"💎":r*a}</div>`}}tn(`
    ${ds()}
    <h2>🌳 ${z("gems.title")}</h2>
    <div class="tagline" style="margin-bottom:8px">${z("gems.sub")}</div>
    <div class="chip" style="margin-bottom:10px">💎 ${z("gems.count",{n:i.gems.lit.length,total:i.gems.total})}</div>
    <div class="card" style="display:flex;justify-content:center"><div id="gem-grid">${n}</div></div>
    <div class="card">
      <h3>${z("gems.skills")}</h3>
      ${Object.entries(i.worlds).map(([r,a])=>`
        <div style="margin-bottom:8px">
          <div style="font-weight:900">${rx[r]} ${z("world."+r)}</div>
          ${a.skills.map(o=>`
            <div class="skill-row">
              <div class="s-name">${z(o.nameKey)}</div>
              <div class="s-bar"><div class="s-fill" style="width:${Math.round(Math.min(1,Math.max(0,(o.rating-400)/600))*100)}%"></div></div>
              <div class="s-star">${o.mastered?"🌟":o.n>0?"🌱":"·"}</div>
            </div>`).join("")}
        </div>`).join("")}
    </div>
  `).querySelector("#scr-back").addEventListener("click",e)}function dx({report:i,profile:e,onClose:t}){tn(`
    ${ds()}
    <h2>${z("parents.title")}</h2>
    <div class="card"><p style="margin:0;font-size:15px;line-height:1.5">${z("parents.body")}</p></div>
    ${e&&i?`
    <div class="card">
      <h3>${z("parents.skills")} — ${Vr(e.name)}</h3>
      ${Object.entries(i.worlds).map(([s,r])=>r.skills.filter(a=>a.n>0).map(a=>`
        <div class="skill-row">
          <div class="s-name">${z(a.nameKey)}</div>
          <div class="s-bar"><div class="s-fill" style="width:${Math.round(a.acc10*100)}%"></div></div>
          <div style="font-size:12px;color:var(--ink-soft);min-width:90px;text-align:right">
            ${Math.round(a.acc10*100)}% · ${z("parents.attempts",{n:a.n})}${a.mastered?" · 🌟":""}
          </div>
        </div>`).join("")).join("")||'<p style="font-size:14px;color:var(--ink-soft)">—</p>'}
    </div>`:""}
  `).querySelector("#scr-back").addEventListener("click",t)}function ux({rewards:i,onNext:e,onHome:t}){const n=tn(`
    <div style="flex:1"></div>
    <h2>${z("result.title")}</h2>
    <div id="result-chest">🎁</div>
    <div class="tagline" id="chest-hint">${z("result.tap_chest")}</div>
    <div class="reward-row hidden" id="reward-row"></div>
    <div class="menu-row hidden" id="result-btns" style="margin-top:18px">
      <button class="btn green" id="res-next">${z("result.next")} →</button>
      <button class="btn soft" id="res-home">🏝️ ${z("result.home")}</button>
    </div>
    <div style="flex:2"></div>
  `),s=n.querySelector("#result-chest");s.addEventListener("click",()=>{if(s.dataset.open)return;s.dataset.open="1",s.textContent="🎉",J.sfx("chest"),n.querySelector("#chest-hint").classList.add("hidden");const r=n.querySelector("#reward-row");r.classList.remove("hidden"),r.innerHTML=i.map(a=>`<div class="reward-item">${a}</div>`).join(""),n.querySelector("#result-btns").classList.remove("hidden")},{once:!1}),n.querySelector("#res-next").addEventListener("click",e),n.querySelector("#res-home").addEventListener("click",t)}function Vr(i){return String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const fx={sparkle:16767334,petal:16757702,bubble:10213119,star:13215487},rh={tide:{pet:"turtle",face:"🐢",nameKey:"helper.turtle"},garden:{pet:"bunny",face:"🐰",nameKey:"helper.bunny"},stump:{pet:"duckling",face:"🐥",nameKey:"helper.duckling"},vines:{pet:"owl",face:"🦉",nameKey:"helper.owl"}};class px{constructor(){this.canvas=document.getElementById("game-canvas"),this.world=new K0(this.canvas),this.profile=null,this.mode="title",this.place=null,this.player=null,this.pet=null,this.particles=null,this.verb=null,this.problem=null,this.crabs=[],this.combo=0,this.solvedInChamber=0,this.chamberIndex=0,this.pendingEcho=!1,this.isEcho=!1,this.currentWorld=null,this.pauseUntil=0,this.problemStart=0,this.usedHint=!1,this.rewards=[],this.rng=new rs(Math.random()*2**31>>>0),this.chamberRng=this.rng,this.trailT=0,this.sessionStart=performance.now(),this.duel=null,this.pickups=[],this.flowToken=0,this.mimiChat=0,this.talkCooldown=0,this.hubWelcomed=!1,this.talkBtn=null,this.gestureHintDone=!1,this.userZoom=null}boot(){Si(),id({onHint:()=>this.useHint(),onAction:()=>this.mode==="hub"?this.hubAction():this.verb?.onAction(),onHome:()=>this.confirmHome(),onSettings:()=>this.openSettings()}),this.bindInput(),this.showTitle();const e=()=>{J.init(),J.setSfx(In().sfx),J.setMusic(In().music),window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e)};window.addEventListener("pointerdown",e),window.addEventListener("keydown",e);let t=performance.now();const n=s=>{requestAnimationFrame(n);let r=Math.min(50,s-t);if(t=s,s<this.pauseUntil){this.world.update(0);return}H_(r),this.update(r),this.world.update(r)};requestAnimationFrame(n),setInterval(()=>{this.profile&&this.mode!=="title"&&document.visibilityState==="visible"&&(this.profile.stats.msPlayed+=1e4,bt())},1e4),window.addEventListener("beforeunload",()=>jn())}showTitle(){this.mode="title",this.flowToken++,this.hubWelcomed=!1,hi(!1),this.clearPlace(),this.player=null,this.pet=null,J.music(null),this.buildAttractIsland();const e=()=>{const n=Os();dx({report:n?oi(n.math):null,profile:n,onClose:()=>this.showTitle()})};gd({onStart:()=>el({onPlay:(n,s)=>{this.profile=Pv(n),this.profile&&(s||!this.profile.flags.introSeen?ax(()=>{this.profile.flags.introSeen=!0,bt(),this.startHub()}):this.startHub())},onParents:e,onDuel:()=>this.startDuelSetup()}),onParents:e,onDuel:()=>this.startDuelSetup()})}buildAttractIsland(){const e={tide:1,garden:1,stump:1,vines:1};this.place=new th(this.world,e,{built:hs.map(d=>d.id),unlocked:[],crabKing:!0,festival:!0},{}),this.particles=new Oa(this.place.group),this.place.fx=this.particles;const t=Os(),n=this.makeMonkeyMesh(t?.avatar);this.player=new nh(n),this.player.headH=.95,this.player.sfx=!1;const s=(this.place.markers.P||[{x:11,z:11}])[0];this.player.setPlace(this.place,s.x,s.z),this.player.onArrive=(d,u)=>this.pet?.notePlayerAt(d,u),this.place.playerAt=()=>this.player?{x:this.player.x,z:this.player.z}:null;const r=t?t.avatar.pet:"bunny",a=r?$i.find(d=>d.id===r):null;if(a){this.pet=new ih(Vn(a.model,.45,null,"pet:"+a.id));const d=this.findFreeNear(s.x,s.z)||s;this.pet.setPlace(this.place,d.x,d.z)}this.world.defaultZoom=1,this.world.follow(this.player.mesh,10.5),this.place.addEntity(new Ga(this.place,this.rng,{butterflies:7,birds:3,clouds:4,playerPos:()=>this.player?.mesh.position}));const o={tide:["8 + 7 = 15","#3f8fb0"],garden:["3 × 4 = 12","#58b368"],stump:["12 ÷ 3 = 4","#b46a3c"],vines:["¾","#9b6bd6"]},l=[];for(const[d,u]of Object.entries(this.place.portals))l.push({x:u.x,z:u.z,label:o[d]});const c=(this.place.markers.N||[])[0];c&&l.push({x:c.x,z:c.z});for(const d of Object.values(this.place.buildSpots||{})){const u=this.findFreeNear(d.x,d.z);u&&l.push({x:u.x,z:u.z})}const h={wait:1400,target:null,last:null};this.place.addEntity({update:d=>{if(this.mode!=="title"||!this.player||this.player.hopping||this.player.queue.length||(h.wait-=d,h.wait>0))return;if(h.target){const f=this.player.mesh.position.clone().add(new D(0,.9,0));this.particles?.emit(f,14,{speed:1.4,up:2.2,life:750,spread:.3}),h.target.label&&zo(this.world,f,h.target.label[0],h.target.label[1]),this.pet?.celebrate(),h.target=null,h.wait=1600+this.rng.float()*2400;return}const u=this.rng.pick(l.filter(f=>f!==h.last))||l[0];u&&this.player.pathTo(u.x,u.z)?(h.target=u,h.last=u,h.wait=350):h.wait=900}})}startHub(){this.mode="hub",this.flowToken++,this.isEcho=!1,this.duel=null,dn(),this.buildHub(),hi(!0),od(),Zo(null),this.talkBtn=null,ud(null),Lr(!1),this.refreshHudCounts(),J.music("island"),this.maybeGestureHint();const e=Fv(this.profile);e.kind==="extended"?Zt(z("hub.streak_extended",{n:this.profile.streak.count})):e.kind==="frozen"&&Zt(z("hub.streak_frozen",{n:this.profile.streak.count})),e.gift&&xt(800,()=>{const r=6+Math.min(14,this.profile.streak.count*2);Zt(`🎁 ${z("hub.daily_gift")} +${r} 🍌`),Xi(this.profile,r),Ss(this.profile,2),this.refreshHudCounts(),J.sfx("chest")});const t=[];e.kind==="reset"&&this.profile.stats.days>1&&t.push(z("hub.streak_reset")),this.hubWelcomed||(this.hubWelcomed=!0,t.push(z("hub.welcome",{name:Vr(this.profile.name)}))),t.push(this.mimiLine()),an(t);const n=sv(this.profile,Dv());if(n.length){for(const r of n)r.kind==="bananas"?Xi(this.profile,r.n):r.kind==="egg"&&Ss(this.profile,r.n);bt(),this.refreshHudCounts(),n.forEach((r,a)=>xt(1700+a*1100,()=>{Zt(r.kind==="bananas"?z("island.daily_fruit",{n:r.n}):z("island.daily_bread")),J.sfx("coin")}))}const s=ev(this.profile,oi(this.profile.math));if(s.length){tv(this.profile,s.map(a=>a.id)),bt();const r=this.flowToken;xt(2600,()=>{if(r===this.flowToken){J.sfx("sparkle");for(const a of s)Zt(z("island.new_blueprint",{name:z("build."+a.id)}),"gem");an(`<b>Mimi:</b> ${z("island.mimi_worktable")}`)}})}}buildHub(){this.clearPlace();const e=oi(this.profile.math),t={};for(const[l,c]of Object.entries(e.worlds))t[l]=c.pct;const n=Pr(this.profile,e),s=this.profile.flags.portalStages||(this.profile.flags.portalStages={});this.place=new th(this.world,t,{built:n.filter(l=>l.state==="built").map(l=>l.id),unlocked:n.filter(l=>l.state==="unlocked").map(l=>l.id),crabKing:!!this.profile.flags.festivalDone,festival:!!this.profile.flags.festivalDone},s),this.particles=new Oa(this.place.group),this.place.fx=this.particles,this.celebrateGateGrowth(t,s),this.spawnAvatar();const r=(this.place.markers.P||[{x:11,z:11}])[0];this.player.setPlace(this.place,r.x,r.z),this.spawnPet(r),this.world.defaultZoom=this.sceneZoom("hub"),this.world.follow(this.player.mesh,13,{x:this.place.size.w*.5,z:this.place.size.d*.5}),this.player.onArrive=(l,c)=>this.hubArrive(l,c),this.player.onBump=(l,c)=>this.hubBump(l,c),this.place.playerAt=()=>this.player?{x:this.player.x,z:this.player.z}:null;const a=n.filter(l=>l.state==="built").map(l=>l.id),o=(t.tide+t.garden+t.stump+t.vines)/4||0;this.place.addEntity(new Ga(this.place,this.rng,{butterflies:2+Math.round(o*4)+(a.includes("garden")?2:0),birds:1+(a.length>=3?1:0)+(this.profile.flags.festivalDone?1:0),clouds:2,playerPos:()=>this.player?.mesh.position}))}celebrateGateGrowth(e,t){const n=this.flowToken;let s=0;for(const[r,a]of Object.entries(this.place.gates||{})){const o=z0(e[r]??0);o<=(t[r]??0)||(t[r]=o,xt(1500+s++*1100,()=>{n===this.flowToken&&(a.celebrate(o),Zt(z("portal.stage"+o,{name:z("world."+r)}),"gem"))}))}s&&bt()}hubArrive(e,t){if(this.mode!=="hub"||!this.place?.portals)return;this.pet?.notePlayerAt(e,t);for(const[s,r]of Object.entries(this.place.portals))if(r.x===e&&r.z===t){J.sfx("door"),this.enterWorld(s);return}const n=(this.place.markers.N||[])[0];n&&n.x===e&&n.z===t&&this.openPets()}hubTap(e,t){const n=this.place.markers,s=a=>(a||[]).some(o=>o.x===e&&o.z===t);if(s(n.T))return this.openGems(),!0;if(s(n.O))return this.openShop(),!0;if(s(n.N))return this.openPets(),!0;const r=this.hubNpcAt(e,t,!0);if(r)return this.hubTalk(r),!0;for(const[a,o]of Object.entries(this.place.buildSpots||{}))if(!(o.x!==e||o.z!==t))return o.state==="unlocked"?(this.openIsland(),!0):o.state==="built"?(J.sfx(a==="stage"?"gong":"sparkle"),this.particles?.confetti(this.place.worldPos(e,t,.8),18),!0):!1;return!1}spawnAvatar(){this.player=new nh(this.makeMonkeyMesh(this.profile.avatar)),this.player.headH=.95}makeMonkeyMesh(e){const t=Bo.find(r=>r.id===e?.fur)||Bo[0],n=Vn(Br.monkey,.85,t.palette,"char:monkey"),s=e?.hat?No.find(r=>r.id===e.hat):null;if(s){const r=vi(s.model,{cacheKey:"hat:"+s.id}),a=n.userData.voxelScale;r.scale.setScalar(a),r.position.y=(r_+(s.dy||0))*a,n.add(r)}return n}refreshAvatar(){if(!this.player||!this.place)return;const{x:e,z:t}=this.player;this.player.mesh.removeFromParent();const s=this.makeMonkeyMesh(this.profile.avatar);this.player.mesh=s,this.player.baseScale=s.scale.x||1,this.player.setPlace(this.place,e,t),this.respawnPet()}spawnPet(e){const t=this.profile.avatar.pet;if(!t){this.pet=null;return}const n=$i.find(a=>a.id===t);if(!n){this.pet=null;return}const s=Vn(n.model,.45,null,"pet:"+n.id);this.pet=new ih(s);const r=this.findFreeNear(e.x,e.z)||e;this.pet.setPlace(this.place,r.x,r.z)}respawnPet(){this.pet&&(this.pet.mesh.removeFromParent(),this.pet=null),this.player&&this.spawnPet({x:this.player.x,z:this.player.z})}findFreeNear(e,t){for(const[n,s]of[[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,-1]]){const r=this.place.cellAt(e+n,t+s);if(r&&r.walk)return{x:e+n,z:t+s}}return null}enterWorld(e){this.currentWorld=e,this.chamberIndex=0,this.combo=0,this.runChamber()}runChamber(){this.mode="chamber",this.flowToken++,dn(),this.solvedInChamber=0,this.rewards=[],this.chamberIndex++;let e;if(this.duel)e=this.duel.nextProblem();else{const t=this.isEcho?{echo:!0}:{world:this.currentWorld};e=Mr(Ki(this.profile.math,t),this.profile.math,t)}this.buildChamber(e),hi(!0),Lr(!0),this.presentProblem(e),J.music("chamber"),this.maybeGestureHint(),this.isEcho&&Zt("✨ "+z("play.echo_door"))}buildChamber(e){this.clearPlace();const t=e.kind,n=Ko[t]||Ko.fetch;this.chamberRng=this.duel?new rs(this.duel.seed*131+this.duel.round*17+5):this.rng;const s=zv(this.chamberRng.pick(n),this.chamberRng);this.place=new td(this.world,this.currentWorld||"garden"),this.place.buildFrom(s,{seed:this.chamberRng.int(1,1e9)}),Gv(this.place,this.chamberRng),this.particles=new Oa(this.place.group),this.place.addEntity(new Ga(this.place,this.chamberRng,{butterflies:2})),this.spawnAvatar();const r=(this.place.markers.P||[{x:2,z:2}])[0];if(this.player.setPlace(this.place,r.x,r.z),this.spawnPet(r),this.world.defaultZoom=this.sceneZoom(t),this.world.frameBoard(new D(0,0,0),this.place.size.w,this.place.size.d,this.player.mesh),this.player.onArrive=(o,l)=>{this.pet?.notePlayerAt(o,l),this.collectPickupAt(o,l),this.verb?.onArrive(o,l)},this.player.onBump=(o,l)=>this.verb?.onBump(o,l),this.altar=null,(this.place.markers.A||[]).length){const o=this.place.markers.A[0];this.altar=new Q_(this.place,o.x,o.z),this.place.addEntity(this.altar),this.place.cellAt(o.x,o.z).walk=!1}this.crabs=[];for(const o of this.place.markers.c||[]){const l=this.patrolReach(o,"x"),c=this.patrolReach(o,"z"),h=l.len>=c.len?"x":"z",d=h==="x"?l:c;if(d.len<2)continue;const u=new Z_(this.place,o.x,o.z,h,d.min,d.max,1.3+this.rng.float()*.7);this.crabs.push(u),this.place.addEntity(u)}this.helper=null,this.helpKind=null;const a=(this.place.markers.M||[])[0];if(a){const o=rh[this.currentWorld]||rh.garden,l=$i.find(u=>u.id===o.pet),c=Vn(l.model,.62,null,"helper:"+o.pet);c.position.copy(this.place.worldPos(a.x,a.z)),this.place.group.add(c),this.place.cellAt(a.x,a.z).walk=!1;const h={...o,x:a.x,z:a.z,mesh:c,t:0,excite:0},d=c.position.y;this.place.addEntity({update:u=>{h.t+=u/1e3,h.excite=Math.max(0,h.excite-u/900),c.position.y=d+Math.abs(Math.sin(h.t*(2+h.excite*5)))*(.05+h.excite*.28)}}),this.helper=h}}helperSay(e,t={}){if(!this.helper){an(e,t);return}an(`<b>${z(this.helper.nameKey)}:</b> ${e}`,{...t,face:this.helper.face})}helperTap(){this.helper&&(J.sfx("click"),this.helper.excite=1,this.helperSay(z(`helper.cheer.${1+Math.floor(Math.random()*4)}`),{transient:!0,ms:3600}))}hubNpcAt(e,t,n=!1){const s=this.place.mimiPos;if(s&&(s.x===e&&s.z===t||n&&this.place.mimiPrev?.x===e&&this.place.mimiPrev?.z===t))return{kind:"mimi",x:s.x,z:s.z};const r=(this.place.npcs||[]).find(a=>a.x===e&&a.z===t);return r?{kind:"npc",npc:r,x:r.x,z:r.z}:null}hubNpcNear(){if(!this.player||!this.place?.mimiPos)return null;for(const[e,t]of[[0,1],[1,0],[-1,0],[0,-1]]){const n=this.hubNpcAt(this.player.x+e,this.player.z+t);if(n)return n}return null}hubTalk(e){J.sfx("click");const t=e.x-this.player.x,n=e.z-this.player.z;if(this.player.face(t,n),e.kind==="mimi"){this.place.mimi&&(t||n)&&(this.place.mimi.rotation.y=Math.atan2(-t,-n));const s=this.mimiNext(),r=this.flowToken;an(s.html,{onDone:s.key==="mimi.build_ready"?()=>{r===this.flowToken&&this.mode==="hub"&&this.openIsland()}:null})}else{const s=e.npc;(t||n)&&(s.mesh.rotation.y=Math.atan2(-t,-n));const r=z(`npc.${s.id}.${1+Math.floor(Math.random()*2)}`);an(`<b>${z("npc."+s.id)}:</b> ${r}`,{face:s.face})}}hubAction(){const e=this.hubNpcNear();e&&this.hubTalk(e)}hubBump(e,t){if(this.mode!=="hub"||!this.place?.mimiPos)return;const n=this.hubNpcAt(e,t);n&&(performance.now()<this.talkCooldown||(this.talkCooldown=performance.now()+900,this.hubTalk(n)))}_mimiPick(e){const t=oi(this.profile.math),n=Yv(this.profile,t,Pr(this.profile,t)),s=n[this.mimiChat%n.length];e&&this.mimiChat++,this.profile.flags.mimiMet||(this.profile.flags.mimiMet=!0,bt());const r={...s.vars||{}};return s.buildId&&(r.name=z("build."+s.buildId)),s.worldId&&(r.world=z("world."+s.worldId)),{key:s.key,html:`<b>Mimi:</b> ${z(s.key,r)}`}}mimiNext(){return this._mimiPick(!0)}mimiLine(){return this._mimiPick(!1).html}canHost(e){const t=this.place.markers;return e==="fetch"?(t.s||[]).length+(t.p||[]).length>=4&&(t.A||[]).length>0:e==="array"?(t.o||[]).length>0:e==="numberline"?(t.V||[]).length>=8:e==="share"?(t.B||[]).length>=2&&(t.m||[]).length>0:!1}patrolReach(e,t){const n=o=>{let l=0;for(let c=1;c<12;c++){const h=t==="x"?e.x+o*c:e.x,d=t==="z"?e.z+o*c:e.z,u=this.place.cellAt(h,d);if(!u||!u.walk||u.h!==this.place.cellAt(e.x,e.z).h||"AsPpBmMVoTON".includes(u.ch))break;l=c}return l},s=n(-1),r=n(1),a=t==="x"?e.x:e.z;return{min:a-s,max:a+r,len:s+r}}presentProblem(e){this.problem=e,this.usedHint=!1,this.problemStart=performance.now(),Zr(),Ws(),this.verb?.destroy();const t=sh[e.kind]||sh.fetch;this.verb=new t({world:this.world,place:this.place,player:this.player,particles:this.particles,altar:this.altar,hud:ix,problem:e,rng:this.chamberRng,resolve:(s,r)=>this.onResolve(s,r),onTreat:(s,r,a)=>this.onTreat(s,r,a),onCarry:s=>this.setCrabsFrozen(s),hintUsed:()=>{this.usedHint=!0}}),this.verb.begin();const n=this.promptVars(e);if(sd(z(e.prompt.key,n),e.equation),this.helper&&e.kind!==this.helpKind){this.helpKind=e.kind;const s=this.flowToken;xt(800,()=>{s===this.flowToken&&this.helperSay(z("helper."+e.kind))})}e.scaffold===0&&xt(700,()=>this.verb?.showModel())}promptVars(e){const t={...e.meta||{},...e.model?.params||{},...e.prompt?.vars||{}};return t.n!==void 0&&t.d!==void 0&&(t.frac=`${t.n}/${t.d}`),t.answer=e.answer,t}onResolve(e,t){const n=performance.now()-this.problemStart,s=Ev(this.profile.math,this.problem,{correct:e,usedHint:this.usedHint,ms:n});this.profile.stats[e?"correct":"wrong"]++,bt(),e?this.onCorrect(s,t):this.onWrong(s,t)}onCorrect(e,t){this.combo++,this.solvedInChamber++,this.duel&&this.duel.scoreCorrect(this.combo),this.pauseUntil=performance.now()+110,J.sfx("correct"),J.comboTone(this.combo),rd(this.problem.equation.replace(/[?⬚]/,String(this.problem.answer))),jo(this.combo),this.pet?.celebrate();const n=this.player.mesh.position.clone().add(new D(0,.8,0));this.particles.confetti(n,30);const s=this.rng.int(At.bananasPerCorrect[0],At.bananasPerCorrect[1]),r=Math.min(10,(this.combo-1)*At.comboBonus);let a=s+r;this.profile.avatar.pet&&(a=Math.round(a*(1+At.petBananaBonus))),Ba(this.world,n,"🍌",document.getElementById("banana-count"),Math.min(a,8),()=>J.sfx("coin")),Xi(this.profile,a);const o=Ss(this.profile,At.eggPerCorrect);this.refreshHudCounts(),an(`<b>${Nv()}</b>`,{transient:!0,ms:1800});for(const c of e.newGems||[])Zt("💎 "+z("result.gem",{fact:c.replace("x"," × ")}),"gem"),J.sfx("sparkle");e.masteredSkill&&(Zt("🌟 "+z("result.mastered",{skill:z("skill."+e.masteredSkill)})),J.sfx("bloom"));const l=this.flowToken;xt(1500,()=>{if(l!==this.flowToken)return;const c=this.duel?At.problemsPerChamber:this.isEcho?At.echoProblems:At.problemsPerChamber;if(this.solvedInChamber>=c||this.duel&&!this.duel.hasMore())this.completeChamber(o);else{let h;if(this.duel)h=this.duel.nextProblem();else{const d=this.isEcho?{echo:!0,kind:this.problem.kind}:{world:this.currentWorld,kind:this.problem.kind};h=Mr(Ki(this.profile.math,d),this.profile.math,d)}h.kind!==this.problem.kind&&!this.canHost(h.kind)&&(this.canHost("fetch")?h=h.choices?{...h,kind:"fetch"}:Mr(Ki(this.profile.math,{world:h.world,skill:h.skillId,kind:"fetch"}),this.profile.math,{world:h.world}):h={...h,kind:this.problem.kind}),this.presentProblem(h)}})}onWrong(e,t){this.combo=0,this.duel&&this.duel.scoreWrong(),jo(0),J.sfx("boop"),ad();const n=this.promptVars(this.problem);if(t.arrayInfo){const s=t.arrayInfo,r=s.tag==="shape"?"ex.array_shape":"ex.array_count";this.helperSay(z(r,{...n,value:s.n}))}else{let s="ex."+(t.tag==="random"?"near_miss":t.tag);s==="ex.off_by_table"&&this.problem.explain?.key!=="ex.off_by_table"&&(s=this.problem.explain.key);const r=z(s,{...n,...this.problem.explain?.vars||{}});this.helperSay(r===s?z(this.problem.explain?.key||"ex.generic",n):r)}xt(450,()=>{this.verb&&!this.verb.showModel()&&Qo(this.problem.model)})}onTreat(e,t,n){e==="bananas"?(Ba(this.world,n,"🍌",document.getElementById("banana-count"),t,()=>J.sfx("coin")),Xi(this.profile,t)):e==="berry"&&(Ba(this.world,n,"🍓",document.getElementById("egg-fill").parentElement,t,()=>J.sfx("egg")),Ss(this.profile,t*At.eggPerBerry),this.profile.stats.berries+=t),this.refreshHudCounts()}setCrabsFrozen(e){for(const t of this.crabs)t.frozen=e}completeChamber(e){this.profile.stats.chambers++,this.verb?.destroy(),this.verb=null,J.music("celebrate");const t=At.bananasChestBase+this.rng.int(0,6)+Math.min(12,this.chamberIndex*2);Xi(this.profile,t);const n=[`🍌 +${t}`];if(this.rng.chance(At.hatRandomChestChance)){const r=No.filter(a=>!this.profile.owned.hats.includes(a.id));if(r.length){const a=this.rng.pick(r);this.profile.owned.hats.push(a.id),n.push(`${md[a.id]||"🎩"} ${z(a.nameKey)}!`)}}const s=this.rng.int(1,3);if(Ss(this.profile,s),n.push(`🥚 +${s}`),bt(),this.refreshHudCounts(),this.pendingEcho=!this.isEcho&&this.rng.chance(At.echoDoorChance),this.isEcho,this.isEcho=!1,this.duel){this.duel.chamberDone();return}hi(!1),ux({rewards:n,onNext:()=>this.afterResult(()=>{this.pendingEcho&&(this.pendingEcho=!1,this.isEcho=!0),this.runChamber()}),onHome:()=>this.afterResult(()=>this.startHub())})}afterResult(e){const t=this.profile;if(t.egg.points>=t.egg.goal){const n=kv(t,$i);ox(n,()=>{n&&!t.avatar.pet&&(t.avatar.pet=n.id),this.refreshHudCounts(),e()})}else e()}useHint(){if(!this.verb||!this.problem)return;this.usedHint=!0,this.verb.hintShown=!0,J.sfx("click"),this.verb.showModel()||Qo(this.problem.model),this.helperSay(z("hint.look"),3600)}openGems(){J.sfx("click"),hx({report:oi(this.profile.math),onClose:()=>dn()})}openShop(){J.sfx("click"),tl({onClose:()=>{dn(),this.refreshAvatar(),this.refreshHudCounts()},onChanged:()=>this.refreshHudCounts()})}openPets(){J.sfx("click"),il({onClose:()=>{dn(),this.respawnPet()},onChanged:()=>{},onHatch:()=>this.afterResult(()=>{il({onClose:()=>{dn(),this.respawnPet()},onChanged:()=>{},onHatch:()=>{}})})})}openIsland(){J.sfx("click");const e=oi(this.profile.math);lx({profile:this.profile,status:Pr(this.profile,e),onClose:()=>dn(),onFund:t=>this.fundBuild(t)})}fundBuild(e){const t=J_(e);if(!t)return;const n=()=>{if(!iv(this.profile,t,oi(this.profile.math))){J.sfx("boop");return}jn(),dn(),this.celebrateBuild(t)};t.finale&&!this.profile.flags.festivalDone?cx(()=>{Zt(z("island.crab_pays",{n:t.contribution})),n()}):n()}celebrateBuild(e){e.finale&&(this.profile.flags.festivalDone=!0,bt()),this.buildHub(),hi(!0),this.refreshHudCounts();const t=this.place.buildSpots[e.id],n=this.flowToken;if(t){const s=this.findFreeNear(t.x,t.z);s&&(this.player.setPlace(this.place,s.x,s.z),this.respawnPet());const r=this.place.worldPos(t.x,t.z,.9);J.sfx("bloom"),xt(250,()=>this.particles?.confetti(r,44)),xt(850,()=>this.particles?.confetti(r.clone().add(new D(.4,.3,-.3)),28))}e.finale?(J.music("celebrate"),xt(1200,()=>{n===this.flowToken&&an(z("finale.festival",{name:Vr(this.profile.name)}),{face:"🦀"})}),xt(1700,()=>{n!==this.flowToken||!t||this.particles?.confetti(this.place.worldPos(t.x,t.z,1.5),60)}),xt(4200,()=>{n===this.flowToken&&J.music("island")})):xt(1300,()=>{if(n!==this.flowToken)return;const s=[`<b>Mimi:</b> ${z("island.built_say")}`];e.npc&&s.push({html:`<b>${z("npc."+e.id)}:</b> ${z(`npc.${e.id}.hello`)}`,face:e.npc.face}),an(s)})}openSettings(){Dr({onClose:()=>dn(),onSwitchPlayer:()=>this.showTitle(),onLangChange:()=>{}})}confirmHome(){if(this.duel){this.duel=null,this.verb?.destroy(),this.verb=null,this.showTitle();return}if(this.mode==="hub"){this.showTitle();return}this.verb?.destroy(),this.verb=null,this.startHub()}refreshHudCounts(){ld(this.profile.bananas),cd(this.profile.streak.count),hd(this.profile.egg.points,this.profile.egg.goal)}debugChamber(e,t){const n=Mr(Ki(this.profile.math,{skill:e,kind:t}),this.profile.math,{});return this.currentWorld=n.world,this.mode="chamber",dn(),this.solvedInChamber=0,this.rewards=[],this.buildChamber(n),hi(!0),Lr(!0),this.presentProblem(n),{kind:n.kind,eq:n.equation,skill:n.skillId}}async startDuelSetup(){const{showDuelSetup:e}=await Td(async()=>{const{showDuelSetup:t}=await import("./duel-BogyE7_N.js");return{showDuelSetup:t}},[]);e(this)}bindInput(){window.addEventListener("keydown",c=>{if(this.mode==="title"||document.querySelector("#screens .screen"))return;const h=c.code;if((h==="Space"||h==="Enter")&&Sl()){c.preventDefault();return}if(this.verb?.onKey?.(h)){c.preventDefault();return}const d={ArrowUp:[0,-1],KeyW:[0,-1],ArrowDown:[0,1],KeyS:[0,1],ArrowLeft:[-1,0],KeyA:[-1,0],ArrowRight:[1,0],KeyD:[1,0]};d[h]?(c.preventDefault(),this.player?.tryStep(d[h][0],d[h][1])):h==="Space"||h==="Enter"?(c.preventDefault(),this.mode==="hub"?this.hubAction():this.verb?.onAction()):h==="KeyE"&&this.useHint()});const e=new Map;let t=null,n=!1,s=!1,r=null;const a=()=>{let c=0,h=0;for(const u of e.values())c+=u.x,h+=u.y;const d=e.size||1;return{x:c/d,y:h/d}},o=()=>{const c=[...e.values()];return c.length<2?0:Math.hypot(c[0].x-c[1].x,c[0].y-c[1].y)};this.canvas.addEventListener("pointerdown",c=>{if(e.set(c.pointerId,{x:c.clientX,y:c.clientY}),e.size===1)t={x:c.clientX,y:c.clientY},n=!1,s=!1;else if(e.size===2){const h=a();r={dist:o()||1,zoom:this.world.zoom,cx:h.x,cy:h.y},s=!0}}),this.canvas.addEventListener("pointermove",c=>{if(e.has(c.pointerId)&&(e.set(c.pointerId,{x:c.clientX,y:c.clientY}),this.mode!=="title")){if(e.size>=2&&r){const h=o();h>0&&this.world.setZoom(r.zoom*(h/r.dist));const d=a();this.world.panByPixels(d.x-r.cx,d.y-r.cy),r.cx=d.x,r.cy=d.y,this.userZoom=this.world.zoom}else if(e.size===1&&t){const h=c.clientX-t.x,d=c.clientY-t.y;Math.hypot(h,d)>14&&(n=!0)}}});const l=c=>{const h=t,d=e.delete(c.pointerId);if(e.size<2&&(r=null),e.size>0)return;t=null;const u=n,f=s;if(n=!1,s=!1,!(!d||this.mode==="title"||f))if(u){const g=c.clientX-(h?.x??c.clientX),v=c.clientY-(h?.y??c.clientY);if(Math.hypot(g,v)>30){const m=Math.atan2(v,g),p=Math.round(m/(Math.PI/2)),w={0:[1,0],1:[0,1],2:[-1,0],"-1":[0,-1],"-2":[-1,0]}[p]||[0,0];this.player?.tryStep(w[0],w[1])}}else{const g=this.pickCell(c.clientX,c.clientY);if(!g||this.mode==="hub"&&this.hubTap(g.x,g.z))return;if(this.helper&&g.x===this.helper.x&&g.z===this.helper.z){this.helperTap();return}if(this.verb?.onCellTap(g.x,g.z,!1))return;this.player?.pathTo(g.x,g.z)}};this.canvas.addEventListener("pointerup",l),this.canvas.addEventListener("pointercancel",l),this.canvas.addEventListener("wheel",c=>{this.mode!=="title"&&(c.preventDefault(),this.world.zoomBy(c.deltaY<0?1.1:1/1.1),this.userZoom=this.world.zoom)},{passive:!1})}maybeGestureHint(){if(!(!Uo||this.gestureHintDone)){this.gestureHintDone=!0;try{if(localStorage.getItem("monkeymath.gestureHint"))return;localStorage.setItem("monkeymath.gestureHint","1")}catch{}xt(1200,()=>Zt(z("hint.pinch")))}}mobileZoom(e){const t=(window.innerHeight||1)/(window.innerWidth||1)>1.35;return!Uo||!t?1:e==="hub"?Bc.hub:e==="numberline"?1:Bc.chamber}sceneZoom(e){return this.userZoom??this.mobileZoom(e)}pickCell(e,t){const n=this.world.pick(e,t);if(!n)return null;const s=n.object?.userData?.gridList;if(s&&n.instanceId!==void 0){const l=s[n.instanceId];if(l)return{x:l.x,z:l.z}}if(n.object===this.place?.floor&&n.instanceId!==void 0){const l=this.place.floorList[n.instanceId];if(l)return{x:l.x,z:l.z}}const r=n.point,a=Math.floor(r.x/Ut+this.place.size.w/2),o=Math.floor(r.z/Ut+this.place.size.d/2);return this.place.cellAt(a,o)?{x:a,z:o}:null}update(e){if(!this.place)return;if(this.place.update(e),this.player?.update(e),this.pet?.update(e),this.particles?.update(e),this.verb?.update?.(e),this.mode==="hub"&&this.player&&(this.talkBtnT=(this.talkBtnT||0)+e,this.talkBtnT>140)){this.talkBtnT=0;const n=this.hubNpcNear()?"💬":null;n!==this.talkBtn&&(this.talkBtn=n,Zo(n))}if(this.mode==="chamber"&&this.player&&!this.player.locked){for(const n of this.crabs)if(!(n.frozen||n.cooldown>0)&&n.x===this.player.x&&n.z===this.player.z){n.cooldown=2200;const s=Math.min(At.crabSteal,this.profile.bananas);if(s>0){Xi(this.profile,-s),this.refreshHudCounts(),zo(this.world,this.player.mesh.position.clone(),`-${s} 🍌`,"#c2497a");for(let a=0;a<s;a++){const o=this.player.x+this.rng.int(-3,3),l=this.player.z+this.rng.int(-3,3),c=this.place.cellAt(o,l),h=c&&c.walk&&!(o===this.player.x&&l===this.player.z)?{x:o,z:l}:this.findFreeNear(this.player.x,this.player.z);h&&this.spawnBananaPickup(h.x,h.z)}}J.sfx("crab"),this.world.shake(.12),an(z("play.crab_yoink",{n:s}),{transient:!0,ms:2200,face:"🦀"});const r=this.findFreeNear(this.player.x,this.player.z);r&&this.player.pathTo(r.x,r.z)}}const t=this.profile?.avatar.trail;t&&this.player?.hopping&&this.particles&&(this.trailT+=e,this.trailT>70&&(this.trailT=0,this.particles.emit(this.player.mesh.position.clone().add(new D(0,.3,0)),2,{colors:[fx[t]||16767334],speed:.4,up:.8,life:500,spread:.1})))}clearPlace(){this.player&&(this.player.stop(),this.player.locked=!0),this.verb?.destroy?.(),this.verb=null,this.problem=null,this.crabs=[],this.pickups=[],this.helper=null,this.helpKind=null,this.place&&(this.place.dispose(),this.place=null),this.particles=null}spawnBananaPickup(e,t){const n=Tt(pt.bananas,.32,"prop:bananas",{castShadow:!1}),s=this.place.worldPos(e,t,.08);n.position.copy(s),this.place.group.add(n);const r={x:e,z:t,mesh:n,t:Math.random()*6,update:a=>{r.t+=a/1e3,n.position.y=s.y+.06+Math.abs(Math.sin(r.t*3))*.07,n.rotation.y+=a*.002}};this.place.addEntity(r),this.pickups.push(r)}collectPickupAt(e,t){const n=this.pickups.findIndex(a=>a.x===e&&a.z===t);if(n<0)return;const s=this.pickups.splice(n,1)[0];this.place.group.remove(s.mesh);const r=this.place.entities.indexOf(s);r>=0&&this.place.entities.splice(r,1),this.onTreat("bananas",1,s.mesh.position.clone())}}const _d=new px;_d.boot();window.__game=_d;export{At as B,rs as R,J as a,Mr as b,dv as c,Vr as e,Ki as n,ed as p,Ev as r,Pv as s,z as t};
