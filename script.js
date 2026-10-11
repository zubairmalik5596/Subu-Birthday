/* =========================================================================
   FOR SUHANA — script.js
   Plain JavaScript. No libraries, no build step, no backend.

   1.  CONFIG + all the words (single place to fix spelling)
   2.  Small helpers
   3.  The pookie mascot (hand-drawn SVG) + stickers
   4.  Ambient background canvas
   5.  Effects canvas (petals + confetti)
   6.  Soft ambient music (Web Audio)
   7.  Progress + navigation
   8.  The login gate
   9.  Levels 1–8
   10. The Heart Vault
   11. Turning any card into a downloadable picture
   12. Boot
   ========================================================================= */
'use strict';

/* =========================================================================
   1. CONFIG + words
   ========================================================================= */
const CONFIG = {
  name: 'Suhana',
  sender: 'Zubi',
  birthDay: 12,
  birthMonth: 10,
  storageKey: 'suhana-heart-vault-v2',
  mascotPhoto: 'assets/pookie-cats.png',
};

const WORD = {
  gateUrdu: 'زبیر کے دل کے الفاظ، صرف سہانا کے لیے',
  levelUrdu: 'زبیر کے دل کے الفاظ ہیں آپ کے لیے، سہانا',
  passWrong: 'Ye date is darwaze ki nahi hai. Dobara koshish karo, pookie.',
  passWrongVault: 'Ghalat date. Ye khazana uske siwa kisi ke liye nahi khulta.',
  vaultReady: 'card pehchan liya gaya — ab access date likho',
};

/* --- Level 1 --- */
const WELCOME = {
  urdu: 'خوش آمدید، میری پیاری سہانا',
  body: 'Kuch jagahain eenton se banti hain, aur ye jagah ehsaas se bani hai. Aage har level mein ek paighaam hai jo dil se likha gaya — koi shor nahi, koi bheed nahi, sirf wo alfaaz jo tumhare liye sambhal kar rakhe gaye the. Yahan apna waqt lo. Koi jaldi nahi hai.',
  sign: 'mohabbat ke saath, Zubi',
};

/* --- Level 2: five hearts, five small truths --- */
const HEARTS = [
  { label: 'Muskan', urdu: 'آپ کی مسکراہٹ', title: 'Tumhari Muskan',
    body: 'Kisi ka din behtar banane ki sabse aasan wajah tumhari muskan hai, aur tum ise itni khuli dil se baant deti ho.' },
  { label: 'Sukoon', urdu: 'آپ کا سکون', title: 'Tumhara Sukoon',
    body: 'Tumhare paas ek aisi baat hai jo shor wale dinon ko bhi khamosh kar deti hai. Ye ek anokha jaadu hai, aur ye sirf tumhara hai.' },
  { label: 'Himmat', urdu: 'آپ کی ہمت', title: 'Tumhari Himmat',
    body: 'Tum apne se zyada bojh utha leti ho, aur phir bhi apne aas paas sab ka khayal rakhne ki himmat rakhti ho.' },
  { label: 'Khwab', urdu: 'آپ کے خواب', title: 'Tumhare Khwab',
    body: 'Ye khwab tum pe bilkul suit karte hain — bare, garam dil wale, aur zara ziddi, bilkul tumhari tarah.' },
  { label: 'Dil', urdu: 'آپ کا دل', title: 'Tumhara Dil',
    body: 'Narm, sacha, aur is se mohabbat na karna namumkin. Isay hamesha aise hi rakhna, please.' },
];

/* --- Level 3: the memory book (6 pages) --- */
const MEMORIES = [
  { title: 'Behen Aur Dost', caption: 'Larte hain rivals ki tarah, khayal rakhte hain ghar walon ki tarah', sticker: 'cats',
    urdu: 'بہن اور دوست، دونوں ایک ساتھ',
    message: 'Hum chhoti chhoti baaton pe larte hain, aur jab kuch acha hota hai to sabse pehle ek doosre ko batate hain. Yehi hamara apna rishta hai, aur main ise kabhi nahi chhodunga.' },
  { title: 'Raat Ki Der Baatein', caption: 'Jab duniya so jati hai aur hum nahi', sticker: 'moon',
    urdu: 'دیر رات کی وہ باتیں',
    message: 'Tumhare saath meri sabse pyari baatein aksar sabse ajeeb waqt pe hoti hain. Tum mujhse sab kuch aur kuch bhi baat karti rehna, hamesha.' },
  { title: 'Bewajah Hansi', caption: 'Wo hansi jo galaon ko dard de', sticker: 'sparkle',
    urdu: 'وہ ہنسی جو گالوں کو دکھ دے',
    message: 'Tumhari hansi khud ek mood hai. Koi bhi tumhare paas zyada der tak udaas nahi reh sakta, aur mujhe umeed hai ke tum ye kabhi nahi khoogi.' },
  { title: 'Chhote Chhote Lamhe', caption: 'Snacks, mazak aur achi sangat', sticker: 'heart',
    urdu: 'چھوٹے چھوٹے پیارے لمحے',
    message: 'Sabse chhote aur sabse aam lamhe meri sabse pyari yaadein ban jate hain, sirf is wajah se ke us waqt tum wahan hoti ho.' },
  { title: 'Hamesha Maujood', caption: 'Har mausam mein, sirf achon mein nahi', sticker: 'crown',
    urdu: 'ہر حال میں موجود',
    message: 'Ache din, bure din, ajeeb din — in sab mein main tumhare sath hoon, chup chap aur hamesha ke liye.' },
  { title: 'Tumhare Khwab', caption: 'Main inhe poora hote dekhna chahta hoon', sticker: 'sparkle',
    urdu: 'آپ کے خواب میرے ساتھ',
    message: 'Jis din tumhare khwab poore honge, us din main wahan hona chahta hoon — takay bari si muskan ke sath keh sakoon ke main ne pehle hi kaha tha.' },
];

/* --- Level 4: the greeting card --- */
const CARD = {
  urdu: 'سہانا، آپ زبیر کی سب سے پیاری ہیں',
  title: 'Saalgirah Mubarak, Suhana',
  body: 'Saal ke saare dinon mein se ye ek din tumhara hai. Dua hai ke tumhara ye saal narm rahe, tumhari hansi buland rahe, aur tumhara dil hamesha itna hi narm rahe jitna ab tak raha hai.',
  sign: '— Zubi',
};

/* --- Level 5: the message --- */
const MESSAGE = `Pyari Suhana,

Saalgirah mubarak. Ye chhoti si jagah maine is liye banayi ke jo baatein main kehna chahta tha, wo ek paighaam mein nahi samati thin.

Tum wo behen ho jo meri sabse achi dost ban gayi, aur wo dost jo chupke se ghar ban gayi. Tum chhoti chhoti cheezein notice karti ho, bina bataye khayal rakhti ho, aur sirf wahan hone se aas paas sab kuch narm kar deti ho.

Main jaanta hoon ke zindagi tumhare saath hamesha narm nahi rehti. Jab din bhaari lage, to yaad rakhna ke ek insaan hamesha tumhare sath hai, hamesha ek message ki doori pe, aur hamesha tum pe fakhr karta hai.

Dua hai ke ye naya saal tum pe meherban rahe. Tumhare khwab qareeb aayein, tumhari fikrein chhoti ho jayein, aur tumhe hamesha pata rahe ke tum kitni ahem ho.

Tum jo ho, usi ke liye shukriya, Suhana. Ye kabhi mat badalna.

— Zubi`;
const MESSAGE_URDU = 'دل کی سب سے خاص بات، صرف آپ کے لیے';

/* --- Level 6: ten little truths --- */
const TEN_LINES = {
  urdu: 'دس چھوٹی سچائیاں، صرف آپ کے بارے میں',
  lead: 'Das chhoti sachaiyan jo Zubi kabhi zubaan pe nahi laata.',
  lines: [
    'Tum aam dinon ko bhi yaad rakhne layak bana deti ho.',
    'Tumhari meherbani chupke se samne aati hai, aise tareeqon mein jo tum shayad kabhi notice nahi karti.',
    'Tum dil se sunti ho, aur ye baat logon ki samajh se kaafi zyada door hai.',
    'Tumhari hansi kisi ka bhi bura mood khatam kar deti hai, mera bhi.',
    'Tum apni fikrein sabr se utha leti ho, chahe koi tumhara haal na pooche.',
    'Tum apni soch se kaafi zyada bahadir ho.',
    'Tumhari maujoodgi kamre ko bina koshish ke garam kar deti hai.',
    'Tum aasani se maaf kar deti ho, aur iske liye bahut mazboot dil chahiye.',
    'Tum aise insaan ho jinhe jaanna logon ki kismat ki baat hai, aur ye main jaanta hoon.',
    'Aur tum ho, aur hamesha rahogi, wo insaan jis pe mujhe sabse zyada fakhr hai.',
  ],
};

/* --- Level 7: wish --- */
const WISH = {
  urdu: 'ایک دعا، اور بہت ساری محبت',
  msg: 'Khwahish mil gayi. Us khamosh lamhe mein jo tumne maanga, Zubi dua karta hai ke wo tumhe mil jaye — aur chupke se apni ek dua bhi shamil kar deta hai: ke tumhe kabhi kisi cheez ka samna akela na karna pare.',
};

/* --- The Heart Vault: four doors, ten lines each --- */
const VAULT_TOPICS = [
  {
    key: 'heartcheck', chip: "Zubi Heart Check", icon: 'i-heart-f',
    urdu: 'سہانا زبیر کے دل کی ملکہ ہیں',
    title: 'Heart Check — Suhana Ki Milkiyat',
    lines: [
      'Suhana Zubi ke dil ki maalik hai, aur ye milkiyat kabhi kisi bahas ka hissa nahi thi.',
      'Wo us dil ke har kone mein chupke se rehti hai.',
      'Wo uske dil ki shehzadi hai, aur ye chhoti si saltanat uske samne jhukti hai.',
      'Zubi ke dil ne use bahut pehle chun liya tha, aur usne kabhi peeche mudi kar nahi dekha.',
      'Har ek dhadkan pe sirf ek naam likha hai, aur wo naam Suhana hai.',
      'Usse pehle wo dil sirf ek kamra tha. Uske baad wo ghar ban gaya.',
      'Uske paas Zubi ki sabse narm aur sabse qeemti cheez hai, aur wo uski hifazat pyaar se karta hai.',
      'Jin dinon wo dono door hote hain, uski yaad bhi us jagah ko garam rakhti hai.',
      'Zubi ne apna dil poori tarah uske naam kar diya hai, aur ab wo usi ka hai.',
      'Aur wo usi ka rahega — sukoon se, sachai se, aur bahut lambe waqt tak.',
    ],
  },
  {
    key: 'feeling', chip: 'Zubi Feeling', icon: 'i-heart',
    urdu: 'زبیر کی سچی feeling، صرف سہانا کے لیے',
    title: 'Zubi Ka Feeling',
    lines: [
      'Zubi ka feeling ek lafz mein nahi samata, is liye wo likhta reh jata hai.',
      'Jab Suhana khush hoti hai, uski poori duniya bina wajah roshan ho jati hai.',
      'Jab wo udaas hoti hai, uska dil bhaari ho jata hai aur wo sab kuch ek sath theek karna chahta hai.',
      'Use lagta hai uski hansi wo sabse pyari awaz hai jo usne yaad kar li hai.',
      'Uski awaaz mein ek ajeeb sa sukoon hai jo dimagh ka har shor khatam kar deta hai.',
      'Wo chupke se dua karta hai ke uska har aam sa din aasan aur meherban ho.',
      'Uski khushi aur uski khushi kabhi ki alag cheezein nahi rahin.',
      'Wo har mausam mein uske liye hazir hai, sirf achon mein nahi.',
      'Uski feeling saada hai, sachi hai, aur us se kaafi zyada mazboot hai jitna wo dikhata hai.',
      'Kyunke Suhana, bas itna sa, uska sukoon hai.',
    ],
  },
  {
    key: 'important', chip: 'Zubi Important Person', icon: 'i-sparkle',
    urdu: 'زبیر کے لیے سب سے اہم، سہانا',
    title: 'Zubi Ka Important Insaan',
    lead: 'Mere paas alfaaz nahi hain ye batane ke liye ke tum mere liye kitni important ho.',
    lines: [
      'Tum meri zindagi ka wo hissa ho jiske bina sab kuch adhoora sa lagta hai.',
      'Zubi Suhana ke bagair theek se reh nahi sakta, aur ye main dil se keh raha hoon.',
      'Tumhari ek smile meri saari thakan utaar deti hai.',
      'Jab main udaas hota hoon, tumhari awaaz hi meri sabse badi tasalli hai.',
      'Tum sirf ek naam nahi ho, tum meri sabse pyari aadat ho.',
      'Main chahta hoon tum hamesha khush raho, chahe uske liye kuch bhi karna pade.',
      'Tumhare bina din guzar jata hai, lekin dil kabhi poora nahi hota.',
      'Tum meri life ki sabse important insaan ho, aur ye kabhi nahi badlega.',
      'Tumne mujhe sikhaya ke apnapan khoon se nahi, dil se banta hai.',
      'Thank you for being you, Suhana — meri zindagi ka sabse haseen hissa.',
    ],
  },
  {
    key: 'favourite', chip: 'Zubi Ki Favourite', icon: 'i-crown',
    urdu: 'زبیر کی پسندیدہ، سہانا',
    title: 'Zubi Ki Favourite',
    lead: 'Zubi ki favourite insaan Suhana hai. Zubi ki favourite queen Suhana hai.',
    lines: [
      'Zubi ki favourite insaan Suhana hai.',
      'Zubi ki favourite queen Suhana hai.',
      'Zubi ki favourite muskan poori duniya mein uski hai.',
      'Zubi ki favourite awaz wo hai jo uska naam leti hai.',
      'Zubi ki favourite baat wo hai jo uske saath kabhi khatam nahi hoti.',
      'Zubi ki favourite aadat ye hai ke wo bina kahe khayal rakhti hai.',
      'Zubi ka favourite lamha koi bhi aam sa lamha hai jisme wo khari hoti hai.',
      'Zubi ka favourite naam, jo wo narmi se leta hai, Suhana hai.',
      'Zubi ka favourite khwab wo hai jisme wo shamil hoti hai.',
      'Aur Zubi ki saari favourite cheezon mein sabse favourite bas, poori tarah, Suhana hai.',
    ],
  },
];

const VAULT_GRANTED = 'khazana khul gaya — wapas aa gayi, Suhana';

/* =========================================================================
   2. Helpers
   ========================================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
}
function svgUse(id, cls = 'icon') {
  return `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
}
function toast(msg, ms = 2600) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => { t.hidden = true; }, 420);
  }, ms);
}

/* =========================================================================
   3. The pookie mascot (hand-drawn SVG) + stickers
   ========================================================================= */

/* Two little cats — a grey one hugging a white one — matching the reference art. */
function mascotMarkup() {
  return `
<svg class="mascot" viewBox="0 0 420 300" width="420" height="300" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="215" cy="242" rx="190" ry="44" fill="#ff9ec2" opacity="0.13"/>

  <!-- ============ grey cat (behind, hugging) ============ -->
  <g class="m-cat-grey">
    <ellipse cx="292" cy="196" rx="82" ry="86" fill="#a3979f"/>
    <path d="M214 58 C226 24 238 12 250 12 C258 12 264 18 268 30 L272 58 Z" fill="#a3979f"/>
    <path d="M300 56 L322 18 C330 12 338 14 342 22 L352 60 Z" fill="#a3979f"/>
    <path d="M228 54 L240 30 L252 54 Z" fill="#f0a9c2"/>
    <path d="M312 52 L324 28 L336 54 Z" fill="#f0a9c2"/>
    <circle cx="278" cy="96" r="76" fill="#b3a7ae"/>
    <ellipse cx="238" cy="116" rx="17" ry="11" fill="#f39bbd" class="m-blush"/>
    <ellipse cx="326" cy="116" rx="17" ry="11" fill="#f39bbd" class="m-blush"/>
    <path d="M248 98 q11 12 22 0" fill="none" stroke="#4a3f47" stroke-width="6" stroke-linecap="round"/>
    <path d="M300 98 q11 12 22 0" fill="none" stroke="#4a3f47" stroke-width="6" stroke-linecap="round"/>
    <path d="M272 122 q8 -8 16 0 q8 -8 16 0" fill="none" stroke="#5f535c" stroke-width="5.5" stroke-linecap="round"/>
    <!-- arms reaching to hug -->
    <path d="M320 168 C334 178 344 190 348 202" fill="none" stroke="#a1969e" stroke-width="30" stroke-linecap="round"/>
    <ellipse cx="348" cy="206" rx="19" ry="16" fill="#b3a7ae"/>
  </g>

  <!-- ============ white cat (front, lying) ============ -->
  <g class="m-cat-white">
    <path class="m-tail" d="M78 232 C42 232 22 210 28 186 C34 164 60 158 72 172 C62 174 54 184 58 196 C62 210 78 210 90 206 Z" fill="#fdfaf8" stroke="#e0d3da" stroke-width="3"/>
    <ellipse cx="164" cy="216" rx="98" ry="58" fill="#fffdfc" stroke="#e6d9df" stroke-width="3"/>
    <path d="M108 96 L128 48 L158 90 Z" fill="#fffdfc" stroke="#e6d9df" stroke-width="3"/>
    <path d="M206 90 L232 46 L244 98 Z" fill="#fffdfc" stroke="#e6d9df" stroke-width="3"/>
    <path d="M116 88 L128 62 L144 88 Z" fill="#f6b8cd"/>
    <path d="M216 88 L230 60 L238 90 Z" fill="#f6b8cd"/>
    <circle cx="176" cy="146" r="66" fill="#fffdfc" stroke="#e6d9df" stroke-width="3"/>
    <circle cx="176" cy="146" r="66" fill="#fffdfc"/>
    <ellipse cx="132" cy="164" rx="16" ry="10" fill="#f9b6cd" class="m-blush"/>
    <ellipse cx="222" cy="164" rx="16" ry="10" fill="#f9b6cd" class="m-blush"/>
    <path d="M138 146 q11 12 22 0" fill="none" stroke="#5b4c56" stroke-width="6" stroke-linecap="round"/>
    <path d="M192 146 q11 12 22 0" fill="none" stroke="#5b4c56" stroke-width="6" stroke-linecap="round"/>
    <path d="M164 170 q8 -8 16 0 q8 -8 16 0" fill="none" stroke="#6b5b66" stroke-width="5.5" stroke-linecap="round"/>
    <ellipse cx="248" cy="230" rx="22" ry="16" fill="#fdfaf8" stroke="#e6d9df" stroke-width="3"/>
    <ellipse cx="92" cy="236" rx="20" ry="14" fill="#fdfaf8" stroke="#e6d9df" stroke-width="3"/>
  </g>

  <!-- the grey cat's paw, resting gently on the white cat's head -->
  <g class="m-paw">
    <path d="M312 148 C284 128 250 110 226 102" fill="none" stroke="#a1969e" stroke-width="30" stroke-linecap="round"/>
    <path d="M212 96 C206 84 216 74 230 78 C238 80 242 88 240 96" fill="#b3a7ae"/>
    <ellipse cx="216" cy="100" rx="22" ry="17" fill="#b3a7ae"/>
    <path d="M204 94 q6 -5 11 0 M218 92 q6 -5 11 0" fill="none" stroke="#8f848d" stroke-width="3.5" stroke-linecap="round"/>
  </g>

  <!-- ============ floating heart ============ -->
  <g class="m-heart">
    <path d="M70 66 C58 58 40 46 40 32 A16 16 0 0 1 70 24 A16 16 0 0 1 100 32 C100 46 82 58 70 66 Z" fill="#ff4f82"/>
  </g>
</svg>`;
}

/* Stickers for the greeting card — all drawn, plus her photo as an option. */
const STICKERS = {
  cats: () => mascotMarkup(),
  heart: () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 88 C30 74 8 60 8 40 A20 20 0 0 1 50 30 A20 20 0 0 1 92 40 C92 60 70 74 50 88 Z" fill="#ff5f8f"/><path d="M50 88 C30 74 8 60 8 40 A20 20 0 0 1 50 30 Z" fill="#ff87ac"/></svg>`,
  sparkle: () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 6 C58 40 60 42 94 50 C60 58 58 60 50 94 C42 60 40 58 6 50 C40 42 42 40 50 6 Z" fill="#e9c98a"/></svg>`,
  crown: () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M8 32 30 50 50 18 70 50 92 32 82 80 H18 Z" fill="#e9c98a" stroke="#c99a52" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="62" r="5" fill="#ff5f8f"/></svg>`,
  moon: () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M62 8 A44 44 0 1 0 62 92 A36 36 0 0 1 62 8 Z" fill="#f5e0b0"/></svg>`,
  photo: () => `<img src="${CONFIG.mascotPhoto}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:16px">`,
};
const STICKER_ORDER = ['cats', 'photo', 'heart', 'sparkle', 'crown', 'moon'];
const STICKER_SPOTS = [
  { top: '12%', left: '9%', rot: '-12deg' },
  { top: '16%', right: '9%', rot: '10deg' },
  { bottom: '14%', left: '12%', rot: '8deg' },
  { bottom: '11%', right: '12%', rot: '-9deg' },
];

/* =========================================================================
   4. Ambient background
   ========================================================================= */
const bgCanvas = $('#bg');
const bctx = bgCanvas.getContext('2d');
let BW = 0, BH = 0, stars = [], motes = [], petals = [];

function initBg() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  BW = window.innerWidth; BH = window.innerHeight;
  bgCanvas.width = BW * dpr; bgCanvas.height = BH * dpr;
  bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const starCount = REDUCED ? 40 : Math.round(clamp((BW * BH) / 11000, 40, 200));
  stars = Array.from({ length: starCount }, () => ({ x: rand(0, BW), y: rand(0, BH), r: rand(0.4, 1.5), p: rand(0, 6.28), s: rand(0.5, 1.9) }));
  motes = Array.from({ length: REDUCED ? 10 : (BW < 640 ? 18 : 34) }, () => newMote(true));
  petals = Array.from({ length: REDUCED ? 6 : (BW < 640 ? 10 : 18) }, () => newPetal(true));
}
const newMote = (any) => ({ x: rand(0, BW), y: any ? rand(0, BH) : BH + 12, r: rand(0.7, 2.2), vy: rand(0.08, 0.3), vx: rand(-0.12, 0.12), gold: Math.random() < 0.45, p: rand(0, 6.28) });
const newPetal = (any) => ({ x: rand(0, BW), y: any ? rand(0, BH) : BH + 30, s: rand(6, 14), vy: rand(0.22, 0.55), sway: rand(0.4, 1.3), p: rand(0, 6.28), a: rand(0.12, 0.32) });

function drawBg(now) {
  const t = now / 1000;
  bctx.clearRect(0, 0, BW, BH);

  for (const s of stars) {
    bctx.globalAlpha = 0.28 + 0.6 * Math.abs(Math.sin(t * s.s + s.p));
    bctx.fillStyle = '#fff';
    bctx.shadowColor = '#ffd9e8'; bctx.shadowBlur = s.r * 5;
    bctx.beginPath(); bctx.arc(s.x, s.y, s.r, 0, 6.283); bctx.fill();
  }
  bctx.shadowBlur = 0;

  for (const m of motes) {
    m.y -= m.vy; m.x += m.vx + Math.sin(t + m.p) * 0.08;
    if (m.y < -12) Object.assign(m, newMote(false));
    bctx.globalAlpha = 0.4;
    bctx.fillStyle = m.gold ? '#e9c98a' : '#ffa9c9';
    bctx.beginPath(); bctx.arc(m.x, m.y, m.r, 0, 6.283); bctx.fill();
  }

  for (const p of petals) {
    p.y -= p.vy;
    const x = p.x + Math.sin(t * p.sway + p.p) * 26;
    const rot = Math.sin(t * p.sway + p.p) * 0.6;
    if (p.y < -40) Object.assign(p, newPetal(false));
    bctx.globalAlpha = p.a;
    bctx.fillStyle = '#ff8fb8';
    bctx.save();
    bctx.translate(x, p.y); bctx.rotate(rot);
    bctx.beginPath();
    bctx.ellipse(0, 0, p.s * 0.55, p.s, 0, 0, 6.283);
    bctx.fill();
    bctx.restore();
  }
  bctx.globalAlpha = 1;
  requestAnimationFrame(drawBg);
}

/* =========================================================================
   5. Effects canvas
   ========================================================================= */
const fxCanvas = $('#fx');
const fctx = fxCanvas.getContext('2d');
let FW = 0, FH = 0, parts = [], fxOn = false;
const FX_COLORS = ['#ff8fb8', '#ff5f95', '#e9c98a', '#fff6f2', '#ffd7e6', '#c58fb0'];

function resizeFx() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  FW = window.innerWidth; FH = window.innerHeight;
  fxCanvas.width = FW * dpr; fxCanvas.height = FH * dpr;
  fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function startFx() {
  if (fxOn) return;
  fxOn = true;
  requestAnimationFrame(stepFx);
}
function confetti(x, y, n = 90) {
  if (REDUCED) return;
  for (let i = 0; i < n; i++) {
    const a = rand(0, 6.283), sp = rand(3, 11);
    parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 4, g: 0.2, life: 0, max: rand(80, 160), w: rand(5, 10), h: rand(3, 6), rot: rand(0, 6.28), vr: rand(-0.3, 0.3), c: pick(FX_COLORS), shape: Math.random() < 0.3 ? 'heart' : 'rect' });
  }
  startFx();
}
function confettiRain(ms = 2600) {
  if (REDUCED) return;
  const stop = performance.now() + ms;
  (function drop() {
    if (performance.now() > stop) return;
    confetti(rand(0, FW), rand(-40, FH * 0.3), 14);
    setTimeout(drop, 180);
  })();
}
function heartShape(ctx, x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.35);
  ctx.bezierCurveTo(x, y, x - s * 0.55, y, x - s * 0.55, y + s * 0.32);
  ctx.bezierCurveTo(x - s * 0.55, y + s * 0.62, x, y + s * 0.82, x, y + s);
  ctx.bezierCurveTo(x, y + s * 0.82, x + s * 0.55, y + s * 0.62, x + s * 0.55, y + s * 0.32);
  ctx.bezierCurveTo(x + s * 0.55, y, x, y, x, y + s * 0.35);
  ctx.closePath();
}
function stepFx() {
  fctx.clearRect(0, 0, FW, FH);
  parts = parts.filter((p) => p.life < p.max && p.y < FH + 60);
  for (const p of parts) {
    p.life++;
    p.vy += p.g; p.vx *= 0.995; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    fctx.globalAlpha = clamp(1 - p.life / p.max, 0, 1);
    fctx.fillStyle = p.c;
    if (p.shape === 'heart') { fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(p.rot); heartShape(fctx, -p.w / 2, -p.w / 2, p.w); fctx.fill(); fctx.restore(); }
    else { fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(p.rot); fctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); fctx.restore(); }
  }
  fctx.globalAlpha = 1;
  if (parts.length) requestAnimationFrame(stepFx);
  else fxOn = false;
}

/* =========================================================================
   6. Soft ambient music
   ========================================================================= */
const Music = (() => {
  let ctx = null, master = null, on = false, timer = null, step = 0;
  const CHORDS = [
    [146.83, 220.0, 293.66], // D
    [130.81, 196.0, 261.63], // C
    [174.61, 261.63, 349.23], // F
    [196.0, 293.66, 392.0],   // G
  ];
  const BELLS = [587.33, 659.25, 783.99, 880.0, 1046.5];

  function boot() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    return true;
  }
  function voice(freq, when, dur, gain, type) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(gain, when + 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    o.connect(g); g.connect(master);
    o.start(when); o.stop(when + dur + 0.1);
  }
  function tick() {
    if (!ctx) return;
    const t = ctx.currentTime + 0.05;
    const chord = CHORDS[step % CHORDS.length];
    chord.forEach((f, i) => voice(f, t, 7, 0.05 - i * 0.008, 'sine'));
    voice(chord[0] / 2, t, 7, 0.045, 'triangle');
    if (Math.random() < 0.8) voice(pick(BELLS), t + rand(0.4, 2.4), 3.4, 0.028, 'sine');
    step++;
  }
  return {
    toggle() {
      if (!ctx && !boot()) return false;
      if (ctx.state === 'suspended') ctx.resume();
      on = !on;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(on ? 0.5 : 0, ctx.currentTime + 0.8);
      if (on && !timer) { tick(); timer = setInterval(tick, 6000); }
      if (!on && timer) { clearInterval(timer); timer = null; }
      return on;
    },
    isOn: () => on,
  };
})();

/* =========================================================================
   7. Progress + navigation
   ========================================================================= */
const progress = { level: 0 };
function buildDots() {
  const wrap = $('#dots');
  wrap.innerHTML = '';
  for (let i = 0; i < 8; i++) wrap.appendChild(el('span', 'dot'));
}
function setProgress(n, label) {
  progress.level = n;
  $$('.dot').forEach((d, i) => {
    d.classList.toggle('done', i < n);
    d.classList.toggle('current', i === n);
  });
  $('#progressLabel').textContent = label || (n === 0 ? 'Khush Aamdeed' : `Level ${n} / 8`);
  const bar = $('#progress');
  bar.setAttribute('aria-valuenow', String(n));
  bar.setAttribute('aria-valuetext', label || `Level ${n} / 8`);
  save();
}
function goToLevel(n) {
  $$('.level').forEach((sec) => sec.classList.remove('active'));
  const sec = $(`#lvl${n}`);
  if (!sec) return;
  sec.hidden = false;
  sec.classList.add('active');
  $$('.level').forEach((s) => { if (s !== sec) s.hidden = true; });
  setProgress(n);
  window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
  const focus = sec.querySelector('h2, .name-reveal');
  if (focus) { focus.setAttribute('tabindex', '-1'); focus.focus({ preventScroll: true }); }
  LEVELS[n] && LEVELS[n]();
}

/* persistence */
function save() {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify({
      unlocked: !!$('#gate').hidden,
      level: progress.level,
      opened: state.opened,
      memories: state.memories,
      stickers: state.stickers,
      wished: state.wished,
      vault: state.vault,
      topicsRead: state.topicsRead,
    }));
  } catch (e) { /* storage may be blocked; that is fine */ }
}
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(CONFIG.storageKey));
    if (raw && typeof raw === 'object') return raw;
  } catch (e) { /* ignore */ }
  return null;
}
const saved = load();
const state = {
  opened: saved?.opened || [],
  memories: saved?.memories || [],
  stickers: saved?.stickers || [],
  wished: saved?.wished || false,
  vault: saved?.vault || false,
  topicsRead: saved?.topicsRead || [],
};

/* =========================================================================
   8. The login gate
   ========================================================================= */
function initGate() {
  const form = $('#gateForm');
  const card = $('#gate .glass');
  const err = $('#gateError');
  $('#gateMascot').innerHTML = mascotMarkup();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = parseInt($('#gateDay').value, 10);
    const m = parseInt($('#gateMonth').value, 10);
    if (!d || !m) { err.textContent = 'Please fill both the day and the month.'; return; }
    if (d === CONFIG.birthDay && m === CONFIG.birthMonth) {
      err.textContent = '';
      card.classList.add('leaving');
      confetti(window.innerWidth / 2, window.innerHeight * 0.45, 130);
      setTimeout(() => openWorld(), REDUCED ? 60 : 620);
    } else {
      err.textContent = WORD.passWrong;
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    }
  });
  $('#gateDay').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });
  $('#gateMonth').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });
}

function openWorld() {
  const gate = $('#gate');
  gate.hidden = true;
  const app = $('#app');
  app.hidden = false;
  $('#topbar').hidden = false;
  buildDots();
  const startLevel = state.vault ? 8 : clamp(saved?.level || 1, 1, 8);
  goToLevel(startLevel);
  save();
}

/* =========================================================================
   9. Levels
   ========================================================================= */
const LEVELS = {};

/* ---------- Level 1: welcome ---------- */
LEVELS[1] = function () {
  const host = $('#nameReveal');
  if (host.dataset.done) return;
  host.dataset.done = '1';
  const name = CONFIG.name.toUpperCase();
  host.innerHTML = '';
  [...name].forEach((ch, i) => {
    const s = el('span', 'ch', ch);
    s.style.animationDelay = `${0.35 + i * 0.11}s`;
    host.appendChild(s);
  });
  const mark = el('span', 'ch dotmark', '.');
  mark.style.animationDelay = `${0.35 + name.length * 0.11}s`;
  host.appendChild(mark);
  setTimeout(() => confetti(window.innerWidth / 2, window.innerHeight * 0.5, 70), REDUCED ? 0 : 1500);
};

/* ---------- Level 2: five hearts ---------- */
LEVELS[2] = function () {
  const field = $('#playfield');
  if (field.dataset.built) return;
  field.dataset.built = '1';

  const stack = el('div', 'msg-stack');
  stack.id = 'msgStack';
  stack.style.cssText = 'display:flex;flex-direction:column;gap:18px;align-items:center;width:100%';
  field.parentNode.insertBefore(stack, $('#collected'));

  const list = $('#collected');
  list.innerHTML = HEARTS.map((h) => `<li data-word="${h.label}">${h.label}</li>`).join('');

  const spots = [
    { left: '8%', top: '10%' }, { left: '62%', top: '6%' }, { left: '34%', top: '38%' },
    { left: '12%', top: '62%' }, { left: '66%', top: '58%' },
  ];

  HEARTS.forEach((h, i) => {
    const b = el('button', 'heart-float');
    b.type = 'button';
    b.setAttribute('aria-label', `${h.label} wala dil kholo`);
    b.style.left = spots[i].left;
    b.style.top = spots[i].top;
    b.style.setProperty('--dur', `${rand(6, 9).toFixed(1)}s`);
    b.style.setProperty('--delay', `${rand(0, 1.5).toFixed(1)}s`);
    b.style.setProperty('--dx', `${Math.round(rand(18, 40))}px`);
    b.style.setProperty('--dy', `${Math.round(rand(14, 34))}px`);
    b.innerHTML = svgUse('i-heart-f', 'icon');
    b.addEventListener('click', () => catchHeart(b, h, i));
    field.appendChild(b);
  });
  updateHeartCount();
};

function catchHeart(btn, h, i) {
  if (btn.classList.contains('caught')) return;
  btn.classList.add('caught');

  const rect = btn.getBoundingClientRect();
  const fieldRect = $('#playfield').getBoundingClientRect();
  const pop = el('span', 'word-pop', h.label);
  pop.style.left = `${rect.left - fieldRect.left + rect.width / 2}px`;
  pop.style.top = `${rect.top - fieldRect.top + rect.height / 2}px`;
  $('#playfield').appendChild(pop);
  setTimeout(() => pop.remove(), 1900);
  confetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 34);

  if (!state.opened.includes(h.label)) state.opened.push(h.label);
  save();

  const card = el('article', 'glass msg-card', `
    <p class="mc-urdu" lang="ur" dir="rtl">${h.urdu}</p>
    <h3 class="mc-title">${h.title}</h3>
    <p class="mc-body">${h.body}</p>
  `);
  $('#msgStack').appendChild(card);
  card.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });

  const li = $(`#collected li[data-word="${h.label}"]`);
  if (li) li.classList.add('got');

  updateHeartCount();
  if (state.opened.length >= HEARTS.length) {
    setTimeout(() => {
      const end = $('#lvl2-end');
      if (end) end.hidden = false;
      confetti(window.innerWidth / 2, window.innerHeight * 0.4, 110);
    }, 600);
  }
}
function updateHeartCount() {
  const n = state.opened.length;
  $('#heartCount').textContent = `${n} / ${HEARTS.length} dil khul gaye`;
  if (n >= HEARTS.length) $('#lvl2-end').hidden = false;
}

/* ---------- Level 3: the memory book ---------- */
LEVELS[3] = function () {
  const grid = $('#memGrid');
  if (grid.dataset.built) return;
  grid.dataset.built = '1';

  MEMORIES.forEach((mem, i) => {
    const card = el('button', 'mem-card');
    card.type = 'button';
    card.setAttribute('aria-pressed', 'false');
    const stickerArt = STICKERS[mem.sticker] ? STICKERS[mem.sticker]() : '';
    card.innerHTML = `
      <span class="mem-inner">
        <span class="mem-face mem-front">
          <span class="mem-sticker">${stickerArt}</span>
          <span class="mem-art">${svgUse('i-book', 'icon')}</span>
          <strong>${mem.title}</strong>
          <em>${mem.caption}</em>
          <small>Safha ${i + 1}</small>
        </span>
        <span class="mem-face mem-back">
          <span class="mb-urdu" lang="ur" dir="rtl">${mem.urdu}</span>
          <p>${mem.message}</p>
          <span class="mem-download">${svgUse('i-download')}<span>Tasveer Save Karo</span></span>
        </span>
      </span>`;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.mem-download')) {
        e.preventDefault();
        downloadCard({
          urdu: mem.urdu,
          title: mem.title,
          body: mem.message,
          footer: `${mem.caption} — Zubi`,
          file: `suhana-memory-${i + 1}.png`,
        });
        return;
      }
      card.classList.toggle('flipped');
      const flipped = card.classList.contains('flipped');
      card.setAttribute('aria-pressed', String(flipped));
      if (flipped && !state.memories.includes(mem.title)) {
        state.memories.push(mem.title);
        save();
        updateMemCount();
      }
    });
    grid.appendChild(card);
  });
  updateMemCount();
  $('#memCount').textContent = `${state.memories.length} / ${MEMORIES.length} safhe palat gaye`;
};
function updateMemCount() {
  $('#memCount').textContent = `${state.memories.length} / ${MEMORIES.length} safhe palat gaye`;
  if (state.memories.length >= MEMORIES.length) $('#lvl3-end').hidden = false;
}

/* ---------- Level 4: the pookie card ---------- */
LEVELS[4] = function () {
  const picker = $('#stickerPicker');
  if (!picker.dataset.built) {
    picker.dataset.built = '1';
    STICKER_ORDER.forEach((key) => {
      const b = el('button', 'sticker-btn');
      b.type = 'button';
      b.setAttribute('aria-label', `Card pe ${key} sticker lagao`);
      b.style.background = key === 'photo' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.08)';
      b.innerHTML = STICKERS[key]();
      b.addEventListener('click', () => placeSticker(key, b));
      picker.appendChild(b);
    });
  }
  $('#gcStickers').innerHTML = '';
  state.stickers.forEach((k) => renderSticker(k));
  updateStickerState();
};
let stickerSlot = 0;
function placeSticker(key, btn) {
  if (btn.classList.contains('placed')) return;
  if (state.stickers.length >= STICKER_SPOTS.length) { toast('Card bhar gaya — aise hi bahut pyara lag raha hai.'); return; }
  state.stickers.push(key);
  save();
  renderSticker(key);
  btn.classList.add('placed');
  updateStickerState();
}
function renderSticker(key) {
  const host = $('#gcStickers');
  const spot = STICKER_SPOTS[host.children.length % STICKER_SPOTS.length];
  const node = el('span', 'gc-sticker', STICKERS[key] ? STICKERS[key]() : '');
  Object.entries(spot).forEach(([k, v]) => { node.style[k] = v; });
  host.appendChild(node);
}
function updateStickerState() {
  const n = state.stickers.length;
  $('#stickerCount').textContent = `${n} / ${STICKER_SPOTS.length} stickers laga diye`;
  const next = $('#lvl4next');
  if (next) next.disabled = n < 2;
  const hint = $('#lvl4hint');
  if (hint) hint.hidden = n >= 2;
}

/* ---------- Level 5: the message ---------- */
LEVELS[5] = function () {
  if ($('#paper').dataset.done) return;
  $('#paper').dataset.done = '1';
  $('#msgDownload').disabled = false;

  const target = $('#typed');
  const caret = $('.caret');
  target.textContent = '';
  let i = 0;
  const speed = REDUCED ? 0 : 18;

  function step() {
    if (i >= MESSAGE.length) {
      caret.hidden = true;
      $('#msgDownload').disabled = false;
      $('#lvl5next').hidden = false;
      return;
    }
    const chunk = MESSAGE.slice(i, i + (REDUCED ? 40 : 2));
    target.textContent += chunk;
    i += chunk.length;
    $('#paper').scrollTop = $('#paper').scrollHeight;
    setTimeout(step, speed);
  }
  step();

  $('#skipLetter').onclick = () => { i = MESSAGE.length; target.textContent = MESSAGE; caret.hidden = true; $('#msgDownload').disabled = false; $('#lvl5next').hidden = false; };
};

/* ---------- Level 6: ten lines ---------- */
LEVELS[6] = function () {
  const card = $('#linesCard');
  if (!card.dataset.built) {
    card.dataset.built = '1';
    $('#linesLead').textContent = TEN_LINES.lead;
    const list = $('#linesList');
    list.innerHTML = TEN_LINES.lines.map((l) => `<li>${l}</li>`).join('');
    $('#linesReveal').addEventListener('click', revealLines, { once: true });
  }
};
function revealLines() {
  const items = $$('#linesList li');
  items.forEach((li, i) => setTimeout(() => li.classList.add('show'), REDUCED ? 0 : i * 260));
  setTimeout(() => { $('#lvl6next').hidden = false; }, REDUCED ? 0 : items.length * 260 + 200);
}

/* ---------- Level 7: wish ---------- */
LEVELS[7] = function () {
  const btn = $('#wishBtn');
  if (btn.dataset.done) return;
  btn.dataset.done = '1';
  btn.addEventListener('click', () => {
    btn.disabled = true;
    const candles = $$('#cakeScene .candle');
    candles.forEach((c, i) => setTimeout(() => c.classList.add('out'), REDUCED ? 0 : i * 220));
    $('#cakeScene').classList.add('glow-on');
    setTimeout(() => {
      $('#wishMsg').textContent = WISH.msg;
      $('#wishMsg').classList.add('show');
      $('#lvl7-end').hidden = false;
      confetti(window.innerWidth / 2, window.innerHeight * 0.35, 150);
      state.wished = true;
      save();
    }, REDUCED ? 200 : 1500);
  });
};

/* ---------- Level 8: the vault door ---------- */
LEVELS[8] = function () {
  $('#openVault').onclick = openVault;
};

/* =========================================================================
   10. The Heart Vault
   ========================================================================= */
function openVault() {
  const vault = $('#vault');
  vault.hidden = false;
  $('#app').hidden = true;
  $('#topbar').hidden = true;
  window.scrollTo(0, 0);

  const stepsCard = $('#vaultStepCard');
  const form = $('#vaultForm');
  const stepOpen = $('#vaultStepOpen');
  const reading = $('#vaultReading');
  const final = $('#vaultFinal');

  stepsCard.hidden = false;
  form.hidden = true;
  stepOpen.hidden = true;
  reading.hidden = true;
  final.hidden = true;
  $('#readingUrdu').textContent = '';
  $('#readingList').innerHTML = '';

  setVm('khazana dhoonda ja raha hai…');
  vault.classList.remove('show-card', 'inserting', 'ready');
  void vault.offsetWidth;
  // The card falls into place.
  setTimeout(() => {
    vault.classList.add('show-card');
    setTimeout(() => setVm('card mil gaya — Enter Card dabao'), REDUCED ? 200 : 1500);
  }, REDUCED ? 60 : 420);

  const enterBtn = $('#enterCardBtn');
  enterBtn.disabled = false;
  enterBtn.onclick = () => {
    enterBtn.disabled = true;
    vault.classList.add('inserting');
    setVm('card parha ja raha hai…');
    setTimeout(() => {
      $('#vaultCard').style.display = 'none';
      vault.classList.remove('inserting');
      vault.classList.add('ready');
      setVm(WORD.vaultReady);
      $('#vaultH').textContent = 'Tasdeeq Karo Ke Tum Hi Ho';
      $('#vaultSub').textContent = 'Ye khazana sirf ek date qubool karta hai. Woh likho aur chaar sacche jawab khol lo.';
      stepsCard.hidden = true;
      form.hidden = false;
      $('#vaultDay').focus();
    }, REDUCED ? 200 : 1150);
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    const d = parseInt($('#vaultDay').value, 10);
    const m = parseInt($('#vaultMonth').value, 10);
    const err = $('#vaultError');
    if (d === CONFIG.birthDay && m === CONFIG.birthMonth) {
      err.textContent = '';
      state.vault = true;
      save();
      setVm(VAULT_GRANTED);
      form.hidden = true;
      stepOpen.hidden = false;
      $('#vaultH').textContent = 'Khazana Khul Gaya';
      $('#vaultSub').textContent = 'Isme chaar jawab hain, har ek das lines ka. Jis ki aaj zaroorat ho, wo chun lo.';
      $('#vaultOpenMsg').textContent = `Khush aamdeed wapas, ${CONFIG.name}. Is khazane ki har ek line sirf tumhare liye likhi gayi thi, kisi aur ke liye nahi.`;
      buildChips();
      confetti(window.innerWidth / 2, window.innerHeight * 0.4, 150);
    } else {
      err.textContent = WORD.passWrongVault;
      const card = $('#vaultPanel');
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    }
  };
  $('#vaultDay').oninput = (e) => { e.target.value = e.target.value.replace(/\D/g, ''); };
  $('#vaultMonth').oninput = (e) => { e.target.value = e.target.value.replace(/\D/g, ''); };

  $('#readingBack').onclick = () => {
    reading.hidden = true;
    stepOpen.hidden = false;
    $('#vaultStepOpen').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
  };
  $('#readingDownload').onclick = () => {
    const t = VAULT_TOPICS.find((x) => x.key === currentTopic);
    if (!t) return;
    downloadCard({
      urdu: t.urdu,
      title: t.title,
      lead: t.lead,
      lines: t.lines,
      footer: 'Zubi ke dil mein sukoon se rakha hua',
      file: `suhana-vault-${t.key}.png`,
    });
  };
  $('#replayBtn').onclick = () => {
    try { localStorage.removeItem(CONFIG.storageKey); } catch (e) { /* ignore */ }
    location.reload();
  };

  if (state.vault) {
    // Returning visitor: keep the vault door quick to pass.
    setTimeout(() => { enterBtn.click(); }, REDUCED ? 100 : 900);
  }
}
function setVm(text) { $('#vmLine').textContent = text; }

let currentTopic = null;
function buildChips() {
  const row = $('#chipRow');
  if (row.dataset.built) return;
  row.dataset.built = '1';
  VAULT_TOPICS.forEach((t) => {
    const b = el('button', 'chip', `${svgUse(t.icon)}<span>${t.chip}</span>`);
    b.type = 'button';
    b.addEventListener('click', () => showTopic(t));
    row.appendChild(b);
  });
}
function showTopic(topic) {
  currentTopic = topic.key;
  $('#vaultStepOpen').hidden = true;
  const reading = $('#vaultReading');
  reading.hidden = false;
  $('#readingUrdu').textContent = topic.urdu;
  $('#readingTitle').textContent = topic.title;

  const list = $('#readingList');
  list.innerHTML = '';
  $$('.reading-lead').forEach((n) => n.remove());
  if (topic.lead) {
    const lead = el('p', 'reading-lead', topic.lead);
    lead.setAttribute('lang', 'en');
    lead.setAttribute('dir', 'ltr');
    $('#readingCard').insertBefore(lead, list);
  }
  topic.lines.forEach((line, i) => {
    const li = el('li', '', line);
    li.style.animationDelay = `${REDUCED ? 0 : i * 0.12}s`;
    list.appendChild(li);
  });
  reading.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  if (!state.topicsRead.includes(topic.key)) { state.topicsRead.push(topic.key); save(); }
  if (state.topicsRead.length >= VAULT_TOPICS.length) {
    setTimeout(() => { $('#vaultFinal').hidden = false; }, 600);
  }
}

/* =========================================================================
   11. Turning a card into a downloadable picture
   ========================================================================= */
let fontsReady = false;
async function ensureFonts() {
  if (fontsReady) return;
  try {
    await Promise.all([
      document.fonts.load('600 66px "Playfair Display"'),
      document.fonts.load('400 34px "Poppins"'),
      document.fonts.load('400 36px "Noto Nastaliq Urdu"'),
      document.fonts.load('600 46px "Dancing Script"'),
      document.fonts.load('500 34px "Cormorant Garamond"'),
    ]);
    await document.fonts.ready;
  } catch (e) { /* draw with whatever is available */ }
  fontsReady = true;
}

function wrapLines(ctx, text, maxWidth) {
  const out = [];
  text.split('\n').forEach((para) => {
    const words = para.split(' ');
    let line = '';
    words.forEach((w) => {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > maxWidth && line) { out.push(line); line = w; }
      else line = test;
    });
    out.push(line);
  });
  return out;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function svgToImage(svg) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
}
let mascotImgPromise = null;
function mascotImage() {
  if (!mascotImgPromise) mascotImgPromise = svgToImage(mascotMarkup().trim());
  return mascotImgPromise;
}

/* Walks the card layout, draws it when `full` is true, and always returns the
   bottom of the content. Running it once on a scratch context first lets the
   image grow tall enough for however much text the card is carrying. */
function paintCard(x, opts, W, H, full, mascot) {
  const cx = W / 2;

  if (full) {
    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#180813');
    g.addColorStop(0.5, '#2a0f23');
    g.addColorStop(1, '#3b1530');
    x.fillStyle = g; x.fillRect(0, 0, W, H);

    let glow = x.createRadialGradient(180, 140, 20, 180, 140, 620);
    glow.addColorStop(0, 'rgba(255,122,168,0.30)'); glow.addColorStop(1, 'rgba(255,122,168,0)');
    x.fillStyle = glow; x.fillRect(0, 0, W, H);
    glow = x.createRadialGradient(W - 120, H - 160, 20, W - 120, H - 160, 620);
    glow.addColorStop(0, 'rgba(233,201,138,0.20)'); glow.addColorStop(1, 'rgba(233,201,138,0)');
    x.fillStyle = glow; x.fillRect(0, 0, W, H);

    x.globalAlpha = 0.07; x.fillStyle = '#ff9dc0';
    for (let i = 0; i < 26; i++) { heartShape(x, rand(0, W), rand(0, H), rand(14, 40)); x.fill(); }
    x.globalAlpha = 1;

    x.strokeStyle = 'rgba(233,201,138,0.55)'; x.lineWidth = 3;
    roundRect(x, 46, 46, W - 92, H - 92, 34); x.stroke();
    x.strokeStyle = 'rgba(255,255,255,0.14)'; x.lineWidth = 1.5;
    roundRect(x, 66, 66, W - 132, H - 132, 26); x.stroke();

    if (mascot) { x.globalAlpha = 0.14; x.drawImage(mascot, W - 430, H - 340, 400, 286); x.globalAlpha = 1; }
  }

  let y = 170;

  // urdu line
  if (opts.urdu) {
    x.direction = 'rtl';
    x.textAlign = 'center';
    x.fillStyle = '#e9c98a';
    x.font = '400 40px "Noto Nastaliq Urdu", serif';
    wrapLines(x, opts.urdu, W - 240).forEach((l) => { x.fillText(l, cx, y); y += 78; });
    y += 24;
  }

  // title
  if (opts.title) {
    x.direction = 'ltr';
    x.textAlign = 'center';
    x.fillStyle = '#ffffff';
    x.font = '600 58px "Playfair Display", serif';
    wrapLines(x, opts.title, W - 220).forEach((l) => { y += 70; x.fillText(l, cx, y); });
    y += 26;
  }

  // divider
  x.strokeStyle = 'rgba(233,201,138,0.4)'; x.lineWidth = 2;
  x.beginPath(); x.moveTo(cx - 90, y); x.lineTo(cx + 90, y); x.stroke();
  y += 60;

  // lead
  if (opts.lead) {
    x.textAlign = 'center';
    x.fillStyle = '#ffd7e6';
    x.font = 'italic 500 40px "Cormorant Garamond", serif';
    wrapLines(x, opts.lead, W - 240).forEach((l) => { y += 56; x.fillText(l, cx, y); });
    y += 44;
  }

  // numbered lines
  if (opts.lines && opts.lines.length) {
    x.textAlign = 'left';
    opts.lines.forEach((line, i) => {
      x.fillStyle = '#e9c98a';
      x.font = '600 30px "Playfair Display", serif';
      x.fillText(String(i + 1).padStart(2, '0'), 150, y + 42);
      x.fillStyle = '#e9d7e2';
      x.font = '400 33px "Poppins", sans-serif';
      wrapLines(x, line, W - 380).forEach((l) => { x.fillText(l, 220, y + 42); y += 47; });
      y += 34;
    });
    y += 10;
  }

  // body
  if (opts.body) {
    x.textAlign = 'center';
    x.fillStyle = '#f2e2ec';
    x.font = '400 36px "Poppins", sans-serif';
    wrapLines(x, opts.body, W - 240).forEach((l) => { y += 58; x.fillText(l, cx, y); });
    y += 20;
  }

  // footer
  if (opts.footer) {
    x.textAlign = 'center';
    x.fillStyle = '#ff9dc0';
    x.font = '600 46px "Dancing Script", cursive';
    wrapLines(x, opts.footer, W - 220).forEach((l) => { y += 62; x.fillText(l, cx, y); });
  }

  if (full) {
    x.textAlign = 'center';
    x.fillStyle = 'rgba(255,255,255,0.35)';
    x.font = '400 24px "Poppins", sans-serif';
    x.fillText(`${CONFIG.name} ke liye — ${CONFIG.sender} ki taraf se`, cx, H - 110);
  }
  return y;
}

async function downloadCard(opts) {
  toast('Tumhari tasveer ban rahi hai…');
  await ensureFonts();

  const W = 1080;

  // Pass 1 — measure, so the image is exactly as tall as it needs to be.
  const scratch = document.createElement('canvas').getContext('2d');
  const bottom = paintCard(scratch, opts, W, 4000, false, null);
  const H = clamp(Math.round(bottom + 220), 1320, 3400);

  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  const mascot = await mascotImage();
  paintCard(x, opts, W, H, true, mascot);

  await new Promise((resolve) => {
    c.toBlob((blob) => {
      if (!blob) { toast('Maaf karna, yahan tasveer nahi ban saki.'); resolve(); return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = opts.file || `suhana-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      toast('Save ho gayi. Ab ye tumhari hai.');
      resolve();
    }, 'image/png');
  });
}

/* =========================================================================
   12. Boot
   ========================================================================= */
function wireGlobalUI() {
  $$('.next-btn').forEach((b) => {
    b.addEventListener('click', () => goToLevel(parseInt(b.dataset.next, 10)));
  });

  $('#musicBtn').addEventListener('click', (e) => {
    const on = Music.toggle();
    e.currentTarget.setAttribute('aria-pressed', String(on));
    e.currentTarget.innerHTML = `<svg class="icon"><use href="#i-${on ? 'music' : 'mute'}"/></svg>`;
    e.currentTarget.setAttribute('aria-label', on ? 'Stop the music' : 'Play soft music');
  });

  $('#restartBtn').addEventListener('click', () => {
    try { localStorage.removeItem(CONFIG.storageKey); } catch (err) { /* ignore */ }
    location.reload();
  });

  $('#cardDownload').addEventListener('click', () => {
    downloadCard({
      urdu: CARD.urdu,
      title: CARD.title,
      body: CARD.body,
      footer: `mohabbat ke saath, ${CONFIG.sender}`,
      file: 'suhana-birthday-card.png',
    });
  });

  $('#msgDownload').addEventListener('click', () => {
    downloadCard({
      urdu: MESSAGE_URDU,
      title: 'Tumhare Liye Ek Paighaam',
      body: MESSAGE,
      footer: `${CONFIG.sender}`,
      file: 'suhana-the-message.png',
    });
  });

  $('#linesDownload').addEventListener('click', () => {
    downloadCard({
      urdu: TEN_LINES.urdu,
      title: 'Tumhare Liye Das Lines',
      lead: TEN_LINES.lead,
      lines: TEN_LINES.lines,
      footer: `hamesha, ${CONFIG.sender}`,
      file: 'suhana-ten-lines.png',
    });
  });

  $('#welcomeMascot').innerHTML = mascotMarkup();

  window.addEventListener('resize', () => { initBg(); resizeFx(); }, { passive: true });
}

function boot() {
  initBg();
  requestAnimationFrame(drawBg);
  resizeFx();
  wireGlobalUI();
  initGate();

  if (state.wished) $('#lvl7-end').hidden = false;

  if (saved?.unlocked) openWorld();
  save();
}

document.addEventListener('DOMContentLoaded', boot);
