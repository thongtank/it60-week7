// Request to update data from API server
var update_data = function(el) {
    swal({
            title: "ยืนยันการแก้ไขข้อมูล",
            text: $(el).attr('title'),
            icon: "warning",
            buttons: ['ยกเลิก', 'ยืนยัน'],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {

            } else {

            }
        });
};

// Close Modal
var close_modal = function(modalId) {
    $(`#${modalId}`).modal('hide');
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
                    <a data-toggle="modal" data-target="#std-${val.std_id}" href='#' title='แก้ไขข้อมูลนักศึกษา - ${val.std_id}'> \
                        <i class="fa fa-pencil" aria-hidden="true"></i> \
                    </a>\
                </td> \
                <td>${val.std_id}</td> \
                <td>${val.std_fname} ${val.std_lname}</td> \
                <td>${gender}</td> \
                <td>${val.std_age}</td> \
                </tr>`;
            $(table_row).appendTo('tbody');
            var m_checked = '';
            var f_checked = '';
            if (val.std_gender == 'm') {
                m_checked = 'checked';
            } else {
                f_checked = 'checked';
            }
            let modal = `<div class="modal fade" id="std-${val.std_id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update - ${val.std_id} ${val.std_fname} ${val.std_lname}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="col">
                                <form>
                                    <div class="form-group">
                                        <label for="std_id">Student ID</label>
                                        <input type="text" value="${val.std_id}" class="form-control" id="std_id" aria-describedby="std_idHelp" placeholder="Enter Student ID" pattern="[0-9]{10}" required="">
                                        <small id="std_idHelp" class="form-text text-muted">Plase enter your student ID.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="std_fname">Firstname</label>
                                        <input type="text" value="${val.std_fname}" class="form-control" id="std_fname" placeholder="Enter Firstname" required="">
                                    </div>
                                    <div class="form-group">
                                        <label for="std_lname">Lastname</label>
                                        <input type="text" value="${val.std_lname}" class="form-control" id="std_lname" placeholder="Enter Lastname" required="">
                                    </div>
                                    <div class="form-check-inline">
                                        <label for="std_age">Gender</label>
                                        <div class="clearfix"></div>
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="radio" ${f_checked} name="${val.std_id}_gender" id="${val.std_id}_gender" value="f"> Female
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="radio" ${m_checked} name="${val.std_id}_gender" id="${val.std_id}_gender" value="m"> Male
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <label for="std_age">Age</label>
                                        <input type="number" value="${val.std_age}" class="form-control" id="std_age" placeholder="Enter Age" required="">
                                    </div>
                                    <div class="clearfix mb-2"></div>
                                    <button type="submit" class="btn btn-primary">Save</button>
                                    <button type="reset" id="reset" class="btn btn-danger" onClick="close_modal('std-${val.std_id}')">Reset</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            $(modal).appendTo('.std-modal');
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