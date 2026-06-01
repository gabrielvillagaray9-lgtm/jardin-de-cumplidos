const SUPABASE_TABLE = "tabla_flores";
const MAX_RENDERED_FLOWERS = 650;
const LOCAL_FLOWERS_KEY = "jardin-cumplidos-flores";
const RECENT_MESSAGES_KEY = "jardin-cumplidos-mensajes";

const compliments = [
  "Espero que hoy te pase algo bonito.",
  "Tu sonrisa puede alegrar un día entero.",
  "Gracias por visitar este jardín.",
  "Mereces cosas buenas.",
  "Hay algo especial en ti.",
  "Tu presencia hace este lugar más bonito.",
  "Ojalá hoy encuentres una razón pequeña para sonreír.",
  "Eres más fuerte de lo que imaginas.",
  "Hay luz en la forma en que sigues adelante.",
  "Este jardín acaba de ponerse más alegre contigo.",
  "Que algo tierno te encuentre hoy.",
  "Tu forma de ser también es un regalo.",
  "No olvides tratarte con la misma dulzura que das.",
  "Hay días que mejoran solo porque existes.",
  "Tu corazón merece descanso y cosas bonitas.",
  "Lo estás haciendo mejor de lo que crees.",
  "Tu calma también puede florecer.",
  "Hoy puedes empezar de nuevo, suave y despacio.",
  "Eres una chispa bonita en el mundo.",
  "Que la vida te devuelva un poco de todo lo bueno que das.",
  "Tu ternura tiene un brillo propio.",
  "Hay magia en las personas que cuidan.",
  "Mereces una alegría inesperada.",
  "Tu risa tiene lugar reservado en este jardín.",
  "Qué bonito que hayas llegado hasta aquí.",
  "La flor eligió decirte que eres suficiente.",
  "Tu sensibilidad es una forma de belleza.",
  "Que hoy te hablen con cariño.",
  "Hay algo valiente en seguir intentándolo.",
  "Eres una persona digna de cosas suaves.",
  "Tu mirada puede encontrar belleza donde otros pasan de largo.",
  "Este momento también cuenta como cuidado.",
  "Que encuentres paz en algo sencillo.",
  "El mundo necesita más personas con tu luz.",
  "No tienes que correr para merecer flores.",
  "Tu existencia ya suma algo hermoso.",
  "Que hoy tengas un descanso bonito.",
  "Hay una versión de ti que estaría orgullosa de este paso.",
  "Eres casa para más ternura de la que crees.",
  "Tu manera de sentir importa.",
  "La alegría también puede llegar en silencio.",
  "Gracias por plantar un poquito de belleza.",
  "Tu energía deja huella amable.",
  "Que el día te trate con delicadeza.",
  "Hay flores que crecen despacio y siguen siendo preciosas.",
  "Tú también mereces paciencia.",
  "Tu corazón no tiene que hacerlo todo solo.",
  "Qué bonito que sigas buscando luz.",
  "Este jardín te guarda un lugar.",
  "Tu bondad no pasa desapercibida.",
  "Ojalá algo te recuerde lo querido que puedes ser.",
  "Tu forma de mirar el mundo tiene encanto.",
  "Respira: por ahora, estar aquí basta.",
  "Hay belleza en tu manera de continuar.",
  "Mereces mensajes que lleguen como abrazos.",
  "Que una buena noticia te encuentre pronto.",
  "Eres una historia llena de detalles bonitos.",
  "Tu dulzura también es fuerza.",
  "Hoy no necesitas ser perfecto para ser valioso.",
  "La vida puede sorprenderte con una flor nueva.",
  "Hay algo luminoso esperando en tu día.",
  "Tu presencia deja el aire más amable.",
  "Que tengas motivos para sentir ilusión.",
  "Eres importante incluso cuando estás cansado.",
  "Lo pequeño que haces con amor también cuenta.",
  "Tu luz no necesita permiso.",
  "Que hoy te mires con más cariño.",
  "Hay magia en no rendirse del todo.",
  "Tu corazón sabe florecer después de la lluvia.",
  "El mundo es un poco más bonito contigo dentro.",
  "Mereces suavidad, risa y calma.",
  "Gracias por regalarle una flor al jardín.",
  "Tu manera de cuidar puede cambiar días enteros.",
  "Que te llegue una alegría de esas que se quedan.",
  "Eres más que tus días difíciles.",
  "Tu ternura merece ser celebrada.",
  "Algo bonito puede empezar en un gesto pequeño.",
  "La flor dice que hoy también puedes descansar.",
  "Tu existencia no tiene que justificarse.",
  "Que esta visita te deje una chispa de calma.",
  "Hay belleza en cada paso honesto que das.",
  "Eres una persona capaz de crear luz.",
  "Tu sensibilidad es una brújula preciosa.",
  "Que te pase algo que te haga decir: qué bien.",
  "Este jardín crece porque personas como tú aparecen.",
  "Tu alegría merece espacio.",
  "No estás llegando tarde a tu propia vida.",
  "Que hoy el mundo te sea un poquito más amable.",
  "Tu forma de estar aquí ya es suficiente.",
  "Hay flores que solo se abren cuando se sienten seguras.",
  "Tú también puedes ir a tu ritmo.",
  "Tu corazón tiene colores que nadie más repite.",
  "Que una canción, una luz o una palabra te abracen.",
  "Eres una coincidencia bonita en este jardín.",
  "La calma también puede ser una victoria.",
  "Tu vida merece momentos dulces.",
  "Hay cariño creciendo cerca de ti.",
  "Que hoy recuerdes algo bueno de ti.",
  "Tu manera de soñar tiene valor.",
  "Eres una flor distinta, y eso es precioso.",
  "Gracias por hacer crecer este pequeño mundo.",
  "Que te acompañe una sensación de esperanza.",
  "Lo que eres ya tiene belleza.",
  "Tu risa puede encender luciérnagas.",
  "Hay un lugar para ti en las cosas buenas.",
  "Que el día te regale una sorpresa suave.",
  "Tu corazón merece buenas noticias.",
  "Eres capaz de florecer de nuevo.",
  "Este jardín acaba de aprender tu color.",
  "Que lo bonito también se quede contigo.",
  "Tu presencia tiene una magia tranquila.",
  "Mereces amor sin tener que ganártelo.",
  "Que hoy encuentres una flor donde esperabas prisa.",
  "Hay algo precioso en tu forma de seguir."
];

const colors = ["#ff77c8", "#ff9fe5", "#ffcf5d", "#b66cff", "#7ce6a8", "#ff8f6b", "#8fd7ff", "#f66fa8"];
const flowerTypes = ["daisy", "bell", "star"];

const state = {
  supabase: null,
  flowers: [],
  total: 0,
  canPlant: true,
  lastMessage: "",
  audio: null,
  soundOn: false
};

const els = {
  canvas: document.querySelector("#magicCanvas"),
  flower: document.querySelector("#mainFlower"),
  field: document.querySelector("#plantedField"),
  count: document.querySelector("#flowerCount"),
  message: document.querySelector("#complimentText"),
  messageCard: document.querySelector("#messageCard"),
  sound: document.querySelector("#soundToggle")
};

const canvasContext = els.canvas.getContext("2d", { alpha: true });
const particles = [];
const fireflies = [];
const petals = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function createSupabaseClient() {
  const config = window.SUPABASE_CONFIG || {};
  const hasConfig =
    typeof config.url === "string" &&
    typeof config.anonKey === "string" &&
    config.url.startsWith("https://") &&
    config.anonKey.length > 30 &&
    window.supabase;

  if (!hasConfig) return null;
  return window.supabase.createClient(config.url, config.anonKey);
}

function updateCount(value) {
  state.total = Math.max(0, Number(value) || 0);
  els.count.textContent = new Intl.NumberFormat("es-ES").format(state.total);
}

function normalizeFlower(row) {
  return {
    id: row.id || crypto.randomUUID(),
    created_at: row.created_at || new Date().toISOString(),
    x: clamp(Number(row.x) || random(8, 92), 5, 95),
    y: clamp(Number(row.y) || random(46, 96), 36, 98),
    tipo_flor: flowerTypes.includes(row.tipo_flor) ? row.tipo_flor : pick(flowerTypes),
    color: colors.includes(row.color) ? row.color : pick(colors)
  };
}

function choosePlantPosition() {
  let best = { x: random(8, 92), y: random(48, 96), score: -Infinity };
  const visibleFlowers = state.flowers.slice(-MAX_RENDERED_FLOWERS);

  for (let attempt = 0; attempt < 26; attempt += 1) {
    const candidate = {
      x: clamp(50 + random(-44, 44) + Math.sin(Date.now() + attempt) * 4, 6, 94),
      y: random(48, 96)
    };
    const distanceScore = visibleFlowers.reduce((score, flower) => {
      const dx = candidate.x - flower.x;
      const dy = (candidate.y - flower.y) * 1.35;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return score + Math.min(distance, 18);
    }, 0);
    const centerPenalty = Math.max(0, 18 - Math.hypot(candidate.x - 50, candidate.y - 50)) * 4;
    const score = distanceScore - centerPenalty + random(0, 6);
    if (score > best.score) best = { ...candidate, score };
  }

  return { x: Number(best.x.toFixed(2)), y: Number(best.y.toFixed(2)) };
}

function getFlowerSubset() {
  if (state.flowers.length <= MAX_RENDERED_FLOWERS) return state.flowers;
  const newest = state.flowers.slice(-Math.floor(MAX_RENDERED_FLOWERS * 0.55));
  const older = state.flowers.slice(0, -newest.length);
  const step = Math.max(1, Math.floor(older.length / Math.floor(MAX_RENDERED_FLOWERS * 0.45)));
  return older.filter((_, index) => index % step === 0).concat(newest).slice(-MAX_RENDERED_FLOWERS);
}

function renderFlowers(newFlowerId = null) {
  const fragment = document.createDocumentFragment();
  const subset = getFlowerSubset();

  subset.forEach((flower) => {
    const node = document.createElement("span");
    const scale = random(0.62, 1.12) * (0.82 + flower.y / 180);
    node.className = `field-flower${flower.id === newFlowerId ? " is-arriving" : ""}`;
    node.dataset.type = flower.tipo_flor;
    node.style.setProperty("--x", `${flower.x}%`);
    node.style.setProperty("--y", `${flower.y}%`);
    node.style.setProperty("--color", flower.color);
    node.style.setProperty("--scale", scale.toFixed(2));
    node.style.setProperty("--size", `${random(1.7, 3.6).toFixed(2)}rem`);
    node.style.setProperty("--z", `${Math.round(flower.y)}`);
    node.style.setProperty("--sway", `${random(4.5, 8).toFixed(2)}s`);
    fragment.appendChild(node);
  });

  els.field.replaceChildren(fragment);
}

function readLocalFlowers() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_FLOWERS_KEY) || "[]").map(normalizeFlower);
  } catch {
    return [];
  }
}

function saveLocalFlowers(flowers) {
  localStorage.setItem(LOCAL_FLOWERS_KEY, JSON.stringify(flowers.slice(-900)));
}

async function loadFlowers() {
  state.supabase = createSupabaseClient();

  if (!state.supabase) {
    state.flowers = readLocalFlowers();
    updateCount(state.flowers.length);
    renderFlowers();
    return;
  }

  const [{ data, error }, countResult] = await Promise.all([
    state.supabase.from(SUPABASE_TABLE).select("*").order("created_at", { ascending: true }).limit(1500),
    state.supabase.from(SUPABASE_TABLE).select("id", { count: "exact", head: true })
  ]);

  if (error) {
    console.warn("No se pudieron cargar las flores de Supabase. Usando modo local.", error);
    state.flowers = readLocalFlowers();
    updateCount(state.flowers.length);
    renderFlowers();
    return;
  }

  state.flowers = (data || []).map(normalizeFlower);
  updateCount(countResult.count ?? state.flowers.length);
  renderFlowers();
  subscribeToGarden();
}

function subscribeToGarden() {
  state.supabase
    .channel("jardin-global")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: SUPABASE_TABLE },
      (payload) => {
        const flower = normalizeFlower(payload.new);
        if (state.flowers.some((item) => item.id === flower.id)) return;
        state.flowers.push(flower);
        updateCount(state.total + 1);
        renderFlowers(flower.id);
      }
    )
    .subscribe();
}

function getMessage() {
  let recent = [];
  try {
    recent = JSON.parse(localStorage.getItem(RECENT_MESSAGES_KEY) || "[]");
  } catch {
    recent = [];
  }

  const available = compliments.filter((message) => !recent.includes(message));
  const message = pick(available.length ? available : compliments);
  const nextRecent = [message, ...recent.filter((item) => item !== message)].slice(0, 32);
  localStorage.setItem(RECENT_MESSAGES_KEY, JSON.stringify(nextRecent));
  state.lastMessage = message;
  return message;
}

function showMessage(message) {
  els.message.textContent = message;
  els.messageCard.classList.remove("is-new");
  requestAnimationFrame(() => {
    els.messageCard.classList.add("is-new");
    window.setTimeout(() => els.messageCard.classList.remove("is-new"), 520);
  });
}

async function plantFlower() {
  if (!state.canPlant) return;
  state.canPlant = false;

  const position = choosePlantPosition();
  const flower = normalizeFlower({
    ...position,
    tipo_flor: pick(flowerTypes),
    color: pick(colors)
  });

  els.flower.classList.add("is-blooming");
  window.setTimeout(() => els.flower.classList.remove("is-blooming"), 780);
  showMessage(getMessage());
  burstFromMainFlower();
  playChime();

  if (state.supabase) {
    const { data, error } = await state.supabase
      .from(SUPABASE_TABLE)
      .insert({
        x: flower.x,
        y: flower.y,
        tipo_flor: flower.tipo_flor,
        color: flower.color
      })
      .select()
      .single();

    if (!error && data) {
      const saved = normalizeFlower(data);
      state.flowers.push(saved);
      updateCount(state.total + 1);
      renderFlowers(saved.id);
    } else {
      console.warn("No se pudo plantar en Supabase. Guardando localmente.", error);
      state.flowers.push(flower);
      saveLocalFlowers(state.flowers);
      updateCount(state.flowers.length);
      renderFlowers(flower.id);
    }
  } else {
    state.flowers.push(flower);
    saveLocalFlowers(state.flowers);
    updateCount(state.flowers.length);
    renderFlowers(flower.id);
  }

  window.setTimeout(() => {
    state.canPlant = true;
  }, 680);
}

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  els.canvas.width = Math.floor(window.innerWidth * ratio);
  els.canvas.height = Math.floor(window.innerHeight * ratio);
  els.canvas.style.width = `${window.innerWidth}px`;
  els.canvas.style.height = `${window.innerHeight}px`;
  canvasContext.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function seedAmbientMotion() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  fireflies.length = 0;
  petals.length = 0;

  const fireflyCount = width < 640 ? 18 : 34;
  const petalCount = width < 640 ? 16 : 26;

  for (let index = 0; index < fireflyCount; index += 1) {
    fireflies.push({
      x: random(0, width),
      y: random(0, height * 0.76),
      r: random(1.2, 3.2),
      vx: random(-0.18, 0.18),
      vy: random(-0.12, 0.12),
      phase: random(0, Math.PI * 2)
    });
  }

  for (let index = 0; index < petalCount; index += 1) {
    petals.push({
      x: random(-width * 0.1, width * 1.1),
      y: random(-height * 0.15, height * 0.8),
      size: random(6, 16),
      speed: random(0.18, 0.54),
      drift: random(-0.2, 0.25),
      rotation: random(0, Math.PI * 2),
      color: pick(["#ff8fd5", "#ffb0df", "#ffc5e8", "#ff6dc9"])
    });
  }
}

function drawPetal(petal) {
  canvasContext.save();
  canvasContext.translate(petal.x, petal.y);
  canvasContext.rotate(petal.rotation);
  canvasContext.fillStyle = petal.color;
  canvasContext.globalAlpha = 0.78;
  canvasContext.beginPath();
  canvasContext.ellipse(0, 0, petal.size * 0.42, petal.size, 0.35, 0, Math.PI * 2);
  canvasContext.fill();
  canvasContext.restore();
}

function animateCanvas(time = 0) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvasContext.clearRect(0, 0, width, height);

  fireflies.forEach((fly) => {
    fly.phase += 0.025;
    fly.x += fly.vx + Math.sin(fly.phase) * 0.12;
    fly.y += fly.vy + Math.cos(fly.phase * 0.7) * 0.08;
    if (fly.x < -20) fly.x = width + 20;
    if (fly.x > width + 20) fly.x = -20;
    if (fly.y < -20) fly.y = height * 0.78;
    if (fly.y > height * 0.82) fly.y = -10;

    const glow = 0.45 + Math.sin(time * 0.003 + fly.phase) * 0.35;
    canvasContext.globalAlpha = glow;
    canvasContext.fillStyle = "#ffe48a";
    canvasContext.shadowColor = "#ffb86e";
    canvasContext.shadowBlur = 14;
    canvasContext.beginPath();
    canvasContext.arc(fly.x, fly.y, fly.r, 0, Math.PI * 2);
    canvasContext.fill();
  });

  canvasContext.shadowBlur = 0;
  petals.forEach((petal) => {
    petal.x += petal.drift + Math.sin(time * 0.001 + petal.size) * 0.2;
    petal.y += petal.speed;
    petal.rotation += 0.008;
    if (petal.y > height + 40) {
      petal.y = -30;
      petal.x = random(-30, width + 30);
    }
    drawPetal(petal);
  });

  for (let index = particles.length - 1; index >= 0; index -= 1) {
    const particle = particles[index];
    particle.life -= 0.018;
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += particle.gravity;
    particle.vx *= 0.992;

    canvasContext.globalAlpha = Math.max(particle.life, 0);
    canvasContext.fillStyle = particle.color;
    canvasContext.shadowColor = particle.color;
    canvasContext.shadowBlur = particle.glow;
    canvasContext.beginPath();
    canvasContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    canvasContext.fill();

    if (particle.life <= 0) particles.splice(index, 1);
  }

  canvasContext.globalAlpha = 1;
  canvasContext.shadowBlur = 0;
  requestAnimationFrame(animateCanvas);
}

function burstFromMainFlower() {
  const rect = els.flower.getBoundingClientRect();
  const origin = {
    x: rect.left + rect.width * 0.5,
    y: rect.top + rect.height * 0.38
  };
  const count = window.innerWidth < 640 ? 46 : 74;

  for (let index = 0; index < count; index += 1) {
    const angle = random(0, Math.PI * 2);
    const speed = random(1.2, 5.6);
    particles.push({
      x: origin.x + random(-16, 16),
      y: origin.y + random(-12, 12),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - random(0.8, 2.4),
      gravity: random(0.018, 0.055),
      size: random(1.5, 4.6),
      life: random(0.58, 1),
      glow: random(8, 22),
      color: pick(["#fff6a8", "#ff8de1", "#ffffff", "#9fffe2", "#ffc06f"])
    });
  }
}

function setupAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0;
  master.connect(context.destination);

  const wind = context.createOscillator();
  const windGain = context.createGain();
  wind.type = "sine";
  wind.frequency.value = 174;
  windGain.gain.value = 0.035;
  wind.connect(windGain);
  windGain.connect(master);
  wind.start();

  const shimmer = context.createOscillator();
  const shimmerGain = context.createGain();
  shimmer.type = "triangle";
  shimmer.frequency.value = 523.25;
  shimmerGain.gain.value = 0.012;
  shimmer.connect(shimmerGain);
  shimmerGain.connect(master);
  shimmer.start();

  return { context, master, wind, shimmer };
}

async function toggleSound() {
  if (!state.audio) state.audio = setupAudio();
  if (!state.audio) return;

  await state.audio.context.resume();
  state.soundOn = !state.soundOn;
  state.audio.master.gain.cancelScheduledValues(state.audio.context.currentTime);
  state.audio.master.gain.linearRampToValueAtTime(state.soundOn ? 0.52 : 0, state.audio.context.currentTime + 0.4);
  els.sound.setAttribute("aria-pressed", String(state.soundOn));
  els.sound.querySelector(".sr-only").textContent = state.soundOn ? "Desactivar música" : "Activar música";
  if (state.soundOn) playChime();
}

function playChime() {
  if (!state.audio || !state.soundOn) return;

  const { context, master } = state.audio;
  const now = context.currentTime;
  [659.25, 783.99, 987.77].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, now + index * 0.07);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.04 + index * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.05 + index * 0.07);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(now + index * 0.07);
    oscillator.stop(now + 1.16 + index * 0.07);
  });
}

function init() {
  resizeCanvas();
  seedAmbientMotion();
  animateCanvas();
  loadFlowers();

  els.flower.addEventListener("click", plantFlower);
  els.sound.addEventListener("click", toggleSound);
  window.addEventListener("resize", () => {
    resizeCanvas();
    seedAmbientMotion();
    renderFlowers();
  });
}

document.addEventListener("DOMContentLoaded", init);
