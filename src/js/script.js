'use strict';

const btnGo = document.getElementById('btn-go');
const indexInput = document.getElementById('index-input');

/* Decode HTML entities/symbols:
 **********************************************/
const decodeHTML = str =>
  str.replace(/&#([0-9]{1,3});/gi, (match, num) =>
    String.fromCharCode(parseInt(num))
  );

/* Settings:
 **********************************************/
const settings = {
  url: 'https://www.theguardian.com/crosswords/quick/',
  windowTarget: '_blank',
  index: {
    updateInterval: 100
  },
  range: {
    lower: 9093,
    upper: 14781
  },
  interval: {
    indexGenerator: null
  },
  paused: false,
  labels: {
    unpaused: `Go ${decodeHTML('&#187;')}`,
    paused: `Re-spin ${decodeHTML('&#187;')}`
  }
};

/* Crossword index methods (get and set random):
 **********************************************/
const index = {
  get: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
  set: (el, { lower, upper } = range) => (el.value = index.get(lower, upper))
};

/* Page method — go to URL with dynamic index:
 **********************************************/
const page = {
  goto: (url, suburl, target) => window.open(url + suburl, target)
};

/* Set interval to cycle through random indices:
 **********************************************/
const togglePause = () => {
  if (settings.paused) {
    settings.paused = false;
    btnGo.textContent = settings.labels.unpaused;
  } else {
    settings.paused = true;
    btnGo.textContent = settings.labels.paused;
  }
};

// Interval manager to set and clear index generator
const intervalManager = {
  set() {
    settings.interval.indexGenerator = setInterval(
      () => index.set(indexInput, settings.range),
      settings.index.updateInterval
    );
  },
  clear() {
    clearInterval(settings.interval.indexGenerator);
  }
};

/* Event listener – when button is clicked:
 **********************************************/
btnGo.addEventListener('click', () => {
  if (!settings.paused)
    page.goto(settings.url, Number(indexInput.value), settings.windowTarget);

  // If paused/cleared, set interval again — else pause/clear it
  settings.paused ? intervalManager.set() : intervalManager.clear();
  togglePause();
});

intervalManager.set();
