(function () {
  var script = document.currentScript;
  var tenant = script.getAttribute('data-tenant');
  if (!tenant) { console.error('[DentalChat] Missing data-tenant attribute'); return; }

  var base = script.getAttribute('data-base') || 'https://dental-chatbot-xi.vercel.app';

  var iframe = document.createElement('iframe');
  iframe.src = base + '/embed?tenant=' + encodeURIComponent(tenant);
  iframe.allow = 'clipboard-write';
  iframe.style.cssText = [
    'position:fixed',
    'bottom:0',
    'right:0',
    'width:400px',
    'height:600px',
    'border:none',
    'z-index:99999',
    'background:transparent',
  ].join(';');

  document.body.appendChild(iframe);
})();
