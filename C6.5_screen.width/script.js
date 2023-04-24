const btn = document.querySelector('.btn');
const resultHTML = document.querySelector('.result');
btn.addEventListener('click', () => {
  alert(`Размер твоего экрана: ${window.screen.width} x ${window.screen.height}`)
})
