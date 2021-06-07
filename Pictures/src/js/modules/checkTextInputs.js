const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {  //только русские буквы в написании txtInputs (коментариев при заказе и имени человека)
        input.addEventListener('keypress', function(e) {
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }
        })

        input.addEventListener('input', function(e) {
            if (e.data == null || e.data.match(/[^а-яё 0-9]/ig)) {  //No ctrl + v
                input.value = '';
            }
        })
    })
};

export default checkTextInputs;