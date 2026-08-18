/* ============================================================
   EASTERN HOPE LTD — SITE SCRIPT
   Vanilla JS. No build step. No frameworks required.
   ============================================================ */

/* ================= CONFIGURATION (edit here only) ================= */
const CONFIG = {
  // Published Eastern Hope contact number, used for the WhatsApp button.
  // Confirm this line is WhatsApp-enabled before publishing; change here only.
  WHATSAPP_NUMBER: "250788301351",
  CONTACT_EMAIL: "info@easternhopeltd.com",
  COMPANY_NAME: "Eastern Hope Ltd",

  // Where quote / contact form submissions go. This starter site submits by
  // opening a pre-filled email (mailto:) so it works with zero backend.
  // To go live with real form delivery, replace SUBMIT_ENDPOINT with a
  // Formspree / Netlify Forms / custom API endpoint and see submitLead()
  // below for the fetch() call to enable.
  SUBMIT_ENDPOINT: "" // e.g. "https://formspree.io/f/xxxxxxx"
};

/* ================= PRODUCT DATA ================= */
const PRODUCTS = [
  {
    id: "deformed-bars", code: "EH-01", name: "Deformed Bars",
    img: "images/deformed-bars.svg",
    short: "High-quality reinforcement steel for construction applications.",
    desc: "Ribbed reinforcement steel bars used to strengthen concrete in slabs, columns, beams and foundations. Imported to structural grade and stocked across the standard diameter range.",
    tags: ["Ø5–Ø40", "Structural"],
    specs: [["Category","Reinforcement"], ["Range","Ø5 mm – Ø40 mm"], ["Form","Straight lengths"], ["Typical use","Concrete reinforcement"]],
    options: ["Ø8","Ø10","Ø12","Ø14","Ø16","Ø20","Ø25","Ø32","Ø40"],
    keywords: ["deformed bar","deformed bars","rebar","rebars","reinforcement bar","reinforcement","iron sheet bar","concrete bar"]
  },
  {
    id: "angles", code: "EH-02", name: "Angle",
    img: "images/angles.svg",
    short: "Equal-leg L-profile steel for framing, brackets and supports.",
    desc: "Hot-rolled L-shaped steel angle used for structural framing, bracing, brackets and general fabrication work.",
    tags: ["L-Profile", "Equal Leg"],
    specs: [["Category","Structural Profile"], ["Shape","L (equal leg)"], ["Form","6m lengths"], ["Typical use","Framing & brackets"]],
    options: ["25x25x3","30x30x3","40x40x4","50x50x5","60x60x6","65x65x6"],
    keywords: ["angle","angles","l-profile","l profile","angle bar","angle iron"]
  },
  {
    id: "tee-angle", code: "EH-03", name: "Tee Angle",
    img: "images/tee-angle.svg",
    short: "T-shaped structural steel sections for reinforced framing.",
    desc: "T-profile structural steel, commonly specified as T20 or T25, used where a stiffer cross-section is needed than standard angle.",
    tags: ["T20", "T25"],
    specs: [["Category","Structural Profile"], ["Shape","T-section"], ["Grades","T20 · T25"], ["Typical use","Structural framing"]],
    options: ["T20","T25"],
    keywords: ["tee angle","tee angles","t angle","t-profile","t profile","t20","t25"]
  },
  {
    id: "hollow-sections", code: "EH-04", name: "Hollow Section",
    img: "images/hollow-sections.svg",
    short: "Square and rectangular steel tubing for structural and fencing work.",
    desc: "Cold-formed square and rectangular hollow steel sections, ranging from 80/40 down to 16/16, in multiple wall thicknesses — used for gates, fencing, carports and light structural framing.",
    tags: ["80/40–16/16", "1–2mm"],
    specs: [["Category","Hollow / Tube"], ["Range","80/40 – 16/16"], ["Thickness","1mm · 1.25mm · 1.5mm · 2mm"], ["Typical use","Gates, fencing, framing"]],
    options: ["16/16","20/20","25/25","30/30","40/40","40/80","50/50"],
    keywords: ["hollow section","hollow sections","square tube","rectangular tube","steel tube","steel pipe","tube steel"]
  },
  {
    id: "door-frame", code: "EH-05", name: "Door Frame",
    img: "images/door-frame.svg",
    short: "Welded steel door frames (hollow section) for construction sites.",
    desc: "Ready-to-install welded steel door frames fabricated from hollow section, sized to standard door openings for residential and commercial builds.",
    tags: ["Welded", "H.S."],
    specs: [["Category","Fabricated"], ["Base material","Hollow section"], ["Form","Pre-welded frame"], ["Typical use","Doorway installation"]],
    options: ["Standard 900mm","Standard 1000mm","Double-leaf 1500mm"],
    keywords: ["door frame","door frames","steel door frame","frame h.s.","frame hs"]
  },
  {
    id: "bottle-profile", code: "EH-06", name: "Bottle Profile",
    img: "images/bottle-profile.svg",
    short: "Bottle-shaped steel profile used in fencing and gate work.",
    desc: "Distinctive bottle-shaped steel profile, commonly used as decorative and structural fencing infill for perimeter walls and gates.",
    tags: ["Fencing", "Decorative"],
    specs: [["Category","Profile"], ["Shape","Bottle profile"], ["Form","Standard lengths"], ["Typical use","Fencing & gates"]],
    options: ["Standard"],
    keywords: ["bottle profile","bottle profiles"]
  },
  {
    id: "flat-bars", code: "EH-07", name: "Flat Bar",
    img: "images/flat-bars.svg",
    short: "Flat steel bar stock for fabrication and structural bracing.",
    desc: "Hot-rolled flat steel bars used for bracing, fabrication, gate frames and general workshop use.",
    tags: ["Structural", "Multiple widths"],
    specs: [["Category","Bar Stock"], ["Shape","Flat rectangular"], ["Form","6m lengths"], ["Typical use","Bracing & fabrication"]],
    options: ["20x3","25x3","25x5","40x5","50x6"],
    keywords: ["flat bar","flat bars","flats","flat steel"]
  },
  {
    id: "omega-profile", code: "EH-08", name: "Omega Profile",
    img: "images/omega-profile.svg",
    short: "Galvanized Omega-shaped profile for roofing and ceiling systems.",
    desc: "Ω-shaped galvanized steel profile used as a purlin and support member in roofing and suspended ceiling construction.",
    tags: ["Galvanized", "Roofing"],
    specs: [["Category","Profile"], ["Shape","Omega (Ω)"], ["Finish","Galvanized"], ["Typical use","Roofing & ceilings"]],
    options: ["Standard"],
    keywords: ["omega profile","omega profiles","omega"]
  },
  {
    id: "triplex", code: "EH-09", name: "Triplex / Tole Plane",
    img: "images/triplex.svg",
    short: "Corrugated steel roofing and cladding sheets.",
    desc: "Corrugated steel sheeting (Triplex / Tole Plane) used for roofing, cladding and general construction cover.",
    tags: ["Roofing", "Sheets"],
    specs: [["Category","Sheet"], ["Profile","Corrugated"], ["Form","Standard sheet lengths"], ["Typical use","Roofing & cladding"]],
    options: ["Standard gauge","Heavy gauge"],
    keywords: ["triplex","tole plane","tole","roofing sheet","roofing sheets","iron sheet","iron sheets","corrugated sheet"]
  }
];

/* ================= GALLERY DATA ================= */
const GALLERY = [
  { img:"images/deformed-bars.svg", cat:"products", label:"Deformed Bars", big:true },
  { img:"images/scene-construction.svg", cat:"construction", label:"Construction Site" },
  { img:"images/angles.svg", cat:"products", label:"Steel Angles" },
  { img:"images/scene-warehouse.svg", cat:"infrastructure", label:"Stock Warehouse", big:true },
  { img:"images/hollow-sections.svg", cat:"products", label:"Hollow Sections" },
  { img:"images/scene-industrial.svg", cat:"industrial", label:"Rolled Steel Plate" },
  { img:"images/door-frame.svg", cat:"architecture", label:"Door Frame" },
  { img:"images/triplex.svg", cat:"products", label:"Roofing Sheets" },
  { img:"images/tee-angle.svg", cat:"products", label:"Tee Angle" },
  { img:"images/scene-construction.svg", cat:"infrastructure", label:"Site Reinforcement" },
  { img:"images/omega-profile.svg", cat:"products", label:"Omega Profile" },
  { img:"images/flat-bars.svg", cat:"industrial", label:"Flat Bar Stock" }
];

const RWANDA_LOCATIONS = ["kigali","kinamba","musanze","huye","rubavu","muhanga","rusizi","nyagatare","gicumbi","karongi","rwamagana","nyanza","kayonza","gisenyi","butare"];
const PROJECT_KEYWORDS = {
  "warehouse": "Warehouse Project",
  "building": "Building Project",
  "residential": "Residential Construction",
  "house": "Residential Construction",
  "commercial": "Commercial Building",
  "office": "Commercial Building",
  "fence": "Fencing Project",
  "fencing": "Fencing Project",
  "gate": "Fencing / Gate Project",
  "roof": "Roofing Project",
  "roofing": "Roofing Project",
  "infrastructure": "Infrastructure Project",
  "bridge": "Infrastructure Project"
};

/* ================= STATE ================= */
let CART = JSON.parse(localStorage.getItem("eh_cart") || "[]");
let currentModalProduct = null;
let currentLightboxIndex = 0;
let visibleGalleryItems = [];
let quoteStep = 1;

/* ================= HELPERS ================= */
function $(sel, ctx){ return (ctx||document).querySelector(sel); }
function $all(sel, ctx){ return Array.from((ctx||document).querySelectorAll(sel)); }
function findProduct(id){ return PRODUCTS.find(p => p.id === id); }
function saveCart(){ localStorage.setItem("eh_cart", JSON.stringify(CART)); updateCartCount(); }

function showToast(msg, type){
  const wrap = $("#toastWrap");
  const el = document.createElement("div");
  el.className = "toast " + (type || "");
  const icon = type === "error"
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>';
  el.innerHTML = icon + "<span>" + msg + "</span>";
  wrap.appendChild(el);
  setTimeout(() => { el.style.transition = "opacity .3s"; el.style.opacity = "0"; setTimeout(()=>el.remove(), 300); }, 3400);
}

/* ================= NAV ================= */
function initNav(){
  const nav = $("#siteNav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    toggleBackTop();
    highlightActiveLink();
  });

  const hamburger = $("#hamburgerBtn");
  const mobileMenu = $("#mobileMenu");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });
  $all("#mobileMenu a").forEach(a => a.addEventListener("click", () => {
    hamburger.classList.remove("open"); mobileMenu.classList.remove("open");
  }));

  function highlightActiveLink(){
    const sections = $all("main section[id]");
    let current = "home";
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
    $all(".nav-links a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  }
}

function toggleBackTop(){
  $("#backTopBtn").classList.toggle("show", window.scrollY > 500);
}

/* ================= REVEAL ON SCROLL ================= */
function initReveal(){
  const items = $all(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach(i => io.observe(i));
}

/* ================= PRODUCTS RENDER ================= */
function renderProducts(){
  const grid = $("#productGrid");
  grid.innerHTML = PRODUCTS.map((p, i) => `
    <div class="product-card reveal in" data-id="${p.id}">
      <div class="thumb">
        <span class="product-index">${p.code}</span>
        <img src="${p.img}" alt="${p.name} — Eastern Hope steel product" loading="lazy">
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.short}</p>
        <div class="product-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="product-actions">
          <button class="btn btn-outline-dark btn-sm" data-view="${p.id}">View Product</button>
          <button class="btn btn-primary btn-sm" data-quick-add="${p.id}">Request Quote</button>
        </div>
      </div>
    </div>
  `).join("");

  grid.addEventListener("click", (e) => {
    const viewBtn = e.target.closest("[data-view]");
    const addBtn = e.target.closest("[data-quick-add]");
    const card = e.target.closest(".product-card");
    if (viewBtn) { openProductModal(viewBtn.dataset.view); }
    else if (addBtn) { EH.addToQuote(addBtn.dataset.quickAdd); }
    else if (card) { openProductModal(card.dataset.id); }
  });

  // Footer links
  $("#footerProductLinks").innerHTML = PRODUCTS.slice(0,6).map(p =>
    `<li><a href="#products" data-view-footer="${p.id}">${p.name}</a></li>`
  ).join("");
  $("#footerProductLinks").addEventListener("click", (e) => {
    const a = e.target.closest("[data-view-footer]");
    if (a) { setTimeout(() => openProductModal(a.dataset.viewFooter), 500); }
  });
}

/* ================= PRODUCT MODAL ================= */
function openProductModal(id){
  const p = findProduct(id);
  if (!p) return;
  currentModalProduct = p;
  $("#modalImg").src = p.img;
  $("#modalImg").alt = p.name;
  $("#modalEyebrow").textContent = p.code + " · " + p.name.toUpperCase();
  $("#modalTitle").textContent = p.name;
  $("#modalDesc").textContent = p.desc;
  $("#modalSpecTable").innerHTML = p.specs.map(s => `<tr><td>${s[0]}</td><td>${s[1]}</td></tr>`).join("");
  $("#modalSpec").innerHTML = p.options.map(o => `<option>${o}</option>`).join("");
  $("#modalQty").value = 1;
  $("#productModalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeProductModal(){
  $("#productModalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ================= CART / QUOTE ================= */
function updateCartCount(){
  const count = CART.reduce((n,l) => n + 1, 0);
  const badge = $("#cartCount");
  if (count > 0) { badge.style.display = "flex"; badge.textContent = count; }
  else { badge.style.display = "none"; }
}

function addToQuote(productId, spec, qty, unit){
  const p = findProduct(productId);
  if (!p) return;
  const line = {
    id: p.id, name: p.name, img: p.img,
    spec: spec || p.options[0],
    qty: qty || 1,
    unit: unit || "KG"
  };
  CART.push(line);
  saveCart();
  showToast(p.name + " added to your quote list.");
  renderCartLines();
}

function removeCartLine(index){
  CART.splice(index, 1);
  saveCart();
  renderCartLines();
}

function renderCartLines(){
  const wrap = $("#quoteLines");
  const empty = $("#quoteEmptyMsg");
  if (CART.length === 0) { empty.style.display = "block"; wrap.innerHTML = ""; return; }
  empty.style.display = "none";
  wrap.innerHTML = CART.map((l, i) => `
    <div class="quote-line">
      <img src="${l.img}" alt="${l.name}">
      <div class="quote-line-info">
        <b>${l.name}</b>
        <div>${l.spec} · ${l.qty} ${l.unit}</div>
      </div>
      <button class="quote-line-remove" data-remove="${i}">Remove</button>
    </div>
  `).join("");
  $all("[data-remove]", wrap).forEach(btn => btn.addEventListener("click", () => removeCartLine(Number(btn.dataset.remove))));
}

function openCart(){
  quoteStep = 1;
  showQuoteStep(1);
  renderCartLines();
  $("#quoteDrawer").classList.add("open");
  $("#drawerBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart(){
  $("#quoteDrawer").classList.remove("open");
  $("#drawerBackdrop").classList.remove("open");
  document.body.style.overflow = "";
}

function showQuoteStep(step){
  quoteStep = step;
  $("#quoteStep1").style.display = step === 1 ? "block" : "none";
  $("#quoteStep2").style.display = step === 2 ? "block" : "none";
  $("#stepDot1").classList.toggle("active", step >= 1);
  $("#stepDot2").classList.toggle("active", step >= 2);
  const footBtn = $("#quoteNextBtn");
  if (step === 1) { footBtn.textContent = "Review & Continue"; }
  else { footBtn.textContent = "Submit Quote Request"; }
}

function validateQuoteForm(){
  let ok = true;
  const fields = [
    { el: $("#qName"), test: v => v.trim().length > 1 },
    { el: $("#qPhone"), test: v => /^[+0-9 ()-]{7,}$/.test(v.trim()) },
    { el: $("#qEmail"), test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { el: $("#qLocation"), test: v => v.trim().length > 1 }
  ];
  fields.forEach(f => {
    const valid = f.test(f.el.value);
    f.el.classList.toggle("error", !valid);
    const errEl = f.el.parentElement.querySelector(".error-text");
    if (errEl) errEl.classList.toggle("show", !valid);
    if (!valid) ok = false;
  });
  return ok;
}

function buildQuoteEmailBody(){
  const lines = CART.map(l => `- ${l.name} (${l.spec}) — ${l.qty} ${l.unit}`).join("%0D%0A");
  const body =
    `New Quote Request from Eastern Hope website%0D%0A%0D%0A` +
    `Name: ${$("#qName").value}%0D%0A` +
    `Company: ${$("#qCompany").value || "-"}%0D%0A` +
    `Phone: ${$("#qPhone").value}%0D%0A` +
    `Email: ${$("#qEmail").value}%0D%0A` +
    `Delivery Location: ${$("#qLocation").value}%0D%0A` +
    `Project Type: ${$("#qProjectType").value}%0D%0A%0D%0A` +
    `Products Requested:%0D%0A${lines}%0D%0A%0D%0A` +
    `Additional Message:%0D%0A${$("#qMessage").value || "-"}`;
  return body;
}

// Submits a lead either via mailto (default, zero backend) or a real
// endpoint if CONFIG.SUBMIT_ENDPOINT is set.
async function submitLead(subject, body, plainPayload){
  if (CONFIG.SUBMIT_ENDPOINT) {
    // ---------------- CONNECT REAL BACKEND HERE ----------------
    // try {
    //   const res = await fetch(CONFIG.SUBMIT_ENDPOINT, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(plainPayload)
    //   });
    //   if (!res.ok) throw new Error("Submission failed");
    //   return true;
    // } catch (err) {
    //   console.error(err);
    //   return false;
    // }
    // -------------------------------------------------------------
  }
  window.location.href = `mailto:${CONFIG.CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
  return true;
}

function submitQuote(){
  if (CART.length === 0) { showToast("Add at least one product before submitting.", "error"); return; }
  if (!validateQuoteForm()) { showToast("Please complete the required fields.", "error"); return; }
  const payload = {
    name: $("#qName").value, company: $("#qCompany").value, phone: $("#qPhone").value,
    email: $("#qEmail").value, location: $("#qLocation").value, projectType: $("#qProjectType").value,
    message: $("#qMessage").value, items: CART
  };
  submitLead("Quote Request — " + payload.name, buildQuoteEmailBody(), payload);
  showToast("Quote request ready — check your email client to send it.", "success");
  CART = [];
  saveCart();
  renderCartLines();
  closeCart();
  $("#quoteForm").reset();
  showQuoteStep(1);
}

/* ================= GALLERY ================= */
function renderGallery(list){
  const grid = $("#galleryGrid");
  grid.innerHTML = list.map((g, i) => `
    <div class="gallery-item ${g.big ? "wide" : ""}" data-cat="${g.cat}" data-index="${i}">
      <img src="${g.img}" alt="${g.label}" loading="lazy">
      <div class="cap">${g.label}</div>
    </div>
  `).join("");
  visibleGalleryItems = list;
  $all(".gallery-item", grid).forEach(item => {
    item.addEventListener("click", () => openLightbox(Number(item.dataset.index)));
  });
}

function initGalleryFilters(){
  renderGallery(GALLERY);
  $all(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $all(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      const list = f === "all" ? GALLERY : GALLERY.filter(g => g.cat === f);
      renderGallery(list);
    });
  });
}

function openLightbox(index){
  currentLightboxIndex = index;
  $("#lightboxImg").src = visibleGalleryItems[index].img;
  $("#lightboxImg").alt = visibleGalleryItems[index].label;
  $("#lightbox").classList.add("open");
}
function closeLightbox(){ $("#lightbox").classList.remove("open"); }
function navLightbox(dir){
  currentLightboxIndex = (currentLightboxIndex + dir + visibleGalleryItems.length) % visibleGalleryItems.length;
  openLightbox(currentLightboxIndex);
}

/* ================= REQUEST STEEL (LIGHTWEIGHT NLP) ================= */
function parseSteelRequest(text){
  const lower = text.toLowerCase();

  // quantity + unit, e.g. "5,000 kg", "2 tonnes", "200 pieces"
  const qtyMatch = lower.match(/([\d,]+(?:\.\d+)?)\s*(kg|kilograms?|tonnes?|tons?|pieces?|pcs|meters?|metres?|bundles?)/);
  let quantity = null, unit = null;
  if (qtyMatch) {
    quantity = qtyMatch[1].replace(/,/g, "");
    let u = qtyMatch[2];
    if (/^kg|kilo/.test(u)) unit = "KG";
    else if (/ton/.test(u)) unit = "Tonnes";
    else if (/piece|pcs/.test(u)) unit = "Pieces";
    else if (/met/.test(u)) unit = "Meters";
    else if (/bundle/.test(u)) unit = "Bundles";
  }

  // size, e.g. "16mm", "Ø16", "40/40"
  const sizeMatch = lower.match(/(ø\s?\d+)|(\d+\s?mm)|(\d+\/\d+)/);
  const size = sizeMatch ? sizeMatch[0].toUpperCase().replace(/\s+/g,"") : null;

  // product
  let product = null;
  for (const p of PRODUCTS) {
    for (const kw of p.keywords) {
      if (lower.includes(kw)) { product = p; break; }
    }
    if (product) break;
  }

  // location
  let location = null;
  for (const loc of RWANDA_LOCATIONS) {
    if (lower.includes(loc)) { location = loc.charAt(0).toUpperCase() + loc.slice(1); break; }
  }

  // project type
  let project = null;
  for (const kw in PROJECT_KEYWORDS) {
    if (lower.includes(kw)) { project = PROJECT_KEYWORDS[kw]; break; }
  }

  return { product, size, quantity, unit, location, project, raw: text };
}

function renderRequestSummary(result){
  const box = $("#requestSummary");
  if (!result.product && !result.quantity && !result.location) {
    box.innerHTML = `<div class="placeholder">// Could not identify a product or quantity. Try including a product name (e.g. "deformed bars", "hollow sections") and a quantity (e.g. "5000 kg").</div>`;
    return;
  }
  const rows = [
    ["Product", result.product ? result.product.name : "Not specified"],
    ["Specification", result.size || "Not specified"],
    ["Quantity", result.quantity ? `${Number(result.quantity).toLocaleString()} ${result.unit || ""}` : "Not specified"],
    ["Location", result.location || "Not specified"],
    ["Project", result.project || "Not specified"]
  ];
  box.innerHTML = `
    <div class="eyebrow" style="color:var(--amber-light);">Request Summary</div>
    ${rows.map(r => `<div class="summary-row"><span class="k">${r[0]}</span><span class="v">${r[1]}</span></div>`).join("")}
    <div class="summary-actions">
      <button class="btn btn-primary" id="reqAddToQuote">Add to Quote</button>
      <button class="btn btn-outline" id="reqContactSales">Contact Sales</button>
    </div>
  `;
  $("#reqAddToQuote").addEventListener("click", () => {
    if (result.product) {
      addToQuote(result.product.id, result.size || result.product.options[0], result.quantity || 1, result.unit || "KG");
    } else {
      showToast("Please specify a recognized product first.", "error");
    }
  });
  $("#reqContactSales").addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
}

function initRequestSteel(){
  $("#analyzeBtn").addEventListener("click", () => {
    const text = $("#requestText").value.trim();
    if (!text) { showToast("Please describe your steel requirement first.", "error"); return; }
    const result = parseSteelRequest(text);
    renderRequestSummary(result);
  });
  $all(".chip-try").forEach(chip => {
    chip.addEventListener("click", () => {
      $("#requestText").value = chip.dataset.txt;
      renderRequestSummary(parseSteelRequest(chip.dataset.txt));
    });
  });
}

/* ================= AI ASSISTANT (LOCAL, NO API REQUIRED) ================= */
/*
  This is a fully local, rule-based assistant so the site works with zero
  AI subscription cost. It matches keywords, tracks a lightweight
  conversation "slot" state, and can build a structured requirement
  summary purely in the browser.

  ------------------------------------------------------------------
  // CONNECT REAL AI API HERE
  // To upgrade to a live LLM (OpenAI, Gemini, Claude, etc.), replace the
  // body of getAiReply() below with a call to YOUR OWN backend endpoint
  // (never call a provider directly from frontend JS — that exposes your
  // API key). Example:
  //
  // async function getAiReply(userText, history){
  //   const res = await fetch("https://your-backend.example.com/ai-chat", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ message: userText, history })
  //   });
  //   const data = await res.json();
  //   return data.reply;
  // }
  //
  // Your backend then holds the real API key server-side and forwards
  // the request to the AI provider. Keep everything else (chat UI,
  // quick-reply buttons, quote hand-off) unchanged.
  ------------------------------------------------------------------
*/

const aiState = { slotFill: null, collected: {} };
const aiHistory = [];

function aiPush(role, html, isSummary){
  const body = $("#aiBody");
  const el = document.createElement("div");
  el.className = "ai-msg " + (role === "user" ? "user" : "bot") + (isSummary ? " summary-msg" : "");
  el.innerHTML = html;
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
  aiHistory.push({ role, text: el.textContent });
}

function aiQuickReplies(options){
  const body = $("#aiBody");
  const wrap = document.createElement("div");
  wrap.className = "ai-quick";
  wrap.innerHTML = options.map(o => `<button data-q="${o}">${o}</button>`).join("");
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
  $all("button", wrap).forEach(btn => btn.addEventListener("click", () => {
    wrap.remove();
    handleAiUserMessage(btn.dataset.q);
  }));
}

function aiTypingStart(){
  const body = $("#aiBody");
  const el = document.createElement("div");
  el.className = "ai-typing";
  el.id = "aiTypingIndicator";
  el.innerHTML = "<span></span><span></span><span></span>";
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
}
function aiTypingEnd(){
  const el = $("#aiTypingIndicator");
  if (el) el.remove();
}

function aiGreeting(){
  aiPush("bot", `Hello — I'm the <b>Eastern Hope AI</b>. I can help you identify the right steel product, prepare a quote request, or answer questions about our range. What are you working on?`);
  aiQuickReplies(["Which product do I need?", "Build a quote with AI", "Talk to a human"]);
}

function productMatchFromText(text){
  const lower = text.toLowerCase();
  return PRODUCTS.find(p => p.keywords.some(k => lower.includes(k)));
}

function getAiReply(userText){
  const lower = userText.toLowerCase();

  // Guided quote-building flow
  if (aiState.slotFill) return aiContinueSlotFill(userText);

  if (/build a quote|generate request|help me order|start.*quote/.test(lower)) {
    aiState.slotFill = "project";
    return { text: "Happy to help build your request. First — what type of project is this for? (e.g. warehouse, residential building, fencing)" };
  }

  if (/human|sales|agent|call|talk to someone/.test(lower)) {
    return { text: `Of course. You can reach our sales team directly at <a href="tel:+250788301351">+250 788 301 351</a> or <a href="mailto:${CONFIG.CONTACT_EMAIL}">${CONFIG.CONTACT_EMAIL}</a>. Would you like me to scroll you to the contact section?`, action: "offer-contact" };
  }

  if (/warehouse/.test(lower)) {
    return { text: "For a warehouse structure, hollow sections and steel angles are typically used for framing and bracing, with Omega profile or Triplex sheeting for the roof. Tell me the approximate size or quantity and I can help structure a request.", quick: ["I need 2 tonnes of hollow sections", "Build a quote with AI"] };
  }
  if (/roof|roofing/.test(lower)) {
    return { text: "For roofing, Triplex / Tole Plane sheets are the standard choice, often paired with Omega profile purlins for support. Want me to add these to a request?", quick: ["Build a quote with AI"] };
  }
  if (/fence|fencing|gate/.test(lower)) {
    return { text: "For fencing and gates, Bottle Profile and Hollow Sections are most commonly used, depending on the design. What dimensions or quantity are you thinking?", quick: ["Build a quote with AI"] };
  }
  if (/foundation|slab|column|concrete/.test(lower)) {
    return { text: "For concrete reinforcement — slabs, columns, beams, foundations — Deformed Bars (Ø5–Ø40) are the product you need. What diameter and quantity does your project call for?", quick: ["I need 5000 kg of 16mm deformed bars", "Build a quote with AI"] };
  }
  if (/door/.test(lower)) {
    return { text: "For doorways, we stock ready-welded steel Door Frames built from hollow section. How many do you need, and for what size opening?" };
  }

  const matched = productMatchFromText(userText);
  if (matched) {
    return { text: `${matched.name}: ${matched.desc} Typical specs: ${matched.tags.join(", ")}. Would you like to add this to your quote?`, quick: ["Add to quote", "Tell me more", "Build a quote with AI"], product: matched.id };
  }

  if (/which product|what.*need|recommend/.test(lower)) {
    return { text: "Tell me about the structure or application — for example a warehouse, a residential building, fencing, or a roof — and I'll recommend the right steel product." };
  }

  if (/price|cost|how much/.test(lower)) {
    return { text: "Pricing depends on current stock, specification and quantity, so our team confirms it directly. I can help you prepare a structured quote request now, and our sales team will respond with pricing." , quick: ["Build a quote with AI"]};
  }

  if (/hello|hi there|^hi$|hey/.test(lower)) {
    return { text: "Hello! What are you building — I can help you find the right steel and put together a request." };
  }

  return { text: "I can help you identify products, prepare a quote request, or connect you with sales. Try telling me your project type (e.g. \"warehouse\", \"fencing\", \"residential building\"), or a product name.", quick: ["Which product do I need?", "Build a quote with AI", "Talk to a human"] };
}

function aiContinueSlotFill(userText){
  const c = aiState.collected;
  if (aiState.slotFill === "project") {
    c.project = userText;
    aiState.slotFill = "quantity";
    return { text: "Got it. What approximate quantity do you need (e.g. 2 tonnes, 500 pieces, 5000 kg)?" };
  }
  if (aiState.slotFill === "quantity") {
    c.quantity = userText;
    aiState.slotFill = "location";
    return { text: "And what's the delivery location?" };
  }
  if (aiState.slotFill === "location") {
    c.location = userText;
    aiState.slotFill = "dimensions";
    return { text: "Any specific product dimensions or type required? (e.g. Ø16 deformed bars, 40/40 hollow section) — or say \"not sure\" and our team will advise." };
  }
  if (aiState.slotFill === "dimensions") {
    c.dimensions = userText;
    aiState.slotFill = null;
    const summaryHtml = `
      <div class="eyebrow" style="color:var(--amber-light);margin-bottom:10px;">Customer Requirement Summary</div>
      <div class="summary-row"><span class="k">Project</span><span class="v">${c.project}</span></div>
      <div class="summary-row"><span class="k">Quantity</span><span class="v">${c.quantity}</span></div>
      <div class="summary-row"><span class="k">Location</span><span class="v">${c.location}</span></div>
      <div class="summary-row"><span class="k">Requirements</span><span class="v">${c.dimensions}</span></div>
    `;
    return { text: summaryHtml, isSummary: true, quick: ["Add to quote", "Send request to sales"] };
  }
}

function handleAiUserMessage(text){
  aiPush("user", text);
  if (/^add to quote$/i.test(text)) {
    const matched = productMatchFromText(aiHistory.slice(-6).map(h=>h.text).join(" ")) || (aiState.collected.project ? null : null);
    if (matched) { addToQuote(matched.id); aiPush("bot", "Added to your quote list. You can review it anytime via the cart icon in the top navigation."); }
    else { aiPush("bot", `Noted — I've logged your requirement. Please open your quote list (cart icon, top right) to finalise product lines, or continue describing what you need.`); }
    return;
  }
  if (/^send request to sales$/i.test(text)) {
    aiPush("bot", `Thank you — I've prepared your requirement summary. Please continue to the <a href="#contact">Contact section</a> or WhatsApp us directly to finalise this with our sales team.`);
    return;
  }

  aiTypingStart();
  setTimeout(() => {
    aiTypingEnd();
    const reply = getAiReply(text);
    aiPush("bot", reply.text, reply.isSummary);
    if (reply.quick) aiQuickReplies(reply.quick);
    if (reply.action === "offer-contact") {
      setTimeout(() => document.getElementById("contact").scrollIntoView({ behavior:"smooth" }), 600);
    }
  }, 550 + Math.random()*350);
}

function initAiAssistant(){
  const fab = $("#aiFab"), panel = $("#aiPanel"), closeBtn = $("#aiCloseBtn");
  let greeted = false;
  function openPanel(){
    panel.classList.add("open");
    if (!greeted) { aiGreeting(); greeted = true; }
    $("#aiInput").focus();
  }
  fab.addEventListener("click", () => panel.classList.contains("open") ? panel.classList.remove("open") : openPanel());
  closeBtn.addEventListener("click", () => panel.classList.remove("open"));
  $("#heroAiLink").addEventListener("click", (e) => { e.preventDefault(); openPanel(); });

  $("#aiSendBtn").addEventListener("click", sendAiInput);
  $("#aiInput").addEventListener("keydown", (e) => { if (e.key === "Enter") sendAiInput(); });
  function sendAiInput(){
    const input = $("#aiInput");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    handleAiUserMessage(text);
  }
}

/* ================= FORM VALIDATION (CONTACT) ================= */
function initContactForm(){
  const form = $("#contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    const checks = [
      { el: $("#cName"), test: v => v.trim().length > 1 },
      { el: $("#cPhone"), test: v => /^[+0-9 ()-]{7,}$/.test(v.trim()) },
      { el: $("#cEmail"), test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      { el: $("#cMessage"), test: v => v.trim().length > 3 }
    ];
    checks.forEach(c => {
      const valid = c.test(c.el.value);
      c.el.classList.toggle("error", !valid);
      const err = c.el.parentElement.querySelector(".error-text");
      if (err) err.classList.toggle("show", !valid);
      if (!valid) ok = false;
    });
    if (!ok) { showToast("Please correct the highlighted fields.", "error"); return; }

    const body =
      `New message from Eastern Hope website%0D%0A%0D%0A` +
      `Name: ${$("#cName").value}%0D%0A` +
      `Phone: ${$("#cPhone").value}%0D%0A` +
      `Email: ${$("#cEmail").value}%0D%0A%0D%0A` +
      `Message:%0D%0A${$("#cMessage").value}`;
    submitLead("Website Contact — " + $("#cName").value, body, {
      name: $("#cName").value, phone: $("#cPhone").value, email: $("#cEmail").value, message: $("#cMessage").value
    });
    showToast("Message ready — check your email client to send it.", "success");
    form.reset();
  });
}

/* ================= MODALS / DRAWERS WIRING ================= */
function initModalsAndDrawers(){
  $("#modalCloseBtn").addEventListener("click", closeProductModal);
  $("#productModalOverlay").addEventListener("click", (e) => { if (e.target.id === "productModalOverlay") closeProductModal(); });

  $("#modalAddQuoteBtn").addEventListener("click", () => {
    if (!currentModalProduct) return;
    addToQuote(currentModalProduct.id, $("#modalSpec").value, Number($("#modalQty").value) || 1, $("#modalUnit").value);
    closeProductModal();
    openCart();
  });
  $("#modalRequestQuoteBtn").addEventListener("click", () => {
    if (!currentModalProduct) return;
    addToQuote(currentModalProduct.id, $("#modalSpec").value, Number($("#modalQty").value) || 1, $("#modalUnit").value);
    closeProductModal();
    openCart();
    showQuoteStep(2);
  });

  $("#cartOpenBtn").addEventListener("click", openCart);
  $("#drawerCloseBtn").addEventListener("click", closeCart);
  $("#drawerBackdrop").addEventListener("click", closeCart);

  $("#quoteNextBtn").addEventListener("click", () => {
    if (quoteStep === 1) {
      if (CART.length === 0) { showToast("Add at least one product first.", "error"); return; }
      showQuoteStep(2);
    } else {
      submitQuote();
    }
  });

  $("#lightboxClose").addEventListener("click", closeLightbox);
  $("#lightboxPrev").addEventListener("click", () => navLightbox(-1));
  $("#lightboxNext").addEventListener("click", () => navLightbox(1));
  $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeProductModal(); closeLightbox(); closeCart(); }
  });

  $("#backTopBtn").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ================= MISC ================= */
function initMisc(){
  $("#year").textContent = new Date().getFullYear();
  const waHref = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Eastern Hope, I would like to enquire about steel products.")}`;
  $("#waFab").href = waHref;
  $("#footerWaLink").href = waHref;
}

/* ================= PUBLIC API (used by inline onclick handlers) ================= */
window.EH = {
  addToQuote: (id) => addToQuote(id),
  openCart: () => openCart()
};

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initGalleryFilters();
  initRequestSteel();
  initAiAssistant();
  initContactForm();
  initModalsAndDrawers();
  initNav();
  initReveal();
  initMisc();
  updateCartCount();
  renderCartLines();
});
