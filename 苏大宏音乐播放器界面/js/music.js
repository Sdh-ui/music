$(function () {

    var audio = $('#audio')[0];

    var songWordsDown = false

    var songArr = localStorage.getItem('songlist');
    songArr = songArr ? JSON.parse(songArr) : []

    var l = songArr.length


    var lovaSongsArr = localStorage.getItem('lovaSongsArr');
    lovaSongsArr = lovaSongsArr ? JSON.parse(lovaSongsArr) : [];

    var loveSongsMsg = localStorage.getItem('loveSongsMsg')
    loveSongsMsg = loveSongsMsg ? JSON.parse(loveSongsMsg) : [];

    var recentSongArr = localStorage.getItem('recentSongArr')
    recentSongArr = recentSongArr ? JSON.parse(recentSongArr) : [];

    var recentSongsMsg = localStorage.getItem('recentSongsMsg')
    recentSongsMsg = recentSongsMsg ? JSON.parse(recentSongsMsg) : [];

    var onLoveId

    var ismove = false

    var first

    var startIndex = 0;
    var lastIndex = 15;


    //本地歌单li
    function addLi(song, sg, box) {
        var li = $(`<li data-id="${song.id}" data-value="0" data-dt="${song.dt / 1000}">
        <div class="lm-img">
            <img class="auto-img" src="${song.al.picUrl}" alt="">
        </div>
        <div class="lm-msg">
            <div class="lm-sn  one-text">${song.name}</div>
            <div class="lm-sg one-text">${sg.join('/')}</div>
        </div>
        <div class="s-time fr clearfix">
                           <div class="dt fl">${formatTime(song.dt / 1000)}</div>
                           <div class="animate fl">
                                <span class="line fl line1"></span>
                                <span class="line fl line2"></span>
                                <span class="line fl line1"></span>
                                <span class="line fl line2"></span>
                           </div>
                        </div>
    </li>`)

        $(box).append(li)
    }

    //歌曲总时长
    var duration = null;

    //是否禁止实时播放状态
    var isChange = false

    //歌词列表
    var songWords;

    var url = 'https://music.163.com/song/media/outer/url?id='

    //获取歌单
    function songlist(songArr, box) {
        // isScoll = false
        $(box).empty()
        // $('.local-list>ul').empty()
        let reallyCount = 0;
        console.log(songArr);
        for (var i = 0; i < songArr.length; i++) {
            // console.log(songArr[i].dt);

            var sg = [];
            for (let j = 0; j < songArr[i].ar.length; j++) {
                sg.push(songArr[i].ar[j].name)
            }
            console.log($('.song-img').data('id'));
            var a = 0
            // console.log(1);
            // console.log($('.listType-list li'));


            for (let j = 0; j < $('.local-list li').length; j++) {
                if ($(box).eq(j).data('id') == songArr[i].id) {


                    a = 1;
                    break

                }
            }
            if (a == 1) {
                i--
                continue
            }




            //重新渲染歌单时播放歌曲的状态
            if ($('.song-img').data('id') && $('.song-img').data('id') == songArr[i].id) {


                addLi(songArr[i], sg, box)
                if ($('.song-play').data('value') == 0) {
                    $(`li[data-id="${songArr[i].id}"]`).find('.line').css({
                        animationPlayState: 'paused'
                    })
                }
                else {
                    $(`li[data-id="${songArr[i].id}"]`).find('.line').css({
                        animationPlayState: 'running'
                    })
                }
                // $('li.mactive').removeClass('mactive')
                $(`li[data-id="${songArr[i].id}"]`).addClass('mactive')
                console.log(1);
            }
            else {
                // $(`li[data-id="${songArr[i].id}"]`).removeClass('mactive')
                console.log(songArr);

                addLi(songArr[i], sg, box)
            }
            reallyCount++
            console.log(reallyCount);
            // console.log($('.listType-list li').length);






        }
        // isScoll = true

    }



    function addSonglist(songArr, box) {
        // isScoll = false
        // $(box).empty()
        // $('.local-list>ul').empty()
        let reallyCount = 0;
        console.log(songArr);
        for (var i = 0; i < songArr.length; i++) {
            // console.log(songArr[i].dt);

            var sg = [];
            for (let j = 0; j < songArr[i].ar.length; j++) {
                sg.push(songArr[i].ar[j].name)
            }
            console.log($('.song-img').data('id'));
            var a = 0
            // console.log(1);
            // console.log($('.listType-list li'));


            for (let j = 0; j < $('.local-list li').length; j++) {
                if ($(box).eq(j).data('id') == songArr[i].id) {


                    a = 1;
                    break

                }
            }
            if (a == 1) {
                i--
                continue
            }




            //重新渲染歌单时播放歌曲的状态
            if ($('.song-img').data('id') && $('.song-img').data('id') == songArr[i].id) {


                addLi(songArr[i], sg, box)
                if ($('.song-play').data('value') == 0) {
                    $(`li[data-id="${songArr[i].id}"]`).find('.line').css({
                        animationPlayState: 'paused'
                    })
                }
                else {
                    $(`li[data-id="${songArr[i].id}"]`).find('.line').css({
                        animationPlayState: 'running'
                    })
                }
                // $('li.mactive').removeClass('mactive')
                $(`li[data-id="${songArr[i].id}"]`).addClass('mactive')
                console.log(1);
            }
            else {
                // $(`li[data-id="${songArr[i].id}"]`).removeClass('mactive')
                console.log(songArr);

                addLi(songArr[i], sg, box)
            }
            reallyCount++
            console.log(reallyCount);
            // console.log($('.listType-list li').length);






        }
        // isScoll = true

    }





    //加载本地音乐
    var one = 0
    function isLocalMusic() {
        console.log(songArr);
        let songs

        if (songArr.length > 0) {
            first = true

            // songArr = JSON.parse(songArr);

            songs = songArr.slice(startIndex, lastIndex);

            startIndex = lastIndex
            lastIndex += 15






            console.log(songs);

            songlist(songs, '.local-list ul')
            $('.local-count').text(songs.length)
            $('.listLocal-count').text(songs.length)
            $('.listlove-count').text(lovaSongsArr.length)
            $('.love-count').text(lovaSongsArr.length)
            $('.listrecent-count').text(recentSongArr.length)
            $('.recent-count').text(recentSongArr.length)


            // startIndex += 15;
            // lastIndex +=  15;

        }

        else {
            first = false
            $.ajax({
                type: 'GET',
                url: 'http://www.arthurdon.top:3000/top/list?idx=1',
                success: function (data) {

                    console.log(songArr);
                    for (var k = 0; k < 15; k++) {
                        console.log(1);

                        var c = 0
                        let song = data.playlist.tracks.slice(startIndex, startIndex + 1)
                        console.log(song);

                        startIndex++
                        for (let b = 0; b < songArr.length; b++) {
                            if (songArr[b].id == song[0].id) {
                                console.log(1);

                                c = 1;

                                break
                            }

                        }
                        if (c == 1) {
                            k = k - 1
                            continue
                        }
                        else {
                            songArr = songArr.concat(song)
                            console.log(songArr);


                        }
                    }
                    console.log(songArr);

                    songlist(songArr, '.local-list ul')
                    localStorage.setItem('songlist', JSON.stringify(songArr));
                    $('.local-count').text(songArr.length)
                    $('.listLocal-count').text(songArr.length)
                    // songArr = data.playlist.tracks.slice(startIndex, lastIndex);

                    startIndex = songArr.length;
                    lastIndex = songArr.length + 15;
                    console.log(data.playlist.tracks.slice(startIndex, lastIndex));
                    if (songArr == null || undefined) {
                        console.log(1);

                        alert('歌曲加载中')
                    }
                    // for(let j = 0;j < songArr.length;j++){

                    //     if(songArr[j].id == 1391477429){
                    //         songArr.splice(j,1)
                    //     console.log(songArr);
                    //     break
                    //     }


                    // }


                }
            })
        }
        console.log(lovaSongsArr.length);








    }

    //格式化时间
    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        minutes = minutes >= 10 ? minutes : '0' + minutes;

        var seconds = Math.floor(time % 60);
        seconds = seconds >= 10 ? seconds : '0' + seconds;

        return minutes + ':' + seconds;
    }

    isLocalMusic()

    //创建歌词
    function creatWord(data, id) {
        songWords = data.lrc.lyric.toString().split(/[\n\r]+/);
        // console.log(songWords);

        $('.Lyrics ul').empty()
        console.log(id);

        $('.Lyrics ul').data('id', id);
        onLoveId = id
        for (let i = 0; i < songWords.length; i++) {


            let word = songWords[i].split(/]/)
            let t = word[0].slice(1).split(':');
            let minutes = t[0];
            let second = t[1];



            time = Number(minutes) * 60 + Number(second)

            if (word[1]) {

                var li = $(`<li data-time="${time}">${word[1]}</li>`);

                $('.Lyrics ul').append(li)
            }
        }
    }
    //获取歌词
    function getWordds(id) {
        $.ajax({
            type: 'GET',
            url: 'http://www.arthurdon.top:3000/lyric?id=' + id,
            success: function (data) {
                console.log(id);



                // console.log(data.lrc.lyric);


                for (let j = 0; j < lovaSongsArr.length; j++) {
                    if (lovaSongsArr[j] == id) {
                        console.log(1);

                        $('.love').css({
                            background: ` url(./images/love.png) no-repeat center center`,
                            backgroundSize: `.5rem .5rem`
                        })

                        creatWord(data, id)

                        return
                    }
                }
                creatWord(data, id)
                $('.love').css({
                    background: ` url(./images/no-love.png) no-repeat center center`,
                    backgroundSize: `.5rem .5rem`
                })





            }
        })
    }

    //切换上下首
    function changeSong(data = 0) {
        let val = $('.menu').data('value');
        let index = $('.local-list').find('.mactive').index()
        let id
        console.log($('.mactive').find('.line'));

        $('.mactive').find('.line').css({
            animationPlayState: 'paused'
        })
        $('.mactive').removeClass('mactive');
        if (val == 1 || val == 2) {


            if (data == 1) {
                if (index == $('.local-list li').length - 1) {

                    $($('.local-list li')[0]).addClass('mactive')
                    id = $('.mactive').data('id')

                } else {
                    index++
                    $('.local-list li').eq(index).addClass('mactive')
                    id = $('.mactive').data('id')
                }

            }
            else {
                if (index == 0) {

                    $($('.local-list li')[$('.local-list li').length - 1]).addClass('mactive')
                    id = $('.mactive').data('id')

                } else {
                    index--
                    $('.local-list li').eq(index).addClass('mactive')
                    id = $('.mactive').data('id')
                }
            }

        }
        else {
            let random = Math.floor(Math.random() * $('.local-list li').length);
            $('.local-list li').eq(random).addClass('mactive')
            id = $('.mactive').data('id')

        }

        let atvMusic = $('.mactive')
        atvMusic.find('.animate>.line').css({
            animationPlayState: 'running'
        })
        var src = atvMusic.find('.lm-img>img').attr('src')
        console.log(src);

        audio.src = url + id;
        audio.play();
        $('.songName>div').text(atvMusic.find('.lm-sn').text())
        $('.song-name').text(atvMusic.find('.lm-sn').text())
        $('.singer-name').text(atvMusic.find('.lm-sg').text())
        $('.song-img').data('id', id)


        $('.song-img').css({
            background: `url(${src}) no-repeat center center`,
            backgroundSize: 'cover'
        })
        getWordds(id)
        recentSongs(id)
        isRecentSongs()
        $('.recent-count').text(recentSongArr.length)
    }

    //加载收藏音乐
    function isLoveSongs() {
        if (loveSongsMsg) {


            // loveSongsMsg = loveSongsMsg.slice(startIndex, lastIndex);
            songlist(loveSongsMsg, '.love-list ul')

            // $('.listType-count').text(loveSongsMsg.length)
            // $('.love-count').text(loveSongsMsg.length)

            // startIndex = loveSongsMsg.length;
            // lastIndex = loveSongsMsg.length + 15;

        }


    }

    //存储最近播放
    function recentSongs(id) {

        if (recentSongArr.length == 0) {
            recentSongArr.unshift(id)
            localStorage.setItem('recentSongArr', JSON.stringify(recentSongArr));
            for (let i = 0; i < songArr.length; i++) {
                if (id == songArr[i].id) {

                    recentSongsMsg.unshift(songArr[i]);
                    localStorage.setItem('recentSongsMsg', JSON.stringify(recentSongsMsg))



                    break
                }

            }
            return

        }
        for (let i = 0; i < recentSongArr.length; i++) {
            if (id == recentSongArr[i]) {

                recentSongArr.splice(i, 1);
                recentSongArr.unshift(id)
                localStorage.setItem('recentSongArr', JSON.stringify(recentSongArr))
                for (let i = 0; i < songArr.length; i++) {
                    if (id == songArr[i].id) {
                        for (let k = 0; k < recentSongsMsg.length; k++) {
                            if (recentSongsMsg[k].id == id) {
                                recentSongsMsg.splice(k, 1);
                                recentSongsMsg.unshift(songArr[i]);
                                localStorage.setItem('recentSongsMsg', JSON.stringify(recentSongsMsg))
                                // localStorage.setItem('recentSongsMsg', JSON.stringify(recentSongsMsg))
                                return
                            }
                        }
                        recentSongsMsg.unshift(songArr[i]);
                        localStorage.setItem('recentSongsMsg', JSON.stringify(recentSongsMsg))



                        return
                    }

                }

            }
        }

        console.log(1);

        recentSongArr.unshift(id)
        localStorage.setItem('recentSongArr', JSON.stringify(recentSongArr))
        for (let i = 0; i < songArr.length; i++) {
            if (id == songArr[i].id) {
                for (let k = 0; k < recentSongsMsg.length; k++) {
                    if (recentSongsMsg[k].id == id) {
                        recentSongsMsg.splice(k, 1);
                        recentSongsMsg.unshift(songArr[i]);
                        localStorage.setItem('recentSongsMsg', JSON.stringify(recentSongsMsg))
                        // localStorage.setItem('recentSongsMsg', JSON.stringify(recentSongsMsg))
                        return
                    }
                }
                recentSongsMsg.unshift(songArr[i]);
                localStorage.setItem('recentSongsMsg', JSON.stringify(recentSongsMsg))



                return
            }

        }
    }







    //加载最近音乐
    function isRecentSongs() {
        if (recentSongsMsg) {

            songlist(recentSongsMsg, '.recent-list ul')

        }


    }





    //音频播放结束
    audio.onended = function () {
        $('.mactive').find('.line').css({
            animationPlayState: 'paused'
        })
        $('.song-play').data('value', 0)
        $('.song-play').css({
            background: `url(./images/song-play.png) no-repeat center center`,
            backgroundSize: 'cover'
        })
        $('.startTOP').data('value', 0)
        $('.startTOP').css({
            background: `url(./images/play-song.png) center center / cover no-repeat`,
            width: `0.6rem`,
            height: `0.6rem`,
            left: `0.05rem`,
            top: `-.8rem`
        })

        let val = $('.menu').data('value');
        let index = $('.local-list').find('.mactive').index()
        let id
        if (val == 1) {
            id = $('.mactive').data('id')
            // audio.src = url + id;
            // audio.play();


        }
        else {
            $('.mactive').find('.line').css({
                animationPlayState: 'paused'
            })
            $('.mactive').removeClass('mactive')

            if (val == 2) {


                if (index == $('.local-list li').length - 1) {

                    $($('.local-list li')[0]).addClass('mactive')
                    id = $($('.local-list li')[0]).data('id')



                } else {
                    index++
                    $('.local-list li').eq(index).addClass('mactive')
                    id = $('.local-list li').eq(index).data('id')



                }

            }
            else {

                let random = Math.floor(Math.random() * $('.local-list li').length);
                $('.local-list li').eq(random).addClass('mactive')

                id = $('.local-list li').eq(random).data('id')


            }

        }






        $('.recent-list').find(`li[data-id="${id}"]`).addClass('mactive')
        let atvMusic = $('.local-list').find('li.mactive').length == 1 ? $('.local-list').find('li.mactive') : $('.recent-list').find('li.mactive')




        var src = atvMusic.find('.lm-img>img').attr('src')
        $('.song-img').css({
            background: `url(${src}) no-repeat center center`,
            backgroundSize: 'cover'
        })
        $('.song-img').data('id', id)
        audio.src = url + id;

        $('.songName>div').text(atvMusic.find('.lm-sn').text())

        $('.song-name').text(atvMusic.find('.lm-sn').text())

        $('.singer-name').text(atvMusic.find('.lm-sg').text())
        getWordds(id)


        recentSongs(id)
        isRecentSongs()



        $('.recent-count').text(recentSongArr.length)
        let timer = setTimeout(function () {

            $('.startTOP').css({
                background: `url(./images/stop.png) no-repeat center center`,
                backgroundSize: 'cover',
                width: `.8rem`,
                height: `.8rem`,
                left: 0,
                top: `-.9rem`
            })
            $('.startTOP').data('play', 1);
            audio.play();
        }, 800)



    }


    //音频可以播放触发
    audio.oncanplay = function () {

        ismove = true
        // duration = this.duration;
        $('.duration').text(formatTime($('li.mactive').data('dt')));

        $('.mactive').find('.animate>.line').css({
            animationPlayState: 'running'
        })
        $('.song-play').data('value', 1)
        $('.song-play').css({
            background: `url(./images/song-stop.png) no-repeat center center`,
            backgroundSize: 'cover'
        })
        $('.startTOP').data('value', 1)
        $('.startTOP').css({
            background: `url(./images/stop.png) no-repeat center center`,
            backgroundSize: 'cover'
        })
        $('.song-img').css({
            animationPlayState: 'running'
        })




        var $liActive = $('.local-list').find('.mactive');


        if ($liActive.length == 0) {
            $liActive = $('.love-list').find('.mactive')
        }
        console.log($liActive);

        //获取歌词
        if ($liActive.length !== 0) {
            let id = $liActive.data('id');
            console.log(id);

            getWordds(id)
        }


    }



    var songProWidth = $('.song-progress').width();
    console.log(songProWidth);

    var songMaskWidth = $('.song-mask').outerWidth();



    //滑块移动范围
    var minLeft = 0;




    //获取未激活进度条宽度
    var ProgressW = 0
    var $mask = $('.mask');
    var MaskW;
    var maxLeft;



    $('.song-img').on('click', function () {
        $('.love-box').hide();
        $('.recent-box').hide();
        // $('.recent-nav').hide()
        $('.home').hide()
        $('.local-box').hide();
        $('.bg-bottom').hide()
        $('.music-box').show();

        // $('.local-nav').hide();
        // $('.love-nav').hide();
        ProgressW = $('.progress').width()
        $mask = $('.mask');
        console.log(ProgressW);

        MaskW = $mask.outerWidth();
        maxLeft = ProgressW - MaskW;
        var $liActive = $('.local-list').find('.mactive');


        if ($liActive.length == 0) {
            $liActive = $('.love-list').find('.mactive')
        }
        if ($liActive.length == 0) {
            $liActive = $('.recent-list').find('.mactive')
        }
        console.log($liActive);

        //获取歌词
        if ($liActive.length !== 0) {
            let id = $liActive.data('id');
            console.log(id);

            getWordds(id)
        }



    })


    let t = parseInt($('.Lyrics>ul').css('top'))

    var sss = 0
    //监听音频实时变化
    audio.ontimeupdate = function () {
        console.log(this.currentTime);

        var list = $('.Lyrics').find('li')

        var height = list.eq(0).outerHeight(true)
        if (!isChange) {

            $('.currentTime').text(formatTime(audio.currentTime));


            let percent = audio.currentTime / $('li.mactive').data('dt');


            $mask.css({
                left: percent * maxLeft + 'px'
            })

            $('.progress-active').css({
                width: percent * maxLeft + 'px'
            })

            $('.song-mask').css({
                left: percent * (songProWidth - songMaskWidth) + 'px'
            })

            $('.song-progress-active').css({
                width: percent * (songProWidth - songMaskWidth) + 'px'
            })


        }



        // if(songWordsDown){
        //     t += 200
        // }else{
        //     t = t
        // }
        // t = songWordsDown ? t : t + 200

        for (var i = 0; i < list.length; i++) {

            $('.liActive').removeClass('liActive')

            var prevTime = list.eq(i).data('time');
            var nextTime = list.eq(i + 1).data('time');



            if (i + 1 == list.length) {
                nextTime = Number.MAX_VALUE;
            }

            if (this.currentTime >= prevTime && this.currentTime < nextTime) {



                list.eq(i).addClass('liActive');
                // let timer = setTimeout(() => {
                $('.Lyrics ul').animate({
                    top: t - height * i + 'px'
                }, 0)
                // clearTimeout(timer)
                // },500)




                break;
            }

        }
        var src = $('.mactive').find('.lm-img>img').attr('src')
        $('.songPtc').css({
            background: `url(${src}) no-repeat center center`,
            backgroundSize: 'cover'
        })
    }




    //滑块移动
    function move(e) {
        //获取触碰屏幕X坐标
        var x = e.targetTouches[0].pageX;

        console.log('x ==> ', x);

        //获取当前元素距离屏幕最左端的距离
        var offsetLeft = $(this).offset().left;
        console.log('offsetLeft ==> ', offsetLeft);

        var left = x - offsetLeft - MaskW / 2;

        left = left >= maxLeft ? maxLeft : left <= minLeft ? minLeft : left;

        $mask.css({
            left: left + 'px'
        })

        //激活进度条的宽度
        var w = x - offsetLeft;
        w = w >= progressWidth ? progressWidth : w <= 0 ? 0 : w;
        $('.progress-active').css({
            width: w + 'px'
        })
    }


    var returnWhere = 0
    $('.return').on('click', function () {
        // $('.home').hide()
        $('.music-box').hide();
        $('.bg-bottom').show()
        if (returnWhere == 0) {
            // $('.local-nav').show()
            $('.local-box').show();
        } else if (returnWhere == 1) {
            $('.love-box').show();
            // $('.love-nav').show();
        } else {
            $('.recent-box').show();
            // $('.recent-nav').show();
        }




        // $('.local-box').hide();
    })





    $('.local-return').on('click', function () {
        $('.local-box').hide();
        $('.music-box').hide();
        $('.home').show()
        $('.bg-bottom').show()
        $('.love-box').hide();
    })
    $('.love-return').on('click', function () {
        returnWhere = 1
        $('.local-box').hide();
        $('.love-box').hide();
        $('.music-box').hide();
        $('.home').show()
        $('.bg-bottom').show()
    })
    $('.recent-return').on('click', function () {
        returnWhere = 2
        $('.local-box').hide();
        $('.recent-box').hide();
        $('.music-box').hide();
        $('.home').show()
        $('.bg-bottom').show()
    })



    $('.local-li').on('click', function () {
        $('.home').hide();
        $('.love-box').hide();
        $('.local-box').show();
        returnWhere = 0


        startIndex = 0;



        for (let i = 0; i < $('.local-list li').length; i++) {
            if ($('.song-img').data('id') && $('.song-img').data('id') == $($('.local-list li')[i]).data('id')) {

                if ($('.song-play').data('value') == 0) {
                    $(`li[data-id="${songArr[i].id}"]`).find('.line').css({
                        animationPlayState: 'paused'
                    })
                }
                else {
                    $(`li[data-id="${songArr[i].id}"]`).find('.line').css({
                        animationPlayState: 'running'
                    })
                }

                $($('.local-list li')[i]).addClass('mactive')

                break
            }
        }



        $('.local-list').data('value', 0)



        if ($('.local-list li').length > 100) {

            return
        }









    })

    $('.love-li').on('click', function () {
        returnWhere = 1
        // isLoveSongs()
        $('.home').hide()
        $('.love-box').show();
        $('.love-nav').show();



        $('.love-title').text('我的收藏')
        isLoveSongs()

    })
    $('.recent-li').on('click', function () {
        returnWhere = 2
        // isrecentSongs()
        $('.home').hide()
        $('.recent-box').show();
        $('.recent-nav').show();



        $('.recent-title').text('最近播放')
        isRecentSongs()

    })



    $('.local-list>ul').on('click', 'li', function () {
        if ($(this).data('id') == $('.mactive').data('id')) {
            return;
        }
        ismove = false



        var id = $(this).data('id')
        console.log(id);

        recentSongs(id)
        $('.recent-count').text(recentSongArr.length)
        $('.listrecent-count').text(recentSongArr.length)

        duration = $(this).data('dt')

        $(this).data('value', 1);
        $('.startTOP').data('value', 1)
        $('.song-play').data('value', 1)


        $('li.mactive').find('.line').css({
            animationPlayState: 'paused'
        })
        $('li.mactive').removeClass('mactive')
        $(this).addClass('mactive')



        var src = $(this).find('.lm-img>img').attr('src')
        audio.src = url + id;
        audio.play();

        $('.song-play').css({
            background: `url(./images/song-stop.png) no-repeat center center`,
            backgroundSize: 'cover'
        })

        $('.startTOP').css({
            background: `url(./images/stop.png) no-repeat center center`,
            backgroundSize: 'cover',
            width: `.8rem`,
            height: `.8rem`,
            left: 0,
            top: `-.9rem`
        })

        $('.song-name').text($(this).find('.lm-sn').text())
        $('.songName>div').text($(this).find('.lm-sn').text())
        $('.singer-name').text($(this).find('.lm-sg').text())


        $('.song-img').data('id', id)
        console.log($('.song-img').data('id'));

        $('.song-img').css({
            background: `url(${src}) no-repeat center center`,
            backgroundSize: 'cover'
        })
        $('.song-name').text()






    })
    $('.recent-list>ul').on('click', 'li', function () {
        if ($(this).data('id') == $('.mactive').data('id')) {
            return;
        }
        ismove = false

        var id = $(this).data('id')

        $(this).data('value', 1);
        $('.startTOP').data('value', 1)
        $('.song-play').data('value', 1)


        $('li.mactive').find('.line').css({
            animationPlayState: 'paused'
        })
        $('li.mactive').removeClass('mactive')
        $(this).addClass('mactive')



        var src = $(this).find('.lm-img>img').attr('src')
        audio.src = url + id;
        audio.play();

        $('.song-play').css({
            background: `url(./images/song-stop.png) no-repeat center center`,
            backgroundSize: 'cover'
        })

        $('.startTOP').css({
            background: `url(./images/stop.png) no-repeat center center`,
            backgroundSize: 'cover',
            width: `.8rem`,
            height: `.8rem`,
            left: 0,
            top: `-.9rem`
        })

        $('.song-name').text($(this).find('.lm-sn').text())
        $('.songName>div').text($(this).find('.lm-sn').text())
        $('.singer-name').text($(this).find('.lm-sg').text())

        // duration = $(this).find('.dt').text()
        $('.song-img').data('id', id)
        console.log($('.song-img').data('id'));

        $('.song-img').css({
            background: `url(${src}) no-repeat center center`,
            backgroundSize: 'cover'
        })

        recentSongs(id)
        isRecentSongs()
        $('.recent-count').text(recentSongArr.length)
        $('.listrecent-count').text(recentSongArr.length)




    })
    $('.love-list>ul').on('click', 'li', function () {
        if ($(this).data('id') == $('.mactive').data('id')) {
            return;
        }
        ismove = false

        var id = $(this).data('id')

        $(this).data('value', 1);
        $('.startTOP').data('value', 1)
        $('.song-play').data('value', 1)


        $('li.mactive').find('.line').css({
            animationPlayState: 'paused'
        })
        $('li.mactive').removeClass('mactive')
        $(this).addClass('mactive')



        var src = $(this).find('.lm-img>img').attr('src')
        audio.src = url + id;
        audio.play();

        $('.song-play').css({
            background: `url(./images/song-stop.png) no-repeat center center`,
            backgroundSize: 'cover'
        })

        $('.startTOP').css({
            background: `url(./images/stop.png) no-repeat center center`,
            backgroundSize: 'cover',
            width: `.8rem`,
            height: `.8rem`,
            left: 0,
            top: `-.9rem`
        })

        $('.song-name').text($(this).find('.lm-sn').text())
        $('.songName>div').text($(this).find('.lm-sn').text())
        $('.singer-name').text($(this).find('.lm-sg').text())

        // duration = $(this).find('.dt').text()
        $('.song-img').data('id', id)
        console.log($('.song-img').data('id'));

        $('.song-img').css({
            background: `url(${src}) no-repeat center center`,
            backgroundSize: 'cover'
        })
        // $('.song-name').text()


        // for (let i = 0; i < recentSongArr.length; i++) {
        //     if (id == recentSongArr[i]) {
        //         return
        //     }
        // }
        // recentSongArr.unshift(id)
        // localStorage.setItem('recentSongArr', JSON.stringify(recentSongArr))

        // for (let i = 0; i < songArr.length; i++) {
        //     if (id == songArr[i].id) {
        //         recentSongsMsg.unshift(songArr[i]);
        //         localStorage.setItem('recentSongsMsg', JSON.stringify(recentSongsMsg))
        //         break
        //     }
        // }
        recentSongs(id)
        $('.recent-count').text(recentSongArr.length)
        $('.listrecent-count').text(recentSongArr.length)




    })

    $('.song-play').on('click', function () {
        if (!audio.src) {
            console.log('没有音频文件');
            return
        }
        if ($(this).data('value') == 1) {

            $('.song-play').css({
                background: `url(./images/song-play.png) no-repeat center center`,
                backgroundSize: 'cover'
            })
            $('.startTOP').css({
                background: `url(./images/play-song.png) center center / cover no-repeat`,
                width: `0.6rem`,
                height: `0.6rem`,
                left: `0.05rem`,
                top: `-.8rem`
            })
            $(this).data('value', 0);
            $('.startTOP').data('value', 0);
            $('.local-box').find('.mactive .line').css({
                animationPlayState: 'paused'
            })
            $('.love-box').find('.mactive .line').css({
                animationPlayState: 'paused'
            })
            $('.recent-box').find('.mactive .line').css({
                animationPlayState: 'paused'
            })
            audio.pause()
            $('.song-img').css({
                animationPlayState: 'paused'
            })
            $('.songPtc').css({
                animationPlayState: 'paused'
            })
        }
        else {

            $('.song-play').css({
                background: `url(./images/song-stop.png) no-repeat center center`,
                backgroundSize: 'cover'
            })
            $('.startTOP').css({
                background: `url(./images/stop.png) no-repeat center center`,
                backgroundSize: 'cover',
                width: `.8rem`,
                height: `.8rem`,
                left: 0,
                top: `-.9rem`
            })

            $(this).data('value', 1)
            $('.startTOP').data('value', 1)
            $('.local-box').find('.mactive .line').css({
                animationPlayState: 'running'
            })
            $('.love-box').find('.mactive .line').css({
                animationPlayState: 'running'
            })
            $('.recent-box').find('.mactive .line').css({
                animationPlayState: 'running'
            })
            audio.play()
            $('.song-img').css({
                animationPlayState: 'running'
            })
            $('.songPtc').css({
                animationPlayState: 'running'
            })
        }
    })

    $('.startTOP').on('click', function () {


        if (audio.src) {
            if ($(this).data('value') == 1) {
                $('.song-img').css({
                    animationPlayState: 'paused'
                })
                $('.song-play').css({
                    background: `url(./images/song-play.png) no-repeat center center`,
                    backgroundSize: 'cover'
                })
                $('.startTOP').css({
                    background: `url(./images/play-song.png) center center / cover no-repeat`,
                    width: `0.6rem`,
                    height: `0.6rem`,
                    left: `0.05rem`,
                    top: `-.8rem`
                })
                $(this).data('value', 0);
                $('.song-play').data('value', 0);
                $('.local-box').find('.mactive .line').css({
                    animationPlayState: 'paused'
                })
                $('.love-box').find('.mactive .line').css({
                    animationPlayState: 'paused'
                })
                $('.recent-box').find('.mactive .line').css({
                    animationPlayState: 'paused'
                })
                $('.songPtc').css({

                    animationPlayState: 'paused'
                })
                audio.pause()
            }
            else {

                $('.song-play').css({
                    background: `url(./images/song-stop.png) no-repeat center center`,
                    backgroundSize: 'cover'
                })
                $('.startTOP').css({
                    background: `url(./images/stop.png) no-repeat center center`,
                    backgroundSize: 'cover',
                    width: `.8rem`,
                    height: `.8rem`,
                    left: 0,
                    top: `-.9rem`
                })
                $(this).data('value', 1)
                $('.song-play').data('value', 1)
                $('.local-box').find('.mactive .line').css({
                    animationPlayState: 'running'
                })
                $('.love-box').find('.mactive .line').css({
                    animationPlayState: 'running'
                })
                $('.recent-box').find('.mactive .line').css({
                    animationPlayState: 'running'
                })



                audio.play()
                $('.song-img').css({
                    animationPlayState: 'running'
                })
                $('.songPtc').css({

                    animationPlayState: 'running'
                })
            }
        }
    })

    var songMaskW = $('.song-mask').outerWidth()
    var songProgressW = $('.song-progress').width();


    var songMaskLeft
    var songActiveWidth
    var MaskLeft
    var ActiveWidth
    var percent
    var isTouchStart = true;
    var currentTime

    function touchenEventA(e) {
        var minWidth = 0;
        var maxWidth = ProgressW - MaskW;

        var offsetLeft = $('.layer').offset().left;
        MaskLeft = e.touches[0].pageX - offsetLeft - MaskW / 2;
        ActiveWidth = e.touches[0].pageX - offsetLeft - MaskW / 2;


        MaskLeft = MaskLeft <= minWidth ? minWidth : MaskLeft >= maxWidth ? maxWidth : MaskLeft
        ActiveWidth = ActiveWidth <= minWidth ? minWidth : ActiveWidth >= maxWidth ? maxWidth : ActiveWidth
        // console.log(left);
        $('.mask').css({
            left: MaskLeft + 'px'
        })
        $('.progress-active').css({
            width: ActiveWidth + 'px'
        })

        // console.log(percent * max);
        percent = ActiveWidth / maxWidth;
        currentTime = percent * $('li.mactive').data('dt');
        console.log(percent * $('li.mactive').data('dt'));
        if (typeof currentTime !== Number) {
            console.log(1);
            return

        }

        audio.currentTime = currentTime
        // console.log(currentTime);





    }
    function touchenEventB(e) {
        var songMinWidth = 0;
        var songMaxWidth = songProgressW - songMaskW;

        var offsetLeft = $('.song-layer').offset().left;
        songMaskLeft = e.touches[0].pageX - offsetLeft - songMaskW / 2;
        songActiveWidth = e.touches[0].pageX - offsetLeft - songMaskW / 2;


        songMaskLeft = songMaskLeft <= songMinWidth ? songMinWidth : songMaskLeft >= songMaxWidth ? songMaxWidth : songMaskLeft
        songActiveWidth = songActiveWidth <= songMinWidth ? songMinWidth : songActiveWidth >= songMaxWidth ? songMaxWidth : songActiveWidth
        // console.log(left);
        $('.song-mask').css({
            left: songMaskLeft + 'px'
        })

        $('.song-progress-active').css({
            width: songActiveWidth + 'px'
        })
        if (typeof currentTime !== Number) {
            console.log(1);
            return

        }
        percent = songActiveWidth / songMaxWidth;
        currentTime = percent * $('li.mactive').data('dt');
        console.log(percent * $('li.mactive').data('dt'));
        if (typeof currentTime !== Number) {
            console.log(1);
            return

        }

        audio.currentTime = currentTime


        // audio.currentTime = currentTime





    }


    $('.song-layer').on('touchstart', function (e) {
        // console.log( audio.onplay);

        if (!isTouchStart || ismove == false) {
            return;
        }
        console.log(ismove);

        isChange = true;

        touchenEventA(e)
        touchenEventB(e)

    })

    $('.song-layer').on('touchend', function () {
        if (ismove == false) {
            console.log(1);

            return
        }
        console.log(ismove);



        var minWidth = 0;
        var maxWidth = songProgressW - songMaskW;

        percent = songActiveWidth / maxWidth;
        console.log(duration);

        audio.currentTime = percent * $('li.mactive').data('dt')
        isChange = false;
        isTouchStart = true;

    })

    $('.song-layer').on('touchmove', function (e) {
        if (ismove == false) {
            return
        }
        console.log(ismove);

        touchenEventA(e)
        touchenEventB(e)
        isChange = true
        isTouchStart = false;
    })

    $('.layer').on('touchstart', function (e) {
        if (!isTouchStart || ismove == false) {
            console.log(1);

            return;
        }
        console.log(1);

        isChange = true;

        touchenEventA(e)
        touchenEventB(e)
    })
    $('.layer').on('touchend', function () {
        if (ismove == false) {
            return
        }



        var minWidth = 0;
        var maxWidth = ProgressW - MaskW;

        percent = ActiveWidth / maxWidth;
        console.log(duration);

        audio.currentTime = percent * $('li.mactive').data('dt')
        isChange = false;
        isTouchStart = true;

    })

    $('.layer').on('touchmove', function (e) {
        if (ismove == false) {
            return
        }
        console.log(ismove);

        touchenEventA(e)
        touchenEventB(e)
        isChange = true
        isTouchStart = false;
    })
    var startPageY
    var endPageY


    $('.menu').on('click', function () {
        let val = $(this).data('value')
        if (val == 3) {
            val = 1
            $(this).data('value', val).css({
                background: ` url(./images/${val}.png) no-repeat center center`,
                backgroundSize: `.5rem .5rem`
            })
        } else {
            val += 1
            $(this).data('value', val).css({
                background: ` url(./images/${val}.png) no-repeat center center`,
                backgroundSize: `.5rem .5rem`
            })
        }
    })

    $('.after').on('click', function () {
        if (!onLoveId) {
            return;
        }
        changeSong(1)
    })

    $('.next-song').on('click', function () {
        if (!onLoveId) {
            return;
        }

        changeSong(1)
    })
    $('.before').on('click', function () {
        if (!onLoveId) {
            return;
        }
        changeSong()
    })
    let timers = [];

    //   let count = 0;
    console.log($('.local-list').data('value'));


    $('.local-list').on('scroll', function (e) {
        if ($('.local-list').find('ul>li').length >= songArr.length && songArr.length >= 100) {
            return
        }

        // isAddLocalMusic = false

        // console.log($(this).find('ul>li').last().offset().top);
        console.log(songArr.length);
        // if($('.listType-list li'))
        //  if(count > 0 && !isScoll){
        //      console.log(1);
        //      return

        //  }
        //  count++
        console.log($('.local-list').data('value'));

        // if ($('.local-list').data('value') != 0) {
        //     console.log(1);

        //     return
        // }

        let timer = setTimeout(() => {


            for (let i = 1; i < timers.length; i++) {
                clearTimeout(timers[i])

            }

            timers = []


            let top = $('.local-list').find('ul>li').last().offset().top
            console.log(top);
            let h = parseInt($('html').css('fontSize')) * 11
            console.log(h);

            if (!top) {
                return
            }




            if (top < h) {
                console.log(1);




                if (first && $('.local-list').find('ul>li').length <= songArr.length && songArr.length > 100) {


                    let currentSongs
                    console.log($('.local-list').find('ul>li').length);

                    if ($('.local-list').find('ul>li').length + 15 > songArr.length && $('.local-list').find('ul>li').length < songArr.length) {

                        currentSongs = songArr.slice($('.local-list').find('ul>li').length, songArr.length)

                    }
                    else {
                        currentSongs = songArr.slice($('.local-list').find('ul>li').length, $('.local-list').find('ul>li').length + 15);
                    }

                    addSonglist(currentSongs, '.local-list ul');
                    console.log(1);



                    $('.local-count').text($('.local-list li').length)
                    $('.listLocal-count').text($('.local-list li').length)

                }




                else {
                    console.log($('.local-list').find('ul>li').length);
                    let index = $('.local-list').find('ul>li').length
                    console.log($('.local-list').find('ul>li').length);


                    console.log(index);
                    if ($('.local-list').find('ul>li').length < songArr.length) {
                        let currentSongs
                        console.log($('.local-list').find('ul>li').length);

                        if ($('.local-list').find('ul>li').length + 15 > songArr.length && $('.local-list').find('ul>li').length < songArr.length) {

                            currentSongs = songArr.slice($('.local-list').find('ul>li').length, songArr.length)

                        }
                        else {
                            currentSongs = songArr.slice($('.local-list').find('ul>li').length, $('.local-list').find('ul>li').length + 15);
                        }

                        addSonglist(currentSongs, '.local-list ul');
                        console.log(1);



                        $('.local-count').text($('.local-list li').length)
                        $('.listLocal-count').text($('.local-list li').length)
                    }

                   else{
                    $.ajax({
                        type: 'GET',
                        url: 'http://www.arthurdon.top:3000/top/list?idx=1',
                        success: function (data) {
                            console.log(songArr);
                            console.log(startIndex);
                            console.log(lastIndex);
                            // console.log(data.playlist.tracks);
                            if ($('.local-list').find('ul>li').length > 100) {
                                console.log(322);

                                return
                            }


                            let songs = []
                            for (let k = 0; k < 15; k++) {

                                var c = 0
                                let song = data.playlist.tracks.slice($('.local-list').find('ul>li').length + k, $('.local-list').find('ul>li').length + k + 1)
                                console.log($('.local-list').find('ul>li').length);

                                // startIndex++
                                for (let b = 0; b < songArr.length; b++) {
                                    if (songArr[b].id == song[0].id) {
                                        c = 1
                                        break
                                    }

                                }
                                if (c == 1) {
                                    continue
                                }
                                else {
                                    // songArr = songArr.concat(song)
                                    songs = songs.concat(song)

                                    if (index >= songArr.length && songArr.length >= 100) {

                                        index = songArr.length;
                                        songs = songArr.slice(0, index);
                                        console.log(songs);

                                        break
                                    }

                                    // songs = songArr.slice(0, index);
                                    console.log(songs);





                                }
                            }
                            // songlists = [].concat(songs)



                            console.log(songs);
                            songArr = songArr.concat(songs)
                            addSonglist(songs, '.local-list ul')

                            localStorage.setItem('songlist', JSON.stringify(songArr));

                            // lastIndex += 15;
                            // console.log(data.playlist.tracks.slice(startIndex, lastIndex));
                            if (songArr == null || undefined) {
                                console.log(1);

                                alert('歌曲加载中')
                            }
                            for (let j = 0; j < songArr.length; j++) {

                                if (songArr[j].id == 1391477429) {
                                    songArr.splice(j, 1)
                                    console.log(songArr);
                                    break
                                }


                            }


                            $('.local-count').text($('.local-list li').length)
                            $('.listLocal-count').text($('.local-list li').length)

                        }
                    })
                   }
                }
            };

        }, 50);
        timers.push(timer)
    })



    $('.music-box').find('.love').on('click', function () {


        let allSongs = JSON.parse(localStorage.getItem('songlist'));
        if (!onLoveId) {
            return;
        }

        for (let i = 0; i < lovaSongsArr.length; i++) {
            if (lovaSongsArr[i] == onLoveId) {
                lovaSongsArr.splice(i, 1);


                localStorage.setItem('lovaSongsArr', JSON.stringify(lovaSongsArr))
                $(this).css({
                    background: ` url(./images/no-love.png) no-repeat center center`,
                    backgroundSize: `.5rem .5rem`
                })


                for (let i = 0; i < allSongs.length; i++) {
                    if (loveSongsMsg[i].id == onLoveId) {
                        loveSongsMsg.splice(i, 1);
                        localStorage.setItem('loveSongsMsg', JSON.stringify(loveSongsMsg))
                        isLoveSongs()
                        $('.love-count').text(lovaSongsArr.length)
                        return
                    }

                }

            }
        }

        lovaSongsArr.push(onLoveId);
        localStorage.setItem('lovaSongsArr', JSON.stringify(lovaSongsArr));

        $(this).css({
            background: ` url(./images/love.png) no-repeat center center`,
            backgroundSize: `.5rem .5rem`
        })
        for (let i = 0; i < allSongs.length; i++) {
            if (allSongs[i].id == onLoveId) {
                loveSongsMsg.push(allSongs[i]);
                localStorage.setItem('loveSongsMsg', JSON.stringify(loveSongsMsg))
                $('.love-count').text(lovaSongsArr.length)
                $('.listlove-count').text(lovaSongsArr.length)

            }
            console.log(onLoveId);

        }





    })

    $('.Lyrics').on('click', function () {
        if ($(this).data('state') == 0) {
            songWordsDown = true
            console.log(t);

            t = t - 150
            $(this).data('state', 1)
            $(this).css({


                bottom: '2.8rem',
                height: '1.5rem'

            })
            $('.songPtc').css({
                display: 'block',
                animationPlayState: 'running'
            })
        }
        else {
            t = t + 150
            songWordsDown = false
            $(this).data('state', 0)
            $(this).css({


                bottom: '2.8rem',
                height: `calc(100% - 5.2rem)`

            })
            $('.songPtc').css({
                display: 'none',
                animationPlayState: 'paused'
            })
        }
    })
})
