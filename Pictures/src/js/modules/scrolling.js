const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);  //кнопка перемещения на верх страницы

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {  
            upElem.classList.add('animated', 'fadeIn');  
            upElem.classList.remove('fadeOut'); 
        } else {  
            upElem.classList.add('fadeOut');  
            upElem.classList.remove('fadeIn');
        }
    });

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;  //чем меньше тем быстрее

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,  //позиция элемента относительно viewport (часть страницы, показанная на экране, и которую мы видим).
                start = null;

                document.documentElement.scrollTo(0, 1000);
            requestAnimationFrame(step);

            function step(time) {  //time передается автоматически
                if (start === null) {  //при первом запуске устанавливаем точку отсчета времени
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) :  //отвечает за кол-во пикселей на которое нам необходимо пролистать в течении этой анимации и в какую сторону
                    Math.min(widthTop + progress/speed, widthTop + toBlock));
                
                    document.documentElement.scrollTo(0, r);

                    if (r != widthTop + toBlock) {
                        requestAnimationFrame(step);  //продолжаем
                    } else {
                        location.hash = hash;  //остановка
                    }
            }
        })
    })
};

export default scrolling;
