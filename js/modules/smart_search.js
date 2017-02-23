

/** ....................................................................................................................
    Smart search for table plugin (with autocomplete column names and values) ..........................................
    needs jQuery UI Autocomplete .......................................................................................
.................................................................................................................... **/


$.fn.smartSearch = function(options) {
   return this.each(function() {
       var settings = $.extend({
            step: 1,
            base_input_padding: 30,
            data_source: []
        }, options);

       var smart_search = $(this),
       input = smart_search.find('input'),
       blocks = smart_search.find('.blocks');


       // jquery UI autocomplete
       input.autocomplete({
           minLength: 0,
           source: settings.data_source,
           focus: function(event, ui) {
               return false;
           },
           select: function(event, ui) {
               add_block(ui.item.label, ui.item.index);
               return false;
           },
           open: function() {
               var position = smart_search.offset(),
               left = position.left, top = position.top;
               $(".ui-autocomplete").css({
                   left: left + blocks.width() + settings.base_input_padding + "px",
                   top: top + 36 + "px",
                   width: 'auto'
               }).addClass('z-depth-1');
           }
       })
       .autocomplete("instance")._renderItem = function(ul, item) {
           return $("<li>").append("<div>" + item.label + "</div>").appendTo(ul);
       };

       // update padding for input field ....
       update_input_width = function () {
           smart_search.find('input').css({paddingLeft: blocks.width() + settings.base_input_padding});
       }

       // start dropdown ....
       input.focus(function() {
           if (input.val()=='') input.autocomplete("search", "");
       });

       // add new block ....
       add_block = function (str, index) {
           if (settings.step == 2) {
               blocks.find('li:last').removeClass('half').addClass('added').find('.key').
                   after('<span class="str">'+str+'</span>').after('<i class="close close--grey"></i>');
               bind_delete();
               update_input_width();
               input.val('').autocomplete("option", "source", settings.data_source);
               settings.step = 1;
               //$(".ui-autocomplete").hide();
               //input.autocomplete("search", "");

           } else if (settings.step == 1) {
               blocks.append('<li class="half">' +
                   '<span class="key">'+str+':</span>' +
                   '</li>'
               );
               update_input_width();
               input.val('').autocomplete("option", "source", settings.data_source[index].rows);
               settings.step = 2;
           } else if (settings.step == 3) {
               // free content
               blocks.append('<li class="added">' +
                   '<span class="key">'+str+'</span>' +
                   '<i class="close close--grey"></i>' +
                   '</li>'
               );
               bind_delete();
               update_input_width();
               input.val('');
               settings.step = 1;
               $(".ui-autocomplete").hide();
           }
       }

       // for free content adding and delete
       input.keydown(function(event) {
           if (event.which == 8) {
               if (input.val()=='' && blocks.find('li').length) {
                   if (blocks.find('li.active').length)
                       delete_block(blocks.find('li.active'));
                   else {
                       blocks.find('li:last').addClass('active');
                   }
               }
           }
           else if (event.which == 13) {
               if (!$('.ui-autocomplete:visible .ui-state-active').length && settings.step==1 && input.val()!='') {
                   settings.step = 3;
                   add_block (input.val(), 0);
               }
               else if (!$('.ui-autocomplete:visible .ui-state-active').length && settings.step==2 && input.val()!='') {
                   settings.step = 2;
                   add_block (input.val(), 0);
               }
           }
       });

       // delete one block ....
       delete_block = function (b) {
           if ($(b).hasClass('close'))
               $(b).parent().remove();
           else
               $(b).remove();
           input.val('').autocomplete("option", "source", settings.data_source);
           settings.step = 1;
           update_input_width();
           $(".ui-autocomplete").hide();
       }

       // bind delete block to close buttons ....
       bind_delete = function () {
           blocks.find('.close').click(function() {
               delete_block(this);
           });
       }
   })
}






/*var smart_search = $('.smart-search'),
    input = smart_search.find('input'),
    blocks = $('.smart-search .blocks');
var base_input_padding = 30;
var step = 1;

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


$(window).load(function() {
    update_input_width();
});


$(document).ready(function() {

    // jquery UI autocomplete
    input.autocomplete({
        minLength: 0,
        source: data_source_keys,
        focus: function(event, ui) {
            //console.log(ui);
            return false;
        },
        select: function(event, ui) {
            add_block(step, ui.item.label, ui.item.index);
            return false;
        },
        open: function() {
            var position = smart_search.offset(),
            left = position.left, top = position.top;
            $(".ui-autocomplete").css({
                left: left + blocks.width() + base_input_padding + "px",
                top: top + 36 + "px",
                width: 'auto'
            }).addClass('z-depth-1');
        }
    })
    .autocomplete("instance")._renderItem = function(ul, item) {
        if(item.type=='category'){}
        return $("<li>").append("<div>" + item.label + "</div>").appendTo(ul);
    };

    // for free content adding and delete
    input.keydown(function(event) {
        if (event.which == 8) {
            if (input.val()=='' && blocks.find('li').length) {
                if (blocks.find('li.active').length)
                    delete_block(blocks.find('li.active'));
                else {
                    blocks.find('li:last').addClass('active');
                }
            }
        }
        else if (event.which == 13) {
            if (!$('.ui-autocomplete:visible .ui-state-active').length && step==1 && input.val()!='')
                add_block (3, input.val(), 0);
            else if (!$('.ui-autocomplete:visible .ui-state-active').length && step==2 && input.val()!='')
                add_block (2, input.val(), 0);
        }
    });

    input.focus(function() {
        if (input.val()=='') input.autocomplete("search", "");
    })
});


// .. Add new block ....................................................................................................

function add_block (step_param, str, index) {
    if (step_param == 2) {
        blocks.find('li:last').removeClass('half').addClass('added').find('.key').
            after('<span class="str">'+str+'</span>').after('<i class="close close--grey" onclick="delete_block(this)"></i>');
        update_input_width();
        input.val('').autocomplete("option", "source", data_source_keys);
        step = 1;
        $(".ui-autocomplete").hide();
        input.autocomplete("search", "");

    } else if (step_param == 1) {
        blocks.append('<li class="half">' +
            '<span class="key">'+str+':</span>' +
            '</li>'
        );
        update_input_width();
        input.val('').autocomplete("option", "source", data_source_keys[index].rows);
        step = 2;
    } else if (step_param == 3) {
        // free content
        blocks.append('<li class="added">' +
            '<span class="key">'+str+'</span>' +
            '<i class="close close--grey" onclick="delete_block(this)"></i>' +
            '</li>'
        );
        update_input_width();
        input.val('');
        $(".ui-autocomplete").hide();
    }
}


// .. Delete block .....................................................................................................

function delete_block (b) {
    if ($(b).hasClass('close'))
        $(b).parent().remove();
    else
        $(b).remove();
    input.val('').autocomplete("option", "source", data_source_keys);
    step = 1;
    update_input_width();
    $(".ui-autocomplete").hide();
}


// .. Update input left padding ........................................................................................

function update_input_width () {
    smart_search.find('input').css({paddingLeft: blocks.width() + base_input_padding});
    //$('.ui-autocomplete').css({left: smart_search.offset.left + blocks.width() + base_input_padding});
}
*/
