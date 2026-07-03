import{F as P,b as c,o as f,ak as q,al as p,am as L,P as E,K as x,N as k,Q as $,g as _,m as M,r as w,an as z,ao as C,R as A,ap as B,aq as R,ar as T,as as N,at as W,a1 as m,c as h,Z as G,B as S,a7 as I,au as K,a9 as F,a8 as O,ac as j}from"./index-CHI1JioF.js";import{m as D}from"./mount-D4Uj2jCQ.js";function H({songs:o,gradeLabel:t,onPlay:s,onExit:i}){const n=P(`
    <div class="business-panel">
      <div class="business-head">
        <h2>${c("stage.songs")}</h2>
        <button class="round-btn" id="stage-close" aria-label="${f(c("nav.close"))}">✖️</button>
      </div>
      <div class="card">
        ${o.map(a=>`
          <div class="skill-row">
            <div class="t-icon">${f(a.face)}</div>
            <div class="s-name">${c(a.titleKey)}<div class="tagline">${c(a.titleKey+".desc")}</div></div>
            ${a.unlocked?`<button class="btn green" data-song="${f(a.id)}">${c("stage.play")}</button>`:`<div class="curriculum-count">🔒 ${c("stage.locked",{grade:t(a.unlocksStage)})}</div>`}
          </div>`).join("")}
      </div>
    </div>
  `,"business-screen");for(const a of n.querySelectorAll("[data-song]"))a.addEventListener("click",()=>s?.(a.dataset.song));n.querySelector("#stage-close").addEventListener("click",i)}function v(o,{round:t,action:s,submit:i,onSubmit:n,onClose:a}){o.querySelector("#scr-back").addEventListener("click",a);const l=o.querySelector("#stage-feedback"),g=e=>{l.textContent=e,l.hidden=!1},d=()=>c("stage.hint."+t.mode);return o.querySelector("#stage-hint").addEventListener("click",()=>g(d())),o.querySelector("#stage-done").addEventListener("click",()=>{const e=n?.(i());e&&e.correct===!1&&!e.handled&&g(`${c("stage.almost")} ${d()}`)}),{reveal:g}}function y(o,t,s){return P(`
    ${L(null,"←")}
    <h2>${c("stage.song."+o)}</h2>
    <div class="card">
      <p class="business-prompt">${f(t)}</p>
      ${s}
      <div class="stage-feedback business-feedback" id="stage-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="stage-hint">💡</button>
        <button class="btn green" id="stage-done">${c("stage.done")}</button>
      </div>
    </div>
  `)}function Y({round:o,onNote:t,onSubmit:s,onClose:i}){const n={sequence:[]},a=y("echo",c("stage.echo.prompt"),`
    <div class="menu-row">
      <button class="btn soft" id="stage-listen">${c("stage.listen")}</button>
      <button class="btn soft" id="stage-clear">${c("stage.clear")}</button>
    </div>
    <div class="stage-pads">
      ${q.map(e=>`
        <button class="stage-pad" data-pad="${e.id}" style="--pad:${e.color}" aria-label="pad ${e.id+1}">
          <span class="stage-pad-label">${e.id+1}</span>
        </button>`).join("")}
    </div>
    <div class="tagline"><span id="stage-echo-count">0</span> / ${o.length}</div>
  `),l=[...a.querySelectorAll("[data-pad]")],g=a.querySelector("#stage-echo-count"),d=e=>{const r=l[e];r&&(r.classList.add("lit"),setTimeout(()=>r.classList.remove("lit"),240))};a.querySelector("#stage-listen").addEventListener("click",()=>{o.sequence.forEach((e,r)=>setTimeout(()=>{d(e),t?.(e)},180+r*520))}),a.querySelector("#stage-clear").addEventListener("click",()=>{n.sequence=[],g.textContent="0"});for(const e of l)e.addEventListener("click",()=>{const r=Number(e.dataset.pad);n.sequence.push(r),g.textContent=String(n.sequence.length),d(r),t?.(r)});v(a,{round:o,action:n,submit:()=>({sequence:[...n.sequence]}),onSubmit:s,onClose:i})}function Z({round:o,onNote:t,onCount:s,onSubmit:i,onClose:n}){const a=new Set,l=y("count",c("stage.count.prompt",{step:o.step}),`
    <div class="stage-beats">
      ${Array.from({length:o.beats},(e,r)=>r+1).map(e=>`
        <button class="stage-beat" data-beat="${e}">${e}</button>`).join("")}
    </div>
    <div class="menu-row"><button class="btn soft" id="stage-count-play">▶ ${c("stage.count.play")}</button></div>
  `),g=[...l.querySelectorAll("[data-beat]")];for(const e of g)e.addEventListener("click",()=>{const r=Number(e.dataset.beat);a.has(r)?(a.delete(r),e.classList.remove("equipped")):(a.add(r),e.classList.add("equipped"),t?.(r%4))});let d=!1;l.querySelector("#stage-count-play").addEventListener("click",()=>{if(d)return;d=!0;let e=0;const r=()=>{if(e>0&&g[e-1]?.classList.remove("counting"),e>=o.beats||!l.isConnected){d=!1;return}e+=1,g[e-1]?.classList.add("counting"),s?.(e,e%o.step===0),setTimeout(r,380)};r()}),v(l,{round:o,action:a,submit:()=>({beats:[...a]}),onSubmit:i,onClose:n})}function Q(o,t){const a=o/t;if(a>=1)return'<svg class="note-glyph" viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="11" fill="#f6a609" stroke="#00000022"/></svg>';const l=a*2*Math.PI,g=(13+11*Math.sin(l)).toFixed(2),d=(13-11*Math.cos(l)).toFixed(2);return`<svg class="note-glyph" viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="11" fill="#fff" stroke="#00000022"/><path d="M13,13 L13,2 A11,11 0 ${a>.5?1:0},1 ${g},${d} Z" fill="#f6a609"/></svg>`}function J(o,t){if(o<=0)return"0";if(o>=t)return c("stage.beat.whole");const s=((i,n)=>{for(;n;)[i,n]=[n,i%n];return i})(o,t);return`${o/s}/${t/s}`}function U({round:o,onNote:t,onSubmit:s,onClose:i}){const n={tiles:[]},a=y("beat",c("stage.beat.prompt"),`
    <div class="stage-bar"><div class="stage-bar-fill" id="stage-bar-fill" style="width:0%"></div></div>
    <div class="business-price">${c("stage.beat.total")}: <span id="stage-beat-total">0</span> / ${c("stage.beat.whole")}</div>
    <div class="stage-notes">
      ${o.tiles.map(e=>`
        <button class="tile pressable" data-note="${f(e)}">
          <div class="t-icon">${Q(p[e].num,p[e].den)}</div>
          <div class="t-name">${p[e].num}/${p[e].den}</div>
        </button>`).join("")}
    </div>
    <div class="menu-row"><button class="btn soft" id="stage-clear">${c("stage.clear")}</button></div>
  `),l=a.querySelector("#stage-beat-total"),g=a.querySelector("#stage-bar-fill"),d=()=>{const e=n.tiles.reduce((r,b)=>r+p[b].units,0);l.textContent=J(e,o.target),g.style.width=`${Math.min(100,Math.round(e/o.target*100))}%`};for(const e of a.querySelectorAll("[data-note]"))e.addEventListener("click",()=>{n.tiles.push(e.dataset.note),d(),t?.(n.tiles.length)});a.querySelector("#stage-clear").addEventListener("click",()=>{n.tiles=[],d()}),v(a,{round:o,action:n,submit:()=>({tiles:[...n.tiles]}),onSubmit:s,onClose:i})}const V=["#############","#...........#","#..1111111..#","#..1111111..#","#..1111111..#","#...........#","#...........#","#...........#","#...........#","#############"],X={x:6,z:3},u={x:4,z:3},tt=[{x:3,z:2},{x:9,z:2},{x:3,z:4},{x:9,z:4}];class et extends E{constructor(t,s={}){super(t,"hub"),this.buildFrom(V,{seed:s.seed??808}),this.gong={...X},this._textSprites=[],this._placeStage()}_textSprite(t,s,i,n){const a=x(s,i);return a.position.copy(n),this.group.add(a),this._textSprites.push({key:t,sprite:a,opts:i,position:n.clone()}),a}refreshLanguage(){for(const t of this._textSprites){const s=x(c(t.key),t.opts);s.position.copy(t.position),this.group.add(s),this.group.remove(t.sprite),t.sprite.material?.map?.dispose?.(),t.sprite.material?.dispose?.(),t.sprite=s}}_placeStage(){const t=k($.gong,1,"prop:gong");t.position.copy(this.worldPos(this.gong.x,this.gong.z)),this.group.add(t),this.addGroundShadow?.(this.gong.x,this.gong.z,{radius:.4});const s=this.cellAt(this.gong.x,this.gong.z);s&&(s.walk=!1),this.gongMesh=t,this._gongBase=t.scale.clone(),this._gongPulse=0,this._kikiPulse=0,this.registerPickable(t,this.gong,{anchorY:.55,magnet:32}),this.addEntity({update:e=>{const r=e/1e3;this._gongPulse=Math.max(0,this._gongPulse-r*2.6),this._kikiPulse=Math.max(0,this._kikiPulse-r*2.4),this.gongMesh.scale.copy(this._gongBase).multiplyScalar(1+this._gongPulse*.18)}});for(const e of tt){const r=k($.lantern,.5,"prop:lantern");r.position.copy(this.worldPos(e.x,e.z)),this.group.add(r);const b=this.cellAt(e.x,e.z);b&&(b.walk=!1)}const i=_("kitten"),n=M(i.full,.66,null,"creature:kitten:f"),a=this.worldPos(u.x,u.z);n.position.copy(a),n.rotation.y=Math.PI,this.group.add(n),this.registerPickable(n,u,{anchorY:.35,magnet:30});const l=this.cellAt(u.x,u.z);l&&(l.walk=!1),this.kiki=n;const g=a.y,d={t:0,update:e=>{d.t+=e/1e3,n.position.y=g+Math.abs(Math.sin(d.t*1.9))*.05+this._kikiPulse*.14}};this.addEntity(d),this._textSprite("build.stage",c("build.stage"),{bg:"#fff8ecdd",scale:.6,fontSize:42},this.worldPos(6,1,1.3))}isGong(t,s){return Math.abs(this.gong.x-t)+Math.abs(this.gong.z-s)<=1||Math.abs(u.x-t)+Math.abs(u.z-s)<=1}gongWorld(t=.9){return this.worldPos(this.gong.x,this.gong.z,t)}pulseStage(){w()||(this._gongPulse=1,this._kikiPulse=1),this.fx&&this.gongWorld&&this.fx.emit(this.gongWorld(.9),w()?2:5,{colors:[16765286,16774048,16769126],speed:.5,up:1.2,life:520,spread:.32})}}class nt{constructor(t){this.game=t,this.songId=null,this.round=null,this.roundSeq=0}state(){return z(this.game.profile)}gradeLabel(t){return c("curriculum.nl_po.stage."+t)}enter(){const t=this.game;return t.stage=this,D(t,()=>new et(t.world,{seed:808}),{spawn:s=>({x:6,z:Math.max(1,s.size.d-2)}),onBump:(s,i)=>this.stageTap(s,i)}),this.open(),!0}onTap(t,s){return this.game.mode!=="stage"?!1:this.stageTap(t,s)}open(){this.showSongs()}showSongs(){H({songs:C(this.game.profile.curriculum),gradeLabel:t=>this.gradeLabel(t),onPlay:t=>this.playSong(t),onExit:()=>this.leave()})}playSong(t){const s=this.state(),i=s.level?.[t]||0,n=new A(`stage:${this.game.profile.id}:${t}:${s.currentDay}:${this.roundSeq++}`);this.songId=t,this.round=B(t,this.game.profile.curriculum,{rng:n,level:i}),this.showRound()}showRound(){if(!this.round){this.showSongs();return}const t={round:this.round,onNote:s=>{h.pad(s),this.game.place?.pulseStage?.()},onCount:(s,i)=>{h.count(s,i),i&&this.game.place?.pulseStage?.()},onSubmit:s=>this.grade(s),onClose:()=>this.showSongs()};this.round.mode==="echo"?Y(t):this.round.mode==="count"?Z(t):U(t)}grade(t){const s=this.state(),i=R(this.round,t);T(s,this.songId,i.correct);const n=N[this.songId]?.reinforceSkill;return n&&i.correct&&W(this.game.profile.math,n,!0,{now:Date.now()}),m(),i.correct?(h.sfx("gong"),h.sfx("correct"),this.reward(),this.maybeStageWonder(),G(c("stage.correct")),this.game.afterResult(()=>this.playSong(this.songId)),{correct:!0}):(h.sfx("boop"),{correct:!1})}reward(){const t=this.game.rng.int(S.stageBananaReward[0],S.stageBananaReward[1]);I(this.game.profile,t),K(this.game.profile,S.eggPerCorrect),m(),this.game.refreshHudCounts();const s=this.game.place;s?.fx&&s.gongWorld&&s.fx.emit(s.gongWorld(),22,{colors:[16765286,16752048,9358054,10545327],speed:1.8,up:2.6,life:900})}maybeStageWonder(){if(this.songId!=="count")return;const t=this.game.profile,s=F("music",t.flags?.wondersSeen||[]);s&&(t.flags.wondersSeen=t.flags.wondersSeen||[],t.flags.wondersSeen.push(s.id),m(),O(`✨ ${c(s.bodyKey)}`,{face:"🐱"}))}leave(){return j(),this.game.startHub(),!0}stageTap(t,s){return this.game.mode!=="stage"||!this.game.place?.isGong?.(t,s)?!1:(h.sfx("gong"),this.showSongs(),!0)}refreshLanguage(){this.game.place?.refreshLanguage?.();const t=document.querySelector("#screens .screen");t&&(t.querySelector("#stage-close")?this.showSongs():this.round&&t.querySelector("#stage-done")&&this.showRound())}}export{nt as StageController,et as StagePlace};
