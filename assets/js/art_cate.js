$(function () {
  var layer = layui.layer;
var form=layui.form
  //调用initArtCateList
  initArtCateList();

  //获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        //   console.log(res);
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  //声明一个indexAdd属性让弹出层默认关闭
  var indexAdd = null;
  //为添加类别按钮绑定点击事件
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      title: "添加文章分类",
      content: $("#dialog-add").html(),
      area: ["500px", "300px"],
    });
  });
    //通过代理的形式为form-add表单绑定submit提交事件
    $("body").on("submit", "#form-add", function (e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        console.log(111);
        $.ajax({
          method: "post",
          url: "/my/article/addcates",
          //serialize获取到表单的数据
          data: $(this).serialize(),
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg("新添分类失败");  
            }
              initArtCateList();
              layer.msg("新添分类成功");
              layer.close(indexAdd);
            
          },
        });
      });
   //通过代理的形式为form-add表单绑定submit提交事件
   $("body").on("submit", "#form-add", function (e) {
    //阻止表单的默认提交行为
    e.preventDefault();
    console.log(111);
    $.ajax({
      method: "post",
      url: "/my/article/addcates",
      //serialize获取到表单的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("新添分类失败");
        } else {
          initArtCateList();
          layer.msg("新添分类成功");
          layer.close(indexAdd);
        }
      },
    });
  });

  var indexEdit = null;
  //通过代理的形式为btn_edit按钮绑定点击事件
  $('tbody').on('click','.btn_edit',function(e){    
    indexEdit = layer.open({
        type: 1,
        title: "修改文章分类",
        content: $("#dialog-edit").html(),
        area: ["500px", "300px"],
      });

var id = $(this).attr('data-id')
// 发起请求获取对应分类的数据
$.ajax({
  method: 'GET',
  url: '/my/article/cates/' + id,
  success: function(res) {
    form.val('form-edit', res.data)
  }
})
  })


  //通过代理的形式为修改分类的表单绑定submit提交事件
  $('body').on('submit','#form-edit',function(e){
e.preventDefault()
$.ajax({
    method:'post',
    url:'/my/article/updatecate',
    //快速获取表单数据
    data:$(this).serialize(),
    success:function(res){
if(res.status!==0){
    return layer.msg('修改分类失败!')
}else{
    layer.msg('修改分类成功!')
    layer.close(indexEdit)
    initArtCateList()
}
    }
})
  })



  //通过代理形式,为删除按钮绑定点击事件
  $('tbody').on('click','.btn-delete',function(){
      //获取到所点击分类的ID
      var id=$(this).attr('data-id')
      //提示用户是否删除
      layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
$.ajax({
    method:'get',
    url:'/my/article/deletecate/'+id,
    success:function(res){
        if(res.status!==0){
            return layer.msg('删除分类失败')
        }else{
            layer.msg('删除分类成功!')
            initArtCateList()
        layer.close(index);
        }
    }

})   
      });
  })
});
