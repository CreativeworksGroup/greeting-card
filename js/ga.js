$(document).ready(function(){
    $("#createLinkButton").click(function(e){
        e.preventDefault();
        ga('send', 'event', 'Xmas 2015', 'Create', 'Greetings');
    });
    
    $(".addthis_toolbox a").click(function(e){
        e.preventDefault();
        ga('send', 'event', 'Xmas 2015', 'Share', 'Greetings');        
    });
});