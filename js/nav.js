document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a");
    const checkBox = document.getElementById("check");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            checkBox.checked = false;
        });
    });
});

document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var dropdown = this.nextElementSibling;
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
});

document.addEventListener('click', function (e) {
    document.querySelectorAll('.dropdown-menu').forEach(function (menu) {
        if (!menu.parentElement.contains(e.target)) {
            menu.style.display = 'none';
        }
    });
});
