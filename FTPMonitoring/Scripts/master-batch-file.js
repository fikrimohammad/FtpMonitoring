$(document).ready(function () {
    listMasterBatchFile();
});

/* Fungsi Untuk Memanggil Datatable Master BatchFile */
function listMasterBatchFile() {
    $("#MasterBatchFileDatatables").dataTable({
        language: {
            searchPlaceholder: "Cari Nama Path Dari Batch File"
        },
        ajax: {
            "url": "/MasterBatchFile/ListBatchFile",
            "dataType": "JSON",
            "type": "GET"
        },
        columns: [
            { data: "Id", searchable: false },
            { data: "PathName" },
            {
                data: "Id", searchable: false, orderable: false,
                render: function (data) {
                    return "<a href=\"#\" class=\"btn btn-primary\" style=\"margin-right:10px;\" onclick=\"getMasterBatchFile(1, " + data + ")\">" +
                        "<i class=\"fa fa-edit\" style=\"margin-right: 5px;\"></i>Ubah" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-info\" style=\"margin-right:10px;\" onclick=\"getMasterBatchFile(2, " + data + ")\">" +
                        "<i class=\"fa fa-info\" style=\"margin-right: 5px;\"></i>Lihat" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-danger\" onclick=\"getMasterBatchFile(3, " + data + ")\">" +
                        "<i class=\"fa fa-trash-o\" style=\"margin-right: 5px;\"></i>Hapus" +
                        "</a>";
                }
            }
        ]
    });
}

/* Fungsi Untuk Menambahkan Data Master BatchFile */
function addMasterBatchFile() {
    var form = $("#MasterBatchFileForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
    * Terkait Data Master BatchFile Yang Akan Ditambahkan
    */
    var batchFileObj = {
        "Name": $("#name").val()           // Index Untuk Menyimpan Nama BatchFile
    };

    /* Operasi AJAX Untuk Create Master BatchFile */
    $.ajax({
        url: "/MasterBatchFile/Create",
        data: {
            __RequestVerificationToken: token,
            masterBatchFile: batchFileObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {
                /* Menutup Utility Modal */
                $("#MasterBatchFileModal").modal("hide");

                /* Menghapus Datatable Master BatchFile Untuk Persiapan Reset Datatable */
                $("#MasterBatchFileDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master BatchFile Dengan Data Yang Baru Ditambahkan  */
                listMasterBatchFile();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Ditambahkan */
                toastr.success("Penambahan Data Master Batch File Berhasil !",
                    "Master Batch File dengan path " + batchFileObj.Name + " berhasil ditambahkan.");
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

/* Fungsi Untuk Merubah Sebuah Data Master BatchFile */
function updateMasterBatchFile() {
    var form = $("#MasterBatchFileForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
     * Terkait Data Master BatchFile Yang Akan Dirubah
     */
    var batchFileObj = {
        "Id": $("#id").val(),
        "Name": $("#name").val()
    };

    /* Operasi AJAX Untuk Update Master SRO */
    $.ajax({
        url: "/MasterBatchFile/Update",
        data: {
            __RequestVerificationToken: token,
            masterBatchFile: batchFileObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {

            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {

                /* Menutup Utility Modal */
                $("#MasterBatchFileModal").modal("hide");

                /* Menghapus Datatable Master BatchFile Untuk Persiapan Reset Datatable */
                $("#MasterBatchFileDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master BatchFile Dengan Data Yang Baru Dirubah  */
                listMasterBatchFile();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dirubah */
                toastr.success("Penyuntingan Data Master Batch File Berhasil !",
                    "Master Batch File dengan nama " + batchFileObj.Name + " berhasil dirubah.");

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

/* Fungsi Untuk Memanggil Modal Utility Untuk Kebutuhan RUD(Read, Update, Delete) Dari Master BatchFile */
function getMasterBatchFile(type, id) {
    /* Operasi AJAX Memanggil Modal Utility Sesuai Dengan Kebutuhan RUD(Read, Update, Delete) Dari Master BatchFile */
    $.ajax({
        url: "/MasterBatchFile/GetBatchFile?batchFileId=" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        success: function (result) {
            $.each(result, function (index, value) {
                $("#id").val(value.Id);
                $("#name").val(value.PathName);
            });

            /* Munculkan Utility Modal */
            $("#MasterBatchFileModal").modal("show");

            /* Jika Type = 1 Maka Utility Modal Ditampilkan Untuk Operasi Update Dari Sebuah Data Master BatchFile */
            if (type === 1) {
                /* Panggil Fungsi Untuk Mengaktifkan Semua Form Field */
                enabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Formulir Penyuntingan Data Master Batch File");

                /* Menampilkan Tombol Update */
                $("#btnUpdate").show();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 2 Maka Utility Modal Ditampilkan Untuk Operasi Read Detail Dari Sebuah Data Master BatchFile */
            else if (type === 2) {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Detail Data Master Batch File");

                /* Menghilangkan Tombol Update */
                $("#btnUpdate").hide();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 3 Maka Utility Modal Ditampilkan Untuk Operasi Delete Dari Sebuah Data Master BatchFile */
            else {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Apakah Anda Yakin Ingin Menghapus Data Master Batch File Ini ?");

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

/* Fungsi Untuk Menghapus Sebuah Data Dari Master SRO */
function deleteMasterBatchFile() {
    var form = $("#MasterBatchFileForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Untuk Menyimpan BatchFile Id Yang Ingin Dihapus */
    var batchFileId = $("#id").val();

    /* Variabel Untuk Menyimpan BatchFile Name Yang Ingin Dihapus */
    var batchFileName = $("#name").val();

    /* Operasi AJAX Untuk Delete Master BatchFile */
    $.ajax({
        url: "/MasterBatchFile/Delete",
        data: {
            __RequestVerificationToken: token,
            batchFileId: batchFileId
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status) {

                /* Menutup Utility Modal */
                $("#MasterBatchFileModal").modal("hide");

                /* Menghapus Datatable Master BatchFile Untuk Persiapan Reset Datatable */
                $("#MasterBatchFileDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master BatchFile Dengan Data Yang Baru Dihapus  */
                listMasterBatchFile();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dihapus */
                toastr.success("Data Master Batch File Berhasil Dihapus !",
                    "Master Batch File dengan path " + batchFileName + " berhasil dihapus.");
            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

/* Fungsi Untuk Menyiapkan Utility Modal Untuk Proses Create Sebuah Data Master BatchFile Baru */
function clearTextBox() {

    /* Mengganti Judul Utility Modal */
    $("#modalTitle").text("Formulir Penambahan Data Master Batch File");

    /* Mengosongkan Field Id */
    $("#id").val("");

    /* Mengosongkan Field Nama */
    $("#name").val("");

    /* Menghilangkan Tombol Update */
    $("#btnUpdate").hide();

    /* Menghilangkan Tombol Delete */
    $("#btnDelete").hide();

    /* Menampilkan Tombol Add */
    $("#btnAdd").show();

    /* Mengaktifkan Semua Form Field Yang Ada Pada Utility Modal */
    enabledFormAllField();

}

/* Fungsi Untuk Menonaktifkan Semua Form Field Yang Ada Pada Utility Modal */
function disabledFormAllField() {
    $("#name").attr("disabled", "disabled");
}

/* Fungsi Untuk Mengaktifkan Semua Form Field Yang Ada Pada Utility Modal */
function enabledFormAllField() {
    $("#name").removeAttr("disabled");
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