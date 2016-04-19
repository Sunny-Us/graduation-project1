function checkout(oid,modal){
  $.ajax({
    url:'http://127.0.0.1:8081/order',
    type:"POST",
    data:{
      method:'query',
      token:$.cookie('key'),
      order_id:oid
    },
    success:function(data){
      console.log(data)
      if(data.result){
        data.data.map(function(item){
          modal.find('#id').val(item.id);
          modal.find('#user_id').val(item.user_id.id);
          modal.find('#user_name').val(item.user_id.name);
          modal.find('#service_id').val(item.service_id.id);
          modal.find('#service_name').val(item.service_id.name);
          modal.find('#worker_id').val(item.worker_id.id);
          modal.find('#worker_name').val(item.worker_id.name);
          modal.find('#service_address').val(item.service_address);
          modal.find('.status:radio[value='+item.status+']').attr('checked','checked');
          modal.find('#demand').val(item.demand);
          modal.find('#comment').val(item.comment);
          modal.find('#book_time').val(item.book_time);
          modal.find('#order_time').val(item.order_time);
          modal.find('#accept_time').val(item.accept_time);
          modal.find('#finish_time').val(item.finish_time);
        })
      }
    },
    error:function(data){
      console.log(data);
    }
  });
}
function update(oid,postData){
  $.ajax({
    url:'http://127.0.0.1:8081/order',
    type:"POST",
    data:{
      method:'update',
      token:$.cookie('key'),
      data:JSON.stringify([{[oid]:postData}])
    },
    success:function(data){
      if(data.result){
        alert('修改成功！');
      }else{
        alert('修改失败!');
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
    var oid  = button.data('whatever');
    console.log(oid);
    var modal = $(this);  
    checkout(oid,modal);
  });
  //----------------点击修改按钮
  $('#update').on('show.bs.modal',function(event){
    var button = $(event.relatedTarget);
    var oid  = button.data('whatever');
    var modal = $(this);
    checkout(oid,modal);
    $('#update-submit').on('click',function(){
      var postData={};
      postData.user_id=modal.find('#user_id').val();
      postData.service_id=modal.find('#service_id').val();
      if(modal.find('#worker_id').val()){
        postData.worker_id=modal.find('#worker_id').val()
      }
      postData.phone=modal.find('#phone').val();
      postData.service_address=modal.find('#service_address').val();
      postData.status=modal.find('.status:radio:checked').val();
      postData.demand=modal.find('#demand').val();
      postData.comment=modal.find('#comment').val();
      postData.book_time=modal.find('#book_time').val();
      update(oid,postData);
      $('#update').modal('hide').then(location.reload(true));
    });
  });
  //----------------点击受理按钮
  $('#accept').on('show.bs.modal',function(event){
    var button = $(event.relatedTarget);
    var oid  = button.data('whatever');
    var modal = $(this);
    $.ajax({
      url:'http://127.0.0.1:8081/user/user',
      type:'POST',
      data:{
        "method":'query',
        "role":1
      },
      success:function(data){
        data.data.map(function(item){
          $('<option data-id="'+item.id+'">'+item.name+'</option>').appendTo(modal.find('#worker'))
        });
      },
      error:function(data){
        console.log(data);
      }
    });
    $('#accept-submit').on('click',function(){
      var postData={};
      postData.worker_id=modal.find('#worker>option:selected').data('id');
      postData.status=2;
      update(oid,postData);
      $('#accept').modal('hide').then(location.reload(true));
    });
  });
  //---------------点击删除按钮
  $('.delete').on('click',function(event){
    var oid = $(this).data('whatever');
    var postData=[];
    postData.push(oid);
    $.ajax({
      url:'http://127.0.0.1:8081/order',
      type:'POST',
      contentType:"application/x-www-form-urlencoded",
      data:{
        "method":'delete',
        "token":$.cookie('key'),
        "data":JSON.stringify(postData)
      },
      success:function(data){
        if(data.result){
          alert('删除成功！');
          location.reload(true);
        }else{
          alert('删除失败！');
        }
      },
      error:function(data){
        console.log(data);
      }
    });
  })
  //---------------点击确认完成按钮
  $('.finish').on('click',function(event){
    var oid = $(this).data('whatever');
    console.log(oid);
    var postData={};
    postData.status=4;
    update(oid,postData).then(location.reload(true));
  })
});