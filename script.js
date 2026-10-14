(() => {
"use strict";
const EMAIL="kimzfinearts@gmail.com";
const services=[
["Flyer design","PRINT / DIGITAL","Promote an event, offer, or idea with a flyer that gets noticed.",["Bold & expressive","Refined & editorial"],["A NEW POINT OF VIEW","LESS, BUT BETTER"],["MAKE|IT LOUD.","A FRESH|PERSPECTIVE."]],
["Poster design","PRINT / CAMPAIGN","Large-format visuals that communicate a message from across the room.",["Type-led impact","Artful & experimental"],["SAVE THE DATE","ART / CULTURE / SOUND"],["MAKE|NOISE.","FEEL|SOMETHING."]],
["Business card design","BRANDING / PRINT","A polished first impression for your brand, with contact details made easy to remember.",["Minimal & premium","Color-forward"],["YOUR NAME / YOUR BRAND","A BRAND THAT STANDS OUT"],["MAKE|CONTACT.","HELLO|THERE."]],
["Resume / CV creation","DOCUMENT / LAYOUT","A clear, professional CV layout that makes your experience easy to scan.",["Clean & professional","Creative & distinctive"],["PROFILE / EXPERIENCE / SKILLS","CREATIVE PROFILE"],["YOUR NEXT|CHAPTER.","MAKE|YOUR MARK."]],
["Logo design & brand identity","BRAND SYSTEM","Build a memorable visual identity with a logo, color palette, and consistent design language.",["Geometric & confident","Organic & expressive"],["IDENTITY CONCEPT / 01","IDENTITY CONCEPT / 02"],["FORM|FOLLOWS.","GROW|WITH IT."]],
["Social media designs","DIGITAL / CONTENT","Scroll-stopping posts, stories, and campaign templates that keep your content consistent.",["Loud & social-first","Soft & curated"],["YOUR NEXT POST","A MOMENT TO NOTICE"],["STOP|THE SCROLL.","GOOD|THINGS."]],
["YouTube thumbnails & channel graphics","VIDEO / CHANNEL","A cohesive channel look and clear thumbnail concepts designed to earn attention.",["High-energy thumbnail","Cinematic & clean"],["NEW VIDEO / EPISODE 08","THE CREATIVE PROCESS"],["THIS|CHANGES.","BEHIND|THE WORK."]],
["Video intros & outros","MOTION / VIDEO","A strong opening or closing frame to give your videos a recognizable finish.",["Kinetic & punchy","Sleek & cinematic"],["INTRO SEQUENCE / 01","TITLE SEQUENCE / 02"],["READY|SET GO.","THE|NEXT FRAME."]],
["Brochures / menus / catalogues","EDITORIAL / PRINT","Well-organized multi-page layouts that make information and products feel inviting.",["Editorial & structured","Warm & tactile"],["COLLECTION / ISSUE 01","A TASTE OF SOMETHING GOOD"],["MADE|TO EXPLORE.","TAKE|YOUR TIME."]],
["Invitations & event graphics","EVENT / STATIONERY","Invitations and matching event graphics that set the tone before the day arrives.",["Elegant & timeless","Modern & playful"],["YOU ARE INVITED","LET'S CELEBRATE"],["A DAY|TO REMEMBER.","GOOD|TIMES AHEAD."]],
["Digital ads / web banners / cover art","DIGITAL / CAMPAIGN","Digital campaign graphics that bring a clear message and consistent look to every placement.",["Direct & high-impact","Minimal & premium"],["A BETTER WAY TO SHOW UP","MADE FOR WHAT'S NEXT"],["GO|BIGGER.","THE|NEW STANDARD."]]
];
const descriptions=[
["High contrast, oversized type, and energetic composition for a confident first impression.","A quieter, considered layout with strong hierarchy and a contemporary editorial feel."],
["Oversized typography and a punchy accent color built for instant recognition.","Layered shapes and an expressive composition for culture, music, or creative events."],
["A restrained, high-contrast card with confident typography and breathing room.","A brighter identity treatment that makes your card stand out in a stack."],
["A structured grid and clear section headings make your experience easy to scan.","A more expressive editorial layout for creative roles and personal brands."],
["Simple geometry and a strong symbol create a flexible, recognizable identity.","Softer forms and warm color create an approachable, character-led brand."],
["Bold text, vivid accents, and quick-read hierarchy for busy feeds.","A clean, balanced look for brands that want a calm, cohesive feed."],
["Large type and a strong focal point designed to read at small sizes.","Darker tones and spacious composition for a polished, cinematic channel."],
["Vivid color and sharp shapes create an energetic motion-graphic direction.","A minimal title-card direction for a refined, premium feel."],
["Thoughtful spacing, clear typography, and an organized grid for easy reading.","A warm palette and expressive type for menus and boutique catalogues."],
["Balanced typography and subtle details for a graceful, lasting impression.","Unexpected color and a lively layout for celebrations with personality."],
["A crisp message, strong contrast, and a clear focal point for campaign placements.","A restrained, polished visual system for an understated digital presence."]
];
const list=document.querySelector("#services-list"),modal=document.querySelector("#service-modal");
const $=s=>document.querySelector(s);
let current=0,sample=0,lastFocus=null;
function compose(subject,body=""){return "https://mail.google.com/mail/?"+new URLSearchParams({view:"cm",fs:"1",to:EMAIL,su:subject,body}).toString()}
document.querySelectorAll(".gmail-link").forEach(a=>{a.href=compose(a.dataset.subject||"I have work for you");a.target="_blank";a.rel="noopener noreferrer"});
services.forEach((s,i)=>{const row=document.createElement("div");row.className="service-row";const b=document.createElement("button");b.className="service-button";b.type="button";b.setAttribute("aria-haspopup","dialog");b.innerHTML=`<span class="service-num">${String(i+1).padStart(2,"0")}</span><span class="service-name"></span><span class="service-type"></span><span class="service-arrow">↗</span>`;b.querySelector(".service-name").textContent=s[0];b.querySelector(".service-type").textContent=s[1];b.addEventListener("click",()=>open(i,b));row.append(b);list.append(row)});
function setSample(n){
sample=n;
const s=services[current],v=n;
document.querySelectorAll(".tab").forEach((t,i)=>{t.classList.toggle("active",i===n);t.setAttribute("aria-selected",String(i===n));t.tabIndex=i===n?0:-1});
$("#sample-panel").setAttribute("aria-labelledby",`tab-${n+1}`);
$("#preview").dataset.variant=String(n);
const art=$("#preview-image");
art.src=`images/service-${String(current+1).padStart(2,"0")}-sample-${n+1}.svg`;
art.alt=`Original ${s[0]} artwork, Sample ${n+1}: ${s[3][n]}`;
$("#preview-index").textContent=String(n+1).padStart(2,"0");
$("#sample-title").textContent=`0${n+1} — ${s[3][n]}`;
$("#sample-description").textContent=descriptions[current][n];
const body=`Hi, I would like to request a project similar to ${s[0]} (Sample ${n+1}).\\n\\nMy project details:\\n- Goal:\\n- Preferred timeline:\\n- Other details:\\n\\nThank you.`;
$("#request-project").href=compose(`Request for ${s[0]}`,body)
}
function open(i,trigger){current=i;lastFocus=trigger;$("#modal-title").textContent=services[i][0];$("#modal-description").textContent=services[i][2];$("#modal-number").textContent=`SERVICE ${String(i+1).padStart(2,"0")}`;setSample(0);modal.hidden=false;document.body.classList.add("modal-open");$(".close").focus()}
function close(){if(modal.hidden)return;modal.hidden=true;document.body.classList.remove("modal-open");if(lastFocus)lastFocus.focus()}
document.querySelectorAll(".tab").forEach(t=>{t.addEventListener("click",()=>setSample(Number(t.dataset.sample)));t.addEventListener("keydown",e=>{if(["ArrowLeft","ArrowRight"].includes(e.key)){e.preventDefault();const n=1-sample;setSample(n);$("#tab-"+(n+1)).focus()}})});
$(".close").addEventListener("click",close);modal.addEventListener("click",e=>{if(e.target===modal)close()});document.addEventListener("keydown",e=>{if(e.key==="Escape")close();if(e.key==="Tab"&&!modal.hidden){const els=[...modal.querySelectorAll("button,a[href]")];if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===els.at(-1)){e.preventDefault();els[0].focus()}}});
const toggle=$(".menu-toggle"),nav=$(".mobile-nav");toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")!=="true";toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");nav.hidden=!open});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.hidden=true;toggle.setAttribute("aria-expanded","false")}));
$("#year").textContent=new Date().getFullYear();
})();