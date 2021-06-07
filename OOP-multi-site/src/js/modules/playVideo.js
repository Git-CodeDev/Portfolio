export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
            try {  //только для modules.html
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;  //элемент который надо разлочить после просмотра 1го видео

                if (i % 2 == 0) {  //после норм кнопки всегда идет задезейбленная
                    blockedElem.setAttribute('data-disabled', 'true')  //помечаем задезейбленный блок внутри которого задезейбленная кнопка data атрибутом
                }
            } catch(e){}

            btn.addEventListener('click', () => {
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== "true") {
                    this.activeBtn = btn;  //для разблокировки видео

                    if (document.querySelector('iframe#frame')) {  //когда хоть 1 раз вызывали плеер до этого
                        this.overlay.style.display = 'flex';
                        if (this.path !== btn.getAttribute('data-url')) {  //плеер вызывался, но ведео другое
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});  //загружаем новое видео при помощи youtube API
                        }
                    } else {
                        this.path = btn.getAttribute('data-url');
                    
                        this.createPlayer(this.  path);
                    }
                }
            })
        });
    }

    bindCloseBtn() {  //закрытие модального окна и стоп видео
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        })
    }

    createPlayer(url) {
        this.player = new YT.Player('frame' , {  //заменяем div элемент с id frame на плеер
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        this.overlay.style.display = 'flex';  //показываем модалку
    }

    onPlayerStateChange(state) {                                                                    //когда изменяется состояние плеера
        try {                                                                                       //только для modules.htnl
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;   //элемент который надо разлочить после просмотра видео
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);                    //svg картинка "▶"
        
            if (state.data === 0) {  //если воспроизведение завершенно
                if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {      //если наш след элем заблокирован (из-за класса closed)
                    blockedElem.querySelector('.play__circle').classList.remove('closed');          //то мы его разблокируем
                    blockedElem.querySelector('svg').remove();                                      //удаляем svg значок замочка
                    blockedElem.querySelector('.play__circle').appendChild(playBtn);                //добавляем svg старт картинку "▶"
                    blockedElem.querySelector('.play__text').textContent = 'play video';
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';
                
                    blockedElem.setAttribute('data-disabled', 'false');  //включаем кнопку
                }
            }
        } catch(e){}
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script');  
            tag.src = "https://www.youtube.com/iframe_api";  //подключение YouTube player api
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);  //ставим скрипт ютуба перед самым первым скриптом на странице
        
            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}