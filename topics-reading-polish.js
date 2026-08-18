(()=>{
'use strict';
const lang=()=>document.documentElement.dataset.lang||'ja';
const COPY={
 ja:[
  ['結論からいうと','ヴァイキングの信仰は、神話の物語ではなく「暮らしの仕組み」そのものでした。','神々は海の向こうの存在ではなく、航海・結婚・豊作・死まで、毎日の判断の中にいました。'],
  ['結論からいうと','ヴァイキングの大半は、略奪者ではなく農民や職人として暮らしていました。','私たちが知る「戦士」の姿だけでは、北欧社会がなぜ遠い世界とつながれたのかは見えてきません。'],
  ['結論からいうと','ヴァイキングを強くした最大の武器の一つは、剣ではなく「船」でした。','浅い川にも外洋にも入れる船が、交易・移住・略奪を同じネットワークにつなげました。'],
  ['結論からいうと','ヴァイキングの遠征は、単なる略奪から「住み、支配する」動きへ変わっていきました。','海岸を襲った人々が、なぜやがて都市や国家の歴史に入り込んだのでしょうか。'],
  ['結論からいうと','ヴァイキングは征服した土地だけでなく、戦った相手の国家の形まで変えました。','イングランドでは、彼らへの対抗が軍事・税・王権の再編を促す力の一つになりました。']
 ],
 ru:[
  ['Коротко','Вера викингов была не просто мифологией — она была частью повседневной жизни.','Боги присутствовали в представлениях о море, урожае, браке, смерти и решениях общины.'],
  ['Коротко','Большинство людей эпохи викингов были не налётчиками, а земледельцами и ремесленниками.','Если смотреть только на воинов, невозможно понять, как Скандинавия была связана с далёкими рынками.'],
  ['Коротко','Одним из главных преимуществ викингов был не меч, а корабль.','Один тип морской технологии связал торговлю, переселение и военные походы.'],
  ['Коротко','Походы викингов постепенно превратились из набегов в заселение и власть.','Как люди, нападавшие на побережья, стали частью истории городов и государств?'],
  ['Коротко','Викинги меняли не только захваченные земли, но и государства, которые им сопротивлялись.','В Англии борьба с ними стала одним из факторов перестройки армии, налогов и королевской власти.']
 ]
};
function polish(){
 const detail=document.querySelector('#topicDetail');
 if(!detail||detail.hidden)return;
 const rows=[...detail.querySelectorAll('.depth-reading')];
 rows.forEach((reading,i)=>{
  if(reading.querySelector('.depth-reading-lead'))return;
  const c=(COPY[lang()]||COPY.ja)[i];if(!c)return;
  const lead=document.createElement('div');lead.className='depth-reading-lead';
  lead.innerHTML=`<small>${c[0]}</small><strong>${c[1]}</strong><span>${c[2]}</span>`;
  reading.prepend(lead);
 });
 const guide=detail.querySelector('.depth-guide');
 if(guide){
  const key='chronos-depth-guide-seen';
  let seen=false;try{seen=localStorage.getItem(key)==='1'}catch{}
  if(seen)guide.remove();else{try{localStorage.setItem(key,'1')}catch{}}
 }
}
let t=0;const run=()=>{clearTimeout(t);t=setTimeout(polish,30)};
new MutationObserver(run).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','data-lang']});
window.addEventListener('hashchange',run);setTimeout(polish,120);
})();