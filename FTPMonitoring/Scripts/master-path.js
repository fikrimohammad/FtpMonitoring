$(document).ready(function () {
    listMasterPath();
});

/* Fungsi Untuk Memanggil Datatable Master Path */
function listMasterPath() {
    $("#MasterPathDatatables").dataTable({
        language: {
            searchPlaceholder: "Cari Nama Path"
        },
        ajax: {
            "url": "/MasterPath/ListPath",
            "dataType": "JSON",
            "type": "GET"
        },
        columns: [
            { data: "Id", searchable: false },
            { data: "Name" },
            {
                data: "Id", searchable: false, orderable: false,
                render: function (data) {
                    return "<a href=\"#\" class=\"btn btn-primary\" style=\"margin-right:10px;\" onclick=\"getMasterPath(1, " + data + ")\">" +
                        "<i class=\"fa fa-edit\" style=\"margin-right: 5px;\"></i>Ubah" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-info\" style=\"margin-right:10px;\" onclick=\"getMasterPath(2, " + data + ")\">" +
                        "<i class=\"fa fa-info\" style=\"margin-right: 5px;\"></i>Lihat" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-danger\" onclick=\"getMasterPath(3, " + data + ")\">" +
                        "<i class=\"fa fa-trash-o\" style=\"margin-right: 5px;\"></i>Hapus" +
                        "</a>";
                }
            }
        ]
    });
}

/* Fungsi Untuk Menambahkan Data Master Path */
function addMasterPath() {
    var form = $("#MasterPathForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
    * Terkait Data Master Path Yang Akan Ditambahkan
    */
    var pathObj = {
        "Name": $("#name").val()           // Index Untuk Menyimpan Nama Path
    };

    /* Operasi AJAX Untuk Create Master Path */
    $.ajax({
        url: "/MasterPath/Create",
        data: {
            __RequestVerificationToken: token,
            masterPath: pathObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {
                /* Menutup Utility Modal */
                $("#MasterPathModal").modal("hide");

                /* Menghapus Datatable Master Template File Untuk Persiapan Reset Datatable */
                $("#MasterPathDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master Path Dengan Data Yang Baru Ditambahkan  */
                listMasterPath();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Ditambahkan */
                toastr.success("Penambahan Data Master Path Berhasil !",
                    "Master Path dengan path " + pathObj.Name + " berhasil ditambahkan.");
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

/* Fungsi Untuk Merubah Sebuah Data Master Path */
function updateMasterPath() {
    var form = $("#MasterPathForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
     * Terkait Data Master Path Yang Akan Dirubah
     */
    var pathObj = {
        "Id": $("#id").val(),
        "Name": $("#name").val()
    };

    /* Operasi AJAX Untuk Update Master Path */
    $.ajax({
        url: "/MasterPath/Update",
        data: {
            __RequestVerificationToken: token,
            masterPath: pathObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {

            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {

                /* Menutup Utility Modal */
                $("#MasterPathModal").modal("hide");

                /* Menghapus Datatable Master Path Untuk Persiapan Reset Datatable */
                $("#MasterPathDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master Path Dengan Data Yang Baru Dirubah  */
                listMasterPath();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dirubah */
                toastr.success("Penyuntingan Data Master Path Berhasil !",
                    "Master Path dengan nama " + pathObj.Name + " berhasil dirubah.");

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

/* Fungsi Untuk Memanggil Modal Utility Untuk Kebutuhan RUD(Read, Update, Delete) Dari Master Path */
function getMasterPath(type, id) {
    /* Operasi AJAX Memanggil Modal Utility Sesuai Dengan Kebutuhan RUD(Read, Update, Delete) Dari Master Path */
    $.ajax({
        url: "/MasterPath/GetPath?pathId=" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        success: function (result) {
            $.each(result, function (index, value) {
                $("#id").val(value.Id);
                $("#name").val(value.Name);
            });

            /* Munculkan Utility Modal */
            $("#MasterPathModal").modal("show");

            /* Jika Type = 1 Maka Utility Modal Ditampilkan Untuk Operasi Update Dari Sebuah Data Master Path */
            if (type === 1) {
                /* Panggil Fungsi Untuk Mengaktifkan Semua Form Field */
                enabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Formulir Penyuntingan Data Master Path");

                /* Menampilkan Tombol Update */
                $("#btnUpdate").show();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 2 Maka Utility Modal Ditampilkan Untuk Operasi Read Detail Dari Sebuah Data Master Path */
            else if (type === 2) {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Detail Data Master Path");

                /* Menghilangkan Tombol Update */
                $("#btnUpdate").hide();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 3 Maka Utility Modal Ditampilkan Untuk Operasi Delete Dari Sebuah Data Master Path */
            else {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Apakah Anda Yakin Ingin Menghapus Data Master Path Ini ?");

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

/* Fungsi Untuk Menghapus Sebuah Data Dari Master Path */
function deleteMasterPath() {
    var form = $("#MasterPathForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Untuk Menyimpan Path Id Yang Ingin Dihapus */
    var pathId = $("#id").val();

    /* Variabel Untuk Menyimpan Path Name Yang Ingin Dihapus */
    var pathName = $("#name").val();

    /* Operasi AJAX Untuk Delete Master Path */
    $.ajax({
        url: "/MasterPath/Delete",
        data: {
            __RequestVerificationToken: token,
            pathId: pathId
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status) {

                /* Menutup Utility Modal */
                $("#MasterPathModal").modal("hide");

                /* Menghapus Datatable Master BatchFile Untuk Persiapan Reset Datatable */
                $("#MasterPathDatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master Path Dengan Data Yang Baru Dihapus  */
                listMasterPath();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dihapus */
                toastr.success("Data Master Path Berhasil Dihapus !",
                    "Master Path dengan path " + pathName + " berhasil dihapus.");
            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

/* Fungsi Untuk Menyiapkan Utility Modal Untuk Proses Create Sebuah Data Master Path Baru */
function clearTextBox() {

    /* Mengganti Judul Utility Modal */
    $("#modalTitle").text("Formulir Penambahan Data Master BatchFile");

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