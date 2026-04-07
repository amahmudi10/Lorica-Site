// Lorica — GA4 event tracking

var FORMSPREE = 'https://formspree.io/f/xeepnkkz';

// ── Helper: reveal form when button clicked ────────────────
function revealForm(btnId, wrapId) {
  var btn = document.getElementById(btnId);
  var wrap = document.getElementById(wrapId);
  if (!btn || !wrap) return;
  btn.addEventListener('click', function() {
    btn.style.display = 'none';
    wrap.style.display = 'block';
    var input = wrap.querySelector('input[type="email"]');
    if (input) input.focus();
  });
}

// ── Helper: submit form to Formspree ──────────────────────
function setupForm(formId, successId, label) {
  var form = document.getElementById(formId);
  var success = document.getElementById(successId);
  if (!form || !success) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var email = form.querySelector('input[type="email"]').value;

    fetch(FORMSPREE, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, source: label })
    })
    .then(function(res) {
      if (res.ok) {
        form.style.display = 'none';
        success.style.display = 'block';
        gtag('event', 'email_signup', { source: label, page: window.location.pathname });
      } else {
        alert('Something went wrong — please try again.');
      }
    })
    .catch(function() {
      alert('Something went wrong — please try again.');
    });
  });
}

// ── Wire up all forms ──────────────────────────────────────

// index.html — hero
revealForm('hero-cta-btn',  'hero-form-wrap');
setupForm('hero-form', 'hero-form-success', 'hero');

// index.html — footer CTA
revealForm('cta-btn', 'cta-form-wrap');
setupForm('cta-form', 'cta-form-success', 'footer');

// business.html — hero
revealForm('biz-hero-cta-btn', 'biz-hero-form-wrap');
setupForm('biz-hero-form', 'biz-hero-form-success', 'business-hero');

// business.html — footer CTA
revealForm('biz-cta-btn', 'biz-cta-form-wrap');
setupForm('biz-cta-form', 'biz-cta-form-success', 'business-footer');

// ── Business page nav link click ──────────────────────────
var bizLink = document.querySelector('a[href="business.html"]');
if (bizLink) {
  bizLink.addEventListener('click', function() {
    gtag('event', 'business_page_click');
  });
}

// ── Scroll depth — fires once at 25%, 50%, 75%, 100% ──────
var scrollMilestones = [25, 50, 75, 100];
var reached = {};

window.addEventListener('scroll', function() {
  var scrolled = window.scrollY + window.innerHeight;
  var total = document.documentElement.scrollHeight;
  var pct = Math.round((scrolled / total) * 100);

  scrollMilestones.forEach(function(milestone) {
    if (pct >= milestone && !reached[milestone]) {
      reached[milestone] = true;
      gtag('event', 'scroll_depth', {
        depth: milestone + '%',
        page: window.location.pathname
      });
    }
  });
});
