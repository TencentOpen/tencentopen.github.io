
;(function(){
    // util 
    var template = function(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
          cache[str] = cache[str] ||
            template(document.getElementById(str).innerHTML) :
          
          // Generate a reusable function that will serve as a template
          // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
            
            // Convert the template into pure JavaScript
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");
        
        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };

    // share 
    $(document).on('click', '[data-item]', function (e) {
        var itemType = $(this).data('item'),
            itemValue = $(this).data('item-value');
        
        if(itemType == 'share'){
            var shareMsg = {
                title: '腾讯开源项目，正式启航',
                pic: 'http://tencentopen.github.io/img/slide2.jpg',
                msg: '腾讯开源项目，正式启航',
                url: 'http://tencentopen.github.io/'
            };
            var targetUrl = '';
            switch(itemValue){
                case 'weibo':
                    targetUrl = 'http://share.v.t.qq.com/index.php?c=share&a=index&f=q2&title='+shareMsg.title+'&url='+shareMsg.url+'&pic='+shareMsg.pic;
                    break;
                case 'qzone':
                    targetUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=qzone&url='+shareMsg.url+'&title='+shareMsg.title+'&pics='+shareMsg.pic+'&summary='+shareMsg.msg;
                    break;
                case 'sina':
                    targetUrl = 'http://service.weibo.com/share/share.php?url='+shareMsg.url+'&appkey=&title='+shareMsg.title+'&pic='+shareMsg.pic+'&ralateUid=&language=';
                    break;
                case 'pengyou':
                    targetUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url='+shareMsg.url+'&title='+shareMsg.title+'&pics='+shareMsg.pic+'&summary='+shareMsg.msg;
                    break;

                default:

            }
            window.open(targetUrl);
        }
    });


    // init
    $('.carousel').carousel();

    // render proj
    var list = [{
        url: 'http://alloyteam.github.io/JX/',
        name: 'JX',
        img: 'img/proj/jx.png',
        brief: '模块化的非侵入式Web前端框架',
        intro: 'JX 是模块化的非侵入式 Web 前端框架，开发于2008年，腾讯 WebQQ、腾讯 Q+ 等产品都是采用 JX 框架开发，兼容目前所有主流浏览器。'
    }, {
        url: 'http://alloyteam.github.io/AlloyPhoto/',
        name: 'AlloyImage',
        img: 'img/proj/alloyimage.png',
        brief: '基于html5的JS图片图像处理库',
        intro: 'AlloyImage 使用纯 Javascript 开发的，基于 Web 的 html5 在线图像处理引擎，同时集成了一些方便快捷的图像处理API。'
    }, {
        url: 'proj/AlloyDesktop/index.html',
        name: 'AlloyDesktop',
        img: 'img/proj/alloydesktop.png',
        brief: 'html5 桌面 App 开发引擎',
        intro: 'AlloyDesktop 是一个基于 html5 的桌面上的 app 开发引擎，实现对网页的透明渲染，同时提供强大的 api 支持，使你能够使用如文件 IO 等高级功能'
    }, {
        url: 'proj/rythem/index.html',
        name: 'Rythem',
        img: 'img/proj/rythem.png',
        brief: '开源跨平台抓包调试工具',
        intro: 'Rythem 是一个与 Fiddler 同类的软件，具有代理抓包/替换等功能，而且跨平台 & 开源。'
    }, {
        url: 'http://alloyteam.github.io/jxanimate/',
        name: 'JX.Animate',
        img: 'img/proj/jxanimate.png',
        brief: 'html5/css3 动画引擎',
        intro: 'JX.Animation 是一个开源的轻量级的CSS3动画库。可以使用 CSS3 KeyFrame 制作，也可以使用 JavaScript 动态生成动画关键帧。'
    }];
    var data = {
        list: list
    };
    $('#projContainer').html(template($('#projTemplate').html(), data));

    // lozy load
    $('.lazy').unveil();
})();