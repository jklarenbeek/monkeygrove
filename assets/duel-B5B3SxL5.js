import{p as y,t as i,e as a,a as u,R as x,s as w,c as S,B as q,b as p,n as f,r as E}from"./index-tCbZPCjo.js";const C=d=>document.getElementById(d),m=()=>C("screens"),L={tide:"🌊",garden:"🌱",stump:"🥥",vines:"🍇"},$=3;function v(d){return m().innerHTML=`<div class="screen opaque">${d}</div>`,m().firstElementChild}function _(d,s,t=$){const l=[];for(let r=0;r<t;r++){const o=S(),e=new x(d*31+r*7+1),n=[];for(let c=0;c<q.problemsPerChamber;c++){const k=c>0?{world:s,rng:e,kind:n[0].kind}:{world:s,rng:e};let h=p(f(o,k),o,{world:s,rng:e});c>0&&h.kind!==n[0].kind&&(h=p(f(o,{world:s,rng:e,kind:"fetch",skill:h.skillId}),o,{world:s,rng:e})),n.push(h),E(o,h,{correct:!0,usedHint:!1,ms:4e3})}l.push(n)}return l}class g{constructor(s,t,l,r,{soloChallenge:o=!1,code:e=null}={}){this.game=s,this.world=l,this.seed=r,this.code=e,this.solo=o,this.players=t.map(n=>({id:n,name:y().find(c=>c.id===n)?.name||"?",score:0})),this.roundsProblems=_(r,l),this.round=0,this.turn=0,this.queue=[],this.rng=new x(r^24301)}start(){this._interstitial()}_interstitial(){const s=this.players[this.turn];v(`
      <div style="flex:1"></div>
      <h2>⚔️ ${i("duel.title")}</h2>
      <div class="card" style="text-align:center">
        <div style="font-size:42px">${this.turn===0?"🐵":"🙈"}</div>
        <div style="font-size:22px;font-weight:900;margin:8px 0">${i("duel.turn",{name:a(s.name)})}</div>
        <div style="color:var(--ink-soft);font-weight:700">${i("duel.round",{n:this.round+1,total:this.roundsProblems.length})}</div>
        <div style="margin-top:8px">${this.players.map(l=>`<span style="margin:0 8px;font-weight:900">${a(l.name)}: 🍌 ${l.score}</span>`).join("")}</div>
      </div>
      <button class="btn green" id="duel-go">${i("title.start")}</button>
      <div style="flex:2"></div>
    `).querySelector("#duel-go").addEventListener("click",()=>{u.sfx("click"),this._playTurn()})}_playTurn(){const s=this.players[this.turn];this.queue=this.roundsProblems[this.round].slice();const t=this.game;t.profile=w(s.id),t.duel=this,t.currentWorld=this.world,t.combo=0,t.chamberIndex=this.round,t.refreshHudCounts(),t.runChamber()}nextProblem(){return this.queue.shift()}hasMore(){return this.queue.length>0}scoreCorrect(s){const t=this.players[this.turn];t.score+=10+Math.min(10,(s-1)*2)}scoreWrong(){}chamberDone(){const s=this.game;if(s.duel=null,!this.solo&&this.turn<this.players.length-1){this.turn++;const t=this.players[this.turn];v(`
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
        <div style="flex:2"></div>`}else{const[r,o]=this.players,e=r.score===o.score?null:r.score>o.score?r:o;u.sfx("chest"),t=`
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
        <div style="flex:2"></div>`}v(t).querySelector("#duel-done").addEventListener("click",()=>s.showTitle())}}function b(d,s){return`${{tide:"T",garden:"G",stump:"S",vines:"V"}[d]||"G"}${$}-${s.toString(36).toUpperCase()}`}function z(d){const s=String(d).trim().toUpperCase().match(/^([TGSV])(\d)-([0-9A-Z]+)$/);if(!s)return null;const t={T:"tide",G:"garden",S:"stump",V:"vines"}[s[1]],l=parseInt(s[3],36);return!t||!Number.isFinite(l)?null:{world:t,seed:l}}function T(d){const s=y();let t=[],l="garden";const r=()=>{const o=v(`
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
          ${Object.entries(L).map(([e,n])=>`<button class="btn soft" data-world="${e}" ${e===l?'style="outline:4px solid var(--sun)"':""}>${n} ${i("world."+e)}</button>`).join("")}
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
    `);o.querySelector("#duel-back").addEventListener("click",()=>d.showTitle());for(const e of o.querySelectorAll("[data-pid]"))e.addEventListener("click",()=>{const n=e.dataset.pid;t=t.includes(n)?t.filter(c=>c!==n):[...t,n].slice(-2),u.sfx("click"),r()});for(const e of o.querySelectorAll("[data-world]"))e.addEventListener("click",()=>{l=e.dataset.world,u.sfx("click"),r()});o.querySelector("#duel-start").addEventListener("click",()=>{const e=Math.random()*1073741824>>>0;new g(d,t,l,e).start()}),o.querySelector("#code-make").addEventListener("click",()=>{const e=Math.random()*1073741824>>>0,n=b(l,e);o.querySelector("#code-out").textContent=n,o.querySelector("#code-in").value=n,u.sfx("sparkle")}),o.querySelector("#code-play").addEventListener("click",()=>{const e=z(o.querySelector("#code-in").value);if(!e){u.sfx("boop");return}const n=t[0]||d.profile?.id||s[0]?.id;n&&new g(d,[n],e.world,e.seed,{soloChallenge:!0,code:b(e.world,e.seed)}).start()})};r()}export{g as Duel,_ as generateDuelProblems,b as makeCode,z as parseCode,T as showDuelSetup};
