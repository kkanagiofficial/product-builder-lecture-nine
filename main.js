document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const numbersContainer = document.getElementById('numbers');
    const themeToggle = document.getElementById('toggle-theme');
    const body = document.body;
    const storedTheme = localStorage.getItem('lotto-theme');

    if (storedTheme === 'dark') {
        body.classList.add('theme-dark');
        themeToggle.setAttribute('aria-pressed', 'true');
        themeToggle.textContent = '라이트 모드';
    }

    generateBtn.addEventListener('click', () => {
        const lottoNumbers = generateLottoNumbers(5);
        displayNumbers(lottoNumbers);
    });

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('theme-dark');
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeToggle.textContent = isDark ? '라이트 모드' : '다크 모드';
        localStorage.setItem('lotto-theme', isDark ? 'dark' : 'light');
    });

    function generateLottoNumbers(setCount) {
        const sets = [];
        for (let i = 0; i < setCount; i += 1) {
            const numbers = new Set();
            while (numbers.size < 6) {
                const randomNumber = Math.floor(Math.random() * 45) + 1;
                numbers.add(randomNumber);
            }
            sets.push(Array.from(numbers).sort((a, b) => a - b));
        }
        return sets;
    }

    function displayNumbers(sets) {
        numbersContainer.innerHTML = '';
        sets.forEach((numbers, index) => {
            const setWrapper = document.createElement('div');
            setWrapper.classList.add('numbers-set');

            const setLabel = document.createElement('span');
            setLabel.classList.add('set-label');
            setLabel.textContent = `세트 ${index + 1}`;
            setWrapper.appendChild(setLabel);

            numbers.forEach(number => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number');
                numberElement.textContent = number;
                setWrapper.appendChild(numberElement);
            });

            numbersContainer.appendChild(setWrapper);
        });
    }
});
