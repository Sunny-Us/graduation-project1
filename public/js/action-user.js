function gender2int(gender){
  if(gender==0){
    return '无';
  }else if(gender==1){
    return '男';
  }else{
    return '女';
  }
}
function checkout(uid,modal){
  $.ajax({
    url:'http://127.0.0.1:8081/user/user',
    type:"POST",
    data:{
      method:'query',
      id:uid
    },
    success:function(data){
      if(data.result){
        modal.find('input:radio').prop("checked",false);
        data.data.map(function(item){
          modal.find('#id').val(item.id);
          modal.find('#name').val(item.name);
          modal.find('#username').val(item.email);
          modal.find('#password').val(item.password);
          modal.find('.gender:radio[value='+item.gender+']').prop("checked",true);
          console.log(item.gender);
          modal.find('#phone').val(item.phone);
          modal.find('#address').val(item.address);
          modal.find('#image_url').val(item.image_url);
          modal.find('#balance').val(item.balance);
          modal.find('.status:radio[value='+item.status+']').prop("checked",true);
        })
      }
    },
    error:function(data){
      console.log(data);
    }
  });
}
function update(uid,modal){
  var postData={};
  postData.id=modal.find('#id').val();
  postData.name=modal.find('#name').val();
  postData.email=modal.find('#username').val();
  postData.password=modal.find('#password').val();
  postData.gender=modal.find('.gender:radio:checked').val();
  postData.phone=modal.find('#phone').val();
  postData.address=modal.find('#address').val();
  postData.image_url=modal.find('#image_url').val();
  postData.balance=modal.find('#balance').val();
  postData.status=modal.find('.status:radio:checked').val();
  $.ajax({
    url:'http://127.0.0.1:8081/user/user',
    type:'POST',
    data:{
      method:'update',
      data:JSON.stringify([{[uid]:postData}])
    },
    success:function(data){
      if(data.result){
        alert('修改成功！');
      }else{
        alert('修改失败！');
      }
    },
    error:function(data){
      console.log(data);
    }
  });
}
function add(ajaxDate){
  $.ajax({
    url:'http://127.0.0.1:8081/user/signup',
    type:'POST',
    data:{
      'method':'signup',
      'data':JSON.stringify(ajaxDate)
    },
    success:function(data){
      if(data.result){
        alert('添加成功！');
      }else{
        alert('添加失败！');
      }
    },
    error:function(data){
      console.log(data);
    }
  });
}
$(function(){
  //----------点击查看详情按钮
  $('#checkout').on('show.bs.modal',function(event){
    var button = $(event.relatedTarget);
    var uid  = button.data('whatever');
    var modal = $(this);  
    checkout(uid,modal);
  });
  //----------------点击修改按钮
  $('#update').on('show.bs.modal',function(event){
    var button = $(event.relatedTarget);
    var uid  = button.data('whatever');
    var modal = $(this);
    checkout(uid,modal);
    $('#update-submit').on('click',function(){
      update(uid,modal);
      $('#update').modal('hide').then(location.reload());
    });
  });
  //--------------点击删除
  $('.delete').on('click',function(event){
    var uid = $(this).data('whatever');
    var postData=[];
    postData.push(uid);
    $.ajax({
      url:'http://127.0.0.1:8081/user/user',
      type:'POST',
      contentType:"application/x-www-form-urlencoded",
      data:{
        "method":'delete',
        "data":JSON.stringify(postData)
      },
      success:function(data){
        if(data.result){
          alert('删除成功！');
          location.reload();
        }else{
          alert('删除失败！');
        }
      },
      error:function(data){
        console.log(data);
      }
    });
  })
});