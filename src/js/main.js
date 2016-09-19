/**
 * Created by Administrator on 2016/9/20.
 */
$(function () {

    // 图片预加载 ！
    var bg_img = new Image();
    bg_img.onload = function ()
    {
        $('#person').css('background-image','url('+bg_img.src+')' );
        // 当背景可见时 在 将内容动画显示出来
        afterBgImgVisibleAnimat();
    }
    bg_img.src ='https://raw.githubusercontent.com/ZengTianShengZ/blog/gh-pages/imgs/left_bg2.jpg';


    $.ajax({
        type:'GET',
        url:'https://api.github.com/repos/ZengTianShengZ/ZengTianShengZ.github.io/issues',
        success:function (response,statue,xhr) {
            parseResponseData(response);
        },
        error:function () {

        }
    });


});

/* 定时加载动画*/
var afterBgImgVisibleAnimat = function () {

    /* 定时加载动画*/
    var time_set= setInterval(clock,1000)
    var time_flag = 0;
    function clock()
    {
        time_flag++;
        switch (time_flag){
            case 1:
                $('#logo').addClass('logo-anim');
                break;
            case 2:
                $('#infoIcons').addClass('info-icons-anim');
                break;
            case 3:
               $('#myInfo').addClass('my-info-anim');
                //clearInterval(int)
                break;
            case 4:
                $('#aboutMe').addClass('about-me-anim');
                break;
            case 5:
                $('#myAbility').addClass('my-ability-anim');
                clearInterval(time_set); //取消定时
                break;

        }
    }
}


var parseResponseData = function (response) {

    var titles = [],
        updated_at = [],
        article_intor = [],
        url_id = [];

    var blogMessage = [],
        imgUrls = [];

    for(var i = 0 ,len = response.length;i<len;i++ ){
       /* 得到 */
        var url = response[i].url;
        /* 得到 */
        var up_day = response[i].updated_at;
        up_day = up_day.slice(0,up_day.indexOf('T'));
        /* 得到 */
        var article =  response[i].body;
        var starT =  article.indexOf('<!--');
        var endT = article.indexOf('-->');
        var article_intor_str = '';
        if(starT > 0 && endT > 0){
            article_intor_str =  article.slice(starT+4,endT);
        } else{
            article_intor_str = response[i].title;
        }
        /* 得到 */
        var titlt_img = "";
        var starImg =  article.indexOf('[image](');
        var endImg = article.indexOf('.png)');
        if(starImg > 0 && endImg > 0){
            titlt_img =  article.slice(starImg+8,endImg) + ".png";
        } else{
            titlt_img = "";
        }
        imgUrls.push(titlt_img);

        var blog_obj = {
            titles:response[i].title,
            updated_at:up_day,
            article_intor:article_intor_str,
            url_id: url.slice( url.lastIndexOf('/')+1 ,url.length  )
        }
        blogMessage.push(blog_obj);
    }


/*
    var img_flag = 0;
    preprocessorImage({
        dd:imgUrls,
        callback:function (img_src) {
            img_flag++;
            console.log(img_flag+"........."+img_src);
            //$('#img-div').html( '<img class="bg-img" src="'+  img_src +'" alt="">');
        }
    });
*/

    var blogHtml = $('#blogContent').html();
    var html = ejs.render(blogHtml, { blogMessage: blogMessage });

    $('.blog-cont').html(html);

    var img_flag = 0;
    preprocessorImage({
        img_array:imgUrls,
        callback:function (img_src) {
            img_flag++;
            var img_str = '#blogImg'+img_flag;
            console.log( ".....img_str...."+img_str);
            $(img_str).attr('src',img_src);
            console.log(img_flag+"........."+img_src);
            //$('#img-div').html( '<img class="bg-img" src="'+  img_src +'" alt="">');
        }
    });
}

function preprocessorImage(obj) {
    var img_array = obj.img_array;
    var images = [];
    for(var i = 0 , len =  img_array.length; i< len  ; i++){
        images.push(new Image());
        images[i].onload = function ( ){
            obj.callback(this.src);
        };
        console.log('......');
        images[i].src = img_array[i];
    }
}