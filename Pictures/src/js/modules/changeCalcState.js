const changeCalcState = (state) => {  //для отправки данных с формы с калькулятором
    const size = document.querySelectorAll('#size'),
        material = document.querySelectorAll('#material'),
        options  = document.querySelectorAll('#options');

    function bindActionToElems (event, elem, prop) {
        elem.forEach((item, i) => {
        item.addEventListener(event, () => {
            switch(item.nodeName) {
                case 'SELECT' :
                    state[prop] = item[++i].textContent;  //тк 1ым идет текст
                    break;
                }

                console.log(state)
            });
        });
    }

        bindActionToElems('change', size, 'size');
        bindActionToElems('change', material, 'material');
        bindActionToElems('change', options, 'options');
};

export default changeCalcState