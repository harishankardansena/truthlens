// content/content.js - extraction
function getDomain(url){
  try { return new URL(url).hostname.replace(/^www\./,''); }
  catch(e){ return ''; }
}

function extractHeadline(){
  const selectors = ['meta[property="og:title"]','meta[name="twitter:title"]','h1','article h1','.article-title','.post-title'];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (!el) continue;
    if (el.tagName === 'META') {
      const content = el.getAttribute('content');
      if (content && content.trim().length) return content.trim();
    } else {
      const text = el.innerText || el.textContent;
      if (text && text.trim().length > 5) return text.trim();
    }
  }
  return document.title || '';
}

function extractArticleText(){
  const article = document.querySelector('article');
  if (article && article.innerText.trim().length > 120) return article.innerText.trim();
  const candidates = ['#content','.article-content','.post-content','.story-content','.entry-content','.post-body'];
  for (const sel of candidates) {
    const el = document.querySelector(sel);
    if (el && el.innerText.trim().length > 200) return el.innerText.trim();
  }
  const paragraphs = Array.from(document.querySelectorAll('p'));
  let text = '';
  for (const p of paragraphs) {
    const t = p.innerText.trim();
    if (t.length > 40) text += t + '\n\n';
    if (text.length > 2500) break;
  }
  return text.trim();
}

function extractFirstSentences(n=2){
  const text = extractArticleText() || document.body.innerText || '';
  const sents = text.split(/[\.\?\!]\s+/).map(s => s.trim()).filter(Boolean);
  return sents.slice(0, n).join('. ') + (sents.length >= n ? '.' : '');
}

function gatherPageData(){
  const url = location.href;
  return {
    url,
    domain: getDomain(url),
    headline: extractHeadline(),
    text: extractArticleText(),
    first_sentences: extractFirstSentences(2)
  };
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'EXTRACT_PAGE') {
    const data = gatherPageData();
    sendResponse({ ok:true, data });
  }
  return false;
});
