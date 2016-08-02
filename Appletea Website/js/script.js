/* Sets Up Plyr Plugin */
plyr.setup();


/* Drag Arrange for Queue*/
$(function() {
  $('.media-card').arrangeable(
  );
});

$(function() {
  $('.edit-playlist-card').arrangeable(
  );
});


/* Icon Toggle */
$('.like-btn').click(function(){
    $(this).find('i').toggleClass('fa-heart-o fa-heart')
});

$('.shfl-btn').click(function(){
    $(this).find('i').toggleClass('active')
});


/* Chat Scrolled to Bottom on Load */
var chat = $('.chat');
chat.scrollTop(chat.prop("scrollHeight"));


/* Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});


/* Input On-Click Edit */
$('.onclick-edit').click(function(){
    if ($(this).hasClass("inactive")) {
      $(this).toggleClass('inactive active');
      var title = $.trim($(this).text()); /* whitespaces trimmed */
      $(this).html('');
      $('<input/>')
          .attr({
              'class': 'edit-input',
              'type': 'text',
              'name': 'edit',
              'id': 'current-input',
              'size': '30',
              'value': title,
              'onfocus': 'this.value = this.value;'
          })
          .appendTo(this);
      $('#current-input').focus();
    };
});

$('.onclick-edit').keyup(function(event){
    if(event.keyCode == 13 & $(this).hasClass('active')){
        $(this).toggleClass('inactive active');
        var title = $('.edit-input').val();
        $(this).html('');
        $(this).append(title);
        if ($(this).hasClass('room-name')) {
            $(this).append('<a class="icon-btn-dark" href="javascript:void"><i class="fa fa-edit" aria-hidden="true"></i></a>');
        }
        else if ($(this).hasClass('open-playlist-title')) {
            $(this).append('<a class="icon-btn-blue" href="javascript:void"><i class="fa fa-edit" aria-hidden="true"></i></a>');
        };
    }
});



