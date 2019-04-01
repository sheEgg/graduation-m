function smList() {
    //渲染表格
    if ($.fn.dataTable.isDataTable('#smtable')) {
        table = $('#smtable').DataTable();
    } else {
        $('#smtable').DataTable({
            ajax: {
                url: "https://easy-mock.com/mock/5c9c2e7fd172204b3a07ec75/smList"
            },
            processing: true,
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
                "sSearch": "按姓名搜索:",
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
                "aTargets": [0, 8]
            }],
            aaSorting: [
                [1, "asc"]
            ],
            columns: [{
                    "className": "index",
                    "data": null,
                    "render": function (data, type, row, meta) {
                        var no = meta.settings._iDisplayStart + meta.row + 1;
                        return no;
                    }
                },
                {
                    data: 'id'
                },
                {
                    data: 'name'
                },
                {
                    data: 'sex'
                },
                {
                    data: 'phone'
                },
                {
                    data: 'address'
                },
                {
                    data: 'time'
                },
                {
                    data: 'kind'
                },
                {
                    "className": "table-control",
                    "data": null,
                    "render": function (data, type, row, meta) {
                        var html = "<td><i title='删除' class='fa fa-trash-o table-delete-btn' aria-hidden='true' data-index=" + meta.row + ">已完成</i>" +
                            "<i title='编辑' class='fa fa-pencil-square-o table-update-btn' aria-hidden='true' data-index=" + meta.row + ">查看编辑</i>";
                        return html;
                    }
                }
            ]
        });
    }


    // --新增操作--
    $("#smbtn").click(function (e) {
        e.preventDefault();
        var data = getFormData($('#smList'));
        // console.log(data);
        $.ajax({
            url: 'https://easy-mock.com/mock/5c9c2e7fd172204b3a07ec75/smList',
            type: 'GET',
            data: {
                ...data, //拼接数据
            },
            dataType: 'json',
            success: function (res) {
                // alert("新增成功！");
                // $('#smList')[0].reset();
                // console.log(res);
                if (res.status == 'success') {
                    alert("新增成功！");
                    $('#smList')[0].reset();
                    $('.smTable .sm').trigger('showsmTab');
                }
            }
        })
    })
    function getFormData(dom) {
        var data = $(dom).serializeArray(); //获取表单中的数据,此处获取的是数组
        var result = {};
        data.forEach(function (item, index) {
            result[item.name] = item.value; // 将获取到的数组数据转为对象
        });
        return result;
    }

    //表单回填
    function renderEditForm(data) {
        var editForm = $('#sm-editor-List')[0];
        for (var prop in data) {
            if (editForm[prop]) {
                editForm[prop].value = data[prop];
            }
        }
    }
    var table = $('#smtable').DataTable();
    var tbody = $("#smtable tbody");
    
    //编辑操作
    tbody.on("click", ".table-update-btn", function () {
        $('#sm-editor-form').show();
        var index = $(this).attr('data-index');
        var dataList = table.row(index).data();
        renderEditForm(dataList);
    });
    //编辑之提交
    $('#sm-editor-btn').click(function (e) {
        e.preventDefault();
        var data = getFormData($('#sm-editor-List'));
        $.ajax({
            url: 'https://easy-mock.com/mock/5c9c2e7fd172204b3a07ec75/smList',
            type: 'GET',
            data: {
                ...data, //拼接数据
            },
            dataType: 'json',
            success: function (res) {
                alert("修改成功！");
                $('#sm-editor-form').hide();
                console.log(res);
                if (res.status == 'success') {
                    alert("修改成功！");
                    $('#sm-editor-form').hide();
                    $('.smTable .sm').trigger('showsmTab');
                }
            }
        })
    })

    //删除操作
    $("#smtable tbody").on("click", ".table-delete-btn", function () {
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
                                $('.smTable .sm').trigger('showsmTab');
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

    $("#smadd").click(function () {
        $("#smform").show();
    });
    $("#smclose").click(function () {
        $("#smform").hide();
    })
    $('#sm-editor-close').click(function () {
        $("#sm-editor-form").hide();
    })
}