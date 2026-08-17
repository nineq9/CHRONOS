(()=>{
'use strict';
const D=window.CHRONOS_DATA;if(!D)return;
const lang=()=>localStorage.getItem('chronos-lang')||'ja';
const l=v=>v&&typeof v==='object'&&!Array.isArray(v)?(v[lang()]??v.ja??''):String(v??'');
const FR_IMG='https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Jean-Baptiste_Lallemand_-_La_prise_de_la_Bastille%2C_le_14_juillet_1789_-_P1718_-_Mus%C3%A9e_Carnavalet.jpg/1600px-Jean-Baptiste_Lallemand_-_La_prise_de_la_Bastille%2C_le_14_juillet_1789_-_P1718_-_Mus%C3%A9e_Carnavalet.jpg';
const fr=D.EVENTS?.['french-revolution'];
if(fr){
  fr.storySections=Array.isArray(fr.story)?fr.story:[];
  fr.story={
    ja:fr.storySections.map(s=>`${s.heading?.ja||''}\n${s.text?.ja||''}`),
    ru:fr.storySections.map(s=>`${s.heading?.ru||s.heading?.ja||''}\n${s.text?.ru||s.text?.ja||''}`)
  };
  fr.evidenceRich=Array.isArray(fr.evidence)?fr.evidence:[];
}
function majorIndexes(){
 const ids=D.MAJOR_DIAL_IDS||[];return ids.map(id=>D.TIMEPOINTS.findIndex(p=>p.id===id)).filter(i=>i>=0);
}
function short(p){if(!p)return'';if(p.id==='sapiens')return lang()==='ja'?'30万年前':'300k';if(p.id==='agriculture')return lang()==='ja'?'1万年前':'10k';return l(p.label).replace('頃','').replace('ок. ','')}
function polishDial(){
 const box=document.querySelector('#dialTicks');if(!box)return;
 const current=localStorage.getItem('chronos-point');const idxs=majorIndexes();
 const html=idxs.map(i=>{const p=D.TIMEPOINTS[i];return `<button class="dial-tick ${p.id===current?'active':''}" data-dial-index="${i}">${short(p)}</button>`}).join('');
 if(box.dataset.v3!==html){box.innerHTML=html;box.dataset.v3=html}
}
function polishFrench(){
 const isFrench=(location.hash||'').includes('event/french-revolution');if(!isFrench)return;
 const im=document.querySelector('#eventImage');if(im&&im.src!==FR_IMG){im.src=FR_IMG;im.alt=lang()==='ja'?'1789年7月14日のバスティーユ襲撃':'Штурм Бастилии 14 июля 1789 года'}
 const story=document.querySelector('#storyBody');if(story&&fr?.storySections){story.innerHTML=fr.storySections.map(s=>`<h3 class="story-subhead">${l(s.heading)}</h3><p>${l(s.text)}</p>`).join('')}
 const evidence=document.querySelector('#evidenceBody');if(evidence&&fr?.evidenceRich){evidence.innerHTML=fr.evidenceRich.map(x=>`<a class="evidence-source" href="${x.url}" target="_blank" rel="noopener"><small>${l(x.type)}</small><strong>${l(x.title)}</strong><p>${l(x.text)}</p><span>↗</span></a>`).join('')}
}
function polishTest(){
 if(!(location.hash||'').includes('event/french-revolution'))return;
 const fb=document.querySelector('#testFeedback');if(!fb||fb.hidden||!fr?.test?.next)return;
 if(!fb.querySelector('.advanced-question')){fb.insertAdjacentHTML('beforeend',`<div class="advanced-question"><small>${lang()==='ja'?'次の問い':'Следующий вопрос'}</small><strong>${l(fr.test.next)}</strong></div>`)}
}
let scheduled=false;function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;polishDial();polishFrench();polishTest()})}
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
window.addEventListener('hashchange',()=>setTimeout(schedule,20));
document.addEventListener('click',e=>{if(e.target.closest('[data-action="submit-test"]'))setTimeout(polishTest,50)},true);
setTimeout(schedule,50);
})();
