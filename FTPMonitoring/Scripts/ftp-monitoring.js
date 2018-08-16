$(document).ready(function () {
    for (var i = 1; i <= 3; i++) {
        LoadMonitoringLogs(i);
    }
    /*setInterval("autoRefreshMonitoringLogs()", 10000);*/
});

function autoRefreshMonitoringLogs() {
    initMonitoringLogs();
    for (var i = 1; i <= 3; i++) {
        LoadMonitoringLogs(i);
    }
}

function initMonitoringLogs() {
    $("#BEIMonitoringLogContainer").html("");
    $("#KPEIMonitoringLogContainer").html("");
    $("#KSEIMonitoringLogContainer").html("");
}

function LoadMonitoringLogs(id) {
    var sroId = parseInt(id);
    /*var inpObj = { sroId: sroId };
    var inpParam = JSON.stringify(inpObj);*/
    /*            console.log(inpParam);*/
    $.ajax({
        url: "/FtpMonitor/ListMonitoringLog?sroId=" + sroId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        success: function (result) {
            RenderMonitoringLogView(sroId, result);
        }
    });
}

function LoadMonitoringLogDetail(id) {
    var monitoringLogId = parseInt(id);
    return $.ajax({
        url: "/FtpMonitor/GetMonitoringLogDetail?monitoringLogId=" + monitoringLogId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        async: false,
        success: function (result) {
            return result;
        }
    }).responseText;
}

function RenderMonitoringLogView(sroId, monitoringLogCollections) {
    var monitoringLogHTML, masterFileId, fileName, fileStatus, fileDetail;
    $.each(monitoringLogCollections,
        function () {
            $.each(this,
                function (index, value) {
                    if (value.monitoringLogDetailCount > 0) {
                        fileDetail = JSON.parse(LoadMonitoringLogDetail(value.monitoringLogId));
                        $.each(fileDetail,
                            function (index, value) {
                                masterFileId = value.fileTemplateId;
                                fileName = value.fileName;
                                fileStatus = value.fileStatus;
                            });

                    } else {
                        masterFileId = value.fileTemplateId;
                        fileName = value.fileTemplateName;
                        fileStatus = "Tidak Ada Proses Monitoring";
                    }
                    monitoringLogHTML = " <div class=\"col-md-3 text-center\"> " +
                        "     <div class=\"row pt-5\"> " +
                        "         <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\"> " +
                                    fileName +
                        "         </div> " +
                        "     </div>" +
                        "     <div class=\"row pt-5\"> " +
                        "         <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\"> " +
                        "             <i class=\"fa fa-file-zip-o fa-3x\")></i></br>" +
                        "         </div> " +
                        "     </div>" +
                        "     <div class=\"row pt-5\"> " +
                        "         <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 \"> " +
                        "             <div class=\"label label-info\"> " +
                                        fileStatus +
                        "             </div>" +
                        "         </div> " +
                        "     </div>" +
                        "     <div class=\"row pt-5\"> " +
                        "         <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 \"> " +
                        "             <div class=\"btn btn-danger\" onclick=\"showHistoryModal(" + masterFileId + ")\">" +
                        "               Lihat Historis " +        
                        "             </div>" +
                        "         </div> " +
                        "     </div>" +
                        "  </div> ";
                    if (sroId === 1) {
                        $("#BEIMonitoringLogContainer").append(monitoringLogHTML);
                    } else if (sroId === 2) {
                        $("#KPEIMonitoringLogContainer").append(monitoringLogHTML);
                    } else {
                        $("#KSEIMonitoringLogContainer").append(monitoringLogHTML);
                    }
                });
        });
}