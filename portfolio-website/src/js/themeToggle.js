const toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
};

const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme + '-theme');
};

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
});