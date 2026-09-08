window.addEventListener('DOMContentLoaded', () => {
    const home = document.querySelector('.home-section');

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            home.classList.add('is-active');
        });
    });
});