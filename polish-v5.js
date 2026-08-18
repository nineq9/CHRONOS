(()=>{
'use strict';
const D=window.CHRONOS_DATA,M=window.CHRONOS_MEDIA;if(!D||!M)return;
const lang=()=>document.documentElement.dataset.lang||localStorage.getItem('chronos-lang')||'ja';
const l=v=>v&&typeof v==='object'&&!Array.isArray(v)?(v[lang()]??v.ja??''):String(v??'');
const FALLBACK_PREFIX='data:image/svg+xml';
function goodRemote(src){return src&&/^https?:/i.test(src)&&!src.includes('Special:FilePath/CHRONOS')}
async function hydrate(img,id,title,force=false){if(!img||img.dataset.mediaBusy==='1')return;if(!force&&img.dataset.mediaReady==='1')return;const src=img.currentSrc||img.src||'';if(!force&&goodRemote(src)&&D.IMAGES?.[id]){img.dataset.mediaReady='1';return}img.dataset.mediaBusy='1';const meta=await M.resolve(id,title||img.alt);delete img.dataset.mediaBusy;if(!meta?.url)return;img.dataset.mediaReady='1';img.dataset.mediaSource=meta.page||'';img.dataset.mediaLicense=meta.license||'';img.decoding='async';img.loading=img.id==='eventImage'?'eager':'lazy';if(img.src!==meta.url)img.src=meta.url}
function library(){document.querySelectorAll('.library-card').forEach(card=>{const img=card.querySelector('img');if(!img)return;hydrate(img,card.dataset.event,img.alt)})}
function event(){const img=document.querySelector('#eventImage'),title=document.querySelector('#eventTitle')?.textContent;if(!img||!title)return;const h=(location.hash||'').slice(1),id=h.startsWith('event/')?decodeURIComponent(h.slice(6)):'';hydrate(img,id,title,!goodRemote(img.src)||img.src.startsWith(FALLBACK_PREFIX));document.querySelectorAll('#sameTimeGrid .same-card').forEach(card=>{const im=card.querySelector('img'),t=card.querySelector('strong')?.textContent;if(im&&t)hydrate(im,'',t,!goodRemote(im.src)||im.src.startsWith(FALLBACK_PREFIX))})}
function localizeVisibleRegions(){document.querySelectorAll('.timeline-v4 .tl4-event').forEach(b=>{const id=b.dataset.pointId||b.dataset.id;const p=D.TIMEPOINTS.find(x=>x.id===id)||D.DETAIL_POINTS?.find(x=>x.id===id);const span=b.querySelector('span');if(span&&p?.regionLabel)span.textContent=l(p.regionLabel)})}
function run(){library();event();localizeVisibleRegions()}
let timer=0;new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(run,60)}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['data-lang']});window.addEventListener('hashchange',()=>setTimeout(run,80));setTimeout(run,120);
})();