// Request to update data from API server
var update_data = function(id) {
    $.post('http://localhost:80/learning60/week7/getdata_by_id.api.php', {
        std_id: id
    }, function(data, textStatus, xhr) {
        let d = data;
        let modal = $('#modal_update');
        let eq = 0;
        if (d.std_gender == 'm') {
            eq = 1;
        }
        modal
            .find('h5.modal-title').html(`Update - ${d.std_id} ${d.std_fname} ${d.std_lname}`).end()
            .find('#std_id').val(d.std_id).end()
            .find('#std_fname').val(d.std_fname).end()
            .find('#std_lname').val(d.std_lname).end()
            .find('#std_lname').val(d.std_lname).end()
            .find('#std_age').val(d.std_age).end()
            .find('input#std_gender:eq(' + eq + ')').attr('checked', 'checked');
        modal.modal('show');
    });
};

// Close Modal
var close_modal = function() {
    let modal = $('#modal_update');
    modal.modal('hide');
};

// Get Datas form API Server
var get_data = function() {
    $('tbody').empty();
    $.post('http://localhost:80/learning60/week7/getdata.api.php', {}, function(data, textStatus, xhr) {
        $.each(data, function(index, val) {
            /* iterate through array or object */
            let gender = 'ชาย';
            if (val.std_gender == 'f') {
                gender = 'หญิง';
            }

            let table_row = `<tr> \
                <td align=center> \
                    <a href='#/delete/student/${val.std_id}' onClick=delete_data(this) title='ลบรหัสนักศึกษา ${val.std_id}'> \
                        <i class="fa fa-trash" aria-hidden="true"></i> \
                    </a> | \
                    <a class='editLink' onClick=update_data('${val.std_id}') href='#' title='แก้ไขข้อมูลนักศึกษา - ${val.std_id}'> \
                        <i class="fa fa-pencil" aria-hidden="true"></i> \
                    </a>\
                </td> \
                <td>${val.std_id}</td> \
                <td>${val.std_fname} ${val.std_lname}</td> \
                <td>${gender}</td> \
                <td>${val.std_age}</td> \
                </tr>`;
            $(table_row).appendTo('tbody');
        });
    });
};

// Request to remove data from API server
var delete_data = function(el) {
    swal({
            title: "ยืนยันการลบข้อมูล",
            text: $(el).attr('title'),
            icon: "warning",
            buttons: ['ยกเลิก', 'ยืนยัน'],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                // TODO: Call delete API with Auth BeforeSend
                const usr = 'panchai';
                const pwd = '489329';
                $.ajax({
                        url: 'http://localhost:80/learning60/week7/deletedata.api.php',
                        type: 'POST',
                        dataType: 'json',
                        data: { std_id: $(el).attr('href') },
                        headers: {
                            'Authorization': 'Basic ' + btoa(`${usr}:${pwd}`)
                        },
                        // BeforeSend: function(xhr) {
                        //     xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
                        // }
                    })
                    .done(function(data) {
                        // swal("Poof! Your imaginary file has been deleted!", {
                        //     icon: "success",
                        // });
                        if (data.code == 200) {
                            window.location.replace('http://localhost/learning60/week7/it60/');
                        } else {
                            swal({
                                title: "Delete Failed!",
                                text: data.message,
                                icon: "error",
                                dangerMode: true,
                                button: "ยกเลิก"
                            });
                        }
                    })
                    .fail(function(err) {
                        console.log(`ERROR : ${err}`);
                    });
            } else {
                // swal("Your imaginary file is safe!");
            }
        });
};

// Onload HTML
$(function() {
    get_data();
    const form = $('form#create_student');
    form.submit(function(e) {
        e.preventDefault();
        $.post('http://localhost:80/learning60/week7/api.php', {
            std_id: $(this).find('#std_id').val(),
            std_fname: $(this).find('#std_fname').val(),
            std_lname: $(this).find('#std_lname').val(),
            std_gender: $(this).find('#std_gender:checked').val(),
            std_age: $(this).find('#std_age').val(),
        }, function(data, textStatus, xhr) {
            swal("Good job!", "การลงทะเบียนเสร็จสมบูรณ์", "success");
            form.find('#reset').trigger('click');
            get_data();
            // let gender = 'ชาย';
            // if ($('#std_gender').val() == 'f') {
            //     gender = 'หญิง';
            // }

            // let table_row = `<tr> \
            // <td>${$('#std_id').val()}</td> \
            // <td>${$('#std_fname').val()} ${$('#std_lname').val()}</td> \
            // <td>${gender}</td> \
            // <td>${$('#std_age').val()}</td> \
            // </tr>`;

            // $(table_row).appendTo('tbody');
        });
    });

    const form_update = $('form#update_student');
    form_update.submit(function(event) {
        console.log($(this).serializeArray());
        event.preventDefault();
    });
});
// $.post('http://localhost:80/learning60/week7/api.php', {
//         std_id: $('#std_id').val(),
//         std_fname: $('#std_fname').val(),
//         std_lname: $('#std_lname').val(),
//         std_gender: $('#std_gender').val(),
//         std_age: $('#std_age').val(),
//     }, 'json')
//     .done(function(data, textStatus, jqXHR) {
//         // let js = jQuery.parseJSON(data);
//         // console.log(`Success ${data.msg}`);
//         swal("Good job!", "Create Student Successfully", "success");
//     })
//     .fail(function(data, textStatus, jqXHR) {
//         console.log(`Fail ${data}, Status ${textStatus}`);
//     })
//     .always(function() {
//         form.find('#reset').trigger('click');
//     });