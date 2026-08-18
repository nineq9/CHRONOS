(()=>{
'use strict';
const D=window.CHRONOS_DATA;if(!D?.TIMEPOINTS)return;
const bi=(ja,ru)=>({ja,ru});
const COMMONS=file=>`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file).replace(/%2F/g,'/')}?width=960`;
const CURATED={
  sapiens:COMMONS('Lascaux painting.jpg'),
  'cave-art':COMMONS('Lascaux painting.jpg'),
  writing:COMMONS('Standard of ur.jpg'),
  qin:COMMONS('Terracotta Army (54083021295).jpg'),
  'french-revolution':COMMONS('Jean-Baptiste Lallemand - La prise de la Bastille, le 14 juillet 1789 - P1718 - Musée Carnavalet.jpg'),
  'american-independence':COMMONS('Declaration of Independence (1819), by John Trumbull.jpg'),
  'atlantic1492':COMMONS('Christopher Columbus6.jpg'),
  'printing-revolution':COMMONS('Gutenberg Bible B42 Genesis.JPG'),
  mongol:COMMONS('YuanEmperorAlbumGenghisPortrait.jpg'),
  ww1:COMMONS('British Mark I male tank Somme 25 September 1916.jpg'),
  industrial:COMMONS('Powerloom weaving in 1835.jpg'),
  'rome476':COMMONS('Colosseum in Rome, Italy - April 2007.jpg')
};
D.IMAGES=Object.assign({},D.IMAGES||{},CURATED);
const REGION={
 'Africa':bi('アフリカ','Африка'),'East Africa':bi('東アフリカ','Восточная Африка'),'West Africa':bi('西アフリカ','Западная Африка'),'Southern Africa':bi('南部アフリカ','Южная Африка'),
 'Europe':bi('ヨーロッパ','Европа'),'Eastern Europe':bi('東ヨーロッパ','Восточная Европа'),'Western Europe':bi('西ヨーロッパ','Западная Европа'),'Northern Europe':bi('北ヨーロッパ','Северная Европа'),
 'East Asia':bi('東アジア','Восточная Азия'),'South Asia':bi('南アジア','Южная Азия'),'West Asia':bi('西アジア','Западная Азия'),'Central Asia':bi('中央アジア','Центральная Азия'),
 'Southeast Asia':bi('東南アジア','Юго-Восточная Азия'),'Americas':bi('アメリカ大陸','Америки'),'North America':bi('北アメリカ','Северная Америка'),'Latin America':bi('ラテンアメリカ','Латинская Америка'),
 'Mediterranean':bi('地中海世界','Средиземноморье'),'Atlantic':bi('大西洋世界','Атлантический мир'),'Atlantic World':bi('大西洋世界','Атлантический мир'),'Global':bi('世界','Мир'),
 'Mesopotamia':bi('メソポタミア','Месопотамия'),'Arabia':bi('アラビア','Аравия'),'China':bi('中国','Китай'),'Japan':bi('日本','Япония'),'India':bi('インド','Индия')
};
function regionLabel(region){
 if(!region)return bi('','');
 if(typeof region==='object')return region;
 if(REGION[region])return REGION[region];
 const parts=String(region).split(/\s*\/\s*/);if(parts.length>1){const a=parts.map(x=>REGION[x]||bi(x,x));return bi(a.map(x=>x.ja).join(' / '),a.map(x=>x.ru).join(' / '))}
 return bi(region,region);
}
const majors=new Set(D.MAJOR_DIAL_IDS||['sapiens','agriculture','writing','rome476','mongol','atlantic1492','french-revolution','ww1','postwar','today']);
D.TIMEPOINTS.forEach((p,i)=>{p.regionLabel=regionLabel(p.region);p.timelineLevel=majors.has(p.id)?1:(D.EVENTS&&Object.values(D.EVENTS).some(e=>e?.point===p.id)?2:3);p.mediaQuery=p.mediaQuery||String(p.id||'').replace(/[-_]/g,' ')});
D.DETAIL_POINTS=[
 {id:'fr-estates-1789',parent:'french-revolution',detailOnly:true,year:1789.37,label:bi('1789年5月','май 1789'),title:bi('三部会が開会','Открытие Генеральных штатов'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:2.35,lat:48.85},
 {id:'fr-national-assembly',parent:'french-revolution',detailOnly:true,year:1789.46,label:bi('1789年6月','июнь 1789'),title:bi('国民議会の成立','Создание Национального собрания'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:2.35,lat:48.85},
 {id:'fr-bastille',parent:'french-revolution',detailOnly:true,year:1789.54,label:bi('1789年7月14日','14 июля 1789'),title:bi('バスティーユ襲撃','Штурм Бастилии'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:2.37,lat:48.85},
 {id:'fr-rights',parent:'french-revolution',detailOnly:true,year:1789.65,label:bi('1789年8月','август 1789'),title:bi('人間と市民の権利の宣言','Декларация прав человека и гражданина'),lane:2,cat:'ideas',region:'Europe',regionLabel:REGION.Europe,lon:2.35,lat:48.85},
 {id:'fr-constitution1791',parent:'french-revolution',detailOnly:true,year:1791.7,label:bi('1791','1791'),title:bi('1791年憲法','Конституция 1791 года'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:2.35,lat:48.85},
 {id:'fr-republic1792',parent:'french-revolution',detailOnly:true,year:1792.72,label:bi('1792','1792'),title:bi('王政廃止・共和政へ','Упразднение монархии и республика'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:2.35,lat:48.85},
 {id:'fr-louis1793',parent:'french-revolution',detailOnly:true,year:1793.05,label:bi('1793年1月','январь 1793'),title:bi('ルイ16世処刑','Казнь Людовика XVI'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:2.35,lat:48.85},
 {id:'fr-terror1793',parent:'french-revolution',detailOnly:true,year:1793.7,label:bi('1793–94','1793–94'),title:bi('恐怖政治','Террор'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:2.35,lat:48.85},
 {id:'fr-napoleon1799',parent:'french-revolution',detailOnly:true,year:1799.86,label:bi('1799','1799'),title:bi('ブリュメール18日のクーデタ','Переворот 18 брюмера'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:2.35,lat:48.85},
 {id:'ww1-sarajevo',parent:'ww1',detailOnly:true,year:1914.48,label:bi('1914年6月','июнь 1914'),title:bi('サラエボ事件','Сараевское убийство'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:18.41,lat:43.86},
 {id:'ww1-july-crisis',parent:'ww1',detailOnly:true,year:1914.56,label:bi('1914年7月','июль 1914'),title:bi('七月危機','Июльский кризис'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:16.37,lat:48.21},
 {id:'ww1-trench',parent:'ww1',detailOnly:true,year:1915,label:bi('1914–15','1914–15'),title:bi('西部戦線の塹壕戦','Окопная война на Западном фронте'),lane:3,cat:'tech',region:'Europe',regionLabel:REGION.Europe,lon:3,lat:50},
 {id:'ww1-versailles',parent:'ww1',detailOnly:true,year:1919.48,label:bi('1919','1919'),title:bi('ヴェルサイユ条約','Версальский договор'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:2.13,lat:48.8},
 {id:'viking-lindisfarne',parent:'viking-age',detailOnly:true,year:793,label:bi('793','793'),title:bi('リンディスファーン襲撃','Набег на Линдисфарн'),lane:1,cat:'power',region:'Northern Europe',regionLabel:REGION['Northern Europe'],lon:-1.8,lat:55.67},
 {id:'viking-danelaw',parent:'viking-age',detailOnly:true,year:878,label:bi('878頃','ок. 878'),title:bi('デーンロウの形成','Формирование Данелага'),lane:1,cat:'power',region:'Northern Europe',regionLabel:REGION['Northern Europe'],lon:-1.5,lat:53},
 {id:'viking-normandy',parent:'viking-age',detailOnly:true,year:911,label:bi('911','911'),title:bi('ノルマンディー公国の成立','Возникновение Нормандии'),lane:1,cat:'power',region:'Europe',regionLabel:REGION.Europe,lon:0.1,lat:49.2},
 {id:'viking-vinland',parent:'viking-age',detailOnly:true,year:1000,label:bi('1000頃','ок. 1000'),title:bi('北大西洋を越えヴィンランドへ','Плавание в Винланд через Северную Атлантику'),lane:0,cat:'human',region:'North America',regionLabel:REGION['North America'],lon:-55.5,lat:51.5},
 {id:'viking-1066',parent:'viking-age',detailOnly:true,year:1066,label:bi('1066','1066'),title:bi('ノルマン征服','Нормандское завоевание Англии'),lane:1,cat:'power',region:'Northern Europe',regionLabel:REGION['Northern Europe'],lon:0.49,lat:50.91}
];
const HINTS={
 sapiens:'Lascaux cave art','cave-art':'Lascaux cave paintings',agriculture:'Neolithic agriculture archaeology',writing:'cuneiform tablet Mesopotamia',qin:'Terracotta Army Qin Shi Huang','rome476':'Roman Empire late antiquity',hijra:'early Islamic manuscript',mongol:'Mongol Empire manuscript',printing:'Gutenberg printing press','printing-revolution':'Gutenberg printing press',reformation:'Martin Luther Reformation painting','atlantic1492':'Christopher Columbus painting','american-independence':'American Revolution painting','french-revolution':'French Revolution Bastille 1789 painting',industrial:'Industrial Revolution factory engraving',ww1:'World War I trench photograph',postwar:'United Nations 1945 photograph',internet:'early internet computer history'
};
const resolved=new Map();
async function resolve(id,title){
 const key=id||String(title||'').slice(0,80);if(resolved.has(key))return resolved.get(key);
 if(D.IMAGES?.[id]){const out={url:D.IMAGES[id],source:'Wikimedia Commons',page:'https://commons.wikimedia.org/'};resolved.set(key,out);return out}
 const p=D.TIMEPOINTS.find(x=>x.id===id);const q=(HINTS[id]||p?.mediaQuery||String(title||id||'history')).trim();
 try{
  const api='https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=8&gsrsearch='+encodeURIComponent(q)+'&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=900&format=json&origin=*';
  const r=await fetch(api,{mode:'cors'});if(!r.ok)throw new Error('commons '+r.status);const j=await r.json();const pages=Object.values(j?.query?.pages||{}).filter(x=>/\.(jpe?g|png|webp|svg)$/i.test(x.title||''));
  const hit=pages.find(x=>x.imageinfo?.[0]?.thumburl)||pages[0];const ii=hit?.imageinfo?.[0];if(!ii?.thumburl)throw new Error('no image');const meta={url:ii.thumburl,source:'Wikimedia Commons',page:ii.descriptionurl||'',license:ii.extmetadata?.LicenseShortName?.value||'',credit:ii.extmetadata?.Artist?.value||''};resolved.set(key,meta);try{sessionStorage.setItem('chronos-media-'+key,JSON.stringify(meta))}catch{}return meta;
 }catch(e){try{const cached=JSON.parse(sessionStorage.getItem('chronos-media-'+key)||'null');if(cached)return cached}catch{}return null}
}
window.CHRONOS_MEDIA={resolve,regionLabel,curated:CURATED};
})();