(()=>{
'use strict';
const D=window.CHRONOS_DATA;
if(!D?.TIMEPOINTS?.length)return;
const $=s=>document.querySelector(s);
const lang=()=>document.documentElement.dataset.lang||localStorage.getItem('chronos-lang')||'ja';
const l=v=>v&&typeof v==='object'&&!Array.isArray(v)?(v[lang()]??v.ja??''):String(v??'');
const ui={
 ja:{title:'人類史の巻物',before:'人類以前',hint:'横へ動かして時間を旅する',world:'全体',era:'時代',detail:'詳細',lanes:['人類・環境','政治・帝国','思想・宗教','技術・経済'],map:'WORLD',mapHint:'地図も同じ時代へ動きます'},
 ru:{title:'Свиток истории человечества',before:'До появления людей',hint:'Двигайте время по горизонтали',world:'Мир',era:'Эпоха',detail:'Детали',lanes:['Люди и среда','Политика и империи','Идеи и религии','Технологии и экономика'],map:'МИР',mapHint:'Карта движется вместе со временем'}
};
const T=()=>ui[lang()]||ui.ja;
let zoom=localStorage.getItem('chronos-timeline-zoom')||'era';
let selectedId=localStorage.getItem('chronos-point')||'atlantic1492';
let visible=[],selected=0,raf=0,land=null,dragging=false,startY=0,startH=0;
const spacingFor=()=>zoom==='world'?124:zoom==='detail'?238:174;
const PAD=170;
const majorIds=new Set(D.MAJOR_DIAL_IDS||['sapiens','agriculture','writing','rome476','mongol','atlantic1492','french-revolution','ww1','postwar','today']);
function all(){return D.TIMEPOINTS.map((p,i)=>({p,i}))}
function choose(){
 const a=all(),n=a.length;
 if(zoom==='detail')return a;
 if(zoom==='era')return a.filter((x,j)=>majorIds.has(x.p.id)||j%2===0||j===n-1);
 const step=Math.max(1,Math.ceil(n/26));
 return a.filter((x,j)=>majorIds.has(x.p.id)||j%step===0||j===n-1);
}
function eventId(p){return Object.entries(D.EVENTS||{}).find(([,e])=>e?.point===p.id)?.[0]||p.id}
function rootMarkup(){
 const r=document.createElement('section');r.id='timelineV4';r.className='timeline-v4';
 r.innerHTML=`<div class="tl4-head"><div><span class="tl4-eyebrow">HUMAN STORY</span><strong id="tl4Title"></strong></div><button class="tl4-before" data-action="prehuman"><span id="tl4Before"></span><b>↗</b></button></div>
 <div class="tl4-focus"><div class="tl4-current"><strong id="tl4Year"></strong><span id="tl4Event"></span></div><div class="tl4-zoom" id="tl4Zoom"><button data-z="world"></button><button data-z="era"></button><button data-z="detail"></button></div></div>
 <div class="tl4-stage"><div class="tl4-ruler-title" id="tl4Hint"></div><div class="tl4-lane-labels" id="tl4LaneLabels"></div><div class="tl4-scroll" id="tl4Scroll"><div class="tl4-canvas" id="tl4Canvas"></div></div><div class="tl4-cursor"><i></i></div></div>
 <button class="tl4-divider" id="tl4Divider" aria-label="Resize map"><span></span></button>
 <section class="tl4-map"><div class="tl4-map-head"><div><strong><span id="tl4MapWord"></span> · <span id="tl4MapYear"></span></strong><small id="tl4MapHint"></small></div><button class="tl4-map-expand" data-action="map-expand" aria-label="Expand map"><svg viewBox="0 0 24 24"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg></button></div><div class="tl4-map-frame"><svg id="timelineMapV4" viewBox="0 0 960 420"></svg></div><div class="tl4-map-chips" id="tl4MapChips"></div></section>`;
 return r;
}
function mount(){
 if($('#timelineV4'))return;
 const page=$('#timelineScreen .timeline-page');if(!page)return;
 page.appendChild(rootMarkup());
 bind();renderLanguage();setZoom(zoom,false);setupDivider();
}
function renderLanguage(){
 const t=T();$('#tl4Title').textContent=t.title;$('#tl4Before').textContent=t.before;$('#tl4Hint').textContent=t.hint;$('#tl4MapWord').textContent=t.map;$('#tl4MapHint').textContent=t.mapHint;
 const z=$$('#tl4Zoom button');if(z.length){z[0].textContent=t.world;z[1].textContent=t.era;z[2].textContent=t.detail}
 $('#tl4LaneLabels').innerHTML=t.lanes.map((x,i)=>`<span style="--lane:${i}">${x}</span>`).join('');
 renderWindow(true);
}
function $$(s){return[...document.querySelectorAll(s)]}
function nearestVisibleId(id){let k=visible.findIndex(x=>x.p.id===id);if(k>=0)return k;const full=D.TIMEPOINTS.findIndex(p=>p.id===id);if(full<0)return 0;let best=0,dist=1e9;visible.forEach((x,i)=>{const d=Math.abs(x.i-full);if(d<dist){dist=d;best=i}});return best}
function setZoom(z,keep=true){
 const old=visible[selected]?.p?.id||selectedId;zoom=z;localStorage.setItem('chronos-timeline-zoom',z);visible=choose();selected=nearestVisibleId(keep?old:selectedId);$$('#tl4Zoom button').forEach(b=>b.classList.toggle('active',b.dataset.z===zoom));
 const c=$('#tl4Canvas');if(c)c.style.width=(PAD*2+Math.max(0,visible.length-1)*spacingFor())+'px';
 requestAnimationFrame(()=>centerOn(selected,false));
}
function centerOn(i,smooth=true){
 selected=Math.max(0,Math.min(visible.length-1,i));const sc=$('#tl4Scroll');if(!sc)return;const x=PAD+selected*spacingFor();sc.scrollTo({left:Math.max(0,x-sc.clientWidth/2),behavior:smooth?'smooth':'auto'});updateSelected(true);renderWindow();
}
function syncLegacy(fullIndex){
 const old=$('#historyScroll');if(!old)return;try{old.scrollLeft=Math.max(0,128+fullIndex*246-195);old.dispatchEvent(new Event('scroll'))}catch{}
}
function updateSelected(sync=false){
 const x=visible[selected];if(!x)return;selectedId=x.p.id;localStorage.setItem('chronos-point',selectedId);
 $('#tl4Year').textContent=l(x.p.label);$('#tl4Event').textContent=l(x.p.title);$('#tl4MapYear').textContent=l(x.p.label);
 if(sync)syncLegacy(x.i);renderMap();
}
function renderWindow(force=false){
 const sc=$('#tl4Scroll'),canvas=$('#tl4Canvas');if(!sc||!canvas||!visible.length)return;
 const spacing=spacingFor(),center=Math.round((sc.scrollLeft+sc.clientWidth/2-PAD)/spacing),radius=Math.ceil(sc.clientWidth/spacing)+12;
 const lo=Math.max(0,center-radius),hi=Math.min(visible.length-1,center+radius);
 const key=`${zoom}:${lo}:${hi}:${lang()}:${selected}`;if(!force&&canvas.dataset.key===key)return;canvas.dataset.key=key;
 let h='';for(let i=0;i<4;i++)h+=`<div class="tl4-lane-line" style="--lane:${i}"></div>`;
 const rulerEvery=zoom==='detail'?3:zoom==='era'?2:1;
 for(let j=lo;j<=hi;j++){
  const {p}=visible[j],x=PAD+j*spacing,focus=j===selected;
  if(j%rulerEvery===0||focus)h+=`<span class="tl4-tick ${focus?'focused':''}" style="left:${x}px"><b></b><em>${escapeHtml(l(p.label))}</em></span>`;
  h+=`<button class="tl4-event ${focus?'focused':''}" data-event="${escapeHtml(eventId(p))}" style="left:${x}px;--lane:${p.lane??0}"><small>${escapeHtml(l(p.label))}</small><strong>${escapeHtml(l(p.title))}</strong><span>${escapeHtml(p.region||'')}</span></button>`;
 }
 canvas.innerHTML=h;
}
function escapeHtml(s){return String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function onScroll(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const sc=$('#tl4Scroll');if(!sc)return;const i=Math.max(0,Math.min(visible.length-1,Math.round((sc.scrollLeft+sc.clientWidth/2-PAD)/spacingFor())));if(i!==selected){selected=i;updateSelected(true)}renderWindow()})}
async function getLand(){if(land)return land;if(!window.d3||!window.topojson)return null;try{const w=await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json');return land=topojson.feature(w,w.objects.land)}catch{return null}}
function nearby(){const a=all(),full=visible[selected]?.i??0;return a.slice(Math.max(0,full-4),Math.min(a.length,full+5))}
async function renderMap(){
 const svg=$('#timelineMapV4');if(!svg)return;const cur=visible[selected]?.p;if(!cur)return;const ld=await getLand();
 if(ld&&window.d3){const pr=d3.geoNaturalEarth1().fitSize([940,395],ld),path=d3.geoPath(pr);let h=`<path class="tl4-graticule" d="${path(d3.geoGraticule10())}"></path><path class="tl4-land" d="${path(ld)}"></path>`;nearby().forEach(({p})=>{const xy=pr([p.lon||0,p.lat||0]);if(!xy)return;const on=p.id===cur.id;h+=`<g><circle class="tl4-ring ${on?'active':''}" cx="${xy[0]}" cy="${xy[1]}" r="${on?15:11}"></circle><circle class="tl4-dot ${on?'active':''}" cx="${xy[0]}" cy="${xy[1]}" r="${on?6:4.5}"></circle></g>`});svg.innerHTML=h}else{svg.innerHTML='<rect width="960" height="420" fill="transparent"/><g fill="rgba(220,210,190,.16)"><ellipse cx="210" cy="170" rx="120" ry="70"/><ellipse cx="305" cy="282" rx="62" ry="100"/><ellipse cx="555" cy="170" rx="170" ry="82"/><ellipse cx="615" cy="290" rx="72" ry="95"/><ellipse cx="820" cy="320" rx="72" ry="42"/></g>'}
 $('#tl4MapChips').innerHTML=nearby().map(({p})=>`<button data-event="${escapeHtml(eventId(p))}" class="${p.id===cur.id?'active':''}"><small>${escapeHtml(l(p.label))}</small><span>${escapeHtml(l(p.title))}</span></button>`).join('');
}
function bind(){
 $('#tl4Scroll').addEventListener('scroll',onScroll,{passive:true});
 $('#tl4Zoom').addEventListener('click',e=>{const b=e.target.closest('[data-z]');if(b)setZoom(b.dataset.z)});
 window.addEventListener('resize',()=>centerOn(selected,false),{passive:true});
 const mo=new MutationObserver(m=>{if(m.some(x=>x.attributeName==='data-lang'||x.attributeName==='lang'))renderLanguage()});mo.observe(document.documentElement,{attributes:true,attributeFilter:['data-lang','lang']});
}
function setupDivider(){
 const root=$('#timelineV4'),d=$('#tl4Divider');if(!root||!d)return;
 d.addEventListener('click',()=>{const now=parseFloat(getComputedStyle(root).getPropertyValue('--map-h'))||180;root.style.setProperty('--map-h',(now>210?155:260)+'px')});
 d.addEventListener('pointerdown',e=>{dragging=true;startY=e.clientY;startH=parseFloat(getComputedStyle(root).getPropertyValue('--map-h'))||180;d.setPointerCapture?.(e.pointerId)});
 d.addEventListener('pointermove',e=>{if(!dragging)return;const next=Math.max(135,Math.min(300,startH+(startY-e.clientY)));root.style.setProperty('--map-h',next+'px')});
 const stop=()=>dragging=false;d.addEventListener('pointerup',stop);d.addEventListener('pointercancel',stop);
}
function routeWatch(){
 if((location.hash||'#home').slice(1)==='timeline'){selectedId=localStorage.getItem('chronos-point')||selectedId;visible=choose();selected=nearestVisibleId(selectedId);setTimeout(()=>centerOn(selected,false),40)}
}
mount();routeWatch();window.addEventListener('hashchange',routeWatch);
})();