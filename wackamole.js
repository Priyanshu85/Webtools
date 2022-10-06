const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const sweets = document.querySelectorAll('.sweet');
const bitters = document.querySelectorAll('.bitter');
  let lastHole;
  let sweetOrNot;
  let timeUp = false;
  let score = 0;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }
  function peep() {
    const time = randomTime(500, 2000);
    const hole = randomHole(holes);
    sweetOrNot = Math.floor(Math.random()*2) +1;
    hole.classList.add(sweetOrNot == 1 ? 'up' : 'down');
    setTimeout(() => {
      hole.classList.remove('up', 'down');
      if (!timeUp) peep();
    }, time);
  }
  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 30000)
  }
  function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
  function debonk(e) {
    if(!e.isTrusted) return; // cheater!
    score--;
    this.parentNode.classList.remove('down');
    scoreBoard.textContent = score;
  }
  sweets.forEach(sweet => sweet.addEventListener('click', bonk));
  bitters.forEach(bitter => bitter.addEventListener('click', debonk));