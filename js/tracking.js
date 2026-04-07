// Lorica — GA4 event tracking

// ── Early access email form ────────────────────────────────
var form = document.getElementById('early-access-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var email = form.querySelector('input[type="email"]').value;

    // TODO: replace with your Formspree endpoint — https://formspree.io/f/YOUR_ID
    fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    })
    .then(function(res) {
      if (res.ok) {
        form.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
        gtag('event', 'email_signup', { page: window.location.pathname });
      } else {
        alert('Something went wrong — please try again.');
      }
    })
    .catch(function() {
      alert('Something went wrong — please try again.');
    });
  });
}


// ── Button clicks ──────────────────────────────────────────
document.querySelectorAll('a.btn-primary, a.btn-outline').forEach(function(btn) {
  btn.addEventListener('click', function() {
    gtag('event', 'cta_click', {
      button_text: btn.textContent.trim(),
      page: window.location.pathname
    });
  });
});

// ── Business page link click (on index only) ───────────────
var bizLink = document.querySelector('a[href="business.html"]');
if (bizLink) {
  bizLink.addEventListener('click', function() {
    gtag('event', 'business_page_click');
  });
}

// ── Scroll depth — fires once each at 25%, 50%, 75%, 100% ──
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
