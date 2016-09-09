

$(function () {

    //  https://api.github.com/repos/ZengTianShengZ/ZengTianShengZ.github.io/issues/

    $('#SOHUCS  > div').css('display','none');

   var blog_id =  decodeURIComponent(location.search.substr(1));
   console.log( blog_id  );
    var blog_url = 'https://api.github.com/repos/ZengTianShengZ/ZengTianShengZ.github.io/issues/ '+ blog_id;

    $.ajax({
        type:'GET',
        url:blog_url,
        success:function (response,statue,xhr) {
            parseResponseData(response);

        },
        error:function () {

        }
    });

});

var parseResponseData = function (response) {

    var title = response.title,
        updated_at = response.updated_at,
        article_body = response.body;
    var titlt_img = "";
    var starT =  article_body.indexOf('[image](');
    var endT = article_body.indexOf('.png)');
    if(starT > 0 && endT > 0){
        titlt_img =  article_body.slice(starT+8,endT) + ".png";
    } else{
        titlt_img = "";
    }
    article_body = article_body.slice(endT+5);

    console.log( title  );
    console.log( updated_at  );
    console.log( titlt_img  );

    // 图片预加载 ！
    var bg_img = new Image();
    bg_img.onload = function (){
        $('.blog-head-img').attr('src',bg_img.src );
    }
    bg_img.src =titlt_img;

    $('.blog-head h2').html(title);
    $('.blog-time p').html(updated_at);

    //showdownJs 解析 markdown 转换成 html
    var converter = new showdown.Converter();
    var text      =  article_body,
         html      = converter.makeHtml(text);
    $('.blog-article').html(html);

    $('.btn-fw'),css('color','red');
}








