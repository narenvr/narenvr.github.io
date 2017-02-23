$(document).ready(function() {

    /* .................................................................................................................
    .. GROUP INFO ......................................................................................................
    ..................................................................................................................*/

    $('.tab-group-info .edit-activate').click(function() {
        $('.tab-group-info .edit-in-place').show();
        $('.tab-group-info .view').hide();
        $('.tab-group-info .edit-in-place textarea').focus().focusToEnd();
    });
    $('.tab-group-info .edit-in-place .btn').click(function() {
        $('.tab-group-info .edit-in-place').hide();
        $('.tab-group-info .view').show();
        $('.tab-group-info .view span').html($('.tab-group-info .edit-in-place textarea').val());
    });



    /* .................................................................................................................
    .. Table with USERS IN GROUP .......................................................................................
    ..................................................................................................................*/

    if ($('#table-group-users').length) {

        // Delete row ....
        $('#table-group-users tr .delete-row').click(function() {
            $('#modal-delete .id').html($(this).data('rowid'));
            $('#modal-delete h4 span').html('Delete user');
            $('#modal-delete').modal('open');
            return false;
        });

        // Delete many rows ....
        $('#btn-delete-users').click(function() {
            $('#modal-delete .id').html('many id');
            $('#modal-delete h4 span').html('Delete users');
            $('#modal-delete').modal('open');
            return false;
        });
    }


    /* .................................................................................................................
    .. Table with APPS IN GROUP ........................................................................................
    ..................................................................................................................*/

    if ($('#table-group-apps').length) {

        // Delete row ....
        $('#table-group-apps tr .delete-row').click(function() {
            $('#modal-delete .id').html($(this).data('rowid'));
            $('#modal-delete h4 span').html('Delete user');
            $('#modal-delete').modal('open');
            return false;
        });

        // Delete many rows ....
        $('#btn-delete-apps').click(function() {
            $('#modal-delete .id').html('many id');
            $('#modal-delete h4 span').html('Delete users');
            $('#modal-delete').modal('open');
            return false;
        });
    }


    /* .................................................................................................................
    .. Table with GROUPS ...............................................................................................
    ..................................................................................................................*/

    if ($('#table-groups').length) {

        // Edit row ....
        $('#table-groups tr .edit-row').click(function() {
            if ($('#row-' + $(this).data('rowid')).hasClass('active')) {
                $('#row-' + $(this).data('rowid')).toggleClass('active').find('.edit-in-place, .edit-in-place-label').toggleClass('hide');
            } else {
                $('#table-groups tr').removeClass('active').find('.edit-in-place').addClass('hide');
                $('#table-groups tr').find('.edit-in-place-label').removeClass('hide');
                $('#row-' + $(this).data('rowid')).toggleClass('active').find('.edit-in-place, .edit-in-place-label').toggleClass('hide');
                $('#table-groups tr.active .edit-in-place input').focusToEnd().keydown(function(event) {
                    if (event.which == 9 || event.which == 13) {
                        $('#table-groups tr.active .edit-in-place-label').html($(this).val());
                        $('#table-groups tr.active').toggleClass('active').find('.edit-in-place, .edit-in-place-label').toggleClass('hide');
                    } else if (event.which == 27) {
                        $('#table-groups tr').removeClass('active').find('.edit-in-place').addClass('hide');
                        $('#table-groups tr').find('.edit-in-place-label').removeClass('hide');
                    }
                });
            }
            return false;
        });

        // Delete row ....
        $('#table-groups tr .delete-row').click(function() {
            $('#modal-delete .id').html($(this).data('rowid'));
            $('#modal-delete h4 span').html('Delete group');
            $('#modal-delete').modal('open');
            return false;
        });

        // Delete many rows ....
        $('#btn-delete-groups').click(function() {
            $('#modal-delete .id').html('many id');
            $('#modal-delete h4 span').html('Delete groups');
            $('#modal-delete').modal('open');
            return false;
        });
    }


    // Add users to group ....
    $('.tab-group-users #add-users-to-group-start, #table-groups tr .icons .add-user').click(function() {
        $('#modal-add-users').modal('open');
    });

    // Add users to group ....
    $('.tab-group-apps #add-apps-to-group-start, #table-groups tr .icons .add-app').click(function() {
        $('#modal-add-apps').modal('open');
    });

    // Delete group ....
    $('#delete-group').click(function() {
        $('#modal-delete .id').html($(this).data('group-id'));
        $('#modal-delete h4 span').html('Delete group');
        $('#modal-delete').modal('open');
        return false;
    });


    /* .................................................................................................................
    .. NEW GROUP .......................................................................................................
    ..................................................................................................................*/

    $('.new-group--add-users .added-users .close').click(function() {
        $(this).parent().fadeOut(300, function() {$(this).remove();});
    });

    $('.new-group--add-users .by-email-panel .add').click(function() {
        if ($('#user-email').val().trim()!='') {
            $('.added-users ul').append('<li><i class="icon-user icon-19"></i>' +
                '<span>'+$('#user-email').val().trim()+'</span><i class="close close--blue"></i></li>');

            $('.new-group--add-users .added-users .close').click(function() {
                $(this).parent().fadeOut(300, function() {$(this).remove();});
            });
        }
    });

    $('.new-group--add-users .by-name-panel .add').click(function() {
        $('.added-users ul').append('<li><i class="icon-user icon-19"></i>' +
            '<span>'+$(this).parent().find('label span').html()+'</span><i class="close close--blue"></i></li>');
            $(this).parent().remove();

        $('.new-group--add-users .added-users .close').click(function() {
            $(this).parent().fadeOut(300, function() {$(this).remove();});
        });
    });

    $('.new-group--add-users .added-apps .close').click(function() {
        $(this).parent().fadeOut(300, function() {$(this).remove();});
    });

    if ($.isFunction($.fn.smartSearch)) {
        // attach smart search ....
        var data_source_keys = [
            {
                index: 0,
                label: 'Group name',
                type: 'category',
                rows: [
                    {label: 'Developers', type: 'val'},
                    {label: 'Accounting', type: 'val'},
                    {label: 'Legal', type: 'val'},
                    {label: 'Human Resourses', type: 'val'}
                ]
            },
            {
                index: 1,
                label: 'Users',
                type: 'category',
                rows: [
                    {label: '5', type: 'val'},
                    {label: '7', type: 'val'},
                    {label: '2', type: 'val'},
                    {label: '40', type: 'val'}
                ]
            }
        ];
        $('.smart-search').smartSearch({data_source: data_source_keys});
    }
});
