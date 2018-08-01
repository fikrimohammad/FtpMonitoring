$(document).ready(function () {
    listMasterSro();
});

/* Fungsi Untuk Memanggil Datatable Master SRO */
function listMasterSro() {
    $("#MasterSRODatatables").dataTable({
        language: {
            searchPlaceholder: "Cari Nama SRO"
        },
        ajax: {
            "url": "/MasterSRO/ListSro",
            "dataType": "JSON",
            "type": "GET"
        },
        columns: [
            { data: "Id", searchable: false },
            { data: "Name" },
            {
                data: "Id", searchable: false, orderable: false,
                render: function (data) {
                    return "<a href=\"#\" class=\"btn btn-primary\" style=\"margin-right:10px;\" onclick=\"getMasterSRO(1, " + data + ")\">" +
                        "<i class=\"fa fa-edit\" style=\"margin-right: 5px;\"></i>Ubah" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-info\" style=\"margin-right:10px;\" onclick=\"getMasterSRO(2, " + data + ")\">" +
                        "<i class=\"fa fa-info\" style=\"margin-right: 5px;\"></i>Lihat" +
                        "</a>" +
                        "<a href=\"#\" class=\"btn btn-danger\" onclick=\"getMasterSRO(3, " + data + ")\">" +
                        "<i class=\"fa fa-trash-o\" style=\"margin-right: 5px;\"></i>Hapus" +
                        "</a>";
                }
            }
        ]
    });
}

/* Fungsi Untuk Menambahkan Data Master SRO */
function addMasterSRO() {
    var form = $("#MasterSROForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
    * Terkait Data Master SRO Yang Akan Ditambahkan 
    */
    var sroObj = {
        "Name": $("#name").val()           // Index Untuk Menyimpan Nama SRO
    };

    /* Operasi AJAX Untuk Create Master SRO */
    $.ajax({
        url: "/MasterSRO/Create",
        data: {
            __RequestVerificationToken: token,
            masterSRO: sroObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {
                /* Menutup Utility Modal */
                $("#MasterSROModal").modal("hide");

                /* Menghapus Datatable Master Template File Untuk Persiapan Reset Datatable */
                $('#MasterSRODatatables').dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master Template File Dengan Data Yang Baru Ditambahkan  */
                listMasterSro();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Ditambahkan */
                toastr.success("Penambahan Data Master SRO Berhasil !",
                    "Master SRO dengan nama " + sroObj.name + " berhasil ditambahkan.");
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
function updateMasterSRO() {
    var form = $('#MasterSROForm');

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Dalam Bentuk Objek Untuk Menyimpan Hasil Input Dari User
     * Terkait Data Master SRO Yang Akan Dirubah 
     */
    var sroObj = {
        "Id": $("#id").val(),
        "Name": $("#name").val()
    };

    /* Operasi AJAX Untuk Update Master SRO */
    $.ajax({
        url: "/MasterSRO/Update",
        data: {
            __RequestVerificationToken: token,
            masterSRO: sroObj
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {

            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status === true) {

                /* Menutup Utility Modal */
                $("#MasterSROModal").modal("hide");

                /* Menghapus Datatable Master Template File Untuk Persiapan Reset Datatable */
                $("#MasterSRODatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master Template File Dengan Data Yang Baru Dirubah  */
                listMasterSro();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dirubah */
                toastr.success("Penyuntingan Data Master SRO Berhasil !",
                    "Master SRO dengan nama " + sroObj.Name + " berhasil dirubah.");

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

/* Fungsi Untuk Memanggil Modal Utility Untuk Kebutuhan RUD(Read, Update, Delete) Dari Master SRO */
function getMasterSRO(type, id) {
    /* Operasi AJAX Memanggil Modal Utility Sesuai Dengan Kebutuhan RUD(Read, Update, Delete) Dari Master SRO */
    $.ajax({
        url: "/MasterSRO/GetSro?sroId=" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "JSON",
        success: function (result) {
            $.each(result, function (index, value) {
                $("#id").val(value.Id);
                $("#name").val(value.Name);
            });

            /* Munculkan Utility Modal */
            $("#MasterSROModal").modal("show");

            /* Jika Type = 1 Maka Utility Modal Ditampilkan Untuk Operasi Update Dari Sebuah Data Master SRO */
            if (type === 1) {
                /* Panggil Fungsi Untuk Mengaktifkan Semua Form Field */
                enabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Formulir Penyuntingan Data Master SRO");

                /* Menampilkan Tombol Update */
                $("#btnUpdate").show();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 2 Maka Utility Modal Ditampilkan Untuk Operasi Read Detail Dari Sebuah Data Master SRO */
            else if (type === 2) {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Detail Data Master SRO");

                /* Menghilangkan Tombol Update */
                $("#btnUpdate").hide();

                /* Menghilangkan Tombol Delete */
                $("#btnDelete").hide();

                /* Menghilangkan Tombol Add */
                $("#btnAdd").hide();
            }
            /* Jika Type = 3 Maka Utility Modal Ditampilkan Untuk Operasi Delete Dari Sebuah Data Master SRO */
            else {
                /* Panggil Fungsi Untuk Menonaktifkan Semua Form Field */
                disabledFormAllField();

                /* Mengganti Judul Dari Utility Modal */
                $("#modalTitle").text("Apakah Anda Yakin Ingin Menghapus Data Master SRO Ini ?");

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
function deleteMasterSRO() {
    var form = $("#MasterSROForm");

    /* Variabel Untuk Menyimpan CSRF Token */
    var token = $('input[name="__RequestVerificationToken"]', form).val();

    /* Variabel Untuk Menyimpan Sro Id Yang Ingin Dihapus */
    var sroId = $("#id").val();

    /* Variabel Untuk Menyimpan Sro Name Yang Ingin Dihapus */
    var sroName = $("#name").val();

    /* Operasi AJAX Untuk Delete Master SRO */
    $.ajax({
        url: "/MasterSRO/Delete",
        data: {
            __RequestVerificationToken: token,
            sroId: sroId
        },
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            /* Jika Berhasil Melewati Validasi ModelState */
            if (result.status) {

                /* Menutup Utility Modal */
                $("#MasterSROModal").modal("hide");

                /* Menghapus Datatable Master SRO Untuk Persiapan Reset Datatable */
                $("#MasterSRODatatables").dataTable().fnDestroy();

                /* Menampilkan Kembali Datatable Master SRO Dengan Data Yang Baru Dihapus  */
                listMasterSro();

                /* Menampilkan Notifikasi Bahwa Data Berhasil Dihapus */
                toastr.success("Data Master SRO Berhasil Dihapus !",
                    "Master SRO dengan nama " + sroName + " berhasil dihapus.");
            }
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

/* Fungsi Untuk Menyiapkan Utility Modal Untuk Proses Create Sebuah Data Master SRO Baru */
function clearTextBox() {

    /* Mengganti Judul Utility Modal */
    $("#modalTitle").text("Formulir Penambahan Data Master SRO");

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