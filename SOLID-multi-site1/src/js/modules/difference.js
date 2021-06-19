export default class Difference {
    constructor(oldOfficer, newOfficer, items) {  //левый правый столб и все их карточки
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);  //карточки левого старого блока
            this.newItems = this.newOfficer.querySelectorAll(items);  //правого нового
            this.oldCounter = 0;  //тк при определенном клике нам надо будет удалить кнопку-плюсик
            this.newCounter = 0;
        } catch(e){}
    }

    bindTriggers(container, items, counter) {
        container.querySelector('.plus').addEventListener('click', () => {
            if (counter !== items.length - 2) {  //открывается НЕ последний элемент, -2 тк не считаем 1 из элементов - сам плюсик а второй невидимый
                items[counter].style.display = 'flex';  //показываем след элемент
                counter++;
            } else {
                items[counter].style.display = 'flex';  //последняя карточка что нужно показать
                items[items.length - 1].remove();  //удаляем плюсик
            }
        });
    }

    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {  //кнопка всегда последняя и всегда видема
                item.style.display = 'none';
            }
        });
    }

    init() {
        try {
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems );
            this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
            this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
        } catch(e){}
    }
}