import Slider from './slider';

export default class MiniSlider extends Slider {  //мини слайдеры внутри главного слайдера
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
        this.intervalId = 'none';
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {  //если это слайдер с доп. эфектами
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {  //метод closest помимо ближайшего родителя, может вернуть самого себя если селектор совпадет: т.о. если не кнопка
            this.slides[0].classList.add(this.activeClass);
        }
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {  //когда переключаем слайд вперед нынешний слайд отправляется в конец списка
        if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {  //тк кнопки в 1 массиве со слайдами, то когда они на 2 и 3 позиции мы их переставим (багфикс)
            this.container.appendChild(this.slides[0]);  //перемещаем слайд
            this.container.appendChild(this.slides[0]);  //кнопку за ним
            this.container.appendChild(this.slides[0]);  //вторую кнопку за ним
            this.decorizeSlides();
        } else if (this.slides[1].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }

    bindTriggers() {
        this.next.forEach(btn => btn.addEventListener('click', () => this.nextSlide()));

        this.prev.forEach(btn => btn.addEventListener('click', () => { 
            
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;  //только 1 элемент
                }
            }
        }));
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start; 
        `;
    
        this.bindTriggers();
        this.decorizeSlides();
    
        if (this.autoplay) {
            const startAutoPlay = () => {
                this.intervalId = setInterval(() => this.nextSlide(), 5000);
            }                
            
            [...this.next, ...this.prev, ...this.slides].forEach(item => {  //выкл при наведении мыши на слайдер или кнопки переключения
                item.addEventListener('mouseenter', () => clearInterval(this.intervalId));
                item.addEventListener('mouseleave', () => startAutoPlay());
            })
            

            startAutoPlay();
        }
        } catch(e){}
    }
}