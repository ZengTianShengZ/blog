
$(function () {

    //https://api.github.com/repos/ZengTianShengZ/ZengTianShengZ.github.io/issues

    $('.popover-show').popover('hide');

    // 图片预加载 ！
    var bg_img = new Image();
    bg_img.onload = function ()
    {
        $('#person-info').css('background-image','url('+bg_img.src+')' );
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

var afterBgImgVisibleAnimat = function () {
    $('.logo').fadeIn(3000);
    $('.log_gif').fadeOut(3000);
    $('.infor-icon img').fadeIn(4000,function () {

        $('.per-detial-info').fadeIn(1000);
        $('.per-detial-info').animate({
            top:150
        },800,function () {
            $('.about-me').fadeIn(1000);
            $('.about-me').animate({
                top:215
            },800,function () {
                $('.per-ability').fadeIn(1000);
                $('.per-ability').animate(
                    {
                        top:374
                    },800,function () {
                        
                    }
                );
            });
        });
    });

}

var parseResponseData = function (response) {

    var titles = [],
        updated_at = [],
        article_intor = [],
        url_id = [];

    //2016-09-08T06:53:12Z

    for(var i = 0 ,len = response.length;i<len;i++ ){

        titles.push(response[i].title);

        var url = response[i].url;
        url_id.push(  url.slice( url.lastIndexOf('/')+1 ,url.length  ) );

        var up_day = response[i].updated_at;
        up_day = up_day.slice(0,up_day.indexOf('T'));
        updated_at.push(up_day);

        var article =  response[i].body;
        var starT =  article.indexOf('<!--');
        var endT = article.indexOf('-->');
        if(starT > 0 && endT > 0){
            article_intor.push( article.slice(starT+4,endT) );
        } else{
            article_intor.push( response[i].title );
        }

        var titlt_img = "";
        var starImg =  article.indexOf('[image](');
        var endImg = article.indexOf('.png)');
        if(starImg > 0 && endImg > 0){
            titlt_img =  article.slice(starImg+8,endImg) + ".png";
        } else{
            titlt_img = "";
        }


        var  blog_html = '<div class="blog-content"><div class="row"><div class="col-md-7 blog-atc"> <h3 class="blog-title"><a class="blog_url" href="blog.html?'+url_id[i]+ '"><strong>'+titles[i]+ '</strong></a></h3> <p>'+article_intor[i]+ '</p> <p><span>'+updated_at[i]+ '</span> <a class="pull-right blog_url" href="blog.html?'+url_id[i]+ '">点击查看全部内容</a></p> </div> <div class="col-md-5"> <div class="thumbnail blog-img"> <img src="#" alt="" class="title_img'+ i +'"> </div> </div> </div> </div>';

        $('#blog').append(blog_html);

        // 图片预加载 ！
        var t_img = new Image();
        t_img.src =titlt_img; // 不知道会不会存在 IE 兼容问题， IE 需要把这一句放在 onload 后面
        // 利用 闭包 得到 for 循环下的 i
        t_img.onload = function (num) {
            var imgClass = '.title_img'+(num);
            $(imgClass).attr('src',t_img.src );

        }(i);

    }


}




 /*
 showdownJs 解析 markdown 转换成 html
  var converter = new showdown.Converter();
  var text      = " <!-- 面对android studio Run 一次项目要等好几分钟的痛点，不得不研究一下android studio 的单元测试。其实我的目的很简单，在不对视图进行操作的前提下，测试一些activity 的生命周期，或网络拉取数据的一些处理，比如解析 json 数据啊，做网络请求啊等等，也就是对 Model层的测试。这些不需要操作视图，但在没有单元测试环境下，比如我们网络请求一些数据，Log 打印看看是否请求成功，却又要 利用模拟器或真机Run 一次项目，花费好几分钟，这是不能容忍的。-->\r\n\r\n面对android studio Run 一次项目要等好几分钟的痛点，不得不研究一下android studio 的单元测试。\r\n其实我的目的很简单，在不对视图进行操作的前提下，测试一些activity 的生命周期，或网络拉取数据的一些处理，比如解析 json 数据啊，做网络请求啊等等，也就是对 Model层的测试。这些不需要操作视图，但在没有单元测试环境下，比如我们网络请求一些数据，Log 打印看看是否请求成功，却又要 利用模拟器或真机Run 一次项目，花费好几分钟，这是不能容忍的。\r\n于是乎，强大的 android studio 也考虑到了这一点，给我们提供的简单的单元测试类。\r\n让我们来简单的了解学习一下吧。\r\n\r\n**首先先来了解一下一些名称，方便下面介绍和使用：**\r\n在java中咱们有用过 JUnit 的 单元测试 ，那android 也是基于 java 语言编写的，所以也有个 JUnit的单元测试。在做 android 的单元测试需要导入依赖：\r\n\r\n```\r\nandroidTestCompile 'junit:junit:4.12'\r\ntestCompile 'junit:junit:4.12'\r\n```\r\n其中， test目录为在本机执行单元测试代码的目录， androidTest为在Android设备上执行单元测试代码的目录。如下图：\r\n![图片描述][1]\r\n![image](https://cloud.githubusercontent.com/assets/15622519/18313660/526ab7fa-7542-11e6-9898-01d3b6c28ad8.png)\r\n\r\n\r\n**Android 自带的 junit单元测试的一些测试类（androidTest测试 需要运行在模拟机或真机上）**  \r\n**1、InstrumentationTestCase框架：**\r\nInstrumentation和Activity有点类似，只不过Activity是需要一个界面的，而Instrumentation并不是这样的，我们可以将它理解为一种没有图形界面的，具有启动能力的，用于监控其他类(用Target Package声明)的工具类。\r\n举个例子，利用InstrumentationTestCase 启动一个activity：\r\n在androidTest下新建一个java类，并且继承自InstrumentationTestCase编写一个public void的方法，但是必须要是方法名以test打头，比如testPublishSubject，并不需要@Test注解\r\n\r\n```\r\npublic class TestSubject extends InstrumentationTestCase {\r\n    private static final String LOG_TAG = \"test\";\r\n \r\n    public void testPublishSubject() {\r\n  \r\n        launchActivity(\"demo.zts.com.demo\",SecondActivity.class,null);\r\n    }\r\n}\r\n```\r\n**2、ApplicationTestCase**——测试整个应用程序的类。它允许你注入一个模拟的Context到应用程序中，在应用程序启动之前初始化测试参数，并在应用程序结束之后销毁之前检查应用程序。\r\n使用Context，你可以浏览资源，文件，数据库等等。基类是AndroidTestCase，一般常见的是它的子类，和特定组件关联。\r\n测试代码如下：\r\n\r\n```\r\npublic class MyApp extends Application {\r\n    @Override\r\n    public void onCreate() {\r\n        super.onCreate();\r\n        String  app_name =  getResources().getString(R.string.app_name);\r\n        Log.i(\"MyApp\",\".........MyApp....app_name..........\"+app_name);\r\n    }\r\n}\r\n```\r\n\r\n```\r\npublic class ApplicationTest extends ApplicationTestCase<MyApp> {\r\n    public ApplicationTest() {\r\n        super(MyApp.class);\r\n    }\r\n    public void testStart() {\r\n        String  str = null;\r\n        str  = mContext.getResources().getString(R.string.app_name);\r\n        Log.i(\"..\",\".............ApplicationTest ...........app_name.............\"+str);\r\n    }\r\n```\r\nLog 日志：\r\n\r\n```\r\n 07-22 23:27:10.276 32259-32259/demo.zts.com.demo I/MyApp: .........MyApp....app_name..........demo\r\n 07-22 23:27:10.276 32259-32319/demo.zts.com.demo I/TestRunner: started: testStart(demo.zts.com.demo.ApplicationTest)\r\n 07-22 23:27:10.286 32259-32319/demo.zts.com.demo I/..: .............ApplicationTest..........app_name..............demo\r\n \r\n```\r\n\r\n**3、ActivityUnitTestCase**——对单个Activity进行单一测试的类。使用它，你可以注入模拟的Context或Application，或者两者。它用于对Activity进行单元测试。也就是说你可以用于测试单独的activity ，虽然也需要利用模拟机或真机启动，但你启动的只是你需要做测试的activity，于其他activity无关。\r\n测试代码如下：\r\n\r\n要测试的 activity\r\n```\r\npublic class MainActivity extends AppCompatActivity {\r\n    @Override\r\n    protected void onCreate(Bundle savedInstanceState) {\r\n        super.onCreate(savedInstanceState);\r\n        setContentView(R.layout.activity_main);\r\n        System.out.println(\"...............MainActivity......onCreate............\");\r\n        Log.i(\"MainActivity\",\"................onCreate............................\");\r\n\r\n    }\r\n    @Override\r\n    protected void onStart() {\r\n        super.onStart();\r\n        System.out.println(\"...............MainActivity......onStart............\");\r\n        Log.i(\"MainActivity\",\"................onStart............................\");\r\n    }\r\n    @Override\r\n    protected void onStop() {\r\n        super.onStop();\r\n        System.out.println(\"...............MainActivity......onStop............\");\r\n        Log.i(\"MainActivity\",\"................onStop............................\");\r\n    }\r\n    @Override\r\n    protected void onDestroy() {\r\n        super.onDestroy();\r\n        System.out.println(\"...............MainActivity......onDestroy............\");\r\n        Log.i(\"MainActivity\",\"................onDestroy............................\");\r\n    }\r\n}\r\n```\r\n测试类\r\n```\r\npublic class TestActivity extends ActivityInstrumentationTestCase2<MainActivity> {\r\n\r\n    private Context ctx;\r\n\r\n    public TestActivity() {\r\n        super(MainActivity.class);\r\n    }\r\n\r\n    @Override\r\n    protected void setUp() throws Exception {\r\n        super.setUp();\r\n        ctx = getActivity().getApplicationContext();\r\n    }\r\n\r\n    public void testStart() {\r\n        Intent intent = new Intent(ctx, MainActivity.class);\r\n        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);\r\n        ctx.startActivity(intent);\r\n        Log.i(\"TestActivity\",\"................startActivity............................\");\r\n\r\n    }\r\n```\r\n测试 Log 日志：\r\n\r\n```\r\n  * 07-22 23:39:44.146 3171-3171/demo.zts.com.demo I/System.out: ...............MainActivity......onCreate............\r\n     07-22 23:39:44.146 3171-3171/demo.zts.com.demo I/MainActivity: ................onCreate............................\r\n     07-22 23:39:44.151 3171-3171/demo.zts.com.demo D/MZPerfObserver: demo.zts.com.demo onCreate consume 153 ms\r\n     07-22 23:39:44.151 3171-3171/demo.zts.com.demo I/System.out: ...............MainActivity......onStart............\r\n     07-22 23:39:44.151 3171-3171/demo.zts.com.demo I/MainActivity: ................onStart............................\r\n     07-22 23:39:44.326 3171-3171/demo.zts.com.demo D/OpenGLRenderer: Enabling debug mode 0\r\n     07-22 23:39:44.361 3171-3171/demo.zts.com.demo I/System.out: ...............MainActivity......onStop............\r\n     07-22 23:39:44.361 3171-3171/demo.zts.com.demo I/MainActivity: ................onStop............................\r\n \r\n     07-22 23:39:44.421 3171-3224/demo.zts.com.demo I/TestActivity: ................startActivity............................\r\n    \r\n```\r\n还有很多常见的测试，比如ServiceTestCase，ProviderTestCase2等，大家需要慢慢琢磨。\r\n\r\n**Android 自带的 junit单元测试的一些测试类（test 测试 ，不需要模拟机，电脑直接运行）**  \r\n\r\n比如我需要测试一段java代码，而这段java代码跟android没关系，也就是不用到android的资源，如context，activity 等，说白了就是简单的 java 测试，当然，嘿嘿，android studio也是可以做java代码测试的。\r\n测试代码如下，测试 4+4 等于几：\r\n\r\n```\r\npublic class ExampleUnitTest  {\r\n    @Test\r\n    public void testAdd() {\r\n\r\n        int i = 0;\r\n        i = 4+4;\r\n        System.out.print(\".............. \"+i);\r\n        Log.i(\"TAG\",\"...................\"+i);\r\n        // 比较 i 是否 等于 8 ，相等的话通过测试！！！\r\n        Assert.assertEquals(8, i);\r\n    }\r\n}\r\n```\r\n测试成功：\r\n\r\n \r\n![image](https://cloud.githubusercontent.com/assets/15622519/18313673/6689839c-7542-11e6-9e87-b39244adf606.png)\r\n\r\n\r\n\r\n以上测试类的运行是  -点击测试右键 - 选择 RunXXXXX\r\n\r\n \r\n![image](https://cloud.githubusercontent.com/assets/15622519/18313683/6e5d693a-7542-11e6-9fde-e5c0d8eb55d3.png)\r\n\r\n \r\n\r\n```\r\n/!*********************华丽分割线***********************!/\r\n```\r\n\r\n看了半天好像也没有解决文章最初提到的一个痛点啊，就是我需要测试android的资源，但又不想运行笨重的模拟机或真机，怎么办呢?  妈蛋，被骗了，还钱 -_-、、、  确实，上面提到的测试方法虽然没有解决拜托模拟机测试的痛点，但基于模拟机单元测试的 androidTest 确实方便我们做一些 单独功能的测试，而且能做 UI 测试，因为需要模拟机或真机嘛，所以 UI 或视图测试是没问题的。  还有test 测试，可以做一些不需要android资源的 java代码测试，也是在android开发当中很方便的，不用在启用eclipse 做测试，直接android studio 既可以了。\r\n\r\n    忽悠，接着 忽悠  -_-////\r\n其实要想脱离 模拟机或真机，又要做使用android资源的测试，如 使用Context，浏览资源，文件，数据库等等。 也是可以的！！！ 那 就只有第三方测试框架了 **Robolectric**\r\n666，你是来做宣传的吗 -_-、、、不过真的很好用，也能很好的解决咱们的痛点。\r\n接下来利用个需求来讲解 Robolectric 测试，免得我忽悠你们。\r\n\r\n```\r\n拿到 android 目录下的 assets 下的json01.txt文件 是一段json数据，让后进行解析，解析后将数据显示。 分析：这个需求就跟android下的资源有关，而咱们利用 Robolectric 做单元测试，并且不需要模拟机或真机的支持。\r\n```\r\n\r\n\r\n \r\n![image](https://cloud.githubusercontent.com/assets/15622519/18313693/79743164-7542-11e6-9f22-738a51a70288.png)\r\n\r\n\r\n其中json数据\r\n\r\n```\r\n{\r\n  \"name\": \"coolxing\",\r\n  \"age\": 24,\r\n  \"male\": true,\r\n  \"address\": {\r\n    \"street\": \"huiLongGuan\",\r\n    \"city\": \"beijing\",\r\n    \"country\": \"china\"\r\n  }\r\n}\r\n```\r\n首先需要 **Robolectric** 依赖，在你的 app module 下注入依赖：\r\n\r\n```\r\ntestCompile 'org.robolectric:robolectric:3.0'\r\n```\r\n\r\n注意是 **testCompile**  而不是 **androidTestCompile** ，不然你有需要启动模拟器了。并且测试类也是 在 test 下的 \r\n\r\n \r\n![image](https://cloud.githubusercontent.com/assets/15622519/18313701/847478d0-7542-11e6-889b-589a12b99471.png)\r\n\r\n测试类：\r\n\r\n```\r\n@RunWith(RobolectricGradleTestRunner.class)\r\n@Config(constants = BuildConfig.class, sdk = 21)\r\npublic class MainActivityTest2 {\r\n\r\n    @Test\r\n    public void testJson(){\r\n        String  str = null;\r\n        str  = RuntimeEnvironment.application.getResources().getString(R.string.app_name);\r\n\r\n        AssetManager am = null;\r\n        am = RuntimeEnvironment.application.getAssets();\r\n        String strData = null;\r\n        try {\r\n            InputStream inputStream = am.open(\"json01.txt\");\r\n            byte buf[] = new byte[1024];\r\n            inputStream.read(buf);\r\n            strData = new String(buf);\r\n            strData =strData.trim();\r\n            strData.trim();\r\n        } catch (IOException e) {\r\n\r\n        }\r\n        jsonBean foo = new Gson().fromJson(strData, jsonBean.class);\r\n        System.out.println(\"...............json..................\"+foo.name);\r\n        System.out.println(\"...............json..................\"+foo.address);\r\n        System.out.println(\"...............json..................\"+foo.age);\r\n    }\r\n}\r\n```\r\n测试结果：\r\n\r\n \r\n![image](https://cloud.githubusercontent.com/assets/15622519/18313713/8d1aef28-7542-11e6-97e5-eba175902441.png)\r\n\r\n\r\n看，咱们利用application 拿到 android 下的资源，但又不像刚才上面的 androidTestCompile 需要模拟机，是不是很6，我电脑配置比较低，本次测试需要40S多，但不真机快多了。\r\n\r\n```\r\nam = RuntimeEnvironment.application.getAssets();\r\n```\r\n \r\n\r\n```\r\n需要注意几点，类头部需要声明  @ 注解：\r\n\r\n@RunWith(RobolectricGradleTestRunner.class)\r\n@Config(constants = BuildConfig.class, sdk = 21)\r\n\r\n并且测试方法是以 textxxx() 开头的，如上面的 testJson() ，方法也需要@Test注解！！！\r\n```\r\n Robolectric 还可以测试 activity ，如：\r\n\r\n```\r\n@RunWith(RobolectricGradleTestRunner.class)\r\n@Config(constants = BuildConfig.class, sdk = 21)\r\npublic class MainActivityTest2 {\r\n    @Test\r\n    public void testMainActivity() {\r\n\r\n        MainActivity mainActivity = Robolectric.setupActivity(MainActivity.class);\r\n        mainActivity.findViewById(R.id.main_tv).performClick();\r\n\r\n\r\n        Intent expectedIntent = new Intent(mainActivity, SecondActivity.class);\r\n\r\n        ShadowActivity openActivity = Shadows.shadowOf(mainActivity);\r\n        Intent actualIntent = openActivity .getNextStartedActivity();\r\n\r\n       // Assert.assertEquals(expectedIntent, actualIntent);\r\n\r\n    }\r\n```\r\n其中\r\n\r\n```\r\nMainActivity mainActivity = Robolectric.setupActivity(MainActivity.class);\r\n\r\n这句代码就是启动了MainActivity 的生命周期\r\n```\r\n\r\n \r\n![image](https://cloud.githubusercontent.com/assets/15622519/18313723/9931e640-7542-11e6-90f8-2c4a940deacf.png)\r\n\r\n\r\n**Robolectric** 单元测试类 的 启动 也是跟 上面test 测试类一样，选择 -**MainActivityTest2** --**右键** -- 选择 **Run MainActivityTest2** \r\n\r\n好了，单元测试就介绍到这里，\r\n\r\n其实我也只是初步理解，上面那些基本的也是我做项目的需要我才去学习使用的，还有好多强大的功能大家慢慢探索。\r\n \r\n![image](https://cloud.githubusercontent.com/assets/15622519/18313760/bb035f42-7542-11e6-8e7b-cd56c6690a85.png)\r\n"
    ,
    html      = converter.makeHtml(text);
    $('.bbc').html(html);

 */


/*

/************** 获取元素下面 注释代码  js  调用   ********************************
 var i,o,s=getCommentNodes($('.bbc').get(0));
 for(i=0;o=s[i];i++) {
 $('.blog-meta').html(o);
 console.log(o);
 }
 /**********************************************************


//获取元素下面 注释代码    兼容的获取简单方案
var getCommentNodes=window.NodeFilter?function(e){
    console.log('.....2222.......');
    //支持TreeWalker的浏览器
    var r=[],o,s;
    s=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT,null,null);
    while(o=s.nextNode())r.push(o); //遍历迭代器
    return r;
}:function(e){
    console.log('.....33333333.......');
    //不支持的需要遍历
    switch(e.nodeType){
        case 8:return [e]; //注释节点直接返回
        case 1:case 9: //文档或元素需要遍历子节点
        var i,s=e.childNodes,l=s.length,result=[];
        for(i=0;i<s.length;i++) //递归每个子节点
            result.push(getCommentNodes(s[i]));
        return Array.prototype.concat.apply([],result); //合并子数组
    };
};
*/












