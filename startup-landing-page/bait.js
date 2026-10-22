const page = document.querySelector('.bait-page');
let opening = false;

function openHub() {
  if (opening) return;
  opening = true;
  page.classList.add('is-transitioning');
  window.setTimeout(() => { window.location.href = 'hub.html'; }, 3250);
}

document.addEventListener('click', openHub, { once: true });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openHub();
  }
});



