const recipes = [
  {
    name:"Aloo Tamatar Sabzi", cuisine:"Indian", origin:"Classic North Indian", emoji:"🍛", time:"25 min",
    base:2, keywords:["potato","onion","tomato","garlic","ginger"],
    ingredients:[
      ["Potatoes","300 g"],["Tomato","2 medium"],["Onion","1 medium"],["Garlic","3 cloves"],
      ["Oil","1.5 tbsp"],["Cumin seeds","1 tsp"],["Turmeric","1/2 tsp"],["Red chilli powder","1/2 tsp"],
      ["Coriander powder","1 tsp"],["Salt","3/4 tsp"],["Water","120 ml"],["Fresh coriander","2 tbsp"]
    ],
    steps:["Dice the potatoes and chop onion, tomato and garlic.","Heat oil in a pan. Add cumin and let it crackle.","Add onion and garlic; cook for 3–4 minutes until lightly golden.","Add tomato, turmeric, chilli powder, coriander powder and salt. Cook until soft.","Add potatoes and water. Cover and simmer for 12–15 minutes until potatoes are tender.","Finish with fresh coriander and serve hot with roti or rice."],
    sub:"No fresh coriander? Use 1/2 tsp dried coriander leaves or skip it."
  },
  {
    name:"Veggie Hakka Noodles", cuisine:"Chinese", origin:"Indo-Chinese", emoji:"🍜", time:"20 min",
    base:2, keywords:["noodle","onion","carrot","cabbage","capsicum","garlic"],
    ingredients:[
      ["Hakka noodles","180 g"],["Oil","1.5 tbsp"],["Garlic","3 cloves"],["Onion","1 small"],
      ["Carrot","1 small"],["Cabbage","1 cup"],["Capsicum","1/2"],["Soy sauce","1 tbsp"],
      ["Vinegar","1 tsp"],["Black pepper","1/2 tsp"],["Salt","1/4 tsp"]
    ],
    steps:["Boil noodles according to the packet instructions. Drain and toss with a few drops of oil.","Heat a wok or large pan on high heat.","Add oil and garlic; stir for 20 seconds.","Add onion, carrot, cabbage and capsicum. Stir-fry for 2–3 minutes, keeping them slightly crunchy.","Add noodles, soy sauce, vinegar and pepper. Toss on high heat for 1–2 minutes.","Taste, adjust salt, and serve immediately."],
    sub:"No cabbage? Use any quick-cooking vegetable such as beans or extra capsicum."
  },
  {
    name:"Quick Tomato Garlic Pasta", cuisine:"Italian", origin:"Simple Italian-inspired", emoji:"🍝", time:"20 min",
    base:2, keywords:["pasta","tomato","onion","garlic","cheese"],
    ingredients:[
      ["Pasta","180 g"],["Tomato","3 medium"],["Onion","1 small"],["Garlic","4 cloves"],
      ["Olive oil or regular oil","1.5 tbsp"],["Chilli flakes","1/2 tsp"],["Black pepper","1/2 tsp"],
      ["Salt","3/4 tsp"],["Sugar","1/4 tsp"],["Grated cheese","30 g"],["Fresh basil/coriander","2 tbsp"]
    ],
    steps:["Boil pasta in salted water until just tender. Reserve 1/2 cup pasta water and drain.","Heat oil in a pan. Sauté chopped onion and garlic for 2–3 minutes.","Add chopped tomatoes, chilli flakes, pepper, salt and sugar. Cook 7–8 minutes until saucy.","Add cooked pasta and a splash of pasta water. Toss for 1–2 minutes.","Top with grated cheese and fresh herbs.","Serve hot."],
    sub:"No cheese? Finish with a little butter or simply add extra black pepper and herbs."
  }
];

const $ = id => document.getElementById(id);
const servings = $("servings"), cuisine = $("cuisine"), ingredients = $("ingredients");
const grid = $("recipesGrid");

function scaleText(value, factor){
  const m = value.match(/^([\d.]+)\s*(.*)$/);
  if(!m) return value;
  let n = parseFloat(m[1]) * factor;
  let shown = Number.isInteger(n) ? n : Math.round(n*10)/10;
  return shown + " " + m[2];
}
function matches(recipe, words){
  if(!words.length) return true;
  return words.some(w => recipe.keywords.some(k => k.includes(w) || w.includes(k)));
}
function render(list){
  grid.innerHTML = list.map((r,i)=>`
    <article class="recipe-card">
      <div class="recipe-image">${r.emoji}</div>
      <div class="recipe-body">
        <span class="eyebrow dark">${r.cuisine.toUpperCase()}</span>
        <h3>${r.name}</h3>
        <div class="meta">🌎 ${r.origin} · ⏱️ ${r.time} · 👥 ${servings.value} servings</div>
        <div class="tags"><span class="tag">Easy</span><span class="tag">Budget</span><span class="tag">Home-style</span></div>
        <button class="view-btn" onclick="openRecipe(${recipes.indexOf(r)})">View Recipe →</button>
      </div>
    </article>`).join("");
}
function findRecipes(){
  const words = ingredients.value.toLowerCase().split(",").map(x=>x.trim()).filter(Boolean);
  const selected = cuisine.value;
  let list = recipes.filter(r => (selected==="Any" || r.cuisine===selected) && matches(r,words));
  if(!list.length) list = recipes.filter(r => selected==="Any" || r.cuisine===selected);
  $("resultTitle").textContent = words.length ? `${list.length} recipe${list.length>1?"s":""} matched for your ingredients` : "3 easy recipes to get started";
  render(list);
  $("recipes").scrollIntoView({behavior:"smooth"});
}
function openRecipe(index){
  const r = recipes[index], factor = Number(servings.value)/r.base;
  const items = r.ingredients.map(([n,v])=>`<li><strong>${n}:</strong> ${scaleText(v,factor)}</li>`).join("");
  const steps = r.steps.map(s=>`<li>${s}</li>`).join("");
  const modal=document.createElement("div");
  modal.className="modal";
  modal.innerHTML=`<div class="modal-card">
    <button class="close" onclick="this.closest('.modal').remove()">✕</button>
    <span class="eyebrow dark">${r.cuisine.toUpperCase()} · ${r.origin}</span>
    <h2>${r.emoji} ${r.name}</h2>
    <div class="meta">⏱️ ${r.time} · 👥 ${servings.value} servings</div>
    <h4>Exact quantities</h4><ul>${items}</ul>
    <h4>Step-by-step instructions</h4><ol>${steps}</ol>
    <h4>💡 Smart substitution tip</h4><p>${r.sub}</p>
  </div>`;
  modal.addEventListener("click",e=>{if(e.target===modal) modal.remove()});
  document.body.appendChild(modal);
}
$("findBtn").addEventListener("click",findRecipes);
ingredients.addEventListener("keydown",e=>{if(e.key==="Enter")findRecipes()});
$("resetBtn").addEventListener("click",()=>{ingredients.value="";servings.value="2";cuisine.value="Any";$("resultTitle").textContent="3 easy recipes to get started";render(recipes)});
$("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark-mode");$("themeBtn").textContent=document.body.classList.contains("dark-mode")?"☀️":"🌙";localStorage.setItem("rfTheme",document.body.classList.contains("dark-mode")?"dark":"light")});
if(localStorage.getItem("rfTheme")==="dark"){document.body.classList.add("dark-mode");$("themeBtn").textContent="☀️"}
render(recipes);
