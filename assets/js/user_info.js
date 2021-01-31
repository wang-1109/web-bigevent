$(function () {
  //先获取到layUI中的form元素
  var form = layui.form;
  //想提示错误消息就导入layUI中的layer弹出层
  var layer = layui.layer;
  //进行form表单校验
  form.verify({
    //自定义表单规则
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在 1 ~ 6 个字符之间！";
      }
    },
  });

  //调用initUserInfo函数
  initUserInfo();

  //初始化用户的基本信息
  function initUserInfo() {
    //调用ajax
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败");
        } else {
          // console.log(res);
          //调用form.val为表单赋值
          form.val("formUserInfo", res.data);
        }
      },
    });
  }

  //重置表单数据
  $("#btnReset").on("click", function (e) {
    //阻止表单的默认提交行为
    // e.preventDefault()
    //再次调用initUserInfo函数获取到里面的信息,从而重置数据
    initUserInfo();
  });


  //监听表单的提交事件
  $(".layui-form").on("submit", function (e) {
    //阻止表单的默认提交行为
    e.preventDefault();
    //发起ajax请求
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      //serialize快速获取表单的数据
      data: $(this).serialize(),
      success: function(res) { 
        if (res.status !== 0) {
          return layer.msg("更新用户信息失败");
        } else {
          layer.msg("更新用户信息成功");
        }
      //在这里调用父页面中的方法来渲染用户头像和信息
        window.parent.getUserInfo();
      },
    });
  });
});
