$(document).ready(function() {
    listMasterSro();
});

function listMasterSro() {
    $("#MasterStatusDatatables").dataTable({
        language: {
            searchPlaceholder: "Cari Nama Status"
        },
        ajax: {
            "url": "/MasterStatus/ListStatus",
            "dataType": "json",
            "type": "GET"
        },
        columns: [
            { data: "Id", searchable: false },
            { data: "Name" },
            {
                data: "Id", searchable: false, orderable: false,
                render: function (data) {
                    return "<a href=\"#\" class=\"btn btn-primary\" style=\"margin-right:10px;\" onclick=\"getMasterStatus(1, " + data + ")\">" +
                        "<i class=\"fa fa-edit\" style=\"margin-right: 5px;\"></i>Ubah" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-info\" style=\"margin-right:10px;\" onclick=\"getMasterStatus(2, " + data + ")\">" +
                        "<i class=\"fa fa-info\" style=\"margin-right: 5px;\"></i>Lihat" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-danger\" onclick=\"getMasterStatus(3, " + data + ")\">" +
                        "<i class=\"fa fa-trash-o\" style=\"margin-right: 5px;\"></i>Hapus" +
                        "</a>";
                }
            }
        ]
    });
}

function addMasterStatus() {
    var form = $("#MasterStatusForm");
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var statObj = {
        "Name": $("#name").val()
    };
    $.ajax({
        url: "/MasterStatus/Create",
        data: {
            __RequestVerificationToken: token,
            masterStatus: statObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            if (result.status === true) {
                $("#MasterStatusModal").modal("hide");
                $("#MasterStatusDatatables").dataTable().fnDestroy();
                listMasterSro();
                toastr.success("Penambahan Data Master Status Berhasil !",
                    "Master Status dengan nama " + statObj.Name + " berhasil ditambahkan.");
            } else {
                $.each(result.errors, function (key, value) {
                    var errorMsg = $("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">" +
                        "<button type= \"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +
                        "<strong>Whoops!</strong> " + value +
                        "</div>").hide().fadeIn(500);
                    $("#errorMessage").append(errorMsg);
                });

            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function updateMasterStatus() {
    var form = $('#MasterStatusForm');
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var statObj = {
        "Id": $("#id").val(),
        "Name": $("#name").val()
    };
    $.ajax({
        url: "/MasterStatus/Update",
        data: {
            __RequestVerificationToken: token,
            masterStatus: statObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            if (result.status === true) {
                $("#MasterStatusModal").modal("hide");
                $('#MasterStatusDatatables').dataTable().fnDestroy();
                listMasterSro();
                toastr.success("Penyuntingan Data Master Status Berhasil !",
                    "Master Status dengan nama " + statObj.Name + " berhasil dirubah.");
            } else {
                $.each(result.errors, function (key, value) {
                    var errorMsg = $("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">" +
                        "<button type= \"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +
                        "<strong>Whoops!</strong> " + value +
                        "</div>").hide().fadeIn(500);
                    $("#errorMessage").append(errorMsg);
                });

            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function getMasterStatus(type, id) {
    $.ajax({
        url: "/MasterStatus/GetStatus",
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: "{statId: " + id + "}",
        dataType: "json",
        success: function (result) {
            $.each(result, function (index, value) {
                //console.log(v.Fname);    
                $("#id").val(value.Id);
                $("#name").val(value.Name);
            });

            $("#MasterStatusModal").modal("show");
            if (type === 1) {
                enabledFormAllField();
                $("#modalTitle").text("Formulir Penyuntingan Data Master Status");
                $("#btnUpdate").show();
                $("#btnDelete").hide();
                $("#btnAdd").hide();
            }
            else if (type === 2) {
                disabledFormAllField();
                $("#modalTitle").text("Detail Data Master Status");
                $("#btnUpdate").hide();
                $("#btnDelete").hide();
                $("#btnAdd").hide();
            }
            else {
                disabledFormAllField();
                $("#modalTitle").text("Apakah Anda Yakin Ingin Menghapus Data Master Status Ini ?");
                $("#btnUpdate").hide();
                $("#btnDelete").show();
                $("#btnAdd").hide();
            }

        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
    return false;
}

// Function to delete employee data based on the ID.
function deleteMasterStatus() {
    var form = $("#MasterStatusForm");
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    var statId = $("#id").val();
    var statName = $("#name").val();
    $.ajax({
        url: "/MasterStatus/Delete",
        data: {
            __RequestVerificationToken: token,
            statId: statId
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            if (result.status) {
                $("#MasterStatusModal").modal("hide");
                $("#MasterStatusDatatables").dataTable().fnDestroy();
                listMasterSro();
                toastr.success("Data Master Status Berhasil Dihapus !",
                    "Master Status dengan nama " + statName + " berhasil dihapus.");
            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

// Function for clearing the textboxes  
function clearTextBox() {
    $("#modalTitle").text("Formulir Penambahan Data Master Status");
    $("#name").val("");
    $("#btnUpdate").hide();
    $("#btnDelete").hide();
    $("#btnAdd").show();
    enabledFormAllField();
}

// Function for disabling all textboxes 
function disabledFormAllField() {
    $("#name").attr("disabled", "disabled");
}

// Function for enabling all textboxes except Id Form Field 
function enabledFormAllField() {
    $("#name").removeAttr("disabled");
}