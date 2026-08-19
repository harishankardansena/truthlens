// popup.js - clean UI updated: origin analysis link + save history to chrome storage
const el = id => document.getElementById(id);

// circle setup
const circle = document.getElementById('progressCircle');
const R = 56;
const C = 2 * Math.PI * R;
circle.setAttribute('stroke-dasharray', C);
circle.setAttribute('stroke-dashoffset', C);

function setPercent(p){
  p = Math.max(0, Math.min(100, Math.round(p)));
  document.getElementById('percentNumber').innerText = p + '%';
  const offset = C - (p/100) * C;
  circle.style.transition = 'stroke-dashoffset .8s cubic-bezier(.2,.9,.2,1)';
  circle.style.strokeDashoffset = offset;
  if (p >= 85) circle.style.stroke = '#16a34a';
  else if (p >= 70) circle.style.stroke = '#059669';
  else if (p >= 45) circle.style.stroke = '#f59e0b';
  else circle.style.stroke = '#ef4444';
}

function domainFromUrl(url){
  try{
    const u = new URL(url);
    let host = u.hostname.replace(/^www\./,'');
    // Keep two last parts for common domains (bbc.co.uk -> bbc.co.uk)
    const parts = host.split('.');
    if (parts.length > 2) host = parts.slice(parts.length-2).join('.');
    return host;
  } catch(e){ return url; }
}

// save history locally and ask background to persist (mock)
function saveHistory(entry){
  // save to chrome.storage.local
  chrome.storage.local.get(['history'], (res) => {
    const history = res.history || [];
    history.unshift(entry);
    if (history.length > 200) history.splice(200);
    chrome.storage.local.set({ history });
  });
  // ask background to persist (background mock will store too)
  chrome.runtime.sendMessage({ type: 'SAVE_HISTORY', entry }, (resp) => {
    // ignore response here; background will acknowledge
  });
}

function mapCategoryBadge(cat){
  const b = document.getElementById('categoryBadge');
  b.className = 'badge neutral';
  b.innerText = cat || 'general';
  if (!cat) return;
  const lower = cat.toLowerCase();
  if (lower.includes('polit')) b.className = 'badge politics';
  else if (lower.includes('sport')) b.className = 'badge sports';
  else if (lower.includes('business')) b.className = 'badge business';
  else if (lower.includes('tech')) b.className = 'badge tech';
  else if (lower.includes('health')) b.className = 'badge health';
  else b.className = 'badge neutral';
  b.innerText = cat;
}

function displayResult(res, page){
  document.getElementById('result').style.display = 'block';
  setPercent(Math.round((res.ccs || 0) * 100));
  document.getElementById('verdict').innerText = res.primary || '—';
  mapCategoryBadge(res.category || 'general');
  document.getElementById('summaryText').innerText = res.summary || 'No summary available.';
  const read = document.getElementById('readLink');
  read.innerHTML = res.summary_link ? `<a href="${res.summary_link}" target="_blank" rel="noreferrer">Read full article</a>` : '';
  const flags = document.getElementById('flags');
  flags.innerHTML = '';
  (res.flags || []).forEach(f => {
    const s = document.createElement('span'); s.className = 'flag-pill'; s.innerText = f; flags.appendChild(s);
  });
  const ev = document.getElementById('evidence');
  if (res.evidence && res.evidence.length) {
    ev.innerHTML = '<strong>Evidence:</strong><ul>' + res.evidence.map(e => `<li><a href="${e.url}" target="_blank" rel="noreferrer">${e.title || e.source || e.url}</a> — ${e.snippet || ''}</li>`).join('') + '</ul>';
  } else { ev.innerHTML = ''; }

  // Save to history (with minimal info)
  const entry = {
    url: page.url || '',
    domain: domainFromUrl(page.url || ''),
    headline: page.headline || '',
    category: res.category || '',
    credibility: res.ccs || 0,
    timestamp: new Date().toISOString()
  };
  saveHistory(entry);
}

// main flow - extraction and check
document.getElementById('checkBtn').addEventListener('click', () => {
  document.getElementById('checkBtn').disabled = true;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_PAGE' }, (res) => {
      document.getElementById('checkBtn').disabled = false;
      if (!res || !res.data) { alert('Could not extract page data.'); return; }
      const page = res.data;
      // set origin link text to domain and link it
      const originLink = document.getElementById('originLink');
      const domain = domainFromUrl(page.url || '');
      originLink.innerText = domain ? (domain.toUpperCase()) : (page.url || 'Source');
      originLink.href = page.url || '#';
      document.getElementById('headline').innerText = page.headline || '—';
      // quick show while waiting
      setPercent(50);
      document.getElementById('model_version').innerText = 'fast';
      // check anonymous mode
      chrome.storage.local.get(['anonymousMode'], (sres) => {
        if (sres.anonymousMode) {
          // simulate a fast local result (no backend call)
          const fake = { ccs: 0.6, primary: 'UNVERIFIED', category: 'general', summary: page.first_sentences || '' };
          displayResult(fake, page);
          return;
        }
        // call background (mock) to get full result
        chrome.runtime.sendMessage({ type: 'RUN_CHECK', payload: { page } }, (apiRes) => {
          if (!apiRes) { alert('No response from background'); return; }
          if (!apiRes.ok) { alert('Server error: ' + (apiRes.error || 'unknown')); return; }
          displayResult(apiRes.result, page);
        });
      });
    });
  });
});

// open source button
document.getElementById('openSiteBtn').addEventListener('click', () => {
  const originLink = document.getElementById('originLink');
  if (originLink && originLink.href && originLink.href !== '#') {
    chrome.tabs.create({ url: originLink.href });
  }
});

// refresh button - reload last result/store
document.getElementById('refreshBtn').addEventListener('click', () => {
  // try to get latest history entry and re-open it
  chrome.storage.local.get(['history'], (res) => {
    const h = res.history || [];
    if (h.length) {
      const latest = h[0];
      chrome.tabs.create({ url: latest.url });
    } else {
      alert('No history available yet.');
    }
  });
});

// init neutral
setPercent(50);
document.getElementById('model_version').innerText = '—';
