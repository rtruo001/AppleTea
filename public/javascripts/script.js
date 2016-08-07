$(function() {
  // $('.media-card').arrangeable();
});

$('.like-btn').click(function(){
    $(this).find('i').toggleClass('fa-heart-o fa-heart')
});

$('.shfl-btn').click(function(){
    $(this).find('i').toggleClass('active')
});

// Volume Slider with Jquery
// $('#vol-slider').slider({
// 	formatter: function(value) {
// 		return 'Current value: ' + value;
// 	}
// });

// $(document).ready(function() {
// 	$('#vol-slider').slider({
//       	formatter: function(value) {
//         	return 'Current value: ' + value;
//       	}
//     });
// });
