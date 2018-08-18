$(document).ready(function() {
    listMasterFile();
    /* Mengosongkan Field SRO Selector */
    $("#sroSelector").find("option").remove().end();
});

/* Fungsi Untuk Memanggil Datatable Master Template File */
function listMasterFile() {
    $("#MasterFileDatatables").dataTable({
        language: {
            searchPlaceholder: "Cari Nama Template File"
        },
        ajax: {
            "url": "/MasterFile/ListMasterTemplateFile",
            "dataType": "JSON",
            "type": "GET"
        },
        columns: [
            { data: "Id", searchable: false },
            { data: "Name" },
            { data: "SROName" },
            {
                data: "Id", searchable: false, orderable: false,
                render: function (data) {
                    return "<a href=\"#\" class=\"btn btn-primary\" style=\"margin-right:10px;\" onclick=\"getMasterFile(1, " + data + ")\">" +
                        "<i class=\"fa fa-edit\" style=\"margin-right: 5px;\"></i>Ubah" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-info\" style=\"margin-right:10px;\" onclick=\"getMasterFile(2, " + data + ")\">" +
                        "<i class=\"fa fa-info\" style=\"margin-right: 5px;\"></i>Lihat" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-danger\" onclick=\"getMasterFile(3, " + data + ")\">" +
                        "<i class=\"fa fa-trash-o\" style=\"margin-right: 5px;\"></i>Hapus" +
                        "</a>";
                }
            }
        ]
    });
}

/* Fungsi Untuk Menambahkan Data Master Template File */
function addMasterFile() {
    var form = $("#MasterFileForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
    * Terkait Data Master Template File Yang Akan Ditambahkan 
    */
    var fileObj = {
        "Name": $("#name").val(),           // Index Untuk Menyimpan Nama Template File
        "SroId": $("#sroSelector").val()    // Index Untuk Menyimpan Sro Yang Bersangkutan Dari Template File
    };

    /* Operasi AJAX Untuk Create Master Template File */
    $.ajax({
        url: "/MasterFile/Create",
        data: {
            __RequestVerificationToken: token,
            masterFile: fileObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {
                /* Menutup Utility Modal */
                $("#MasterFileModal").modal("hide");

                /* Menghapus Datatable Master Template File Untuk Persiapan Reset Datatable */
                $('#MasterFileDatatables').dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master Template File Dengan Data Yang Baru Ditambahkan  */
                listMasterFile();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Ditambahkan */
                toastr.success("Penambahan Data Master Template File Berhasil !",
                    "Master Template File dengan nama " + fileObj.Name + " berhasil ditambahkan.");
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

/* Fungsi Untuk Merubah Sebuah Data Master Template File */
function updateMasterFile() {
    var form = $("#MasterFileForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
     * Terkait Data Master Template File Yang Akan Dirubah 
     */
    var fileObj = {
        "Id": $("#id").val(),
        "Name": $("#name").val(),
        "SroId": $("#sroSelector").val()
    };

    /* Operasi AJAX Untuk Update Master Template File */
    $.ajax({
        url: "/MasterFile/Update",
        data: {
            __RequestVerificationToken: token,
            masterFile: fileObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {

            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {

                /* Menutup Utility Modal */
                $("#MasterFileModal").modal("hide");

                /* Menghapus Datatable Master Template File Untuk Persiapan Reset Datatable */
                $("#MasterFileDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master Template File Dengan Data Yang Baru Dirubah  */
                listMasterFile();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dirubah */
                toastr.success("Penyuntingan Data Master Template File Berhasil !",
                    "Master Template File dengan nama " + fileObj.Name + " berhasil dirubah.");

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

/* Fungsi Untuk Memanggil Modal Utility Untuk Kebutuhan RUD(Read, Update, Delete) Dari Master Template File */
function getMasterFile(type, id) {

    if ($("#sroSelector").has("option").length < 1) {
        /* Mengisi SRO Selector pada Modal Utility */
        appendSelectOptionSroId();
    }
    
    /* Operasi AJAX Memanggil Modal Utility Sesuai Dengan Kebutuhan RUD(Read, Update, Delete) Dari Master Template File */
    $.ajax({
        url: "/MasterFile/GetMasterTemplateFile?fileTemplateId=" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        success: function (result) {
            $.each(result, function (index, value) {
                $("#id").val(value.Id);
                $("#name").val(value.Name);
                $("#sroSelector").val(value.SROId);
            });

            /* Munculkan Utility Modal */
            $("#MasterFileModal").modal("show");

            /* Jika Type = 1 Maka Utility Modal Ditampilkan Untuk Operasi Update Dari Sebuah Data Master Template File */
            if (type === 1) {
                /* Panggil Fungsi Untuk Mengaktifkan Semua Form Field */
                enabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Formulir Penyuntingan Data Master Template File");

                /* Menampilkan Tombol Update */
                $("#btnUpdate").show();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 2 Maka Utility Modal Ditampilkan Untuk Operasi Read Detail Dari Sebuah Data Master Template File */
            else if (type === 2) {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Detail Data Master Template File");

                /* Menghilangkan Tombol Update */
                $("#btnUpdate").hide();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 3 Maka Utility Modal Ditampilkan Untuk Operasi Delete Dari Sebuah Data Master Template File */
            else {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Apakah Anda Yakin Ingin Menghapus Data Master Template File Ini ?");

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

/* Fungsi Untuk Menghapus Sebuah Data Dari Master Template File */
function deleteMasterFile() {
    var form = $("#MasterFileForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Untuk Menyimpan File Template Id Yang Ingin Dihapus */
    var fileId = $("#id").val();

    /* Variabel Untuk Menyimpan File Template Name Yang Ingin Dihapus */
    var fileName = $("#name").val();

    /* Operasi AJAX Untuk Delete Master Template File */
    $.ajax({
        url: "/MasterFile/Delete",
        data: {
            __RequestVerificationToken: token,
            fileTemplateId: fileId
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status) {

                /* Menutup Utility Modal */
                $("#MasterFileModal").modal("hide");

                /* Menghapus Datatable Master Template File Untuk Persiapan Reset Datatable */
                $("#MasterFileDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master Template File Dengan Data Yang Baru Dihapus  */
                listMasterFile();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dihapus */
                toastr.success("Data Master File Berhasil Dihapus !",
                    "Master File dengan nama " + fileName + " berhasil dihapus.");
            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

/* Fungsi Untuk Menyiapkan Utility Modal Untuk Proses Create Sebuah Data Master Template File Baru */
function clearTextBox() {

    /* Mengganti Judul Utility Modal */
    $("#modalTitle").text("Formulir Penambahan Data Master Template File");

    /* Mengosongkan Field Id */
    $("#id").val("");

    /* Mengosongkan Field Nama */
    $("#name").val("");

    /* Mengosongkan Field SRO Selector */
    $("#sroSelector").find("option").remove().end();

    /* Menghilangkan Tombol Update */
    $("#btnUpdate").hide();

    /* Menghilangkan Tombol Delete */
    $("#btnDelete").hide();

    /* Menampilkan Tombol Add */
    $("#btnAdd").show();

    /* Mengaktifkan Semua Form Field Yang Ada Pada Utility Modal */
    enabledFormAllField();

    /* Mengisi Option Pada SRO Selector */
    appendSelectOptionSroId();
}

/* Fungsi Untuk Mengisi SRO Selector Dengan Option Yang Diambil Dari Tabel SRO Pada DB */
function appendSelectOptionSroId() {
    $.ajax({
        url: "/MasterSRO/ListSro",
        type: "GET",
        dataType: "JSON",
        success: function (result) {
            $("#sroSelector").append($("<option></option>").text("Pilih SRO Yang Bersangkutan"));
            $.each(result, function (key, value) {
                $.each(this, function(key, value) {
                    $("#sroSelector").append($("<option></option>").attr("value", value.Id).text(value.Name));
                });
            });
        }
    });
}

/* Fungsi Untuk Menonaktifkan Semua Form Field Yang Ada Pada Utility Modal */
function disabledFormAllField() {
    $("#name").attr("disabled", "disabled");
    $("#sroSelector").attr("disabled", "disabled");
}

/* Fungsi Untuk Mengaktifkan Semua Form Field Yang Ada Pada Utility Modal */
function enabledFormAllField() {
    $("#name").removeAttr("disabled");
    $("#sroSelector").removeAttr("disabled");
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