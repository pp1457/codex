
$(function(){
    if(window.location.href=="http://localhost:8888/ui/problem_id/problem_preview.html#loaded"){
      return;
    }
    $.ajax({

      url: "/app/vote.php",

      method: "POST",

      data: {
          account : account,
          proID : window.location.href,
          change: 0,
      },

      success: async function(response) {
          console.log(response);
          $(".count").text(response);
      }
    })
    $(".increment").click(function(){
      if(String(account).length<10) return;
      var Change;
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
