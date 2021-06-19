import axios from 'axios';

export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжимся',
            failure: 'Что-то пошло не так...',
        };
    
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        })
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPositoin = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {            //ручной полифил для старых браузеров
                elem.setSelectionRange(pos, pos);    //выделение текста в 1 месте - на деле просто устанавливаем каретку
            } else if (elem.createTextRange) {       //ручной полифил для Enternet Exploer
                let range = elem.createTextRange();  //создание диапозона на основе нашего elemента

                range.collapse(true);                //объеденяет граничные точки диапозона (первую с последней позицией)
                range.moveEnd('character', pos);     //конечная точка выделения текста
                range.moveStart('character', pos);   //начальная (просто устанавливаем каретку)
                range.select();                      //method selects all the text in a <textarea> element or in an <input> element that includes a text field.
            }
        };
    
        function createMask(event) {  //пишем через function ради своего контекста
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),  //статичное значение
                val = this.value.replace(/\D/g, '');  //динамичное значение, работающие на основе того, что ввел пользователь (this - это тот элемент на котором происходит событие (input (value соответственно value input -а))
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {  //берем каждый символ  и передаем его как аргумент в переменную функции ("a")
                //проверяем на то, входит ли а(наш символ) в [диапозон из "_" и цифр]
                //&& если наш итератор < чем кол-во символов в нашем значении value которое уже избавилось от нецифр
                //если это так, то мы возращаем символ из val под индексом i и прибавляем после этого к нему +1
                //если это не так, то: если i >= длинны val, то вернем ничего, а если и это условие не выполнится то просто веренм переданный в функуию символ
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'blur') {                     //если пользователь ушел из инпута
                if (this.value.length == 2) {                //и при этом инпут остался пустым (+1)
                    this.value = '';                         //покажем обратно матрицу
                }  
            } else {                                         //если событие focus или input
                setCursorPositoin(this.value.length, this);  //передадим длинну value и ссылку на сам элемент что щас в работе
            }
        }
    
        let inputs = document.querySelectorAll("[name='phone']");
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData (url, data) {
        let res = await axios
            .post(url, data)

        return await res.data
    }

    init() {
        this.checkMailInputs();
        this.initMask();
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {  //отправка формы
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item)

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}