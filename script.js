// Dynamic portfolio content. Add projects here instead of editing the HTML.
// To use your own thumbnail, put an image in an images/ folder and set image: "images/your-image.jpg"
// Categories: branding, digital, video, print.
const projects = [
 {title:"Citrus Theory",category:"branding",label:"Brand identity",color:"orange",art:"CITRUS<br>THEORY",sub:"FRESH THINKING / EST. 2026",shape:"circle",image:""},
 {title:"Sound State",category:"digital",label:"Digital campaign",color:"purple",art:"SOUND<br>STATE",sub:"TURN IT UP / VOL. 01",shape:"star",image:""},
 {title:"Form & Field",category:"print",label:"Print design",color:"lime",art:"FORM<br>& FIELD",sub:"OBJECTS FOR EVERYDAY LIVING",shape:"square",image:""},
 {title:"Nova Works",category:"branding",label:"Visual identity",color:"cream",art:"NOVA<br>WORKS",sub:"BUILD WHAT'S NEXT",shape:"circle",image:""},
 {title:"Level Up",category:"digital",label:"YouTube thumbnail",color:"blue",art:"LEVEL<br>UP!",sub:"MAKE YOUR NEXT MOVE",shape:"star",image:""},
 {title:"Motion Identity",category:"video",label:"Intro & outro graphics",color:"dark",art:"MOTION<br>IDENTITY",sub:"FRAME / MOVE / REPEAT",shape:"square",image:""}
];
const grid=document.querySelector("#project-grid");
const filterButtons=document.querySelectorAll(".filter");
function escapeHTML(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderProjects(filter="all"){
 if(!grid)return;
 const items=filter==="all"?projects:projects.filter(p=>p.category===filter);
 grid.innerHTML=items.map((p,i)=>{
  // When image is supplied, use it as the card background; otherwise show the typographic concept artwork.
  const visual=p.image
   ? `<div class="project-visual ${escapeHTML(p.color)}" role="img" aria-label="${escapeHTML(p.title)} project image" style="background-image:linear-gradient(#17171418,#17171418),url('${escapeHTML(p.image)}')"></div>`
   : `<div class="project-visual ${escapeHTML(p.color)}"><span class="project-shape ${escapeHTML(p.shape)}">${p.shape==="star"?"✳":""}</span><div class="project-art-type">${p.art}<small>${escapeHTML(p.sub||p.label)}</small></div></div>`;
  return `<article class="project-card" style="animation-delay:${i*55}ms">${visual}<div class="project-meta"><div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.label)}</p></div><span class="project-tag">${escapeHTML(p.category)}</span></div></article>`;
 }).join("");
 const count=document.querySelector('[data-filter="all"] span');if(count)count.textContent=String(projects.length).padStart(2,"0");
}
filterButtons.forEach(button=>button.addEventListener("click",()=>{
 filterButtons.forEach(b=>{b.classList.remove("active");b.setAttribute("aria-pressed","false");});
 button.classList.add("active");button.setAttribute("aria-pressed","true");renderProjects(button.dataset.filter);
}));
const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav");
if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.textContent=open?"×":"☰";});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.textContent="☰";}));}
const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();
renderProjects();
