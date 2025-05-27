const music = new Audio('love-song.mp3');
music.volume = 0.6;

document.getElementById('startBtn').addEventListener('click', () => {
  // Müzik başlat
  music.play().catch(err => {
    console.warn("Müzik başlatılamadı:", err);
  });

  // Intro gizle
  document.getElementById('intro').style.display = 'none';

  // Ana mesajı göster
  document.getElementById('mainMessage').classList.remove('hidden');
});
