const menuBtn=document.querySelector(".menu-btn"),nav=document.querySelector(".nav");
menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open);menuBtn.textContent=open?"✕":"☰"});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuBtn.textContent="☰";menuBtn.setAttribute("aria-expanded","false")}));
document.getElementById("year").textContent=new Date().getFullYear();

const selected=[];
const bar=document.getElementById("enquiryBar"),count=document.getElementById("enquiryCount"),modal=document.getElementById("modal"),items=document.getElementById("selectedItems");
document.querySelectorAll(".food-info button").forEach(btn=>btn.addEventListener("click",()=>{
  selected.push({name:btn.dataset.item,price:Number(btn.dataset.price)});
  updateEnquiry();
}));
function updateEnquiry(){count.textContent=`${selected.length} item${selected.length===1?"":"s"} selected`;bar.classList.add("show")}
document.getElementById("viewEnquiry").addEventListener("click",()=>{
  items.innerHTML=selected.length?selected.map((x,i)=>`<div class="selected-line"><span>${i+1}. ${x.name}</span><strong>TT$${x.price}</strong></div>`).join(""):"<p>No items selected yet.</p>";
  const text=selected.length?"Hello Island Table Kitchen! I'd like to enquire about:\n"+selected.map(x=>`• ${x.name} (TT$${x.price})`).join("\n"):"Hello! I'd like to enquire about your menu.";
  document.getElementById("sendOrder").href="https://wa.me/18680000000?text="+encodeURIComponent(text);
  modal.classList.add("open");modal.setAttribute("aria-hidden","false");
});
document.getElementById("closeModal").addEventListener("click",()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true")});
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});

document.getElementById("enquiryForm").addEventListener("submit",e=>{
  e.preventDefault();
  const f=e.currentTarget;
  const text=`Hello Island Table Kitchen! My name is ${f.name.value}. My WhatsApp/phone is ${f.phone.value}.\n\n${f.message.value}`;
  window.open("https://wa.me/18680000000?text="+encodeURIComponent(text),"_blank");
});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
