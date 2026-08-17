(()=>{const D=window.CHRONOS_DATA;if(!D?.TIMEPOINTS)return;const has=id=>D.TIMEPOINTS.some(p=>p.id===id);const add=p=>{if(!has(p.id))D.TIMEPOINTS.push(p)};[
{id:'chernobyl',label:{ja:'1986',ru:'1986'},title:{ja:'チェルノブイリ原発事故',ru:'Авария на Чернобыльской АЭС'},cat:'tech',year:1986,lane:3,region:'Eastern Europe',lon:30.1,lat:51.4},
{id:'tiananmen1989',label:{ja:'1989',ru:'1989'},title:{ja:'天安門事件',ru:'События на площади Тяньаньмэнь'},cat:'power',year:1989,lane:1,region:'East Asia',lon:116.4,lat:39.9},
{id:'german-reunification',label:{ja:'1990',ru:'1990'},title:{ja:'ドイツ再統一',ru:'Объединение Германии'},cat:'power',year:1990,lane:1,region:'Europe',lon:13.4,lat:52.5},
{id:'rwanda1994',label:{ja:'1994',ru:'1994'},title:{ja:'ルワンダ虐殺',ru:'Геноцид в Руанде'},cat:'power',year:1994,lane:1,region:'East Africa',lon:30.1,lat:-1.9},
{id:'wto1995',label:{ja:'1995',ru:'1995'},title:{ja:'世界貿易機関（WTO）発足',ru:'Создание Всемирной торговой организации'},cat:'tech',year:1995,lane:3,region:'Global',lon:6.1,lat:46.2},
{id:'china-wto',label:{ja:'2001',ru:'2001'},title:{ja:'中国がWTO加盟',ru:'Китай вступает в ВТО'},cat:'tech',year:2001,lane:3,region:'East Asia / Global',lon:116.4,lat:39.9},
{id:'iraq2003',label:{ja:'2003',ru:'2003'},title:{ja:'イラク戦争',ru:'Война в Ираке'},cat:'power',year:2003,lane:1,region:'West Asia',lon:44.4,lat:33.3},
{id:'eu2004',label:{ja:'2004',ru:'2004'},title:{ja:'EUの東方拡大',ru:'Расширение ЕС на восток'},cat:'power',year:2004,lane:1,region:'Europe',lon:20,lat:50},
{id:'smartphone2007',label:{ja:'2007頃',ru:'ок. 2007'},title:{ja:'スマートフォン時代の加速',ru:'Ускорение эпохи смартфонов'},cat:'tech',year:2007,lane:3,region:'Global',lon:-122.4,lat:37.8},
{id:'crimea-donbas2014',label:{ja:'2014',ru:'2014'},title:{ja:'ロシアによるクリミア併合とドンバス戦争の開始',ru:'Аннексия Крыма Россией и начало войны на Донбассе'},cat:'power',year:2014,lane:1,region:'Eastern Europe',lon:34,lat:48},
{id:'paris2015',label:{ja:'2015',ru:'2015'},title:{ja:'パリ協定',ru:'Парижское соглашение по климату'},cat:'human',year:2015,lane:0,region:'Global',lon:2.35,lat:48.86},
{id:'fullscale-ukraine2022',label:{ja:'2022',ru:'2022'},title:{ja:'ロシアによるウクライナ全面侵攻',ru:'Полномасштабное вторжение России в Украину'},cat:'power',year:2022,lane:1,region:'Eastern Europe',lon:31,lat:49},
{id:'generative-ai2022',label:{ja:'2022頃',ru:'ок. 2022'},title:{ja:'生成AIの大衆利用が急拡大',ru:'Резкий рост массового использования генеративного ИИ'},cat:'tech',year:2022.5,lane:3,region:'Global',lon:-122.4,lat:37.8}
].forEach(add);D.TIMEPOINTS.sort((a,b)=>(Number(a.year)||0)-(Number(b.year)||0));})();
