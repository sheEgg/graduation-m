(function innit() {
    var smpatient = [{
            "id": 20180110,
            "name": "吕一苗",
            "sex": "女",
            "phone": 15236478900,
            "address": "幸福小区一期23栋1102",
            "date": "9:00",
            "kind": "糖尿病足换药"
        },
        {
            "id": 20180111,
            "name": "乐健美",
            "sex": "女",
            "phone": 15236478900,
            "address": "幸福小区一期23栋1102",
            "date": "9:30",
            "kind": "高血压康复训练"
        },
        {
            "id": 20180112,
            "name": "梁世谨",
            "sex": "男",
            "phone": 15236478900,
            "address": "幸福小区一期23栋1102",
            "date": "10:00",
            "kind": "右肢残疾康复训练"
        },
        {
            "id": 20180113,
            "name": "路东飞",
            "sex": "男",
            "phone": 15236478900,
            "address": "幸福小区一期23栋1102",
            "date": "10:30",
            "kind": "抑郁症随访"
        },
        {
            "id": 20180114,
            "name": "窦凯",
            "sex": "男",
            "phone": 15236478900,
            "address": "幸福小区一期23栋1102",
            "date": "11:00",
            "kind": "卧床病人随访"
        },
        {
            "id": 20180115,
            "name": "毛丽新",
            "sex": "女",
            "phone": 15236478900,
            "address": "幸福小区一期23栋1102",
            "date": "13:00",
            "kind": "产妇随访"
        },
        {
            "id": 20180116,
            "name": "孟跃",
            "sex": "男",
            "phone": 15236478900,
            "address": "幸福小区一期23栋1102",
            "date": "14:30",
            "kind": "老年痴呆随访"
        },
        {
            "id": 20180117,
            "name": "莫三勇",
            "sex": "男",
            "phone": 15236478900,
            "address": "幸福小区一期23栋1102",
            "date": "15:30",
            "kind": "独居老人随访"
        },
        {
            "id": 20180118,
            "name": "慕子吟",
            "sex": "男",
            "phone": 15236478900,
            "address": "幸福小区一期23栋1102",
            "date": "16:00",
            "kind": "术后康复训练"
        },
        {
            "id": 20180114,
            "name": "窦凯",
            "sex": "男",
            "phone": 15236478900,
            "address": "幸福小区一期23栋1102",
            "date": "11:00",
            "kind": "卧床病人随访"
        },
    ];
    $('#smtable').DataTable({
        // ajax: {
        //     type: "post",
        //     url: ""
        // },
        // processing: true,
        // stateSave: false,
        // ordering: false,
        // serverSide: true,
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
        data: smpatient,
        columns: [{
                "className": "details-control",
                "data": null,
                "defaultContent": '<td><span><i class="fa fa-square-o fa-lg"></i></span></td>'
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
                data: 'date'
            },
            {
                data: 'kind'
            },
            {
                "className": "table-control",
                "data": null,
                "defaultContent": "<td><i title='删除' class='fa fa-trash-o table-delete-btn' aria-hidden='true'>删除</i><i title='修改' class='fa fa-pencil-square-o table-update-btn' aria-hidden='true'>修改</i><i title='查看' class='fa fa-search-plus table-view-btn' aria-hidden='true'>查看</i></td>"
            }
        ]
    });
    $("#smtable").on("click", "td.details-control",
        function () {
            // 去掉全选的全中状态
            if ($(this).find("i").hasClass("fa-check-square")) {

                $(this).find("i").attr("class", "fa fa-square-o fa-lg");
            } else {

                $(this).find("i").attr("class", "fa fa-check-square fa-lg")
            };
        });
    $('.table-delete-btn').on('click', function () {
        swal({
                title: "确定删除?",
                text: "一旦删除，不能撤销！",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                    swal("您已成功删除该条数据!", {
                        icon: "success",
                    });
                } else {
                    swal("您已取消删除数据!");
                }
            });
    })


    $("#smadd").click(function () {
        $("#smform").show();
    });
    $("#smclose").click(function () {
        $("#smform").hide();
    })

    // 2019/2/20新增内容
    //新增操作
    $('#smbtn').click(function add() {
        var smid = document.getElementById('smid').value;
        var smname = document.getElementById('smname').value;
        var smsex = $('#smform input[name="sex"]:checked ').val();
        var smphone = document.getElementById('smphone').value;
        var address = document.getElementById('address').value;
        var time = document.getElementById('time').value;
        var smkind = document.getElementById('smkind').value;
        row = document.getElementById('smtb').insertRow();
        if (row != null) {
            cell = row.insertCell();
            cell.innerHTML = "<span><i class='fa fa-square-o fa-lg'></i></span>";
            cell = row.insertCell();
            cell.innerHTML = smid;
            cell = row.insertCell();
            cell.innerHTML = smname;
            cell = row.insertCell();
            cell.innerHTML = smsex;
            cell = row.insertCell();
            cell.innerHTML = smphone;
            cell = row.insertCell();
            cell.innerHTML = address;
            cell = row.insertCell();
            cell.innerHTML = time;
            cell = row.insertCell();
            cell.innerHTML = smkind;
            cell = row.insertCell();
            cell.innerHTML = "<i title='删除' class='fa fa-trash-o table-delete-btn' aria-hidden='true'>删除</i><i title='修改' class='fa fa-pencil-square-o table-update-btn' aria-hidden='true'>修改</i><i title='查看' class='fa fa-search-plus table-view-btn' aria-hidden='true'>查看</i>";
        }
        $('.del').on('click', function () {
            swal({
                    title: "确定删除?",
                    text: "一旦删除，不能撤销！",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                        swal("您已成功删除该条数据!", {
                            icon: "success",
                        });
                    } else {
                        swal("您已取消删除数据!");
                    }
                });
        })
        return false;
    })
    // --新增内容--
})();