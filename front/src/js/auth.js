function Auth() {

}

// 监听登录事件
Auth.prototype.listenLoginEvent = function () {
    var self = this;
    var login = $('.login');
    var telephoneInput = login.find("input[name='telephone']");
    var passwordInput = login.find("input[name='password']");
    var rememberInput = login.find("input[name='remember']");
    var submitBtn = $('#btn1');

    submitBtn.click(function () {
        setCookie();
        var telephone = telephoneInput.val();
        var password = passwordInput.val();
        var remember = rememberInput.prop('checked');

        yskajax.post({
            'url': '/account/login/',
            'async': false,
            'data': {
               'telephone': telephone,
                'password': password,
                'remember': remember?1:0
            },
            'success': function (result) {
                if (result['code'] === 200) {
                    window.location.href="http://127.0.0.1:8000/cms/";
                }
            }
        });
    });
};

Auth.prototype.run = function () {
    var self = this;
    self.listenLoginEvent();
};

$(function () {
    var auth = new Auth();
    auth.run();
});


//记住密码-存cookie
$(function () {
    getCookie();
});
function setCookie() {
    var username = $("#loginUser").val(); //获取用户名信息    
    var pwd = $("#loginPassword").val(); //获取登陆密码信息  
    var checked = $("input[id='rememberBtn']").prop("checked");
    console.log(checked)
    if (checked) {
        $.cookie("username", username, { expires: 7 }); //设置cookie中的用户名    
        $.cookie("password", pwd, { expires: 7 }); //设置cookie中的登陆密码
    } else {
        $.cookie("password", null);
    }
}
//记住密码--读cookie
function getCookie() {
    var loginCode = $.cookie("username");
    var passWord = $.cookie("password"); //获取cookie中的登陆密码    
    if (passWord) { //密码存在的话把“记住用户名和密码”复选框勾选住    
        $("[id='rememberBtn']").attr("checked", "true");
    }
    if (loginCode) { //用户名填充
        $("#loginUser").val(loginCode);
    }
    if (passWord) { //密码填充 
        $("#loginPassword").val(passWord);
    }
}