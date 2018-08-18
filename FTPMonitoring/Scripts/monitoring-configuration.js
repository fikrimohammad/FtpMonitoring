$(document).ready(function () {
    listMonitoringConfiguration();
    emptySelectOption();
});

/* Fungsi Untuk Memanggil Datatable Monitoring Configuration */
function listMonitoringConfiguration() {
    $("#MonitoringConfigurationDatatables").dataTable({
        language: {
            searchPlaceholder: ""
        },
        ajax: {
            "url": "/MonitoringConfiguration/ListMonitoringConfiguration",
            "dataType": "JSON",
            "type": "GET"
        },
        columns: [
            { data: "Id", searchable: false },
            { data: "StatusName" },
            { data: "PathName" },
            { data: "BatchFileName" },
            {
                data: "Id", searchable: false, orderable: false,
                render: function (data) {
                    return "<a href=\"#\" class=\"btn btn-primary\" style=\"margin-right:10px;\" onclick=\"getMonitoringConfiguration(1, " + data + ")\">" +
                        "<i class=\"fa fa-edit\" style=\"margin-right: 5px;\"></i>Ubah" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-info\" style=\"margin-right:10px;\" onclick=\"getMonitoringConfiguration(2, " + data + ")\">" +
                        "<i class=\"fa fa-info\" style=\"margin-right: 5px;\"></i>Lihat" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-danger\" onclick=\"getMonitoringConfiguration(3, " + data + ")\">" +
                        "<i class=\"fa fa-trash-o\" style=\"margin-right: 5px;\"></i>Hapus" +
                        "</a>";
                }
            }
        ]
    });
}

/* Fungsi Untuk Menambahkan Data Konfigurasi Monitoring */
function addMonitoringConfiguration() {
    var form = $("#MonitoringConfigurationForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
    * Terkait Data Konfigurasi Monitoring Yang Akan Ditambahkan
    */
    var monitoringConfigurationObj = {
        "StatusId": $("#statusSelector").val(),         // Index Untuk Menyimpan Input Id Status
        "PathId": $("#pathSelector").val(),             // Index Untuk Menyimpan Input Id Path
        "BatchFileId": $("#batchFileSelector").val()    // Index Untuk Menyimpan Input Id Batch File
    };

    /* Operasi AJAX Untuk Create Konfigurasi Monitoring */
    $.ajax({
        url: "/MonitoringConfiguration/Create",
        data: {
            __RequestVerificationToken: token,
            monitoringConfiguration: monitoringConfigurationObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {
                /* Menutup Utility Modal */
                $("#MonitoringConfigurationModal").modal("hide");

                /* Menghapus Datatable Konfigurasi Monitoring Untuk Persiapan Reset Datatable */
                $("#MonitoringConfigurationDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Konfigurasi Monitoring Dengan Data Yang Baru Ditambahkan  */
                listMonitoringConfiguration();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Ditambahkan */
                toastr.success("Penambahan Data Konfigurasi Monitoring Berhasil !",
                    "Konfigurasi untuk status " + $("#statusSelector option:selected").text() + " berhasil ditambahkan.");
            }
            /* Jika Tidak Berhasil Melewati Validasi ModelState */
            else {
                /* Menampilkan Error Dari Hasil Validasi ModelState */
                showErrorNotification(result.errors);
            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

/* Fungsi Untuk Merubah Sebuah Data Konfigurasi Monitoring */
function updateMasterFile() {
    var form = $("#MonitoringConfigurationForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
     * Terkait Data Konfigurasi Monitoring Yang Akan Dirubah 
     */
    var monitoringConfigurationObj = {
        "Id": $("#id").val(),                         // Index Untuk Menyimpan Id Monitoring Configuration
        "StatusId": $("#statusSelector").val(),       // Index Untuk Menyimpan Input Id Status
        "PathId": $("#pathSelector").val(),           // Index Untuk Menyimpan Input Id Path
        "BatchFileId": $("#batchFileSelector").val()  // Index Untuk Menyimpan Input Id Batch File
    };

    /* Operasi AJAX Untuk Update Konfigurasi Monitoring */
    $.ajax({
        url: "/MonitoringConfiguration/Update",
        data: {
            __RequestVerificationToken: token,
            monitoringConfiguration: monitoringConfigurationObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {

            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {

                /* Menutup Utility Modal */
                $("#MonitoringConfigurationModal").modal("hide");

                /* Menghapus Datatable Konfigurasi Monitoring Untuk Persiapan Reset Datatable */
                $("#MonitoringConfigurationDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Konfigurasi Monitoring Dengan Data Yang Baru Dirubah  */
                listMonitoringConfiguration();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dirubah */
                toastr.success("Penyuntingan Data Konfigurasi Monitoring Berhasil !",
                    "Konfigurasi monitoring untuk status " + $("#statusSelector").text() + " berhasil dirubah.");

            }
            /* Jika Tidak Berhasil Melewati Validasi ModelState */
            else {

                /* Menampilkan Error Dari Hasil Validasi ModelState */
                showErrorNotification(result.errors);

            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

/* Fungsi Untuk Memanggil Modal Utility Untuk Kebutuhan RUD(Read, Update, Delete) Dari Konfigurasi Monitoring */
function getMonitoringConfiguration(type, id) {

    if ($("#statusSelector").has("option").length < 1) {
        /* Mengisi Status Selector pada Modal Utility */
        appendSelectOptionStatusId();
    }

    if ($("#pathSelector").has("option").length < 1) {
        /* Mengisi Path Selector pada Modal Utility */
        appendSelectOptionPathId();
    }

    if ($("#batchFileSelector").has("option").length < 1) {
        /* Mengisi Batch File Selector pada Modal Utility */
        appendSelectOptionBatchFileId();
    }

    /* Operasi AJAX Memanggil Modal Utility Sesuai Dengan Kebutuhan RUD(Read, Update, Delete) Dari Konfigurasi Monitoring */
    $.ajax({
        url: "/MonitoringConfiguration/GetMonitoringConfiguration?monitoringConfigurationId=" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        success: function (result) {
            $.each(result, function (index, value) {
                $("#id").val(value.Id);
                $("#statusSelector").val(value.StatusId);
                $("#pathSelector").val(value.PathId);
                $("#batchFileSelector").val(value.BatchFileId);
            });

            /* Munculkan Utility Modal */
            $("#MonitoringConfigurationModal").modal("show");

            /* Jika Type = 1 Maka Utility Modal Ditampilkan Untuk Operasi Update Dari Sebuah Data Konfigurasi Monitoring */
            if (type === 1) {
                /* Panggil Fungsi Untuk Mengaktifkan Semua Form Field */
                enabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Formulir Penyuntingan Data Konfigurasi Monitoring");

                /* Menampilkan Tombol Update */
                $("#btnUpdate").show();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 2 Maka Utility Modal Ditampilkan Untuk Operasi Read Detail Dari Sebuah Data Konfigurasi Monitoring */
            else if (type === 2) {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Detail Data Konfigurasi Monitoring");

                /* Menghilangkan Tombol Update */
                $("#btnUpdate").hide();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 3 Maka Utility Modal Ditampilkan Untuk Operasi Delete Dari Sebuah Data Konfigurasi Monitoring */
            else {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Apakah Anda Yakin Ingin Menghapus Data Konfigurasi Monitoring Ini ?");

                /* Menghilangkan Tombol Update */
                $("#btnUpdate").hide();

                /* Menampilkan Tombol Delete */
                $("#btnDelete").show();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }

        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
    return false;
}

/* Fungsi Untuk Menghapus Sebuah Data Dari Konfigurasi Monitoring */
function deleteMonitoringConfiguration() {
    var form = $("#MonitoringConfigurationForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Untuk Menyimpan Monitoring Configuration Id Yang Ingin Dihapus */
    var monitoringConfigurationId = $("#id").val();

    /* Variabel Untuk Menyimpan Status Yang Dimonitoring Pada Konfigurasi Monitoring Yang Ingin Dihapus */
    var statusName = $("#statusSelector option:selected").text();

    /* Operasi AJAX Untuk Delete Master Template File */
    $.ajax({
        url: "/MonitoringConfiguration/Delete",
        data: {
            __RequestVerificationToken: token,
            monitoringConfigurationId: monitoringConfigurationId
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status) {

                /* Menutup Utility Modal */
                $("#MonitoringConfigurationModal").modal("hide");

                /* Menghapus Datatable Konfigurasi Monitoring Untuk Persiapan Reset Datatable */
                $("#MonitoringConfigurationDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Konfigurasi Monitoring Dengan Data Yang Baru Dihapus  */
                listMonitoringConfiguration();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dihapus */
                toastr.success("Data Konfigurasi Monitoring Berhasil Dihapus !",
                    "Konfigurasi Monitoring untuk status " + statusName + " berhasil dihapus.");
            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

/* Fungsi Untuk Menyiapkan Utility Modal Untuk Proses Create Sebuah Data Konfigurasi Monitoring Baru */
function clearTextBox() {

    /* Mengganti Judul Utility Modal */
    $("#modalTitle").text("Formulir Penambahan Data Konfigurasi Monitoring");

    /* Mengosongkan Field Id */
    $("#id").val("");

    /* Mengosongkan Semua Select Option */
    emptySelectOption();

    /* Menghilangkan Tombol Update */
    $("#btnUpdate").hide();

    /* Menghilangkan Tombol Delete */
    $("#btnDelete").hide();

    /* Menampilkan Tombol Add */
    $("#btnAdd").show();

    /* Mengaktifkan Semua Form Field Yang Ada Pada Utility Modal */
    enabledFormAllField();

    /* Mengisi Status Selector pada Modal Utility */
    appendSelectOptionStatusId();

    /* Mengisi Path Selector pada Modal Utility */
    appendSelectOptionPathId();

    /* Mengisi Batch File Selector pada Modal Utility */
    appendSelectOptionBatchFileId();
}

/* Fungsi Untuk Mengisi Status Selector Dengan Option Yang Diambil Dari Tabel Master Status Pada DB */
function appendSelectOptionStatusId() {
    $.ajax({
        url: "/MasterStatus/ListStatus",
        type: "GET",
        dataType: "JSON",
        success: function (result) {
            $("#statusSelector").append($("<option></option>").text("Pilih Nama Status Yang Akan Dimonitoring"));
            $.each(result, function (key, value) {
                $.each(this, function (key, value) {
                    $("#statusSelector").append($("<option></option>").attr("value", value.Id).text(value.Name));
                });
            });
        }
    });
}

/* Fungsi Untuk Mengisi Path Selector Dengan Option Yang Diambil Dari Tabel Master Path Pada DB */
function appendSelectOptionPathId() {
    $.ajax({
        url: "/MasterPath/ListPath",
        type: "GET",
        dataType: "JSON",
        success: function (result) {
            $("#pathSelector").append($("<option></option>").text("Pilih Path Yang Akan Dimonitoring"));
            $.each(result, function (key, value) {
                $.each(this, function (key, value) {
                    $("#pathSelector").append($("<option></option>").attr("value", value.Id).text(value.Name));
                });
            });
        }
    });
}

/* Fungsi Untuk Mengisi Batch File Selector Dengan Option Yang Diambil Dari Tabel Master BatchFile Pada DB */
function appendSelectOptionBatchFileId() {
    $.ajax({
        url: "/MasterBatchFile/ListBatchFile",
        type: "GET",
        dataType: "JSON",
        success: function (result) {
            $("#batchFileSelector").append($("<option></option>").text("Pilih Path Batch File Yang Akan Digunakan"));
            $.each(result, function (key, value) {
                $.each(this, function (key, value) {
                    $("#batchFileSelector").append($("<option></option>").attr("value", value.Id).text(value.PathName));
                });
            });
        }
    });
}

/* Fungsi Untuk Menonaktifkan Semua Form Field Yang Ada Pada Utility Modal */
function disabledFormAllField() {
    $("#statusSelector").attr("disabled", "disabled");
    $("#pathSelector").attr("disabled", "disabled");
    $("#batchFileSelector").attr("disabled", "disabled");
}

function emptySelectOption() {
    /* Mengosongkan Status Selector pada Modal Utility */
    $("#statusSelector").find("option").remove().end();

    /* Mengosongkan Path Selector pada Modal Utility */
    $("#pathSelector").find("option").remove().end();

    /* Mengosongkan Batch File Selector pada Modal Utility */
    $("#batchFileSelector").find("option").remove().end();    
}

/* Fungsi Untuk Mengaktifkan Semua Form Field Yang Ada Pada Utility Modal */
function enabledFormAllField() {
    $("#statusSelector").removeAttr("disabled", "disabled");
    $("#pathSelector").removeAttr("disabled", "disabled");
    $("#batchFileSelector").removeAttr("disabled", "disabled");
}

/* Fungsi Untuk Menampilkan Error Message Dari ModelState Validation */
function showErrorNotification(errors) {
    $.each(errors, function (key, value) {
        var errorMsg = $("<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">" +
            "<button type= \"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +
            "<strong>Whoops!</strong> " + value +
            "</div>").hide().fadeIn(500);
        $("#errorMessage").append(errorMsg);
    });
}