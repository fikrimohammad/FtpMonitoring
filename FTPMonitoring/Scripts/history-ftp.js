function showHistoryModal(fileTemplateId) {
    $("#historyFtpModal").modal("show");
    LoadHistoryFtpData(fileTemplateId);
}

function LoadHistoryFtpData(fileTemplateId) {
    $("#history_ftp_datatables").dataTable().fnDestroy();
    $("#history_ftp_datatables").dataTable({
        "scrollX": true,
        scrollCollapse: true,
        ajax: {
            "url": "/FtpMonitor/ListHistoryMonitoringLog?fileTemplateId=" + fileTemplateId,
            "dataType": "JSON",
            "type": "GET"
        },
        columns: [
            { data: "monitoringLogDate", searchable: false },
            { data: "fileTemplateName" },
            { data: "fileName" },
            { data: "fileModifiedDatetime" },
            { data: "fileStatus" },
            { data: "etlRunDatetime" }
        ]
    });
}
