

$(function () {


    // location.search 得到页面搜索框的 信息
   var blog_id =  decodeURIComponent(location.search.substr(1));
    console.log('....blog_id........'+blog_id);
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
    if(starT > 0 && endT > 0 && endT <400){
        titlt_img =  article_body.slice(starT+8,endT) + ".png";
    } else if(starT > 0){
        endT = article_body.indexOf('.jpg)');
        titlt_img =  article_body.slice(starT+8,endT) + ".jpg";
    }else{
        titlt_img = "";
    }
    article_body = article_body.slice(endT+5);

    console.log( title  );
    console.log( updated_at  );
    console.log( titlt_img  );

    // 图片预加载 ！
    var bg_img = new Image();
    bg_img.onload = function (){
        $('.blog-head-img').attr('src',bg_img.src ).fadeIn(1000,function () {

            $('.blog-titlt').html(title);
            $('.blog-titlt').addClass('blog-titlt-anim');
        });

    }
    bg_img.src =titlt_img;


    $('.blog-time').html(formatGithubTime(updated_at));

    //showdownJs 解析 markdown 转换成 html
    var converter = new showdown.Converter();
    var text      =  article_body,
        html      = converter.makeHtml(text);
    $('.blog-article').html(html);

}

//2016-09-09T07:42:46Z  将 github 的时间 换成 2016年9月9日 07:33
var formatGithubTime = function (time_data) {

    var days = time_data.slice(0,time_data.indexOf('T')),
        day1 = days.slice(0,days.indexOf('-')),
        day2 = days.slice(days.indexOf('-'),days.length),
        xx = day2 .replace("-","年"),
        cc = xx .replace("-","月"),
        bb = cc.replace(/0/g,""),
        pas1 = day1 + bb + '日',
        pas2 =  time_data.slice(time_data.indexOf('T')+1,time_data.lastIndexOf(':') );

    return pas1+" "+pas2;

}






