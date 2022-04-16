const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'PLAYER_SETING';

const player = $('.player');
const playlist = $('.playlist');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))  || {},
    setConfig: function(key, value) {
        this.config[key] = value;
       localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    songs: [
        {
            name: 'Ái Nộ',
            singer: 'Masew',
            path: './assets/music/aino.mp3',
            image: './assets/img/song2.jpg'
        },
        {
            name: 'Tình ca tình ta',
            singer: 'Hiếu',
            path: './assets/music/song8.mp3',
            image: './assets/img/song2.jpg'
        },
        {
            name: 'Album nhạc chill',
            singer: 'Hiếu',
            path: './assets/music/albumchill.mp3',
            image: './assets/img/song2.jpg'
        },
        {
            name: 'Anh luôn là lý do',
            singer: 'Erik',
            path: './assets/music/anhluonlalydo.mp3',
            image: './assets/img/song3.jpg'
        },
        {
            name: 'Sợ rằng em còn biết ',
            singer: 'Juun-D',
            path: './assets/music/sorangembiet.mp3',
            image: './assets/img/song3.jpg'
        },
        
        {
            name: 'Thức giấc',
            singer: 'Dalab',
            path: './assets/music/thucgiac.mp3',
            image: './assets/img/song4.jpg'
        },
        {
            name: 'Đừng chờ anh nữa',
            singer: 'Tăng Phúc',
            path: './assets/music/dungchoanhnua.mp3',
            image: './assets/img/song4.jpg'
        },
        {
            name: 'Thương em là điều anh không thể ngờ',
            singer: 'Noo Phước Thịnh',
            path: './assets/music/thuongemladieu.mp3',
            image: './assets/img/song5.jpg'
        },
        {
            name: 'Chìm Sâu',
            singer: 'MCK',
            path: './assets/music/chimsau.mp3',
            image: './assets/img/song6.jpg'
        },
        {
            name: 'Beat',
            singer: 'Hiếu',
            path: './assets/music/best.mp3',
            image: './assets/img/song7.jpg'
        },
        
        {
            name: 'Những kẻ mộng mơ',
            singer: 'Noo Phước Thịnh',
            path: './assets/music/nhungkemongmo.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Em hát cho ai nghe (remix)',
            singer: 'Hiếu',
            path: './assets/music/emhatchoainghe.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Màu nước mắt',
            singer: 'Hiếu',
            path: './assets/music/maunuocmat.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Bước qua mùa cô đơn',
            singer: 'Hiếu',
            path: './assets/music/buocquamuacodon.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Yêu một người sao buồn đến thế',
            singer: 'Hiếu',
            path: './assets/music/yeumotnguoi.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'rap 151',
            singer: 'Gducky',
            path: './assets/music/151radio.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Hẹn một mai',
            singer: 'Bùi Anh Tuấn',
            path: './assets/music/henmotmai.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Album 3107',
            singer: 'Hiếu',
            path: './assets/music/3107album.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Sau tất cả',
            singer: 'Erik',
            path: './assets/music/sautatca.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Chạy về khóc với anh(remix)',
            singer: 'Erik',
            path: './assets/music/chayvekhocremix.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Badgirl',
            singer: 'Masew',
            path: './assets/music/badgirl.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Nhất Thân',
            singer: 'Masew',
            path: './assets/music/nhatthan.mp3',
            image: './assets/img/song7.jpg'
        },
    
      
    ],
    render: function() {
        const htmls = this.songs.map((song, index) =>{
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ' ' }" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        });
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function() {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,  
            iterations: Infinity 
        });
        cdThumbAnimate.pause();

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;


            cd.style.width = newCdWidth? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };
        
        playBtn.onclick = function() {
            if(_this.isPlaying){
                audio.pause();
            }else{
                audio.play();
            }
        };
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };
        audio.ontimeupdate = function() {
            if(audio.duration){
                const progressPersent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPersent;
            }
        };
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        nextBtn.onclick = function() {
            if(_this.isRandom){
                _this.randomSong();
            }else{
                _this.nextSong();
            }
           
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        prevBtn.onclick = function() {
            if(_this.isRandom){
                _this.randomSong();
            }else{
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRadom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }
        audio.onended = function() {
            if(_this.isRepeat){
                audio.play();
            }else{
                nextBtn.click();
            }
        }
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode || e.target.closest('.option')){
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                if(e.target.closest('.option')){

                };
            }
        }
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300)
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        };

        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        };

        this.loadCurrentSong()
    },
    randomSong: function() {
        let newIndex 
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while(newIndex == this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong();
    },
    start: function() {
        this.loadConfig();
        this.defineProperties()
        this.handleEvents();
        this.loadCurrentSong();
        this.render();

        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    }
}
app.start()