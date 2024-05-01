window.addEventListener('DOMContentLoaded', () => {
    fetch('header_admin.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;
      });
  });