// background.js — mock backend for Clean UI updated demo
function sleep(ms){ return new Promise(res => setTimeout(res, ms)); }

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      if (msg.type === 'RUN_CHECK') {
        await sleep(600);
        const page = msg.payload && msg.payload.page ? msg.payload.page : {};
        const title = (page.headline || '').toLowerCase();
        const clickPhrases = ["you won't believe","shocking","secret","what happens next","#1 way","will blow your mind","can't believe"];
        const isClick = clickPhrases.some(p => title.includes(p));
        const ccs = isClick ? 0.28 : 0.88;
        const category = isClick ? 'general' : 'politics';
        const summary = page.first_sentences || (page.text ? page.text.split(/\n\n/).slice(0,2).join('\n\n').slice(0,400) : '');
        const mock = {
          ccs: ccs,
          primary: ccs >= 0.85 ? 'VERIFIED TRUE' : (ccs >= 0.45 ? 'MISLEADING' : 'FALSE'),
          category: category,
          summary: summary || (page.headline || 'No summary available.'),
          summary_link: page.url || '',
          score: Math.round(ccs * 100) / 100,
          model_version: 'mock-clean-updated-v1.0',
          flags: isClick ? ['CLICKBAIT'] : [],
          evidence: [
            { source: 'Mock FactCheck', url: 'https://example.com/mock', title: 'Mock Evidence', snippet: 'Simulated evidence item.' }
          ],
          timestamp: new Date().toISOString()
        };
        sendResponse({ ok: true, result: mock });
        return;
      } else if (msg.type === 'SAVE_HISTORY') {
        // mock: store in local extension storage for demo
        const entry = msg.entry || {};
        chrome.storage.local.get(['history'], (res) => {
          const history = res.history || [];
          history.unshift(entry); // newest first
          // limit to 200 entries
          if (history.length > 200) history.splice(200);
          chrome.storage.local.set({ history }, () => sendResponse({ ok: true }));
        });
        return true;
      } else if (msg.type === 'GET_HISTORY') {
        chrome.storage.local.get(['history'], (res) => sendResponse({ ok: true, history: res.history || [] }));
        return true;
      }
      sendResponse({ ok: false, error: 'unknown message' });
    } catch (err) {
      sendResponse({ ok: false, error: String(err) });
    }
  })();
  return true;
});
