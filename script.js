function convertTemp(value, from, to) {
  let celsius;
  switch (from) {
    case 'C': celsius = value; break;
    case 'F': celsius = (value - 32) * 5/9; break;
    case 'K': celsius = value - 273.15; break;
    case 'R': celsius = (value - 491.67) * 5/9; break;
    case "Re":celsius = value * 5 / 4; break;
    case "De":celsius = 100 - (value * 2 / 3); 
    default: celsius = value;
  }
  switch (to) {
    case 'C': return celsius;
    case 'F': return celsius * 9/5 + 32;
    case 'K': return celsius + 273.15;
    case 'R': return (celsius + 273.15) * 9/5;
    case "Re": return celsius * 4 / 5; 
    case "De": return (100 - celsius) * 3 / 2; 
    default: return celsius;
  }
}

const input = document.getElementById('value');
const fromSel = document.getElementById('from');
const toSel = document.getElementById('to');
const resultEl = document.getElementById('result');
const convertBtn = document.getElementById('convert');
const swapBtn = document.getElementById('swap');
const clearBtn = document.getElementById('clear');
const slider = document.getElementById('slider');
const mercury = document.getElementById('mercury');
const bulbVal = document.getElementById('bulbVal');
const historyEl = document.getElementById('history');
const copyBtn = document.getElementById('copy');
const scaleEl = document.getElementById('scale');

// Thermometer UI
function updateThermo(val, scale) {
  let numeric = Number(val) || 0;
  let h = 100 + numeric;
  h = Math.max(10, Math.min(200, h));
  mercury.style.height = h + 'px';

  const celsiusShown = convertTemp(numeric, scale, 'C');
  bulbVal.textContent = celsiusShown.toFixed(1) + '°C';
  scaleEl.textContent = "Skala: " + (scale === 'C' ? 'Celsius' :
                                    scale === 'F' ? 'Fahrenheit' :
                                    scale === 'K' ? 'Kelvin' : 'Rankine');
}

// Konversi
function doConvert() {
  const value = parseFloat(input.value);
  if (isNaN(value)) {
    resultEl.textContent = 'Input tidak valid';
    return;
  }
  const from = fromSel.value;
  const to = toSel.value;
  const res = convertTemp(value, from, to);
  resultEl.textContent = `${res.toFixed(2)} ${to}`;
  updateThermo(value, from);

  const item = document.createElement('div');
  item.textContent = `${value} ${from} → ${res.toFixed(2)} ${to}`;
  historyEl.prepend(item);
}

// Fun Facts
const facts = [
  "Suhu terendah di Bumi tercatat -89.2°C di Antartika.",
  "Tubuh manusia normal sekitar 37°C.",
  "Permukaan Matahari sekitar 5500°C.",
  "Air membeku di 0°C dan mendidih di 100°C.",
  "0 Kelvin disebut sebagai suhu absolut, di mana gerakan partikel berhenti.",
  "Termometer pertama dibuat pada awal abad ke-17.",
  "Skala Fahrenheit ditemukan pada tahun 1724.",
  "Celsius awalnya menyebut titik didih air sebagai 0°C dan titik beku 100°C, lalu dibalik setelahnya.",
  "Suhu inti bumi diperkirakan sekitar 5.500°C, mirip dengan permukaan Matahari.",
  "Manusia bisa merasakan perbedaan suhu sekecil 0.2°C.",
  "Di luar angkasa, suhu bisa turun mendekati -270°C (hampir nol mutlak).",
  "Planet Venus lebih panas daripada Merkurius meski lebih jauh dari Matahari, sekitar 465°C.",
  "Reaumur (°Re) adalah skala suhu yang dulu populer di Eropa tapi sekarang jarang dipakai.",
  "Suhu terpanas yang tercatat di Bumi adalah 56.7°C di Death Valley, AS.",
  "Pengukuran suhu penting dalam hampir semua cabang sains, termasuk kimia, fisika, dan biologi."
];
let factIndex = 0;
function nextFact() {
  document.getElementById("fact").textContent = facts[factIndex];
  factIndex = (factIndex + 1) % facts.length;
}

// Quiz
const quizData = [
  {
    question: "0°C sama dengan berapa Kelvin?",
    options: ["273.15 K", "0 K", "100 K"],
    answer: 0
  },
  {
    question: "100°C sama dengan berapa Fahrenheit?",
    options: ["100 °F", "212 °F", "180 °F"],
    answer: 1
  },
  {
    question: "273.15 K sama dengan berapa °C?",
    options: ["0 °C", "100 °C", "-273 °C"],
    answer: 0
  },
  {
    question: "Titik didih air dalam Kelvin?",
    options: ["373.15 K", "273.15 K", "100 K"],
    answer: 0
  },
  {
    question: "Siapa penemu skala Fahrenheit?",
    options: ["Daniel Gabriel Fahrenheit", "Anders Celsius", "Lord Kelvin"],
    answer: 0
  },
  {
    question: "Siapa penemu skala Celsius?",
    options: ["Isaac Newton", "Anders Celsius", "Daniel Fahrenheit"],
    answer: 1
  },
  {
    question: "0 Kelvin sama dengan berapa °C?",
    options: ["-273.15 °C", "-100 °C", "-459.67 °C"],
    answer: 0
  },
  {
    question: "Titik beku air dalam Fahrenheit?",
    options: ["32 °F", "0 °F", "100 °F"],
    answer: 0
  },
  {
    question: "212 °F sama dengan berapa °C?",
    options: ["100 °C", "0 °C", "180 °C"],
    answer: 0
  },
  {
    question: "Skala suhu Rankine menggunakan basis apa?",
    options: ["Fahrenheit", "Celsius", "Kelvin"],
    answer: 0
  },
  {
    question: "Siapa penemu skala Kelvin?",
    options: ["William Thomson (Lord Kelvin)", "Albert Einstein", "Isaac Newton"],
    answer: 0
  },
  {
    question: "Berapa suhu normal tubuh manusia dalam Celsius?",
    options: ["36-37 °C", "30 °C", "40 °C"],
    answer: 0
  }
];

let quizIndex = 0;


function loadQuiz() {
  const quizPanel = document.querySelector("#quiz .panel");
  const q = quizData[quizIndex];
  quizPanel.innerHTML = `
    <p style="margin-bottom:8px;">${q.question}</p>
    ${q.options.map((opt, i) =>
      `<button class="answer-btn" onclick="cekJawabanQuiz(${i})">${opt}</button>`
    ).join(" ")}
    <div id="feedback" style="margin-top:8px; font-weight:bold;"></div>
  `;
}

function cekJawabanQuiz(i) {
  const feedback = document.getElementById("feedback");
  if (i === quizData[quizIndex].answer) {
    feedback.textContent = "✅ Benar!";
    feedback.style.color = "green";
    setTimeout(() => {
      quizIndex++;
      if (quizIndex < quizData.length) {
        loadQuiz();
      } else {
        document.querySelector("#quiz .panel").innerHTML = `<p>🎉 Quiz selesai! Bagus sekali!</p>`;
      }
    }, 700); // delay biar sempat lihat feedback
  } else {
    feedback.textContent = "❌ Salah, coba lagi!";
    feedback.style.color = "red";
  }
}

// Accordion
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const panel = header.nextElementSibling;
      const arrow = header.querySelector('.arrow');
      if (panel.style.display === 'none') {
        panel.style.display = 'block';
        arrow.textContent = '▼';
      } else {
        panel.style.display = 'none';
        arrow.textContent = '▶';
      }
    });
  });

  // event utama
  convertBtn.addEventListener('click', doConvert);
  swapBtn.addEventListener('click', () => {
    const tmp = fromSel.value;
    fromSel.value = toSel.value;
    toSel.value = tmp;
  });
  clearBtn.addEventListener('click', () => {
    input.value = '';
    resultEl.textContent = '—';
    historyEl.innerHTML = '';
    updateThermo(0, fromSel.value);
  });
  slider.addEventListener('input', () => {
    input.value = slider.value;
    updateThermo(parseFloat(slider.value), fromSel.value);
  });
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(resultEl.textContent || '');
    copyBtn.textContent = '✓ Disalin';
    setTimeout(() => copyBtn.textContent = 'Salin', 1500);
  });

  // inisialisasi
  updateThermo(parseFloat(input.value) || 0, fromSel.value);
  loadQuiz();
});

function toCelsius(value, unit) {
  switch (unit) {
    case "celsius": return value;
    case "fahrenheit": return (value - 32) * 5/9;
    case "kelvin": return value - 273.15;
    case "rankine": return (value - 491.67) * 5/9;
    case "delisle": return 100 - (value * 2/3);
    case "reaumur": return value * 5/4;
    default: return value;
  }
}

function fromCelsius(celsius, unit) {
  switch (unit) {
    case "celsius": return celsius;
    case "fahrenheit": return (celsius * 9/5) + 32;
    case "kelvin": return celsius + 273.15;
    case "rankine": return (celsius + 273.15) * 9/5;
    case "delisle": return (100 - celsius) * 3/2;
    case "reaumur": return celsius * 4/5;
    default: return celsius;
  }
}

function convert() {
  const value = parseFloat(document.getElementById("inputValue").value);
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;

  if (isNaN(value)) {
    document.getElementById("result").innerText = "Masukkan angka yang valid!";
    return;
  }

  const celsius = toCelsius(value, fromUnit);
  const result = fromCelsius(celsius, toUnit);

  document.getElementById("result").innerText = 
    `${value} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
}

