const modals = () => {
    let btnPressed;  //флаг на нажал ли пользователь какую-либо кнопку на странице

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {  //при открытии модалки все старые закрываются
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });
    
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
                // document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', () => {  //закрытие модального окна кнопкой
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {  //закрытие при клике на подложку
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = ""; 
                document.body.style.marginRight = `0px`
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll("[data-modal]").forEach(item => {
                if (getComputedStyle(item).display !== 'none') {  //если данная модалка показывается пользователю
                    display = "block"  //var "true"
                }
            })  

            if (!display) {  //if var not "true" - если ни 1 модальное окно не показывается
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";

                let scroll = calcScroll();  //тк эта функция setTimeout переменной scroll у нее нет
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        
        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)  //поддержка старых браузеров

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {  //если пользователь не нажал ни 1 кнопки и долистал до конца
                document.querySelector(selector).click();
            } 
        })
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 6000);
};

export default modals;