var dbShell;
var btnActive=true;

var setWPClicked=false;

$(document).ready(function () {
//    changeCss('body', 'font-size:'+fontSize+'px;');
    changeCss('.btn-circle', 'height:'+btnchw+'px; width:'+btnchw+'px;');
    changeCss('#divMessageParent', 'height:'+eval(screenHeight*25/100)+'px;');
    changeCss('#divContent', 'height:'+eval(screenHeight*50/100)+'px;');
    changeCss('.fa', 'font-size:'+eval(screenHeight*8/100)+'px;');
    changeCss('.navbar-brand', 'font-size:'+eval(fontSize/2)+'px;');
    changeCss('#divCallRecords', 'font-size:'+recordFontSize+'px;');
    changeCss('label.error', 'font-size:'+eval(fontSize/1.5)+'px;');
    changeCss('.imgLoader', 'height:'+eval(fontSize/2)+'px;');
    changeCss('#GridView1, #sltUsers', 'font-size:'+eval(fontSize/2.2)+'px;');


//    $('body').css({
//        height: $(window).height(),
//        width: parseInt($(window).height())*56.25/100
//    })
//    createDb();

    $("#btnSetWallpaper").click(function (event) {
        setWPClicked=true;
        setWallpaper();
        setTimeout(function () {
            setWPClicked=false;
            $('#btnSetWallpaper, .divBtns, #favcolor1, #favcolor2').show();
        }, 2000);
    })

    $("#btnGradient").click(function (event) {
        $("#div1").removeClass('hide').addClass('hide');
        $("#div2").removeClass('hide').addClass('hide');
        $("#div3").removeClass('hide').addClass('hide');
    })

    $("#btnStripe").click(function (event) {
        $("#div1").removeClass('hide');
        $("#div2").removeClass('hide');
        $("#div3").removeClass('hide');
    })
    
    $("#btnShare").click(function (event) {
        socialShare();
    })
});

var randomColourOne;
var randomColourTwo;

$(document).ready(function () {

    $("#colourOne").hide();
    $("#colourTwo").hide();
    $('.setsuccess').hide();

//    setInterval(function () {
//        try {
//            document.addEventListener('deviceready', function () {
//
//                var randomNo=Math.floor(Math.random()*7)+1;
//                $.ajax({
//                    url: 'js/files/img'+randomNo+'.txt',
//                    type: 'GET',
//                    dataType: 'html',
//                    async: true,
//                    error: function () {
//                    },
//                    success: function (resp) {
//                        console.log(resp);
//                        window.plugins.wallpaper.setImageHttp(resp, function (error) {
//                            if (error) {
//                                alert(error);
//                                console.error(error);
//                            } else {
//                                $('#btnSetWallpaper, .divBtns, #favcolor1, #favcolor2').show();
//                                $('.setsuccess').show();
//                                $('#datauri').show();
//                            }
//                        });
//                    }
//                })
//
//            });
//        } catch (exception) {
//            alert(exception);
//        }
//    }, 10000);

    $('#favcolor1').click(function () {
        setWPClicked=true;
        setTimeout(function () {
            setWPClicked=false;
        }, 2000);
    })
    $('#favcolor1').change(function () {
        var background=document.getElementById('background');
        randomColourOne=$('#favcolor1').val();
        randomColourTwo=$('#favcolor2').val();
        background.style.backgroundImage="-webkit-linear-gradient("+randomColourOne+" , "+randomColourTwo+")";
    })
    $('#favcolor2').click(function () {
        setWPClicked=true;
        setTimeout(function () {
            setWPClicked=false;
        }, 2000);
    })
    $('#favcolor2').change(function () {
        var background=document.getElementById('background');
        randomColourOne=$('#favcolor1').val();
        randomColourTwo=$('#favcolor2').val();
        background.style.backgroundImage="-webkit-linear-gradient("+randomColourOne+" , "+randomColourTwo+")";
    })
})

$(document).ready(function () {
    $("body").hover(function () {
//        $("#colourOne").fadeToggle(300);
//        $("#colourTwo").fadeToggle(300);
    });
});

function colourIt(divId) {
    $('.setsuccess').hide();
    firstColour(divId);
    firstColour('div1');
    firstColour('div2');
    firstColour('div3');
    firstColour('div4');
}

function firstColour(divId) {
    if (!setWPClicked) {
        randomColourOne="#000000".replace(/0/g, function () {
            return (~~(Math.random()*16)).toString(16);
        });

        randomColourTwo="#000000".replace(/0/g, function () {
            return (~~(Math.random()*16)).toString(16);
        });

        var background=document.getElementById(divId);
        background.style.backgroundImage="-webkit-linear-gradient("+randomColourOne+" , "+randomColourTwo+")";

//        document.getElementById("topColour").innerHTML=(randomColourOne);
//        document.getElementById("bottomColour").innerHTML=(randomColourTwo);
        if (divId==='background') {
            $('#favcolor1').val(randomColourOne);
            $('#favcolor2').val(randomColourTwo);
        }
    }
}

function firstColourB1() {
    randomColourOne="#000000".replace(/0/g, function () {
        return (~~(Math.random()*16)).toString(16);
    });

    randomColourTwo="#000000".replace(/0/g, function () {
        return (~~(Math.random()*16)).toString(16);
    });

    var background=document.getElementById("div1");
    background.style.backgroundImage="-webkit-linear-gradient("+randomColourOne+" , "+randomColourTwo+")";
}

function firstColourB2() {
    randomColourOne="#000000".replace(/0/g, function () {
        return (~~(Math.random()*16)).toString(16);
    });

    randomColourTwo="#000000".replace(/0/g, function () {
        return (~~(Math.random()*16)).toString(16);
    });

    var background=document.getElementById("div2");
    background.style.backgroundImage="-webkit-linear-gradient("+randomColourOne+" , "+randomColourTwo+")";
}

function firstColourB3() {
    randomColourOne="#000000".replace(/0/g, function () {
        return (~~(Math.random()*16)).toString(16);
    });

    randomColourTwo="#000000".replace(/0/g, function () {
        return (~~(Math.random()*16)).toString(16);
    });

    var background=document.getElementById("div3");
    background.style.backgroundImage="-webkit-linear-gradient("+randomColourOne+" , "+randomColourTwo+")";
}

function proDtlForNextMsg(respData) {
    //console.log(log);
    var nextMsgId=eval(parseInt(respData.msg_id)+1);
    getMessageDtl(nextMsgId, showMessage);
}

function showMessage(respData) {
    // If func is defined trigger it
    if (respData.func!=="") {
        window[respData.func](respData);
    } else {
        $('#divMessage').html(respData.txt);
        updateMsgId(respData.id);
    }
}

function gift1(respData) {
    // Check if the counter field present
    var funCnt=$("#divContent").find("#txtFunCnt").val();
    if (funCnt===undefined) {
        $('#divMessage').html(respData.text);
        $('#divContent').html('<i class="fa fa-gift" aria-hidden="true"></i>');
        $('#divContent').append("<input type='hidden' id='txtFunCnt' value='1'/>");

        $(".fa-gift").click(function () {
            $('#divContent').html('<i class="fa fa-bicycle" aria-hidden="true"></i>');
            getProfileDtl(updateMsgId2);
        })
        funCnt=1;
    }
    console.log(funCnt);
    console.log(giftMsg[funCnt]);
    $('#divMessage').html(giftMsg[funCnt].txt);
    $('#divContent').find("#txtFunCnt").val(eval(parseInt(funCnt)+1));
}

function removegift1() {
    $('#divContent').find('.fa-bicycle').fadeOut('slow');
}

function updateMsgId2(respData) {
    updateMsgId(eval(parseInt(respData.msg_id)+1));
    getProfileDtl(proDtlForNextMsg);
}

function giftLike(respData) {
    // Check if the counter field present
    var funCnt=$("#divContent").find("txtFunCnt").val();
    if (funCnt===undefined) {
        $('#divMessage').html(respData.text);
        $('#divContent').append("<div><input type='button' id='btnGiftLike' class='btn btn-info' value='Like'/>&nbsp;<input type='button' id='btnGiftDislike' class='btn btn-error' value='Like'/></div>");

        $("#btnGiftLike").click(function () {
            $('#divContent').html('You');
        })
        funCnt=1;
    }
    $('#divMessage').html(giftMsg[funCnt].text);
    $('#divContent').find("#txtFunCnt").val(eval(funCnt+1));
}

function changeCss(className, classValue) {
    // we need invisible container to store additional css definitions
    var cssMainContainer=$('#css-modifier-container');
    if (cssMainContainer.length==0) {
        var cssMainContainer=$('<div id="css-modifier-container"></div>');
        cssMainContainer.hide();
        cssMainContainer.appendTo($('head'));
    }

    // and we need one div for each class
    classContainer=cssMainContainer.find('div[data-class="'+className+'"]');
    if (classContainer.length==0) {
        classContainer=$('<div data-class="'+className+'"></div>');
        classContainer.appendTo(cssMainContainer);
    }

    // append additional style
    classContainer.html('<style>'+className+' {'+classValue+'}</style>');
}

function setWallpaper() {

//    var modalSkeleton=genModalSkeleton();
//    $(modalSkeleton).modal("show");
//    setModalContent(modalSkeleton, 'rewardCoins');

    $('#btnSetWallpaper, .divBtns, #favcolor1, #favcolor2').hide();
    $('#datauri').hide();

    setTimeout(function () {
        try {
            document.addEventListener('deviceready', function () {

                navigator.screenshot.URI(function (error, res) {
                    if (error) {
                        console.error(error);
                    } else {
                        window.plugins.wallpaper.setImageHttp(res.URI, function (error) {
                            if (error) {
                                alert(error);
                                console.error(error);
                            } else {
                                $('#btnSetWallpaper, .divBtns, #favcolor1, #favcolor2').show();
                                $('.setsuccess').show();
                                $('#datauri').show();
                            }
                        });
                    }
                }, 50);
            });
        } catch (exception) {
            alert(exception);
        }
    }, 200);
}

function socialShare() {
    navigator.screenshot.URI(function (error, res) {
        if (error) {
            console.error(error);
        } else {
            window.plugins.socialsharing.share('https://play.google.com/store/apps/details?id=com.mjapps.wallpaper I have generated this awesome wallpaper, You can too!!', 'Awesome Wallpaper Generator', res.URI, '');
        }
    }, 50);
}