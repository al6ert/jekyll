
var likes;

function rotate_overlay_state() {
  if(window.innerHeight > window.innerWidth){	    
    $('#rotate-overlay').removeClass('d-none');
    $('#rotate-overlay').addClass('d-flex');
  } else {    
    $('#rotate-overlay').addClass('d-none')
    $('#rotate-overlay').removeClass('d-flex')
  }
}

function loadLikesLocationStorage() {
  likes = localStorage.getItem('likes');
  if (!likes) {
    likes = {};
    localStorage.setItem('likes', JSON.stringify(likes));    
  } else {
    likes = JSON.parse(likes);
    for (const [key, value] of Object.entries(likes)) {
      updateLikeButton(key, value);
    }
  }
}

function updateLikeButton(like_id, value) {
  if (value) {
    $('#' + like_id + " > i").removeClass('no-like');
    $('#' + like_id + " > i").addClass('yes-like');    
    $('#' + like_id + " > i").html('favorite');
  } else {
    $('#' + like_id + " > i").removeClass('yes-like');
    $('#' + like_id + " > i").addClass('no-like');    
    $('#' + like_id + " > i").html('favorite_border')
  }
}

function changeLikeStatus(like_id) {  
  var value = likes[like_id] ? (!likes[like_id]) : true;    
  likes[like_id] = value;
  localStorage.setItem('likes', JSON.stringify(likes));
  updateLikeButton(like_id, value);
}

$( window ).ready(function() {  
  rotate_overlay_state();  
  loadLikesLocationStorage();
  $('#fullpage').fullpage({
    licenseKey:'D85A2F08-EAC044F4-91FAA1F6-815EDD13',
    easingcss3:'ease-in-out',
    verticalCentered: false,		
    dragAndMove: true,
    scrollHorizontally:true,
    keyboardScrolling: true,
    loopHorizontal:false,	
    fadingEffect: true,
    autoScrolling:true    
  });  
  
  $('.fp-controlArrow').addClass('btn btn-arrow');  
  //$('.fp-controlArrow').removeClass('fp-controlArrow'); 
  $('.fp-prev').append('<i class="arrow arrow-prev material-icons">navigate_before</i>');
  $('.fp-next').append('<i class="arrow arrow-next material-icons">navigate_next</i>');

});

$( window ).resize(function() {  
  rotate_overlay_state();  
});

