document.addEventListener('DOMContentLoaded', () => {
    const roseContainer = document.getElementById('rose-container');
    const message1 = document.getElementById('message1');
    const photo = document.getElementById('photo');
    const message2 = document.getElementById('message2');
    const music = document.getElementById('background-music');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    let currentState = 0;
    const states = [
        () => { // State 0: Initial state, roses falling
            message1.classList.add('hidden');
            photo.classList.add('hidden');
            message2.classList.add('hidden');
            prevBtn.classList.add('hidden');
            nextBtn.classList.remove('hidden');
            nextBtn.textContent = 'Start';
        },
        () => { // State 1: Show message 1
            if (music.paused) music.play();
            message1.classList.remove('hidden');
            photo.classList.add('hidden');
            message2.classList.add('hidden');
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
            nextBtn.textContent = 'Next';
        },
        () => { // State 2: Show photo
            message1.classList.add('hidden');
            photo.classList.remove('hidden');
            message2.classList.add('hidden');
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        },
        () => { // State 3: Show message 2
            photo.classList.add('hidden');
            message2.classList.remove('hidden');
            prevBtn.classList.remove('hidden');
            nextBtn.classList.add('hidden');
        }
    ];

    const updateState = () => {
        states[currentState]();
    };

    nextBtn.addEventListener('click', () => {
        if (currentState < states.length - 1) {
            currentState++;
            updateState();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentState > 0) {
            currentState--;
            updateState();
        }
    });

    // Create falling hearts and roses
    for (let i = 0; i < 50; i++) {
        if (i % 2 === 0) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 3 + 4}s`; // Slower fall
            heart.style.animationDelay = `${Math.random() * 5}s`;
            roseContainer.appendChild(heart);
        } else {
            const rose = document.createElement('div');
            rose.classList.add('rose');
            rose.style.left = `${Math.random() * 100}vw`;
            rose.style.animationDuration = `${Math.random() * 3 + 2}s`;
            rose.style.animationDelay = `${Math.random() * 5}s`;
            roseContainer.appendChild(rose);
        }
    }

    // Initialize
    updateState();
});
