document.addEventListener('DOMContentLoaded', function() {
    const themeSelect = document.getElementById('theme-select');
    const themeStylesheet = document.getElementById('theme-stylesheet');

    // Basis-Pfad für deine Theme-Dateien
    const themesPath = 'themes/';

    // Funktion zum Anwenden oder Entfernen des Themes
    function applyTheme(themeName) {
        if (themeName === 'default') {
            themeStylesheet.href = '';
        } else {
            const newCssPath = themesPath + themeName + '.css';
            themeStylesheet.href = newCssPath;
        }

        localStorage.setItem('selectedTheme', themeName);
    }

    themeSelect.addEventListener('change', function() {
        const selectedTheme = themeSelect.value;
        applyTheme(selectedTheme);
    });

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);
    } else {
        themeSelect.value = 'default';
        applyTheme('default');
    }
});