const toggleButton = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
} else {
    htmlElement.setAttribute('data-theme', prefersDarkScheme ? 'dark' : 'light');
}

toggleButton.addEventListener('click', () => {
    console.log("Toggle Theme Button Clicked!");

    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});