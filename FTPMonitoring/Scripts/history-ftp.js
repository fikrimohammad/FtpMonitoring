$("#historyFtpModal").on("shown.bs.modal",
    function() {
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    });

function showHistoryModal(fileTemplateId) {
    $("#historyFtpModal").modal("show");
    LoadHistoryFtpData(fileTemplateId);
}

function LoadHistoryFtpData(fileTemplateId) {
    $("#history_ftp_datatables").dataTable().fnDestroy();
    $("#history_ftp_datatables").dataTable({
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        ajax: {
            "url": "/FtpMonitor/ListHistoryMonitoringLog?fileTemplateId=" + fileTemplateId,
            "dataType": "JSON",
            "type": "GET"
        },
        columnDefs: [
            {
                targets: "_all",
                className: "dt-center"
            },
            {
                targets: "_all",
                width: 135
            }
        ],
        fixedColumns: true,
        columns: [
            {
                data: "MonitoringLogDate", searchable: false,
                render: function (data) {
                    return moment(data).format("ll");
                }
            },
            { data: "FileTemplateName" },
            { data: "FileName" },
            {
                data: "FileModifiedDatetime",
                render: function (data) {
                    return moment(data).format("lll");
                }
            },
            { data: "FileStatus" },
            {
                data: "ETLRunDatetime",
                render: function(data) {
                    return moment(data).format("lll");
                }
            }
        ]
    });
}
