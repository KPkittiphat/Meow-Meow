(function(){
  const IMG1 = 'img/meow1.png';
  const IMG2 = 'img/meow2.png';
  const KEY_SCORE = 'meowScore';
  const KEY_STATE = 'meowState';

  const meowEl = document.getElementById('meow');
  const scoreEl = document.getElementById('score');

  
  const SOUND_FILES = ['sound/M1.mp3','sound/M2.mp3','sound/M3.mp3'];
  
  const audioPool = SOUND_FILES.map(src => {
    const a = new Audio(src);
    a.preload = 'auto';
    a.volume = 0.9; 
    return a;
  });

  function playRandomSound(){
    if (!audioPool.length) return;
    const idx = Math.floor(Math.random() * audioPool.length);
    const audio = audioPool[idx];
    try {
      audio.currentTime = 0;
      audio.play().catch(()=>{});
    } catch(e){}
  }

  let score = parseInt(localStorage.getItem(KEY_SCORE) || '0', 10);
  let state = localStorage.getItem(KEY_STATE) || '1'; 
  let busy = false;
  const SHOW_TIME = 250; 
  function render(){
    scoreEl.textContent = String(score);
    meowEl.src = (state === '1') ? IMG1 : IMG2;
  }

  function showTempAndCount(){
    if (busy) return; 
    busy = true;
    state = '2';
    score += 1;
    localStorage.setItem(KEY_SCORE, String(score));
    localStorage.setItem(KEY_STATE, state);
    render();

    
    playRandomSound();

    setTimeout(() => {
      state = '1';
      localStorage.setItem(KEY_STATE, state);
      render();
      busy = false;
    }, SHOW_TIME);
  }

  render();

 
  document.addEventListener('click', showTempAndCount);

  
  document.addEventListener('selectstart', e => e.preventDefault());
})();