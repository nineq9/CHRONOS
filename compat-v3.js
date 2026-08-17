(()=>{
'use strict';
const D=window.CHRONOS_DATA;if(!D)return;
const lang=()=>localStorage.getItem('chronos-lang')||'ja';
const l=v=>v&&typeof v==='object'&&!Array.isArray(v)?(v[lang()]??v.ja??''):String(v??'');
const FR_IMG='https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Jean-Baptiste_Lallemand_-_La_prise_de_la_Bastille%2C_le_14_juillet_1789_-_P1718_-_Mus%C3%A9e_Carnavalet.jpg/1600px-Jean-Baptiste_Lallemand_-_La_prise_de_la_Bastille%2C_le_14_juillet_1789_-_P1718_-_Mus%C3%A9e_Carnavalet.jpg';
const fr=D.EVENTS?.['french-revolution'];
if(fr){
  fr.storySections=Array.isArray(fr.story)?fr.story:[];
  fr.story={ja:fr.storySections.map(s=>`${s.heading?.ja||''}\n${s.text?.ja||''}`),ru:fr.storySections.map(s=>`${s.heading?.ru||s.heading?.ja||''}\n${s.text?.ru||s.text?.ja||''}`)};
  fr.evidenceRich=Array.isArray(fr.evidence)?fr.evidence:[];
}
function majorIndexes(){const ids=D.MAJOR_DIAL_IDS||[];return ids.map(id=>D.TIMEPOINTS.findIndex(p=>p.id===id)).filter(i=>i>=0)}
function short(p){if(!p)return'';if(p.id==='sapiens')return lang()==='ja'?'30万年前':'300k';if(p.id==='agriculture')return lang()==='ja'?'1万年前':'10k';return l(p.label).replace('頃','').replace('ок. ','')}
function polishDial(){const box=document.querySelector('#dialTicks');if(!box)return;const current=localStorage.getItem('chronos-point'),idxs=majorIndexes(),html=idxs.map(i=>{const p=D.TIMEPOINTS[i];return `<button class="dial-tick ${p.id===current?'active':''}" data-dial-index="${i}">${short(p)}</button>`}).join('');if(box.dataset.v3!==html){box.innerHTML=html;box.dataset.v3=html}}
function bindSameTime(){if(!fr?.sameTime)return;document.querySelectorAll('#sameTimeGrid .same-card').forEach((card,i)=>{const item=fr.sameTime[i];if(!item)return;const img=card.querySelector('img'),src=D.IMAGES?.[item.id];if(img&&src&&img.dataset.v3src!==src){img.src=src;img.dataset.v3src=src}if(!card.dataset.v3bound){card.dataset.v3bound='1';card.tabIndex=0;card.setAttribute('role','button');card.addEventListener('click',()=>{location.hash='#event/'+encodeURIComponent(item.id)});card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();location.hash='#event/'+encodeURIComponent(item.id)}})}})}
function polishFrench(){
 if(!(location.hash||'').includes('event/french-revolution'))return;
 const im=document.querySelector('#eventImage');if(im&&im.src!==FR_IMG){im.src=FR_IMG;im.alt=lang()==='ja'?'1789年7月14日のバスティーユ襲撃':'Штурм Бастилии 14 июля 1789 года'}
 const story=document.querySelector('#storyBody');if(story&&fr?.storySections)story.innerHTML=fr.storySections.map(s=>`<h3 class="story-subhead">${l(s.heading)}</h3><p>${l(s.text)}</p>`).join('');
 const evidence=document.querySelector('#evidenceBody');if(evidence&&fr?.evidenceRich)evidence.innerHTML=fr.evidenceRich.map(x=>`<a class="evidence-source" href="${x.url}" target="_blank" rel="noopener"><small>${l(x.type)}</small><strong>${l(x.title)}</strong><p>${l(x.text)}</p><span>↗</span></a>`).join('');
 bindSameTime();
}
function richFeedback(){
 if(!(location.hash||'').includes('event/french-revolution')||!fr?.test)return;
 const ans=(document.querySelector('#testAnswer')?.value||'').trim(),fb=document.querySelector('#testFeedback');if(!fb||ans.length<18)return;
 const low=ans.toLowerCase(),groups=fr.test.concepts||[],labels=fr.test.conceptLabels||[];
 const hits=groups.map(g=>(Array.isArray(g)?g:[g]).some(w=>low.includes(String(w).toLowerCase())));
 const found=hits.map((v,i)=>v?i:-1).filter(i=>i>=0),missing=hits.findIndex(v=>!v);
 const foundText=found.map(i=>l(labels[i])).filter(Boolean).slice(0,5);
 let title,praise;if(found.length>=5){title=lang()==='ja'?'かなり深く、複数因果で説明できています':'Очень сильное многофакторное объяснение';praise=lang()==='ja'?'一つの原因に還元せず、制度・生活・思想など複数の層を結びつけています。歴史を「構造」として見る段階に入っています。':'Вы не сводите революцию к одной причине и связываете институты, повседневность и идеи — это уже структурное историческое мышление.'}else if(found.length>=3){title=lang()==='ja'?'重要な条件をちゃんとつないでいます':'Вы хорошо связываете ключевые условия';praise=lang()==='ja'?'出来事を年号ではなく、複数の条件が重なった結果として説明できています。ここがCHRONOSで最も大事な理解です。':'Вы объясняете событие как результат наложения нескольких условий, а не как дату — это центральный навык CHRONOS.'}else{title=lang()==='ja'?'因果関係を自分の言葉にできています':'Вы уже формулируете причинность своими словами';praise=lang()==='ja'?'まず一つか二つの原因を自分で結びつけられているのが良いです。次は別の層を一つ加えると、説明が急に立体的になります。':'Вы уже связали один или два механизма. Добавьте ещё один слой — и объяснение станет гораздо объёмнее.'}
 const connected=foundText.length?(lang()==='ja'?`今の回答でつながっていた観点：${foundText.join(' / ')}`:`В вашем ответе связаны: ${foundText.join(' / ')}`):'';
 const next=missing>=0&&labels[missing]?(lang()==='ja'?`次に「${l(labels[missing])}」を今の説明へどう接続できるか考えてみてください。`:`Дальше попробуйте связать с объяснением «${l(labels[missing])}».`):'';
 fb.hidden=false;fb.innerHTML=`<h3>${title}</h3><p>${praise}</p>${connected?`<p><strong>${connected}</strong></p>`:''}${next?`<p>${next}</p>`:''}${found.length>=3&&fr.test.next?`<div class="advanced-question"><small>${lang()==='ja'?'次の問い｜反実仮想':'Следующий вопрос｜Контрфактический анализ'}</small><strong>${l(fr.test.next)}</strong></div>`:''}`;
 if(found.length>=3){try{const a=new Set(JSON.parse(localStorage.getItem('chronos-completed')||'[]'));a.add('french-revolution');localStorage.setItem('chronos-completed',JSON.stringify([...a]))}catch{}}
}
let scheduled=false;function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;polishDial();polishFrench()})}
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
window.addEventListener('hashchange',()=>setTimeout(schedule,20));
document.addEventListener('click',e=>{if(e.target.closest('[data-action="submit-test"]'))setTimeout(richFeedback,80)},true);
setTimeout(schedule,50);
})();
