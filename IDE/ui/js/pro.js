
$(function(){
    $(".increment").click(function(){
      var Change;
      let count;
      if($(this).hasClass("up")) {
        Change = 1;
        
      } else {
        Change = - 1;
      }
      $.ajax({

        url: "/app/vote.php",

        method: "POST",

        data: {
            account : account,
            proID : window.location.href,
            change: Change,
        },

        success: async function(response) {
            console.log(response);
            $(".count").text(response);
        }
        })
    });   
  });
