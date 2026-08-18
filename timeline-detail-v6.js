(()=>{
'use strict';
const D=window.CHRONOS_DATA;if(!D?.TIMEPOINTS)return;
const major=new Set(D.MAJOR_DIAL_IDS||['sapiens','agriculture','writing','rome476','mongol','atlantic1492','french-revolution','ww1','postwar','today']);
const standard=new Set(['dispersal','upper-paleolithic','holocene','uruk','egypt-unification','pyramids','akkadian','hammurabi','shang','bronze-collapse','greek-polis','achaemenid','roman-republic','confucius','buddhism','alexander','maurya','qin','han','silk-road','roman-empire','christianity','gupta','hijra','tang','charlemagne','viking','song','crusades','printing','ottoman1453','reformation','mughal','scientific-revolution','industrial','american-independence','french-revolution','haitian-revolution','latin-america','meiji','ww1','russian-revolution','ww2','postwar','decolonization','internet','today']);
D.TIMEPOINTS.forEach((p,i)=>{if(major.has(p.id))p.timelineLevel=1;else if(standard.has(p.id)||i%3===0)p.timelineLevel=2;else p.timelineLevel=3});
const detail=[
{id:'egypt-old-kingdom',parent:'pyramids',label:{ja:'BC2686頃',ru:'ок. 2686 до н.э.'},title:{ja:'古王国時代が始まる',ru:'Начало Древнего царства'},cat:'power',year:-2686,lane:1,region:'Egypt',lon:31,lat:27,detailOnly:true},
{id:'khufu-reign',parent:'pyramids',label:{ja:'BC2589頃',ru:'ок. 2589 до н.э.'},title:{ja:'クフ王の治世',ru:'Правление Хуфу'},cat:'power',year:-2589,lane:1,region:'Egypt',lon:31.1,lat:29.9,detailOnly:true},
{id:'great-pyramid-build',parent:'pyramids',label:{ja:'BC2560頃',ru:'ок. 2560 до н.э.'},title:{ja:'ギザの大ピラミッド建設',ru:'Строительство Великой пирамиды'},cat:'tech',year:-2560,lane:3,region:'Egypt',lon:31.13,lat:29.98,detailOnly:true},
{id:'sack-rome-410',parent:'rome476',label:{ja:'410',ru:'410'},title:{ja:'西ゴート族がローマを略奪',ru:'Вестготы разграбили Рим'},cat:'power',year:410,lane:1,region:'Europe',lon:12.5,lat:41.9,detailOnly:true},
{id:'catalaunian-451',parent:'rome476',label:{ja:'451',ru:'451'},title:{ja:'カタラウヌムの戦い',ru:'Битва на Каталаунских полях'},cat:'power',year:451,lane:1,region:'Europe',lon:4.4,lat:48.9,detailOnly:true},
{id:'vandal-sack-455',parent:'rome476',label:{ja:'455',ru:'455'},title:{ja:'ヴァンダル族がローマを略奪',ru:'Вандалы разграбили Рим'},cat:'power',year:455,lane:1,region:'Europe',lon:12.5,lat:41.9,detailOnly:true},
{id:'odoacer-476',parent:'rome476',label:{ja:'476',ru:'476'},title:{ja:'ロムルス・アウグストゥルス退位',ru:'Свержение Ромула Августула'},cat:'power',year:476,lane:1,region:'Italy',lon:12.5,lat:42,detailOnly:true},
{id:'ostrogothic-493',parent:'rome476',label:{ja:'493',ru:'493'},title:{ja:'東ゴート王国がイタリアを支配',ru:'Остготское королевство в Италии'},cat:'power',year:493,lane:1,region:'Italy',lon:12.5,lat:42,detailOnly:true},
{id:'justinian-527',parent:'rome476',label:{ja:'527',ru:'527'},title:{ja:'ユスティニアヌス1世即位',ru:'Воцарение Юстиниана I'},cat:'power',year:527,lane:1,region:'Eastern Mediterranean',lon:28.9,lat:41,detailOnly:true},
{id:'hagia-sophia-537',parent:'rome476',label:{ja:'537',ru:'537'},title:{ja:'ハギア・ソフィア完成',ru:'Завершение собора Святой Софии'},cat:'tech',year:537,lane:3,region:'Constantinople',lon:28.98,lat:41.01,detailOnly:true},
{id:'lindisfarne-793',parent:'viking',label:{ja:'793',ru:'793'},title:{ja:'リンディスファーン襲撃',ru:'Набег на Линдисфарн'},cat:'power',year:793,lane:1,region:'Britain',lon:-1.8,lat:55.7,detailOnly:true},
{id:'great-heathen-army-865',parent:'viking',label:{ja:'865',ru:'865'},title:{ja:'大異教軍がイングランドへ',ru:'Великая языческая армия в Англии'},cat:'power',year:865,lane:1,region:'Britain',lon:-1.2,lat:53,detailOnly:true},
{id:'edington-878',parent:'viking',label:{ja:'878',ru:'878'},title:{ja:'エディントンの戦い',ru:'Битва при Эдингтоне'},cat:'power',year:878,lane:1,region:'Britain',lon:-2.1,lat:51.3,detailOnly:true},
{id:'normandy-911',parent:'viking',label:{ja:'911',ru:'911'},title:{ja:'ノルマンディー成立',ru:'Возникновение Нормандии'},cat:'power',year:911,lane:1,region:'France',lon:0.2,lat:49.2,detailOnly:true},
{id:'cnut-1016',parent:'viking',label:{ja:'1016',ru:'1016'},title:{ja:'クヌートがイングランド王に',ru:'Кнуд стал королём Англии'},cat:'power',year:1016,lane:1,region:'Britain / Scandinavia',lon:0,lat:55,detailOnly:true},
{id:'stamford-bridge-1066',parent:'viking',label:{ja:'1066',ru:'1066'},title:{ja:'スタンフォード・ブリッジの戦い',ru:'Битва при Стамфорд-Бридже'},cat:'power',year:1066,lane:1,region:'Britain',lon:-1.3,lat:53.9,detailOnly:true},
{id:'printing-mainz-1450',parent:'printing',label:{ja:'1450頃',ru:'ок. 1450'},title:{ja:'マインツで活版印刷が発展',ru:'Развитие книгопечатания в Майнце'},cat:'tech',year:1450,lane:3,region:'Europe',lon:8.27,lat:50,detailOnly:true},
{id:'columbus-1492',parent:'atlantic1492',label:{ja:'1492',ru:'1492'},title:{ja:'コロンブス航海と大西洋接続',ru:'Плавание Колумба и атлантическая связь'},cat:'power',year:1492,lane:1,region:'Atlantic',lon:-40,lat:28,detailOnly:true},
{id:'treaty-tordesillas-1494',parent:'atlantic1492',label:{ja:'1494',ru:'1494'},title:{ja:'トルデシリャス条約',ru:'Тордесильясский договор'},cat:'power',year:1494,lane:1,region:'Atlantic',lon:-8,lat:39,detailOnly:true},
{id:'diet-worms-1521',parent:'reformation',label:{ja:'1521',ru:'1521'},title:{ja:'ヴォルムス帝国議会',ru:'Вормсский рейхстаг'},cat:'ideas',year:1521,lane:2,region:'Europe',lon:8.36,lat:49.6,detailOnly:true},
{id:'estates-general-1789',parent:'french-revolution',label:{ja:'1789年5月',ru:'май 1789'},title:{ja:'三部会が招集される',ru:'Созыв Генеральных штатов'},cat:'power',year:1789.35,lane:1,region:'France',lon:2.1,lat:48.8,detailOnly:true},
{id:'national-assembly-1789',parent:'french-revolution',label:{ja:'1789年6月',ru:'июнь 1789'},title:{ja:'国民議会の成立',ru:'Создание Национального собрания'},cat:'power',year:1789.45,lane:1,region:'France',lon:2.1,lat:48.8,detailOnly:true},
{id:'bastille-1789',parent:'french-revolution',label:{ja:'1789年7月14日',ru:'14 июля 1789'},title:{ja:'バスティーユ襲撃',ru:'Взятие Бастилии'},cat:'power',year:1789.53,lane:1,region:'France',lon:2.37,lat:48.85,detailOnly:true},
{id:'rights-man-1789',parent:'french-revolution',label:{ja:'1789年8月',ru:'август 1789'},title:{ja:'人間と市民の権利の宣言',ru:'Декларация прав человека и гражданина'},cat:'ideas',year:1789.65,lane:2,region:'France',lon:2.35,lat:48.86,detailOnly:true},
{id:'republic-1792',parent:'french-revolution',label:{ja:'1792',ru:'1792'},title:{ja:'フランス第一共和政成立',ru:'Провозглашение Первой республики'},cat:'power',year:1792,lane:1,region:'France',lon:2.35,lat:48.86,detailOnly:true},
{id:'louis-execution-1793',parent:'french-revolution',label:{ja:'1793年1月',ru:'январь 1793'},title:{ja:'ルイ16世処刑',ru:'Казнь Людовика XVI'},cat:'power',year:1793.05,lane:1,region:'France',lon:2.32,lat:48.86,detailOnly:true},
{id:'terror-1793',parent:'french-revolution',label:{ja:'1793–94',ru:'1793–94'},title:{ja:'恐怖政治',ru:'Якобинский террор'},cat:'power',year:1793.6,lane:1,region:'France',lon:2.35,lat:48.86,detailOnly:true},
{id:'napoleon-coup-1799',parent:'french-revolution',label:{ja:'1799',ru:'1799'},title:{ja:'ブリュメール18日のクーデタ',ru:'Переворот 18 брюмера'},cat:'power',year:1799,lane:1,region:'France',lon:2.35,lat:48.86,detailOnly:true},
{id:'sarajevo-1914',parent:'ww1',label:{ja:'1914年6月',ru:'июнь 1914'},title:{ja:'サラエボ事件',ru:'Сараевское убийство'},cat:'power',year:1914.48,lane:1,region:'Europe',lon:18.4,lat:43.8,detailOnly:true},
{id:'july-crisis-1914',parent:'ww1',label:{ja:'1914年7月',ru:'июль 1914'},title:{ja:'七月危機',ru:'Июльский кризис'},cat:'power',year:1914.56,lane:1,region:'Europe',lon:15,lat:48,detailOnly:true},
{id:'marne-1914',parent:'ww1',label:{ja:'1914年9月',ru:'сентябрь 1914'},title:{ja:'第一次マルヌ会戦',ru:'Первая битва на Марне'},cat:'power',year:1914.72,lane:1,region:'Europe',lon:3,lat:49,detailOnly:true},
{id:'verdun-1916',parent:'ww1',label:{ja:'1916',ru:'1916'},title:{ja:'ヴェルダンの戦い',ru:'Битва при Вердене'},cat:'power',year:1916,lane:1,region:'Europe',lon:5.4,lat:49.2,detailOnly:true},
{id:'us-entry-1917',parent:'ww1',label:{ja:'1917',ru:'1917'},title:{ja:'アメリカが参戦',ru:'Вступление США в войну'},cat:'power',year:1917,lane:1,region:'Atlantic',lon:-30,lat:40,detailOnly:true},
{id:'armistice-1918',parent:'ww1',label:{ja:'1918年11月',ru:'ноябрь 1918'},title:{ja:'休戦協定',ru:'Компьенское перемирие'},cat:'power',year:1918.87,lane:1,region:'Europe',lon:2.8,lat:49.4,detailOnly:true},
{id:'versailles-1919',parent:'ww1',label:{ja:'1919',ru:'1919'},title:{ja:'ヴェルサイユ条約',ru:'Версальский договор'},cat:'power',year:1919,lane:1,region:'Europe',lon:2.1,lat:48.8,detailOnly:true}
];
const existing=new Set((D.DETAIL_POINTS||[]).map(x=>x.id));D.DETAIL_POINTS=D.DETAIL_POINTS||[];detail.forEach(x=>{if(!existing.has(x.id))D.DETAIL_POINTS.push(x)});
})();