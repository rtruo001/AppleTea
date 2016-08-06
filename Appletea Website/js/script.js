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

/* Like and Shuffle Icon Toggle */
$('.like-btn').click(function(){
    $(this).find('i').toggleClass('fa-heart-o fa-heart')
});



$('.shfl-btn').click(function(){
    $(this).find('i').toggleClass('active')
});

/* Chat Scrolled to Bottom on Load */
var chat = $('.chat');
chat.scrollTop(chat.prop("scrollHeight"));