$(function(){
$('#link_reg').on('click',function(){
    $('.reg-box').show()
    $('.login-box').hide()
})
$('#link_login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
})
//从layUI中获取form对象
var form=layui.form
var layer=layui.layer
//通过from.verify()函数自定义校验规则
form.verify({   
    'mima': [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ], 
      //校验两次密码是否一致的规则
      remima:function(res){
//通过形参拿到的是确认密码框中的 内容，还需要拿到密码框中的内容，
//然后进行一次比较，如果判断失败，则return一个提示消息
var mima=$('#qwe').val()
if(mima!==res){
    return '两次密码不一致'
}
      }
})  
//监听注册表单的提交事件   submit提交
$('#form_reg').on('submit',function(e){
    //阻止表单的默认提交事件
    e.preventDefault()
    //开始发起post请求
    $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
if(res.status!==0){ 
    layer.msg(res.message);
}
layer.msg('注册成功！');
//模拟人的点击行为，注册成功后自动跳转到登录页面
$('.anniu').click()
})  
})  
//监听登录表单的提交事件 submit 提交
$('#form_login').submit(function(e){
    //阻止表单默认提交行为
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/api/login',
        // data 提交数据到服务器       serialize()快速获取表单数据
        data:$(this).serialize(),
        success:function(res){
if(res.status!==0){
    //因为只有在layUI才有特效，所以要在layUI里写才有效message可简写为msg   
     layer.msg('登录失败')
}else{
    // console.log(res.token);  
   layer.msg('登录成功')
      //将登陆成功的token字符串保存到localStorage中(也就是浏览器的f12键里的application里面)，永久保存     setItem存数据
   localStorage.setItem('token',res.token)
   //获取保存在localstorage里的值   var token=localStorage.getItem('token')  
//    var  token=localStorage.getItem('token')
//    console.log(token);
   //跳转到后台页面 
//    location.href='/index.html'
}
        }
    })
})
})