$("#historyFtpModal").on("shown.bs.modal",
    function() {
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    });

/* Membuka Modal List Historis FTP */
function showHistoryModal(fileTemplateId) {
    $("#historyFtpModal").modal("show");
    loadHistoryFtpData(fileTemplateId);
}

/* Membuat Datatable List Historis FTP Pada Modal List Historis FTP */
function loadHistoryFtpData(fileTemplateId) {
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
            },
            {
                data: "FileName", searchable: false, orderable: false,
                render: function (data) {
                    return " <a href=\"#\" class=\"btn btn-danger btn-xs\" onclick=\"loadHistoryFTPTimeline('" + data.toString() + "')\"> " +
                           "    <i class=\"fa fa-info-circle\" style=\"margin-right: 5px;\"></i>Lihat Detail Historis " +
                           " </a> ";  
                }
            }
        ]
    });
}

/* Membuka dan Memuat Modal Detail Timeline Historis FTP */
function loadHistoryFTPTimeline(inputFileName) {
    var fileName = inputFileName.toString();
    $.ajax({
        url: "/FtpMonitor/GetHistoryMonitoringLogDetail?fileName=" + fileName,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        success: function (result) {

            /* Menghapus Semua Data Timeline Pada Modal Detail Timeline Historis FTP */
            $("#historyTimeline").html("");

            /* Memasukkan Hasil Dari Operasi AJAX Ke Dalam Bentuk Timeline
               Pada Modal Detail Timeline Historis FTP */
            $.each(result, function () {
                $.each(this, function (key, value) {
                    var timelineItem =
                        " <li> " +
                            " <i class=\"fa fa-user bg-red\"></i> " +
                            " <div class=\"timeline-item\"> " +
                                " <span class=\"time\"><i class=\"fa fa-clock-o\"></i> " + moment(value.ETLRunDateTime).format("lll") + " </span> " +
                                " <h3 class=\"timeline-header no-border\"> " + value.FileStatus + " </h3> " +
                            " </div> " +
                        " </li> ";
                    $("#historyTimeline").append(timelineItem);
                });
            });

            $("#historyFtpModal").one("hidden.bs.modal", function () {
                $("#historyTimelineModal").modal("show");
            }).modal("hide");
        }
    });    
}

function closeHistoryFTPTimeline() {

    $("#historyTimelineModal").one("hidden.bs.modal", function () {
        $("#historyFtpModal").modal("show");
    }).modal("hide");
}
