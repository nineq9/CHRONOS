(()=>{
 const V='20260818f';
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 async function text(u){let last;for(let i=0;i<3;i++){try{const r=await fetch(`${u}?v=${V}`,{cache:'no-store'});if(!r.ok)throw new Error(u);return await r.text()}catch(e){last=e;if(i<2)await sleep(220*(i+1))}}try{const cached=await caches.match(u);if(cached)return await cached.text()}catch{}throw last}
 Promise.all(['./logic-v2.part1.txt','./logic-v2.part2.txt'].map(text)).then(parts=>{
  let code=parts.join('');
  code=code.replace(/short\(P\(i\)\)/g,'short(D.TIMEPOINTS[i])');
  code=code.replace("$('[data-action=\"guide\"]#x');","$$('[data-action=\"guide\"]').forEach(b=>{if(b.closest('.settings-block'))b.textContent=t.guidebutton});");
  code=code.replace("if(p){idx=Math.max(0,D.TIMEPOINTS.indexOf(p));st.s('chronos-point',p.id)}","if(p){idx=Math.max(0,D.TIMEPOINTS.indexOf(p));st.s('chronos-point',p.id);const v=new Set(st.j('chronos-visited',[]));v.add(p.id);st.sj('chronos-visited',[...v])}");
  new Function(code)();
 }).catch(err=>{console.error('CHRONOS logic load failed',err);document.body.innerHTML='<main style="padding:32px 22px;color:#f3ead8;background:#151613;min-height:100dvh;font-family:-apple-system"><h1 style="font-family:Georgia,serif;font-weight:500">CHRONOS</h1><p>操作データを読み込めませんでした。通信が戻ったら再読み込みしてください。</p><button onclick="location.reload()" style="min-height:48px;border:0;border-radius:999px;padding:0 20px;background:#ead7b4;color:#29251e">再読み込み</button></main>'});
})();