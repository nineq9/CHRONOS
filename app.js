(async()=>{
  const V='20260818g';
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const loadScript=async(src,retries=2)=>{let last;for(let i=0;i<=retries;i++){try{await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=`${src}?v=${V}`;s.onload=resolve;s.onerror=()=>{s.remove();reject(new Error(src))};document.head.appendChild(s)});return}catch(e){last=e;if(i<retries)await sleep(250*(i+1))}}throw last};
  const fetchText=async(url,retries=2)=>{let last;for(let i=0;i<=retries;i++){try{const r=await fetch(`${url}?v=${V}`,{cache:'no-store'});if(!r.ok)throw new Error(`${url}:${r.status}`);return await r.text()}catch(e){last=e;if(i<retries)await sleep(250*(i+1))}}throw last};
  document.querySelector('link[href$="styles.css"]')?.remove();
  const link=document.createElement('link');link.rel='stylesheet';link.href=`./styles-v3.css?v=${V}`;document.head.appendChild(link);
  try{
    await loadScript('./content-v3.js');
    await loadScript('./content-v3-extra.js');
    const html=await fetchText('./ui-v2.html');
    document.body.innerHTML=html;
    await loadScript('./logic-v2.js');
    await loadScript('./compat-v3.js');
  }catch(err){
    console.error('CHRONOS boot failed',err);
    document.body.innerHTML='<main style="padding:32px 22px;color:#f3ead8;background:#151613;min-height:100dvh;font-family:-apple-system"><h1 style="font-family:Georgia,serif;font-weight:500">CHRONOS</h1><p>読み込みに失敗しました。通信が戻ったら一度だけ再読み込みしてください。</p><button onclick="location.reload()" style="min-height:48px;border:0;border-radius:999px;padding:0 20px;background:#ead7b4;color:#29251e">再読み込み</button></main>';
  }
})();