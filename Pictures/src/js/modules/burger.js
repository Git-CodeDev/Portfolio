const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),  //меню
        burgerElem = document.querySelector(burgerSelector);  //кнопка бургера

    menuElem.style.display = 'none';

    burgerElem.addEventListener('click', () => {
        if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {
            menuElem.style.display = 'block';
        } else {
            menuElem.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {  //на случай если открыли гамбургер и повернули планшет обратно
        if (window.screen.availWidth > 992) {
            menuElem.style.display = 'none'
        }
    });
};

export default burger;