/* Sets Up Plyr Plugin */
plyr.setup();


/* Drag Arrange for Queue*/
$(function() {
    $('.media-card').arrangeable();
});

$(function() {
    $('.edit-playlist-card').arrangeable();
});


/* Icon Toggle */
$('.like-btn').click(function(){
    $(this).find('i').toggleClass('fa-heart-o fa-heart');
});

$('.shfl-btn').click(function(){
    $(this).find('i').toggleClass('active');
});

$('.mod-toggle').click(function(){
    $(this).toggleClass('fa-star-o fa-star');
});


/* Chat Scrolled to Bottom on Load */
var chat = $('.chat');
chat.scrollTop(chat.prop("scrollHeight"));


/* Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


/* Cancels Out of Active Action by Clicking */
$('#page-overlay').click(function(){
    $('#page-overlay').toggle(false);
    hideOptions();
    hideUserList();
    saveEdit('.onclick-edit');
});


/* Users List Toggle and Options Toggle */
function showOptions() {
    $('.users-list-edit-btn').addClass('active');
    $('.users-list-edit-btn').toggleClass('btn-red-hover btn-red');
    $('#users-list-gear-icon').addClass('fa-spin');
    $('.users-list-icons').css('display','none');
    $('.users-list-edit').css('display','block');
    $('.users-offline-section').css('display','block');
    $('.users-list-add').css('display','block');
}

function hideOptions() {
    $('.users-list-edit-btn').removeClass('active');
    $('.users-list-edit-btn').toggleClass('btn-red btn-red-hover');
    $('#users-list-gear-icon').removeClass('fa-spin');
    $('.users-list-icons').css('display','block');
    $('.users-list-edit').css('display','none');
    $('.users-offline-section').css('display','none');
    $('.users-list-add').css('display','none');
}

function showUserList() {
    $('.users-list-container').css('display','block');
    $('.users-list-container').addClass('active');
}

function hideUserList() {
    $('.users-list-container').css('display','none');
    $('.users-list-container').removeClass('active');
}

$('.users-btn').hover(
    function(){
        showUserList();
    }, function(){
        hideUserList();
});

$('#users-list-container').hover(
    function(){
      showUserList();
    },
    function(){
      if ($('.users-list-edit-btn').hasClass('active'))
          showUserList();
      else hideUserList();
});

$('.users-list-edit-btn').click(function(){
    if ($(this).hasClass('active')) {
        $('#page-overlay').toggle(false);
        hideOptions();
    } else {
        showOptions();
        $('#page-overlay').toggle(true);
    }
});


/* Input On-Click Edit */
function activateEdit(element) {
    var title = $.trim($(element).text()); /* whitespaces trimmed */
    $(element).addClass('active');
    $(element).html('');
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
        .appendTo(element);
    $('#current-input').focus();
};

function saveEdit(element){
    var title = $('.edit-input').val();
    $(element).removeClass('active');
    $(element).html('');
    $(element).append(title);
    if ($(element).hasClass('room-name')) {
        $(element).append('<a class="icon-btn-dark" href="javascript:void(0)"><i class="fa fa-edit" aria-hidden="true"></i></a>');
    } else if ($(element).hasClass('open-playlist-title')) {
        $(element).append('<a class="icon-btn-blue" href="javascript:void(0)"><i class="fa fa-edit" aria-hidden="true"></i></a>');
    };
};

$('.onclick-edit').click(function(){
    var e = this;
    if (!$(this).hasClass('active')) {
        $('#page-overlay').toggle(true);
        activateEdit(this);
    };
});

$('.onclick-edit').keyup(function(event){
    if(event.keyCode == 13 && $(this).hasClass('active')){
        $('#page-overlay').toggle(false);
        saveEdit(this);
    }
});


