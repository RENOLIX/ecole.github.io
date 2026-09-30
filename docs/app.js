const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');navigation.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Ouvrir le menu');menuButton.focus()}});
const viewer=document.querySelector('#viewer');
const galleryButtons=[...document.querySelectorAll('.gallery-open')];let current=0;let opener;
function renderImage(index){current=(index+galleryButtons.length)%galleryButtons.length;const b=galleryButtons[current];const picture=new Image();picture.src=b.dataset.image;picture.alt=b.dataset.caption;document.querySelector('.viewer-content').replaceChildren(picture);document.querySelector('#viewer-caption').textContent=`${current+1} / ${galleryButtons.length} — ${b.dataset.caption}`;}
galleryButtons.forEach((b,i)=>b.addEventListener('click',()=>{opener=b;renderImage(i);viewer.showModal();document.body.classList.add('modal-open')}));
document.querySelector('.dialog-close').addEventListener('click',()=>viewer.close());
document.querySelector('.viewer-prev').addEventListener('click',()=>renderImage(current-1));
document.querySelector('.viewer-next').addEventListener('click',()=>renderImage(current+1));
viewer.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus()});
viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()}});
viewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();renderImage(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();renderImage(current-1)}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('.gallery-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&button.dataset.filter!==card.dataset.type;if(card.hidden)card.querySelector('video')?.pause()})}));
document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause()})));
const form=document.querySelector('#contact-form');
form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const message=`Bonjour Les Génies du Calcul Mental,\n\nJe m’appelle ${String(data.get('parent')).trim()}.\nÂge de mon enfant : ${data.get('age')}.\nObjet : ${data.get('subject')}.\n\n${String(data.get('message')).trim()||'Je souhaite obtenir des renseignements sur votre école.'}\n\nMerci pour votre retour.`;document.querySelector('#preview-text').textContent=message;document.querySelector('#whatsapp-send').href='https://wa.me/33749587024?text='+encodeURIComponent(message);const preview=document.querySelector('#message-preview');preview.hidden=false;preview.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'})});
form?.addEventListener('input',()=>{document.querySelector('#message-preview').hidden=true});
