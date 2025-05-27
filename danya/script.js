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

document.getElementById('showVideos').addEventListener('click', function() {
    const mainMessage = document.getElementById('mainMessage');
    mainMessage.innerHTML = `
        <h2 class="gallery-title">Strange video for you :D 💖</h2>
        <div class="video-section">
            <video controls poster="video-thumbnail.jpg">
                <source src="fotos/5.mp4" type="video/mp4">
                Tarayıcınız video öğesini desteklemiyor.
            </video>
        </div>
        <button id="showImages" class="love-button">💖 Images 💖</button>
    `;
    
    // Yeni oluşturulan butona event listener'ı tekrar ekle
    document.getElementById('showImages').addEventListener('click', showImagesHandler);
});

// Event handler'ı ayrı bir fonksiyon olarak tanımla
function showImagesHandler() {
    const mainMessage = document.getElementById('mainMessage');
    mainMessage.innerHTML = `
        <h2 class="gallery-title">Wrong Photos XD 💖</h2>
        <p class="text-center">Intenté al menos 20 formas de hacerlo muy realista, pero no, la tecnología aún no está tan avanzada. :( </p>
        <div class="photo-grid">
            <img src="fotos/1.png" alt="Foto 1">
            <img src="fotos/3.jpg" alt="Foto 3">
            <img src="fotos/2.jpg" alt="Foto 2">
        </div>
        <div class="button-group">
            <button id="showVideos" class="love-button">💖 Videos 💖</button>

            <button id="goHome" class="love-button">💝 Volver al inicio 💝</button>
        </div>
    `;
    
    // Video butonuna event listener'ı ekle
    document.getElementById('showVideos').addEventListener('click', showVideosHandler);
    
    // Ana sayfaya dönüş butonu için event listener
    document.getElementById('goHome').addEventListener('click', () => {
        location.reload();
    });
}

// Video handler'ını da ayrı bir fonksiyon olarak tanımla
function showVideosHandler() {
    // showVideos event listener içindeki kodları buraya taşı
    const mainMessage = document.getElementById('mainMessage');
    mainMessage.innerHTML = `
        <h2 class="gallery-title">Strange video for you :D 💖</h2>
        <div class="video-section">
            <video controls poster="video-thumbnail.jpg">
                <source src="fotos/5.mp4" type="video/mp4">
                Tarayıcınız video öğesini desteklemiyor.
            </video>
        </div>
        <button id="showImages" class="love-button">💖 Images 💖</button>
    `;
    
    document.getElementById('showImages').addEventListener('click', showImagesHandler);
}

document.getElementById('showImages').addEventListener('click', function() {
    const mainMessage = document.getElementById('mainMessage');
    mainMessage.innerHTML = `
  <!-- Kalpler -->

  <!-- Ana Mesaj -->
    <h2 class="gallery-title">Wrong Photos XD 💖</h2>
         <p class="text-center">Intenté al menos 20 formas de hacerlo muy realista, pero no, la tecnología aún no está tan avanzada. :( </p>

        <!-- Fotoğraf Galerisi -->
        <div class="photo-grid">
            <img src="fotos/1.png" alt="Foto 1">
            <img src="fotos/3.jpg" alt="Foto 3">
            <img src="fotos/2.jpg" alt="Foto 2">
        </div>

        <a href="video.html" class="love-button">💖 Videos 💖</a>

    `;
});


function goBack() {
    location.reload(); // Sayfayı yenileyerek ana mesaja dönüş
}
