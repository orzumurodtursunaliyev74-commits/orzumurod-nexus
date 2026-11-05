
(() => {
"use strict";

const $ = id => document.getElementById(id);
const on = (id, event, fn) => $(id)?.addEventListener(event, fn);

const translations = {
uz: {
home:"Bosh sahifa",about:"Men haqimda",projects:"Loyihalar",lab:"Cyber Lab",tools:"Asboblar",
lead:"Men texnologiya, Linux, web dasturlash va kiberxavfsizlik olamida yangi imkoniyatlar yarataman.",
explore:"Loyihalarni ko‘rish",contact:"Bog‘lanish",
aboutTitle:"Qiziqishdan — real natijagacha.",
aboutText:"Linux tizimlari, tarmoqlar, web texnologiyalar va axborot xavfsizligini amaliy mashqlar orqali o‘rganaman.",
wazuh:"Server monitoringi, log tahlili va xavfsizlik hodisalarini kuzatish.",
linux:"Ubuntu Server, terminal va tarmoq sozlamalari bilan amaliy tajriba.",
web:"Interaktiv interfeys va zamonaviy web texnologiyalari.",
translator:"Tarjimon",translate:"Tarjima qilish",password:"Parol generatori",generate:"Yaratish",
weather:"Ob-havo",currency:"Valyuta kalkulyatori",stopwatch:"Sekundomer",calculator:"Kalkulyator",
connect:"Keling, aloqada bo‘laylik",connectText:"Hamkorlik, g‘oya yoki texnologiya haqida suhbatlashish uchun bog‘laning.",
rights:"Barcha huquqlar himoyalangan."
},
en: {
home:"Home",about:"About",projects:"Projects",lab:"Cyber Lab",tools:"Tools",
lead:"I explore technology, Linux, web development and cybersecurity to build new possibilities.",
explore:"Explore projects",contact:"Contact me",
aboutTitle:"From curiosity to real results.",
aboutText:"I learn Linux systems, networking, web technologies and information security through hands-on practice.",
wazuh:"A lab for server monitoring, log analysis and security event observation.",
linux:"Hands-on experience with Ubuntu Server, terminal and network configuration.",
web:"An interactive portfolio built with modern web technologies.",
translator:"Translator",translate:"Translate",password:"Password generator",generate:"Generate",
weather:"Weather",currency:"Currency converter",stopwatch:"Stopwatch",calculator:"Calculator",
connect:"Let's connect",connectText:"Reach out to talk about collaboration, ideas or technology.",
rights:"All rights reserved."
},
ru: {
home:"Главная",about:"Обо мне",projects:"Проекты",lab:"Киберлаборатория",tools:"Инструменты",
lead:"Я изучаю технологии, Linux, веб-разработку и кибербезопасность, создавая новые возможности.",
explore:"Смотреть проекты",contact:"Связаться",
aboutTitle:"От любопытства — к реальным результатам.",
aboutText:"Я изучаю Linux, сети, веб-технологии и информационную безопасность на практике.",
wazuh:"Лаборатория мониторинга серверов, анализа журналов и событий безопасности.",
linux:"Практика с Ubuntu Server, терминалом и настройкой сетей.",
web:"Интерактивное портфолио на современных веб-технологиях.",
translator:"Переводчик",translate:"Перевести",password:"Генератор паролей",generate:"Создать",
weather:"Погода",currency:"Конвертер валют",stopwatch:"Секундомер",calculator:"Калькулятор",
connect:"Давайте общаться",connectText:"Свяжитесь со мной, чтобы обсудить идеи и технологии.",
rights:"Все права защищены."
}
};

let currentLang = "uz";

function applyLanguage(language) {
currentLang = translations[language] ? language : "uz";
document.documentElement.lang = currentLang;

document.querySelectorAll("[data-u]").forEach(element => {
const value = translations[currentLang][element.dataset.u];
if (value) element.textContent = value;
});

if ($("lang")) $("lang").value = currentLang;

try {
localStorage.setItem("nexus-lang", currentLang);
} catch {}
}

try {
applyLanguage(localStorage.getItem("nexus-lang") || "uz");
} catch {
applyLanguage("uz");
}

on("lang", "change", event => applyLanguage(event.target.value));

on("theme", "click", () => {
document.body.classList.toggle("light");
try {
localStorage.setItem(
"nexus-theme",
document.body.classList.contains("light") ? "light" : "dark"
);
} catch {}
});

try {
if (localStorage.getItem("nexus-theme") === "light") {
document.body.classList.add("light");
}
} catch {}

on("menu", "click", () => $("nav")?.classList.toggle("open"));

document.querySelectorAll("nav a").forEach(link => {
link.addEventListener("click", () => $("nav")?.classList.remove("open"));
});

/* CLOCK */
function updateClock() {
if ($("clock")) $("clock").textContent = new Date().toLocaleTimeString();
if ($("year")) $("year").textContent = new Date().getFullYear();
}
updateClock();
setInterval(updateClock, 1000);

/* ANIMATED SPACE BACKGROUND */
const canvas = $("space");
const context = canvas?.getContext("2d");
let particles = [];

function resizeCanvas() {
if (!canvas || !context) return;

const ratio = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = innerWidth * ratio;
canvas.height = innerHeight * ratio;
canvas.style.width = innerWidth + "px";
canvas.style.height = innerHeight + "px";
context.setTransform(ratio, 0, 0, ratio, 0, 0);

particles = Array.from({length: 55}, () => ({
x: Math.random() * innerWidth,
y: Math.random() * innerHeight,
vx: (Math.random() - 0.5) * 0.35,
vy: (Math.random() - 0.5) * 0.35
}));
}

function animateSpace() {
if (!context) return;

context.clearRect(0, 0, innerWidth, innerHeight);

particles.forEach((particle, index) => {
particle.x += particle.vx;
particle.y += particle.vy;

if (particle.x < 0 || particle.x > innerWidth) particle.vx *= -1;
if (particle.y < 0 || particle.y > innerHeight) particle.vy *= -1;

context.fillStyle = "#65dff477";
context.fillRect(particle.x, particle.y, 2, 2);

for (let j = index + 1; j < particles.length; j++) {
const other = particles[j];
const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

if (distance < 110) {
context.strokeStyle = `rgba(90,180,255,${0.12 * (1 - distance / 110)})`;
context.beginPath();
context.moveTo(particle.x, particle.y);
context.lineTo(other.x, other.y);
context.stroke();
}
}
});

requestAnimationFrame(animateSpace);
}

if (canvas && context) {
resizeCanvas();
animateSpace();
window.addEventListener("resize", resizeCanvas);
}

/* NOTIFICATION */
let toastTimeout;

function toast(message) {
if (!$("toast")) return;
$("toast").textContent = message;
$("toast").classList.add("show");
clearTimeout(toastTimeout);
toastTimeout = setTimeout(() => $("toast").classList.remove("show"), 2200);
}

/* DEMO TERMINAL */
on("termform", "submit", event => {
event.preventDefault();

const input = $("termin");
const output = $("termout");
const command = input?.value.trim().toLowerCase();

if (!command || !output) return;

const safeCommand = command.replace(/[&<>"']/g, "");
output.innerHTML += `<br><span style="color:#65efb8">orzu@nexus:~$ ${safeCommand}</span><br>`;

const commands = {
help: "Commands: help, about, whoami, date, skills, version, clear",
about: "ORZUMUROD NEXUS — technology portfolio.",
whoami: "orzu@nexus | Linux | Web | Cybersecurity",
skills: "Linux • Networking • HTML/CSS/JS • Cybersecurity",
version: "NEXUS CORE v3.0.1"
};

if (command === "clear") {
output.textContent = "";
} else {
const result = command === "date"
? new Date().toString()
: (commands[command] || "Command not found. Type help.");

const line = document.createElement("div");
line.textContent = result;
output.appendChild(line);
}

input.value = "";
output.scrollTop = output.scrollHeight;
});

/* COPY BUTTONS */
document.querySelectorAll("[data-copy]").forEach(button => {
button.addEventListener("click", async () => {
const element = $(button.dataset.copy);
if (!element) return;

try {
await navigator.clipboard.writeText(element.value ?? element.textContent);
toast("Copied ✓");
} catch {
toast("Clipboard unavailable");
}
});
});

/* PASSWORD GENERATOR */
on("length", "input", event => {
if ($("plen")) $("plen").textContent = event.target.value;
});

on("gen", "click", () => {
const sets = [];

if ($("upper")?.checked) sets.push("ABCDEFGHJKLMNPQRSTUVWXYZ");
if ($("lower")?.checked) sets.push("abcdefghijkmnopqrstuvwxyz");
if ($("nums")?.checked) sets.push("23456789");
if ($("symbols")?.checked) sets.push("!@#$%&*+-=?");

if (!sets.length) return toast("Select a character set");

const all = sets.join("");
const length = Number($("length")?.value || 16);
const random = new Uint32Array(length);
crypto.getRandomValues(random);

const result = sets.map(set => set[random[sets.indexOf(set)] % set.length]);

for (let i = result.length; i < length; i++) {
result.push(all[random[i] % all.length]);
}

for (let i = result.length - 1; i > 0; i--) {
const j = random[i] % (i + 1);
[result[i], result[j]] = [result[j], result[i]];
}

$("pwout").textContent = result.join("");
});

/* SHA-256 */
on("hash", "click", async () => {
const text = $("hashin")?.value || "";

if (!crypto.subtle) {
$("hashout").textContent = "SHA-256 requires HTTPS or localhost.";
return;
}

try {
const data = await crypto.subtle.digest(
"SHA-256",
new TextEncoder().encode(text)
);

$("hashout").textContent = Array.from(new Uint8Array(data))
.map(byte => byte.toString(16).padStart(2, "0"))
.join("");
} catch {
$("hashout").textContent = "Hash generation failed.";
}
});

/* JSON FORMATTER */
on("json", "click", () => {
try {
$("jsonout").textContent = JSON.stringify(
JSON.parse($("jsonin").value),
null,
2
);
} catch (error) {
$("jsonout").textContent = "Invalid JSON: " + error.message;
}
});

/* BASE64 */
on("encode", "click", () => {
try {
$("baseout").textContent = btoa(
unescape(encodeURIComponent($("basein").value))
);
} catch {
$("baseout").textContent = "Encoding failed.";
}
});

on("decode", "click", () => {
try {
$("baseout").textContent = decodeURIComponent(
escape(atob($("basein").value.trim()))
);
} catch {
$("baseout").textContent = "Invalid Base64.";
}
});

/* TRANSLATOR */
on("swap", "click", () => {
const from = $("trfrom");
const to = $("trto");
if (!from || !to) return;

const oldFrom = from.value;
from.value = to.value;
to.value = oldFrom === "auto" ? "uz" : oldFrom;
});

on("translate", "click", async () => {
const text = $("trtext")?.value.trim();
const from = $("trfrom")?.value || "auto";
const to = $("trto")?.value || "en";

if (!text) return toast("Enter text");

if (from === to) {
$("trout").textContent = text;
return;
}

$("trout").textContent = "Translating…";

try {
const pair = (from === "auto" ? "" : from) + "|" + to;
const url = "https://api.mymemory.translated.net/get?q=" +
encodeURIComponent(text) + "&langpair=" + encodeURIComponent(pair);

const response = await fetch(url);
if (!response.ok) throw new Error("Network error");

const data = await response.json();
const translated = data.responseData?.translatedText;

if (!translated) throw new Error("No translation");

$("trout").textContent = translated
.replace(/&amp;/g, "&")
.replace(/&lt;/g, "<")
.replace(/&gt;/g, ">");
} catch {
$("trout").textContent = "Translation unavailable. Check internet and try again.";
}
});

/* WEATHER */
on("weatherform", "submit", async event => {
event.preventDefault();

const city = $("city")?.value.trim();
if (!city) return;

$("weatherout").textContent = "Loading…";

try {
const geoResponse = await fetch(
"https://geocoding-api.open-meteo.com/v1/search?name=" +
encodeURIComponent(city) + "&count=1&language=" + currentLang
);

const geo = await geoResponse.json();
const place = geo.results?.[0];

if (!place) throw new Error("City not found");

const weatherResponse = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
);

const weather = await weatherResponse.json();
const current = weather.current;

if (!current) throw new Error("Weather unavailable");

$("weatherout").textContent =
`${place.name}, ${place.country}: ${current.temperature_2m}°C · ` +
`Humidity ${current.relative_humidity_2m}% · Wind ${current.wind_speed_10m} km/h`;

} catch {
$("weatherout").textContent = "Weather unavailable. Check the city name or connection.";
}
});

/* CURRENCY CONVERTER */
on("convert", "click", async () => {
const amount = Number($("amount")?.value);
const from = $("from")?.value;
const to = $("to")?.value;

if (!Number.isFinite(amount) || amount < 0) {
return toast("Enter a valid amount");
}

if (from === to) {
$("currencyout").textContent = `${amount} ${from} = ${amount} ${to}`;
return;
}

$("currencyout").textContent = "Loading…";

try {
const response = await fetch("https://open.er-api.com/v6/latest/USD");
if (!response.ok) throw new Error("API error");

const data = await response.json();
if (data.result !== "success") throw new Error("Rates unavailable");

const fromRate = data.rates[from];
const toRate = data.rates[to];

if (!fromRate || !toRate) throw new Error("Currency unavailable");

const result = amount / fromRate * toRate;

$("currencyout").textContent =
`${amount.toLocaleString()} ${from} = ${result.toLocaleString(undefined, {maximumFractionDigits: 2})} ${to} · Rate date: ${data.time_last_update_utc}`;

} catch {
$("currencyout").textContent = "Currency rates unavailable. Check your internet connection.";
}
});

/* STOPWATCH */
let elapsed = 0;
let startedAt = 0;
let stopwatchInterval = null;

function showStopwatch() {
const time = elapsed + (stopwatchInterval ? performance.now() - startedAt : 0);
const centiseconds = Math.floor(time / 10) % 100;
const seconds = Math.floor(time / 1000) % 60;
const minutes = Math.floor(time / 60000);

if ($("timer")) {
$("timer").textContent =
`${String(minutes).padStart(2, "0")}:` +
`${String(seconds).padStart(2, "0")}.` +
`${String(centiseconds).padStart(2, "0")}`;
}
}

on("start", "click", () => {
if (stopwatchInterval) {
elapsed += performance.now() - startedAt;
clearInterval(stopwatchInterval);
stopwatchInterval = null;
$("start").textContent = "Start";
} else {
startedAt = performance.now();
stopwatchInterval = setInterval(showStopwatch, 40);
$("start").textContent = "Pause";
}

showStopwatch();
});

on("reset", "click", () => {
clearInterval(stopwatchInterval);
stopwatchInterval = null;
elapsed = 0;
showStopwatch();
$("start").textContent = "Start";
});

/* SAFE CALCULATOR */
let expression = "0";

function renderCalculator() {
if ($("display")) $("display").value = expression;
}

function calculateExpression(source) {
if (!/^[0-9+\-*/(). ]+$/.test(source)) throw new Error("Invalid");

const tokens = source.match(/\d+(?:\.\d+)?|[()+\-*/]/g) || [];
let index = 0;

function atom() {
const token = tokens[index++];

if (token === "(") {
const value = add();
if (tokens[index++] !== ")") throw new Error("Bracket");
return value;
}

if (token === "-" || token === "+") {
return (token === "-" ? -1 : 1) * atom();
}

const number = Number(token);
if (!Number.isFinite(number)) throw new Error("Number");
return number;
}

function multiply() {
let value = atom();

while (tokens[index] === "*" || tokens[index] === "/") {
const operator = tokens[index++];
const next = atom();

if (operator === "/" && next === 0) throw new Error("Zero");
value = operator === "*" ? value * next : value / next;
}

return value;
}

function add() {
let value = multiply();

while (tokens[index] === "+" || tokens[index] === "-") {
const operator = tokens[index++];
const next = multiply();
value = operator === "+" ? value + next : value - next;
}

return value;
}

const result = add();

if (index !== tokens.length || !Number.isFinite(result)) {
throw new Error("Invalid expression");
}

return String(Number(result.toPrecision(12)));
}

document.querySelectorAll("[data-v]").forEach(button => {
button.addEventListener("click", () => {
const value = button.dataset.v;

if (value === "AC") {
expression = "0";
} else if (value === "DEL") {
expression = expression.length > 1 ? expression.slice(0, -1) : "0";
} else if (value === "=") {
try {
expression = calculateExpression(expression);
} catch {
toast("Invalid calculation");
expression = "0";
}
} else {
expression = expression === "0" && /[0-9]/.test(value)
? value
: expression + value;
}

renderCalculator();
});
});

renderCalculator();

console.info("ORZUMUROD NEXUS loaded successfully.");
})();
