import Slider from './slider';

export default class MainSlider extends Slider {  //MainSlider - главный слайдер меняющий страницу целиком
    constructor(btns, next, prev) {
        super(btns, next, prev);
    }

    showSlides(n) {  //отвечает за то куда двигается наш слайдер
        if (n > this.slides.length) {  //возращаем слайдер в начало при последнем слайде
            this.slideIndex = 1;
        }

        if (n < 1) {  //возрат в конец
            this.slideIndex = this.slides.length
        }

        try {
            this.hanson.style.opacity = '0';  //блок что появляется на 3 слайде через 3 сек
            
            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp')
            }
        }catch(e){}

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {  //отвечает за движение взад вперед
        this.showSlides(this.slideIndex += n);
    }

    bindTruggers() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {  //лого вверху слева
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            })
        });

        this.prev.forEach(item => {
            item.addEventListener('click', (e) => {
                this.plusSlides(-1);
            });
        });

        this.next.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');  //добавляем специфичне свойства (в конструкторе прописано то что должно быть всегда). hanson - блок появляющийся через 3 сек на 3 слайде есть на мейн сайте но не в module, поэтому try
            } catch(e) {}

            this.showSlides(this.slideIndex);
            this.bindTruggers();
        }
    }
}