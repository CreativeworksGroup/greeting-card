var addthis_share;

$(document).ready(function(){
    var hash = window.location.hash;
    var fragment = hash.replace(new RegExp("_", "g")," ").slice(2);
    if(fragment.indexOf('/') == -1) {
        var name = fragment;
    } else {
        var name = fragment.slice(0, fragment.indexOf('/')); 
        var type = fragment.substr(fragment.indexOf('/')+1, 3);

        var patten = /^[1-5]{3}$/;
        if (patten.exec(type)) {
            changeImg(type);
        }
    }

    if(name) {
        $('.message').removeClass('hidden')

        $('.start').click(function(){
            // event.preventDefault();
            var wH = window.innerHeight;
            $('.wish-card').removeClass('hidden');
            $('.container').css('height',5000);
            $('.luckydraw').css('margin-bottom', 4000);
            $('.logo').css({'position':'absolute'});
            $("html, body").animate({ scrollTop: wH }, 500, 'linear');
            $('.skrollr-mobile .luckydraw').css({'transform': 'translateY(-100%)', '-webkit-transform': 'translateY(-100%)'});

            $('.send-msg').addClass('hidden');
            $('.send-screen').addClass('hidden');
            snowInit();
            $("html, body").css({'overflow':'visible'});

        });

    } else {
        $('.make-new').addClass('hidden');
        $('.start').click(function(){
            // event.preventDefault();
            var wH = window.innerHeight;
            $('.luckydraw').animate({scrollTop: wH}, 500, 'linear', function(){
                $('.logo').css({'position':'absolute','top':'100%'});
            });

        });
    }


    $('#name').text(name);
    // console.log(name);



    for(var i=1;i<4;i++) {
        var $list = $('#slot_'+i);
        var n=0;
        $list.jSlots({  
            number : 1,
            winnerNumber : [1,2,3,4,5],
            spinner : '#playBtn',
            onStart : function() {
                n=0;
                $('.over').attr('disabled','disabled');
                $('.play').attr('disabled','disabled');
                $('.slot').children().removeClass("winner");
            },  
            onWin : function(winCount, winners, finalNumbers) {
                    // $('.play').removeClass('off');
                    // only fires if you win
                    // console.log(finalNumbers);

                    $.each(winners, function() {
                        this.find('li:nth-child('+ finalNumbers +')').addClass('winner');
                    });
                    $('.play').addClass('clicked').html('<span>Draw again</span><span class="push">Draw again</span>');
                    $('.over').addClass('show');                

            },
            onEnd: function(){
                    n++;
                    // console.log(n);
                    if(n === 3) {
                        $('.over').removeAttr('disabled');
                        $('.play').removeAttr('disabled');
                        generateCard();
                    }
            }
        });

    }


    function generateCard() {
        $('.over').click(function(event){
            var array = [$($('.winner img')[0]).data('value'),$($('.winner img')[1]).data('value'),$($('.winner img')[2]).data('value')]
            changeImg(array);
            
            // $('.play').addClass('disabled');

            $(".over, .play").animate({ opacity: 0 }, 100, 'linear');
            $('.over, .play').addClass('hide');
            $(".generate-card").animate({ opacity: 1}, 100, 'linear', function(){
                $(".generate-card").delay(1500).animate({ opacity: 0}, 100, 'linear', function(){
                    $('.skrollr-mobile .luckydraw').css({'margin-bottom': 4000, 'transform': 'translateY(-100%)', '-webkit-transform': 'translateY(-100%)'});
                });
                $(".skrollr-desktop .scroll-down").delay(1500).animate({ opacity: 1}, 100, 'linear', function(){
                    $("html, body").css({'overflow':'visible'});
                });
            });

            // $('.skrollr-desktop .scroll-down').addClass('show');
            $('.wish-card').removeClass('hidden');
            $('.container').css('height',5000);
            $('.luckydraw').css({'margin-bottom': 4000});
            snowInit();
        });
    }

    function changeImg(array) {
        $($('.mid img')[0]).attr('src', 'img/mid-0' + array[0] + 'a.png');
        $($('.mid img')[1]).attr('src', 'img/mid-0' + array[0] + 'b.png');
        $($('.mid img')[2]).attr('src', 'img/mid-0' + array[0] + 'c.png');
        $($('.mid img')[3]).attr('src', 'img/mid-0' + array[0] + 'b.png');
        $($('.mid img')[4]).attr('src', 'img/mid-0' + array[0] + 'c.png');

        $('.front img').attr('src', 'img/front-0' + array[1] + '.png');

        $('#noblur-background').css('background-image', 'url(img/back-0' + array[2]  + '.jpg)');
        $('#blur-background').css('background-image', 'url(img/back-0' + array[2] + 'b.jpg)');
    }

    // Input field
    $('.name-input').on('input', function() {

        if($(this).val() === '') {
            $('#createLinkButton').css({'opacity':0, 'visibility':'hidden'});
            $('#createLinkButton').css({'visibility':'hidden'});
        } else {
            $('#createLinkButton').css({'visibility':'initial','opacity':1});
        }
    });
    $('.name-input').focus(function() {
        $('.skrollr-mobile .front').css({'opacity':'0'});
        $('.skrollr-mobile .send-msg').css({'transform':'translateY(-80%)'});
    });
    $('.name-input').blur(function() {
        $('.skrollr-mobile .front').css({'opacity':'1'});
        $('.skrollr-mobile .send-msg').css({'transform':'translateY(0)'});
    })


    // $(window).on('scroll', function(){
    //     if( $(document).height()-$(window).height() - 5 < $(window).scrollTop() ) {
    //         $('#theName, #createLinkButton').attr('disabled', false);
    //         $('.send-screen, .make-new').css('pointer-events','all');
    //          console.log('bottom');

    //     } else {
    //         $('#theName, #createLinkButton').attr('disabled', 'disabled');
    //         $('.send-screen, .make-new').css('pointer-events','none');

    //     }
    // })


    // Create link button
    $('#createLinkButton').on('click', function(e) {
        createLink();

        e.preventDefault();
    });
    // Add dat enter key for cool ux
    $('#theName').keyup(function (e) {
        if(e.keyCode === 13 && ($('#theName').val() !== '')) {
            createLink();
        }
    });
    // Restrict input to alphanumeric chars
    $('#theName').alphanum();


    function createLink() {
        var name = $('#theName').val(),
            type = $($('.winner img')[0]).data('value').toString()+$($('.winner img')[1]).data('value')+$($('.winner img')[2]).data('value'),
            domain = window.location.origin,
            url = (domain + '/xmas/#/' + name + '/' + type).toLowerCase();

        url = url.replace(new RegExp(" ", "g"),"_");

        addthis.update('share', 'url', url); // new url
        //addthis.update('share', 'title', window.document.title); // new title.
        addthis.ready(); // this will re-render the buttons.
        
        $('#urlToSend').text(url).attr('href',url);
        /*
        $(".facebook").attr( "addthis:url", url );
        $(".google").attr( "addthis:url", url );
        $(".weibo").attr( "addthis:url", url );
        $(".mail").attr( "addthis:url", url );
        */
        
        $('.send-msg').removeClass('show');
        $('.send-screen').removeClass('hidden');
        $('.send-msg').addClass('hidden');
       

        // make qrcode 
        
        var qrcode = new QRCode(document.getElementById("qrcode"), {
           width : 100,
           height : 100,
           useSVG: true
        });         
            
        qrcode.makeCode(url);
        // var length = $('#urlToSend').val().length;

        // function updateURLWidth(){
        //     $('#urlToSend').width($(window).width());
        // }
        // $(window).resize(updateURLWidth);

        // updateURLWidth();
    }


            var SCREEN_WIDTH = window.innerWidth;
            var SCREEN_HEIGHT = window.innerHeight;

            var container;

            var particle;

            var camera;
            var scene;
            var renderer;

            var mouseX = 0;
            var mouseY = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;
            
            var particles = []; 
            var particleImage = new Image();//THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
            particleImage.src = 'img/ParticleSmoke.png'; 

        
        
            function snowInit() {

                // container = document.createElement('div');
                // document.body.appendChild(container);
                container = document.getElementById("snow_container");

                camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
                camera.position.z = 1000;

                scene = new THREE.Scene();
                scene.add(camera);
                    
                renderer = new THREE.CanvasRenderer();
                renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
                var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
                    
                for (var i = 0; i < 200; i++) {

                    particle = new Particle3D( material);
                    particle.position.x = Math.random() * 2000 - 1000;
                    particle.position.y = Math.random() * 2000 - 1000;
                    particle.position.z = Math.random() * 2000 - 1000;
                    particle.scale.x = particle.scale.y =  1;
                    scene.add( particle );
                    
                    particles.push(particle); 
                }

                container.appendChild( renderer.domElement );

    
                // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
                // document.addEventListener( 'touchmove', onDocumentTouchMove, false );
                
                setInterval( loop, 1000 / 30 );
                
            }
            
            function onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;
            }

            function onDocumentTouchStart( event ) {

                if ( event.touches.length == 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;
                }
            }

            function onDocumentTouchMove( event ) {

                if ( event.touches.length == 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;
                }
            }

            //

            function loop() {

            for(var i = 0; i<particles.length; i++)
                {

                    var particle = particles[i]; 
                    particle.updatePhysics(); 
    
                    with(particle.position)
                    {
                        if(y<-1000) y+=2000; 
                        if(x>1000) x-=2000; 
                        else if(x<-1000) x+=2000; 
                        if(z>1000) z-=2000; 
                        else if(z<-1000) z+=2000; 
                    }               
                }
            
                camera.position.x += ( mouseX - camera.position.x ) * 0.05;
                camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
                camera.lookAt(scene.position); 

                renderer.render( scene, camera );

                
            }

        //wechat

        if(isWX()){
            wxShare();
        }
        //是否在微信中打开
        function isWX(){
            var ua = navigator.userAgent.toLowerCase();
            return (/micromessenger/.test(ua)) ? true : false;
        }

        function wxShare() {
          // 开启Api的debug模式
          WeixinApi.enableDebugMode();
          // 需要分享的内容，请放到ready里
                WeixinApi.ready(function(Api) {

                    // 微信分享的数据
                    var wxData = {
                        "appId": "", // 服务号可以填写appId
                        "imgUrl" : 'http://dev.creativeworks.com.hk/~alex/xmas/img/social_wechat.jpg',
                        "link" : window.location.toString(),
                        "desc" : 'We wish you a happy holiday! - Creativeworks Group -',
                        "title" : 'Merry Chirstmas'
                    };

                    // 分享的回调
                    var wxCallbacks = {};
                    // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
                    Api.shareToFriend(wxData, wxCallbacks);

                    // 点击分享到朋友圈，会执行下面这个代码
                    Api.shareToTimeline(wxData, wxCallbacks);

                    // 点击分享到腾讯微博，会执行下面这个代码
                    Api.shareToWeibo(wxData, wxCallbacks);

                        // iOS上，可以直接调用这个API进行分享，一句话搞定
                        Api.generalShare(wxData,wxCallbacks);

                });

        }


})