(async()=>{
  const V='20260818c';
  document.querySelector('link[href$="styles.css"]')?.remove();
  const link=document.createElement('link');
  link.rel='stylesheet';link.href=`./styles-v2.css?v=${V}`;document.head.appendChild(link);
  try{
    const html=await fetch(`./ui-v2.html?v=${V}`,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('ui');return r.text()});
    document.body.innerHTML=html;
    const script=document.createElement('script');script.src=`./logic-v2.js?v=${V}`;script.defer=true;document.body.appendChild(script);
  }catch(err){
    console.error(err);
    document.body.innerHTML='<main style="padding:24px;color:#f3ead8;background:#151613;min-height:100vh;font-family:-apple-system"><h1>CHRONOS</h1><p>更新データの読み込みに失敗しました。ページを再読み込みしてください。</p></main>';
  }
})();