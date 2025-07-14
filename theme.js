document.addEventListener('DOMContentLoaded', function() {
    // Загружаем сохраненную тему при старте
    let savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        // Обновляем активный класс для кнопки
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.querySelectorAll('.theme-option').forEach(option => option.classList.remove('active'));
            themeToggle.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');
            // Обновляем цвет кнопки тёмной темы
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
            if (savedTheme === 'dark') {
                themeToggle.querySelector('[data-theme="dark"]').style.color = '#C8B6FF';
            } else {
                themeToggle.querySelector('[data-theme="dark"]').style.color = '#6750A4';
            }
        }
    }

    // Отслеживаем изменения темы через MutationObserver
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-theme') {
                let currentTheme = document.body.getAttribute('data-theme');
                localStorage.setItem('theme', currentTheme);
            }
        });
    });

    // Наблюдаем за изменениями атрибута data-theme на body
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
});
