$(function(){
  $('table[data-datatable]').each(initTable);
  
});

function initTable(){
  var dataTableOptions = {
    "ordering":false,
    "columns": [],
    "displayLength" : 10,
    "processing": true,
    "serverSide": true,
    "language": {
      "lengthMenu": " ",
      "zeroRecords": "没有数据",
      "search": "搜索:",
      "paginate": {
        "previous": "上一页",
        "next": "下一页"
      }
    }
  };
  $(this).find('[data-field]').each(function(){
    var columnOptions = {
      data: $(this).data('field'),
      name: $(this).data('field')
    };  
  });

  if($(this).data('url')){
    dataTableOptions.ajax = {
      "url":$(this).data('url'),
      "type":"POST",
      "data":{
        method:"query",
        role:0
      }
    }
  }
  $('#test').dataTable(dataTableOptions);
}