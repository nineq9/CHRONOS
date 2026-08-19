(async()=>{
  const V='20260819d';
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').then(r=>r.update()).catch(()=>{});navigator.serviceWorker.addEventListener('controllerchange',()=>{try{if(!sessionStorage.getItem('chronos-sw-reload')){sessionStorage.setItem('chronos-sw-reload','1');location.reload()}}catch{}})}
  const loadScript=async(src,retries=3)=>{let last;for(let i=0;i<=retries;i++){try{await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=`${src}?v=${V}`;s.onload=resolve;s.onerror=()=>{s.remove();reject(new Error(src))};document.head.appendChild(s)});return}catch(e){last=e;if(i<retries)await sleep(250*(i+1))}}throw last};
  const fetchText=async(url,retries=3)=>{let last;for(let i=0;i<=retries;i++){try{const r=await fetch(`${url}?v=${V}`,{cache:'no-store'});if(!r.ok)throw new Error(`${url}:${r.status}`);return await r.text()}catch(e){last=e;if(i<retries)await sleep(250*(i+1))}}try{const cached=await caches.match(url);if(cached)return await cached.text()}catch{}throw last};
  const waitFor=async(fn,timeout=5000)=>{const start=Date.now();while(Date.now()-start<timeout){if(fn())return true;await sleep(50)}return false};
  document.querySelector('link[href$="styles.css"]')?.remove();
  const link=document.createElement('link');link.rel='stylesheet';link.href=`./styles-v4.css?v=${V}`;document.head.appendChild(link);
  const polish=document.createElement('link');polish.rel='stylesheet';polish.href=`./polish-v5.css?v=${V}`;document.head.appendChild(polish);
  const experience=document.createElement('link');experience.rel='stylesheet';experience.href=`./experience-v1.css?v=${V}`;document.head.appendChild(experience);
  const experienceFix=document.createElement('style');experienceFix.textContent='.bottom-nav{grid-template-columns:repeat(4,1fr)!important}';document.head.appendChild(experienceFix);
  try{
    const html=await fetchText('./ui-v2.html');document.body.innerHTML=html;
    await Promise.allSettled([loadScript('./content-v3.js'),loadScript('./content-v3-extra.js')]);
    await loadScript('./media-depth-v1.js',3);
    await loadScript('./lesson-french-v2.js',3);
    await loadScript('./logic-runtime.js',4);
    await waitFor(()=>document.querySelector('#dialTicks')?.children.length>0);
    await loadScript('./timeline-v4.js',3);
    await loadScript('./compat-v3.js',2).catch(err=>console.warn('CHRONOS optional polish skipped',err));
    await loadScript('./experience-v1.js',2);
    document.addEventListener('click',e=>{const x=e.target.closest('[data-x-route]');if(x?.dataset.xRoute)setTimeout(()=>history.replaceState(null,'',`#x-${x.dataset.xRoute}`),0)},true);
    const menu=document.querySelector('#menuOverlay .menu-sheet');
    if(menu&&!document.querySelector('#xMenuLibrary')){const mapButton=menu.querySelector('[data-route="map"]');mapButton?.insertAdjacentHTML('beforebegin','<button id="xMenuLibrary" data-route="library"><span>LIBRARY</span><span>→</span></button>')}
    const xMatch=(location.hash||'').match(/^#x-(explore|mission)$/);if(xMatch)document.querySelector(`#bottomNav [data-x-route="${xMatch[1]}"]`)?.click();
    loadScript('./polish-v5.js',2).catch(err=>console.warn('CHRONOS media polish skipped',err));
  }catch(err){
    console.error('CHRONOS boot failed',err);
    document.body.innerHTML='<main style="padding:32px 22px;color:#f3ead8;background:#151613;min-height:100dvh;font-family:-apple-system"><h1 style="font-family:Georgia,serif;font-weight:500">CHRONOS</h1><p>表示に必要なデータを読み込めませんでした。再読み込みしてください。</p><button onclick="location.reload()" style="min-height:48px;border:0;border-radius:999px;padding:0 20px;background:#ead7b4;color:#29251e">再読み込み</button></main>'
  }
})();