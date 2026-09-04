const menuToggle = document.getElementById("menu-toggle");
menuToggle.addEventListener('change', () => {
    document.body.classList.toggle('menu-open', menuToggle.checked);
});