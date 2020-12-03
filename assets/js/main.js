

function rotate_overlay_state() {
  if(window.innerHeight > window.innerWidth){	    
    $('#rotate-overlay').removeClass('d-none');
    $('#rotate-overlay').addClass('d-flex');
  } else {    
    $('#rotate-overlay').addClass('d-none')
    $('#rotate-overlay').removeClass('d-flex')
  }
}

$( window ).ready(function() {  
  rotate_overlay_state();
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
});

$( window ).resize(function() {  
  rotate_overlay_state();
});

 