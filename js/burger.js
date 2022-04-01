function toggleBurger() {
    let burgerBtn = document.querySelector('.burger-toggle');
    let navPageClose = document.querySelector('.navPage--close');
    let navPage = document.querySelector('.navPage');

    burgerBtn.addEventListener('click',() => {
        navPage.classList.toggle('is_active');
    })
    navPageClose.addEventListener('click',() => {
        navPage.classList.remove('is_active');
    })
}

toggleBurger();