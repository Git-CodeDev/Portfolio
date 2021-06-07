import {postData} from '../services/requests';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]')

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжимся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = ''
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран'  //чистим текст на странице у быстрого заказа
        })
    }

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;  //точки на случай если имя изображения слишком длинное
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;  //div что был "Файл не выбран"
        });
    })

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let statusMessage = document.createElement('div');  //создаем блок куда поместим изображение отображающие статус отправки
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);  //время анимации

            let statusImg = document.createElement('img');  //спинер
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');  //текстовое сообщение к спинеру
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            let api;  //переменная для формирования динамического пути
            item.closest('.popup-design') ? api = path.designer : api = path.question;
            if (item.classList.contains('calc_form')) {  //форма с калькулятором
                for (let key in state) {
                    formData.append(key, state[key]);
                    api = path.question;
                }
            }
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');  
                        item.classList.add('fadeInUp');
                    }, 5000);
                })
        });
    })
};
 
export default forms