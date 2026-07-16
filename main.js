const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const stage=document.querySelector('[data-tilt]');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(stage&&!reduced){stage.addEventListener('pointermove',event=>{const r=stage.getBoundingClientRect();const x=(event.clientX-r.left)/r.width-.5;const y=(event.clientY-r.top)/r.height-.5;stage.style.setProperty('--ry',`${x*7}deg`);stage.style.setProperty('--rx',`${y*-5}deg`)});stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--ry','0deg');stage.style.setProperty('--rx','0deg')})}

document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)document.querySelectorAll('details[open]').forEach(other=>{if(other!==detail)other.open=false})}));

document.querySelector('#contact-form')?.addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;const data=new FormData(form);const subject=encodeURIComponent(`Detailing request from ${data.get('firstName')} ${data.get('lastName')}`);const body=encodeURIComponent(`Name: ${data.get('firstName')} ${data.get('lastName')}\nPhone: ${data.get('phone')}\n\nVehicle / service request:\n${data.get('message')}`);form.querySelector('.form-status').textContent='Opening your email app to complete the request…';window.location.href=`mailto:topnotchautospa33@gmail.com?subject=${subject}&body=${body}`});

const galleryItems=[...document.querySelectorAll('.gallery-grid figure')];
const lightbox=document.querySelector('.lightbox');
const lightboxImage=lightbox?.querySelector('img');
const lightboxCaption=lightbox?.querySelector('p');
let activeGalleryIndex=0;
let galleryTrigger=null;
function showGalleryImage(index){
  activeGalleryIndex=(index+galleryItems.length)%galleryItems.length;
  const item=galleryItems[activeGalleryIndex];
  const image=item.querySelector('img');
  lightboxImage.src=image.src;
  lightboxImage.alt=image.alt;
  lightboxCaption.textContent=item.querySelector('figcaption').childNodes[0].textContent.trim();
}
function openLightbox(index,trigger){
  if(!lightbox)return;
  galleryTrigger=trigger;
  showGalleryImage(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('lightbox-open');
  lightbox.querySelector('.lightbox-close').focus();
}
function closeLightbox(){
  if(!lightbox)return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('lightbox-open');
  galleryTrigger?.focus();
}
galleryItems.forEach((item,index)=>{
  item.addEventListener('click',()=>openLightbox(index,item));
  item.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openLightbox(index,item)}});
});
lightbox?.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox?.querySelector('.lightbox-prev').addEventListener('click',()=>showGalleryImage(activeGalleryIndex-1));
lightbox?.querySelector('.lightbox-next').addEventListener('click',()=>showGalleryImage(activeGalleryIndex+1));
lightbox?.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox()});
document.addEventListener('keydown',event=>{if(!lightbox?.classList.contains('open'))return;if(event.key==='Escape')closeLightbox();if(event.key==='ArrowLeft')showGalleryImage(activeGalleryIndex-1);if(event.key==='ArrowRight')showGalleryImage(activeGalleryIndex+1)});

const searchRoutes=[
  {terms:['price','pricing','cost','package','level'],url:'pricing.html#packages'},
  {terms:['interior price','stain','shampoo','small vehicle','large vehicle'],url:'pricing.html#interior-pricing'},
  {terms:['add on','addon','pet hair','odor','trash','tire shine','spray wax'],url:'pricing.html#addons'},
  {terms:['interior','vacuum','seat','carpet'],url:'index.html#interior'},
  {terms:['ceramic','coating','protection'],url:'index.html#services'},
  {terms:['polish','paint','wax','exterior'],url:'index.html#services'},
  {terms:['gallery','photos','work'],url:'index.html#work'},
  {terms:['location','address','directions','chicopee'],url:'index.html#location'},
  {terms:['contact','phone','appointment','book'],url:'index.html#contact'}
];
document.querySelector('.site-search')?.addEventListener('submit',event=>{
  event.preventDefault();
  const input=event.currentTarget.querySelector('input');
  const query=input.value.trim().toLowerCase();
  if(!query){input.focus();return}
  const result=searchRoutes.find(item=>item.terms.some(term=>query.includes(term)||term.includes(query)));
  window.location.href=result?.url||'index.html#services';
});
document.querySelector('#year').textContent=new Date().getFullYear();
