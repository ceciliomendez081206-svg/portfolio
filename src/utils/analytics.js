import config from '../config.js';

export function initAnalytics() {
  const { analytics } = config;
  if (!analytics || !analytics.provider) return;

  if (analytics.provider === 'plausible' && analytics.domain) {
    // inject Plausible
    const script = document.createElement('script');
    script.setAttribute('defer', '');
    script.setAttribute('data-domain', analytics.domain);
    script.src = 'https://plausible.io/js/plausible.js';
    document.head.appendChild(script);
    window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) };
  }

  if (analytics.provider === 'ga' && analytics.gaMeasurementId) {
    // inject GA4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.gaMeasurementId}`;
    document.head.appendChild(script1);
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);} // eslint-disable-line
    window.gtag = window.gtag || gtag;
    window.gtag('js', new Date());
    window.gtag('config', analytics.gaMeasurementId);
  }
}

export function trackEvent(name, props = {}) {
  if (window.plausible) {
    window.plausible(name, props);
  }
  if (window.gtag) {
    window.gtag('event', name, props);
  }
}

export function trackPage(path = location.pathname + location.hash) {
  if (window.plausible) {
    window.plausible('pageview');
  }
  if (window.gtag) {
    window.gtag('event', 'page_view', { page_path: path });
  }
}
