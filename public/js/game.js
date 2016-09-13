var start;
var bird;

// 柱子
var pillarH = 400;
var imgWidth = 60;
//间隔
var pace = 200;
//鸟
var birdWidth = 35;
var birdHeight = 30;
//区域
var maxH = 550 - birdHeight;
var maxW = 800;

var s = {};
var is = {};
var state;

var pillars = [];
var nowPillar;
s._noStart = "没开始";
s._pause = "暂停";
s._playing = "在玩中"
s._gameOver = "游戏接受";
is._stopDown = false;
is._pass = true;
var isEngineRun = false;

// jQuery.fx.interval = 20;
$(document).ready(function () {

    var fa = $("#father");
    isEngineRun = false;
    bird = $("#bird");
    state = s._noStart;
    init();//数据初始化
    $('#start_game').on("click", function (e) {
        $(e.delegateTarget).fadeOut(100);
        // console.log(state);
        if (state == s._noStart) {
            state = s._playing;
            // this.value = "暂停";
            if (!isEngineRun) {
                // console.log("?")
                isEngineRun = true;
                startEngine();
            }
        } else if (state == s._playing) {
            state = s._pause;
            // this.value = "继续";
        } else if (state == s._pause) {
            state = s._playing;
            // this.value = "暂停";
        }
    })
    $("#myClick").on("click", mouseDown);



    var arrBk=["bg_day.png","bg_night.png"];
    $("#bg")[0].style.backgroundImage="url(img/"+arrBk[parseInt(Math.random()*2)]+")";
    var arrBirdImg = [ ["bird0_0.png", "bird0_1.png", "bird0_2.png"], ["bird1_0.png", "bird1_1.png", "bird1_2.png"], ["bird2_0.png", "bird2_1.png", "bird2_2.png"]];
    var arrBirdImgIndex = parseInt(Math.random()*3);
    var myBirdIndex = 0;
    // var temp=bird.children("img");
    // console.log(bird);
    // console.log(bird.children("img").get(0));
    // console.log(bird.children("img").get(0).src="img/bird1_0.png");
    setInterval(function () {
        // var old=bird.css();
        // var x=parseInt(old);
        // console.log(x);
        // console.log(bird.find("img"));
        // background-image: url("../img/bird1_0.png");

        $("#bird_bg").css({
            "background-image": "url(img/" + arrBirdImg[arrBirdImgIndex][myBirdIndex] + ")"
        });
        // bird.children("img").get(0).src="img/"+arrBirdImg[arrBirdImgIndex][myBirdIndex];
        myBirdIndex++;
        if (myBirdIndex == 3) {
            myBirdIndex = 0;
        }
    }, 100);
});
function mouseDown(e) {
    // console.log("?")
    // // console.log(e.keyCode)
    // if (e.keyCode == 32) {
    //如果不是在游戏中则退出
    if (state != s._playing)return;
    // if(state==s._gameOver)return;
    // if(state==s._)
    // console.log("up");
    is._stopDow = true;  //先暂停
    var top = bird.position().top - 60;
    if (top < 0)top = 0; //不能出界
    // transform: rotate(30deg);
    $("#bird_bg").get(0).style.transform = "rotate(-60deg)";
    bird.animate({
        "top": top + "px",
    }, 100)
    // $("#bird_bg").get(0).style.transform="rotate(30deg)";
    //     "transform": "rotate(30deg)"
    // })
    setTimeout(function () {
        $("#bird_bg").get(0).style.transform = "rotate(90deg)";
    }, 100)
    is._stopDow = false;
    // }
}
function startEngine() {
    setInterval(function () {
        if (state == s._gameOver)return;
        if (state == s._pause)return;
        if (state == s._noStart)return;

        // 鸟移动
        if (is._stopDown == false) {
            var oldTop = bird.position().top;
            oldTop += 5;
            if (oldTop >= maxH) {
                state = s._gameOver;
                console.log("游戏结束");
                gameOver();
                // init();

            }
            if (oldTop < maxH) {
                bird.css({
                    "top": oldTop + "px",
                });
            }
        }
        // 柱子爸爸的移动

        $(".pillar").each(function (index, ele) {
            var oldLeft = $(ele).position().left;
            if (oldLeft - 4 <= -maxW) {  //如果已经出去了
                oldLeft = maxW;
                setPillar(ele);
            }
            // console.log(ele)
            $(ele).css("left", oldLeft - 4 + 'px');
        });
        //
        // console.log(pillars);
        // var birdLeft=bird.offset().left;
        // // console.log(pillars[0].offset().left);
        // var pilLeft=pillars[0].offset().left;
        // if(pilLeft<=birdLeft+birdWidth&&pilLeft+imgWidth>=birdLeft){
        //     console.log("在里面");
        // }
        if (is._pass) {  //如果过了
            nowPillar = getPillar();
            is._pass = false;
        } else { //没过
            var pilLeft = nowPillar.offset().left;
            var birdLeft = bird.offset().left;
            if (pilLeft <= birdLeft + birdWidth) {
                // console.log("在里面");
                //判断是否在空白区域
                var min = nowPillar.position().top + pillarH;
                var max = min + pace;
                var birdTop = bird.position().top;
                if (birdTop <= min || birdTop + birdHeight >= max) {
                    state = s._gameOver
                    // console.log("游戏结束");
                    gameOver();
                    return;
                }
                if (pilLeft + imgWidth < birdLeft) {
                    is._pass = true;
                    $("#score").text($("#score").text() - 1 + 2);//加分数
                }
            }

        }

    }, 20);


}
//游戏结束
function gameOver() {
    $("#re_game").fadeIn(1000);
    $("#changeImg").animate({
        "top": "0"
    }, 300);
    var txt = $("#score").text();
    var left = maxW - parseInt($("#score").get(0).style.width / 2);
    $("#score").text("分数: " + txt);
    $("#score").animate({
        "left": txt + "px",
        "bottom": "100px"
    }, 300);
    $('#re_game').on("click", "img:last-child", function (e) {
        // console.log("???")
        $(e.delegateTarget).fadeOut(100);
        $('#start_game').fadeIn(300);
        $("#score").get(0).style = "";
        $("#score").text(0);
        init();
    })

}
//初始化数据
function init() {
    // console.log("gdsa");
    pillars = [];
    //初始化两个背景
    $(".pillar").each(function (index, ele) {
        if (index == 0) {
            $(ele).empty();
            $(ele).css({
                "left": "0px"
            });
            return;
        }
        $(ele).css({
            "left": maxW + "px"
        });
        setPillar(ele);
    });
    //初始化鸟
    bird.css({
        "top": "50%"
    });
    //按钮变为开
    // $("#start").get(0).value = "开始"
    state = s._noStart;
    is._stopDown = false;
    is._pass = true;

}
//设置两个
function setPillars() {

}
// 获取柱子
function getPillar() {

    return pillars.shift();
}
//给指定的块清空柱子并加新柱子
function setPillar(ele) {
    $(ele).empty();
    for (i = 0; i < 3; i++) {
        var space = 800 / 3 - imgWidth;
        var left = space * (i + 1) + i * imgWidth - space / 2;
        var img = new $("<img src='img/pipe.png' height='400'/>");
        var ran = myRandom(-360, -80);
        img.css({
            "left": left + "px",
            "top": parseInt(ran) + "px"
        });
        pillars.push(img);
        $(ele).append(img);
        img = new $("<img src='img/pipe.png' height='400'/>");

        img.css({
            "left": left + "px",
            "top": parseInt(400 + ran + pace) + "px"
        });
        $(ele).append(img);

    }


}
function myRandom(num1, num2) {
    return num1 + (num2 - num1) * Math.random();
}
//鸟飞效果
