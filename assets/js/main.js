window.dataLayer = window.dataLayer || [];
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

function sendToDataLayer(data) {
  window.dataLayer.push(data);
}

function changeLikeStatus(like_id) {  
  var value = likes[like_id] ? (!likes[like_id]) : true;    
  likes[like_id] = value;
  localStorage.setItem('likes', JSON.stringify(likes));
  sendToDataLayer( value ? { "event": "like" } : { "event" : "dislike" });
  updateLikeButton(like_id, value);
}

function slideViewEvent(direction) {
  var section = $(".section.active");
  var slide = $(".section.active .slide.active");
  var title = $(".section.active .slide.active h1").html() + " - " + $(".section.active .slide.active .caption span").html()
  sendToDataLayer({
    "event": "slideView",
    "data":{
      "title": title,
      "section": section.attr("id"),
      "section-index": section.index(),
      "slide": slide.attr("id"),
      "slide-index": slide.index(),
      "action": direction
    }
  });
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
    autoScrolling:true,
    afterLoad: function(origin, destination, direction){
      var loadedSection = this;      
      slideViewEvent(direction ? direction : 'loaded');
    },
    afterSlideLoad: function( section, origin, destination, direction){
      var loadedSlide = this;
      slideViewEvent(direction);      
    }   
  });  
  
  $('.fp-controlArrow').addClass('btn btn-arrow');  
  $('.fp-prev').append('<i class="arrow arrow-prev material-icons">navigate_before</i>');
  $('.fp-next').append('<i class="arrow arrow-next material-icons">navigate_next</i>');

});

$( window ).resize(function() {  
  rotate_overlay_state();  
});

