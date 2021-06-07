export default class ShowInfo {
    constructor (triggers) {
        this.btns = document.querySelectorAll(triggers);
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => { 
                const sibling = btn.closest('.module__info-show').nextElementSibling; //необходимый к показу текст
               
                sibling.classList.toggle('msg');  //тоглим класс для как открытия так и закрытия
                sibling.style.marginTop = '20px';  //если не прописать вручную то потеряется при тогле
            })
        })
    }
}