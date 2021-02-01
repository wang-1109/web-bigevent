$(function(){
var layer=layui.layer
var form=layui.form
    initcate()
    // 初始化富文本编辑器
initEditor()
    //定义加载文章分类的方法
    function initcate(){
$.ajax({
    method:'get',
    url:"/my/article/cates",
    success:function(res){
        if(res.status!==0){
            return layer.msg('初始化文章分类失败')
        }else{
            //定义模板引擎
            var htmlStr=template('tpl-cate',res)
            $('[name="cate_id]').html(htmlStr)
//一定要调用form.render()方法重新加载分类
form.render()
        }
    }
})
    }
      // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)



  //为选择封面的按钮绑定点击事件
  $('#btnChooseImage').on('click',function(){
      $('#coverfile').click()
  })


//监听coverfile的change事件,获取用户选择的文件列表
$('#coverfile').on('change',function(e){
//获取文件的列表数组
var files=e.target.files
//判断用户是否选择文件
if(files.length===0){
    return
}
else{
    //根据文件,创建对应的URL地址
    var newimgurl=URL.createObjectURL(files[0])
    //为裁剪区域重新设置图片
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newimgurl)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
}
})


//定义文章的发布状态
var art_state='已发布'


//为存草稿按钮,绑定点击事件
$('#btnsave').on('click',function(){
    art_state='草稿'
})


//为表单绑定submit事件
$('#form-pub').on('submit',function(e){
//阻止表单的默认提交行为
e.preventDefault()
//基于form表单,快速创建一个formdata对象
var fd=new FormData($(this)[0])
//将文章的发布状态存到fd中
fd.append('state',art_state)

//将封面裁剪过后的图像,输出为一个文件对象
$image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作

        fd.append('cover_img',blob)
        //发送ajax请求
        //调用publishArticle方法
        publishArticle(fd)
  })
})


//定义一个发表文章的方法
function publishArticle(fd){
    $.ajax({
        method:'post',
        url:'/my/article/add',
        data:fd,
        //注意:如果想服务器提交的是formdata格式的数据,必须添加一下两个配置项
        contentType:false,
        processData:false,
        success:function(res){
            if(res.status!==0){
                return layer.msg('发布文章失败')
            }else{
                layer.msg('发布文章成功!')
                location.href='/article/art_pub.html'
            }
        }
    })
}
})