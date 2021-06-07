const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highLight(item) {  //подсвечивает поле input когда над ним файл
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
    }

    function unhighLight(item) {  //убираем подсвечивание когда пользователь убрал файл из поля
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('.calc_form')) {  //если инпуты на сайте то у них белый фон
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else {item.closest('.file_upload').style.backgroundColor = '#ededed';}
        
    };

    ['dragenter', 'dragover'].forEach(eventName => {  //окраска пока висит файл
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => {highLight(input)}, false)
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {  //убрать окраску при выходе за пределы
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => {unhighLight(input)}, false)
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;  //помещаем то что пользователь мышкой держит в инпут

            let dots;  //точки на случай если имя изображения слишком длинное (от 7 символов)
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;  //div что был "Файл не выбран"
        })
    })
}

export default drop;