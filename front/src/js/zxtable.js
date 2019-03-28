(function innit() {
    // var zxpatient = [{
    //         "id": 20180101,
    //         "name": "李富贵",
    //         "sex": "男",
    //         "phone": 15236478900,
    //         "date": "2018-12-31",
    //         "kind": "高血压体脂肪检查"
    //     },
    //     {
    //         "id": 20180102,
    //         "name": "曾宝强",
    //         "sex": "男",
    //         "phone": 15236478900,
    //         "date": "2018-12-25",
    //         "kind": "糖尿病空腹血糖检查"
    //     },
    //     {
    //         "id": 20180103,
    //         "name": "陈飞",
    //         "sex": "男",
    //         "phone": 15236478900,
    //         "date": "2018-12-11",
    //         "kind": "幼儿卡介苗接种"
    //     },
    //     {
    //         "id": 20180104,
    //         "name": "黄丽",
    //         "sex": "女",
    //         "phone": 15236478900,
    //         "date": "2018-12-06",
    //         "kind": "孕期B超检查"
    //     },
    //     {
    //         "id": 20180105,
    //         "name": "王成",
    //         "sex": "男",
    //         "phone": 15236478900,
    //         "date": "2018-12-03",
    //         "kind": "骨折之后康复治疗"
    //     },
    //     {
    //         "id": 20180106,
    //         "name": "吕一丽",
    //         "sex": "女",
    //         "phone": 15236478900,
    //         "date": "2018-11-29",
    //         "kind": "乙肝疫苗接种"
    //     },
    //     {
    //         "id": 20180107,
    //         "name": "卢玉兰",
    //         "sex": "女",
    //         "phone": 15236478900,
    //         "date": "2018-11-19",
    //         "kind": "糖尿病肾功能检查"
    //     },
    //     {
    //         "id": 20180108,
    //         "name": "刘万鹏",
    //         "sex": "男",
    //         "phone": 15236478900,
    //         "date": "2018-11-16",
    //         "kind": "高血压康复治疗"
    //     },
    //     {
    //         "id": 20180109,
    //         "name": "雷乔亚",
    //         "sex": "女",
    //         "phone": 15236478900,
    //         "date": "2018-11-13",
    //         "kind": "产后恢复康复治疗"
    //     },
    //     {
    //         "id": 20180109,
    //         "name": "张三",
    //         "sex": "女",
    //         "phone": 15236478900,
    //         "date": "2018-11-10",
    //         "kind": "产后恢复康复治疗"
    //     },
    //     {
    //         "id": 20180109,
    //         "name": "李四",
    //         "sex": "女",
    //         "phone": 15236478900,
    //         "date": "2018-11-01",
    //         "kind": "产后恢复康复治疗"
    //     },
    // ];
    $('#zxtable').DataTable({
        ajax: {
            url: "https://easy-mock.com/mock/5c9c2e7fd172204b3a07ec75/zxList",
        },
        processing: true,
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
        aoColumnDefs: [ { "bSortable": false, "aTargets": [ 0 ,7] }],
        aaSorting: [[1, "asc"]],
        columns: [
            {
                "className": "details-control",
                data: null,
                "defaultContent": '<td><span><i class="fa fa-square-o fa-lg"></i></span></td>'
            },
            {data: "id" },
            {data: "name" },
            {data: "sex"},
            {data: "phone" },
            {data: "date"},
            {data: "kind"},
            {
                "className": "table-control",
                data: null,
                "defaultContent": "<td><i title='删除' class='fa fa-trash-o table-delete-btn' aria-hidden='true'>删除</i><i title='修改' class='fa fa-pencil-square-o table-update-btn' aria-hidden='true'>修改</i><i title='查看' class='fa fa-search-plus table-view-btn' aria-hidden='true'>查看</i></td>"
            }]
    });
    $("#zxtable").on("click", "td.details-control",
    function() {
        // 全选中状态
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


    // 2019/2/20新增内容
    //新增操作
    $('#zxbtn').click(function add() {
        var id = document.getElementById('id').value;
        var name = document.getElementById('name').value;
        var sex = $('#zxform input[name="sex"]:checked ').val();
        var phone = document.getElementById('phone').value;
        var date = document.getElementById('date').value;
        var kind = document.getElementById('kind').value;
        row = document.getElementById('zxtb').insertRow();
        if (row != null) {
            cell = row.insertCell();
            cell.innerHTML = "<span><i class='fa fa-square-o fa-lg'></i></span>";
            cell = row.insertCell();
            cell.innerHTML = id;
            cell = row.insertCell();
            cell.innerHTML = name;
            cell = row.insertCell();
            cell.innerHTML = sex;
            cell = row.insertCell();
            cell.innerHTML = phone;
            cell = row.insertCell();
            cell.innerHTML = date;
            cell = row.insertCell();
            cell.innerHTML = kind;
            cell = row.insertCell();
            cell.innerHTML = "<i title='删除' class='fa fa-trash-o table-delete-btn' aria-hidden='true'>删除</i><i title='修改' class='fa fa-pencil-square-o table-update-btn' aria-hidden='true'>修改</i><i title='查看' class='fa fa-search-plus table-view-btn' aria-hidden='true'>查看</i>";
        }
    })
    // --新增内容--
    
    $("#zxadd").click(function () {
        $("#zxform").show();
    });
    $("#zxclose").click(function () {
        $("#zxform").hide();
    })

})();