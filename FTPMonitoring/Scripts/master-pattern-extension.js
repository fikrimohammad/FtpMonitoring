$(document).ready(function () {
    listMasterPatternExtension();
});

/* Fungsi Untuk Memanggil Datatable Master PatternExtension */
function listMasterPatternExtension() {
    $("#MasterPatternExtensionDatatables").dataTable({
        language: {
            searchPlaceholder: "Cari Nama Pattern Extension"
        },
        ajax: {
            "url": "/MasterPatternExtension/ListPatternExtension",
            "dataType": "JSON",
            "type": "GET"
        },
        columns: [
            { data: "Id", searchable: false },
            { data: "Name" },
            {
                data: "Id", searchable: false, orderable: false,
                render: function (data) {
                    return "<a href=\"#\" class=\"btn btn-primary\" style=\"margin-right:10px;\" onclick=\"getMasterPatternExtension(1, " + data + ")\">" +
                        "<i class=\"fa fa-edit\" style=\"margin-right: 5px;\"></i>Ubah" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-info\" style=\"margin-right:10px;\" onclick=\"getMasterPatternExtension(2, " + data + ")\">" +
                        "<i class=\"fa fa-info\" style=\"margin-right: 5px;\"></i>Lihat" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-danger\" onclick=\"getMasterPatternExtension(3, " + data + ")\">" +
                        "<i class=\"fa fa-trash-o\" style=\"margin-right: 5px;\"></i>Hapus" +
                        "</a>";
                }
            }
        ]
    });
}

/* Fungsi Untuk Menambahkan Data Master PatternExtension */
function addMasterPatternExtension() {
    var form = $("#MasterPatternExtensionForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
    * Terkait Data Master PatternExtension Yang Akan Ditambahkan
    */
    var patternExtensionObj = {
        "Name": $("#name").val()           // Index Untuk Menyimpan Nama PatternExtension
    };

    /* Operasi AJAX Untuk Create Master PatternExtension */
    $.ajax({
        url: "/MasterPatternExtension/Create",
        data: {
            __RequestVerificationToken: token,
            masterPatternExtension: patternExtensionObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {
                /* Menutup Utility Modal */
                $("#MasterPatternExtensionModal").modal("hide");

                /* Menghapus Datatable Master PatternExtension Untuk Persiapan Reset Datatable */
                $("#MasterPatternExtensionDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master PatternExtension Dengan Data Yang Baru Ditambahkan  */
                listMasterPatternExtension();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Ditambahkan */
                toastr.success("Penambahan Data Master Pattern Extension Berhasil !",
                    "Master Pattern Extension dengan nama " + patternExtensionObj.Name + " berhasil ditambahkan.");
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

/* Fungsi Untuk Merubah Sebuah Data Master PatternExtension */
function updateMasterPatternExtension() {
    var form = $("#MasterPatternExtensionForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
     * Terkait Data Master PatternExtension Yang Akan Dirubah
     */
    var patternExtensionObj = {
        "Id": $("#id").val(),
        "Name": $("#name").val()
    };

    /* Operasi AJAX Untuk Update Master PatternExtension */
    $.ajax({
        url: "/MasterPatternExtension/Update",
        data: {
            __RequestVerificationToken: token,
            masterPatternExtension: patternExtensionObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {

            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {

                /* Menutup Utility Modal */
                $("#MasterPatternExtensionModal").modal("hide");

                /* Menghapus Datatable Master PatternExtension Untuk Persiapan Reset Datatable */
                $("#MasterPatternExtensionDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master Template File Dengan Data Yang Baru Dirubah  */
                listMasterPatternExtension();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dirubah */
                toastr.success("Penyuntingan Data Master Pattern Extension Berhasil !",
                    "Master Pattern Extension dengan nama " + patternExtensionObj.Name + " berhasil dirubah.");

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

/* Fungsi Untuk Memanggil Modal Utility Untuk Kebutuhan RUD(Read, Update, Delete) Dari Master PatternExtension */
function getMasterPatternExtension(type, id) {
    /* Operasi AJAX Memanggil Modal Utility Sesuai Dengan Kebutuhan RUD(Read, Update, Delete) Dari Master PatternExtension */
    $.ajax({
        url: "/MasterPatternExtension/GetPatternExtension?patternExtensionId=" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        success: function (result) {
            $.each(result, function (index, value) {
                $("#id").val(value.Id);
                $("#name").val(value.Name);
            });

            /* Munculkan Utility Modal */
            $("#MasterPatternExtensionModal").modal("show");

            /* Jika Type = 1 Maka Utility Modal Ditampilkan Untuk Operasi Update Dari Sebuah Data Master PatternExtension */
            if (type === 1) {
                /* Panggil Fungsi Untuk Mengaktifkan Semua Form Field */
                enabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Formulir Penyuntingan Data Master Pattern Extension");

                /* Menampilkan Tombol Update */
                $("#btnUpdate").show();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 2 Maka Utility Modal Ditampilkan Untuk Operasi Read Detail Dari Sebuah Data Master PatternExtension */
            else if (type === 2) {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Detail Data Master Pattern Extension");

                /* Menghilangkan Tombol Update */
                $("#btnUpdate").hide();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 3 Maka Utility Modal Ditampilkan Untuk Operasi Delete Dari Sebuah Data Master PatternExtension */
            else {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Apakah Anda Yakin Ingin Menghapus Data Master Pattern Extension Ini ?");

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

/* Fungsi Untuk Menghapus Sebuah Data Dari Master PatternExtension */
function deleteMasterPatternExtension() {
    var form = $("#MasterPatternExtensionForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $("input[name=\"__RequestVerificationToken\"]", form).val();

    /* Variabel Untuk Menyimpan Sro Id Yang Ingin Dihapus */
    var patternExtensionId = $("#id").val();

    /* Variabel Untuk Menyimpan Sro Name Yang Ingin Dihapus */
    var patternExtensionName = $("#name").val();

    /* Operasi AJAX Untuk Delete Master PatternExtension */
    $.ajax({
        url: "/MasterPatternExtension/Delete",
        data: {
            __RequestVerificationToken: token,
            patternExtensionId: patternExtensionId
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status) {

                /* Menutup Utility Modal */
                $("#MasterPatternExtensionModal").modal("hide");

                /* Menghapus Datatable Master PatternExtension Untuk Persiapan Reset Datatable */
                $("#MasterPatternExtensionDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master PatternExtension Dengan Data Yang Baru Dihapus  */
                listMasterPatternExtension();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dihapus */
                toastr.success("Data Master PatternExtension Berhasil Dihapus !",
                    "Master PatternExtension dengan nama " + patternExtensionName + " berhasil dihapus.");
            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

/* Fungsi Untuk Menyiapkan Utility Modal Untuk Proses Create Sebuah Data Master PatternExtension Baru */
function clearTextBox() {

    /* Mengganti Judul Utility Modal */
    $("#modalTitle").text("Formulir Penambahan Data Master Pattern Extension");

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