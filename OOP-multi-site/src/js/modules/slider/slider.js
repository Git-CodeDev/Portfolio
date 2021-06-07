export default class Slider {  //родитель для всех слайдеров
    constructor({container = null,
        btns = null,
        next = null,
        prev = null,
        activeClass = '',
        animate,
        autoplay } = {}) {
        this.container = document.querySelector(container);  //div елемент с главными слайдами - страницами, внутри которых есть еще слайдеры
        try {this.slides = this.container.children;} catch(e){}  //наши слайды (try - фикс ошибки в modules.html)
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelectorAll(prev);
        this.next = document.querySelectorAll(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;  //связанно с движением слайдера
    }
} 

//неудачный фильтр (тем что 0 элемент даже когда был в конце оставался 0, а 1 не становился 0 когда был в начале и тд)
// this.slides = Array.from(this.container.children).filter(elem => elem.tagName !== "BUTTON")  //наши слайды; фильтр: когда true остается в массиве