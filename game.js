/* Peleas de Robots — juego estático para Isaías */
(function () {
  "use strict";

  const MAX_POINTS = 18;
  const MIN_STAT = 2;
  const MAX_STAT = 10;
  const W = 1280;
  const H = 720;
  const GROUND = 618;
  const STORAGE_KEY = "peleas-robots-customs-v1";
  const MUTE_KEY = "peleas-robots-mute";
  const PROGRESS_KEY = "peleas-robots-progress-v2";
  const GOLD_WIN = 80;
  const START_GOLD = 0;
  const START_OWNED = ["titanio", "chispa", "martillo", "voltio", "hielo", "grunt", "oxido"];

  const PRESETS = [
    {
      id: "titanio",
      name: "Titanio",
      color: "#6f8fa8",
      body: "tanque",
      fuerza: 8,
      velocidad: 2,
      resistencia: 10,
      role: "Tanque lento. Vida enorme y puños aplastantes.",
    },
    {
      id: "chispa",
      name: "Chispa",
      color: "#ffd000",
      body: "agil",
      fuerza: 5,
      velocidad: 10,
      resistencia: 2,
      role: "El más rápido. Golpea y huye. Poca vida.",
    },
    {
      id: "martillo",
      name: "Martillo",
      color: "#d4452c",
      body: "pesado",
      fuerza: 10,
      velocidad: 4,
      resistencia: 5,
      role: "Puños gigantes y combos con muchísimo empuje.",
    },
    {
      id: "voltio",
      name: "Voltio",
      color: "#8b5cf6",
      body: "rayo",
      fuerza: 7,
      velocidad: 8,
      resistencia: 4,
      role: "Eléctrico y tramposo. Aturde con sus golpes.",
    },
  ];

  const SHOP = [
    {
      id: "oruga",
      name: "Oruga A-07",
      color: "#6b7280",
      body: "tanque",
      fuerza: 9,
      velocidad: 3,
      resistencia: 10,
      role: "Tanque de seis ruedas. Arrolla y no se cae.",
      price: 240,
      art: true,
      w: 158,
      h: 148,
    },
    {
      id: "caldera",
      name: "Caldera X-7",
      color: "#64748b",
      body: "pesado",
      fuerza: 8,
      velocidad: 4,
      resistencia: 9,
      role: "Caldera con cadenas y llama azul. Pega sucio.",
      price: 240,
      art: true,
      w: 150,
      h: 168,
    },
    {
      id: "hielo",
      name: "Hielo",
      color: "#7dd3fc",
      body: "agil",
      fuerza: 7,
      velocidad: 8,
      resistencia: 6,
      role: "Armadura de cristal. Garras de hielo y cadena de oro.",
      price: 200,
      art: true,
      skipCut: true,
      w: 92,
      h: 178,
    },
    {
      id: "grunt",
      name: "M-07 Grunt",
      color: "#eab308",
      body: "pesado",
      fuerza: 8,
      velocidad: 5,
      resistencia: 8,
      role: "Unidad de asalto. Amarillo y verde. Pega duro.",
      price: 200,
      art: true,
      w: 100,
      h: 176,
    },
    {
      id: "oxido",
      name: "Oxido",
      color: "#b45309",
      body: "pesado",
      fuerza: 10,
      velocidad: 3,
      resistencia: 9,
      role: "Bola de demolicion. Lenta, oxidada, aplasta.",
      price: 200,
      art: true,
      w: 120,
      h: 180,
    },
    {
      id: "sierra",
      name: "Sierra",
      color: "#fb923c",
      body: "pesado",
      fuerza: 9,
      velocidad: 5,
      resistencia: 5,
      role: "Sierras en los puños. Combo que desgarra.",
      price: 100,
    },
    {
      id: "espectro",
      name: "Espectro",
      color: "#a78bfa",
      body: "agil",
      fuerza: 6,
      velocidad: 9,
      resistencia: 3,
      role: "Casi no lo ves. Entra, pega y se esfuma.",
      price: 140,
    },
    {
      id: "coloso",
      name: "Coloso",
      color: "#ca8a04",
      body: "tanque",
      fuerza: 8,
      velocidad: 3,
      resistencia: 9,
      role: "Blindaje de bronce. Un muro con patas.",
      price: 180,
    },
  ];

  const ARENAS = [
    { id: "taller", name: "Taller", photo: true },
    { id: "desguace", name: "Desguace" },
    { id: "fabrica", name: "Fábrica" },
    { id: "azotea", name: "Azotea" },
    { id: "desierto", name: "Desierto" },
    { id: "cancha", name: "Cancha", photo: true },
    { id: "concierto", name: "Concierto", photo: true },
    { id: "metro", name: "Metro", photo: true },
    { id: "puerto", name: "Puerto" },
  ];

  function loadImg(src) {
    const im = new Image();
    im.src = src;
    return im;
  }
  const IMAGES = {
    taller: loadImg("assets/arena-taller.jpg"),
    cancha: loadImg("assets/arena-cancha.jpg"),
    concierto: loadImg("assets/arena-concierto.jpg"),
    orugaThumb: loadImg("assets/thumb-oruga.jpg"),
    orugaFight: loadImg("assets/fight-oruga.jpg"),
    calderaThumb: loadImg("assets/thumb-caldera.jpg"),
    calderaFight: loadImg("assets/fight-caldera.jpg"),
    hieloThumb: loadImg("assets/thumb-hielo.jpg"),
    hieloFight: loadImg("assets/hielo.png"),
    gruntThumb: loadImg("assets/thumb-grunt.jpg"),
    gruntFight: loadImg("assets/fight-grunt.jpg"),
    oxidoThumb: loadImg("assets/thumb-oxido.jpg"),
    oxidoFight: loadImg("assets/fight-oxido.jpg"),
    oxidoIdleD1: loadImg("assets/oxido-idle-d1.png"),
    oxidoIdleD2: loadImg("assets/oxido-idle-d2.png"),
    oxidoIdleD3: loadImg("assets/oxido-idle-d3.png"),
    oxidoSkel: loadImg("assets/oxido-esqueleto.png"),
    oxidoHead: loadImg("assets/oxido-head.jpg"),
    oxidoTorso: loadImg("assets/oxido-torso.png"),
    oxidoThigh: loadImg("assets/oxido-thigh.png"),
    oxidoFeet: loadImg("assets/oxido-feet.jpg"),
    oxidoBall: loadImg("assets/oxido-ball.png"),
    oxidoAtkHigh: loadImg("assets/oxido-atk-high.png"),
    oxidoAtkHighD1: loadImg("assets/oxido-atk-high-d1.png"),
    oxidoAtkHighD2: loadImg("assets/oxido-atk-high-d2.png"),
    oxidoAtkHighD3: loadImg("assets/oxido-atk-high-d3.png"),
    oxidoAtkMid: loadImg("assets/oxido-atk-mid.png"),
    oxidoAtkMidD1: loadImg("assets/oxido-atk-mid-d1.png"),
    oxidoAtkMidD2: loadImg("assets/oxido-atk-mid-d2.png"),
    oxidoAtkMidD3: loadImg("assets/oxido-atk-mid-d3.png"),
    oxidoAtkLow: loadImg("assets/oxido-atk-low.png"),
    oxidoAtkLowD1: loadImg("assets/oxido-atk-low-d1.png"),
    oxidoAtkLowD2: loadImg("assets/oxido-atk-low-d2.png"),
    oxidoAtkLowD3: loadImg("assets/oxido-atk-low-d3.png"),
    oxidoSkelHigh: loadImg("assets/oxido-skel-high.png"),
    oxidoSkelMid: loadImg("assets/oxido-skel-mid.png"),
    oxidoSkelLow: loadImg("assets/oxido-skel-low.png"),
    metro: loadImg("assets/arena-metro.jpg"),
  };
  SHOP[0].thumbImg = IMAGES.orugaThumb;
  SHOP[0].spriteImg = IMAGES.orugaFight;
  SHOP[1].thumbImg = IMAGES.calderaThumb;
  SHOP[1].spriteImg = IMAGES.calderaFight;
  var hieloDef = SHOP.filter(function (s) { return s.id === "hielo"; })[0];
  hieloDef.thumbImg = IMAGES.hieloThumb;
  hieloDef.spriteImg = IMAGES.hieloFight;
  var gruntDef = SHOP.filter(function (s) { return s.id === "grunt"; })[0];
  gruntDef.thumbImg = IMAGES.gruntThumb;
  gruntDef.spriteImg = IMAGES.gruntFight;
  var oxidoDef = SHOP.filter(function (s) { return s.id === "oxido"; })[0];
  oxidoDef.thumbImg = IMAGES.oxidoThumb;
  oxidoDef.spriteImg = IMAGES.oxidoFight;
  oxidoDef.skelImg = IMAGES.oxidoSkel;
  oxidoDef.partHead = IMAGES.oxidoHead;
  oxidoDef.partTorso = IMAGES.oxidoTorso;
  oxidoDef.partThigh = IMAGES.oxidoThigh;
  oxidoDef.partFeet = IMAGES.oxidoFeet;
  oxidoDef.partBall = IMAGES.oxidoBall;
  oxidoDef.poseHigh = IMAGES.oxidoAtkHigh;
  oxidoDef.poseMid = IMAGES.oxidoAtkMid;
  oxidoDef.poseLow = IMAGES.oxidoAtkLow;

  const BODY = {
    tanque: { w: 96, h: 168, fist: 24, leg: 20, label: "Tanque" },
    agil: { w: 70, h: 176, fist: 14, leg: 12, label: "Ágil" },
    pesado: { w: 104, h: 158, fist: 32, leg: 16, label: "Pesado" },
    rayo: { w: 76, h: 172, fist: 16, leg: 13, label: "Rayo" },
  };

  /* ---------- utils ---------- */
  const $ = (id) => document.getElementById(id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[(Math.random() * arr.length) | 0];
  const now = () => performance.now() / 1000;

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function rgbStr(c, a) {
    return a == null ? "rgb(" + c.r + "," + c.g + "," + c.b + ")" : "rgba(" + c.r + "," + c.g + "," + c.b + "," + a + ")";
  }
  function shade(hex, m) {
    const c = hexToRgb(hex);
    return rgbStr({
      r: clamp(c.r * m, 0, 255) | 0,
      g: clamp(c.g * m, 0, 255) | 0,
      b: clamp(c.b * m, 0, 255) | 0,
    });
  }
  function mixHex(hex, other, t) {
    const a = hexToRgb(hex);
    const b = hexToRgb(other);
    return rgbStr({
      r: lerp(a.r, b.r, t) | 0,
      g: lerp(a.g, b.g, t) | 0,
      b: lerp(a.b, b.b, t) | 0,
    });
  }

  function rr(ctx, x, y, w, h, r) {
    r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ---------- audio ---------- */
  let audioCtx = null;
  let muted = false;
  try { muted = localStorage.getItem(MUTE_KEY) === "1"; } catch (e) { muted = false; }

  function ac() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function tone({ freq, dur, type, vol, slide, delay }) {
    if (muted) return;
    try {
      const a = ac();
      const t0 = a.currentTime + (delay || 0);
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = type || "square";
      o.frequency.setValueAtTime(Math.max(20, freq), t0);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, slide), t0 + dur);
      g.gain.setValueAtTime((vol || 0.05) * 0.9, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      o.connect(g).connect(a.destination);
      o.start(t0);
      o.stop(t0 + dur + 0.02);
    } catch (e) { /* ignore */ }
  }

  const sfx = {
    click() { tone({ freq: 880, dur: 0.06, type: "square", vol: 0.04 }); },
    swing(kind) {
      if (kind === "kick") tone({ freq: 160, dur: 0.1, type: "sawtooth", vol: 0.05, slide: 70 });
      else tone({ freq: 220, dur: 0.08, type: "sawtooth", vol: 0.045, slide: 90 });
    },
    hit(heavy) {
      tone({ freq: heavy ? 70 : 110, dur: 0.14, type: "triangle", vol: 0.08, slide: 40 });
      tone({ freq: heavy ? 180 : 240, dur: 0.07, type: "square", vol: 0.03 });
    },
    block() { tone({ freq: 420, dur: 0.08, type: "square", vol: 0.05, slide: 260 }); },
    jump() { tone({ freq: 280, dur: 0.12, type: "sine", vol: 0.04, slide: 520 }); },
    stun() {
      tone({ freq: 920, dur: 0.05, type: "square", vol: 0.04 });
      tone({ freq: 1240, dur: 0.08, type: "square", vol: 0.03, delay: 0.05 });
    },
    ko() { tone({ freq: 140, dur: 0.5, type: "sawtooth", vol: 0.07, slide: 40 }); },
    win() {
      [523, 659, 784, 1046].forEach((f, i) => tone({ freq: f, dur: 0.16, type: "square", vol: 0.045, delay: i * 0.1 }));
    },
    lose() { tone({ freq: 196, dur: 0.4, type: "triangle", vol: 0.05, slide: 90 }); },
    pelea() { tone({ freq: 440, dur: 0.2, type: "square", vol: 0.05 }); },
    land() { tone({ freq: 90, dur: 0.06, type: "triangle", vol: 0.03 }); },
  };

  /* ---------- storage ---------- */
  function loadCustoms() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }
  function saveCustoms(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
    catch (e) { console.warn("No se pudo guardar", e); }
  }
  function loadProgress() {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      const p = raw ? JSON.parse(raw) : null;
      if (p && typeof p.gold === "number" && Array.isArray(p.owned)) {
        START_OWNED.forEach((id) => { if (p.owned.indexOf(id) < 0) p.owned.push(id); });
        if (typeof p.wins !== "number") p.wins = 0;
        return p;
      }
    } catch (e) { /* ignore */ }
    return { gold: START_GOLD, owned: START_OWNED.slice(), wins: 0 };
  }
  function saveProgress() {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); }
    catch (e) { console.warn("No se pudo guardar el oro", e); }
  }
  let progress = loadProgress();

  /* ---------- robot drawing ---------- */
  function pal(hex) {
    return {
      main: hex,
      dark: shade(hex, 0.5),
      mid: shade(hex, 0.78),
      light: shade(hex, 1.28),
      glow: mixHex(hex, "#ffffff", 0.45),
      fist: mixHex(hex, "#1a1a1a", 0.35),
      metal: "#c5d0dc",
      metalD: "#6b7788",
    };
  }


  function cutOutBg(img) {
    if (!img || !img.complete || !img.naturalWidth) return img;
    if (img._cut) return img._cut;
    var srcW = img.naturalWidth, srcH = img.naturalHeight;
    var maxW = 720;
    var sc = srcW > maxW ? maxW / srcW : 1;
    var w = Math.max(2, Math.round(srcW * sc));
    var h = Math.max(2, Math.round(srcH * sc));
    var c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    var cx = c.getContext("2d");
    cx.drawImage(img, 0, 0, w, h);
    var data = cx.getImageData(0, 0, w, h);
    var d = data.data;
    function idx(x, y) { return (y * w + x) * 4; }
    function sample(x, y) {
      var i = idx(x, y);
      return [d[i], d[i + 1], d[i + 2]];
    }
    var s1 = sample(1, 1), s2 = sample(w - 2, 1), s3 = sample(1, h - 2), s4 = sample(w - 2, h - 2);
    var br = (s1[0] + s2[0] + s3[0] + s4[0]) / 4;
    var bgc = (s1[1] + s2[1] + s3[1] + s4[1]) / 4;
    var bb = (s1[2] + s2[2] + s3[2] + s4[2]) / 4;
    var tol2 = 40 * 40;
    function isBg(x, y) {
      var i = idx(x, y);
      var dr = d[i] - br, dg = d[i + 1] - bgc, dbv = d[i + 2] - bb;
      return (dr * dr + dg * dg + dbv * dbv) < tol2;
    }
    var seen = new Uint8Array(w * h);
    var stack = [];
    function push(x, y) {
      if (x < 0 || y < 0 || x >= w || y >= h) return;
      var pxl = y * w + x;
      if (seen[pxl]) return;
      if (!isBg(x, y)) return;
      seen[pxl] = 1;
      stack.push(pxl);
    }
    for (var x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
    for (var y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
    while (stack.length) {
      var pxl = stack.pop();
      var xx = pxl % w, yy = (pxl / w) | 0;
      d[pxl * 4 + 3] = 0;
      push(xx - 1, yy); push(xx + 1, yy); push(xx, yy - 1); push(xx, yy + 1);
    }
    var copy = new Uint8ClampedArray(d);
    for (yy = 1; yy < h - 1; yy++) {
      for (xx = 1; xx < w - 1; xx++) {
        var i = idx(xx, yy);
        if (copy[i + 3] === 0) continue;
        var n = 0;
        if (copy[idx(xx - 1, yy) + 3] === 0) n++;
        if (copy[idx(xx + 1, yy) + 3] === 0) n++;
        if (copy[idx(xx, yy - 1) + 3] === 0) n++;
        if (copy[idx(xx, yy + 1) + 3] === 0) n++;
        if (n) d[i + 3] = Math.round(d[i + 3] * (1 - n * 0.3));
      }
    }
    cx.putImageData(data, 0, 0);
    img._cut = c;
    return c;
  }


  function drawWheel(ctx, x, y, r, ang) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.fillStyle = "#0b1220";
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = Math.max(2, r * 0.14);
    ctx.stroke();
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.34, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    for (var i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -r * 0.82);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawChain(ctx, x0, y0, ang, len, swing) {
    ctx.save();
    ctx.translate(x0, y0);
    ctx.rotate(ang + swing);
    var links = 7;
    var step = len / links;
    ctx.lineWidth = 3;
    for (var i = 0; i < links; i++) {
      var yy = 8 + i * step;
      ctx.fillStyle = i % 2 ? "#94a3b8" : "#64748b";
      ctx.strokeStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.ellipse(Math.sin(i * 0.7) * 2, yy, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, len + 6, 8, 0.15, Math.PI * 1.65);
    ctx.stroke();
    ctx.restore();
  }

  function drawMechArm(ctx, x, y, ang, reach, hot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.fillStyle = "#475569";
    ctx.fillRect(0, -8, 30, 16);
    ctx.strokeStyle = "#94a3b8";
    ctx.strokeRect(0, -8, 30, 16);
    ctx.translate(30, 0);
    ctx.rotate(0.35);
    ctx.fillStyle = "#64748b";
    ctx.fillRect(0, -7, 24 + reach, 14);
    ctx.translate(24 + reach, 0);
    ctx.fillStyle = hot ? "#fb7185" : "#1e293b";
    ctx.beginPath();
    ctx.arc(8, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function artAttackT(state, atk, kind) {
    if (state !== kind || !atk) return 0;
    var u = atk.t;
    if (u < atk.wind) return (u / atk.wind) * 0.35;
    if (u < atk.wind + atk.active) return 0.35 + 0.65 * Math.min(1, (u - atk.wind) / Math.max(0.01, atk.active));
    return Math.max(0, 1 - (u - atk.wind - atk.active) / Math.max(0.01, atk.rec));
  }

  function drawArtMech(ctx, f, t, dw, dh, state, atk) {
    var id = f.id;
    var moving = state === "walk" || state === "jump";
    var spin = t * (moving ? 11 : 1.1);
    var punchOut = artAttackT(state, atk, "punch");
    var kickOut = artAttackT(state, atk, "kick");
    var walkSwing = Math.sin(t * 7 + (f.phase || 0)) * (moving ? 0.38 : 0.1);
    var wr = id === "oruga" ? 24 : 18;
    drawWheel(ctx, -dw * 0.2, -wr + 6, wr, spin);
    drawWheel(ctx, dw * 0.2, -wr + 6, wr, spin * 1.04);
    if (id === "oruga") {
      drawWheel(ctx, 0, -wr + 4, wr * 0.88, spin * 0.96);
      var chLen = 58 + punchOut * 78 + kickOut * 36;
      drawChain(ctx, dw * 0.1, -dh * 0.38, -0.2 - punchOut * 0.9, chLen, walkSwing);
      drawChain(ctx, -dw * 0.06, -dh * 0.3, 0.55 + kickOut * 0.7, 44 + kickOut * 52, -walkSwing);
    }
    if (id === "grunt") {
      var gPunch = punchOut;
      var gKick = kickOut;
      drawMechArm(ctx, dw * 0.12, -dh * 0.52, -0.4 + walkSwing + gPunch * 1.2, 10 + gPunch * 26, gPunch > 0.4);
      drawMechArm(ctx, -dw * 0.1, -dh * 0.48, 0.55 - walkSwing + gKick * 0.8, 8 + gKick * 18, gKick > 0.4);
      ctx.save();
      ctx.fillStyle = "#3f6212";
      ctx.fillRect(-18, -dh * 0.72, 22, 16);
      ctx.fillStyle = "#eab308";
      ctx.fillRect(-14, -dh * 0.78, 14, 8);
      ctx.restore();
      if (gPunch > 0.3) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = "rgba(250,204,21,0.55)";
        ctx.beginPath();
        ctx.arc(dw * 0.42 + gPunch * 20, -dh * 0.5, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      return;
    }
    if (id === "hielo") {
      var icePunch = punchOut;
      var iceKick = kickOut;
      ctx.save();
      ctx.translate(dw * 0.28, -dh * 0.48);
      ctx.rotate(-0.25 - icePunch * 1.15);
      ctx.fillStyle = "rgba(186,230,253,0.95)";
      ctx.strokeStyle = "rgba(125,211,252,0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(36 + icePunch * 54, -10);
      ctx.lineTo(42 + icePunch * 62, 0);
      ctx.lineTo(36 + icePunch * 54, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.translate(-dw * 0.12, -dh * 0.22);
      ctx.rotate(0.9 + iceKick * 0.7 + walkSwing);
      ctx.fillStyle = "rgba(224,242,254,0.85)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(18 + iceKick * 28, 40 + iceKick * 24);
      ctx.lineTo(-6, 36 + iceKick * 20);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      drawChain(ctx, -dw * 0.02, -dh * 0.58, 0.5 + walkSwing, 28 + icePunch * 12, walkSwing);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      var spark = 0.5 + Math.sin(t * 14) * 0.25;
      ctx.fillStyle = "rgba(186,230,253," + (0.35 * spark) + ")";
      ctx.beginPath();
      ctx.arc(dw * 0.08, -dh * 0.78, 16 * spark, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }
    if (id === "caldera") {
      var armAng = -0.45 + walkSwing;
      var arm2 = 0.55 - walkSwing;
      if (punchOut) armAng = -0.15 + punchOut * 1.25;
      if (kickOut) arm2 = 0.25 + kickOut * 0.95;
      drawMechArm(ctx, -dw * 0.1, -dh * 0.5, arm2, kickOut * 18, kickOut > 0.45);
      drawMechArm(ctx, dw * 0.12, -dh * 0.54, armAng, punchOut * 28, punchOut > 0.45);
      drawChain(ctx, dw * 0.02, -dh * 0.42, 0.7, 34 + punchOut * 28, walkSwing);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      var flick = 0.65 + Math.sin(t * 17) * 0.28;
      var gx = -dw * 0.24, gy = -dh * 0.76;
      var grd = ctx.createRadialGradient(gx, gy, 2, gx, gy, 30 * flick);
      grd.addColorStop(0, "rgba(165,243,252,0.95)");
      grd.addColorStop(0.45, "rgba(56,189,248,0.55)");
      grd.addColorStop(1, "rgba(37,99,235,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(gx, gy - 8, 28 * flick, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  var armorLayerCv = null;
  function getArmorLayer(w, h) {
    w = Math.max(4, Math.ceil(w));
    h = Math.max(4, Math.ceil(h));
    if (!armorLayerCv) armorLayerCv = document.createElement("canvas");
    if (armorLayerCv.width !== w || armorLayerCv.height !== h) {
      armorLayerCv.width = w;
      armorLayerCv.height = h;
    }
    return armorLayerCv;
  }

  var PANEL_REG = {
    head: { x: 0.5, y: 0.14, rx: 0.26, ry: 0.15 },
    torso: { x: 0.5, y: 0.42, rx: 0.3, ry: 0.2 },
    armF: { x: 0.8, y: 0.44, rx: 0.18, ry: 0.2 },
    armB: { x: 0.2, y: 0.44, rx: 0.16, ry: 0.2 },
    legs: { x: 0.5, y: 0.82, rx: 0.28, ry: 0.18 },
  };

  function panelSeed(f, name) {
    var s = 2166136261;
    var str = String(f.id || "r") + name;
    for (var i = 0; i < str.length; i++) s = Math.imul(s ^ str.charCodeAt(i), 16777619);
    return s >>> 0;
  }
  function prand(seed, n) {
    var x = (seed + n * 374761393) >>> 0;
    x = Math.imul(x ^ (x >>> 16), 2246822519);
    x = Math.imul(x ^ (x >>> 13), 3266489917);
    return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
  }

  function fillGuts(ctx, cx, cy, rx, ry, seed) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = "#12151b";
    ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 2.5;
    var i, c;
    for (i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(cx - rx * 0.75, cy + i * ry * 0.18);
      ctx.lineTo(cx + rx * 0.75, cy + i * ry * 0.18);
      ctx.stroke();
    }
    var cols = ["#b91c1c", "#1d4ed8", "#ca8a04"];
    for (c = 0; c < 6; c++) {
      ctx.strokeStyle = cols[c % 3];
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - rx * 0.55, cy - ry * 0.7 + c * ry * 0.2);
      ctx.quadraticCurveTo(cx + (prand(seed, c) - 0.5) * rx, cy, cx + rx * 0.5, cy + ry * 0.55);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(251,146,60,0.7)";
    ctx.beginPath();
    ctx.arc(cx + rx * 0.08, cy, Math.max(3, rx * 0.12), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function jaggedBlob(ctx, cx, cy, rx, ry, seed, tag) {
    var n = 12 + ((prand(seed, tag) * 10) | 0);
    var i, a, j, x, y;
    ctx.beginPath();
    for (i = 0; i < n; i++) {
      a = (i / n) * Math.PI * 2 + (prand(seed, tag + i + 3) - 0.5) * 1.1;
      j = 0.28 + prand(seed, tag + i + 20) * 1.05;
      if (prand(seed, tag + i + 50) < 0.18) j *= 0.35;
      x = cx + Math.cos(a) * rx * j;
      y = cy + Math.sin(a) * ry * j;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
  function punchHoles(ctx, f, w, h) {
    var name, r, lv, s, n, ox, oy;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    for (name in PANEL_REG) {
      lv = (f.panels && f.panels[name]) || 0;
      if (lv < 3) continue;
      r = PANEL_REG[name];
      s = panelSeed(f, name);
      for (n = 0; n < 8; n++) {
        ox = (prand(s, n) - 0.5) * r.rx * w * 0.95;
        oy = (prand(s, n + 9) - 0.5) * r.ry * h * 0.95;
        jaggedBlob(
          ctx,
          r.x * w + ox,
          r.y * h + oy,
          r.rx * w * (0.4 + n * 0.11 + prand(s, n + 30) * 0.35),
          r.ry * h * (0.35 + n * 0.1 + prand(s, n + 40) * 0.35),
          s,
          n * 17
        );
      }
    }
    ctx.restore();
  }

  function drawDents(ctx, f, w, h) {
    var name, r, lv, s, n, x0, y0;
    for (name in PANEL_REG) {
      lv = (f.panels && f.panels[name]) || 0;
      if (lv < 1 || lv >= 3) continue;
      r = PANEL_REG[name];
      s = panelSeed(f, name);
      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = lv >= 2 ? "rgba(20,12,8,0.62)" : "rgba(30,20,12,0.4)";
      ctx.beginPath();
      ctx.ellipse(r.x * w, r.y * h, r.rx * w * 0.85, r.ry * h * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(10,8,6,0.75)";
      ctx.lineWidth = lv >= 2 ? 2.2 : 1.3;
      for (n = 0; n < (lv >= 2 ? 5 : 3); n++) {
        x0 = r.x * w + (prand(s, n) - 0.5) * r.rx * w * 1.4;
        y0 = r.y * h + (prand(s, n + 4) - 0.5) * r.ry * h * 1.4;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0 + (prand(s, n + 8) - 0.5) * 18, y0 + (prand(s, n + 12) - 0.3) * 16);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  function drawGutsForGone(ctx, f, w, h) {
    var name, r, lv;
    for (name in PANEL_REG) {
      lv = (f.panels && f.panels[name]) || 0;
      if (lv < 3) continue;
      r = PANEL_REG[name];
      fillGuts(ctx, r.x * w, r.y * h, r.rx * w, r.ry * h, panelSeed(f, name));
    }
  }


  function cutOutNearBlack(img) {
    if (!img || !img.complete || !img.naturalWidth) return img;
    if (img._cutDark) return img._cutDark;
    var w = img.naturalWidth, h = img.naturalHeight;
    var maxW = 640;
    var sc = w > maxW ? maxW / w : 1;
    var cw = Math.max(2, Math.round(w * sc));
    var ch = Math.max(2, Math.round(h * sc));
    var c = document.createElement("canvas");
    c.width = cw; c.height = ch;
    var cx = c.getContext("2d");
    cx.drawImage(img, 0, 0, cw, ch);
    var data = cx.getImageData(0, 0, cw, ch);
    var d = data.data;
    function dark(x, y) {
      var i = (y * cw + x) * 4;
      return d[i] < 22 && d[i + 1] < 22 && d[i + 2] < 22;
    }
    var seen = new Uint8Array(cw * ch);
    var stack = [];
    function push(x, y) {
      if (x < 0 || y < 0 || x >= cw || y >= ch) return;
      var p = y * cw + x;
      if (seen[p] || !dark(x, y)) return;
      seen[p] = 1;
      stack.push(p);
    }
    var x, y, p, xx, yy;
    for (x = 0; x < cw; x++) { push(x, 0); push(x, ch - 1); }
    for (y = 0; y < ch; y++) { push(0, y); push(cw - 1, y); }
    while (stack.length) {
      p = stack.pop();
      xx = p % cw; yy = (p / cw) | 0;
      d[p * 4 + 3] = 0;
      push(xx - 1, yy); push(xx + 1, yy); push(xx, yy - 1); push(xx, yy + 1);
    }
    cx.putImageData(data, 0, 0);
    img._cutDark = c;
    return c;
  }

  function attackK(atk) {
    if (!atk) return 0;
    var u = atk.t;
    if (u < atk.wind) return (u / Math.max(0.01, atk.wind)) * 0.35;
    if (u < atk.wind + atk.active) return 0.35 + 0.65 * Math.min(1, (u - atk.wind) / Math.max(0.01, atk.active));
    return Math.max(0, 1 - (u - atk.wind - atk.active) / Math.max(0.01, atk.rec));
  }

  function drawOxidoBall(ctx, f, t, dw, dh, state, atk) {
    var src = f.partBall || IMAGES.oxidoBall;
    if (!src || !src.complete || !src.naturalWidth) return;
    var im = cutOutNearBlack(src);
    var k = 0;
    var ang = 0.55 + Math.sin(t * 2.4 + (f.phase || 0)) * 0.12;
    if (state === "punch" && atk) {
      k = attackK(atk);
      ang = atk.height === "high" ? 0.55 - k * 1.55 : 0.55 - k * 1.25;
    } else if (state === "kick" && atk) {
      k = attackK(atk);
      ang = 0.55 + k * 0.95;
    }
    var bh = dh * (0.48 + k * 0.18);
    var iw = im.width || im.naturalWidth;
    var ih = im.height || im.naturalHeight;
    var bw = bh * (iw / ih);
    ctx.save();
    ctx.translate(dw * 0.18, -dh * 0.4);
    ctx.rotate(ang);
    ctx.drawImage(im, -bw * 0.22, -4, bw, bh);
    ctx.restore();
  }

  function blitPart(ctx, img, cx, bottomY, h) {
    if (!img || !img.complete || !img.naturalWidth) return;
    var src = img.src || "";
    var im = (src.indexOf(".png") >= 0) ? img : cutOutBg(img);
    var iw = im.naturalWidth || im.width;
    var ih = im.naturalHeight || im.height;
    if (!ih) return;
    var dw = h * (iw / ih);
    ctx.drawImage(im, cx - dw / 2, bottomY - h, dw, h);
  }

  function oxidoPartsReady(f) {
    var a = [f.partHead, f.partTorso, f.partThigh, f.partFeet];
    var i;
    for (i = 0; i < a.length; i++) {
      if (!a[i] || !a[i].complete || !a[i].naturalWidth) return false;
    }
    return true;
  }

  function oxidoStage(f) {
    var hp = f.maxHp > 0 ? f.hp / f.maxHp : 0;
    var gone = 0;
    var p = f.panels || {};
    if ((p.head || 0) >= 3) gone++;
    if ((p.torso || 0) >= 3) gone++;
    if ((p.armF || 0) >= 3) gone++;
    if ((p.armB || 0) >= 3) gone++;
    if ((p.legs || 0) >= 3) gone++;
    var fromHp = hp > 0.72 ? 0 : hp > 0.48 ? 1 : hp > 0.26 ? 2 : 3;
    var fromGone = gone >= 3 ? 3 : gone;
    return fromHp > fromGone ? fromHp : fromGone;
  }
  function oxidoHighPainted(f) {
    return !!(f && f.state === "punch" && f.attack && f.attack.height === "high");
  }
  function oxidoMidPainted(f) {
    return !!(f && f.state === "punch" && f.attack && f.attack.height !== "high" && f.attack.height !== "low");
  }
  function oxidoLowPainted(f) {
    return !!(f && f.attack && (f.state === "kick" || f.attack.height === "low"));
  }
  function oxidoIdlePainted(f) {
    if (!f) return false;
    if (f.state === "punch" || f.state === "kick") return false;
    return oxidoStage(f) >= 1 && !!(readyImg(IMAGES.oxidoIdleD1) || readyImg(IMAGES.oxidoIdleD2) || readyImg(IMAGES.oxidoIdleD3));
  }
  function oxidoIdleImg(f) {
    var st = oxidoStage(f);
    if (st >= 3 && readyImg(IMAGES.oxidoIdleD3)) return IMAGES.oxidoIdleD3;
    if (st >= 2 && readyImg(IMAGES.oxidoIdleD2)) return IMAGES.oxidoIdleD2;
    if (st >= 1 && readyImg(IMAGES.oxidoIdleD1)) return IMAGES.oxidoIdleD1;
    return null;
  }
  function readyImg(im) {
    return im && im.complete && im.naturalWidth;
  }
  function oxidoPoseImg(f) {
    var atk = f.attack;
    if (!atk) return null;
    if (f.state === "kick" || (atk.height === "low")) {
      st = oxidoStage(f);
      img = f.poseLow || IMAGES.oxidoAtkLow;
      if (st >= 3 && readyImg(IMAGES.oxidoAtkLowD3)) img = IMAGES.oxidoAtkLowD3;
      else if (st >= 2 && readyImg(IMAGES.oxidoAtkLowD2)) img = IMAGES.oxidoAtkLowD2;
      else if (st >= 1 && readyImg(IMAGES.oxidoAtkLowD1)) img = IMAGES.oxidoAtkLowD1;
      return img;
    }
    if (atk.height === "high") {
      var st = oxidoStage(f);
      var img = f.poseHigh || IMAGES.oxidoAtkHigh;
      if (st >= 3 && readyImg(IMAGES.oxidoAtkHighD3)) img = IMAGES.oxidoAtkHighD3;
      else if (st >= 2 && readyImg(IMAGES.oxidoAtkHighD2)) img = IMAGES.oxidoAtkHighD2;
      else if (st >= 1 && readyImg(IMAGES.oxidoAtkHighD1)) img = IMAGES.oxidoAtkHighD1;
      return img;
    }
    if (f.state === "punch") {
      st = oxidoStage(f);
      img = f.poseMid || IMAGES.oxidoAtkMid;
      if (st >= 3 && readyImg(IMAGES.oxidoAtkMidD3)) img = IMAGES.oxidoAtkMidD3;
      else if (st >= 2 && readyImg(IMAGES.oxidoAtkMidD2)) img = IMAGES.oxidoAtkMidD2;
      else if (st >= 1 && readyImg(IMAGES.oxidoAtkMidD1)) img = IMAGES.oxidoAtkMidD1;
      return img;
    }
    return null;
  }
  function oxidoSkelPose(f) {
    var atk = f.attack;
    if (f.state === "kick" || (atk && atk.height === "low")) return IMAGES.oxidoSkelLow;
    if (atk && atk.height === "high") return IMAGES.oxidoSkelHigh;
    if (f.state === "punch" || f.state === "kick") return IMAGES.oxidoSkelMid;
    return f.skelImg || IMAGES.oxidoSkel;
  }

  function cutOxidoImg(img) {
    if (!img) return img;
    var src = img.src || "";
    if (src.indexOf(".png") >= 0) return (img.naturalWidth && src.indexOf("esqueleto") >= 0) ? cutOutNearBlack(img) : img;
    return cutOutBg(img);
  }

  function drawDamagedOxido(ctx, f, raw, ox, oy, dw, dh) {
    var paintedHigh = oxidoHighPainted(f) || oxidoMidPainted(f) || oxidoLowPainted(f) || oxidoIdlePainted(f);
    if (!paintedHigh) {
      var skel = oxidoSkelPose(f);
      if (skel && skel.complete && skel.naturalWidth) {
        var sk = (skel.src && skel.src.indexOf(".png") >= 0) ? skel : cutOutNearBlack(skel);
        ctx.drawImage(sk, ox, oy, dw, dh);
      } else {
        ctx.save();
        ctx.translate(ox, oy);
        drawGutsForGone(ctx, f, dw, dh);
        ctx.restore();
      }
    }
    var im = cutOxidoImg(raw);
    var layer = getArmorLayer(dw, dh);
    var lctx = layer.getContext("2d");
    lctx.setTransform(1, 0, 0, 1, 0, 0);
    lctx.clearRect(0, 0, layer.width, layer.height);
    lctx.drawImage(im, 0, 0, dw, dh);
    if (!paintedHigh) {
      punchHoles(lctx, f, dw, dh);
      if (f.headLost) {
        lctx.save();
        lctx.globalCompositeOperation = "destination-out";
        lctx.beginPath();
        lctx.ellipse(dw * 0.5, dh * 0.12, dw * 0.28, dh * 0.16, 0, 0, Math.PI * 2);
        lctx.fill();
        lctx.restore();
      }
      drawDents(lctx, f, dw, dh);
    }
    ctx.drawImage(layer, ox, oy, dw, dh);
    if (f.hitFlash > 0) {
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillRect(ox, oy, dw, dh);
      ctx.globalCompositeOperation = "source-over";
    }
  }

  function drawOxidoAttackPose(ctx, f, t) {
    if (f.exploded) return true;
    if (f.state !== "punch" && f.state !== "kick") return false;
    var pose = oxidoPoseImg(f);
    if (!pose || !pose.complete || !pose.naturalWidth) return false;
    var im = pose;
    var iw = im.naturalWidth || im.width;
    var ih = im.naturalHeight || im.height;
    if (!ih) return false;
    var dh = (f.h || 180) * (f.drawScale || 1) * 1.55;
    var dw = dh * (iw / ih);
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.scale(f.facing || 1, 1);
    drawDamagedOxido(ctx, f, im, -dw * 0.28, -dh + 8, dw, dh);
    ctx.restore();
    return true;
  }

  function drawOxidoIdlePhoto(ctx, f, t) {
    if (f.exploded) return true;
    var pose = f.spriteImg;
    if (f.state === "block" && f.poseBlock && f.poseBlock.complete && f.poseBlock.naturalWidth) pose = f.poseBlock;
    var damagedIdle = oxidoIdleImg(f);
    if (damagedIdle) pose = damagedIdle;
    if (!pose || !pose.complete || !pose.naturalWidth) return false;
    var im = cutOxidoImg(pose);
    var iw = im.naturalWidth || im.width;
    var ih = im.naturalHeight || im.height;
    if (!ih) return false;
    var walking = f.state === "walk";
    var bob = Math.sin(t * 5 + (f.phase || 0)) * (walking ? 5 : 1.3);
    if (f.state === "hit") bob += 6;
    var dh = (f.h || 180) * (f.drawScale || 1) * 1.55;
    var dw = dh * (iw / ih);
    var lean = f.state === "block" ? -8 : (walking ? Math.sin(t * 7) * 3 : 0);
    ctx.save();
    ctx.translate(f.x, f.y + bob);
    ctx.scale(f.facing || 1, 1);
    if (lean) ctx.rotate(lean * 0.012);
    drawDamagedOxido(ctx, f, pose, -dw / 2, -dh + 6, dw, dh);
    ctx.restore();
    return true;
  }

  function drawOxidoPuppet(ctx, f, t) {
    const scale = f.drawScale || 1;
    const state = f.state || "idle";
    const atk = f.attack;
    const walking = state === "walk";
    const stride = Math.sin(t * 7.5 + (f.phase || 0));
    let bob = Math.sin(t * 5 + (f.phase || 0)) * (walking ? 4 : 1.2);
    if (walking) bob += Math.abs(stride) * 5;
    let lean = walking ? stride * 3 : 0;
    let punchReach = 0;
    if (state === "jump") bob = -12;
    if (state === "block") lean = -6;
    if (state === "hit" || state === "stun") lean = -8;
    if (state === "ko") lean = 16;
    if (state === "punch" && atk) {
      if (atk.t >= atk.wind && atk.t < atk.wind + atk.active) punchReach = atk.height === "high" ? 18 : 26;
      lean = atk.height === "high" ? -4 : 10;
    }
    if (state === "kick" && atk) {
      if (atk.t >= atk.wind && atk.t < atk.wind + atk.active) punchReach = 10;
    }
    const dh = (f.h || 180) * scale * 1.55;
    const dw = dh * 0.62;
    ctx.save();
    ctx.translate(f.x + punchReach * (f.facing || 1), f.y + bob);
    ctx.scale(f.facing || 1, 1);
    if (lean) ctx.rotate(lean * 0.012);

    var destX = -dw / 2, destY = -dh + 6;
    var skel = f.skelImg || IMAGES.oxidoSkel;
    if (skel && skel.complete && skel.naturalWidth) {
      ctx.drawImage(cutOutBg(skel), destX, destY, dw, dh);
    }

    var layer = getArmorLayer(dw, dh);
    var lctx = layer.getContext("2d");
    lctx.setTransform(1, 0, 0, 1, 0, 0);
    lctx.clearRect(0, 0, layer.width, layer.height);
    lctx.save();
    lctx.translate(dw / 2, dh);

    var hip = walking ? stride * 0.2 : 0;
    var kickAng = 0;
    if (state === "kick" && atk && atk.t >= atk.wind) kickAng = 0.55;
    lctx.save();
    lctx.rotate(hip + kickAng);
    blitPart(lctx, f.partFeet, 6, 0, dh * 0.28);
    blitPart(lctx, f.partThigh, 2, -dh * 0.24, dh * 0.36);
    lctx.restore();

    lctx.save();
    lctx.translate(punchReach * 0.4, 0);
    blitPart(lctx, f.partTorso, 0, -dh * 0.52, dh * 0.42);
    lctx.restore();

    var headBob = walking ? stride * 3 : 0;
    if (state === "punch" && atk && atk.height === "high") headBob -= 10;
    blitPart(lctx, f.partHead, 2, -dh * 0.84 + headBob, dh * 0.24);
    lctx.restore();

    punchHoles(lctx, f, dw, dh);
    drawDents(lctx, f, dw, dh);
    ctx.drawImage(layer, destX, destY, dw, dh);
    if (f.hitFlash > 0) {
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillRect(destX, destY, dw, dh);
      ctx.globalCompositeOperation = "source-over";
    }
    drawOxidoBall(ctx, f, t, dw, dh, state, atk);
    ctx.restore();
  }

  function drawSpriteRobot(ctx, f, t) {
    if (f.id === "oxido") {
      if (f.exploded) return;
      if (drawOxidoAttackPose(ctx, f, t)) return;
      if (drawOxidoIdlePhoto(ctx, f, t)) return;
      if (oxidoPartsReady(f)) {
        drawOxidoPuppet(ctx, f, t);
        return;
      }
    }
    const img = f.skipCut ? f.spriteImg : cutOutBg(f.spriteImg);
    const scale = f.drawScale || 1;
    const state = f.state || "idle";
    const atk = f.attack;
    const walking = state === "walk";
    const stride = Math.sin(t * 8 + (f.phase || 0));
    let bob = Math.sin(t * 5 + (f.phase || 0)) * (walking ? 5.5 : 1.4);
    if (walking) bob += Math.abs(stride) * 7;
    let lean = walking ? stride * 4 : 0;
    let punchReach = 0;
    if (state === "jump") bob = -12;
    if (state === "block") lean = -6;
    if (state === "hit" || state === "stun") lean = -f.facing * 8;
    if (state === "ko") lean = 18;
    if (state === "punch" && atk) {
      const u = atk.t;
      if (u >= atk.wind && u < atk.wind + atk.active) punchReach = 22;
      lean = 8;
    }
    if (state === "kick" && atk) {
      const u = atk.t;
      if (u >= atk.wind && u < atk.wind + atk.active) punchReach = 16;
    }
    const targetH = (f.h || 160) * scale * (f.art ? 1.55 : 1.2);
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const ratio = iw / ih;
    const dw = targetH * ratio;
    const dh = targetH;
    const x = f.x + punchReach * (f.facing || 1);
    const y = f.y + bob;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(f.facing || 1, 1);
    if (lean) ctx.rotate(lean * 0.012);

    const layer = getArmorLayer(dw, dh);
    const lctx = layer.getContext("2d");
    lctx.setTransform(1, 0, 0, 1, 0, 0);
    lctx.clearRect(0, 0, layer.width, layer.height);
    if (walking) {
      lctx.drawImage(img, 0, 0, iw, ih * 0.58, 0, 0, dw, dh * 0.58);
      lctx.save();
      lctx.translate(dw / 2, dh * 0.58);
      lctx.scale(1 + stride * 0.05, 1 + Math.abs(stride) * 0.07);
      lctx.translate(-dw / 2, 0);
      lctx.drawImage(img, 0, ih * 0.58, iw, ih * 0.42, 0, 0, dw, dh * 0.42);
      lctx.restore();
    } else {
      lctx.drawImage(img, 0, 0, dw, dh);
    }
    punchHoles(lctx, f, dw, dh);
    drawDents(lctx, f, dw, dh);

    var destX = -dw / 2;
    var destY = -dh + 6;
    var skel = f.skelImg || (f.id === "oxido" ? IMAGES.oxidoSkel : null);
    if (skel && skel.complete && skel.naturalWidth) {
      var sk = cutOutBg(skel);
      ctx.drawImage(sk, destX, destY, dw, dh);
    } else {
      ctx.save();
      ctx.translate(destX, destY);
      drawGutsForGone(ctx, f, dw, dh);
      ctx.restore();
    }
    ctx.drawImage(layer, destX, destY, dw, dh);
    if (f.hitFlash > 0) {
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fillRect(destX, destY, dw, dh);
      ctx.globalCompositeOperation = "source-over";
    }
    ctx.restore();
  }

  function drawWreckingBall(ctx, f, t, dw, dh, state, atk) {
    var punch = 0, kick = 0;
    if (state === "punch" && atk) {
      if (atk.t < atk.wind) punch = atk.t / atk.wind * 0.4;
      else if (atk.t < atk.wind + atk.active) punch = 0.4 + 0.6 * Math.min(1, (atk.t - atk.wind) / Math.max(0.01, atk.active));
      else punch = Math.max(0, 1 - (atk.t - atk.wind - atk.active) / Math.max(0.01, atk.rec));
    }
    if (state === "kick" && atk) {
      if (atk.t < atk.wind) kick = atk.t / atk.wind * 0.4;
      else if (atk.t < atk.wind + atk.active) kick = 0.4 + 0.6 * Math.min(1, (atk.t - atk.wind) / Math.max(0.01, atk.active));
      else kick = Math.max(0, 1 - (atk.t - atk.wind - atk.active) / Math.max(0.01, atk.rec));
    }
    var swing = Math.sin(t * 3) * 0.12;
    var ang = -0.5 + swing - punch * 1.35 + kick * 0.9;
    var len = 70 + punch * 90 + kick * 50;
    var x0 = dw * 0.18;
    var y0 = -dh * 0.42;
    ctx.save();
    ctx.translate(x0, y0);
    ctx.rotate(ang);
    ctx.strokeStyle = "#6b4f3a";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, len);
    ctx.stroke();
    ctx.strokeStyle = "#a8a29e";
    ctx.lineWidth = 2;
    for (var i = 0; i < 6; i++) {
      var yy = 10 + i * (len / 6);
      ctx.beginPath();
      ctx.arc(0, yy, 5, 0, Math.PI * 2);
      ctx.stroke();
    }
    var r = 28 + punch * 8;
    var grd = ctx.createRadialGradient(-8, len - 6, 4, 0, len, r);
    grd.addColorStop(0, "#d6a06a");
    grd.addColorStop(0.45, "#92400e");
    grd.addColorStop(1, "#431407");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(0, len, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#44403c";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#78350f";
    ctx.fillRect(-6, len - 6, 12, 12);
    ctx.restore();
  }

  function drawRobot(ctx, f, t) {
    if (f.exploded) return;
    if (f.spriteImg && f.spriteImg.complete && f.spriteImg.naturalWidth) {
      drawSpriteRobot(ctx, f, t);
      return;
    }
    const b = BODY[f.body] || BODY.tanque;
    const p = pal(f.color);
    const scale = f.drawScale || 1;
    const state = f.state || "idle";
    const st = f.stateT || 0;
    const atk = f.attack;

    let bob = Math.sin(t * 5 + (f.phase || 0)) * (state === "walk" ? 3.5 : 1.6);
    let crouch = 0;
    let lean = 0;
    let rot = 0;
    let punchReach = 0;
    let punchRot = 0.35;
    let kickRot = 0.12;
    let backKick = 0.08;
    let armGuard = 0;
    let shakeX = 0;
    let flash = f.hitFlash > 0;

    if (state === "walk") {
      const ph = t * (8 + (f.velocidad || 6) * 0.4);
      kickRot = Math.sin(ph) * 1.05;
      backKick = Math.sin(ph + Math.PI) * 1.05;
      punchRot = 0.35 + Math.sin(ph + Math.PI) * 0.5;
    }
    if (state === "jump") {
      bob = -8;
      kickRot = -0.45;
      backKick = 0.55;
    }
    if (state === "block") {
      crouch = 10;
      armGuard = 1;
      punchRot = -0.9;
    }
    if (state === "punch" && atk) {
      const tot = atk.wind + atk.active + atk.rec;
      const u = atk.t;
      if (u < atk.wind) {
        const k = u / atk.wind;
        punchRot = lerp(0.35, -0.7, k);
        lean = -6 * k;
      } else if (u < atk.wind + atk.active) {
        const k = (u - atk.wind) / atk.active;
        punchRot = lerp(-0.7, 1.25, Math.min(1, k * 1.8));
        punchReach = lerp(0, 34, Math.min(1, k * 1.6));
        lean = 10;
      } else {
        const k = (u - atk.wind - atk.active) / atk.rec;
        punchRot = lerp(1.25, 0.35, k);
        punchReach = lerp(34, 0, k);
        lean = lerp(10, 0, k);
      }
    }
    if (state === "kick" && atk) {
      const u = atk.t;
      if (u < atk.wind) {
        kickRot = lerp(0.12, -0.5, u / atk.wind);
        crouch = 6;
      } else if (u < atk.wind + atk.active) {
        const k = (u - atk.wind) / atk.active;
        kickRot = lerp(-0.5, 1.45, Math.min(1, k * 1.7));
        lean = 8;
      } else {
        const k = (u - atk.wind - atk.active) / atk.rec;
        kickRot = lerp(1.45, 0.12, k);
      }
    }
    if (state === "hit") {
      lean = -16;
      rot = -0.18;
      shakeX = Math.sin(st * 50) * 4;
      punchRot = 1.1;
      kickRot = 0.4;
    }
    if (state === "stun") {
      shakeX = Math.sin(t * 40) * 5;
      punchRot = 0.9;
      bob += Math.sin(t * 20) * 2;
    }
    if (state === "ko") {
      rot = 1.25;
      bob = 20;
      lean = 0;
    }

    ctx.save();
    ctx.translate(f.x + shakeX, f.y);
    ctx.scale((f.facing || 1) * scale, scale);

    // shadow
    ctx.save();
    ctx.scale(1, 0.28);
    ctx.beginPath();
    ctx.ellipse(0, 0, b.w * 0.48, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fill();
    ctx.restore();

    ctx.translate(lean, -crouch + bob);
    ctx.rotate(rot);

    const hipY = -38;
    const shoulderY = hipY - b.h * 0.42;
    const headY = shoulderY - 36;

    function limb(x0, y0, len, thick, ang, color) {
      ctx.save();
      ctx.translate(x0, y0);
      ctx.rotate(ang);
      rr(ctx, -thick / 2, 0, thick, len, thick / 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = p.dark;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    function fist(x0, y0, ang, reach) {
      ctx.save();
      ctx.translate(x0, y0);
      ctx.rotate(ang);
      ctx.translate(0, 46 + reach);
      const s = b.fist;
      rr(ctx, -s / 2, -s / 2, s, s, f.body === "pesado" ? 6 : 8);
      ctx.fillStyle = flash ? "#fff" : p.fist;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      if (f.body === "pesado") {
        ctx.fillStyle = p.metal;
        ctx.fillRect(-s / 2 + 4, -4, s - 8, 8);
      }
      ctx.restore();
    }

    const fillBody = flash ? "#ffffff" : p.main;
    const fillDark = flash ? "#dde" : p.dark;

    // back arm
    limb(-b.w * 0.38, shoulderY + 8, 44, 14, 0.55 + (armGuard ? -1.1 : 0) - punchRot * 0.15, fillDark);
    fist(-b.w * 0.38, shoulderY + 8, 0.55 - punchRot * 0.15, 0);

    // back leg
    limb(-18, hipY, 46, b.leg, backKick * 0.7, fillDark);

    // torso
    const tw = b.w * 0.72;
    const th = b.h * 0.46;
    rr(ctx, -tw / 2, shoulderY, tw, th, f.body === "agil" ? 18 : 10);
    ctx.fillStyle = fillBody;
    ctx.fill();
    ctx.strokeStyle = "#0b0f18";
    ctx.lineWidth = 3;
    ctx.stroke();

    // chest plate
    rr(ctx, -tw * 0.32, shoulderY + 16, tw * 0.64, th * 0.48, 8);
    ctx.fillStyle = flash ? "#fff" : p.light;
    ctx.fill();

    if (f.body === "tanque") {
      ctx.fillStyle = p.metalD;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(-tw * 0.22 + i * 18, shoulderY + 28, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      // vents
      ctx.fillStyle = p.dark;
      rr(ctx, tw * 0.28, shoulderY + 8, 14, th - 16, 3);
      ctx.fill();
    }
    if (f.body === "rayo") {
      ctx.save();
      ctx.fillStyle = "#67e8f9";
      ctx.globalAlpha = 0.7 + Math.sin(t * 10) * 0.25;
      ctx.beginPath();
      ctx.arc(0, shoulderY + th * 0.42, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = "#67e8f9";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-8, shoulderY + 20);
      ctx.lineTo(2, shoulderY + 34);
      ctx.lineTo(-4, shoulderY + 34);
      ctx.lineTo(8, shoulderY + 52);
      ctx.stroke();
    }
    if (f.body === "agil") {
      ctx.fillStyle = "#111";
      rr(ctx, -10, shoulderY + th - 8, 20, 10, 4);
      ctx.fill();
    }
    if (f.body === "pesado") {
      ctx.fillStyle = p.metal;
      rr(ctx, -tw / 2 - 8, shoulderY + 6, 16, 28, 4);
      ctx.fill();
      rr(ctx, tw / 2 - 8, shoulderY + 6, 16, 28, 4);
      ctx.fill();
    }

    // head
    const hw = f.body === "tanque" ? 52 : f.body === "pesado" ? 44 : 46;
    const hh = f.body === "agil" ? 44 : 40;
    rr(ctx, -hw / 2, headY, hw, hh, f.body === "agil" ? 16 : 8);
    ctx.fillStyle = fillBody;
    ctx.fill();
    ctx.strokeStyle = "#0b0f18";
    ctx.lineWidth = 3;
    ctx.stroke();

    // visor
    ctx.fillStyle = flash ? "#fff" : (f.body === "rayo" ? "#67e8f9" : "#7ee8ff");
    rr(ctx, -hw / 2 + 8, headY + 12, hw - 16, 14, 6);
    ctx.fill();
    ctx.fillStyle = "rgba(8,16,32,0.55)";
    ctx.fillRect(-6, headY + 14, 4, 10);

    if (f.body === "tanque") {
      ctx.fillStyle = p.metalD;
      rr(ctx, -hw / 2 - 6, headY + 8, 10, 18, 2);
      ctx.fill();
      rr(ctx, hw / 2 - 4, headY + 8, 10, 18, 2);
      ctx.fill();
    }
    if (f.body === "agil") {
      ctx.strokeStyle = p.light;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, headY);
      ctx.lineTo(0, headY - 16);
      ctx.stroke();
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(0, headY - 18, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    if (f.body === "rayo") {
      ctx.strokeStyle = "#c4b5fd";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const yy = headY - 6 - i * 5;
        ctx.moveTo(-8 + (i % 2) * 4, yy);
        ctx.lineTo(8 - (i % 2) * 4, yy);
      }
      ctx.stroke();
    }
    if (f.body === "pesado") {
      ctx.fillStyle = p.dark;
      rr(ctx, -10, headY - 8, 20, 10, 2);
      ctx.fill();
    }

    // front leg / kick
    const kickAng = state === "kick" ? kickRot : kickRot * 0.7;
    limb(16, hipY, 48, b.leg + 2, kickAng, fillBody);
    // foot
    ctx.save();
    ctx.translate(16, hipY);
    ctx.rotate(kickAng);
    ctx.translate(0, 48);
    rr(ctx, -6, -4, f.body === "agil" ? 28 : 24, 12, 4);
    ctx.fillStyle = flash ? "#fff" : p.dark;
    ctx.fill();
    ctx.restore();

    // front arm / punch
    const armAng = armGuard ? -1.25 : punchRot;
    limb(b.w * 0.34, shoulderY + 10, 46, 16, armAng, fillBody);
    fist(b.w * 0.34, shoulderY + 10, armAng, punchReach);

    if (state === "block") {
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = "#7ee8ff";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(b.w * 0.42, shoulderY + 10, 38, -1.2, 1.2);
      ctx.stroke();
      ctx.restore();
    }

    if (f.panels) {
      var pr = {
        head: { x: 0, y: headY + 20, rx: 22, ry: 18 },
        torso: { x: 0, y: shoulderY + 30, rx: 28, ry: 24 },
        armF: { x: b.w * 0.38, y: shoulderY + 20, rx: 16, ry: 18 },
        armB: { x: -b.w * 0.32, y: shoulderY + 18, rx: 14, ry: 16 },
        legs: { x: 0, y: hipY + 20, rx: 24, ry: 22 },
      };
      var pn, rg, lv;
      for (pn in pr) {
        lv = f.panels[pn] || 0;
        rg = pr[pn];
        if (lv >= 3) fillGuts(ctx, rg.x, rg.y, rg.rx, rg.ry, panelSeed(f, pn));
        else if (lv >= 1) {
          ctx.save();
          ctx.fillStyle = lv >= 2 ? "rgba(20,12,8,0.4)" : "rgba(30,20,12,0.22)";
          ctx.beginPath();
          ctx.ellipse(rg.x, rg.y, rg.rx, rg.ry, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    // stun stars
    if (state === "stun") {
      ctx.fillStyle = "#ffe08a";
      for (let i = 0; i < 3; i++) {
        const a = t * 4 + i * 2.1;
        ctx.save();
        ctx.translate(Math.cos(a) * 28, headY - 18 + Math.sin(a * 1.7) * 8);
        ctx.rotate(a);
        ctx.fillRect(-3, -3, 6, 6);
        ctx.restore();
      }
    }

    ctx.restore();
  }

  /* ---------- particles ---------- */
  const particles = [];
  function burst(x, y, color, n, speed) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2);
      const s = rand(speed * 0.3, speed);
      particles.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - rand(40, 140),
        life: rand(0.25, 0.55),
        max: 0.55,
        size: rand(2, 6),
        color,
        g: 900,
      });
    }
  }
  function burstDust(x, y, facing, heavy) {
    var n = ((heavy ? 12 : 7) + (Math.random() * (heavy ? 18 : 14) | 0)) * 3;
    var i, smoke, col, dir, side;
    facing = facing || 1;
    for (i = 0; i < n; i++) {
      smoke = Math.random() < (0.32 + Math.random() * 0.4);
      if (smoke) {
        col = Math.random() < 0.5 ? "rgba(72,66,58,0.55)" : "rgba(120,112,100,0.42)";
      } else {
        col = Math.random() < 0.5 ? "#6b5344" : "#c4b49a";
      }
      dir = Math.random() * Math.PI * 2;
      side = Math.random() < 0.22 ? -facing : facing;
      particles.push({
        kind: smoke ? "smoke" : "dust",
        x: x + rand(-34, 40) * facing,
        y: y + rand(-28, 22),
        vx: Math.cos(dir) * rand(40, 280) * side * (0.25 + Math.random()),
        vy: smoke ? rand(-260, 40) : rand(-420, 30),
        life: smoke ? rand(0.35, 1.7) : rand(0.18, 0.95),
        max: smoke ? 1.7 : 0.95,
        size: smoke ? rand(8, 42) : rand(2, 16),
        color: col,
        g: smoke ? 40 + Math.random() * 90 : 240 + Math.random() * 420,
        spin: rand(-6, 6),
        rot: rand(0, 6),
      });
    }
  }
  function burstHeavySmoke(x, y, facing) {
    var n = (34 + (Math.random() * 22 | 0)) * 3;
    var i, col, dir;
    facing = facing || 1;
    for (i = 0; i < n; i++) {
      col = Math.random() < 0.4
        ? "rgba(40,36,32,0.7)"
        : (Math.random() < 0.5 ? "rgba(86,80,70,0.55)" : "rgba(150,142,128,0.4)");
      dir = Math.random() * Math.PI * 2;
      particles.push({
        kind: "smoke",
        x: x + rand(-48, 56) * facing,
        y: y + rand(-36, 28),
        vx: Math.cos(dir) * rand(20, 160) * (Math.random() < 0.4 ? -facing : facing),
        vy: rand(-320, -10),
        life: rand(1.15, 2.7),
        max: 2.7,
        size: rand(20, 64),
        color: col,
        g: 18 + Math.random() * 50,
        spin: rand(-2.4, 2.4),
        rot: rand(0, 6),
      });
    }
  }
  function dust(x, y) {
    for (let i = 0; i < 6; i++) {
      particles.push({
        x: x + rand(-16, 16),
        y,
        vx: rand(-80, 80),
        vy: rand(-40, -10),
        life: 0.35,
        max: 0.35,
        size: rand(4, 9),
        color: "rgba(200,180,140,0.7)",
        g: 200,
      });
    }
  }
  function leakSmoke(f) {
    if (!f || !f.smoking || f.exploded) return;
    var n = 3 + (Math.random() * 6 | 0);
    var i, col, dir;
    var x = f.x + rand(-22, 22);
    var y = f.y - (f.h || 160) * (0.35 + Math.random() * 0.5);
    for (i = 0; i < n; i++) {
      col = Math.random() < 0.35
        ? "rgba(36,32,28,0.62)"
        : (Math.random() < 0.5 ? "rgba(80,74,64,0.48)" : "rgba(140,132,118,0.36)");
      dir = Math.random() * Math.PI * 2;
      particles.push({
        kind: "smoke",
        x: x + rand(-30, 30),
        y: y + rand(-18, 16),
        vx: Math.cos(dir) * rand(8, 70) * (Math.random() < 0.5 ? -1 : 1),
        vy: rand(-180, -20),
        life: rand(0.9, 2.4),
        max: 2.4,
        size: rand(16, 54),
        color: col,
        g: 10 + Math.random() * 40,
        spin: rand(-1.8, 1.8),
        rot: rand(0, 6),
      });
    }
  }
  function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += (p.g || 900) * dt;
      if (p.spin) p.rot = (p.rot || 0) + p.spin * dt;
      if (p.bounce && p.y >= GROUND - 4) {
        p.y = GROUND - 4;
        p.vy *= -0.28;
        p.vx *= 0.6;
        p.bounce -= 1;
      }
      if (p.life <= 0) particles.splice(i, 1);
    }
    if (particles.length > 900) particles.splice(0, particles.length - 900);
  }

  function drawParticles(ctx) {
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life / (p.max || 0.5));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot || 0);
      if (p.kind === "oil") {
        ctx.fillStyle = p.color || "#1a2e12";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.7, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.kind === "screw") {
        ctx.fillStyle = "#9ca3af";
        ctx.fillRect(-p.size * 0.4, -p.size * 0.2, p.size, p.size * 0.4);
        ctx.fillStyle = "#6b7280";
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.28, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.kind === "hose") {
        ctx.strokeStyle = p.color || "#7c2d12";
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.quadraticCurveTo(0, 6, 8, 2);
        ctx.stroke();
      } else if (p.kind === "shard") {
        ctx.fillStyle = p.color || "#57534e";
        ctx.beginPath();
        ctx.moveTo(-p.size, -p.size * 0.4);
        ctx.lineTo(p.size, -p.size * 0.2);
        ctx.lineTo(p.size * 0.4, p.size);
        ctx.lineTo(-p.size * 0.6, p.size * 0.5);
        ctx.closePath();
        ctx.fill();
      } else if (p.kind === "dust" || p.kind === "smoke") {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * (p.kind === "smoke" ? 0.72 : 0.55), p.rot || 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(0, 0, p.size, p.size);
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function spawnDebris(def, panel, broke) {
    var py = def.y - def.h * (panel === "head" ? 0.88 : panel === "legs" ? 0.22 : 0.52);
    var px = def.x + def.facing * (panel === "armF" ? 28 : panel === "armB" ? -22 : 0);
    var i, a, s;
    burst(px, py, "#fbbf24", broke ? (30 + (Math.random() * 36 | 0)) : (12 + (Math.random() * 18 | 0)), broke ? rand(280, 520) : rand(160, 280));
    burst(px, py, "#fff", broke ? (12 + (Math.random() * 24 | 0)) : (6 + (Math.random() * 12 | 0)), rand(180, 320));
    if (!broke) return;
    var nShard = 8 + (Math.random() * 14 | 0);
    for (i = 0; i < nShard; i++) {
      particles.push({
        kind: "shard",
        x: px + rand(-28, 28),
        y: py + rand(-22, 18),
        vx: rand(-340, 340),
        vy: rand(-620, -40),
        life: rand(0.55, 2.1),
        max: 2.1,
        size: rand(5, 34),
        color: Math.random() < 0.35 ? "#7c2d12" : (Math.random() < 0.5 ? "#44403c" : "#57534e"),
        g: 780 + Math.random() * 420,
        spin: rand(-22, 22),
        rot: rand(0, 6),
        bounce: 1 + (Math.random() * 2 | 0),
      });
    }
    var nOil = 12 + (Math.random() * 22 | 0);
    for (i = 0; i < nOil; i++) {
      particles.push({
        kind: "oil", x: px + rand(-16, 16), y: py + rand(-8, 8), vx: rand(-120, 120), vy: rand(-280, -10),
        life: rand(0.45, 1.5), max: 1.5, size: rand(3, 11), color: "#1a2e12", g: 500 + Math.random() * 400, bounce: 1,
      });
    }
    var nScrew = 14 + (Math.random() * 28 | 0);
    for (i = 0; i < nScrew; i++) {
      particles.push({
        kind: "screw", x: px + rand(-22, 22), y: py + rand(-14, 10), vx: rand(-320, 320), vy: rand(-520, -20),
        life: rand(0.35, 1.6), max: 1.6, size: rand(2, 11), g: 900 + Math.random() * 200, spin: rand(-28, 28), rot: rand(0, 5), bounce: 1 + (Math.random() < 0.4 ? 1 : 0),
      });
    }
    var nHose = 5 + (Math.random() * 12 | 0);
    for (i = 0; i < nHose; i++) {
      particles.push({
        kind: "hose", x: px, y: py, vx: rand(-140, 140), vy: rand(-300, -20),
        life: rand(0.5, 1.2), max: 1.2, size: rand(2, 6), color: i % 2 ? "#1e3a8a" : "#7c2d12", g: 820, spin: rand(-6, 6), rot: rand(0, 4), bounce: 1,
      });
    }
  }

  function smashPanel(def, kind) {
    if (!def.panels) def.panels = { head: 0, torso: 0, armF: 0, armB: 0, legs: 0 };
    var prefer;
    if (kind === "kick") prefer = ["legs", "torso", "armF", "head", "armB"];
    else if (kind === "high") prefer = ["head", "torso", "armF", "armB", "legs"];
    else prefer = ["torso", "armF", "head", "armB", "legs"];
    var k = prefer[0];
    var i, name;
    for (i = 0; i < prefer.length; i++) {
      name = prefer[i];
      if ((def.panels[name] || 0) < 3 && Math.random() < 0.72) { k = name; break; }
      if ((def.panels[name] || 0) < 3) k = name;
    }
    var before = def.panels[k] || 0;
    def.panels[k] = Math.min(3, before + 1);
    spawnDebris(def, k, true);
    if (k === "head" && def.panels.head >= 3 && !def.headLost) {
      def.headLost = true;
      for (i = 0; i < 6 + (Math.random() * 6 | 0); i++) {
        particles.push({
          kind: "shard",
          x: def.x + rand(-18, 18),
          y: def.y - def.h * 0.85 + rand(-10, 10),
          vx: rand(-200, 200),
          vy: rand(-520, -120),
          life: rand(1.0, 2.0),
          max: 2.0,
          size: rand(10, 30),
          color: i % 2 ? "#7c2d12" : "#57534e",
          g: 980,
          spin: rand(-18, 18),
          rot: rand(0, 5),
          bounce: 2,
        });
      }
      burstDust(def.x, def.y - def.h * 0.85, def.facing, true);
    }
  }

  function explodeFighter(f) {
    if (f.exploded) return;
    f.exploded = true;
    var i;
    for (i = 0; i < 42; i++) {
      particles.push({
        kind: "shard",
        x: f.x + rand(-40, 40),
        y: f.y - rand(10, f.h || 160),
        vx: rand(-280, 280),
        vy: rand(-520, -80),
        life: rand(0.9, 1.8),
        max: 1.8,
        size: rand(8, 22),
        color: i % 3 === 0 ? "#7c2d12" : "#57534e",
        g: 980,
        spin: rand(-12, 12),
        rot: rand(0, 4),
        bounce: 2,
      });
    }
    burstDust(f.x, f.y - (f.h || 120) * 0.5, f.facing || 1, true);
    burstDust(f.x, f.y - 20, f.facing || 1, true);
    spawnDebris(f, "torso", true);
    spawnDebris(f, "head", true);
    spawnDebris(f, "legs", true);
  }

  /* ---------- fighters ---------- */
  function maxHpOf(def) {
    return Math.round(82 + def.resistencia * 15);
  }
  function speedOf(def) {
    var s = 150 + def.velocidad * 26;
    if (def.isPlayer === false) s *= 0.3;
    return s;
  }
  function makeFighter(def, isPlayer) {
    const b = BODY[def.body] || BODY.tanque;
    const hp = maxHpOf(def);
    return {
      id: def.id,
      name: def.name,
      color: def.color,
      body: def.body,
      fuerza: def.fuerza,
      velocidad: def.velocidad,
      resistencia: def.resistencia,
      custom: !!def.custom,
      spriteImg: def.spriteImg || null,
      skelImg: def.skelImg || null,
      partHead: def.partHead || null,
      partTorso: def.partTorso || null,
      partThigh: def.partThigh || null,
      partFeet: def.partFeet || null,
      partBall: def.partBall || null,
      poseHigh: def.poseHigh || null,
      poseMid: def.poseMid || null,
      poseLow: def.poseLow || null,
      art: !!def.art,
      skipCut: !!def.skipCut,
      isPlayer,
      x: isPlayer ? 470 : 810,
      y: GROUND,
      vx: 0,
      vy: 0,
      facing: isPlayer ? 1 : -1,
      hp,
      maxHp: hp,
      state: "idle",
      stateT: 0,
      attack: null,
      blocking: false,
      onGround: true,
      hitFlash: 0,
      stunLeft: 0,
      invuln: 0,
      w: (def.w || b.w) * 2,
      h: (def.h || b.h) * 2,
      drawScale: def.art ? 1 : (540 / b.h),
      combo: 0,
      phase: Math.random() * 10,
      panels: { head: 0, torso: 0, armF: 0, armB: 0, legs: 0 },
      headLost: false,
      exploded: false,
      smoking: false,
      poseBlock: def.poseBlock || null,
    };
  }

  function canAct(f) {
    return f.state !== "hit" && f.state !== "stun" && f.state !== "ko" && f.state !== "punch" && f.state !== "kick";
  }

  function startAttack(f, kind) {
    if (!canAct(f) && !(f.state === "jump" || f.state === "walk" || f.state === "idle" || f.state === "block")) return;
    if (f.state === "punch" || f.state === "kick" || f.state === "hit" || f.state === "stun" || f.state === "ko") return;
    const sp = 1.3 - f.velocidad * 0.04;
    if (kind === "punch") {
      f.attack = { kind, height: arguments[2] || "mid", t: 0, wind: 0.09 * sp, active: 0.1, rec: 0.16 * sp, hit: false };
    } else {
      f.attack = { kind, height: "low", t: 0, wind: 0.14 * sp, active: 0.12, rec: 0.24 * sp, hit: false };
    }
    f.state = kind;
    f.stateT = 0;
    f.blocking = false;
    sfx.swing(kind);
  }

  function visH(f) {
    if (f.art) return (f.h || 160) * (f.drawScale || 1) * 1.55;
    var bd = BODY[f.body] || BODY.tanque;
    return bd.h * (f.drawScale || 1);
  }
  function visW(f) {
    if (f.art) return visH(f) * 0.52;
    var bd = BODY[f.body] || BODY.tanque;
    return bd.w * (f.drawScale || 1);
  }

  function rangeOf(f, kind) {
    let r = visW(f) * 0.58 + (kind === "kick" ? 36 : 22);
    if (f.id === "oxido") r += 48;
    return r;
  }

  function tryHit(atk, def) {
    if (!atk.attack || atk.attack.hit) return;
    const u = atk.attack.t;
    if (u < atk.attack.wind || u > atk.attack.wind + atk.attack.active) return;
    const kind = atk.attack.kind;
    const range = rangeOf(atk, kind);
    const dx = (def.x - atk.x) * atk.facing;
    const dy = Math.abs(atk.y - def.y);
    if (dx < 6 || dx > range + visW(def) * 0.22) return;
    if (dy > visH(atk) * 0.5) return;
    atk.attack.hit = true;
    applyHit(atk, def, kind);
  }

  let shake = 0;
  let camZ = 1.12;
  let camX = 0;
  let camY = 0;
  let hitStop = 0;
  let playerCombo = 0;
  let comboTimer = 0;

  function applyHit(atk, def, kind) {
    if (def.state === "ko") return;
    let dmg = kind === "punch" ? 11 + atk.fuerza * 1.85 : 16 + atk.fuerza * 2.35;
    if (atk.body === "tanque" && kind === "punch") dmg *= 1.24;
    if (atk.body === "agil") dmg *= 0.9;

    const blocking = def.blocking && def.state !== "hit" && def.state !== "stun" && def.state !== "ko" && def.state !== "punch" && def.state !== "kick";
    if (blocking) {
      dmg = 0;
      sfx.block();
      burst(def.x + def.facing * -18, def.y - def.h * 0.55, "#cbd5e1", 10, 200);
      def.vx = atk.facing * 40;
      shake = Math.max(shake, 4);
    } else {
      const heavy = kind === "kick" || atk.body === "pesado" || atk.body === "tanque";
      sfx.hit(heavy);
      def.state = "hit";
      def.stateT = 0;
      def.attack = null;
      def.blocking = false;
      def.hitFlash = 0.1;
      const kb = (kind === "kick" ? 1.15 : 1) * (260 + atk.fuerza * 36) * (atk.body === "pesado" ? 1.7 : 1);
      const resist = 1.12 - def.resistencia * 0.035;
      const comboBoost = atk.body === "pesado" && atk.combo >= 2 ? 1.4 : 1;
      def.vx = atk.facing * kb * resist * comboBoost;
      atk.combo = (atk.combo || 0) + 1;
      def.vy = -140 - (atk.body === "pesado" ? 90 : 40);
      def.onGround = false;
      shake = Math.max(shake, heavy ? 14 : 9);
      hitStop = heavy ? 0.055 : 0.035;
      burst(def.x, def.y - def.h * 0.5, atk.color, 14, 380);
      burst(def.x, def.y - def.h * 0.5, "#fff", 6, 260);
      smashPanel(def, (atk.attack && atk.attack.height === "high") ? "high" : kind);
      var hx = def.x + atk.facing * 36;
      var hy = def.y - def.h * (kind === "kick" || (atk.attack && atk.attack.height === "low") ? 0.12 : (atk.attack && atk.attack.height === "high" ? 0.88 : 0.5));
      burstDust(hx, hy, atk.facing, kind === "kick" || atk.id === "oxido");
      if (atk.id === "oxido") burstDust(hx + atk.facing * 24, hy, atk.facing, true);
      if (Math.random() < 0.2) {
        def.smoking = true;
        burstHeavySmoke(hx, hy, atk.facing);
      }

      if (atk.body === "rayo" && kind === "punch" && Math.random() < 0.34) {
        def.state = "stun";
        def.stunLeft = 0.72;
        sfx.stun();
        burst(def.x, def.y - def.h * 0.7, "#67e8f9", 16, 300);
      }

      if (atk.isPlayer) {
        if (comboTimer > 0) playerCombo += 1;
        else playerCombo = 1;
        comboTimer = 0.85;
        const el = $("combo");
        if (playerCombo >= 2) {
          el.textContent = "COMBO x" + playerCombo;
          el.classList.remove("hidden");
        }
      }
    }

    def.hp = Math.max(0, def.hp - dmg);
    if (def.hp <= 0) {
      def.hp = 0;
      def.state = "ko";
      def.stateT = 0;
      def.attack = null;
      def.vy = -320;
      def.vx = atk.facing * 280;
      def.onGround = false;
      sfx.ko();
      shake = 20;
      burst(def.x, def.y - 80, def.color, 28, 500);
      smashPanel(def, "punch");
      smashPanel(def, "kick");
      explodeFighter(def);
    }
  }

  function updateFighter(f, dt, input, other) {
    f.stateT += dt;
    if (f.hitFlash > 0) f.hitFlash -= dt;
    if (f.invuln > 0) f.invuln -= dt;
    if (f.stunLeft > 0) f.stunLeft -= dt;

    if (f.state !== "ko" && f.state !== "punch" && f.state !== "kick") {
      f.facing = other.x >= f.x ? 1 : -1;
    }

    if (f.state === "ko") {
      f.blocking = false;
      f.vy += 1850 * dt;
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      f.vx *= Math.pow(0.08, dt);
      if (f.y >= GROUND) {
        f.y = GROUND;
        f.vy = 0;
        f.vx *= 0.4;
        f.onGround = true;
      }
      f.x = clamp(f.x, 70, W - 70);
      return;
    }

    if (f.state === "stun") {
      if (f.stunLeft <= 0) {
        f.state = "idle";
        f.stateT = 0;
      }
      f.vx *= Math.pow(0.02, dt);
      f.vy += 1850 * dt;
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      if (f.y >= GROUND) {
        f.y = GROUND;
        f.vy = 0;
        f.onGround = true;
      }
      f.x = clamp(f.x, 70, W - 70);
      return;
    }

    if (f.state === "hit") {
      f.vy += 1850 * dt;
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      if (f.y >= GROUND) {
        f.y = GROUND;
        f.vy = 0;
        f.onGround = true;
        f.vx *= 0.5;
      }
      if (f.stateT > 0.28 + (10 - f.resistencia) * 0.012) {
        f.state = f.onGround ? "idle" : "jump";
        f.stateT = 0;
      }
      if (f.x < 70 || f.x > W - 70) {
        f.x = clamp(f.x, 70, W - 70);
        f.vx *= -0.3;
        shake = Math.max(shake, 8);
      }
      return;
    }

    if (f.state === "punch" || f.state === "kick") {
      f.attack.t += dt;
      tryHit(f, other);
      const tot = f.attack.wind + f.attack.active + f.attack.rec;
      if (f.attack.t >= tot) {
        if (!f.attack.hit) f.combo = 0;
        f.attack = null;
        f.state = f.onGround ? "idle" : "jump";
        f.stateT = 0;
      }
      f.vx *= Math.pow(0.15, dt);
      f.vy += 1850 * dt;
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      if (f.y >= GROUND) {
        f.y = GROUND;
        f.vy = 0;
        f.onGround = true;
      }
      f.x = clamp(f.x, 70, W - 70);
      return;
    }

    var goingBack = (f.facing === 1 && input.left && !input.right) || (f.facing === -1 && input.right && !input.left) || (!!input.block && f.onGround);
    var goingFwd = (f.facing === 1 && input.right && !input.left) || (f.facing === -1 && input.left && !input.right);
    var attacking = !!(input.punch || input.punchHigh || input.kick);
    if (goingBack && f.onGround && f.state !== "punch" && f.state !== "kick") {
      attacking = false;
      input.punch = input.punchHigh = input.kick = false;
      f.blocking = true;
      f.state = "block";
      var bspd = speedOf(f) * 0.72;
      f.vx = f.facing === 1 ? -bspd : bspd;
    } else {
      f.blocking = false;
      const spd = speedOf(f) * (f.onGround ? 1 : 0.55);
      if (input.left) f.vx = -spd;
      else if (input.right) f.vx = spd;
      else if (f.onGround) f.vx *= Math.pow(0.0008, dt);

      if (input.jump && f.onGround) {
        f.vy = -640 - f.velocidad * 10;
        f.onGround = false;
        f.state = "jump";
        sfx.jump();
        dust(f.x, GROUND);
      }
      if (input.punchHigh) startAttack(f, "punch", "high");
      else if (input.punch) startAttack(f, "punch", "mid");
      else if (input.kick) startAttack(f, "kick");
      else {
        if (!f.onGround) f.state = "jump";
        else if (goingFwd && Math.abs(f.vx) > 30) f.state = "walk";
        else if (Math.abs(f.vx) > 30) f.state = "walk";
        else f.state = "idle";
      }
    }

    f.vy += 1850 * dt;
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    if (f.y >= GROUND) {
      if (!f.onGround && f.vy > 200) {
        dust(f.x, GROUND);
        sfx.land();
      }
      f.y = GROUND;
      f.vy = 0;
      f.onGround = true;
    } else f.onGround = false;
    f.x = clamp(f.x, 70, W - 70);
  }

  function separate(a, b) {
    const overlap = (visW(a) * 0.2 + visW(b) * 0.2) - Math.abs(a.x - b.x);
    const yClose = Math.abs(a.y - b.y) < 140;
    if (overlap > 0 && yClose && a.state !== "ko" && b.state !== "ko") {
      const dir = a.x < b.x ? -1 : 1;
      a.x += dir * overlap * 0.5;
      b.x -= dir * overlap * 0.5;
      a.x = clamp(a.x, 70, W - 70);
      b.x = clamp(b.x, 70, W - 70);
    }
  }

  /* ---------- AI ---------- */
  function aiLevel() {
    return Math.min(1, (progress.wins || 0) / 10);
  }

  function makeAi(cpu) {
    var lv = aiLevel();
    return {
      t: 0,
      delay: 0.26 - lv * 0.18,
      intent: "approach",
      blockLeft: 0,
      think: 0,
      cool: 0.48 - lv * 0.28,
      lv: lv,
    };
  }

  function aiInput(ai, cpu, player, dt) {
    const input = { left: false, right: false, jump: false, punch: false, punchHigh: false, kick: false, block: false };
    if (cpu.state === "ko") return input;
    ai.t += dt;
    ai.think -= dt;
    if (ai.blockLeft > 0) ai.blockLeft -= dt;
    if (ai.cool > 0) ai.cool -= dt;

    const dist = player.x - cpu.x;
    const ad = Math.abs(dist);
    const towardLeft = dist < 0;
    const playerSwinging = player.state === "punch" || player.state === "kick";
    const playerActive = player.attack && player.attack.t >= player.attack.wind && player.attack.t < player.attack.wind + player.attack.active;
    const reach = rangeOf(cpu, "punch") + 28;

    if (ai.think <= 0) {
      ai.think = ai.delay;
      const r = Math.random();
      var lv = ai.lv || 0;
      if (playerSwinging && ad < reach && r < 0.18 + lv * 0.25) {
        ai.intent = "block";
        ai.blockLeft = rand(0.18, 0.32 + lv * 0.15);
      } else if (ad > reach + 20) {
        ai.intent = "approach";
      } else {
        ai.intent = "attack";
      }
    }

    if (ai.intent === "block" || ai.blockLeft > 0) {
      input.block = true;
      if (playerActive && ad < 140) input.block = true;
    } else if (ai.intent === "approach") {
      input.left = towardLeft;
      input.right = !towardLeft;
      if (cpu.body === "agil" && ad > 180 && Math.random() < 0.02) input.jump = true;
    } else if (ai.intent === "retreat") {
      input.left = !towardLeft;
      input.right = towardLeft;
    } else if (ai.intent === "jump") {
      input.jump = true;
      input.left = towardLeft;
      input.right = !towardLeft;
      ai.intent = "approach";
    } else if (ai.intent === "attack") {
      if (ad > reach) {
        input.left = towardLeft;
        input.right = !towardLeft;
      } else if (ai.cool <= 0 && (cpu.state === "idle" || cpu.state === "walk" || cpu.state === "jump" || cpu.state === "block")) {
        var roll = Math.random();
        if (roll < 0.28) input.punchHigh = true;
        else if (roll < 0.62) input.punch = true;
        else input.kick = true;
        ai.cool = 0.22 + Math.random() * 0.12;
      } else if (ad > 40) {
        input.left = towardLeft;
        input.right = !towardLeft;
      }
    }

    if (player.y < GROUND - 80 && ad < 140 && Math.random() < 0.015 + (ai.lv || 0) * 0.04) input.jump = true;
    if ((ai.lv || 0) > 0.4 && playerActive && ad < 160) input.block = true;
    return input;
  }

  /* ---------- arena draw ---------- */

  function coverPhoto(ctx, img) {
    if (!img || !img.complete || !img.naturalWidth) return false;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(W / iw, H / ih);
    const dw = iw * scale, dh = ih * scale;
    ctx.drawImage(img, (W - dw) / 2, H - dh, dw, dh);
    return true;
  }

  function floorStrip(ctx, top, mid, stripe) {
    const floor = ctx.createLinearGradient(0, GROUND, 0, H);
    floor.addColorStop(0, top);
    floor.addColorStop(1, mid);
    ctx.fillStyle = floor;
    ctx.fillRect(0, GROUND, W, H - GROUND);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, GROUND, W, 8);
    ctx.fillStyle = stripe;
    ctx.fillRect(0, GROUND, W, 4);
  }

  function drawArenaAzotea(ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#1b1140");
    sky.addColorStop(0.45, "#4c1d4e");
    sky.addColorStop(0.72, "#c45c2a");
    sky.addColorStop(1, "#1a1020");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,240,210,0.85)";
    ctx.beginPath(); ctx.arc(1040, 110, 42, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#4c1d4e";
    ctx.beginPath(); ctx.arc(1056, 100, 36, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#120818";
    ctx.beginPath(); ctx.moveTo(0, 430);
    const sil = [40, 280, 80, 340, 140, 300, 190, 380, 250, 260, 320, 350, 400, 240, 470, 330, 540, 290, 620, 370, 700, 250, 780, 320, 860, 280, 940, 360, 1020, 240, 1100, 330, 1180, 270, 1280, 340];
    for (let i = 0; i < sil.length; i += 2) ctx.lineTo(sil[i], sil[i + 1]);
    ctx.lineTo(W, 470); ctx.lineTo(0, 470); ctx.fill();
    for (const lx of [180, 640, 1100]) {
      const g = ctx.createRadialGradient(lx, 70, 10, lx, 200, 280);
      g.addColorStop(0, "rgba(255,220,140,0.18)");
      g.addColorStop(1, "rgba(255,220,140,0)");
      ctx.fillStyle = g;
      ctx.fillRect(lx - 280, 0, 560, 420);
      ctx.fillStyle = "#fde68a";
      rr(ctx, lx - 18, 24, 36, 14, 4); ctx.fill();
    }
    ctx.fillStyle = "#241018";
    ctx.fillRect(0, 430, W, GROUND - 430);
    floorStrip(ctx, "#3a2a28", "#10080c", "#f59e0b");
  }

  function drawArenaDesguace(ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#4a2a18");
    sky.addColorStop(0.5, "#8a4a22");
    sky.addColorStop(1, "#2a140c");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#3b2418";
    for (const pile of [[80, 480, 180, 140], [420, 500, 220, 120], [900, 470, 260, 150]]) {
      ctx.fillRect(pile[0], pile[1], pile[2], GROUND - pile[1]);
    }
    ctx.fillStyle = "#6b3a22";
    ctx.fillRect(200, 520, 90, GROUND - 520);
    ctx.fillRect(1040, 500, 70, GROUND - 500);
    ctx.fillStyle = "#1a0e08";
    ctx.fillRect(0, 400, W, 8);
    floorStrip(ctx, "#5a3a28", "#1a0e0a", "#fb923c");
  }

  function drawArenaFabrica(ctx) {
    ctx.fillStyle = "#0b1a14";
    ctx.fillRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, 0, 400);
    g.addColorStop(0, "#12352c");
    g.addColorStop(1, "#0b1a14");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, 400);
    ctx.fillStyle = "rgba(74,222,128,0.12)";
    for (const x of [160, 640, 1120]) {
      ctx.beginPath(); ctx.ellipse(x, 80, 80, 18, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = "#1e3a32";
    ctx.fillRect(0, 280, W, GROUND - 280);
    ctx.strokeStyle = "#4ade80";
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(0, 340); ctx.lineTo(W, 340); ctx.stroke();
    ctx.fillStyle = "#14532d";
    ctx.fillRect(60, 360, 40, GROUND - 360);
    ctx.fillRect(W - 100, 360, 40, GROUND - 360);
    floorStrip(ctx, "#14532d", "#052e16", "#4ade80");
  }

  function drawArenaDesierto(ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#7dd3fc");
    sky.addColorStop(0.45, "#fde68a");
    sky.addColorStop(1, "#b45309");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath(); ctx.arc(200, 140, 54, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#d97706";
    ctx.beginPath(); ctx.moveTo(0, 460); ctx.quadraticCurveTo(320, 380, 640, 470); ctx.quadraticCurveTo(960, 540, 1280, 430); ctx.lineTo(W, GROUND); ctx.lineTo(0, GROUND); ctx.fill();
    floorStrip(ctx, "#f59e0b", "#7c2d12", "#fde68a");
  }

  function drawArenaCancha(ctx) {
    if (!coverPhoto(ctx, IMAGES.cancha)) {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, W, H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.fillRect(0, GROUND, W, H - GROUND);
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, GROUND, W, 4);
  }

  function drawArenaHangar(ctx) {
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#1e293b";
    ctx.beginPath(); ctx.moveTo(40, GROUND); ctx.lineTo(80, 80); ctx.lineTo(W - 80, 80); ctx.lineTo(W - 40, GROUND); ctx.fill();
    ctx.fillStyle = "#334155";
    ctx.fillRect(80, 80, W - 160, 18);
    ctx.fillStyle = "rgba(56,189,248,0.15)";
    ctx.fillRect(200, 120, 180, 200);
    ctx.fillRect(900, 120, 180, 200);
    ctx.fillStyle = "#075985";
    ctx.fillRect(480, 300, 320, 80);
    floorStrip(ctx, "#334155", "#0f172a", "#38bdf8");
  }

  function drawArenaPuerto(ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#0b132b");
    sky.addColorStop(0.5, "#1d4e89");
    sky.addColorStop(1, "#0c4a6e");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#0369a1";
    ctx.fillRect(0, 420, W, GROUND - 420);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    for (let x = 0; x < W; x += 90) {
      ctx.fillRect(x, 430 + Math.sin(x) * 6, 50, 8);
    }
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 500, W, GROUND - 500);
    ctx.fillStyle = "#334155";
    ctx.fillRect(100, 360, 18, GROUND - 360);
    ctx.fillRect(W - 120, 340, 18, GROUND - 340);
    floorStrip(ctx, "#475569", "#0f172a", "#38bdf8");
  }

  function drawArenaConcierto(ctx) {
    if (!coverPhoto(ctx, IMAGES.concierto)) {
      ctx.fillStyle = "#0b1020";
      ctx.fillRect(0, 0, W, H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fillRect(0, GROUND, W, H - GROUND);
    ctx.fillStyle = "#f472b6";
    ctx.fillRect(0, GROUND, W, 4);
  }

  function drawArenaMetro(ctx) {
    if (!coverPhoto(ctx, IMAGES.metro)) {
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, 0, W, H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.32)";
    ctx.fillRect(0, GROUND, W, H - GROUND);
    ctx.fillStyle = "#a78bfa";
    ctx.fillRect(0, GROUND, W, 4);
  }

  function drawArenaTaller(ctx) {
    if (!coverPhoto(ctx, IMAGES.taller)) {
      ctx.fillStyle = "#1a1410";
      ctx.fillRect(0, 0, W, H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fillRect(0, GROUND, W, H - GROUND);
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(0, GROUND, W, 4);
  }

  function drawArena(ctx, t) {
    const id = currentArenaId || "azotea";
    if (id === "taller") drawArenaTaller(ctx);
    else if (id === "desguace") drawArenaDesguace(ctx);
    else if (id === "fabrica") drawArenaFabrica(ctx);
    else if (id === "desierto") drawArenaDesierto(ctx);
    else if (id === "cancha") drawArenaCancha(ctx);
    else if (id === "concierto") drawArenaConcierto(ctx);
    else if (id === "metro") drawArenaMetro(ctx);
    else if (id === "hangar") drawArenaHangar(ctx);
    else if (id === "puerto") drawArenaPuerto(ctx);
    else drawArenaAzotea(ctx);

    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.fillStyle = "#fde68a";
    ctx.font = "bold 20px Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    const arenaName = (ARENAS.find((a) => a.id === id) || { name: "Arena" }).name;
    ctx.fillText(arenaName.toUpperCase(), W / 2, GROUND - 12);
    ctx.restore();

    ctx.fillStyle = "#1e293b";
    ctx.fillRect(28, 360, 18, GROUND - 360);
    ctx.fillRect(W - 46, 360, 18, GROUND - 360);
    ctx.fillStyle = "#22d3ee";
    ctx.fillRect(28, 360, 18, 10);
    ctx.fillRect(W - 46, 360, 18, 10);
  }

  /* ---------- screens / app state ---------- */
  const keys = new Set();
  const keysPressed = new Set();
  let screen = "title";
  let selectedId = null;
  let selectedMapId = "taller";
  let currentArenaId = "taller";
  let playerDef = null;
  let cpuDef = null;
  let player = null;
  let cpu = null;
  let ai = null;
  let fightPhase = "idle"; // countdown, go, over
  let phaseT = 0;
  let winner = null;
  let time = 0;
  let lastTs = 0;
  let createStats = { fuerza: 6, velocidad: 6, resistencia: 6 };

  const arena = $("arena");
  const actx = arena.getContext("2d");
  const titleCanvas = $("title-bots");
  const tctx = titleCanvas.getContext("2d");
  const preview = $("create-preview");
  const pctx = preview.getContext("2d");

  function show(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.add("hidden"));
    $(id).classList.remove("hidden");
    screen = id.replace("screen-", "");
  }

  function catalog() {
    return PRESETS.concat(SHOP).map((p) => Object.assign({ custom: false }, p)).concat(
      loadCustoms().map((c) => Object.assign({ custom: true }, c))
    );
  }
  function isOwned(id) {
    if (String(id).indexOf("custom-") === 0) return true;
    return progress.owned.indexOf(id) >= 0;
  }
  function allRobots() {
    return catalog().filter((r) => isOwned(r.id));
  }
  function refreshGold() {
    document.querySelectorAll(".gold-amount").forEach((el) => {
      el.textContent = String(progress.gold);
    });
  }

  function drawCardBot(canvas, def) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w / 2, h * 0.75, 10, w / 2, h * 0.7, 90);
    g.addColorStop(0, "#2a3a68");
    g.addColorStop(1, "#0b1020");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    if (def.thumbImg && def.thumbImg.complete && def.thumbImg.naturalWidth) {
      const cut = cutOutBg(def.thumbImg);
      const iw = cut.naturalWidth || cut.width, ih = cut.naturalHeight || cut.height;
      const scale = Math.max(w / iw, h / ih);
      ctx.drawImage(cut, (w - iw * scale) / 2, (h - ih * scale) / 2, iw * scale, ih * scale);
      return;
    }
    const fake = {
      x: w / 2,
      y: h - 18,
      facing: 1,
      color: def.color,
      body: def.body,
      state: "idle",
      stateT: 0,
      velocidad: def.velocidad,
      drawScale: 0.72,
      phase: def.name.length,
      spriteImg: def.spriteImg || null,
      id: def.id,
      skipCut: !!def.skipCut,
      h: def.h,
      w: def.w,
    };
    drawRobot(ctx, fake, time);
  }

  function renderSelect() {
    const grid = $("robot-grid");
    grid.innerHTML = "";
    const list = allRobots();
    list.forEach((def) => {
      const card = document.createElement("article");
      card.className = "card" + (selectedId === def.id ? " selected" : "");
      card.tabIndex = 0;
      const cnv = document.createElement("canvas");
      cnv.width = 260;
      cnv.height = 180;
      drawCardBot(cnv, def);
      const h3 = document.createElement("h3");
      h3.textContent = def.name;
      const role = document.createElement("p");
      role.className = "role";
      role.textContent = def.role || "Robot personalizado";
      const stats = document.createElement("div");
      stats.className = "stats-mini";
      stats.innerHTML =
        "<span>Fza " + def.fuerza + "</span><span>Vel " + def.velocidad + "</span><span>Res " + def.resistencia + "</span>";
      card.appendChild(cnv);
      if (def.custom) {
        const badge = document.createElement("span");
        badge.className = "badge-custom";
        badge.textContent = "Tuyo";
        card.appendChild(badge);
        const del = document.createElement("button");
        del.className = "del";
        del.type = "button";
        del.textContent = "×";
        del.title = "Borrar";
        del.addEventListener("click", (e) => {
          e.stopPropagation();
          const next = loadCustoms().filter((x) => x.id !== def.id);
          saveCustoms(next);
          if (selectedId === def.id) {
            selectedId = null;
            $("btn-fight").disabled = true;
          }
          sfx.click();
          renderSelect();
        });
        card.appendChild(del);
      }
      card.appendChild(h3);
      card.appendChild(role);
      card.appendChild(stats);
      card.addEventListener("click", () => {
        selectedId = def.id;
        playerDef = def;
        sfx.click();
        $("btn-fight").disabled = false;
        renderSelect();
      });
      grid.appendChild(card);
    });
  }

  function setStat(which, value) {
    const s = createStats;
    s[which] = clamp(value | 0, MIN_STAT, MAX_STAT);
    let extra = s.fuerza + s.velocidad + s.resistencia - MAX_POINTS;
    if (extra > 0) {
      const others = ["fuerza", "velocidad", "resistencia"].filter((k) => k !== which);
      others.sort((a, b) => s[b] - s[a]);
      for (const k of others) {
        const take = Math.min(s[k] - MIN_STAT, extra);
        s[k] -= take;
        extra -= take;
      }
    }
    $("in-fuerza").value = s.fuerza;
    $("in-velocidad").value = s.velocidad;
    $("in-resistencia").value = s.resistencia;
    $("val-fuerza").textContent = s.fuerza;
    $("val-velocidad").textContent = s.velocidad;
    $("val-resistencia").textContent = s.resistencia;
    const used = s.fuerza + s.velocidad + s.resistencia;
    $("points-label").textContent = "Puntos: " + used + " / " + MAX_POINTS + " · no puedes maximizar las tres";
  }

  function currentCreateDef() {
    return {
      name: $("in-name").value.trim() || "Sin nombre",
      color: $("in-color").value,
      body: (document.querySelector('input[name="body"]:checked') || {}).value || "tanque",
      fuerza: createStats.fuerza,
      velocidad: createStats.velocidad,
      resistencia: createStats.resistencia,
    };
  }

  function drawPreview() {
    const ctx = pctx;
    const w = preview.width;
    const h = preview.height;
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#1b1140");
    g.addColorStop(1, "#0b1020");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, h - 48, w, 48);
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(0, h - 48, w, 4);
    const def = currentCreateDef();
    const fake = {
      x: w / 2,
      y: h - 52,
      facing: 1,
      color: def.color,
      body: def.body,
      state: "idle",
      stateT: 0,
      velocidad: def.velocidad,
      drawScale: 1.15,
    };
    drawRobot(ctx, fake, time);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 22px Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(def.name, w / 2, 36);
  }

  function pickCpu(forPlayer) {
    const pool = catalog().filter((p) => !p.custom && p.id !== forPlayer.id);
    const src = pool.length ? pool : catalog();
    const p = pick(src);
    return Object.assign({}, p);
  }

  function resolveArena() {
    if (selectedMapId === "random") return pick(ARENAS).id;
    return selectedMapId || "taller";
  }

  function paintMapThumb(canvas, arena) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    if (arena.photo) {
      const img = IMAGES[arena.id];
      if (img && img.complete && img.naturalWidth) {
        const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        ctx.drawImage(img, (w - img.naturalWidth * scale) / 2, (h - img.naturalHeight * scale) / 2, img.naturalWidth * scale, img.naturalHeight * scale);
        return;
      }
    }
    const palettes = {
      desguace: ["#8a4a22", "#4a2a18"],
      fabrica: ["#14532d", "#0b1a14"],
      azotea: ["#4c1d4e", "#1b1140"],
      desierto: ["#f59e0b", "#7dd3fc"],
      hangar: ["#1e293b", "#0f172a"],
      puerto: ["#1d4e89", "#0b132b"],
      random: ["#f59e0b", "#7c3aed"],
    };
    const cols = palettes[arena.id] || ["#334", "#111"];
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, cols[1]);
    g.addColorStop(1, cols[0]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    if (arena.id === "random") {
      ctx.fillStyle = "#ffe08a";
      ctx.font = "bold 42px Impact, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("?", w / 2, h / 2 + 16);
    }
  }

  function renderMaps() {
    const grid = $("map-grid");
    grid.innerHTML = "";
    const items = [{ id: "random", name: "Aleatorio", random: true }].concat(ARENAS);
    items.forEach((arena) => {
      const card = document.createElement("article");
      card.className = "map-card" + (arena.random ? " random" : "") + (selectedMapId === arena.id ? " selected" : "");
      const cnv = document.createElement("canvas");
      cnv.className = "map-thumb-canvas";
      cnv.width = 320;
      cnv.height = 140;
      paintMapThumb(cnv, arena);
      const h3 = document.createElement("h3");
      h3.textContent = arena.name;
      card.appendChild(cnv);
      card.appendChild(h3);
      card.addEventListener("click", () => {
        selectedMapId = arena.id;
        sfx.click();
        $("btn-maps-fight").disabled = false;
        renderMaps();
      });
      grid.appendChild(card);
    });
    $("btn-maps-fight").disabled = !selectedMapId;
  }

  function renderShop() {
    const grid = $("shop-grid");
    grid.innerHTML = "";
    refreshGold();
    SHOP.forEach((def) => {
      const owned = isOwned(def.id);
      const card = document.createElement("article");
      card.className = "card" + (owned ? "" : " locked");
      const cnv = document.createElement("canvas");
      cnv.width = 260;
      cnv.height = 180;
      drawCardBot(cnv, def);
      const h3 = document.createElement("h3");
      h3.textContent = def.name;
      const role = document.createElement("p");
      role.className = "role";
      role.textContent = def.role;
      const stats = document.createElement("div");
      stats.className = "stats-mini";
      stats.innerHTML =
        "<span>Fza " + def.fuerza + "</span><span>Vel " + def.velocidad + "</span><span>Res " + def.resistencia + "</span>";
      card.appendChild(cnv);
      if (def.art) {
        const badge = document.createElement("span");
        badge.className = "badge-art";
        badge.textContent = "Arte";
        card.appendChild(badge);
      }
      if (owned) {
        const badge = document.createElement("span");
        badge.className = "badge-owned";
        badge.textContent = "Tuyo";
        card.appendChild(badge);
      }
      card.appendChild(h3);
      card.appendChild(role);
      card.appendChild(stats);
      const price = document.createElement("p");
      price.className = "price-tag";
      price.textContent = owned ? "Comprado" : (def.price + " oro");
      card.appendChild(price);
      if (!owned) {
        const buy = document.createElement("button");
        buy.className = "btn btn-buy";
        buy.type = "button";
        buy.textContent = progress.gold >= def.price ? "Comprar" : "Te falta oro";
        buy.disabled = progress.gold < def.price;
        buy.addEventListener("click", (e) => {
          e.stopPropagation();
          if (progress.gold < def.price) return;
          progress.gold -= def.price;
          progress.owned.push(def.id);
          saveProgress();
          sfx.win();
          refreshGold();
          renderShop();
        });
        card.appendChild(buy);
      }
      grid.appendChild(card);
    });
  }

  function startFight(rematch) {
    if (!rematch) {
      cpuDef = pickCpu(playerDef);
      currentArenaId = resolveArena();
    }
    player = makeFighter(playerDef, true);
    cpu = makeFighter(cpuDef, false);
    var boost = Math.min(8, progress.wins || 0);
    cpu.fuerza = Math.min(12, cpu.fuerza + Math.floor(boost * 0.35));
    cpu.resistencia = Math.min(12, cpu.resistencia + Math.floor(boost * 0.25));
    cpu.maxHp = Math.round(cpu.maxHp * (1 + boost * 0.06));
    cpu.hp = cpu.maxHp;
    ai = makeAi(cpu);
    particles.length = 0;
    shake = 0;
    hitStop = 0;
    playerCombo = 0;
    comboTimer = 0;
    winner = null;
    fightPhase = "countdown";
    phaseT = 0;
    $("combo").classList.add("hidden");
    $("result").classList.add("hidden");
    $("p-name").textContent = player.name;
    $("c-name").textContent = cpu.name;
    $("p-tag").textContent = "Isaías";
    $("c-tag").textContent = "CPU · " + cpu.name;
    updateHpBars();
    show("screen-fight");
    $("countdown").classList.remove("hidden");
    $("countdown").textContent = "3";
  }

  function updateHpBars() {
    if (!player || !cpu) return;
    $("p-hp").style.transform = "scaleX(" + player.hp / player.maxHp + ")";
    $("c-hp").style.transform = "scaleX(" + cpu.hp / cpu.maxHp + ")";
  }

  function playerInput() {
    const left = keys.has("a") || keys.has("arrowleft");
    const right = keys.has("d") || keys.has("arrowright");
    return {
      left,
      right,
      jump: keysPressed.has("w") || keysPressed.has("arrowup") || keysPressed.has(" "),
      punch: keysPressed.has("j"),
      punchHigh: keysPressed.has("u"),
      kick: keysPressed.has("k"),
      block: keys.has("l"),
    };
  }

  function endFight() {
    fightPhase = "over";
    const pAlive = player.hp > 0;
    const cAlive = cpu.hp > 0;
    $("countdown").classList.add("hidden");
    $("result").classList.remove("hidden");
    const goldEl = $("result-gold");
    if (pAlive && !cAlive) {
      winner = "player";
      progress.gold += GOLD_WIN;
      progress.wins = (progress.wins || 0) + 1;
      saveProgress();
      refreshGold();
      $("result-title").textContent = "¡Ganaste, Isaías!";
      $("result-sub").textContent = cpu.name + " queda fuera de combate. CPU nivel " + (progress.wins + 1) + ".";
      goldEl.textContent = "+" + GOLD_WIN + " oro";
      sfx.win();
    } else if (!pAlive && !cAlive) {
      winner = "draw";
      $("result-title").textContent = "¡Empate!";
      $("result-sub").textContent = "Los dos robots cayeron al mismo tiempo.";
      goldEl.textContent = "Sin oro esta ronda";
      sfx.ko();
    } else {
      winner = "cpu";
      $("result-title").textContent = "¡Derrota!";
      $("result-sub").textContent = cpu.name + " ganó esta ronda. ¡Inténtalo otra vez!";
      goldEl.textContent = "Sin oro esta ronda";
      sfx.lose();
    }
  }

  function updateFight(dt) {
    if (fightPhase === "over") {
      updateFighter(player, dt, { left: false, right: false, jump: false, punch: false, kick: false, block: false }, cpu);
      updateFighter(cpu, dt, { left: false, right: false, jump: false, punch: false, kick: false, block: false }, player);
      separate(player, cpu);
      leakSmoke(player);
      leakSmoke(cpu);
      updateParticles(dt);
      return;
    }

    if (fightPhase === "countdown") {
      phaseT += dt;
      const n = 3 - Math.floor(phaseT);
      const el = $("countdown");
      el.classList.remove("hidden");
      if (n > 0) el.textContent = String(n);
      else if (phaseT < 3.7) el.textContent = "¡PELEA!";
      else {
        el.classList.add("hidden");
        fightPhase = "go";
        sfx.pelea();
      }
      if (player.state === "idle") player.stateT += dt;
      if (cpu.state === "idle") cpu.stateT += dt;
      leakSmoke(player);
      leakSmoke(cpu);
      updateParticles(dt);
      return;
    }

    if (hitStop > 0) {
      hitStop -= dt;
      return;
    }

    if (comboTimer > 0) {
      comboTimer -= dt;
      if (comboTimer <= 0) {
        playerCombo = 0;
        $("combo").classList.add("hidden");
      }
    }

    const pin = playerInput();
    const cin = aiInput(ai, cpu, player, dt);
    updateFighter(player, dt, pin, cpu);
    updateFighter(cpu, dt, cin, player);
    separate(player, cpu);
    leakSmoke(player);
    leakSmoke(cpu);
    updateParticles(dt);
    updateHpBars();
    shake = Math.max(0, shake - dt * 36);

    if ((player.hp <= 0 || cpu.hp <= 0) && fightPhase === "go") {
      fightPhase = "koWait";
      phaseT = 0;
    }
    if (fightPhase === "koWait") {
      phaseT += dt;
      const el = $("countdown");
      el.classList.remove("hidden");
      el.textContent = "¡KO!";
      if (phaseT > 1.35) endFight();
    }
  }

  function drawFight() {
    const ctx = actx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (!player || !cpu) return;
    var mid = (player.x + cpu.x) / 2;
    var dist = Math.abs(player.x - cpu.x);
    function botH(f) {
      return (f.h || 160) * (f.drawScale || 1) * (f.art ? 1.55 : 1.2) + 24;
    }
    var tall = Math.max(botH(player), botH(cpu));
    var needH = tall + 110;
    var wantZ = Math.min(1.22, H / needH);
    var pad = 160;
    var span = dist + pad * 2;
    if (span > W / wantZ) wantZ = W / span;
    wantZ = Math.max(1.0, Math.min(1.22, wantZ));
    camZ += (wantZ - camZ) * 0.18;
    var vw = W / camZ;
    var vh = H / camZ;
    var tx = mid - vw / 2;
    tx = Math.max(0, Math.min(W - vw, tx));
    var ty = GROUND - tall - 50;
    ty = Math.max(0, Math.min(Math.max(0, GROUND + 80 - vh), ty));
    if (ty + vh < GROUND + 40) ty = GROUND + 40 - vh;
    ty = Math.max(0, ty);
    camX += (tx - camX) * 0.16;
    camY += (ty - camY) * 0.16;
    ctx.save();
    if (shake > 0) {
      ctx.translate((Math.random() - 0.5) * shake * 2, (Math.random() - 0.5) * shake * 2);
    }
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.clip();
    ctx.scale(camZ, camZ);
    ctx.translate(-camX, -camY);
    drawArena(ctx, time);
    drawParticles(ctx);
    const order = [player, cpu];
    order.sort((a, b) => a.y - b.y);
    for (const f of order) drawRobot(ctx, f, time);
    ctx.restore();
  }

  function drawTitleBots() {
    const ctx = tctx;
    const w = titleCanvas.width;
    const h = titleCanvas.height;
    ctx.clearRect(0, 0, w, h);
    const a = {
      x: w * 0.32,
      y: h - 18,
      facing: 1,
      color: "#6f8fa8",
      body: "tanque",
      state: (Math.sin(time * 1.4) > 0.2 ? "punch" : "idle"),
      stateT: time,
      attack: { kind: "punch", t: (time * 1.2) % 0.4, wind: 0.1, active: 0.12, rec: 0.16, hit: false },
      velocidad: 3,
      drawScale: 1.05,
    };
    const b = {
      x: w * 0.68,
      y: h - 18,
      facing: -1,
      color: "#ffd000",
      body: "agil",
      state: (Math.sin(time * 1.4 + 1) > 0.15 ? "kick" : "idle"),
      stateT: time,
      attack: { kind: "kick", t: (time * 1.1 + 0.2) % 0.5, wind: 0.12, active: 0.12, rec: 0.2, hit: false },
      velocidad: 10,
      drawScale: 1.05,
    };
    drawRobot(ctx, a, time);
    drawRobot(ctx, b, time);
  }

  function loop(ts) {
    const t = ts / 1000;
    let dt = lastTs ? t - lastTs : 0;
    lastTs = t;
    dt = Math.min(dt, 0.033);
    time = t;

    if (screen === "title") drawTitleBots();
    if (screen === "create") drawPreview();
    if (screen === "fight") {
      updateFight(dt);
      drawFight();
    }

    keysPressed.clear();
    requestAnimationFrame(loop);
  }

  /* ---------- events ---------- */
  window.addEventListener("keydown", (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();
    const mapSpace = e.key === " " ? " " : k;
    const tracked = ["a", "d", "w", "s", "j", "k", "l", "u", "arrowleft", "arrowright", "arrowup", "arrowdown", " "];
    if (tracked.indexOf(mapSpace) >= 0) {
      if (screen === "fight") e.preventDefault();
      if (!keys.has(mapSpace)) keysPressed.add(mapSpace);
      keys.add(mapSpace);
    }
    if (e.key === "Enter" && screen === "title") $("btn-jugar").click();
  });
  window.addEventListener("keyup", (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();
    keys.delete(e.key === " " ? " " : k);
  });
  window.addEventListener("blur", () => keys.clear());

  $("btn-jugar").addEventListener("click", () => {
    ac();
    sfx.click();
    goFullscreen();
    refreshGold();
    show("screen-hub");
  });
  $("btn-hub-back").addEventListener("click", () => {
    sfx.click();
    show("screen-title");
  });
  $("btn-hub-fight").addEventListener("click", () => {
    sfx.click();
    selectedId = null;
    $("btn-fight").disabled = true;
    refreshGold();
    show("screen-select");
    renderSelect();
  });
  $("btn-hub-shop").addEventListener("click", () => {
    sfx.click();
    show("screen-shop");
    renderShop();
  });
  $("btn-hub-create").addEventListener("click", () => {
    sfx.click();
    show("screen-create");
    setStat("fuerza", createStats.fuerza);
  });
  $("btn-select-back").addEventListener("click", () => {
    sfx.click();
    refreshGold();
    show("screen-hub");
  });
  $("btn-goto-create").addEventListener("click", () => {
    sfx.click();
    show("screen-create");
    setStat("fuerza", createStats.fuerza);
  });
  $("btn-create-back").addEventListener("click", () => {
    sfx.click();
    show("screen-select");
    renderSelect();
  });
  $("btn-maps-back").addEventListener("click", () => {
    sfx.click();
    show("screen-select");
    renderSelect();
  });
  $("btn-maps-fight").addEventListener("click", () => {
    if (!playerDef || !selectedMapId) return;
    ac();
    sfx.click();
    goFullscreen();
    startFight(false);
  });
  $("btn-shop-back").addEventListener("click", () => {
    sfx.click();
    refreshGold();
    show("screen-hub");
  });
  $("btn-result-shop").addEventListener("click", () => {
    sfx.click();
    show("screen-shop");
    renderShop();
  });
  $("in-fuerza").addEventListener("input", (e) => setStat("fuerza", e.target.value));
  $("in-velocidad").addEventListener("input", (e) => setStat("velocidad", e.target.value));
  $("in-resistencia").addEventListener("input", (e) => setStat("resistencia", e.target.value));
  ["in-name", "in-color"].forEach((id) => $(id).addEventListener("input", drawPreview));
  document.querySelectorAll('input[name="body"]').forEach((r) => r.addEventListener("change", drawPreview));

  $("create-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("in-name").value.trim();
    if (!name) {
      $("in-name").focus();
      return;
    }
    const customs = loadCustoms();
    const robot = {
      id: "custom-" + Date.now(),
      name: name.slice(0, 16),
      color: $("in-color").value,
      body: (document.querySelector('input[name="body"]:checked') || {}).value || "tanque",
      fuerza: createStats.fuerza,
      velocidad: createStats.velocidad,
      resistencia: createStats.resistencia,
      role: "Creado por Isaías",
      custom: true,
    };
    customs.push(robot);
    saveCustoms(customs);
    selectedId = robot.id;
    playerDef = robot;
    sfx.click();
    show("screen-select");
    $("btn-fight").disabled = false;
    renderSelect();
  });

  $("btn-fight").addEventListener("click", () => {
    if (!playerDef) return;
    sfx.click();
    refreshGold();
    show("screen-maps");
    renderMaps();
  });
  $("btn-rematch").addEventListener("click", () => {
    sfx.click();
    startFight(true);
  });
  $("btn-change").addEventListener("click", () => {
    sfx.click();
    refreshGold();
    show("screen-select");
    renderSelect();
  });
  $("btn-mute").addEventListener("click", () => {
    muted = !muted;
    try { localStorage.setItem(MUTE_KEY, muted ? "1" : "0"); } catch (e) {}
    $("btn-mute").textContent = muted ? "🔇 Silencio" : "🔊 Sonido";
  });
  $("btn-mute").textContent = muted ? "🔇 Silencio" : "🔊 Sonido";

  (function setupFightTouch() {
    var wrap = document.querySelector(".arena-wrap");
    if (!wrap || $("touch-fight")) return;
    var layer = document.createElement("div");
    layer.id = "touch-fight";
    layer.innerHTML = '<div id="stick-zone"></div><div id="atk-zone"><div data-atk="high"></div><div data-atk="mid"></div><div data-atk="kick"></div></div>';
    wrap.appendChild(layer);

    var stickPid = null;
    var originX = 0;
    function clearStick() {
      keys.delete("a");
      keys.delete("d");
      stickPid = null;
    }
    function applyStick(x) {
      keys.delete("a");
      keys.delete("d");
      if (x < originX - 18) keys.add("a");
      else if (x > originX + 18) keys.add("d");
    }
    var stick = $("stick-zone");
    stick.addEventListener("pointerdown", function (ev) {
      if (screen !== "fight") return;
      ev.preventDefault();
      stickPid = ev.pointerId;
      originX = ev.clientX;
      try { stick.setPointerCapture(ev.pointerId); } catch (e) {}
      applyStick(ev.clientX);
    });
    stick.addEventListener("pointermove", function (ev) {
      if (ev.pointerId !== stickPid) return;
      ev.preventDefault();
      applyStick(ev.clientX);
    });
    stick.addEventListener("pointerup", function (ev) {
      if (ev.pointerId !== stickPid) return;
      ev.preventDefault();
      clearStick();
    });
    stick.addEventListener("pointercancel", clearStick);
    stick.addEventListener("lostpointercapture", function (ev) {
      if (ev.pointerId === stickPid) clearStick();
    });

    var atkMap = { high: "u", mid: "j", kick: "k" };
    $("atk-zone").querySelectorAll("[data-atk]").forEach(function (zone) {
      var key = atkMap[zone.getAttribute("data-atk")];
      zone.addEventListener("pointerdown", function (ev) {
        if (screen !== "fight") return;
        ev.preventDefault();
        try { zone.setPointerCapture(ev.pointerId); } catch (e) {}
        keys.add(key);
        keysPressed.add(key);
        zone.classList.add("held");
      });
      function up(ev) {
        ev.preventDefault();
        keys.delete(key);
        zone.classList.remove("held");
      }
      zone.addEventListener("pointerup", up);
      zone.addEventListener("pointercancel", up);
      zone.addEventListener("lostpointercapture", up);
    });

    document.addEventListener("touchmove", function (e) {
      if (screen === "fight") e.preventDefault();
    }, { passive: false });
  })();

  Object.values(IMAGES).forEach((im) => {
    im.addEventListener("load", () => {
      if (screen === "select") renderSelect();
      if (screen === "shop") renderShop();
      if (screen === "maps") renderMaps();
    });
  });

  function goFullscreen() {
    var el = document.documentElement;
    var req = el.requestFullscreen || el.webkitRequestFullscreen || el.webkitRequestFullScreen;
    if (req) {
      try { req.call(el); } catch (e) {}
    }
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch(function () {});
    }
  }

  function fitApp() {
    var vv = window.visualViewport;
    var h = (vv && vv.height) ? vv.height : window.innerHeight;
    var w = (vv && vv.width) ? vv.width : window.innerWidth;
    document.documentElement.style.setProperty("--app-h", h + "px");
    document.documentElement.style.setProperty("--app-w", w + "px");
  }
  fitApp();
  window.addEventListener("resize", fitApp);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", fitApp);
    window.visualViewport.addEventListener("scroll", fitApp);
  }

  var btnFull = $("btn-full");
  if (btnFull) {
    btnFull.addEventListener("click", function () {
      goFullscreen();
      sfx.click();
    });
  }
  var btnFullFight = $("btn-full-fight");
  if (btnFullFight) {
    btnFullFight.addEventListener("click", function () {
      goFullscreen();
      sfx.click();
    });
  }

  // boot
  refreshGold();
  show("screen-title");
  requestAnimationFrame(loop);
})();
