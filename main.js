  const startStopBtn = document.getElementById("startStop");
  const resetBtn = document.getElementById("reset");
  const timeEl = document.getElementById("time");
  const statusEl = document.getElementById("status");
  let secondsLeft = 25*60;
  let isRunning = false;
  let isBreak = false;
  let timer = null;

  function formatTime(secs){
    const m = Math.floor(secs/60);
    const s = secs % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  function updateTimer(){
    timeEl.textContent = formatTime(secondsLeft);
  }

  function tick(){
    if(secondsLeft <= 0){
      clearInterval(timer);
      isRunning=false;
      isBreak = !isBreak;
      secondsLeft = isBreak ? 5*60 : 25*60;
      document.body.classList.toggle("break", isBreak);
      statusEl.textContent = isBreak ? "Mola Zamanı ☕" : "Çalışma Süresi 💻";
      updateTimer();
      return;
    }
    secondsLeft--;
    updateTimer();
  }

  startStopBtn.addEventListener("click", ()=>{
    if(isRunning){
      clearInterval(timer);
      isRunning=false;
      startStopBtn.textContent = "Başlat";
    }else{
      timer = setInterval(tick, 1000);
      isRunning=true;
      startStopBtn.textContent = "Duraklat";
    }
  });

  resetBtn.addEventListener("click", ()=>{
    clearInterval(timer);
    isRunning=false;
    isBreak=false;
    secondsLeft=25*60;
    startStopBtn.textContent="Başlat";
    document.body.classList.remove("break");
    statusEl.textContent = "Çalışma Süresi 💻";
    updateTimer();
  });

  // Başlangıçta timer göster
  updateTimer();