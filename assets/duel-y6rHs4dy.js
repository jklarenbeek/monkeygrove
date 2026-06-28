import{J as b,t as i,e as a,W as w,i as u,n as x,K as S,L as q,l as E,M as p,N as f,O as L}from"./index-DkGm53dO.js";const C=d=>document.getElementById(d),m=()=>C("screens"),$=3;function v(d){return m().innerHTML=`<div class="screen opaque">${d}</div>`,m().firstElementChild}function _(d,s,t=$){const o=[];for(let r=0;r<t;r++){const l=q(),e=new x(d*31+r*7+1),n=[];for(let c=0;c<E.problemsPerChamber;c++){const k=c>0?{world:s,rng:e,kind:n[0].kind}:{world:s,rng:e};let h=p(f(l,k),l,{world:s,rng:e});c>0&&h.kind!==n[0].kind&&(h=p(f(l,{world:s,rng:e,kind:"fetch",skill:h.skillId}),l,{world:s,rng:e})),n.push(h),L(l,h,{correct:!0,usedHint:!1,ms:4e3})}o.push(n)}return o}class g{constructor(s,t,o,r,{soloChallenge:l=!1,code:e=null}={}){this.game=s,this.world=o,this.seed=r,this.code=e,this.solo=l,this.players=t.map(n=>({id:n,name:b().find(c=>c.id===n)?.name||"?",score:0})),this.roundsProblems=_(r,o),this.round=0,this.turn=0,this.queue=[],this.rng=new x(r^24301)}start(){this._interstitial()}_interstitial(){const s=this.players[this.turn];v(`
      <div style="flex:1"></div>
      <h2>⚔️ ${i("duel.title")}</h2>
      <div class="card" style="text-align:center">
        <div style="font-size:42px">${this.turn===0?"🐵":"🙈"}</div>
        <div style="font-size:22px;font-weight:900;margin:8px 0">${i("duel.turn",{name:a(s.name)})}</div>
        <div style="color:var(--ink-soft);font-weight:700">${i("duel.round",{n:this.round+1,total:this.roundsProblems.length})}</div>
        <div style="margin-top:8px">${this.players.map(o=>`<span style="margin:0 8px;font-weight:900">${a(o.name)}: 🍌 ${o.score}</span>`).join("")}</div>
      </div>
      <button class="btn green" id="duel-go">${i("title.start")}</button>
      <div style="flex:2"></div>
    `).querySelector("#duel-go").addEventListener("click",()=>{u.sfx("click"),this._playTurn()})}_playTurn(){const s=this.players[this.turn];this.queue=this.roundsProblems[this.round].slice();const t=this.game;t.profile=S(s.id),t.duel=this,t.currentWorld=this.world,t.combo=0,t.chamberIndex=this.round,t.refreshHudCounts(),t.runChamber()}nextProblem(){return this.queue.shift()}hasMore(){return this.queue.length>0}scoreCorrect(s){const t=this.players[this.turn];t.score+=10+Math.min(10,(s-1)*2)}scoreWrong(){}chamberDone(){const s=this.game;if(s.duel=null,!this.solo&&this.turn<this.players.length-1){this.turn++;const t=this.players[this.turn];v(`
        <div style="flex:1"></div>
        <div class="card" style="text-align:center">
          <div style="font-size:42px">🔄</div>
          <div style="font-size:22px;font-weight:900">${i("duel.pass",{name:a(t.name)})}</div>
        </div>
        <button class="btn green" id="duel-go">${i("ui.ok")}</button>
        <div style="flex:2"></div>
      `).querySelector("#duel-go").addEventListener("click",()=>this._interstitial());return}if(this.turn=0,this.round++,this.round<this.roundsProblems.length){this._interstitial();return}this._finish()}_finish(){const s=this.game;let t;if(this.solo){const r=this.players[0];t=`
        <div style="flex:1"></div>
        <h2>🏁 ${i("duel.title")}</h2>
        <div class="card" style="text-align:center">
          <div style="font-size:48px">🍌</div>
          <div style="font-size:26px;font-weight:900">${a(r.name)}: ${r.score}</div>
          ${this.code?`<div style="margin-top:10px;font-weight:700;color:var(--ink-soft)">${i("duel.code")}: <b>${this.code}</b></div>`:""}
        </div>
        <button class="btn green" id="duel-done">🏝️ ${i("result.home")}</button>
        <div style="flex:2"></div>`}else{const[r,l]=this.players,e=r.score===l.score?null:r.score>l.score?r:l;u.sfx("chest"),t=`
        <div style="flex:1"></div>
        <h2>🏆 ${i("duel.title")}</h2>
        <div class="card" style="text-align:center">
          <div style="font-size:48px">${e?"🏆":"🤝"}</div>
          <div style="font-size:22px;font-weight:900;margin:8px 0">
            ${e?i("duel.winner",{name:a(e.name),score:e.score}):i("duel.tie")}
          </div>
          <div>${this.players.map(n=>`<span style="margin:0 8px;font-weight:800">${a(n.name)}: 🍌 ${n.score}</span>`).join("")}</div>
        </div>
        <button class="btn green" id="duel-done">${i("ui.ok")}</button>
        <div style="flex:2"></div>`}v(t).querySelector("#duel-done").addEventListener("click",()=>s.showTitle())}}function y(d,s){return`${{tide:"T",garden:"G",stump:"S",vines:"V"}[d]||"G"}${$}-${s.toString(36).toUpperCase()}`}function z(d){const s=String(d).trim().toUpperCase().match(/^([TGSV])(\d)-([0-9A-Z]+)$/);if(!s)return null;const t={T:"tide",G:"garden",S:"stump",V:"vines"}[s[1]],o=parseInt(s[3],36);return!t||!Number.isFinite(o)?null:{world:t,seed:o}}function M(d){const s=b();let t=[],o="garden";const r=()=>{const l=v(`
      <button class="round-btn screen-close" id="duel-back">✖️</button>
      <h2>⚔️ ${i("duel.title")}</h2>
      <div class="tagline">${i("duel.sub")}</div>
      <div class="card">
        <h3>${i("duel.pick2")}</h3>
        <div class="tile-grid">
          ${s.map(e=>`
            <div class="tile pressable ${t.includes(e.id)?"equipped":""}" data-pid="${e.id}">
              <div class="t-icon">🐵</div><div class="t-name">${a(e.name)}</div>
            </div>`).join("")}
        </div>
      </div>
      <div class="card">
        <div class="menu-row">
          ${Object.entries(w).map(([e,n])=>`<button class="btn soft" data-world="${e}" ${e===o?'style="outline:4px solid var(--sun)"':""}>${n} ${i("world."+e)}</button>`).join("")}
        </div>
      </div>
      <div class="menu-row">
        <button class="btn green" id="duel-start" ${t.length===2?"":"disabled"}>⚔️ ${i("title.start")}</button>
      </div>
      <div class="card">
        <h3>🔗 ${i("duel.code")}</h3>
        <div style="font-size:14px;color:var(--ink-soft);font-weight:700;margin-bottom:8px">${i("duel.code_desc")}</div>
        <div class="menu-row">
          <button class="btn soft" id="code-make">✨ ${i("duel.code")}</button>
          <input id="code-in" placeholder="${i("duel.enter_code")}" maxlength="12"
            style="font-family:inherit;font-size:17px;font-weight:800;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto;user-select:text;width:170px;text-transform:uppercase">
          <button class="btn soft" id="code-play">▶️ ${i("duel.play_code")}</button>
        </div>
        <div id="code-out" style="margin-top:10px;font-size:24px;font-weight:900;text-align:center"></div>
      </div>
    `);l.querySelector("#duel-back").addEventListener("click",()=>d.showTitle());for(const e of l.querySelectorAll("[data-pid]"))e.addEventListener("click",()=>{const n=e.dataset.pid;t=t.includes(n)?t.filter(c=>c!==n):[...t,n].slice(-2),u.sfx("click"),r()});for(const e of l.querySelectorAll("[data-world]"))e.addEventListener("click",()=>{o=e.dataset.world,u.sfx("click"),r()});l.querySelector("#duel-start").addEventListener("click",()=>{const e=Math.random()*1073741824>>>0;new g(d,t,o,e).start()}),l.querySelector("#code-make").addEventListener("click",()=>{const e=Math.random()*1073741824>>>0,n=y(o,e);l.querySelector("#code-out").textContent=n,l.querySelector("#code-in").value=n,u.sfx("sparkle")}),l.querySelector("#code-play").addEventListener("click",()=>{const e=z(l.querySelector("#code-in").value);if(!e){u.sfx("boop");return}const n=t[0]||d.profile?.id||s[0]?.id;n&&new g(d,[n],e.world,e.seed,{soloChallenge:!0,code:y(e.world,e.seed)}).start()})};r()}export{g as Duel,_ as generateDuelProblems,y as makeCode,z as parseCode,M as showDuelSetup};
