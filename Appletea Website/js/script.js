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


/* Chat Scrolled to Bottom on Window Load */
// $('.chat').scrollTop($('.chat')[0].scrollHeight);


/* Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


/* Cancels Out of Active Action by Clicking */
$('#page-overlay').click(function(){
    $('#page-overlay').toggle(false);
    hideOptions();
    hideUserList();
});


/* Users List Toggle and Options Toggle */
function showOptions() {
    $('.users-list-edit-btn').addClass('active');
    $('.users-list-edit-btn').removeClass('btn-secondary');
    $('.users-list-edit-btn').addClass('btn-red');
    $('#users-list-gear-icon').addClass('fa-spin');
    $('.users-list-icons').css('display','none');
    $('.users-list-edit').css('display','block');
    $('.users-offline-section').css('display','block');
    $('.users-list-add').css('display','block');
}

function hideOptions() {
    $('.users-list-edit-btn').removeClass('active');
    $('.users-list-edit-btn').removeClass('btn-red');
    $('.users-list-edit-btn').addClass('btn-secondary');
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


/* Dyanmic Search When User Types (will need update when dyanmic search is implemented) */
$('#search-user-input').keyup(function(event){
    if(!$(this).hasClass('active')){
        $(this).addClass('active');
        $('.search-user-header').css('border-bottom','solid 1px #e5e5e5')
        $('#search-user-list').css('display','block');
    }
});


/* Select User in Add User Search */
$('.search-user').click(function(){
    if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        $(this).find('.search-media-card').css('background-color','#4bb9c3');
        $(this).find('.search-media-title').css('color','#fff');
        $(this).find('.search-media-artist').css('color','#b3e1e6');
    } else {
        $(this).removeClass('active');
        $(this).find('.search-media-card').css('background-color','#eee');
        $(this).find('.search-media-title').css('color','#111');
        $(this).find('.search-media-artist').css('color','#666');
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
    $('#page-overlay').click(function(){
        $('#page-overlay').toggle(false);
        if ($(e).hasClass('active')){
            saveEdit(e);
        };
    });
});

$('.onclick-edit').keyup(function(event){
    if(event.keyCode == 13 && $(this).hasClass('active')){
        $('#page-overlay').toggle(false);
        saveEdit(this);
    }
});


/* Focus on Search Bar After Tab Transition */
$('.focus-search').click(function() {
    setTimeout(function() {
        $('#search-media-input').focus();
    }, 200);
});


/* Toggle lock/globe icon on toggle slider */
$('#create-room-toggle').change(function(){
    if (this.checked) {
        console.log('this is checked');
        $('#create-room-toggle-icon').removeClass('fa-globe');
        $('#create-room-toggle-icon').addClass('fa-lock');
    }
    else {
        console.log('this is NOT checked');
        $('#create-room-toggle-icon').removeClass('fa-lock');
        $('#create-room-toggle-icon').addClass('fa-globe');
    };
});


/* Mobile Tab Navigation */

// Event Handler: When window width changes, run WidthChange();
if (matchMedia) {
  var mq = window.matchMedia("(max-width: 768px)");
  mq.addListener(WidthChange);
  WidthChange(mq);
};

// If media query mobile, #chat active, else regular tabs active
function WidthChange(mq) {
  if (mq.matches) {
    console.log('width change: chat active');
    $('.chatbox-container').css('display','block');
    $('.queue-container').css('display','none');
    $('.tabbed-container-mobile-collapse').css('display','none');
  }
  else {
    console.log('width change: reg tabs active');
    $('.chatbox-container').css('display','block');
    $('.queue-container').css('display','block');
    $('.tabbed-container-mobile-collapse').css('display','block');
  }
};

// Event Handler: When each MOBILE tab is clicked
$('#mobile-tab-chat').click(function() {
    console.log('display chat')
    $('.chatbox-container').css('display','block');
    $('.queue-container').css('display','none');
    $('.tabbed-container-mobile-collapse').css('display','none');
});

$('#mobile-tab-queue').click(function() {
    console.log('display queue')
    $('.chatbox-container').css('display','none');
    $('.queue-container').css('display','block');
    $('.tabbed-container-mobile-collapse').css('display','none');
});

$('#mobile-tab-explore').click(function() {
    console.log('display explore')
    $('.chatbox-container').css('display','none');
    $('.queue-container').css('display','none');
    $('.tabbed-container-mobile-collapse').css('display','block');
    document.getElementById('tab-explore').click();
});

$('#mobile-tab-myplaylists').click(function() {
    console.log('display myplaylists')
    $('.chatbox-container').css('display','none');
    $('.queue-container').css('display','none');
    $('.tabbed-container-mobile-collapse').css('display','block');
    document.getElementById('tab-myplaylists').click();
});

$('#mobile-tab-search').click(function() {
    console.log('display search')
    $('.chatbox-container').css('display','none');
    $('.queue-container').css('display','none');
    $('.tabbed-container-mobile-collapse').css('display','block');
    document.getElementById('tab-search').click();
});
