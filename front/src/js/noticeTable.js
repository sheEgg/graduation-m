(function innit() {
    // var noticeList = [{
    //     "title":"元旦值班安排",
    //     "text":"内科、化验室：2018年12月30日至2019年1月1日8：00-20：00门诊；中医科、放射科：2018年12月30日-2019年1月1日8：00-17：00门诊;外科：2018年12月31日8：00-12：00上午半天门诊;",
    //     "author": "温江社区卫生服务中心",
    //     "date": "2018年12月28日"
    // },
    // {
    //     "title": "流感知识培训会",
    //     "text": "为有效提升流感诊疗和防控知识，2019年1月17日下午3：30，温江社区卫生服务中心将组织全科医生进行流感知识二次培训。请全科全体医务人员参加培训，培训由参加流感诊疗和防控培训的唐帅医生主讲。",
    //     "author": "温江社区卫生服务中心",
    //     "date": "2018年12月28日"
    // },
    // {
    //     "title": "绩效管理研讨会",
    //     "text": "为稳步推进绩效管理系统的上线，进一步加强社区卫生服务的规范化、精细化、信息化建设，温江社区卫生服务中心于2019年1月14日召开了'绩效管理项目参数设定研讨会'。会议邀请了中国人民大学医院管理研究中心项目专家林江宇教授团队，中心主任贾问樱、书记黄慧英及相关中层干部参会。",
    //     "author": "温江社区卫生服务中心",
    //     "date": "2018年12月28日"
    // }];
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
                "defaultContent": "<td><i title='删除' class='fa fa-trash-o table-delete-btn' aria-hidden='true'>删除</i><i title='修改' class='fa fa-pencil-square-o table-update-btn' aria-hidden='true'>修改</i><i title='查看' class='fa fa-search-plus table-view-btn' aria-hidden='true'>查看</i></td>"
            }
        ]
    });
    $("#noticeTable").on("click", "td.details-control",
        function () {
            // 全选中状态
            $(".allChecked").find("i").attr("class", "fa fa-square-o fa-lg");
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
})();