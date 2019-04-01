function noticeList() {
    // 渲染表格
    if ($.fn.dataTable.isDataTable('#noticeTable')) {
        table = $('#noticeTable').DataTable();
    } else {
        $('#noticeTable').DataTable({
            ajax: {
                url: " https://easy-mock.com/mock/5c9c2e7fd172204b3a07ec75/noticeData",
            },
            searching: true,
            autoWidth: false,
            pagingType: "full_numbers",
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "按标题搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "&lt;",
                    "sNext": "&gt;",
                    "sLast": "末页"
                }
            },
            aoColumnDefs: [{
                "bSortable": false,
                "aTargets": [0, 5]
            }],
            aaSorting: [
                [1, "asc"]
            ],
            columns: [{
                    "className": "details-control",
                    "data": null,
                    "defaultContent": '<td><span><i class="fa fa-square-o fa-lg"></i></span></td>'
                },
                {
                    "data": "title"
                },
                {
                    "data": "text"
                },
                {
                    "data": "author"
                },
                {
                    "data": "date"
                },
                {
                    "className": "table-control",
                    "data": null,
                    "render": function (data, type, row, meta) {
                                            var html = "<td><i title='删除' class='fa fa-trash-o table-delete-btn' aria-hidden='true' data-index=" + meta.row + ">删除</i>";
                                            return html;
                    }
                }
            ]
        });
    }
   
    //选择操作
    $("#noticeTable").on("click", "td .details-control",
        function () {
            $(".allChecked").find("i").attr("class", "fa fa-square-o fa-lg");
            if ($(this).find("i").hasClass("fa-check-square")) {

                $(this).find("i").attr("class", "fa fa-square-o fa-lg");
            } else {

                $(this).find("i").attr("class", "fa fa-check-square fa-lg")
            };
        });
    //删除操作
    $("#noticeTable tbody").on("click", ".table-delete-btn", function () {
        var $tds = $(this).parent().parent().children();
        var $tr = $(this).parent().parent();
        var ClassId = $($tds[0]).text();
        swal({
                title: "确定已完成该服务?",
                text: "一旦删除不能撤销,请谨慎操作！",
                icon: "warning",
                buttons: true,
                buttons: ["马上去完成", "是的，我已完成"]
            })
            .then((willDelete) => {
                if (willDelete) {
                    $.ajax({
                        type: "post",
                        url: "",
                        data: {
                            "ClassId": ClassId
                        },
                        success: function (data) {
                            var dataObj = $.parseJSON(data);
                            if (dataObj.status === 1) { //后端删除成功
                                swal("您已删除已完成的服务项目", '', "success");
                                $tr.remove(); //删除页面中那一行数据
                                $('.loadTab').trigger('showNotSys()');
                            } else {
                                swal("出错啦。。。", dataObj.msg, "error"); //后端删除失败
                            }
                        },
                        error: function () { // ajax请求失败
                            swal("啊哦。。。", "服务器走丢了。。。", "error");
                        }
                    });
                } else {
                    swal("请尽快完成该项服务再来删除吧~");
                }
            });
    });
}

//初始化fileinput控件
$('#txt_file').fileinput({
    language: 'zh', //设置语言
        uploadUrl: '', //上传的地址
        allowedFileExtensions : ['jpg', 'png','gif','jpeg'],//接收的文件后缀
        showUpload: false, //是否显示上传按钮
        showCaption: false,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式
        maxFileSize: 2048          
})

//获取发布公告中的值传给首页
$('.notBtn').on('click',function () {
    var noticeData = $('.notGroup input').val();
    // var text = editor2.txt.html();//获取的喊标签的值
    var text = editor2.txt.text();//获取纯文本的值
    console.log(noticeData,text);
})