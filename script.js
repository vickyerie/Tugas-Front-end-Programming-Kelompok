function convertTemp(value, from, to) {
  let celsius;
  switch (from) {
    case 'C': celsius = value; break;
    case 'F': celsius = (value - 32) * 5/9; break;
    case 'K': celsius = value - 273.15; break;
    case 'R': celsius = (value - 491.67) * 5/9; break;
    default: celsius = value;
  }
  switch (to) {
    case 'C': return celsius;
    case 'F': return celsius * 9/5 + 32;
    case 'K': return celsius + 273.15;
    case 'R': return (celsius + 273.15) * 9/5;
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
  "Air membeku di 0°C dan mendidih di 100°C."
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
