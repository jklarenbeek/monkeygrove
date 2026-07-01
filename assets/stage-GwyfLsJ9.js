import{r as k,t as i,e as h,M as q,N as b,O as L,P as E,a as w,c as $,g as P,b as z,d as x,Q as C,S as A,n as R,U as _,V as M,W as N,p as S,i as p,j as T,l as m,x as W,X as B,y as G,z as j,D as I}from"./index-CE1XsoGm.js";function K({songs:n,gradeLabel:t,onPlay:e,onExit:r}){const s=k(`
    <div class="business-panel">
      <div class="business-head">
        <h2>${i("stage.songs")}</h2>
        <button class="round-btn" id="stage-close" aria-label="${h(i("nav.close"))}">✖️</button>
      </div>
      <div class="card">
        ${n.map(o=>`
          <div class="skill-row">
            <div class="t-icon">${h(o.face)}</div>
            <div class="s-name">${i(o.titleKey)}<div class="tagline">${i(o.titleKey+".desc")}</div></div>
            ${o.unlocked?`<button class="btn green" data-song="${h(o.id)}">${i("stage.play")}</button>`:`<div class="curriculum-count">🔒 ${i("stage.locked",{grade:t(o.unlocksStage)})}</div>`}
          </div>`).join("")}
      </div>
    </div>
  `,"business-screen");for(const o of s.querySelectorAll("[data-song]"))o.addEventListener("click",()=>e?.(o.dataset.song));s.querySelector("#stage-close").addEventListener("click",r)}function v(n,{round:t,action:e,submit:r,onSubmit:s,onClose:o}){n.querySelector("#scr-back").addEventListener("click",o);const c=n.querySelector("#stage-feedback"),l=a=>{c.textContent=a,c.hidden=!1},g=()=>i("stage.hint."+t.mode);return n.querySelector("#stage-hint").addEventListener("click",()=>l(g())),n.querySelector("#stage-done").addEventListener("click",()=>{const a=s?.(r());a&&a.correct===!1&&!a.handled&&l(`${i("stage.almost")} ${g()}`)}),{reveal:l}}function y(n,t,e){return k(`
    ${L(null,"←")}
    <h2>${i("stage.song."+n)}</h2>
    <div class="card">
      <p class="business-prompt">${h(t)}</p>
      ${e}
      <div class="stage-feedback business-feedback" id="stage-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="stage-hint">💡</button>
        <button class="btn green" id="stage-done">${i("stage.done")}</button>
      </div>
    </div>
  `)}function O({round:n,onNote:t,onSubmit:e,onClose:r}){const s={sequence:[]},o=y("echo",i("stage.echo.prompt"),`
    <div class="menu-row">
      <button class="btn soft" id="stage-listen">${i("stage.listen")}</button>
      <button class="btn soft" id="stage-clear">${i("stage.clear")}</button>
    </div>
    <div class="stage-pads">
      ${q.map(a=>`
        <button class="stage-pad" data-pad="${a.id}" style="--pad:${a.color}" aria-label="pad ${a.id+1}"></button>`).join("")}
    </div>
    <div class="tagline"><span id="stage-echo-count">0</span> / ${n.length}</div>
  `),c=[...o.querySelectorAll("[data-pad]")],l=o.querySelector("#stage-echo-count"),g=a=>{const d=c[a];d&&(d.classList.add("lit"),setTimeout(()=>d.classList.remove("lit"),240))};o.querySelector("#stage-listen").addEventListener("click",()=>{n.sequence.forEach((a,d)=>setTimeout(()=>{g(a),t?.(a)},180+d*520))}),o.querySelector("#stage-clear").addEventListener("click",()=>{s.sequence=[],l.textContent="0"});for(const a of c)a.addEventListener("click",()=>{const d=Number(a.dataset.pad);s.sequence.push(d),l.textContent=String(s.sequence.length),g(d),t?.(d)});v(o,{round:n,action:s,submit:()=>({sequence:[...s.sequence]}),onSubmit:e,onClose:r})}function D({round:n,onNote:t,onSubmit:e,onClose:r}){const s=new Set,o=y("count",i("stage.count.prompt",{step:n.step}),`
    <div class="stage-beats">
      ${Array.from({length:n.beats},(c,l)=>l+1).map(c=>`
        <button class="stage-beat" data-beat="${c}">${c}</button>`).join("")}
    </div>
  `);for(const c of o.querySelectorAll("[data-beat]"))c.addEventListener("click",()=>{const l=Number(c.dataset.beat);s.has(l)?(s.delete(l),c.classList.remove("equipped")):(s.add(l),c.classList.add("equipped"),t?.(l%4))});v(o,{round:n,action:s,submit:()=>({beats:[...s]}),onSubmit:e,onClose:r})}function H(n,t){if(n<=0)return"0";if(n>=t)return i("stage.beat.whole");const e=((r,s)=>{for(;s;)[r,s]=[s,r%s];return r})(n,t);return`${n/e}/${t/e}`}function F({round:n,onNote:t,onSubmit:e,onClose:r}){const s={tiles:[]},o=y("beat",i("stage.beat.prompt"),`
    <div class="stage-bar"><div class="stage-bar-fill" id="stage-bar-fill" style="width:0%"></div></div>
    <div class="business-price">${i("stage.beat.total")}: <span id="stage-beat-total">0</span> / ${i("stage.beat.whole")}</div>
    <div class="stage-notes">
      ${n.tiles.map(a=>`
        <button class="tile pressable" data-note="${h(a)}">
          <div class="t-icon">${h(b[a].icon)}</div>
          <div class="t-name">${b[a].num}/${b[a].den}</div>
        </button>`).join("")}
    </div>
    <div class="menu-row"><button class="btn soft" id="stage-clear">${i("stage.clear")}</button></div>
  `),c=o.querySelector("#stage-beat-total"),l=o.querySelector("#stage-bar-fill"),g=()=>{const a=s.tiles.reduce((d,f)=>d+b[f].units,0);c.textContent=H(a,n.target),l.style.width=`${Math.min(100,Math.round(a/n.target*100))}%`};for(const a of o.querySelectorAll("[data-note]"))a.addEventListener("click",()=>{s.tiles.push(a.dataset.note),g(),t?.(s.tiles.length)});o.querySelector("#stage-clear").addEventListener("click",()=>{s.tiles=[],g()}),v(o,{round:n,action:s,submit:()=>({tiles:[...s.tiles]}),onSubmit:e,onClose:r})}const Q=["#############","#...........#","#..1111111..#","#..1111111..#","#..1111111..#","#...........#","#...........#","#...........#","#...........#","#############"],U={x:6,z:3},u={x:4,z:3},V=[{x:3,z:2},{x:9,z:2},{x:3,z:4},{x:9,z:4}];class Y extends E{constructor(t,e={}){super(t,"hub"),this.buildFrom(Q,{seed:e.seed??808}),this.gong={...U},this._textSprites=[],this._placeStage()}_textSprite(t,e,r,s){const o=w(e,r);return o.position.copy(s),this.group.add(o),this._textSprites.push({key:t,sprite:o,opts:r,position:s.clone()}),o}refreshLanguage(){for(const t of this._textSprites){const e=w(i(t.key),t.opts);e.position.copy(t.position),this.group.add(e),this.group.remove(t.sprite),t.sprite.material?.map?.dispose?.(),t.sprite.material?.dispose?.(),t.sprite=e}}_placeStage(){const t=$(x.gong,1,"prop:gong");t.position.copy(this.worldPos(this.gong.x,this.gong.z)),this.group.add(t),this.addGroundShadow?.(this.gong.x,this.gong.z,{radius:.4});const e=this.cellAt(this.gong.x,this.gong.z);e&&(e.walk=!1),this.gongMesh=t,this.world.pickables?.push(t);for(const a of V){const d=$(x.lantern,.5,"prop:lantern");d.position.copy(this.worldPos(a.x,a.z)),this.group.add(d);const f=this.cellAt(a.x,a.z);f&&(f.walk=!1)}const r=P("kitten"),s=z(r.full,.66,null,"creature:kitten:f"),o=this.worldPos(u.x,u.z);s.position.copy(o),s.rotation.y=Math.PI,this.group.add(s),this.world.pickables?.push(s);const c=this.cellAt(u.x,u.z);c&&(c.walk=!1),this.kiki=s;const l=o.y,g={t:0,update:a=>{g.t+=a/1e3,s.position.y=l+Math.abs(Math.sin(g.t*1.9))*.05}};this.addEntity(g),this._textSprite("build.stage",i("build.stage"),{bg:"#fff8ecdd",scale:.6,fontSize:42},this.worldPos(6,1,1.3))}isGong(t,e){return Math.abs(this.gong.x-t)+Math.abs(this.gong.z-e)<=1||Math.abs(u.x-t)+Math.abs(u.z-e)<=1}gongWorld(t=.9){return this.worldPos(this.gong.x,this.gong.z,t)}}class J{constructor(t){this.game=t,this.songId=null,this.round=null,this.roundSeq=0}state(){return C(this.game.profile)}gradeLabel(t){return i("curriculum.nl_po.stage."+t)}open(){this.showSongs()}showSongs(){K({songs:A(this.game.profile.curriculum),gradeLabel:t=>this.gradeLabel(t),onPlay:t=>this.playSong(t),onExit:()=>this.leave()})}playSong(t){const e=this.state(),r=e.level?.[t]||0,s=new R(`stage:${this.game.profile.id}:${t}:${e.currentDay}:${this.roundSeq++}`);this.songId=t,this.round=_(t,this.game.profile.curriculum,{rng:s,level:r}),this.showRound()}showRound(){if(!this.round){this.showSongs();return}const t={round:this.round,onNote:e=>p.pad(e),onSubmit:e=>this.grade(e),onClose:()=>this.showSongs()};this.round.mode==="echo"?O(t):this.round.mode==="count"?D(t):F(t)}grade(t){const e=this.state(),r=M(this.round,t);return N(e,this.songId,r.correct),S(),r.correct?(p.sfx("gong"),p.sfx("correct"),this.reward(),this.maybeStageWonder(),T(i("stage.correct")),this.game.afterResult(()=>this.playSong(this.songId)),{correct:!0}):(p.sfx("boop"),{correct:!1})}reward(){const t=this.game.rng.int(m.stageBananaReward[0],m.stageBananaReward[1]);W(this.game.profile,t),B(this.game.profile,m.eggPerCorrect),S(),this.game.refreshHudCounts();const e=this.game.place;e?.fx&&e.gongWorld&&e.fx.emit(e.gongWorld(),22,{colors:[16765286,16752048,9358054,10545327],speed:1.8,up:2.6,life:900})}maybeStageWonder(){const t=this.game.profile,e=G("music",t.flags?.wondersSeen||[]);e&&(t.flags.wondersSeen=t.flags.wondersSeen||[],t.flags.wondersSeen.push(e.id),S(),j(`✨ ${i(e.bodyKey)}`,{face:"🐱"}))}leave(){return I(),this.game.startHub(),!0}stageTap(t,e){return this.game.mode!=="stage"||!this.game.place?.isGong?.(t,e)?!1:(p.sfx("gong"),this.showSongs(),!0)}refreshLanguage(){this.game.place?.refreshLanguage?.();const t=document.querySelector("#screens .screen");t&&(t.querySelector("#stage-close")?this.showSongs():this.round&&t.querySelector("#stage-done")&&this.showRound())}}export{J as StageController,Y as StagePlace};
