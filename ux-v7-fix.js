(()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const queries={viking:'Oseberg Viking ship museum',egypt:'Great Pyramids Giza Egypt',french:'French Revolution Bastille 1789 painting',silk:'Silk Road caravan mural',mongol:'Mongol Empire manuscript horsemen',crusades:'Crusades medieval manuscript',exploration:'Age of Discovery historical map ships'};
function repairNavId(){const s=$('#bottomNav [data-route="library"] span');if(s&&!s.id)s.id='navLibrary'}
function repairMedia(root=document){root.querySelectorAll?.('img[data-media-id]')?.forEach(im=>{const q=queries[im.dataset.mediaId];if(q)im.dataset.mediaTitle=q})}
repairNavId();repairMedia();
const mo=new MutationObserver(ms=>{repairNavId();ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)repairMedia(n)}))});
mo.observe(document.body,{childList:true,subtree:true});
})();