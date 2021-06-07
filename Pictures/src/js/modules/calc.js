const calc = (size, material, options, promocode, result, state) => {
    const sizeBlock = document.querySelector(size),  //блоки (элементы страницы) откуда будем получать значения
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);  //а этот куда мы будем помещать результат

    let sum = 0;

    const calcFunc = () => {  //функция, которая будет срабатывать при выборе элемента пользователем
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value))  //выбор размера * коэф. материала + доп. услуги.
    
        if (size.value == '' || materialBlock.value == '') {  //по условию для вывода цены нужно заполнить хотя бы первые 2 селекта
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
            state["calc-price"] = resultBlock.textContent;
        } else if (promocodeBlock.value === "IWANTPOPART") {  //промокод
            resultBlock.textContent = Math.round(sum * 0.7);
            state["calc-price"] = resultBlock.textContent;
        } else {  //без промокода
            resultBlock.textContent = sum;
            state["calc-price"] = resultBlock.textContent;  //для отправки на сервер
        }
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc