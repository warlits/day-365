const menuToggle = document.getElementById("menu-toggle");
menuToggle.addEventListener('change', () => {
    document.body.classList.toggle('menu-open', menuToggle.checked);
});

const items = document.querySelectorAll('.item');
items.forEach((item) => {
    item.addEventListener('click', () => {
        items.forEach(otherTiles => otherTiles.classList.remove('active'));
        item.classList.add('active');

        document.body.classList.remove('menu-open');
        menuToggle.checked = false;
    })
} )